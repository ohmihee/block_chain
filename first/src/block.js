//search -> 다시 물어보기 / 해보기

const fs = require('fs') 
//fs => package.json에 있는 버전 정보를 가져오기 위함
const merkle = require('merkle')
const CryptoJs = require('crypto-js')
// 초록색은 class 즉 사용시에 => new

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
            // 포인트 ** 
        this.previousHash = previousHash    // 3    
            // 마지말 블럭을 가져오고 -> header -> string 연결 -> sha256
        this.time = time                    // 4    // getCurrentTime()
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

// 링크드리스트 ~블럭을 생성시마다 배열에 집어넣는 행위
let Blocks = [createGenesisBlock()]
/*
console.log(Blocks,'blocksssssssssssss')
[
  Block {
    header: BlockHeader {
      version: '1.0.0',
      index: 0,
      previousHash: '000000',
      time: 1630467393,
      merkleRoot: '725C20214587B0DCD5FBF0DCA637904A97A142E89F4A06F55F6B191E333F6B1C'
    },
    body: [ 'hello block' ]
  }
] blocksssssssssssss
*/
function getBlock(){
    return Blocks
}

// 배열의 마지막 배열 가져오는 방법
//Blocks[Blocks.length-1]
function getLastBlock(){
    //console.log(Blocks[Blocks.length-1])
    return Blocks[Blocks.length-1]
}
//getLastBlock()

// 블록을 추가해주는 함수


function createGenesisBlock(){
    // 1. header만들기
        // - 5개의 인자값을 만들어야함
    const version = getVersion()  // 1.1.0
    const index = 0               // 
    const time = getCurrentTime()  //
    const previousHash = '0'.repeat(64)   // 제네시스 블록은 이전 hash값이 존재하지 않음 // 최초의 블록이므로
    const body = ['hello block']

    const tree = merkle('sha256').sync(body)
    const root = tree.root() || '0'.repeat(64)  //body의 내용이 없다면 ... 예외 처리도 해줌

    const header = new BlockHeader(version,index,previousHash,time,root)
    return new Block(header,body)
}


// 다음블럭의 header와 body를 만들어주는 함수
function nextBlock(bodydata){
    // body는 우리가 정하는 것이므로 인자값을 bodydata로 받음
    const prevBlock = getLastBlock()
    const version = getVersion()
    const time = getCurrentTime()

/*
console.log(prevBlock)
Block {
  header: BlockHeader {
    version: '1.0.0',
    index: 0,
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    time: 1630542165,
    merkleRoot: '725C20214587B0DCD5FBF0DCA637904A97A142E89F4A06F55F6B191E333F6B1C'
  },
  body: [ 'hello block' ]
}
*/
    const index = prevBlock.header.index + 1
    //console.log(index)   // 1
    const previousHash = createHash(prevBlock)
    /*
    //const previousHash = prevBlock.header.previousHash
        이전해쉬값
        version+index+previousHash+timestamp+merkleRoot
        // 해쉬값을 만들어 주는 것 따로 함수로 만듦
    */
    const merkleTree = merkle('sha256').sync(bodydata)  // merkle tree생성
    const merkleRoot = merkleTree.root() || '0'.repeat(64)

    const header = new BlockHeader(version,index,previousHash,time,merkleRoot)
    return new Block(header,bodydata)

}
//nextBlock()

// 각 기능을 함수로 쪼갤 줄 아는 것이 필요 -> 실무에 유용
// 한 가지 함수에 코드가 너무 긴 것은 좋지 않다 -> 최대한 쪼개는 것이 좋음
function createHash(block){
    const {version,index,previousHash,time,merkleRoot} = block.header
    const blockString = version+index+previousHash+time+merkleRoot
    const Hash = CryptoJs.SHA256(blockString).toString()
    return Hash
}

