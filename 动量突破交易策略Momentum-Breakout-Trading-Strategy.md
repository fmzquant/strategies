
> Name

动量突破交易策略Momentum-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1323c4f1f5532075fce.png)
 [trans]

## 概述

动量突破交易策略(Momentum Breakout Trading Strategy)是一种趋势追踪策略,它通过检测价格突破关键的支撑阻力位来产生交易信号。该策略运用Donchian Channel指标动态确定关键的支撑阻力位,并结合移动平均线指标进一步过滤信号,避免产生错误交易。

## 策略原理

该策略的核心指标是Donchian Channel。Donchian Channel由最高价、最低价和中线价格组成。通道上轨线和下轨线分别连接一定周期内的最高价和最低价。当价格突破通道上轨时产生买入信号;当价格跌破通道下轨时产生卖出信号。这反映了市场动量的变化。 

移动平均线被用来判断价格趋势方向。只有当价格位于移动平均线之上时,突破通道上轨的买入信号才被采纳,这样可以避免买入盘整区域。

具体来说,该策略的入市条件是:价格突破Donchian Channel上轨,且关闭价高于移动平均线。出市条件是:价格跌破Donchian Channel下轨。 

止损方式为追踪Donchian Channel下轨。这保证了止损点随着趋势的推移而上移。

## 优势分析

该策略结合两个指标判断趋势方向和力度,可以有效识别突破signals,避免错误交易。同时,止损方式合理,使得策略可以充分跟踪趋势获利。

具体来说,该策略有以下优势:

1. Donchian Channel指标可以动态确定关键的支撑阻力位,识别趋势关键转折点。

2. 移动平均线指标作为过滤器,避免买入盘整区域,减少无效交易。 

3. 止损方式为追踪Donchian Channel下轨,可以最大限度跟踪趋势获利。

4. 策略参数设置合理灵活,可以针对不同市场环境进行调整优化。

## 风险分析

该策略主要面临以下风险:

1. 突破失败风险。价格突破通道上轨后可能会快速回调,无法有效建仓。

2. 趋势反转风险。行情可能在止损点之前发生反转,导致止损出场。

3. 参数优化风险。不当的参数设置可能导致交易频繁或信号不足。

针对这些风险,可以通过调整移动平均线周期、增加成交量过滤等方式进行优化,确保产生的信号更加可靠。同时应适当 Loose 一些 Stop Loss 设置来应对短期调整的风险。

## 优化方向

该策略可以从以下几个方面进行进一步优化:

1. 利用成交量指标过滤信号,确保突破有力。 

2. 优化移动平均线周期参数,使其更加符合不同品种的特性。

3. 调整止损机制,使止损距离能够适应行情波动。

4. 增加再入场机制,在止损出场后可以再捕捉趋势机会。

5. 多品种回测,检查参数健壮性。根据不同品种特点微调参数。

## 总结

动量突破交易策略整合多种指标判断趋势方向和力度,解决常见趋势系统的盲目建仓问题。该策略参数设置灵活,可针对不同行情环境和交易品种进行优化调整,是一种较为通用和实战的突破系统。

||

## Overview

The Momentum Breakout Trading Strategy is a trend-following strategy that generates trading signals by detecting price breakouts beyond key support/resistance levels. This strategy utilizes the Donchian Channel indicator to dynamically identify key support/resistance levels and further filters signals with moving averages to avoid erroneous trades.  

## Strategy Logic

The core indicator of this strategy is the Donchian Channel. The Donchian Channel consists of the highest price, lowest price, and midline price over a set period. The upper and lower band of the channel connect the highest and lowest prices accordingly over the lookback period. A long signal is generated when the price breaks above the upper band, while a short signal is generated on a break below the lower band, reflecting shifts in market momentum.

The moving average is used to gauge the trend direction. Only buy signals with the price above the moving average are taken so as to avoid consolidations.   

Specifically, the entry condition consists of: Price breaks out above the Donchian Channel upper band AND closes above the moving average. The exit condition is: Price breaks below the Donchian Channel lower band.

The stop loss trails the Donchian Channel lower band, ensuring the stop adjusts higher along with the trend.

## Advantage Analysis 

This strategy effectively combines two indicators to judge trend direction and momentum, avoiding erroneous trades from false breakout signals. Meanwhile, the trailing stop allows the strategy to maximize trend following profits.

Specifically, the advantages are:

1. The Donchian Channel dynamically determines key support/resistance levels, identifying trend turning points.

2. The moving average filters out consolidations, avoiding unnecessary whipsaws.

3. Trailing the Donchian Channel lower band allows profits to be maximized.  

4. Reasonable parameters provide flexibility across various market environments.

## Risk Analysis

The main risks faced:   

1. Failed breakout risk - Price fails to sustain the momentum post breakout above upper band.

2. Trend reversal risk - Price reverses prior to hitting the trailing stop loss.  

3. Parameter optimization risk - Ineffective parameters lead to overtrading or insufficient signals.

To mitigate, factors like volume confirmation, moving average tuning, reasonable stop distances should be incorporated.

## Enhancement Opportunities

Further optimizations:  

1. Add volume filter to ensure high momentum breakouts.  

2. Optimize moving average periods for instrument characteristics. 

3. Adaptive stop loss mechanism based on price volatility dynamics.  

4. Re-entry mechanism after initial stop out to capture additional trend resumption moves.

5. Robust multi-market testing to identify parameters by product nuances.  

## Conclusion

