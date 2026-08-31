
> Name

Momentum-Breakout-Strategy-435272

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/106404832ce3f716d9e.png)

## Overview

This strategy combines moving average, Laguerre RSI indicator and ADX indicator to implement breakout trading. It goes long when the fast moving average crosses above the slow moving average, Laguerre RSI is greater than 80, and ADX is greater than 20; it goes short when the fast moving average crosses below the slow moving average, Laguerre RSI is less than 20, and ADX is greater than 20. This strategy captures the momentum characteristics of the market and enters the market at the beginning of trend development.  

## Principle  

The strategy mainly uses the following indicators to determine trends and entry timing:

1. Moving average combination: 16-day EMA, 48-day EMA, 200-day SMA. An uptrend is determined when the short-term average crosses above the long-term average, and a downtrend when crossing below.  

2. Laguerre RSI indicator to determine overbought and oversold zones. RSI greater than 80 is a long signal, and less than 20 a short signal.

3. ADX indicator to determine trend status. ADX greater than 20 indicates a trend, suitable for breakout trading.

Entry signals are determined by the direction of the moving average combination, entry timing by the Laguerre RSI, and non-trending markets are filtered out by the ADX. Exit signals are generated when the moving averages cross back. The overall strategy judgment framework is quite reasonable, with the different indicators working together to determine long/short entries and exits.

## Strengths   

The advantages of this strategy include:

1. Catching trend momentum: The strategy only enters the market at the start of trend development, capturing exponential profits from trends.  

2. Limited losses: Stop losses set appropriately limit losses from individual trades. Even losing trades have chances of making profits.

3. Accurate combined indicators: The moving averages, Laguerre RSI and ADX can relatively accurately determine market direction and entry timing.  

4. Simple implementation: The strategy only uses 3 indicators and is easy to understand and implement.

## Risks

There are also some risks to the strategy:  

1. Trend reversal risks: As a trend following strategy, large losses can occur if trend reversals are not detected in time.

2. Drawdown risks: In ranging markets, stops can be hit leading to account drawdowns.  

3. Parameter optimization risks: Indicator parameters need to be adjusted for different markets to avoid failures.

Countermeasures:  

1. Strict stop losses to limit single trade loss amounts.

2. Optimize indicator parameters and breakout thresholds. 

3. Use futures hedging etc. to manage drawdowns.

## Optimization Directions   

Some ways to optimize the strategy include:

1. Parameter optimization: Test combinations of moving average periods, Laguerre RSI parameters, ADX parameters to find optimum settings.

2. Breakout optimization: Test different moving average breakout thresholds to balance trade frequency and profitability.  

3. Entry optimization: Test other indicators combined with Laguerre RSI for more accurate entry timing.

4. Exit optimization: Research other exit signals in combination with moving averages. 

5. Profit taking vs. stop loss optimization: Test different strategies to optimize returns.

## Summary

In summary, this strategy effectively captures trending moves by using the combination of moving averages, Laguerre RSI and ADX to determine entries and exits. By entering early in trend developments and closely following the trend runs, exponential profits can be made, while stop losses help limit losses. The strategy suits investors comfortable making market judgments, as well as those doing automated trading after parameter optimization. Overall the strategy has strong practical utility.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2011|(?Backtesting window)Start Year|
|v_input_int_1|true|Start Month|
|v_input_int_2|true|Start Day|
|v_input_2|2050|Finish Year|
|v_input_int_3|12|Finish Month|
|v_input_int_4|31|Finish Day|
|v_input_bool_1|false|(?Trading Session)Use Entry Session Window|
|v_input_3|0930-1555:23456|Entry Session|
|v_input_float_1|true|(?Trading Options)Margin Requirement / Leverage|
|v_input_float_2|100|% of initial capital per trade|
|v_input_bool_2|false|Reinvest profit|
|v_input_float_3|100|Reinvest percentage|
|v_input_bool_3|false|All trades will close at the close of trading window|
|v_input_bool_4|false|Position must hit either SL/PT before entering new trade|
|v_input_int_5|16|(?Moving Average Ribbon)Fast EMA Length|
|v_input_int_6|48|Slow EMA Length |
|v_input_int_7|200|Slow SMA Length|
|v_input_float_4|0.2|(?Laguerre RSI)Alpha|
|v_input_4|14|(?ADX)ADX Smoothing|
|v_input_5|14|DI Length|
|v_input_bool_5|false|(?Stop Loss / Profit Target)Use Fixed SL / PT|
|v_input_float_5|50|Stop loss in ticks|
|v_input_float_6|100|Profit target in ticks|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-05 00:00:00
end: 2023-12-12 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © PtGambler

