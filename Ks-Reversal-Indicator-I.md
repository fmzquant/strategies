
> Name

Ks-Reversal-Indicator-I

> Author

ChaoZhang

> Strategy Description

K's reversal indicator I is a special combination between Bollinger bands and the MACD oscillator. It is a contrarian indicator that depends on the following conditions:

• A buy signal is generated whenever the current market price is below the 100-period lower Bollinger band while simultaneously, the MACD value must be above its signal line. At the same time, the previous MACD value must be below its previous signal line.
• A sell (short) signal is generated whenever the current market price is above the 100-period upper Bollinger band while simultaneously, the MACD value must be below its signal line. At the same time, the previous MACD value must be above its previous signal line.

The way to use K's reversal indicator is to combine it with your already long/short bias in a sideways/range market in order to maximize the probability of success.

Limitations of the indicator include the following:
• There are no clear exit rules that work well on average across the markets. Even though K’s reversal indicator gives contrarian signals, it does not show when to exit the positions.
• As with other indicators, it underperforms on some markets and is not to be used everywhere.
• False signals tend to occur during trending markets but there is no proven way to detect a false signal.

**backtest**


 ![IMG](https://www.fmz.com/upload/asset/14fa3cc24d4b26b9884.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast|
|v_input_2|26|Slow|
|v_input_3|9|Signal|
|v_input_4|100|Bollinger Lookback|
|v_input_5|2|Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-02-07 00:00:00
end: 2022-05-07 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Sofien-Kaabar

//@version = 5
indicator("K's Reversal Indicator I", overlay = true)

fast       = input(defval = 12, title = 'Fast')
slow       = input(defval = 26, title = 'Slow')
signal     = input(defval = 9,  title = 'Signal')
length     = input(defval = 100, title = 'Bollinger Lookback')
multiplier = input(defval = 2,  title = 'Multiplier')

// MACD
macd_line   = ta.ema(close, fast) - ta.ema(close, slow)
signal_line = ta.ema(macd_line, signal)

// Bollinger
lower_boll = ta.sma(close, length) - (multiplier * ta.stdev(close, length))
upper_boll = ta.sma(close, length) + (multiplier * ta.stdev(close, length))
mid_line = ta.sma(close, length)

// Signal
buy_signal  = math.min(open[1], close[1]) <= lower_boll[1] and math.max(open[1], close[1]) <= mid_line and macd_line[1] > signal_line[1] and macd_line[2] < signal_line[2]
sell_signal = math.max(open[1], close[1]) >= upper_boll[1] and math.min(open[1], close[1]) >= mid_line and macd_line[1] < signal_line[1] and macd_line[2] > signal_line[2]

if buy_signal
    strategy.entry("Enter Long", strategy.long)
else if sell_signal
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/361785

> Last Modified

2022-05-08 11:14:32
