
> Name

Trend-Following-Gap-Breakout-Trading-System-with-SMA-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c86875ce2045f72938.png)

[trans]
#### 概述
这是一个基于价格跳空和移动平均线过滤的趋势跟踪交易系统。该策略通过识别具有统计显著性的价格跳空信号,结合SMA趋势过滤器,在市场形成明确趋势时进行交易。策略的核心理念是捕捉由于供需失衡导致的价格跳空所带来的趋势延续机会。

#### 策略原理
策略的运作基于以下几个关键要素:
1. 跳空识别 - 系统通过计算开盘价与前一收盘价的百分比差值来识别跳空,并设置最小跳空阈值以过滤微小波动。
2. 方向性选择 - 提供多种跳空交易模式(做多上涨跳空、做空下跌跳空等),使用者可根据市场环境灵活选择。
3. SMA趋势过滤 - 通过简单移动平均线判断整体趋势,只在价格与趋势方向一致时开仓。
4. 持仓管理 - 采用预设的持仓周期来管理仓位,有效控制风险。

#### 策略优势
1. 信号明确 - 跳空信号清晰可见,便于判断和执行。
2. 风险可控 - 通过设定最小跳空阈值和持仓时间,有效控制风险。
3. 灵活性强 - 可根据市场情况选择不同的跳空交易方向。
4. 趋势确认 - SMA过滤器提供额外的趋势确认,提高交易成功率。
5. 自动化程度高 - 策略逻辑清晰,易于实现自动化交易。

#### 策略风险
1. 假突破风险 - 跳空后可能出现快速回补,导致假信号。
2. 滑点风险 - 开盘跳空交易可能面临较大滑点。
3. 趋势反转风险 - 固定持仓期限可能错过趋势反转。
4. 市场环境依赖 - 在低波动率市场中,有效信号较少。

#### 策略优化方向
1. 动态持仓期 - 根据市场波动率动态调整持仓时间。
2. 多重确认 - 引入成交量、波动率等指标进行信号确认。
3. 止损优化 - 添加跟踪止损或波动率止损。
4. 信号分级 - 根据跳空幅度设计分级开仓系统。
5. 市场选择 - 建立市场环境识别机制,在适合的市场条件下交易。

#### 总结
该策略通过结合价格跳空和均线趋势过滤,构建了一个逻辑清晰、风险可控的交易系统。通过合理设置参数和持续优化,该策略能够在趋势市场中获得稳定收益。建议交易者在实盘使用前进行充分的历史测试,并根据具体市场特点进行针对性优化。 || 

#### Overview
This is a trend-following trading system based on price gaps and moving average filtering. The strategy captures trending opportunities by identifying statistically significant price gaps combined with SMA trend filters, executing trades when clear market trends emerge. The core concept is to capitalize on trend continuation opportunities created by supply-demand imbalances manifesting as price gaps.

#### Strategy Principles
The strategy operates on several key elements:
1. Gap Identification - The system identifies gaps by calculating the percentage difference between opening price and previous closing price, with a minimum gap threshold to filter out minor fluctuations.
2. Directional Selection - Offers multiple gap trading modes (long up gaps, short down gaps, etc.), allowing users to adapt to market conditions.
3. SMA Trend Filtering - Uses Simple Moving Average to determine overall trend, only entering positions when price aligns with trend direction.
4. Position Management - Employs preset holding periods for position management and risk control.

#### Strategy Advantages
1. Clear Signals - Gap signals are visually distinct and easy to identify and execute.
2. Controlled Risk - Minimum gap thresholds and fixed holding periods effectively manage risk.
3. High Flexibility - Different gap trading directions can be selected based on market conditions.
4. Trend Confirmation - SMA filter provides additional trend confirmation, improving success rate.
5. High Automation - Clear strategy logic facilitates automated trading implementation.

