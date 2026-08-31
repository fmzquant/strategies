
> Name

动态双EMA趋势捕捉与ATR风控量化策略-Dynamic-Dual-EMA-Trend-Capture-with-ATR-Risk-Management-Quantitative-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d9085caa24ecec4880f6.png)
![IMG](https://www.fmz.com/upload/asset/2d87eb27f5328c37f3e16.png)



#### Overview

This quantitative trading strategy is a scalping system based on dual EMA (Exponential Moving Average) crossover signals combined with ATR (Average True Range) dynamic risk management. The core of the strategy utilizes the crossover relationship between a fast 9-period EMA and a slow 15-period EMA to capture short-term market trend changes, incorporates a price confirmation mechanism to filter false signals, and dynamically sets stop-loss positions through the ATR indicator, automatically calculating take-profit targets with a fixed risk-reward ratio (default 1:1.5). This strategy is suitable for ultra-short-term charts such as 1-minute and 3-minute timeframes, specifically designed for scalpers, providing clear entry signals, risk management mechanisms, and automated alert functionality.

#### Strategy Principles

The core principle of this strategy is based on the relationship between fast and slow moving averages to determine short-term trend direction:

1. Long Entry Conditions:
   - When the 9-period EMA crosses above the 15-period EMA (golden cross formation)
   - Price closes above both EMAs (as confirmation signal)
   - Enter long at the opening of the next candle after conditions are met
   - Stop-loss is set at 1x ATR distance below the entry point
   - Take-profit target is set at 1.5 times the stop-loss distance (adjustable)

2. Short Entry Conditions:
   - When the 9-period EMA crosses below the 15-period EMA (death cross formation)
   - Price closes below both EMAs (as confirmation signal)
   - Enter short at the opening of the next candle after conditions are met
   - Stop-loss is set at 1x ATR distance above the entry point
   - Take-profit target is set at 1.5 times the stop-loss distance (adjustable)

The strategy implements complete trading logic in Pine Script, including signal generation, dynamic stop-loss calculation, risk-reward settings, and chart visualization features. The system captures EMA crossover signals using built-in functions ta.crossover and ta.crossunder, and calculates dynamic stop-loss distances using ta.atr, ensuring risk control adaptability in different volatility environments.

#### Strategy Advantages

1. Clear and Definitive Signals: The dual EMA crossover provides visually intuitive trend change signals, and with the price confirmation mechanism, effectively reduces interference from false signals.

2. Dynamic Risk Management: Using the ATR indicator to dynamically adjust stop-loss distances allows the strategy to adapt to different market volatility characteristics, narrowing stops in low volatility environments and widening them in high volatility environments, better reflecting actual market conditions.

3. Fixed Risk-Reward Ratio: The strategy incorporates a built-in 1:1.5 risk-reward setting (adjustable), ensuring traders have a clear risk-return expectation for each trade, contributing to long-term stable profitability.

4. Automated Alert Functionality: Through TradingView's alert feature, traders can receive entry signals in real-time without constant chart monitoring, improving operational efficiency.

5. Parameter Adjustability: The strategy allows adjustment of EMA periods, risk-reward ratio, and stop-loss multiplier, enabling traders to customize settings according to personal risk preferences and instrument characteristics.

6. Concise and Efficient Strategy Code: The entire strategy logic is clear, with compact code structure that is easy to understand and modify, suitable for traders to further optimize and expand.

#### Strategy Risks

1. Ranging Market Risk: In sideways consolidating markets, EMAs frequently cross, generating numerous false signals that may lead to consecutive stop-losses. Mitigation: Pause using the strategy when the market is clearly range-bound, or add filtering conditions such as trend strength indicators.

2. Slippage and Trading Cost Impact: As a scalping strategy, frequent trading generates higher transaction costs, and may face slippage issues in less liquid markets. Mitigation: Appropriately reduce trading frequency and select more liquid trading instruments.

3. Sudden Market Movement Risk: Major news events may cause gaps or violent fluctuations, rendering stop-losses ineffective. Mitigation: Set maximum loss limits and pause trading before major news releases.

4. Parameter Optimization Overfitting: Excessive parameter adjustment to fit historical data may lead to poor strategy performance in the future. Mitigation: Use fixed parameters for sufficiently long backtesting periods and reserve out-of-sample data for validation.

5. Technical Failure Risk: Automated trading systems relying on platform and network connections may face technical failures. Mitigation: Set up backup trading plans and regularly check system stability.

#### Strategy Optimization Directions

1. Add Trend Filters: Incorporating longer-term trend indicators, such as MACD or ADX, to only open positions in the direction of the main trend can effectively reduce false signals in ranging markets. This optimization can improve win rates, as trading in alignment with larger timeframe trends typically offers more advantages.

2. Integrate Support and Resistance Levels: Adding automatically identified support and resistance levels to increase signal weight when buying near support or selling near resistance can improve entry point quality.

3. Optimize Take-Profit Strategy: Introducing dynamic take-profit mechanisms, such as trailing stops or multiple ATR-based take-profit targets, can capture more profit in trending markets.

4. Add Trading Session Filters: Based on the characteristics of active sessions in different markets, adding time filtering conditions to avoid market periods with lower or irregular volatility can improve signal quality.

5. Incorporate Volume Confirmation: Using volume as an auxiliary confirmation indicator, requiring signals to be accompanied by increased volume, can enhance the reliability of trend changes.

6. Risk Management Optimization: Automatically adjusting position size based on historical volatility, reducing positions in high volatility environments and appropriately increasing them in low volatility environments, to achieve a smoother equity curve.

#### Summary

The Dynamic Dual EMA Trend Capture with ATR Risk Management Quantitative Strategy is a scalping trading system that combines technical indicator crossover signals with dynamic risk management. By capturing short-term trend changes through the crossover relationship between 9-period and 15-period EMAs, and utilizing the ATR indicator to dynamically set stop-loss levels, it achieves quantified risk control. The strategy's main advantages lie in its clear signals, controllable risk, and adjustable parameters, making it suitable for scalpers. However, it may face increased false signals in ranging markets, requiring traders to apply it flexibly according to market conditions. Through improvements in trend filtering, support and resistance analysis, take-profit mechanism optimization, and other directions, the strategy's performance can be further enhanced. Overall, this is a quantitative trading strategy with solid foundations and clear logic that can be directly applied to live trading or used as a basic component of more complex trading systems.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-26 00:00:00
end: 2024-09-27 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("9 & 15 EMA Scalping Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Input Variables
fastEmaLength = input(9, title="Fast EMA Length")
slowEmaLength = input(15, title="Slow EMA Length")
riskRewardRatio = input.float(1.5, title="Risk-Reward Ratio") // 1:1.5 RR
slMultiplier = input.float(1.0, title="SL Multiplier") // Adjust SL distance

// EMA Calculation
fastEMA = ta.ema(close, fastEmaLength)
slowEMA = ta.ema(close, slowEmaLength)

// Conditions for Buy Entry
buyCondition = ta.crossover(fastEMA, slowEMA) and close > fastEMA and close > slowEMA

// Conditions for Sell Entry
sellCondition = ta.crossunder(fastEMA, slowEMA) and close < fastEMA and close < slowEMA

// Stop-Loss and Take-Profit Calculation
atrValue = ta.atr(14) // ATR for dynamic SL
longSL = close - (atrValue * slMultiplier)
longTP = close + ((close - longSL) * riskRewardRatio)

shortSL = close + (atrValue * slMultiplier)
shortTP = close - ((shortSL - close) * riskRewardRatio)

// Executing Trades
if buyCondition
    strategy.entry("BUY", strategy.long)
    strategy.exit("TP/SL Long", from_entry="BUY", stop=longSL, limit=longTP)

if sellCondition
    strategy.entry("SELL", strategy.short)
    strategy.exit("TP/SL Short", from_entry="SELL", stop=shortSL, limit=shortTP)

// Plot EMAs
plot(fastEMA, title="9 EMA", color=color.blue, linewidth=2)
plot(slowEMA, title="15 EMA", color=color.red, linewidth=2)

// Mark Buy/Sell Signals
plotshape(series=buyCondition, location=location.belowbar, color=color.green, style=shape.labelup, size=size.small, title="BUY Signal")
plotshape(series=sellCondition, location=location.abovebar, color=color.red, style=shape.labeldown, size=size.small, title="SELL Signal")

// Alerts
alertcondition(buyCondition, title="BUY Alert", message="BUY Signal - 9 EMA crossed above 15 EMA!")
alertcondition(sellCondition, title="SELL Alert", message="SELL Signal - 9 EMA crossed below 15 EMA!")

```

> Detail

https://www.fmz.com/strategy/488284

> Last Modified

2025-03-26 15:44:55
