
> Name

Dual-Moving-Average-Reversal-Trading-Strategy-431664

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f1451add346f545984.png)



## Overview

This strategy is designed based on the golden cross and dead cross of fast and slow moving averages. When the fast MA crosses above the slow MA, go long. When the fast MA crosses below the slow MA, go short. This strategy is suitable for medium-to-long term trading and can capture trend reversals in the market.

## Strategy Logic

The strategy uses exponential moving average (EMA) to calculate the fast and slow lines. The fast MA length is 10 periods and the slow MA length is 30 periods. The strategy first calculates the fast EMA and slow EMA, then plots the lines and shows different colored backgrounds to indicate the trend direction.

When today's close is above the fast MA and the fast MA is above the slow MA, the background is green, indicating an upward trend. When today's close is below the fast MA and the fast MA is below the slow MA, the background is red, indicating a downward trend.

In an upward trend, if there is a red candlestick (close below open) and yesterday was also a red candlestick, go long. Set stop loss at 300 points and take profit by closing short position. 

In a downward trend, if there is a green candlestick (close above open) and yesterday was also a green candlestick, go short. Set stop loss at 300 points and take profit by closing long position.

After opening a position in each direction, if the holding time exceeds 1008000000 milliseconds (about 2 weeks), force close the position to prevent deadlock.

## Advantage Analysis

- The dual EMA system can effectively filter market noise and identify trend reversal points
- Fast and slow MAs combined with candlestick colors provide reliable entry signals
- Stop loss and take profit strategies reduce losses for individual trades  
- Forced position close mechanism avoids huge losses from deadlocks

## Risk Analysis

- EMA system is less sensitive to price spikes, may miss some trading opportunities
- Improper fast and slow MA parameter settings may cause false signals
- Stop loss point too tight increases risk of liquidation. Stop loss too wide may cause unnecessary losses
- Improper forced close time setting may lead to premature exit or holding too long 

## Optimization Directions

- Test profitability of EMA systems under different parameters to optimize fast and slow MA lengths
- Consider adding other indicators like MACD for confirmation to improve signal accuracy
- Link stop loss to daily volume changes
- Dynamically adjust forced close time based on market volatility

## Conclusion

Overall this strategy is quite balanced, using dual EMA for trend and candlestick filters with additional rules to avoid false signals. But EMA parameters and stop loss/profit rules need further optimization. It is a reliable trend trading strategy on the whole.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|Fast Average Length|
|v_input_int_2|30|Slow Average Length|
|v_input_source_1_close|0|Average Data Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-10 00:00:00
end: 2023-11-09 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © yeainshukla

//@version=5


strategy('BuyRedSellGreen4H', overlay = true)
greenCandle = close > open
redCandle = open > close

start  = timestamp(2023,9,18,0,00)
end = timestamp(2023,12,31,0,00)


fastLength = input.int(10, title="Fast Average Length")
slowLength = input.int(30, title="Slow Average Length")

averageData = input.source(close, title="Average Data Source")

// Calculate exponential moving averages
fastAverage = ta.ema(averageData, fastLength)
slowAverage = ta.ema(averageData, slowLength)

// Plot averages
plot(fastAverage, color=color.navy, title="Fast EMA")
plot(slowAverage, color=color.fuchsia, linewidth=2, title="Slow EMA")

// Show the moving average trend with a coloured background
backgroundColor = if close > fastAverage and fastAverage > slowAverage
    color.new(color.green, 85)
else if close < fastAverage and fastAverage < slowAverage
    color.new(color.red, 85)
else
    color.new(color.orange, 90)

bgcolor(backgroundColor, title="EMA Background")


if time >= start and time < end
    if(close < open) 
        if(close[1] < open[1])
            strategy.entry("Enter Long", strategy.long)
            strategy.exit("Exit Long", from_entry="Enter Long")
            strategy.close("Enter Short")

    else
        if(close[1] > open[1])
            strategy.entry("Enter Short", strategy.short)
            strategy.exit("Exit Short", from_entry="Enter Short")
            strategy.close("Enter Long")
    if strategy.position_size < 0 or strategy.position_size > 0// short and long is opened.
        if((time - strategy.opentrades.entry_time(strategy.opentrades - 1)) > 1008000000)
            strategy.close("Enter Short")
            strategy.close("Enter Long")
```

> Detail

https://www.fmz.com/strategy/431664

> Last Modified

2023-11-10 11:18:38
