
> Name

Multi-MA-Limit-Order-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This is a trading strategy that sets limit orders based on multiple moving averages. It will set different numbers of long or short limit orders when the price breaks through different MA levels, forming a pyramid-shaped multi-position. When the price breaks through the MA again, reverse limit orders will be opened. When holding positions, the positions will be closed by reverse market orders if the price breaks the middle MA.

## Strategy Logic

The strategy uses moving averages to determine the trend direction. Specifically, it determines the number of long limit orders based on whether the price breaks through the 3 up MA lines. And it determines the number of short limit orders based on whether the price breaks through the 3 down MA lines.

Thus, the stronger the trend, the more same-direction limit orders will be set. When the price shows reversal signals, reverse positions will be opened. The middle MA is used to judge the breakthrough of existing positions and generate close signals.

The whole strategy combines pyramid-style opening with breakthrough-style closing to form the trading logic. It aims to open positions at better average prices to reduce cost, and uses the middle MA for stop loss to control risks.

## Advantage Analysis 

The advantages of this strategy include:

1. Using MAs to determine trends, simple and intuitive to operate.

2. Pyramid-style opening can get better average prices at the early stage of trends.

3. The middle MA stop loss can timely stop losses and control risks.

4. Limit orders avoid slippages.

5. Customizable parameters adapt to different products. 

6. Clear structure, easy to understand and extend.

## Risk Analysis

The risks of the strategy include:

1. MA lagging may cause misjudgements. 

2. Failed limit orders may miss entry chances.

3. Middle MA stop loss may be too crude to judge breakthroughs.

4. Improper parameter settings may result in too large positions.

5. Insufficient backtest period may cause overfitting.

6. No consideration of transaction costs.

The solutions are:

1. Add other indicators for confirmation, optimize parameters.

2. Set expiry, adjust limit prices. 

3. Add profit taking or logic at middle MA stop loss.

4. Optimize parameters, evaluate risk-reward ratios.

5. Expand backtest period, multi-market backtests.

6. Add transaction costs and slippage logic.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize parameters for more products, using machine learning methods.

2. Add other indicators for confirmation, e.g. MACD, KDJ etc. 

3. Add profit taking logic at the middle MA line.

4. Dynamically adjust position sizes and stop loss levels.

5. Optimize limit prices for better entry costs, e.g. based on volatility.

6. Manage costs to prevent over-chasing trends.

7. Test parameters on different products to build parameter pools.

## Conclusion

This strategy opens pyramid-shaped positions with limit orders to achieve better average costs. It uses the middle MA for stop loss to control risks. The strategy structure is simple and clear, easy to understand and extend. But it can be improved by introducing other indicators, optimizing parameters, improving limit order logic etc to make it more robust. Overall, this strategy provides a simple and practical idea of limit order trading that holds some reference value.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Lot|
|v_input_2|3|MA Length|
|v_input_3|0|Data: 7. OHLC4|2. High|3. Low|4. Close|5. HL2|6. HLC3|1. Open|8. OC2|9. PCMA|
|v_input_4|true|short 3|
|v_input_5|true|short 2|
|v_input_6|true|short 1|
|v_input_7|true|long 1|
|v_input_8|true|long 2|
|v_input_9|true|long 3|
|v_input_10|15|Short line 3|
|v_input_11|10|Short line 2|
|v_input_12|5|Short line 1|
|v_input_13|-5|Long line 1|
|v_input_14|-10|Long line 2|
|v_input_15|-15|Long line 3|
|v_input_16|true|Offset|
|v_input_17|1900|From Year|
|v_input_18|2100|To Year|
|v_input_19|true|From Month|
|v_input_20|12|To Month|
|v_input_21|true|From day|
|v_input_22|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-15 00:00:00
end: 2023-09-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=4
strategy(title = "Robot WhiteBox MultiMA", shorttitle = "Robot WhiteBox MultiMA", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 3)

