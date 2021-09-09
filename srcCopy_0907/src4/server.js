const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser= require('body-parser')
const bc = require('./block')
const ws = require(('./network'))
const wl = require('./wallet')

app.use(bodyParser.json())

app.get('/blocks',(req,res)=>{
    res.send(bc.getBlocks())
})

app.get('/version',(req,res)=>{
    res.send(bc.getVersion())
})

// curl -X POST -H "Content-Type:application/json" -d "{\"data\":[\"hellow\"]}" http://localhost:3000/mineBlock

app.post('/mineBlock',(req,res)=>{
     const data = req.body.data    
    const result = bc.mineBlock(data)
    if(result == null){
        //res.send(`mineBlock failed`)
        res.status(400).send(`블럭추가에 오류가 발생되었습니다.`)
    }else{
        res.send(result)
    }
})
//peers -> 현재 가지고 있는 소켓리스트 getsockets GET
// curl http://localhost:3000/peers
app.get('/peers',(req,res)=>{
    res.send(ws.getSockets().map( socket=>{
        return `${socket._socket.remoteAddress}:${socket._socket.remotePort}`;
    }))
})

//addPeers -> 내가 보낼 주소값에 소켓을 생성하는 작업 connectToPeers POST
//[]
//curl -X POST -H "Content-Type:application/json" -d "{\"peers\":[\"ws://localhost:6006\"]}" http://localhost:3000/addPeers 
app.post('/addPeers',(req,res)=>{
    const peers = req.body.peers 
    ws.connectionToPeers(peers)
    res.send('success')
})

// curl http://localhost:3000/stop
app.get("/stop",(req,res)=>{
    res.send("server stop")
    process.exit(0)
})

app.get(`/address`,(req,res)=>{
    const address = wl.getPublicFromWallet()
    res.send({address})
})
// 서버 실행후 브라우저에서 localhost:3000/address 로 들어감. 
// 화면에 {"address":"04b78828db84c8e527145d41d19006715c5507b5a0cf9a4f86b7263fc155d9525dd537a3a409b4e35f56e81e6cfe111e9f3215802bb3d5d86fc8ac32df83222bf2"} 출력 


wl.initWallet()
ws.wsInit()
app.listen(port,()=>{
    console.log(`server start port : ${port}`);
})

/*
블록 가져오기
간단한기록들 버전
중단
peer

// window
set 변수명 = 값
set 변수명

// mac or linux
export 변수명 = 값
env | grep 변수명

curl -X GET http://localhost:3000/blocks | python3 -m json.tool

*/

