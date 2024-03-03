
> Name

基于CCI和EMA的短线震荡策略CCI-and-EMA-Based-Scalping-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15caac30779451f218a.png)
 [trans]
## 概述

本策略是一种短线震荡交易策略,它结合了EMA均线指标和CCI指标来识别市场的短线趋势和超买超卖状态,以捕捉短线价格波动的机会。

## 策略原理

该策略主要利用10日EMA,21日EMA和50日EMA三条均线以及CCI指标来判断入场和出场时机。

具体逻辑是:
当短期均线(10日EMA)上穿中期均线(21日EMA)并且短期均线高于长期均线(50日EMA),同时CCI指标大于0时视为多头信号,做多;当短期均线下穿中期均线并且短期均线低于长期均线,同时CCI指标小于0时视为空头信号,做空。

平仓逻辑是短期均线重新跨过中期均线时平仓。

## 策略优势

1. 结合均线系统和CCI指标,可以有效识别短线价格波动的趋势方向和超买超卖状态。

2. 利用均线金叉和死叉来判断entries和exists,简单实用。 

3. CCI指标的参数和周期设置较为合理,可以滤除部分假信号。

4. 采用多时间周期均线,可以在震荡市中获取较好的操作机会。

## 策略风险

1. 短线操作波动大,连续止损可能会比较多。

2. CCI指标参数设置不当可能增多假信号。

3. 震荡盘整理期间,该策略可能出现多次小亏损。

4. 只适合短线频繁操作的交易者,不适合长线持有。

对应的风险应对措施包括:优化CCI参数,调整止损位置,增加 FILTER 条件等。

## 策略优化方向  

1. 可以测试不同长度的EMA均线组合,优化参数。

2. 可以加入其他指标或Filter条件来过滤掉部分假信号。例如MACD,KDJ等。

3. 可以通过动态追踪止损来控制单笔亏损。

4. 可以结合更高时间周期的趋势指标,避免逆势操作。


## 总结

本策略整体来说是一个典型的短线震荡策略,利用均线指标的金叉死叉结合CCI指标的超买超卖状态来捕捉价格的短期反转机会。该策略适合短线频繁交易,但需要承受一定的止损压力。通过参数优化和增加filter条件可以进一步提高策略稳定性和盈利能力。

|| 

# Overview

This is a short-term oscillation trading strategy that combines the EMA indicator and CCI indicator to identify short-term trends and overbought/oversold levels in the market, in order to capture opportunities from short-term price fluctuations.  

# Strategy Logic

The strategy mainly uses the 10-day EMA, 21-day EMA and 50-day EMA lines and the CCI indicator to determine entry and exit timing.  

The specific logic is: 
When the short-term moving average (10-day EMA) crosses above the medium-term moving average (21-day EMA) and the short-term moving average is higher than the long-term moving average (50-day EMA), and at the same time the CCI indicator is greater than 0, it is considered a bullish signal to go long. When the short-term moving average crosses below the medium-term moving average and the short-term moving average is lower than the long-term moving average, and at the same time the CCI indicator is less than 0, it is considered a bearish signal to go short.

The exit logic is to close the position when the short-term moving average crosses back over the medium-term moving average.

# Advantages

1. Combining moving average system and CCI indicator can effectively identify short-term price trends and overbought/oversold levels.

2. Using moving average crossovers to determine entries and exits is simple and practical.

3. CCI parameter and cycle settings are more reasonable to filter out some false signals. 

4. Adopting multiple timeframes of moving averages can get better trading opportunities in oscillating markets.

# Risks 

1. Large fluctuations in short-term operations may lead to consecutive stop loss. 

2. Improper CCI parameter settings may increase false signals.

3. During range-bound and consolidation periods, this strategy may encounter multiple small losses.

4. Only suitable for short-term frequent traders, not suitable for long-term holding.

Corresponding risk mitigation measures include: optimizing CCI parameters, adjusting stop loss position, adding FILTER conditions, etc.

