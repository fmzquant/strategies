
> Name

基于ZigZag的趋势追踪策略ZigZag-Based-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/195b667574c43be95b7.png)

[trans]


## 概述

该策略利用ZigZag指标判断趋势方向,在趋势确认后进行趋势追踪,属于趋势跟踪策略。

## 策略原理

该策略主要通过ZigZag指标判断价格的趋势方向。ZigZag指标能够过滤市场噪音,判断出主要的价格波动方向。当价格创出新高或新低时,ZigZag就会发出交易信号。 

具体来说,策略首先计算ZigZag值,当价格创出更高的高点时,ZigZag为该高点价格;当价格创出更低的低点时,ZigZag为该低点价格。这样,ZigZag就能清晰地反映价格的主要波动方向。 

策略根据ZigZag值判断趋势方向。当ZigZag上涨时,表明处于上涨趋势;当ZigZag下跌时,表明处于下跌趋势。策略在ZigZag发生转折时开仓,以跟踪趋势方向。

具体来说,策略在ZigZag转折形成新高时开多单,在ZigZag转折形成新低时开空单。平仓条件为ZigZag再次转折反转。这样就实现了基于ZigZag判断趋势的自动交易策略。

## 策略优势分析

- 利用ZigZag指标判断趋势,能有效过滤市场噪音,准确判断主要趋势方向。
- ZigZag转折时机点精确,容易形成较优的入场时机。
- 实现了完全的趋势追踪策略,不需要其它复杂指标或模型支持。
- 策略逻辑简单清晰,容易理解和修改。
- 可通过参数调整自由控制策略的交易频率。

## 风险分析

- ZigZag对中短线牛熊转换不敏感,可能错过较快的反转。
- 追踪趋势策略,无法应对趋势反转带来的亏损。
- 无法限制单笔损失大小,存在较大的单笔损失风险。
- 策略仅基于一个指标,可能存在过拟合风险。

可通过以下方法降低风险:

- 组合其他指标判断趋势反转风险。
- 适当缩短持仓时间,及时止损。
- 增加资金管理模块,限制单笔损失大小。
- 增加机器学习模型,提高策略鲁棒性。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 增加止损策略,以控制单笔亏损风险。可以设置移动止损或挂单止损。

2. 增加趋势反转判断机制。可以加入MACD、移动平均线等指标,在判断到趋势反转时关闭仓位。

3. 加入重入模块。在趋势延续时,可以适当加仓,以便获利更多。

4. 增加机器学习模型。可以训练LSTM等深度学习模型,辅助ZigZag判断趋势方向。

5. 优化资金管理机制。可以根据回撤或相关性理论优化仓位大小。

6. 全面优化参数设定。可以通过历史回测和参考专业书籍优化参数,如ZigZag的周期长度等。

## 总结

该策略利用ZigZag指标判断趋势方向,实现了基于趋势的交易策略。策略逻辑简单清晰,容易实现。但也存在单指标依赖、趋势反转风险等问题。我们可以从止损、辅助指标、重入模块、机器学习等方面进行多维度优化,使策略更稳健、合理。在参数优化和风险控制到位后,该策略可以成为中长线跟踪趋势的有效工具。

||


## Overview

This strategy uses the ZigZag indicator to determine trend direction and follows the trend once confirmed. It belongs to the trend following strategy.

## Strategy Logic

The strategy mainly uses the ZigZag indicator to determine the price trend direction. ZigZag can filter market noise and identify major price fluctuation directions. It generates trading signals when prices reach new highs or lows. 

Specifically, the strategy first calculates the ZigZag values. When prices reach a higher high, the ZigZag value becomes the high price. When prices reach a lower low, the ZigZag value becomes the low price. Thus, ZigZag can clearly reflect the main price fluctuation direction.

The strategy determines the trend direction based on ZigZag values. When ZigZag rises, it indicates an upward trend. When ZigZag falls, it indicates a downward trend. The strategy opens positions when ZigZag turns around to follow the trend direction. 

In particular, the strategy goes long when ZigZag turns to a new high, and goes short when ZigZag turns to a new low. The exit condition is when ZigZag turns around again. This achieves auto trading based on ZigZag for trend identification.

