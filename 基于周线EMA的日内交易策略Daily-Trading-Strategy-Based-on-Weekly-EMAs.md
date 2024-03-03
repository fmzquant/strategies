
> Name

基于周线EMA的日内交易策略Daily-Trading-Strategy-Based-on-Weekly-EMAs

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

这个策略的核心思想是将周线上的EMA指标映射到日内交易中,以获取更长期趋势的支持,指导日内交易决策。

## 策略原理

该策略首先在代码中计算了日线上的6日、12日、26日、52日EMA,以及对应周线EMA的参数设置下的42日、84日、182日、364日EMA。

然后,根据42日EMA和84日EMA的金叉、死叉来判断长期趋势;根据84日EMA和182日EMA的金叉、死叉来判断中期趋势。

当较短周期EMA上穿较长周期EMA时,进行长仓入场;当较短周期EMA下穿较长周期EMA时,进行平仓出场。

通过这种映射方法,我们在日内交易中获得了周线级别EMA指标的支撑,可以过滤掉部分噪音,锁定较大的趋势机会。

## 优势分析

这种策略结合了日内交易的灵活性以及周线EMA的稳定性,主要有以下优势:

1. 周线EMA能有效过滤市场噪音,识别真正的趋势走势。日内交易则可以根据日内FORMATION选择更精准的入场时机。

2. 周线EMA参数设置更稳定,不容易被短期价格震荡所影响。同时日内形态结合趋势判断,出场更及时。

3. EMA的金叉、死叉可以清晰判断阶段性趋势转折点。辅以日内交易来获利,整体胜率较高。

4. 不同周期EMA组合使用,可以在长、中、短不同级别锁定趋势机会。

5. 策略交易频次低,适合长线持有。可以减少交易次数带来的滑点损失。

## 风险分析

该策略的主要风险有:

1. 周线EMA入场信号可能滞后,无法把握价格变化最早的时机点。

2. 日内出场依靠EMA交叉,没有考虑形态、波动等因素,可能会过早离场。

3. EMA多空交叉次数较少,容易形成单边持仓时间过长的情况。

4. 没有止损机制,回撤风险较大,需要人工积极管理。

5. 参数设置较粗放,不同币种需要调整才能达到最佳效果。

可以通过以下方法降低风险:

1. 结合其他指标识别ENTRY 形态,提前布局EMA入场点。

2. 增加离场规则,如止损,收敛停利等,避免单边持仓时间过长。

3. 优化EMA周期参数,测试不同币种适合的周期组合。

4. 多级别交易,不同EMA周期进行分层持仓,降低单边持仓风险。

## 优化方向

该策略还可以从以下几个方面进行优化:

1. 增加日内交易的准入规则,如形态、成交量等判定,过滤入场 noise。

2. 结合stoch、MACD等指标判定超买超卖,细化入场出场。

3. 增加止损、止盈机制,降低回撤风险,锁定利润。

4. 优化EMA周期参数,测试不同周期组合的效果。

5. 尝试不同的EMA,如DEMA,TEMA等参数设置,提高平滑性。 

6. 增加仓位管理机制,不同EMA信号采用不同仓位。

7. 研究不同品种参数设置,制定适合不同交易对的策略。

8. 探索机器学习方法,实现EMA参数的动态优化。

## 总结

这是一个非常适合长线持仓的趋势跟踪策略。它巧妙地融合周线趋势判断和日内交易执行。通过适当优化,可以成为一个非常实用的多时间框架交易系统。

|| 

## Overview

The core idea of this strategy is to map the EMA indicators from weekly timeframe to daily trading, in order to get support from longer term trends and guide daily trading decisions.

## Strategy Principle 

The strategy first calculates the 6-day, 12-day, 26-day, 52-day EMAs on the daily chart, as well as the 42-day, 84-day, 182-day, 364-day EMAs corresponding to weekly EMA parameter settings.

Then, the crosses of 42-day EMA and 84-day EMA are used to determine the long-term trend; the crosses of 84-day EMA and 182-day EMA are used to determine the medium-term trend.

