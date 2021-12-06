
> 策略名称

CT策略之线性回归斜率策略

> 策略作者

程文



> 策略参数



|参数|默认值|描述|
|----|----|----|
|len|35|len|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2015-02-22 00:00:00
end: 2021-11-03 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
*)

N:=35;
AMOUNT:=INTPART(MONEYTOT*0.25/(C*UNIT*0.15));
ABOVE^^HHV(H,N);
FOLLOW^^LLV(L,N);
MIDDLE^^(ABOVE+FOLLOW)/2;
AVGMIDDLE^^MA(MIDDLE,N);
AVGMIDDLESLOPE:SLOPE(AVGMIDDLE,N);
AVGMIDDLESLOPE>REF(AVGMIDDLESLOPE,1)&&REF(AVGMIDDLESLOPE,1)>REF(AVGMIDDLESLOPE,2),BPK(AMOUNT);
AVGMIDDLESLOPE<REF(AVGMIDDLESLOPE,1)&&REF(AVGMIDDLESLOPE,1)<REF(AVGMIDDLESLOPE,2),SPK(AMOUNT);
AUTOFILTER;

```

> 策略出处

https://www.fmz.com/strategy/327774

> 更新时间

2021-11-04 10:00:28
