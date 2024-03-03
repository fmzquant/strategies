
> Name

基于RSI和交易量的阴阳双轨趋势交易策略YinYang-RSI-Volume-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1949355e380af7d8bd9.png)
[trans]

## 概述

本策略是一个利用相对强度指数(RSI)和交易量的组合指标,来识别趋势方向并进行趋势跟踪的策略。关键点有:

1. 使用加权移动平均线计算中轴线,结合交易量信息来判断趋势中轴
2. 基于中轴线设定买入区、卖出区
3. 使用RSI信息来调整买入区和卖出区的范围
4. 进入买入区后设置止损线和止盈线
5. 具有重新入场机制

## 策略原理

本策略使用以下指标和参数:

- 中轴线:计算一定周期内的最高价和最低价的加权移动平均线,使用交易量作为权重,判断趋势的中轴方向
- RSI:计算一定周期内的相对强度指数,将其转化为0-1区间的数值
- 买入区:中轴线加上一定比例的RSI调整量,进入买入区后可做多
- 卖出区:中轴线减去一定比例的RSI调整量,进入卖出区后可做空
- 止盈线:中轴线
- 止损线:买入区下方/卖出区上方一定百分比设置

当价格进入买入区或卖出区后,进行对应方向的开仓操作。之后设定止盈和止损位置,当触发止盈或止损时平仓。同时设置了重新入场机制,如果配置允许,当再次触发开仓信号时可以再次入场。

## 策略优势

本策略具有以下优点:

1. 使用RSI和交易量双重指标识别趋势,提高判断准确性
2. RSI参数化调整买入区和卖出区范围,使其更加符合实际趋势
3. 交易量信息赋予价格变动更高权重,使中轴线更准确
4. 具有止损机制来控制风险
5. 可重新入场,降低假突破带来的风险

## 风险分析

本策略也存在一些风险:

1. RSI和交易量参数设置不当可能影响买卖区范围判定的准确性
2. 中轴线无法完全准确判断趋势,可能出现错误突破的情况
3. 止损点设置过宽可能带来更高损失
4. 重新入场机制可能导致过度交易

对应优化措施:

1. 调整RSI周期、交易量周期参数使其更符合市场情况
2. 结合其它指标验证买卖信号,避免错误突破
3. 适当收紧止损点,控制单笔损失
4. 限制每日交易次数,避免过度交易

## 策略优化方向 

本策略可从以下方面进行优化:

1. 尝试其它指标验证买卖信号,如K线形态、波动率指标等
2. 增加仓位管理机制,如盈利后加仓等
3. 增加机器学习算法判断趋势准确性,提高买卖区设置的准确度
4. 评估止盈止损点设置最优参数
5. 不同品种参数不一样,需要单独测试优化

## 总结

本策略整体来说是一个利用RSI和交易量指标进行趋势跟踪的量化策略。它有着识别趋势信号的双重验证机制,并设置了止盈止损来控制风险,以及重新入场机制来提高获利机会。通过参数调整和算法优化,本策略可以成为一个非常实用的趋势跟踪交易策略。

||

## Overview

This strategy is a trend following strategy that utilizes a combination of Relative Strength Index (RSI) and volume to identify trend direction and follow trends. Key points include:

1. Using Volume Weighted Moving Average to calculate midline and incorporate volume information to determine trend midpoint  
2. Setting up buy zone and sell zone based on midline
3. Using RSI information to adjust range of buy zone and sell zone
4. Setting stop loss and take profit after entering buy/sell zones
5. Having re-entry mechanism 

## Strategy Logic

This strategy uses the following indicators and parameters:

- Midline: Volume Weighted Moving Average of highest and lowest prices in certain periods to determine midpoint of the trend
- RSI: Relative Strength Index calculated over certain periods, converted into 0-1 range  
- Buy Zone: Midline plus RSI adjusted amount at certain ratio, long entry when price enters
- Sell Zone: Midline minus RSI adjusted amount at certain ratio, short entry when price enters
- Take Profit Line: Midline
- Stop Loss Line: Certain percentage below buy zone/above sell zone

When price enters buy or sell zone, a corresponding direction order will be opened. Stop loss and take profit lines are then set. When take profit or stop loss is triggered, position will be closed. A re-entry mechanism is also set so that new orders can be opened when signal triggers again if configured.

## Advantages

The advantages of this strategy include:

1. Using both RSI and volume to identify trends, improving accuracy
2. RSI parameterized adjustment makes buy/sell zone adapt better to actual trend  
3. Volume information assigns higher weight to price actions, making midline more accurate
4. Having stop loss mechanism to control risks
5. Allows re-entry, reducing risks of false breakouts

## Risks

There are also some risks:

