
> Name

动量突破GetString策略GetString-Momentum-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/151ace47202424afa7d.png)

[trans]

## 概述

这个策略综合运用了移动平均线、CCI指标、PSAR指标和ADX动向指数等多个指标,实现了一个比较典型的突破策略。当市场出现明确的多头信号时做多,出现明确空头信号时做空,非常适合中短线操作。

## 原理

该策略的入场条件包含以下几个方面:
1. 移动平均线方面:要求5日线上穿10日线,10日线上穿20日线,20日线上穿40日线,这样能有效过滤掉多数假突破。 
2. CCI指标方面:要求CCI指标小于-100时为多头入场signal,大于100时为空头入场signal。
3. PSAR点状方向指标方面:要求PSAR点状指标的方向与价格区分趋势的方向一致。 
4. ADX动态指标方面:要求ADX大于20,表示目前处于趋势市场,适合使用突破系统。

同时,出场条件也考虑了多个指标:
1. 移动平均线方面:与入场条件相反,如5日线下穿10日线则为头寸平仓信号。
2. CCI指标、PSAR点状指标也与入场条件相反,如CCI指标大于100则为多单平仓。  

这样,策略的入场比较严格,出场比较宽松,这样可以获得比较高的获利率。

## 优势

这是一个比较典型的多指标组合突破策略,具有以下几个优势:

1. 入场条件严格,采用多重指标过滤,可以减少假突破带来的风险。
2. 指标参数经过优化,对市场有很好的适应性。
3. 采用了趋势判断指标,避免在震荡市场中被套。
4. 采用了移动平均线来确定中短线走势,比较稳定。
5. CCI指标可以捕捉短期超买超卖现象。
6. PSAR点状指标判断市场趋势方向的能力较强。  

## 风险

该策略也存在以下风险:

1. 在极端行情中,多重指标组合的效果会打折扣,无法全面过滤风险。
2. 趋势巨大时,采用中短期指标判断时机可能会失效,无法完全捕捉趋势。
3. CCI等局部指标参数设置不当可能导致错失机会。
4. PSAR指标在趋势转折点效果不佳。

对策:
1. 可适当放宽入场条件,付出更多成本换取更低风险。  
2. 增加更长线段的指标判断,如60日乃至更长的移动平均线。
3. 动态优化CCI等参数。
4. 结合更多指标判断走势,如布林线。

## 优化方向  

该策略还有以下几个优化的方向:

1. 增加机器学习算法,实时优化参数,提高参数的自适应性。
2. 增加模型组合技术,结合更多非相关性策略,提高稳定性。
3. 引入风控机制,如止损策略,可以有效控制单笔止损。
4. 增加趋势判断模块,避免陷入震荡行情。
5. 优化指标权重,使得不同市场环境中最优指标起主导作用。

## 总结 

该策略总的来说是一个典型且经典的多指标突破策略。它优点是入场条件严谨,出场条件宽松,而且包含了趋势判断模块。但是也存在一定的风险,需要不断优化,使其能够适应更加复杂的市场环境。模型组合和参数优化都是它的发展方向。

||


## Overview  

This strategy combines moving average, CCI indicator, PSAR indicator and ADX trend index to implement a typical breakthrough strategy. It goes long when there is a clear bullish signal and goes short when there is a clear bearish signal, which is very suitable for medium and short-term operations.

## Principles

The entry conditions of the strategy include the following aspects:

1. Moving average: requiring 5-day line breaking through 10-day line, 10-day line breaking through 20-day line and 20-day line breaking through 40-day line, which can effectively filter out most false breakthroughs.

2. CCI indicator: requiring CCI indicator less than -100 as the long signal, and greater than 100 as the short signal.  

3. PSAR indicator: requiring the direction of PSAR indicator to be consistent with the trend direction determined by the price.  

4. ADX indicator: requiring ADX greater than 20, indicating the market is now in a trend, which is suitable for using breakthrough systems.

At the same time, the exit conditions also take multiple indicators into consideration: 

1. Moving average: the opposite of entry conditions. For example, 5-day line breaking down 10-day line is the signal of closing positions.

