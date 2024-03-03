
> Name

RSI多空分歧指标交易策略RSI-Bullish-and-Bearish-Divergence-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e1822c9df719214237.png)
 [trans]
## 概述
该策略通过计算RSI指标的多空分歧情况,判断市场的多空趋势并做出交易决策。具体来说,它会在RSI形成较低的低点但价格形成更高的低点时判断为隐藏的多头信号;而当RSI形成更高的高点但价格形成较低的高点时判断为隐藏的空头信号。根据这些信号判断市场潜在的多空趋势并做出交易。

## 策略原理
该策略主要基于RSI指标的多空分歧理论。当RSI和价格形成反向的分歧时,预示着市场潜在的反转。具体分为以下四种情况:

1. 正常多头信号:RSI形成更高的低点,价格形成更低的低点。说明买盘推高了RSI但没有完全反映到价格上,预示着多头力量增强。  

2. 隐藏多头信号:RSI形成更低的低点,价格形成更高的低点。说明卖盘推低了RSI但没有完全反映到价格上,预示着多头力量增强。

3. 正常空头信号:RSI形成更低的高点,价格形成更高的高点。说明卖盘推高了价格但没有完全反映到RSI上,预示着空头力量增强。

4. 隐藏空头信号:RSI形成更高的高点,价格形成更低的高点。说明买盘推高了RSI但没有完全反映到价格上,预示着空头力量增强。

根据以上分歧情况判断市场潜在的多空趋势,以及买卖力量的增强情况,从而制定交易策略。

## 策略优势
1. 利用RSI的多空分歧理论,判断市场的潜在趋势。
2. 同时结合价格行情作为确认,避免产生噪音信号。  
3. 能够在市场快速反转前捕捉到重要信号,predictions先机做出判断。
4. 实现了可视化的多空信号提示,操作方便直观。
5. 可自定义参数,适应不同市场环境。

## 策略风险
1. RSI指标和价格出现分歧不一定预示着反转,可能是正常的盘整行情。  
2. 隐藏信号相对噪音较大,可能产生误判。
3. 需要结合更多指标或者技术分析方法来确认信号。 
4. 信号参数设置不当也可能影响判断。

## 优化方向 
1. 增加MACD,KDJ等指标与RSI指标结合,确定entry signal信号。
2. 增加止损策略,降低单笔损失。
3. 优化参数设置,如搜索更合适的RSI周期参数。  
4. 增加机器学习算法,训练判断entry signal的准确性。
5. 增加websocket实时行情,以减少信号确认滞后。

## 总结
该策略主要依靠RSI的多空分歧来判断市场潜在的多空趋势,通过捕捉价格运动中买卖盘的相对力量变化,predictions做出反转交易。具有一定的先机预测功能。但也存在一定的噪音信号风险。可以通过参数优化、指标组合、机器学习等方式进一步增强策略的稳定性与盈利能力。

||

## Overview
This strategy judges the bullish and bearish trends of the market and makes trading decisions by calculating the divergence of RSI indicator. Specifically, it will judge hidden bullish signals when RSI forms lower lows but prices form higher lows. And it will judge hidden bearish signals when RSI forms higher highs but prices form lower highs. Then it determines the potential bullish or bearish trends of the market based on these signals and makes trades.   

## Strategy Logic  
The strategy is mainly based on the bullish and bearish divergence theory of RSI indicator. When RSI and price form reverse divergences, it indicates potential reversals of the market. There are four specific situations:   

1. Regular Bullish Signal: RSI forms higher low while price forms lower low. It indicates the buying power pushes up the RSI but not fully reflects on the price, implying strengthened bullish power.   

2. Hidden Bullish Signal: RSI forms lower low while price forms higher low. It implies the selling power pushes down the RSI but not the price, indicating strengthened bullish power.  

3. Regular Bearish Signal: RSI forms lower high while price forms higher high. It implies the selling power pushes up the price but not RSI, indicating strengthened bearish power.
   
4. Hidden Bearish Signal: RSI forms higher high while price forms lower high. It indicates buying power pushes up RSI but not price, implying strengthened bearish power.

Based on the above divergences, it judges the potential bullish or bearish trends of the market and the strengthening of buying/selling power to formulate trading strategies.  

## Advantages  

1. Utilize the bullish and bearish divergence theory of RSI to determine the potential trends of market.   
2. Also combine price actions to confirm, avoiding noisy signals.   
3. Able to capture critical signals before fast reversals of market.  
4. Implement visualized indication for bullish and bearish signals, easy and intuitive to operate.   
5. Customizable parameters fitting different market environments.   

## Risks
1. Divergences between RSI and price may not necessarily imply reversals, could just be range-bound actions.   
2. Hidden signals have relatively larger noise, risks of misjudgement.  
3. Need to incorporate more indicators or technical analysis methods to confirm the signals.   
4. Improper parameter settings may also affect the judgements.  

## Enhancement Directions   

1. Incorporate MACD, KDJ and other indicators with RSI to determine entry signals.  
2. Add stop loss strategy to reduce losses per trade.    
3. Optimize parameter settings like searching for more suitable RSI periods.     
4. Introduce machine learning algorithms to train the accuracy of capturing entry signals.
5. Implement websocket for real-time quotes to reduce signal confirmation latency.   

## Summary   
The strategy mainly leverages the bullish and bearish divergences of RSI to determine the potential bullish or bearish trends of market by capturing the relative strength changes between buying and selling power behind the price actions. It has certain predictive capabilities of reversals. But it also has risks of noisy signals. Ways like parameter optimization, indicator combination, machine learning can help further enhance the stability and profitability of the strategy.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|RSI Period|
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
start: 2024-01-07 00:00:00
end: 2024-01-14 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Divergence Indicator")
len = input.int(title="RSI Period", minval=1, defval=20)
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
// strategy.close("상승 다이버전스 진입", when = ta.crossover(osc, 70)) 
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
strategy.entry("히든 상승 다이버전스 진입", strategy.long, when = hiddenBullCond)
// strategy.close("히든 상승 다이버전스 진입", when = ta.crossover(osc, 70))
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
strategy.entry("하락 다이버전스 진입", strategy.short, when = bearCond)
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
strategy.entry("히든 하락 다이버전스 진입", strategy.short, when = hiddenBearCond)
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

https://www.fmz.com/strategy/438777

> Last Modified

2024-01-15 12:09:54
