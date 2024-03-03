
> Name

ATR跟踪止损策略ATR-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

概述:ATR跟踪止损策略是一种基于平均真实波幅指标动态设置止损位的交易策略。该策略适用于价格波动较大的外汇交易品种,通过动态追踪市场波动来设置止损,在大趋势中捕捉利润的同时控制风险。

### 策略原理

该策略通过计算AVERAGE指标(价格的均线)以及基于ATR指标计算的上轨DIFF和下轨DIFFLOW,形成一个交易通道。当价格上穿上轨DIFF时做多头,当价格下穿下轨DIFFLOW时做空头,使用ATR动态设置止损位,达到止损时平仓。

具体来说,策略首先计算价格的简单移动平均线AVERAGE以及ATR指标,并根据ATR值乘以一个倍数系数计算上轨DIFF和下轨DIFFLOW。这形成了一个交易通道,通道上下边界就由DIFF和DIFFLOW决定。当价格突破上轨时,做多头仓位;当价格突破下轨时,做空头仓位。此外,止损位也会随着ATR值的变动而动态变化,从而实现可变止损。

这样,策略可以在大趋势中不断做多做空来捕捉利润,同时通过ATR动态追踪止损来控制风险,适合具有较大波动的品种。

### 优势分析

该策略具有以下优势:

1. 使用ATR指标进行动态止损,可以根据市场波动程度来灵活设置止损位,避免止损太近或太远。

2. 建立交易通道,以捕捉大趋势中的均值回归机会。价格滞留通道时,该策略可以获得较好的资金利用率。

3. 持续做多做空参与趋势,无须预测价格向上或向下突破,跟踪趋势获得较好盈利。

4. 简单的参数设定和交易规则,容易理解和实施,适合自动交易。

5. 资金利用率高,无须预测突破方向,持续交易可以获得更多盈利机会。

### 风险及优化分析

该策略也存在一些风险需要注意:

1. ATR参数设定过大,会导致止损距离过远,无法有效控制风险。建议ATR系数设置为1-3倍日ATR。

2. 盘整市场中,交投活跃,价格震荡较大,会频繁触发止损。可以适当调整ATR系数以降低止损触发频率。

3. 部分时间价格可能突破通道后再反转回来,此时策略会产生损失。可以结合趋势过滤器,只在趋势方向突破通道时才入场。

4. 大幅异动时,止损可能无法起到很好的保护作用。可考虑再加入最大止损设定,避免止损过大。

该策略可进行如下优化:

1. 优化ATR参数,找到合适的ATR倍数系数,既能跟踪止损,也不会止损过于敏感。

2. 加入趋势判断指标,只在趋势向上时做多,趋势向下时做空,避免非趋势交易。

3. 针对不同品种分别测试参数,找到每个品种适合的参数组合。

4. 优化入场机会,可考虑突破通道中轴时入场。

5. 加大持仓规模,但也要控制整体亏损不能过大。

### 总结

ATR跟踪止损策略通过建立交易通道,在大趋势中持续交易捕捉利润,同时利用ATR动态设置止损,控制风险。该策略适用于波动较大的品种,可以获得较好的资金利用率。在实践中,需要优化参数,并可以考虑加入趋势判断等来进一步完善。总体来说,ATR跟踪止损策略是一个简单实用的趋势跟踪策略。

||

Overview: The ATR trailing stop strategy is a trading strategy that dynamically sets stop loss levels based on the Average True Range (ATR) indicator. It is suitable for volatile FOREX pairs, capturing profits in major trends while controlling risk by dynamically tracking market volatility.  

### Strategy Logic

The strategy calculates the AVERAGE indicator (price moving average) and upper/lower bands DIFF/DIFFLOW based on ATR values, forming a trading channel. It goes long when price crosses above DIFF and goes short when price crosses below DIFFLOW, with stops set dynamically based on ATR.  

Specifically, it first calculates the simple moving average AVERAGE and ATR indicator. The upper band DIFF and lower band DIFFLOW are then computed by multiplying ATR values with a coefficient. This forms a trading channel bounded by DIFF and DIFFLOW. When price breaks above the upper band, a long position is taken. When price breaks below the lower band, a short position is taken. In addition, the stop loss level moves dynamically with ATR values. This allows for adaptive stops.

Thus the strategy can continuously go long/short to capture profits in major trends, while using ATR trailing stops to control risk. This makes it suitable for volatile instruments.

### Advantage Analysis

The advantages of this strategy include:

1. ATR-based dynamic stops adjust to market volatility, avoiding stops too close or too far. 

2. Trading channel aims to capture mean reversion within trends. Good capital utilization when price oscillates within channel.

3. Continuous trend trading without predicting breakouts. Follows trends for better profitability.

4. Simple parameters and rules, easy to understand and automate.

5. High capital utilization, continuous trading provides more profit opportunities.

### Risks and Improvements

Some risks to consider:

1. Large ATR coefficients lead to stops too far away, failing to control risk. ATR multiples of 1-3x daily ATR are recommended.

2. Whipsaws in range-bound markets trigger frequent stops. Adjust ATR coefficients to reduce unwanted stops.

3. Potential losses when price reverses after initial breakout. Adding trend filter to trade channel breaks only in trend direction.  

4. Big spikes can make stops ineffective. Consider adding maximum stop loss limits.

Possible optimizations:

1. Optimize ATR parameters to find right balance between tracking volatility and preventing excessive stops.

2. Add trend indicator, only trade breaks in trend direction. Avoid countertrend trades.

3. Test parameters individually for each instrument to find optimal values.

4. Optimize entry, consider entering on channel midline breakouts. 

5. Increase position sizes while controlling total risk/drawdown.

### Conclusion
The ATR trailing stop strategy trades continuously in trends while dynamically managing risk. It suits volatile instruments and provides good capital utilization. Parameter optimization and adding filters can further refine performance. Overall a simple and practical trend following strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|26|Length|
|v_input_2|true|Length|
|v_input_3|2|Length|
|v_input_4|8|From Month|
|v_input_5|18|From Day|
|v_input_6|2008|From Year|
|v_input_7|true|To Month|
|v_input_8|true|To Day|
|v_input_9|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-25 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Investoz

//@version=4
strategy("ATR Strategy FOREX", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

len = input(26, type=input.integer, minval=1, title="Length")
mul = input(1, type=input.float, minval=0, title="Length")
mullow = input(2, type=input.float, minval=0, title="Length")

price = sma(close, 1)
average = ema(close, len)
diff = atr(len) * mul
difflow = atr(len) * mullow

bull_level = average + diff
bear_level = average - difflow
bull_cross = crossunder(price, bear_level)
bear_cross = crossunder(bull_level, price)

FromMonth = input(defval = 8, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 18, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2008, title = "From Year", minval = 2008)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2020, title = "To Year", minval = 2019)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)       
startTimeOk()  => true

if (startTimeOk())
    strategy.entry("KOP", strategy.long, when=bull_cross)
    strategy.close("KOP", when=bear_cross)  
    strategy.entry("SALJ", strategy.short, when=bear_cross)
    strategy.close("SALJ", when=bull_cross)

plot(price, title="price", color=color.black, transp=50, linewidth=2)
a0 = plot(average, title="average", color=color.red, transp=50, linewidth=1)
a1 = plot(bull_level, title="bull", color=color.green, transp=50, linewidth=1)
a2 = plot(bear_level, title="bear", color=color.red, transp=50, linewidth=1)
fill(a0, a1, color=color.green, transp=97)
fill(a0, a2, color=color.red, transp=97)
```

> Detail

https://www.fmz.com/strategy/427925

> Last Modified

2023-09-26 20:23:13
