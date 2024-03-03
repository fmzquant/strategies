
> Name

Midas-Mk-II-Ultimate-Crypto-Swing

> Author

ChaoZhang

> Strategy Description

>> This scrip is only meant to be used in 4hour crypto chart <<

How It Works - To swing trade in a 4 hr candles, which has a much larger range than shorter timeframe candles, the script utilizes a longer timeframe ema , sma and MACDs to account for such. When the ema and sma crosses and the rate of change of the MACD histogram is in favor of the direction, then the system provides a long/short signal.
How To Use - The script works the best when the signal is in par with other analyses (trend, harmonic patterns , etc.) This script does not provide any exit signals, so I recommend exiting when the candle breaks out of the structure, or other strategies.

Updates or revisions will be recorded in the comments. Good luck with this script!

**backtest**
 ![IMG](https://www.fmz.com/upload/asset/159f8a1509168a68539.jpg) 



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-08 00:00:00
end: 2022-05-07 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Bhangerang

 // This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Bhangerang

//@version=5
indicator(title="Midas Mk. II - Ultimate Crypto Swing", overlay=true)

[MACD_line, Signal_line, hist] = ta.macd(close, 55, 89, 9)

// Strategy conditions
crossover = ta.crossover(ta.ema(close, 21), ta.sma(close, 55))
crossunder = ta.crossunder(ta.ema(close, 21), ta.sma(close, 55))

long_entry_condition = crossover and (hist >= 0 or (hist[0] > hist[1] and hist[1] > hist[2]))
short_entry_condition = crossunder and (hist <= 0 or (hist[0] < hist[1] and hist[1] < hist[2]))

simple_crossover = crossover and not long_entry_condition
simple_crossunder = crossunder and not short_entry_condition


// Plot on the chart
plotchar(long_entry_condition,  "Go Long",  "▲", location.belowbar, color.lime, size = size.small, text = "long")
plotchar(short_entry_condition, "Go Short", "▼", location.abovebar, color.red, size = size.small, text = "short")
plotchar(simple_crossover, "Crossing Up", "▲", location.belowbar, color.lime, size = size.tiny)
plotchar(simple_crossunder, "Crossing Down", "▼", location.abovebar, color.red, size = size.tiny)


if long_entry_condition
    strategy.entry("Enter Long", strategy.long)
else if short_entry_condition
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/362089

> Last Modified

2022-05-09 23:22:05
