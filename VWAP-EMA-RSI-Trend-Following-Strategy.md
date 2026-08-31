
> Name

VWAP-EMA-RSI-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy combines VWAP, EMA and RSI for trend bias and follows trends using a trailing stop approach. It aims to ride trends with adaptive exits.

Strategy Logic:

1. Calculate VWAP as fair value benchmark. 

2. Compute 15-period EMA as intermediate-term trend indicator.

3. Use RSI to identify overbought levels, RSI above threshold signals bullishness.

4. Enter long when close exceeds VWAP and EMA, and RSI overbought.

5. Set trailing stop loss line certain percentage below entry point. 

6. Take fixed profit at set point level to lock in gains.

Advantages:

1. VWAP, EMA and RSI improve entry accuracy from multiple aspects.

2. Trailing stop moves dynamically to protect profits.

3. Fixed profit-taking provides certainty in exiting.

Risks:

1. RSI and EMA prone to false signals during ranges.

2. Stop loss calibration requires prudence, too wide or too narrow problematic.

3. No limit on single trade loss size.

In summary, this strategy combines multiple indicators and uses a trailing stop for trend following. It performs well in sustained trends but requires optimization and risk controls.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|15|EMA Length|
|v_input_int_2|14|RSI Length|
|v_input_int_3|45|RSI Overbought Level|
|v_input_float_1|0.5|Stop Loss %|
|v_input_float_2|3.5|Take Profit %|
|v_input_float_3|true|Trailing Stop %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-12 00:00:00
end: 2023-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("VWAP+15EMA with RSI", overlay=true)

// Inputs
ema_length = input.int(15, title="EMA Length")
rsi_length = input.int(14, title="RSI Length")
rsi_overbought = input.int(45, title="RSI Overbought Level")
stop_loss_pct = input.float(0.5, title="Stop Loss %")
take_profit_pct = input.float(3.5, title="Take Profit %")
trailing_stop_pct = input.float(1, title="Trailing Stop %")

// Calculate Indicators
vwap = ta.vwap(hlc3)
ema = ta.ema(close, ema_length)
rsi = ta.rsi(close, rsi_length)

// Entry Condition
long_entry = close > vwap and close > ema and rsi > rsi_overbought

// Exit Conditions
stop_loss = strategy.position_avg_price * (1 - stop_loss_pct / 100)
take_profit = strategy.position_avg_price * (1 + take_profit_pct / 100)
trailing_stop = strategy.position_avg_price * (1 - trailing_stop_pct / 100)

// Submit Orders
if long_entry and strategy.position_size == 0
    strategy.entry("Long", strategy.long)

if strategy.position_size > 0
    strategy.exit("Stop Loss /Profit", "Long", profit = take_profit, stop=stop_loss, trail_offset = trailing_stop)


// Plot Indicators
plot(vwap, title="VWAP", color=color.blue)
plot(ema, title="EMA", color=color.orange)
plot(rsi, title="RSI", color=color.purple)
hline(rsi_overbought, title="RSI Overbought", color=color.red)

```

> Detail

https://www.fmz.com/strategy/426578

> Last Modified

2023-09-13 14:37:47