//Settings
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot")
len = input(3, minval = 1, title = "MA Length")
s = input(defval = "7. OHLC4", options = ["1. Open", "2. High", "3. Low", "4. Close", "5. HL2", "6. HLC3", "7. OHLC4", "8. OC2", "9. PCMA"], title = "Data")
short3 = input(true, title = "short 3")
short2 = input(true, title = "short 2")
short1 = input(true, title = "short 1")
long1 = input(true, title = "long 1")
long2 = input(true, title = "long 2")
long3 = input(true, title = "long 3")
shortlevel3 = input(15.0, title = "Short line 3")
shortlevel2 = input(10.0, title = "Short line 2")
shortlevel1 = input(5.0, title = "Short line 1")
longlevel1 = input(-5.0, title = "Long line 1")
longlevel2 = input(-10.0, title = "Long line 2")
longlevel3 = input(-15.0, title = "Long line 3")
needoffset = input(true, title = "Offset")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Variables
size = strategy.position_size
mult = 1 / syminfo.mintick
needtime = time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)

//MA
oc2 = (open + close) / 2
pcma = (highest(high, len) + lowest(low, len)) / 2
src = s == "1. Open" ? open : s == "2. High" ? high : s == "3. Low" ? low : s == "4. Close" ? close : s == "5. HL2" ? hl2 : s == "6. HLC3" ? hlc3 : s == "7. OHLC4" ? ohlc4 : s == "8. OC2" ? oc2: close
sma = sma(src, len)
ma = s == "9. PCMA" ? round(pcma * mult) / mult : round(sma * mult) / mult

//Levels
longline1 = long1 ? round(ma * ((100 + longlevel1) / 100) * mult) / mult : close
longline2 = long2 ? round(ma * ((100 + longlevel2) / 100) * mult) / mult : close
longline3 = long3 ? round(ma * ((100 + longlevel3) / 100) * mult) / mult : close
shortline1 = short1 ? round(ma * ((100 + shortlevel1) / 100) * mult) / mult : close
shortline2 = short2 ? round(ma * ((100 + shortlevel2) / 100) * mult) / mult : close
shortline3 = short3 ? round(ma * ((100 + shortlevel3) / 100) * mult) / mult : close

//Lines
colorlong1 = long1 ? color.lime : na
colorlong2 = long2 ? color.lime : na
colorlong3 = long3 ? color.lime : na
colorshort1 = short1 ? color.red : na
colorshort2 = short2 ? color.red : na
colorshort3 = short3 ? color.red : na
offset = needoffset ? 1 : 0
plot(shortline3, offset = offset, color = colorshort3, title = "Short line 3")
plot(shortline2, offset = offset, color = colorshort2, title = "Short line 2")
plot(shortline1, offset = offset, color = colorshort1, title = "Short line 1")
plot(ma, offset = offset, color = color.blue, title = "MA line")
plot(longline1, offset = offset, color = colorlong1, title = "Long line 1")
plot(longline2, offset = offset, color = colorlong2, title = "Long line 2")
plot(longline3, offset = offset, color = colorlong3, title = "Long line 3")

//Trading
lot = 0.0
lot := size == 0 ? strategy.equity / close * capital / 100 : lot[1]
lots = 0.0
if ma > 0
    lots := round(size / lot)
    strategy.entry("L1", strategy.long, lot, limit = longline1, when = (lots == 0 and long1 and needtime))
    lots := round(size / lot)
    strategy.entry("L2", strategy.long, lot, limit = longline2, when = (lots <= 1 and long2 and needtime))
    lots := round(size / lot)
    strategy.entry("L3", strategy.long, lot, limit = longline3, when = (lots <= 2 and long3 and needtime))
    lots := round(size / lot)
    strategy.entry("S1", strategy.short, lot, limit = shortline1, when = (lots == 0 and short1 and needtime))
    lots := round(size / lot)
    strategy.entry("S2", strategy.short, lot, limit = shortline2, when = (lots >= -1 and short2 and needtime))
    lots := round(size / lot)
    strategy.entry("S3", strategy.short, lot, limit = shortline3, when = (lots >= -2 and short3 and needtime))
if size > 0
    strategy.entry("TPL", strategy.short, 0, limit = ma)
if size < 0
    strategy.entry("TPS", strategy.long, 0, limit = ma)
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/427589

> Last Modified

2023-09-22 14:16:20
