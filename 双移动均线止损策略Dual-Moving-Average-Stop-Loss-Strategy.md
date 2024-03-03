
> Name

双移动均线止损策略Dual-Moving-Average-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/df890d70efbf0b2e2e.png)

[trans]

## 概述

该策略是一个基于双移动均线的止损策略。它使用两个移动均线,一个为主均线,一个为止损线。当价格高于主均线时做多,当价格低于止损线时平多仓;当价格低于主均线时做空,当价格高于止损线时平空仓。通过动态调整做多做空的价格,实现止损止盈。

## 策略原理

该策略使用sma函数计算长度为len的简单移动平均线作为主均线ma。然后根据用户输入的多头止损百分比elpercent和空头止损百分比espercent,计算出多头止损线el和空头止损线es。具体计算公式为:

el = ma + (ma * elpercent / 100)
es = ma + (ma * espercent / 100) 

其中elpercent和espercent分别代表主均线上下偏移的百分比。

这样就得到了三条线:主均线ma、多头止损线el、空头止损线es。

策略的交易逻辑为:

如果收盘价格高于多头止损线el,则开多仓;如果收盘价格低于空头止损线es,则平多仓。

如果收盘价格低于空头止损线es,则开空仓;如果收盘价格高于多头止损线el,则平空仓。

## 策略优势

1. 使用双移动均线设定止损止盈点,可以有效控制风险。

2. 主均线长度len和偏移百分比elpercent、espercent都可以自定义,可以针对不同市场调整参数,适应性强。

3. 采用止损机制,可以及时止损,避免亏损进一步扩大。

4. 策略思路简单清晰,容易理解实现,适合新手学习。

5. 可同时做多做空,充分利用双向行情。

## 风险及解决

1. 回测数据拟合风险。移动均线策略对历史数据拟合性较强,实盘效果可能会有差异。解决方法是在复杂多变的市场中实盘验证,根据实盘情况调整参数。

2. 止损点过于接近带来的风险。如果止损点设定过于接近主均线,可能会被短期价格波动触发止损。可以适当拉大止损距离来避免。

3. 双边交易带来的资金压力。做多做空同时进行,需要准备足够资金作为保证金。可以适当降低仓位来控制资金压力。

4. 参数优化风险。不同市场情况下参数设置会有较大差异,需要花时间对参数进行优化。可以采用机器学习等技术辅助参数优化。

## 优化方向 

1. 可以考虑加入更多指标判断市场趋势,提高决策效果。例如加入量价指标、波动指标等。

2. 可以研究自动优化移动均线长度len和止损参数,使之能根据市场变化调整。

3. 可以加入对交易品种的过滤,只在趋势明显的品种下交易。

4. 可以考虑把止损方式改为追踪止损,根据价格实时调整止损点。

5. 可以建立参数优化的评估体系,利用回测结果自动寻找最优参数组合。

## 总结

该策略整体思路清晰易懂,使用双移动均线进行止损,可以有效控制风险。策略具有参数可调、适应性强等优点,但也存在回测数据拟合、止损距离设置等问题需要注意。通过进一步优化,该策略可以成为一个易于实盘的有效止损策略。它适合作为新手学习算法交易的起点,在实践中不断完善,逐步形成独特的交易系统。

||


## Overview

This strategy is a stop loss strategy based on dual moving averages. It uses two moving averages, one as the main moving average, and one as the stop loss line. When the price is above the main moving average, go long. When the price is below the stop loss line, close the long position. When the price is below the main moving average, go short. When the price is above the stop loss line, close the short position. It achieves stop loss and take profit by dynamically adjusting the long and short prices.

## Strategy Logic

This strategy uses the sma function to calculate the simple moving average of length len as the main moving average line ma. Then according to the user input long stop loss percentage elpercent and short stop loss percentage espercent, it calculates the long stop loss line el and short stop loss line es. The specific formulas are:

el = ma + (ma * elpercent / 100)
es = ma + (ma * espercent / 100)

Where elpercent and espercent represent the percentage offset from the main moving average line. 

