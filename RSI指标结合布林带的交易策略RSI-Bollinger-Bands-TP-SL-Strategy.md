
> Name

RSI指标结合布林带的交易策略RSI-Bollinger-Bands-TP-SL-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ce21d5668f0ed83c85.png)

## I. Strategy Overview  

The strategy is named RSI Bollinger Bands TP/SL Strategy. It combines the RSI indicator and Bollinger Bands to identify trends and trading signals. When the RSI indicator shows overbought or oversold signals and the price touches or breaks through the Bollinger Bands, long or short positions will be opened. Besides, take profit and stop loss points are also set to control risks.

## II. Strategy Logic

### 1. RSI Indicator for Reversals

The RSI indicator judges whether a stock is overbought or oversold. An RSI reading above the overbought line indicates overbought conditions, while a reading below the oversold line indicates oversold conditions. The overbought line is set at 50 and the oversold line is set at 50 in this strategy.

### 2. Bollinger Bands for Trend

Bollinger Bands plot standard deviation lines above and below a simple moving average. The upper band acts as resistance and the lower band acts as support. An up-crossing of the lower band is a buy signal, while a down-crossing of the upper band is a sell signal.

### 3. Combination of RSI and Bollinger Bands

When the RSI indicator shows a bottom reversal signal and the price breaks through the lower band of Bollinger Bands, it is regarded as an upward reversal, thus going long. When the RSI indicator shows a top reversal signal and the price breaks down the upper band, it is regarded as a downward reversal, thus going short.

## III. Advantages

### 1. Improved Accuracy with Dual Indicators  

The RSI and Bollinger Bands are both used to determine trends and reversals. The combination improves signal recognition accuracy and avoids false breakouts.

### 2. Risk Control using TP/SL

The strategy sets take profit (TP) and stop loss (SL) points to lock in profits and maximize loss mitigation.  

### 3. Customizable Directions

Users can go long only, short only or both directions based on market conditions, allowing flexible risk control.

## IV. Risks  

### 1. Sensitive Bollinger Bands Parameters

The standard deviation size affects bands width and trading signals. Improper settings may generate excessive false signals.  

### 2. Risks of TP/SL

V-shaped reversals can trigger unnecessary losses with TP/SL settings being too aggressive.

### 3. Sensitive RSI Parameters

Wrong RSI parameter settings lead to decreased accuracy of reversal signals.

## V. Optimization Directions   

### 1. Optimize RSI Parameters 

More RSI length values can be tested to find the optimal parameter combination.

### 2. Optimize Bollinger Bands Parameters

More lengths and standard deviations can be tested to find the optimal parameter combination.  

### 3. Test Different TP/SL Ratios

Backtesting can help find the optimal TP/SL ratio.

## VI. Conclusion

This strategy leverages RSI and Bollinger Bands to identify trends and reversals, and sets TP/SL to control risks. It can automatically detect trading signals and manage exits. There are still some risks that can be improved by parameter optimization. In general, this is a practical strategy with strong applicability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|6|RSI Length|
|v_input_int_2|50|RSI OverSold|
|v_input_int_3|50|RSI OverBought|
|v_input_int_4|200|Bollinger Period Length|
|v_input_float_1|2|Bollinger Bands Standard Deviation|
|v_input_float_2|false|Take Profit:|
|v_input_float_3|false|Stop Loss:  |
|v_input_bool_1|true|Long Entry|
|v_input_bool_2|true|Short Entry|
|v_input_int_5|true|From Day|
|v_input_int_6|true|From Month|
|v_input_int_7|2021|From Year|
|v_input_int_8|30|To Day|
|v_input_int_9|12|To Month|
|v_input_int_10|2042|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-12-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © BigCoinHunter

//@version=5
strategy(title="RSI_Boll-TP/SL", overlay=true, 
     pyramiding=0, default_qty_type=strategy.percent_of_equity, 
     default_qty_value=100, initial_capital=1000, 
     currency=currency.USD, commission_value=0.05, 
     commission_type=strategy.commission.percent, 
     process_orders_on_close=true)

//----------- get the user inputs --------------

//---------- RSI -------------
price = input(close, title="Source")

RSIlength = input.int(defval=6,title="RSI Length") 
RSIoverSold = input.int(defval=50, title="RSI OverSold", minval=1)
RSIoverBought = input.int(defval=50, title="RSI OverBought", minval=1)

//------- Bollinger Bands -----------
BBlength = input.int(defval=200, title="Bollinger Period Length", minval=1)
BBmult = input.float(defval=2.0, minval=0.001, maxval=50, step=0.1, title="Bollinger Bands Standard Deviation")
BBbasis = ta.sma(price, BBlength)
BBdev = BBmult * ta.stdev(price, BBlength)
BBupper = BBbasis + BBdev
BBlower = BBbasis - BBdev
source = close
buyEntry = ta.crossover(source, BBlower)
sellEntry = ta.crossunder(source, BBupper)
plot(BBbasis, color=color.aqua, title="Bollinger Bands SMA Basis Line")
p1 = plot(BBupper, color=color.silver, title="Bollinger Bands Upper Line")
p2 = plot(BBlower, color=color.silver, title="Bollinger Bands Lower Line")
fill(plot1=p1, plot2=p2, title="Bollinger BackGround", color=color.new(color.aqua,90), fillgaps=false, editable=true)

