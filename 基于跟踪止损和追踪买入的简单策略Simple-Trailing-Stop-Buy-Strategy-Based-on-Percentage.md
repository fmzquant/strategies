
> Name

基于跟踪止损和追踪买入的简单策略Simple-Trailing-Stop-Buy-Strategy-Based-on-Percentage

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12868ce7bcb9d7da998.png)
 [trans]
## 概述

该策略实现了一个基于百分比的简单跟踪止损与跟踪买入组合。通过在不同的时间框架和不同的图表上试验不同的百分比组合,可以实现对策略参数的优化。

## 策略原理

该策略主要通过两个指标实现跟踪止损和跟踪买入:

1. 跟踪止损线(Trailing Stop Line,TSL):根据用户设定的止损偏移百分比,并基于最近N根K线的收盘价的移动平均计算得出。当价格低于该线时,平仓止损。
2. 跟踪买入线(Trailing Buy Line,TBL):根据用户设定的买入偏移百分比,并基于最近N根K线的最高价的移动平均计算得出。当价格高于该线时,建立多头仓位。

通过比较价格与这两个指标的关系,实现止损和追买的规则。

## 策略优势

该策略具有以下优势:

1. 简单直观,容易理解和实施;
2. 可以通过调整参数实现止损和追买的弹性;
3. 可以适用于不同市场和不同时间周期;
4. 可以实现趋势跟踪,及时止损。

## 策略风险

该策略也存在以下风险:

1. 参数设置不当可能导致过于激进的止损或追买;
2. 在震荡市场中可能导致频繁交易和滑点损失;
3. 需要适当优化参数以适应不同市场的特点。

## 策略优化方向

该策略可以从以下几个方面进行优化:

1. 利用自适应算法自动优化止损仓位 和 买入参数;
2. 增加仓位数量和风险管理模块;
3. 结合其他指标判断大趋势,避免在震荡行情中被套。

## 总结

该策略整体来说是一个非常简单直观的趋势跟踪策略。通过参数调整可以适用于不同市场,而结合自适应算法和其他指标可以进一步增强策略的稳定性和实用性。总的来说,该策略为量化交易提供了一个简单但有效的基础策略框架。

||

## Overview

This strategy implements a simple percentage-based trailing stop and trailing buy. By experimenting with different percentage combinations across timeframes and charts, the strategy parameters can be optimized.  

## Strategy Logic

The strategy mainly uses two metrics to achieve trailing stop loss and trailing buy:

1. Trailing Stop Line (TSL): Calculated based on recent N bars of closing prices and stop loss offset percentage set by user. Triggers stop loss when price falls below this line.

2. Trailing Buy Line (TBL): Calculated based on recent N bars of highest prices and buy offset percentage set by user. Triggers buy when price rises above this line.


By comparing price with these two metrics, the stop loss and trailing buy rules are implemented.

## Advantages

The advantages of this strategy are:

1. Simple and intuitive, easy to understand and implement.

2. Flexible stop loss and trailing buy through parameter adjustment.

3. Applicable across markets and timeframes. 

4. Allows trend following and timely stop loss.

## Risks

The risks of this strategy include:

1. Improper parameter setting may cause over-aggressive stop loss or buys.

2. Frequent trading and slippage in ranging markets.

3. Requires parameter optimization for different market characteristics.

## Enhancement Opportunities 

The strategy can be enhanced through:

1. Adaptive algorithms to auto optimize stop and buy parameters.

2. Addition of position sizing and risk management modules. 

3. Incorporation of other indicators to gauge overall trend to avoid whipsaws.


## Conclusion

In summary, this is a very simple and intuitive trend following strategy. With parameter tuning it can be adapted across markets. Further incorporation of adaptive algorithms and additional filters can improve robustness. Overall it provides a basic yet effective framework for quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1.5|Stop Offset %|
|v_input_2|1.9|Trailing Buy Offset %|
|v_input_3|6|Use last x bars for calculation|
|v_input_4_close|0|Source Trailing Stop calculation: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5_close|0|Source Trailing Buy calculation: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6_low|0|Source Stop Trigger: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7_high|0|Source Buy Trigger: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-12 00:00:00
end: 2024-01-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//Developed from ©Finnbo code
strategy("Simple Trailing Buy & Stop Strategy", overlay=true)
offset = input(defval=1.5, title="Stop Offset %", type=float, minval=0.1, maxval=100, step=0.1)
buyoffset = input(defval=1.9, title="Trailing Buy Offset %", type=float, minval=0.1, maxval=100, step=0.1)

sumbars = input(defval=6, title="Use last x bars for calculation",  minval=1)
srcts = input(title="Source Trailing Stop calculation",  defval=close)
srctb = input(title="Source Trailing Buy calculation",  defval=close)
srctrigger = input(title="Source Stop Trigger",  defval=low)
srctriggerbuy = input(title="Source Buy Trigger",  defval=high)
tsl = rma(srcts, sumbars)*(1-(offset/100))// = (sum(srcts,sumbars)/sumbars)*(1-(offset/100))
tbuy = rma(srctb, sumbars)*(1+(buyoffset/100))
plot(tsl, color=(srctrigger<tsl)?red:green)
plot(tbuy, color=(srctriggerbuy>tbuy)?red:green)
//plotshape(crossunder(srctrigger,tsl), text="Long Stop", style=shape.circle, color=red)
alertcondition(crossunder(srctrigger,tsl), "Long Stop alert", "SELL")
//plotshape(crossover(srctriggerbuy,tbuy), text="Long", style=shape.circle, color=green)
alertcondition(crossover(srctriggerbuy,tbuy), "Long alert", "BUY")

longCondition =  crossover(srctriggerbuy,tbuy)
if (longCondition)
    strategy.entry("Long", strategy.long)
closeCondition = crossunder(srctrigger,tsl)
if (closeCondition)
    strategy.close("Long")

```

> Detail

https://www.fmz.com/strategy/439349

> Last Modified

2024-01-19 14:30:59
