
> Name

Double-Bollinger-Bands-Breakout-Strategy-436499

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11d6e890201cab34787.png)


## Overview

The Double Bollinger Bands Breakout strategy is a trend following strategy. It uses the upper and lower bands of Bollinger Bands to judge price trends and establish long positions when prices break through the inner Bollinger Bands and close positions when prices fall below the outer Bollinger Bands.

## Strategy Logic

The strategy first calculates the moving average and standard deviation over a specified period. It then constructs the double Bollinger Bands using the moving average ± one standard deviation for the inner bands and the moving average ± 1.5 standard deviations for the outer bands. 

When prices break above the upper inner band, it indicates that the market is starting a bull run so goes long. When prices fall below the lower inner band, it indicates the start of a bear market so goes short.

The profit taking exit for long positions is when prices fall below the lower outer band. The profit taking exit for short positions is when prices break above the upper outer band.

The strategy also sets stop loss, take profit and trailing stop loss exits.

## Advantage Analysis

The Double Bollinger Bands Breakout strategy has the following advantages:

1. Using double Bollinger Bands to judge price moves allows effective trend following;
2. Entering on inner band breakouts avoids unnecessary mean reversion trades;
3. Take profit, stop loss and trailing stop losses effectively control risk;
4. Optimizable parameters allow tuning for different products.

## Risk Analysis

The Double Bollinger Bands Breakout strategy also has some risks:

1. Frequent entries and stop losses may occur during ranging markets;  
2. Improper parameter settings could lead to too easy entries or difficult exits;
3. Breakouts sometimes give false signals resulting in failed breakouts.

To address these risks, parameters could be adjusted, additional filters added, or breakouts manually monitored to reduce risk.

## Optimization Directions

The Double Bollinger Bands Breakout strategy can be optimized in several ways:

1. Optimize moving average and standard deviation parameters to fit different products;
2. Add volume, MACD or other filters to avoid false breakouts;  
3. Use machine learning methods to dynamically optimize parameters; 
4. Copy strategy across multiple high frequency intervals to expand profit potential.

## Conclusion  

The Double Bollinger Bands Breakout strategy overall judges changes in price relative to Bollinger Bands to time entries in a typical trend following approach. The strategy sets profit targets using the double bands and scientific exit mechanisms to control risk. With optimized parameters and risk controls, it can achieve good results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|length|
|v_input_2|0.25|pbin|
|v_input_3|1.5|pbout|
|v_input_4|false|Take Profit|
|v_input_5|false|Stop Loss|
|v_input_6|false|Trailing Stop Loss|
|v_input_7|false|Trailing Stop Loss Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-17 00:00:00
end: 2023-12-24 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("BB Strat",default_qty_type = strategy.percent_of_equity, default_qty_value = 100,currency="USD",initial_capital=100, overlay=true)
l=input(title="length",defval=100)
pbin=input(type=float,step=.1,defval=.25)
pbout=input(type=float,step=.1,defval=1.5)
ma=sma(close,l)
sin=stdev(ma,l)*pbin
sout=stdev(ma,l)*pbout
inu=sin+ma
inb=-sin+ma
outu=sout+ma
outb=-sout+ma
plot(inu,color=lime)
plot(inb,color=lime)
plot(outu,color=red)
plot(outb,color=yellow)

inpTakeProfit = input(defval = 0, title = "Take Profit", minval = 0)
inpStopLoss = input(defval = 0, title = "Stop Loss", minval = 0)
inpTrailStop = input(defval = 0, title = "Trailing Stop Loss", minval = 0)
inpTrailOffset = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)
useTakeProfit = inpTakeProfit >= 1 ? inpTakeProfit : na
useStopLoss = inpStopLoss >= 1 ? inpStopLoss : na
useTrailStop = inpTrailStop >= 1 ? inpTrailStop : na
useTrailOffset = inpTrailOffset >= 1 ? inpTrailOffset : na


longCondition = close>inu and rising(outu,1) 
exitlong = (open[1]>outu and close<outu) or crossunder(close,ma)

shortCondition = close<inb and falling(outb,1)
exitshort = (open[1]<outb and close>outb) or crossover(close,ma)

strategy.entry(id = "Long", long=true, when = longCondition)
strategy.close(id = "Long", when = exitlong)
strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset, when=exitlong)

strategy.entry(id = "Short", long=false, when = shortCondition)
strategy.close(id = "Short", when = exitshort)
strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset, when=exitshort)
```

> Detail

https://www.fmz.com/strategy/436499

> Last Modified

2023-12-25 13:20:31
