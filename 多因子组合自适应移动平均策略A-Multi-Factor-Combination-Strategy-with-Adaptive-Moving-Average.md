
> Name

多因子组合自适应移动平均策略A-Multi-Factor-Combination-Strategy-with-Adaptive-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1acd6ed5fce1bd211ae.png)

[trans]

## 一、策略概述

多因子组合自适应移动平均策略是一种同时结合使用日内线、移动平均线、聚合交叉以及 HA 均线的复合策略。该策略旨在发掘更多的交易机会,在牛市中获得更高的累计收益。

## 二、策略原理

该策略的核心逻辑在于,结合使用多种技术指标对买入卖出信号进行评分,根据不同因子匹配的结果,给出不同强度的交易信号。

具体来说,策略所使用的四个主要技术指标包括:

1. 日内线。策略利用日内线的颜色判断价格趋势,连续两根绿色实体 HA 均线为买入信号,连续两根红色空心 HA 均线为空头信号。

2. 移动平均线。策略同时使用快、慢、过滤三条不同参数设置的移动平均线。当快速线上穿慢速线,慢速线上穿过滤线时,为买入信号;反之,则为卖出信号。移动平均线能有效判断中长期趋势。

3. Stochastic 指标。该指标判断多空交叉时机。当 %K 线从下方向上突破 %D 线时,为买入信号;从上方向下突破时,为卖出信号。

4. 匹配评分机制。根据上述多个因子的匹配情况,策略采用评分机制。匹配因子越多,对应信号的强度也就越大。

通过多因子综合判断,策略可以在中短期内捕捉到更多细微的交易机会,从而在牛市中获得超额收益。

## 三、策略优势

多因子组合自适应移动平均策略最大的优势在于增强了信号的可靠性。单一技术指标容易出现错误信号,而本策略结合使用了多种指标进行配对,可以有效减少假信号的干扰。

另外,相比于仅仅跟随单一指标,多因子组合更能提高交易胜率。在牛市中,策略可以获得更高的累计收益。

## 四、策略风险

该策略的主要风险在于,多因子组合本身会增加策略的复杂度。需要同时兼顾多个指标的参数设置、频繁的调整等。

另外,在熊市中,策略持仓时间可能会过长。即使设置止损,也难以避免较大的损失。

此外,Stochastic 指标和 HA 均线等技术指标易受突发事件影响,容易产生错误信号,导致不必要的亏损。

## 五、策略优化方向  

该策略可从以下几个方面进行优化:

1. 优化每个指标参数的设置,找到最优参数组合。

2. 增加模型训练和参数自适应模块,实时优化参数。

3. 增加止损策略,降低策略最大回撤。

4. 增加仓位控制模块,根据市场情况动态调整仓位。

5. 结合机器学习算法,建立多因子评分的神经网络模型。

## 六、总结

多因子组合自适应移动平均策略综合运用了多种技术指标的优势。该策略可以有效增加信号质量,在牛市中获得超额收益。但同时也增加了策略复杂度,需要进一步测试和优化。

|| 

## I. Strategy Overview  

The multi-factor combination strategy with adaptive moving average is a compound strategy that combines the use of HA lines, moving averages, stochastic crossovers and intraday bars. It aims to uncover more trading opportunities and achieve higher cumulative returns during bull markets.

## II. Strategy Logic  

The core logic of this strategy is to combine multiple technical indicators to score buy and sell signals, and generate trading signals with varying strengths based on the matching results.  

Specifically, the four main technical indicators used in the strategy include:

1. Intraday bars. The strategy uses the color of the intraday bars to determine price trends. Two consecutive green real-body HA bars give buy signals, while two consecutive red hollow HA bars give sell signals.  

2. Moving averages. The strategy uses fast, slow and filter moving averages with different parameter settings simultaneously. When the fast line crosses above the slow line, and the slow line crosses above the filter line, it gives buy signals. And vice versa. The moving averages are good at determining medium-to-long term trends.

