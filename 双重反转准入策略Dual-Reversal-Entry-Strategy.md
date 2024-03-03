
> Name

双重反转准入策略Dual-Reversal-Entry-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a300368650d7c5997b.png)

[trans]


## 概述

双重反转准入策略通过组合使用MACD和Stochastic RSI两个指标的反转信号,在趋势反转点位准确做多做空,属于反转类交易策略。

## 策略原理

该策略由以下部分组成:

1. 使用MACD指标的差离线突破0轴判断趋势反转。

2. 使用Stochastic RSI指标判断是否超买超卖。Stochastic RSI指标结合RSI指标的超买超卖原理,当Stochastic RSI above 70为超买,below 30为超卖。

3. 当差离线上穿0轴(代表着多头反转信号)和Stochastic RSI指标显示超卖时,产生买入信号;当差离线下穿0轴(代表着空头反转信号)和Stochastic RSI指标显示超买时,产生卖出信号。

4. 该策略同时具有指标绘制和交易执行两个模式。在指标模式下,用三角形标记反转信号。在策略模式下,在反转信号出现时开仓做多做空。

通过组合MACD的反转信号和Stochastic RSI的超买超卖信号,能够提高做多做空的准确性,在趋势反转点位把握较好的入场时机。

## 策略优势

- 组合双重指标过滤,提高做多做空准确性

双重反转准入策略通过MACD和Stochastic RSI两个指标的组合使用,进行了双重的过滤,确保在趋势反转之后才产生交易信号,从而提高了做多做空的准确性,降低了错误信号的概率。

- 反转交易,适合熊市行情

该策略属于反转类策略,主要在趋势反转点位打开仓位。这种反转策略适合熊市中频繁上涨下跌的震荡行情,能够在每个小级别走势反转的时候获利。

- 无需判断趋势方向,适合新手

双重反转准入策略不需要预先判断大趋势的方向,而是在本地反转的时候直接做单,简单易用,适合新手学习使用。

- 可灵活选择策略模式或指标模式

该策略可以通过一个开关灵活选择策略模式或指标模式,使用更灵活。指标模式可以用于观察分析,策略模式可以自动执行交易。

## 策略风险

- 反转类策略,风险较高

反转交易由于不考虑大趋势方向,在大上涨和大下跌行情中交易风险较大,连续反向开仓亏损的概率较高。需要组合趋势交易策略来降低风险。

- 双指标组合,参数优化难度较大

由于该策略使用了两个指标和多个参数,参数组合优化难度较大,不适当的参数组合可能会导致交易频繁或信号不足。需要充分反复测试优化。

- 需要高频交易账户

双重反转准入策略属于高频交易策略,需要高手续费、低点差的交易账户作为支持,否则交易费用可能会抵消大部分盈利。

## 策略优化方向 

- 优化指标参数组合

可以尝试不同的参数组合,寻找最佳的MACD和Stochastic RSI参数,使交易信号更准确。例如可以优化MACD的快慢均线周期、Stochastic的lookback period等。

- 结合趋势过滤

可以在策略中加入趋势指标,仅在趋势方向一致时才考虑反转信号,避免逆势交易。例如结合MA指标判断长期趋势。

- 增加止损机制

可以设置移动止损或者百分比止损来控制单笔损失。也可以考虑反向加仓来优化资金使用效率。

- 优化入场条件

除了反转信号,可以加强其他入场条件,例如交易量放大,突破某均线等,来减少入场误报率。

## 总结

双重反转准入策略通过双指标组合判断本地反转点位开仓做单的思路新颖可靠,适合熊市频繁震荡的行情环境,也适合新手反复回测实践。但该策略有较高风险,需要充分测试优化参数,并辅以趋势判断和风险控制机制,才能在实盘中稳定获利。

||

## Overview

The Dual Reversal Entry strategy generates entries by combining reversal signals from the MACD and Stochastic RSI indicators to accurately go long and short at trend reversal points. It belongs to the class of reversal trading strategies.

## Strategy Logic

The strategy consists of the following components:

1. Using the MACD indicator's crossover of the zero line to determine trend reversal. 

2. Using the Stochastic RSI indicator to identify overbought and oversold conditions. Stochastic RSI combines RSI overbought/oversold principles, above 70 is overbought and below 30 is oversold.

3. When the MACD line crosses above zero (bullish reversal signal) and Stochastic RSI shows oversold, a buy signal is generated. When the MACD line crosses below zero (bearish reversal signal) and Stochastic RSI shows overbought, a sell signal is generated.

4. The strategy has both indicator plotting mode and execution mode. In indicator mode, reversal signals are marked with triangles. In strategy mode, long/short positions are opened on reversal signals.

