
> Name

哈森破坏转向策略Heikin-Ashi-Reverse-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12e58f09124d01f95ae.png)
[trans]
### 概述

该策略主要基于改进的HA均线来识别价格的转向点,以捕捉比较明显的趋势变化,属于短线交易策略。策略使用HA计算K线的开、高、低、收价,并根据价格的关系判断出最终的K线颜色。当价格上涨时,用绿色柱状线表示,当价格下跌时,用红色柱状线表示。策略以HA柱状线颜色变化作为交易信号,在绿转红时做空,在红转绿时做多,属于典型的反转策略。

### 策略原理

策略的核心逻辑主要在于计算HA柱状线的颜色变化,来判断价格反转。

首先,根据输入参数选择是否使用HA计算K线的值。如果选择使用,则从HA数据中获取开、高、低、收价;如果不使用,则直接从K线原始数据中获取。

```
haClose = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close

haOpen = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open  

haHigh = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high

haLow = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, low) : low
```

然后根据HA计算公式得到本周期的HA开、收价。

```
haclose = (haOpen + haHigh + haLow + haClose) / 4  

haopen := na(haopen[1]) ? (haOpen + haClose) / 2 : (haopen[1] + haclose[1]) / 2
```

再根据HA开、收价计算出HA最高价、最低价。

```
hahigh = max(haHigh, max(haopen, haclose))  

halow = min(haLow, min(haopen, haclose))
``` 

根据HA开收价关系判断本周期HA柱状线颜色。

```
hacolor = haclose > haopen ? color.green : color.red
```

根据连续两周期的HA颜色变化判断价格反转信号。

```
turnGreen = haclose > haopen and haclose[1] <= haopen[1]  

turnRed = haclose <= haopen and haclose[1] > haopen[1]
```

在发生做多和做空信号时分别打开做多和做空仓位。

```
strategy.entry("long", 1, when=turnGreen)  

strategy.entry("short", 0, when=turnRed)
```

在相反信号发生时平仓。

```
strategy.close("long", when=turnRed)
```

这样通过判断HA柱状线颜色的变化就可以捕捉到价格反转点,实现反转交易策略。

### 优势分析

该策略主要具有以下优势:

1. 使用改进HA计算K线数据,能过滤掉部分噪音,识别趋势反转点更清晰。

2. 仅基于简单的HA柱状线颜色变化判断反转点,策略逻辑简单清晰,容易理解实现。

3. 采用反转交易方式,可以及时捕捉趋势变化,获取较快反转利润。

4. 可配置是否使用HA计算K线数据,可以根据不同市场调整使用。

5. 绘制形态指示candle方便直观判断价格反转点。

6. 可通过优化参数如交易周期等进行调整,适用于不同品种。

### 风险分析

该策略也存在一些风险需要注意:

1. 反转交易容易被套,需要确保反转信号具有足够的可靠性。

2. 在震荡市场中,反转信号可能频繁出现造成过度交易。

3. 无法判断趋势的长短,可能在反转后继续原趋势造成亏损。 

4. 单一指标易受假突破影响,应与其他指标组合使用。

5. 需验证参数是否经过充分优化,避免过拟合。

对应解决方法:

1. 优化参数,确保交易信号稳定可靠。

2. 结合趋势过滤,避免震荡市场交易。 

3. 设定止损退出机制,控制单笔亏损。

4. 组合其他指标进行确认,避免假信号。

5. 充分回测优化参数,防止过拟合。

### 优化方向

该策略可从以下几个方面进行优化:

1. 优化交易周期参数,适应不同品种特性。

2. 测试是否使用HA值,根据交易品种特点选择。 

3. 增加趋势过滤条件,避免震荡市反转。

4. 设定动态止损,根据市场波动调整止损位。

5. 结合其他指标确认交易信号。

6. 添加资金管理策略,调整仓位。

7. 扩展实现多品种套利交易。

8. 根据回测结果修正参数,防止过拟合。

### 总结

本策略利用改进HA均线的优势,通过判断HA柱状线颜色变化来发现价格可能的反转点。相比直接使用K线,HA均线能过滤部分噪音,反转信号更清晰。策略以简单直观的方式实现了反转交易思路,逻辑简单清晰,容易实盘操作。但反转交易也存在被套风险,需进一步优化信号准确性。此外,可尝试与趋势判断等其他因素组合使用,形成较为完整的交易体系。总体来说,本策略提供了一种基于HA的数据来发现反转点的思路,可据此进行扩展优化,开发出适合自己的反转交易策略。

||

### Overview

This strategy mainly uses improved Heikin-Ashi candles to identify reversal points in price and catch significant trend changes. It belongs to short-term trading strategies. The strategy calculates open, high, low and close prices of candles using HA, and determines the final color based on price relationship. Green candles represent rising prices and red candles represent falling prices. The strategy uses HA candle color change as trading signals to go short on green to red change and go long on red to green change. It is a typical reversal strategy.

