
> Name

基于Voss滤波器和趋势指标的量化交易策略Quantitative-Trading-Strategy-Based-on-Voss-Filter-and-Trend-Indicator

> Author

ChaoZhang

> Strategy Description

[trans]
## 概述

该策略综合利用Voss预测滤波器和Ehlers瞬时趋势线指标,以识别市场周期性转折点,实现量化交易。Voss滤波器可提前发出买入/卖出信号,而瞬时趋势线指标则用于判断整体趋势方向,减少Voss滤波器在趋势市场中的误导。该策略可用于比特币等周期性比较明显的品种,在回测中表现较好。

## 策略原理

### Voss预测滤波器

Voss预测滤波器来自约翰·F·埃勒斯的文章《A Peek Into The Future》。该滤波器的计算公式如下:

```pine
_filt = 0.5 * _s3 * _x1 + _f1 * _s2 * _filt[1] - _s1 * _filt[2]
_voss = _x2 * _filt - _sumC
```

其中,_x1为价格的一阶差分;_x2为平滑因子;_s1、_s2、_s3为滤波参数;_f1为周期参数;_filt为滤波结果;_voss为最终输出。

该滤波器可看作是一种平滑滤波,它强调当前和过去几个周期的信息,从而提前发出买入/卖出信号。由于内在的组 delays,它就像“看进了未来”一样,可在其他指标之前发出预测性信号。

### 瞬时趋势线指标

瞬时趋势线指标由以下公式计算:

```pine 
_it = (_a-((_a*_a)/4.0))*_src+0.5*_a*_a*_src[1]-(_a-0.75*_a*_a)*_src[2]+2*(1-_a)*nz(_it[1])+-(1-_a)*(1-_a)*nz(_it[2])
```

该指标实时绘制一条与价格最符合的趋势线,可准确判断趋势方向和强弱。

### 策略逻辑

当Voss由负转正,并上穿滤波结果时产生买入信号。

当Voss由正转负,并下穿滤波结果时产生卖出信号。 

同时,只有当瞬时趋势线指标确认趋势方向时,才会发出交易信号。这能过滤掉Voss滤波器在趋势市场中可能发出的错误信号。

## 策略优势

- Voss滤波器可提前发出预测性信号,捕捉周期性反转点
- 瞬时趋势线指标可准确判断趋势方向,避免因滤波器提前发出的错误信号
- 可配置参数进行优化,适用于不同周期和市场环境
- 可添加止损策略控制风险

## 策略风险及解决方法

- 该策略依赖滤波器提前发出信号,可能跳过部分趋势行情 
- 在强势趋势下,可能产生反作用交易信号,带来损失

可通过以下方法降低风险:

- 优化周期参数,匹配不同品种周期性
- 调整带宽参数,降低滤波强度,减少误导信号
- 增加趋势过滤,避免强势趋势下的错误信号
- 设置止损策略,控制单笔损失

## 策略优化方向

该策略可从以下方面进行优化:

- 尝试不同的价格源,如收盘价、均线等,获得更好的输入
- 调整滤波器周期参数,匹配具体品种的周期性
- 优化趋势指标参数,获取更准确的趋势判断 
- 尝试不同的趋势指标,寻找更合适的组合
- 添加止损、 trailing stop 策略,更好控制风险
- 进行参数优化,寻找最佳参数组合

## 总结

该策略综合Voss滤波器和趋势指标,可有效识别市场的周期性反转点。通过优化参数,控制风险,该策略可实现稳定的量化交易系统。它可广泛应用于具有明显周期性的品种,在回测中已展现出良好的交易效果。总体而言,该策略具有独特的预测能力,且可通过多方面优化,具有广阔的应用前景。

||

## Overview

This strategy combines the Voss Predictive Filter and Ehlers Instantaneous Trendline indicator to identify cyclical turning points in the market for quantitative trading. The Voss filter provides early buy/sell signals, while the trendline indicator determines the overall trend direction to avoid misleads from the Voss filter in trending markets. This strategy works well on instruments like Bitcoin that exhibit cyclical patterns, as evidenced by good backtest results.

