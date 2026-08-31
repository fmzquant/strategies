
> Name

基于布林带震荡器的趋势追踪策略Trend-Following-Strategy-Based-on-Bollinger-Band-Oscillator

> Author

ChaoZhang

> Strategy Description


## Overview

The core idea of this strategy is to identify trends using the Bollinger Band Oscillator and enter positions when trends change. It goes long when price breaks above the upper band and goes short when price breaks below the lower band, with a trend following approach to profit.

## Strategy Logic

The strategy mainly uses the Bollinger Band Oscillator to determine trend direction. The formula for BBO is:

```
BBO = (Close - N-day Moving Average) / (2 * N-day Standard Deviation) * 100
```

Where Close is the closing price, N-day Moving Average is the N-day simple moving average of close, and N-day Standard Deviation is the N-day standard deviation of close. 

The strategy first calculates the 65-day BBO, then the 30-day moving average of BBO. When BBO crosses above its MA, it signals an uptrend, go long. When BBO crosses below its MA, it signals a downtrend, go short.

After entering positions, the strategy uses moving stop loss, fixed take profit and trailing stop loss to control risks and lock in profits. The parameters can be optimized based on backtest results.

## Advantages

1. BBO is sensitive to trend changes.

2. Moving stop loss controls individual loss when trend reverses. 

3. Fixed take profit locks in profits when trend is correct.

4. Trailing stop loss maximizes profit for a single trade.

5. The strategy is simple and intuitive.

## Risks

1. BBO can give false signals.

2. Improper stop loss/take profit may exit too early.

3. Fixed take profit may exit too early, missing further profits.

4. Parameters need optimization to avoid overfitting. 

5. Potentially large drawdown, sufficient capital required.

## Optimization

1. Optimize BBO and MA parameters.

2. Test different stop loss methods like ATR, percentage.

3. Optimize fixed take profit and trailing stop loss. 

4. Add filters to avoid false signals.

5. Optimize position sizing for different markets.

6. Test strategy effectiveness across instruments and timeframes.

## Conclusion

The strategy identifies trend changes using BBO and enters positions accordingly. It controls risks and locks in profits with various types of exits. The strategy is simple and intuitive but requires parameter optimization. It can perform well in trending markets if optimized properly, but false signals and improper exits need to be watched out for.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|65|length|
|v_input_2|30|lengthMA|
|v_input_3|false|TP|
|v_input_4|false|SL|
|v_input_5|true|TS|
|v_input_6|10|TO|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-03 00:00:00
end: 2023-10-09 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title="Strategy CCT Bollinger Band Oscillator", shorttitle="Hornkild", calc_on_order_fills=true, default_qty_type=strategy.percent_of_equity, default_qty_value=50, overlay=false)

length=input(65)
lengthMA=input(30)
src=close
cctbbo=100 * ( src + 2*stdev( src, length) - sma( src, length ) ) / ( 4 * stdev( src, length ) )

//ul=hline(100, color=gray, editable=true)
//ll=hline(0, color=gray)
//hline(50, color=gray)
//fill(ul,ll, color=blue)
//plot(cctbbo, color=blue, linewidth=2)
//plot(ema(cctbbo, lengthMA), color=red)

TP = input(0) * 10
SL = input(0) * 10
TS = input(1) * 10
TO = input(10) * 10
CQ = 100

TPP = (TP > 0) ? TP : na
SLP = (SL > 0) ? SL : na
TSP = (TS > 0) ? TS : na
TOP = (TO > 0) ? TO : na

longCondition = crossover(cctbbo, ema(cctbbo, lengthMA))
if (longCondition)
    strategy.entry("Long", strategy.long)


shortCondition = crossunder(cctbbo, ema(cctbbo, lengthMA))
if (shortCondition)
    strategy.entry("Short", strategy.short)

strategy.exit("Close Short", "Short", qty_percent=CQ, profit=TPP, loss=SLP, trail_points=TSP, trail_offset=TOP)
strategy.exit("Close Long", "Long", qty_percent=CQ, profit=TPP, loss=SLP, trail_points=TSP, trail_offset=TOP)
```

> Detail

https://www.fmz.com/strategy/428858

> Last Modified

2023-10-10 10:54:05
