
> Name

多时间框架价格通道策略Multi-Timeframe-Price-Channel-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略运用多时间框架价格的最高价和最低价EMA构建通道,以实现短期价格反转交易。属于典型的震荡指标策略。

## 策略原理

1. 在15分钟时间框架计算最近60根K线的最高价和最低价的EMA均线,描绘价格通道上下轨。

2. 快线为30周期EMA均线,慢线为60周期EMA均线。

3. 当快线下穿慢线时,视为通道上轨承压,发出看跌信号,做空。

4. 当快线上穿慢线时,视为通道下轨支撑,发出看涨信号,做多。

5. 在反转信号出现后,利用短期价格回归通道middle的特点实现盈利。

## 优势分析

1. 多时间框架能提供更全面的价格信息。

2. EMA均线平滑价格,有利判断大趋势。 

3. 快慢线交叉易于形成交易信号。

4. 短线反转易获利,降低时间风险。

## 风险分析

1. 多时间框架增加复杂度,不易进行参数优化。

2. 依赖单一指标,容易被突破反转。

3. 未设止损止盈点,存在更大亏损风险。

4. 高交易频率增加交易成本。

## 优化方向

1. 测试不同的时间框架参数组合寻找最佳匹配。

2. 增加移动止损或其他指标过滤以控制风险。

3. 结合交易量指标避免被套盘和假突破。

4. 设置止盈止损点,在盈利同时控制风险。 

5. 加入开仓限额和其他资金管理策略。

## 总结

该策略尝试运用多时间框架构建短期反转交易策略。但其存在参数难优化、风险控制不足等问题。需要进一步优化信号生成逻辑和风险管理方案,方能实际应用。

|| 

## Overview

This strategy uses EMA of highest and lowest prices from multiple timeframes to build price channels and trade short-term reversals. It belongs to the category of oscillation indicator strategies.

## Strategy Logic

1. Calculate EMA of highest and lowest prices of recent 60 bars on 15m timeframe to plot price channel bands.

2. Fast line is 30-period EMA, slow line is 60-period EMA. 

3. When fast line crosses below slow line, it indicates downward pressure on upper band, giving bearish signal for short entry.

4. When fast line crosses above slow line, it indicates support of lower band, giving bullish signal for long entry.

5. After reversal signals, take profits from prices reverting back to channel middle.

## Advantages

1. Multiple timeframes provide more comprehensive price information.

2. EMA smooths price for determining overall trend.

3. Fast and slow line crossovers easily form trade signals. 

4. Short-term reversals allow quick profits and reduce time risk.

## Risks

1. Multiple timeframes increase complexity in parameter optimization.

2. Reliance on single indicator makes it vulnerable to false breakouts.

3. No stop loss or take profit settings expose to larger loss risks.

4. High trade frequency increases transaction costs.

## Optimization

1. Test different timeframe combinations to find optimal match.

2. Add trailing stop loss or other filters to control risks.

3. Incorporate volume to avoid traps and false breakouts.

4. Set stop loss and take profit points to lock in profits and limit risks.

5. Add position sizing and other capital management strategies. 

## Summary

The strategy attempts to build short-term reversal system using multiple timeframes. But it has issues like difficult parameter optimization and insufficient risk control. Further enhancements are needed in signal logic and risk management for practical application.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-09 00:00:00
end: 2023-09-14 09:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Just_Try_Different_Things", overlay=true)


Sig = security(syminfo.tickerid,'15',open)

H = ema(highest(Sig,60),60)
L = ema(lowest(Sig,60),60)




longCondition = crossunder(sma(H, 30), sma(H, 60))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = crossover(sma(L, 30), sma(L, 60))
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
```

> Detail

https://www.fmz.com/strategy/427071

> Last Modified

2023-09-17 18:39:41