1. Improper RSI and volume parameters may affect buy/sell zone accuracy
2. Midline may fail to accurately determine trend, causing false breakout
3. Stop loss too wide may lead to higher losses  
4. Re-entry may cause over-trading

Solutions:

1. Adjust RSI and volume cycle to fit market conditions
2. Use other indicators to verify buy/sell signals 
3. Tighten stop loss to limit losses  
4. Limit trades per day to prevent over-trading

## Optimization

This strategy can be optimized by:

1. Trying other indicators to verify signals e.g. candlestick, volatility indicators etc
2. Adding position sizing mechanisms e.g. pyramiding winners
3. Using machine learning algorithms to improve buy/sell zone accuracy 
4. Evaluating optimum parameters for stop loss and take profit  
5. Parameters need separate test and optimization for different products

## Conclusion  

In conclusion, this is a quantitative trend following strategy utilizing RSI and volume indicators. It has dual verification system to identify signals, stop loss/profit take to control risks, and re-entry mechanism to improve profitability. With parameter tuning and algorithm optimization, it can become a very practical trend trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|80|Trend Length:|
|v_input_source_1_close|0|Purchase Source (Long and Short):: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_source_2_close|0|Exit Source (Long and Short):: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_1|true|Use Take Profit|
|v_input_bool_2|true|Use Stop Loss|
|v_input_float_1|0.1|Stoploss Multiplier %:|
|v_input_string_1|0|Reset Purchase Availability After:: Entry|Stop Loss|None|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-21 00:00:00
end: 2023-12-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    ,@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@        @@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@         @@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@           @@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@        .@@@@@@@@@@@@@@@            @@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@          *@@@@@@@@@@@@@@             @@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@         @@@@@@@@@@@@@@@               @@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     @@@@@@@@@@@@@@@@                 @@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                  @@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.                    @@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                      @@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.                         @
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                             @
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,                                       @
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                                                @
// @@@@@@@@@@@@@@@@@@@@@@@@@@@                                                    @
// @@@@@@@@@@@@@@@@@@@@@@@@@                                                     @@
// @@@@@@@@@@@@@@@@@@@@@@@                                                       @@
// @@@@@@@@@@@@@@@@@@@@@@                                                       @@@
// @@@@@@@@@@@@@@@@@@@@@*                @@@@@                                 @@@@
// @@@@@@@@@@@@@@@@@@@@@               @@@@@@@@@                              @@@@@
// @@@@@@@@@@@@@@@@@@@@@              @@@@@@@@@@@                           @@@@@@@
// @@@@@@@@@@@@@@@@@@@@@               @@@@@@@@%                           @@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@                                                @@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@                                            @@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@                                        %@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@                                   @@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@                           @@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// © YinYangAlgorithms

//@version=5
strategy("YinYang RSI Volume Trend Strategy", shorttitle="YinYang RSVT Strategy", overlay=true )
// ~~~~~~~~~~~ INPUTS ~~~~~~~~~~~ //
len = input.int(80, "Trend Length:", tooltip="How far back should we span this indicator?\nThis length effects all lengths of the indicator")
purchaseSrc = input.source(close, "Purchase Source (Long and Short):", tooltip="What source needs to exit the purchase zone for a purchase to happen?")
exitSrc = input.source(close, "Exit Source (Long and Short):", tooltip="What source needs to hit a exit condition to stop the trade (Take profit, Stop Loss or hitting the other sides Purchase Zone)?")
useTakeProfit = input.bool(true, "Use Take Profit", tooltip="Should we take profit IF we cross the basis line and then cross it AGAIN?")
useStopLoss = input.bool(true, "Use Stop Loss", tooltip="Stop loss will ensure you don't lose too much if its a bad call")
stopLossMult = input.float(0.1, "Stoploss Multiplier %:", tooltip="How far from the purchase lines should the stop loss be")
resetCondition = input.string("Entry", "Reset Purchase Availability After:", options=["Entry", "Stop Loss", "None"],
 tooltip="If we reset after a condition is hit, this means we can purchase again when the purchase condition is met. \n" +
 "Otherwise, we will only purchase after an opposite signal has appeared.\n" +
 "Entry: means when the close enters the purchase zone (buy or sell).\n" +
 "Stop Loss: means when the close hits the stop loss location (even when were out of a trade)\n" +
 "This allows us to get more trades and also if our stop loss initally was hit but it WAS a good time to purchase, we don't lose that chance.")

// ~~~~~~~~~~~ VARIABLES ~~~~~~~~~~~ //
var bool longStart = na
var bool longAvailable = na
var bool longTakeProfitAvailable = na
var bool longStopLoss = na
var bool shortStart = na
var bool shortAvailable = na
var bool shortTakeProfitAvailable = na
var bool shortStopLoss = na

