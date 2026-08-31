
> Name

Candlestick-Pattern-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1749dc4c097500abdaf.png)

Candlestick Pattern Strategy

## Overview

The candlestick pattern strategy is a strategy that makes trading decisions based on candlestick patterns. This strategy can detect various common candlestick patterns, including engulfing patterns, harami patterns, morning stars, three black crows, etc., and generates trading signals when these patterns are detected. The strategy also supports custom stop loss, take profit, and trailing stop parameters to effectively control risks.

## Strategy Principle 

The core logic of this strategy is to identify different types of candlestick patterns through conditional judgments in Pine Script code. For example, the code logic to judge the engulfing pattern is:

```
bullish_engulfing = high[0]>high[1] and low[0]<low[1] and open[0]<open[1] and close[0]>close[1] and close[0]>open[0] and close[1]<close[2] and close[0]>open[1]  
```

The above logic judges the relationship between the high, low, open, close prices of the current K-line and previous two K-lines. If it meets the definition of engulfing pattern, it returns true. The judgments of other candlestick patterns are similar.  

When a qualified candlestick pattern is identified, the corresponding long or short trading signal variable will be set to true. Then during the trading session, the strategy will check if the trading signal is triggered. If triggered, it will place order and set stop loss, take profit and trailing stop to control risks.

## Advantage Analysis

- Support many common candlestick patterns, wide coverage
- Customizable risk control parameters, high flexibility
- Contains multiple plotting tools to clearly identify patterns  
- Combine with true trend of K-lines to avoid being trapped

## Risks and Solutions

- Candlestick patterns are not always reliable signals

  Solution: Combine with trend indicators, avoid using during range-bound markets

- A single pattern may have false signals

  Solution: Appropriately filter out signals from very short-term patterns 

- Improper parameter settings may amplify losses

  Solution: Strictly set stop loss and take profit parameters based on risk tolerance

## Optimization Directions

- Add trend judgment to avoid patterns against the trend
- Filter signals with other indicators 
- Optimize pattern parameters to reduce false signals
- Combine machine learning algorithms to build more reliable pattern recognition

## Summary

The candlestick pattern strategy identifies short-term turning points using technical analysis graphics, which is a common short-term strategy. This strategy supports multiple patterns and customizable risk control, very flexible to use. But the reliability of pattern signals is not high. It cannot be used alone and needs to work with trend and other factors to maximize its value.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Engulfing|
|v_input_2|true|Harami|
|v_input_3|true|Piercing Line / Dark Cloud Cover|
|v_input_4|true|Morning Star / Evening Star |
|v_input_5|true|Belt Hold|
|v_input_6|true|Three White Soldiers / Three Black Crows|
|v_input_7|true|Three Stars in the South|
|v_input_8|true|Stick Sandwich|
|v_input_9|true|Meeting Line|
|v_input_10|true|Kicking|
|v_input_11|true|Ladder Bottom|
|v_input_12|100|Stop Loss|
|v_input_13|1000|Take Profit|
|v_input_14|40|Trailing Stop|
|v_input_15|0000-0000|Trading session|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-11-24 02:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

//DanyChe
//The script allows you to test popular candlestick patterns on various instruments and timeframes. In addition, you can configure risk management (if the value is zero, it means the function is disabled), and you can also specify the time of the trading session (for example, so that the positions are not transferred to the next day). 
//The author is grateful to JayRogers and Phi35, their code examples helped a lot in writing the strategy.
strategy("Candle Patterns Strategy", shorttitle="CPS", overlay=true)

//--- Patterns Input ---

OnEngulfing = input(defval=true, title="Engulfing")
OnHarami = input(defval=true, title="Harami")
OnPiercingLine = input(defval=true, title="Piercing Line / Dark Cloud Cover")
OnMorningStar = input(defval=true, title="Morning Star / Evening Star ")
OnBeltHold = input(defval=true, title="Belt Hold")
OnThreeWhiteSoldiers = input(defval=true, title="Three White Soldiers / Three Black Crows")
OnThreeStarsInTheSouth = input(defval=true, title="Three Stars in the South")
OnStickSandwich = input(defval=true, title="Stick Sandwich")
OnMeetingLine = input(defval=true, title="Meeting Line")
OnKicking = input(defval=true, title="Kicking")
OnLadderBottom = input(defval=true, title="Ladder Bottom")

//--- Risk Management Input ---

