const fs = require('fs')
const merkle = require('merkle')
const CryptoJs = require('crypto-js')
const random = require('random')
const {hexToBinary} = require('./utils')
/* 사용법 */
// const tree = merkle("sha256").sync([]) // tree 구조 
// tree.root()

const BLOCK_GENERATION_INTERNAL = 10   // 초  // 즉 10초마다 ... 
const BLOCK_ADJUSTIMENT_INTERVAL = 10   // 블럭 갯수 // 즉 블럭 10개마다 난이도 변화  // 제네시스 블럭은 제외하고 새롭게 생성하는 블럭에 대해서만


class BlockHeader {
    constructor(version, index, previousHash, time, merkleRoot, difficulty, nonce) {
        this.version = version
        this.index = index  // 마지막 블럭의 index + 1 
        this.previousHash = previousHash // 마지막 블럭 -> header -> string 연결  -> SHA256
        this.time = time  //
        this.merkleRoot = merkleRoot

        // header에 추가된 내용 
        // 내용 추가 후 -> 제네시스 블록함수의 내용 수정 -> nextBlock함수에 내용 변경 -> findBlock함수 -> utils.js파일
        this.difficulty = difficulty   // 문제의 난이도에 대한 내용
        this.nonce = nonce // 문제의 시도 횟수
    }
}

class Block {
    constructor(header, body) {
        this.header = header
        this.body = body
    }
}

let Blocks = [createGenesisBlock()]

function getBlocks() {
    return Blocks
}

function getLastBlock() {
    return Blocks[Blocks.length - 1]
}

function createGenesisBlock() {
    // 1. header 만들기 
    // 5개의 인자값을 만들어야되여.
    const version = "1.0.0"//getVersion() // 1.0.0
    const index = 0
    const time = 1630907567//getCurrentTime()
    const previousHash = '0'.repeat(64)
    const body = ['hello block']

    const tree = merkle('sha256').sync(body)
    const root = tree.root() || '0'.repeat(64)

    // 0908_작업증명 추가된 내용
    const difficulty = 16
    const nonce = 0
    // BlockHeader사용한 곳에 인자값으로 difficulty,nonce 추가해주기

    const header = new BlockHeader(version, index, previousHash, time, root, difficulty, nonce)
    return new Block(header, body)
}
//다음블럭의 header와 body를 만들어주는 함수
// 여기서 mining(마이닝)에 대한 부분을 처리하게 될듯
function nextBlock(data) {
    const prevBlock = getLastBlock()
    const version = getVersion()
    const index = prevBlock.header.index + 1
    const previousHash = createHash(prevBlock)
    //const previousHash = prevBlock.header.previousHash
    /*
    sha256(version+index+previousHash+timestamp)
    */
    const time = getCurrentTime()

    const difficulty = getDifficulty(getBlocks())  // 난이도 가져오는 것 함수로 만들어서
    

    const merkleTree = merkle("sha256").sync(data)
    const merkleRoot = merkleTree.root() || '0'.repeat(64)

    const header = findBlock(version, index, previousHash, time, merkleRoot, difficulty)
    return new Block(header, data)
}

function getDifficulty(blocks){
    // 시간
    // const lastBlock = getLastBlock()   

    const lastBlock = blocks[blocks.length-1]   // -> 마지막 배열값 가져오는 방식 , 굉장히 기본적인 내용
    if(lastBlock.header.index % BLOCK_ADJUSTIMENT_INTERVAL === 0
        && lastBlock.header.index != 0
        ){
        // 난이도를 조정하는 코드 -> 난이도 조정하는 것도 함수로 따로 빼고 작업
        return getAdjustedDifficulty(lastBlock,blocks)
    }
    return lastBlock.header.difficulty  
}

