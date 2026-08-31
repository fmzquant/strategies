
> Name

RSI-Breakout-VWAP-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy applies RSI indicator on VWAP, and determines long/short direction based on RSI threshold breakouts. Specifically, it goes short when RSI breaks above overbought level, and goes long when RSI breaks below oversold level. It also forces exit after consecutive threshold breaks for a certain period.

The advantage of this strategy is utilizing both RSI for overbought/oversold and VWAP for price trend, which helps filter out false signals. But it also risks lagging in identifying trend reversals. Fine tuning RSI parameters and the consecutive breakout period can optimize the strategy.

In summary, the RSI breakout VWAP strategy combines multiple indicators to identify trading opportunities, but requires careful testing and tuning to adapt to different market conditions. Controlling risk is crucial in order to apply this strategy in the long run.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|RSI Length|
|v_input_2|30|RSI Oversold level|
|v_input_3|85|RSI Overbought level|
|v_input_4|28|Number of candles|
|v_input_5|true|Enter longs ?|
|v_input_6|true|Enter shorts ?|
|v_input_7|0.1|Amount of coin/token by position|
|v_input_8|2020|Strategy Start Year|
|v_input_9|7|Strategy Start Month|
|v_input_10|true|Strategy Start Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-04 00:00:00
end: 2023-09-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Mysteriown

//@version=4

strategy("RSI on VWAP Upgraded strategy", overlay=false, pyramiding = 3, commission_value = 0.04)
// pyramiding is the number of positions you can take before closing all of them (be carefull if using it with a trading bot)
// commission_value is the commission taken for each buy/sell



// ------------------------------------------ //
// ----------------- Inputs ----------------- //
// ------------------------------------------ //

length = input(20, title="RSI Length", type=input.integer)
ovrsld = input(30, "RSI Oversold level", type=input.float)
ovrbgt = input(85, "RSI Overbought level", type=input.float)
lateleave = input(28, "Number of candles", type=input.integer)
// lateleave : numbers of bars in overbought/oversold zones where the position is closed. The position is closed when this number is reached or when the zone is left (the first condition).

// best parameters BTCUSDTPERP M15 : 20 / 30 / 85 / 28


stratbull = input(title="Enter longs ?", type = input.bool, defval=true)
stratbear = input(title="Enter shorts ?", type = input.bool, defval=true)
bet = input(0.1, "Amount of coin/token by position", type=input.float)

stratyear = input(2020, title = "Strategy Start Year")
stratmonth = input(7, title = "Strategy Start Month")
stratday = input(1, title = "Strategy Start Day")
stratstart = timestamp(stratyear,stratmonth,stratday,0,0)


// ------------------------------------------ //
// ---------------- Rsi VWAP ---------------- //
// ------------------------------------------ //

rsiVWAP = rsi(vwap(close), length)


// ------------------------------------------ //
// ------------------ Plots ----------------- //
// ------------------------------------------ //

prsi = plot(rsiVWAP, color = rsiVWAP>ovrbgt ? color.red : rsiVWAP<ovrsld ? color.green : color.white, title="RSI on VWAP", linewidth=1, style=plot.style_line)
hline = plot(ovrbgt, color = color.gray, style=plot.style_line)
lline = plot(ovrsld, color = color.gray, style=plot.style_line)
fill(prsi,hline, color = rsiVWAP > ovrbgt ? color.red : na, transp = 30)
fill(prsi,lline, color = rsiVWAP < ovrsld ? color.green : na, transp = 30)


// ------------------------------------------ //
// ---------------- Positions --------------- //
// ------------------------------------------ //

if stratbull and time > stratstart
    strategy.entry("Long", true, bet, when = crossover(rsiVWAP, ovrsld), comment="")
    strategy.close("Long", when = crossover(rsiVWAP, ovrbgt)[lateleave] or crossunder(rsiVWAP, ovrbgt), comment="")

if stratbear and time > stratstart
    strategy.entry("Short", false, bet, when = crossunder(rsiVWAP, ovrbgt), comment="")
    strategy.close("Short", when = crossunder(rsiVWAP, ovrsld)[lateleave] or crossover(rsiVWAP, ovrsld), comment="")
```

> Detail

https://www.fmz.com/strategy/426355

> Last Modified

2023-09-11 14:13:35
