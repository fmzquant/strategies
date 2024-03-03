
> Name

基于Coppock曲线的量化交易策略Coppock-Curve-Based-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19ccee84fb7143e22a6.png)
[trans]

## 概述

该策略利用不太为人所知的Coppock曲线技术指标来实现量化交易。Coppock曲线通过计算标准普尔500指数或交易等价物的变化率的加权移动平均来派生。当Coppock曲线上穿零线时产生买入信号,下穿零线时产生卖出信号。可选择使用跟踪止损来锁定利润。该策略以$SPY的Coppock曲线作为买卖其他ETF和股票的代理信号。

## 原理

该策略使用Coppock曲线作为产生交易信号的技术指标。Coppock曲线的计算公式为:

Coppock曲线 = 10周期加权移动平均(14周期变化率ROC + 11周期变化率ROC)

其中变化率ROC的计算公式为:(当前Close - N周期前Close) / N周期前Close  

策略以$SPY的收盘价为基础,计算其Coppock曲线。当曲线上穿零线时产生买入信号,下穿零线时产生卖出信号。

## 优势

- 使用独特的Coppock曲线指标,相比常见的移动平均线等指标,具有更好的前瞻性
- 可配置指标参数进行优化,如加权移动平均周期、变化率计算周期等
- 采用$SPY作为信号源,市场代表性强
- 可选择trailing stop止损来锁定利润,降低回撤

## 风险

- Coppock曲线并不是非常普及的指标,需验证其有效性
- 交易信号可能存在拉迟,需要优化参数
- 止损设置过于宽松可能错失回撤机会
- 依赖单一指标容易产生假信号

## 优化方向

- 测试不同市场、不同股票以优化最佳参数组合
- 结合其他指标过滤假信号,例如成交量
- 动态优化止损百分比
- 考虑交易次数或价格突破作为入场

## 总结

该策略利用Coppock曲线独特的曲线形态特征来产生交易信号。相比常见指标,Coppock曲线具有更强的前瞻性。但作为独立指标其可靠性仍需验证,建议与其他因素组合使用以过滤假信号。通过参数优化、止损优化以及组合其他指标,该策略可以成为一个有效的量化交易系统。

||


## Overview

This strategy utilizes the lesser known Coppock Curve technical indicator to implement quantitative trading. The Coppock Curve is derived by taking a weighted moving average of the rate of change (ROC) of a market index like S&P 500 or a trading equivalent like SPY ETF. Buy signals are generated when the Coppock Curve crosses above zero and sell signals when it crosses below. An optional trailing stop loss is available to lock in profits. The strategy uses $SPY Coppock curve as a proxy to generate trade signals on other ETFs and stocks.

## Principles 

The strategy uses Coppock Curve as the technical indicator for generating trading signals. The Coppock Curve formula is:

Coppock Curve = 10-period WMA (14-period ROC + 11-period ROC)

Where ROC rate of change is calculated as: (Current Close - Close N periods ago) / Close N periods ago

The strategy calculates the Coppock Curve based on the closing price of $SPY. Buy signals are generated when the curve crosses above zero and sell signals when it crosses below.

## Advantages

- Uses unique Coppock Curve indicator which has better predictive power than common indicators like moving averages
- Configurable parameters for optimization like WMA period, ROC period etc. 
- Uses $SPY as signal source which has strong market representativeness
- Optional trailing stop loss to lock in profits and reduce drawdowns

## Risks

- Coppock Curve is not a widely used indicator, its efficacy needs validation
- Signal lag may exist, parameters need to be optimized
- Overly wide stop loss may miss pullback opportunities  
- Reliance on single indicator can produce false signals

## Optimization Directions

- Test optimal parameter combinations across different markets and stocks
- Combine with other indicators to filter out false signals e.g. volume
- Dynamic optimization of stop loss percentage
- Consider other entry signals like number of bars or price breakthroughs

## Conclusion

The strategy utilizes the unique curve shape characteristics of the Coppock Curve to generate trade signals. Compared to common indicators, the Coppock Curve has stronger predictive power. But as a standalone indicator, its reliability needs validation. It's recommended to combine it with other factors to filter false signals. Through parameter optimization, stop loss optimization and combining with other indicators, this strategy can become an effective quantitative trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Trail Long Loss (%)|
|v_input_2|SPY|security|
|v_input_3|10|WMA Length|
|v_input_4|14|Long RoC Length|
|v_input_5|11|Short RoC Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-13 00:00:00
end: 2023-11-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RolandoSantos

//@version=4
strategy(title = "Coppock Curve", shorttitle = "Copp Curve Strat", default_qty_type=strategy.cash, default_qty_value=10000, initial_capital=10000)

///trail stop
longTrailPerc = input(title="Trail Long Loss (%)", minval=0.0, step=0.1, defval=100) * 0.01

// Determine trail stop loss prices
longStopPrice = 0.0

longStopPrice := if (strategy.position_size > 0)
    stopValue = close * (1 - longTrailPerc)
    max(stopValue, longStopPrice[1])
else
    0
//Use SPY for Copp Curve entries and exits//
security = input("SPY")
ticker = security(security, "D", close)

///Copp Curve////
wmaLength = input(title="WMA Length", type=input.integer, defval=10)
longRoCLength = input(title="Long RoC Length", type=input.integer, defval=14)
shortRoCLength = input(title="Short RoC Length", type=input.integer, defval=11)
source = ticker
curve = wma(roc(source, longRoCLength) + roc(source, shortRoCLength), wmaLength)

///Lower Band Plot///
band1 = hline(0)
band0 = hline(100)
band2 = hline(-100)
fill(band1, band0, color=color.green, transp=90)
fill(band2, band1, color=color.red, transp=90)
plot(curve, color=color.white)

///Trade Conditions///
Bull = curve > 0
Bear = curve < 0

///Entries and Exits//
if (Bull)
    strategy.entry("Long", strategy.long, comment = "LE")
    

if (Bear)
    strategy.close("Long", qty_percent=100, comment="close")
    
// Submit exit orders for trail stop loss price
if (strategy.position_size > 0)
    strategy.exit(id="Long Trail Stop", stop=longStopPrice)
    

```

> Detail

https://www.fmz.com/strategy/431926

> Last Modified

2023-11-13 11:44:55
