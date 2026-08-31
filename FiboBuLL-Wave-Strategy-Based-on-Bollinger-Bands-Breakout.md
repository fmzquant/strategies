
> Name

FiboBuLL-Wave-Strategy-Based-on-Bollinger-Bands-Breakout

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12d1db4d3db634469e8.png)

## Overview

The FiboBuLL Wave strategy is adapted from the filter version of the Bollinger Bands study, which can be found under my scripts page. The strategy goes long when the price closes above the upper band and goes short when the price closes below the lower band.

Bollinger Bands is a classic indicator that uses a simple moving average of 20 periods, along with plots of upper and lower bands that are 2 standard deviations away from the middle band. These bands help visualize price volatility and trend based on where the price is relative to the bands.   

The strategy does not take into account any other parameters such as Volume / RSI / Fundamentals etc, so user must use discretion based on confirmations from other indicators or fundamentals. The strategy results are purely based on long and short trades and do not take into account any user defined targets or stop losses.

It works best when there is continuation the bar after price closes above/below upper/lower bands. It is definitely beneficial to use this strategy or the Bollinger Bands filter along with other indicators to get early glimpse of breach/fail of bands on candle close during BB squeeze or based on volatility.

The strategy can be used on Heikin Ashi candles for spotting trends but HA candles are not recommended for trade entries as they don't reflect true price of the asset.

## Strategy Logic  

The core logic behind FiboBuLL Wave strategy is to trade based on the breakout of Bollinger Bands. The Bollinger Bands consists of a middle band, upper band and lower band. The middle band is a 21-period simple moving average of closing price; The upper band is calculated by adding 1 standard deviation above the middle band, reflecting the upper range of price fluctuation; The lower band is derived by subtracting 1 standard deviation below the middle band, reflecting the lower range of price movement.

A long signal is generated when the closing price breaks above the upper band; A short signal is triggered when the closing price breaks below the lower band. After taking long or short positions, existing trades will be closed out when price breaks the opposite band again.

The strategy uses barssince function to track the breakout of price relative to upper and lower bands. A long signal is generated when the number of bars since upper band breakout is less than that of lower band. A short signal is triggered when the number of bars since lower band breakout is less than that of upper band.

By adjusting the middle band period and standard deviation multiplier parameters, the breakout sensitivity of Bollinger Bands can be changed, thereby adjusting the timing of entry.

## Advantages

The FiboBuLL Wave strategy has some advantages:  

1. Simple logic based on BB breakout, easy to understand
2. Breakout sensitivity can be controlled by adjusting parameters  
3. BB bands visualize price fluctuation and trend  
4. Can combine with other indicators, improve accuracy
5. Applicable to multiple timeframes   

## Risks

There are also some risks to note for the FiboBuLL Wave strategy:
  
1. Prone to false signals relying purely on BB breakout
2. Unable to determine the momentum and duration after breakout   
3. No exit rules for reversal
4. High risk without stop loss  

The optimizations can be made in the following aspects:

1. Add filters using other indicators to avoid false signals  
2. Optimize parameters based on historical data
3. Set stop loss to limit maximum loss
4. Consider adding reversal factors to determine persistence

## Enhancement Opportunities

The main optimization directions for FiboBuLL Wave strategy:   

1. Add volume indicators e.g. A/D line to avoid weak breakout  
2. Combine overbought/oversold indicators e.g. RSI to improve accuracy   
3. Optimize parameters like period and deviation multiplier based on backtest results  
4. Set stop loss and take profit to control risk and lock in profits
5. Consider trend and reversal filters to determine directional persistence  
6. Test optimum parameters across different products and timeframes

With above enhancements, the stability and profitability of the FiboBuLL Wave strategy can be greatly improved.
  
## Summary   

The FiboBuLL Wave strategy utilizes the basic principle of Bollinger Bands in identifying breakouts and reversions to the middle band to track price volatility. With its simple concept and wide applicability, it serves as an effective approach in gauging market fluctuation.

However, relying solely on breakout tends to generate false signals and whipsaws. Hence confirmations using volume, trends, indicators etc. must be incorporated to determine breakout reliability, while implementing stop loss/take profit to control risks, in order to maximize the strategy’s usefulness.  

