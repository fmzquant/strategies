
> Name

黄金交叉与死叉双均线交叉交易策略Double-Hull-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy mainly uses the crossover of two Hull Moving Averages of different timeframes to determine market trends and make long and short trades.

### Strategy Logic

The strategy uses two Hull Moving Averages, one is 60 periods and the other is 175 periods. Where:

1. hullma is the 60-period Hull Moving Average, calculated by the wma function. 

2. ahullma is the 175-period Hull Moving Average, calculated by the wma function.

3. When hullma crosses ahullma upward, a golden cross occurs, giving a long signal.

4. When hullma crosses ahullma downward, a death cross occurs, giving a short signal.

5. longCondition and shortCondition determine the long and short entry conditions respectively. 

6. The strategy.entry function is used to execute long and short trades.

The strategy utilizes the crossover principle to capture trend changes using the crossovers between short-term and long-term moving averages, for profit.

### Advantage Analysis

1. Hull Moving Average responds faster to price changes.

2. Crossover principle is simple and easy to implement. 

3. The 60- and 175-period combination captures medium-term trends.

4. Customizable period parameters for different markets.

5. Applicable for intraday and position trading.

### Risk Analysis

1. Crossovers have some lag in signals.

2. More false signals from short-term MA. 

3. Frequent crossovers may cause losses in range-bound markets. 

4. Wrong period settings cannot capture trend changes.

5. Need parameter optimization for different symbols.

Risks can be mitigated by adding filters, optimizing parameters, allowing wider stops.

### Optimization Directions

1. Test different MA combinations to find optimal periods.

2. Add trend indicators for signal filtering. 

3. Optimize stop loss strategy to reduce frequent stops.

4. Adjust periods for different symbols. 

5. Add machine learning to dynamically optimize parameters.

### Summary

This strategy utilizes golden cross and death cross principles to determine trends using double Hull Moving Average crossovers. It is a typical short-term dual moving average system. The pros are simple logic and easy implementation, catching fast short-term trends. The cons are high false signals and lagging issues. Improvements can be made via parameter optimization, signal filtering etc. It is a worthwhile short-term trading strategy to study. The strategy can be flexibly applied for intraday and position trading across different markets. Overall, it is suitable for short-term trading and can generate good returns if used properly.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|60|HULL MA 1 LENGTH|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|175|HULL MA 2 LENGTH|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title = "Hull MA", shorttitle="Junior2", overlay = true)

//HULL MA 1

length = input(60, minval=1,title="HULL MA 1 LENGTH")
src = input(close, title="Source")
hullma = wma(2*wma(src, length/2)-wma(src, length), round(sqrt(length)))

plot(hullma, color=color.green)

//HULLMA 2

alength = input(175, minval=1,title="HULL MA 2 LENGTH")
asrc = input(close, title="Source")
ahullma = wma(2*wma(asrc, alength/2)-wma(asrc, alength), round(sqrt(alength)))

plot(ahullma, color=color.green)

c1up= crossover(hullma,ahullma)
c1down= crossunder(hullma,ahullma)

longCondition = c1up
if longCondition

    strategy.entry("L", strategy.long)


shortCondition = c1down 
if shortCondition

    strategy.entry("S", strategy.short)

plot(close)
```

> Detail

https://www.fmz.com/strategy/428969

> Last Modified

2023-10-11 14:49:54
