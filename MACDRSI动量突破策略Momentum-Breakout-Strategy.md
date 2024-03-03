
> Name

MACDRSI动量突破策略Momentum-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/164af44da89c7fc888d.png)
[trans]


## 概述

这是一个利用MACD、RSI和随机指标判断股价动量方向,在动量突破点进行买入做多或卖出做空的策略。该策略通过组合使用多个指标判断趋势,降低了单一指标造成的错误信号率,可以有效捕捉股价中的中短线趋势。

## 原理

该策略使用MACD、RSI和随机指标判断股价的趋势方向。当MACD的DIFF线上穿DEAL线,RSI大于50,STOCH的快线也大于50时,判断为多头趋势形成,则在次日开盘时以全部资金按当日最高价买入做多;反之,当MACD的DIFF线下穿DEAL线,RSI小于50,STOCH的快线也小于50时,判断为空头趋势形成,则在次日开盘时以全部资金按当日最低价卖出做空。交易的止盈止损根据过去7天的波动范围计算,盈亏比例可自定义设置。

进入仓位后,如果三个指标中的任意一个发生反向信号,则说明趋势发生转变,应退出当前仓位。同时,还设置了特殊的时间条件过滤,在2020年3月全面跳过,避免受到极端市场的影响。

## 优势

- 组合多个指标判断趋势,可以有效过滤假信号
- 利用突破入场,可以抓住趋势的初期阶段
- 采用动态止盈止损,可以锁定合理利润
- 设置跳过期间,可以防止极端行情的干扰
- 结合趋势和反转机制,可以减少不必要的交易次数

## 风险

- 多指标组合可能产生滞后,错过最佳入场时机
- 突破信号容易被套牢
- 动态止损可能过于激进,被 Preis止损
- 跳过的特殊期间设置不合理,也可能错过机会
- 反转信号可能过于敏感,导致过频交易

优化方法:

- 调整指标参数,缩短滞后
- 加入filte和volume等条件,避免套牢
- 采用tracker止损,防止被preis
- 优化和测试跳过的日期范围
- 调整反转信号的参数,降低频率

## 总结

该策略整体来说是一个典型的趋势跟踪策略。它同时利用多种指标判断趋势来入场,又利用反转信号来判断趋势结束而退出,实现了趋势跟踪与反转切换的结合。但策略本身也存在一些参数设置不合理和滞后的问题,这需要通过大量回测来优化和改进,才能使策略参数都调整到最佳状态。

总的来说,该策略思路清晰,使用的指标和方法也较为典型。在一些细节优化和风险控制方面做得好,可以成为一个可实际应用的量化策略。但离完美还有一定差距,仍需要进一步测试和优化,才能使策略的收益回撤比达到专业水平。如果能持续优化和更新,该策略可以成为一个值得长期跟踪的策略品种。

||

# 

## Overview

This is a strategy that uses MACD, RSI and Stochastic indicators to determine price momentum direction and makes long or short entries at momentum breakout points. By combining multiple indicators to judge the trend, it reduces the false signal rate of single indicators and can effectively capture medium-term trends in prices.

## Principle 

The strategy uses MACD, RSI and Stochastic indicators to determine the trend direction of prices. When MACD's DIFF line crosses above DEAL line, RSI is greater than 50, and STOCH's fast line is also greater than 50, it is judged as a bullish trend forming, so it will long at the next day's opening price with all capital at the highest price of the day; Conversely, when MACD's DIFF line crosses below DEAL line, RSI is less than 50, and STOCH's fast line is also less than 50, it is judged as a bearish trend forming, so it will short at the next day's opening price with all capital at the lowest price of the day. The take profit and stop loss are calculated based on the price fluctuation range of the past 7 days, and the profit/loss ratio can be customized.

After entering a position, if any of the three indicators generates a reverse signal, it means the trend has reversed and should exit the current position. It also sets special time condition filters that skip the entire month of March 2020 to avoid extreme market impact.

## Advantages

- Combining multiple indicators to judge the trend can effectively filter false signals
- Taking advantage of breakouts can capture the early stage of trends
- Using dynamic take profit and stop loss can lock in reasonable profits
- Skipping periods can prevent interference from extreme markets
- Combining trend following and reversal mechanisms can reduce unnecessary trades

