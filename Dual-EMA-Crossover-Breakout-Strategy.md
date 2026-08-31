
> Name

Dual-EMA-Crossover-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ed2ea709e2d0ae7897.png)



## Overview

The Dual EMA Crossover Breakout strategy generates buy and sell signals based on the crossover of fast and slow EMA lines, combined with trading volume breakout, candlestick patterns and price breakout filters to improve reliability. By integrating multiple technical indicators, it aims to identify trends while controlling risks.

## Principles

The core logic of the Dual EMA Crossover Breakout strategy lies in the golden crossover theory of two EMAs. The theory believes that when the shorter-term EMA crosses above the longer-term EMA, it signals an uptrend, so long positions should be established. When the shorter-term EMA crosses below the longer-term EMA, it signals a downtrend, so short positions should be established.   

Specifically, the strategy first calculates the 9-period and 21-period EMAs. When the 9-EMA crosses above the 21-EMA, a "long" signal is generated. When the 9-EMA crosses below the 21-EMA, a "short" signal is generated. To filter out false signals, the following conditions are checked:  

1. Volume condition - Volume of recent candle should exceed 85% of average volume of previous 5 candles. This filters out signals with insufficient trading volumes.

2. Price breakout condition - Price needs to breakout above 9-EMA as entry confirmation.   

3. Candlestick pattern condition - Identify bullish or bearish reversal patterns, avoiding whipsaws during sideways markets.

For long positions, exits are triggered when price breaks below 9-EMA. For short positions, exits are triggered when price breaks above 9-EMA.  

## Advantage Analysis 

By combining signals from multiple technical indicators, the Dual EMA Crossover Breakout strategy can effectively identify trends and improve win rate. The main advantages are:

1. Using dual EMAs to determine major trend direction is highly reliable. 

2. Adding volume filter avoids wrong signals when volume is insufficient.  

3. Adding candlestick pattern filter eliminates noise from range-bound markets.

4. Entering after price breaks EMA confirms trend. 

5. The stop loss mechanism actively controls risks.

## Risk Analysis

There are still some risks with the strategy:  

1. EMA may generate false signals during choppy markets, causing losses. Overall trend judgement can help decide on opening positions.  

2. Fixed EMA periods may fail to adapt to changing markets. Adaptive EMAs can be tested.

3. There are still probabilities of misidentifying candlestick patterns. Stop losses control risk.  

4. The strategy may miss some price moves and have imperfect trend tracking. Parameter tuning or combining with other strategies can help.

## Optimization Directions

The main optimization directions are:  

1. Test more EMA combinations to find optimal parameters.  

2. Add adaptive EMAs based on changing market conditions. 

3. Optimize position sizing for different market conditions.  

4. Incorporate more indicators like MACD, KDJ to form ensemble strategies.

5. Introduce machine learning models to improve robustness.  

## Conclusion

The Dual EMA Crossover Breakout strategy effectively identifies trends using dual EMA directional analysis, and adds multiple volume/price/pattern filters to improve efficiency while controlling risks. Easy to implement with optimization flexibility, it is a recommended breakout trend following strategy.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-11-27 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//Author: Andrew Shubitowski
strategy("Buy/Sell Strat", overlay = true)

//Define EMAs & Crossovers (Feature 2)
a = ta.ema(close, 9)
b = ta.ema(close, 21)
crossUp = ta.crossover(a, b)
crossDown = ta.crossunder(a, b)


//Define & calc volume averages (Feature 1)
float volAvg = 0
for i = 1 to 5
    volAvg := volAvg + volume[i]
volAvg := volAvg / 5

//Define candlestick pattern recongition (Feature 4)
bool reversalPatternUp = false
bool reversalPatternDown = false
if (close > close[1] and close[1] > close [2] and close[3] > close[2] and close > close[3])
    reversalPatternUp := true
    
if (close < close[1] and close[1] < close [2] and close[3] < close[2] and close < close[3])
    reversalPatternDown := true

//Execute trade (Feature 3 + 5)
if (crossUp)
    strategy.entry("long", strategy.long, when = ((volume * 0.85) > volAvg and close > a and reversalPatternUp == true))
    
if (crossDown)
    strategy.entry("short", strategy.short, when = ((volume * 0.85) > volAvg and close < a and reversalPatternDown == true))
    
//Exit strategy (New Feature)
close_condition_long = close < a
close_condition_short = close > a
if (close_condition_long)
    strategy.close("long")

if (close_condition_short)
    strategy.close("short")

//plot the EMAs
plot(a, title = "Fast EMA", color = color.green)
plot(b, title = "Slow EMA", color = color.blue)


//Some visual validation parameters
//plotchar(volAvg, "Volume", "", location.top, color.aqua) //*TEST* volume calc check
//plotshape(reversalPatternUp, style = shape.arrowup, color = color.aqua) //*TEST* reversal check
//plotshape(reversalPatternDown, style = shape.arrowup, location = location.belowbar, color = color.red) //*TEST* reversal check
```

> Detail

https://www.fmz.com/strategy/433566

> Last Modified

2023-11-28 15:39:37
