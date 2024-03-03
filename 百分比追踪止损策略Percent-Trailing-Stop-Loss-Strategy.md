
> Name

百分比追踪止损策略Percent-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略实现了一个可配置的百分比追踪止损机制,用于控制交易风险。它允许设定长仓和短仓的止损幅度百分比,从入场价格开始不断向有利方向追踪最高价或最低价,从而实现动态止损。

## 策略原理

该策略的主要逻辑是:

1. 输入长仓和短仓的止损百分比
2. 长仓时:持续追踪低点,并根据最低价计算止损线
3. 短仓时:持续追踪高点,并根据最高价计算止损线  
4. 当价格触碰止损线时,立即止损退出当前仓位

策略允许自定义止损百分比,例如设置为10%。长仓时,它会实时计算最低价的10%上方作为止损线;短仓时,计算最高价的10%下方作为止损线。

这样,止损线会不断向有利方向移动,实现动态追踪止损,最大程度保护了利润,同时也控制了风险。

## 策略优势

- 实现自动追踪止损,无需手动操作
- 动态止损线,最大限度保护利润
- 可自定义止损百分比,适应各种交易品种
- 有助于风险控制,减少超出预期的损失
- 适用于多种交易策略,易于集成

## 策略风险及应对

- 追踪速度较慢,存在无法止损的风险
- 止损过于宽松可能造成亏损扩大
- 止损过于收紧可能造成过频止损

应对方法:

1. 优化止损百分比,平衡止损效果
2. 结合其他止损方式,如时间止损
3. 根据市场波动率优化止损参数
4. 保持止损一致性,避免参数过于随意改变

## 策略优化方向

该策略可优化的点:

1. 采用机器学习算法动态优化止损参数
2. 根据最大回撤等指标自动调整止损幅度
3. 结合移动平均线等指标设定止损位置
4. 根据波动率情况选择不同的参数配置
5. 设置部分止损后调整止盈位置以获利

## 总结

该策略提供了一个行之有效的百分比追踪止损方法,可以动态调整止损线。它可以最大限度保护利润,也可以有效控制风险。通过参数优化、指标集成等方式,可以使止损策略更加智能化和优化。

|| 

## Overview

This strategy implements a configurable percentage trailing stop loss to manage trade risk. It allows setting long and short stop loss percentage from entry price for dynamic stop loss tracking.

## Strategy Logic

The main logic is:

1. Input long and short stop loss percentage
2. For longs: continually track lows and calculate stop loss line 
3. For shorts: continually track highs and calculate stop loss line
4. Exit positions when price touches stop loss line

The strategy allows customizing stop percentage, e.g. 10%. For longs, it dynamically calculates 10% above the low as the stop line. For shorts, 10% below the high.

This way, the stop line keeps moving favorably to maximize profit protection while controlling risk.

## Advantages

- Automates trailing stop loss without manual intervention
- Dynamic stop line protects profits as much as possible
- Customizable stop loss percentage for different instruments
- Helps control risk and reduce outsized losses  
- Easy to integrate into other strategies

## Risks and Mitigation 

- Slow trailing risks inability to stop out
- Stop loss too loose can increase losses
- Stop loss too tight risks over-frequent stops

Mitigations:

1. Optimize stop percentage to balance effectiveness
2. Incorporate other stop types like time-based stops
3. Tune stop based on market volatility  
4. Maintain stop consistency, avoid arbitrary changes

## Enhancement Opportunities

Enhancement opportunities:

1. Machine learning to dynamically optimize stop  
2. Auto-adjust based on max drawdown metrics
3. Incorporate indicators like moving averages for stop placement
4. Use different configurations based on volatility regime  
5. Set profit stops after partial stops to lock in profits

## Conclusion

This strategy provides an effective percentage trailing stop method to dynamically adjust stop loss. It maximizes profit protection while controlling risk. Enhancements through parameter optimization, indicator integration can make the stops more intelligent.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Long Trailing Stop (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © theCrypster

//@version=4
strategy("Percent Trailing Stop %", overlay=true)

//ENTER SOME SETUP TRADES FOR TSL EXAMPLE
longCondition = crossover(sma(close, 10), sma(close, 20))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = crossunder(sma(close, 10), sma(close, 20))
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
    

//TRAILING STOP CODE
trailStop = input(title="Long Trailing Stop (%)", type=input.float, minval=0.0, step=0.1, defval=10) * 0.01

longStopPrice = 0.0
shortStopPrice = 0.0
longStopPrice := if strategy.position_size > 0
    stopValue = close * (1 - trailStop)
    max(stopValue, longStopPrice[1])
else
    0
shortStopPrice := if strategy.position_size < 0
    stopValue = close * (1 + trailStop)
    min(stopValue, shortStopPrice[1])
else
    999999

//PLOT TSL LINES
plot(series=strategy.position_size > 0 ? longStopPrice : na, color=color.red, style=plot.style_linebr, linewidth=1, title="Long Trail Stop", offset=1, title="Long Trail Stop")
plot(series=strategy.position_size < 0 ? shortStopPrice : na, color=color.red, style=plot.style_linebr, linewidth=1, title="Short Trail Stop", offset=1, title="Short Trail Stop")


//EXIT TRADE @ TSL
if strategy.position_size > 0
    strategy.exit(id="Close Long", stop=longStopPrice)
if strategy.position_size < 0
    strategy.exit(id="Close Short", stop=shortStopPrice)

```

> Detail

https://www.fmz.com/strategy/427301

> Last Modified

2023-09-19 21:18:39
