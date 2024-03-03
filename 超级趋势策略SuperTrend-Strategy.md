
> Name

超级趋势策略SuperTrend-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

超级趋势策略是一种基于平均真实波幅计算的趋势跟踪策略。它利用平均真实波幅来设置止损线,通过判断价格是否突破止损线来判断趋势方向,以此产生交易信号。

## 策略原理

该策略首先计算一定周期内的平均真实波幅ATR。然后根据ATR值乘以一个缩放系数来计算长线止损线和短线止损线。具体计算方法如下:

```
atr = mult * atr(length) 

longStop = hl2 - atr

shortStop = hl2 + atr
```

其中length为计算ATR的周期长度,mult为ATR的缩放系数。 

计算出止损线后,策略持续判断价格是否突破上一根K线的止损线,以判定趋势方向:

```
dir := dir == -1 and close > shortStopPrev ? 1 : 
         dir == 1 and close < longStopPrev ? -1 : dir
```

当突破长线止损线时,认为趋势转多,当突破短线止损线时,认为趋势转空。

根据趋势方向变化情况,产生买入和卖出信号:

```
buySignal = dir == 1 and dir[1] == -1 

sellSignal = dir == -1 and dir[1] == 1
```

最后,在买入和卖出信号出现时,进行相应的交易操作。

## 策略优势

1. 使用平均真实波幅计算止损线,可以有效滤除市场噪音,捕捉较为可靠的趋势信号。

2. 策略参数较少,容易理解和操作。ATR周期和倍数系数可以进行调整,适应不同市场环境。

3. 采用突破止损线判断趋势方向变化,可以有效控制风险,及时止损。

4. 可配置做多或双向交易,可满足不同交易风格。

5. 可以在任何时间周期内使用,适用于多种交易品种。

## 策略风险

1. 在震荡行情中,ATR值可能被拉高,导致止损线过宽,产生更多虚假信号。

2. 无法确定最佳的参数组合,ATR周期和倍数需要根据市场情况进行优化。

3. 无法确定交易品种的最佳交易周期,需要针对每种交易品种进行测试。

4. 无法确定最佳的入场时机,存在一定的滞后。

5. 存在一定的空仓风险,在趋势较弱时可能处于空仓状态。

6. 存在止损被突破的风险,应适当宽松止损线。

## 策略优化方向

1. 可以考虑结合其他指标进行过滤,避免在震荡行情中产生错误信号。例如MACD、RSI等。

2. 可以采用机器学习或遗传算法来寻找最佳的参数组合。

3. 可以针对不同品种进行参数优化,确定最佳的ATR周期和倍数系数。

4. 可以结合量能指标判断入场时机,例如成交量,避免过早入场。

5. 可以考虑采用锁仓策略,在空仓时仍能持有头寸。

6. 可以适当放宽止损范围,并结合趋势力度指标优化止损位置。

## 总结

超级趋势策略通过平均真实波幅计算动态止损线,判断价格突破来发现趋势变化,属于一种较为可靠和风险可控的趋势跟踪策略。该策略简单易用,适用于多种交易品种,但需要针对参数和策略规则进行优化,才能在不同市场中获得较好的效果。与其他技术指标和策略组合使用可以获得更好的交易表现。总体来说,超级趋势策略基于较为科学的概念,值得交易者进一步研究和应用。

|| 


## Overview

The SuperTrend strategy is a trend following strategy based on the calculation of Average True Range. It uses ATR to set stop loss lines and determines the trend direction by judging whether the price breaks through the stop loss lines, thus generating trading signals.

## Strategy Logic  

The strategy first calculates the Average True Range (ATR) over a certain period. Then it uses the ATR value multiplied by a scaling factor to calculate the long stop loss line and short stop loss line. The specific calculation is as follows:

```
atr = mult * atr(length)

longStop = hl2 - atr 

shortStop = hl2 + atr
```

Where length is the period to calculate ATR, and mult is the scaling factor for ATR.

After calculating the stop loss lines, the strategy keeps judging whether the price breaks through the stop loss line of the previous bar to determine the trend direction:  

```
dir := dir == -1 and close > shortStopPrev ? 1 :  
         dir == 1 and close < longStopPrev ? -1 : dir
```

When the long stop loss line is broken, the trend is considered bullish. When the short stop loss line is broken, the trend is considered bearish.

According to the change of trend direction, buy and sell signals are generated:

```
buySignal = dir == 1 and dir[1] == -1

sellSignal = dir == -1 and dir[1] == 1 
```

Finally, corresponding trading actions are taken when buy or sell signals appear.

## Advantages

1. Using ATR to calculate stop loss lines can effectively filter out market noise and capture more reliable trend signals.

2. The strategy has few parameters which are easy to understand and operate. The ATR period and multiplier can be adjusted to adapt to different market conditions.

