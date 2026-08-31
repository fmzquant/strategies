
> Name

Multi-MA-Trend-Intensity-Trading-Strategy-A-Flexible-Smart-Trading-System-Based-on-MA-Deviation

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10c37f0616c3c532fad.png)

[trans]
#### 概述
该策略是一个基于多重移动平均线和趋势强度的智能交易系统。它通过分析价格与不同周期移动平均线之间的偏离程度来衡量市场趋势强度,并结合ATR波动率指标进行仓位管理和风险控制。该策略具有高度的可定制性,可以根据不同市场环境和交易需求灵活调整参数。

#### 策略原理
策略的核心逻辑基于以下几个方面:
1. 使用两条不同周期(快速和慢速)的移动平均线来识别趋势方向和交叉信号
2. 通过计算价格与移动平均线的偏离度(以点数计)来量化趋势强度
3. 结合K线形态(吞没、锤子、射击之星、十字星等)作为辅助确认信号
4. 使用ATR指标动态计算止损和获利目标
5. 采用部分获利和追踪止损的方式进行订单管理

#### 策略优势
1. 系统具有很强的适应性,可以通过参数调整适应不同市场环境
2. 通过偏离度量化趋势强度,避免在趋势较弱时频繁交易
3. 结合多重技术指标和形态确认,提高交易信号的可靠性
4. 采用基于ATR的动态止损方式,合理控制风险
5. 支持复利和固定仓位两种资金管理方式
6. 具备部分获利和追踪止损功能,有效保护盈利

#### 策略风险
1. 在震荡市场中可能产生较多假信号,建议增加震荡指标过滤
2. 多重指标组合可能导致错过一些交易机会
3. 参数优化过度可能导致过拟合风险
4. 在流动性较差的市场中,大额交易可能面临滑点风险
5. 需要合理设置止损比例,避免单次损失过大

#### 策略优化方向
1. 可以添加成交量指标作为趋势确认的辅助指标
2. 考虑引入市场波动率指标动态调整交易频率
3. 基于不同时间周期的趋势一致性进行信号过滤
4. 增加更多的止损方式选择,如时间止损等
5. 开发自适应参数优化机制,提高策略适应性

#### 总结
该策略通过结合移动平均线、趋势强度量化、K线形态和动态风险管理,构建了一个全面的交易系统。它既保持了策略逻辑的简洁性,又通过多重确认机制提高了交易的可靠性。策略的高度可定制性使其能够适应不同的交易风格和市场环境,但使用时需要注意参数优化和风险控制。

||

#### Overview
This strategy is an intelligent trading system based on multiple moving averages and trend intensity. It measures market trend strength by analyzing the deviation between price and moving averages of different periods, combined with ATR volatility indicator for position management and risk control. The strategy offers high customizability and can flexibly adjust parameters according to different market environments and trading needs.

#### Strategy Principle
The core logic of the strategy is based on the following aspects:
1. Uses two moving averages (fast and slow) of different periods to identify trend direction and crossing signals
2. Quantifies trend strength by calculating the deviation between price and moving averages (in points)
3. Incorporates candlestick patterns (engulfing, hammer, shooting star, doji) as confirmation signals
4. Uses ATR indicator to dynamically calculate stop loss and profit targets
5. Employs partial profits and trailing stops for order management

#### Strategy Advantages
1. System has strong adaptability through parameter adjustment for different market environments
2. Quantifies trend strength through deviation measurement to avoid frequent trading in weak trends
3. Combines multiple technical indicators and patterns for improved signal reliability
4. Uses ATR-based dynamic stop loss for reasonable risk control
5. Supports both compound and fixed position sizing methods
6. Features partial profit-taking and trailing stops to protect profits effectively

#### Strategy Risks
1. May generate false signals in ranging markets, consider adding oscillator filters
2. Multiple indicator combinations might miss some trading opportunities
3. Over-optimization of parameters can lead to overfitting risk
4. Large trades in less liquid markets may face slippage risk
5. Requires proper stop loss settings to avoid excessive single losses

#### Strategy Optimization
1. Can add volume indicators as supplementary trend confirmation
2. Consider introducing volatility indicators to dynamically adjust trading frequency
3. Filter signals based on trend consistency across different timeframes
4. Add more stop loss options, such as time-based stops
5. Develop adaptive parameter optimization mechanisms to improve strategy adaptability

