
> Name

突破点回转策略Pivot-Point-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

突破点回转策略是一种趋势跟踪策略,它通过买入高于最近支撑点的股票并在低于最近阻力点时卖出,来捕捉趋势的变化。该策略简单直接,适合对市场没有太多预判只想跟踪趋势的投资者。

## 策略原理

该策略通过计算一定天数的最高价和最低价的中点,确定最近的阻力线和支撑线。当价格突破这些关键点时,表明趋势发生变化,可以跟踪该变化方向进行交易。

具体来说,策略会先计算过去N1天的最高价中点作为阻力线,过去N2天的最低价中点作为支撑线。在买入方向,如果当天最高价超过最近阻力线,则发出买入信号。在卖出方向,如果当天最低价跌破最近支撑线,则发出卖出信号。投资者可以自行设置N1和N2的值,从而调整策略的灵敏度。

该策略简单直接,不需要预测市场,只需跟踪关键点的突破就可以捕捉趋势。当趋势向上突破阻力线时买入,向下跌破支撑线时卖出,顺势而为。

## 优势分析

- 简单容易操作,适合所有层次的投资者

该策略十分简单和直观,不需要任何预测技巧,只要跟踪阻力支撑点的突破就可以实现。这降低了操作难度,使其适合所有层次的投资者使用。

- 有效捕捉趋势变化,及时调整头寸

关键点突破是市场上公认的趋势变化信号。该策略可以在趋势发生变化时及时响应,调整头寸,避免被套牢。

- 可自定义参数,调整策略灵活度 

投资者可以自行设定看左右两边数据的天数,从而调整策略的灵敏度。看更多天数使阻力支撑线更稳固,看更少天数使策略更灵活敏感。

- 易于和其他策略组合,弹性强

该策略主要实现趋势跟踪功能,可轻松和其他选择时机的策略组合使用,提高整体回报。

## 风险分析

- 存在一定的滞后性

该策略识别趋势变化需要一定的数据积累,可能会导致买点卖点出现一定滞后。需要关注是否出现价格已经反转而信号依然延续原趋势的情况。

- 可能出现虚假突破的风险

市场短期内可能出现虚假突破关键点的情况,需要投资者具有一定的应对能力,避免被套牢。

- 回撤风险较大

该策略全仓跟踪趋势,所以存在较大的回撤风险。投资者需要考虑自己的风险承受能力。也可以适当缩小仓位规模来降低回撤。

- 需要关注交易频率控制

如果参数设置过于灵敏,可能会导致交易频率过高。需要适当调整参数,控制交易次数。也可以设置最小持仓时间来降低交易频率。

## 优化方向

- 优化参数设置

可以通过回测从长期来优化N天最高最低价的参数,找到最佳参数组合。也可以结合市场情况动态调整参数,在趋势明显时设置更灵敏的参数。

- 加入突破力度

可以对突破设置一个最小幅度,避免被小幅度的虚假突破误导。突破力度越大,趋势转换可能性越大。

- 结合其他指标过滤

可以加入像RSI,KD等其他技术指标,如果关键点突破同时指标也呈现背离则信号更有效。避免单一依靠突破产生的信号。

- 优化仓位管理

可以根据市场情况通过调整仓位来控制风险,对冲端可以设置止损来避免巨大亏损。也可以根据趋势运行情况动态调整仓位。

## 总结

突破点回转策略通过简单的关键点突破来跟踪趋势,可广泛适用于各类型投资者。该策略优势是简单易操作,能有效捕捉趋势变化,但也存在一定滞后性,虚假突破风险以及较大回撤。通过参数优化,加入过滤器,改进仓位管理等手段可以提高策略稳定性。总体来说,该策略适合追求简单的趋势跟踪投资者,但需要控制好风险。

|| 

## Overview

The pivot point breakout strategy is a trend following strategy that buys stocks when price breaks above recent resistance and sells when price breaks below recent support to capture trend changes. This simple and direct strategy suits investors who have no strong market views but just want to follow the trend.

## Strategy Logic

The strategy calculates the mid points of highest price and lowest price over a period as the recent resistance and support lines. When price breaks through these pivot points, it signals trend changes that can be traded on. 

Specifically, it calculates the mid point of highest price over past N1 days as the resistance line, and mid point of lowest price over N2 days as the support line. On the long side, if today's highest price breaks above the recent resistance line, a buy signal is triggered. On the short side, if today's lowest price breaks below the recent support line, a sell signal is triggered. Investors can customize N1 and N2 to adjust the sensitivity of the strategy.

The strategy is simple and straightforward, requiring no market prediction, just tracking pivot point breakouts to capture trends. It buys when uptrend breaks resistance and sells when downtrend breaks support to follow the trend.

## Advantage Analysis

- Simple and easy to operate, suitable for all investors

The strategy is very simple and intuitive, requiring no forecasting skills, just tracking pivot point breaks. This lowers the difficulty of operation, making it suitable for investors of all levels.

- Effectively captures trend changes and adjusts positions accordingly 

Pivot point breakout is a well-recognized signal for trend changes. The strategy can respond in a timely manner when trend changes, adjusting positions to avoid being trapped.