// Blocks에 push
// 블럭을 추가하는 기능만
// 검증은 addBlock함수에 만드는 것이 좋을 듯 ~ 블럭을 만들다가 내용이 이상하면 블럭이 추가 생성되지 않도록....
function addBlock(data){
    // new header => new block(header,body)
    const newBlock = nextBlock(data)
    if(isVaildNewBlock(newBlock,getLastBlock())){
        // if문 안의 조건이 복잡해서 아예 따로 함수로 빼서 만듦
        // 첫 번재 인자값으로 새로운 블럭 두번째 인자값으로 생성할 블런 이전의 마지막블럭을 넣엉줌
        const newBlock = nextBlock(data)
        Blocks.push(newBlock)
        return true
    }
    return false

    //console.log('addBlock')
    //const header = new BlockHeader(version,index,previousHash,time,root)
    //let addBlock = new Block(header,body)
    //Blocks.push(addBlock)
    //console.log(Blocks)
}
addBlock(['hello world1'])
addBlock(['hello world2'])
addBlock(['hello world13'])


/*
    1. 일단 제네시스 블럭이 유효한지 확인 -> 즉 데이터가 바뀐적 없는지
    2. blocks의 모든 배열을 검사
*/
function isValidBlock(){
    if(JSON.stringify(Blocks[0]) !== JSON.stringify(createGenesisBlock())){
        // Blocks의 첫번째 배열에 있는 블럭과 제네시스 블럭이 서로 일치하는지
        // 즉 서로 일치하지 않으면 true출력
        // 일차히면 false출력
        // 근데 객체와 객체는 비교하면 무조건 false출력 하므로 JSON.stringify()를 통해 string으로 바꾸어줘야 한다.
        /*
        console.log(Blocks[0])
            Block {
            header: BlockHeader {
                version: '1.0.0',
                index: 0,
                time: 1630552333,
                merkleRoot: '725C20214587B0DCD5FBF0DCA637904A97A142E89F4A06F55F6B191E333F6B1C'
            },
            body: [ 'hello block' ]
            }
        */
        /*
        console.log(JSON.stringify(Blocks[0]))
            {"header":{"version":"1.0.0","index":0,"previousHash":"0000000000000000000000000000000000000000000000000000000000000000","time":1630552441,"merkleRoot":"725C20214587B0DCD5FBF0DCA637904A97A142E89F4A06F55F6B191E333F6B1C"},"body":["hello block"]}
        */
        console.log(`gensis error`)
        return false
    }
    
    let tempBlocks = [Blocks[0]]
    for(let i = 1; i < Blocks.length; i++){
        // 첫번째 블럭 즉 제네시스 블럭은 위에서 검증했으므로 i=1로 시작
        if(isVaildNewBlock(Blocks[i],tempBlocks[i-1])){
            // true값이 뜨면 -> 유효 잘 되어있음
            tempBlocks.push(Blocks[i])
        }else{
            return false
        }
    }
}
isValidBlock()

