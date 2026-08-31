
> Name

自适应移动平均交叉追踪止损策略-Adaptive-Moving-Average-Crossover-with-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15debf37e57428eb74a.png)


#### Overview

The Adaptive Moving Average Crossover with Trailing Stop-Loss Strategy is a quantitative trading approach that combines multiple technical indicators. This strategy primarily relies on crossover signals between fast and slow Simple Moving Averages (SMA) for trade entries, while employing an adaptive trailing stop-loss for risk management. The strategy also incorporates advanced features such as volatility-based position sizing and adaptive stop-loss levels to enhance its adaptability and robustness across various market conditions.

#### Strategy Principles

The core logic of this strategy includes the following key components:

1. Moving Average Crossover: Utilizes two Simple Moving Averages (SMA) with different periods - a fast SMA (default 5 periods) and a slow SMA (default 50 periods). A long entry signal is triggered when the fast SMA crosses above the slow SMA.

2. Position Sizing: The strategy employs a dynamic position sizing method based on account balance and current price. It also introduces a "confidence" factor that can adjust the proportion of capital invested.

3. Trailing Stop-Loss: Implements a percentage-based trailing stop-loss mechanism. The stop-loss level moves up as the price increases, locking in profits and limiting drawdowns.

4. Adaptive Features: If the "fancy_tests" option is enabled, the strategy uses a dynamic stop-loss percentage based on standard deviation, allowing the stop-loss level to adapt to market volatility.

5. Exit Logic: The strategy primarily relies on the trailing stop-loss for position closure, without setting fixed take-profit points.

#### Strategy Advantages

1. Trend Following: By using moving average crossovers, the strategy can capture medium to long-term trends, beneficial for substantial gains in strong trending markets.

2. Risk Management: The trailing stop-loss mechanism effectively controls downside risk while allowing profits to run.

3. Adaptability: By incorporating volatility factors to adjust stop-loss levels, the strategy can better adapt to different market environments.

4. Capital Management: Dynamic position sizing helps increase trade size as the account grows and automatically reduces risk exposure during account drawdowns.

5. Flexibility: The strategy offers multiple adjustable parameters, such as moving average periods and stop-loss percentages, allowing users to optimize based on different markets and personal risk preferences.

#### Strategy Risks

1. False Breakouts: In ranging or choppy markets, frequent false breakouts of moving averages may occur, leading to multiple stop-loss exits.

2. Lag: Moving averages are inherently lagging indicators, which may not react quickly enough in highly volatile markets.

3. Overtrading: Improper parameter settings may result in frequent entries and exits, increasing transaction costs.

4. Drawdown Risk: Despite the trailing stop-loss, the strategy may still face significant drawdowns in rapidly reversing markets.

5. Unidirectional Trading: The strategy currently only takes long positions, potentially missing opportunities or incurring losses in downtrends.

#### Strategy Optimization Directions

1. Multi-Timeframe Analysis: Introduce longer-term trend indicators, such as longer-period moving averages, to reduce false signals.

2. Add Short Selling Logic: Extend the strategy to support short trades, improving comprehensiveness and profit opportunities.

3. Optimize Entry Timing: Consider combining other technical indicators (e.g., RSI, MACD) to filter trade signals and improve entry accuracy.

4. Dynamic Parameter Optimization: Implement adaptive parameter adjustment mechanisms, such as dynamically adjusting moving average periods based on market volatility.

5. Introduce Profit-Taking Mechanism: In addition to trailing stops, consider adding take-profit rules based on technical indicators or fixed targets.

6. Improve Position Management: Implement more sophisticated position sizing strategies, such as those based on the Kelly Criterion or other risk parity methods.

7. Add Fundamental Filters: For stock trading, consider incorporating fundamental indicators as additional trade filtering conditions.

#### Conclusion

The Adaptive Moving Average Crossover with Trailing Stop-Loss Strategy is a comprehensive approach that integrates multiple quantitative trading concepts. It captures trends through moving average crossovers, manages risk using trailing stops, and enhances adaptability through dynamic parameter adjustments. While inherent risks and limitations exist, careful parameter optimization and further strategy improvements could potentially transform it into a robust trading system. The strategy's modular design also provides a solid foundation for future expansions and optimizations. For traders seeking consistent returns in trending markets while emphasizing risk management, this strategy offers an excellent starting point.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-07-23 00:00:00
end: 2024-07-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © chinmay.hundekari

//@version=5
//@version=5
strategy("test", overlay = true)

// Calculate two moving averages with different lengths.
SLMA = input.int(50,"SMA",minval=10,step=1)
FSMA = input.int(5,"SMA",minval=1,step=1)
fancy_tests = input.bool(true,"Enable Fancy Changes")
longLossPerc = input.float(2, title="Trailing Stop Loss (%)",
     minval=0.0, step=0.1) * 0.01
stdMult = input.float(2.0, title="Standard Deviation Multiplier",
     minval=0.0, step=0.01)

float fastMA = ta.sma(close, FSMA)
float slowMA = ta.sma(close, SLMA)
float closMA = ta.sma(close, 25)

confidence = 1.0
if (fancy_tests)
    longLossPerc := stdMult * ta.stdev(ohlc4, 20)/close
balance = strategy.initial_capital + strategy.netprofit
balanceInContracts = balance* confidence/close

// Enter a long position when `fastMA` crosses over `slowMA`.
if ta.crossover(fastMA, slowMA)
    strategy.entry("BUY", strategy.long, qty=balanceInContracts)
//longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)
//Trailing Stop loss Code
longStopPrice = 0.0
percLoss = longLossPerc
longStopPrice := if strategy.position_size > 0
    //if (strategy.openprofit_percent/100.0 > longLossPerc)
    //    percLoss := math.min(strategy.openprofit_percent/200.0, longLossPerc)
    stopValue = close * (1 - percLoss)
    math.max(stopValue, longStopPrice[1])
else
    0
if strategy.position_size > 0
    strategy.exit("STP", stop=longStopPrice)
plot(strategy.position_size > 0 ? longStopPrice : na,
     color=color.red, style=plot.style_cross,
     linewidth=2, title="Long Stop Loss")
// Enter a short position when `fastMA` crosses under `slowMA`.
//if ta.crossunder(fastMA, closMA)
//    strategy.close_all("SEL")//strategy.entry("sell", strategy.short)

// Plot the moving averages.
plot(fastMA, "Fast MA", color.aqua)
plot(slowMA, "Slow MA", color.orange)
plot((confidence)*(close), "Confidence", color=color.green, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/458043

> Last Modified

2024-07-29 14:27:58