- Customizable parameters to adjust strategy flexibility

Investors can customize the number of days to look left and right, which adjusts the strategy's sensitivity. More days makes pivots more solid, while fewer days makes the strategy more flexible and sensitive.

- Easy to combine with other strategies for versatility

The strategy mainly provides trend following. It can be easily combined with other timing strategies to improve overall returns.

## Risk Analysis  

- Potential lagging effect

The strategy needs some data accumulation to identify trend changes, which may cause certain lags in signals. Need to watch for price reversal while signals still persist in original trend.

- Risk of false breakouts 

Markets may have short-term false breaks of pivot points. Investors need certain skills to handle whipsaws and avoid being trapped.

- Larger drawdowns

The strategy fully follows trends, thus has relatively large drawdown risks. Investors need to consider their own risk tolerance. Can also lower position sizes to reduce drawdowns.

- Need to control trade frequency

Overly sensitive parameters may lead to excessive trading frequency. Need to adjust parameters properly to control number of trades. Minimum holding period can also help lower frequency.

## Optimization Directions

- Optimize parameter tuning

Can backtest and optimize the N days for highest and lowest to find best parameter mix over long term. Can also dynamically tune parameters based on market conditions, using more sensitive settings when trend is strong.

- Add strength of breakout

Can set a minimum magnitude requirement for breakout to avoid minor false breaks. Stronger momentum on breakout signals higher chance of real trend change.

- Add other indicators as filters

Can add other technical indicators like RSI, KD etc. If breakout aligns with indicator divergences, signals are more effective. Avoid relying solely on breakouts.

- Improve position sizing  

Can size positions dynamically based on market conditions to control risk. Hedges can be stopped out to avoid huge losses. Can also adjust size based on strength of ongoing trends.

## Conclusion

The pivot point breakout strategy captures trends simply through pivotal point breaks, suitable for a wide range of investors. Its advantages are simplicity and effectively capturing trend changes, but it also has some lagging issues, whipsaw risks and large drawdowns. Parameters tuning, adding filters and improving position sizing can enhance the strategy's stability. Overall it suits investors seeking simple trend following, but risks need to be managed properly.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|Order direction: Long|Both|Short|
|v_input_int_1|3|(?Pivot high)Left|
|v_input_int_2|3|Right|
|v_input_int_3|3|(?Pivot low)Left|
|v_input_int_4|3|Right|
|v_input_1|false|(?Date selection)Starting date|
|v_input_2|false|Final date|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-27 00:00:00
end: 2023-09-26 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © EduardoMattje

//@version=5
strategy("Pivot Point Breakout", "PPB", true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, process_orders_on_close=true)

// Constants

var L_PIVOT_HIGH = "Pivot high"
var L_PIVOT_LOW = "Pivot low"

var LEFT = "Left"
var RIGHT = "Right"

var BOTH = "Both"
var LONG = "Long"
var SHORT = "Short"

var DATES = "Date selection"
var DATES_TOOLTIP = "Change it to limit the trades for the given time interval.\n\nLeave it to disable this behaviour."

// Inputs

var orderDirection = input.string(LONG, "Order direction", options=[BOTH, LONG, SHORT])

var leftHigh = input.int(3, LEFT, minval=0, inline=L_PIVOT_HIGH, group=L_PIVOT_HIGH)
var rightHigh = input.int(3, RIGHT, minval=0, inline=L_PIVOT_HIGH, group=L_PIVOT_HIGH)

var leftLow = input.int(3, LEFT, minval=0, inline=L_PIVOT_LOW, group=L_PIVOT_LOW)
var rightLow = input.int(3, RIGHT, minval=0, inline=L_PIVOT_LOW, group=L_PIVOT_LOW)

var startDate = input(0, "Starting date", group=DATES)
var endDate = input(0, "Final date", group=DATES)

//

var float lastHigh = na
var float lastLow = na

lowPivot = ta.pivotlow(leftLow, rightLow)
highPivot = ta.pivothigh(leftHigh, rightHigh)

f_updateLevels(pivot_) => 
    var float pastLevel = na
    
    if not na(pivot_)
        pastLevel := pivot_
    
    pastLevel
    
lastLow := f_updateLevels(lowPivot)
lastHigh := f_updateLevels(highPivot)

// Validates the time interval

validTrade =  true

// Orders

if high > lastHigh
    strategy.entry("Long", strategy.long, when=orderDirection != SHORT and validTrade)
    strategy.close("Short", when=orderDirection == SHORT)
if low < lastLow
    strategy.entry("Short", strategy.short, when=orderDirection != LONG and validTrade)
    strategy.close("Long", when=orderDirection == LONG)
    
// Plots

plot(lastLow, "Last pivot low", color.red, offset=1)
plot(lastHigh, "Last pivot high", color.teal, offset=1)

plotshape(lowPivot, "Pivot low", location=location.belowbar, color=color.red, offset=-rightLow)
plotshape(highPivot, "Pivot high", color=color.teal, offset=-rightHigh)

```

> Detail

https://www.fmz.com/strategy/427991

> Last Modified

2023-09-27 16:35:26
