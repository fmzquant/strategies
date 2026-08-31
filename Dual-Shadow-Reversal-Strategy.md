
> Name

Dual-Shadow-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10d2dc400446c6ab7b8.png)


## Overview

The Dual Shadow Reversal strategy is a short-term trading strategy based on candlestick patterns. It identifies potential reversal opportunities by detecting the special candlestick pattern where two consecutive candles have no shadows. The strategy is simple and straightforward to implement but also has certain risks to note.   

## Principle 

The core logic of this strategy is to identify the "dual shadow" pattern. Specifically, it checks if the current candle meets the condition of "open equals low, close equals high", meaning no lower or upper shadows, which is known as a shadowless candle. If the previous candle also meets this criteria, it signals two consecutive shadowless candles, or the "dual shadow" pattern.

According to technical analysis theory, this dual shadow pattern often suggests an impending trend reversal. The price fluctuating within a very narrow range on two consecutive candles indicates the equalization of buying and selling forces, which hints at a likely reversal.

Upon detecting the dual shadow pattern, the strategy will enter long or short at the next candle's open based on the previous close. And close the position after a set number of bars.

## Advantages

- The strategy logic is straightforward and easy to understand, with simple pattern recognition that is easy to implement.

- It utilizes the classical dual shadow reversal pattern which has some technical analysis rationale. 

- Infrequent trading helps reduce costs and risks.

- Easy to add backtesting features and optimize parameters.

## Risks

- Pattern trading relies on historical chart statistics and probabilities, and deviations can happen.

- Although dual shadows suggest reversal, the actual reversal may not occur or sustain. 

- The fixed profit-taking zone may not cope well with fast-moving markets.

- Looking at limited candle information can lead to over-eager entries.

## Enhancement Ideas

- Incorporate trend indicators to avoid countertrend trades.

- Use wait-for-confirmation entries to confirm actual reversal. 

- Set dynamic stop loss based on ATR instead of fixed duration.

- Use machine learning to determine which dual shadow patterns are more reliable.

## Summary

The dual shadow reversal strategy leverages the classic concept of pattern trading in a simple and intuitive way, suitable for beginners while also serving as a modular component for algos. But risk management is still essential, and the strategy can be improved by optimizing entry timing and take-profit methods. Overall, the pros and cons of this strategy are quite apparent for reference.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Bars Until Close|
|v_input_2|true|Backtest on Twice alert?|
|v_input_3|2017|Backtest Start Year|
|v_input_4|true|Backtest Start Month|
|v_input_5|2|Backtest Start Day|
|v_input_6|2019|Backtest Stop Year|
|v_input_7|7|Backtest Stop Month|
|v_input_8|30|Backtest Stop Day|
|v_input_9|true|Color Background?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-30 00:00:00
end: 2023-11-06 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("No Shadow Candles", overlay=true)

//set inputs
bars_until_close_trade = input(1,"Bars Until Close", minval = 1)
backtest_option = input(true,"Backtest on Twice alert?", bool)

//set conditions
up = close > close[1] and low >= open and high <= close
down = close < close[1] and low >= close and high <= open

up2 = (close > close[1] and low >= open and high <= close) and (close[1] > close[2] and low[1] >= open[1] and high[1] <= close[1])
down2 = (close < close[1] and low >= close and high <= open) and (close[1] < close[2] and low[1] >= close[1] and high[1] <= open[1])

close_trade = barssince(up or down) == bars_until_close_trade
close_trade2 = barssince(up2 or down2) == bars_until_close_trade

//plot indicators
plotshape(up,"Up Marker", shape.triangleup, location.belowbar, color = olive, size = size.tiny, transp = 50)
plotshape(down,"Down Marker", shape.triangledown, location.abovebar, color = orange, size = size.tiny, transp = 50)
plotshape(up2,"Up Twice Marker", shape.triangleup, location.belowbar, color = white, size = size.small)
plotshape(down2,"Down Twice Marker", shape.triangledown, location.abovebar, color = white, size = size.small)
plotshape(close_trade,"Close Trigger", shape.circle, location.belowbar, color = fuchsia, size = size.tiny, transp = 50)
plotshape(close_trade2,"Close Trigger2 (After Twice Alert)", shape.circle, location.belowbar, color = red, size = size.small)

//Strategy Testing


// Component Code Start
// Example usage:
// if testPeriod()
//   strategy.entry("LE", strategy.long)
testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(01, "Backtest Start Month")
testStartDay = input(2, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(7, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() => true
// Component Code Stop

//Entry and Close settings
if testPeriod() and backtest_option == true
    strategy.entry("up2", true, when = up2, limit = close)
    strategy.close("up2", when = close_trade)

if testPeriod() and backtest_option == false
    strategy.entry("up", true,  when = up, limit = close)
    strategy.close("up", when = close_trade)

```

> Detail

https://www.fmz.com/strategy/431425

> Last Modified

2023-11-07 17:00:52
