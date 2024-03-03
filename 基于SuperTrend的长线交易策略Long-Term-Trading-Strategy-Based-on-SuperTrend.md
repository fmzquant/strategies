
> Name

基于SuperTrend的长线交易策略Long-Term-Trading-Strategy-Based-on-SuperTrend

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略通过SuperTrend指标识别长线入场机会。它利用平均真实范围ATR和乘数确定动态支撑位,进行长仓入场。策略重点关注长仓交易机会。

## 策略原理 

1. 根据ATR周期和乘数计算上轨和下轨。当价格突破上轨时看涨,突破下轨时看跌。

2. 计算当前趋势,1表示看涨,-1表示看跌。价格突破上轨时趋势由跌转涨,触发买入信号;突破下轨时趋势由涨转跌,触发卖出信号。

3. 结合移动平均作为趋势过滤,突破上轨时要求价格高于MA才买入,突破下轨时要求价格低于MA才卖出,避免假突破。

4. 可视化显示助手标记趋势、交易信号等情况,辅助判断。

## 优势分析

该策略具有以下优点:

1. 使用SuperTrend指标可以动态跟踪价格变化,及时反映趋势转折。

2. ATR止损方式可以根据市场波动调整止损位,有利锁定利润。

3. 结合MA滤除假突破,可以有效过滤震荡市场的噪声交易信号。

4. 可视化设计直观展示交易策略与市场情况,操作简便。

5. 只交易趋势转折点,非常适合长线持仓。

## 风险分析

该策略主要存在以下风险:

1. SuperTrend指标对参数敏感,多空线调整频繁,可能出现频繁交易。

2. 在震荡行情中,止损线会被频繁触发。

3. 未考虑交易成本,小资金会受交易费用影响较大。

4. 未设置止损,回撤风险较大。

5. 趋势滤波可能错过部分机会。

可以通过以下方式降低风险:

1. 优化ATR参数,降低多空线调整频率。

2. 增加等效K线过滤,避免被高频小波动止损。 

3. 设置止损止盈保护利润。

4. 适当调整移动平均周期,平衡过滤效果。

5. 优化资金管理,降低交易成本影响。

## 优化方向 

该策略可以从以下方面进行优化:

1. 测试不同的价格源,如收盘价,最高价等。

2. 尝试其他动态止损指标,如Chandelier Exit。

3. 增加仓位管理模块,优化资金使用效率。

4. 结合波动率指标refine入场时机。

5. 添加止损、止盈模块,控制风险。

6. 针对不同市场调整参数。

7. 探索机器学习算法实现参数优化。

8. 组合其他指标判断,提高过滤准确率。

## 总结

该策略使用SuperTrend整合动态止损判断趋势,并辅以MA进行趋势过滤识别长线买入时机。可视化设计简化操作。通过优化参数设置和功能扩展,可以成为稳定可靠的长线交易策略。

|| 

## Overview

This strategy identifies long opportunities using the SuperTrend indicator. It uses ATR and a multiplier to determine dynamic support levels for long entry. The focus is on long trades.

## Strategy Logic

1. The upper and lower bands are calculated based on ATR period, multiplier. Breaking upper band indicates uptrend, breaking lower band indicates downtrend.

2. The current trend is tracked, with 1 for uptrend and -1 for downtrend. Price breaking above upper band switches trend from down to up, generating buy signal. Breaking below lower band switches from up to down, generating sell signal.

3. A moving average is added as a trend filter. Buy only if price is above MA when breaking above upper band. Sell only if price is below MA when breaking below lower band. This avoids fake breakouts. 

4. Visual helpers highlight trends, signals etc to assist with decision making.

## Advantage Analysis 

The advantages of this strategy:

1. SuperTrend dynamically tracks price changes and reflects trend shifts timely.

2. The ATR stop loss adjusts stops based on market volatility, helping lock in profits.

3. The MA filter eliminates false signals from noise in ranging markets. 

4. Visual design intuitively presents strategy mechanics and market situation.

5. Only trading trend reversals makes it suitable for long-term holding.

## Risk Analysis

The main risks are:

1. SuperTrend is sensitive to parameters. Frequent band adjustments may lead to over trading.

2. In choppy markets, stops can get triggered frequently.

3. No consideration of trading costs. Small accounts suffer greater impact.

4. No stop loss means high drawdown risk.

5. Trend filter may miss some opportunities. 

Risks can be reduced by:

1. Optimizing ATR parameters to lower band adjustment frequency.

2. Adding equivalent bar filtering to avoid stops by high frequency minor swings.

