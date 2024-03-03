
> Name

EMA200-and-Stochastic-RSI-Strategy

> Author

ChaoZhang

> Strategy Description


EMA200 and Stochastic RSI Strategy

This strategy is a combination of the Exponential Moving Average (EMA) and the Stochastic Relative Strength Index (RSI). It is designed to identify long and short trading opportunities based on the movement of the price above or below the EMA200 and the Stochastic RSI values.

How the strategy works

The strategy uses the following conditions to generate entry signals:

Long entry:
The price is above the EMA200.
The Stochastic RSI is below 20 and has crossed above the RSI.
The current candle is a higher high candle.
The current candle's body is at least 5% larger than the previous candle's body.
Short entry:
The price is below the EMA200.
The Stochastic RSI is above 80 and has crossed below the RSI.
The current candle is a lower low candle.
The current candle's body is at least 5% smaller than the previous candle's body.
Benefits of the strategy

The strategy has a number of potential benefits, including:

It is based on two well-established technical indicators. The EMA and the Stochastic RSI are both widely used by traders and have a long history of success.
It is relatively easy to understand and implement. The strategy has a limited number of parameters, making it easy for traders of all experience levels to understand and use.
It is flexible and can be used in a variety of market conditions. The strategy can be used to trade both long and short positions, and it can be used in both trending and ranging markets.
Risks of the strategy

As with any trading strategy, there are also some potential risks associated with using the EMA200 and Stochastic RSI strategy, including:

The strategy is based on historical data. There is no guarantee that the strategy will be profitable in the future.
The strategy can be susceptible to whipsaw. This is when the price of an asset moves rapidly in both directions, which can lead to losses.
The strategy can be volatile. This means that there is a risk of large losses.
Conclusion

The EMA200 and Stochastic RSI strategy is a relatively simple and effective trading strategy that can be used by traders of all experience levels. However, it is important to remember that no trading strategy is guaranteed to be profitable, and traders should always use caution when using any trading strategy.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|(?用户自定义参数)ATR倍数|
|v_input_float_1|1.5|盈亏比|
|v_input_int_1|20|上下影线点比(%)|
|v_input_float_2|0.5|关键K线涨跌幅(%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-08-30 00:00:00
end: 2023-09-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © eaglezou1006

//@version=5
//strategy("70000%", overlay = true, initial_capital = 100, commission_value = 0.04, commission_type =strategy.commission.percent, pyramiding = 1, default_qty_value = 100, default_qty_type = strategy.cash, currency = currency.USDT)
//Stoch RSI
rsi1 = ta.rsi(close, 14)
k = ta.sma(ta.stoch(rsi1, rsi1, rsi1, 14), 3)
d = ta.sma(k, 3)
//ema
ema200 = ta.ema(close, 200)
plot(ema200, color = color.white)
//atr
length = 14
smoothing = 'RMA'
m = input(2, 'ATR倍数', group = "用户自定义参数")
src1 = high
src2 = low
pline = true

collong = color.teal
colshort = color.red

a = ta.rma(ta.tr(true), length) * m
x = ta.rma(ta.tr(true), length) * m + src1
x2 = src2 - ta.rma(ta.tr(true), length) * m
p1 = plot(x, title='ATR Short Stop Loss', color=color.new(colshort, 20), trackprice=pline ? true : false)
p2 = plot(x2, title='ATR Long Stop Loss', color=color.new(collong, 20), trackprice=pline ? true : false)

rewardRiskRatio = input.float(defval = 1.5, title = "盈亏比", minval = 1, maxval = 15, step = 0.1, group = "用户自定义参数")
highLowShadowRatio = input.int(defval = 20, title = "上下影线点比(%)", minval = 1, maxval = 100, step = 1, group = "用户自定义参数")
keyCandlestickChange = input.float(defval = 0.5, title = "关键K线涨跌幅(%)", minval = 0.1, maxval = 100, step = 0.1, group = "用户自定义参数")

longCondition = close > ema200 and (k < 20 and d < 20 and ta.crossover(k, d)) and high > high[1] and close[1] > open[1] and (close > open and (high-close) / (high-low) <= highLowShadowRatio / 100 and (close / open) - 1 >= keyCandlestickChange / 100)
shortCondition = close < ema200 and (k > 80 and d > 80 and ta.crossunder(k, d)) and low < low[1] and close[1] < open[1] and (close < open and math.abs(high-open) / math.abs(high-close) <= highLowShadowRatio / 100 and 1 - (close / open) >= keyCandlestickChange / 100 )
plotshape(longCondition, 'Buy', shape.labelup, location.belowbar, color=collong, size=size.small, offset=0)
plotshape(shortCondition, 'Sell', shape.labeldown, location.abovebar, color=colshort, size=size.small, offset=0)

if longCondition
    strategy.entry("Enter Long", strategy.long)
else if shortCondition
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/425882

> Last Modified

2023-09-06 11:28:53
