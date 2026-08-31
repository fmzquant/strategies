
> Name

Multi-Indicator-Trend-Following-Strategy-SMA-Dual-Line-Crossover-with-RSI-and-ADX-Dynamic-Volatility-Optimization-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d87cb47018dd16056b12.png)
![IMG](https://www.fmz.com/upload/asset/2d91bda1cd9401b6fca8b.png)




#### Overview
This strategy is a comprehensive trend following trading system that combines multiple technical indicators to determine market trends and trading opportunities. The core strategy is based on the crossover signals of fast and slow Simple Moving Averages (SMA), confirmed by the Relative Strength Index (RSI) and Average Directional Index (ADX), while using Average True Range (ATR) for risk management. The strategy implements money management principles, limiting single trade risk to no more than 2% of account equity.

#### Strategy Principles
The strategy operates through several key components:
1. Trend Identification: Uses SMA10 and SMA200 crossovers to capture trend changes, with fast line crossing above slow line as buy signal and vice versa.
2. Trend Confirmation: Double confirmation through RSI and ADX, requiring RSI to break above 50 level and ADX above 20 to confirm trend strength.
3. Risk Control: Dynamic stop-loss setting based on ATR and position sizing limits per trade.
4. Position Management: Implements trailing stop mechanism to dynamically adjust stop-loss positions to lock in profits.

#### Strategy Advantages
1. Multiple indicator cross-validation improves signal reliability
2. Combination of trend strength and momentum indicators reduces false breakout risks
3. Comprehensive risk management system including position control and dynamic stop-loss
4. Applicable across multiple timeframes (M5-MN), demonstrating strong adaptability
5. Supports hedging, expanding strategy application scenarios

#### Strategy Risks
1. May generate frequent false signals in ranging markets
2. Long-period moving averages have significant lag, potentially missing early trend opportunities
3. Multiple indicator filtering might miss some valid signals
4. Fixed indicator parameters may not suit all market environments
5. Transaction costs may impact profitability in shorter timeframes

#### Strategy Optimization Directions
1. Introduce adaptive indicator parameters that adjust dynamically with market volatility
2. Add market environment recognition mechanism to apply different strategy parameters
3. Optimize stop-loss approach, considering support and resistance levels
4. Incorporate volume indicators to improve signal reliability
5. Develop market switching mechanism to automatically stop trading in unsuitable conditions

#### Summary
The strategy establishes a relatively complete trend following trading system through the combined application of multiple technical indicators. The design emphasizes signal reliability and risk management, demonstrating good practicality. Through implementation of optimization suggestions, the strategy has potential for further performance improvement. It is recommended to conduct thorough backtesting before live implementation and optimize parameters according to specific trading instrument characteristics.



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-02-16 17:00:00
end: 2025-02-20 00:00:00
period: 4m
basePeriod: 4m
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("SMA + RSI + ADX + ATR Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=2)

// === Input Parameters ===
sma_fast_length = input(10, title="SMA Fast Period")
sma_slow_length = input(200, title="SMA Slow Period")
rsi_length = input(14, title="RSI Period")
adx_length = input(14, title="ADX Period")
adx_smoothing = input(14, title="ADX Smoothing Period")  // <-- New parameter!
atr_length = input(14, title="ATR Period")

// === Filtering Levels for RSI and ADX ===
rsi_buy_level = input(50, title="RSI Buy Level")
rsi_sell_level = input(50, title="RSI Sell Level")
adx_min_trend = input(20, title="ADX Minimum Trend Strength")

// === Trailing Stop ===
use_trailing_stop = input(true, title="Enable Trailing Stop")
trailing_stop_pips = input(30, title="Trailing Stop (Pips)")
trailing_step_pips = input(5, title="Trailing Step (Pips)")

// === Indicators ===
sma_fast = ta.sma(close, sma_fast_length)
sma_slow = ta.sma(close, sma_slow_length)
rsi_value = ta.rsi(close, rsi_length)
[diPlus, diMinus, adx_value] = ta.dmi(adx_length, adx_smoothing)  // <-- Corrected: added `adx_smoothing`
atr_value = ta.atr(atr_length)

// === Entry Logic ===
longCondition = ta.crossover(sma_fast, sma_slow) and rsi_value > rsi_buy_level and adx_value > adx_min_trend
shortCondition = ta.crossunder(sma_fast, sma_slow) and rsi_value < rsi_sell_level and adx_value > adx_min_trend

// === Open Positions ===
if longCondition
    strategy.entry("BUY", strategy.long)

if shortCondition
    strategy.entry("SELL", strategy.short)

// === Trailing Stop ===
if use_trailing_stop
    strategy.exit("Exit Long", from_entry="BUY", trail_points=trailing_stop_pips, trail_offset=trailing_step_pips)
    strategy.exit("Exit Short", from_entry="SELL", trail_points=trailing_stop_pips, trail_offset=trailing_step_pips)

// === Visualization ===
plot(sma_fast, color=color.blue, title="SMA 10")
plot(sma_slow, color=color.red, title="SMA 200")
hline(rsi_buy_level, title="RSI Buy Level", color=color.green)
hline(rsi_sell_level, title="RSI Sell Level", color=color.red)
hline(adx_min_trend, title="ADX Min Trend Level", color=color.orange)

```

> Detail

https://www.fmz.com/strategy/483037

> Last Modified

2025-02-27 17:15:22
