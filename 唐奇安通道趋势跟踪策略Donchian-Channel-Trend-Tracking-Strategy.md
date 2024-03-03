
> Name

唐奇安通道趋势跟踪策略Donchian-Channel-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/129926b3079bfce9a6f.png)
[trans]

## 概述

唐奇安通道趋势跟踪策略是一种基于唐奇安通道指标的趋势跟踪策略。该策略通过计算不同周期的最高价和最低价,形成上轨、下轨和中轨,来判断行情趋势方向,实现趋势跟踪交易。

## 策略原理

该策略首先设置了回测时间范围,然后定义了多头和空头开仓规则。

对于多头来说,当价格上穿唐奇安通道的上轨时,进行多头开仓;当价格下破下轨时,进行多头平仓。

对于空头来说,当价格下穿唐奇安通道的下轨时,进行空头开仓;当价格上破上轨时,进行空头平仓。

策略还引入ATR指标来设置止损退出机制。ATR值乘以一个系数作为止损位。

具体来说,多头止损为开仓价减去ATR止损值;空头止损为开仓价加上ATR止损值。

该策略同时绘制了唐奇安通道的上下轨,以及ATR止损线,形成完整的交易系统。

## 策略优势

- 使用唐奇安通道判断趋势方向,具有一定的趋势跟踪能力。

- 唐奇安通道Smoother参数可调,可以通过参数优化寻找最佳参数组合。

- 结合ATR指标设置止损机制,可以有效控制风险。

- 多空头交易规则清晰易懂,适合入门学习。

- 代码结构清晰,易于理解和二次开发。

## 策略风险

- 唐奇安通道对于盘整范围内的价格震荡,存在一定的错误交易风险。

- ATR止损范围设置不当,可能造成止损过于宽泛或过于敏感。

- 多空头仓位可能过于集中,需要设置头寸管理规则。

- 需要对交易品种适用性进行验证,不同品种参数需要独立优化。

- 交易费用也需要考虑进去,高费用环境下需要调整。

## 策略优化方向

- 优化唐奇安通道的通道周期参数,寻找最佳参数组合。

- 尝试不同的ATR系数设置,找到最佳的止损范围。

- 尝试在ATR止损的基础上,引入移动止损来锁定利润。

- 根据市场情况,适当调整多空头仓位比例。

- 测试不同品种参数健壮性,寻找通用参数组合。

- 研究引入音叉指标等过滤器,提高策略稳定性。

- 根据不同交易成本环境测试参数的适应性。

## 总结

综上所述,该策略整体是一个较为简单的趋势跟踪策略,核心在于唐奇安通道的应用。该策略优势在于简单易懂,适合用于学习,但仍需针对参数和风险进行优化。通过丰富多样的优化手段,有望提升策略的稳定性和盈利能力。

||


## Overview

The Donchian Channel trend tracking strategy is a trend tracking strategy based on the Donchian Channel indicator. The strategy calculates the highest high and lowest low over different periods to form upper, lower and middle bands to determine the trend direction for trend tracking trading.

## Strategy Logic

The strategy first sets the backtesting time range, and then defines the long and short entry rules.

For long positions, open long when the price breaks above the upper band of the Donchian Channel; close long when the price breaks below the lower band.

For short positions, open short when the price breaks below the lower band of the Donchian Channel; close short when the price breaks above the upper band. 

The strategy also incorporates the ATR indicator to set stop loss exit mechanism. The ATR value multiplied by a coefficient is used as the stop loss level.

Specifically, the long stop loss is the entry price minus the ATR stop loss value; the short stop loss is the entry price plus the ATR stop loss value.

The strategy also plots the upper and lower bands of the Donchian Channel and the ATR stop loss line to form a complete trading system.

## Advantages

- Use Donchian Channel to determine trend direction, with some trend tracking capability.

- The Donchian Channel smoother parameter is adjustable, allowing parameter optimization to find the best parameter combination.

- The stop loss mechanism with ATR can effectively control risks.

- The long and short trading rules are simple and easy to understand, suitable for beginners.

- The code structure is clear and easy to understand and modify.

## Risks

- The Donchian Channel may have some whipsaw trades during range-bound price fluctuations.

- Improper ATR stop loss range setting may cause too wide or too sensitive stop loss. 

- Long and short positions could be too concentrated, requiring position sizing rules.

