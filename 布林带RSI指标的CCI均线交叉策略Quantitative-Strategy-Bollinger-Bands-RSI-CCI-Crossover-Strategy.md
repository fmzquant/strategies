
> Name

布林带RSI指标的CCI均线交叉策略Quantitative-Strategy-Bollinger-Bands-RSI-CCI-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d41a7c254d92e67892.png)

[trans]

## 概述

本策略结合使用布林带、相对强弱指数(RSI)和商品路径指数(CCI)三个指标,寻找其交叉信号,发出买入和卖出信号。该策略旨在发现市场的超买超卖现象,在反转点入场,以期获得较好的投资回报。

## 策略原理  

### 布林带
布林带由中轨、上轨和下轨组成。中轨通常采用20日移动平均线。上轨和下轨分别是中轨之上和之下两个标准差的位置。如果价格接近下轨时,被视为超卖信号。如果价格接近上轨时,被视为超买信号。

### RSI指标
RSI指标反映了一段时间内收盘价格上涨和下跌的速度变化,用来测量买盘和卖盘的力量对比。RSI值在0至30时为超卖区,在70至100时为超买区。当RSI从超买区下降时可以作为卖出信号,当RSI从超卖区上涨时可以作为买入信号。 

### CCI指标
CCI指标用来衡量股票价格偏离其平均价格的程度。其中,+100代表价格远高于平均价,为超买;-100代表价格远低于平均价,为超卖。CCI能反映价格的极端情况。

### 策略交叉信号
本策略以布林带判断价格短期内是否超买超卖,以RSI指标判断买卖盘力量均衡情况,以CCI指标判断价格偏离程度。布林带、RSI和CCI指标同时给出买入/卖出信号时,发出交易指令。

## 策略优势

1. 结合多种指标判断,减少假信号,提高信号准确度
2. 发现市场转折点,捕捉反转趋势 的机会
3. 各参数可自定义调整,适应不同市场环境
4. 采用均线过滤CCI指标,减少噪声,提高稳定性

## 风险及解决方案

1. 布林带、RSI和CCI指标都可能产生错误信号,造成交易亏损。可适当宽松参数,或增加其他指标进行验证。  
2. CCI指标对于曲折行情不太适用,可采用均线或波动率指标替代。 
3. 交易指令只有止损,没有止盈。可增加移动止盈来锁定部分利润。

## 优化方向  

1. 测试更多参数组合,找到最佳参数;
2. 增加机器学习算法,实时优化参数;  
3. 增加止盈策略,设定目标利润;
4. 结合更多指标,如MACD、KD等判断信号可靠性。

## 总结

本策略综合考虑了短期、中期和长期市场状况,通过布林带、RSI和CCI三个指标的交叉信号,判断市场反转的时机,属于较为稳健的反转跟踪策略。可通过参数调整、止盈方式等进一步优化,适用于多种市场环境。

||


## Overview  

This strategy combines Bollinger Bands, Relative Strength Index (RSI) and Commodity Channel Index (CCI) to find crossover signals and generate buy and sell signals. The strategy aims to identify overbought and oversold scenarios in the market and take positions at inflection points for better investment returns.  

## Strategy Logic

### Bollinger Bands  
Bollinger Bands consist of a middle band, an upper band and a lower band. The middle band is usually a 20-day moving average. The upper band is two standard deviations above the middle band. The lower band is two standard deviations below. Prices near the lower band may indicate an oversold condition. Prices near the upper band may indicate an overbought condition.   

### RSI  
The RSI measures the velocity of directional price movements up and down. It shows overbought above 70 and oversold below 30. When RSI falls from above 70, it can be a sell signal. When RSI bounces up from below 30, it can be a buy signal.  

### CCI  
The CCI measures how far prices have moved from the average price. Readings above +100 imply an overbought condition. Readings below -100 imply an oversold condition. CCI reflects extreme price levels. 

### Crossover Signals  
This strategy uses Bollinger Bands to judge short-term overbought/oversold levels, RSI to gauge bullish/bearish momentum and CCI to identify price extremes. When all three indicators flash buy/sell signals, the strategy will issue trade orders.  

## Advantages  

1. Combining multiple indicators improves signal accuracy and reduces false signals  
2. Captures reversal opportunities at turning points  
3. Customizable parameters adapt to different market conditions  
4. Smoothed CCI filter reduces noise and improves stability  

## Risks and Solutions   

1. All three indicators may produce bad signals resulting in losses. Parameters can be loosened or add other filters.   
2. CCI struggles with choppy markets. Can substitute with moving averages or volatility indicators.   
3. Only stop loss in place without profit taking. Can add trailing stops to lock in some profits.  

