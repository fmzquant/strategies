
> Name

Williams-Alligator-Scalping-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy is based on Bill Williams' Alligator indicator but uses Heiken Ashi candles as the price input. It is a short-term scalping strategy suitable for 1-minute to 5-minute timeframes.

## Strategy Logic

The key trading principles of the strategy are:

1. Using Heiken Ashi candles instead of regular candles for price action. Heiken Ashi filters noise and identifies trend.

2. Applying the three moving average lines from Bill Williams Alligator - Jaw, Teeth and Lips. They act like moving averages to determine trend direction.

3. When the lines are stacked as Jaw (lowest), Teeth (middle), Lips (highest), it signals an uptrend. When reversed with Jaw (highest), Teeth (middle), Lips (lowest), it signals a downtrend.

4. Entries are based on Heiken Ashi candle direction + Alligator line alignment. Long entries on bullish candles and bull setup; short entries on bearish candles and bear setup.

5. Exits when Alligator lines cross, signalling reversal of trend.

6. Fixed take profit, stop loss points used for risk management. Can configure target points, stop loss points, trailing stops etc.

Combining dual filters of Heiken Ashi and Alligator creates a high probability short term trading strategy.

## Advantages

The main advantages of the strategy are:

1. Dual indicator filtering minimizes false signals. Heiken Ashi + Alligator improves signal quality.

2. Clear and intuitive trend identification. Alligator lines have unambiguous bull/bear signals.

3. Efficient for short term scalping. Captures price swings on 1-min to 5-min charts.

4. Simple parameters. No complex optimization needed.

5. Strict risk management via take profit, stop loss points.  

6. Defined entry/exit rules based on Alligator line crosses.

7. Easy to implement and replicate. Beginner friendly.

## Risks

The main risks to consider are:

1. Drawdown risk from whipsaws. Frequent Alligator signals may increase trades and costs.

2. Range-bound market risk. Crossovers fail during choppy conditions.

3. Over-optimization risk. Curve fitting from bad parameter tuning.

4. Indicator failure risk. Alligator may stop working during extreme conditions. 

5. Stop loss slippage risk. Gaps can trigger stops causing unwarranted losses.

6. High trading frequency risks. More trades also increase transaction costs.

Expectancy analysis, optimized stops, controlled frequency etc. can address many of these risks.

## Enhancement Opportunities

Some ways to improve the strategy are:

1. Incorporate additional filters like RSI for higher win rate.

2. Use dynamic ATR stops to control loss per trade.

3. Add position sizing rules to optimize bet size. Increase with trend strength.

4. Combine chart patterns or other technical analysis for entry timing.

5. Optimize parameters based on instrument type (stocks, forex etc).

6. Introduce machine learning for adaptive parameter optimization.

7. Conduct expectancy analysis to fine tune profit take vs stop loss ratios. 

With continuous improvements, the strategy can become a robust short term trading system.

## Conclusion

The strategy combines Heiken Ashi with Williams' Alligator to create a high probability short term trading strategy. It benefits from dual indicator filtering, straightforward parameters, and well-defined entry/exit mechanics to effectively scalp trends and reversals. But whipsaws in ranging markets and stop loss risks need active management. With ongoing refinements, it can evolve into a relatively stable short term trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use heikin ashi candle?|
|v_input_2|true|Moving Average Calculation: (1=SMA), (2=EMA), (3=WMA), (4=Linear), (5=VWMA)|
|v_input_3|13|Jaw Length|
|v_input_4|8|Teeth Length|
|v_input_5|5|Lips Length|
|v_input_6|8|Jaw Offset|
|v_input_7|5|Teeth Offset|
|v_input_8|3|Lips Offset|
|v_input_9|false|Take Profit Points|
|v_input_10|false|Stop Loss Points|
|v_input_11|false|Trailing Stop Loss Points|
|v_input_12|false|Trailing Stop Loss Offset Points|
|v_input_13|false|Custom Backtesting Dates|
|v_input_14|2020|Backtest Start Year|
|v_input_15|true|Backtest Start Month|
|v_input_16|true|Backtest Start Day|
|v_input_17|false|Backtest Start Hour|
|v_input_18|2020|Backtest Stop Year|
|v_input_19|12|Backtest Stop Month|
|v_input_20|31|Backtest Stop Day|
|v_input_21|23|Backtest Stop Hour|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-18 00:00:00
end: 2023-09-24 00:00:00
period: 4d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © 03.freeman
//Scalping strategy based on Bill Williams Alligator technique but applied to heikin ashi candles
//This strategy has to be applied to standard candles and low time frames (1min to 5min)
//@version=4
strategy("Bill Williams Alligator improved", shorttitle="Scalping alligator",overlay=true)
//source = input(close)
useHA = input (true,"Use heikin ashi candle?")

