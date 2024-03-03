
> Name

双移动平均线金叉死叉交易策略Dual-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略运用双移动平均线的金叉死叉来判断趋势,以发出买入和卖出信号。当快速移动平均线从下方上穿慢速移动平均线时,产生金叉,买入信号出现。当快速移动从上方下穿慢速移动平均线时,产生死叉,卖出信号出现。

## 策略原理

该策略由以下几部分组成:

1. 计算价格的百分比形式的振荡器值。振荡器的值为价格减去一个中值的百分比。中值由例如20日最高价和最低价的平均值计算。

2. 计算振荡器值的移动平均线,如20日hull移动平均线。

3. 计算移动平均线的延迟值,如12日延迟。

4. 判断移动平均线是否上穿或下穿延迟移动平均线,出现金叉或死叉信号。

5. 发出买入和卖出信号。

具体来说,策略首先计算价格的振荡器值,然后计算振荡器的移动平均线,再计算该移动平均线的延迟值。 

当振荡器移动平均线上穿延迟移动平均线时,产生金叉信号,做多;当振荡器移动平均线下穿延迟移动平均线时,产生死叉信号,做空。

这样,通过判断双移动平均线的交叉情况,决定交易方向。

## 优势分析

该策略具有以下优势:

1. 使用双移动平均线过滤虚假信号,提高信号的可靠性。

2. 运用快速和慢速均线组合,抓住中期趋势。快速均线对价格变化敏感,慢速均线有滞后性,组合使用可以在滤除短期噪音的同时捕捉到中期趋势反转。

3. 振荡器的使用可以突出突破点,产生更明确的交易信号。 

4. 可自定义移动平均线算法和参数,适应不同市场环境。

5. 策略逻辑简单清晰,容易理解和实现,适合新手学习。

## 风险分析

该策略也存在以下风险:

1. 双移动平均线交叉产生信号滞后,可能错过最佳入场点位。

2. 双移动平均线在盘整市中容易产生错误信号。

3. 无法判断趋势强弱,可能在牛市中过早离场。

4. PARAMETERS可调参数过多,不易优化找到最佳参数组合。

5. 没有止损机制,无法控制单笔损失。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化移动平均线的类型和参数,测试不同组合在不同市场中的稳定性。

2. 增加趋势判断指标,如ADX,避免因错误信号打开不必要交易。

3. 添加止损策略,如移动止损或百分比止损,控制单笔损失。

4. 结合其他指标,如交易量能量,RSI等,提高交易信号质量。

5. 使用机器学习方法自动优化参数,得到更稳定参数设置。

6. 考虑适当放宽入场条件,以减少漏单可能。

## 总结

该双移动平均线金叉死叉策略,通过快速和慢速均线的组合匹配,在滤除短期市场噪音的同时,捕捉到价格中期趋势的转折点,以此产生交易信号。该策略优点是简单易于实现,容易理解,新手友好。但也存在产生错误信号、无法判断趋势强度等缺点。通过优化移动平均线参数,添加趋势判断指标,设置止损条件等,可以改进该策略,使之更适合不同市场环境。总体来说,双移动平均线策略是一种实用的技术指标策略,值得进行相应优化调整后实盘验证。

|| 


## Overview 

This strategy uses the golden cross and death cross of dual moving averages to determine the trend and generate buy and sell signals. When the fast moving average crosses above the slow moving average from below, a golden cross occurs and a buy signal is generated. When the fast moving average crosses below the slow moving average from above, a death cross occurs and a sell signal is generated.

## Strategy Logic

The strategy consists of the following components:

1. Calculate the oscillator value of the price in percentage form. The oscillator value is the percentage of the price minus a median value. The median value is calculated as the average of example 20-day highest and lowest prices.

2. Calculate the moving average of the oscillator values, such as 20-day Hull moving average. 

3. Calculate the lagging value of the moving average, such as 12-day lag.

4. Determine if the moving average crosses above or below the lagging moving average, generating golden cross or death cross signals. 

5. Issue buy and sell signals.

Specifically, the strategy first calculates the oscillator value of the price, then the moving average of the oscillator, and then the lagging value of the moving average.

When the oscillator moving average crosses above the lagging moving average, a golden cross signal is generated for going long. When the oscillator moving average crosses below the lagging moving average, a death cross signal is generated for going short.

By judging the crossover of the dual moving averages, the trading direction is determined.

## Advantage Analysis

The advantages of this strategy include:

1. Using dual moving averages filters false signals and improves signal reliability.

2. Combining fast and slow moving averages captures mid-term trends. The fast MA is sensitive to price changes while the slow MA has lagging quality. Combining both filters out short-term noise while catching mid-term trend reversals.

3. The oscillator highlights breakout points and generates clearer trading signals.

4. Customizable MA algorithms and parameters suit different market environments. 

5. Simple and clear strategy logic, easy to understand and implement, beginner friendly.

## Risk Analysis