#### Summary
This strategy builds a comprehensive trading system by combining moving averages, trend strength quantification, candlestick patterns, and dynamic risk management. It maintains strategic simplicity while enhancing trading reliability through multiple confirmation mechanisms. The strategy's high customizability allows it to adapt to different trading styles and market environments, but attention must be paid to parameter optimization and risk control during implementation.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-03 00:00:00
end: 2024-12-10 00:00:00
period: 10m
basePeriod: 10m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Customizable Strategy with Signal Intensity Based on Pips Above/Below MAs", overlay=true)

// Customizable Inputs
// Account and Risk Management
account_size = input.int(100000, title="Account Size (USD)", minval=1)
compounded_results = input.bool(true, title="Compounded Results")
risk_per_trade = input.float(1.0, title="Risk per Trade (%)", minval=0.1, maxval=100) / 100

// Moving Averages Settings
ma1_length = input.int(50, title="Moving Average 1 Length", minval=1)
ma2_length = input.int(200, title="Moving Average 2 Length", minval=1)

// Higher Time Frame for Moving Averages
ma_htf = input.timeframe("D", title="Higher Time Frame for MA Delay")

// Signal Intensity Range based on pips
signal_intensity_min = input.int(0, title="Signal Intensity Start (Pips)", minval=0, maxval=1000)
signal_intensity_max = input.int(1000, title="Signal Intensity End (Pips)", minval=0, maxval=1000)

// ATR-Based Stop Loss and Take Profit
atr_length = input.int(14, title="ATR Length", minval=1)
atr_multiplier_stop = input.float(1.5, title="Stop Loss Size (ATR Multiplier)", minval=0.1)
atr_multiplier_take_profit = input.float(2.5, title="Take Profit Size (ATR Multiplier)", minval=0.1)

// Trailing Stop and Partial Profit
trailing_stop_rr = input.float(2.0, title="Trailing Stop (R:R)", minval=0)
partial_profit_percentage = input.float(50, title="Take Partial Profit (%)", minval=0, maxval=100)

// Trend Filter Settings
trend_filter_enabled = input.bool(true, title="Trend Filter Enabled")
trend_filter_sensitivity = input.float(50, title="Trend Filter Sensitivity", minval=0, maxval=100)

// Candle Pattern Type for Entry
entry_candle_type = input.string("Any", title="Entry Candle Type", options=["Any", "Engulfing", "Hammer", "Shooting Star", "Doji"])

// Moving Average Entry Conditions
ma_entry_condition = input.string("Both", title="MA Entry", options=["Fast Above Slow", "Fast Below Slow", "Both"])

// Trade Direction (Long, Short, or Both)
trade_direction = input.string("Both", title="Trade Direction", options=["Long", "Short", "Both"])

// ATR Calculation
atr_value = ta.atr(atr_length)

// Moving Average Calculations (using Higher Time Frame)
ma1_htf = ta.sma(request.security(syminfo.tickerid, ma_htf, close), ma1_length)
ma2_htf = ta.sma(request.security(syminfo.tickerid, ma_htf, close), ma2_length)

// Candle Pattern Conditions
is_engulfing = close[1] < open[1] and close > open and high > high[1] and low < low[1]
is_hammer = (high - low) > 3 * (close - open) and (close > open) and (low == ta.lowest(low, 5))
is_shooting_star = (high - low) > 3 * (open - close) and (open > close) and (high == ta.highest(high, 5))
is_doji = (close - open) <= ((high - low) * 0.1)

// Apply the selected candle pattern
candle_condition = false
if entry_candle_type == "Any"
    candle_condition := true
if entry_candle_type == "Engulfing"
    candle_condition := is_engulfing
if entry_candle_type == "Hammer"
    candle_condition := is_hammer
if entry_candle_type == "Shooting Star"
    candle_condition := is_shooting_star
if entry_candle_type == "Doji"
    candle_condition := is_doji

// Moving Average Entry Conditions
ma_cross_above = ta.crossover(ma1_htf, ma2_htf)
ma_cross_below = ta.crossunder(ma1_htf, ma2_htf)

// Calculate pips distance to MAs and normalize it for signal intensity
pip_size = syminfo.mintick * 10  // Assuming Forex; for other asset classes, modify as needed

// Calculate distances in pips between price and MAs
distance_to_ma1_pips = math.abs(close - ma1_htf) / pip_size
distance_to_ma2_pips = math.abs(close - ma2_htf) / pip_size

// Calculate signal intensity based on the pips distance
// Normalize the signal intensity between the user-specified min and max
signal_intensity = math.min(math.max((distance_to_ma1_pips + distance_to_ma2_pips), signal_intensity_min), signal_intensity_max)

