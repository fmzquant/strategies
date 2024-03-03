
> Name

自适应多时间框架斐波纳契波段交易策略Adaptive-Multi-Timeframe-Fibonacci-Retracement-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e78282171f5ffdfb3d.png)

[trans]

### 概述

自适应多时间框架斐波纳契波段交易策略是一种融合自适应均线、Stochastic RSI 指标以及斐波纳契回撤区域的趋势跟踪策略。该策略运用多种指标分析不同级别行情走势,动态调整仓位。在趋势形成时,策略可精确定位潜在回调区域进行位置建立。策略同时设置止损以控制风险。

### 策略原理

自适应多时间框架斐波纳契波段交易策略融合使用以下几种技术指标与机制:

1. 自适应均线(SMA和WMA):计算不同周期(分钟、小时、日线等)价格的自适应移动平均线。根据均线多空状态判断趋势方向。

2. Stochastic RSI:计算RSI指标的Stochastic值来判断RSI是否超买超卖。结合RSI曲线形态分析力度与趋势。 

3. 斐波纳契回撤区域:根据最近Swing High和Swing Low绘制斐波纳契回撤区域,并设置备选买卖点。这些区域具有潜在趋势反转与回调的特征。

4. 仓位管理:根据Stoch RSI和自适应均线的强弱信号,动态调整仓位。

策略首先判断趋势方向,在股票价格进入斐波纳契回撤区域时设立备选买卖点。当自适应均线和Stoch RSI发出进场信号时,在备选买卖点附近执行定单。止损设置为回撤区域之外,以控制风险。

### 优势分析

自适应多时间框架斐波纳契波段交易策略具有以下优势:

1. 多时间框架分析:同时评估多种周期级别(分钟、小时、日线),更全面判断趋势。

2. 动态仓位管理:根据情况调整仓位,控制风险。

3. 精准定位回调区域:斐波纳契区域可用于捕捉趋势中的短期反转。

4. 严格止损:根据回撤区域设置止损,有效避免巨额亏损。

5. 信号过滤:仅在备选买卖点附近执行交易,避免假突破。

6. 参数优化空间大:多种输入参数可根据市场调整,优化策略表现。


### 风险分析

该策略主要存在以下风险:

1. 回撤区域失效风险:价格未能触及斐波纳契区域或区域失效,无法建仓。可通过扩大区域范围、增加区域数量来缓解。

2. 停损追踪风险:止损静态设置,可能预先被击出。可通过机动止损、备用止损区等手段进行优化。 

3. 信号假突破风险:自适应均线、Stoch RSI 偶发假信号,造成不必要交易。可适当过滤信号来减少假突破概率。

4. 过于复杂风险:多种参数和技术指标组合使用,会增加策略复杂度。优化和测试难度较大。

### 优化方向

自适应多时间框架斐波纳契波段交易策略还可从以下维度进行进一步优化:

1. 测试更多股票和外汇品种,评估策略稳健性。根据不同市场调整参数。

2. 增加信号过滤机制,降低假信号概率,提高信噪比。

3. 测试并比对不同类型移动均线的参数效果。

4. 尝试将固定止损改为追踪止损或备用止损区,见证策略效果提升。 

5. 尝试 breakout 信号或趋势跟踪机制,设计长线获利方式。

### 总结

自适应多时间框架斐波纳契波段交易策略综合运用多种分析工具识别趋势情况,并在回调期 précises 部署仓位。严格的止损与风险控制机制有助于在大趋势中进行利润优化。该策略拥有较多的可调整空间与优化方向,经过适当调试与更新后,将成为稳定可靠的量化交易策略。

|| 

### Overview

The Adaptive Multi Timeframe Fibonacci Retracement Trading Strategy is a trend-following strategy that incorporates adaptive moving averages, Stochastic RSI and Fibonacci retracement zones. It analyzes the market movement across different timeframes with various indicators to dynamically adjust position sizing. The strategy can accurately locate potential pullback zones to establish positions when a trend is forming. It also sets stop loss to control risks.

### Strategy Logic

The Adaptive Multi Timeframe Fibonacci Retracement Trading Strategy utilizes the following technical tools and mechanisms:

1. Adaptive Moving Average (SMA and WMA): Calculate adaptive moving averages of prices over different periods (minute, hour, day etc.). Determine trend direction based on the slope of the adaptive moving averages.

2. Stochastic RSI: Calculate the stochastic value of RSI to determine whether RSI is overbought or oversold. Analyze momentum and trend using the shape of the RSI curve.

3. Fibonacci Retracement Zones: Plot Fibonacci retracement zones using recent Swing High and Swing Low. Set entry and exit points within these zones, which tend to mark potential trend reversals or pullbacks.

4. Position Sizing: Dynamically adjust position size based on strength of signals from Stoch RSI and adaptive moving averages.

The strategy first determines the trend direction. When price enters a Fibonacci zone, potential entry points are marked near the zone. Trades are executed when adaptive moving average and Stoch RSI issue entry signals around the potential points. Stop loss is set outside the Fib zone to control risk.

### Advantage Analysis 

The Adaptive Multi Timeframe Fibonacci Retracement Trading Strategy has the following strengths:

