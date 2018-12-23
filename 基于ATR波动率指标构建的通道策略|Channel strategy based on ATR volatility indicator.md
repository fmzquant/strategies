
> 策略名称

基于ATR波动率指标构建的通道策略|Channel strategy based on ATR volatility indicator

> 策略作者

Zero

> 策略描述

[trans]
思路：通道自适应策略，固定止损+浮动止盈
适用软件：发明者最最化/文华财经
数据周期：多周期
数据合约：指数合约
交易合约：商品期货/数字货币
||
ATR, also known as Average true range, was invented by J. Welles Wilder. The ATR indicator is mainly used to measure the intensity of market volatility, that is, the indicator to show the market change rate.

This indicator is mainly used to measure price fluctuations. 
 It is important to remember that ATR does not provide an indication of price direction, just volatility.

This indicator is typical for long periods of sustained marginal movement, which usually occurs at the top of the market or during price consolidation. The principle of prediction according to this indicator can be expressed as: the higher the value of the indicator, the higher the possibility of the trend change; the lower the value of the indicator, the weaker the mobility of the trend.

Idea: channel adaptive strategy, fixed stop loss + floating take profit

Applicable software: FMZ Quant / webstock

Data cycle: multiple cycles

Data contract: index contract

Trading Contract: Commodity Futures /Digital Currency
[/trans]



> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-11-01 00:00:00
end: 2018-12-01 00:00:00
period: 1h
exchanges: [{"eid":"Futures_BitMEX","currency":"XBT_USD"}]
args: [["ContractType","XBTUSD",126961]]
*)

SLOSS:=2;
N:=200;
M:=4;
TR1:=MAX(MAX((HIGH-LOW),ABS(REF(CLOSE,1)-HIGH)),ABS(REF(CLOSE,1)-LOW));
ATR:=MA(TR1,N);
MAC:=MA(C,N);
UBAND^^MAC+M*ATR;
DBAND^^MAC-M*ATR;
NH^^HHV(H,N);
NL^^LLV(L,N);
H>=NH,BPK;
L<=NL,SPK;
(H>=HHV(H,M*N) OR C<=UBAND) AND BKHIGH>=BKPRICE*(1+M*SLOSS*0.01),SP;
(L<=LLV(L,M*N) OR C>=DBAND) AND SKLOW<=SKPRICE*(1-M*SLOSS*0.01),BP;
//止损 StopLoss
C>=SKPRICE*(1+SLOSS*0.01),BP;
C<=BKPRICE*(1-SLOSS*0.01),SP;
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/127691

> 更新时间

2018-12-21 16:13:58
