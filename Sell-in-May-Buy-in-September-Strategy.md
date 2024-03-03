
> Name

Sell-in-May-Buy-in-September-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]  
五卖九买策略

该交易策略简单遵循“五月卖出,九月买入”这句老牌交易格言形成交易信号。

具体来说,它仅仅根据日期月份来决定何时开仓做多和平仓。当月份进入9月时,开仓做多;当月份进入5月时,将全部多单平仓。

这种以月份切换来决定策略调仓的方式,其优势在于非常简单易行,无需复杂技术分析和计算。但其弊端也显而易见:

首先,固定按月份交易完全忽视市场实际情况,无法根据行情灵活调整。可能在牛市中过早平仓止盈,也可能在熊市中错过及时止损。

其次,固定月份无法做到灵活的资金管理。无法根据具体每次交易情况来评估是否需要加仓或减仓。

最后,不考虑滑点成本。实际操作中,频繁按月开平仓将产生较多交易成本摩擦。

总体来说,这种简单固定的“五卖九买”策略带有一定娱乐性质,不宜运用于实盘交易中。交易者需要建立系统的交易体系,才能在市场中立足。

|| 

This trading strategy simply follows the classic market saying “Sell in May, buy in September” to generate trade signals. 

Specifically, it only uses the month to determine when to enter longs and when to close all positions. Longs are entered when the month switches to September, and all longs are closed when it becomes May.

The advantage of using fixed months for position switching is that it’s very simple and straightforward, with no need for complex technical analysis and calculations. But the disadvantages are also obvious:

Firstly, fixed month trading completely ignores actual market conditions, and cannot flexibly adjust based on price action. It may exit profitable positions prematurely during bull markets, or fail to cut losses in time during bear markets.

Secondly, fixed months cannot achieve flexible capital management. It is unable to evaluate whether to add or reduce positions based on each specific trade. 

Finally, it does not consider slippage costs. Frequent monthly opening and closing will incur relatively more trading friction costs.

In summary, this simple fixed “Sell in May, Buy in September” strategy has some entertainment value, but is not suitable for live trading. Traders need to establish systematic trading frameworks to survive in the markets.

[/trans]



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
