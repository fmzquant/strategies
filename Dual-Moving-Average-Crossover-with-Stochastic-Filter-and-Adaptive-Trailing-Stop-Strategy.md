
> Name

Dual-Moving-Average-Crossover-with-Stochastic-Filter-and-Adaptive-Trailing-Stop-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d84b213ba31ad41dbf74.png)
![IMG](https://www.fmz.com/upload/asset/2d89c39fa522ba46a6ead.png)

## Strategy Overview

This strategy is a comprehensive trading system that combines moving average crossovers, Stochastic indicator filtering, and adaptive trailing stop loss. It primarily relies on crossover signals between a fast moving average (SMA 34) and a slow moving average (SMA 200), while using the Stochastic (9-3-3) indicator as an additional filter to enhance signal reliability. Additionally, the strategy incorporates a sophisticated risk management module, including fixed stop loss, take profit targets, and an automatically adjusting trailing stop function based on price movement. Notably, when profit reaches a preset threshold, the strategy automatically adjusts the stop loss to the entry price, protecting accumulated profits and achieving a "breakeven exit" risk control objective.

## Strategy Principles

The core logic of the strategy is built on several key components:

1. **Dual Moving Average System**: Uses 34-period and 200-period Simple Moving Averages (SMA), representing medium and long-term trends respectively. When the shorter-term moving average crosses above the longer-term moving average, it indicates an uptrend formation; conversely, when the shorter-term moving average crosses below the longer-term moving average, it signals a downtrend formation.

2. **Stochastic Indicator Filter**: Employs a Stochastic indicator with 9-3-3 parameters as a supplementary tool for market overbought/oversold conditions. For long signals, the Stochastic value must be above 20, avoiding entry during insufficient rebounds from oversold areas; for short signals, the Stochastic value must be below 80, avoiding entry during unconfirmed pullbacks from overbought areas.

3. **Entry Conditions**:
   - Long Entry: Price crosses above SMA 34, while SMA 34 is above SMA 200, and Stochastic %K line is greater than 20.
   - Short Entry: Price crosses below SMA 34, while SMA 34 is below SMA 200, and Stochastic %K line is less than 80.

4. **Risk Management Mechanism**:
   - Fixed Stop Loss: Set at 2% from entry price.
   - Take Profit: Set at 4% from entry price.
   - Breakeven Function: When profit reaches 2%, stop loss automatically moves to entry price (for long positions) or down to entry price (for short positions), ensuring the trade at least doesn't lose money.

5. **Execution Logic**: The strategy implements automated trade execution through TradingView's strategy module, allocating 10% of account equity per trade.

## Strategy Advantages

1. **Combination of Trend Following and Oscillation**: By integrating a moving average system (trend following) with the Stochastic indicator (oscillator), this strategy can simultaneously capture trends and market conditions, improving entry timing accuracy.

2. **Multi-level Confirmation**: Entry signals must satisfy three conditions - price and moving average crossover, relative moving average positions, and Stochastic indicator status - effectively reducing false breakouts and incorrect signals.

3. **Reasonable Risk-Reward Ratio**: The strategy sets a stop loss at 2% and a profit target at 4%, creating a risk-reward ratio of 1:2, which aligns with healthy trading principles.

4. **Dynamic Breakeven Mechanism**: Through the breakevenTrigger parameter (2%), the strategy implements an automated breakeven function, ensuring trades don't turn from profitable to losing once the market has moved favorably to a certain extent.

5. **Visualization of Trading Signals**: The strategy displays buy and sell signals intuitively on the price chart, facilitating monitoring and analysis of strategy performance.

6. **Parameter Adjustability**: All key parameters can be adjusted through the input interface, including moving average periods, Stochastic parameters, stop loss percentage, profit target, and breakeven trigger point, giving the strategy good adaptability.

## Strategy Risks

1. **Trend Reversal Risk**: Although SMA 200 is used as a long-term trend filter, markets can experience rapid reversals in the short term, triggering stop losses. Solution: Consider incorporating volatility indicators and reduce position size or pause trading during periods of abnormally high volatility.

2. **Slippage and Trading Costs**: In real environments, the strategy may face slippage and trading cost issues that impact actual returns. Solution: Optimize trading frequency, avoid excessively frequent trading, or adjust entry conditions to require stronger signal confirmation.

3. **Parameter Sensitivity**: Strategy effectiveness highly depends on parameter settings, with different markets and timeframes potentially requiring different parameter combinations. Solution: Conduct backtesting optimization and preset different parameter configuration files for various market environments.

4. **Moving Average Lag**: Moving averages are inherently lagging indicators, potentially causing delayed entry or exit timing. Solution: Consider using Exponential Moving Averages (EMA) instead of Simple Moving Averages (SMA), or combine with other leading indicators for confirmation.

5. **Fixed Percentage Risk**: Using fixed stop loss percentages may not adapt to changes in market volatility. Solution: Design a dynamic stop loss mechanism based on ATR (Average True Range) to better align stop loss points with current market volatility characteristics.

## Strategy Optimization Directions

1. **Dynamically Adjusted Moving Average Periods**: Currently, the strategy uses fixed 34 and 200 period moving averages. Consider automatically adjusting moving average periods based on market volatility, using longer periods in high-volatility environments and shorter periods in low-volatility environments to improve adaptability.

2. **Add Volume Confirmation**: Current entry signals are based solely on price and indicators. Add volume conditions requiring significant volume increases when signals occur to confirm breakout validity.

3. **Multiple Timeframe Analysis**: Implement a multiple timeframe confirmation mechanism, for example, requiring that the trend direction in larger timeframes aligns with the trading direction, enhancing trade signal reliability.

4. **Optimize Trailing Stop Logic**: The current breakeven mechanism is relatively simple. Design more sophisticated trailing stop logic, such as dynamically setting trailing distances based on ATR, or gradually tightening trailing stops as profits increase.

5. **Add Market State Filters**: Introduce market state recognition mechanisms, such as using the ADX indicator to identify trend strength, adopting more aggressive parameter settings in strong trend markets and more conservative settings in oscillating markets.

6. **Optimize Stochastic Parameters**: Consider using adaptive Stochastic parameters instead of fixed 9-3-3 settings to better adapt to different market conditions.

## Summary

The "Dual Moving Average Crossover with Stochastic Filter and Adaptive Trailing Stop Strategy" is a well-structured trading system with clear logic that effectively integrates trend following, oscillator filtering, and risk management mechanisms. Through SMA 34 and SMA 200 crossovers combined with Stochastic indicator confirmation, this strategy can capture effective trend changes in the market while avoiding entries under unfavorable market conditions. Its adaptive breakeven mechanism, in particular, provides an important risk control measure for trading.

However, the strategy still has room for improvement, especially in terms of adaptability to different market environments. By introducing dynamic parameter adjustments, volume confirmation, multiple timeframe analysis, and other optimization measures, strategy performance can be further enhanced. For traders, understanding the logical principles behind the strategy and making appropriate adjustments based on personal risk tolerance and trading objectives is key to successfully applying this strategy.

Whether for long-term investors seeking stable returns or active traders looking for short-term trading opportunities, this strategy provides a structured framework that helps traders make more systematic and disciplined trading decisions in complex and changing markets.


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-26 00:00:00
end: 2025-02-23 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"SOL_USDT"}]
*/

