
> Name

趋势追踪交易策略Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

Noro趋势追踪交易策略是一个基于价格通道、RSI和实体过滤的简单趋势追踪策略。它识别价格通道方向作为大趋势,利用超买超卖指标RSI进行入场,并配合实体过滤来发出交易信号。该策略适用于股指、外汇等具有持续趋势的品种。

## 策略原理

该策略的主要交易逻辑包括:

1. 应用价格通道判断大趋势方向。通过计算一定周期内的最高价和最低价形成通道,价格位于通道上方为看涨,下方为看跌。

2. RSI指标判断超买超卖区间,辅助寻找入场时点。RSI高于60为超买区,低于40为超卖区。

3. 实体过滤器发出最后信号。仅在实体大于一定大小时交易,避免噪音。 

4. 结合大趋势、RSI信号和实体过滤器进行入场。多头趋势下看涨信号入场做多,空头趋势下看跌信号入场做空。

5. 提供开启背景色选项,直观判断大趋势方向。

6. 可自定义策略交易时间段,仅在选定时间段内交易。

该策略多指标共振,大趋势确定方向,RSI确定时点,实体过滤确定质量,形成了一个相对稳定的趋势追踪策略。

## 优势分析

该策略具有以下主要优势:

1. 价格通道直观判断大趋势方向,避免扛单反向。

2. RSI指标可有效识别超买超卖的入场时点。

3. 实体过滤增强信号质量,避免被噪音或假信号欺骗。

4. 多指标过滤和确认,提高决策的准确性。

5. 使用简单指标,降低曲线优化风险。

6. 可自定义交易时间段,配合大趋势方向灵活应用。

7. 易于操作参数少,新手也能轻松使用。

8. 提供背景色选项,形成清晰的视觉效果。

## 风险分析

该策略也面临一定的风险:

1. 大趋势判断错误风险,价格通道可能会失效。

2. RSI发出错误信号的风险,超买超卖判定不准确。

3. 实体过滤排除正常信号的风险,漏掉交易机会。

4. 回撤风险,大趋势中也会出现深度调整。

5. 优化风险,参数设置不当可能导致过优化。

6. 仓位风险,默认全仓交易可能放大亏损。

7. 品种选择风险,该策略只适合趋势品种。

8. 交易时间段设置风险,需要合理设置才能发挥作用。

## 优化方向 

该策略可以考虑以下几点优化:

1. 增加止损策略,以控制单笔亏损。

2. 优化参数,使之更符合具体交易品种的特点。

3. 增加仓位管理模块,根据趋势强弱调整仓位。

4. 可设置回撤控制,避免亏损扩大。

5. 结合量价指标进行信号验证,提高准确性。

6. 增加机器学习等技术进行参数优化。

7. 对交易品种进行分类优化,制定个性化策略。

8. 优化交易时间段的设置逻辑,使之更灵活。

## 总结

Noro趋势追踪策略整合价格通道、RSI和实体过滤器,形成一个简单实用的趋势追踪策略。它可以顺势而为,避免逆势交易。通过参数优化、风险控制等改进,该策略有望成为一个可持续盈利的趋势交易策略。

||


## Overview

Noro's trend following strategy is a simple trend trading strategy based on price channel, RSI and body filter. It identifies the overall trend using price channel, enters based on RSI overbought/oversold levels, and uses body filter for additional signal confirmation. The strategy suits trending instruments like indices and forex.

## Strategy Logic 

The key aspects are:

1. Price channel determines the overall trend. Channel formed by looking back high/low defines uptrend/downtrend.

2. RSI indicates overbought/oversold for entry timing. RSI above 60 is overbought, below 40 is oversold zone.

3. Body filter provides final signal. Trades only if candle body exceeds a threshold to avoid noise.

4. Entries based on combining trend, RSI signal and body filter. Long entries in uptrend on bullish signals, short entries in downtrend on bearish signals.

5. Optional background colors clearly visualize the trend. 

6. Customizable trading time frames to selectively trade.

Multiple indicators align to create a relatively stable trend following system.

## Advantages

The main advantages are:

1. Price channel intuitively identifies the overall trend direction.

2. RSI effectively detects overbought/oversold levels for timing entry.

3. Body filter enhances signal quality and avoids false signals. 

4. Multi-indicator confirmation improves accuracy.

5. Simple indicators reduce curve fitting risks.

6. Customizable trading time frames add flexibility.

7. Easy to use with minimal parameters. Beginner friendly.

8. Background colors provide visual clarity.

## Risks

Some risks to consider:

1. Price channel trend misidentification risk.

2. Inaccurate RSI signal risks. 

3. Body filter eliminating valid signals.

4. Drawdown risk during trend corrections.

5. Optimization risk from bad parameter tuning. 

6. Position sizing risk from default full allocation.

7. Instrument selection risk if applied on non-trending assets. 

8. Trading time frame risks if improperly configured.

## Enhancement Opportunities

Some enhancement possibilities:

1. Add stop loss strategy to control loss per trade.

2. Optimize parameters based on instrument behavior.

3. Incorporate position sizing rules based on trend strength.

4. Implement drawdown limits to contain losses.

5. Add volume price analysis for signal verification.

6. Introduce machine learning for parameter optimization. 

7. Specialize parameters based on asset class.

8. Refine trading time frame logic for more flexibility.

## Conclusion

Noro's trend following strategy integrates price channel, RSI and body filter into a simple and practical trend trading system. It can trade along the trends and avoid counter-trend trades. With parameter optimization, risk controls and other improvements, the strategy has potential to become a consistently profitable trend trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|21|MA Period|
|v_input_4|false|Need trend Background?|
|v_input_5|1900|From Year|
|v_input_6|2100|To Year|
|v_input_7|true|From Month|
|v_input_8|12|To Month|
|v_input_9|true|From day|
|v_input_10|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-25 00:00:00
end: 2023-09-24 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title = "Noro's TrendMaster Strategy v1.0", shorttitle = "TrendMaster str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "long")
needshort = input(true, defval = true, title = "short")
len = input(21, defval = 20, minval = 2, maxval = 200, title = "MA Period")
needbg = input(false, defval = false, title = "Need trend Background?")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//PriceChannel 1
lasthigh = highest(close, len)
lastlow = lowest(close, len)
center = (lasthigh + lastlow) / 2

//Trend
trend = low > center and low[1] > center[1] ? 1 : high < center and high[1] < center[1] ? -1 : trend[1]

//Bars
bar = close > open ? 1 : close < open ? -1 : 0

//Fast RSI
fastup = rma(max(change(close), 0), 2)
fastdown = rma(-min(change(close), 0), 2)
rsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//Body filter
nbody = abs(close - open)
abody = sma(nbody, 10)
body = nbody > abody / 2

//Signals
up1 = trend == 1 and rsi < 60 and (strategy.position_avg_price > close or strategy.position_size <= 0) and body
dn1 = trend == -1 and rsi > 40 and (strategy.position_avg_price < close or strategy.position_size >= 0) and body

//Lines
plot(center, color = blue, linewidth = 3, transp = 0, title = "MA")

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 80)

//Trading

if up1
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
    
```

> Detail

https://www.fmz.com/strategy/427814

> Last Modified

2023-09-25 17:50:11
