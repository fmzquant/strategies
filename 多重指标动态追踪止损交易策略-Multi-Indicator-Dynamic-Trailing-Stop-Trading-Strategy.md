
> Name

多重指标动态追踪止损交易策略-Multi-Indicator-Dynamic-Trailing-Stop-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f35095851e66e1fd7b.png)


#### Overview
This strategy is a comprehensive trading system that combines Central Pivot Range (CPR), Exponential Moving Average (EMA), Relative Strength Index (RSI), and breakout logic. The strategy employs an ATR-based dynamic trailing stop-loss mechanism, utilizing multiple technical indicators to identify market trends and trading opportunities while implementing dynamic risk management. It is suitable for intraday and medium-term trading, offering strong adaptability and risk control capabilities.

#### Strategy Principles
The strategy is based on several core components:
1. CPR indicator for determining key support and resistance levels, calculating daily pivot points, top and bottom levels.
2. Dual EMA system (9-day and 21-day) for trend direction identification through crossovers.
3. RSI indicator (14-day) for confirming overbought/oversold conditions and signal filtering.
4. Breakout logic incorporating price breaks of pivot points for signal confirmation.
5. ATR indicator for dynamic trailing stop-loss, adaptively adjusting stop distances based on market volatility.

#### Strategy Advantages
1. Integration of multiple technical indicators enhances signal reliability.
2. Dynamic trailing stop-loss mechanism effectively locks in profits and controls risk.
3. CPR indicator provides important price reference points for accurate market structure positioning.
4. Strategy demonstrates good adaptability with adjustable parameters for different market conditions.
5. RSI filter and breakout confirmation strengthen trading signal quality.

#### Strategy Risks
1. Multiple indicators may generate lagging and false signals in choppy markets.
2. Trailing stops might be triggered prematurely during high volatility periods.
3. Parameter optimization requires consideration of market characteristics; improper settings may affect strategy performance.
4. Signal conflicts may impact decision accuracy.

#### Strategy Optimization Directions
1. Incorporate volume indicators to confirm price breakout validity.
2. Add trend strength filters to improve trend following accuracy.
3. Optimize dynamic adjustment mechanism for stop-loss parameters to enhance protection.
4. Implement market volatility adaptation mechanism for dynamic parameter adjustment.
5. Consider adding sentiment indicators to improve market timing.

#### Summary
The strategy constructs a comprehensive trading system through the synergistic effect of multiple technical indicators. The dynamic stop-loss mechanism and multi-dimensional signal confirmation provide favorable risk-reward characteristics. Strategy optimization potential mainly lies in improving signal quality and refining risk management. Through continuous optimization and adjustment, the strategy shows promise in maintaining stable performance across various market conditions.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-06 00:00:00
end: 2025-01-04 08:00:00
period: 7h
basePeriod: 7h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Enhanced CPR + EMA + RSI + Breakout Strategy", overlay=true)

// Inputs
ema_short = input(9, title="Short EMA Period")
ema_long = input(21, title="Long EMA Period")
cpr_lookback = input.timeframe("D", title="CPR Timeframe")
atr_multiplier = input.float(1.5, title="ATR Multiplier")
rsi_period = input(14, title="RSI Period")
rsi_overbought = input(70, title="RSI Overbought Level")
rsi_oversold = input(30, title="RSI Oversold Level")
breakout_buffer = input.float(0.001, title="Breakout Buffer (in %)")

// Calculate EMAs
short_ema = ta.ema(close, ema_short)
long_ema = ta.ema(close, ema_long)

// Request Daily Data for CPR Calculation
high_cpr = request.security(syminfo.tickerid, cpr_lookback, high)
low_cpr = request.security(syminfo.tickerid, cpr_lookback, low)
close_cpr = request.security(syminfo.tickerid, cpr_lookback, close)

// CPR Levels
pivot = (high_cpr + low_cpr + close_cpr) / 3
bc = (high_cpr + low_cpr) / 2
tc = pivot + (pivot - bc)

// ATR for Stop-Loss and Take-Profit
atr = ta.atr(14)

// RSI Calculation
rsi = ta.rsi(close, rsi_period)

// Entry Conditions with RSI Filter and Breakout Logic
long_condition = ((close > tc) and (ta.crossover(short_ema, long_ema)) and (rsi > 50 and rsi < rsi_overbought)) or (rsi > 80) or (close > (pivot + pivot * breakout_buffer))
short_condition = ((close < bc) and (ta.crossunder(short_ema, long_ema)) and (rsi < 50 and rsi > rsi_oversold)) or (rsi < 20) or (close < (pivot - pivot * breakout_buffer))

// Dynamic Exit Logic
long_exit = short_condition
short_exit = long_condition

// Trailing Stop-Loss Implementation
if long_condition
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", from_entry="Long", 
                  trail_points=atr * atr_multiplier, 
                  trail_offset=atr * atr_multiplier / 2)

if short_condition
    strategy.entry("Short", strategy.short)
    strategy.exit("Exit Short", from_entry="Short", 
                  trail_points=atr * atr_multiplier, 
                  trail_offset=atr * atr_multiplier / 2)

// Plot CPR Levels and EMAs
plot(pivot, title="Pivot Point", color=color.orange, linewidth=2)
plot(tc, title="Top CPR", color=color.green, linewidth=2)
plot(bc, title="Bottom CPR", color=color.red, linewidth=2)
plot(short_ema, title="Short EMA", color=color.blue, linewidth=1)
plot(long_ema, title="Long EMA", color=color.purple, linewidth=1)

// Highlight Buy and Sell Signals
bgcolor(long_condition ? color.new(color.green, 90) : na, title="Buy Signal Highlight")
bgcolor(short_condition ? color.new(color.red, 90) : na, title="Sell Signal Highlight")

```

> Detail

https://www.fmz.com/strategy/477534

> Last Modified

2025-01-06 11:51:53
