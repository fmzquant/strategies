
> Name

适应性趋势跟踪止损策略Adaptive-Trend-Tracking-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/195b3e58c7a1830d2ba.png)

[trans]

### 概述

该策略运用Wilder volatility trailing stop方法,结合ATR指标和不同类型移动均线,实现一个适应性很强的趋势跟踪型止损策略。

### 策略原理

该策略的核心是Wilder volatility trailing stop算法。它首先计算ATR指标,按照输入的参数计算ATR指标的长度和乘数,得到动态的止损线。然后结合收盘价、最高价、最低价中的某一选项,不断更新止损线的高点和低点。当价格突破此止损线时,进行买入和卖出操作。 

代码中,首先通过f_ma函数实现RMA、EMA、SMA、Hull MA等多种移动均线。然后计算ATR指标,乘以用户设定的乘数,得到基于波动率的止损线。通过highest和lowest函数追踪止损线的最高和最低点,当价格突破止损线时,进行交易。

该策略灵活运用ATR指标、不同类型均线和参数设置,实现一个适应性非常强的趋势跟踪止损策略。它能够有效跟踪趋势,在市场出现较大回撤时止损离场。

### 优势分析

- 该策略首先运用Wilder Volatility Trailing Stop算法,这是一种成熟可靠的趋势跟踪止损方法。

- 策略运用ATR指标动态计算止损线,可以避免止损点过于死板。ATR指标能够有效反映市场的波动率和风险水平。

- 代码实现了RMA、EMA、SMA、Hull MA等多种均线的选择,增强了策略的适应性。

- 通过调整ATR长度、乘数参数,可以针对不同市场找到较优参数,优化策略效果。

- 策略使用最高价、最低价、收盘价等不同价格选择计算止损线,可针对不同品种进行优化。

- 整体来说,该策略是一种可靠、适应性强、容易优化的趋势跟踪止损策略。

### 风险分析

- 该策略主要依赖参数优化,不同市场和品种需要测试找到适合的ATR和乘数参数组合,否则止损效果可能不佳。

- 在震荡行情中,ATR止损线可能出现频繁触发止损的情况。需要结合趋势判断指标进行优化,避免错过震荡趋势。

- 止损线过于宽松会错过回撤机会止损;过于紧密会增加交易频率和滑点成本。需要仔细测试找到平衡点。

- 多种均线选择可能导致策略效果出现偏差。应该针对具体品种选择一个主要均线,其他均线只做辅助参考。

- 该策略侧重趋势跟踪,无法直接获利。需要考虑与其它入市退出策略或止盈策略组合使用。

- 在参数不当时,策略可能出现过于频繁交易或持仓时间过长的问题。这需要通过优化解决。

### 优化方向 

- 可以考虑加入趋势指标,判断趋势存在与否,避免在震荡行情中被套。

- 可以测试加入反转指标元素,在空头趋势和多头趋势交替时,更快止损转仓换向。

- 可以尝试将ATR长度参数与交易品种的特点相关联,不同品种采用不同的ATR长度设置。

- 可以尝试加入交易量指标,在交易量明显缩小时,提高止损线的收紧速度。

- 可以考虑加大回撤比例止损,但不要过于紧密,防止正常回调就止损。

- 可以结合其它指标判断力度并进行参数优化,在力度不足时适当放宽止损范围。

### 总结

该策略基于Wilder Volatility Trailing Stop思想,运用ATR指标设计了一个适应性非常强的趋势跟踪型止损策略。它可以通过参数优化很好适应不同交易品种,是一种可靠、实用的止损策略。但我们也要注意风险,通过加入趋势判断和交易量元素等进行进一步优化,使其更稳健可靠。并且注意与其它策略组合使用,发挥止损策略的最大效用。

|| 

### Overview

This strategy utilizes the Wilder volatility trailing stop method, combined with ATR indicator and different types of moving averages, to implement an adaptive trend tracking stop loss strategy. 

### Strategy Logic

The core of this strategy is the Wilder volatility trailing stop algorithm. It first calculates the ATR indicator, and dynamically plots the stop loss line according to the input ATR length and multiplier. It then tracks the highest high and lowest low of the stop loss line based on the chosen price option among close, high and low prices. It sends trading signals when price breaks the stop loss line.

In the code, the f_ma function implements various moving averages including RMA, EMA, SMA and Hull MA. The ATR indicator is calculated and multiplied by the user defined multiplier to generate the volatility based trailing stop line. The highest and lowest levels of this line are tracked using highest and lowest functions. Trades are taken when price penetrates this trailing stop line.

By flexibly utilizing the ATR indicator, different moving averages and adjustable parameters, this strategy realizes an highly adaptive trend tracking stop loss system. It can effectively track trends and stop out with losses when major pullbacks occur in the market.

