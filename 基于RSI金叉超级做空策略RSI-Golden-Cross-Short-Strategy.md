
> Name

基于RSI金叉超级做空策略RSI-Golden-Cross-Short-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/207fa87c14544977ee5.png)

### I. Strategy Overview  

The RSI Golden Cross Short strategy utilizes ATR bands, double RSI indicators and golden cross of EMAs to identify trends and entries. The ATR bands determine overbought/oversold levels, double RSI indicators confirm the trend, and EMA crossovers identify opportunity for entries. This simple yet flexible short strategy can be highly effective for profit.

### II. Strategy Logic   

This strategy combines ATR bands, double RSI indicators and EMA lines to generate entry signals. When price opens above the upper ATR band indicating overbought levels, and the faster RSI crosses below slower RSI showing trend reversal from bullish to bearish, together with a death cross occuring in EMAs suggesting weakening trend, we have a strong signal for short entry.  

Specifically, when the opening price is above the upper ATR band i.e. `open > upper_band`, the asset may be overbought. Then we check if the fast RSI is less than slow RSI i.e. `rsi1 < rsi2`, suggesting the trend is turning from bullish to bearish. Finally we detect if a death cross happens in EMAs i.e. `ta.crossover(longSMA, shortSMA)` occurs. If all three conditions are met, a short entry signal is triggered.  

Conversely, if price opens below lower ATR band, fast RSI crosses above slow RSI, and a golden cross forms in EMAs, a long entry signal is generated.

The key innovation of this strategy is the introduction of double RSI indicators for better trend identification. Compared to a single RSI, the reliability is higher. Together with the ATR bands and EMA filters, the entry signals become more accurate and reliable. This is the core strength of the strategy.  

### III. Advantages  

The advantages of this strategy include:

1. More accurate trend identification using double RSI indicators  
2. ATR bands avoid false breakout by determining overbought/oversold levels
3. High signal accuracy by entering on golden/death cross of EMA lines   
4. Increased reliability from combining multiple indicators  
5. Simple logic easy to implement  
6. Profit from both long and short sides  
7. Flexibility to adjust parameters for different markets

### IV. Risks  

Some risks to note:   

1. EMA lines susceptible to whipsaws, smoothed MA may be more stable  
2. Can be stopped out frequently during ranging markets
3. Inadequate parameter setting may increase false signals  
4. Premature ATR band breakout may turn out to be false

The risks can be addressed by:
1. Test using Smoothed MA instead of EMA
2. Relax stop loss to avoid being stopped out prematurely  
3. Find optimal parameter balance through rigorous backtesting
4. Add more indicators to confirm ATR band breakouts  

### V. Enhancement Opportunities   

The strategy can be further improved by:   

1. Test Smoothed MA against EMA to reduce false signals 
2. Add volatility measure like Keltner Channels to avoid false breakouts
3. Incorporate trend filters like ADX for overall market direction
4. Adjust parameters based on asset characteristics  
5. Test performance across different timeframes  
6. Utilize machine learning to auto optimize parameters   

These opportunities can make the strategy more stable, flexible and profitable.  

### VI. Conclusion   

Overall, the RSI Golden Cross Short strategy is a highly effective short-term short strategy. It combines multiple indicators to generate entry signals, and is adjustable across assets and markets. Its novelty lies in using double RSI for trend identification, validated by ATR bands and EMA crossovers. This produces high-accuracy entry signals. The strategy has immense practical utility for investors, if risks are monitored and parameters optimized continually through testing. It has the potential to become a powerful profit engine in the trader's arsenal.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|ATR Period|
|v_input_float_1|true|ATR Multi|
|v_input_string_1|0|ATR Smoothing: WMA|SMA|EMA|RMA|
|v_input_int_2|5|Fast EMA|
|v_input_int_3|21|Slow EMA|
|v_input_int_4|40|Fast RSI Length|
|v_input_int_5|60|Slow RSI Length|


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
//Revision: Updated script to pine script version 5
//added Double RSI for Long/Short prosition trend confirmation instead of single RSI
strategy("Super Scalper - 5 Min 15 Min", overlay=true)
source = close
atrlen = input.int(14, "ATR Period")
mult = input.float(1, "ATR Multi", step=0.1)
smoothing = input.string(title="ATR Smoothing", defval="WMA", options=["RMA", "SMA", "EMA", "WMA"])

ma_function(source, atrlen) =>
    if smoothing == "RMA"
        ta.rma(source, atrlen)
    else
        if smoothing == "SMA"
            ta.sma(source, atrlen)
        else
            if smoothing == "EMA"
                ta.ema(source, atrlen)
            else
                ta.wma(source, atrlen)

atr_slen = ma_function(ta.tr(true), atrlen)
upper_band = atr_slen * mult + close
lower_band = close - atr_slen * mult

// Create Indicator's
ShortEMAlen = input.int(5, "Fast EMA")
LongEMAlen = input.int(21, "Slow EMA")
shortSMA = ta.ema(close, ShortEMAlen)
longSMA = ta.ema(close, LongEMAlen)
RSILen1 = input.int(40, "Fast RSI Length")
RSILen2 = input.int(60, "Slow RSI Length")
rsi1 = ta.rsi(close, RSILen1)
rsi2 = ta.rsi(close, RSILen2)
atr = ta.atr(atrlen)

//RSI Cross condition
RSILong = rsi1 > rsi2
RSIShort = rsi1 < rsi2

// Specify conditions
longCondition = open < lower_band
shortCondition = open > upper_band
GoldenLong = ta.crossover(shortSMA, longSMA)
Goldenshort = ta.crossover(longSMA, shortSMA)

plotshape(shortCondition, title="Sell Label", text="S", location=location.abovebar, style=shape.labeldown, size=size.tiny, color=color.new(color.red, 0), textcolor=color.white)
plotshape(longCondition, title="Buy Label", text="B", location=location.belowbar, style=shape.labelup, size=size.tiny, color=color.new(color.green, 0), textcolor=color.white)
plotshape(Goldenshort, title="Golden Sell Label", text="Golden Crossover Short", location=location.abovebar, style=shape.labeldown, size=size.tiny, color=color.new(color.blue, 0), textcolor=color.white)
plotshape(GoldenLong, title="Golden Buy Label", text="Golden Crossover Long", location=location.belowbar, style=shape.labelup, size=size.tiny, color=color.new(color.yellow, 0), textcolor=color.white)

// Execute trade if condition is True
if (longCondition)
    stopLoss = low - atr * 1
    takeProfit = high + atr * 4
    if (RSILong)
        strategy.entry("long", strategy.long)

if (shortCondition)
    stopLoss = high + atr * 1
    takeProfit = low - atr * 4
    if (RSIShort)
        strategy.entry("short", strategy.short)

// Plot ATR bands to chart

////ATR Up/Low Bands
plot(upper_band)
plot(lower_band)

// Plot Moving Averages
plot(shortSMA, color=color.red)
plot(longSMA, color=color.yellow)

```

> Detail

https://www.fmz.com/strategy/442547

> Last Modified

2024-02-22 17:05:17
