
> Name

Bollinger-Bands-Oscillation-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15384655626028da3a7.png)


## Overview

This strategy combines Bollinger Bands and Aroon indicator to profit from oscillation and breakthroughs in volatile markets. It works well in oscillating trending markets, able to get in timely after breakthroughs and set stop loss and take profit conditions to exit positions properly.

## Strategy Logic

The strategy mainly utilizes two indicators to identify trading opportunities and exit points. 

Firstly, the Bollinger Bands. It consists of a middle band, an upper band and a lower band. The middle band is a simple moving average of closing price over n periods. The upper band is the middle band + k standard deviations. The lower band is the middle band - k standard deviations. A upward breakthrough of the middle band from the lower band signals long entry. A downward breakthrough of the middle band from the upper band signals short entry. The strategy uses Bollinger Bands to identify opportunity points amid oscillation trends, entering around breakthroughs of the middle band.

Secondly, the Aroon indicator. It reflects the relative strength of highest and lowest price over n periods. Aroon can determine trends and opportunities. When Aroon Up line is higher than a threshold, it indicates an upward trend. When Aroon Down line is higher than a threshold, it indicates a downward trend. The strategy uses Aroon Up to confirm an uptrend and Aroon Down to determine stop loss.

Combining the two indicators, the strategy goes long when a Bollinger breakthrough happens and Aroon Up is higher than a threshold. It closes position when stop loss is triggered or Aroon Up drops below a set value.

## Advantages

1. Combining multiple indicators improves accuracy. Single indicator is susceptible to market noise. The combo of Bollinger Bands and Aroon can filter out false signals.

2. Timely catch trend reversals. Bollinger Bands has strong trend identification capability and can detect short term breakthrough opportunities. Aroon judges long term trend to avoid excessive trades in ranging markets.

3. Proper risk control. Stop loss and Aroon Down controls downside risk. Position sizing also limits per trade loss. 

4. Suits oscillating markets with less huge losses. Compared to trend following strategies, this strategy performs better in oscillating markets.

## Risks

1. Bollinger Bands can be inaccurate. Sudden market events can invalidate Bollinger Bands.

2. Aroon parameters need optimization. Different markets need adjusted Aroon parameters for best results.

3. Stop loss too tight causes repeated triggers. Stop loss range should be relaxed properly to avoid repeated touches.

4. Avoid strong trending markets. The strategy suits oscillating markets. It does poorly in strong trending markets.

## Optimizations

1. Optimize Bollinger parameters, use adaptive Bollinger Bands. Allow dynamic adjustment of parameters for better flexibility.

2. Optimize dynamic Aroon parameters. Different assets and timeframes need different Aroon parameters. Research dynamic optimization.

3. Add filters like RSI to avoid overbought/oversold. Further improves accuracy of strategy signals. 

4. Use machine learning to optimize stop loss. Algorithm training can find better stop loss methods to minimize repeated triggers.

5. Combine with volume like OBV to avoid false breakouts. Volume indicators can prevent false Bollinger breakout signals.

## Conclusion

Overall this is a typical oscillation trading strategy. It identifies trading opportunities by combining Bollinger Bands and Aroon, capable of capitalizing on short term market oscillations. With proper stop loss, risk management and parameter optimization, it is suitable for ranging markets. But optimization and risk control is needed to avoid applying it in trending markets. With further improvements, it can become a very practical quant strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|20|lengthBB|
|v_input_9_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|2|StdDev|
|v_input_11|false|Offset|
|v_input_12|288|lengthAr|
|v_input_13|90|Aroon Confirmation|
|v_input_14|70|Aroon Stop|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-10-28 21:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © relevantLeader16058

//@version=4
// strategy(shorttitle='Bollinger bands And Aroon Scalping',title='Bollinger bands And Aroon Scalping (by Coinrule)', overlay=true, initial_capital = 1000, process_orders_on_close=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 30, commission_type=strategy.commission.percent, commission_value=0.1)

//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2020, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false       // create function "within window of time"


// BB inputs and calculations
lengthBB = input(20, minval=1)
src = input(close, title="Source")
mult = input(2.0, minval=0.001, maxval=50, title="StdDev")
basis = sma(src, lengthBB)
dev = mult * stdev(src, lengthBB)
upper = basis + dev
lower = basis - dev
offset = input(0, "Offset", type = input.integer, minval = -500, maxval = 500)


lengthAr = input(288, minval=1)
AroonUP = 100 * (highestbars(high, lengthAr+1) + lengthAr)/lengthAr
AroonDown = 100 * (lowestbars(low, lengthAr+1) + lengthAr)/lengthAr


Confirmation = input(90, "Aroon Confirmation")
Stop = input(70, "Aroon Stop")

Bullish = crossunder (close, basis)
Bearish = crossunder (close, upper)

//Entry 

strategy.entry(id="long", long = true, when = Bullish and AroonUP > Confirmation and window())

//Exit

strategy.close("long", when = Bearish or AroonUP < Stop and window())



```

> Detail

https://www.fmz.com/strategy/430767

> Last Modified

2023-11-01 16:45:54
