// client
const WebSocket = require('ws')
const ws = new WebSocket('ws://localhost:6005')  //     '프로토콜방식://ip:port'

ws.on('open', () => {
    ws.send('from network3_2.js')
})
ws.on('error',(err)=>{
    console.log(err)
})
ws.on('message', (message) => {
    // netWork3.js에서 wsInit()함수에서 ws.send('something')을 통해 이곳 client서버에서 message로 받아 received: something을 출력
    // 즉 ws.send()로 보내진 값을 인자값으로 받아서 출력
    console.log(`received at 3_2 : ${message}`)
})

