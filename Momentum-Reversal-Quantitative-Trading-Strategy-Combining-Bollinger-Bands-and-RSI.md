
> Name

Momentum-Reversal-Quantitative-Trading-Strategy-Combining-Bollinger-Bands-and-RSI

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d7db13ee846e3f67c912.png)
![IMG](https://www.fmz.com/upload/asset/2d8cacc0a9eefaff69d48.png)




#### Overview
This strategy is a technical analysis trading system that combines Bollinger Bands and Relative Strength Index (RSI). It seeks trading opportunities in overbought and oversold areas by utilizing price volatility and market momentum characteristics. The strategy generates buy signals when RSI indicates oversold conditions (below 30) and price breaks above the lower Bollinger Band; sell signals are generated when RSI indicates overbought conditions (above 70) and price breaks below the upper Bollinger Band. The middle Bollinger Band is used as a stop-loss position.

#### Strategy Principles
The core logic of the strategy is based on the following key elements:
1. Bollinger Bands parameters use 20-period moving average as the middle band, with a standard deviation multiplier of 2.0
2. RSI uses the traditional 14-period setting
3. Entry conditions:
   - Buy: price breaks above lower Bollinger Band and RSI<30
   - Sell: price breaks below upper Bollinger Band and RSI>70
4. Exit conditions: positions are closed when price crosses the middle Bollinger Band (20-period moving average)
This combination considers both price statistics and momentum indicators, effectively improving trading accuracy.

#### Strategy Advantages
1. Multiple confirmation mechanism: combines price and momentum indicators to reduce false signals
2. Reasonable risk control: uses middle Bollinger Band as stop-loss point for both profit protection and risk control
3. Strong adaptability: Bollinger Bands automatically adjust bandwidth based on market volatility
4. Classic parameter settings: uses widely validated parameter combinations for strategy stability
5. Clear logic: trading rules are explicit, facilitating backtesting and live trading

#### Strategy Risks
1. Choppy market risk: may generate frequent trading signals in sideways markets
2. Trend market risk: might miss part of strong trends
3. Parameter sensitivity: strategy performance is significantly affected by Bollinger Bands period and RSI settings
4. Slippage impact: may face significant slippage during rapid price movements
Recommended risk management measures:
- Set appropriate position sizing
- Add trend filters
- Optimize parameter adaptation mechanism
- Consider trading costs in backtesting

#### Strategy Optimization Directions
1. Dynamic parameter optimization:
   - Dynamically adjust Bollinger Bands parameters based on market volatility
   - Adjust RSI thresholds based on market conditions
2. Add auxiliary indicators:
   - Include volume confirmation
   - Consider trend indicators as filters
3. Improve stop-loss mechanism:
   - Implement trailing stops
   - Set maximum loss limits
4. Optimize trade execution:
   - Implement partial position trading
   - Add entry price optimization logic

#### Conclusion
This strategy constructs a relatively complete trading system by combining Bollinger Bands and RSI indicators. The strategy logic is clear, risk control is reasonable, and it has practical value. Through the suggested optimization directions, there is room for further improvement. In practical application, investors are advised to make appropriate adjustments based on their risk tolerance and market conditions.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-07-15 00:00:00
end: 2025-02-18 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BNB_USDT"}]
*/

//@version=5
strategy("Bollinger Bands + RSI Strategy", overlay=true)

// Bollinger Bands parameters
length = input.int(20, title="Bollinger Bands Length")
src = input(close, title="Source")
mult = input.float(2.0, title="Bollinger Bands Multiplier")

basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upper_band = basis + dev
lower_band = basis - dev

// RSI parameters
rsi_length = input.int(14, title="RSI Length")
rsi = ta.rsi(src, rsi_length)

// Plot Bollinger Bands
plot(upper_band, color=color.red, linewidth=2, title="Upper Bollinger Band")
plot(lower_band, color=color.green, linewidth=2, title="Lower Bollinger Band")
plot(basis, color=color.blue, linewidth=1, title="Middle Band")

// Buy Condition
buy_condition = ta.crossover(close, lower_band) and rsi < 30
if buy_condition
    strategy.entry("Buy", strategy.long)

// Sell Condition
sell_condition = ta.crossunder(close, upper_band) and rsi > 70
if sell_condition
    strategy.entry("Sell", strategy.short)

// Exit Conditions (optional: use the middle Bollinger Band for exits)
exit_condition = ta.cross(close, basis)
if exit_condition
    strategy.close("Buy")
    strategy.close("Sell")

// Optional: Plot RSI for additional insight
hline(70, "Overbought", color=color.red)
hline(30, "Oversold", color=color.green)
plot(rsi, color=color.purple, title="RSI", linewidth=1, offset=-5)


```

> Detail

https://www.fmz.com/strategy/482887

> Last Modified

2025-02-20 16:38:15
