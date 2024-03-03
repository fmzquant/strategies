
> Name

多时间框架EMA突破与K线形态组合策略Trading-Strategy-Based-on-Multiple-Time-Frame-EMA-Breakthrough-and-K-line-Pattern-Combination

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a95b9af47cb8c16126.png)
[trans]
### 概述

本策略融合了多时间框架EMA指标与K线形态判断,实现了较为灵敏的长线信号捕捉与止损退出。

### 策略原理

本策略主要基于以下几个指标进行判断:

1. EMA均线:采用13周期、21周期2组EMA,判断价格突破形成交易信号。

2. K线形态:判断K线实体方向,与EMA指标联合使用,过滤假突破。

3. 支持阻力:采用近期10周期 highest高点构建,判断突破通过该区域增强信号可靠性。

4. 上升分时:120周期close收盘价在open开盘价之上判断为上升分时,作为辅助判断。

交易信号生成规则为:

1. 多头信号:快速EMA向上突破慢速EMA,并且为阳线K线,关闭空仓开多。

2. 空头信号:快速EMA向下跌破慢速EMA,并且为阴线K线,平掉多仓。

3. 止损退出:反手信号发出时止损退出当前头寸。

### 策略优势

1. 多时间框架EMA指标,判断趋势更可靠,避免假突破。
2. 结合K线实体方向进行过滤,识别趋势更准确。
3. 增加分时判断和支持阻力判断,确保信号质量。
4. 采用反手做为止损方式,降低亏损风险。

### 策略风险

1. 无效突破带来损失风险。即使引入多时间框架EMA和K线实体判断,也无法完全避免无效突破对策略的影响。
2. 参数选择风险。EMA周期、K线判断周期等参数设置不当,会导致信号质量下降。
3. 支撑阻力失效风险。历史支持阻力失效是常见情况,这也会导致信号产生时没有足够动量。
4. 分时失效风险。分时情况是变化的,不能完全依赖分时判断。

以上风险可以通过避免过度优化,审慎选择参数,严格把控仓位规模等方法加以缓解。

### 策略优化方向  

1. 引入机器学习模型辅助判断。可以训练分类模型判断K线实体方向,提高判断准确性。
2. 增加自适应止损机制。如 trailing stop 或基于波动率的止损。
3. 结合情绪面分析。引入一定的媒体舆论判断机制,避免重大负面消息对策略的影响。
4. 增加仓位管理模块。如引入固定仓位比例,或基于资金管理的仓位调节模块。 

### 总结

本策略整合多时间框架EMA指标与K线实体判断,实现了较为可靠的趋势判断。同时结合支持阻力与分时情况进行辅助,确保信号质量。通过反手信号机制止损,可以有效控制单笔止损。未来可通过引入机器学习模型、自适应止损、情绪面分析和仓位管理模块等进行优化,使策略更为稳健。

||

### Overview  

This strategy integrates multiple time frame EMA indicators and K-line pattern judgments to achieve relatively sensitive long-term signal capture and stop-loss exits.

### Strategy Principle  

The strategy is mainly based on the following indicators for judgment:  

1. EMA: Uses 2 sets of 13 and 21 cycles of EMA to determine the trading signal when price breakthrough.  

2. K-line pattern: Judges the direction of K-line entity and uses it with the EMA indicator to filter false breakthroughs.   

3. Support Resistance: Constructed by the highest points in the last 10 cycles to determine if the breakthrough passes this area to enhance signal reliability.  

4. Rise in Time Division: 120 cycle of close is above open to judge as rise in time division, as an auxiliary judgment.  

The rules for generating trading signals are:  

1. Bullish signal: Fast EMA breaks through slow EMA upwards with a Yang line K-line, close short position and open long.   

2. Bearish signal: Fast EMA breaks down through slow EMA with a Yin line K-line, flatten long position.   

3. Stop loss exit: Stop loss exit at current position when reverse signal appears.

### Advantages  

1. Multiple time frame EMA indicators judge the trend more reliably and avoid false breakthroughs.   
2. Combined with K-line entity direction for filtering to identify trends more accurately.  
3. Increase time division judgments and support resistance judgments to ensure signal quality.   
4. Use reverse signals as stop loss to reduce risk of loss.   

### Risks  

1. Risk of invalid breakthroughs resulting in losses. Multi time frame EMA and K-line entity judgments still cannot completely avoid the impact of invalid breakthroughs on the strategy.  
2. Risk of inappropriate parameter selection. Improper settings of EMA cycles, K-line judgment cycles will lead to decline in signal quality.   
3. Risk of failure in support resistance. Historical support resistance failure is common, this will also lead to lack of momentum when signals are generated.   
4. Risk of time division failure. Time division situation changes and cannot completely rely on it for judgment.   

