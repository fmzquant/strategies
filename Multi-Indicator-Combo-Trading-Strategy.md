
> Name

Multi-Indicator-Combo-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy combines multiple technical indicators like moving averages, RSI and Stochastics to assess price trend and overbought/oversold levels for trade signals. It harnesses the strengths of multiple indicators for more reliable decisions.

Strategy Logic:

1. Use multiple EMAs to determine overall price trend.

2. Calculate RSI and Stochastics for overbought/oversold levels.

3. Enter long when EMAs give bull signal, RSI not overbought and Stoch not overbought.

4. Enter short when EMAs give bear signal, RSI not oversold and Stoch not oversold.

5. Exit when any indicator gives opposite signal.

Advantages:

1. Multi-indicator verification improves accuracy. 

2. Indicators complement each other for better market assessment.

3. Clear trading rules ease backtesting and execution.

Risks:

1. Avoid excessive redundancy across indicators.

2. Complex multi-indicator optimization.

3. More indicators does not necessarily improve performance.

In summary, the multi-indicator approach can improve decisions to some extent but requires balancing optimization difficulty and redundancy for simple, reliable strategies.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-06 00:00:00
end: 2023-09-12 00:00:00
period: 3d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// strategy(title='Combined Strategy', default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=.0020, pyramiding=0, slippage=3, overlay=true)

//----------//
// MOMENTUM //
//----------//
ema8 = ta.ema(close, 5)
ema13 = ta.ema(close, 9)
ema21 = ta.ema(close, 13)
ema34 = ta.ema(close, 21)
ema55 = ta.ema(close, 34)

plot(ema8, color=color.new(color.red, 0), style=plot.style_line, title='5', linewidth=1)
plot(ema13, color=color.new(color.orange, 0), style=plot.style_line, title='9', linewidth=1)
plot(ema21, color=color.new(color.yellow, 0), style=plot.style_line, title='13', linewidth=1)
plot(ema34, color=color.new(color.aqua, 0), style=plot.style_line, title='21', linewidth=1)
plot(ema55, color=color.new(color.lime, 0), style=plot.style_line, title='34', linewidth=1)

longEmaCondition = ema8 > ema13 and ema13 > ema21 and ema21 > ema34 and ema34 > ema55
exitLongEmaCondition = ema13 < ema55

shortEmaCondition = ema8 < ema13 and ema13 < ema21 and ema21 < ema34 and ema34 < ema55
exitShortEmaCondition = ema13 > ema55

// ----------  //
// OSCILLATORS //
// ----------- //
rsi = ta.rsi(close, 14)
longRsiCondition = rsi < 70 and rsi > 40
exitLongRsiCondition = rsi > 70

shortRsiCondition = rsi > 30 and rsi < 60
exitShortRsiCondition = rsi < 30

Stochastic
length = 14, smoothK = 3, smoothD = 3
kFast = ta.stoch(close, high, low, 14)
dSlow = ta.sma(kFast, smoothD)

longStochasticCondition = kFast < 80
exitLongStochasticCondition = kFast > 95

shortStochasticCondition = kFast > 20
exitShortStochasticCondition = kFast < 5

//----------//
// STRATEGY //
//----------//

longCondition = longEmaCondition and longRsiCondition and longStochasticCondition and strategy.position_size == 0
exitLongCondition = (exitLongEmaCondition or exitLongRsiCondition or exitLongStochasticCondition) and strategy.position_size > 0

if (longCondition)
  strategy.entry("LONG", strategy.long)
if (exitLongCondition)
  strategy.close("LONG")

shortCondition = shortEmaCondition and shortRsiCondition and shortStochasticCondition and strategy.position_size == 0
exitShortCondition = (exitShortEmaCondition or exitShortRsiCondition or exitShortStochasticCondition) and strategy.position_size < 0

if (shortCondition)
  strategy.entry("SHORT", strategy.short)
if (exitShortCondition)
  strategy.close("SHORT")


```

> Detail

https://www.fmz.com/strategy/426561

> Last Modified

2023-09-13 12:18:05
