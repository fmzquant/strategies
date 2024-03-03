
> Name

三条Supertrend策略Three-Supertrend-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

Supertrend策略原理解析

Supertrend策略是一种趋势跟踪策略,它通过计算平均真实波幅(ATR)并绘制Supertrend线来判断趋势方向。本策略使用三组不同参数绘制三条Supertrend线,当价格突破Supertrend线时产生交易信号。

该策略首先计算三组ATR和因子,分别用于绘制三条Supertrend线。ATR反映了价格的波动性,因子则决定Supertrend线与价格的敏感度。本策略分别采用较短期、中期和较长期的参数组合,以捕捉不同周期的趋势变化。 

当价格上穿Supertrend线时,表示当前处于上升趋势,该策略会开仓做多;当价格下穿Supertrend线时,表示当前处于下降趋势,该策略会开仓做空。三条Supertrend线可产生更多交易机会,同时相互验证有助于减少错误信号。

此外,该策略还采用change函数判断Supertrend线的方向是否发生变化。仅当Supertrend线方向改变时才产生新信号,避免平仓之后立即反向开新仓的情况发生。最后,该策略还提供平仓全仓和撤单功能,提高策略的实战性。

总体来说,Supertrend策略充分利用趋势跟踪指标Supertrend线的优势,采用多组参数捕捉不同周期趋势,同时设计合理的入场与出场机制,可作为趋势跟踪策略的参考。

Supertrend策略优势解析

Supertrend策略具有以下优势:

1. 捕捉趋势变化能力强

通过计算ATR并绘制动态Supertrend线,可灵活捕捉市场趋势的变化,避免被震荡市场误导。

2. 多组参数设计

采用三组不同参数计算三条Supertrend线,可在短、中、长时间周期同时捕捉趋势,机会更多。

3. 反转验证机制

仅在Supertrend线方向改变时产生新信号,避免无谓反复交易,验证信号可靠性。 

4. 实战性设计

设置平仓全仓功能可一键清仓,撤单功能可应对突发事件,提高实盘运用能力。

5. 策略逻辑简单清晰

以Supertrend为基础,信号规则单一明确,易于操作和验证,适合量化交易初学者。

Supertrend策略风险提示

Supertrend策略也存在以下风险:

1. 容易产生虚假信号

在震荡行情中,Supertrend线可能频繁上下交叉,产生过多虚假信号导致亏损。

2. 参数优化难度大

多组参数组合优化难度较大,不合适的参数可能降低策略效果。

3. 无法告知趋势反转点

Supertrend策略仅依赖趋势判断,无法确定潜在的趋势反转点,需要辅助其他指标。

4. 面临突发事件风险 

极端行情下无法有效控制风险,需要搭配止损策略管理风险。

5. 回测曲线拟合风险

优化参数使回测结果优于历史数据,但无法保证未来有效性,需要谨慎评估。

Supertrend策略总结

Supertrend策略整体来说是一个简单实用的趋势跟踪策略。它利用Supertrend线的动态特征判断趋势方向,采用多组参数设计提高效果。同时策略机制合理,具有一定的实战性。但该策略也存在一些问题,如产生假信号、难以优化参数等,需要加入其他技术指标进行优化。总体而言,Supertrend策略适用于追踪中长期趋势,可作为初学者参考的趋势跟踪策略模板。

||
Supertrend Strategy Principle Analysis

The Supertrend strategy is a trend-following strategy that determines trend direction by calculating the Average True Range (ATR) and plotting Supertrend lines. This strategy uses three sets of parameters to plot three Supertrend lines and generate trading signals when the price breaks through the lines.

The strategy first calculates three sets of ATR and factors to plot three Supertrend lines. The ATR reflects price volatility while the factor determines the sensitivity of the Supertrend lines to price. This strategy adopts combinations of short-term, medium-term and long-term parameters to capture trend changes across different timeframes.

When the price crosses above the Supertrend line, it signals an uptrend and the strategy will go long. When the price crosses below the line, it signals a downtrend and the strategy will go short. The three Supertrend lines can generate more trading opportunities while also validating signals to reduce false signals.

In addition, the strategy uses the change function to check if the Supertrend line direction has changed. New signals are generated only when the direction changes, avoiding new trades immediately after closing positions. Finally, the strategy offers close all and cancel all functions to improve tradability.

In summary, the Supertrend strategy fully utilizes the advantages of the Supertrend indicator to capture trends across timeframes using multiple parameters sets. It also incorporates proper entry and exit systems and can serve as a reference for trend following strategies.

Supertrend Strategy Advantages

The Supertrend strategy has the following advantages:

1. Strong ability to capture trend changes - The dynamic Supertrend lines can flexibly capture trend changes in the market and avoid false signals from ranging markets.

