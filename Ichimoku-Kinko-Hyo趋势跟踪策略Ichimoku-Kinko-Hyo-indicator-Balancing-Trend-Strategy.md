
> Name

Ichimoku-Kinko-Hyo趋势跟踪策略Ichimoku-Kinko-Hyo-indicator-Balancing-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17f6295720b6450caf5.png)
[trans]

## 概述

一目均衡策略是一个利用Ichimoku Kinko Hyo指标实现的趋势跟踪策略。该策略结合多种指标识别趋势方向,在牛市中做多,在熊市中做空,实现资金的长期增值。

## 策略原理

该策略主要基于Ichimoku Kinko Hyo指标。该指标由转向线(Tenkan-Sen)、基准线(Kijun-Sen)、前沿线(Senkou-Span A)、先行线(Senkou-Span B)和延迟线(Chikou-Span)组成。当价格在云图之上时为多头趋势,当价格在云图之下时为空头趋势。

该策略的交易信号来自以下条件的组合:

1. 转向线上穿基准线为多头信号
2. 转向线下穿基准线为空头信号  
3. 延迟线向上穿越为多头确认
4. 延迟线向下穿越为空头确认
5. RSI指标高于50为多头指标
6. RSI指标低于50为空头指标
7. 价格在云图之上为多头趋势
8. 价格在云图之下为空头趋势

当上述多头条件同时满足时,做多入场;当上述空头条件同时满足时,做空入场。

## 优势分析

该策略结合趋势跟踪和超买超卖指标,能够有效识别趋势的方向。主要优势如下:

1. Ichimoku Kinko Hyo指标能够识别中长期趋势,避免被短期市场噪音误导。
2. 结合RSI指标可以有效判断超买超卖区域,防止错过反转机会。
3. 考虑了股价波动率条件,只在波动率较高时出手,避免无效交易。
4. 严格的入场和出场机制,最大程度规避风险。

## 风险分析

该策略也存在一些风险需要注意:  

1. Ichimoku Kinko Hyo指标存在滞后,可能导致入场时机偏晚。
2. 多条件组合交易信号出现的频率较低,容易导致交易次数不足。
3. 未考虑资金管理和仓位管理,可能存在超量交易的风险。

对应解决方法:

1. 适当缩短Ichimoku Kinko Hyo参数,提高指标的灵敏度。
2. 降低入场条件严格度,增加交易频率。
3. 加入资金管理和仓位管理模块,控制单笔交易资金占比和仓位。

## 优化方向  

该策略可以从以下几个方向进行优化:

1. 更换或组合其他指标,如KDJ、MACD等,丰富信号来源。
2. 优化Ichimoku Kinko Hyo 参数,提高指标灵敏度。
3. 加入止损策略,以锁定利润和控制风险。
4. 增加仓位管理模块,根据资金规模动态调整仓位。
5. 增加期货套期保值模块,管理多头套期保值风险。

## 总结

一目均衡策略整体是一个可靠、稳健的趋势跟踪策略。它解决了趋势交易中的重要问题——识别趋势准确度和 trades 生成频率之间的平衡。通过参数调整和模块扩展仍有优化空间,是可以长期运用的策略之一。

|| 

## Overview  

The Balancing Trend strategy is a trend following strategy that utilizes the Ichimoku Kinko Hyo indicator. It identifies trend directions by combining multiple indicators, goes long in a bull market and goes short in a bear market, to achieve long-term capital appreciation.   

## Strategy Principle

The core of this strategy is based on the Ichimoku Kinko Hyo indicator, which consists of the Tenkan-Sen (Conversion Line), Kijun-Sen (Base Line), Senkou Span A (Leading Span A), Senkou Span B (Leading Span B) and Chikou Span (Lagging Span). When price is above the cloud, it signals an upward trend. When price is below the cloud, it signals a downward trend.

The trading signals are generated based on the combination of the following conditions:  

1. Tenkan-Sen crosses above Kijun-Sen as bullish signal
2. Tenkan-Sen crosses below Kijun-Sen as bearish signal
3. Chikou Span crossover upward as bullish confirmation  
4. Chikou Span crossover downward as bearish confirmation
5. RSI above 50 as bullish indicator 
6. RSI below 50 as bearish indicator
7. Price above the cloud indicates upward trend  
8. Price below the cloud indicates downward trend

It goes long when all bullish conditions are met and goes short when all bearish conditions are met.

## Advantage Analysis

This strategy combines trend following and overbought-oversold indicators to effectively identify trend directions. The main advantages are:

1. Ichimoku Kinko Hyo can identify medium- to long-term trends, avoiding being misled by short-term market noises.  
2. Incorporating RSI helps determine overbought and oversold zones, preventing missing reversal opportunities.  
3. Only acts when volatility is high enough, avoiding ineffective trades.  
4. Strict entry and exit rules maximally mitigate risks.

## Risk Analysis  

Some risks to note for this strategy:

