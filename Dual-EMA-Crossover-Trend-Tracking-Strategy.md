
> Name

Dual-EMA-Crossover-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17191b438ad87390cb8.png)

## Overview

The Dual EMA Crossover Trend Tracking strategy is a quantitative trading strategy that uses dual EMA indicators to determine the price trend direction. This strategy calculates two EMA indicators with different parameters and combines golden cross and dead cross signals to judge the price trend. It generates a buy signal when the shorter period EMA crosses above the longer period EMA, and a sell signal when the shorter period EMA crosses below the longer period EMA.

## Strategy Logic  

The core indicators of this strategy are two sets of EMAs, including a longer cycle EMA1 and a shorter cycle EMA2. The EMA1 parameter is 21 and the EMA2 parameter is 10. The strategy calculates these two EMAs based on the 4-hour cycle.  

When the shorter cycle EMA2 crosses above the longer cycle EMA1, a buy signal is generated. This indicates that the short-term trend of prices has strengthened and an upward trend has begun. When the shorter cycle EMA2 crosses below the longer cycle EMA1, a sell signal is generated. This indicates that the short-term upward trend of prices has been interrupted and a downward trend has begun.

To filter erroneous signals, the strategy sets two sets of golden cross and dead cross indicators. Signals are only triggered when both sets of indicators give out the same signal, which can effectively reduce errors caused by price fluctuations.

## Advantage Analysis 

- The dual EMA structure can effectively capture changes in short and medium-term trends to determine trends.

- The additional filtering of two sets of golden cross and dead cross indicators can reduce erroneous signals and avoid unnecessary transactions caused by price fluctuations.

- The use of 4-hour levels to calculate indicators can cope with high-frequency price fluctuations.

- The strategy structure is simple and clear, easy to understand and implement, and suitable for quantitative trading applications.

## Risk Analysis

- The dual EMA structure is less effective in judging consolidation markets. Long periods of consolidation can generate false signals.  

- The 4-hour level indicators are not sensitive enough to respond to sudden events. Major sudden news may cause big moves within 4 hours that cannot be effectively risk-controlled.

- The strategy relies solely on technical indicators without combining fundamental analysis. If major changes occur in company fundamentals, technical indicators may fail.

These risks can be controlled by:

1. Add more time-cycle EMA indicators to establish model combinations.

2. Use text sentiment analysis to determine major sudden events and dynamically adjust positions.

3. Associate changes in economic environment, policies and company fundamentals to dynamically adjust parameters.

## Optimization

The strategy can be further optimized:  

1. Add model combinations. More indicator combinations with different parameters can be established to improve strategy stability.

2. Add stop loss mechanisms. Reasonable stop loss points can effectively control single losses.

3. Dynamic parameter optimization. EMA parameters can be automatically optimized based on different market environments. 

4. Incorporate machine learning techniques. Models such as Tensorflow can be trained to categorize price trends in real time.

## Conclusion

The dual EMA golden cross dead cross trend tracking strategy is a simple and practical trend trading strategy. It uses dual EMA indicators to determine short and medium-term price trends in order to capture directional market opportunities. At the same time, combining two sets of golden cross and dead cross filtering indicators can reduce erroneous trades. The strategy has a simple structure and is easy to implement, making it suitable for quantitative trading applications. Through continuous optimization and improvement, it has the potential to further expand the advantages of the strategy and improve stable profitability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2020|Backtest Stop Year|
|v_input_5|true|Backtest Stop Month|
|v_input_6|true|Backtest Stop Day|
|v_input_7|false|Color Background?|
|v_input_8|true|Margin?|
|v_input_9|240|EMA Timeframe|
|v_input_10|21|EMA1|
|v_input_11|10|EMA2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-22 00:00:00
end: 2024-02-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3


/// Component Code Startt
testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(01, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2020, "Backtest Stop Year")
testStopMonth = input(1, "Backtest Stop Month")
testStopDay = input(1, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=false)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() => true
// Component Code Stop

strategy(title="Ema cross strat", overlay=true)
margin = input(true, title="Margin?")
Margin = margin  ? margin : false
resCustom = input(title="EMA Timeframe", defval="240" )
source = close,
len2 = input(21, minval=1, title="EMA1")
len3 = input(10, minval=1, title="EMA2")
ema2 = request.security(syminfo.tickerid,resCustom,ema(source,len2), lookahead=barmerge.lookahead_off)
ema3 = request.security(syminfo.tickerid,resCustom,ema(source,len3), lookahead=barmerge.lookahead_off)


mylong = crossover(ema3, ema2)
myshort = crossunder(ema3,ema2)

last_long = na
last_short = na
last_long := mylong ? time : nz(last_long[1])
last_short := myshort ? time : nz(last_short[1])

in_long = last_long > last_short ? 2 : 0
in_short = last_short > last_long ? 2 : 0

mylong2 = crossover(ema3, ema2)
myshort2 = crossunder(ema3, ema2)

last_long2 = na
last_short2 = na
last_long2 := mylong2 ? time : nz(last_long2[1])
last_short2 := myshort2 ? time : nz(last_short2[1])

in_long2 = last_long2 > last_short2 ? 0 : 0
in_short2 = last_short2 > last_long2 ? 0 : 0

condlongx =   in_long + in_long2
condlong = crossover(condlongx, 1.9)
condlongclose = crossunder(condlongx, 1.9)

condshortx =  in_short + in_short2
condshort = crossover(condshortx, 1.9)
condshortclose = crossover(condshortx, 1.9)




if crossover(condlongx, 1.9) and testPeriod() and strategy.position_size <= 0
    strategy.entry("Long", strategy.long, comment="Long")

if crossover(condshortx, 1.9) and testPeriod() and strategy.position_size > 0    
    strategy.close("Long",when = not Margin)
    
if crossover(condshortx, 1.9) and testPeriod() and strategy.position_size >= 0
    strategy.entry("Short", strategy.short, comment="Short", when = Margin)
```

> Detail

https://www.fmz.com/strategy/443104

> Last Modified

2024-02-29 11:45:42
