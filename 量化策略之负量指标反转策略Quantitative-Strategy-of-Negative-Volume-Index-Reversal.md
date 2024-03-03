
> Name

量化策略之负量指标反转策略Quantitative-Strategy-of-Negative-Volume-Index-Reversal

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/712b0685281490c31e.png)
[trans]

## 概述

本策略名称为负量指标反转策略(Negative Volume Index Reversal Strategy)。该策略利用负量指标(NVI)和其移动平均线构建长短信号,在满足条件时进行反转交易,属于反转类策略。

## 策略原理  

负量指标反转策略的核心指标是负量指标(NVI)。NVI的计算公式是:

当天成交量 < 前一天成交行量时:NVI = 前一天NVI + 当天价格变化率  

当天成交量 >= 前一天成交行量时:NVI = 前一天NVI

也就是说,NVI只在成交量缩量的日子进行更新,通过价格变化率的加减来反映价格走势。과NVI构建长短信号的逻辑是:

- 当NVI高于其N日移动平均线时,做多
- 当NVI低于其N日移动平均线时,做空

这样,就在量缩的时候进行反转交易。

## 策略优势

负量指标反转策略的主要优势有:

1. 利用成交量信号,可以找到反转点,具有一定的时点优势。

2. 策略逻辑简单,容易理解和实现。

3. 可通过调整参数进行优化,适应不同市场环境。

## 策略风险 

负量指标反转策略也存在一些风险:  

1. 成交量信号精确度无法保证,存在一定的错误交易概率。

2. 参数设置不当可能导致过于频繁交易或信号不明显。

3. 需确保数据源可靠,避免成交量数据错误带来风险。  

可以通过参数优化,结合止损策略等方式降低这些风险。

## 优化方向

负量指标反转策略可以从以下几个方面进行优化:  

1. 优化移动平均线参数,找到更好描述市场特征的参数。

2. 加入其他指标过滤,避免不必要的错误交易。比如加大级别趋势判断。

3. 结合强力的止损方式,限制单笔损失。

4. 测试不同品种参数设置差异,设定自适应参数。

## 总结  

负量指标反转策略通过在成交量缩量的时候进行反转操作,目标是抓取潜在趋势反转点。该策略有简单、易理解的优点,同时也存在一定错误交易风险。可以通过参数优化、加入辅助指标等方式提升策略稳定性与盈利能力。总体而言,负量指标反转策略具有较好的发展与应用前景。

||

## Overview

The name of this strategy is Negative Volume Index Reversal Strategy. This strategy uses Negative Volume Index (NVI) and its moving average to construct long and short signals and make reversal trades when conditions are met. It belongs to the reversal strategy category.  

## Strategy Principle

The core indicator of the Negative Volume Index reversal strategy is Negative Volume Index (NVI). The calculation formula of NVI is:

If today's volume < previous day's volume: NVI = previous day's NVI + today's price change rate  

If today's volume >= previous day's volume: NVI = previous day's NVI

That is to say, NVI is only updated on the day when the trading volume shrinks, and the trend of the price is reflected through the addition and subtraction of the price change rate. The logic of constructing long and short signals with NVI and its moving average is:  

- When NVI is above its N-day moving average, go long.  

- When NVI is below its N-day moving average, go short.   

So it makes reversal trades when the volume shrinks.

## Advantages of the Strategy  

The main advantages of the Negative Volume Index reversal strategy are:  

1. Using volume signals can find reversal points and has certain timing advantages.  

2. The strategy logic is simple, easy to understand and implement.

3. Parameters can be optimized to adapt to different market environments.

## Risks of the Strategy

The Negative Volume Index reversal strategy also has some risks:   

1. The accuracy of volume signals cannot be guaranteed, and there is a certain probability of erroneous trades.  

2. Improper parameter settings may lead to over-frequent trading or unclear signals.

3. Ensure reliable data sources to avoid risks from erroneous volume data.

These risks can be reduced through parameter optimization, stop loss strategies, etc.  

## Optimization Directions  

The Negative Volume Index reversal strategy can be optimized in the following aspects:

1. Optimize the moving average parameters to find parameters that better describe market characteristics.  

2. Add other indicators for filtering to avoid unnecessary erroneous trades. For example, add larger timeframe trend judgments.

3. Combine with strong stop loss methods to limit single loss.

4. Test differences in parameter settings for different varieties, and set adaptive parameters.   

## Conclusion  

The Negative Volume Index reversal strategy makes reversal operations when the trading volume shrinks, aiming to capture potential trend reversal points. This strategy has the advantages of simplicity and easy understanding, and also has certain risks of erroneous trades. The stability and profitability of the strategy can be improved through parameter optimization, adding auxiliary indicators, etc. In general, the Negative Volume Index reversal strategy has good prospects for development and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|255|EMA_Len|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-13 00:00:00
end: 2023-12-20 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter 11/08/2017
// The theory behind the indexes is as follows: On days of increasing 
// volume, you can expect prices to increase, and on days of decreasing 
// volume, you can expect prices to decrease. This goes with the idea of 
// the market being in-gear and out-of-gear. Both PVI and NVI work in similar 
// fashions: Both are a running cumulative of values, which means you either 
// keep adding or subtracting price rate of change each day to the previous day`s 
// sum. In the case of PVI, if today`s volume is less than yesterday`s, don`t add 
// anything; if today`s volume is greater, then add today`s price rate of change. 
// For NVI, add today`s price rate of change only if today`s volume is less than 
// yesterday`s.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Negative Volume Index Backtest", shorttitle="NVI Str")
EMA_Len = input(255, minval=1)
reverse = input(false, title="Trade reverse")
xROC = roc(close, 1)
nRes = iff(volume < volume[1], nz(nRes[1], 0) + xROC, nz(nRes[1], 0))
nResEMA = ema(nRes, EMA_Len)
pos = iff(nRes > nResEMA, 1,
	     iff(nRes < nResEMA, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nRes, color=red, title="NVI")
plot(nResEMA, color=blue, title="EMA")
```

> Detail

https://www.fmz.com/strategy/436111

> Last Modified

2023-12-21 12:12:04
