
> Name

双EMA黄金交叉交易策略Dual-EMA-Golden-Cross-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/21afc298e7eff9af1f6.png)
[trans]

## 概述

本策略结合了双EMA黄金交叉、标准化ATR噪音过滤器和ADX趋势指标,旨在为交易者提供更可靠的买入信号。该策略综合多个指标过滤虚假信号,识别更可靠的交易机会。

## 策略原理

该策略使用8周期和20周期的EMA构建双EMA黄金交叉系统。当短周期EMA上穿长周期EMA时生成买入信号。

此外,策略还设置了多个辅助指标进行过滤:

1. 14周期ATR,经过标准化处理,过滤掉市场中过小的价格波动。

2. 14周期ADX,用来识别趋势的力度。只有在强势趋势中才会考虑交易信号。

3. 14周期成交量SMA,过滤掉成交量较小的时间点。

4. 4/14周期Super Trend指标,判断多空市场方向。

在满足趋势方向、ATR标准化值、ADX值和成交量条件后,EMA黄金交叉才会最终触发买入信号。

## 策略优势

1. 多指标组合,可靠性较高

   该策略集成了EMA、ATR、ADX、Super Trend等多个指标,通过指标互补形成较强的信号过滤体系,可靠性较高。

2. 参数可调节空间大

   ATR标准化值阈值、ADX阈值、持仓周期等参数都可根据实际情况优化调整,策略灵活度较高。

3. 可区分多空市场

   通过Super Trend指标判断多空市,针对多空市场使用不同的参数标准,避免错失机会。

## 策略风险

1. 参数优化难度大

   策略参数组合复杂,优化难度较大,需要大量回测找到最优参数。

2. 指标错触发风险

   尽管有多重过滤,由于指标本质带有滞后性,仍有错触发风险。需要充分考虑止损理论。

3. 交易频率偏低

   受到多重指标和滤波的影响,策略交易频率会比较低,可能长期无交易的情况。

## 策略优化方向  

1. 优化参数组合

   通过大量回测数据找到指标参数的最优组合。

2. 增加机器学习

   基于大量历史数据,运用机器学习算法自动优化策略参数,实现策略的自适应性。
   
3. 考虑更多市场因素

   结合更多指标判断市场结构、情绪等因素,丰富策略的多样性。

## 总结

本策略综合考虑了趋势、波动性和量价因素,通过多指标过滤和参数调节形成交易体系。综合而言,该策略可靠性较高,可通过进一步优化其参数组合和建模方式提升策略的交易效率。

||

## Overview

This strategy combines dual EMA golden crosses, normalized ATR noise filter, and ADX trend indicator to provide more reliable buy signals for traders. It integrates multiple indicators to filter out false signals and identify more reliable trading opportunities.

## Strategy Principle  

The strategy uses 8-period and 20-period EMAs to build a dual EMA golden cross system. It generates buy signals when the shorter period EMA crosses above the longer period EMA.

In addition, the strategy has set up several auxiliary indicators for filtering:

1. 14-period ATR, normalized to filter out minor price fluctuations in the market.

2. 14-period ADX to identify the strength of trends. Trades are considered only in strong trends.  

3. 14-period SMA of volume to filter out time points with small trading volumes.

4. 4/14-period Super Trend indicator to judge bullish or bearish market direction.

Only when the trend direction, normalized ATR value, ADX level and volume conditions are met, the EMA golden cross will eventually trigger the buy signal.

## Strategy Advantages

1. Reliability from multiple indicators combination

   Integrating indicators like EMA, ATR, ADX and Super Trend forms a strong signal filtering system, higher reliability.  

2. More flexibility in parameter tuning

   Threshold values of normalized ATR, ADX, holding period etc. can be optimized, higher flexibility.
   
3. Distinguishing bull and bear markets

   Identify bull and bear markets using Super Trend, avoid missing opportunities.

## Strategy Risks  

1. Difficulty in parameter optimization

   Too many parameters, difficulty in finding the optimum combination.

2. Risk of indicator failure

   There is still risk of false signals due to lagging nature of indicators. Proper stop loss theory needs consideration.  

3. Low trading frequency

   Frequency tends to be low due to multiple filters, long no-trade duration possible.

## Optimization Directions   

1. Optimize parameter combination

   Finding optimum combination requires large amount of backtesting data.

2. Incorporate machine learning 

   Use ML algorithms to automatically optimize parameters over time. Improve adaptiveness.

