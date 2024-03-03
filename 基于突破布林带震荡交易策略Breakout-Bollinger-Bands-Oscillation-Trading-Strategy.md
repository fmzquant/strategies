
> Name

基于突破布林带震荡交易策略Breakout-Bollinger-Bands-Oscillation-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/171b53b9bdd0d72ff94.png)
[trans]

## 概述

突破布林带震荡交易策略是一种当市场处于震荡状态时的交易策略。该策略利用布林带指标判断市场的震荡状况,在价格触碰布林带上下轨时发出交易信号。与传统趋势跟随策略不同,该策略更适用于横盘整理的市场环境。

## 策略原理  

该策略主要基于布林带指标实现。布林带由中轨、上轨和下轨组成。当价格接近上轨或下轨时,代表着市场过度看涨或看跌,这时就有较大概率发生反转。

具体来说,该策略首先利用DMI指标判断市场是否处于震荡状态。当+DMI和-DMI的差值小于20时,认为市场处于横盘震荡。在此条件下,当价格上穿下轨时做多,当价格下破上轨时做空。止损点设在相反轨道附近。

## 策略优势  

相对于趋势跟随策略,该策略更适合横盘震荡的市场环境,不会因追逐趋势而息损。与传统震荡交易策略相比,该策略利用布林带指标能更准确判断市场的超买超卖情况,从而提高入场的概率。

## 策略风险 

该策略主要依赖布林带判断市场震荡和超买超卖情况,当布林带发散或收缩失常时,会导致错误信号。此外,止损点靠近,单笔止损可能较大。建议采用资金管理优化止损策略。

## 策略优化方向

可以考虑结合其他指标过滤入场信号,例如RSI等震荡指标,提高入场准确率。此外,优化止损策略也很重要,避免单笔较大止损。还可以选择更适合该策略的交易品种,例如低市值币。

## 总结  

该策略整体来说适合震荡市场,可以在趋势策略失效时使用。但其依赖指标判断市场状态的效果仍有优化空间。我们可以通过多指标组合、资金管理等方法进一步完善该策略,使其效果更加稳定优异。

||

## Overview

The Breakout Bollinger Bands Oscillation Trading Strategy is a trading strategy for when the market is in an oscillating state. This strategy uses the Bollinger Bands indicator to judge the oscillating condition of the market and sends out trading signals when the price touches the upper or lower rails of the Bollinger Bands. Unlike traditional trend following strategies, this strategy is more suitable for range-bound sideways markets.

## Strategy Logic

This strategy is mainly implemented based on the Bollinger Bands indicator. Bollinger Bands consist of a middle rail, upper rail and lower rail. When the price approaches the upper or lower rail, it represents over-optimism or over-pessimism in the market, which means a relatively high probability of reversal.

Specifically, this strategy first uses the DMI indicator to determine if the market is in an oscillating state. When the difference between +DMI and -DMI is less than 20, the market is considered to be ranging sideways. Under this condition, go long when the price breaks above the lower rail, and go short when the price breaks below the upper rail. The stop loss point is set near the opposite rail.

## Advantages

Compared with trend following strategies, this strategy is more suitable for range-bound market environments and will not lose money chasing trends. Compared with traditional oscillation trading strategies, this strategy can more accurately judge the overbought and oversold situations in the market by using the Bollinger Bands indicator, thus improving the probability of entering the market.

## Risks

This strategy mainly relies on Bollinger Bands to determine market oscillation and overbought/oversold conditions. When Bollinger Bands diverge or contract abnormally, it may lead to wrong signals. In addition, the stop loss point is close, so a single stop loss could be relatively large. It is recommended to optimize the stop loss strategy with money management.

## Optimization

We can consider combining other indicators to filter entry signals, such as RSI and other oscillators, to improve entry accuracy. In addition, optimizing the stop loss strategy is also very important to avoid a single large stop loss. We can also choose trading varieties that are more suitable for this strategy, such as low market cap coins.

## Conclusion  

In general, this strategy is suitable for oscillating markets and can be used when trend strategies fail. But there is still room for improving its effectiveness by judging market states with indicators. We can further improve this strategy by methods like multi-indicator combos, money management, etc. to make it more stable and profitable.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2021|From Year|
|v_input_4|12|Thru Month|
|v_input_5|31|Thru Day|
|v_input_6|2022|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|20|lengthBB|
|v_input_9_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|2|StdDev|
|v_input_11|false|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(shorttitle='Sideways Strategy DMI + Bollinger Bands',title='Sideways Strategy DMI + Bollinger Bands (by Coinrule)', overlay=true, initial_capital = 100, process_orders_on_close=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type=strategy.commission.percent, commission_value=0.1)

// Works on ETHUSD 3h, 1h, 2h, 4h

//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2021, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 12,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 31,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2022, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true

[pos_dm, neg_dm, adx] = dmi(14, 14)


lengthBB = input(20, minval=1)
src = input(close, title="Source")
mult = input(2.0, minval=0.001, maxval=50, title="StdDev")
basis = sma(src, lengthBB)
dev = mult * stdev(src, lengthBB)
upper = basis + dev
lower = basis - dev
offset = input(0, "Offset", type = input.integer, minval = -500, maxval = 500)

sideways = (abs(pos_dm - neg_dm) < 20)



//Stop_loss= ((input (3))/100)
//Take_profit= ((input (2))/100)

//longStopPrice  = strategy.position_avg_price * (1 - Stop_loss)
//longTakeProfit = strategy.position_avg_price * (1 + Take_profit)

//closeLong = close < longStopPrice or close > longTakeProfit or StopRSI


//Entry 
strategy.entry(id="long", long = true, when = sideways and (crossover(close, lower)) and window())


//Exit
strategy.close("long", when = (crossunder(close, upper)))

```

> Detail

https://www.fmz.com/strategy/442375

> Last Modified

2024-02-21 14:39:14
