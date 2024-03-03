
> Name

基于移动平均线的动量策略This-strategy-is-a-momentum-strategy-based-on-moving-average-lines

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/112aaa2af0644c13a40.png)
 [trans]

## 概述

本策略是一个基于移动平均线的动量策略。它通过计算不同周期的简单移动平均线,并比较其交叉情况来产生交易信号。具体来说,当短期移动平均线上穿长期移动平均线时,产生买入信号;当短期移动平均线下穿长期移动平均线时,产生卖出信号。

## 策略原理

该策略的核心逻辑是基于动量效应,也就是股票价格趋势的持续性。移动平均线能够有效反映股票价格变化趋势,当短期移动平均线上穿长期移动平均线时,表示股票价格开始进入上升趋势;相反,当短期移动平均线下穿长期移动平均线时,表示股票价格开始进入下降趋势。本策略就是根据这个原理产生交易信号的。

具体来说,策略中定义了一个13日简单移动平均线和一个34日简单移动平均线。在每日收盘价计算这两个移动平均线后,比较其值的大小关系。如果13日线上穿34日线,则产生买入信号,表示股票价格进入上涨趋势,应该建立多头仓位;如果13日线下穿34日线,则产生卖出信号,表示股票价格进入下跌趋势,应该清仓卖出。

## 策略优势

本策略最大的优势在于简单易懂,容易实现。移动平均线是最基本也最常用的技术指标之一,其原理简单,易于理解和应用。同时,移动平均线组合信号也经过长期实践被证明是有效的。

另外,本策略参数设置灵活,可以根据不同品种、市场环境进行调整。比如可以改变移动平均线的周期参数,从而调整策略的灵敏度。这为策略的优化和调整提供了空间。

## 风险分析

本策略最大的风险在于可能出现较多的错误信号和震荡市中被套。当价格出现大幅震荡时,移动平均线可能产生频繁的交叉,导致错误信号的出现。这时就需要调整移动平均线周期参数,过滤掉一些噪音。

另外,当行情出现较大反转时,策略的止损点可能会被突破,导致较大亏损的产生。这需要优化止损策略,并适当放宽止损幅度。

## 优化方向

本策略可以从以下几个方面进行优化:

1. 优化移动平均线的周期参数,找到不同品种和市场环境下参数的最优组合

2. 增加其他技术指标过滤,如MACD、KD等,避免在震荡行情中产生错误信号

3. 优化和动态调整止损策略,在保证止损的同时,避免止损点过于接近,被突破的概率较大

4. 增加仓位管理机制,比如固定量投入、仓位比例等,控制单笔交易风险

## 总结

本策略是一个非常经典的移动平均线交叉strategy,通过计算并比较短期和长期移动平均线的关系,产生买入和卖出信号。该策略优点是简单易懂、参数灵活,适用于初学者学习;缺点是信号可能不够稳定,在震荡市场中容易被套。通过适当的优化,仍然可以成为一个非常实用的量化策略。

||

## Overview

This strategy is a momentum strategy based on moving average lines. It generates trading signals by calculating simple moving averages of different periods and comparing their crossover situations. Specifically, when the short-term moving average line crosses above the long-term moving average line, a buy signal is generated; when the short-term moving average line crosses below the long-term moving average line, a sell signal is generated.

## Strategy Principle 

The core logic of this strategy is based on the momentum effect, which is the persistence of stock price trends. Moving average lines can effectively reflect the change trend of stock prices. When the short-term moving average line crosses above the long-term moving average line, it means that the stock price starts to enter an upward trend; on the contrary, when the short-term moving average line crosses below the long-term moving average line, it means that the stock price starts to enter a downward trend. This strategy generates trading signals based on this principle.

Specifically, a 13-day simple moving average and a 34-day simple moving average are defined in the strategy. After calculating these two moving averages based on the daily closing price, their magnitude relationship is compared. If the 13-day line crosses above the 34-day line, a buy signal is generated, indicating that the stock price enters an upward trend and a long position should be established; if the 13-day line crosses below the 34-day line, a sell signal is generated, indicating that the stock price enters a downward trend and the position should be closed out.

