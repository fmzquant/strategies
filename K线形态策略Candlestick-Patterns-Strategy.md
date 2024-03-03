
> Name

K线形态策略Candlestick-Patterns-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11526096a58c40483c7.png)
 [trans]
## 概述

本策略通过识别K线图中的多种价格形态模式来确定买入和卖出信号。该策略结合了缠论、道氏理论等技术分析方法,利用十几种常见的图形模式来捕捉市场的转折点。

## 策略原理

该策略的核心在于识别不同的K线形态,包括包裹线、哈拉米线、刺穿线、晨星线等。当识别到阳线形态时,产生买入信号;当识别到阴线形态时,产生卖出信号。

比如,当识别到三只白兵形态时,说明前三根K线都是长阳线,并且每根K线收盘价都超过开盘价,代表强势的买盘推高股价,所以产生买入信号。

每个形态都有特定的算法来识别。策略会遍历历史K线,判断每个bar是否满足某种形态的构造算法,一旦满足则在对应的bar绘制图形标记出该信号。

## 策略优势

1. 结合多种形态判断,提高胜率
2. 自动识别形态,无需人工判断
3. 采用可视化标记,直观明了
4. 结合止损止盈机制控制风险

## 风险及优化

1. 形态失败概率存在,无法完全避免亏损
2. 可适当调整止损比例,降低单次损失
3. 可加入趋势判断,避免反向形态
4. 可优化交易时段设置,减少隔夜风险

## 优化建议

1. 加入更多辅助形态判断
2. 结合趋势指标过滤信号
3. 优化止损止盈比例
4. 可尝试机器学习方法识别形态
5. 加入开仓量控制

## 总结

本策略通过图形技术分析,识别K线上的多种关键形态,判断市场的未来走势。策略具有较强的实用性,但交易者还需要关注大盘环境,避免因局部形态而错失大趋势。通过进一步优化,有望提高策略的稳定性和盈利能力。

||

## Overview  

This strategy determines buy and sell signals by identifying various price pattern formations on the candlestick chart. The strategy incorporates technical analysis methods such as Chanlun and Dow Theories, utilizing more than a dozen common graphical patterns to capture inflection points in the market.

## Strategy Principle  

The core of this strategy lies in recognizing different candlestick patterns, including engulfing lines, harami lines, piercing lines, morning stars etc. When a bullish pattern is identified, a buy signal is generated; when a bearish pattern is detected, a sell signal is triggered. 

For example, when the Three White Soldiers pattern is recognized, it means that the last three candlesticks are all long green candles, and the closing price of each candle exceeds its opening price, indicating the strong buying is pushing up the price, so a buy signal is generated.

Each pattern has a specific algorithm to identify. The strategy scans through the historical candlesticks, judging if each bar meets the formulation algorithm of a certain pattern, and once it does, plot a graphical marker on that bar marking out that signal.

## Advantages  

1. Combining judgments of various patterns improves winning rate  
2. Automatically pattern recognition without manual interference
3. Visualized markers gives intuitiveness  
4. Controlling risks by integrating stop loss and take profit

## Risks and Optimization

1. Probability of failure still exists for patterns identification
2. Fine tune the stop loss ratio properly to lower per trade loss  
3. Adding trend judgment to avoid reverse patterns
4. Optimize session setting to eliminate overnight risks

## Optimization Suggestions

1. Include more auxiliary pattern judgments 
2. Add trend indicator filters for entry signals
3. Optimize ratios of stop loss and take profit  
4. Try machine learning methods to recognize patterns
5. Add position sizing control 

## Summary  

This strategy determines future market moves by analyzing graphical patterns formed on the candlesticks bars using technical tools. The strategy is practical to use, but traders still need to take account of the general market environment, avoiding missing major trends because of local shapes. By further optimizations, it is promising to enhance the stability and profitability of the strategy.

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
|v_input_12|70|Stop Loss|
|v_input_13|1000|Take Profit|
|v_input_14|30|Trailing Stop|
|v_input_15|0000-0000|Trading session|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-10 00:00:00
end: 2024-01-17 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Candle Patterns Strategy", shorttitle="CPS", overlay=true)

//--- Patterns Input ---

OnEngulfing = input(defval=true, title="Engulfing", type=bool)
OnHarami = input(defval=true, title="Harami", type=bool)
OnPiercingLine = input(defval=true, title="Piercing Line / Dark Cloud Cover", type=bool)
OnMorningStar = input(defval=true, title="Morning Star / Evening Star ", type=bool)
OnBeltHold = input(defval=true, title="Belt Hold", type=bool)
OnThreeWhiteSoldiers = input(defval=true, title="Three White Soldiers / Three Black Crows", type=bool)
OnThreeStarsInTheSouth = input(defval=true, title="Three Stars in the South", type=bool)
OnStickSandwich = input(defval=true, title="Stick Sandwich", type=bool)
OnMeetingLine = input(defval=true, title="Meeting Line", type=bool)
OnKicking = input(defval=true, title="Kicking", type=bool)
OnLadderBottom = input(defval=true, title="Ladder Bottom", type=bool)

//--- Risk Management Input ---

inpsl = input(defval = 70, title="Stop Loss", minval = 0)
inptp = input(defval = 1000, title="Take Profit", minval = 0)
inptrail = input(defval = 30, title="Trailing Stop", minval = 0)
// If the zero value is set for stop loss, take profit or trailing stop, then the function is disabled
sl = inpsl >= 1 ? inpsl : na
tp = inptp >= 1 ? inptp : na
trail = inptrail >= 1 ? inptrail : na

//--- Session Input ---

sess = input(defval = "0000-0000", title="Trading session")
t = time(timeframe.period, sess)
session_open = true

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

https://www.fmz.com/strategy/439228

> Last Modified

2024-01-18 15:14:13
