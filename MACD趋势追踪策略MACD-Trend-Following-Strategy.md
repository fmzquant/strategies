
> Name

MACD趋势追踪策略MACD-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10f4a7de16353ec4c9d.png)
[trans]
### 概述

MACD趋势追踪策略通过计算MACD指标及其信号线的金叉死叉来判断趋势,实现追踪趋势获利。

### 策略原理

该策略基于MACD指标判断趋势方向。MACD指标是一种趋势跟踪指数平滑异同移动平均线,由快线(MACD)、慢线(Signal)和histogram组成。快线和慢线的金叉表明行情可能启动牛市,而死叉表明行情可能启动熊市。Histogram代表快线和慢线的差值,通过颜色变化判断两个平均线的远近及变化速度。

当Histogram从负数升至正数时产生金叉信号,表示行情可能才刚开始,可以建立多头仓位;当Histogram从正数转为负数时产生死叉信号,表示行情可能见顶,可以平掉多头仓位或建立空头仓位。

### 优势分析

- 利用双 smoothing平均线金、死叉形态判断趋势,胜率较高
- Histogram可清晰判断MACD指标的走势和速度  
- 参数优化空间大,可调整至最佳状态
- 可配合其他指标过滤假信号

### 风险及优化

- 存在一定程度的滞后性
- 可能发出假信号
- 可尝试MA、KD等指标确认趋势
- 可调整参数寻找最佳配置

### 总结

MACD趋势追踪策略整体来说是一种较为可靠的趋势判断方法。通过优化参数,配合其它指标确认,可以大幅度降低假信号率,从而获取更高的策略收益。该策略思路简单易懂,是自动化量化交易入门的首选。

||


### Overview

The MACD trend following strategy judges the trend by calculating the golden cross and dead cross of the MACD indicator and its signal line to follow the trend for profit.

### Strategy Principle  

This strategy is based on the MACD indicator to determine the trend direction. The MACD indicator is a trend-following momentum indicator, consisting of the MACD line, Signal line and Histogram. The golden cross of the MACD and Signal lines suggests a potential bull market, while the dead cross suggests a potential bear market. The Histogram represents the difference between the two lines, indicating their divergence and changing speed through color change.

When the Histogram rises from negative to positive, a golden cross signal is generated, indicating the uptrend may just begin, and long positions can be built. When the Histogram turns from positive to negative, a dead cross signal is generated, indicating the uptrend may be topping, and long positions can be exited or short positions can be built.

### Advantage Analysis

- Utilize golden/dead cross of double smoothing lines to judge trend with relatively high win rate
- Histogram clearly indicates the progress and speed of MACD indicator
- Large parameter tuning space for optimization
- Can be combined with other indicators to filter fake signals

### Risk and Optimization

- There is some degree of lagging  
- May generate fake signals
- Try confirming trends with MA, KD etc.
- Adjust parameters for best configuration

### Conclusion

The MACD trend following strategy overall is a relatively reliable way to determine trends. By optimizing parameters and confirming with other indicators, the fake signal rate can be largely reduced, resulting in higher strategy profit. The strategy logic is simple and easy to understand, making it the first choice for algorithmic trading starters.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|9|Signal Smoothing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-17 00:00:00
end: 2023-11-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("MACD")

// Getting inputs
fastLength = input(title="Fast Length",  defval=12)
slowlength = input(title="Slow Length",  defval=26)
src = input(title="Source",  defval=close)
signalLength = input(title="Signal Smoothing",  minval = 1, maxval = 50, defval = 9)

// Calculating
macd = ema(close, fastLength) - ema(close, slowlength)
signal = ema(macd, signalLength)
delta = macd - signal

// Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00

// Plot histogram
plot(delta, title="Histogram", style=columns, color=(delta>=0 ? (delta[1] < delta ? col_grow_above : col_fall_above) : (delta[1] < delta ? col_grow_below : col_fall_below) ), transp=0 )
plot(macd, title="MACD", color=col_macd, transp=0)
plot(signal, title="Signal", color=col_signal, transp=0)

// Plot orders
if (crossover(delta, 0))
    strategy.entry("buy", strategy.long)
if (crossunder(delta, 0))
    strategy.entry("sell", strategy.short)






```

> Detail

https://www.fmz.com/strategy/433124

> Last Modified

2023-11-24 15:51:39
