
> Name

双EMA均线与ATR指标配合过滤的趋势跟随策略Dual-EMA-Crossover-Trend-Following-Strategy-with-ATR-and-ADX-Filters

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19caf3e41acd323f5c5.png)
[trans]

## 概述

该策略利用双EMA均线形成金叉做多,死叉做空的经典趋势跟随策略,并利用ATR指标和ADX指标进行额外过滤,在强势趋势时进行追踪,在震荡时控制风险。

## 策略原理

该策略主要基于以下几点:

1. 使用较短期的8周期EMA均线和较长期的20周期EMA均线形成金叉和死叉信号。EMA均线本身具有趋势跟随性质。

2. ATR指标体现近期波动幅度。通过ATR指标的正态化,可以动态调整EMA均线交叉的过滤条件,在强势趋势追踪时降低要求,在震荡行情时提高过滤要求,控制风险。

3. ADX指标判断趋势强度。当ADX值大于30时,认为出现强势趋势,此时及时止损防守。

4. 结合涨跌趋势判断做多做空时机。在牛市中,金叉做多,在熊市中死叉做空。

5. 交易量过滤,在交易量放大的时候进行入场。

6. USD指数简单判断美元强弱,美元强势时止损和止盈幅度扩大。

7. 结合超级趋势指标来判断总体行情走势,辅助判断做多做空时机。

该策略充分结合趋势指标与震荡指标,能够动态调整参数,在追踪趋势的同时控制风险。

## 策略优势

1. 使用双EMA均线系统进行趋势判断,EMA具有平滑性,可以有效过滤假突破。

2. ATR指标动态调整EMA均线交叉过滤条件,使策略可以灵活适应不同市场环境。

3. ADX指标和交易量作为辅助判断指标,避免在震荡行情中被套。

4. 考虑美元指数和超级趋势指标判断大趋势,提高决策的准确性。

5. 风险管理参数会根据美元强弱自动调整,强美元时止损和止盈幅度放大。

6. 使用简单直观的金叉死叉交易信号以及止损止盈策略,容易实现和回测。

## 策略风险

1. 双EMA均线系统去除趋势临界点判断存在滞后。

2. ATR参数选择不当可能导致过于激进或保守。

3. ADX指标参数需要优化,ADX高点选择不当可能错过趋势。 

4. 美元指数以及超级趋势指标判断可能存在错误。

5. 止损幅度过小可能增加亏损;止损过宽容易被套。

## 优化思路

1. 可以考虑结合其他指标如MACD判断趋势临界点。

2. 利用更多历史数据训练ATR参数空间,找到最优参数范围。

3. 测试不同ADX参数、优化ADX高点判断。

4. 增加更多变量判断美元指数和市场总体走势。

5. 根据回测数据计算出最优止损幅度。

6. 可以考虑止损改为移动止损或振荡止损。

7. 继续优化开仓量大小以及持仓周期。

## 总结

本策略整合经典的双EMA均线系统与多个辅助指标,通过参数自动优化,实现了一个较完整的趋势跟随策略。它能够灵活适应市场环境的变化,在追踪趋势的同时控制风险。但仍需要针对止损和指标参数进行进一步测试和优化,以获得更好的稳定收益。该策略思路值得借鉴和改进。

||


## Overview

This strategy uses the classic dual EMA crossover system for trend following, with additional filters from the ATR and ADX indicators, to track strong trends and control risk during consolidations.

## Strategy Logic

The strategy is mainly based on the following:

1. Use a faster 8-period EMA and a slower 20-period EMA to generate crossover signals. EMAs themselves have trend-following properties.

2. The ATR indicator reflects recent volatility. Normalizing ATR allows dynamic adjustment of EMA crossover filter conditions, lowering requirements during strong trends and raising during consolidations to control risk.

3. The ADX indicator determines trend strength. An ADX reading above 30 suggests a strong trend, prompting timely stop loss. 

4. Combine with bull/bear trends to determine long/short entry timing. Go long on golden crosses in a bull market, and short on death crosses in a bear market.

5. Volume filter to enter when volume expands.

6. Use a simple USD index to determine USD strength, expanding stop and take profit range during strong USD.

7. Use the SuperTrend indicator to determine overall market direction for additional long/short timing aid.

The strategy combines trend and oscillation indicators to dynamically adjust parameters, tracking trends while controlling risk.

## Advantages of the Strategy

1. The dual EMA system provides trend determination, with EMA smoothness filtering false breaks.

2. ATR-normalized filters allow flexibility for different market environments.  

3. ADX and volume provide additional checks to avoid whipsaws during consolidations.

4. Considering USD and SuperTrend improves decision accuracy on the macro trend.

5. Risk management automatically adapts based on USD strength.

6. Simple golden/dead cross signals and stop/take profit logic make it easy to implement and backtest.

## Risks of the Strategy

1. Dual EMAs lag in detecting trend turning points. 

2. Poor ATR parameter selection may be too aggressive or conservative.

3. ADX parameters need optimization, improperly set high points could miss trends.

4. USD and SuperTrend trend determination could be inaccurate. 

