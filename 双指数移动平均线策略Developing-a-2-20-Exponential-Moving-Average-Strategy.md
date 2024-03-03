
> Name

双指数移动平均线策略Developing-a-2-20-Exponential-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

本策略运用双指数移动平均线,根据价格突破平均线的方向来判断多空方向。当价格上涨突破平均线时做多,当价格下跌突破平均线时做空。该策略结合趋势判断和超买超卖来锁定获利。

## 策略原理

该策略基于双指数移动平均线指标。指标中的Length参数设置平均线周期为20天。xPrice参数设置为收盘价close。然后计算出20日指数移动平均线xXA。同时计算最近两天的最高价和最低价nHH和nLL。如果nLL高于平均线或者nHH低于平均线,取nLL和nHH中的较小值作为关键价格nXS。如果收盘价高于平均线且高于关键价格,做多;如果收盘价低于平均线且低于关键价格,做空。最后根据reverse参数判断是否反向操作。

该策略判断价格突破平均线的方向,结合实时最高价和最低价来确定突破的有效性,避免假突破。当价格实际突破平均线时才发出交易信号。

## 优势分析

1. 使用双指数移动平均线,能够更准确地判定趋势方向。

2. 结合最高价和最低价判断突破有效性,可避免因价格震荡造成的假突破。

3. 可方便地通过reverse参数调整做多做空方向,适应不同市场环境。

4. 突破平均线时才交易,可以有效过滤市场 Noise。

## 风险分析 

1. 双指数移动平均线有时反应不灵敏,可能错过短期交易机会。

2. 移动平均线系统容易在盘整市中产生频繁的虚假信号。

3. 该策略适合趋势明显的市场环境,不适合盘整震荡市。

4. 未考虑止损退出机制,存在亏损扩大的风险。

5. 未设定头寸规模,可能造成风险控制不当。

## 优化方向

1. 可以结合其他指标判断市场趋势,避免在盘整市频繁交易。

2. 可以添加动态止损来控制单笔亏损风险。

3. 可以根据市场波动程度动态调整移动平均线参数,优化指标灵敏度。 

4. 可以设置头寸规模,在扩大获利的同时控制风险。

5. 可以通过Walk Forward Analysis方法进行参数优化。

## 总结

本策略运用双指数移动平均线指标判断价格趋势方向,并结合最高价和最低价避免假突破。在优化止损机制、头寸规模控制等方面还有改进空间。但该策略整体来说简单实用,通过参数调整可以适应不同市场环境,是一种可靠的趋势跟踪策略。

|| 

## Overview

This strategy utilizes a dual exponential moving average to determine the direction of the trend based on the price breaking through the moving average. It goes long when the price rises above the moving average and goes short when the price falls below the moving average. The strategy combines trend determination and overbought/oversold levels to lock in profits.

## Strategy Logic  

The strategy is based on the dual exponential moving average indicator. The Length parameter in the indicator sets the moving average period to 20 days. The xPrice parameter is set to the closing price close. The 20-day exponential moving average xXA is then calculated. The highest high nHH and lowest low nLL over the past two days are also calculated. If nLL is higher than the moving average or nHH is lower than the moving average, the smaller of nLL and nHH is taken as the key price nXS. If the closing price is higher than the moving average and the key price, it goes long. If the closing price is lower than the moving average and key price, it goes short. The reverse parameter determines if the trades are reversed.

The strategy judges the direction of the price breaking through the moving average and combines the real-time highest high and lowest low to determine the validity of the breakout to avoid false breakouts. It only sends trade signals when the price actually breaks through the moving average.

## Advantage Analysis

1. The dual exponential moving average can more accurately determine the trend direction.

2. Combining the highest high and lowest low to judge the validity of the breakout avoids false breakouts caused by price fluctuations. 

3. The long/short direction can be easily reversed using the reverse parameter to adapt to different market environments.

4. Only trading on breakouts effectively filters out market noise.

## Risk Analysis

1. The dual exponential moving average sometimes reacts slowly and may miss short-term trading opportunities.

2. Moving average systems are prone to generating frequent false signals during market consolidations.

3. The strategy suits market environments with obvious trends and is unsuitable for range-bound volatile markets.

4. It does not consider stop loss exits and has the risk of enlarging losses. 

5. It does not set position sizing and may lead to improper risk control.

## Optimization Directions 

1. Other indicators can be combined to judge market trends and avoid frequent trading during consolidations.

2. Dynamic stops can be added to control the risk of single trade losses.

3. The moving average parameters can be dynamically adjusted based on market volatility to optimize indicator sensitivity.

4. Position sizing can be set to control risks while expanding profits. 

5. Parameters can be optimized using Walk Forward Analysis.

## Summary

This strategy utilizes a dual exponential moving average indicator to determine the price trend direction while combining the highest high and lowest low to avoid false breakouts. There is room for improvement in optimizing stop loss mechanisms, controlling position sizing, etc. But overall, the strategy is simple, practical, and adaptable to different market environments through parameter adjustments, making it a reliable trend following strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-10-07 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 27/12/2016
// Strategy
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
//
// You can use in the xPrice any series: Open, High, Low, Close, HL2, HLC3, OHLC4 and ect...
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Strategy 2/20 Exponential Moving Average", overlay = true)
Length = input(20, minval=1)
reverse = input(false, title="Trade reverse")
xPrice = close
xXA = ema(xPrice, Length)
nHH = max(high, high[1])
nLL = min(low, low[1])
nXS = iff((nLL > xXA)or(nHH < xXA), nLL, nHH)
pos =  iff(close > xXA and close > nXS , 1,
	     iff(close < xXA and close < nXS, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(nXS, color=blue, title="XAverage")
```

> Detail

https://www.fmz.com/strategy/428706

> Last Modified

2023-10-08 15:14:17