## Advantage Analysis 

- ZigZag can effectively filter market noise and accurately determine the major trend direction.
- ZigZag turn timing is precise, allowing optimal entry opportunities.
- It implements a pure trend following strategy without other complex indicators or models. 
- The logic is simple and clear, easy to understand and modify.
- The trading frequency can be freely controlled via parameter tuning.

## Risk Analysis

- ZigZag is insensitive to medium-term trend reversals, potentially missing faster reversals.
- Trend following strategies cannot handle losses from trend reversals.
- It does not limit the loss size of single trades, posing large single loss risks.
- The strategy relies solely on one indicator, risks overfitting.

Risks can be reduced by:

- Combining other indicators to detect trend reversal risks.
- Shortening holding period, timely stop loss.
- Adding risk management to limit single loss size. 
- Adding machine learning models to improve robustness.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Add stop loss to control single loss risk, e.g. trailing stop or stop limit orders.

2. Add trend reversal detection mechanisms, e.g. MACD, moving averages. Close positions when reversal is detected.

3. Add re-entry module. Pyramid positions when trend continues.

4. Add machine learning models like LSTM to assist trend detection.

5. Optimize capital management based on drawdown or correlation theories. 

6. Comprehensively optimize parameters like ZigZag period by backtesting and referencing expertise.

## Summary

The strategy identifies trend direction by ZigZag and trades the trend. The logic is simple and easy to implement. But risks like single indicator reliance and trend reversal exist. We can optimize via stop loss, auxiliary indicators, re-entry, machine learning models etc. to make it more robust and rational. With proper parameters and risk controls, it can effectively track medium-long term trends.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|false|Short|
|v_input_3|100|Capital, %|
|v_input_4|W|Timeframe for ZigZag|
|v_input_5|false|Show ZigZag|
|v_input_6|false|Show Background|
|v_input_7|1900|From Year|
|v_input_8|2100|To Year|
|v_input_9|true|From Month|
|v_input_10|12|To Month|
|v_input_11|true|From day|
|v_input_12|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-23 00:00:00
end: 2023-04-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's ZZ Strategy v1.0", shorttitle = "ZZ str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(false, defval = false, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
tf = input('W', title='Timeframe for ZigZag')
showzz = input(false, defval = false, title = "Show ZigZag")
showbg = input(false, defval = false, title = "Show Background")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//ZigZag
zigzag() =>
    _isUp = close >= open
    _isDown = close <= open
    _direction = _isUp[1] and _isDown ? -1 : _isDown[1] and _isUp ? 1 : nz(_direction[1])
    _zigzag = _isUp[1] and _isDown and _direction[1] != -1 ? highest(2) : _isDown[1] and _isUp and _direction[1] != 1 ? lowest(2) : na
useAltTF = true
zz = useAltTF ? (change(time(tf)) != 0 ? request.security(syminfo.tickerid, tf, zigzag()) : na) : zigzag()
zzcolor = showzz ? black : na
plot(zz, title = 'ZigZag', color = zzcolor, linewidth = 2)

//Levels
dot = zz > 0 ? zz : dot[1]
uplevel = dot > dot[1] ? dot : uplevel[1]
dnlevel = dot < dot[1] ? dot : dnlevel[1]
colorup = close[1] < uplevel[1] and uplevel == uplevel[1] ? lime : na
colordn = close[1] > dnlevel[1] and dnlevel == dnlevel[1] ? red : na
plot(uplevel, color = colorup, linewidth = 3)
plot(dnlevel, color = colordn, linewidth = 3)

//Background
size = strategy.position_size
bgcol = showbg == false ? na : size != size[1] ? blue : na
bgcolor(bgcol, transp = 50)

//Trading
lot = strategy.position_size != strategy.position_size[1] ? strategy.equity / close * capital / 100 : lot[1]

if uplevel > 0 and dnlevel > 0
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, stop = uplevel + syminfo.mintick)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, stop = dnlevel - syminfo.mintick)

if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430572

> Last Modified

2023-10-30 14:51:08
