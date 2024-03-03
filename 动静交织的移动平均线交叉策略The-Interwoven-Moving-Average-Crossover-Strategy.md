
> Name

动静交织的移动平均线交叉策略The-Interwoven-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1f2e206d271871c8fe8.png)
[trans]
### 概述

本策略基于简单移动平均线和加权移动平均线的交叉来产生交易信号,同时结合止损和止盈来管理仓位。该策略融合了动态因素(移动平均线交叉)和静态因素(固定止损止盈比例),达到动静交织的效果。

### 策略原理  

核心逻辑是计算两个不同周期的移动平均线,一个是9日简单移动平均线,一个是21日加权移动平均线。当短周期的9日简单移动平均线上穿长周期的21日加权移动平均线时,产生买入信号;当短周期线下穿长周期线时,产生卖出信号。

收到信号后,按照设置的止损止盈比例下单。例如,如果止损比例设定为5%,那么止损价格就设置为入场价的95%。如果止盈比例为5%,那么止盈价格设置为入场价的105%。这样就实现了动态因素(移动平均线交叉决定入场和出场时机)和静态因素(固定的止损止盈比例)的融合。

### 优势分析

该策略结合动态技术指标和静态策略参数,兼具动静系统的优势。技术指标能够动态捕捉市场特征,有利于把握趋势;而参数设置则提供稳定的风险和回报控制,有利于降低仓位管理的随机性。

相较于纯动态系统,本策略在仓位管理上更为稳健,可以减少非理性决策的影响。相较于纯静态系统,本策略的入场选择更为灵活,能够适应市场的变化。所以,本策略整体而言稳健性和收益性都较好。

### 风险分析  

本策略的风险主要来自两个方面。一是移动平均线产生错误信号的可能。当市场处于震荡整理时,移动平均线可能交叉频繁,使策略被套牢。二是固定止损止盈无法适应特殊市况的风险。当突发事件导致市场大幅波动时,预设的止盈止损位置可能会被突破,无法有效控制风险。

对策一是避开关键时间节点,减少错误信号的概率。对策二是根据市场波动率和特殊事件启用自适应止损算法,使止损止盈随市场调整。

### 优化方向  

本策略可以从以下几个方面进行优化:

1. 测试不同参数组合,寻找最佳参数;

2. 增加过滤条件,避免无效信号;  

3. 应用自适应止损算法,与市场联动;

4. 结合其他指标判断强弱趋势,避开震荡市;

5. 利用机器学习方法自动优化参数。

通过测试不同参数、增加过滤条件、改进止损止盈、判断趋势等方法,可以进一步提高策略的稳定性和收益率。

### 总结  

本策略成功结合了动态指标和静态参数,兼顾了灵活性和稳健性。相较于纯动态和纯静态策略,本策略整体表现更佳。当然,仍有可优化的空间,通过参数调整、过滤条件、自适应止损、机器学习等方法可以使策略效果更优。

||

### Overview

This strategy generates trading signals based on the crossover of simple moving average and weighted moving average, combined with stop loss and take profit to manage positions. The strategy integrates dynamic factors (moving average crossover) and static factors (fixed stop loss and take profit ratios) to achieve an interwoven effect of dynamic and static elements.   

### Strategy Logic

The core logic is to calculate two moving averages with different periods, one is the 9-day simple moving average and the other is the 21-day weighted moving average. When the short-period 9-day SMA crosses above the long-period 21-day WMA, a buy signal is generated. When the short-period line crosses below the long-period line, a sell signal is generated.

After receiving the signal, orders are placed according to the set stop loss and take profit ratios. For example, if the stop loss ratio is set at 5%, then the stop loss price will be set at 95% of the entry price. If the take profit ratio is 5%, then the take profit price will be set at 105% of the entry price. This realizes the fusion of dynamic factors (moving average crossover deciding entry and exit timing) and static factors (fixed stop loss and take profit ratios).

### Advantage Analysis 

