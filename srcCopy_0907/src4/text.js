const CryptoJs = require('crypto-js')

let a = "0000helloworld!"
//  ex) 가장 맨 앞 위치에서부터 0이 4개면 조건 만족

// javascript String관련 -> startsWith()

console.log(a.startsWith('0000'))   // -> true
// 너 첫글자 4개가 0000이야??   ->   ture

console.log(a.startsWith('0010'))  // -> false
// 너 첫글자 4개가 0010이야??   ->   false

console.log(CryptoJs.SHA256(a).toString().toUpperCase())
// 1314042ECF8C8A7702AABA1C82D560B5A262FF3E922BB117FA81F2B002FC37B9
//  -> 16진수 -> 2진수
// 0001 0011 0001 0100 0000 0010 ...
// 000100110001010000000010....
// 내결과물 -> SHA256(16진수) ->2진수

// 내가 첫글자가 0이 4개가 되었을 때 블럭을 생성할 수 있도록 작업
/*
16진수 -> 2진수
0: 0000
1: 0001
2: 0010
3: 0011
4: 0100
5: 0101
6: 0110
7: 0111
8: 1000
9: 1001
A: 1010
B: 1011
C: 1100
D: 1101
E: 1110
F: 1111
//  ex) 맨 처음에 오는 것이 0이어야 한다. -> 7까지 허용
*/