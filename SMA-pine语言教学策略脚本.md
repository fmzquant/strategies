
> Name

SMA-pine语言教学策略脚本

> Author

Zer3192





> Source (PineScript)

``` pinescript

//@version=4
study("SMA Cross", overlay=true)
//strategy("strategy.percent_of_equity", overlay = false, default_qty_value = 100, default_qty_type = strategy.percent_of_equity, initial_capital = 1000000)

//SMA
fastSMA = sma(close, 10)
slowSMA = sma(close, 200)

//Buy
longCondition = crossover(fastSMA, slowSMA)
longStop = strategy.position_avg_price * 0.95
longEntry = strategy.position_avg_price * 1.05

//Sell
shortCondition = crossunder(fastSMA, slowSMA)
shortStop = strategy.position_avg_price * 1.05
shortEntry = strategy.position_avg_price * 0.95

//Alert
alertcondition(longCondition, title="SMA Cross", message="Buy Signal")
alertcondition(shortCondition, title="SMA Cross", message="Sell Signal")

//Plot
plotshape(longCondition, style=shape.triangleup, location=location.belowbar, color=color.green, text="Buy")
plotshape(shortCondition, style=shape.triangledown, location=location.abovebar, color=color.red, text="Sell")

//Strategy
strategy.entry("Long", strategy.long, when=longCondition)
strategy.entry("Short", strategy.short, when=shortCondition)
// StopLoss/Takeprofit
if (strategy.position_size > 0)
strategy.exit("stoploss/takeprofit","Long",stop=longStop, limit=longEntry)
if (strategy.position_size < 0)
strategy.exit("stoploss/takeprofit","Short", stop=shortStop, limit=shortEntry)
```

> Detail

https://www.fmz.com/strategy/400134

> Last Modified

2023-02-15 18:19:03
