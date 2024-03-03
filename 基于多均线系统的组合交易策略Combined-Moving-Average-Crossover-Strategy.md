
> Name

基于多均线系统的组合交易策略Combined-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过组合使用T3均线、T3黄金分割均线和MavilimW加权移动均线,在价格与均线关系发生变化时产生交易信号。属于趋势跟踪类策略。

## 策略原理  

1. 分别计算T3均线、T3黄金分割均线和MavilimW加权移动均线。

2. 价格与均线的突破、回调可以产生买入和卖出信号。

3. 结合多个均线,可以进行交易信号过滤,提高信号质量。

4. 设置止损策略来控制单笔损失。

5. 可选择单独或组合使用多种均线交易系统。

## 优势分析

1. 多均线组合可以提高信号准确率,互相验证。

2. 每种均线对趋势变化响应不同,组合使用可以取得优势。

3. 交易信号直观,由均线的关系形成。

4. 设置止损有助于风险控制。

5. 代码清晰,容易理解原理及自定义。

## 风险分析

1. 均线组合也会出现错误信号导致损失。

2. 无法有效判断价格趋势中断的节点。

3. 均线参数设置不当会影响策略表现。

4. 可能需要频繁调整持仓,增加交易成本。

5. 优化过程中可能过度优化导致过拟合。

## 优化方向

1. 测试不同均线参数,找到最佳组合。

2. 评估其他趋势指标添加进行信号过滤。

3. 优化止损策略参数,降低单笔亏损风险。 

4. 研究价格周期模式,判断趋势中断关键点。

5. 添加趋势指标,避免不必要反转交易。

6. 采用动态仓位管理策略,优化资金使用效率。

## 总结

该策略通过组合多种均线交易系统,形成互相验证的交易信号。但多均线组合也存在错误信号风险。需要持续进行参数优化测试,并辅以风险控制手段,将其打造成一个稳定的趋势跟踪策略。

||

## Overview

This strategy combines the T3, T3 Fibonacci and MavilimW moving averages to generate trading signals from price-MA relationships. It belongs to trend following strategies.

## Strategy Logic

1. Calculate the T3, T3 Fibonacci and MavilimW moving averages separately. 

2. Price breakout and pullback from MAs produce buy and sell signals.

3. Combining multiple MAs can filter signals for higher quality. 

4. Stop loss in place to control loss per trade.

5. Flexibility to use individual or combined MA systems.

## Advantages 

1. MA combo improves signal accuracy through mutual confirmation.

2. Each MA responds differently to trend changes for combined edge.

3. Intuitive signals formed by MA relationships. 

4. Stop loss aids in risk control.

5. Clear code for easy comprehension and customization.

## Risks

1. MA combos can still generate false signals causing losses.

2. Hard to determine key reversal points in trends. 

3. Inappropriate MA parameters negatively affect performance.

4. Frequent position changes increase transaction costs.

5. Over-optimization risks during optimization.

## Enhancement

1. Test different MA parameters to find optimal combinations.

2. Evaluate additional trend indicators for signal filtering.

3. Optimize stop loss parameters to lower loss risk per trade.

4. Study price cycle patterns to identify trend reversal points.

5. Add trend metric to avoid unnecessary reverse trades. 

6. Employ dynamic position sizing for better capital efficiency.

## Conclusion

This strategy combines multiple MA systems for mutual signal verification. But MA combos still have false signal risks. Continual parameter optimization and risk controls can turn it into a robust trend following system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Stop Loss %|
|v_input_2|true|T3|
|v_input_3|true|T3 Fibo Cross|
|v_input_4|true|MavilimW|
|v_input_5|3|First Moving Average length|
|v_input_6|5|Second Moving Average length|
|v_input_7|5|Bars Since Close Under MAVW|
|v_input_8|false|Show T3 Fibonacci Ratio Line?|
|v_input_9|8|T3 Length|
|v_input_10|0.7|Volume Factor|
|v_input_11|5|T3 Length fibo|
|v_input_12|0.618|Volume Factor fibo|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-13 00:00:00
end: 2023-09-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//creator&compiler: Bartu Altan
//inspired by: KIVANÇ ÖZBİLGİÇ @fr3792 and @mavilim0732 on twitter
//With courtesy of Kıvanç Özbilgiç, Permission Pending

