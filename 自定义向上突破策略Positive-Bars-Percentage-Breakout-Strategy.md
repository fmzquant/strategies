
> Name

自定义向上突破策略Positive-Bars-Percentage-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/127d7202a6b82baba28.png)
[trans]
## 概述

自定义向上突破策略是一种基于价格行情判断的量化交易策略。该策略通过计算指定周期内的正向K线占比,来判断市场目前是否处于持续上涨的状态。当正向K线占比高于用户设定的上限时,策略判断目前处于上涨行情,此时做多;当正向K线占比低于用户设定的下限时,策略判断目前处于下跌行情,此时做空。

## 策略原理

该策略的核心指标是正向K线占比。正向K线指从低点开盘,收盘价高于开盘价的K线,表示该周期内价格上涨。策略通过统计用户指定的往期周期内,正向K线数量占所有K线的比例,当比例大于上限时判断目前处于持续上涨行情,此时做多;当比例小于下限时判断目前处于持续下跌行情,此时做空。做多做空的止损、止盈根据用户设定的止损方式来设置。

举例:用户设置周期数为20,上限为70,下限为30。策略回溯最近20根K线,如果其中有16根为正向K线,占比为16/20=80%。此时高于用户设置的上限70,执行做多操作。如果最近20根K线中,只有5根为正向K线,占比为5/20=25%。低于用户设置的下限30,执行做空操作。

## 优势分析

该策略具有如下优势:

1. 策略思路简单直观,容易理解;
2. 仅需要一个指标,降低了过优化的风险; 
3. 用户可以自定义参数,适应不同品种;
4. 内置止损止盈功能,可以预防超大亏损;
5. 可直接反向做单,无需等待平仓再开仓,追踪行情更快。

## 风险分析

该策略也存在一些风险:  

1. 只利用一个指标容易产生错误信号;
2. 指标参数容易过优化,实盘效果可能差异大;
3. 行情剧烈波动时,止损可能被突破导致亏损;
4. 反向开仓功能可能加大亏损;
5. 效果与品种相关性大,需要分别测试。

为了降低风险,可以从以下几个方面进行优化:

1. 增加过滤条件,避免错误信号;
2. 优化止损策略,缩小单笔亏损;
3. 评估和控制单笔损失额度; 
4. 分别在不同品种测试效果。

## 优化方向  

该策略可以从以下几个方向进行优化:

1. 增加量价合理性等辅助判断指标,避免错误信号
2. 优化止损方式,可以考虑移动止损、振荡止损等
3. 增加开仓过滤条件,例如突破布林线再入场
4. 测试不同的正向K线参数对不同品种的适应性
5. 评估最大回撤,控制单笔亏损规模

## 总结  

自定义向上突破策略整体思路清晰简单,通过统计正向K线占比判断持续上涨或下跌状态,利用简单指标捕捉趋势。该策略容易理解,用户友好,适合量化交易的初学者实践。但仅依赖单一指标和参数设置存在一定盈利波动性,需要针对策略的风险继续优化,使其能够在更多市场中稳定获利。

|| 

## Overview

The Positive Bars Percentage Breakout Strategy is a quantitative trading strategy based on price action judgments. It calculates the percentage of uptrend candles in a specified period to determine whether the market is currently in an uptrend state. When the percentage of uptrend candles is higher than the user-defined upper limit, the strategy judges that the market is currently in an uptrend and goes long. When the percentage is lower than the user-defined lower limit, the strategy judges that the market is currently in a downtrend and goes short.

## Strategy Logic  

The core indicator of this strategy is the percentage of uptrend candles. An uptrend candle opens below the previous low and closes above the open, indicating the price rose during that period. The strategy counts the number of uptrend candles in the user-defined lookback period and calculates the percentage of uptrend candles among all candles. When the percentage is higher than the upper limit, the strategy judges the market is in a persistent uptrend and goes long. When the percentage is lower than the lower limit, the strategy judges the market is in a downtrend and goes short. The stop loss and take profit orders are set according to the stop loss method defined by the user.

For example, if the user sets the lookback period to 20, upper limit to 70, lower limit to 30, the strategy traces back the latest 20 candles. If 16 of them are uptrend candles, the percentage would be 16/20=80%. Since 80% is higher than the 70% upper limit, the strategy will execute a long order. If among the latest 20 candles, only 5 are uptrend candles, then the percentage would be 5/20=25%. This is lower than the 30% lower limit, the strategy will execute a short order.

## Advantage Analysis 

