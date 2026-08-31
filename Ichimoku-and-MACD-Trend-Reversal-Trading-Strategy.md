
> Name

Ichimoku-and-MACD-Trend-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines Ichimoku and MACD indicators, entering trades after confirming trend reversal. It belongs to trend reversal trading strategies.

## Strategy Logic 

1. Calculate Ichimoku Tenkan line to gauge trend direction. Price above it indicates uptrend, and below downtrend.

2. MACD death cross generates sell signal in uptrend; golden cross buy signal in downtrend.

3. Combine Ichimoku trend bias and MACD reversal signals to trade trend reversals. 

4. Option to set trading hour control, like no trading at night or weekends, to avoid risks associated with certain times.

5. Employ proper stop loss and take profit for profit locking and risk control.

## Advantages

1. Ichimoku intuitively displays trends and support/resistance levels.

2. MACD sensitively captures trend reversals.

3. Combining trend bias and reversal improves signal quality. 

4. Customizable trading hours avoid risks around major news events.

5. Stop loss and take profit effectively manages capital risks.

## Risks

1. Ichimoku and MACD may generate false signals.

2. Reversal strength unknown, risks of chasing tops and bottoms.

3. Trading hour control may miss some opportunities. 

4. Improper stop loss and take profit settings lead to premature exit. 

5. Parameter optimization may lead to overfitting.

## Enhancement

1. Test Ichimoku and MACD parameters for optimal combinations.

2. Add other indicators to confirm trading signals.

3. Optimize stops and profits to balance risks and returns.

4. Evaluate necessity of trading hour control and relax if appropriate.

5. Incorporate trend filter to avoid losses from reversal trades. 

6. Research ways to gauge reversal strength and potential pullback height.

## Conclusion

This strategy combines Ichimoku's trend bias and MACD's reversal signals to trade after trend reversals. Further optimization and enhancements can reduce signal errors and improve stability and efficiency as a robust trend reversal system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|IchimokuTenkanPeriod|
|v_input_2|190|IchimokuKijunPeriod|
|v_input_3|52|IchimokuSenkouPeriod|
|v_input_4|3|MACDMainFast|
|v_input_5|10|MACDMainSlow|
|v_input_6|9|MACDMainSmooth|
|v_input_7|2|ExitAfterBars|
|v_input_8|135|ProfitTarget|
|v_input_9|70|StopLoss|
|v_input_10|true|DontTradeOnWeekends|
|v_input_11|true|ExitAtEndOfDay|
|v_input_12|23|DayExitTimeHour|
|v_input_13|4|DayExitTimeMinute|
|v_input_14|true|ExitOnFriday|
|v_input_15|20|FridayExitTimeHour|
|v_input_16|40|FridayExitTimeMinute|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-13 00:00:00
end: 2023-09-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Revazi

//@version=5
strategy("The Impeccable by zyberal", overlay = true)

// Inputs {
// Strategy variables
IchimokuTenkanPeriod = input(9)
IchimokuKijunPeriod = input(190)
IchimokuSenkouPeriod = input(52)
MACDMainFast = input(3)
MACDMainSlow = input(10)
MACDMainSmooth = input(9)
ExitAfterBars = input(2)
ProfitTarget = input(135)
StopLoss = input(70)

// Trading Options
DontTradeOnWeekends = input(true)
ExitAtEndOfDay = input(true)
DayExitTimeHour   = input(23)
DayExitTimeMinute = input(04)

ExitOnFriday = input(true)
FridayExitTimeHour   = input(20)
FridayExitTimeMinute = input(40)

// }



// TRADING OPTIONS LOGIC {
OpenOrdersAllowed = true

// Dont trade on weekends {
if DontTradeOnWeekends
    if dayofweek == dayofweek.saturday or
       dayofweek == dayofweek.sunday
        OpenOrdersAllowed := false
// }

// Exit on close (end of day) {
if ExitAtEndOfDay
    if timeframe.isintraday and
       time >= timestamp(year(timenow), month(timenow), dayofmonth(timenow), DayExitTimeHour, DayExitTimeMinute)
        OpenOrdersAllowed := false
// }

// Exit on Friday {
if ExitOnFriday
    if timeframe.isintraday and
       time >= timestamp(year(timenow), month(timenow), dayofmonth(timenow), FridayExitTimeHour, FridayExitTimeMinute)
        OpenOrdersAllowed := false
// }


// Rule: Trading signals {
openW3 = request.security(syminfo.tickerid, "W", open)[3]

middleDonchian(Length) => math.avg(ta.highest(Length), ta.lowest(Length))
Tenkan = middleDonchian(IchimokuTenkanPeriod)[2]

[macdLine, signalLine, _] = ta.macd(close, MACDMainFast, MACDMainSlow, MACDMainSmooth)

LongEntrySignal = openW3 > Tenkan and ta.crossunder(macdLine, signalLine)[3] //macdLine[3] < signalLine[3]
ShortEntrySignal = openW3 < Tenkan and ta.crossover(macdLine, signalLine)[3] //macdLine[3] > signalLine[3]
// }



// Calculate conditions {
IsFlat() => strategy.position_size == 0
IsLong() => strategy.position_size > 0
IsShort() => strategy.position_size < 0

longCondition  = OpenOrdersAllowed and not IsLong() and LongEntrySignal
shortCondition = OpenOrdersAllowed and not IsShort() and ShortEntrySignal

// }

// Open positions based on conditions {
strategy.order(id = "buy", direction = strategy.long, qty = 1, when = longCondition)
strategy.order(id = "sell", direction = strategy.short, qty = 1, when = shortCondition)
// }


```

> Detail

https://www.fmz.com/strategy/427385

> Last Modified

2023-09-20 15:44:13
