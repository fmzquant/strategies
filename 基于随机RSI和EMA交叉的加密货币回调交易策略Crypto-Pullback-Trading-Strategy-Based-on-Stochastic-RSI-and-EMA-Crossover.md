
> Name

基于随机RSI和EMA交叉的加密货币回调交易策略Crypto-Pullback-Trading-Strategy-Based-on-Stochastic-RSI-and-EMA-Crossover

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1201d9083eaf39ff3db.png)

## Strategy Overview

This strategy combines Stochastic RSI and EMA to detect trends and verify trading signals. When the price retraces above EMA20 to between EMA9 and EMA14, and the Stochastic RSI is below the oversold level, a long signal is generated; when the price retraces below EMA20 to between EMA9 and EMA14, and the Stochastic RSI is above the overbought level, a short signal is generated.

## Strategy Principles

1. Use the ta.ema function to calculate 3 EMAs with different periods, namely EMA9, EMA14, and EMA20, to determine the trend state of the price.
2. Use the ta.rsi function to calculate the RSI indicator, then use the ta.stoch function to convert the RSI to the Stochastic RSI indicator to determine whether the price is overbought or oversold.
3. When the closing price > EMA20 and the closing price < EMA9 and EMA14, and the Stochastic RSI < oversold level, a long signal is triggered and a buy operation is executed.  
4. When the closing price < EMA20 and the closing price > EMA9 and EMA14, and the Stochastic RSI > overbought level, a short signal is triggered and a sell operation is executed.

The core idea of this strategy is to use the Stochastic RSI to determine whether the price retracement in the main trend (represented by EMA20) has reached an appropriate overbought or oversold area, while using the fast EMA and medium EMA to verify the strength of the retracement. If the price breaks through the fast EMA and medium EMA, the retracement may end and the trend may reverse, which is not suitable for entering a position. Only when the price retraces between EMA9 and EMA14 is it considered to enter a position in the direction of the trend. This multi-condition verification method can effectively improve signal quality and reduce misjudgments.

## Strategy Advantages

1. Combines trend indicators (EMA) and oscillator indicators (RSI) to better grasp trend and overbought/oversold timing.
2. Adopts Stochastic RSI, which has two advantages compared to the original RSI indicator: one is increased smoothness of the indicator, and the other is avoiding the indicator sticking to extreme values for a long time.
3. Multi-condition verification can effectively filter out many false signals and improve the reliability of signals.
4. The code logic is clear and simple, easy to understand and modify, and can be used as a template for beginners to learn.

## Strategy Risks

1. Not suitable for sideways markets, because the EMAs frequently cross over, which may produce many false signals.
2. If the trend is very strong and the price rises or falls unilaterally, this strategy will miss many opportunities because the retracement is very shallow.
3. The selection of EMA parameters has a great impact on the strategy and needs to be adjusted separately for different varieties and periods.
4. The Stochastic RSI parameters also need to be adjusted according to the actual situation, and the current default values may not work well on some varieties.

## Optimization Directions

1. Consider introducing the ATR indicator to dynamically adjust the overbought and oversold levels to adapt to different volatility levels.
2. Add more EMAs with different periods to more accurately describe the position of price retracements.
3. Stop loss and take profit must also be considered, using percentage stop loss or ATR stop loss, and trailing stop loss to protect profits.
4. Candlestick patterns such as pin bars and engulfing patterns can be used to assist in judging trend reversals as supplementary conditions to improve accuracy.

## Summary

This strategy uses Stochastic RSI combined with EMA multi-condition verification to effectively control risk while grasping trend retracements. The overall idea is simple and easy to understand, suitable for beginners to learn and use. However, the strategy itself also has some limitations, such as poor performance in sideways markets, insufficient grasp of trend movements, etc., which need to be flexibly adjusted according to the actual situation. In the future, consideration can also be given to optimizing and improving the strategy from aspects such as dynamic parameters, more indicator verification, and money management to obtain more robust returns. In general, this strategy can serve as a basic template that can be modified and expanded upon, and is a good starting point and learning material.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Length|
|v_input_2|3|Stoch %K|
|v_input_3|3|Stoch %D|
|v_input_4|14|Stochastic RSI Length|
|v_input_5|25|Oversold Level|
|v_input_6|85|Overbought Level|
|v_input_7|9|Fast EMA Length|
|v_input_8|14|Medium EMA Length|
|v_input_9|20|Slow EMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-02 00:00:00
end: 2024-03-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Crypto-EMA_Pullback=-", overlay=true,initial_capital = 10000000,default_qty_type=strategy.percent_of_equity, default_qty_value=10.0, pyramiding = 10)

// Inputs
lengthRsi = input(14, title="RSI Length")
k = input(3, title="Stoch %K")
d = input(3, title="Stoch %D")
lengthStoch = input(14, title="Stochastic RSI Length")
overSold = input(25, title="Oversold Level")
overBought = input(85, title="Overbought Level")
emaFastLength = input(9, title="Fast EMA Length")
emaMediumLength = input(14, title="Medium EMA Length")
emaSlowLength = input(20, title="Slow EMA Length")

// Calculating EMAs
emaFast = ta.ema(close, emaFastLength)
emaMedium = ta.ema(close, emaMediumLength)
emaSlow = ta.ema(close, emaSlowLength)

// Calculating the RSI and Stoch RSI
rsi = ta.rsi(close, lengthRsi)
stochRsiK = ta.sma(ta.stoch(rsi, rsi, rsi, lengthStoch), k)
stochRsiD = ta.sma(stochRsiK, d)

// Entry Conditions
bullishCondition = close > emaSlow and close < emaFast and close < emaMedium and stochRsiK < overSold
bearishCondition = close < emaSlow and close > emaFast and close > emaMedium and stochRsiK > overBought

// Strategy Execution
if (bullishCondition)
    strategy.entry("Long", strategy.long)

if (bearishCondition)
    strategy.entry("Short", strategy.short)

// Plotting
plot(emaFast, color=color.blue, title="Fast EMA")
plot(emaMedium, color=color.orange, title="Medium EMA")
plot(emaSlow, color=color.red, title="Slow EMA")
hline(overSold, "Oversold", color=color.green)
hline(overBought, "Overbought", color=color.red)

```

> Detail

https://www.fmz.com/strategy/444024

> Last Modified

2024-03-08 16:44:51
