
> Name

短期通道突破策略short-term-trading-strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b5390d5ac353f35e54.png)

[trans]

## 概述

该策略是一种基于通道指标的短期交易策略。它利用通道上下轨的突破来判断趋势的开始和结束,进而做出买卖决策。在强劲的趋势市场中,这种突破策略可以获得较好的收益。

## 策略原理

1. 该策略首先计算一定周期内的最高价和最低价,构建通道的上轨和下轨。

2. 如果价格上涨突破上轨,则做多入场。如果价格下跌突破下轨,则做空入场。

3. 采用移动止损来控制风险。止损线设置为通道的中线。

4. 有两个可选的退出规则:回归中线和移动止损。前者实现快速获利退出,后者控制风险。 

5. 可以根据市场环境选择通道周期,调整止损幅度等参数,实现策略的优化。

## 优势分析

1. 操作简单,容易实现。只需要监控价格与通道的关系,按规则开平仓。

2. 顺应趋势交易,不存在逆势的风险。

3. 通道清晰直观,形成明确的入场信号。

4. 具有较好的获利空间,通常能获得比较满意的回报。

5. 可调整的参数较多,可以针对不同市场进行优化。

## 风险分析

1. 突破不一定成功,存在被套的风险。需要及时止损。

2. 通道需要一定周期形成,不适用于震荡行情。

3. 回看通道中线止损可能过于保守,无法持有趋势。

4. 参数优化需要历史数据支持,实盘可能出现过优化。

5. 机械地买卖突破点可能增加交易次数和滑点成本。

## 优化方向

1. 评估不同周期参数的效果,选择最佳通道周期。

2. 测试回归中线止损和移动止损,选择更合适的退出机制。

3. 优化止损幅度,降低止损被触发的概率。

4. 加入趋势过滤,避免不合适的突破交易。

5. 考虑加大仓位,但要控制好风险。

## 总结

该策略整体来说是一个较为成熟的短期突破策略。它有明确的入场规则,风险控制措施到位,运行效果较好。通过参数优化可以进一步改善策略表现。但仍需注意一些固有缺点,需要针对不同市场调整。如果系统使用该策略,整体收益应该可以获得保障。

|| 

## Overview

This is a short-term trading strategy based on channel breakouts. It uses the breakouts of channel's upper and lower rail to determine the start and end of trends, and make trading decisions accordingly. In strong trending markets, this breakout strategy can generate decent profits.  

## Strategy Logic

1. The strategy first calculates the highest high and lowest low over a certain period to build the upper and lower rail of the channel.

2. If price breaks out above the upper rail, go long. If price breaks below the lower rail, go short. 

3. Use a moving stop loss to control risks. The stop loss is set at the middle line of the channel.

4. There are two optional exit rules: revert to the middle line or follow the moving stop loss. The former realizes profit quickly while the latter controls risks.

5. The channel period and other parameters can be tuned to optimize the strategy for different market conditions.

## Advantage Analysis 

1. Simple to implement. Just monitor the price-channel relationship and follow the rules to trade.

2. Trade along the trend, no counter-trend risks. 

3. Clear and intuitive channel gives explicit entry signals.

4. Good profit margin, can achieve satisfactory returns in most cases.

5. Many adjustable parameters for optimization across different markets.

## Risk Analysis

1. Breakout may fail, risks of being trapped exist. Timely stop loss needed.

2. Channel needs a period to form, not suitable for range-bound markets. 

3. Revert to middle stop loss may be too conservative, unable to hold trends.

4. Parameter optimization needs historical data, overfitting possible in live trading.

5. Mechanical trading of breakout points may increase trade frequency and slippage costs.

## Optimization Directions

1. Evaluate channels of different periods and select the optimal one.

2. Test reverting to middle and moving stop loss to find a better exit mechanism. 

3. Optimize the stop loss percentage to reduce chances of being stopped out. 

4. Add trend filter to avoid inappropriate breakout trades.

5. Consider increasing position size but control risks.

## Summary

