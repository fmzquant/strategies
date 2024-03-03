
> Name

聚合动量指标策略Chaikin-Oscillator-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

聚合动量指标策略运用聚合动量指标来判断市场的资金流向,以捕捉市场的趋势变化。该策略结合快速移动平均线和慢速移动平均线,形成指标曲线,曲线上穿趋势买入,曲线下穿趋势卖出,以追踪市场趋势。

## 策略原理

该策略基于聚合动量指标,该指标改进了威廉指标,用当日最高价和最低价的平均价代替开盘价,以解决开盘价缺失的问题。指标公式为:

聚合动量线 = 快速聚合动量指数移动平均线 - 慢速聚合动量指数移动平均线

其中,聚合动量指数计算公式为:

聚合动量指数 = (收盘价 - 开盘价) / (最高价 - 最低价) * 成交量

由于开盘价缺失,这里采用:

聚合动量指数 = (收盘价 - (最高价+最低价)/2) / (最高价 - 最低价) * 成交量 

指标以快速移动平均线和慢速移动平均线的差值为聚合动量线。当快速线上穿慢速线时为买入信号,下穿为卖出信号。

具体操作为:

1. 计算聚合动量指数
2. 计算快速EMA和慢速EMA
3. 计算二者差值作为聚合动量线
4. 线上穿0轴买入,下穿0轴卖出

## 优势分析

该策略具有以下优势:

1. 捕捉市场资金流向,判断市场趋势
2. 结合快慢速均线,过滤假突破
3. 规则清晰简单,容易实施

## 风险分析

该策略也存在一些风险:

1. 聚合动量指标存在滞后,可能错过趋势转折点
2. 需适当调整参数,避免产生过多交易信号
3. 需考虑止损,控制单笔损失

可通过参数优化、结合其他指标等方法来控制风险。

## 优化方向

该策略可以考虑以下几个方向进行优化:

1. 优化快慢速均线参数,平衡交易频率和稳定性
2. 加入离场条件,如趋势反转等信号
3. 结合其他指标进行过滤,如RSI、MACD等
4. 加入止损策略,控制单笔损失
5. 不同品种可调整参数,产生定制化策略

## 总结

聚合动量指标策略整体来说较为稳定和可靠,通过参数调整可平衡收益和风险。加入过滤条件和止损可进一步提高策略稳定性。该策略适合追踪趋势型市场,可通过定制化优化得到满意的策略效果。


||


## Overview

The Chaikin Oscillator strategy uses the Chaikin Oscillator indicator to judge capital flow in the market and capture trend changes. This strategy combines fast and slow moving averages to form an indicator curve, buying when the curve crosses above the trendline and selling when the curve crosses below to track market trends.

## Strategy Logic

This strategy is based on the Chaikin Oscillator indicator, which improves on the Williams Accumulation/Distribution indicator by using the average of the high and low prices instead of the opening price to address the missing opening price problem. The indicator formula is:

Chaikin Oscillator = Fast EMA of Accumulation/Distribution Index - Slow EMA of Accumulation/Distribution Index

Where the Accumulation/Distribution Index is calculated as: 

Accumulation/Distribution Index = (Close - Open) / (High - Low) * Volume

Since the opening price is missing, it is calculated here as:

Accumulation/Distribution Index = (Close - (High + Low)/2) / (High - Low) * Volume

The indicator takes the difference between fast and slow EMAs of the index as the Chaikin Oscillator. A crossing above 0 indicates a buy signal, while a crossing below 0 indicates a sell signal. 

The specific logic is:

1. Calculate the Accumulation/Distribution Index 
2. Calculate fast and slow EMAs
3. Take the difference as the Chaikin Oscillator
4. Buy when the oscillator crosses above 0, sell when it crosses below 0

## Advantage Analysis 

The advantages of this strategy are:

1. Captures capital flow to determine market trend
2. Combines fast and slow moving averages to filter false breaks  
3. Simple and clear rules easy to implement

## Risk Analysis

Some risks of this strategy are:

1. The Chaikin Oscillator lags, potentially missing trend turning points
2. Requires tuning parameters to avoid excessive trades  
3. Needs stop loss to control single losing trades

Risks can be managed through parameter optimization, combining with other indicators, etc.

## Improvement Directions

Some ways to improve this strategy:

1. Optimize fast and slow EMA periods to balance frequency and stability
2. Add exit conditions like trend reversal signals 
3. Add filters like RSI, MACD to confirm signals
4. Incorporate stop loss strategy to control losses
5. Adjust parameters for different products to create customized strategies

## Conclusion

Overall the Chaikin Oscillator strategy is relatively stable and reliable. Fine tuning parameters can balance profitability and risk. Adding filters and stop loss can further improve robustness. This trend following strategy can achieve satisfactory results through customized optimizations.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Fast|
|v_input_2|10|Slow|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-10-11 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/09/2017
//    Indicator plots Money Flow Indicator (Chaikin). This indicator looks 
//    to improve on Larry William's Accumulation Distribution formula that 
//    compared the closing price with the opening price. In the early 1970's, 
//    opening prices for stocks stopped being transmitted by the exchanges. 
//    This made it difficult to calculate Williams' formula. The Chaikin 
//    Oscillator uses the average price of the bar calculated as follows 
//    (High + Low) /2 instead of the Open.
//    The indicator subtracts a 10 period exponential moving average of the 
//    AccumDist function from a 3 period exponential moving average of the 
//    AccumDist function.    
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Money Flow Indicator (Chaikin Oscillator)", shorttitle="MFI")
Fast = input(3, minval=1)
Slow = input(10, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=gray, linestyle=hline.style_dashed)
lenMax = max(Fast, Slow)
lenMin = min(Fast, Slow)
xDiv = (high - low) * volume
SumMax = sum(iff(xDiv > 0, (close - open) / (high - low) * volume , 0) , lenMax)
SumMin = sum(iff(xDiv > 0, (close - open) / (high - low) * volume , 0) , lenMin)
emaMax = ema(SumMax, lenMax)
emaMin = ema(SumMin, lenMin)
nRes = emaMax - emaMin
pos = iff(nRes > 0, 1,
	   iff(nRes < 0, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nRes, color=blue, title="RMI")
```

> Detail

https://www.fmz.com/strategy/429077

> Last Modified

2023-10-12 16:41:54
