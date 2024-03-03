
> Name

KPL波动跟踪策略KPL-Swing-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

本策略基于KPL波动指标进行交易,是一种简单的趋势跟踪机械交易系统。当价格收盘突破20天高点时做多,收盘跌破20天低点时做空,以捕捉中长线的价格波动。

### 策略原理

1. 计算20天内的最高价和最低价
2. 当收盘价突破20天高点时,做多入场
3. 当收盘价跌破20天低点时,做空入场
4. 计算止损位,设定止损单

具体来说,该策略首先计算过去20天的最高价和最低价,以此构建出震荡范围。当收盘价从下方突破20天高点时,做多入场;从上方跌破20天低点时,做空入场。同时在突破方向计算止损位,入场后立即设置止损单,以控制单笔亏损。

### 优势分析

1. 交易逻辑简单直观,容易掌握
2. 有一定的趋势追踪能力
3. 设置止损单可有效控制风险
4. 无需预测目标价位,避免 subjecitve guess
5. 情绪化交易小,不易受外界影响

### 风险分析

1. 存在一定程度的滞后交易风险
2. 无法有效掌握趋势过程中的关键点位
3. 可能因震荡而被套
4. 潜在利润受限于20日突破范围
5. 难以把握最佳的持仓时间

可通过调整观察突破周期,引入趋势判断,优化止损策略等方式来管理风险。

### 优化方向

1. 测试不同的观察周期参数
2. 加入MACD等指标判断买卖力道
3. 优化止损策略,实现移动止损
4. 评估不同的持仓时间对收益的影响
5. 研究不同品种的参数偏好
6.考虑添加再入场和加仓规则

### 总结 

本策略基于KPL波动指标进行趋势跟踪。优点是简单易操作,有止损;缺点是存在滞后和潜在收益有限。可通过参数优化、策略组合等方式在保持优势的同时改进缺点。该策略可助交易者掌握基于指标的机械交易方法。

|| 

### Overview

This strategy trades based on the KPL Swing indicator, which is a simple trend following mechanical system. It goes long on close above 20-day high, and goes short on close below 20-day low to capture medium-long term price swings.

### Strategy Logic

1. Calculate 20-day highest high and lowest low
2. Go long when close breaks out above 20-day high 
3. Go short when close breaks down below 20-day low
4. Calculate stop loss levels and set stop orders

Specifically, it first calculates 20-day range using highest high and lowest low. When close breaks out upward from 20-day high, go long. When close breaks down from 20-day low, go short. Stop loss levels are calculated after entry for both directions to limit losses.

### Advantage Analysis

1. Simple and intuitive logic, easy to grasp
2. Has some trend following capacity 
3. Stop loss effectively controls risk
4. No subjective price target guessing
5. Less emotional trading, minimal external influence

### Risk Analysis

1. Lagging entry risks exist
2. Fails to identify key levels in trends
3. Whipsaws may cause being trapped
4. Profit potential limited by 20-day breakout range
5. Hard to determine optimal holding period

Risks can be managed via adjusting lookback period, adding trend filter, optimizing stop loss etc.

### Optimization Directions

1. Test different lookback periods
2. Add MACD etc. to gauge momentum  
3. Optimize stop loss for trailing stop loss
4. Evaluate holding period impact on profitability
5. Study parameter preference across products
6. Consider adding re-entry and pyramiding rules

### Summary

This strategy trades trend swings based on KPL Swing indicator. Pros are simple operation and built-in stop loss; Cons are lags and profit constraints. Cons can be improved via parameter optimization, strategy combination while retaining pros. It helps traders master mechanical indicator-based trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|no|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-20 00:00:00
end: 2023-09-20 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ceyhun

//@version=4
strategy("KPL Swing Strategy", overlay=true)

no = input(20)
res = highest(high, no)
sup = lowest(low, no)
avd = iff(close > res[1], 1, iff(close < sup[1], -1, 0))
avn = valuewhen(avd != 0, avd, 1)
tsl = iff(avn == 1, sup, res)
sl = iff(close > tsl, highest(lowest(low, no / 2), no / 2), lowest(highest(high, no / 2), no / 2))

plot(tsl, color=#0000FF,title="KPL Swing")
plot(sl,  color=color.white,title="Stoploss")

bgcolor(abs(close - tsl[1]) > close ? color.white : close < tsl ? color.red : color.green, 90, offset=0)

if crossover(close, tsl)
    strategy.entry("Long", strategy.long, comment="Long")

if crossunder(close,tsl)
    strategy.entry("Short", strategy.short, comment="Short")
    
    
    

```

> Detail

https://www.fmz.com/strategy/427453

> Last Modified

2023-09-21 11:09:04
