
> Name

Supertrend双重触发的多步移动止盈策略Double-Supertrend-Multi-Step-Trailing-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16d759e95f0803c43d0.png)

#### Overview

This is a multi-step trailing take-profit strategy based on dual Supertrend indicators. The strategy uses two Supertrend indicators with different parameters to determine market trends and execute long or short trades accordingly. The core of the strategy lies in its multi-step trailing take-profit mechanism, which sets multiple profit targets to progressively lock in profits while keeping a portion of the position open to capture larger market movements. This approach aims to reduce risk while maximizing profit potential.

#### Strategy Principles

1. Dual Supertrend Indicators: The strategy employs two Supertrend indicators with different parameter settings to identify trends. A long signal is triggered when both indicators show an uptrend, while a short signal is triggered when both indicate a downtrend. This dual confirmation mechanism effectively reduces false signals.

2. Multi-Step Trailing Take-Profit: The strategy sets up 4 adjustable take-profit targets. Each target has a corresponding profit percentage and position closing ratio. For example, the first target might close 12% of the position at 6% profit, the second might close 8% at 12% profit, and so on. This mechanism allows for gradual profit locking while keeping part of the position open to benefit from continued market movements.

3. Flexible Trade Direction: Users can choose to trade long-only, short-only, or both directions, adapting to different market environments and trading preferences.

4. Dynamic Stop-Loss: Although there's no explicit stop-loss setting in the code, the strategy automatically closes positions when the Supertrend indicators reverse, effectively acting as a dynamic stop-loss.

#### Strategy Advantages

1. Optimized Risk Management: The multi-step trailing take-profit mechanism greatly improves the strategy's risk-reward ratio. By progressively locking in profits, the strategy can reduce drawdown risk while maintaining upside potential.

2. Reduced False Signals: The use of dual Supertrend indicators significantly reduces the impact of false signals, improving trading accuracy and reliability.

3. High Adaptability: The strategy can flexibly adjust trading direction and take-profit parameters based on user preferences and market conditions, making it suitable for various trading instruments and timeframes.

4. High Degree of Automation: The strategy is fully automated, from entry to take-profit and exit, minimizing the impact of emotions and operational errors.

5. Flexible Capital Management: By setting different take-profit ratios, the strategy achieves flexible capital management, ensuring quick partial profit realization while allowing the remaining position to continue benefiting from market movements.

#### Strategy Risks

1. Parameter Sensitivity: The strategy's performance heavily depends on the settings of Supertrend indicators and take-profit parameters. Inappropriate parameters may lead to overtrading or missing important opportunities.

2. Trend Dependency: As a trend-following strategy, it may frequently enter and exit in choppy markets, causing unnecessary trading costs.

3. Slippage Risk: In fast-moving markets, the execution of multi-step take-profits may be affected by slippage, resulting in actual execution prices deviating from expectations.

4. Over-optimization Risk: With multiple adjustable parameters, the strategy is prone to over-optimization, potentially leading to significant differences between backtesting results and live trading performance.

#### Strategy Optimization Directions

1. Introduce Volatility Filtering: Consider incorporating ATR or other volatility indicators to reduce trading frequency during low volatility periods, improving the strategy's adaptability to different market conditions.

2. Dynamic Parameter Adjustment: Explore using adaptive algorithms to dynamically adjust Supertrend parameters and take-profit targets for better adaptation to market changes.

3. Enhance Stop-Loss Mechanism: While Supertrend reversals provide some stop-loss functionality, consider adding more flexible stop-loss mechanisms, such as trailing stops, for better risk control.

4. Integrate Additional Technical Indicators: Consider incorporating other technical indicators like RSI or MACD to improve entry and exit accuracy through multi-indicator confluence.

5. Optimize Capital Management: Explore more sophisticated capital management strategies, such as dynamically adjusting position sizes based on account performance, to better balance risk and reward.

6. Backtesting Optimization: Conduct more comprehensive backtests, including performance analysis across different timeframes and market conditions, to identify the strategy's optimal application scenarios and parameter settings.

#### Conclusion

This multi-step trailing take-profit strategy, based on dual Supertrend indicators, achieves a balance between risk and reward through its flexible multi-step profit-taking mechanism. The strategy's main advantages lie in its excellent risk management capabilities and sensitivity to trends. However, users need to pay attention to parameter settings and market environment impacts when applying it. Through further optimization and refinement, this strategy has the potential to become a robust and reliable automated trading system. In practical application, it is recommended that traders conduct thorough backtesting and paper trading, and make appropriate parameter adjustments based on specific trading instruments and market conditions.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-21 00:00:00
end: 2024-06-20 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Strategic Multi-Step Supertrend Trader - Strategy [presentTrading]", overlay=true )

// this strategy utilizes a double Supertrend indicator to determine entry and exit conditions for both long and short trades, with user-configurable take profit levels and trade direction settings. 
// The strategy dynamically updates highest and lowest prices during trades and exits positions based on multi-step profit targets or opposing Supertrend signals.


// User inputs for take profit settings
// Grouping Take Profit settings
useTakeProfit = input.bool(true, title="Use Take Profit", group="Take Profit Settings")
takeProfitPercent1 = input.float(6.0, title="Take Profit % Step 1", group="Take Profit Settings")
takeProfitPercent2 = input.float(12.0, title="Take Profit % Step 2", group="Take Profit Settings")
takeProfitPercent3 = input.float(18.0, title="Take Profit % Step 3", group="Take Profit Settings")
takeProfitPercent4 = input.float(50.0, title="Take Profit % Step 4", group="Take Profit Settings")

