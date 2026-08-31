
> Name

Advanced-Shadowless-Heikin-Ashi-with-VWAP-Trading-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d973da61a0bc4461e9e3.png)
![IMG](https://www.fmz.com/upload/asset/2d86b155b273bf39583a0.png)



[trans]
#### 概述
这是一个基于无影线平均K线(Heikin-Ashi)和成交量加权平均价格(VWAP)的自动交易系统。该策略通过识别特定的K线形态,结合VWAP作为动态支撑/阻力位,在设定的交易时间内执行买卖操作。系统采用固定止盈止损点位管理风险,并在每日特定时间强制平仓以避免隔夜风险。

#### 策略原理
策略的核心逻辑基于以下几个关键要素:
1. 使用Heikin-Ashi K线代替传统K线,通过计算开盘价、最高价、最低价和收盘价的平均值,能更好地识别市场趋势。
2. 买入条件:绿色Heikin-Ashi K线(无下影线)形成且价格位于VWAP之上。
3. 卖出条件:红色Heikin-Ashi K线(无上影线)形成且价格位于VWAP之下。
4. 采用固定50点的止盈目标,触及成本价则平仓。
5. 在15:01时强制平仓所有未平仓位置。

#### 策略优势
1. 结合了Heikin-Ashi和VWAP两个强大的技术指标,提高了交易信号的可靠性。
2. 无影线要求确保了更强的趋势确认信号。
3. 固定止盈止损点位有助于严格的风险控制。
4. 日内交易策略避免了隔夜风险。
5. 系统完全自动化,减少了人为情绪干扰。

#### 策略风险
1. 固定止盈止损点位可能不适合所有市场条件,特别是在波动性变化时。
2. 强制平仓时间可能导致错过延续性行情。
3. 无影线的严格要求可能导致错过部分有效交易机会。
4. 在横盘市场中可能产生频繁的假信号。
5. VWAP在低交易量期间的参考价值可能降低。

#### 策略优化方向
1. 引入ATR动态调整止盈止损点位,使策略更好地适应市场波动性。
2. 增加趋势过滤器,减少横盘市场中的假信号。
3. 优化平仓时间,可根据市场特征动态调整。
4. 添加交易量过滤器,提高VWAP指标的可靠性。
5. 实现追踪止损功能,更好地保护盈利。

#### 总结
该策略通过结合Heikin-Ashi和VWAP指标,构建了一个稳健的日内交易系统。虽然存在一些优化空间,但基本框架具有良好的实用性。通过提议的优化方向,策略有望在不同市场条件下取得更好的表现。重点是要根据具体交易品种的特点,对各项参数进行细致的调优。 || 

#### Overview
This is an automated trading system based on shadowless Heikin-Ashi candlesticks and Volume Weighted Average Price (VWAP). The strategy executes trades by identifying specific candlestick patterns and using VWAP as dynamic support/resistance levels within defined trading hours. It manages risk through fixed take-profit and stop-loss levels, with forced position closure at a specific time to avoid overnight exposure.

#### Strategy Principles
The core logic is based on several key elements:
1. Utilizes Heikin-Ashi candlesticks instead of traditional candlesticks, calculating averages of open, high, low, and close prices for better trend identification.
2. Buy signal: Green Heikin-Ashi candle (no lower shadow) forms above VWAP.
3. Sell signal: Red Heikin-Ashi candle (no upper shadow) forms below VWAP.
4. Implements fixed 50-point take-profit target with exit at cost price.
5. Forces position closure at 15:01 for all open positions.

#### Strategy Advantages
1. Combines powerful technical indicators Heikin-Ashi and VWAP for enhanced signal reliability.
2. Shadowless requirement ensures stronger trend confirmation signals.
3. Fixed take-profit and stop-loss levels enable strict risk control.
4. Intraday trading approach eliminates overnight risk.
5. Fully automated system reduces emotional interference.

#### Strategy Risks
1. Fixed profit/loss points may not suit all market conditions, especially during volatility changes.
2. Forced exit time might miss extended trends.
3. Strict shadowless requirements could miss valid trading opportunities.
4. May generate frequent false signals in ranging markets.
5. VWAP reliability may decrease during low volume periods.

#### Optimization Directions
1. Introduce ATR for dynamic adjustment of profit/loss points to better adapt to market volatility.
2. Add trend filters to reduce false signals in ranging markets.
3. Optimize exit timing with dynamic adjustment based on market characteristics.
4. Implement volume filters to enhance VWAP indicator reliability.
5. Develop trailing stop-loss functionality for better profit protection.

#### Summary
The strategy builds a robust intraday trading system by combining Heikin-Ashi and VWAP indicators. While there is room for optimization, the basic framework shows good practicality. Through the proposed optimization directions, the strategy has potential for better performance under various market conditions. The key is to fine-tune parameters according to specific trading instrument characteristics.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-07-16 00:00:00
end: 2025-02-19 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("Buy and Sell Signal with VWAP and Timed Exit", overlay=true)

// VWAP Calculation
vwap = ta.vwap(close)

// Heikin-Ashi Formula
var float heikin_open = na
var float heikin_close = na

heikin_open := na(heikin_open[1]) ? (open + close) / 2 : (heikin_open[1] + heikin_close[1]) / 2
heikin_close := (open + high + low + close) / 4
heikin_high = math.max(high, math.max(heikin_open, heikin_close))
heikin_low = math.min(low, math.min(heikin_open, heikin_close))

// Conditions for Sell (Red Heikin-Ashi with no upper shadow) and Buy (Green Heikin-Ashi with no lower shadow)
no_upper_shadow = heikin_high == math.max(heikin_open, heikin_close)
no_lower_shadow = heikin_low == math.min(heikin_open, heikin_close)

// Condition for red (sell) and green (buy) Heikin-Ashi candles
is_red_candle = heikin_close < heikin_open
is_green_candle = heikin_close > heikin_open

// Buy and Sell Signal Conditions
sell_signal = is_red_candle and no_upper_shadow and close < vwap
buy_signal = is_green_candle and no_lower_shadow and close > vwap

// Check current time (for 15:01 IST)
is_after_1501 = (hour == 15 and minute > 1) or (hour > 15)

// Check for open positions
open_sell_position = strategy.position_size < 0
open_buy_position = strategy.position_size > 0

// Trigger Sell order only if no open sell position exists and time is before 15:01, and price is below VWAP
if sell_signal and not open_sell_position and not is_after_1501
    strategy.entry("Sell", strategy.short)

// Trigger Buy order only if no open buy position exists and time is before 15:01, and price is above VWAP
if buy_signal and not open_buy_position and not is_after_1501
    strategy.entry("Buy", strategy.long)

// Define exit condition for Sell (opposite of Buy conditions)
exit_sell_condition = false

if open_sell_position
    entry_price = strategy.position_avg_price  // Get the average entry price for Sell
    current_price = close  // Current market price for Sell

    // Exit conditions for Sell
    exit_sell_condition := current_price > entry_price or entry_price - current_price >= 50

    // Exit if conditions are met
    if exit_sell_condition
        strategy.close("Sell")

// Define exit condition for Buy (opposite of Sell conditions)
exit_buy_condition = false

if open_buy_position
    entry_price = strategy.position_avg_price  // Get the average entry price for Buy
    current_price = close  // Current market price for Buy

    // Exit conditions for Buy
    exit_buy_condition := current_price < entry_price or current_price - entry_price >= 50

    // Exit if conditions are met
    if exit_buy_condition
        strategy.close("Buy")

// Exit at 15:01 IST for both Buy and Sell if not already exited
if (open_sell_position or open_buy_position) and (hour == 15 and minute == 1)
    strategy.close("Sell")
    strategy.close("Buy")

// Plot VWAP
plot(vwap, color=color.blue, linewidth=2, title="VWAP")

// Plot Heikin-Ashi Candles
plotcandle(heikin_open, heikin_high, heikin_low, heikin_close, color = is_red_candle ? color.red : (is_green_candle ? color.green : color.gray))

// Plot Sell signal on the chart
plotshape(sell_signal and not open_sell_position and not is_after_1501, style=shape.labeldown, location=location.abovebar, color=color.red, text="SELL", size=size.small)

// Plot Buy signal on the chart
plotshape(buy_signal and not open_buy_position and not is_after_1501, style=shape.labelup, location=location.belowbar, color=color.green, text="BUY", size=size.small)

// Plot Exit signals on the chart
plotshape(exit_sell_condition and open_sell_position, style=shape.labelup, location=location.belowbar, color=color.blue, text="EXIT SELL", size=size.small)
plotshape(exit_buy_condition and open_buy_position, style=shape.labeldown, location=location.abovebar, color=color.blue, text="EXIT BUY", size=size.small)

```

> Detail

https://www.fmz.com/strategy/483127

> Last Modified

2025-02-21 14:49:07
