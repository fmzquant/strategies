
> Name

超趋势增强枢轴反转策略SuperTrend-Enhanced-Pivot-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fb65f38c4c3a979f6e.png)

[trans]


## 概述

超趋势增强枢轴反转策略是一种独特的交易方式,它结合了枢轴反转点的精确性和超趋势指标的趋势追踪能力。该策略旨在为交易者提供清晰的入市和出场信号,同时使用超趋势指标来过滤掉可能的错误信号。

与传统的枢轴反转策略不同,本策略使用超趋势指标作为过滤器。这意味着它只采取与总体趋势一致的交易信号,而超趋势指标决定了总体趋势的方向。这可以帮助减少错误信号的数量,并提高策略的整体盈利能力。

增强枢轴反转策略特别适合加密货币市场,因为加密货币市场具有高波动性的特点。这意味着价格可以在很短的时间内发生巨大的变化,因此能够快速获利。该策略使用枢轴点可以捕捉到这些快速价格变化,并识别出潜在的反转点。

## 策略原理

该策略的工作原理是识别枢轴反转点,这些点是价格图表中价格可能反转的点。这些点是使用 ta.pivothigh 和 ta.pivotlow 函数的组合来识别的,它们可以在一定周期内找到价格图表中的最高点和最低点。

一旦识别出枢轴反转点,该策略就会检查超趋势指标的方向。如果超趋势为正(表示上涨趋势),则该策略只会进行多头交易。如果超趋势为负(表示下跌趋势),则该策略只会进行空头交易。

该策略还包括一个止损水平,该水平设置为入场价格的一定百分比。这有助于在价格向与交易方向相反的方向移动时限制潜在损失。

交易方向参数可以设置为“多头”、“空头”或“双向”。这使得交易者可以选择是只进行多头交易(低买高卖)、只进行空头交易(高卖低买),还是两者都进行。这对于交易者的市场观点和风险承受能力都很有用。

使用该策略时,只需将所需的参数输入脚本,并将其应用于要交易的资产的价格图表即可。 然后,该策略将识别潜在的入场和出场点,并在价格图表上显示。

该策略的默认设置如下:

- ATR长度:5
- 因子:2.618  
- 交易方向:双向
- 止损水平:20%
- 手续费:0.1%
- 滑点:1
- 货币:美元
- 每笔交易:账户权益的10%
- 初始资金:10000美元

这些设置可以根据交易者的偏好和风险承受能力进行调整。在将任何设置更改应用于实盘交易之前,务必使用历史数据对其进行测试。

## 优势分析

该策略最大的优势在于结合了枢轴反转策略的精确性和超趋势指标的趋势过滤能力。

枢轴反转策略可以识别关键的支持和阻力区域,并捕捉快速的突破。而超趋势指标则可以过滤掉大部分假突破,只在真正趋势反转时才入场。这种组合过滤了大量噪音,可以明显提高策略的胜率和盈利率。

另一个优势是该策略适应性强,可以通过调整参数配置来适应不同市场环境。例如可以调整ATR周期参数来适应不同波动率市场,调整止损水平来控制风险,调整交易方向来限定只做多或只做空。

加入超趋势作为过滤指标,也使得策略在趋势行情中表现更优异。超趋势指标可以准确判断趋势方向,避免在震荡行情中被套。

## 风险分析

该策略最大的风险在于枢轴反转点可能发生假突破,即价格突破关键点后很快再度回调。这时如果策略立刻入场可能会被套。因此设置合理的止损水平尤为重要。

另一个风险是趋势反转失败。有时价格在突破枢轴点后继续原趋势运行,而非进行趋势反转。这时超趋势指标可以起到过滤的作用,避免错误入场。但在强势趋势行情中,这种风险仍存在。

加入超趋势作为过滤指标虽有利弊。当超趋势判断错误时,也可能错过真正的反转机会。这需要调整参数以适应不同市场情况。

整体来说,适当调整止损点位,合理配置资金使用比例,并适时调整策略参数,可以有效控制风险。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 增加多个时间周期判断,进行多时间轴验证,避免被套。

2. 增加量能指标判断,例如交易量突增等,来确认突破。

3. 优化止损机制,例如随价格移动止损、盈利后加大止损幅度等。

