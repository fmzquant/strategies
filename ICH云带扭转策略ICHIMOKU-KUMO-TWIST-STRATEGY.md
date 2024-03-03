
> Name

ICH云带扭转策略ICHIMOKU-KUMO-TWIST-STRATEGY

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b3b73ee751e86013d4.png)

[trans]

## 概述

Ichimoku Kumo Twist策略利用Ichimoku指标的转换线、基准线和导线构建交易信号,属于趋势跟踪策略。它通过Ichimoku云带的扭转寻找短期和中期趋势的反转点,以获取较低风险的突破点位和超买超卖机会。该策略既可用于日内交易,也可用于持仓数周的中长线交易。

## 策略原理

该策略主要使用Ichimoku指标的三条均线 - 转换线、基准线和导线1,以及K线的最高价和最低价计算云带上下界。转换线计算过去9根K线的最高价和最低价中点,代表一目均衡图的短期均线;基准线计算过去26根K线的最高价和最低价中点,代表长期均线。导线1为转换线和基准线的平均线,导线2为过去52根K线的中点价。

当导线1上穿导线2时产生买入信号,而导线1下穿导线2时产生卖出信号。该交易策略就是追踪短期和中期均线的金叉死叉,以捕捉趋势的变化。

## 优势分析

- Ichimoku云带扭转策略同时结合短期和中期趋势,可以有效识别趋势反转点。

- 基于均线的策略,具有一定的滞后性,可以过滤掉部分噪音。

- 利用云带判断强弱趋势的明显程度,实现较优的 entries 和 exits。

- 无需参数优化,使用 Ichimoku 标准参数即可。

## 风险分析

- Ichimoku原理比较复杂,对参数调整不敏感,不易过度优化。

- 在盘整市场中,可能出现多次错误信号。

- 当短期和中期趋势背离时,会出现策略失效的情况。

- 必须搭配止损来控制风险,否则可能造成较大亏损。

## 优化方向

- 可以测试转换线和基准线的不同参数组合,找到最佳平衡点。

- 结合其他指标过滤入场信号,避免在明显不利形态中建仓。

- 增加止损策略,设置动态止损或尾随止损。

- 优化仓位管理,根据市场情况调整仓位规模。

- 在回测中加入交易手续费,使回测结果更准确。

## 总结

Ichimoku云带扭转策略整体来说是一种适中的趋势策略。它可以有效识别趋势转折点,在符合趋势的方向打开头寸。但该策略也存在一定监控成本,必须搭配严格的风险管理措施才能长期使用。通过不断优化参数设置、入场过滤器、止损方式等,可以继续提高该策略的稳定性和盈利能力。

||


## Overview

The Ichimoku Kumo Twist strategy utilizes the conversion line, baseline, and leading span lines of the Ichimoku indicator to construct trading signals as a trend following strategy. It identifies short-term and medium-term trend reversal points by watching for twists in the Ichimoku clouds to find lower risk breakout points and overbought/oversold opportunities. The strategy can be used for intraday trading as well as multi-week intermediate-term trading.

## Strategy Logic

The strategy primarily uses three Ichimoku lines – the conversion line, baseline, and leading span 1, along with the high and low prices of the candlesticks to calculate the upper and lower cloud boundaries. The conversion line calculates the midpoint of the high and low over the past 9 candles, representing the short-term mean. The baseline calculates the midpoint of the high and low over the past 26 candles as the long-term mean. Leading span 1 is the average of the conversion and baseline lines. Leading span 2 is the midpoint price of the past 52 candles. 

Buy signals are generated when the leading span 1 crosses over leading span 2, while sell signals are generated when leading span 1 crosses under leading span 2. The trading strategy simply tracks the bullish and bearish crosses of the short and medium-term means to capture trend changes.

## Advantage Analysis

- The Ichimoku cloud twist strategy combines both short-term and medium-term trends, which can effectively identify trend reversal points.

- Mean reversion based strategies have some lag built in to filter out noise.

- Using the clouds to gauge trend strength allows for improved entries and exits.

- No parameter optimization needed - the standard Ichimoku parameters work well.

## Risk Analysis

- Ichimoku has fairly complex internals and is not very sensitive to parameter tweaks making overoptimization difficult.

- There can be multiple false signals during range-bound markets. 

- Divergence between short and medium-term trends can cause strategy breakdowns.

- Stop losses are essential to control risk, otherwise large drawdowns are possible.

## Improvement Opportunities

- Test different combinations of conversion and baseline periods to find optimal balance.

