
> Name

双均线趋势跟踪策略与RSI过滤器-Dual-Moving-Average-Trend-Following-Strategy-with-RSI-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f226ed38aa82383ba4.png)


#### Overview

This strategy is a trend-following trading system that combines a Simple Moving Average (SMA) with the Relative Strength Index (RSI). It primarily uses a 200-period SMA to identify uptrends and employs the RSI as a filter to optimize entry timing. The strategy also incorporates take-profit and stop-loss mechanisms to control risk and lock in profits.

#### Strategy Principles

The core logic of this strategy includes the following key elements:

1. Trend Identification: Uses a 200-period SMA as an indicator of long-term trends. When the price crosses above and remains above the SMA, it is considered a potential uptrend.

2. Entry Confirmation: Requires the price to stay above the SMA for at least 30 consecutive periods (minutes) to ensure trend stability.

3. RSI Filter: Uses a 14-period RSI indicator, allowing entry only when the RSI is below 30 (oversold region), which helps capture potential rebound opportunities.

4. Risk Management: Sets a 0.5% stop-loss level to limit the maximum loss per trade.

5. Profit Target: Sets a 2% take-profit level to automatically close positions when the expected return is achieved.

The strategy execution process is as follows:
- Open a long position when the price crosses above the 200 SMA and stays above it for more than 30 periods, while the RSI is below 30.
- During the holding period, automatically close the position if the price reaches 102% of the entry price (take profit) or falls below 99.5% of the entry price (stop loss).
- After closing the position, the system resets and waits for the next entry opportunity that meets the conditions.

#### Strategy Advantages

1. Trend Following: Utilizes long-term SMA to capture major trends, helping to profit in strong upward markets.

2. Entry Optimization: Requiring the price to stay above the SMA for 30 periods helps filter out false breakouts, improving entry quality.

3. Reversal Capture: Combining RSI oversold conditions helps capture potential rebound opportunities at the beginning of trends.

4. Risk Control: Setting a clear stop-loss level effectively limits the maximum risk for each trade.

5. Profit Locking: Preset take-profit level ensures automatic profit locking when expected returns are achieved.

6. Objectivity: Clear strategy rules reduce the emotional impact of subjective judgments.

7. Quantifiable: Strategy parameters can be backtested and optimized using historical data.

#### Strategy Risks

1. False Breakouts: In sideways or choppy markets, frequent false breakouts may lead to consecutive stop losses.

2. Lag: SMA as a lagging indicator may miss some opportunities at the beginning of trends or maintain positions when trends end.

3. RSI Limitations: Strict RSI conditions may miss some good entry opportunities, especially in strong uptrends.

4. Fixed Take-Profit and Stop-Loss: Preset percentages may not be suitable for all market conditions and may trigger too early in highly volatile markets.

5. Single Direction: The strategy only goes long, unable to profit in downward trends.

6. Parameter Sensitivity: Strategy performance may be sensitive to changes in SMA period, confirmation period, and RSI settings.

7. Market Adaptability: The strategy may perform well in certain specific markets or timeframes but may not be applicable to all situations.

#### Strategy Optimization Directions

1. Dynamic Take-Profit and Stop-Loss: Consider using ATR (Average True Range) to set dynamic take-profit and stop-loss levels to adapt to different market volatility conditions.

2. Multi-Timeframe Confirmation: Introduce confirmation mechanisms across multiple timeframes, such as requiring conditions to be met on both daily and hourly charts before entry, to improve signal reliability.

3. Trend Strength Filter: Add ADX (Average Directional Index) to measure trend strength and only enter during strong trends.

4. Volatility Adjustment: Dynamically adjust parameters based on market volatility, such as increasing confirmation periods during low volatility and decreasing them during high volatility.

5. Add Short Selling Mechanism: Consider short selling when price falls below SMA and RSI is overbought, allowing the strategy to profit in both directions.

6. Optimize RSI Usage: Consider using RSI divergence or combining it with other indicators (such as MACD) to enhance entry signal reliability.

