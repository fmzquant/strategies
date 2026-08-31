
> Name

Ichimoku-Backtester-with-TP-SL-and-Cloud-Confirmation

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c483369670e6628319.png)

### Overview

This is an Ichimoku backtesting strategy with take profit, stop loss and cloud confirmation. It aims to improve profitability by precisely capturing trends using the Ichimoku indicator.  

### Strategy Logic  

The core of this strategy is constructing the Ichimoku components based on user input parameters - Tenkan-Sen, Kijun-Sen, Senkou Span A & B and Chikou Span. It identifies bullish (long) and bearish (short) signals when price crosses these equilibrium lines.

In addition, it implements stop loss and take profit based on entry price to manage risk & reward. There is also an option to wait for cloud confirmation, i.e. Senkou Span A > B for longs and Senkou Span A < B for shorts. This helps avoid false breakouts.

### Advantages

The main advantages of this strategy are three-fold:

1. Ichimoku is good at identifying trends and momentum. The equilibrium lines provide solid support and resistance areas.

2. The stop loss and take profit features maximize reward while minimizing risk. This optimizes the risk-return profile.

3. Cloud confirmation filters out false signals, ensuring high-probability entries. This enhances profitability.

### Risks  

However, there are also a few key risks to consider:

1. Ichimoku is prone to whipsaws during range-bound markets with no clear trend. Lots of stops may be hit.

2. The cloud is a lagging indicator. By the time there is cloud confirmation, much of the move may have occurred already.   

3. Optimizing stop loss and take profit levels is challenging and sensitive. Suboptimal parameters may result in more losses.

### Enhancements

Some ways this strategy can be improved:

1. Combine Ichimoku with leading indicators like RSI for additional confirmation and early entry. 

2. Adaptively adjust stop loss and take profit based on volatility instead of using fixed percentages.

3. Test optimal parameters across various assets and timeframes to identify best setups for strategy.

4. Incorporate machine learning to continually optimize parameters and strategy rules based on updated data.

### Conclusion  

This is a solid Ichimoku system with good trend capture and risk management features. With some enhancements, it can be an excellent addition to overall trading approach. It works well across forex, commodities and cryptocurrency markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Tenkan-Sen Bars|
|v_input_2|26|Kijun-Sen Bars|
|v_input_3|52|Senkou-Span B Bars|
|v_input_4|26|Chikou-Span Offset|
|v_input_5|26|Senkou-Span Offset|
|v_input_6|true|Long Entry|
|v_input_7|true|Short Entry|
|v_input_8|true|Wait for Cloud Confirmation|
|v_input_9|true|Use Short Stop Loss|
|v_input_10|5|Short Stop Loss (%)|
|v_input_11|true|Use Long Stop Loss|
|v_input_12|5|Long Stop Loss (%)|
|v_input_13|true|Use Short Take Profit|
|v_input_14|20|Short Take Profit (%)|
|v_input_15|true|Use Long Take Profit|
|v_input_16|20|Long Take Profit (%)|
|v_input_17|false|Show Date Range|
|v_input_18|true|From Month|
|v_input_19|true|From Day|
|v_input_20|2020|From Year|
|v_input_21|true|Thru Month|
|v_input_22|true|Thru Day|
|v_input_23|2112|Thru Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-17 00:00:00
end: 2023-11-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

strategy("Ichimoku Backtester with TP and SL", overlay=true, 
     currency = currency.USD, default_qty_type = strategy.percent_of_equity, 
     default_qty_value = 95)
//@version=4

//Inputs
ts_bars = input(9, minval=1, title="Tenkan-Sen Bars")
ks_bars = input(26, minval=1, title="Kijun-Sen Bars")
ssb_bars = input(52, minval=1, title="Senkou-Span B Bars")
cs_offset = input(26, minval=1, title="Chikou-Span Offset")
ss_offset = input(26, minval=1, title="Senkou-Span Offset")
long_entry = input(true, title="Long Entry")
short_entry = input(true, title="Short Entry")

wait_for_cloud = input(true, title="Wait for Cloud Confirmation")

use_short_stop_loss = input(true, title="Use Short Stop Loss")
short_stop_loss = input(title="Short Stop Loss (%)", type=input.float, minval=0.0, step=0.1, 
     defval=5) * 0.01
