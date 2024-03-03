
> Name

窄幅里程策略Narrow-Range-Inside-Day-Short-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]  

## 策略原理

该策略结合狭幅(NR7)和里程确定做空时机。

交易逻辑是:

1. 识别NR7,即最高价最低价范围处于近7日最窄

2. 识别里程,即最高价低于前一日,最低价高于前一日

3. 当NR7和里程同日出现时,并且收盘价低于开盘价

4. 并且简单移动平均线方向向下时,做空

5. 当下一交易日再次收盘价低于开盘价时,平仓

该策略充分利用狭幅和里程表示盘整态势。结合均线判断和收盘价位置,可提高做空效率。

## 策略优势

- 狭幅和里程判定反转时机

- 条件组合避免假信号

- 可选多空操作

## 策略风险

- NR7和里程组合较为少见

- 需要优化均线参数

- 仅做空无法利用多头机会

## 总结

该策略通过高效的反转识别和验证方式进行做空。但交易频率较低,需评估策略效果。参数优化和多空交易可扩展策略。


||

## Strategy Logic

This short strategy combines NR7 and inside days for entry timing. 

The logic is:

1. Identify NR7, where range is narrowest over 7 days

2. Identify inside day, with high lower than previous high and low higher than previous low

3. On days when NR7 and inside day coincide, and close is lower than open

4. And simple moving average slope is down, go short

5. Cover short next day if close again lower than open

The strategy capitalizes on NR7 and inside days indicating congestion. Combined with MA slope and closing price filters, it improves short efficiency.

## Advantages

- NR7 and inside days time reversals

- Conditions combine to avoid false signals 

- Optional long/short operation

## Risks

- NR7 plus inside day occurrences less common

- Requires MA parameter optimization

- SHORT-only misses long opportunities 

## Summary

This strategy shorts by efficiently identifying and confirming reversals. But lower frequency needs evaluation. Parameter tuning and long/short trading can expand strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Narrow Range 7 (NR7) ?|
|v_input_2|true|Show Inside Day (I) ?|
|v_input_3|true|Show NR7ID (NR7 + Inside Day) bear color ?|
|v_input_4|false|Show NR7ID (NR7 + Inside Day) bull color ?|
|v_input_5|true|Show SMA ?|
|v_input_6|14|SMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("NR7ID: Narrow Range + Inside Day, Short Only Strategy (by ChartArt)", shorttitle="CA_-_NR7ID_Short_Strat", overlay=true) // max_bars_back=5000


// ChartArt's Narrow Range + Inside Day Strategy (Short Only)
//
// Version 1.1
// Idea by ChartArt on Oktober 22, 2016.
//
// This short only strategy determines when there is both
// a NR7 (narrow range 7, a trading day in which the range
// is narrower than any of the previous six days), plus a
// inside day (high of the current day is lower than the high
// of the previous day and the low of the current day is higher
// than the low of the previous day) both on the same trading day
// and enters a short trade when the close is lower than the
// open and the slope of the simple moving average is downwards, too.
//
// The strategy exits the short trade next time the close is
// lower than the open in any of the next trading days.
//
// In addition the NR7ID can be colored (if close lower open
// colored in red, else in green) and the SMA can be drawn
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
show_NR7ID_bear = input(true, type=bool,title="Show NR7ID (NR7 + Inside Day) bear color ?")
NR7ID = nr7 and insidebar
NR7ID_bear_color = NR7ID and open > close ? red : na
barcolor(show_NR7ID_bear?NR7ID_bear_color:na)
show_NR7ID_bull = input(false, type=bool,title="Show NR7ID (NR7 + Inside Day) bull color ?")
NR7ID_bull_color = NR7ID and open < close ? green : na
barcolor(show_NR7ID_bull?NR7ID_bull_color:na)

// Simple Moving Average
show_ma = input(true, type=bool,title="Show SMA ?")
ma_length = input(14,title="SMA Length")
ma = sma(close,ma_length)
ma_change = change(ma) > 0
ma_change_color = change(ma) > 0 ? green : change(ma) < 0 ? red : blue
plot(show_ma?ma:na,color=ma_change_color,linewidth=3)

// Short Strategy: NR7 + Inside Day + close is smaller than open + change of SMA is downwards
strategy.entry("sell", strategy.short, when = NR7ID and open > close and ma_change == false, comment="Short")
strategy.close("sell", when = open > close )

// (not enabled) Long Strategy: NR7 + Inside Day + close is larger than open + change of SMA is upwards
//strategy.entry("long", strategy.long, when = NR7ID and open < close and ma_change == true, comment="Long")
//strategy.close("long", when = open < close )
```

> Detail

https://www.fmz.com/strategy/426812

> Last Modified

2023-09-14 16:59:35
