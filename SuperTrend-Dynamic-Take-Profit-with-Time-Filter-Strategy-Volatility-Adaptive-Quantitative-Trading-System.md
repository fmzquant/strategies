
> Name

SuperTrend-Dynamic-Take-Profit-with-Time-Filter-Strategy-Volatility-Adaptive-Quantitative-Trading-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d7cb05ccd8d0f2958d10.png)
![IMG](https://www.fmz.com/upload/asset/2d90365a04c8c62cbe4e8.png)


[trans]

#### 概述
SuperTrend动态止盈与时间过滤器策略是一个基于波动率自适应的量化交易系统，核心依托SuperTrend指标作为动态跟踪止损工具。该策略通过识别价格突破SuperTrend指标线的时刻来捕捉市场趋势，并结合了多重过滤机制，包括莫斯科时间(MSK)过滤器、价格水平过滤以及固定百分比止盈功能。系统设计为多功能模式，既可以单独交易多头或空头，也可以实现双向交易。策略在图表上通过颜色变化直观显示交易方向：绿色区域表示上升趋势（多头），红色区域表示下降趋势（空头），极大地提升了策略可视化体验和操作决策便捷性。

#### 策略原理
该策略的核心运作基于以下几个关键机制：

1. **SuperTrend指标计算**：策略使用ATR指标（默认周期23）和乘数因子（默认1.8）来计算SuperTrend线，这条线根据市场波动性自动调整其位置，形成动态支撑和阻力。

2. **交易信号生成**：
   - 多头入场信号：当收盘价突破SuperTrend线向上（dir值从正变为负）且满足时间和价格过滤条件时触发。
   - 空头入场信号：当收盘价跌破SuperTrend线向下（dir值从负变为正）且满足过滤条件时触发。

3. **交易模式选择**：策略提供三种交易模式：
   - 仅多头（Long Only）：仅执行多头交易，遇空头信号则平仓。
   - 仅空头（Short Only）：仅执行空头交易，遇多头信号则平仓。
   - 双向（Both）：允许执行多空双向交易。

4. **多重过滤系统**：
   - 莫斯科时间过滤器（MSK，UTC+3）：允许用户设定特定交易时段，只在该时段内执行交易。
   - 价格水平过滤：可设置价格阈值，只在价格高于阈值时执行多头，低于阈值时执行空头。

5. **动态止盈机制**：策略实现了基于入场价格的固定百分比止盈（默认1.5%），一旦价格达到止盈水平，策略自动平仓，锁定利润。止盈水平可在图表上直观显示，用户可根据需要开启或关闭此可视化功能。

#### 策略优势
深入分析此代码，我总结出以下显著优势：

1. **波动率自适应性**：SuperTrend指标基于ATR计算，能够根据市场波动状况自动调整跟踪距离，在高波动市场增加保护距离，在低波动市场更紧密跟踪价格，提高了策略对不同市场环境的适应能力。

2. **多重风险控制**：策略集成了三层风险管理：时间过滤、价格过滤和止盈设置，这种多维风险控制机制显著提高了交易安全性。

3. **灵活交易方向**：可选择仅多头、仅空头或双向交易，使策略能够适应不同市场偏好和交易限制。

4. **时间智能优化**：独特的莫斯科时间过滤器允许在特定时间段交易，帮助避开市场低效时段，针对性地捕捉高效交易窗口，特别适合需要考虑国际交易时段的交易者。

5. **可视化优势**：通过背景色变化、SuperTrend线颜色和止盈水平标记，提供了直观的视觉交易参考，减少了分析复杂性。

6. **佣金优化设计**：策略内置佣金考虑（0.06%），使回测结果更接近真实交易环境。

7. **收盘价执行机制**：策略采用收盘价执行订单（process_orders_on_close=true），减少了滑点影响，提高了回测的可靠性。

#### 策略风险
尽管该策略设计精良，但仍存在以下潜在风险：

1. **趋势反转延迟**：SuperTrend指标本质上是滞后指标，在市场急剧反转时可能产生延迟信号，导致入场或出场不及时，增加回撤风险。解决方法是调整ATR周期和乘数因子以平衡灵敏度与稳定性。

2. **固定止盈局限性**：采用固定百分比止盈可能过早锁定利润，在强劲趋势中错失更多收益。建议根据市场波动性动态调整止盈百分比或结合其他技术指标优化止盈策略。

3. **参数敏感性**：策略表现高度依赖参数设置（ATR周期、乘数因子、止盈百分比等），不当的参数可能导致过度交易或信号错失。应通过历史数据回测寻找最优参数组合。

4. **过滤器过度限制**：过于严格的时间和价格过滤可能导致错过有效交易机会。建议根据实际交易品种和市场特性调整过滤条件。

5. **市场条件依赖**：该策略在趋势明显的市场中表现优异，但在震荡市中可能频繁产生虚假信号。可考虑增加市场状态识别机制，只在趋势市场启用策略。

6. **缺乏止损机制**：虽然SuperTrend可作为动态止损参考，但代码中未明确设置止损条件，在极端市场条件下可能面临较大损失。建议增加硬性止损机制。

#### 策略优化方向
基于代码分析，我建议以下优化方向：

1. **动态参数自适应**：可以编写函数根据市场状态（波动性、成交量等）自动调整SuperTrend的ATR周期和乘数因子，提高策略适应性。这样做的好处是能够在不同市场阶段自动找到最优参数组合。

2. **多时间周期确认**：引入多时间周期确认机制，只有当较大时间周期和当前时间周期SuperTrend方向一致时才执行交易，减少虚假信号。这能显著提高信号质量。

3. **智能止盈系统**：将固定百分比止盈改为基于ATR的动态止盈或分段止盈（部分头寸在较低目标获利了结，部分头寸寻求更大收益），优化资金管理策略。

4. **市场状态识别**：增加趋势强度指标（如ADX）或波动率指标，只在市场满足特定条件时执行交易，避免在低效市场环境中交易。

5. **风险管理增强**：添加每笔交易风险限制和账户风险管理逻辑，确保单次和总体风险在可控范围内。

6. **多指标融合**：结合其他技术指标（如MACD、RSI或布林带）作为辅助确认，只有多指标共振时才执行交易，提高信号可靠性。

7. **交易量适应逻辑**：根据市场流动性和波动性动态调整交易规模，在波动较大时减少仓位，在稳定趋势中增加仓位。

8. **回测周期扩展**：在不同市场周期和条件下进行广泛回测，确保策略在各种市场环境中都具有稳定性。

#### 总结
SuperTrend动态止盈与时间过滤器策略是一个结合了技术分析与风险管理的综合量化交易系统。它通过SuperTrend指标捕捉趋势，并利用多重过滤机制提高信号质量。策略的主要优势在于其波动率自适应性和多层风险控制，而潜在风险主要来自指标滞后性和参数敏感性。

通过实施建议的优化措施，如动态参数调整、多时间周期确认和智能止盈系统，该策略可以进一步提升其适应性和盈利能力。最重要的是，交易者应理解这一策略的设计原理和局限性，结合自身风险偏好和市场认知，对参数进行个性化调整，以达到最佳交易效果。

总体而言，这是一个结构清晰、逻辑严密的交易策略，具有较高的实用价值和定制潜力，适合有一定交易经验的量化投资者使用。 || 

#### Overview
The SuperTrend Dynamic Take-Profit with Time Filter Strategy is a volatility-adaptive quantitative trading system that relies on the SuperTrend indicator as a dynamic trailing stop tool. This strategy captures market trends by identifying moments when price breaks through the SuperTrend indicator line, combined with multiple filtering mechanisms including Moscow time (MSK) filter, price level filtering, and fixed percentage take-profit functionality. The system is designed as a multi-functional mode that can trade long positions only, short positions only, or enable bidirectional trading. The strategy visually displays trading direction on the chart through color changes: green areas indicate uptrends (long), while red areas indicate downtrends (short), greatly enhancing strategy visualization and operational decision-making convenience.

#### Strategy Principles
The core operation of this strategy is based on the following key mechanisms:

1. **SuperTrend Indicator Calculation**: The strategy uses the ATR indicator (default period 23) and a multiplier factor (default 1.8) to calculate the SuperTrend line, which automatically adjusts its position according to market volatility, forming dynamic support and resistance.

2. **Trade Signal Generation**:
   - Long entry signal: Triggered when the closing price breaks above the SuperTrend line (dir value changes from positive to negative) and meets time and price filtering conditions.
   - Short entry signal: Triggered when the closing price falls below the SuperTrend line (dir value changes from negative to positive) and meets filtering conditions.

3. **Trade Mode Selection**: The strategy offers three trading modes:
   - Long Only: Only executes long trades, closes positions on short signals.
   - Short Only: Only executes short trades, closes positions on long signals.
   - Both: Allows bidirectional trading.

4. **Multiple Filtering Systems**:
   - Moscow time filter (MSK, UTC+3): Allows users to set specific trading sessions, executing trades only within those periods.
   - Price level filtering: Sets a price threshold, executing long positions only when price is above the threshold and short positions when below.

5. **Dynamic Take-Profit Mechanism**: The strategy implements a fixed percentage take-profit (default 1.5%) based on entry price. Once price reaches the take-profit level, the strategy automatically closes positions to lock in profits. Take-profit levels can be visually displayed on the chart, and users can enable or disable this visualization as needed.

#### Strategy Advantages
After deep analysis of this code, I've identified the following significant advantages:

1. **Volatility Adaptability**: The SuperTrend indicator is based on ATR calculation, allowing it to automatically adjust tracking distance according to market volatility conditions. It increases protection distance in high-volatility markets and tracks price more closely in low-volatility markets, improving the strategy's adaptability to different market environments.

2. **Multiple Risk Controls**: The strategy integrates three layers of risk management: time filtering, price filtering, and take-profit settings. This multi-dimensional risk control mechanism significantly enhances trading safety.

3. **Flexible Trading Direction**: Options for long-only, short-only, or bidirectional trading allow the strategy to adapt to different market preferences and trading restrictions.

4. **Time-Intelligent Optimization**: The unique Moscow time filter allows trading during specific time periods, helping to avoid inefficient market sessions and specifically capturing efficient trading windows, particularly suitable for traders who need to consider international trading sessions.

5. **Visualization Advantages**: Through background color changes, SuperTrend line colors, and take-profit level markers, the strategy provides intuitive visual trading references, reducing analytical complexity.

6. **Commission-Optimized Design**: The strategy incorporates commission considerations (0.06%), making backtesting results closer to real trading environments.

7. **Close Price Execution Mechanism**: The strategy uses close price order execution (process_orders_on_close=true), reducing slippage impact and improving backtesting reliability.

#### Strategy Risks
Despite its excellent design, the strategy still has the following potential risks:

1. **Trend Reversal Delay**: The SuperTrend indicator is inherently a lagging indicator and may produce delayed signals during sharp market reversals, leading to untimely entries or exits and increased drawdown risk. The solution is to adjust ATR periods and multiplier factors to balance sensitivity and stability.

2. **Fixed Take-Profit Limitations**: Using a fixed percentage take-profit may lock in profits too early, missing out on additional gains during strong trends. It's recommended to dynamically adjust take-profit percentages based on market volatility or optimize take-profit strategies by combining other technical indicators.

3. **Parameter Sensitivity**: Strategy performance is highly dependent on parameter settings (ATR period, multiplier factor, take-profit percentage, etc.). Inappropriate parameters may lead to overtrading or missed signals. Optimal parameter combinations should be sought through historical data backtesting.

4. **Over-Restrictive Filters**: Overly strict time and price filtering may cause missed valid trading opportunities. Filter conditions should be adjusted according to the actual trading instrument and market characteristics.

5. **Market Condition Dependency**: This strategy performs excellently in markets with clear trends but may frequently produce false signals in oscillating markets. Consider adding market state recognition mechanisms to enable the strategy only in trending markets.

6. **Lack of Stop-Loss Mechanism**: Although SuperTrend can serve as a dynamic stop-loss reference, the code does not explicitly set stop-loss conditions, potentially facing significant losses in extreme market conditions. Adding a hard stop-loss mechanism is recommended.

#### Strategy Optimization Directions
Based on code analysis, I recommend the following optimization directions:

1. **Dynamic Parameter Adaptation**: Functions can be written to automatically adjust SuperTrend's ATR period and multiplier factor based on market states (such as volatility, volume, etc.), improving the strategy's adaptability. The advantage of this approach is that parameters can be automatically optimized as market conditions change, without manual intervention.

2. **Multi-Timeframe Confirmation**: By introducing SuperTrend direction confirmation from higher timeframes, low-quality signals can be effectively filtered. For example, executing trades on the 1-hour chart only when the SuperTrend direction on both daily and 4-hour charts align can significantly reduce losses from false breakouts.

3. **Intelligent Take-Profit System**: The current fixed percentage take-profit can be improved to a multi-tiered take-profit strategy, such as dividing positions into two parts with the first part taking profit at a smaller target (e.g., 0.8%) and the second part at a higher level (e.g., 2.5%), or dynamically setting take-profit levels based on ATR values to better adapt to current market volatility.

4. **Market State Recognition**: Integrate ADX (Average Directional Index) to measure trend strength, activating the strategy only when ADX is above a specific threshold (e.g., 25) to avoid frequent trading in oscillating markets. A volatility filter could also be added to pause trading during periods of abnormally high volatility.

5. **Enhanced Risk Management**: Add maximum loss limits for each trade and implement money management rules (such as the Kelly criterion or fixed proportion risk) to ensure that single trade risk does not exceed a specific percentage (e.g., 2%) of the total account.

6. **Multi-Indicator Fusion**: Combine SuperTrend with other technical indicators (such as moving average crossovers, RSI overbought/oversold zones, or MACD histogram) to establish multiple confirmation systems and improve signal quality. For example, execute long trades only when RSI shows oversold conditions and SuperTrend gives a buy signal.

7. **Trading Volume Adaptation Logic**: Dynamically adjust trading size based on market volatility and liquidity, for example, reducing position size when ATR values are large and increasing positions when ATR values are small and trends are clear, optimizing capital utilization efficiency.

8. **Extended Backtesting Period**: Conduct comprehensive backtesting across different market environments (bull markets, bear markets, ranging markets) and different time periods to ensure long-term stability and adaptability of the strategy. It's particularly important to test strategy performance under extreme market conditions.

#### Summary
The SuperTrend Dynamic Take-Profit with Time Filter Strategy is a comprehensive trading system that integrates trend following, time filtering, and take-profit management. Its core advantage lies in the volatility-adaptive SuperTrend indicator calculation and multi-level trading filtering mechanisms, enabling it to maintain relatively stable performance in changing market environments.

The strategy's main innovation point is combining the Moscow time filter with traditional SuperTrend trading logic, making it particularly suitable for traders considering the impact of international trading sessions. Meanwhile, the built-in fixed percentage take-profit function provides a simple yet effective profit protection mechanism, preventing profit giveback due to market reversals.

However, the strategy also faces challenges such as indicator lag and parameter sensitivity. By implementing the suggested optimization measures, such as dynamic parameter adjustment, multiple indicator confirmation, and enhanced risk management, the strategy's robustness and profitability can be significantly improved. Particularly through market state recognition mechanisms, the strategy can become more "intelligent," executing trades only under suitable market conditions.

For practical application, traders need to fine-tune strategy parameters according to the characteristics of specific trading instruments and personal risk preferences. Through continuous monitoring and regular optimization, this strategy can become an effective component of medium to long-term quantitative trading systems, contributing stable returns to investment portfolios.

In conclusion, this is a well-designed, clearly structured quantitative trading strategy with high practical value and expansion potential. With reasonable parameter settings and necessary risk controls, it can function effectively in various market environments, providing traders with reliable trading signals and profit protection mechanisms.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-26 00:00:00
end: 2024-07-11 00:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("Supertrend Fixed TP Unified with Time Filter (MSK)", overlay=true,
     default_qty_value=0.01,
     commission_type=strategy.commission.percent,
     commission_value=0.06,
     pyramiding=0,
     process_orders_on_close=true)

// Настройки индикатора
atrPeriod = input(23, "ATR Length")
factor = input.float(1.8, "Factor", step=0.1, minval=0.1)
tradeMode = input.string("Both", "Trade Mode", options=["Long Only", "Short Only", "Both"])

// Общий параметр тейк-профита
takeProfitPercent = input.float(1.5, "Take Profit (%)", minval=0.01)
showTP = input.bool(true, "▲▼ Показывать ТП") // Добавлен переключатель

// Фильтр цены
price_param = input.float(10000.0, "Цена фильтра", step=1.0)
use_price_filter = input.bool(false, "Использовать фильтр цены")

// Фильтр по времени (Московское время)
useTimeFilter = input.bool(true, "▲▼ Использовать фильтр по времени") // Переключатель фильтра времени
timeFrom = input.int(0, "Время С (часы MSK)", minval=0, maxval=23, step=1)
timeTo = input.int(23, "Время ДО (часы MSK)", minval=0, maxval=23, step=1)

// Функция проверки времени (с учетом Московского времени UTC+3)
isTimeInRange() =>
    if not useTimeFilter
        true // Фильтр отключен
    else
        // Переводим время сервера (UTC) в Московское время (UTC+3)
        mskHour = (hour(time) + 3) % 24 // Добавляем 3 часа для MSK
        if timeFrom <= timeTo
            mskHour >= timeFrom and mskHour < timeTo // До timeTo (не включая timeTo)
        else
            mskHour >= timeFrom or mskHour < timeTo // До timeTo (не включая timeTo)

// Расчет Supertrend
[supertrend, dir] = ta.supertrend(factor, atrPeriod)

// Визуализация Supertrend
plot(supertrend, "Supertrend", 
     color = dir < 0 ? color.green : color.red,
     linewidth = 2,
     style = plot.style_linebr)

bgcolor(dir < 0 ? color.new(color.green, 90) : color.new(color.red, 90))

// Сигналы входа с фильтром по времени
longEntry = (dir < 0 and dir[1] > 0) and (use_price_filter ? close > price_param : true) and isTimeInRange()
shortEntry = (dir > 0 and dir[1] < 0) and (use_price_filter ? close < price_param : true) and isTimeInRange()

// Логика стратегии
if tradeMode == "Both"
    if longEntry
        strategy.close("Short", comment="Close Short")
        strategy.entry("Long", strategy.long)
    if shortEntry
        strategy.close("Long", comment="Close Long")
        strategy.entry("Short", strategy.short)
else if tradeMode == "Long Only"
    if longEntry
        strategy.entry("Long", strategy.long)
    if shortEntry
        strategy.close("Long", comment="Close Long")
else if tradeMode == "Short Only"
    if shortEntry
        strategy.entry("Short", strategy.short)
    if longEntry
        strategy.close("Short", comment="Close Short")

// Управление тейк-профитом
var color tpColor = na
var float tpLevel = na
var label tpLabel = na

// Сброс при закрытии позиции
if strategy.position_size == 0 and strategy.position_size[1] != 0
    tpLevel := na
    tpColor := na
    label.delete(tpLabel)
    tpLabel := na

// Обновление ТП при открытии позиции
if strategy.position_size > 0
    entryPrice = strategy.opentrades.entry_price(0)
    tpLevel := entryPrice * (1 + takeProfitPercent/100)
    tpColor := color.green
    // Закрытие лонга по TP на закрытии бара
    if close >= tpLevel
        strategy.close("Long", comment="TP Long")
    // Обновление метки
    if showTP
        label.delete(tpLabel)
        tpLabel := label.new(
             bar_index, tpLevel, 
             text = str.tostring(tpLevel, "#.##"), 
             color = color.green, 
             textcolor = color.white,
             style = label.style_label_down,
             yloc = yloc.price)
    
if strategy.position_size < 0
    entryPrice = strategy.opentrades.entry_price(0)
    tpLevel := entryPrice * (1 - takeProfitPercent/100)
    tpColor := color.red
    // Закрытие шорта по TP на закрытии бара
    if close <= tpLevel
        strategy.close("Short", comment="TP Short")
    // Обновление метки
    if showTP
        label.delete(tpLabel)
        tpLabel := label.new(
             bar_index, tpLevel, 
             text = str.tostring(tpLevel, "#.##"), 
             color = color.red, 
             textcolor = color.white,
             style = label.style_label_up,
             yloc = yloc.price)

// Визуализация ТП
plot(showTP ? tpLevel : na, "Take Profit", 
     color = tpColor,
     linewidth = 1,
     style = plot.style_circles)

// Обновление позиции метки
if showTP and not na(tpLevel)
    label.set_xy(tpLabel, bar_index, tpLevel)
```

> Detail

https://www.fmz.com/strategy/488263

> Last Modified

2025-03-26 13:12:56