// 해당 함수에 대한 내용 부분 이해 가지 않음.........................................................................................질문할 것=============================================================================
function getAdjustedDifficulty(lastBlock,blocks){
    // block 10단위로 끊음 ... 10개씩 관리...
    // 게시판의 페이징처럼 ... 이전의 값 즉 난이도가 증가되기 전 값
    // lastBlock난이도
    const prevAdjustmentBlock = blocks[blocks.length - BLOCK_ADJUSTIMENT_INTERVAL]
    // ex) 20 - 10 = 10
    const timeToken = lastBlock.header.time - prevAdjustmentBlock.header.time
    // ex) 시간내에 만들어지게끔 할 수 도 있다.
    const timeExpected = BLOCK_ADJUSTIMENT_INTERVAL * BLOCK_GENERATION_INTERNAL

    if(timeToken < timeExpected/2){
        return prevAdjustmentBlock.header.difficulty + 1
        // 예상시간보다 빨리 만들어지는 경우 -> 난이도 올림
    }else if(timeToken >  timeExpected *2){
        return prevAdjustmentBlock.header.difficulty - 1
        // 만드는 시간이 예상시간보다 오래 걸릴 경우 -> 난이도를 낮춤
    }else{
        return prevAdjustmentBlock.header.difficulty
    }
}

function findBlock(version, index, previousHash, time, merkleRoot, difficulty){
    // findBlock이 앞으로 header를 만들어줄 것이다.
    let nonce = 0
    // 조건에 맞을 때까지 무한 반복
    while(true){
        // while(true){}  -> 무한반복~조건이 계속  true이므로
        // 이곳엥서 함수호출
        let hash = createheaderHash(version,index,previousHash,time,merkleRoot,difficulty,nonce)
        //console.log(hash.toString(2),'이진수')
        console.log(hash)
        // if조건 내가 가지고 있는 해쉬에서 그 값을 이진수로 바꾸고 이진수로 바꾼 값 중에서 첫 글자가 0인가?
        // if문 한 줄로 넣기는 내용이 조금 많은 느낌 -> 때문에 함수로 조건을 충족하면 true를 return 하도록 함.
        if(hashMatchDifficulty(hash,difficulty)){   // 우리가 앞으로 만들 header의 hash 값의 앞자리 0이 몇개인가?
            // 현재 상태에서는 block이 없다. - 즉 현재는 블록을 만들기위한 정보만 존재 객체 즉 블록은 생성하기 전
            // if의 조건문이 우리가 어떻게 문제를 맞추는지 판단
            // return값을 주면 무한 반복 탈출
            return new BlockHeader(version, index, previousHash, time, merkleRoot, difficulty, nonce)
        }
        nonce++
    }
}

// 일반적으로 마이닝할 때 함수로 만들어서 마이닝하게끔 만든다.
function hashMatchDifficulty(hash,difficulty){
    // ex )difficulty가 2이면~
    // hash 현재 16진수 -> 2진수로 바꿔야함
    const hashBinary = hexToBinary(hash)
    // L 16진수를 2진수로 바꾸어 준 것임.
    //hashBinary.startsWith() -> 결과값을 true 또는 false boolean 값으로 출력해주는 함수
    // ex) hashBinary.startWith("00000000") 
    const prefix = '0'.repeat(difficulty)
    return hashBinary.startsWith(prefix)

}

function createheaderHash(version, index, previousHash, time, merkleRoot, difficulty,nonce){
    let txt = version + index + previousHash + time + merkleRoot + difficulty + nonce
    return CryptoJs.SHA256(txt).toString().toUpperCase() 
    // header의 내용을 가져와서 해쉬를 만들어줌
}

function createHash(block) {
    const { version, index, previousHash, time, merkleRoot } = block.header
    const blockString = version + index + previousHash + time + merkleRoot
    const Hash = CryptoJs.SHA256(blockString).toString()

    return Hash
}

//Blocks push
function addBlock(newBlock) {
    // new header -> new block ( header , body)
    if (isVaildNewBlock(newBlock, getLastBlock())) {
        Blocks.push(newBlock);
        return true;
    }
    return false

}

function mineBlock(blockData) {
    const newBlock = nextBlock(blockData) //Object Block {header,body}
    if (addBlock(newBlock)) {
        const nw = require('./network')
        nw.broadcast(nw.responseLastMsg())
        return newBlock
    } else {
        return null
    }

}

/* etc 
1:타입검사
*/

