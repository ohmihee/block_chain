const express = require('express')
const app = express()
const port = process.env.PORT||3000
const bodyParser = require('body-parser')
//const bc = require('./block')
//const ws = require('./network')

app.use(bodyParser.json())

app.get('/stop',(req,res)=>{
    res.send('server stop')
    process.exit(0)
})


app.listen(port,()=>{
    console.log(`server start port : ${port}`)
})