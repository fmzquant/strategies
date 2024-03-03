
> Name

基于双均线交叉交易策略-A-Double-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b961dc2bfdea957d30.png)
[trans]


## 概述

该策略基于两条不同参数设置的移动平均线的交叉来发出买入和卖出信号。当较短周期的移动平均线从下方向上突破较长周期的移动平均线时,发出买入信号;当较短周期的移动平均线从上方向下突破较长周期的移动平均线时,发出卖出信号。

## 策略原理

该策略使用pine脚本语言编写。首先通过input定义了两条移动平均线的类型、长度和价格源,分别命名为p1和p2。其中p1代表较短周期的均线,p2代表较长周期的均线。

通过crossover和crossunder函数判断两条均线的交叉情况。当p1从下方向上突破p2时,即发出买入信号;当p1从上方向下突破p2时,即发出卖出信号。

为了实施交易,策略通过strategy.entry函数在发出信号时建立多头或空头仓位。如果启用了shortOnly参数,则只交易卖出信号。

## 优势分析

该策略具有以下优势:

1. 规则清晰,易于理解和实现
2. 均线交叉是古典且广为人知的交易信号
3. 可高度自定义均线的类型、长度和价格源
4. 可仅交易卖出信号,降低交易频率

## 风险分析

该策略也存在一些风险:

1. 在震荡行情中,均线可能产生多次无效交叉,导致过度交易
2. 需优化参数以适应不同品种和交易周期
3. 无法判断趋势方向,可能逆势建仓

可通过调整均线长度,引入过滤条件等方式减少无效信号。也可以结合趋势指标判断大盘走势。

## 优化方向  

该策略可从以下几个方面进行优化:

1. 引入Volume加权平均价或典型价格作为价格源,提高交叉信号的可靠性

2. 增加 Validation Period 校验周期,避免短期错误交叉

3. 结合ATR止损,根据市场波动幅度设定可承受的最大损失

4. 使用曲线拟合优化参数,寻找最优参数组合

5. 在大周期趋势一致时才考虑发出交易信号

## 总结

该双均线交叉策略整体易于理解和实现,通过两个均线的交叉形成交易信号,可高度自定义。但也可能在震荡行情中产生较多无效信号。可通过参数优化与规则优化降低风险,其优化空间较大,值得进一步研究。

||

## Overview  

This strategy generates buy and sell signals based on the crossover of two moving averages with different parameter settings. When the shorter period moving average crosses above the longer period moving average from below, a buy signal is generated. When the shorter period moving average crosses below the longer period moving average from above, a sell signal is generated.  

## Strategy Logic

The strategy is written in Pine script. It first defines two moving averages, named p1 and p2, with customizable type, length and price source through input. Here p1 represents the shorter period MA and p2 represents the longer period MA.  

The crossover and crossunder functions are used to detect the crossover between the two MAs. When p1 crosses over p2 from below, a buy signal is generated. When p1 crosses under p2 from above, a sell signal is generated.

To execute trades, the strategy enters long or short positions using strategy.entry when signals are triggered. If the shortOnly input is enabled, only sell signals will be traded.

## Advantage Analysis

The advantages of this strategy include:

1. Clear rules, easy to understand and implement  
2. MA crossover is a classical and widely known trading signal
3. Highly customizable MA types, lengths and price sources
4. Can trade only sell signals to lower trade frequency

## Risk Analysis  

There are also some risks with this strategy:

1. Multiple invalid crosses may happen during choppy markets, leading to over-trading. 
2. Parameters need optimization for different products and timeframes.
3. Unable to determine trend direction, may trade against the trend.

Risks can be lowered by adjusting MA lengths, adding filter conditions etc. Trend indicators can also be added to determine market bias.

## Enhancement Opportunities

The strategy can be enhanced from the following aspects:

1. Use VWAP or typical price as price source to make crossover signals more reliable.

2. Add a Validation Period to avoid short-term wrong crosses.  

3. Incorporate ATR stops based on maximum acceptable loss according to market volatility.

4. Parameter optimization through curve fitting to find optimum combinations.

5. Only consider signals along the direction of higher timeframe trends.

## Summary   

The double MA crossover strategy is easy to understand and implement, generating trade signals from two MA crossovers with high customizability. But it may also produce excessive invalid signals during choppy markets. Risks can be lowered through parameter and logic optimization with ample enhancement opportunities, worth further research.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|MA Type 1: SMA|EMA|WMA|HMA|VWMA|RMA|TEMA|
|v_input_2|10|Length 1|
|v_input_3_close|0|Source 1: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|0|MA Type 2: SMA|EMA|WMA|HMA|VWMA|RMA|TEMA|
|v_input_5|50|Length 2|
|v_input_6_close|0|Source 2: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|false|Short only|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-20 00:00:00
end: 2023-11-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RafaelPiccolo

//@version=4
strategy("Double MA Cross", overlay=true)

type1 = input("SMA", "MA Type 1", options=["SMA", "EMA", "WMA", "HMA", "VWMA", "RMA", "TEMA"])
len1 = input(10, minval=1, title="Length 1")
src1 = input(close, "Source 1", type=input.source)

type2 = input("SMA", "MA Type 2", options=["SMA", "EMA", "WMA", "HMA", "VWMA", "RMA", "TEMA"])
len2 = input(50, minval=2, title="Length 2")
src2 = input(close, "Source 2", type=input.source)

shortOnly = input(false, "Short only")

tema(src, len)=>
    ema1 = ema(src, len)
    ema2 = ema(ema1, len)
    ema3 = ema(ema2, len)
    return = 3 * (ema1 - ema2) + ema3

getPoint(type, len, src)=>
    return = type == "SMA" ? sma(src, len) : type == "EMA" ? ema(src, len) : type == "WMA" ? wma(src, len) : type == "HMA" ? hma(src, len) : type == "VWMA" ? vwma(src, len) : type == "RMA" ? rma(src, len) : tema(src, len)

p1 = getPoint(type1, len1, src1)
p2 = getPoint(type2, len2, src2)

shortCondition = crossunder(p1, p2)
longCondition = crossover(p1, p2)

if (shortCondition)
    strategy.entry("Short", strategy.short)

if (longCondition)
    if (shortOnly)
        strategy.close("Short")
    else
        strategy.entry("Long", strategy.long)

plot(p1, "MA 1", p1 < p2 ? color.red : color.green)
plot(p2, "MA 2", color.blue)

```

> Detail

https://www.fmz.com/strategy/433425

> Last Modified

2023-11-27 15:32:57