7. Introduce Volume Confirmation: Add volume analysis to ensure breakouts or reversals are supported by sufficient trading volume.

8. Time Filter: Add a time filter to avoid trading during known low liquidity periods.

9. Money Management Optimization: Implement dynamic position sizing, adjusting risk exposure for each trade based on account size and market volatility.

10. Increase Indicator Combination: Consider combining other technical indicators such as Bollinger Bands and Fibonacci retracements to build a more comprehensive trading system.

#### Conclusion

The "Dual Moving Average Trend Following Strategy with RSI Filter" is a quantitative trading strategy that combines trend-following and momentum reversal ideas. By using a 200-period SMA to identify long-term trends and combining RSI oversold conditions to optimize entry timing, this strategy aims to capture potential rebound opportunities in strong uptrends. The built-in take-profit and stop-loss mechanisms help control risk and lock in profits, making it a relatively comprehensive trading system.

However, the strategy also has some limitations, such as being susceptible to false breakouts and being limited to long-only trades. To further improve the strategy's robustness and adaptability, it is recommended to consider introducing dynamic take-profit and stop-loss levels, multi-timeframe confirmation, trend strength filtering, and other optimization measures. Additionally, adding a short-selling mechanism and optimizing money management strategies could significantly enhance the overall performance of the system.

In summary, this strategy provides a good starting point for trend following and momentum trading. Through continuous backtesting, optimization, and live trading validation, traders can further refine and customize this strategy based on specific market environments and individual risk preferences to achieve better trading results.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-07-21 00:00:00
end: 2024-07-28 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("SMA 200 with RSI Filter", overlay=true)

// Inputs
smaLength = input.int(200, title="SMA Length")
confirmBars = input.int(30, title="Confirmation Bars (30 minutes)")
takeProfitPerc = input.float(2.0, title="Take Profit (%)", step=0.1) / 100
stopLossPerc = input.float(0.5, title="Stop Loss (%)", step=0.1) / 100
rsiLength = input.int(14, title="RSI Length")
rsiOverbought = input.int(70, title="RSI Overbought Level")
rsiOversold = input.int(30, title="RSI Oversold Level")

// Calculate SMA
sma = ta.sma(close, smaLength)

// Calculate RSI
rsi = ta.rsi(close, rsiLength)

// Buy condition
priceAboveSMA = close > sma
aboveSMAcount = ta.barssince(priceAboveSMA == false)
rsiCondition = rsi < rsiOversold
enterLongCondition = priceAboveSMA and aboveSMAcount >= confirmBars and rsiCondition

// Track entry price for calculating take profit and stop loss levels
var float entryPrice = na
if (enterLongCondition and na(entryPrice))
    entryPrice := close

// Ensure the entryPrice is only set when a position is opened
if (strategy.opentrades == 0)
    entryPrice := na

takeProfitLevel = entryPrice * (1 + takeProfitPerc)
stopLossLevel = entryPrice * (1 - stopLossPerc)

// Exit conditions
takeProfitCondition = close >= takeProfitLevel
stopLossCondition = close <= stopLossLevel

// Plot SMA and RSI
plot(sma, title="SMA 200", color=color.blue)
hline(rsiOverbought, "Overbought", color=color.red)
hline(rsiOversold, "Oversold", color=color.green)
plot(rsi, title="RSI", color=color.purple)

// Plot shapes for entries and exits
plotshape(series=enterLongCondition, location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=takeProfitCondition, location=location.abovebar, color=color.red, style=shape.labeldown, text="TP")
plotshape(series=stopLossCondition, location=location.abovebar, color=color.red, style=shape.labeldown, text="SL")

// Strategy entry and exit
if (enterLongCondition)
    strategy.entry("Long", strategy.long, comment="SMA200LE")

if (takeProfitCondition or stopLossCondition)
    strategy.close("Long", when=takeProfitCondition or stopLossCondition)

// Reset entry price after position is closed
if (strategy.position_size == 0)
    entryPrice := na

```

> Detail

https://www.fmz.com/strategy/458064

> Last Modified

2024-07-29 16:45:59
