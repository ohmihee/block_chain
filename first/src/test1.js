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

let Blocks = [createGenesisBlock()]

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
    let LaterHash = version.concat(index,previousHash,time,merkleRoot)
    return CryptoJs.SHA256(LaterHash).toString()
}

function createGenesisBlock(){
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
    const body = ['hello block']
    const tree = merkle('sha256').sync(body)
    const root = tree.root()||'0'.repeat(64)
    const header = new BlockHeader(version,index,previousHash,time,root)
    let add = new Block(header,body)
    Blocks.push(add)
}

addBlock()
addBlock()
addBlock()

function getVersion(){
    let {version} = JSON.parse(fs.readFileSync('../package.json'))
    return version
}
function getCurrentTime(){
    return Math.ceil(new Date().getTime/1000)
}

console.log(Blocks)