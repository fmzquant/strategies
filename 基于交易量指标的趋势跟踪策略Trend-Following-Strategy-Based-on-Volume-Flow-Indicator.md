
> Name

基于交易量指标的趋势跟踪策略Trend-Following-Strategy-Based-on-Volume-Flow-Indicator

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略基于交易量指标(VFI)实现趋势跟踪交易。策略通过计算股价波动和交易量变化,判断市场趋势方向,实现低买高卖。

### 策略原理

1. 计算VFI指标:根据股价的对数变化和交易量计算VFI值,通过平滑处理消除震荡。

2. 判断趋势方向:VFI指标上穿0轴为看涨信号,下穿0轴为看跌信号。

3. 交易信号:快速EMA上穿慢速EMA,且VFI上穿买入线时做多;VFI下穿卖出线时平仓。

4. 止损方式:设定固定止损比例。

该策略主要依靠VFI指标判断趋势方向,与均线系统配合发出交易信号。VFI指标通过股价波动和交易量变化反映市场情绪,是一种趋势跟踪指标。与单一价格指标相比,VFI指标 judgments更全面,能更好地识别趋势转折点,过滤震荡。

### 策略优势

1. VFI指标判断趋势优于单一价格指标,能有效过滤震荡市和假突破。

2. 均线系统辅助判断,避免VFI指标在震荡市中发出错误信号。

3. 设定固定止损点控制风险,有利于风险管理。

4. 采用趋势跟踪模式,无需猜测市场转折点,跟踪趋势即可获得超额收益。

5. 参数设置灵活,可根据市场调整参数,适应不同周期和品种。

### 策略风险

1. 大幅震荡市场中,VFI指标可能发出错误信号。

2. 固定止损点可能过大或过小,导致止损过早或止损过晚。

3. 若买入卖出参数设定不当,可能导致交易频繁或漏单。

4. 趋势跟踪策略无法抓住反转,需要及时止损。

5. 参数不当可能导致进场过早或过晚。

### 策略优化

1. 调整VFI参数,优化指标计算。

2. 调整均线周期,优化发信号时机。 

3. 动态调整止损点,优化止损方式。

4. 结合其他指标滤波,提高信号质量。

5. 针对大周期和小周期分别优化参数组合。

6. 测试不同品种参数健壮性,提高参数适应性。

### 总结

该策略基于VFI指标判断趋势方向,与均线系统配合过滤误差信号。通过趋势跟踪实现低买高卖,无需预测具体反转点。策略优势是判断趋势优于单一价格指标,能有效过滤震荡。主要风险在于震荡市中可能发出错误信号。通过调整参数和加入其他指标辅助,可以提高策略稳定性。总体来说,该策略以VFI指标为基础,进行参数和止损优化后,可以成为一个可靠的趋势跟踪策略。

||


### Overview

This strategy implements trend following trading based on Volume Flow Indicator (VFI). It judges the market trend direction by calculating price fluctuations and volume changes, and realizes low buying and high selling.

### Strategy Principle 

1. Calculate VFI indicator: Compute VFI value based on logarithmic price change and volume, and smooth out oscillations through smoothing techniques.

2. Determine trend direction: VFI crossing above 0 is a bullish signal, while crossing below 0 is a bearish signal.  

3. Trading signals: Go long when fast EMA crosses above slow EMA and VFI crosses above buy line; close position when VFI crosses below sell line.

4. Stop loss: Set fixed stop loss percentage.

This strategy mainly relies on VFI to determine the trend direction, combined with moving averages to generate trading signals. VFI reflects market sentiment through price volatility and volume changes, making it a trend following indicator. Compared with single price indicators, VFI provides more comprehensive judgments and identifies trend reversal points better, filtering out consolidations.

### Advantages

1. VFI determines trends better than single price indicators, effectively filtering out consolidations and false breakouts.

2. Moving averages provide supplementary judgements, avoiding incorrect signals from VFI in ranging markets.

3. Fixed stop loss controls risk and facilitates risk management.

4. Trend following mode generates excess returns without predicting reversals.

5. Flexible parameter tuning adapts to different periods and products.

