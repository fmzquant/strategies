
> Name

Volatility-Finite-Volume-Elements-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c470ca20be4d22242c.png)

### Overview

This strategy is an improvement based on the Finite Volume Elements (FVE) indicator. FVE is a pure volume indicator that does not consider price changes, but only focuses on fund inflows and outflows. This strategy colors trading volume based on volatility on the basis of FVE to judge market sentiment and fund flows.  

### Strategy Principle 

The strategy calculates intraday volatility `Intra` and interday volatility `Inter`, combined with their standard deviations `Vintra` and `Vinter`, to obtain the volatility threshold `CutOff`. Then it calculates the difference `MF` between median price, previous median price and volume to judge fund inflow (positive) or outflow (negative). If `MF` exceeds `CutOff`, it means trading volume and volatility are in the same direction and there is obvious enthusiasm in the market, the color is set to green; if `MF` is below negative `CutOff`, it means trading volume and volatility are in the same direction and there is obvious pessimism in the market, the color is set to red; otherwise the color is blue. Finally, determine the long/short direction based on color.

### Advantage Analysis

The strategy combines trading volume and volatility indicators to judge market sentiment more accurately. Compared with single indicators, it has the advantages of stability and reliability in judgment. In addition, the judgment criteria of this strategy are specially designed for volatility and can adapt well to changes in different market conditions.

### Risk Analysis

The strategy relies on trading volume and volatility indicators. Discrepancies between the two will affect judgment. In addition, parameter settings have a greater impact on results, with large differences in results from different varieties and parameter combinations, requiring targeted optimization.

### Optimization Directions

Consider combining other indicators to assist in judgment, such as MACD, OBV, etc., to avoid noise from trading volume and volatility. It is also possible to design an adaptive parameter mechanism to dynamically adjust parameters according to different market conditions to improve stability. Or we can backtest and optimize parameters to find the best parameter portfolio for specific varieties.

### Summary

The strategy integrates the advantages of trading volume and volatility indicators to judge the level of market enthusiasm. Compared with single indicators, it has higher judgment accuracy and stability. However, parameter settings and variety differences have significant effects on the results, and further optimization and adjustment are still needed to adapt to various trading environments. Overall, the strategy has a reasonable theoretical basis and great potential for improvement.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|22|Samples|
|v_input_2|50|AvgLength|
|v_input_3|70|AlertPct|
|v_input_4|0.1|Cintra|
|v_input_5|0.1|Cinter|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-12 00:00:00
end: 2023-12-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/08/2017
// The FVE is a pure volume indicator. Unlike most of the other indicators 
// (except OBV), price change doesn?t come into the equation for the FVE 
// (price is not multiplied by volume), but is only used to determine whether 
// money is flowing in or out of the stock. This is contrary to the current trend 
// in the design of modern money flow indicators. The author decided against a 
// price-volume indicator for the following reasons:
// - A pure volume indicator has more power to contradict.
// - The number of buyers or sellers (which is assessed by volume) will be the same, 
// regardless of the price fluctuation.
// - Price-volume indicators tend to spike excessively at breakouts or breakdowns.
// This study is an addition to FVE indicator. Indicator plots different-coloured volume 
// bars depending on volatility.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Volatility Finite Volume Elements Strategy", shorttitle="FVI")
Samples = input(22, minval=1)
AvgLength = input(50, minval=1)
AlertPct = input(70, minval=1)
Cintra = input(0.1, step = 0.1)
Cinter = input(0.1, step = 0.1)
reverse = input(false, title="Trade reverse")
xVolume = volume
xClose = close
xhl2 = hl2
xhlc3 = hlc3
xMA = sma(xVolume, AvgLength)
xIntra = log(high) - log(low)
xInter = log(xhlc3) - log(xhlc3[1])
xStDevIntra = stdev(xIntra, Samples)
xStDevInter = stdev(xInter, Samples)
TP = xhlc3
TP1 = xhlc3[1]
Intra = xIntra
Vintra = xStDevIntra
Inter = xInter
Vinter = xStDevInter
CutOff = Cintra * Vintra + Cinter * Vinter
MF = xClose - xhl2 + TP - TP1
clr = iff(MF > CutOff * xClose, green, 
             iff(MF < -1 * CutOff * xClose, red,  blue))
pos = iff(MF > CutOff * xClose, 1,
	   iff(MF < -1 * CutOff * xClose, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )           
plot(xVolume, color=clr, title="VBF")
plot(xMA, color=blue, title="VBF EMA")
```

> Detail

https://www.fmz.com/strategy/435887

> Last Modified

2023-12-19 15:23:59
