
> Name

双移动平均线稳健交易策略Robust-Dual-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6d11bbe4e33a9d6334.png)
[trans]
## 概述

双移动平均线稳健交易策略融合了相对强弱指数(RSI)和变化率指标(ROC)的双重力量,用于识别中长线趋势的方向。该策略同时设置了过滤条件和止损条件,实现了在趋势方向确认的基础上进行 Entry,能够有效降低假突破带来的风险。

## 策略原理

该策略基于 RSI 指标和 ROC 指标的组合来判断入场时机。当价格接近相对超卖区域时认为是结构转折点,形成反转信号;价格在相对超卖区域中波动时,表示当前趋势会持续一段时间。ROC 指标则从变化率的角度判断价格变化趋势和力度。两者的组合能形成判断market structure方面的互补。

另外,该策略加入了中长线趋势判断的 SMA 和短期止损线这两个过滤条件,这使得策略只在中长线趋势方向确认,短期没有止损风险的前提下才会入场。这种配置方式可以减少在震荡行情中被套牢的机会,对交易者而言风险可控。

该策略灵活的输入项设置还使得交易者可以自由选择仅采用 RSI 或 ROC 其中一个指标作为入场依据,或将二者组合使用,可针对不同品种和行情类型进行优化,这进一步扩大了策略的适用范围。

## 优势分析

该策略最大的优势在于结合趋势和反转信号进行入场判断,既考虑了趋势因素也兼顾了结构性机会,建立在市场结构转变的基础上,从而可以确保入场时机准确。与单一指标相比,RSI 和 ROC 的组合使用也使得策略对市场中的随机性噪音具有更强的抗干扰能力。

另一个优势是策略内置的趋势过滤器(SMA)和短期止损器,能够有效减少在震荡行情下被套的概率。趋势判断和短期止损这两道防线的设置使这成为一个风险可控的稳健策略。

最后,该策略内置多种参数设置组合,交易者可以针对不同品种和行情类型进行优化,这使得策略的适用面非常广泛。无论是趋势行情还是盘整行情,该策略都可以通过参数调整适应市场变化。

## 风险分析

该策略最大的风险在于 RSI 和 ROC 等反转信号指标存在一定的滞后。当趋势发生转变时,这些指标往往会有一定的滞后才使得参数达到设定的门限水平。这种滞后会导致策略的入场时间偏晚,无法捕捉趋势最初的启动阶段。

另一个潜在风险是在震荡趋势中,RSI 和 ROC 的参数设置可能会过于灵敏,导致产生一定的假信号。如果适逢短期止损被触发,则这些假信号会直接造成实际的损失。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 加入更多指标进行组合,如 KDJ、MACD 等,利用更多维度判断市场结构,提高信号的准确度

2. 对 RSI 和 ROC 的参数设置加入自适应优化机制,使指标参数能够根据实时波动性进行动态调整

3. 优化入场逻辑,在趋势指标和反转指标达到条件时设置一定的确认机制,避免在震荡中出现的假信号

4. 扩大止损范围或设置游离止损,给反转更多的空间,以减少止损过密造成的遗漏利润

## 总结

双移动平均线稳健交易策略成功地结合了趋势判断和反转指标,在中长线趋势确认的基础上捕捉结构性机会。该策略还具备强大的可配置性,交易者可以针对个股和行情类型进行参数优化。内置的双重防护机制也使其成为一个风险可控的选择。通过进一步集成更多指标,或建立自适应参数调整机制,该策略的表现还具有扩展的空间。

||

## Overview

The Robust Dual Moving Average Trading Strategy combines the power of both Relative Strength Index (RSI) and Rate of Change (ROC) indicators to identify the direction of intermediate-to-long-term trends. With built-in filters and stop loss conditions, this strategy enters the market only after the trend direction is confirmed, which effectively reduces the risk of false breakouts.

## Strategy Logic

This strategy uses a combination of RSI and ROC indicators to determine entry signals. When prices approach the overbought/oversold areas, it indicates potential reversal points and formation of reversal signals. When prices oscillate within these areas, it suggests the current trend may persist for some time. The ROC indicator judges price trend and momentum from the perspective of rate of change. The two indicators complement each other in assessing market structure.

In addition, the strategy incorporates intermediate-to-long-term trend filters (SMA) and short-term stop loss lines before entering any trades. This ensures that entries only occur in confirmed trend direction and without imminent stop loss risks in oscillating markets. Such configurations reduce the likelihood of being whipsawed in range-bound environments, making the strategy risk-manageable for traders.  

The flexible input settings also allow traders to choose between RSI only, ROC only or a combination of both as the entry trigger. This expands the adaptability of the strategy across different products and market conditions.

## Advantage Analysis 

The biggest advantage of this strategy lies in combining both trend and reversal signals for entry decisions, taking into consideration both trend and structural factors to ensure precise timing. Compared to single-indicator strategies, the RSI+ROC combo also makes the strategy more robust against market noise and randomness.

