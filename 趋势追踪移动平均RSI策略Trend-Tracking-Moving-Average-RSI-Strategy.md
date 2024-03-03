
> Name

趋势追踪移动平均RSI策略Trend-Tracking-Moving-Average-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d7f34bf091a108b7bc.png)
[trans]

## 概述

趋势追踪移动平均RSI策略是一种同时利用趋势分析和超买超卖指标的股票自动交易策略。该策略运用简单移动平均线判断市场趋势方向,并结合相对强弱指数(RSI)指标发出交易信号,实现对趋势的判断与跟踪。

## 策略原理  

该策略主要由三部分组成:

1. 趋势判断:计算长期趋势的200日简单移动平均线,计算短期趋势的30日和50日简单移动平均线。当短期移动平均线上穿长期移动平均线时为看涨信号,下穿为看跌信号,判断市场长短期趋势。  

2. 超买超卖判断:计算14日RSI指标,RSI高于80为超买区,低于20为超卖区。当RSI指标从超买区下跌或从超卖区上涨时,发出交易信号。   

3. 入场与出场:当判断到超买超卖信号时,如果与趋势判断的信号方向一致,则入场做多/空。当短期与长期移动平均线发生黄金交叉时,判断趋势反转,此时平仓离场。

通过该策略,可以在股票价格出现反转时及时入场,同时结合趋势判断过滤掉部分噪音交易,在回撤控制方面相对比较优秀。

## 优势分析

该策略具有以下几点优势:

1. 结合趋势判断和超买超卖指标,过滤噪音,识别行情反转点。
2. 同时考量长短期两个时间段内的趋势方向,判断更为准确。  
3. 采用移动平均线作为止损方式,可以根据市场波动程度来设定止损点。
4. 入场条件严格,可以有效避免假突破。

## 风险及解决方法

该策略也存在一些风险:  

1. 如果行情出现长期震荡,将打开大量无效交易。解决方法是加入更多过滤条件,避免无谓交易。
2. 存在一定的时间滞后风险。解决方法是适当缩短移动平均线的周期参数。
3. RSI指标发出信号的效果会受到股票和市场的影响。解决方法是结合K线形态等更多因素判断效果。

## 优化方向  

该策略还可从以下几个方面进行优化:

1. 加入更多滤波条件,如成交量,K线形态等,进一步提升信号的有效性。  
2. 优化移动平均线和RSI的参数周期,使其更符合不同股票的特征。
3. 建立动态移动平均线,根据市场波动性和风险偏好自动调整参数。
4. 采用机器学习等更为先进的技术判断行情趋势,提高判断准确率。

## 总结  

趋势追踪移动平均RSI策略总体来说是一个非常实用的策略思路,同时结合趋势分析和超买超卖指标,在一定程度上过滤了市场噪音,使交易信号更加准确有效。通过不断优化手段和参数,该策略可以成为一个稳定盈利的长期交易系统。

||

## Overview  

The Trend Tracking Moving Average RSI strategy is an automated stock trading strategy that utilizes both trend analysis and overbought-oversold indicators. The strategy employs simple moving averages to determine market trend direction and combines Relative Strength Index (RSI) indicators to generate trading signals, realizing trend judgment and tracking.

## Strategy Logic

The strategy consists of three main parts:

1. Trend judgment: Calculates the long-term trend with 200-day simple moving average, and the short-term trend with 30-day and 50-day simple moving averages. When the short-term moving average crosses over the long-term one, it is a bullish signal, and when it crosses below, it's a bearish signal, to determine long-term and short-term market trends.

2. Overbought-Oversold Analysis: Calculates the 14-day RSI indicator. RSI above 80 is the overbought zone and below 20 is the oversold zone. Trading signals are generated when the RSI indicator drops from the overbought zone or rises from the oversold zone.  

3. Entry and Exit: When overbought or oversold signals are identified, if the direction is consistent with the trend analysis, long/short positions will be opened. When short-term and long-term moving averages have golden crosses, it is judged that trends are reversing and existing positions will be closed.

With this strategy, it is possible to enter the market timely when prices reverse, while filtering out some noisy trades by incorporating trend analysis, with relatively excellent drawdown control.

## Advantage Analysis 

The strategy has the following advantages:

1. Combining trend analysis and overbought-oversold indicators to filter out noise and identify turns in the market.
2. Considering trends in both long-term and short-term timeframes for more accurate judgments.   
3. Using moving averages as stop loss methods so that stop loss points can be set based on market volatility.  
4. Strict entry conditions help avoid false breakouts effectively.

## Risks and Solutions

There are also some risks with this strategy:   

