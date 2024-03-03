
> Name

牛市追踪策略Bull-Market-Chasing-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

这个策略的主要思想是利用简单移动平均线指标EMA来实现趋势追踪。当短期EMA上穿长期EMA时做多,当短期EMA下穿长期EMA时平仓。该策略适用于牛市中波动较大的品种,可以获取较大的趋势利润。

## 策略原理

该策略主要基于EMA指标的金叉死叉来判断买入和卖出时机。代码中定义了两个EMA周期,一个短期EMA周期为10,一个长期EMA周期为60。分别计算出这两个EMA值。当短期EMA上穿长期EMA时,表示价格上涨势头较强,此时做多;当短期EMA下穿长期EMA时,表示价格上涨势头较弱,此时平仓。

该策略的核心逻辑就是利用EMA的金叉死叉来判断趋势,属于典型的趋势追踪策略。EMA作为一种趋势指数平滑移动平均线,能较好地指示出价格趋势的方向。短期EMA代表近期价格变动趋势和力度,长期EMA代表整体趋势方向。短期EMA上穿长期EMA表示近期涨势强于长期涨势,做多能够追踪趋势;短期EMA下穿长期EMA则刚好相反,表示近期涨势不如长期涨势,应当平仓。

整个策略只用简单的EMA指标就实现了对趋势的判断和跟踪,非常简洁有效,这也是该策略的最大优点。

## 优势分析

- 策略思路简单清晰,只用EMA指标实现对趋势的判断,非常易于理解和实现。

- 资金利用效率高,只在趋势明显的时候做多做空,不会长时间占用资金。

- 采用短周期与长周期EMA结合,可以平滑去噪并捕捉较长时间段的趋势。

- 该策略回撤相对较小,最大回撤控制在20%左右,可以承受较高的杠杆水平。

- 可配置空头交易,可以在下跌趋势中进行逆势交易,获得额外收益。

## 风险分析

- 作为趋势追踪策略,在震荡盘整市场中表现较差,容易产生错失良机的风险。

- 无法确定趋势背后的逻辑基础,存在与趋势 divorce 的风险。

- 参数设置不当可能导致过度交易或漏失交易机会。

- 空头交易风险较大,需要谨慎配置。

- 该策略对交易品种的特性比较敏感,需要针对不同品种调整参数。

- 交易系统实施中的滑点控制及手续费问题会对实际效果产生一定影响。

## 优化方向

- 可以引入止损策略,设置合理的止损点,控制单笔交易的最大亏损。

- 可以结合其它指标判断趋势背后的因素,避免趋势 divorce。例如加入成交量的分析。

- 可以通过参数优化获得针对不同品种的最优参数组合。

- 可以研究不同的出场策略,在回撤过大时考虑止损出场。

- 可以结合仓位控制策略,根据策略表现动态调整仓位规模。

- 可以采用步进入场的方法,分批建立仓位,降低单笔入场的风险。

## 总结

本策略总体来说是一个非常简单直接的趋势追踪策略。它利用EMA指标判断趋势方向,通过EMA的金叉做多和死叉平仓,实现了对趋势的有效跟踪。该策略回撤受控,适合追涨杀跌的交易风格。但也存在一定的监控与优化空间,需要对参数及出场策略进行测试与优化,才能适应更广泛的市场情况。如果能够结合止损和仓位管理等策略进行改进,该策略的实战效果还具有很大的提升空间。

||


## Overview

The main idea of this strategy is to use the simple moving average indicator EMA to implement trend chasing. It goes long when the short period EMA crosses over the long period EMA and closes position when the short period EMA crosses below the long period EMA. This strategy is suitable for highly volatile assets during a bull market and can capture significant trend profits.

## Strategy Logic

This strategy mainly uses the golden cross and death cross of the EMA indicator to determine entries and exits. The code defines two EMA periods, a short period EMA of 10 and a long period EMA of 60. The values of the two EMAs are calculated respectively. When the short period EMA crosses over the long period EMA, it indicates the upward momentum is strong and should go long. When the short period EMA crosses below the long period EMA, it indicates the upward momentum is weakening and should close position.

