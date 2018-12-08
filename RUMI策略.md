
> 策略名称

RUMI策略

> 策略作者

littleDreamXX

> 策略描述

- 策略名称：RUMI策略
- 适用周期：多周期
- 支持：商品期货、数字货币期货、数字货币现货
- 官方网站：www.quant.la


  /upload/asset/df2427683a93f2c896c853c89e3ae494.png  
  
  /upload/asset/67f75ccbe20acf6cbaa62a1d580daeda.png 


- 主图：
  无

- 副图：
  AOS指标，公式： AOS:MA(OS,N3);

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N1|3|AOS指标参数1|
|N2|100|AOS指标参数2|
|N3|30|AOS指标参数3|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-01-01 00:00:00
end: 2018-01-07 00:00:00
period: 5m
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
args: [["TradeAmount",100,126961],["ContractType","this_week",126961]]
*)

OS:=MA(CLOSE,N1)-EMA2(CLOSE,N2);
AOS:MA(OS,N3);
CONDITION1:=CROSSUP(AOS,0);
CONDITION2:=CROSSDOWN(AOS,0);
CONDITION1,BPK;
CONDITION2,SPK;
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/129082

> 更新时间

2018-12-07 11:36:11
