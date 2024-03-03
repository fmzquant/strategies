
> Name

Pair-trading-strategy

> Author

ChaoZhang

> Strategy Description

 ![IMG](https://www.fmz.com/upload/asset/16fa0cfc72842ff46a7.png) 

Pair trading is a trading strategy that involves simultaneously buying one asset and short selling another asset that are considered to be closely correlated. The goal of pair trading is to profit from the expected convergence of the two assets' prices.

How Pair Trading Works

Pair trading strategies typically use a variety of technical indicators to identify pairs of assets that are likely to converge. One common approach is to use a moving average (MA) to measure the relative price relationship between the two assets. If the price of one asset is trading above the MA of the other asset, it is considered to be overvalued. Conversely, if the price of one asset is trading below the MA of the other asset, it is considered to be undervalued.

In the Pine strategy provided above, the Pair Trade L/S strategy uses a simple MA-based approach to pair trading. The strategy first calculates a simple moving average (SMA) of the closing prices of the two assets. The entry signal is generated when the price of one asset crosses below the SMA of the other asset. The exit signal is generated when the price of one asset crosses above the SMA of the other asset.

Pair Trading Strategies

There are a variety of different pair trading strategies that can be used. Some common strategies include:

* Simple moving average (SMA)-based strategies: These strategies use a simple moving average to measure the relative price relationship between the two assets.
* Bollinger band-based strategies: These strategies use Bollinger bands to identify overbought and oversold conditions in the two assets.
* Relative strength index (RSI)-based strategies: These strategies use the RSI to measure the relative strength of the two assets.
Pair Trading Performance

Pair trading has been shown to be a profitable trading strategy in backtesting studies. However, it is important to note that past performance is not a guarantee of future results. Pair trading is a complex strategy that requires careful risk management.

Pair Trading Risks

One of the main risks associated with pair trading is the risk of the two assets not converging. If the two assets do not converge, the trader will incur a loss. Another risk associated with pair trading is the risk of the two assets becoming uncorrelated. If the two assets become uncorrelated, the trader will lose the ability to profit from their relative price relationship.

Conclusion

Pair trading is a powerful trading strategy that can be used to profit from the expected convergence of two assets' prices. However, it is important to carefully consider the risks associated with pair trading before using this strategy.

Additional Considerations for Pair Trading

In addition to the risks mentioned above, there are a few other factors that traders should consider when using pair trading strategies:

Asset selection: When choosing assets to pair trade, it is important to select assets that are closely correlated. This will help to increase the likelihood of the assets converging.
Entry and exit signals: The entry and exit signals used in a pair trading strategy should be carefully designed to maximize profits and minimize losses.
Risk management: Pair trading can be a risky strategy, so it is important to use appropriate risk management techniques to limit losses.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|SMA Length|
|v_input_2|2|Entry ZScore|
|v_input_3|2016|Backtest Start Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-03 00:00:00
end: 2023-09-09 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © femisapien

//@version=4
strategy("Pair Trade L/S", overlay=true)

source = close
smalength = input(title = "SMA Length", defval = 20, minval=1)
entryzscore = input(title = "Entry ZScore", defval = 2.0, minval=0, maxval = 50)
startYear = input(title="Backtest Start Year", type=input.integer, defval=2016, minval=1980, maxval=2100)

ma = sma(source, smalength)
dev = entryzscore * stdev(source, smalength)

upper = ma + dev
lower = ma - dev

longEntrySignal = cross(source, lower)
shortEntrySignal = cross(source, upper)
exitSignal = cross(source, ma)

afterStartDate = (time >= timestamp(syminfo.timezone, startYear,1,1, 0, 0))

if (longEntrySignal and afterStartDate)
    strategy.entry("le", strategy.long, comment = "Enter Long")

if (shortEntrySignal and afterStartDate)
    strategy.entry("se", strategy.short, comment="Enter Short")

if (exitSignal and afterStartDate)
    strategy.close_all(true)
```

> Detail

https://www.fmz.com/strategy/426262

> Last Modified

2023-09-10 00:17:24