4. 增加机器学习成分,让策略可以自适应不同市场环境。例如自动优化参数、动态调整止损等。

5. 增加跨时间段交易,即一个时间段入场,另一个时间段止损或止盈。

6. 测试不同的过滤指标,寻找更合适的指标替代超趋势,提高策略效果。

7. 进行组合优化,与其它非相关策略进行组合,可以降低相关性,提高稳定性。

通过以上几点优化,可以显著提升策略的表现。使其更适应复杂多变的市场环境,获得更优异的回报率。

## 总结

超趋势增强枢轴反转策略是一种高效的交易策略。它结合枢轴点的高精确度和超趋势指标的强大趋势跟踪能力,过滤噪音,提高成功率。该策略可以通过调整参数来适应不同市场环境,具有很强的适应性。同时也存在一定的风险,需要适当配置资金使用比例和止损水平来控制。通过多方面优化,可以进一步增强该策略的稳定性和回报率。总体来说,本策略为交易者提供了一个强大的技术分析工具,可以获得额外的交易优势。

||


## Overview

The SuperTrend Enhanced Pivot Reversal is a unique trading approach that combines the precision of pivot reversal points and the trend-following power of the SuperTrend indicator. This strategy aims to provide clear entry and exit signals for traders while using the SuperTrend indicator to filter out potentially false signals.

Unlike traditional pivot reversal strategies, this approach utilizes the SuperTrend indicator as a filter. This means it only takes trades that align with the overall trend, as determined by the SuperTrend indicator. This can help reduce false signals and improve the overall profitability of the strategy.

The Enhanced Pivot Reversal Strategy is particularly well-suited for the cryptocurrency market due to the high volatility. This allows for rapid price changes in short periods, making it possible to profit quickly. The strategy's use of pivot points enables capturing these swift price movements by identifying potential reversal points.

## Strategy Logic

The strategy works by identifying pivot reversal points, which are points on the price chart where the price is likely to reverse. These points are identified using a combination of the ta.pivothigh and ta.pivotlow functions to locate the highest and lowest price points over a given period.

Once a pivot reversal point is identified, the strategy checks the direction of the SuperTrend indicator. If the SuperTrend is positive (indicating an uptrend), the strategy will only take long trades. If the SuperTrend is negative (indicating a downtrend), it will only take short trades. 

The strategy also incorporates a stop loss level, set as a percentage of the entry price, to limit potential losses if the price moves against the trade.

The trade direction can be set to "Long", "Short" or "Both", allowing the trader to take only long, short or both long and short trades depending on their market view and risk appetite.

## Advantages 

The main advantage of this strategy is combining the precision of pivot reversal strategies with the trend filtering capacity of the SuperTrend indicator.

The pivot reversal approach identifies key support and resistance levels and captures quick breakouts. The SuperTrend filters out many false breakouts and only enters on genuine trend reversals. This combination eliminates noise and can significantly improve win rate and profitability.

Another advantage is the adaptability of the strategy. The parameters can be adjusted to suit different market conditions. For example, the ATR period can be tuned for varying volatility, stop loss tweaked to control risk, and trade direction limited to long or short only.

Adding the SuperTrend filter also improves performance in trending markets. It accurately determines trend direction, avoiding whipsaws in ranging markets.

## Risks

The main risk is that pivot reversal points may have false breakouts, where the price quickly reverts after breaking key levels. Entering trades immediately may lead to being stopped out. Appropriate stop loss levels are crucial.

Another risk is trend reversal failure. Sometimes prices continue the trend after breaking pivot points, rather than reversing. The SuperTrend filter mitigates this but the risk remains in strong trending markets.

Using SuperTrend as a filter has pros and cons. Incorrect SuperTrend signals could lead to missing valid reversals. Parameters may need adjustment for different market conditions.  

Overall, appropriate stop loss levels, position sizing, and dynamic parameter tuning can effectively control risks.

## Enhancement Opportunities 

The strategy can be improved by:

1. Adding multi-timeframe analysis to avoid whipsaws.

2. Incorporating volume indicators to confirm breakouts.

3. Optimizing stop loss mechanisms like trailing stops and increased post-profit stops.

4. Adding machine learning for adaptive capability, like auto-parameter tuning and dynamic stops.

