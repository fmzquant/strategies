
> Name

基于RSI金叉超级做空策略RSI-Golden-Cross-Short-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/207fa87c14544977ee5.png)
[trans]
### 一、策略概述

RSI金叉超级做空策略运用ATR波带、双RSI指标以及EMA均线的金叉死叉来实现趋势判断和entries。ATR波带用来判断价格是否处于超买超卖状态,双RSI指标用来确认价格趋势,EMA均线金叉用来寻找entries机会。本策略设计简单,容易实现,是一个高效灵活的做空策略。

### 二、策略原理  

该策略使用ATR波带、双RSI指标和EMA均线三个部件共同实现entries信号。当价格打开高于上ATR波带时我们判断为超买,此时如果快周期RSI低于慢周期RSI表明趋势由牛转熊,而且如果EMA均线发生死叉表明趋势进一步转弱,综合这三个信号我们可以确定一个较强有力的做空机会。

具体来说,价格打开时判断是否高于上ATR波带即`open>upper_band`,如果满足则可能处于超买区域。然后我们判断快速RSI是否低于慢速RSI即`rsi1<rsi2`,如果成立则表示趋势转弱由牛转熊。最后我们检测EMA均线是否发生死叉即`ta.crossover(longSMA, shortSMA)`成立,如果三个条件都满足,我们就发出做空信号进行入场。

相反,如果价格打开时低于下ATR波带,快速RSI高于慢速RSI并且发生EMA金叉,则产生做多入场信号。

该策略主要创新点是引入双RSI指标进行趋势判断,相比单一RSI可靠性更高,同时结合ATR波带和EMA均线进行信号过滤,使信号更加准确可靠,这是该策略的核心亮点。

### 三、策略优势  

该策略具有以下优势:

1. 使用双RSI指标判断趋势更准确可靠
2. ATR波带判断超买超卖区域,避免假突破
3. EMA均线发生明确金叉/死叉时入场,增加信号准确度  
4. 多种指标组合进行互相验证,可靠性较高
5. 策略设计简单易实现
6. 可同时获利超买超卖两边状况
7. 可调参数较多,可根据不同市场调整

### 四、策略风险

该策略也存在一些风险需要注意:  

1. EMA均线容易产生错诊,可能 smoothed MA 更稳定
2. 震荡行情中容易被套住止损
3. 参数设置不当可能增加错误信号
4. 突破ATR波带时机言之尚早,可能是假突破

以上风险主要可从以下几个方面进行优化处理:
1. 测试使用 smoothed MA 代替 EMA 均线
2. 适当宽松止损幅度,避免震荡市被频繁止损
3. 调整参数组合找到最佳平衡
4. 在突破波带时引入更多指标进行二次验证

### 五、策略优化方向  

该策略可从以下方面进行进一步优化:  

1. 测试使用 Smoothed MA 代替 EMA 均线,看是否可以减少错诊信号
2. 增加波动率指标如 Keltner 通道进行二次验证,避免假突破
3. 增加更多趋势指标如 ADX 进行大趋势判断 
4. 根据具体品种特点调整参数设置找到最佳组合
5. 测试不同时间周期参数下的表现
6. 增加机器学习算法自动优化参数  

这些优化措施可以进一步提高策略的稳定性、灵活性与盈利能力。

### 六、总结  

RSI金叉超级做空策略整体来说是一个非常高效实用的短线做空策略。它同时利用三种指标的优势进行集成实现 entries 信号,通过参数调整可以适应不同品种和市场环境。本策略核心创新在于运用双RSI指标判断趋势转势,与ATR波带和EMA均线互相验证形成高准确度entries时机。整体来说,该策略实用性非常强,值得投资者积极运用,但也需要关注可能存在的一些风险因素。通过不断测试与优化,相信该策略可以成为投资者盈利工具中的一大利器。

||

### I. Strategy Overview  

The RSI Golden Cross Short strategy utilizes ATR bands, double RSI indicators and golden cross of EMAs to identify trends and entries. The ATR bands determine overbought/oversold levels, double RSI indicators confirm the trend, and EMA crossovers identify opportunity for entries. This simple yet flexible short strategy can be highly effective for profit.

### II. Strategy Logic   

This strategy combines ATR bands, double RSI indicators and EMA lines to generate entry signals. When price opens above the upper ATR band indicating overbought levels, and the faster RSI crosses below slower RSI showing trend reversal from bullish to bearish, together with a death cross occuring in EMAs suggesting weakening trend, we have a strong signal for short entry.  

Specifically, when the opening price is above the upper ATR band i.e. `open > upper_band`, the asset may be overbought. Then we check if the fast RSI is less than slow RSI i.e. `rsi1 < rsi2`, suggesting the trend is turning from bullish to bearish. Finally we detect if a death cross happens in EMAs i.e. `ta.crossover(longSMA, shortSMA)` occurs. If all three conditions are met, a short entry signal is triggered.  

Conversely, if price opens below lower ATR band, fast RSI crosses above slow RSI, and a golden cross forms in EMAs, a long entry signal is generated.

The key innovation of this strategy is the introduction of double RSI indicators for better trend identification. Compared to a single RSI, the reliability is higher. Together with the ATR bands and EMA filters, the entry signals become more accurate and reliable. This is the core strength of the strategy.  

### III. Advantages  

The advantages of this strategy include:

1. More accurate trend identification using double RSI indicators  
2. ATR bands avoid false breakout by determining overbought/oversold levels
3. High signal accuracy by entering on golden/death cross of EMA lines   
4. Increased reliability from combining multiple indicators  
5. Simple logic easy to implement  
6. Profit from both long and short sides  
7. Flexibility to adjust parameters for different markets

### IV. Risks  

Some risks to note:   

1. EMA lines susceptible to whipsaws, smoothed MA may be more stable  
2. Can be stopped out frequently during ranging markets
3. Inadequate parameter setting may increase false signals  
4. Premature ATR band breakout may turn out to be false

The risks can be addressed by:
1. Test using Smoothed MA instead of EMA
2. Relax stop loss to avoid being stopped out prematurely  
3. Find optimal parameter balance through rigorous backtesting
4. Add more indicators to confirm ATR band breakouts  

### V. Enhancement Opportunities   

The strategy can be further improved by:   

1. Test Smoothed MA against EMA to reduce false signals 
2. Add volatility measure like Keltner Channels to avoid false breakouts
3. Incorporate trend filters like ADX for overall market direction
4. Adjust parameters based on asset characteristics  
5. Test performance across different timeframes  
6. Utilize machine learning to auto optimize parameters   

These opportunities can make the strategy more stable, flexible and profitable.  

### VI. Conclusion   

Overall, the RSI Golden Cross Short strategy is a highly effective short-term short strategy. It combines multiple indicators to generate entry signals, and is adjustable across assets and markets. Its novelty lies in using double RSI for trend identification, validated by ATR bands and EMA crossovers. This produces high-accuracy entry signals. The strategy has immense practical utility for investors, if risks are monitored and parameters optimized continually through testing. It has the potential to become a powerful profit engine in the trader's arsenal.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|ATR Period|
|v_input_float_1|true|ATR Multi|
|v_input_string_1|0|ATR Smoothing: WMA|SMA|EMA|RMA|
|v_input_int_2|5|Fast EMA|
|v_input_int_3|21|Slow EMA|
|v_input_int_4|40|Fast RSI Length|
|v_input_int_5|60|Slow RSI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//Revision: Updated script to pine script version 5
//added Double RSI for Long/Short prosition trend confirmation instead of single RSI
strategy("Super Scalper - 5 Min 15 Min", overlay=true)
source = close
atrlen = input.int(14, "ATR Period")
mult = input.float(1, "ATR Multi", step=0.1)
smoothing = input.string(title="ATR Smoothing", defval="WMA", options=["RMA", "SMA", "EMA", "WMA"])

ma_function(source, atrlen) =>
    if smoothing == "RMA"
        ta.rma(source, atrlen)
    else
        if smoothing == "SMA"
            ta.sma(source, atrlen)
        else
            if smoothing == "EMA"
                ta.ema(source, atrlen)
            else
                ta.wma(source, atrlen)

atr_slen = ma_function(ta.tr(true), atrlen)
upper_band = atr_slen * mult + close
lower_band = close - atr_slen * mult

// Create Indicator's
ShortEMAlen = input.int(5, "Fast EMA")
LongEMAlen = input.int(21, "Slow EMA")
shortSMA = ta.ema(close, ShortEMAlen)
longSMA = ta.ema(close, LongEMAlen)
RSILen1 = input.int(40, "Fast RSI Length")
RSILen2 = input.int(60, "Slow RSI Length")
rsi1 = ta.rsi(close, RSILen1)
rsi2 = ta.rsi(close, RSILen2)
atr = ta.atr(atrlen)

//RSI Cross condition
RSILong = rsi1 > rsi2
RSIShort = rsi1 < rsi2

// Specify conditions
longCondition = open < lower_band
shortCondition = open > upper_band
GoldenLong = ta.crossover(shortSMA, longSMA)
Goldenshort = ta.crossover(longSMA, shortSMA)

plotshape(shortCondition, title="Sell Label", text="S", location=location.abovebar, style=shape.labeldown, size=size.tiny, color=color.new(color.red, 0), textcolor=color.white)
plotshape(longCondition, title="Buy Label", text="B", location=location.belowbar, style=shape.labelup, size=size.tiny, color=color.new(color.green, 0), textcolor=color.white)
plotshape(Goldenshort, title="Golden Sell Label", text="Golden Crossover Short", location=location.abovebar, style=shape.labeldown, size=size.tiny, color=color.new(color.blue, 0), textcolor=color.white)
plotshape(GoldenLong, title="Golden Buy Label", text="Golden Crossover Long", location=location.belowbar, style=shape.labelup, size=size.tiny, color=color.new(color.yellow, 0), textcolor=color.white)

// Execute trade if condition is True
if (longCondition)
    stopLoss = low - atr * 1
    takeProfit = high + atr * 4
    if (RSILong)
        strategy.entry("long", strategy.long)

if (shortCondition)
    stopLoss = high + atr * 1
    takeProfit = low - atr * 4
    if (RSIShort)
        strategy.entry("short", strategy.short)

// Plot ATR bands to chart

////ATR Up/Low Bands
plot(upper_band)
plot(lower_band)

// Plot Moving Averages
plot(shortSMA, color=color.red)
plot(longSMA, color=color.yellow)

```

> Detail

https://www.fmz.com/strategy/442547

> Last Modified

2024-02-22 17:05:17
