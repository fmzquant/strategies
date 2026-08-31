
> Name

Kana-Candle-Breakout-Strategy-Based-on-Moving-Average-and-Support-Resistance

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ccff99525065a65da5.png)


## Overview

This is a fast breakout strategy based on Japanese candlestick technical analysis, combined with moving average indicators and support resistance indicators to determine trend and position. Its main idea is to wait for a fast price breakout and take profit quickly after the confirmation of moving average and trend indicators.  

## Strategy Logic

The strategy uses a 20-period simple moving average (SMA) and a 200-period exponential moving average (EMA) to determine the trend direction. When the price is in an uptrend (SMA above EMA), and the current Japanese candlestick real body closes above the open (white body), it indicates strengthened buying power. When the price is in a downtrend (SMA below EMA), and the current Japanese candlestick real body closes below the open (black body), it indicates strengthened selling pressure.

With the confirmation of trend and momentum, the strategy waits for a fast price breakout and enters the market. The so-called “breakout” means the price “crosses over” the first channel line of the three preset ATR channels (calculated based on 200-day ATR and coefficients) and enters the second channel line. This is a high probability breakout signal.

After entering the market, the profit taking and stop loss rules are very simple. As long as the price touches the outer bounds of the channel (such as take profit line or stop loss line), it will take profit or stop loss immediately. This ensures fast gains of the strategy.  

## Advantage Analysis 

The biggest advantage of this strategy is fast profit-taking with relatively small risk. By entering the market quickly after breakout, it avoids multiple adjustments of positions. And the accelerating effect brought by channel breakout allows large profits in a short period of time.  

Compared with long-term holding, such efficient opening and closing mechanics can significantly reduce the idling rate of the strategy and further improve capital efficiency. At the same time, the fast profit-taking and stop-loss mechanism can also effectively control single loss.

## Risk Analysis

The strategy mainly relies on moving average indicators to determine the trend direction, with the risk of pullback and consolidation. When the price oscillates within the channel, it may lead to ultra short-term reverse opening and loss. 

In addition, the strategy relies too much on technical indicators without combining fundamental and significant event analysis. In case of black swan events, the technical indicators would fail and the strategy may suffer major losses.

To control risks, we can appropriately expand the channel range to reduce opening frequency; or add position management module to dynamically adjust single position based on total capital.

## Optimization  

The strategy can be optimized in the following aspects:

1. Add position management module. Dynamically adjust single opening position based on account size to control single loss percentage.

2. Add fundamental filtering. When technical indicators trigger opening signals, check company fundamentals and significant events to avoid abnormalities. 

3. Combine stock pool management. Set rules to dynamically adjust stock pool. Select optimal stock pool in different stages to improve stability.  

4. Combine machine learning models. Use AI to predict trends and key price levels, assisting in determining channel range and entry timing.

## Conclusion  

The strategy features simplicity and efficiency. It determines major trend with moving averages, momentum direction with Japanese candles, enters with fast breakout, and exits with quick profit taking and stop loss. It allows short-term gains suitable for high frequency trading. But it also has the risk of drawdown and uncertainty. Continuous optimization can make the strategy stable under different market environments.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2|true|multiplier1|
|v_input_3|2|multiplier2|
|v_input_4|3|multiplier3|
|v_input_5|240|Support Resistance TimeFrame|
|v_input_6|true|Use Support/Resistance|
|v_input_7|0.5|Take Profit Percent|
|v_input_8|false|Use Take Profit|
|v_input_9_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-26 00:00:00
end: 2023-12-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Kana with S/R Strategy", title = "KANA with S/R", overlay=true)

len = input(20, minval=1, title="Length")
multiplier1 = input(1, minval=1, title="multiplier1")
multiplier2 = input(2, minval=1, title="multiplier2")
multiplier3 = input(3, minval=1, title="multiplier3") 
srTimeFrame = input(240, minval=1, title="Support Resistance TimeFrame")
useSR = input(true, type = bool, title="Use Support/Resistance")
tpPercent = input(0.5, type=float, title = "Take Profit Percent")
useTP = input(false, type=bool, title = "Use Take Profit")
tp = (close * tpPercent / 100) / syminfo.mintick

src = input(close, title="Source")
mid = sma(src, len)
plot(mid, title="SMA", color=blue)

trend = ema(close, 200)
plot(trend, title="Trend", color=green)


upper1 = mid + atr(200) * multiplier1
upper2 = mid + atr(200) * multiplier2
upper3 = mid + atr(200) * multiplier3

lower1 = mid - atr(200) * multiplier1
lower2 = mid - atr(200) * multiplier2
lower3 = mid - atr(200) * multiplier3

plot(upper1, color = orange)
plot(upper3, color = red)

plot(lower1, color = orange)
plot(lower3, color = red)

haClose = request.security(heikinashi(syminfo.tickerid), timeframe.period, close)
haOpen = request.security(heikinashi(syminfo.tickerid), timeframe.period, open)

resistance = request.security(syminfo.tickerid,tostring(srTimeFrame), high)
support  = request.security(syminfo.tickerid,tostring(srTimeFrame), low)
rsPos = (close - support[srTimeFrame]) / (resistance[srTimeFrame] - support[srTimeFrame])

MACD = ema(close, 120) - ema(close, 260)
aMACD = ema(MACD, 90)
hisline = MACD - aMACD

longCondition = (mid > trend) and (haOpen[1] < haClose[1]) and (mid > mid[1]) and (close < upper1) and hisline > 0 and (useSR == true ? (rsPos > 100) : true)
shortCondition = (mid < trend) and (haOpen[1] > haClose[1]) and (mid < mid[1]) and (close > lower1) and hisline < 0 and (useSR == true ? (rsPos < 0) : true)

longExit = (close > upper3 ) or (close < lower2)
shortExit = (close < lower3) or (close > upper2)

if (longCondition)
    strategy.entry("Long", strategy.long)
    if (useTP)
        strategy.exit("Exit Long", "Long", profit = tp)
        
if (longExit)
    strategy.close("Long")
    
if (shortCondition)
    strategy.entry("Short", strategy.short)
    if (useTP)
        strategy.exit("Exit Short", "Short", profit = tp)
    
if (shortExit)
    strategy.close("Short")
```

> Detail

https://www.fmz.com/strategy/436764

> Last Modified

2023-12-27 15:27:45
