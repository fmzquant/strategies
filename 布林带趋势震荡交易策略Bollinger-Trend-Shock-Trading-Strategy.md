
> Name

布林带趋势震荡交易策略Bollinger-Trend-Shock-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/166e4cec9a6883f9f5a.png)

[trans]

### 概述

本策略基于布林带指标判断市场趋势方向,在趋势方向发生转折时进行反向操作。多头市场时,当价格跌破布林带下轨时做多;空头市场时,当价格突破布林带上轨时做空。同时,策略还设置了移动平均线作为长期趋势的判断标准,使策略更加稳定。

### 策略原理

本策略使用布林带中轨、上轨、下轨判断市场趋势方向。布林带中轨为n周期的指数移动平均线,布林带上轨和下轨分别为中轨+2.3倍标准差和中轨-2.3倍标准差。当价格突破下轨时,表示当前处于多头市场;当价格突破上轨时,表示当前处于空头市场。

另外,策略还设置200周期简单移动平均线sma作为长期趋势判断指标。只有当布林带指标和sma指标同向的时候,才会发出交易信号。这可以有效过滤掉部分假突破。

具体交易逻辑如下:
1. 判断多头趋势:布林带上轨>sma,中轨>sma,下轨>=sma
2. 判断空头趋势:布林带上轨<sma,中轨<sma,下轨<=sma  
3. 做多条件:多头趋势+价格跌破布林带下轨
4. 出场条件:价格突破布林带上轨 
5. 做空条件:空头趋势+价格突破布林带上轨
6. 出场条件:价格跌破布林带中轨 或 价格重新回调到230周期移动平均线之上

### 优势分析

1. 使用布林带判断趋势方向,可以有效捕捉突破操作机会
2. 加入长期移动平均线过滤,可以减少假突破带来的风险
3. 做多做空逻辑清晰,容易理解操作
4. 空头出场条件设定得比较严格,可以减少亏损

### 风险分析

1. 布林带与移动平均线发出交易信号时,可能会出现较大滑点
2. 空头条件过于严格,可能导致空头获利不高  
3. 参数设置不当可能导致交易频率过高或过低
4. 突破型策略容易形成巨大亏损

改进方法:
1. 优化布林带参数,降低交易频率
2. 设定止损点,避免单笔巨亏
3. 加入交易量指标过滤,确保突破有效性

### 总结

本策略整体来说较为简单易懂,使用布林带判定趋势,在转折点进行反向操作。同时加入长短期判断指标,可以有效过滤信号。策略优化空间还很大,适当调整参数,加入量能指标等可以进一步改进。

||

### Overview

This strategy uses the Bollinger Bands indicator to determine market trend direction, and takes counter-trend trades when trend reversal occurs. It goes long when price breaks below the lower band in an uptrend; and goes short when price breaks above the upper band in a downtrend. Also, a moving average is used as the benchmark for long-term trend to make the strategy more stable.

### Strategy Principle  

This strategy utilizes the middle band, upper band and lower band of Bollinger Bands to determine market trend direction. The middle band is the n-period exponential moving average, while the upper band and lower band are middle band +2.3 standard deviation and middle band -2.3 standard deviation respectively. When price breaks below the lower band, it indicates a current uptrend. When price breaks above the upper band, it indicates a current downtrend.

In addition, the strategy sets a 200-period simple moving average (sma) as the benchmark for long-term trend judgement. Trading signals are only triggered when BB and sma indicators agree on the same direction. This can effectively filter out some false breakouts.

The specific trading logic is as follows:

1. Determine uptrend: BB upper band > sma, middle band > sma, lower band >= sma
2. Determine downtrend: BB upper band < sma, middle band < sma, lower band <= sma
3. Long condition: Uptrend + Price breaks BB lower band
4. Exit condition: Price breaks BB upper band  
5. Short condition: Downtrend + Price breaks BB upper band 
6. Exit condition: Price breaks below BB middle band or rebounds back above the 230-period MA

### Advantage Analysis
  

1. BB judges trend direction effectively and captures breakout trading opportunities  
2. Adding long-term MA filter reduces risks associated with false breakouts
3. Clear long and short logic, easy to understand and follow
4. Strict criteria for short exit helps limit losses

### Risk Analysis

1. Potential large slippage when BB and MA issue trading signals
2. Overly strict short conditions lead to limited short side profit  
3. Improper parameter tuning can result in too high/low trading frequency
4. Breakout strategies prone to huge losses

Improvements:

1. Optimize BB parameters to reduce trading frequency  
2. Set stop loss to avoid huge losses per trade
3. Add volume filter to ensure breakout validity   

### Summary

Overall this is a simple and easy to understand strategy, using BB to determine trends and taking counter-trend trades at turning points. Adding short-term and benchmark indicators also helps filter signals. Still large room for optimizations, like parameter tuning, volume indicators etc. can further improve it.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|长度|
|v_input_float_1|2.3|标准差|
|v_input_int_2|200|趋势分界线|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-23 00:00:00
end: 2023-11-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Aayonga

//@version=5
strategy("布林趋势震荡单", overlay=true,initial_capital=10000,default_qty_type=strategy.fixed, default_qty_value=1 )
bollL=input.int(20,minval=1,title = "长度")
bollmult=input.float(2.3,minval=0,step=0.1,title = "标准差")
basis=ta.ema(close,bollL)
dev=bollmult*ta.stdev(close,bollL)
upper=basis+dev
lower=basis-dev
smaL=input.int(200,minval=1,step=1,title = "趋势分界线")
sma=ta.sma(close,smaL)
//多头趋势
longT=upper>sma and basis>sma and lower>=sma
//空头趋势
shortT=upper<sma and basis<sma and lower<=sma

//入场位
longE=ta.crossover(close,lower)
shortE=ta.crossover(close,upper)
//出场位

longEXIT=ta.crossover(high,upper) 
shortEXIT=ta.crossunder(close,basis) or ta.crossover(close,ta.sma(close,230)) 

if longT and longE
    strategy.entry("多",strategy.long)

if longEXIT
    strategy.close("多",comment = "多出场")

if shortE and shortT
    strategy.entry("空",strategy.short)

if shortEXIT
    strategy.close("空",comment = "空出场")
```

> Detail

https://www.fmz.com/strategy/432969

> Last Modified

2023-11-23 10:57:10
