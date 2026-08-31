
> Name

Cross-Timeframe-Hull-Moving-Average-Buy-Sell-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/712ccf74f78b65481d.png)

### Overview

This strategy is based on the Hull Moving Average indicator, calculating Hull MA on different timeframes and comparing the Hull MA trends across timeframes to identify trend changes. It generates buy signals when the shorter period Hull MA crosses above the longer period Hull MA, and sell signals when the shorter Hull MA crosses below the longer one.

### Strategy Logic

1. Input parameters: Hull MA period Period, HMA2 timeframe Resolution2, HMA3 timeframe Resolution3

2. Calculate current bar's Hull MA value HMA

3. Calculate Hull MA value HMA2 on Resolution2 timeframe

4. Calculate Hull MA value HMA3 on Resolution3 timeframe

5. Compare the magnitude relationship between HMA, HMA2, HMA3

6. Generate buy signal when HMA>HMA2>HMA3

7. Generate sell signal when HMA<HMA2<HMA3 

8. Display Hull MA values and signals on different timeframes on top left of chart  

9. Use colors to distinguish uptrend and downtrend

### Advantage Analysis

1. Using multiple timeframes can filter false breakouts and avoid traps.

2. Customizable timeframe parameters, adaptable to different periods and volatility. 

3. Real-time signal display, intuitive operation.

4. Visualized Hull MA trends help determine current trend.

### Risk Analysis

1. Improper parameter settings may cause over-trading. 

2. Larger timeframe Hull MA has lagging effect, may miss trend turning points.

3. May generate false signals around bull-bear transition.

4. Breakout strategies are prone to getting trapped by false breakouts. 

5. Trading commissions are not considered which impacts actual profit.

Risks can be reduced by optimizing parameters, combining other indicators for filtration, and allowing wider stop loss.

### Optimization Directions

1. Optimize Hull MA period adaptable to different periods and volatility.

2. Add volume indicator to avoid false breakouts.

3. Add oscillators to determine trend strength. 

4. Incorporate machine learning models for buy/sell timing.

5. Combine sentiment indicators to detect market hype.

6. Adjust stop loss strategy for better risk management.

7. Customize buy/sell conditions with other indicator signals.

8. Add price channel or wave based trading strategies.

### Conclusion

This strategy uses multi-timeframe Hull MA to determine trend direction by comparing moving average slopes across timeframes and generates signals at trend reversals. Multi-timeframe Hull MA is more effective in filtering false breakouts than single MA. But this strategy also has limitations in parameter tuning, trend determination etc. Integrating more indicators, optimizing parameters, improving stop loss can enhance profitability and control risk.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|Hull MA Period|
|v_input_2|60|HMA2 Resolution|
|v_input_3|240|HMA3 Resolution|
|v_input_4_open|0|Source of Price: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|40|Panel offset (X-Axis)|
|v_input_6|false|Panel offset (y-Axis)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-07 00:00:00
end: 2023-11-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//
strategy("wtfBUYorSELLffs",overlay=true,currency="USD",initial_capital=100000,default_qty_type=strategy.percent_of_equity,default_qty_value=100,commission_type=strategy.commission.percent,commission_value=0.1)
Period=input(title="Hull MA Period",type=input.integer,defval=6,minval=1)
Resolution2=input(title="HMA2 Resolution", type=input.resolution,defval="60")
Resolution3=input(title="HMA3 Resolution", type=input.resolution,defval="240")
Price=input(title="Source of Price",type=input.source,defval=open)
xOffset       = input(40, title="Panel offset (X-Axis)")
yOffset       = input(0, title="Panel offset (y-Axis)")
lightgray = #D3D3D3FF
pnlTextColor = color.silver
pnlColor = color.black
HMA = hma(Price,Period)
HMA2 = security(syminfo.tickerid, Resolution2, HMA,barmerge.gaps_off,barmerge.lookahead_off)
HMA3 = security(syminfo.tickerid, Resolution3, HMA,barmerge.gaps_off,barmerge.lookahead_off) 
HUP = HMA > HMA[1]
H1UP = security(syminfo.tickerid, Resolution2, HUP,barmerge.gaps_off,barmerge.lookahead_off)
H2UP = security(syminfo.tickerid, Resolution3, HUP,barmerge.gaps_off,barmerge.lookahead_off) 

int barSize = timeframe.isdaily ? timeframe.multiplier*86400000 : 
           timeframe.isseconds? timeframe.multiplier*1000 :
           timeframe.isminutes? timeframe.multiplier*60000 : (time[0]-time[1])
int   lapos_x = timenow + barSize*xOffset
float lapos_y = highest(20) + yOffset*syminfo.mintick * syminfo.pointvalue
f_draw_infopanel(_x, _y, _line, _text)=>
    _rep_text = ""
    for _l = 0 to _line
        _rep_text := _rep_text + "\n"
    _rep_text := _rep_text + _text
    // var label _la = na
    // label.delete(_la)
//     _la := label.new(
//          x=_x, y=_y, 
//          text=_rep_text, xloc=xloc.bar_time, yloc=yloc.price, 
//          color=pnlColor, style=label.style_labelup, textcolor=pnlTextColor, size=size.normal)
// f_draw_infopanel(lapos_x, lapos_y, 8, "╚═══════════════════════╝")
f_draw_infopanel(lapos_x, lapos_y, 6,  "HMA3 on TF " + Resolution3 + "  = " + tostring(HMA3,"#.####") + (H2UP ? " BUY" : " SELL"))
f_draw_infopanel(lapos_x, lapos_y, 4,  "HMA2 on TF " + Resolution2 + "  = " +  tostring(HMA2,"#.####") + (H1UP ? " BUY" : " SELL"))
f_draw_infopanel(lapos_x, lapos_y, 2,  "HMA1 on TF " + timeframe.period + "  = " + tostring(HMA,"#.####") + (HUP ? " BUY" : " SELL"))
f_draw_infopanel(lapos_x, lapos_y, 0,  "╔═════════ HMA(" + tostring(Period,"#") +") ════════╗")
change_color=HMA>HMA3?color.green:color.red
change_color2=HMA2>HMA3?color.lime:color.yellow
plot1=plot(HMA3,color=change_color2,title="3 Hull MA Line",linewidth=2,transp=75)
plot2=plot(HMA2,color=change_color,title="2 Hull MA Line",linewidth=2,transp=75)
plot3=plot(HMA,color=color.white,title="Hull MA Line",linewidth=2,transp=75)
fill(plot1,plot3,color=change_color,transp=90)
fill(plot2,plot3,color=change_color2,transp=75)
if (H2UP and H1UP and HUP)
    strategy.entry("BUY",strategy.long)
if (not H2UP and not H1UP and not HUP)
    strategy.entry("SELL",strategy.short)
```

> Detail

https://www.fmz.com/strategy/431419

> Last Modified

2023-11-07 16:54:14
