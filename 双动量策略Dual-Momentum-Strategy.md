
> Name

双动量策略Dual-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

双动量策略使用快速和慢速两个动量指标来产生交易信号和退出信号。这是一个响应迅速的策略,适用于日线和4小时线上的趋势性品种。本策略实现方式来自QuantCT应用程序。

可以将操作模式设置为多空或仅多头。

还可以设置固定止损或忽略止损,使策略仅根据进场和出场信号运行。

## 策略原理

该策略使用快速周期(默认5日)和慢速周期(默认10日)的动量指标。

当慢速动量和快速动量同时大于0时,产生做多信号。

当慢速动量或快速动量小于0时,产生平仓信号。

类似的,当慢速动量和快速动量同时小于0时,产生做空信号。当慢速动量或快速动量大于0时,产生平仓信号。

所以,该策略利用两组不同周期动量的交叉来捕捉趋势的变化,实现趋势追踪。

## 优势分析

- 使用双动量指标,可以比较准确地捕捉市场趋势的变化,降低假信号。

- 快速周期动量对市场变化敏感,可以快速响应趋势;慢速周期过滤市场噪音,确保交易方向正确。

- 可灵活选择仅做多或双向交易,适应不同交易偏好。

- 可选择是否使用止损,控制风险。

- 该策略反应灵敏,特别适合日线或更高周期的趋势交易,可以获得超额收益。

## 风险分析

- 双动量策略对趋势的判断依赖指标值大于或小于0,存在一定的滞后。

- 该策略更依赖趋势,在盘整市场中表现不佳,容易产生过多交易,导致交易费用增加。

- 如果不使用止损,则存在较大的单笔损失风险。

- 适合的品种和周期不当也会导致策略表现不佳。

为控制风险,建议适当调整动量周期参数,并设置合理固定止损比例。同时选择明确趋势的品种,在日线或更高周期运行该策略。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 增加其他指标过滤,例如MACD或RSI,避免趋势转折点的错误交易。

2. 增加自适应止损机制,根据市场波动程度来动态调整止损幅度。

3. 优化动量参数,找到不同品种更合适的参数组合。可以通过步进优化、Walk Forward Analysis等方法来实现。

4. 增加仓位管理机制,根据前期收益情况来调整新仓位大小。

5. 区分多头和空头市场,采取不对称出入场策略。空头市场可以更激进,多头市场可以更谨慎。

## 总结

双动量策略通过快速和慢速动量指标的交叉判断趋势方向,使用简单指标捕捉市场趋势变化,适合追踪日内或日间的明显趋势,可以获得较好的超额收益。同时,该策略也存在一定的滞后风险,需要结合止损和其他指标来控制风险,以及针对品种和参数进行优化,从而获得更稳定的表现。


||


## Overview

The Dual Momentum strategy uses fast and slow momentum indicators to generate entry and exit signals. It is a fast-reacting strategy well-suited for trending instruments on the daily and 4-hour timeframes. This implementation is based on the QuantCT app.  

The strategy allows configuring long/short or long-only mode. It also allows enabling fixed stop loss or ignoring it so that the strategy acts solely on entry and exit signals.

## Strategy Logic

The strategy uses fast period momentum (default 5 days) and slow period momentum (default 10 days). 

When slow momentum and fast momentum are both above 0, a long entry signal is generated.

When slow momentum or fast momentum goes below 0, an exit signal is generated.

Similarly, when slow momentum and fast momentum are both below 0, a short entry signal is generated. When slow momentum or fast momentum goes above 0, an exit signal is generated.

Thus, the strategy captures trend changes using the crossover of two momentum indicators with different periods.

## Advantage Analysis

- Using dual momentum provides more accurate trend change detection and fewer false signals.

- Fast period momentum reacts quickly to market changes, while slow period filters out noise.

- Flexible long/short or long-only modes suit different trading preferences.

- Optional stop loss controls risk.

- Fast-reacting nature makes it suitable for trend trading on daily or higher timeframes for outsized gains.

## Risk Analysis

- Dual momentum relies on indicator values above/below 0, which has some lag.

- The strategy is more trend-dependent and may underperform in range-bound markets with more whipsaws.

- Not using stop loss risks large losses.

- Wrong choice of symbols or timeframes can lead to poor results.

To control risks, tune the momentum periods, use reasonable fixed stop loss percentage, select strongly trending symbols and run on daily or higher timeframes.

## Enhancement Opportunities

The strategy can be enhanced in several ways:

1. Add filters like MACD or RSI to avoid wrong trades at trend turning points.

2. Add adaptive stop loss to adjust stop distance based on market volatility. 

3. Optimize momentum parameters for different symbols via stepwise optimization, walk forward analysis etc.

4. Add position sizing rules to adjust new position size based on past performance.

5. Differentiate long and short market conditions for asymmetric entries and exits.

## Conclusion

The Dual Momentum strategy captures trend direction using fast and slow momentum crossover. Using simple indicators to detect trend changes, it is suitable for riding intraday or multi-day trends and generating excess returns. Proper risk control via stop loss, symbol/parameter optimization can improve consistency.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Fast Period|
|v_input_2|10|Slow Period|
|v_input_3|false|Long Only|
|v_input_4|5|Stop-loss (%)|
|v_input_5|false|Use Stop-Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © QuantCT

//@version=4
strategy("Momentum Strategy Idea",
         shorttitle="Momentum", 
         overlay=false,
         pyramiding=0,     
         default_qty_type=strategy.percent_of_equity, 
         default_qty_value=100, 
         initial_capital=1000,           
         commission_type=strategy.commission.percent, 
         commission_value=0.075)

// ____ Inputs

fast_period = input(title="Fast Period", defval=5) 
slow_period = input(title="Slow Period", defval=10)
long_only = input(title="Long Only", defval=false)
slp = input(title="Stop-loss (%)", minval=1.0, maxval=25.0, defval=5.0)
use_sl = input(title="Use Stop-Loss", defval=false)

// ____ Logic

mom_fast = mom(close, fast_period)
mom_slow = mom(close, slow_period)
    
enter_long = (mom_slow > 0 and mom_fast > 0)
exit_long = (mom_slow < 0 or mom_fast < 0)
enter_short = (mom_slow < 0 and mom_fast < 0)
exit_short = (mom_slow > 0 or mom_fast > 0)

strategy.entry("Long", strategy.long, when=enter_long)
strategy.close("Long", when=exit_long) 
if (not long_only)
    strategy.entry("Short", strategy.short, when=enter_short)
    strategy.close("Short", when=exit_short) 
   
// ____ SL

sl_long = strategy.position_avg_price * (1- (slp/100))
sl_short = strategy.position_avg_price * (1 + (slp/100))
if (use_sl)
    strategy.exit(id="SL", from_entry="Long", stop=sl_long)
    strategy.exit(id="SL", from_entry="Short", stop=sl_short)
    
// ____ Plots

colors = 
 enter_long ? #27D600 :
 enter_short ? #E30202 :
 color.orange

mom_fast_plot = plot(mom_fast, color=colors)
mom_slow_plot = plot(mom_slow, color=colors)
fill(mom_fast_plot, mom_slow_plot, color=colors, transp=50)







```

> Detail

https://www.fmz.com/strategy/428081

> Last Modified

2023-09-28 15:03:57
