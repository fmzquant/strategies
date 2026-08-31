
> Name

Trend-Following-Strategy-427814

> Author

ChaoZhang

> Strategy Description



## Overview

Noro's trend following strategy is a simple trend trading strategy based on price channel, RSI and body filter. It identifies the overall trend using price channel, enters based on RSI overbought/oversold levels, and uses body filter for additional signal confirmation. The strategy suits trending instruments like indices and forex.

## Strategy Logic 

The key aspects are:

1. Price channel determines the overall trend. Channel formed by looking back high/low defines uptrend/downtrend.

2. RSI indicates overbought/oversold for entry timing. RSI above 60 is overbought, below 40 is oversold zone.

3. Body filter provides final signal. Trades only if candle body exceeds a threshold to avoid noise.

4. Entries based on combining trend, RSI signal and body filter. Long entries in uptrend on bullish signals, short entries in downtrend on bearish signals.

5. Optional background colors clearly visualize the trend. 

6. Customizable trading time frames to selectively trade.

Multiple indicators align to create a relatively stable trend following system.

## Advantages

The main advantages are:

1. Price channel intuitively identifies the overall trend direction.

2. RSI effectively detects overbought/oversold levels for timing entry.

3. Body filter enhances signal quality and avoids false signals. 

4. Multi-indicator confirmation improves accuracy.

5. Simple indicators reduce curve fitting risks.

6. Customizable trading time frames add flexibility.

7. Easy to use with minimal parameters. Beginner friendly.

8. Background colors provide visual clarity.

## Risks

Some risks to consider:

1. Price channel trend misidentification risk.

2. Inaccurate RSI signal risks. 

3. Body filter eliminating valid signals.

4. Drawdown risk during trend corrections.

5. Optimization risk from bad parameter tuning. 

6. Position sizing risk from default full allocation.

7. Instrument selection risk if applied on non-trending assets. 

8. Trading time frame risks if improperly configured.

## Enhancement Opportunities

Some enhancement possibilities:

1. Add stop loss strategy to control loss per trade.

2. Optimize parameters based on instrument behavior.

3. Incorporate position sizing rules based on trend strength.

4. Implement drawdown limits to contain losses.

5. Add volume price analysis for signal verification.

6. Introduce machine learning for parameter optimization. 

7. Specialize parameters based on asset class.

8. Refine trading time frame logic for more flexibility.

## Conclusion

Noro's trend following strategy integrates price channel, RSI and body filter into a simple and practical trend trading system. It can trade along the trends and avoid counter-trend trades. With parameter optimization, risk controls and other improvements, the strategy has potential to become a consistently profitable trend trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|21|MA Period|
|v_input_4|false|Need trend Background?|
|v_input_5|1900|From Year|
|v_input_6|2100|To Year|
|v_input_7|true|From Month|
|v_input_8|12|To Month|
|v_input_9|true|From day|
|v_input_10|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-25 00:00:00
end: 2023-09-24 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title = "Noro's TrendMaster Strategy v1.0", shorttitle = "TrendMaster str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "long")
needshort = input(true, defval = true, title = "short")
len = input(21, defval = 20, minval = 2, maxval = 200, title = "MA Period")
needbg = input(false, defval = false, title = "Need trend Background?")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//PriceChannel 1
lasthigh = highest(close, len)
lastlow = lowest(close, len)
center = (lasthigh + lastlow) / 2

//Trend
trend = low > center and low[1] > center[1] ? 1 : high < center and high[1] < center[1] ? -1 : trend[1]

//Bars
bar = close > open ? 1 : close < open ? -1 : 0

//Fast RSI
fastup = rma(max(change(close), 0), 2)
fastdown = rma(-min(change(close), 0), 2)
rsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//Body filter
nbody = abs(close - open)
abody = sma(nbody, 10)
body = nbody > abody / 2

//Signals
up1 = trend == 1 and rsi < 60 and (strategy.position_avg_price > close or strategy.position_size <= 0) and body
dn1 = trend == -1 and rsi > 40 and (strategy.position_avg_price < close or strategy.position_size >= 0) and body

//Lines
plot(center, color = blue, linewidth = 3, transp = 0, title = "MA")

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 80)

//Trading

if up1
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
    
```

> Detail

https://www.fmz.com/strategy/427814

> Last Modified

2023-09-25 17:50:11
