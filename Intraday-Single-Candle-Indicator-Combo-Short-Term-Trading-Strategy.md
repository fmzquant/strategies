
> Name

Intraday-Single-Candle-Indicator-Combo-Short-Term-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/3407edfcb27bebef05.png)

### Overview

This strategy combines multiple technical indicators on Bank Nifty to judge its short-term trend and generate trading signals. The key indicators used include MACD, RSI, ADX, Stochastic and Bollinger Bands. The strategy name "BankNifty_Bearish_Intraday" indicates its main use for judging Bank Nifty's short-term bearish trend.  

### Strategy Logic

The core logic is to send short signal when MACD, RSI, ADX, Stochastic and Bollinger Bands all show oversold condition; send exit position signal when 5-minute candle closes above 5-day MA line.  

Specifically, MACD's 5min, 15min and 60min all lower than previous candle means downtrend in three timeframes; RSI below 40 means oversold; ADX above 12 means trend establishing; Stochastic %K crosses below %D means downward momentum; Bollinger Lower Band breaks previous low means increasing volatility. When all these indicators trigger together, a short signal is generated.

The exit signal is when 5-minute candle closes above 5-day MA line, indicating potential short-term trend reversal.

Combining indicators across timeframes filters out noise and judges short-term trend more precisely. The stop loss exit also controls per trade risk.  

### Advantage Analysis

The biggest edge is the comprehensive indicator combo which accurately captures short-term trend, ideal for high frequency trading. Concrete advantages:

1. Cross timeframe analysis improves accuracy;  
2. Stop loss limits per trade loss;
3. High trading frequency suits aggressive short-term traders.

### Risk Analysis  

Main risks include inconsistent signals due to complex combo, and higher commissions from frequent trades. Concrete risks:  

1. Inconsistent signal may cause wrong entry or exit;
2. High frequency trades lead to higher commission fees; 
3. Need close market monitoring.

Solutions include simplifying indicator combo, adjusting stop loss, and limiting capital usage per trade.

### Optimization Directions  

Several optimization directions:  

1. Adjust indicator parameters for better signal accuracy;
2. Add other confirming indicators e.g. volume to ensure trend confidence;
3. Set dynamic stop loss based on market volatility;  
4. Perform cross timeframe analysis for key S&R levels;
5. Develop position sizing strategy based on volatility and risk management rules.

Proper parameter tuning, additions of confirming factors and robust risk control will enhance the strategy stability.  

### Summary

This short term trading strategy provides a fast entry/exit method for aggressive traders by combining signals from multiple single candle indicators. Pros are catching short-term momentum accurately and risk control; Cons are complex signal generation and high commission fees. Optimizations like parameter tuning, adding confirming factors, dynamic stop loss and cross timeframe analysis can improve strategy stability. Overall this offers useful ideas on high frequency trading worth learning from.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Stochastic Length|
|v_input_2|3|%K Smoothing|
|v_input_3|3|%D Smoothing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-17 00:00:00
end: 2024-01-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © makarandpatil

// This strategy is for Bank Nifty instrument and for intraday purpose only
// It checks for various indicators and gives a sell signal when all conditions are met
// Bank Nifty when in momentum gives 100-200 points in spot in 5-15 min which is how long the trade duration should be
// Issues - The custom script as per TradingView Pinescripting has an issue of repaint
// More information on repainting issue in this link - https://www.tradingview.com/pine-script-docs/en/v5/concepts/Repainting.html
// Use the script alert only to get notified, however check all the parameters individually before taking the trade
// Also, please perform a backtesting and deep backtesting of this strategy to see if the strategy gave correct buy signals in the past
// The script is made for testing purposes only and is in beta mode. Please use at own risk.


//@version=5
strategy("BankNifty_Bearish_Intraday", overlay=true, margin_long=100, margin_short=100)

// Variables
StochLength = input(14, title="Stochastic Length")
smoothK = input(3, title="%K Smoothing")
smoothD = input(3, title="%D Smoothing")

//INDICATOR CALCULATIONS

// 1. MACD
[macdLine, signalLine, histLine] = ta.macd(close[0],12,26,9)
macd5 = request.security(syminfo.tickerid, "5", macdLine)
macd15 = request.security(syminfo.tickerid,"15",macdLine)
macd60 = request.security(syminfo.tickerid,"60",macdLine)

// 2. RSI Calculation
xRSI = ta.rsi(close, 14)

// 3. ADX calculation
[diplus, diminus, adx] = ta.dmi(14,14)

// 4. Stochastic Calculation
k = ta.sma(ta.stoch(close, high, low, StochLength), smoothK)
d = ta.sma(k, smoothD)

// 5. Bollinger Band calculation
[middle, upper, lower] = ta.bb(close, 20, 2)

//CONDITIONS

// 1. Conditions for MACD
macd5Downtick = macd5[0] < macd5[1]
macd15Downtick = macd15[0] < macd15[1]
macd60Downtick = macd60[0] <= macd60[1]

// 2. Condition for xRSI
RSIWeak = xRSI < 40

// 3. Condition for ADX
ADXUngali = adx >= 12

// 4. Condition for Stochastic
StochNCO = k < d

// 5. Condition for Bollinger Band
BBCD = lower < lower [1]

//Evaluate the short condition
shortCondition = macd5Downtick and macd15Downtick and macd60Downtick and RSIWeak and ADXUngali and StochNCO and BBCD
// shortCondition = macd5Downtick and macd15Downtick and RSIWeak and ADXUngali and StochNCO
if (shortCondition)
    strategy.entry("Short", strategy.short, alert_message = "BankNifty_Sell_Momentum")

longCondition = close > ta.ema(close,5)
if (longCondition)
    strategy.entry("ShortSquareoff", strategy.long, alert_message = "BankNifty_Closed_Above_5EMA")

```

> Detail

https://www.fmz.com/strategy/439871

> Last Modified

2024-01-24 15:04:34