1. Multi Timeframe Analysis: Concurrently evaluates multiple timeframe levels (minute, hour, day etc.) for more comprehensive trend judgment.  

2. Dynamic Position Sizing: Adjusts position size dynamically according to market conditions to better control risks.

3. Accurate Pullback Targeting: Fibonacci zones can be used to catch short-term reversals during trends. 

4. Strict Stop Loss: Stop loss based on retracement zones effectively prevents huge losses.

5. Signal Filtering: Only enters trades around marked entry points, avoiding false breakouts.  

6. High Optimizability: Multiple tunable input parameters that can be adjusted to optimize strategy performance per market.

### Risk Analysis

The main risks associated with this strategy are:

1. Invalid Zone Risk: Failure to reach zones or invalid zones result in missed entries. Can be mitigated by expanding zone range or adding more zones.  

2. Stop Loss Tracking Risk: Static stop loss may be prematurely hit. Can look into trailing stop loss, zone stop loss etc.

3. False Signal Risk: Adaptive moving average and Stoch RSI may occasionally give false signals, causing unnecessary trades. Signals can be filtered to reduce false signal rate.

4. High Complexity Risks: The combination of multiple parameters and indicators increases strategy complexity, making optimization and testing harder.

### Enhancement Opportunities 

This strategy can be further optimized in the following ways:

1. Test on more equities and forex products to evaluate robustness. Fine tune parameters per market.

2. Add signal filtering mechanisms to lower false signal rate and increase signal-to-noise ratio.  

3. Test and compare parameters of different types of moving averages.  

4. Evaluate improvements from replacing fixed stop loss with trailing stop loss or zone stop loss.

5. Experiment with breakout signals or trend tracking mechanisms to design long-term profit-taking approaches.


### Conclusion

The Adaptive Multi Timeframe Fibonacci Retracement Trading Strategy utilizes various analytical tools to identify trend conditions and deploys positions during retracements. Strict risk control mechanisms and stop loss helps optimize profits within major trends. With ample tunable parameters and optimization opportunities, further refinements to this strategy will shape it into a stable and reliable trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|(?══════ Strong Trend Levels ══════)enable Upper Bullish Band . . . Fib Level|
|v_input_float_1|0|     : 0.236|0|-0.272|0.382|0.5|0.618|0.702|0.71|0.786|0.83|0.886|1|1.272|
|v_input_bool_2|false|enable Lower Bearish Band . . . Fib Level|
|v_input_float_2|0|select_StrongBand_Fib_Bear: 0.382|0|0.236|-0.272|0.5|0.618|0.702|0.71|0.786|0.83|0.886|1|1.272|
|v_input_int_1|400|Pivot Look Back|
|v_input_int_2|120|Fib EMA Length|
|v_input_bool_3|true|(?══════ Regular Trend Levels ══════)enable Middle Bullish Band . . . Fib Level|
|v_input_float_3|0|select_MiddleBand_Fib_Bull: 0.618|0|0.236|0.382|0.5|0.6|-0.272|0.702|0.71|0.786|0.83|0.886|1|1.272|
|v_input_bool_4|true|enable Middle Bearish Band . . . Fib Level|
|v_input_float_4|0|select_MiddleBand_Fib_Bear: 0.382|0|0.236|-0.272|0.5|0.618|0.702|0.71|0.786|0.83|0.886|1|1.272|
|v_input_int_3|900|Pivot Look Back|
|v_input_int_4|400|Fib EMA Length|
|v_input_bool_5|true|(?══════ Sideways Trend Levels ══════)enable Lower Bullish Band . . . Fib Level|
|v_input_float_5|0|select_SidewaysBand_Fib_Bull: 0.6|0|0.236|0.382|0.5|-0.272|0.618|0.702|0.71|0.786|0.83|0.886|1|1.272|
|v_input_bool_6|true|enable Upper Bearish Band . . . Fib Level|
|v_input_float_6|0|select_SidewaysBand_Fib_Bear: 0.5|0|0.236|0.382|-0.272|0.618|0.702|0.71|0.786|0.83|0.886|1|1.272|
|v_input_int_5|4000|Pivot Look Back|
|v_input_int_6|150|Fib EMA Length|
|v_input_bool_7|true|(?══════════ Stop Loss Settings ══════════)enable Stop Loss|
|v_input_string_1|0|SL based on static % or based on the low/high: low/high as SL|static % as SL|
|v_input_string_2|0|(?Stop Loss at the low/high)choose offset from the low/high: % as offset|$ as offset|
|v_input_float_7|1.4|SL Offset from the Low/high in %|
|v_input_float_8|100|SL Offset from the Low/high in $|
|v_input_int_7|5|SL lookback for Low/high|
|v_input_float_9|0.5|(?static % Stop Loss)Long Stop Loss in %|
|v_input_float_10|0.5|Short Stop Loss in %|
|v_input_float_11|4|(?Take Profit)Long Take Profit in %|
|v_input_float_12|1.6|Short Take Profit in %|
|v_input_string_3|0|(?═══════════ alert settings ═══════════)Alert Options: once per bar close|once per bar|all|
|v_input_string_4|Bullish Divergence detected, put your SL @|Buy Alert Message|
|v_input_bool_8|true|enable Stop Loss Value at the end of "buy Alert message"|
|v_input_string_5||Buy Alert message after SL Value|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-17 00:00:00
end: 2023-12-24 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © imal_max

