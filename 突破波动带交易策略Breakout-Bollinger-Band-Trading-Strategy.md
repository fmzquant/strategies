
> Name

突破波动带交易策略Breakout-Bollinger-Band-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于布林带的突破原理,当价格完全突破上轨或下轨时,进行反向操作。它能捕捉异常波动后的回归均线运动,适用于追求高效盈利的活跃交易者。

## 原理

该策略利用布林带定义当前市场的波动范围。当价格形成完整的阳线柱或阴线柱,并完全突破布林带上轨或下轨时,表示市场达到高波动状态,价格将会反转回归均线方向。

具体来说,策略以20根K线的收盘价计算布林带的中轨、上轨和下轨。当价格低于下轨且收盘价低于开盘价时,产生做多信号。当价格高于上轨且收盘价高于开盘价时,产生做空信号。随后利用突破点作为止损位,中轨作为首目标价位平仓。

## 优势

该策略主要优势如下:

1. 利用布林带判断市场波动程度,有效识别异常状态。

2. 突破点作为止损位,可以有效控制风险。

3. 回归中轨设定合理目标位,避免过度追涨杀跌。

4. 完整K线过滤假突破,提高信号质量。

5. 简单参数设定,容易实施与优化。

6. 逻辑清晰易理解,代码简洁优雅。

## 风险

该策略也存在以下风险:

1. 布林带参数不当可能导致失效。

2. 突破可能是启动新趋势的开始,存在提前离场风险。

3. 中轨目标位可能过于保守,无法持续获利。

4. 大幅突破无法全部填满,存在滑点风险。

5. 震荡趋势中可能造成频繁不必要交易。

## 优化方向

该策略可考虑以下几点进行优化:

1. 评估趋势力度,调整参数或交易频率。

2. 结合其他指标确定最佳入场时点。

3. 根据波动程度调整止损幅度。

4. 优化首目标位设定,实现流畅获利。

5. 加入重新入场机制,优化盈利。

6. 评估突破可信度,避免误交易。

## 总结

该策略基于布林带突破原理,适合追求短期盈利的积极交易者。优点是风险控制清晰,缺点是可能提前离场和盈利空间受限。可通过参数优化、辅助指标等方法提升效果。

|| 

## Overview

This strategy trades breakouts of Bollinger Bands, taking counter trend positions when price fully pierces the upper or lower band. It aims to capture mean reversion after anomalous volatility. It suits active traders seeking quick profits.

## Principle

The strategy uses Bollinger Bands to define the current volatility range. When price forms a full candlestick above the upper band or below the lower band, it indicates an highly volatile state and potential reversal towards the mean.  

Specifically, the middle, upper and lower bands are calculated using 20-period closing prices. A long signal is generated when price closes below the lower band after opening higher. A short signal is triggered when price closes above the upper band after opening lower. The breakout point serves as the stop loss and the middle band is the initial profit target.

## Advantages

The main advantages are:

1. Bollinger Bands gauge market volatility effectively to identify anomalies.

2. The breakout point is a clear stop loss level to control risk.

3. The middle band offers a sensible target for mean reversion. 

4. Full candlesticks filter out false breaks with greater signal reliability.

5. Simple parameters make implementation and optimization easy.

6. Clean logic expressed concisely in the code.

## Risks

Some risks include:

1. Poor BB parameters may invalidate the strategy.

2. Breakouts could signal trend start, risks premature exit. 

3. Middle band targets may be too conservative, capping gains.

4. Wide breaks may not fully fill, causing slippage.

5. Whipsaws may induce excessive pointless trades in ranging markets.

## Enhancements

Some enhancement considerations:

1. Gauge trend strength to adjust settings or frequency.

2. Add other indicators to fine tune entry timing.

3. Adjust stop loss based on volatility.

4. Optimize initial targets for smooth profits.

5. Implement re-entry mechanisms to compound gains. 

6. Assess breakout validity to avoid bad trades.

## Conclusion

The strategy trades BB breakouts for short term profits suiting active traders. Pros are clear risk control while cons are early exits and profit capping. Fine tuning parameters, adding filters etc. can improve performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0915-1430|Buy Session|
|v_input_2|true|Exit Intraday?|
|v_input_3|3|Entry distance from alert|
|v_input_4|true|Show BB|
|v_input_5|20|BB Length|
|v_input_6|2|BB StdDev|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Bishnu103

//@version=4
strategy(title="Full Candle Outside BB [v1.0][Bishnu103]",shorttitle="OUTSIDE BB",overlay=true,calc_on_every_tick=true,backtest_fill_limits_assumption=2)

// ***********************************************************************************************************************
// input variables
buy_session         = input(title="Buy Session", type=input.session, defval="0915-1430")
exit_inraday        = input(title="Exit Intraday?", type=input.bool, defval=true)
entry_distance      = input(title="Entry distance from alert", minval=1, maxval=10, defval=3)
show_bb_switch      = input(title="Show BB", type=input.bool, defval=true)
//
bbLength            = input(title="BB Length", minval=1, defval=20)
bbStdDev            = input(title="BB StdDev", minval=1, defval=2)

