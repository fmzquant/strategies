
> Name

基于拉里康诺斯的经典策略Oscillation-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b7835c2a25b928ae0c.png)

[trans]


## 概述

本策略基于拉里·康诺斯的经典策略思想,利用双均线系统捕捉市场的中短线震荡,在超买超卖区实现落袋为安的操作策略。

## 策略原理

1. 使用2周期RSI指标判断股价是否处于超卖区域。

2. 使用长周期均线(200周期)判断大趋势方向。只有当价格高于长周期均线时才考虑建仓。

3. 当价格高于长周期均线且RSI指标低于超卖线时,以市价单开仓做多。

4. 当价格上涨突破短周期均线(5周期)时,以市价单全平多单止盈。

此外,策略还提供以下可配置选项:

- RSI参数:周期长度、超买超卖线位置。

- 均线参数:长短均线周期。 

- RSI均线过滤:添加RSI均线判断,避免RSI指标震荡过激。

- 止损设置:可选择是否添加止损。

## 优势分析

1. 使用双均线系统,能够有效跟踪中长线趋势。

2. RSI指标避免在剧烈震荡中错失最佳入场时机。

3. 可配置灵活,适合不同参数优化。

4. rundown突破策略,不容易漏单。

## 风险分析

1. 双均线策略对参数敏感,需要优化参数以达到最佳效果。

2. 无止损设置存在亏损扩大的风险。需要谨慎资金管理,控制单笔仓位规模。

3. 震荡行情中虚假突破可能存在亏损风险。可以考虑优化均线周期或添加其他条件作为过滤器。

4. 回测数据拟合风险。需在多市场多时间段验证策略稳健性。

## 优化方向

1. 测试优化RSI和均线的参数组合,找到最佳参数。

2. 测试不同的入场过滤条件,如交易量突增等,减少虚假信号。 

3. 加入跟踪止损来控制单笔亏损。需要评估止损设置对总体盈利的影响。

4. 评估不同持仓时间对盈利的影响,寻找最佳持仓周期。

5. 在更长的时间周期(如日线级别)测试策略稳健性。

## 总结

本策略整合了双均线趋势跟踪和RSI指标的超买超卖特性,是一种典型的突破系统。通过参数优化、严格的资金管理和稳健性验证,该策略可以成为量化交易的有力工具。但是交易者需要警惕回测过拟合问题,在实盘中继续调整和完善策略,使之适应多变的市场环境。

||


## Overview

This strategy is based on the classic idea of Larry Connors, using double moving average system to capture the medium-term oscillation of the market and take profit when it is overbought or oversold.

## Strategy Logic

1. Use 2-period RSI to determine if the price is in oversold region.  

2. Use long period moving average (200 periods) to determine the major trend direction. Only consider opening position when price is above the long MA.

3. When price is above long MA and RSI is below oversold line, open long position at market price.  

4. When price breaks through short period MA (5 periods) upwards, close long position at market price to take profit.

In addition, the strategy provides the following configurable options:

- RSI parameters: period length, overbought/oversold levels.

- MA parameters: long and short period.

- RSI MA filter: add RSI MA to avoid RSI fluctuation. 

- Stop loss: configurable to add stop loss or not.

## Advantage Analysis

1. The double MA system can effectively track medium-long term trends.

2. RSI avoids missing the best entry timing during violent fluctuation. 

3. Flexible configuration suitable for parameter optimization.

4. Breakthrough strategy, not likely to miss signals.

## Risk Analysis

1. Double MA strategy is sensitive to parameters, requiring optimization to achieve best performance.

2. No stop loss brings risk of expanding losses. Cautious position sizing is needed. 

3. False breakout risks losses in oscillating market. Consider optimizing MA periods or adding other filters.

4. Backtest overfitting risk. Requires validation across markets and time periods.

## Optimization Directions

1. Test and optimize combinations of RSI and MA parameters to find optimum.

2. Test additional entry filters like volume spike to reduce false signals.

3. Add trailing stop loss to control single trade loss. Assess impact on overall profitability.

4. Evaluate impact of different holding periods to find optimal.

5. Test robustness in longer timeframes like daily.

## Summary

This strategy combines double MA trend tracking and RSI overbought/oversold to form a typical breakout system. With parameter optimization, strict risk management and robustness validation, it can become a powerful quantitative trading tool. But traders should beware of backtest overfitting and keep improving the strategy to adapt to changing market conditions.

[/trans]


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|RSI Lenght|
|v_input_2|10|OverBought Level for RSI|
|v_input_3|5|Short MA Length|
|v_input_4|200|Long MA Length|
|v_input_5|true|RSI Moving Average Filter|
|v_input_6|4|RSI Moving Average Length|
|v_input_7|30|OverBought Level for the Moving Average of the RSI|
|v_input_8|false|Apply Stop Loss|
|v_input_9|10|% Stop Loss|
|v_input_10|2009|Backtest Start Year|
|v_input_11|true|Backtest Start Month|
|v_input_12|2|Backtest Start Day|
|v_input_13|2020|Backtest Stop Year|
|v_input_14|12|Backtest Stop Month|
|v_input_15|30|Backtest Stop Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-26 00:00:00
end: 2023-10-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("RSI Strategy", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

//Starter Parameters

length = input(title="RSI Lenght", defval=2)
overBoughtRSI = input(title="OverBought Level for RSI",  defval=10)
shortLength = input(title="Short MA Length",  defval=5)
longLength = input(title="Long MA Length",  defval=200)

RuleMRSI=input(title="RSI Moving Average Filter", defval= true)
lengthmrsi=input(title="RSI Moving Average Length",  defval=4)
overBoughtMRSI=input(title="OverBought Level for the Moving Average of the RSI",  defval=30)

Rulestop=input(title="Apply Stop Loss", defval=false)
stop_percentual=input(title="% Stop Loss",  defval=10)

//RSI

vrsi = rsi(close, length)

//Moving Averages

longma = sma(close,longLength)
shortma = sma(close,shortLength)
mrsi=sma(vrsi,lengthmrsi)

//Stop Loss

stop_level = strategy.position_avg_price*((100-stop_percentual)/100)

//Backtest Period
testStartYear = input(2009, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(2, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2020, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => true
    
//Strategy

if testPeriod() and (not na(vrsi))
    if  (RuleMRSI==false) and (Rulestop==false)
        if (vrsi<overBoughtRSI) and (close>longma)
            strategy.entry("RsiLE", strategy.long , comment="Open")
        if (close>shortma)
            strategy.close_all()

    if (RuleMRSI==true) and (Rulestop==false)
        if (vrsi<overBoughtRSI) and (close>longma) and (mrsi<overBoughtMRSI)
            strategy.entry("RsiLE", strategy.long , comment="Open")
        if (close>shortma)
            strategy.close_all()

    if (RuleMRSI==false) and (Rulestop==true)
        if (vrsi<overBoughtRSI) and (close>longma)
            strategy.entry("RsiLE", strategy.long , comment="Open")
            strategy.exit("RsiLE", stop = stop_level)
        if (close>shortma)
            strategy.close_all()

    if (RuleMRSI==true) and (Rulestop==true)
        if (vrsi<overBoughtRSI) and (close>longma) and (mrsi<overBoughtMRSI)
            strategy.entry("RsiLE", strategy.long , comment="Open")
            strategy.exit("RsiLE", stop = stop_level)
        if (close>shortma)
            strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430374

> Last Modified

2023-10-27 16:32:19
