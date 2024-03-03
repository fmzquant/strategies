
> Name

基于均线的追踪策略Dual-Moving-Average-Chasing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/170652bf9606d7e20e3.png)
[trans]
## 概述

该策略是一个基于均线的追踪策略。它利用均线的方向和candle的影线来判断价格趋势和力度,以决定entries和exits。核心逻辑是当第二条均线颜色改变时做多/空,然后利用第三条均线的强势信号来加仓,最多加5单。

## 策略原理

策略使用Heikin Ashi均线来判断趋势。具体来说,策略定义了3条均线:

1. 第二条均线,用于判定趋势转折,当其颜色变化时进入场内
2. 第三条均线,用于识别强势突破信号,以决定加仓

AddEntry逻辑:

1. 当第二均线颜色从红变绿时,做多
2. 此时若第三均线是一个强势上涨信号(无下影线的绿色candle),则加仓
3. 最多允许加5单

Exit逻辑:

1. 当任一均线颜色变化时,平仓

## 优势分析

该策略具有以下优势:

1. 使用Heikin Ashi降噪,能减少假信号
2. 双均线组合,判断入场时机更准确 
3. 加仓机制追踪趋势,获利更高

## 风险分析

该策略也存在一些风险:

1. 双均线交叉容易造成剧烈止损
2. 加仓过度可能增加亏损
3. 需调整参数以适应不同品种和周期

可通过止损,调整加仓次数,参数优化来控制风险。

## 优化方向 

该策略可从以下方面进行优化:

1. 测试不同均线指标的参数设置
2. 优化止损策略,如移动止损
3. 根据不同品种分别测试参数
4. 增加过滤条件,避免加仓过快
5. 结合其他指标判断入场时机

## 总结

该策略整体来说是一个基于双均线方向性的追踪策略。它融合了趋势判断和突破判断的优点,通过加仓扩大获利。但也需要注意控制风险,适当调整参数。未来可从优化止损,参数调整等方面进行改进。

||

## Overview

This is a moving average based chasing strategy. It utilizes the direction of moving averages and candle shadows to determine price trends and momentum for entries and exits. The core logic is to go long/short when the color of the second moving average changes, and use strong signals from the third moving average to add positions, up to 5 additions.

## Strategy Principle 

The strategy uses Heikin Ashi moving averages to determine trends. Specifically, the strategy defines 3 moving averages:

1. The second moving average is used to determine trend reversal. Enter trades when its color changes. 
2. The third moving average is used to identify strong breakout signals for adding positions.

Entry Logic:

1. When the second moving average color changes from red to green, go long.  
2. If the third moving average now shows a strong uptrend signal (green candle with no lower shadow), add position.
3. Allow up to 5 additions.

Exit Logic:

1. When either moving average color changes, close all positions.

## Advantage Analysis

The advantages of this strategy:

1. Heikin Ashi reduces noise for better signals.
2. Dual moving averages combo improves entry timing accuracy. 
3. Adding positions to chase trends allows bigger profit.

## Risk Analysis

There are also some risks:

1. Dual moving average crossovers can cause whipsaws.  
2. Over-adding may increase losses.
3. Parameters need tuning for different products and timeframes.

Risks can be managed via stop loss, reducing additions, and parameter optimization.

## Optimization Directions

The strategy can be improved in the following aspects:

1. Test different parameter sets for the moving averages.
2. Optimize stop loss methods like trailing stop loss. 
3. Test parameters separately for different products. 
4. Add filters to prevent adding too fast.
5. Incorporate other indicators for entry timing.

## Summary

In summary, this is a trend chasing strategy based on dual moving average directionality. It combines the advantage of trend and momentum analysis for expanded profits from adding positions. But risks need to be managed via stop loss and parameter tuning. Further improvements can be made in optimizing stops, tuning parameters etc.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("平均K腳本交易策略", overlay=true)

// 定義 Heikin Ashi 指標
ha_open = security(heikinashi(syminfo.tickerid), "60", open)
ha_high = security(heikinashi(syminfo.tickerid), "60", high)
ha_low = security(heikinashi(syminfo.tickerid), "60", low)
ha_close = security(heikinashi(syminfo.tickerid), "60", close)

// 確定 Heikin Ashi 指標的顏色
isGreen = ha_open < ha_close

// 定義加碼次數
var int add_on_buy = 10
var int add_on_sell = 10

// 定義進場和出場條件
long_condition = crossover(ha_close, ha_open) and isGreen and ha_low == ha_open
short_condition = crossunder(ha_close, ha_open) and not isGreen and ha_high == ha_open
exit_condition = crossover(ha_open, ha_close) or crossunder(ha_open, ha_close)

// 如果條件符合，進行進場和出場操作
if (long_condition)
    strategy.entry("Buy", strategy.long)
if (short_condition)
    strategy.entry("Sell", strategy.short)
if (exit_condition)
    strategy.close("Buy")
    strategy.close("Sell")

// 繪製 Heikin Ashi 蠟燭圖
plotcandle(iff(ha_open < ha_close, ha_open, na), ha_high, ha_low, ha_close, title='Green Candles', color=#53b987, wickcolor=#53b987, bordercolor=#53b987)
plotcandle(iff(ha_open >= ha_close, ha_open, na), ha_high, ha_low, ha_close, title='Red Candles', color=#eb4d5c, wickcolor=#eb4d5c, bordercolor=#eb4d5c)

```

> Detail

https://www.fmz.com/strategy/442228

> Last Modified

2024-02-20 14:11:31
