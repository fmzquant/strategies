
> Name

基于EMA200的移动止盈移动止损策略EMA-200-Based-Trailing-Take-Profit-and-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1115a7b31c4d33fef8f.png)
[trans]

## 概述

基于EMA200的移动止盈移动止损策略是一个以EMA200为基准,结合移动止损和移动止盈机制的交易策略。该策略通过EMA200判断整体趋势方向,只在趋势方向上做多或空,同时利用ATR指标计算出合理的止损位和止盈位,实现移动止损和移动止盈。

## 策略原理

该策略首先计算出200周期的EMA,作为判断整体趋势的指标。只有当价格高于EMA200时才做多,价格低于EMA200时才做空,从而保证只在趋势方向操作。

在入场后,策略利用ATR指标计算出合理的止损和止盈增量,分别添加到最新高点和最新低点,形成上轨和下轨。当价格超过上轨时,对多单止盈;当价格跌破下轨时,对空单止损。随着价格的运行,止损位和止盈位也会动态调整,从而实现移动止损和移动止盈的效果。

## 优势分析

该策略最大的优势在于,通过EMA200判断趋势,避免反向操作。同时,止损止盈位会跟随价格调整,及时止损止盈,有效控制风险。

另外,ATR止损止盈是对市场波动性的评估,能够设置合理的止损止盈位,不会过于疲软或激进。相比固定止损止盈更具有优势。

总的来说,该策略结合趋势和止损止盈,既追求利润最大化,也控制风险,是一个非常平衡的策略。

## 风险分析

该策略的主要风险在于,EMA200未必能完全准确判断趋势,价格有可能产生假突破。如果不慎在非趋势方向上入场,可能造成较大亏损。

另外,ATR止损止盈虽然有一定的科学依据和优势,但也可能出现超过正常波动范围的情况。此时就可能被秒出场,无法获利。

为减小这些风险,可考虑结合其他指标确认趋势和波动性,例如布林线、RSI等,避免错误信号。另外也可以适当宽松止损范围,但不能过于宽松。

## 策略优化

该策略可以从以下几个方面进行优化:

1. EMA周期可调整为100或150周期,寻找更稳定的趋势判断标准。

2. ATR参数可优化,找到更合理的市场波动性代表值。

3. 可加入布林线等其他指标辅助判断趋势和波动。

4. 停损止盈可调整为ATR的整数倍,如2倍或3倍ATR,让止损更加灵活。

5. 可添加重新入场机制,即止损后价格重新进入趋势再次入场。

通过测试不同参数,选择更优参数;加入其他指标判断;优化止损机制等方法,可以显著提高策略的稳定性和盈利能力。

## 总结

基于EMA200的移动止盈移动止损策略,通过EMA判断整体趋势,ATR计算合理的止损止盈来控制风险,是一种平衡的交易策略。该策略有判断趋势、移动止损止盈、风险控制的优势,但也存在一定的假突破风险。通过参数优化,加入其他指标判断,可以进一步提高策略效果。

||

## Overview

The EMA 200 based trailing take profit and trailing stop loss strategy is a trading strategy that uses EMA 200 as a benchmark, combined with trailing stop loss and trailing take profit mechanisms. The strategy judges the overall trend direction based on EMA 200, and only goes long or short in the trend direction, while using the ATR indicator to calculate reasonable stop loss and take profit levels to realize trailing stop loss and trailing take profit.

## Strategy Logic

The strategy first calculates the 200-period EMA as an indicator to judge the overall trend. It only goes long when the price is above EMA 200 and goes short only when the price is below EMA 200, thus ensuring to trade in the trend direction.  

After entering the market, the strategy uses the ATR indicator to calculate reasonable stop loss and take profit increments, which are added to the latest high and latest low to form the upper and lower rail. When the price exceeds the upper rail, take profit for long orders; when the price breaks the lower rail, stop loss for short orders. As the price moves, the stop loss and take profit levels will also adjust dynamically, thus realizing trailing stop loss and trailing take profit.

