
> Name

捕捉小趋势的高低均线交叉策略HLHB-Trend-Catcher-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview 

The strategy aims to catch short-term forex trends by using EMA crossover and RSI as trading signals, with ADX filter to enter trades, and trailing stop loss to lock in profits. The strategy can be applied to all currency pairs, but is mainly used on 1-hour charts of major pairs.

## Strategy Logic

The strategy is based on the following indicators and conditions to generate trading signals:

- 5-period fast EMA: blue line  
- 10-period slow EMA: red line
- 10-period RSI applied to median price (H+L)/2
- 14-period ADX

Entry signals:
- Long: when fast EMA crosses above slow EMA from below and RSI crosses above 50 from bottom
- Short: when fast EMA crosses below slow EMA from top and RSI crosses below 50 from top
- Only take signals when ADX > 25

Exit signals:  
- Use trailing stop loss, 150 pips trail distance and 400 pips take profit
- Close trade when new signal occurs
- Close all trades before end of week

The strategy combines EMA crossover, RSI overbought/oversold and ADX trend strength to create solid entry rules. It rides the trend after formation and uses trailing stop to maximize profits and control risk. Overall it aims to effectively catch short-term trends.

## Advantage Analysis

The strategy has the following advantages:

1. EMA crossover for trend direction. Upward cross suggests uptrend while downward cross downtrend. Can identify trend changes.

2. Adding RSI filters out some false breakout signals. Oversold/overbought zones indicate short-term pullbacks and avoid unnecessary entries in range markets.

3. ADX for ensuring true trend existence. Only consider trading signals when ADX > 25, guaranteeing a solid trend. 

4. Trailing stop loss and take profit let profits run while controlling risk. 150 pips trail distance and 400 pips profit target continuously ride the trend.

5. Closing all positions before week end avoids weekend risks and enforces trading regularity.

## Risk Analysis

The strategy also has the following risks:

1. EMA crossover systems prone to false breakout signals, leading to losses. Fine tune EMA lengths or add other filters.

2. RSI only identifies overbought/oversold levels, not trend reversals. Could miss trends or reverse. Combine with other indicators.

3. ADX just judges trend existence, entry timing may be off. Add other rules or lower ADX threshold.

4. Fixed stop loss and take profit levels may not adapt to market changes. Test different parameters or manual intervention. 

5. Forced weekly close could miss good trend opportunities. Consider daily close or conditional exits.

## Optimization Directions 

The strategy can be optimized in the following aspects:

1. Test different EMA combinations to find optimal lengths. Consider slope for added trend strength.

2. Try different RSI parameters or combine with KDJ for better overbought/oversold judgment.

3. Optimize ADX parameters for more suitable filtering and higher entry quality.

4. Test combination of fixed stops and ATR-based dynamic trailing.

5. Add intraday breakout pullback entries after trend confirmation, such as lower timeframes. 

6. Introduce volatility-based position sizing for dynamic adjustment based on market volatility.

7. Explore machine learning techniques to auto-optimize parameters for adaptability.

## Summary

In summary this is a simple trend following strategy, identifying trend direction with EMA crossover, filtering with RSI, requiring trend with ADX, and trailing stop for profit. Optimization mainly involves finding better indicator combos for flexibility, and adding dynamic position sizing. The logic has merit but still requires further testing and optimization for practical application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Fast EMA Length|
|v_input_2|10|Slow EMA Length|
|v_input_3|10|Slow EMA Length|
|v_input_4|16|Weekly Session End (Hour)|
|v_input_5|false|Weekly Session End (Minute)|
|v_input_6|400|Profit Target (Pips/Points)|
|v_input_7|150|Trailing Stop Distance (Pips/Points)|
|v_input_8|true|User ADX Filter|
|v_input_9|25|Minimum ADX Level|
|v_input_10|14|ADX Smoothing|
|v_input_11|14|DI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Hucklekiwi Pip - HLHB Trend-Catcher System", shorttitle="HLHB TCS", overlay=true,
  default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// -----------------------------------------------------------------------------