5. Stop loss too tight increases losses, too wide risks whipsaws.

## Improvement Ideas

1. Consider adding indicators like MACD for better turnover point detection.

2. Optimize ATR parameters over more historical data. 

3. Test different ADX parameters and optimize high point thresholds.

4. Add more variables for USD and market trend analysis.

5. Calculate optimal stop loss percentage from backtest stats. 

6. Experiment with trailing or chandelier stops.

7. Continue optimizing entry size and holding period.

## Conclusion

This strategy integrates the classic dual EMA system with multiple auxiliary indicators, using parameterized optimization for a fairly robust trend following approach. It adapts flexibly to changing market environments, tracking trends while controlling risk. Further testing and optimization of stops and indicator parameters would improve results. The concepts are worth learning from and improving upon.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-15 00:00:00
end: 2023-11-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Refactored Advanced EMA Cross with Normalized ATR Filter, Controlling ADX", shorttitle="ALP V5", overlay=true)

// Initialize variables to track if a buy order has been placed and number of periods since the last buy
var bool hasBought = false
var int barCountSinceBuy = 0

// Define EMA periods
emaShort = ta.ema(close, 8)
emaLong = ta.ema(close, 20)

// Define ATR period and normalization
atrLength = 14
atrValue = ta.atr(atrLength)
maxHistoricalATR = ta.highest(atrValue, 20)
minHistoricalATR = ta.lowest(atrValue, 20)
normalizedATR = (atrValue - minHistoricalATR) / (maxHistoricalATR - minHistoricalATR)

// Define ADX parameters
adxValue = ta.rma(close, 14)
adxHighLevel = 30
isADXHigh = adxValue > adxHighLevel

// Initialize risk management variables
var float stopLossPercent = na
var float takeProfitPercent = na
var float trailingStop = na

// Calculate USD strength (simplified)
usd_strength = close / ta.ema(close, 50) - 1

// Adjust risk parameters based on USD strength
if (usd_strength > 0)
    stopLossPercent := 3
    takeProfitPercent := 6
else
    stopLossPercent := 4
    takeProfitPercent := 8

// Initialize position variable
var float positionPrice = na

// Volume filter
minVolume = ta.sma(volume, 14) * 1.5
isVolumeHigh = volume > minVolume



// Piyasa yönü için süper trend göstergesi
[supertrendValue, supertrendDirection] = ta.supertrend(4, 14)  // Use a factor of 3 and ATR period of 10
bool isBullMarket = supertrendDirection < 0
bool isBearMarket = supertrendDirection > 0

// Yükselen piyasa için alım koşulu
buyConditionBull = isBullMarket and ta.crossover(emaShort, emaLong) and normalizedATR > 0.2
// Düşen piyasa için alım koşulu
buyConditionBear = isBearMarket and ta.crossover(emaShort, emaLong) and normalizedATR > 0.5
// Genel alım koşulu
buyCondition = buyConditionBull or buyConditionBear

// Yükselen ve düşen piyasalar için farklı satış koşulları
sellConditionBull = isBullMarket and (ta.crossunder(emaShort, emaLong) or isADXHigh)
sellConditionBear = isBearMarket and (ta.crossunder(emaShort, emaLong) or isADXHigh)
// Genel satış koşulu
sellCondition = sellConditionBull or sellConditionBear


// Buy condition
if (buyCondition)
    strategy.entry("Buy", strategy.long)
    positionPrice := close
    hasBought := true // Set the flag to true when a buy order is placed
    barCountSinceBuy := 0 // Reset the bar counter when a buy order is placed

// Increase the bar counter if a buy has been executed
if (hasBought)
    barCountSinceBuy := barCountSinceBuy + 1

// Calculate stop-loss and take-profit levels
longStopLoss = positionPrice * (1 - stopLossPercent / 100)
longTakeProfit = positionPrice * (1 + takeProfitPercent / 100)


// Final Sell condition, now also checks if a buy has occurred before and if at least 5 periods have passed
finalSellCondition = sellCondition and hasBought and barCountSinceBuy >= 3 and isVolumeHigh

if (finalSellCondition)
    strategy.close("Buy")
    positionPrice := na
    hasBought := false // Reset the flag when a sell order is placed
    barCountSinceBuy := 0 // Reset the bar counter when a buy order is closed

// Implement stop-loss, take-profit, and trailing stop
strategy.exit("Stop Loss", "Buy", stop=longStopLoss)
strategy.exit("Take Profit", "Buy", limit=longTakeProfit)
//strategy.exit("Trailing Stop", "Buy", trail_price=close, trail_offset=trailingStop * close / 100)


var label l = na

if (buyCondition)
    l := label.new(bar_index, high, text="buy triggered " + str.tostring(usd_strength))
    label.delete(l[1])

if (finalSellCondition)
    l := label.new(bar_index, high, text="sell triggered " + str.tostring(usd_strength))
    label.delete(l[1])

// Plot signals
plotshape(series=buyCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="Buy")
plotshape(series=finalSellCondition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="Sell")

```

> Detail

https://www.fmz.com/strategy/432212

> Last Modified

2023-11-15 15:53:57
