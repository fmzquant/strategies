
> Name

形态K线交易策略Candlestick-Patterns-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1086dec7654fb1ae173.png)

[trans]

## 概述
这是一个利用不同K线形态作为交易信号的策略。它可以检测9种常见的蜡烛形态,并根据这些形态产生买入和卖出信号。

## 策略原理
该策略的核心逻辑是识别不同的K线形态,包括十字星、锤头、启明星等。当识别到bullish的形态时,会产生买入信号;当识别到bearish的形态时,会产生卖出信号。

比如,当检测到三只上涨的白色实体K线时,就是“三只白兵”的信号,表示市场目前为bull趋势,这个时候会产生买入信号。

又比如,当一根长阴线的K线完全吞噬前一根阳线的实体时,形成了熊ISHengulfing的形态,预示着趋势反转,这个时候会产生卖出信号。

## 优势分析
这种基于形态识别的策略,可以抓住短期的反转点,特别适合短线交易。识别准确的形态信号,可以及时捕捉到价格的反转,进入利润方向。

相比于单纯的移动平均线等技术指标策略,K线形态策略结合了对价格行情和市场情绪的判断,交易信号更加准确可靠。

## 风险分析
该策略主要依赖于对K线形态的准确判断。如果判断失误,很容易形成错误的交易信号,从而导致亏损。 

此外,任何技术分析策略都无法完全规避系统性风险,例如政策影响、黑天鹅事件等都可能对交易造成影响。

可以通过止损来控制风险。当价格向相反方向突破某个范围时,可以及时止损退出。

## 优化方向
可以扩充识别的K线形态种类,再多加入一些高效的形态信号,例如锤子线、倒锤子线、分离线等,用以确认交易信号。

可以结合其他指标进行过滤,避免在不确定的市场环境中产生交易信号。例如MACD、RSI等指标发出的讯号,可以避开低质量的K线形态信号。

可以优化止损逻辑,当价格向相反方向突破一定幅度时止损。同时结合波动率指标,来动态调整止损范围。

## 总结
这是一个非常实用的短线交易策略。它识别常见的K线形态来产生交易信号,可以抓住价格短期的反转机会。同时也需要注意一些潜在的风险,适当进行优化以控制风险和提高效率。

||

## Overview
This is a strategy that utilizes different candlestick patterns as trading signals. It can detect 9 common candlestick patterns and generate buy and sell signals based on those patterns.  

## Strategy Logic
The core logic of this strategy is to identify different candlestick patterns, including Doji, Hammer, Morning Star etc. When a bullish pattern is identified, a buy signal will be triggered. When a bearish pattern is identified, a sell signal will be triggered.

For example, when three consecutive white candlesticks with higher highs and higher lows are detected, it gives the signal of "Three White Soldiers" indicating a bull market. In this case a buy signal will be generated. 

Also for example, when a long bearish candle completely engulfs the body of the previous bullish candle, it forms a Bearish Engulfing pattern, implying a trend reversal. In this case a sell signal will be triggered.

## Advantage Analysis 
This type of pattern-recognition strategies can capture short-term reversal points and is especially suitable for short-term trading. Identifying accurate pattern signals can timely capture price reversals and get into profitable direction.

Compared to simple technical indicators strategies like moving averages, candlestick pattern strategy incorporates the judgement of price action and market sentiment, making the trading signals more accurate and reliable.

## Risk Analysis
This strategy mainly relies on accurate identification of candlestick patterns. If the detection goes wrong, it’s easy to generate false trading signals and cause losses.  

Also, any technical analysis strategy cannot completely avoid systemic risks like policy impacts, black swan events etc. that may influence the trading.  

Risk can be controlled by stop loss. When price breaks through a range towards opposite direction, stop loss can be triggered to exit positions timely.

## Optimization Directions
More efficient candlestick patterns can be added for signal confirmation, like Hammer, Inverted Hammer, Separating Lines etc.

Other indicators can be incorporated for signal filtering, avoiding taking signals in uncertain market environment. Signals from indicators like MACD, RSI can be used to filter out low quality candlestick signals.

The stop loss logic can be optimized to trigger when price breaks out of a range towards opposite direction. Combine with volatility indicators to dynamically adjust the stop loss range.

