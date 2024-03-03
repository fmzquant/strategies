
> Name

超级趋势与移动平均线结合策略Supertrend-and-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ec391f92b96cd49e8b.png)
[trans]
## 概述

本策略名称为“超级趋势与移动平均线结合策略”。该策略结合使用超级趋势指标和移动平均线,在超级趋势指示上升趋势而10日EMA又高于20日SMA时做多,在超级趋势指示下跌趋势而10日EMA又低于20日SMA时做空,是一个典型的趋势跟踪策略。

## 策略原理

本策略使用超级趋势指标判断市场趋势方向。超级趋势指标基于Average True Range和Factor来计算,当价格高于超级趋势线时为上升趋势,当价格低于超级趋势线时为下跌趋势。本策略中的Factor取3.0,ATR长度取10。

另外,策略中使用10日EMA和20日SMA构建移动平均线。EMA(指数移动平均线)对最近期价格赋予更高权重,SMA(简单移动平均线)按照平等权重考虑所有数据。当短期EMA高于长期SMA时,被视为买入信号。

综合来说,本策略的交易信号Generation逻辑为:

多头入场:超级趋势>0(上升趋势) 且 10日EMA > 20日SMA  
空头入场:超级趋势<0(下跌趋势) 且 10日EMA < 20日SMA

也就是在超级趋势确定趋势方向的同时,利用移动平均线的金叉死叉作为辅助判断,构建该趋势跟踪策略。

## 优势分析

本策略最大的优势在于结合超级趋势和移动平均线两个指标,使得可靠性和灵敏度 both得到提高。具体来说主要有以下几个优势:

1. 超级趋势指标判断主趋势非常清晰,可减少假信号
2. EMA和SMA的配合可提高对趋势转折的灵敏度
3. 同时判断多种因素,综合判断信号,可靠性更高  
4. 使用简单清晰的指标,容易理解和优化
5. 可配置超级趋势和移动平均线的参数,优化空间大

## 风险分析

本策略也存在一些风险,主要体现在以下几个方面:  

1. 超级趋势参数设置不当可能错过转折点
2. 移动平均线参数设置不当可能产生假信号
3. 回测周期选取不当,可能高估策略效果
4. 没有考虑交易成本的影响

对于超级趋势,可以测试不同的ATR长度和Factor参数来优化;对于移动平均线可以测试EMA和SMA的长度;回测周期要充分考虑不同市场环境。此外,实盘过程中一定要加入适当的交易成本。

## 优化方向  

本策略的优化空间较大,主要可以从以下几个方面进行优化:

1. 调整超级趋势中的ATR长度和Factor参数
2. 调整EMA和SMA的长度参数
3. 添加其他指标过滤信号,如RSI,MACD等
4. 调整买入条件为超级趋势上涨且EMA上穿SMA一定周期后
5. 添加止损策略

通过参数调整和添加辅助指标过滤,可以进一步提高策略表现和稳定性。此外,配置止损策略也很重要,可以有效控制风险。

## 总结

本策略名称为“超级趋势与移动平均线结合策略”,结合使用超级趋势判断趋势方向,以及EMA和SMA构建交易信号,属于典型的趋势跟踪策略。该策略可靠性较高,优化空间较大,值得实盘验证优化。但也要注意控制风险,防止参数优化过度。

||

## Overview

The strategy is named "Supertrend and Moving Average Crossover Strategy". It combines the Supertrend indicator and moving averages, going long when the supertrend indicates an uptrend and 10-day EMA is above 20-day SMA, and going short when the supertrend indicates a downtrend and 10-day EMA is below 20-day SMA. It's a typical trend following strategy.  

## Strategy Logic  

The strategy uses the Supertrend indicator to determine the market trend direction. Supertrend is calculated based on Average True Range and a Factor. When the price is above Supertrend line, it's an uptrend; when the price is below Supertrend line, it's a downtrend. In this strategy, the Factor is set to 3.0 and ATR length is 10.

