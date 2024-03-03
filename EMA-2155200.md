
> Name

EMA-2155200

> Author

Zer3192





> Source (PineScript)

``` pinescript
/*backtest
start: 2021-08-20 00:00:00
end: 2022-08-26 00:00:00
period: 1d
basePeriod: 1h
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © BrendanW98

//@version=4
strategy("EMA 21,55,200", overlay=true)

ema5 = ema(close, 21)
ema20 = ema(close, 55)
ema50 = ema(close, 200)

//RSI Signals
// Get user input
rsiSource = close
rsiLength = 14
rsiOverbought = 70
rsiOversold = 30
rsiMid = 50
// Get RSI value
rsiValue = rsi(rsiSource, rsiLength)

//See if RSI crosses 50
doBuy = crossover(rsiValue, rsiOversold) and rsiValue < 50
doSell = crossunder(rsiValue, rsiOverbought) and rsiValue > 50

emacrossover = crossover(ema5, ema20) and ema5 > ema50 and ema20 > ema50 and close > ema50
emacrossunder = crossunder(ema5, ema20) and ema5 < ema50 and ema20 < ema50 and close < ema50

//Entry and Exit
longCondition = emacrossover
closelongCondition = doSell

strategy.entry("Long", strategy.long, 100, when=longCondition)
strategy.close("Long", when=closelongCondition)


shortCondition = emacrossunder
closeshortCondition = doBuy

strategy.entry("Short", strategy.short, 100, when=shortCondition)
strategy.close("Short", when=closeshortCondition)

```

> Detail

https://www.fmz.com/strategy/380291

> Last Modified

2022-08-27 21:56:34
