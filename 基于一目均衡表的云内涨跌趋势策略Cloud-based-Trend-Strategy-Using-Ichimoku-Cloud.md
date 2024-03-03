
> Name

基于一目均衡表的云内涨跌趋势策略Cloud-based-Trend-Strategy-Using-Ichimoku-Cloud

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a9dfff7cf5a3d4f3a2.png)
[trans]
## 概述

本策略基于传统均线交易策略改进而来,采用一目均衡表指标辅助判断多空方向。该策略结合价格突破和均线交叉信号,识别潜在趋势反转点,实现低风险交易机会的捕捉。

## 策略原理

一目均衡表包含转换线、基准线、延迟线和先行线。当转换线上穿或下穿基准线时产生金叉死叉信号。价格突破云内涨跌趋势作为入场信号,基准线和先行线组成的云内作为止损线。

具体来说,多头入场信号为转换线上穿基准线且突破云内上边线。做多后,若价格跌破云内下边线则止损退出。空头入场及止损规则类似。

## 优势分析

相比 tradition moving average strategies,本策略具有以下优势:

1. 一目均衡表结合价格运动态势判断,避免假突破产生错误信号
2. 云内作为移动止损,能及时止损控制风险
3. 通过参数调整,可适应不同周期及市场环境

## 风险分析

本策略主要面临以下风险:  

1. 趋势反转风险。突破入场后价格可能重新进入震荡,无法获利。
2. 突破假信号风险。价格出现短期调整回补可能被误判为突破信号。
3. 参数优化风险。不同参数适用于不同周期,需要测试调整。

对应解决方法:

1. 采用移动止损及部分止盈。
2. 结合更高周期判断,避免短线噪音。  
3. 多组参数回测优选组合 parameter optimization

## 优化方向  

本策略可从以下方面进行优化:

1. 增加机器学习判断突破真伪信号的可能性
2. 采用自适应移动止损自动调整止损距离
3. 参数自适应优化 find optimal parameters 

## 总结

本策略总体来说是一个可靠、低风险的趋势跟踪策略。相比单纯均线策略,结合一目均衡表指标判断能够过滤掉部分噪音信号。云内作为移动止损使其承受风险能力较强。通过进一步优化,可望获得更稳定的超额收益。

||

## Overview  

This strategy is an improvement of traditional moving average strategies, using Ichimoku Cloud indicator to help determine bullish and bearish bias. It identifies potential trend reversal points through price breakouts and moving average crossovers, enabling the capture of low-risk trading opportunities.   

## Strategy Logic  

The Ichimoku Cloud consists of the tenkan line, kijun line, chikou line and senkou lines. Golden cross and dead cross signals are generated when the tenkan line crosses over or under the kijun line. Price breakouts of the Cloud act as entry signals, while the kijun and senkou lines that form the Cloud act as stop loss lines.   

Specifically, the long entry signal is triggered when the tenkan line crosses over the kijun line and the price breaks above the top of the Cloud. After entering long, if the price breaks below the bottom of the Cloud, the position will be stopped out. The short entry and stop loss rules are similar.  

## Advantages

Compared with traditional moving average strategies, this strategy has the following advantages:

1. Ichimoku Cloud combines price action to avoid false breakout signals  
2. The Cloud acts as an adaptive stop loss to control risk  
3. Parameters can be tuned for different timeframes and market regimes  

## Risk Analysis   

The main risks of this strategy include:

1. Trend reversal risk. Price may revert after breakout entry signal.  
2. False breakout signal risk. Short term pullbacks may generate erroneous signals.
3. Parameter optimization risk. Different parameters suit different timeframes.

Solutions:  

1. Employ adaptive stop loss and partial profit taking
2. Reference higher timeframe context to avoid noise  
3. Robust parameter optimization through backtesting  

## Enhancement Opportunities

This strategy can be further improved by:  

1. Incorporating machine learning to determine breakout credibility
2. Implementing adaptive stops that automatically adjust stop distance  
3. Parameter optimization to find optimal combinations  

## Conclusion  