1. Ichimoku Kinko Hyo has lagging effect, possibly delaying entry timing.  
2. Low frequency of trade signal occurrence with multiple condition combination, leading to insufficient number of trades.   
3. No consideration around position sizing and risk management, risks around over-trading.

Corresponding solutions:

1. Shorten Ichimoku parameters to improve sensitivity. 
2. Reduce strictness of entry conditions to increase trade frequency.  
3. Incorporate risk management and position sizing modules to control per trade risk exposure and overall position.  

## Optimization Directions

The strategy can be improved in the following aspects:  

1. Add or combine additional indicators like KDJ, MACD to diversify signal sources.  
2. Optimize Ichimoku parameters to improve sensitivity. 
3. Add stop loss mechanisms to lock in profits and control risks.
4. Incorporate dynamic position sizing module based on account size.    
5. Add hedging module to manage risks for long positions.   

## Summary

Overall this Balancing Trend strategy is a reliable, robust trend following system. It addresses the key challenge in trend trading - balancing trend identification accuracy and trade generation frequency. There is still room for improvement through parameter tuning and module expansion. It is a strategy that can be applied for the long run.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|22|Tenkan-Sen Bars|
|v_input_2|60|Kijun-Sen Bars|
|v_input_3|120|Senkou-Span B Bars|
|v_input_4|30|Chikou-Span Offset|
|v_input_5|30|Senkou-Span Offset|
|v_input_6|true|Long Entry|
|v_input_7|true|Short Entry|
|v_input_8|2|VolLength|
|v_input_9|0.2|Volatility Target|
|v_input_10|true|From Day|
|v_input_11|true|From Month|
|v_input_12|2019|From Year|
|v_input_13|31|To Day|
|v_input_14|12|To Month|
|v_input_15|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-16 00:00:00
end: 2023-11-20 08:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Ichimoku Kinko Hyo: ETH 3h Strategy by tobuno", overlay=true)

//Inputs
ts_bars = input(22, minval=1, title="Tenkan-Sen Bars")
ks_bars = input(60, minval=1, title="Kijun-Sen Bars")
ssb_bars = input(120, minval=1, title="Senkou-Span B Bars")
cs_offset = input(30, minval=1, title="Chikou-Span Offset")
ss_offset = input(30, minval=1, title="Senkou-Span Offset")
long_entry = input(true, title="Long Entry")
short_entry = input(true, title="Short Entry")

//Volatility
vollength = input(defval=2, title="VolLength")
voltarget = input(defval=0.2, type=float, step=0.1, title="Volatility Target")
Difference = abs((close - open)/((close + open)/2) * 100)
MovingAverage = sma(Difference, vollength)
highvolatility = MovingAverage > voltarget

////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2019, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2020, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true
 
////////////////////////////////////////////////////////////////////////////////

middle(len) => avg(lowest(len), highest(len))

// Ichimoku Components
tenkan = middle(ts_bars)
kijun = middle(ks_bars)
senkouA = avg(tenkan, kijun)
senkouB = middle(ssb_bars)

//RSI
change = change(close)
gain = change >= 0 ? change : 0.0
loss = change < 0 ? (-1) * change : 0.0
avgGain = rma(gain, 14)
avgLoss = rma(loss, 14)
rs = avgGain / avgLoss
rsi = 100 - (100 / (1 + rs))

// Plot Ichimoku Kinko Hyo
plot(tenkan, color=#0496ff, title="Tenkan-Sen")
plot(kijun, color=#991515, title="Kijun-Sen")
plot(close, offset=-cs_offset+1, color=#459915, title="Chikou-Span")
sa=plot(senkouA, offset=ss_offset-1, color=green, title="Senkou-Span A")
sb=plot(senkouB, offset=ss_offset-1, color=red, title="Senkou-Span B")
fill(sa, sb, color = senkouA > senkouB ? green : red, title="Cloud color")

ss_high = max(senkouA[ss_offset-1], senkouB[ss_offset-1])
ss_low = min(senkouA[ss_offset-1], senkouB[ss_offset-1])

// Entry/Exit Signals
tk_cross_bull = tenkan > kijun
tk_cross_bear = tenkan < kijun
cs_cross_bull = mom(close, cs_offset-1) > 0
cs_cross_bear = mom(close, cs_offset-1) < 0
price_above_kumo = close > ss_high
price_below_kumo = close < ss_low
rsi_bullish = rsi > 50
rsi_bearish = rs < 50
bullish = tk_cross_bull and cs_cross_bull and price_above_kumo and rsi_bullish and highvolatility
bearish = tk_cross_bear and cs_cross_bear and price_below_kumo and rsi_bearish and highvolatility

strategy.entry("Long", strategy.long, when=bullish and long_entry and time_cond)
strategy.entry("Short", strategy.short, when=bearish and short_entry and time_cond)

strategy.close("Long", when=bearish and not short_entry and time_cond)
strategy.close("Short", when=bullish and not long_entry and time_cond)

```

> Detail

https://www.fmz.com/strategy/433104

> Last Modified

2023-11-24 14:38:47
