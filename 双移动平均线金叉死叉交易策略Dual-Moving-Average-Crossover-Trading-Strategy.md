
> Name

双移动平均线金叉死叉交易策略Dual-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



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