## Optimization Opportunities

1. Test more parameter combinations to find optimum setup  
2. Introduce machine learning to auto adjust parameters  
3. Add profit taking strategies with profit targets   
4. Incorporate more indicators like MACD, KD to validate signals

## Conclusion  

This strategy analyzes overall market conditions using Bollinger Bands, RSI and CCI indicators. It identifies inflection points through crossover signals to trade market reversals. With further optimizations like parameter tuning, profit taking mechanisms etc., it can be a robust countertrend strategy for various market environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length|
|v_input_string_1|0|Basis MA Type: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|StdDev|
|v_input_int_2|false|Offset|
|v_input_int_3|14|(?RSI Settings)RSI Length|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_1|false|Show Divergence|
|v_input_string_2|0|(?MA Settings)MA Type: SMA|Bollinger Bands|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_int_4|14|MA Length|
|v_input_float_2|2|BB StdDev|
|v_input_string_3|0|(?Smoothing)Method: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_int_5|5|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(shorttitle="BBRSIstr", title="Bollinger Bands", overlay=true)
length = input.int(20, minval=1)
maType = input.string("SMA", "Basis MA Type", options = ["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
src = input(close, title="Source")
mult = input.float(2.0, minval=0.001, maxval=50, title="StdDev")

ma(source, length, _type) =>
    switch _type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

basis = ma(src, length, maType)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev
offset = input.int(0, "Offset", minval = -500, maxval = 500)
plot(basis, "Basis", color=#FF6D00, offset = offset)
p1 = plot(upper, "Upper", color=#2962FF, offset = offset)
p2 = plot(lower, "Lower", color=#2962FF, offset = offset)
fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))

//RSI
rsiLengthInput = input.int(14, minval=1, title="RSI Length", group="RSI Settings")
rsiSourceInput = input.source(close, "Source", group="RSI Settings")
maTypeInput = input.string("SMA", title="MA Type", options=["SMA", "Bollinger Bands", "EMA", "SMMA (RMA)", "WMA", "VWMA"], group="MA Settings")
maLengthInput = input.int(14, title="MA Length", group="MA Settings")
bbMultInput = input.float(2.0, minval=0.001, maxval=50, title="BB StdDev", group="MA Settings")
showDivergence = input.bool(false, title="Show Divergence", group="RSI Settings")

up = ta.rma(math.max(ta.change(rsiSourceInput), 0), rsiLengthInput)
down = ta.rma(-math.min(ta.change(rsiSourceInput), 0), rsiLengthInput)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
rsiMA = ma(rsi, maLengthInput, maTypeInput)
isBB = maTypeInput == "Bollinger Bands"

rsiPlot = plot(rsi, "RSI", color=#7E57C2)
plot(rsiMA, "RSI-based MA", color=color.yellow)
rsiUpperBand = hline(70, "RSI Upper Band", color=#787B86)
midline = hline(50, "RSI Middle Band", color=color.new(#787B86, 50))
rsiLowerBand = hline(30, "RSI Lower Band", color=#787B86)
fill(rsiUpperBand, rsiLowerBand, color=color.rgb(126, 87, 194, 90), title="RSI Background Fill")

//cci
ma = ta.sma(src, length)
cci = (src - ma) / (0.015 * ta.dev(src, length))
plot(cci, "CCI", color=#2962FF)
band1 = hline(100, "Upper Band", color=#787B86, linestyle=hline.style_dashed)
hline(0, "Middle Band", color=color.new(#787B86, 50))
band0 = hline(-100, "Lower Band", color=#787B86, linestyle=hline.style_dashed)
fill(band1, band0, color=color.rgb(33, 150, 243, 90), title="Background")

typeMA = input.string(title = "Method", defval = "SMA", options=["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"], group="Smoothing")
smoothingLength = input.int(title = "Length", defval = 5, minval = 1, maxval = 100, group="Smoothing")

smoothingLine = ma(cci, smoothingLength, typeMA)
plot(smoothingLine, title="Smoothing Line", color=#f37f20, display=display.none)


longCBB= close < lower
shortCBB = close>upper
longBRSI = rsi < 33
shortBRSI = rsi > 70
longcci = cci < -215
shortcci = cci > 250

strategy.entry("LONG", strategy.long, when = longCBB and longBRSI and longcci)
strategy.exit("Exit ", profit = 600)
strategy.entry("SHORT", strategy.short, when = shortCBB and shortBRSI and shortcci)
strategy.exit("Exit ", profit = 600)
```

> Detail

https://www.fmz.com/strategy/435992

> Last Modified

2023-12-20 16:24:49
