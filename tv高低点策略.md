
> Name

tv高低点策略

> Author

Zer3192





> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// ____  __    ___   ________ ___________  ___________ __  ____ ___ 
   // / __ )/ /   /   | / ____/ //_/ ____/   |/_  __<  / // / / __ |__ \
  // / __  / /   / /| |/ /   / ,< / /   / /| | / /  / / // /_/ / / __/ /
 // / /_/ / /___/ ___ / /___/ /| / /___/ ___ |/ /  / /__  __/ /_/ / __/ 
// /_____/_____/_/  |_\____/_/ |_\____/_/  |_/_/  /_/  /_/  \____/____/                                              

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © blackcat1402
//@version=4

study('[blackcat] L2 Reversal Labels','LLA', overlay=true, max_bars_back=5000, max_labels_count=500)

[diff, dea, macd] = macd(close,12, 26, 9)
a1 = barssince(crossover(diff,dea)[1])
a2 = barssince(crossunder(diff,dea)[1])
bottom_zone = (close[a1+1]>close) and (diff>diff[a1+1]) and crossover(diff,dea)
top_zone = (close[a2+1]<close) and (diff[a2+1]>diff) and crossunder(diff,dea)

// Plot labels
l0 = top_zone ? label.new(bar_index, high * 1.0, 'Near Top', color=color.new(color.red, 50), textcolor=color.white, style=label.style_label_down, yloc=yloc.price, size=size.small) : bottom_zone ? label.new(bar_index, low * 1.0, 'Near Bottom', color=color.new(color.green, 50), textcolor=color.white, style=label.style_label_up, yloc=yloc.price, size=size.small) : na

if bottom_zone
    longmsg = 'Bottom Reversal Soon!'
    alert(message=longmsg, freq=alert.freq_once_per_bar_close)
else if top_zone
    shortmsg = 'Top Reversal Soon!'
    alert(message=shortmsg, freq=alert.freq_once_per_bar_close)

//Add Alerts
alertcondition(bottom_zone, title='Alert on Bottom', message='Bottom Reversal Soon!')
alertcondition(top_zone, title='Alert on Top', message='Top Reversal Soon!')
if bottom_zone
   strategy.entry("Alert on Bottom", strategy.long)
else if top_zone
    strategy.entry("Alert on Top", strategy.short)
```

> Detail

https://www.fmz.com/strategy/362060

> Last Modified

2022-05-27 05:34:08