## Summary  
This is a very practical short-term trading strategy. It identifies common candlestick patterns to generate trading signals and capture short-term reversal opportunities. Also need to notice potential risks and optimize properly to control risks and improve efficiency.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Doji's|
|v_input_2|true|Gravestone Doji/Dragonfly Doji|
|v_input_3|true|3 Red Crows/3 Green Soldiers|
|v_input_4|true|Three Line Strike|
|v_input_5|true|Piercing/Dark Cloud|
|v_input_6|true|Morning Star|
|v_input_7|true|Evening Star|
|v_input_8|true|Engulfing|
|v_input_9|true|Hammer|
|v_input_10|true|Falling Star|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-12 00:00:00
end: 2023-12-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Dan Pasco
strategy("Candlestick Signals Strategy" , shorttitle="Candlestick Signal Strategy $1000", overlay = true , initial_capital = 1000)

//Settings input menu
dojicon = input(title = "Show Doji's", type=bool, defval = true)
gravedojicon = input(title = "Gravestone Doji/Dragonfly Doji", type=bool, defval = true)
tbctwscon = input(title = "3 Red Crows/3 Green Soldiers", type=bool, defval = true)
tlscon = input(title = "Three Line Strike", type=bool, defval = true)
pcon = input(title = "Piercing/Dark Cloud", type=bool, defval = true)
mscon = input(title = "Morning Star", type=bool, defval = true)
escon = input(title = "Evening Star", type=bool, defval = true)
econ = input(title = "Engulfing", type=bool, defval = true)
hcon = input(title = "Hammer", type=bool, defval = true)
fscon = input(title = "Falling Star", type=bool, defval = true)

//Doji Up
dojiup = (open-close)>0 ? (high-open)>(open-close) and (close-low)>(open-close) and (close-low)>(high-open) and (open-close)<((high-open)/8) : (open-low)>(close-open) and (high-close)>(close-open) and (open-low)>(high-close) and (close-open)<((high-close)/8) and dojicon == true
plotshape(dojiup, style=shape.cross,location=location.belowbar, text="Doji", color=black)

//Doji Down
dojidown = (open-close)>0 ? (high-open)>(open-close) and (close-low)>(open-close) and (high-open)>(close-low) and (open-close)<((close-low)/8) : (open-low)>(close-open) and (high-close)>(close-open) and (high-close)>(open-low) and (close-open)<((high-close)/8) and dojicon == true
plotshape(dojidown, style=shape.cross,location=location.abovebar, text="Doji", color=black)

//Gravestone Doji Bull
gravedojibull = (close-open)>0 and ((high-close)/8)>(close-open) and ((high-close)/5)>(open-low) and gravedojicon == true
plotshape(gravedojibull, style=shape.arrowdown,location=location.abovebar, text="Gravestone Doji", color=red)

//Gravestone Doji Bear
gravedojibear = (open-close)>0 and ((high-open)/8)>(open-close) and ((high-open)/5)>(close-low) and gravedojicon == true
plotshape(gravedojibear, style=shape.arrowdown,location=location.abovebar, text="Gravestone Doji", color=red)

//Dragonfly Doji Bull
dragondojibull = (close-open)>0 and ((open-low)/8)>(close-open) and ((open-low)/5)>(high-close) and gravedojicon == true
plotshape(dragondojibull, style=shape.arrowup,location=location.belowbar, text="Dragonfly Doji", color=green)

//Dragonfly Doji Bear
dragondojibear = (open-close)>0 and ((close-low)/8)>(open-close) and ((close-low)/5)>(high-open) and gravedojicon == true
plotshape(dragondojibear, style=shape.arrowup,location=location.belowbar, text="Dragonfly Doji", color=green)

//Three Black Crows
tbc = (low[2]<low[3] and low[1]<low[2] and low<low[1] and high[2]<high[3] and high[1]<high[2] and high<high[1] and (close[3]-open[3])>0 and (open[2]-close[2])>0 and (open[1]-close[1])>0 and (open-close)>0 and (open-close)>(close-low) and (open-close)>(high-open) and (open[1]-close[1])>(close[1]-low[1]) and (open[1]-close[1])>(high[1]-open[1]) and (open[2]-close[2])>(close[2]-low[2]) and (open[2]-close[2])>(high[2]-open[2]) and tbctwscon == true)
plotshape(tbc, style=shape.arrowdown,location=location.abovebar, text="3 Red Crows", color=red)