### Risks

1. VFI may generate incorrect signals during significant fluctuations. 

2. Fixed stop loss could be too wide or too narrow.

3. Ill-configured entry and exit settings lead to over-trading or missing trades.

4. Trend following fails to capture reversals and needs timely stop loss. 

5. Improper parameters cause premature or delayed entry.

### Enhancements

1. Optimize VFI calculation by adjusting parameters.

2. Fine-tune moving average periods for better signal timing.

3. Employ dynamic stop loss instead of fixed one.

4. Add other indicators to filter signals.

5. Optimize parameters separately based on timeframe. 

6. Test robustness across different products.

### Conclusion

This strategy determines the trend direction with VFI and uses moving averages to filter out wrong signals. It realizes low buying/high selling through trend following without predicting reversals. The advantage lies in its superior trend detection over single price indicators and ability to filter out consolidations. The main risk is generating incorrect signals during fluctuations. Optimizing parameters, adding supplementary indicators and stop loss techniques can improve its stability. Overall, with parameter tuning and stop loss optimizations, this VFI based strategy can become a reliable trend following system.

[/trans]


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|Length|
|v_input_2|0.2|Coef|
|v_input_3|2.5|Volume Cutoff|
|v_input_4|3|Smoothing Period|
|v_input_5|0|Smoothing Type: EMA|ALMA|SMA|WMA|
|v_input_6|-4|Buy Line|
|v_input_7|5|Sell Line|
|v_input_8|5|Stop Loss%|
|v_input_9|200|Long EMA|
|v_input_10|50|short EMA1|
|v_input_11|9|short EM2A|
|v_input_12|false|Visualize Trend|
|v_input_13|true|Apply Filling|
|v_input_14|true|Show Moving Average|
|v_input_15|0|Moving Average Type: SMA|EMA|ALMA|WMA|
|v_input_16|30|Moving Average Length|
|v_input_17|0.85|• ALMA - Offset (global setting)|
|v_input_18|6|• ALMA - Sigma (global setting)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-10-06 21:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mohanee
//This strategy is based on VFI indicator published by  UTS.  
//more details of VFI indicator can be found at  [url=http://mkatsanos.com/VFI.html]http://mkatsanos.com/VFI.html[/url] 
// I have added buy line and sell line to the indicator  and tested  SPY stock/index on one hour chart

//@version=4
strategy(title="VFI  strategy [based on VFI indicator published by  UTS]", overlay=false,pyramiding=2, default_qty_type=strategy.fixed,    initial_capital=10000, currency=currency.USD)


// Const
kMaColor = color.aqua
kNeutralColor = color.gray
kBearColor = color.red
kBullColor = color.green

kAlma = "ALMA"
kEma = "EMA"
kSma = "SMA"
kWma = "WMA"


// Input

vfi_length = input(8, title="Length", minval=1)  //default 130
vfi_coef = input(0.2, title="Coef", minval=0.1)
vfi_volCutoff = input(2.5, title="Volume Cutoff", minval=0.1)
vfi_smoothLen = input(3, title="Smoothing Period", minval=1)
vfi_smoothType = input(kEma, title="Smoothing Type", options=[kAlma, kEma, kSma, kWma])

//These are adde by me for the strategy purpose  BEGIN
vfi_buyLine = input(-4, title="Buy Line", minval=-10)
vfi_sellLine = input(5, title="Sell Line", minval=-10)
stopLoss = input(title="Stop Loss%", defval=5, minval=1)
//These are adde by me for the strategy purpose  END

vfi_longEMA = input(200, title="Long EMA", minval=1)
vfi_shortEMA1 = input(50, title="short EMA1", minval=1)
vfi_shortEMA2 = input(9, title="short EM2A", minval=1)

vfi_showTrend = input(false, title="Visualize Trend")
vfi_showFill = input(true, title="Apply Filling")
vfi_showMa = input(true, title="Show Moving Average")
vfi_maType = input(kSma, title="Moving Average Type", options=[kAlma, kEma, kSma, kWma])
vfi_maLength = input(30, title="Moving Average Length", minval=1)
vfi_almaOffset = input(0.85, title="• ALMA - Offset (global setting)", minval=0.0, maxval=1.0, step=0.05) // more smoothness (closer to 1) vs. more responsiveness (closer to 0)
vfi_almaSigma = input(6.0, title="• ALMA - Sigma (global setting)", minval=0.0, step=0.05) // the larger sigma the smoother ALMA


