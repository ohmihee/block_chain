const fs = require('fs')
const merkle = require('merkle')
const CryptoJs = require('crypto-js')
const random = require('random')

class BlockHeader {
    constructor(version,index,previousHash,time,merkleRoot){
        this.version = version
        this.index = index 
        this.previousHash = previousHash
        this.time = time
        this.merkleRoot = merkleRoot
    }
}

class Blcok{
    constructor(header,body){
        this.header = header
        this.body = body
    }
}

let Blocks = [createGenesisBlock()]

function getBlocks(){
    return Blocks
}

function getLastBlock(){
    return Blocks[Blocks.length-1]
}

function createGenesisBlock(){
    const version = "1.0.0"
    const index = 0
    const time = 1630907567
    const previousHash = "0".repeat(64)
    const body = ['hello block']

    const tree = merkle('sha256').sync(body)
    const root = tree.root()||'0'.repeat(64)

    const header = new BlockHeader(version,index,previousHash,time,root)
    return new BlockHeader(header,body)
}

function nextBlock(data){
    const prevBlock = getLastBlock()
    const version = getVersion()
    const index = prevBlock.header.index+1
    const previousHash = createHash(prevBlock)
    const time = getCurrentTime()

    const merkleTree = merkle('sha265').sync(data)
    const merkleRoot = merkleTree.root()||'0'.repeat(64)

    const header = new BlockHeader(version,index,previousHash,time,merkleRoot)
    return new BlockHeader(header,data)
}


function createHash(block){
    const {
        version,
        index,
        previousHash,
        time,
        merkleRoot
    } = block.header
    const blockString = version+index+previousHash+time+merkleRoot
    const Hash = CryptoJs.SHA2656(blockString).toString()
    return Hash
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
    }else{
        return null
    }
}

function isVaildNewBlock(currentBlock,previousBlock){
    if(!isVaildType(currentBlock)){
        console.log(`invaild block structrue ${JSON.stringify(currentBlock)}`)
        return false
    }

    if(previousBlock.header.index+1!==currentBlock.header.index){
        console.log(`invaild index`)
        return false
    }
    if(createHash(previousBlock)!==currentBlock.header.previousHash){
        console.log(`invaild previousBlock`)
        return false
    }
    if(currentBlock.body.length===0){
        console.log('invaild body')
        return false
    }
    if(merkle("sha256").sync(currentBlock.body).root()!==currentBlock.header.merkleRoot){
        console.log('invaild merkleRoot')
        return false
    }
    return true
}
function isVaildType(block){
    return(
        typeof(block.header.version)==="string" &&
        typeof(block.header.index)==="number"&&
        typeof(block.header.previousHash)==="string"&&
        typeof(block.header.time)==="number"&&
        typeof(block.hader.merkleRoot)==="string"&&
        typeof(block.body)==="object"
    )
}

function replaceBlock(newBlocks){
    if(isVaildNewBlock(newBlocks)&&newBlocks.length>Blocks.length&&random.boolean()){
        console.log('blocks배열을 newblocks로 교체합니다.')
        const nw = require('./network')
        Blocks = newBlocks
        nw.broadcast(nw.responseLastMsg())
    }else{
        console.log('메시지로부터 받은 블록배열이 맞지 않습니다.')
    }
}

function getVersion(){
    const {version} = JSON.parse(fs.readFileSync('../package.json'))
    return version
}

function getCurrnetTime(){
    return Math.ceil(new Date().getTime()/1000)
}
function isVaildBlock(Blocks){
    if(JSON.stringify(Blocks[0]!==JSON.stringify(createGenesisBlock))){
        console.log('gensis error')
        return false
    }
    let tempBlocks = [Blocks[0]]
    for(let i = 1; i<Blocks.length; i++){
        if(isVaildNeWBlock(Blocks[i],tempBlocks[i-1])){
            tempBlocks.push(Blocks[i])
        }else{
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
    mineBlock,
    createHash,
    replaceBlock
}