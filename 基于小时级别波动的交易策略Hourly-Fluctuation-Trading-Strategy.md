
> Name

基于小时级别波动的交易策略Hourly-Fluctuation-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy targets SPY to trade hourly fluctuations for short-term reversals. It belongs to short-term trading strategies.

## Strategy Logic

1. 5-day and 13-day MA crossovers determine hourly price reversals. 

2. Requires RSI above 50 for MA crossover buy signals.

3. 13-day MA crossover below 5-day MA, and MACD line crossover below signal line generate sell signals.

4. Stop loss and take profit lines are set, with partial profit taking at 2x target.

5. Option to trade short side after completing current round.

6. Customizable parameters like MA periods, stop/profit ratios etc.

## Advantages

1. Captures short-term trades from hourly price changes.

2. Multi-indicator combo improves signal accuracy. 

3. Stop and profit setups aid in risk management.

4. Partial profits help lock in gains.

5. Customizable parameters suit short-term traders.

## Risks

1. Hourly fluctuations may cause false signals and losses.

2. Improper stop/profit ratios lead to premature exit or overholding.

3. Parameters need optimization for some symbols. 

4. Optimization risks overfitting. 

5. High trading frequency increases transaction costs.

## Enhancement

1. Test parameter combinations to find optimum.

2. Evaluate additional indicators to confirm signals.

3. Optimize stops and targets for risk-return balance.

4. Add trend filter to avoid counter-trend trades.

5. Relax partial profit conditions for extended gains.

6. Assess other suitable symbols for the strategy.

## Conclusion

This strategy aims to capture SPY’s short-term hourly opportunities. Refining it via optimization, filtering etc. can enhance reliability into an effective short-term system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|Include Short Trades!|
|v_input_float_1|0.02|Input Stop Loss Percentage (0.02 = 2%)|
|v_input_float_2|0.03|Input Take Profit Percentage (0.03 = 3%)|
|v_input_int_1|50|Partial Profit Percentage in whole numbers (50 is 50%)|
|v_input_int_2|5|Fast EMA Period|
|v_input_int_3|13|Slow EMA Period|
|v_input_int_4|14|RSI Length|
|v_input_int_5|8|MACD Fast Length|
|v_input_int_6|21|MACD Slow Length|
|v_input_int_7|5|MACD Signal Length|
|v_input_int_8|14|ADX Length|
|v_input_int_9|14|Stochastic Length|
|v_input_int_10|3|Stoicastic Smooth K|
|v_input_1_close|0|Stoicastic Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
//@version=5
strategy(title="SPY 1 Hour Swing Trader", initial_capital=300000, default_qty_type=strategy.percent_of_equity, default_qty_value=15, pyramiding=0, commission_type=strategy.commission.cash_per_order, commission_value=0, overlay=true, calc_on_every_tick=false, process_orders_on_close=true, max_labels_count=500)

//The purpose of this script is to spot 1 hour pivots that indicate ~5 to 6 trading day swings.
//Results indicate that swings are held approximately 5 to 6 trading days on average, over the last 6 years.
//This indicator spots a go long opportunity when the 5 ema crosses the 13 ema on the 1 hour along with the RSI > 50.
//It also spots uses a couple different means to determine when to exit the trade. Sell condition is 
//primarily when the 13 ema crosses the 5 ema and the MACD line crosses below the signal line and
//the smoothed Stoichastic appears oversold (greater than 60). Stop Losses and Take Profits are configurable
//in Inputs along with ability to include short trades plus other MACD and Stoichastic settings.
//If a stop loss is encountered the trade will close. Also once twice the expected move is encountered
//partial profits will taken and stop losses and take profits will be re-established based on most recent close
//Once long trades are exited, short trades will be initiated if recent conditions appeared oversold and
//input option for short trading is enabled. If trying to use this for something other than SPXL it is best
//to update stop losses and take profit percentages and check backtest results to ensure proper levels have
//been selected and the script gives satisfactory results.

// Initialize variables
var float long_entry_price = na
var float short_entry_price = na
var float stop_loss = na
var float take_profit = na
var float twoxtake_profit = na
var float short_stop_loss = na
var float short_take_profit = na
var float short_twoxtake_profit = na
var int startshort = 0

