
> Name

MA-Turning-Point-Long-and-Short-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1f6e6f764393f6063e8.png)


### Overview

This strategy judges the trend based on the turning points of the moving average line to go long at the MA uptrend turning point and go short at the MA downtrend turning point. It belongs to a typical trend-following strategy.

### Strategy Principle  

The strategy uses price=security(tickerid, period, close) to get the closing price as the price for strategy analysis, then calculates the SMA or EMA based on the input selection of ma1 length to get the first average line price1. roc1 is then defined as the one day change rate of price1. By the threshold trendStrength1, it judges whether the average line has a significant rise or fall. When roc1 exceeds trendStrength1, ma1up is defined as true, indicating that the average line is rising. When roc1 is below negative trendStrength1, ma1down is defined as true, indicating that the average line is falling. A long signal is issued when the average line rises and the previous day was falling. A short signal is issued when the average line falls and the previous day was rising.

Thus, the strategy utilizes the turning points of the moving average line to capture the trend change of the stock price, which belongs to a typical trend following strategy.

### Advantage Analysis

The biggest advantage of this strategy is that it utilizes the turning points of the moving average line to judge the trend, which is a relatively mature and reliable technical analysis method in quantitative trading. The specific advantages are:

1. Use moving averages to filter noise and accurately capture trend turning points. The moving average smoothes out prices and can filter out some noise to more reliably identify trend reversals.

2. Combine rate of change indicators to determine the intensity of reversals to avoid false breakouts. This strategy not only detects turning points, but also sets a threshold for the rate of change gradient, so it can avoid unnecessary trades caused by false breakouts on the moving average.

3. Simple parameter settings for easy backtesting optimization. This strategy has only one moving average and a few parameters that are easy for users to understand and master.


### Risk Analysis

The main risks of this strategy are:  

1. Trend following strategy cannot predict tops and bottoms. This strategy is a trend following strategy that can only follow trends and cannot predict market tops and bottoms, easily missing instant reversal opportunities.

2. Moving average lag problem. Moving averages have a certain lag in reflecting price movements, which may affect the timeliness of identifying trend reversals. 

3. Improper prior parameter optimization directly affects results. Parameter settings of this strategy like number of periods of the average line and threshold of rate of change gradient will directly affect the strategy's profit, drawdown etc. and needs to be carefully tested and optimized.

The corresponding solutions are:

1. Appropriately combine other indicators to predict major bull and bear turning points.  

2. Test EMA and other faster moving averages instead of SMA.

3. It is recommended to multi-optimize to find the best parameter settings.


### Optimization Directions

This strategy can be further optimized in the following directions:

1. Add a second moving average line to form a golden cross and dead cross strategy. This utilizes the relationship between dual moving averages to determine trends and filter noise.  

2. Add volume analysis. By observing changes in volume at the moving average turning points, it can further verify the reliability of the turning points.

3. Test assisting roles of other technical indicators like RSI and MACD. These indicators can also help determine trends and form combination strategies with moving average turning points.   

4. Multi-market condition parameter optimization and screening. Separately test and optimize parameter settings for combinations under bull market, bear market, range-bound market conditions.  

5. Use machine learning methods to dynamically optimize parameters over different market environments and assess parameter robustness for dynamic optimization.


### Conclusion

In summary, this is a relatively mature trend following strategy with some practical value. The strategy idea is simple and clear, with few adjustable parameters, which is easy to understand and test. At the same time, there are also problems like trend following lag. It is recommended to combine with other indicators, test and optimize across situations, or introduce mechanisms for dynamic parameter adjustment to further enhance the stability and practical effect of the strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|25|1st MA Length|
|v_input_3|0|1st MA Type: SMA|EMA|
|v_input_4|true|Lookback 1|
|v_input_5|2.5|Minimum slope magnitude * 100|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-10 00:00:00
end: 2024-01-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("MA Turning Point Strategy", overlay=true)
src = input(close, title="Source")

price = request.security(syminfo.tickerid, timeframe.period, src)
ma1 = input(25, title="1st MA Length")
type1 = input("SMA", "1st MA Type", options=["SMA", "EMA"])

price1 = if (type1 == "SMA")
    sma(price, ma1)
else
    ema(price, ma1)

plot(series=price1, style=line,  title="1st MA", color=blue, linewidth=2, transp=0)

lookback1 = input(1, "Lookback 1")
roc1 = roc(price1, lookback1)

ma1up = false
ma1down = false
ma2up = false
ma2down = false

ma1up := nz(ma1up[1])
ma1down := nz(ma1down[1])
ma2up := nz(ma2up[1])
ma2down := nz(ma2down[1])

trendStrength1 = input(2.5, title="Minimum slope magnitude * 100", type=float) * 0.01

if crossover(roc1, trendStrength1)
    ma1up := true
    ma1down := false
    
if crossunder(roc1, -trendStrength1) 
    ma1up := false
    ma1down := true

longCondition = ma1up and ma1down[1]
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = ma1down and ma1up[1]
if (shortCondition)
    strategy.entry("Short", strategy.short)


```

> Detail

https://www.fmz.com/strategy/439051

> Last Modified

2024-01-17 11:56:53
