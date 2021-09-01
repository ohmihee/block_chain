// search => 다시 물어보기
// npm i merkletreejs
// npm i crypto-js

const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

//console.log( SHA256('ingoo').toString() )

const testSet = ['a','b','c'].map( v => SHA256(v))
//console.log(testSet)
/*
[
  {
    words: [
      -896040686,
      -904151606,
      -87936589,
      -1708925875,
      -1484328968,
      343690866,
      -1182763131,
      -1343338309
    ],
    sigBytes: 32
  },
  {
    words: [
       1042540566,     3758410,
        864636773,  1692512564,
      -1950516736, -1999360950,
       -881594706,  -711196515
    ],
    sigBytes: 32
  },
  {
    words: [
      779955203,
      -1454343454,
      1710028213,
      896042405,
      865313282,
      -1658580076,
      -1720556127,
      -1571098682
    ],
    sigBytes: 32
  }
]
*/
const tree = new MerkleTree(testSet,SHA256) // class 형태이므로 사용하기위해 new 사용
//첫 번째 인자값 => ?  다시 물어보기
//두 번째 인자값 => ?

/*
//console.log(tree)
MerkleTree {
  duplicateOdd: false,
  hashLeaves: false,
  isBitcoinTree: false,
  leaves: [
    <Buffer ca 97 81 12 ca 1b bd ca fa c2 31 b3 9a 23 dc 4d a7 86 ef f8 14 7c 4e 72 b9 80 77 85 af ee 48 bb>,
    <Buffer 3e 23 e8 16 00 39 59 4a 33 89 4f 65 64 e1 b1 34 8b bd 7a 00 88 d4 2c 4a cb 73 ee ae d5 9c 00 9d>,
    <Buffer 2e 7d 2c 03 a9 50 7a e2 65 ec f5 b5 35 68 85 a5 33 93 a2 02 9d 24 13 94 99 72 65 a1 a2 5a ef c6>
  ],
  layers: [
    [
      <Buffer ca 97 81 12 ca 1b bd ca fa c2 31 b3 9a 23 dc 4d a7 86 ef f8 14 7c 4e 72 b9 80 77 85 af ee 48 bb>,
      <Buffer 3e 23 e8 16 00 39 59 4a 33 89 4f 65 64 e1 b1 34 8b bd 7a 00 88 d4 2c 4a cb 73 ee ae d5 9c 00 9d>,
      <Buffer 2e 7d 2c 03 a9 50 7a e2 65 ec f5 b5 35 68 85 a5 33 93 a2 02 9d 24 13 94 99 72 65 a1 a2 5a ef c6>
    ],
    [
      <Buffer e5 a0 1f ee 14 e0 ed 5c 48 71 4f 22 18 0f 25 ad 83 65 b5 3f 97 79 f7 9d c4 a3 d7 e9 39 63 f9 4a>,
      <Buffer 2e 7d 2c 03 a9 50 7a e2 65 ec f5 b5 35 68 85 a5 33 93 a2 02 9d 24 13 94 99 72 65 a1 a2 5a ef c6>
    ],
    [
      <Buffer 70 75 15 2d 03 a5 cd 92 10 48 87 b4 76 86 27 78 ec 0c 87 be 5c 2f a1 c0 a9 0f 87 c4 9f ad 6e ff>
    ]
  ],
  sortLeaves: false,
  sortPairs: false,
  sort: false,
  fillDefaultHash: null,
  hashFn: [Function (anonymous)]
}
*/

const root = tree.getRoot().toString('hex')// 최상위 노드를 가져옴
/*
//console.log(root)
7075152d03a5cd92104887b476862778ec0c87be5c2fa1c0a90f87c49fad6eff
*/

const testRoot = 'a'  // 검증하는 것
const leaf = SHA256(testRoot)

const proof = tree.getProof(leaf)  // 인자값으로는 찾을 값 즉 tree안에서 인자값이 존재하는지 아닌지 찾아줌
console.log(tree.verify(proof,leaf,root))   // 이 부분 다시 물어보기 ========================

/*
//console.log(tree.toString())
└─ 7075152d03a5cd92104887b476862778ec0c87be5c2fa1c0a90f87c49fad6eff      
   ├─ e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a   
   │  ├─ ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb
   │  └─ 3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d
   └─ 2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6
      └─ 2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6

*/