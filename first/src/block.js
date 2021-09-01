const fs = require('fs') 
//fs => package.json에 있는 버전 정보를 가져오기 위함
const merkle = require('merkle')
const CryptoJs = require('crypto-js')
const { runInThisContext } = require('vm')
const { create } = require('domain')
// 초록색을 class 즉 사용시에 => new

/* 
 < 사용법 > 
// merkle
const tree = merkle("sha256").sync([]) // tree 구조
// 기본적으로 배열로 넣어준다.
tree.root()
// tree에서 root를 가져와준다.
*/

// block의 header를 만드는 객체
class BlockHeader {
    constructor(version, index, previousHash, time, merkleRoot,){
        this.version = version              // 1 {verion:1}
        this.index = index                  // 2 {version:1, index:2}
        this.previousHash = previousHash    // 3
        this.time = time                    // 4
        this.merkleRoot = merkleRoot        // 5
    }
}
// class는 사용시에 new사용

/*

const header = new BlockHeader(1,2,3,4,5)
console.log(header)
BlockHeader {
  version: 1,
  index: 2,
  previousHash: 3,
  time: 4,
  merkleRoot: 5,
 // hello:hello() // 이와 같이 함수도 넣을 수 있다.
}
*/
class Block{
    constructor(header,body){
        this.header = header
        this.body = body
    }
}

const blockchain  = new Block(new BlockHeader(1,2,3,4,5),['hello',['hi'],{name:'algml'}])  //=>  여기에 올바른 정보를 입력하면 이게 바로 제네시스 블록 즉 최초로 생성되는 블록
//console.log(blockchain)
/*
console.log(blockchain)
Block {
  header: BlockHeader {
    version: 1,
    index: 2,
    previousHash: 3,
    time: 4,
    merkleRoot: 5
  },
  body: [ 'hello' ]
}
*/

function createGenesisBlock(){
    // 1. header만들기
        // - 5개의 인자값을 만들어야함
    const version = getVersion()  // 1.1.0
    const index = 0               // 
    const time = getCurrentTime()  //
    const previousHash = '0'.repeat(6)   // 제네시스 블록은 이전 hash값이 존재하지 않음 // 최초의 블록이므로
    const body = ['hello block']

    const tree = merkle('sha256').sync(body)
    const root = tree.root() || '0'.repeat(64)  //body의 내용이 없다면 ... 예외 처리도 해줌

    const header = new BlockHeader(version,index,previousHash,time,root)
    return new Block(header,body)
}

const block = createGenesisBlock()   // 제네시스 블록 생성
/*
console.log(block)
Block {
  header: BlockHeader {
    version: '1.0.0',
    index: 0,
    previousHash: '000000',
    time: 1630467082,
    merkleRoot: '725C20214587B0DCD5FBF0DCA637904A97A142E89F4A06F55F6B191E333F6B1C'
  },
  body: [ 'hello block' ]
}
*/
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

/*
 class { header body} // 1차 목표는 제네시스 블록을 만드는 것
*/