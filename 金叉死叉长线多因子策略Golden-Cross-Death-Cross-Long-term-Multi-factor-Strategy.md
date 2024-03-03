
> Name

金叉死叉长线多因子策略Golden-Cross-Death-Cross-Long-term-Multi-factor-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11ecc5ba515ff6dfe2a.png)
[trans]
## 概述

本策略是一个长线的多因子策略,它综合了均线、RSI和ATR三个指标,判断行情进入被低估区域后产生买入信号。它是长期持有型策略,以追求稳定收益为主。

## 策略原理

当快周期均线上穿慢周期均线,形成金叉信号,同时RSI指标低于超买区时,认为行情被低估,产生买入信号。然后根据ATR指标设定止损位和止盈位,采用固定止盈止损。

具体来说,策略使用10日均线和50日均线形成交易信号。当10日均线上穿50日均线时产生买入信号。同时,需要RSI(14)指标低于70这个超买区,避免买入高点。

入市后,根据ATR(14)的大小设定止损止盈位。止损位为股价低于进场价1.5倍ATR;止盈位为股价高于进场价2倍ATR。

## 优势分析

这是一个长线的多因子策略,它结合多个指标判断行情,可以有效避免假突破带来的亏损。具体优势有:

1. 多因子判断,避免假突破,确保买入信号的可靠性
2. 追踪长线趋势,不随短期波动碰头止损
3. 固定止盈止损点数,防止出现超大亏损
4. 指标参数可调整,可以针对不同品种进行优化
5. 实施简单,容易理解和操作

## 风险分析  

该策略作为长线持有策略,也存在一些风险需要注意。主要的风险点包括:

1. 长期持有带来的大幅度亏损风险。遇到长期调整行情时可能出现较大亏损。可以设置移动止损来缓解。
2. 停止追踪止损风险。固定止损只在进场后设定一次,后续不再调整,可能导致止损被突破。可以使用动态止损或移动止损来优化。    
3. 指标设置太慢,错过短线交易机会。可以适当缩短指标参数,追求更快的交易频率。
4. 顺势加仓的风险放大。可以设置加仓的频率和比例上限来控制风险。

## 优化方向  

该策略可以从以下几个方向进行优化:

1. 增加动态止损机制,根据价格和波动性调整止损位
2. 增加移动止盈功能,让利润可以得到更好锁定
3. 结合交易量指标,避免低量的假突破
4. 优化指标参数,适应更多品种
5. 增加加仓机制,在优点位进行适度加仓

## 总结

本策略作为一个长线的多因子金叉死叉策略,它结合均线、RSI和ATR指标,在多因子判断的基础上产生交易信号,以追求长线趋势带来的稳定收益。它具有判断准确、止损清晰、实施简单的特点,是一个值得推荐的长线策略。与此同时,也需要注意防范长期持有的风险,动态调整止损和止盈策略。总的来说,本策略在经过参数优化后,可以成为产生稳定收益的有效长线策略之一。

||

## Overview   

This is a long-term multi-factor strategy that combines moving average, RSI and ATR indicators to identify undervalued market conditions and generate buy signals. It is a long-term holding strategy focused on pursuing steady returns.  

## Strategy Logic

When the fast moving average crosses above the slow moving average, forming a golden cross signal, while the RSI indicator is below the overbought area, the market is considered undervalued and a buy signal is generated. Stop loss and take profit are then set based on the ATR indicator for fixed stop loss/take profit.   

Specifically, the strategy uses 10-day and 50-day moving averages to form trading signals. A buy signal is generated when the 10-day MA crosses above the 50-day MA. At the same time, RSI (14) needs to be below the 70 overbought area to avoid buying at high points.   

After entering the market, stop loss and take profit are set based on the size of ATR (14). The stop loss is set at the price below entry price by 1.5 times ATR; the take profit is set at the price above entry price by 2 times ATR.

## Advantage Analysis

This is a long-term multi-factor strategy that combines multiple indicators to judge market conditions, which can effectively avoid losses caused by false breakouts. The main advantages are:

1. Multi-factor judgment avoids false breakouts and ensures reliability of buy signals  
2. Tracks long-term trends without being stopped out by short-term fluctuations
3. Fixed stop loss/take profit points prevent excessive losses
4. Adjustable indicator parameters allow optimization across different products  
5. Simple to implement, easy to understand and operate
   
## Risk Analysis   

As a long-term holding strategy, the strategy also has some risks to note. The main risk points include:  

1. Large loss risk from long-term holding. May see sizable loss in prolonged consolidation market. Can set up trailing stop loss to mitigate.
2. Stop tracking stop loss risk. Fixed stop loss is only set once after entry, no further adjustment, may get stop loss breached. Can optimize with dynamic stop loss or trailing stop loss.   
3. Indicators too slow, misses short-term trading opportunities. Can shorten indicator parameters appropriately to pursuit higher trading frequency.  
4. Risk magnification from trend following additions. Can set limits on frequency and size of additions to control risk.
   
## Optimization Directions
  
The strategy can be optimized in the following aspects:

1. Add dynamic stop loss mechanism, adjust stop loss based on price and volatility  
2. Add trailing take profit to better lock in profits 
3. Incorporate trading volume indicator to avoid low volume false breakout
4. Optimize indicator parameters to fit more products
5. Add trend following position addition mechanism to moderately add to winning positions  

## Conclusion

As a long-term multi-factor golden cross death cross strategy, it combines moving average, RSI and ATR indicators to generate trading signals based on multi-factor judgments, pursuing steady returns from long-term trends. With the characteristics of accurate judgment, clear stop loss, and simple execution, it is a recommended long-term strategy. At the same time, need to watch out for long holding risks, dynamically adjust stop loss and take profit. Overall, with parameter optimization, the strategy can become an effective long-term strategy to produce steady returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Fast MA Length|
|v_input_2|50|Slow MA Length|
|v_input_3|14|RSI Length|
|v_input_4|70|RSI Overbought Level|
|v_input_5|30|RSI Oversold Level|
|v_input_6|14|ATR Length|
|v_input_7|1.5|Risk Multiplier for SL and TP|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-16 00:00:00
end: 2024-01-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Long Only Multi-Indicator Strategy", shorttitle="LOMIS", overlay=true)

// Inputs
lengthMAFast = input(10, title="Fast MA Length")
lengthMASlow = input(50, title="Slow MA Length")
rsiLength = input(14, title="RSI Length")
rsiOverbought = input(70, title="RSI Overbought Level")
rsiOversold = input(30, title="RSI Oversold Level")
atrLength = input(14, title="ATR Length")
riskMultiplier = input(1.5, title="Risk Multiplier for SL and TP")

// Moving averages
maFast = sma(close, lengthMAFast)
maSlow = sma(close, lengthMASlow)

// RSI
rsi = rsi(close, rsiLength)

// ATR
atr = atr(atrLength)

// Long condition
longCondition = crossover(maFast, maSlow) and rsi < rsiOverbought

// Entering long trades
if (longCondition)
    strategy.entry("Long", strategy.long)
    slLong = close - atr * riskMultiplier
    tpLong = close + atr * riskMultiplier * 2
    strategy.exit("SL Long", "Long", stop=slLong)
    strategy.exit("TP Long", "Long", limit=tpLong)

// Plotting
plot(maFast, color=color.red)
plot(maSlow, color=color.blue)
hline(rsiOverbought, "Overbought", color=color.red)
hline(rsiOversold, "Oversold", color=color.blue)

```

> Detail

https://www.fmz.com/strategy/439704

> Last Modified

2024-01-23 11:11:40
