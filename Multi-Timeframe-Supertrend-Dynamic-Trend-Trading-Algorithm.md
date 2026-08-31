
> Name

Multi-Timeframe-Supertrend-Dynamic-Trend-Trading-Algorithm

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f3b80468cdd0f1aa13.png)

[trans]
#### 概述
该策略是一个基于多时间周期Supertrend指标的自适应趋势跟踪系统。它通过整合15分钟、5分钟和2分钟三个不同时间周期的Supertrend信号,构建了一个全面的趋势识别框架。策略采用时间过滤器来确保仅在最活跃的交易时段运行,并在日末自动平仓以规避隔夜风险。

#### 策略原理
策略核心是通过多时间周期的趋势一致性来确认交易信号。具体而言:
1. 使用ATR周期和乘数因子计算每个时间周期的Supertrend线。
2. 在三个时间周期都出现看涨信号(价格位于Supertrend线上方)时触发买入。
3. 当价格跌破5分钟周期Supertrend线或达到交易日结束时触发卖出。
4. 通过时区设置和交易时段过滤器(默认09:30-15:30)来控制交易时间。

#### 策略优势
1. 多维度趋势确认提高了信号可靠性,有效降低了虚假突破带来的风险。
2. 自适应的Supertrend参数设置使策略能够适应不同的市场波动环境。
3. 严格的时间管理机制避免了低效交易时段的干扰。
4. 清晰的可视化界面展示了所有时间周期的趋势状态。
5. 灵活的仓位管理系统支持百分比配置。

#### 策略风险
1. 在横盘震荡市场可能产生过多交易信号,增加交易成本。
2. 多重过滤条件可能导致错过一些潜在的盈利机会。
3. 依赖参数优化,不同市场环境可能需要调整参数。
4. 计算复杂度较高,可能存在程序执行效率问题。

#### 策略优化方向
1. 引入波动率自适应机制,根据市场状态动态调整Supertrend参数。
2. 增加成交量确认指标,提高趋势判断的准确性。
3. 开发智能时间过滤算法,自动识别最佳交易时段。
4. 优化仓位管理算法,实现更精细的风险控制。
5. 添加市场环境分类模块,针对不同市场特征采用差异化策略。

#### 总结
该策略通过多时间周期趋势分析和严格的风控体系,构建了一个稳健的交易系统。虽然存在一些优化空间,但其核心逻辑扎实,适合进一步开发和实盘应用。系统的模块化设计也为未来扩展提供了良好基础。 || 

#### Overview
This strategy is an adaptive trend following system based on the Multi-Timeframe Supertrend indicator. It integrates Supertrend signals from 15-minute, 5-minute, and 2-minute timeframes to build a comprehensive trend identification framework. The strategy employs a time filter to ensure operation only during the most active trading sessions and automatically closes positions at the end of the day to avoid overnight risk.

#### Strategy Principles
The core mechanism relies on trend consistency across multiple timeframes to confirm trading signals. Specifically:
1. Calculates Supertrend lines using ATR period and multiplier factor for each timeframe.
2. Triggers buy signals when bullish conditions align across all three timeframes (price above Supertrend lines).
3. Initiates sell signals when price breaks below the 5-minute Supertrend line or reaches end of trading day.
4. Controls trading hours through timezone settings and session filter (default 09:30-15:30).

#### Strategy Advantages
1. Multi-dimensional trend confirmation enhances signal reliability and reduces false breakout risks.
2. Adaptive Supertrend parameters enable strategy adjustment to different market volatility environments.
3. Strict time management mechanism eliminates interference from inefficient trading periods.
4. Clear visualization interface displays trend status across all timeframes.
5. Flexible position management system supports percentage-based configuration.

#### Strategy Risks
1. May generate excessive trading signals in ranging markets, increasing transaction costs.
2. Multiple filtering conditions might cause missed profitable opportunities.
3. Parameter optimization dependency requires adjustments for different market environments.
4. High computational complexity may lead to execution efficiency issues.

#### Optimization Directions
1. Introduce volatility adaptive mechanism to dynamically adjust Supertrend parameters.
2. Add volume confirmation indicators to improve trend judgment accuracy.
3. Develop intelligent time filtering algorithm to automatically identify optimal trading sessions.
4. Optimize position management algorithm for more precise risk control.
5. Add market environment classification module to implement differentiated strategies for various market characteristics.

