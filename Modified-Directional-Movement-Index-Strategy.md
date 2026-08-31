
> Name

Modified-Directional-Movement-Index-Strategy

> Author

ChaoZhang

> Strategy Description





## Strategy Logic 

This strategy trades based on the Modified Directional Movement Index (DMI). The modified DMI compares the difference between positive directional indicator (+DI) and negative directional indicator (-DI) to judge trend direction.

The trading logic is:

1. Calculate +DI and -DI over a period

2. Map +DI and -DI values to a range from 100 to -100 

3. Plot the difference between +DI and -DI as the modified DMI line

4. Go long when modified DMI crosses above 0 

5. Go short when modified DMI crosses below 0

6. Optional smoothing of DMI line to filter false signals

The strategy directly compares the relative strength of +DI and -DI to determine trend, overcoming limitations of single indicators.

## Advantages

- Modified DMI intuitively reflects +DI/-DI comparison

- Smoothing DMI filters fakeouts  

- Clear long/short signal points

## Risks

- DMI itself has lag, may miss timing

- Parameter period requires optimization  

- Prone to whipsaws in choppy markets

## Summary

This strategy judges trend direction change through the modified DMI, providing an alternative view to trend trading. But DMI's lagging nature needs caution, and can be combined with other confirming indicators.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Length|
|v_input_2|9|Smoothing length|
|v_input_3|0|Moving Average Type: EMA|SMA|SMMA|NONE|WMA|HMA|JMA|
|v_input_4|true|Allow Short|
|v_input_5|false|Color bars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-07 00:00:00
end: 2023-09-13 00:00:00
period: 3d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(shorttitle="DMI Modified Strategy", title="DMI Modified Strategy", overlay=true,default_qty_type=strategy.cash, default_qty_value=10000, initial_capital=10000)
// This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License https://creativecommons.org/licenses/by-sa/4.0/
// © dman103
// As promised a strategy of my DMI Modified indicator! (See link below for indicator).
// === How does it work? ===
// Instead of plotting the positive direction of +DI and negative direction for -DI, we subtract the +DI with the -DI on scales of 100 to -100.
// The result is plotted with a oscillator to identify the current trend.
// DMI Modified supports multiple moving averages (default is EMA with length of 9). You can disable moving averages smoothing in settings.

//== About the Strategy ==
// Buys when the line crosses over the Zero line.
// Sells when the line crosses under the Zero line.
// The DMI modified  strategy is pretty much clean, without any filtering besides the DMI Modified and a moving average to smooth it.
// Works best to catch a trend and more suitable for 1 hour and above time frame. Stay tuned for updates.

// == Oscillator Colors ==
// GREEN : Strong Up Trend as DMI Modified is above zero line and DMI modified is ascending.
// LIGHT GREEN: Still up trend but weakening as DMI modified is above zero but descending. 
// RED: Strong Downtrend as DMI Modified is below zero line and DMI modified is descending.
// LIGHT RED: Still down trending but weakening as DMI modified is below zero but ascending.

// == Notes ==
// Short is enabled by default.
// Can also be used to find divergences.
// Bar coloring is disabled by default

// == Links ==
// DMI modified indicator: https://www.tradingview.com/script/CbDXEyDN-DMI-Modified/
// Like if you like and Enjoy! Follow for more upcoming indicators/strategies: https://www.tradingview.com/u/dman103/#published-scripts

length = input(9, title="Length", minval=0)
smoothing_length=input(9, title="Smoothing length")
ma_select = input(title="Moving Average Type", defval="EMA", options=["NONE","SMA","SMMA" ,"EMA", "WMA", "HMA", "JMA"])
allow_short = input(true,title="Allow Short")
MA_selector(src, length) =>
    ma = 0.0
    if ma_select == "NONE"
        ma:=src
        ma
    if ma_select == "SMA"
        ma := sma(src, length)
        ma
    if ma_select == "SMMA"
        smma = float (0.0)
        smaval=sma(src, length)
        smma := na(smma[1]) ? smaval : (smma[1] * (length - 1) + src) / length
        ma := smma
    if ma_select == "EMA"
        ma := ema(src, length)
        ma

    if ma_select == "WMA"
        ma := wma(src, length)
        ma
    if ma_select == "HMA"
        ma := hma(src,length)
        ma
    if ma_select == "JMA"
        beta = 0.45*(length-1)/(0.45*(length-1)+2)
        alpha = beta
        tmp0 = 0.0, tmp1 = 0.0, tmp2 = 0.0, tmp3 = 0.0, tmp4 = 0.0
        tmp0 := (1-alpha)*src + alpha*nz(tmp0[1])
        tmp1 := (src - tmp0[0])*(1-beta) + beta*nz(tmp1[1])
        tmp2 := tmp0[0] + tmp1[0]
        tmp3 := (tmp2[0] - nz(tmp4[1]))*((1-alpha)*(1-alpha)) + (alpha*alpha)*nz(tmp3[1])
        tmp4 := nz(tmp4[1]) + tmp3[0]
        ma := tmp4
        ma
    
    ma
color_bars=input(false,title="Color bars")
//  Colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #AAFFDB
col_fall_below = #EF5350

dirmov(len,up_band,low_band) =>
	up = change(highest(up_band,len)) 
	down = -change(lowest(low_band,len))
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, len) / truerange)
	minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, len) / truerange)
	[plus, minus]

[plus, minus]= dirmov(length,high,low)
result= plus-minus
result:=MA_selector(result,smoothing_length)
closeStatus =  strategy.openprofit > 0 ? "win" : "lose"
colors= result > 0 and result>result[1] ? col_grow_above : result > 0 and result<result[1] ? col_fall_above : result<0 and result>result[1] ? col_grow_below : result<0 and result<result[1] ? col_fall_below : color.white
dmi=plot(result, style=plot.style_line, color=colors, linewidth=2, title="DI+-")
barcolor(color_bars ? colors : na)
zero_line=plot(0, color=color.white, title="0-Line",transp=60)
fill (dmi,zero_line,color=colors)
long =  result > 0 and result>result[1]
short = result< 0 and result<result[1]
// strategy.entry("B", true,when=long)
// strategy.entry("S",false,when=short)


//, comment=strategy.position_size<0 ? closeStatus : na)
strategy.close("short",when=long,comment=closeStatus)
strategy.close("long",when=short,comment=closeStatus)
strategy.entry("long", true, when = long)
if (allow_short)
    strategy.entry("short",false, when = short)

plotshape(crossover(result,0) ? result : na, style=shape.circle, color=color.lime,location=location.absolute,size=size.tiny,transp=65)
plotshape(crossunder(result,0) ? result : na, style=shape.circle, color=color.red,location=location.absolute,size=size.tiny,transp=65)
```

> Detail

https://www.fmz.com/strategy/426806

> Last Modified

2023-09-14 16:41:00
