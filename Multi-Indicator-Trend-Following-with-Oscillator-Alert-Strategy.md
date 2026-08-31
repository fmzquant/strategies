
> Name

Multi-Indicator-Trend-Following-with-Oscillator-Alert-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6a2496ab9bbed61f1e.png)

[trans]
#### 概述
该策略是一个基于多重技术指标的交易系统,结合了趋势跟踪和震荡指标的优势。核心逻辑是通过SMA均线的交叉判断趋势方向,使用ADX确认趋势强度,随后运用随机RSI在趋势方向上寻找最优入场点,并采用跟踪止损来保护利润。该策略适用于5分钟时间周期的交易,能够有效捕捉市场的主要趋势性机会。

#### 策略原理
策略的具体运作原理如下:
1. 趋势判断:使用SMA20和SMA200的交叉来确定趋势方向,快线上穿慢线视为多头趋势,反之为空头趋势
2. 趋势强度确认:ADX大于20时表明趋势充分发展,避免在盘整市场中交易
3. 入场时机:在确认趋势后,使用随机RSI寻找超买超卖机会,RSI低于30时寻找做多机会,高于70时寻找做空机会
4. 仓位管理:采用反转交易机制,在趋势改变时自动平仓并反向开仓
5. 风险控制:使用跟踪止损(40点,步长5点)来锁定利润,并设置1根K线的重入延迟以避免虚假信号

#### 策略优势
1. 多维度分析:通过结合均线、ADX和随机RSI,从不同角度确认交易信号,提高了交易的可靠性
2. 自适应性强:策略能够根据市场状态自动调整,在趋势和震荡市场都能找到交易机会
3. 风险管理完善:采用跟踪止损机制,能够在保护利润的同时让盈利继续运行
4. 持续参与市场:通过反转交易机制,确保始终跟随主要市场走势
5. 参数可调整性:策略提供了多个可调参数,便于根据不同市场条件进行优化

#### 策略风险
1. 过度交易风险:频繁的反转交易可能导致手续费成本过高
2. 假突破风险:在市场震荡时期,可能出现频繁的假突破信号
3. 滑点风险:在5分钟周期上,可能面临较大的滑点成本
4. 趋势延迟风险:均线系统本身具有滞后性,可能错过一些重要的转折点
5. 参数敏感性:策略效果对参数设置比较敏感,需要持续优化

#### 策略优化方向
1. 引入成交量指标:可以通过添加成交量分析来提高趋势判断的准确性
2. 优化入场时机:考虑增加价格形态分析,如蜡烛图形态,提高入场精确度
3. 完善止损机制:可以结合ATR动态调整跟踪止损距离,使其更具适应性
4. 增加时间过滤:添加交易时间段过滤,避开低流动性期间
5. 开发自适应参数:研究开发能够根据市场波动率自动调整的参数系统

#### 总结
该策略通过组合多个经典技术指标,构建了一个全面的交易系统。它既能够捕捉主要趋势,又能在趋势中寻找最优入场点,同时具备完善的风险管理机制。虽然存在一些固有风险,但通过持续优化和细致的参数调整,该策略有望在不同市场环境下保持稳定的表现。策略的模块化设计也为后续优化提供了良好的基础,可以根据实际交易效果不断改进和完善。

|| 

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
This strategy builds a comprehensive trading system by combining multiple classic technical indicators. It can capture major trends while finding optimal entry points within trends, featuring robust risk management mechanisms. While inherent risks exist, continuous optimization and careful parameter adjustment can help maintain stable performance across different market conditions. The strategy's modular design provides a solid foundation for future improvements, allowing for ongoing refinement based on actual trading results.[/trans]



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