The FiboBuLL Wave strategy provides a basic framework for designing trades based on price action. With constant optimizations and integration of additional factors, it has the potential to become a robust tool in formulating trading decisions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|21|SMA length|
|v_input_float_1|true|Standard Deviation|
|v_input_string_1|0|Trade Type: Both|Shorts Only|Longs Only|
|v_input_2|true|Color Bars|
|v_input_int_2|true|From Month|
|v_input_int_3|true|From Day|
|v_input_int_4|2018|From Year|
|v_input_int_5|true|To Month|
|v_input_int_6|true|To Day|
|v_input_int_7|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-24 00:00:00
end: 2023-11-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//@FiboBuLL

strategy(shorttitle='FB Wave', title='FiboBuLL Wave (A version of Bollinger Bands Breakout Strategy By Trade Chartist)', overlay=true, pyramiding=1, currency=currency.NONE, initial_capital=100000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

src = input(close, title='Source')
length = input.int(21, minval=1, title='SMA length')  // 20 for classis Bollinger Bands SMA line (basis)


mult = input.float(1., minval=0.236, maxval=2, title='Standard Deviation')  //2 for Classic Bollinger Bands //Maxval = 2 as higher the deviation, higher the risk
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)

Show = input.string('Both', options=['Longs Only', 'Shorts Only', 'Both'], title='Trade Type')
CC = input(true, 'Color Bars')

upper = basis + dev
lower = basis - dev

//Conditions for Long and Short - Extra filter condition can be used such as RSI or CCI etc.

short = src < lower  // and rsi(close,14)<40
long = src > upper  // and rsi(close,14)>60

L1 = ta.barssince(long)
S1 = ta.barssince(short)

longSignal = L1 < S1 and not (L1 < S1)[1]
shortSignal = S1 < L1 and not (S1 < L1)[1]

//Plots and Fills


////Long/Short shapes with text
// plotshape(S1<L1 and not (S1<L1)[1]?close:na, text = "sᴇʟʟ", textcolor=#ff0100, color=#ff0100, style=shape.triangledown, size=size.small, location=location.abovebar, transp=0, title = "SELL", editable = true)
// plotshape(L1<S1 and not (L1<S1)[1]?close:na, text = "ʙᴜʏ", textcolor = #008000, color=#008000, style=shape.triangleup, size=size.small, location=location.belowbar, transp=0, title = "BUY", editable = true)  

// plotshape(shortSignal?close:na, color=#ff0100, style=shape.triangledown, size=size.small, location=location.abovebar, transp=0, title = "Short Signal", editable = true)
// plotshape(longSignal?close:na, color=#008000, style=shape.triangleup, size=size.small, location=location.belowbar, transp=0, title = "Long Signal", editable = true)  


p1 = plot(upper, color=color.new(#ff0000, 75), display=display.all, title='Upper Band')
p2 = plot(lower, color=color.new(#008000, 75), display=display.all, title='Lower Band')

p = plot(basis, color=L1 < S1 ? #008000 : S1 < L1 ? #ff0000 : na, linewidth=2, editable=false, title='Basis')

fill(p, p1, color=color.new(color.teal, 85), title='Top Fill')  //fill for basis-upper
fill(p, p2, color=color.rgb(217, 161, 161), title='Bottom Fill', transp=85)  //fill for basis-lower

//Barcolor

bcol = src > upper ? color.new(#8ceb07, 0) : src < lower ? color.new(#ff0000, 0) : src > basis ? color.green : src < basis ? color.red : na

barcolor(CC ? bcol : na, editable=false, title='Color Bars')


// === INPUT BACKTEST RANGE ===
FromMonth = input.int(defval=1, title='From Month', minval=1, maxval=12)
FromDay = input.int(defval=1, title='From Day', minval=1, maxval=31)
FromYear = input.int(defval=2018, title='From Year', minval=2015)
ToMonth = input.int(defval=1, title='To Month', minval=1, maxval=12)
ToDay = input.int(defval=1, title='To Day', minval=1, maxval=31)
ToYear = input.int(defval=9999, title='To Year', minval=2010)

// === FUNCTION EXAMPLE === 
start = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish = timestamp(ToYear, ToMonth, ToDay, 23, 59)  // backtest finish window
window() =>
    time >= start and time <= finish ? true : false

if window() and (Show == 'Longs Only' or Show == 'Both')
    strategy.entry('AL', direction=strategy.long, when=longSignal)
    strategy.close('LongAL', when=shortSignal, comment='AL KAPA')

if window() and (Show == 'Shorts Only' or Show == 'Both')
    strategy.entry('SAT', direction=strategy.short, when=shortSignal)
    strategy.close('SAT', when=longSignal, comment='SAT KAPA')



















```

> Detail

https://www.fmz.com/strategy/433910

> Last Modified

2023-12-01 14:11:56
