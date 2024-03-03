
> Name

基于形态的蜡烛图策略Candlestick-Patterns-Based-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略基于蜡烛图形态,识别不同的蜡烛线形态信号,进行趋势跟踪交易。结合止损、止盈、移动止损等风险管理手段,旨在降低市场波动对策略的影响。

## 策略原理

该策略主要基于以下蜡烛形态进行信号判断:

- 吞没形态:识别多头吞没和空头吞没形态
- 引力线/乌云盖顶:识别多头引力线和空头乌云盖顶形态 
- 十字星:识别多头十字星和空头十字星形态
- 早晨之星/黄昏之星:识别多头早晨之星和空头黄昏之星形态
- 捉腰带线:识别多头和空头捉腰带线形态
- 三只乌鸦/三只白兵:识别三只乌鸦和三只白兵形态
- 南方三星:识别南方三星形态
- 吐司线:识别吐司线形态
- 会议线:识别多头和空头会议线形态
- 脚踢线:识别多头和空头脚踢线形态
- 梯底:识别梯底形态

当识别到上述蜡烛信号时,在次柱开盘价附近按固定止损止盈下单,进行趋势跟踪交易。同时结合移动止损、移动止盈进行风险管理。

此外,策略还加入均线过滤器,只有在价格突破均线时才考虑信号。

## 策略优势

1. 基于经典蜡烛形态,具有一定的 Universal 属性。

2. 严格遵循形态规则进行机械交易,不受主观影响。

3. 止损止盈设置合理,最大程度控制单笔交易风险。

4. 加入移动止损止盈机制,能够随市场调整止损线。

5. 均线过滤增加判断依据,避免被套。


## 风险及对策

1. 蜡烛形态存在一定识别错误率,可能出现假信号。可以适当调整形态参数,过滤无效形态。

2. 静态止损无法完全规避市场突发事件的风险。可以设置较宽止损,或采用移动止损。

3. 该策略对交易时段较敏感,无法 24 小时运行。可以调整交易时间,或加入集合竞价过滤。

4. 均线过滤可能错过部分机会。可以降低均线周期,或取消均线过滤。

5. 多头信号与空头信号无法同时把握,存在难以同时获利的局限。可以分别针对多头和空头制定策略,分时运行。

## 优化方向

1. 优化蜡烛形态的参数,提高识别效果。

2. 测试不同的移动止损方式,寻找最优方案。

3. 尝试更先进的风险管理手段,如资金管理、波动率止损等。 

4. 加入更多滤波指标,提高过滤效果。

5. 尝试机器学习等方法,建立蜡烛形态的判断模型。

6. 开发能同时兼顾多头和空头信号的策略逻辑。

## 总结

本策略运用经典蜡烛形态进行趋势判断,以机械化的方式进行交易。通过严格的止损和移动止损管理风险,以及均线过滤提高判断效果。该策略具有易于理解、容易实现的优点,但也存在一定的识别错误和获取定制化参数的难题。未来可通过引入更多技术指标和机器学习等方式进行优化,以获得更好的策略效果。

||

## Overview

This strategy is based on candlestick patterns to identify different candlestick signals and trade along the trend. With proper risk management methods like stop loss, take profit, and trailing stop, it aims to reduce the impact of market fluctuations.

## Strategy Logic

The strategy mainly identifies the following candlestick patterns for trading signals:

- Engulfing: bullish engulfing and bearish engulfing patterns

- Piercing Line/Dark Cloud Cover: bullish piercing line and bearish dark cloud cover patterns

- Morning Star/Evening Star: bullish morning star and bearish evening star patterns  

- Belt Hold: bullish belt hold and bearish belt hold patterns

- Three White Soldiers/Three Black Crows: three white soldiers and three black crows patterns

- Three Stars in the South: three stars in the south pattern

- Stick Sandwich: stick sandwich pattern

- Meeting Line: bullish meeting line and bearish meeting line patterns

- Kicking: bullish kicking and bearish kicking patterns

- Ladder Bottom: ladder bottom pattern

When detecting these candlestick signals, it will place pending orders near the open price of the next bar, with pre-defined stop loss and take profit for trend following. It also uses trailing stop and breakeven stop to manage risks.

It also adds a moving average filter to avoid taking signals when price is on the wrong side of MA.

## Advantages

1. Based on classical candlestick patterns, it has some universal applicability.

2. Trading mechanically based on pattern rules, not affected by subjective factors.

3. Reasonable stop loss and take profit settings to control single trade risks.

4. Trailing stop mechanism adjusts stop loss dynamically along with the market. 

5. MA filter adds more logic to avoid being trapped in wrong trades.

## Risks and Solutions

1. Candlestick patterns have some misidentification issues, which can lead to false signals. Can optimize parameters or filter out invalid patterns.

2. Static stop loss cannot fully avoid risks from market events. Can use wider stop or trailing stop.

3. Sensitive to trading sessions, cannot run 24x7. Can adjust trading times or add auction filters.

4. MA filter may miss some opportunities. Can lower MA period or remove the filter.