inpsl = input(defval = 100, title="Stop Loss", minval = 0)
inptp = input(defval = 1000, title="Take Profit", minval = 0)
inptrail = input(defval = 40, title="Trailing Stop", minval = 0)
// If the zero value is set for stop loss, take profit or trailing stop, then the function is disabled
sl = inpsl >= 1 ? inpsl : na
tp = inptp >= 1 ? inptp : na
trail = inptrail >= 1 ? inptrail : na

//--- Session Input ---

sess = input(defval = "0000-0000", title="Trading session")
t = time('60', sess)
session_open = na(t) ? false : true

// --- Candlestick Patterns ---

//Engulfing 
bullish_engulfing = high[0]>high[1] and low[0]<low[1] and open[0]<open[1] and close[0]>close[1] and close[0]>open[0] and close[1]<close[2] and close[0]>open[1] ? OnEngulfing : na
bearish_engulfing = high[0]>high[1] and low[0]<low[1] and open[0]>open[1] and close[0]<close[1] and close[0]<open[0] and close[1]>close[2] and close[0]<open[1] ? OnEngulfing : na

//Harami
bullish_harami =  open[1]>close[1] and close[1]<close[2] and open[0]>close[1] and open[0]<open[1] and close[0]>close[1] and close[0]<open[1] and high[0]<high[1] and low[0]>low[1] and close[0]>=open[0] ? OnHarami : na
bearish_harami =   open[1]<close[1] and close[1]>close[2] and open[0]<close[1] and open[0]>open[1] and close[0]<close[1] and close[0]>open[1] and high[0]<high[1] and low[0]>low[1] and close[0]<=open[0] ? OnHarami : na

//Piercing Line/Dark Cloud Cover 
piercing_line = close[2]>close[1] and open[0]<low[1] and close[0]>avg(open[1],close[1]) and close[0]<open[1] ? OnPiercingLine : na
dark_cloud_cover = close[2]<close[1] and open[0]>high[1] and close[0]<avg(open[1],close[1]) and close[0]>open[1] ? OnPiercingLine : na

//Morning Star/Evening Star
morning_star = close[3]>close[2] and close[2]<open[2] and open[1]<close[2] and close[1]<close[2] and open[0]>open[1] and open[0]>close[1] and close[0]>close[2] and open[2]-close[2]>close[0]-open[0] ? OnMorningStar : na
evening_star = close[3]<close[2] and close[2]>open[2] and open[1]>close[2] and close[1]>close[2] and open[0]<open[1] and open[0]<close[1] and close[0]<close[2] and close[2]-open[2]>open[0]-close[0] ? OnMorningStar : na

//Belt Hold
bullish_belt_hold = close[1]<open[1] and low[1]>open[0] and close[1]>open[0] and open[0]==low[0] and close[0]>avg(close[0],open[0]) ? OnBeltHold :na
bearish_belt_hold =  close[1]>open[1] and high[1]<open[0] and close[1]<open[0] and open[0]==high[0] and close[0]<avg(close[0],open[0]) ? OnBeltHold :na

//Three White Soldiers/Three Black Crows 
three_white_soldiers = close[3]<open[3] and open[2]<close[3] and close[2]>avg(close[2],open[2]) and open[1]>open[2] and open[1]<close[2] and close[1]>avg(close[1],open[1]) and open[0]>open[1] and open[0]<close[1] and close[0]>avg(close[0],open[0]) and high[1]>high[2] and high[0]>high[1] ? OnThreeWhiteSoldiers : na
three_black_crows =  close[3]>open[3] and open[2]>close[3] and close[2]<avg(close[2],open[2]) and open[1]<open[2] and open[1]>close[2] and close[1]<avg(close[1],open[1]) and open[0]<open[1] and open[0]>close[1] and close[0]<avg(close[0],open[0]) and low[1]<low[2] and low[0]<low[1] ? OnThreeWhiteSoldiers : na

//Three Stars in the South
three_stars_in_the_south = open[3]>close[3] and open[2]>close[2] and open[2]==high[2] and open[1]>close[1] and open[1]<open[2] and open[1]>close[2] and low[1]>low[2] and open[1]==high[1] and open[0]>close[0] and open[0]<open[1] and open[0]>close[1] and open[0]==high[0] and close[0]==low[0] and close[0]>=low[1] ? OnThreeStarsInTheSouth : na

//Stick Sandwich
stick_sandwich = open[2]>close[2] and open[1]>close[2] and open[1]<close[1] and open[0]>close[1] and open[0]>close[0] and close[0]==close[2] ? OnStickSandwich : na

