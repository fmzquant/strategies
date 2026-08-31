
> Name

Dynamic-Stop-Loss-Multi-Period-RSI-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bd6db7b22f0963d028.png)

[trans]
#### 概述
这是一个基于技术分析指标组合的趋势跟踪策略,主要通过RSI超买超卖、EMA交叉以及动态止损来进行交易。策略采用1.5%的风险控制,并结合杠杆来放大收益。该策略的核心在于通过多重技术指标的配合来确认趋势,同时运用动态的止盈止损来保护资金。策略设计充分考虑了小资金账户的特点,适合进行快速且频繁的交易。

#### 策略原理
策略使用了三个主要的技术指标:RSI(相对强弱指标)、EMA(指数移动平均线)和ATR(平均真实波幅)。入场信号由短期EMA(9周期)和长期EMA(21周期)的交叉确认,同时要求RSI在合理区间内(多头RSI<70,空头RSI>30)。策略采用基于ATR的动态止损方式,止盈位置为止损的4倍,这种设置可以在保证盈利的同时控制风险。每次交易的风险控制在账户的1.5%,通过2倍杠杆来提升收益潜力。

#### 策略优势
1. 风险控制严格:采用固定比例风险管理,每笔交易风险限制在1.5%
2. 动态止损设计:基于ATR的动态止损可以更好地适应市场波动
3. 多重信号确认:EMA交叉配合RSI过滤,提高信号可靠性
4. 风险收益比优化:止盈是止损的4倍,有利于获得更好的期望收益
5. 适合小资金:考虑到小资金账户特点,使用适度杠杆提升收益潜力
6. 自动化程度高:所有参数可调,便于根据市场情况优化

#### 策略风险
1. 市场波动风险:在剧烈波动市场中可能触发频繁止损
2. 杠杆风险:使用2倍杠杆会放大损失
3. 假突破风险:EMA交叉可能出现假信号
4. 滑点风险:快速市场中可能面临较大滑点
5. 资金管理风险:需要合理控制持仓规模

#### 策略优化方向
1. 增加趋势过滤器:可添加更长周期的趋势判断
2. 优化入场时机:可以结合成交量指标改善进场点位
3. 动态调整参数:根据波动率自动调整ATR倍数
4. 引入市场情绪指标:增加情绪指标来过滤高风险市场环境
5. 完善资金管理:增加动态仓位管理机制

#### 总结
这是一个设计合理的趋势跟踪策略,通过多重技术指标的配合来提高交易的成功率。策略的风险控制机制完善,适合小资金账户使用。但是在实盘交易中,需要注意市场环境的变化,适时调整参数来适应不同的市场状态。建议在实盘之前,进行充分的回测验证,并在小仓位下逐步适应策略特点。 || 

#### Overview
This is a trend-following strategy based on a combination of technical indicators, primarily using RSI overbought/oversold conditions, EMA crossovers, and dynamic stop-loss for trading. The strategy employs 1.5% risk control combined with leverage to amplify returns. Its core lies in confirming trends through multiple technical indicators while using dynamic take-profit and stop-loss levels to protect capital. The strategy is specifically designed for small-account characteristics, suitable for quick and frequent trading.

#### Strategy Principles
The strategy utilizes three main technical indicators: RSI (Relative Strength Index), EMA (Exponential Moving Average), and ATR (Average True Range). Entry signals are confirmed by crossovers between short-term EMA (9-period) and long-term EMA (21-period), while requiring RSI to be within reasonable ranges (long RSI<70, short RSI>30). The strategy employs ATR-based dynamic stop-loss, with take-profit levels set at 4 times the stop-loss, allowing for profit protection while controlling risk. Each trade risks 1.5% of the account, using 2x leverage to enhance profit potential.

#### Strategy Advantages
1. Strict risk control: Fixed percentage risk management, limiting each trade risk to 1.5%
2. Dynamic stop-loss design: ATR-based dynamic stops better adapt to market volatility
3. Multiple signal confirmation: EMA crossovers filtered by RSI improve signal reliability
4. Optimized risk-reward ratio: Take-profit at 4x stop-loss favors better expected returns
5. Suitable for small accounts: Moderate leverage enhances return potential
6. High automation: All parameters adjustable for market condition optimization

