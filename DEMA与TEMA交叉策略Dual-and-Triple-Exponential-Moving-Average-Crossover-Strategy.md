
> Name

DEMA与TEMA交叉策略Dual-and-Triple-Exponential-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c956109721342d9a4b.png)
[trans]

### 一、策略概述

本策略名称为“双指数移动平均线与三指数移动平均线交叉策略”(Dual Exponential Moving Average and Triple Exponential Moving Average Crossover Strategy)。该策略结合了双指数移动平均线(DEMA)和三指数移动平均线(TEMA)的交叉信号,通过DEMA和TEMA的金叉死叉来判断入场出场。

### 二、策略原理  

本策略主要基于双指数移动平均线(DEMA)和三指数移动平均线(TEMA)的交叉来产生交易信号。

双指数移动平均线(DEMA)的计算公式为:

DEMA = 2*EMA1 - EMA2

其中,EMA1和EMA2分别是长度周期为N的Exponential Moving Average。DEMA结合了EMA的平滑性和响应迅速性。  

三指数移动平均线(TEMA)的计算公式为:  

TEMA = 3*(EMA1 - EMA2) + EMA3

其中,EMA1、EMA2和EMA3分别是长度周期为N的Exponential Moving Average。TEMA通过三次指数平滑,能够过滤假突破。

当DEMA上穿TEMA时,产生买入信号;当DEMA下穿TEMA时,产生卖出信号。根据双曲线交叉的原理,可以抓住周期转换,进出场及时。

### 三、策略优势

1. DEMA和TEMA都是对EMA指数移动平均线进行优化的指标,能够提高交易精确度。  
2. DEMA平滑价格变化,TEMA过滤假突破,可以互相补充形成合力,提高策略胜率。 
3. 结合快速均线DEMA和慢速均线TEMA,交叉信号更加准确可靠。  
4. 通过双曲线交叉原理形成交易信号,可以及时判断周期转换,把握关键入场点。

### 四、策略风险及解决  

1. 市场价格剧烈波动时,均线交叉频繁,可能产生误信号,需要适当调整参数。  
2. DEMA和TEMA长度设置不当也会影响信号质量,需要参数优化。
3. 本策略仅基于技术指标形成交易信号,缺乏基本面验证,可能失败。可以结合其他指标或模型辅助。  

### 五、策略优化方向  

1. 对DEMA和TEMA的长度参数进行测试和优化,找到最佳参数组合。  
2. 增加其他技术指标过滤,如KDJ指标判定多空,提高效果。
3. 增加机器学习模型预测结果,验证交叉信号的有效性,减少误信号。
4. 结合交易量变化或市场情绪指标判断真假交叉。

### 六、总结  

本策略通过双指数移动平均线和三指数移动平均线的交叉形成交易信号,结合DEMA的响应速度和TEMA的滤波作用,可以提高交易精确度。但单一指标组合易受错觉影响,仍需要多种验证工具的辅助,才能形成系统的交易体系,从而取得长期稳定收益。

 ||

### I. Strategy Overview  

This strategy is named "Dual and Triple Exponential Moving Average Crossover Strategy". It combines the crossover signals of Dual Exponential Moving Average (DEMA) and Triple Exponential Moving Average (TEMA) to determine entries and exits.

### II. Strategy Logic  

This strategy mainly uses the crossover of Dual Exponential Moving Average (DEMA) and Triple Exponential Moving Average (TEMA) to generate trading signals.

The formula for DEMA is:  

DEMA = 2*EMA1 - EMA2

Where EMA1 and EMA2 are Exponential Moving Averages with period N. DEMA combines the smoothness of EMA and responsiveness.

The formula for TEMA is:

TEMA = 3*(EMA1 - EMA2) + EMA3  

Where EMA1, EMA2 and EMA3 are Exponential Moving Averages with period N. TEMA filters out fake breakouts by triple smoothing.  

When DEMA crosses above TEMA, a buy signal is generated. When DEMA crosses below TEMA, a sell signal is generated. According to the crossover principle, it can capture cycle conversion timely.  

### III. Advantages  

1. Both DEMA and TEMA optimize EMA, improving trading accuracy.
2. DEMA smooths price change, TEMA filters out fakeouts, forming synergy and improving win rate.  
3. Combining fast DEMA and slow TEMA, crossover signals are more reliable.  
4. Capturing cycle conversion timely based on crossover principle.  

### IV. Risks and Solutions

1. Frequent crossover under volatility causes false signals. Parameter tuning needed.  
2. Inappropriate parameter setting affects signal quality. Parameter optimization required.  
3. Lack of fundamental validation. Other indicators or models can assist.

### V. Optimization  

1. Test and optimize parameters of DEMA and TEMA to find best combination.
2. Add other technical indicators for filtering, e.g. KDJ for trend. 
3. Add machine learning prediction to validate signals and reduce false signals.  
4. Check trading volume or sentiment to judge true or fake crossover.   

### VI. Summary  

This strategy generates trading signals from DEMA and TEMA crossover, combining DEMA's responsiveness and TEMA's filtering capability to improve accuracy. But single indicator combo is prone to illusions. Multi-verification tools are still needed to form systematic trading system for long-term steady profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|DEMA Length|
|v_input_1_close|0|DEMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|8|TEMA Length|
|v_input_2_close|0|TEMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-03 00:00:00
end: 2024-01-02 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("DEMA-TEMA Cross Strategy", shorttitle="DEMA-TEMA Cross", overlay=true)

// Input options for Double EMA (DEMA)
dema_length = input.int(10, title="DEMA Length", minval=1)
dema_src = input(close, title="DEMA Source")

// Calculate Double EMA (DEMA)
dema_e1 = ta.ema(dema_src, dema_length)
dema_e2 = ta.ema(dema_e1, dema_length)
dema = 2 * dema_e1 - dema_e2

// Input options for Triple EMA (TEMA)
tema_length = input.int(8, title="TEMA Length", minval=1)
tema_src = input(close, title="TEMA Source")

// Calculate Triple EMA (TEMA)
tema_ema1 = ta.ema(tema_src, tema_length)
tema_ema2 = ta.ema(tema_ema1, tema_length)
tema_ema3 = ta.ema(tema_ema2, tema_length)
tema = 3 * (tema_ema1 - tema_ema2) + tema_ema3

// Crossover signals for long (small green arrow below candle)
crossover_long = ta.crossover(dema, tema)

// Crossunder signals for short (small red arrow above candle)
crossunder_short = ta.crossunder(dema, tema)

plotshape(crossunder_short ? 1 : na, title="Short Entry", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)
plotshape(crossover_long ? -1 : na, title="Long Entry", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)

plot(dema, "DEMA", color=color.green)
plot(tema, "TEMA", color=color.blue)

if (crossover_long)
    strategy.entry("Long", strategy.long)

if (crossunder_short)
    strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/437552

> Last Modified

2024-01-03 16:47:08
