
> Name

High-Position-Internal-Bar-Strength-Based-Mean-Reversion-Short-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8f65610cf386290b8ea.png)
![IMG](https://www.fmz.com/upload/asset/2d8130ad74644d7c3d453.png)



[trans]
#### 概述
这是一个基于内部强度指标(Internal Bar Strength, IBS)的做空策略,主要通过监测收盘价在日内价格区间中的位置来识别交易机会。当IBS指标显示超买状态时,策略会在满足特定条件下开启做空仓位,并在IBS达到超卖水平时平仓出场。该策略专门设计用于股票和ETF市场的日线级别交易。

#### 策略原理
策略的核心是通过IBS指标来衡量收盘价在当天高低点范围内的位置。IBS的计算公式为:(收盘价-最低价)/(最高价-最低价)。当IBS值大于等于0.9时,表明收盘价接近当天最高点,被认为是超买状态;当IBS值小于等于0.3时,表明收盘价接近当天最低点,被认为是超卖状态。策略在以下条件全部满足时进场做空:
1. IBS值达到或超过上限阈值(默认0.9)
2. 收盘价高于前一根K线的最高价
3. 当前时间在设定的交易时间窗口内
当IBS值降至下限阈值(默认0.3)以下时,策略会平掉所有仓位。

#### 策略优势
1. 策略逻辑清晰简单,参数较少,易于理解和实施
2. 通过IBS指标可以有效捕捉价格超涨后的回落机会
3. 设置了时间窗口限制,可以避免在不适合的时间段交易
4. 入场条件结合了前一日高点的突破确认,提高了信号的可靠性
5. 基于百分比的仓位管理,风险控制更加灵活

#### 策略风险
1. 在强势趋势市场中,均值回归策略可能面临持续亏损
2. 单一使用IBS指标可能导致假信号
3. 没有设置止损机制,在极端行情下可能造成较大损失
4. 策略依赖于日内价格波动范围的稳定性
5. 交易频率可能较高,导致较大的交易成本

#### 策略优化方向
1. 引入趋势过滤器,在强趋势环境下避免逆势交易
2. 增加成交量或波动率等辅助指标,提高信号质量
3. 设计动态的IBS阈值,适应不同市场环境
4. 加入止损机制,控制单次交易风险
5. 优化仓位管理系统,根据市场波动调整持仓量
6. 考虑加入多周期分析,提高信号的可靠性

#### 总结
这是一个基于均值回归思想的做空策略,通过IBS指标捕捉价格超买后的回落机会。策略设计简洁,操作明确,但仍需要根据具体交易品种和市场环境进行优化。建议在实盘交易前,充分测试不同参数组合,并结合其他技术指标来提高策略的稳定性。同时,必须注意风险控制,特别是在强势市场中的应用。 ||


#### Overview
This is a short-only mean reversion strategy based on the Internal Bar Strength (IBS) indicator, which identifies trading opportunities by monitoring the closing price's position within the daily price range. The strategy initiates short positions when the IBS indicates overbought conditions and exits when IBS reaches oversold levels. It is specifically designed for daily timeframe trading in stocks and ETF markets.

#### Strategy Principle
The core of the strategy lies in using the IBS indicator to measure where the closing price falls within the day's high-low range. IBS is calculated as: (Close - Low)/(High - Low). When IBS is greater than or equal to 0.9, it indicates the closing price is near the day's high, suggesting overbought conditions; when IBS is less than or equal to 0.3, it indicates the closing price is near the day's low, suggesting oversold conditions. The strategy enters a short position when all of the following conditions are met:
1. IBS value reaches or exceeds the upper threshold (default 0.9)
2. Closing price is higher than the previous bar's high
3. Current time is within the specified trading window
The strategy closes all positions when the IBS value drops below the lower threshold (default 0.3).

#### Strategy Advantages
1. Clear and simple logic with few parameters, easy to understand and implement
2. Effectively captures price reversion opportunities after overbought conditions
3. Time window restrictions help avoid trading during unfavorable periods
4. Entry conditions include previous day's high breakout confirmation, improving signal reliability
5. Percentage-based position management allows for flexible risk control

#### Strategy Risks
1. May face continuous losses in strong trending markets
2. Using IBS indicator alone might generate false signals
3. Lack of stop-loss mechanism could lead to significant losses in extreme market conditions
4. Strategy relies on the stability of intraday price ranges
5. Trading frequency might be high, resulting in substantial transaction costs

#### Strategy Optimization Directions
1. Incorporate trend filters to avoid counter-trend trading in strong trends
2. Add volume or volatility filters to improve signal quality
3. Design dynamic IBS thresholds that adapt to different market conditions
4. Implement stop-loss mechanisms to control single-trade risk
5. Optimize position management system to adjust holdings based on market volatility
6. Consider multi-timeframe analysis to enhance signal reliability

#### Summary
This is a short-only mean reversion strategy that uses the IBS indicator to capture price pullback opportunities after overbought conditions. While the strategy design is concise and operations are clear, it requires optimization based on specific trading instruments and market conditions. It is recommended to thoroughly test different parameter combinations and incorporate other technical indicators to improve strategy stability before live trading. Additionally, risk control must be emphasized, especially when applying the strategy in strong trending markets.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-06-01 00:00:00
end: 2025-02-18 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Botnet101

//@version=6
strategy('[SHORT ONLY] Internal Bar Strength (IBS) Mean Reversion Strategy', overlay = false, default_qty_value = 100, default_qty_type = strategy.percent_of_equity, margin_long = 5, margin_short = 5, process_orders_on_close = true, precision = 4)

//#region INPUTS SECTION
// ============================================


//#region IBS Thresholds
upperThresholdInput = input.float(defval = 0.9, title = 'Upper Threshold', step = 0.1, maxval=1, group = 'IBS Settings')
lowerThresholdInput = input.float(defval = 0.3, title = 'Lower Threshold', step = 0.1, minval=0, group = 'IBS Settings')
//#endregion
//#endregion

//#region IBS CALCULATION
// ============================================
// IBS Value Calculation
// ============================================
internalBarStrength  = (close - low) / (high - low)
//#endregion

//#region TRADING CONDITIONS
// ============================================
// Entry/Exit Logic
// ============================================
shortCondition = internalBarStrength  >= upperThresholdInput and close>high[1] 
exitCondition = internalBarStrength  <= lowerThresholdInput
//#endregion

//#region STRATEGY EXECUTION
// ============================================
// Order Management
// ============================================
if shortCondition
    strategy.entry('short', strategy.short)
if exitCondition
    strategy.close_all()
//#endregion

//#region PLOTTING
// ============================================
// Visual Components
// ============================================
plot(internalBarStrength, color = color.white, title = "IBS Value")
plot(upperThresholdInput, color = color.yellow, title = "Upper Threshold")
plot(lowerThresholdInput, color = color.yellow, title = "Lower Threshold")
//#endregion
```

> Detail

https://www.fmz.com/strategy/482784

> Last Modified

2025-02-20 15:00:16
