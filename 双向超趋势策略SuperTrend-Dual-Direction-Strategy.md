
> Name

双向超趋势策略SuperTrend-Dual-Direction-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略根据ATR指标计算出的上轨和下轨,判断当前趋势方向,并给出买入和卖出信号。当价格突破上轨时看涨,当价格突破下轨时看跌。

## 策略原理

1. 计算ATR指标,表示价格的平均波动范围
2. 根据ATR值乘以一个倍数计算上轨线和下轨线
3. 判断价格与上下轨的关系,确定趋势方向
    - 当价格在上轨之上,为看涨的趋势
    - 当价格在下轨之下,为看跌的趋势
4. 在趋势发生转变时给出买入和卖出信号
    - 当由看跌趋势变为看涨趋势时,在上轨附近给出买入信号
    - 当由看涨趋势变为看跌趋势时,在下轨附近给出卖出信号
5. 可视化地显示上下轨、趋势方向和买卖信号

## 优势分析

- 使用ATR指标判断趋势,可根据市场波动幅度来设置合适的参数,使上下轨线更能适应市场趋势
- 采用突破上下轨判断趋势转变,可以及时捕捉趋势反转
- 结合趋势方向过滤 Signals,避免被市场中的假突破干扰
- 可视化地显示上下轨和买卖 Signals,一目了然

## 风险分析

- ATR参数设置过大或过小,都会使上下轨线脱离价格,无法有效跟踪趋势
- 倍数参数过大,会增多假信号;倍数过小,信号出现滞后
- 反转时机掌握不准,可能发生亏损的反向开仓
- 需要组合其他指标过滤策略信号,降低被套利的风险

## 优化方向

- 可以考虑动态优化ATR周期参数,使上下轨更贴合市场波动
- 可以研究不同品种不同周期的参数调整策略
- 可以结合其他指标判定趋势,例如增加量价确认
- 可以通过机器学习技术来优化参数设置

## 总结

该策略整体实现了基于ATR指标判断双向趋势的思路,突破上下轨给出买卖信号,然后结合趋势方向进行过滤,可避免被假信号干扰。通过Parameter调整可以适应不同市场环境。但是也存在一定的风险,需要进一步优化。总体来说,该策略较为简单实用,值得进一步研究改进。

|| 

## Overview

This strategy uses the upper and lower bands calculated based on the ATR indicator to determine the current trend direction and generate buy and sell signals. It suggests long when the price breaks above the upper band and short when the price breaks below the lower band.

## Strategy Logic

1. Calculate the ATR indicator, representing the average price volatility range. 
2. Calculate the upper and lower bands based on the ATR value multiplied by a factor.
3. Determine the trend direction based on the price's relationship with the bands.
   - When the price is above the upper band, it's an uptrend.
   - When the price is below the lower band, it's a downtrend.
4. Generate buy and sell signals when the trend changes direction.
   - A buy signal is generated near the upper band when trend changes from downtrend to uptrend. 
   - A sell signal is generated near the lower band when trend changes from uptrend to downtrend.
5. Visualize the upper/lower bands, trend direction and trade signals.

## Advantage Analysis

- Using ATR to determine trend can adapt the bands to market volatility by adjusting parameters.
- Captures trend reversal timely by breakout of the bands. 
- Filters signals by trend direction to avoid fake breakouts.
- Clear visualization of bands and signals.

## Risk Analysis

- Inappropriate ATR period may detach bands from price.
- Too large/small multiplier causes more false signals and lagging signals. 
- Inaccurate reversal timing leads to losses from reverse trading.
- Needs other filters to reduce being whipsawed.

## Optimization Directions

- Dynamic optimization of ATR period to fit market volatility.
- Parameter tuning for different products and timeframes.
- Combine other indicators like volume for trend validation. 
- Utilize machine learning for parameter optimization.

## Summary

