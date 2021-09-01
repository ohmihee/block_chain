const fs = require('fs') 
//fs => package.json에 있는 버전 정보를 가져오기 위함

function exGetVersion(){
    let package = fs.readFileSync('../package.json').toString("utf8")
    //console.log(package)
    /*
    {
        "name": "first",
        "version": "1.0.0",
        "description": "",
        "main": "block.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "",
        "license": "ISC"
    }

    */

    //console.log(JSON.parse(package).version) // 1.0.0
    //console.log(JSON.parse(package))
    /*
    {
        name: 'first',
        version: '1.0.0',
        description: '',
        main: 'block.js',
        scripts: { test: 'echo "Error: no test specified" && exit 1' },
        author: '',
        license: 'ISC'
    }
    */
    return JSON.parse(package).version
    // const {version} = JSON.parse(fs.readFileSync("../package.json"))
    // return version    
}

exGetVersion()

function exGetCurrentTime(){
    console.log(new Date().getTime())
}
//==================================================================================================================================

// 1. getversion
function getVersion (){
    let {version} = JSON.parse(fs.readFileSync('../package.json'))
    return version
}

getVersion()

// 2.getcurrenttime => timestamps에 넣을 값
function getCurrentTime(){
    //console.log(Math.ceil(new Date().getTime()/1000))
    //Math함수 // Math.floor() // Math.ceil() // 
    //new Date()
    //getTime()
    return Math.floor(new Date().getTime()/1000)
}

getCurrentTime()