- The strategy needs to be tested for applicability on different products, with independent parameter optimization.

- Trading costs also need to be considered, parameters may need adjustment in high-cost environments.

## Enhancement Opportunities

- Optimize the period parameters of the Donchian Channel to find the best parameter combination.

- Try different ATR coefficients to find the optimal stop loss range.

- Try introducing trailing stop loss on top of the ATR stop loss to lock in profits.

- Adjust long/short position ratio based on market conditions.

- Test parameter robustness on different products to find generic parameters.

- Study incorporating MACD and other filters to improve stability.

- Test parameter adaptiveness under different trading cost environments.

## Summary

In summary, this is a relatively simple trend tracking strategy that centers on the application of the Donchian Channel. The advantage lies in its simplicity and ease of understanding, making it suitable for learning purposes, but parameters and risks still need further optimization. With diverse enhancement techniques, the strategy stability and profitability could potentially be improved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2017|From Year|
|v_input_4|true|To Day|
|v_input_5|true|To Month|
|v_input_6|9999|To Year|
|v_input_7|true|Can Enter Long Position|
|v_input_8|false|Can Enter Short Position|
|v_input_9|true|Show Donchian Long Channels|
|v_input_10|false|Show Donchian Short Channels|
|v_input_11|false|Enable ATR Stop Rule|
|v_input_12|20|longUpperLength|
|v_input_13|10|longLowerLength|
|v_input_14|10|shortUpperLength|
|v_input_15|20|shortLowerLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-30 00:00:00
end: 2023-11-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © kriswaters

//@version=4
strategy("Donchian Channels Strategy by KrisWaters", overlay=true ) 

// Date filter
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromYear  = input(defval = 2017, title = "From Year", minval = 1900)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

// Strategy Settings
canEnterLong = input(true, title="Can Enter Long Position")
canEnterShort = input(false, title="Can Enter Short Position")

showLongChannel = input(true, title="Show Donchian Long Channels")
showShortChannel = input(false , title="Show Donchian Short Channels")

useAtrAsStopRule = input(false, title="Enable ATR Stop Rule") 

// DonCcian Channel Lengths
longUpperLength = input(20, minval=1)
longLowerLength = input(10, minval=1)

shortUpperLength = input(10, minval=1)
shortLowerLength = input(20, minval=1)

// Donchian indicator calculations
longUpperValue = highest(high,longUpperLength)
longLowerValue = lowest(low,longLowerLength)

shortUpperValue = highest(high,shortUpperLength)
shortLowerValue = lowest(low,shortLowerLength)

// Plot Donchian Channels
uLong = plot(showLongChannel ? longUpperValue : na, color=color.green, offset=1)
lLong = plot(showLongChannel ? longLowerValue : na, color=color.green, offset=1)

uShort = plot(showShortChannel ? shortUpperValue : na, color=color.red, offset=1)
lShort = plot(showShortChannel ? shortLowerValue : na, color=color.red, offset=1)

// Styling
fill(uLong,lLong, color=color.green, transp=95, title="Long Arkaplan")
fill(uShort,lShort, color=color.red, transp=95, title="Short Arkaplan")

// Stop-loss value calculations
atrMultiplier = 2.0
atrValue = atr(20)
longStopValue = open - (atrMultiplier*atrValue)
shortStopValue = open + (atrMultiplier*atrValue)

// Plot stop-loss line
plot(useAtrAsStopRule ? longStopValue : na, color=color.red, linewidth=2, offset=1)
plot(useAtrAsStopRule ? shortStopValue : na, color=color.red, linewidth=2, offset=1)

// Long and Short Position Rules
if canEnterLong and na(longUpperValue) != true and na(longLowerValue) != true and window()
    strategy.entry("Long", true, stop=longUpperValue)
    strategy.exit("Long Exit", "Long", stop=useAtrAsStopRule ? max(longLowerValue,longStopValue) : longLowerValue)
    
if canEnterShort and na(shortUpperValue) != true and na(shortLowerValue) != true and window()
    strategy.entry("Short", false, stop=shortLowerValue)
    strategy.exit("Short Exit", "Short", stop=useAtrAsStopRule ? min(shortUpperValue,shortStopValue) : shortUpperValue)
    

```

> Detail

https://www.fmz.com/strategy/431269

> Last Modified

2023-11-06 15:52:56
