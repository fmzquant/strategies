
> Name

Multi-Target-EMA-Crossover-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a6f575ea248afd4c89.png)

[trans]
#### 概述
该策略是一个基于均线(EMA)交叉信号的趋势跟踪系统。它采用34周期EMA作为主要趋势指标,结合分批获利和风险控制机制,实现全自动化交易。策略的核心是通过价格与EMA的交叉来捕捉趋势启动点,并通过设置多重获利目标来最大化盈利机会。

#### 策略原理
策略主要基于以下核心原理运作:
1. 使用34周期EMA作为趋势判断指标
2. 当价格向上穿越EMA时,在EMA价格位置开仓做多
3. 采用三重获利目标(5%, 10%, 15%)实现分批止盈
4. 设置7%止损以控制风险
5. 保留10%仓位作为长期持仓以把握大趋势
6. 通过8小时最小交易间隔来避免过度交易
7. 支持固定交易量和动态仓位规模两种方式

#### 策略优势
1. 多重获利目标设计,能在不同市场环境下都有不错表现
2. 通过保留部分仓位作为长期持仓,可以享受大趋势带来的收益
3. 支持杠杆交易,可以根据风险偏好调整
4. 具有防止过度交易的机制
5. 仓位管理灵活,可以选择固定或动态仓位
6. 完全自动化,无需人工干预
7. 参数可调整性强,适应不同交易风格

#### 策略风险
1. EMA作为滞后指标可能导致入场时机延迟
2. 在震荡市场中可能产生多次止损
3. 使用杠杆可能放大损失
4. 固定百分比的止损可能在高波动市场中不够灵活
5. 多重获利目标可能导致过早退出强势趋势
应对措施:
- 建议在趋势明确的市场中使用
- 根据市场波动调整止损比例
- 谨慎使用杠杆
- 定期回测优化参数

#### 策略优化方向
1. 增加趋势强度过滤器,提高入场质量
2. 引入动态止损机制,如ATR止损
3. 加入成交量确认指标
4. 开发自适应的获利目标机制
5. 增加市场环境判断模块
6. 优化交易间隔的动态调整机制
这些优化可以提高策略的稳定性和盈利能力,减少假信号的影响。

#### 总结
这是一个设计合理、逻辑清晰的趋势跟踪策略。通过均线交叉捕捉趋势,使用多重获利目标管理风险,并保留部分仓位把握大趋势。策略的可调整性强,适合不同风险偏好的交易者使用。虽然存在一些固有的风险,但通过合理的参数设置和风险管理可以实现稳定的收益。 ||

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
This is a well-designed trend following strategy with clear logic. It captures trends through EMA crossovers, manages risk with multiple profit targets, and retains partial positions for extended trends. The strategy's high adaptability suits traders with different risk preferences. While inherent risks exist, proper parameter settings and risk management can achieve stable returns.[/trans]



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
