코인 거래소 기본적인 코드======================================================
호가창--------------------------------------------------------------------
// 기본적으로 express환경 데몬 DB 필요
1. 기본적 설치항목
express
nunjucks
request
body-parser
sequelize
sequelize-cli
mysql2
dotenv

* 효율적인 개발환경을 위한 패키지
    - morgan  
        // morgan은 미들웨어의 역할 때문에 윗부분에서 실행되는게 좋은 그러므로 sequelize코드 밑에 코드 작성

    - nodemon
        // nodemon server.js
        // 아래와 같은 오류 나는 경우  ->  환경변수의 문제(nodemon실행을 위한 권한이 없어서 발생하는 문제, 설치된 )   ->  환경변수 세팅 필요
        ```
            nodemon : 이 시스템에서 스크립트를 실행할 수 없으므로 C:\Users\오미희\AppData\Roaming\npm\nodemon.ps1 파일을 로드할 수 없습니다. 자세한 내용은 about_Execution_Policies(https://go.microsoft.com/fwlink/?Link
            ID=135170)를 참조하십시오.
            위치 줄:1 문자:1
            + nodemon
            + ~~~~~~~
            + CategoryInfo          : 보안 오류: (:) [], PSSecurityException
            + FullyQualifiedErrorId : UnauthorizedAccess    
        ```
        // 해결방법 참고 블로그
        // https://velog.io/@kimy/VS-CODE-supervisor-nodemon-%EC%98%A4%EB%A5%98-ps1-%ED%8C%8C%EC%9D%BC%EC%9D%84-%EB%A1%9C%EB%93%9C%ED%95%A0-%EC%88%98-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4
        // 윈도우 터미널 관리자 권한으로 실행 후 (window terminal 오른쪽 마우스로 누르고 관리자 권한으로 실행 클릭)
            -> get-help Set-ExecutionPolicy 입력
            -> Set-ExecutionPolicy RemoteSigned 입력
            -> 해결 !!
        // nodemon 실행후 index.html파일 변경후 저장한 것이 브라우저에 반영되지 않는 경우 server.js파일을 저장 후 다시 브라우저 확인해보면 반영되어 있음

    - winston
        // console.log를 대체하기 위함  ~ 콘솔을 사용 자제하는 것이 좋음
    


npx sequelize init
// seeder는 필요없으므로 삭제

sequelize-cli model:generate --name User2 --attributes userid:string,userpw:string,username:string

// models폴더의 index.js에서 fs관련한 부분만 오류나지 않도록 삭제 또는 주석처리

2. config폴더에서 DB 연결을 위해 관련 내용 수정
3. mysql들어가서 exchange 데이터베이스 생성
//
4. server.js파일 생성후 코드 입력
5. 서버 킨 후에 실행되는 것 오류 없는지 확인
6. logger세팅
7. routes 폴더 생성 index.js 파일 생성
8. rpc.js 파일 생성
9. test용 경로 생성 


# 거래소란?
- 코인 계정이 존재해야 -> 지값 생성 가능 -> 코인 거래 가능

- 거래소의 거래는 보통 현금과 코인의 거래

## 
order table         assetbalance
buy/sell


// 거래처리결과 
// 매수/매도
// 가격
// 수량


# 개발 시 효율성 높이는 법
// 기본적인 세팅을 해둔 후 작업 실행  ~ 속된 말로 와꾸 잡아두기


