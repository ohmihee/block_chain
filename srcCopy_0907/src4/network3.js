// server
const WebSocket = require('ws')

let sockets = []  // 내가 접속한 사람들의 특정한 사람들에게만 내용을 전달하고 싶어서.
// sockets = [ws,ws,ws,,,,,]
function wsInit(){
    const server = new WebSocket.Server({port:6005})
    /*
    console.log(1)
    server.on('connection',(ws) => {
        console.log(2)
        ws.on('message', (message) => {
            console.log(3)
            console.log(`${message}`)
            // network3_2.js에서 ws.send('go to netWork3.js')를 message를 통해 받은 것
            //console.log(`received ${message}`)
        })
        ws.send('from network3.js')
        console.log(4)
    })
    */
   server.on('connection',(ws)=>{
       init(ws)
       // ws.on('message',()=>{})
       // ws.send('text~')
       // 
   })
}

function init(ws){
    // ws는 websocket에 대한 것을 담고 있음
    // 즉 함수의 인자값으로 ws를 전달하여 websocket관련한 기능등을 사용할 수 있게끔 전달
    sockets.push(ws)
    initMessageHandler(ws)
}
function initMessageHandler(ws){
    ws.on('message',(data)=>{
        //console.log(data) //<Buffer 66 72 6f 6d 20 6e 65 74 57 6f 72 6b 33 5f 33 2e 6a 73>
        console.log(`${data}`,'initmessagehandler')
        console.log(data.toString(),'data.toString()')
        // from netWork3_3.js initmessagehandler
    })
}

wsInit()

// websocket이 연결되는 전에는 console.log(1)만 실행
// 그 뒤에는 연결되지 않았기 때문에 나머지 console.log()들이 실행되지 않음

// 연결된 후에는 1 2 4 3 순으로 실행된다.

// 서버가 어떤 작업을 실행 후 바로 꺼지는 경우와 계속 서버가 유지되는 경우의 차이??????
//console.log('hello')

module.exports = {
    wsInit
    // wsInit:wsInit
    // wsInit을 내보냄

}