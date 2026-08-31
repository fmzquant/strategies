
> Name

RSI-ATR-Momentum-Volatility-Combined-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

#### Overview
This is a trading strategy system that combines the RSI momentum indicator with the ATR volatility indicator. The strategy identifies potential trading opportunities by monitoring RSI crossovers with its moving average while using the ATR indicator as a volatility filter to ensure sufficient market volatility. The strategy operates during European trading hours (8:00-21:00 Prague time) on a 5-minute timeframe with fixed take-profit and stop-loss levels.

#### Strategy Principles
The core logic is based on several key components:
1. RSI indicator identifies oversold (below 45) and overbought (above 55) regions
2. RSI crossovers with its moving average trigger entry signals
3. ATR indicator filters low volatility environments, only allowing trades above threshold
4. Trading time restricted to 8:00-21:00 Prague time
5. Fixed stop-loss and take-profit strategy set at 5000 points

Specific trading rules:
- Long conditions: RSI crosses above its MA below 45, meeting time and volatility criteria
- Short conditions: RSI crosses below its MA above 55, meeting time and volatility criteria
- Exit conditions: Automatic closure at take-profit or stop-loss levels

#### Strategy Advantages
1. Multiple filters: Combines momentum (RSI) and volatility (ATR) indicators to reduce false signals
2. Time filtering: Avoids low liquidity periods through time window restriction
3. Robust risk management: Fixed stop-loss and take-profit levels for easier money management
4. Adjustable parameters: Key parameters like RSI length and ATR threshold can be optimized
5. Solid backtesting results: 64.4% win rate with 1.1 profit factor, including slippage and commissions

#### Strategy Risks
1. Fixed stop-loss/take-profit may not suit all market conditions, risking early exits in volatile periods
2. RSI indicator may generate frequent false signals in trending markets
3. ATR filtering might cause missing important market opportunities
4. Time window restriction could miss quality trades in other periods
5. Strategy depends on parameter optimization, risking overfitting

#### Strategy Optimization Directions
1. Dynamic stop-loss/take-profit: Consider ATR-based adjustments for better market adaptation
2. Trend filtering: Add trend indicators like moving average systems to reduce false signals
3. Improved entry timing: Consider adding volume indicators for better confirmation
4. Optimized time windows: Adjust trading periods based on market characteristics
5. Enhanced money management: Implement dynamic position sizing for better risk control

#### Summary
The strategy constructs a relatively complete trading system by combining RSI and ATR indicators. Its main strengths lie in multiple filtering mechanisms and comprehensive risk management, though limitations exist. Through proposed optimizations, the strategy shows potential for improved performance. The key is continuous parameter adjustment and optimization based on actual trading conditions to maintain adaptability.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-10 00:00:00
end: 2024-12-09 08:00:00
period: 3h
basePeriod: 3h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Custom RSI + ATR Strategy", overlay=true)

// === Настройки индикаторов ===
rsi_length = input.int(14, minval=1, title="RSI Length")
rsi_ma_length = input.int(10, minval=1, title="RSI MA Length")
atr_length = input.int(14, minval=1, title="ATR Length")
atr_threshold = input.float(0.5, minval=0.1, title="ATR Threshold")

// === Параметры стоп-лосса и тейк-профита ===
stop_loss_ticks = input.int(5000, title="Stop Loss Ticks")
take_profit_ticks = input.int(5000, title="Take Profit Ticks")

// === Получение значений индикаторов ===
rsi = ta.rsi(close, rsi_length)
rsi_ma = ta.sma(rsi, rsi_ma_length)
atr_value = ta.atr(atr_length)

// === Время для открытия сделок ===
start_time = timestamp("Europe/Prague", year, month, dayofmonth, 8, 0)
end_time = timestamp("Europe/Prague", year, month, dayofmonth, 21, 0)
in_trading_hours = (time >= start_time and time <= end_time)

// === Условие по волатильности ===
volatility_filter = atr_value > atr_threshold

// === Условия для лонгов ===
long_condition = ta.crossover(rsi, rsi_ma) and rsi < 45 and in_trading_hours and volatility_filter
if (long_condition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Take Profit/Stop Loss", "Long", stop=low - stop_loss_ticks * syminfo.mintick, limit=high + take_profit_ticks * syminfo.mintick)

// === Условия для шортов ===
short_condition = ta.crossunder(rsi, rsi_ma) and rsi > 55 and in_trading_hours and volatility_filter
if (short_condition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Take Profit/Stop Loss", "Short", stop=high + stop_loss_ticks * syminfo.mintick, limit=low - take_profit_ticks * syminfo.mintick)

// === Отображение индикаторов на графике ===
plot(rsi, color=color.blue, title="RSI")
plot(rsi_ma, color=color.red, title="RSI MA")
hline(45, "RSI 45", color=color.green)
hline(55, "RSI 55", color=color.red)
plot(atr_value, color=color.orange, title="ATR", linewidth=2)
hline(atr_threshold, "ATR Threshold", color=color.purple)

```

> Detail

https://www.fmz.com/strategy/474634

> Last Modified

2024-12-11 11:15:32
