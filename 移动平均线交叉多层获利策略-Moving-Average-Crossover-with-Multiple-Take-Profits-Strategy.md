
> Name

移动平均线交叉多层获利策略-Moving-Average-Crossover-with-Multiple-Take-Profits-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c8d8010effd9934ac8.png)


#### Overview
This strategy utilizes the crossover of two moving averages to determine market trends. When the short-term moving average crosses above the long-term moving average, it opens a long position, and vice versa for short positions. At the same time, the strategy employs multiple take profit levels, partially closing positions when prices reach preset profit levels, thereby maximizing returns and controlling risk.

#### Strategy Principle
The core of this strategy is to use moving averages of different periods to capture market trends. When the short-term moving average crosses above the long-term moving average, it suggests that the market may be entering an uptrend, and a long position is opened. Conversely, when the short-term moving average crosses below the long-term moving average, it suggests a potential downtrend, and a short position is opened. Meanwhile, the strategy sets multiple profit levels, and when prices reach these levels, it closes positions in batches according to preset position ratios. This allows for greater profits when trends persist while also managing risk.

#### Strategy Advantages
1. Simple and effective: This strategy is based on the classic moving average crossover principle, which is simple and easy to understand, and has proven effective in practice.
2. Multiple take profits: By setting multiple profit levels and partially closing positions when prices reach these levels, it can maximize returns while also controlling risk.
3. Flexible parameters: The parameter settings of this strategy are very flexible. Users can adjust the moving average periods and profit levels according to their needs and market characteristics to achieve optimal results.

#### Strategy Risks
1. Market volatility risk: When the market experiences intense fluctuations, frequent crossover signals may lead to frequent trading, increasing transaction costs and drawdown risk.
2. Parameter setting risk: Inappropriate parameter settings may lead to poor strategy performance, such as improper selection of moving average periods or unreasonable profit level settings.
3. Trend recognition risk: This strategy mainly relies on trends. In choppy markets or when trends are unclear, there may be more false signals, leading to losses.

#### Strategy Optimization Directions
1. Combine with other indicators: Consider combining with other technical indicators, such as RSI, MACD, etc., to improve the accuracy and reliability of trend recognition.
2. Optimize parameters: Through backtesting and optimization, find the best moving average periods and profit level parameters to adapt to different market conditions.
3. Add stop-loss: Consider adding stop-loss mechanisms to further control risk, such as setting dynamic stop-loss based on ATR.
4. Improve entry and exit: Explore more entry and exit conditions, such as considering trading volume, support and resistance levels, etc., to enhance the robustness of the strategy.

