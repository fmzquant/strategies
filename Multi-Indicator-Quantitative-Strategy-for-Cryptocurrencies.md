
> Name

Multi-Indicator-Quantitative-Strategy-for-Cryptocurrencies

> Author

ChaoZhang

> Strategy Description



This article explains in detail a multi-indicator quantitative trading strategy designed for cryptocurrencies. It utilizes moving averages, oscillators, channels etc. for entry signals and risk control.

I. Strategy Logic

The main indicator categories used are:

1. ROC oscillator to gauge overbought/oversold levels. 

2. Donchian Channel for dynamic support and resistance.

3. Bears Power identifying bottom characteristics. 

4. Balance of Power for trend judgment.

5. Moving average for trend filtering.

Trades are only taken when multiple indicators agree. Profit targets and stop loss are also set to control single trade risks.

II. Advantages of the Strategy

The biggest advantage is the complementarity of indicators, judging from multiple dimensions.

Another advantage is the direct and sensible stop loss and take profit for prudent money management.

Finally, extensive parameter space allows fine tuning for cryptocurrencies. 

III. Potential Risks

However, some risks exist:

Firstly, multi-indicator combinations increase optimization difficulty.

Secondly, discrepancies between indicators require clear logic rules. 

Lastly, parameters need optimization for specific products.

IV. Summary

In summary, this article has explained a multi-indicator quantitative strategy tailored for cryptocurrencies. It intelligently combines indicators for risk and money management. Through parameter optimization it can achieve steady profits but needs to manage optimization difficulty and indicator usage.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3000|Take Profit|
|v_input_2|3443|Stop Loss|
|v_input_3|185|ROC Length|
|v_input_4|49|Smoothing Length|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|43|Upper Channel|
|v_input_7|43|Lower Channel|
|v_input_8|90|Offset Bars|
|v_input_9|61|BearsP WMA Period|
|v_input_10|15|BoP Exponential Smoothing|
|v_input_11|74|SMA Period|
|v_input_12|37|SMA Shift|
|v_input_13|false|My Price|
|v_input_14|0|Label Style: Lower Right|Upper Right|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-14 00:00:00
period: 4m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mbagheri746

//@version=4
strategy("Bagheri IG Ether", overlay=true, margin_long=100, margin_short=100)

TP = input(3000, minval = 1 , title ="Take Profit")
SL = input(3443, minval = 1 , title ="Stop Loss")


//_________________ RoC Definition _________________


rocLength = input(title="ROC Length", type=input.integer, minval=1, defval=185)
smoothingLength = input(title="Smoothing Length", type=input.integer, minval=1, defval=49)
src = input(title="Source", type=input.source, defval=close)

ma = ema(src, smoothingLength)
mom = change(ma, rocLength)

sroc = nz(ma[rocLength]) == 0
     ? 100
     : mom == 0
         ? 0
         : 100 * mom / ma[rocLength]

//srocColor = sroc >= 0 ? #0ebb23 : color.red
//plot(sroc, title="SROC", linewidth=2, color=srocColor, transp=0)
//hline(0, title="Zero Level", linestyle=hline.style_dotted, color=#989898)


//_________________ Donchian Channel _________________

length1 = input(43, minval=1, title="Upper Channel")
length2 = input(43, minval=1, title="Lower Channel")
offset_bar = input(90,minval=0, title ="Offset Bars")

upper = highest(length1)
lower = lowest(length2)

basis = avg(upper, lower)


DC_UP_Band = upper[offset_bar]
DC_LW_Band = lower[offset_bar]

l = plot(DC_LW_Band, style=plot.style_line, linewidth=2, color=color.red)
u = plot(DC_UP_Band, style=plot.style_line, linewidth=2, color=color.aqua)

fill(l,u,color = color.new(color.aqua,transp = 90))

//_________________ Bears Power _________________


wmaBP_period = input(61,minval=1,title="BearsP WMA Period")
line_wma = ema(close, wmaBP_period)

BP = low - line_wma


//_________________ Balance of Power _________________

ES_BoP=input(15, title="BoP Exponential Smoothing")
BOP=(close - open) / (high - low)

SBOP = rma(BOP, ES_BoP)

//_________________ Alligator _________________

//_________________ CCI _________________

//_________________ Moving Average _________________

sma_period = input(74, minval = 1 , title = "SMA Period")
sma_shift = input(37, minval = 1 , title = "SMA Shift")

