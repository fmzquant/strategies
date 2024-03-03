
> Name

Engulfing-Candles

> Author

ChaoZhang

> Strategy Description

This script shows you where a candle is either bullish or bearish engulfing the previous candle.

A GREEN triangle below the bar pointing UP indicates that the candle is BULLISH engulfing the previous candle
A RED triangle ABOVE the bar pointing DOWN indicates that the candle is BEARISH engulfing the previous candle

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/103dadd430525108401.png) 



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-02-07 00:00:00
end: 2022-05-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
study("Engulfing Candles", overlay = true)
//strategy("Engulfing Candles") //keep this commented out unless backtesting

openBarPrevious = open[1]
closeBarPrevious = close[1]
openBarCurrent = open
closeBarCurrent = close

//If current bar open is less than equal to the previous bar close AND current bar open is less than previous bar open AND current bar close is greater than previous bar open THEN True
bullishEngulfing = (openBarCurrent <= closeBarPrevious) and (openBarCurrent < openBarPrevious) and (closeBarCurrent > openBarPrevious)
//If current bar open is greater than equal to previous bar close AND current bar open is greater than previous bar open AND current bar close is less than previous bar open THEN True
bearishEngulfing = (openBarCurrent >= closeBarPrevious) and (openBarCurrent > openBarPrevious) and (closeBarCurrent < openBarPrevious)

//bullishEngulfing/bearishEngulfing return a value of 1 or 0; if 1 then plot on chart, if 0 then don't plot


alertcondition(bullishEngulfing, title = "Bullish Engulfing", message = "[CurrencyPair] [TimeFrame], Bullish candle engulfing previous candle")
alertcondition(bearishEngulfing, title = "Bearish Engulfing", message = "[CurrencyPair] [TimeFrame], Bearish candle engulfing previous candle")


// === EXECUTION === //Keep this commented out unless backtesting
// strategy.entry("L", strategy.long, 25000, when = bullishEngulfing == 1 and window()) // buy long when "within window of time" AND crossover 
// strategy.exit("exit", "L", profit = 1000, loss = 50)

// strategy.entry("S", strategy.short, 25000, when = bearishEngulfing == 1 and window()) // buy long when "within window of time" AND crossover 
// strategy.exit("exit", "S", profit = 1000, loss = 50)


if bullishEngulfing
    strategy.entry("Enter Long", strategy.long)
else if bearishEngulfing
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/361783

> Last Modified

2022-05-08 10:57:57