- Add filters with other indicators to avoid taking signals in unfavorable formations. 

- Incorporate stop loss strategies like dynamic or trailing stops.

- Optimize position sizing based on market conditions.

- Add trading commissions in backtests for more realistic results.

## Summary

Overall, the Ichimoku cloud twist strategy is a moderate trend following strategy. It can effectively identify turns in trend and take positions in alignment with the trend direction. But monitoring is required and strict risk controls are necessary for long-term use. Continued improvements in parameter tuning, entry filters, stop loss mechanics, and more can further enhance this strategy's stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Scaling: Linear|Log|
|v_input_2|0|Presets: Crypto Doubled|Crypto Singled|Standard Doubled|Standard Singled|
|v_input_3|true|Drop first N candles|
|v_input_4|false|Show Clouds|
|v_input_5|true|Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-20 00:00:00
end: 2023-10-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Ichimoku Kumo Twist Strategy (Presets)", shorttitle="Kumo Twist Strategy", overlay=true)

xlowest_(src, len) =>
    x = src
    for i = 1 to len - 1
        v = src[i]
        if (na(v))
            break
        x := min(x, v)
    x

xlowest(src, len) =>
    na(src[len]) ? xlowest_(src, len) : lowest(src, len)

xhighest_(src, len) =>
    x = src
    for i = 1 to len - 1
        v = src[i]
        if (na(v))
            break
        x := max(x, v)
    x

xhighest(src, len) =>
    na(src[len]) ? xhighest_(src, len) : highest(src, len)

dropn(src, n) =>
    na(src[n]) ? na : src

ichiConversionPeriods(presets) =>
    if presets == "Crypto Doubled"
        20
    else
        if presets == "Crypto Singled"
            10
        else
            if presets == "Standard Doubled"
                18
            else
                9

ichiBasePeriods(presets) =>
    if presets == "Crypto Doubled"
        60
    else
        if presets == "Crypto Singled"
            30
        else
            if presets == "Standard Doubled"
                52
            else
                26

ichiLaggingSpan2Periods(presets) =>
    if presets == "Crypto Doubled"
        120
    else
        if presets == "Crypto Singled"
            60
        else
            if presets == "Standard Doubled"
                104
            else
                52

ichiDisplacement(presets) =>
    if presets == "Crypto Doubled"
        30
    else
        if presets == "Crypto Singled"
            30
        else
            if presets == "Standard Doubled"
                26
            else
                26

scaling = input(title="Scaling", options=["Linear", "Log"], defval="Linear")
presets = input(title="Presets",  options=["Crypto Doubled", "Crypto Singled", "Standard Doubled", "Standard Singled"], defval="Crypto Doubled")
dropCandles = input(1, minval=0, title="Drop first N candles")
showClouds = input(false, "Show Clouds")
stoploss = input(true, title="Stop Loss")

conversionPeriods = ichiConversionPeriods(presets)
basePeriods = ichiBasePeriods(presets)
laggingSpan2Periods = ichiLaggingSpan2Periods(presets)
displacement = ichiDisplacement(presets)
logScaling = scaling == "Log"

lows = dropn(low, dropCandles)
highs = dropn(high, dropCandles)

lowsp = logScaling ? log(lows) : lows
highsp = logScaling ? log(highs) : highs

donchian(len) =>
    avg(xlowest(lowsp, len), xhighest(highsp, len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

golong = crossover(leadLine1, leadLine2)
goshort = crossunder(leadLine1, leadLine2)

strategy.entry("Buy", strategy.long, when=golong, stop=(stoploss ? high+syminfo.mintick : na))
strategy.entry("Sell", strategy.short, when=goshort, stop=(stoploss ? low-syminfo.mintick : na))

conversionLinep = logScaling ? exp(conversionLine) : conversionLine
baseLinep = logScaling ? exp(baseLine) : baseLine
leadLine1p = logScaling ? exp(leadLine1) : leadLine1
leadLine2p = logScaling ? exp(leadLine2) : leadLine2

plot(showClouds ? conversionLinep : na, color=#0496ff, title="Conversion Line")
plot(showClouds ? baseLinep : na, color=#991515, title="Base Line")

p1 = plot(showClouds ? leadLine1p : na, offset = displacement, color=green, title="Lead 1")
p2 = plot(showClouds ? leadLine2p : na, offset = displacement, color=red, title="Lead 2")
fill(p1, p2, color = showClouds ? (leadLine1p > leadLine2p ? green : red) : na)

```

> Detail

https://www.fmz.com/strategy/430375

> Last Modified

2023-10-27 16:36:59
