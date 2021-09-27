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