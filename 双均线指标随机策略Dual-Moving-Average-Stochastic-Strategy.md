
> Name

双均线指标随机策略Dual-Moving-Average-Stochastic-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18bac4237d233e53ab7.png)
[trans]
### 概述

双均线指标随机策略是一种试图利用均线指标与随机指标的组合来寻找交易机会的策略。它会在快速EMA上穿越慢速SMA时产生交易信号,同时利用随机指标K值判定是否超买超卖来滤除部分信号。

### 策略原理

该策略主要基于两个技术指标:

1. 均线:计算快速EMA、慢速SMA、慢速VWMA三条不同参数的均线,当快速EMA上穿或下穿慢速SMA时产生交易信号。

2. 随机指标:计算%K值,当其超过设定的超买区或超卖区阈值时,认为行情可能反转,可以滤除部分均线交易信号。

具体来说,策略信号发出的逻辑是:

1. 当快速EMA上穿慢速SMA,且%K值低于超卖区阈值时,做多;当快速EMA下穿慢速SMA,且%K值高于超买区阈值时,做空。

2. 对于打开的多头头寸,如果%K值重新进入超卖区域,或者价格跌破止损线,则平仓。对于打开的空头头寸,如果%K值重新进入超买区域,或者价格涨破止损线,则平仓。

通过组合均线指标和随机指标,该策略试图在高概率的均线信号点发出入场信号,同时利用随机指标过滤部分误入的机会。

### 优势分析

该策略有以下主要优势:

1. 结合多种技术指标,综合判断行情,较单一指标更全面。
2. 利用随机指标过滤信号,可在一定程度上避免误入。
3. 采用多组混合参数的均线,判断更为全面准确。
4. 内置止损机制来控制单笔损失。

### 风险分析

该策略也存在一些风险:  

1. 均线指标容易产生较多不确定信号,误入概率较大,止损能力有限。
2. 随机指标本身也可能产生错误信号。
3. 参数设置(如超买超卖区域大小、均线周期等)可能需要优化,不当设置会影响策略表现。  
4. 纯技术面的策略,对基本面因素关注不足。

对应方法:
1. 优化参数,寻找最佳指标参数组合。  
2. 适当缩小头寸规模,分批建仓。
3. 结合基本面分析,避开重大事件。

### 优化方向  

该策略主要可从以下几个方面进行优化:

1. 对均线参数进行测试优化,找到最优参数组合。
2. 对随机指标的参数如超买超卖区域大小进行测试,找到最优参数。
3. 尝试加入其它指标,如VOLUME增强判断或波动率指标衡量风险,丰富Entry logic。  
4. 增加止损方式,如追踪止损等以控制风险。
5. 优化资金管理方式,如根据ATR动态调整头寸。
6. 结合VIX等恐慌指标避开重大risk-off事件。

### 总结

双均线指标随机策略通过快慢均线指标与随机指标的组合,设计出较为稳健的趋势跟踪策略。但也存在一些可优化空间,如参数选择、止损方式等。若进一步引入更多指标判断和优化,该策略可望获取较稳定的超额收益。

||

### Overview

The Dual Moving Average Stochastic strategy attempts to identify trading opportunities using a combination of moving average indicators and the stochastic oscillator. It generates trade signals when the fast EMA crosses above or below the slow SMA, while also using the stochastic %K value to filter out signals when the market is overextended.   

### Strategy Logic

The strategy is primarily based on two technical indicators:

1. Moving Averages: It computes a fast EMA, slow SMA and slow VWMA using different parameters, and generates trade signals when the fast EMA crosses the slow SMA.

2. Stochastic Oscillator: It calculates the %K value and considers the market overbought or oversold when %K crosses preset upper or lower threshold levels, using this to filter some of the moving average signals.

Specifically, the logic for signal generation is:

1. When the fast EMA crosses above the slow SMA, and %K is below the oversold level, go long. When the fast EMA crosses below the slow SMA, and %K is above the overbought level, go short.  

2. For existing long positions, close when %K re-enters the overbought zone or price breaches the stop loss. For short positions, close when %K re-enters the oversold zone or price breaches the stop loss.

By combining moving averages and the stochastic oscillator, the strategy attempts to identify high probability moving average signal points to enter trades, while using the stochastic to filter out some of the false signals. 

### Advantage Analysis 

The main advantages of this strategy are:

1. Combining multiple technical indicators provides more comprehensive judgment versus using a single indicator.  
2. Filtering with the stochastic oscillator avoids some false signals. 
3. Using multiple moving averages with mixed parameters allows for more robust signals.  
4. Incorporates a stop loss mechanism to control single trade loss.

### Risk Analysis

There are also some risks:

1. Moving averages can generate many uncertain signals resulting in more false entries; limited stop loss capability.
2. Stochastic oscillator may also produce incorrect signals on its own.  
3. Parameter settings require optimization (e.g. overbought/oversold levels, moving average periods) otherwise performance impact.
4. Lack of fundamental analysis. 