3. Stochastic Indicator. This indicator determines the timing of bullish and bearish crossovers. When the %K line breaks through the %D line from below, it gives buy signals. And when %K breaks %D from above, it gives sell signals.  

4. Matching score mechanism. According to the matching of the above factors, the strategy adopts a scoring mechanism. The more matching factors, the stronger the corresponding trading signal.

Through the comprehensive judgment of multiple factors, the strategy can capture more subtle trading opportunities in the medium and short term, thereby achieving excess returns during bull markets.

## III. Advantages  

The biggest advantage of this multi-factor strategy is that it enhances the reliability of trading signals. A single technical indicator is prone to generating false signals. By combining multiple indicators, this strategy can effectively reduce interference from false signals.

In addition, compared to just following a single indicator, the multi-factor combination can improve the win rate of trades. It can achieve higher cumulative returns during bull markets.  

## IV. Risks  

The main risk of this strategy is that the multi-factor combination itself increases the complexity of the strategy. It needs to take care of the parameter settings, frequent adjustments of multiple indicators at the same time.

Also, during bear markets, the holding time can be too long. Even with a stop loss in place, significant losses may still occur.

In addition, technical indicators like Stochastic and HA lines can be impacted by black swan events, which tend to generate false signals and cause unnecessary losses.

## V. Enhancement Ideas   

The strategy can be optimized in the following aspects:

1. Optimize the parameter settings of each indicator to find the optimal combination.  

2. Add model training and adaptive parameter modules for real-time parameter optimization.

3. Add stop loss strategies to reduce maximum drawdown.  

4. Add position control modules to dynamically adjust positions based on market conditions.

5. Incorporate machine learning algorithms to build a neural network model for the multi-factor scoring system.

## VI. Conclusion  

The multi-factor combination strategy with adaptive moving average combines the strengths of multiple technical indicators. It can effectively improve signal quality and achieve excess returns during bull markets. But at the same time, it also increases the complexity of the strategy, requiring further testing and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|true|(?Heikin Ashi)Show Heikin Ashi?|
|v_input_3|true|(?Moving Averages)Show Moving Averages?|
|v_input_4|20|Fast MA Length|
|v_input_5|50|Slow MA Length|
|v_input_6|0|Moving Average Type: SMA|EMA|RMA|WMA|VWMA|
|v_input_7|200|Filter MA Length|
|v_input_8|0|Filter MA Type: EMA|SMA|RMA|WMA|VWMA|
|v_input_9|true|(?Stochastic)Show Stochastic Crossovers?|
|v_input_10|10|%K Length|
|v_input_11|3|%K Smoothing|
|v_input_12|3|%D Smoothing|
|v_input_13|true|(?Signal)Show Bullish Signal?|
|v_input_14|false|Show Bearish Signal?|
|v_input_15|2.5|(?Trading)Take Profit Threshold (%)|
|v_input_16|1.4|Profit-to-Loss ratio (risk tolerance)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-08 00:00:00
end: 2023-12-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © cyrule
//@version=4
strategy("2nd Grade Strategy", overlay=true, shorttitle="2GTS", max_lines_count = 500, max_labels_count = 500, calc_on_every_tick = true, calc_on_order_fills = true, pyramiding = 1, default_qty_type = strategy.percent_of_equity, default_qty_value = 10)

source = input(close, title = "Source")

// **********************
// * Heikin-Ahshi       *
// * kudos to garethyeo *
// **********************
showHA   = input(true, title = "Show Heikin Ashi?", group = "Heikin Ashi")
ha_open  = security(heikinashi(syminfo.tickerid), timeframe.period, open)
ha_high  = security(heikinashi(syminfo.tickerid), timeframe.period, high)
ha_low   = security(heikinashi(syminfo.tickerid), timeframe.period, low)
ha_close = security(heikinashi(syminfo.tickerid), timeframe.period, close)