strategy("Tilson T3, Tilson T3 Fibo and MavilimW Combined Strategy Strategy",shorttitle="T3 and MavilimW Strategy", initial_capital=100,currency=currency.USD,default_qty_type=strategy.percent_of_equity,default_qty_value =75,overlay=true)
stop_loss=input(defval=3.0,title="Stop Loss %",type=input.float)*0.01
strategyt3 = input(true,"T3")
strategyt3Fibo = input(true,"T3 Fibo Cross")
strategyMav = input(true,"MavilimW")
fmal=input(3,"First Moving Average length")
smal=input(5,"Second Moving Average length")
barsSinceCloseUnderMavw = input(5,"Bars Since Close Under MAVW")
T3FiboLine = input(false, title="Show T3 Fibonacci Ratio Line?")
length1 = input(8, "T3 Length")
a1 = input(0.7, "Volume Factor")

// BEGINNING OF T3

e1 = ema((high + low + 2 * close) / 4, length1)
e2 = ema(e1, length1)
e3 = ema(e2, length1)
e4 = ema(e3, length1)
e5 = ema(e4, length1)
e6 = ema(e5, length1)
c1 = -a1 * a1 * a1
c2 = 3 * a1 * a1 + 3 * a1 * a1 * a1
c3 = -6 * a1 * a1 - 3 * a1 - 3 * a1 * a1 * a1
c4 = 1 + 3 * a1 + a1 * a1 * a1 + 3 * a1 * a1
T3 = c1 * e6 + c2 * e5 + c3 * e4 + c4 * e3

col1t3 = T3 > T3[1]
col3t3 = T3 < T3[1]
color_1 = col1t3 ? color.green : col3t3 ? color.red : color.yellow
plot(strategyt3 or strategyt3Fibo ? T3:na, color=color_1, linewidth=3, title="T3")

//T3 Fibo

length12 = input(5, "T3 Length fibo")
a12 = input(0.618, "Volume Factor fibo")

e12 = ema((high + low + 2 * close) / 4, length12)
e22 = ema(e12, length12)
e32 = ema(e22, length12)
e42 = ema(e32, length12)
e52 = ema(e42, length12)
e62 = ema(e52, length12)
c12 = -a12 * a12 * a12
c22 = 3 * a12 * a12 + 3 * a12 * a12 * a12
c32 = -6 * a12 * a12 - 3 * a12 - 3 * a12 * a12 * a12
c42 = 1 + 3 * a12 + a12 * a12 * a12 + 3 * a12 * a12
T32 = c12 * e62 + c22 * e52 + c32 * e42 + c42 * e32

col12 = T32 > T32[1]
col32 = T32 < T32[1]
color2 = col12 ? color.blue : col32 ? color.purple : color.yellow
plot(strategyt3Fibo and T3FiboLine and T32 ? T32 : na, color=color2, linewidth=2, title="T3fibo")

//End of T3 Fibo

// END OF T3



// MAVİLİMW //

tmal=fmal+smal
Fmal=smal+tmal
Ftmal=tmal+Fmal
Smal=Fmal+Ftmal

M1= wma(close, fmal)
M2= wma(M1, smal)
M3= wma(M2, tmal)
M4= wma(M3, Fmal)
M5= wma(M4, Ftmal)
MAVW= wma(M5, Smal)
col1= MAVW>MAVW[1]
col3= MAVW<MAVW[1]
colorM = col1 ? color.blue : col3 ? color.red : color.yellow
plot(strategyMav ?MAVW:na,title="MAVW",color=colorM,linewidth=2)