## Advantage Analysis

The biggest advantage of this strategy is avoiding trading against the trend by judging the trend with EMA 200. At the same time, the stop loss and take profit levels follow the price movement for timely stop loss and profit taking, effectively controlling risks.

In addition, the ATR stop loss and take profit is an assessment of market volatility and can set reasonable stop loss and take profit levels, instead of being too loose or too aggressive. It has advantages over fixed stop loss and take profit.  

In general, this strategy combines trend and stop loss/take profit, pursuing maximum profits while controlling risks, making it a very balanced strategy.

## Risk Analysis  

The main risk of this strategy is that the EMA 200 may not be able to accurately determine the trend completely, and there could be false breakouts. Entering the market against the trend direction by mistake may lead to huge losses.

Besides, although the ATR stop loss and take profit has some scientific basis and advantages, situations exceeding normal volatility range may still occur. In such cases, being stopped out too soon is possible, unable to make profits.

To mitigate these risks, consider combining other indicators to confirm the trend and volatility, such as Bollinger Bands, RSI, etc., to avoid wrong signals. Also, appropriately relax the stop loss range, but not too loose.

## Strategy Optimization

The strategy can be optimized in the following aspects:

1. The EMA period can be adjusted to 100 or 150 for a more stable trend judgment.  
2. The ATR parameters can be optimized to find a more reasonable representation of market volatility.
3. Add other indicators like Bollinger Bands to assist in judging trend and volatility. 
4. The stop loss and take profit can be adjusted to integral multiples of ATR, such as 2 times or 3 times ATR, for more flexible stops.
5. Add re-entry mechanism, i.e. re-enter the trend after the stop loss is triggered.

By testing different parameters, selecting better parameters, adding other indicators for judgment, optimizing the stop loss mechanism and more, the stability and profitability of the strategy can be greatly improved.


## Conclusion
The EMA 200 based trailing take profit and stop loss strategy judges the overall trend with EMA and uses ATR calculated reasonable stop loss/take profit to control risks. It is a balanced trading strategy with the advantage of determining trend, trailing stop loss/profit and risk control, but also has certain false breakout risks. Further improving the strategy effect can be achieved through parameter optimization, adding other indicators for judgment.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|7|ATR Length|
|v_input_float_1|1.5|ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-08 00:00:00
end: 2024-01-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ozgurhan

//@version=5
strategy("EMA 200 Based Trailing Take Profit", overlay=true, margin_long=100, margin_short=100, default_qty_value=1, initial_capital=100)

// EMA 200 tanımı
ema200 = ta.ema(close, 200)

// Orijinal long ve short koşulları
longConditionOriginal = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))
shortConditionOriginal = ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))

// EMA 200'ün üzerinde ve altında long ve short koşulları
longCondition = longConditionOriginal and close > ema200
shortCondition = shortConditionOriginal and close < ema200

if longCondition
    strategy.entry("Long", strategy.long, comment="Long", alert_message="Long")

if shortCondition
    strategy.entry("Short", strategy.short, comment="Short", alert_message="Short")

atr_length=input.int(7, title="ATR Length")
atr_multiplier = input.float(1.5, title="ATR Multiplier")
atr_multiplied = atr_multiplier * ta.atr(atr_length)
ttp_top_bracket = strategy.position_size > 0 ? high[1] + atr_multiplied : na
ttp_bottom_bracket = strategy.position_size < 0 ? low[1] - atr_multiplied : na

plot(ttp_top_bracket, title="TTP Top Bracket", color=color.lime, style=plot.style_linebr, offset=1)
plot(ttp_bottom_bracket, title="TTP Bottom Bracket", color=color.red, style=plot.style_linebr, offset=1)

strategy.exit("Close Long", from_entry="Long", limit=ttp_top_bracket, alert_message="Close Long")
strategy.exit("Close Short", from_entry="Short", limit=ttp_bottom_bracket, alert_message="Close Short")




```

> Detail

https://www.fmz.com/strategy/438046

> Last Modified

2024-01-08 15:50:52