This strategy implements the idea of determining dual-directional trend based on ATR. Breakout signals are generated and filtered by trend direction to avoid fake signals. Parameters can be tuned for different market environments. There are still some risks that need further optimization. Overall speaking, this is a simple and practical strategy worth researching and improving.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2018|From Year|
|v_input_4|true|To Day|
|v_input_5|true|To Month|
|v_input_6|2100|To Year|
|v_input_7|10|ATR Period|
|v_input_8_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_9|3|ATR Multiplier|
|v_input_10|true|Change ATR Calculation Method ?|
|v_input_11|true|Show Buy/Sell Signals ?|
|v_input_12|true|Highlighter On/Off ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-01 00:00:00
end: 2023-10-07 00:00:00
period: 3d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

TradeId = "RVG"

InitCapital = 1000
InitPosition = 1000
InitCommission = 0.075
InitPyramidMax = 1
CalcOnorderFills = true
CalcOnTick = true

//@version=4
// strategy("Supertrend RG", overlay = true,process_orders_on_close=true,commission_type=strategy.commission.percent,commission_value=InitCommission,
//  currency=currency.USD,initial_capital=InitCapital,default_qty_type=strategy.cash, default_qty_value=InitPosition, calc_on_order_fills=CalcOnorderFills, calc_on_every_tick=CalcOnTick,pyramiding=InitPyramidMax)

//
////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE

// From Date Inputs
fromDay = input(defval=1, title="From Day", minval=1, maxval=31)
fromMonth = input(defval=1, title="From Month", minval=1, maxval=12)
fromYear = input(defval=2018, title="From Year", minval=1970)

// To Date Inputs
toDay = input(defval=1, title="To Day", minval=1, maxval=31)
toMonth = input(defval=1, title="To Month", minval=1, maxval=12)
toYear = input(defval=2100, title="To Year", minval=1970)

// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true



Periods = input(title="ATR Period", type=input.integer, defval=10)
src = input(hl2, title="Source")
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
changeATR= input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)
showsignals = input(title="Show Buy/Sell Signals ?", type=input.bool, defval=true)
highlighting = input(title="Highlighter On/Off ?", type=input.bool, defval=true)
atr2 = sma(tr, Periods)
atr= changeATR ? atr(Periods) : atr2
up=src-(Multiplier*atr)
up1 = nz(up[1],up)
up := close[1] > up1 ? max(up,up1) : up
dn=src+(Multiplier*atr)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? min(dn, dn1) : dn
trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend
upPlot = plot(trend == 1 ? up : na, title="Up Trend", style=plot.style_linebr, linewidth=2, color=color.green)
buySignal = trend == 1 and trend[1] == -1
plotshape(buySignal ? up : na, title="UpTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.green, transp=0)
plotshape(buySignal and showsignals ? up : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
dnPlot = plot(trend == 1 ? na : dn, title="Down Trend", style=plot.style_linebr, linewidth=2, color=color.red)
sellSignal = trend == -1 and trend[1] == 1
plotshape(sellSignal ? dn : na, title="DownTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.red, transp=0)
plotshape(sellSignal and showsignals ? dn : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white, transp=0)
mPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0)
longFillColor = highlighting ? (trend == 1 ? color.green : color.white) : color.white
shortFillColor = highlighting ? (trend == -1 ? color.red : color.white) : color.white
fill(mPlot, upPlot, title="UpTrend Highligter", color=longFillColor)
fill(mPlot, dnPlot, title="DownTrend Highligter", color=shortFillColor)
alertcondition(buySignal, title="SuperTrend Buy", message="SuperTrend Buy!")
alertcondition(sellSignal, title="SuperTrend Sell", message="SuperTrend Sell!")
changeCond = trend != trend[1]
alertcondition(changeCond, title="SuperTrend Direction Change", message="SuperTrend has changed direction!")


strategy.entry(TradeId + " Long", true, when=buySignal[1] and time_cond)
strategy.entry(TradeId + " Short", false, when=sellSignal[1] and time_cond)   



```

> Detail

https://www.fmz.com/strategy/428703

> Last Modified

2023-10-08 15:02:45
