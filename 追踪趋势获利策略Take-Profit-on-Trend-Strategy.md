
> Name

追踪趋势获利策略Take-Profit-on-Trend-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The Take Profit on Trend strategy aims to detect long-term trends and short-term pullbacks, taking long positions during overall uptrends while capturing short-term dips, with reasonable stop loss and take profit levels set to follow the trend and take profits in a timely manner.

## Strategy Logic

The strategy mainly uses EMA and RSI to determine long-term and short-term trends. Specifically, it uses 50-day EMA and 200-day EMA to judge long-term trends, and RSI to gauge trend strength. When the long-term is in an uptrend (200-day EMA rising) and strong (RSI above 50), and the short-term sees a pullback (last 2 candlesticks closing lower), a long position is taken.

After entering a position, the strategy sets stop loss and take profit conditions. When the price rises more than 2x BHD units above the entry price, profits are taken. When the price falls more than 3x BHD units below the entry price, the position is stopped out. The BHD unit is calculated based on the amplitude of the last 200 candlesticks.

This way, the strategy fully considers long and short term trend characteristics, increasing profits while controlling risks, following the trend while taking timely profits. 

## Advantage Analysis

The strategy has the following advantages:

1. Considers long and short term trends, combined with strength indicators, avoids blind entries in ranging markets.

2. Entries follow the trend direction, higher win rate. 

3. Take profit and stop loss points allow timely profit taking and risk control.

4. TP and SL are dynamic based on volatility, relatively reasonable.

5. Backtests show good returns and stability across symbols and timeframes.

6. Simple and clear logic, easy to understand and implement for all skill levels.

## Risk Analysis

The strategy also has some risks:

1. Long/short term misjudgement leading to wrong entry directions.

2. Cliff-like market crashes may penetrate stops.

3. Poor parameter settings negatively impact performance. 

4. TP set too tight, may exit prematurely.

5. Backtest ≠ live performance, continuous optimization needed.

Solutions:

1. Optimize parameters, adjust MA periods, add cross-validation indicators.

2. Wider stops, position sizing, other risk controls.

3. Extensive backtesting to evaluate parameters.  

4. Dynamic TP optimization based on market conditions.

5. Ongoing backtesting, optimization, live adjustment.

## Optimization Directions

The strategy can be further optimized by:

1. Parameter tuning, MA periods, BHD unit periods etc.

2. Adding indicators, MACD, KD etc for better short-term accuracy. 

3. Optimizing TP/SL, dynamic size based on volatility etc. 

4. Adding position sizing based on trend strength.

5. Testing robustness across more symbols and timeframes.

6. Adding filters like closing price > open to avoid traps.

7. Incorporating machine learning for more automation and intelligence.

These can improve win rate, return, stability, adaptiveness etc.

## Conclusion

Overall the Take Profit on Trend strategy has the advantages of considering long/short trends, following trends, clear TP/SL. It is a stable and efficient trend following approach. But risks exist, requiring ongoing optimization and live adjustment. The logic is clear and easy to implement. Worth studying and applying for traders. With further optimization it can become a robust quant strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2021|Start year|
|v_input_2|true|Start month|
|v_input_3|true|Start day|
|v_input_4|2050|end year|
|v_input_5|true|end month|
|v_input_6|true|end day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © BHD_Trade_Bot

// @version=5
strategy(
 shorttitle            = 'Take Profit On Trend',
 title                 = 'Take Profit On Trend (by BHD_Trade_Bot)',
 overlay               = true,
 calc_on_every_tick    = true,
 calc_on_order_fills   = true,
 use_bar_magnifier     = true,
 initial_capital       = 1000,
 default_qty_type      = strategy.percent_of_equity,
 default_qty_value     = 100,
 commission_type       = strategy.commission.percent,
 commission_value      = 0.1)



// Backtest Time Period
start_year   = input(title='Start year'   ,defval=2021)
start_month  = input(title='Start month'  ,defval=1)
start_day    = input(title='Start day'    ,defval=1)
start_time = timestamp(start_year, start_month, start_day, 00, 00)

end_year     = input(title='end year'     ,defval=2050)
end_month    = input(title='end month'    ,defval=1)
end_day      = input(title='end day'      ,defval=1)
end_time = timestamp(end_year, end_month, end_day, 23, 59)

is_back_test_time() => true



// EMA
ema50 = ta.ema(close, 50)
ema200 = ta.ema(close, 200)

// RSI
rsi200 = ta.rsi(close, 200)

// EMA_CD
emacd = ema50 - ema200
emacd_signal = ta.ema(emacd, 50)
hist = emacd - emacd_signal

// BHD Unit
bhd_unit = ta.rma(high - low, 200) * 2
bhd_upper = ema200 + bhd_unit
bhd_lower = ema200 - bhd_unit



// All n candles is going down
all_body_decrease(n) =>
    isValid = true
    for i = 0 to (n - 1)
        if (close[i] > close[i + 1])
            isValid := false
            break
    isValid



// ENTRY CONDITIONS

// Long-term uptrend
entry_condition1 = rsi200 > 51 and hist > 0

// Short-term downtrend
entry_condition2 = all_body_decrease(2)

ENTRY_CONDITIONS = entry_condition1 and entry_condition2

if ENTRY_CONDITIONS and is_back_test_time()
    strategy.entry('entry', strategy.long)


// CLOSE CONDITIONS

// Price increase 2 BHD unit
take_profit = close > strategy.position_avg_price + bhd_unit * 2

// Price decrease 3 BHD unit
stop_loss = close < strategy.position_avg_price - bhd_unit * 3

CLOSE_CONDITIONS = take_profit or stop_loss

if CLOSE_CONDITIONS
    strategy.close('entry')



// Draw
plot(ema50, color=color.orange, linewidth=2)
plot(ema200, color=color.purple, linewidth=2)
bhd_upper_line = plot(bhd_upper, color=color.teal)
bhd_lower_line = plot(bhd_lower, color=color.teal)
fill(bhd_upper_line, bhd_lower_line, color=color.new(color.teal, 90))

```

> Detail

https://www.fmz.com/strategy/427860

> Last Modified

2023-09-26 11:22:04