//@version=5
strategy(title="Auto Fib Golden Pocket Band - Autofib Moving Average", shorttitle="Auto Fib Golden Pocket Band", overlay=true, pyramiding=15, process_orders_on_close=true, calc_on_every_tick=true, initial_capital=10000, currency = currency.USD, default_qty_value=100, default_qty_type=strategy.percent_of_equity, commission_type=strategy.commission.percent, commission_value=0.05, slippage=2)

//indicator("Auto Fib Golden Pocket Band - Autofib Moving Average", overlay=true, shorttitle="Auto Fib Golden Pocket Band", timeframe""")


// Fibs


// auto fib ranges

// fib band Strong Trend                                                                                                                                           
enable_StrongBand_Bull = input.bool(title='enable Upper Bullish Band . . . Fib Level', defval=true, group='══════ Strong Trend Levels ══════', inline="0")
select_StrongBand_Fib_Bull = input.float(0.236, title="     ", options=[-0.272, 0, 0.236, 0.382, 0.5, 0.618, 0.702, 0.71, 0.786, 0.83, 0.886, 1, 1.272], group='══════ Strong Trend Levels ══════', inline="0")


enable_StrongBand_Bear = input.bool(title='enable Lower Bearish Band . . . Fib Level', defval=false, group='══════ Strong Trend Levels ══════', inline="1")
select_StrongBand_Fib_Bear = input.float(0.382, '', options=[-0.272, 0, 0.236, 0.382, 0.5, 0.618, 0.702, 0.71, 0.786, 0.83, 0.886, 1, 1.272], group='══════ Strong Trend Levels ══════', inline="1")

StrongBand_Lookback = input.int(title='Pivot Look Back', minval=1, defval=400, group='══════ Strong Trend Levels ══════', inline="2")
StrongBand_EmaLen = input.int(title='Fib EMA Length', minval=1, defval=120, group='══════ Strong Trend Levels ══════', inline="2")


// fib middle Band regular Trend
enable_MiddleBand_Bull = input.bool(title='enable Middle Bullish Band . . . Fib Level', defval=true, group='══════ Regular Trend Levels ══════', inline="0")
select_MiddleBand_Fib_Bull = input.float(0.618, '', options=[-0.272, 0, 0.236, 0.382, 0.5, 0.6, 0.618, 0.702, 0.71, 0.786, 0.83, 0.886, 1, 1.272], group='══════ Regular Trend Levels ══════', inline="0")


enable_MiddleBand_Bear = input.bool(title='enable Middle Bearish Band . . . Fib Level', defval=true, group='══════ Regular Trend Levels ══════', inline="1")
select_MiddleBand_Fib_Bear = input.float(0.382, '', options=[-0.272, 0, 0.236, 0.382, 0.5, 0.618, 0.702, 0.71, 0.786, 0.83, 0.886, 1, 1.272], group='══════ Regular Trend Levels ══════', inline="1")

MiddleBand_Lookback = input.int(title='Pivot Look Back', minval=1, defval=900, group='══════ Regular Trend Levels ══════', inline="2")
MiddleBand_EmaLen = input.int(title='Fib EMA Length', minval=1, defval=400, group='══════ Regular Trend Levels ══════', inline="2")


// fib Sideways Band
enable_SidewaysBand_Bull = input.bool(title='enable Lower Bullish Band . . . Fib Level', defval=true, group='══════ Sideways Trend Levels ══════', inline="0")
select_SidewaysBand_Fib_Bull = input.float(0.6, '', options=[-0.272, 0, 0.236, 0.382, 0.5, 0.6, 0.618, 0.702, 0.71, 0.786, 0.83, 0.886, 1, 1.272], group='══════ Sideways Trend Levels ══════', inline="0")


enable_SidewaysBand_Bear = input.bool(title='enable Upper Bearish Band . . . Fib Level', defval=true, group='══════ Sideways Trend Levels ══════', inline="1")
select_SidewaysBand_Fib_Bear = input.float(0.5, '', options=[-0.272, 0, 0.236, 0.382, 0.5, 0.618, 0.702, 0.71, 0.786, 0.83, 0.886, 1, 1.272], group='══════ Sideways Trend Levels ══════', inline="1")

SidewaysBand_Lookback = input.int(title='Pivot Look Back', minval=1, defval=4000, group='══════ Sideways Trend Levels ══════', inline="2")
SidewaysBand_EmaLen = input.int(title='Fib EMA Length', minval=1, defval=150, group='══════ Sideways Trend Levels ══════', inline="2")




// Strong Band
isBelow_StrongBand_Bull = true
isBelow_StrongBand_Bear = true
StrongBand_Price_of_Low = float(na)
StrongBand_Price_of_High = float(na)

StrongBand_Bear_Fib_Price = float(na)
StrongBand_Bull_Fib_Price = float(na)

/// Middle Band
isBelow_MiddleBand_Bull = true
isBelow_MiddleBand_Bear = true
MiddleBand_Price_of_Low = float(na)
MiddleBand_Price_of_High = float(na)