//@version=5
strategy("3MA + Laguerre RSI + ADX [Pt]", shorttitle = "3MA+LaRSI+ADX[Pt]", overlay=true, initial_capital = 10000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills = false, max_bars_back = 500)


// ********************************** Trade Period / Strategy Setting **************************************
startY = input(title='Start Year', defval=2011, group = "Backtesting window")
startM = input.int(title='Start Month', defval=1, minval=1, maxval=12, group = "Backtesting window")
startD = input.int(title='Start Day', defval=1, minval=1, maxval=31, group = "Backtesting window")
finishY = input(title='Finish Year', defval=2050, group = "Backtesting window")
finishM = input.int(title='Finish Month', defval=12, minval=1, maxval=12, group = "Backtesting window")
finishD = input.int(title='Finish Day', defval=31, minval=1, maxval=31, group = "Backtesting window")
timestart = timestamp(startY, startM, startD, 00, 00)
timefinish = timestamp(finishY, finishM, finishD, 23, 59)
use_entry_sess = input.bool(false, 'Use Entry Session Window', group = "Trading Session")
t1_session = input("0930-1555:23456", "Entry Session", group="Trading Session", tooltip = "Entry Signal only generated within this period.") 
t1 = time(timeframe.period, t1_session)
window = true

margin_req = input.float(1, title="Margin Requirement / Leverage", step=0.1, group = "Trading Options")
qty_per_trade = input.float(100, title = "% of initial capital per trade", group = "Trading Options")
reinvest = input.bool(defval=false,title="Reinvest profit", group = "Trading Options")
reinvest_percent = input.float(defval=100, title = "Reinvest percentage", group="Trading Options")

close_eod = input.bool(false, "All trades will close at the close of trading window", group = "Trading Options")
close_b4_open = input.bool(false, "Position must hit either SL/PT before entering new trade", group = "Trading Options")

profit = strategy.netprofit 
strategy.initial_capital = 50000
float trade_amount = math.floor(strategy.initial_capital*margin_req / close) 

if strategy.netprofit > 0 and reinvest
    trade_amount := math.floor((strategy.initial_capital* (qty_per_trade/100)+(profit*reinvest_percent*0.01))*margin_req/ close) 
else
    trade_amount := math.floor(strategy.initial_capital* (qty_per_trade/100)*margin_req / close)  

// ******************************************************************************************

group_ma = "Moving Average Ribbon"
group_larsi = "Laguerre RSI"
group_adx = "ADX"
group_SL = "Stop Loss / Profit Target"

// ----------------------------------------- MA Ribbon -------------------------------------

ema1_len = input.int(16, "Fast EMA Length", group = group_ma)
ema2_len = input.int(48, "Slow EMA Length ", group = group_ma)
sma1_len = input.int(200, "Slow SMA Length", group = group_ma)

ema1 = ta.ema(close, ema1_len)
ema2 = ta.ema(close, ema2_len)
sma1 = ta.sma(close, sma1_len)

plot(ema1, "EMA 1", color.white, linewidth = 2)
plot(ema2, "EMA 2", color.yellow, linewidth = 2)
plot(sma1, "SMA 1", color.purple, linewidth = 2)

ma_bull = ema1 > ema2 and ema2 > sma1   
ma_bear = ema1 < ema2 and ema2 < sma1

// ------------------------------------------ Laguerre RSI ---------------------------------------

alpha = input.float(0.2, title='Alpha', minval=0, maxval=1, step=0.1, group = group_larsi)

gamma = 1 - alpha
L0 = 0.0
L0 := (1 - gamma) * close + gamma * nz(L0[1])
L1 = 0.0
L1 := -gamma * L0 + nz(L0[1]) + gamma * nz(L1[1])

L2 = 0.0
L2 := -gamma * L1 + nz(L1[1]) + gamma * nz(L2[1])

L3 = 0.0
L3 := -gamma * L2 + nz(L2[1]) + gamma * nz(L3[1])

cu = (L0 > L1 ? L0 - L1 : 0) + (L1 > L2 ? L1 - L2 : 0) + (L2 > L3 ? L2 - L3 : 0)

