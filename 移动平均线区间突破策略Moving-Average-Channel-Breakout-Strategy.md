
> Name

移动平均线区间突破策略Moving-Average-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f47d71d14cf74f744f.png)

[trans]

### 概述

该策略为一个基于移动平均线的区间突破策略。它会根据一定周期的移动平均线及设置的上下轨线,来判断价格突破进行买卖操作。

### 策略原理

该策略的核心原理为:

1. 设置一定周期的移动平均线,作为中轴线。

2. 中轴线上下设置区间范围,区间范围通过中轴线乘以一定百分比来得到。上轨线为中轴线乘以(100% + 设定百分比),下轨线为中轴线乘以(100% - 设定百分比)。

3. 当价格上涨突破上轨线时,做空;当价格下跌突破下轨线时,做多。

4. 订单价格设定为对应的上下轨线价格。

5. 当价格重新回到中轴线时,平仓离场。

这样,通过移动平均线及其区间范围来捕捉价格的突破,实现交易策略。

### 优势分析

该策略具有以下优势:

1. 概念简单清晰,容易理解和实现。

2. 可通过参数调整,适应不同市场环境。

3. 中轴线及区间范围可有效过滤市场噪音,抓住趋势。

4. 采用限价单下单,可控制风险。

5. 回到中轴线时止损,避免过度亏损。

### 风险分析

该策略也存在一些风险:

1. 区间参数设置不当可能导致交易频繁或不足。

2. 突破出现假突破的概率较大,可能出现止损。

3. 行情剧烈波动时,中轴线及区间范围失效。

4. 回到中轴线时强制止损,可能出现过早离场。

对应解决方法:

1. 优化参数,选择合适的移动平均线周期及区间百分比。

2. 结合其他指标如量能,避免假突破。 

3. 增加人工干预手段。

4. 移动平均线周期设置长一些,区间范围适当放大。

### 优化方向 

该策略主要可以从以下方向进行优化:

1. 增加止损条件,如追踪止损,避免过度亏损。

2. 增加指标过滤,如MACD,KD等,减少假突破。

3. 增加自动参数优化功能,使参数可根据市场变化实时调整。

4. 增加开仓条件,避免单纯依赖突破。

5. 优化移动平均线周期及区间参数设置。

### 总结

该策略整体是一个比较实用的移动平均线区间突破策略。它概念简单,易于理解和实现,通过区间范围过滤噪音,在趋势较明显的市场中效果较好。但也存在一些风险,需要注意参数优化以及结合其他指标使用。具有一定的实战和发展价值。
||
### Overview

This is a moving average channel breakout strategy based on moving averages and range channels. It uses moving average lines and upper/lower channel lines to determine breakouts for trading signals.

### Strategy Logic

The core logic of this strategy is:

1. Set a moving average line of certain period as the middle line. 

2. Set upper and lower channel lines by multiplying the middle line by certain percentages. The upper line is middle line * (100% + preset percentage). The lower line is middle line * (100% - preset percentage).

3. When price breaks out above the upper line, go short. When price breaks out below the lower line, go long.  

4. Set order prices at the corresponding upper/lower lines.

5. Close positions when price comes back to the middle line.

So it trades based on the breakouts of the moving average channel.

### Advantage Analysis 

The advantages of this strategy are:

1. Simple and clear concept, easy to understand and implement.

2. Adjustable parameters fitting different market conditions.  

3. Middle line and channel range can filter market noise and catch trends.

4. Limit orders control risks. 

5. Cut losses when price comes back to middle line.

### Risk Analysis

There are also some risks:

1. Improper parameter settings may cause over/insufficient trading.

2. High probability of false breakouts and stop loss.

3. Failure of the middle and channel lines under huge market swings. 

4. Premature exit when forced to close on middle line.

Solutions:

1. Optimize parameters like MA period and channel percentage.

2. Add other indicators like volume to avoid false breakouts.

3. Increase manual intervention. 

4. Use longer MA period and wider channel range.

### Optimization

The strategy can be improved from the following aspects:

1. Add stop loss methods like trailing stop to limit losses.

2. Add filtering indicators like MACD to reduce false signals.

3. Enable automatic parameter optimization.

4. Add more open position criteria beyond breakout.

5. Optimize MA and channel parameters.

### Conclusion

In conclusion, this is a practical MA channel breakout strategy. It has a simple logic for easy use, while the channel range can filter noise. It performs well in trending markets. But risks exist and parameters together with additional filters need optimization for actual trading. The strategy has certain practical and development value.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Lot, %|
|v_input_4|3|Length|
|v_input_5_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_6|10|Short line (red)|
|v_input_7|-5|Long line (lime)|
|v_input_8|1900|From Year|
|v_input_9|2100|To Year|
|v_input_10|true|From Month|
|v_input_11|12|To Month|
|v_input_12|true|From day|
|v_input_13|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-08-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy(title = "Robot WhiteBox ShiftMA", shorttitle = "Robot WhiteBox ShiftMA", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot, %")
per = input(3, title = "Length")
src = input(ohlc4, title = "Source")
shortlevel = input(10.0, title = "Short line (red)")
longlevel = input(-5.0, title = "Long line (lime)")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//SMAs
sma = sma(src, per) 
shortline = sma * ((100 + shortlevel) / 100)
longline = sma * ((100 + longlevel) / 100)
plot(shortline, linewidth = 2, color = red, title = "Short line")
plot(sma, linewidth = 2, color = blue, title = "SMA line")
plot(longline, linewidth = 2, color = lime, title = "Long line")

//Trading
size = strategy.position_size
lot = 0.0
lot := size == 0 ? strategy.equity / close * capital / 100 : lot[1]

if (not na(close[per])) and size == 0 and needlong
    strategy.entry("L", strategy.long, lot, limit = longline)
    
if (not na(close[per])) and size == 0 and needshort
    strategy.entry("S", strategy.short, lot, limit = shortline)
    
if (not na(close[per])) and size > 0 
    strategy.entry("Close", strategy.short, 0, limit = sma)
    
if (not na(close[per])) and size < 0 
    strategy.entry("Close", strategy.long, 0, limit = sma)

if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/435159

> Last Modified

2023-12-12 17:38:19