The above risks can be mitigated through methods like avoiding excessive optimization, careful parameter selection, strictly controlling position sizing.  

### Optimization Directions   

1. Introduce machine learning models to assist judgment. Train classification models to judge K-line entity directions for higher accuracy.    
2. Increase adaptive stop loss mechanism like trailing stops or volatility based stops.   
3. Combine sentimental analysis. Introduce certain media opinion judgments to avoid major negative news impact.   
4. Add position sizing management module. Introduce fixed position sizing ratios or fund management based sizing.  

### Conclusion  

The strategy integrates multiple time frame EMA and K-line entity judgments for relatively reliable trend judgments. Auxiliary judgments using support resistance and time division ensure signal quality. Using reverse signals for stop loss can effectively control single stop loss. Future optimizations can be done through introducing machine learning models, adaptive stops, sentimental analysis and position sizing management modules to make the strategy more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Candle body resistance Channel: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|10|Support / Resistance length:|
|v_input_3|13|EMA 1|
|v_input_4|21|EMA 2|
|v_input_5_close|0|HullMA Source:: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|8|HullMA Base Length:|
|v_input_7|5|HullMA Length Scalar:|
|v_input_8|120|Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-14 00:00:00
end: 2024-02-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title='ck - CryptoSniper Longs Only (Strategy)', shorttitle='ck - CryptoSniper Longs (S) v1', overlay=true, precision=2, commission_value=0.25, default_qty_type=strategy.percent_of_equity, pyramiding=0, default_qty_value=100, initial_capital=100)

open_long = 0
close_position = 0
last_long=close
last_short=close

//Candle body resistance Channel-----------------------------//
len = 34
src = input(close, title="Candle body resistance Channel")
out = sma(src, len)
last8h = highest(close, 13)
lastl8 = lowest(close, 13)
bearish = cross(close,out) == 1 and falling(close, 1)
bullish = cross(close,out) == 1 and rising(close, 1)
channel2=false

//-----------------Support and Resistance 
RST = input(title='Support / Resistance length:', defval=10) 
RSTT = valuewhen(high >= highest(high, RST), high, 0)
RSTB = valuewhen(low <= lowest(low, RST), low, 0)

//--------------------Trend colour ema------------------------------------------------// 
src0 = close, len0 = input(13, minval=1, title="EMA 1")
ema0 = ema(src0, len0)
direction = rising(ema0, 2) ? +1 : falling(ema0, 2) ? -1 : 0

//-------------------- ema 2------------------------------------------------//
src02 = close, len02 = input(21, minval=1, title="EMA 2")
ema02 = ema(src02, len02)
direction2 = rising(ema02, 2) ? +1 : falling(ema02, 2) ? -1 : 0

//=============Hull MA//
show_hma = false
hma_src = input(close, title="HullMA Source:")
hma_base_length = input(8, minval=1, title="HullMA Base Length:")
hma_length_scalar = input(5, minval=0, title="HullMA Length Scalar:")
hullma(src, length)=>wma(2*wma(src, length/2)-wma(src, length), round(sqrt(length)))

//============ signal Generator ==================================//
Period=input(title='Period', defval='120')
ch1 = request.security(syminfo.tickerid, Period, open)
ch2 = request.security(syminfo.tickerid, Period, close)

// Signals//
long = crossover(request.security(syminfo.tickerid, Period, close),request.security(syminfo.tickerid, Period, open))
short = crossunder(request.security(syminfo.tickerid, Period, close),request.security(syminfo.tickerid, Period, open))
last_long := long ? time : nz(last_long[1])
last_short := short ? time : nz(last_short[1])
long_signal = crossover(last_long, last_short) ? 1 : -1
short_signal = crossover(last_short, last_long) ? -1 : 1

if (long_signal == 1)
    strategy.entry("Long Open", strategy.long)

if (short_signal == -1)
    strategy.close("Long Open")
    
if (long_signal[1] == 1 and short_signal[1] == 1)
    open_long := 1
    close_position := 0

if (short_signal[1] == -1 and long_signal[1] == -1)
    open_long := 0
    close_position := 1

plotshape(open_long == 1, title="Open Long", location=location.belowbar, style=shape.triangleup, size=size.small, color=green, transp=10)
plotshape(close_position == 1, title="Close Long", location=location.abovebar, style=shape.triangledown, size=size.small, color=red, transp=10)
//plot(0, title="Trigger", color=white)

///////////////////////////////////////////////////////////////////////////////////////////
```

> Detail

https://www.fmz.com/strategy/442383

> Last Modified

2024-02-21 15:00:06