//Three White Soldiers
tws = (high[2]>high[3] and high[1]>high[2] and high>high[1] and low[2]>low[3] and low[1]>low[2] and low>low[1] and (open[3]-close[3])>0 and (close[2]-open[2])>0 and (close[1]-open[1])>0 and (close-open)>0 and (close-open)>(open-low) and (close-open)>(high-close) and (close[1]-open[1])>(open[1]-low[1]) and (close[1]-open[1])>(high[1]-close[1]) and (close[2]-open[2])>(open[2]-low[2]) and (close[2]-open[2])>(high[2]-close[2]) and tbctwscon == true)
plotshape(tws, style=shape.arrowup,location=location.belowbar, text="3 Green Soldiers", color=green)

//Three Line Strike Up
tlsu = ((close-open)>0 and (open[1]-close[1])>0 and (open[2]-close[2])>0 and (open[3]-close[3])>0 and open<close[1] and low[1]<low[2] and low[2]<low[3] and high>high[3] and low<low[1] and tlscon == true)
plotshape(tlsu, style=shape.arrowup,location=location.belowbar, text="3 Line Strike", color=green)

//Three Line Strike Down
tlsd = ((open-close)>0 and (close[1]-open[1])>0 and (close[2]-open[2])>0 and (close[3]-open[3])>0 and open>close[1] and high[1]>high[2] and high[2]>high[3] and low<low[3] and high>high[1] and tlscon == true)
plotshape(tlsd, style=shape.arrowdown,location=location.abovebar, text="3 Line Strike", color=red)

//Piercing Up
pu = ((open[1]-close[1])>0 and (close-open)>0 and (open[1]-close[1])>(high[1]-open[1]) and (open[1]-close[1])>(close[1]-low[1]) and (close-open)>(high-close) and (close-open)>(open-low) and open<close[1] and ((open[1]+close[1])/2)<close and ((close-open)/2)>(high-close) and close<open[1] and (high<high[1] or low>low[1]) and pcon == true)
plotshape(pu, style=shape.arrowup,location=location.belowbar, text="Piercing Up", color=green)

//Dark Cloud
dc = ((close[1]-open[1])>0 and (open-close)>0 and (close[1]-open[1])>(high[1]-close[1]) and (close[1]-open[1])>(open[1]-low[1]) and (open-close)>(high-open) and (open-close)>(close-low) and open>close[1] and ((open[1]+close[1])/2)>close and ((open-close)/2)>(close-low) and close>open[1] and (high<high[1] or low>low[1]) and pcon == true)
plotshape(dc, style=shape.arrowdown,location=location.abovebar, text="Dark Cloud", color=red)

//Morning Star 1 Up
ms1u = ((open[2]-close[2])>0 and (close-open)>0 and (open[1]-close[1])>=0 and (open[2]-close[2])>(high[2]-open[2]) and (open[2]-close[2])>(close[2]-low[2]) and (close-open)>(high-close) and (close-open)>(open-low) and (close-open)>(open[1]-close[1]) and (open[2]-close[2])>(open[1]-close[1]) and open[1]<close[2] and open[1]<open and open[1]!=close[1] and mscon == true)
plotshape(ms1u, style=shape.arrowup,location=location.belowbar, text="Morning Star", color=green)

//Morning Star 2 Up
ms2u = ((open[2]-close[2])>0 and (close-open)>0 and (close[1]-open[1])>=0 and (open[2]-close[2])>(high[2]-open[2]) and (open[2]-close[2])>(close[2]-low[2]) and (close-open)>(high-close) and (close-open)>(open-low) and (close-open)>(close[1]-open[1]) and (open[2]-close[2])>(close[1]-open[1]) and close[1]<close[2] and close[1]<open and open[1]!=close[1] and mscon == true)
plotshape(ms2u, style=shape.arrowup,location=location.belowbar, text="Morning Star X2", color=green)

