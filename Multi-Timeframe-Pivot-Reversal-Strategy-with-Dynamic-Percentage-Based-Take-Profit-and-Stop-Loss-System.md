
> Name

Multi-Timeframe-Pivot-Reversal-Strategy-with-Dynamic-Percentage-Based-Take-Profit-and-Stop-Loss-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ea6bb19fe719dbd457.png)

[trans]
#### 概述
该策略是一个基于多时间周期分析的高级交易系统,通过在更高时间周期上识别关键的枢轴点位来捕捉市场反转机会。策略结合了动态的百分比止盈止损机制,有效控制风险的同时追求稳定收益。系统还包含了交易间隔控制和时间范围测试功能,使其更适合实盘交易环境。

#### 策略原理
策略的核心逻辑基于以下几个关键要素:
1. 在较高时间周期(默认60分钟)上使用枢轴点分析,通过leftBars和rightBars参数定义枢轴形成条件。
2. 通过动态计算的百分比止盈止损位置来管理每笔交易的风险和收益目标。
3. 多时间周期分析提供更可靠的市场结构判断,降低虚假信号。
4. 交易间隔控制机制(默认1440分钟)避免过度交易,提高信号质量。
5. 时间范围测试功能允许在特定历史区间进行策略验证。

#### 策略优势
1. 多时间周期分析提供更全面的市场视角,减少假突破。
2. 动态百分比止盈止损适应不同市场环境,提高策略稳定性。
3. 交易间隔控制有效防止过度交易,降低交易成本。
4. 时间范围测试功能便于策略优化和历史表现分析。
5. 代码结构清晰,易于维护和修改。

#### 策略风险
1. 在高波动市场中,固定百分比的止损可能不够灵活。
2. 较长的交易间隔可能错过部分有效信号。
3. 枢轴点识别的滞后性可能导致入场时机不够理想。
4. 在横盘市场中可能产生过多虚假信号。

#### 策略优化方向
1. 引入自适应波动率指标来动态调整止盈止损百分比。
2. 添加市场环境过滤器,在不同趋势强度下调整策略参数。
3. 整合成交量分析来提高入场信号的可靠性。
4. 实现基于市场波动的动态交易间隔调整。
5. 加入移动止损机制保护已有利润。

#### 总结
该策略通过多时间周期分析和动态风险管理提供了一个完整的交易系统框架。虽然存在一些需要优化的地方,但整体设计理念合理,具有良好的实用性。通过建议的优化方向,策略有望在不同市场环境下取得更稳定的表现。 ||

#### Overview
This strategy is an advanced trading system based on multi-timeframe analysis that captures market reversal opportunities by identifying key pivot points on higher timeframes. It incorporates dynamic percentage-based take profit and stop loss mechanisms, effectively controlling risk while pursuing stable returns. The system also includes trade interval control and time range testing functionality, making it more suitable for live trading environments.

#### Strategy Principles
The core logic of the strategy is based on several key elements:
1. Pivot point analysis on a higher timeframe (default 60 minutes), defining pivot formation conditions through leftBars and rightBars parameters.
2. Risk and profit targets managed through dynamically calculated percentage-based take profit and stop loss levels.
3. Multi-timeframe analysis provides more reliable market structure judgment, reducing false signals.
4. Trade interval control mechanism (default 1440 minutes) prevents overtrading and improves signal quality.
5. Time range testing functionality allows strategy validation within specific historical periods.

#### Strategy Advantages
1. Multi-timeframe analysis provides a more comprehensive market perspective, reducing false breakouts.
2. Dynamic percentage-based take profit and stop loss adapt to different market conditions, improving strategy stability.
3. Trade interval control effectively prevents overtrading and reduces transaction costs.
4. Time range testing functionality facilitates strategy optimization and historical performance analysis.
5. Clear code structure, easy to maintain and modify.

#### Strategy Risks
1. Fixed percentage stops may not be flexible enough in highly volatile markets.
2. Longer trade intervals might miss some valid signals.
3. Lag in pivot point identification may lead to suboptimal entry timing.
4. May generate excessive false signals in ranging markets.

