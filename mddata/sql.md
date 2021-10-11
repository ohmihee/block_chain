// 시퀄라이즈 참고 블로그 
https://velog.io/@jujube0/Sequelize-%EB%AC%B8%EC%A0%9C%ED%95%B4%EA%B2%B0
// node.js에서 mysql연동 참고 블로그
https://gongbu-ing.tistory.com/32
SQL 구문

# 통계함수
- MIN
- MAX
- SUM
- AVG

ex) 주식 - 캔들차트
3분봉  /  5분봉  /  일봉  /  주봉   /  월봉




# 시퀄라이즈  ==> ORM 사용경험 있습니다....!!!

select max(price) from transaction where 날짜==20210907    ->  해당일의 최고가
select min(price) from transaction where 날짜==20210907    ->  해당일의 최저가
select price from transaction order by reg_date desc limit 0,1
select * from transaction order by reg_date asc limit 0,1

## 관계설정




