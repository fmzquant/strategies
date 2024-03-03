
> Name

Inverted-Hammer-Extended-Options

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|Downtrend EMA Threshold|
|v_input_float_1|2|Min Upper Wick X Body|
|v_input_float_2|20|Max Upper Wick X Body|
|v_input_float_3|true|Max Lower Wick X Body|
|v_input_float_4|2|Min Body % of Candle|
|v_input_bool_1|false|Positive Candles Only|
|v_input_bool_2|false|Broke Previous High|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
//@version=5

indicator("Inverted Hammer", overlay=true)

downtrend_threshold = input.int(10, "Downtrend EMA Threshold", minval=0, maxval=200, step=1, tooltip="Close must be below this EMA to be considered an inverted hammer in a downtrend")
upper_wick_min = input.float(2, "Min Upper Wick X Body", minval=2, maxval=20, step=1, tooltip="Upper wick must be this multiple of the body size or greater")
upper_wick_max = input.float(20, "Max Upper Wick X Body", minval=3, maxval=100, step=1, tooltip="Upper wick must be this multiple of the body size or less")
lower_wick_max = input.float(1, "Max Lower Wick X Body", minval=.25, maxval=10, step=.25, tooltip="Lower wick must be this multiple of the body size or less")
body_min = input.float(2, "Min Body % of Candle", minval=1, maxval=50, step=1, tooltip="Body must be at least this percent of the total candle range (high - low)")
up_only = input.bool(false, "Positive Candles Only", tooltip="The close must be higher than the previous close")
broke_high = input.bool(false, "Broke Previous High", tooltip="The high must be higher than the previous high")

bodyGreen = close > open

body = math.abs(close - open)
upper_wick = high - math.max(open, close)
lower_wick = math.min(open, close) - low

upper_wick_qualify =
 (body * upper_wick_min <= upper_wick) and
 (body * upper_wick_max >= upper_wick) and
 (not broke_high or high > high[1])

lower_wick_qualify =
 (lower_wick <= body * lower_wick_max)

body_qualify =
 (bodyGreen or not up_only) and
 (body > (body_min / 100 * (high - low))) and
 (downtrend_threshold == 0 or close < ta.ema(close, downtrend_threshold))

invertedHammer = body_qualify and upper_wick_qualify and lower_wick_qualify ? low : na

plot( invertedHammer  , title="Inverted hammer", style=plot.style_circles, linewidth=12,color=color.yellow)
if invertedHammer
   strategy.entry("buy", strategy.long)



```

> Detail

https://www.fmz.com/strategy/368717

> Last Modified

2022-06-12 14:15:53
