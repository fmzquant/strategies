
> Name

趋势反转型跨时间幅特异波动率交易策略Trend-Reversal-with-Intrabar-Volatility-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/eb5f0000756bccc664.png)
[trans]
## 概述

本策略通过计算不同时间窗口内的成交量买卖压力差异,结合MACD指标的多空信号,设计了一套趋势反转型的交易策略。该策略主要利用成交量的异动作为判断趋势反转的信号,并通过MACD的多空信号进行验证,从而捕捉反转机会。

## 策略原理

该策略的核心逻辑基于以下几点:

1. 计算不同时间窗口(长短窗口)内的成交量买入压力和卖出压力。通过买卖压力的差异判断未来趋势方向。

2. 利用MACD的差值(MACD线与信号线的差距)判断多空状态。结合成交量的买卖压力信号,验证趋势反转。

3. 当成交量买入压力异动放大,且MACD线发生穿越时,认为行情可能出现由空转多的趋势反转。

4. 当成交量卖出压力异动放大,且MACD线发生穿越时,认为行情可能出现由多转空的趋势反转。

5. 进入反转信号后,利用止盈止损策略控制风险。

## 优势分析

该策略具有以下几点优势:

1. 利用成交量的多空差异判断趋势反转点,避免单纯依赖均线等趋势判断指标而忽略成交量的作用。

2. 结合MACD指标的多空信号验证反转,可以提高判断的准确性。

3. 运用长短时间窗口判断成交量的异动方向,使反转信号更加可靠。

4. 反转型策略的平均盈利率较高。

## 风险分析

该策略也存在以下风险:

1. 成交量和MACD信号都可能发出错误信号,从而导致反转判断失误的风险。

2. 反转信号发出后,行情可能再次调整,无法直接反转的风险。

3. 止盈止损点设定不当,可能导致亏损扩大的风险。

4. 回撤率较高,不适合追求稳定收益的投资者。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化长短时间窗口的区间,使反转判断更加精确。

2. 优化MACD参数,提高多空判断的准确性。

3. 优化止盈止损算法,降低亏损风险。

4. 增加更多异动判断指标,提高反转成功率。

5. 增加仓位控制和资金管理模块。

## 总结

本策略总体来说是一个典型的趋势反转型算法交易策略。它主要依靠成交量的异动放大与MACD信号的验证,判断并捕捉价格从多头进入空头或者从空头转向多头的反转机会。该策略具有判断准确率较高,收益率较好的优点,但也存在一定的风险。通过参数优化与功能扩展,可以使该策略的表现更加出色。

||

# Overview

This strategy calculates the buying and selling pressure differences in transaction volume across different time windows, combined with MACD signals, to design a trend reversal trading strategy. It mainly utilizes anomalies in transaction volume as a signal to judge trend reversals, and verifies it with MACD buy and sell signals, thereby capturing reversal opportunities.

## Strategy Principles 

The core logic of this strategy is based on the following points:

1. Calculate the buying pressure and selling pressure of transaction volume in different time windows (short and long windows). Judge the future trend direction based on the differences in buying and selling pressure.

2. Use the difference value of MACD (the difference between the MACD line and signal line) to determine the long and short status. Combine with the buying and selling pressure signals in transaction volume to verify trend reversals.

3. When the buying pressure anomaly of transaction volume amplifies and the MACD line crosses, it is determined that the market may have a trend reversal from sell to buy.

4. When the selling pressure anomaly of transaction volume amplifies and the MACD line crosses, it is determined that the market may have a trend reversal from buy to sell.

5. After entering the reversal signal, use take profit and stop loss strategies to control risks.


## Advantage Analysis 

The advantages of this strategy include:

1. Using the long/short differences in transaction volume to determine trend reversal points avoids solely relying on trend determination indicators like moving averages while neglecting the role of transaction volume.

2. Combining MACD signals to verify reversals can improve judgment accuracy.

3. Using long and short time windows to determine anomalies in transaction volume makes reversal signals more reliable. 

4. Reversal strategies tend to have higher average profit rates.


## Risk Analysis

The risks of this strategy include:

1. Transaction volume and MACD signals may give false signals, leading to wrong judgements on reversals. 

2. After reversal signals trigger, the market may adjust again and fail to directly reverse immediately.

3. Improper take profit and stop loss setting may lead to enlarging losses.

4. Higher drawdowns, unsuitable for investors pursuing stable returns.


## Optimization Directions

Optimizations for this strategy include:

1. Optimize long and short time windows to make reversal judgements more precise.  

2. Optimize MACD parameters to improve long/short accuracy.

3. Optimize take profit and stop loss algorithms to reduce loss risks.  

4. Add more anomaly judgement indicators to improve reversal success rate.

5. Add position sizing and money management modules.


## Conclusion

