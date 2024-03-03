
> Name

双均线黄金交叉策略Golden-Cross-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]  

### 策略概述

双均线黄金交叉策略是通过快速均线上穿慢速均线产生做多信号,快速均线下穿慢速均线产生做空信号的简单量化策略。该策略捕捉双均线的黄金交叉来判断市场的长期趋势转折点。

### 策略原理

1. 计算50周期的快速简单移动平均线,作为短期趋势的代表。

2. 计算200周期的慢速简单移动平均线,作为长期趋势的代表。 

3. 当快速均线上穿慢速均线时,认为开始进入上升长期趋势,这时做多。

4. 当快速均线下穿慢速均线时,认为开始进入下跌长期趋势,这时平掉多单持有。

交叉代表着市场供需关系和心理面发生转变,可以作为长线判断趋势转换的信号。快慢均线周期的组合可以根据不同品种和周期进行调整。

### 策略优势

- 使用双均线判断主趋势转折点

- 黄金交叉形成清晰的做多做空信号

- 参数调整灵活,适用于多种市场

- 回测和实盘调整简单

- 可与其他因子组合使用

### 风险警示

- 均线具有一定的滞后性

- 需要防止出现假突破

- 无法判断具体的入场和出场的时机 

- 趋势内部震荡可能导致亏损

### 总结

双均线黄金交叉策略通过比较快慢均线的黄金交叉情况,判断长线趋势的变化,是一种广泛应用的长线策略思路。可根据不同市场情况调整参数,并与其他因子组合使用,以提高策略效果。


||


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

[/trans]

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
