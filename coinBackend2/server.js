const express = require('express')
const app = express()
const morgan = require('morgan')
const port = process.env.PORT||3200
const bodyParser = require('body-parser')
const {sequelize} = require('./models')
const nunjucks = require('nunjucks')
require('dotenv').config()

app.set('view engine','html')
nunjucks.configure('views',{express:app})

sequelize.sync({force:true})
.then(_=>{
    console.log('suc')
})
.catch(_=>{
    console.log('fail')
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.render('index')
})


app.listen(port,()=>{
    console.log('server')
})