## Strategy Logic

### Voss Predictive Filter 

The Voss filter comes from John F. Ehlers' article "A Peek Into The Future". Its calculation is as follows:

```pine
_filt = 0.5 * _s3 * _x1 + _f1 * _s2 * _filt[1] - _s1 * _filt[2] 
_voss = _x2 * _filt - _sumC
```

Where _x1 is the 1st order price difference; _x2 is a smoothing factor; _s1, _s2, _s3 are filter parameters; _f1 is the cycle parameter; _filt is the filter output; _voss is the final output.

The filter can be seen as a smoothed filter that emphasizes current and past cycle information to generate early signals. Due to inherent group delays, it "looks into the future" to produce predictive signals ahead of other indicators.

### Instantaneous Trendline Indicator

The trendline indicator is calculated as:

```pine
_it = (_a-((_a*_a)/4.0))*_src+0.5*_a*_a*_src[1]-(_a-0.75*_a*_a)*_src[2]+2*(1-_a)*nz(_it[1])+-(1-_a)*(1-_a)*nz(_it[2]) 
```

It plots a trendline in real-time that closely fits the price action, accurately determining trend direction and strength.

### Strategy Logic

A buy signal is generated when the Voss crosses up through the filter result. 

A sell signal is generated when the Voss crosses down through the filter result.

Trading signals are only accepted if confirmed by the trendline indicator. This avoids wrong signals from the Voss filter in trending markets.

## Advantages

- Voss filter provides early predictive signals to catch cyclical turns  
- Trendline indicator accurately determines trend direction, avoiding wrong signals
- Parameters can be optimized for different cycles and market environments
- Stops can be added to control risk

## Risks and Mitigation

- Strategy relies on early signals, potentially missing some trends
- Counter-trend signals may occur in strong trends, causing losses

Risks can be reduced by:

- Optimizing period parameter for instrument cycles
- Reducing filter bandwidth to decrease false signals 
- Adding trend filters to avoid signals against strong trends  
- Using stops to control loss per trade

## Enhancement Opportunities

The strategy can be improved by:

- Trying different price sources like close, moving averages etc. 
- Adjusting filter period for specific instrument cycles
- Optimizing trend indicator parameters for better trend detection
- Trying different trend indicators for better combinations
- Adding stops, trailing stops for better risk control
- Parameter optimization for best parameter sets

## Conclusion

This strategy combines the Voss filter and trend indicator to effectively identify cyclical turns in the market. With optimized parameters and risk controls, it can produce a robust quantitative trading system. It is widely applicable to instruments exhibiting cyclical patterns, as evidenced by good backtest results. Overall, the strategy has unique predictive capabilities, and broad potential for enhancement through multi-dimensional optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|20|period|
|v_input_3|4|predict|
|v_input_4|0.25|bandwidth|
|v_input_5_hl2|0|Source IT: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_6|0.07|Alpha|
|v_input_7|false|Fill Trend Region|
|v_input_8|false|Enable barcolors|
|v_input_9|false|Hide Ribbon|
|v_input_10|true|Custom Backtesting Dates|
|v_input_11|2019|Backtest Start Year|
|v_input_12|true|Backtest Start Month|
|v_input_13|true|Backtest Start Day|
|v_input_14|false|Backtest Start Hour|
|v_input_15|2020|Backtest Stop Year|
|v_input_16|2|Backtest Stop Month|
|v_input_17|29|Backtest Stop Day|
|v_input_18|false|Backtest Stop Hour|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// A Peek Into the Future
// John F. Ehlers
// TASC Aug 2019

// Created by e2e4mfck for tradingview.com
// Modified by © Bitduke

