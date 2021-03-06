const fs = require('fs')
const merkle = require('merkle')
const CryptoJs = require('crypto-js')

class BlockHeader {
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

//const blockchain = new Block(new BlockHeader(1,2,3,4,5),['hello'])
//console.log(blockchain,'blockchain')

let Blocks = [createGensisBlock()]

function getBlock(){
    return Blocks
}

function getLastBlock(){
    return Blocks[Blocks.length-1]
}


function getLastIndex(){
    const {index} = getLastBlock().header
    return index
}
function getLaterHash(){
    let {version,index,previousHash,time,merkleRoot} = Blocks[Blocks.length-1].header
    //console.log(version,index,previousHash,time,merkleRoot)
    let LaterHash = version.concat(index,previousHash,time,merkleRoot)
    //console.log(CryptoJs.SHA256(LaterHash).toString())
    //console.log(LaterHash)
    return CryptoJs.SHA256(LaterHash).toString()
}
//getLaterHash()
//console.log(getLastIndex())

function createGensisBlock(){
    const version = getVersion()
    const index = 0
    const time = getCurrentTime()
    const previousHash = '0'.repeat(64)
    const body = ['hello block']
    const tree = merkle('sha256').sync(body)
    const root = tree.root()||'0'.repeat(64)
    const header = new BlockHeader(version,index,previousHash,time,root)
    return new Block(header,body)
}
function addBlock(){
    const version = getVersion()
    const index = getLastIndex() + 1
    const time = getCurrentTime()
    const previousHash = getLaterHash()
    //console.log(merkle('sha256').sync(getLaterHash()))
    const body = ['hello block']
    const tree = merkle('sha256').sync(body)
    const root = tree.root()||'0'.repeat(64)
    const header = new BlockHeader(version,index,previousHash,time,root)
    let add = new Block(header,body)
    Blocks.push(add)
    //return new Block(header,body)
}

//console.log(Blocks)
addBlock()
addBlock()

function getVersion (){
    let {version} = JSON.parse(fs.readFileSync('../package.json'))
    return version
}
getVersion()

function getCurrentTime(){
    return Math.floor(new Date().getTime()/1000)
}

getCurrentTime()

console.log(Blocks)