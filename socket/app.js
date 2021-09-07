// 웹소켓 코드 관련 참고 사이트 https://curryyou.tistory.com/348
// ws는 기본적으로 서버측 websocket과 클라이언트 websocket이 통신을 하는 구조.
// 서버측에서 HTTP서버를 연결.
// 클라이언트는 접속하려는 Websocket서버 주소를 연결하여 통신.
// ws는 이벤트 기반
// 서버 클라이언트 연결시 connection 이벤트 발생.
// 데이터를 주고받을 때마다 message 이벤트 발생.
const path = require('path')
const express = require('express')
const app = express()
const ws = require('ws')
require('dotenv').config()

const Httpserver = app.listen(process.env.PORT,()=>{
    //console.log(`server start port ${process.env.PORT}` )
    console.log(process.env.PORT)
})
const webSocketServer = new ws.Server(
    {
        server:Httpserver
    }
)

app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./index.html'))
})



webSocketServer.on('connection',(ws,request)=>{
    const ip = request.headers['x-forwarded-for']||request.connection.remoteAddress
    console.log(`새로운 클라이언트[ ${ip}]접속`)
    /*
    ====서버측 웹소켓 ws.readyState====
    // ws.OPEN => 연결됨
    // ws.CLOSED => 연결끊김
    // ws.CLOSING => 연결끊는 중
    // ws.CONNECTING => 연결 중
    */
    if(ws.readyState===ws.OPEN){

        ws.send(`클라이언트 [${ip}]접속을 환영합니다. from 서버`)
    }
    ws.on('message',(msg)=>{
        console.log(`클라이언트${ip}에게 수신한 메세지:${msg}`)
        ws.send('메시지 잘 받았습니다.!  from 서버')
    })
    ws.on('error',(error)=>{
        console.log(`클라이언트 [${ip}]연결 에러발생:${error}`)
    })
    ws.on('close',()=>{
        console.log(`클라이언트 [${ip}] 웹소켓 연결 종료`)
    })
})