The main advantages of this strategy are:

1. The strategy logic is simple and intuitive, easy to understand;  
2. It relies on only one indicator, reducing the risk of overfitting;
3. Users can customize parameters for different products; 
4. It has built-in stop loss/take profit functions to prevent huge losses;
5. Allow reverse trade without exiting positions first, faster tracking of trends.

## Risk Analysis   

The main risks of this strategy are:  

1. Relying solely on one indicator can generate false signals;  
2. Parameters are prone to overfitting, live performance may differ greatly;
3. Stop loss can be hit by volatile price swings, leading to losses;
4. Reverse trade may amplify losses;
5. Performance relies heavily on symbol, requiring separate tests.

The risks can be reduced by:

1. Adding filters to avoid false signals;  
2. Optimizing the stop loss logic to limit losses;
3. Evaluating and controlling maximum loss size;
4. Testing on different symbols separately.

## Optimization Directions

The main directions to optimize this strategy include:

1. Adding auxiliary indicators like volume to avoid false signals;
2. Optimizing stop loss methods, such as trailing stop loss; 
3. Adding entry filters like breakout of Bollinger Bands;
4. Testing optimal parameters of uptrend candles for different symbols;  
5. Evaluating maximum drawdown and controlling loss size.

## Conclusion   

The Positive Bars Percentage Breakout Strategy has a simple and straightforward logic to capture trends by statistically judging persistence of uptrends/downtrends. It is easy to understand and user-friendly, suitable for beginner quants. But its reliance on a single indicator and parameter optimization requires further improvements on risk control for stable profitability across different markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Strategy Direction|
|v_input_2|true|-----------------Strategy Inputs-------------------|
|v_input_3|13|Lookback|
|v_input_4|70|Upper Limit|
|v_input_5|30|Lower Limit|
|v_input_6|true|-----------------General Inputs-------------------|
|v_input_7|true|Use Stop Loss and Take Profit|
|v_input_8|0|Type Of Stop: ATR Stop|Swing Lo/Hi|Strategy Stop|
|v_input_9|10|Swing Point Lookback|
|v_input_10|2|Swing Point SL Perc Increment|
|v_input_11|14|ATR Length|
|v_input_12|10|ATR Multiple|
|v_input_13|1.6|Take Profit Risk Reward Ratio|
|v_input_14|true|Allow Direct Position Reverse|
|v_input_15|false|Reverse Trades|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-31 00:00:00
end: 2024-01-04 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ZenAndTheArtOfTrading 
// © TweakerID

// Based on the calculations by ZenAndTheArtOfTrading, I added stop loss, take profit and reverse line codes.
// The Positive Bars % calculates the number of green (positive) bars, relative to a lookback period, defined 
// by the user. If the percentage is low, it means that there was a bigger number of red candles in the 
// lookback period. The strategy goes long when the percentage is high and short when it's low, although
// this logic can be reversed with positive results on different time frames.

//@version=4
strategy("Positive Bars % Strat", 
     overlay=true, 
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=100, 
     initial_capital=10000, 
     commission_value=0.04, 
     calc_on_every_tick=false, 
     slippage=0)

direction = input(0, title = "Strategy Direction", type=input.integer, minval=-1, maxval=1)
strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))

/////////////////////// STRATEGY INPUTS ////////////////////////////////////////
title1=input(true, "-----------------Strategy Inputs-------------------")  

lookback = input(title="Lookback", type=input.integer, defval=13)
upperLimit = input(title="Upper Limit", type=input.integer, defval=70)
lowerLimit = input(title="Lower Limit", type=input.integer, defval=30)

/////////////////////// BACKTESTER /////////////////////////////////////////////
title2=input(true, "-----------------General Inputs-------------------")  

// Backtester General Inputs
i_SL=input(true, title="Use Stop Loss and Take Profit")
i_SLType=input(defval="ATR Stop", title="Type Of Stop", options=["Strategy Stop", "Swing Lo/Hi", "ATR Stop"])
i_SPL=input(defval=10, title="Swing Point Lookback")
i_PercIncrement=input(defval=2, step=.1, title="Swing Point SL Perc Increment")*0.01
i_ATR = input(14, title="ATR Length")
i_ATRMult = input(10, step=.1, title="ATR Multiple")
i_TPRRR = input(1.6, step=.1, title="Take Profit Risk Reward Ratio")

// Bought and Sold Boolean Signal
bought = strategy.position_size > strategy.position_size[1] 
 or strategy.position_size < strategy.position_size[1]

