
> Name

ATR跟踪止损策略ATR-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description


Overview: The ATR trailing stop strategy is a trading strategy that dynamically sets stop loss levels based on the Average True Range (ATR) indicator. It is suitable for volatile FOREX pairs, capturing profits in major trends while controlling risk by dynamically tracking market volatility.  

### Strategy Logic

The strategy calculates the AVERAGE indicator (price moving average) and upper/lower bands DIFF/DIFFLOW based on ATR values, forming a trading channel. It goes long when price crosses above DIFF and goes short when price crosses below DIFFLOW, with stops set dynamically based on ATR.  

Specifically, it first calculates the simple moving average AVERAGE and ATR indicator. The upper band DIFF and lower band DIFFLOW are then computed by multiplying ATR values with a coefficient. This forms a trading channel bounded by DIFF and DIFFLOW. When price breaks above the upper band, a long position is taken. When price breaks below the lower band, a short position is taken. In addition, the stop loss level moves dynamically with ATR values. This allows for adaptive stops.

Thus the strategy can continuously go long/short to capture profits in major trends, while using ATR trailing stops to control risk. This makes it suitable for volatile instruments.

### Advantage Analysis

The advantages of this strategy include:

1. ATR-based dynamic stops adjust to market volatility, avoiding stops too close or too far. 

2. Trading channel aims to capture mean reversion within trends. Good capital utilization when price oscillates within channel.

3. Continuous trend trading without predicting breakouts. Follows trends for better profitability.

4. Simple parameters and rules, easy to understand and automate.

5. High capital utilization, continuous trading provides more profit opportunities.

### Risks and Improvements

Some risks to consider:

1. Large ATR coefficients lead to stops too far away, failing to control risk. ATR multiples of 1-3x daily ATR are recommended.

2. Whipsaws in range-bound markets trigger frequent stops. Adjust ATR coefficients to reduce unwanted stops.

3. Potential losses when price reverses after initial breakout. Adding trend filter to trade channel breaks only in trend direction.  

4. Big spikes can make stops ineffective. Consider adding maximum stop loss limits.

Possible optimizations:

1. Optimize ATR parameters to find right balance between tracking volatility and preventing excessive stops.

2. Add trend indicator, only trade breaks in trend direction. Avoid countertrend trades.

3. Test parameters individually for each instrument to find optimal values.

4. Optimize entry, consider entering on channel midline breakouts. 

5. Increase position sizes while controlling total risk/drawdown.

### Conclusion
The ATR trailing stop strategy trades continuously in trends while dynamically managing risk. It suits volatile instruments and provides good capital utilization. Parameter optimization and adding filters can further refine performance. Overall a simple and practical trend following strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|26|Length|
|v_input_2|true|Length|
|v_input_3|2|Length|
|v_input_4|8|From Month|
|v_input_5|18|From Day|
|v_input_6|2008|From Year|
|v_input_7|true|To Month|
|v_input_8|true|To Day|
|v_input_9|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-25 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Investoz

//@version=4
strategy("ATR Strategy FOREX", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

len = input(26, type=input.integer, minval=1, title="Length")
mul = input(1, type=input.float, minval=0, title="Length")
mullow = input(2, type=input.float, minval=0, title="Length")

price = sma(close, 1)
average = ema(close, len)
diff = atr(len) * mul
difflow = atr(len) * mullow

bull_level = average + diff
bear_level = average - difflow
bull_cross = crossunder(price, bear_level)
bear_cross = crossunder(bull_level, price)

FromMonth = input(defval = 8, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 18, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2008, title = "From Year", minval = 2008)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2020, title = "To Year", minval = 2019)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)       
startTimeOk()  => true

if (startTimeOk())
    strategy.entry("KOP", strategy.long, when=bull_cross)
    strategy.close("KOP", when=bear_cross)  
    strategy.entry("SALJ", strategy.short, when=bear_cross)
    strategy.close("SALJ", when=bull_cross)

plot(price, title="price", color=color.black, transp=50, linewidth=2)
a0 = plot(average, title="average", color=color.red, transp=50, linewidth=1)
a1 = plot(bull_level, title="bull", color=color.green, transp=50, linewidth=1)
a2 = plot(bear_level, title="bear", color=color.red, transp=50, linewidth=1)
fill(a0, a1, color=color.green, transp=97)
fill(a0, a2, color=color.red, transp=97)
```

> Detail

https://www.fmz.com/strategy/427925

> Last Modified

2023-09-26 20:23:13