// ----------MA calculation - ChartArt-------------
smoothinput = input(1, minval=1, maxval=5, title='Moving Average Calculation: (1=SMA), (2=EMA), (3=WMA), (4=Linear), (5=VWMA)')

calc_ma(src,l) => 
    smoothinput == 1 ? sma(src, l):smoothinput == 2 ? ema(src, l):smoothinput == 3 ? wma(src, l):smoothinput == 4 ? linreg(src, l,0):smoothinput == 5 ? vwma(src,l):na
//----------------------------------------------

heikinashi_close = security(heikinashi(syminfo.tickerid), timeframe.period, close)
heikinashi_open = security(heikinashi(syminfo.tickerid), timeframe.period, open)
heikinashi_hl2 = security(heikinashi(syminfo.tickerid), timeframe.period, hl2)

direzione=heikinashi_close>heikinashi_open and heikinashi_close[1]>heikinashi_open[1]? 1 : heikinashi_close<heikinashi_open and heikinashi_close[1]<heikinashi_open[1]? -1 : 0

jawLength = input(13, minval=1, title="Jaw Length")
teethLength = input(8, minval=1, title="Teeth Length")
lipsLength = input(5, minval=1, title="Lips Length")
jawOffset = input(8, title="Jaw Offset")
teethOffset = input(5, title="Teeth Offset")
lipsOffset = input(3, title="Lips Offset")
jaw = calc_ma(heikinashi_hl2, jawLength)
teeth = calc_ma(heikinashi_hl2, teethLength)
lips = calc_ma(heikinashi_hl2, lipsLength)
plot(jaw, title="jaw",offset = jawOffset, color=#3BB3E4)
plot(teeth, title="teeth",offset = teethOffset, color=#FF006E)
plot(lips, title="lips",offset = lipsOffset, color=#36C711)

longCondition = direzione[0]==1 and jaw<teeth and jaw<lips and teeth<lips 
shortCondition = direzione[0]==-1 and jaw>teeth and jaw>lips and teeth>lips


//  Strategy: (Thanks to JayRogers)
// === STRATEGY RELATED INPUTS ===
//tradeInvert     = input(defval = false, title = "Invert Trade Direction?")
// the risk management inputs
inpTakeProfit   = input(defval = 0, title = "Take Profit Points", minval = 0)
inpStopLoss     = input(defval = 0, title = "Stop Loss Points", minval = 0)
inpTrailStop    = input(defval = 0, title = "Trailing Stop Loss Points", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset Points", minval = 0)

// === RISK MANAGEMENT VALUE PREP ===
// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

// === STRATEGY - LONG POSITION EXECUTION ===
enterLong() => direzione[0]==1 and jaw<teeth and jaw<lips and teeth<lips // functions can be used to wrap up and work out complex conditions
exitLong() => jaw>teeth or jaw>lips or teeth>lips
strategy.entry(id = "Buy", long = true, when = enterLong() )    // use function or simple condition to decide when to get in
strategy.close(id = "Buy", when = exitLong() )                  // ...and when to get out

// === STRATEGY - SHORT POSITION EXECUTION ===
enterShort() => direzione[0]==-1 and jaw>teeth and jaw>lips and teeth>lips
exitShort() => jaw<teeth or jaw<lips or teeth<lips
strategy.entry(id = "Sell", long = false, when = enterShort())
strategy.close(id = "Sell", when = exitShort() )

// === STRATEGY RISK MANAGEMENT EXECUTION ===
// finally, make use of all the earlier values we got prepped
strategy.exit("Exit Buy", from_entry = "Buy", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Exit Sell", from_entry = "Sell", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)

// === Backtesting Dates === thanks to Trost

testPeriodSwitch = input(false, "Custom Backtesting Dates")
testStartYear = input(2020, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testStartHour = input(0, "Backtest Start Hour")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,testStartHour,0)
testStopYear = input(2020, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testStopHour = input(23, "Backtest Stop Hour")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,testStopHour,0)
testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false
isPeriod = true
// === /END

if not isPeriod
    strategy.cancel_all()
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/427811

> Last Modified

2023-09-25 17:42:27
