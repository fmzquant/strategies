
> Name

双SuperTend与MACD组合交易策略Dual-SuperTrend-with-MACD-Combination-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

双SuperTrend与MACD组合交易策略将两个趋势跟踪指标(SuperTrend 1和SuperTrend 2)与一个动量震荡指标(MACD)结合使用,旨在提供一个连贯系统的交易方法,无需主观判断。

该策略的关键优势:

- 双SuperTrend验证:使用两个SuperTrend指标,ATR周期和因子不同,可确认趋势方向,双重验证机制可减少错误信号。

- 动量确认:MACD柱状线作为动量过滤器,确认入场和出场,增加验证层级。

- 客观入场和出场:策略根据趋势方向和动量组合生成买卖信号,无主观解释空间。

- 自动化交易管理:策略内置佣金、滑点和初始资金设置,自动化执行交易。

- 可定制性:所有参数可轻松自定义,适应不同交易者需求和变化的市场环境。

## 原理

该策略运行在一套明确规则上,主要关注双SuperTrend确认的趋势方向和MACD柱状线表示的动量。

### 入场规则

- 多头入场:两个SuperTrend指标多头且MACD柱状线大于0。

- 空头入场:两个SuperTrend指标空头且MACD柱状线小于0。

### 出场规则 

- 平多仓:任一SuperTrend转空头或MACD柱状线转负。

- 平空仓:任一SuperTrend转多头或MACD柱状线转正。

### 交易管理

- 策略使用固定佣金比例和滑点参数。

- 内置自动风险管理功能,避免过度敞口。

## 交易方向

该策略允许多空双向交易。用户可以根据自己的市场看法选择交易方向(只多、只空或多空)。

## 使用说明

- 最适用于趋势明显的时间周期。

- 用户可以根据需要调整SuperTrend的ATR周期、因子和MACD参数。

## 默认参数

- SuperTrend 1 ATR周期:10

- SuperTrend 1 因子:3.0

- SuperTrend 2 ATR周期:20

- SuperTrend 2 因子:5.0   

- MACD快线周期:12

- MACD慢线周期:26

- MACD平滑周期:9

- 佣金比例:0.1%  

- 滑点:1点

- 交易方向:双向

默认参数提供平衡的交易方法,但可以根据个人偏好进行自定义。

## 优势分析

该策略具有以下优势:

1. 双重趋势验证减少假信号

使用两个SuperTrend指标进行趋势验证,可大大减少单一指标造成的错误信号。双重确认机制增强稳定性。

2. MACD动量过滤增加准确性 

MACD柱状线作为辅助判断标准,可过滤掉部分不理想的交易信号,提高 entrada 准确率。

3. 回撤控制能力强

双趋势指标组合,可在趋势转换时快速止损,有助于控制回撤。

4. 自动化程度高,无需主观判断

明确的入场出场规则,内置交易管理设置,无需主观判断,降低人为错误。

5. 可定制性强,适应性广

指标参数可调整,可针对不同品种和交易偏好进行优化,使用范围广。

## 风险及优化

该策略也存在以下风险:

1. 多空动态转换困难

双趋势指标组合,多空转换相对困难,不适合频繁换向的市场。

2. 回撤控制能力有限

强趋势行情下,止损价格可能落后,回撤扩大的风险。

3. 无法应对突发事件

无法快速应对黑天鹅事件,存在更大回撤风险。

优化方向:

1. 优化指标参数,适应不同品种。

2. 增加止损机制,如移动止损,进一步控制回撤。

3. 结合其他指标,识别突发事件,降低回撤。

## 总结

综上所述,双SuperTrend与MACD组合策略融合了趋势跟踪和动量分析的优点,规则清晰,自动化程度高,可有效过滤噪音交易信号,具有非常强大的实用性。但也要注意回撤控制和参数优化问题。总体来说,该策略是系统趋势交易的优秀代表之一。

||

## Overview

The Dual SuperTrend with MACD combination trading strategy incorporates two trend-following indicators (SuperTrend 1 and SuperTrend 2) with a momentum oscillator (MACD) to provide a systematic approach to trading without discretionary decision-making.

Key advantages of this strategy:

- Dual SuperTrend Validation - Using two SuperTrend indicators with different ATR periods and factors to confirm the trend direction minimizes false signals.

- Momentum Confirmation - The MACD histogram acts as a momentum filter to validate entries and exits. 

- Objective Entry and Exit Rules - The strategy generates clear buy and sell signals based on the combination of trend and momentum.

- Automated Trade Management - Inbuilt settings for commission, slippage and initial capital automate the trade execution process.

- Customizability - All parameters can be easily customized to suit specific trading needs and changing market conditions.

## How it Works

The strategy operates on a set of defined rules, focusing primarily on the trend direction confirmed by the Dual SuperTrend and momentum indicated by the MACD histogram.

### Entry Rules

- Long Entry: Both SuperTrends bullish and MACD histogram above zero.

- Short Entry: Both SuperTrends bearish and MACD histogram below zero.

### Exit Rules

- Exit Long: Either SuperTrend turns bearish or MACD histogram drops below zero. 

- Exit Short: Either SuperTrend turns bullish or MACD histogram rises above zero.

### Trade Management

- Fixed commission rate and slippage settings.

- Auto risk management to prevent overexposure.

## Trading Direction 

The strategy allows trading in both bullish and bearish markets. Users can choose the direction (long, short or both) aligning with their market view.

## Usage

- Best applied on timeframes where the trend is evident. 

- Users can customize SuperTrend and MACD parameters.

## Default Settings

- SuperTrend 1 ATR Period: 10

- SuperTrend 1 Factor: 3.0

- SuperTrend 2 ATR Period: 20 

