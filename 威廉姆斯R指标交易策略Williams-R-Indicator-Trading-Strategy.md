
> Name

威廉姆斯R指标交易策略Williams-R-Indicator-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

威廉姆斯%R指标交易策略基于威廉姆斯%R指标来产生交易信号。该指标通过比较当前收盘价与一定周期内的最高价和最低价的幅度来衡量市场动量。

当威廉姆斯%R指标线突破超买线时,产生卖出信号;当指标线突破超卖区域时,产生买入信号。策略的具体交易逻辑是:

1. 计算一定周期(如14日)的威廉姆斯%R值

2. 设置超买线(如-20)和超卖区域(如-80)

3. 当指标线由下向上突破超卖区域时,做多

4. 当指标线由上向下突破超买线时,平仓

这样,策略可以在价格可能反转的点位开仓做多做空,捕捉短线机会。

## 策略优势

- 参数设置简单,规则清晰

- 能较早判断超买超卖现象

- 突破交易系统化,不受个人情绪影响

## 策略风险

- 威廉姆斯%R滞后,可能漏失机会

- 需要反复测试优化参数

- 超买超卖仅具有一定参考价值

## 总结

威廉姆斯%R指标策略通过判断超买超卖区域来捕捉反转机会。配置合理的仓位管理和止损策略,可以控制风险。但交易者需注意指标滞后问题,需辅助其他技术工具来进行验证,谨慎运用该策略。


||

## Strategy Logic

The Williams %R trading strategy generates signals based on the Williams Percent Range indicator, which measures market momentum by comparing the current close to the high-low range over a period. 

The strategy goes long when the %R line crosses above oversold, and sells when the line crosses below overbought. The logic is:

1. Calculate Williams %R over a timeframe (e.g. 14 periods)

2. Set overbought (e.g. -20) and oversold (e.g. -80) levels

3. Go long when the %R line crosses up through oversold 

4. Close longs when the %R line crosses down through overbought

This allows entries around potential reversal points to capitalize on short-term moves.

## Advantages

- Simple parameters and rules

- Early identification of overbought/oversold  

- Systematic breakout trading

## Risks

- Lagging %R may miss opportunities 

- Requires optimization of inputs

- Oversold/bought levels are rough guides

## Summary

The Williams %R strategy aims to capture reversals by trading overbought/oversold regions. With proper position sizing and stops, risk can be controlled. But lag is a key limitation requiring additional tools for validation and caution in use.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|-20|Overbought Level|
|v_input_3|-80|Oversold Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-13 00:00:00
period: 12h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © Julien_Eche

//@version=5
strategy("Williams %R Strategy", overlay=true, initial_capital=100000, shorttitle="W%R Strategy")

// Paramètres
length = input(14, "Length")
overboughtLevel = input(-20, "Overbought Level")
oversoldLevel = input(-80, "Oversold Level")

// Calcul du Williams %R
williamsR = -100 * (ta.highest(high, length) - close) / (ta.highest(high, length) - ta.lowest(low, length))

// Conditions d'achat et de vente
buySignal = ta.crossover(williamsR, oversoldLevel)
sellSignal = ta.crossunder(williamsR, overboughtLevel)

// Entrée en position longue
if buySignal
    strategy.entry("Buy", strategy.long)

// Sortie de la position longue
if sellSignal
    strategy.close("Buy")

```

> Detail

https://www.fmz.com/strategy/426783

> Last Modified

2023-09-14 15:38:51
