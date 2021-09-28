select sum(input),sum(out) from asset group by userid

select
    a.in -a.ou as price
  from(
      SELECT
            userid,
            SUM(input) as inn,
            SUM(output) as ouu
      FROM asset
      GROUP BY userid
    ) as a 
where userid='web7722'




select a.inn -a.ouu as price from(select pk,sum(input) as inn, sum(output) as ouu from asset group by pk) as a where pk="algml1";