- SuperTrend 2 Factor: 5.0

- MACD Fast Length: 12

- MACD Slow Length: 26

- MACD Signal Smoothing: 9

- Commission: 0.1%

- Slippage: 1 point  

- Direction: Both

The default parameters offer a balanced approach but can be customized.

## Advantages

The key advantages of this strategy:

1. Dual trend validation minimizes false signals

Using two SuperTrend indicators significantly reduces false signals compared to single indicator strategies. The dual confirmation mechanism enhances reliability.

2. MACD momentum filter improves accuracy

The MACD histogram filters out less ideal trading signals, improving entry accuracy.

3. Effective drawdown control 

The combination of dual trend indicators allows quick exits when the trend changes, helping control drawdowns.

4. High degree of automation, no discretion needed

The well-defined entry and exit rules eliminate subjective interpretations and human errors.

5. Highly customizable for broader applicability

Adjustable parameters make this strategy robust for different instruments and trading preferences.

## Risks and Optimization

The potential risks include:

1. Difficulty in dynamic trend transitions

Frequent trend reversals may be challenging for the dual trend indicator setup.

2. Limited drawdown control in strong trends  

The stop loss can lag in strong trending moves, leading to larger drawdowns.

3. Inability to react to sudden events

It cannot quickly adapt to black swan events, increasing drawdown risks.

Optimization opportunities:

1. Fine tune parameters for different instruments.

2. Add stop loss mechanisms like trailing stops to further control drawdowns. 

3. Incorporate other indicators to identify sudden events and reduce drawdowns.

## Conclusion

In summary, the Dual SuperTrend and MACD combination strategy combines the strengths of trend following and momentum analysis. With clear rules and a high degree of automation, it can effectively filter out noise and provide strong practical utility. But drawdown control and parameter optimization need to be addressed. Overall, this is one of the best examples of a systematic trend trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|Trading Direction: both|short|long|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3|9|Signal Smoothing|
|v_input_string_2|0|Oscillator MA Type: EMA|SMA|
|v_input_string_3|0|Signal Line MA Type: EMA|SMA|
|v_input_4|10|ATR Length for Supertrend 1|
|v_input_float_1|3|Factor for Supertrend 1|
|v_input_5|20|ATR Length for Supertrend 2|
|v_input_float_2|5|Factor for Supertrend 2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-25 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © PresentTrading

//@version=5
// Define the strategy settings
// strategy("Dual-Supertrend with MACD - Strategy [presentTrading]", overlay=true, precision=3, default_qty_type=strategy.cash, 
//  commission_value= 0.1, commission_type=strategy.commission.percent, slippage= 1, 
//   currency=currency.USD, default_qty_type = strategy.percent_of_equity, default_qty_value = 10, initial_capital= 10000)

// Trading Direction Dropdown
tradeDirection = input.string("both", "Trading Direction", options=["long", "short", "both"])

// MACD Inputs
fast_length = input(12, "Fast Length")
slow_length = input(26, "Slow Length")
signal_length = input(9, "Signal Smoothing")
sma_source = input.string("EMA", "Oscillator MA Type", options=["SMA", "EMA"])
sma_signal = input.string("EMA", "Signal Line MA Type", options=["SMA", "EMA"])


// MACD Calculation
fast_ma = sma_source == "SMA" ? ta.sma(close, fast_length) : ta.ema(close, fast_length)
slow_ma = sma_source == "SMA" ? ta.sma(close, slow_length) : ta.ema(close, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
hist = macd - signal

// Input Parameters for Supertrend 1
atrPeriod1 = input(10, "ATR Length for Supertrend 1")
factor1 = input.float(3.0, "Factor for Supertrend 1", step=0.01)

// Supertrend Calculation for 1
[supertrend1, direction1] = ta.supertrend(factor1, atrPeriod1)

// Input Parameters for Supertrend 2
atrPeriod2 = input(20, "ATR Length for Supertrend 2")
factor2 = input.float(5.0, "Factor for Supertrend 2", step=0.01)

// Supertrend Calculation for 2
[supertrend2, direction2] = ta.supertrend(factor2, atrPeriod2)

// Combined Conditions
isBullish = direction1 < 0 and direction2 < 0 and hist > 0
isBearish = direction1 > 0 and direction2 > 0 and hist < 0
exitLong = direction1 > 0 or direction2 > 0 or hist < 0
exitShort = direction1 < 0 or direction2 < 0 or hist > 0

// Strategy Entry and Exit based on Trading Direction
if (tradeDirection == "both" or tradeDirection == "long")
    strategy.entry("Buy", strategy.long, when=isBullish)
    strategy.close("Buy", when=exitLong)

if (tradeDirection == "both" or tradeDirection == "short")
    strategy.entry("Sell", strategy.short, when=isBearish)
    strategy.close("Sell", when=exitShort)

bodyMiddle1 = plot((open + close) / 2, display=display.none)
upTrend1 = plot(direction1 < 0 ? supertrend1 : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend1 = plot(direction1 < 0? na : supertrend1, "Down Trend", color = color.red, style=plot.style_linebr)

fill(bodyMiddle1, upTrend1, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle1, downTrend1, color.new(color.red, 90), fillgaps=false)

bodyMiddle2 = plot((open + close) / 2, display=display.none)
upTrend2 = plot(direction2 < 0 ? supertrend2 : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend2 = plot(direction2 < 0? na : supertrend2, "Down Trend", color = color.red, style=plot.style_linebr)

fill(bodyMiddle2, upTrend2, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle2, downTrend2, color.new(color.red, 90), fillgaps=false)
```

> Detail

https://www.fmz.com/strategy/427910

> Last Modified

2023-09-26 17:45:03
