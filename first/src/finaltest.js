const fs = require('fs')
const merkle = require('merkle')
const CryptoJs = require('crypto-js')
const {MerkleTree} = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')


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
function getLastBlock(){
    return Blocks[Blocks.length-1]
}
function getLastIndex(){
    let {index} = getLastBlock().header
    return index
}
function hashedValue(){
    let {version,index,previousHash,time,merkleRoot} = getLastBlock().header
    //let value = 
    //return value
}
console.log(hashedValue())
function addBlock(){
    const version = getVersion()
    const time = getCurrentTime()
    const index = getLastIndex() + 1
    const previousHash = '0'.repeat(64)
    const body = [`hello world${index}`]
    const tree = merkle('sha256').sync(body)
    const root = tree.root()||'0'.repeat(64)
    const header = new BlockHeader(version,index,previousHash,time,root)
    let add = new Block(header,body)
    Blocks.push(add)
}


function getVersion(){
    let {version}= JSON.parse(fs.readFileSync('../package.json').toString())
    return version
}

function getCurrentTime(){
    return Math.ceil(new Date().getTime()/1000)
}

console.log( getLastIndex())