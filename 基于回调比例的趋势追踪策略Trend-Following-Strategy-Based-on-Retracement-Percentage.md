
> Name

基于回调比例的趋势追踪策略Trend-Following-Strategy-Based-on-Retracement-Percentage

> Author

ChaoZhang

> Strategy Description



This article explains in detail a quantitative trading strategy that follows trends based on percentage retracement from local highs. It identifies entry signals after a fixed percentage retrace from highs.

I. Strategy Logic

The core logic of this strategy is identifying local highs over a certain period, and entering on retracements of a fixed percentage. The specific steps are:

1. First calculate the highest high over the past 90 bars as the local peak.

2. When price retraces a fixed percentage (e.g. 3%) from that peak, go long to follow the trend.

3. Set take profit target at a certain percentage (e.g. 6%) above the entry price. Close position when take profit is hit.

4. No stop loss is used, focusing on trend following.

By determining entry based on percentage pullback from local tops, trend confirmation can be achieved effectively filtering out consolidations. The take profit setting also ensures profit expectancy management per trade.

II. Advantages of the Strategy

The biggest advantage of this strategy is using percentage retracement to gauge trends, filtering out a large amount of noise. Compared to entering at turning points directly, it reduces the probability of mistimed entries.

Another advantage is the take profit logic. This ensures controllable profit and loss per trade, aligning with sound money management principles.

Lastly, the larger take profit target than retracement percentage also provides certain risk reward dynamics.

III. Potential Weaknesses

While the strategy has merits, the following risks should be noted in actual trading:

Firstly, the retracement percentage needs to be set judiciously. Overly deep or shallow retracements can both impact profit potential.

Secondly, the lack of a stop loss exposes the strategy to large single-trade risks. Trend reversals can result in outsized losses.

Lastly, improper parameter optimization can also lead to overfitting issues and deteriorating signal quality.

IV. Summary

In summary, this article has explained in detail a quantitative trend following strategy based on percentage retracement. It can effectively identify trend direction and enter on pullbacks. The take profit management also provides certain risk control mechanics. Overall, by constructing rules based on local peak retracements, this strategy can serve as a robust trend following system after appropriate optimization.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|90|Range of candles to find highest value from.|
|v_input_2|100|Basis points, if asset has two decimals use 100, three decimals 1000, etc.|
|v_input_3|3|Percent value retrace from the top.|
|v_input_4|6|Percent value of take profit from entry price.|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-07 00:00:00
end: 2023-09-13 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © luboremenar

//@version=4
strategy("test_%_down_up", overlay = false, initial_capital = 1000, pyramiding = 0, default_qty_value = 1000,
     default_qty_type = strategy.cash, precision = 8, commission_type = strategy.commission.percent, commission_value = 0.1)

// inputs
range_of_tops = input(title="Range of candles to find highest value from.", defval=90, type=input.integer, minval=1 )
basis_points = input(title="Basis points, if asset has two decimals use 100, three decimals 1000, etc.", defval=100, type=input.integer, minval=1)
retrace_percent = input(title="Percent value retrace from the top.", type=input.integer, defval=3, minval = 1, maxval=99)
take_profit_percent = input(title="Percent value of take profit from entry price.", type=input.integer, defval=6, minval=1)

// strategy definition
three_months_top = highest(range_of_tops)
longCondition1 = (close <= float((three_months_top*(1-(take_profit_percent/100)))) and strategy.position_size == 0)

if (longCondition1)
    strategy.entry("Long1", strategy.long, qty = strategy.equity/close)

strategy.exit(id="TP1", from_entry="Long1", profit=((close*(1 + take_profit_percent/100)-close)*basis_points),
     when= crossover(strategy.position_size, 0))


// plot
plot(strategy.equity)

// for testing, debugging
//test=0.0  
//if(crossover(strategy.position_size, 0))
//    test := (close*1.06-close)*basis_points
//plot(test)
```

> Detail

https://www.fmz.com/strategy/426843

> Last Modified

2023-09-14 19:49:14
