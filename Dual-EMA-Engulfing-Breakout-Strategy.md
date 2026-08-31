
> Name

Dual-EMA-Engulfing-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1eee68568c649a8ace0.png)

## Overview

This strategy determines long/short direction by judging the direction of exponential moving averages (EMA). It goes long when there is a bullish engulfing pattern and enlarged trading volume. It closes position when the direction of EMAs is reversed or a bearish engulfing pattern occurs.

## Strategy Logic

1. Use two EMAs with different parameters to determine market trend. If short EMA is above long EMA, it is a bull market, otherwise it is a bear market.  

2. When the market is bullish, if a bullish engulfing pattern appears and trading volume is 1.2 times greater than previous bar, a long signal is triggered. This pattern shows strong momentum of bulls to follow.

3. When market trend is reversed, i.e. short EMA cross below long EMA, it shows weakening momentum of bulls and existing position should be closed. Also when a bearish engulfing pattern appears, it shows bears are entering with strong momentum, so position should be actively closed with stop loss.

## Advantage Analysis 

1. Using dual EMAs to determine market structure can accurately judge bull/bear status.

2. Engulfing pattern shows one side momentum suddenly increases, which can capture major trends. Combining with enlarged volume filter avoids being misled by fake breakouts.  

3. It has a stop loss mechanism. By not setting stop loss price but using market structure reversal to stop loss, unnecessary slippage can be reduced.

## Risk Analysis

1. Dual EMAs may also incorrectly judge market structure, thus missing trends or wrongly going long. EMA periods can be adjusted.

2. Engulfing patterns can be misled by ranging markets. More filters can be added to avoid false trades.  

3. Not having stop loss price may lead to larger losses. Other stop loss methods like break even can be tested.

## Optimization Direction

1. More indicators like MACD, A/D can be used to determine long/short.

2. Add moderate fixed stop loss price based on need.

3. Optimize EMA periods based on symbol trading characteristics.  

## Conclusion

The strategy's logic is clear and easy to understand, using EMAs to determine structure and engulfing patterns to capture breakout. Its advantages are simple judgment logic and clear trading signals. But risks of being trapped exist. Further optimization can gain better return.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(20 Jan 1990 00:00 +0900)|I_start_date|
|v_input_2|timestamp(20 Dec 2030 00:00 +0900)|I_finish_date|
|v_input_int_1|15|Short EMA|
|v_input_int_2|30|Long EMA|
|v_input_float_1|true|Size of Body|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-06 00:00:00
end: 2023-12-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=5
// # ========================================================================= #
// #                   |   STRATEGY  |
// # ========================================================================= #
strategy(
  title                           = "fpemehd Strategy001",
  shorttitle                      = "f_001",
  overlay                         =  true,
  default_qty_type                =  strategy.percent_of_equity, 
  default_qty_value               =  100, 
  initial_capital                 =  10000000, 
  currency                        =  currency.USD, 
  slippage                        =  0, 
  commission_type                 =  strategy.commission.cash_per_order, 
  commission_value                =  0.01, 
  process_orders_on_close         =  true)
// # ========================================================================= #
// #                   |   STRATEGY  |
// # ========================================================================= #


// Inputs
I_start_date = input (defval = timestamp("20 Jan 1990 00:00 +0900"))
I_finish_date = input(defval = timestamp("20 Dec 2030 00:00 +0900"))

I_short_ema = input.int(defval = 15 , title = "Short EMA", minval = 1 , maxval = 300 , step = 1)
I_long_ema = input.int(defval = 30 , title = "Long EMA", minval = 1 , maxval = 300 , step = 1)

I_body = input.float(defval = 1 , title = "Size of Body", minval = 1 , maxval = 5 , step = 0.1)

time_cond = true

// Calculate Engulfing Candles
C_uptrend = false
C_downtrend = false
C_ema_short = ta.ema(source = close, length = I_short_ema) 
C_ema_long = ta.ema(source = close, length = I_long_ema) 
C_uptrend := close > C_ema_short and C_ema_short > C_ema_long
C_downtrend := close < C_ema_short and C_ema_short < C_ema_long

C_pre_body = math.abs(open[1]-close[1])
C_pre_body_ratio = (math.abs(open[1]-close[1])) / (math.abs(high[1]-low[1])) * 100

C_now_body = math.abs(open-close)
C_now_body_ratio = (math.abs(open-close)) / (math.abs(high-low)) * 100

C_bullish_engulfing = (open[1] > close[1] and open <= close) and (low < low[1] and high > high[1])
C_bearish_engulfing = (open[1] < close[1] and open >= close) and (low < low[1] and high > high[1])
C_avoid_doge = (C_pre_body_ratio > I_body and C_now_body_ratio > I_body) ? true : false
C_volume_filter = volume > volume[1] * 1.2

// Signals
long_signal = C_uptrend and C_bullish_engulfing and C_avoid_doge and C_volume_filter
close_signal = C_downtrend or C_bearish_engulfing 


if long_signal and time_cond
    strategy.entry(id = "Long", direction = strategy.long)

if close_signal and time_cond
    strategy.close(id = "Long")


```

> Detail

https://www.fmz.com/strategy/434564

> Last Modified

2023-12-07 15:50:13
