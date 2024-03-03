
> Name

螺旋十字星与移动平均确认策略Spiral-Cross-Strategy-with-Moving-Average-Confirmation

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7930d0ac79ef6b2a21.png)
[trans]

### 概述

该策略结合了螺旋指标和移动平均线来识别价格趋势的方向和强度,以生成潜在的做多和做空信号。当螺旋正指标线突破螺旋负指标线时,会在图表上标记该交叉点,如果收盘价高于移动平均线则产生做多信号;而当螺旋负指标线突破螺旋正指标线时,如果收盘价低于移动平均线则产生做空信号。

### 策略原理

1. 螺旋指标:包括螺旋正指标线(VI+)和螺旋负指标线(VI-)。它用于识别价格趋势的方向和强度。

2. 移动平均线:使用选择的移动平均方法(SMA、EMA、SMMA、WMA或VWMA)来平滑价格数据,得到的平滑线称为“平滑线”。

3. 确定做多和做空信号:当VI+线穿过VI-线时,标记该交叉点,如果收盘价高于平滑线则产生做多信号;当VI-线穿过VI+线时,如果收盘价低于平滑线则产生做空信号。

### 策略优势

1. 结合了趋势识别和平滑过滤的优点,可以在趋势市场中捕捉趋势,避免在震荡市场中产生错误信号。

2. 螺旋指标可以有效识别趋势的方向和强度。移动平均线可以过滤掉部分噪音。

3. 策略逻辑简单清晰,容易理解和实现。

4. 可自定义参数,适应不同市场环境。


### 策略风险

1. 在盘整和无明确趋势的市场中,可能会产生错误信号和SERIAL停损。

2. 参数设置不当也会影响策略表现。例如移动平均线长度设置过短则过滤效果差,过长则识别趋势变化滞后。

3. 无法在突发事件下起到防范作用,例如重大财经事件发生后的剧烈行情变动。


### 策略优化

1. 可以引入其它指标结合使用,例如成交量指标来确定趋势可靠程度。

2. 优化参数设定,平衡移动平均线的趋势跟踪性和噪音过滤性。

3. 增加止损策略来控制损失。

4. 利用机器学习等方法自动优化参数。

5. 结合风险管理模块调整仓位。


### 总结

本策略通过简单有效地结合螺旋指标和移动平均线,实现了优秀的趋势捕捉效果。识别趋势方向的同时具有一定的噪音过滤能力,可以减少错误信号。总体来说策略逻辑简洁,使用灵活,在趋势市场中表现较好。通过引入更多过滤手段,适当优化参数设置,风险可控性能够得到进一步提高。

||

### Overview

This strategy combines the Vortex Indicator and Moving Average lines to identify the direction and strength of price trends in order to generate potential long and short signals. When the Vortex Positive line (VI+) crosses above the Vortex Negative line (VI-), each crossover is highlighted on the chart. If the closing price is above the Moving Average line, a long signal is generated. When VI- crosses above VI+, if the closing price is below the Moving Average line, a short signal is generated.

### Strategy Logic  

1. Vortex Indicator: Consists of two lines - Vortex Positive (VI+) and Vortex Negative (VI-). It is used to identify the direction and strength of price trends.

2. Moving Average (MA): Uses a chosen Moving Average method (SMA, EMA, SMMA, WMA or VWMA) to smooth the price data. The smoothed line is referred to as the "Smoothing Line".  

3. Determine Long and Short Signals: When VI+ crosses above VI-, each crossover is highlighted. If the close is above the Smoothing Line, a long signal is generated. When VI- crosses above VI+, if the close is below the Smoothing Line, a short signal is generated.

### Advantages

1. Combines trend identification and smoothing to capture trends in trending markets, avoiding false signals in choppy markets.  

2. Vortex Indicator effectively identifies trend direction and strength. Moving Averages filter out some noise.

3. Simple and clear strategy logic, easy to understand and implement.  

4. Customizable parameters, adapts to different market environments.

### Risks

1. May generate false signals and whipsaws in range-bound or trendless markets. 

2. Inappropriate parameter settings can impact strategy performance. For example, a Moving Average that is too short has poor smoothing capability and a longer one lags in recognizing trend changes.   

3. Unable to safeguard against extreme price swings from major unanticipated events. 

### Enhancements

1. Incorporate other indicators like volume to determine trend reliability.  

2. Optimize parameters to balance trend-following and noise filtering of Moving Averages. 

3. Add stop loss to control losses.

4. Utilize machine learning for automated parameter optimization.

5. Incorporate risk management modules to adjust position sizing.


### Conclusion
This strategy effectively combines the Vortex Indicator and Moving Averages to capture trends. It identifies trend direction while having some noise filtering capability to reduce false signals. The logic is simple and flexible to use, performing well in trending markets. Further improvements in risk control can be achieved by incorporating more filters, optimizing parameters, and adding stop losses.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|Vortex Length|
|v_input_int_2|9|MA Length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|false|Offset|
|v_input_string_1|0|(?Smoothing)Method: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_int_4|5|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-01 00:00:00
end: 2024-02-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © DraftVenture

//@version=5
strategy("Vortex + Moving Average Strategy", overlay=true)

//Vortex settings
period_ = input.int(14, title="Vortex Length", minval=2)
VMP = math.sum( math.abs( high - low[1]), period_ )
VMM = math.sum( math.abs( low - high[1]), period_ )
STR = math.sum( ta.atr(1), period_ )
VIP = VMP / STR
VIM = VMM / STR
plot(VIP, title="VI +", color=color.white)
plot(VIM, title="VI -", color=color.white)

len = input.int(9, minval=1, title="MA Length")
src = input(close, title="Source")
offset = input.int(title="Offset", defval=0, minval=-500, maxval=500)
out = ta.sma(src, len)
plot(out, color=color.blue, title="MA", offset=offset)

ma(source, length, type) =>
    switch type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

typeMA = input.string(title = "Method", defval = "SMA", options=["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"], group="Smoothing")
smoothingLength = input.int(title = "Length", defval = 5, minval = 1, maxval = 100, group="Smoothing")

smoothingLine = ma(out, smoothingLength, typeMA)
plot(smoothingLine, title="Smoothing Line", color=#f37f20, offset=offset, display=display.none)

// Determine long and short conditions
longCondition = ta.crossover(VIP, VIM) and close > smoothingLine
shortCondition = ta.crossunder(VIP, VIM) and close < smoothingLine
crossCondition = ta.crossunder(VIP, VIM) or ta.crossunder(VIM, VIP)

// Strategy entry and exit logic
if longCondition
    strategy.entry("Long", strategy.long)

if shortCondition
    strategy.entry("Short", strategy.short)

bgcolor(crossCondition ? color.new(color.white, 80) : na)

// Strategy by KP
```

> Detail

https://www.fmz.com/strategy/440831

> Last Modified

2024-02-02 14:50:08