// END OF MAVILIMW

// Long Conditions // 

longT3single = strategyt3 and not(strategyt3Fibo) and not(strategyMav) ? crossover(close,T3) and barssince(crossunder(close,T3)) > barsSinceCloseUnderMavw : na
longT3Fibo = not(strategyt3) and strategyt3Fibo and not(strategyMav) ? crossover(T32,T3):na
longMav = not(strategyt3) and not(strategyt3Fibo) and strategyMav ? crossover(close,MAVW) and barssince(crossunder(close,MAVW)) > barsSinceCloseUnderMavw : na

longT3WFiboandMav = strategyt3 and strategyt3Fibo and strategyMav ? close > T3 and close > MAVW and T32 > T3 : na
longT3WFibo = strategyt3 and strategyt3Fibo and not(strategyMav) ? (crossover(T32,T3)  and close > T3) or (T32>T3 and crossover(close,T3) and barssince(crossunder(close,T3)) > barsSinceCloseUnderMavw):na
longMavT3Fibo = not(strategyt3) and strategyt3Fibo and strategyMav ? (crossover(T32,T3) and close > MAVW) or (T32>T3 and crossover(close,MAVW) and barssince(crossunder(close,MAVW)) > barsSinceCloseUnderMavw) : na
longMavT3 = (strategyt3) and not(strategyt3Fibo) and strategyMav ? (crossover(close,T3) and barssince(crossunder(close,T3)) > barsSinceCloseUnderMavw and close>MAVW) or (crossover(close,MAVW) and barssince(crossunder(close,MAVW)) > barsSinceCloseUnderMavw and close>T3) : na

longchosen = longT3single or longT3Fibo or longMav or longT3WFiboandMav or longT3WFibo or longMavT3Fibo or longMavT3

// Long Close Conditions // 
longcT3single = strategyt3 and not(strategyt3Fibo) and not(strategyMav) ? crossunder(close,T3) : na
longcT3Fibo = not(strategyt3) and strategyt3Fibo and not(strategyMav) ? crossunder(T32,T3):na
longcMav = not(strategyt3) and not(strategyt3Fibo) and strategyMav ? crossunder(close,MAVW): na

longcT3WFiboandMav = strategyt3 and strategyt3Fibo and strategyMav ? close < T3 and close < MAVW and T32 < T3 : na
longcT3WFibo = strategyt3 and strategyt3Fibo and not(strategyMav) ? (crossunder(T32,T3)  and close < T3) or (T32<T3 and crossunder(close,T3)):na
longcMavT3Fibo = not(strategyt3) and strategyt3Fibo and strategyMav ? (crossunder(T32,T3) and close < MAVW) or (T32<T3 and crossunder(close,MAVW)):  na
longcMavT3 = (strategyt3) and not(strategyt3Fibo) and strategyMav ? (crossunder(close,T3) and close<MAVW) or (crossunder(close,MAVW) and close<T3) : na

longclosechosen = longcT3single or longcT3Fibo or longcMav or longcT3WFiboandMav or longcT3WFibo or longcMavT3Fibo or longcMavT3

// t3 fibo //



long = longchosen
longclose = longclosechosen
long_plot = barssince(long[1])>barssince(longclose[1])?long:na
longclose_plot = barssince(longclose[1])>barssince(long[1])?longclose:na

