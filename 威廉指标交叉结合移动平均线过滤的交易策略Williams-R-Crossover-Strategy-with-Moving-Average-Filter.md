
> Name

威廉指标交叉结合移动平均线过滤的交易策略Williams-R-Crossover-Strategy-with-Moving-Average-Filter

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略运用威廉指标交叉信号并配合移动平均线进行过滤,实现了一个较为灵活的短线交易策略。该策略可以捕捉较为明确的超买超卖情况,而移动平均线过滤可以避免受到市场震荡的影响,从而具有较高的稳定性。

## 策略原理

1. 计算威廉指标(%R),以及200周期简单移动平均线。

2. 威廉指标向上突破-50线达到设定阈值时,并且收盘价高于移动平均线时,做多。

3. 威廉指标向下跌破-50线达到设定阈值时,并且收盘价低于移动平均线时,做空。 

4. 做多后,如果收盘价达到止盈位(入场价加止盈点数)或止损位(入场价减止损点数)时平仓。

5. 做空后,如果收盘价达到止盈位(入场价减止盈点数)或止损位(入场价加止损点数)时平仓。

该策略充分利用了威廉指标的超买超卖特征,结合移动平均线的趋势判断,使交易信号更加清晰可靠。止盈止损策略也比较清晰简洁,整体来说是一个较完备的短线策略系统。

## 策略优势分析

1. 威廉指标能有效识别超买超卖情况,信号较为清晰。

2. 移动平均线过滤增加了对趋势的判断,避免受震荡影响。

3. 指标参数和过滤器可自定义,可以灵活调整。

4. 采用趋势追踪止损方式,可以锁定大部分利润。 

5. 策略信号规则简单清晰,容易理解实现,适合用于短线交易。

6. 可适用于多种品种,灵活通用。

## 风险分析

1. 威廉指标存在滞后性,可能错过部分机会。

2. 移动平均线作为过滤器也存在滞后问题。

3. 严格的超买超卖判断可能错过部分趋势机会。

4. 止损过小可能被价格震荡止损。

5. 止损过大又可能限制利润。

6. 需要调整参数以适应不同市场环境。

## 策略优化方向 

1. 优化指标参数,提高策略胜率。

2. 添加其他指标进行过滤,如MACD、KDJ等。

3. 尝试不同类型的移动平均线,如指数移动平均线。

4. 增加趋势判断,只在趋势方向交易。

5. 优化止盈止损策略,如动态止损、缩量止损等。

6. 尝试增加仓位管理,如固定仓位、马丁格尔等。

7. 利用机器学习寻找更佳参数组合。

## 总结

本策略整合了威廉指标的超买超卖判断和移动平均线的趋势过滤,形成一个简单实用的短线策略。它有着清晰的交易信号和止盈止损规则。通过参数优化、指标优化、止损管理等方面的改进,可以使策略更加稳定切合实际。该策略易于实施与扩展,非常适合短线交易者使用。

|| 

## Overview

This strategy utilizes the Williams %R crossover signals and adds a moving average filter to create a flexible short-term trading system. It can capture overbought and oversold situations clearly, while the MA filter avoids market noise for higher stability.

## Strategy Logic

1. Calculate Williams %R and 200-period simple moving average (MA).

2. Go long when %R crosses above -50 level by a threshold and close is above MA. 

3. Go short when %R crosses below -50 level by a threshold and close is below MA.

4. If long, close position when close reaches take profit (entry price + take profit pips) or stop loss level (entry price - stop loss pips).

5. If short, close position when close reaches take profit (entry price - take profit pips) or stop loss level (entry price + stop loss pips).

The strategy capitalizes on the overbought/oversold nature of Williams %R, and combines MA trend filter for more reliable signals. The stop loss/take profit logic is simple and clear. Overall it is a complete short-term system.

## Advantage Analysis

1. Williams %R effectively identifies overbought/oversold levels with clear signals.

2. MA filter adds trend bias to avoid whipsaws.

3. Customizable parameters for flexibility.

4. Trailing stop loss locks in most profits.

5. Simple clear logic, easy to understand and implement. Good for short-term trading.

6. Applicable to multiple products with flexibility.

## Risk Analysis 

1. Williams %R has lagging effect, may miss some opportunities.

2. MA filter also has some lag.

3. Strict overbought/oversold rules may miss some trends. 

4. Stop loss too tight may be stopped out by whipsaws.

5. Stop loss too wide may limit profits.

6. Parameters need tuning for different market environments.

## Optimization Directions

1. Optimize parameters for higher win rate.

2. Add other filters like MACD, KDJ etc.

3. Try different MA types like exponential MA. 

4. Add trend bias, only trade in trend direction.

5. Optimize stop loss strategies like dynamic stops, chandelier exits etc.

6. Try position sizing like fixed fractional, Martingale etc.

7. Utilize machine learning for better parameter optimization.

## Conclusion

This strategy combines Williams %R overbought/oversold signals with MA trend filter into a simple short-term system. It has clear entry signals and stop loss/take profit logic. Further improvements can be made through parameter tuning, indicator selection, stop loss management etc for more robustness. Easy to implement and expand on, this strategy is well suited for short-term traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Williams %R Length|
|v_input_2|10|Cross Threshold (Pips)|
|v_input_3|30|Take Profit (Pips)|
|v_input_4|20|Stop Loss (Pips)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Williams %R Cross Strategy with MA Filter", overlay=true)

// User Inputs
wrLength = input(14, title="Williams %R Length")
crossPips = input(10, title="Cross Threshold (Pips)")
takeProfitPips = input(30, title="Take Profit (Pips)")
stopLossPips = input(20, title="Stop Loss (Pips)")

// Calculate Williams %R
wrHigh = ta.highest(high, wrLength)
wrLow = ta.lowest(low, wrLength)
wr = (wrHigh - close) / (wrHigh - wrLow) * -100

// Calculate 200-period Simple Moving Average
ma200 = ta.sma(close, 200)

// Entry Conditions
enterLong = ta.crossover(wr, -50 - crossPips) and close > ma200
enterShort = ta.crossunder(wr, -50 + crossPips) and close < ma200

// Exit Conditions
exitLong = close >= (strategy.position_avg_price + (takeProfitPips / syminfo.mintick)) or close <= (strategy.position_avg_price - (stopLossPips / syminfo.mintick))
exitShort = close <= (strategy.position_avg_price - (takeProfitPips / syminfo.mintick)) or close >= (strategy.position_avg_price + (stopLossPips / syminfo.mintick))

// Order Management
if enterLong
    strategy.entry("Long", strategy.long)
    
if enterShort
    strategy.entry("Short", strategy.short)

if exitLong
    strategy.close("Long")

if exitShort
    strategy.close("Short")

```

> Detail

https://www.fmz.com/strategy/427310

> Last Modified

2023-09-19 21:57:46
