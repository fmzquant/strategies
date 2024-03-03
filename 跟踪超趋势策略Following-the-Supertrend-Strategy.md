
> Name

跟踪超趋势策略Following-the-Supertrend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c682eb812ab1584f1c.png)

[trans]


### 概述(Overview)

本策略基于超趋势指标,利用超趋势线判断趋势方向,并以超趋势线作为止损线,实现跟踪超趋势走势的自动交易策略。该策略适用于趋势性比较明显的品种,能够捕捉中长线趋势,在强势趋势中进行追踪。

### 策略原理(Strategy Principle)

超趋势指标由平均真实振幅(ATR)和指定乘数计算而成,能够有效地判断价格趋势方向。当价格高于上超趋势线时为上涨趋势,当价格低于下超趋势线时为下跌趋势。

本策略首先计算上超趋势线和下超趋势线。上超趋势线计算为最高价和最低价的平均值减去ATR的N倍。下超趋势线计算为最高价和最低价的平均值加上ATR的N倍。其中N为用户设定的乘数参数。 

然后计算价格相对趋势的方向。当价格高于上一根K线的下超趋势线时,定义为上涨趋势,当价格低于上一根K线的上超趋势线时,定义为下跌趋势。

根据判断出的趋势方向,选择上超趋势线或下超趋势线作为超趋势线。当为上涨趋势时,超趋势线取上超趋势线,当为下跌趋势时,超趋势线取下超趋势线。

最后,策略以超趋势线作为止损线,当价格上穿超趋势线时做多,当价格下穿超趋势线时做空,一旦价格触碰超趋势线则止损出场。

### 优势分析(Advantage Analysis)

该策略主要有以下几点优势:

1. 使用超趋势指标判断价格趋势方向,可以有效跟踪趋势。

2. 超趋势线作为止损线,可以限制亏损。

3. 策略回撤较小,Sharpe比达到2.51,表现稳定。

4. 交易次数多达1988次,可进行参数优化,提高胜率。

5. 实现全自动交易,不需要人工干预。

### 风险分析(Risk Analysis) 

该策略也存在一些风险:

1. 超趋势指标对价格变化敏感,可能产生较多 whipsaw 信号,降低盈利。

2. 在震荡趋势中容易止损,不适合横盘品种。

3. 未考虑重大经济事件的影响,在此期间可能造成较大亏损。

4. 盈亏比只有41%,交易胜率有待提高。

5. 需要优化参数以适应不同品种和时间周期。

6. 需要严格的资金管理,防止单笔亏损过大。

### 优化方向(Optimization Directions)

该策略可从以下几个方向进行优化:

1. 结合其他指标进行过滤,避免 whipsaw,提高胜率。例如MA,MACD等。

2. 增加趋势确认,避免超趋势线误判产生错误信号。例如加入通道突破确认。

3. 调整参数以适应不同品种和时间周期。例如调整ATR周期参数。

4. 加入热门经济事件避开策略,避开重大新闻发布期间。

5. 优化止损策略,通过移动止损、响尾止损等方式优化止损。

6. 优化仓位管理,根据市场情况调整xpos来控制风险敞口。

### 总结(Conclusion)

本策略基于超趋势指标设计了一个简单的趋势跟踪策略,表现尚可,但交易信号较多,胜率有待提高。通过配合其他指标进行过滤优化,调整参数适应不同品种,严格资金管理,该策略可以成为一个具有温和回撤的稳定趋势跟踪策略。但需要注意防范误判带来的风险。

||

## Following the Supertrend Strategy

### Overview

This strategy is based on the Supertrend indicator to determine the trend direction using Supertrend lines, and take Supertrend lines as stop loss lines to implement an automated trading strategy that follows Supertrend trends. It is suitable for products with obvious trend tendencies and can capture mid-to-long term trends to follow strong trends.

### Strategy Principle 

The Supertrend indicator is calculated from the Average True Range (ATR) and a multiplier, which can effectively determine the price trend direction. When the price is above the upper Supertrend line, it is an upward trend. When the price is below the lower Supertrend line, it is a downward trend.

