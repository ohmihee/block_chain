const fs = require('fs')
const merkle = require('merkle')
const CryptoJs = require('crypto-js')
const random = require('random')

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

let Blocks = []

function getVersion(){
    let {version} = JSON.parse(fs.readFileSync('./package.json'))
    return version
}

function getCurrentTime(){
    return Math.ceil(new Date().getTime()/1000)
}

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

function getLastBlock(){
    return Blocks[Blocks.length-1]
}
function createHash(){
    
}
function getDifficulty(){

}
function getAdjustedDifficulty(){

}
function findBlock(){
    
}
function createheaderHash(){

}
function hashMatchDifficulty(){

}
function nextBlock(data){

}


function isVaildBlock(){

}
function isVaildType(){

}
function addBlock(){

}

function mineBlock(){

}

function isVaildBlock(){

}
function replaceBlock(){

}

function getBlocks(){

}


console.log(getVersion())
