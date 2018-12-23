
> 策略名称

你不知道的MACD+MA指标组合策略|MACD+MA Indicator Combination Strategy

> 策略作者

Zero

> 策略描述

[trans]
本期分享MACD+MA指标组合策略，在技术分析中，指标的组合使用是非常常见的，不同的指标组合在一起具有不同的操作要点和分析方法，指标的组合使用可以增强信号的准确性。该策略正是通过比较价格与MA的相互关系，再以MACD指标衡量价格运动加速度，来判断市场所处的状态，构建一种简单的择时交易策略。
||
The MA indicator is short for English(Moving average) and is called the moving average indicator. The moving average(MA) has a trending characteristic, which is relatively stable, unlike the day K line that will rise and fall. The longer the moving average, the more stable the performance. Not easily up and down, you must wait for the true clarity of the stock price trend. The moving average is, in the final analysis, a trend-tracking tool that makes it easy to identify whether a trend has ended or reversed and whether a new trend is emerging.

In this issue, we share the MACD+MA index combination strategy. In the technical analysis, the combination of indicators is very common. Different indicators have different operation points and analysis methods. The combination of indicators can enhance the accuracy of the signal. The strategy is to compare the relationship between price and MA, and then measure the price movement acceleration by MACD index to judge the state of the market and construct a simple timing trading strategy.

[/trans]



> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-11-01 00:00:00
end: 2018-11-22 00:00:00
period: 1h
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*)


// MACD calculation
FASTLENGTH:=12;
SLOWLENGTH:=26; 
MACDLENGTH:=9;

// Length of MA
L1:=50;
L2:=120;

// stop loss 止损 5%	
STOPLOSS:=5; 

//MACD
MACDVALUE:=EMA(CLOSE,FASTLENGTH)-EMA(CLOSE,SLOWLENGTH);
AVGMACD:=EMA(MACDVALUE,MACDLENGTH);
MACDDIFF:=MACDVALUE-AVGMACD;

//MA1、MA2
DMA1:=MA(C,L1);
DMA2:=MA(C,L2);
BUYCONDITION:=MACDVALUE>0 && DMA1>DMA2 && MACDDIFF>0 && C>DMA1 && REF(C,1)>REF(DMA1,1);
SELLCONDITION:=MACDVALUE<0 && DMA1<DMA2 && MACDDIFF<0 && C<DMA1 && REF(C,1)<REF(DMA1,1);

// 开仓条件 When to open position
BKVOL=0 AND BUYCONDITION,BK;
SETSIGPRICETYPE(BK,NEW_ORDER);
SKVOL=0 AND SELLCONDITION,SK;
SETSIGPRICETYPE(SK,NEW_ORDER);

// 离场条件 When to close position
BKVOL>0 AND (REF(MACDVALUE,1)<0 OR REF(DMA1,1)<REF(DMA2,1)),SP;
SKVOL>0 AND (REF(MACDVALUE,1)>0 OR REF(DMA1,1)>REF(DMA2,1)),BP;

// 启动止损 Start stop loss
SKVOL>0 AND HIGH>=SKPRICE*(1+STOPLOSS*0.01),BP;
BKVOL>0 AND LOW<=BKPRICE*(1-STOPLOSS*0.01),SP;
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/127101

> 更新时间

2018-12-14 10:25:27
