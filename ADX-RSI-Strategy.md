
> Name

ADX-RSI-Strategy

> Author

ChaoZhang

> Strategy Description



### Overview

This is a trend-following strategy that combines the ADX and RSI indicators. It uses RSI to identify overbought and oversold levels to generate trading signals, and ADX to determine the trend to filter out trades when the trend is unclear, thus avoiding whipsaws in range-bound markets.

### Strategy Logic

1. Use 7-period RSI to identify overbought and oversold levels

 - RSI below 30 is considered oversold 
 - RSI above 70 is considered overbought

2. Use ADX to determine the trend

 - ADX above 30 suggests a strong trend
 - ADX below 30 suggests no trend

3. Entry rules

 - Long when RSI < 30 and ADX > 30
 - Short when RSI > 70 and ADX > 30

4. Take profit and stop loss

 - Optional take profit and stop loss methods - close-based or swing-based
 - Close-based uses closing prices
 - Swing-based uses recent swing highs/lows

### Advantage Analysis

1. RSI effectively identifies overbought and oversold levels to avoid buying/selling traps

2. ADX filters out range-bound markets to avoid whipsaws

3. Optional take profit/stop loss methods help better control risks

4. Simple and easy to understand, good for beginners to learn algorithm trading

5. Much room for parameter optimization and refinement

### Risk Analysis  

1. RSI overbought/oversold may have pullbacks and reversals

2. ADX trend determination has lags, may miss trend turning points

3. Improper stop loss placement may lead to losses

4. Risk of over-optimization due to simplicity

5. Parameter optimization needed for better performance

### Optimization Directions

1. Optimize RSI parameters and overbought/oversold levels

2. Test different ADX periods to find the optimal setting

3. Test different take profit/stop loss methods 

4. Add trend filter to avoid counter-trend trading

5. Combine with other indicators for enhanced performance

### Summary

This strategy combines the strengths of the classic RSI and ADX indicators to identify trends and avoid whipsaws. It has much room for optimization to achieve better performance. Overall, it serves well as a beginner's introductory algorithm trading strategy, and can also be incorporated into more complex trading systems.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Strategy Direction|
|v_input_2|false|Use Swing Lo/Hi Stop Loss & Take Profit|
|v_input_3|20|Swing Lo/Hi Lookback|
|v_input_4|false|SL Expander|
|v_input_5|false|TP Expander|
|v_input_6|true|Reverse Trades|
|v_input_7|30|OS|
|v_input_8|80|OB|
|v_input_9|14|ADX Smoothing|
|v_input_10|14|DI Length|
|v_input_11|30|adxlevel|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-19 00:00:00
end: 2023-09-26 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tweakerID

// This is a strategy that uses the 7 Period RSI to buy when the indicator is shown as oversold (OS) and sells when 
// the index marks overbought (OB). It also uses the ADX to determine whether the trend is ranging or trending
// and filters out the trending trades. Seems to work better for automated trading when the logic is inversed (buying OB 
// and selling the OS) wihout stop loss.

//@version=4
strategy("ADX + RSI Strat", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=100, commission_value=0.04, calc_on_every_tick=false)

direction = input(0, title = "Strategy Direction", type=input.integer, minval=-1, maxval=1)
strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))


//SL & TP Inputs
i_SL=input(false, title="Use Swing Lo/Hi Stop Loss & Take Profit")
i_SwingLookback=input(20, title="Swing Lo/Hi Lookback")
i_SLExpander=input(defval=0, step=.2, title="SL Expander")
i_TPExpander=input(defval=0, step=.2, title="TP Expander")
i_reverse=input(true, title="Reverse Trades")

//SL & TP Calculations
SwingLow=lowest(i_SwingLookback)
SwingHigh=highest(i_SwingLookback)
bought=strategy.position_size != strategy.position_size[1]
LSL=valuewhen(bought, SwingLow, 0)-((valuewhen(bought, atr(14), 0))*i_SLExpander)
SSL=valuewhen(bought, SwingHigh, 0)+((valuewhen(bought, atr(14), 0))*i_SLExpander)
lTP=strategy.position_avg_price + (strategy.position_avg_price-(valuewhen(bought, SwingLow, 0))+((valuewhen(bought, atr(14), 0))*i_TPExpander))
sTP=strategy.position_avg_price - (valuewhen(bought, SwingHigh, 0)-strategy.position_avg_price)-((valuewhen(bought, atr(14), 0))*i_TPExpander)
islong=strategy.position_size > 0
isshort=strategy.position_size < 0
SL= islong ? LSL : isshort ? SSL : na
TP= islong ? lTP : isshort ? sTP : na

//RSI Calculations
RSI=rsi(close, 7)
OS=input(30, step=5)
OB=input(80, step=5)

//ADX Calculations
adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
dirmov(len) =>
	up = change(high)
	down = -change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
	minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(plusDM, len) / truerange)
	minus = fixnan(100 * rma(minusDM, len) / truerange)
	[plus, minus]
adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
sig = adx(dilen, adxlen)
adxlevel=input(30, step=5)


//Entry Logic
BUY = sig < adxlevel and (RSI < OS) 
SELL = sig < adxlevel and (RSI > OB) 

//Entries
strategy.entry("long", strategy.long, when=i_reverse?SELL:BUY)
strategy.entry("short", strategy.short, when=not i_reverse?SELL:BUY)
//Exits
if i_SL
    strategy.exit("longexit", "long", stop=SL, limit=TP)
    strategy.exit("shortexit", "short", stop=SL, limit=TP)

//Plots
plot(i_SL ? SL : na, color=color.red, style=plot.style_cross, title="SL")
plot(i_SL ? TP : na, color=color.green, style=plot.style_cross, title="TP")
plotshape(BUY ? 1 : na, style=shape.triangleup, location=location.belowbar, color=color.green, title="Bullish Setup")
plotshape(SELL ? 1 : na, style=shape.triangledown, location=location.abovebar, color=color.red, title="Bearish Setup")
```

> Detail

https://www.fmz.com/strategy/427989

> Last Modified

2023-09-27 16:27:39
