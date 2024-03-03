
> Name

RSI-异常背离交易策略RSI-Divergence-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1456c09e111d8b01eb1.png)

[trans]

### 策略名称
RSI Bullish/Bearish Divergence Trading Strategy

### 概述
该策略利用 RSI 指标识别常规和隐藏的多头和空头背离信号,根据异常背离信号决定做多做空。

### 策略原理
当价格创新高价时,RSI 并未创新高点构成多头异常背离,视为卖出信号。当价格创新低点时,RSI 并未创新低点构成空头异常背离,视为买入信号。常规背离是价格与 RSI指标之间的明显的背离。隐藏背离是价格与 RSI 指标之间的较隐蔽的背离。根据常规和隐藏的多头空头背离信号决定做多或者做空。

### 优势分析
1. 异常背离信号具有较高的可靠性,胜率较高。
2. 同时识别常规和隐藏的多空头背离,覆盖面广。
3. RSI 指标参数可调整,适用于不同市场环境。

### 风险分析 
1. 隐藏背离信号可能误判的概率较大。 
2. 需要人工review过滤误判信号。
3. 效果与RSI参数设定有关。

### 优化方向
1. 优化 RSI 参数,寻找最佳参数组合。
2. 增加机器学习算法,自动识别真实信号。  
3. 结合更多指标验证信号可靠性。

### 总结
该策略识别 RSI 异常背离交易信号,根据常规和隐藏的多空头背离决定做多做空,具有较高的胜率。通过优化 RSI 参数,增加其他验证指标,可进一步提高策略效果。

||

### Strategy Name  
RSI Bullish/Bearish Divergence Trading Strategy

### Overview
This strategy identifies regular and hidden bullish/bearish RSI divergence signals to determine long and short positions.  

### Principles  
When price makes a new high and RSI fails to make a new high, it forms bullish divergence, which is treated as selling signal. When price makes a new low and RSI fails to make a new low, it forms bearish divergence, which is treated as buying signal. Regular divergence refers to the obvious divergence between price and RSI while hidden divergence means relatively concealed divergence between them. Long or short positions are determined based on identified regular or hidden bullish/bearish divergence signals.  

### Advantage Analysis
1. Divergence signals have relatively high reliability with higher winning rate. 
2. Identification of both regular and hidden bullish/bearish divergence provides extensive coverage.
3. Adjustable RSI parameters make it adaptable to different market environments.   

### Risk Analysis
1. Hidden divergence signals have higher probability of misjudgment.  
2. Manual review is needed to filter out misjudged signals.
3. Effectiveness depends on RSI parameter settings.
   
### Optimization Directions  
1. Optimize RSI parameters to find best parameter combinations. 
2. Add machine learning algorithms for automatic identification of true signals.
3. Incorporate more indicators to verify signal reliability.  

### Summary  
This strategy identifies RSI divergence trading signals based on regular and hidden bullish/bearish divergence to determine long or short positions, which provides relatively higher winning rate. Further improvements on strategy effectiveness could be achieved by optimizing RSI parameters, adding other validating indicators.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|RSI Period|
|v_input_1_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|5|Pivot Lookback Right|
|v_input_3|5|Pivot Lookback Left|
|v_input_4|60|Max of Lookback Range|
|v_input_5|5|Min of Lookback Range|
|v_input_6|true|Plot Bullish|
|v_input_7|true|Plot Hidden Bullish|
|v_input_8|true|Plot Bearish|
|v_input_9|true|Plot Hidden Bearish|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-22 00:00:00
end: 2024-01-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Divergence Indicator")
len = input.int(title="RSI Period", minval=1, defval=14)
src = input(title="RSI Source", defval=close)
lbR = input(title="Pivot Lookback Right", defval=5)
lbL = input(title="Pivot Lookback Left", defval=5)
rangeUpper = input(title="Max of Lookback Range", defval=60)
rangeLower = input(title="Min of Lookback Range", defval=5)
plotBull = input(title="Plot Bullish", defval=true)
plotHiddenBull = input(title="Plot Hidden Bullish", defval=true)
plotBear = input(title="Plot Bearish", defval=true)
plotHiddenBear = input(title="Plot Hidden Bearish", defval=true)
bearColor = color.red
bullColor = color.green
hiddenBullColor = color.new(color.green, 80)
hiddenBearColor = color.new(color.red, 80)
textColor = color.white
noneColor = color.new(color.white, 100)
osc = ta.rsi(src, len)

