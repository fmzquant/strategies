
> Name

基于线性回归通道的突破交易策略Linear-Regression-Channel-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ce590d0adbb12ba64d.png)

## Overview

This strategy uses the upper and lower bands of the linear regression channel, combined with double standard deviation to set breakout buy and sell signals, to establish positions when prices break out. It also uses the crossover of the middle line of the channel as the profit-taking signal to lock in profits.  

## Strategy Logic

The core logic of this strategy is based on the upper band, lower band and middle line of the linear regression channel. The specific calculation process is as follows:

1. Calculate the linear regression value linreg of prices, and the next period's linear regression value linreg_p

2. Calculate the slope slope and intercept intercept of the linear regression line based on linreg

3. Calculate the deviation deviation of prices relative to the regression line 

4. Set the multiple dev of the deviation to get the offset of the upper and lower bands

5. When price breaks out upwards from the lower band, set buy signal buy

6. When price breaks out downwards from the upper band, set sell signal sell

7. When price reverses from the middle line of the channel, set take profit signal exit

8. Set up trading logic based on buy, sell and exit signals

## Advantage Analysis 

The biggest advantage of this strategy is that it utilizes the medium and long term trend reflected by the linear regression channel. Specifically:

1. The upper and lower bands can effectively reflect the normal range of price fluctuations. Using them to set trading signals can reduce false signals.

2. The middle line crossover as the profit-taking signal can maximize profits and avoid losses caused by reversals after making profits.

3. The linear regression channel has some lag, which can effectively filter out short-term market noise and make trading signals more reliable. 

4. This strategy has few parameters and is easy to implement, suitable for algorithmic trading.

## Risk Analysis

There are some risks to this strategy:

1. The lag of the linear regression channel may miss trends after drastic short-term changes. The period can be shortened to optimize.

2. Improper setting of the deviation multiplier can also lead to false signals. Parameters can be optimized through backtesting.

3. Relying solely on breakout signals can lead to whipsaw losses. Other indicators can be used for signal filtering.

4. There are some curve fitting risks. Combining with other channel indicators or testing different data sources may help.  

## Optimization Directions

The main optimization directions for this strategy:

1. Optimize the length of the linear regression channel to balance lag and sensitivity.  

2. Optimize the deviation multiplier to improve signal quality while maximizing risk control.

3. Add other indicators for signal filtering to improve win rate, e.g. EMA, KDJ etc.  

4. Add stop loss mechanisms such as ATR trailing stop loss.

5. Test the impact of different data sources on the strategy, e.g. adjusted close, index data etc.   

6. Dynamically adjust parameters or signal weights based on market conditions.

## Conclusion  

In summary, this is a breakout system using linear regression channel as the signal indicator. The strategy logic is clear and easy to understand, with few parameters, making live trading relatively easy to implement. However, how to dynamically optimize parameters based on changing market conditions and combine other indicators for signal filtering is key to the success of this strategy. Through continuous testing and optimization, this strategy can become a stable profit-generating quantitative system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|100|length|
|v_input_3|false|offset|
|v_input_4|2|Deviation|
|v_input_5|true|smoothing|
|v_input_6||Resolution|
|v_input_7|0|Signals Display: Recent|All|
|v_input_8|false|End At Bar Index|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Robotrading
//@version=4

strategy("robotrading linreg", "linreg", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 10, commission_value = 0.1)

//Settings
source      = input(close)
length      = input(100, minval=1)
offset      = input(0, minval=0)
dev         = input(2.0, "Deviation")
smoothing   = input(1, minval=1)
mtf_val     = input("", "Resolution", input.resolution)
signals     = input("Recent", "Signals Display", options=["Recent", "All"])
goto        = input(0, "End At Bar Index")

//Lin.reg.
cc(x) => x=="Red"?color.red:x=="Lime"?color.lime:x=="Orange"?color.orange:x=="Teal"?color.teal:x=="Yellow"?color.yellow:x=="Black"?color.black:color.white
data(x) => sma(security(syminfo.tickerid, mtf_val!="" ? mtf_val : timeframe.period, x), smoothing)
linreg = data(linreg(source, length, offset))
linreg_p = data(linreg(source, length, offset+1))

//Deviation
x = bar_index
slope = linreg - linreg_p
intercept = linreg - x*slope
deviationSum = 0.0
for i = 0 to length-1
    deviationSum:= deviationSum + pow(source[i]-(slope*(x-i)+intercept), 2)  
deviation = sqrt(deviationSum/(length))
x1 = x-length
x2 = x
y1 = slope*(x-length)+intercept
y2 = linreg

//Cross
dm_current = -deviation*dev + y2
dp_current = deviation*dev + y2
ex_current = (dm_current + dp_current) / 2
buy = crossunder(close, dm_current)
sell = crossover(close, dp_current)
exit = crossover(close, ex_current) or crossunder(close, ex_current)

//Channel
updating = goto <= 0 or x < goto
// if updating
//     line b = line.new(x1, y1, x2, y2, xloc.bar_index, extend.right, color.aqua, width = 3)
//     line.delete(b[1])
//     line dp = line.new(x1, deviation*dev + y1, x2, deviation*dev + y2, xloc.bar_index, extend.right, color.red, width = 3)
//     line.delete(dp[1])
//     line dm = line.new(x1, -deviation*dev + y1, x2, -deviation*dev + y2, xloc.bar_index, extend.right, color.lime, width = 3)
//     line.delete(dm[1])

//Lines
plot(dm_current, color = color.lime)
plot(dp_current, color = color.red)
plot(ex_current)
    
//Trading
if ex_current > 0
    strategy.entry("Long", strategy.long, na, limit = dm_current)
    strategy.entry("Short", strategy.short, na, limit = dp_current)
    strategy.exit("ExitLong", "Long", limit = ex_current)
    strategy.exit("ExitShort", "Short", limit = ex_current)
```

> Detail

https://www.fmz.com/strategy/441996

> Last Modified

2024-02-18 15:00:53