resetAfterStopLoss = resetCondition == "Stop Loss"
resetAfterEntry = resetCondition == "Entry"

// ~~~~~~~~~~~ CALCULATIONS ~~~~~~~~~~~ //
// Mid Line
midHigh = ta.vwma(ta.highest(high, len), len)
midLow = ta.vwma(ta.lowest(low, len), len)
mid = math.avg(midHigh, midLow)
midSmoothed = ta.ema(mid, len)

//Volume Filtered
avgVol = ta.vwma(volume, len)
volDiff = volume / avgVol
midVolSmoothed = ta.vwma(midSmoothed * volDiff, 3)

//RSI Filtered
midDifference = ta.sma(midHigh - midLow, len)
midRSI = ta.rsi(midVolSmoothed, len) * 0.01
midAdd = midRSI * midDifference

//Calculate Zones
purchaseZoneHigh = midSmoothed + midAdd
purchaseZoneLow = midSmoothed - midAdd
purchaseZoneBasis = math.avg(purchaseZoneHigh, purchaseZoneLow)

//Create Stop Loss Locations
stopLossHigh = purchaseZoneHigh * (1 + (stopLossMult * 0.01))
stopLossLow = purchaseZoneLow * (1 - (stopLossMult * 0.01))

// ~~~~~~~~~~~ PURCHASE CALCULATIONS ~~~~~~~~~~~ //
//Long
longEntry = ta.crossunder(purchaseSrc, purchaseZoneLow)
longStart := ta.crossover(purchaseSrc, purchaseZoneLow) and longAvailable
longAvailable := ta.crossunder(purchaseSrc, purchaseZoneHigh) or (resetAfterStopLoss and longStopLoss) or (resetAfterEntry and longEntry) ? true : longStart ? false : longAvailable[1]
longEnd = ta.crossover(exitSrc, purchaseZoneHigh)
longStopLoss := ta.crossunder(exitSrc, stopLossLow)
longTakeProfitAvailable := ta.crossover(exitSrc, purchaseZoneBasis) ? true : longEnd ? false : longTakeProfitAvailable[1]
longTakeProfit = ta.crossunder(exitSrc, purchaseZoneBasis) and longTakeProfitAvailable

//Short
shortEntry = ta.crossover(purchaseSrc, purchaseZoneHigh)
shortStart := ta.crossunder(purchaseSrc, purchaseZoneHigh) and shortAvailable
shortAvailable := ta.crossover(purchaseSrc, purchaseZoneLow) or (resetAfterStopLoss and shortStopLoss) or (resetAfterEntry and shortEntry)? true : shortStart ? false : shortAvailable[1]
shortEnd = ta.crossunder(exitSrc, purchaseZoneLow)
shortStopLoss := ta.crossover(exitSrc, stopLossHigh)
shortTakeProfitAvailable := ta.crossunder(exitSrc, purchaseZoneBasis) ? true : shortEnd ? false : shortTakeProfitAvailable[1]
shortTakeProfit = ta.crossover(exitSrc, purchaseZoneBasis) and shortTakeProfitAvailable

// ~~~~~~~~~~~ PLOTS ~~~~~~~~~~~ //
shortLine = plot(purchaseZoneHigh, color=color.green)
shortStopLossLine = plot(stopLossHigh, color=color.green) //color=color.rgb(0, 97, 3)
fill(shortLine, shortStopLossLine, color = color.new(color.green, 90))
plot(purchaseZoneBasis, color=color.white)
longLine = plot(purchaseZoneLow, color=color.red)
longStopLossLine = plot(stopLossLow, color=color.red) //color=color.rgb(105, 0, 0)
fill(longLine, longStopLossLine, color=color.new(color.red, 90))

// ~~~~~~~~~~~ STRATEGY ~~~~~~~~~~~ //
if (longStart)
    strategy.entry("buy", strategy.long)
else if (longEnd or (useStopLoss and longStopLoss) or (useTakeProfit and longTakeProfit))
    strategy.close("buy")

if (shortStart)
    strategy.entry("sell", strategy.short)
else if (shortEnd or (useStopLoss and shortStopLoss) or (useTakeProfit and shortTakeProfit))
    strategy.close("sell")

// ~~~~~~~~~~~ ALERTS ~~~~~~~~~~~ //
if longStart or (longEnd or (useStopLoss and longStopLoss) or (useTakeProfit and longTakeProfit)) or shortStart or (shortEnd or (useStopLoss and shortStopLoss) or (useTakeProfit and shortTakeProfit))
    alert("{{strategy.order.action}} | {{ticker}} | {{close}}", alert.freq_once_per_bar)
```

> Detail

https://www.fmz.com/strategy/436244

> Last Modified

2023-12-22 14:29:05
