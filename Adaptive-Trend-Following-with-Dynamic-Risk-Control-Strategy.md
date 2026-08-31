
> Name

Adaptive-Trend-Following-with-Dynamic-Risk-Control-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13b8e75ecdf100dd585.png)

[trans]
#### 概述
该策略是一个结合了多重技术指标的短线交易系统,主要基于抛物线转向指标(PSAR)作为核心信号,同时结合了均线、动量指标进行交易过滤,并采用动态止损和固定止盈相结合的风险管理方法。策略设计充分考虑了市场趋势和波动性,适合在波动较大的市场环境中进行短线交易。

#### 策略原理
策略采用PSAR指标作为主要的趋势判断工具,当价格突破PSAR时产生交易信号。为了提高信号的可靠性,加入了以下过滤条件:
1. 50周期指数移动平均线(EMA50)作为趋势过滤器,确保交易方向与中期趋势一致
2. 相对强弱指数(RSI)用于过滤震荡市场,多头持仓要求RSI>40,空头持仓要求RSI<60
3. 使用ATR(平均真实波幅)动态计算止损位置,提供更灵活的风险控制
4. 采用0.7%的固定止盈目标,确保盈利及时落袋为安
5. 设置持仓检查机制,避免重复开仓

#### 策略优势
1. 信号系统完备:结合趋势跟踪和动量指标,提供更可靠的交易信号
2. 风险控制灵活:动态止损可以根据市场波动性自适应调整
3. 防范假突破:多重过滤条件可以有效降低虚假信号的影响
4. 收益目标明确:固定止盈比例有助于控制持仓时间,提高资金利用效率
5. 交易逻辑清晰:各个组件职责明确,便于后续优化和调整

#### 策略风险
1. 过度过滤风险:多重条件可能导致错过一些优质交易机会
2. 固定止盈限制:0.7%的固定止盈可能过早退出强势趋势
3. 参数敏感性:PSAR、EMA、RSI等指标的参数设置对策略表现影响较大
4. 市场环境依赖:在低波动或剧烈震荡市场中可能表现欠佳
5. 滑点影响:频繁交易可能导致较高的交易成本

#### 策略优化方向
1. 动态止盈机制:可以根据市场波动性调整止盈比例
2. 仓位管理优化:引入基于波动率的动态仓位管理系统
3. 市场环境识别:增加市场环境判断模块,在不同市场状态下调整策略参数
4. 指标参数优化:引入自适应参数调整机制,提高策略适应性
5. 交易成本控制:优化开平仓频率,降低交易成本

#### 总结
该策略通过结合多个技术指标构建了一个完整的交易系统,在趋势判断、风险控制和交易执行等方面都有较好的考虑。策略的核心优势在于其灵活的风险控制机制和完备的信号系统,但同时也需要注意参数优化和市场适应性的问题。通过持续优化和改进,该策略有望在不同市场环境下都能保持稳定的表现。 || 

#### Overview
This strategy is a short-term trading system that combines multiple technical indicators, primarily based on the Parabolic SAR (PSAR) as the core signal generator, while incorporating moving averages and momentum indicators for trade filtering, along with a combination of dynamic stop-loss and fixed take-profit risk management methods. The strategy is designed to consider market trends and volatility, making it suitable for short-term trading in volatile market conditions.

#### Strategy Principles
The strategy uses the PSAR indicator as its primary trend determination tool, generating trading signals when price crosses the PSAR. To enhance signal reliability, the following filters are added:
1. 50-period Exponential Moving Average (EMA50) as a trend filter to ensure trade direction aligns with medium-term trends
2. Relative Strength Index (RSI) to filter out ranging markets, requiring RSI>40 for long positions and RSI<60 for short positions
3. Average True Range (ATR) for dynamic stop-loss calculation, providing more flexible risk control
4. Fixed 0.7% take-profit target to secure gains promptly
5. Position check mechanism to avoid duplicate entries

#### Strategy Advantages
1. Comprehensive signal system: Combines trend following and momentum indicators for more reliable trading signals
2. Flexible risk control: Dynamic stop-loss adapts to market volatility
3. False breakout prevention: Multiple filtering conditions effectively reduce the impact of false signals
4. Clear profit targets: Fixed take-profit ratio helps control holding time and improve capital efficiency
5. Clear trading logic: Well-defined component responsibilities facilitate subsequent optimization and adjustment