Mitigations:
1. Optimize parameters to find best combination of indicator settings.
2. Use smaller position sizing, scale in.  
3. Incorporate fundamental analysis to avoid events.

### Enhancement Opportunities

The main optimization opportunities are:

1. Test and optimize moving average parameters to find optimum.
2. Test stochastic parameters like overbought/oversold zones for optimum settings.
3. Incorporate additional indicators like volume or volatility for richer entry logic.
4. Enhance stop loss methodology e.g. trailing stops to lower risk.
5. Improve money management such as dynamic position sizing based on ATR.  
6. Avoid risk-off events using VIX etc.

### Conclusion

The Dual Moving Average Stochastic Strategy utilizes a blend of moving averages and the stochastic oscillator to design a robust trend following system, but has some enhancement opportunities around parameters, stops etc. Further refinements like additional indicators and optimizations can potentially deliver more consistent alpha.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|16|length|
|v_input_2|80|OverBought|
|v_input_3|20|OverSold|
|v_input_4|true|TradeLong|
|v_input_5|true|TradeShort|
|v_input_6|80|OverBoughtClose|
|v_input_7|20|OverSoldClose|
|v_input_8|50|trail_points|
|v_input_9_close|0|Fast EMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|true|Fast EMA Period|
|v_input_11_close|0|Slow SMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_12|100|Slow SMA Period|
|v_input_13_close|0|Slower SMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|30|Slower SMA Period|
|v_input_15|7|ATR Days Lookback|
|v_input_16|5|ATR Modifier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-22 00:00:00
end: 2024-01-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("TVIX MEAN REV V2 TREND", overlay=true)
length = input(16, minval=1)
OverBought = input(80)
OverSold = input(20)
TradeLong = input (true)
TradeShort = input (true)

OverBoughtClose = input(80)
OverSoldClose = input(20)

smoothK = 3
smoothD = 3
trail_points = input(50)

k = sma(stoch(close, high, low, length), smoothK)
d = sma(k, smoothD)
k2 = sma(stoch(close, high, low, length), smoothK)
d2 = sma(k, smoothD)


// === GENERAL INPUTS ===
// short Ema
maFastSource = input(defval=close, title="Fast EMA Source")
maFastLength = input(defval=1, title="Fast EMA Period", minval=1)
// long Sma
maSlowSource = input(defval=close, title="Slow SMA Source")
maSlowLength = input(defval=100, title="Slow SMA Period", minval=1)
// longer Sma
maSlowerSource = input(defval=close, title="Slower SMA Source")
maSlowerLength = input(defval=30, title="Slower SMA Period", minval=1)

//ATR Stop Loss Indicator by Keith Larson
atrDays = input(7, "ATR Days Lookback")
theAtr = atr(atrDays)
atrModifier = input(5.0, "ATR Modifier")
//plot(atr * atrModifier, title="ATR")

LstopLoss = close - (theAtr * atrModifier)
SstopLoss = close + (theAtr * atrModifier)



// === SERIES SETUP ===
/// a couple of ma's..
maFast = ema(maFastSource, maFastLength)
maSlow = sma(maSlowSource, maSlowLength)
maSlower = vwma(maSlowerSource, maSlowerLength)
rsi = rsi(maSlowerSource, maSlowerLength)

// === PLOTTING ===
fast = plot(maFast, title="Fast MA", color=color.red, linewidth=2, style=plot.style_line, transp=30)
slow = plot(maSlow, title="Slow MA", color=color.green, linewidth=2, style=plot.style_line, transp=30)
slower = plot(maSlower, title="Slower MA", color=color.teal, linewidth=2, style=plot.style_line, transp=30)


// === LOGIC === Basic - simply switches from long to short and vice-versa with each fast-slow MA cross
LongFilter = maFast > maSlow
ShortFilter = maSlow > maFast




BUY=crossover(k, d) and k < OverSold
SELL=crossunder(k, d) and k > OverBought

SELLCLOSE=crossover(k, d) and k < OverSoldClose
BUYCLOSE=crossunder(k, d) and k > OverBoughtClose

Open = open


if not na(k) and not na(d)
    if crossover(k, d) and k < OverSold and LongFilter and TradeLong
        strategy.entry("$", strategy.long, limit = Open, comment="Long")
    
    strategy.close("$",when = crossunder(k, d) and k > OverBoughtClose or open < LstopLoss  )
    ///strategy.close("$",when = open < LstopLoss  )
    
if not na(k) and not na(d)
    if crossunder(k, d) and k > OverBought and ShortFilter and TradeShort
        strategy.entry("$1", strategy.short, limit = Open, comment="S")
        
    strategy.close ("$1", when = crossover(k, d) and k < OverSoldClose or open > SstopLoss  )
    ///strategy.close ("$1", when = open < SstopLoss) 
    
  
        




```

> Detail

https://www.fmz.com/strategy/440322

> Last Modified

2024-01-29 11:54:10
