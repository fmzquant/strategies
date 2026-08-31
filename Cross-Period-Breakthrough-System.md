
> Name

Cross-Period-Breakthrough-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10cd49cecee2416d410.png)



## Overview

This is a quantitative trading strategy that utilizes moving averages and MACD indicators for breakthrough operations in both directions. It has the feature of cross-period operations, that is, judging the trend direction on longer time frames and looking for opportunities on shorter time frames.

## Strategy Principle  

The strategy uses 3 SMMA moving averages of different lengths and 1 EMA moving average to determine the trend direction. At the same time, it combines the MACD indicator to judge short-term trends and entry opportunities. Specifically, the buy trigger condition is: the price breaks through all moving averages upwards, and the shorter averages are above the longer ones; while the sell trigger condition is the opposite, the price breaks through all moving averages downwards, and the shorter averages are below the longer ones.

It can be seen that this strategy utilizes moving averages to judge medium and long term trend directions, and MACD to catch better entry opportunities by judging short term reversals. This multi time frame joint operation is an important feature of the strategy.

## Advantage Analysis

The advantage of this cross-period operation is that it can select suitable short-term reversal points to enter in the high-probability trend direction, thus obtaining a better risk-reward ratio. Specifically, there are mainly the following 3 advantages:

1. The 3 SMMA averages plus 1 EMA line multi-level filtering can effectively determine the medium and long term trend direction to avoid trading against the trend.

2. MACD indicator judging short-term reversal points for entering can obtain better entry price levels. 

3. The strict moving average sequence relationship as a filtering condition can reduce the probability of mis-operations.

## Risk Analysis  

The main risks of this strategy are:

1. Moving averages themselves have greater lagging properties, which may miss short-term trend reversal opportunities.

2. MACD indicators are prone to generate false signals and need to be filtered in combination with price levels.

3. Multi time frame judgments increase the complexity of the strategy and are prone to failure.

To address risk 1 and risk 2, we can optimize by appropriately shortening the moving average and signal cycle to respond quickly to short-term trend reversals. For risk 3, we need to optimize and test for different varieties and cycles to strictly adapt the strategy parameters to the characteristics of that variety.

## Optimization Directions

The main aspects that this strategy can be optimized include:

1. Optimize the parameters of moving averages and MACD to best match the characteristics of different cycles and varieties. Such as shortening the length of the moving averages, increasing the signal parameter, etc.

2. Increase stop loss strategies using ATR or other indicators to set reasonable moving stops. This can significantly improve the risk control of the strategy.

3. Look for better indicators or filtering methods to replace MACD signals. For example, introduce volatility indicators and filter signals accordingly.  

4. Test different profit and loss ratio relationships to obtain parameter combinations with better risk-reward ratios.

## Summary  

In general, this is a unique breakthrough system with cross-timeframe thinking. It utilizes the advantages of both moving averages and MACD to achieve a joint judgment operation strategy across multiple time frames. By optimizing and adjusting parameters and filtering criteria, this strategy can become a very practical quantitative trading solution.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2000|From Year|
|v_input_4|true|To Day|
|v_input_5|8|To Month|
|v_input_6|2031|To Year|
|v_input_7|3|Length|
|v_input_8_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_9|6|Length|
|v_input_10_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_11|9|Length|
|v_input_12_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_13|50|Length|
|v_input_14_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_15|200|Length|
|v_input_16_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_17|12|Fast Length|
|v_input_18|26|Slow Length|
|v_input_19_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_20|9|Signal Smoothing|
|v_input_21|false|Simple MA(Oscillator)|
|v_input_22|false|Simple MA(Signal Line)|
|v_input_23|14|ATR Length|
|v_input_24|true|Percentage Multiplier (for ex., 0.7 = 70%)|
|v_input_25|false|Show actual ATR|
|v_input_26|300|tp|
|v_input_27|300|sl|
|v_input_28|3|Risk %|
|v_input_29|2|max entries|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-22 00:00:00
end: 2023-11-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SoftKill21

//@version=4
strategy("Koala Script",initial_capital=1000, 
     commission_type=strategy.commission.cash_per_contract, 
     commission_value=0.000065,
     slippage=3)
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2000, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 8, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2031, title = "To Year", minval = 1970)
 


startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)




len = input(3, minval=1, title="Length")
src = input(hl2, title="Source")
smma = 0.0
sma1 = sma(src, len)
smma := na(smma[1]) ? sma1 : (smma[1] * (len - 1) + src) / len

