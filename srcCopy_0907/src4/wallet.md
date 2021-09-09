// 암호학 공부해보기
* wallet.js 파일 참고
# secp256k1
    - 알고리즘 암호화
    - 인터넷으로 좀 더 알아보기

# 사용법
1. elliptic 패키지 필요 -> npm i elliptic
2. const ecdsa = require('elliptic')로 가져옴
3. const ec = ecdsa.ec("secp256k1")
    -- 비트코인 에서는 주로 "secp256k1" 사용
4. generatorPrivateKey() 함수 생성
    -- 개인마다 사용할 수 있는 키를 만들어주는 함수
    -- 방식 -> 랜덤하게 키를 만들어줌으로써 지갑 구분.
5. fs 가져옴
6. initWallet() 함수 생성 -> wallet이 존재하는지 여부 확인후 존재하지 않으면 wallet 생성하는 함수 => initWallet()
7. wallet안에 다시 default폴더를 만들 수 있도록 선언 
    // 개개의 지갑을 생성하기 위해 
    // const privateKeyLocation = 'wallet'+(process.env.PRIVATE_KEY||'default')
8. 생성한 파일을 가져와서 사용할 수 있도록 함수 생성 -> getPrivateFromWallet()

// 공개키 비밀키
9. 공개키가져오는 함수 -> getPublicFromWallet()
10. 비밀키가져오는 함수 -> getPrivateFromWallet()
 // 비밀키로 공개키를 만듦 

11. module.exports 함
// -> server.js에서 사용

