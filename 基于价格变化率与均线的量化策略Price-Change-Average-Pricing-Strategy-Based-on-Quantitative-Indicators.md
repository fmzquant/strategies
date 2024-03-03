
> Name

基于价格变化率与均线的量化策略Price-Change-Average-Pricing-Strategy-Based-on-Quantitative-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b31ba52820b24fb570.png)
[trans]

## 概述

该策略结合了价格变化率和均线的技术指标,实现买入点和卖出点的精确定位。当价格出现明显下跌时建立买入阈值,并在进一步下跌时打开多头仓位;当价格上涨时建立卖出阈值,在继续上涨时平仓。同时,策略还采用加仓方式,分多次买入,降低成本。

## 策略原理

### 买入逻辑

1. 计算价格变化率ROC,并设定买入阈值线。
2. 当价格跌破买入阈值线时,记录该点并启动买入限定线。 
3. 买入限定线根据输入参数设定持续时间,过期后关闭。
4. 当价格继续下跌并跌破买入限定线时,打开首个多头仓位。

### 卖出逻辑

1. 计算价格变化率ROC,并设定卖出阈值线。  
2. 当价格涨破卖出阈值线时,记录该点并启动卖出限定线。
3. 卖出限定线根据输入参数设定持续时间,过期后关闭。
4. 当价格继续上涨并涨破卖出限定线时,平掉全部多头仓位。

### 风险控制

策略内置止损和止盈功能,可自定义参数,实时控制存在仓位的风险。

### 加仓方式

每开启一个交易仓位,根据输入参数以一定比例设定后续的买入价格,实现分批买入加仓的效果。

## 优势分析

1. 运用价格变化率指标ROC寻找买卖点位, ROC对价格变化非常敏感,买卖点定位准确。
2. 采用限定线方式进一步确认买卖时机,避免假突破。 
3. 加仓方式可在保证风险可控的基础上追踪市场价值。
4. 内置止损止盈功能严格控制单笔仓位风险。

## 风险及解决方案

1. 市场出现剧烈波动时,策略可能打开过多仓位。解决方法是合理设定加仓的参数,控制仓位总数。
2. 价格震荡趋势不明时,止损或止盈价格可能被频繁触发。可适当放宽止盈止损幅度,或关停该功能。

## 优化建议

1. 结合其他指标过滤入场时机。例如配合均线,只在价格跌破均线时采信ROC指标。
2. 优化加仓逻辑,在满足一定条件下才启动加仓。例如只在价格再度下跌超过一定幅度时继续加仓。  
3. 不同品种的参数设置会有较大差异,需要充分的回测和模拟实盘以取得最佳参数组合。
4. 可设置自适应止盈止损,根据市场波动程度设定不同的止损幅度。

## 总结

该策略综合运用了ROC指标精确定位买卖点,限定线方式过滤信号,内置止盈止损防范风险,并通过加仓扩大获利。在参数设置合理的前提下,可在保证风险在可控范围的同时获取超额收益。未来可进一步优化信号过滤与风控机制,使策略适应更多市场环境。

||


## Overview  

This strategy combines the price change rate and moving average technical indicators to locate the buy and sell points accurately. When the price drops sharply, a buy threshold is established. And when the price continues to fall, long positions are opened. When the price rises, a sell threshold is set up. And existing long positions are closed out when the price keeps rising and breaks through the sell threshold. At the same time, the strategy also adopts the pyramiding method to open multiple long positions at different price levels to lower the cost.

## Principles  

### Long Entry Logic

1. Calculate the Rate of Change (ROC) of the price, and set up the long entry threshold line.  
2. When the price breaks through the long entry threshold downwards, record this breakpoint and initiate the long entry limit line.
3. The long entry limit line lasts for a certain duration defined by input parameters and expires afterwards.  
4. When the price continues to fall and crosses below the long entry limit line, the first long position is opened.   

### Long Close Logic  

1. Calculate the Rate of Change (ROC) of the price, and set up the long close threshold line.   
2. When the price breaks through the long close threshold upwards, record this breakpoint and initiate the long close limit line.  
3. The long close limit line lasts for a certain duration defined by input parameters and expires afterwards. 
4. When the price continues to rise and crosses above the long close limit line, all existing long positions are closed.  

### Risk Control

The strategy has built-in stop loss and take profit functions that can be customized to control risks dynamically.  

### Pyramiding 

When opening each new trade position, the system calculates the subsequent long entry price according to the input percentage parameters, thus implementing averaging down through multiple long entries.

## Advantages

