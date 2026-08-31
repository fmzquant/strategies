
> Name

EMAskeletonstrategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8e1d42a028dbd88749.png)


## Overview

This strategy combines the EMA and RSI indicators to identify short-term adjustment opportunities in Bitcoin. It mainly uses the EMA as the main graphical tool and the RSI as an auxiliary judgment indicator to find obvious adjustment patterns. Trading signals are generated when the price breaks below or climbs back above the EMA line. It also has stop loss and take profit controls that can be parameterized.

## Strategy Principle  

The strategy mainly uses the 50-period EMA line and the 25-period RSI indicator. The EMA line is regarded as the main graphical indicator and the RSI is used to determine overbought and oversold conditions to assist in generating trading signals. A sell signal is generated when the price falls below the EMA line, and a buy signal is generated when the price breaks above the EMA line and the RSI indicator shows a non-overbought signal (RSI value less than 70). To reduce the chance of wrong entries, the strategy also incorporates a longer-period EMA line (such as 70 periods) as an additional filter condition.

After entering a trade, the strategy also sets stop loss and take profit levels. The stop loss distance is adjustable, defaulting to 5.1%; the take profit distance is also adjustable, defaulting to 9.6%. This effectively limits the maximum loss per trade.   

In summary, the strategy mainly relies on EMA line patterns, supplemented by RSI indicators to avoid overbought and oversold conditions, while having stop loss and take profit controls. It is suitable for capturing short-term BT Bitcoin adjustments.

## Advantage Analysis

The main advantages of this strategy are:

1. The strategy signals are relatively clear without too many random wrong entries. The combination of EMA and RSI makes the signals more reliable rather than relying solely on a single indicator.  

2. Built-in stop loss and take profit control. This effectively limits the loss per trade and is a very important risk control tool.

3. The strategy parameters can be optimized. EMA length, RSI length and more are adjustable parameters. Users can find the optimal parameter sets for different market conditions. 

4. Backtesting enabled. The strategy allows setting a backtest date range internally to verify performance.

## Risk Analysis

The strategy also has some risks, mainly from:

1. BT Bitcoin has volatile moves, stops may be run. Although stops are set, BT Bitcoin often has large price swings that can take out stops leading to larger-than-expected losses.  

2. Drawdown risk. The strategy does not consider overall drawdown control. It may experience drawdowns during prolonged adjustment periods.

3. Weaker signals in strong trends. BT Bitcoin trends can become quite extended during certain market conditions. The short-term signals tend to underperform leading to being stopped out of good trades.

To control and mitigate these risks:

1. Allow wider stop loss ranges. During strong trending conditions, the stop loss range can be widened, such as to 10%, to avoid being stopped out prematurely.  

2. Add other indicator filters. Trend-following indicators can be added to avoid taking trades during prolonged consolidation periods.  

3. Optimize parameters. Test parameter sets across different market conditions. Switch parameter sets when strong trends emerge to improve signal quality.

## Optimization Directions 

There is further room to optimize this strategy:  

1. Add overall drawdown control. Could set a maximum drawdown percentage, such as 20%, that pauses trading when reached to limit losses.

2. Limit entry frequency. Can restrict the number of trades per unit time, such as 2 trades per hour max, to prevent over-trading. 

3. Optimize parameters. Test parameter combinations for different market conditions. Create parameter templates to switch between in real-time matching current conditions.

4. Combine with other indicators. Integrate trend, volatility and other metrics to create more comprehensive trading system entry rules.

## Summary

Overall, the strategy mainly relies on short-term BT Bitcoin adjustment patterns, using the EMA and RSI to generate clear trading signals, while having stop loss and take profit controls. It can effectively capture short-term slippage profit opportunities. But works best in combination with other strategies to produce more consistent excess returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|EMA Length|
|v_input_2_close|0|EMA+RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3_high|0|Long+Short Condition Source: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|25|RSI Length|
|v_input_5|70|Safety EMA Length|
|v_input_6_close|0|Safety EMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|true|From Month|
|v_input_8|true|From Day|
|v_input_9|2019|From Year|
|v_input_10|true|To Month|
|v_input_11|true|To Day|
|v_input_12|9999|To Year|
|v_input_13|true|Show Date Range|
|v_input_14|0.051|Stop Loss|
|v_input_15|0.096|Take Profit|
|v_input_16_close|0|Line Color Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_17_close|0|Line Color B Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-06 00:00:00
end: 2023-12-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mmoiwgg

//@version=4
strategy(title="EMA+RSI Pump & Drop Swing Sniper (With Alerts & SL+TP) - Strategy", shorttitle="EMA+RSI Swing Strategy", overlay=true)
emaLength = input(title="EMA Length", type=input.integer, defval=50, minval=0)
emarsiSource = input(close, title="EMA+RSI Source")
condSource = input(high, title="Long+Short Condition Source")
emaVal = ema(emarsiSource, emaLength)
rsiLength = input(title="RSI Length", type=input.integer, defval=25, minval=0)
rsiVal = rsi(emarsiSource, rsiLength)

//Safety 
emaLength2 = input(title="Safety EMA Length", type=input.integer, defval=70, minval=0)
emaSource2 = input(close, title="Safety EMA Source")
ema = ema(emaSource2, emaLength2)
emaColorSource2 = close
emaBSource2 = close

// Backtest+Dates
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear = input(defval = 2019, title = "From Year", minval = 2017)
ToMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear = input(defval = 9999, title = "To Year", minval = 2017)
showDate  = input(defval = true, title = "Show Date Range", type = input.bool)
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)        // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest end window
window()  => time >= start and time <= finish ? true : false       // create function - add window() to entry/exit/close

// Conditions
exit_long = crossover(emaVal, condSource)
longCond = crossunder(emaVal, condSource) and close > ema

//Stoploss + TakeProfit
sl = input(0.051, step=0.001, title="Stop Loss")
tp = input(0.096, step=0.001, title="Take Profit")

// Plots Colors
colors = emarsiSource > emaVal and rsiVal > 14 ? color.green : color.red
emaColorSource = input(close, title="Line Color Source")
emaBSource = input(close, title="Line Color B Source")

// Plots
plot(ema, color=emaColorSource2[1] > ema and emaBSource2 > ema ? color.green : color.red, linewidth=1)
plot(emaVal, color=emaColorSource[1] > emaVal and emaBSource > emaVal ? color.green : color.red, linewidth=3)
plotcandle(open, high, low, close, color=colors)


//Strategy Entry+Exits
strategy.entry("long",1,when=window() and longCond)
strategy.close("long",when=window() and exit_long)
strategy.exit("long tp/sl", "long", profit = close * tp / syminfo.mintick, loss = close * sl / syminfo.mintick)

```

> Detail

https://www.fmz.com/strategy/434602

> Last Modified

2023-12-07 17:20:44
