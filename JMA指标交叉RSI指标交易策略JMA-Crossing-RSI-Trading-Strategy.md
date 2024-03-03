
> Name

JMA指标交叉RSI指标交易策略JMA-Crossing-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过Jurik移动平均线(JMA)与RSI指标的交叉来产生买卖信号。当JMA上穿RSI时做多,当JMA下穿RSI时做空。该策略试图利用两个指标的组合过滤假信号,在趋势较明显时进行交易。

## 原理

该策略主要利用两种指标进行组合:

1. JMA指标:一种用幂乘数平滑移动平均线,具有更低的滞后性,能更快捕捉价格变化。

2. RSI指标:较为常见的强弱指标,反映市场买卖力道。

当JMA上穿RSI时,表示短期价格上涨势头强于长期趋势,产生买入信号;当JMA下穿RSI时,提示做空信号。

交叉信号发出后,交易在对应方向开仓。平仓条件为价格超过指定目标比例或指标再次交叉反向。

## 优势

1. JMA指标参数可调,能够对不同周期进行优化。

2. RSI指标可过滤假突破。

3. 采用双指标组合,可减少假信号。

4. 内置止损机制,可以限制亏损。

5. 可自定义盈利比例,实现盈利目标。

## 风险及解决方案

1. 双指标组合inating,信号产生频率可能过低。可调整参数,使指标更敏感。

2. JMA指标还存在滞后问题,可能错过价格转折点。可结合其他先导指标进行优化。

3. 止损点设置不当可能被突破导致亏损扩大。应根据历史数据测试确定适合的止损位。

4. 仅依赖指标易产生假信号。可加入交易量或波动率指标进行过滤。

## 优化思路

1. 对JMA参数进行测试,找到最佳参数组合。

2. 尝试不同的RSI参数Setting,优化指标效果。

3. 加入移动止损机制,让止损更具适应性。

4. 优化开仓仓位管理逻辑,如加入加仓和分批建仓条件。

5. 研究其他指标Filter信号,如KD、MACD等。

## 总结

该策略基于JMA和RSI两个指标交叉实现趋势跟踪,可配置止损来限制风险。但仍存在一定假信号概率,需要继续优化指标参数和过滤条件来减少失误交易。止损策略也需要根据回测数据进行优化测试。本策略为双指标交叉交易提供了基础框架,具有一定的拓展空间。

|| 

## Overview

This strategy generates trading signals by crossing of Jurik Moving Average (JMA) and RSI indicator. It goes long when JMA crosses above RSI and goes short when crossing below. The strategy attempts to filter false signals by combining two indicators, and trade when trend is more apparent.

## Principles

The strategy mainly utilizes two types of indicators:

1. JMA indicator: A smoothed moving average using power multipliers, with lower lag and quicker in capturing price changes.

2. RSI indicator: A common strength indicator reflecting buying/selling momentum. 

When JMA crosses above RSI, it indicates stronger short-term uptrend over long term trend and generates buy signal. When crossing below RSI, it prompts sell signal.

Upon signal, the strategy enters trade in corresponding direction. Exits when price reaches predetermined profit ratio or indicators cross reverse direction.

## Advantages

1. Adjustable JMA parameters adaptable to different periods.

2. RSI filters false breakouts. 

3. Dual indicator combination reduces false signals.

4. Built-in stop loss controls loss.

5. Customizable profit ratio for profit targeting.

## Risks and Mitigations

1. Dual indicators combo may generate too few signals. Can tweak parameters for sensitivity.

2. JMA still has lag, may miss turning points. Can optimize with leading indicators.

3. Improper stop loss placement may be hit for greater loss. Should backtest for suitable placement.

4. Overreliance on indicators can produce false signals. Can add volume or volatility filters.

## Enhancement Opportunities 

1. Test JMA parameters to find optimal settings.

2. Try different RSI parameters for better performance. 

3. Add trailing stop mechanism for adaptive stops.

4. Optimize entry position sizing like adding to winning trades.

5. Research additional filters like KD, MACD.

## Summary

