
> Name

Sell-in-May-Buy-in-September-Strategy

> Author

ChaoZhang

> Strategy Description



This trading strategy simply follows the classic market saying “Sell in May, buy in September” to generate trade signals. 

Specifically, it only uses the month to determine when to enter longs and when to close all positions. Longs are entered when the month switches to September, and all longs are closed when it becomes May.

The advantage of using fixed months for position switching is that it’s very simple and straightforward, with no need for complex technical analysis and calculations. But the disadvantages are also obvious:

Firstly, fixed month trading completely ignores actual market conditions, and cannot flexibly adjust based on price action. It may exit profitable positions prematurely during bull markets, or fail to cut losses in time during bear markets.

Secondly, fixed months cannot achieve flexible capital management. It is unable to evaluate whether to add or reduce positions based on each specific trade. 

Finally, it does not consider slippage costs. Frequent monthly opening and closing will incur relatively more trading friction costs.

In summary, this simple fixed “Sell in May, Buy in September” strategy has some entertainment value, but is not suitable for live trading. Traders need to establish systematic trading frameworks to survive in the markets.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-11 00:00:00
end: 2023-09-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © DynamicSignalLab

//@version=5
strategy("Sell in May, buy in September Strategy", overlay=false)

longCondition = month==9
closecondition = month==5

if longCondition
    strategy.entry("long", strategy.long)

if closecondition
    strategy.close("long", when=closecondition)

```

> Detail

https://www.fmz.com/strategy/426460

> Last Modified

2023-09-12 11:18:34