5. Implementing inter-timeframe trading with separate entry and stop/target timeframes.

6. Testing alternate filter indicators to potentially improve performance over SuperTrend.

7. Portfolio optimization via combining with low-correlation strategies to improve stability.

These enhancements can significantly improve performance, making the strategy more robust across diverse market environments and producing superior returns.

## Conclusion

The SuperTrend Enhanced Pivot Reversal Strategy is a highly effective approach. It combines the precision of pivot points and the strong trend-following of SuperTrend to filter noise and boost probability of success. The adaptable parameters suit various market conditions. Risks exist but can be controlled via appropriate position sizing and stops. Further optimizations can enhance stability and returns. Overall, it provides traders with a powerful technical analysis tool for added trading edge.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|leftBars|
|v_input_2|3|rightBars|
|v_input_3|5|ATR Length|
|v_input_float_1|2.618|Factor|
|v_input_string_1|0|Trade Direction: Both|Short|Long|
|v_input_4|20|Stop Loss Level (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-18 00:00:00
end: 2023-10-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © PresentTrading

//@version=5
strategy("SuperTrend Enhanced Pivot Reversal - Strategy [PresentTrading]", overlay=true, precision=3, default_qty_type=strategy.cash, 
 commission_value= 0.1, commission_type=strategy.commission.percent, slippage= 1, 
  currency=currency.USD, default_qty_type = strategy.percent_of_equity, default_qty_value = 10, initial_capital= 10000)

// Pivot Reversal parameters
leftBars = input(6)
rightBars = input(3)
swh = ta.pivothigh(leftBars, rightBars)
swl = ta.pivotlow(leftBars, rightBars)

// SuperTrend parameters
atrPeriod = input(5, "ATR Length")
factor = input.float(2.618, "Factor", step = 0.01)

[superTrend, direction] = ta.supertrend(factor, atrPeriod)

// Plot the SuperTrend
plot(superTrend, title="SuperTrend", color=color.blue)


// Trade Direction parameter
tradeDirection = input.string(title="Trade Direction", defval="Both", options=["Long", "Short", "Both"])

// Stop Loss Level (in %)
stopLossLevel = input(20, title="Stop Loss Level (%)")

// Convert the stop loss level to a price difference
stopLossPrice = stopLossLevel / 100


// Long entry
swh_cond = not na(swh)
hprice = 0.0
hprice := swh_cond ? swh : hprice[1]
le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])
if (le and direction > 0 and (tradeDirection == "Long" or tradeDirection == "Both"))
    strategy.entry("PivRevLE", strategy.long, comment="PivRevLE", stop=hprice + syminfo.mintick)
    strategy.exit("Exit Long", "PivRevLE", stop = hprice * (1 - stopLossPrice))

// Short entry
swl_cond = not na(swl)
lprice = 0.0
lprice := swl_cond ? swl : lprice[1]
se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])
if (se and direction < 0 and (tradeDirection == "Short" or tradeDirection == "Both"))
    strategy.entry("PivRevSE", strategy.short, comment="PivRevSE", stop=lprice - syminfo.mintick)
    strategy.exit("Exit Short", "PivRevSE", stop = lprice * (1 + stopLossPrice))


// Closing positions when the tradeDirection is one-sided or when SuperTrend direction changes
if ((tradeDirection == "Long" and se and direction < 0) or (tradeDirection == "Long" and direction < 0))
    strategy.close("PivRevLE")
if ((tradeDirection == "Short" and le and direction > 0) or (tradeDirection == "Short" and direction > 0))
    strategy.close("PivRevSE")

// Plot pivot highs and lows
plotshape(swh_cond, title="Pivot Highs", location=location.belowbar, color=color.green, style=shape.triangleup)
plotshape(swl_cond, title="Pivot Lows", location=location.abovebar, color=color.red, style=shape.triangledown)

// Closing positions when the tradeDirection is one-sided
if (tradeDirection == "Long" and se and direction < 0)
    strategy.close("PivRevLE")
if (tradeDirection == "Short" and le and direction > 0)
    strategy.close("PivRevSE")


```

> Detail

https://www.fmz.com/strategy/430119

> Last Modified

2023-10-25 11:15:40
