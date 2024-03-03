
> Name

跨时间轴双重突破价位策略Cross-Timeframe-Double-Breakout-Levels-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18ada0b2e7e11fc2588.png)
[trans]

## 概述

这是一个利用不同时间轴上的关键价位进行双重突破形成交易信号的策略。它可以在趋势价格突破关键支撑或阻力位时进入做多或做空头寸,以捕捉中长线趋势。

## 策略原理

该策略同时在两个不同的时间轴(tf和tf2)上分析价格行情,tf时间轴更长,反映中长线趋势;tf2时间轴更短,反映短期动向。策略监测以下交易信号:

1. 当价格在tf时间轴上突破级别(level)向上时,记录up1=true
2. 当价格在tf时间轴上突破级别向下时,记录dn1=true  
3. 当价格在tf2时间轴上突破级别(level2)向上时,记录up2=true
4. 当价格在tf2时间轴上突破级别向下时,记录dn2=true

交易信号的形成条件是:up1和up2同时为true,表示中长线和短期均看涨,这时做多;dn1和dn2同时为true,表示中长线和短期均看跌,这时做空。

该策略还加入了一些过滤条件,如反向套和色彩K线过滤,防止非真正趋势突破形成错误信号。

整体来看,该策略充分利用了多时间段分析的优势,在确保中长线趋势符合预期的同时,避免被短期市场噪音干扰,形成高质量的交易信号。

## 策略优势分析

1. 突破关键支撑或阻力位,捕捉中长线趋势

   该策略监测在两个时间轴上的关键价位突破,可以在趋势开始阶段捕捉到明确的进入时机。

2. 双重确认降低错误信号

   在两个不同时间轴上同时突破,可以大幅降低随机波动带来的错误信号,提高信号质量。

3. 反向套和色彩K线过滤

   增加反向套和色彩K线判断,可以过滤掉一些低质量的突破信号,防止严重亏损。

4. 简洁的参数设定

   该策略只需要两个时间轴参数即可工作,参数选择灵活,适合不同品种。

5. 易于理解和优化

   策略结构清晰,容易理解原理;也可以根据行情特点调整参数,进行策略优化。

## 策略风险分析

1. 双重突破造成延迟入场

   相比单一突破,双重突破可能造成一定的入场延迟,错过早期强势行情的利润。

2. 关键支撑阻力位选取

   不同品种和市场周期,选择合适的关键价位非常重要,否则可能得到错误信号。

3. 突破失败

   即使双重突破,也可能出现突破失败然后快速回调的情况,带来亏损。

4. 趋势反转损失

   在趋势晚期入场可能遭遇突然反转,无法及时止损出场而造成较大亏损。

5. 参数优化困难

   虽然简单,但要找到最佳参数组合仍需大量反复测试,优化难度较大。

## 策略优化方向  

1. 增加止损策略

   可以设置移动止损或时间止损,在亏损扩大前止损出场。

2. 优化过滤条件

   可以测试不同的反向套幅度参数,或试验其它过滤方式。

3. 动态关键价位

   可以使关键价位随市场变化而动态变化,而不是静态设置。

4. 多品种参数优化

   可以通过机器学习方式,优化不同品种的最佳参数组合。

5. 增加量价确认

   可以添加交易量的确认,避免无量突破的假信号。

## 总结

该策略整体来看是一种简单实用的趋势追踪策略。它同时利用两个时间轴分析,在中长线符合预期时进行入场,可以有效过滤掉部分噪音。策略信号清晰易读,参数设置也比较简单直观。但同时也存在入场时机不佳,关键价位选择困难等问题。总体而言,该策略适合用作趋势验证工具,与其他因子组合使用效果更好,但直接作为主交易系统仍有很大优化空间。

||


## Overview

This is a strategy that utilizes key levels on different timeframes to generate double breakout trading signals. It can enter long or short positions when trend prices break through key support or resistance levels to capture mid-to-long term trends.

## Strategy Logic

The strategy analyzes price action simultaneously on two different timeframes (tf and tf2), with tf being the longer timeframe reflecting the mid-to-long term trend, and tf2 being the shorter timeframe reflecting short-term moves. The strategy monitors the following trading signals:

1. When price breaks above the level (level) on tf timeframe, record up1=true
2. When price breaks below the level on tf timeframe, record dn1=true
3. When price breaks above the level (level2) on tf2 timeframe, record up2=true  
4. When price breaks below the level on tf2 timeframe, record dn2=true