#### Strategy Risks
1. Over-filtering risk: Multiple conditions may cause missed trading opportunities
2. Fixed take-profit limitations: 0.7% fixed take-profit may exit strong trends too early
3. Parameter sensitivity: PSAR, EMA, RSI parameter settings significantly impact strategy performance
4. Market environment dependence: May underperform in low volatility or highly volatile markets
5. Slippage impact: Frequent trading may lead to higher transaction costs

#### Strategy Optimization Directions
1. Dynamic take-profit mechanism: Adjust profit targets based on market volatility
2. Position management optimization: Introduce volatility-based dynamic position sizing system
3. Market environment recognition: Add market state identification module to adjust strategy parameters accordingly
4. Indicator parameter optimization: Implement adaptive parameter adjustment mechanism
5. Transaction cost control: Optimize entry/exit frequency to reduce trading costs

#### Summary
The strategy builds a complete trading system by combining multiple technical indicators, with solid considerations in trend identification, risk control, and trade execution. Its core strengths lie in its flexible risk control mechanism and comprehensive signal system, while attention needs to be paid to parameter optimization and market adaptability. Through continuous optimization and improvement, the strategy has the potential to maintain stable performance across different market conditions.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-20 00:00:00
end: 2025-02-17 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("妮可百分百", overlay=true)

// ? 設定 Parabolic SAR 參數
start = input.float(0.02, "起始 AF")
increment = input.float(0.02, "加速因子")
maximum = input.float(0.2, "最大 AF")

// ? 計算 Parabolic SAR
SAR = ta.sar(start, increment, maximum)

// ? ATR 計算（用於動態止損）
atrLength = input.int(14, "ATR 計算週期")
atrMultiplier = input.float(1.3, "ATR 係數")  // 2倍 ATR 作為止損範圍
ATR = ta.atr(atrLength)

// ? 固定 0.5% 止盈計算
takeProfitPercent = 0.007  // 0.7% 固定止盈
takeProfitLong = close * (1 + takeProfitPercent)  // 多單止盈
takeProfitShort = close * (1 - takeProfitPercent) // 空單止盈

// ? **50 EMA 過濾**
ema50 = ta.ema(close, 50)

// ? **RSI 過濾（防止震盪進場）**
rsiLength = input.int(14, "RSI 週期")
rsi = ta.rsi(close, rsiLength)
longFilter = rsi > 40  // 只在 RSI > 31 時做多
shortFilter = rsi < 60 // 只在 RSI < 69 時做空

// ? **檢查是否已經有持倉**
isFlat = strategy.position_size == 0  // **無持倉時，才能開新單**

// ? **多頭進場條件**
longCondition = ta.crossover(close, SAR) and close > ema50 and longFilter and isFlat  

// ? **空頭進場條件**
shortCondition = ta.crossunder(close, SAR) and close < ema50 and shortFilter and isFlat  

// ? **進場策略**
if (longCondition)
    strategy.entry("B", strategy.long, comment="B")

if (shortCondition)
    strategy.entry("S", strategy.short, comment="S")

// ? **止盈 & 止損**
stopLossLong = close - (ATR * atrMultiplier)  // 多單 ATR 止損
stopLossShort = close + (ATR * atrMultiplier) // 空單 ATR 止損

strategy.exit("Exit Long", from_entry="B", stop=stopLossLong, limit=takeProfitLong, comment="TP Long")
strategy.exit("Exit Short", from_entry="S", stop=stopLossShort, limit=takeProfitShort, comment="TP Short")

// ? **標記進出場點**
plotshape(series=longCondition, location=location.belowbar, style=shape.triangleup, size=size.small, title="B")
plotshape(series=shortCondition, location=location.abovebar, style=shape.triangledown, size=size.small, title="S")

// ? **繪製 50 EMA**
plot(ema50, color=color.blue, title="50 EMA")

```

> Detail

https://www.fmz.com/strategy/482600

> Last Modified

2025-02-19 11:26:56
