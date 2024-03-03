
> Name

基于简单移动平均线的海龟交易策略Turtle-Trading-Strategy-Based-on-Simple-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bc85af93f4b46d790f.png)
[trans]

## 概述

本策略通过计算两组不同参数的简单移动平均线,并以其作为建仓与平仓的信号,实现获利。该策略首先由美国交易员Richard Dennis于1983年提出,依靠简单的规则实现稳定盈利,后被Curtis Faith进一步推广,广为人知。

## 策略原理

该策略同时计算两组快线和慢线。快线参数设置为建仓周期20天,平仓周期10天;慢线参数为建仓周期55天,平仓周期20天。当价格上穿快线建仓周期的最高值时触发建多单信号;当价格下破建仓周期的最低值时触发建空单信号。同理,当价格下穿平仓周期的最低值时平多单;当价格上破平仓周期的最高值时平空单。慢线的建仓和平仓逻辑同快线。

该策略依靠移动平均线的均线理论实现获利。即当短期平均线上穿长期平均线时,被视为价格上涨信号;下穿时则为价格下跌信号。本策略中的快线和慢线发挥着类似的作用。

## 策略优势

1. 规则简单清晰,容易理解和实现,适合初学者学习;
2. 建仓和平仓标准明确,避免频繁交易;
3. 结合快线和慢线双重移动平均线,可以平滑价格变动带来的噪音,产生较为清晰的交易信号;
4. 利用多组参数进行组合,可以控制风险,防止失误交易;
5. 长期稳定盈利,已在实盘中验证。

## 风险及解决方法

1. 策略本身较为机械化,无法对特殊行情作出判断,存在一定盈利上限;
   - 可尝试引入更多指标或基于机器学习的模型辅助决策
2. 移动平均线作为标志指标,存在一定滞后性;
   - 可适当缩短建仓和平仓周期
3. 无法限制最大回撤。
   - 可设置止损点

## 优化方向

1. 增加止损模块,控制最大回撤
2. 结合其他指标过滤信号
3. 动态调整移动平均线参数
4. 增加数据处理模块,剔除异常数据的影响
5. 结合机器学习模型判定趋势

## 总结

本策略属于典型的趋势跟随策略。依靠简单的双重移动平均线建立交易规则,通过追踪市场趋势获得稳定收益。该策略易于理解实现,建仓信号清晰,长期实盘验证收益,非常适合初学者学习研究。同时也为更复杂的量化交易奠定基础。通过不断优化,可望获得更佳的绩效。

||


## Overview

This strategy generates profit by calculating two groups of simple moving averages with different parameters and using them as signals for opening and closing positions. The strategy was first proposed by American trader Richard Dennis in 1983. By following simple rules, it achieved steady profits and was further popularized by Curtis Faith, widely known as the "turtle trading strategy".

## Principles

The strategy simultaneously computes two groups of fast and slow lines. The fast line parameters are set to 20 days for opening positions and 10 days for closing positions. The slow line parameters are 55 days and 20 days respectively. When the price crosses above the highest value of the fast line's opening period, it triggers a long signal. When the price falls below the lowest value of the fast line's opening period, it triggers a short signal. Similarly, when the price falls below the lowest value of the fast line's closing period, it closes long positions. When the price breaks through the highest value of the fast line's closing period, it closes short positions. The slow line has the same logic for opening and closing positions as the fast line.

The strategy relies on the moving average theory to make profits. That is, when the short-term moving average crosses above the long-term one, it is considered a bullish signal. When it crosses below, it signals a downward trend. The fast and slow lines in this strategy play similar roles.

## Advantages

1. Simple and clear rules, easy to understand and implement, suitable for beginners;  
2. Clear criteria for opening and closing positions, avoiding frequent trading;
3. Combining fast and slow dual moving averages smooths out price fluctuations and generates clearer trading signals;  
4. The use of multiple parameter sets helps control risks and prevents erroneous trades;
5. Steady profits in the long run, validated in live trading.

## Risks and Mitigations 

1. The strategy itself is mechanical and cannot make judgments about special market conditions, thus having profit limitations;
   - Attempt to incorporate more indicators or machine learning models to aid decision-making
2. Moving averages as lagging indicators have some latency;
   - Appropriately shorten the opening and closing periods
3. Unable to limit maximum drawdown.
   - Set stop-loss points

## Optimization Directions

1. Add stop-loss module to control maximum drawdown
2. Incorporate other indicators to filter signals
3. Dynamically adjust moving average parameters  
4. Add data processing module to eliminate impacts of abnormal data
5. Incorporate machine learning models to determine trends

## Summary

This is a typical trend-following strategy. By establishing trading rules based on simple dual moving averages and tracking market trends, it achieves steady profits. The strategy is easy to understand and implement with clear opening signals and long-term verified profits from live trading, making it very suitable for beginners to learn and research. It also lays the foundation for more complex quantitative trading. Further optimizations can lead to even better performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|enter_fast|
|v_input_2|10|exit_fast|
|v_input_3|55|enter_slow|
|v_input_4|20|exit_slow|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-28 00:00:00
end: 2023-12-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//coded by tmr0
//original idea from «Way of the Turtle: The Secret Methods that Turned Ordinary People into Legendary Traders» (2007) CURTIS FAITH
strategy("20 years old Turtles strategy by tmr0", shorttitle = "Turtles", overlay=true)

enter_fast = input(20, minval=1)
exit_fast = input(10, minval=1)
enter_slow = input(55, minval=1)
exit_slow = input(20, minval=1)

fastL = highest(enter_fast)
fastLC = lowest(exit_fast)
fastS = lowest(enter_fast)
fastSC = highest(exit_fast)

slowL = highest(enter_slow)
slowLC = lowest(exit_slow)
slowS = lowest(enter_slow)
slowSC = highest(exit_slow)

enterL1 = high > fastL[1]
exitL1 = low <= fastLC[1]
enterS1 = low < fastS[1]
exitS1 = high >= fastSC[1]

enterL2 = high > slowL[1]
exitL2 = low <= slowLC[1]
enterS2 = low < slowS[1]
exitS2 = high >= slowSC[1]


//bgcolor(exitL1 or exitL2? red: enterL1 or enterL2? navy:white)

strategy.entry("fast L", strategy.long, when = enterL1)
strategy.entry("fast S", strategy.short, when = enterS1)
strategy.close("fast L", when = exitL1)
strategy.close("fast S", when = exitS1)

strategy.entry("slow L", strategy.long, when = enterL2)
strategy.entry("slow S", strategy.short, when = enterS2)
strategy.close("slow L", when = exitL2)
strategy.close("slow S", when = exitS2)
//zl=0
//z=strategy.netprofit / 37 * koef  //ежемесячная прибыль
//z=strategy.grossprofit/strategy.grossloss
//z1=plot (z, style=line, linewidth=3, color = z>zl?green:red, transp = 30)
//hline(zl, title="Zero", linewidth=1, color=gray, linestyle=dashed)
```

> Detail

https://www.fmz.com/strategy/437037

> Last Modified

2023-12-29 16:45:51
