
/*
    HTTP 인터페이스
        * 인터페이스 : ex)리모컨, 클라이언트  // 백엔드와 소통하기 위한 도구/ 요청해주는 도구
        - express http server -> backend
            ~ 지금은 클라이언트로서의 역할 => 블럭체인의 특수성 때문에
            
            * 블럭체인의 특수성
                ~ 어떠한 방식으로 data를 저장할 것인가????
                // 탈중앙이 아니여도, db or 파일 등으로도 data  저장 가능
                // 1. 메모리 -> 변수에 저장  ~ 기존의 정보를 변수에 저장시 컴퓨터를 껐다 키거나 서버를 종료시 데이터 잃어버림(데이터손실발생)
                // 2. database -> 서버를 껐다 켜도 데이터 손실이 없음. 데이터 유지 가능 
                // 3. 탈중앙(데이터분산저장)  
                        //    websocket websocket websocket
                        //websocket websocket websocket websocket
                        //    websocket websocket websocket
                        // 클라이언트 각각이 블록체인으로 연결되어 분산저장된 데이터를 공유
                        // 웹소켓이 연결된 체인에서 사람과 소통할 수 있는 창구 필요 ->  이 창구가 바로 인터페이스 -> 우리는 그 인터페이스로써 HTTP를 사용
                        // ex) HTTP에 내가 가지고 있는 코인에 대해 알려달라고 요청(get등을 통해) -> HTTP가 socket에 데이터 요구 -> socket각각이 서로의 데이터 비교
                        // HTTP는 단순히 사용자의 요청에 의해 응답을 하는 것 / 그 뒤의 처리는 websocket이 처리
                        // block.js -> 블록을 어떻게 저장하고 검증 처리하는 가의 형태를 정의하고 있는 백엔드. 
                        // network.js -> 데이터를 연결하고 사용자간 소통 검증 할 수 있게 하는 백엔드
                        // server.js -> 백엔드가 될수도 사용자 인터페이스가 될 수 도 있다. -> server.js는 block.js나 network.js 등의 파일들이 서로 소통할 수 있게끔 해주는 파일
                        
    GUI (graphic user interface)
    API (application)
*/

/*
// ws.on('message',()=>{}) <=> document.addEventListener('click',()=>{})
// 위의 두 코드는 유사한 내용
// 첫번째 인자값 -> 이벤트 두번째 인자값 -> 해당 이벤트에서 실행할 콜백함수
*/

/*
javascript
// 싱글스레드 - 이벤트 기반 - 콜백함수 많이 사용

*/