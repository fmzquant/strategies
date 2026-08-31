
> Name

基于相对成交量和趋势的交易策略Relative-Volume-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1724fca9b2447bf7efb.png)



## Overview

This strategy combines relative volume indicator and price action trend judgment to build an automated trading system integrating trend following and breakout. It buys when volume increases and volatility is low, and sells based on stop loss and price action. 

## How It Works

1. Use Bollinger Bands to determine if price volatility is low. Specifically by comparing ATR and BOLL band width.

2. Calculate the average volume of past N days, compare with current volume to see if volume has increased.

3. Buy when price is near low, volume increases and volatility is low.

4. Set stop loss, track lowest price.

5. Sell when price breaks below stop loss. 

6. Sell when price forms bullish engulfing pattern.

## Advantages

1. Combining volume and volatility filters false breakout effectively. 

2. Trailing stop loss locks in profit maximally.

3. Exit signals like bullish engulfing catch trend reversal early.

4. Intuitive and easy to follow.

5. Clear rules on stop loss and take profit reduce uncertainty.

## Risks

1. Volume indicator lags, could miss best entry point.

2. Exit signals like engulfing lack reliability, risks early exit.

3. Wider stop risks larger loss on single trade. 

4. Needs tuning of parameters like ATR period and volume period to avoid over trading.

5. Need to optimize exit rules to avoid unnecessary exit.

## Enhancement Opportunities 

1. Try additional filters like MACD to improve entry signals.

2. Optimize ATR and volume periods to reduce over trading.

3. Explore other exit signals like price breaking lower band. 

4. Research trailing stop loss to lock in more profit.

5. Test different holding periods for best performance.

6. Backtest on different products to find the best fit.

## Summary

The strategy is relatively simple, using volume and price action for trend following. It has clear signals and easy tracking. But the quality of filters and exit rules can be further improved for more reliable performance. With continued efforts on parameter tuning and entry/exit design, outstanding results could be achieved.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Apr 2016 13:30 +0000)|Backtest Start Time|
|v_input_2|false|Define backtest end-time (If false, will test up to most recent candle)|
|v_input_3|timestamp(01 May 2021 19:30 +0000)|Backtest End Time (if checked above)|
|v_input_4|10|Length of ATR [Trailing Stop Loss] (x2)|
|v_input_5|5|SMA(volume) length (for relative comparison)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-10 00:00:00
end: 2023-10-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © DojiEmoji (kevinhhl)

//@version=4
strategy("[KL] Relative Volume Strategy",overlay=true,pyramiding=1)
ENUM_LONG = "Long"
VERBOSE_MODE = false
opened_position = false

// Timeframe {
backtest_timeframe_start = input(defval = timestamp("01 Apr 2016 13:30 +0000"), title = "Backtest Start Time", type = input.time)
USE_ENDTIME = input(false,title="Define backtest end-time (If false, will test up to most recent candle)")
backtest_timeframe_end = input(defval = timestamp("01 May 2021 19:30 +0000"), title = "Backtest End Time (if checked above)", type = input.time)
within_timeframe = true
// }

// Volatility Indicators {
// BOLL:
BOLL_length = 20, BOLL_src = close, SMA20 = sma(BOLL_src, BOLL_length), BOLL_sDEV_x2 = 2 * stdev(BOLL_src, BOLL_length)
BOLL_upper = SMA20 + BOLL_sDEV_x2, BOLL_lower = SMA20 - BOLL_sDEV_x2
plot(SMA20, "Basis", color=#872323, offset = 0)
BOLL_p1 = plot(BOLL_upper, "BOLL Upper", color=color.navy, offset = 0, transp=50)
BOLL_p2 = plot(BOLL_lower, "BOLL Lower", color=color.navy, offset = 0, transp=50)
//fill(BOLL_p1, BOLL_p2, title = "Background", color=#198787, transp=85)
// ATR v. sDev of prices
ATR_x2 = atr(input(10,title="Length of ATR [Trailing Stop Loss] (x2)"))*2
//plot(SMA20+ATR_x2, "SMA20 + ATR_x2", color=color.gray, offset = 0, transp=50)
//plot(SMA20-ATR_x2, "SMA20 - ATR_x2", color=color.gray, offset = 0, transp=50)
//plotchar(ATR_x2, "ATR_x2", "", location = location.bottom)
is_low_volat = ATR_x2 > BOLL_sDEV_x2
// }

// Trailing stop loss {
TSL_source = low

var entry_price = float(0), var stop_loss_price = float(0)

TSL_line_color = color.green
if strategy.position_size == 0 or not within_timeframe
    TSL_line_color := color.black
    stop_loss_price := TSL_source - ATR_x2 
else if strategy.position_size > 0
    stop_loss_price := max(stop_loss_price, TSL_source - ATR_x2)
plot(stop_loss_price, color=TSL_line_color)

// }

// Relative volume indicator {
LEN_RELATIVE_VOL = input(5, title="SMA(volume) length (for relative comparison)")
relative_vol = sma(volume,LEN_RELATIVE_VOL)
// }

// price actions {
bar_range_ratio = abs(close-open)/(high-low)
engulfing = low < low[1] and high > high[1] and abs(close-open) > abs(close-open)[1]
// }

// MAIN:
if within_timeframe
	entry_msg = "", exit_msg = close <= entry_price ? "stop loss" : "take profit"

    // ENTRY :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	if close > open and volume > relative_vol and is_low_volat
		if strategy.position_size > 0
			entry_msg := "adding"
		else if strategy.position_size == 0
			entry_msg := "initial"

		if strategy.position_size == 0
			entry_price := close
			stop_loss_price := TSL_source - ATR_x2
			ATR_x2 := ATR_x2

		strategy.entry(ENUM_LONG, strategy.long, comment=entry_msg)

    // EXIT ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	if strategy.position_size > 0
		bExit = false		
		// EXIT: Case (A) touches trailing stop loss
		if TSL_source <= stop_loss_price
			exit_msg := exit_msg + "[TSL]"
			bExit := true
		// EXIT: Case (B)
		else if close < open and not is_low_volat and engulfing and (high-low) > ATR_x2
			exit_msg := VERBOSE_MODE ? exit_msg + "[engulfing bearish]" : exit_msg
			bExit := true
        strategy.close(ENUM_LONG, when=bExit, comment=exit_msg)

// CLEAN UP:
if strategy.position_size == 0
	entry_price := 0
	stop_loss_price := float(0)

```

> Detail

https://www.fmz.com/strategy/429495

> Last Modified

2023-10-17 16:19:59
