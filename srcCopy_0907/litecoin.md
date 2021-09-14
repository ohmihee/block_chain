# 나만의 코인 만들기
// bitcoin.md참고 해서 볼 것

- litecoin
- https://github.com/litecoin-project/litecoin.git

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