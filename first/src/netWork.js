// npm install ws
const WebSocket = require('ws')
const wsPORT = process.env.WS_PORT||6005

// 전역변수 
// 채팅을 참여하는 사람(peer)들을 담는 배열
let sockets = []

function getSockets(){
    return sockets
}

// socket은 이벤트 적인 요소를 많이 사용해서 화살표함수의 사용을 지양하는 것이 좋다.
// socket evenet javascript -> event ? async await

// 화살표 함수 => 표현식
/*
이 경우에 a()는 작동하지 않음
a()
let a = () =>{}
*/

// 최초의 접속 
function wsInit(){
    const server = new WebSocket.Server({port:wsPORT})        // server아님 Server임  // 대소문자 구별 중요 
    // server은 내가 받은 소켓
    // server.on("why",()=>{console.log("왜")})
    server.on("connection",(ws)=>{
        console.log(ws)
        init(ws)
    })
    // server.on() ~ 메세지를 받을 수 있는 상태
    // connection ~ 이벤트 : 커넥션이 완료된 시점에 두번째 인자값으로 준 콜백 함수를 실행하겠다.
}

function write(ws,message){
    ws.send(JSON.stringify(message))
}

function connectionToPeers(newPeers){
    //http://localhost:3000 http://localhost:3005 http://localhost:3008 -> ['http://localhost:3000','http://localhost:3005','http://localhost:3008']
    newPeers.forEach(peer=>{ // 주소값 ws:http://localhost:7001
        const ws = new WebSocket(peer)
        ws.on('open',()=>{init(ws)})
        ws.on('error',()=>{console.log('connection failed')})
    })
}

function broadcast(message){
    sockets.forEach(socket => {
        write(socket,message)
        // 나 자신에게 메세지를 보내겠다.
    })
    // sockets에 있는 모든 정보를 가져옴
}

function init(ws){
    // 접속 할 때마다 sockets에 들어가게끔 push함수 사용
    sockets.push(ws)
}

module.exports = {
    wsInit,
    getSockets,
    broadcast,
    connectionToPeers,
}