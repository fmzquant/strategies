
> Name

基于概率增强的RSI策略Probability-Enhanced-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/156c65ea016f5d61668.png)



## Overview

This is a simple long-only strategy using RSI indicator to determine overbought and oversold levels. We enhanced it by adding stop loss and take profit, and integrating a probability module to reinforcement trading only when the recent profitable trade probability is greater than or equal to 51%. This greatly improved the strategy performance by avoiding potential losing trades.  

## Principles

The strategy uses RSI indicator to judge market overbought and oversold conditions. Specifically, it goes long when RSI crosses below the lower limit of oversold zone; and closes position when RSI crosses above the upper limit of overbought zone. In addition, we set stop loss and take profit ratios.

The key is we integrated a probability judgement module. This module calculates the profitable percentage of long trades in recent periods (defined by lookback parameter). It only allows entry if recent profitable trading probability is greater than or equal to 51%. This avoids lots of potential losing trades.

## Advantages

As a probability enhanced RSI strategy, it has below advantages compared to simple RSI strategies:

1. Added stop loss and take profit controls single trade loss and locks profit
2. Integrated probability module avoids low probability markets
3. Probability module is adjustable for different market environments 
4. Long-only mechanism is simple to understand and implement

## Risk Analysis 

There are still some risks within this strategy:

1. Long-only, unable to profit from falling market
2. Improper probability module judgement could miss opportunities  
3. Hard to find best parameter combination, significant performance difference across market environments
4. Loose stop loss setting, still possible large single trade loss

Solutions:

1. Consider adding short mechanism 
2. Optimize probability module to lower misjudgement rate
3. Use machine learning to dynamically optimize parameters
4. Set more conservative stop loss level to limit loss

## Enhancement Directions

The strategy could be further optimized in below aspects:

1. Increase short module for dual direction trading
2. Use machine learning for dynamic parameter optimization
3. Try other indicators for overbought/oversold
4. Optimize stop loss/take profit for profit ratio enhancement 
5. Add other factors to filter signals and improve probability

## Summary

This is a simple RSI strategy enhanced by integrated probability module. Compared to vanilla RSI strategies, it filters out some losing trades and improves overall drawdown and profit ratio. Next step could be improving it by adding short, dynamic optimization etc to make it more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|RSI lenght: |
|v_input_int_2|35|Oversold: |
|v_input_int_3|75|Overbought: |
|v_input_int_4|30|Lookback period: |
|v_input_float_1|true|Take profit: |
|v_input_float_2|true|Stop loss: |


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © thequantscience

//@version=5
strategy("Reinforced RSI",
     overlay = true,
     default_qty_type = strategy.percent_of_equity, 
     default_qty_value = 100,
     pyramiding = 1,
     currency = currency.EUR, 
     initial_capital = 1000,
     commission_type = strategy.commission.percent, 
     commission_value = 0.07)

lenght_rsi = input.int(defval = 14, minval = 1, title = "RSI lenght: ")
rsi = ta.rsi(close, length = lenght_rsi)

rsi_value_check_entry = input.int(defval = 35, minval = 1, title = "Oversold: ")
rsi_value_check_exit = input.int(defval = 75, minval = 1, title = "Overbought: ")

trigger = ta.crossunder(rsi, rsi_value_check_entry)
exit = ta.crossover(rsi, rsi_value_check_exit)

entry_condition   = trigger 
TPcondition_exit  = exit

look = input.int(defval = 30, minval = 0, maxval = 500, title = "Lookback period: ")

Probabilities(lookback) =>

    isActiveLong = false
    isActiveLong := nz(isActiveLong[1], false)
    isSellLong = false
    isSellLong := nz(isSellLong[1], false)

    int positive_results = 0
    int negative_results = 0

    float positive_percentage_probabilities = 0 
    float negative_percentage_probabilities = 0 

    LONG = not isActiveLong and entry_condition == true 
    CLOSE_LONG_TP = not isSellLong and TPcondition_exit == true

    p = ta.valuewhen(LONG, close, 0)
    p2 = ta.valuewhen(CLOSE_LONG_TP, close, 0)

    for i = 1 to lookback

	    if (LONG[i])
            isActiveLong := true
		    isSellLong := false

        if (CLOSE_LONG_TP[i])
	        isActiveLong := false
	        isSellLong := true

        if p[i] > p2[i]
            positive_results += 1
        else 
            negative_results -= 1 

	    positive_relative_probabilities = positive_results / lookback
	    negative_relative_probabilities = negative_results / lookback
	    positive_percentage_probabilities := positive_relative_probabilities * 100
	    negative_percentage_probabilities := negative_relative_probabilities * 100

    positive_percentage_probabilities
	
probabilities = Probabilities(look) 

lots = strategy.equity/close

var float e = 0 
var float c = 0 

tp = input.float(defval = 1.00, minval = 0, title = "Take profit: ")
sl = input.float(defval = 1.00, minval = 0, title = "Stop loss: ")

if trigger==true and strategy.opentrades==0 and probabilities >= 51
    e := close
    strategy.entry(id = "e", direction = strategy.long, qty = lots, limit = e) 
takeprofit = e + ((e * tp)/100)
stoploss = e - ((e * sl)/100)
if exit==true
    c := close 
    strategy.exit(id = "c", from_entry = "e", limit = c)
if takeprofit and stoploss 
    strategy.exit(id = "c", from_entry = "e", stop = stoploss, limit = takeprofit)
```

> Detail

https://www.fmz.com/strategy/435973

> Last Modified

2023-12-20 15:05:05
