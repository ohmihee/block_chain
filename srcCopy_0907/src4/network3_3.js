const WebSocket = require('ws')
const ws = new WebSocket("ws://localhost:6005")

ws.on('open',()=>{
    ws.send('from netWork3_3.js')

})


ws.on('error',()=>{
    console.log('error 발생')
})

ws.on('message',(message)=>{
    console.log(`received at 3_3: ${message}`)
})
