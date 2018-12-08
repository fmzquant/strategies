
> 策略名称

传统均线指标与KD指标的交易策略

> 策略作者

littleDreamXX

> 策略描述

- 策略名称：传统均线指标与KD指标的交易策略
- 数据周期：15M，30M等
- 支持：商品期货
- 指标使用了EMA，KD线，其中KD线使用的是默认参数（指标参数固定3，3，9）
- 官方网站：www.quant.la

![IMG](https://www.fmz.com/upload/asset/f842e44b0b8451cb562b8d5bd888e4c0.png) 

- 主图
  EMA均线，公式：MAC^^EMA(C,N);


- 副图

  KD线中的K线，公式：K:SMA(RSV,M1,1);//RSV的移动平均值
  KD线中的D线，公式：D:SMA(K,M2,1);//K的移动平均值

> 策略参数



|参数|默认值|描述|
|----|----|----|
|SLOSS|2|止损百分比|
|N|120|EMA参数|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-04-01 00:00:00
end: 2018-05-15 00:00:00
period: 30m
exchanges: [{"eid":"Futures_BitMEX","currency":"XBT_USD"}]
args: [["TradeAmount",100,126961],["ContractType","XBTUSD",126961]]
*)

MAC^^EMA(C,N);

NKD:=9;
M1:=3;
M2:=3;
RSV:=(CLOSE-LLV(LOW,NKD))/(HHV(HIGH,NKD)-LLV(LOW,NKD))*100;//收盘价与NKD周期最低值做差，NKD周期最高值与NKD周期最低值做差，两差之间做比值。
K:SMA(RSV,M1,1);//RSV的移动平均值
D:SMA(K,M2,1);//K的移动平均值

BARPOS>N AND C>MAC AND K<D,BK;
BARPOS>N AND C<MAC AND K>D,SK;
C<=BKPRICE*(1-SLOSS*0.01),SP(BKVOL);
C>=SKPRICE*(1+SLOSS*0.01),BP(SKVOL);
C>=BKPRICE*(1+SLOSS*0.01) AND C<MAC,SP(BKVOL);
C<=SKPRICE*(1-SLOSS*0.01) AND C>MAC,BP(SKVOL);
```

> 策略出处

https://www.fmz.com/strategy/128249

> 更新时间

2018-12-05 18:34:08
