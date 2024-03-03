
> Name

基于移动转向轮廓的波动带突破策略Trend-Breakout-Strategy-Based-on-Moving-Turning-Profile-and-Bollinger-Bands

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略是在波动带指标的基础上,引入移动转向轮廓来寻找潜在的趋势突破点。它通过计算一个向前移动的波动带,并在价格突破该向前移动的波动带时发出交易信号。该策略结合波动带强大的趋势识别能力和移动转向轮廓提供的提前预警能力,旨在发现更有效的入场点位。

## 策略原理

1. 计算普通波动带的中线、上线和下线
2. 将波动带的中线、上线和下线向前移动一定周期
3. 当价格从下向上突破向前移动的上线时,发出买入信号
4. 当价格从上向下突破向前移动的下线时,发出卖出信号
5. 入场后以反向波动带线作为止损位

## 优势分析

1. 移动转向轮廓提供提前警示,可以更早发现趋势转折
2. 结合波动带指标本身的趋势识别能力,提高信号的准确性
3. 提前设置好止损位置,可以有效控制风险
4. 结合趋势及波段,可以在较好的位置建立仓位

## 风险分析

1. 参数设置不当可能导致过多错误信号
2. 移动转向轮廓可能 Preis 突破并形成中途停损
3. 需要进一步结合趋势判断,以避免在震荡市场中被套
4. 存在一定滞后,无法完全抓住转折点

## 优化方向 

1. 测试不同的价格数据和参数组合
2. 增加附加过滤条件,避免假突破
3. 结合趋势指标判断大方向,避免被套
4. 优化止损策略,根据市场调整止损幅度
5. 尝试在不同的品种和周期上测试效果
6. 可结合其他指标寻找更精准的入场点位

## 总结

该策略充分利用了波动带本身的优势,并通过移动转向轮廓提高了入场的时效性。在优化参数组合、增加过滤条件以及进一步考虑趋势情况的基础上,该策略可以成为一个较强的突破系统。总体来说,该策略简单实用,值得进一步测试和优化,以取得更好的回测和实盘结果。

|| 

## Overview

This strategy incorporates a forward shifted Bollinger Bands as a moving turning profile to identify potential trend breakout points. It generates trading signals when price breaks through the forward shifted bands. Combining the trend identification strength of BB and early warning of turning points from the shifted bands aims to discover more effective entries.

## Strategy Logic

1. Calculate standard BB with middle line, upper and lower bands.

2. Shift BB lines forward by a set period.

3. Signal long entry when price breaks above forward shifted upper band.

4. Signal short entry when price breaks below forward shifted lower band. 

5. Set stop loss at opposite BB line after entry.

## Advantage Analysis

1. Moving turning profile provides early warning for trend reversals.

2. Combines with BB's inherent trend identification ability for higher signal accuracy.

3. Preset stop loss positions allows effective risk control.

4. Can build positions at advantageous prices when combined with trend and swing analysis.

## Risk Analysis

1. Improper parameter tuning may generate excessive false signals.

2. Moving turning profile may have premature breakout and mid-way stop loss.

3. Needs further trend analysis to avoid whipsaws in ranging markets.

4. Has some lag, may not fully capture turning points.

## Optimization Directions

1. Test different price inputs and parameter combinations.

2. Add filters to avoid false breakouts.

3. Incorporate trend analysis to avoid being trapped.

4. Optimize stops based on market conditions.

5. Test effectiveness across different instruments and timeframes. 

6. Combine with other indicators for more accurate entries.

## Summary

This strategy fully utilizes the inherent advantages of Bollinger Bands and improves entry timing via the moving turning profile. With optimized parameters, additional filters, and further trend analysis, it can become a robust breakout system. Overall, a simple and practical strategy worth further testing and optimization for improved performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_hl2|0|source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_2|20|length|
|v_input_3|true|mult|
|v_input_4|26|x_offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-18 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("LAGging span leaves Bollinger Bands strategy" , shorttitle="LagBB" , overlay=true)
source = input( hl2 )
length = input(20, minval=1)
mult = input( 1.0, minval=0.0, maxval=50)
x_offset = input( 26 ,minval=0 , maxval=244 )

basis = sma(source, length)
dev = mult * stdev(source, length)
upper = basis + dev
lower = basis - dev
buyEntry = crossover(source, upper[x_offset] )
sellEntry = crossunder(source, lower[x_offset] )
if (crossover(source, upper[x_offset] ))
    strategy.entry("LE", strategy.long, stop=lower, oca_name="BollingerBands",  comment="LE")
else
    strategy.cancel(id="LE")
if (crossunder(source, lower[x_offset] ))
    strategy.entry("SE", strategy.short, stop=upper, oca_name="BollingerBands",  comment="SE")
else
    strategy.cancel(id="SE")
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
plot( upper , color=#cccc00 , transp=50 , offset=x_offset )
plot( basis , color=#cccc00 , offset=x_offset )
plot( lower , color=#cccc00 , transp=50 , offset=x_offset )
```

> Detail

https://www.fmz.com/strategy/427245

> Last Modified

2023-09-19 13:29:51
