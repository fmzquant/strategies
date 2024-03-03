
> Name

窄幅震荡内收突破策略Narrow-Range-Inside-Day-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

### 策略概述

窄幅震荡内收突破策略是一种识别窄幅震荡和内部收盘突破的长线做多策略。它在满足价格震荡收窄和内部收盘的双重条件时,判断均线方向,产生做多信号,以捕捉突破后的价格趋势。

### 策略原理

1. 使用NR7判定过去7日内价格震荡最窄的一天

2. 使用内部收盘判断前一日高点低于当前日,前一日低点高于当前日

3. 当出现NR7和内部收盘的同时出现,且收盘价高于开盘价,进入做多

4. 平仓条件为随后一天收盘价高于开盘价

该策略同时利用价格震荡缩小和内部收盘两大信号,判断市场进入积累震荡阶段。当均线方向向上时,价格很可能出现突破。这种多重条件过滤,可以提高实际交易的准确性。

另外,该策略仅做多,避免被困于震荡区间,可减少不必要的交易次数。

### 策略优势

- 同时判断震荡收窄和内部收盘两大信号

- 均线方向确定大趋势existence

- 多重条件过滤,提高信号准确率

- 仅做多,避免震荡困扰

- 回测参数可优化,策略灵活

### 风险警示

- 需要适当调整均线参数,优化交易信号

- 买点可能滞后,需要关注突破时机

- 仅做多无法获利于下跌行情

- 仍需防范震荡范围再次扩大

### 总结

窄幅震荡内收突破策略对市场结构进行了深入判断,在高概率情况下产生交易信号。它具有较强的适应性,可通过调整参数得到优化。该策略值得进行回测验证和实盘调整,可成为量化交易体系中的一个关键模块。

||

### Strategy Overview

The narrow range inside day breakout strategy identifies narrow range oscillations and inside day close breakouts for long-only trend following. It generates long signals when price narrowing, inside day, and SMA slope up all emerge to capture post-breakout trends. 

### Strategy Logic  

1. Use NR7 to identify the narrowest range day among the past 7 days.

2. Use inside day to determine previous day's high is lower than current day's high, and previous day's low is higher than current day's low.

3. When NR7 and inside day occur together, with closing price higher than opening price, go long.

4. Exit when next day's close is higher than open.

The strategy utilizes both price narrowing and inside day signals to identify accumulation stages. With SMA slope up, price is likely to breakout. Such multi-condition filtering improves accuracy.

Also, the long-only approach avoids consolidation traps and unnecessary trades. 

### Advantages of the Strategy

- Considers both narrowing and inside day signals 

- SMA direction determines trend existence

- Multi-condition filtering improves signal accuracy

- Long-only avoids consolidation traps  

- Optimizable backtest parameters, flexible 

### Risk Warnings

- SMA tuning needed to optimize signals

- Long entry may lag, focus on breakout timing

- Unable to profit from downtrends   

- Prevent re-expansion of ranges

### Conclusion

The narrow range inside day breakout strategy thoroughly examines market structure and generates high-probability signals. With parameter tuning, it is highly adaptive. The strategy is worth backtesting, live optimization, and integration into overall quant systems.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Narrow Range 7 (NR7) ?|
|v_input_2|true|Show Inside Day (I) ?|
|v_input_3|true|Show NR7ID (NR7 + Inside Day) colors ?|
|v_input_4|true|Show SMA ?|
|v_input_5|14|SMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-14 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("NR7ID: Narrow Range + Inside Day, Long Only Strategy (by ChartArt)", shorttitle="CA_-_NR7ID_Strat", overlay=true) // max_bars_back=5000

// ChartArt's Narrow Range + Inside Day Strategy (Long Only)
//
// Version 1.0
// Idea by ChartArt on Oktober 16, 2016.
//
// This long only strategy determines when there is both
// a NR7 (narrow range 7, a trading day in which the range
// is narrower than any of the previous six days), plus a
// inside day (high of the current day is lower than the high
// of the previous day and the low of the current day is higher
// than the low of the previous day) both on the same trading day
// and enters a long trade when the close is larger than the
// open and the slope of the simple moving average is upwards, too.
//
// The strategy exits the long trade next time the close is
// larger than the open in any of the next trading days.
//
// In addition the NR7ID can be colored (if close large open
// colored in green, else in red) and the SMA can be drawn
// with a color based on the direction of the SMA slope.
//
// List of my work: 
// https://www.tradingview.com/u/ChartArt/
// 
//  __             __  ___       __  ___ 
// /  ` |__|  /\  |__)  |   /\  |__)  |  
// \__, |  | /~~\ |  \  |  /~~\ |  \  |  
// 
// 


// NR7 Identifier
show_NR7=input(true, type=bool,title="Show Narrow Range 7 (NR7) ?")
range=(high-low)
nr7=(range < range[1]) and (range < range[2]) and (range < range[3]) and (range < range[4]) and (range < range[5]) and (range < range[6])
plotchar(show_NR7?nr7:na, char="7", location=location.abovebar, color=blue)

// Inside Day Identifier
show_insidebar = input(true, type=bool,title="Show Inside Day (I) ?")
insidebar =  (high < high[1] and low > low[1])
plotchar(show_insidebar?insidebar:na, char="i", location=location.abovebar, color=blue)

// NR7 + Inside Day Identifier
show_NR7ID = input(true, type=bool,title="Show NR7ID (NR7 + Inside Day) colors ?")
NR7ID = nr7 and insidebar
NR7ID_color = NR7ID and open < close ? green : NR7ID and open > close ? red : gray
barcolor(show_NR7ID?NR7ID_color:na)

// Simple Moving Average
show_ma = input(true, type=bool,title="Show SMA ?")
ma_length = input(14,title="SMA Length")
ma = sma(close,ma_length)
ma_change = change(ma) > 0
ma_change_color = change(ma) > 0 ? green : change(ma) < 0 ? red : blue
plot(show_ma?ma:na,color=ma_change_color,linewidth=3)

// (not enabled) Short Strategy: NR7 + Inside Day + close is smaller than open + change of SMA is downwards
//strategy.entry("sell", strategy.short, when = NR7ID and open > close and ma_change == false, comment="Short")
//strategy.close("sell", when = open > close )

// Long Strategy: NR7 + Inside Day + close is larger than open + change of SMA is upwards
strategy.entry("long", strategy.long, when = NR7ID and open < close and ma_change == true, comment="Long")
strategy.close("long", when = open < close )
```

> Detail

https://www.fmz.com/strategy/426905

> Last Modified

2023-12-01 15:00:06
