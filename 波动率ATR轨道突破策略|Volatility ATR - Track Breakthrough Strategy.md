
> 策略名称

波动率ATR轨道突破策略|Volatility ATR - Track Breakthrough Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 公式名称：波动率轨道突破策略
- 数据周期：15M，30M等
- 支持：商品期货、数字货币现货、数字货币期货
- 官方网站：www.quantinfo.com

![IMG](https://www.fmz.com/upload/asset/36b0e279ae314411a9d6b7e94a0623f0.png)

- 主图：
  中轨，公式：MIDLINE^^MA((H + L + C)/3,LENGTH1);
  上轨，公式：UPBAND^^MIDLINE + N*ATR;
  下轨，公式：DOWNBAND^^MIDLINE - N*ATR;


- 副图：
  波动率，公式：ATR:=MA(TR,LENGTH2);

||

- Strategy name: Volatility ATR Track Breakthrough Strategy
- Data Cycle: 15M, 30M, etc.            
- Support: Commodity Futures, Digital Currency Spot, Digital Currency Futures 

   ![IMG](https://www.fmz.com/upload/asset/3ab48b24790ffa7df8578da42ee9890d.png)  
   ![IMG](https://www.fmz.com/upload/asset/26254e88d3af8327dc70f9e4d0797b88.png) 

- Main chart:
  medium track, formula: MIDLINE ^^ MA ((H + L + C) / 3, LENGTH1);
  up track, formula: UPBAND ^^ MIDLINE + NATR;
  low track, formula: DOWNBAND ^ ^ MIDLINE - NATR;

- Secondary chart:
  Volatility, formula: ATR:= MA (TR, LENGTH2);

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|LENGTH2|100|ATR指标参数|ATR index parameter|
|LENGTH1|300|均线指标参数|MA index parameter|
|N|2|上下轨系数|Upper and lower track coefficients|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-07-01 00:00:00
end: 2018-09-17 00:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["LENGTH2",30],["LENGTH1",100],["ContractType","rb888",126961]]
*)

TR:=MAX(MAX((H-L),ABS(REF(C,1)-H)),ABS(REF(C,1)-L));
ATR:=MA(TR,LENGTH2);

MIDLINE^^MA((H + L + C)/3,LENGTH1);
UPBAND^^MIDLINE + N*ATR;
DOWNBAND^^MIDLINE - N*ATR;


BKVOL=0 AND C>=UPBAND AND REF(C,1)<REF(UPBAND,1),BPK;
SKVOL=0 AND C<=DOWNBAND AND REF(C,1)>REF(DOWNBAND,1),SPK;

BKVOL>0 AND C<=MIDLINE,SP(BKVOL);
SKVOL>0 AND C>=MIDLINE,BP(SKVOL);
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/128252

> 更新时间

2018-12-17 16:18:06