5. Hard to profit from both long and short sides together due to conflicts. Can separate strategies for long and short.

## Optimization Directions

1. Optimize parameters of candlestick patterns to improve identification.

2. Test different trailing stop methods to find the optimal one.

3. Try more advanced risk management techniques like money management or volatility stop loss.

4. Add more filters to improve the filtering logic.

5. Build candlestick pattern recognition models using machine learning.

6. Develop strategy logic that can identify both long and short signals.

## Summary

This strategy uses classical candlestick patterns for trend detection and trades mechanically based on the signals. It manages risks by strict stop loss and trailing stop, and improves logic by adding MA filter. The strategy is easy to understand and implement, but also has some issues like misidentification and difficulties in parameter tuning. Future optimizations can be done by introducing more technical indicators and machine learning models to achieve better performance.

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
|v_input_12|0.01|Tick Size|
|v_input_13|10|Stop Loss|
|v_input_14|100|Take Profit|
|v_input_15|10|Breakeven Margin|
|v_input_16|5|Price Movement Confirmation|
|v_input_17|false|MA Filter|
|v_input_18|50|MA Period|
|v_input_19|0000-0000|Trading Session|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-15 00:00:00
end: 2023-02-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Candle Patterns Strategy - 2", shorttitle="CPS - 2", overlay=true)
// New risk management system: order entry, moving stop loss to breakeven + moving average filter (SMA)

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
tick = input (defval = 0.01, title="Tick Size", minval = 0.001)
inpsl = input(defval = 10, title="Stop Loss", minval = 1)
inptp = input(defval = 100, title="Take Profit", minval = 1)
inpbm = input (defval=10, title="Breakeven Margin", minval = 1)
inpindent = input(defval = 5, title="Price Movement Confirmation", minval = 0)
InpSmaFilter = input(defval=false, title="MA Filter", type=bool)
maPer=input(defval = 50, title="MA Period", minval = 1)
//inptrail = input(defval = 0, title="Trailing Stop", minval = 0)
// If the zero value is set for stop loss, take profit or trailing stop, then the function is disabled
//sl = inpsl >= 1 ? inpsl : na
sl = inpsl * tick
bm = inpbm * tick
tp = inptp //* tick
indent = inpindent * tick
//trail = inptrail >= 1 ? inptrail : na

//--- Session Input ---

sess = input(defval = "0000-0000", title="Trading Session")
t = time(timeframe.period, sess)
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

// --- Plotting Patterns ---

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

PointOfEntry = SignalUp ? high[0] + indent : SignalDown ? low[0] - indent : na

bu = strategy.position_avg_price
shlo = strategy.position_size
stL = shlo > 0 and close [0] > bu + bm ? bu : shlo < 0 and close [0] < bu - bm ? bu : na
du = sma(close, maPer)
smaF = SignalUp and high[0]>du[0] ? true : SignalUp and high[0]<du[0] ? false : SignalDown and high[0]>du[0] ? false : SignalDown and high[0]<du[0] ? true : na 
smaFilter = InpSmaFilter ? smaF : true
duplot = InpSmaFilter ? du : na
plot(duplot, color=red)

// -- Orders --

strategy.order("buy", true, stop = PointOfEntry, oca_name = "trade",  when = SignalUp and session_open and smaFilter)
strategy.cancel("buy", when = not session_open or SignalDown or strategy.opentrades > 0)
strategy.order("stop sell", false, stop = bu-sl, oca_name = "trade",  when = strategy.opentrades > 0 and shlo > 0 and session_open)
strategy.cancel("stop sell", close [0] > bu + bm or not session_open or strategy.opentrades == 0 )
strategy.order("breakeven sell", false, stop = bu + 1*tick, oca_name = "trade",  when = strategy.opentrades > 0 and shlo > 0 and close [0] > bu + bm and session_open)
strategy.cancel("breakeven sell", when = strategy.opentrades == 0 or not session_open)

strategy.order("sell", false, stop = PointOfEntry, oca_name = "trade",  when = SignalDown and session_open and smaFilter)
strategy.cancel("sell", when = not session_open or SignalUp or strategy.opentrades > 0)
strategy.order("stop buy", true, stop = bu+sl, oca_name = "trade",  when = strategy.opentrades > 0 and shlo < 0 and session_open)
strategy.cancel("stop buy", when = close [0] < bu - bm or not session_open or  strategy.opentrades == 0 )
strategy.order("breakeven buy", true, stop = bu - 1 * tick, oca_name = "trade",  when = strategy.opentrades > 0 and shlo < 0 and close [0] < bu - bm and session_open)
strategy.cancel("breakeven buy", when = strategy.opentrades == 0 or not session_open)

strategy.close("buy", when = not session_open or SignalDown )
strategy.close("sell", when = not session_open or SignalUp)
strategy.exit("Take Profit", from_entry = "buy", profit = tp)
strategy.exit("Take Profit", from_entry = "sell", profit = tp)
```

> Detail

https://www.fmz.com/strategy/427578

> Last Modified

2023-09-22 12:28:59