//@version=6
strategy('[DRAGON]SMA 34 & SMA 200 with Stochastic 9-3-3 & Trailing Stop (Price Chart)', overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// Inputs for Moving Averages
SMA_fast_length = input.int(34, title='Fast SMA (34)', minval=1)
SMA_slow_length = input.int(200, title='Slow SMA (200)', minval=1)

// Inputs for Stochastic 9-3-3 (ใช้สำหรับเงื่อนไขเทรด แต่ไม่แสดงบนกราฟ)
stoK_length = input.int(9, title='Stochastic %K Length', minval=1)
stoD_length = input.int(3, title='Stochastic %D Smoothing', minval=1)
sto_smoothK = input.int(3, title='Stochastic Smoothing', minval=1)

// Define Stop Loss, Take Profit & Trailing Stop
stopLossPercent = input.float(2, title='Stop Loss %') / 100
takeProfitPercent = input.float(4, title='Take Profit %') / 100
breakevenTrigger = input.float(2, title='Move SL to BE when Profit Reaches (%)') / 100

// Calculate SMAs
sma34 = ta.sma(close, SMA_fast_length)
sma200 = ta.sma(close, SMA_slow_length)

// Calculate Stochastic (สำหรับใช้ในเงื่อนไขเทรด)
stoK = ta.sma(ta.stoch(close, high, low, stoK_length), sto_smoothK)
stoD = ta.sma(stoK, stoD_length)

// Plot Moving Averages บนกราฟราคา
plot(sma34, color=color.blue, title='SMA 34')
plot(sma200, color=color.red, title='SMA 200')

// Define Entry Conditions โดยมีเงื่อนไขจาก Stochastic
buySignal = ta.crossover(close, sma34) and sma34 > sma200 and stoK > 20
sellSignal = ta.crossunder(close, sma34) and sma34 < sma200 and stoK < 80

// Calculate Stop Loss & Take Profit Levels
longSL = strategy.position_avg_price * (1 - stopLossPercent)
longTP = strategy.position_avg_price * (1 + takeProfitPercent)
shortSL = strategy.position_avg_price * (1 + stopLossPercent)
shortTP = strategy.position_avg_price * (1 - takeProfitPercent)

// กำหนด Breakeven เมื่อได้กำไรตามที่ตั้งไว้
longBreakeven = strategy.position_avg_price * (1 + breakevenTrigger)
shortBreakeven = strategy.position_avg_price * (1 - breakevenTrigger)

longStop = close >= longBreakeven ? strategy.position_avg_price : longSL
shortStop = close <= shortBreakeven ? strategy.position_avg_price : shortSL

// Execute Trades
if buySignal
    strategy.entry('Long', strategy.long)
    strategy.exit('Long Exit', from_entry='Long', stop=longStop, limit=longTP)

if sellSignal
    strategy.entry('Short', strategy.short)
    strategy.exit('Short Exit', from_entry='Short', stop=shortStop, limit=shortTP)

// Plot Buy/Sell Signals บนกราฟราคา
plotshape(buySignal, location=location.belowbar, color=color.lime, style=shape.labelup, title='Buy Signal')
plotshape(sellSignal, location=location.abovebar, color=color.red, style=shape.labeldown, title='Sell Signal')

```

> Detail

https://www.fmz.com/strategy/483679

> Last Modified

2025-02-25 11:05:17
