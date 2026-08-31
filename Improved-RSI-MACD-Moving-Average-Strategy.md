
> Name

Improved-RSI-MACD-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d659072572f1536b55.png)

# Overview

This is a combination strategy utilizing RSI, MACD and Moving Averages. It incorporates the overbought/oversold signals from RSI, the sensitivity of MACD and the indicator effect of moving averages when determining entry points.  

# Strategy Logic

The strategy mainly judges the following four conditions to decide long entry:

1. MACD histogram is greater than the set long entry level;
2. RSI is above 50, indicating overbought state; 
3. Short period EMA crosses above long period EMA, forming golden cross;
4. Close price breaks through long period EMA and is higher than long period EMA plus ATR stop loss range.

When the following two exit conditions are met, the strategy will close positions to stop loss:

1. MACD histogram is less than the set stop loss level; 
2. Short period EMA crosses below long period EMA, forming dead cross.

Thus the strategy timely stops loss and avoids huge losses when profit taking or retracement.

# Advantage Analysis 

The biggest advantage of this strategy lies in the combination use of indicators, giving full play to the merits of each indicator:

1. The application of RSI avoids the transaction fee loss caused by repeatedly opening positions in range-bound markets.

2. The sensitivity of MACD histogram indicator ensures timely capture of inflection points.

3. Moving averages filter out short-term market noise and give full play to indicator effect.

# Risks & Solutions

The main risks of this strategy include:

1. High retracement risk. The biggest risk of moving average like trend following strategies is large pullback caused by trend reversal. This can be actively controlled by means of position sizing, stop loss etc.

2. Difficulty in parameter optimization. Multi-indicator combined strategies have higher difficulty in parameter setting and optimization. Methods like walk forward, genetic algorithm can be adopted for optimized parameters.


# Enhancement Orientations 

The strategy can be further optimized in the following aspects:

1. Increase additional filters to further avoid false signals, e.g. combine with volume, volatility indicators etc.

2. Test parameter differences fitting more products. Adjust parameters to adapt more varieties. 

3. Optimize moving average parameter settings. Test the differences of various length parameters.

4. Research adaptive moving averages. Switch different parameter sets based on market regimes.


# Conclusion

In conclusion, this strategy is a typical optimized version of moving average and trend following strategy. It absorbs the strengths of mainstream indicators like MACD and RSI in aspects of timing entry and stopping loss. Next steps could be improving from perspectives like parameter optimization and risk control to make the strategy more robust and adaptable to more products, thereby resulting in higher stability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|14|lengthRSI|
|v_input_float_1|0.09|Stop Loss Percentage|
|v_input_float_2|0.15|Take Profit Percentage|
|v_input_2|12|fastlen|
|v_input_3|26|slowlen|
|v_input_4|9|siglen|
|v_input_5|false|Long Entry Level|
|v_input_6|false|Exit Level|
|v_input_7|8|Short EMA Length|
|v_input_8|21|Long EMA Length|
|v_input_float_3|2|atrMultiplier|
|v_input_int_2|20|atrLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-29 00:00:00
end: 2024-01-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Improved RSI MACD Strategy with Moving Averages", overlay=true)

// Inputs
src = input(close, title="RSI Source")

// RSI Settings
lengthRSI = input.int(14, minval=1)

// Stop Loss Settings
stopLossPct = input.float(0.09, title="Stop Loss Percentage")
takeProfitPct = input.float(0.15, title="Take Profit Percentage")

// MACD Settings
fastlen = input(12)
slowlen = input(26)
siglen = input(9)

// Strategy Settings
longEntry = input(0, title="Long Entry Level")
exitLevel = input(0, title="Exit Level")

// EMA Settings
emaShortLength = input(8, title="Short EMA Length")
emaLongLength = input(21, title="Long EMA Length")

atrMultiplier = input.float(2, title="atrMultiplier")
atrLength = input.int(20, title="atrLength")

// Indicators
rsi1 = ta.rsi(src, lengthRSI)
[macd, signal, hist] = ta.macd(src, fastlen, slowlen, siglen)

// Calculate EMAs
emaShort = ta.ema(src, emaShortLength)
emaLong = ta.ema(src, emaLongLength)

// Calculate ATR
atr = ta.atr(atrLength)

// Variables
var bool canEnterLong = na

// Strategy conditions
longCondition = hist > longEntry and rsi1 > 50 and emaShort > emaLong and close > emaLong + atrMultiplier * atr

// Entries and Exits
if hist < exitLevel and emaShort < emaLong
    canEnterLong := true
    strategy.close("Long")
    
// Store last entry price
var lastEntryPrice = float(na)
var lastEntryPrice2 = float(na)
if longCondition
    strategy.entry("Long", strategy.long)
    canEnterLong := false
    lastEntryPrice := close
if lastEntryPrice < close
    lastEntryPrice := close
// Calculate Stop Loss and Take Profit Levels based on last entry price
stopLossLevel = lastEntryPrice * (1 - stopLossPct)

// Check for stop loss and take profit levels and close position if triggered
if (strategy.position_size > 0)
    last_buy = strategy.opentrades[0]
    if (close < stopLossLevel)
        strategy.close("Long", comment="Stop Loss Triggered")
    if (close * (1 - takeProfitPct) > strategy.opentrades.entry_price(strategy.opentrades - 1) )
        strategy.close("Long", comment="Take Profit Triggered")
```

> Detail

https://www.fmz.com/strategy/437795

> Last Modified

2024-01-05 16:11:23
