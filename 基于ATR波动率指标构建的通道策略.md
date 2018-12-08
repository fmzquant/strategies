
> 策略名称

基于ATR波动率指标构建的通道策略

> 策略作者

Zero

> 策略描述

思路：通道自适应策略，固定止损+浮动止盈
适用软件：发明者最最化/文华财经
数据周期：多周期
数据合约：指数合约
交易合约：商品期货/数字货币



> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-11-01 00:00:00
end: 2018-12-01 00:00:00
period: 1h
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
args: [["ContractType","this_week",126961]]
*)

SLOSS:=2;
N:=200;
M:=4;
X:UNIT;
TR1:=MAX(MAX((HIGH-LOW),ABS(REF(CLOSE,1)-HIGH)),ABS(REF(CLOSE,1)-LOW));
ATR:=MA(TR1,N);
MAC:=MA(C,N);
UBAND:=MAC+M*ATR;
DBAND:=MAC-M*ATR;
H>=HHV(H,N),BPK;
L<=LLV(L,N),SPK;
(H>=HHV(H,M*N) OR C<=UBAND) AND BKHIGH>=BKPRICE*(1+M*SLOSS*0.01),SP;
(L<=LLV(L,M*N) OR C>=DBAND) AND SKLOW<=SKPRICE*(1-M*SLOSS*0.01),BP;
//止损
C>=SKPRICE*(1+SLOSS*0.01),BP;
C<=BKPRICE*(1-SLOSS*0.01),SP;
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/127691

> 更新时间

2018-12-01 15:13:23
