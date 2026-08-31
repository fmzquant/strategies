
> Name

MACD金叉死叉趋势跟踪策略MACD-Golden-Cross-Death-Cross-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d4e0456214e3ae52cc.png)

## Overview  

This strategy uses the golden cross and death cross of the MACD indicator to determine the trend direction, and uses the ATR indicator for stop loss and take profit to implement trend following trading. The strategy name highlights the use of the golden cross and death cross signals of the MACD indicator.  

## Strategy Logic

When the MACD line crosses above the Signal line from below and becomes positive, a buy signal is generated, which is called the golden cross signal, indicating an upward trend in the stock price. When the MACD line crosses below the Signal line from above and becomes negative, a sell signal is generated, which is called the death cross signal, indicating a downward trend in the stock price.

The strategy simply goes long on golden crosses and goes short on death crosses to follow trends. At the same time, the strategy also introduces the ATR indicator to calculate stop loss and take profit levels to construct the trading system.

Specifically, the strategy first calculates the fast moving average, slow moving average, MACD difference, Signal line and other standard MACD indicators. Then, based on the chosen one of five signal types (continuation signal, reversal signal, histogram signal, MACD zero cross, Signal line zero cross), golden crosses and death crosses are determined. Finally, stop loss and take profit are set based on the ATR indicator to complete the entry and exit logic.

## Advantage Analysis 

The strategy has the following advantages:

1. Using the MACD indicator to determine the trend direction is accurate and reliable. The MACD indicator has performed prominently in trend determination over the years.

2. The stop loss and take profit settings based on the ATR indicator can effectively control the risk-reward ratio of single trades and reduce the probability of losses.

3. Providing five optional signal types allows using the most appropriate signal for different markets, improving the adaptability of the strategy.  

4. There are many tunable input parameters that can be optimized for better trading performance.

## Risks and Solutions

There are also some risks with this strategy:

1. The MACD indicator can easily generate false signals and cause unnecessary losses. Other indicators can be used to filter the signals.  

2. The ATR indicator only models the fluctuations of the recent period and cannot accurately stop loss in extreme market conditions. Dynamic stops can be introduced to solve this issue.

3. The performance of chosen signals may not be stable. Extensive backtesting is required to determine the optimal parameters.  

4. The signal parameters and risk management parameters need to be optimized together, otherwise it’s hard to find the globally optimal results. Stepwise optimization methods are recommended.

## Optimization Suggestions

The strategy can also be optimized in the following aspects:

1. Try other moving averages like TMA, Hull MA etc to filter MACD signals.  

2. Try dynamic stop mechanisms that can better deal with fluctuations in extreme market conditions.

3. Exhaustively optimize traditional MACD parameters to find better combinations.  

4. Use machine learning methods to find optimal ATR multiples for better risk management.  

5. Backtest each of the five signal types separately to determine the optimal signal.

6. Train neural networks to judge signal quality and discover new signals based on MACD.

## Conclusion  

The MACD golden cross death cross trend following strategy utilizes the MACD indicator to determine trend direction and sets stop loss and take profit with the ATR indicator, which can effectively capture trend trading opportunities. The strategy has multiple advantages like tunable parameters, complete stop mechanisms and optional signal types. The next step is to improve signal quality, stop loss mechanisms and parameter selection optimization in order to obtain better backtest and live results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|9|Signal Smoothing|
|v_input_5|false|Simple MA(Oscillator)|
|v_input_6|false|Simple MA(Signal Line)|
|v_input_7|0|Choose your signal: Continuation|Reversal|Histogram|MACD Line ZC|Signal Line ZC|
|v_input_8|false|JPY Pair ?|
|v_input_9|3|How many years of testing ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-21 00:00:00
end: 2023-12-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © vuagnouxb

//@version=4
strategy("BV's MACD SIGNAL TESTER", overlay=true)

//------------------------------------------------------------------------
//----------            Confirmation Calculation              ------------ INPUT
//------------------------------------------------------------------------

// Getting inputs
fast_length = input(title="Fast Length", type=input.integer, defval=12)
slow_length = input(title="Slow Length", type=input.integer, defval=26)
src = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)
sma_source = input(title="Simple MA(Oscillator)", type=input.bool, defval=false)
sma_signal = input(title="Simple MA(Signal Line)", type=input.bool, defval=false)

// Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00

// Calculating
fast_ma = sma_source ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal

// plot(hist, title="Histogram", style=plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below) ), transp=0 )
// plot(macd, title="MACD", color=col_macd, transp=0)
// plot(signal, title="Signal", color=col_signal, transp=0)

// -- Trade entry signals

signalChoice = input(title = "Choose your signal", defval = "Continuation", options = ["Continuation", "Reversal", "Histogram", "MACD Line ZC", "Signal Line ZC"])

continuationSignalLong = signalChoice == "Continuation" ? crossover(macd, signal) and macd > 0 :
   signalChoice == "Reversal" ? crossover(macd, signal) and macd < 0 : 
   signalChoice == "Histogram" ? crossover(hist, 0) : 
   signalChoice == "MACD Line ZC" ? crossover(macd, 0) :
   signalChoice == "Signal Line ZC" ? crossover(signal, 0) :
   false
   
continuationSignalShort = signalChoice == "Continuation" ? crossunder(macd, signal) and macd < 0 :
   signalChoice == "Reversal" ? crossover(signal, macd) and macd > 0 : 
   signalChoice == "Histogram" ? crossunder(hist, 0) : 
   signalChoice == "MACD Line ZC" ? crossunder(macd, 0) :
   signalChoice == "Signal Line ZC" ? crossunder(signal, 0) :
   false

longCondition = continuationSignalLong

shortCondition = continuationSignalShort

//------------------------------------------------------------------------
//----------             ATR MONEY MANAGEMENT                 ------------
//------------------------------------------------------------------------

SLmultiplier = 1.5
TPmultiplier = 1

JPYPair = input(type = input.bool, title = "JPY Pair ?", defval = false)
pipAdjuster = JPYPair ? 1000 : 100000


ATR = atr(14) * pipAdjuster // 1000 for jpy pairs : 100000
SL = ATR * SLmultiplier
TP = ATR * TPmultiplier

//------------------------------------------------------------------------
//----------                  TIME FILTER                     ------------
//------------------------------------------------------------------------

YearOfTesting = input(title = "How many years of testing ?" , type = input.integer, defval = 3)

_time = 2020 - YearOfTesting

timeFilter = (year > _time) 

//------------------------------------------------------------------------
//---------                 ENTRY FUNCTIONS                    ----------- INPUT
//------------------------------------------------------------------------

if (longCondition and timeFilter)  
    strategy.entry("Long", strategy.long)

if (shortCondition and timeFilter) 
    strategy.entry("Short", strategy.short)
    
//------------------------------------------------------------------------
//---------                 EXIT  FUNCTIONS                    -----------
//------------------------------------------------------------------------


strategy.exit("ATR", from_entry = "Long", profit = TP, loss = SL)  

strategy.exit("ATR", from_entry = "Short", profit = TP, loss = SL)  
```

> Detail

https://www.fmz.com/strategy/436213

> Last Modified

2023-12-22 11:45:54