Another advantage is the built-in trend filters (SMA) and short-term stop loss, which reduce the probability of being trapped in oscillating markets. The two lines of defense via trend diagnosis and short-term stop loss make this a risk-controllable robust strategy.

Lastly, the multiple parameter setting combinations allow traders to optimize the strategy for different products and market environments. Whether in trending or range-bound markets, the strategy can be adaptive through parameter tuning.

## Risk Analysis

The biggest risk of the strategy comes from the lagging nature of reversal signal indicators like RSI and ROC. When trends start to shift, these indicators often lag behind before reaching the threshold levels set in the parameters. Such lag may delay the strategy’s entry and cause it to miss the initial stage of trend launches.  

Another potential risk is that in oscillating markets, the RSI and ROC parameter settings may become too sensitive and generate certain false signals. If triggered concurrently with short-term stop loss, such false signals can lead to actual losses.

## Optimization Directions  

The strategy can be optimized in the following aspects:

1. Incorporate more indicators for combo usage like KDJ, MACD to improve signal accuracy with multi-dimensional assessments of market structure

2. Introduce adaptive optimization mechanisms into RSI and ROC parameters so the settings can dynamically adjust based on real-time volatility

3. Refine entry logic by adding confirmation mechanisms when trend tools and reversal tools concurrently meet conditions, avoiding acting on false signals in oscillations  

4. Expand stop loss range or set trailing stop loss to provide reversals more room, reducing missed profits due to stop loss clustering

## Conclusion

The Robust Dual Moving Average Trading Strategy successfully combines trend diagnosis and reversal indicators to capture structural opportunities upon intermediate-to-long-term trend confirmation. With robust configurability, traders can optimize parameters for individual stocks and market conditions. The dual line of defense also makes it a risk-controllable choice. Further performance improvements can be achieved by incorporating more indicators or establishing adaptive parameter tuning mechanisms.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Long Only or Short Only or Both?: Both|Long Only|Short Only|
|v_input_2|0|RSI Only, ROC Only, Both?: Both|RSI Only|ROC Only|
|v_input_3|14|RSI Length|
|v_input_4|70|RSI Upper Threshold|
|v_input_5|30|RSI Lower Threshold|
|v_input_6|14|ROC Length|
|v_input_7|0.01|ROC Upper Threshold|
|v_input_8|-0.01|ROC Lower Threshold|
|v_input_9|5|Long Exit SMA Length|
|v_input_10|5|Short Exit SMA Length|
|v_input_11|0|Trend SMA Filter?: Above|Below|Don't Include|
|v_input_12|200|Trend SMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © GlobalMarketSignals

//@version=4
strategy("GMS: RSI & ROC Strategy", overlay=true)

LongShort = input(title="Long Only or Short Only or Both?", type=input.string, defval="Both", options=["Both", "Long Only", "Short Only"])
RSIroc = input(title="RSI Only, ROC Only, Both?", type=input.string, defval="Both", options=["Both", "RSI Only", "ROC Only"])
RSILength = input(title="RSI Length", type = input.integer ,defval=14)
RSIUpper = input(title="RSI Upper Threshold", type = input.float ,defval=70)
RSILower = input(title="RSI Lower Threshold", type = input.float ,defval=30)
ROCLength = input(title="ROC Length", type = input.integer ,defval=14)
ROCUpper = input(title="ROC Upper Threshold", type = input.float ,defval=0.01)
ROCLower = input(title="ROC Lower Threshold", type = input.float ,defval=-0.01)
LongExit = input(title="Long Exit SMA Length", type = input.integer ,defval=5)
ShortExit = input(title="Short Exit SMA Length", type = input.integer ,defval=5)
AboveBelow = input(title="Trend SMA Filter?", type=input.string, defval="Above", options=["Above", "Below", "Don't Include"])
TrendLength = input(title="Trend SMA Length", type = input.integer ,defval=200)

//RSI ONLY
 //Long Side

if LongShort =="Long Only" and AboveBelow == "Above" and RSIroc == "RSI Only"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and close< sma(close,LongExit) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Long Only" and AboveBelow == "Below" and RSIroc == "RSI Only"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and close< sma(close,LongExit) and close<sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and RSIroc == "RSI Only"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and close< sma(close,LongExit))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Both" and AboveBelow == "Above" and RSIroc == "RSI Only"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and close< sma(close,LongExit) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Both" and AboveBelow == "Below" and RSIroc == "RSI Only"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and close< sma(close,LongExit) and close<sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and RSIroc == "RSI Only"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and close< sma(close,LongExit))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
//RSI ONLY
 //SHORT SIDE

if LongShort =="Short Only" and AboveBelow == "Above" and RSIroc == "RSI Only"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and close> sma(close,ShortExit) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Short Only" and AboveBelow == "Below" and RSIroc == "RSI Only"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and close> sma(close,ShortExit) and close<sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and RSIroc == "RSI Only"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and close> sma(close,ShortExit))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Both" and AboveBelow == "Above" and RSIroc == "RSI Only"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and close> sma(close,ShortExit) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Both" and AboveBelow == "Below" and RSIroc == "RSI Only"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and close> sma(close,ShortExit) and close<sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and RSIroc == "RSI Only"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and close> sma(close,ShortExit))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
///////-----------------/////////////
///////-----------------/////////////
///////-----------------/////////////
    
    
//ROC ONLY
 //Long Side