### Advantage Analysis

- This strategy leverages the Wilder Volatility Trailing Stop algorithm, which is a mature and reliable trend tracking stop loss methodology.

- The strategy uses ATR indicator to dynamically calculate the stop loss line, avoiding rigid stop loss points. ATR can effectively reflect market volatility and risk levels.

- The implementation of various moving averages including RMA, EMA, SMA and Hull MA enhances the adaptability of the strategy.

- By tuning the ATR length, multiplier parameters, optimized parameters can be found for different markets, improving strategy performance.

- The use of different price options like high, low, close prices allows optimization across different products.

- In summary, this is a reliable, adaptive and easily optimizable trend tracking stop loss strategy.

### Risk Analysis

- The strategy relies heavily on parameter optimization. Appropriate ATR and multiplier parameters need to be found through testing for different markets and products, otherwise the stop loss effect may not be ideal.

- In ranging markets, the ATR stop loss line may trigger frequent unwarranted stop outs. Trend filtering indicators need to be introduced to optimize this.

- If the stop loss line is too wide, loss opportunities will be missed. If too tight, trade frequency and slippage costs will increase. A balanced point needs to be found through careful testing.

- Too many moving average options may lead to performance deviation. One major moving average should be selected for each product, others used only for reference. 

- This strategy focuses on trend tracking and does not directly target profits. It needs to be combined with other entry/exit strategies or take profit techniques.

- With improper parameters, the strategy may exhibit excessive trading or oversized holding periods. This needs to be addressed through optimization.

### Optimization Directions

- Trend identification indicators can be introduced to avoid whipsaws in ranging markets.

- Reversal indicators may be tested to allow faster stop out and reverse when uptrend and downtrend alternate.

- The ATR period parameter can be correlated with product characteristics, so that different products use different ATR periods.

- Volume indicators can be used to tighten the stop loss line faster when volume declines significantly. 

- The stop loss percentage may be increased, but not too tight to avoid stopping out at normal retracements.

- Other indicators can be used to gauge momentum, and optimize parameters to loosen stops when momentum is weak.

### Summary

Based on the Wilder Volatility Trailing Stop concept, this strategy utilizes the ATR indicator to design a highly adaptive trend tracking stop loss system. Through parameter optimization it can be fitted to different trading products, and is a reliable and practical stop loss approach. But risks need to be managed by further enhancements like trend filters and volume elements to make it more robust. It also needs to be combined with other strategies to maximize the utility of stop loss techniques.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|ATR multiplier|
|v_input_2|7|ATR length|
|v_input_3|0|ATR moving average type: RMA|EMA|SMA|HULL|
|v_input_4|0|significant close type for trail calculation: close|high-low|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-09 00:00:00
end: 2023-10-16 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

// Wilder's Volatility Trailing Stop Strategy with various MA's
// by SparkyFlary

//For Educational Purposes
//Results can differ on different markets and can fail at any time. Profit is not guaranteed.
strategy(title="Wilder's Volatility Trailing Stop Strategy with various MA's", shorttitle="Trailing Stop Strategy", overlay=true)

AtrMult = input(3.0, title="ATR multiplier")
ATRlength = input(7, title="ATR length")
ATRavgType = input("RMA", title="ATR moving average type", options=["RMA", "EMA", "SMA", "HULL"])
sicType = input("close", title="significant close type for trail calculation", options=["close", "high-low"])

//function for choosing moving averages
f_ma(type, src, len) =>
    float result = 0
    if type == "RMA" // Wilder's moving averaege or Running moving average
        result := rma(src, len)
    if type == "EMA" // Exponential moving average
        result := ema(src, len)
    if type == "SMA" // Simple moving average
        result := sma(src, len)
    if type == "HULL" // Hull moving average
        result := wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))
    result

ATR = f_ma(ATRavgType, tr, ATRlength)
upperTrail = lowest(sicType=="close"?close:low, ATRlength) + AtrMult * ATR
lowerTrail = highest(sicType=="close"?close:high, ATRlength) - AtrMult * ATR

float TS = 0
TS := close < TS[1] ? upperTrail[1] : close > TS[1] ? lowerTrail[1] : TS

//plot
plot(TS, title="trailing stop", color=close<TS?color.red:color.green)

//Strategy
buy = crossover(close, TS)
//sell = close < TS
short = crossunder(close, TS)
//cover = close > TS

strategy.entry(id="enter long", long=true, when=buy)
//strategy.close(id="enter long", comment="exit long", when=sell)
strategy.entry(id="enter short", long=false, when=short)
//strategy.close(id="enter short", comment="exit short", when=cover)
```

> Detail

https://www.fmz.com/strategy/429467

> Last Modified

2023-10-17 14:04:28
