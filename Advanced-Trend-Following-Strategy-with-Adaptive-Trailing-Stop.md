
> Name

Advanced-Trend-Following-Strategy-with-Adaptive-Trailing-Stop

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/cc3f655937e4e31865.png) 

[trans]
#### 概述
这是一个基于Supertrend指标的趋势追踪策略,结合了自适应的跟踪止损机制。该策略主要通过Supertrend指标识别市场趋势方向,并利用动态调整的跟踪止损来管理风险和优化出场时机。策略支持多种止损方式,包括百分比止损、ATR止损和固定点数止损,能够根据不同市场环境灵活调整。

#### 策略原理
策略的核心逻辑基于以下几个关键要素:
1. 使用Supertrend指标作为趋势判断的主要依据,该指标结合了ATR(平均真实波幅)来衡量市场波动性
2. 入场信号由Supertrend方向变化触发,支持做多、做空或双向交易
3. 止损机制采用自适应的跟踪止损,可以根据市场波动自动调整止损位置
4. 交易管理系统包含仓位管理(默认为账户15%仓位)和时间过滤机制

#### 策略优势
1. 趋势捕捉能力强: 通过Supertrend指标能够有效识别主要趋势,减少误判
2. 风险控制完善: 采用多样化的止损机制,能够适应不同市场环境
3. 灵活性高: 支持多种交易方向和止损方式的配置
4. 自适应性强: 跟踪止损会根据市场波动自动调整,提高策略的适应能力
5. 完整的回测系统: 内置时间过滤功能,便于历史表现分析

#### 策略风险
1. 趋势反转风险: 在剧烈波动市场中可能出现虚假信号
2. 滑点风险: 跟踪止损的执行可能受到市场流动性影响
3. 参数敏感性: Supertrend的因子和ATR周期设置对策略表现影响较大
4. 市场环境依赖: 在震荡市场中可能频繁交易导致成本增加

#### 策略优化方向
1. 信号过滤优化: 可以添加额外的技术指标来过滤虚假信号
2. 仓位管理优化: 可以根据市场波动性动态调整持仓比例
3. 止损机制增强: 可以结合成本均价设计更复杂的止损逻辑
4. 入场时机优化: 可以增加价格结构分析来提高入场准确性
5. 回测系统完善: 可以添加更多的统计指标来评估策略表现

#### 总结
这是一个设计合理、风险可控的趋势追踪策略。通过结合Supertrend指标和灵活的止损机制,策略能够在保持较高盈利能力的同时有效控制风险。策略的可配置性强,适合在不同市场环境下使用,但需要经过充分的参数优化和回测验证。未来可以通过添加更多的技术分析工具和风险控制手段来进一步提升策略的稳定性和盈利能力。

|| 

#### Overview
This is a trend following strategy based on the Supertrend indicator, combined with an adaptive trailing stop loss mechanism. The strategy primarily uses the Supertrend indicator to identify market trend direction and employs dynamically adjusted trailing stops to manage risk and optimize exit timing. It supports multiple stop loss methods, including percentage-based, ATR-based, and fixed-point stops, allowing flexible adjustment according to different market conditions.

#### Strategy Principles
The core logic of the strategy is based on the following key elements:
1. Uses the Supertrend indicator as the primary basis for trend determination, which combines ATR (Average True Range) to measure market volatility
2. Entry signals are triggered by Supertrend direction changes, supporting long, short, or bilateral trading
3. Stop loss mechanism employs adaptive trailing stops that automatically adjust based on market volatility
4. Trade management system includes position sizing (default 15% of account equity) and time filtering mechanisms

#### Strategy Advantages
1. Strong trend capture capability: Effectively identifies major trends through the Supertrend indicator, reducing false signals
2. Comprehensive risk control: Employs diverse stop loss mechanisms suitable for different market environments
3. High flexibility: Supports configuration of multiple trading directions and stop loss methods
4. Strong adaptability: Trailing stops automatically adjust according to market volatility, enhancing strategy adaptability
5. Complete backtesting system: Built-in time filtering functionality for historical performance analysis

#### Strategy Risks
1. Trend reversal risk: False signals may occur in highly volatile markets
2. Slippage risk: Trailing stop execution may be affected by market liquidity
3. Parameter sensitivity: Supertrend factor and ATR period settings significantly impact strategy performance
4. Market environment dependency: Frequent trading in ranging markets may increase costs

#### Strategy Optimization Directions
1. Signal filtering optimization: Additional technical indicators can be added to filter false signals
2. Position management optimization: Position size can be dynamically adjusted based on market volatility
3. Stop loss mechanism enhancement: More complex stop loss logic can be designed incorporating cost average price
4. Entry timing optimization: Price structure analysis can be added to improve entry accuracy
5. Backtesting system improvement: More statistical indicators can be added to evaluate strategy performance

