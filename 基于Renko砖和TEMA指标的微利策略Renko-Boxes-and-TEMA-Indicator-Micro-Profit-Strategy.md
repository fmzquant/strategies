
> Name

基于Renko砖和TEMA指标的微利策略Renko-Boxes-and-TEMA-Indicator-Micro-Profit-Strategy

> Author

ChaoZhang

> Strategy Description


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
