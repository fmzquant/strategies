
> Name

基于价格波动范围的买卖信号过滤策略Range-Filter-Buy-Sell-Signals-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/127dd61dd40d8e19922.png)

## Overview  

The Range Filter Buy Sell Signals Strategy is a very practical quantitative trading strategy. It uses the price fluctuation range to filter buy and sell signals, reducing false signals in low volatility markets and improving signal quality in high volatility markets. The strategy name accurately summarizes the main function of the strategy.  

## Strategy Logic

The strategy first calculates the fluctuation range of the asset price over a certain period. Specifically, it calculates the difference between the highest price and the lowest price within the specified period to determine the amplitude of the price fluctuation.  

After that, it will generate buy and sell signals. However, not all signals will trigger entry, but need to meet the price fluctuation range filtering conditions. For example, a buy signal is issued only when the price breaks through the fluctuation range.   

In this way, the strategy filters out most false signals in low volatility market environments, avoiding unnecessary entry. While in high volatility, it captures larger directional moves to profit from.

## Advantages 

The biggest advantage of this strategy is that it can dynamically adjust the filtering strength of signals. In low volatility, it chooses only high quality signals; while in high volatility, it can seize more opportunities provided by the market.  

Compared with fixed parameter filters, this strategy is more intelligent and adaptive. No matter what state the market is in, it provides superior risk reward.

In addition, compared to a single operating condition, this strategy incorporates trend directional judgment to provide more reliable trading signals. At the same time, it also has stop loss and take profit functions to effectively control the risk of individual trades.

## Risks

The main risk of the strategy lies in the setting of volatility range parameters. If the set range is too large or too small, it will adversely affect signal quality and profit opportunities.  

In addition, the strategy has relatively fewer profit opportunities in markets with strong short-term oscillating trends. Using a combination of different cycles systems helps mitigate this problem.  

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Use adaptive parameter algorithms to automatically optimize volatility range parameters to make them more intelligent and dynamic.  

2. Increase filtering rules based on large cycle trends to avoid consolidation traps.

3. Combine different cycles of the strategy to form a system and improve overall stability . 

4. Add machine learning algorithms to improve the effect of parameter settings and filtering rules.

## Conclusion  

The Range Filter Buy Sell Signals Strategy is a very practical and effective quantitative trading strategy. It can dynamically adjust the filtering intensity and provide superior risk reward in different market environments. At the same time, there is still great potential in optimizing this strategy, especially in parameter optimization and rule optimization. Overall, this strategy provides an excellent base solution for quantitative traders pursuing steady excess returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|true|Long Stop Loss (%)|
|v_input_float_2|true|Short Stop Loss (%)|
|v_input_float_3|true|Long Take(%)|
|v_input_float_4|true|Short Take (%)|
|v_input_int_1|200|EMA Length|
|v_input_1_close|0|Swing Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|20|Swing Period|
|v_input_float_5|3.5|Swing Multiplier|
|v_input_2|false|Bar Colors On/Off|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-02 00:00:00
end: 2024-03-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

// Credits to the original Script - Range Filter DonovanWall https://www.tradingview.com/script/lut7sBgG-Range-Filter-DW/
// This version is the old version of the Range Filter with less settings to tinker with

//@version=5
strategy(title='Range Filter - B&S Signals', shorttitle='[Doan]_RF-B&S Signals', overlay=true)

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Functions
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
longLossPerc = input.float(title='Long Stop Loss (%)', minval=0.0, step=0.1, defval=1) * 0.01
shortLossPerc = input.float(title='Short Stop Loss (%)', minval=0.0, step=0.1, defval=1) * 0.01

longTakePerc = input.float(title='Long Take(%)', minval=0.0, step=0.1, defval=1) * 0.01
shortTakePerc = input.float(title='Short Take (%)', minval=0.0, step=0.1, defval=1) * 0.01

emaLength = input.int(200, title="EMA Length")

// Determine stop loss price

//Range Size Function
rng_size(x, qty, n) =>
    wper = n * 2 - 1
    avrng = ta.ema(math.abs(x - x[1]), n)
    AC = ta.ema(avrng, wper) * qty
    rng_size = AC