## Advantage Analysis

The biggest advantage of this strategy is that it is simple and easy to understand and implement. The moving average line is one of the most basic and commonly used technical indicators. Its principle is simple and easy to understand and apply. At the same time, the moving average line crossover signal has also been proven effective through long-term practice. 

In addition, the parameter setting of this strategy is flexible and can be adjusted according to different varieties and market conditions. For example, the cycle parameters of the moving average line can be changed to adjust the sensitivity of the strategy. This provides room for strategy optimization and adjustment.

## Risk Analysis

The biggest risk of this strategy is that there may be more false signals and getting caught in range-bound markets. When prices fluctuate sharply, moving average lines may produce frequent crossovers, resulting in false signals. At this point, you need to adjust the cycle parameters of the moving average line to filter out some noise.

In addition, when there is a larger market reversal, the stop loss point of the strategy may be broken through, resulting in larger losses. This requires optimizing the stop loss strategy and appropriately relaxing the stop loss range.

## Optimization Directions

The following aspects of this strategy can be optimized:

1. Optimize the cycle parameters of the moving average line to find the optimal combination of parameters for different varieties and market conditions.

2. Add filtration of other technical indicators such as MACD and KD to avoid generating false signals in range-bound markets. 

3. Optimize and dynamically adjust the stop loss strategy to avoid the stop loss point being too close while ensuring the stop loss, with a higher probability of being broken through.

4. Increase position management mechanisms such as fixed investment and position ratio to control single transaction risk.

## Conclusion

This strategy is a very classic moving average crossover strategy. It generates buy and sell signals by calculating and comparing the relationship between short-term and long-term moving averages. The advantages of this strategy are simple, flexible parameters, and suitable for beginners to learn; the disadvantages are that the signals may not be stable enough and it is easy to get caught in range-bound markets. With proper optimization, it can still become a very practical quantitative strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Enable short entries?|
|v_input_2|5|From Month|
|v_input_3|18|From Day|
|v_input_4|2018|From Year|
|v_input_5|9|To Month|
|v_input_6|true|To Day|
|v_input_7|2018|To Year|
|v_input_8|10|Stop Loss %|
|v_input_9|30|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-16 00:00:00
end: 2024-01-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// TODO: update strategy name
strategy("{STRATEGY NAME}", overlay=true)

// === TA LOGIC ===

//
//
// TODO: PUT YOUR TA LOGIC HERE
LONG_SIGNAL_BOOLEAN = crossover(sma(close, 13), sma(close, 34))
SHORT_SIGNAL_BOOLEAN = crossunder(sma(close, 12), sma(close, 21))

// === INPUT BACKTEST DATE RANGE ===
enableShorts = input(false, title="Enable short entries?")

FromMonth = input(defval = 5, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 18, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 2017)
ToMonth   = input(defval = 9, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2018, title = "To Year", minval = 2017)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

// === STRATEGY BUY / SELL ENTRIES ===

// TODO: update the placeholder LONG_SIGNAL_BOOLEAN and SHORT_SIGNAL_BOOLEAN to signal
// long and short entries
buy() => window() and LONG_SIGNAL_BOOLEAN
sell() => window() and SHORT_SIGNAL_BOOLEAN

if buy()
    strategy.entry("Long", strategy.long, comment="Long")

if sell()
    if (enableShorts)
        strategy.entry("Short", strategy.short, comment="Short")
    else
        strategy.close("Long")

// === BACKTESTING: EXIT strategy ===
sl_inp = input(10, title='Stop Loss %', type=float)/100
tp_inp = input(30, title='Take Profit %', type=float)/100

stop_level = strategy.position_avg_price * (1 - sl_inp)
take_level = strategy.position_avg_price * (1 + tp_inp)

strategy.exit("Stop Loss/Profit", "Long", stop=stop_level, limit=take_level)
```

> Detail

https://www.fmz.com/strategy/439693

> Last Modified

2024-01-23 10:38:18
