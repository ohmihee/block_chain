// 하나의 서버가 server이자 client

// npm install ws

const WebSocket = require('ws')
const wsPORT = process.env.WS_PORT || 6005
const bc = require('./block')

// 전역변수 peer
let sockets = []

function getSockets() { return sockets }
//socket event javascript -> event ? async await

const MessageAction = {
    QUERY_LAST: 0,
    QUERY_ALL: 1,
    RESPONSE_BLOCK: 2,
}

function initMessageHandler(ws) {
    ws.on("message", data => {
        const message = JSON.parse(data)
        switch (message.type) {
            case MessageAction.QUERY_LAST:
                write(ws, responseLastMsg())
                break;
            case MessageAction.QUERY_ALL:
                write(ws, responseBlockMsg())
                break;
            case MessageAction.RESPONSE_BLOCK:
                //여기서 실행 ..
                handleBlockResponse(message)
                break;

            default:
                break;
        }
    })
}
function queryAllMsg() {
    return {
        type: MessageAction.QUERY_ALL,
        data: null
    }
}

function queryBlockMsg() {
    return {
        type: MessageAction.QUERY_LAST,
        data: null
    }
}

function responseLastMsg() {
    return {
        type: MessageAction.RESPONSE_BLOCK,
        data: JSON.stringify([bc.getLastBlock()]) //마지막 블럭을 어떻게 가져올까?
    }
}

function responseBlockMsg() {
    return {
        type: MessageAction.RESPONSE_BLOCK,
        data: JSON.stringify(bc.getBlocks())
    }
}

function handleBlockResponse(message) {
    const receivedBlocks = JSON.parse(message.data); //받은 블록
    const lastBlockReceived = receivedBlocks[receivedBlocks.length - 1] //받은 블럭의 마지막
    const lastBlockHeld = bc.getLastBlock() // 가지고있는 블럭의 마지막
    //블록 최신화 체크
    if (lastBlockReceived.header.index > lastBlockHeld.header.index) {
        console.log(
            "블록의 갯수 \n" +
            `내가 받은 블록의 indexr값 ${lastBlockReceived.header.index}\n` +
            `내가 가지고 있는 블록의 index 값 ${lastBlockHeld.header.index}\n`
        );

        //연결점이 어느정도인가.
        if (bc.createHash(lastBlockHeld) === lastBlockReceived.header.previousHash) {
            console.log(`마지막 하나만 비어있는 경우에는 하나만 추가 합니다.`);
            if (bc.addBlock(lastBlockReceived)) {
                broadcast(responseLastMsg())
            }
        } else if ( receivedBlocks.length === 1 ) {
            console.log(`피어로부터 블록을 연결해야 합니다!`);
            broadcast(queryAllMsg())
        }else{
            console.log(`블럭을 최신화를 진행합니다`);
            //불럭을 최신화하는 코드 작성
            bc.replaceBlock(receivedBlocks)
        }
    } else {
        console.log('블록이 이미 최신화 입니다.');
    }
}

function initErrorHandler(ws) {
    ws.on("close", () => { closeConnection(ws) })
    ws.on("error", () => { closeConnection(ws) })
}
function closeConnection(ws) {
    console.log(`Connection close ${ws.url}`);
    sockets.splice(sockets.indexOf(ws), 1)
}

// 최초의 접속
function wsInit() {
    const server = new WebSocket.Server({ port: wsPORT })// server
    //server 내가 받은 소켓
    // server.on("why",()=>{})
    server.on("connection", (ws) => {
        console.log(ws);
        init(ws)// 소켓키값
    })
}
function write(ws, message) { ws.send(JSON.stringify(message)) }

function broadcast(message) {
    sockets.forEach(socket => {
        write(socket, message)
    })
}

function connectionToPeers(newPeers) {//배열로 들어간다
    newPeers.forEach(peer => { //주소값 ws://localhost:7001
        const ws = new WebSocket(peer)
        ws.on("open", () => { init(ws) })
        ws.on("error", () => { console.log("connection failed"); })
    })
}

function init(ws) {
    sockets.push(ws)
    initMessageHandler(ws)
    initErrorHandler(ws)
    //ws.send(JSON.stringify({type:MessageAction.QUERY_LAST , data:null}))
    write(ws, queryBlockMsg())
}

module.exports = {
    wsInit,
    getSockets,
    broadcast,
    connectionToPeers,
    responseLastMsg
}