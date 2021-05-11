
> 策略名称

CTA策略之同级多相位趋势策略

> 策略作者

Hukybo



> 策略参数



|参数|默认值|描述|
|----|----|----|
|N|2|N|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2015-02-22 00:00:00
end: 2021-05-07 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["ContractType","rb000",126961]]
*)

// 获取前4根K线最高价与开盘价的差的均价
LINE := O - (((REF(H, 1) - REF(O, 1)) + (REF(H, 2) - REF(O, 2)) + (REF(H, 3) - REF(O, 3)) + (REF(H, 4) - REF(O, 4))) / 4) * N;
D := REF(C, 1) < REF(C, 2) && REF(C, 2) < REF(C, 3) && REF(C, 3) < REF(C, 4) && C > LINE;
K := REF(C, 1) > REF(C, 2) && REF(C, 2) > REF(C, 3) && REF(C, 3) > REF(C, 4) && C <= LINE;
D, BK;
K, SK;
T1 := BARSLAST(BARSLAST(K) < BARSLAST(D));
T2 := BARSLAST(BARSLAST(D) < BARSLAST(K));
DT := IFELSE(T1 <= REF(T1, 1), 0, (C - VALUEWHEN(T1 = 1, C)));
KT := IFELSE(T2 <= REF(T2, 1), 0, (VALUEWHEN(T2 = 1, C) - C));
T1 < 5 && T1 > 3 && DT < 7, SP;
T2 < 5 && T2 > 3 && KT < 7, BP;
```

> 策略出处

https://www.fmz.com/strategy/279278

> 更新时间

2021-05-10 18:06:24
