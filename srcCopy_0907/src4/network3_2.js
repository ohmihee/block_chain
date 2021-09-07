// client
const WebSocket = require('ws')
const ws = new WebSocket('ws://localhost:6005')  //     '프로토콜방식://ip:port'

ws.on('open', () => {
    
    /*
    let obj = {
        type:0,
        name:'algml',
        data:'안녕하세요obj'
    } 
    write(ws,obj)
    */
   let hi = '안녕하세요'
    write(ws,queryBlockMsg('내 이름은'))
    let obj2 = {
        type:1,
        data:'data를 보내겠다. obj2'
    }
    // websocket은 data를 send로만 처리하여 전달할 수 있으므로 
    // 구분값을 통해 다르게 처리 
    //let rst = JSON.stringify(obj)
    //ws.send('from network3_2.js')
    //ws.send('{"name":"algml"}')
    //ws.send(rst)
    // send로 내용을 보내면 string으로만 보내진다.
    // JSON.stringify()를 통해 string형태로 보내고 받을때 다시 JSON parse로 객체 형태로 바꿔줌
    //write(ws,obj2)
    // string형태롤 바꾸는 것은 메세지를 보낼때 반복적으로 이루어지는 일이므로 write()함수로 만들어 처리
    let obj3 = {
        type:'send2',
        data:'data를 보내겠다. obj2'
    }
    //write(ws,obj3)
    
})
function queryAllMsg(insertdata){
    return{
        type:MessageAction.QUERY_ALL,
        data:insertdata
    }
}
const MessageAction = {
    QUERY_LAST:0,
    QUERY_ALL:1,
    RESPONSE_BLOCK:2

}
function queryBlockMsg(insertdata){
    return{
        type:MessageAction.QUERY_LAST,
        data:insertdata
    }
}
function write(ws,message){
    ws.send(JSON.stringify(message))
}
ws.on('error',(err)=>{
    console.log(err)
})
ws.on('message', (message) => {
    // netWork3.js에서 wsInit()함수에서 ws.send('something')을 통해 이곳 client서버에서 message로 받아 received: something을 출력
    // 즉 ws.send()로 보내진 값을 인자값으로 받아서 출력
    console.log(`received at 3_2 : ${message}`)
})

