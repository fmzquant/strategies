
> Name

基于随机力矩指标的量化交易策略Quantitative-Trading-Strategy-Based-on-Stochastics-Momentum-Index

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/117742b297a064c4a7b.png)

## Strategy Overview

This article introduces a quantitative trading strategy based on the Stochastics Momentum Index (SMI). The strategy utilizes the crossover signals between the SMI indicator and its exponential moving average (EMA) to identify potential buying and selling opportunities. When the SMI signal line crosses above its EMA, it triggers a buy signal; when the SMI signal line crosses below its EMA, it triggers a sell signal.

## Strategy Principle

The core of this strategy is the Stochastics Momentum Index (SMI). SMI is a momentum oscillator that measures the closing price relative to the high-low range over a specified period. Specifically, the strategy first calculates the highest high and lowest low over the specified period, then computes the difference between the closing price and the midpoint of the high-low range, as well as the difference between the highest high and lowest low. Next, the strategy calculates the SMI value, which is the ratio of the average relative difference to the average absolute difference multiplied by 100. Finally, the strategy calculates the exponential moving average of SMI as the signal line.

When the SMI signal line crosses above its EMA, it indicates increasing upward momentum and triggers a buy signal; when the SMI signal line crosses below its EMA, it indicates increasing downward momentum and triggers a sell signal. Additionally, the strategy marks the overbought and oversold levels to identify extreme states of SMI.

## Strategy Advantages

1. The strategy is based on the powerful momentum indicator SMI, which can effectively capture changes in market trends and momentum.

2. The strategy logic is clear and easy to understand and implement.

3. By using the exponential moving average as the signal line, the strategy can smooth price noise and improve signal reliability.

4. The marking of overbought and oversold levels provides additional risk management tools for the strategy.

## Strategy Risks

1. The strategy relies on a single indicator, SMI, and may face the risk of indicator failure. To mitigate this risk, one can consider combining other technical indicators or fundamental factors to confirm trading signals.

2. The strategy may generate frequent trading signals in choppy markets, leading to high transaction costs. To address this issue, one can reduce trading frequency by optimizing parameters or introducing filtering mechanisms.

3. The strategy lacks an explicit stop-loss mechanism and may face the problem of excessive single-trade risk. This can be addressed by setting appropriate stop-loss levels to control risk.

## Strategy Optimization Directions

1. Parameter Optimization: The performance of the strategy largely depends on the parameters used in the SMI calculation, such as %K length, %D length, etc. By optimizing these parameters, the performance of the strategy can be improved.

2. Signal Filtering: To reduce trading frequency and improve signal quality, additional filtering mechanisms such as trend confirmation and volume confirmation can be considered.

3. Risk Management: Incorporating explicit stop-loss and position management rules into the strategy can better control risk and enhance the robustness of the strategy.

4. Multi-Factor Combination: Combining SMI signals with other technical indicators or fundamental factors to form a more comprehensive and reliable trading decision mechanism.

## Summary

This article introduces a quantitative trading strategy based on the Stochastics Momentum Index (SMI). The strategy utilizes the crossover signals between the SMI indicator and its exponential moving average to identify potential buying and selling opportunities. The advantages of the strategy lie in its basis on a powerful momentum indicator, clear logic, ease of implementation, and the use of moving averages and overbought/oversold levels to improve signal reliability and risk management. However, the strategy also faces risks such as single indicator failure, high-frequency trading, and insufficient risk control. To further enhance the performance of the strategy, optimization can be made in terms of parameter optimization, signal filtering, risk management, and multi-factor combination. Overall, the strategy provides a simple yet effective approach for quantitative trading, but it requires appropriate adjustments and optimizations based on specific circumstances in practical applications.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|Percent K Length|
|v_input_int_2|3|Percent D Length|
|v_input_int_3|40|Overbought|
|v_input_int_4|-40|Oversold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-05 00:00:00
end: 2024-03-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Stochastics Momentum Index Strategy", shorttitle="SMI_BackTest", overlay=false)

// Input parameters
a = input.int(10, "Percent K Length")
b = input.int(3, "Percent D Length")
ob = input.int(40, "Overbought")
os = input.int(-40, "Oversold")

// Range Calculation
ll = ta.lowest(low, a)
hh = ta.highest(high, a)
diff = hh - ll
rdiff = close - (hh+ll)/2

avgrel = ta.ema(ta.ema(rdiff,b),b)
avgdiff = ta.ema(ta.ema(diff,b),b)

// SMI calculations
SMI = avgdiff != 0 ? (avgrel/(avgdiff/2)*100) : 0
SMIsignal = ta.ema(SMI,b)
emasignal = ta.ema(SMI, 10)

// Color Definition for Stochastic Line
col = SMI >= ob ? color.green : SMI <= os ? color.red : color.white

plot(SMIsignal, title="Stochastic", color=color.white)

plot(emasignal, title="EMA", color=color.yellow)

level_40 = ob
level_40smi = SMIsignal > level_40 ? SMIsignal : level_40

level_m40 = os
level_m40smi = SMIsignal < level_m40 ? SMIsignal : level_m40

plot(level_40, "Level ob", color=color.red)
plot(level_40smi, "Level ob SMI", color=color.red, style=plot.style_line)

plot(level_m40, "Level os", color=color.green)
plot(level_m40smi, "Level os SMI", color=color.green, style=plot.style_line)

//fill(level_40, level_40smi, color=color.red, transp=ob, title="OverSold")
//fill(level_m40, level_m40smi, color=color.green, transp=ob, title="OverBought")

// Strategy Tester
longCondition = ta.crossover(SMIsignal, emasignal)
if (longCondition)
    strategy.entry("Buy", strategy.long)

shortCondition = ta.crossunder(SMIsignal, emasignal)
if (shortCondition)
    strategy.entry("Sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/444334

> Last Modified

2024-03-11 10:46:10
