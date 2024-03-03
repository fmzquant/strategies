
> Name

DEC策略Leledec-DEC-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1888333f2986e2f4add.png)
[trans]

## 概述

蕾蕾DEC策略通过识别蕾蕾DEC指标的穷尽形态,来判断市场趋势反转的时机。当出现主要蕾蕾DEC穷尽形态时,做多;当出现次要蕾蕾DEC穷尽形态时,做空。该策略主要适用于中长线交易。

## 策略原理

蕾蕾DEC指标用于识别价格的局部极值点。它通过统计多根K线的收盘价与开盘价的关系,来判断该点是否是一个潜在的极值点。

该策略的核心逻辑是:

1. 计算主要蕾蕾DEC指标(maj),参数为bar计数(maj_qual)和查找范围(maj_len)。

2. 当主要蕾蕾DEC连续向上突破maj_qual根K线,并且这根K线的最高价超过之前maj_len根K线的最高价,则视为主要蕾蕾DEC向上穷尽,产生做多信号。

3. 计算次要蕾蕾DEC指标(min),参数为bar计数(min_qual)和查找范围(min_len)。

4. 当次要蕾蕾DEC连续向下突破min_qual根K线,并且这根K线的最低价低于之前min_len根K线的最低价,则视为次要蕾蕾DEC向下穷尽,产生做空信号。

根据蕾蕾DEC指标的原理,穷尽形态表示该点附近可能是一个极值点和趋势反转点,因此产生交易信号。

## 优势分析

- 该策略具有较强的趋势判断能力。蕾蕾DEC指标可以有效识别出价格的局部极值点。

- 通过不同参数组合,可以灵活适应不同周期和市场环境。

- 可单独使用主要蕾蕾DEC信号,也可以结合次要蕾蕾DEC信号,实现更全面和准确的判断。

- 可设置不同的bar计数和查找范围参数,调整策略的灵敏度。

## 风险分析

- 如其他指标一样,蕾蕾DEC指标也可能出现假信号,需要结合其他指标进行验证。

- 需要优化参数,以适应不同周期和品种。参数设置不当可能出现频繁交易或漏单的问题。

- 该策略主要基于K线形态,可能会错过短期价格震荡中的机会。

- 需要关注突破蕾蕾DEC信号的K线实体部分,防范趋势反转失败。

## 优化方向

- 优化参数组合,提高参数的适应性。可以考虑动态优化参数。

- 结合其他指标进行过滤,如量能指标、移动平均线等,提高信号的可靠性。

- 加入止损策略,控制单笔损失。

- 结合短期指标,抓住短期价格波动中的机会。

- 测试不同的交易品种,寻找最佳适用环境。

- 优化资金管理策略,如持仓规模、仓位管理等。

## 总结

蕾蕾DEC策略通过捕捉蕾蕾DEC指标的极限形态,来判断潜在的趋势反转点,是一种较好的趋势跟踪策略。该策略具有判断市场趋势的优势,但需要深入优化,辅以其他指标进行过滤验证,并做好风险管理,才能长期稳定盈利。整体来说,蕾蕾DEC策略为我们提供了另一种有价值的交易工具。

||


## Overview

The Leledec strategy identifies trend reversals by detecting exhaustion patterns in the Leledec indicator. It goes long when major Leledec exhaustion appears and goes short when minor Leledec exhaustion appears. The strategy is suitable for medium to long term trading.

## Strategy Logic

The Leledec indicator identifies local extremum points of price. It does so by analyzing the relationship between close and open prices over several bars. 

The core logic of the strategy is:

1. Calculate the major Leledec indicator (maj) using parameters bar count (maj_qual) and lookback period (maj_len).

2. When major Leledec breaks above maj_qual bars consecutively, and the high of the bar exceeds the highest high over the past maj_len bars, a major Leledec upside exhaustion is identified which generates a long signal.

3. Calculate the minor Leledec indicator (min) using parameters bar count (min_qual) and lookback period (min_len). 

4. When minor Leledec breaks below min_qual bars consecutively, and the low of the bar is below the lowest low over the past min_len bars, a minor Leledec downside exhaustion is identified which generates a short signal.

According to the logic of the Leledec indicator, exhaustion patterns represent potential extremum points and trend reversals, hence the trading signals.

## Advantage Analysis 

- The strategy has strong capabilities in trend identification. Leledec can effectively detect local extremum points.

- Flexibility in adapting to different timeframes and market conditions through parameter tuning.

- Can use major Leledec alone or incorporate minor Leledec for more comprehensive signals. 

- Customizable sensitivity through bar count and lookback period parameters.

## Risk Analysis

- Potential for false signals, requires validation using other indicators.

- Parameter optimization needed for different products and timeframes. Improper parameters may cause over-trading or missed trades.

- Mainly relies on candlestick patterns, may miss opportunities during short term price oscillations.

- Need to watch real bodies of signal bars for failed trend reversals.

