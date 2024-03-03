
> Name

捕捉小趋势的高低均线交叉策略HLHB-Trend-Catcher-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略旨在捕捉短期外汇趋势,运用 EMA 交叉和 RSI 作为交易信号,并结合 ADX 过滤器来进场,采取趋势跟踪止损方式来锁定利润。该策略适用于所有货币对,但主要应用于主要货币对的1小时图表。

## 策略原理

该策略基于以下指标和条件建立交易信号:

- 5周期快速EMA: 蓝线
- 10周期慢速EMA: 红线  
- 应用于收盘价中价(最高价+最低价/2)的10周期RSI
- 14周期ADX

交易入场信号:
- 多头:当快速EMA从下方上穿慢速EMA,并且RSI线从低点向上突破50时做多
- 空头:当快速EMA从上方下穿慢速EMA,并且RSI线从高点向下突破50时做空
- ADX > 25时才能做多做空

退出信号:
- 移动止损,跟踪止损距离为150点,止赢距离为400点
- 新的信号出现时平仓
- 每周五晚上全部平仓

该策略集中使用了均线交叉、RSI超买超卖以及ADX趋势判断指标,形成比较严格的入场机制,在趋势生成后能够顺势而为,跟踪止损来锁定利润,从而有效捕捉短期趋势。

## 优势分析

该策略具有以下优势:

1. 使用EMA快慢线交叉作为基础的趋势判断,快线向上交叉慢线表明进入看涨趋势,向下交叉则看跌,可以识别趋势的变化。

2. 加入RSI指标判断能过滤掉部分假突破信号,RSI超买超卖区域看作是短期调整信号,避免在震荡市场无谓进场。 

3. ADX指标用于判断真正趋势的存在,可有效过滤掉部分噪音。当ADX值大于25时才考虑交易信号,从而保证存在明确趋势。

4. 采取移动止损和止盈方式,让利润最大化,止损保证风险可控,跟踪止损距离为150点,止盈距离为400点,可以持续跟踪趋势运行。

5. 每周五收市前全部平仓,避免周末的各种风险,保持操作的规律性。

## 风险分析

该策略也存在以下风险:

1. EMA均线交叉策略容易产生假突破信号,virtualization可能带来亏损。可以适当调整均线参数,或加入其他指标进行过滤。

2. RSI指标只能判断超买超卖状态,不能确认趋势反转,visualization可能错过趋势或反向入场。可以考虑与其它指标组合使用或调整参数。

3. ADX指标仅判断趋势存在与否,入场时机可能不准确,可以考虑加入其它判据或降低ADX过滤条件。 

4. 止损止盈设置可能过于固定,无法适应市场变化,可以测试不同参数或及时人工干预调整。

5. 每周强制平仓可能错过好的趋势运行机会,可以考虑调整为每日收市或后期修改为条件平仓。

## 优化方向

该策略还可以从以下几个方向进行优化:

1. 测试不同均线参数组合,寻找最佳均线长度。可以引入均线斜度判定。

2. 尝试不同的RSI参数或与KDJ指标组合,进一步优化超买超卖的判断。

3. 优化ADX参数,找到更合适的ADX过滤条件,提高入场质量。

4. 测试移动止损止盈的固定点数与ATR动态跟踪止损的组合使用。

5. 引入日内突破回调策略,在趋势确认后进场,可考虑5分钟或15分钟图表。

6. 增加基于波动率的仓位管理模块,根据市场波动情况动态调整仓位。

7. 尝试机器学习技术自动优化参数,实现策略的自适应性。

## 总结

本策略整体来说是一个非常简单直接的趋势跟踪策略,利用均线交叉判断趋势方向,RSI过滤假突破,ADX判断趋势存在,止盈止损来持续跟踪趋势,在短期内捕捉利润。策略优化方向主要在寻找更好的指标组合,实现趋势判断的灵活性,以及引入动态仓位管理。通过代码逻辑分析,该策略具有一定的可行性,但需要进一步测试与优化才能实际应用。

|| 

## Overview 

The strategy aims to catch short-term forex trends by using EMA crossover and RSI as trading signals, with ADX filter to enter trades, and trailing stop loss to lock in profits. The strategy can be applied to all currency pairs, but is mainly used on 1-hour charts of major pairs.

## Strategy Logic

The strategy is based on the following indicators and conditions to generate trading signals:

