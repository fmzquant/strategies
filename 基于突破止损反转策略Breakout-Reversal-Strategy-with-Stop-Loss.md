
> Name

基于突破止损反转策略Breakout-Reversal-Strategy-with-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ce01781cc07ea12da5.png)
[trans]
## 概述

该策略是一个基于突破理论的长短线量化交易策略。它通过计算最近100个交易日内的最高收盘价,判断是否出现突破。如果最近一日的收盘价超过此前100日最高收盘价,则发出买入信号。进入做多头仓后,将在25个交易日后强制止损平仓。

## 策略原理

该策略的核心逻辑基于技术分析中“突破”理论。突破理论认为,当价格超过此前一段时间内的最高点或最低点时,代表着市场出现转折,可能进入新的上涨或下跌趋势。

具体来说,该策略通过调用Pine Script内置函数`ta.highest()`,计算过去100个bar的最高收盘价。然后比较当前K线的收盘价是否高于该最高收盘价。如果收盘价突破100日最高收盘价向上方向发生突破,则产生买入信号。

一旦进入做多头仓位后,策略会设置一个止损平仓的条件。通过调用`ta.barssince()`函数统计进入做多后的bar数量,当bar数量超过25时,就会强制止损平仓。

该策略的入市逻辑可以概括为:

1. 计算最近100个交易日的最高收盘价
2. 比较当前K线收盘价是否高于该最高收盘价
3. 如果高于,产生买入信号,进入做多方向
4. 在仓位进入25个交易日后,强制止损平仓

## 优势分析

该策略最大的优势在于捕捉价格趋势的转折点,具有较高的顺势交易成功率。另外,止损逻辑的设置也可以有效控制单笔损失。

具体优势可概括为:

**1. 顺势交易,成功率较高**

突破理论认为,价格超过关键价格区域后,代表着进入新的趋势。该策略正是依据这一理论设计的,因此有较高的概率捕捉到价格反转的时点,实现顺势交易。

**2. 风险可控,有止损机制** 

策略设置了25个交易日后止损退出的机制,可以把单笔损失控制在一定范围,避免出现大额亏损的情况,使整体风险可控。

**3. 适合中长线持仓**

策略的持仓时间默认为25个交易日,约为1个月。这对于中长线策略而言是比较适宜的持仓时间范围,不会过于短期造成whipsaw,也不会持仓时间过长增加风险。

**4. 参数量少,易于优化**

该策略主要参数只有突破窗口期和持仓时间两个,参数量少易于测试和优化寻找最优参数,实盘运用成本低。

**5. 可在多品种之间切换**

策略没有使用特定品种的独特指标,其交易逻辑对于股指、外汇、商品和加密货币等多个品种都适用,可根据市场情况在不同品种之间进行切换,增加策略的适应性。

## 风险分析

尽管该策略有上述优势,但在实际运用中也会面临一定的风险,主要体现在:

**1. 存在被套的风险**

策略并没有设置移动止损或者跟踪止损机制。如果进入的趋势没有形成,或者突破实际上只是假突破,这时就容易被套至止损点。这是该策略的最大风险点。

**2. 参数可能需要优化**

默认参数未必是最优参数,实盘过程中可能需要通过优化方法寻找适合具体品种和市场环境的参数配置,这会增加策略调整和跟踪的工作量。

**3. 效果与市场相关性大**

该策略过度依赖趋势,在盘整市中表现不佳,对于模式各异的市场环境适应性较低。若遇到震荡型市场,则频繁被套或触发止损,盈亏可能不稳定。

## 优化方向 

为使该策略能够在实盘中获得更为稳定的表现,可以在以下方面进行优化与改进:

**1. 增加移动止损机制**

添加一个追踪止损逻辑,根据仓位纸上盈利的大小,设置一个移动止损点进行跟踪,从而把每笔交易的最大亏损限定在一定范围内。这可以较大幅度降低个体风险。

**2. 根据市场条件调整参数**

可以针对该策略的两大参数(突破窗口和持仓时间)设置一个范围或数值列表,根据市场的相对强弱(如通过计算使用ATR指标)来动态设定参数的值,进一步优化参数。

**3. 结合趋势判断规则**

最大限度减少在趋势不明朗或假突破情形下被套的风险。可以结合事先的趋势分析结果(如目视判断或定量分析),在分析确定有较清晰趋势的时候再参与交易。

**4. 不同品种和市场环境的测试**

在多种品种(如股指、商品、外汇和加密货币等)、各个交易区间(如日线、60分钟等)下测试优化策略参数和规则,适应更广泛的市场环境,增加稳定性。

## 总结

该突破止损反转策略运用简单,对趋势的判断和把握能力较强,可以有效配置多空仓位,持续盈利。我们对其进行了代码分析,找出策略优势和风险点,并给出了进一步提高策略稳定性和实战性的建议。在优化与改进后,相信该策略可以成为量化投资中较为出色的基础模型。

||

## Overview

This is a long/short quantitative trading strategy based on breakout theory. It calculates the highest close price over the past 100 trading days and determines if a breakout happens based on if the latest closing price exceeds that level. If a breakout is detected, a long signal is triggered. After entering long, the position will be closed by a stop loss after 25 bars.

## Strategy Logic

The core logic of this strategy leverages the "breakout" theory in technical analysis. The breakout theory believes that when price breaks through the recent highest or lowest level over a period of time, it signals a reversal and the market may start a new uptrend or downtrend. 