This gives us three lines: main moving average ma, long stop loss line el, and short stop loss line es.

The trading logic of the strategy is:

If the closing price is above the long stop loss line el, open a long position. If the closing price is below the short stop loss line es, close the long position. 

If the closing price is below the short stop loss line es, open a short position. If the closing price is above the long stop loss line el, close the short position.

## Advantages of the Strategy

1. Using dual moving averages to set stop loss and take profit points can effectively control risks.

2. The length of the main moving average len and the offset percentages elpercent and espercent are customizable, which can be adjusted for different markets and adapt well.

3. The stop loss mechanism can cut losses in time and avoid further losses.

4. The strategy logic is simple and clear, easy to understand and implement, suitable for beginners.

5. It can go both long and short to take advantage of two-way markets.

## Risks and Solutions

1. Backtest overfitting risk. Moving average strategies tend to overfit backtest data. Actual performance may differ. Solution is to verify in complex live markets and adjust parameters accordingly.

2. Risk of stop loss being too close. If the stop loss is too close to the main moving average, it may be triggered by short-term price fluctuations. Increase the stop loss distance to avoid this.

3. Capital pressure from dual direction trading. Going both long and short requires sufficient margin. Reduce position size to control capital pressure.

4. Parameter optimization risk. Optimal parameters vary greatly across different market conditions. Time is needed to optimize parameters. Can use machine learning to assist parameter optimization.

## Optimization Directions

1. Consider adding more indicators to determine market trend and improve decisions, e.g. volume price indicator, volatility indicator.

2. Research auto-optimization of moving average length and stop loss parameters based on market changes.

3. Add filtering on trading instruments, only trading obvious trends.

4. Consider trailing stop loss instead of fixed stop loss, adjusting stops based on real-time prices. 

5. Build evaluation system for parameter optimization to automatically find optimum parameter sets via backtest results.

## Conclusion

The overall logic of this strategy is clear and easy to understand. It uses dual moving averages for stop loss and can effectively control risks. The strategy has advantages like customizable parameters and adaptability but also has risks like backtest overfit and stop loss distance setting that need attention. With further optimization, this strategy can become an effective stop loss strategy viable for live trading. It is suitable as a starting point for algorithmic trading beginners, and can be continually improved upon through practice to eventually form a unique trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|false|Short|
|v_input_3|50|len|
|v_input_4_ohlc4|0|src: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_5|5|Shift long, %|
|v_input_6|-5|Shift short, %|
|v_input_7|true|Show lines|
|v_input_8|true|Show background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-08 00:00:00
end: 2023-11-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=4
strategy(title = "Robot WhiteBox StopMA", shorttitle = "Robot WhiteBox StopMA", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(false, defval = false, title = "Short")
len = input(50)
src = input(ohlc4)
elpercent = input(5.0, minval = 0, maxval = 100, title = "Shift long, %")
espercent = input(-5.0, minval = -100, maxval = 0, title = "Shift short, %")
showlines = input(true, defval = true, title = "Show lines")
showbg = input(true, defval = true, title = "Show background")

//Levels
ma = sma(src, len)
el = ma + ((ma / 100) * elpercent)
es = ma + ((ma / 100) * espercent)

//Lines
colel = showlines ? color.lime : na
colma = showlines ? color.blue : na
coles = showlines ? color.red : na
plot(el, color = colel, offset = 1)
plot(ma, color = colma, offset = 1)
plot(es, color = coles, offset = 1)

//Background
trend = 0
trend := high > el[1] ? 1 : low < es[1] ? -1 : trend[1]
colbg = showbg == false ? na : trend == 1 ? color.lime : trend == -1 ? color.red : na
bgcolor(colbg, transp = 80)

//Trading
if ma > 0
    strategy.entry("Long", strategy.long, needlong ? na : 0, stop = el)
    strategy.entry("Short", strategy.short, needshort ? na : 0, stop = es)
```

> Detail

https://www.fmz.com/strategy/432211

> Last Modified

2023-11-15 15:44:48
