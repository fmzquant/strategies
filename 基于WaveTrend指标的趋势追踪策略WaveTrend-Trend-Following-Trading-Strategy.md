
> Name

基于WaveTrend指标的趋势追踪策略WaveTrend-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用WaveTrend指标判断价格趋势方向,在趋势转向点产生交易信号,属于趋势追踪类策略。

## 策略原理

1. 计算WaveTrend振荡器,当其为正值时判断为多头市场,为负值时判断为空头市场。

2. WaveTrend指标转向时产生买入和卖出信号。

3. 可选择只进行多头交易。

4. 可启用箭头标记 WaveTrend转向点。

5. 设置背景色可直观判断趋势方向。

6. 策略规则简单清晰,易于实现。

## 优势分析

1. WaveTrend指标对趋势转向敏感,可以提早捕捉到机会。

2. 可视化的背景色和箭头标记,形成直观的信号。

3. 默认参数简单实用。

4. 代码简洁易于理解和修改。

5. 可根据需要选择只做多或空。

## 风险分析

1. WaveTrend指标可能出现假信号导致不必要的亏损。

2. 无法判断趋势的力度,存在追顶追底的风险。 

3. 作为趋势追踪策略,WaveTrend指标容易在震荡市场中被套利。

4. 参数设置不当也会影响策略效果。

5. 没有设置止损,可能造成大额亏损。

## 优化方向

1. 测试 WaveTrend 参数的不同组合,寻找最优参数。

2. 增加其他指标进行信号过滤,避免假信号。

3. 添加止损策略来控制风险。

4. 评估仅做多或空的必要性。

5. 可以根据市场情况选择是否使用箭头标记。

6. 优化资金管理策略,提高收益稳定性。

## 总结

该策略使用 WaveTrend 指标判断趋势转向进行交易,具有简单易用的优点,但也存在一定的风险。通过参数优化、止损策略、信号过滤等改进,可以将其打造成一个稳定高效的趋势追踪策略。

||


## Overview 

This strategy uses the WaveTrend indicator to determine trend direction and generate trading signals at turning points. It belongs to trend following strategies.

## Strategy Logic

1. Calculate WaveTrend oscillator, positive value indicates uptrend and negative value downtrend.

2. WaveTrend direction change produces buy and sell signals. 

3. Option to only trade long side.

4. Enable arrows to mark WaveTrend turning points.

5. Background color for intuitive trend visualization.

6. Simple and clear strategy rules easy to implement.

## Advantages

1. WaveTrend sensitive in catching trend turns early.

2. Visualized arrows and background color make intuitive signals.

3. Simple and practical default parameters. 

4. Concise code easy to understand and modify.

5. Flexibility to only trade long or short.

## Risks

1. WaveTrend may generate false signals causing unnecessary losses.

2. Unable to determine trend strength, risks of chasing.

3. Prone to whipsaws in ranging markets.

4. Improper parameters negatively affect performance.

5. No stop loss may lead to large losses.

## Enhancement

1. Test parameter combinations to find optimum.

2. Add filters with other indicators to avoid false signals.

3. Incorporate stop loss strategy for risk control.

4. Evaluate necessity of only long or short.

5. Toggle arrows based on market conditions. 

6. Optimize money management for more stable returns.

## Conclusion

This strategy trades WaveTrend direction changes simply and viably, but has some risks. Improvements like parameter optimization, stops, filters can make it a stable and efficient trend following system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Only Long?|
|v_input_2|true|Need new-trend-arrows?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-12 00:00:00
end: 2023-09-19 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// (c) Noro
//2017

//@version=2

strategy(title="Noro's WaveTrend Strategy v1.0", shorttitle = "WaveTrend str 1.0", overlay = true)

//settings
onlylong = input(true, title = "Only Long?")
usearr = input(true, title = "Need new-trend-arrows?")

//WTO ("WaveTrend Oscilator") method by LazyBear
//Start of LazyBear's code
esa = ema(hlc3, 10)
d = ema(abs(hlc3 - esa), 10)
ci = (hlc3 - esa) / (0.015 * d)
tci = ema(ci, 21)
//End of LazyBear's code

WTOtrend = tci > 0 ? 1 : tci < 0 ? -1 : 0

//background
col = WTOtrend == 1 ? 1 : WTOtrend == -1 ? -1 : col[1]
bgcolor = col == 1 ? lime : col == -1 ? red : na
bgcolor(bgcolor, transp=70)

//arrows
posi = WTOtrend == 1 ? 1 : WTOtrend == -1 ? -1 : posi[1]
arr = usearr == true ? posi == 1 and posi[1] < 1 ? 1 : posi == -1 and posi[1] > -1 ? -1 : na : na
plotarrow(arr == 1 ? 1 : na, title = "UpArrow", colorup = blue, colordown = blue, maxheight = 60, minheight = 50, transp = 0)
plotarrow(arr == -1 ? -1 : na, title = "DnArrow", colorup = blue, colordown = blue, maxheight = 60, minheight = 50, transp = 0)

//trading
longCondition = posi == 1 and posi[1] < 1
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = posi == -1 and posi[1] > -1
if (shortCondition)
    strategy.entry("Short", strategy.short, onlylong == true ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/427387

> Last Modified

2023-09-20 15:50:08