1. Adopt the rate of change (ROC) indicator to locate buy and sell signals accurately. ROC is very sensitive to price changes.
2. Use limit lines for further confirmation of entry and exit signals to avoid false breaks. 
3. The pyramiding method tracks market value while keeping risks under control. 
4. Built-in stop loss and take profit strictly controls risks for each position.

## Risks & Solutions

1. Fierce market fluctuation may lead to too many open positions. We can set reasonable parameters for pyramiding to limit total open positions.  
2. Stop loss or take profit may get triggered frequently when the market is ranging. We can loosen the percentage levels or even disable SL & TP in sideways markets.

## Optimizations 

1. Combine with other indicators like moving averages to filter entry signals. Only adopt ROC signals when prices actually break the MA lines.   
2. Improve the pyramiding logic, open subsequent positions only when prices continue to fall by a certain percentage instead of just lowering the entry price. 
3. Optimal parameter settings may differ significantly across trading instruments. Extensive backtest and demo trading is necessary.
4. Build an adaptive stop loss mechanism with different percentage levels based on market volatility conditions. 

## Conclusion  

The strategy effectively combines accurate entry signals with limit line filters, built-in risk management functions, and pyramiding for position sizing. With reasonable parameter tuning, it can acquire excess returns while keeping risks in check. Future improvements may focus more on signal filtering methods and risk control for broader market adaptability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|(?Risk)Portfolio Percentage|
|v_input_2|true|Leverage|
|v_input_3|5|Broker Maintenance Margin Percentage|
|v_input_4|true|Take Profit|
|v_input_5|5.6|Percentage|
|v_input_6|true|Stop Lossss |
|v_input_7|2.5|Percentage|
|v_input_8|2|(?Price Averaging Layers)2nd Layer Long Entry %|
|v_input_9|5|3rd Layer Long Entry %|
|v_input_10|9|4th Layer Long Entry %|
|v_input_11|3|(?ROC Logic to OPEN Long Entry)Rate of Change bar lookback|
|v_input_12|0.5|ROC Threshold % to Setup Long Entry|
|v_input_13|0.5|Price Drop Threshold % to OPEN Long Entry|
|v_input_14|3|Duration of Long Entry Threshold Line in bars|
|v_input_15|0.8|Min % of Price Drop to OPEN Long Entry|
|v_input_16|3|(?ROC Logic to CLOSE Long Entry)Rate of Change bar lookback|
|v_input_17|0.8|ROC Threshold % to Setup Close Threshold|
|v_input_18|1.7|Price Rise Threshold % to CLOSE Long Entry|
|v_input_19|3|Duration of Entry Limit in bars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-04 00:00:00
end: 2023-12-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// @version=4
// © A3Sh

// Rate of price change / Price averaging strategy //
// When the price drops to a specified percentage, a Long Entry Threshold is setup.
// The Long Entry Threshold is only active for a specified number of bars and will de-activate when not crossed. 
// When the price drops further and crosses the Entry Threshold with a minimum of a specified percentage, a Long Position is entered. 
// The same reverse logic used to close the Long Position.
// Stop loss and take profit are active by default. With proper tweaking of the settings it is possible to de-activate SL and TP.

// The strategy is inspired by the following strategies:
// Price Change Scalping Strategy developed by Prosum Solutions, https://www.tradingview.com/script/ue7Uc3sN-Price-Change-Scalping-Strategy-v1-0-0/
// Scalping Dips On Trend Strategy developed by Coinrule, https://www.tradingview.com/script/iHHO0PJA-Scalping-Dips-On-Trend-by-Coinrule/

strategy(title = "ROC_PA_Strategy_@A3Sh", overlay = true )

// Portfolio & Leverage Example
// credit: @RafaelZioni, https://www.tradingview.com/script/xGk5K4DE-BTC-15-min/
ge(value, precision) => round(value * (pow(10, precision))) / pow(10, precision)

port     = input(25, group = "Risk", title = "Portfolio Percentage", type = input.float, step = 0.1, minval = 0.1, maxval = 200)
leverage = input(1,  group = "Risk", title = "Leverage", minval = 1, maxval = 100)
mm       = input(5,  group = "Risk", title = "Broker Maintenance Margin Percentage", type = input.float, step = 0.1, minval = 0.1, maxval = 200)

c = ge((strategy.equity * leverage / open) * (port  / 100), 4)

// Take Profit
tpa = input(true, type = input.bool,  title = "Take Profit", group = "Risk", inline = "Take Profit")
tpp = input(5.6,    type = input.float, title = "Percentage" , group = "Risk", step = 0.1, minval = 0.1, inline = "Take Profit")
tp  = strategy.position_avg_price + (strategy.position_avg_price / 100 * tpp)
plot (tpa and strategy.position_size > 0 ? tp : na, color = color.gray, title = "take profit", style= plot.style_linebr, linewidth = 1)

