
> Name

基于Renko砖和TEMA指标的微利策略Renko-Boxes-and-TEMA-Indicator-Micro-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是一个相对简单的微利策略,主要运用Renko砖和TEMA指标识别趋势,进行反转交易。策略逻辑简单直观,通过参数优化可以获取稳定收益。

## 策略原理

1. 使用Renko砖替代K线,能更清晰地识别价格走势。 

2. TEMA指标相比EMA延迟更小,可以提早捕捉到趋势转折。

3. 当TEMA上穿短期SMA时做多,下穿时平仓。Renko砖使穿越更可靠。

4. 价格高于长期SMA时不追涨,避免持仓过重。

5. 设置止盈条件,只有达到最小收益要求才会平仓。

## 优势分析

1. Renko砖和TEMA指标组合简单有效。

2. 清晰识别趋势,避免反复冲突交易。

3. TEMA减小延迟,让入场更及时。

4. 合理止盈止损控制风险。

5. 适合高频小资金交易。

## 风险分析

1. 无法及时重新累积仓位,难以持续获利。

2. 参数设定不当可能错过交易机会。

3. 无法控制单向持仓量,存在亏损扩大的风险。

4. 难以获取充分利润,更适合小额套利。

## 优化方向

1. 优化SMA和TEMA参数,找到最佳组合。

2. 测试不同止盈条件,平衡收益和风险。

3. 添加开仓次数限制,控制单向仓位。

4. 结合波动率指标设定止损点。

5. 评估配合其他策略,实现盈利放大。

## 总结

该策略运用Renko砖和TEMA指标判断趋势简单有效,适合高频小资金套利,但扩大盈利空间有限。通过参数优化及风险控制手段可提高效果,也可尝试与其他策略配合使用,对改进空间较大。

|| 

## Overview

This is a relatively simple micro-profit strategy that mainly uses Renko boxes and TEMA indicator to identify trends for reversal trading. The logic is straightforward and can generate steady profits through parameter optimization.

## Strategy Logic

1. Use Renko boxes instead of candles to more clearly identify price moves.

2. TEMA has less lag compared to EMA, allowing earlier detection of trend changes. 

3. Go long when TEMA crosses above short-term SMA, and close position when TEMA crosses below SMA. Renko boxes make the crossover more reliable.

4. Avoid buying when price is above long-term SMA to avoid oversized positions.

5. Set take profit criteria to only close position when meeting minimum profit target.

## Advantage Analysis   

1. Renko and TEMA combo is simple yet effective.

2. Clear trend identification avoids conflicting whipsaw trades. 

3. TEMA reduces lag for more timely entries. 

4. Reasonable stop loss and take profit controls risks.

5. Suitable for high-frequency small capital trading.

## Risk Analysis

1. Hard to quickly re-accumulate position, limiting profit potential.

2. Improper parameters may miss trading opportunities. 

3. No control over position size in one direction, risks amplified losses.

4. Hard to achieve adequate profits, more suited for small scalping.

## Improvement Directions

1. Optimize SMA and TEMA parameters to find best combo.

2. Test different take profit criteria to balance profitability and risk.

3. Add open count limits to control one-way position size.

4. Incorporate volatility indicators to set stop loss.

5. Evaluate combining with other strategies for profit amplification.

## Summary

The strategy effectively identifies trends with Renko and TEMA, suitable for high-frequency small capital scalping, but has limited potential to amplify profits. It can be improved via parameter optimization and risk control means, or combining with other strategies, leaving large room for enhancements.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|temaLength|
|v_input_2|3|smaLength|
|v_input_3|30|smmaLength|
|v_input_4|2|minGainPercent|
|v_input_5|true|avg_protection|
|v_input_6|true|gain_protection|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("TEMA Cross", overlay = true, precision = 7, overlay=true, pyramiding = 100, commission_type = strategy.commission.percent, commission_value = 0.25)

tema(src, len) =>
    3*ema(src, len) - 3*ema(ema(src, len), len) + ema(ema(ema(src, len),len),len)

smma(src, len) =>
    sa = 0.0
    sa := na(sa[1]) ? sma(src, len) : (sa[1] * (len - 1) + src) / len
    sa

temaLength = input(5)
smaLength = input(3)
smmaLength = input(30)
tema1 = tema(close, temaLength)
sma1 = sma(tema1, smaLength)
smma1 = smma(close,smmaLength)


plot(tema1, color = green, title = "TEMA")
plot(sma1, color = orange, title = "SMA")
plot(smma1, color = red, title = "SMMA")

minGainPercent = input(2)
gainMultiplier = minGainPercent * 0.01 + 1

avg_protection = input(1)
gain_protection = input(1)

longCondition = crossover(tema1, sma1) and tema1 < smma1
shortCondition = crossunder(tema1, sma1)

strategy.entry("Buy", strategy.long, qty = 1, when = longCondition and time > timestamp(2017, 9, 22, 4, 20)  and (avg_protection >= 1 ? (na(strategy.position_avg_price) ? true : close <= strategy.position_avg_price) : true))
strategy.close_all(when = shortCondition and time > timestamp(2017, 9, 22, 4, 20) and (gain_protection >=1 ? (close >= gainMultiplier * strategy.position_avg_price) : true))
```

> Detail

https://www.fmz.com/strategy/427372

> Last Modified

2023-09-20 14:36:46
