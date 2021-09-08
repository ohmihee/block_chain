
const WebSocket = require('ws')
const wsPORT = process.env.WR_PORT || 6005
const bc = require('./block')


let sockets = []

function getSockets(){return sockets}

const MessageAction = {
    QUERY_LAST:0,
    QUERY_ALL:1,
    RESPONSE_BLOCK:2
}

function initMessageHandler(ws){
    ws.on('message',data => {
        const message = JSON.parse(data)
        switch (message.type){
            case MessageAction.QUERY_LAST:
                write(ws, responseLastMsg())
                break;
            case MessageAction.QUERY_ALL:
                write(ws, responseBlockMsg())
                break;
            case MessageAction.RESPONSE_BLOCK:
                handleBlockResponse(message)
            
        }
    })
}

function write(ws,message){ws.send(JSON.stringify(message))}

function responseLastMsg(){
    return{
        type: MessageAction.RESPONSE_BLOCK,
        data: JSON.stringify([bc.getLastBlock()])
    }
}
function responseBlockMsg(){
    return{
        type: MessageAction.RESPONSE_BLOCK,
        data: JSON.stringify(bc.getBlocks())
    }
}
function queryAllMsg(){
    return{
        type:MessageAction.QUERY_ALL,
        data:null
    }
}
function queryBlockMsg(){
    return {
        type:MessageAction.QUERY_LAST,
        data:null
    }
}
function handleBlockResponse(message){
    const receivedBlocks = JSON.parse(message.data)
    const lastBlockReceived = receivedBlocks[receivedBlocks.length - 1]
    const lastBlockHeld = bc.getLastBlock()

    if(lastBlockReceived.header.index > lastBlockHeld.header.index) {
        console.log(
            '블록의 갯수 \n' +
            `내가 받은 블록의 index값 ${lastBlockReceived.header.index} \n` +
            `내가 가지고 있는 블록의 index값 ${lastBlockHeld.header.index}\n`
        )

        if(bc.createHash(lastBlockHeld)===lastBlockReceived.header.previoustHash){
            console.log(`마지막 하나만 비어있는 경우에는 하나만 추가합니다.`)
            if(bc.addBlock(lastBlockReceived)){
                broadcast(responseLastMsg())
            }
        }else if(receivedBlocks.length === 1 ){
            console.log(`피어로부터 블럭을 연결해야 합니다.`)
            broadcast(queryAllMsg())
        }else{
            console.log(`블럭 최신화를 진행합니다.`)
            bc.replaceBlock(receivedBlocks)
        }
    }else{
        console.log('블록이 이미 최신화입니다.')
    }
}
function initErrorHandler(ws){
    ws.on('close',() => { closeConnection(ws) })
    ws.on('error',() => { closeConnection(ws) })
}

function closeConnection(ws){
    console.log(`connection close ${ws.url}`)
    sockets.splice(sockets.indexOf(ws),1)
}
function wsInit(){
    const server = new WebSocket.Server({port:wsPORT})
    server.on('connection',(ws) => {
        console.log(ws);
        init(ws) // 소켓키값
    })
}

function connectionToPeers(newPeers){
    newPeers.forEach(peer => {
        const ws = new WebSocket.toString(peer)
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
    connectionToPeers,
    responseLastMsg
}

function broadcast(message){
    sockets.forEach(socket => {
        write(socket, message)
    })
}

