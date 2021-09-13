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
// autotools-dev -> 
// automake -> Makefile을 자동적으로 생성해주는 라이브러리
// pkg-config -> 위랑 비슷
// bsdmainutils   (bsd-main-utils) -> 유닉스계열 운영체제인 bsd의 유틸프로그램을 모음.
// curl -> http의 요청을 보내줌
// git -> git 설치해줌 -> 나중에 git clone 가능하게끔
- sudo apt install nsis

5. pwd쳐서 경로가 home/algml  즉 홈디렉토리인지 확인
6. midir workspace   -> workspace폴더 생성
7. cd workwspace -> workspace로 이동   (pwd치고 home/algml/workspace인지 확인)
8. git clone https://github.com/bitcoin/bitcoin.git
9. ls -> bitcoin폴더 생성된 것 확인
10. cd bitcoin -> bitcoin폴더로 들어가기
11. sudo apt install g++-mingw-w64-x86-64   -> 실직적으로 c++로 빌드해주는
12. sudo update-alternatives --config x86_64-w64-mingw32-g++  -> 실직적으로 c++로 빌드해주는  
// 위의 명령어를 치면 선택하는 거 나오는데 설명서에 있는것대로 1번으로
13. PATH=$(echo "$PATH" | sed -e 's/:\/mnt.*//g')
// echo "$PATH"   -> 현재 나의 PATH값을 알 수 있다.
// echo "$PATH" | grep /usr   -> 필터로 usr를 보여줌
// sed -e 's/:\/mnt.*//g' -> 뒤의 것으로 바꾸어줌
    //  sed는 찾아바꾸기 기능과 비슷.
14. sudo bash -c "echo 0 > /proc/sys/fs/binfmt_misc/status"
15. cd depends -> makefile이 존재하는 디렉토리
// ls로  makefile이 존재하는 지 확인
16. make HOST=x86_64-w64-mingw32   -> 빌드를 시작합니다
// 빌드하는 명령어 -> 시간 좀 오래걸림
 
17. cd ..    
        -> depends폴더에서 나와서
18. ./autogen.sh    
        ->autoget.sh 파일을 실행하라    
                // depends에서 나온 해당 위치에서 ls 명령어를 입력하고 autogen.sh  파일이 존재하는지 확인
19. CONFIG_SITE=$PWD/depends/x86_64-w64-mingw32/share/config.site ./configure --prefix=/  
20. makefile생성 확인한 뒤
21. make -j n   ->  n개의 프로세스로 처리 ex) make -j 4     
        // make   -> 뒤에 다른 옵션 주지 않고 make만 입력하면 1개의 프로세스로만 처리
22. sudo bash -c "echo 1 > /proc/sys/fs/binfmt_misc/status"
23. install 파일을 넣을 디렉토리 선정 (하고)
24. 위의 디렉토리에서 다시 나와서 bitcoin클론했던 폴더로 다시 들어가서
// make install DESTDIR=/mnt/c/work        -> make install DESTDIR=window에서 clone한 폴더를 만들려는 경로
// 위와 같은 위치에서  make deploy
26. window terminal로 다시 해당 폴더안에서 터미널을 열고 bin / include / lib / share  폴더가 있는 폴더에 data 파일을 생성
27. window폴더에서 다시 bin 폴더에 들어가서
28. ./bitcoin-qt.exe -datadir=c:\work\data 명령어 입력  -> bitcoin corerk실행
// 위의 명령어 실행하면 코인 생성하는 창이 뜨는데 오래 걸리고 계속 켜두면 컴퓨터에 안 좋으므로 그냥 빨리 끌 것




# 오류남
/bin/sh : 1: File/nodejs/:/mnt/c/Program: not found
-> 경로문제
-> PATH=$(echo "$PATH" | sed -e 's/:\/mnt.*//g')

 B2_TOOLSET is gcc, but the 'gcc' command connect be executed.
 Make sure 'gcc' is in PATH, or use a different toolsest, gcc
-> gcc설치가 안 되어 있는 것 같아서
-> sudo apt install gcc
