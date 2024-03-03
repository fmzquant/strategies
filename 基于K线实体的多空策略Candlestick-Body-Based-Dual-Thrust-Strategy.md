
> Name

基于K线实体的多空策略Candlestick-Body-Based-Dual-Thrust-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/5a2f9300a6cac14703.png)
[trans]


## 概述

该策略基于K线的实体长度来判断多空方向。它计算最近30根K线的平均实体长度,当阳线实体长度大于平均实体长度时做多,当阴线实体长度大于平均实体长度时做空。

## 策略原理

该策略首先计算K线的实体长度body,及最近30根K线实体长度的平均值sbody。

当今日K线为阴线(bar==-1),且实体长度大于平均实体长度时,打开多单(up1)。

当今日K线为阳线(bar==1),且实体长度大于平均实体长度时,打开空单(dn1)。 

多单打开后,如果今日K线为阳线(bar==1),且当前头寸为盈利状态,则平仓多单。

空单打开后,如果今日K线为阴线(bar==-1),且当前头寸为盈利状态,则平仓空单。

该策略简单有效地利用了K线实体的长度来判断行情趋势,实体越长表示趋势越强,因此以实体长度作为判断多空的依据。

## 优势分析

该策略具有以下优势:

1. 策略思路简单明了,容易理解和实现。

2. 利用K线实体长度判断趋势,避免被噪音干扰。

3. 采用动态平均值计算,可以适应市场的变化。

4. 设置盈利平仓条件,可以提高策略收益率。

5. 可配置策略参数,适用于不同市场环境。

## 风险分析

该策略也存在一些风险:

1. 实体较长不一定代表强势趋势,可能是正常波动。

2. 平均实体长度的时间窗口设定不当可能导致错失交易机会。

3. 突发事件可能导致策略亏损。

4. 多空头寸持有时间过长可能导致亏损扩大。

对应风险的解决方法:

1. 结合其它指标判断趋势,避免错 trades。

2. 测试不同参数取值,优化平均实体长度的计算。

3. 设置止损止盈条件,控制单次亏损。

4. 优化开仓和平仓逻辑,避免持仓时间过长。

## 优化方向

该策略可以从以下方面进行优化:

1. 结合MACD、RSI等指标判断趋势,避免因常规波动产生错误信号。

2. 测试不同的平均实体长度时间窗口参数,寻找最优参数组合。

3. 添加开仓量控制逻辑,随着亏损次数增加逐步减少开仓量。

4. 设置移动止损或利润率止损退出条件,控制单次亏损比例。 

5. 优化开仓和平仓条件,避免无效交易。例如连续3根K线实体较长再开仓。

6. 在特定时间段或重要数据发布前后避开交易,控制汇率冲击带来的亏损。

## 总结

该策略整体思路清晰易懂,通过比较K线实体与其平均长度来判断入场时机。策略优化空间较大,可从多方面入手进行优化调整,使策略参数更符合不同市场环境。整体来说,该策略作为一个量化交易入门策略足够简单可靠,适合新手 traders 使用和学习。通过不断优化和组合更多指标,可以进一步提高策略收益率和稳定性。

||


## Overview

This strategy uses the length of the candlestick body to determine the long and short direction. It calculates the average body length of the recent 30 candlesticks. When the bullish candle body length is greater than average, it goes long. When the bearish candle body length is greater than average, it goes short.

## Strategy Logic

This strategy first calculates the candlestick body length body and the average body length of recent 30 candlesticks sbody. 

When today's candlestick is bearish (bar==-1) and the body length is greater than average body length, it opens long position (up1).

When today's candlestick is bullish (bar==1) and the body length is greater than average body length, it opens short position (dn1).

After opening long, if today's candlestick is bullish (bar==1) and the current position is profitable, it closes long position. 

After opening short, if today's candlestick is bearish (bar==-1) and the current position is profitable, it closes short position.

The strategy simply and effectively uses the candlestick body length to determine the market trend. The longer the body, the stronger the trend. So it uses body length as the criterion for long and short.

## Advantage Analysis

The advantages of this strategy:

1. The logic is simple and clear, easy to understand and implement.

2. Using candlestick body length to determine trend, avoid noise interference. 

3. Adopt dynamic average calculation, can adapt to market changes.

4. Set profitable exit condition to improve profitability.

5. Configurable parameters, adaptable to different market environments.

## Risk Analysis

The risks of this strategy:

1. Long body does not necessarily represent strong trend, could be normal fluctuation.

2. Improper average body length time window may miss trading opportunities.

3. Black swan events may cause losses. 

4. Holding positions for too long may amplify losses.

Solutions:

1. Combine with other indicators to determine trend, avoid wrong trades.

2. Test different parameter values, optimize average body length calculation.

3. Set stop loss to control single loss.

4. Optimize entry and exit logic to avoid holding too long.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Combine MACD, RSI to determine trend, avoid wrong signals from normal fluctuations.

2. Test different average body length time window parameters to find optimal parameter set.

3. Add position sizing control logic, gradually reduce position size when incurring losses.

4. Set trailing stop loss or profit target to control single loss percentage.

5. Optimize entry and exit conditions to avoid ineffective trades. For example, wait for 3 consecutive long candlesticks before entering.

6. Avoid trading at certain periods or around important data release to control loss from volatility.

## Conclusion

The strategy has clear and easy-to-understand logic of comparing candlestick body to its average length for entry timing. Large room for optimization from multiple dimensions to tailor it better for different market environments. Overall a simple and reliable introductory quant trading strategy suitable for novice traders to use and learn. Further combine more indicators and optimize to improve profitability and robustness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|true|Use body|
|v_input_4|1900|From Year|
|v_input_5|2100|To Year|
|v_input_6|true|From Month|
|v_input_7|12|To Month|
|v_input_8|true|From day|
|v_input_9|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-11-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy(title = "Noro's ColorBar Strategy v1.0", shorttitle = "ColorBar str v1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100.0, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usebody = input(true, defval = true, title = "Use body")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Signals
bar = close > open ? 1 : close < open ? - 1 : 0
body = abs(close - open)
sbody = ema(body, 30)

up1 = bar == -1 and (body > sbody or usebody == false)
dn1 = bar == 1 and (body > sbody or usebody == false)

plus = (close > strategy.position_avg_price and strategy.position_size > 0) or (close < strategy.position_avg_price and strategy.position_size < 0)
exit = ((strategy.position_size > 0 and bar == 1) or (strategy.position_size < 0 and bar == -1)) and plus

if up1
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, 01, 00, 00) and time < timestamp(toyear, tomonth, 31, 00, 00)))

if dn1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, 01, 00, 00) and time < timestamp(toyear, tomonth, 31, 00, 00)))
    
if time > timestamp(toyear, tomonth, 31, 00, 00) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/432354

> Last Modified

2023-11-16 17:14:48
