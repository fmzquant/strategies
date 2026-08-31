
> Name

成交量加权平均价与相对强弱指数交叉策略-VWAP-and-RSI-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/752a4f4752e0877f23.png)


#### Overview

This strategy is based on the crossover of two VWAP lines from different periods, confirmed with the RSI indicator. It generates a long signal when the price breaks above the VWAP line and the RSI is above the oversold level, and a short signal when the price breaks below the VWAP line and the RSI is below the overbought level. The strategy aims to capture breakout moves of the price relative to the VWAP while using the RSI to filter out potential false breakouts.

#### Strategy Principle

1. Calculate the VWAP value over a given period. VWAP is the volume-weighted average price, reflecting the average holding cost of market participants over a period of time.
2. Calculate the RSI indicator. RSI measures the relative strength of the price over a period of time, used to determine whether the market is overbought or oversold.
3. Generate a long signal when the closing price breaks above the VWAP line and the RSI is above the oversold level (default is 30).
4. Generate a short signal when the closing price breaks below the VWAP line and the RSI is below the overbought level (default is 70).
5. When holding a long position, close the position if the closing price breaks below the VWAP line or the RSI is above the overbought level.
6. When holding a short position, close the position if the closing price breaks above the VWAP line or the RSI is below the oversold level.

#### Strategy Advantages

1. Combines price and volume information. VWAP takes into account both price and volume, providing a more comprehensive view of market trends.
2. Uses the RSI indicator to confirm trends and filter out false signals. RSI helps assess the reliability of breakouts and reduces misjudgments.
3. Breakout strategy is easy to understand and implement. The strategy logic is clear and suitable for beginners to learn and use.
4. Applicable to multiple time frames. By adjusting the calculation periods of VWAP and RSI, the strategy can be adapted to different trading styles and markets.

#### Strategy Risks

1. The selection of VWAP and RSI parameters affects strategy performance. Inappropriate parameter settings may lead to frequent trades or missed opportunities.
2. In markets with unclear trends or low volatility, the strategy may generate more false signals.
3. The strategy does not consider risk management, such as stop-loss and position sizing. In practical application, it needs to be combined with risk management measures.
4. Breakout strategies are prone to losses in rangebound markets. When the price oscillates around the VWAP, the strategy may trade frequently and result in losses.

#### Strategy Optimization Direction

1. Introduce multi-timeframe VWAP and RSI. Combine indicators from different periods to improve signal reliability and robustness.
2. Add trend confirmation indicators, such as moving averages or ADX. Only trade in the clear direction of the trend to improve the strategy's win rate and risk-reward ratio.
3. Optimize entry and exit rules. For example, require the price to exceed the VWAP by a certain percentage at breakout, or use ATR as a filtering condition.
4. Combine with other technical indicators, such as Bollinger Bands or momentum indicators. Use multiple indicators to confirm signals and improve signal quality.
5. Incorporate risk management, such as stop-loss and dynamic position sizing. Reasonable stop-loss levels can reduce the risk of individual trades, while dynamic position sizing can improve capital efficiency.

#### Summary

The VWAP and RSI Crossover Strategy is a simple and easy-to-use trading method that aims to capture potential profits by catching breakout moves of the price relative to the VWAP. However, the strategy also has issues such as parameter optimization, poor performance in rangebound markets, and lack of risk management. By introducing multi-timeframe analysis, combining with other technical indicators, optimizing entry and exit rules, and adding risk control measures, the robustness and practicality of the strategy can be further enhanced. Traders need to make appropriate adjustments and optimizations based on their own trading style and market characteristics when applying this strategy.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-05 00:00:00
end: 2024-05-10 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("VWAP and RSI Strategy with Alerts", overlay=true)

// Inputs
cumulativePeriod = input(20, "Rolling Period for VWAP", minval=1)
rsiPeriod = input(20, "RSI Period", minval=1)
rsiOverbought = input(70, "RSI Overbought Level")
rsiOversold = input(30, "RSI Oversold Level")
tradeQty = input(1, "Trade Quantity", minval=0.01)  // Cantidad de la operación

// VWAP Calculation
typicalPrice = (high + low + close) / 3
typicalPriceVolume = typicalPrice * volume
cumulativeTypicalPriceVolume = sum(typicalPriceVolume, cumulativePeriod)
cumulativeVolume = sum(volume, cumulativePeriod)
vwapValue = cumulativeTypicalPriceVolume / cumulativeVolume
plot(vwapValue, color=color.blue, title="VWAP")

// RSI Calculation
rsiValue = rsi(close, rsiPeriod)
hline(rsiOverbought, "Overbought", color=color.red)
hline(rsiOversold, "Oversold", color=color.green)

// Entry Conditions
longCondition = crossover(close, vwapValue) and rsiValue > rsiOversold
shortCondition = crossunder(close, vwapValue) and rsiValue < rsiOverbought

// Strategy Execution for Entries
if (longCondition)
    strategy.entry("Long", strategy.long, qty=tradeQty)
if (shortCondition)
    strategy.entry("Short", strategy.short, qty=tradeQty)

// Conditions for Exiting
exitLongCondition = crossunder(close, vwapValue) or rsiValue > rsiOverbought  // Salir de long cuando el precio cruce debajo del VWAP o el RSI sea alto
exitShortCondition = crossover(close, vwapValue) or rsiValue < rsiOversold  // Salir de short cuando el precio cruce por encima del VWAP o el RSI sea bajo

// Strategy Execution for Exits
strategy.exit("Exit Long", "Long", when=exitLongCondition)
strategy.exit("Exit Short", "Short", when=exitShortCondition)

// Alert Conditions
alertcondition(longCondition, title="Enter Long", message="ENTER-LONG_BINANCE-FUTURES_BTCUSDT_WunderTrading-1_1M_1354a524d74bc295")
alertcondition(exitLongCondition, title="Exit Long", message="EXIT-LONG_BINANCE-FUTURES_BTCUSDT_WunderTrading-1_1M_1354a524d74bc295")
alertcondition(shortCondition, title="Enter Short", message="ENTER-SHORT_BINANCE-FUTURES_BTCUSDT_WunderTrading-1_1M_1354a524d74bc295")
alertcondition(exitShortCondition, title="Exit Short", message="EXIT-SHORT_BINANCE-FUTURES_BTCUSDT_WunderTrading-1_1M_1354a524d74bc295")


```

> Detail

https://www.fmz.com/strategy/451025

> Last Modified

2024-05-11 11:42:20
