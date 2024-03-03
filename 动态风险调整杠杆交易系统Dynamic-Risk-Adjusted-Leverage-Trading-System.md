
> Name

动态风险调整杠杆交易系统Dynamic-Risk-Adjusted-Leverage-Trading-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15aeffa6244c92b3c43.png)

[trans]

## 概述

这个交易系统名为“动态风险调整杠杆交易系统”,旨在根据当前市场波动率相对于其历史平均值来管理交易。该系统根据ATR(平均真实范围)指标计算目标开仓数量,并相应调整杠杆。系统采用金字塔加仓开仓方式,允许同时开多个头寸。

## 策略原理

系统的具体步骤如下:

1. 计算14日ATR周期的ATR值,并将其除以当前收盘价进行标准化。

2. 计算标准化ATR的100日简单移动平均值(SMA)。 

3. 计算标准化ATR与其100日SMA的比率。

4. 根据比率的倒数(2 / 比率)确定目标杠杆。

5. 通过将目标杠杆乘以5计算目标开仓数量。

6. 在图表上绘制目标开仓数量和当前开仓数量。

7. 检查是否有买入机会(如果当前开仓数量少于目标数量)或平仓机会(如果当前开仓数量大于目标数量加1)。

8. 如果有买入机会,开多单并将交易添加到openTrades数组。

9. 如果有平仓机会并且openTrades数组中有交易,平掉最新交易并从数组中删除。

该系统旨在通过动态调整开仓数量和杠杆捕捉市场趋势,使用数组跟踪开仓情况,可更好地控制单笔交易的开平。

## 优势分析

该策略具有以下优势:

1. 动态调整杠杆和头寸数量,可以根据市场波动率变化调整风险敞口。当波动率较低时,增加杠杆和头寸数量,当波动率较高时,减少杠杆和头寸数量,有效控制风险。

2. 使用ATR指标计算目标头寸数量,该指标能反映市场波动性,是动态调整头寸的合理指标选择。

3. 采用金字塔加仓方式,同时开多个头寸,能在趋势中获利。

4. 使用数组记录每笔开仓交易,可以明确控制单笔交易的开平,避免出现不必要的反向操作。

5. 该策略参数较少,容易实现和操作。

6. 策略思路清晰易懂,代码结构合理,易于优化和迭代。

## 风险分析

该策略也存在一些风险:

1. ATR指标仅反映过去一段时间的波动性,未来波动率变化无法预知,可能导致杠杆调整不当。

2. 金字塔加仓方式可能在趋势反转时导致损失积累。

3. 数组记录开仓仅适用于简单的开平仓操作,如果开仓逻辑较复杂则需要更复杂的数据结构。

4. 目标杠杆和头寸数量的设定需要根据品种特性调整,不宜局限于某个固定参数。

5. 单一指标容易产生误导,可以考虑加入其它波动率指标或机器学习算法以提高稳健性。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 增加止损策略,当亏损达到止损点时主动止损。

2. 优化指标参数,测试不同ATR周期参数的效果。

3. 尝试不同的开仓策略,如固定数量开仓等,测试效果。 

4. 增加其它衡量波动率的指标,如布林带WIDTH,KD,RSI等,组合使用。

5. 利用机器学习方法预测波动率,代替simplex smoothing方法。

6. 优化开仓数量的计算方式,可使用ATR倍数或波动率函数等方式。

7. 记录更多开仓细节,如开仓价格、时间等,用于策略分析优化。

8. 增加参数优化功能,自动优化找到最佳参数组合。

## 总结

本策略基于ATR动态调整杠杆和开仓数量,在趋势中进行风险敞口调整,具有一定的优势。但也存在参数设定困难、指标优化空间等问题值得进一步优化。整体来说,该策略思路清晰,易操作易优化,值得深入研究应用。

||


## Overview

This trading system called “Dynamic Risk-Adjusted Leverage Trading System” aims to manage trades based on current market volatility relative to historical average. The system calculates target number of open trades based on ATR indicator and adjusts leverage accordingly. It opens and closes trades using pyramiding approach, allowing multiple positions at the same time.

