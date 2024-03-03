
> Name

金叉死叉量化交易策略Gold-Cross-Dead-Cross-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1768cebdd183dccd1c2.png)
[trans]
### 概述

本策略通过计算XAUUSD(黄金)的30日简单移动平均线(MA30)和200日简单移动平均线(MA200)的交叉情况,实现金叉买入和死叉卖出的量化交易。该策略同时设置了止损和止盈价格,可以自动平仓。

### 策略原理 

该策略的核心指标是MA30和MA200。当MA30上穿MA200时,产生买入信号;当MA30下穿MA200时,产生卖出信号。这种交叉被称为“金叉”和“死叉”。

具体来说,该策略使用ta库计算MA30和MA200。然后通过ta.crossover和ta.crossunder函数判断它们的交叉情况。当发生向上交叉(金叉)时,设置longCondition值为true,进行买入操作;当发生向下交叉(死叉)时,设置shortCondition值为true,进行卖出操作。

在交易执行方面,买入和卖出订单分别设置了4万点的止损和止盈价格。这相当于XAUUSD中4000点的价格变动。当价格触发止损或止盈时,orders会自动平仓。

此外,策略还设置了对冲机制。如果当前持有多头仓位,后续出现死叉信号,会直接平仓换向;如果当前持有空头仓位,后续出现金叉信号,也会直接平仓换向。这可以避免在趋势反转时承受大幅亏损。

### 策略优势

这是一个非常简单直观的趋势跟踪策略。它具有如下优点:

1. 规则清晰,易于实现。
2. 可用于多个时间周期,适合日内和长线操作。
3. 顺应市场周期性,可捕捉趋势反转。
4. 设置止损止盈自动出场机制,可控制单笔损失。
5. 建立对冲机制,避免趋势反转带来的亏损。

### 风险分析

该策略也存在一些风险:

1. MA指标存在滞后,可能错过短期趋势反转的最佳入场时机。
2. 止损价格设置得不合理,可能过早被止损出场。
3. 反转信号干扰过多,增加无谓交易的次数。
4. 该策略对交易资金规模也有一定要求,需要承受一定回撤。

为控制这些风险,可以对参数进行优化,调整止损幅度,过滤反转信号等。

### 策略优化

该策略可以从以下几个方面进行优化:

1. 优化MA参数,改用EMA或加权移动平均线。
2. 增加其他指标过滤,如交易量,震动指标等。 
3. 对冲机制可以仅在显著信号时启用。
4. 可以设置仓位大小管理,优化资金利用效率。
5. 可以结合机器学习算法动态优化止损止盈设定。

通过参数调整、增加过滤器、仓位管理等手段,可以进一步提高策略稳定性。

### 总结

本策略是一个简单实用的移动平均交叉策略。它顺应市场周期运行,通过设置自动止损止盈平仓和对冲机制来控制风险。该策略易于理解和实现,可适用于多种交易品种和时间周期。通过进一步优化,可以获得更好的风险收益比,是一种值得推荐的量化交易策略。

||

### Overview

This strategy calculates the 30-day simple moving average (MA30) and 200-day simple moving average (MA200) crossovers of XAUUSD (gold) to implement gold cross buys and dead cross sells quantitative trading. The strategy also sets stop loss and take profit prices for automatic position closing.

### Strategy Principle

The core indicators of this strategy are MA30 and MA200. When MA30 crosses above MA200, a buy signal is generated. When MA30 crosses below MA200, a sell signal is generated. These crosses are called "gold crosses" and "dead crosses".  

Specifically, the strategy uses the ta library to calculate MA30 and MA200. The ta.crossover and ta.crossunder functions then judge if they cross. When an upward crossover (gold cross) occurs, the longCondition value is set to true for buying. When a downward crossover (dead cross) occurs, the shortCondition value is set to true for selling.

For order execution, stop loss and take profit prices of 40,000 points each are set for long and short trades. This corresponds to a 4,000 point price change in XAUUSD. When the price triggers the stop loss or take profit, orders will close positions automatically.  

In addition, a hedging mechanism is established in the strategy. If the current position is long, a subsequent dead cross signal will directly flatten the position and reverse it. If the current position is short, a subsequent gold cross signal will also directly flatten and reverse the position. This avoids large losses during trend reversions.

### Advantages

This is a very simple and intuitive trend following strategy. It has the following advantages:

1. Clear rules that are easy to implement.  
2. Applicable to multiple time frames for day and long term trading.
3. Aligns with market cycles and captures trend reversions. 
4. Sets auto exit mechanism with stop loss/profit to control single trade loss.
5. Establishes hedging to avoid losses from trend reversions.

### Risk Analysis 

There are some risks to this strategy:

1. MA indicators lag and may miss best entry for short term trend reversals.  
2. Improper stop loss setting may prematurely exit trades.
3. Too many reverse signals increase unnecessary trading.
4. The strategy has capital requirements to withstand drawdowns.

These risks can be managed by parameter optimization, adjusting stop loss levels, filtering reverse signals etc.

### Optimization

The strategy can be optimized in several ways:

1. Optimize MA parameters using EMA or weighted moving averages.
2. Add other filters like volume, volatility indicators etc.  
3. Enable hedging mechanism only on significant signals.
4. Set up position sizing for better capital efficiency.
5. Dynamically optimize stops/profits using machine learning algorithms.

Parameter tuning, adding filters, position sizing etc. can further improve strategy stability.  

### Conclusion

This is a simple and practical moving average crossover strategy. It aligns with market cycles, controls risk through automated stop loss/profit exits and hedging mechanisms. Easy to understand and implement, it is applicable for multiple products and time frames. Further optimizations can improve risk/reward profile. Overall an advisable quantitative trading strategy.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Estrategia de Cruce de Medias Móviles", overlay=true)

// Medias móviles
ma30 = ta.sma(close, 30)
ma60 = ta.sma(close, 60)
ma200 = ta.sma(close, 200)

// Cruce de medias móviles
crossoverUp = ta.crossover(ma30, ma200)
crossoverDown = ta.crossunder(ma30, ma200)

// Señales de compra y venta
longCondition = crossoverUp
shortCondition = crossoverDown

// Ejecución de órdenes
if (longCondition)
    strategy.entry("Buy", strategy.long)
    strategy.exit("Cover", "Buy", stop=close - 40.000, limit=close + 40.000)
if (shortCondition)
    strategy.entry("Sell", strategy.short)
    strategy.exit("Cover", "Sell", stop=close + 40.000, limit=close - 40.000)

// Plot de las medias móviles
plot(ma30, color=color.blue, title="MA 30")
plot(ma60, color=color.orange, title="MA 60")
plot(ma200, color=color.green, title="MA 200")

// Condiciones para cerrar la posición contraria
if (strategy.position_size > 0)
    if (crossoverDown)
        strategy.close("Buy")
if (strategy.position_size < 0)
    if (crossoverUp)
        strategy.close("Sell")
```

> Detail

https://www.fmz.com/strategy/440829

> Last Modified

2024-02-02 14:46:11