## Optimization

- Optimize parameter combinations for better adaptability. Consider dynamic optimization.

- Incorporate other indicators like volume, moving averages etc. to filter signals. 

- Implement stop loss to control downside on single trades.

- Incorporate short term indicators to catch opportunities from minor oscillations.

- Test on different products to find optimal environment.

- Optimize money management strategies like position sizing, risk per trade etc.

## Conclusion

The Leledec strategy catches trend reversals by identifying extremum patterns in the Leledec indicator. It is an effective trend following methodology. While advantageous in assessing trends, further optimization, additional signal validation, and proper risk management is needed for long term profitability. Overall, the Leledec strategy provides a valuable addition to a trader's toolkit.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Major Leledec Exhausion Bar ::  Show|
|v_input_2|false|Minor Leledec Exhausion Bar ::  Show|
|v_input_3_close|0|Major Leledec Exhausion Bar ::  Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|6|Major Leledec Exhausion Bar ::  Bar count no|
|v_input_5|30|Major Leledec Exhausion Bar ::  Highest / Lowest|
|v_input_6|5|Minor Leledec Exhausion Bar ::  Bar count no|
|v_input_7|5|Minor Leledec Exhausion Bar ::  Bar count no|
|v_input_8|true|bindexSindex|
|v_input_9|4|Close|
|v_input_10|true|From Month|
|v_input_11|true|From Day|
|v_input_12|2018|From Year|
|v_input_13|12|Thru Month|
|v_input_14|true|Thru Day|
|v_input_15|2030|Thru Year|
|v_input_16|true|Show Date Range|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-01 00:00:00
end: 2023-09-30 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Joy_Bangla

//@version=4
strategy("A Strategy for Leledec", shorttitle ="Leledec Strategy", overlay=true, commission_value=0.075, initial_capital=10000, default_qty_type = strategy.percent_of_equity, default_qty_value = 10)

maj = input(true, "Major Leledec Exhausion Bar ::  Show")
min=input(false, "Minor Leledec Exhausion Bar ::  Show")
leledcSrc = input(close, "Major Leledec Exhausion Bar ::  Source")
maj_qual = input(6, "Major Leledec Exhausion Bar ::  Bar count no")
maj_len = input(30, "Major Leledec Exhausion Bar ::  Highest / Lowest")
min_qual=input(5, "Minor Leledec Exhausion Bar ::  Bar count no")
min_len=input(5, "Minor Leledec Exhausion Bar ::  Bar count no")
bindexSindex = input(1, "bindexSindex")
closeVal = input(4, "Close")

lele(qual, len) =>
    bindex = 0
    sindex = 0
    bindex := nz(bindex[bindexSindex], 0)
    sindex := nz(sindex[bindexSindex], 0)
    ret = 0
    if close > close[closeVal]
        bindex := bindex + 1
        bindex
    if close < close[closeVal]
        sindex := sindex + 1
        sindex
    if bindex > qual and close < open and high >= highest(high, len)
        bindex := 0
        ret := -1
        ret
    if sindex > qual and close > open and low <= lowest(low, len)
        sindex := 0
        ret := 1
        ret
    return = ret
    return

major = lele(maj_qual, maj_len)
minor=lele(min_qual,min_len)

plotchar(maj ? major == -1 ? high : na : na, char='•', location=location.absolute, color=color.red, transp=0, size=size.large)
plotchar(maj ? major == 1 ? low : na : na, char='•', location=location.absolute, color=color.lime, transp=0, size=size.large)

plotchar(min ? (minor==1?high:na) : na, char='x', location=location.absolute, color=color.red, transp=0, size=size.small)
plotchar(min ? (minor==-1?low:na) : na, char='x', location=location.absolute, color=color.lime, transp=0, size=size.small)

leledecMajorBullish = major==1?low:na
leledecMajorBearish = major==-1?high:na

leledecMinorBullish = minor==1?low:na
leledecMinorBearish = minor==-1?high:na



buySignalBasedOnMajorLeledecOnly = major==1?low:na
sellSignalBasedOnMajorLeldecOnly = minor==-1?high:na


// === INPUT BACKTEST RANGE ===
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2018, title = "From Year",       type = input.integer, minval = 2017, maxval = 2030)
thruMonth = input(defval = 12,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 11)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 30)
thruYear  = input(defval = 2030, title = "Thru Year",       type = input.integer, minval = 2017, maxval = 2030)

// === INPUT SHOW PLOT ===
showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

// === FUNCTION EXAMPLE ===
start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false       // create function "within window of time"

if (window())
    strategy.entry("buy", strategy.long, when=buySignalBasedOnMajorLeledecOnly)
    strategy.entry("sell", strategy.short, when=sellSignalBasedOnMajorLeldecOnly)
 




```

> Detail

https://www.fmz.com/strategy/430651

> Last Modified

2023-10-31 11:47:00
