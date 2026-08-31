
> Name

基于交易量强弱的趋势跟踪策略Volume-Flow-Indicator-Based-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/1a4b5c11b4eb09180c7.png)

## Overview

This strategy judges market trend direction by calculating changes in trading volume, and adopts a trend following approach by establishing positions at the beginning of trends and closing positions when trends end.

## Strategy Logic

1. Calculate typical price typical, logarithmic return inter, and return variance vinter
2. Calculate average trading volume vave, maximum trading volume threshold vmax  
3. Calculate price change mf, compare with variance threshold cutoff to get price driven momentum vcp
4. Sum vcp to get volume price indicator vfi, calculate vfi and its moving average vfima
5. Compare vfi with vfima to get the difference dVFI and determine trend direction
6. When dVFI crosses above 0, it is a bullish signal, and when crossing below 0, it is a bearish signal
7. Establish long and short strategies based on dVFI patterns

## Advantage Analysis

1. The strategy fully considers the impact of trading volume changes on trend judgment, using momentum indicators to measure trend strength and more accurately capture trend turning points.

2. The strategy incorporates trading volume threshold calculation to filter normal fluctuations and only capture collective behavior of large funds, avoiding being misled by market noise.

3. The combined consideration of price and volume can effectively avoid false breakouts.

4. The use of moving averages and logical criteria filters out most false signals.

5. Following trends rather than predicting reversals is well suited for medium-to-long term trend trading and capturing the market's main direction.

## Risk Analysis

1. The strategy relies mainly on trading volume changes to determine trends, and its effectiveness may be compromised in products with inactive trading volume.

2. Trading volume data can be manipulated, potentially generating misleading signals, so price-volume divergences need to be watched out for.

3. Price-volume relationships are often lagging, potentially missing the optimal entry timing at the beginning of trends. 

4. Crude stop loss methods may prematurely exit trades, unable to persistently capture trends.

5. Unable to respond effectively to short-term corrections, and may be insensitive to sudden events.

Consider incorporating moving averages, volatility indicators to optimize entries and stops; analyzing price-volume with more data sources to avoid misleading signals; incorporating appropriate technical indicators to improve responsiveness to short-term corrections.

## Optimization Directions

1. Optimize entry conditions by incorporating moving averages, ichimoku kinko hyo etc to confirm entries after trend starts.

2. Optimize stops with trailing stops, staged stops etc to make stops adhere closely to price and track trend stops. 

3. Add trend metrics like ADX to avoid incorrect trades in range-bound and choppy markets.

4. Optimize parameters through longer backtests to find optimal parameter combinations.

5. Expand strategy to more products, searching for higher quality instruments with active volume.

6. Consider adding machine learning models to leverage more data for price-volume analysis and improve signal quality.

## Conclusion

The overall strategy logic is clear, with intuitive core indicators reliably identifying trend direction. The advantage lies in emphasizing trading volume changes, suitable for tracking medium-to-long term trends, but misleading signals need to be watched out for. Further improvements in parameters, stop losses, indicator combinations can enhance live performance.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-08 00:00:00
end: 2023-11-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Strategy for Volume Flow Indicator with alerts and markers on the chart", overlay=true)
// This indicator has been copied form Lazy Bear's code
lengthVFI = 130 
coefVFI = 0.2 
vcoefVFI = 2.5 
signalLength= 5 
smoothVFI=true 

ma(x,y) => smoothVFI ? sma(x,y) : x

typical=hlc3
inter = log( typical ) - log( typical[1] )
vinter = stdev(inter, 30 )
cutoff = coefVFI * vinter * close
vave = sma( volume, lengthVFI )[1]
vmax = vave * vcoefVFI
vc = iff(volume < vmax, volume, vmax)
mf = typical - typical[1]
vcp = iff( mf > cutoff, vc, iff ( mf < -cutoff, -vc, 0 ) )

vfi = ma(sum( vcp , lengthVFI )/vave, 3)
vfima=ema( vfi, signalLength )
dVFI=vfi-vfima

bullishVFI = dVFI > 0 and dVFI[1] <=0
bearishVFI =  dVFI < 0 and dVFI[1] >=0

longCondition = dVFI > 0 and dVFI[1] <=0
shortCondition = dVFI < 0 and dVFI[1] >=0

plotshape(bullishVFI, color=color.green, style=shape.labelup, textcolor=#000000, text="VFI", location=location.belowbar, transp=0)
plotshape(bearishVFI, color=color.red, style=shape.labeldown, textcolor=#ffffff,  text="VFI", location=location.abovebar, transp=0)

alertcondition(bullishVFI, title='Bullish - Volume Flow Indicator', message='Bullish - Volume Flow Indicator')
alertcondition(bearishVFI, title='Bearish - Volume Flow Indicator', message='Bearish - Volume Flow Indicator')

if(year > 2018)
    strategy.entry("Long", strategy.long, when=dVFI > 0 and dVFI[1] <=0)

if(shortCondition)
    strategy.close(id="Long")


```

> Detail

https://www.fmz.com/strategy/432240

> Last Modified

2023-11-15 17:53:51
