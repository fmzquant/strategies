
> Name

基于13和48周期EMA的趋势跟踪策略EMA-13-48-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1222a2d1c76b6591fd0.png)
[trans]

## 概述

本策略基于13周期和48周期的指数移动平均线(EMA)构建交易信号,属于双EMA金叉死叉类型的趋势跟踪策略。当短期EMA上穿长期EMA时做多,当短期EMA下穿长期EMA时平仓。该策略通过 Capture较长周期的趋势,避免被市场短期波动所误导,从而取得稳定收益。

## 策略原理

本策略使用13周期EMA作为短期EMA,48周期EMA作为长期EMA。假设短期EMA为快线,长期EMA为慢线。

当快线从下方上穿慢线时,产生买入信号。此时短期趋势开始强于长期趋势,代表趋势开始变强,做多能够顺势而为。 

当快线从上方下穿慢线时,产生平仓信号。此时短期趋势开始弱于长期趋势,代表趋势开始变弱,做多可能面临回撤,因此选择平仓止损。

通过这样的金叉死叉操作,能够顺势而为,及时止损,避免把短期波动当成趋势反转所造成的不必要损失。

## 策略优势

-  Capture长周期趋势,避免被短期市场噪音误导。13周期和48周期的参数选择,能够平滑价格数据,识别出较长的趋势方向。

-  回撤控制能力较强。当短期趋势变弱时能够快速止损,有效控制亏损。

-  实现简单,逻辑清晰。双EMA交叉是常见的趋势策略,容易理解掌握。

-  可扩展性强。可以在原有基础上引入其他辅助指标进行优化。

## 策略风险

-  当短期行情震荡频繁时,可能产生多次不必要的交易信号。

-  EMA参数设置不当时,识别趋势能力较差,可能Capture错方向。

-  无法判断趋势的强弱,在趋势最后阶段也会追高造成损失。

-  无法确定具体入场点位,存在后期调整风险。

## 策略优化方向 

- 引入辅助指标判断趋势强弱,避免追高。例如引入成交量指标、波动率指标等。

- 优化EMA参数,使得Capture的趋势周期更符合不同品种的特点。

- 增加止损方式,如移动止损、百分比止损等,降低风险。

- 增加过滤条件,避免趋势震荡期无效交易。例如引入DMI、KDJ等判断趋势状况。

- 结合其它入场指标精确入场点位。例如MACD信号,明确具体买卖时机。

## 总结

本策略通过13周期和48周期EMA形成的金叉死叉系统,能够识别较长周期的趋势方向,顺势而为,在趋势结束前止损。是一种较为简单实用的趋势跟踪策略。但可能Capture错方向和追顶的风险依然存在。可以通过引入辅助指标、优化参数、增加止损方式等进行改进,使策略更稳定可靠。

||


## Overview

This strategy generates trading signals based on the 13-period and 48-period exponential moving average (EMA) lines, belonging to the dual EMA crossover system trend following strategy. It goes long when the short period EMA crosses over the long period EMA, and closes position when the short period EMA crosses below the long period EMA. By capturing longer cycle trends and avoiding being misled by short-term market fluctuations, this strategy aims to achieve steady profits.

## Strategy Logic

This strategy uses 13-period EMA as the short period EMA, and 48-period EMA as the long period EMA. Assume the short period EMA is the fast line, and the long period EMA is the slow line. 

When the fast line crosses over the slow line from below, a buy signal is generated. This indicates the short-term trend starts to strengthen versus the long-term trend, implying the uptrend is strengthening, thus going long accordingly.

When the fast line crosses below the slow line from above, a close position signal is generated. This indicates the short-term trend starts to weaken versus the long-term trend, implying the uptrend is weakening, thus closing long position to stop loss.

Through such crossover operations, this strategy can trend-follow, cut loss in time, avoiding unnecessary losses caused by misinterpreting short-term fluctuations as trend reversal.

## Advantages

- Captures long cycle trends, avoids being misguided by short-term market noise. The 13 and 48 period parameters selection can smooth price data and identify longer trend direction.

- Strong drawdown control capability. It can cut loss quickly when short-term trend weakens, effectively controlling losses.

- Simple to implement, clear logic. Dual EMA cross is a common trend strategy, easy to understand and master. 

- High extendability. Other assist indicators can be introduced for further optimization.

## Risks

- May generate excessive invalid trading signals when short-term price oscillates frequently. 

- Poor trend identification capability when EMA parameters are set inappropriately, possibly capturing wrong direction.

- Unable to determine trend strength, may chase new highs and cause losses in later trend stages. 

- Entry position unclear, subsequent adjustment risk exists.

## Optimization Directions

- Introduce assist indicators to determine trend strength, avoid chasing highs. Such as volume, volatility indicators etc.

- Optimize EMA parameters to better suit different products' characteristics. 

- Add stop loss methods like moving stop loss, percentage stop loss to reduce risk.

- Add filter conditions to avoid invalid trades in trend oscillations. Such as using DMI, KDJ to determine trend status.

- Combine other entry indicators to determine precise entry point. Such as MACD signal to clarify specific buy/sell timing.

## Summary

This strategy identifies longer cycle trend directions through the crossover system formed by 13-period and 48-period EMAs, trend-following accordingly and cutting loss before trend ends. It is a simple and practical trend following strategy. But risks like capturing wrong directions and chasing tops still exist. Improvements can be made by introducing assist indicators, optimizing parameters, adding stop loss methods etc, to make the strategy more stable and reliable.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Fast MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|13|Fast MA Period|
|v_input_3_close|0|Slow MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|48|Slow MA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-27 00:00:00
end: 2023-11-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

// strategy("EMA Strategy 13 48", shorttitle = "EMA Strategy 13 48", overlay=true, pyramiding = 3,default_qty_type = strategy.percent_of_equity, default_qty_value = 1000)


// === Inputs ===
// short ma
maFastSource   = input(defval = close, title = "Fast MA Source")
maFastLength   = input(defval = 13, title = "Fast MA Period", minval = 1)

// long ma
maSlowSource   = input(defval = close, title = "Slow MA Source")
maSlowLength   = input(defval = 48, title = "Slow MA Period", minval = 1)


// === Vars and Series ===
fastMA = ema(maFastSource, maFastLength)
slowMA = ema(maSlowSource, maSlowLength)

plot(fastMA, color=blue)
plot(slowMA, color=purple)

goLong() => crossover(fastMA, slowMA)
killLong() => crossunder(close, fastMA)
strategy.entry("Buy", strategy.long, when = goLong())
strategy.close("Buy", when = killLong())

// Shorting if using
goShort() => crossunder (fastMA, slowMA)
killShort() => crossover(fastMA, slowMA)
//strategy.entry("Sell", strategy.short, when = goShort())
//strategy.close("Sell", when = killShort())


 
```

> Detail

https://www.fmz.com/strategy/430973

> Last Modified

2023-11-03 14:15:59