function isVaildNewBlock(currentBlock, previousBlock) {
    //currentBlock 에대한 header,body Data Type 을 확인
    if (!isVaildType(currentBlock)) {
        console.log(`invaild block sructure ${JSON.stringify(currentBlock)}`)
        return false
    }
    //index 값이 유효한지
    if (previousBlock.header.index + 1 !== currentBlock.header.index) {
        console.log(`invaild index`);
        return false
    }
    //previousHash 체크 
    /*
    어떻게 만들었는가?
    해당블억의 header의 내용을 글자로 합쳐서 SHA256 활용하여 암호화한 결과물
    previousHash       previousHash
    제네시스 블럭기준  -> 2번째 블럭
    */
    if (createHash(previousBlock) !== currentBlock.header.previousHash) {
        console.log(`invaild previousBlock`);
        return false
    }
    //Body check
    /*
        current.header.merkleRoot -> body [배열]
        current.body -> merkleTree root -> result !== current.header.merkleRoot
        네트워크....
        body... 내용이 없으면 안됨
        current.body.lenght !== 0 || (currentBlock.body 가지고 만든 merkleRoot ! == currentBlock.header.merkleRoot)
        current.body.lenght !== 0 || (merkle("sha256").sync(currentBlock.body).root() ! == currentBlock.header.merkleRoot)
    */
    if (currentBlock.body.length === 0) {
        console.log(`invaild body`);
        return false;
    }
    if (merkle("sha256").sync(currentBlock.body).root() !== currentBlock.header.merkleRoot) {
        console.log(`invalid merkleRoot`);
        return false
    }

    //   if( !(currentBlock.body.length !== 0 && (merkle("sha256").sync(currentBlock.body).root() !== currentBlock.header.merkleRoot)) ){
    //      console.log(`invalid merkleRoot`);
    //      return false
    //   }
    return true
}
function isVaildType(block) {
    return (typeof (block.header.version) === "string" &&
        typeof (block.header.index) === "number" &&
        typeof (block.header.previousHash) === "string" &&
        typeof (block.header.time) === "number" &&
        typeof (block.header.merkleRoot) === "string" &&
        typeof (block.body) === "object"
    );
}

function replaceBlock(newBlocks) {
    //newBlocks : 내가 받은 전체 배열 => 내가 받은 전체 블록들
    //Blocks = newBlocks
    //1.newBlocks 내용을 검증해야 합니다
    //2.검증을 한번만 하지 않습니다. 랜덤하게 한번만 할수있고,두번할수있고 세번할수도 있게 합니다 -> 조건문에 random 을 쓴다
    //3.Blocks =newBlocks
    //4.broadcast 날립니다.
    console.log('나와라',isVaildBlock(newBlocks))
    if (isVaildBlock(newBlocks) && newBlocks.length > Blocks.length && random.boolean()) {
        console.log(`Blocks 배열을 newBlocks 로 교체합니다`);
        const nw = require('./network')

        Blocks = newBlocks
        nw.broadcast(nw.responseLastMsg())

    } else {
        
        console.log(`메세지로 부터 받은 블록배열이 맞지 않습니다.`);
    }
}

function getVersion() {
    const { version } = JSON.parse(fs.readFileSync("./package.json"))
    return version
}

function getCurrentTime() {
    return Math.ceil(new Date().getTime() / 1000)
}

// class 
// { header body } 1차 목표는 제네시스 블럭을 만드는것 


/* 
  제네시스 블럭이 유효한지 데이터가 바뀐적이 없는지.
  2번째는  Blocks 모든 배열을 검사를 할 예쪙
*/

function isVaildBlock(Blocks) {
    if (JSON.stringify(Blocks[0]) !== JSON.stringify(createGenesisBlock())) {
        console.log(`genesis error`);
        return false;
    }

    let tempBlcoks = [Blocks[0]]
    for (let i = 1; i < Blocks.length; i++) {
        if (isVaildType(Blocks[i], tempBlcoks[i - 1])) {
            tempBlcoks.push(Blocks[i])
        } else {
            return false
        }

    }
    return true
}

module.exports = {
    getBlocks,
    getLastBlock,
    addBlock,
    getVersion,
    replaceBlock,
    mineBlock,
    createHash
}

/*
Blockchain 네트워크

P2P
->소리바다
->당나귀
->프루나

클라언트 - 서버 -> http tcp
———정말 간단한 블록체인

——트랜잭션 거래
——walt

——코인 빌드 1~2개
—Dapp  비슷무리하게

P2P
-> WebSocket
-> sochet.io
-> ws
   - 접속에 대한 것만  ex) boradcast , to

*/