
> Name

Adaptive-Price-Crossing-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e7570bb9d78510fd68.png)

#### Overview

The Adaptive Price-Crossing Moving Average Trading Strategy is a quantitative trading method based on the Hull Moving Average (HMA). This strategy generates buy and sell signals using price crossovers with the HMA, while implementing fixed stop-loss and take-profit levels to manage risk and reward. The strategy employs a 104-period HMA as its primary indicator, combined with price crossovers to trigger trades.

#### Strategy Principle

The core of this strategy is the use of the Hull Moving Average (HMA) as the primary indicator. HMA is an advanced moving average that responds quickly to price changes while reducing lag. The strategy logic is as follows:

1. Calculate the 104-period HMA.
2. Open a long position when the price crosses above the HMA.
3. Open a short position when the price crosses below the HMA.
4. Set fixed stop-loss ($1.25) and take-profit ($37.5) levels for each trade.
5. Use 2 contracts for each trade.

The strategy tracks open positions to ensure no new positions are opened while an existing one is active. Once a trade is closed, the system resets flags to allow new trade signals to take effect.

#### Strategy Advantages

1. Adaptability: HMA quickly adapts to market changes, reducing false signals.
2. Risk Management: Uses fixed stop-loss and take-profit levels, effectively controlling risk for each trade.
3. Simplicity: Trading rules are clear, easy to understand and execute.
4. Bi-directional Trading: Captures both upward and downward opportunities, increasing profit potential.
5. Automation: The strategy can be fully automated, reducing human intervention and emotional influence.

#### Strategy Risks

1. Frequent Trading: May generate excessive trading signals in volatile markets, increasing transaction costs.
2. Fixed Stop-Loss/Take-Profit: May not be suitable for all market conditions, potentially exiting too early or missing large trends in some cases.
3. Reliance on a Single Indicator: Depending solely on HMA may underperform in certain market environments.
4. Lag: Although HMA reduces lag, it may still react insufficiently at sharp turning points.
5. Lack of Market Environment Filtering: Does not consider overall market trends or volatility, potentially trading in unsuitable market conditions.

#### Strategy Optimization Directions

1. Introduce Additional Indicators: Combine with other technical indicators (such as RSI or MACD) to confirm signals and improve accuracy.
2. Dynamic Stop-Loss/Take-Profit: Adjust stop-loss and take-profit levels based on market volatility to adapt to different market environments.
3. Add Market Filters: Incorporate trend strength or volatility filters to avoid trading in unfavorable market conditions.
4. Optimize HMA Parameters: Test different HMA periods to find the most suitable parameters for specific markets.
5. Implement Position Management: Dynamically adjust trade size based on market risk and account size.
6. Add Time Filters: Avoid trading during periods of high market volatility, such as during important economic data releases.

#### Summary

The Adaptive Price-Crossing Moving Average Trading Strategy is a simple yet effective quantitative trading method. By leveraging the advantages of the Hull Moving Average, this strategy can capture market trends while protecting capital through fixed risk management measures. Although the strategy has some potential risks, it can be further improved and adapted through continuous optimization. For traders seeking automated trading solutions, this is a worthwhile basic strategy framework to consider.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-03-23 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("SHIESTD", overlay=true)

// Function to calculate Hull Moving Average (HMA)
hma(src, length) =>
    wma1 = ta.wma(src, length)
    wma2 = ta.wma(src, length / 2)
    hma = ta.wma(2 * wma2 - wma1, math.round(math.sqrt(length)))
    hma

// Parameters
hma_length = 104

// Calculate Hull Moving Average
hma_value = hma(close, hma_length)

// Plot HMA
plot(hma_value, title="104-period Hull Moving Average", color=color.blue, linewidth=2)

// Define SL and TP values in dollars
long_sl_amount = 1.25
long_tp_amount = 37.5
short_sl_amount = 1.25
short_tp_amount = 37.5

// Number of contracts
contracts = 2

// Function to calculate SL and TP prices based on entry price and dollar amounts
long_sl_price(entry_price) =>
    entry_price - long_sl_amount

long_tp_price(entry_price) =>
    entry_price + long_tp_amount

short_sl_price(entry_price) =>
    entry_price + short_sl_amount

short_tp_price(entry_price) =>
    entry_price - short_tp_amount

// Trading conditions
price_intersects_hma = ta.crossover(close, hma_value) or ta.crossunder(close, hma_value)

// Long and Short Conditions based on price intersecting HMA
long_condition = ta.crossover(close, hma_value)
short_condition = ta.crossunder(close, hma_value)

// Track open positions
var bool long_open = false
var bool short_open = false

// Handle Long Positions
if (long_condition and not long_open)
    entry_price = close
    strategy.entry("Long", strategy.long, qty=contracts)
    strategy.exit("Exit Long", from_entry="Long", stop=long_sl_price(entry_price), limit=long_tp_price(entry_price))
    long_open := true

// Handle Short Positions
if (short_condition and not short_open)
    entry_price = close
    strategy.entry("Short", strategy.short, qty=contracts)
    strategy.exit("Exit Short", from_entry="Short", stop=short_sl_price(entry_price), limit=short_tp_price(entry_price))
    short_open := true

// Reset flags when the position is closed
if (strategy.opentrades == 0)
    long_open := false
    short_open := false

```

> Detail

https://www.fmz.com/strategy/468333

> Last Modified

2024-09-26 16:12:36
