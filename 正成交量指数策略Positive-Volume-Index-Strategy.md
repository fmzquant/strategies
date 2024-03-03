
> Name

正成交量指数策略Positive-Volume-Index-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

正成交量指数策略通过比较昨日和今日的成交量,在成交量放大的情况下计算价格变化,形成正成交量指数,并与其均线进行比较,产生交易信号。该策略遵循成交量放大,价格同步放大的市场规律。

## 策略原理 

该策略首先计算价格的日内涨跌幅xROC。然后比较今日成交量volume是否大于昨日volume[1]。如果大于,则今日正成交量指数nRes为昨日指数nRes[1]加上xROC;如果今日成交量小于或等于昨日,则今日指数维持昨日水平nRes[1]。

计算出正成交量指数nRes后,与其N日指数移动平均线nResEMA进行比较。如果nRes大于nResEMA,则为看多信号,如果nRes小于nResEMA,则为看空信号。

该策略遵循正成交量指数与其均线的关系,产生交易信号。当指数上穿均线时,为买入信号;当指数下穿均线时,为卖出信号。

## 优势分析

该策略具有以下优势:

1. 利用成交量变化,能捕捉市场积极性的变化。

2. 具有一定的趋势跟踪能力。指数上涨预示可能进入多头市场。

3. 计算方式简单,容易实现与回测。

4. 可以通过调整均线参数来控制交易频率。

## 风险分析

该策略的风险主要有:

1. 成交量放大不一定代表价格放大,存在背离的可能。

2. 需设置合理止损来控制亏损。

3. 指数与均线产生交易信号滞后于价格变化。

4. 成交量异常或策略过优化都可能产生错误信号。

## 优化方向 

该策略可以从以下几个方面进行优化:

1. 测试添加其他技术指标进行信号过滤,如MACD、KDJ等。

2. 优化均线参数,寻找最佳平衡点。

3. 加入止损策略,如移动止损,控制风险。

4. 可以考虑加入分批建仓退出机制,逐步减少风险。

5. 针对具体品种进行参数优化,提高策略稳定性。

## 总结

正成交量指数策略基于成交量变化来设计交易信号,具有一定的市场跟随能力。但需注意成交量放大不一定代表价格放大的问题。通过参数优化,止损设置,以及添加其他技术指标等手段,可以控制风险,提高策略效果。该策略适合探索量价关系,辅助判断市场时点的选择。

||

## Overview

The Positive Volume Index strategy compares the volume of yesterday and today. It calculates price change on days when volume expands to form the positive volume index, and compares it to its moving average to generate trading signals. The strategy follows the market principle of concurrent volume and price expansion.

## Strategy Logic

The strategy first calculates the daily price change xROC. It then compares today's volume with yesterday's volume[1]. If today's volume is greater, the positive volume index nRes today is yesterday's index nRes[1] plus xROC. If today's volume is less than or equal to yesterday's, today's index remains the same as yesterday's nRes[1].

After calculating the positive volume index nRes, it is compared to its N-day moving average nResEMA. If nRes is greater than nResEMA, it is a long signal. If nRes is less than nResEMA, it is a short signal. 

The strategy follows the relationship between the positive volume index and its moving average to generate trading signals. When the index crosses above the moving average, it is a buy signal. When the index crosses below, it is a sell signal.

## Advantage Analysis 

The advantages of this strategy include:

1. It captures market momentum by observing volume change.

2. It has some trend following capability. Index rise suggests potential bull market.

3. The logic is simple for implementation and backtesting. 

4. Trading frequency can be controlled by adjusting the moving average parameter.

## Risk Analysis

The main risks of this strategy are:

1. Volume expansion does not necessarily mean price expansion. Divergence may happen.

2. Reasonable stop loss should be set to control losses.

3. Signals from index and moving average lag price changes. 

4. Abnormal volume or over-optimization can lead to false signals.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Test adding other technical indicators like MACD, KDJ for signal filtration.

2. Optimize the moving average parameter for best balance. 

3. Add stop loss mechanisms like trailing stop to control risks.

4. Consider partial position exits to gradually reduce risks.

5. Optimize parameters for specific products to improve robustness.

## Conclusion

The positive volume index strategy designs trades based on volume change, with some market following capability. But divergence between volume and price should be noted. By optimizing parameters, setting stop loss, adding indicators etc, the strategy can be improved to control risks and enhance performance. It is suitable for exploring price-volume relationship and assisting market timing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|255|EMA_Len|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 11/10/2017
// The theory behind the indexes is as follows: On days of increasing volume, 
// you can expect prices to increase, and on days of decreasing volume, you can 
// expect prices to decrease. This goes with the idea of the market being in-gear 
// and out-of-gear. Both PVI and NVI work in similar fashions: Both are a running 
// cumulative of values, which means you either keep adding or subtracting price 
// rate of change each day to the previous day`s sum. In the case of PVI, if today`s 
// volume is less than yesterday`s, don`t add anything; if today`s volume is greater, 
// then add today`s price rate of change. For NVI, add today`s price rate of change 
// only if today`s volume is less than yesterday`s.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Positive Volume Index", shorttitle="Positive Volume Index")
EMA_Len = input(255, minval=1)
reverse = input(false, title="Trade reverse")
xROC = roc(close, 1)
nRes = iff(volume > volume[1], nz(nRes[1], 0) + xROC, nz(nRes[1], 0))
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
plot(nRes, color=red, title="PVI")
plot(nResEMA, color=blue, title="EMA")
```

> Detail

https://www.fmz.com/strategy/427183

> Last Modified

2023-09-18 21:21:54
