const express = require('express')
const app = express()
const path = require('path')
const HttpServer = app.listen(3005,()=>{
    console.log(`server start ${3005}`)
})
const wsModule = require('ws')
const webSocketServer = new wsModule.Server({
    server:HttpServer
})
const fs = require('fs')


app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./index.html'))
})

webSocketServer.on('connection',(ws,request)=>{
    const ip = request.headers['x-forwarded-for']||request.connection.remoteAddress
    console.log(`새로운 클라이언트 [${ip}] 접속`)

    if(ws.readyState===ws.OPEN){
        ws.send(`클라이언트 ${ip} 접속을 환영합니다.  from서버`)
    }
    ws.on('message',(msg)=>{
        let answer = fs.readFileSync('./answer').toString()
        console.log(`클라이언트에게 수신한 메세지 : ${msg}`)
        ws.send(answer)
    })
    ws.on('error',(error)=>{
        console.log(`클라이언트 ${ip}연결 에러 발생: ${error}`)
    })
    ws.on('close',()=>{
        console.log(`클라이언트 ${ip} 웹소켓 연결 종료`)
    })
})
