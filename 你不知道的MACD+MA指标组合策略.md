
> 策略名称

你不知道的MACD+MA指标组合策略

> 策略作者

Zero

> 策略描述

本期分享MACD+MA指标组合策略，在技术分析中，指标的组合使用是非常常见的，不同的指标组合在一起具有不同的操作要点和分析方法，指标的组合使用可以增强信号的准确性。该策略正是通过比较价格与MA的相互关系，再以MACD指标衡量价格运动加速度，来判断市场所处的状态，构建一种简单的择时交易策略。



> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-11-01 00:00:00
end: 2018-11-22 00:00:00
period: 1h
exchanges: [{"eid":"OKCoin_EN","currency":"BTC_USD"}]
*)

// 公式名称：MACD+MA指标组合策略
// 数据周期：4小时
// 适合品种：商品期货/数字货币现货/数字货币期货

// MACD计算参数
FASTLENGTH:=12;
SLOWLENGTH:=26; 
MACDLENGTH:=9;

// 均线长度
L1:=50;
L2:=120;

// 止损5%	
STOPLOSS:=5; 

//MACD
MACDVALUE:=EMA(CLOSE,FASTLENGTH)-EMA(CLOSE,SLOWLENGTH);
AVGMACD:=EMA(MACDVALUE,MACDLENGTH);
MACDDIFF:=MACDVALUE-AVGMACD;

//MA1、MA2
DMA1:=MA(C,L1);
DMA2:=MA(C,L2);
买入开仓价:=VALUEWHEN(BARSBK=1,O);
卖出开仓价:=VALUEWHEN(BARSSK=1,O);
BUYCONDITION:=MACDVALUE>0 && DMA1>DMA2 && MACDDIFF>0 && C>DMA1 && REF(C,1)>REF(DMA1,1);
SELLCONDITION:=MACDVALUE<0 && DMA1<DMA2 && MACDDIFF<0 && C<DMA1 && REF(C,1)<REF(DMA1,1);

//开仓条件
BKVOL=0 AND BUYCONDITION,BK;
SETSIGPRICETYPE(BK,NEW_ORDER);
SKVOL=0 AND SELLCONDITION,SK;
SETSIGPRICETYPE(SK,NEW_ORDER);

//离场条件
BKVOL>0 AND (REF(MACDVALUE,1)<0 OR REF(DMA1,1)<REF(DMA2,1)),SP;
SKVOL>0 AND (REF(MACDVALUE,1)>0 OR REF(DMA1,1)>REF(DMA2,1)),BP;

// 启动止损
SKVOL>0 AND HIGH>=卖出开仓价*(1+STOPLOSS*0.01),BP;
SETSIGPRICETYPE(BP,MAX(O,卖出开仓价*(1+STOPLOSS*0.01)));
BKVOL>0 AND LOW<=买入开仓价*(1-STOPLOSS*0.01),SP;
SETSIGPRICETYPE(SP,MIN(O,买入开仓价*(1-STOPLOSS*0.01)));
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/127101

> 更新时间

2018-11-22 22:47:00