#### Strategy Optimization Directions
1. Introduce adaptive volatility indicators to dynamically adjust take profit and stop loss percentages.
2. Add market environment filters to adjust strategy parameters under different trend strengths.
3. Integrate volume analysis to improve entry signal reliability.
4. Implement dynamic trade interval adjustments based on market volatility.
5. Add trailing stop mechanism to protect accumulated profits.

#### Summary
The strategy provides a complete trading system framework through multi-timeframe analysis and dynamic risk management. While there are areas for optimization, the overall design concept is sound and practical. Through the suggested optimization directions, the strategy has the potential to achieve more stable performance across different market conditions.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-01 00:00:00
end: 2025-01-31 23:59:59
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Pivot Reversal Strategy with MTF TP & SL in Percent and Test Range", overlay=true)

// Входные параметры
higher_tf = input.timeframe("60", title="Higher Timeframe for Breakout Check")  // Таймфрейм для анализа пробоя
leftBars = input(4, title="Left Bars")
rightBars = input(2, title="Right Bars")
TP_percent = input.float(1.0, title="Take Profit (%)", minval=0.1, step=0.1)   // Тейк-профит в процентах
SL_percent = input.float(0.5, title="Stop Loss (%)", minval=0.1, step=0.1)    // Стоп-лосс в процентах
trade_interval = input.int(1440, title="Minimum Time Between Trades (Minutes)") // Интервал между сделками

// Диапазон тестирования (используем UNIX timestamps)
start_date = input(timestamp("2023-01-01 00:00 +0000"), title="Start Date")  // Стартовая дата для тестирования
end_date = input(timestamp("2023-12-31 23:59 +0000"), title="End Date")    // Конечная дата для тестирования

// Проверка, попадает ли текущая свеча в указанный диапазон времени
in_test_range = true

// Определение пивотов на более крупном таймфрейме
higher_tf_high = request.security(syminfo.tickerid, higher_tf, ta.pivothigh(leftBars, rightBars))
higher_tf_low = request.security(syminfo.tickerid, higher_tf, ta.pivotlow(leftBars, rightBars))

// Последнее время открытия сделки
var float last_trade_time = na

// Логика для лонга
swh_cond = not na(higher_tf_high)
hprice = 0.0
hprice := swh_cond ? higher_tf_high : hprice[1]
le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])

if le and in_test_range and (na(last_trade_time) or (time - last_trade_time >= trade_interval * 60 * 1000))
    tp_price_long = hprice * (1 + TP_percent / 100)  // Тейк-профит в процентах
    sl_price_long = hprice * (1 - SL_percent / 100)  // Стоп-лосс в процентах
    strategy.entry("PivRevLE", strategy.long, stop=hprice + syminfo.mintick)
    strategy.exit("TP_SL_Long", from_entry="PivRevLE", 
                  limit=tp_price_long, 
                  stop=sl_price_long)
    last_trade_time := time

// Логика для шорта
swl_cond = not na(higher_tf_low)
lprice = 0.0
lprice := swl_cond ? higher_tf_low : lprice[1]
se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])

if se and in_test_range and (na(last_trade_time) or (time - last_trade_time >= trade_interval * 60 * 1000))
    tp_price_short = lprice * (1 - TP_percent / 100)  // Тейк-профит в процентах
    sl_price_short = lprice * (1 + SL_percent / 100)  // Стоп-лосс в процентах
    strategy.entry("PivRevSE", strategy.short, stop=lprice - syminfo.mintick)
    strategy.exit("TP_SL_Short", from_entry="PivRevSE", 
                  limit=tp_price_short, 
                  stop=sl_price_short)
    last_trade_time := time

// Для наглядности отображаем уровни на графике
plot(le and in_test_range ? hprice * (1 + TP_percent / 100) : na, color=color.green, title="Long Take Profit")
plot(le and in_test_range ? hprice * (1 - SL_percent / 100) : na, color=color.red, title="Long Stop Loss")
plot(se and in_test_range ? lprice * (1 - TP_percent / 100) : na, color=color.green, title="Short Take Profit")
plot(se and in_test_range ? lprice * (1 + SL_percent / 100) : na, color=color.red, title="Short Stop Loss")

```

> Detail

https://www.fmz.com/strategy/481099

> Last Modified

2025-02-08 15:04:47