- 5-period fast EMA: blue line  
- 10-period slow EMA: red line
- 10-period RSI applied to median price (H+L)/2
- 14-period ADX

Entry signals:
- Long: when fast EMA crosses above slow EMA from below and RSI crosses above 50 from bottom
- Short: when fast EMA crosses below slow EMA from top and RSI crosses below 50 from top
- Only take signals when ADX > 25

Exit signals:  
- Use trailing stop loss, 150 pips trail distance and 400 pips take profit
- Close trade when new signal occurs
- Close all trades before end of week

The strategy combines EMA crossover, RSI overbought/oversold and ADX trend strength to create solid entry rules. It rides the trend after formation and uses trailing stop to maximize profits and control risk. Overall it aims to effectively catch short-term trends.

## Advantage Analysis

The strategy has the following advantages:

1. EMA crossover for trend direction. Upward cross suggests uptrend while downward cross downtrend. Can identify trend changes.

2. Adding RSI filters out some false breakout signals. Oversold/overbought zones indicate short-term pullbacks and avoid unnecessary entries in range markets.

3. ADX for ensuring true trend existence. Only consider trading signals when ADX > 25, guaranteeing a solid trend. 

4. Trailing stop loss and take profit let profits run while controlling risk. 150 pips trail distance and 400 pips profit target continuously ride the trend.

5. Closing all positions before week end avoids weekend risks and enforces trading regularity.

## Risk Analysis

The strategy also has the following risks:

1. EMA crossover systems prone to false breakout signals, leading to losses. Fine tune EMA lengths or add other filters.

2. RSI only identifies overbought/oversold levels, not trend reversals. Could miss trends or reverse. Combine with other indicators.

3. ADX just judges trend existence, entry timing may be off. Add other rules or lower ADX threshold.

4. Fixed stop loss and take profit levels may not adapt to market changes. Test different parameters or manual intervention. 

5. Forced weekly close could miss good trend opportunities. Consider daily close or conditional exits.

## Optimization Directions 

The strategy can be optimized in the following aspects:

1. Test different EMA combinations to find optimal lengths. Consider slope for added trend strength.

2. Try different RSI parameters or combine with KDJ for better overbought/oversold judgment.

3. Optimize ADX parameters for more suitable filtering and higher entry quality.

4. Test combination of fixed stops and ATR-based dynamic trailing.

5. Add intraday breakout pullback entries after trend confirmation, such as lower timeframes. 

6. Introduce volatility-based position sizing for dynamic adjustment based on market volatility.

7. Explore machine learning techniques to auto-optimize parameters for adaptability.

## Summary

In summary this is a simple trend following strategy, identifying trend direction with EMA crossover, filtering with RSI, requiring trend with ADX, and trailing stop for profit. Optimization mainly involves finding better indicator combos for flexibility, and adding dynamic position sizing. The logic has merit but still requires further testing and optimization for practical application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Fast EMA Length|
|v_input_2|10|Slow EMA Length|
|v_input_3|10|Slow EMA Length|
|v_input_4|16|Weekly Session End (Hour)|
|v_input_5|false|Weekly Session End (Minute)|
|v_input_6|400|Profit Target (Pips/Points)|
|v_input_7|150|Trailing Stop Distance (Pips/Points)|
|v_input_8|true|User ADX Filter|
|v_input_9|25|Minimum ADX Level|
|v_input_10|14|ADX Smoothing|
|v_input_11|14|DI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Hucklekiwi Pip - HLHB Trend-Catcher System", shorttitle="HLHB TCS", overlay=true,
  default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// -----------------------------------------------------------------------------
