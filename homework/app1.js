const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const HttpServer= app.listen(3010,()=>{
    console.log('server start port 3010')
})
const wsModule = require('ws')
const webSocketServer = new wsModule.Server({
    server:HttpServer
})
const fs = require('fs')


app.use(bodyParser.urlencoded({extended:false}))


app.post('/client',(req,res)=>{
    
    
    //res.send(req.body)
})
app.get('/',(req,res)=>{
    console.log('app.get')
    res.sendFile(path.join(__dirname,'./client.html'))
})


webSocketServer.on('connection',(ws,request)=>{
    const ip = request.headers['x-forwarded-for']||request.connection.remoteAddress
    console.log(`client 접속1 `)

    if(ws.readyState===ws.OPEN){
        ws.send(`클라이언트 접속을 환영합니다.`)
    }
    ws.on('message',(msg)=>{
        console.log(`client1 : ${msg}`)
        ws.send(`client1 ${msg}`)
    })
    ws.on('error',(error)=>{
        console.log(`클라이언트 1 연결 에러 ${error}`)
    })
    ws.on('close',()=>{
        console.log(`클라이언트1 웹소켓 연결 종료`)
    })
})

