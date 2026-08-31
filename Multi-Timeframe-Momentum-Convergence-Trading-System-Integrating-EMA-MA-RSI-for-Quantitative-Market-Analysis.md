
> Name

Multi-Timeframe-Momentum-Convergence-Trading-System-Integrating-EMA-MA-RSI-for-Quantitative-Market-Analysis

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d90b8c17ac96738569c9.png)
![IMG](https://www.fmz.com/upload/asset/2d92fb9e2451a277052c0.png)


[trans]

## 概述

多时间周期动量协同交易策略是一个结合技术指标和多时间周期分析的量化交易系统。该策略核心在于同时监测短期(15分钟)和长期(4小时)时间周期上的市场动向,通过EMA(指数移动平均线)、MA(移动平均线)以及RSI(相对强弱指标)的协同确认来过滤假信号,只在多时间周期共同指向同一方向时才进行交易。策略采用EMA交叉、价格突破以及RSI动量确认等多重条件,辅以交易量确认,为市场提供高质量的入场信号。此外,策略还集成了基于ATR(平均真实波幅)的动态止损、固定百分比止盈止损以及追踪止损等风险管理功能,形成了一个完整的交易系统。

## 策略原理

该策略的核心原理基于多重技术指标在多个时间周期的综合分析,主要分为以下几个部分:

1. **多时间周期分析**: 策略同时分析15分钟(入场)和4小时(趋势确认)两个时间周期,确保交易方向与更大的市场趋势保持一致。

2. **入场条件(15分钟周期)**:
   - 多头入场: EMA13 > EMA62(短期动量看涨)、收盘价 > MA200(价格在主要趋势线上方)、快速RSI(7) > 慢速RSI(28)(动量增加)、快速RSI > 50(动量偏向多头)、成交量大于20周期平均。
   - 空头入场: 与多头条件相反,要求EMA13 < EMA62、收盘价 < MA200、快速RSI(7) < 慢速RSI(28)、快速RSI < 50,同样需要交易量增加。

3. **趋势确认(4小时周期)**:
   - 多头确认: 与15分钟周期条件类似,但在RSI要求上略有不同,要求慢速RSI > 40。
   - 空头确认: 同样与15分钟周期条件相反,慢速RSI < 60。

4. **精确入场要求**: 策略要求要么EMA13刚刚穿越EMA62(形成交叉),要么价格刚刚穿越MA200,这提供了更精确的入场点,避免在已经持续较长时间的趋势中盲目入场。

5. **退出机制**: 提供了多种退出选项,包括技术指标反转(EMA关系改变或RSI达到超买/超卖)、ATR动态止损、固定百分比止损止盈以及追踪止损。

## 策略优势

1. **系统化的多时间周期分析**: 通过综合分析不同时间周期上的市场状况,策略能够过滤掉短期市场噪音,只在趋势明确且一致时入场,大幅降低了假信号的可能性。

2. **多重确认机制**: 通过EMA、MA和RSI等多个指标的协同确认,增加了交易信号的可靠性。特别是要求EMA交叉或价格突破作为触发条件,提高了入场时机的精确性。

3. **灵活的风险管理**: 策略提供了多种风险控制选项,包括基于ATR的动态止损、固定百分比止损止盈以及追踪止损,让交易者可以根据个人风险偏好和市场状况灵活调整风险参数。

4. **成交量确认**: 加入了成交量增加的条件,进一步过滤了可能的虚假突破,因为真实的价格运动通常伴随着交易量的增加。

5. **可视化界面**: 策略提供了直观的可视化面板,显示各项指标的状态和信号,使交易者能够一目了然地了解当前市场状况和策略判断。

6. **高度可定制性**: 策略几乎所有参数都可以通过输入设置进行调整,包括EMA长度、MA类型、RSI参数、风险控制倍数等,使交易者可以根据不同市场环境优化策略。

## 策略风险

1. **市场震荡风险**: 在横盘震荡市场中,EMA和MA可能频繁交叉,导致错误信号增多和频繁交易,从而产生连续亏损。解决方法是增加额外的过滤条件,如波动率判断或趋势强度确认,在明确识别为震荡市场时暂停交易。

2. **参数优化过拟合**: 过度优化指标参数可能导致策略在历史数据上表现出色,但在未来市场中失效。建议使用前推测试(Walk-Forward Analysis)验证策略稳健性,并在多个交易品种上测试一组固定参数。

3. **大幅缺口风险**: 在重大新闻或突发事件后,市场可能出现大幅缺口,导致止损无法在预设水平执行。可以考虑使用更保守的仓位管理或增加基于波动率的仓位调整机制。

4. **依赖量化指标的局限性**: 策略完全依赖技术指标,忽略了基本面因素。在重大经济数据发布或中央银行政策变更前,可以考虑减小仓位或暂停交易,避免突发消息带来的风险。

5. **信号滞后性**: EMA和MA等指标本质上具有滞后性,可能导致在趋势已经接近尾声时才产生信号。可以通过调整EMA周期或结合其他前瞻性指标(如价格形态或波动率变化)来改善。

## 策略优化方向

1. **加入市场环境过滤**: 引入自适应指标或市场结构判断,在策略运行前先识别当前市场是趋势市还是震荡市,并据此调整交易参数或暂停交易。例如,可以使用ADX(平均定向指数)来量化趋势强度,只在趋势明确时进行交易。

2. **动态参数调整机制**: 目前策略使用固定的技术指标参数,可以考虑基于市场波动率自动调整参数。例如,在低波动率环境下使用短周期EMA快速捕捉波动,高波动率环境下使用长周期EMA减少噪音。

3. **优化仓位管理**: 当前策略使用固定百分比资金管理,可以改进为基于波动率、胜率预期或凯利公式的动态仓位管理,以最大化风险调整后收益。

4. **增加机器学习元素**: 引入机器学习算法,如决策树或随机森林,来优化权重分配给各个指标,或者预测哪种市场环境下策略可能表现更好。

5. **加入基本面过滤**: 在重要经济数据发布前自动调整止损范围或暂停交易,以应对潜在的高波动性事件。

6. **优化多时间周期权重**: 当前策略简单要求两个时间周期同向确认,可以考虑引入更复杂的多时间周期加权系统,给予不同时间周期不同的权重,形成综合得分来判断入场时机。

7. **增加季节性分析**: 某些交易品种可能存在时间上的季节性特征,可以分析历史数据挖掘这些模式,并据此调整策略参数或交易时段。

## 总结

多时间周期动量协同交易策略是一个结构完整、逻辑清晰的量化交易系统,通过多时间周期分析和多指标协同确认,有效过滤市场噪音,捕捉高概率交易机会。策略整合了技术分析中的经典指标EMA、MA和RSI,并通过精确的入场要求和完善的风险管理体系,提高了交易质量。

该策略最大的优势在于其多重确认机制和多时间周期协同分析,这不仅能减少假信号,还能确保交易与主要趋势保持一致。同时,完备的风险管理选项让交易者可以灵活控制风险敞口。然而,策略也存在震荡市场表现不佳、参数优化过拟合以及技术指标滞后等风险。

未来优化方向主要集中在市场环境分类、参数动态调整、机器学习应用以及整合更多时间维度分析等方面。通过这些优化,策略有望在不同市场环境中保持稳定表现,进一步提高胜率和风险调整后收益。

对于寻求系统化、纪律性交易方法的交易者而言,这一策略提供了一个坚实的框架,既可以直接应用,也可以作为个人交易系统的基础进行定制和扩展。 || 

## Overview

The Multi-Timeframe Momentum Convergence Trading System is a quantitative trading strategy that combines technical indicators with multi-timeframe analysis. The core concept revolves around simultaneously monitoring market trends across short-term (15-minute) and long-term (4-hour) timeframes, using the convergence of EMA (Exponential Moving Average), MA (Moving Average), and RSI (Relative Strength Index) to filter out false signals. The strategy only executes trades when multiple timeframes align in the same direction. It employs EMA crossovers, price breakouts, and RSI momentum confirmation, supplemented by volume verification, to generate high-quality entry signals. Additionally, the system incorporates comprehensive risk management features including ATR-based dynamic stop-losses, fixed percentage take-profit/stop-loss levels, and trailing stops to form a complete trading framework.

## Strategy Principles

The core principles of this strategy are based on the synthesis of multiple technical indicators across different timeframes, divided into the following components:

1. **Multi-Timeframe Analysis**: The strategy simultaneously analyzes 15-minute (entry) and 4-hour (trend confirmation) timeframes to ensure trade direction aligns with the broader market trend.

2. **Entry Conditions (15-minute timeframe)**:
   - Long Entry: EMA13 > EMA62 (short-term bullish momentum), close price > MA200 (price above major trend indicator), Fast RSI(7) > Slow RSI(28) (increasing momentum), Fast RSI > 50 (bullish momentum bias), and volume greater than 20-period average.
   - Short Entry: Opposite of long conditions, requiring EMA13 < EMA62, close price < MA200, Fast RSI(7) < Slow RSI(28), Fast RSI < 50, with increased volume.

3. **Trend Confirmation (4-hour timeframe)**:
   - Long Confirmation: Similar to 15-minute conditions but with slightly different RSI requirements, requiring Slow RSI > 40.
   - Short Confirmation: Similarly opposite to long conditions, with Slow RSI < 60.

4. **Precise Entry Requirements**: The strategy requires either a fresh EMA13 crossover of EMA62 or a price crossing of MA200, providing more precise entry points and avoiding blind entries into trends that have been established for extended periods.

5. **Exit Mechanisms**: Multiple exit options including technical indicator reversals (EMA relationship changes or RSI reaching overbought/oversold), ATR-based dynamic stops, fixed percentage stop-loss/take-profit, and trailing stops.

## Strategy Advantages

1. **Systematic Multi-Timeframe Analysis**: By analyzing market conditions across different timeframes, the strategy filters out short-term market noise and only enters when trends are clear and consistent, significantly reducing the probability of false signals.

2. **Multiple Confirmation Mechanisms**: The synergy of EMA, MA, and RSI confirmations increases the reliability of trading signals. Particularly, requiring EMA crossovers or price breakouts as trigger conditions enhances entry timing precision.

3. **Flexible Risk Management**: The strategy offers various risk control options, including ATR-based dynamic stops, fixed percentage stop-loss/take-profit, and trailing stops, allowing traders to adjust risk parameters according to personal risk preferences and market conditions.

4. **Volume Confirmation**: The addition of increased volume as a condition further filters potential false breakouts, as genuine price movements are typically accompanied by increased trading volume.

5. **Visual Interface**: The strategy provides an intuitive visual dashboard displaying the status of various indicators and signals, enabling traders to clearly understand current market conditions and strategy assessments at a glance.

6. **High Customizability**: Almost all parameters of the strategy can be adjusted through input settings, including EMA lengths, MA type, RSI parameters, and risk control multipliers, allowing traders to optimize the strategy for different market environments.

## Strategy Risks

1. **Sideways Market Risk**: In range-bound, consolidating markets, EMA and MA may frequently cross, leading to increased false signals and frequent trading, potentially resulting in consecutive losses. The solution is to add additional filtering conditions, such as volatility assessment or trend strength confirmation, pausing trading when markets are clearly identified as ranging.

2. **Parameter Optimization Overfitting**: Excessive optimization of indicator parameters may cause the strategy to perform excellently on historical data but fail in future markets. It is recommended to use walk-forward analysis to verify strategy robustness and test a fixed set of parameters across multiple trading instruments.

3. **Large Gap Risk**: Following major news or sudden events, markets may experience significant gaps, preventing stops from executing at preset levels. Consider using more conservative position sizing or implementing volatility-based position adjustment mechanisms.

4. **Limitations of Reliance on Quantitative Indicators**: The strategy completely relies on technical indicators, ignoring fundamental factors. Before major economic data releases or central bank policy changes, consider reducing position size or pausing trading to avoid risks from sudden news.

5. **Signal Lag**: EMA, MA, and other indicators are inherently lagging, potentially generating signals when trends are already nearing their end. This can be improved by adjusting EMA periods or incorporating other forward-looking indicators (such as price patterns or volatility changes).

## Strategy Optimization Directions

1. **Market Environment Filtering**: Introduce adaptive indicators or market structure assessment to identify whether the current market is trending or ranging before strategy execution, adjusting trading parameters or pausing trading accordingly. For example, using ADX (Average Directional Index) to quantify trend strength and only trading when trends are clear.

2. **Dynamic Parameter Adjustment**: The current strategy uses fixed technical indicator parameters; consider automatically adjusting parameters based on market volatility. For example, using shorter-period EMAs to quickly capture movements in low-volatility environments and longer-period EMAs to reduce noise in high-volatility environments.

3. **Position Sizing Optimization**: The current strategy uses fixed percentage money management; this could be improved to dynamic position sizing based on volatility, expected win rate, or Kelly formula to maximize risk-adjusted returns.

4. **Machine Learning Integration**: Introduce machine learning algorithms, such as decision trees or random forests, to optimize weight allocation to various indicators or predict which market environments the strategy might perform better in.

5. **Fundamental Filtering**: Automatically adjust stop-loss ranges or pause trading before important economic data releases to address potential high-volatility events.

6. **Multi-Timeframe Weight Optimization**: The current strategy simply requires confirmation from two timeframes; consider introducing a more complex multi-timeframe weighting system, assigning different weights to different timeframes to form a comprehensive score for determining entry timing.

7. **Seasonal Analysis Addition**: Some trading instruments may exhibit temporal seasonal characteristics; analyze historical data to mine these patterns and adjust strategy parameters or trading periods accordingly.

## Summary

The Multi-Timeframe Momentum Convergence Trading System is a structurally complete, logically clear quantitative trading system that effectively filters market noise and captures high-probability trading opportunities through multi-timeframe analysis and multi-indicator confirmation. The strategy integrates classic technical analysis indicators EMA, MA, and RSI, and enhances trading quality through precise entry requirements and a comprehensive risk management system.

The strategy's greatest advantage lies in its multiple confirmation mechanisms and multi-timeframe collaborative analysis, which not only reduces false signals but also ensures trades align with the primary trend. Meanwhile, comprehensive risk management options allow traders to flexibly control risk exposure. However, the strategy also faces risks including poor performance in ranging markets, parameter optimization overfitting, and technical indicator lag.

Future optimization directions primarily focus on market environment classification, dynamic parameter adjustment, machine learning applications, and integration of additional temporal dimension analyses. Through these optimizations, the strategy has the potential to maintain stable performance across different market environments, further improving win rates and risk-adjusted returns.

For traders seeking systematic, disciplined trading methods, this strategy provides a solid framework that can be either directly applied or customized and extended as the foundation for a personalized trading system.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-25 00:00:00
end: 2025-03-24 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

// Advanced Multi-Timeframe EMA/MA/RSI Strategy
// Uses 4h for confluence and 15m for entry
// Version 6

//@version=6
strategy("Forex Fire EMA/MA/RSI Strategy", overlay=true, 
         default_qty_type=strategy.percent_of_equity, default_qty_value=100, 
         initial_capital=10000, pyramiding=0, calc_on_every_tick=true)

// Input parameters with sections
// Timeframe inputs
tf_entry = input.string("15", title="Entry Timeframe", options=["1", "5", "15", "30", "60", "120"], group="Timeframes")
tf_confluence = input.string("240", title="Confluence Timeframe", options=["60", "240", "D", "W"], group="Timeframes")

// Indicator settings
ema_short_length = input.int(13, title="EMA Short Length", minval=5, maxval=50, group="EMAs")
ema_long_length = input.int(62, title="EMA Long Length", minval=20, maxval=200, group="EMAs")
ma_length = input.int(200, title="Moving Average Length", minval=50, maxval=500, group="Moving Average")
ma_type = input.string("SMA", title="MA Type", options=["SMA", "EMA", "WMA", "VWMA"], group="Moving Average")

// RSI settings
rsi_slow_length = input.int(28, title="RSI Slow Length", minval=14, maxval=50, group="RSI")
rsi_fast_length = input.int(7, title="RSI Fast Length", minval=3, maxval=14, group="RSI")
rsi_overbought = input.int(70, title="RSI Overbought Level", minval=60, maxval=90, group="RSI")
rsi_oversold = input.int(30, title="RSI Oversold Level", minval=10, maxval=40, group="RSI")

// Strategy parameters
use_atr_exits = input.bool(true, title="Use ATR for Exit Targets", group="Strategy Settings")
atr_multiplier = input.float(2.0, title="ATR Multiplier for Exits", minval=1.0, maxval=5.0, step=0.1, group="Strategy Settings")
atr_length = input.int(14, title="ATR Length", minval=5, maxval=30, group="Strategy Settings")
use_stop_loss = input.bool(true, title="Use Stop Loss", group="Risk Management")
stop_loss_percent = input.float(2.0, title="Stop Loss (%)", minval=0.5, maxval=10.0, step=0.5, group="Risk Management")
use_take_profit = input.bool(true, title="Use Take Profit", group="Risk Management")
take_profit_percent = input.float(4.0, title="Take Profit (%)", minval=1.0, maxval=20.0, step=1.0, group="Risk Management")
use_trailing_stop = input.bool(true, title="Use Trailing Stop", group="Risk Management")
trailing_percent = input.float(1.5, title="Trailing Stop (%)", minval=0.5, maxval=5.0, step=0.1, group="Risk Management")

// Visual settings
show_plot = input.bool(true, title="Show Indicator Plots", group="Visuals")
show_signals = input.bool(true, title="Show Entry/Exit Signals", group="Visuals")
show_table = input.bool(true, title="Show Info Table", group="Visuals")

// Helper function for MA type
f_ma(src, length, type) =>
    switch type
        "SMA" => ta.sma(src, length)
        "EMA" => ta.ema(src, length)
        "WMA" => ta.wma(src, length)
        "VWMA" => ta.vwma(src, length)
        => ta.sma(src, length)

// ATR for dynamic exits
atr_value = ta.atr(atr_length)

// Indicators for Entry timeframe
ema_short_entry = ta.ema(close, ema_short_length)
ema_long_entry = ta.ema(close, ema_long_length)
ma_entry = f_ma(close, ma_length, ma_type)
rsi_slow_entry = ta.rsi(close, rsi_slow_length)
rsi_fast_entry = ta.rsi(close, rsi_fast_length)

// Indicators for Confluence timeframe
ema_short_conf = request.security(syminfo.tickerid, tf_confluence, ta.ema(close, ema_short_length), barmerge.gaps_off, barmerge.lookahead_off)
ema_long_conf = request.security(syminfo.tickerid, tf_confluence, ta.ema(close, ema_long_length), barmerge.gaps_off, barmerge.lookahead_off)
ma_conf = request.security(syminfo.tickerid, tf_confluence, f_ma(close, ma_length, ma_type), barmerge.gaps_off, barmerge.lookahead_off)
rsi_slow_conf = request.security(syminfo.tickerid, tf_confluence, ta.rsi(close, rsi_slow_length), barmerge.gaps_off, barmerge.lookahead_off)
rsi_fast_conf = request.security(syminfo.tickerid, tf_confluence, ta.rsi(close, rsi_fast_length), barmerge.gaps_off, barmerge.lookahead_off)

// Volume confirmation
volume_increasing = volume > ta.sma(volume, 20)

// Plotting indicators - completely outside of conditional blocks
// We'll use the show_plot variable directly in the color transparency
ema_short_plot_color = show_plot ? color.new(color.green, 0) : color.new(color.green, 100)
ema_long_plot_color = show_plot ? color.new(color.red, 0) : color.new(color.red, 100)
ma_plot_color = show_plot ? color.new(color.blue, 0) : color.new(color.blue, 100)

plot(ema_short_entry, title="EMA Short (Entry)", color=ema_short_plot_color, linewidth=2)
plot(ema_long_entry, title="EMA Long (Entry)", color=ema_long_plot_color, linewidth=2)
plot(ma_entry, title="MA (Entry)", color=ma_plot_color, linewidth=2)

// Define entry conditions for Entry timeframe
long_entry_condition = ema_short_entry > ema_long_entry and close > ma_entry and rsi_fast_entry > rsi_slow_entry and rsi_fast_entry > 50 and volume_increasing
short_entry_condition = ema_short_entry < ema_long_entry and close < ma_entry and rsi_fast_entry < rsi_slow_entry and rsi_fast_entry < 50 and volume_increasing

// Define confluence conditions from Confluence timeframe
long_confluence = ema_short_conf > ema_long_conf and close > ma_conf and rsi_slow_conf > 40 and rsi_fast_conf > rsi_slow_conf
short_confluence = ema_short_conf < ema_long_conf and close < ma_conf and rsi_slow_conf < 60 and rsi_fast_conf < rsi_slow_conf

// Advanced entry conditions
ema_crossover = ta.crossover(ema_short_entry, ema_long_entry)
ema_crossunder = ta.crossunder(ema_short_entry, ema_long_entry)
price_crossover_ma = ta.crossover(close, ma_entry)
price_crossunder_ma = ta.crossunder(close, ma_entry)

// Enhanced strategy conditions combining both timeframes with crossovers
long_condition = (long_entry_condition and long_confluence) and (ema_crossover or price_crossover_ma)
short_condition = (short_entry_condition and short_confluence) and (ema_crossunder or price_crossunder_ma)

// Exit conditions
long_exit_technical = ema_short_entry < ema_long_entry or rsi_fast_entry > rsi_overbought
short_exit_technical = ema_short_entry > ema_long_entry or rsi_fast_entry < rsi_oversold

// Strategy execution
var float entry_price = 0.0
var float stop_loss_level = 0.0
var float take_profit_level = 0.0
var float trailing_stop_level = 0.0

if (long_condition)
    entry_price := close
    stop_loss_level := use_stop_loss ? close * (1 - stop_loss_percent / 100) : 0.0
    take_profit_level := use_take_profit ? close * (1 + take_profit_percent / 100) : 0.0
    trailing_stop_level := use_trailing_stop ? close * (1 - trailing_percent / 100) : 0.0
    strategy.entry("Long", strategy.long)

if (short_condition)
    entry_price := close
    stop_loss_level := use_stop_loss ? close * (1 + stop_loss_percent / 100) : 0.0
    take_profit_level := use_take_profit ? close * (1 - take_profit_percent / 100) : 0.0
    trailing_stop_level := use_trailing_stop ? close * (1 + trailing_percent / 100) : 0.0
    strategy.entry("Short", strategy.short)

// Handle stops and exits
if strategy.position_size > 0
    // Update trailing stop for longs
    if use_trailing_stop and close > entry_price
        trail_level = close * (1 - trailing_percent / 100)
        trailing_stop_level := math.max(trailing_stop_level, trail_level)
    
    // Exit conditions for longs
    if (use_stop_loss and low < stop_loss_level and stop_loss_level > 0) or 
       (use_take_profit and high > take_profit_level and take_profit_level > 0) or 
       (use_trailing_stop and low < trailing_stop_level and trailing_stop_level > 0) or
       (long_exit_technical)
        strategy.close("Long")

if strategy.position_size < 0
    // Update trailing stop for shorts
    if use_trailing_stop and close < entry_price
        trail_level = close * (1 + trailing_percent / 100)
        trailing_stop_level := math.min(trailing_stop_level, trail_level)
    
    // Exit conditions for shorts
    if (use_stop_loss and high > stop_loss_level and stop_loss_level > 0) or 
       (use_take_profit and low < take_profit_level and take_profit_level > 0) or 
       (use_trailing_stop and high > trailing_stop_level and trailing_stop_level > 0) or
       (short_exit_technical)
        strategy.close("Short")

// ATR-based exits
if use_atr_exits and strategy.position_size != 0
    atr_stop_long = strategy.position_size > 0 ? close - (atr_value * atr_multiplier) : 0.0
    atr_stop_short = strategy.position_size < 0 ? close + (atr_value * atr_multiplier) : 0.0
    
    if strategy.position_size > 0 and low <= atr_stop_long
        strategy.close("Long", comment="ATR Exit")
    
    if strategy.position_size < 0 and high >= atr_stop_short
        strategy.close("Short", comment="ATR Exit")

// Visual signals on chart - completely outside conditional blocks
// Define plot conditions with show_signals incorporated
longEntryPlot = long_condition and show_signals
shortEntryPlot = short_condition and show_signals
longExitPlot = strategy.position_size > 0 and (long_exit_technical or 
             (use_stop_loss and low < stop_loss_level and stop_loss_level > 0) or 
             (use_take_profit and high > take_profit_level and take_profit_level > 0) or 
             (use_trailing_stop and low < trailing_stop_level and trailing_stop_level > 0)) and show_signals
shortExitPlot = strategy.position_size < 0 and (short_exit_technical or 
             (use_stop_loss and high > stop_loss_level and stop_loss_level > 0) or 
             (use_take_profit and low < take_profit_level and take_profit_level > 0) or 
             (use_trailing_stop and high > trailing_stop_level and trailing_stop_level > 0)) and show_signals

// Move plotshape outside of any conditional block
plotshape(series=longEntryPlot, title="Long Entry", style=shape.triangleup, location=location.belowbar, 
         color=color.new(color.green, 0), size=size.small)
plotshape(series=shortEntryPlot, title="Short Entry", style=shape.triangledown, location=location.abovebar, 
         color=color.new(color.red, 0), size=size.small)
plotshape(series=longExitPlot, title="Long Exit", style=shape.circle, location=location.abovebar, 
         color=color.new(color.orange, 0), size=size.small)
plotshape(series=shortExitPlot, title="Short Exit", style=shape.circle, location=location.belowbar, 
         color=color.new(color.orange, 0), size=size.small)

// Info table
if show_table
    var table info = table.new(position.top_right, 3, 7, color.new(color.black, 0), color.new(color.white, 0), 2, color.new(color.gray, 0), 2)
    
    table.cell(info, 0, 0, "INDICATOR", bgcolor=color.new(color.blue, 10), text_color=color.white)
    table.cell(info, 1, 0, "ENTRY (" + tf_entry + ")", bgcolor=color.new(color.blue, 10), text_color=color.white)
    table.cell(info, 2, 0, "CONF (" + tf_confluence + ")", bgcolor=color.new(color.blue, 10), text_color=color.white)
    
    table.cell(info, 0, 1, "EMA Relation", bgcolor=color.new(color.gray, 10), text_color=color.white)
    table.cell(info, 1, 1, ema_short_entry > ema_long_entry ? "Bullish" : "Bearish", 
         bgcolor=ema_short_entry > ema_long_entry ? color.new(color.green, 20) : color.new(color.red, 20), 
         text_color=color.white)
    table.cell(info, 2, 1, ema_short_conf > ema_long_conf ? "Bullish" : "Bearish", 
         bgcolor=ema_short_conf > ema_long_conf ? color.new(color.green, 20) : color.new(color.red, 20), 
         text_color=color.white)
    
    table.cell(info, 0, 2, "Price vs MA", bgcolor=color.new(color.gray, 10), text_color=color.white)
    table.cell(info, 1, 2, close > ma_entry ? "Above" : "Below", 
         bgcolor=close > ma_entry ? color.new(color.green, 20) : color.new(color.red, 20), 
         text_color=color.white)
    table.cell(info, 2, 2, close > ma_conf ? "Above" : "Below", 
         bgcolor=close > ma_conf ? color.new(color.green, 20) : color.new(color.red, 20), 
         text_color=color.white)
    
    table.cell(info, 0, 3, "RSI Fast vs Slow", bgcolor=color.new(color.gray, 10), text_color=color.white)
    table.cell(info, 1, 3, rsi_fast_entry > rsi_slow_entry ? "Bullish" : "Bearish", 
         bgcolor=rsi_fast_entry > rsi_slow_entry ? color.new(color.green, 20) : color.new(color.red, 20), 
         text_color=color.white)
    table.cell(info, 2, 3, rsi_fast_conf > rsi_slow_conf ? "Bullish" : "Bearish", 
         bgcolor=rsi_fast_conf > rsi_slow_conf ? color.new(color.green, 20) : color.new(color.red, 20), 
         text_color=color.white)
         
    table.cell(info, 0, 4, "Volume", bgcolor=color.new(color.gray, 10), text_color=color.white)
    table.cell(info, 1, 4, volume_increasing ? "Increasing" : "Decreasing", 
         bgcolor=volume_increasing ? color.new(color.green, 20) : color.new(color.red, 20), 
         text_color=color.white)
    table.cell(info, 2, 4, "n/a", bgcolor=color.new(color.gray, 40), text_color=color.white)
    
    table.cell(info, 0, 5, "Entry Signal", bgcolor=color.new(color.gray, 10), text_color=color.white)
    table.cell(info, 1, 5, long_entry_condition ? "Long" : (short_entry_condition ? "Short" : "None"), 
         bgcolor=long_entry_condition ? color.new(color.green, 20) : (short_entry_condition ? color.new(color.red, 20) : color.new(color.gray, 40)), 
         text_color=color.white)
    table.cell(info, 2, 5, long_confluence ? "Long" : (short_confluence ? "Short" : "None"), 
         bgcolor=long_confluence ? color.new(color.green, 20) : (short_confluence ? color.new(color.red, 20) : color.new(color.gray, 40)), 
         text_color=color.white)
    
    table.cell(info, 0, 6, "Final Signal", bgcolor=color.new(color.blue, 10), text_color=color.white)
    table.cell(info, 1, 6, long_condition ? "LONG" : (short_condition ? "SHORT" : "NONE"), 
         bgcolor=long_condition ? color.new(color.green, 0) : (short_condition ? color.new(color.red, 0) : color.new(color.gray, 20)), 
         text_color=color.white)
    table.cell(info, 2, 6, strategy.position_size > 0 ? "In LONG" : (strategy.position_size < 0 ? "In SHORT" : "No Position"), 
         bgcolor=strategy.position_size > 0 ? color.new(color.green, 20) : (strategy.position_size < 0 ? color.new(color.red, 20) : color.new(color.gray, 40)), 
         text_color=color.white)
```

> Detail

https://www.fmz.com/strategy/488142

> Last Modified

2025-03-25 14:18:20
