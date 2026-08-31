
> Name

布林带交叉与滑点价格影响组合策略-Bollinger-Band-Crossover-with-Slippage-and-Price-Impact-Combined-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a084a5fc5d3e28e8f4.png)


#### Overview

This strategy is a comprehensive trading system based on Bollinger Band crossover signals that incorporates slippage and price impact considerations. It utilizes the upper and lower bands of the Bollinger Bands to identify potential overbought and oversold areas, while accounting for slippage and price impact factors when executing trades to better simulate real market conditions. This approach aims to enhance the reliability and practicality of the trading strategy, particularly suitable for markets with high volatility.

#### Strategy Principles

1. Bollinger Bands Calculation:
   - Uses a 20-period Simple Moving Average (SMA) as the middle band.
   - Upper and lower bands are set at 2 standard deviations above and below the middle band.

2. Trading Signals:
   - A long signal is triggered when the price breaks above the upper band.
   - A short signal is triggered when the price breaks below the lower band.

3. Slippage and Price Impact Adjustment:
   - Considers 40% slippage and 40% price impact.
   - Buy price = Current price + Slippage adjustment + Price impact adjustment
   - Sell price = Current price - Slippage adjustment - Price impact adjustment

4. Position Closing Conditions:
   - Long positions are closed when a short signal is triggered.
   - Short positions are closed when a long signal is triggered.

#### Strategy Advantages

1. Market Volatility Adaptation: Bollinger Bands automatically adjust to market volatility, ensuring strategy effectiveness across different market environments.

2. Trend Following and Reversal Combination: Through Bollinger Band crossover signals, the strategy can capture both trend continuation and potential reversal opportunities.

3. Practical Trading Cost Consideration: Incorporating slippage and price impact factors makes the strategy more aligned with real trading environments, improving the credibility of backtesting results.

4. Risk Management: Using Bollinger Bands as dynamic support and resistance levels helps control risk.

5. Flexibility: The parameterized design allows for optimization and adjustment according to different markets and trading instruments.

#### Strategy Risks

1. Overtrading: In ranging markets, price may frequently cross the Bollinger Bands, leading to excessive unnecessary trades.

2. Lag: As a lagging indicator, Bollinger Bands may not react timely to rapid trend changes.

3. High Slippage and Price Impact: The 40% slippage and price impact settings may be too high, making actual trades difficult to execute or potentially causing significant losses.

4. False Breakout Risk: Price briefly breaking through the Bollinger Bands before retracing may trigger false trading signals.

5. Lack of Additional Confirmation: Relying solely on Bollinger Band signals without confirmation from other technical indicators or fundamental analysis.

#### Strategy Optimization Directions

1. Introduce Volume Indicators: Combining volume analysis can help confirm the validity of breakouts, reducing risks from false breakouts.

2. Add Trend Filters: Such as using long-term moving averages or the ADX indicator to ensure trading in the direction of the main trend.

3. Optimize Slippage and Price Impact Parameters: Adjust slippage and price impact percentages based on actual market data to better reflect real trading conditions.

4. Implement Dynamic Stop-Loss: Consider using the ATR indicator to set dynamic stop-losses, adapting to changes in market volatility.

5. Incorporate Time Filters: Avoid trading during low volatility sessions (e.g., Asian session) to reduce noise signals.

6. Optimize Bollinger Band Parameters: Experiment with different Bollinger Band lengths and multipliers to find the most suitable settings for the target market.

7. Introduce Machine Learning Algorithms: Utilize machine learning techniques to optimize entry and exit timing, improving overall strategy performance.

#### Conclusion

The Bollinger Band Crossover with Slippage and Price Impact Combined Strategy is a comprehensive trading system that combines technical analysis with practical trading considerations. By capturing market dynamics through the Bollinger Bands indicator and accounting for slippage and price impact, this strategy aims to provide a more realistic trading approach. However, the strategy still faces potential risks such as overtrading and false breakouts. By introducing additional confirmation indicators, optimizing parameter settings, and strengthening risk management, this strategy has the potential to become a more robust and reliable trading system. Future optimization should focus on improving signal quality, reducing false breakouts, and better adapting to different market conditions. Overall, this strategy provides an interesting starting point for quantitative traders to conduct further research and improvements.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-07-25 00:00:00
end: 2024-07-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Combined Strategy", overlay=true)

// Input parameters for Bollinger Band Strategy
bb_length = input.int(20, title="BB Length")
bb_mult = input.float(2.0, title="BB Mult")

// Input parameters for Slippage and Price Impact
slippage_percent = input.float(40.0, title="Slippage (%)") / 100  // 40% slippage
price_impact_percent = input.float(40.0, title="Price Impact (%)") / 100  // 40% price impact

// Calculating Bollinger Bands
basis_bb = ta.sma(close, bb_length)
deviation = bb_mult * ta.stdev(close, bb_length)
upper = basis_bb + deviation
lower = basis_bb - deviation

// Entry and exit conditions for Bollinger Band Strategy
longCondition = ta.crossover(close, upper)
shortCondition = ta.crossunder(close, lower)
closeLongCondition = shortCondition
closeShortCondition = longCondition

// Adjust entry price for slippage and price impact
slippage_adjustment = close * slippage_percent
price_impact_adjustment = close * price_impact_percent
slippage_price_impact_adjusted_long_price = close + slippage_adjustment + price_impact_adjustment
slippage_price_impact_adjusted_short_price = close - slippage_adjustment - price_impact_adjustment

// Strategy logic for Bollinger Band Strategy
if (longCondition)
    strategy.entry("Long", strategy.long, limit=slippage_price_impact_adjusted_long_price)
    
if (shortCondition)
    strategy.entry("Short", strategy.short, limit=slippage_price_impact_adjusted_short_price)

if (closeLongCondition)
    strategy.close("Long")
    
if (closeShortCondition)
    strategy.close("Short")

// Plotting Bollinger Bands
plot(upper, color=color.blue)
plot(lower, color=color.red)

```

> Detail

https://www.fmz.com/strategy/458241

> Last Modified

2024-07-31 11:25:52
