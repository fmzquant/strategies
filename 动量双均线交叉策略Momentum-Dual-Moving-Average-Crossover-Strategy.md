
> Name

动量双均线交叉策略Momentum-Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/113a4d661730a09c947.png)

[trans]


## 概述

本策略利用均线交叉来判断价格动量方向,辅以金叉死叉判断整体趋势,实现趋势跟踪。

## 策略原理

该策略使用EMA和SMA两个均线的交叉来判断价格动量方向,EMA反应更快,SMA反应更稳定。当EMA上穿SMA时判断为价格上涨势头强劲,做多;当EMA下穿SMA时判断为价格下跌势头强劲,做空。

另外,该策略还使用快速周期SMA和慢速周期SMA的交叉来判断整体趋势方向。当快速SMA上穿慢速SMA时为金叉,判断为行情处于长期上涨趋势;当快速SMA下穿慢速SMA时为死叉,判断为行情处于长期下跌趋势。

策略在EMA上穿SMA时判断为做多机会。如果此时是金叉,说明做多不仅有短期动量支持,也与长期趋势一致,这是较佳的做多时机;如果此时是死叉,说明做多仅有短期动量支持,与长期趋势不一致,这是较为冒险的做多时机。

## 优势分析

- 利用均线交叉判断价格动量和方向
- 同时考虑短期动量和长期趋势
- 结合双重指标确认信号,可靠性较高
- 通过调整均线参数,可适应不同周期
- 可配置是否显示具体交易信号,界面可自定义

## 风险分析

- 均线交叉存在滞后,可能出现错过最佳买卖点的情况
- 固定周期的SMA无法实时反映价格变化
- 长短周期均线可能产生错误交叉信号
- 长期持有可能增加资金风险

可通过结合其他指标确认信号,优化均线周期参数,或设置止损来降低风险。

## 优化方向 

- 增加其他指标过滤,如交易量,布林带等
- 增加止损策略
- 优化均线周期参数
- 优化资金管理
- 考虑实时调整持仓比例

## 总结

本策略总体来说是一个较为稳定可靠的趋势跟踪策略。它同时考虑了短期价格动量和长期趋势方向,通过均线交叉形成交易信号。相比单一均线策略,它结合双重指标确认,可靠性较高。但作为趋势跟踪策略,它的Parameter优化和风险控制非常重要,需要反复测试调整,才能真正发挥策略效果。通过不断优化和改进,本策略可以成为一个值得长期持有的量化投资组合中的组成部分。

||


## Overview

This strategy uses moving average crossovers to determine price momentum direction, supplemented by golden/death crosses to judge overall trend, to implement trend following. 

## Strategy Logic

The strategy uses EMA and SMA crossovers to determine price momentum direction. EMA reacts faster while SMA reacts more steadily. When EMA crosses above SMA, it is judged that the upside momentum is strong, go long. When EMA crosses below SMA, it is judged that the downside momentum is strong, go short.

In addition, the strategy also uses the crossover of fast period SMA and slow period SMA to determine the overall trend direction. When fast SMA crosses above slow SMA, it is a golden cross, indicating the market is in long-term uptrend. When fast SMA crosses below slow SMA, it is a death cross, indicating the market is in long-term downtrend.

The strategy identifies long opportunity when EMA crosses above SMA. If it is a golden cross at this time, it means going long is supported by both short-term momentum and long-term trend, which is a better long timing. If it is a death cross, going long is only supported by short-term momentum and against long-term trend, which is a more risky long timing.

## Advantage Analysis 

- Use MA crossovers to judge price momentum and direction
- Consider both short-term momentum and long-term trend
- Dual indicators confirmation improves reliability 
- Adaptable to different periods by adjusting MA parameters
- Customizable to show/hide specific trade signals

## Risk Analysis

- MA crossovers have lags, may miss best entry/exit points
- Fixed period SMA cannot reflect price change in real-time
- Wrong crossovers may happen between long/short period MAs  
- Long holding may increase capital risk

Risks can be reduced by combining other indicators for signal confirmation, optimizing MA periods, or setting stop loss.

## Optimization Directions

- Add other filters like volume, Bollinger Bands etc.
- Add stop loss strategy
- Optimize MA periods  
- Optimize capital management
- Consider dynamic position sizing

