
> Name

Bollinger-Band-Limit-Market-Maker-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/182d2da53252b30f088.png)

## Overview

This is a market maker strategy that uses Bollinger Bands as entries, moving average as closes, and simple percentage stop loss. It was extremely profitable on the XBTUSD contract in June 2022.  

## Strategy Logic

The strategy uses the upper and lower bands of Bollinger Bands as opportunity areas to enter positions. Specifically, when the price is below the lower band, it will long to open long positions; when the price is above the upper band, it will short to open short positions.

In addition, the strategy also uses moving average as the benchmark for closing positions. When holding long positions, if the price is above the moving average, it will choose to close longs; similarly, when holding short positions, if the price is below the moving average, it will also choose to close shorts.


For stop loss, it uses a simple percentage trailing stop loss based on the entry price. This can effectively avoid huge losses in trending markets.


## Advantage Analysis

The main advantages of this strategy are:

1. Using Bollinger Bands can effectively capture price volatility and get more trading opportunities when volatility increases.  
2. Market maker strategies can benefit from the bid-ask spread by trading both sides.
3. Percentage stop loss can proactively control risks and avoid huge losses in trending markets.


## Risk Analysis

There are also some risks with this strategy:   

1. Bollinger Bands are not always reliable entry signals and can give false signals sometimes.  
2. Market maker strategies are vulnerable to being whipsawed in ranging markets.
3. Percentage stop loss may be too brute force and unable to adapt to complex market situations.

To mitigate these risks, we may consider adding other filters, optimizing stop loss settings, or properly limiting position sizes.  

## Optimization Directions

There is room for further optimization:

1. We can test different parameter combinations to find the optimal parameters.
2. We can add more filters for multi-factor verification.  
3. We can use machine learning methods to auto-optimize parameters.
4. We can consider more sophisticated stop loss methods like parabolic SAR.

## Conclusion  

Overall this is a very profitable high-frequency market making strategy. It capitalizes on Bollinger Bands for trading signals and controls risk. But we also need to be aware of its flaws and verify carefully in live trading. With further optimizations, this strategy has the potential to generate even more stable and outsized returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|length|
|v_input_2_hlc3|0|Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_3|44|bb mult (0.1%)|
|v_input_4|0|Trend source: sma|ema|rma|wma|
|v_input_5|0|Dev source: stdev|dev|
|v_input_6|0.5|Spread|
|v_input_7|true|Pyramiding|
|v_input_8|true|useStopLoss|
|v_input_9|15|StopLoss 0.1%|
|v_input_10|false|Custom Backtesting Dates|
|v_input_11|2018|Backtest Start Year|
|v_input_12|true|Backtest Start Month|
|v_input_13|true|Backtest Start Day|
|v_input_14|false|Backtest Start Hour|
|v_input_15|2018|Backtest Stop Year|
|v_input_16|12|Backtest Stop Month|
|v_input_17|14|Backtest Stop Day|
|v_input_18|14|Backtest Stop Hour|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-24 00:00:00
end: 2024-01-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(shorttitle="BBL", title="BB limit", overlay = true)


length = input(200, minval=1)
src = input(hlc3, title="Source")
xmult = input(44, minval=0.001, maxval=5000, title = "bb mult (0.1%)")
s = input(title="Trend source", defval = "sma", options = ["ema", "sma", "rma", "wma"])
basis = s == "ema" ? ema(src, length) : s == "sma" ? sma(src, length) : s =="rma" ? rma(src, length) : wma(src, length)
sd = input(title="Dev source", defval = "stdev", options = ["stdev", "dev"])
mult = xmult / 10  
dev = sd == "stdev" ? mult * stdev(src, length) : mult * dev(src, length)
diff = input(0.5, title = "Spread")
LongPrice(p) =>
    LongPrice = diff == 0 ? p : floor(p / diff) * diff

ShortPrice(p) =>
    ShortPrice = diff == 0 ? p : ceil(p / diff) * diff

