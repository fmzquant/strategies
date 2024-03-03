
> Name

基于卡片形态策略Candle-Patterns-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f2756b12da30f54255.png)
[trans]
## 概述

这是一个基于卡片形态的自动交易策略。该策略通过识别多种卡片形态信号,在符合形态条件时进行入场,并设置止损、止盈和跟踪止损来控制风险。

## 策略原理

该策略主要识别以下卡片形态作为入场信号:包裹形态、裹胁形态、对吞形态、启明星形态、黑云压城形态、孕线形态、三兵形态、梯底形态等。当检测到上述买入信号时,做多入场;当检测到卖出信号时,做空入场。

此外,策略还设置了止损、止盈和跟踪止损来控制风险。具体来说,止损点设定为入场价格的一定百分比下方,止盈点为入场价格以上的一定值,跟踪止损为入场价格以上的某一动态点。这可以有效防止超出可承受的损失。

需要强调的是,该策略还设置了交易时段,所有仓位会在策略定义的交易时段外平仓,防止隔夜风险。

## 优势分析

该策略最大的优势在于使用卡片形态这一有效技术指标作为入场依据。大量历史数据表明,当出现某些特定的K线形态时,很可能标志着需求供应关系和市场心理的转变,这为我们的入场提供了良好的时点。

另一个优势是设置了完善的风险控制机制。无论是止损、止盈还是跟踪止损,都可以最大限度防止超出可承受范围的损失,控制风险。

最后,策略运行灵活,可以通过调整形态参数和风险控制参数,适应不同品种和交易偏好。

## 风险分析

该策略最大的风险在于卡片形态作为技术指标本身的不稳定性。虽然卡片形态可以清晰反映市场变化趋势,但同时也容易受到市场随机波动的影响,出现错误信号的概率并不低。

此外,卡片形态与事后证实的价格变动之间,没有必然的因果关系。即使检测到典型形态,价格进入与形态预期相反的方向的概率也是存在的。

为降低上述风险,除了严格遵守止损、止盈和跟踪止损规则,也可以考虑与其他更稳定指标结合,避免单一技术指标引发的潜在风险。

## 优化方向  

考虑到卡片形态稳定性的局限性,后续可以尝试与更加稳健的指标相结合。例如布林带、移动平均线等趋势型指标,或者RSI、MACD等震荡指标。这可以用于过滤入场时机,减少噪音交易的概率。

另一个可能的优化方向是采用机器学习的方法。通过神经网络等对大量历史数据进行训练,建立形态与价格实际走势之间的统计关系模型。这可以提高形态信号的准确性。

最后,本策略可以作为基础框架,用更复杂的算法进行优化,以适应高频交易。例如更精细的止损方式,或者通过高级语言结合更多数据接口进行复杂建模等。

## 总结  

总的来说,本策略利用卡片形态这一有效技术指标作为信号入场,设置了完善的止损、止盈、跟踪止损逻辑控制风险,是一套值得实盘验证的策略。Coding Angle鼓励使用本策略作为基础框架进行优化,使之能够产生更好的实盘效果。

||

## Overview

This is an automatic trading strategy based on candlestick patterns. The strategy identifies various candlestick pattern signals and enters positions when pattern conditions are met, with stop loss, take profit and trailing stop configured to control risks.  

## Strategy Logic

The strategy mainly identifies the following candlestick patterns as entry signals: engulfing pattern, harami pattern, piercing line/dark cloud cover, morning star/evening star, belt hold pattern, three white soldiers/three black crows pattern, three stars in the south pattern, etc. It goes long when bullish signals are detected, and goes short when bearish signals are detected.

In addition, stop loss, take profit and trailing stop are configured for risk control. Specifically, stop loss is set at certain percentage below the entry price, take profit targets certain pips above entry price, and trailing stop trails at certain dynamic level above entry. This effectively prevents losses beyond acceptable amount.  

It's worth noting that all positions are closed outside the trading session defined in the strategy, eliminating overnight risks.

## Advantage Analysis

The biggest edge of this strategy lies in using candlestick patterns, an effective technical indicator, to determine entries. Vast historical data has shown that certain distinctive candle formations often signify shifts in demand/supply dynamics and market psychology, thus providing good timing for entries.  

Another advantage is the comprehensive risk control mechanisms in place. The stop loss, take profit and trailing stop could minimize losses beyond acceptable range substantially.

Finally, the strategy is flexible to run by tweaking pattern parameters and risk control parameters to suit different instruments and trading preferences.

## Risk Analysis

The biggest risk of this strategy comes from the inherent instability of candlestick patterns themselves as technical indicators. Although candle patterns can clearly reflect market trend changes, they are also susceptible to market random fluctuations, leading to potentially false signals.

Moreover, there are no causal relationships between candle formations and subsequent price actions. Prices can go against expected pattern outcomes even when typical patterns are detected. 

To mitigate above risks, strictly adhering to stop loss, take profit and trailing stop rules is essential. Combining candle patterns with other more stable indicators may also help avoid potential hazards resulting from sole reliance on technical patterns.

## Optimization Directions   

Given limitations of candle patterns, combining them with more robust indicators like Bollinger Bands, moving averages for trend, or oscillators like RSI and MACD could be worthwhile improving entry timing and signal quality.

Another prospective optimization direction is utilizing machine learning models trained on big historical data to uncover statistical relations between patterns and actual price movements, enhancing pattern signal accuracy.

Finally, this strategy could serve as a framework to be upgraded with more sophisticated algorithms for high-frequency trading, e.g. more delicate stop loss methods, complex modeling with more data interfaces through advanced languages.

## Conclusion   

In conclusion, this is a strategy worth live testing, using efficient candlestick patterns for signal entries, with comprehensive stop loss/take profit/trailing stop logic controlling risks. Coding Angle encourages optimizing based on this framework to generate better live results.

[/trans]

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
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 4h
basePeriod: 15m
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
t = time('240', sess)
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

https://www.fmz.com/strategy/442121

> Last Modified

2024-02-19 15:07:33
