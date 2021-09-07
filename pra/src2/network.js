
const WebSocket = require('ws')

const wsPORT = process.env.WS_PORT||6006
const bc = require('./block')

let sockets = []
function getSockets(){return sockets}
const MessageAction = {
    QUERY_LAST:0,
    QUERY_ALL:1,
    RESPONSE_BLOCK:2
}

function initMessageHandler(ws){
    ws.on('message',data=>{
        const message = JSON.parse(data)
        switch(message.type){
            case MessageAction.QUERY_LAST:
                write(ws,responseLastMsg())
                break
            case MessageAction.QUERY_ALL:
                write(ws,responseBlockMsg())
                break;
            case MessageAction.RESPONSE_BLOCK:
                handleBlockResponse(message)
                break
            default:
                break

        }
    })
}

function queryAllMsg(){
    return{
        type:MessageAction.QUERY_ALL,
        data:null
    }
}

function queryBlockMsg(){
    return{
        type:MessageAction.QUERY_LAST,
        data:null
    }
}
function responseLastMsg(){
    return{
    type:MessageAction.RESPONSE_BLOCK,
    data:JSON.stringify([bc.getLastBlock()])
    }
}

function responseBlockMsg(){
    return{
        type:MessageAction.RESPONSE_BLOCK,
        data:JSON.stringify(bc.getBlocks())
    }
}

function handleBlockResponse(message){
    const receivedBlocks = JSON.parse(message.data) // 받은 블록
    const lastBlockReceived = receivedBlocks[receivedBlocks.length - 1] // 받은 블럭의 마지막
    const lastBlockHeld = bc.getLastBlock() // 가지고있는 블럭의 마지막

    // 블록 최신화 체크 
    if (lastBlockReceived.header.index > lastBlockHeld.header.index) {
        console.log(
            "블록의 갯수 \n" +
            `내가 받은 블록의 index 값 ${lastBlockReceived.header.index}\n` +
            `내가 가지고있는 블럭의 index 값 ${lastBlockHeld.header.index}\n`
        )
        
        // 연결점 어느정도인가. 
        if (bc.createHash(lastBlockHeld) === lastBlockReceived.header.previousHash) {
            console.log(`마지막 하나만 비어있는경우에는 하나만 추가합니다.`)
            if (bc.addBlock(lastBlockReceived)) {
                broadcast(responseLastMsg())
            }
        } else if (receivedBlocks.length === 1) {
            console.log(`피어로부터 블록을 연결해야합니다!`)
            broadcast(queryAllMsg())
        } else {
            console.log(`블럭을 최신화를 진행합니다.`)
            //블럭을 최신화하는 코드를 또 작성......
            bc.replaceBlock(receivedBlocks)
        }

    } else {
        console.log('블럭이 이미 최신화입니다.')
    }
}
function initErrorHandler(ws){
    ws.on('close',()=>{closeConnection(ws)})
    ws.on('error',()=>{closeConnection(ws)})
}
function closeConnection(ws){
    console.log(`connection close ${ws.url}`)
    sockets.splice(sockets.indexOf(ws),1)
}
function wsInit(){
    const server = new WebSocket.Server({port:wsPORT})
    server.on('connection',(ws)=>{
        init(ws)
    })
}
function write(ws,message){ws.send(JSON.stringify(message))}

function broadcast(message){
    sockets.forEacth(socket=>{
        write(socket,message)
    })
}
function connectionToPeers(newPeers){
    newPeers.forEach(peer=>{
        const ws = new WebSocket(peer)
        ws.on('open',()=>{init(ws)})
        ws.on('error',()=>{console.log('connection failed')})
    })
}

function init(ws){
    sockets.push(ws)
    initMessageHandler(ws)
    initErrorHandler(ws)
    write(ws,queryBlockMsg())
}

module.exports = {
    wsInit,
    getSockets,
    broadcast,
    responseLastMsg,
    connectionToPeers
}