Overall this is a mature short-term breakout strategy. It has clear entry rules, proper risk control, and works well in general. Further improvement can be achieved through parameter tuning. But inherent limitations should be noted, adjustments needed for different markets. If used systematically, it should deliver consistent overall profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|Channel Period for Long position|
|v_input_2|18|Channel Period for Short position|
|v_input_3|true|Is exit on Base Line?|
|v_input_4|46|Take Profit (%) for position|
|v_input_5|9|Stop Loss (%) for position|
|v_input_6|2005|Test Start Year|
|v_input_7|true|Test Start Month|
|v_input_8|true|Test Start Day|
|v_input_9|2050|Test End Year|
|v_input_10|12|Test End Month|
|v_input_11|30|Test End Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-18 00:00:00
end: 2023-10-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// Strategy testing and optimisation for free Bitmex trading bot 
// © algotradingcc 

//@version=4
strategy("Channel Break [for free bot]", overlay=true, default_qty_type= strategy.percent_of_equity, initial_capital = 1000, default_qty_value = 20, commission_type=strategy.commission.percent, commission_value=0.075)

//Options
buyPeriod = input(13, "Channel Period for Long position")
sellPeriod = input(18, "Channel Period for Short position")
isMiddleExit = input(true, "Is exit on Base Line?")
takeProfit = input(46, "Take Profit (%) for position")
stopLoss = input(9, "Stop Loss (%) for position")

// Test Start
startYear = input(2005, "Test Start Year")
startMonth = input(1, "Test Start Month")
startDay = input(1, "Test Start Day")
startTest = timestamp(startYear,startMonth,startDay,0,0)

//Test End
endYear = input(2050, "Test End Year")
endMonth = input(12, "Test End Month")
endDay = input(30, "Test End Day")
endTest = timestamp(endYear,endMonth,endDay,23,59)

timeRange = time > startTest and time < endTest ? true : false

// Long&Short Levels
BuyEnter = highest(buyPeriod)
BuyExit = isMiddleExit ? (highest(buyPeriod) + lowest(buyPeriod)) / 2: lowest(buyPeriod)

SellEnter = lowest(sellPeriod)
SellExit = isMiddleExit ? (highest(sellPeriod) + lowest(sellPeriod)) / 2: highest(sellPeriod)

// Plot Data
plot(BuyEnter, style=plot.style_line, linewidth=2, color=color.blue, title="Buy Enter")
plot(BuyExit, style=plot.style_line, linewidth=1, color=color.blue, title="Buy Exit", transp=50)
plot(SellEnter, style=plot.style_line, linewidth=2, color=color.red, title="Sell Enter")
plot(SellExit, style=plot.style_line, linewidth=1, color=color.red, title="Sell Exit", transp=50)

// Calc Take Profits & Stop Loss
TP = 0.0
SL = 0.0
if strategy.position_size > 0
    TP := strategy.position_avg_price*(1 + takeProfit/100)
    SL := strategy.position_avg_price*(1 - stopLoss/100)

if strategy.position_size > 0 and SL > BuyExit
    BuyExit := SL
    
if strategy.position_size < 0
    TP := strategy.position_avg_price*(1 - takeProfit/100)
    SL := strategy.position_avg_price*(1 + stopLoss/100)

if strategy.position_size < 0 and SL < SellExit
    SellExit := SL
    
    
// Long Position    
if timeRange and strategy.position_size <= 0
    strategy.entry("Long", strategy.long, stop = BuyEnter)
strategy.exit("Long Exit", "Long", stop=BuyExit, limit = TP, when = strategy.position_size > 0)


// Short Position
if timeRange and strategy.position_size >= 0
    strategy.entry("Short", strategy.short, stop = SellEnter)
    
strategy.exit("Short Exit", "Short", stop=SellExit, limit = TP, when = strategy.position_size < 0)

// Close & Cancel when over End of the Test
if time > endTest
    strategy.close_all()
    strategy.cancel_all()

```

> Detail

https://www.fmz.com/strategy/430143

> Last Modified

2023-10-25 14:40:21