The strategy combines dynamic technical indicators and static strategy parameters, possessing the pros of both dynamic and static systems. Technical indicators can dynamically capture market characteristics, which is beneficial for catching trends. Parameter settings provide stable risk and return control, which helps to reduce the randomness in position management.

Compared with pure dynamic systems, this strategy is more robust in position management, which reduces the impact of irrational decisions. Compared with pure static systems, this strategy is more flexible in entry selections, which adapts better to market changes. Therefore, this strategy has good overall robustness and profitability.  

### Risk Analysis

The risks of this strategy mainly come from two aspects. First, the possibility of wrong signals from the moving averages. When the market is range-bound, the moving averages may have frequent crossovers, causing the strategy to be whipsawed. 

Second, the risk that fixed stop loss and take profit cannot adapt to extreme market conditions. When black swan events cause huge market swings, the preset stop loss and take profit levels may be penetrated, failing to effectively control risks.

The countermeasures are: first, avoid key time nodes to reduce the probability of wrong signals; second, enable adaptive stop loss algorithms according to market volatility and special events, making stop loss and take profit adjust with the market.

### Optimization Directions 

This strategy can be optimized from the following aspects:

1. Test different parameter combinations to find the optimal parameters;  

2. Add filtering conditions to avoid invalid signals;

3. Apply adaptive stop loss algorithms to move with the market;  

4. Incorporate other indicators to judge trend strength, avoiding range-bound markets;

5. Utilize machine learning methods to automatically optimize parameters.

Through testing parameters, adding filters, improving stops, judging trends, etc., the stability and profitability of the strategy can be further enhanced.  

### Summary

The strategy successfully combines dynamic indicators and static parameters, balancing flexibility and robustness. Compared with pure dynamic and static strategies, this strategy performs better overall. Of course, there is still room for optimization by adjusting parameters, adding filters, adaptive stops, machine learning, etc., to make the strategy more effective.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|9|WMA Length|
|v_input_int_2|21|MMA Length|
|v_input_float_1|5|Stop Loss (%)|
|v_input_float_2|5|Take Profit (%)|


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
strategy("WMA vs MMA Crossover Strategy with SL/TP", shorttitle="WMA_MMA_Cross_SL_TP", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// Définition des périodes pour les moyennes mobiles
wmaLength = input.int(9, title="WMA Length")
mmaLength = input.int(21, title="MMA Length")

// Paramètres de Stop Loss et Take Profit en pourcentage
stopLossPercentage = input.float(5, title="Stop Loss (%)") / 100
takeProfitPercentage = input.float(5, title="Take Profit (%)") / 100

// Calcul des moyennes mobiles
wmaValue = ta.wma(close, wmaLength)
mmaValue = ta.sma(close, mmaLength)

// Conditions pour les signaux d'achat et de vente
buySignal = ta.crossover(wmaValue, mmaValue)
sellSignal = ta.crossunder(wmaValue, mmaValue)

// Génération des ordres en fonction des signaux
if buySignal
    strategy.entry("Buy", strategy.long)
    strategy.exit("Exit Buy", "Buy", stop=strategy.position_avg_price * (1 - stopLossPercentage), limit=strategy.position_avg_price * (1 + takeProfitPercentage))

if sellSignal
    strategy.entry("Sell", strategy.short)
    strategy.exit("Exit Sell", "Sell", stop=strategy.position_avg_price * (1 + stopLossPercentage), limit=strategy.position_avg_price * (1 - takeProfitPercentage))

// Affichage des moyennes mobiles sur le graphique
plot(wmaValue, color=color.blue, title="WMA")
plot(mmaValue, color=color.red, title="MMA")

// Affichage des signaux sur le graphique pour référence
plotshape(series=buySignal, location=location.belowbar, color=color.green, style=shape.labelup, title="Buy Signal", text="BUY")
plotshape(series=sellSignal, location=location.abovebar, color=color.red, style=shape.labeldown, title="Sell Signal", text="SELL")

```

> Detail

https://www.fmz.com/strategy/442110

> Last Modified

2024-02-19 14:21:10
