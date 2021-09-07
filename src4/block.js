const fs = require('fs')
const merkle = require('merkle')
const CryptoJs = require('crypto-js')
const random = require('random')
/* 사용법 */
// const tree = merkle("sha256").sync([]) // tree 구조 
// tree.root()

class BlockHeader {
    constructor(version, index, previousHash, time, merkleRoot) {
        this.version = version
        this.index = index  // 마지막 블럭의 index + 1 
        this.previousHash = previousHash // 마지막 블럭 -> header -> string 연결  -> SHA256
        this.time = time  //
        this.merkleRoot = merkleRoot
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

    const header = new BlockHeader(version, index, previousHash, time, root)
    return new Block(header, body)
}
//다음블럭의 header와 body를 만들어주는 함수
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

    const merkleTree = merkle("sha256").sync(data)
    const merkleRoot = merkleTree.root() || '0'.repeat(64)

    const header = new BlockHeader(version, index, previousHash, time, merkleRoot)
    return new Block(header, data)
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