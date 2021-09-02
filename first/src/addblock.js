const fs = require('fs')
const merkle = require('merkle')
const CryptoJs = require('crypto-js')
const {MerkleTree} = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

class BlockHeader {
    constructor(version,index,previousHash,time,merkleRoot){
        this.version = version
        this.index = index
        this.previousHash= previousHash
        this.time = time
        this = merkleRoot
    }
}

class Block{
    constructor(header,body){
        this.header = header
        this.body = body
    }
}

let Blocks = []

function createGenesisBlock(){
    
}