// Stop Loss
sla = input(true, type = input.bool, title = "Stop Lossss ", group = "Risk", inline = "Stop Loss")
slp = input(2.5,   type = input.float, title = "Percentage",   group = "Risk", step = 0.1, minval = 0.1, inline = "Stop Loss")
sl  = strategy.position_avg_price - (strategy.position_avg_price / 100 *slp)
plot (sla and strategy.position_size > 0 ? sl : na, color = color.red, title = "stopp loss", style= plot.style_linebr, linewidth = 1)

stopLoss = sla ? sl : na

// Long position entry layers. Percentage from the entry price of the the first long
ps2 = input(2, group = "Price Averaging Layers", title = "2nd Layer Long Entry %", step = 0.1)
ps3 = input(5, group = "Price Averaging Layers", title = "3rd Layer Long Entry %", step = 0.1)
ps4 = input(9, group = "Price Averaging Layers", title = "4th Layer Long Entry %", step = 0.1)

// ROC_Trigger Logic to open Long Position
rocLookBack  = input(3,   group = "ROC Logic to OPEN Long Entry", title="Rate of Change bar lookback")
rocThreshold = input(0.5, group = "ROC Logic to OPEN Long Entry", title="ROC Threshold % to Setup Long Entry", step = 0.1)
entryLimit   = input(0.5, group = "ROC Logic to OPEN Long Entry", title="Price Drop Threshold % to OPEN Long Entry", step = 0.1)
entryTime    = input(3,   group = "ROC Logic to OPEN Long Entry", title="Duration of Long Entry Threshold Line in bars")
minLimit     = input(0.8, group = "ROC Logic to OPEN Long Entry", title="Min % of Price Drop to OPEN Long Entry", step = 0.1)

//ROC calculation based to the price level of previous X bars
roc = close[rocLookBack]  - (close / 100 * rocThreshold)
plot (roc, color = color.gray, title = "roc threshold", linewidth = 1 , transp = 20)

rocT1      = open > roc and close < roc ? 1 : 0 // When the price CROSSES the Entry Limit
rocT2      = (open < roc) and (close < roc) ? 1 : 0 // When the price is BELOW the Entry Limit
rocTrigger = rocT1 or rocT2

// Condition for Setting Up a Long Entry Thershold Line
rocCrossed    = false
var SetUpLong = false

if rocTrigger and not SetUpLong

    rocCrossed := true
    SetUpLong  := true

// Defining the Value of the Long Entry Thershold
condforValue = rocCrossed and (open - low) / (open / 100) > 0 or (open < roc and close < roc) ? low - (close / 100 * entryLimit) : roc - (close / 100 * entryLimit)
openValue    = valuewhen (rocCrossed, condforValue, 0)

// Defining the length of the Long Entry Thershold in bars, specified with an input parameter
sincerocCrossed = barssince (rocCrossed)
plotLineOpen    = (sincerocCrossed <= entryTime) ? openValue : na
endLineOpen     = sincerocCrossed == entryTime  ? 1 : 0

// Set the conditions back to false when the Entry Limit Threshold Line ends after specied number of bars
if endLineOpen and SetUpLong
    
    rocCrossed := false
    SetUpLong  := false    

// Set minimum percentage of price drop to open a Long Position.
minThres = (open - close) / (open / 100) > minLimit ? 1 : 0

// Open Long Trigger
openLong = crossunder (close, plotLineOpen) and strategy.position_size == 0 and minThres

plot (strategy.position_size == 0 ? plotLineOpen : na, title = "Long Entry Threshold", color= color.yellow, style= plot.style_linebr, linewidth = 2)

// Show vertical dashed line when long condition is triggered 
// credit: @midtownsk8rguy, https://www.tradingview.com/script/EmTkvfCM-vline-Function-for-Pine-Script-v4-0/
vline(BarIndex, Color, LineStyle, LineWidth) => 
    return = line.new(BarIndex, low - tr, BarIndex, high + tr, xloc.bar_index, extend.both, Color, LineStyle, LineWidth) 
// if (openLong)
//     vline(bar_index, color.blue, line.style_dashed, 1)

// ROC_Trigger Logic to close Long Position
rocLookBackL    = input(3,   group = "ROC Logic to CLOSE Long Entry", title = "Rate of Change bar lookback")
entryThresholdL = input(0.8, group = "ROC Logic to CLOSE Long Entry", title = "ROC Threshold % to Setup Close Threshold", step = 0.1) // Percentage from close price
entryLimit_CL   = input(1.7, group = "ROC Logic to CLOSE Long Entry", title = "Price Rise Threshold % to CLOSE Long Entry", step = 0.1) // Percentage from roc threshold
entryTime_CL    = input(3,   group = "ROC Logic to CLOSE Long Entry", title = "Duration of Entry Limit in bars")

