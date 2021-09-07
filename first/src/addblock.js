const fs = require('fs') 
const merkle = require('merkle')
const CryptoJs = require('crypto-js')

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

class Block{
    constructor(header,body){
        this.header = header
        this.body = body
    }
}

const blockchain  = new Block(new BlockHeader(1,2,3,4,5),['hello',['hi'],{name:'algml'}])  //=>  여기에 올바른 정보를 입력하면 이게 바로 제네시스 블록 즉 최초로 생성되는 블록

let Blocks = [createGenesisBlock()]

function getBlock(){
    return Blocks
}

function getLastBlock(){
    return Blocks[Blocks.length-1]
}

function createGenesisBlock(){
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

function nextBlock(bodydata){
    const prevBlock = getLastBlock()
    const version = getVersion()
    const time = getCurrentTime()
    const index = prevBlock.header.index + 1
    const previousHash = createHash(prevBlock)
    const merkleTree = merkle('sha256').sync(bodydata)  // merkle tree생성
    const merkleRoot = merkleTree.root() || '0'.repeat(64)
    const header = new BlockHeader(version,index,previousHash,time,merkleRoot)
    return new Block(header,bodydata)
}

function createHash(block){
    const {version,index,previousHash,time,merkleRoot} = block.header
    const blockString = version+index+previousHash+time+merkleRoot
    const Hash = CryptoJs.SHA256(blockString).toString()
    return Hash
}

function addBlock(data){
    const newBlock = nextBlock(data)
    if(isVaildNewBlock(newBlock,getLastBlock())){
        const newBlock = nextBlock(data)
        Blocks.push(newBlock)
        return true
    }
    return false
}
addBlock(['hello world1'])
addBlock(['hello world2'])
addBlock(['hello world13'])

function isValidBlock(){
    if(JSON.stringify(Blocks[0]) !== JSON.stringify(createGenesisBlock())){
         console.log(`gensis error`)
        return false
    }  
    let tempBlocks = [Blocks[0]]
    for(let i = 1; i < Blocks.length; i++){  
        if(isVaildNewBlock(Blocks[i],tempBlocks[i-1])){
            tempBlocks.push(Blocks[i])
        }else{
            return false
        }
    }
}
isValidBlock()

function isVaildNewBlock(currentBlock,previousBlock){
    if(!isVaildType(currentBlock)){
        console.log(`invaild block structure ${JSON.stringify(currentBlock)}`)
        return false
    }
    if(previousBlock.header.index+1!==currentBlock.header.index){
        console.log(`invaild index ${previousBlock.header.index+1} ${currentBlock.header.index}`)
        return false
    }
    if(createHash(previousBlock)!==currentBlock.header.previousHash){
 
        console.log(`invaild previousBlock`)
        return false
    }
   if(currentBlock.body.length === 0){
       console.log('invaild body')
       return false
   }
   if(merkle("sha256").sync(currentBlock.body).root()!== currentBlock.header.merkleRoot){
       console.log(`invaild merkleRoot`)
       return false
   }
    if( !(currentBlock.body.length !== 0 && ( merkle("sha256").sync(currentBlock.body).root() === currentBlock.header.merkleRoot)) ){
        console.log(`invaild merkleRoot`)
        return false
    }
    return true
}

function isVaildType(block){
    return(
    typeof(block.header.version)==="string" &&       // string  => true
    typeof(block.header.index)==='number' &&         // number  => true
    typeof(block.header.previousHash)==="string" &&  // string  => true
    typeof(block.header.time)==="number"  &&         // number  => true
    typeof(block.header.merkleRoot)==="string" &&    // string  => true
    typeof(block.body)==="object"                    // object  => true
    )
}

function exGetVersion(){
    let package = fs.readFileSync('../package.json').toString("utf8")
    return JSON.parse(package).version
}

function exGetCurrentTime(){
    console.log(new Date().getTime())
}

function getVersion (){
    let {version} = JSON.parse(fs.readFileSync('../package.json'))
    return version
}


function getCurrentTime(){
    return Math.ceil(new Date().getTime()/1000)
}


module.exports = {
    getBlock,
    getLastBlock,
    addBlock,
    getVersion
}