### Strategy Logic

The core logic of the strategy is to detect color change in HA candles to determine price reversal.

First, get open, high, low and close prices from HA data or original data based on input parameter.

```
haClose = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close

haOpen = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open  

haHigh = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high

haLow = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, low) : low
```

Then calculate current HA open and close according to formulas.

```
haclose = (haOpen + haHigh + haLow + haClose) / 4  

haopen := na(haopen[1]) ? (haOpen + haClose) / 2 : (haopen[1] + haclose[1]) / 2
```

Further get HA highest and lowest prices. 

```
hahigh = max(haHigh, max(haopen, haclose))

halow = min(haLow, min(haopen, haclose))  
```

Determine HA candle color based on open/close relationship.

```
hacolor = haclose > haopen ? color.green : color.red
```

Identify reversal signals based on HA color change between bars.

```
turnGreen = haclose > haopen and haclose[1] <= haopen[1]  

turnRed = haclose <= haopen and haclose[1] > haopen[1] 
```

Open long/short positions when signals trigger.

```
strategy.entry("long", 1, when=turnGreen)
  
strategy.entry("short", 0, when=turnRed) 
```

Close positions on opposite signals.

```
strategy.close("long", when=turnRed)
```

By detecting HA candle color changes, the strategy captures price reversal points for reversal trading.

### Advantages

The main advantages of this strategy are:

1. Using improved HA candles filters noise and identifies reversals more clearly.

2. Simple logic based on HA color change, easy to understand and implement.

3. Reversal trading captures trend changes quickly for profit. 

4. Customizable to use HA candles or not for different markets.

5. Candlestick arrows visually indicate reversals.

6. Parameters like timeframe can be optimized for different products.

### Risks

There are also some risks to note:

1. Reversal trading can be vulnerable to traps. Signals need solid reliability.

2. Frequent whipsaws may occur in ranging markets.

3. Unable to determine trend duration, may reverse then continue trend.

4. Single indicator prone to false signals, should combine with others. 

5. Overfitting needs to be avoided through optimization.

Solutions:

1. Optimize parameters for reliable signals.

2. Add trend filter to avoid ranging markets.

3. Use stop loss to control loss per trade.

4. Confirm signals with other indicators to avoid false signals.

5. Thoroughly backtest to optimize parameters and prevent overfitting.

### Improvement

The strategy can be improved in the following ways:

1. Optimize timeframe for different products.

2. Test HA candle usage per product characteristics.

3. Add trend filter to avoid whipsaws in ranging markets. 

4. Implement dynamic stops based on market volatility.

5. Confirm signals with additional indicators.

6. Incorporate position sizing based on risk management.

7. Expand for multi-product arbitrage trading. 

8. Adjust parameters based on backtest results to prevent overfitting.

### Conclusion

This strategy leverages the strengths of improved HA candles to discover potential reversal points through HA color changes. Compared to regular candles, HA filters noise for cleaner signals. The strategy implements reversal trading logic in a simple and intuitive way that is easy to use for live trading. But reversal trades face trapping risks and should be optimized for greater signal accuracy. Combining with trend analysis and other factors can form a more complete system. Overall, this strategy provides an approach to identifying reversals using HA data and can be expanded on for robust reversal trading strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Heikin Ashi Candles in Algo Calculations|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-09 00:00:00
end: 2023-11-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Heikin-Ashi Change Strategy", overlay=true)

UseHAcandles    = input(true, title="Use Heikin Ashi Candles in Algo Calculations")
//
// === /INPUTS ===

// === BASE FUNCTIONS ===

haClose = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close
haOpen  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open
haHigh  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high
haLow   = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, low) : low

// Calculation HA Values 
haopen = 0.0
haclose = (haOpen + haHigh + haLow + haClose) / 4
haopen := na(haopen[1]) ? (haOpen + haClose) / 2 : (haopen[1] + haclose[1]) / 2
hahigh = max(haHigh, max(haopen, haclose))
halow = min(haLow, min(haopen, haclose))

// HA colors
hacolor = haclose > haopen ? color.green : color.red

// Signals
turnGreen = haclose > haopen and haclose[1] <= haopen[1]
turnRed = haclose <= haopen and haclose[1] > haopen[1]

// Plotting
bgcolor(hacolor)

plotshape(turnGreen, style=shape.arrowup, location=location.belowbar, color=color.green)
plotshape(turnRed, style=shape.arrowdown, location=location.abovebar, color=color.red)

// Alerts
alertcondition(turnGreen, "ha_green", "ha_green")
alertcondition(turnRed, "ha_red", "ha_red")

strategy.entry("long", 1, when=turnGreen)
//strategy.entry("short", 0, when=turnRed)
strategy.close("long", when=turnRed)

```

> Detail

https://www.fmz.com/strategy/432333

> Last Modified

2023-11-16 15:44:14
