
> Name

Buy-Sell-Strat

> Author

ChaoZhang

> Strategy Description

This strategy will produce a buy or sell signal when the following criteria are met:

9 EMA crosses 21 EMA
Recently closed candlestick has 15% higher average volume than previous 5 candles
A candlestick reversal pattern
Price crosses 9 EMA

Feel free to use and modify as you see fit. Happy trading!

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/18d9f7f95cee6a9bec6.png) 



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-01-01 00:00:00
end: 2022-05-07 23:59:00
period: 2h
basePeriod: 15m
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
//close_condition_long = close < a
//close_condition_short = close > a
//if (close_condition_long)
//    strategy.close("long")
//
//if (close_condition_short)
//    strategy.close("short")

//plot the EMAs
plot(a, title = "Fast EMA", color = color.green)
plot(b, title = "Slow EMA", color = color.blue)


//Some visual validation parameters
//plotchar(volAvg, "Volume", "", location.top, color.aqua) //*TEST* volume calc check
//plotshape(reversalPatternUp, style = shape.arrowup, color = color.aqua) //*TEST* reversal check
//plotshape(reversalPatternDown, style = shape.arrowup, location = location.belowbar, color = color.red) //*TEST* reversal check
```

> Detail

https://www.fmz.com/strategy/361966

> Last Modified

2022-05-09 11:24:33
