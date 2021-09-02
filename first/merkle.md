* 머클트리 관련 참고 사이트 https://www.banksalad.com/contents/%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85%ED%95%98%EB%8A%94-%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8-%EB%A8%B8%ED%81%B4%ED%8A%B8%EB%A6%AC-Merkle-Trees-%EB%9E%80-ilULl
// npm install merkletreejs
// npm install crypto-js

# merkle tree / 머클트리 ?
    ~ 거래를 두 개씩 묶음
    ~ 거래를 두 개씩 묶기 때문에 경로를 줄여준다.
    ~ 즉 특정 거래 데이터를 찾기에 유용 -> 거래 데이터를 빠르게 확인해서 위변조 방지 

# merkle root / 머클루트 ?
    두개씩 묶여진 거래값들에 의해 최종적으로 만들어진 거래의 가장 꼭대기에 있는 거래의 데이터
    ~ 몇개의 거래가 합쳐지든 머클루트의 용량은 32바이트 
    


