
> Name

超趋势追踪止盈策略Supertrend-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16d6c6543354d063fd9.png)
[trans]

## 概述

这个策略基于超趋势指标来判断入场点,当指标反转时做多做空。同时设置了3个不同比例的止盈单,分别固定止赚2%、5%和10%,以锁定不同程度的利润。

## 策略原理

该策略使用超趋势指标判断行情趋势。超趋势指标基于平均真实波幅和一个乘数因子,当价格超过上轨时为超买形态,当价格跌破下轨时为超卖形态。因此,该策略通过监测超趋势指标的方向变化来判断何时做多和做空。

具体来说,当超趋势指标变化小于0时,即代表指标由上向下反转,形成做多信号;当超趋势指标变化大于0时,即代表指标由下向上反转,形成做空信号。收到做多或做空信号后,记录入场价格,并下单入场。

该策略同时设置了3个不同比例的止盈单,它们的止盈价格分别为入场价的1.02倍、1.05倍和1.10倍,对应固定止赚2%、5%和10%的利润。这3个止盈单的手数比例分别设定为25%、50%和25%。收到开仓信号后,该策略会同时挂上这3个止盈单,意在锁定不同程度的利润。

## 优势分析

该策略具有以下几个优势:

1. 使用超趋势指标判断入场,能够有效捕捉趋势反转点,精准做多做空。

2. 设置多个止盈单比例,可以锁定不同程度的利润,降低回撤。

3. 止盈设置比较保守,以2%、5%和10%的目标利润为主,避免追求过高盈利导致的亏损扩大。

4. 策略逻辑简单清晰,容易理解和修改,适合量化交易的初学者。

## 风险分析

该策略也存在一些风险:  

1. 超趋势指标设定不当,可能错过趋势反转点,导致入场不够精确。

2. 止盈位置设置过于保守,可能错过行情继续运行带来更大利润的机会。

3. 突发事件导致快速跳空或断头,超趋势指标来不及反应,造成止损被触发。

4. 策略中没有设置止损条件,存在无限亏损的风险。

## 优化方向

该策略还可以从以下几个方面进行优化:

1. 测试不同的超趋势指标参数,优化指标的灵敏度。

2. 增加止损条件,设定最大承受损失,控制风险。

3. 根据不同品种和交易周期,调整止盈比例和止盈数量。

4. 增加其他指标过滤,避免在震荡行情中频繁开仓。

5. 优化资金利用率,通过调整策略默认交易额,降低单笔风险。

## 总结

该策略整体来说较为简单实用。它使用超趋势指标判断入场时点,再利用多个止盈单来锁定利润,可有效控制风险。但策略中还存在可以进一步优化的地方,如设置止损、优化参数等,这些都为日后改进提供了方向。总的来说,该策略适合量化交易初学者学习和实践。

||

## Overview

This strategy uses the Supertrend indicator to determine entry points, going long or short when the indicator reverses. It also sets three take profit orders at fixed profits of 2%, 5% and 10% to lock in gains at different levels.  

## Strategy Logic

The strategy utilizes the Supertrend indicator to identify trend direction. Supertrend is based on Average True Range and a multiplier factor. When price goes above the upper band it signals an overbought condition and when price falls below the lower band it signals an oversold condition. Therefore, the strategy detects reversals in Supertrend direction to determine entries.   

Specifically, when change in Supertrend is less than 0, it indicates the indicator has reversed from up to down, generating a long signal. When change in Supertrend is greater than 0, the indicator has reversed from down to up, generating a short signal. Upon receiving long or short signals, entry price is recorded and orders are placed.

The strategy also sets three take profit orders at 2%, 5% and 10% of the entry price, to lock in fixed target profits. The proportions of these orders are set at 25%, 50% and 25% respectively. After entry signals, these take profit orders are placed simultaneously to capture gains at different levels.  

## Advantage Analysis   

The strategy has the following advantages:

1. Using Supertrend for entries effectively captures trend reversal points for accurate long/short. 

2. Multiple take profit proportions allows locking in gains at different levels, reducing drawdowns.  

3. Conservative profit targets of 2%, 5% and 10% avoids overextension of profits leading to larger losses.

4. Simple and clear logic, easy to understand and modify, suitable for beginners.

## Risk Analysis

The strategy also has some risks:

1. Improper Supertrend parameters may cause missing reversal signals, leading to inaccurate entries.

2. Conservative take profit levels may miss opportunities to run profits further. 

3. Gaps and limit moves may trigger stops before Supertrend adjusts.

4. No stop loss condition means unlimited loss potential.

## Improvement Areas

Some ways the strategy can be optimized:

1. Test different Supertrend parameters to improve sensitivity.  

2. Add stop loss to limit maximum loss.

3. Adjust take profit ratios and quantities based on symbol and timeframe.

4. Add filters to avoid excessive trades in range-bound markets.

5. Optimize capital usage by adjusting default trade size to lower risk per trade.

## Summary

The strategy is simple and practical overall. It uses Supertrend for entries and multiple take profit orders to lock in gains, effectively controlling risk. But there is room for improvements like adding stops, optimizing parameters etc. which provides future enhancement directions. In summary, this strategy is suitable for beginners to learn and practice algorithmic trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Length|
|v_input_float_1|3|Factor|
|v_input_bool_1|true|TP1|
|v_input_float_2|2|TP Level (%)|
|v_input_int_1|25|Amount (%)|
|v_input_bool_2|true|TP2|
|v_input_float_3|5|TP Level (%)|
|v_input_int_2|50|Amount (%)|
|v_input_bool_3|true|TP3|
|v_input_float_4|10|TP Level (%)|
|v_input_int_3|25|Amount (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy( "Supertrend with TP", overlay=true )

// Supertrend Settings
atrPeriod = input(10, "ATR Length")
factor = input.float(3.0, "Factor", step = 0.01)

// TP's
tp1Open = input.bool(true, "TP1")
tp1 = input.float(2.0, "TP Level (%)", step = 0.1) / 100
tp1Amount = input.int(25, "Amount (%)", step = 1)
tp2Open = input.bool(true, "TP2")
tp2 = input.float(5.0, "TP Level (%)", step = 0.1) / 100
tp2Amount = input.int(50, "Amount (%)", step = 1)
tp3Open = input.bool(true, "TP3")
tp3 = input.float(10.0, "TP Level (%)", step = 0.1) / 100
tp3Amount = input.int(25, "Amount (%)", step = 1)

[_, direction] = ta.supertrend(factor, atrPeriod)

entryPrice = 0.0
entryPrice := entryPrice[1]

if ta.change(direction) < 0
    strategy.entry("Long", strategy.long)
    entryPrice := close

if ta.change(direction) > 0
    strategy.entry("Short", strategy.short)
    entryPrice := close

if (tp1Open)
    strategy.exit ("TP1", from_entry="Long", limit=entryPrice * (1 + tp1), qty_percent=tp1Amount)
    strategy.exit ("TP1", from_entry="Short", limit=entryPrice * (1 - tp1), qty_percent=tp1Amount)

if (tp2Open)
    strategy.exit ("TP2", from_entry="Long", limit=entryPrice * (1 + tp2), qty_percent=tp2Amount)
    strategy.exit ("TP2", from_entry="Short", limit=entryPrice * (1 - tp2), qty_percent=tp2Amount)
    
if (tp3Open)    
    strategy.exit ("TP3", from_entry="Long", limit=entryPrice * (1 + tp3), qty_percent=tp3Amount)
    strategy.exit ("TP3", from_entry="Short", limit=entryPrice * (1 - tp3), qty_percent=tp3Amount)
```

> Detail

https://www.fmz.com/strategy/438016

> Last Modified

2024-01-08 11:08:39