The risks of this strategy include:

1. Dual MA crossovers have lagging signals, potentially missing best entry points.

2. Prone to wrong signals during range-bound markets.

3. Unable to determine trend strength, risks early exit during bull markets.

4. Too many adjustable parameters, difficult to optimize for best parameter combinations.

5. No stop loss mechanism, unable to control single trade loss.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize MA types and parameters, test stability in different markets.

2. Add trend determining indicators like ADX to avoid unnecessary trades from wrong signals.

3. Add stop loss mechanisms like trailing stop or percentage stop to control single trade loss.

4. Incorporate other indicators like volume, RSI to improve signal quality.

5. Use machine learning to auto optimize parameters for more robust settings.

6. Consider slightly relaxing entry conditions to reduce missed trades.

## Summary

This dual moving average crossover strategy captures mid-term trend reversal points by combining fast and slow moving averages, filtering out short-term market noise. It has the advantage of being simple, easy to understand and beginner friendly. But it also has drawbacks like generating wrong signals and inability to determine trend strength. The strategy can be improved by optimizing MA parameters, adding trend filters, setting stop loss conditions etc to suit different market environments. Overall, the dual MA strategy is a practical technical indicator based strategy worth verifying through optimization and live testing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|────────────{ Oscillator }──────────────|
|v_input_2|20|Example Length|
|v_input_3|0|Oscillator Format: Percent|Currency|
|v_input_4|false|─────────────{ Average }──────────────|
|v_input_5|0|Average Type: Hull|Sma|Ema|Wma|
|v_input_6|50|Average Length|
|v_input_7|12|Average Lagg|
|v_input_8|true|Display Average|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © EvoCrypto

//@version=4
strategy("Distance Oscillator Strategy- evo", shorttitle="Distance Oscillator Strategy")

// INPUTS {
na_1                =   input(false,    title="────────────{ Oscillator }──────────────")

// Osc_Src             =   input(close,    title="Oscillator Source                                ")

Example_Length      =   input(20,       title="Example Length", minval=1)
Osc_Src             =   (highest(Example_Length) + lowest(Example_Length)) / 2

// Strategy can not let you choose a Moving Average to connect with like the study version, so I use the MA above as example

Osc_Format          =   input("Percent",title="Oscillator Format",              options=["Percent", "Currency"]) 

na_2                =   input(false,    title="─────────────{ Average }──────────────")
Average_Type        =   input("Hull",   title="Average Type",                   options=["Hull", "Sma", "Ema", "Wma"])
Length              =   input(50,       title="Average Length", minval=1)
Lagg                =   input(12,       title="Average Lagg",   minval=1)
Display_MA          =   input(true,     title="Display Average")
// }

// SETTINGS {
Osc_Sum             =   
 Osc_Format == "Percent"  ? (close - Osc_Src) / close * 100 :
 Osc_Format == "Currency" ? (close - Osc_Src)               : na

Osc_MA              =   Display_MA == false ? na:
 Average_Type == "Hull"? hma(Osc_Sum, Length)   :
 Average_Type == "Sma" ? sma(Osc_Sum, Length)   :
 Average_Type == "Ema" ? ema(Osc_Sum, Length)   :
 Average_Type == "Wma" ? wma(Osc_Sum, Length)   : na
Osc_MA_1            =   Osc_MA[Lagg]

Cross_Up            =   crossover( Osc_MA, Osc_MA_1)
Cross_Down          =   crossunder(Osc_MA, Osc_MA_1)

Osc_Color           =   Osc_Sum > 0         ? color.new(#bbdefb, 70)  : Osc_Sum < 0          ? color.new(#000000, 70)  : na
Average_Color       =   Osc_MA  > Osc_MA_1  ? color.new(#311b92, 100) : Osc_MA  < Osc_MA_1   ? color.new(#b71c1c, 100) : na
// }

// PLOT {
plot(Osc_Sum,                           title="Oscillator", color=Osc_Color, style=plot.style_histogram, linewidth=2)

Plot_0              =   plot(Osc_MA,    title="Osc Average",color=#b71c1c, linewidth=2)
Plot_1              =   plot(Osc_MA_1,  title="Osc Average",color=#311b92, linewidth=2)
fill(Plot_0, Plot_1,                    title="Average",    color=Average_Color)

plotshape(Cross_Up   ? Osc_MA_1 : na,   title="Cross Up",   color=#bbdefb, location=location.absolute, size=size.tiny, style=shape.circle)
plotshape(Cross_Down ? Osc_MA_1 : na,   title="Cross Down", color=#000000, location=location.absolute, size=size.tiny, style=shape.circle)
// }

// STRATEGY {
if (Cross_Up)
    strategy.entry("Long", strategy.long)
if (Cross_Down)
    strategy.entry("Short", strategy.short)
// }
```

> Detail

https://www.fmz.com/strategy/428629

> Last Modified

2023-10-07 16:39:01