In addition, the strategy uses 10-day EMA and 20-day SMA to construct moving averages. EMA (Exponential Moving Average) assigns higher weight to recent prices, while SMA (Simple Moving Average) considers all data with equal weight. When the shorter-term EMA is above the longer-term SMA, it's considered a buy signal.   

In summary, the trade signal generation logic is:

Long entry: Supertrend > 0 (uptrend) AND 10-day EMA > 20-day SMA 
Short entry: Supertrend < 0 (downtrend) AND 10-day EMA < 20-day SMA  

So it determines the trend direction with Supertrend and uses the moving average crossover for additional confirmation, to construct this trend following strategy.  

## Advantage Analysis

The biggest advantage of this strategy is combining Supertrend and moving averages, which improves both reliability and sensitivity. The main advantages are:  

1. Supertrend clearly identifies the main trend, reducing false signals
2. EMA+SMA crossover improves sensitivity to trend changes  
3. Judging multiple factors improves reliability
4. Simple and clear indicators, easy to understand and optimize  
5. High flexibility to adjust parameters of Supertrend and MAs  

## Risk Analysis  

There are some risks in this strategy:   

1. Improper Supertrend parameters may miss turn points
2. Improper MA parameters may generate false signals 
3. Improper backtest period selection may overestimate performance  
4. No consideration of trading costs  

We can test different ATR and Factor values for Supertrend, and different length values for MAs. Also the backtest period should cover different market environments. Trading costs should be added in live trading.

## Optimization Directions

There is large room for optimization:  

1. Adjust ATR length and Factor in Supertrend 
2. Adjust length of EMA and SMA
3. Add other indicators like RSI, MACD for signal filtering 
4. Buy when Supertrend turns up and EMA crosses over SMA after some duration
5. Add stop loss strategy  

This can further improve performance and stability. Also stop loss configuration is important for risk control.  

## Conclusion  

The strategy combines Supertrend for trend direction and EMA+SMA crossovers to generate signals, a typical trend following system. It has high reliability and much flexibility for optimization, worth verifying in live trading. But we should also control risks and prevent excessive optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|ATR Length|
|v_input_float_1|3|Factor|
|v_input_1|10|Length of EMA|
|v_input_2|20|Length of SMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-19 00:00:00
end: 2024-02-18 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Supertrend and Moving Averages Strategy", overlay=true)

// Supertrend parameters
atrLength = input.int(10, title="ATR Length", minval=1)
factor = input.float(3.0, title="Factor", minval=0.01, step=0.01)
[supertrend, direction] = ta.supertrend(factor, atrLength)

// Moving Averages parameters
length_ema = input(10, title="Length of EMA")
length_sma = input(20, title="Length of SMA")

// Calculate EMAs and SMAs
ema_10 = ta.ema(close, length_ema)
sma_20 = ta.sma(close, length_sma)

// Strategy logic
longCondition = ema_10 > sma_20 and direction > 0
shortCondition = ema_10 < sma_20 and direction < 0

strategy.entry("Long", strategy.long, when=longCondition)
strategy.entry("Short", strategy.short, when=shortCondition)

// Plot Supertrend
plot(direction > 0 ? supertrend : na, color=color.green, style=plot.style_line, linewidth=2, title="Up Trend")
plot(direction < 0 ? supertrend : na, color=color.red, style=plot.style_line, linewidth=2, title="Down Trend")

// Plot Moving Averages
plot(ema_10, color=color.blue, title="10 EMA")
plot(sma_20, color=color.red, title="20 SMA")

// Alerts for Supertrend
alertcondition(direction[1] > direction, title='Downtrend to Uptrend', message='The Supertrend value switched from Downtrend to Uptrend ')
alertcondition(direction[1] < direction, title='Uptrend to Downtrend', message='The Supertrend value switched from Uptrend to Downtrend')
alertcondition(direction[1] != direction, title='Trend Change', message='The Supertrend value switched from Uptrend to Downtrend or vice versa')

```

> Detail

https://www.fmz.com/strategy/442100

> Last Modified

2024-02-19 11:56:52
