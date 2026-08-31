
> Name

金叉三EMA长线交易策略Long-Only-Triple-EMA-Golden-Cross-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy generates trading signals based on the golden cross and death cross of three EMA lines with different periods to take advantage of each EMA's strengths and achieve better trading performance.

## Strategy Logic

The strategy calculates three EMA lines with periods of 8, 50 and 200, and generates signals when the faster EMA crosses above or below the slower EMA. The logic is:

1. Calculate the 8-period, 50-period and 200-period EMA lines.

2. Go long when the 8-period EMA crosses above the 50-period EMA (golden cross), close position when the 50-period EMA crosses below the 8-period EMA (death cross).

3. Optionally only go long when the price is above the 200-period EMA to avoid whipsaws. 

4. An optional profit-taking EMA line can be set to close positions when the price crosses below it.

The fast EMA identifies bottoms, the medium EMA determines trend, and the slow EMA filters out noise. Together they identify trend changes while maintaining decent trading frequency.

## Advantages

1. The triple EMAs effectively determine trends and capitalize on individual strengths. The 8-period EMA catches short bottoms, 50-period EMA determines mid-term trend, and 200-period EMA filters out noise.

2. Only going long above 200-period EMA avoids whipsaws.

3. Customizable profit-taking EMA sets reasonable profit targets. 

4. Visual customizations like bar colors and EMA plotting improve flexibility.

5. Simple golden/death cross logic is easy to understand.

## Risks and Mitigations

1. EMA lags may cause missed entry timing. Shorten EMA periods or combine with indicators like MACD.

2. Whipsaws may generate bad signals. Use longer EMAs to filter, or add conditions.

3. Fixed profit target is not adaptive. Use dynamic exits based on ATR etc.

4. No stops means unlimited risk. Add trailing or fixed-value stops.

## Enhancement Opportunities

1. Optimize EMA periods for best parameters.

2. Add indicators like MACD for timing.

3. Implement dynamic profit-taking based on volatility.

4. Add stop-loss logic, trailing or fixed value.

5. Improve entry conditions, e.g. volume filters.

## Conclusion

This strategy capitalizes on EMA's trend filtering to identify high-probability moves. Optimizing exits, adding indicators and filters can improve performance. Overall it is simple and practical for EMA-based trend following.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Enable Bar Color?|
|v_input_2|true|Show 8 EMA|
|v_input_3|true|Show 50 EMA|
|v_input_4|true|Show 200 EMA|
|v_input_5|false|Show profit level EMA|
|v_input_6|false|Long only above EMA200|
|v_input_7|8|v_input_7|
|v_input_8|50|v_input_8|
|v_input_9|200|v_input_9|
|v_input_10|50|v_input_10|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-20 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Long only EMA CROSS 8/50/200 Backtest", shorttitle="Golden Cross Tri EMA", overlay=true)

// EMA 8/50/200 Cross TEST



// Input
switch1=input(true, title="Enable Bar Color?")
switch2=input(true, title="Show 8 EMA")
switch3=input(true, title="Show 50 EMA")
switch4=input(true, title="Show 200 EMA")
switch5=input(false, title="Show profit level EMA")
bool_Long_EMA200=input(false, title="Long only above EMA200")
movingaverage_8 = ema(close, input(8))
movingaverage_50 = ema(close, input(50))
movingaverage_market_signal = ema(close, input(200))
movingaverage_profitlvl = ema(close, input(50))


// Calculation
bullish_cross = if bool_Long_EMA200 == true
    crossover(movingaverage_8, movingaverage_50) and movingaverage_8 > movingaverage_market_signal
else 
    bullish_cross = crossover(movingaverage_8, movingaverage_50)
bearish_cross = crossunder(close, movingaverage_profitlvl)

// Strategy
if bullish_cross
    strategy.entry("long", strategy.long)

strategy.close("long", when = bearish_cross )

// Colors
bartrendcolor = close > movingaverage_8 and close > movingaverage_50 and change(movingaverage_50) > 0 ? green : close < movingaverage_8 and close < movingaverage_50 and change(movingaverage_50) < 0 ? red : blue
barcolor(switch1?bartrendcolor:na)

// Output
plot(switch2?movingaverage_8:na,color = change(movingaverage_8) > 0 ? green : red,linewidth=2, title="EMA8")
plot(switch3?movingaverage_50:na,color = change(movingaverage_50) > 0 ? green : red,linewidth=2,title="EMA50")
plot(switch4?movingaverage_market_signal:na,color = change(movingaverage_market_signal) > 0 ? green : red,linewidth=3,title="EMA200")
plot(switch5?movingaverage_profitlvl:na,color = change(movingaverage_profitlvl) > 0 ? green : red,linewidth=3, title="EMA Profit LVL")

//
alertcondition(bullish_cross, title='Golden Cross (bullish)', message='Bullish')
alertcondition(bearish_cross, title='Death Cross (bearish)', message='Bearish')
```

> Detail

https://www.fmz.com/strategy/427895

> Last Modified

2023-09-26 16:23:53
