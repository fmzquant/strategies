
> Name

RSI与布林线量化交易策略RSI-and-Bollinger-Bands-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1866d15489b3d4952f1.png)
[trans]

## 概述

本策略通过结合相对强弱指标(RSI)和布林线通道来识别交易机会,属于量化交易中的均值回复策略。当RSI低于设定阈值时买入,当价格上穿布林线通道中轨时平仓,没有做空机会。

## 策略原理  

1. 使用RSI指标判断市场是否处于超卖状态。RSI低于30时,被视为超卖信号。

2. 使用布林线通道判断价格是否开始反弹上行。当价格从布林线下轨反弹上穿布林线中轨时,做多方向结束。 

3. 结合RSI超卖信号和布林线出圈信号,可以设定买入点位。当两种信号同时触发时买入,等待价格上穿布林线中轨时平仓套现。

## 优势分析

1. 该策略结合均值反转型指标RSI和通道指标布林线,可以更准确定位买入时机。

2. RSI指标可以过滤掉许多假突破的情况,减少不必要的交易。

3. 布林线通道作为止损指标,可以控制单笔交易的风险。

## 风险分析  

1. RSI指标可能发出错误信号,导致错过买入机会。

2. 布林线通道参数设置不当可能导致止损过于宽松或严格。

3. 交易品种选择不当,如交易小市值股票时流动性风险较大。

## 优化方向

1. 可以测试不同参数组合,如RSI周期、布林线通道周期和倍数,寻找最优参数。 

2. 可以结合其他指标如KD、MACD等,设定更严格的买入条件以过滤信号。

3. 可以根据不同交易品种设定止损幅度,如设置波动率止损。

## 总结

本策略首先利用RSI低位买入,再利用布林线通道高位止损的思路,属于均值回复交易策略。相比单一使用RSI或布林线等指标,本策略可以更准确定位买入卖出点位,从而获得更好的策略效果。下一步可以通过参数优化、信号过滤、止损策略等进一步完善。

||

## Overview

This strategy combines Relative Strength Index (RSI) and Bollinger Bands to identify trading opportunities, belonging to mean reversion strategies in quantitative trading. It buys when RSI is below a threshold and closes position when price breaks above the middle band of Bollinger Bands. There is no shorting opportunity.

## Strategy Logic   

1. Use RSI indicator to judge if the market is oversold. RSI below 30 is considered an oversold signal.  

2. Use Bollinger Bands to determine if price starts rebounding upward. When price bounces from the lower band and breaks above the middle band, the long direction ends.

3. Combine the RSI oversold signal and Bollinger Bands breakout signal to set buy entry points. Buy when both signals trigger and close position when price breaks above the middle band to take profit.

## Advantage Analysis   

1. The strategy combines mean reversion indicator RSI and channel indicator Bollinger Bands to locate entry points more precisely. 

2. The RSI indicator can filter out many false breakouts and reduce unnecessary trades.

3. The Bollinger Bands acts as a stop loss to control the risk of each trade.  

## Risk Analysis

1. RSI indicator may give wrong signals, leading to missing buy opportunities.  

2. Improper parameter settings of Bollinger Bands can result in stop loss being too loose or strict.

3. Choosing improper trading instruments, such as trading small cap stocks with higher liquidity risk.

## Optimization Direction  

1. Test different parameter combinations like RSI period, Bollinger period and multiplier to find optimum parameters.

2. Incorporate other indicators like KD, MACD to set more strict buy conditions to filter signals. 

3. Set stop loss based on volatility for different trading instruments, such as using volatility stop loss.

## Conclusion  

This strategy utilizes the logic of buying at RSI lows and selling at Bollinger highs, belonging to mean reversion strategies. Compared to using single indicators like RSI or Bollinger Bands, this strategy can locate entry and exit points more precisely, thus achieving better results. Next steps could be improving through parameter optimization, signal filtering, stop loss strategies etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Lot, %|
|v_input_2|true|Use RSI|
|v_input_3|true|Use BB|
|v_input_4|true|Show BB Overlay|
|v_input_5|20|BB period|
|v_input_6_ohlc4|0|BB source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_7|2|BB Mult|
|v_input_8|7|RSI period|
|v_input_9_close|0|RSI source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|30|RSI Limit|
|v_input_11|1900|From Year|
|v_input_12|2100|To Year|
|v_input_13|true|From Month|
|v_input_14|12|To Month|
|v_input_15|true|From Day|
|v_input_16|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-08 00:00:00
end: 2024-01-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy(title = "Noro's BB + RSI Strategy v1.0", shorttitle = "BB+RSI str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 5)

//Settings
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot, %")
rsiuse = input(true, defval = true, title = "Use RSI")
bbuse = input(true, defval = true, title = "Use BB")
showbb = input(true, defval = true, title = "Show BB Overlay")
bbperiod = input(20, defval = 20, minval = 2, maxval = 1000, title = "BB period")
bbsource = input(ohlc4, title = "BB source")
bbmult = input(2, defval = 2, minval = 1, maxval = 100, title = "BB Mult")
rsiperiod = input(7, defval = 7, minval = 2, maxval = 1000, title = "RSI period")
rsisource = input(close, title = "RSI source")
rsilimit = input(30, defval = 30, minval = 1, maxval = 49, title = "RSI Limit")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From Day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To Day")

//RSI
rsi = rsi(rsisource, rsiperiod)

//BB
basis = sma(bbsource, bbperiod)
dev = bbmult * stdev(bbsource, bbperiod)
upper = basis + dev
lower = basis - dev

//Overlay
col = showbb ? blue : na
plot(upper, color = col)
plot(basis, color = col)
plot(lower, color = col)

//Signals
up = (rsi < rsilimit or rsiuse == false) and (low < lower or bbuse == false)
cl = close > open

//Trading
lot = 0.0 
lot := strategy.position_size == 0 ? strategy.equity / close * capital / 100 : lot[1]
if up
    strategy.entry("Long", strategy.long, lot)
if cl
    strategy.entry("Close", strategy.short, 0)
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/438007

> Last Modified

2024-01-08 10:16:22
