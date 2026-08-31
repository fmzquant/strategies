
> Name

Neural-Moving-Average-Crossover-Trend-Following-Strategy-with-EMA-Filtering-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16fbc20cfd0e97cbf8b.png)

[trans]
#### 概述
该策略是一个基于均线交叉信号和趋势过滤的交易系统。它结合了短期SMA(9周期和15周期)的交叉信号以及长期EMA(200周期)作为趋势过滤器,通过在不同时间周期上的均线交叉来捕捉市场趋势。系统还包含了再入场机制,可以在趋势延续时重新建仓。

#### 策略原理
策略采用三重均线系统进行交易决策:
1. 使用9周期和15周期的简单移动平均线(SMA)产生交易信号
2. 使用200周期指数移动平均线(EMA)作为趋势过滤器
3. 当短期SMA(9周期)向上穿越15周期SMA且价格在200周期EMA之上时,产生做多信号
4. 当短期SMA(9周期)向下穿越15周期SMA且价格在200周期EMA之下时,产生做空信号
5. 系统还包含再入场逻辑,允许在初始交叉信号后,只要价格维持在200EMA的正确一侧,就可以重新建仓

#### 策略优势
1. 多重时间框架分析:结合短期和长期均线,提供更全面的市场视角
2. 趋势过滤:使用200EMA过滤假信号,提高交易质量
3. 再入场机制:允许在强劲趋势中多次建仓,提高盈利潜力
4. 清晰的进出场规则:基于客观的技术指标,减少主观判断
5. 双向交易:可以在多空两个方向上获利
6. 风险管理集成:通过均线系统自动控制风险

#### 策略风险
1. 震荡市场风险:在横盘市场中可能产生频繁的假信号
2. 滞后性风险:移动平均线本质上是滞后指标,可能错过最佳入场点
3. 趋势反转风险:在剧烈的市场反转中可能遭受较大损失
4. 再入场风险:过度建仓可能导致仓位过重
缓解措施:
- 增加额外的市场波动率过滤器
- 设置最大持仓限制
- 使用动态止损机制
- 实施仓位管理系统

#### 策略优化方向
1. 动态周期优化:
- 根据市场波动率自动调整均线周期
- 引入自适应移动平均线(AMA)替代固定周期均线

2. 入场优化:
- 增加成交量确认
- 添加动量指标验证
- 引入价格形态确认

3. 风险管理优化:
- 实现动态仓位管理
- 添加跟踪止损
- 基于波动率的止损设置

4. 再入场逻辑优化:
- 增加趋势强度确认
- 设计梯度建仓系统
- 加入市场环境识别

#### 总结
该策略通过结合多重均线系统和趋势过滤器,构建了一个完整的趋势跟踪交易系统。它的主要优势在于能够在强趋势市场中获得可观收益,同时通过均线过滤和再入场机制提高了系统的稳定性。虽然存在一些固有风险,但通过优化方向的实施可以进一步提升策略的性能。该策略适合追踪中长期市场趋势,对于有耐心的交易者来说是一个可靠的交易工具。 || 

#### Overview
This strategy is a trading system based on moving average crossover signals and trend filtering. It combines short-term SMA crossover signals (9-period and 15-period) with a long-term EMA (200-period) as a trend filter to capture market trends across different timeframes. The system also includes a re-entry mechanism that allows for position rebuilding during trend continuation.

#### Strategy Principles
The strategy employs a triple moving average system for trading decisions:
1. Uses 9-period and 15-period Simple Moving Averages (SMA) for generating trading signals
2. Employs 200-period Exponential Moving Average (EMA) as a trend filter
3. Generates long signals when the short-term SMA (9-period) crosses above the 15-period SMA and price is above the 200-period EMA
4. Generates short signals when the short-term SMA (9-period) crosses below the 15-period SMA and price is below the 200-period EMA
5. Includes re-entry logic allowing new positions after initial crossover signals as long as price maintains position relative to the 200 EMA

#### Strategy Advantages
1. Multiple timeframe analysis: Combines short-term and long-term moving averages for a comprehensive market perspective
2. Trend filtering: Uses 200 EMA to filter false signals and improve trade quality
3. Re-entry mechanism: Allows multiple entries during strong trends to maximize profit potential
4. Clear entry/exit rules: Based on objective technical indicators, reducing subjective judgment
5. Bi-directional trading: Profits from both bullish and bearish markets
6. Integrated risk management: Automatic risk control through the moving average system

#### Strategy Risks
1. Choppy market risk: May generate frequent false signals in sideways markets
2. Lag risk: Moving averages are inherently lagging indicators, potentially missing optimal entry points
3. Trend reversal risk: May suffer significant losses during sharp market reversals
4. Re-entry risk: Excessive position building may lead to overexposure
Mitigation measures:
- Add additional volatility filters
- Set maximum position limits
- Implement dynamic stop-loss mechanisms
- Deploy position sizing system

#### Strategy Optimization Directions
1. Dynamic Period Optimization:
- Automatically adjust moving average periods based on market volatility
- Introduce Adaptive Moving Averages (AMA) to replace fixed-period ones

2. Entry Optimization:
- Add volume confirmation
- Include momentum indicator validation
- Implement price pattern confirmation

3. Risk Management Optimization:
- Implement dynamic position sizing
- Add trailing stops
- Develop volatility-based stop-loss settings

4. Re-entry Logic Optimization:
- Add trend strength confirmation
- Design graduated position building system
- Incorporate market environment recognition

#### Summary
This strategy builds a comprehensive trend-following trading system by combining multiple moving average systems with trend filters. Its main advantage lies in capturing significant profits in trending markets while improving stability through moving average filtering and re-entry mechanisms. Although inherent risks exist, implementing the optimization directions can further enhance strategy performance. The strategy is suitable for tracking medium to long-term market trends and serves as a reliable trading tool for patient traders.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2025-02-17 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=5
strategy("SMA Crossover with EMA Filter", overlay=true)

// Define indicators
sma9 = ta.sma(close, 9)
sma15 = ta.sma(close, 15)
ema200 = ta.ema(close, 200)

// Crossover conditions
bullish_crossover = ta.crossover(sma9, sma15) // Buy signal
bearish_crossover = ta.crossunder(sma9, sma15) // Sell signal

// Filters
above_ema200 = close > ema200
below_ema200 = close < ema200

// Buy condition (only above 200 EMA)
buy_signal = bullish_crossover and above_ema200
if buy_signal
    strategy.entry("Buy", strategy.long)

// Sell condition (only below 200 EMA)
sell_signal = bearish_crossover and below_ema200
if sell_signal
    strategy.entry("Sell", strategy.short)

// Exit condition if the signal reverses
exit_long = bearish_crossover
exit_short = bullish_crossover
if exit_long
    strategy.close("Buy")
if exit_short
    strategy.close("Sell")

// Re-entry condition when price crosses EMA 200 after a prior crossover
buy_reentry = ta.barssince(bullish_crossover) > 0 and above_ema200
sell_reentry = ta.barssince(bearish_crossover) > 0 and below_ema200
if buy_reentry
    strategy.entry("Buy", strategy.long)
if sell_reentry
    strategy.entry("Sell", strategy.short)

// Plot indicators
plot(sma9, color=color.blue, title="SMA 9")
plot(sma15, color=color.red, title="SMA 15")
plot(ema200, color=color.orange, title="EMA 200")



```

> Detail

https://www.fmz.com/strategy/482515

> Last Modified

2025-02-18 18:29:13