//Meeting Line 
bullish_ml = open[2]>close[2] and open[1]>close[1] and close[1]==close[0] and open[0]<close[0] and open[1]>=high[0] ? OnMeetingLine : na
bearish_ml = open[2]<close[2] and open[1]<close[1] and close[1]==close[0] and open[0]>close[0] and open[1]<=low[0] ? OnMeetingLine : na

//Kicking 
bullish_kicking =  open[1]>close[1] and open[1]==high[1] and close[1]==low[1] and open[0]>open[1] and open[0]==low[0] and close[0]==high[0] and close[0]-open[0]>open[1]-close[1] ? OnKicking : na
bearish_kicking = open[1]<close[1] and open[1]==low[1] and close[1]==high[1] and open[0]<open[1] and open[0]==high[0] and close[0]==low[0] and open[0]-close[0]>close[1]-open[1] ? OnKicking : na

//Ladder Bottom
ladder_bottom = open[4]>close[4] and open[3]>close[3] and open[3]<open[4] and open[2]>close[2] and open[2]<open[3] and open[1]>close[1] and open[1]<open[2] and open[0]<close[0] and open[0]>open[1] and low[4]>low[3] and low[3]>low[2] and low[2]>low[1] ? OnLadderBottom : na

// ---Plotting ---

plotshape(bullish_engulfing, text='Engulfing', style=shape.triangleup, color=#1FADA2, editable=true, title="Bullish Engulfing Text")
plotshape(bearish_engulfing,text='Engulfing', style=shape.triangledown, color=#F35A54, editable=true, title="Bearish Engulfing Text")
plotshape(bullish_harami,text='Harami', style=shape.triangleup, color=#1FADA2, editable=true, title="Bullish Harami Text")
plotshape(bearish_harami,text='Harami', style=shape.triangledown, color=#F35A54, editable=true, title="BEarish Harami Text")
plotshape(piercing_line,text='Piercing Line', style=shape.triangleup, color=#1FADA2, editable=false)
plotshape(dark_cloud_cover,text='Dark Cloud Cover', style=shape.triangledown, color=#F35A54, editable=false)
plotshape(morning_star,text='Morning Star', style=shape.triangleup, color=#1FADA2, editable=false)
plotshape(evening_star,text='Evening Star', style=shape.triangledown, color=#F35A54, editable=false)
plotshape(bullish_belt_hold,text='Belt Hold', style=shape.triangleup, color=#1FADA2, editable=false)    
plotshape(bearish_belt_hold,text='Belt Hold', style=shape.triangledown, color=#F35A54, editable=false)
plotshape(three_white_soldiers,text='Three White Soldiers', style=shape.triangleup, color=#1FADA2, editable=false)
plotshape(three_black_crows,text='Three Black Crows', style=shape.triangledown, color=#F35A54, editable=false)
plotshape(three_stars_in_the_south,text='3 Stars South', style=shape.triangleup, color=#1FADA2, editable=false)
plotshape(stick_sandwich,text='Stick Sandwich', style=shape.triangleup, color=#1FADA2, editable=false)
plotshape(bullish_ml,text='Meeting Line', style=shape.triangleup, color=#1FADA2, editable=false)
plotshape(bearish_ml,text='Meeting Line', style=shape.triangledown, color=#F35A54, editable=false)
plotshape(bullish_kicking,text='Kicking', style=shape.triangleup, color=#1FADA2, editable=false)
plotshape(bearish_kicking,text='Kicking', style=shape.triangledown, color=#F35A54, editable=false)
plotshape(ladder_bottom,text='Ladder Bottom', style=shape.triangleup, color=#1FADA2, editable=false)

// --- STRATEGY ---

SignalUp = bullish_engulfing or bullish_harami or piercing_line or morning_star or bullish_belt_hold or three_white_soldiers or three_stars_in_the_south or stick_sandwich or bullish_ml or bullish_kicking or ladder_bottom
SignalDown = bearish_engulfing or bearish_harami or dark_cloud_cover or evening_star or bearish_belt_hold or three_black_crows or bearish_ml or bearish_kicking

strategy.entry("long", true, when = SignalUp and session_open)
strategy.entry("short", false, when = SignalDown and session_open)
strategy.close("long", when = not session_open)
strategy.close("short", when = not session_open)
strategy.exit("Risk Exit long", from_entry = "long", profit = tp, trail_points = trail, loss = sl)
strategy.exit("Risk Exit short", from_entry = "short", profit = tp, trail_points = trail, loss = sl )
```

> Detail

https://www.fmz.com/strategy/433452

> Last Modified

2023-11-27 18:26:52
