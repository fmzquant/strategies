
> Name

自适应止损跟踪策略Adaptive-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略主要实现了一个自适应的止损机制,可以根据价格波动自动调整止损位置,实现更好的止损效果。策略利用ATR指标计算出合理的止损范围,并结合EMA均线产生交易信号,在突破EMA均线时开仓做多做空,同时用自适应止损算法跟踪止损位。

### 策略原理  

1. 计算ATR指标,设定ATR数值乘以参数a作为止损范围nLoss。
2. 计算EMA均线。
3. 当价格上穿EMA均线时做多,下穿EMA均线时做空。
4. 利用自适应止损算法自动调整止损位xATRTrailingStop,规则如下:
   - 当价格向上突破止损位时,将止损位调整到价格减去止损范围nLoss。
   - 当价格向下突破止损位时,将止损位调整到价格加上止损范围nLoss。
   - 其他情况下,止损位维持不变。
5. 当价格触发止损位时平仓止损。

### 优势分析

1. 实现了自适应的止损机制,可以根据市场波动程度自动调整止损幅度,有效控制风险。
2. 结合ATR指标计算合理的止损范围,避免止损过大或过小。
3. 利用EMA产生交易信号,可以减少无谓的交易,过滤市场噪音。
4. 策略思路简单清晰,代码容易理解,便于检查和优化。
5. 可输入参数进行调整,适应不同市场环境。

### 风险及改进

1. EMA均线产生交易信号可能滞后,导致入场过晚。可以考虑利用其他指标辅助判断提前入场。
2. 持仓时间不确定,无法控制单笔止损大小。可以设置目标利润或最大持仓时间避免过大亏损。
3. 大幅度趋势市场中,止损可能过于频繁被触发。可以考虑根据趋势状况调整参数或加入过滤条件。
4. 应根据不同品种特点调整参数,如ATR周期,止损倍数等,不可盲目使用默认值。

### 优化方向

1. 可以考虑加入趋势判断指标,在趋势方向服务做单,避免逆势交易。
2. 可以根据波动率大小调整止损倍数,在大幅波动中适当放宽止损范围。
3. 可以设置最大持仓时间,超过一定时间后主动止损离场。
4. 可以添加移动止损策略,随价格运行时向踏步抬高止损位。
5. 可以根据个股特点自定义ATR周期参数。

### 总结

本策略整体思路清晰易懂,利用ATR指标设定自适应止损范围,并配合EMA产生交易信号,可以有效控制损失。但策略本身较为被动,优化空间较大,可以考虑加入趋势判断,根据市场状况调整参数等方法使策略更具主动性。总体来说,该策略作为打底止损策略是一个较好的思路和模板,但需要根据不同品种特点进行调整优化,不能生搬硬套使用。

||


### Overview

This strategy mainly implements an adaptive stop loss mechanism that automatically adjusts the stop loss position based on price fluctuations to achieve better stop loss effect. The strategy uses the ATR indicator to calculate a reasonable stop loss range, and generates trading signals in combination with EMA lines. It opens long or short positions when price breaks through EMA lines, and uses an adaptive stop loss algorithm to trail the stop loss.

### Strategy Logic

1. Calculate ATR indicator and set ATR value multiplied by parameter a as stop loss range nLoss.
2. Calculate EMA line.  
3. Go long when price breaks above EMA line, and go short when price breaks below EMA line.
4. Use adaptive stop loss algorithm to automatically adjust stop loss position xATRTrailingStop, with rules as follows:
   - When price breaks above stop loss position, adjust stop loss to price minus stop loss range nLoss.
   - When price breaks below stop loss position, adjust stop loss to price plus stop loss range nLoss.
   - Otherwise, keep stop loss unchanged.
5. Close position for stop loss when price hits stop loss level.

### Advantage Analysis 

