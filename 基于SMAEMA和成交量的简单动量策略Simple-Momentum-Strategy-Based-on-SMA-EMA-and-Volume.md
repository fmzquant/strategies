
> Name

基于SMAEMA和成交量的简单动量策略Simple-Momentum-Strategy-Based-on-SMA-EMA-and-Volume

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15645d00a8541a95ae9.png)

[trans]

### 概述

该策略是一个非空头(只做多头,不做空头)的简单日内动量策略。它利用SMA、EMA和成交量指标尝试在最佳时机(即价格和动量同时上涨时)进入市场。它的优点是实现了简单,且对趋势具有一定的识别能力。

### 策略原理

该策略的交易 Einty 信号生成逻辑是:同时满足SMA指标高于EMA指标和连续3根K线或者连续4根K线形成上涨趋势,且中间K线最低价高于开始上涨K线的开盘价时产生 Entry 信号。

Exit 信号生成逻辑是:当SMA指标下穿EMA指号时产生 Exit 信号。

该策略只做多头,不做空头。其Entry和Exit逻辑对持续上涨的趋势具有一定的识别能力。

### 优势分析

该策略具有以下优势:

1. 策略逻辑简单,容易理解和实现;

2. 利用了SMA、EMA和成交量等常用技术指标,参数调整灵活;  

3. 对持续上涨的趋势有一定的识别能力,可以抓住趋势中的部分机会。

### 风险分析

该策略也存在以下风险:  

1. 无法识别ို向下或盘整的市场,可能带来较大的回撤;

2. 无法利用空头机会,无法对衰退趋势进行对冲,可能错过较好的盈利机会;  

3. 成交量指标对高频数据效果不佳,需要调整参数;

4. 可利用止损来控制风险。

### 优化方向  

该策略可以从以下几个方面进行优化:

1. 增加空头交易机会,实现多空头双向交易,利用衰退趋势套利;

2. 利用更先进的指标如 MACD、RSI 等组合策略,提高对趋势的判断能力;  

3. 优化止损逻辑,降低回撤风险;  

4. 调整参数,测试不同周期的数据,寻找最佳参数组合。

### 总结  

该策略整体而言是一个非常简单的趋势追踪策略,通过 SMA、EMA 和成交量指标判断入场时机。它的优点是简单和容易实现,适合入门学习,但不能识别盘整和下跌趋势,存在一定的风险。通过引入空头、优化指标和止损等手段可以获得改进。

||


### Overview

This is a simple intraday momentum strategy that only goes long and does not short. It utilizes SMA, EMA and volume indicators to attempt entering the market at the optimal timing when both price and momentum are trending up. Its advantage is being simple while having some trend recognition capability.

### Strategy Principle  

The entry signal logic is: when SMA is higher than EMA, and there is a consecutive 3-bar or 4-bar uptrend pattern, with the lowest price of the middle bars being higher than the open price of the starter uptrend bar, an entry signal is generated.  

The exit signal logic is: when SMA crosses below EMA, an exit signal is generated.

This strategy only goes long and does not short. Its entry and exit logic has some capability in recognizing persistent uptrends.

### Advantage Analysis

The advantages of this strategy:

1. The logic is simple and easy to understand and implement;

2. Utilizes common technical indicators like SMA, EMA and volume for flexibility in parameter tuning;  

3. Has some capability in catching some opportunities during persistent uptrends.

### Risk Analysis  

The risks of this strategy:

1. Inability to detect downtrends or consolidation markets, leading to large drawdowns;

2. Inability to utilize shorting opportunities, unable to hedge against downtrends, missing good profit chances;

3. Volume indicator does not work well on high frequency data, parameters need adjustment;  

4. Can use stop loss to control risks.

### Optimization Directions   

This strategy can be optimized in the following aspects:

1. Adding shorting capability for mean reversion opportunities;  

2. Using more advanced indicators like MACD and RSI for better trend detection;

3. Optimizing stop loss logic to reduce drawdowns;

4. Tuning parameters and testing different timeframes to find optimal parameter sets.


