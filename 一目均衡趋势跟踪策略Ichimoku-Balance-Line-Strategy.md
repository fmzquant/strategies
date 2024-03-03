
> Name

一目均衡趋势跟踪策略Ichimoku-Balance-Line-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13099eb28f322da696f.png)
[trans]

## 概述

一目均衡策略是一种趋势跟踪策略,它通过计算均线并结合 Ichimoku Kinko Hyo指标判断趋势方向,实现低风险的趋势跟踪交易。

## 策略原理  

该策略主要基于 Ichimoku Kinko Hyo 指标判断趋势方向。Ichimoku Kinko Hyo 又称“一目均衡表”,它由转换线(Tenkan-sen)、基准线(Kijun-sen)、先行线(Senkou Span A)和确认线(Senkou Span B)组成,形成前方和后方之间的均衡区域,称为“云带”。当价格在云带上方时为多头趋势,价格下破云带为空头信号。

此策略结合价格与均线的关系判断趋势方向。当价格上穿基准线和转换线时产生买入信号;当价格下破云带时产生卖出信号。通过这样的组合判断,可以有效过滤假突破,锁定趋势方向。  

## 优势分析

- 利用 Ichimoku Kinko Hyo 指标判断趋势,避免被震荡市场的假突破误导
- 均线参数可调,可针对不同周期进行优化  
- 结合均线关系判断,可有效锁定趋势方向
- 采用云带判断,可实现低风险的趋势跟踪交易

## 风险分析

- 震荡行情中容易产生错误信号  
- 参数设置不当可能导致过于频繁或不及时地产生交易信号
- 需要人工判断趋势方向及参数调整

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化 Ichimoku 参数,适应更多时间周期
2. 增加止损策略,控制单笔损失  
3. 结合其他指标判断强弱趋势,避免被震荡行情误导  
4. 增加开仓条件,避免在极端行情中建仓

## 总结  

整体来说,一目均衡策略通过 Ichimoku Kinko Hyo 指标判断趋势方向,可有效锁定趋势,并配合均线关系判断产生交易信号,实现低风险的趋势跟踪交易。该策略可通过参数调整和优化来适应不同的市场环境,值得投资者进一步研究和使用。

||

## Overview  

The Ichimoku Balance Line strategy is a trend following strategy that determines trend direction by calculating moving averages combined with the Ichimoku Kinko Hyo indicator for low-risk trend trading.  

## Strategy Principle   

The strategy mainly uses the Ichimoku Kinko Hyo indicator to determine the trend direction. Ichimoku Kinko Hyo, also known as "Ichimoku Cloud", consists of the Tenkan-sen (Conversion Line), Kijun-sen (Base Line), Senkou Span A (Leading Span A), and Senkou Span B (Leading Span B). It forms an equilibrium zone between the front and back called the "Kumo Cloud". When price is above the cloud, it signals an upward trend. A breach below the cloud signals a downward trend.   

The strategy combines the price relationship with moving averages to determine the trend direction. It generates a buy signal when the price crosses above the Base Line and Conversion Line. A sell signal is generated when the price breaks below the cloud. This combination helps to filter false breakouts and lock in the trend direction.   

## Advantage Analysis  

- Uses Ichimoku Kinko Hyo to determine the trend and avoid false breakouts in ranging markets  
- Customizable moving average parameters for optimization across periods   
- Combination with moving averages helps to effectively lock in trend direction  
- Cloud bands allow low-risk trend trading  

## Risk Analysis   

- Prone to generating false signals in choppy market conditions
- Improper parameter settings may lead to overly frequent or delayed trade signals  
- Manual judgement of trend direction and parameter adjustment required  

## Optimization Directions  

The strategy can be optimized in several ways:  

1. Optimize Ichimoku parameters to suit more timeframes  
2. Incorporate stop loss to limit losses per trade
3. Add indicators to gauge strong and weak trends to avoid whipsaws   
4. Add more entry conditions to avoid opening positions in extreme market conditions  

## Conclusion   

In conclusion, the Ichimoku Balance Line Strategy uses the Ichimoku Cloud to determine trend direction, locks in trends effectively, and generates trade signals by combining price relationship with moving averages, allowing low-risk trend trading. The strategy can be adapted to different market environments through parameter tuning and optimizations, making it worthwhile for investors to research and utilize.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2016|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2019|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|31|Backtest Stop Day|
|v_input_7|18|Tenkan|
|v_input_8|60|Kijun|
|v_input_9|30|Senkou B|
|v_input_10|52|Senkou A|
|v_input_11|52|Span Offset|
|v_input_12|true|Show Tenkan|
|v_input_13|true|Show Kijun|
|v_input_14|true|Show Span A|
|v_input_15|true|Show Span B|
|v_input_16|true|Show Chikou|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-19 00:00:00
end: 2023-12-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Credit for the initial code to nathanhoffer - I simply added the ability to select a time period
//
strategy("Cloud Breakout", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.0)

