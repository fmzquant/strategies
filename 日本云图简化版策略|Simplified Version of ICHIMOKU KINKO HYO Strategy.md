
> 策略名称

日本云图简化版策略|Simplified Version of ICHIMOKU KINKO HYO Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 策略名称：日本云图简化版策略
- 支持：商品期货
- 适用周期：多周期
- 官方网站：www.quantinfo.com

  ![IMG](https://www.fmz.com/upload/asset/8f499518ffb1876478917e564e9b7a71.png) 

- 主图：
  无

- 副图：
  无

||

- Strategy Name: Simplified Version of ICHIMOKU KINKO HYO Strategy
- Support: Commodity Futures
- Applicable cycle: multi-cycle

  ![IMG](https://www.fmz.com/upload/asset/6f4c8ca3330841b05f7fb0fcf311f7e0.png)  
  ![IMG](https://www.fmz.com/upload/asset/bb88fe6d9191768a71c29361ed5cc0f3.png)  
  ![IMG](https://www.fmz.com/upload/asset/1ce2e5d93a05cb49c0bd9a7113deeb0c.png) 

- Main chart: 
  none

- Secondary chart: 
  none

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N1|10|收盘价周期1|closing price Cycle 1|
|N4|177|收盘价周期2|closing price Cycle 2|
|N2|41|开盘价周期1|opening price cycle 1|
|N3|52|开盘价周期2|opening price cycle 2|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-06-01 00:00:00
end: 2018-09-25 00:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
*)

//交易条件
//Trading terms
CONDITION1:=REF(CLOSE,1) > REF(CLOSE,N1)  AND REF(CLOSE,8) > REF(CLOSE,N4) AND CLOSE > OPEN AND REF(CLOSE,137)>REF(OPEN,N2) AND CLOSE > REF(OPEN,N3);
CONDITION2:=REF(CLOSE,1) < REF(CLOSE,N1)  AND REF(CLOSE,8) < REF(CLOSE,N4) AND CLOSE < OPEN AND REF(CLOSE,137)<REF(OPEN,N2) AND CLOSE < REF(OPEN,N3);

//交易系统
//Trading system
CONDITION1,BPK;
CONDITION2,SPK;

//过滤函数
//Filter function
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/129083

> 更新时间

2018-12-17 18:41:44
