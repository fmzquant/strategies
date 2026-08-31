
> Name

Advanced-Linear-Regression-Channel-Trading-Strategy-with-Dynamic-Exit-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ecbdc0bef391b97f07.png)
[trans]
该策略是一个基于线性回归通道和海因安士蜡烛图的量化交易系统，结合了动态止盈止损机制，专门用于把握市场中的快速波动机会。

#### 策略概述
本策略使用线性回归通道作为主要交易框架，通过监测价格在通道内的运动来识别潜在的交易机会。当价格突破通道下轨并出现1.8%以上的上涨时，系统会发出做多信号；当价格突破通道上轨并出现0.2%以上的下跌时，系统会发出做空信号。策略还整合了基于海因安士蜡烛图的动态出场系统，以及10%止盈和5%止损的风险管理机制。

#### 策略原理
策略的核心是基于30个周期的线性回归计算，通过标准差的2倍来设定通道宽度。入场信号基于以下条件：
1. 多头入场要求价格突破下轨后出现1.8%以上的上涨，且2小时内涨幅未超过5%
2. 空头入场需要价格突破上轨后出现0.2%以上的下跌
3. 使用3分钟时间框架的海因安士蜡烛图来确定出场时机
4. 设置了10%的止盈和5%的止损以控制风险

#### 策略优势
1. 结合了趋势和反转交易的特点，可以捕捉快速的市场机会
2. 使用海因安士蜡烛图作为出场指标，提供了更稳健的出场机制
3. 具有明确的风险控制措施，包括止盈止损设置
4. 通过线性回归通道过滤市场噪音，提高信号质量
5. 考虑了长期价格走势，避免在大幅上涨后做多

#### 策略风险
1. 在高波动市场中可能频繁触发止损
2. 对于快速反转的市场反应可能较慢
3. 固定的止盈止损比例可能不适合所有市场环境
4. 在横盘市场中可能产生过多假信号
5. 需要实时数据计算，对执行速度有一定要求

#### 策略优化方向
1. 建议根据市场波动率动态调整止盈止损比例
2. 可以添加成交量指标作为信号确认
3. 考虑引入自适应的线性回归周期
4. 优化海因安士出场条件，可能需要增加额外的确认指标
5. 建议加入交易时间过滤，避免在低流动性时段交易

#### 总结
该策略通过线性回归通道和价格突破相结合的方式，为交易者提供了一个相对完整的交易系统。其优势在于结合了多个技术指标和风险控制措施，但仍需要根据实际市场情况进行优化和调整。建议在实盘交易前进行充分的回测和参数优化。

 || 

This strategy is a quantitative trading system based on linear regression channels and Heikin-Ashi candlesticks, combined with dynamic take-profit and stop-loss mechanisms, specifically designed to capture rapid market movements.

#### Overview
The strategy uses linear regression channels as the main trading framework, identifying potential trading opportunities by monitoring price movements within the channel. Long signals are generated when the price breaks below the channel and shows a rise of more than 1.8%, while short signals occur when the price breaks above the channel and shows a drop of more than 0.2%. The strategy also integrates a dynamic exit system based on Heikin-Ashi candlesticks, along with 10% take-profit and 5% stop-loss risk management mechanisms.

#### Strategy Principles
The core of the strategy is based on a 30-period linear regression calculation, with channel width set at 2 times the standard deviation. Entry signals are based on the following conditions:
1. Long entries require a price break below the channel followed by a 1.8% rise, with no more than 5% increase within 2 hours
2. Short entries require a price break above the channel followed by a 0.2% drop
3. Uses 3-minute timeframe Heikin-Ashi candlesticks for exit timing
4. Implements 10% take-profit and 5% stop-loss for risk control

#### Strategy Advantages
1. Combines trend and reversal trading characteristics to capture quick market opportunities
2. Uses Heikin-Ashi candlesticks as exit indicators, providing more robust exit mechanisms
3. Has clear risk control measures, including take-profit and stop-loss settings
4. Filters market noise through linear regression channels, improving signal quality
5. Considers long-term price trends, avoiding long positions after significant rises

