
> Name

基于离散运动平均值的趋势突破策略Trend-Breakout-Strategy-Based-on-Moving-Average-Deviation

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/71354a80f1f591dd14.png)



### Overview

This strategy identifies market trend and reversal opportunities by calculating the deviation of price from its smoothed moving average. It belongs to the trend following strategies that trade based on the breakout of moving averages. The core idea is to buy or sell when the price breaks through the smooth moving average line.  

### Strategy Logic

1. Calculate the 3-period weighted moving average of price FPrice as the smoothed MA line.

2. Calculate the 17-day standard deviation stdev and 17-day simple moving average ema2 of FPrice.

3. Calculate the deviation Rate1 of price from the average as (FPrice-ema2)/stdev.

4. When Rate1 drops below -1 and starts to rise, it signals a breakout below the down trendline and generates a buy signal.

5. When Rate1 rises above 1 and starts to fall, it signals a breakout above the up trendline and generates a sell signal. 

6. Open or close positions according to the signals.

The strategy uses the standard deviation range of price deviation from MA to identify trend reversals. By dynamically adjusting the reference range it adapts to market volatility. When price breaks out of the MA by more than one standard deviation, it triggers a trading signal. This effectively filters out short-term market noise and catches mid-to-long term trend shifts.

### Advantage Analysis

1. The dynamic reference range automatically adapts to changing market volatility.

2. The smoothed MA filters out short-term noise effectively. 

3. The standard deviation sets reasonable breakout thresholds and avoids overtrading.

4. The momentum filter avoids false breakouts.

5. The strategy logic is simple and clear, easy to understand and implement.

6. The parameters can be adjusted for different trading instruments.

7. It can be combined with other indicators to improve performance.

### Risk Analysis

1. There may be fewer trading opportunities during prolonged low volatility periods.

2. Improper standard deviation parameters may lead to missing good trades or generating excessive false signals.

3. Standard deviation may fail during extreme price swings, causing wrong signals.

4. More false breakouts may occur around trend transitions.  

5. MA systems have lag in detecting short-term shifts. Some short-term opportunities may be missed.

6. Parameters and filters need to be tuned properly for specific market environments.

### Enhancement Directions

1. Optimize MA days and type based on instrument characteristics.

2. Adjust standard deviation multiplier to find the optimal reference range.

3. Add price momentum filters to reduce false signals.

4. Incorporate volatility indicators to dynamically adjust parameters by volatility.

5. Combine with other similar breakout strategies to improve win rate. 

6. Consider lowering position size around trend turning points to manage risk.

7. Add stop loss to control single trade loss.

### Conclusion

The strategy has clear logic to identify trend reversals. With parameter tuning and combinations it can be adapted to different markets. But risk management is crucial to avoid false signals during high volatility periods. If optimized properly, it is a simple and practical trend following system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_2|17|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-22 00:00:00
end: 2023-10-22 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Mustafaozver

//@version=4
strategy("Escaping of Rate from Avarage By Mustafa OZVER", "EoRfA", overlay=false)
//strategy("Escaping of Rate from Avarage By Mustafa OZVER", "EoRfA", overlay=false)

src = input(ohlc4,"Source")
FPrice = wma(src,3)
len = input(17,"Length")

stdev = stdev(FPrice,len)
ema2 = ema(FPrice,len)

Rate1 = (FPrice - ema2) / stdev
//bgcolor(color=((stdev/ema)>0.0015)?color.green:#00000000,transp=80)

colorG = color.lime
colorR = color.red

hline(0,linestyle=hline.style_solid,editable=false)
hline1=hline(1,linestyle=hline.style_dotted,editable=false)
hlinen1=hline(-1,linestyle=hline.style_dotted,editable=false)
fill(hline1,hlinen1,color=color.silver,transp=85,editable=true)

//plot(Rate,color=(Rate>0?colorG:colorR),transp=75,style=plot.style_area,editable=false)

plot(Rate1,title="ESC1",color=(Rate1>0?colorG:colorR),style=plot.style_line,linewidth=1,editable=true)

BUYSIGNAL = Rate1 < -1 and change(Rate1) > 0
SELLSIGNAL = Rate1 > 1 and change(Rate1) < 0

if (BUYSIGNAL)
    strategy.order("LONG1",true)
    //strategy.close("SHORT1")

if (SELLSIGNAL)
   // strategy.order("SHORT1",false)
    strategy.close("LONG1")
```

> Detail

https://www.fmz.com/strategy/429954

> Last Modified

2023-10-23 15:38:37