#### Strategy Risks
1. False Breakout Risk - Gaps may quickly fill, leading to false signals.
2. Slippage Risk - Opening gap trades may face significant slippage.
3. Trend Reversal Risk - Fixed holding periods might miss trend reversals.
4. Market Environment Dependency - Fewer effective signals in low-volatility markets.

#### Strategy Optimization Directions
1. Dynamic Holding Period - Adjust holding time based on market volatility.
2. Multiple Confirmations - Incorporate volume and volatility indicators for signal confirmation.
3. Stop Loss Optimization - Add trailing stops or volatility-based stops.
4. Signal Grading - Design tiered position sizing based on gap magnitude.
5. Market Selection - Develop market condition identification mechanisms for selective trading.

#### Summary
This strategy combines price gaps and moving average trend filtering to create a trading system with clear logic and controlled risk. Through appropriate parameter settings and continuous optimization, the strategy can achieve stable returns in trending markets. Traders are advised to conduct thorough historical testing before live implementation and optimize based on specific market characteristics.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-27 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Simplified Gap Strategy with SMA Filter", overlay=true)

// Input fields for user control
long_gap_threshold = input.float(0.1, title="Gap Threshold (%)", minval=0.01, step=0.01)  // Minimum percentage for gaps
hold_duration = input.int(10, title="Hold Duration (bars)", minval=1)  // Duration to hold the position
gap_trade_option = input.string("Long Up Gap", title="Select Trade Option", options=["Long Up Gap", "Short Down Gap", "Short Up Gap", "Long Down Gap"])  // Combined option
use_sma_filter = input.bool(false, title="Use SMA Filter")  // Checkbox to activate SMA filter
sma_length = input.int(200, title="SMA Length", minval=1)  // Length of the SMA

// RGB color definitions for background
color_up_gap = color.new(color.green, 50)    // Green background for up gaps
color_down_gap = color.new(color.red, 50)    // Red background for down gaps

// Gap size calculation in percentage terms
gap_size = (open - close[1]) / close[1] * 100  // Gap size in percentage

// Calculate gaps based on threshold input
up_gap = open > close[1] and gap_size >= long_gap_threshold  // Long gap condition
down_gap = open < close[1] and math.abs(gap_size) >= long_gap_threshold  // Short gap condition

// Calculate the SMA
sma_value = ta.sma(close, sma_length)

// Define the trading logic based on selected option and SMA filter
if (gap_trade_option == "Long Up Gap" and up_gap and (not use_sma_filter or close > sma_value))
    strategy.entry("Long", strategy.long)
if (gap_trade_option == "Short Down Gap" and down_gap and (not use_sma_filter or close < sma_value))
    strategy.entry("Short", strategy.short)
if (gap_trade_option == "Short Up Gap" and up_gap and (not use_sma_filter or close < sma_value))
    strategy.entry("Short", strategy.short)
if (gap_trade_option == "Long Down Gap" and down_gap and (not use_sma_filter or close > sma_value))
    strategy.entry("Long", strategy.long)

// Exit position after the hold duration
if (strategy.opentrades > 0)
    if (bar_index - strategy.opentrades.entry_bar_index(0) >= hold_duration)
        strategy.close("Long")
        strategy.close("Short")

// Background coloring to highlight gaps on the chart
bgcolor((gap_trade_option == "Long Up Gap" and up_gap) ? color_up_gap : na, title="Up Gap Background")
bgcolor((gap_trade_option == "Short Down Gap" and down_gap) ? color_down_gap : na, title="Down Gap Background")
bgcolor((gap_trade_option == "Short Up Gap" and up_gap) ? color_down_gap : na, title="Short Up Gap Background")
bgcolor((gap_trade_option == "Long Down Gap" and down_gap) ? color_up_gap : na, title="Long Down Gap Background")

// Plot the SMA for visualization
plot(use_sma_filter ? sma_value : na, color=color.white, title="SMA", linewidth=1)

```

> Detail

https://www.fmz.com/strategy/473356

> Last Modified

2024-11-29 15:07:43
