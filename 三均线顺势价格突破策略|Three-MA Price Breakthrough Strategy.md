
> 策略名称

三均线顺势价格突破策略|Three-MA Price Breakthrough Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 公式名称：三均线顺势价格突破策略
- 数据周期：多周期
- 数据合约：指数合约
- 交易合约：主力合约
- 适合品种：商品期货
- 官方网站：www.quantinfo.com

![IMG](https://www.fmz.com/upload/asset/4327c3e54a8618bb6f5b0ac3ea54dfc2.png)

||

- Data cycle: multiple cycles
- Data contract: index contract
- Trading contract: main contract
- Suitable for: commodity futures

  ![IMG](https://www.fmz.com/upload/asset/ed995f267589e43cdc0492a87952dcad.png) 

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|SLOSS|2|止损百分比|stop loss percentage|
|N1|30|均线1参数|MA1 parameter|
|N2|60|均线2参数|MA2 parameter|
|N3|90|均线3参数|MA3 parameter|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-01-01 00:00:00
end: 2018-02-28 00:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES","balance":20000}]
*)

LOTS:=MAX(1,INTPART(MONEYTOT/(O*UNIT*0.1)));

MA1^^MA(C,N1);
MA2^^MA(C,N2);
MA3^^MA(C,N3);

BUYK:=BARPOS>N3 AND BKVOL=0 AND MA1>MA2 AND MA2>MA3 AND C>MA1;
SELLK:=BARPOS>N3 AND SKVOL=0 AND MA1<MA2 AND MA2<MA3 AND C<MA1;
BUYP:=SKVOL>0 AND CROSS(C,MA2) AND C>MA1 AND C<=SKPRICE*(1-2*SLOSS*0.01);
SELLP:=BKVOL>0 AND CROSS(MA2,C) AND MA1>C AND C>=BKPRICE*(1+2*SLOSS*0.01);

BUYK,BK(LOTS);
SELLK,SK(LOTS);

// 止盈
// take profit
BUYP,BP(SKVOL);
SELLP,SP(BKVOL);

// 止损
// stop loss
C>=SKPRICE*(1+SLOSS*0.01),BP(SKVOL);
C<=BKPRICE*(1-SLOSS*0.01),SP(BKVOL);
```

> 策略出处

https://www.fmz.com/strategy/128130

> 更新时间

2018-12-17 12:23:47