#### Strategy Risks
1. Market volatility risk: Frequent stop-losses possible in volatile markets
2. Leverage risk: 2x leverage amplifies losses
3. False breakout risk: EMA crossovers may generate false signals
4. Slippage risk: Significant slippage possible in fast markets
5. Money management risk: Requires proper position sizing control

#### Strategy Optimization Directions
1. Add trend filters: Incorporate longer-period trend determination
2. Optimize entry timing: Improve entry points using volume indicators
3. Dynamic parameter adjustment: Automatically adjust ATR multipliers based on volatility
4. Introduce market sentiment indicators: Filter high-risk market environments
5. Enhanced money management: Add dynamic position sizing mechanisms

#### Summary
This is a well-designed trend-following strategy that uses multiple technical indicators to improve trading success rates. The strategy features comprehensive risk control mechanisms suitable for small accounts. However, in live trading, attention must be paid to changing market conditions, with timely parameter adjustments to adapt to different market states. It is recommended to conduct thorough backtesting before live implementation and gradually adapt to the strategy's characteristics using small positions.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-04 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Aggressive Scalper Strategy", overlay=true)

// Parameters
account_balance = input.float(28.37, title="Account Balance", tooltip="Update this with your balance")
risk_per_trade = input.float(0.015, title="Risk per Trade", tooltip="1.5% risk")
leverage = input.int(2, title="Leverage", minval=1)
stop_loss_percentage = input.float(0.015, title="Stop Loss Percentage", tooltip="1.5% stop loss")
take_profit_multiplier = input.float(4, title="Take Profit Multiplier", tooltip="Take Profit is 4x Stop Loss")
stop_loss_multiplier = input.float(2, title="Stop Loss Multiplier", tooltip="Dynamic Stop Loss Multiplier")

// Trade Size Calculation
position_size = account_balance * risk_per_trade / (stop_loss_percentage / leverage)
trade_qty = position_size / close // This gives you the qty in terms of contracts

// Indicators
rsiLength = input.int(14, title="RSI Length")
emaShort = input.int(9, title="Short-term EMA Length")
emaLong = input.int(21, title="Long-term EMA Length")
rsi = ta.rsi(close, rsiLength)
emaShortLine = ta.ema(close, emaShort)
emaLongLine = ta.ema(close, emaLong)

// Entry Conditions
longCondition = ta.crossover(emaShortLine, emaLongLine) and rsi < 70
shortCondition = ta.crossunder(emaShortLine, emaLongLine) and rsi > 30

// ATR for dynamic stop loss and take profit levels
atrLength = input.int(14, title="ATR Length")
atrMultiplier = input.float(1.5, title="ATR Multiplier")
atr = ta.atr(atrLength)

// Dynamic Take Profit and Stop Loss Levels
longTakeProfitLevel = close + (atr * take_profit_multiplier)
longStopLossLevel = close - (atr * stop_loss_multiplier)
shortTakeProfitLevel = close - (atr * take_profit_multiplier)
shortStopLossLevel = close + (atr * stop_loss_multiplier)

// Strategy Execution
if (longCondition)
    strategy.entry("Long", strategy.long, qty=trade_qty)
    strategy.exit("Take Profit/Stop Loss", from_entry="Long", limit=longTakeProfitLevel, stop=longStopLossLevel)

if (shortCondition)
    strategy.entry("Short", strategy.short, qty=trade_qty)
    strategy.exit("Take Profit/Stop Loss", from_entry="Short", limit=shortTakeProfitLevel, stop=shortStopLossLevel)

// Alert Conditions
alertcondition(longCondition, title="Buy Signal", message="Long position entry signal detected.")
alertcondition(shortCondition, title="Sell Signal", message="Short position entry signal detected.")

// Display Information on Chart
var table_info = table.new(position.top_right, 2, 2, frame_color=color.blue, frame_width=1)
if (bar_index == na)
    table.cell(table_info, 0, 0, text="Aggressive Scalper", bgcolor=color.blue)
    table.cell(table_info, 1, 0, text="Account Balance: $" + str.tostring(account_balance), text_color=color.white)
    table.cell(table_info, 1, 1, text="Risk per Trade: " + str.tostring(risk_per_trade * 100) + "%", text_color=color.white)
    table.cell(table_info, 0, 1, text="Leverage: " + str.tostring(leverage) + "x", text_color=color.white)

```

> Detail

https://www.fmz.com/strategy/474052

> Last Modified

2024-12-05 16:25:17