The Momentum Breakout Trading Strategy combines indicators to effectively gauge trend and momentum strength, avoiding the common issues faced by trend systems regarding blind entries. Reasonably optimized parameters, adaptive mechanisms, and robust testing across various environments and products make this is a versatile and practical breakout system.


[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2019|From Year|
|v_input_2|true|From Month|
|v_input_3|true|From Day|
|v_input_4|9999|To Year|
|v_input_5|true|To Month|
|v_input_6|true|To Day|
|v_input_7|0|Execute Trades On...: Wick|Close|
|v_input_8|0|Trail Stops On...: ATR|Bottom of DC Channel|Midline of DC Channel|Tightest of ATR/Bot DC Channel|
|v_input_9|20|DC period|
|v_input_10|true|Use MA for Filtering?|
|v_input_11|0|MA Type For Filtering: SMA|EMA|
|v_input_12|100|MA Period for Filtering|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-12 00:00:00
end: 2023-12-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// Revision:        1
// Author:          @millerrh
// Strategy:  
//      Entry: Buy when Donchian Channel breaks out
//      Exit: Trail a stop with the lower Donchian Channel band
// Conditions/Variables:
//    1. Can add a filter to only take setups that are above a user-defined moving average (helps avoid trading counter trend) 
//    2. Manually configure which dates to back test
//    3. User-Configurable DC Channel length


// === CALL STRATEGY/STUDY, PROGRAMATICALLY ENTER STRATEGY PARAMETERS HERE SO YOU DON'T HAVE TO CHANGE THEM EVERY TIME YOU RUN A TEST ===
// (STRATEGY ONLY) - Comment out srategy() when in a study() 
strategy("Donchian Breakout", overlay=true, initial_capital=10000, currency='USD', 
   default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1)
// (STUDY ONLY) - Comment out study() when in a strategy() 
//study("Donchian Breakout", overlay=true)


// === BACKTEST RANGE ===
From_Year  = input(defval = 2019, title = "From Year")
From_Month = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
From_Day   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
To_Year    = input(defval = 9999, title = "To Year")
To_Month   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
To_Day     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
Start  = timestamp(From_Year, From_Month, From_Day, 00, 00)  // backtest start window
Finish = timestamp(To_Year, To_Month, To_Day, 23, 59)        // backtest finish window

// == INPUTS ==
trigInput = input(title = "Execute Trades On...", defval = "Wick", options=["Wick","Close"]) // Useful for comparing standing stop orders vs. waiting for candle closes prior to action
stopTrail = input(title = "Trail Stops On...", defval = "ATR", options = ["ATR","Bottom of DC Channel","Midline of DC Channel","Tightest of ATR/Bot DC Channel"])
dcPeriod = input(title="DC period", type=input.integer, defval=20)

// === PLOT THE DONCHIAN CHANNEL ===
// Logic
dcUpper = highest(high, dcPeriod)
dcLower = lowest(low, dcPeriod)
dcMid = avg(dcUpper, dcLower)

// Plotting
dcUplot = plot(dcUpper, color=color.blue, linewidth=1, title="Upper Channel Line")
dcLplot = plot(dcLower, color=color.blue, linewidth=1, title="Lower Channel Line")
dcMidPlot = plot(dcMid, color=color.gray, linewidth=1, title="Mid-Line Average")
fill(dcUplot, dcLplot, color=color.gray, transp=90)

// == FILTERING ==
// Inputs
useMaFilter = input(title = "Use MA for Filtering?", type = input.bool, defval = true)
maType = input(defval="SMA", options=["EMA", "SMA"], title = "MA Type For Filtering")
maLength   = input(defval = 100, title = "MA Period for Filtering", minval = 1)

// Declare function to be able to swap out EMA/SMA
ma(maType, src, length) =>
    maType == "EMA" ? ema(src, length) : sma(src, length) //Ternary Operator (if maType equals EMA, then do ema calc, else do sma calc)
maFilter = ma(maType, close, maLength)
plot(maFilter, title = "Trend Filter MA", color = color.green, linewidth = 3, style = plot.style_line, transp = 50)

// Check to see if the useMaFilter check box is checked, this then inputs this conditional "maFilterCheck" variable into the strategy entry 
maFilterCheck = if useMaFilter == true
    maFilter
else
    0

// == ENTRY AND EXIT CRITERIA ==
// Trigger stop based on candle close or High/Low (i.e. Wick) - If doing daily timeframe, can do candle close.  Intraday should use wick.
trigResistance = trigInput == "Close" ? close : trigInput == "Wick" ? high : na
trigSupport = trigInput == "Close" ? close : trigInput == "Wick" ? low : na
buySignal = trigResistance >= dcUpper[1] // The [1] looks at the previous bar's value as it didn't seem to be triggering correctly without it (likely) DC moves with each bar
sellSignal = trigSupport <= dcLower[1]

buy = buySignal and dcUpper[1] > maFilterCheck // All these conditions need to be met to buy


// (STRATEGY ONLY) Comment out for Study
// This string of code enters and exits at the close
if (trigInput == "Close")
    strategy.entry("Long", strategy.long, when = buy)
    strategy.close("Long", when = sellSignal)

// This string of code enters and exits at the wick (i.e. with pre-set stops)
if (trigInput == "Wick")
    strategy.entry("Long", strategy.long, stop = dcUpper[1], when = time > Start and time < Finish and dcUpper[1] > maFilterCheck)
    strategy.exit("Exit Long", from_entry = "Long", stop = dcLower[1])




```

> Detail

https://www.fmz.com/strategy/435896

> Last Modified

2023-12-19 15:46:38
