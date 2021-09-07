// 성진님 - 구글 저장소 - 0907강의
// npm ws 참고 https://www.npmjs.com/package/ws 
//ws
const WebSocket = require('ws')
// ws를 가져와서 WebSocket에 담음
const ws = new WebSocket
// const ws = new Websocket('ws:www.host.com/path')  -> 통신하려는 상대방 주소를 적는 것(클라이언트 주소)
// 클라이언트
// ws -> 객체
// new -> class 앞에 사용
// 즉 Webocket은 클래스임을 의미

// websocket 사용법
// websocket은 기본적으로 server와 client , 최소 두개의 서버가 필요
/*
    http://  localhost:3000
   프로토콜    ip   :  port
    * http
        문서의 형태로 
            start line
            header

     ws://   localhost:3001
   프로토콜    ip   :  port
    -> 연결을 할 건데 연결하려는 상대방의 데이터 통신 방식도 ws이여야 함을 의미

   * 프로토콜 -> 데이터 통신 방법에 대한 규약,정의
   * 웹소켓 -> 브라우저가 발달하면서 등장
   * ws -> http 데이터 통신 방식과는 다름

// ex) 삼성전자 보고서 형식 != 카카오 보고서 형식
*/


ws.on('open',function open(){
    ws.send()
})
// 클라이언트에서 실행됨
// 'open' 되었을 때




/*
const wss = new WebSocketServer({ port:8080})
// 서버로서 실행할 것이라고 선언하는 것
*/

function wsInit(){
    const server = new WebSocket.Server({port:6005})
}
// 내 자신을 웹 소켓 서버로 만들겠다는 내용을 담은 코드

/*
ws.on('connection',function connection(ws){
    // ws -> 클라이언트들에 대한 정보를 담은 것
    // 클라이언트는 여러명 일 수 있다.
    ws.on('message',function incoming(message){
        console.log(`received ${message}`)
    })
    ws.send('something)
})
//  위와 같은 형태가 콜백지옥 형태 -> 콜백 지옥을 극복하기 위해 함수로 만들어서 사용
// 서버와 클라이언트가 연결되었을 때 실행되는 것
*/


// network3.js 파일 참고

/*
function wsInit(){
    const server = new WebSocket.Server({port:6005})
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
}
wsInit()
*/