## Strategy Logic  

The system follows steps below:

1. Calculate 14-period ATR and normalize it by dividing it by closing price.

2. Calculate 100-day Simple Moving Average (SMA) of normalized ATR.

3. Calculate the ratio of normalized ATR to its 100-day SMA.  

4. Determine target leverage based on inverse of the ratio (2/ratio).

5. Calculate target number of open trades by multiplying target leverage by 5.

6. Plot target and current open trades on chart.

7. Check if there is chance to buy (if current open trades less than target) or close trade (if current open trades greater than target plus 1).

8. If chance to buy, open long trade and add to openTrades array.

9. If chance to close trade and trades exist in openTrades array, close most recent trade by referencing array and remove from array.

The system aims to capture trends by dynamically adjusting open trades and leverage based on market volatility. It uses array to track open trades for better control.

## Advantage Analysis

The advantages of this strategy:

1. Dynamic adjustment of leverage and position size based on market volatility changes can effectively manage risk.

2. Using ATR indicator to calculate target position size, which reflects market volatility, is a reasonable choice. 

3. Pyramiding with multiple positions can profit from trends.

4. Recording each trade in array enables explicit control of opening and closing trades.

5. The strategy has few parameters and is easy to implement and operate. 

6. The logic is clear and code structure is well organized for easy optimization and iteration.

## Risk Analysis

The risks of this strategy:

1. ATR only reflects past volatility, unable to predict future changes, may lead to improper leverage adjustment.

2. Pyramiding may accumulate losses when trend reverses. 

3. Array recording trades only applies to simple open/close operations. More complex data structure needed for complex logic.

4. Target leverage and position size settings need adjustment based on symbol specifics rather than fixed parameters.

5. Reliance on single indicator can be misleading. Other volatility indicators or machine learning algorithms can improve robustness.

## Optimization Directions

The strategy can be optimized in aspects below:

1. Add stop loss to actively cut loss when reaching stop loss level.

2. Optimize indicator parameters by testing different ATR periods. 

3. Try other entry strategies like fixed quantity entries and test the results.

4. Add other volatility metrics like Bollinger Bands WIDTH, KD, RSI etc. for combinational use.

5. Use machine learning models to predict volatility instead of simple smoothing. 

6. Optimize calculation of position size, such as using ATR multiples or volatility functions. 

7. Record more entry details like entry price, time etc. for strategy analysis and optimization.  

8. Add parameter optimization for auto-optimization to find optimum parameter sets.

## Conclusion

The strategy dynamically adjusts leverage and position size based on ATR to manage risk exposure during trends, and has certain advantages. But challenges like parameter setting difficulty and indicator optimization space remain for further improvements. Overall, the logic is clear and easy to operate and optimize, worthy of in-depth research and application.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-09 00:00:00
end: 2023-10-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("I11L - Risk Adjusted Leveraging", overlay=false, pyramiding=25, default_qty_value=20, initial_capital=20000, default_qty_type=strategy.percent_of_equity,process_orders_on_close=false, calc_on_every_tick=false)

atr = ta.atr(14) / close
avg_atr = ta.sma(atr,100)
ratio = atr / avg_atr

targetLeverage = 2 / ratio
targetOpentrades = 5 * targetLeverage

plot(targetOpentrades)
plot(strategy.opentrades)
isBuy = strategy.opentrades < targetOpentrades
isClose = strategy.opentrades > targetOpentrades + 1

var string[] openTrades = array.new_string(0)

if(isBuy)
    strategy.entry("Buy"+str.tostring(array.size(openTrades)),strategy.long)
    array.push(openTrades, "Buy" + str.tostring(array.size(openTrades)))

if(isClose)
    if array.size(openTrades) > 0
        strategy.close(array.get(openTrades, array.size(openTrades) - 1))
        array.pop(openTrades)
```

> Detail

https://www.fmz.com/strategy/429387

> Last Modified

2023-10-16 16:00:52
