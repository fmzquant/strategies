
> Name

Futures-Candlestick-Size-Threshold-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8860c8da32948f96cc4.png)
![IMG](https://www.fmz.com/upload/asset/2d8e2ec41ea2e2ea0f340.png)




[trans]
#### 概述
该策略基于蜡烛线大小来识别和交易重要的价格走势。它通过设定具体的点数阈值、交易时间窗口和每日交易次数限制来实现精确控制。策略专门针对期货市场进行了优化,可以在高流动性时段捕捉显著的价格变动。

#### 策略原理 
策略的核心逻辑是通过计算每根蜡烛线的高低点差值(以点数为单位),并与预设的阈值进行比较。当蜡烛线大小超过阈值且在指定的交易时间窗口内(默认为美中时间7:00-9:15),系统会根据蜡烛线的方向触发多空交易信号。为了控制风险,策略限制每天只执行一次交易,并设置了止盈止损点位。

#### 策略优势
1. 精确的点数控制 - 通过tick级别的计算确保交易执行的精确性
2. 时间过滤 - 集中在市场活跃度最高的时段进行交易
3. 风险管理 - 设置明确的止盈止损点位来保护资金
4. 交易频率控制 - 每日一次交易限制避免过度交易
5. 可视化提示 - 触发交易的蜡烛线会被高亮显示,便于分析
6. 回测兼容 - 包含日期过滤和时间执行等功能方便历史回测

#### 策略风险
1. 市场波动风险 - 在剧烈波动时期可能触发错误信号
2. 滑点风险 - 期货市场的高速交易可能导致实际成交价格偏离
3. 机会成本 - 每日一次交易的限制可能错过其他好的交易机会
4. 时间依赖性 - 策略效果高度依赖于选择的交易时间窗口

#### 策略优化方向
1. 动态阈值 - 根据市场波动率自动调整蜡烛线大小阈值
2. 多时间周期 - 增加多个时间周期的确认信号
3. 交易量过滤 - 加入成交量指标作为辅助判断
4. 市场情绪指标 - 结合波动率等指标评估市场环境
5. 自适应止盈止损 - 基于市场波动设置动态的止盈止损位

#### 总结
该策略通过精确的点数控制和严格的时间过滤,为期货交易提供了一个可靠的交易系统。它的优势在于执行的精确性和风险控制,但也需要交易者根据具体品种和市场情况进行参数优化。通过建议的优化方向,策略可以进一步提升其适应性和稳定性。 || 

#### Overview
This strategy identifies and trades significant price movements based on candlestick size. It achieves precise control through specific tick thresholds, trading time windows, and daily trade frequency limits. The strategy is specifically optimized for the futures market and can capture significant price movements during high liquidity periods.

#### Strategy Principle
The core logic of the strategy is to calculate the high-low range of each candlestick (in ticks) and compare it with a preset threshold. When the candlestick size exceeds the threshold within the specified trading window (default 7:00-9:15 CST), the system triggers long or short trading signals based on the candlestick direction. To control risk, the strategy limits execution to one trade per day and sets take-profit and stop-loss levels.

#### Strategy Advantages
1. Precise Tick Control - Ensures trading execution accuracy through tick-level calculations
2. Time Filtering - Focuses on trading during periods of highest market activity
3. Risk Management - Sets clear take-profit and stop-loss levels to protect capital
4. Trade Frequency Control - Daily trade limit prevents overtrading
5. Visual Alerts - Triggered candlesticks are highlighted for easy analysis
6. Backtesting Compatibility - Includes date filtering and time execution features for historical testing

#### Strategy Risks
1. Market Volatility Risk - May trigger false signals during periods of extreme volatility
2. Slippage Risk - High-speed trading in futures markets may lead to execution price deviation
3. Opportunity Cost - Daily trade limit may miss other good trading opportunities
4. Time Dependency - Strategy effectiveness highly depends on chosen trading window

#### Strategy Optimization Directions
1. Dynamic Threshold - Automatically adjust candlestick size threshold based on market volatility
2. Multiple Timeframes - Add confirmation signals from multiple timeframes
3. Volume Filter - Incorporate volume indicators as auxiliary judgment
4. Market Sentiment Indicators - Integrate volatility indicators to assess market conditions
5. Adaptive Take-Profit/Stop-Loss - Set dynamic exit levels based on market volatility

#### Summary
This strategy provides a reliable trading system for futures through precise tick control and strict time filtering. Its strengths lie in execution accuracy and risk control, but traders need to optimize parameters based on specific instruments and market conditions. Through the suggested optimization directions, the strategy can further enhance its adaptability and stability.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-02-15 01:00:00
end: 2025-02-20 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"DOGE_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © omnipadme

//@version=5
strategy("Futures Candle Size Strategy (Start Trading on Jan 1, 2025)", overlay=true)

// Input for candle size threshold in ticks
candleSizeThresholdTicks = input.float(25, title="Candle Size Threshold (Ticks)", minval=1)

// Input for take profit and stop loss in ticks
takeProfitTicks = input.float(50, title="Take Profit (Ticks)", minval=1)
stopLossTicks = input.float(40, title="Stop Loss (Ticks)", minval=1)

// Time filter for trading (e.g., 7:00 AM to 9:15 AM CST)
startHour = input.int(7, title="Start Hour (CST)", minval=0, maxval=23)
startMinute = input.int(0, title="Start Minute (CST)", minval=0, maxval=59)
endHour = input.int(9, title="End Hour (CST)", minval=0, maxval=23)
endMinute = input.int(15, title="End Minute (CST)", minval=0, maxval=59)

// Tick size of the instrument (e.g., ES = 0.25)
tickSize = syminfo.mintick

// Convert tick inputs to price levels
candleSizeThreshold = candleSizeThresholdTicks * tickSize
takeProfit = takeProfitTicks * tickSize
stopLoss = stopLossTicks * tickSize

// Time range calculation
startTime = timestamp("GMT-6", year(timenow), month(timenow), dayofmonth(timenow), startHour, startMinute)
endTime = timestamp("GMT-6", year(timenow), month(timenow), dayofmonth(timenow), endHour, endMinute)
inTimeRange = (time >= startTime and time <= endTime)

// Filter to start trading only from January 1, 2025
startTradingDate = timestamp("GMT-6", 2025, 1, 1, 0, 0)
isValidStartDate = time >= startTradingDate

// Calculate the candle size for the current candle
candleSize = math.abs(high - low)

// Track whether a trade has been executed for the day
var hasTradedToday = false
isNewDay = dayofweek != dayofweek[1]  // Detect new day

// Reset `hasTradedToday` at the start of a new day
if isNewDay
    hasTradedToday := false

// Trigger condition for futures trading (only if no trade has been executed today)
triggerCondition = isValidStartDate and inTimeRange and candleSize >= candleSizeThreshold and not hasTradedToday

// Entry logic: If condition is met, enter a trade
if triggerCondition
    hasTradedToday := true  // Mark as traded for the day
    if close > open  // Bullish candle
        strategy.entry("Buy", strategy.long)
    if close < open  // Bearish candle
        strategy.entry("Sell", strategy.short)

// Set take profit and stop loss
strategy.exit("Exit Long", from_entry="Buy", limit=close + takeProfit, stop=close - stopLoss)
strategy.exit("Exit Short", from_entry="Sell", limit=close - takeProfit, stop=close + stopLoss)

// Alerts for triggered condition
if triggerCondition
    alert("Candle size is " + str.tostring(candleSizeThresholdTicks) + " ticks or greater. Trade initiated.", alert.freq_once_per_bar)

// Color the alert candle white
barcolor(triggerCondition ? color.white : na)

// Visual aids for backtesting
bgcolor(isValidStartDate and inTimeRange ? color.new(color.green, 90) : na, title="Time and Date Range Highlight")



```

> Detail

https://www.fmz.com/strategy/483033

> Last Modified

2025-02-27 17:17:35