sma_primary = sma(close,sma_period)

SMA_sh = sma_primary[sma_shift]

plot(SMA_sh, style=plot.style_line, linewidth=2, color=color.yellow)

//_________________ Long Entry Conditions _________________//

MA_Lcnd = SMA_sh > low and SMA_sh < high

ROC_Lcnd = sroc < 0

DC_Lcnd = open < DC_LW_Band

BP_Lcnd = BP[1] < BP[0] and BP[1] < BP[2]

BOP_Lcnd = SBOP[1] < SBOP[0]

//_________________ Short Entry Conditions _________________//

MA_Scnd = SMA_sh > low and SMA_sh < high

ROC_Scnd = sroc > 0

DC_Scnd = open > DC_UP_Band

BP_Scnd = BP[1] > BP[0] and BP[1] > BP[2]

BOP_Scnd = SBOP[1] > SBOP[0]

//_________________ OPEN POSITION __________________//


strategy.entry(id = "BUY", long = true , when = MA_Lcnd and ROC_Lcnd and DC_Lcnd and BP_Lcnd and BOP_Lcnd)

strategy.entry(id = "SELL", long = false , when = MA_Scnd and ROC_Scnd and DC_Scnd and BP_Scnd and BOP_Scnd)

//_________________ CLOSE POSITION __________________//

strategy.exit(id = "CLOSE BUY", from_entry = "BUY", profit = TP , loss = SL)

strategy.exit(id = "CLOSE SELL", from_entry = "SELL" , profit = TP , loss = SL)


//_________________ TP and SL Plot __________________//

currentPL= strategy.openprofit
pos_price = strategy.position_avg_price
open_pos = strategy.position_size

TP_line = (strategy.position_size  > 0) ? (pos_price + TP/100) : strategy.position_size < 0 ? (pos_price - TP/100) : 0.0
SL_line = (strategy.position_size  > 0) ? (pos_price - SL/100) : strategy.position_size < 0 ? (pos_price + SL/100) : 0.0

// hline(TP_line, title = "Take Profit", color = color.green , linestyle = hline.style_dotted, editable = false)
// hline(SL_line, title = "Stop Loss", color = color.red , linestyle = hline.style_dotted, editable = false)


Tline = plot(TP_line != 0.0 ? TP_line : na , title="Take Profit", color=color.green, trackprice = true, show_last = 1)
Sline = plot(SL_line != 0.0 ? SL_line : na, title="Stop Loss", color=color.red, trackprice = true, show_last = 1)
Pline = plot(pos_price != 0.0 ? pos_price : na, title="Stop Loss", color=color.gray, trackprice = true, show_last = 1)


fill(Tline , Pline, color = color.new(color.green,transp = 90))
fill(Sline , Pline, color = color.new(color.red,transp = 90))



//_________________ Label __________________//


inMyPrice           = input(title="My Price", type=input.float, defval=0)
inLabelStyle        = input(title="Label Style", options=["Upper Right", "Lower Right"], defval="Lower Right")

posColor = color.new(color.green, 25)
negColor = color.new(color.red, 25)
dftColor = color.new(color.aqua, 25)
posPnL   = (strategy.position_size != 0) ? (close * 100 / strategy.position_avg_price - 100) : 0.0
posDir   = (strategy.position_size  > 0) ? "long" : strategy.position_size < 0 ? "short" : "flat"
posCol   = (posPnL > 0) ? posColor : (posPnL < 0) ? negColor : dftColor
myPnL    = (inMyPrice != 0) ? (close * 100 / inMyPrice - 100) : 0.0

var label lb = na
label.delete(lb)
lb := label.new(bar_index, close,
   color=posCol,
   style=inLabelStyle=="Lower Right"?label.style_label_upper_left:label.style_label_lower_left,
   text=
      "╔═══════╗" +"\n" + 
      "Pos: "  +posDir +"\n" +
      "Pos Price: "+tostring(strategy.position_avg_price) +"\n" +
      "Pos PnL: "  +tostring(posPnL, "0.00") + "%" +"\n" +
      "My Price: " +tostring(inMyPrice) +"\n" +
      "My PnL: "   +tostring(myPnL, "0.00") + "%" +"\n" +
      "╚═══════╝")





```

> Detail

https://www.fmz.com/strategy/426889

> Last Modified

2023-09-15 11:58:36