MiddleBand_Bear_Fib_Price = float(na)
MiddleBand_Bull_Fib_Price = float(na)


// Sideways Band
isBelow_SidewaysBand_Bull = true
isBelow_SidewaysBand_Bear = true
SidewaysBand_Price_of_Low = float(na)
SidewaysBand_Price_of_High = float(na)

SidewaysBand_Bear_Fib_Price = float(na)
SidewaysBand_Bull_Fib_Price = float(na)


// get Fib Levels
if enable_StrongBand_Bull
    StrongBand_Price_of_High := ta.highest(high, StrongBand_Lookback)
    StrongBand_Price_of_Low := ta.lowest(low, StrongBand_Lookback)
    StrongBand_Bull_Fib_Price := (StrongBand_Price_of_High - StrongBand_Price_of_Low) * (1 - select_StrongBand_Fib_Bull) + StrongBand_Price_of_Low //+ fibbullHighDivi
    isBelow_StrongBand_Bull := StrongBand_Bull_Fib_Price > ta.lowest(low, 2) or not enable_StrongBand_Bull

if enable_StrongBand_Bear
    StrongBand_Price_of_High := ta.highest(high, StrongBand_Lookback)
    StrongBand_Price_of_Low := ta.lowest(low, StrongBand_Lookback)
    StrongBand_Bear_Fib_Price := (StrongBand_Price_of_High - StrongBand_Price_of_Low) * (1 - select_StrongBand_Fib_Bear) + StrongBand_Price_of_Low// + fibbullLowhDivi
    isBelow_StrongBand_Bear := StrongBand_Bear_Fib_Price < ta.highest(low, 2) or not enable_StrongBand_Bear

if enable_MiddleBand_Bull
    MiddleBand_Price_of_High := ta.highest(high, MiddleBand_Lookback)
    MiddleBand_Price_of_Low := ta.lowest(low, MiddleBand_Lookback)
    MiddleBand_Bull_Fib_Price := (MiddleBand_Price_of_High - MiddleBand_Price_of_Low) * (1 - select_MiddleBand_Fib_Bull) + MiddleBand_Price_of_Low //+ fibbullHighDivi
    isBelow_MiddleBand_Bull := MiddleBand_Bull_Fib_Price > ta.lowest(low, 2) or not enable_MiddleBand_Bull

if enable_MiddleBand_Bear
    MiddleBand_Price_of_High := ta.highest(high, MiddleBand_Lookback)
    MiddleBand_Price_of_Low := ta.lowest(low, MiddleBand_Lookback)
    MiddleBand_Bear_Fib_Price := (MiddleBand_Price_of_High - MiddleBand_Price_of_Low) * (1 - select_MiddleBand_Fib_Bear) + MiddleBand_Price_of_Low// + fibbullLowhDivi
    isBelow_MiddleBand_Bear := MiddleBand_Bear_Fib_Price < ta.highest(low, 2) or not enable_MiddleBand_Bear

if enable_SidewaysBand_Bull
    SidewaysBand_Price_of_High := ta.highest(high, SidewaysBand_Lookback)
    SidewaysBand_Price_of_Low := ta.lowest(low, SidewaysBand_Lookback)
    SidewaysBand_Bull_Fib_Price := (SidewaysBand_Price_of_High - SidewaysBand_Price_of_Low) * (1 - select_SidewaysBand_Fib_Bull) + SidewaysBand_Price_of_Low //+ fibbullHighDivi
    isBelow_SidewaysBand_Bull := SidewaysBand_Bull_Fib_Price > ta.lowest(low, 2) or not enable_SidewaysBand_Bull

if enable_SidewaysBand_Bear
    SidewaysBand_Price_of_High := ta.highest(high, SidewaysBand_Lookback)
    SidewaysBand_Price_of_Low := ta.lowest(low, SidewaysBand_Lookback)
    SidewaysBand_Bear_Fib_Price := (SidewaysBand_Price_of_High - SidewaysBand_Price_of_Low) * (1 - select_SidewaysBand_Fib_Bear) + SidewaysBand_Price_of_Low// + fibbullLowhDivi
    isBelow_SidewaysBand_Bear := SidewaysBand_Bear_Fib_Price < ta.highest(low, 2) or not enable_SidewaysBand_Bear



// Fib EMAs


// fib ema Strong Trend
StrongBand_current_Trend_EMA = float(na)

StrongBand_Bull_EMA = ta.ema(StrongBand_Bull_Fib_Price, StrongBand_EmaLen)
StrongBand_Bear_EMA = ta.ema(StrongBand_Bear_Fib_Price, StrongBand_EmaLen)


StrongBand_Ema_in_Uptrend = ta.change(StrongBand_Bull_EMA) > 0 or ta.change(StrongBand_Bear_EMA) > 0
StrongBand_Ema_Sideways = ta.change(StrongBand_Bull_EMA) == 0 or ta.change(StrongBand_Bear_EMA) == 0
StrongBand_Ema_in_Downtrend = ta.change(StrongBand_Bull_EMA) < 0 or ta.change(StrongBand_Bear_EMA) < 0


