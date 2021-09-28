// url 127.0.0.1:3800 에 요청시  -> hello ohcoin출력   ~ 이 정도는 당연당연 당연히 안 보고 할 줄 알아야 함
// 코드 작성 후 localhost:3800  or   http://127.0.0.1:3800/ 들어가서 확인
// request   //  크롤링

const express = require('express')
const app = express()
const request = require('request')
// request -> 함수
const cheerio = require('cheerio') 
// npm i cheerio


// 요청 -> 응답  
// 요청에 대해 바로 응답하는
app.get('/',(req,res)=>{
    res.send('hello ohcoin')
})

// 요청 -> 요청 -> 응답 -> 응답
//  A  ->  B    ->   B  ->  A
app.get('/naver',(req,res)=>{
    //res.send('naver')
    
    // 요청 만드는 코드 -> request 사용
    // request 사용법
    request(`https://naver.com`,(err,response,body)=>{
        //console.log(body)
        //console.log(response)
        //console.log(err)   -> 이 값이 null이면 error없이 잘 수행된 것
        // error가 난다고 해도 아래의 res.send('naver')는 수행
        // 결과여부와 상관없이 naver출력
        // 싱글스레드 개념
        // request는 즉 비동기   ->  request는 await는 불가
            // await는 프로미스인 경우에만 가능
            // 비동기라고 해서 async await 사용이 모두 가능한 것은 아님
            //console.log(err)
            //console.log(err)
            // 주소를 https://naver.cm으로 해서 일부러 오류를 만들어서 해봄
            // 아래의 코드는 error처리
            if(err==null&&response.statusCode == 200){
                res.send('naver')
            }else{
                res.send('error')
            }            
    })
    // 2개의 인자값 존재
        // 1 : url값(string) or object{url 존재합니다.}
                // -> request함수는 string값 object값 모두 처리해줌
        // 2 : 콜백에 대한 값       
                // -> naver에 의해 결과물이 모두 오면 실행할 콜백함수 응답 b에 대한 내용
                // 콜백 함수는 3가지 인자값 
                    //  error(말그대로 error)   / response(응답)   / body(body영역을 그대로 스트링 값으로 가져옴)
    //res.send('hello ohcoin')
})

app.get('/naver2',(req,res)=>{
    // 첫번째 인자값 => url   ~ 객체도 가능
        // 
    // 두번째 인자값 => callback
    request({
        url:"http://naver.com",
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:"{msg:'hello world!}"
    }
//  //curl -X POST -H "Content-type: application/json" -d '{"method":"getnewaddress","params":["algml"]}' root:1234@127.0.0.1:3000

    // 네이버가 post로 보내는 것은 없으므로 위의 코드는 제대로 작동하지는 않음
    ,(err,response,data)=>{
        //console.log(data)
        console.log(response.statusCode)  //301
        // 에러처리도 가능
        // 조건이 성공일 때 상태코드는 200이고 err=null
        // 위의 /naver_get 부분의 에러처리 조건 부분 참고
        if(err==null&&response.statusCode==200){
            res.send('naver2')
        }else{
            res.send('error')
        }
    })
})

// 크롤링 *************************************************************************************************************
app.get('/crawling',(req,res)=>{
    request('http://naver.com',(err,response,data)=>{
        //console.log(data)
        let $ = cheerio.load(data)
        $('.partner_box_wrap > .partner_box:nth-child(3) > a ').each((index,item)=>{
            //console.log(typeof(item))   
            // console.log(item)
            let {data} = item.children[0]
            console.log(data)
                // 네이버 개발자 센터
                // 오픈 API
                // 오픈소스
                // 네이버 D2
                // 네이버 D2SF
                // 네이버 랩스
            
        })
        // class = "partner_box" 에 해당하는 data를 가져옴
        // css selector를 통해 가져옴
        // .each()는 forEach()와 비슷
     

        // js에서는 특이하게 $,_ 특수문자를 변수로 사용하근ㅇ
        // 내가 가진 값을 element형태로 바꿀 것임
    })
})

//curl -X POST -H "Content-type: application/json" -d '{"method":"getnewaddress","params":["algml"]}' root:1234@127.0.0.1:3000
// -X POST
// -H "Content-type: application/json"
// -d '{"method":"getnewaddress","params":["algml"]}'
// root:1234@127.0.0.1:3000 

const headers = {"Content-type":"application/json"}

const USER = process.env.RPC_USER || 'root'
const PASS = process.env.RPC_PASSWORD || '1234'
const RPCPORT = process.env.RPC_PORT || 3000
// 위의 정보는 실제 데몬으로 연결할때 기입한 정보로 넣어야 한다.

// app.get('/newaddress2/:account',(req,res)=>{
//     const {account} = req.params
//     console.log(account)
//     res.send('제발 나와')
// })

app.get('/newaddress/:account',(req,res)=>{
    const {account} = req.params
    console.log(account)
    const body =`{"method":"getnewaddress","params":["${account}"]}`
    const options = {
        //url :"root:1234@127.0.0.1:3000",
        url:`http://${USER}:${PASS}@127.0.0.1:${RPCPORT}`,
        method:"POST",
        headers,
        body
    }
    //curl -X POST -H "Content-type: application/json" -d '{"method":"getnewaddress","params":["algml"]}' root:1234@127.0.0.1:3000
    const callback = (err,response,data) => {
        if(err == null && response.statusCode == 200 ){
            const body = JSON.parse(data)
            res.send(body)
            //res.render()   // html페이지 보여주기 가능
        }else{
            res.send('error')
        }
    }
    request(options,callback)
})

app.listen(3800,()=>{
    console.log('server start port 3800')
})


// ## 크롤링
// 