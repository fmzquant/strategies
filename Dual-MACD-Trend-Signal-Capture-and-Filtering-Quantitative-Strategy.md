
> Name

Dual-MACD-Trend-Signal-Capture-and-Filtering-Quantitative-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8b4cd048f2a46129e31.png)
![IMG](https://www.fmz.com/upload/asset/2d91f951e04a34f2e54d4.png)


[trans]

## 概述

双MACD趋势信号捕捉与过滤量化策略是一种基于两个不同时间框架的移动平均线聚散指标(MACD)的量化交易策略。该策略通过结合短期和长期趋势信号来捕捉市场交易机会,有效过滤市场噪音,提高交易信号的准确性。该策略在TradingView平台上实现,独立于价格图表叠加层,适用于各种金融市场,包括股票、期货和外汇。

策略的核心在于利用两个MACD指标:MACD1(短期)和MACD2(长期)。MACD1默认快速长度为34,慢速长度为144,信号平滑为9,用于检测短期趋势变化;MACD2默认快速长度为100,慢速长度为200,信号平滑为50,用于评估长期趋势方向。用户可以自定义快速、慢速和信号长度,并在计算中选择SMA(简单移动平均线)或EMA(指数移动平均线)。

## 策略原理

双MACD策略的核心原理是通过两个不同时间框架的MACD指标来识别市场趋势并生成交易信号。策略代码首先计算两个MACD指标及其相关参数:

1. MACD1(短期指标):
   - 快速长度默认为34
   - 慢速长度默认为144
   - 信号平滑默认为9
   
2. MACD2(长期指标):
   - 快速长度默认为100
   - 慢速长度默认为200
   - 信号平滑默认为50

交易逻辑设计明确且严格:

- 做多条件:
  - MACD1柱状图上穿零线(短期看涨)
  - MACD2柱状图为正值(长期看涨)
  - MACD2柱状图刚刚上穿零线且绿色加深(趋势确认)

- 做空条件:
  - MACD1柱状图下穿零线(短期看跌)
  - MACD2柱状图为负值(长期看跌)
  - MACD2柱状图刚刚下穿零线且红色加深(趋势确认)

策略还包含风险管理措施,设置了可调节的止损和止盈参数,默认止损为1%(最小0.1%),止盈为1.5%(最小0.1%),基于入场价格动态计算。交易在K线收盘时处理,以确保信号稳定性。

## 策略优势

通过深入分析代码,该双MACD策略展现出多方面的优势:

1. 双重趋势确认机制:通过结合短期MACD和长期MACD,策略能够有效过滤市场噪音,减少虚假信号,提高交易的准确性。只有当短期和长期信号一致时,策略才会生成交易信号。

2. 灵活的参数设置:策略允许用户自定义MACD参数(快速长度、慢速长度和信号平滑)以及计算方法(SMA或EMA),使策略能够适应不同市场环境和用户偏好。

3. 直观的视觉反馈:策略通过动态颜色变化(上升趋势为深绿色,下降趋势为深红色)直观地显示趋势强度,帮助交易者更好地理解市场状况。

4. 完善的风险管理:内置可调节的止损和止盈参数,保护资金安全并锁定利润。这些参数可根据市场波动性和个人风险承受能力进行调整。

5. 实时警报功能:策略提供做多和做空入场信号警报,便于实时监控和自动化交易,使交易者能够及时把握市场机会。

6. 适用性广泛:策略适用于各种金融市场,包括股票、期货和外汇,使其成为多种交易场景的实用工具。

## 策略风险

尽管双MACD策略设计合理,但仍存在一些潜在风险:

1. 趋势反转风险:在剧烈波动的市场中,趋势可能快速反转,导致策略产生亏损。即使有止损设置,在极端市场条件下,实际止损价格可能滑点严重。

2. 参数敏感性:策略性能高度依赖于MACD参数设置。不适当的参数可能导致过多的虚假信号或错过重要的交易机会。用户需要根据特定市场和时间框架仔细优化参数。

3. 滞后性问题:MACD本质上是滞后指标,基于历史价格数据计算。在快速变化的市场中,信号可能来得太晚,错过最佳入场点或导致不必要的损失。

4. 横盘市场表现不佳:该策略在强烈趋势市场中表现最佳,但在横盘整理或无方向性市场中可能产生频繁的虚假信号,导致连续小额亏损。

5. 资金管理风险:默认设置使用账户100%的资金进行交易,这可能导致过度杠杆和资金管理不当。交易者应考虑减少每笔交易的资金比例,以更好地管理风险。

为降低这些风险,交易者应考虑:结合其他技术指标进行交叉验证;定期回测和优化策略参数;根据市场条件调整资金分配;在极端市场条件下手动干预;以及设置合理的风险/回报比率。

## 策略优化方向

通过深入分析代码,以下是可能的优化方向:

1. 增加过滤条件:可以添加额外的技术指标(如相对强弱指数RSI或布林带)作为过滤器,以减少虚假信号。例如,只在RSI指示市场非超买/超卖状态时才进行交易。

2. 自适应参数:实现MACD参数的自适应调整,根据市场波动性自动调整。在波动性较高的市场中,可以增加快速和慢速长度以减少噪音;在低波动性市场中,可以减小参数以提高敏感性。

3. 改进止损策略:实现基于波动性的动态止损,如基于ATR(真实波动幅度均值)的止损设置,而不是固定百分比。这将使止损更加适应当前市场条件。

4. 添加部分平仓机制:允许在达到特定利润目标时部分平仓,锁定部分利润的同时让剩余仓位继续获利。

5. 交易时间过滤:添加交易时间过滤器,避免在市场开盘/收盘等高波动时段或低流动性时段交易。

6. 资金管理优化:实现基于凯利准则或固定比例风险模型的资金管理,根据胜率和风险/回报比动态调整头寸大小。

7. 组合多个时间周期:除了当前的两个MACD外,考虑增加第三个更长期的MACD,以提供更全面的市场视角。

8. 市场状态分类:添加市场状态分类逻辑(如趋势市场vs横盘市场),并根据不同市场状态调整交易策略和参数。

这些优化可以提高策略的稳健性和适应性,使其在各种市场条件下都能保持较好的表现。

## 总结

双MACD趋势信号捕捉与过滤量化策略通过巧妙结合短期和长期MACD指标,创建了一个强大的趋势跟踪系统。该策略的核心优势在于其严格的双重确认机制,有效减少了虚假信号,提高了交易准确性。同时,灵活的参数设置和直观的视觉反馈使其成为各类市场参与者的实用工具。

尽管存在趋势反转、参数敏感性和横盘市场表现不佳等风险,但通过适当的风险管理措施和策略优化,这些风险可以得到有效控制。未来的优化方向可以包括添加额外的过滤条件、实现自适应参数、改进止损策略和优化资金管理等方面。

总体而言,双MACD策略为量化交易者提供了一个坚实的框架,特别适合中短期趋势交易者。通过结合经典技术分析工具与灵活的交易规则,该策略为追求一致回报的交易者提供了一个稳健的交易系统。对于愿意投入时间优化参数并理解其潜在风险的交易者来说,这是一个极具价值的策略。 || 

## Overview

The Dual MACD Trend Signal Capture and Filtering Quantitative Strategy is a quantitative trading strategy based on two Moving Average Convergence-Divergence (MACD) indicators with different timeframes. This strategy captures market trading opportunities by combining short-term and long-term trend signals, effectively filtering market noise and improving the accuracy of trading signals. Implemented on the TradingView platform, this strategy operates independently of the price chart overlay and is suitable for various financial markets, including stocks, futures, and forex.

The core of the strategy lies in utilizing two MACD indicators: MACD1 (short-term) and MACD2 (long-term). MACD1 has default fast length of 34, slow length of 144, and signal smoothing of 9, used to detect short-term trend changes; MACD2 has default fast length of 100, slow length of 200, and signal smoothing of 50, used to assess long-term trend direction. Users can customize the fast, slow, and signal lengths and choose between SMA (Simple Moving Average) or EMA (Exponential Moving Average) for calculations.

## Strategy Principles

The core principle of the Dual MACD strategy is to identify market trends and generate trading signals using two MACD indicators with different timeframes. The strategy code first calculates two MACD indicators and their related parameters:

1. MACD1 (short-term indicator):
   - Fast length default is 34
   - Slow length default is 144
   - Signal smoothing default is 9
   
2. MACD2 (long-term indicator):
   - Fast length default is 100
   - Slow length default is 200
   - Signal smoothing default is 50

The trading logic is clear and strict:

- Long Condition:
  - MACD1 histogram crosses above the zero line (short-term bullish)
  - MACD2 histogram is positive (long-term bullish)
  - MACD2 histogram has just crossed above zero with a deepening green (trend confirmation)

- Short Condition:
  - MACD1 histogram crosses below the zero line (short-term bearish)
  - MACD2 histogram is negative (long-term bearish)
  - MACD2 histogram has just crossed below zero with a deepening red (trend confirmation)

The strategy also includes risk management measures with adjustable stop-loss and take-profit parameters, default stop-loss at 1% (minimum 0.1%), take-profit at 1.5% (minimum 0.1%), dynamically calculated based on entry price. Trades are processed at candle close to ensure signal stability.

## Strategy Advantages

Through in-depth code analysis, this Dual MACD strategy demonstrates multiple advantages:

1. Dual Trend Confirmation Mechanism: By combining short-term MACD and long-term MACD, the strategy effectively filters market noise, reduces false signals, and improves trading accuracy. Trading signals are only generated when both short-term and long-term signals align.

2. Flexible Parameter Settings: The strategy allows users to customize MACD parameters (fast length, slow length, and signal smoothing) and calculation methods (SMA or EMA), enabling the strategy to adapt to different market environments and user preferences.

3. Intuitive Visual Feedback: The strategy provides intuitive visualization of trend strength through dynamic color changes (deepening green for rising trends, deepening red for declining trends), helping traders better understand market conditions.

4. Comprehensive Risk Management: Built-in adjustable stop-loss and take-profit parameters protect capital safety and lock in profits. These parameters can be adjusted according to market volatility and individual risk tolerance.

5. Real-time Alert Functionality: The strategy provides long and short entry signal alerts for real-time monitoring and automated trading, allowing traders to seize market opportunities promptly.

6. Wide Applicability: The strategy is applicable to various financial markets, including stocks, futures, and forex, making it a practical tool for multiple trading scenarios.

## Strategy Risks

Despite the well-designed Dual MACD strategy, there are several potential risks:

1. Trend Reversal Risk: In volatile markets, trends may reverse rapidly, causing the strategy to incur losses. Even with stop-loss settings, actual stop-loss prices may experience significant slippage under extreme market conditions.

2. Parameter Sensitivity: Strategy performance is highly dependent on MACD parameter settings. Inappropriate parameters may lead to excessive false signals or missed important trading opportunities. Users need to carefully optimize parameters according to specific markets and timeframes.

3. Lag Issues: MACD is inherently a lagging indicator, calculated based on historical price data. In rapidly changing markets, signals may come too late, missing optimal entry points or causing unnecessary losses.

4. Poor Performance in Ranging Markets: This strategy performs best in strong trending markets but may generate frequent false signals in ranging or directionless markets, leading to consecutive small losses.

5. Capital Management Risk: The default setting uses 100% of account equity for trading, which may lead to excessive leverage and improper capital management. Traders should consider reducing the percentage of funds for each trade to better manage risk.

To mitigate these risks, traders should consider: combining other technical indicators for cross-validation; regularly backtesting and optimizing strategy parameters; adjusting capital allocation based on market conditions; manually intervening during extreme market conditions; and setting reasonable risk/reward ratios.

## Strategy Optimization Directions

Through in-depth code analysis, here are possible optimization directions:

1. Add Filtering Conditions: Additional technical indicators (such as Relative Strength Index RSI or Bollinger Bands) can be added as filters to reduce false signals. For example, only trade when RSI indicates the market is not in overbought/oversold conditions.

2. Adaptive Parameters: Implement adaptive adjustment of MACD parameters based on market volatility. In high-volatility markets, increase fast and slow lengths to reduce noise; in low-volatility markets, decrease parameters to improve sensitivity.

3. Improve Stop-Loss Strategy: Implement volatility-based dynamic stop-loss, such as ATR (Average True Range) based stop-loss settings, rather than fixed percentages. This will make stop-losses more adaptable to current market conditions.

4. Add Partial Position Closing Mechanism: Allow partial position closing when specific profit targets are reached, locking in partial profits while allowing remaining positions to continue profiting.

5. Trading Time Filters: Add trading time filters to avoid trading during high-volatility periods like market open/close or during low-liquidity periods.

6. Capital Management Optimization: Implement capital management based on the Kelly Criterion or fixed proportion risk model, dynamically adjusting position sizes based on win rate and risk/reward ratio.

7. Combine Multiple Timeframes: In addition to the current two MACDs, consider adding a third, longer-term MACD to provide a more comprehensive market perspective.

8. Market State Classification: Add market state classification logic (such as trending market vs. ranging market) and adjust trading strategies and parameters based on different market states.

These optimizations can enhance the strategy's robustness and adaptability, allowing it to maintain good performance under various market conditions.

## Summary

The Dual MACD Trend Signal Capture and Filtering Quantitative Strategy creates a powerful trend-following system by cleverly combining short-term and long-term MACD indicators. The core advantage of this strategy lies in its strict dual confirmation mechanism, which effectively reduces false signals and improves trading accuracy. Meanwhile, flexible parameter settings and intuitive visual feedback make it a practical tool for various market participants.

Although there are risks such as trend reversals, parameter sensitivity, and poor performance in ranging markets, these risks can be effectively controlled through appropriate risk management measures and strategy optimizations. Future optimization directions may include adding additional filtering conditions, implementing adaptive parameters, improving stop-loss strategies, and optimizing capital management.

Overall, the Dual MACD strategy provides quantitative traders with a solid framework, particularly suitable for medium to short-term trend traders. By combining classic technical analysis tools with flexible trading rules, this strategy offers a robust trading system for traders seeking consistent returns. For traders willing to invest time in optimizing parameters and understanding potential risks, this is an extremely valuable strategy.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-25 00:00:00
end: 2025-03-24 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy(title="Dual MACD Strategy [Jason Kasei]", shorttitle="DualMACD", overlay=false, margin_long=0, margin_short=0, default_qty_type=strategy.percent_of_equity, 
 default_qty_value=100, process_orders_on_close=true, initial_capital=10000)

// --- 输入参数 ---
// MACD1 参数
macd1_fast_length = input.int(title="MACD1 Fast Length", defval=34)
macd1_slow_length = input.int(title="MACD1 Slow Length", defval=144)
macd1_signal_length = input.int(title="MACD1 Signal Smoothing", minval=1, maxval=50, defval=9)
macd1_sma_source = input.string(title="MACD1 Oscillator MA Type", defval="EMA", options=["SMA", "EMA"])
macd1_sma_signal = input.string(title="MACD1 Signal Line MA Type", defval="EMA", options=["SMA", "EMA"])

// MACD2 参数
macd2_fast_length = input.int(title="MACD2 Fast Length", defval=100)
macd2_slow_length = input.int(title="MACD2 Slow Length", defval=200)
macd2_signal_length = input.int(title="MACD2 Signal Smoothing", minval=1, maxval=50, defval=50)
macd2_sma_source = input.string(title="MACD2 Oscillator MA Type", defval="EMA", options=["SMA", "EMA"])
macd2_sma_signal = input.string(title="MACD2 Signal Line MA Type", defval="EMA", options=["SMA", "EMA"])

// 止损止盈参数
stop_loss_pct = input.float(title="Stop Loss %", defval=1.0, minval=0.1, step=0.1)
take_profit_pct = input.float(title="Take Profit %", defval=1.5, minval=0.1, step=0.1)

// --- 计算 MACD1 ---
src = close
macd1_fast_ma = macd1_sma_source == "SMA" ? ta.sma(src, macd1_fast_length) : ta.ema(src, macd1_fast_length)
macd1_slow_ma = macd1_sma_source == "SMA" ? ta.sma(src, macd1_slow_length) : ta.ema(src, macd1_slow_length)
macd1 = macd1_fast_ma - macd1_slow_ma
macd1_signal = macd1_sma_signal == "SMA" ? ta.sma(macd1, macd1_signal_length) : ta.ema(macd1, macd1_signal_length)
macd1_hist = macd1 - macd1_signal

// --- 计算 MACD2 ---
macd2_fast_ma = macd2_sma_source == "SMA" ? ta.sma(src, macd2_fast_length) : ta.ema(src, macd2_fast_length)
macd2_slow_ma = macd2_sma_source == "SMA" ? ta.sma(src, macd2_slow_length) : ta.ema(src, macd2_slow_length)
macd2 = macd2_fast_ma - macd2_slow_ma
macd2_signal = macd2_sma_signal == "SMA" ? ta.sma(macd2, macd2_signal_length) : ta.ema(macd2, macd2_signal_length)
macd2_hist = macd2 - macd2_signal

// --- 绘制 MACD1 和 MACD2 
hline(0, "Zero Line", color=color.new(#787B86, 50))
plot(macd1_hist, title="MACD1 Histogram", style=plot.style_line, color=(macd1_hist >= 0 ? (macd1_hist[1] < macd1_hist ? #26A69A : #B2DFDB) : (macd1_hist[1] < macd1_hist ? #FFCDD2 : #FF5252)))
plot(macd2_hist, title="MACD2 Histogram", style=plot.style_histogram, color=(macd2_hist >= 0 ? (macd2_hist[1] < macd2_hist ? #26A69A : #B2DFDB) : (macd2_hist[1] < macd2_hist ? #FFCDD2 : #FF5252)))

// --- 交易条件 ---
is_deep_green_macd2 = ta.cross(macd2_hist, 0) and macd2_hist > 0 and macd2_hist[1] < macd2_hist
is_deep_red_macd2 = ta.cross(macd2_hist, 0) and macd2_hist < 0 and macd2_hist[1] > macd2_hist

// 检测 MACD1 hist 穿越零轴
macd1_cross_up = macd1_hist > 0
macd1_cross_down = macd1_hist < 0

// 做多条件
long_condition = macd1_cross_up and macd2_hist > 0 and is_deep_green_macd2

// 做空条件
short_condition = macd1_cross_down and macd2_hist < 0 and is_deep_red_macd2

// --- 交易逻辑 ---
if long_condition
    strategy.entry("Long", strategy.long)
    stop_loss_long = strategy.position_avg_price * (1 - stop_loss_pct / 100)
    take_profit_long = strategy.position_avg_price * (1 + take_profit_pct / 100)
    strategy.exit("Long Exit", "Long", stop=stop_loss_long, limit=take_profit_long)

if short_condition
    strategy.entry("Short", strategy.short)
    stop_loss_short = strategy.position_avg_price * (1 + stop_loss_pct / 100)
    take_profit_short = strategy.position_avg_price * (1 - take_profit_pct / 100)
    strategy.exit("Short Exit", "Short", stop=stop_loss_short, limit=take_profit_short)

// --- 警报条件 ---
alertcondition(long_condition, title="Long Entry", message="Dual MACD Strategy: Long Entry Signal")
alertcondition(short_condition, title="Short Entry", message="Dual MACD Strategy: Short Entry Signal")
```

> Detail

https://www.fmz.com/strategy/488149

> Last Modified

2025-03-25 14:34:44
