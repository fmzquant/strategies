
> Name

Bidirectional-Stop-Loss-Take-Profit-Strategy-Based-on-Stochastic-Crossover

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c6757e61afd439c729.png)

## Overview
This strategy utilizes the crossover signals of the Stochastic Oscillator to trigger buy and sell operations. When the %K line crosses above the %D line and the %K value is below 20, it opens a long position; when the %K line crosses below the %D line and the %K value is above 80, it opens a short position. Additionally, the strategy sets take profit and stop loss distances to manage positions and prevent the expansion of losses. Moreover, the strategy also sets logical conditions to close positions. When the Stochastic Oscillator shows a crossover signal opposite to the opening signal, it will close the corresponding long or short position even if the take profit or stop loss price has not been reached.

## Strategy Principle
1. Calculate the %K and %D values of the 14-period Stochastic Oscillator and smooth them using simple moving averages.
2. Determine if the %K line and %D line have crossed:
   - When the %K line crosses above the %D line and the %K value is below 20, it triggers a buy signal and opens a long position.
   - When the %K line crosses below the %D line and the %K value is above 80, it triggers a sell signal and opens a short position.
3. Set the take profit and stop loss distances (in Ticks) to manage open positions:
   - For long positions, set the take profit price TP ticks above the entry price and the stop loss price SL ticks below the entry price.
   - For short positions, set the take profit price TP ticks below the entry price and the stop loss price SL ticks above the entry price.
   - When the price reaches the take profit or stop loss price, close the corresponding position.
4. Set logical conditions for closing positions:
   - When the %K line crosses below the %D line and the %K value is less than or equal to 80, close all long positions.
   - When the %K line crosses above the %D line and the %K value is greater than or equal to 20, close all short positions.

## Advantage Analysis
1. This strategy uses the Stochastic Oscillator as the main trading signal indicator, which is widely used in quantitative trading and can effectively capture overbought and oversold market conditions.
2. The strategy sets both take profit/stop loss and logical conditions for closing positions, which can control risks to a certain extent and avoid the expansion of losses.
3. The strategy logic is clear, easy to understand and implement, suitable for beginners to learn and use.

## Risk Analysis
1. The Stochastic Oscillator may generate many false signals in a choppy market, leading to high trading frequency and increased transaction costs.
2. This strategy does not dynamically adjust positions, and fixed take profit and stop loss distances may not effectively control risks during severe market fluctuations.
3. The parameters in the strategy (such as the Stochastic Oscillator period, take profit and stop loss distances, etc.) are fixed and not optimized for different market conditions, which may affect the adaptability of the strategy.

## Optimization Direction
1. Consider introducing other technical indicators or market sentiment indicators to be used in conjunction with the Stochastic Oscillator to improve the reliability of trading signals and reduce false signals.
2. Optimize position management by dynamically adjusting take profit and stop loss distances based on market volatility conditions, or adopt more advanced money management methods such as the Kelly Criterion.
3. Use optimization methods such as genetic algorithms and grid search to optimize strategy parameters and find the optimal parameter combination that adapts to different market conditions.
4. Consider adding filtering conditions, such as trading time periods and volatility of trading instruments, to reduce trading under unfavorable market conditions.

## Summary
The bidirectional stop-loss take-profit strategy based on Stochastic crossover is a simple and easy-to-understand quantitative trading strategy. It triggers buy and sell operations through the crossover signals of the Stochastic Oscillator and sets take profit/stop loss and logical conditions for closing positions to manage risks. The advantage of this strategy is that the logic is clear and suitable for beginners to learn and use; however, it also has some risks, such as the Stochastic Oscillator may generate many false signals in a choppy market, and fixed position management methods may not adapt to different market conditions. To further improve the performance of the strategy, we can consider introducing other indicators, optimizing position management, parameter optimization, and adding filtering conditions. In general, this strategy can serve as a basic quantitative trading strategy template, and through continuous optimization and improvement, it is expected to achieve good results in actual trading.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|600|StopLoss Distance from entry price (in Ticks)|
|v_input_int_2|1200|TakeProfit Distance from entry price (in Ticks)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-29 00:00:00
end: 2024-03-07 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("How to force strategies fire exit alerts not reversals", initial_capital = 1000, slippage=1, commission_type = strategy.commission.cash_per_contract, commission_value = 0.0001, overlay=true) 
// disclaimer: this content is purely educational, especially please don't pay attention to backtest results on any timeframe/ticker

// Entries logic: based on Stochastic crossover
k = ta.sma(ta.stoch(close, high, low, 14), 3)
d = ta.sma(k, 3)
crossover = ta.crossover(k,d)
crossunder = ta.crossunder(k,d)

if (crossover and k < 20)
	strategy.entry("Buy", strategy.long, alert_message="buy")
if (crossunder and k > 80)
	strategy.entry("Sell", strategy.short, alert_message="sell")

// StopLoss / TakeProfit exits:
SL = input.int(600, title="StopLoss Distance from entry price (in Ticks)")
TP = input.int(1200, title="TakeProfit Distance from entry price (in Ticks)")
strategy.exit("xl", from_entry="Buy", loss=SL, profit=TP, alert_message="closebuy")
strategy.exit("xs", from_entry="Sell", loss=SL, profit=TP, alert_message="closesell")

// logical conditions exits:
if (crossunder and k <= 80)
	strategy.close("Buy", alert_message="closebuy")
if (crossover and k >= 20)
	strategy.close("Sell", alert_message="closesell")
```

> Detail

https://www.fmz.com/strategy/444005

> Last Modified

2024-03-08 15:12:42
