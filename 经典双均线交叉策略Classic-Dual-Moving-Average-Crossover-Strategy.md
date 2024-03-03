
> Name

经典双均线交叉策略Classic-Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b70c5ce3c6f1c36d83.png)
[trans]

## 概述

双均线交叉策略是一种非常经典和常用的技术分析策略。该策略利用快速移动平均线和慢速移动平均线的交叉作为买入和卖出的信号。当快速移动平均线从下方向上突破慢速移动平均线时,产生买入信号;当快速移动平均线从上方向下跌破慢速移动平均线时,产生卖出信号。

## 策略原理

该策略的代码主要包括以下部分:

1. 定义快慢均线的长度和类型:快线长度为5周期,慢线长度为21周期,均采用简单移动平均线。

2. 计算快线和慢线:通过sma函数计算5周期和21周期的简单移动平均线。

3. 画图:绘制快线和慢线的走势图。

4. 定义买入和卖出条件:快线上穿慢线时买入,快线下穿慢线时卖出。

5. 执行交易:通过策略的long和short函数在满足条件时自动执行买入和卖出操作。

该策略的关键是使用不同长度周期的均线组合,形成快慢均线,并以其交叉作为交易信号。快线能更快捕捉价格变化,慢线更能反映长期趋势。当快线上穿慢线时,说明行情由下向上反转,属于买入信号;当快线下穿慢线时,说明行情由上向下反转,属于卖出信号。该策略原理简单清晰,容易实施。

## 优势分析

双均线交叉策略具有以下优势:

1. 原理简单,容易掌握,适合初学者。

2. 顺势操作,遵循价格趋势,回撤较小。

3. 交易频率适中,不会过于频繁交易。

4. 可自定义参数,灵活应对市场变化。

5. 容易通过优化找到适合自己的参数组合。

6. 可设定止损点,控制风险。

7. 可在多种市场中使用,适用性强。

8. 可与其他指标组合使用,提高效果。

## 风险分析

双均线交叉策略也存在一些风险:

1. 当市场趋势强劲时,均线追随趋势延迟,可能出现迟钝,错过最佳入场时机。可以适当缩短均线周期,提高敏感性。

2. 震荡行情中,可能出现较多假信号。可以适当增加过滤条件,避免错误交易。

3. 交易次数可能偏多,影响盈利。可以适当放宽均线间距,减少交叉。

4. 无法判断趋势类型,存在逆势交易风险。可以辅助趋势指标判断。 

5. 参数优化需要一定历史数据支持,新品种可能存在过拟合。应采用多种组合测试参数健壮性。

6. 单一指标易受外界环境影响,表现可能不稳定。可以结合其他指标进行验证。

## 优化方向

双均线交叉策略还可以从以下方面进行优化:

1. 测试不同长度的快慢均线,找到适合具体交易品种的最佳参数。

2. 增加过滤条件,如交易量,ATR止损等,减少不优异机会。

3. 结合动量指标等确认买卖信号,避免假突破。 

4. 优化止损策略,避免部分止损过早或过晚退出。

5. 结合趋势和波浪指标,实现趋势跟踪和逆势交易。

6. 采用自适应均线,根据市场调整均线参数,而非固定周期。

7. 多时间段组合运用,根据市场时间特点采用不同参数组合。

8. 实时优化,利用机器学习等技术持续优化参数。

## 总结

双均线交叉策略以其原理简单,易于掌握和实施的特点,成为技术分析中最核心和常用的交易策略之一。该策略顺应价格趋势,回撤可控,风险亦可接受。但其可优化空间也很大,通过参数优化,结合其他指标以及自动化算法,可以进一步扩展该策略的适用性和效果。总体来说,双均线交叉策略值得投资者重点研究和长期应用。

||

## Overview

The dual moving average crossover strategy is a very classic and commonly used technical analysis strategy. This strategy utilizes the crossover of a faster moving average and a slower moving average as the trading signals for buying and selling. When the faster moving average crosses above the slower moving average from below, a buy signal is generated. When the faster moving average crosses below the slower moving average from above, a sell signal is generated.

## Strategy Logic

The key parts of the strategy code include:

1. Define the length and type of fast and slow moving averages: the fast MA has a period of 5, the slow MA has a period of 21, both using simple moving average. 

2. Calculate the fast and slow MAs: using the sma function to compute the 5-period and 21-period simple moving averages.

3. Plot the chart: plot the trend lines of the fast and slow MAs.  

4. Define the entry and exit rules: buy when the fast MA crosses above the slow MA, sell when the fast MA crosses below the slow MA.

5. Execute trades: use the strategy's long and short functions to automatically execute trades when conditions are met.

The key of this strategy is using moving averages of different periods to form the fast and slow MAs, and using their crossovers as trading signals. The fast MA captures price changes faster while the slow MA reflects long term trend better. The crossover of the fast MA above the slow MA indicates an upside breakout, which is a buy signal. And the crossover below is a sell signal. The logic of this strategy is simple and easy to implement.

