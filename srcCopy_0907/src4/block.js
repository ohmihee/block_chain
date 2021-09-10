const fs = require('fs')
const merkle = require('merkle')
const CryptoJs = require('crypto-js')
const random = require('random')
const { hexToBinary } = require('./utils')

const BLOCK_GENERATION_INTERNAL = 10
const BLOCK_ADJUSTMENT_INTERVAL = 10

class BlockHeader {
    constructor(version,index,previousHash,time,merkleRoot,difficulty,nonce){
        this.version = version 
        this.index = index
        this.previousHash = previousHash
        this.time = time
        this.merkleRoot = merkleRoot
        this.difficulty = difficulty
        this.nonce = nonce
    }
}

class Block{
    constructor(header,body){
        this.header = header
        this.body = body
    }
}

let Blocks = [createGenesisBlock()]


function createGenesisBlock (){
    const version = "1.0.0"
    const time = 1630907567
    const index = 0
    const previousHash = '0'.repeat(64)
    const body = ['hello block']
    const tree = merkle('sha256').sync(body)
    const root = tree.root()||'0'.repeat(64)
    const difficulty = 0
    const nonce = 0
    
    const header = new BlockHeader(version,index,previousHash,time,root,difficulty,nonce)
    return new Block(header,body)
}

function getVersion(){
    let {version} = JSON.parse(fs.readFileSync('./package.json'))
    return version
}
function getCurrentTime(){
    return Math.ceil(new Date().getTime()/1000)
}
function getLastBlock(){
    return Blocks[Blocks.length-1]
}
function createHash(block){
    const {version,index, previousHash,time,merkleRoot} = block.header
    const blockString = version + index + previousHash + time + merkleRoot
    const Hash = CryptoJs.SHA256(blockString).toString()
    return Hash
}
function getDifficulty(blocks){
    const lastBlock = blocks[blocks.length -1 ]
    if(lastBlock.header.index%BLOCK_ADJUSTMENT_INTERVAL === 0
        && lastBlock.header.index != 0
        ){
            return getAdjustedDifficulty(lastBlock,blocks)
        }
        return lastBlock.header.difficulty
}
function getAdjustedDifficulty(){
    const prevAdjustmentBlock = blocks[blocks.length - BLOCK_ADJUSTIMENT_INTERVAL]
    const timeToken = lastBlock.header.time - prevAdjustmentBlock.header.time
    const timeExpected = BLOCK_ADJUSTIMENT_INTERVAL * BLOCK_GENERATION_INTERNAL
    if(timeToken<timeExpected/2){
        return prevAdjustmentBlock.header.difficulty + 1
    }else if(timeToken>timeExpected*2){
        return prevAdjustmentBlock.header.difficulty - 1
    }else{
        return prevAdjustmentBlock.header.difficulty
    }

}
function findBlock(version,index,previousHash,time,merkleRoot,difficulty){
    let nonce = 0
    while(true){
        let hash = createheaderHash(version,index,previousHash,time,merkleRoot,difficulty,nonce)
        console.log(hash)
        if(hashMatchDifficulty(hash,difficulty)){
            return new BlockHeader(version,index,previousHash,time,merkleRoot,difficulty,nonce)
        }
        nonce++
    }
}
function createheaderHash(version,index,previousHash,time,merkleRoot,difficulty,nonce){
    let txt = version + index + previousHash + time + merkleRoot + difficulty + nonce
    return CryptoJs.SHA256(txt).toString().toUpperCase()
}
function hashMatchDifficulty(hash, difficulty){
    const hashBinary = hexToBinary(hash)
    const prefix = '0'.repeat(difficulty)
    return hashBinary.startsWith(prefix)
    // 해당 값이 존재하면 true출력
}
function nextBlock(data){
    const prevBlock = getLastBlock()
    const version = getVersion()
    const index = prevBlock.header.index +1
    const previoushHash = createHash(prevBlock)
    const time = getCurrentTime()
    const difficulty = getDifficulty(getBlocks())
    const merkleTree = merkle('sha256').sync(data)
    const merkleRoot = merkleTree.root()||'0'.repeate(64)
    const header = findBlock(version,index,previoushHash,time,merkleRoot,difficulty)
    return new Block(header,data)
    
}   


function isVaildNewBlock(currentBlock,previousBlock){
    if(!isVaildType(currentBlock)){
        console.log(`invaild block structure ${JSON.stringify(currentBlock)}`)
        return false
    }
    if(previousBlock.header.index+1!==currentBlock.header.index){
        console.log('invaild index')
        return false
    }
    if(createHash(previousBlock)!==currentBlock.header.previousHash){
        console.log('invaild previousBlock')
        return false
    }
    if(currentBlock.body.length===0){
        console.log('invaild body')
        return false
    }
    if(merkle('sha256').sync(currentBlock.body).root()!==currentBlock.header.merkleRoot){
        console.log('invaild merkleRoot')
        return false
    }
    return true
}
function isVaildType(block){
    return(
        typeof(block.header.version)==='string'&&
        typeof(block.header.index)==='number'&&
        typeof(block.header.previousHash)==='string'&&
        typeof(block.header.time)==='number'&&
        typeof(block.header.merkleRoot)==='string'&&
        typeof(block.body)==='object'
    )

}
function addBlock(newBlock){
    if(isVaildNewBlock(newBlock,getLastBlock())){
        Blocks.push(newBlock)
        return true
    }
    return false
}

function mineBlock(blockData){
    const newBlock = nextBlock(blockData)
    if(addBlock(newBlock)){
        const nw = require('./network')
        nw.broadcast(nw.responseLastMsg())
        return newBlock
    }else {
        return null
    }
}

function isVaildBlock(Blocks){
    if(JSON.stringify(Blocks[0]!==JSON.stringify(createGensisBlock()))){
        console.log('gensis error')
        return false
    }
    let tempBlocks = [Blocks[0]]
    for(let i =1; i<Blocks.length;i++){
        if(isVaildType(Blocks[i],tempBlocks[i-1])){
            tempBlocks.push(Blocks[i])
        }else{
            return false
        }
    }
    return true
}

function replaceBlock(){
    console.log('나와라',isVaildBlock(newBlocks))
    if(isVaildBlock(newBlocks)&&newBlocks.length>Blocks.length&&random.boolean()){
        console.log('blocks배열을 newblocks로 교체합니다.')
        const nw = require('./network')

        Blocks = newBlocks
        nw.broadcast(nw.responseLastMsg())
    }else{
        console.log('메세지로부터 받은 블록배열이 맞지 않습니다.')
    }
}

function getBlocks(){
    return Blocks
}


console.log(getVersion())

module.exports = {
    getBlocks,
    getLastBlock,
    addBlock,
    getVersion,
    replaceBlock,
    mineBlock,
    createHash
}