// Functionality

isRising(sig) =>
    sig > sig[1]
    
isFlat(sig) =>
    sig == sig[1]

vfi_trendColor(sig) =>
    isFlat(sig) ? kNeutralColor : isRising(sig) ? kBullColor : kBearColor
    
vfi_color(sig) =>
    isFlat(sig) ? kNeutralColor : sig > 0 ? kBullColor : kBearColor
    
osc_color(sig) =>
    sig == 0 ? kNeutralColor : sig > 0 ? kBullColor : kBearColor

smooth(t, sig, len) =>
    ma = float(sig)         // None
    if t == kSma            // Simple
        ma := sma(sig, len)
    if t == kEma            // Exponential
        ma := ema(sig, len)
    if t == kWma            // Weighted
        ma := wma(sig, len)
    if t == kAlma           // Arnaud Legoux
        ma := alma(sig, len, vfi_almaOffset, vfi_almaSigma)
    ma

calc_vfi(fviPeriod, smoothType, smoothLen, coef, vCoef) =>
    avg = nz(hlc3)
    inter = log(avg) - log(avg[1])
    vInter = stdev(inter, 30)
    cutOff = coef * vInter * close
    vAve = smooth(kSma, volume[1], fviPeriod)
    vMax = vAve * vCoef
    vC = min(volume, vMax)
    mf = avg - avg[1]
    vCp = iff(mf > cutOff, vC, iff(mf < -cutOff, -vC, 0))
    sVfi = sum(vCp, fviPeriod) / vAve
    vfi = smooth(smoothType, sVfi, smoothLen)
    
value_vfi = calc_vfi(vfi_length, vfi_smoothType, vfi_smoothLen, vfi_coef, vfi_volCutoff)
value_ma = smooth(vfi_maType, value_vfi, vfi_maLength)

longEMAval= ema(close, vfi_longEMA)
shortEMAval1= ema(close, vfi_shortEMA1)
shortEMAval2= ema(close, vfi_shortEMA2)

color_vfi = vfi_showTrend ? vfi_trendColor(value_vfi) : vfi_color(value_vfi)
color_osc = vfi_showFill ? osc_color(value_vfi) : na
color_ma = vfi_showMa ? kMaColor : na


// Drawings

plot_vfi = plot(value_vfi, title="VFI", color=color_vfi, linewidth=1)
plot_fill = plot(0, color=color_vfi, editable=false)
fill(plot_vfi, plot_fill, title="Oscillator Fill", color=color_osc, transp=75) 
hline(vfi_buyLine, color=color.green, title="Buy Line", linewidth=2, linestyle=hline.style_dashed)
hline(vfi_sellLine, color=color.purple, title="Sell Line", linewidth=2, linestyle=hline.style_dashed)
plot(value_ma, title="MA", color=color_ma, linewidth=2)

strategy.entry(id="VFI LE", long=true,  when=crossover(value_vfi,vfi_buyLine)  and ( shortEMAval1 >= longEMAval  ))

//strategy.close(id="VFI LE", comment="Exit",   when=crossunder(value_vfi,vfi_sellLine))
strategy.close(id="VFI LE", comment="TP Exit",   when=crossunder(value_vfi,vfi_sellLine) and close>strategy.position_avg_price)
//strategy.close(id="VFI LE", comment="Exit",   when=  (shortEMAval1 > shortEMAval2 )  and crossunder(close, shortEMAval2))

//stoploss
stopLossVal =   strategy.position_avg_price -  (strategy.position_avg_price*stopLoss*0.01) 
strategy.close(id="VFI LE", comment="SL Exit",   when=crossunder(value_vfi,vfi_sellLine) and close < stopLossVal)



```

> Detail

https://www.fmz.com/strategy/428887

> Last Modified

2023-10-10 14:51:13
