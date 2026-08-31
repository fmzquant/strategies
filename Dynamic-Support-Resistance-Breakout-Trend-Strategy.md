
> Name

Dynamic-Support-Resistance-Breakout-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/5d2296c9e095a86b13.png)

## Overview

This strategy judges the trend direction based on the long-term support/resistance breakout and enters the position when the support/resistance is broken. It uses zigzag to define peaks and valleys, confirming peaks/valleys with 2 bars, so there is 2 bars lag. It calculates the difference between SMA of peaks and valleys in a defined period (21 by default) as alternative SR level. This idea is from synapticEx's Nebula-Advanced-Dynamic-Support-Resistance indicator. It goes long when resistance broken and goes short when support broken.

## Strategy Logic

The strategy uses the following logic to determine trends and trading signals:

1. Confirm peaks/valleys with zigzag: when in last 5 bars, bar 5 peak < bar 4 peak < bar 3 peak > bar 2 peak > bar 1 peak, bar 3 valley is confirmed as lowest valley. Confirm highest peak similarly.  

2. Calculate number of peaks hn and valleys ln in defined period (default 21). If hn>0 and ln>0, calculate average level of peaks hsum/hn and average level of valleys lsum/ln. Their difference r is used as alternative SR level.

3. Compare close price with dynamic resistance lvalr and support hvalr to determine trend direction. Breakout of either resistance or support is regarded as valid breakout.  

4. Go long when valid breakout of resistance happen. Go short when valid breakout of support happen.

## Advantage Analysis   

The advantages of this strategy:

1. Using zigzag to confirm SR provides accuracy, avoiding false breakout. 

2. SR based on long term statistics is more valuable to reduce risk.

3. Alternative SR improves validity of breakout signals.  

4. The logic is simple and easy to understand, suitable for quant trading.

5. Customizable statistic period fits different cycles and products.

## Risk Analysis

Risks of this strategy:

1. 2 bars lag with zigzag may miss best entry point.  

2. Predicted SR is just for reference, abnormal breakout can still happen.

3. Improper statistic period leads to invalid SR.

4. Price pullback after breakout may trigger stop loss. 

5. Violent price swing after entry brings larger loss.

The solutions are:

1. Shorten statistic period properly to reduce lag.

2. Combine more factors to predict SR.  

3. Test stability of different periods.

4. Set reasonable stop loss level.

5. Use position sizing to limit single loss.

## Optimization Directions   

The strategy can be optimized from aspects below:

1. Use machine learning to predict SR, improving success rate of breakout signals.  

2. Combine CONF volume to confirm validity of breakout signals. High open interests makes breakout more convincing.   

3. Classify statistic of SR based on different cycles, improving efficiency of SR.

4. Add position on profit, set trail stop to balance profit/loss. Earns more profit while locking gain.

5. Combine MA to determine trend, avoiding blindly long/short without trend.  

## Conclusion

In conclusion, this is a robust trend following strategy. It has high accuracy in determining trend direction and proper risk control. But the lag makes it impossible to profit from every long/short signal. So it fits experienced quant traders to combine with their own strategies. By optimizing statistic periods and integrating other indicators or models, it can become an efficient trend following strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|SR lookbak length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-25 00:00:00
end: 2023-12-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("SR TREND STRATEGY", shorttitle="SR TREND", overlay=true, calc_on_order_fills=true)
//based on by synapticEx SR indicator https://www.tradingview.com/script/O0F675Kv-Nebula-Advanced-Dynamic-Support-Resistance/
length = input(title="SR lookbak length", type=input.integer, defval=21)
h = bar_index>5 and high[5]<high[4] and high[4]<high[3] and high[3]>high[2] and high[2]>high[1] ? 1 : 0
l = bar_index>5 and low[5]>low[4]   and low[4]>low[3]   and low[3]<low[2]   and low[2]<low[1]   ? 1 : 0
ln = sum(l, length)
hn = sum(h, length)
hval =  h>0 ? high[3] : 0
lval =  l>0 ? low[3]  : 0
lsum = sum(lval, length)
hsum = sum(hval, length)
r = ln>0 and hn>0 ? abs((hsum/hn) - (lsum/ln)): 0
float lvalc = na
float lvalr = na
float hvalc = na
float hvalr = na
lvalc := lval and r>0 ? lval   : lvalc[1]
lvalr := lval and r>0 ? lval+r : lvalr[1]
hvalc := hval and r>0 ? hval   : hvalc[1]
hvalr := hval and r>0 ? hval-r : hvalr[1]
int trend=0
trend:=close > lvalr and close > hvalr ? 1 : close < lvalr and close < hvalr ? -1 : trend[1]
strategy.close("Long", when=trend==-1)
strategy.close("Short", when=trend==1)
strategy.entry("Long", strategy.long, when=trend==1 and close>hvalc)
strategy.entry("Short", strategy.short, when=trend==-1 and close<lvalc)
int long=0
int short=0
long:= trend==1 and close>hvalc ? 1 : trend==-1 ? -1 : long[1]
short:= trend==-1 and close<lvalc ? 1 : trend==1 ? -1 : short[1]
barcolor(long>0? color.green : short>0? color.red : trend>0? color.white: trend<0 ? color.orange : color.blue)
```

> Detail

https://www.fmz.com/strategy/436641

> Last Modified

2023-12-26 15:21:45
