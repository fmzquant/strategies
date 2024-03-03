
> Name

对数移动平均聚合散策略Logarithmic-Moving-Average-Convergence-Divergence-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于对数移动平均聚合散波指标(Logarithmic MACD)生成交易信号。它通过计算快速和慢速对数移动平均线的差值,判断市场趋势和机会。

## 策略原理

该策略的主要逻辑是:

- 计算快速对数移动平均线(默认12日)和慢速对数移动平均线(默认26日)

- 对数MACD 是二者的差值,表达市场动量

- 信号线是MACD的平滑移动平均(默认9日)

- 当MACD线从下方突破信号线时做多

- 当MACD线从上方跌破信号线时做空

- 采用柱状图形式表达MACD和信号线差值

相比简单移动平均MACD,对数MACD可突出显示指数级增长市场的变化趋势。对数转换后,波动较大的数值在图表上可以保持相对可比性。

## 策略优势 

- 利用对数转换,可检测指数级别的价格变动

- 对数MACD突显价格波动信息

- 信号线平滑MACD,形成交易信号

- 柱状MACD直观表达趋势方向

## 策略风险

- 对数转换可能放大价格震荡

- 信号频繁,容易过度交易

- 未考虑止损管理,风险控制不完备

对应措施:

- 调整参数,降低信号频率

- 增加过滤条件,避免在震荡中产生信号

- 设定止损策略,控制单笔损失

## 策略优化方向

- 优化参数,提高稳定性

- 尝试其他指数转换方式,如指数移动平均线

- 结合趋势指标过滤信号

- 增加止损策略

- 利用机器学习判断信号可靠性

## 总结

该策略运用对数转换提升了MACD指标的敏感性,能更早发现趋势变化。但需注意控制交易频率。通过参数优化、风控等提升,该策略可成为一个稳定且富有个性的量化交易系统。

|| 

## Overview 

This strategy generates trading signals using the Logarithmic MACD indicator. It calculates the difference between fast and slow logarithmic moving averages to gauge market momentum and opportunities.

## Strategy Logic

The main logic is:

- Calculate fast logarithmic MA (default 12) and slow logarithmic MA (default 26)

- Logarithmic MACD is their difference, expressing market momentum

- Signal line is smoothed MA of MACD (default 9) 

- Go long when MACD crosses above signal from below

- Go short when MACD crosses below signal from above

- MACD-Signal difference plotted as histogram 

Compared to simple MACD, logarithmic MACD can better highlight exponential growth trends. Log transform maintains comparability of volatile values on the chart.

## Advantages

- Detects exponential price movements using logarithmic transform

- Log MACD highlights price fluctuation information

- Signal line smooths MACD into trading signals  

- MACD histogram intuitively shows trend direction

## Risks

- Log transform may amplify price noise 

- Frequent signals, risks over-trading

- No stop loss management, incomplete risk control

Mitigations:

- Adjust parameters to reduce signal frequency

- Add filters to avoid signals in choppy conditions

- Implement stop loss to control loss per trade

## Enhancement Opportunities 

- Optimize parameters for stability

- Try other transforms like exponential moving average

- Add trend filter to screen signals

- Incorporate stop loss strategies

- Use machine learning to judge signal reliability

## Conclusion

The logarithmic transform enhances MACD's sensitivity for early trend detection. But trade frequency should be controlled. With optimizations in parameters, risk management etc., this strategy can become a stable and unique quantitative system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|9|Signal Smoothing|
|v_input_5|false|Simple MA(Oscillator)|
|v_input_6|false|Simple MA(Signal Line)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Logarithmic Moving Average Convergence Divergence Strategy", shorttitle="LMACD Strategy")

// Getting inputs
fast_length = input(title="Fast Length",  defval=12)
slow_length = input(title="Slow Length",  defval=26)
src = input(title="Source",  defval=close)
signal_length = input(title="Signal Smoothing",  minval = 1, maxval = 50, defval = 9)
sma_source = input(title="Simple MA(Oscillator)",  defval=false)
sma_signal = input(title="Simple MA(Signal Line)", defval=false)

// Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00

// Calculating
fast_ma = sma_source ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source ? sma(src, slow_length) : ema(src, slow_length)
lmacd = log(fast_ma) - log(slow_ma)
signal = sma_signal ? sma(lmacd, signal_length) : ema(lmacd, signal_length)
hist = lmacd - signal

plot(hist, title="Histogram", style=columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below) ), transp=0 )
plot(lmacd, title="LMACD", color=col_macd, transp=0)
plot(signal, title="Signal", color=col_signal, transp=0)

if (crossover(hist, 0))
	strategy.entry("Long", strategy.long, comment="LMACD long")
if (crossunder(hist, 0))
	strategy.entry("Short", strategy.short, comment="LMACD short")
```

> Detail

https://www.fmz.com/strategy/427482

> Last Modified

2023-09-21 15:38:05