function isVaildNewBlock(currentBlock,previousBlock){
    // 기본적인 검사
    //  - type 
    //      ~ 변수 안의 값이 객체 인지 스트링인지 등을 판단하기 위해 / type은 숫자여야함
    //      검증을 위해 다시 함수를 뺌
    
    // currentBlock에 대한 header,body의 datatype을 확인
    if(!isVaildType(currentBlock)){
        console.log(`invaild block structure ${JSON.stringify(currentBlock)}`)
        return false
    }
    
    // index값이 유효한지 확인
    if(previousBlock.header.index+1!==currentBlock.header.index){
        // 이전 블록의 index에서 1을 더한 값과 현재 새롭게 생성된 블록의 index값이 일치해야한다.
        // 근데 만약 두 블록의 index가 일치하지 않는다면
        console.log(`invaild index ${previousBlock.header.index+1} ${currentBlock.header.index}`)
        return false
    }

    // previousHash 체크
    // 블록간 연결되어 있는지 새롭게 생성된 블록이 이전 블록의 해쉬값을 가리키고 있는지
    /*
    우리가 해쉬값 어떻게 만들었었나??
        => 해당블럭의 header의 내용을 string 으로 합쳐서 SHA256을 활용하여 암호화한 결과물
        previousHash           previousHash
        제네시스블럭기준 -> 2번째 블럭
    */
    if(createHash(previousBlock)!==currentBlock.header.previousHash){
        // 이전에 함수로 만든 함수 재사용
        // 현재 블록의 해쉬는 이전블록의 data를 이용하여 hash를 한 것이므로...
        // 즉 이전 블록의 data로 만들어진 hash값과 현재 블록의 해쉬값을 비교하여 true false 판단
        console.log(`invaild previousBlock`)
        return false
    }

    // body check
    /*
        current.header.merkleRoot -> body[배열]
        current.body -> merkleTree root -> result !== current.header.merkleRoot
        굳이 왜?..
            ~ 네트워크로 통신되면서 각 각의 컴퓨터에서 data가 바뀌게 되므로 
              현재 내가 가진 data가 정확한지 확인하기 위해 체크
        body... -> 내용이 없으면 안된다.
        currentBlcok.body.lenth !==0 || ( currentBlock.body가지고 만든 merkleRoot !== currentBlock.header.merkleRoot)
        currentBlock.body.length !==0 || ( merkle("sha256").sync(currentBlock.body).root()!== currentBlock.header.merkleRoot)

    */
   if(currentBlock.body.length === 0){
       console.log('invaild body')
       return false
   }
   if(merkle("sha256").sync(currentBlock.body).root()!== currentBlock.header.merkleRoot){
       console.log(`invaild merkleRoot`)
       return false
   }
        // 아래의 코드를 이해하기 쉽도록 나눈 것이 위의 두 if조건문
        // 이 부분 어려움 여러번 쳐보고 찾아볼 것========================================================================================================================================================
    if( !(currentBlock.body.length !== 0 && ( merkle("sha256").sync(currentBlock.body).root() === currentBlock.header.merkleRoot)) ){
        console.log(`invaild merkleRoot`)
        return false
    }
    return true

}

// 타입검사
function isVaildType(block){
    // 검사하려는 블럭만 넣어줌 -> 즉 새롭게 생성되는 블럭
    // 만들때 검사하면 그 이후에는 검증된 것이므로 다시 검증할 필요가 없으므로 새롭게 생성되는 블럭만 검사
    return(
    typeof(block.header.version)==="string" &&       // string  => true
    typeof(block.header.index)==='number' &&         // number  => true
    typeof(block.header.previousHash)==="string" &&  // string  => true
    typeof(block.header.time)==="number"  &&         // number  => true
    typeof(block.header.merkleRoot)==="string" &&    // string  => true
    typeof(block.body)==="object"                    // object  => true
    //console.log(block.body)
    )
    // return안의 모든 조건이 true이여야 true출력
    
    // typeof() -> 자바스크립트에서 type을 알려주는 함수
}
//const block = createGenesisBlock()   // 제네시스 블록 생성
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
    return Math.ceil(new Date().getTime()/1000)
}

getCurrentTime()

/*
 class { header body} // 1차 목표는 제네시스 블록을 만드는 것
*/


//console.log(Blocks)

module.exports = {
    getBlock,
    getLastBlock,
    addBlock,
    getVersion
}

/*
blockchain 네트워크
P2P
 -> 프루타
 -> 당나귀
 -> 소리바다
 -> websocket 
 ~ 클라이언트도 서버에서 서버도 클라이언트에게 요청 가능
 ~ 모든 요청에 대해 답하지 않아도 됨
 ~ 즉 쌍방향 통신

클라이언트 - 서버 -> http tcp

------ 0903 할 것
L 간단한 블록체인 생성
L 트랜잭션 거래
L walt
L 지분증명(PoS, Proof of Stake)
L 합의 알고리즘


---- 0906 이후 할 것
L 코인 빌드
L Dapp 비슷한 것 만들기
L 솔리디티 


*/