// Price Action Stop and Take Profit
LL=(lowest(i_SPL))*(1-i_PercIncrement)
HH=(highest(i_SPL))*(1+i_PercIncrement)
LL_price = valuewhen(bought, LL, 0)
HH_price = valuewhen(bought, HH, 0)
entry_LL_price = strategy.position_size > 0 ? LL_price : na 
entry_HH_price = strategy.position_size < 0 ? HH_price : na 
tp=strategy.position_avg_price + (strategy.position_avg_price - entry_LL_price)*i_TPRRR
stp=strategy.position_avg_price - (entry_HH_price - strategy.position_avg_price)*i_TPRRR

// ATR Stop
ATR=atr(i_ATR)*i_ATRMult
ATRLong = ohlc4 - ATR
ATRShort = ohlc4 + ATR
ATRLongStop = valuewhen(bought, ATRLong, 0)
ATRShortStop = valuewhen(bought, ATRShort, 0)
LongSL_ATR_price = strategy.position_size > 0 ? ATRLongStop : na 
ShortSL_ATR_price = strategy.position_size < 0 ? ATRShortStop : na 
ATRtp=strategy.position_avg_price + (strategy.position_avg_price - LongSL_ATR_price)*i_TPRRR
ATRstp=strategy.position_avg_price - (ShortSL_ATR_price - strategy.position_avg_price)*i_TPRRR

// Strategy Stop
float LongStop = na
float ShortStop = na
float StratTP = na
float StratSTP = na

/////////////////////// STRATEGY LOGIC /////////////////////////////////////////

//Calculations
positiveBars = 0
for i = (lookback - 1) to 0
    if close[i] > open[i]
        positiveBars := positiveBars + 1
positiveBarsPercent = (positiveBars / lookback) * 100

BUY=positiveBarsPercent >= upperLimit
SELL=positiveBarsPercent <= lowerLimit

//Trading Inputs
DPR=input(true, "Allow Direct Position Reverse")
reverse=input(false, "Reverse Trades")

// Entries
if reverse
    if not DPR
        strategy.entry("long", strategy.long, when=SELL and strategy.position_size == 0)
        strategy.entry("short", strategy.short, when=BUY and strategy.position_size == 0)
    else     
        strategy.entry("long", strategy.long, when=SELL)
        strategy.entry("short", strategy.short, when=BUY)
else
    if not DPR 
        strategy.entry("long", strategy.long, when=BUY and strategy.position_size == 0)
        strategy.entry("short", strategy.short, when=SELL and strategy.position_size == 0)
    else
        strategy.entry("long", strategy.long, when=BUY)
        strategy.entry("short", strategy.short, when=SELL)


SL= i_SLType == "Swing Lo/Hi" ? entry_LL_price : i_SLType == "ATR Stop" ? LongSL_ATR_price : LongStop
SSL= i_SLType == "Swing Lo/Hi" ? entry_HH_price : i_SLType == "ATR Stop" ? ShortSL_ATR_price : ShortStop
TP= i_SLType == "Swing Lo/Hi" ? tp : i_SLType == "ATR Stop" ? ATRtp : StratTP
STP= i_SLType == "Swing Lo/Hi" ? stp : i_SLType == "ATR Stop" ? ATRstp : StratSTP

strategy.exit("TP & SL", "long", limit=TP, stop=SL, when=i_SL)
strategy.exit("TP & SL", "short", limit=STP, stop=SSL, when=i_SL)

/////////////////////// PLOTS //////////////////////////////////////////////////

plot(i_SL and strategy.position_size > 0 ? SL : na , title='SL', style=plot.style_cross, color=color.red)
plot(i_SL and strategy.position_size < 0 ? SSL : na , title='SSL', style=plot.style_cross, color=color.red)
plot(i_SL and strategy.position_size > 0 ? TP : na, title='TP', style=plot.style_cross, color=color.green)
plot(i_SL and strategy.position_size < 0 ? STP : na, title='STP', style=plot.style_cross, color=color.green)
// Draw price action setup arrows
plotshape(BUY ? 1 : na, style=shape.triangleup, location=location.belowbar, 
 color=color.green, title="Bullish Setup", size=size.auto)
plotshape(SELL ? 1 : na, style=shape.triangledown, location=location.abovebar, 
 color=color.red, title="Bearish Setup", size=size.auto)
```

> Detail

https://www.fmz.com/strategy/438012

> Last Modified

2024-01-08 10:32:25