2. CCI and PSAR indicators have opposite meanings to entry conditions. For example, CCI greater than 100 is the signal for closing long positions.

So the entry is strict while the exit is loose for this strategy, which can obtain a relatively high rate of return.

## Advantages

This typical multi-indicator combined breakthrough strategy has the following advantages:

1. The strict entry conditions adopt multiple indicators for filtering, which can reduce the risk of false breakthroughs. 

2. The indicator parameters are optimized for good adaptability to the market.

3. The trend judgment indicator is adopted to avoid being trapped in the shock market.  

4. Moving averages are used to determine medium and short term trends stably.

5. CCI indicator can capture short-term overbought and oversold phenomena. 

6. PSAR indicator has strong ability to determine the direction of market trends.

## Risks

The strategy also has the following risks:

1. In extreme markets, the effects of multiple indicator combinations may be compromised and cannot fully filter out risks.

2. When the trend is huge, using medium and short-term indicators to determine the timing may fail and cannot fully capture the trend.  

3. Improper parameter settings of local indicators like CCI may lead to missing opportunities.  

4. The effect of PSAR indicator is poor at trend turning points.

Counter measures:

1. Appropriately relax entry conditions and pay more cost for lower risk.

2. Increase judgment of longer-term indicators, such as 60-day or even longer moving averages.  

3. Dynamically optimize parameters like CCI. 

4. Combine more indicators to judge trends, such as Bollinger Bands.

## Optimization Directions 

The strategy also has the following optimization directions:

1. Increase machine learning algorithms to realize real-time parameter optimization and improve adaptability.  

2. Increase model combination techniques, combine more non-correlated strategies to improve stability.

3. Introduce risk control mechanisms, such as stop loss strategies, to effectively control single stop loss.

4. Increase trend judgment module to avoid getting into shock markets.  

5. Optimize indicator weights so that the optimal indicators play a leading role under different market environments.

## Conclusion

In general, this strategy is a typical and classic multi-indicator breakthrough strategy. Its advantages are rigorous entry conditions, loose exit conditions, and it also contains a trend judgment module. But it also has some risks. It needs continuous optimization to adapt to more complex market environments. Model combination and parameter optimization are its development directions.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-14 00:00:00
end: 2023-11-21 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Bukan Kaleng Kaleng Li", shorttitle="BKKL", overlay=true)

psarDot = sar(0.01, 0.01, 0.2)
up = change(high)
down = -change(low)
plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
trur = rma(tr, 14)
plus = fixnan(100 * rma(plusDM, 14) / trur)
minus = fixnan(100 * rma(minusDM, 14) / trur)
sum = plus + minus
adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), 14)

longConditionSMA4020 = sma(close, 40) > sma(close, 20)
longConditionSMA2010 = sma(close, 20) > sma(close, 10)
longConditionSMA105 = sma(close, 10) > sma(close, 5)
longConditionSMA = longConditionSMA4020 and longConditionSMA2010 and longConditionSMA105
longConditionCCI = cci(close, 20) < -100
longConditionPSAR = psarDot > close
longConditionDMI = plus < 10
adxCondition = adx > 20

longCondition = longConditionSMA and longConditionCCI and longConditionPSAR and longConditionDMI
if (longCondition and adxCondition)
    strategy.order("Long Signal", true)

shortConditionSMA4020 = sma(close, 40) < sma(close, 20)
shortConditionSMA2010 = sma(close, 20) < sma(close, 10)
shortConditionSMA105 = sma(close, 10) < sma(close, 5)
shortConditionSMA = shortConditionSMA4020 and shortConditionSMA2010 and shortConditionSMA105
shortConditionCCI = cci(close, 20) > 100
shortConditionPSAR = psarDot < close
shortConditionDMI = minus < 10

shortCondition = shortConditionSMA and shortConditionCCI and shortConditionPSAR and shortConditionDMI
if (shortCondition and adxCondition)
    strategy.order("Short Signal", false)

```

> Detail

https://www.fmz.com/strategy/432894

> Last Modified

2023-11-22 15:31:26
