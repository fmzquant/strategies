
> Name

增强移动平均聚合趋势策略Enhanced-Moving-Average-Convergence-Trend-Strategy

> Author

ChaoZhang

> Strategy Description



[trans]

## 策略原理

该策略基于增强型MACD指标进行趋势追踪。它同时计算快速移动平均线、慢速移动平均线以及二者的差值,并再对差值进行移动平均来产生交易信号。

具体逻辑是:

1. 计算快速EMA周期,如12日

2. 计算慢速EMA周期,如26日

3. 计算快慢EMA的差值为MACD

4. 对MACD进行信号线EMA,如9日EMA

5. 再对MACD与信号线的差值进行EMA生成增强信号线

6. 当增强信号线上穿零轴时做多

7. 当增强信号线下穿零轴时平多仓

该策略充分发掘MACD指标的趋势跟踪特性,并进行二次优化滤波从而提高信号质量,追捧中长线趋势。

## 策略优势

- 增强MACD降噪提高信号准确度

- 快慢EMA配合判断方向和力度 

- 较慢参数侧重中长线趋势

## 策略风险

- 需谨慎选择EMA周期参数

- 仅做多无法利用空头机会

- 信号出现频率偏少

## 总结

该策略通过增强MACD的趋势跟踪能力来识别中长线机会。但参数优化和风险控制尤为重要。适当组合其他因素能提高效果。


||

## Strategy Logic

This trend following strategy utilizes an enhanced MACD indicator. It calculates fast EMA, slow EMA, their difference, and EMA of that difference to generate signals.

The logic is:  

1. Compute fast EMA period, e.g. 12-day

2. Compute slow EMA period, e.g. 26-day 

3. Subtract fast from slow EMA to get MACD

4. Take EMA of MACD as signal line, e.g. 9-day

5. EMA of MACD minus signal gives enhanced signal 

6. Go long when enhanced signal crosses above zero line

7. Close long when enhanced signal crosses below zero line

The strategy taps into MACD's trend following ability, and optimizes it further for quality mid- to long-term trend signals. 

## Advantages

- Enhanced MACD reduces noise and improves signals

- Fast/slow EMA combo gauges direction and strength

- Slower parameters focus on mid- to long-term trends

## Risks

- Careful optimization of EMA periods needed 

- LONG only unable to use short opportunities

- Less frequent signal occurrence 

## Summary

This strategy leverages enhanced MACD for improved mid- to long-term trend identification. But optimization and risk controls are key. Combining with other factors can improve performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|Backtest Start Year|
|v_input_2|4|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2018|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|31|Backtest Stop Day|
|v_input_7|12|fastperiod|
|v_input_8|26|slowperiod|
|v_input_9|9|signalperiod|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-07 00:00:00
end: 2023-09-13 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//study("MACDAS")
// strategy("macdas",shorttitle="macdas",overlay=true,default_qty_value=10000,initial_capital=10000,currency=currency.USD)

// Date range filter
testStartYear = input(2018, "Backtest Start Year")
testStartMonth = input(4, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, 0, 0)

testStopYear = input(2018, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)

inTimeRange = true


fastperiod = input(12,title="fastperiod",minval=1,maxval=500)
slowperiod = input(26,title="slowperiod",minval=1,maxval=500)
signalperiod = input(9,title="signalperiod",minval=1,maxval=500)
fastMA = ema(close, fastperiod)
slowMA = ema(close, slowperiod)
macd = fastMA - slowMA
signal = ema(macd, signalperiod)
macdAS = macd - signal
signalAS = ema(macdAS, signalperiod)
plot(macdAS, color=blue, linewidth=2)
plot(signalAS, color=red, linewidth=2)
plot(0, color=black)

strategy.entry("LONG", strategy.long, when =inTimeRange and crossover(macdAS,signalAS))
strategy.close("LONG", when= inTimeRange and crossunder(macdAS,signalAS))

plotshape(crossover(macdAS, signalAS) , style = shape.arrowup, text="Long",color=green,size=size.huge)
plotshape(crossover(signalAS,macdAS) , style = shape.arrowdown, text="End Long",color=red,size=size.huge)


```

> Detail

https://www.fmz.com/strategy/426808

> Last Modified

2023-09-14 16:46:53
