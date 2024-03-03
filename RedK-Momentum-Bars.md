
> Name

RedK-Momentum-Bars

> Author

ChaoZhang

> Strategy Description

Momentum Bars (Mo_Bars) offers a different way to visualize (relative) momentum - and uses some simple TA concepts to provide a different perspective into how we read momentum changes and incorporate that in our trading.

The idea here (and the script itself) is really super simple, and is (very loosely) inspired by Elder's Impulse System ( EIS ) - then evolved to leverage some other concepts, and to become less cluttering and "easier to read".

The construction of the Mo_Bars
---------------------------------------------
The base concept utilizes 3 moving average lines :
the first line is a relatively fast MA with a short length - acts as the main price tracking line

the second line is slightly slower than the main line - 2 to 3 bars longer length - and will by default use the open value as source - this works better to identify when the closing price starts to move faster than the open (as in, bars more frequently close higher than they open) - this line acts as the signal line - there's an added setting for an additional delay that utilizes regular WMA smoothing - the delay acts to magnify the relative displacement between the 2 MAs

for both these MA's, i choose to use the RSS MA (Lazy Line) - other MA types can be used, but the reason i used that MA type specifically is that it moves "gracefully" - and 2 Lazy Lines moving together minimizes whipsaws from small price swings - i tested with other MA types and found that the RSS has an advantage there.

the third line is a much slower MA (length 5 to 6 x the fast line) - and acts as a filter or a baseline. When we're above that line, we should favor long positions - we're in bull territory. When we're below that line we favor short positions, and we're in bear territory. Adjust this line as it suits your trading style and time frame.
(I choose to use WMA as the MA type for the filter line .. and there's a good reason for that - which i'll skip for now - but in future versions, we can add other selectable MA types. )


Using Mo_Bars
----------------------------
at a very broad level, we can use Mo_Bars similar to how we use a MACD - both are centered and unrestricted oscillators - note the difference that Mo_Bars is based on 3 MA's rather than 2.

the Mo_Bar bar length reflects the distance between the main MA and the signal MA - plotted relative to the baseline (filter line) - that means that the length of the bar represents the relative momentum between the 2 MA's - The Mo_Bars are then colored in a way that reflects increase or decrease in the value of that momentum (the visual here may have been inspired by another indicator recently published by one of our esteemed wizards - it worked perfectly - so due credits here :)

-- in simple terms, if the main MA is below the signal MA, the bar is red - and when the main MA is above the signal MA, the bar is green - a white bar usually shows up when there's a detected change of relative momentum direction (note that this is not the same as the trend direction - and that's what helps show and exploit convergence and divergence - similar to a MACD )

* in the chart above, i noted few examples of how visualizing relative momentum in this way exposes areas of chop (Mo_Bars above zero but are in red or moving down, or when Mo_Bars are below zero and green or moving up) - convergence / divergence with price - and how this can act to expose the possibility of potential changes in price action or trend.

* there's so much more to play around with this setup - and maybe if there's enough interest there can be future dedicated posts on how utilize or even to evolve it further - there's a lot of potential here, to add more filters (maybe volume based), alerts, signals...etc - so let's see the interest :)


Here's the detailed (top chart) setup that Mo_Bars is based on -- The settings for the MA's on the price charts have been matched / sync'ed with the Mo_Bars settings on the lower panel to demonstrate how the script works and how it translate the MA action on the price chart to what we see below.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/9c35dab96de1e2b43f.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|Fast MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|10|Length|
|v_input_string_1|0|Type: SMA|WMA|EMA|RSS_WMA|HMA|
|v_input_source_2_close|0|Slow MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|20|Length|
|v_input_string_2|0|Type: SMA|WMA|EMA|RSS_WMA|HMA|
|v_input_int_3|3|Delay (1 = None)|
|v_input_int_4|50|Filter MA Length|
|v_input_string_3|0|Type: SMA|WMA|EMA|RSS_WMA|HMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-10 00:00:00
end: 2022-05-16 23:59:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RedKTrader

//@version=5
indicator('[dev]RedK Momentum Bars', shorttitle='RedK MoBars v3.0', explicit_plot_zorder = true, timeframe='', timeframe_gaps=false)

// A trading system composed of 2 short Lazy Lines (preferably one open and one close - 2-3 bars apart) and a WMA long filter 
// loosely inspired by Edler Impulse
// v2.0 cleaned up code and added MA options to be able to mix and match, and experiment with various setups 
// default values (my personal preference) remain the same as in v1.0 
// for example, some traders will consider "bear territory" only below SMA50, others will use EMA30 .. and so on.
// ---------------------------------------------------------------------------------------------------------------
// MoBars v3.0: 
// updated defaults to match the most common 3x MA cross-over set-up of SMA (10, 20, 50)
// updated visuals to push the 0 line to the background of the plot (using the explcit_plot_zorder param)
// and added alerts for crossing up, down and swing around the 0 line (the Bullish/Bearish Filter MA)