The core logic of this strategy is to use the golden cross and death cross of EMA to judge the trend, which is a typical trend chasing strategy. EMA, as a trending exponential smoothing moving average, can indicate the price trend well. The short period EMA represents recent price change trends and momentum, while the long period EMA represents the overall trend direction. When the short period EMA crosses over the long period EMA, it means the short term rising momentum is stronger than the long term momentum, so going long can chase the trend. When the short period EMA crosses below the long period EMA, it indicates the opposite and the position should be closed.

The whole strategy implements trend identification and chasing with simple EMA indicators, which is very concise and effective. This is the biggest strength of this strategy.

## Advantage Analysis

- The strategy idea is simple and clear. It uses EMA indicators to judge the trend, which is easy to understand and implement.

- The capital usage efficiency is high. It only goes long or short when the trend is obvious, without occupying capital for long periods. 

- The combination of short period and long period EMA can smooth noise and capture longer term trends.

- This strategy has relatively small drawdowns, maximum drawdown controlled within 20%, allowing high leverage levels.

- Short selling can be enabled to trade counter trend during down trends for additional profits.

## Risk Analysis

- As a trend chasing strategy, it underperforms during range-bound markets, with the risk of missing opportunities.

- It cannot ascertain the logical basis behind the trend, risking trend divorce. 

- Improper parameter settings may lead to over trading or missing trades.

- Short selling has higher risks and needs to be carefully configured.

- This strategy is sensitive to the characteristics of different trading instruments and parameters need to be adjusted accordingly.

- Real world slippage control and commission fees will impact actual performance to some extent.

## Optimization Directions

- Stop loss strategies can be introduced to set reasonable stop loss points and control maximum loss per trade.

- Other indicators can be incorporated to analyze factors behind the trend to avoid trend divorce, for example trading volumes.

- Parameter optimization can find optimum parameter sets for different trading instruments. 

- Different exit strategies can be researched to consider stop loss exits when drawdown gets too high.

- Position sizing strategies can be used to dynamically adjust position sizes based on performance.

- Stepped entry can be adopted to establish positions in batches, reducing per entry risks. 

## Summary

In summary, this is a very simple and direct trend chasing strategy. It uses EMA indicators to determine trend direction, going long on golden crosses and closing on death crosses to effectively track the trend. This strategy has controlled drawdowns and suits aggressive trading styles. But there are also spaces for monitoring and optimization. Parameters and exit strategies need to be tested and optimized to adapt to more market conditions. Further improvements can be made by incorporating stop loss, position sizing and other strategies. This can greatly improve its practical performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|Attiva Short|
|v_input_int_1|10|Periodo Media veloce|
|v_input_int_2|60|Periodo Media lenta|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-20 00:00:00
end: 2023-09-27 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © TheSocialCryptoClub

//@version=5
// strategy(title = "STB - Gianno Nano Strategy",
//          shorttitle= "STB - Gianno Nano Strategy",
//          overlay = true,
//          initial_capital = 1000,
//          default_qty_type = strategy.cash,
//          default_qty_value = 1000,
//          commission_type = strategy.commission.percent,
//          commission_value = 0.075)

short_yes = input.bool(true,"Attiva Short")
ema_fast = input.int(10, "Periodo Media veloce")
ema_slow = input.int(60, "Periodo Media lenta")

// Variable declarations

ema10 = ta.ema(close, ema_fast)
ema60 = ta.ema(close, ema_slow)

plot(ema10, "EMA 10", color.yellow, 2)
plot(ema60, "EMA 60", color.aqua, 2)

// Long Condition

long_cond = ta.crossover(ema10, ema60)
short_cond = ta.crossunder(ema10, ema60) and short_yes
close_cond = ta.crossunder(ema10, ema60) and not short_yes
// Engine strategy

if long_cond
    strategy.entry("EL", strategy.long)
if short_cond
    strategy.entry("ES", strategy.short)
if close_cond
    strategy.close("EL" )
    
```

> Detail

https://www.fmz.com/strategy/428106

> Last Modified

2023-09-28 16:23:41
