
> Name

动量指标驱动的趋势跟踪交易策略Momentum-Indicator-Driven-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f3365a0b6328506795.png)
[trans]

## 概述

本策略基于动量指标RSI和价格的Exponential Moving Average(EMA)以及Simple Moving Average(SMA)构建交易信号。它属于趋势跟踪类型的策略。

## 策略原理

该策略使用3个条件来产生交易信号:

1. RSI > 45: RSI值大于45视为好的买入信号
2. EMA(RSI) > SMA(RSI): EMA线大于SMA线表示RSI正在加速向上,属于好的动量信号
3. EMA(收盘价) > SMA(收盘价): EMA线大于SMA线表示价格趋势正在加速向上

满足以上3个条件中任意2个,则产生买入信号;如果全部不满足,则产生卖出信号。

该策略同时提供了“总是买入”模式,用于测试系统本身相对大盘的表现。

## 策略优势分析

1. 使用动量指标RSI判断市场态势,可以减少交易市场震荡期的头寸
2. 结合EMA和SMA判断趋势方向,可以及时捕捉价格变化趋势
3. 条件规则简单清晰,容易理解和优化
4. 提供“总是买入”模式检验系统优势

## 策略风险分析 

1. 依赖参数设置,参数不当将导致交易频繁或错过良好交易机会
2. 大盘遇到重大消息时,短期价格可能出现巨幅波动,将导致止损
3. 策略本身无法判断趋势即将反转的时机,需要配合其他指标判断

## 优化方向

1. 优化RSI,EMA和SMA的参数,找到最佳参数组合
2. 增加Volume,MACD等其他技术指标判断规则
3. 增加趋势反转判断指标,降低亏损概率

## 总结

本策略整体来说属于中频交易策略,旨在捕捉中期价格趋势,而避开短期市场震荡,其优势和风险点都较为明显。通过参数优化和规则丰富,可以进一步增强策略稳定性,是值得深入研究和优化的高效率量化交易策略。

|| 

## Overview

This strategy builds trading signals based on momentum indicator RSI and price's Exponential Moving Average (EMA) and Simple Moving Average (SMA). It belongs to the trend following type of strategies.  

## Strategy Principle

The strategy uses 3 conditions to generate trading signals:

1. RSI > 45: RSI value greater than 45 is considered a good buy signal  
2. EMA(RSI) > SMA(RSI): EMA line greater than SMA line indicates RSI is accelerating upwards, which is a good momentum signal
3. EMA(close) > SMA(close): EMA line greater than SMA line indicates the price trend is accelerating upwards

Meeting any 2 of the above 3 conditions generates a buy signal; if none is met, a sell signal is generated.  

The strategy also provides an "always buy" mode for testing the system's performance relative to the broad market.

## Advantage Analysis

1. Using momentum indicator RSI to judge market conditions can reduce positions during market fluctuations
2. Combining EMA and SMA to determine trend direction can timely capture price change trends  
3. Simple and clear conditional rules, easy to understand and optimize
4. Provides "always buy" mode to test system advantages

## Risk Analysis

1. Relies on parameter settings, improper parameters will lead to frequent trading or miss good trading opportunities
2. Major news in the broad market can cause huge volatility in the short term, which will lead to stop loss
3. The strategy itself cannot judge when a trend is about to reverse, other indicators need to be used to determine

## Optimization Directions  

1. Optimize parameters of RSI, EMA and SMA to find best parameter combination
2. Increase other technical indicators like Volume, MACD etc. to enrich rule conditions
3. Increase trend reversal indicators to reduce probability of losses

## Conclusion

In summary, this strategy belongs to a medium-frequency trading strategy that aims to capture mid-term price trends while avoiding short-term market fluctuations. Its advantages and risk points are quite obvious. Further enhancing stability through parameter optimization and enriching rules makes it a worthwhile high-efficiency quantitative trading strategy to research and optimize.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|Unitrend|Trading Mode|
|v_input_bool_1|false|compoundingMode|
|v_input_float_1|true|leverage|
|v_input_float_2|true|Risk Capital per Trade unleveraged (%)|
|v_input_float_3|2|TPFactor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("I11L Unitrend",overlay=false, initial_capital=1000000,default_qty_value=1000000,default_qty_type=strategy.cash,commission_type=strategy.commission.percent,commission_value=0.00)
tradingMode = input.string("Unitrend", "Trading Mode", ["Unitrend", "Always Buy"], tooltip="Choose the Trading Mode by trying Both in your Backtesting. I use it if one is far better then the other one.")
compoundingMode = input.bool(false)
leverage = input.float(1.0,step=0.1)
SL_Factor = 1 - input.float(1,"Risk Capital per Trade unleveraged (%)", minval=0.1, maxval=100, step=0.1) / 100
TPFactor = input.float(2, step=0.1)




var disableAdditionalBuysThisDay = false
var lastTrade = time
if(time > lastTrade + 1000 * 60 * 60 * 8 or tradingMode == "Always Buy")
    disableAdditionalBuysThisDay := false

if(strategy.position_size != strategy.position_size[1])
    lastTrade := time
    disableAdditionalBuysThisDay := true

//Trade Logic
SCORE = 0

//rsi momentum
RSIFast = ta.ema(ta.rsi(close,50),24)
RSISlow = ta.sma(ta.rsi(close,50),24)
RSIMomentum = RSIFast / RSISlow
goodRSIMomentum = RSIMomentum > 1
SCORE := goodRSIMomentum ? SCORE + 1 : SCORE

//rsi trend
RSITrend = RSISlow / 45
goodRSI = RSITrend > 1
SCORE := goodRSI ? SCORE + 1 : SCORE

//price trend
normalTrend = ta.ema(close,50) / ta.sma(close,50)
goodTrend = normalTrend > 1
SCORE := goodTrend ? SCORE + 1 : SCORE



isBuy =  SCORE > 1 or tradingMode == "Always Buy"
isSell = false //SCORE == 0

//plot(SCORE, color=isBuy ? color.green : #ffffff88)
//reduced some of the values just for illustrative purposes, you can buy after the signal if the trendlines seem to grow
plot(1, color=isBuy ? #77ff7733 : SCORE == 2 ? #ffff0033 : SCORE == 1 ? #ff888833 : #ff000033,linewidth=10)
plot(1 - (1 - RSIMomentum) * 6,color=#00F569)
plot(1 - (1 - RSITrend) * 0.25,color=#00DB9B)
plot(1 - (1 - normalTrend) * 20,color=#00F5EE)


strategy.initial_capital = 50000
if(isBuy and not(disableAdditionalBuysThisDay))
    if(compoundingMode)
        strategy.entry("Long", strategy.long, (strategy.equity / close) * leverage)
    else
        strategy.entry("Long", strategy.long, (strategy.initial_capital / close) * leverage)


if(strategy.position_size != 0)
    strategy.exit("TP/SL Long", "Long", stop=strategy.position_avg_price * (1 - (1 - SL_Factor)), limit=strategy.position_avg_price * (1 + (1 - SL_Factor) * TPFactor))



```

> Detail

https://www.fmz.com/strategy/435124

> Last Modified

2023-12-12 14:52:11
