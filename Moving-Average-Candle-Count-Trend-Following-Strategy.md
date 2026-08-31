
> Name

Moving-Average-Candle-Count-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This article introduces a trend following strategy based on candle count. It judges trend direction by counting candle directions and enters after a fixed number of candles.  

## Strategy Logic

The strategy is based on:

1. Counting candle directions to determine market bias. When N consecutive candles go in one direction, a trend is identified.

2. In uptrends, go long after N consecutive bearish candles. In downtrends, go short after N consecutive bullish candles.

3. Smaller N values capture trends faster but are more susceptible to whipsaws.

4. Fixed take profit and stop loss points lock in profits and control risk.

5. Close positions when reversal candles appear.

## Advantage Analysis

Advantages of this strategy:

1. Simple candle counting for direct trend judgment. Easy to implement.

2. With-trend entries capture trend moves well. 

3. Fixed stops effectively manage risk.

4. Adjustable parameters suit different market environments. 

5. Simple logic makes optimization easy.

## Risk Analysis

There are also risks to consider:

1. Counting can mislead in ranging markets.

2. Fixed stops may limit profit potential. 

3. Premature stop outs from poor reversal judgment.

4. Adjust parameters and size appropriately.

5. Count parameters should be evaluated cautiously.

## Conclusion

This strategy combines candle counting and trend following. With proper tuning, it can produce decent results. But traders should evaluate markets carefully and adjust parameters for long-term profits.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Bar Counter|
|v_input_2|2017|Backtest Start Year|
|v_input_3|true|Backtest Start Month|
|v_input_4|true|Backtest Start Day|
|v_input_5|2020|Backtest Stop Year|
|v_input_6|12|Backtest Stop Month|
|v_input_7|31|Backtest Stop Day|
|v_input_8|60|Backtest Profit Goal (in USD)|
|v_input_9|30|Backtest STOP Goal (in USD)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-16 00:00:00
end: 2023-09-15 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//@author=Daveatt

StrategyName = "BEST Candle Meter Strategy"
ShortStrategyName = "BEST Candle Meter Strategy"

// strategy(title=StrategyName, shorttitle=ShortStrategyName, overlay=true, 
//  pyramiding=0, default_qty_value=100, precision=7, currency=currency.USD,
//  commission_value=0.2,commission_type=strategy.commission.percent, initial_capital=10000)

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////// INPUTS ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// TD Sequential approach would be setting bar_counter == 9
bar_counter = input(5, "Bar Counter",minval=1, step=1)

// if based on same candle
GreenCandle = close > open
RedCandle = close < open

// if based on previous candle open
GreenPrevCandle = close > open[1]
RedPrevCandle = close < open[1]

// conditons
barUP = GreenCandle
barDN = RedCandle

///////////////////////////////////////////////////////////////////////////////
////////////////////////////// COUNTERS ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var barsFromUp = 0
var barsFromDn = 0
barsFromUp := barUP ? barsFromUp + 1 : 0
barsFromDn := barDN ? barsFromDn + 1 : 0

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////// PLOTS ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

plot_color = barsFromUp > 0 ? color.lime : color.red
//plot(barsFromUp, title="UP Histogram", color=plot_color, style=plot.style_histogram, linewidth=4)
//plot(barsFromDn, title="DN Histogram", color=plot_color, style=plot.style_histogram, linewidth=4)

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////// HLINE ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//hline(9, '9 TD Sequential Line', linestyle=hline.style_solid, linewidth=2, color=color.black)
//hline(13, '12 TD Sequential Line', linestyle=hline.style_solid, linewidth=3, color=color.purple)

///////////////////////////////////////////////////////////////////////////////
/////////////////////////////// PLOTCHAR //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// var _lbl_UP = label(na)
// if barsFromUp > 0
//     _lbl_UP := label.new(bar_index, close, tostring(barsFromUp, '#'), textcolor=color.green, style=label.style_none, yloc=yloc.price, xloc=xloc.bar_index, size=size.normal)

// var _lbl_DN = label(na)
// if barsFromDn > 0
//     _lbl_DN := label.new(bar_index, close, tostring(barsFromDn, '#'), textcolor=color.red, style=label.style_none, yloc=yloc.price, xloc=xloc.bar_index, size=size.normal)


//plotshape(barsFromUp > 0, "", shape.arrowup,      location.abovebar, color.green,     text="A")

///////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ALERTS ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// alertcondition(barsFromUp == 9, title='?Sell 9 Alert?', message="Sell 9 Alert")
// alertcondition(barsFromDn == 9, title='?Buy 9 Alert?', message='Buy 9 Alert')
// alertcondition(barsFromUp > 9, title='?Sell > 9 Alert?', message="Sell > 9 Alert")
// alertcondition(barsFromDn > 9, title='?Buy > 9 Alert?', message='Buy > 9 Alert')

///////////////////////////////////////////////
//* Backtesting Period Selector | Component *//
///////////////////////////////////////////////


StartYear = input(2017, "Backtest Start Year",minval=1980)
StartMonth = input(1, "Backtest Start Month",minval=1,maxval=12)
StartDay = input(1, "Backtest Start Day",minval=1,maxval=31)
testPeriodStart = timestamp(StartYear,StartMonth,StartDay,0,0)

StopYear = input(2020, "Backtest Stop Year",minval=1980)
StopMonth = input(12, "Backtest Stop Month",minval=1,maxval=12)
StopDay = input(31, "Backtest Stop Day",minval=1,maxval=31)
testPeriodStop = timestamp(StopYear,StopMonth,StopDay,0,0)

testPeriod() => true

isLong  = barsFromUp == bar_counter
isShort = barsFromDn == bar_counter

long_entry_price    = valuewhen(isLong, close, 0)
short_entry_price   = valuewhen(isShort, close, 0)

sinceNUP = barssince(isLong)
sinceNDN = barssince(isShort)

buy_trend   = sinceNDN > sinceNUP
sell_trend  = sinceNDN < sinceNUP

//////////////////////////
//* Profit Component *//
//////////////////////////

//////////////////////////// MinTick ///////////////////////////
fx_pips_value = syminfo.type == "forex" ? syminfo.mintick*10 : 1

input_tp_pips = input(60, "Backtest Profit Goal (in USD)",minval=0)*fx_pips_value
input_sl_pips = input(30, "Backtest STOP Goal (in USD)",minval=0)*fx_pips_value

tp = buy_trend? long_entry_price + input_tp_pips : short_entry_price - input_tp_pips
sl = buy_trend? long_entry_price - input_sl_pips : short_entry_price + input_sl_pips

plot_tp = buy_trend and high[1] <= tp ? tp : sell_trend and low[1] <= tp ? tp : na
plot_sl = buy_trend and low[1] >= sl ? sl : sell_trend and high[1] >= sl ? sl : na

plot(plot_tp, title="TP", style=plot.style_circles, linewidth=3, color=color.blue)
plot(plot_sl, title="SL", style=plot.style_circles, linewidth=3, color=color.red)

longClose   = isShort
shortClose  = isLong

if testPeriod()
    strategy.entry("Long", 1, when=isLong)
    strategy.close("Long", when=longClose )
    strategy.exit("XL","Long", limit=tp,  when=buy_trend, stop=sl)

if testPeriod()
    strategy.entry("Short", 0,  when=isShort)
    strategy.close("Short", when=shortClose )
    strategy.exit("XS","Short", when=sell_trend, limit=tp, stop=sl)
```

> Detail

https://www.fmz.com/strategy/426996

> Last Modified

2023-09-16 19:04:02
