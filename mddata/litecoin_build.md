# 라이트코인빌드를 위한 순서
1. mkdir workspace && cd workspace 
// 코인생성을 하기 위한 폴더 생성
2. git clone -b 0.15 --single-branch https://github.com/litecoin-project/litecoin.git ohcoin_0.0.15
3. cd ohcoin_0.0.15
4. sudo apt update
5. sodo apt upgrade
6. sudo apt install build-essential libtool autotools-dev automake pkg-config bsdmainutils curl git
7. sudo apt install nsis
8. sudo apt install g++-mingw-w64-x86-64
9. sudo update-alternatives --config x86_64-w64-mingw32-g++
// 위의 명령어 입력 후 1 선택
10. 이름 바꾸기 (workspace/ohcoin의 경로에서 명령어 입력)
- find ./ -type f -readable -writable -exec sed -i "s/Litecoin/OHcoin/g" {} \;
- find ./ -type f -readable -writable -exec sed -i "s/LiteCoin/OhCoin/g" {} \;
- find ./ -type f -readable -writable -exec sed -i "s/litecoin/ohcoin/g" {} \;
- find ./ -type f -readable -writable -exec sed -i "s/Litecoind/OHcoind/g" {} \;
- find ./ -type f -readable -writable -exec sed -i "s/LITECOIN/OHCOIN/g" {} \;
- find ./ -type f -readable -writable -exec sed -i "s/lites/ohs/g" {} \;
11. 단위 바꾸기 
- find ./ -type f -readable -writable -exec sed -i "s/LTC/ING/g" {} \;
- find ./ -type f -readable -writable -exec sed -i "s/photons/iphotons/g" {} \;
12. 포트변경하기
- find ./ -type f -print0 | xargs -0 sed -i "s/9333/9233/g"
- find ./ -type f -print0 | xargs -0 sed -i "s/9332/9232/g"
- find ./ -type f -print0 | xargs -0 sed -i "s/19335/19235/g"
- find ./ -type f -print0 | xargs -0 sed -i "s/19332/19232/g"
13. 터미널에 code . 입력   -> 비쥬얼 스튜디오로 clone한 라이트코인을 스튜디오로 보여줌
14. litecoin 내용 바꾸기
// 블로그 다시 참고
15. 터미널에서 git clone https://github.com/lhartikk/GenesisH0 입력( workspace폴더에서 )
16. cd GenesisH0
// 해당 폴더에 들어간 후 ls 또는 ls-al을 입력해서 해당 폴더에 genesis.py파일이 존재하는지 확인
17. 파이썬 설치와 파이썬 파일 실행 -> 파이썬 실행을 위한 것
- sudo apt install python2
- sudo apt install python3
- sudo apt install python2-pip
- sudo apt install python3-pip
//  sudo apt install python2-pip명령어에서 오류 발생시 
    -> curl https://bootstrap.pypa.io/pip/2.7/get-pip.py -o get-pip.py  (해당 명령어는 /workspace/GenesisH0 폴더에서 입력)
- sudo python get-pip.py
    -> 위의 명령어들을 실행 후 pip --version을 입력하여 설치여부 확인
- sudo pip install scrypt construct==2.5.2
- sudo python genesis.py -a scrypt -z "hello ohcoin" -t 1632640342
```
04ffff001d01040c68656c6c6f206f68636f696e
algorithm: scrypt
merkle hash: 5aef65642a0c08b26159e9f577962e1a8efa8ed407f85036d5de5435a401a5c1
pszTimestamp: hello ohcoin
pubkey: 04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f
time: 1632640342
bits: 0x1e0ffff0
Searching for genesis hash..
genesis hash found!
nonce: 863902
genesis hash: a3711133c22e6c828f7be084b2e8297ecf2d20b683093700528ac30c571b8392
```

18.  python genesis.py -a scrypt -z "hello ohcoin" -t 1632643454 -n 863902
```
04ffff001d01040c68656c6c6f206f68636f696e
algorithm: scrypt
merkle hash: 5aef65642a0c08b26159e9f577962e1a8efa8ed407f85036d5de5435a401a5c1
pszTimestamp: hello ohcoin
pubkey: 04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f
time: 1632643454
bits: 0x1e0ffff0
Searching for genesis hash..
genesis hash found!
nonce: 925521
genesis hash: f804a2ffcf64d83f46e7790bec86a2fe4d569f88ed0f1bad6c8a189ea11a6304
```
19. testnet에서 나온 값으로 코드 수정
// 블로그 내용 참고
// https://velog.io/@nara7875/blockchainlitecoin-build%ED%95%98%EA%B8%B0#4%EC%8B%A4%ED%96%89%ED%95%98%EA%B8%B0

/ 터미널에 입력( 리눅스 환경 )

// 테스트를 위한 것이므로 미리 거래를 최소 블록단위로 코드 수정후 빌드 
// 아니면 나중에 빌드 다시하느라 시간 낭비해야함
// src폴더의 consensus폴더의 consensus.h파일의 19번째 줄 100을 5로 고친 후 

