
> Name

均线Ichimoku交叉策略SMA-Ichimoku-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The SMA Ichimoku crossover strategy is a common trading strategy. This strategy uses the gold cross and dead cross principles of moving averages, combined with the Ichimoku cloud and SMA smooth moving average, to form a relatively complete trading system. This strategy can automatically open and close stock positions.

## Strategy Principle

This strategy mainly judges buying and selling stocks through the comparison between the conversion line and base line in the Ichimoku indicator and the crossovers of short-term and long-term SMA moving averages.

Specifically, the code defines the conversion line, base line, leading span 1 and leading span 2 of the Ichimoku indicator. At the same time, the long-term SMA moving average ma1 and short-term SMA moving average ma2 are defined.

When judging for buying, the conversion line needs to be lower than the base line, and the short-term moving average lower than the long-term moving average, that is, a golden cross occurs.

When judging for selling, the conversion line needs to be higher than the base line, and the short-term moving average higher than the long-term moving average, that is, a dead cross occurs.

In addition, the code also defines some auxiliary conditions, such as the closing price higher than the previous day, and using the difference and division of moving average values ​​to judge the slope. This can determine the momentum and direction of moving average crossovers.

## Advantage Analysis

This strategy combines the advantages of multiple technical indicators and has the following advantages:

1. Ichimoku cloud itself contains trend judgment, combined with SMA moving averages can form a powerful trend judgment.

2. SMA moving averages itself can determine price trends and momentum. Fast MA crossing slow MA can determine trading points.

3. Adding closing price judgment can avoid unnecessary opening and closing of positions.

4. The calculation of moving average slope increases judgment on the momentum of moving average crossovers and can filter false crossovers.

5. Overall, this strategy has relatively accurate trend judgment, can reduce unnecessary trading, and has some room for optimization.

## Risk Analysis 

This strategy also has some risks:

1. Both Ichimoku and SMA may lag and fail to reflect price changes in time.

2. The combination of multiple conditions increases complexity and probability of errors.

3. The strategy is solely based on technical indicators and cannot judge the impact of major news.

4. The strategy does not set stop loss conditions, with the risk of enlarging losses. 

5. The strategy does not consider special market conditions such as consolidation. 

6. Improper parameter settings can also affect strategy performance.

## Optimization

This strategy can be optimized in the following aspects:

1. Set stop loss conditions to automatically stop loss when losses enlarge.

2. Increase judgment on major news events to avoid their impact.

3. Increase judgment on special market conditions such as increasing trading range or adjusting parameters.

4. Test and optimize parameter combinations to find optimal parameters.

5. Introduce machine learning algorithms for parameter optimization and market judgment.

6. Add momentum indicators to avoid false breakouts. 

7. Combine more fundamentals such as changes in volume.

## Conclusion

In summary, this SMA Ichimoku crossover strategy integrates the advantages of Ichimoku and SMA moving averages to form a relatively complete stock trading strategy. This strategy has strong ability to determine trends and can effectively capture trend opportunities. But there are also problems like lag, high complexity, lack of stop loss. This gives great room for optimizing this strategy. By setting stop loss, judging major news events, optimizing parameters and more, this strategy can be continuously improved to become a stable and reliable quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Conversion Line Periods|
|v_input_2|26|Base Line Periods|
|v_input_3|52|Lagging Span 2 Periods|
|v_input_4|26|Displacement|
|v_input_5|21|SMA LONG|
|v_input_6|19|SMA SHORT|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-15 00:00:00
end: 2023-10-15 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// strategy("Ichimoku+SMAsmoothed", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_order_fills= true, calc_on_every_tick=true, pyramiding=0)
// 
conversionPeriods = input(9, minval=1, title="Conversion Line Periods"),
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods"),
displacement = input(26, minval=1, title="Displacement")
SMA1=input(title="SMA LONG",defval=21)
SMA2=input(title="SMA SHORT",defval=19)
p=ohlc4[1]


donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

//plot(conversionLine, color=#0496ff, title="Conversion Line")
//plot(baseLine, color=#991515, title="Base Line")
//plot(close, offset = -displacement, color=#459915, title="Lagging Span")

//p1 = plot(leadLine1, offset = displacement, color=green,
// title="Lead 1")
//p2 = plot(leadLine2, offset = displacement, color=red, 
// title="Lead 2")
//fill(p1, p2, color = leadLine1 > leadLine2 ? green : red)

ma1=sma(p, SMA1)
ma2=sma(p, SMA2)
p_a = ma1*2
p_b = ma1
p_c = p_a - p_b
p_d = p_c/24
p_e = ma2*2
p_f = ma2
p_g = p_e - p_f
p_h = p_g/24

closelong = ohlc4<ohlc4[SMA1] and ohlc4<ohlc4[1]// and leadLine1<leadLine2 and p_h<p_d
if (closelong)
    strategy.close("Long")
closeshort = ohlc4>ohlc4[SMA1] and ohlc4>ohlc4[1]// and leadLine1>leadLine2 and p_h>p_d
if (closeshort)
    strategy.close("Short")

longCondition = ohlc4>ohlc4[1] and leadLine1>leadLine2 and p_h>p_d
if (longCondition)
    strategy.entry("Long",strategy.long)
shortCondition = ohlc4<ohlc4[1] and leadLine1<leadLine2 and p_h<p_d
if (shortCondition)
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/429382

> Last Modified

2023-10-16 15:46:38