//@version=4
//strategy("Voss Strategy (Filter + IT)", overlay=false, calc_on_every_tick=false,pyramiding=0, default_qty_type=strategy.cash,default_qty_value=1000, currency=currency.USD, initial_capital=1000,commission_type=strategy.commission.percent, commission_value=0.075)

// voss filter

source = input(close, type = input.source)
period = input(20, type = input.integer)
predict = input(4, type = input.integer)
bandwidth = input(0.25, type = input.float)

// it trendline

src = input(hl2, title="Source IT")
a = input(0.07, title="Alpha", step=0.01) 
fr = input(false, title="Fill Trend Region")
ebc = input(false, title="Enable barcolors")
hr = input(false, title="Hide Ribbon")


voss_filter (_period, _predict, _bandwidth, _source) =>
	float _filt = 0, float _sumC = 0, float _voss = 0
	_PI		= 2 * asin(1)
	_order	= 3 * _predict
	_f1		= cos(2 * _PI / _period)
	_g1		= cos(_bandwidth * 2 * _PI / _period)
	_s1		= 1 / _g1 - sqrt(1 / (_g1 * _g1) - 1)
	_s2		= 1 + _s1
	_s3		= 1 - _s1
	_x1		= _source - _source[2]
	_x2		= (3 + _order) / 2

	for _i = 0 to (_order - 1)
		_sumC := _sumC + ((_i + 1) / _order) * _voss[_order - _i]

	if bar_index <= _order
		_filt := 0		
		_voss := 0		
	else			
		_filt := 0.5 * _s3 * _x1 + _f1 * _s2 * _filt[1] - _s1 * _filt[2]
		_voss := _x2 * _filt - _sumC

	[_voss, _filt]


[Voss, Filt] = voss_filter(period, predict, bandwidth, source)


instantaneous_trendline (_src, _a, _freq, _ebc, _hr) =>
    _it = 0.0
    _it := (_a-((_a*_a)/4.0))*_src+0.5*_a*_a*_src[1]-(_a-0.75*_a*_a)*_src[2]+2*(1-_a )*nz(_it[1], ((_src+2*_src[1]+_src[2])/4.0))-(1-_a)*(1-_a)*nz(_it[2], ((_src+2*_src[1]+_src[2])/4.0))
    _lag = 2.0*_it-nz(_it[2])
    
    [_it, _lag]

[it, lag] = instantaneous_trendline(src, a, fr, ebc, hr)

// - - - - -  - - - - - //

plot(Filt, title = "Filter", style = plot.style_line, color = color.red, linewidth = 2)
plot(Voss, title = "Voss", style = plot.style_line, color = color.blue,	linewidth = 2)
hline(0.0, title = "Zero", linestyle = hline.style_dashed, color = color.black,	linewidth = 1)
plot(hr? na:it, title="IT Trend", color= fr? color.gray : color.red, linewidth=1)
plot(hr? na:lag, title="IT Trigger", color=fr? color.gray : color.blue, linewidth=1)


// Strategy Logic
longCondition =  lag < it  and crossover(Voss,Filt) 
shortCondition = it > lag and crossover(Filt,Voss) 

strategy.entry("Voss_Short", strategy.short, when=shortCondition)
strategy.entry("Voss_Long", strategy.long, when=longCondition)


// === Backtesting Dates === thanks to Trost

testPeriodSwitch = input(true, "Custom Backtesting Dates")
testStartYear = input(2019, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testStartHour = input(0, "Backtest Start Hour")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, testStartHour, 0)
testStopYear = input(2020, "Backtest Stop Year")
testStopMonth = input(2, "Backtest Stop Month")
testStopDay = input(29, "Backtest Stop Day")
testStopHour = input(0, "Backtest Stop Hour")
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, testStopHour, 0)
testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false
testPeriod_1 = testPeriod()
isPeriod = true
// === /END

if not isPeriod
    strategy.cancel_all()
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/427275

> Last Modified

2023-09-19 16:59:10