//---------- input TP/SL ---------------
tp = input.float(title="Take Profit:", defval=0.0, minval=0.0, maxval=100.0, step=0.1) * 0.01
sl = input.float(title="Stop Loss:  ", defval=0.0, minval=0.0, maxval=100.0, step=0.1) * 0.01

longEntry = input.bool(defval=true, title= 'Long Entry', inline="11")
shortEntry = input.bool(defval=true, title='Short Entry', inline="11")

//---------- backtest range setup ------------
fromDay   = input.int(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input.int(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear  = input.int(defval = 2021, title = "From Year", minval = 2010)
toDay     = input.int(defval = 30, title = "To Day", minval = 1, maxval = 31)
toMonth   = input.int(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear    = input.int(defval = 2042, title = "To Year", minval = 2010)

//------------ time interval setup -----------
start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)  // backtest start window
finish    = timestamp(toYear, toMonth, toDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false // create function "within window of time"

//------- define the global variables ------
var bool long = true
var bool stoppedOutLong = false
var bool stoppedOutShort = false
//--------- Colors ---------------

TrendColor = RSIoverBought and (price[1] > BBupper and price < BBupper) and BBbasis < BBbasis[1] ? color.red : RSIoverSold and (price[1] < BBlower and price > BBlower) and BBbasis > BBbasis[1] ? color.green : na
//bgcolor(switch2?(color.new(TrendColor,50)):na)


//--------- calculate the input/output points -----------
longProfitPrice  = strategy.position_avg_price * (1 + tp)     // tp -> take profit percentage
longStopPrice = strategy.position_avg_price * (1 - sl)        // sl -> stop loss percentage

shortProfitPrice  = strategy.position_avg_price * (1 - tp)
shortStopPrice = strategy.position_avg_price * (1 + sl)


//---------- RSI + Bollinger Bands Strategy -------------
vrsi = ta.rsi(price, RSIlength)

rsiCrossOver = ta.crossover(vrsi, RSIoverSold)
rsiCrossUnder = ta.crossunder(vrsi, RSIoverBought)

BBCrossOver = ta.crossover(source, BBlower)
BBCrossUnder = ta.crossunder(source, BBupper)

if (not na(vrsi))

    if rsiCrossOver and BBCrossOver
        long := true
        
    if rsiCrossUnder and BBCrossUnder
        long := false

//------------------- determine buy and sell points ---------------------
buySignall = window() and long  and (not stoppedOutLong)
sellSignall = window() and (not long)  and (not stoppedOutShort)

//---------- execute the strategy -----------------
if(longEntry and shortEntry)
    if long 
        strategy.entry("LONG", strategy.long, when = buySignall, comment = "ENTER LONG")
        stoppedOutLong := true
        stoppedOutShort := false
    else 
        strategy.entry("SHORT", strategy.short, when = sellSignall, comment = "ENTER SHORT")
        stoppedOutLong  := false
        stoppedOutShort := true

else if(longEntry)
    strategy.entry("LONG", strategy.long,  when = buySignall)
    strategy.close("LONG", when = sellSignall)
    if long 
        stoppedOutLong := true
    else
        stoppedOutLong  := false

else if(shortEntry)
    strategy.entry("SHORT", strategy.short, when = sellSignall)
    strategy.close("SHORT", when = buySignall)
    if not long
        stoppedOutShort := true
    else
        stoppedOutShort := false
    

//----------------- take profit and stop loss -----------------
if(tp>0.0 and sl>0.0)
    if ( strategy.position_size > 0 )
        strategy.exit(id="LONG", limit=longProfitPrice, stop=longStopPrice, comment="Long TP/SL Trigger")

    else if ( strategy.position_size < 0 )
        strategy.exit(id="SHORT", limit=shortProfitPrice, stop=shortStopPrice, comment="Short TP/SL Trigger")

else if(tp>0.0)
    if ( strategy.position_size > 0 )
        strategy.exit(id="LONG", limit=longProfitPrice, comment="Long TP Trigger")

    else if ( strategy.position_size < 0 )
        strategy.exit(id="SHORT", limit=shortProfitPrice, comment="Short TP Trigger")
        
else if(sl>0.0)
    if ( strategy.position_size > 0 )
        strategy.exit(id="LONG",  stop=longStopPrice, comment="Long SL Trigger")

    else if ( strategy.position_size < 0 )
        strategy.exit(id="SHORT",  stop=shortStopPrice, comment="Short SL Trigger")


















```

> Detail

https://www.fmz.com/strategy/436097

> Last Modified

2023-12-21 11:17:19