## Risks

- Multiple indicator combos may cause lag, missing best entry timing
- Breakout signals are prone to being trapped
- Dynamic stops may be too aggressive and stopped out by Preis 
- Skipping special periods may miss opportunities if configured improperly
- Reversal signals may be too sensitive leading to over-trading

Improvement directions:

- Adjust indicator parameters to reduce lag
- Add filters like volume to avoid traps
- Use tracker stops to prevent Preis stops
- Optimize and test skipped date ranges 
- Tune reversal signal parameters to reduce frequency

## Summary

Overall this is a typical trend following strategy. It uses multiple indicators to determine trend for entries, and reversal signals to judge trend endings for exits, combining both trend following and reversal mechanisms. But the strategy itself also has some improper parameter settings and lag issues that need lots of backtesting to optimize and improve, in order to adjust all strategy parameters to their optimal state. 

In summary, the logic of this strategy is clear, and the indicators used are also typical. It does well in some details of optimization and risk control, and can be a real-world applicable quant strategy. But there are still some gaps from perfection, requiring further testing and optimization, to get the return/drawdown ratio of the strategy up to a professional level. With continuous optimization and updates, this strategy can become one worth tracking long term.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|7|From Month|
|v_input_3|2019|From Year|
|v_input_4|true|To Day|
|v_input_5|true|To Month|
|v_input_6|2021|To Year|
|v_input_7|1.5|risk|
|v_input_8|3|reward|
|v_input_9|true|test long|
|v_input_10|true|test short|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-07 00:00:00
end: 2023-11-06 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4
// Backtest the power x strategy. The power x strategy is develop by Markus Heitkoetter and Rockwell Trading.
// This script shows the return for a given stock for with the defined date range with a fixed captial of $10,000
strategy("PowerX Test", overlay=true, initial_capital=10000)

// ####################### Start of User Inputs #######################
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 7, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2019, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2021, title = "To Year", minval = 1970)

// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true

// Risk/Reward Inputs
riskFactor = input(defval = 1.5, title = "risk", minval = 1)
rewardFactor = input(defval = 3.0, title = "reward", minval = 1)

// Days to ignore due to specail market conditon (ie. covid-19 market crash)
// Calculate start/end skip date and time condition
startSkipDate = timestamp(2020, 3, 1, 00, 00)
finishSkipDate = timestamp(2020, 3, 31, 00, 00)
time_cond_skip = time >= startSkipDate and time <= finishSkipDate

// Long and Short Inputs
hasLong = input(defval = true, title = "test long")
hasShort = input(defval = true, title = "test short")
// ####################### End of User Inputs #######################

// ####################### Start of Indicators #######################
[macdLine, signalLine, histLine] = macd(close, 12, 26, 9)
rsiLine = rsi(close, 7)
stochLine = sma(sma(stoch(close, high, low, 14),3),3)
signal = macdLine > signalLine and rsiLine > 50 and stochLine > 50 ? "buy" : macdLine <= signalLine and rsiLine <= 50 and stochLine <= 50 ? "sell" : "none"

// Average daily range for 7 days
thishigh = security(syminfo.tickerid, 'D', high)
thislow  = security(syminfo.tickerid, 'D', low)
length = 7
adr = (sma(thishigh,length)-sma(thislow,length))
plotchar(adr, "ADR", "")
// ####################### End of Indicators #######################
strategy.initial_capital = 50000
// First day the stock changed momentum.
long = signal == "buy" and signal[1] != "buy" and hasLong
short = signal == "sell" and signal[1] != "sell" and hasShort
sideway = signal == "none" and signal[1] != "none"