#### Conclusion
The Moving Average Crossover with Multiple Take Profits Strategy is a simple and effective trend-following strategy that can capture more profits in trends while managing risk through multi-level profit taking. However, this strategy also has some limitations and risks, and needs to be optimized and improved based on specific market conditions and user needs. Overall, this strategy can serve as an effective trading tool, but cannot be relied upon completely and needs to be combined with other analysis methods and risk management measures for optimal results.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|18|Short MA Period|
|v_input_2|32|Long MA Period|
|v_input_3|true|Enable Take Profit 1|
|v_input_4|15|Take Profit 1 (%)|
|v_input_5|25|Take Profit 1 Qty (%)|
|v_input_6|true|Enable Take Profit 2|
|v_input_7|30|Take Profit 2 (%)|
|v_input_8|25|Take Profit 2 Qty (%)|
|v_input_9|true|Enable Take Profit 3|
|v_input_10|45|Take Profit 3 (%)|
|v_input_11|25|Take Profit 3 Qty (%)|
|v_input_12|true|Enable Take Profit 4|
|v_input_13|60|Take Profit 4 (%)|
|v_input_14|25|Take Profit 4 Qty (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-04-20 00:00:00
end: 2024-04-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ValdesTradingBots

//Follow Us for More Insights and Updates!

//Join our community and be the first to know about our new releases and trading tips

//Facebook Group: Join our vibrant community at https://www.facebook.com/groups/707469081464839/
//Twitter: Follow us for quick updates and insights at https://twitter.com/ValdesBots

//We're excited to have you with us!

//@version=5
strategy("Valdes Trading Bots MA Cross with Multiple Take Profits", overlay=true)

shortPeriod = input(18, title="Short MA Period")
longPeriod = input(32, title="Long MA Period")

// Take Profit Settings
tp1Enabled = input(true, title="Enable Take Profit 1")
tp1Perc = input(15, title="Take Profit 1 (%)") / 100
tp1QtyPerc = input(25, title="Take Profit 1 Qty (%)") / 100

tp2Enabled = input(true, title="Enable Take Profit 2")
tp2Perc = input(30, title="Take Profit 2 (%)") / 100
tp2QtyPerc = input(25, title="Take Profit 2 Qty (%)") / 100

tp3Enabled = input(true, title="Enable Take Profit 3")
tp3Perc = input(45, title="Take Profit 3 (%)") / 100
tp3QtyPerc = input(25, title="Take Profit 3 Qty (%)") / 100

tp4Enabled = input(true, title="Enable Take Profit 4")
tp4Perc = input(60, title="Take Profit 4 (%)") / 100
tp4QtyPerc = input(25, title="Take Profit 4 Qty (%)") / 100

shortMA = ta.sma(close, shortPeriod)
longMA = ta.sma(close, longPeriod)

// Determine the trend
uptrend = shortMA > longMA
downtrend = shortMA < longMA

// Assign candle colors based on the trend
candleColor = uptrend ? color.rgb(9, 112, 0) : downtrend ? color.rgb(255, 0, 0) : color.new(color.blue, 0)

plot(shortMA, title="Short MA", color=color.rgb(9, 112, 0))
plot(longMA, title="Long MA", color=color.rgb(255, 0, 0))

// Create a cross signal
longCross = ta.crossover(shortMA, longMA)
shortCross = ta.crossunder(shortMA, longMA)

// Strategy entry
if (longCross)
    strategy.entry("Long", strategy.long)
if (shortCross)
    strategy.entry("Short", strategy.short)

// Strategy take profit
if (tp1Enabled and strategy.position_size > 0)
    strategy.exit("TP1 Long", "Long", qty_percent=tp1QtyPerc, limit=strategy.position_avg_price * (1 + tp1Perc))
if (tp1Enabled and strategy.position_size < 0)
    strategy.exit("TP1 Short", "Short", qty_percent=tp1QtyPerc, limit=strategy.position_avg_price * (1 - tp1Perc))

if (tp2Enabled and strategy.position_size > 0)
    strategy.exit("TP2 Long", "Long", qty_percent=tp2QtyPerc, limit=strategy.position_avg_price * (1 + tp2Perc))
if (tp2Enabled and strategy.position_size < 0)
    strategy.exit("TP2 Short", "Short", qty_percent=tp2QtyPerc, limit=strategy.position_avg_price * (1 - tp2Perc))

if (tp3Enabled and strategy.position_size > 0)
    strategy.exit("TP3 Long", "Long", qty_percent=tp3QtyPerc, limit=strategy.position_avg_price * (1 + tp3Perc))
if (tp3Enabled and strategy.position_size < 0)
    strategy.exit("TP3 Short", "Short", qty_percent=tp3QtyPerc, limit=strategy.position_avg_price * (1 - tp3Perc))

if (tp4Enabled and strategy.position_size > 0)
    strategy.exit("TP4 Long", "Long", qty_percent=tp4QtyPerc, limit=strategy.position_avg_price * (1 + tp4Perc))
if (tp4Enabled and strategy.position_size < 0)
    strategy.exit("TP4 Short", "Short", qty_percent=tp4QtyPerc, limit=strategy.position_avg_price * (1 - tp4Perc))

// Plotting the signals on the chart
plotshape(series=longCross, title="Long Cross", location=location.belowbar, color=color.rgb(9, 112, 0), style=shape.triangleup, size=size.small)
plotshape(series=shortCross, title="Short Cross", location=location.abovebar, color=color.rgb(255, 0, 0), style=shape.triangledown, size=size.small)

// Apply candle color
barcolor(candleColor)

```

> Detail

https://www.fmz.com/strategy/449516

> Last Modified

2024-04-26 15:16:12
