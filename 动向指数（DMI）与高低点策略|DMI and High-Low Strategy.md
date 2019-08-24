
> 策略名称

动向指数（DMI）与高低点策略|DMI and High-Low Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 策略名称：动向指数（DMI）与高低点策略
- 数据周期：5M
- 支持：商品期货，数字货币
- 官方网站：www.quantinfo.com



![IMG](https://www.fmz.com/upload/asset/739ea1e668541f362205d9b5acb43372.png)

- 主图：
  AMA1指标，公式：AMA1^^EMA(DMA(CLOSE,CQ1),2);

  AMA2指标，公式：AMA2^^EMA(DMA(CLOSE,CQ2),2);

||

- Strategy Name: DMI and High-Low Strategy
- Data Cycle: 5M
- Support: Commodity Futures

  ![IMG](https://www.fmz.com/upload/asset/e373cde011ba569f143e399a6f51528d.png)  
  ![IMG](https://www.fmz.com/upload/asset/9c51e404853a232c50c6ef12bb809e7d.png) 

- Main chart:
  AMA1 index, formula: AMA1 ^ ^ EMA (DMA (CLOSE, CQ1), 2);
  AMA2 index, formula: AMA2 ^ ^ EMA (DMA (CLOSE, CQ2), 2);

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N|20|AMA1指标参数（1）|AMA1 index parameter(1)|
|N1|4|AMA1指标参数（2）|AMA1 index parameter(2)|
|N2|60|AMA1指标参数（3）|AMA1 index parameter(3)|
|M|40|AMA2指标参数（1）|AMA2 index parameter(1)|
|M1|8|AMA2指标参数（2）|AMA2 index parameter(2)|
|M2|120|AMA2指标参数（3）|AMA2 index parameter(3)|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-11-04 00:00:00
end: 2018-11-30 00:00:00
period: 5m
exchanges: [{"eid":"Futures_BitMEX","currency":"XBT_USD"}]
args: [["TradeAmount",100,126961],["ContractType","XBTUSD",126961]]
*)


DIR1:=ABS(CLOSE-REF(CLOSE,N));
VIR1:=SUM(ABS(CLOSE-REF(CLOSE,1)),N);
ER1:=DIR1/VIR1;
CS1:=ER1*(2/(N1+1)-2/(N2+1))+2/(N2+1);
CQ1:=CS1*CS1;
AMA1^^EMA(DMA(CLOSE,CQ1),2);

DIR2:=ABS(CLOSE-REF(CLOSE,M));
VIR2:=SUM(ABS(CLOSE-REF(CLOSE,1)),M);
ER2:=DIR2/VIR2;
CS2:=ER2*(2/(M1+1)-2/(M2+1))+2/(M2+1);
CQ2:=CS2*CS2;
AMA2^^EMA(DMA(CLOSE,CQ2),2);

cq22:CQ2;
aa:DMA(CLOSE,CQ2);

BKVOL=0  AND  REF(AMA1,1)<REF(AMA2,1)  AND  AMA2<AMA1,BPK;
SKVOL=0  AND  REF(AMA1,1)>REF(AMA2,1)  AND  AMA2>AMA1,SPK;
```

> 策略出处

https://www.fmz.com/strategy/128418

> 更新时间

2019-08-20 10:24:43