/////////////// Component Code Start ///////////////
testStartYear = input(2016, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

testPeriod() => true

Ten = input(18, minval=1, title="Tenkan")
Kij = input(60, minval=1, title="Kijun")
LeadSpan = input(30, minval=1, title="Senkou B")
Displace = input(52, minval=1, title="Senkou A")
SpanOffset = input(52, minval=1, title="Span Offset")

sts = input(true, title="Show Tenkan")
sks = input(true, title="Show Kijun")
ssa = input(true, title="Show Span A")
ssb = input(true, title="Show Span B")
sc = input(true, title="Show Chikou")

source = close

//Script for Ichimoku Indicator
donchian(len) => avg(lowest(len), highest(len))
TS = donchian(Ten)
KS = donchian(Kij)
SpanA = avg(TS, KS)
SpanB = donchian(LeadSpan)

CloudTop = max(TS, KS)

Chikou = source[Displace]
SpanAA = avg(TS, KS)[SpanOffset]
SpanBB = donchian(LeadSpan)[SpanOffset]

//Kumo Breakout (Long)
SpanA_Top = SpanAA >= SpanBB ? 1 : 0
SpanB_Top = SpanBB >= SpanAA ? 1 : 0

SpanA_Top2 = SpanA >= SpanB ? 1 : 0
SpanB_Top2 = SpanB >= SpanA ? 1 : 0

SpanA1 = SpanA_Top2 ? SpanA : na
SpanA2 = SpanA_Top2 ? SpanB : na

SpanB1 = SpanB_Top2 ? SpanA : na
SpanB2 = SpanB_Top2 ? SpanB : na

//plot for Tenkan and Kijun (Current Timeframe)
p1= plot(sts and TS ? TS : na, title="Tenkan", linewidth = 2, color = gray)
p2 = plot(sks and KS ? KS : na, title="Kijun", linewidth = 2, color = black)
//p5 = plot(sc and KS ? KS : na, title="Chikou", linewidth = 2, color = orange)
p5 = plot(sc and Displace ? close: na, title="Chikou", linewidth = 2, offset=-Displace, color = orange)

//Plot for Kumo Cloud (Dynamic Color)
p3 = plot(ssa and SpanA ? SpanA : na, title="SpanA", linewidth=2, offset=Displace, color=green)
p4 = plot(ssb and SpanB ? SpanB : na, title="SpanB", linewidth=2, offset=Displace, color=red)

p8 = plot(ssa and SpanA1 ? SpanA1 : na, title="Span A1 above", style=linebr, linewidth=1, offset=Displace, color=green)
p9 = plot(ssa and SpanA2 ? SpanA2 : na, title="Span A2 above", style=linebr, linewidth=1, offset=Displace, color=green)
p10 = plot(ssb and SpanB1 ? SpanB1 : na, title="Span B1 above", style=linebr, linewidth=1, offset=Displace, color=red)
p11 = plot(ssb and SpanB2 ? SpanB2 : na, title="Span B2 above", style=linebr, linewidth=1, offset=Displace, color=red)

fill(p8, p9, color = lime, transp=70, title="Kumo Cloud Up")
fill (p10, p11, color=red, transp=70, title="Kumo Cloud Down")

LongSpan = (SpanA_Top and source[1] < SpanAA[1] and source > SpanAA) or (SpanB_Top and source[1] < SpanBB[1] and source > SpanBB) ? 1 : 0
cupSpan = LongSpan  == 1 ? LongSpan : 0

Long_Breakout = (SpanA_Top ==1 and crossover(source, SpanAA)) or (SpanB_Top ==1 and crossover(source, SpanBB))

ShortSpan = (SpanB_Top and source[1] > SpanAA[1] and source < SpanAA) or (SpanA_Top and source[1] > SpanBB[1] and source < SpanBB) ? 1 : 0
cdnSpan = ShortSpan == 1 ? ShortSpan : 0

Short_Breakout = (SpanA_Top ==1 and crossunder(source, SpanBB)) or (SpanB_Top ==1 and crossunder(source, SpanAA))

//Kumo Twist
Kumo_Twist_Long = SpanA[1] < SpanB[1] and SpanA > SpanB ? 1 : 0
Kumo_Twist_Short = SpanA[1] > SpanB[1] and SpanA < SpanB ? 1 : 0

cupD = Kumo_Twist_Long == 1 ? Kumo_Twist_Long : 0
cdnD = Kumo_Twist_Short == 1 ? Kumo_Twist_Short : 0

Chikou_Above = close > Chikou
Chikou_Below = close < Chikou

long = (cross(TS, SpanA) or cross(TS, SpanB)) and TS>SpanA and TS>SpanB and TS>=KS
short = cross(TS, KS) and KS >= TS

if testPeriod()
    strategy.entry("long", strategy.long, when=Long_Breakout)
    strategy.entry("short", strategy.short, when=Short_Breakout)
```

> Detail

https://www.fmz.com/strategy/436652

> Last Modified

2023-12-26 16:13:42
