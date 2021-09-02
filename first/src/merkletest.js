const {MerkleTree} = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

const testSet = ['a','b','c'].map(v=> SHA256(v))
const tree = new MerkleTree(testSet,SHA256)
const root = tree.getRoot().toString('hex')

const testRoot =  'a'
const leaf = SHA256(testRoot)
const proof = tree.getProof(leaf)
console.log(tree.verify(proof,leaf,root))

const test2Root = 'd'
const leaf2 = SHA256(test2Root)
const proof2 = tree.getProof(leaf2)
console.log(tree.verify(proof2,leaf2,root))