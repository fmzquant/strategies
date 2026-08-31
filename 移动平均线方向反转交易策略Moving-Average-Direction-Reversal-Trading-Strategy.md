
> Name

移动平均线方向反转交易策略Moving-Average-Direction-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The moving average direction reversal trading strategy is a strategy that judges the trend reversal when the moving average shows continuous up or down for several candles. This strategy determines trading opportunities to keep long or short by judging the direction of the moving average.

## Strategy Logic

The core logic of the moving average direction reversal trading strategy is:

1. Calculate the selected moving average, which can be Simple Moving Average (SMA), Exponential Moving Average (EMA), Weighted Moving Average (WMA) or Linear Regression Average.

2. Judge the size relationship between the current period moving average and the previous period moving average. If the current moving average is higher than the previous period, assign 1, otherwise assign 0.

3. Record the number of consecutive up and consecutive down periods. If the current period moving average is higher than the previous period, the consecutive up periods +1, and the consecutive down periods are cleared to zero; if the current period moving average is lower than the previous period, the consecutive down periods +1, and the consecutive up periods are cleared to zero.

4. When the number of consecutive up or consecutive down periods exceeds the user-defined threshold, make corresponding long or short operations. 

5. At the same time, color the candlestick bars and background colors to visually display the trend direction changes.

6. Optionally plot the moving average change curve to mark the inflection point.

This strategy judges the trend by counting the direction of the moving average for several consecutive candlesticks, and makes transactions by the duration of continuous long or short holding, instead of looking at a single candlestick. This can effectively filter the impact of shocks on trading.

## Advantages

The moving average direction reversal trading strategy has the following advantages:

1. Using moving averages to determine trend direction can effectively filter market noise.

2. Statistical changes in the direction of moving averages over a certain period of time to determine the timing of trend reversal and reduce trading risk.

3. Customizable moving average parameters and statistical period parameters to adapt to different varieties and market conditions.

4. Candlestick coloring intuitively displays trend direction changes as a visual aid. 

5. Flexibility to choose different types of moving averages.

6. Drawing a moving average change curve can clearly observe whether a reversal occurs.

7. Simple and clear rules, easy to understand and implement, suitable for beginners.

## Risks

The moving average direction reversal trading strategy also has some risks:

1. The lag of the moving average itself affects the timely capture of inflection points.

2. Delayed long and short decisions due to the statistical period may miss faster reversal opportunities.

3. An excessively long continuous cycle setting may miss the trend, while too short is prone to being trapped.

4. A large number of short trade signals may occur in oscillating markets.

5. Relying solely on the direction of the moving average cannot fully determine the real trend reversal, with some risk of false signals.

6. When the market changes dramatically, the moving average indicator itself will also change rapidly, with a higher probability of generating false signals. 

7. The reasonableness of the selection of moving average parameters must be concerned, otherwise it will fail.

Solutions:

1. Appropriately shorten the moving average cycle to improve sensitivity.

2. Use other indicators to filter signals and confirm trend reversal.

3. Optimize statistical cycle parameters to find a balance between reaction speed and stability.

4. Increase the stop loss range for hedging to control losses. 

5. Use multiple combinations of moving averages to improve accuracy.

## Optimization Directions

The moving average direction reversal trading strategy can be optimized in the following aspects:

1. Optimize moving average parameters, test moving averages of different length periods, and find the best parameters. Combinations of SMA, EMA, and WMA can be tried.

2. Incorporate other auxiliary indicators such as RSI and KD to improve signal reliability. 

3. Optimize the statistical consecutive period parameter to ensure reflecting the trend reversal while filtering out false signals as much as possible.

4. Add a stop loss mechanism to control single transaction losses.

5. Test the results of parameter optimization on different varieties and adjust the parameters according to different trading varieties.

6. Consider changing the fixed statistical period to an adaptive statistical period to make the strategy more flexible.

7. Try breakout opening positions when the moving average actually breaks through. 

8. Add judgment of the overall trend direction to avoid trading against the trend.

9. Improve the way the moving average curve is plotted, such as increasing curve smoothness.

## Summary 

