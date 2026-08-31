
> Name

DEMA-MACD-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12cf57a3564f8eca10f.png)

## Overview

The name of this strategy is DEMA MACD Combination Strategy. It combines the DEMA moving average indicator and the MACD indicator to generate buy and sell signals with dual indicator confirmation. Its main idea is to use both the DEMA trend indicator and the MACD momentum indicator for multiple confirmations to improve signal accuracy and achieve better strategy performance.

## Strategy Logic

The strategy is mainly based on the combination of the DEMA moving average indicator and the MACD indicator. The specific logic is:

1. Calculate the 21-day DEMA moving average. When the closing price crosses above the DEMA line, it is considered a buy signal. When it crosses below, it is considered a sell signal.

2. Calculate the MACD histogram value and add an optional parameter to control whether the MACD histogram needs to be greater than 0 as an additional confirmation for the buy signal.

3. When a DEMA buy signal appears, if the additional confirmation of MACD histogram greater than 0 is enabled, the actual buy signal will only be triggered after the MACD histogram turns positive.

4. When a DEMA sell signal appears, a sell signal is issued directly without requiring additional MACD confirmation.

Through this dual indicator combination, the DEMA line can be used to judge the trend direction, while the MACD histogram is used to determine if the market is in the early stage of the trend to avoid false breaks and increase profit potential. The MACD histogram greater than zero confirmation for buys makes sure the strategy only buys during uptrends, while fast DEMA confirmation for sells allows the strategy to cut losses in a timely manner.

## Advantage Analysis 

The main advantages of combining the DEMA and MACD indicators in this strategy are:

1. DEMA is more sensitive and can timely capture trend changes and avoid getting caught in rang bound traps.

2. MACD histogram greater than 0 confirmation filters out false signals and only buys at the beginning of trends, expanding profit potential.

3. Selling directly on DEMA down crosses without MACD confirmation allows quick stop losses and maximizes preserved profits.

4. Dual indicator verification improves signal accuracy and reduces incorrect trades. 

5. Large optimization space for parameters which can be tuned to adapt to different market environments.

## Risk Analysis

The main risks of this strategy are:

1. DEMA being too sensitive may also lead to more false signals, requiring MACD to filter signals.

2. MACD has lag and may miss best entry points. Other leading indicators should be considered in combination.

3. Reliance on parameter optimization with varying performance across markets. Continuous backtesting is needed to find optimal parameters.

4. Serial correlation risk with both DEMA and MACD relying on EMA in calculations. Signal accuracy needs verification.

Solutions:

1. Add other indicator filters to construct multi-indicator combos to reduce false signals.

2. Try replacing MACD with leading indicators like BB or KD to capture turns earlier.  

3. Build in parameter optimization and update mechanisms to evaluate parameter robustness in real-time.

4. Introduce unrelated indicators to reduce correlation risk.

## Optimization Directions

Main optimization directions for this strategy include:

1. Trying different DEMA parameter sets to find optimal combos. DEMA parameters directly control strategy sensitivity.

2. Adding stop loss mechanisms. Currently strategy only relies on DEMA downs for stops. Trailing stops or percentage stops can be added.

3. Replacing MACD with other leading indicators for earlier signals, e.g. Bollinger Bands or KDJ.

4. Introducing unrelated indicators to improve robustness, e.g. volume, volatility indicators.

5. Building parameter optimization and update mechanisms to continuously evaluate parameter health and auto adjust.

## Conclusion

This strategy combines the DEMA moving average and the MACD indicator to take advantage of both for signal confirmation and issuance. Compared to single indicator strategies, it has higher sensitivity and signal accuracy. There is also room for improvement by optimizing parameters, adding stops, introducing leading indicators etc to make the strategy more robust and intelligent.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|DemaLength|
|v_input_2|false|Control 'MACD Histogram is positive?' when Buy condition|
|v_input_3|true|From Month|
|v_input_4|true|From Day|
|v_input_5|2020|From Year|
|v_input_6|true|To Month|
|v_input_7|true|To Day|
|v_input_8|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-14 00:00:00
end: 2023-12-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © melihtuna

//@version=1
strategy("DEMA Strategy with MACD", overlay=true)

// === Trend Trader Strategy ===
DemaLength = input(21, minval=1)
MacdControl = input(false, title="Control 'MACD Histogram is positive?' when Buy condition")

e1 = ema(close, DemaLength)
e2 = ema(e1, DemaLength)
dema1 = 2 * e1 - e2
pos = close > dema1 ? 1 : 0 
barcolor(pos == 0 ? red: pos == 1 ? green : blue )    
plot(dema1, color= blue , title="DEMA Strategy with MACD")

// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2020, title = "From Year", minval = 2017)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

// === MACD ===
[macdLine, signalLine, histLine] = macd(close, 12, 26, 9)
macdCond= MacdControl ? histLine[0] > 0 ? true : false : true

strategy.entry("BUY", strategy.long, when = window() and pos == 1 and macdCond)
strategy.entry("SELL", strategy.short, when = window() and pos == 0)



```

> Detail

https://www.fmz.com/strategy/436092

> Last Modified

2023-12-21 10:49:45
