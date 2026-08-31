
> Name

Dynamic-ATR-Stop-Loss-RSI-Oversold-Rebound-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1aa84010a36b301b8fe.png)

[trans]
#### 概述
该策略是一个基于RSI超卖信号和动态ATR止损的量化交易系统。策略使用日线级别数据,结合RSI指标的超卖信号和200日均线的趋势过滤,在市场超卖时捕捉反弹机会。该策略采用动态ATR止损和静态百分比止损双重保护机制,并设置了三重获利目标,通过分段减仓来实现收益最大化。

#### 策略原理
策略的核心逻辑包含以下几个关键要素:
1. 入场信号:当RSI(5)低于30的超卖水平,且价格位于200日均线之上时,系统发出做多信号。
2. 止损机制:采用1.5倍ATR(20)的动态止损和25%的固定止损相结合的双重机制。
3. 获利目标:设置了5%、10%和15%三个目标位,分别在达到目标时减仓33%、66%和100%。
4. 仓位管理:建议使用Kelly准则计算得出的59.13%仓位,或保守使用75%仓位进行交易。

#### 策略优势
1. 双重趋势确认:通过RSI超卖和均线趋势双重验证,提高交易胜率。
2. 灵活的风险控制:动态ATR止损能够根据市场波动自适应调整,固定止损提供最后防线。
3. 智能获利管理:三重目标位配合分段减仓,既能锁定部分利润又不会错过大行情。
4. 资金管理科学:采用Kelly准则优化仓位,在风险和收益之间取得平衡。

#### 策略风险
1. 趋势依赖性:策略在震荡市场可能频繁触发止损。
建议:可以增加震荡指标过滤假信号。

2. 止损幅度较大:25%的固定止损可能导致单次损失过大。
建议:根据个人风险承受能力调整止损比例。

3. 回撤风险:分段获利可能在强势行情中过早减仓。
建议:可以动态调整获利目标,或保留部分仓位追踪趋势。

#### 策略优化方向
1. 信号优化:
- 加入成交量确认
- 结合趋势指标如MACD
- 引入波动率过滤器

2. 止损优化:
- 实现动态止损比例
- 增加时间止损
- 加入盈亏比过滤

3. 获利优化:
- 基于ATR动态设置目标位
- 实现跟踪止盈
- 优化减仓比例

#### 总结
该策略通过结合RSI超卖信号和均线趋势过滤,配合动态ATR止损和三重获利目标,构建了一个完整的交易系统。策略的优势在于风险控制灵活,获利管理合理,但仍需要根据实际市场情况和个人风险偏好进行优化调整。通过持续改进信号系统、止损机制和获利策略,该系统有望在实盘交易中取得更好的表现。 

|| 

#### Overview
This strategy is a quantitative trading system based on RSI oversold signals and dynamic ATR stop-loss. Using daily timeframe data, it combines RSI oversold signals with a 200-day moving average trend filter to capture rebound opportunities in oversold market conditions. The strategy employs both dynamic ATR stop-loss and static percentage stop-loss mechanisms, along with triple profit targets implemented through staged position reduction.

#### Strategy Principles
The core logic includes the following key elements:
1. Entry Signal: System generates long signals when RSI(5) falls below the oversold level of 30 and price is above the 200-day moving average.
2. Stop-Loss Mechanism: Combines 1.5x ATR(20) dynamic stop-loss with a 25% fixed stop-loss.
3. Profit Targets: Sets three targets at 5%, 10%, and 15%, reducing position by 33%, 66%, and 100% respectively.
4. Position Management: Recommends using either Kelly Criterion calculated 59.13% position size or conservative 75% position size.

#### Strategy Advantages
1. Dual Trend Confirmation: Validates trades through both RSI oversold and moving average trend, improving win rate.
2. Flexible Risk Control: Dynamic ATR stop-loss adapts to market volatility while fixed stop-loss provides ultimate protection.
3. Intelligent Profit Management: Triple targets with staged position reduction secures profits while maintaining upside potential.
4. Scientific Capital Management: Optimizes position sizing using Kelly Criterion, balancing risk and reward.

#### Strategy Risks
1. Trend Dependency: Strategy may trigger frequent stops in ranging markets.
Suggestion: Add oscillator filters to reduce false signals.

2. Wide Stop-Loss: 25% fixed stop-loss may result in large single-trade losses.
Suggestion: Adjust stop-loss percentage based on personal risk tolerance.