#### Strategy Risks
1. May trigger frequent stop-losses in highly volatile markets
2. Could be slow to react to rapid market reversals
3. Fixed take-profit and stop-loss ratios may not suit all market conditions
4. May generate excessive false signals in ranging markets
5. Requires real-time data calculation, placing demands on execution speed

#### Optimization Directions
1. Recommend dynamic adjustment of take-profit and stop-loss ratios based on market volatility
2. Consider adding volume indicators for signal confirmation
3. Consider introducing adaptive linear regression periods
4. Optimize Heikin-Ashi exit conditions, possibly adding additional confirmation indicators
5. Suggest implementing trading time filters to avoid low liquidity periods

#### Summary
This strategy provides traders with a relatively complete trading system by combining linear regression channels with price breakouts. Its strength lies in the integration of multiple technical indicators and risk control measures, but it still requires optimization and adjustment based on actual market conditions. Thorough backtesting and parameter optimization are recommended before live trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2025-02-16 08:00:00
period: 12h
basePeriod: 12h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy('STRATEGY WITH SL', overlay=true)

// Parameters for Linear Regression
length = input.int(30, title='Linear Regression Length')  
mult = input.float(2.0, title='Channel Multiplier', step=0.1)  

// Calculate Linear Regression
regression_line = ta.linreg(close, length, 0)

// Calculate Standard Deviation
stddev = ta.stdev(close, length)

// Upper and Lower Channel Boundaries
upper_channel = regression_line + mult * stddev
lower_channel = regression_line - mult * stddev

// Plot the Linear Regression and Channel
plot(regression_line, color=color.blue, linewidth=2, title='Linear Regression Line')
plot(upper_channel, color=color.green, linewidth=1, title='Upper Channel')
plot(lower_channel, color=color.red, linewidth=1, title='Lower Channel')

// Parameters for Price Move Check (Indicator 1: 1.8% Move)
threshold_move = 1.8 
large_threshold_move = 5.0  
timeframe_for_large_move = 120  

// Calculate the percentage change over the last 3 minutes
priceChange = (close - close[3]) / close[3] * 100

// Calculate the percentage change over the last 2 hours (120 minutes)
priceChange2Hour = (close - close[120]) / close[120] * 100

// Condition for a price move greater than 1.8%
isPriceUp = priceChange > threshold_move

// Condition for price move greater than 5% in 2 hours (no alert if true)
isLargePriceMove = priceChange2Hour > large_threshold_move

// Parameters for Price Drop Check (Indicator 2: 0.2% Drop)
threshold_drop = 0.2 / 100  // 0.2% threshold

// Get the price 3 minutes ago
price_3min_ago = request.security(syminfo.tickerid, '3', close[1])

// Calculate the percentage drop over the last 3 minutes
price_drop = (close - price_3min_ago) / price_3min_ago

// Condition for a 0.2% drop
drop_condition = price_drop <= -threshold_drop

// Track whether the price has crossed the upper or lower Linear Regression channel
var bool lower_crossed = false
var bool upper_crossed = false
var bool move_after_cross = false  
var bool alert_sent = false

// Reset flags when price crosses channels
if (close < lower_channel)
    lower_crossed := true
    move_after_cross := false

if (close > upper_channel)
    upper_crossed := true
    alert_sent := false  

// Combine both conditions for price crossing lower and upper channels and move/drop conditions
final_condition_long = lower_crossed and isPriceUp and not move_after_cross and not isLargePriceMove
final_condition_short = upper_crossed and drop_condition and not alert_sent

// Set flags when conditions are met
if (final_condition_long)
    move_after_cross := true

if (final_condition_short)
    alert_sent := true

// Heikin-Ashi calculation for dynamic timeframe (3-minute)
heikin_open = (open + close) / 2
heikin_close = (open + high + low + close) / 4
heikin_high = math.max(high, math.max(heikin_open, heikin_close))
heikin_low = math.min(low, math.min(heikin_open, heikin_close))

