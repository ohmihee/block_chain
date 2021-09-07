const express = require('express')
const app = express()
const path = require('path')
const HttpServer = app.listen(3011,()=>{
    console.log('server start port 3011')
})

const wsModule = require('ws')
const webSocketServer = new wsModule.Server({
    server:HttpServer
})
const fs = require('fs')
const { request } = require('express')

app.use('/',(req,res)=>{
    res.sendFile(path.json(__dirname,'./client.html'))
})

webSocketServer.on('connection',(ws,request)=>{
    const ip = request.header['x-forwarder-for']||request.connection.remoteAddress
    console.log('클라이언트 접속2')
    if(ws.readyState===ws.OPEN){
        ws.send(`클라이언트 접속을 환영합니다.`)
    }
})