takeProfitAmount1 = input.float(12, title="Take Profit Amount % Step 1", group="Take Profit Settings")
takeProfitAmount2 = input.float(8, title="Take Profit Amount % Step 2", group="Take Profit Settings")
takeProfitAmount3 = input.float(4, title="Take Profit Amount % Step 3", group="Take Profit Settings")
takeProfitAmount4 = input.float(0, title="Take Profit Amount % Step 4", group="Take Profit Settings")

numberOfSteps = input.int(3, title="Number of Take Profit Steps", minval=1, maxval=4, group="Take Profit Settings")

// Grouping Trade Direction
tradeDirection = input.string("Both", title="Trade Direction", options=["Long", "Short", "Both"], group="Trade Direction")

// Grouping Supertrend settings
atrPeriod1 = input(10, title="ATR Length for Supertrend 1", group="Supertrend Settings")
factor1 = input.float(3.0, title="Factor for Supertrend 1", step=0.01, group="Supertrend Settings")

atrPeriod2 = input(5, title="ATR Length for Supertrend 2", group="Supertrend Settings")
factor2 = input.float(4.0, title="Factor for Supertrend 2", step=0.01, group="Supertrend Settings")


// Function to calculate Supertrend
supertrend(factor, atrPeriod) =>
    [a, direction] = ta.supertrend(factor, atrPeriod)
    direction

// Calculate Double Supertrend
supertrend1 = supertrend(factor1, atrPeriod1)
supertrend2 = supertrend(factor2, atrPeriod2)

// Entry conditions
longCondition = (supertrend1 < 0 and supertrend2 < 0) and (tradeDirection == "Long" or tradeDirection == "Both")
shortCondition = (supertrend1 > 0 and supertrend2 > 0) and (tradeDirection == "Short" or tradeDirection == "Both")

// Exit conditions
longExitCondition = (supertrend1 > 0 and supertrend2 > 0) and (tradeDirection == "Long" or tradeDirection == "Both")
shortExitCondition = (supertrend1 < 0 and supertrend2 < 0) and (tradeDirection == "Short" or tradeDirection == "Both")

// Variables to store the highest and lowest prices during the trade
var float highestPrice = na
var float lowestPrice = na

// Get the entry price from open trades
entryPrice = strategy.opentrades.entry_price(strategy.opentrades - 1)

// Reset highestPrice or lowestPrice when entering new trades
if (longCondition and strategy.position_size <= 0)
    highestPrice := na // Reset the highest price
    strategy.entry("My Long Entry Id", strategy.long) // Enter long position
    strategy.close("My Short Entry Id", "Short Exit") // Close short position if any

if (shortCondition and strategy.position_size >= 0)
    lowestPrice := na // Reset the lowest price
    strategy.entry("My Short Entry Id", strategy.short) // Enter short position
    strategy.close("My Long Entry Id", "Long Exit") // Close long position if any

// Exit trades based on conditions
if (longExitCondition and strategy.position_size > 0)
    strategy.close("My Long Entry Id", "Long Exit") // Exit long position

if (shortExitCondition and strategy.position_size < 0)
    strategy.close("My Short Entry Id", "Short Exit") // Exit short position

if (strategy.position_size > 0)
    // Update the highest price for long positions
    highestPrice := na(highestPrice) ? high : math.max(highestPrice, high)

    // Step 1
    if (useTakeProfit and numberOfSteps >= 1)
        strategy.exit("Take Profit 1", from_entry="My Long Entry Id", qty_percent=takeProfitAmount1, limit=entryPrice * (1 + takeProfitPercent1 / 100))
    // Step 2
    if (useTakeProfit and numberOfSteps >= 2)
        strategy.exit("Take Profit 2", from_entry="My Long Entry Id", qty_percent=takeProfitAmount2, limit=entryPrice * (1 + takeProfitPercent2 / 100))
    // Step 3
    if (useTakeProfit and numberOfSteps >= 3)
        strategy.exit("Take Profit 3", from_entry="My Long Entry Id", qty_percent=takeProfitAmount3, limit=entryPrice * (1 + takeProfitPercent3 / 100))
    // Step 4
    if (useTakeProfit and numberOfSteps == 4)
        strategy.exit("Take Profit 4", from_entry="My Long Entry Id", qty_percent=takeProfitAmount4, limit=entryPrice * (1 + takeProfitPercent4 / 100))

if (strategy.position_size < 0)
    // Update the lowest price for short positions
    lowestPrice := na(lowestPrice) ? low : math.min(lowestPrice, low)

    // Step 1
    if (useTakeProfit and numberOfSteps >= 1)
        strategy.exit("Take Profit 1", from_entry="My Short Entry Id", qty_percent=takeProfitAmount1, limit=entryPrice * (1 - takeProfitPercent1 / 100))
    // Step 2
    if (useTakeProfit and numberOfSteps >= 2)
        strategy.exit("Take Profit 2", from_entry="My Short Entry Id", qty_percent=takeProfitAmount2, limit=entryPrice * (1 - takeProfitPercent2 / 100))
    // Step 3
    if (useTakeProfit and numberOfSteps >= 3)
        strategy.exit("Take Profit 3", from_entry="My Short Entry Id", qty_percent=takeProfitAmount3, limit=entryPrice * (1 - takeProfitPercent3 / 100))
    // Step 4
    if (useTakeProfit and numberOfSteps == 4)
        strategy.exit("Take Profit 4", from_entry="My Short Entry Id", qty_percent=takeProfitAmount4, limit=entryPrice * (1 - takeProfitPercent4 / 100))

```

> Detail

https://www.fmz.com/strategy/454736

> Last Modified

2024-06-21 14:36:35