3. Implementing stop loss and take profit to protect profits. 

4. Tuning moving average period to balance filtering effect.

5. Optimizing money management to lower trading cost impacts.

## Optimization Directions

The strategy can be enhanced in the following aspects:

1. Test different price sources like close, high etc.

2. Try other dynamic stop loss indicators like Chandelier Exit. 

3. Add position sizing to optimize capital utilization. 

4. Incorporate volatility indicators to refine entries.

5. Implement stop loss and take profit to control risks.

6. Adjust parameters for different markets.

7. Explore machine learning for parameter optimization.

8. Combine other indicators to improve filter accuracy.

## Conclusion

This strategy uses SuperTrend with dynamic stops to determine trends, and adds an MA filter to identify long entries. Visual design simplifies operations. With optimized parameters and added features, it can become a robust long-term trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Period|
|v_input_2_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_3|3|ATR Multiplier|
|v_input_4|true|Change ATR Calculation Method ?|
|v_input_5|false|Show Buy/Sell Signals ?|
|v_input_6|true|Highlighter On/Off ?|
|v_input_7|true|Bar Coloring On/Off ?|
|v_input_8|20|Moving Average Period|
|v_input_9_close|0|Moving Average Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|9|From Month|
|v_input_11|true|From Day|
|v_input_12|2018|From Year|
|v_input_13|true|To Month|
|v_input_14|true|To Day|
|v_input_15|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2020-09-13 00:00:00
end: 2023-09-19 00:00:00
period: 3d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("SuperTrend Long Strategy", overlay=true, initial_capital=50000, currency=currency.USD, default_qty_type=strategy.cash, default_qty_value=50000)

Periods = input(title="ATR Period", type=input.integer, defval=10)
src = input(hl2, title="Source")
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
changeATR = input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)
showsignals = input(title="Show Buy/Sell Signals ?", type=input.bool, defval=false)
highlighting = input(title="Highlighter On/Off ?", type=input.bool, defval=true)
barcoloring = input(title="Bar Coloring On/Off ?", type=input.bool, defval=true)

atr2 = sma(tr, Periods)
atr = changeATR ? atr(Periods) : atr2

up = src - (Multiplier * atr)
up1 = nz(up[1], up)
up := close[1] > up1 ? max(up, up1) : up

dn = src + (Multiplier * atr)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? min(dn, dn1) : dn

trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend

// Moving Average as Trend Filter
periodes_ma = input(title="Moving Average Period", type=input.integer, defval=20)
src_ma = input(title="Moving Average Source", type=input.source, defval=close)
ma = sma(src_ma, periodes_ma)

upPlot = plot(trend == 1 ? up : na, title="Up Trend", style=plot.style_linebr, linewidth=2, color=color.green)
buySignal = trend == 1 and trend[1] == -1 and close > ma
plotshape(buySignal ? up : na, title="UpTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.new(color.green, 0))
plotshape(buySignal and showsignals ? up : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(color.green, 0))

dnPlot = plot(trend == 1 ? na : dn, title="Down Trend", style=plot.style_linebr, linewidth=2, color=color.red)
sellSignal = trend == -1 and trend[1] == 1 and close < ma
plotshape(sellSignal ? dn : na, title="DownTrend Begins", location=location.absolute, style=shape.circle, size=size.tiny, color=color.new(color.red, 0))
plotshape(sellSignal and showsignals ? dn : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(color.red, 0))

mPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0)
longFillColor = highlighting ? (trend == 1 ? color.new(color.green, 70) : color.white) : color.white
shortFillColor = highlighting ? (trend == -1 ? color.new(color.red, 70) : color.white) : color.white
fill(mPlot, upPlot, title="UpTrend Highlighter", color=longFillColor)
fill(mPlot, dnPlot, title="DownTrend Highlighter", color=shortFillColor)

FromMonth = input(defval = 9, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 999)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 999)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)       

window()  => time >= start and time <= finish ? true : false

longCondition = buySignal
if (longCondition)
    strategy.entry("BUY", strategy.long, when = window())

shortCondition = sellSignal
if (shortCondition)
    strategy.close("BUY")
    strategy.entry("SELL", strategy.short, when = window())

buy1 = barssince(buySignal)
sell1 = barssince(sellSignal)
color1 = buy1[1] < sell1[1] ? color.green : buy1[1] > sell1[1] ? color.red : na
barcolor(barcoloring ? color1 : na)

```

> Detail

https://www.fmz.com/strategy/427399

> Last Modified

2023-09-20 17:14:33
