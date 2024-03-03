
> Name

熊转魔法蜡烛反转策略Bearish-Engulfing-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13db636103c1c63475f.png)

[trans]

### 概述

该策略是一个基于K线中的熊转形态来判断市场反转信号的策略。当出现熊转形态时做空,目标获利后平仓。

### 策略原理

该策略的核心判断逻辑在于识别K线中是否出现了熊转形态。熊转形态是指一个向上涨升的K线后,紧接着一个收盘价格低于前一日收盘价格的阴线,并且该阴线的实体部分完全包裹住前一日的阳线实体。根据技术分析理论,这种形态通常预示着当前上涨趋势即将反转。

因此,该策略的具体交易逻辑是:

1. 监测到熊转形态出现时(前一日为阳线并且实体满足大小要求,当前为阴线并且实体完全包住前一日阳线实体),做空头入场
2. 若亏损超过设定的止损点则止损退出仓位
3. 若盈利超过设定的止盈点则止盈退出仓位

通过这种方式,可以在 judged出现熊转信号时捕捉到价格反转机会。

### 优势分析

该策略最大的优势在于能较早地判断市场趋势反转,采用的是熊转形态这一比较有效的反转信号,成功率较高。且策略思路简单清晰易于理解,容易实施。

另外,策略加入了止损止盈机制来控制风险和锁定利润,可以有效防止过度亏损的情况发生。

### 风险分析

该策略的主要风险在于熊转形态发出的反转信号不一定总是可靠的。虽然大多情况下是准确的,但也会出现误判的情况。这会导致在实际交易中无法完全避免亏损的发生。

此外,设置固定的止损止盈点也具有一定的盲目性,不够灵活。可能会在行情剧烈波动时被套住导致损失或错过更大利润。

### 优化方向

该策略可以通过以下几个方面进行进一步优化:

1. 增加对交易时段的选择。只在活跃交易的时段运作策略,可以减少误判概率
2. 增加对突破力度的判断。结合交易量或者平均真实波幅来确定熊转信号的可靠性
3. 采用动态止损止盈方式,并结合波动率指标来更加灵活地设置止损止盈点
4. 增加整体市场趋势判断,避免在盘整时造成不必要的亏损

### 总结

该熊转魔法蜡烛反转策略通过识别熊转形态来判断市场反转时机。策略思路清晰易操作,成功率较高。但也存在一定误判风险。可以通过进一步优化来改善策略效果,降低风险。

||

### Overview 

This is a strategy that uses the bearish engulfing pattern in candlesticks to determine market reversal signals for shorting. It goes short when the bearish engulfing pattern appears and closes position after reaching take profit target.

### Strategy Logic

The core logic of this strategy is to identify the bearish engulfing pattern in the candlestick chart. The bearish engulfing pattern refers to a down candlestick which completely engulfs the real body of the previous up candlestick after an upward trend. According to technical analysis theory, this pattern usually implies that the current upward trend is going to be reversed soon. 

Therefore, the specific trading logic of this strategy is:

1. When the bearish engulfing pattern is detected (previous candlestick is a up candle with satisfying size of the real body, current candlestick gaps down and its real body fully engulfs the previous one's), go short.  
2. If loss exceeds the set stop loss level, close position.
3. If profit exceeds the set take profit level, close position.  

By doing so, the opportunity of reversal can be captured after the bearish engulfing signal appears.

### Advantage Analysis

The biggest advantage of this strategy is that it can determine the market reversal relatively early based on the bearish engulfing pattern, which is a quite effective reversal signal with high success rate. Also, the strategy logic is simple and easy to understand and implement. 

In addition, the stop loss and take profit mechanisms help control the risk and lock in profit, thus preventing excessive loss effectively.

### Risk Analysis  

The major risk of this strategy is that the bearish engulfing reversal signal is not always reliable. Although in most cases it's accurate, misjudgement can happen sometimes. This may lead to unavoidable losses in actual trading.

Also, using fixed levels for stop loss and take profit lacks flexibility to some extent. It may lead to being trapped in or missing greater profits when market fluctuates violently.  

### Optimization Directions

This strategy can be further optimized in the following aspects:

1. Add selection rules for trading sessions. Only running strategy during active sessions can reduce misjudgement probability.
2. Add judgments on strength of breakout. Use metrics like trading volume or average true range to determine reliability of the signal.   
3. Adopt dynamic stop loss and take profit, and use volatility indicators to set the levels more flexibly.  
4. Add overall market trend judgments to avoid unnecessary losses during market consolidation.

### Conclusion

This bearish engulfing reversal strategy captures market reversal timing by identifying the bearish engulfing pattern. The strategy logic is simple and easy to follow with relatively high success rate. But certain misjudgement risks still exist. Further optimizations can be done to improve strategy performance and reduce risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|40|Take Profit pip|
|v_input_2|20|Stop Loss pip|
|v_input_3|2|Min. Size Body pip|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-04 00:00:00
end: 2024-01-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 30/10/2018
//
//    This is a bearish candlestick reversal pattern formed by two candlesticks. 
//    Following an uptrend, the first candlestick is a up candlestick which is 
//    followed by a down candlestick which has a long real body that engulfs or 
//    contains  the real body of the prior bar. The Engulfing pattern is the reverse 
//    of the Harami pattern. 
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////

strategy(title = "Bearish Engulfing Backtest", overlay = true)
input_takeprofit = input(40, title="Take Profit pip")
input_stoploss = input(20, title="Stop Loss pip")
input_minsizebody = input(2, title="Min. Size Body pip")
barcolor(abs(close[1] - open[1]) >= input_minsizebody? close[1] > open[1] ? open > close ? open >= close[1] ? open[1] >= close ? open - close > close[1] - open[1] ? yellow :na :na : na : na : na: na)
pos = 0.0
barcolor(nz(pos[1], 0) == -1 ? red: nz(pos[1], 0) == 1 ? green : blue ) 
posprice = 0.0
posprice := abs( close[1] - open[1]) >= input_minsizebody? close[1] > open[1] ? open > close ? open >= close[1] ? open[1] >= close ? open - close > close[1] - open[1] ? close :nz(posprice[1], 0) :nz(posprice[1], 0) : nz(posprice[1], 0) : nz(posprice[1], 0) : nz(posprice[1], 0): nz(posprice[1], 0)
pos := iff(posprice > 0, -1, 0)
if (pos == 0) 
    strategy.close_all()
if (pos == -1)
    strategy.entry("Short", strategy.short)	   	    
posprice := iff(low <= posprice - input_takeprofit and posprice > 0, 0 ,  nz(posprice, 0))
posprice := iff(high >= posprice + input_stoploss and posprice > 0, 0 ,  nz(posprice, 0))
```

> Detail

https://www.fmz.com/strategy/437682

> Last Modified

2024-01-04 17:35:18