When shorter period EMA crosses above longer period EMA, go long; when shorter period EMA crosses below longer period EMA, close positions.  

Through this mapping method, we get support from weekly level EMA indicators in daily trading, which helps filter some noise and capture larger trend opportunities.

## Advantage Analysis

This strategy combines the flexibility of daily trading and the stability of weekly EMAs, with the following advantages:

1. Weekly EMAs can effectively filter market noise and identify real trend moves. Daily trading can then choose more precise entry based on daily formations.

2. Weekly EMA parameters are more stable, less affected by short-term price fluctuations. At the same time, daily formations combined with trend judgment result in more timely exits.

3. EMA crosses can clearly identify cyclical trend reversal points. Profiting from them through daily trading leads to relatively high win rate. 

4. Different period EMA combinations capture trend opportunities across long, medium and short terms.

5. The strategy has low trading frequency, suitable for long holding. It reduces slippage cost from excessive trading.

## Risk Analysis

The main risks of this strategy are:

1. Weekly EMA entry signals may lag, unable to catch the earliest price change timing. 

2. Exits rely on EMA crosses, without considering formations, volatility etc, may lead to premature exit.

3. Few EMA crosses tend to result in over extended one-sided holding. 

4. No stop loss means high drawdown risk, requires active human management.

5. Coarse parameter tuning, needs adjustment for optimal performance on different coins.

Risks can be reduced through:

1. Identify entry formations with other indicators, take positions ahead of EMA signals.

2. Add exit rules like stop loss, take profit to avoid over holding.

3. Optimize EMA periods, test suitable period combos for different coins. 

4. Multi-tier trading, different EMAs for layered positions, lower one-sided holding risk.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Add rules on daily entry, like formations, volume etc to filter noise.

2. Combine stoch, MACD to judge overbought-oversold for finer entry/exit.

3. Add stop loss, take profit to lower drawdown, lock in profit.

4. Optimize EMA periods, test combos of different periods.

5. Try different EMAs like DEMA, TEMA for smoother parameters.

6. Add position sizing based on different EMA signals. 

7. Research parameters for different trading pairs.

8. Explore machine learning methods for dynamic EMA optimization.

## Conclusion

This is an excellent trend following strategy suitable for long-term holding. It cleverly combines weekly trend judgment and daily execution. With proper enhancements, it can become a very practical multi-timeframe trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2017|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=1

strategy("Investing Weekly mapped to Daily", overlay=true,  pyramiding=100)


// === PLOTTING EMA ===

plot(ema(close, 6), color=aqua, transp=0, linewidth=2, title="ema6")
plot(ema(close, 12), color=white, transp=0, linewidth=2, title="ema12")
plot(ema(close, 26), color=#9802FF, transp=0, linewidth=2, title="ema26")
plot(ema(close, 52), color=orange, transp=0, linewidth=2, title="ema52")
plot(ema(close, 42), color=aqua, transp=0, linewidth=5, title="W-ema6")
plot(ema(close, 84), color=white, transp=0, linewidth=5, title="W-ema12")
plot(ema(close, 182), color=#9802FF, transp=0, linewidth=5, title="W-ema26")
plot(ema(close, 364), color=orange, transp=0, linewidth=5, title="W-ema52")


// === INPUT BACKTEST RANGE ===

FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2017, title = "From Year", minval = 2017)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"


// === STRATEGY FOR CRYPTO ===

ema42= ema(close, 42)
ema84= ema(close, 84)
ema182= ema(close, 182)

enterLong1 = cross(ema42, ema84) and ema42 > ema84
exitLong1 = cross(ema42, ema84) and ema42 < ema84

enterLong2 = cross(ema84, ema182) and ema84 > ema182
exitLong2 = cross(ema84, ema182) and ema84 < ema182


strategy.entry(id="Entry_1", long=true, when=enterLong1)
strategy.entry(id="Entry_2", long=true, when=enterLong2)
strategy.entry(id="Exit_1", long=false, when=exitLong1)
strategy.entry(id="Exit_2", long=false, when=exitLong2)

```

> Detail

https://www.fmz.com/strategy/427398

> Last Modified

2023-09-20 17:11:52