roc_CL = close[rocLookBackL]  + (close/100 *entryThresholdL)
//plot(rocL, color=color.gray, linewidth=1, transp=20)

rocT1_CL = open < roc_CL and close > roc_CL ? 1 : 0
rocT2_CL = (open > roc_CL) and (close > roc_CL)  ? 1 : 0 
rocTrigger_CL = rocT1_CL or rocT2_CL

// Condition for Setting Up a Long CLOSE Thershold Line
rocCrossed_CL  = false

var SetUpClose = false

if rocTrigger_CL and not SetUpClose
    // The trigger for condA occurs and the last condition set was condB.
    rocCrossed_CL := true
    SetUpClose    := true

// Defining the Value of the Long CLOSE Thershold
condforValue_CL= rocCrossed_CL and (high - open) / (open / 100) > 0 or (open > roc_CL and close > roc_CL) ? high + (close / 100 * entryLimit_CL) : roc_CL + (close / 100 * entryLimit_CL)
closeValue = valuewhen (rocCrossed_CL, condforValue_CL, 0)

// Defining the length of the Long CLOSE Thershold in bars, specified with an input parameter
sincerocCrossed_CL = barssince(rocCrossed_CL)
plotLineClose = (sincerocCrossed_CL <= entryTime_CL) ? closeValue : na
endLineClose = (sincerocCrossed_CL == entryTime_CL)  ? 1 : 0

// Set the conditions back to false when the CLOSE Limit Threshold Line ends after specied number of bars
if endLineClose and SetUpClose

    rocCrossed_CL := false
    SetUpClose := false    

plot(strategy.position_size > 0 ? plotLineClose : na, color = color.white, title = "Close Long Threshold", style = plot.style_linebr, linewidth = 2)

// ROC Close + Take Profit combined
closeCondition = close < tp ? plotLineClose : tpa ? tp : plotLineClose

// Store values to create and plot the different PA layers
long1 = valuewhen(openLong, close, 0)
long2 = valuewhen(openLong, close - (close / 100 * ps2), 0)
long3 = valuewhen(openLong, close - (close / 100 * ps3), 0)
long4 = valuewhen(openLong, close - (close / 100 * ps4), 0)

eps1 = 0.00
eps1 := na(eps1[1]) ? na : eps1[1]

eps2 = 0.00
eps2 := na(eps2[1]) ? na : eps2[1]

eps3 = 0.00
eps3 := na(eps3[1]) ? na : eps3[1]

eps4 = 0.00
eps4 := na(eps4[1]) ? na : eps4[1]

plot (strategy.position_size > 0 ? eps1 : na, title = "Long 1 Layer", style = plot.style_linebr)
plot (strategy.position_size > 0 ? eps2 : na, title = "Long 2 Layer", style = plot.style_linebr)
plot (strategy.position_size > 0 ? eps3 : na, title = "Long 3 Layer", style = plot.style_linebr)
plot (strategy.position_size > 0 ? eps4 : na, title = "Long 4 Layer", style = plot.style_linebr)

// Ener Long Positions
if (openLong and strategy.opentrades == 0) 
    eps1 := long1
    eps2 := long2
    eps3 := long3
    eps4 := long4
    strategy.entry("Long1", strategy.long, c, comment = "a=binance2 e=binance s=bnbusdt b=buy q=20% t=market")

if (strategy.opentrades == 1)
    strategy.entry("Long2", strategy.long, c, limit = eps2, comment = "a=binance2 e=binance s=bnbusdt b=buy q=25% t=market")

if (strategy.opentrades == 2)
    strategy.entry("Long3", strategy.long, c, limit = eps3, comment = "a=binance2 e=binance s=bnbusdt b=buy q=33.3% t=market")

if (strategy.opentrades == 3)
    strategy.entry("Long4", strategy.long, c, limit = eps4, comment = "a=binance2 e=binance s=bnbusdt b=buy q=50% t=market")

// Setup Limit Close / Take Profit / Stop Loss order 
strategy.exit("Exit", stop = stopLoss, limit = closeCondition, when =(rocTrigger_CL and strategy.position_size > 0), comment= "a=binance2 e=binance s=bnbusdt b=sell q=100% t=market")

// Make sure that all open limit orders are canceled after exiting all the positions 
longClose = strategy.position_size[1] > 0 and strategy.position_size == 0 ? 1 : 0   

if longClose
    strategy.cancel_all()



```

> Detail

https://www.fmz.com/strategy/434951

> Last Modified

2023-12-11 11:18:56
