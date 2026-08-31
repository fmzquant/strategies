
> Name

CCI-and-EMA-Based-Scalping-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15caac30779451f218a.png)
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
