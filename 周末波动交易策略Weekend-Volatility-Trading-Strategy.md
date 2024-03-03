
> Name

周末波动交易策略Weekend-Volatility-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11b42fbd318f4ddcab1.png)
[trans]

## 概述

该策略根据周五收盘价设定长仓和空仓的入场条件,在周六和周日开盘时做多做空,周一开盘前平仓。策略通过捕捉周五收盘价附近的价格波动来实现盈利。

## 原理

1. 记录周五的收盘价作为参考价
2. 周六周日开盘时:
   - 如果价格高于周五收盘价的4.5%,做空
   - 如果价格低于周五收盘价的4.5%,做多
3. 止盈设置为初始资金的3%
4. 周一开盘前平仓所有头寸

## 优势分析

1. 利用周六周日的低交易量导致的价格波动进行交易,降低市场风险
2. 明确的入场和出场条件,降低策略实施难度
3. 短线操作,追求稳定的小盈利
4. 周期短,资金周转快

## 风险分析

1. 周六周日价格波动可能小于预期,无法打开仓位
2. 波动过大导致止损
3. 周一重大事件导致价格跳空,无法及时止损

风险解决方案:

1. 调整入场条件的波动幅度
2. 合理设置止损点
3. 提前平仓,不持仓过周末

## 优化方向 

1. 根据不同品种的特点调整入场幅度
2. 根据回测结果优化止盈条件
3. 根据资金规模选择不同的杠杆
4. 结合均线指标过滤入场时机

## 总结

该策略作为一个短线交易策略,具有非常明确的交易逻辑和风险控制措施。通过合理的参数设置和不断测试优化,可以获得稳定的投资收益。同时也需要注意周未价格波动过大导致的亏损风险,通过风险管理来控制损失。

||


## Overview

This strategy sets long and short entry conditions based on Friday's closing price, and goes long or short after Saturday's and Sunday's opening, exiting all positions before Monday's opening. The strategy aims to profit from price fluctuations around Friday's closing price over the weekend.

## Principles 

1. Record Friday's closing price as the reference price
2. On Saturday and Sunday's opening:
   - If price is above 105% of Friday's close, go short
   - If price is below 95% of Friday's close, go long
3. Take profit is set at 3% of initial capital 
4. Close all positions before Monday's opening

## Advantage Analysis

1. Trade on weekend's low volume and volatility to reduce market risk
2. Clear entry and exit rules simplify strategy execution 
3. Pursue steady small profits with short-term trades
4. High capital turnover with short cycle

## Risk Analysis

1. Weekend price fluctuation may be smaller than expected, unable to open positions
2. Excessive volatility may cause stop loss
3. Significant events on Monday may cause price gaps, unable to stop loss in time

Risk Solutions:

1. Adjust fluctuation range for entries
2. Set proper stop loss points
3. Close positions early, avoid holding over weekends

## Optimization Guidelines

1. Adjust entry thresholds based on different products' characteristics
2. Optimize take profit rules based on backtest results
3. Select leverage based on capital size
4. Add indicator filters such as moving average to time entries

## Summary

This short-term trading strategy has very clear logic and risk control measures. With proper parameter tuning and continuous testing and optimization, it can generate steady investment returns. At the same time, the risk of large weekend losses due to excessive volatility needs to be managed via proper risk control.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Leverage|
|v_input_2|0.03|Profit Taking Percent Threshold|
|v_input_3|2017|Backtest Start Year|
|v_input_4|12|Backtest Start Month|
|v_input_5|10|Backtest Start Day|
|v_input_6|2025|Backtest Stop Year|
|v_input_7|12|Backtest Stop Month|
|v_input_8|30|Backtest Stop Day|
|v_input_9|true|Color Background?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-11-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Copyright Boris Kozak 
strategy("XBT Weekend Trade Strategy", overlay=true, default_qty_type=strategy.percent_of_equity,initial_capital=20000)
leverage = input(1,"Leverage")
profitTakingPercentThreshold = input(0.03,"Profit Taking Percent Threshold")

//****Code used for setting up backtesting.****///
testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(12, "Backtest Start Month")
testStartDay = input(10, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2025, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FFFF : na
bgcolor(testPeriodBackgroundColor, transp=50)

testPeriod() => true
    
//****END Code used for setting up backtesting.****///


//*** Main entry point is here***//
// Figure out how many days since the Friday close 
days_since_friday = if dayofweek == 6
    0
else 
    if dayofweek == 7
        1
    else
        if dayofweek == 1
            2
        else
            if dayofweek == 2
                3
            else
                if dayofweek == 3
                    4
                else
                    if dayofweek == 4
                        5
                    else
                        6
    
// Grab the Friday close price
fridaycloseprice = request.security(syminfo.tickerid,'D',close[days_since_friday])
plot(fridaycloseprice)
strategy.initial_capital = 50000
// Only perform backtesting during the window specified 
if testPeriod()
    // If we've reached out profit threshold, exit all positions 
    if ((strategy.openprofit/strategy.initial_capital) > profitTakingPercentThreshold)
        strategy.close_all()
    // Only execute this trade on saturday and sunday (UTC)
    if (dayofweek == 7.0 or dayofweek == 1.0)
        // Begin - Empty position (no active trades)
        if (strategy.position_size == 0)
            // If current close price > threshold, go short 
            if ((close>fridaycloseprice*1.045))
                strategy.entry("Short Entry", strategy.short, leverage)
            else
                // If current close price < threshold, go long
                if (close<(fridaycloseprice*0.955))
                    strategy.entry("Long Entry",strategy.long, leverage)
        // Begin - we already have a position
        if (abs(strategy.position_size) > 0)
            // We are short 
            if (strategy.position_size < 0)
                if ((close>strategy.position_avg_price*1.045))
                    // Add to the position
                    strategy.entry("Adding to Short Entry", strategy.short, leverage)
            else
                strategy.entry("Long Entry",strategy.long,leverage)
    // On Monday, if we have any open positions, close them 
    if (dayofweek==2.0)
        strategy.close_all()
 





```

> Detail

https://www.fmz.com/strategy/432304

> Last Modified

2023-11-16 10:53:01
