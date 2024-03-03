
> Name

8周期和21周期的移动平均线策略Dual-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/100b186d80b89b8f627.png)
 [trans]

## 概述

该策略运用了双移动平均线,分别是8周期和21周期的移动平均线。当短期移动平均线上穿长期移动平均线时,做多;当短期移动平均线下穿长期移动平均线时,做空。

该策略还引入了移动平均线的斜率指标来过滤掉一些无趋势的区间,只在趋势较明显的时候产生交易信号。

## 策略原理

该策略的核心在于短期移动平均线和长期移动平均线的交叉。短期移动平均线能更快地捕捉价格变化趋势,而长期移动平均线对噪音具有更好的过滤效果。当短期线上穿长期线时显示出多头趋势建立,做多能获利;当短期线下穿长期线时显示出空头趋势建立,做空能获利。

该策略还设置了一个斜率阈值。只有当斜率大于该正阈值时才产生做多信号,只有当斜率小于该负阈值时才产生做空信号。这可以过滤掉一些无明显趋势的区间,让交易信号的质量更高。

具体来说,该策略的交易信号生成逻辑是:

1. 计算8周期和21周期的简单移动平均线
2. 检测二者的交叉信号
3. 计算21周期移动平均线的斜率,斜率通过反正切函数atan计算得到
4. 只有当斜率超过设置的正阈值时,才产生做多信号
5. 只有当斜率低于设置的负阈值时,才产生做空信号

## 优势分析

该策略具有以下优势:

1. 策略思路简单,容易理解和实现
2. 引入斜率指标,可以过滤无明显趋势的区间,提高信号质量
3. 运用双移动平均线,可以发挥各自的优势,提高稳定性
4. 可根据市场调整参数,适应不同交易品种
5. 程序实现简洁,便于二次开发和优化

## 风险及解决方法

该策略也存在一些风险:

1. 市场存在剧烈波动的区间,可能出现较多错误信号
2. 双线交叉本身可能产生较多误报信号
3. 存在一定程度的滞后,无法立即捕捉趋势转折

针对这些风险,可以从以下几个方面进行优化:

1. 调整移动平均线的参数,适应市场特征
2. 优化斜率阈值,提高参数的鲁棒性
3. 增加止损机制,控制单笔损失
4. 结合其他指标进行过滤,提升信号质量
5. 采用自适应参数设置,使策略更具鲁棒性

## 优化方向 

该策略还可从以下几个方向进行优化:

1. 运用自适应移动平均线,根据市场波动程度调整参数
2. 增加成交量的关联分析,避免在盘整时产生错误信号
3. 结合波动率指标增强信号的质量和时效性
4. 增加机器学习算法,实现参数的自动优化
5. 结合深度学习技术,探索更复杂的非线性价格模式

## 总结

该双移动平均策略总体来说简单实用,通过diffs两个周期的参数捕捉不同的趋势特征,并融合在一起产生交易信号。同时,引入斜率阈值提高了信号质量。该策略可以作为基础策略并进行扩展,还有很大的优化空间和拓展能力。

||

## Overview

This strategy employs dual moving averages, specifically 8-period and 21-period ones. It generates long signals when the shorter MA crosses over the longer one, and short signals when the shorter MA crosses below the longer one.  

The strategy also incorporates the slope of the moving average line to filter out some non-trending periods and only produce signals when a trend is more apparent.

## Principles

The core of this strategy lies in the crossover of the short-term and long-term moving averages. The shorter MA can capture trend changes faster, while the longer MA has better noise filtering effects. The establishment of an uptrend is suggested when the shorter MA crosses over the longer MA, leading to a long signal; the establishment of a downtrend is suggested when the shorter MA crosses below the longer MA, leading to a short signal.

The strategy also sets a slope threshold. Only when the slope is greater than the positive threshold value will a long signal be generated. Only when the slope is less than the negative threshold value will a short signal be generated. This helps filter out zones where no pronounced trend exists, resulting in trading signals of higher quality. 

