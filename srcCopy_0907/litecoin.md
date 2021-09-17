# 나만의 코인 만들기
// bitcoin.md참고 해서 볼 것

- litecoin
- https://github.com/litecoin-project/litecoin.git
## 메인넷설정
# 순서
1. doc 폴더
2. buildwindows파일에 들어감 - 0.15버전을 가장 많이 사용(브랜치로 버전 나뉨) -> version 0.15

** 나의 코인을 만든다는 것...
3. windows terminal로 가서 wsl cd ~ 홈디렉토리도 이동  (-> 홈디렉토리에서 코인을 만드려는 곳에서/ 나는 home/algml/workspace에서 만들었다.)
4. git clone -b 0.15 --single-branch https://github.com/litecoin-project/litecoin.git ingcoin_0.0.15
5. cd ingcoin_0.0.15
6. sudo apt update
7. sudo apt upgrade
8. sudo apt install build-essential libtool autotools-dev automake pkg-config bsdmainutils curl git 
9. sudo apt install nsis
10. sudo apt install g++-mingw-w64-x86-64
11. sudo update-alternatives --config x86_64-w64-mingw32-g++
// 위의 명령어 치고 1치고 enter
12. find 파일명 변경리스트
```
---------이름 바꾸기-----------------------------------------------------
find ./ -type f -readable -writable -exec sed -i "s/Litecoin/INGcoin/g" {} \;
// 찾겠다. type이 파일인 것들을             s에서 g까지 Litecoin이라는 것을INGcoin으로 바꾸겠다.
```
find ./ -type f -readable -writable -exec sed -i "s/LiteCoin/ingCoin/g" {} \;
find ./ -type f -readable -writable -exec sed -i "s/litecoin/ingcoin/g" {} \;
find ./ -type f -readable -writable -exec sed -i "s/litecoind/ingcoind/g" {} \;
find ./ -type f -readable -writable -exec sed -i "s/LITECOIN/INGCOIN/g" {} \;
find ./ -type f -readable -writable -exec sed -i "s/lites/ings/g" {} \;

---------단위 바꾸기-----------------------------------------------------
find ./ -type f -readable -writable -exec sed -i "s/LTC/ING/g" {} \;
find ./ -type f -readable -writable -exec sed -i "s/photons/iphontons/g" {} \;

---------------포트변경하기------------------------------------------------
find ./ -type f -print0 | xargs -0 sed -i "s/9333/9233/g"
find ./ -type f -print0 | xargs -0 sed -i "s/9332/9232/g"
find ./ -type f -print0 | xargs -0 sed -i "s/19335/19235/g"
find ./ -type f -print0 | xargs -0 sed -i "s/19332/19232/g"

13. code .     // ingcoin_0.0.15 들어간 상태에서 
=> 비쥬얼스튜디오 열기
14. 해당 폴더가 열린 비쥬얼 스튜디오에서 
검색 - src에서 chainparams.cpp파일을 찾고 
127번째줄쯤에 있는 
messageStart값 변경
[0] = fd
[1] = c2
[2] = b8
[3] = dd

218번째줄
[0] = ff
[1] = d4
[2] = ca
[3] = fs


133번째줄 첫번째 글자 설정   
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1,102);   ->로 바꿈
https://en.bitcoin.it/wiki/List_of_address_prefixes


     ------ 제네시스 블럭 생성
15. cd ..   ->ingcoin을 나감  -> workspace로
16. git clone https://github.com/lhartikk/GenesisH0
17. cd GensisH0
        -python 파일이 하나 존재
18. 파이썬 실행을 위해 python설치를 진행
// sudo apt install python2  or   sudo apt install python
// sudo apt install python3

python Genesis.py를 입력시
```
Traceback (most recent call last):
  File "genesis.py", line 2, in <module>
    import scrypt
ImportError: No module named scrypt
```
이렇게 나오면 된거임


sudo apt install python-pip
sudo apt install python3-pip

home디렉토리 cd~ workspace2/GenesisHo
curl https://bootstrap.pypa.io/get-pip.py --output get-pip.py

curl https://bootstrap.pypa.io/pip/2.7/get-pip.py --output get-pip2.py
sudo python get-pip2.py
//sudo python3 get-pip.py
--- 어려움 이부분 다시 볼 것========================================================


sudo pip2 install scrypt
sudo pip2 install construct
sudo pip2 install construct==2.5.2
==============================================================================================
// 여기서부터 다시 해보기
sudo python2 genesis.py -a scrypt -z "hello ingcoin" -t 1631556398
// -t -> timestamp
<!-- //19. sudo pip install scrypt construct==2.5.2 -->


<!-- ```
04ffff001d01040d68656c6c6f20696e67636f696e
algorithm: scrypt
merkle hash: e626b891a669ed58da1fb770e6ebf8b05665a60b2311fe7c286a29b917b0b619
pszTimestamp: hello ingcoin
pubkey: 04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f
time: 1631556376
bits: 0x1e0ffff0
Searching for genesis hash..
2555.0 hash/s, estimate: 466.9 hgenesis hash found!
nonce: 2015515
genesis hash: 8c36f3401106465dbd13c50fb29c7d0351f8648695aacd26c21888795a81b11e
``` -->
```
04ffff001d01040d68656c6c6f20696e67636f696e
algorithm: scrypt
merkle hash: e626b891a669ed58da1fb770e6ebf8b05665a60b2311fe7c286a29b917b0b619
pszTimestamp: hello ingcoin
pubkey: 04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f
time: 1631556398
bits: 0x1e0ffff0
Searching for genesis hash..
genesis hash found!
nonce: 388257
genesis hash: f0339a023a5d3ec321acbf80514889d288b37de0ae93d801ba80a778935b28f1
```
// genesis.py파일 -> 블럭 생성을 위해 필요한 data를 만들어 준 것 (블럭을 생성한 것 아님)
// genesis.py파일을 통해 얻어낸 data를 직접 하드코딩으로 값을 넣어주거나 or 바꿔주어야 한다.
위의 내용을 data넣는 곳에 넣음

