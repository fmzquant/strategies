
> Name

Triple-Dragon-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14d32d714992989aaf3.png)


## Overview

The Triple Dragon System is a composite technical trading strategy combining Extended Price Volume Trend (EPVT) indicator, Donchian Channels indicator and Parabolic SAR indicator. This strategy utilizes the complementary strengths of three indicators to identify market trend direction and potential buy and sell signals.  

## Strategy Principle  

This strategy first uses EPVT and Donchian Channels to determine market trend direction. When EPVT is above its baseline and price is above the upper Donchian Channel, it suggests an uptrend. Conversely, when EPVT is below its baseline and price is below the lower Donchian Channel, it suggests a downtrend.

After identifying the trend direction, this strategy introduces Parabolic SAR indicator to identify specific entry and exit points. When Parabolic SAR crosses below price, it generates a buy signal. When Parabolic SAR crosses above price, it generates a sell signal.  

To further validate signals, this strategy also confirms trend direction across multiple timeframes to avoid entering the market during periods of high volatility. In addition, multiple take-profit levels are set to lock in profits and control risk.

## Advantage Analysis

The biggest advantage of Triple Dragon System is the combined use of three different types of highly complementary indicators to more comprehensively and accurately determine market trends. Specifically, the main advantages are:  

1. EPVT can accurately identify trend change points and trend strength with good fundamentals;
2. Donchian Channels can clearly determine trend direction and capture trends well;
3. Parabolic SAR, when combined with trend indicators, can more accurately identify entry and exit points.

By organically combining indicators, the Triple Dragon System can make full use of the advantages of each indicator, resulting in high accuracy in judging long, medium and long term trends, more precise identification of entry and exit points, and superior risk-reward ratios.

## Risk Analysis  

As an indicator portfolio strategy, Triple Dragon System has overall controllable risks, but still some risks to note:

1. EPVT has risks of misjudging fake breakouts and huge reversals;
2. Donchian Channels may narrow during sideways consolidations, increasing error signal probability; 
3. Improper Parabolic SAR parameter settings can also impact buy/sell point identification to some extent.

To address the above risks, we recommend appropriately adjusting indicator parameter settings and using other indicators for supplementary judgement to reduce the probability of single indicator failure. In addition, proper stop loss and position sizing are also crucial for overall strategy risk control.  

## Strategy Optimization

There is room for further optimization of the Triple Dragon System:  

1. Machine learning algorithms can be introduced for automated parameter optimization;
2. Volatility indicators can be considered to enhance stability;
3. Sentiment indicators can be incorporated to determine public sentiment fluctuations.  

Through algorithmic parameter optimization, multi-indicator combination judgements, and behavioral quantification analysis, there is potential to further improve the profitability and stability of the Triple Dragon System. We will keep abreast of cutting-edge industry developments to continuously optimize and refine the strategy system.

## Conclusion  

The Triple Dragon System is a technical indicator portfolio strategy that leverages the complementary strengths of EPVT, Donchian Channels and Parabolic SAR to determine market trends and identify trading opportunities. This strategy has precise judgements, controllable risks, multiple layers of validation, and is an effective system suitable for medium-long term investors. We will continue optimizing the Triple Dragon System for superior risk-reward ratios.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|EPVT - Trend Lenght|
|v_input_int_1|200|Donchian Lenght|
|v_input_2|0.02|start|
|v_input_3|0.02|increment|
|v_input_4|0.8|maximum|
|v_input_5|true|Entry on Nth trend bar|
|v_input_int_2|5|TP-1|
|v_input_int_3|10|TP-2|
|v_input_int_4|15|TP-3|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-12-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="TRIPLE DRAGON SYSTEM", overlay=true,default_qty_type = strategy.percent_of_equity,default_qty_value=100,initial_capital=1000,pyramiding=0,commission_value=0.01)
/////////////// DRAG-ON ///// EMA'S /////////////// 
emar = ta.ema(close,5)
plot(emar, color=color.blue, title="S-Fast EMA")
//EMAlengthTRF = input.int(200, minval=1,title = "EMA Filter")
//ematrf = ta.ema(close,EMAlengthTRF)
//plot(ematrf, "EMA-TREND FILTER", color=color.red,linewidth = 4)
/////////////// 1-DRAG-ON /////EXTENDED PRICE VOLUME TREND /////////////// 
lenght = input(200,"EPVT - Trend Lenght")   
var cumVol = 0.
cumVol += nz(volume)
if barstate.islast and cumVol == 0
    runtime.error("No volume is provided by the data vendor.")
