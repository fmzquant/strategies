
> Name

Dynamic-Stop-Loss-Bollinger-Bands-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e6a662d9005fbcf118.png)

## Overview
This strategy utilizes the upper and lower rails of Bollinger Bands to implement dynamic stop loss. It goes short when the price breaks through the upper rail and goes long when the price breaks through the lower rail. And it sets dynamic stop loss to track the price movement.

## Principle  
The core of this strategy lies in the upper and lower rails of Bollinger Bands. The middle rail is the n-day moving average. The upper rail is the middle rail + k*n-day standard deviation. The lower rail is the middle rail − k*n-day standard deviation. When the price bounces up from the lower rail, go long. When the price falls back from the upper rail, go short. At the same time, the strategy sets a stop loss point and dynamically adjusts it during the price movement to set a take profit point to implement prudent risk control.

## Advantages
1. Utilize Bollinger Bands' strong regression to middle rail characteristic to capture medium and long term trends; 
2. Clear long and short signals, easy to operate;
3. Set dynamic sliding stop loss to maximize profit locking and control risks;  
4. Adjustable parameters to adapt to different market conditions.

## Risks and Solutions
1. Bollinger Bands may generate multiple long and short signals during range-bound markets, causing users to be trapped in whipsaws. The solution is to reasonably set stop loss points to control per trade loss. 
2. Improper parameter settings may lead to lower win rate. The solution is to reasonably optimize parameters for different products. 

## Optimization Directions  
1. Optimize moving average parameters to adapt to product characteristics;
2. Add trend filtering to avoid range bound market;
3. Combine with other indicators as filtering conditions to improve strategy stability.

## Conclusion
This strategy utilizes Bollinger Bands' regression attributes along with dynamic sliding stop loss to obtain medium and long term trend profits while controlling risks. It is a highly adaptable and stable quantitative strategy. Through parameter optimization and logic optimization, it can be adapted to more products and obtain steady profits in live trading.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|(?Bollinger Bands)length|
|v_input_string_1|0|Basis MA Type: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|StdDev|
|v_input_int_2|false|Offset|
|v_input_bool_1|true|(?Strategy)Long|
|v_input_bool_2|true|Short|
|v_input_float_2|3|Target Multiplier (X)|
|v_input_string_2||(?AUTOMATION)Token|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-24 00:00:00
end: 2024-01-31 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(shorttitle="BB Strategy", title="Bollinger Bands Strategy", overlay=true)
length = input.int(20, minval=1, group = "Bollinger Bands")
maType = input.string("SMA", "Basis MA Type", options = ["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"], group = "Bollinger Bands")
src = input(close, title="Source", group = "Bollinger Bands")
mult = input.float(2.0, minval=0.001, maxval=50, title="StdDev", group = "Bollinger Bands")

ma(source, length, _type) =>
    switch _type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

basis = ma(src, length, maType)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev
offset = input.int(0, "Offset", minval = -500, maxval = 500, group = "Bollinger Bands")
plot(basis, "Basis", color=#FF6D00, offset = offset)
p1 = plot(upper, "Upper", color=#2962FF, offset = offset)
p2 = plot(lower, "Lower", color=#2962FF, offset = offset)
fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))

lo = input.bool(true, "Long", group = "Strategy")
sh = input.bool(true, "Short", group = "Strategy")
x = input.float(3.0, "Target Multiplier (X)", group = "Strategy", minval = 1.0, step = 0.1)
token = input.string(defval = "", title = "Token", group = "AUTOMATION")
Buy_CE = '{"auth-token":"' + token + '","key":"Value1","value":"' + str.tostring(1) + '"}'
Buy_PE = '{"auth-token":"' + token + '","key":"Value1","value":"' + str.tostring(2) + '"}'
Exit_CE = '{"auth-token":"' + token + '","key":"Value1","value":"' + str.tostring(-1) + '"}'
Exit_PE = '{"auth-token":"' + token + '","key":"Value1","value":"' + str.tostring(-2) + '"}'
Exit_PE_CE = '{"auth-token":"' + token + '","key":"Value1","value":"' + str.tostring(2.5) + '"}'
Exit_CE_PE = '{"auth-token":"' + token + '","key":"Value1","value":"' + str.tostring(1.5) + '"}'
long = high < lower
short = low > upper
var sl_b = 0.0
var tar_b = 0.0
var sl_s = 0.0
var tar_s = 0.0
var static_sl = 0.0
entry = strategy.opentrades.entry_price(strategy.opentrades - 1)
if long and lo and strategy.position_size == 0
    strategy.entry("Long", strategy.long, alert_message = Buy_CE, stop = high)
    strategy.exit("LX", "Long", profit = (math.abs(high - low) * x)/syminfo.mintick, stop = low, alert_message = Exit_CE)
    sl_b := low
    tar_b := high + (math.abs(high - low) * x)
    static_sl := math.abs(low - high)
if short and sh and strategy.position_size == 0
    strategy.entry("Short", strategy.short, alert_message = Buy_PE, stop = low)
    strategy.exit("SX", "Short", profit = (math.abs(high - low) * x)/syminfo.mintick, stop = high, alert_message = Exit_PE)
    sl_s := high
    tar_s := low - (math.abs(high - low) * x)
    static_sl := math.abs(high - low)
// if long and strategy.position_size < 0
//     strategy.entry("Long", strategy.long, alert_message = Exit_PE_CE, stop = high)
//     strategy.exit("LX", "Long", profit = (math.abs(high - low) * x)/syminfo.mintick, stop = low, alert_message = Exit_CE)
//     sl_b := low
//     tar_b := high + (math.abs(high - low) * x)
// if short and strategy.position_size > 0
//     strategy.entry("Short", strategy.short, alert_message = Exit_CE_PE, stop = low)
//     strategy.exit("SX", "Short", profit = (math.abs(high - low) * x)/syminfo.mintick, stop = high, alert_message = Exit_PE)
//     sl_s := math.max(high[1], high)
//     tar_s := low - (math.abs(high - low) * x)
if ta.change(dayofmonth) or (long[1] and not long[2])
    strategy.cancel("Long")
if ta.change(dayofmonth) or (short[1] and not short[2])
    strategy.cancel("Short")
var count = 1
if strategy.position_size != 0
    if strategy.position_size > 0
        if close > (entry + (static_sl * count))
            strategy.exit("LX", "Long", limit = tar_b, stop = sl_b, alert_message = Exit_CE)
            sl_b := entry + (static_sl * (count - 1))
            count += 1
            
    else
        if close < (entry - (static_sl * count))
            strategy.exit("SX", "Short", limit = tar_s, stop = sl_s, alert_message = Exit_PE)
            sl_s := entry - (static_sl * (count - 1))
            count += 1
// label.new(bar_index, high, str.tostring(static_sl))
if strategy.position_size == 0
    count := 1
plot(strategy.position_size > 0 ? sl_b : na, "", color.red, style = plot.style_linebr)
plot(strategy.position_size < 0 ? sl_s : na, "", color.red, style = plot.style_linebr)
plot(strategy.position_size > 0 ? tar_b : na, "", color.green, style = plot.style_linebr)
plot(strategy.position_size < 0 ? tar_s : na, "", color.green, style = plot.style_linebr)
```

> Detail

https://www.fmz.com/strategy/440686

> Last Modified

2024-02-01 10:48:52