// Inputs
short = input.bool(true, "Include Short Trades!")
option_SL_P = input.float(0.02, "Input Stop Loss Percentage (0.02 = 2%)")
option_TP_P = input.float(0.03, "Input Take Profit Percentage (0.03 = 3%)")
pp = input.int(50, "Partial Profit Percentage in whole numbers (50 is 50%)")
ema5 = input.int(5, "Fast EMA Period", minval=1)
ema13 = input.int(13, "Slow EMA Period", minval=1)
rsi_length = input.int(14, "RSI Length", minval=1)
macd_fast_length = input.int(8, "MACD Fast Length", minval=1)
macd_slow_length = input.int(21, "MACD Slow Length", minval=1)
macd_signal_length = input.int(5, "MACD Signal Length", minval=1)
len = input.int(14, title="ADX Length", minval=1)
length = input.int(14, "Stochastic Length")
smoothK = input.int(3, "Stoicastic Smooth K")
src = input(close, "Stoicastic Source")

// Calculating EMA 
ema_13 = ta.ema(close, ema13)
ema_5 = ta.ema(close, ema5)

// Calculate RSI
rsi = ta.rsi(close, rsi_length)
smooth_rsi = ta.ema(rsi, 5)

// Calculate MACD
[macd_line, signal_line, _] = ta.macd(close, macd_fast_length, macd_slow_length, macd_signal_length)

// Calculate the True Range
tr = ta.tr(true)

// Calculate slope of MACD line
rsiSlope = (smooth_rsi - smooth_rsi[3]) / (bar_index - bar_index[3])

// Calculate the Directional Movement
up = ta.change(high)
down = -ta.change(low)
plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)

// Calculate the Smoothed Directional Movement
plusDI = 100 * ta.ema(plusDM, len) / ta.ema(tr, len)
minusDI = 100 * ta.ema(minusDM, len) / ta.ema(tr, len)

// Calculate the Directional Index (DX)
DX = 100 * math.abs(plusDI - minusDI) / (plusDI + minusDI)

// Calculate the ADX
adx = ta.ema(DX, len)

//Stochastic Calculation
highestHigh = ta.highest(src, length)
lowestLow = ta.lowest(src, length)
k = 100 * ((src - lowestLow) / (highestHigh - lowestLow))
d = ta.sma(k, smoothK)

// Determine current VIX
vixClose = request.security("VIX", timeframe.period, close[3])
//plot(vixClose, title="VIX Close", color=color.red)

// Buy and Sell Conditions
buy_condition = ta.crossover(ema_5 , ema_13) and rsi > 50
sell_condition = ema_13 > ema_5 and macd_line < signal_line and (d > 60)

// Plotting indicators
plot(ema_13, color=color.orange, title="Slow EMA Period")
plot(ema_5, color=color.blue, title="Fast EMA Period")

// Executing trades
if buy_condition and strategy.position_size == 0 and barstate.isconfirmed
    strategy.entry("Pivot Up", strategy.long, alert_message = "Pivoting Up")
    long_entry_price := close
    stop_loss := long_entry_price - (option_SL_P * close)
    take_profit := long_entry_price + (option_TP_P * close)
    twoxtake_profit := long_entry_price + (2 * option_TP_P * close)

if strategy.position_size > 0 and barstate.isconfirmed
    if close < stop_loss and barstate.isconfirmed
        strategy.close("Pivot Up", "Exit Longs Stopped")
        if short == 1 
            startshort := 1
    else if sell_condition and barstate.isconfirmed
        if short == 1
            startshort := 1
        strategy.close("Pivot Up", "Exit Longs Sell Condition Met")
    else if close >= twoxtake_profit and barstate.isconfirmed
        stop_loss := close - (.5*option_TP_P*close)
        take_profit := close + (.5*option_TP_P*close)
        strategy.exit("Exit Partial Longs", "Pivot Up", stop=stop_loss, limit = take_profit, qty_percent = pp)

if startshort == 1
    if (d[6] > 80) and barstate.isconfirmed
        strategy.entry("Pivot Down", strategy.short, alert_message = "Pivoting Down")
        short_entry_price := close
        short_stop_loss := short_entry_price + (option_SL_P * close)
        short_take_profit := short_entry_price - (option_TP_P * close)
        short_twoxtake_profit := short_entry_price - (2 * option_TP_P * close)
        startshort := 0
    else
        startshort := 0

if strategy.position_size < 0 and barstate.isconfirmed
    if close > short_stop_loss and barstate.isconfirmed
        strategy.close("Pivot Down", "Exit Shorts Stopped")
    else if close <= short_twoxtake_profit and barstate.isconfirmed
        short_stop_loss := close + (.5*option_TP_P*close)
        short_take_profit := close - (.5*option_TP_P*close)
        strategy.exit("Exit Partial Shorts", "Pivot Down", stop=short_stop_loss, limit = short_take_profit, qty_percent = pp)
```

> Detail

https://www.fmz.com/strategy/427392

> Last Modified

2023-09-20 16:50:27
