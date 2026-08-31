
> Name

Multi-Mode-Take-Profit-Stop-Loss-Trend-Following-Strategy-Based-on-EMA-Madrid-Ribbon-and-Donchian-Channel

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d543e8976a6674406a.png)

[trans]
#### 概述
这是一个结合了指数移动平均线(EMA)、马德里带(Madrid Ribbon)和唐奇安通道(Donchian Channel)的趋势跟踪策略。策略的独特之处在于提供了三种可切换的止盈止损模式:基于点数、基于金额和基于风险收益比。通过二次信号确认机制来提高交易的可靠性,仅在第二次出现有效信号时才进行交易。

#### 策略原理
策略使用三重技术指标组合来识别交易机会:
1. 200周期指数移动平均线用于确定整体趋势方向
2. 马德里带(5周期与100周期EMA的交叉)用于判断中期趋势
3. 唐奇安通道突破用于寻找具体入场时机

多头交易条件:价格位于200EMA之上、马德里带转为看涨且价格突破唐奇安通道上轨。
空头交易条件:价格位于200EMA之下、马德里带转为看跌且价格突破唐奇安通道下轨。
为降低虚假信号,策略仅在第二次出现有效信号时才执行交易。

#### 策略优势
1. 灵活的止盈止损管理系统,可根据不同交易风格切换模式
2. 多重技术指标的组合提供了更可靠的交易信号
3. 二次确认机制有效降低了虚假信号的影响
4. 策略完全避免了前瞻偏差,不存在重绘问题
5. 高度可定制化,便于适应不同市场环境

#### 策略风险
1. 趋势反转时可能出现较大回撤
解决方案:可通过调整指标参数来提高策略灵敏度
2. 过度依赖技术指标可能错过某些市场机会
解决方案:建议结合基本面分析
3. 固定的止盈止损可能不适应所有市场情况
解决方案:根据波动率动态调整止盈止损水平

#### 策略优化方向
1. 引入波动率指标来动态调整止盈止损水平
2. 增加交易量分析来提高信号可靠性
3. 加入更多的市场情绪指标
4. 开发自适应参数优化系统
5. 增加风险管理模块,如最大回撤控制

#### 总结
这是一个将多个经典技术指标结合的趋势跟踪策略,通过灵活的止盈止损管理和二次确认机制来提高交易的稳定性。策略的高度可定制性使其能够适应不同的市场环境和交易风格。建议在实盘使用前进行充分的历史数据回测,并根据具体市场特点调整参数设置。 || 

#### Overview
This is a trend following strategy that combines Exponential Moving Average (EMA), Madrid Ribbon, and Donchian Channel. The strategy's uniqueness lies in its three switchable take-profit/stop-loss modes: tick-based, dollar-based, and risk-reward ratio based. It enhances reliability through a double confirmation mechanism, only executing trades on the second valid signal.

#### Strategy Principles
The strategy employs a triple technical indicator combination to identify trading opportunities:
1. 200-period EMA to determine overall trend direction
2. Madrid Ribbon (crossover of 5-period and 100-period EMA) for medium-term trend judgment
3. Donchian Channel breakout for specific entry timing

Long trade conditions: price above 200 EMA, bullish Madrid Ribbon, and price breaks above Donchian Channel.
Short trade conditions: price below 200 EMA, bearish Madrid Ribbon, and price breaks below Donchian Channel.
To reduce false signals, trades are only executed on the second valid signal occurrence.

#### Strategy Advantages
1. Flexible TP/SL management system adaptable to different trading styles
2. Multiple technical indicators combination provides more reliable signals
3. Double confirmation mechanism effectively reduces false signals
4. Strategy completely avoids look-ahead bias with no repainting
5. Highly customizable for different market environments

#### Strategy Risks
1. Potential significant drawdowns during trend reversals
Solution: Adjust indicator parameters to increase strategy sensitivity
2. Over-reliance on technical indicators may miss certain market opportunities
Solution: Recommend combining with fundamental analysis
3. Fixed TP/SL may not suit all market conditions
Solution: Dynamically adjust TP/SL levels based on volatility

#### Strategy Optimization Directions
1. Introduce volatility indicators for dynamic TP/SL adjustment
2. Add volume analysis to improve signal reliability
3. Incorporate more market sentiment indicators
4. Develop adaptive parameter optimization system
5. Add risk management module, such as maximum drawdown control