1. Implements adaptive stop loss mechanism that automatically adjusts stop loss range based on market volatility, effectively controlling risks.
2. Calculates reasonable stop loss range with ATR indicator, avoiding overlarge or too small stop loss.
3. Uses EMA to generate trading signals, reducing unnecessary trades and filtering market noise.
4. Simple and clear strategy logic, easy to understand and optimize. 
5. Allows input parameters adjustment to adapt to different market environments.

### Risks and Improvements

1. EMA signals may lag, leading to late entry. Consider using other indicators to assist judgement for early entry.
2. Uncertain holding period, unable to control single stop loss size. Can set profit target or max holding period to limit losses.
3. Stop loss may be triggered too frequently in strong trending markets. Consider adjusting parameters or adding filters based on trend conditions.  
4. Parameters like ATR period, stop loss multiplier should be tuned based on symbol characteristics, default values should not be used blindly.

### Optimization Directions

1. Consider adding trend indicator, taking trades in trend direction to avoid counter-trend trades.
2. Adjust stop loss multiplier based on volatility, allowing wider stop in high volatility conditions. 
3. Set maximum holding period, active stop loss after exceeding certain time.
4. Add moving stop loss strategy, gradually raising stop as price moves.
5. Customize ATR period parameter based on symbol characteristics.  

### Conclusion

The strategy has clear and simple logic, managing risks with adaptive ATR-based stop loss and EMA for trade signals. But it is relatively passive with much room for optimization. Consider adding trend judgement, dynamic parameter adjustment based on market conditions to make it more proactive. Overall it serves as a good idea and template for reversal stop loss strategies, but parameters should be tuned for different symbols instead of blindly applying default values.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Key Vaule. 'This changes the sensitivity'|
|v_input_2|10|ATR Period|
|v_input_3|false|Signals from Heikin Ashi Candles|
|v_input_4|true|From Day|
|v_input_5|true|From Month|
|v_input_6|2019|From Year|
|v_input_7|true|To Day|
|v_input_8|true|To Month|
|v_input_9|2100|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-10-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="UT Bot Strategy", overlay = true)
//CREDITS to HPotter for the orginal code. The guy trying to sell this as his own is a scammer lol. 

// Inputs
a = input(1,     title = "Key Vaule. 'This changes the sensitivity'")
c = input(10,    title = "ATR Period")
h = input(false, title = "Signals from Heikin Ashi Candles")

////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2019, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2100, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true
 
////////////////////////////////////////////////////////////////////////////////


xATR  = atr(c)
nLoss = a * xATR

src = h ? security(heikinashi(syminfo.tickerid), timeframe.period, close, lookahead = false) : close

xATRTrailingStop = 0.0
xATRTrailingStop := iff(src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0), max(nz(xATRTrailingStop[1]), src - nLoss),
   iff(src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0), min(nz(xATRTrailingStop[1]), src + nLoss), 
   iff(src > nz(xATRTrailingStop[1], 0), src - nLoss, src + nLoss)))
 
pos = 0   
pos :=	iff(src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0), 1,
   iff(src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0), -1, nz(pos[1], 0))) 
   
xcolor = pos == -1 ? color.red: pos == 1 ? color.green : color.blue 

ema   = ema(src,1)
above = crossover(ema, xATRTrailingStop)
below = crossover(xATRTrailingStop, ema)

buy  = src > xATRTrailingStop and above 
sell = src < xATRTrailingStop and below

barbuy  = src > xATRTrailingStop 
barsell = src < xATRTrailingStop 

plotshape(buy,  title = "Buy",  text = 'Buy',  style = shape.labelup,   location = location.belowbar, color= color.green, textcolor = color.white, transp = 0, size = size.tiny)
plotshape(sell, title = "Sell", text = 'Sell', style = shape.labeldown, location = location.abovebar, color= color.red,   textcolor = color.white, transp = 0, size = size.tiny)

barcolor(barbuy  ? color.green : na)
barcolor(barsell ? color.red   : na)

strategy.entry("long",   true, when = buy  and time_cond)
strategy.entry("short", false, when = sell and time_cond)
```

> Detail

https://www.fmz.com/strategy/428704

> Last Modified

2023-10-08 15:06:28