In summary, this is a typical trend reversal algorithmic trading strategy. It mainly relies on amplifications in transaction volume anomalies and MACD signal verifications to determine and capture price reversals from long to short positions or vice versa. The strategy has the advantages of high accuracy and good returns but also has certain risks. Further optimizations on parameters and functionality can make the strategy perform even better.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.26|Signal Bias|
|v_input_2|0.8|MACD Bias|
|v_input_3|3|Short LookBack|
|v_input_4|10|Long LookBack|
|v_input_5|0.75|Take Profit|
|v_input_6|0.5|Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-26 00:00:00
end: 2024-02-25 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("3 10 Oscillator Profile Flagging", shorttitle="3 10 Oscillator Profile Flagging", overlay=false)

signalBiasValue = input(title="Signal Bias", defval=0.26)
macdBiasValue = input(title="MACD Bias", defval=0.8)
shortLookBack = input( title="Short LookBack", defval=3)
longLookBack = input( title="Long LookBack", defval=10)
takeProfit = input( title="Take Profit", defval=0.75)
stopLoss = input( title="Stop Loss", defval=0.5)

fast_ma = ta.sma(close, 3)
slow_ma = ta.sma(close, 10)
macd = fast_ma - slow_ma
signal = ta.sma(macd, 16)
hline(0, "Zero Line", color = color.black)

buyVolume = volume*((close-low)/(high-low))
sellVolume = volume*((high-close)/(high-low))
buyVolSlope = buyVolume - buyVolume[1]
sellVolSlope = sellVolume - sellVolume[1]
signalSlope = ( signal - signal[1] )
macdSlope = ( macd - macd[1] )
plot(macd, color=color.blue, title="Total Volume")
plot(signal, color=color.orange, title="Total Volume")
intrabarRange = high - low

getLookBackSlope(lookBack) => signal - signal[lookBack]
getBuyerVolBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if buyVolume[i] > sellVolume[i]
            j += 1
    j

getSellerVolBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if sellVolume[i] > buyVolume[i]
            j += 1
    j

getVolBias(lookBack) =>
    float b = 0
    float s = 0
    for i = 1 to lookBack
        b += buyVolume[i]
        s += sellVolume[i]
    b > s

getSignalBuyerBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if signal[i] > signalBiasValue
            j += 1
    j

getSignalSellerBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if signal[i] < ( 0 - signalBiasValue )
            j += 1
    j

getSignalNoBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if signal[i] < signalBiasValue and signal[i] > ( 0 - signalBiasValue )
            j += 1
    j

getPriceRising(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if close[i] > close[i + 1]
            j += 1
    j


getPriceFalling(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if close[i] < close[i + 1] 
            j += 1
    j

getRangeNarrowing(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if intrabarRange[i] < intrabarRange[i + 1] 
            j+= 1
    j

getRangeBroadening(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if intrabarRange[i] > intrabarRange[i + 1] 
            j+= 1
    j

bool isNegativeSignalReversal = signalSlope < 0 and signalSlope[1] > 0
bool isNegativeMacdReversal = macdSlope < 0 and macdSlope[1] > 0

bool isPositiveSignalReversal = signalSlope > 0 and signalSlope[1] < 0
bool isPositiveMacdReversal = macdSlope > 0 and macdSlope[1] < 0

bool hasBearInversion = signalSlope > 0 and macdSlope < 0
bool hasBullInversion = signalSlope < 0 and macdSlope > 0

bool hasSignalBias = math.abs(signal) >= signalBiasValue
bool hasNoSignalBias = signal < signalBiasValue and signal > ( 0 - signalBiasValue )

bool hasSignalBuyerBias = hasSignalBias and signal > 0
bool hasSignalSellerBias = hasSignalBias and signal < 0

bool hasPositiveMACDBias = macd > macdBiasValue
bool hasNegativeMACDBias = macd < ( 0 - macdBiasValue )

bool hasBullAntiPattern = ta.crossunder(macd, signal)
bool hasBearAntiPattern = ta.crossover(macd, signal)

bool hasSignificantBuyerVolBias = buyVolume > ( sellVolume * 1.5 )
bool hasSignificantSellerVolBias = sellVolume > ( buyVolume * 1.5 )

// 7.48 Profit 52.5% 
if ( hasSignificantBuyerVolBias and getPriceRising(shortLookBack) == shortLookBack  and getBuyerVolBias(shortLookBack) == shortLookBack and hasPositiveMACDBias and hasBullInversion)
    strategy.entry("Short1", strategy.short, qty=10)
strategy.exit("TPS", "Short1", limit=strategy.position_avg_price - takeProfit, stop=strategy.position_avg_price + stopLoss)

// 32.53 Profit 47.91%
if ( getPriceFalling(shortLookBack) and (getVolBias(shortLookBack) == false) and signalSlope < 0 and hasSignalSellerBias)
    strategy.entry("Long1", strategy.long, qty=10)
strategy.exit("TPS", "Long1", limit=strategy.position_avg_price + takeProfit, stop=strategy.position_avg_price - stopLoss)
```

> Detail

https://www.fmz.com/strategy/442866

> Last Modified

2024-02-26 17:15:54
