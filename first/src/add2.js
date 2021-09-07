const fs = require('fs')
const merkle = require('merkle')
const CryptoJs = require('crypto-js')


class BlockHeader{
    constructor(version,index,previousHash,time,merkleRoot){
        this.version = version
        this.index = index
        this.previousHash = previousHash
        this.time = time
        this.merkleRoot = merkleRoot
    }
}

class Block{
    constructor(header,body){
        this.header = header
        this.body = body
    }
}

const blockchain = new Block(new BlockHeader(1,2,3,4,5),['hello',['hi'],{name:'algml'}])

let blocks = [createGenesisBlock()]

function getBlock(){
    return blocks
}

function createGenesisBlock(){
    const version = getVersion()
    const index = 0
    const time = getCurrentTime()
    const previousHash = '0'.repeat(64)
    const body = ['hello world']
    const tree = merkle('sha256').sync(body)
    const root = tree.root()||'0'.repeat(64)
    const header = new BlockHeader(version,index,previousHash,time,root)
    return new Block(header,body)
}
function nextBlock(bodydata){
    const prevBlock = getLastBlock()
    const version = getVersion()
    const time = getCurrentTime()
    const index = prevBlock.header.index + 1
    const previousHash = createHash(prevBlock)
    const merkleTree = merkle('sha256').sync(bodydata)
    const merkleRoot = merkleTree.root()||'0'.repeat(64)
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
        blocks.push(newBlock)
        return true
    }
    return false
}
addBlock(['hello world 1'])
addBlock(['hello world 2'])
addBlock(['hello world 3'])

function isVaildBlock(){
    if(JSON.stringify(blocks[0])!==JSON.stringify(createGenesisBlock())){
        console.log('gensis error')
        return false
    }
    let tempBlocks = [blocks[0]]
    //console.log(tempBlocks)
    for(let i=1;i<blocks.length;i++){
        if(isVaildNewBlock(blocks[i],tempBlocks[i-1])){
            tempBlocks.push(blocks[i])
        }else{
            return false
        }
    }
}

isVaildBlock()
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
    if(merkle("sha256").sync(currentBlock.body).root()!==currentBlock.header.merkleRoot){
        console.log(`invild merkleRoot`)
        return false
    }
    if(!(currentBlock.body.length !== 0 && (merkle("sha256").sync(currentBlock.body).root()===currentBlock.header.merkleRoot))){
        console.log(`invaild merkleRoot`)
        return false
    }
    return true    
}

function isVaildType(block){
    return(
        typeof(block.header.version)==="string"&&
        typeof(block.header.index)==='number'&&
        typeof(block.header.previousHash==="string")&&
        typeof(block.header.time)==='number'&&
        typeof(block.header.merkleRoot)==='string'&&
        typeof(block.body)==='object'
    )
}
//isVaildType(blocks[0])

function getLastBlock(){
    return blocks[blocks.length-1]

}
function getLastIndex(){
    let {index} = getLastBlock().header
    return index
}

function getVersion(){
    let {version} = JSON.parse(fs.readFileSync('../package.json').toString())
    return version
}
function getCurrentTime(){
    return Math.ceil(new Date().getTime()/1000)
}

console.log(blocks)

