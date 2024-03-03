
> Name

自适应考夫曼移动平均线趋势跟踪策略Adaptive-Kaufman-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/152597fc80e60846ad1.png)
[trans]

## 概述

该策略利用自适应移动平均线指标考夫曼自适应移动平均线(KAMA)来跟踪价格趋势,实现低买高卖,获利。

## 策略原理

考夫曼自适应移动平均线(KAMA)指标的计算公式为:

```
nAMA = nz(nAMA[1]) + nsmooth * (Close - nz(nAMA[1]))

其中:

nsmooth = (nefratio * (nfastend - nslowend) + nslowend)^2

nefratio = nsignal / nnoise 

nsignal = |Close - Close[Length]|

nnoise = sum(|Close - Close[1]|, Length)

nfastend = 0.666

nslowend = 0.0645
```

该指标综合考虑了市场波动性和价格变化趋势,可以更快地跟踪价格趋势。具体来说:

1. 当市场波动较小时,nsmooth 接近 nslowend,KAMA 线变化缓慢,抑制市场噪音。
2. 当市场波动加大和出现趋势时,nsmooth 接近 nfastend,KAMA 线快速变化,跟踪趋势。

通过比较价格和 KAMA 的关系,可以判断价格的趋势方向,以此来决定做多做空。

## 策略优势

该策略最大的优势在于利用自适应移动平均线指标跟踪价格趋势变化,可以有效减少噪音的影响,跟踪效果好。具体优势如下:

1. KAMA指标抑制市场噪音,可以减少不必要的交易次数组合。
2. KAMA指标可以快速响应价格变化趋势,追踪效果好。
3. 策略决策规则简单清晰,容易理解和实现。
4. 可配置反向交易,适应不同市场环境。

## 策略风险

该策略也存在一些风险:

1. 在震荡行情中,KAMA指标可能出现误差信号。可通过调整参数优化指标效果。
2. 跟踪延迟存在,可能错过短期价格反转。可酌情结合其他指标诊断。 
3. 未考虑交易费用和滑点,实盘效果会弱于回测。

## 策略优化方向 

该策略还可以从以下几个方面进行优化:

1. 优化KAMA参数,提高指标的跟踪灵敏度。
2. 增加止损机制,控制单笔交易的最大损失。
3. 结合其它指标过滤信号,提高决策的准确性。
4. 添加重新入场机制,进一步跟踪趋势。

## 总结

本策略利用考夫曼自适应移动平均线指标跟踪价格趋势,决策规则简单清晰,实盘操作容易。该指标抑制噪音的同时快速响应价格变化,跟踪效果良好,是一个值得推荐的趋势跟踪策略。

||

## Overview

This strategy uses the Adaptive Moving Average indicator Kaufman's Adaptive Moving Average (KAMA) to track price trends and make long and short decisions to profit.

## Strategy Logic  

The calculation formula for Kaufman's Adaptive Moving Average (KAMA) indicator is:

```
nAMA = nz(nAMA[1]) + nsmooth * (Close - nz(nAMA[1])) 

where:  

nsmooth = (nefratio * (nfastend - nslowend) + nslowend)^2

nefratio = nsignal / nnoise

nsignal = |Close - Close[Length]|  

nnoise = sum(|Close - Close[1]|, Length)

nfastend = 0.666  

nslowend = 0.0645
```

This indicator takes into account both market volatility and price change trends, allowing it to track price trends more quickly. Specifically:  

1. When market volatility is low, nsmooth is close to nslowend, and KAMA line changes slowly to suppress market noise.

2. When market volatility rises and a trend emerges, nsmooth approaches nfastend, and KAMA line changes rapidly to track the trend.

By comparing price with KAMA, the trend direction can be determined to make long and short decisions.  

## Advantages

The biggest advantage of this strategy is using the adaptive moving average indicator KAMA to track price trend changes, which can effectively reduce the impact of noise and improve tracking performance. Specific advantages:

1. KAMA indicator suppresses market noise and reduces unnecessary trade combinations.

2. KAMA indicator can respond quickly to price trend changes with good tracking effect.  

3. The strategy decision rules are simple and clear, easy to understand and implement.

4. Reversal trading can be configured to suit different market environments.

## Risks

There are also some risks with this strategy:  

1. KAMA indicator may generate erroneous signals in choppy markets. Parameters can be adjusted for optimization.

2. Tracking lag exists, potentially missing short-term price reversals. Other indicators can be combined for diagnosis.

3. Trading costs and slippage are not considered, real performance would be weaker than backtest.

## Enhancement Directions

This strategy can also be optimized in the following aspects:

1. Optimize KAMA parameters to improve indicator tracking sensitivity.  

2. Add stop loss mechanism to limit maximum loss per trade.

3. Combine other indicators to filter signals and improve decision accuracy.  

4. Add re-entry mechanism for further trend tracking.

## Summary  

This strategy uses Kaufman's Adaptive Moving Average to track price trends. The decision rules are simple and easy to implement for live trading. While suppressing noise, the indicator responds quickly to price changes with excellent tracking effect. It is a recommended trend following strategy worth trying out.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-03 00:00:00
end: 2024-01-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/08/2017
// Everyone wants a short-term, fast trading trend that works without large
// losses. That combination does not exist. But it is possible to have fast
// trading trends in which one must get in or out of the market quickly, but
// these have the distinct disadvantage of being whipsawed by market noise
// when the market is volatile in a sideways trending market. During these
// periods, the trader is jumping in and out of positions with no profit-making
// trend in sight. In an attempt to overcome the problem of noise and still be
// able to get closer to the actual change of the trend, Kaufman developed an
// indicator that adapts to market movement. This indicator, an adaptive moving
// average (AMA), moves very slowly when markets are moving sideways but moves
// swiftly when the markets also move swiftly, change directions or break out of
// a trading range.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Kaufman Moving Average Adaptive (KAMA)", shorttitle="Kaufman Moving Average Adaptive (KAMA)", overlay = true)
Length = input(21, minval=1)
xPrice = close
xvnoise = abs(xPrice - xPrice[1])
nfastend = 0.666
nslowend = 0.0645
reverse = input(false, title="Trade reverse")
nsignal = abs(xPrice - xPrice[Length])
nnoise = sum(xvnoise, Length)
nefratio = iff(nnoise != 0, nsignal / nnoise, 0)
nsmooth = pow(nefratio * (nfastend - nslowend) + nslowend, 2) 
nAMA = nz(nAMA[1]) + nsmooth * (xPrice - nz(nAMA[1]))
pos = iff(close[1] > nAMA, 1,
	   iff(close[1] < nAMA, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )    
plot(nAMA, color=blue, title="KAMA")

```

> Detail

https://www.fmz.com/strategy/437539

> Last Modified

2024-01-03 16:01:20
