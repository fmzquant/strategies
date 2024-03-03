
> Name

Hull移动平均振荡交易策略Hull-Moving-Average-Swing-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是基于Hull移动平均指标的短线交易策略。策略利用Hull移动平均线的金叉死叉形成买卖信号,属于趋势跟踪策略。

## 策略原理

该策略主要基于Hull移动平均指标,Hull移动平均线由两个移动平均线组成。首先计算价格的中期移动平均线nma,周期为hullperiod。然后计算价格的快速移动平均线n2ma,周期为nma的一半。当n2ma上穿nma时发出买入信号,下穿nma时发出卖出信号。

为了过滤掉部分虚假信号,策略还引入了Hull线(Hull_Line)。Hull线是计算nma和n2ma之间差值的线性回归结果。当价格与Hull线发生背离时,策略会跳过买卖信号。

具体来说,策略规则如下:

1. 计算nma,周期hullperiod

2. 计算n2ma,周期为nma周期的一半

3. 计算n2ma和nma的差值diff

4. 对diff进行周期为sqrt(hullperiod)的移动平均,得到Hull线Hull_Line

5. 当价格上穿Hull线时发出买入信号

6. 当价格下破Hull线时发出卖出信号

7. 如果价格与Hull线发生背离,跳过信号

8. 以一定比例仓位入场,采用离场止损方式止损

## 优势分析

该策略具有以下优势:

1. 基于Hull移动平均,能够快速捕捉趋势,顺势而为

2. 采用Hull线过滤虚假信号,提高信号质量

3. 回撤和盈亏比良好,适合短线操作

4. 参数调整灵活,可适应不同市场环境

5. 采用反转止损,可以及时止损,控制风险

6. 结合季节性,可避开特定时间段的系统性风险

## 风险分析

该策略也存在一些风险:

1. 跟踪趋势策略,无法做到全天候交易

2. 当趋势反转时,会产生较大亏损

3. 移动平均系统滞后,无法及时捕捉转折点

4. 短线交易频繁,交易费用较高

5. 参数设置不当可能导致震荡市收益下降

针对上述风险,可以采取以下措施加以控制:

1. 采用马丁格尔止损策略,控制单笔亏损

2. 优化参数,测试不同市场环境的参数健壮性

3. 结合趋势判断指标,避免反转中的追涨杀跌

4. 加大持仓时间,降低交易频率

## 优化方向

该策略还可从以下几个方面进行优化:

1. 结合动量指标,确定趋势的起始点位,更好的布局入场

2. 增加机器学习模型,辅助判断趋势方向和力度

3. 采用自适应参数设置,根据实时市场调整参数

4. 配置多时间周期Hull系统,不同周期配置不同的仓位

5. 结合交易量能量指标,避开量能不足的假突破

6. 增加基于波动率的仓位管理模块,根据波动率动态调整仓位

## 总结

Hull移动平均振荡交易策略整体是一个非常实用的短线跟踪策略。它利用Hull移动平均系统判断趋势方向,以达到顺势而为的目的。相比单一移动平均线系统,它具有更高的信号质量和 Parameters 灵活性。该策略优势在于快速捕捉趋势换向,以较低的回撤获利;劣势在于无法应对趋势反转。我们可以通过Parameter优化、止损策略改进、增加辅助模型等手段来控制风险,使策略在更多市场环境中稳定运行。

||

## Overview

This strategy is a short-term trading strategy based on the Hull Moving Average indicator. The strategy uses the golden cross and dead cross of the Hull Moving Average lines to generate trading signals, belonging to a trend-following strategy.

## Strategy Logic

This strategy is mainly based on the Hull Moving Average indicator. The Hull Moving Average line consists of two moving averages. First it calculates the median moving average line nma of the price, with a period of hullperiod. Then it calculates the fast moving average line n2ma, with a period of half of the nma's. When n2ma crosses above nma, a buy signal is generated. When n2ma crosses below nma, a sell signal is generated.

To filter out some false signals, the strategy also introduces the Hull Line (Hull_Line). The Hull Line is a linear regression result of the difference between nma and n2ma. When there is divergence between the price and the Hull Line, the strategy will skip the trading signal. 

Specifically, the strategy rules are as follows:

1. Calculate the nma, with period hullperiod

2. Calculate the n2ma, with period half of the nma period 

3. Calculate the difference diff between n2ma and nma

4. Moving average the diff with period sqrt(hullperiod),得到and get the Hull Line Hull_Line

5. When price crosses above Hull Line, a buy signal is generated

6. When price crosses below Hull Line, a sell signal is generated

7. If there is divergence between price and Hull Line, skip the signal

8. Enter with a certain percentage of the position, adopt exit stop loss

## Advantage Analysis

The advantages of this strategy include:

1. Based on Hull Moving Average, it can quickly capture the trend and follow the trend

2. Use Hull Line to filter false signals and improve signal quality

3. Good risk-reward ratio and drawdown, suitable for short-term trading

4. Flexible parameter tuning, adaptable to different market environments

5. Adopt reversal stop loss, can stop loss in time and control risks

6. Combine seasonality to avoid systemic risks in specific time periods

## Risk Analysis

This strategy also has some risks:

1. Trend following strategy, cannot trade all day long

2. Larger losses when trend reverses 

3. Lagging of moving averages, cannot timely capture turning points

4. High trading frequency leads to higher trading costs

5. Inappropriate parameter settings may lead to lower profitability in range-bound markets

To control these risks, we can take the following measures:

1. Adopt martingale stop loss strategy to control single loss

2. Optimize parameters and test robustness in different market environments 

3. Combine trend judging indicators to avoid chasing trends during reversals

4. Increase holding time to lower trading frequency

