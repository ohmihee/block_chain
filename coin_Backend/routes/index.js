const express = require('express')
const router = express.Router()

// 거래소 관련



// API관련            ~RPC
router.get('/',(req,res)=>{res.render('index')})
router.use('/api',require('./rpc'))







module.exports = router