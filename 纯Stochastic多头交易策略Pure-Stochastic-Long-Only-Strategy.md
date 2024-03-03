
> Name

纯Stochastic多头交易策略Pure-Stochastic-Long-Only-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略仅基于Stochastic指标给出entry和exit的信号,属于典型的只做多不做空的Stochastic指标策略。它在超卖区K线上穿D线且收盘价超过前一日最高价时做多入场,在止盈或止损条件触发时平仓,简单易行。

## 策略原理

该策略的主要逻辑是:

1. 计算Stochastic的K值和D值
2. 当K线在超卖区上穿D线且收盘价突破前一日最高价时,做多入场
3. 设置移动止损为收盘价下穿快速EMA
4. K线下穿D线或K线进入超买区时,平仓止盈

Stochastic K值在超卖区突破D值代表价格可能反转上涨。结合收盘价突破前一日最高价,可以有效确认入场信号。

EMA追踪止损可以锁定利润。K线在超买区出现卖出信号时,也选择止盈前平仓。

该策略仅做多,适合股市等单边行情品种, operatio简单,易于实施。

## 优势分析

- 使用Stochastic指标识别超卖区域
- K线与D线组合可避免假信号
- 收盘价突破增加入场确定性 
- 止损止盈策略结合,风险可控
- 逻辑简单,易于实现的止盈策略

## 风险及应对

- Stochastic可能出现错误信号
- 存在一定的亏损风险
- 不能在趋势顶部止盈

应对措施:

1. 优化Stochastic参数,提高准确度
2. 采用移动止损加以控制风险
3. 结合其他指标预测趋势反转

## 策略优化方向

该策略可以从以下几个方面进行扩展:

1. 增加做空机会,使策略全市场适用
2. 根据波动率调整止损幅度
3. 采用机器学习优化参数
4. 整合移动止盈策略,动态追踪止盈点
5. 组合其他策略,建立多因子系统

## 总结

该策略是一个纯Stochastic多头策略,使用指标识别超卖区入场,止损止盈结合控制风险。该策略简单实用,适合股市等单边行情品种。通过扩展做空机会、参数优化等维度,可以将策略优化成一个更全面可靠的系统。

|| 

## Overview

This is a pure Stochastic strategy that uses the indicator for entry and exit signals, going long only. It enters long when K line crosses above D line in oversold zone with close above previous high, and exits on profit taking or stop loss triggers. Simple and easy to implement.

## Strategy Logic

The main logic is:  

1. Calculate Stochastic K and D values
2. Enter long when K crosses above D in oversold zone and close breaks previous high
3. Set moving stop loss below fast EMA on close 
4. Take profit when K crosses below D or K enters overbought zone

K crossing D in oversold suggests potential upside reversal. Close breaking high adds confidence. 

EMA stop locks in profits. K crossing D in overbought acts as profit take signal.

Going long only, it suits instruments like equities with one-sided trends. Simple to implement.

## Advantages

- Uses Stochastic to identify oversold regions
- K and D lines avoid false signals
- Close breakout adds confidence  
- Stop loss and take profit manages risks
- Simple logic makes it easy to implement 

## Risks and Mitigation

- Potential for Stochastic false signals
- Has some loss risks
- Unable to take profit at trend tops

Mitigations:

1. Optimize parameters for greater accuracy
2. Use moving stops to control loss risks
3. Add indicators to predict trend reversal

## Enhancement Opportunities

The strategy can be enhanced by:

1. Adding short side opportunities for full market coverage
2. Adaptive stops based on volatility
3. Machine learning for parameter optimization
4. Incorporate trailing take profit strategy  
5. Portfolio combinations to build multifactor system

## Conclusion

This is a pure Stochastic long strategy using the indicator for oversold entries and managed exits. Simple and practical, it fits instruments like equities well. Expanding to the short side, parameter optimization can make it a more robust system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|length|
|v_input_2|80|OverBought|
|v_input_3|20|OverSold|
|v_input_4|7|smoothK|
|v_input_5|4|smoothD|
|v_input_6|5|emaperiodf|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-12 14:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version= 4
// see for original idea:  http://www.enricomalverti.com/2016/12/stocastico/
// https://sauciusfinance.altervista.org
strategy(title="Pure Stochastic long only", overlay = false, max_bars_back=500)

// INPUTS & calculations
length = input(10, minval=1)
OverBought = input(80, minval = 50, step = 10)
OverSold = input(20, minval = 10, step = 5)
smoothK = input(7, minval=1)
smoothD = input(4, minval=1)
k = sma(stoch(close, high, low, length), smoothK)
d = sma(k, smoothD)
// We keep EMA 7 (n period of stochastic /2) as target price
emaperiodf = input(5, minval = 1)
emaf = ema(close,emaperiodf)
entryl = k > d and k <= OverSold and close >= high[1]
/// Entry
strategy.entry("Long", true, when = entryl)

middle = (OverBought+OverSold)/2
close1= crossunder(close,emaf)// **close under EMA fast**
close2= k < d and k > middle
close3 = (k >= OverBought)
// exits.
strategy.close("Long", when = close1, comment="stop Ema Fast")
strategy.close("Long", when = close2, comment ="cross k&d")
strategy.close("Long", when = close3, comment = "high value of K")


plot(k, color=#0000FF,  linewidth= 2, title="k Stoch")
plot(d, color=#787B86, linewidth= 1, title="d stoch signal")
plot(OverBought)
plot(OverSold)
```

> Detail

https://www.fmz.com/strategy/427302

> Last Modified

2023-09-19 21:22:11
