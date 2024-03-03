
> Name

两重分形突破策略Double-Fractal-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11610b3f493102a85de.png)
[trans]

## 概述

两重分形突破策略是一种基于技术形态的量化交易策略。该策略通过识别双重底分形和双重顶分形的形成,并在价格突破这些分形时发出买入和卖出信号。

## 策略原理  

该策略的核心思想基于分形理论。当出现类似M或W型的短期转折点时,这表明当前趋势可能发生反转。具体来说,当连续5根K线形成较高高度或者较低低度的特定组合时,就会形成底分形或顶分形。例如,如果K线图中,前2根K线中的最高价高于其后3根K线的最高价,那么就形成了顶分形。

当价格跌破底分形或涨破顶分形时,这表明反转的可能性较大,因此策略会分别产生买入和卖出信号。

## 策略优势  

这种策略的主要优势在于能识别潜在的趋势反转点,这对于跟踪趋势类型的交易策略非常有用。此外,相比于仅依赖单一K线形态的策略,两重分形的识别使得交易信号更加可靠。

## 策略风险  

该策略的主要风险在于分形识别并不能百分之百确保价格反转。有时价格可能只是短期调整,并没有发生趋势转变。这时,如果策略产生错误信号,将导致不必要的损失。要降低这种风险,可以结合其他指标如交易量来验证价格反转的可能性。

## 策略优化  

这种策略可以通过以下方式来进一步优化:

1. 增加过滤条件,如交易量指标等,避免被假反转误导。

2. 调整参数,识别更大时间周期的双重分形,以便捕捉大趋势的反转。

3. 结合移动止损策略,来减少亏损单的损失。

## 总结

两重分形突破策略通过识别特定K线形态来判断潜在的价格反转,是一种常见的技术指标驱动型策略。它可以有效地跟踪市场的短期和中期趋势,并具有较高的盈亏比,是一种可靠且实用的交易策略。

||

## Overview

The double fractal breakout strategy is a quantitative trading strategy based on technical pattern recognition. It identifies potential trend reversals by detecting double bottom and double top fractal formations, and generates buy and sell signals when prices break out of these fractals.

## Strategy Logic

The core idea behind this strategy lies in fractal theory. The emergence of M-shaped or W-shaped short term turning points suggests a possible reversal of the prevailing trend. Specifically, bottom or top fractals form when 5 consecutive bars create particular high/low combinations of relative greater/lower highs/lows. For example, a top fractal forms when the highest prices of the former 2 bars are above those of the latter 3 bars.  

The strategy generates long and short signals when prices break below bottom fractals and above top fractals respectively, as such breakouts indicate a higher likelihood of trend reversal.

## Advantages

The main advantage of this strategy is its ability to detect potential trend reversal points, which can be very useful for trend-following trading systems. Additionally, the double fractal pattern provides more reliable trading signals compared to strategies relying solely on single bar patterns. 

## Risks

The major risk is that fractal detection does not guarantee price reversals with full certainty. Sometimes prices may just be making short-term corrections without real trend changes. Incorrect signals can lead to unnecessary losses in such cases. To mitigate this risk, other indicators like trading volumes can be used to verify the validity of reversal signals.

## Enhancement

Possible ways to enhance this strategy include:

1. Adding filters like volume to avoid false reversals. 

2. Tuning parameters to detect larger-degree double fractals and capture big trend turns.

3. Incorporating moving stop loss to reduce losses from bad trades.

## Conclusion

The double fractal breakout strategy identifies potential price reversals by detecting specific technical patterns. As a technical indicator-driven approach, it can effectively track short and medium-term trends in the market and provide respectable risk-reward outcomes. It is a reliable and practical trading system overall.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ceyhun

strategy("Fractal Breakout Strategy", overlay=true)

FUp = high[4] < high[2] and high[3] < high[2] and high[1] < high[2] and high < high[2] or 
   high[5] < high[2] and high[4] < high[2] and high[3] <= high[2] and 
   high[1] < high[2] and high < high[2] or 
   high[6] < high[2] and high[5] < high[2] and high[4] <= high[2] and 
   high[3] <= high[2] and high[1] < high[2] and high < high[2] or 
   high[7] < high[2] and high[6] < high[2] and high[5] <= high[2] and 
   high[4] <= high[2] and high[3] <= high[2] and high[1] < high[2] and 
   high < high[2] or 
   high[8] < high[2] and high[7] < high[2] and high[6] <= high[2] and 
   high[5] <= high[2] and high[4] <= high[2] and high[3] <= high[2] and 
   high[1] < high[2] and high < high[2]
FractalUp = valuewhen(FUp, high[2], 1)
plot(FractalUp, color=#0000FF,title="FractalUp")

FDown = low[4] > low[2] and low[3] > low[2] and low[1] > low[2] and low > low[2] or 
   low[5] > low[2] and low[4] > low[2] and low[3] >= low[2] and low[1] > low[2] and 
   low > low[2] or 
   low[6] > low[2] and low[5] > low[2] and low[4] >= low[2] and low[3] >= low[2] and 
   low[1] > low[2] and low > low[2] or 
   low[7] > low[2] and low[6] > low[2] and low[5] >= low[2] and low[4] >= low[2] and 
   low[3] >= low[2] and low[1] > low[2] and low > low[2] or 
   low[8] > low[2] and low[7] > low[2] and low[6] >= low[2] and low[5] >= low[2] and 
   low[4] >= low[2] and low[3] >= low[2] and low[1] > low[2] and low > low[2]
FractalDown = valuewhen(FDown, low[2], 1)
plot(FractalDown, color=#FF0000,title="FractalDown")

if crossover(close, FractalUp)
    strategy.entry("Long", strategy.long, comment="Long")

if crossunder(close, FractalDown)
    strategy.entry("Short", strategy.short, comment="Short")

```

> Detail

https://www.fmz.com/strategy/440439

> Last Modified

2024-01-30 15:53:27
