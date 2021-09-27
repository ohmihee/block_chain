* 실행
ex)
node.js -> node 파일명
python -> python 파일명
    ~ 이 때 컴파일이나 빌드는 해주지 않음 -> 즉 컴퓨터가 이해할 수 있는 언어로 바꾸어주지 않음

* 위와 다르게 변환해주는 
ex) 
c++ -> hello.cpp


* 순서 
1. windows terminal 들어감
2. wsl 입력
3. 폴더 생성후 code . 하면 비주얼 스튜디오 켜짐
4. hello.cpp 파일 생성 시 c++을 설치를 원하냐는 작은 창이 나옴
5. c++설치
6. hello world 출력해볼 것
7. c++에서 함수 작성해보기
    - c언어 등에서는 DataType이 존재
    - PS C:\Users\오미희\workspace\helloworld>  해당 폴더의  hello.cpp파일 참고
8. 패키지 설치
9. 터미널에 g++ -o hello hello.cpp 입력  -> 빌드하는 명령어
        // g++ 파일 중 
        // -o -> 내보낼 거다
        // hello -> hello에 기계어를
        // hello.cpp -> hello.cpp파일을
            cat hello입력시 기계어로 변환된 내용을 보여줌

            * -c -> 컴파일할 것
10. ./hello 터미널에 입력시  hello world출력


======
// 코드작성
// 기계어
# 환경설정





-  cat  
-  mkdir  -> 폴더생성
-  cd  -> 위치 이동
-  ls  -> 하위항목 보여줌
-  code .  ->  비주얼스튜디오를 켜줌
        ex )mkdir helloworld && cd helloworld  -> && 연산자로 한 번에 폴더 만들고 해당 폴더에 들어간 것
-  sudo apt-get -> 리눅스에서 패키지다운 받는 것
        // 패키지 설치전에  sudo apt-get update -> 패키지 다운 전에 미리  update하는 것
-  sudo apt-get install build-essential gdb -> 빌드 해주는 패키지
        -> build-essential
        -> gdb
-  whereis g++   // 제대로 설치되었는지 위치 확인  
        -> g++  -> 빌드내용... 우리가 작성한 코드가 컴퓨터가 실행할 수 있는 코드로 변환됨
-  whereis gdb   // 제대로 설치되었는지 위치 확인
            -> gdb  -> 

-  g++ -o hello hello.cpp
        // g++ -o  g++을 내보내겠다.
        // g++ -o hello hello.cpp   -> hello에 기계어
        ㄴ cat hello 입력하면 기계어로 변환되니 내용 보여줌