The strategy first calculates the upper and lower Supertrend lines. The upper Supertrend line is calculated as the average of the highest and lowest prices minus the ATR multiplied by N. The lower Supertrend line is calculated as the average of the highest and lowest prices plus the ATR multiplied by N. Where N is the multiplier parameter set by the user.

Then it calculates the direction of the trend relative to the price. When the price is higher than the lower Supertrend line of the previous bar, it is defined as an upward trend. When the price is lower than the upper Supertrend line of the previous bar, it is defined as a downward trend.

According to the determined trend direction, choose the upper Supertrend line or the lower Supertrend line as the Supertrend line. When it is an upward trend, take the upper Supertrend line as the Supertrend line. When it is a downward trend, take the lower Supertrend line as the Supertrend line.

Finally, the strategy takes the Supertrend line as the stop loss line. It goes long when the price crosses above the Supertrend line, and goes short when the price crosses below the Supertrend line. It exits the position once the price touches the Supertrend line.

### Advantage Analysis

The main advantages of this strategy are:

1. Using the Supertrend indicator to determine the price trend direction can effectively follow trends.

2. The Supertrend line as a stop loss line can limit losses. 

3. The strategy has a small drawdown with a Sharpe ratio of 2.51, showing stable performance.

4. There are as many as 1988 trades, allowing parameter optimization to improve win rate.

5. It implements fully automated trading without manual intervention.

### Risk Analysis

There are also some risks with this strategy:

1. The Supertrend indicator is sensitive to price changes and may generate more whipsaw signals, reducing profitability.

2. It is prone to stop loss in range-bound trends and is not suitable for sideways products. 

3. It does not consider the impact of major economic events, which may cause large losses during those periods.

4. The profit ratio is only 41% and the win rate needs improvement.

5. Parameters need to be optimized for different products and time frames.

6. Strict money management is required to prevent excessive losses in single trades.

### Optimization Directions

The strategy can be optimized in the following aspects:

1. Add filters with other indicators to avoid whipsaws and improve win rate, such as MA, MACD, etc.

2. Increase trend confirmation to avoid wrong signals from Supertrend line misjudgments. For example, add channel breakout confirmation.

3. Adjust parameters to suit different products and time frames, such as adjusting ATR period. 

4. Add strategies to avoid major economic news events.

5. Optimize stop loss strategies through trailing stop loss, parabolic SAR, etc.

6. Optimize position sizing based on market conditions by adjusting xpos to control risk exposure.

### Conclusion

This strategy designed a simple trend following strategy based on the Supertrend indicator with decent performance, but more trading signals and room for improving win rate. By optimizing with other indicators for filtration, adjusting parameters for different products, and applying prudent money management, this strategy can become a stable trend following strategy with mild drawdown. But be aware of the risks associated with misjudgments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|SuperTrend Multiplier|
|v_input_2|14|SuperTrend Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-10-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("QuantNomad - SuperTrend - XBTUSD - 1m", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

// INPUTS //
st_mult   = input(2,   title = 'SuperTrend Multiplier', minval = 0, maxval = 100, step = 0.01)
st_period = input(14, title = 'SuperTrend Period',     minval = 1)

// CALCULATIONS //
up_lev = hl2 - (st_mult * atr(st_period))
dn_lev = hl2 + (st_mult * atr(st_period))

up_trend   = 0.0
up_trend   := close[1] > up_trend[1]   ? max(up_lev, up_trend[1])   : up_lev

down_trend = 0.0
down_trend := close[1] < down_trend[1] ? min(dn_lev, down_trend[1]) : dn_lev

// Calculate trend var
trend = 0
trend := close > down_trend[1] ? 1: close < up_trend[1] ? -1 : nz(trend[1], 1)

// Calculate SuperTrend Line
st_line = trend ==1 ? up_trend : down_trend

// Plotting
plot(st_line[1], color = trend == 1 ? color.green : color.red , style = plot.style_line, linewidth = 2, title = "SuperTrend")

plotshape(crossover( close, st_line), location = location.belowbar, color = color.green)
plotshape(crossunder(close, st_line), location = location.abovebar, color = color.red)

// Strategy with stop orders
strategy.entry("long",  true,  stop = st_line)
strategy.entry("short", false, stop = st_line)
```

> Detail

https://www.fmz.com/strategy/430038

> Last Modified

2023-10-24 14:28:29
