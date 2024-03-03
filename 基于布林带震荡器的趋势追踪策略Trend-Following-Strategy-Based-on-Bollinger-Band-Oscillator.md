
> Name

基于布林带震荡器的趋势追踪策略Trend-Following-Strategy-Based-on-Bollinger-Band-Oscillator

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略的核心思想是利用布林带震荡器指标来识别趋势,并在趋势变化时及时入场。当价格突破布林带上轨时做多,当价格跌破布林带下轨时做空,采用趋势跟踪方式来获利。

## 策略原理

该策略主要基于布林带震荡器指标来判断趋势方向。布林带震荡器的计算公式为:

```
BBO = (收盘价 - N日移动平均价) / (2 * N日标准差) * 100
```

其中收盘价是当日的收盘价,N日移动平均价是收盘价的N日简单移动平均线,N日标准差是收盘价的N日标准差。

该策略首先计算65日的布林带震荡器,然后计算布林带震荡器的30日均线。当布林带震荡器上穿其均线时,认为趋势开始变化,做多;当布林带震荡器下穿其均线时,认为趋势开始变化,做空。

进入仓位后,策略采用移动止损、固定止盈和移动追踪止损来控制风险和获利。具体参数可根据回测结果进行优化。

## 策略优势

1. 使用布林带震荡器指标判断趋势,该指标对趋势变化比较敏感。

2. 采用移动止损来控制 individual loss,可以在趋势再次转向时及时止损。

3. 采用固定止盈来锁定 profit,可以在趋势方向正确时及时卖出获利。 

4. 采用移动追踪止损来跟踪优势价格,可以最大化单笔盈利。

5. 策略较为简单和直观,容易理解和实现。

## 策略风险

1. 布林带震荡器存在假突破的可能,可能发出错误信号。

2. 移动止损或追踪止损设置不当可能过早止损或止盈。

3. 固定止盈设置不当可能过早止盈,错失更大利润。

4. 布林带参数和移动均线参数需要优化,否则可能导致过拟合。

5. 回撤可能较大,需要充足的资金支持。

## 策略优化

1. 对布林带参数和移动均线参数进行优化,找到最佳参数组合。

2. 测试不同的移动止损方式,如ATR止损、百分比止损等。

3. 对固定止盈和追踪止损参数进行测试和优化。

4. 增加其他过滤条件,避免布林带震荡器发出错误信号。

5. 优化仓位管理,不同市场适合不同的仓位规模。

6. 测试在不同品种和时间周期使用该策略的效果。

## 总结

该策略利用布林带震荡器指标判断趋势方向,在趋势开始变化时进入仓位,并采用移动止损、固定止盈和追踪止损来控制风险和获利。策略较为简单直观,容易实现,但需要对参数进行优化,同时要防范假突破和不适当的止损止盈设置。如果优化得当,该策略可以在趋势行情中获得较好的效果。

|| 

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

[/trans]

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
