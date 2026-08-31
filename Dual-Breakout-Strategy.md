
> Name

Dual-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ac1bfb5c630b1a3269.png)



## Overview

This strategy uses Bollinger Bands to identify breakout points for long and short trades, combined with ADX indicator to filter low volatility unfavorable market conditions, in order to follow trends.

## Strategy Logic

The strategy is mainly based on Bollinger Bands indicator to determine long or short direction. The middle band of Bollinger Bands is N-day moving average of closing price, and the band width is calculated using standard deviation. A breakout below the lower band signals long trades, while a breakout above the upper band signals short trades.

To avoid invalid breakouts and erroneous trades in non-trending choppy markets, the strategy incorporates ADX indicator to filter low volatility market conditions. Trading signals are only generated when ADX value is below a threshold. When ADX goes above the threshold, all positions are closed to wait for trending conditions.

The strategy also sets trailing stop loss and take profit for open trades. Specifically, after opening a position, the lowest price and highest price of previous N days are recorded as the stop loss and take profit levels for that direction. This allows locking in profits while reducing losses from reversals.

From the code logic, the strategy first calculates Bollinger Bands and ADX parameters. Then it checks if price breaks Bands upper or lower band, and if ADX is below threshold, to generate trading signals. Afterwards the stop loss and take profit levels are dynamically updated and tracked based on current position direction.

## Advantage Analysis

- Bollinger Bands offer clear breakout signals to catch trend opportunities
- ADX filter avoids trading Choppy markets without clear trends 
- Stop loss effectively controls single trade loss
- Trailing take profit locks in most profits

## Risk Analysis

- Breakouts may be false without considering volume
- ADX filter may also miss trending opportunities 
- Stop loss and take profit too close may get stopped out
- Poor parameter tuning impacts strategy performance

Consider combining with other indicators to confirm breakout with volume; optimize ADX filter using slope to identify trend changes; widen stop loss and take profit range to avoid premature exit.

## Improvement Directions

- Optimize Bollinger Bands length for best breakout results
- Fine tune ADX filter to balance trend accuracy and false signals
- Add other indicators to confirm breakout validity  
- Optimize stop loss range to avoid excessive sensitivity
- Widen take profit range to lock in more profits

## Conclusion

The strategy has a clear and simple logic, using Bollinger Bands for obvious breakout signals, filtered by ADX for trending conditions, to capture trend opportunities. Stop loss and take profit are used to control risk and lock in profits. Easy to understand and implement, the strategy is worth further testing and optimization as a basic trend following system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Reverse Trades|
|v_input_2|true|ADX Close|
|v_input_3|false|Use Swing Lo/Hi Stop Loss & Take Profit|
|v_input_4|20|Swing Lo/Hi Lookback|
|v_input_5|false|SL Expander|
|v_input_6|false|TP Expander|
|v_input_7|14|ADX Smoothing|
|v_input_8|20|DI Length|
|v_input_9|30|adxlevel|
|v_input_10|false|-----------BB Inputs-----------|
|v_input_11|20|length|
|v_input_12|2|mult|
|v_input_13|9|MAlen|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-26 00:00:00
end: 2023-11-02 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tweakerID

// This strategy uses Bollinger Bands to buy when the price 
// crosses over the lower band and sell when it crosses down
// the upper band. It only takes trades when the ADX is 
// below a certain level, and exits all trades when it's above it.

//@version=4
strategy("BB + ADX Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_value = 0.04, initial_capital=100)

//Inputs
i_reverse=input(false, title="Reverse Trades")
i_ADXClose=input(true, title="ADX Close")
i_SL=input(false, title="Use Swing Lo/Hi Stop Loss & Take Profit")
i_SwingLookback=input(20, title="Swing Lo/Hi Lookback")
i_SLExpander=input(defval=0, step=.5, title="SL Expander")
i_TPExpander=input(defval=0, step=.5, title="TP Expander")

//ADX Calculations
adxlen = input(14, title="ADX Smoothing")
dilen = input(20, title="DI Length")
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

//BB Calculations
BBCALC=input(false, title="-----------BB Inputs-----------")

length = input(20, minval=1)
mult = input(2.0, minval=0.001, maxval=50)
MAlen=input(defval=9)
source = close
basis = sma(source, length)
dev = mult * stdev(source, length)
upper = basis + dev
lower = basis - dev

//Entry Logic
BUY = crossover(source, lower) and sig < adxlevel
SELL = crossunder(source, upper) and sig < adxlevel

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

//Entries
strategy.entry("long", long=i_reverse?false:true, when=BUY)
strategy.entry("short", long=i_reverse?true:false, when=SELL)

//EXITS
if i_ADXClose
    strategy.close_all(when=sig > adxlevel)
if i_SL
    strategy.exit("longexit", "long", stop=SL, limit=TP)
    strategy.exit("shortexit", "short", stop=SL, limit=TP)

//Plots	
plot(i_SL ? SL : na, color=color.red, style=plot.style_cross, title="SL")
plot(i_SL ? TP : na, color=color.green, style=plot.style_cross, title="TP")
plot(upper)
plot(lower)



```

> Detail

https://www.fmz.com/strategy/431010

> Last Modified

2023-11-03 17:16:02