pyr = input(1, title = "Pyramiding")
useStopLoss = input(true)
stoploss_xmult = input(15, minval=0.001, maxval=5000, title = "StopLoss 0.1%")
stopLoss_mult = sd == "simple" ? 1 + stoploss_xmult / 10 / 100 : stoploss_xmult / 10  
dev2 = sd == "stdev" ? stopLoss_mult * stdev(src, length) : sd == "dev" ? stopLoss_mult * dev(src, length) : (stopLoss_mult - 1) * basis
upper = basis + (1*dev)
lower = basis - (1*dev)
plot(basis, color=fuchsia, linewidth=2)
plot(upper, color=green, linewidth=2)
plot(lower, color=green, linewidth=2)


strategy.cancel_all()

if strategy.position_size > 0 and close <= basis + diff * 2
    strategy.order("Close long", strategy.short, strategy.position_size, limit = ShortPrice(basis))
else 
    if strategy.position_size < 0 and close >= basis - diff * 2
        strategy.order("Close short", strategy.long, -strategy.position_size, limit = LongPrice(basis))
            
stopLossPrice1 = na
stopLossPrice2 = na
add = na
openOrderCondition = close > lower - 2 * diff and (strategy.opentrades < pyr or (strategy.position_size < 0 and strategy.position_avg_price > lower * (1 + stopLoss_mult / 100)))
if openOrderCondition
    add := strategy.position_size > 0 ? -strategy.position_size : close >= basis - diff * 2 ? 0 : -strategy.position_size
    strategy.order("Open long", strategy.long, strategy.equity / pyr / lower + add, limit = LongPrice(lower))
if useStopLoss and (strategy.position_size > 0 or openOrderCondition)
    add = openOrderCondition ? strategy.equity / pyr / lower : 0
    posPrice = strategy.position_size <= 0 ? lower : strategy.position_avg_price
    posSize = strategy.position_size <= 0 ? 0 : strategy.position_size
    stopLossPrice1 := posPrice * (1 - stopLoss_mult / 100)
    strategy.order("StopLoss open short ", strategy.short, posSize + add + strategy.equity / pyr / stopLossPrice1, stop = ShortPrice(stopLossPrice1))


openOrderCondition := close < upper + 2 * diff and (strategy.opentrades < pyr or (strategy.position_size > 0 and strategy.position_avg_price * (1 + stopLoss_mult / 100) < upper))
if openOrderCondition
    add := strategy.position_size < 0 ? strategy.position_size : close <= basis + diff * 2 ? 0 : strategy.position_size
    strategy.order("Open short", strategy.short, strategy.equity / pyr / upper + add, limit = ShortPrice(upper))
if useStopLoss and (strategy.position_size < 0 or openOrderCondition)
    add = openOrderCondition ? strategy.equity / pyr / upper : 0
    posPrice = strategy.position_size >= 0 ? upper : strategy.position_avg_price
    posSize = strategy.position_size >= 0 ? 0 : -strategy.position_size
    stopLossPrice2 := posPrice * (1 + stopLoss_mult / 100)
    strategy.order("StopLoss open long", strategy.long, posSize + add + strategy.equity / pyr / stopLossPrice2, stop = LongPrice(stopLossPrice2))

plot(not useStopLoss ? na : stopLossPrice1, color=red, linewidth=2)
plot(not useStopLoss ? na : stopLossPrice2, color=red, linewidth=2)

// === Backtesting Dates ===
testPeriodSwitch = input(false, "Custom Backtesting Dates")
testStartYear = input(2018, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testStartHour = input(0, "Backtest Start Hour")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,testStartHour,0)
testStopYear = input(2018, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(14, "Backtest Stop Day")
testStopHour = input(14, "Backtest Stop Hour")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,testStopHour,0)
testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false
isPeriod = testPeriodSwitch == true ? testPeriod() : true
// === /END
if not isPeriod
    strategy.cancel_all()
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/439829

> Last Modified

2024-01-24 11:05:56
