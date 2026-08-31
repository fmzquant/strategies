
> Name

Channel-Breakout-SMA-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1adc180d76f82166ec4.png)


## Overview

This strategy is based on channel breakout and uses moving average crossover as exit signal. It works well on futures and indices.

### Strategy Logic

1. Calculate highest high and lowest low over certain periods to construct upper and lower channel. 

2. Go long when price breaks above upper channel; go short when price breaks below lower channel.

3. Calculate fast and slow SMA lines. 

4. If long, close long when fast SMA crosses below slow SMA; If short, close short when fast SMA crosses above slow SMA.

### Advantage Analysis 

1. Combining channel and moving average system can improve profitability.

2. Channel judges rotation and SMA judges trend exhaustion. 

3. SMA filter avoids whipsaws and reduces unnecessary trades.

4. Adjustable channel range fits different periods and volatility.

### Risk Analysis

1. Improper channel range may miss breakout or generate false breakout. 

2. Improper SMA parameters may exit early or late.

3. Need reasonable position sizing to limit single loss. 

4. Watch for valid breakout, avoid chasing high/selling low.

### Optimization

1. Test parameters to optimize channel range and SMA periods. 

2. Add trend filter to improve breakout success rate.

3. Add position sizing such as fixed fraction and Martingale. 

4. Add stop loss to control single loss.

### Summary

This strategy capitalizes on channel and SMA to achieve steady gains in strong trends. But whipsaw losses must be avoided and position sizing is critical. Further enhancements on parameter tuning, signal filtering and risk management will improve robustness.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-13 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © anshuanshu333

//@version=4

// strategy("ChBrkOutStrategySMA", overlay=true, initial_capital = 200000)
length = input(title="Length", type=input.integer, minval=1, maxval=1000, defval=7)
     
fastSMA = sma(close,9)
slowSMA = sma(close,21)

upBound = highest(high, length)
downBound = lowest(low, length)

boundLongEntry = ((close >= upBound) or (high >= upBound)) and fastSMA>slowSMA and (close > open)
boundShortEntry =((close <= downBound) or (low <= downBound)) and fastSMA<slowSMA and (close <open)

u=plot(upBound, title = "Upper Bound",color=color.blue, linewidth=1)
l=plot(downBound, title = "Lower Bound",color=color.red, linewidth=1)
plot(fastSMA,title = "Fast SMA", color = color.red, linewidth =2)
plot(slowSMA,title = "Slow SMA" ,color = color.green, linewidth =1)
fill(u,l, transp=95)
plot(avg(upBound,downBound), title = "Avg", color=color.gray,linewidth =1)

     
if (boundLongEntry )
    strategy.entry("LE", long = true)
    
if (boundShortEntry)
    strategy.entry("SE", long = false)
    
SmaLongExit = crossunder(fastSMA,slowSMA)
SmaShortExit = crossover(fastSMA,slowSMA)

    
//Close TRades   
if (strategy.position_size > 0)
    strategy.close(id="LE",when= SmaLongExit)
if (strategy.position_size < 0)
    strategy.close(id="SE",when= SmaShortExit)
```

> Detail

https://www.fmz.com/strategy/429964

> Last Modified

2023-10-23 17:08:51
