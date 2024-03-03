
> Name

基于双向运动量指数策略Overlay-Trend-Signals-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15ddca237f70ec00059.png)
[trans]
### 概述

该策略通过计算双向运动量指数DI+、DI-以及平均方向指数ADX,结合指数移动平均线EMA产生交易信号。当DI+上穿DI-且ADX高于20时产生买入信号;当DI-下穿DI+且ADX高于25时产生卖出信号。交易止损信号为DI-上穿DI+且ADX高于30。

### 策略原理

1. 计算DI+、DI-、ADX
    - 调用ta.dmi()函数计算DI+、DI-、ADX
    - DI+/DI-反映价格的方向性
    - ADX反映价格变动的平均幅度  

2. 计算指数移动平均线EMA
    - 调用自定义my_ema()函数计算EMA
    - EMA能有效平滑价格数据

3. 交易信号生成
    - 买入信号:DI+上穿DI-且ADX>20且收盘价>EMA
        - 说明价格趋势向上且变动幅度较大
    - 卖出信号:DI-下穿DI+且ADX>25且收盘价<EMA  
        - 说明价格趋势向下且变动幅度较大

4. 交易止损
    - 买入止损:DI-上穿DI+且ADX>30
        - 说明价格趋势反转
    - 卖出止损:DI+下穿DI-且ADX>30
        - 说明价格趋势反转

综上,该策略综合运动量指标与趋势指标,在价格趋势性较强时产生交易信号。同时设置止损条件限制损失。

### 优势分析

1. 使用双DI避免虚假信号
    - 单一DI容易产生错误信号,结合DI+和DI-可确保趋势性
2. ADX条件确保价格变动幅度较大
    - 只在价格波动加剧时交易,避免震荡市
3. EMA条件配合DI 
    - EMA可有效识别价格中长线趋势
4. 严格止损条件
    - 及时止损,避免巨额损失

### 风险分析

1. 频繁止损
    - 若行情出现剧烈震荡,止损会过于频繁
2. 参数依赖
    - DI和ADX参数需要优化找到最佳组合
3. 交易频率低 
    - 较严格的交易条件会降低交易频率

可通过扩大止损幅度,调整参数组合,或加入附加过滤条件提高交易频率来优化。

### 优化方向  

1. 参数优化
    - 优化DI和ADX参数,找到最佳参数组合
2. 增加过滤器
    - 如加入成交量,背离等条件过滤信号
3. 扩大止损幅度
    - 适当放宽止损条件,减少频繁止损

### 总结  

该策略整合运动量指标与趋势分析指标,在价格趋势性较强时产生交易信号。设置严格的止损条件控制风险。可通过参数优化,增加信号过滤器以及适当扩大止损幅度来进一步提高策略效果。

||

### Overview  

This strategy generates trading signals by calculating the Directional Movement Indexes (DMI) DI+ and DI- along with Average Directional Index (ADX) and Exponential Moving Average (EMA). It triggers a long signal when DI+ crosses above DI- and ADX is above 20. A short signal is triggered when DI- crosses below DI+ and ADX is above 25. The stop loss signal is when DI- crosses above DI+ with ADX above 30.

### Strategy Logic  

1. Calculate DI+, DI-, ADX
    - Use ta.dmi() to compute DI+, DI-, ADX
    - DI+/DI- measures directional price movement 
    - ADX measures strength of price movement

2. Calculate Exponential Moving Average 
    - Use custom my_ema() function to compute EMA
    - EMA smoothes price data  

3. Generate trading signals
    - Long signal: DI+ crosses above DI- and ADX > 20 and close > EMA
        - Indicates upward trend and increased volatility  
    - Short signal: DI- crosses below DI+ and ADX > 25 and close < EMA
        - Indicates downward trend and high volatility

4. Set stop loss
    - Long stop loss: DI- crosses above DI+ and ADX > 30 
        - Indicates trend reversal  
    - Short stop loss: DI+ crosses below DI- and ADX > 30
        - Indicates trend reversal  

In summary, this strategy combines momentum and trend analysis indicators to trade when strong price trends emerge, with stop losses to limit losses.  

### Advantage Analysis   

1. Dual DI avoids false signals  
    - Single DI can give false signals, dual DI ensures trend  
2. ADX threshold requires increased volatility 
    - Only trades high volatility moves, avoids ranging  