3. Using stop loss line breakout to determine trend direction change can effectively control risks and stop loss in time. 

4. Configurable for long only or dual direction trading to suit different trading styles.

5. Can be used on any timeframe and for various trading instruments.

## Risks

1. In ranging markets, ATR may be pulled higher leading to wider stop loss and more false signals.

2. The optimal parameter combination is uncertain. ATR period and multiplier need optimization based on market conditions.

3. The optimal timeframe for each trading instrument is unknown and needs to be tested.

4. The best entry timing is unclear and some lag exists. 

5. There are risks of being not in the market when the trend is weak.

6. There are risks of stop loss being hit. Wider stop loss may be considered.

## Enhancement

1. Other indicators like MACD, RSI can be incorporated for filtration to avoid wrong signals in ranging markets.

2. Machine learning or genetic algorithms can be used to find the optimal parameter sets.

3. Parameter optimization can be done for each instrument to find the best ATR period and multiplier. 

4. Volume indicators can be used to determine better entry timing and avoid premature entry.

5. Consider using locking strategies to hold positions when not in the market.

6. Stop loss width can be relaxed and optimized with trend strength indicators.

## Conclusion

The SuperTrend strategy uses dynamic stop loss lines calculated from ATR to detect trend changes when price breakout occurs. It is a relatively reliable and risk-controlled trend following system. The strategy is simple to use and applicable to various instruments, but parameters and rules need optimization for better performance across different markets. Combining with other technical indicators and strategies can further improve trading results. In general, SuperTrend is based on scientifically sound concepts and is worth further research and application by traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long Only ?|
|v_input_2|22|ATR Period|
|v_input_3|3|ATR Multiplier|
|v_input_4|true|Show Buy/Sell Labels ?|
|v_input_5|true|From Day|
|v_input_6|true|From Month|
|v_input_7|2019|From Year|
|v_input_8|true|To Day|
|v_input_9|true|To Month|
|v_input_10|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-12 00:00:00
end: 2023-10-12 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// strategy("SuperTrend Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=1000)

LongOnly = input(title="Long Only ?", type=input.bool, defval=true)
length = input(title="ATR Period", type=input.integer, defval=22)
mult = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
showLabels = input(title="Show Buy/Sell Labels ?", type=input.bool, defval=true)

////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE

// From Date Inputs
fromDay = input(defval=1, title="From Day", minval=1, maxval=31)
fromMonth = input(defval=1, title="From Month", minval=1, maxval=12)
fromYear = input(defval=2019, title="From Year", minval=1970)

// To Date Inputs
toDay = input(defval=1, title="To Day", minval=1, maxval=31)
toMonth = input(defval=1, title="To Month", minval=1, maxval=12)
toYear = input(defval=2020, title="To Year", minval=1970)

// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true

////////////////////////////////////////////////////////////////////////////////


atr = mult * atr(length)

longStop = hl2 - atr
longStopPrev = nz(longStop[1], longStop)
longStop := close[1] > longStopPrev ? max(longStop, longStopPrev) : longStop

shortStop = hl2 + atr
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := close[1] < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop

dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and close > shortStopPrev ? 1 : 
   dir == 1 and close < longStopPrev ? -1 : dir

longColor = color.green
shortColor = color.red


plot(dir == 1 ? longStop : na, title="Long Stop", style=plot.style_linebr, linewidth=2, color=longColor)
buySignal = dir == 1 and dir[1] == -1
plotshape(buySignal ? longStop : na, title="Long Stop Start", location=location.absolute, style=shape.circle, size=size.tiny, color=longColor, transp=0)
plotshape(buySignal and showLabels ? longStop : na, title="Buy Label", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=longColor, textcolor=color.white, transp=0)

plot(dir == 1 ? na : shortStop, title="Short Stop", style=plot.style_linebr, linewidth=2, color=shortColor)
sellSignal = dir == -1 and dir[1] == 1
plotshape(sellSignal ? shortStop : na, title="Short Stop Start", location=location.absolute, style=shape.circle, size=size.tiny, color=shortColor, transp=0)
plotshape(sellSignal and showLabels ? shortStop : na, title="Sell Label", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=shortColor, textcolor=color.white, transp=0)

if LongOnly
    if buySignal and time_cond
        strategy.entry("Long", strategy.long, comment="Long")
    
    if(sellSignal and time_cond)
        strategy.close("Long")
else
    if buySignal and time_cond
        strategy.entry("Long", strategy.long, comment="Long")
    else
        strategy.cancel("Long")
    
    
    if sellSignal and time_cond
        strategy.entry("Short", strategy.short, comment="Short")
    else
        strategy.cancel("Short")

if not time_cond
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/429161

> Last Modified

2023-10-13 17:03:55
