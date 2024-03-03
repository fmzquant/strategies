
> Name

指数均线封闭突破策略Dual-EMA-Engulfing-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1eee68568c649a8ace0.png)
[trans]

## 概述

该策略通过判断指数移动均线的方向,确定多空方向。当出现阳线大体吞噬阴线的形态且交易量放大时,进行做多操作。当指数移动均线方向发生转折或出现阴线大体吞噬阳线的形态时,进行平仓操作。

## 策略原理

1. 使用两条不同参数的指数移动均线,判断市场趋势方向。短期EMA线在长期EMA线之上视为多头市场,反之为空头市场。

2. 当市场处于多头状态时,若出现阳线大体吞噬前一根K线的形态,且交易量要大于前一根K线1.2倍,则产生做多信号。此形态显示多头力量强劲,可以追入做多。

3. 当市场趋势发生转折,即短期EMA下穿长期EMA时,显示多头力量减弱,应平仓。或者当出现阴线大体吞噬阳线的形态时,显示空头力量放量进场,也应主动止损平仓。

## 优势分析

1. 使用双EMA判断市场结构,能较准确判断多空市场状态。

2. 吞噬形态显示单边力量突然放量进场,可以捕捉较大行情。结合交易量放大 filter,避免被假突破耽误。

3. 有止损机制。由于不设置止损位,使用市场结构转折来止损,可以减少无谓止损带来的滑点损失。

## 风险分析

1. 双EMA判断市场结构也可能判断错误,从而错过行情或乱入做多。可以适当调整EMA周期参数。

2. 吞噬形态容易被震荡行情误导。可以添加更多filter条件避免误交易。

3. 没有止损位设置可能带来更大亏损。可以试试break even 止损等方法。

## 优化方向  

1. 可以结合更多指标判断多空,例如MACD,能量潮等。

2. 可以酌情添加一定幅度的止损位。

3. 可以根据交易品种特点优化EMA 周期参数。

## 总结

该策略整体思路清晰易懂,使用指数移动均线判断结构,吞噬形态捕捉突破。优点是判断逻辑简单,交易信号明确。但也存在被套牢的风险。通过进一步优化,可望获得较好回报。

||

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

[/trans]

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