#### Summary
The strategy constructs a robust trading system through multi-timeframe trend analysis and strict risk control mechanisms. While there is room for optimization, its core logic is solid and suitable for further development and live trading application. The modular design also provides a strong foundation for future extensions.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-04 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Multi-Timeframe Supertrend Strategy", 
         overlay=true, 
         shorttitle="MTF Supertrend TF", 
         default_qty_type=strategy.percent_of_equity, 
         default_qty_value=100, 
         initial_capital=50000, 
         currency=currency.USD)

// === Input Parameters === //
atrPeriod = input.int(title="ATR Period", defval=10, minval=1)
factor = input.float(title="Factor", defval=3.0, step=0.1)

// === Time Filter Parameters === //
// Define the trading session using input.session
// Format: "HHMM-HHMM", e.g., "0930-1530"
sessionInput = input("0930-1530", title="Trading Session")

// Specify the timezone (e.g., "Europe/Istanbul")
// Refer to the list of supported timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
timezoneInput = input.string("Europe/Istanbul", title="Timezone", tooltip="Specify a valid IANA timezone (e.g., 'Europe/Istanbul', 'America/New_York').")

// === Calculate Supertrend for Different Timeframes === //
symbol = syminfo.tickerid

// 15-Minute Supertrend
[st_15m, dir_15m] = request.security(symbol, "15", ta.supertrend(factor, atrPeriod), lookahead=barmerge.lookahead_off)

// 5-Minute Supertrend
[st_5m, dir_5m] = request.security(symbol, "5", ta.supertrend(factor, atrPeriod), lookahead=barmerge.lookahead_off)

// 2-Minute Supertrend
[st_2m, dir_2m] = request.security(symbol, "2", ta.supertrend(factor, atrPeriod), lookahead=barmerge.lookahead_off)

// === Current Timeframe Supertrend === //
[st_current, dir_current] = ta.supertrend(factor, atrPeriod)

// === Time Filter: Check if Current Bar is Within the Trading Session === //
in_session = true

// === Define Trend Directions Based on Supertrend === //
is_up_15m = close > st_15m
is_up_5m  = close > st_5m
is_up_2m  = close > st_2m
is_up_current = close > st_current

// === Buy Condition === //
buyCondition = is_up_15m and is_up_5m and is_up_2m and is_up_current and in_session and strategy.position_size == 0

// === Sell Conditions === //
// 1. Price falls below the 5-minute Supertrend during trading session
sellCondition1 = close < st_5m

// 2. End of Trading Day: Sell at the close of the trading session
is_new_day = ta.change(time("D"))
sellCondition2 = not in_session and is_new_day

// Combined Sell Condition: Only if in Position
sellSignal = (sellCondition1 and in_session) or sellCondition2
sellCondition = sellSignal and strategy.position_size > 0

// === Execute Trades === //
if (buyCondition)
    strategy.entry("Buy", strategy.long)

if (sellCondition)
    strategy.close("Buy")

// === Plot Supertrend Lines === //
// Plotting current timeframe Supertrend
plot(st_current, title="Current TF Supertrend", color=is_up_current ? color.green : color.red, linewidth=2, style=plot.style_line)

// Plotting higher timeframe Supertrend lines
plot(st_15m, title="15m Supertrend", color=is_up_15m ? color.green : color.red, linewidth=1, style=plot.style_line)
plot(st_5m, title="5m Supertrend", color=is_up_5m ? color.green : color.red, linewidth=1, style=plot.style_line)
plot(st_2m, title="2m Supertrend", color=is_up_2m ? color.green : color.red, linewidth=1, style=plot.style_line)

// === Plot Buy and Sell Signals === //
plotshape(series=buyCondition, title="Buy Signal", location=location.belowbar, 
          color=color.green, style=shape.labelup, text="BUY", size=size.small)

plotshape(series=sellCondition, title="Sell Signal", location=location.abovebar, 
          color=color.red, style=shape.labeldown, text="SELL", size=size.small)

// === Optional: Background Color to Indicate Position === //
bgcolor(strategy.position_size > 0 ? color.new(color.green, 90) : na, title="In Position Background")

// === Alerts === //
// Create alerts for Buy and Sell signals
alertcondition(buyCondition, title="Buy Alert", message="Buy signal generated by MTF Supertrend Strategy with Time Filter.")
alertcondition(sellCondition, title="Sell Alert", message="Sell signal generated by MTF Supertrend Strategy with Time Filter.")

```

> Detail

https://www.fmz.com/strategy/477605

> Last Modified

2025-01-06 16:38:12
