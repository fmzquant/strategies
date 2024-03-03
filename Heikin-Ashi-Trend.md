
> Name

Heikin-Ashi-Trend

> Author

ChaoZhang

> Strategy Description

This script:
Adds a Heikin-Ashi line to the chart (EMA-based).
Provides alerts triggered when the color goes from green to red and vice versa.

Just add the indicator to the chart, create an alert and select "Heikin-Ashi Trend Alert" from the dropdown. Profit.


**backtest**


 ![IMG](https://www.fmz.com/upload/asset/1ccdc5b470424d683c8.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|77|EMA|
|v_input_int_2|21|EMA Smoothing|
|v_input_1|false|(?DEVELOPER)Show debug info|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © backslash-f
//
// This script:
// - Adds a Heikin-Ashi line to the chart (EMA-based).
// - Provides alerts triggered when the color goes from green to red and vice versa.

//@version=5
indicator("Heikin-Ashi Trend Alert", overlay=true)

// EMA
ema_input                   = input.int(title="EMA", defval=77, minval=1)
ema_smoothing               = input.int(title="EMA Smoothing", defval=21, minval=1)
ema_open                    = ta.ema(open, ema_input)
ema_close                   = ta.ema(close, ema_input)

// Developer
shouldShowDebugInfo         = input(title="Show debug info", group="DEVELOPER", defval=false, tooltip="Check this box to see the values of the main variables on the chart, below bars. This is for debugging purposes only.")

// Heikin-Ashi
heikinashi                  = ticker.heikinashi(syminfo.tickerid)
heikinashi_open             = request.security(heikinashi, timeframe.period, ema_open)
heikinashi_close            = request.security(heikinashi, timeframe.period, ema_close)
heikinashi_open_smooth      = ta.ema(heikinashi_open, ema_smoothing)
heikinashi_close_smooth     = ta.ema(heikinashi_close, ema_smoothing)

// Trend
var trend                   = false
var last_trend              = trend
trend                       := heikinashi_close_smooth >= heikinashi_open_smooth
if trend
    strategy.entry("Enter Long", strategy.long)
else
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/362000

> Last Modified

2022-05-09 14:33:57
