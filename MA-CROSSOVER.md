
> Name

MA-CROSSOVER

> Author

ChaoZhang

> Strategy Description

The MA Crossover strategy is a technical trading strategy that uses the moving average crossover to identify trading opportunities. The strategy is designed to be used in the daily timeframe, and it can be used to trade both long and short positions.

The strategy works by identifying crossovers between the fast and slow moving averages. When the fast moving average crosses above the slow moving average, a buy signal is generated. When the fast moving average crosses below the slow moving average, a sell signal is generated.

The MA Crossover strategy is a relatively simple strategy to use, but it can be very effective. The strategy is based on sound technical principles, and it has been shown to be profitable over time.

Here are some of the benefits of using the MA Crossover strategy:

It is a simple strategy to use, making it accessible to traders of all experience levels.
It is based on sound technical principles, which means that it has a high probability of success.
It is a trend-following strategy, which means that it can help traders to ride the trends.
It can be used to trade both long and short positions, making it a versatile strategy.
Here are some of the risks associated with using the MA Crossover strategy:

The strategy is based on historical price data, and there is no guarantee that it will be profitable in the future.
The strategy can be susceptible to whipsaw, which is when the price of an asset moves rapidly in both directions.
The strategy can be volatile, meaning that there is a risk of large losses.
Overall, the MA Crossover strategy is a relatively simple and effective trading strategy that can be used by traders of all experience levels. However, it is important to remember that no trading strategy is guaranteed to be profitable, and traders should always use caution when using any trading strategy.

Here are some additional things to keep in mind when using the MA Crossover strategy:

The length of the moving averages can be adjusted to suit your trading style and risk tolerance.
You can also use multiple moving averages to create a more complex strategy.
It is important to backtest the strategy on historical data to ensure it is profitable before using it for live trading.
You should also use a stop loss to limit your losses.
I hope this article is helpful and informative. If you have any further questions, please feel free to ask.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|15|Slow Length|
|v_input_2|9|Fast Length|
|v_input_3|true|Intraday?|
|v_input_4|15|Exit Hr|
|v_input_5|20|Exit Min|
|v_input_6|200|Take Profit|
|v_input_7|100|Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-08-28 00:00:00
end: 2023-02-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":10000}]
*/

//@version=5
strategy("EMA-Cross-JC Intraday with Trailing SL", overlay=true)

// emabasel = input(100, "Base Length")
emaslen = input(15, "Slow Length")
emaflen = input(9, "Fast Length")
intra =input(true, title = "Intraday?")
sq_time_hr = input(15, title="Exit Hr")
sq_time_min = input(20, title="Exit Min")

emaslow = ta.ema(close, emaslen)
emafast = ta.ema(close, emaflen)
// emabase = ta.ema(close, emabasel)

emaup = ta.crossover(emafast, emaslow)
emadown = ta.crossunder(emafast, emaslow)

tsival = ta.tsi(close, 13, 55)

plot(emaslow, title="Slow EMA", color=color.yellow, linewidth=1)
plot(emafast, title="Fast EMA", color=color.green, linewidth=1)
// plot(emabase, title="Base EMA", color=color.white, linewidth=3)

takeProfitPoints = input(200, title="Take Profit")
// tp_off = input(4000, title="Keep trailing")
stopLossPoints = input(100, title="Stop Loss")

// Define the time to square off positions
squareOffTime = timestamp(year, month, dayofmonth, sq_time_hr, sq_time_min)

var float trailingStop = na

if emaup and barstate.isconfirmed and time < squareOffTime //and tsival >=0
    strategy.entry("Buy", strategy.long)
    strategy.exit("Sell", "Buy", stop=close - stopLossPoints, limit=close + takeProfitPoints)
    // trailingStop := emabase - stopLossPoints
    strategy.exit("Trailing Stop", "Buy", stop=trailingStop)

if emadown and barstate.isconfirmed and time < squareOffTime //and tsival <=0
    strategy.entry("Sell", strategy.short)
    strategy.exit("Cover", "Sell", stop=close + stopLossPoints, limit=close - takeProfitPoints)
    // trailingStop := emabase + stopLossPoints
    strategy.exit("Trailing Stop", "Sell", stop=trailingStop)

// Close any open positions before the end of the trading day
if ta.barssince(strategy.opentrades) == 0 and time >= squareOffTime and intra == true
    strategy.close_all()

// plot(tsival, title = "TSI Value")
plotshape(emaup and barstate.isconfirmed, title="Crossover", style = shape.triangleup , size=size.small,color = color.green, location = location.belowbar)
plotshape(emadown and barstate.isconfirmed, title="Crossunder",style = shape.triangledown, size=size.small,color = color.red, location = location.abovebar)

```

> Detail

https://www.fmz.com/strategy/425776

> Last Modified

2023-09-04 15:55:46
