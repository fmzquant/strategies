
> Name

经典双重趋势追踪策略Classic-Dual-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bab8cb690ace1facda.png)

[trans]

## 概述

该策略通过计算经典Pivot点以及利用RSI指标判断当前趋势方向,实现对 stocks的双重趋势跟踪,适用于中短线趋势交易。

## 策略详述

该策略主要通过以下步骤实现双重趋势跟踪:

1. 计算经典Pivot点,包括中枢点(Pivot)、支撑1(S1)、阻力1(R1)、支撑2(S2)、阻力2(R2)等。

2. 利用RSI指标判断股票趋势方向。RSI高于80为超买区,低于20为超卖区。

3. 判断股票日线级别的趋势方向。如果收盘价大于前一日的R2,视为强势;如果收盘价小于前一日的S2,视为弱势。

4. 根据日线级别趋势方向,结合Pivot点和RSI指标,制定当日的交易策略。

   - 如果日线为强势(收盘价>R2),则在Pivot点以下观察回调买点,或在S1以下买入。

   - 如果日线为弱势(收盘价<S2),则在Pivot点以上观察回调卖点,或在R1以上卖出。

5. 设置止损点。强势止损于前一日的S1,弱势止损于前一日的R1。

该策略通过计算Pivot点判断中长线趋势方向,配合RSI等指标确定短期趋势和具体入场点,实现对股价双重趋势的跟踪,适用于中短线交易。

## 优势分析

该策略主要优势有:

1. 能够同时跟踪中长线趋势和短期趋势,灵活适应市场变化。

2. Pivot点有一定的趋势判断能力,可以有效判断中长线趋势。

3. RSI等指标可以判断短期超买超卖情况,辅助确定具体入场点。

4. 策略操作规则清晰简单,容易掌握。

5. 风险控制到位,有清晰的止损点。

## 风险分析

该策略主要风险有:

1. Pivot点存在失效的可能,无法准确判断中长线趋势。可以通过调整参数或组合其他指标来改善。

2. RSI等指标可能发出错误信号。可以适当调整参数,或与其他指标组合使用。 

3. 止损点设置可能过于武断,无法完全避免止损被击穿的风险。可以适当留出一定缓冲区。

4. 策略回撤可能较大,需要有心理准备和充足资金支持。

5. 存在过于频繁交易的风险。可以适当调整开仓条件避免过频交易。

## 优化方向 

该策略可以从以下方面进行优化:

1. 尝试不同的参数组合,如调整RSI的参数,优化Pivot点的计算方法等,寻找最佳参数组合。

2. 增加或组合其他指标,如KDJ、MACD等,使信号更加准确可靠。

3. 优化止损策略,如移动止损、离场止损等,降低止损被击穿的风险。 

4. 优化仓位管理,适当控制单笔仓位规模,降低单笔损失的影响。

5. 优化开仓条件,避免过于频繁出入场。可以设置过滤条件等。

6. 测试不同品种的效果,调整参数达到最佳效果。

7. 增加自动止盈策略,以锁定利润。

## 总结

该策略通过计算Pivot点判断中长线趋势,并利用RSI等指标辅助判断短期趋势和具体入场点,实现对股价双重趋势的跟踪,整体运行逻辑清晰合理,中短线交易效果较好。但存在一定概率上的错误信号风险,需要进一步优化参数组合,严格控制止损来降低风险,同时适当限制仓位规模以控制 possível 可能出现的较大回撤。如果能够不断优化和完善该策略,将可以获得稳定的投资收益。

||


## Overview

This strategy tracks dual trends of stocks by calculating classic Pivot Points and using RSI indicator to determine current trend direction. It is suitable for medium-term trend trading.

## Strategy Principles

The strategy mainly follows these steps to achieve dual trend tracking:

1. Calculate classic Pivot Points including Pivot, S1, R1, S2, R2 etc. 

2. Use RSI indicator to determine price trend direction. RSI above 80 is overbought zone and below 20 is oversold zone.

3. Judge daily trend direction. If close price is greater than previous day's R2, it's a strong trend. If close price is less than previous day's S2, it's a weak trend.

4. Make today's trading decisions based on daily trend direction, combining Pivot Points and RSI indicator.

   - If daily trend is strong (close > R2), look for pullback buy points under Pivot or buy below S1.

   - If daily trend is weak (close < S2), look for pullback sell points above Pivot or sell above R1.
   
5. Set stop loss points. For strong trend, stop loss is previous day's S1. For weak trend, stop loss is previous day's R1.

The strategy judges mid-long term trend with Pivot Points, and uses RSI etc to determine short-term trend and entry points. This allows dual-trend tracking of prices, suitable for medium-term trading.

## Advantage Analysis

The main advantages of this strategy are:

1. Able to track both mid-long term trend and short-term trend, adapting flexibly to market changes.

2. Pivot Points have some trend-judging capability and can effectively determine mid-long term trend.

3. RSI etc can judge short-term overbought/oversold levels, assisting in determining specific entry points.

4. Strategy rules are clear and simple, easy to grasp. 

5. Risk control is in place with clear stop loss points.

## Risk Analysis

The main risks of this strategy are:

1. Pivot Points may fail in predicting mid-long term trend. This can be improved by adjusting parameters or combining with other indicators.

2. RSI etc may give false signals. Parameters can be adjusted or used together with other indicators.

3. Stop loss points may be too arbitrary, unable to completely avoid stop loss being hit. Buffer zones can be added.

