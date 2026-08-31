
> Name

基于枢轴点逆转的量化策略Pivot-Reversal-Quantitative-Strategy-Based-on-Pivot-Points

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/110b3437ca7e3e94835.png)

## Overview
The core idea of this strategy is to use pivot points for quantitative trading. It looks for important swing highs and lows and makes reversal trades when prices break through these key levels.   

## Strategy Logic
The strategy first defines functions pivotHighSig() and pivotLowSig() to locate swing highs and low points. These two functions search for qualified pivot points on the left and right sides.   

Specifically, for swing highs, it looks for multiple higher highs on the left and multiple lower highs on the right. Thus the pivot high sits at a relatively higher level. The criteria for swing lows are opposite - it looks for higher lows and lower lows on both sides.

After locating the swing highs and lows, the strategy further selects pivot points from those pivot points, i.e. important points from the pivots. This is achieved by defining multiple historical variables for the swing highs and lows, e.g. ph1, ph2 etc.   

Finally, reversal trades are taken when prices break through the pivot points of pivots.  

## Advantages 
This pivot point based quantitative strategy has the following advantages:

1. It takes advantage of support and resistance levels in the market where turnarounds often happen  
2. It identifies both important high and low points for dual-side trading
3. Pivot points are outstanding extremum points and breaking through them gives strong signals 
4. Using pivot points of pivots makes the signal even more reliable

## Risks and Solutions
There are also some risks with this strategy:  

1. Misjudging pivot points leads to wrong signals. The solution is to tune the left/right range parameters to identify pivot points more precisely. 
2. Breakout false signals. The solution is to filter out signals combining other factors like volume, momentum etc.  

## Enhancement Areas   
This strategy can be improved in the following areas:  

1. Add stop loss mechanisms to make the strategy more stable
2. Incorporate more technical indicators for signal filtering   
3. Develop PRED reversal models using machine learning to further boost pivot point prediction
4. Build in adaptive parameters

## Conclusion
Overall this strategy performs well. The core idea is to detect important pivot points and trade their breakouts. Further enhancements can generate more solid and reliable signals for higher and more consistent profits.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|PP Left Bars|
|v_input_2|2|PP Right Bars|
|v_input_3|14|ATR Length|
|v_input_4|0.1|ATR Mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-13 00:00:00
end: 2024-02-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Pivot of Pivot Reversal Strategy [QuantNomad]", shorttitle = "PoP Reversal Strategy [QN]", overlay=true)

// Inputs 
leftBars   = input(4,   title = 'PP Left Bars')
rightBars  = input(2,   title = 'PP Right Bars')
atr_length = input(14,  title = 'ATR Length')
atr_mult   = input(0.1, title = 'ATR Mult')

// Pivot High Significant Function
pivotHighSig(left, right) =>
    pp_ok = true
    atr   = atr(atr_length)
    
    for i = 1 to left
        if (high[right] < high[right+i] + atr * atr_mult)
            pp_ok := false
    for i = 0 to right-1
        if (high[right] < high[i] + atr * atr_mult)
            pp_ok := false
    
    pp_ok ? high[right] : na

// Pivot Low Significant Function
pivotLowSig(left, right) =>
    pp_ok = true
    atr   = atr(atr_length)
    
    for i = 1 to left
        if (low[right] > low[right+i] - atr * atr_mult)
            pp_ok := false
    for i = 0 to right-1
        if (low[right] > low[i] - atr * atr_mult)
            pp_ok := false
    
    pp_ok ? low[right] : na


swh = pivotHighSig(leftBars, rightBars)
swl = pivotLowSig (leftBars, rightBars)

swh_cond = not na(swh)

hprice = 0.0
hprice := swh_cond ? swh : hprice[1]

le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])

swl_cond = not na(swl)

lprice = 0.0
lprice := swl_cond ? swl : lprice[1]

se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])

// Pivots of pivots
ph1 = 0.0
ph2 = 0.0
ph3 = 0.0

pl1 = 0.0
pl2 = 0.0
pl3 = 0.0

pphprice = 0.0
pplprice = 0.0

ph3 := swh_cond ? nz(ph2[1]) : nz(ph3[1])
ph2 := swh_cond ? nz(ph1[1]) : nz(ph2[1])
ph1 := swh_cond ? hprice     : nz(ph1[1])

pl3 := swl_cond ? nz(pl2[1]) : nz(pl3[1])
pl2 := swl_cond ? nz(pl1[1]) : nz(pl2[1])
pl1 := swl_cond ? lprice     : nz(pl1[1])

pphprice := swh_cond and ph2 > ph1 and ph2 > ph3 ? ph2 : nz(pphprice[1])
pplprice := swl_cond and pl2 < pl1 and pl2 < pl3 ? pl2 : nz(pplprice[1])


if (le)
    strategy.entry("PP_RevLE", strategy.long, comment="PP_RevLE", stop=pphprice + syminfo.mintick)

if (se)
    strategy.entry("PP_RevSE", strategy.short, comment="PP_RevSE", stop=pplprice - syminfo.mintick)
    
// Plotting 
plot(lprice, color = color.red,   transp = 55)
plot(hprice, color = color.green, transp = 55)

plot(pplprice, color = color.red,   transp = 0, linewidth = 2)
plot(pphprice, color = color.green, transp = 0, linewidth = 2)
```

> Detail

https://www.fmz.com/strategy/442231

> Last Modified

2024-02-20 14:22:13