1. Frequent insignificant trades may occur if the market stays range-bound for a prolonged time. Additional filters can be added to avoid unnecessary trades.
2. There is some time lag risk. Shortening moving average cycle parameters can mitigate it.  
3. RSI signals can be influenced by stocks and markets. More factors like candlestick patterns should be combined to judge the effectiveness.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Adding more filters like volume, candlestick patterns to further improve signal quality.   
2. Optimizing moving average and RSI cycle parameters to match different stock characteristics.  
3. Building dynamic moving averages to automatically adjust parameters based on market volatility and risk appetite.  
4. Using more advanced techniques like machine learning to determine market trends with higher accuracy.

## Summary   

In general, the Trend Tracking Moving Average RSI Strategy is a very practical strategy idea, filtering out market noise to some extent by combining trend analysis and overbought-oversold indicators, making trading signals more accurate and valid. As optimization tools and parameters continue to be enhanced, this strategy can become a steadily profitable long-term trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Length|
|v_input_2_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_3|3000|maxLoss|
|v_input_4|200|trendMA|
|v_input_5|30|shortMA|
|v_input_6|50|longMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-16 00:00:00
end: 2023-11-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mattehalen

// INPUT per TIMEFRAME
// 5min     = Legnth = 9, Source = ohlc4,MaxLoss = 1000 TrendMA = 200, ShortMA = 4, LongMA = 10
// 30min    = Legnth = 7, Source = ohlc4,MaxLoss = 1000 TrendMA = 200, ShortMA = 10, LongMA = 20

strategy("Mathias & Christer Timeframe RSI", shorttitle="M&C_RSI",overlay=true, process_orders_on_close = true, default_qty_type =  strategy.percent_of_equity, default_qty_value = 100)
len = input(9, title="Length", type=input.integer)
src = input(ohlc4, title="Source", type=input.source)
//show4h = input(true, title="show 4h", type=input.bool)
maxLoss = input(3000)

rsiCurrent = rsi(src, len)
//rsi4h = security(syminfo.ticker, "240", rsi(src, len))
rsi4h   = rsi(src, len)

//--------------------------------------------------
//MA
trendMAInput = input(200, title="trendMA", type=input.integer)
shortMAInput = input(30, title="shortMA", type=input.integer)
longMAInput = input(50, title="longMA", type=input.integer)

trendMA = ema(close,trendMAInput)
shortMA = ema(close,shortMAInput)
longMA  = ema(close,longMAInput)
plot(trendMA, color=color.black, linewidth=5)
plot(shortMA, color=color.red, linewidth=2)
plot(longMA, color=color.green, linewidth=2)
bgcolor(crossunder(shortMA,longMA) ? color.black : na, transp=10)

//--------------------------------------------------
//RSI
BuySignalBarssince = barssince(rsi4h[1]<rsi4h[0] and rsi4h[1]<20)
BuySignal       = (rsi4h[1]<rsi4h[0] and rsi4h[1]<20 and BuySignalBarssince[1]>10)
BuySignalOut   = crossunder(longMA[1],shortMA[1])
bgcolor(BuySignal ? color.green : na, transp=70)
bgcolor(BuySignalOut ? color.green : na, transp=10)



SellSignalBarssince = barssince(rsi4h[1]>rsi4h[0] and rsi4h[1]>80)
SellSignal      = (rsi4h[1]>rsi4h[0] and rsi4h[1]>80 and SellSignalBarssince[1]>10)
SellSignalOut   = crossunder(shortMA[1],longMA[1])
bgcolor(SellSignal ? color.red : na, transp=70)
bgcolor(SellSignalOut ? color.red : na, transp=10)


if BuySignal
    strategy.close("short", comment = "Exit short")
    strategy.entry("long", true)
    strategy.exit("Max Loss", "long", loss = maxLoss)

if BuySignalOut
    strategy.close("long", comment = "Exit Long")
if SellSignal
    // Enter trade and issue exit order on max loss.
    strategy.close("long", comment = "Exit Long")
    strategy.entry("short", false)
    strategy.exit("Max Loss", "short", loss = maxLoss)
if SellSignalOut
    // Force trade exit.
    strategy.close("short", comment = "Exit short")
    
//--------------------------------------------------
//ATR
MyAtr = atr(10)
AtrFactor = 10
mySLBuy  = close[BuySignalBarssince]
mySLSell = close[SellSignalBarssince]

plotchar(BuySignal, "BuySignal", "⬆", location.belowbar, color.lime,size =size.huge )
plotchar(BuySignalOut, "BuySignalOut", "█", location.belowbar, color.lime,size =size.small)
plotchar(SellSignal, "SellSignal", "⬇", location.abovebar ,color.red,size =size.huge)
plotchar(SellSignalOut, "SellSignalOut", "█", location.abovebar, color.red,size =size.small)



```

> Detail

https://www.fmz.com/strategy/433026

> Last Modified

2023-11-23 17:13:06
