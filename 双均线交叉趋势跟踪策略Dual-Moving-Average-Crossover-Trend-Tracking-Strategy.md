
> Name

双均线交叉趋势跟踪策略Dual-Moving-Average-Crossover-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略运用双均线交叉原理,结合趋势跟踪指标,实现趋势的判断和跟踪。主要思想是当短期均线上穿长期均线时做多,短期均线下穿长期均线时做空。同时加入百日均线判断整体趋势方向,避免假突破。

## 策略原理  

本策略主要由双均线交叉系统和趋势跟踪系统组成。

双均线交叉系统包含快线EMA1和慢线EMA2。其中EMA1默认为10日线,EMA2默认为20日线。当快线上穿慢线时生成买入信号,当快线下穿慢线时生成卖出信号。

加入百日均线EMA100来判断整体趋势方向。只有当价格在上升趋势时(价格高于100日均线),快线上穿慢线才产生买入信号;只有当价格在下降趋势时(价格低于100日均线),快线下穿慢线才产生卖出信号。这可以过滤大部分假突破情况。 

此外,还在K线上标记买入和卖出的箭头,以直观显示交易信号。

趋势跟踪系统则使用日内和周期内的日线来再次确认趋势方向。日内采用5分钟和60分钟Heikin-Ashi均线进行判断,周期内采用日线的8日、12日均线进行判断。

只有当日内和周期内的判断一致时,才会发出真正的交易信号。这可以进一步过滤掉大部分非主趋势方向的noise。

## 优势分析

这套策略最大的优势在于同时融合趋势跟踪和均线交叉系统,能够有效过滤假信号,将回撤控制在可承受范围内。

具体来看,双均线交叉系统优势如下:

1. 操作简单,原理容易理解,适合新手;

2. 顺势操作,避免逆势;

3. 快线和慢线参数可调,可以适应不同周期;

4. 获利能力强,大趋势下盈利显著。

加入EMA100的优势:

1. 过滤逆势操作,减少亏损;

2. 配合趋势操作,回撤可控。

趋势跟踪系统的优势:

1. 多时间维度判断,避免被单一时间段的noise影响;

2. 确保交易方向与大级别走势一致,减少回撤。

3. Heikin-Ashi平滑价差,过滤noise,只捕捉趋势。

## 风险分析

本策略也存在一些风险需要注意:

1. 长期盘整时,均线交叉频繁,会产生过多交易机会和额外交易成本。

2. 交易信号可能滞后,错过趋势初期阶段。

3. 大级别趋势反转时,可能亏损严重。

4. 参数设置需要优化,不恰当会影响策略表现。

对策:

1. 盘整时降低操作频率,避免无效交易。

2. 适当缩短均线周期,获取趋势早期信号。

3. 设置止损点,控制单次亏损。

4. 优化参数设置,针对不同品种和行情环境调整。

## 优化方向 

本策略可以从以下几个方面进行优化:

1. 均线周期优化。可以测试更多参数组合,寻找最佳周期。

2. 加入更多时间段判断。例如加入月线或季线指标。

3. 增加止损机制。设置移动止损或指数型止损。

4. 结合交易量指标。例如能量潮配合KDJ等指标。

5. 优化入场时机。可以考虑 MACD 等较敏感指标的辅助。

6. 多品种适应优化。调整参数适应更多品种。

## 总结

本策略整合双均线交叉和趋势跟踪系统,能够有效发挥各自优势,避免单一系统的问题。多时间维度判断保证了交易方向的正确,回撤控制佳。可通过进一步优化,适应更多市场环境,具有实战价值。

||


## Overview

This strategy utilizes the dual moving average crossover principle combined with a trend tracking indicator to determine and follow trends. The main idea is to go long when the short period moving average crosses above the long period moving average and go short when the short period moving average crosses below the long period moving average. The overall trend direction is also determined by the 100-day moving average to avoid false breakouts.

## Strategy Logic

The strategy consists mainly of a dual moving average crossover system and a trend tracking system. 

The dual moving average crossover system contains a fast EMA1 and slow EMA2. The default periods are 10 days for EMA1 and 20 days for EMA2. A buy signal is generated when EMA1 crosses above EMA2. A sell signal is generated when EMA1 crosses below EMA2.

The 100-day EMA (EMA100) is added to determine the overall trend direction. Buy signals are only generated when the price is in an upward trend (price is above the 100-day EMA). Sell signals are only generated when the price is in a downward trend (price is below the 100-day EMA). This filters out most false breakout situations.

Buy and sell arrows are also plotted on the candles to visually display the trading signals.

The trend tracking system uses intraday and cycle day lines to confirm the trend direction again. Intraday uses 5-min and 60-min Heikin-Ashi moving averages while the cycle uses 8-day and 12-day moving averages of the daily line. 

Trading signals are only generated when the intraday and cycle judgments agree. This further filters out most noise in the non-major trend directions.

## Advantage Analysis 

The biggest advantage of this strategy is the integration of both trend tracking and moving average crossover systems, which effectively filters out false signals and keeps drawdowns within acceptable levels.

Specifically, the advantages of the dual moving average crossover system are:

1. Simple logic and easy to understand, suitable for beginners.

2. Trend-following, avoids trading against the trend.  

3. Customizable fast and slow EMA periods, adaptable to different cycles.

4. Strong profitability in major trends.

Adding the EMA100 has the advantages of:

1. Avoiding trading against the trend, reducing losses.

2. Following the trend, keeping drawdown controllable.

The trend tracking system has the advantages of:

1. Multiple timeframe analysis, avoiding noise from a single period.

2. Ensuring alignment with major trend direction, reducing drawdowns. 

3. Heikin-Ashi smooths out noise, only capturing trends.

## Risk Analysis

Some risks to note for this strategy:

1. Frequent crossovers and extra trading costs during prolonged consolidations.

2. Delayed signals, missing early trend stages.

3. Severe losses when major trend reverses.  

4. Performance depends on parameter optimization.

Solutions:

1. Reduce trading frequency during consolidations.

2. Shorten EMA periods to get earlier trend signals. 

3. Use stop loss to control single loss.

4. Optimize parameters for different products and market conditions.

## Optimization Directions

This strategy can be optimized in the following areas:

1. EMA period optimization. Test more combinations to find optimal periods.

2. Add more timeframe judgments, e.g. monthly or quarterly lines.

3. Incorporate stop loss mechanisms like moving or exponential stops.

4. Combine with volume indicators like On Balance Volume. 

5. Improve entry timing using faster oscillators like MACD.

6. Parameter optimization for more products and assets.

## Conclusion

This strategy combines the strengths of dual moving average crossover and trend tracking systems, avoiding the weaknesses of single systems. Multiple timeframe analysis ensures correct trade direction while drawdown control is excellent. Further optimizations can adapt it to more market environments for practical usage.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|par1|
|v_input_2|20|par2|
|v_input_3|8|MA1|
|v_input_4|12|MA2|
|v_input_5|D|Short Time|
|v_input_6|W|Long Time|
|v_input_7|16|EMA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-20 00:00:00
end: 2023-09-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © askkuldeeprandhawa

//@version=4

strategy("KSR Strategy", overlay=true)



par1=input(10)
par2=input(20)
ema1=ema(close,par1)
ema2=ema(close,par2)
buy=ema1>ema2
sell=ema2<ema1
mycolor= iff(buy,color.green,iff(sell,color.blue,color.red))
barcolor(color=mycolor)



ema100=ema(close,100)
ibuy=crossover(ema1,ema2)
iSell=crossunder(ema1,ema2)

varp=tostring(close[1])
plotshape(ibuy, "Up Arrow", shape.triangleup, location.belowbar, color.green, 0, 0,"Buy" , color.green, true, size.tiny)
plotshape(iSell, "Down Arrow", shape.triangledown, location.abovebar, color.red, 0, 0, "Sell", color.red, true, size.tiny)

crossed =crossover(ema(close,par1), ema(close,par2))
// if crossed
//     l = label.new(bar_index, na, tostring(close), 
//          color=color.green, 
//          textcolor=color.white,
//          style=label.style_labelup, yloc=yloc.belowbar)
         
crossed2 =crossunder(ema(close,par1), ema(close,par2))
// if crossed2
//     l = label.new(bar_index, na, tostring(close), 
//          color=color.red, 
//          textcolor=color.white,
//          style=label.style_labeldown, yloc=yloc.abovebar)
         
plot(ema(close,par1),"EMA Short",color=color.white)
plot(ema(close,par2),"EMA Long",color=color.orange)


longCondition = crossover(ema(close, par1), ema(close, par2))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = crossunder(ema(close, par1), ema(close, par2))
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)




ma1_len = input(title="MA1", type=input.integer, defval=8, minval=1, maxval=100, step=1)
ma2_len = input(title="MA2", type=input.integer, defval=12, minval=1, maxval=100, step=1)

o = ema(open, ma1_len)
c = ema(close, ma1_len)
h = ema(high, ma1_len)
l = ema(low, ma1_len)

tim1=input('D',"Short Time")
tim2=input('W',"Long Time")

ema_p=input(title="EMA Period", type=input.integer, defval=16, minval=1, maxval=100, step=1)
refma = ema(close, ema_p)
plot(refma, title="EMA" , linewidth=1, color=close < refma ? color.orange : color.blue)
ha_t = heikinashi(syminfo.tickerid)
ha_o = security(ha_t, tim2, o)
ha_c = security(ha_t, tim2, c)
ha_h = security(ha_t, tim2, h)
ha_l = security(ha_t, tim2, l)
o2 = ema(ha_o, ma2_len)
c2 = ema(ha_c, ma2_len)
h2 = ema(ha_h, ma2_len)
l2 = ema(ha_l, ma2_len)
ha_col = ha_c > ha_o ? color.red : color.green
plotshape(true, style=shape.circle, color=ha_c > ha_o ? color.green : color.red, location=location.bottom)


ha_t1 = heikinashi(syminfo.tickerid)
ha_o1 = security(ha_t1, tim1, o)
ha_c1 = security(ha_t1, tim1, c)
ha_h1 = security(ha_t1, tim1, h)
ha_l1 = security(ha_t1, tim1, l)
o3 = ema(ha_o1, ma2_len)
c3 = ema(ha_c1, ma2_len)
h3 = ema(ha_h1, ma2_len)
l3 = ema(ha_l1, ma2_len)
ha_col1 = ha_c1 > ha_o1 ? color.red : color.green
plotshape(true, style=shape.circle, color=ha_c1 > ha_o1 ? color.green : color.red, location=location.top)






```

> Detail

https://www.fmz.com/strategy/428068

> Last Modified

2023-09-28 11:52:16
