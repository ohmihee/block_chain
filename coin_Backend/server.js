const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const PORT = process.env.PORT || 3500
const {sequelize} = require('./models')
const bodyParser = require('body-parser')
const morgan = require('morgan')



app.set('veiw engine','html')
nunjucks.configure('views',{express:app})

sequelize.sync({force:true})
.then(_=>{
    console.log('db success')
})
// _는 ()로 해도 가능 _는 그냥 변수로 코드의 간결성을 위해 짧게 만들어주기 위한 것
.catch(_=>{
    console.log('db fail')
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index.html')
})

// app.use((req,res,next)=>{
//     const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
//      error.status = 404
// })
// uri값이 없는 경우는 모든 곳에 적용되어라

app.use((req,res,next)=>{
    // console.log('error')
    // 콘솔로그는 가능한 찍지 않는 방향으로
    // 개발 효율성 떨어짐
    // 나중에 취업시에 콘솔 사용시 안 좋음
    res.render('404')
})

app.listen(PORT,()=>{
    console.log('server start port 3000')
})