In conclusion, this is an overall reliable, low-risk trend following strategy. By incorporating Ichimoku Cloud on top of moving averages, it helps filter out some false signals. The Cloud stop loss also makes it robust in terms of risk management. Further optimizations may lead to more consistent alpha generation.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(2023-01-01T00:00:00)|(?Trading Period)Trade Start Date/Time|
|v_input_2|timestamp(2025-01-01T00:00:00)|Trade Stop Date/Time|
|v_input_string_1|0|(?Position side)Trading Mode: Long|Short|
|v_input_string_2|0|(?Long Mode Signals - set up if Trading Mode: Long)Select Entry Signal (Long): Bullish All|Bullish Strong|Bullish Neutral|Bullish Weak|Bullish Strong and Neutral|Bullish Neutral and Weak|Bullish Strong and Weak|None|
|v_input_string_3|0|Select Exit Signal (Long): Bearish Weak|Bearish Strong|Bearish Neutral|None|Bearish Strong and Neutral|Bearish Neutral and Weak|Bearish Strong and Weak|Bearish All|
|v_input_string_4|0|(?Short Mode Signals - set up if Trading Mode: Short)Select Entry Signal (Short): None|Bearish Strong|Bearish Neutral|Bearish Weak|Bearish Strong and Neutral|Bearish Neutral and Weak|Bearish Strong and Weak|Bearish All|
|v_input_string_5|0|Select Exit Signal (Short): None|Bullish Strong|Bullish Neutral|Bullish Weak|Bullish Strong and Neutral|Bullish Neutral and Weak|Bullish Strong and Weak|Bullish All|
|v_input_float_1|7|(?Risk Management)Take Profit, % (0 - disabled)|
|v_input_float_2|3.5|Stop Loss, % (0 - disabled)|
|v_input_int_1|9|(?Indicator Settings)Tenkan|
|v_input_int_2|26|Kijun|
|v_input_int_3|52|Chikou|
|v_input_int_4|26|Offset|
|v_input_3|false|(?Display Settings)Show Tenkan Line|
|v_input_4|false|Show Kijun Line|
|v_input_5|true|Show Senkou A Line|
|v_input_6|true|Show Senkou B Line|
|v_input_7|false|Show Chikou Line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5

//  -----------------------------------------------------------------------------
//  Copyright © 2024 Skyrex, LLC. All rights reserved.
//  -----------------------------------------------------------------------------

//  Version: v2
//  Release:  Jan 19, 2024

strategy(title = "Advanced Ichimoku Clouds Strategy Long and Short", 
         shorttitle = "Ichimoku Strategy Long and Short", 
         overlay = true, 
         format = format.inherit, 
         pyramiding = 1, 
         calc_on_order_fills = false, 
         calc_on_every_tick = true, 
         default_qty_type = strategy.percent_of_equity, 
         default_qty_value = 100, 
         initial_capital = 10000, 
         currency = currency.NONE,  
         commission_type = strategy.commission.percent, 
         commission_value = 0)

// Trading Period Settings
lookBackPeriodStart = input(title="Trade Start Date/Time", defval = timestamp('2023-01-01T00:00:00'), group = "Trading Period")
lookBackPeriodStop = input(title="Trade Stop Date/Time", defval = timestamp('2025-01-01T00:00:00'), group = "Trading Period")

// Trading Mode
tradingMode = input.string("Long", "Trading Mode", options = ["Long", "Short"], group = "Position side")

// Long Mode Signal Options
entrySignalOptionsLong = input.string("Bullish All", "Select Entry Signal (Long)", options = ["None", "Bullish Strong", "Bullish Neutral", "Bullish Weak", "Bullish Strong and Neutral", "Bullish Neutral and Weak", "Bullish Strong and Weak", "Bullish All"], group = "Long Mode Signals - set up if Trading Mode: Long")
exitSignalOptionsLong = input.string("Bearish Weak", "Select Exit Signal (Long)", options = ["None", "Bearish Strong", "Bearish Neutral", "Bearish Weak", "Bearish Strong and Neutral", "Bearish Neutral and Weak", "Bearish Strong and Weak", "Bearish All"], group = "Long Mode Signals - set up if Trading Mode: Long")

// Short Mode Signal Options
entrySignalOptionsShort = input.string("None", "Select Entry Signal (Short)", options = ["None", "Bearish Strong", "Bearish Neutral", "Bearish Weak", "Bearish Strong and Neutral", "Bearish Neutral and Weak", "Bearish Strong and Weak", "Bearish All"], group = "Short Mode Signals - set up if Trading Mode: Short")
exitSignalOptionsShort = input.string("None", "Select Exit Signal (Short)", options = ["None", "Bullish Strong", "Bullish Neutral", "Bullish Weak", "Bullish Strong and Neutral", "Bullish Neutral and Weak", "Bullish Strong and Weak", "Bullish All"], group = "Short Mode Signals - set up if Trading Mode: Short")

// Risk Management Settings
takeProfitPct = input.float(7, "Take Profit, % (0 - disabled)", minval = 0, step = 0.1, group = "Risk Management")
stopLossPct = input.float(3.5, "Stop Loss, % (0 - disabled)", minval = 0, step = 0.1, group = "Risk Management")