//Range Filter Function
rng_filt(x, rng_, n) =>
    r = rng_
    var rfilt = array.new_float(2, x)
    array.set(rfilt, 1, array.get(rfilt, 0))
    if x - r > array.get(rfilt, 1)
        array.set(rfilt, 0, x - r)
    if x + r < array.get(rfilt, 1)
        array.set(rfilt, 0, x + r)
    rng_filt1 = array.get(rfilt, 0)

    hi_band = rng_filt1 + r
    lo_band = rng_filt1 - r
    rng_filt = rng_filt1
    [hi_band, lo_band, rng_filt]

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Inputs
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Range Source
rng_src = input(defval=close, title='Swing Source')

//Range Period
rng_per = input.int(defval=20, minval=1, title='Swing Period')

//Range Size Inputs
rng_qty = input.float(defval=3.5, minval=0.0000001, title='Swing Multiplier')

//Bar Colors
use_barcolor = input(defval=false, title='Bar Colors On/Off')

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Definitions
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Range Filter Values
[h_band, l_band, filt] = rng_filt(rng_src, rng_size(rng_src, rng_qty, rng_per), rng_per)

//Direction Conditions
var fdir = 0.0
fdir := filt > filt[1] ? 1 : filt < filt[1] ? -1 : fdir
upward = fdir == 1 ? 1 : 0
downward = fdir == -1 ? 1 : 0

//Trading Condition
longCond = rng_src > filt and rng_src > rng_src[1] and upward > 0 or rng_src > filt and rng_src < rng_src[1] and upward > 0
shortCond = rng_src < filt and rng_src < rng_src[1] and downward > 0 or rng_src < filt and rng_src > rng_src[1] and downward > 0

CondIni = 0
CondIni := longCond ? 1 : shortCond ? -1 : CondIni[1]
longCondition = longCond and CondIni[1] == -1
shortCondition = shortCond and CondIni[1] == 1

//Colors
filt_color = upward ? #05ff9b : downward ? #ff0583 : #cccccc
bar_color = upward and rng_src > filt ? rng_src > rng_src[1] ? #05ff9b : #00b36b : downward and rng_src < filt ? rng_src < rng_src[1] ? #ff0583 : #b8005d : #cccccc


ema = ta.ema(close, emaLength)

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Outputs
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
longStopPrice = strategy.position_avg_price * (1 - longLossPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)

longTakePrice = strategy.position_avg_price * (1 + longTakePerc)
shortTakePrice = strategy.position_avg_price * (1 - shortTakePerc)

//Filter Plot
filt_plot = plot(filt, color=filt_color, linewidth=3, title='Filter', transp=67)

//Band Plots
h_band_plot = plot(h_band, color=color.new(#05ff9b, 100), title='High Band')
l_band_plot = plot(l_band, color=color.new(#ff0583, 100), title='Low Band')

//Band Fills
fill(h_band_plot, filt_plot, color=color.new(#00b36b, 92), title='High Band Fill')
fill(l_band_plot, filt_plot, color=color.new(#b8005d, 92), title='Low Band Fill')

//Bar Color
barcolor(use_barcolor ? bar_color : na)
// Entry
strategy.entry("Long", strategy.long, when=longCondition)
strategy.entry("Short", strategy.short, when=shortCondition)

plot(ema)

//Plot Buy and Sell Labels
plotshape(longCondition, title='Buy Signal', text='BUY', textcolor=color.white, style=shape.labelup, size=size.normal, location=location.belowbar, color=color.new(color.green, 0))
plotshape(shortCondition, title='Sell Signal', text='SELL', textcolor=color.white, style=shape.labeldown, size=size.normal, location=location.abovebar, color=color.new(color.red, 0))

//Alerts
alertcondition(longCondition, title='Buy Alert', message='BUY')
alertcondition(shortCondition, title='Sell Alert', message='SELL')




```

> Detail

https://www.fmz.com/strategy/444034

> Last Modified

2024-03-08 17:06:50