2. Multiple parameter sets - Using three parameter sets to plot three Supertrend lines allows capturing trends across short, medium and long timeframes for more opportunities. 

3. Reversal validation mechanism - Generating new signals only when the Supertrend line direction changes avoids unnecessary whipsaws and verifies signal reliability.

4. Practical design - The close all positions and cancel all orders functions improve real-world tradability. 

5. Simple and clear logic - Using Supertrend as the basis with straightforward signal rules makes it easy to operate and test. Suitable for quantitative trading beginners.

Supertrend Strategy Risks  

The Supertrend strategy also has the following risks:

1. Prone to false signals - Frequent crosses of the Supertrend lines may generate excessive false signals and losses in ranging markets.

2. Difficult parameter optimization - Optimizing multiple parameter sets can be challenging. Unsuitable parameters may degrade performance.

3. Unable to identify trend reversal points - Relies solely on trend direction without determining potential trend reversions. Requires additional indicators.

4. Extreme events risks - Unable to effectively control risks in extreme market conditions. Requires stop loss strategies to manage risk.

5. Curve fitting bias - Optimized parameters can overfit historical data but may not remain effective in the future. Require prudent evaluation.

Supertrend Strategy Summary

Overall, the Supertrend strategy is a simple and practical trend following system. It capitalizes on the dynamic Supertrend lines to determine trend direction and uses multiple parameter sets to improve performance. The strategy mechanisms are also reasonably designed for tradability. However, issues like false signals and difficult parameter optimization requires combining with other technical indicators for improvements. In general, the Supertrend strategy works well for medium to long-term trend tracking and can serve as a reference strategy template for beginners.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Close_all_Position|
|v_input_2|false|Check To Cancel|
|v_input_3|7|ATR Length-1|
|v_input_4|1.5|Factor-1|
|v_input_5|10|ATR Length-2|
|v_input_6|2|Factor-2|
|v_input_7|20|ATR Length-3|
|v_input_8|3|Factor-3|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-14 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MarketShree 

//@version=4
// strategy("Supertrend Strategy", overlay=true, default_qty_value=15)
closs_all=input(title="Close_all_Position", type=input.bool, defval=false)
cancel=input(title="Check To Cancel", type=input.bool, defval=false)

atrPeriod1 = input(7, "ATR Length-1")
factor1 = input(1.5,"Factor-1",type=input.float)
atrPeriod2 = input(10, "ATR Length-2")
factor2 = input(2, "Factor-2")
atrPeriod3 = input(20, "ATR Length-3")
factor3 = input(3, "Factor-3")

[superTrend1, direction1] = supertrend(factor1, atrPeriod1)
[superTrend2, direction2] = supertrend(factor2, atrPeriod2)
[superTrend3, direction3] = supertrend(factor3, atrPeriod3)

if change(direction1) < 0
    strategy.entry("LONG", strategy.long)

if change(direction1) > 0
    strategy.entry("SHORT", strategy.short)
strategy.close_all(when=closs_all,comment ="All postion are closed")
strategy.cancel_all(when=cancel)

if change(direction2) < 0
    strategy.entry("LONG", strategy.long)

if change(direction2) > 0
    strategy.entry("SHORT", strategy.short)
strategy.close_all(when=closs_all,comment ="All postion are closed")
strategy.cancel_all(when=cancel)
    
if change(direction3) < 0
    strategy.entry("LONG", strategy.long)

if change(direction3) > 0
    strategy.entry("SHORT", strategy.short)
strategy.close_all(when=closs_all,comment ="All postion are closed")
strategy.cancel_all(when=cancel)

colResistance = direction1 == 1 and direction1 == direction1[1] ? color.new(color.red, 0) : color.new(color.red, 100)
colSupport = direction1 == -1 and direction1 == direction1[1] ? color.new(color.green, 0) : color.new(color.green, 100)
plot(superTrend1, color = colResistance, linewidth=2)
plot(superTrend1, color = colSupport, linewidth=2)    

colResistance1 = direction2 == 1 and direction2 == direction2[1] ? color.new(color.red, 0) : color.new(color.red, 100)
colSupport1 = direction2 == -1 and direction2 == direction2[1] ? color.new(color.green, 0) : color.new(color.green, 100)
plot(superTrend2, color = colResistance, linewidth=2)
plot(superTrend2, color = colSupport, linewidth=2)

colResistance2 = direction3 == 1 and direction3 == direction3[1] ? color.new(color.red, 0) : color.new(color.red, 100)
colSupport2 = direction3 == -1 and direction3 == direction3[1] ? color.new(color.green, 0) : color.new(color.green, 100)
plot(superTrend3, color = colResistance1, linewidth=2)
plot(superTrend3, color = colSupport1, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/426928

> Last Modified

2023-09-15 15:59:15