// ***********************************************************************************************************************
// global variables
long_entry          = false
short_entry         = false
long_exit           = false
short_exit          = false

// variable values available across candles
var entry_price     = 0.0  
var sl_price        = 0.0
var exit_price      = 0.0
var candle_count    = 0

// ***********************************************************************************************************************
// function to return bollinger band values based on candle poition passed 
getBB(pos) => [mBB, uBB, lBB] = bb(close[pos], bbLength, bbStdDev)

// function returns true if current time is within intraday byuing session set in input
BarInSession(sess) => time(timeframe.period, sess) != 0

// ***********************************************************************************************************************
// strategy
//
// get current bb value
[mBB_0,uBB_0,lBB_0] = getBB(0)

// check if full candle outside upper BB
outside_uBB = low > uBB_0 and close <= open
outside_lBB = high < lBB_0 and close >= open

// ***********************************************************************************************************************
// entry conditions 
long_entry   := outside_lBB
short_entry  := outside_uBB

// keep candle count since the alert generated so that order can be cancelled after N number of candle calling it out as invalid alert
candle_count := candle_count + 1
if long_entry or short_entry
    candle_count    := 0

// ***********************************************************************************************************************
// risk management
//
// decide entry and sl price
if long_entry
    entry_price := high
    
if short_entry
    entry_price := low
    
if long_entry
    sl_price    := low
    
if short_entry
    sl_price    := high

// first exit is when price hits middle BB, gets updated for each candle based on it's middle BB value
exit_price  := mBB_0

// ***********************************************************************************************************************
// position sizing
price = if close[0] > 25000
    25000
else
    price = close[0]

qty = 25000/price

// ***********************************************************************************************************************
// entry
//if long_entry and strategy.position_size == 0
//    strategy.entry("BUY", strategy.long, qty, stop=entry_price, comment="BUY @ "+ tostring(entry_price)) 
if long_entry and strategy.position_size == 0
    strategy.order("BUY", strategy.long, qty, stop=entry_price, comment="BUY @ "+ tostring(entry_price))

//if short_entry and strategy.position_size == 0
//    strategy.entry("SELL", strategy.short, qty, stop=entry_price, comment="SELL @ "+ tostring(entry_price))
if short_entry and strategy.position_size == 0
    strategy.order("SELL", strategy.short, qty, stop=entry_price, comment="SELL @ "+ tostring(entry_price))

// cancel an order if N number of candles are completed after alert candle
strategy.cancel_all(candle_count > entry_distance)

// if current time is outside byuing session then do not enter intraday trade
strategy.cancel_all(timeframe.isintraday and not BarInSession(buy_session))

// ***********************************************************************************************************************
// exit
if strategy.position_size > 0
    strategy.cancel("EXIT at MBB", true)
    strategy.cancel("EXIT at SL", true)
    strategy.order("EXIT at MBB", strategy.short, abs(strategy.position_size), limit=exit_price, comment="EXIT TG @ "+ tostring(exit_price))
    strategy.order("EXIT at SL", strategy.short, abs(strategy.position_size), stop=sl_price, comment="EXIT SL @ "+ tostring(sl_price))

if strategy.position_size < 0
    strategy.cancel("EXIT at MBB", true)
    strategy.cancel("EXIT at SL", true)
    strategy.order("EXIT at MBB", strategy.long, abs(strategy.position_size), limit=exit_price, comment="EXIT TG @ "+ tostring(exit_price))
    strategy.order("EXIT at SL", strategy.long, abs(strategy.position_size), stop=sl_price, comment="EXIT SL @ "+ tostring(sl_price))

// if intraday trade, close the trade at open of 15:15 candle //!!!!!!!!!!!!!!!!!!!!! TO BE CORRECTED !!!!!!!!!!!!!!!!!!!!!!!
if timeframe.isintraday and exit_inraday and hour == 15 and minute == 00
    strategy.close("BUY",  when=strategy.position_size > 0, qty=strategy.position_size, comment="EXIT @ "+ tostring(close))
    strategy.close("SELL", when=strategy.position_size < 0, qty=strategy.position_size, comment="EXIT @ "+ tostring(close))

// ***********************************************************************************************************************
// plots    
//
// plot BB
[mBBp,uBBp,lBBp] = getBB(0)
p_mBB = plot(show_bb_switch ? mBBp : na, color=color.teal)
p_uBB = plot(show_bb_switch ? uBBp : na, color=color.teal)
p_lBB = plot(show_bb_switch ? lBBp : na, color=color.teal)
fill(p_uBB,p_lBB,color=color.teal,transp=95)
```

> Detail

https://www.fmz.com/strategy/428576

> Last Modified

2023-10-07 09:59:11
