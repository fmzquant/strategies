
> Name

Multi-Target-EMA-Crossover-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a6f575ea248afd4c89.png)

#### Overview
This strategy is a trend following system based on EMA crossover signals. It uses a 34-period EMA as the main trend indicator, combined with multiple take-profit levels and risk management mechanisms for fully automated trading. The core concept is to capture trend initiation points through price-EMA crossovers and maximize profit opportunities through multiple profit targets.

#### Strategy Principles
The strategy operates based on these core principles:
1. Uses 34-period EMA as trend indicator
2. Opens long positions at EMA price when price crosses above EMA
3. Implements triple take-profit targets (5%, 10%, 15%) for staged profit-taking
4. Sets 7% stop-loss for risk control
5. Maintains 10% position for long-term trend capture
6. Implements 8-hour minimum trade interval to prevent overtrading
7. Supports both fixed volume and dynamic position sizing

#### Strategy Advantages
1. Multiple profit targets design performs well in various market conditions
2. Partial position retention for long-term trends captures extended movements
3. Supports leveraged trading with adjustable risk exposure
4. Includes mechanisms to prevent overtrading
5. Flexible position management with fixed or dynamic sizing options
6. Fully automated execution requiring no manual intervention
7. Highly parametric design accommodating different trading styles

#### Strategy Risks
1. EMA as a lagging indicator may delay entry timing
2. Multiple stop-losses possible in ranging markets
3. Leverage may amplify losses
4. Fixed percentage stop-loss may lack flexibility in volatile markets
5. Multiple profit targets might exit strong trends too early
Mitigation measures:
- Recommended for use in clear trending markets
- Adjust stop-loss based on market volatility
- Exercise caution with leverage
- Regular parameter optimization through backtesting

#### Optimization Directions
1. Add trend strength filter to improve entry quality
2. Implement dynamic stop-loss mechanism using ATR
3. Incorporate volume confirmation indicators
4. Develop adaptive profit target mechanism
5. Add market condition assessment module
6. Optimize dynamic trade interval adjustment
These optimizations can enhance strategy stability and profitability while reducing false signals.

#### Summary
This is a well-designed trend following strategy with clear logic. It captures trends through EMA crossovers, manages risk with multiple profit targets, and retains partial positions for extended trends. The strategy's high adaptability suits traders with different risk preferences. While inherent risks exist, proper parameter settings and risk management can achieve stable returns.


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-08 00:00:00
end: 2025-02-06 08:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA25 Long Strategy", overlay=true)

// Inputs
initial_capital = input.float(50000, title="Initial Capital ($)")
leverage = input.int(1, title="Leverage")
mode = input.string("Fixed Volume", title="Position Sizing Mode", options=["Fixed Volume", "Current Balance"])
ema_length = input.int(34, title="EMA Length")
stop_loss_percent = input.float(7, title="Stop Loss (%)", step=0.1) / 100
take_profit_1_percent = input.float(5, title="Take Profit 1 (%)", step=0.1) / 100
take_profit_2_percent = input.float(10, title="Take Profit 2 (%)", step=0.1) / 100
take_profit_3_percent = input.float(15, title="Take Profit 3 (%)", step=0.1) / 100
position_size_percent = input.float(100, title="Position Size (%)", step=1) / 100
long_term_hold_percent = input.float(10, title="Long Term Hold (%)", step=1) / 100
trade_delay = input.int(8, title="Trade Delay (hours)", minval=1) * 60  // Convert hours to minutes

// Calculate EMA
ema = ta.ema(close, ema_length)
// Plot EMA
plot(ema, title="EMA25", color=color.blue)

// Determine if a new trade can be placed
var float last_trade_time = na
can_trade = na(last_trade_time) or (time - last_trade_time) > trade_delay * 60 * 1000

// Determine position size based on selected mode
var float position_size = na
if (mode == "Fixed Volume")
    position_size := initial_capital * leverage * position_size_percent / close
else
    position_size := strategy.equity * leverage * position_size_percent / close

// Entry Condition
var float entry_price = na
price_crossed_ema_up = ta.crossover(close, ema)
price_crossed_ema_down = ta.crossunder(close, ema)

if ((price_crossed_ema_up or price_crossed_ema_down) and can_trade)
    entry_price := ema
    strategy.entry("Long", strategy.long, qty=position_size, limit=entry_price)
    last_trade_time := time
    label.new(bar_index, entry_price, text="Entry", color=color.green, style=label.style_label_up, textcolor=color.white, size=size.small)

// Stop Loss
strategy.exit("Stop Loss", from_entry="Long", stop=entry_price * (1 - stop_loss_percent))

// Take Profits
take_profit_1_price = entry_price * (1 + take_profit_1_percent)
take_profit_2_price = entry_price * (1 + take_profit_2_percent)
take_profit_3_price = entry_price * (1 + take_profit_3_percent)

strategy.exit("Take Profit 1", from_entry="Long", limit=take_profit_1_price, qty=position_size / 3)
strategy.exit("Take Profit 2", from_entry="Long", limit=take_profit_2_price, qty=position_size / 3)
strategy.exit("Take Profit 3", from_entry="Long", limit=take_profit_3_price, qty=position_size / 3)

// Long Term Hold (10% of position)
hold_qty = position_size * long_term_hold_percent
if (strategy.position_size > hold_qty)
    strategy.close("Long Term Hold")
```

> Detail

https://www.fmz.com/strategy/481109

> Last Modified

2025-02-08 15:22:15