Combining the MACD reversal signal with Stochastic RSI overbought/oversold levels improves the accuracy of entries. It provides good timing for entries at trend reversal points. 

## Advantages

- Dual indicator filtering improves entry accuracy

The dual reversal filters ensure entries are taken only after trend reversal, reducing false signals and improving entry accuracy.

- Reversal trading works for choppy/ranging markets 

As a reversal strategy, it excels in choppy bear market conditions with frequent ups and downs and allows winning trades at each minor swing reversal.

- Beginner friendly without trend bias 

It directly trades all reversals without the need to determine the major trend, simple to use for beginners.

- Flexible indicator or strategy modes

The modes allow flexible usage for analysis or automated executions.

## Risks

- Higher risk of reversal trading 

Without considering major trend, reversal trading has higher risk in strong trending markets, with likely consecutive losses opening countertrend. Need to combine with trend strategies.

- Difficult multi-parameter optimization

The multiple parameters of dual indicators make optimization challenging. Inappropriate parameters may cause over-trading or insufficient signals. Requires extensive testing.

- Requires high-frequency trading account

The high-frequency strategy needs low-cost trading accounts to support, otherwise fees may offset profits.

## Enhancement Opportunities

- Optimize indicator parameters

Testing different parameter combinations to find the optimal settings for reliable signals. E.g. MACD periods, Stochastic lookback.

- Add trend filter 

Adding a trend indicator and taking reversal signals only in trend direction avoids counter-trend trades. E.g. using MA to determine long-term trend.

- Implement stop loss

Adding stop loss by price or percentage to control risk on trades. Consider partial profit taking and adding to loser.

- Tighten entry conditions 

Additional entry filters like volume spike or crossing moving average to reduce false entries.

## Conclusion

The dual reversal entry strategy provides a novel and reliable approach to trade local reversals. It excels in choppy bear market conditions but has higher risks. Extensive optimization, trend filters and risk controls are needed to profit consistently when live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|Strategy Mode|
|v_input_1|12|MACD Fast Period|
|v_input_2|26|MACD Slow Period|
|v_input_3|9|MACD Signal Period|
|v_input_4|70|Stochastic RSI Period|
|v_input_5|30|%K Period|
|v_input_6|30|%D Period|
|v_input_7|70|Stochastic Overbought Level|
|v_input_8|30|Stochastic Oversold Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-06 00:00:00
end: 2023-11-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('RB Reversal Tabs Strategy', overlay=true)
//Developer: Andrew Palladino
//Owner: Rob Booker
//Date Modified: 11/25/2018
//Updated to Pinescript V5 and transformed into a Strategy by: Powerscooter	11/25/2022

StrategyMode = input.bool(true,"Strategy Mode")
macd_fast_period = input(title='MACD Fast Period', defval=12)
macd_slow_period = input(title='MACD Slow Period', defval=26)
macd_signal_period = input(title='MACD Signal Period', defval=9)
stoch_period = input(title='Stochastic RSI Period', defval=70)
prc_k_period = input(title='%K Period', defval=30)
prc_d_period = input(title='%D Period', defval=30)
stoch_ob = input(title='Stochastic Overbought Level', defval=70)
stoch_os = input(title='Stochastic Oversold Level', defval=30)

[macd_line, signal_line, hist_line] = ta.macd(close, macd_fast_period, macd_slow_period, macd_signal_period)

fast_prc_k = 100 * (close - ta.lowest(low, stoch_period)) / (ta.highest(high, stoch_period) - ta.lowest(low, stoch_period))
fast_prc_d = ta.sma(fast_prc_k, prc_d_period)

slow_prc_k = ta.sma(fast_prc_k, prc_k_period)
slow_prc_d = ta.sma(slow_prc_k, prc_d_period)

full_prc_k = ta.sma(fast_prc_k, prc_k_period)
full_prc_d = ta.sma(full_prc_k, prc_d_period)

is_buy_reversal = ta.crossover(macd_line, 0) and full_prc_k < stoch_os
is_sell_reversal = ta.crossunder(macd_line, 0) and full_prc_k > stoch_ob

plotshape(is_buy_reversal and not StrategyMode, style=shape.triangleup, color=color.new(color.green, 0), size=size.small, location=location.belowbar)
plotshape(is_sell_reversal and not StrategyMode, style=shape.triangledown, color=color.new(color.red, 0), size=size.small, location=location.abovebar)

//Orders
if is_buy_reversal and StrategyMode
	strategy.entry("Long",strategy.long)
if is_sell_reversal and StrategyMode
	strategy.entry("Short",strategy.short)
//plot(full_prc_k, color=blue)
//plot(full_prc_d, color=red)
//plot(macd_line, color=blue)
```

> Detail

https://www.fmz.com/strategy/431971

> Last Modified

2023-11-13 17:56:24
