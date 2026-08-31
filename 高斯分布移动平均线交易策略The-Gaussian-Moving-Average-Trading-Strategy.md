
> Name

高斯分布移动平均线交易策略The-Gaussian-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1656adb19685df662d3.png)

## Overview  

This strategy applies the idea of Gaussian distribution and calculates the Z-score based on the 10-period exponential moving average of Heikin-Ashi candlestick closing prices. The thresholds are then set based on the 20-period exponential moving average of the Z-score for entry and exit signals when the curve crosses them.

## Strategy Logic  

1. Calculate the 10-period exponential moving average of Heikin-Ashi candlestick closing prices.  

2. Based on the above moving average data, calculate the Z-score over a 25-period lookback window. The Z-score reflects how many standard deviations a data point is from the mean, which can judge whether the data is normal or abnormal.  

3. Take the 20-period exponential moving average on the Z-score to get a curve called emaScore. This curve reflects the long term trend of the Z-score.  

4. Set upper and lower thresholds based on the distribution of emaScore data. Considering some fluctuations of the curve, the 90% and 10% levels are chosen as thresholds.

5. Long when emaScore crosses middle line or lower threshold upwards. Short when emaScore crosses upper threshold, lower threshold or 100-period highest downwards.   

## Advantage Analysis   

1. Apply Gaussian distribution idea through Z-score to judge normality and filter false breakouts.  

2. The double exponential moving average has a filtering effect to determine long term trend.   

3. Reasonable threshold setting lowers incorrect trading probabilities.  

4. Incorporating 100-period highest/lowest points helps catch reversal opportunities.   

## Risk Analysis   

1. Combination of Z-score and MAs is sensitive to parameters tuning. Optimization needed.   

2. Proper threshold levels directly relate to strategy validity. Too wide or narrow will fail.  

3. 100-period highest/lowest points can easily generate wrong signals. Relax conditions appropriately.  

4. Heikin-Ashi itself has some lag. Evaluate fit for this strategy.  

## Optimization Directions   

1. Test different moving averages periods, Z-score lookback windows.  

2. Utilize walk forward analysis to auto optimize parameters.  

3. Try different threshold setting methods, e.g. STD multiples.  

4. Improve highest/lowest points logic to prevent wrong signals.   

5. Test other candle types or typical prices to replace Heikin-Ashi.  

## Summary   

This strategy judges price abnormality and generates trading signals based on the idea of Gaussian distribution, double exponential moving averages and dynamic threshold setting. The main advantages are filtering false breakouts and catching reversals. However, huge impact exists regarding parameters selection and combination. Further tests and optimization are needed to find the best parameters and combinations.  



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-02 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/



// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © jensenvilhelm

// Here is an attempt to create a robust strategy for BTCUSD on a 5 minute chart
// I can't seem to get this code to work the way i want.... if you want to give it a try, please let me know -
// how it goes in comment section. 

//@version=5
// Define the strategy settings
strategy("The Z-score", shorttitle="TZS", overlay=true)

// User can set the start date for the strategy
startDate = timestamp("2023 06 01")

// Heikin-Ashi Open, Close, High and Low calculation
haClose = ohlc4
var float haOpen = na
haOpen := na(haOpen[1]) ? (open + close) / 2 : (haOpen[1] + haClose[1]) / 2
haHigh = math.max(nz(haOpen, high), nz(haClose, high), high)
haLow = math.min(nz(haOpen, low), nz(haClose, low), low)

// Function to calculate the Z-Score
z_score(_series, _length) =>
    _mean = ta.sma(_series, _length)
    _stddev = ta.stdev(_series, _length)
    (_series - _mean) / _stddev

// Compute the score and its EMA
score = z_score(ta.ema(haClose, 10), 25)
emaScore = ta.ema(score, 20)

// Calculate lower and upper thresholds using percentiles of EMA
lowerBlue = ta.percentile_linear_interpolation(emaScore, 50, 10)
upperBlue = ta.percentile_linear_interpolation(emaScore, 50, 90)

// Calculate the middle line as 50th percentile
middleLine = ta.percentile_linear_interpolation(emaScore, 50, 50) 

// Plot the EMA of the score and the thresholds
plot(emaScore,"The White Line", color=color.white, linewidth=2)
plot(lowerBlue,"Lower Blue Line", linewidth=2)
plot(upperBlue, "Upper Blue Line", linewidth=2)
plot(middleLine, "Middle Yellow Line", linewidth=2, color=color.yellow)
plot(score,"The Z-Score Mixed With EMA 10", color=color.green)

// Calculate highest and lowest EMA score over 100 bars period
highest = ta.highest(emaScore, 100)
lowest = ta.lowest(emaScore, 100)

// Plot highest and lowest EMA score lines 
plot(highest, "Highest of emaScore", color=color.red, linewidth=2)
plot(lowest, "Lowest of emaScore", color=color.red, linewidth=2)

// Define entry and exit conditions for long and short positions
longCon = ta.crossover(score, lowerBlue) or ta.crossover(emaScore, middleLine)
addOn = ta.crossover(score, highest)
shortCon = ta.crossunder(emaScore, upperBlue) or ta.crossunder(emaScore, lowerBlue) or ta.crossunder(emaScore, highest)

// Execute trading logic based on conditions and after the start date
if (time >= startDate)
    if longCon
        strategy.entry("Long", strategy.long)
        if shortCon
            strategy.close("Long")
    if addOn
        strategy.entry("LongNR2", strategy.long)
        if shortCon
            strategy.close("LongNR2")
    
    if shortCon
        strategy.entry("Short", strategy.short)
        if longCon
            strategy.close("Short")

```

> Detail

https://www.fmz.com/strategy/437540

> Last Modified

2024-01-03 16:06:45