The moving average direction reversal trading strategy determines the timing of continuous trend tracking by counting the consecutive rising or falling periods of the moving average. It can effectively filter market noise and seize opportunities when a trend reversal occurs. This strategy can flexibly adapt to different trading varieties and market environments through customizable moving average parameters and statistical cycle counts. However, the lag of the moving average itself easily causes identification delays for fast reversals. Therefore, parameters need to be optimized and adjusted, and other technical indicators assisted to improve signal accuracy. In general, the moving average direction reversal trading strategy has the advantage of being easy to grasp, and is a practical and recommended trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Enable Bar Color?|
|v_input_2|true|Enable Background Color?|
|v_input_3|false|Enable Moving Average Trend Line?|
|v_input_4|4|Consecutive Trend in Bars|
|v_input_5|true|Moving Average Length: (1 = off)|
|v_input_6|2|Moving Average: (1 = SMA), (2 = EMA), (3 = WMA), (4 = Linear)|
|v_input_7_close|0|Price Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Moving Average Consecutive Up/Down Strategy (by ChartArt)", overlay=true)

// ChartArt's Moving Average Consecutive Up/Down Strategy
//
// Version 1.0
// Idea by ChartArt on December 30, 2015.
//
// This strategy goes long (or short) if there are several
// consecutive increasing (or decreasing) moving average
// values in a row in the same direction.
//
// The bars can be colored using the raw moving average trend.
// And the background can be colored using the consecutive
// moving average trend setting. In addition a experimental
// line of the moving average change can be drawn.
//
// The strategy is based upon the "Consecutive Up/Down Strategy"
// created by Tradingview.


// Input
Switch1 = input(true, title="Enable Bar Color?")
Switch2 = input(true, title="Enable Background Color?")
Switch3 = input(false, title="Enable Moving Average Trend Line?")

ConsecutiveBars = input(4,title="Consecutive Trend in Bars",minval=1)

// MA Calculation
MAlen = input(1,title="Moving Average Length: (1 = off)",minval=1)
SelectMA = input(2, minval=1, maxval=4, title='Moving Average: (1 = SMA), (2 = EMA), (3 = WMA), (4 = Linear)')
Price = input(close, title="Price Source")
Current =
 SelectMA == 1 ? sma(Price, MAlen) :
 SelectMA == 2 ? ema(Price, MAlen) :
 SelectMA == 3 ? wma(Price, MAlen) :
 SelectMA == 4 ? linreg(Price, MAlen,0) :
 na
Last =
 SelectMA == 1 ? sma(Price[1], MAlen) :
 SelectMA == 2 ? ema(Price[1], MAlen) :
 SelectMA == 3 ? wma(Price[1], MAlen) :
 SelectMA == 4 ? linreg(Price[1], MAlen,0) :
 na

// Calculation
MovingAverageTrend = if Current > Last
    1
else
    0

ConsecutiveBarsUp = MovingAverageTrend > 0.5 ? nz(ConsecutiveBarsUp[1]) + 1 : 0
ConsecutiveBarsDown = MovingAverageTrend < 0.5 ? nz(ConsecutiveBarsDown[1]) + 1 : 0
BarColor = MovingAverageTrend > 0.5 ? green : MovingAverageTrend < 0.5 ? red : blue
BackgroundColor = ConsecutiveBarsUp >= ConsecutiveBars ? green : ConsecutiveBarsDown >= ConsecutiveBars ? red : gray
MovingAverageLine = change(MovingAverageTrend) != 0 ? close : na

// Strategy
if (ConsecutiveBarsUp >= ConsecutiveBars)
    strategy.entry("ConsUpLE", strategy.long, comment="Bullish")
    
if (ConsecutiveBarsDown >= ConsecutiveBars)
    strategy.entry("ConsDnSE", strategy.short, comment="Bearish")

// output
barcolor(Switch1?BarColor:na)
bgcolor(Switch2?BackgroundColor:na)
plot(Switch3?MovingAverageLine:na, color=change(MovingAverageTrend)<0?green:red, linewidth=4)
//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/428093

> Last Modified

2023-09-28 15:50:01