//==============================================================================
f_LazyLine(_data, _length) =>
    w1 = 0,     w2 = 0,     w3 = 0
    L1 = 0.0,   L2 = 0.0,   L3 = 0.0
    w = _length / 3

    if _length > 2
        w2 := math.round(w)
        w1 := math.round((_length - w2) / 2)
        w3 := int((_length - w2) / 2)

        L1 := ta.wma(_data, w1)
        L2 := ta.wma(L1, w2)
        L3 := ta.wma(L2, w3)
        
    else
        L3 := _data
        
    L3
//==============================================================================

// =============================================================================    
f_getMA(source, length, type) =>
    type == "SMA" ? ta.sma(source, length) : 
      type == "EMA" ? ta.ema(source, length) :
      type == "WMA" ? ta.wma(source, length) :
      type == "HMA" ? ta.hma(source, length) :
      f_LazyLine(source, length)
// =============================================================================    

// ------------------------------------------------------------------------------------------------
// Inputs
// Note, in v3.0, changed default lengths to 10, 20 and 50  -- and all MA types to SMA. 
// ------------------------------------------------------------------------------------------------

Fast_Src    = input.source(close,   title='Fast MA Source',          inline = 'Fast')
Fast_Length = input.int(10,          title = 'Length',   minval = 1, inline = 'Fast')
Fast_Type   = input.string('SMA', title = 'Type',                    inline = 'Fast',
  options = ['RSS_WMA', 'WMA', 'EMA', 'SMA', 'HMA'])

Slow_Src    = input.source(close,    title='Slow MA Source',         inline = 'Slow')
Slow_Length = input.int(20,          title='Length',     minval = 1, inline = 'Slow')
Slow_Type   = input.string('SMA', title = 'Type',                    inline = 'Slow',
  options = ['RSS_WMA', 'WMA', 'EMA', 'SMA', 'HMA'])

Slow_Delay  = input.int(3,          title='Delay (1 = None)',       minval = 1)

Fil_Length  = input.int(50,       title='Filter MA Length', minval = 1, inline = 'Filter')
Fil_Type    = input.string('SMA', title = 'Type',                   inline = 'Filter',
  options = ['RSS_WMA', 'WMA', 'EMA', 'SMA', 'HMA'])


// ------------------------------------------------------------------------------------------------
// Calculation
// ------------------------------------------------------------------------------------------------

Fast    = f_getMA(Fast_Src, Fast_Length, Fast_Type)
Slow    = f_getMA(Slow_Src, Slow_Length, Slow_Type)

Filter  = f_getMA(close, Fil_Length, Fil_Type)

Fast_M  = Fast - Filter
Slow_M  = Slow - Filter

Rel_M   = ta.wma(Slow_M, Slow_Delay)

// prep the Momentum bars
o = Rel_M
c = Fast_M
h = math.max(o, c)
l = math.min(o, c)

rising      = ta.change(c) > 0


// ------------------------------------------------------------------------------------------------
// Colors & Plots
// ------------------------------------------------------------------------------------------------

hline(0, title = 'Zero Line', color = color.blue, linestyle = hline.style_solid)

c_barup     = #11ff20ff
c_bardn     = #ff1111ff
c_bardj     = #ffffffff

c_barupb    = #1b5e20ff
c_bardnb    = #981919ff
c_bardjb    = #9598a1ff

barcolor    = c > o and rising ? c_barup : c < o and not rising ? c_bardn : c_bardj
borcolor    = c > o and rising ? c_barupb : c < o and not rising ? c_bardnb : c_bardjb
//plotcandle(o, h, l, c, 'MoBars', barcolor, barcolor, bordercolor = borcolor)


// ===========================================================================================================
//      v3.0 adding alerts 
// these alerts will trigger as soon as the Momentum Bar touches above the filter line 
// this approach can lead to "false signals" but also has an advantage (of alerting to a possible mood/mode change)
// another option - maybe in an updated version - could be to trigger alerts *only* when the full Momentum Bar completely clears the filter line (above or below)
// and it's easy to make that a user choice in the study inputs
// ===========================================================================================================

Alert_up    = ta.crossover(h,0)
Alert_dn    = ta.crossunder(l,0)
Alert_swing = Alert_up or Alert_dn

// "." in alert title for the alerts to show in the right order up/down/swing 
alertcondition(Alert_up,    ".   MoBars Crossing 0 Up",         "MoBars Up - Bullish Mode Detected!")
alertcondition(Alert_dn,    "..  MoBars Crossing 0 Down",       "MoBars Down - Bearish Mode Detected!")
alertcondition(Alert_swing, "... MoBars Crossing 0",            "Mobars Swing - Possible Reversal Detected!")



if Alert_up
    strategy.entry("Enter Long", strategy.long)
else if Alert_dn
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/364001

> Last Modified

2022-05-18 11:32:35
