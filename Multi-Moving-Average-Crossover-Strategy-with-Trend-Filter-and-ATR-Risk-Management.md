
> Name

Multi-Moving-Average-Crossover-Strategy-with-Trend-Filter-and-ATR-Risk-Management

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d95ca9ea871461e878fd.png)
![IMG](https://www.fmz.com/upload/asset/2d81d0c078d2c68aafc5b.png)




#### Overview

This is a quantitative trading strategy based on multiple moving average crossover signals, combined with trend filtering and ATR risk management mechanisms. The strategy primarily uses the crossover of the 20-period Simple Moving Average (SMA) with the 89-period Exponential Moving Average (EMA) to generate trading signals, while employing the 200-period Simple Moving Average as a trend filter to ensure trade direction aligns with the main trend. Additionally, the strategy utilizes Average True Range (ATR) to set dynamic stop-loss and take-profit levels, effectively controlling the risk-reward ratio for each trade.

#### Strategy Principles

The core logic of this strategy is based on the comprehensive application of three moving averages and the ATR indicator:

1. Moving Average Calculations:
   - 20-period Simple Moving Average (SMA): Reflects short-term price trends
   - 89-period Exponential Moving Average (EMA): Reflects medium-term price trends
   - 200-period Simple Moving Average (SMA): Serves as a long-term trend judgment criterion

2. Entry Conditions:
   - Long Entry: Price is above the 200-period moving average, and the 20-period SMA crosses above the 89-period EMA
   - Short Entry: Price is below the 200-period moving average, and the 20-period SMA crosses below the 89-period EMA

3. Risk Management Settings:
   - Uses 14-period ATR to calculate market volatility
   - Stop Loss: Entry price ± (ATR × 2), below for long positions, above for short positions
   - Take Profit: Entry price ± (ATR × 3), above for long positions, below for short positions
   - Fixed risk-reward ratio of 1:1.5

The strategy marks entry signals on the chart and displays labels containing entry price, stop-loss, and take-profit levels, allowing traders to visually understand trade details.

#### Strategy Advantages

1. Multiple Trend Confirmation Mechanism: Through three moving averages of different periods, the strategy can comprehensively analyze short, medium, and long-term market trends, significantly reducing the risk of false signals.

2. Trend-Following Logic: The 200-period moving average serves as a trend filter, ensuring trades are only executed in the direction of the main trend, avoiding counter-trend operations and improving win rates.

3. Dynamic Risk Management: Stop-loss and take-profit settings based on ATR automatically adjust risk control parameters according to actual market volatility, maintaining strategy adaptability in different volatility environments.

4. Fixed Risk-Reward Ratio: The stop-loss to take-profit ratio is fixed at 2:3, ensuring that the expected return for each trade exceeds the expected risk, beneficial for long-term capital growth.

5. Visualized Trading Signals: The strategy clearly marks entry points, stop-loss points, and take-profit points on the chart, making the trading decision process more intuitive and convenient.

6. Fully Automated Execution: The strategy logic is clear and easy to program, suitable for automated trading system deployment, reducing emotional interference and human operational errors.

#### Strategy Risks

1. Poor Performance in Ranging Markets: In sideways, choppy markets without clear trends, moving average crossovers may generate frequent false signals, leading to consecutive stop-losses.

2. Lag Issues: All strategies based on moving averages suffer from signal lag problems, potentially missing optimal entry points at the beginning of trends or not responding quickly enough when trends reverse.

3. Fixed Multiplier Risk Control Limitations: Although ATR reflects market volatility, the fixed 2x ATR stop-loss may be insufficient to avoid significant losses in extreme market conditions, especially during gap openings.

4. Parameter Optimization Dilemma: The strategy involves multiple parameters (such as 20, 89, 200 periods and ATR multipliers), different markets and timeframes may require different parameter combinations, creating overfitting risks.

5. Trend Filter Lag: The 200-period moving average reacts extremely slowly, potentially leading to misjudgments during initial trend changes, missing trading opportunities or generating false signals.

To address these risks, consider the following solutions:
- Add market environment recognition mechanisms to reduce or pause trading in ranging markets
- Introduce other technical indicators as confirmation signals to improve entry precision
- Consider using variable ATR multipliers or setting absolute maximum loss limits
- Implement adaptive parameter adjustment mechanisms to automatically optimize parameters based on different market conditions

#### Strategy Optimization Directions

1. Market Environment Adaptive Mechanism: Introduce volatility indicators or trend strength indicators (such as ADX) to automatically adjust strategy parameters or pause trading in different market environments. This addresses the strategy's poor performance in ranging markets.

2. Entry Signal Optimization: Consider adding additional confirmation indicators such as RSI, MACD, or volume indicators, entering only when multiple indicators confirm, improving signal quality.

3. Dynamic Risk Management: Implement adaptive stop-loss and take-profit multipliers based on market volatility and historical performance, increasing stop-loss distance in high-volatility markets and decreasing it in low-volatility markets.

4. Partial Take-Profit Mechanism: Introduce staged take-profit logic to move stops to breakeven or partially close positions after reaching certain profit targets, securing partial profits while maintaining the possibility of following trends.

5. Time Filter: Add trading time filters to avoid major economic data releases or specific low-liquidity periods, reducing risks caused by abnormal market volatility.

6. Money Management Optimization: Dynamically adjust position size for each trade based on strategy historical backtest results and current market conditions, increasing risk exposure under favorable conditions and reducing it under unfavorable conditions.

7. Parameter Self-Optimization: Implement an automatic parameter optimization mechanism based on rolling backtests, periodically adjusting moving average periods and ATR multipliers according to recent market data, enabling the strategy to continuously adapt to changing market environments.

The core objective of these optimization directions is to enhance the strategy's adaptability and robustness, reduce dependence on fixed parameters, and improve performance consistency across different market environments.

#### Summary

The Multi-Moving Average Crossover Strategy with Trend Filter and ATR Risk Management combines traditional technical analysis wisdom with modern risk management concepts. Through the coordination of 20/89/200 triple moving averages, the strategy can effectively identify market trends and generate trend-following trading signals; while the dynamic risk control mechanism based on ATR ensures that each trade has reasonable risk-reward characteristics.

The strategy's greatest advantage lies in its systematic and disciplined approach, eliminating emotional factors in trading through clear rules, while its concise logical design makes it easy to understand and execute. However, the strategy also has inherent flaws such as poor performance in ranging markets and signal lag, requiring traders to remain vigilant in practical applications.

By introducing market environment recognition, multiple confirmation signals, and dynamic risk management optimization measures, this strategy has the potential to achieve greater stability and adaptability while maintaining its core logic simplicity. Both individual traders and institutional investors can use this strategy as a foundation framework for building complete trading systems, making personalized adjustments according to their needs and risk preferences.

Ultimately, the success of any trading strategy depends on strict execution discipline and continuous optimization improvements. In today's constantly changing market environment, maintaining monitoring and adjustment of the strategy is more important than blindly pursuing perfect parameters.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-26 00:00:00
end: 2025-03-25 00:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("EMA Cross Strategy (20MA & 89EMA with 200MA Filter)", overlay=true, initial_capital=10000, currency=currency.USD)

// 1. Moving Average Calculation
ma20  = ta.sma(close, 20)
ema89 = ta.ema(close, 89)
ma200 = ta.sma(close, 200)

// 2. Plot Moving Averages
plot(ma20, title="20MA", color=color.orange)
plot(ema89, title="89EMA", color=color.red)
plot(ma200, title="200MA", color=color.blue)

// 3. ATR and Multipliers
atrValue = ta.atr(14)
stopLossMultiplier  = 2.0   // Stop Loss: ATR × 2
takeProfitMultiplier = 3.0   // Take Profit: ATR × 3

// 4. Entry Signal Conditions
// Long Signal: Price is above the 200MA and 20MA crosses above 89EMA
longSignal  = (close > ma200) and (strategy.position_size == 0) and ta.crossover(ma20, ema89)
// Short Signal: Price is below the 200MA and 20MA crosses below 89EMA
shortSignal = (close < ma200) and (strategy.position_size == 0) and ta.crossunder(ma20, ema89)

// Plot Entry Signals (Circles for Reference)
plotshape(longSignal, title="Long Signal", style=shape.circle, location=location.belowbar, color=color.green, size=size.normal)
plotshape(shortSignal, title="Short Signal", style=shape.circle, location=location.abovebar, color=color.red, size=size.normal)

// 5. Position Entry and SL/TP Setup (Fixed ATR at Entry)
if longSignal
    entryPrice = close
    lockedATR  = atrValue
    longStopPrice = entryPrice - lockedATR * stopLossMultiplier
    longTakeProfitPrice = entryPrice + lockedATR * takeProfitMultiplier
    strategy.entry("Long", strategy.long)
    strategy.exit("Long_Exit", "Long", stop=longStopPrice, limit=longTakeProfitPrice)

if shortSignal
    entryPrice = close
    lockedATR  = atrValue
    shortStopPrice = entryPrice + lockedATR * stopLossMultiplier
    shortTakeProfitPrice = entryPrice - lockedATR * takeProfitMultiplier
    strategy.entry("Short", strategy.short)
    strategy.exit("Short_Exit", "Short", stop=shortStopPrice, limit=shortTakeProfitPrice)

```

> Detail

https://www.fmz.com/strategy/488268

> Last Modified

2025-03-26 13:42:55
