
> Name

Fixed-Percentage-Stop-Loss-and-Take-Profit-Strategy-Based-on-Moving-Averages

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1647b4adedce67bcac1.png)

## Overview

This strategy uses moving averages to generate trading signals and sets fixed percentage stop loss and take profit levels based on the entry price to control the risk and reward of each trade.

## Strategy Logic

The strategy first uses the 5-day exponential moving average (EMA) and 32-day EMA to determine the trend direction. It goes long when the short-term moving average crosses above the long-term one and goes short on cross under.  

After entering a trade, the strategy dynamically sets the stop loss and take profit for each trade based on the user-defined stop loss percentage and take profit percentage. Specifically, for long trades, the stop loss is set at the entry price × (1 - stop loss percentage) and take profit is set at entry price × (1 + take profit percentage). For short trades it is reversed - stop loss at entry price × (1 + stop loss percentage) and take profit at entry price × (1 - take profit percentage).

This allows ensuring fixed risk/reward ratio for each trade and controlling the risk and profit.

## Advantage Analysis 

This way of setting stop loss and take profit has several significant advantages:

1. It can limit the maximum loss per trade and effectively control trading risk. 

2. It can lock in fixed profit ratio per trade and ensure return.

3. The stop loss and take profit points vary with the actual entry price instead of using fixed values. 

4. Users can determine their risk appetite by adjusting the input parameters.

5. Simple and intuitive strategy logic, easy to understand and verify.

## Risk Analysis

There are also some risks with this strategy:

1. Moving averages may generate excessive invalid signals, with high chance of being stopped out after entry.

2. Take profit ratio set too high may result insufficient profitability, too low may fail to win enough.

3. Stop loss too close may increase the chance of being stopped out and should give some buffer.  

4. Choice of trading products and timeframes may affect the effectiveness.

Corresponding solutions:

1. Optimize moving average parameters to reduce false signals.  

2. Test different take profit ratios to find optimum.

3. Adjust stop loss distance based on market volatility.  

4. Evaluate strategy performance across different products and timeframes.


## Optimization Directions

The strategy can be improved in the following aspects:

1. Add other indicators for trend validation to avoid excessive false signals from moving averages.

2. Optimize the stop loss and take profit percentages based on backtest data to find optimum parameters.

3. Change stop loss to trailing stop to lock in more running profit.

4. Add position sizing rules with pyramiding and stop loss to manage trade risk.

5. Assess performance variance across different trading instruments and timeframes.


## Summary

This strategy identifies trend direction with moving averages, and sets fixed percentage stop loss and take profit based on entry price to control single trade risk and reward. Its advantage is effectively limiting losses, ensuring profit ratio, with simple and straightforward logic. Proper configuration of stop loss/take profit parameters, selection of trading products and timeframes, and various ways to further optimize the strategy need to be noted.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Stop Loss %|
|v_input_2|10|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © theCrypster 2020

//@version=4
strategy("Fixed Percent Stop Loss & Take Profit %", overlay=true)

// Moving Averages to get some example trades generated
eg1 = ema(close, 5)
eg2 = ema(close, 32)

long = crossover(eg1, eg2)
short = crossunder(eg1, eg2)

strategy.entry("LONG", strategy.long, when=long)
strategy.entry("SHORT", strategy.short, when=short)

//
// The Fixed Percent Stop Loss Code
// User Options to Change Inputs (%)
stopPer = input(5.0, title='Stop Loss %', type=input.float) / 100
takePer = input(10.0, title='Take Profit %', type=input.float) / 100

// Determine where you've entered and in what direction
longStop = strategy.position_avg_price * (1 - stopPer)
shortStop = strategy.position_avg_price * (1 + stopPer)
shortTake = strategy.position_avg_price * (1 - takePer)
longTake = strategy.position_avg_price * (1 + takePer)

if strategy.position_size > 0 
    strategy.exit(id="Close Long", stop=longStop, limit=longTake)
if strategy.position_size < 0 
    strategy.exit(id="Close Short", stop=shortStop, limit=shortTake)

//PLOT FIXED SLTP LINE
plot(strategy.position_size > 0 ? longStop : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Long Fixed SL")
plot(strategy.position_size < 0 ? shortStop : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Short Fixed SL")
plot(strategy.position_size > 0 ? longTake : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Long Take Profit")
plot(strategy.position_size < 0 ? shortTake : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Short Take Profit")

//



```

> Detail

https://www.fmz.com/strategy/435714

> Last Modified

2023-12-18 11:30:39
