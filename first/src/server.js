const express = require('express')
const app = express()
const port = process.env.PORT||3000
const bodyParser = require('body-parser')
//const {getBlocks} = require('./block.js')
const bc = require('./block.js')
const  ws  = require('./netWork.js')
//const ws = require('ws')
//bc.getBlocks()

app.use(bodyParser.json())

app.get('/blocks',(req,res)=>{
    res.send(bc.getBlocks())
})

app.get('/version',(req,res)=>{
    res.send(bc.getVersion())
    //console.log(bc.getVersion())  => 1.0.0
})

// blocks 배열에 {}
// curl http://localhost:3000/mineBlock -X POST -H "Content-Type:application/json" -d "{\"data\":[\"hello\"]}"

// -d  ~ data의 약자
    // -X ~ request관련 내용들
    // -H ~ header에 내용을 보내겠다.
app.post('/mineBlock',(req,res)=>{
    // let {bodydata} = req.body
    //let bodydata='hello'
    //bc.addBlock(['bodydata'])
    //console.log(bc.getBlocks())
    //res.send(bc.getBlocks())
    const data = req.body.data
    const result = bc.addBlock(data)
    if(result == false){
        res.send(`mineblock failed`)
    }else{
        res.send(result)
    }
})

// peers -> 현재 가지고 있는 소켓리스트 getSockets 
// curl http://localhost:3000/peers
app.get('/peers',(req,res)=>{
    res.send(ws.getSockets().map(socket=>{
        return `${socket_socket.remoteAddress}:${socket._socket.remotePort}`;
    })  )
})
// addPeers -> 내가 보낼 주소값에 소켓을 생성하는 작업 connectToPeers POST
// []
// curl -X POST -H "Content-Type:application/json" -d "{\"peers\":[\"ws://localhost:7001\",\"ws://localhost:7002\"]}" http://localhost:3000/addPeers
app.post('/addPeers',(req,res)=>{
    const peers = req.body.peers  // 예외처리용 => || [] 
    ws.connectionToPeers(peers)
    res.send('success')
})

// curl http://localhost:3000/stop
app.get('/stop',(req,res)=>{
    res.send('server stop')
    process.exit(0)
})

app.get('/check',(req,res)=>{
    console.log(bc.getBlocks())
    res.send(bc.getBlocks())
})


// app.get('/',(req,res)=>{
//     console.log('hello')
//     res.send('hello')
// })

ws.wsInit()

app.listen(port,()=>{
    console.log(`server start port ${port}`)
})

/*
블록 가져오기
간단한 기록들 버젼
중단
peer
*/

/*
window 
터미널에서 cmd를 키고 거기서
""
set 변수명 = 값
set 변수명
ex) set PORT=3001
    set PORT   //3001

// mac or linux
export 변수명=값
env | grep 변수명
*/

/*
리눅스명령어 - windows 터미널 켜고 입력
curl -X GET http://localhost:3000/blocks

파이썬 설치외더 있는 경우
curl -X GET http://localhost:3000/blocks | python -m json.tool -> 이 명령어도 가능

*/