chainparams.cpp
51번째줄 pszTimestamp로 변경
52번째줄 pubkey로 변경
121번째줄 createGensisBlock()->인자값5개 (time,nonce,)
// 첫번째 인자값 time
// 두번째 인자값 nonce
123번째줄 제네시스 해쉬값
// 값을 넣을 때 앞에 0x를 붙여준다.(0x -> 16진수로 나타내겠다는 의미)
ex)0xf0339a023a5d3ec321acbf80514889d288b37de0ae93d801ba80a778935b28f1
124번째줄 머클루트값
// 값을 넣을 때 앞에 0x를 붙여준다.(0x -> 16진수로 나타내겠다는 의미)
ex)0xe626b891a669ed58da1fb770e6ebf8b05665a60b2311fe7c286a29b917b0b619
127번째줄부터 131번째 줄까지 주석처리
```
vSeeds.emplace_back("seed-a.ingcoin.loshan.co.uk", true);
vSeeds.emplace_back("dnsseed.thrasher.io", true);
vSeeds.emplace_back("dnsseed.ingcointools.com", true);
vSeeds.emplace_back("dnsseed.ingcoinpool.org", true);
vSeeds.emplace_back("dnsseed.koin-project.com", false);
  해당 부분 전부 아래와 같이 주석처리
//vSeeds.emplace_back("seed-a.ingcoin.loshan.co.uk", true);
//vSeeds.emplace_back("dnsseed.thrasher.io", true);
//vSeeds.emplace_back("dnsseed.ingcointools.com", true);
//vSeeds.emplace_back("dnsseed.ingcoinpool.org", true);
//vSeeds.emplace_back("dnsseed.koin-project.com", false);
```
127번째 줄 부분에 주석처리한 내용 밑에 아래와 같은 내용 추가
vSeeds.clear();
vSeeds.emplace_back("",true);
150번째줄 0x제네시스해시값
      150번째 줄 ->   {  1500, uint256S("0x63dbd556e6b90b48dff8f0a077b0ae226a7c31dc3e34a9ccd3db7aa34e8c0f3a")},
151번째줄부터 165번째 줄까지는 전부 주석처리

171번째줄 timestamp값 (chainTxData = ChainTxData{}~이부분의 처음값에는 timestamp값)
  ->1631556398



## 테스트넷 설정
* src폴더의 chainparamsseeds.h
main = {주석}  test = {주석}
* chainparams.cpp
104번째 줄-> consensus.nMinimumChainWork = uint256S("0x0000000000000000000000000000000000000000000000000000000000000000");
213번째 줄 -> consensus.nMinimumChainWork = uint256S("0x0x0000000000000000000000000000000000000000000000000000000000000000");


* window터미널에 입력
제네시스 블럭도 테스트넷 값으로 설정
기존에















# 0917_금요일
오류수정하기 
make -j 4 HOST=x86_64-w64-mingw32
make =j 4
sudo make install DESTDIR=/mnt/c/work
make deploy



qt/res/icons/bitcoin_splash.png -> qt/res/incons/[코인이름]_splash.png
ingcoin_splash.png

* blockchain.com/explorer=============================================
// blockchain explorer

// qt -> 사용자 인터페이스
네트워크 -> 비트코인 간 연결해주는
클라이언트 -> 
네트워크와 클라이언트간 통신을 http로 했었는데
여기서는 RPC로 소통 (HTTP와 매우 흡사하다.)
ex)mineblock
Generate

=======================================재시도하느라 아직 빌드중이라 이전에 했던 bitcoin에서 함================
# blockchain explorer
// 현재 자기 컴퓨터를 통해 노드 한개만 존재한다고 가정
## 서버구동
1. 본인이 코인 작업한 곳에서 bin폴더까지 들어가기 (wsl아니고 window 터미널에서)     // C://work/bin
2. .\bitcoind.exe -mainnet -printtoconsole -datadir="C://work/data"
// bitcoind.exe에서 실행
// -mainnet   ->   메인넷에서
// -printtoconsole    -> 콘솔을 보여주겠다.  
// -datadir="C://work/data"   -> 경로는 여기
3.       //bin폴더에서 (C://work/bin)
./bitcoin-cli.exe -mainnet getbalance
// cil이용할 경우
qt실행후-
설정 - 옵션이라는 메인바 - openconfigurebar 
server=1
rpcuser=ingoo    //rpcuser는 ingoo
rpcpassword=1234    // rpc패스워드는 1234



// 중간에 놓친 녹화영상 다시 볼 것
- .\ingcoind.exe -mainnet -printtoconsole -datadir="c://work/data"
- .\ingcoin-cli.ext -mainnet getbalance
- .\ingocin-cli.exe -mainnet -rpcpassword=1236 getbalance
- .\ingcoin-cli.exe -mainnet -rpcpassword=1236 generate 1   
      -> 하면 []
- .\ingcoin-cli.exe -mainnet -rpcpassword=1234 generate 100



==추석 때 과제==============================================================
// 내 이름으로 빌드해보기
// 