plotshape(long_plot,title="Long",style=shape.labelup,color=color.green,text="Long",textcolor=color.white, location=location.abovebar)
plotshape(longclose_plot,title="Long Close",style=shape.labeldown,color=#B1E141,text="Long Close",textcolor=color.white,location=location.belowbar)

// Short Conditions // 

shortT3single = strategyt3 and not(strategyt3Fibo) and not(strategyMav) ? crossunder(close,T3) and barssince(crossover(close,T3)) > barsSinceCloseUnderMavw : na
shortT3Fibo = not(strategyt3) and strategyt3Fibo and not(strategyMav) ? crossunder(T32,T3):na
shortMav = not(strategyt3) and not(strategyt3Fibo) and strategyMav ? crossunder(close,MAVW) and barssince(crossover(close,MAVW)) > barsSinceCloseUnderMavw : na

shortT3WFiboandMav = strategyt3 and strategyt3Fibo and strategyMav ? close < T3 and close < MAVW and T32 < T3 : na
shortT3WFibo = strategyt3 and strategyt3Fibo and not(strategyMav) ? (crossunder(T32,T3)  and close < T3) or (T32<T3 and crossunder(close,T3) and barssince(crossover(close,T3)) > barsSinceCloseUnderMavw):na
shortMavT3Fibo = not(strategyt3) and strategyt3Fibo and strategyMav ? (crossunder(T32,T3) and close < MAVW) or (T32<T3 and crossunder(close,MAVW) and barssince(crossover(close,MAVW)) > barsSinceCloseUnderMavw) : na
shortMavT3 = (strategyt3) and not(strategyt3Fibo) and strategyMav ? (crossunder(close,T3) and barssince(crossover(close,T3)) > barsSinceCloseUnderMavw and close<MAVW) or (crossunder(close,MAVW) and barssince(crossover(close,MAVW)) > barsSinceCloseUnderMavw and close<T3) : na

shortchosen = shortT3single or shortT3Fibo or shortMav or shortT3WFiboandMav or shortT3WFibo or shortMavT3Fibo or shortMavT3

// Long Close Conditions // 
shortcT3single = strategyt3 and not(strategyt3Fibo) and not(strategyMav) ? crossover(close,T3) : na
shortcT3Fibo = not(strategyt3) and strategyt3Fibo and not(strategyMav) ? crossover(T32,T3):na
shortcMav = not(strategyt3) and not(strategyt3Fibo) and strategyMav ? crossover(close,MAVW): na

shortcT3WFiboandMav = strategyt3 and strategyt3Fibo and strategyMav ? close > T3 and close > MAVW and T32 > T3 : na
shortcT3WFibo = strategyt3 and strategyt3Fibo and not(strategyMav) ? (crossover(T32,T3)  and close > T3) or (T32>T3 and crossover(close,T3)):na
shortcMavT3Fibo = not(strategyt3) and strategyt3Fibo and strategyMav ? (crossover(T32,T3) and close > MAVW) or (T32>T3 and crossover(close,MAVW)):  na
shortcMavT3 = (strategyt3) and not(strategyt3Fibo) and strategyMav ? (crossover(close,T3) and close>MAVW) or (crossover(close,MAVW) and close>T3) : na

shortclosechosen = shortcT3single or shortcT3Fibo or shortcMav or shortcT3WFiboandMav or shortcT3WFibo or shortcMavT3Fibo or shortcMavT3

short = shortchosen
shortclose = shortclosechosen
short_plot = barssince(short[1])>barssince(shortclose[1])?short:na
shortclose_plot = barssince(shortclose[1])>barssince(short[1])?shortclose:na



plotshape(short_plot,title="Short",style=shape.labeldown,color=color.red,text="Short",textcolor=color.white,location=location.abovebar)
plotshape(shortclose_plot,title="Short Close",style=shape.labeldown,color=#E19B89,text="Short Close",textcolor=color.white,location=location.belowbar)


strategy.entry("Long", true, when=long_plot)
strategy.close("Long",when=longclose_plot)
strategy.exit("Long Stop Loss","Long",stop=strategy.position_avg_price*(1-stop_loss))

strategy.entry("Short", false, when=short_plot)
strategy.close("Short",when=shortclose_plot)
strategy.exit("Short Stop Loss","Short",stop=strategy.position_avg_price*(1+stop_loss))

```

> Detail

https://www.fmz.com/strategy/427390

> Last Modified

2023-09-20 16:42:37
