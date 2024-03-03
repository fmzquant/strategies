
> Name

双EMA跨度突破策略Dual-EMA-Spread-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/164b8393a78e3fd1f84.png)

[trans]

## 概述

双EMA跨度突破策略是一种趋势跟踪策略。它使用不同周期的两个EMA均线,并在两条EMA线间形成足够大的跨度时进行交易,以捕捉趋势的方向。这种策略适用于趋势性比较强的市场。

## 策略原理

该策略使用快速EMA线(小周期EMA线)和慢速EMA线(大周期EMA线)进行交易信号判断。具体逻辑是:

1. 计算快速EMA和慢速EMA。

2. 当快速EMA上穿慢速EMA,并且两条EMA线之间的跨度超过设置阈值时,做多。

3. 当快速EMA下穿慢速EMA,并且两条EMA线之间的跨度超过设置阈值时,做空。 

4. 当价格重新跌破快速EMA时,平仓做多头部位。

5. 当价格重新涨破快速EMA时,平仓做空头部位。

这样,它利用EMA的平滑性来识别趋势方向,再结合EMA间距离的突破来确定具体的入场时机。离得越远说明趋势越强,做单的机会越大。

## 策略优势分析

- 利用EMA的趋势跟踪性进行操作,可以有效跟踪趋势
- EMA间距离的突破来判断入场时机,可以有效过滤震荡情况下的虚假信号
- 采用不同周期EMA组合,可以在一定程度上减少趋势交易中的掉头
- 条件设置合理时,可以在趋势行情中获得较好的回报

## 策略风险分析

- EMA本身对价格变化响应滞后,可能错过转折点
- 趋势性不强的行情中效果不佳
- 震荡行情中容易止损
- EMA参数设置不当可能带来过多的虚假信号

可以通过调整EMA参数组合、调整跨度阈值以及止损位置来减少风险。

## 策略优化方向 

- 优化快慢EMA的周期参数组合
- 测试不同的EMA间距阈值
- 优化止损策略
- 增加其他过滤信号
- 进行参数调优,找到最佳参数组合

## 总结

双EMA跨度突破策略整体来说是一个较为简单实用的趋势跟踪策略。它能够有效地在趋势行情中获利,但需要合理的参数设定。通过参数优化和风险管理,可以充分发挥该策略的优势。这是一个值得深入研究和应用的趋势策略。

||


## Overview

The Dual EMA Spread Breakout strategy is a trend following strategy. It uses two EMA lines with different periods and makes trades when there is a sufficiently large spread between the two EMAs to capture the trend direction. This strategy works well in markets with strong trending tendencies.

## Strategy Logic

The strategy uses a fast EMA (shorter period EMA) and a slow EMA (longer period EMA) for trade signals. The specific logic is:

1. Calculate the fast EMA and slow EMA. 

2. When the fast EMA crosses above the slow EMA, and the spread between the two EMAs exceeds a threshold, go long.

3. When the fast EMA crosses below the slow EMA, and the spread between the two EMAs exceeds a threshold, go short.

4. When the price breaks back below the fast EMA, close long positions. 

5. When the price breaks back above the fast EMA, close short positions.

This way, it uses the smoothness of EMAs to identify trend direction, and the EMA spread breakout to determine precise entry timing. The larger the spread, the stronger the trend, and the bigger opportunity to trade.

## Advantages

- Utilizes the trend following nature of EMAs for trading
- EMA spread breakout helps filter false signals during ranging periods  
- Using different EMA combos reduces whipsaws in trend trading
- Can produce good returns in trending markets with proper settings

## Risks

- EMAs lag in response to price changes, may miss turn points
- Less effective in low trending markets
- Prone to stop outs in choppy markets
- Improper EMA parameters can cause excessive false signals

Risks can be reduced via EMA tuning, spread threshold, and stop loss placement.

## Enhancement Opportunities

- Optimize fast and slow EMA periods
- Test different EMA spread threshold values
- Improve stop loss strategies
- Add other filtering signals 
- Parameter tuning to find optimal settings

## Summary

The Dual EMA Spread Breakout strategy is an effective yet simple trend following strategy. It can profit nicely in trending markets but needs proper parameters. With optimization and risk management, it can fully leverage its strengths. A worthwhile trend strategy to research and apply.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.95|diffMinimum|
|v_input_2|13|Small EMA|
|v_input_3|26|Long EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-24 00:00:00
end: 2023-10-24 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("2-EMA Strategy", overlay=true, initial_capital=100, currency="USD", default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075)

diffMinimum = input(0.95, step=0.01)

small_ema = input(13, title="Small EMA")
long_ema = input(26, title="Long EMA")

ema1 = ema(close, small_ema)
ema2 = ema(close, long_ema)


orderCondition = ema1 > ema2?((ema1/ema2)*100)-100 > diffMinimum:((ema2/ema1)*100)-100 > diffMinimum

longCondition = close > ema1 and ema1 > ema2
if (longCondition and orderCondition)
    strategy.entry("Long", strategy.long)

shortCondition = close < ema1 and ema1 < ema2
if (shortCondition and orderCondition)
    strategy.entry("Short", strategy.short)
    
strategy.close("Short", when=close > ema1)
strategy.close("Long", when=close < ema1)
    
plot(ema(close, small_ema), title="EMA 1", color=green, transp=0, linewidth=2)
plot(ema(close, long_ema), title="EMA 2", color=orange, transp=0, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/430132

> Last Modified

2023-10-25 12:43:59
