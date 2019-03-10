
> 策略名称

双均线与形态策略|Double MA and Formation Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 策略名称：双均线与形态策略
- 数据周期：15M
- 支持：商品期货，数字货币，数字货币期货
- 官方网站：www.quantinfo.com

  ![IMG](https://www.fmz.com/upload/asset/cf5ac5fdf4f33ed438ed4498e1a7b142.png) 

- 主图：
  MA指标，公式：  VAR3^^MA(VAR2,PARAM1);
  EMA指标，公式：VAR4^^EMA(VAR3,PARAM2);

- 副图：
  无

||

- Strategy Name: Double MA and Formation Strategy
- Support: Commodity Futures, Digital Currency Spot, Digital Currency Futures 
- Data cycle: 15M

  ![IMG](https://www.fmz.com/upload/asset/a11b6dffb660edef84c785a9d1d88f87.png)  
  ![IMG](https://www.fmz.com/upload/asset/c2498b876b57cce1e887fa052ac8a298.png) 

- Main chart:
  MA index, formula: VAR3 ^^ MA (VAR2, PARAM1);
  EMA index, formula: VAR4 ^ ^ EMA (VAR3, PARAM2);
- Secondary chart:
  none

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|PARAM1|200|MA指标参数|MA index parameter|
|PARAM2|10|EMA指标参数|EMA index parameter|
|PARAM3|true|止盈止损百分比|take profit percentage and stop loss percentage|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-05-02 00:00:00
end: 2018-06-21 00:00:00
period: 15m
exchanges: [{"eid":"Futures_BitMEX","currency":"XBT_USD"}]
args: [["TradeAmount",1000,126961],["SlideTick",10,126961],["ContractType","XBTUSD",126961]]
*)

DIRECTION:=0;         // 方向控制
                      // Direction control

VAR2:=(HIGH+LOW+CLOSE)/3;
VAR3^^MA(VAR2,PARAM1);
VAR4^^EMA(VAR3,PARAM2);
BOOL1:=CLOSE>REF(C,1) AND HIGH>REF(HIGH,1) AND CLOSE>OPEN;
BOOL2:=CLOSE<REF(C,1) AND LOW<REF(LOW,1) AND CLOSE<OPEN;

BUYPK:=BARPOS>PARAM1 AND CLOSE>VAR3 AND BOOL1 AND VAR3>VAR4;
SELLPK:=BARPOS>PARAM1 AND CLOSE<VAR3 AND BOOL2 AND VAR3<VAR4;

BUYJ:=CLOSE>BKPRICE AND BUYPK;
SELLJ:=CLOSE<SKPRICE AND SELLPK;
SELLS:=CLOSE<BKPRICE*(1-PARAM3*0.01);
BUYS:=CLOSE>SKPRICE*(1+PARAM3*0.01);

BKVOL=0 AND BUYPK AND DIRECTION>=0,BPK;
SKVOL=0 AND SELLPK AND DIRECTION<=0,SPK;
BKVOL>0 AND BUYJ,BK;
SKVOL>0 AND SELLJ,SK;
SELLS,SP;
BUYS,BP;
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/129079

> 更新时间

2018-12-17 18:31:58