20. PATH=$(echo "$PATH" | sed -e 's/:\/mnt.*//g')
21. sudo bash -c "echo 0 > /proc/sys/fs/binfmt_misc/status"
22. cd depends
23. ls   
// makefile 
24. make -j 8 HOST=x86_64-w64-mingw32
25. cd .. 
// workspace폴더가 있는 경로에 가서
26. ./autogen.sh 실행
27. CONFIG_SITE=$PWD/depends/x86_64-w64-mingw32/share/config.site ./configure --prefix=/
28. make -j 8
29. 만들어진 코인 내용을 담을 폴더 생성하기
29. sudo make install DESTDIR=경로
// 코인내용을 만들어줄 폴더에 대한 경로
// ex) sudo make install DESTDIR=/mnt/c/user/workspace
30. make deploy 
// 설치용 .exe파일 생성을 위한 것
31. 코인 내용이 생성된 workspace폴더에 data폴더 새로 생성
32. bin폴더 접속해서 해당 위치에서 터미널 켜기
33. 윈도우터미널 환경에서(리눅스 아님) 
.\fivecoin-qt.exe -datadir=C:\Users\오미희\workspace\data
// data폴더에 코인 데이터에 관한 폴더와 파일들을 생성해줌
34. 데몬 실행 // 데몬실행은 하나의 서버를 키는 것과 같다.
35. bin폴더에 conf파일 생성
    -> 메모장 키고
    -> 안에 내용 입력 후
    ```
    server=1
    rpcuser=algml
    rpcpassword=1234
    rpcport=3000
    ```
    -> 파일명 fivecoin1.conf로 하고 파일확장자는 txt에서 모든 파일로 변경후 workspace/bin폴더에 저장

36. 윈도우 터미널에서 (리눅스 아님)   // 서버용 터미널
.\fivecoind.exe -printtoconsole -conf=C:\Users\오미희\fivecoin_work\bin\fivecoin1.conf -datadir="C:\Users\오미희\fivecoin_work\data"
// 데몬 서버 실행을 위한 명령어
// 위의 코드가 실행이 되지 않을 경우
./ingcoind.exe -testnet -rpcuser=test -rpcpassword=1234 -rpcport=9233 -server -deprecatedrpc=accounts -printtoconsole
// 위와 같은 식으로 conf파일을 대체할 수 있도록 직접 data를 입력해서 데몬 실행
37. 윈도우 터미널을 추가로 하나 더 열고(리눅스 아님)   //클라이언트용 터미널
./fivecoin-cli.exe -conf="C:\Users\오미희\fivecoin_work\bin\fivecoin1.conf" getbalance
// 기본으로  ./fivecoin-cli.exe -conf="C:\Users\오미희\fivecoin_work\bin\fivecoin1.conf" 에다가 뒤에 추가적으로 실행할 명령어 입력
// getbalance는 현재 내가 가진 코인 잔액을 보여줌
* 그 외 명령어
// getbalance
// getnewaddres
// listaccounts
// generate
 ./fivecoin-cli.exe -conf="C:\Users\오미희\fivecoin_work\bin\fivecoin1.conf" generate 10
 // 10개의 블럭 생성

 * 블럭을 생성한다고 해서 매번 보상을 해주는 것은 아님
 // 시도를 하는 것이지 블럭 생성에 실패할 수 도 있고
 // 채굴에 성공한다해도 보상이 이루어지지 않는 경우도 존재
 // 그래서 getbalance로 확인하면서 
 38. workspace 폴더에 data2 폴더 추가생성 이는 즉 node를 추가하는 것.
 //다시 위에 33. 에서 data를 생성하던 부분 반복
 // conf는 내용 추가
 ```
 server=1
rpcport=3000
rpcuser=mihee
rpcpassword=1234
rpctimeout=600
rpcallowip=127.0.0.1
addnode=127.0.0.1:9233
 ``` 
 // 내용에 대한 해석 블로그 참고
 // https://velog.io/@nara7875/BlockChain%EC%BD%94%EC%9D%B8%EA%B0%84-%EA%B1%B0%EB%9E%98
 39. data2에 대해서도 데몬 실행하고 클라이언트 연결후 블럭 생성
 // 두번째 node에 대한 작업 후에
 40. getnewaddress   ==>  노드에 주소 생성
 ./fivecoin-cli.exe -conf="C:\Users\오미희\fivecoin_work\bin\fivecoin2.conf" getnewaddress agml
 // 위와 같은 명령어 입력시  -> i92fEaQGCaP4NDuxAV5iVczA1W51WSHVdF  의 내용 출력
 // 주소값 잃어버린 경우 getaddressesbyaccount  를 통해 주소값 다시 찾기 가능 
 // 참고 https://velog.io/@nara7875/BlockChain%EC%BD%94%EC%9D%B8%EA%B0%84-%EA%B1%B0%EB%9E%98