The trading signal is formed when up1 and up2 are true together, indicating long and short term are both bullish, go long; when dn1 and dn2 are both true, indicating long and short term both bearish, go short.

The strategy also incorporates some filters such as inverse scalping and color candlesticks to avoid wrong signals from non-trending breakouts.

Overall, the strategy takes full advantage of multi-timeframe analysis, ensuring the mid-to-long term trend meets expectations while avoiding interference from short-term market noise, generating high quality trading signals.

## Advantage Analysis

1. Catch mid-to-long term trends by breaking key levels

   By monitoring key level breakouts across two timeframes, it can capture clear entry signals at trend initiation stages.
   
2. Dual confirmation significantly reduces false signals

   Requiring concurrent breakouts on two different timeframes greatly lowers false signals from random fluctuations, improving signal quality.
   
3. Filters such as inverse scalps and color candlesticks

   Adding inverse scalping and color candle filters can remove some low quality breakout signals and prevent huge losses.
   
4. Simple parameter settings

   The strategy only needs two timeframe parameters to function, offers flexible tuning for different products.

5. Easy to understand and optimize

   The clear structure makes it easy to understand the logic, and parameters can be adjusted based on market conditions for optimization.

## Risk Analysis

1. Delayed entry due to dual breakout

   Compared to single breakout, dual breakout may cause some entry delay, missing early strong trend profits.

2. Key level selection

   Selecting suitable key levels for different products and market cycles is very important, otherwise it may generate false signals.
   
3. Breakout failure

   Even with dual breakout, there is still a chance of breakout failure and fast pullback, causing losses.

4. Loss from trend reversal

   Late trend entries may face sudden reversal, unable to exit in time through stop loss and incur large losses.

5. Difficult parameter optimization

   Although simple, finding the optimal parameter set still requires extensive testing, with high optimization difficulty.

## Optimization Directions

1. Add stop loss strategies

   Can set trailing stop or time stop to stop loss before loss gets too big.

2. Optimize filters

   Can test different inverse scalp amplitude parameters or other filter methods.
   
3. Dynamic key levels

   Make key levels change dynamically with market shifts rather than static levels.

4. Multi-product parameter optimization

   Use machine learning to optimize best parameter sets for different products.

5. Add volume confirmation

   Incorporate volume confirmation to avoid false breakout signals without volume.

## Summary

Overall this is a simple and practical trend following strategy. By analyzing two timeframes it enters on mid-to-long term direction conformity to filter noise effectively. The signals are clear and easy to interpret, with intuitive parameter settings. But it also has issues like mistimed entry, difficulty selecting key levels. In summary, this strategy works better as a trend validation tool to combine with other factors, but still has much room for optimization as a standalone trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Capital, %|
|v_input_4|W|timeframe 1|
|v_input_5|D|timeframe 2|
|v_input_6_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_7|true|antipila|
|v_input_8|true|color filter|
|v_input_9|1900|From Year|
|v_input_10|2100|To Year|
|v_input_11|true|From Month|
|v_input_12|12|To Month|
|v_input_13|true|From day|
|v_input_14|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-15 00:00:00
end: 2023-11-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Levels Strategy v1.0", shorttitle = "Levels str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
tf = input('W',  title = "timeframe 1")
tf2 = input('D',  title = "timeframe 2")
src = input(ohlc4, "Source")
ap = input(true, defval = true, title = "antipila")
cf = input(true, defval = true, title = "color filter")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Signals
level = request.security(syminfo.tickerid, tf, src[1])
level2 = request.security(syminfo.tickerid, tf2, src[1])
plot(level, linewidth = 3, color = silver)
plot(level2, linewidth = 3, color = gray)
up1 = close > level and ap == false ? true : low > level ? true : false
dn1 = close < level and ap == false ? true : high < level ? true : false
up2 = close > level2 and ap == false ? true : low > level2 ? true : false
dn2 = close < level2 and ap == false ? true : high < level2 ? true : false

//Trading
lot = strategy.position_size != strategy.position_size[1] ? strategy.equity / close * capital / 100 : lot[1]

if up1 and up2 and (close < open or cf == false)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if dn1 and dn2 and (close > open or cf == false)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/432232

> Last Modified

2023-11-15 17:27:36