## Optimization Directions

This strategy can also be optimized in the following aspects:

1. Combine momentum indicators to locate the starting point of trends for better entry

2. Add machine learning models to assist in judging trend direction and strength

3. Adopt adaptive parameter setting to adjust parameters based on real-time market dynamics

4. Configure multi-timeframe Hull systems, with different position sizes for different timeframes

5. Combine volume indicators to avoid false breakouts with insufficient momentum

6. Add volatility-based position sizing model to dynamically adjust position sizes based on volatility

## Summary

The Hull Moving Average Swing Trading Strategy is an efficient short-term trend following strategy overall. It uses the Hull Moving Average system to determine the trend direction for the purpose of following the trend. Compared with single moving average systems, it has higher signal quality and Parameters flexibility. The advantage of this strategy lies in quickly capturing trend changes with relatively small drawdowns. The weakness is the inability to cope with trend reversals. We can use Parameter optimization, stop loss strategies, adding auxiliary models etc. to control risks and make the strategy robust in more market environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|210|HullMA Period|
|v_input_2_open|0|Price data: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|true|From Month|
|v_input_4|true|From Day|
|v_input_5|2020|From Year|
|v_input_6|true|To Month|
|v_input_7|true|To Day|
|v_input_8|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//                               Hull Moving Average Swing Trader by SEASIDE420
strategy("Hull Moving Average Swing Trader", shorttitle="HMA_Swing_Trader", default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_order_fills=true, calc_on_every_tick=true, pyramiding=0)
hullperiod = input(title="HullMA Period", type=input.integer, defval=210, minval=1)
price = input(open, type=input.source, title="Price data")
FromMonth = input(defval=1, title="From Month", minval=1, maxval=12)
FromDay = input(defval=1, title="From Day", minval=1, maxval=31)
FromYear = input(defval=2020, title="From Year", minval=2017)
ToMonth = input(defval=1, title="To Month", minval=1, maxval=12)
ToDay = input(defval=1, title="To Day", minval=1, maxval=31)
ToYear = input(defval=9999, title="To Year", minval=2017)
start = timestamp(FromYear, FromMonth, FromDay, 00, 00)
finish = timestamp(ToYear, ToMonth, ToDay, 23, 59)
window() => true
n2ma = 2 * wma(price, round(hullperiod / 2))
nma = wma(price, hullperiod)
diff = n2ma - nma
sqn = round(sqrt(hullperiod))
n2ma1 = 2 * wma(price[1], round(hullperiod / 2))
nma1 = wma(price[1], hullperiod)
diff1 = n2ma1 - nma1
n1 = wma(diff, sqn)
n2 = wma(diff1, sqn)
Hull_Line = n1 / n1 * n2
Hull_retracted = if n1 > n2
    Hull_retracted = Hull_Line - 2
else
    Hull_retracted = Hull_Line + 2
c1 = Hull_retracted + n1 - price
c2 = Hull_retracted - n2 + price
c4 = n1 > n2 ? color.green : color.red
c2p = plot(c2, color=color.black, linewidth=1)
c3p = plot(price, color=color.black, linewidth=1)
fill(c3p, c2p, color=c4, transp=75)
//plot(cross(c1, c2) ? c1 : na, style=plot.style_circles, color=c4, linewidth=4)
if price < c2
    strategy.close("BUY", when=window())
if price > c2
    strategy.close("SELL", when=window())
if price > c2 and price[1] > c1
    strategy.entry("BUY", strategy.long, when=window())
if price < c1 and price[1] < c2
    strategy.entry("SELL", strategy.short, when=window())  //        /L'-, 
//                               ,'-.      `   ````                 /  L '-, 
//     .                    _,--dMMMM\        `   ` ` '`..         /       '-, 
//     :             _,--,  )MMMMMMMMM),.      `     ,<>          /_      '-,' 
//     ;     ___,--. \MM(    `-'   )M//MM\          ,',.;      .-'* ;     .' 
//     |     \MMMMMM) \MM\       ,dM//MMM/     ___ < ,; `.      )`--'    / 
//     |      \MM()M   MMM)__   /MM(/MP'  ___, \  \ `  `. `.   /__,    ,' 
//     |       MMMM/   MMMMMM( /MMMMP'__, \     | /      `. `-,_\     / 
//     |       MM     /MMM---' `--'_ \     |-'  |/         `./ .\----.___ 
//     |      /MM'   `--' __,-  \""   |-'  |_,               `.__) . .F. )-. 
//     |     `--'       \   \    |-'  |_,     _,-/            J . . . J-'-. `-., 
//     |         __  \`. |   |   |         \    / _           |. . . . \   `-.  F 
//     |   ___  /  \  | `|   '      __  \   |  /-'            F . . . . \     '` 
//     |   \  \ \  /  |        __  /  \  |  |,-'        __,- J . . . . . \ 
//     |    | /  |/     __,-  \  ) \  /  |_,-     __,--'     |. .__.----,' 
//     |    |/    ___     \    |'.  |/      __,--'           `.-;;;;;;;;;\ 
//     |     ___  \  \     |   |  `   __,--'                  /;;;;;;;;;;;;. 
//     |     \  \  |-'\    '    __,--'                       /;;;;;;;;;;;;;;\ 
// \   |      | /  |      __,--'                             `--;;/     \;-'\ 
//  \  |      |/    __,--'                                   /  /         \  \ 
//   \ |      __,--'                                        /  /           \  \ 
//    \|__,--'                                          _,-;M-K,           ,;-;\ 
//                                                     <;;;;;;;;           '-;;;; 
//                                                                                  :D

```

> Detail

https://www.fmz.com/strategy/428614

> Last Modified

2023-10-07 15:24:31