src = close

vt = ta.cum(ta.change(src)/src[1]*volume)
upx = ta.highest(vt,lenght)
downx = ta.lowest(vt,lenght)
basex = (upx +downx)/2
VTX = vt - basex

/////////////// 2-DRAG-ON ///// DON TREND /////////////// 

length = input.int(200, minval=1, title = "Donchian Lenght")
lower = ta.lowest(length)
upper = ta.highest(length)
basis = math.avg(upper, lower)

updiff = upper - close
downdiff = lower - close
dontrend = -(updiff + downdiff)   

xupx = ta.highest(dontrend,length) >0 ? ta.highest(dontrend,length) : 0 

xdownx = ta.lowest(dontrend,length) < 0 ?ta.lowest(dontrend,length) :0 
xxbasisxx = math.avg(xdownx, xupx)

inversedragup = xupx[1]  
inversedragdown = xdownx[1]  
inversedragon = (inversedragup+inversedragdown)/2

/////////////// 3-DRAG-ON ///// SUPER SAR-X /////////////// 
start = input(0.02)
increment = input(0.02)
maximum = input(0.8)
entry_bars = input(1, title='Entry on Nth trend bar')

atr = ta.atr(14)

atr := na(atr) ? ta.tr : atr

psar = 0.0  // PSAR
af = 0.0  // Acceleration Factor
trend_dir = 0  // Current direction of PSAR
ep = 0.0  // Extreme point
trend_bars = 0

sar_long_to_short = trend_dir[1] == 1 and close <= psar[1]  // PSAR switches from long to short
sar_short_to_long = trend_dir[1] == -1 and close >= psar[1]  // PSAR switches from short to long

trend_change = barstate.isfirst[1] or sar_long_to_short or sar_short_to_long

// Calculate trend direction
trend_dir := barstate.isfirst[1] and close[1] > open[1] ? 1 : barstate.isfirst[1] and close[1] <= open[1] ? -1 : sar_long_to_short ? -1 : sar_short_to_long ? 1 : nz(trend_dir[1])

trend_bars := sar_long_to_short ? -1 : sar_short_to_long ? 1 : trend_dir == 1 ? nz(trend_bars[1]) + 1 : trend_dir == -1 ? nz(trend_bars[1]) - 1 : nz(trend_bars[1])

// Calculate  Acceleration Factor
af := trend_change ? start : trend_dir == 1 and high > ep[1] or trend_dir == -1 and low < ep[1] ? math.min(maximum, af[1] + increment) : af[1]

// Calculate extreme point
ep := trend_change and trend_dir == 1 ? high : trend_change and trend_dir == -1 ? low : trend_dir == 1 ? math.max(ep[1], high) : math.min(ep[1], low)

// Calculate PSAR
psar := barstate.isfirst[1] and close[1] > open[1] ? low[1] : barstate.isfirst[1] and close[1] <= open[1] ? high[1] : trend_change ? ep[1] : trend_dir == 1 ? psar[1] + af * atr : psar[1] - af * atr

//////////////// MELODY ///////////////////
VTY = ta.valuewhen(ta.cross(VTX,0),close,0)
//plot(VTY, color=color.black, title="Extended-PVT")