The strategy enables trend following with JMA and RSI crossovers and limits risk via stops. But false signals remain probable, requiring further optimization on parameters and filters. Stop loss also needs backtest validation. It provides a basic framework for dual indicator crossing system with room for improvements.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2019|Start Year|
|v_input_2|6|Start Month|
|v_input_3|true|Start Day|
|v_input_4|false|Start Hour|
|v_input_5|false|Start Minute|
|v_input_6|2019|End Year|
|v_input_7|12|End Month|
|v_input_8|true|End Day|
|v_input_9|false|End Hour|
|v_input_10|false|End Minute|
|v_input_11|14|Length|
|v_input_12|7|Length|
|v_input_13|50|Phase|
|v_input_14|2|Power|
|v_input_15|true|Highlight Movements ?|
|v_input_16|true|Use Initial Stop Loss?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-03-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// Stratégie marche le mieux sur du 2 jours
strategy("JMA(7,50,RSI) crossing RSI(14,close)", overlay=false, currency=currency.EUR, default_qty_type=strategy.cash, default_qty_value=5000)

// Strategy Tester Start Time
sYear = input(2019, title = "Start Year")
sMonth = input(06, title = "Start Month", minval = 01, maxval = 12)
sDay = input(01, title = "Start Day", minval = 01, maxval = 31)
sHour = input(00, title = "Start Hour", minval = 00, maxval = 23)
sMinute = input(00, title = "Start Minute", minval = 00, maxval = 59)
startTime = true

// Strategy Tester End Time
eYear = input(2019, title = "End Year")
eMonth = input(12, title = "End Month", minval = 01, maxval = 12)
eDay = input(01, title = "End Day", minval = 01, maxval = 31)
eHour = input(00, title = "End Hour", minval = 00, maxval = 23)
eMinute = input(00, title = "End Minute", minval = 00, maxval = 59)
endTime = true

// === RSI ===
src = close, len = input(14, minval=1, title="Length")
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
plot(rsi, color=color.purple)
band1 = hline(70)
band0 = hline(30)

// === JMA ===
_length = input(7, title="Length")
_phase = input(50, title="Phase")
_power = input(2, title="Power")
highlightMovements = input(true, title="Highlight Movements ?")

// srcJMA = input(rsi, title="Source")
srcJMA = rsi

phaseRatio = _phase < -100 ? 0.5 : _phase > 100 ? 2.5 : _phase / 100 + 1.5
beta = 0.45 * (_length - 1) / (0.45 * (_length - 1) + 2)
alpha = pow(beta, _power)
jma = 0.0
e0 = 0.0
e0 := (1 - alpha) * srcJMA + alpha * nz(e0[1])
e1 = 0.0
e1 := (srcJMA - e0) * (1 - beta) + beta * nz(e1[1])
e2 = 0.0
e2 := (e0 + phaseRatio * e1 - nz(jma[1])) * pow(1 - alpha, 2) + pow(alpha, 2) * nz(e2[1])
jma := e2 + nz(jma[1])
// === End of JMA def ===

jmaColor = highlightMovements ? (jma > jma[1] ? color.green : color.red) : #6d1e7f
plot(jma, title="JMA switch", linewidth=2, color=jmaColor, transp=0)

// === Inputs ===
// risk management
useStop = input(true, title = "Use Initial Stop Loss?")

goLong() => crossover(rsi, jma)
killLong() => crossunder(rsi, jma)

// ======= DEBUGGGGGGGG ============
long_price = 0.0
short_price = 0.0

if(startTime and endTime)
    if(goLong())
        long_price := close
    strategy.entry("Buy", strategy.long, when = goLong())
    strategy.close("Buy", when = killLong() and close > long_price)

// Shorting if using
goShort() => killLong()
killShort() => goLong()

if(startTime and endTime)
    if(goShort())
        short_price := close
    strategy.entry("Sell", strategy.short, when = goShort() and close < short_price)
    strategy.close("Sell", when = killShort())
// =========================

if (useStop)
    strategy.exit("XLS", from_entry ="Buy", stop = strategy.position_avg_price / 1.08)
    strategy.exit("XSS", from_entry ="Sell", stop = strategy.position_avg_price * 1.08)


```

> Detail

https://www.fmz.com/strategy/427186

> Last Modified

2023-09-18 21:42:50