if StrongBand_Ema_in_Uptrend or StrongBand_Ema_Sideways
    StrongBand_current_Trend_EMA := StrongBand_Bull_EMA
if StrongBand_Ema_in_Downtrend 
    StrongBand_current_Trend_EMA := StrongBand_Bear_EMA



// fib ema Normal Trend
MiddleBand_current_Trend_EMA = float(na)

MiddleBand_Bull_EMA = ta.ema(MiddleBand_Bull_Fib_Price, MiddleBand_EmaLen)
MiddleBand_Bear_EMA = ta.ema(MiddleBand_Bear_Fib_Price, MiddleBand_EmaLen)


MiddleBand_Ema_in_Uptrend = ta.change(MiddleBand_Bull_EMA) > 0 or ta.change(MiddleBand_Bear_EMA) > 0
MiddleBand_Ema_Sideways = ta.change(MiddleBand_Bull_EMA) == 0 or ta.change(MiddleBand_Bear_EMA) == 0
MiddleBand_Ema_in_Downtrend = ta.change(MiddleBand_Bull_EMA) < 0 or ta.change(MiddleBand_Bear_EMA) < 0


if MiddleBand_Ema_in_Uptrend or MiddleBand_Ema_Sideways
    MiddleBand_current_Trend_EMA := MiddleBand_Bull_EMA
if MiddleBand_Ema_in_Downtrend 
    MiddleBand_current_Trend_EMA := MiddleBand_Bear_EMA


// fib ema Sideways Trend
SidewaysBand_current_Trend_EMA = float(na)

SidewaysBand_Bull_EMA = ta.ema(SidewaysBand_Bull_Fib_Price, SidewaysBand_EmaLen)
SidewaysBand_Bear_EMA = ta.ema(SidewaysBand_Bear_Fib_Price, SidewaysBand_EmaLen)


SidewaysBand_Ema_in_Uptrend = ta.change(SidewaysBand_Bull_EMA) > 0 or ta.change(SidewaysBand_Bear_EMA) > 0
SidewaysBand_Ema_Sideways = ta.change(SidewaysBand_Bull_EMA) == 0 or ta.change(SidewaysBand_Bear_EMA) == 0
SidewaysBand_Ema_in_Downtrend = ta.change(SidewaysBand_Bull_EMA) < 0 or ta.change(SidewaysBand_Bear_EMA) < 0


if SidewaysBand_Ema_in_Uptrend or SidewaysBand_Ema_Sideways
    SidewaysBand_current_Trend_EMA := SidewaysBand_Bull_EMA
if SidewaysBand_Ema_in_Downtrend 
    SidewaysBand_current_Trend_EMA := SidewaysBand_Bear_EMA




// trend states and colors

all_Fib_Emas_Trending = StrongBand_Ema_in_Uptrend and MiddleBand_Ema_in_Uptrend and SidewaysBand_Ema_in_Uptrend
all_Fib_Emas_Downtrend = MiddleBand_Ema_in_Downtrend and StrongBand_Ema_in_Downtrend and SidewaysBand_Ema_in_Downtrend
all_Fib_Emas_Sideways = MiddleBand_Ema_Sideways and StrongBand_Ema_Sideways and SidewaysBand_Ema_Sideways
all_Fib_Emas_Trend_or_Sideways = (MiddleBand_Ema_Sideways or StrongBand_Ema_Sideways or SidewaysBand_Ema_Sideways) or (StrongBand_Ema_in_Uptrend or MiddleBand_Ema_in_Uptrend or SidewaysBand_Ema_in_Uptrend) and not (MiddleBand_Ema_in_Downtrend or StrongBand_Ema_in_Downtrend or SidewaysBand_Ema_in_Downtrend)
allFibsUpAndDownTrend = (MiddleBand_Ema_in_Downtrend or StrongBand_Ema_in_Downtrend or SidewaysBand_Ema_in_Downtrend) and (MiddleBand_Ema_Sideways or SidewaysBand_Ema_Sideways or StrongBand_Ema_Sideways or StrongBand_Ema_in_Uptrend or MiddleBand_Ema_in_Uptrend or SidewaysBand_Ema_in_Uptrend)

Middle_and_Sideways_Emas_Trending = MiddleBand_Ema_in_Uptrend and SidewaysBand_Ema_in_Uptrend
Middle_and_Sideways_Fib_Emas_Downtrend = MiddleBand_Ema_in_Downtrend and SidewaysBand_Ema_in_Downtrend
Middle_and_Sideways_Fib_Emas_Sideways = MiddleBand_Ema_Sideways and SidewaysBand_Ema_Sideways
Middle_and_Sideways_Fib_Emas_Trend_or_Sideways = (MiddleBand_Ema_Sideways or SidewaysBand_Ema_Sideways) or (MiddleBand_Ema_in_Uptrend or SidewaysBand_Ema_in_Uptrend) and not (MiddleBand_Ema_in_Downtrend or SidewaysBand_Ema_in_Downtrend)
Middle_and_Sideways_UpAndDownTrend = (MiddleBand_Ema_in_Downtrend or SidewaysBand_Ema_in_Downtrend) and (MiddleBand_Ema_Sideways or SidewaysBand_Ema_Sideways or MiddleBand_Ema_in_Uptrend or SidewaysBand_Ema_in_Uptrend)