//Evening Star 1 Down
es1d = ((close[2]-open[2])>0 and (open-close)>0 and (close[1]-open[1])>=0 and (close[2]-open[2])>(high[2]-close[2]) and (close[2]-open[2])>(open[2]-low[2]) and (open-close)>(high-open) and (open-close)>(close-low) and (open-close)>(close[1]-open[1]) and (close[2]-open[2])>(close[1]-open[1]) and open[1]>close[2] and open[1]>open and escon == true)
plotshape(es1d, style=shape.arrowdown,location=location.abovebar, text="Evening Star", color=red)

//Evening Star 2 Down
es2d = ((close[2]-open[2])>0 and (open-close)>0 and (open[1]-close[1])>=0 and (close[2]-open[2])>(high[2]-close[2]) and (close[2]-open[2])>(open[2]-low[2]) and (open-close)>(high-open) and (open-close)>(close-low) and (open-close)>(open[1]-close[1]) and (close[2]-open[2])>(open[1]-close[1]) and close[1]>close[2] and close[1]>open and close[1]!=open[1] and escon == true) 
plotshape(es2d, style=shape.arrowdown,location=location.abovebar, text="Evening  X2", color=red)

//Bullish Engulfing
beu = (open[1]-close[1])>0 and (close-open)>0 and high>high[1] and low<low[1] and (close-open)>(open[1]-close[1]) and (close-open)>(high-close) and (close-open)>(open-low) and econ == true
plotshape(beu, style=shape.arrowup,location=location.belowbar, text="Engulfing", color=green)

//Bearish Engulfing
bed = (close[1]-open[1])>0 and (open-close)>0 and high>high[1] and low<low[1] and (open-close)>(close[1]-open[1]) and (open-close)>(high-open) and (open-close)>(close-low) and econ == true
plotshape(bed, style=shape.arrowdown,location=location.abovebar, text="Engulfing", color=red)

//Bullish Hammer Up
bhu1 = (close-open)>0 and ((close-open)/3)>(high-close) and ((open-low)/2)>(close-open) and (close-open)>((open-low)/8) and hcon == true
plotshape(bhu1, style=shape.arrowup,location=location.belowbar, text="Hammer", color=green)

//Bearish Hammer Up
bhu2 = (open-close)>0 and ((open-close)/3)>(high-open) and ((close-low)/2)>(open-close) and (open-close)>((close-low)/8) and hcon == true
plotshape(bhu2, style=shape.arrowup,location=location.belowbar, text="Hammer", color=green)

//Bullish Falling Star
bfs1 = (close-open)>0 and ((close-open)/3)>(open-low) and ((high-close)/2)>(close-open) and (close-open)>((high-close)/8) and fscon == true
plotshape(bfs1, style=shape.arrowdown,location=location.abovebar, text="Falling Star", color=red)

//Bearish Falling Star
bfs2 = (open-close)>0 and ((open-close)/3)>(close-low) and ((high-open)/2)>(open-close) and (open-close)>((high-open)/8) and fscon == true
plotshape(bfs2, style=shape.arrowdown,location=location.abovebar, text="Falling Star", color=red)

//Declaring the buy signals
buy = (dragondojibear == true and gravedojicon == true) or (dragondojibull == true and gravedojicon == true) or (tws == true and tbctwscon == true) or (tlsu == true and tlscon == true) or (pu == true and pcon == true) or (ms1u == true and mscon == true) or (ms2u == true and mscon == true) or (beu == true and econ == true) or (bhu1 == true and hcon == true) or (bhu2 == true and hcon == true)

//Declaring the sell signals
sell = (gravedojibear == true and gravedojicon == true) or (gravedojibull == true and gravedojicon == true) or (tbc == true and tbctwscon == true) or (tlsd == true and tlscon == true) or (dc == true and pcon == true) or (es1d == true and escon == true) or (es2d == true and escon == true) or (bed == true and econ == true) or (bfs1 == true and fscon == true) or (bfs2 == true and fscon == true)

//Execute historic backtesting
ordersize = floor(strategy.equity/close) // To dynamically calculate the order size as the account equity increases or decreases.
strategy.entry("long",strategy.long,ordersize,when=buy) // Buy 
strategy.close("long", when=sell) //Sell
```

> Detail

https://www.fmz.com/strategy/435832

> Last Modified

2023-12-19 10:56:36
