# bitcoin github 주소
https://github.com/bitcoin/bitcoin.git

# 방법
1. doc폴더 들어감 -> 이용하는 방법 설명해줌
2. doc폴더의 build-windows파일에 들어감
* mingw-w64 -> c를 컴파일 해주는 ...
3. windows terminal로 가서 wsl 
4. cd ~   (~ 홈디렉토리에서부터 작업 시작)
- sudo apt update
- sudo apt upgrade
- sudo apt install build-essential libtool autotools-dev automake pkg-config bsdmainutils curl git
// build-essential  -> c나 c++에 필요한 라이브러리 기본적으로 제공
// libtool -> 라이브러리 총괄적으로 스크립트로 지원하는
// automake -> Makefile을 자동적으로 생성해주는 라이브러리
// pkg-config -> 위랑 비슷
// bsdmainutils   (bsd-main-utils) -> 유닉스계열 운영체제인 bsd의 유틸프로그램을 모음.
// curl -> http의 요청을 보내줌
// git -> git ...