4. Strategy drawdown may be larger, need psychological preparation and sufficient capital support.

5. Risk of over-trading exists. Opening conditions can be adjusted to avoid over-trading.

## Optimization Directions

The strategy can be optimized in these areas:

1. Try different parameter combinations like adjusting RSI parameters, optimizing Pivot Point calculations etc to find optimal parameters.

2. Add or combine other indicators like KDJ, MACD etc to make signals more accurate and reliable. 

3. Optimize stop loss strategies eg trailing stop loss, exit stop loss etc to reduce risk of stop loss being hit.

4. Optimize position sizing to limit impact of single position losses.

5. Optimize entry conditions to avoid over-trading. Filters can be added.

6. Test effectiveness across different products and adjust parameters.

7. Add auto take profit strategies to lock in profits.

## Summary 

This strategy judges mid-long term trend with Pivot Points and uses RSI etc to assist in determining short-term trend and entry points, achieving dual-trend tracking of prices. The overall logic is clear and reasonable, working well for medium-term trading. But some risk of false signals exists, necessitating further optimization of parameters, strict stop loss control to reduce risks, and appropriate position sizing control to manage possible larger drawdowns. With continuous optimization and improvements, stable investment returns can be achieved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Show Filtered Pivots|
|v_input_2|true|Show Daily Pivots?|
|v_input_3|50|Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|7|length|
|v_input_6|20|overSold|
|v_input_7|80|overBought|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title="swing trade", shorttitle="vinay_swing", overlay=true)
pf = input(false,title="Show Filtered Pivots")
sd = input(true, title="Show Daily Pivots?")

//moving average
len = input(50, minval=1, title="Length")
src = input(close, title="Source")
out = ema(src, len)

//RSI INPUT
length = input( 7 )
overSold = input( 20 )
overBought = input( 80 )
price = close
vrsi = rsi(price, length)


// Classic Pivot
pivot = (high + low + close ) / 3.0
// Filter Cr
bull= pivot > (pivot + pivot[1]) / 2 + .0025
bear= pivot < (pivot + pivot[1]) / 2 - .0025
// Classic Pivots
r1 = pf and bear ? pivot + (pivot - low) : pf and bull ? pivot + (high - low) : pivot + (pivot - low)
s1 = pf and bull ? pivot - (high - pivot) : pf and bear ? pivot - (high - low) : pivot - (high - pivot)
r2 = pf ? na : pivot + (high - low)
s2 = pf ? na : pivot - (high - low)
BC = (high + low) / 2.0
TC = (pivot - BC) + pivot

//Pivot Average Calculation
smaP = sma(pivot, 3)

//Daily Pivots 
dtime_pivot = request.security(syminfo.tickerid, 'D', pivot[1])
dtime_pivotAvg = request.security(syminfo.tickerid, 'D', smaP[1])
dtime_r1 = request.security(syminfo.tickerid, 'D', r1[1]) 
dtime_s1 = request.security(syminfo.tickerid, 'D', s1[1]) 
dtime_r2 = request.security(syminfo.tickerid, 'D', r2[1]) 
dtime_s2 = request.security(syminfo.tickerid, 'D', s2[1])
dtime_BC = request.security(syminfo.tickerid, 'D', BC[1])
dtime_TC = request.security(syminfo.tickerid, 'D', TC[1])

offs_daily = 0
plot(sd and dtime_pivot ? dtime_pivot : na, title="Daily Pivot",style=circles, color=fuchsia,linewidth=1) 
plot(sd and dtime_r1 ? dtime_r1 : na, title="Daily R1",style=circles, color=#DC143C,linewidth=1) 
plot(sd and dtime_s1 ? dtime_s1 : na, title="Daily S1",style=circles, color=lime,linewidth=1) 
plot(sd and dtime_r2 ? dtime_r2 : na, title="Daily R2",style=circles, color=maroon,linewidth=1) 
plot(sd and dtime_s2 ? dtime_s2 : na, title="Daily S2",style=circles, color=#228B22,linewidth=1)
plot(sd and dtime_BC ? dtime_BC : na, title="Daily BC",style=circles, color=black,linewidth=1)
plot(sd and dtime_TC ? dtime_TC : na, title="Daily TC",style=circles, color=black,linewidth=1)

bull1=  (close > dtime_r2)
bull2= (low < dtime_pivot) or (low < dtime_s1) 
bull3= dtime_pivot > dtime_pivot[1]
bullishenglufing=bull2 and bull3
bullishenglufing1=bull1 and (close > out) and (crossover(vrsi, overBought))
longCondition = bull1[1] and ((low < dtime_TC) or (low < dtime_BC) or (low < dtime_s1))

bear1=  (close < dtime_s2)
bear2= (high > dtime_pivot) or (high < dtime_r1) 
bear3= dtime_pivot < dtime_pivot[1]
bearishenglufing=bear2 and bear3
bearishenglufing1=bear1 and (close < out) and (crossunder(vrsi, overSold))
shortCondition = bear1[1] and ((high > dtime_BC) or (high > dtime_TC) or (high > dtime_r1))

plotshape(bullishenglufing, style = shape.triangleup, location = location.belowbar, color = green, size = size.tiny)
plotshape(bearishenglufing, style = shape.triangledown, location = location.abovebar, color = red, size = size.tiny)

if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)

```

> Detail

https://www.fmz.com/strategy/430771

> Last Modified

2023-11-01 16:54:29