3. EMA complements DI
    - EMA identifies mid/long term trends
4. Strict stop loss  
    - Cuts losses quickly  

### Risk Analysis  

1. Frequent stop loss
    - Volatile swings may trigger frequent stops
2. Parameter dependence
    - Optimal DI and ADX parameters need to be found
3. Low trade frequency
    - Strict rules reduce trades

Can optimize by expanding stop loss, tuning parameters, adding filters to increase frequency.  

### Optimization Opportunities

1. Parameter optimization 
    - Optimize DI and ADX parameters  
2. Add filters 
    - Volume, divergence etc.
3. Widen stop loss
    - Relax stops to reduce frequency  

### Conclusion   

This strategy combines momentum and trend analysis indicators to trade strong trends, with strict stops to control risk. Can further improve performance through parameter optimization, additional filters, and relaxed stops.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|DI Length|
|v_input_int_2|14|ADX Smoothing|
|v_input_int_3|26|EMA Length|
|v_input_source_1_close|0|EMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_1|true|Signal Labels|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Tamil_FNO_Trader

//@version=5
strategy("Overlay Signals by TFOT", overlay=true)

// Calculate DMI
len = input.int(14, minval=1, title="DI Length")
lensig = input.int(14, title="ADX Smoothing", minval=1, maxval=50)
[diplus, diminus, adx] = ta.dmi(len, lensig)

// Get EMA
emalen = input.int(26, minval=1, title = "EMA Length")
emasrc = input.source(close, title = "EMA Source")

my_ema(src, length) =>
    alpha = 2 / (length + 1)
    sum = 0.0
    sum := na(sum[1]) ? src : alpha * src + (1 - alpha) * nz(sum[1])
EMA2 = my_ema(emasrc, emalen)

// Variables
var bool buycondition1 = false
var bool sellcondition1 = false

var int firstbuybar = na
var int firstsellbar = na

var int buyexitbar = na
var int sellexitbar = na

var bool buyexit1 = false
var bool sellexit1 = false

// Buy & Sell Conditions
buycondition1 := (ta.crossover(diplus, diminus)) and (adx > 20) and (close > EMA2) and na(firstbuybar)
sellcondition1 := (ta.crossover(diminus, diplus)) and (adx > 25) and (close < EMA2) and na(firstsellbar)

buyexit1 := ta.crossover(diminus, diplus) and (adx > 30) and na(buyexitbar)
sellexit1 := ta.crossover(diplus, diminus) and (adx > 30) and na(sellexitbar)

if buycondition1
    if(na(firstbuybar))
        firstbuybar := bar_index
        buyexitbar := na
        firstsellbar := na
        strategy.entry("Buy", strategy.long)

if sellcondition1
    if(na(firstsellbar))
        firstsellbar := bar_index
        sellexitbar := na
        firstbuybar := na
        strategy.entry("Sell", strategy.short)

if buyexit1 and not na(firstbuybar)
    if(na(buyexitbar))
        buyexitbar := bar_index
        firstbuybar := na
        firstsellbar := na
        strategy.close("Buy")

if sellexit1 and not na(firstsellbar)
    if(na(sellexitbar))
        sellexitbar := bar_index
        firstsellbar := na
        firstbuybar := na
        strategy.close("Sell")

// Plot signals on chart
hl = input.bool(defval = true, title = "Signal Labels")

plotshape(hl and buycondition1 and bar_index == firstbuybar ? true : na, "Buy", style = shape.labelup, location = location.belowbar, color = color.green, text = "Buy", textcolor = color.white, size = size.tiny)
plotshape(hl and sellcondition1 and bar_index == firstsellbar ? true : na, "Sell", style = shape.labeldown, location = location.abovebar, color = color.red, text = "Sell", textcolor = color.white, size = size.tiny)

plotshape(hl and buyexit1 and bar_index == buyexitbar ? true : na, "Buy Exit", style = shape.labelup, location = location.belowbar, color = color.red, text = "Buy X", textcolor = color.white, size = size.tiny)
plotshape(hl and sellexit1 and bar_index == sellexitbar ? true : na, "Sell Exit", style = shape.labeldown, location = location.abovebar, color = color.red, text = "Sell X", textcolor = color.white, size = size.tiny)


```

> Detail

https://www.fmz.com/strategy/441958

> Last Modified

2024-02-18 10:00:22
