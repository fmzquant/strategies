
> Name

Trend-Deviation-Index-with-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13e5d9de33f56a6f6b9.png)



## Overview

This strategy calculates the Trend Deviation Index (TSI) of price, processes TSI with moving average, and forms the moving average line of TSI. Combined with the price candlestick direction, it determines whether the current price is in an uptrend or a downtrend, and thus generates buy and sell signals.

## Principles 

The main steps of this strategy are:

1. Calculate the price change percentage pct  
2. Double smooth pct with HMA to get double_smoothed_pc
3. Calculate double HMA of absolute pct to get double_smoothed_abs_pc 
4. Calculate TSI value: (100 * (double_smoothed_pc / double_smoothed_abs_pc))
5. Process TSI value with HMA to get TSI moving average line tsihmaline
6. Compare TSI value and TSI moving average line, above moving average is uptrend, below is downtrend
7. In uptrend, if price is also rising, generate buy signal
8. In downtrend, if price is also falling, generate sell signal

Through above steps, it determines the overall trend direction, combined with actual price movement, to generate trading signals.

## Advantages

1. Double HMA smoothing filters out short-term noise and locks in major trend  
2. TSI and its moving average line determine overall trend direction
3. Combined with price candlestick avoids false breakout, improves signal reliability
4. Customizable parameters adapt to different cycle markets
5. Graphical visualization, green for uptrend, red for downtrend

## Risks

1. May generate multiple false signals during range-bound market
2. Moving average line lags at turning points, possibly missing best entry point
3. Frequent parameter tuning needed to adapt to changing market
4. Based on single TSI indicator, can be optimized with other indicators

## Enhancement

1. Add filters to avoid false signals during consolidation
2. Add other indicators to confirm trend reversal points
3. Auto-optimize parameters via machine learning etc
4. Introduce stop loss to control single trade loss

## Conclusion

This strategy uses TSI to determine trend direction combined with price candlesticks to generate trading signals, which can effectively catch the trend, buying in uptrend and selling in downtrend. But there are also risks, requiring optimization to improve stability. Overall, this strategy is intuitive and easy to understand, suitable for traders familiar with technical indicators.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Long Length|
|v_input_2|50|Short Length|
|v_input_3|7|Signal Length|
|v_input_4_open|0|Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|250|Upper Line|
|v_input_6|-250|Lower Line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-29 00:00:00
end: 2023-11-05 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="TSIHULLBOT", shorttitle="TSICCIHULL", default_qty_type=strategy.percent_of_equity, default_qty_value=100)
long = input(title="Long Length", type=input.integer, defval=50)
short = input(title="Short Length", type=input.integer, defval=50)
signal = input(title="Signal Length", type=input.integer, defval=7)
price = input(title="Source",type=input.source,defval=open)
lineupper = input(title="Upper Line", type=input.integer, defval=250)
linelower = input(title="Lower Line", type=input.integer, defval=-250)
double_smooth(price, long, short) =>
    fist_smooth = hma(price, long)
    hma(fist_smooth, short)
pc = change(price)
double_smoothed_pc = double_smooth(pc, long, short)
double_smoothed_abs_pc = double_smooth(abs(pc), long, short)
tsi_value = (100 * (double_smoothed_pc / double_smoothed_abs_pc))*5
tsihmaline=(hma(tsi_value,signal))*5
clr = tsihmaline < tsi_value ? color.red : color.lime
clr2 = tsi_value < tsi_value[1] ? color.red : color.lime
i1=plot(lineupper+3, color=color.black, linewidth=3)
i2=plot(linelower+3, color=color.black, linewidth=3)
i3=plot(lineupper, color=clr)
i4=plot(linelower, color=clr)
trendv=tsihmaline/5.6
plot(trendv, linewidth=7,  color=color.black)
plot(trendv, linewidth=4,  color=color.yellow)
j1=plot(tsi_value, linewidth=5, color=color.black)
j2=plot(tsi_value[1], linewidth=5, color=color.black)
j3=plot(tsi_value, color=clr2)
j4=plot(tsi_value[1], color=clr2)
fill(i3,i4,color=clr,transp=90)
fill(j3,j4,color=clr2,transp=15)
longCondition = tsihmaline>tsihmaline[1] and price>price[1]
if (longCondition)
    strategy.entry("Buy ⤴️", strategy.long)
shortCondition = tsihmaline<tsihmaline[1] and price<price[1]
if (shortCondition)
    strategy.entry("Sell ⤵️", strategy.short)
```

> Detail

https://www.fmz.com/strategy/431250

> Last Modified

2023-11-06 14:46:40
