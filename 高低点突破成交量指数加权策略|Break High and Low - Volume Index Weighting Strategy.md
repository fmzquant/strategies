
> 策略名称

高低点突破成交量指数加权策略|Break High and Low - Volume Index Weighting Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 策略名称：高低点突破成交量指数加权策略
- 数据周期：多周期
- 回测可以选择 OKEX期货
- 合约：this_week 当周合约
- 官方网站：www.quantinfo.com

![IMG](https://www.fmz.com/upload/asset/efa8dad9db6b13862283a69ee8255934.png)

- 主图：
  无

- 副图
  VJQ， 计算公式： VJQ:EMA(V*(C-REF(C,NC)),N);//定义成交量加权指数为VJQ

|| 

- Data cycle: multiple cycles
- Backtest can choose OKEX futures
- Contract: this_week contract

  ![IMG](https://www.fmz.com/upload/asset/7ba0592df29f0e159c4d6f090c893339.png)  
  ![IMG](https://www.fmz.com/upload/asset/7f9acd992f46482e5709402ae85abd77.png) 

- Main chart: 
  none

- Secondary chart:
  VJQ, calculation formula: VJQ: EMA (V* (C-REF (C, NC)), N)

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|SLOSS|2|止损百分比|percentage of stop loss|
|N|300|EMA指标参数|EMA index parameter|
|NC|50|多少个周期前的收盘价|closing price of how many cycles ago|
|MINAMOUNT|true|最少一次下单数量|minimum order quantity at a time|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-04-01 00:00:00
end: 2018-05-28 00:00:00
period: 1h
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
args: [["N",100],["MINAMOUNT",10],["TradeAmount",10,126961],["ContractType","this_week",126961]]
*)

LOTS:=MAX(MINAMOUNT,INTPART(MONEYTOT/O * 0.8));
VJQ:EMA(V*(C-REF(C,NC)),N);
B:=VJQ>0;
S:=VJQ<0;
BUYPK:=BARPOS>N AND BKVOL=0 AND B AND H>=HHV(H,N);
SELLPK:=BARPOS>N AND SKVOL=0 AND S AND L<=LLV(L,N);
BUYP:=SKVOL>0 AND B;
SELLP:=BKVOL>0 AND S;

// 入场
// Enter
SELLPK,SPK(LOTS);
BUYPK,BPK(LOTS);

// 出场
// Leave
BUYP,BP(SKVOL);
SELLP,SP(BKVOL);

// 止损
// Stop loss
C>=SKPRICE*(1+SLOSS*0.01),BP(SKVOL);
C<=BKPRICE*(1-SLOSS*0.01),SP(BKVOL);
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/128125

> 更新时间

2018-12-15 15:42:32
