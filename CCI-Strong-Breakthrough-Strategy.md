
> Name

CCI-Strong-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12e7d96673ef9d4c089.png)

## Overview

This strategy is based on the classic Commodity Channel Index (CCI) and only goes long. It enters the market when the CCI indicator is at an extremely low level (CCI <-150 or user-defined threshold) and regains strength (i.e. CCI> CCI of previous candle), with a filter on the "strength" of the prices themselves (i.e. the closing of the signal bar must be higher than a certain difference - fixed at 0.25% - from the opening).  

The strategy exits when either the stop loss is triggered or prices rise above the CCI upper band.

The goal is to achieve a high percentage of profitable trades (well over 50%) rather than capturing the full duration of a trend. It is therefore suitable for those who "hate to see potential losses".

## Strategy Logic

1. Construct CCI indicator and bands using ta.sma() and ta.dev() functions.

2. Use input to select start date for backtest. 

3. Entry signal: CCI crosses below lower band and starts increasing. Additional filter requires close > open by 0.25%.

4. Exit 1: CCI rises above upper band, take profit.

5. Exit 2: Price drops below stop loss level, cut losses.

6. Strategy only goes long based on CCI strength, with stops to control risk.

## Advantage Analysis

The strategy has the following advantages:

1. Identify overbought/oversold with CCI to capitalize on reversals.

2. Only long direction avoids excessive risk from bad trades.

3. Price strength filter ensures support formed before entry. 

4. Stop loss mechanism limits per trade loss and manages capital.

5. Flexible backtest parameters to adjust entry filters.

6. High win rate suits investors focused on risk management. 

7. Clear logic and simple implementation.

## Risk Analysis

There are also some risks:

1. Going only long may miss short-term downtrends.

2. Poor CCI parameter tuning leads to failure.

3. Stop loss too loose fails to limit losses.

4. Strong uptrend blows through stops causing large losses.

5. High trade frequency increases transaction costs.

Possible solutions:

1. Optimize CCI parameters to find best values.

2. Adjust stop loss to balance risk and slippage.

3. Manage entry frequency considering costs. 

4. Combine with trend and range filters.

## Enhancement Opportunities

Some ways to improve the strategy:

1. Implement dynamic stops based on market volatility.

2. Add filters like MACD to avoid stops being too wide.

3. Incorporate short side when CCI overheats. 

4. Consider costs, set minimum profit target.

5. Optimize parameters for time frame.

6. Machine learning for automated parameter tuning. 

7. Add position sizing for dynamic allocation.

## Conclusion

In summary, this long-only strategy capitalizes on CCI overbought/oversold levels with price strength filter and stop losses. It offers easy implementation, good risk control and high win percentage. The limitations of being long-only and fixed stops can be addressed through parameter optimization, short entries, dynamic stops etc. The strategy suits investors seeking high win rates and proper risk management.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|20|Period|
|v_input_float_1|8|Stop Loss percentage|
|v_input_float_2|0.25|Close of the signal bar higher than Open %|
|v_input_int_2|150|Upper Band|
|v_input_int_3|-150|Low Band|
|v_input_int_4|true|From Month|
|v_input_int_5|true|From Day|
|v_input_int_6|2016|From Year|
|v_input_int_7|true|Thru Month|
|v_input_int_8|true|Thru Day|
|v_input_int_9|2112|Thru Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-08 00:00:00
end: 2023-11-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title='CCI High Performance long only', overlay=false )
src = input(close)
length = input.int(20, title='Period', minval=1)
lossp = input.float(8, title='Stop Loss percentage', minval=0.5, step=0.5)
scart = input.float(0.25, title='Close of the signal bar higher than Open %', minval = 0)
upperline = input.int(150, title='Upper Band', minval=0, step=10)
lowline = input.int(-150, title='Low Band', maxval=0, step=10)


// construction of CCI (not on close but in totalprice) and of bands
ma = ta.sma(src, length)
cci = (src - ma) / (0.015 * ta.dev(src, length))
plot(cci, 'CCI', color=color.new(#996A15, 0))
band1 = hline(upperline, 'Upper Band', color=#C0C0C0, linestyle=hline.style_dashed)
band0 = hline(lowline, 'Lower Band', color=#C0C0C0, linestyle=hline.style_dashed)
fill(band1, band0, color=color.new(#9C6E1B, 90), title='Background')
// === INPUT BACKTEST RANGE ===
fromMonth = input.int(defval = 1,    title = "From Month",  minval = 1, maxval = 12)
fromDay   = input.int(defval = 1,    title = "From Day",    minval = 1, maxval = 31)
fromYear  = input.int(defval = 2016, title = "From Year",   minval = 1970)
thruMonth = input.int(defval = 1,    title = "Thru Month",  minval = 1, maxval = 12)
thruDay   = input.int(defval = 1,    title = "Thru Day",    minval = 1, maxval = 31)
thruYear  = input.int(defval = 2112, title = "Thru Year",   minval = 1970)
// === FUNCTION EXAMPLE limit for backtest ===
start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)            // backtest start  window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)            // backtest finish window
window()  => time >= start and time <= finish ? true : false           // create function "within window of time"
//ENTRY CONDITIONS

// strategy: enter when CCI is under the low line and starts increasing. The filter is that the signal candle should mark a close higher than a x-percent
// (0.25%) of the open
// Exit when either when it reaches the target of a prices highest than high level of CCI or fixed stop loss (in percentage)
scart_level = open * (1+scart/100)
entryl = cci[1] < lowline[1] and cci > cci[1] and close > scart_level and window()
exit1 = cci> upperline
strategy.entry('Long', strategy.long, when=entryl)
strategy.close('Long', when=exit1, comment='target')

// money management (only stop loss)
losspel = strategy.position_avg_price * (1 - lossp / 100)
fixed_stop_long = close < losspel
strategy.close('Long', when=fixed_stop_long, comment='Stop Loss')


```

> Detail

https://www.fmz.com/strategy/432225

> Last Modified

2023-11-15 16:52:06
