
> Name

Trading-Strategy-of-Short-Selling-When-Bollinger-Band-Crosses-Below-Price-with-RSI-Callback

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e17f21ce7be297193a.png)

## Overview  

This strategy utilizes Bollinger Bands to determine if price has entered the overbought area and combines RSI indicator to identify callback opportunities. It goes short when a death cross is formed in the overbought area and stops out when price rises back above the Bollinger Upper Band.

## Trading Principles

The strategy is based on the following principles:

1. When close price crosses above Bollinger Upper Band, it indicates the asset has entered overbought territory and a callback is likely  
2. RSI indicator effectively determines overbought/oversold levels. RSI > 70 is considered overbought
3. Go short when close price crosses below Upper Band
4. Close position when RSI pulls back from overbought zone or stop loss is triggered

## Advantage Analysis

Advantages of this strategy:

1. Bollinger Bands determine overbought/oversold levels accurately, improving trade success rate
2. RSI filters out false breakout signals, avoiding unnecessary losses
3. High risk to reward ratio obtained by effectively controlling risk

## Risk Analysis  

Risks in this strategy:

1. Price may continue going up after breaking above Upper Band, leading to further losses
2. Failure of timely RSI pullback results in loss amplification 
3. Unidirectional short position leaves no room for trading in consolidation

Risks can be minimized by:

1. Adjusting stop loss properly for timely stop out
2. Adding indicators to confirm RSI callback
3. Using moving averages to determine consolidation

## Optimization Directions

This strategy can be improved on:  

1. Optimizing Bollinger parameters for more assets
2. Fine tuning RSI parameters for better signals
3. Adding more indicators to pinpoint trend reversal points
4. Incorporating long trade logic
5. Implement dynamic stop loss based on volatility

## Conclusion

In summary, this is a typical overbought quick short scalping strategy. It capitalizes on Bollinger Bands for trade entries and RSI to filter signals. Risk is managed through prudent stop loss placement. Further enhancements can come from parameter tuning, adding indicators, expanding trade logic etc.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Date Range|
|v_input_int_1|20|length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|StdDev|
|v_input_int_2|false|Offset|
|v_input_float_2|3|Trail Long Loss (%)|
|v_input_float_3|3|Trail Short Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-01 00:00:00
end: 2023-11-30 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule


strategy("Bollinger Band Below Price with RSI",
         overlay=true,
         initial_capital=1000,
         process_orders_on_close=true,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=70,
         commission_type=strategy.commission.percent,
         commission_value=0.1)

showDate = input(defval=true, title='Show Date Range')
timePeriod = time >= timestamp(syminfo.timezone, 2022, 1, 1, 0, 0)
notInTrade = strategy.position_size <= 0

//Bollinger Bands Indicator
length = input.int(20, minval=1)
src = input(close, title="Source")
mult = input.float(2.0, minval=0.001, maxval=50, title="StdDev")
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev
offset = input.int(0, "Offset", minval = -500, maxval = 500)
plot(basis, "Basis", color=#FF6D00, offset = offset)
p1 = plot(upper, "Upper", color=#2962FF, offset = offset)
p2 = plot(lower, "Lower", color=#2962FF, offset = offset)
fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))

// RSI inputs and calculations
lengthRSI = 14
RSI = ta.rsi(close, lengthRSI)



// Configure trail stop level with input options
longTrailPerc = input.float(title='Trail Long Loss (%)', minval=0.0, step=0.1, defval=3) * 0.01
shortTrailPerc = input.float(title='Trail Short Loss (%)', minval=0.0, step=0.1, defval=3) * 0.01

// Determine trail stop loss prices
//longStopPrice = 0.0
shortStopPrice = 0.0

//longStopPrice := if strategy.position_size > 0
    //stopValue = close * (1 - longTrailPerc)
    //math.max(stopValue, longStopPrice[1])
//else
    //0

shortStopPrice := if strategy.position_size < 0
    stopValue = close * (1 + shortTrailPerc)
    math.min(stopValue, shortStopPrice[1])
else
    999999


//Entry and Exit
strategy.entry(id="short", direction=strategy.short, when=ta.crossover(close, upper) and RSI < 70 and timePeriod and notInTrade)

if (ta.crossover(upper, close) and RSI > 70 and timePeriod)
    strategy.exit(id='close', limit = shortStopPrice)










```

> Detail

https://www.fmz.com/strategy/436618

> Last Modified

2023-12-26 12:08:44
