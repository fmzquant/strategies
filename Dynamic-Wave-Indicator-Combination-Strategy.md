
> Name

Dynamic-Wave-Indicator-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1dbd41eeb5a4d1f4fdf.png)

[trans]
#### 概述
本策略是一个基于多重技术指标的综合交易系统，结合了动量指标、趋势指标和波动率指标，用于捕捉市场的短期波动机会。该策略通过MACD交叉信号、EMA趋势确认、RSI超买超卖条件以及ADX趋势强度过滤来识别交易机会，并使用基于ATR的动态止损止盈来管理风险。

#### 策略原理
策略的核心逻辑基于以下几个关键组件：
1. MACD指标用于捕捉动量变化，通过快线和慢线的交叉来确定入场时机
2. 200周期EMA用于确认整体趋势方向，价格位于均线上方视为多头趋势，反之为空头趋势
3. RSI指标用于确认价格动量，RSI>50支持做多，RSI<50支持做空
4. ADX指标用于过滤弱趋势，只有当ADX大于设定阈值时才考虑入场
5. ATR指标用于动态计算止损和止盈位置，根据市场波动性自适应调整

#### 策略优势
1. 多重指标交叉验证，提高信号可靠性
2. 动态风险管理系统，根据市场波动性自动调整止损止盈
3. 适应性强，可以根据不同市场条件调整参数
4. 完整的趋势确认机制，降低假突破风险
5. 系统化的入场出场逻辑，减少主观判断

#### 策略风险
1. 多重指标可能导致信号滞后
2. 短时间周期易受市场噪音影响
3. 参数优化可能导致过度拟合
4. 高频交易可能带来较高的交易成本
5. 市场剧烈波动时可能触发频繁止损

#### 策略优化方向
1. 引入成交量指标作为辅助确认
2. 优化ADX阈值，提高趋势过滤效率
3. 增加时间过滤器，避开低流动性时段
4. 开发自适应参数系统，提高策略稳定性
5. 加入市场波动率过滤器，应对不同市场环境

#### 总结
该策略通过综合运用多个技术指标，构建了一个完整的交易系统。虽然存在一定的滞后性和参数优化的挑战，但通过合理的风险管理和持续优化，策略展现出较好的适应性和可靠性。建议交易者在实盘使用前进行充分的回测和参数优化。 || 

#### Overview
This strategy is a comprehensive trading system based on multiple technical indicators, combining momentum indicators, trend indicators, and volatility indicators to capture short-term market opportunities. The strategy identifies trading opportunities through MACD crossover signals, EMA trend confirmation, RSI overbought/oversold conditions, and ADX trend strength filtering, while using ATR-based dynamic stop-loss and take-profit for risk management.

#### Strategy Principles
The core logic of the strategy is based on the following key components:
1. MACD indicator for capturing momentum changes through fast and slow line crossovers
2. 200-period EMA for overall trend confirmation, with price above the line indicating bullish trend and vice versa
3. RSI indicator for price momentum confirmation, RSI>50 supports long positions, RSI<50 supports short positions
4. ADX indicator for weak trend filtering, only considering entry when ADX is above the set threshold
5. ATR indicator for dynamic calculation of stop-loss and take-profit levels, adapting to market volatility

#### Strategy Advantages
1. Multiple indicator cross-validation improves signal reliability
2. Dynamic risk management system automatically adjusts stops based on market volatility
3. High adaptability with adjustable parameters for different market conditions
4. Complete trend confirmation mechanism reduces false breakout risks
5. Systematic entry and exit logic reduces subjective judgment

#### Strategy Risks
1. Multiple indicators may lead to signal lag
2. Short timeframes are susceptible to market noise
3. Parameter optimization may result in overfitting
4. High-frequency trading may incur higher transaction costs
5. Frequent stop-losses may be triggered during extreme market volatility

#### Strategy Optimization Directions
1. Incorporate volume indicators for additional confirmation
2. Optimize ADX threshold to improve trend filtering efficiency
3. Add time filters to avoid low liquidity periods
4. Develop adaptive parameter system to enhance strategy stability
5. Implement market volatility filters to handle different market conditions

#### Summary
This strategy constructs a complete trading system through the comprehensive use of multiple technical indicators. While it faces challenges such as lag and parameter optimization, the strategy demonstrates good adaptability and reliability through proper risk management and continuous optimization. Traders are advised to conduct thorough backtesting and parameter optimization before live implementation.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-18 00:00:00
end: 2025-02-16 08:00:00
period: 3h
basePeriod: 3h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Optimized Impulse Wave Strategy", overlay=true)

// === INPUT PARAMETERS ===
fast_length = input(12, title="MACD Fast Length")
slow_length = input(26, title="MACD Slow Length")
signal_smoothing = input(9, title="MACD Signal Smoothing")
ema_length = input(200, title="EMA Length")
rsi_length = input(14, title="RSI Length")
adx_length = input(14, title="ADX Length")
adx_smoothing = input(14, title="ADX Smoothing")
atr_length = input(14, title="ATR Length")
risk_reward_ratio = input(2, title="Risk-Reward Ratio")
adx_threshold = input(20, title="ADX Threshold")

// === INDICATORS ===
[macdLine, signalLine, _] = ta.macd(close, fast_length, slow_length, signal_smoothing)
ema = ta.ema(close, ema_length)
rsi = ta.rsi(close, rsi_length)
[dmiPlus, dmiMinus, adx] = ta.dmi(adx_length, adx_smoothing)

// === ENTRY CONDITIONS ===
bullishTrend = ta.crossover(macdLine, signalLine) and close > ema and adx > adx_threshold and rsi > 50
bearishTrend = ta.crossunder(macdLine, signalLine) and close < ema and adx > adx_threshold and rsi < 50

// === STOP-LOSS & TAKE-PROFIT CALCULATION ===
longStopLoss = close - ta.atr(atr_length) * 1.5
longTakeProfit = close + (ta.atr(atr_length) * 1.5 * risk_reward_ratio)
shortStopLoss = close + ta.atr(atr_length) * 1.5
shortTakeProfit = close - (ta.atr(atr_length) * 1.5 * risk_reward_ratio)

// === STRATEGY EXECUTION ===
// Enter Long
if bullishTrend
    strategy.entry("Long", strategy.long)
    strategy.exit("TakeProfitLong", from_entry="Long", limit=longTakeProfit, stop=longStopLoss)

// Enter Short
if bearishTrend
    strategy.entry("Short", strategy.short)
    strategy.exit("TakeProfitShort", from_entry="Short", limit=shortTakeProfit, stop=shortStopLoss)

// === PLOTTING ===
plot(ema, title="EMA 200", color=color.blue, linewidth=2)
plotshape(series=bullishTrend, location=location.belowbar, color=color.green, size=size.small, title="Buy Signal")
plotshape(series=bearishTrend, location=location.abovebar, color=color.red, size=size.small, title="Sell Signal")

// === ALERTS ===
alertcondition(bullishTrend, title="Bullish Entry", message="Buy Signal Triggered!")
alertcondition(bearishTrend, title="Bearish Entry", message="Sell Signal Triggered!")

// === DEBUGGING LOG ===
label.new(bar_index, high, "ADX: " + str.tostring(adx), color=color.white, textcolor=color.black)
label.new(bar_index, low, "MACD Cross: " + str.tostring(macdLine), color=color.white, textcolor=color.black)

```

> Detail

https://www.fmz.com/strategy/482461

> Last Modified

2025-02-18 15:20:31
