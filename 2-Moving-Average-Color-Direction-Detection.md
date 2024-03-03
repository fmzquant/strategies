
> Name

2-Moving-Average-Color-Direction-Detection

> Author

ChaoZhang

> Strategy Description

The filling option is added between the moving averages (it is deactivated by default, activate in configuration if you wish), if the 2 averages are green the filling will be green, if the 2 averages are red the filling will be red, this would confirm a trend healthy in the case that you are using a fast and a slow average, in the case that the fast average changes of direction will be filled in the purple color, this can indicate several things: a correction of the trend is being generated, possible rest of the price , possible start of laterality, possible change of trend, when the color is purple the trader will have to analyze the general context to be able to define what could be happening.

The following alerts were created:

- Change Direction 1-MA
- Change Direction 2-MA
- Cross Under 2-Ma/1-Ma
- Cross Under 1-Ma/2-Ma
- Cross Over 2-Ma/1-Ma
- Cross Over 1-Ma/2-Ma
- Cross 1-Ma/2-Ma

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/1cbd3d5353e6275e6d0.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|1-MA|
|v_input_2|0|1-MA Type: : SMA|EMA|WMA|VWMA|SMMA|DEMA|TEMA|HullMA|ZEMA|TMA|SSMA|
|v_input_3|20|1-MA Lenght|
|v_input_4_close|0|1-MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|3|1-MA Reaction|
|v_input_6|true|2-MA|
|v_input_7|0|2-MA Type: : SMA|EMA|WMA|VWMA|SMMA|DEMA|TEMA|HullMA|ZEMA|TMA|SSMA|
|v_input_8|8|2-MA Lenght|
|v_input_9_close|0|2-MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|3|2-MA Reaction|
|v_input_11|false|FILLING|


> Source (PineScript)

``` pinescript
//@version=3
study(shorttitle="MA_2X", title="2 Moving Average Color Direction Detection ", overlay=true)

// === INPUTS

ma_1 = input(true, title="1-MA")
ma_type   = input(defval="SMA", title="1-MA Type: ", options=["SMA", "EMA", "WMA", "VWMA", "SMMA", "DEMA", "TEMA", "HullMA", "ZEMA", "TMA", "SSMA"])
ma_len    = input(defval=20, title="1-MA Lenght", minval=1)
ma_src    = input(close, title="1-MA Source")
reaction_ma_1  = input(defval=3, title="1-MA Reaction", minval=1)

ma_2 = input(true, title="2-MA")
ma_type_b   = input(defval="SMA", title="2-MA Type: ", options=["SMA", "EMA", "WMA", "VWMA", "SMMA", "DEMA", "TEMA", "HullMA", "ZEMA", "TMA", "SSMA"])
ma_len_b    = input(defval=8, title="2-MA Lenght", minval=1)
ma_src_b    = input(close, title="2-MA Source")
reaction_ma_2  = input(defval=3, title="2-MA Reaction", minval=1)

filling = input(false, title="FILLING")

// SuperSmoother filter
// © 2013  John F. Ehlers
variant_supersmoother(src,len) =>
    a1 = exp(-1.414*3.14159 / len)
    b1 = 2*a1*cos(1.414*3.14159 / len)
    c2 = b1
    c3 = (-a1)*a1
    c1 = 1 - c2 - c3
    v9 = 0.0
    v9 := c1*(src + nz(src[1])) / 2 + c2*nz(v9[1]) + c3*nz(v9[2])
    v9
    
variant_smoothed(src,len) =>
    v5 = 0.0
    v5 := na(v5[1]) ? sma(src, len) : (v5[1] * (len - 1) + src) / len
    v5

variant_zerolagema(src,len) =>
    ema1 = ema(src, len)
    ema2 = ema(ema1, len)
    v10 = ema1+(ema1-ema2)
    v10
    
variant_doubleema(src,len) =>
    v2 = ema(src, len)
    v6 = 2 * v2 - ema(v2, len)
    v6

variant_tripleema(src,len) =>
    v2 = ema(src, len)
    v7 = 3 * (v2 - ema(v2, len)) + ema(ema(v2, len), len)             
    v7
    
variant(type, src, len) =>
    type=="EMA"     ? ema(src,len) : 
      type=="WMA"   ? wma(src,len): 
      type=="VWMA"  ? vwma(src,len) : 
      type=="SMMA"  ? variant_smoothed(src,len) : 
      type=="DEMA"  ? variant_doubleema(src,len): 
      type=="TEMA"  ? variant_tripleema(src,len): 
      type=="HullMA"? wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len))) :
      type=="SSMA"  ? variant_supersmoother(src,len) : 
      type=="ZEMA"  ? variant_zerolagema(src,len) : 
      type=="TMA"   ? sma(sma(src,len),len) : sma(src,len)


// === Moving Average
ma_series = variant(ma_type,ma_src,ma_len)
ma_series_b = variant(ma_type_b,ma_src_b,ma_len_b)

direction = 0
direction := rising(ma_series,reaction_ma_1) ? 1 : falling(ma_series,reaction_ma_1) ? -1 : nz(direction[1])
change_direction= change(direction,1)

direction_b = 0
direction_b := rising(ma_series_b,reaction_ma_2) ? 1 : falling(ma_series_b,reaction_ma_2) ? -1 : nz(direction_b[1])
change_direction_b= change(direction_b,1)

// Plot MA series and color it according too direction
pcol = direction>0 ? lime : direction<0 ? red : na
a=plot( ma_1? ma_series :na, color=pcol,style=line,join=true,linewidth=3,transp=10,title="1-MA Plot")

pcol_b = direction_b>0 ? lime : direction_b<0 ? red : na
b=plot( ma_2? ma_series_b :na, color=pcol_b,style=line,join=true,linewidth=2,transp=10,title="2-MA Plot")

fill(a,b,color=direction==1 and direction_b==1 and filling == true?lime:direction==-1 and direction_b==-1and filling == true?red:direction==1 and direction_b==-1and filling == true?purple:direction==-1 and direction_b==1and filling == true?purple:white,transp=80)

/////// Alerts ///////

alertcondition(change_direction,title="Change Direction 1-MA",message="Change Direction 1-MA")
alertcondition(change_direction_b,title="Change Direction 2-MA",message="Change Direction 2-MA")

alertcondition(crossunder(ma_series_b,ma_series),title="Cross Under 2-Ma/1-Ma",message="Cross Under 2-Ma/1-Ma")
alertcondition(crossunder(ma_series,ma_series_b),title="Cross Under 1-Ma/2-Ma",message="Cross Under 1-Ma/2-Ma")

alertcondition(crossover(ma_series_b,ma_series),title="Cross Over 2-Ma/1-Ma",message="Cross Over 2-Ma/1-Ma")
alertcondition(crossover(ma_series,ma_series_b),title="Cross Over 1-Ma/2-Ma",message="Cross Over 1-Ma/2-Ma")

alertcondition(cross(ma_series_b,ma_series),title="Cross 1-Ma/2-Ma",message="Cross 1-Ma/2-Ma")



if crossunder(ma_series,ma_series_b)
    strategy.entry("Enter Long", strategy.long)
else if crossunder(ma_series_b,ma_series)
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/364535

> Last Modified

2022-05-20 16:44:13
