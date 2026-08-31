
> Name

Golden-Cross-Strategy-426925

> Author

ChaoZhang

> Strategy Description




### Strategy Overview

The golden cross strategy generates long signals when the fast EMA crosses above the slow SMA and exits longs when the fast EMA crosses below the slow SMA. It aims to capture long-term trend reversals using the golden crossovers between two moving averages.

### Strategy Logic

1. Calculate the 50-period fast EMA as the representative of short-term trend.

2. Calculate the 200-period slow SMA as the representative of long-term trend.

3. When the fast EMA crosses above the slow SMA, it signals the start of an upward long-term trend, go long. 

4. When the fast EMA crosses below the slow SMA, it signals the start of a downward long-term trend, close long positions.

Crossovers represent changes in market supply/demand dynamics and psychology, serving as signals for long-term trend shifts. The periods of the fast and slow lines can be adjusted based on different assets and timeframes.

### Advantages of the Strategy

- Uses dual moving averages to identify major trend reversal points

- Golden crosses form clear long and exit signals 

- Flexible parameter adjustment, adaptable to various markets

- Simple backtesting and live tuning

- Combinable with other factors

### Risk Warnings

- Potential lagging of moving averages

- Prevent false breakout occurrences 

- Hard to determine precise entry and exit timing

- Internal swings may cause losses in trends

### Conclusion

The golden cross strategy judges long-term trend shifts by comparing fast and slow moving average golden crosses, forming a widely used long-term strategy concept. Parameters can be adjusted and combined with other factors to improve strategy performance for different markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Fast EMA Buy|
|v_input_2|200|Slow SMA Buy|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-14 00:00:00
period: 2m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3


strategy("GoldenCross Strategy by Clefsphere",overlay=true, initial_capital=10000,default_qty_type=strategy.percent_of_equity,default_qty_value=100)

// testStartYear = input(2013, "Start Year")
// testStartMonth = input(3, "Start Month")
// testStartDay = input(1, "Start Day")
// testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

// testStopYear = input(2018, "Stop Year")
// testStopMonth = input(8, "Stop Month")
// testStopDay = input(5, "Stop Day")
// testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// testPeriodBackground = input(title="Background", type=bool, defval=true)
// testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na


sma1Period = input(50, "Fast EMA Buy")
sma2Period = input(200, "Slow SMA Buy")

// testPeriod() =>
//     time >= testPeriodStart and time <= testPeriodStop ? true : false

sma1val=sma(close,sma1Period)
sma2val=sma(close,sma2Period)


plot(sma1val,color=blue,linewidth=1)
plot(sma2val,color=orange,linewidth=1)

long=crossover(sma1val,sma2val)
short=crossunder(sma1val,sma2val)


// if testPeriod()
if long
    strategy.entry("buy",strategy.long)
    
if short
    strategy.close("buy")
        
plot(low,color= sma1val > sma2val ? green:  red,style=columns,transp=90,linewidth=1)

```

> Detail

https://www.fmz.com/strategy/426925

> Last Modified

2023-09-15 15:50:20