// Indicator Settings
tenkanPeriods = input.int(9, "Tenkan", minval=1, group="Indicator Settings")
kijunPeriods = input.int(26, "Kijun", minval=1, group="Indicator Settings")
chikouPeriods = input.int(52, "Chikou", minval=1, group="Indicator Settings")
displacement = input.int(26, "Offset", minval=1, group="Indicator Settings")

// Display Settings
showTenkan = input(false, "Show Tenkan Line", group = "Display Settings")
showKijun = input(false, "Show Kijun Line", group = "Display Settings")
showSenkouA = input(true, "Show Senkou A Line", group = "Display Settings")
showSenkouB = input(true, "Show Senkou B Line", group = "Display Settings")
showChikou = input(false, "Show Chikou Line", group = "Display Settings")

// Function to convert percentage to price points based on entry price
pctToPoints(pct) => 
    strategy.position_avg_price * pct / 100

// Colors and Transparency Level
transparencyLevel = 90
colorGreen = color.new(#36a336, 23)
colorRed = color.new(#d82727, 47)
colorTenkanViolet = color.new(#9400D3, 0)
colorKijun = color.new(#fdd8a0, 0)
colorLime = color.new(#006400, 0)
colorMaroon = color.new(#8b0000, 0)
colorGreenTransparent = color.new(colorGreen, transparencyLevel)
colorRedTransparent = color.new(colorRed, transparencyLevel)

// Ichimoku Calculations
donchian(len) => math.avg(ta.lowest(len), ta.highest(len))
tenkan = donchian(tenkanPeriods)
kijun = donchian(kijunPeriods)
senkouA = math.avg(tenkan, kijun)
senkouB = donchian(chikouPeriods)
displacedSenkouA = senkouA[displacement - 1]
displacedSenkouB = senkouB[displacement - 1]

// Plot Ichimoku Lines
plot(showTenkan ? tenkan : na, color=colorTenkanViolet, title = "Tenkan", linewidth=2)
plot(showKijun ? kijun : na, color=colorKijun, title = "Kijun", linewidth=2)
plot(showChikou ? close : na, offset=-displacement, color = colorLime, title = "Chikou", linewidth=1)
p1 = plot(showSenkouA ? senkouA : na, offset=displacement - 1, color=colorGreen, title = "Senkou A", linewidth=2)
p2 = plot(showSenkouB ? senkouB : na, offset=displacement - 1, color=colorRed, title = "Senkou B", linewidth=2)
fill(p1, p2, color=senkouA > senkouB ? colorGreenTransparent : colorRedTransparent)

// Signal Calculations
bullishSignal = ta.crossover(tenkan, kijun)
bearishSignal = ta.crossunder(tenkan, kijun)
bullishSignalValues = bullishSignal ? tenkan : na
bearishSignalValues = bearishSignal ? tenkan : na

strongBullishSignal = bullishSignalValues > displacedSenkouA and bullishSignalValues > displacedSenkouB
neutralBullishSignal = ((bullishSignalValues > displacedSenkouA and bullishSignalValues < displacedSenkouB) or (bullishSignalValues < displacedSenkouA and bullishSignalValues > displacedSenkouB))
weakBullishSignal = bullishSignalValues < displacedSenkouA and bullishSignalValues < displacedSenkouB

strongBearishSignal = bearishSignalValues < displacedSenkouA and bearishSignalValues < displacedSenkouB
neutralBearishSignal = ((bearishSignalValues > displacedSenkouA and bearishSignalValues < displacedSenkouB) or (bearishSignalValues < displacedSenkouA and bearishSignalValues > displacedSenkouB))
weakBearishSignal = bearishSignalValues > displacedSenkouA and bearishSignalValues > displacedSenkouB

// Functions to determine entry and exit conditions for Long and Short
isEntrySignalLong() =>
    entryCondition = false
    if entrySignalOptionsLong == "None"
        entryCondition := false
    else if entrySignalOptionsLong == "Bullish Strong"
        entryCondition := strongBullishSignal
    else if entrySignalOptionsLong == "Bullish Neutral"
        entryCondition := neutralBullishSignal
    else if entrySignalOptionsLong == "Bullish Weak"
        entryCondition := weakBullishSignal
    else if entrySignalOptionsLong == "Bullish Strong and Neutral"
        entryCondition := strongBullishSignal or neutralBullishSignal
    else if entrySignalOptionsLong == "Bullish Neutral and Weak"
        entryCondition := neutralBullishSignal or weakBullishSignal
    else if entrySignalOptionsLong == "Bullish Strong and Weak"
        entryCondition := strongBullishSignal or weakBullishSignal
    else if entrySignalOptionsLong == "Bullish All"
        entryCondition := strongBullishSignal or neutralBullishSignal or weakBullishSignal
    entryCondition

isExitSignalLong() =>
    exitCondition = false
    if exitSignalOptionsLong == "None"
        exitCondition := false
    else if exitSignalOptionsLong == "Bearish Strong"
        exitCondition := strongBearishSignal
    else if exitSignalOptionsLong == "Bearish Neutral"
        exitCondition := neutralBearishSignal
    else if exitSignalOptionsLong == "Bearish Weak"
        exitCondition := weakBearishSignal
    else if exitSignalOptionsLong == "Bearish Strong and Neutral"
        exitCondition := strongBearishSignal or neutralBearishSignal
    else if exitSignalOptionsLong == "Bearish Neutral and Weak"
        exitCondition := neutralBearishSignal or weakBearishSignal
    else if exitSignalOptionsLong == "Bearish Strong and Weak"
        exitCondition := strongBearishSignal or weakBearishSignal
    else if exitSignalOptionsLong == "Bearish All"
        exitCondition := strongBearishSignal or neutralBearishSignal or weakBearishSignal
    exitCondition

isEntrySignalShort() =>
    entryCondition = false
    if entrySignalOptionsShort == "None"
        entryCondition := false
    else if entrySignalOptionsShort == "Bearish Strong"
        entryCondition := strongBearishSignal
    else if entrySignalOptionsShort == "Bearish Neutral"
        entryCondition := neutralBearishSignal
    else if entrySignalOptionsShort == "Bearish Weak"
        entryCondition := weakBearishSignal
    else if entrySignalOptionsShort == "Bearish Strong and Neutral"
        entryCondition := strongBearishSignal or neutralBearishSignal
    else if entrySignalOptionsShort == "Bearish Neutral and Weak"
        entryCondition := neutralBearishSignal or weakBearishSignal
    else if entrySignalOptionsShort == "Bearish Strong and Weak"
        entryCondition := strongBearishSignal or weakBearishSignal
    else if entrySignalOptionsShort == "Bearish All"
        entryCondition := strongBearishSignal or neutralBearishSignal or weakBearishSignal
    entryCondition

isExitSignalShort() =>
    exitCondition = false
    if exitSignalOptionsShort == "None"
        exitCondition := false
    else if exitSignalOptionsShort == "Bullish Strong"
        exitCondition := strongBullishSignal
    else if exitSignalOptionsShort == "Bullish Neutral"
        exitCondition := neutralBullishSignal
    else if exitSignalOptionsShort == "Bullish Weak"
        exitCondition := weakBullishSignal
    else if exitSignalOptionsShort == "Bullish Strong and Neutral"
        exitCondition := strongBullishSignal or neutralBullishSignal
    else if exitSignalOptionsShort == "Bullish Neutral and Weak"
        exitCondition := neutralBullishSignal or weakBullishSignal
    else if exitSignalOptionsShort == "Bullish Strong and Weak"
        exitCondition := strongBullishSignal or weakBullishSignal
    else if exitSignalOptionsShort == "Bullish All"
        exitCondition := strongBullishSignal or neutralBullishSignal or weakBullishSignal
    exitCondition

// Strategy logic for entries and exits
if true
    if tradingMode == "Long"
        takeProfitLevelLong = strategy.position_avg_price * (1 + takeProfitPct / 100)
        stopLossLevelLong = strategy.position_avg_price * (1 - stopLossPct / 100)

        if isEntrySignalLong()
            strategy.entry("Enter Long", strategy.long)
        if (takeProfitPct > 0 and close >= takeProfitLevelLong) or (stopLossPct > 0 and close <= stopLossLevelLong) or (exitSignalOptionsLong != "None" and isExitSignalLong())
            strategy.close("Enter Long", comment="Exit Long")

    else if tradingMode == "Short"
        takeProfitLevelShort = strategy.position_avg_price * (1 - takeProfitPct / 100)
        stopLossLevelShort = strategy.position_avg_price * (1 + stopLossPct / 100)

        if isEntrySignalShort()
            strategy.entry("Enter Short", strategy.short)
        if (takeProfitPct > 0 and close <= takeProfitLevelShort) or (stopLossPct > 0 and close >= stopLossLevelShort) or (exitSignalOptionsShort != "None" and isExitSignalShort())
            strategy.close("Enter Short", comment="Exit Short")

```

> Detail

https://www.fmz.com/strategy/442501

> Last Modified

2024-02-22 13:38:50