# Optimization Directions

1. Different combinations of EMA lengths can be tested to optimize parameters.

2. Other indicators or filter conditions can be added to filter out some false signals, such as MACD, KDJ etc.

3. Use dynamic trailing stop loss to control single loss.  

4. Combining higher timeframe trend indicators can avoid trading against the trend.


# Conclusion

Overall, this is a typical short-term oscillation strategy that uses the crossover of moving average lines combined with the overbought/oversold status of the CCI indicator to capture short-term reversal opportunities. This strategy is suitable for frequent short-term trading, but needs to withstand certain stop loss pressure. The stability and profitability of the strategy can be further improved through parameter optimization and adding filter conditions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Exponential MA|
|v_input_2|1000|Take Profit|
|v_input_3|200|Stop Loss|
|v_input_4|200|Trailing Stop Loss|
|v_input_5|false|Trailing Stop Loss Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-31 00:00:00
end: 2024-01-30 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//study(title="Strat CCI EMA scalping", shorttitle="EMA-CCI-strat", overlay=true)
strategy("Strat CCI EMA scalping", shorttitle="EMA-CCI-strat", overlay=true)

exponential = input(true, title="Exponential MA")

// the risk management inputs
inpTakeProfit   = input(defval = 1000, title = "Take Profit", minval = 0)
inpStopLoss     = input(defval = 200, title = "Stop Loss", minval = 0)
inpTrailStop    = input(defval = 200, title = "Trailing Stop Loss", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)

// === RISK MANAGEMENT VALUE PREP ===
// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

src = close

ma10 = exponential ? ema(src, 10) : sma(src, 10)
ma21 = exponential ? ema(src, 21) : sma(src, 21)
ma50 = exponential ? ema(src, 50) : sma(src, 50)

xCCI = cci(close, 200)

//buy_cond = cross(ma21, ma50) and ma10 > ma21 and (xCCI > 0)
//sell_cond = cross(ma21, ma50) and ma10 < ma21  and (xCCI < 0)

buy_cond = ma10 > ma21 and ma10 > ma50 and xCCI > 0
sell_cond = ma10 < ma21 and ma10 < ma50 and xCCI < 0



// === STRATEGY - LONG POSITION EXECUTION ===
enterLong() => buy_cond
exitLong() => ma10 < ma21
strategy.entry(id = "Long", long = true, when = enterLong()) // use function or simple condition to decide when to get in
strategy.close(id = "Long", when = exitLong()) // ...and when to get out
// === STRATEGY - SHORT POSITION EXECUTION ===
enterShort() => sell_cond
exitShort() => ma10 > ma21
strategy.entry(id = "Short", long = false, when = enterShort())
strategy.close(id = "Short", when = exitShort())

// === STRATEGY RISK MANAGEMENT EXECUTION ===
// finally, make use of all the earlier values we got prepped
//strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
//strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)




//longCondition = buy_cond
//if(longCondition)
//    strategy.entry("Long", strategy.long)
//    strategy.exit("Close Long", "Long", when = exitLong())
    
//shortCondition = sell_cond
//if(shortCondition)
//    strategy.entry("Short", strategy.short)
//    strategy.exit("Close Short", "Short",  when = exitShort())

//plotshape(buy_cond, style=shape.flag, color=green, size=size.normal)
//plotshape(sell_cond, style=shape.flag, color=red, size=size.normal)

c1 = buy_cond==1 ? lime : sell_cond==1 ? red : #a3a3a3 // color

plot( ma10, color=red, style=line, title="10", linewidth=1)
plot( ma21, color=orange, style=line, title="21", linewidth=1)
plot( ma50, color=c1, style=line, title="50", linewidth=3)

//alertcondition(buy_cond, title = "Buy Condition", message = "Buy Condition Alert")
//alertcondition(sell_cond, title = "Sell Condition", message = "Sell Condition Alert")
```

> Detail

https://www.fmz.com/strategy/440550

> Last Modified

2024-01-31 16:01:21