3. Drawdown Risk: Staged profit-taking may reduce positions too early in strong trends.
Suggestion: Consider dynamic profit targets or retain portion for trend following.

#### Strategy Optimization Directions
1. Signal Optimization:
- Add volume confirmation
- Incorporate trend indicators like MACD
- Implement volatility filters

2. Stop-Loss Optimization:
- Implement dynamic stop-loss percentages
- Add time-based stops
- Include risk-reward filters

3. Profit-Taking Optimization:
- Set dynamic targets based on ATR
- Implement trailing stops
- Optimize position reduction ratios

#### Summary
This strategy constructs a complete trading system by combining RSI oversold signals with moving average trend filtering, complemented by dynamic ATR stop-loss and triple profit targets. Its strengths lie in flexible risk control and rational profit management, though optimization based on market conditions and personal risk preference is necessary. Through continuous improvement of the signal system, stop-loss mechanism, and profit-taking strategy, the system shows potential for better performance in live trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-27 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA/4.0) https://creativecommons.org/licenses/by-nc-sa/4.0/
// © wielkieef

//@version=5
strategy("Simple RSI stock Strategy [1D] ", overlay=true, pyramiding=1, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=75, calc_on_order_fills=false, slippage=0, commission_type=strategy.commission.percent, commission_value=0.03)

// Rsi
oversoldLevel = input(30, title="Oversold Level")
overboughtLevel = input(70, title="Overbought Level")
rsi = ta.rsi(close, 5)
rsi_overbought = rsi > overboughtLevel  
rsi_oversold = rsi < oversoldLevel

// Sma 200
lenghtSMA = input(200, title = "SMA lenght")
sma200 = ta.sma(close, lenghtSMA)

// ATR stop-loss
atrLength = input.int(20, title="ATR Length")
atrMultiplier = input.float(1.5, title="ATR Multiplier")
atrValue = ta.atr(atrLength)
var float long_stop_level = na
var float short_stop_level = na
var float tp1_level = na
var float tp2_level = na
var float tp3_level = na

// Strategy entry
long = (rsi_oversold ) and close > sma200 

// Take Profit levels
tp_1 = input.float(5.0, "TP 1", minval=0.1, step=0.1)
tp_2 = input.float(10.0, "TP 2", minval=0.2, step=0.1)
tp_3 = input.float(15.0, "TP 3", minval=0.3, step=0.1)

if long
    strategy.entry('Long', strategy.long)
    long_stop_level := close - atrMultiplier * atrValue
    tp1_level := strategy.position_avg_price * (1 + tp_1 / 100)
    tp2_level := strategy.position_avg_price * (1 + tp_2 / 100)
    tp3_level := strategy.position_avg_price * (1 + tp_3 / 100)

// basic SL - this code is from author RafaelZioni, modified by wielkieef
sl = input.float(25.0, 'Basic Stop Loss %', step=0.1)
per(procent) =>
    strategy.position_size != 0 ? math.round(procent / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)

// ATR SL
if (strategy.position_size > 0 and (close <= long_stop_level))
    strategy.close("Long")
    tp1_level := na
    tp2_level := na
    tp3_level := na
plot(long_stop_level, color=color.orange, linewidth=2, title="Long Stop Loss")

// TP levels
if (strategy.position_size > 0)
    if (not na(tp1_level) and close >= tp1_level)
        tp1_level := na
    if (not na(tp2_level) and close >= tp2_level)
        tp2_level := na
    if (not na(tp3_level) and close >= tp3_level)
        tp3_level := na

plot(strategy.position_size > 0 and not na(tp1_level) ? tp1_level : na, color=color.gray, style=plot.style_circles , linewidth=1, title="Take Profit 1")
plot(strategy.position_size > 0 and not na(tp2_level) ? tp2_level : na, color=color.gray, style=plot.style_circles , linewidth=1, title="Take Profit 2")
plot(strategy.position_size > 0 and not na(tp3_level) ? tp3_level : na, color=color.gray, style=plot.style_circles , linewidth=1, title="Take Profit 3")

// Strategy exit points for Take Profits
strategy.exit('TP 1', from_entry="Long", qty_percent=33, profit=per(tp_1), loss=per(sl))
strategy.exit('TP 2', from_entry="Long", qty_percent=66, profit=per(tp_2), loss=per(sl))
strategy.exit('TP 3', from_entry="Long", qty_percent=100, profit=per(tp_3), loss=per(sl))

// by wielkieef
```

> Detail

https://www.fmz.com/strategy/473388

> Last Modified

2024-11-29 16:18:55