cd = (L0 < L1 ? L1 - L0 : 0) + (L1 < L2 ? L2 - L1 : 0) + (L2 < L3 ? L3 - L2 : 0)

temp = cu + cd == 0 ? -1 : cu + cd
LaRSI = temp == -1 ? 0 : cu / temp
LaRSI := LaRSI * 100

bull_LaRSI = LaRSI > 80
bear_LaRSI = LaRSI < 20

// --------------------------------------- ADX  ------------------------

adxlen = input(14, title="ADX Smoothing", group = group_adx)
dilen = input(14, title="DI Length", group = group_adx)
dirmov(len) =>
	up = ta.change(high)
	down = -ta.change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
	minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = ta.rma(ta.tr, len)
	plus = fixnan(100 * ta.rma(plusDM, len) / truerange)
	minus = fixnan(100 * ta.rma(minusDM, len) / truerange)
	[plus, minus]
adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
sig = adx(dilen, adxlen)

active_adx = sig > 20 //and sig > sig[1]

// ******************************* Profit Target / Stop Loss *********************************************

use_SLPT = input.bool(false, 'Use Fixed SL / PT', group = group_SL)
SL = input.float(50, 'Stop loss in ticks', step = 1, group = group_SL) * syminfo.mintick
PT = input.float(100, "Profit target in ticks", step = 1, group = group_SL) * syminfo.mintick

var L_PT = 0.0
var S_PT = 0.0
var L_SL = 0.0
var S_SL = 0.0

if strategy.position_size > 0
    L_SL := L_SL[1]
    L_PT := L_PT[1]
else if strategy.position_size < 0
    S_SL := S_SL[1]
    S_PT := S_PT[1]
else
    L_SL := close - SL
    L_PT := close + PT
    S_SL := close + SL
    S_PT := close - PT

entry_line = plot(use_SLPT and strategy.position_size != 0 ? strategy.opentrades.entry_price(0) : na, "Entry Price", color.white, linewidth = 1, style = plot.style_linebr)

L_PT_line = plot(use_SLPT and strategy.position_size > 0 ? L_PT : na, "L PT", color.green, linewidth = 2, style = plot.style_linebr)
S_PT_line = plot(use_SLPT and strategy.position_size < 0 ? S_PT : na, "S PT", color.green, linewidth = 2, style = plot.style_linebr)

L_SL_line = plot(use_SLPT and strategy.position_size > 0 ? L_SL : na, "L SL", color.red, linewidth = 2, style = plot.style_linebr)
S_SL_line = plot(use_SLPT and strategy.position_size < 0 ? S_SL : na, "S SL", color.red, linewidth = 2, style = plot.style_linebr)

fill(L_PT_line, entry_line, color = color.new(color.green,90))
fill(S_PT_line, entry_line, color = color.new(color.green,90))
fill(L_SL_line, entry_line, color = color.new(color.red,90))
fill(S_SL_line, entry_line, color = color.new(color.red,90))


// ---------------------------------- Strategy setup ------------------------------------------------------

L_entry1 = ma_bull and bull_LaRSI and active_adx
S_entry1 = ma_bear and bear_LaRSI and active_adx

L_exit1 = ta.crossunder(ema1, ema2)
S_exit1 = ta.crossover(ema1, ema2)

// Trigger zones
bgcolor(ma_bull ? color.new(color.green ,90) : na)
bgcolor(ma_bear ? color.new(color.red,90) : na)

if L_entry1 and (use_entry_sess ? window : true) and (close_b4_open ? strategy.position_size == 0 : true)
    strategy.entry("Long", strategy.long, trade_amount)

if S_entry1 and (use_entry_sess ? window : true) and (close_b4_open ? strategy.position_size == 0 : true)
    strategy.entry("Short", strategy.short, trade_amount)

if use_SLPT
    strategy.exit("Exit Long", "Long", limit = L_PT, stop = L_SL, comment_profit = "Exit Long, PT hit", comment_loss = "Exit Long, SL hit")
    strategy.exit("Exit Short", "Short", limit = S_PT, stop = S_SL, comment_profit = "Exit Short, PT hit", comment_loss = "Exit Short, SL hit")
else
    if L_exit1
        strategy.close("Long", comment = "Exit Long")

    if S_exit1
        strategy.close("Short", comment = "Exit Short")

if use_entry_sess and not window and close_eod
    strategy.close_all(comment = "EOD close")

```

> Detail

https://www.fmz.com/strategy/435272

> Last Modified

2023-12-13 17:08:53