Specifically, the logic for generating trading signals is:

1. Calculate the 8-period and 21-period simple moving averages  
2. Detect crossover signals between the two
3. Calculate the slope of the 21-period moving average line using the arctangent function atan
4. Only generate long signals when the slope exceeds a preset positive threshold
5. Only generate short signals when the slope falls below a preset negative threshold

## Advantage Analysis 

The advantages of this strategy include:

1. The strategy idea is simple and easy to understand/implement
2. Incorporating slope index helps filter out non-trending periods and improves signal quality
3. Employing dual moving averages allows both to play to their strengths, improving robustness
4. Parameters can be adjusted to suit different trading instruments  
5. Simple program implementation facilitates further optimization

## Risk Analysis

Some risks also exist with this strategy:  

1. More false signals may occur during violent market fluctuations
2. Crossover itself tends to produce some false signals 
3. There is some degree of lag, unable to instantly capture trend reversals

Some ways to optimize based on these risks:

1. Adjust MA parameters to suit market characteristics
2. Optimize slope threshold to improve robustness
3. Add stop loss mechanisms to control single loss
4. Incorporate other indicators to filter signals 
5. Employ adaptive parameter setting to improve robustness

## Optimization Directions

Some directions for optimizing the strategy:

1. Employ adaptive MAs, adjusting parameters based on volatility
2. Incorporate volume analysis to avoid errors during consolidation
3. Add volatility index to enhance quality and timeliness 
4. Add machine learning for automatic parameter optimization
5. Leverage deep learning to uncover more complex nonlinear patterns

## Conclusion

In summary, this dual MA strategy is simple and practical. By capturing different trend characteristics through the two period parameters and combining them to generate trading signals. Meanwhile, incorporating the slope threshold improves signal quality. This strategy can serve as a basic one for extensions, with ample optimization space and potential.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|Angle|
|v_input_2|2|Angle Period|
|v_input_3|10|ATR Period|
|v_input_4|6|Angle Level|
|v_input_5_close|0|MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-09 00:00:00
end: 2024-01-16 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//written by sixpathssenin
//@version=4
strategy(title="Dual Moving Average",initial_capital=10000,overlay=true)

ma1= sma(close,8)
ma2= sma(close,21)

angleCriteria = input(title="Angle", type=input.integer, defval=7, minval=1, maxval=13)

i_lookback   = input(2,     "Angle Period", input.integer, minval = 1)
i_atrPeriod  = input(10,    "ATR Period",   input.integer, minval = 1)
i_angleLevel = input(6,     "Angle Level",  input.integer, minval = 1)
i_maSource   = input(close, "MA Source",    input.source)

f_angle(_src, _lookback, _atrPeriod) =>
    rad2degree = 180 / 3.141592653589793238462643  //pi 
    ang = rad2degree * atan((_src[0] - _src[_lookback]) / atr(_atrPeriod)/_lookback)
    ang
_angle = f_angle(ma2, i_lookback, i_atrPeriod)

plot(ma1,color=#FF0000)
plot(ma2,color=#00FF00)

crosso=crossover(ma1,ma2) 
crossu=crossunder(ma1,ma2)

_lookback = 15

f_somethingHappened(_cond, _lookback) =>
    bool _crossed = false
    for i = 1 to _lookback
        if _cond[i]
            _crossed := true
    _crossed
    
longcrossed = f_somethingHappened(crosso,_lookback)
shortcrossed = f_somethingHappened(crossu,_lookback)

long = longcrossed and _angle > angleCriteria
short= shortcrossed and _angle < -(angleCriteria)


if(long)
    strategy.entry("Long",strategy.long)
if(short)
    strategy.entry("short",strategy.short)
    

```

> Detail

https://www.fmz.com/strategy/439106

> Last Modified

2024-01-17 17:45:45
