
> Name

Multi-Timeframe-Quantitative-Trading-Strategy-Based-on-EMA-Smoothed-RSI-and-ATR-Dynamic-Stop-Loss-Take-Profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6a0e8c36fb4af3f534.png)


#### Overview
This strategy is a comprehensive quantitative trading system based on the Relative Strength Index (RSI), Exponential Moving Average (EMA), and Average True Range (ATR). The strategy smooths RSI using EMA, triggers trades through RSI breakouts at key levels, and utilizes ATR for dynamic stop-loss and take-profit levels to achieve effective risk control. Additionally, the strategy includes trade signal counting and recording functions to assist traders in backtesting and optimization.

#### Strategy Principle
The core logic includes the following key components:
1. Uses 14-period RSI to calculate market overbought/oversold conditions
2. Smooths RSI through EMA to reduce false signals
3. Generates trading signals when RSI breaks through key levels of 70 and 30
4. Uses ATR for dynamic calculation of stop-loss and take-profit levels
5. Establishes a trade signal counting table to record price information for each trade

#### Strategy Advantages
1. Strong Signal Smoothing: RSI smoothing through EMA effectively reduces false breakout signals
2. Comprehensive Risk Control: Dynamic stop-loss using ATR adapts to market volatility
3. Bi-directional Trading: Supports both long and short trading to capture market opportunities
4. Parameter Adjustability: Key parameters can be customized for different market characteristics
5. Visual Monitoring: Records trading signals in a table for strategy monitoring and backtesting

#### Strategy Risks
1. RSI False Breakout Risk: Even with EMA smoothing, RSI may still generate false breakout signals
2. ATR Stop-Loss Inadequacy: Improper ATR multiplier settings may lead to loose or tight stops
3. Parameter Optimization Risk: Over-optimization may result in strategy overfitting
4. Market Environment Dependency: Performance may vary significantly between trending and ranging markets

#### Strategy Optimization
1. Introduce Multi-timeframe Analysis: Incorporate longer timeframe RSI signals for trade confirmation
2. Optimize Stop-Loss Mechanism: Consider dynamic ATR multiplier adjustment based on support/resistance
3. Add Market Environment Analysis: Include trend indicators to adjust strategy parameters
4. Improve Signal Filtering: Consider adding volume indicators to filter false breakouts
5. Implement Position Sizing: Dynamically adjust position size based on signal strength and volatility

#### Summary
The strategy combines three classic technical indicators - RSI, EMA, and ATR - to build a complete quantitative trading system. It demonstrates strong practicality in signal generation, risk control, and trade execution. Through continuous optimization and improvement, the strategy shows promise for stable performance in live trading. However, users need to consider the impact of market conditions on strategy performance, set parameters appropriately, and maintain proper risk control.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-04 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("RSI Trading Strategy with EMA and ATR Stop Loss/Take Profit", overlay=true)
length = input.int(14, minval=1, title="RSI Length")
src = input(close, title="Source")
rsi = ta.rsi(src, length)
smoothingLength = input.int(14, minval=1, title="Smoothing Length")
smoothedRsi = ta.ema(rsi, smoothingLength)  // استفاده از EMA برای صاف کردن RSI
atrLength = input.int(14, title="ATR Length")
atrMultiplier = input.float(1, title="ATR Multiplier")
atrValue = ta.atr(atrLength)  // محاسبه ATR
level1 = 30
level2 = 70

// تنظیمات استراتژی
var table crossingTable = table.new(position.top_right, 2, 5, border_width=1)
var int crossCount = 0
var float crossPrice = na

// شرط ورود به معامله خرید زمانی که RSI از سطح 70 به بالا عبور می‌کند
if (ta.crossover(smoothedRsi, level2))
    strategy.entry("Long", strategy.long)
    // تنظیم حد سود و حد ضرر
    strategy.exit("Take Profit/Stop Loss", "Long", stop=close - atrMultiplier * atrValue, limit=close + atrMultiplier * atrValue, comment="")
    crossCount := crossCount + 1
    crossPrice := close

// شرط ورود به معامله فروش زمانی که RSI از سطح 70 به پایین عبور می‌کند
if (ta.crossunder(smoothedRsi, level2))
    strategy.entry("Short", strategy.short)
    // تنظیم حد سود و حد ضرر
    strategy.exit("Take Profit/Stop Loss", "Short", stop=close + atrMultiplier * atrValue, limit=close - atrMultiplier * atrValue, comment="")
    crossCount := crossCount + 1
    crossPrice := close

// شرط ورود به معامله خرید زمانی که RSI از سطح 30 به بالا عبور می‌کند
if (ta.crossover(smoothedRsi, level1))
    strategy.entry("Long", strategy.long)
    // تنظیم حد سود و حد ضرر
    strategy.exit("Take Profit/Stop Loss", "Long", stop=close - atrMultiplier * atrValue, limit=close + atrMultiplier * atrValue, comment="")
    crossCount := crossCount + 1
    crossPrice := close

// شرط ورود به معامله فروش زمانی که RSI از سطح 30 به پایین عبور می‌کند
if (ta.crossunder(smoothedRsi, level1))
    strategy.entry("Short", strategy.short)
    // تنظیم حد سود و حد ضرر
    strategy.exit("Take Profit/Stop Loss", "Short", stop=close + atrMultiplier * atrValue, limit=close - atrMultiplier * atrValue, comment="")
    crossCount := crossCount + 1
    crossPrice := close

if (not na(crossPrice))
    table.cell(crossingTable, 0, crossCount % 5, text=str.tostring(crossCount), bgcolor=color.green)
    table.cell(crossingTable, 1, crossCount % 5, text=str.tostring(crossPrice), bgcolor=color.green)

// ترسیم خطوط و مقادیر RSI
plot(smoothedRsi, title="Smoothed RSI", color=color.blue)
hline(level1, "Level 30", color=color.red)
hline(level2, "Level 70", color=color.green)

```

> Detail

https://www.fmz.com/strategy/477608

> Last Modified

2025-01-06 16:43:14
