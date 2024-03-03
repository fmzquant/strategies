
> Name

EMA-SCALPEUR-RSi-SHORT

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|9|EMA_L|
|v_input_int_2|26|EMA_L2|
|v_input_int_3|100|EMA_S|
|v_input_int_4|55|EMA_S2|
|v_input_int_5|5|RSI|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
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
RSI1 = input.int (title = "RSI", defval = 5, minval = 1, maxval = 20 , step = 1)

/// mise en place de ema

RSI = ta.rsi(close, RSI1)

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


//buy = ta.crossover(EMA1, EMA2) and RSI > 60 and RSI <70
sell = ta.crossunder(EMA1, EMA2) and RSI > 40

//buyexit = ta.crossunder(EMA3, EMA4)
sellexit = ta.crossover(EMA3, EMA4)

/////strategy


strategy.entry ("short", strategy.short, when = sell, comment = "ENTER-SHORT")


///// market exit


strategy.close ("short",  when = sellexit, comment = "EXIT-SHORT")

```

> Detail

https://www.fmz.com/strategy/380251

> Last Modified

2022-08-27 17:17:28
