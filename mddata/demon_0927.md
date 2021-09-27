# CLI API
거래소 
    : 현금과 코인의 교환 거래가 이루어지는 공간
// 데몬을 CLI가 아니라 HTTP통신으로 응답을 받겠다는 것.
    ~ CLI
    ~ RPC
// CLI를 직접 구현 

# 순서
    // 카카오 API이용해서 요청하고 응답받던 것과 비슷
1. HTTP로 요청
2. HTTP요청 한 것을 node.js 환경에서 코드로 적어 test
3. CURL을 통해서 HTTP(데몬)에 요청
// curl은 쉘 즉 윈도우 환경이 아닌 리눅스 환경에서  

# 실질적 진행순서
1. 서버쪽에 데몬연결 
.\ohcoind.exe -printtoconsole -rpcuser=root -rpcpassword=1234 -rpcport=3000 -datadir=C:\Users\오미희\ohcoin_work\data 
2. 클라이언트 쪽에
.\ohcoin-cli.exe -rpcport=3000 -rpcuser=root -rpcpassword=1234 getnewaddress algml2
//   .\ohcoin-cli.exe -conf 
3. 리눅스 환경으로 들어감 (터미널에 wsl 입력)
// 리눅스 환경에서  curl http://naver.com 이렇게 입력하면 아래와 같이 출력해줌
```
<html>
<head><title>301 Moved Permanently</title></head>
<body>
<center><h1>301 Moved Permanently</h1></center>
<hr><center> NWS </center>
</body>
</html>
```



# curl
curl [option] [도메인]

-H  : header
-d  : data
-X  : Request Method

ex) curl -X POST -H "" -d "data~" http://naver.com

* rpc에 대한 내용으로 바꾸어주는 것
RPCUSER : RCPPASSWORD@IPADDRESS:RPCPORT
[도메인] = RPCUSER : RCPPASSWORD@IPADDRESS:RPCPORT

ex)
```
RPCUSER = algml
RPCPASSWORD =1234
IPADDRESS = 127.0.0.1
RPCPORT = 3000
```
~ bin폴더의 conf파일에 만들어둔 내용
주소 
[도메인] = algml:1234@127.0.0.1:3000
curl -X POST -H "Content-type: application/json" -d "{}" algml:1234@127.0.0.1:3000
// content타입이 json이므로 data의 내용은 무조건 객체로

{"method":"getnewaddress","params":["algml2"]}

// curl -X POST -H "Content-type: application/json" -d `{"method:"getnewaddress","params":["algml"]}' algml:1234@127.0.0.1:3000


## 터미널에 명령어 입력 순서 
1. 서버쪽에서 
.\ohcoind.exe -printtoconsole -rpcuser=root -rpcpassword=1234 -rpcport=3000 -datadir="C:\Users\오미희\ohcoin_work\data"
2. 클라이언트 쪽에서 확인용
.\ohcoin-cli.exe -rpcport=3000 -rpcuser=root -rpcpassword=1234 getbalance
3. 윈도우터미널 새로열고(wsl ~ 리눅스 환경에서 )
curl -X POST -H "Content-type: application/json" -d '{"method":"getnewaddress","params":["algml"]}' root:1234@127.0.0.1:3000
``` 출력되는 값
{"result":"iR5vUpsUVD7oJQj5bj2W6XsCmjMkGHtQSN","error":null,"id":null}
```

이후에 작업 순서
4. 비쥬얼 스튜디오 코드 열고 server.js 파일 생성
5. npm init해서 node.js 환경 만듦
6. npm install express
// HTTP로 응답을 줌
7. npm install request
// 요청