if (time_cond and not time_cond_skip)
    // ####################### Start of Long Entry #######################
    // Calculate how many shares to buy based on captial
    qty = round(strategy.initial_capital / high)
    // Note: TradingView uses a broker emulator when running strategies. Order are only filled on the next bar.
    // Enter long on the day after first green bar
    strategy.entry("Long entry", strategy.long, qty = qty, stop = high, when = long)
    strategy.cancel("Long entry", when = not long)
    
    // TODO: Improve the crazy if statments...
    // Handle the case where first green hgih is reached after 2nd green, up to 11 days after
    if (not long and signal == "buy" and strategy.opentrades == 0)
        // reach first green high 11 days after first green
        if (signal[11] != "buy" and signal[10] == "buy" and signal[9] == "buy" and signal[8] == "buy" and signal[7] == "buy" and signal[6] == "buy" and signal[5] == "buy" and signal[4] == "buy" and signal[3] == "buy" and signal[2] == "buy" and signal[1] == "buy" and high[1] < high[9] and high[2] < high[9] and high [3] < high[9] and high [4] < high[9] and high [5] < high[9] and high[6] < high[9] and high[7] < high[9] and high[8] < high[9])
            strategy.entry("Long entry", strategy.long, qty = strategy.initial_capital / high[10], stop = high[10])
        // reach first green high 10 days after first green
        if (signal[10] != "buy" and signal[9] == "buy" and signal[8] == "buy" and signal[7] == "buy" and signal[6] == "buy" and signal[5] == "buy" and signal[4] == "buy" and signal[3] == "buy" and signal[2] == "buy" and signal[1] == "buy" and high[1] < high[8] and high[2] < high[8] and high [3] < high[8] and high [4] < high[8] and high [5] < high[8] and high[6] < high[8] and high[7] < high[8])
            strategy.entry("Long entry", strategy.long, qty = strategy.initial_capital / high[9], stop = high[9])
        // reach first green high 9 days after first green
        if (signal[9] != "buy" and signal[8] == "buy" and signal[7] == "buy" and signal[6] == "buy" and signal[5] == "buy" and signal[4] == "buy" and signal[3] == "buy" and signal[2] == "buy" and signal[1] == "buy" and high[1] < high[7] and high[2] < high[7] and high [3] < high[7] and high [4] < high[7] and high [5] < high[7] and high[6] < high[7])
            strategy.entry("Long entry", strategy.long, qty = strategy.initial_capital / high[8], stop = high[8])
        // reach first green high 8 days after first green
        if (signal[8] != "buy" and signal[7] == "buy" and signal[6] == "buy" and signal[5] == "buy" and signal[4] == "buy" and signal[3] == "buy" and signal[2] == "buy" and signal[1] == "buy" and high[1] < high[6] and high[2] < high[6] and high [3] < high[6] and high [4] < high[6] and high [5] < high[6])
            strategy.entry("Long entry", strategy.long, qty = strategy.initial_capital / high[7], stop = high[7])
        // reach first green high 7 days after first green
        if (signal[7] != "buy" and signal[6] == "buy" and signal[5] == "buy" and signal[4] == "buy" and signal[3] == "buy" and signal[2] == "buy" and signal[1] == "buy" and high[1] < high[6] and high[2] < high[6] and high [3] < high[6] and high [4] < high[6] and high [5] < high[6])
            strategy.entry("Long entry", strategy.long, qty = strategy.initial_capital / high[6], stop = high[6])
        // reach first green high 6 days after first green
        if (signal[6] != "buy" and signal[5] == "buy" and signal[4] == "buy" and signal[3] == "buy" and signal[2] == "buy" and signal[1] == "buy" and high[1] < high[5] and high[2] < high[5] and high [3] < high[5] and high [4] < high[5])
            strategy.entry("Long entry", strategy.long, qty = strategy.initial_capital / high[5], stop = high[5])
        // reach first green high 5 days after first green
        if (signal[5] != "buy" and signal[4] == "buy" and signal[3] == "buy" and signal[2] == "buy" and signal[1] == "buy" and high[1] < high[4] and high[2] < high[4] and high [3] < high[4])
            strategy.entry("Long entry", strategy.long, qty = strategy.initial_capital / high[4], stop = high[4])
        // reach first green high 4 days after first green
        if (signal[4] != "buy" and signal[3] == "buy" and signal[2] == "buy" and signal[1] == "buy" and high[1] < high[3] and high[2] < high[3])
            strategy.entry("Long entry", strategy.long, qty = strategy.initial_capital / high[3], stop = high[3])
        // reach first green high 3 days after first green
        if (signal[3] != "buy" and signal[2] == "buy" and signal[1] == "buy" and high[1] < high[2])
            strategy.entry("Long entry", strategy.long, qty = strategy.initial_capital / high[2], stop = high[2])
        // reach first green high 2 days after first green
        if (signal[2] != "buy" and signal[1] == "buy")
            strategy.entry("Long entry", strategy.long, qty = strategy.initial_capital / high[1], stop = high[1])
            
    // Exit when stopped out or hitted profit target
    // Bracket order for entry 1 day after 1st green
    if (signal == "buy" and signal[1] == "buy" and signal[2] != "buy")
        long_stop_level = strategy.position_avg_price - (adr[1] * riskFactor)
        long_profit_level = strategy.position_avg_price + (adr[1] * rewardFactor)
        strategy.exit("TP/SL", "Long entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 2 day after 1st green
    if (signal == "buy" and signal[1] == "buy" and signal[2] == "buy" and signal[3] != "buy")
        long_stop_level = strategy.position_avg_price - (adr[2] * riskFactor)
        long_profit_level = strategy.position_avg_price + (adr[2] * rewardFactor)
        strategy.exit("TP/SL", "Long entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 3 day after 1st green
    if (signal == "buy" and signal[1] == "buy" and signal[2] == "buy" and signal[3] == "buy" and signal[4] != "buy")
        long_stop_level = strategy.position_avg_price - (adr[3] * riskFactor)
        long_profit_level = strategy.position_avg_price + (adr[3] * rewardFactor)
        strategy.exit("TP/SL", "Long entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 4 day after 1st green
    if (signal == "buy" and signal[1] == "buy" and signal[2] == "buy" and signal[3] == "buy" and signal[4] == "buy" and signal[5] != "buy")
        long_stop_level = strategy.position_avg_price - (adr[4] * riskFactor)
        long_profit_level = strategy.position_avg_price + (adr[4] * rewardFactor)
        strategy.exit("TP/SL", "Long entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 5 day after 1st green
    if (signal == "buy" and signal[1] == "buy" and signal[2] == "buy" and signal[3] == "buy" and signal[4] == "buy" and signal[5] == "buy" and signal[6] != "buy")
        long_stop_level = strategy.position_avg_price - (adr[5] * riskFactor)
        long_profit_level = strategy.position_avg_price + (adr[5] * rewardFactor)
        strategy.exit("TP/SL", "Long entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 6 day after 1st green
    if (signal == "buy" and signal[1] == "buy" and signal[2] == "buy" and signal[3] == "buy" and signal[4] == "buy" and signal[5] == "buy" and signal[6] == "buy" and signal[7] != "buy")
        long_stop_level = strategy.position_avg_price - (adr[6] * riskFactor)
        long_profit_level = strategy.position_avg_price + (adr[6] * rewardFactor)
        strategy.exit("TP/SL", "Long entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 7 day after 1st green
    if (signal == "buy" and signal[1] == "buy" and signal[2] == "buy" and signal[3] == "buy" and signal[4] == "buy" and signal[5] == "buy" and signal[6] == "buy" and signal[7] == "buy" and signal[8] != "buy")
        long_stop_level = strategy.position_avg_price - (adr[7] * riskFactor)
        long_profit_level = strategy.position_avg_price + (adr[7] * rewardFactor)
        strategy.exit("TP/SL", "Long entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 8 day after 1st green
    if (signal == "buy" and signal[1] == "buy" and signal[2] == "buy" and signal[3] == "buy" and signal[4] == "buy" and signal[5] == "buy" and signal[6] == "buy" and signal[7] == "buy" and signal[8] == "buy" and signal[9] != "buy")
        long_stop_level = strategy.position_avg_price - (adr[8] * riskFactor)
        long_profit_level = strategy.position_avg_price + (adr[8] * rewardFactor)
        strategy.exit("TP/SL", "Long entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 9 day after 1st green
    if (signal == "buy" and signal[1] == "buy" and signal[2] == "buy" and signal[3] == "buy" and signal[4] == "buy" and signal[5] == "buy" and signal[6] == "buy" and signal[7] == "buy" and signal[8] == "buy" and signal[9] == "buy" and signal[10] != "buy")
        long_stop_level = strategy.position_avg_price - (adr[9] * riskFactor)
        long_profit_level = strategy.position_avg_price + (adr[9] * rewardFactor)
        strategy.exit("TP/SL", "Long entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 10 day after 1st green
    if (signal == "buy" and signal[1] == "buy" and signal[2] == "buy" and signal[3] == "buy" and signal[4] == "buy" and signal[5] == "buy" and signal[6] == "buy" and signal[7] == "buy" and signal[8] == "buy" and signal[9] == "buy" and signal[10] == "buy" and signal[11] != "buy")
        long_stop_level = strategy.position_avg_price - (adr[10] * riskFactor)
        long_profit_level = strategy.position_avg_price + (adr[10] * rewardFactor)
        strategy.exit("TP/SL", "Long entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 11 day after 1st green
    if (signal == "buy" and signal[1] == "buy" and signal[2] == "buy" and signal[3] == "buy" and signal[4] == "buy" and signal[5] == "buy" and signal[6] == "buy" and signal[7] == "buy" and signal[8] == "buy" and signal[9] == "buy" and signal[10] == "buy" and signal[11] == "buy" and signal[12] != "buy")
        long_stop_level = strategy.position_avg_price - (adr[11] * riskFactor)
        long_profit_level = strategy.position_avg_price + (adr[11] * rewardFactor)
        strategy.exit("TP/SL", "Long entry", stop=long_stop_level, limit=long_profit_level)
    // ####################### End of Long Entry #######################

    // ####################### Start of Short Entry #######################
    // Enter short on the day after first red bar
    qty_short = strategy.initial_capital / low
    strategy.entry("Short entry", strategy.short, qty = qty_short, stop = low, when = short)
    strategy.cancel("Short entry", when = not short)
    
    // TODO: Improve the crazy if statments...
    // Handle the case where first red low is reached after 2nd red, up to 11 days after
    if (not short and signal == "sell" and strategy.opentrades == 0)
        // reach first red low 11 days after
        if (signal[11] != "sell" and signal[10] == "sell" and signal[9] == "sell" and signal[8] == "sell" and signal[7] == "sell" and signal[6] == "sell" and signal[5] == "sell" and signal[4] == "sell" and signal[3] == "sell" and signal[2] == "sell" and signal[1] == "sell" and low[1] > low[10] and low[2] > low[10] and low[3] > low[10] and low[4] > low[10] and low[5] > low[10] and low[6] > low[10] and low[7] > low[10] and low[8] > low[10] and low[9] > low[10])
            strategy.entry("Short entry", strategy.short, qty = strategy.initial_capital / low[10], stop = low[10])
        // reach first red low 10 days after
        if (signal[10] != "sell" and signal[9] == "sell" and signal[8] == "sell" and signal[7] == "sell" and signal[6] == "sell" and signal[5] == "sell" and signal[4] == "sell" and signal[3] == "sell" and signal[2] == "sell" and signal[1] == "sell" and low[1] > low[9] and low[2] > low[9] and low[3] > low[9] and low[4] > low[9] and low[5] > low[9] and low[6] > low[9] and low[7] > low[9] and low[8] > low[9])
            strategy.entry("Short entry", strategy.short, qty = strategy.initial_capital / low[9], stop = low[9])
        // reach first red low 9 days after
        if (signal[9] != "sell" and signal[8] == "sell" and signal[7] == "sell" and signal[6] == "sell" and signal[5] == "sell" and signal[4] == "sell" and signal[3] == "sell" and signal[2] == "sell" and signal[1] == "sell" and low[1] > low[8] and low[2] > low[8] and low[3] > low[8] and low[4] > low[8] and low[5] > low[8] and low[6] > low[8] and low[7] > low[8])
            strategy.entry("Short entry", strategy.short, qty = strategy.initial_capital / low[8], stop = low[8])
        // reach first red low 8 days after
        if (signal[8] != "sell" and signal[7] == "sell" and signal[6] == "sell" and signal[5] == "sell" and signal[4] == "sell" and signal[3] == "sell" and signal[2] == "sell" and signal[1] == "sell" and low[1] > low[7] and low[2] > low[7] and low[3] > low[7] and low[4] > low[7] and low[5] > low[7] and low[6] > low[7])
            strategy.entry("Short entry", strategy.short, qty = strategy.initial_capital / low[7], stop = low[7])
        // reach first red low 7 days after
        if (signal[7] != "sell" and signal[6] == "sell" and signal[5] == "sell" and signal[4] == "sell" and signal[3] == "sell" and signal[2] == "sell" and signal[1] == "sell" and low[1] > low[6] and low[2] > low[6] and low[3] > low[6] and low[4] > low[6] and low[5] > low[6])
            strategy.entry("Short entry", strategy.short, qty = strategy.initial_capital / low[6], stop = low[6])
        // reach first red low 6 days after
        if (signal[6] != "sell" and signal[5] == "sell" and signal[4] == "sell" and signal[3] == "sell" and signal[2] == "sell" and signal[1] == "sell" and low[1] > low[5] and low[2] > low[5] and low[3] > low[5] and low[4] > low[5])
            strategy.entry("Short entry", strategy.short, qty = strategy.initial_capital / low[5], stop = low[5])
        // reach first red low 5 days after
        if (signal[5] != "sell" and signal[4] == "sell" and signal[3] == "sell" and signal[2] == "sell" and signal[1] == "sell" and low[1] > low[4] and low[2] > low[4] and low[3] > low[4])
            strategy.entry("Short entry", strategy.short, qty = strategy.initial_capital / low[4], stop = low[4])
        // reach first red low 4 days after
        if (signal[4] != "sell" and signal[3] == "sell" and signal[2] == "sell" and signal[1] == "sell" and low[1] > low[3] and low[2] > low[3])
            strategy.entry("Short entry", strategy.short, qty = strategy.initial_capital / low[3], stop = low[3])
        // reach first red low 3 days after
        if (signal[3] != "sell" and signal[2] == "sell" and signal[1] == "sell" and low[1] > low[2])
            strategy.entry("Short entry", strategy.short, qty = strategy.initial_capital / low[2], stop = low[2])
        // reach first red low 2 days after
        if (signal[2] != "sell" and signal[1] == "sell")
            strategy.entry("Short entry", strategy.short, qty = strategy.initial_capital / low[1], stop = low[1])
            
    // Exit when stop out or profit target is hit
    // Bracket order for entry 1 day after 1st red
    if (signal == "sell" and signal[1] == "sell" and signal[2] != "sell")
        long_stop_level = strategy.position_avg_price + (adr[1] * riskFactor)
        long_profit_level = strategy.position_avg_price - (adr[1] * rewardFactor)
        strategy.exit("TP/SL", "Short entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 2 day after 1st red
    if (signal == "sell" and signal[1] == "sell" and signal[2] == "sell" and signal[3] != "sell")
        long_stop_level = strategy.position_avg_price + (adr[2] * riskFactor)
        long_profit_level = strategy.position_avg_price - (adr[2] * rewardFactor)
        strategy.exit("TP/SL", "Short entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 3 day after 1st red
    if (signal == "sell" and signal[1] == "sell" and signal[2] == "sell" and signal[3] == "sell" and signal[4] != "sell")
        long_stop_level = strategy.position_avg_price + (adr[3] * riskFactor)
        long_profit_level = strategy.position_avg_price - (adr[3] * rewardFactor)
        strategy.exit("TP/SL", "Short entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 4 day after 1st red
    if (signal == "sell" and signal[1] == "sell" and signal[2] == "sell" and signal[3] == "sell" and signal[4] == "sell" and signal[5] != "sell")
        long_stop_level = strategy.position_avg_price + (adr[4] * riskFactor)
        long_profit_level = strategy.position_avg_price - (adr[4] * rewardFactor)
        strategy.exit("TP/SL", "Short entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 5 day after 1st red
    if (signal == "sell" and signal[1] == "sell" and signal[2] == "sell" and signal[3] == "sell" and signal[4] == "sell" and signal[5] == "sell" and signal[6] != "sell")
        long_stop_level = strategy.position_avg_price + (adr[5] * riskFactor)
        long_profit_level = strategy.position_avg_price - (adr[5] * rewardFactor)
        strategy.exit("TP/SL", "Short entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 6 day after 1st red
    if (signal == "sell" and signal[1] == "sell" and signal[2] == "sell" and signal[3] == "sell" and signal[4] == "sell" and signal[5] == "sell" and signal[6] == "sell" and signal[7] != "sell")
        long_stop_level = strategy.position_avg_price + (adr[6] * riskFactor)
        long_profit_level = strategy.position_avg_price - (adr[6] * rewardFactor)
        strategy.exit("TP/SL", "Short entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 7 day after 1st red
    if (signal == "sell" and signal[1] == "sell" and signal[2] == "sell" and signal[3] == "sell" and signal[4] == "sell" and signal[5] == "sell" and signal[6] == "sell" and signal[7] == "sell" and signal[8] != "sell")
        long_stop_level = strategy.position_avg_price + (adr[7] * riskFactor)
        long_profit_level = strategy.position_avg_price - (adr[7] * rewardFactor)
        strategy.exit("TP/SL", "Short entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 8 day after 1st red
    if (signal == "sell" and signal[1] == "sell" and signal[2] == "sell" and signal[3] == "sell" and signal[4] == "sell" and signal[5] == "sell" and signal[6] == "sell" and signal[7] == "sell" and signal[8] == "sell" and signal[9] != "sell")
        long_stop_level = strategy.position_avg_price + (adr[8] * riskFactor)
        long_profit_level = strategy.position_avg_price - (adr[8] * rewardFactor)
        strategy.exit("TP/SL", "Short entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 9 day after 1st red
    if (signal == "sell" and signal[1] == "sell" and signal[2] == "sell" and signal[3] == "sell" and signal[4] == "sell" and signal[5] == "sell" and signal[6] == "sell" and signal[7] == "sell" and signal[8] == "sell" and signal[9] == "sell" and signal[10] != "sell")
        long_stop_level = strategy.position_avg_price + (adr[9] * riskFactor)
        long_profit_level = strategy.position_avg_price - (adr[9] * rewardFactor)
        strategy.exit("TP/SL", "Short entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 10 day after 1st red
    if (signal == "sell" and signal[1] == "sell" and signal[2] == "sell" and signal[3] == "sell" and signal[4] == "sell" and signal[5] == "sell" and signal[6] == "sell" and signal[7] == "sell" and signal[8] == "sell" and signal[9] == "sell" and signal[10] == "sell" and signal[11] != "sell")
        long_stop_level = strategy.position_avg_price + (adr[10] * riskFactor)
        long_profit_level = strategy.position_avg_price - (adr[10] * rewardFactor)
        strategy.exit("TP/SL", "Short entry", stop=long_stop_level, limit=long_profit_level)
    // Bracket order for entry 11 day after 1st red
    if (signal == "sell" and signal[1] == "sell" and signal[2] == "sell" and signal[3] == "sell" and signal[4] == "sell" and signal[5] == "sell" and signal[6] == "sell" and signal[7] == "sell" and signal[8] == "sell" and signal[9] == "sell" and signal[10] == "sell" and signal[11] == "sell" and signal[12] != "sell")
        long_stop_level = strategy.position_avg_price + (adr[11] * riskFactor)
        long_profit_level = strategy.position_avg_price - (adr[11] * rewardFactor)
        strategy.exit("TP/SL", "Short entry", stop=long_stop_level, limit=long_profit_level)
    // ####################### End of Short Entry #######################

// Enxit the day after the trend is lost
if (time_cond and sideway)
    strategy.close("Long entry")
    strategy.close("Short entry")

// Close any open order out side of date range
if (not time_cond)
    strategy.close_all()
if (time_cond_skip)
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/431430

> Last Modified

2023-11-07 17:13:20
