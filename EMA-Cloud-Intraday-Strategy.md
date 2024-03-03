
> Name

EMA-Cloud-Intraday-Strategy

> Author

ChaoZhang

> Strategy Description

This strategy utilizes the 9 and 20 period exponential moving averages to create a colored cloud between similar to what is seen on the Ichimoku Cloud . The strategy closes all trades by the end of the trading day. Entry is when the price closes above a Green (9 EMA above 20 EMA ) cloud or below a Red (9 EMA below 20 EMA ) cloud. Exit is when price closes against the 9 EMA or at the end of the trading day. Running the strategy tester on different intraday time frames will show the best time frame for a given Symbol. For example, I have found that the best results are returned by this strategy for SPY on the 30 minute time frame.


**backtest**

 ![IMG](https://www.fmz.com/upload/asset/1dec397823194b25bf3.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|Trade Quantity|
|v_input_1|7|Fast EMA Length|
|v_input_2|20|Slow EMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-16 00:00:00
end: 2022-05-15 23:59:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © rwestbrookjr

//@version=5
strategy("EMA Cloud Intraday Strategy", overlay=true, margin_long=100, margin_short=100, process_orders_on_close=true)

i_trdQty = input.int(10, "Trade Quantity", minval = 1)




fastLen = input(title = "Fast EMA Length", defval = 7)
slowLen = input(title = "Slow EMA Length", defval = 20)

fastEMA = ta.ema(close, fastLen)
slowEMA = ta.ema(close, slowLen)

fema = plot(fastEMA, title = "FastEMA", color = color.green, linewidth = 1, style = plot.style_line)
sema = plot(slowEMA, title = "SlowEMA", color = color.red, linewidth = 1, style = plot.style_line)

fill(fema, sema, color = fastEMA > slowEMA ? color.new(#417505, 50) : color.new(#890101, 50), title = "Cloud")

longCondition = (close > fastEMA and fastEMA > slowEMA)

if (longCondition)
    strategy.entry("Long_Entry", strategy.long)
longExit = close[1] < fastEMA
if (longExit)
    strategy.close("Long_Entry",when=longExit)
    //strategy.exit("exit", "My Long Entry Id", trail_points=1.5, trail_offset=0)

shortCondition = (close < fastEMA and fastEMA < slowEMA)
if (shortCondition)
    strategy.entry("Short_Entry", strategy.short)
shortExit = close[1] > fastEMA
if (shortExit)
    strategy.close("Short_Entry",when=shortExit)
    //strategy.exit("exit", "My Short Entry Id", trail_points=1.5, trail_offset=0)


```

> Detail

https://www.fmz.com/strategy/363835

> Last Modified

2022-05-17 16:38:28
