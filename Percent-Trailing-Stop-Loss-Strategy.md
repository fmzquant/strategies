
> Name

Percent-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy implements a configurable percentage trailing stop loss to manage trade risk. It allows setting long and short stop loss percentage from entry price for dynamic stop loss tracking.

## Strategy Logic

The main logic is:

1. Input long and short stop loss percentage
2. For longs: continually track lows and calculate stop loss line 
3. For shorts: continually track highs and calculate stop loss line
4. Exit positions when price touches stop loss line

The strategy allows customizing stop percentage, e.g. 10%. For longs, it dynamically calculates 10% above the low as the stop line. For shorts, 10% below the high.

This way, the stop line keeps moving favorably to maximize profit protection while controlling risk.

## Advantages

- Automates trailing stop loss without manual intervention
- Dynamic stop line protects profits as much as possible
- Customizable stop loss percentage for different instruments
- Helps control risk and reduce outsized losses  
- Easy to integrate into other strategies

## Risks and Mitigation 

- Slow trailing risks inability to stop out
- Stop loss too loose can increase losses
- Stop loss too tight risks over-frequent stops

Mitigations:

1. Optimize stop percentage to balance effectiveness
2. Incorporate other stop types like time-based stops
3. Tune stop based on market volatility  
4. Maintain stop consistency, avoid arbitrary changes

## Enhancement Opportunities

Enhancement opportunities:

1. Machine learning to dynamically optimize stop  
2. Auto-adjust based on max drawdown metrics
3. Incorporate indicators like moving averages for stop placement
4. Use different configurations based on volatility regime  
5. Set profit stops after partial stops to lock in profits

## Conclusion

This strategy provides an effective percentage trailing stop method to dynamically adjust stop loss. It maximizes profit protection while controlling risk. Enhancements through parameter optimization, indicator integration can make the stops more intelligent.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Long Trailing Stop (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © theCrypster

//@version=4
strategy("Percent Trailing Stop %", overlay=true)

//ENTER SOME SETUP TRADES FOR TSL EXAMPLE
longCondition = crossover(sma(close, 10), sma(close, 20))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = crossunder(sma(close, 10), sma(close, 20))
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
    

//TRAILING STOP CODE
trailStop = input(title="Long Trailing Stop (%)", type=input.float, minval=0.0, step=0.1, defval=10) * 0.01

longStopPrice = 0.0
shortStopPrice = 0.0
longStopPrice := if strategy.position_size > 0
    stopValue = close * (1 - trailStop)
    max(stopValue, longStopPrice[1])
else
    0
shortStopPrice := if strategy.position_size < 0
    stopValue = close * (1 + trailStop)
    min(stopValue, shortStopPrice[1])
else
    999999

//PLOT TSL LINES
plot(series=strategy.position_size > 0 ? longStopPrice : na, color=color.red, style=plot.style_linebr, linewidth=1, title="Long Trail Stop", offset=1, title="Long Trail Stop")
plot(series=strategy.position_size < 0 ? shortStopPrice : na, color=color.red, style=plot.style_linebr, linewidth=1, title="Short Trail Stop", offset=1, title="Short Trail Stop")


//EXIT TRADE @ TSL
if strategy.position_size > 0
    strategy.exit(id="Close Long", stop=longStopPrice)
if strategy.position_size < 0
    strategy.exit(id="Close Short", stop=shortStopPrice)

```

> Detail

https://www.fmz.com/strategy/427301

> Last Modified

2023-09-19 21:18:39
