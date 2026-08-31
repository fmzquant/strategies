
> Name

Multi-Indicator-Trend-Following-with-Oscillator-Alert-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6a2496ab9bbed61f1e.png)

#### Overview
This strategy is a trading system based on multiple technical indicators, combining the advantages of trend following and oscillator indicators. The core logic uses SMA crossovers for trend direction, ADX for trend strength confirmation, and Stochastic RSI for optimal entry points within the trend, while employing trailing stops for profit protection. The strategy is designed for 5-minute timeframe trading and effectively captures major trending market opportunities.

#### Strategy Principles
The specific operating principles are as follows:
1. Trend Determination: Uses SMA20 and SMA200 crossovers to identify trend direction, with fast line crossing above slow line indicating bullish trend and vice versa
2. Trend Strength Confirmation: ADX above 20 indicates sufficient trend development, avoiding trading in ranging markets
3. Entry Timing: After trend confirmation, uses Stochastic RSI to find overbought/oversold opportunities, seeking long entries below 30 and short entries above 70
4. Position Management: Employs position reversal mechanism, automatically closing and reversing positions when trend changes
5. Risk Control: Uses trailing stop (40 points with 5-point step) to lock in profits, with 1-bar re-entry delay to avoid false signals

#### Strategy Advantages
1. Multi-dimensional Analysis: Combines moving averages, ADX, and Stochastic RSI to confirm trading signals from different perspectives, increasing reliability
2. Strong Adaptability: Strategy automatically adjusts to market conditions, finding opportunities in both trending and ranging markets
3. Comprehensive Risk Management: Employs trailing stop mechanism to protect profits while letting winners run
4. Continuous Market Participation: Position reversal mechanism ensures following major market trends
5. Parameter Adjustability: Strategy offers multiple adjustable parameters for optimization under different market conditions

#### Strategy Risks
1. Overtrading Risk: Frequent position reversals may lead to high commission costs
2. False Breakout Risk: May generate frequent false signals during ranging periods
3. Slippage Risk: May face significant slippage costs on 5-minute timeframe
4. Trend Delay Risk: Moving average system has inherent lag, potentially missing important turning points
5. Parameter Sensitivity: Strategy performance is sensitive to parameter settings, requiring ongoing optimization

#### Strategy Optimization Directions
1. Incorporate Volume Indicators: Add volume analysis to improve trend identification accuracy
2. Optimize Entry Timing: Consider adding price pattern analysis, such as candlestick patterns, for more precise entries
3. Enhance Stop Loss Mechanism: Implement dynamic trailing stop distances based on ATR for better adaptability
4. Add Time Filters: Incorporate trading session filters to avoid low liquidity periods
5. Develop Adaptive Parameters: Research and develop parameter systems that automatically adjust based on market volatility

#### Summary
This strategy builds a comprehensive trading system by combining multiple classic technical indicators. It can capture major trends while finding optimal entry points within trends, featuring robust risk management mechanisms. While inherent risks exist, continuous optimization and careful parameter adjustment can help maintain stable performance across different market conditions. The strategy's modular design provides a solid foundation for future improvements, allowing for ongoing refinement based on actual trading results.
> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-18 00:00:00
end: 2025-02-17 00:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("XAU/USD 5M SMA + Stochastic RSI + ADX Strategy", overlay=true, default_qty_type=strategy.fixed, default_qty_value=1)

// === Входные параметры ===
sma_fast_length = input(20, title="SMA Fast Period")  
sma_slow_length = input(200, title="SMA Slow Period")  
stoch_k_length = input(14, title="Stochastic RSI K Length")
stoch_d_length = input(3, title="Stochastic RSI D Length")
adx_length = input(10, title="ADX Period")  
adx_smoothing = input(10, title="ADX Smoothing Period")
atr_length = input(14, title="ATR Period")

// === Уровни фильтрации ===
adx_min_trend = input(20, title="ADX Minimum Trend Strength")  // Было 25 → уменьшено до 20
stoch_buy_level = input(30, title="Stoch RSI Buy Level")  // Было 20 → увеличено для входов
stoch_sell_level = input(70, title="Stoch RSI Sell Level")  // Было 80 → снижено для входов

// === Трейлинг-стоп ===
use_trailing_stop = input(true, title="Enable Trailing Stop")
trailing_stop_pips = input(40, title="Trailing Stop (Pips)")  // Было 50 → уменьшено для активной торговли
trailing_step_pips = input(5, title="Trailing Step (Pips)")

// === Управление позициями ===
entry_delay = input(1, title="Bars Delay Before Re-Entry")  // Было 2 → уменьшено до 1

// === Расчёт индикаторов ===
sma_fast = ta.sma(close, sma_fast_length)
sma_slow = ta.sma(close, sma_slow_length)
[diPlus, diMinus, adx_value] = ta.dmi(adx_length, adx_smoothing)
atr_value = ta.atr(atr_length)

// === Stochastic RSI ===
stoch_rsi_k = ta.stoch(close, stoch_k_length, stoch_d_length, stoch_d_length)
stoch_rsi_d = ta.sma(stoch_rsi_k, stoch_d_length)

// === Фильтр волатильности (Убран, если мешает входам) ===
// atr_threshold = ta.sma(atr_value, 20)
// volatility_ok = atr_value > atr_threshold  // Комментируем, если ATR слишком строгий

// === Пересечения ===
sma_crossover = ta.crossover(sma_fast, sma_slow)
sma_crossunder = ta.crossunder(sma_fast, sma_slow)
stoch_rsi_crossover = ta.crossover(stoch_rsi_k, stoch_rsi_d)
stoch_rsi_crossunder = ta.crossunder(stoch_rsi_k, stoch_rsi_d)

// === Условия входа ===
longCondition = sma_crossover and adx_value > adx_min_trend and stoch_rsi_crossover and stoch_rsi_k < stoch_buy_level
shortCondition = sma_crossunder and adx_value > adx_min_trend and stoch_rsi_crossunder and stoch_rsi_k > stoch_sell_level

// === Исправленный таймер на повторные входы ===
barsSinceExit = ta.barssince(strategy.position_size == 0)
canReenter = not na(barsSinceExit) and barsSinceExit > entry_delay

// === Переворот позиции (исправлен) ===
if strategy.position_size > 0 and shortCondition and canReenter
    strategy.close("BUY")
    strategy.entry("SELL", strategy.short)

if strategy.position_size < 0 and longCondition and canReenter
    strategy.close("SELL")
    strategy.entry("BUY", strategy.long)

// === Открытие позиций ===
if strategy.position_size == 0 and longCondition
    strategy.entry("BUY", strategy.long)

if strategy.position_size == 0 and shortCondition
    strategy.entry("SELL", strategy.short)

// === Трейлинг-стоп (работает корректно) ===
if use_trailing_stop
    strategy.exit("Exit Long", from_entry="BUY", trail_points=trailing_stop_pips, trail_offset=trailing_step_pips)
    strategy.exit("Exit Short", from_entry="SELL", trail_points=trailing_stop_pips, trail_offset=trailing_step_pips)

// === Визуализация ===
plot(sma_fast, color=color.blue, title="SMA 20")
plot(sma_slow, color=color.red, title="SMA 200")
hline(stoch_buy_level, title="Stoch RSI Buy Level", color=color.blue)
hline(stoch_sell_level, title="Stoch RSI Sell Level", color=color.purple)
hline(adx_min_trend, title="ADX Min Trend Level", color=color.orange)

```

> Detail

https://www.fmz.com/strategy/482447

> Last Modified

2025-02-18 14:54:47
