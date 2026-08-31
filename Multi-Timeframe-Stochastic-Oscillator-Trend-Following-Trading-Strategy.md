
> Name

Multi-Timeframe-Stochastic-Oscillator-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14f9b618be1e880d98c.png)

#### Overview
This strategy is a trend-following trading system that combines multi-timeframe Stochastic Oscillator with Exponential Moving Average (EMA). It uses higher timeframe Stochastic for overbought/oversold conditions, EMA as a trend filter, and integrates dynamic position sizing and trailing stop functionality, forming a comprehensive trading system.

#### Strategy Principles
The core logic is based on several key elements:
1. Uses higher timeframe Stochastic to identify overbought/oversold areas, generating potential signals through crossovers
2. Employs EMA as a trend filter, only taking long positions above EMA and short positions below
3. Calculates dynamic stop-loss and take-profit levels based on ATR, with stop-loss at 1.5x ATR and take-profit at 2x stop-loss
4. Implements risk-based position sizing, ensuring each trade risks a predetermined percentage of account balance
5. Optional trailing stop feature with a distance of 1.5x ATR

#### Strategy Advantages
1. Multiple signal confirmation: Combines higher timeframe Stochastic with EMA trend filter for improved signal reliability
2. Comprehensive risk management: Uses percentage-based risk management for capital preservation
3. Flexible stop-loss mechanism: Supports both fixed and trailing stops, adapting to different market conditions
4. Clear trade visualization: Automatically marks entry points, stop-loss, and target levels for easy execution
5. Dynamic position sizing: Adjusts trade size based on volatility for optimized capital efficiency

#### Strategy Risks
1. Trend reversal risk: May generate false signals in highly volatile markets
2. Slippage risk: Potential significant slippage during low liquidity periods
3. Parameter sensitivity: Strategy performance is sensitive to parameter settings, requiring careful optimization
4. Drawdown risk: May experience significant drawdowns during extreme market volatility
5. Stop-loss trigger risk: Trailing stops may trigger prematurely during increased volatility

#### Strategy Optimization Directions
1. Add market condition filters: Incorporate volatility or trend strength indicators to adjust parameters based on market conditions
2. Enhance signal confirmation: Consider adding volume confirmation or other technical indicators as supplementary filters
3. Improve position management: Dynamically adjust risk percentage based on market volatility
4. Refine stop-loss mechanism: Dynamically adjust trailing stop distance based on market characteristics
5. Implement time filters: Consider trading restrictions during key time periods to avoid news-related risks

#### Summary
This strategy builds a comprehensive trading system through multi-timeframe analysis and multiple signal confirmation mechanisms, combined with a robust risk management framework. While certain risks exist, continuous optimization and improvement can help maintain stable performance across different market conditions. It is suitable for experienced traders with higher risk tolerance.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2025-02-17 00:00:00
period: 3h
basePeriod: 3h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Ultimate fairas Oil", overlay=true)

// === Input Parameter ===
k_period = input(14, "K Period")
d_period = input(3, "D Period")
smooth_k = input(3, "Smooth K")
overbought = input(80, "Overbought Level")
oversold = input(20, "Oversold Level")
atrMult = input(1.5, "ATR Multiplier")
use_trailing_stop = input(true, "Enable Trailing Stop")
ema_length = input(50, "EMA Length")
risk_percent = input(2, "Risk per Trade (%)") / 100
account_balance = input(50000, "Account Balance")
mtf_tf = input.timeframe("D", "Higher Timeframe for Stochastic")

// === Multi-Timeframe Stochastic ===
stoch_source = request.security(syminfo.tickerid, mtf_tf, ta.stoch(close, high, low, k_period))
k = ta.sma(stoch_source, smooth_k)

// === Trend Filter (EMA) ===
ema = ta.ema(close, ema_length)
trendUp = close > ema
trendDown = close < ema

// === Entry Conditions ===
longCondition = ta.crossover(k, oversold) and trendUp
shortCondition = ta.crossunder(k, overbought) and trendDown

// === ATR-Based Stop Loss & Take Profit ===
atrValue = ta.atr(14)
stopLoss = atrMult * atrValue
takeProfit = 2 * stopLoss

// === Dynamic Lot Sizing (Risk Management) ===
risk_amount = account_balance * risk_percent
position_size = risk_amount / stopLoss

// === Trailing Stop Calculation ===
trailOffset = atrValue * 1.5
trailStopLong = use_trailing_stop ? close - trailOffset : na
trailStopShort = use_trailing_stop ? close + trailOffset : na

// === Execute Trades ===
if longCondition
    strategy.entry("Long", strategy.long, qty=position_size)
    strategy.exit("Exit Long", from_entry="Long", stop=close - stopLoss, limit=close + takeProfit, trail_points=use_trailing_stop ? trailOffset : na)

    // // Labels & Lines
    // label.new(x=bar_index, y=close, text="BUY", color=color.green, textcolor=color.white, size=size.small, style=label.style_label_down)
    // label.new(x=bar_index, y=close + takeProfit, text="TP ?", color=color.blue, textcolor=color.white, size=size.tiny)
    // label.new(x=bar_index, y=close - stopLoss, text="SL ❌", color=color.red, textcolor=color.white, size=size.tiny)
    // line.new(x1=bar_index, y1=close + takeProfit, x2=bar_index + 5, y2=close + takeProfit, width=2, color=color.blue)
    // line.new(x1=bar_index, y1=close - stopLoss, x2=bar_index + 5, y2=close - stopLoss, width=2, color=color.red)

    // Alert
    alert("BUY Signal! TP: " + str.tostring(close + takeProfit) + ", SL: " + str.tostring(close - stopLoss) + ", Lot Size: " + str.tostring(position_size), alert.freq_once_per_bar_close)

if shortCondition
    strategy.entry("Short", strategy.short, qty=position_size)
    strategy.exit("Exit Short", from_entry="Short", stop=close + stopLoss, limit=close - takeProfit, trail_points=use_trailing_stop ? trailOffset : na)

    // // Labels & Lines
    // label.new(x=bar_index, y=close, text="SELL", color=color.red, textcolor=color.white, size=size.small, style=label.style_label_up)
    // label.new(x=bar_index, y=close - takeProfit, text="TP ?", color=color.blue, textcolor=color.white, size=size.tiny)
    // label.new(x=bar_index, y=close + stopLoss, text="SL ❌", color=color.green, textcolor=color.white, size=size.tiny)
    // line.new(x1=bar_index, y1=close - takeProfit, x2=bar_index + 5, y2=close - takeProfit, width=2, color=color.blue)
    // line.new(x1=bar_index, y1=close + stopLoss, x2=bar_index + 5, y2=close + stopLoss, width=2, color=color.green)

    // Alert
    alert("SELL Signal! TP: " + str.tostring(close - takeProfit) + ", SL: " + str.tostring(close + stopLoss) + ", Lot Size: " + str.tostring(position_size), alert.freq_once_per_bar_close)
```

> Detail

https://www.fmz.com/strategy/482504

> Last Modified

2025-02-18 17:53:04
