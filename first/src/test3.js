const fs = require('fs')
const merkle = require('merkle')
const CryptoJs = require('crypto-js')
const {MerkleTree} = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

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

let Blocks = [createGenesisBlock()]

function createGenesisBlock(){
    const version = getVersion()
    const time = getCurrentTime()
    const index = 0
    const previousHash = '0'.repeat(64)
    const body = ['hello block']
    const tree = merkle('sha256').sync(body)
    const root = tree.root()||'0'.repeat(64)
    const header = new BlockHeader(version,index,previousHash,time,root)
    return new Block(header,body)
}

function getBlock(){
    return Blocks
}

function getLastBlock(){
    //console.log(Blocks[Blocks.length-1])
    return Blocks[Blocks.length-1]
}
function getLastIndex(){
    //console.log(getLastBlock().header.index)
    let {index} = getLastBlock().header
    return index
}

function addBlock(){
    const version = getVersion()
    const index = getLastIndex() + 1
    const time = getCurrentTime()
    const previousHash = HashedValue()
    //const body = [previousHash]
    const body = [`hello world${index}`]
    const tree = merkle('sha256').sync(body)
    const root  = tree.root()||'0'.repeat(64)
    const header = new BlockHeader(version,index,previousHash,time,root)
    let add = new Block(header,body)
    Blocks.push(add)
}
addBlock()
addBlock()
addBlock()

function HashedValue (){
    let {version,index,previousHash,time,merkelRoot} = Blocks[Blocks.length-1].header
    //console.log(index)
    let LaterHash = version.concat(index,previousHash,time,merkelRoot)
    return CryptoJs.SHA256(LaterHash).toString()
}


function getVersion(){
    let {version} = JSON.parse(fs.readFileSync('../package.json').toString())
    return version
}
function getCurrentTime(){
    return Math.ceil(new Date().getTime()/1000)
}

function verify1(){
    const testSet = getBlock().map(v=>v.header.merkleRoot)
    console.log(testSet)
    const tree = new MerkleTree(testSet)
    const root = tree.getRoot().toString('hex')
    //console.log(root)
    const testRoot = `hello block`
    const leaf = SHA256(testRoot)
    const proof = tree.getProof(leaf)
    console.log(tree.verify(proof,leaf,root))
}
verify1()
//console.log(Blocks)