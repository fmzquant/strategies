
> Name

Dual-EMA-Golden-Cross-Profit-Taking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7318f9bbbffe47a533.png)

## Overview

This strategy calculates two groups of EMA indicators with different parameters and sets the buy signal when the two groups of EMA indicators have a golden cross and the sell signal when another two groups of EMA indicators have a death cross, so as to achieve an efficient short-term trading strategy.

## Strategy Principle  

The strategy uses 4 EMA indicators, EMA1 with a period of 9, EMA2 with a period of 26, EMA3 with a period of 100, and EMA4 with a period of 55. The buy signal is set when EMA1 crosses over EMA2, indicating that the short-term EMA crosses over the long-term EMA, which is a typical golden cross signal. The sell signal is set when EMA3 crosses below EMA4, which is a death cross signal. This allows fast entry when the short-term EMA indicator has a golden cross and fast stop loss when the long-term EMA indicator has a death cross to achieve efficient short-term trading.

## Advantage Analysis

1. Use dual EMA cross for fast entry and exit to quickly lock short-term profits 
2. Clear and simple trading signals, easy to implement
3. Adjustable parameters to suit different markets
4. Large profit range, suitable for short-term scalping trading

## Risk Analysis  

1. Dual EMA cross may have false signals, needs to be filtered with other indicators
2. Improper EMA parameter settings may cause too sensitive or dull
3. Need to closely monitor larger cycles for timely profit-taking

## Optimization Direction

1. Can add MACD, KDJ and other indicators for signal filtering to improve signal accuracy
2. Can test more combinations to find the optimal EMA parameters  
3. Can set moving stop loss to lock in profits

## Summary

Overall, this is a very typical and effective short-term trading strategy. The advantages are fast entry and exit, suitable for scalping and large profit range. There are also some risks that need attention and prevention. With proper parameter adjustment and assistance of other indicators for signal filtering, it can become a very practical short-term trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|9|EMA_L|
|v_input_int_2|26|EMA_L2|
|v_input_int_3|100|EMA_S|
|v_input_int_4|55|EMA_S2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-05 00:00:00
end: 2024-01-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © YukalMoon

//@version=5
strategy(title="EMA SCALPEUR", overlay=true, initial_capital = 1000)


//// input controls

EMA_L = input.int (title = "EMA_L", defval = 9, minval = 1, maxval = 100, step =1)
EMA_L2 = input.int (title = "EMA_L2", defval = 26, minval = 1, maxval = 100, step =1)
EMA_S = input.int (title = "EMA_S", defval = 100, minval = 1, maxval = 100, step =1)
EMA_S2 = input.int (title = "EMA_S2", defval = 55, minval = 1, maxval = 100, step =1)


/// mise en place de ema

shortest = ta.ema(close, 9)
short = ta.ema(close, 26)
longer = ta.ema(close, 100)
longest = ta.ema(close, 55)

plot(shortest, color = color.red)
plot(short, color = color.orange)
plot(longer, color = color.aqua)
plot(longest, color = color.yellow)

plot(close)

//// trading indicators

EMA1 = ta.ema (close,EMA_L)
EMA2 = ta.ema (close,EMA_L2)
EMA3 = ta.ema (close, EMA_S)
EMA4 = ta.ema (close, EMA_S2)


buy = ta.crossover(EMA1, EMA2)
//sell = ta.crossunder(EMA1, EMA2)

buyexit = ta.crossunder(EMA3, EMA4)
//sellexit = ta.crossover(EMA3, EMA4)

/////strategy

strategy.entry ("long", strategy.long, when = buy, comment = "EXIT-LONG")
//strategy.entry ("short", strategy.short, when = sell, comment = "ENTER-SHORT")


///// market exit

strategy.close ("long", when = buyexit, comment = "ENTER-LONG")
//strategy.close ("short",  when = sellexit, comment = "EXIT-SHORT")

```

> Detail

https://www.fmz.com/strategy/438484

> Last Modified

2024-01-12 14:02:22
