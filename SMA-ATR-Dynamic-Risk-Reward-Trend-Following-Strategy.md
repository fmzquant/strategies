
> Name

SMA-ATR-Dynamic-Risk-Reward-Trend-Following-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8400f5418a52a57bb7b.png)
![IMG](https://www.fmz.com/upload/asset/2d8cabb1eab6f0ec2ae59.png)



#### Overview

The SMA-ATR Dynamic Risk-Reward Trend Following Strategy is a technical analysis-driven quantitative trading system that cleverly combines triple Simple Moving Averages (SMA) and Average True Range (ATR) indicators to identify market trends and execute trades. The core feature of this strategy is its dynamic risk-reward ratio, which automatically adjusts profit targets based on specific market conditions, thereby optimizing trading performance across different market environments. The strategy uses SMA crossovers with periods of 7, 25, and 99 to determine entry points, and utilizes the ATR indicator to set stop-loss and take-profit levels, forming a complete trend-following trading system.

#### Strategy Principles

The strategy operates based on a combination of multi-period moving average crossover systems and dynamic risk management:

1. **Trend Identification Mechanism**:
   - Uses triple SMAs (7, 25, and 99 periods) to establish a multi-layered trend confirmation system
   - Triggers a long signal when the short-term SMA (7-period) crosses above the medium-term SMA (25-period) and price is above the long-term SMA (99-period)
   - Triggers a short signal when the short-term SMA (7-period) crosses below the medium-term SMA (25-period) and price is below the long-term SMA (99-period)

2. **Dynamic Risk-Reward Ratio Adjustment**:
   - Default risk-reward ratio is 2.0
   - Under specific conditions (when short-term SMA crosses the long-term SMA or medium-term SMA), the risk-reward ratio automatically increases to 6.0
   - This adjustment allows the strategy to pursue higher profit targets when strong trend signals appear

3. **ATR-Based Risk Management**:
   - Uses 14-period ATR multiplied by a custom multiplier (default 1.0) to calculate volatility
   - Long stop-loss is set at the low minus the ATR value
   - Short stop-loss is set at the high plus the ATR value
   - Take-profit levels are calculated based on current price plus or minus (ATR multiplied by the risk-reward ratio)

The core logic of the strategy is to confirm trend direction through multi-period moving averages while dynamically adjusting the risk-reward ratio based on market conditions, pursuing higher returns in strong trending environments and implementing intelligent risk management.

#### Strategy Advantages

1. **Multi-Layered Trend Confirmation**:
   - Triple SMA system provides multi-layered trend confirmation, reducing false breakout trades
   - The combination of short, medium, and long-term SMAs effectively filters market noise
   - Price position relative to the long-term SMA provides additional trend confirmation, enhancing signal reliability

2. **Dynamic Risk Management**:
   - Risk-reward ratio automatically adjusts based on signal strength, optimizing capital management
   - Pursues higher returns when strong signals (such as short-term SMA crossing long-term SMA) occur
   - Flexible risk management framework adapts to different market conditions

3. **Volatility-Based Stop-Loss Strategy**:
   - ATR indicator ensures stop-loss levels are set based on actual market volatility
   - Adaptive stop-loss mechanism automatically widens stop-loss range when volatility increases and narrows it when volatility decreases
   - Stop-loss design considers natural price fluctuations, reducing the probability of being triggered by market noise

4. **Complete Trading System**:
   - Strategy includes clear entry, exit, and risk management rules, forming a complete trading system
   - Automated execution reduces emotional interference
   - Adaptive parameter adjustments suitable for different market conditions

#### Strategy Risks

1. **Trend Reversal Risk**:
   - As a trend-following strategy, it may perform poorly in ranging markets or during rapid reversals
   - The triple SMA system may generate frequent false signals in oscillating markets
   - Mitigation method: Additional filters (such as volatility indicators or momentum confirmation) can be added to reduce trading frequency in oscillating markets

2. **Limitations of Fixed ATR Multiplier**:
   - The current strategy uses a fixed ATR multiplier (1.0), which may not be suitable for all market environments
   - During periods of extreme volatility, a fixed multiplier may result in stop-losses that are too wide or too narrow
   - Solution: Consider implementing an adaptive ATR multiplier that dynamically adjusts based on historical volatility statistics

3. **Parameter Sensitivity**:
   - The selection of SMA periods (7, 25, 99) may significantly impact strategy performance
   - Risk of over-optimization - specific parameter combinations may only perform well under specific market conditions
   - Risk mitigation: Conduct robustness testing to evaluate the impact of small parameter changes on strategy performance

4. **Slippage and Liquidity Risk**:
   - May face execution slippage issues in low liquidity markets or during high volatility periods
   - ATR-based stop-losses and take-profits may not be sufficient to protect capital under extreme market conditions
   - Solution: Increase margin requirements, reduce position size, or pause trading during abnormally high volatility

#### Strategy Optimization Directions

1. **Add Signal Filtering Mechanisms**:
   - Incorporate trend strength indicators (such as ADX), only trading when trend strength reaches a threshold
   - Integrate volume confirmation, requiring increased volume when signals appear to improve signal quality
   - Rationale: Multi-indicator confirmation can significantly reduce false signals and improve win rate

2. **Implement Adaptive Parameters**:
   - Change fixed SMA periods to dynamic parameters that automatically adjust based on market volatility or cyclicality
   - Adjust the ATR multiplier based on historical volatility statistics, using smaller multipliers during low volatility periods and larger multipliers during high volatility periods
   - Benefit: Adaptive parameters can better accommodate different market environments, improving strategy robustness

3. **Optimize Dynamic Risk-Reward Adjustment Mechanism**:
   - Transform the current binary risk-reward mechanism (2.0 or 6.0) into a continuous adjustment model
   - Dynamically adjust the risk-reward ratio based on trend strength indicators (such as ADX), market volatility, or recent trading performance
   - Improvement rationale: More detailed risk-reward adjustments can more accurately reflect market conditions, optimizing capital management effects

4. **Add Time Filters**:
   - Analyze strategy performance across different time periods (intraday, daily, weekly), avoiding trading during underperforming periods
   - Consider market seasonality factors, adjusting trading frequency in specific market environments
   - Advantage: Time filtering can avoid trading during statistically unfavorable periods, improving overall performance

5. **Integrate Machine Learning Models**:
   - Use machine learning algorithms to predict the reliability of SMA crossover signals
   - Train models based on historical data to identify high-probability profitable market patterns
   - Value: Machine learning can discover complex patterns difficult to capture with traditional technical indicators, enhancing strategy prediction capabilities

#### Summary

The SMA-ATR Dynamic Risk-Reward Trend Following Strategy provides a well-structured trend-following trading system that identifies market trends through multi-period moving averages and implements dynamic risk management using the ATR indicator. The most significant innovation of the strategy is its automatic adjustment of the risk-reward ratio based on specific market conditions, allowing the trading system to pursue higher returns in strong trending environments while maintaining robust risk control during regular trading.

This strategy combines classic elements of technical analysis (SMA crossovers, ATR stop-losses) with modern quantitative trading concepts (dynamic risk management), making it suitable for medium to long-term trend-following trading. While the strategy may face challenges in oscillating markets, through the suggested optimization directions (such as adding filters, adaptive parameters, and machine learning integration), its performance across different market environments can be further improved.

Overall, this is a quantitative trading strategy that balances simplicity and effectiveness, providing trend-following traders with a reliable framework while enhancing the strategy's adaptability and profit potential through dynamic risk management elements.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-14 00:00:00
end: 2024-11-27 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("TRH Backtest SMA ATR Variable RR", overlay=true)

// SMA Settings
sma7 = ta.sma(close, 7)
sma25 = ta.sma(close, 25)
sma99 = ta.sma(close, 99)

// ATR Settings
atrLength = input.int(14, title="ATR Length")
atrMultiplier = input.float(1.0, title="ATR Multiplier")
atr = ta.atr(atrLength) * atrMultiplier

// Entry and Exit Conditions
longCondition = ta.crossover(sma7, sma25) and close > sma99
shortCondition = ta.crossunder(sma7, sma25) and close < sma99
longCross = ta.crossover(sma7, sma99) or ta.crossover(sma7, sma25)
shortCross = ta.crossunder(sma7, sma99) or ta.crossunder(sma7, sma25)

// Trade Execution
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

// Variable Risk Reward
riskRewardRatio = 2.0
if (longCross or shortCross)
    riskRewardRatio = 6.0

// ATR Based Stop Loss and Take Profit
longStopLoss = low - atr
shortStopLoss = high + atr
longTakeProfit = close + (atr * riskRewardRatio)
shortTakeProfit = close - (atr * riskRewardRatio)

// Apply Stop Loss and Take Profit
strategy.exit("Exit Long", "Long", stop=longStopLoss, limit=longTakeProfit)
strategy.exit("Exit Short", "Short", stop=shortStopLoss, limit=shortTakeProfit)

```

> Detail

https://www.fmz.com/strategy/486571

> Last Modified

2025-03-14 09:45:55
