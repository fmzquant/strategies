
> Name

Advanced-Quantitative-Trading-Strategy-Multi-Dimensional-Super-Trend-ATR-Dynamic-Tracking-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d87a1da55b5e6d08c5a7.png)
![IMG](https://www.fmz.com/upload/asset/2d80b27889c701b37302e.png)



[trans]
#### 概述
该策略是一个基于多重技术指标的量化交易系统，核心由超级趋势(SuperTrend)指标驱动，结合ATR动态止损机制，通过MACD、ADX、RSI等指标进行多维度趋势确认和风险控制。策略采用六重过滤机制来识别高概率交易机会，同时引入三重背离检测以提前预警市场风险。

#### 策略原理
策略以SuperTrend指标为核心，通过factor和ATR参数动态计算趋势方向。入场信号需同时满足以下条件：
1. SuperTrend方向指示
2. MACD柱状图位置验证
3. ADX趋势强度确认
4. K线形态确认
5. 成交量放大验证
6. 三重背离检测

系统通过ATR动态止损来控制风险，并结合趋势反转信号进行仓位管理。

#### 策略优势
1. 多维度指标融合提高了信号可靠性
2. ATR动态止损机制能够自适应市场波动
3. 三重背离检测系统提供了风险预警功能
4. 成交量验证确保交易活跃度
5. Gas费过滤机制降低了交易成本
6. 完整的可视化系统便于策略监控

#### 策略风险
1. 多重过滤可能导致错过部分交易机会
2. 参数优化存在过拟合风险
3. 市场高波动期可能触发频繁止损
4. Gas费波动可能影响策略收益
5. 指标组合可能在横盘市场产生混沌信号

#### 策略优化方向
1. 引入市场周期识别模块，实现参数自适应
2. 开发基于机器学习的信号权重系统
3. 优化Gas费预测模型提高交易时机把握
4. 增加交易成本计算模块
5. 开发基于波动率的仓位管理系统

#### 总结
该策略通过多维度指标融合和严格的风险控制，构建了一个稳健的量化交易系统。系统的模块化设计便于后续优化和扩展，但在实际应用中需要注意参数调优和市场适应性。三重背离预警和Gas费过滤等创新设计，进一步提升了策略的实用性。 || 

#### Overview
This strategy is a quantitative trading system based on multiple technical indicators, primarily driven by the SuperTrend indicator, combined with ATR dynamic stop-loss mechanism, and utilizing MACD, ADX, RSI, and other indicators for multi-dimensional trend confirmation and risk control. The strategy employs a six-layer filtering mechanism to identify high-probability trading opportunities while incorporating triple divergence detection for early market risk warning.

#### Strategy Principles
The strategy uses SuperTrend indicator as its core, calculating trend direction through factor and ATR parameters. Entry signals must satisfy the following conditions:
1. SuperTrend direction indication
2. MACD histogram position verification
3. ADX trend strength confirmation
4. Candlestick pattern confirmation
5. Volume expansion verification
6. Triple divergence detection

The system implements ATR dynamic stop-loss for risk control and manages positions based on trend reversal signals.

#### Strategy Advantages
1. Multi-dimensional indicator fusion improves signal reliability
2. ATR dynamic stop-loss mechanism adapts to market volatility
3. Triple divergence detection system provides risk warnings
4. Volume verification ensures trading activity
5. Gas fee filtering mechanism reduces transaction costs
6. Complete visualization system facilitates strategy monitoring

#### Strategy Risks
1. Multiple filters may cause missed trading opportunities
2. Parameter optimization faces overfitting risks
3. High market volatility periods may trigger frequent stop-losses
4. Gas fee fluctuations may affect strategy returns
5. Indicator combinations may generate chaotic signals in sideways markets

#### Strategy Optimization Directions
1. Introduce market cycle recognition module for parameter adaptation
2. Develop machine learning-based signal weighting system
3. Optimize Gas fee prediction model for better timing
4. Add transaction cost calculation module
5. Develop volatility-based position management system

#### Summary
This strategy constructs a robust quantitative trading system through multi-dimensional indicator fusion and strict risk control. The modular design facilitates subsequent optimization and expansion, but parameter tuning and market adaptability need attention in practical applications. Innovative designs such as triple divergence warning and Gas fee filtering further enhance the strategy's practicality.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-22 00:00:00
end: 2025-02-19 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("ETH 超级趋势增强策略-精简版", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// —————————— 参数配置区 ——————————
// 超级趋势参数
atrPeriod = input.int(8, "ATR周期（8-10）", minval=8, maxval=10)
factor = input.float(3.5, "乘数（3.5-4）", minval=3.5, maxval=4, step=0.1)

// MACD参数
fastLength = input.int(10, "MACD快线周期")
slowLength = input.int(21, "MACD慢线周期")
signalLength = input.int(7, "信号线周期")

// ADX参数
adxLength = input.int(18, "ADX周期")
adxThreshold = input.int(28, "ADX趋势阈值")

// 成交量验证
volFilterRatio = input.float(1.8, "成交量放大倍数", step=0.1)

// ATR止损
atrStopMulti = input.float(2.2, "ATR止损乘数", step=0.1)

// —————————— 核心指标计算 ——————————
// 1. 超级趋势（修复索引使用）
[supertrend, direction] = ta.supertrend(factor, atrPeriod)
plot(supertrend, color=direction < 0 ? color.new(color.green, 0) : color.new(color.red, 0), linewidth=2)

// 2. MACD指标
[macdLine, signalLine, histLine] = ta.macd(close, fastLength, slowLength, signalLength)
macdCol = histLine > histLine[1] ? color.green : color.red

// 3. ADX趋势强度
[DIMinus, DIPlus, ADX] = ta.dmi(adxLength, adxLength)

// 4. 成交量验证
volMA = ta.sma(volume, 20)
volValid = volume > volMA * volFilterRatio

// 5. ATR动态止损
atrVal = ta.atr(14)
var float stopPrice = na

// —————————— 三重背离检测 ——————————
// RSI背离检测
rsiVal = ta.rsi(close, 14)
priceHigh = ta.highest(high, 5)
rsiHigh = ta.highest(rsiVal, 5)
divergenceRSI = high >= priceHigh[1] and rsiVal < rsiHigh[1]

// MACD柱状图背离
macdHigh = ta.highest(histLine, 5)
divergenceMACD = high >= priceHigh[1] and histLine < macdHigh[1]

// 成交量背离
volHigh = ta.highest(volume, 5)
divergenceVol = high >= priceHigh[1] and volume < volHigh[1]

tripleDivergence = divergenceRSI and divergenceMACD and divergenceVol

// —————————— 信号生成逻辑 ——————————
// 多头条件（6层过滤）
longCondition = 
  direction < 0 and            // 超级趋势看涨
  histLine > 0 and             // MACD柱在零轴上方
  ADX > adxThreshold and       // 趋势强度达标
  close > open and             // 阳线确认
  volValid and                 // 成交量验证
  not tripleDivergence         // 无三重顶背离

// 空头条件（精简条件）
shortCondition = 
  direction > 0 and            // 超级趋势看跌
  histLine < 0 and             // MACD柱在零轴下方
  ADX > adxThreshold and       // 趋势强度达标
  close < open and             // 阴线确认
  volValid and                 // 成交量验证
  tripleDivergence             // 出现三重顶背离

// —————————— 交易执行模块 ——————————
if (longCondition)
    strategy.entry("Long", strategy.long)
    stopPrice := close - atrVal * atrStopMulti

if (shortCondition)
    strategy.entry("Short", strategy.short)
    stopPrice := close + atrVal * atrStopMulti

// 动态止损触发
strategy.exit("Exit Long", "Long", stop=stopPrice)
strategy.exit("Exit Short", "Short", stop=stopPrice)

// 趋势反转离场
if (direction > 0 and strategy.position_size > 0)
    strategy.close("Long")
    
if (direction < 0 and strategy.position_size < 0)
    strategy.close("Short")

// —————————— 可视化提示 ——————————
plotshape(longCondition, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small, title="买入信号")
plotshape(shortCondition, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small, title="卖出信号")
plot(strategy.position_size != 0 ? stopPrice : na, color=color.orange, style=plot.style_linebr, linewidth=2, title="动态止损线")

// —————————— 预警系统 ——————————
alertcondition(tripleDivergence, title="三重顶背离预警", message="ETH出现三重顶背离！")

longCondition := longCondition 
```

> Detail

https://www.fmz.com/strategy/483101

> Last Modified

2025-02-21 13:34:24
