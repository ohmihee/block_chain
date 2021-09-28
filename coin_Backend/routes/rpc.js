const express = require('express')
const router = express.Router()
// nodeset폴더의 server.js파일 참고
const request = require('request')
const logger  = require('../logger')
require('dotenv').config()


const headers = {"Content-type":"application/json"}

const USER = process.env.RPC_USER
const PASS = process.env.RPC_PASSWORD
const RPCPORT = process.env.RPC_PORT
// rpc통신을 할 때 아이디 값 존재  ~ 구분값을 위해 존재
const ID_STRING = 'fivecoin_exchange'
const ACCOUNT = 'mihee'
const url = `http://${USER}:${PASS}@127.0.0.1:${RPCPORT}`
// sever.js와 rpc연결

router.get('/test',(req,res)=>{
    res.json({msg:'test api'})
})

function createbody(method,params=[]){
    let obj = {jsonrpc:"1.0", id:ID_STRING, method, params}
    return JSON.stringify(obj)
}

// 블록갯수 구하기
router.get('/getblockcount',(req,res,next)=>{
    let body = createbody('getblockcount',[])
    let options = {url,method:"POST",headers,body}

    const callback = (err,response,data) => {
        console.log('callback')

        if(err == null && response.statusCode == 200){
            const body = JSON.parse(data)
            res.json(body)
        }else{
            logger.error(`/getblockcount error`)
            next()
        }
    }
    console.log(options)
    request(options,callback)
})

module.exports = router