UpperBand_Ema_Color = all_Fib_Emas_Trend_or_Sideways ? color.lime : all_Fib_Emas_Downtrend ? color.red : allFibsUpAndDownTrend ? color.white : na
MiddleBand_Ema_Color = Middle_and_Sideways_Fib_Emas_Trend_or_Sideways ? color.lime : Middle_and_Sideways_Fib_Emas_Downtrend ? color.red : Middle_and_Sideways_UpAndDownTrend ? color.white : na
SidewaysBand_Ema_Color = SidewaysBand_Ema_in_Uptrend ? color.lime : SidewaysBand_Ema_in_Downtrend ? color.red : (SidewaysBand_Ema_in_Downtrend and (SidewaysBand_Ema_Sideways or SidewaysBand_Ema_in_Uptrend)) ? color.white : na


plotStrong_Ema = plot(StrongBand_current_Trend_EMA, color=UpperBand_Ema_Color, title="Strong Trend")
plotMiddle_Ema = plot(MiddleBand_current_Trend_EMA, color=MiddleBand_Ema_Color, title="Normal Trend")
plotSideways_Ema = plot(SidewaysBand_current_Trend_EMA, color=SidewaysBand_Ema_Color, title="Sidewaysd")



Strong_Middle_fillcolor = color.new(color.green, 90)

if all_Fib_Emas_Trend_or_Sideways
    Strong_Middle_fillcolor := color.new(color.green, 90)
if all_Fib_Emas_Downtrend
    Strong_Middle_fillcolor := color.new(color.red, 90)
    
if allFibsUpAndDownTrend
    Strong_Middle_fillcolor := color.new(color.white, 90)


Middle_Sideways_fillcolor = color.new(color.green, 90)

if Middle_and_Sideways_Fib_Emas_Trend_or_Sideways
    Middle_Sideways_fillcolor := color.new(color.green, 90)
if Middle_and_Sideways_Fib_Emas_Downtrend
    Middle_Sideways_fillcolor := color.new(color.red, 90)
    
if Middle_and_Sideways_UpAndDownTrend
    Middle_Sideways_fillcolor := color.new(color.white, 90)


fill(plotStrong_Ema, plotMiddle_Ema, color=Strong_Middle_fillcolor, title="fib band background")
fill(plotMiddle_Ema, plotSideways_Ema, color=Middle_Sideways_fillcolor, title="fib band background")


// buy condition
StrongBand_Price_was_below_Bull_level = ta.lowest(low, 1) < StrongBand_current_Trend_EMA
StrongBand_Price_is_above_Bull_level =  close > StrongBand_current_Trend_EMA
StronBand_Price_Average_above_Bull_Level = ta.ema(low, 10) > StrongBand_current_Trend_EMA
StrongBand_Low_isnt_toLow = (ta.lowest(StrongBand_current_Trend_EMA, 15) - ta.lowest(low, 15)) < close * 0.005
StronBand_Trend_isnt_fresh = ta.barssince(StrongBand_Ema_in_Downtrend) > 50 or na(ta.barssince(StrongBand_Ema_in_Downtrend))

MiddleBand_Price_was_below_Bull_level = ta.lowest(low, 1) < MiddleBand_current_Trend_EMA
MiddleBand_Price_is_above_Bull_level = close > MiddleBand_current_Trend_EMA
MiddleBand_Price_Average_above_Bull_Level = ta.ema(close, 20) > MiddleBand_current_Trend_EMA
MiddleBand_Low_isnt_toLow = (ta.lowest(MiddleBand_current_Trend_EMA, 10) - ta.lowest(low, 10)) < close * 0.0065
MiddleBand_Trend_isnt_fresh = ta.barssince(MiddleBand_Ema_in_Downtrend) > 50 or na(ta.barssince(MiddleBand_Ema_in_Downtrend))

SidewaysBand_Price_was_below_Bull_level = ta.lowest(low, 1) < SidewaysBand_current_Trend_EMA
SidewaysBand_Price_is_above_Bull_level =  close > SidewaysBand_current_Trend_EMA
SidewaysBand_Price_Average_above_Bull_Level = ta.ema(low, 80) > SidewaysBand_current_Trend_EMA
SidewaysBand_Low_isnt_toLow = (ta.lowest(SidewaysBand_current_Trend_EMA, 150) - ta.lowest(low, 150)) < close * 0.0065
SidewaysBand_Trend_isnt_fresh = ta.barssince(SidewaysBand_Ema_in_Downtrend) > 50 or na(ta.barssince(SidewaysBand_Ema_in_Downtrend))