### Conclusion  

In summary this is a very simple trend following strategy utilizing SMA, EMA and volume for entry timing. Its advantage is being simple and easy to implement, good for beginners to learn, but it cannot detect consolidation or downtrends and has risks. Improvements can be made by introducing shorting, optimizing indicators and stop loss etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|SMA (small length)|
|v_input_2|20|EMA (large length)|
|v_input_3|10|Volume Trigger|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-07 00:00:00
end: 2023-12-02 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © slip_stream

//@version=4

// Simple strategy for riding the momentum and optimising the timings of truer/longer price moves upwards for an long posistions on a daily basis (can be used, but with less effect
// on other time frames. Volume settings would have to be adjusted by the user accordingly. (short positions are not used).
// This strategy has default settings of a short(er) SMA of 10, a long(er) EMA of 20, and Volume trigger of 10 units and above. All these settings can be changed by the user
// using the GUI settings and not having to change the script.

// The strategy will only open a long position when there is a clear indication that price momentum is upwards through the SMA moving and remaining above the EMA (mandatory) and price period indicators
// of either 1) a standard 3 bar movement upwards, 2) a standard but "aggressive" 3 or 4 bar play where the low of the middle resting bars can be equal to or higher than (i.e. not
// the more standard low of about half) of the opening of the ignition bar. The "aggression" of the 3/4 bar play was done in order to counteract the conservatisme of having a mandatory
// SMA remaining higher than the EMA (this would have to be changed in the script by the user if they want to optimise to their own specifications. However, be warned, all programmatic
// settings for the maximum acceptable low of the middle resting bars runs a risk of ignoring good entry points due to the low being minutely e.g. 0.01%, lower than the user defined setting)


strategy(title = "Simple Momentum Strategy Based on SMA, EMA and Volume", overlay = true, pyramiding = 1, initial_capital = 100000, currency = currency.USD)


// Obtain inputs
sma_length = input(defval = 10, minval=1, type = input.integer, title = "SMA (small length)")
ema_length = input(defval = 20,minval=1, type = input.integer, title = "EMA (large length)")
volume_trigger = input(defval = 10, title = "Volume Trigger", type = input.integer)
sma_line = sma(close, sma_length)
ema_line = ema(close, ema_length)


// plot SMA and EMA lines with a cross for when they intersect
plot(sma_line, color = #8b0000, title = "SMA")
plot(ema_line, color = #e3d024, title = "EMA")
plot(cross(sma_line, ema_line) ? sma_line : na, style = plot.style_cross, linewidth = 4, color = color.white)


// Create variables
// variables to check if trade should be entered
//three consecutive bar bar moves upwards and volume of at least one bar is more than 10
enter_trade_3_bar_up = sma_line > ema_line and close[1] >= close [2] and close[3] >= close[4] and close[2] >= close[3] and (volume[1] >= volume_trigger or volume[2] >= volume_trigger or volume[3] >= volume_trigger)
// aggressive three bar play that ensures the low of the middle bar is equal to or greater than the open of the instigator bar. Volume is not taken into consideration (i.e. aggressive/risky)
enter_3_bar_play = sma_line > ema_line and close[1] > close[3] and low[2] >= open[3]
// aggressive four bar play similar to the 3 bar play above
enter_4_bar_play = sma_line > ema_line and close[1] > close[4] and low[2] >= open[4]
trade_entry_criteria = enter_trade_3_bar_up or enter_3_bar_play or enter_4_bar_play // has one of the trade entry criterias returned true?

// exit criteria for the trade: when the sma line goes under the ema line
trade_exit_criteria = crossunder (sma_line, ema_line)


if (year >= 2019)
    strategy.entry(id = "long", long = true, qty = 1, when = trade_entry_criteria)
    strategy.close(id = "long", when = trade_exit_criteria, qty = 1)
    // for when you want to brute force close all open positions: strategy.close_all (when = trade_exit_criteria)
```

> Detail

https://www.fmz.com/strategy/434676

> Last Modified

2023-12-08 11:15:30