3. Consider more market factors

   Combining indicators of market structure, emotions etc. improves diversity.  

## Conclusion

This strategy comprehensively considers trend, volatility and volume price factors. Through multi-indicator filtering and parameter tuning, it forms a reliable trading system. The reliability is high and can be further improved via optimization.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-29 00:00:00
end: 2023-12-06 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//Description:
//This strategy is a refactored version of an EMA cross strategy with a normalized ATR filter and ADX control. 
//It aims to provide traders with signals for long positions based on market conditions defined by various indicators.

//How it Works:
//1. EMA: Uses short (8 periods) and long (20 periods) EMAs to identify crossovers.
//2. ATR: Uses a 14-period ATR, normalized to its 20-period historical range, to filter out noise.
//3. ADX: Uses a 14-period RMA to identify strong trends.
//4. Volume: Filters trades based on a 14-period SMA of volume.
//5. Super Trend: Uses a Super Trend indicator to identify the market direction.

//How to Use:
//- Buy Signal: Generated when EMA short crosses above EMA long, and other conditions like ATR and market direction are met.
//- Sell Signal: Generated based on EMA crossunder and high ADX value.

//Originality and Usefulness:
//This script combines EMA, ATR, ADX, and Super Trend indicators to filter out false signals and identify more reliable trading opportunities. 
//USD Strength is not working, just simulated it as PSEUDO CODE: [close>EMA(50)]

//Strategy Results:
//- Account Size: $1000
//- Commission: Not considered
//- Slippage: Not considered
//- Risk: Less than 5% per trade
//- Dataset: Aim for more than 100 trades for sufficient sample size

//Note: This script should be used for educational purposes and should not be considered as financial advice.

//Chart:
//- The script's output is plotted as Buy and Sell signals on the chart.
//- No other scripts are included for clarity.
//- Have tested with 30mins period
//- You are encouraged to play with parameters, let me know if you 

//@version=5
strategy("Advanced EMA Cross with Normalized ATR Filter, Controlling ADX", shorttitle="ALP V5", overlay=true )

// Initialize variables
var bool hasBought = false
var int barCountSinceBuy = 0

// Define EMA periods
emaShort = ta.ema(close, 8)
emaLong = ta.ema(close, 20)

// Define ATR parameters
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

// Calculate USD strength
// That's not working as usd strenght, since I couldn't manage to get usd strength 
//I've just simulated it as if the current close price is above 50 days average (it's likely a bullish trend), usd is strong (usd_strenth variable is positive)
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

// Market direction using Super Trend indicator
[supertrendValue, supertrendDirection] = ta.supertrend(4, 14)
bool isBullMarket = supertrendDirection < 0
bool isBearMarket = supertrendDirection > 0

// Buy conditions for Bull and Bear markets
buyConditionBull = isBullMarket and ta.crossover(emaShort, emaLong) and normalizedATR > 0.2
buyConditionBear = isBearMarket and ta.crossover(emaShort, emaLong) and normalizedATR > 0.5
buyCondition = buyConditionBull or buyConditionBear

// Sell conditions for Bull and Bear markets
sellConditionBull = isBullMarket and (ta.crossunder(emaShort, emaLong) or isADXHigh)
sellConditionBear = isBearMarket and (ta.crossunder(emaShort, emaLong) or isADXHigh)
sellCondition = sellConditionBull or sellConditionBear

// Final Buy and Sell conditions
if (buyCondition)
    strategy.entry("Buy", strategy.long)
    positionPrice := close
    hasBought := true
    barCountSinceBuy := 0

if (hasBought)
    barCountSinceBuy := barCountSinceBuy + 1

// Stop-loss and take-profit levels
longStopLoss = positionPrice * (1 - stopLossPercent / 100)
longTakeProfit = positionPrice * (1 + takeProfitPercent / 100)

// Final Sell condition
finalSellCondition = sellCondition and hasBought and barCountSinceBuy >= 3 and isVolumeHigh

if (finalSellCondition)
    strategy.close("Buy")
    positionPrice := na
    hasBought := false
    barCountSinceBuy := 0

// Implement stop-loss and take-profit
strategy.exit("Stop Loss", "Buy", stop=longStopLoss)
strategy.exit("Take Profit", "Buy", limit=longTakeProfit)

// Plot signals
plotshape(series=buyCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="Buy")
plotshape(series=finalSellCondition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="Sell")

```

> Detail

https://www.fmz.com/strategy/434548

> Last Modified

2023-12-07 15:08:57
