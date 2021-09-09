// 최종목표 -
// http://localhost:3000/address
// > keyfile읽어서 보여줌
// > generatorPrivateKey()
// > node server 실행시 특정 폴더의 특정 파일에 위의 결과물(generatorePrivateKey())이 나올 수 있도록
// > keyfile 저장

// node server 실행시
// 특정 폴더 -> wallet
// 특정 폴더(wallet)가 있는지 확인후
// 있으면 -> 폴더(wallet) 생성 x
// 없으면 -> 폴더(wallet) 생성 o
// mkdir


// 초록색 -> 클래스
// 파란색 -> 객체 
const fs = require('fs')
const ecdsa = require('elliptic')
// console.log(ecdsa.utils.toHex([1,2,3]))
// console.log(ecdsa)

const ec = ecdsa.ec("secp256k1")
// console.log(ec)
/*
console.log(ec.genKeyPair().getPrivate().toString(16))  // 키페어 16진수로 변환하여 가져옴
-> 현재 랜덤키 값을 생성한 것
    ~ SHA256과는 다르다 -> 복호화되지 않는 단방향 암호화 ex) A -> 0100 B -> 0110
    - 현재 사용한 것은 랜덤한 키 값을 반환하여 줌.
    // 중복될수 있는 가능성 존재? (기준없이 랜덤으로 만들어지므로?)
    // 2의 256승 -> 즉 무수히 많은 수가 존재하므로 사실상 중복된다는 것은 불가능(완전 100% 불가능은 아님 그러나 거의 0에 수렴하는 정도의 가능성)

*/

function generatorPrivateKey(){
    const KeyPair = ec.genKeyPair()
    const privateKey = KeyPair.getPrivate()
    return privateKey.toString(16).toUpperCase()
}
// console.log(generatorPrivateKey())
// 21B084AF121462D0068E848DC7194325226819198B7BEA0B748C27BFCCE5FF44  =>  id
// database table의 관점에서 이해해보면 -> id content date.. -> 여기서 id가 바로 키값 (구분되는 값)
// 즉 사용자 개개인의 키값으로 구분하여 지값 정보를 가짐.

// const privateKeyLocation = 'wallet'+'default'
const privateKeyLocation = 'wallet/'+(process.env.PRIVATE_KEY||'default')
const privateFile = `${privateKeyLocation}/private_key`

function initWallet(){
        // fs.existsSync('')인자값에 해당하는 파일이 존재하면 true출면 존재하지 않으면 false 출력
        // 파일이 존재하면 true 없으면 false
        // ex) console.log(fs.existsSync('text.js')) -> true
    if(!fs.existsSync('wallet/')){
        fs.mkdirSync('wallet/')
        // wallet폴더가 존재하지 않는 경우 wallet폴더 생성
    }
    if(!fs.existsSync(privateKeyLocation)){
        fs.mkdirSync(privateKeyLocation)
    }
    if(!fs.existsSync(privateFile)){
        console.log(`주소값 키값을 생성중입니다...`)
        const newPrivateKey = generatorPrivateKey()
        // 파일생성 
        // 파일생성함수 -> fs.writeFileSync()
            // 첫번째 인자값 -> 파일 디렉토리 경로 + 파일명
            // 두번재 인자값 -> 안에 넣을 내용
        fs.writeFileSync(privateFile,newPrivateKey)
        console.log(`개인키 생성이 완료되었습니다.`)
    }else{
        console.log('키값 파일이 생성되어있습니다.')
    }   
}

initWallet()

function getPrivateFromWallet(){
    const buffer = fs.readFileSync(privateFile)
    //// 파일 읽어오는 함수
    // console.log(buffer)
    // <Buffer 36 36 44 36 38 39 46 34 32 39 34 37 30 44 33 37 31 36 42 33 44 37 35 32 37 31 32 42 43 31 44 31 37 30 30 31 43 30 33 31 45 34 38 45 43 45 41 43 32 42 ... 14 more bytes>
    // buffer는 컴퓨터만 읽을 수 있다.
    // console.log(buffer.toString())
    // 사람이 읽을 수 있도록 바꾸어줌
    // 66D689F429470D3716B3D752712BC1D17001C031E48ECEAC2B997A3104B058F2
    return buffer.toString()
}

function getPublicFromWallet(){
    const privateKey = getPrivateFromWallet()
    const key = ec.keyFromPrivate(privateKey,'hex')
    // keyFromPrivate() -> ec안에 존재하는 함수
    return key.getPublic().encode('hex')
}

/*
console.log(getPrivateFromWallet())
//66D689F429470D3716B3D752712BC1D17001C031E48ECEAC2B997A3104B058F2
console.log(getPublicFromWallet())
//046d675231799acd32ac4daf11893e943d795498592aba9301b0f726bd0ea88cce39ba75f24eebc7b9628215c19a9e730260a0a966a118e2189a1f2cc351ac2235
// 공개키 비밀키
// 공개키는 다른 사람이 내 기록을 볼 수 있는 키
// 비밀키는 트랜잭션을 하거나 등의 작업을 할 수 있도록 하는 키
// 공개키는 계좌번호 -> 공개키는 exports 함
// 비밀키는 공인인증서로 생각하면 쉬움 -> 그러므로 비밀키 함수는 절대 exports 하지 않음

AWS pem -> RSA 인증방식
*/

module.exports = {
    initWallet,
    getPublicFromWallet
}