
> Name

传统均线指标与KD指标的交易策略Trading-Strategy-of-Traditional-MA-Index-and-KD-Index

> Author

阿基米德的浴缸

> Strategy Description

[trans]
- 策略名称：传统均线指标与KD指标的交易策略
- 数据周期：15M，30M等
- 支持：商品期货、数字货币
- 指标使用了EMA，KD线，其中KD线使用的是默认参数（指标参数固定3，3，9）
- 官方网站：www.quantinfo.com

![IMG](https://www.fmz.com/upload/asset/f842e44b0b8451cb562b8d5bd888e4c0.png) 

- 主图
  EMA均线，公式：MAC^^EMA(C,N);


- 副图

  KD线中的K线，公式：K:SMA(RSV,M1,1);//RSV的移动平均值
  KD线中的D线，公式：D:SMA(K,M2,1);//K的移动平均值

||

- Data Cycle: 15M, 30M, etc.
- Support: Commodity Futures
- Indicators are EMA, KD lines, and KD line use default parameters (index parameters fixed 3, 3, 9)

  ![IMG](https://www.fmz.com/upload/asset/320fafa2ce5d6f68a4260a028783580d.png)  
  ![IMG](https://www.fmz.com/upload/asset/6753142c9c078ad25e9c913e82c0d999.png) 

- Main chart:
  EMA mean, formula: MAC ^^ EMA (C, N);

- Secondary chart:
  K line in KD, formula: K: SMA (RSV, M1, 1); //RSV moving average
  D line in KD, formula: D: SMA (K, M2, 1); //K moving average value

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|SLOSS|2|止损百分比|stop loss percentage|
|N|120|EMA参数|EMA parameter|


> Source (MyLanguage)

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
RSV:=(CLOSE-LLV(LOW,NKD))/(HHV(HIGH,NKD)-LLV(LOW,NKD))*100;  //收盘价与NKD周期最低值做差，NKD周期最高值与NKD周期最低值做差，两差之间做比值。
// (1)closing price minus the lowest value in NKD cycle, 
// (2)the highest value in NKD cycle minus the lowest value in NKD cycle, then (1) divided by (2).

K:SMA(RSV,M1,1);     // RSV的移动平均值
                     // MA of RSV
                     
D:SMA(K,M2,1);       // K的移动平均值
                     // MA of K

BARPOS>N AND C>MAC AND K<D,BK;
BARPOS>N AND C<MAC AND K>D,SK;
C<=BKPRICE*(1-SLOSS*0.01),SP(BKVOL);
C>=SKPRICE*(1+SLOSS*0.01),BP(SKVOL);
C>=BKPRICE*(1+SLOSS*0.01) AND C<MAC,SP(BKVOL);
C<=SKPRICE*(1-SLOSS*0.01) AND C>MAC,BP(SKVOL);
```

> Detail

https://www.fmz.com/strategy/128249

> Last Modified

2019-08-20 10:30:47