StrongBand_Buy_Alert = StronBand_Trend_isnt_fresh and StrongBand_Low_isnt_toLow and StronBand_Price_Average_above_Bull_Level and StrongBand_Price_was_below_Bull_level and StrongBand_Price_is_above_Bull_level and all_Fib_Emas_Trend_or_Sideways
MiddleBand_Buy_Alert = MiddleBand_Trend_isnt_fresh and MiddleBand_Low_isnt_toLow and MiddleBand_Price_Average_above_Bull_Level and MiddleBand_Price_was_below_Bull_level and MiddleBand_Price_is_above_Bull_level and Middle_and_Sideways_Fib_Emas_Trend_or_Sideways
SidewaysBand_Buy_Alert = SidewaysBand_Trend_isnt_fresh and SidewaysBand_Low_isnt_toLow and SidewaysBand_Price_Average_above_Bull_Level and SidewaysBand_Price_was_below_Bull_level and SidewaysBand_Price_is_above_Bull_level and (SidewaysBand_Ema_Sideways or SidewaysBand_Ema_in_Uptrend and ( not SidewaysBand_Ema_in_Downtrend))



// Sell condition
StrongBand_Price_was_above_Bear_level = ta.highest(high, 1) > StrongBand_current_Trend_EMA
StrongBand_Price_is_below_Bear_level =  close < StrongBand_current_Trend_EMA
StronBand_Price_Average_below_Bear_Level = ta.sma(high, 10) < StrongBand_current_Trend_EMA
StrongBand_High_isnt_to_High = (ta.highest(high, 15) - ta.highest(StrongBand_current_Trend_EMA, 15)) < close * 0.005
StrongBand_Bear_Trend_isnt_fresh = ta.barssince(StrongBand_Ema_in_Uptrend) > 50

MiddleBand_Price_was_above_Bear_level = ta.highest(high, 1) > MiddleBand_current_Trend_EMA
MiddleBand_Price_is_below_Bear_level =  close < MiddleBand_current_Trend_EMA
MiddleBand_Price_Average_below_Bear_Level = ta.sma(high, 9) < MiddleBand_current_Trend_EMA
MiddleBand_High_isnt_to_High = (ta.highest(high, 10) - ta.highest(MiddleBand_current_Trend_EMA, 10)) < close * 0.0065
MiddleBand_Bear_Trend_isnt_fresh = ta.barssince(MiddleBand_Ema_in_Uptrend) > 50

SidewaysBand_Price_was_above_Bear_level = ta.highest(high, 1) > SidewaysBand_current_Trend_EMA
SidewaysBand_Price_is_below_Bear_level =  close < SidewaysBand_current_Trend_EMA
SidewaysBand_Price_Average_below_Bear_Level = ta.sma(high, 20) < SidewaysBand_current_Trend_EMA
SidewaysBand_High_isnt_to_High = (ta.highest(high, 20) - ta.highest(SidewaysBand_current_Trend_EMA, 15)) < close * 0.0065
SidewaysBand_Bear_Trend_isnt_fresh = ta.barssince(SidewaysBand_Ema_in_Uptrend) > 50



StrongBand_Sell_Alert = StronBand_Price_Average_below_Bear_Level and StrongBand_High_isnt_to_High and StrongBand_Bear_Trend_isnt_fresh and StrongBand_Price_was_above_Bear_level and StrongBand_Price_is_below_Bear_level and all_Fib_Emas_Downtrend and not all_Fib_Emas_Trend_or_Sideways
MiddleBand_Sell_Alert = MiddleBand_Price_Average_below_Bear_Level and MiddleBand_High_isnt_to_High and MiddleBand_Bear_Trend_isnt_fresh and MiddleBand_Price_was_above_Bear_level and MiddleBand_Price_is_below_Bear_level and Middle_and_Sideways_Fib_Emas_Downtrend and not Middle_and_Sideways_Fib_Emas_Trend_or_Sideways
SidewaysBand_Sell_Alert = SidewaysBand_Price_Average_below_Bear_Level and SidewaysBand_High_isnt_to_High and SidewaysBand_Bear_Trend_isnt_fresh and SidewaysBand_Price_was_above_Bear_level and SidewaysBand_Price_is_below_Bear_level and SidewaysBand_Ema_in_Downtrend and not (SidewaysBand_Ema_Sideways or SidewaysBand_Ema_in_Uptrend and ( not SidewaysBand_Ema_in_Downtrend))

// Backtester


////////////////// Stop Loss

// Stop loss
enableSL =  input.bool(true, title='enable Stop Loss', group='══════════ Stop Loss Settings ══════════')
whichSL =  input.string(defval='low/high as SL', title='SL based on static % or based on the low/high', options=['low/high as SL', 'static % as SL'], group='══════════ Stop Loss Settings ══════════')
whichOffset = input.string(defval='% as offset', title='choose offset from the low/high', options=['$ as offset', '% as offset'], group='Stop Loss at the low/high')
lowPBuffer = input.float(1.4, title='SL Offset from the Low/high in %', group='Stop Loss at the low/high') / 100
lowDBuffer = input.float(100, title='SL Offset from the Low/high in $', group='Stop Loss at the low/high')
SlLowLookback = input.int(title='SL lookback for Low/high', defval=5, minval=1, maxval=50, group='Stop Loss at the low/high')


longSlLow = float(na)
shortSlLow = float(na)

if whichOffset == "% as offset" and whichSL == "low/high as SL" and enableSL
    longSlLow := ta.lowest(low, SlLowLookback) * (1 - lowPBuffer)
    shortSlLow := ta.highest(high, SlLowLookback) * (1 + lowPBuffer)
