
> Name

枢轴反转K线策略Pivot-Reversal-Candlestick-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17f668a809cf3aaacf1.png)
[trans]

### 概述

枢轴反转K线策略是一种根据枢轴点进行交易信号生成的量化交易策略。该策略通过计算左侧一定数量的K线的最高价和最低价,来确定枢轴区域。当价格突破枢轴区域时,进行相应的做多或做空操作。

### 策略原理

该策略的核心逻辑是计算左侧4根K线的最高价作为做多枢轴,计算左侧4根K线的最低价作为做空枢轴。右侧2根K线用于确定价格已经突破枢轴区域。当价格超过做多枢轴时,做多;当价格低于做空枢轴时,做空。

具体来说,策略首先计算左侧4根K线的最高价`swh`,作为做多枢轴。同时计算左侧4根K线的最低价`swl`,作为做空枢轴。在枢轴确定后,通过右侧2根K线来判断价格是否突破枢轴。如果价格超过`swh`,则做多;如果价格低于`swl`,则做空。

做多和做空信号发出后,会下单做多或做空,并设置止损位于枢轴区域外,以控制风险。

### 优势分析

枢轴反转策略最大的优势在于能够抓住价格反转的时机。当价格长时间处于横盘整理阶段时,常常会在枢轴区域附近震荡。这时使用枢轴突破策略,能够抓住价格反转的最佳时机,从而获利。

相比其他反转策略,枢轴反转策略具有操作简单、风险可控等优点。左右K线数量的设置可以自由调整,从而适应不同品种和市场环境。此外,止损设置在枢轴区域之外,可以有效控制风险。

### 风险分析

枢轴反转策略的主要风险在于枢轴区域判断错误。如果左侧K线无法确定清晰的枢轴区域,右侧K线的突破可能是错误信号。这时就很可能造成亏损。

此外,行情突变也会带来风险。尽管设置了止损,但如果行情发生断层、跳过等异常情况,止损可能无法起到很好的保护作用。

要降低风险,可以考虑采用同时做多做空的策略,即价格上涨时做多,下跌时做空,从而对冲部分风险。另外也可以结合其他指标判断行情,避免在可能的反转点错过交易机会。

### 优化方向

该策略可以从以下几个方面进行优化:

1. 优化左右K线数量设置。可以测试更多的左右K线组合,找到最佳的参数。

2. 增加指标过滤。可以在入场时增加像MA、MACD等指标的过滤,避免在不确定的情况下入场。

3. 优化止损位设置。可以根据不同品种特点,选择更优的止损位置。

4. 增加追踪止损。入场后可以采用追踪止损来锁定利润,而不是简单的止损退出。

### 总结

枢轴反转策略通过抓住价格在枢轴区域的反转时机进行交易。它有操作简单、风险可控等优点。主要风险在于识别枢轴区域错误和行情突变。通过参数优化、增加过滤器、改进止损策略等方法可以降低风险并提高策略稳定性。总体来说,枢轴反转策略非常适合捕捉盘整行情中的短线交易机会。

||

### Overview

The Pivot Reversal Candlestick Strategy is a quantitative trading strategy that generates trading signals based on pivot points. This strategy calculates the highest price and lowest price of a certain number of candlesticks on the left side to determine the pivot area. When the price breaks through the pivot area, it will initiate corresponding long or short positions.

### Strategy Principle  

The core logic of this strategy is to calculate the highest price of the left 4 candlesticks as the long pivot and the lowest price of the left 4 candlesticks as the short pivot. The right 2 candlesticks are used to determine if the price has broken through the pivot area. When the price exceeds the long pivot, go long. When the price falls below the short pivot, go short.

Specifically, the strategy first calculates the highest price `swh` of the left 4 candlesticks as the long pivot. At the same time, it calculates the lowest price `swl` of the left 4 candlesticks as the short pivot. After determining the pivot, it uses the right 2 candlesticks to judge whether the price breaks through the pivot area. If the price exceeds `swh`, go long. If the price is lower than `swl`, go short. 

After the long and short signals are triggered, it will place long or short orders and set the stop loss outside the pivot area to control risks.

### Advantage Analysis

The biggest advantage of the Pivot Reversal Strategy is that it can capture the timing of price reversals. When the price stays in a range for a long time, it often oscillates around the pivot area. Using the pivot breakout strategy at this time can capture the best timing of price reversals and make profits.

Compared with other reversal strategies, the Pivot Reversal Strategy has the advantages of easy operation, controllable risks, etc. The settings of left and right candlestick numbers can be freely adjusted to adapt to different products and market environments. In addition, with stop loss set outside the pivot area, risks can be effectively controlled. 

### Risk Analysis

The main risk of the Pivot Reversal Strategy is the incorrect judgment of the pivot area. If the left candlesticks cannot determine a clear pivot area, the breakout of the right candlesticks may be a wrong signal, which is likely to cause losses. 

In addition, sudden changes in trends can also bring risks. Although stop loss is set, if abnormal situations such as price gaps or skip happen, the stop loss may not provide good protection.

To reduce risks, we can consider adopting strategies of going both long and short at the same time, that is, go long when price rises and go short when price falls, to hedge some risks. We can also combine other indicators to judge trends and avoid missing trading opportunities at possible reversal points.

### Optimization Directions 

The strategy can be optimized in the following aspects:

1. Optimize left and right candlestick number settings. Test more combinations of left and right candlesticks to find the optimal parameters.  

2. Add indicator filters. Add filters like MA, MACD etc. when taking positions to avoid entering the market in uncertain situations.  

3. Optimize stop loss level settings. Choose better stop loss positions according to the characteristics of different products. 

4. Add trailing stop loss. After taking positions, trailing stop loss can be used to lock in profits, instead of simple stop loss exit.  

### Summary

The Pivot Reversal Strategy makes trades by capturing the timing of price reversals in pivot areas. It has the advantages of easy operation, controllable risks, etc. The main risks lie in the incorrect identification of the pivot area and sudden changes in trends. By methods like parameter optimization, adding filters, improving stop loss strategies, etc., risks can be reduced and the stability of the strategy can be improved. In general, the Pivot Reversal Strategy is very suitable for capturing short-term trading opportunities in range-bound markets.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|leftBars|
|v_input_2|2|rightBars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-08 00:00:00
end: 2023-12-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Pivot Reversal Strategy", overlay=true)

leftBars = input(4)
rightBars = input(2)

swh = pivothigh(leftBars, rightBars)
swl = pivotlow(leftBars, rightBars)

swh_cond = not na(swh)

hprice = 0.0
hprice := swh_cond ? swh : hprice[1]

le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])

if (le)
    strategy.entry("Long", strategy.long, comment="Long", stop=hprice + syminfo.mintick)

swl_cond = not na(swl)

lprice = 0.0
lprice := swl_cond ? swl : lprice[1]


se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])

if (se)
    strategy.entry("Short", strategy.short, comment="Short", stop=lprice - syminfo.mintick)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/435465

> Last Modified

2023-12-15 10:17:49
