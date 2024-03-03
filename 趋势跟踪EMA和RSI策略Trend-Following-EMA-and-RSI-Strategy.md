
> Name

趋势跟踪EMA和RSI策略Trend-Following-EMA-and-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略充分利用了移动平均线和相对强弱指标的优势,实现了对趋势的识别和跟踪。它只需要两个指标就可以实现对趋势的判断和 entries/exits 的时间点选择。该策略旨在抓住中长线的价格趋势,而避免被短期市场噪音所误导。

## 策略原理

该策略使用三条不同周期的EMA均线,EMA-A周期最短,EMA-B次之,EMA-C最长。当短周期EMA-A上穿较长周期的EMA-B时,说明价格处于上升趋势中,这时可以做多;反之,当EMA-A下穿EMA-B时,说明价格转为下跌趋势,这时可以做空。为过滤误信号,它还引入了最长周期的EMA-C,只有当价格突破EMA-C时才考虑 entry。 

该策略还结合RSI指标来定位 exit 时间点。当多头持仓时,如果RSI上穿70线则平仓;当空头持仓时,如果RSI下砿30线则平仓。这可以锁定趋势利润,并防止亏损进一步扩大。

## 优势分析

- 利用EMA的优势识别趋势方向
- RSI指标辅助确定入场和出场点
- 只需要2个指标,策略简单易行
- 可配置指标参数自由调整策略风格
- 可在趋势初、中、后期获利

## 风险分析

- 大趋势下的反弹可能产生虚假信号
- 震荡行情中容易停损
- RSI参数设置不当可能过早止损
- EMA周期设置需要谨慎,过短则敏感噪音,过长则错过趋势

可通过优化RSI参数,或添加附加过滤条件来减小这些风险。也可以结合趋势、支撑阻力等技术分析方法来提高策略表现。

## 优化方向

- 优化RSI的参数,平衡止盈止损
- 测试不同的EMA周期组合
- 增加量能或其他指标的确认
- 止损方式可以按ATR设置止损幅度
- 可尝试在趋势中段降低仓位
- 优化入场时机,如破前高/低点,或吸收量能
- 可考虑加入重新入场机制

## 总结

该策略整合趋势跟踪和超买超卖指标,只需要简单的两个指标即可实现对趋势的判断和捕捉。通过参数优化和规则优化,可以在保持简单的同时大幅提高效果。它是一个非常实用的趋势跟踪策略模板,适用于中长线投资者。

||

## Overview

This strategy takes full advantage of moving averages and relative strength index to identify and follow trends. It only needs two indicators to determine the trend and find proper entry/exit timing. The strategy aims to capture medium-to-long term price trends while avoiding short-term market noise.

## Strategy Logic

The strategy uses three EMAs with different periods, with EMA-A having the shortest period, EMA-B medium, and EMA-C the longest. When the shorter EMA-A crosses above the longer EMA-B, it signals an upward trend, thus going long. Conversely, when EMA-A crosses below EMA-B, it signals a downward trend, thus going short. To filter false signals, it also uses the longest EMA-C - only considering entry after the price breaks EMA-C.

The strategy also uses RSI to locate exit points. When long, it closes the position if RSI crosses above 70. When short, it exits if RSI falls below 30. This locks in trend profits and prevents losses from expanding further.

## Advantage Analysis 

- Utilizes EMA's strength in trend identification
- RSI assists in entry and exit timing
- Simple strategy with only 2 indicators  
- Customizable parameters to adjust strategy style
- Profits from early, mid and late trend stages

## Risk Analysis

- Pullbacks in major trends may generate false signals
- Vulnerable to whipsaws in ranging markets
- Improper RSI parameters may cause premature exits 
- EMA periods need careful selection, too short may be noise sensitive, too long may miss trends

These risks can be reduced by optimizing RSI parameters, adding filters, and combining with trend analysis. 

## Optimization Directions

- Optimize RSI parameters for better profit taking and risk control
- Test different EMA period combinations
- Add volume or other confirmation indicators  
- Use ATR for stop loss sizing  
- Consider reducing position size mid-trend
- Optimize entry timing with breakouts, volume, etc
- Explore re-entry mechanisms

## Summary

This strategy combines trend following and oscillator indicators for trend identification and capturing. With simple parameter and logic optimization, it can be greatly improved while keeping simplicity. It is a very practical trend following template suitable for medium-to-long term investors.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_5|24|# bars|
|v_input_int_1|14|(?RSI)Length|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|10|(?Moving Averages)EMA A Length|
|v_input_int_3|20|EMA B Length|
|v_input_int_4|100|EMA C Length|
|v_input_bool_1|true|(?Strategy)Long entries|
|v_input_bool_2|false|Short entries|
|v_input_bool_3|true|Close after X # bars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-25 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
//@author Alorse

//@version=5
// strategy(title='Tendency EMA + RSI [Alorse]', shorttitle='Tendece EMA + RSI [Alorse]', overlay=true, pyramiding=0, currency=currency.USD, default_qty_type=strategy.percent_of_equity, initial_capital=1000, default_qty_value=20, commission_type=strategy.commission.percent, commission_value=0.01)

// Bollinger Bands
len = input.int(14, minval=1, title='Length', group='RSI')
src = input.source(close, 'Source', group='RSI')
rsi = ta.rsi(src, len)

// Moving Averages
len_a = input.int(10, minval=1, title='EMA A Length', group='Moving Averages')
out_a = ta.ema(close, len_a)
plot(out_a, title='EMA A', color=color.purple)

len_b = input.int(20, minval=1, title='EMA B Length', group='Moving Averages')
out_b = ta.ema(close, len_b)
plot(out_b, title='EMA B', color=color.orange)

len_c = input.int(100, minval=1, title='EMA C Length', group='Moving Averages')
out_c = ta.ema(close, len_c)
plot(out_c, title='EMA B', color=color.green)

// Strategy Conditions
stratGroup = 'Strategy'
showLong = input.bool(true, title='Long entries', group=stratGroup)
showShort = input.bool(false, title='Short entries', group=stratGroup)
closeAfterXBars = input.bool(true, title='Close after X # bars', tooltip='If trade is in profit', group=stratGroup)
xBars = input.int(24, title='# bars')

entryLong = ta.crossover(out_a, out_b) and out_a > out_c and close > open
exitLong = rsi > 70

entryShort = ta.crossunder(out_a, out_b) and out_a < out_c and close < open
exitShort = rsi < 30


bought = strategy.opentrades[0] == 1 and strategy.position_size[0] > strategy.position_size[1]
entry_price = ta.valuewhen(bought, open, 0)
var int nPastBars = 0
if strategy.position_size > 0
    nPastBars := nPastBars + 1
    nPastBars
if strategy.position_size == 0
    nPastBars := 0
    nPastBars
if closeAfterXBars
    exitLong := nPastBars >= xBars and close > entry_price ? true : exitLong
    exitLong
    exitShort := nPastBars >= xBars and close < entry_price ? true : exitShort
    exitShort

// Long Entry
strategy.entry('Long', strategy.long, when=entryLong and showLong)
strategy.close('Long', when=exitLong)

// Short Entry
strategy.entry('Short', strategy.short, when=entryShort and showShort)
strategy.close('Short', when=exitShort)


```

> Detail

https://www.fmz.com/strategy/427881

> Last Modified

2023-09-26 15:39:48