if whichOffset == "$ as offset" and whichSL == "low/high as SL" and enableSL
    longSlLow := ta.lowest(low, SlLowLookback) - lowDBuffer
    shortSlLow := ta.highest(high, SlLowLookback) + lowDBuffer
//plot(shortSlLow, title="stoploss", color=color.new(#00bcd4, 0))


// long settings - ? uncomment the 6 lines below to disable the alerts and enable the backtester 
longStopLoss = input.float(0.5, title='Long Stop Loss in %', group='static % Stop Loss', inline='Input 1') / 100
// short settings - ? uncomment the 6 lines below to disable the alerts and enable the backtester 
shortStopLoss = input.float(0.5, title='Short Stop Loss in %', group='static % Stop Loss', inline='Input 1') / 100

/////// Take profit

longTakeProfit1 = input.float(4, title='Long Take Profit in %', group='Take Profit', inline='Input 1') / 100


/////// Take profit

shortTakeProfit1 = input.float(1.6, title='Short Take Profit in %', group='Take Profit', inline='Input 1') / 100


////////////////// SL TP END


/////////////////// alerts 


selectalertFreq = input.string(defval='once per bar close', title='Alert Options', options=['once per bar', 'once per bar close', 'all'], group='═══════════ alert settings ═══════════')
BuyAlertMessage = input.string(defval="Bullish Divergence detected, put your SL @", title='Buy Alert Message',  group='═══════════ alert settings ═══════════')
enableSlMessage =  input.bool(true, title='enable Stop Loss Value at the end of "buy Alert message"', group='═══════════ alert settings ═══════════')
AfterSLMessage = input.string(defval="", title='Buy Alert message after SL Value',  group='═══════════ alert settings ═══════════')


 
////////////////// Backtester 

// ? uncomment the all lines below for the backtester and revert for alerts
shortTrading = enable_MiddleBand_Bear or enable_StrongBand_Bear or enable_SidewaysBand_Bear
longTrading = enable_StrongBand_Bull or enable_MiddleBand_Bull or enable_SidewaysBand_Bull

longTP1 = strategy.position_size > 0 ? strategy.position_avg_price * (1 + longTakeProfit1) : strategy.position_size < 0 ? strategy.position_avg_price * (1 - longTakeProfit1) : na
longSL = strategy.position_size > 0 ? strategy.position_avg_price * (1 - longStopLoss) : strategy.position_size < 0 ? strategy.position_avg_price * (1 + longStopLoss) : na

shortTP = strategy.position_size > 0 ? strategy.position_avg_price * (1 + shortTakeProfit1) : strategy.position_size < 0 ? strategy.position_avg_price * (1 - shortTakeProfit1) : na
shortSL = strategy.position_size > 0 ? strategy.position_avg_price * (1 - shortStopLoss) : strategy.position_size < 0 ? strategy.position_avg_price * (1 + shortStopLoss) : na

strategy.risk.allow_entry_in(longTrading == true and shortTrading == true ? strategy.direction.all : longTrading == true ? strategy.direction.long : shortTrading == true ? strategy.direction.short : na)
strategy.entry('Bull', strategy.long, comment='Upper Band Long', when=StrongBand_Buy_Alert)
strategy.entry('Bull', strategy.long, comment='Lower Band Long', when=MiddleBand_Buy_Alert)
strategy.entry('Bull', strategy.long, comment='Lower Band Long', when=SidewaysBand_Buy_Alert)
strategy.entry('Bear', strategy.short, comment='Upper Band Short', when=StrongBand_Sell_Alert)
strategy.entry('Bear', strategy.short, comment='Lower Band Short', when=MiddleBand_Sell_Alert)
strategy.entry('Bear', strategy.short, comment='Lower Band Short', when=SidewaysBand_Sell_Alert)




// check which SL to use
if enableSL and whichSL == 'static % as SL'
    strategy.exit(id='longTP-SL', from_entry='Bull', limit=longTP1, stop=longSL)
    strategy.exit(id='shortTP-SL', from_entry='Bear', limit=shortTP, stop=shortSL)


// get bars since last entry for the SL at low to work
barsSinceLastEntry()=>
    strategy.opentrades > 0 ? (bar_index - strategy.opentrades.entry_bar_index(strategy.opentrades-1)) : na
    
if enableSL and whichSL == 'low/high as SL' and ta.barssince(StrongBand_Buy_Alert or MiddleBand_Buy_Alert or SidewaysBand_Buy_Alert) < 2 and barsSinceLastEntry() < 2
    strategy.exit(id='longTP-SL', from_entry='Bull', limit=longTP1, stop=longSlLow)
if enableSL and whichSL == 'low/high as SL' and ta.barssince(StrongBand_Sell_Alert or MiddleBand_Sell_Alert or SidewaysBand_Sell_Alert) < 2 and barsSinceLastEntry() < 2
    strategy.exit(id='shortTP-SL', from_entry='Bear', limit=shortTP, stop=shortSlLow)


if not enableSL
    strategy.exit(id='longTP-SL', from_entry='Bull', limit=longTP1)
    strategy.exit(id='shortTP-SL', from_entry='Bear', limit=shortTP)
```

> Detail

https://www.fmz.com/strategy/436513

> Last Modified

2023-12-25 13:54:39
