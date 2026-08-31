
> Name

Trend-Following-Exponential-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ecdc3d8575f12d3ee8.png)


### Overview  

The Trend Following Exponential Moving Average Strategy is a quantitative trading strategy based on trends. It uses Exponential Moving Averages (EMAs) with different periods to identify potential entry and exit signals in the crypto market. By tracking crossovers between different EMAs, both pullback and trend entry opportunities can be discovered to maximize potential gains while mitigating risks.   

### Strategy Logic

The strategy employs four EMAs with periods of 8, 12, 24 and 72 respectively. They serve as visual guides on the chart for the trend direction. When the closing price breaks through slower EMAs, it signals buying opportunities. When faster EMAs break through slower ones, it signals selling opportunities.   

**There are two entry signals:**
1. Pullback Entry: The closing price crossing over the 12-, 24- and 72-period EMAs forms a pullback entry signal.   
2. Trend Entry: The closing price crossing over the 72-period EMA along with the 8-period EMA simultaneously crossing over both the 12- and 24-period EMAs forms a trend entry signal.  

**There are three exit signals:**  
1. Fixed Profit Taking: A fixed value like 100 pips set as profit target.
2. Trailing Stop Loss: A fixed trailing stop like 50 pips.  
3. Reversal Exit: The 24-period EMA crossing below the 12-period EMA indicates a trend reversal for exit.

### Advantage Analysis   

The biggest advantage of this strategy is the ability to capitalize on both pullback and trend opportunities. Using faster and slower EMA combos prevents being misguided by short-term fluctuations. EMAs also filter out price noise effectively to capture long-term trends. Overall strengths include:  

1. Strong trend tracking ability to quickly capture market changes.   
2. High accuracy in identifying trend direction. 
3. Good flexibility to enter on both trends and pullbacks.  
4. Solid risk control with stop loss mechanics.

### Risk Analysis

Some risks need to be prevented:   

1. Risk from improper key parameter settings like EMA periods impacting strategy performance.  
2. Risk of misjudging trend reversal signals from EMA crossovers.
3. Overly aggressive stop loss causing over-exiting.

The following measures can help control the above risks:

1. Optimize parameters by selecting suitable EMA period combinations.  
2. Add other indicators to confirm reversals.
3. Fine tune stop loss mechanism by relaxing stop levels.  

### Optimization Directions

There is room for further optimization:

1. Add other filters like MACD and Bollinger Bands to improve accuracy. 
2. Dynamically adjust stop loss levels for high volatility conditions.
3. Test across different symbols and timeframes to find best configurations.  
4. Customize profit targets and stop loss based on risk appetite.  

### Conclusion  

Overall this EMA Tracking strategy capitalizes on both trend and pullback opportunities through EMA crossovers for entries. With high configurability, simplicity, and effective risk control, it has great potential for higher performance with parameter tuning and incremental refinements. Its strengths make it a recommended trend following system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|Length of 8 EMA|
|v_input_2|12|Length of 12 EMA|
|v_input_3|24|Length of 24 EMA|
|v_input_4|72|Length of 72 EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-31 00:00:00
end: 2023-11-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © moondevonyt

//@version=5
strategy("Cornoflower Trend Following Crypto", overlay=true)

// Input Settings
lenEma8 = input(8, title="Length of 8 EMA")
lenEma12 = input(12, title="Length of 12 EMA")
lenEma24 = input(24, title="Length of 24 EMA")
lenEma72 = input(72, title="Length of 72 EMA")

// Calculate the EMAs
ema8 = ta.ema(close, lenEma8)
ema12 = ta.ema(close, lenEma12)
ema24 = ta.ema(close, lenEma24)
ema72 = ta.ema(close, lenEma72)

// Entry Conditions
pullbackEntry = ta.crossover(close, ema12) and ta.crossover(close, ema24) and ta.crossover(close, ema72)
initialEntry = ta.crossover(close, ema72) and ta.crossover(ema8, ema12) and ta.crossover(ema8, ema24)

// Exit Conditions
profitTarget = 100 // Example target in pips, adjust according to your preference
trailingStop = 50 // Example trailing stop value in pips, adjust according to your preference
exitCondition = ta.crossunder(ema12, ema24)

// Execute Strategy
if pullbackEntry
    strategy.entry("Pullback Entry", strategy.long)
if initialEntry
    strategy.entry("Initial Entry", strategy.long)

if strategy.position_size > 0
    strategy.exit("Profit Target", "Pullback Entry", limit=close + (profitTarget * syminfo.mintick))
    strategy.exit("Trailing Stop", "Pullback Entry", stop=close - (trailingStop * syminfo.mintick), trail_points=trailingStop)
    strategy.exit("Exit Condition", "Initial Entry", stop=close, when=exitCondition)
    
// Plot EMAs
plot(ema8, color=color.yellow, title="8 EMA", linewidth=1, style=plot.style_line)
plot(ema12, color=color.purple, title="12 EMA", linewidth=1, style=plot.style_line)
plot(ema24, color=color.blue, title="24 EMA", linewidth=1, style=plot.style_line)
plot(ema72, color=color.rgb(235, 255, 59), title="72 EMA", linewidth=1, style=plot.style_line)
```

> Detail

https://www.fmz.com/strategy/433904

> Last Modified

2023-12-01 13:46:46