// HLHB Trend-Catcher System as described on BabyPips.com
//
// Strategy Author: Hucklekiwi Pip 
// Coded By: Backtest Rookies
// -----------------------------------------------------------------------------
//
// Refs:
//   - Original System: https://www.babypips.com/trading/forex-hlhb-system-explained
//   - Updated System: https://www.babypips.com/trading/forex-hlhb-system-20190311
//
//
// Description (From Hucklekiwi Pip)
// 
//   The HLHB System simply aims to catch short-term forex trends.
//   It is patterned after the Amazing Crossover System that Robopip once backtested.
//   In fact, it was one of his highest-scoring mechanical systems in 2014! 
//   The system can be applied to any pair, but since I’m into major pairs, 
//   I’m applying it to the 1-hour charts of EUR/USD and GBP/USD.
// -----------------------------------------------------------------------------
// STRATEGY REQUIREMENTS
// -----------------------------------------------------------------------------
//
// Setup
// -----
//  - EUR/USD 1-hour chart
//  - GBP/USD 1-hour chart
//  - 5 EMA: blue line
//  - 10 EMA: red line
//  - RSI (10) applied to the median price (HL/2)
//  - ADX (14)
//
// Entry
// -----
//  - BUY when the 5 EMA crosses above the 10 EMA from underneath and the RSI 
//    crosses above the 50.0 mark from the bottom.
//  - SELL when the 5 EMA crosses below the 10 EMA from the top and the RSI 
//    crosses below the 50.0 mark from the top.
//  - Make sure that the RSI did cross 50.0 from the top or bottom and not just 
//    ranging tightly around the level.
//  - ADX > 25 for Buy and Sells
//
// Exit
// ----
//  - Use a 50-pip trailing stop and a 200-pip profit target. This increases the 
//    chances of the system riding longer trends.
//  - Close the trade when a new signal materializes.
//  - Close all trades by the end of the week.
// 
// -----------------------------------------------------------------------------

// Strategy Varaibles
// -------------------
ema_fast_len = input(5, title='Fast EMA Length')
ema_slow_len = input(10 , title='Slow EMA Length')
rsi_len = input(10, title='Slow EMA Length')
session_end_hour = input(16, minval=0, maxval=23, title='Weekly Session End (Hour)')
session_end_minute = input(0, minval=0, maxval=59, title='Weekly Session End (Minute)')
// Targets taken from the update post which states 150 & 400 instead of 50 and 200.
profit_target = input(400, title='Profit Target (Pips/Points)')
trailing_stop_dist = input(150, title='Trailing Stop Distance (Pips/Points)')
adx_filt = input(true, title='User ADX Filter')
adx_min = input(25, minval=0, title='Minimum ADX Level')
adx_len = input(14, title="ADX Smoothing")
di_len = input(14, title="DI Length")

// Setup the Indicators
ema_fast = ema(close, ema_fast_len)
ema_slow = ema(close, ema_slow_len)
rsi_ind = rsi(close, rsi_len)

// ADX
adx_dirmov(len) =>
	up = change(high)
	down = -change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
    minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(plusDM, len) / truerange)
	minus = fixnan(100 * rma(minusDM, len) / truerange)
	[plus, minus]

adx_adx(dilen, adxlen) =>
	[plus, minus] = adx_dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
	[adx, plus, minus]

[adx_sig, adx_plus, adx_minus] = adx_adx(di_len, adx_len)


// Strategy Logic
ema_long_cross = crossover(ema_fast, ema_slow)
ema_short_cross = crossunder(ema_fast, ema_slow)
rsi_long_cross = crossover(rsi_ind, 50)
rsi_short_cross = crossunder(rsi_ind, 50)
adx_check = adx_filt ? adx_sig >= adx_min : true

longCondition = ema_long_cross and rsi_long_cross and adx_check
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = ema_short_cross and rsi_short_cross and adx_check
if (shortCondition)
    strategy.entry("Short", strategy.short)

strategy.exit("SL/TP", "Long", profit=profit_target,  loss=trailing_stop_dist, trail_points=trailing_stop_dist)  
strategy.exit("SL/TP", "Short", profit=profit_target, loss=trailing_stop_dist, trail_points=trailing_stop_dist)  

// Friday = 6
// If we miss the hour for some reason (due to strange timeframe), then close immediately
// Else if we are on the closing hour, then check to see if we are on or passed the close minute
close_time = dayofweek == 6 ? 
  hour[0] > session_end_hour ? true :
  hour[0] == session_end_hour ?
      minute[0] >= session_end_minute :
  false : false

strategy.close_all(when=close_time)

// Plotting
plot(ema_fast, color=blue, title="Fast EMA")
plot(ema_slow, color=red, title="Slow EMA")

plotshape(rsi_long_cross, style=shape.triangleup, size=size.tiny, location=location.belowbar, color=green, title='RSI Long Cross Marker')
plotshape(rsi_short_cross, style=shape.triangledown, size=size.tiny, location=location.abovebar, color=red, title='RSI Short Cross Marker')

// ADX Filter Highlight
bgcolor(adx_filt and adx_check ? orange : na, transp=90)
```

> Detail

https://www.fmz.com/strategy/428067

> Last Modified

2023-09-28 11:44:04