#### Summary
This is a trend following strategy that combines multiple classic technical indicators, enhancing trading stability through flexible TP/SL management and double confirmation mechanism. The strategy's high customizability allows it to adapt to different market environments and trading styles. It is recommended to conduct thorough historical data backtesting before live trading and adjust parameters according to specific market characteristics.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-08 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=6
strategy("Pamplona Enhanced TP/SL Toggleable", overlay=true, default_qty_type=strategy.fixed, default_qty_value=1)

// Input settings
use_tick_based = input.bool(false, title="Use Tick-Based TP/SL")
use_dollar_based = input.bool(false, title="Use Dollar-Based TP/SL")
use_risk_reward = input.bool(true, title="Use Risk-Reward TP/SL") // Default option

tick_size = input.float(0.1, title="Tick Size (for Tick-Based)", minval=0.0001, step=0.0001)
ticks = input.int(10, title="Ticks (for Tick-Based TP/SL)", minval=1)
dollar_tp = input.float(10.0, title="Dollar Take Profit (for Dollar-Based)", minval=0.01, step=0.01)
dollar_sl = input.float(10.0, title="Dollar Stop Loss (for Dollar-Based)", minval=0.01, step=0.01)
risk_reward_ratio = input.float(2.0, title="Risk-Reward Ratio (for Risk-Reward TP/SL)", minval=0.1, step=0.1)
contract_size = input.int(1, title="Contract Size", minval=1)

// Retrieve indicators
ema200 = ta.ema(close, 200)
src = close
ma05 = ta.ema(src, 5)
ma100 = ta.ema(src, 100)
madrid_green = ma05 > ma100
dlen = input.int(20, title="Donchian Channel Period")
highest_d = ta.highest(high, dlen)
lowest_d = ta.lowest(low, dlen)
donchian_green = close > highest_d[1]
donchian_red = close < lowest_d[1]

// Track signals
var int long_signal_count = 0
var int short_signal_count = 0

// Conditions
long_condition_raw = madrid_green and donchian_green and close > ema200
short_condition_raw = not madrid_green and donchian_red and close < ema200

// Update signal counters
if long_condition_raw
    long_signal_count += 1
else
    long_signal_count := 0

if short_condition_raw
    short_signal_count += 1
else
    short_signal_count := 0

// Final conditions to enter on the second signal
long_condition = long_signal_count == 2
short_condition = short_signal_count == 2

// Ensure exactly one TP/SL mode is enabled
tp_sl_mode_count = (use_tick_based ? 1 : 0) + (use_dollar_based ? 1 : 0) + (use_risk_reward ? 1 : 0)
if tp_sl_mode_count != 1
    runtime.error("Enable exactly ONE TP/SL mode (Tick-Based, Dollar-Based, or Risk-Reward).")

// Function to calculate TP/SL based on active mode
calc_tp_sl(entry_price, is_long) =>
    float tp = na
    float sl = na
    if use_tick_based
        tp := is_long ? entry_price + ticks * tick_size : entry_price - ticks * tick_size
        sl := is_long ? entry_price - ticks * tick_size : entry_price + ticks * tick_size
    else if use_dollar_based
        tp := is_long ? entry_price + (dollar_tp / contract_size) : entry_price - (dollar_tp / contract_size)
        sl := is_long ? entry_price - (dollar_sl / contract_size) : entry_price + (dollar_sl / contract_size)
    else if use_risk_reward
        risk = is_long ? close - low : high - close
        tp := is_long ? close + (risk * risk_reward_ratio) : close - (risk * risk_reward_ratio)
        sl := is_long ? close - risk : close + risk
    [tp, sl]

// Entry logic
if long_condition
    [take_profit, stop_loss] = calc_tp_sl(close, true)
    strategy.entry("Long", strategy.long, qty=contract_size)
    strategy.exit("Take Profit", from_entry="Long", limit=take_profit, stop=stop_loss)

if short_condition
    [take_profit, stop_loss] = calc_tp_sl(close, false)
    strategy.entry("Short", strategy.short, qty=contract_size)
    strategy.exit("Take Profit", from_entry="Short", limit=take_profit, stop=stop_loss)

// Plot indicators
plot(ema200, title="200 EMA", color=color.white, linewidth=2)
bgcolor(long_condition ? color.new(color.green, 90) : short_condition ? color.new(color.red, 90) : na)

```

> Detail

https://www.fmz.com/strategy/477973

> Last Modified

2025-01-10 16:24:30
