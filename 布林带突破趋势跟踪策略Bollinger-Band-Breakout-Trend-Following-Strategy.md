
> Name

布林带突破趋势跟踪策略Bollinger-Band-Breakout-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview 

This is a trend following strategy based on the Bollinger Bands indicator. It uses the breakout of Bollinger Bands upper and lower bands to determine the trend direction and open corresponding positions. When prices start to fall back, it uses a trailing stop loss with dynamic spacing to exit positions and realize profits.

## Strategy Logic

The strategy uses Bollinger Bands to determine the trend direction. Bollinger Bands are constructed by calculating the standard deviation of prices to form the upper and lower bands. When prices break through the upper band, it indicates an uptrend start. When prices break the lower band, it indicates a downtrend start.

The specific trading logic is:

1. Calculate the middle, upper and lower bands of Bollinger Bands.

2. When price breaks through the upper band, go long. When price breaks the lower band, go short.

3. Use a trailing stop loss to control risks and exit when prices start to fall back. 

4. Re-enter the trend when prices break through the bands again.

Using Bollinger Bands to determine trends and combining with a dynamic trailing stop loss can effectively control risks.

## Advantage Analysis

The advantages of this strategy include:

1. Using Bollinger Bands to determine trends, simple and effective.

2. Combination of breakout entry and dynamic trailing stop loss balances trend catching and risk control.

3. Clean and concise code structure, easy to understand and modify.

4. Few parameters, easy to optimize.

5. Applicable to different products, flexible. 

6. Good backtest results, with large profit potential.

## Risk Analysis

The main risks are:

1. Bollinger Bands rely solely on statistics, risks of curve fitting.

2. Hard to distinguish range expansion and real trends, may cause misjudgements.

3. Stop loss points too tight, risks of being stopped out by normal oscillations.

4. No consideration of transaction costs.

5. Limited backtest period, risks of overfitting.

The solutions are:

1. Optimize parameters or add other indicators for signal verification.

2. Improve identification of oscillation and channels.

3. Dynamically adjust stop loss based on ATR etc.

4. Add commission, slippage costs.

5. Expand backtest period, multi-market verification.

## Optimization Directions

The strategy can be optimized by:

1. Testing combo effects of different indicators. 

2. Improving identification of trend oscillation. 

3. Introducing machine learning for dynamic parameter optimization.

4. Optimizing stop loss strategy based on backtest results.

5. Evaluating and adding transaction costs.

6. Parameter space optimization for optimal settings.

7. Adding money management to control position risks.

## Conclusion

This strategy determines trend direction with Bollinger Bands and controls risk with trailing stop loss. The overall logic is simple and clear. It has good trend catching capability, but can be improved by introducing more technical indicators, optimizing parameters, adding costs etc to make it more robust. Overall, this strategy provides a simple and practical Bollinger Bands based trend following approach.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|sma|
|v_input_2|1.2|mult|
|v_input_3_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|long entry|message_long_entry|
|v_input_5|short entry|message_short_entry|
|v_input_6|2019|From Year|
|v_input_7|2100|To Year|
|v_input_8|true|From Month|
|v_input_9|12|To Month|
|v_input_10|true|From day|
|v_input_11|31|To day|
|v_input_12|true|Leverage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-15 00:00:00
end: 2023-09-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Bollinger Band Breakout", shorttitle = "BB Strategy",initial_capital=1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 10, commission_type = strategy.commission.percent, commission_value = 0.3, max_bars_back = 1000, overlay=true)

// Inputs //

sma = input(20,  minval=1)
mult   = input(1.2, minval=0.001, maxval=50)
src = input(close)

// alert msg  //

message_long_entry  = input("long entry")
message_short_entry = input("short entry")

// Calculations //

basis = sma(close, sma)
dev   = mult * stdev(close, sma)

upper = basis + dev
lower = basis - dev

// Backtest //
fromyear = input(2019, defval = 2019, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(1, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

leverage = input(1, "Leverage")

term = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59))

// PLOT //

plot(basis, color = color.gray,  linewidth = 2)
lu = plot(upper, color = color.green, linewidth = 2)
ll = plot(lower, color = color.red,   linewidth = 2)

fill(lu, ll, color = color.gray)

// Signals //

long  = crossover(close, upper)
short = crossunder(close, lower)

// Strategy entry //
strategy.initial_capital = 50000
if (long and term)
    strategy.entry("long",  strategy.long, qty=strategy.initial_capital/close*leverage, when = long and barstate.isconfirmed, alert_message = message_long_entry)
    
if (short and term)
    strategy.entry("short",  strategy.short, qty=strategy.initial_capital/close*leverage, when = short and barstate.isconfirmed, alert_message = message_short_entry)

// strategy exit //

strategy.exit("long tsl", "long", loss = close*0.075 / syminfo.mintick, trail_points = close*0.05 / syminfo.mintick, trail_offset = close*0.005 / syminfo.mintick)
strategy.exit("short tsl", "short", loss = close*0.075 / syminfo.mintick, trail_points = close*0.05 / syminfo.mintick, trail_offset = close*0.005 / syminfo.mintick)




```

> Detail

https://www.fmz.com/strategy/427592

> Last Modified

2023-09-22 14:31:17
