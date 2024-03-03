
> Name

零时滞后-Hull-EMA-组合-趋势跟踪策略Zero-Lag-Hull-EMA-Combo-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略运用零时滞后 EMA 和 Hull EMA 的组合来实现趋势跟踪。零时滞后 EMA 可消除普通 EMA 的滞后,Hull EMA 则可平滑价格曲线。两者的组合可以更准确地捕捉趋势走势,实现低风险的趋势跟踪交易。

### 策略原理   

首先计算出零时滞后 EMA:
    ```
    EMA1 = ema(close, Period)
    EMA2 = ema(EMA1, Period) 
    Difference = EMA1 - EMA2
    ZeroLagEMA = EMA1 + Difference
    ```

其中,ZeroLagEMA 是零时滞后 EMA。它消除了普通 EMA 的滞后问题。

然后计算出 Hull EMA 平滑后的曲线:
    ```
    n2ma = 2*wma(ZeroLagEMA, round(S_period/2)) 
    nma = wma(ZeroLagEMA, S_period)
    n1 = wma(n2ma - nma, sqn)
    ```

最后计算当前 Hull EMA(n1)与上一周期 Hull EMA(n2)的大小关系,判断趋势方向,制定交易策略。

### 优势分析

该策略最大的优势在于能够准确捕捉趋势方向。原因有二:

1. 零时滞后 EMA 消除了普通 EMA 的滞后问题,能够更快速地捕捉价格变化。

2. Hull EMA 对价格进行了双平滑,可过滤掉部分噪音,Capture趋势更加清晰。

相比单独使用 EMA 或 Hull EMA,两者的组合能够发挥各自的优势,使策略更准确、更可靠。

### 风险分析

该策略主要存在以下风险:

1. Period 和 S_period 参数设置不当,可能导致策略对市场反应不敏感,错过交易时机。

2. 震荡行情中,EMA 和 Hull EMA 可能产生较多交叉信号,需要警惕假突破。

3. 无法有效处理价格隔夜大幅跳空的情况。

因此,需要仔细测试参数设置,谨慎看待指标信号,防范价格跳空的风险。

### 优化方向

该策略可以从以下方面进行优化:

1. 测试不同市场不同周期下的参数优化组合,使策略对各种行情都有较好的适应性。

2. 结合其他指标过滤假突破信号,例如KDJ,MACD等,提高策略的稳定性。 

3. 增加止损策略,以控制单笔损失。

4. 优化入场 timing,进一步提升策略的胜率。例如结合趋势方向,避免逆势开仓。

### 总结

该策略运用零时滞后 Hull EMA 的组合,可准确、灵敏地捕捉市场趋势,以低风险的方式进行趋势跟踪交易。通过参数优化、指标过滤、止损等手段可进一步提高策略稳定性。总体来说,该策略简单实用,适合趋势货币对及股指的交易。

||

### Overview

This strategy uses a combination of Zero Lag EMA and Hull EMA to implement trend following. Zero Lag EMA eliminates the lag of regular EMA, and Hull EMA smooths the price curve. Their combination can more accurately capture trend movements for low-risk trend following trading.

### Strategy Logic

First calculate the Zero Lag EMA:
    ```
    EMA1 = ema(close, Period)
    EMA2 = ema(EMA1, Period)
    Difference = EMA1 - EMA2 
    ZeroLagEMA = EMA1 + Difference
    ```

Where ZeroLagEMA is the Zero Lag EMA. It eliminates the lag problem of regular EMA. 

Then calculate the Hull EMA smoothed curve:

    ```
    n2ma = 2*wma(ZeroLagEMA, round(S_period/2))
    nma = wma(ZeroLagEMA, S_period) 
    n1 = wma(n2ma - nma, sqn)
    ```

Finally, determine the trend direction based on the magnitude relationship between the current Hull EMA (n1) and the previous period's Hull EMA (n2), and formulate the trading strategy.

### Advantage Analysis 

The biggest advantage of this strategy is the ability to accurately capture trend directions. There are two reasons:

1. Zero Lag EMA eliminates the lag problem of regular EMA and can capture price changes faster.

2. Hull EMA doubles smoothes prices and filters out some noise to capture trends more clearly.

Compared to using EMA or Hull EMA alone, the combination leverages the strengths of both for a more accurate and reliable strategy.

### Risk Analysis

The main risks of this strategy are:

1. Improper Period and S_period parameter settings may cause the strategy to be insensitive to the market and miss trading opportunities.

2. In ranging markets, EMA and Hull EMA may produce more false crossover signals that require caution. 

3. It cannot effectively handle overnight price gaps.

Therefore, careful parameter testing is needed, indicator signals should be interpreted prudently, and price gap risks guarded against.

### Optimization Directions

The strategy can be optimized in the following aspects:

1. Test parameter combinations under different markets and timeframes for better adaptability.

2. Add other indicators to filter false breakout signals, such as KDJ, MACD etc, to improve stability.

3. Add stop loss to control single trade loss. 

4. Optimize entry timing to further improve win rate, e.g. avoiding trades against the trend.

### Summary

This strategy uses the Zero Lag Hull EMA combo to accurately and sensitively capture market trends for low-risk trend following trading. Further improvements in stability can be achieved through parameter optimization, signal filtering, stop loss etc. Overall, the strategy is simple, practical and suitable for trending currency pairs and indices.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|Period|
|v_input_2|176|Smoother Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Zero Lag EMA combined with Hull moving average for smoothing purposes.
// author: email: sbginter@gmail.com

strategy("Ujanja", overlay=true)



Period = input(title="Period",defval=30, minval=1)
S_period=input(title="Smoother Period",defval=176)
EMA1= ema(close,Period)
EMA2= ema(EMA1,Period)
Difference= EMA1 - EMA2
ZeroLagEMA= EMA1 + Difference

n2ma=2*wma(ZeroLagEMA,round(S_period/2))
nma=wma(ZeroLagEMA,S_period)
diff=n2ma-nma
sqn=round(sqrt(S_period))


n2ma1=2*wma(ZeroLagEMA[1],round(S_period/2))
nma1=wma(ZeroLagEMA[1],S_period)
diff1=n2ma1-nma1
sqn1=round(sqrt(S_period))


n1=wma(diff,sqn)
n2=wma(diff1,sqn)

c=n1>n2?green:red
ma=plot(n1,color=c)


longCondition = n1>n2
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = longCondition != true
if (shortCondition)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/427274

> Last Modified

2023-09-19 16:53:31