use_long_stop_loss = input(true, title="Use Long Stop Loss")
long_stop_loss = input(title="Long Stop Loss (%)", type=input.float, minval=0.0, step=0.1, 
     defval=5) * 0.01
     
use_short_take_profit = input(true, title="Use Short Take Profit")
short_take_profit = input(title="Short Take Profit (%)", type=input.float, minval=0.0, step=0.1,
     defval = 20) * .01
use_long_take_profit = input(true, title="Use Long Take Profit")
long_take_profit = input(title="Long Take Profit (%)", type=input.float, minval=0.0, step=0.1,
     defval = 20) * .01

// === INPUT SHOW PLOT ===
showDate  = input(defval = false, title = "Show Date Range", type = input.bool)

// === INPUT BACKTEST RANGE ===
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2020, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)



// === FUNCTION EXAMPLE ===
start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false       // create function "within window of time"

middle(len) => avg(lowest(len), highest(len))

// Ichimoku Components
tenkan = middle(ts_bars)
kijun = middle(ks_bars)
senkouA = avg(tenkan, kijun)
senkouB = middle(ssb_bars)

bgcolor(color = showDate and window() ? color.gray : na, transp = 90)  // plot within time window

// Plot Ichimoku Kinko Hyo
plot(tenkan, color=#0496ff, title="Tenkan-Sen")
plot(kijun, color=#991515, title="Kijun-Sen")
plot(close, offset=-cs_offset+1, color=#459915, title="Chikou-Span")
sa=plot(senkouA, offset=ss_offset-1, color=color.green, title="Senkou-Span A")
sb=plot(senkouB, offset=ss_offset-1, color=color.red, title="Senkou-Span B")
fill(sa, sb, color = senkouA > senkouB ? color.green : color.red, title="Cloud color")

ss_high = max(senkouA[ss_offset-1], senkouB[ss_offset-1])
ss_low = min(senkouA[ss_offset-1], senkouB[ss_offset-1])

// Entry/Exit Signals
tk_cross_bull = tenkan > kijun
tk_cross_bear = tenkan < kijun
cs_cross_bull = mom(close, cs_offset-1) > 0
cs_cross_bear = mom(close, cs_offset-1) < 0
price_above_kumo = close > ss_high
price_below_kumo = close < ss_low
senkou_green = senkouA > senkouB ? true : false

bullish = tk_cross_bull and cs_cross_bull and price_above_kumo
bearish = tk_cross_bear and cs_cross_bear and price_below_kumo

if (wait_for_cloud)
    bullish := bullish and senkou_green
    bearish := bearish and not senkou_green

longStopPrice  = strategy.position_avg_price * (1 - long_stop_loss)
shortStopPrice = strategy.position_avg_price * (1 + short_stop_loss)
longLimitPrice = strategy.position_avg_price * (1 + long_take_profit)
shortLimitPrice = strategy.position_avg_price * (1 - short_take_profit)

in_long = false
in_long := in_long[1]


open_long = bullish and not in_long
open_short = bearish and in_long


if (open_long)
    in_long := true
if (open_short)
    in_long := false

strategy.entry("Long", strategy.long, when=open_long and long_entry and  (showDate ? window() : true))
strategy.entry("Short", strategy.short ,when=open_short and short_entry and (showDate ? window() : true))

if (strategy.position_size > 0.0)
    if (use_long_stop_loss and not use_long_take_profit)
        strategy.exit("Long", stop = longStopPrice)
    if (use_long_take_profit and not use_long_stop_loss)
        strategy.exit("Long", limit = longLimitPrice)
    if (use_long_take_profit and use_long_stop_loss)
        strategy.exit("Long", stop = longStopPrice, limit=longLimitPrice)
if (strategy.position_size < 0.0)
    if (use_short_stop_loss and not use_short_take_profit)
        strategy.exit("Short", stop = shortStopPrice)
    if (use_short_take_profit and not use_short_stop_loss)
        strategy.exit("Short", limit = shortLimitPrice)
    if (use_short_take_profit and use_short_stop_loss)
        strategy.exit("Short", stop = shortStopPrice, limit = shortLimitPrice)

strategy.close("Long", when=bearish and not short_entry and (showDate ? window() : true))
strategy.close("Short", when=bullish and not long_entry and (showDate ? window() : true))

```

> Detail

https://www.fmz.com/strategy/433148

> Last Modified

2023-11-24 17:32:47