## Advantage Analysis 

The dual moving average crossover strategy has the following advantages:

1. Simple principle, easy to grasp, suitable for beginners.

2. Follow the price trend, small pullback. 

3. Moderate trading frequency, avoids over-trading.

4. Customizable parameters, flexible to adapt to market changes.

5. Easy to optimize and find suitable personal parameter sets.

6. Can set stop loss to control risk.

7. Can be used in various markets, high applicability. 

8. Can be combined with other indicators to improve performance.

## Risk Analysis

There are also some risks with this strategy:

1. Delayed reaction when the trend is strong, could miss best entry timing. Can shorten the MA periods to improve sensitivity.

2. More false signals during range-bound markets. Can add filters to avoid wrong trades.

3. Too many trades can impact profitability. Can widen the MA distance to reduce crossovers.

4. Hard to determine trend, risk of counter-trend trading. Can add trend indictors.

5. Parameter optimization requires sufficient historical data, risk of overfitting with new products. Need to test robustness of parameters.

6. Single indicator susceptible to external factors, performance could be unstable. Can combine with other indicators for verification.

## Optimization Directions

There are some ways to optimize the dual MA strategy further:

1. Test different fast and slow MA lengths to find the optimal parameters for specific trading products.

2. Add filters like trading volumes, ATR stop loss to reduce inferior opportunities.

3. Combine momentum indicators to confirm trading signals and avoid false breakouts.

4. Optimize stop loss strategies to avoid premature or late exits.

5. Incorporate trend and wave indicators to enable trend following and counter-trend trading. 

6. Use adaptive MAs to adjust parameters based on market conditions rather than fixed periods.

7. Utilize combinations of parameters for different market sessions and characteristics.

8. Perform real-time optimization via machine learning algorithms to continuously improve parameters.

## Summary

With its simple logic and ease of implementation, the dual moving average crossover strategy has become one of the most essential and widely used technical analysis strategies. It follows the price trend with controlled pullback and acceptable risk. But there is also huge potential for optimization, by parameter tuning, incorporating other indicators and automated algorithms, its applicability and performance can be further enhanced. Overall, the dual MA crossover strategy deserves great attention and long-term application by investors.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2011|Start Year|
|v_input_2|true|Start Month|
|v_input_3|true|Start Day|
|v_input_4|2050|Finish Year|
|v_input_5|12|Finish Month|
|v_input_6|31|Finish Day|
|v_input_7|21|length1|
|v_input_8|3|smoothK1|
|v_input_9|3|smoothD1|
|v_input_10|14|Bottom Line|
|v_input_11|86|Upper Line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-26 00:00:00
end: 2023-10-26 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// strategy("Stochastic Strategy of BiznesFilosof", shorttitle="SS of BiznesFilosof", overlay=false, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=20, commission_type=strategy.commission.percent, commission_value=0.15, pyramiding=0)

//Period
startY = input(title="Start Year", defval = 2011)
startM = input(title="Start Month", defval = 1, minval = 1, maxval = 12)
startD = input(title="Start Day", defval = 1, minval = 1, maxval = 31)
finishY = input(title="Finish Year", defval = 2050)
finishM = input(title="Finish Month", defval = 12, minval = 1, maxval = 12)
finishD = input(title="Finish Day", defval = 31, minval = 1, maxval = 31)
//finish = input(2019, 02, 28, 00, 00)
timestart = timestamp(startY, startM, startD, 00, 00)
timefinish = timestamp(finishY, finishM, finishD, 23, 59)
window = true // Lenghth strategy

length1 = input(21, minval=1), smoothK1 = input(3, minval=1), smoothD1 = input(3, minval=1)
//length2 = input(5, minval=1), smoothK2 = input(1, minval=1), smoothD2 = input(1, minval=1)
inh0 = input(title="Bottom Line", defval = 14, minval=0), inh1 = input(title="Upper Line", defval = 86, minval=0)

k1 = sma(stoch(close, high, low, length1), smoothK1)
d1 = sma(k1, smoothD1)
plot(k1, color=blue)
plot(d1, color=red)
//k2 = sma(stoch(close, high, low, length2), smoothK2)
//d2 = sma(k2, smoothD2)
//plot(k2, color=orange)

h1 = hline(inh1)
h0 = hline(inh0)
fill(h0, h1, color = aqua, transp=90)

//open
strategy.entry("LongEntryID", strategy.long, comment="LONG", when = crossover(k1, d1) and crossover(k1, inh0) and window)
strategy.entry("ShortEntryID", strategy.short, comment="SHORT", when = crossunder(k1, d1) and crossunder(k1, inh1) and window)

if crossunder(k1, d1) and crossunder(k1, inh1) and strategy.position_size > 0
    strategy.close_all()
if crossover(k1, d1) and crossover(k1, inh0) and strategy.position_size < 0
    strategy.close_all()
  
    

```

> Detail

https://www.fmz.com/strategy/430380

> Last Modified

2023-10-27 16:47:30
