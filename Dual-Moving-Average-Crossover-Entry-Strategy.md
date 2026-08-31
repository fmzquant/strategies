
> Name

Dual-Moving-Average-Crossover-Entry-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1815bf480bdcc2b8bfe.png)


#### Overview
This is a dual moving average crossover entry strategy based on the 5-day moving average (MA5). The main idea of this strategy is to enter positions at a certain distance above or below the MA5, and close positions when the closing price is higher than the entry price or returns to the entry price. This strategy aims to capture short-term trends while controlling risks.

#### Strategy Principle
This strategy uses the 5-day simple moving average (SMA) as the main indicator. When the opening price of a new candle is above the MA5, it executes buy scenario 1; when the opening price of a new candle is below the MA5 and the distance from the MA5 exceeds 0.002 points, it executes buy scenario 2. For sell conditions, when the closing price is higher than or equal to the average entry price, it executes sell scenario 1; when the closing price is lower than 0.1% of the average entry price, it executes sell scenario 2.

#### Advantage Analysis
1. This strategy is based on short-term trends and can quickly capture market changes.
2. By setting a threshold for the distance from the MA5, some noise signals can be filtered out.
3. By setting stop-loss conditions, risks can be effectively controlled.
4. The strategy logic is clear and easy to understand and implement.

#### Risk Analysis
1. This strategy relies on a single indicator and may face the risk of indicator failure.
2. Short-term trend strategies may face frequent trading and increase the risk of transaction costs.
3. Fixed stop-loss percentages may not be able to adapt to different market environments.

#### Optimization Direction
1. Other indicators such as RSI and MACD can be considered to improve the reliability of signals.
2. Stop-loss and take-profit conditions can be optimized, such as using trailing stops or dynamic stop-loss percentages.
3. For different market environments, different parameters can be set to improve the adaptability of the strategy.

#### Summary
This dual moving average crossover entry strategy is a simple strategy based on short-term trends. By crossing above and below the MA5, and setting distance thresholds, short-term trend opportunities can be captured. At the same time, fixed percentage stop-losses can control risks. However, this strategy also has some limitations, such as relying on a single indicator and frequent trading. In the future, more indicators can be introduced, and stop-loss and take-profit conditions can be optimized to improve the robustness and adaptability of the strategy.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-04-24 00:00:00
end: 2024-04-29 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("YBS Strategy 1.1", overlay=true)

// Moving Average Settings
ma5 = ta.sma(close, 5)

// Scenario 1: Buy when a new candle opens above the MA5
buy_condition_scenario1 = open > ma5

// Scenario 2: Buy when a new candle opens below the MA5 and is at a significant distance from the MA5
distance_from_ma5 = open - ma5
buy_condition_scenario2 = open < ma5 and distance_from_ma5 > 0.002 // Define distance in points here

// Sell: Sell at the close of the candle if it's positive above the entry price, or if the price returns to the entry price
sell_condition_scenario1 = close > strategy.position_avg_price or close == strategy.position_avg_price
sell_condition_scenario2 = close <= strategy.position_avg_price * 0.999 // Close if price drops more than 0.1% from entry price

// Execute buy and sell orders
if (buy_condition_scenario1 and not (strategy.opentrades > 0))
    strategy.entry("Buy Scenario 1", strategy.long)

if (buy_condition_scenario2 and not (strategy.opentrades > 0))
    strategy.entry("Buy Scenario 2", strategy.long)

if (sell_condition_scenario1)
    strategy.close("Buy Scenario 1")

if (sell_condition_scenario2)
    strategy.close("Buy Scenario 2")


```

> Detail

https://www.fmz.com/strategy/449970

> Last Modified

2024-04-30 17:37:53