// HLHB Trend-Catcher System as described on BabyPips.com
//
// Strategy Author: Hucklekiwi Pip 
// Coded By: Backtest Rookies
// -----------------------------------------------------------------------------
//
// Refs:
//   - Original System: https://www.babypips.com/trading/forex-hlhb-system-explained
//   - Updated System: https://www.babypips.com/trading/forex-hlhb-system-20190311
//
//
// Description (From Hucklekiwi Pip)
// 
//   The HLHB System simply aims to catch short-term forex trends.
//   It is patterned after the Amazing Crossover System that Robopip once backtested.
//   In fact, it was one of his highest-scoring mechanical systems in 2014! 
//   The system can be applied to any pair, but since I’m into major pairs, 
//   I’m applying it to the 1-hour charts of EUR/USD and GBP/USD.
// -----------------------------------------------------------------------------
// STRATEGY REQUIREMENTS
// -----------------------------------------------------------------------------
//
// Setup
// -----
//  - EUR/USD 1-hour chart
//  - GBP/USD 1-hour chart
//  - 5 EMA: blue line
//  - 10 EMA: red line
//  - RSI (10) applied to the median price (HL/2)
//  - ADX (14)
//
// Entry
// -----
//  - BUY when the 5 EMA crosses above the 10 EMA from underneath and the RSI 
//    crosses above the 50.0 mark from the bottom.
//  - SELL when the 5 EMA crosses below the 10 EMA from the top and the RSI 
//    crosses below the 50.0 mark from the top.
//  - Make sure that the RSI did cross 50.0 from the top or bottom and not just 
//    ranging tightly around the level.
//  - ADX > 25 for Buy and Sells
//
// Exit
// ----
//  - Use a 50-pip trailing stop and a 200-pip profit target. This increases the 
//    chances of the system riding longer trends.
//  - Close the trade when a new signal materializes.
//  - Close all trades by the end of the week.
// 
// -----------------------------------------------------------------------------

// Strategy Varaibles
// -------------------
ema_fast_len = input(5, title='Fast EMA Length')
ema_slow_len = input(10 , title='Slow EMA Length')
rsi_len = input(10, title='Slow EMA Length')
session_end_hour = input(16, minval=0, maxval=23, title='Weekly Session End (Hour)')
session_end_minute = input(0, minval=0, maxval=59, title='Weekly Session End (Minute)')
// Targets taken from the update post which states 150 & 400 instead of 50 and 200.
profit_target = input(400, title='Profit Target (Pips/Points)')
trailing_stop_dist = input(150, title='Trailing Stop Distance (Pips/Points)')
adx_filt = input(true, title='User ADX Filter')
adx_min = input(25, minval=0, title='Minimum ADX Level')
adx_len = input(14, title="ADX Smoothing")
di_len = input(14, title="DI Length")

// Setup the Indicators
ema_fast = ema(close, ema_fast_len)
ema_slow = ema(close, ema_slow_len)
rsi_ind = rsi(close, rsi_len)

// ADX
adx_dirmov(len) =>
	up = change(high)
	down = -change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
    minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(plusDM, len) / truerange)
	minus = fixnan(100 * rma(minusDM, len) / truerange)
	[plus, minus]

adx_adx(dilen, adxlen) =>
	[plus, minus] = adx_dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
	[adx, plus, minus]

[adx_sig, adx_plus, adx_minus] = adx_adx(di_len, adx_len)


// Strategy Logic
ema_long_cross = crossover(ema_fast, ema_slow)
ema_short_cross = crossunder(ema_fast, ema_slow)
rsi_long_cross = crossover(rsi_ind, 50)
rsi_short_cross = crossunder(rsi_ind, 50)
adx_check = adx_filt ? adx_sig >= adx_min : true

longCondition = ema_long_cross and rsi_long_cross and adx_check
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = ema_short_cross and rsi_short_cross and adx_check
if (shortCondition)
    strategy.entry("Short", strategy.short)

strategy.exit("SL/TP", "Long", profit=profit_target,  loss=trailing_stop_dist, trail_points=trailing_stop_dist)  
strategy.exit("SL/TP", "Short", profit=profit_target, loss=trailing_stop_dist, trail_points=trailing_stop_dist)  

// Friday = 6
// If we miss the hour for some reason (due to strange timeframe), then close immediately
// Else if we are on the closing hour, then check to see if we are on or passed the close minute
close_time = dayofweek == 6 ? 
  hour[0] > session_end_hour ? true :
  hour[0] == session_end_hour ?
      minute[0] >= session_end_minute :
  false : false

strategy.close_all(when=close_time)

// Plotting
plot(ema_fast, color=blue, title="Fast EMA")
plot(ema_slow, color=red, title="Slow EMA")

plotshape(rsi_long_cross, style=shape.triangleup, size=size.tiny, location=location.belowbar, color=green, title='RSI Long Cross Marker')
plotshape(rsi_short_cross, style=shape.triangledown, size=size.tiny, location=location.abovebar, color=red, title='RSI Short Cross Marker')

// ADX Filter Highlight
bgcolor(adx_filt and adx_check ? orange : na, transp=90)
```

> Detail

https://www.fmz.com/strategy/428067

> Last Modified

2023-09-28 11:44:04
