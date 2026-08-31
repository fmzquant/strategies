
> Name

基于卡马和均线的趋势跟踪策略Kama-and-Moving-Average-Based-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/160654298be628dd5d3.png)

## Overview

The core idea of this strategy is to identify market trends by combining Kama moving average and moving average indicators to achieve trend following. When the Kama moving average and moving average have a golden cross, it is judged that an uptrend has begun and long position is taken. When the Kama moving average and moving average have a death cross, it is judged that a downtrend has begun and short position is taken.

## Strategy Logic  

1. Calculate Kama moving average. Kama moving average is a trend-following indicator that is more sensitive to market noise and can be used to determine price trends.

2. Calculate moving averages. Two moving averages are computed here, one is a faster double exponential moving average, the other is a normal weighted moving average.  

3. When the fast line breaks through the slow line from below, go long. When the fast line breaks down through the slow line from above, go short. So the trend judgment and tracking is completed.  

4. After taking positions, exit when price breaks through the Kama line to achieve trend following exit.

## Advantages

1. The strategy combines Kama moving average and moving average indicators to make relatively accurate judgments on market trends and achieve trend following with strong drawdown control capability.

2. Kama moving average is more sensitive to market noise and can detect trend reversal points in advance.

3. The moving average combination judgment is clear and easy to understand.  

4. The strategy has large parameter optimization space and the parameters can be adjusted and optimized for different varieties and trading instruments.

## Risk Analysis  

1. There is still possibility of misjudgment when Kama moving average and moving average combination judges market trend. Other indicators are needed to verify.

2. No stop loss setting may lead to larger losses in extreme market conditions.  

3. Inappropriate parameter settings can also cause judgment errors. Parameters need to be adjusted according to different varieties.

## Optimization Suggestions

1. Consider adding ATR indicator for stop loss setting.

2. Test the impact of different parameter values on strategy return to find the optimal parameters.

3. Consider adding other indicators for verification, such as the oscillator indicator, to improve judgment accuracy.  

4. Build parameter self-adaptive and dynamic optimization framework for automatic parameter optimization.

## Summary  

The overall idea of this strategy is clear, using Kama moving average and moving average golden cross and death cross to determine and follow trends with strong drawdown control capability. Through parameter tuning and optimization, good results can be obtained. But there is still room for improvement. By adding more verification indicators and stop loss modules, the stability and profitability of the strategy can be further enhanced.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|kamaPeriod|
|v_input_2|4|ROCLength|
|v_input_3|7|period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-29 00:00:00
end: 2024-02-05 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//synapticex.com
kamaPeriod = input(8, minval=1) 
ROCLength=input(4, minval=1) 

kama(length)=>
    volatility = sum(abs(close-close[1]), length)
    change = abs(close-close[length-1])
    er = iff(volatility != 0, change/volatility, 0)
    sc = pow((er*(0.666666-0.064516))+0.064516, 2)
    k = nz(k[1])+(sc*(hl2-nz(k[1])))
    

n=input(title="period",defval=7)

n2ma=2*wma(close,round(n/2))
nma=wma(close,n)
diff=n2ma-nma
sqn=round(sqrt(n))

n2ma1=2*wma(close[1],round(n/2))
nma1=wma(close[1],n)
diff1=n2ma1-nma1
sqn1=round(sqrt(n))

n1=wma(diff,sqn)
n2=wma(diff1,sqn)
c=n1>n2?lime:red
ma=plot(n1,color=c, linewidth = 3)
plot(cross(nma, nma1) ? nma : na, style = cross, color = c, linewidth = 5)
    
kamaEntry = request.security(syminfo.tickerid,timeframe.period,kama(kamaPeriod))

plot(kamaEntry, color=gray, title="Kama",transp=0, trackprice=false, style=line)


strategy("Kama VS HeikinAshi", overlay=true, pyramiding=0, calc_on_every_tick=true, calc_on_order_fills=true)

buyEntry =  n1 > n2
sellEntry = close < kamaEntry and n1 < n2 

buyExit = close < kamaEntry and n1 < n2
sellExit = n1 > n2 
if (buyEntry)
    strategy.entry("KAMAL", strategy.long, comment="KAMAL")
else
    strategy.close("KAMAL", when=buyExit)

if (sellEntry)
    strategy.entry("KAMAS", strategy.short, comment="KAMAS")
else
    strategy.close("KAMAS", when = sellExit)


```

> Detail

https://www.fmz.com/strategy/441140

> Last Modified

2024-02-06 09:53:22