// Conditions for EXIT signals based on Heikin-Ashi candle body
exit_long_condition = (heikin_open > lower_channel and heikin_close < lower_channel) or (heikin_open < lower_channel and heikin_close > lower_channel)
exit_short_condition = heikin_open < upper_channel and heikin_close > upper_channel

// Strategy logic: Enter long or short based on the combined conditions

// Long Entry Condition
if (final_condition_long)
    strategy.entry('Long', strategy.long)

// Short Entry Condition
if (final_condition_short)
    strategy.entry('Short', strategy.short)

// Exit Conditions (EXIT-LONG and EXIT-SHORT)
if (exit_long_condition)
    strategy.close('Long')

if (exit_short_condition)
    strategy.close('Short')

// Take Profit and Stop Loss
take_profit = 10 / 100  // 10% Take Profit
stop_loss = 5 / 100    // 5% Stop Loss

// Calculate Take Profit and Stop Loss levels based on entry price
long_take_profit = strategy.position_avg_price * (1 + take_profit)
long_stop_loss = strategy.position_avg_price * (1 - stop_loss)

short_take_profit = strategy.position_avg_price * (1 - take_profit)
short_stop_loss = strategy.position_avg_price * (1 + stop_loss)

// Apply Take Profit and Stop Loss for Long and Short positions
strategy.exit('Take Profit/Stop Loss Long', from_entry='Long', limit=long_take_profit, stop=long_stop_loss)
strategy.exit('Take Profit/Stop Loss Short', from_entry='Short', limit=short_take_profit, stop=short_stop_loss)

// Plot background color when the conditions are met (for visual aid)
bgcolor(final_condition_long ? color.new(color.green, 90) : na, title='Price Move Alert After Lower Channel Crossed')
bgcolor(final_condition_short ? color.new(color.red, 90) : na, title='Price Drop Alert After Upper Channel Crossed')
bgcolor(exit_long_condition ? color.new(color.blue, 90) : na, title='EXIT-LONG Alert')
bgcolor(exit_short_condition ? color.new(color.orange, 90) : na, title='EXIT-SHORT Alert')

// Plot shapes when conditions are met
plotshape(final_condition_long, style=shape.labelup, location=location.belowbar, color=color.green, text='1.8% Move', textcolor=color.white, size=size.small)
plotshape(final_condition_short, style=shape.labeldown, location=location.abovebar, color=color.red, text='0.2% Drop', textcolor=color.white, size=size.small)
plotshape(exit_long_condition, style=shape.labeldown, location=location.abovebar, color=color.purple, text='EXIT-LONG', textcolor=color.white, size=size.small)
plotshape(exit_short_condition, style=shape.labelup, location=location.belowbar, color=color.orange, text='EXIT-SHORT', textcolor=color.white, size=size.small)

// Alert conditions for price moves and exits
alertcondition(final_condition_long, title="Price Move > 1.8% After Lower LR Channel Cross", message="Price crossed the lower Linear Regression Channel and moved more than 1.8% in the last 3 minutes!")
alertcondition(final_condition_short, title="Price Drop > 0.2% After Upper LR Channel Cross", message="Price crossed the upper Linear Regression Channel and dropped more than 0.2% in the last 3 minutes!")
alertcondition(exit_long_condition, title="EXIT-LONG: Heikin-Ashi Candle Body Crossing Lower LR Channel", message="The body of a 3-minute Heikin-Ashi candle is crossing outside the lower Linear Regression Channel.")
alertcondition(exit_short_condition, title="EXIT-SHORT: Heikin-Ashi Candle Body Crossing Upper LR Channel", message="The body of a 3-minute Heikin-Ashi candle is crossing outside the upper Linear Regression Channel.")

```

> Detail

https://www.fmz.com/strategy/482460

> Last Modified

2025-02-18 15:18:08