if LongShort =="Long Only" and AboveBelow == "Above" and RSIroc == "ROC Only"
    strategy.entry("LONG", true, when = roc(close,ROCLength)<ROCLower and close< sma(close,LongExit) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Long Only" and AboveBelow == "Below" and RSIroc == "ROC Only"
    strategy.entry("LONG", true, when = roc(close,ROCLength)<ROCLower and close< sma(close,LongExit) and close<sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and RSIroc == "ROC Only"
    strategy.entry("LONG", true, when = roc(close,ROCLength)<ROCLower and close< sma(close,LongExit))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Both" and AboveBelow == "Above" and RSIroc == "ROC Only"
    strategy.entry("LONG", true, when = roc(close,ROCLength)<ROCLower and close< sma(close,LongExit) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Both" and AboveBelow == "Below" and RSIroc == "ROC Only"
    strategy.entry("LONG", true, when = roc(close,ROCLength)<ROCLower and close< sma(close,LongExit) and close<sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and RSIroc == "ROC Only"
    strategy.entry("LONG", true, when = rsi(close,ROCLength)<ROCLower and close< sma(close,LongExit))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
//ROC ONLY
 //SHORT SIDE

if LongShort =="Short Only" and AboveBelow == "Above" and RSIroc == "ROC Only"
    strategy.entry("SHORT", false, when = roc(close,ROCLength)>ROCUpper and close> sma(close,ShortExit) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Short Only" and AboveBelow == "Below" and RSIroc == "ROC Only"
    strategy.entry("SHORT", false, when = roc(close,ROCLength)>ROCUpper and close> sma(close,ShortExit) and close<sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and RSIroc == "ROC Only"
    strategy.entry("SHORT", false, when = roc(close,ROCLength)>ROCUpper and close> sma(close,ShortExit))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Both" and AboveBelow == "Above" and RSIroc == "ROC Only"
    strategy.entry("SHORT", false, when = roc(close,ROCLength)>ROCUpper and close> sma(close,ShortExit) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Both" and AboveBelow == "Below" and RSIroc == "ROC Only"
    strategy.entry("SHORT", false, when = roc(close,ROCLength)>ROCUpper and close> sma(close,ShortExit) and close<sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and RSIroc == "ROC Only"
    strategy.entry("SHORT", false, when = roc(close,ROCLength)>ROCUpper and close> sma(close,ShortExit))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
   
    
///////-----------------/////////////
///////-----------------/////////////
///////-----------------/////////////   

    
//BOTH
 //Long Side

if LongShort =="Long Only" and AboveBelow == "Above" and RSIroc == "Both"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and roc(close,ROCLength)<ROCLower and close< sma(close,LongExit) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Long Only" and AboveBelow == "Below" and RSIroc == "Both"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and roc(close,ROCLength)<ROCLower and close< sma(close,LongExit) and close<sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and RSIroc == "Both"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and roc(close,ROCLength)<ROCLower  and close< sma(close,LongExit))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Both" and AboveBelow == "Above" and RSIroc == "Both"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and roc(close,ROCLength)<ROCLower  and close< sma(close,LongExit) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Both" and AboveBelow == "Below" and RSIroc == "Both"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and roc(close,ROCLength)<ROCLower  and close< sma(close,LongExit) and close<sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and RSIroc == "Both"
    strategy.entry("LONG", true, when = rsi(close,RSILength)<RSILower and roc(close,ROCLength)<ROCLower  and close< sma(close,LongExit))
    strategy.close("LONG", when = close>sma(close,LongExit))
    
//BOTH
 //SHORT SIDE

if LongShort =="Short Only" and AboveBelow == "Above" and RSIroc == "Both"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and roc(close,ROCLength)>ROCUpper and close> sma(close,ShortExit) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Short Only" and AboveBelow == "Below" and RSIroc == "Both"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and roc(close,ROCLength)>ROCUpper and close> sma(close,ShortExit) and close<sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and RSIroc == "Both"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and roc(close,ROCLength)>ROCUpper and close> sma(close,ShortExit))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Both" and AboveBelow == "Above" and RSIroc == "Both"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and roc(close,ROCLength)>ROCUpper and close> sma(close,ShortExit) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Both" and AboveBelow == "Below" and RSIroc == "Both"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and roc(close,ROCLength)>ROCUpper and close> sma(close,ShortExit) and close<sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and RSIroc == "Both"
    strategy.entry("SHORT", false, when = rsi(close,RSILength)>RSIUpper and roc(close,ROCLength)>ROCUpper and close> sma(close,ShortExit))
    strategy.close("SHORT", when = close<sma(close,ShortExit))
    
    
```

> Detail

https://www.fmz.com/strategy/441055

> Last Modified

2024-02-05 10:57:28
