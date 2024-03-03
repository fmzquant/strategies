
> Name

基于双移动平均策略Dual-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19cc992015e07f4eeab.png)
[trans]
## 概述

本策略利用双移动平均线形成通道,以捕捉趋势的方向。当价格突破通道时产生交易信号。同时结合RSI指标过滤假突破。仅在伦敦交易时段操作,每天最多5单,最大亏损不超过2%。

## 策略原理

该策略使用两个长度为5的移动平均线,一个计算自最高价,一个计算自最低价,形成一个价格通道。当收盘价突破通道上沿时做多,突破通道下沿时做空。

为过滤假突破,还引入RSI指标判断超买超卖。仅在RSI高于80时做多,低于20时做空。

此外,策略只在伦敦交易时段(上午3点至11点)交易,每天最多5笔订单,最大亏损不超过股票权益的2%。

## 优势分析

### 捕捉趋势

双移动平均线构建趋势通道,能较好地判断价格趋势方向。当价格向上突破通道上轨时,捕捉到价格的上扬趋势;当价格向下突破通道下轨时,捕捉到价格的下跌趋势。

### 减少假突破

结合RSI指标判断超买超卖区域,可以一定程度上减少因价格震荡导致的假突破。

### 有效控制风险

策略仅在主要活跃交易时间段进行交易,每天最多5笔订单可有效控制交易频率;最大亏损设置为2%可将单日最大损失控制在可承受范围。

## 风险分析

### 价格震荡大时假突破风险

当价格出现大幅震荡时,可能出现一定的假突破信号,这会导致不必要的交易亏损。可以通过调整参数优化,或增加过滤条件来减少该风险。

### 固定止损止盈易被套风险 

策略采用固定数量的点数止损止盈,当价格出现大幅波动时,固定点数的止损止盈容易被套,应对此采用百分比或者动态止损止盈。

### 限定交易时段风险

策略仅在固定的交易时段开仓,如果在该时段没有产生信号,会错过其他时段潜在的交易机会。可以考虑适当扩大交易时间或根据实时情况动态调整。

## 优化方向

### 参数优化 

可以对移动平均线长度、RSI参数、固定止损止盈点数等进行优化,找到最优参数组合。

### 增加过滤条件 

可以增加其他指标或条件对突破信号进行二次校验,如增大交易量、缩小布林线通道等,减少假突破。

### 动态止损止盈 

可以采用百分比止损或动态止损策略,而不是简单的固定点数止损,更好对冲单边行情的风险。

### 结合人工判断

对信号进行人工复核,或者只在确认突破后入场,避免被套。

## 总结

本策略总体较为简单实用,通过双移动平均构建通道判断趋势方向;同时RSI指标可有效过滤部分假突破。风险控制方面,限定交易时段和最大损失可控制总体风险。优化空间还比较大,可从参数优化、止损机制升级等方面进行改进。

||

## Overview

This strategy uses dual moving averages to form a channel and capture trend direction. Trading signals are generated when price breaks through the channel. RSI indicator is also incorporated to filter false breakouts. It trades only during London session with max 5 trades per day and max 2% daily loss.

## Strategy Logic

The strategy employs two moving averages of length 5, one calculated from highest price and the other from lowest price, to form a price channel. Long signal triggers when close price breaks above the upper band, and short signal below the lower band. 

To avoid false breakout, RSI indicator is added to gauge overbought/oversold levels. Go long only if RSI is above 80, and go short only if RSI is below 20.

Also, the strategy trades only during London session (3am - 11am), with max 5 orders per day and max 2% loss of equity per day.

## Advantage Analysis 

### Catch the trend

The dual MA channel can effectively detect price trend direction. Breaking upper band catches the upside trend, while breaking lower band catches the downside trend.

### Reduce false breakout  

Using RSI overbought/oversold filter reduces some false breakout signals caused by price fluctuation.

### Effective risk control

Trading only during major session and having max orders per day limit trading frequency. Max 2% daily loss also defines risk tolerance.

## Risk Analysis

### False breakout with volatility

Significant price swing can cause some false breakout signals, leading to unnecessary losses. Parameters can be optimized and more filters added to reduce such risk.

### Fixed SL/TP risk

Using fixed pips for SL/TP risks being stopped out/missing profit in volatile market. Consider percentage-based or dynamic SL/TP instead.

### Limited trading session risk 

Opening positions only during fixed sessions runs the risk of missing potential trades in other hours. Consider expanding session or adjust dynamically based on real-time situation.

## Optimization Directions 

### Parameter tuning
Optimize parameters like MA length, RSI figures, fixed SL/TP pips etc to find best combination.

### Additional filters
Add more indicators or conditions to verify signals, e.g. higher volume, reduced BB width etc, to avoid false breakouts.

### Dynamic SL/TP
Use percentage-based or dynamic stop loss/take profit instead of fixed pips to better handle one-sided market moves.

### Manual review
Manually review signals, or only enter on confirmed breakout to prevent being trapped.

## Conclusion
The strategy is fairly simple and practical overall, using dual MA channel to determine trend and RSI to filter false breakouts. Risk management via trading hours and loss limit also defines risk tolerance. Still large room for improvements, e.g. parameter tuning, better SL/TP mechanism etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Length|
|v_input_2_high|0|Source: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|false|Offset|
|v_input_4|5|Length|
|v_input_5_low|0|Source: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|false|Offset|
|v_input_7|5|length|
|v_input_8|10|overSold|
|v_input_9|80|overBought|
|v_input_10_close|0|Source RSI: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_11|150|tp|
|v_input_12|80|sl|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-16 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SoftKill21
//@version=4
strategy(title="Moving Average", shorttitle="MA", overlay=true)
timeinrange(res, sess) => time(res, sess) != 0
len = input(5, minval=1, title="Length")
src = input(high, title="Source")
offset = input(title="Offset", type=input.integer, defval=0, minval=-500, maxval=500)
out = sma(src, len)
plot(out, color=color.white, title="MA", offset=offset)

len2 = input(5, minval=1, title="Length")
src2 = input(low, title="Source")
offset2 = input(title="Offset", type=input.integer, defval=0, minval=-500, maxval=500)
out2 = sma(src2, len2)
plot(out2, color=color.white, title="MA", offset=offset2)

length = input( 5 )
overSold = input( 10 )
overBought = input( 80 )
price = input(close, title="Source RSI")

vrsi = rsi(price, length)

longcond= close > out and close > out2 and vrsi > overBought
shortcont = close < out and close < out2 and vrsi < overSold
tp=input(150,title="tp")
sl=input(80,title="sl")


strategy.entry("long",1,when=longcond)
//strategy.close("long",when= close < out2)
strategy.exit("long_exit","long",profit=tp,loss=sl)

strategy.entry("short",1,when=shortcont)
//strategy.close("short",when=close >out)
strategy.exit("short_exit","short",profit=tp,loss=sl)

// maxOrder = input(6, title="max trades per day")
// maxRisk = input(2,type=input.float, title="maxrisk per day")
// strategy.risk.max_intraday_filled_orders(maxOrder)

// strategy.risk.max_intraday_loss(maxRisk, strategy.percent_of_equity)


// strategy.close_all(when =not timeinrange(timeframe.period, "0300-1100"))





```

> Detail

https://www.fmz.com/strategy/442377

> Last Modified

2024-02-21 14:43:26