## Conclusion

Overall, this is a relatively stable and reliable trend following strategy. It considers both short-term price momentum and long-term trend direction, generating trading signals through MA crossovers. Compared to single MA strategies, it has higher reliability by combining dual indicators for confirmation. But as a trend following strategy, its parameter optimization and risk control are very important. It needs repeated testing and tuning to truly realize its potential. With continuous optimizations and improvements, this strategy can become a valuable component of a long-term quantitative investment portfolio.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Momentum Length (EMA=SMA)|
|v_input_2|50|Golden Cross Length (Fast)|
|v_input_3|100|Golden Cross Length (Slow)|
|v_input_4|true|Show Signals|
|v_input_5|false|Show MAs|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-19 00:00:00
end: 2023-10-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Cryptoluc1d

//@version=4
strategy("Equal-Length EMA/SMA Crossover Strategy", initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=25, commission_type=strategy.commission.percent, commission_value=0.2, overlay=true)

// Create inputs

mom_length = input(title="Momentum Length (EMA=SMA)", defval=50)
bias_length_fast  = input(title="Golden Cross Length (Fast)", defval=50)
bias_length_slow  = input(title="Golden Cross Length (Slow)", defval=100)

// Define MAs

ema = ema(close, mom_length) // EMA/SMA crossover of the same period for detecting trend acceleration/deceleration
sma = sma(close, mom_length)
bias_fast = sma(close, bias_length_fast) // golden/death cross for overall trend bias
bias_slow = sma(close, bias_length_slow)

// Define signal conditions

buy_trend = crossover(ema, sma) and bias_fast >= bias_slow // buy when EMA cross above SMA. if this happens during a bullish golden cross, buying is in confluence with the overall trend (bias).
buy_risky = crossover(ema, sma) and bias_fast < bias_slow // buy when EMA cross above SMA. if this happens during a bearish death cross, buying is early, more risky, and not in confluence with the overall trend (bias).
buy_late = crossover(sma, bias_slow) and ema > sma // the SMA crossing the Slow_SMA gives further confirmation of bullish trend, but signal comes later.
sell = crossunder(ema, sma) // sell when EMA cross under SMA.

// Enable option to hide signals, then plot signals

show_signal = input(title="Show Signals", defval=true)

plotshape(show_signal ? buy_trend : na, title='Trend Buy', style=shape.triangleup, location=location.belowbar, color=color.green, text='TREND BUY')
plotshape(show_signal ? buy_risky : na, title='Risky Buy', style=shape.triangleup, location=location.belowbar, color=color.olive, text='RISKY BUY')
plotshape(show_signal ? buy_late : na, title='Late Buy', style=shape.triangleup, location=location.belowbar, color=color.lime, text='LATE BUY')
plotshape(show_signal ? sell : na, title='Sell', style=shape.triangledown, location=location.abovebar, color=color.red, text='SELL')

// Define entry and exit conditions

longCondition = ema > sma and bias_fast >= bias_slow // LONG when EMA above SMA, and overall trend bias is bullish
if (longCondition)
    strategy.entry("BUY TREND", strategy.long)
exitLong = crossunder(ema, sma) // close LONG when EMA cross under SMA
strategy.close("BUY TREND", when=exitLong)

// // short conditions. turned off because up only.
// shortCondition = ema < sma and bias_fast <= bias_slow // SHORT when EMA under SMA, and overall trend bias is bearish
// if (shortCondition)
//     strategy.entry("SELL TREND", strategy.short)
// exitShort = crossover(ema, sma) // close SHORT when EMA cross over SMA
// strategy.close("SELL TREND", when=exitShort)

// Enable option to show MAs, then plot MAs

show_ma = input(title="Show MAs", defval=false)

plot(show_ma ? ema : na, title="Momentum EMA", color=color.green, linewidth=1)
plot(show_ma ? sma : na, title="Momentum SMA", color=color.yellow, linewidth=1)
plot(show_ma ? bias_fast : na, title="Golden Cross SMA (Fast)", color=color.orange, linewidth=2)
plot(show_ma ? bias_slow : na, title="Golden Cross SMA (Slow)", color=color.red, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/429777

> Last Modified

2023-10-20 16:44:30