#### Summary
This is a well-designed trend following strategy with controllable risk. By combining the Supertrend indicator with flexible stop loss mechanisms, the strategy can maintain high profitability while effectively controlling risk. The strategy is highly configurable and suitable for use in different market environments, but requires thorough parameter optimization and backtesting verification. Future improvements can be made by adding more technical analysis tools and risk control measures to further enhance strategy stability and profitability.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Supertrend Strategy with Adjustable Trailing Stop [Bips]", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=15)

// Inputs
atrPeriod = input(10, "ATR Länge", "Average True Range „wahre durchschnittliche Schwankungsbreite“ und stammt aus der technischen Analyse. Die ATR misst die Volatilität eines Instruments oder eines Marktes. Mit ihr kann die Wahrscheinlichkeit für einen Trendwechsel bestimmt werden.", group="Supertrend Settings")
factor = input.float(3.0, "Faktor", step=0.1, group="Supertrend Settings")
tradeDirection = input.string("Long", "Trade Direction", options=["Both", "Long", "Short"], group="Supertrend Settings")
sl_type    = input.string("%", "SL Type", options=["%", "ATR", "Absolute"])
// Parameter für ST nur für einstieg -> Beim Ausstieg fragen ob der bool WWert true ist -> Für weniger und längere Trädes 

sl_perc    = input.float(4.0, "% SL", group="Stop Loss Einstellung")
atr_length = input.int(10, "ATR Length", group="Stop Loss Einstellung")
atr_mult   = input.float(2.0, "ATR Mult", group="Stop Loss Einstellung")
sl_absol   = input.float(10.0, "Absolute SL", group="Stop Loss Einstellung")

//-------------------------//
// BACKTESTING RANGE
fromDay   = input.int(defval=1, title="From Day", minval=1, maxval=31, group="Backtesting Einstellung")
fromMonth = input.int(defval=1, title="From Month", minval=1, maxval=12, group="Backtesting Einstellung")
fromYear  = input.int(defval=2016, title="From Year", minval=1970, group="Backtesting Einstellung")
toDay     = input.int(defval=1, title="To Day", minval=1, maxval=31, group="Backtesting Einstellung")
toMonth   = input.int(defval=1, title="To Month", minval=1, maxval=12, group="Backtesting Einstellung")
toYear    = input.int(defval=2100, title="To Year", minval=1970, group="Backtesting Einstellung")

startDate  = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond  = time >= startDate and time <= finishDate

//-------------------------//
// Supertrend calculation
[_, direction] = ta.supertrend(factor, atrPeriod)

// SL values
sl_val = sl_type == "ATR"      ? atr_mult * ta.atr(atr_length) : 
         sl_type == "Absolute" ? sl_absol : 
         close * sl_perc / 100
         
// Init Variables
var pos         = 0
var float trailing_sl = 0.0

// Signals
long_signal  = nz(pos[1]) !=  1 and high > nz(trailing_sl[1])
short_signal = nz(pos[1]) != -1 and low  < nz(trailing_sl[1]) 

// Calculate SL
trailing_sl := short_signal     ? high + sl_val : 
               long_signal      ? low  - sl_val : 
               nz(pos[1]) ==  1 ? math.max(low  - sl_val, nz(trailing_sl[1])) :  
               nz(pos[1]) == -1 ? math.min(high + sl_val, nz(trailing_sl[1])) : 
               nz(trailing_sl[1])
               
// Position var               
pos := long_signal  ? 1 : short_signal ? -1 : nz(pos[1]) 

// Entry logic
if ta.change(direction) < 0 and time_cond
    if tradeDirection == "Both" or tradeDirection == "Long"
        strategy.entry("Long", strategy.long, stop=trailing_sl)
    else
        strategy.close_all("Stop Short")

if ta.change(direction) > 0 and time_cond
    if tradeDirection == "Both" or tradeDirection == "Short"
        strategy.entry("Short", strategy.short, stop=trailing_sl)
    else
        strategy.close_all("Stop Long")

// Exit logic: Trailing Stop and Supertrend
//if strategy.position_size > 0 and not na(trailing_sl)
    //strategy.exit("SL-Exit Long", from_entry="Long", stop=trailing_sl)

//if strategy.position_size < 0 and not na(trailing_sl)
    //strategy.exit("SL-Exit Short", from_entry="Short", stop=trailing_sl)

// Trailing Stop visualization
plot(trailing_sl, linewidth = 2, color = pos == 1 ? color.green : color.red)
//plot(not na(trailing_sl) ? trailing_sl : na, color=pos == 1 ? color.green : color.red, linewidth=2, title="Trailing Stop")

```

> Detail

https://www.fmz.com/strategy/475591

> Last Modified

2024-12-20 14:12:05