bgcolor(iff(showHA and ha_open < ha_close , color.new(#53b987, transp = 92.5), na), title = 'Green HA')
bgcolor(iff(showHA and ha_open >= ha_close, color.new(#eb4d5c, transp = 92.5), na), title = 'Red HA'  )


// ******************
// * Moving Average *
// ******************
// MA Settings
showMA         = input(true, title = "Show Moving Averages?", group = "Moving Averages")
fastMALength   = input(title = "Fast MA Length", minval = 1, step = 1, defval = 20, group = "Moving Averages")
slowMALength   = input(title = "Slow MA Length", minval = 1, step = 1, defval = 50, group = "Moving Averages")
maType         = input(title = "Moving Average Type", defval = "SMA", options = ["SMA", "EMA", "RMA", "WMA", "VWMA"], group = "Moving Averages")
filterMALength = input(title = "Filter MA Length", minval = 1, step = 1, defval = 200, group = "Moving Averages")
filterMAType   = input(title = "Filter MA Type", defval = "EMA", options = ["SMA", "EMA", "RMA", "WMA", "VWMA"], group = "Moving Averages")

// Calculate MA
var float maFast   = na
var float maSlow   = na
var float maFilter = na

if (maType   == "SMA")
    maFast   := sma(source, fastMALength)
    maSlow   := sma(source, slowMALength)
if (maType   == "EMA")
    maFast   := ema(source, fastMALength)
    maSlow   := ema(source, slowMALength)
if (maType   == "RMA")
    maFast   := rma(source, fastMALength)
    maSlow   := rma(source, slowMALength)
    maFilter := rma(source, filterMALength)
if (maType   == "WMA")
    maFast   := wma(source, fastMALength)
    maSlow   := wma(source, slowMALength)
if (maType   == "VWMA")
    maFast   := vwma(source, fastMALength)
    maSlow   := vwma(source, slowMALength)

if (filterMAType == "SMA")
    maFilter     := sma(source, filterMALength)
if (filterMAType == "EMA")
    maFilter     := ema(source, filterMALength)
if (filterMAType == "RMA")
    maFilter     := rma(source, filterMALength)
if (filterMAType == "WMA")
    maFilter     := wma(source, filterMALength)
if (filterMAType == "VWMA")
    maFilter     := vwma(source, filterMALength)

BiruAtasMerah = (maFast >= maSlow) and (maSlow >= maFilter)
MerahAtasBiru = (maFast <= maSlow) and (maSlow <= maFilter)

// Lukis MA
plot(series = showMA ? maFast   : na, color = color.blue, title = "MA Fast")
plot(series = showMA ? maSlow   : na, color = color.red,  title = "MA Slow")
plot(series = showMA ? maFilter : na, color = #FFCC00,    title = "MA Filter")


// **************
// * Stochastic *
// **************
// Stochastic Settings
showSSC = input(true, title = "Show Stochastic Crossovers?", group = "Stochastic")
Length = input (10, minval = 1, title = "%K Length", group = "Stochastic")
SmoothK = input (3, minval = 1, title = "%K Smoothing", group = "Stochastic")
SmoothD = input (3, minval = 1, title = "%D Smoothing", group = "Stochastic")

// Calculate Stochastic
var float K = na
var float D = na

if (maType ==  "SMA")
	K      := sma(stoch(source, high, low, Length), SmoothK)
	D      := sma(K, SmoothD)
if (maType ==  "EMA")
	K      := ema(stoch(source, high, low, Length), SmoothK)
	D      := ema(K, SmoothD)
if (maType ==  "RMA")
	K      := rma(stoch(source, high, low, Length), SmoothK)
	D      := rma(K, SmoothD)
if (maType ==  "WMA")
	K      := wma(stoch(source, high, low, Length), SmoothK)
	D      := wma(K, SmoothD)
if (maType ==  "VWMA")
	K      := vwma(stoch(source, high, low, Length), SmoothK)
	D      := vwma(K, SmoothD)

StochasticCrossOver  = crossover(K, D)
StochasticCrossUnder = crossunder(K, D)

// Lukis SS
plotshape(showSSC and StochasticCrossOver  and K <=  20            ? K : na, text = "Golden\nCrossover",  color = color.new(color.green, transp = 25), location = location.belowbar, size = size.tiny, title = "Golden Crossover" )
plotshape(showSSC and StochasticCrossUnder and K >=  80            ? D : na, text = "Deadly\nCrossover",  color = color.new(color.red, transp = 25),   location = location.belowbar, size = size.tiny, title = "Deadly Crossover" )
plotshape(showSSC and StochasticCrossOver  and K <=  80 and K > 20 ? K : na, text = "Bullish\nCrossover", color = color.new(color.green, transp = 50), location = location.belowbar, size = size.tiny, title = "Bullish Crossover")
plotshape(showSSC and StochasticCrossUnder and K >=  20 and K < 80 ? D : na, text = "Bearish\nCrossover", color = color.new(color.red, transp = 50),   location = location.belowbar, size = size.tiny, title = "Bearish Crossover")

showBull = input(true, title = "Show Bullish Signal?", group = "Signal")
showBear = input(false, title = "Show Bearish Signal?", group = "Signal")

bullishCriteria = 0
if (ha_open < ha_close) and (ha_open[1] < ha_close[1]) and (ha_open[2] >= ha_close[2])
    bullishCriteria := bullishCriteria + 1
if (maFast > maSlow) and (maSlow > maFilter)
    bullishCriteria := bullishCriteria + 1
if (K > D) and (K > K[1]) and (D > D[1])
    bullishCriteria := bullishCriteria + 1

bearishCriteria = 0
if (ha_open >= ha_close) and (ha_open[1] >= ha_close[1]) and (ha_open[2] < ha_close[2])
    bearishCriteria := bearishCriteria + 1
if (maFast < maSlow) and (maSlow < maFilter)
    bearishCriteria := bearishCriteria + 1
if (K < D) and (K < K[1]) and (D < D[1])
    bearishCriteria := bearishCriteria + 1

signal = color.new(color.white, transp = 0)
if bearishCriteria == 2
    signal := color.new(color.orange, transp = 50)
if bearishCriteria == 3
    signal := color.new(color.red, transp = 50)
if bullishCriteria == 2
    signal := color.new(color.aqua, transp = 50)
if bullishCriteria == 3
    signal := color.new(color.green, transp = 50)

bullishCriteria := showBull ? bullishCriteria : 0
bearishCriteria := showBear ? bearishCriteria : 0

bgcolor(iff(bullishCriteria > 1, signal, na), title = 'Bullish Signal')
bgcolor(iff(bearishCriteria > 1, signal, na), title = 'Bearish Signal')

longTPPerc  = input(title = "Take Profit Threshold (%)"            , minval = 0.0, step = 0.5, defval = 2.5, group = "Trading") / 100
profitRatio = input(title = "Profit-to-Loss ratio (risk tolerance)", minval = 1.0, step = 0.1, defval = 1.4, group = "Trading")
longSLPerc  = longTPPerc / profitRatio
takeProfit  = strategy.position_avg_price * (1 + longTPPerc)
stopLoss    = strategy.position_avg_price * (1 - longSLPerc)
strategy.initial_capital = 50000
strategy.entry("Long" , strategy.long , floor(strategy.initial_capital*.1/close), stop = strategy.position_avg_price * 1.25, when = bullishCriteria > 1)
strategy.entry("Short", strategy.short, floor(strategy.initial_capital*.1/close), stop = strategy.position_avg_price * 1.25, when = bearishCriteria > 1)
strategy.close("Long" , when = (open >= takeProfit) or (open <= stopLoss) or (high >= takeProfit) or (low <= stopLoss))
strategy.close("Short", when = (open >= takeProfit) or (open <= stopLoss) or (high >= takeProfit) or (low <= stopLoss))

plotshape(bullishCriteria, location = location.belowbar, color = color.new(color.black, transp = 100))
plotshape(bearishCriteria, location = location.belowbar, color = color.new(color.black, transp = 100))
```

> Detail

https://www.fmz.com/strategy/435481

> Last Modified

2023-12-15 11:30:09
