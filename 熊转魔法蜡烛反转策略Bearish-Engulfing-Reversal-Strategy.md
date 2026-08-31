
> Name

熊转魔法蜡烛反转策略Bearish-Engulfing-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13db636103c1c63475f.png)


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
