# 블럭체인 기본 환경세팅

// class 문법
// node 환경에서

// 블록체인 ?
// 체인 블록 ? 노드 ?
// 즉 블럭체인은 완전히 새로운 개념이라기 보다는 지금까지 배웠던 기술들의 총집합이라고 생각하면 좋다.
// 때문에 기존에 배웠던 것들을 잘 알아두었어야 함
// 쉽게 생각하면 그냥 객체
/*
    // 블럭체인 기술의 핵심 => 탈중앙
        ㄴ 암호
        ㄴ 알고리즘 
        ㄴ 통신 (탈중앙)
    
    
    객체(=>제네시스 블록 ~ 연결되어 있지 않은 최상위의 블록)
    {
        name:algml,
        id:algml0703,
        key:null,
        address // 블럭체인의 무결성을 위해 존재 // 암호화(jwt)
    }
    // 최상위 블록이므로 key는 null 값
    즉 data를 담은 객체

    {
        name:익균,
        id:i
        key:algml0703
    }
    // name이 algml인 객체의 하위에 연결된 name이 익균인 객체
    {
        name:미희,
        id:m,
        key:i
    }
    // name이 익균인 객체의 하위에 연결된 name이 미희인 객체

    체인은 그러한 data들을 연결

    // 블록간 정보를 가지고 있어서 각 블록들에 의해 블록을 인증?함
    // 암

*/

/* 아래의 과정을 두번 반복=========================================

//1. 위에 개념을 자바스크림트로 구현
//2. express를 통해서 http통신에 대한 부분을 만들고
//3. 시간적 여유가 있으면 socket통신으로
//4. 다른언어로 구축된 실제 코인들 -> 블록체인 빌드 할 것임
// 변수만 알면 그건만 쓱 수정하면 된다.
// 리눅스 통해서 빌드를 해서 우리만의 코인을 발생

// ingooct(8글자)

// 합의 알고리즘
// 라이트코인
// 비트코인

+ 
Dapp -> 이더리움 -> 솔리디티 //web3.js//

*/
* 합의알고리즘 참고 블로그 https://steemit.com/kr/@kblock/44-1-pow-pos ====================================

# 블록체인
~ 탈중앙화로 
                     연결 (P2P)
- 네트워크 (http / socket) ~ 우리가 만든 코드를 네트워크에 흘러보내게 하기 위함
    ** 중요 socket => 쌍방향
- 분산원장 => 데이터를 저장하는 코드
    L Hash  (sha256~JWT로그인 토큰 만들 때 사용했던 것) / hash sha256 => JWT
    L 단방향 암호화 (한 번 암호화하면 다시 복호화 불가 / 자리수 고정 ex) a => 64     ~ 고정된 키 값을 준다.) 
                                                                         abc      
        **merkle
                        ex)  ㅁ hash12345678
                    hash1234ㅁ ㅁ5678
                  12ㅁ 34ㅁ 56ㅁ ...ㅁ   
    L 머클 (데이터연결을 쉽게 찾기 위해서)
    L 작업증명 (pow : Proof-of-Work) 
        ~ 마이닝 채굴
        ~ 


# ex==============================================================================
/*
const block = {
    // header와 body가 중요 -> 고정된 값이 아님, 우리가 정할 수 있음
    MagicNumber:"0xD9B4BEF9",  // 고정되어 정해진 것, 큰 의미는 없다.
    BlockSize:"4mb",            
    header:{
        // header부분에 merkle에 대한 정보가 존재
        version:"1.0.0",//코드를 관리하기 위해 존재하는 버전에 대한 정보
        //package.json에 있는 버전 정보를 입력
        HashPrevBlock:0x00000000000,  // 
        HashMerkleRoot:`SHA256`, //  암호화된 내용에 대한 것
        timestampe:`시간`,  
            // 유닉스 기준의
            //
        bits:`작업증명 난이도를 정하는`,  
            // 이부분은 현재 수준에서는 우선 제외-- 너무 어려움... 
        Nonce:`난수`,
         // index와 비슷 
         // 4바이트로 구성 그냥 숫자 ... 양수만 가능한

    },
    body:{
    // body부분은 객체가 들어갈 수도 있고 배열이 들어갈 수도 있다.
    // 객체안에 배열이 들어가는 등 정말 마음대로 구성 가능
    /*
    body:["hello world!"]
    // 이런 식으로도 가능
    // 쉽게 접근할 수 있도록 하기위함
    */
        
    }
}

/* http request message */

start line
Header

body
*/
# ================================================================================