
> Name

基于自适应波动性的有限体积要素策略Adaptive-Volatility-Finite-Volume-Elements-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ef2cf0e3c08570149b.png)


## Overview

This strategy utilizes the finite volume element method combined with adaptive volatility metrics to determine long and short signals, belonging to the trend following strategies. It is applicable to all timeframes and can automatically adjust parameters to adapt to different volatility levels.  

## Principles

The strategy first calculates the average of high and low prices, average of close prices of recent N bars, and average high, low and close prices of the previous bar. Then it computes the logarithmic returns Intra and Inter for the current and previous bar. Meanwhile, it calculates the volatilities Vintra and Vinter of Intra and Inter.

Based on the volatility levels and adjustable parameters, the adaptive cutoff coefficient CutOff is determined. When price change exceeds the CutOff, long or short signals are generated. Specifically, it calculates the difference MF between current close price and average of high & low prices. When MF is greater than CutOff, it's a long signal. When MF is less than negative CutOff, it's a short signal.

Finally according to the signals, fund flows are calculated, outputting the position signal pos, and plotting the Finite Volume Element curve FVE.

## Advantages

1. Adaptive parameters, applicable to different timeframes and volatility levels without manual adjustment.

2. Accurately captures trend changes of the prices. 

3. The FVE curve clearly reflects the comparison of long and short forces.

4. Solid theoretical basis of fund flow analysis, relatively reliable signals.

## Risks

1. May generate more false signals during violent market fluctuation. Can adjust N accordingly.

2. Unable to handle price gaps. Can consider combining other indicators. 

3. Fund flow signals may diverge from technical analysis sometimes. Can combine multiple signals.

## Optimization

1. Can test the impact of different N values. Generally larger N can filter out noise.

2. Can test different combinations of Cintra and Cinter to find optimal parameters. Or consider adapting them dynamically.

3. Can combine with other indicators like MACD to improve robustness. 

4. Can build in stop loss mechanisms to control single trade loss.

## Conclusion

Overall this strategy is quite reliable with solid principles. It can serve as a component of trend following strategies, and work even better when combined properly with others. The key is to find optimal parameters and establish sound risk management. If further optimized, it can become a very powerful trend following system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|22|Samples|
|v_input_2|40|Perma|
|v_input_3|0.1|Cintra|
|v_input_4|0.1|Cinter|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-10 00:00:00
end: 2023-10-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/08/2017
// This is another version of FVE indicator that we have posted earlier 
// in this forum.
// This version has an important enhancement to the previous one that`s 
// especially useful with intraday minute charts.
// Due to the volatility had not been taken into account to avoid the extra 
// complication in the formula, the previous formula has some drawbacks:
// The main drawback is that the constant cutoff coefficient will overestimate 
// price changes in minute charts and underestimate corresponding changes in 
// weekly or monthly charts.
// And now the indicator uses adaptive cutoff coefficient which will adjust to 
// all time frames automatically.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Volatility Finite Volume Elements", shorttitle="FVI")
Samples = input(22, minval=1)
Perma = input(40, minval=1)
Cintra = input(0.1, step=0.1)
Cinter = input(0.1, step=0.1)
reverse = input(false, title="Trade reverse")
xhl2 = hl2
xhlc3 = hlc3
xClose = close
xIntra = log(high) - log(low)
xInter = log(xhlc3) - log(xhlc3[1])
xStDevIntra = stdev(sma(xIntra, Samples) , Samples)
xStDevInter = stdev(sma(xInter, Samples) , Samples)
xVolume = volume
TP = xhlc3
TP1 = xhlc3[1]
Intra = xIntra
Vintra = xStDevIntra
Inter = xInter
Vinter = xStDevInter
CutOff = Cintra * Vintra + Cinter * Vinter
MF = xClose - xhl2 + TP - TP1
FveFactor = iff(MF > CutOff * xClose, 1, 
             iff(MF < -1 * CutOff * xClose, -1,  0))
xVolumePlusMinus = xVolume * FveFactor
Fvesum = sum(xVolumePlusMinus, Samples)
VolSum = sum(xVolume, Samples)
xFVE = (Fvesum / VolSum) * 100
xEMAFVE = ema(xFVE, Perma)
pos = iff(xFVE > xEMAFVE, 1,
	   iff(xFVE < xEMAFVE, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xFVE, color=green, title="FVI")
plot(xEMAFVE, color=blue, title="FVI EMA")
```

> Detail

https://www.fmz.com/strategy/429476

> Last Modified

2023-10-17 14:50:13