Specifically, this strategy uses the Pine Script built-in function `ta.highest()` to calculate the highest close over the past 100 bars. It then compares if the current bar's closing price is higher than that level. If the closing price breaks through and exceeds the 100-day highest closing price, a long entry signal is triggered.

Once entering a long position, the strategy sets a stop loss condition to close the position. By calling `ta.barssince()` to count the number of bars elapsed since entering long, it will force to close the position after 25 bars. 

The entry logic can be summarized as:

1. Calculate the highest close of recent 100 trading days
2. Compare if current bar's closing price exceeds that highest close 
3. If exceeds, trigger long entry signal
4. Close long position by stop loss after 25 bars

## Advantage Analysis 

The biggest advantage of this strategy is to capture price reversal points with relatively high success rate of trend-following trades. Also, the stop loss logic can effectively control single trade loss amount.

The concrete advantages are:

**1. Trend-following, higher success rate**

The breakout theory believes after price exceeds a key level, it may start a new trend. This strategy is designed based on this logic, thus with relatively high probability to capture price reversal points and benefit from trend-following.

**2. Controllable risk, with stop loss**

The strategy sets a forced stop loss exit after 25 bars to maximum single trade loss, avoiding huge loss. So the overall risk is controllable. 

**3. Suitable for mid-to-long-term holding**  

The default holding period is 25 bars, about 1 month. This frequency is suitable for mid-to-long-term strategies, not too short for whipsaws, and not too long to increase risk.

**4. Few parameters, easy to optimize**

There are mainly 2 tunable parameters. With few parameters it's easy to test and find optimal parameters for actual trading.

**5. Transferable across different products** 

This strategy does not reply on peculiar indicators of certain products. Its logic applies to stocks, forex, commodities, cryptocurrencies etc. So it's flexible to switch between products.

## Risk Analysis

While this strategy has some edges, there are also some risks when deploying it in actual trading, mainly:

**1. Risk of holding losing positions**

The strategy does not have trailing stop loss to follow profitable positions. If the price trend does not proceed as expected, or breakout turns out to be false breakout, then forced exit at pre-set stop loss point may lead to big loss. This is the biggest risk.

**2. Parameter tuning may be needed** 

Default parameters may not be optimal. They need to be optimized during live trading to find the best fit for specific product and market regimes. This adds extra work.

**3. Performance correlation with markets**

The strategy relies too much on persistent price trends. It does not work well during range-bound regimes. If encountered whipsaw markets, forced exit will frequently occur leading to unstable gains/losses.  

## Optimization 

To make this strategy more robust and profitable for actual deployment, some enhancements can be conducted from the following aspects:

**1. Add trailing stop loss mechanism** 

Add trailing stop loss logic to follow profitable positions, by dynamically updating stop loss point based on floating profits. This can limit max loss of single trades.

**2. Adaptive parameters based on markets**

Make parameters like breakout period and holding period adaptive based on market strength, quantified using metrics like ATR. This can dynamically tune parameters.

**3. Combine trend filters **

Better filtering of unclear trends when applying strategy, through trend analysis beforehand, either discretionary or quantitatively. Only take trades when seeing a clear trend.  

**4. Test on different products and intervals** 

Testing the optimized parameters and rules on different products (e.g. indexes, commodities, forex, crypto) and intervals (e.g. daily, 60m bars) will make this strategy more robust and widely applicable.

## Conclusion

This breakout reversal strategy with stop loss is easy to implement with clear rules on trend identification and position management. We analyze its strength and risks, provide suggestions to enhance its profitability and applicability. With further optimization, it can become a solid quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|100|Breakout Period|
|v_input_int_2|2022|Start Year|
|v_input_int_3|true|Start Month|
|v_input_int_4|true|Start Day|
|v_input_int_5|2023|End Year|
|v_input_int_6|12|End Month|
|v_input_int_7|31|End Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-29 00:00:00
end: 2024-02-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © All_Verklempt

//@version=5
strategy("Breakout Strategy", overlay=true)

// Input variable for breakout period
breakoutPeriod = input.int(100, title="Breakout Period", minval=1)

// Calculate the highest close of the past breakout period
highestClose = ta.highest(close, breakoutPeriod)

// Input variables for start and end dates
startYear = input.int(2022, title="Start Year", minval=1900)
startMonth = input.int(1, title="Start Month", minval=1, maxval=12)
startDay = input.int(1, title="Start Day", minval=1, maxval=31)

endYear = input.int(2023, title="End Year", minval=1900)
endMonth = input.int(12, title="End Month", minval=1, maxval=12)
endDay = input.int(31, title="End Day", minval=1, maxval=31)

// Convert start and end dates to timestamp
startDate = timestamp(startYear, startMonth, startDay, 00, 00)
endDate = timestamp(endYear, endMonth, endDay, 23, 59)

// Entry condition: Breakout and higher close within the specified date range
enterLong = close > highestClose[1] and close > close[1]

// Exit condition: Close the long position after twenty-five bars
exitLong = ta.barssince(enterLong) >= 25

// Strategy logic
if (enterLong)
    strategy.entry("Long", strategy.long)

if (exitLong)
    strategy.close("Long")

```

> Detail

https://www.fmz.com/strategy/441092

> Last Modified

2024-02-05 14:56:16