//DONTRENDX = ta.valuewhen(ta.cross(dontrend,0),close,0)
//plot(DONTRENDX, color=color.red, title="DONCHIAN TREND")

SSARX = ta.valuewhen(ta.cross(psar,close),close,0)
//plot(SSARX, color=color.black, title="SSAR-X")

MAXDRAG = math.max(SSARX,VTY)
//plot(MAXDRAG, color=color.black, title="MAX DRAG")
MINDRAG = math.min(SSARX,VTY)
//plot(MINDRAG, color=color.black, title="MIN DRAG")
BASEDRAG = math.avg(MAXDRAG,MINDRAG)
//plot(BASEDRAG, color=color.red, title="BASE DRAG")


/////BUY AND SELL LOGIC ///////////
DRAGONBUY = (ta.crossover(close,MAXDRAG) or ta.crossover(close,MINDRAG) )
DRAGONBUYSTOP = (ta.crossunder(close,MAXDRAG) or ta.crossunder(close,MINDRAG)) 
DRAGONBUYPLOT = ta.valuewhen(DRAGONBUY==true,close,0)
plot(DRAGONBUYPLOT, color=color.red, title="BUY LINE")

DRAGONSELL = (ta.crossunder(close,MAXDRAG) or ta.crossunder(close,MINDRAG) ) 
DRAGONSELLSTOP = (ta.crossover(close,MAXDRAG) or ta.crossover(close,MINDRAG))
DRAGONSELLPLOT = ta.valuewhen(DRAGONSELL==true,close,0)
plot(DRAGONSELLPLOT, color=color.red, title="SELL LINE")

/////TAKE PROFIT LOGIC ///////////
tp1 = input.int(5, minval=1,title = "TP-1")
tp2 = input.int(10, minval=1,title = "TP-2")
tp3 = input.int(15, minval=1,title = "TP-3")

TPTAKA1B = DRAGONBUYPLOT*(1+tp1/100)
//plot(TPTAKA1B, "BUY-TP1", color=color.red,linewidth = 1)
TPTAKA2B = DRAGONBUYPLOT*(1+tp2/100)
//plot(TPTAKA2B, "BUY-TP2", color=color.red,linewidth = 1)
TPTAKA3B = DRAGONBUYPLOT*(1+tp3/100)
//plot(TPTAKA3B, "BUY-TP3", color=color.red,linewidth = 1)

TPTAKA1S = DRAGONSELLPLOT*(1-tp1/100)
//plot(TPTAKA1S, "SELL-TP1", color=color.red,linewidth = 1)
TPTAKA2S = DRAGONSELLPLOT*(1-tp2/100)
//plot(TPTAKA2S, "SELL-TP2", color=color.red,linewidth = 1)
TPTAKA3S = DRAGONSELLPLOT*(1-tp3/100)
//plot(TPTAKA3S, "SELL-TP3", color=color.red,linewidth = 1)


BUYTP = ta.crossunder(emar,TPTAKA1B) or ta.crossunder(emar,TPTAKA2B) or ta.crossunder(emar,TPTAKA3B) 
SELLTP = ta.crossover(emar,TPTAKA1B) or ta.crossover(emar,TPTAKA2B) or ta.crossover(emar,TPTAKA3B)

/////STRATEGY ///////////
// Enter condition 
longCondition = DRAGONBUY==true 
if longCondition
    strategy.entry('Long', strategy.long, comment = "ENTER-LONG")

// Exit condition 
strategy.close('Long', when=DRAGONBUYSTOP, comment = "EXIT-LONG")

// Enter condition 
ShortCondition = DRAGONSELL  
if ShortCondition
    strategy.entry('Short', strategy.short, comment = "ENTER-SHORT")

// Exit condition 
strategy.close('Short', when=DRAGONSELLSTOP, comment = "EXIT-SHORT")
///// END OF STRATEGY ///////////
```

> Detail

https://www.fmz.com/strategy/436107

> Last Modified

2023-12-21 11:56:31
