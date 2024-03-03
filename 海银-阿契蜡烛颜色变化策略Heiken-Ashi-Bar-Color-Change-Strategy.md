
> Name

海银-阿契蜡烛颜色变化策略Heiken-Ashi-Bar-Color-Change-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


### 概述

该策略通过分析海因-阿契蜡烛的颜色变化,判断市场趋势,实现自动买入卖出。当蜡烛颜色从红变绿时发出买入信号,当蜡烛颜色从绿变红时发出卖出信号,属于趋势跟踪策略。

### 策略原理

首先计算海银-阿契蜡烛的开盘价、收盘价、最高价、最低价。蜡烛的颜色根据收盘价和开盘价判断,如果收盘价大于开盘价则为绿色,否则为红色。当本根K线的收盘价大于开盘价,且上一根K线的收盘价小于等于上一根K线的开盘价时,产生买入信号。当本根K线的收盘价小于等于开盘价,且上一根K线的收盘价大于上一根K线的开盘价时,产生卖出信号。

这样通过海银-阿契蜡烛颜色的变化判断趋势,当颜色从红变绿时进入多头市场,从绿变红时进入空头市场,以捕捉市场趋势的变化。

### 策略优势

1. 使用海因-阿契蜡烛能过滤市场噪音,识别趋势
2. 通过蜡烛颜色变化判断趋势变化点,令入场时机更准确 
3. 策略思路简单清晰,易于实现与优化
4. 可配置移动止损,严格控制风险

### 风险及解决方案

1. 存在一定的滞后,无法在转折点实时入场
2. 可能出现止损被击穿的风险

解决方法:

1. 结合其他指标如布林带判断,优化入场时机
2. 采用移动止损或及时止损,严格控制风险

### 优化思路

1. 优化止损策略,避免止损被击穿
2. 增加移动平均线等指标判断,提高入场的准确性
3. 添加仓位控制,避免亏损过大
4. 结合RSI等指标避免过度交易
5. 测试不同交易品种的parameter,寻找最优参数

### 总结

海银-阿契蜡烛颜色变化策略通过分析蜡烛颜色的变化判断趋势,在红变绿时做多,绿变红时做空,属于较为简单的趋势跟踪策略。该策略优势是识别趋势变化点的能力较强,但入场时机存在滞后,需要进一步优化,在策略框架合理的情况下,参数优化和严格的风险控制是该策略成功的关键。总体来说,该策略思路清晰易操作,值得进一步研究与应用。

|| 

### Overview

This strategy judges market trends by analyzing the color change of Heiken Ashi candles and automatically buys and sells. It generates buy signals when the candle color changes from red to green and sell signals when the color changes from green to red. This is a trend following strategy.

### Strategy Logic

First calculate the open, close, high and low prices of the Heiken Ashi candle. The candle color is determined by the close and open prices. If the close price is greater than the open price, the candle is green, otherwise it is red. When the close price of the current bar is greater than the open price, and the previous bar's close price is less than or equal to the previous bar's open price, a buy signal is generated. When the close price of the current bar is less than or equal to the open price, and the previous bar's close price is greater than the previous bar's open price, a sell signal is generated.

This way, by observing the change in Heiken Ashi candle colors, it judges the trend. When the color changes from red to green, it enters a bull market. When the color changes from green to red, it enters a bear market, to capture changes in market trends.

### Advantages of the Strategy

1. Using Heiken Ashi candles filters market noise and identifies trends.
2. Judging trend change points by candle color changes makes entry timing more accurate.
3. The strategy logic is simple and clear, easy to implement and optimize. 
4. Moving stop loss can be configured to strictly control risks.

### Risks and Solutions

1. There is some lag, unable to enter in real time at reversal points.
2. There is risk of stop loss being hit.

Solutions:

1. Combine with other indicators like Bollinger Bands to optimize entry timing.
2. Adopt moving stop loss or timely stop loss to strictly control risks.

### Optimization Directions

1. Optimize stop loss strategy to avoid being hit.
2. Add moving average and other indicators to improve entry accuracy.  
3. Add position sizing to avoid excessive losses.
4. Combine with RSI etc. to avoid overtrading.
5. Test different products to find optimal parameters.

### Conclusion

The Heiken Ashi bar color change strategy judges trends by analyzing candle color changes, going long when red changes to green, and going short when green changes to red. This is a relatively simple trend following strategy. The advantage is its strong ability to identify trend change points, but entry timing has some lag, requiring further optimization. With reasonable strategy framework, parameter optimization and strict risk control are key to success. Overall, the strategy has clear, easy logic, and is worth researching and applying further.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-08 00:00:00
end: 2023-10-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Kozlod - Heikin-Ashi Bar Color Change Strategy", overlay = true)

// 
// author: Kozlod
// date: 2018-09-03
// https://www.tradingview.com/u/Kozlod/
// 

// Calculation HA Values 
haopen   = 0.0
haclose  = ((open + high + low + close)/4)
haopen  := na(haopen[1]) ? (open + close)/2 : (haopen[1] + haclose[1]) / 2
hahigh   = max(high, max(haopen, haclose))
halow    = min(low,  min(haopen, haclose))

// HA colors
hacolor =  haclose  > haopen ? green : red

// Signals
turnGreen = haclose  >  haopen and haclose[1] <= haopen[1]
turnRed   = haclose  <= haopen and haclose[1]  > haopen[1]

// Plotting
bgcolor(hacolor)

plotshape(turnGreen, style = shape.arrowup,   location = location.belowbar, color = green)
plotshape(turnRed,   style = shape.arrowdown, location = location.abovebar, color = red) 

// Alerts
strategy.entry("long",  true,  when = turnGreen)
strategy.entry("short", false, when = turnRed)

```

> Detail

https://www.fmz.com/strategy/428797

> Last Modified

2023-10-09 15:38:46
