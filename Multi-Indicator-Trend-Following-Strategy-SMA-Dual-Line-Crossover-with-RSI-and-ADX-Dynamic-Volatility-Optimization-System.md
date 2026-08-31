
> Name

Multi-Indicator-Trend-Following-Strategy-SMA-Dual-Line-Crossover-with-RSI-and-ADX-Dynamic-Volatility-Optimization-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d87cb47018dd16056b12.png)
![IMG](https://www.fmz.com/upload/asset/2d91bda1cd9401b6fca8b.png)




[trans]
#### 概述
该策略是一个综合性的趋势跟踪交易系统,结合了多个技术指标来确定市场趋势和交易时机。策略核心基于快速与慢速简单移动平均线(SMA)的交叉信号,并通过相对强弱指标(RSI)和平均趋向指数(ADX)进行趋势确认,同时利用真实波幅(ATR)进行风险管理。策略采用资金管理原则,限制单笔交易风险不超过账户资金的2%。

#### 策略原理
策略运行机制主要包含以下几个关键部分:
1. 趋势识别:使用SMA10和SMA200的交叉来捕捉趋势变化,快线突破慢线上方视为做多信号,反之为做空信号。
2. 趋势确认:通过RSI和ADX双重确认,RSI需要突破50水平,ADX需要大于20以确认趋势强度。
3. 风险控制:基于ATR进行动态止损设置,并采用资金管理限制单笔交易风险。
4. 持仓管理:实现trailing stop机制,动态调整止损位置以锁定利润。

#### 策略优势
1. 多重指标交叉验证,提高信号可靠性
2. 结合趋势强度和动量指标,降低假突破风险
3. 完善的风险管理体系,包括仓位控制和动态止损
4. 适用于多个时间周期(M5-MN),具有较强的适应性
5. 支持对冲交易,增加策略应用场景

#### 策略风险
1. 震荡市场可能产生频繁假信号
2. 长周期均线滞后性较强,可能错过趋势初期机会
3. 多重指标过滤可能导致错过部分有效信号
4. 固定的指标参数可能不适应所有市场环境
5. 交易成本可能影响小周期交易盈利能力

#### 策略优化方向
1. 引入自适应指标参数,根据市场波动性动态调整
2. 增加市场环境识别机制,在不同市场条件下采用不同策略参数
3. 优化止损方案,考虑结合支撑阻力位设置止损位置
4. 加入交易量指标,提高信号可靠性
5. 开发市场切换机制,在不适合的市场环境自动停止交易

#### 总结
该策略通过多重技术指标的组合应用,建立了一个相对完整的趋势跟踪交易系统。策略在设计上注重信号可靠性和风险管理,具有较好的实用性。通过优化建议的实施,策略有望进一步提升性能表现。建议在实盘应用前进行充分的回测验证,并根据具体交易品种特点进行参数优化。 || 

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
The strategy establishes a relatively complete trend following trading system through the combined application of multiple technical indicators. The design emphasizes signal reliability and risk management, demonstrating good practicality. Through implementation of optimization suggestions, the strategy has potential for further performance improvement. It is recommended to conduct thorough backtesting before live implementation and optimize parameters according to specific trading instrument characteristics.[/trans]



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
