
> Name

RSI趋势追踪型多头策略RSI-Trend-Following-Bull-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fa438e57f097a6738f.png)

## Overview

This strategy is a trend following bull strategy that uses RSI indicator to determine trend and MACD indicator to enter the market. It also incorporates EMA line as a trend filter and emergency stop loss to control risks.

## Strategy Logic

The strategy mainly relies on RSI indicator to determine trend direction. When RSI crosses above the set long line (default 21), it is considered that the market may reverse to an uptrend. At this time if MACD is already in a downtrend, it can be judged that it is at a reversal point, which is a good opportunity to go long.

In addition, the strategy also introduces EMA line (default 200 periods) as a trend filter. Only when price is above EMA line will long trade be considered. This can effectively filter fake reversals when trend is unclear or declining.

On the stop loss side, the strategy also sets regular stop loss line and emergency stop loss line. When RSI crosses below regular stop loss line (default 86), close position; if price drops sharply and RSI crosses below emergency stop loss line (default 73), close position unconditionally to control maximum loss.

## Advantage Analysis 

- Use RSI to identify reversal points, with MACD to filter false entries.
- Introduce EMA line to determine major trend.  
- Use both regular stop loss and emergency stop loss to control risks.

## Risk Analysis

- RSI reversal signals may have misjudgments. 
- EMA line cannot respond timely to major trend changes.
- Single stop loss indicator may stop profitable trades prematurely.  

## Optimization Directions

- Volume indicators or bull/bear candles ratio can be introduced as auxiliary judgment tools to improve entry accuracy.
- Moving average system can be adjusted to dynamically track most recent N days trend.
- Add more advanced stop loss mechanisms like moving stop loss or statistical stop loss to make stop loss more flexible.

## Summary 

In summary, this strategy is a relatively traditional trend following bull strategy. It identifies reversal points with RSI, filters misjudgments with MACD, determines major trend with EMA and controls risks with stop loss. The strategy is quite simple and intuitive, easy to understand, and has some advantage in judging market reversals, making it a good starting point strategy for algo trading. But there are still large rooms for further improvements by optimizing entry signals, trend judges and stop loss mechanisms.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Emergency Exit?|
|v_input_2|21|RSI Long Cross|
|v_input_3|86|RSI Close Long Position|
|v_input_4|73|RSI Emergency Close Long Position|
|v_input_5|true|Use EMA Trend Filter|
|v_input_6|200|EMA Length for Trend Filter|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-28 00:00:00
end: 2024-01-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dravitch
//@version=4
strategy("RSI - BULL RUN (Improved)", overlay=true)

// Input
UseEmergency = input(true, "Use Emergency Exit?")
RSIlong = input(21, "RSI Long Cross")
RSIcloseLong = input(86, "RSI Close Long Position")

EmergencycloseLong = input(73, "RSI Emergency Close Long Position")
UseEMAFilter = input(true, "Use EMA Trend Filter")
EMAlength = input(200, "EMA Length for Trend Filter")  // Utiliser 200 pour SMMA

// RSI
rsiValue = rsi(close, 14)

// MACD
[macdLine, signalLine, _] = macd(close, 12, 26, 9)

// EMA Trend Filter
emaTrend = sma(close, EMAlength)  // Utiliser sma pour la SMMA (Simple Moving Average)

// Conditions pour les trades longs
trendUp = close > emaTrend
trendDown = close < emaTrend
longCondition = crossover(rsiValue, RSIlong) and trendDown or crossunder(macdLine, signalLine) and crossover(rsiValue, RSIlong)
longCloseCondition = crossunder(rsiValue, RSIcloseLong) and trendUp
emergencyLongCondition = crossunder(rsiValue, EmergencycloseLong) 

// Plots
plot(rsiValue, color=color.white, linewidth=2, title="RSI")

// Strategy
if (longCondition)
    strategy.entry("Long", strategy.long, alert_message='RSI Long Cross: LONG')
if (longCloseCondition)
    strategy.close("Long", alert_message='RSI Close Long Position')
if (emergencyLongCondition and UseEmergency)
    strategy.close("Long", alert_message='RSI Emergency Close Long')

// Plot EMA Trend Filter in a separate pane
plot(emaTrend, color=color.rgb(163, 0, 122), title="EMA Trend Filter", linewidth=2, style=plot.style_line, transp=0)
hline(0, "Zero Line", color=color.gray)
```

> Detail

https://www.fmz.com/strategy/437689

> Last Modified

2024-01-04 17:48:41
