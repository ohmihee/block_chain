const WebSocket = require('ws')
const wsPORT = process.env.WR_PORT || 6005
const bc = require('./block')
const { broadcast } = require('./network')

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
            broadcast(responseLastMsg())
        }else{
            console.log(`블럭 최신화를 진행합니다.ㅐ48813`)
        }
    }
}

function broadcast(message){
    sockets.forEach(socket => {
        write(socket, message)
    })
}