len2 = input(6, minval=1, title="Length")
src2 = input(hl2, title="Source")
smma2 = 0.0
sma2 = sma(src2, len2)
smma2 := na(smma2[1]) ? sma2 : (smma2[1] * (len2 - 1) + src2) / len2

len3 = input(9, minval=1, title="Length")
src3 = input(hl2, title="Source")
smma3 = 0.0
sma3 = sma(src3, len3)
smma3 := na(smma3[1]) ? sma3 : (smma3[1] * (len3 - 1) + src3) / len3

len4 = input(50, minval=1, title="Length")
src4 = input(close, title="Source")
smma4 = 0.0
sma4 = sma(src4, len4)
smma4 := na(smma4[1]) ? sma4  : (smma4[1] * (len4 - 1) + src4) / len4

len5 = input(200, minval=1, title="Length")
src5 = input(close, title="Source")
out5 = ema(src5, len5)

timeinrange(res, sess) => time(res, sess) != 0
london=timeinrange(timeframe.period, "0300-1045")
londonEntry=timeinrange(timeframe.period, "0300-0845")

time_cond = time >= startDate and time <= finishDate and londonEntry

fast_length = input(title="Fast Length", type=input.integer, defval=12)
slow_length = input(title="Slow Length", type=input.integer, defval=26)
srcc = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)
sma_source = input(title="Simple MA(Oscillator)", type=input.bool, defval=false)
sma_signal = input(title="Simple MA(Signal Line)", type=input.bool, defval=false)


// Calculating
fast_ma = sma_source ? sma(srcc, fast_length) : ema(srcc, fast_length)
slow_ma = sma_source ? sma(srcc, slow_length) : ema(srcc, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal


longCond = close > out5 and close > smma4 and close > smma3 and close > smma2 and close > smma and londonEntry and smma > smma2 and smma2>smma3 and smma3>smma4 and smma4>out5 
shortCond = close < out5 and close < smma4 and close < smma3 and close < smma2 and close < smma and londonEntry and smma < smma2 and smma2<smma3 and smma3<smma4 and smma4<out5 
//longCond2 = crossover(close,out5) and crossover(close,smma4) and crossover(close,smma3) and crossover(close,smma2) and crossover(close,smma) and time_cond
//shortCond2 = crossunder(close,out5) and crossunder(close,smma4) and crossunder(close,smma3) and crossunder(close,smma2) and crossunder(close,smma) and time_cond

length=input(14, title="ATR Length")
mult=input(1.0, title="Percentage Multiplier (for ex., 0.7 = 70%)", step=0.1, minval=0.1, maxval=5.0)

oa=input(false, title="Show actual ATR")

ii=syminfo.pointvalue==0
s=ii?na:oa?atr(length):(syminfo.pointvalue * mult * atr(length))

tp=input(300,title="tp")
sl=input(300,title="sl")


//tp = s*10000
//sl= s*10000



//if(tp>300)
//    tp:=300
//if(sl>300)
//    sl:=300
//if(sl<150)
//    sl:=150
//if(tp<150)
//    tp:=150
strategy.initial_capital = 50000
//MONEY MANAGEMENT--------------------------------------------------------------''
balance = strategy.netprofit + strategy.initial_capital //current balance
floating = strategy.openprofit          //floating profit/loss
risk = input(3,type=input.float,title="Risk %")/100           //risk % per trade


    //Calculate the size of the next trade
temp01 = balance * risk     //Risk in USD
temp02 = temp01/sl        //Risk in lots
temp03 = temp02*100000      //Convert to contracts
size = temp03 - temp03%1000 //Normalize to 1000s (Trade size)
if(size < 10000)
    size := 10000           //Set min. lot size



strategy.entry("long",1,when=longCond )
strategy.exit("closelong","long", profit=tp,loss=sl)
//strategy.close("long",when= crossunder(close[4],smma4) and close[4] > close[3] and close[3]>close[2] and close[2] > close[1] and close[1] > close)
strategy.entry("short",0,when=shortCond )
strategy.exit("closeshort","short", profit=tp,loss=sl)
//strategy.close("short",when= crossover(close[4],smma4) and close[4] < close[3] and close[3]< close[2] and close[2] < close[1] and close[1] < close)

strategy.close_all(when = not london)

maxEntry=input(2,title="max entries")
// strategy.risk.max_intraday_filled_orders(maxEntry)
```

> Detail

https://www.fmz.com/strategy/432890

> Last Modified

2023-11-22 15:22:49