// Trend Filter Condition (Optional)
trend_condition = false
if trend_filter_enabled
    trend_condition := ta.sma(close, ma2_length) > ta.sma(close, ma2_length + int(trend_filter_sensitivity))

// Entry Conditions Based on MA, Candle Patterns, and Trade Direction
long_condition = (trade_direction == "Long" or trade_direction == "Both") and (ma_entry_condition == "Fast Above Slow" or ma_entry_condition == "Both") and ma_cross_above and candle_condition and (not trend_filter_enabled or trend_condition) and signal_intensity > signal_intensity_min
short_condition = (trade_direction == "Short" or trade_direction == "Both") and (ma_entry_condition == "Fast Below Slow" or ma_entry_condition == "Both") and ma_cross_below and candle_condition and (not trend_filter_enabled or not trend_condition) and signal_intensity > signal_intensity_min

// Position Sizing Based on Risk Per Trade and ATR for Stop Loss
risk_amount = account_size * risk_per_trade
stop_loss_atr = atr_multiplier_stop * atr_value

// Calculate the position size based on the risk amount and ATR stop loss
position_size = risk_amount / stop_loss_atr

// If compounded results are not enabled, adjust position size for non-compounded returns
if not compounded_results
    position_size := position_size / account_size * 100000  // Adjust for non-compounded results

// Convert take profit and stop loss from ATR to USD
pip_value = syminfo.mintick * 10  // Assuming Forex; for other asset classes, modify as needed
take_profit_atr = atr_multiplier_take_profit * atr_value
take_profit_usd = (take_profit_atr * pip_value) * position_size
stop_loss_usd = (stop_loss_atr * pip_value) * position_size

// Trailing Stop
trail_stop_level = trailing_stop_rr * stop_loss_atr

// Initialize long_box_id and short_box_id as boxes (not ints)
var box long_box_id = na
var box short_box_id = na

// Track Monthly Profit
var float monthly_profit = 0.0
if (month(timenow) != month(timenow[1]))  // New month
    monthly_profit := 0

// Long Trade Management
if long_condition
    strategy.entry("Long", strategy.long, qty=position_size)
    // Partial Profit at 50% position close when 1:1 risk/reward
    strategy.exit("Partial Profit", from_entry="Long", limit=strategy.position_avg_price + stop_loss_atr, qty_percent=partial_profit_percentage / 100)
    // Full take profit and stop loss with trailing stop
    strategy.exit("Take Profit Long", from_entry="Long", limit=strategy.position_avg_price + take_profit_atr, stop=strategy.position_avg_price - stop_loss_atr, trail_offset=trail_stop_level)

    // Delete the old box if it exists
    if not na(long_box_id)
        box.delete(long_box_id)
    
    // Plot Take Profit and Stop Loss for Long Positions
    // long_box_id := box.new(left=bar_index - 1, top=strategy.position_avg_price + take_profit_atr, right=bar_index, bottom=strategy.position_avg_price - stop_loss_atr, bgcolor=color.new(color.green, 90), border_width=1, border_color=color.new(color.green, 0))

// Short Trade Management
if short_condition
    strategy.entry("Short", strategy.short, qty=position_size)
    // Partial Profit at 50% position close when 1:1 risk/reward
    strategy.exit("Partial Profit", from_entry="Short", limit=strategy.position_avg_price - stop_loss_atr, qty_percent=partial_profit_percentage / 100)
    // Full take profit and stop loss with trailing stop
    strategy.exit("Take Profit Short", from_entry="Short", limit=strategy.position_avg_price - take_profit_atr, stop=strategy.position_avg_price + stop_loss_atr, trail_offset=trail_stop_level)

    // Delete the old box if it exists
    // if not na(short_box_id)
    //     box.delete(short_box_id)

    // Plot Take Profit and Stop Loss for Short Positions
    // short_box_id := box.new(left=bar_index - 1, top=strategy.position_avg_price + stop_loss_atr, right=bar_index, bottom=strategy.position_avg_price - take_profit_atr, bgcolor=color.new(color.red, 90), border_width=1, border_color=color.new(color.red, 0))

// Plot MAs and Signals
plot(ma1_htf, color=color.blue, title="MA1 (HTF)")
plot(ma2_htf, color=color.red, title="MA2 (HTF)")
plotshape(series=long_condition, location=location.belowbar, color=color.green, style=shape.labelup, title="Buy Signal", text="BUY")
plotshape(series=short_condition, location=location.abovebar, color=color.red, style=shape.labeldown, title="Sell Signal", text="SELL")

```

> Detail

https://www.fmz.com/strategy/474712

> Last Modified

2024-12-11 17:46:33