plot(osc, title="RSI", linewidth=2, color=#2962FF)
hline(50, title="Middle Line", color=#787B86, linestyle=hline.style_dotted)
obLevel = hline(70, title="Overbought", color=#787B86, linestyle=hline.style_dotted)
osLevel = hline(30, title="Oversold", color=#787B86, linestyle=hline.style_dotted)
fill(obLevel, osLevel, title="Background", color=color.rgb(33, 150, 243, 90))

plFound = na(ta.pivotlow(osc, lbL, lbR)) ? false : true
phFound = na(ta.pivothigh(osc, lbL, lbR)) ? false : true
_inRange(cond) =>
	bars = ta.barssince(cond == true)
	rangeLower <= bars and bars <= rangeUpper

//------------------------------------------------------------------------------
// Regular Bullish
// Osc: Higher Low

oscHL = osc[lbR] > ta.valuewhen(plFound, osc[lbR], 1) and _inRange(plFound[1])

// Price: Lower Low

priceLL = low[lbR] < ta.valuewhen(plFound, low[lbR], 1) 
// bull : 상승 Condition : 조건
bullCond = plotBull and priceLL and oscHL and plFound // 상승다이버전스?
strategy.entry("상승 다이버전스 진입", strategy.long, when = bullCond)
strategy.close("상승 다이버전스 진입", when = ta.crossover(osc, 50)) 
plot(
     plFound ? osc[lbR] : na,
     offset=-lbR,
     title="Regular Bullish",
     linewidth=2,
     color=(bullCond ? bullColor : noneColor)
     )

plotshape(
	 bullCond ? osc[lbR] : na,
	 offset=-lbR,
	 title="Regular Bullish Label",
	 text=" Bull ",
	 style=shape.labelup,
	 location=location.absolute,
	 color=bullColor,
	 textcolor=textColor
	 )

//------------------------------------------------------------------------------
// Hidden Bullish
// Osc: Lower Low

oscLL = osc[lbR] < ta.valuewhen(plFound, osc[lbR], 1) and _inRange(plFound[1])

// Price: Higher Low

priceHL = low[lbR] > ta.valuewhen(plFound, low[lbR], 1)
hiddenBullCond = plotHiddenBull and priceHL and oscLL and plFound
// strategy.entry("히든 상승 다이버전스 진입", strategy.long, when = hiddenBullCond)
// strategy.close("히든 상승 다이버전스 진입", when = ta.crossover(osc, 50))
plot(
	 plFound ? osc[lbR] : na,
	 offset=-lbR,
	 title="Hidden Bullish",
	 linewidth=2,
	 color=(hiddenBullCond ? hiddenBullColor : noneColor)
	 )

plotshape(
	 hiddenBullCond ? osc[lbR] : na,
	 offset=-lbR,
	 title="Hidden Bullish Label",
	 text=" H Bull ",
	 style=shape.labelup,
	 location=location.absolute,
	 color=bullColor,
	 textcolor=textColor
	 )

//------------------------------------------------------------------------------
// Regular Bearish
// Osc: Lower High

oscLH = osc[lbR] < ta.valuewhen(phFound, osc[lbR], 1) and _inRange(phFound[1])

// Price: Higher High

priceHH = high[lbR] > ta.valuewhen(phFound, high[lbR], 1)
// bear : 하락 
bearCond = plotBear and priceHH and oscLH and phFound
// strategy.entry("하락 다이버전스 진입", strategy.short, when = bearCond)
// strategy.close("하락 다이버전스 진입", when = ta.crossunder(osc, 50)) 
plot(
	 phFound ? osc[lbR] : na,
	 offset=-lbR,
	 title="Regular Bearish",
	 linewidth=2,
	 color=(bearCond ? bearColor : noneColor)
	 )

plotshape(
	 bearCond ? osc[lbR] : na,
	 offset=-lbR,
	 title="Regular Bearish Label",
	 text=" Bear ",
	 style=shape.labeldown,
	 location=location.absolute,
	 color=bearColor,
	 textcolor=textColor
	 )

//------------------------------------------------------------------------------
// Hidden Bearish
// Osc: Higher High

oscHH = osc[lbR] > ta.valuewhen(phFound, osc[lbR], 1) and _inRange(phFound[1])

// Price: Lower High

priceLH = high[lbR] < ta.valuewhen(phFound, high[lbR], 1)

hiddenBearCond = plotHiddenBear and priceLH and oscHH and phFound
// strategy.entry("히든 하락 다이버전스 진입", strategy.short, when = hiddenBearCond)
// strategy.close("히든 하락 다이버전스 진입", when = ta.crossunder(osc, 50)) 
plot(
	 phFound ? osc[lbR] : na,
	 offset=-lbR,
	 title="Hidden Bearish",
	 linewidth=2,
	 color=(hiddenBearCond ? hiddenBearColor : noneColor)
	 )

plotshape(
	 hiddenBearCond ? osc[lbR] : na,
	 offset=-lbR,
	 title="Hidden Bearish Label",
	 text=" H Bear ",
	 style=shape.labeldown,
	 location=location.absolute,
	 color=bearColor,
	 textcolor=textColor
	 )
```

> Detail

https://www.fmz.com/strategy/439616

> Last Modified

2024-01-22 11:45:25
