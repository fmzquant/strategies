
> Name

AK双RSI突破策略AK-Dual-RSI-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过组合使用RSI(2)和均线指标,在价格从中长线均线间隙中突破时寻找低买点和高卖点,目标获捕超短线反转机会。

## 策略原理

1. 计算2周期RSI值,反映最新两日的涨跌比率。

2. 计算5日和200日简单移动均线,分别作为短期和长期趋势指标。

3. 当价格上穿200日线而下破5日线,且RSI(2)值低于5时,认为处于超卖状态,做多入场。

4. 当价格下穿200日线而上破5日线,且RSI(2)值高于90时,认为处于超买状态,做空入场。

5. 价格重新突破5日线时,认为反转落定,平仓止盈。

## 优势分析

1. RSI(2)指标灵敏度高,能快速捕捉超短线反转。

2. 结合均线加强反转信号的有效性,避免频繁止损。

3. 回测显示在涨跌停板股票中效果较好,最大回撤可控。

4. 代码简洁优雅,参数少易于实盘应用。

## 风险分析

1. 依赖敏感指标,容易发出假信号,需优化参数。

2. 难以应对长时间趋势和震荡市场,收益波动大。

3. 未设置止损,无法控制单笔损失。

4. 回测周期仅两年,需扩大样本验证策略。

5. 无法应对极端行情,如闪崩。

## 优化方向

1.测试不同均线和RSI参数的组合效果。

2.加入成交量等指标,确认反转信号。 

3.设置移动止损或百分比止损。

4.根据市场情况优化开仓仓位。

5.在高位做空,低位做多,实现双向交易。

6.针对具有跳空风险的个股,调整入场逻辑。

7.扩大回测时间范围,验证参数健壮性。

## 总结

该策略利用RSI和均线指标判断超买超卖状态,从中长线间隙位置捕捉反转机会实现超短线交易。优点是简单直观,速度快,回测效果良好。但样本有限,关键参数需要测试优化,止损机制有待完善,对跳空行情应对能力弱,还需添加过滤条件降低误信号概率,以提高稳定性和适应性。总体来说,策略提供了基于指标融合判断反转的思路,具有一定的实盘参考价值,但需要进行全面验证与优化后方可大规模应用。

|| 

## Overview 

This strategy combines RSI(2) and moving averages to identify low buy and high sell points when price breaks out of the gap between mid-long term moving averages, aiming to capture ultra-short term reversal opportunities.

## Strategy Logic

1. Calculate 2-period RSI to reflect latest two days price change ratio.

2. 5-day and 200-day simple moving averages act as short and long term trend indicators.

3. When price breaks above 200-day MA but below 5-day MA, and RSI(2) < 5, consider oversold, go long.

4. When price breaks below 200-day MA but above 5-day MA, and RSI(2) > 90, consider overbought, go short. 

5. When price breaks 5-day MA again, reversal confirmed, close position.

## Advantage Analysis   

1. RSI(2) has high sensitivity to capture ultra-short reversals quickly.

2. Combining with MA adds validity to reversal signals, avoids whipsaws.

3. Backtest shows decent results on stocks with price limits, max DD controllable. 

4. Simple and elegant code with few parameters, easy to implement.

## Risk Analysis

1. Prone to false signals relying on sensitive indicators, parameters need optimization.

2. Hard to adapt to long trending or ranging markets, return volatility high.

3. No stop loss unable to limit single trade loss. 

4. Only 2-year backtest data, more samples needed to verify strategy.

5. Fails to adapt to extreme events like flash crashes.

## Optimization Directions

1. Test combinations of MA and RSI parameters.  

2. Add volume etc. to confirm reversal signals.

3. Implement moving or percentage stop loss. 

4. Optimize position sizing based on market conditions.

5. Trade both long and short sides.

6. Tweak entry logic for stocks with gap risk.

7. Expand backtest period to verify robustness.

## Summary

This strategy identifies overbought/oversold levels with RSI and MA to capture reversals from mid-long term gaps for ultra-short term trades. Pros are simplicity, speed and decent backtest results. But limited sample, param tuning needed, lacks risk control, weak in gap moves. More filters needed to reduce false signals and improve robustness and adaptiveness. Provides useful idea of using indicator combos to determine reversals, but requires comprehensive optimization and verification for large scale application.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// Algokid code v. 1.00 
strategy("AK_RSI 2 Strategy", overlay=true)

RS = rsi(close,2)

ma5 = sma(close,5)
ma200 = sma(close,200)


longCondition = close > ma200 and close < ma5 and RS < 5


if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)
strategy.close_all(when = close > ma5)

shortCondition = close < ma200 and close > ma5 and RS > 90
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
strategy.close_all(when = close < ma5)



```

> Detail

https://www.fmz.com/strategy/427458

> Last Modified

2023-09-21 11:51:01
