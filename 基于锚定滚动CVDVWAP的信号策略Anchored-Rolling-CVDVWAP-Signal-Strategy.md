
> Name

基于锚定滚动CVDVWAP的信号策略Anchored-Rolling-CVDVWAP-Signal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16d8b4f390e2bf34aba.png)
[trans]

## 概述

基于锚定滚动CVDVWAP的信号策略是一个在TradingView平台上设计的复杂的技术分析指标。它集成了锚定成交量加权平均价格(VWAP)、累积成交量(CVD)和标准差分析的概念,以生成交易的入场和退出信号。

## 策略原理

该策略的核心在于计算一个锚定的VWAP,即从一个特定的“锚定柱”开始计算VWAP,这个锚定柱是在一个用户定义的周期内成交量最大的柱。然后根据这个锚定的VWAP绘制一个通过标准差计算的包络带,反映超买超卖区域。同时结合价格的变化率(ROC)指标检测“下跌”和“上涨”形态。当检测到形态的同时CVD过滤器发出信号,就生成买入和卖出信号。这些信号可以进行切换以重复发出,或者等待当前信号退出后再发出下一个信号。

## 策略优势

1. 利用成交量加权平均价格判断价格的价值区域和支撑/阻力位
2. 标准差包络带高亮价格进入超买超卖状态的情况
3. CVD成交量指标反映买卖压力
4. 清晰的入场退出信号点
5. 自动设置止损和止盈水平,辅助风险管理

## 风险分析

1. 参数设置不当可能导致错失交易机会或产生无效信号
2. 需要结合更多指标进行决策,不能单独使用
3. 需要适当优化参数以适应不同品种和周期
4. 停损和止盈位置设置不当可能带来较大亏损

## 优化方向

1. 调整计算VWAP的锚定柱选择逻辑,如结合均线判断
2. 尝试不同的标准差倍数设置envelope包络带
3. 优化ROC的参数以适应品种的波动率特征
4. 设置动态滑点或适应性止损来应对市场剧烈波动

## 总结

基于锚定滚动CVDVWAP的信号策略综合运用多种指标判断价格走势和买卖力度,对于发现交易机会很有帮助。但仍需谨慎使用,需要不断测试和优化以配合自身的交易策略使用。

||

## Overview

The Anchored Rolling CVDVWAP Signal strategy is a complex technical analysis indicator designed for the TradingView platform. It integrates the concepts of Anchored Volume Weighted Average Price (VWAP), Cumulative Volume Delta (CVD), and standard deviation analysis to generate entry and exit signals for trading.

## Strategy Logic

The core of this strategy is to calculate an anchored VWAP, which starts the VWAP calculation from a specific "anchor bar" that has the highest volume over a user-defined period. Then an envelope band calculated through standard deviation is plotted based on this anchored VWAP to reflect overbought/oversold areas. Meanwhile, the Rate of Change (ROC) indicator detects "dips" and "rips" patterns combined with CVD filter signals to generate buy and sell signals. These signals can be toggled to repeat or wait for current signal to exit before sending next signal.

## Advantages

1. Utilize volume weighted average price to identify value areas and support/resistance levels  
2. Standard deviation envelope bands highlight overextended price moves
3. CVD volume indicator reflects underlying buying/selling pressure
4. Clear entry and exit signals 
5. Auto stop loss and take profit for risk management

## Risk Analysis  

1. Improper parameter settings may cause missed trades or invalid signals
2. Needs to combine with more indicators for decision making instead of using alone
3. Requires optimization for different products and timeframes 
4. Poor stop loss and take profit positioning brings larger losses

## Optimization Directions

1. Adjust anchor bar selection logic with moving averages etc.
2. Try different standard deviation multiples for envelope bands
3. Optimize ROC parameters to suit volatility characteristics
4. Set dynamic slippage or adaptive stops for volatile markets

## Conclusion

The Anchored Rolling CVDVWAP Signal strategy synthesizes various indicators to assess price action and buying/selling momentum, which is very helpful for discovering trading opportunities. But still needs to be used cautiously, requiring continual testing and optimizations to fit one's own trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|(?Settings)Rolling VWAP Anchor Period|
|v_input_float_1|2|Standard Deviation Multiplier for Envelope|
|v_input_int_2|7|Analysis Period|
|v_input_bool_3|false|Toggle Signals|
|v_input_float_3|-8|Down (%)|
|v_input_float_4|8|Up (%)|
|v_input_bool_1|true|(?Filters)Use Anchored VWAP Filter|
|v_input_bool_2|true|Use CVD Filter|
|v_input_int_3|20|CVD Length|
|v_input_float_2|200|(?Trade Settings)Take Profit % of SL Distance|
|v_input_int_4|200|Stop Loss Lookback Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-28 00:00:00
end: 2023-12-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('Anchored Rolling CVDVWAP Signal Strategy', overlay=true)

// User-defined settings
vwapAnchorPeriod = input.int(20, title="Rolling VWAP Anchor Period", group="Settings")
stdDevMult = input.float(2.0, title="Standard Deviation Multiplier for Envelope", group="Settings")
analysis_period = input.int(7, minval=1, maxval=100, title="Analysis Period", group="Settings")
useVwapFilter = input.bool(true, title="Use Anchored VWAP Filter", group="Filters")
useCvdFilter = input.bool(true, title="Use CVD Filter", group="Filters")
cvdLength = input.int(20, title="CVD Length", group="Filters")
tpPercent = input.float(200.0, title="Take Profit % of SL Distance", group="Trade Settings")
slPeriods = input.int(200, title="Stop Loss Lookback Period", group="Trade Settings")
toggleSignals = input.bool(false, title="Toggle Signals", group="Settings")

