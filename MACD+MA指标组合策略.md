
> 策略名称

MACD+MA指标组合策略

> 策略作者

littleDreamXX

> 策略描述

- 公式名称：MACD+MA指标组合策略
- 数据周期：日K
- 数据合约：指数合约
- 交易合约：主力合约
- 适合品种：商品期货
- 官方网站：www.quantinfo.com

- 副图
  副图显示：MACDDIFF，公式 MACDDIFF:MACDVALUE-AVGMACD;

- 主图
  主图显示：DMA1，公式 DMA1^^MA(C,L1);
                    DMA2，公式 DMA2^^MA(C,L2);

![IMG](https://www.fmz.com/upload/asset/6d7b1a3241d607bbc4f4f853687fcf54.png)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|FASTLENGTH|12|MACD指标参数1|
|SLOWLENGTH|26|MACD指标参数2|
|MACDLENGTH|9|MACD指标参数3|
|L1|50|均线1指标|
|L2|120|均线2指标|
|STOPLOSS|5|止损百分比|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2016-06-01 00:00:00
end: 2016-07-19 00:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
*)

//MACD
MACDVALUE:=EMA(CLOSE,FASTLENGTH)-EMA(CLOSE,SLOWLENGTH);
AVGMACD:=EMA(MACDVALUE,MACDLENGTH);
MACDDIFF:MACDVALUE-AVGMACD;

//MA1、MA2
DMA1^^MA(C,L1);
DMA2^^MA(C,L2);
买入开仓价:=VALUEWHEN(BARSBK=1,O);
卖出开仓价:=VALUEWHEN(BARSSK=1,O);
BUYCONDITION:=MACDVALUE>0 && DMA1>DMA2 && MACDDIFF>0 && C>DMA1 && REF(C,1)>REF(DMA1,1);
SELLCONDITION:=MACDVALUE<0 && DMA1<DMA2 && MACDDIFF<0 && C<DMA1 && REF(C,1)<REF(DMA1,1);

//开仓条件
BKVOL=0 AND BUYCONDITION,BK;
SKVOL=0 AND SELLCONDITION,SK;

//离场条件
BKVOL>0 AND (REF(MACDVALUE,1)<0 OR REF(DMA1,1)<REF(DMA2,1)),SP;
SKVOL>0 AND (REF(MACDVALUE,1)>0 OR REF(DMA1,1)>REF(DMA2,1)),BP;

// 启动止损
SKVOL>0 AND HIGH>=卖出开仓价*(1+STOPLOSS*0.01),BP;
BKVOL>0 AND LOW<=买入开仓价*(1-STOPLOSS*0.01),SP;
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/128134

> 更新时间

2019-01-04 15:37:17