// Finding the anchor bar
highestVol = ta.highest(volume, vwapAnchorPeriod)
var int anchorBar = na
if volume == highestVol
    anchorBar := bar_index

// Initializing variables for anchored VWAP and envelope calculation
var float avwapNumerator = na
var float avwapDenominator = na
var float anchoredVwap = na
var float sum = 0.0
var int count = 0
var float sumDev = 0.0

// Calculating Anchored VWAP and envelope
if not na(anchorBar)
    if bar_index == anchorBar
        avwapNumerator := high * volume + low * volume + close * volume
        avwapDenominator := volume * 3
        sum := 0.0
        count := 0
        sumDev := 0.0
    else if bar_index > anchorBar
        avwapNumerator := avwapNumerator[1] + high * volume + low * volume + close * volume
        avwapDenominator := avwapDenominator[1] + volume * 3
        sum := sum[1] + close
        count := count[1] + 1
        sumDev := sumDev[1] + math.pow(close - (sum / count), 2)
    anchoredVwap := avwapNumerator / avwapDenominator

// Standard deviation envelope calculation
float mean = sum / math.max(count, 1)
float stDev = math.sqrt(sumDev / math.max(count, 1))
float upperBand = anchoredVwap + stdDevMult * stDev
float lowerBand = anchoredVwap - stdDevMult * stDev

// CVD calculation and filter application
cvd = ta.cum(volume - ta.sma(volume, cvdLength))
bool cvdCondition = useCvdFilter ? (cvd[1] < cvd and cvd > cvd[1]) : true

// Dip and Rip pattern detection
roc = ta.roc(close, analysis_period)
dip_move_value = input.float(-8, title="Down (%)", step=0.50, minval=-100, maxval=-0.01, group="Settings")
rip_move_value = input.float(8, title="Up (%)", step=0.50, minval=0.01, maxval=100.00, group="Settings")
dip = roc <= dip_move_value and cvdCondition and (not useVwapFilter or close < anchoredVwap)
rip = roc >= rip_move_value and cvdCondition and (not useVwapFilter or close > anchoredVwap)

// State variables for signals and TP/SL execution
var bool inTrade = false // If we are currently in a trade
var bool takeLong = false // If the last signal was a buy
var bool takeShort = false // If the last signal was a sell
var float tradeEntryPrice = na // The trade entry price
var float tradeSL = na // The current trade's Stop Loss level
var float tradeTP = na // The current trade's Take Profit level

// Setting SL and TP levels for the trade
tradeSL := dip ? ta.highest(high, slPeriods) : (rip ? ta.lowest(low, slPeriods) : tradeSL)
tradeTP := dip ? tradeEntryPrice - (tradeSL - tradeEntryPrice) * tpPercent / 100 : (rip ? tradeEntryPrice + (tradeEntryPrice - tradeSL) * tpPercent / 100 : tradeTP)

// Trade entry logic
if (dip or rip) and not inTrade
    tradeEntryPrice := close
    inTrade := true
    takeLong := rip
    takeShort := dip

// Trade exit logic at TP or SL
if inTrade and ((takeLong and (low < tradeSL or high > tradeTP)) or (takeShort and (high > tradeSL or low < tradeTP)))
    inTrade := false // Exit the trade

// Display logic for signals based on the toggle
bool showLongSignal = rip and (not toggleSignals or not takeLong)
bool showShortSignal = dip and (not toggleSignals or not takeShort)

// Reset signals if toggle is active and trade is exited
if toggleSignals and not inTrade
    takeLong := true
    takeShort := true

// Strategy entry and exit logic
if showLongSignal
    strategy.entry("Long", strategy.long)

if showShortSignal
    strategy.close("Long")

if showShortSignal
    strategy.entry("Short", strategy.short)

if showLongSignal
    strategy.close("Short")

// Plotting of entry signals, anchored VWAP, and envelope
plot(upperBand, title="Upper Envelope", color=color.green)
plot(lowerBand, title="Lower Envelope", color=color.red)
plot(anchoredVwap, title="Anchored VWAP", color=color.blue)

// Coloring and shapes for Dip and Rip
barcolor(dip ? color.rgb(255, 0, 0) : na, title="Down Bar Color")
bgcolor(dip ? color.rgb(255, 0, 0, 80) : na, title="Down Background Color")
plotshape(dip, title="Dip - Down", location=location.top, color=color.rgb(255, 82, 82, 45), style=shape.square, size=size.tiny)
barcolor(rip ? color.rgb(0, 255, 0) : na, title="Up Bar Color")
bgcolor(rip ? color.rgb(0, 255, 0, 80) : na, title="Up Background Color")
plotshape(rip, title="Rip - Up", location=location.top, color=color.rgb(76, 175, 79, 55), style=shape.square, size=size.tiny)

// Strategy exit conditions for TP and SL
strategy.exit("Take Profit Long", from_entry = "Long", limit = tradeTP)
strategy.exit("Stop Loss Long", from_entry = "Long", stop = tradeSL)
strategy.exit("Take Profit Short", from_entry = "Short", limit = tradeTP)
strategy.exit("Stop Loss Short", from_entry = "Short", stop = tradeSL)
```

> Detail

https://www.fmz.com/strategy/437011

> Last Modified

2023-12-29 14:56:03
