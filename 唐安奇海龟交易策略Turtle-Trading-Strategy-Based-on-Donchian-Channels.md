
> Name

唐安奇海龟交易策略Turtle-Trading-Strategy-Based-on-Donchian-Channels

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/da65fe1b269e54a44d.png)
[trans]
## 概述

唐安奇海龟交易策略是一个非常简化的海龟交易策略。它与原始的海龟交易策略有很大不同。该策略使用两个唐奇安通道,快速通道和缓慢通道。通道周期由用户设置,默认值为快速通道20根K线,缓慢通道50根K线。策略利用缓慢通道的上下轨来进行入场,快速通道的中轨来设置止损。

## 策略原理

该策略的核心逻辑是:

1. 计算快速通道:取最近fast根K线的最高价为通道上轨,最低价为通道下轨。通道中轨为上下轨的平均值。

2. 计算缓慢通道:取最近slow根K线的最高价为通道上轨,最低价为通道下轨。 

3. 当无持仓时,做多信号为价格触及缓慢通道上轨;做空信号为价格触及缓慢通道下轨。

4. 开仓后以快速通道中轨作为止损线。

5. 持仓过程中,交易信号与开仓信号相反时,平仓离场。

## 优势分析

该策略具有以下优势:

1. 规则简单易执行。唐奇安通道和移动止损容易理解,适合初学者。

2. 可自定义参数。用户可以根据交易品种和时间周期调整参数,适应不同市场环境。

3. 冲突交易信号少。仅依赖价格突破通道上下轨Generate,避免常见指标产生虚假信号的状况。

4. 自动止损管理风险。快速通道中轨移动止损,可以限制单笔止损。

## 风险分析

该策略面临以下风险:

1. 价格震荡趋势不明显时,会产生较多止损。这会影响策略盈利能力。

2. 回撤可能较大。当趋势产生转折时,在전运动方向上的浮亏都会化为实际亏损。

3. 参数设置不当可能导致过于激进或保守。这需要通过反复测试得出适合的数值。

4. 机械化交易依赖程度高。需确保服务器稳定性,避免异常导致无法正常自动化交易。


为降低上述风险,可通过优化参数设置、适当限制仓位规模、增加风控模块等方式进行改进。

## 优化方向 

该策略可从以下几个方向进行优化:

1. 增加开仓过滤条件,避免趋势转折点错过信号。例如结合趋势指数等指标判断趋势分析。

2. 优化参数设置,使之更贴合不同交易品种。例如快慢通道周期、仓位大小等。

3. 增加风控模块。例如最大回撤、日内损失限制等。避免风险事件导致较大亏损。

4. 优化止损策略。例如trailing stop等动态止损方式,让止损更贴合市场趋势。

## 总结

唐安奇海龟交易策略整体是一个非常简单的趋势跟踪策略。它的优点是易于理解,容易自动化执行,适合程序化交易。但也存在一定的风险,需要进一步优化使其 parameters 更符合实际市场情况。通过参数调整、优化开仓信号、增加风控模块等手段,可以使该策略的实战效果更佳。

||

## Overview

The Tang Anqi Turtle Trading Strategy is a highly simplified version of the original Turtle Trading Strategy. It is very different from the original Turtle strategy. The strategy uses two Donchian Channels, a fast channel and a slow channel. The channel periods are set by the user, with default values of 20 bars for the fast channel and 50 bars for the slow channel. The strategy utilizes the upper and lower bands of the slow channel to entry trades and the middle band of the fast channel to set stop loss.  

## Strategy Logic

The core logic of this strategy is:

1. Calculate the fast Donchian Channel: The upper band is the highest high over the past fast bars, the lower band is the lowest low, and the middle band is the average of the upper and lower bands.

2. Calculate the slow Donchian Channel: The upper band is the highest high over the past slow bars, the lower band is the lowest low.

3. When there is no position, a long signal is triggered when price touches the upper band of the slow channel, and a short signal is triggered when price touches the lower band of the slow channel.  

4. After opening a position, the middle band of the fast channel is used as the stop loss.

5. Close the position when there is an opposite signal as the opening signal during the holding period.

## Advantage Analysis 

The advantages of this strategy are:

1. Simple rules easy to implement. Donchian Channels and moving stop loss are easy to understand, suitable for beginners.

2. Customizable parameters. Users can adjust parameters based on trading products and timeframes to adapt to different market environments.  

3. Few conflicting trading signals. Only relies on price breakouts of channel bands, avoids false signals from common indicators.  

4. Automatic stop loss management. The moving stop loss based on the fast channel middle band can limit losses on single trades.

## Risk Analysis

The risks facing this strategy include:

1. More stop loss when trend is unclear. This affects the profitability of the strategy. 

2. Larger drawdowns possible. When trend reverses, floating profits in the previous trend direction will realize into losses.  

3. Improper parameter settings lead to over-aggressiveness or over-conservativeness. Proper values need to be found through repeated backtesting.

4. High dependence on automated trading. Server stability is important to avoid exceptions leading to failure in automated trading.

To reduce the above risks, parameters can be optimized, position sizing can be appropriately limited, and risk management modules can be added.

## Optimization Directions

The strategies can be improved in the following aspects:

1. Add filters for entry signals to avoid catching trend reversal signals. For example, use trend indicators to determine trend direction.

2. Optimize parameters like channel periods and position sizing to fit different trading instruments better. 

3. Add risk management modules like maximum drawdown limits and daily loss limits to prevent excessive losses in extreme events.

4. Improve stop loss strategies. For example, adopt trailing stop loss to make stops more adaptive to market trends.

## Conclusion

In summary, the Tang Anqi Turtle Trading Strategy is a simple trend following system. Its advantages lie in its ease of understanding and automation. But it also carries certain risks, and further optimizations on parameters and risk management are needed to make it more practical. With measures like parameter tuning, adding filters, and risk control modules, the strategy can achieve better results in live trading.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Lot long, %|
|v_input_4|100|Lot short, %|
|v_input_5|20|fast|
|v_input_6|50|slow|
|v_input_7|true|Show offset|
|v_input_8|true|Show lines|
|v_input_9|false|Show label (drawdown)|
|v_input_10|true|Show background|
|v_input_11|1900|From Year|
|v_input_12|2100|To Year|
|v_input_13|true|From Month|
|v_input_14|12|To Month|
|v_input_15|true|From day|
|v_input_16|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-26 00:00:00
end: 2024-02-15 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2020

//@version=4
strategy("Noro's SimpleTurtle Strategy", shorttitle = "SimpleTurtle str", overlay = true, default_qty_type = strategy.percent_of_equity, initial_capital = 100, default_qty_value = 100, commission_value = 0.1)

//Settings
needlong  = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
sizelong  = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot long, %")
sizeshort = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot short, %")
fast      = input(20, minval=1)
slow      = input(50, minval=1)
showof    = input(true, defval = true, title = "Show offset")
showll    = input(true, defval = true, title = "Show lines")
showdd    = input(false, defval = true, title = "Show label (drawdown)")
showbg    = input(true, defval = true, title = "Show background")
fromyear  = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear    = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth   = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday   = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today     = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Donchian price channel fast
hf = highest(high, fast)
lf = lowest(low, fast)
center = (hf + lf) / 2

//Donchian price chennal slow
hs = highest(high, slow)
ls = lowest(low, slow)

//Lines
colorpc = showll ? color.blue : na
colorsl = showll ? color.red : na
offset = showof ? 1 : 0
plot(hs, offset = offset, color = colorpc)
plot(ls, offset = offset, color = colorpc)
plot(center, offset = offset, color = colorsl)

//Background
size = strategy.position_size
colorbg = showbg == false ? na : size > 0 ? color.lime : size < 0 ? color.red : na
bgcolor(colorbg, transp = 70)

//Orders
truetime = true
lotlong = 0.0
lotshort = 0.0
lotlong := size != size[1] ? strategy.equity / close * sizelong / 100 : lotlong[1]
lotshort := size != size[1] ? strategy.equity / close * sizeshort / 100 : lotshort[1]

//Orders
strategy.entry("Long", strategy.long, lotlong, stop = hs, when = needlong and strategy.position_size == 0 and truetime)
strategy.entry("Short", strategy.short, lotshort, stop = ls, when = needshort and strategy.position_size == 0 and truetime)
strategy.exit("Long", stop = center, when = needlong and strategy.position_size > 0)
strategy.exit("Short", stop = center, when = needshort and strategy.position_size < 0)
if true
    strategy.close_all()
    strategy.cancel("fast L")
    strategy.cancel("fast S")
    strategy.cancel("slow L")
    strategy.cancel("slow S")
    
if showdd

    //Drawdown
    max = 0.0
    max := max(strategy.equity, nz(max[1]))
    dd = (strategy.equity / max - 1) * 100
    min = 100.0
    min := min(dd, nz(min[1]))
    
    //Label
    min := round(min * 100) / 100
    labeltext = "Drawdown: " + tostring(min) + "%"
    var label la = na
    label.delete(la)
    tc = min > -100 ? color.white : color.red
    osx = timenow + round(change(time)*10)
    osy = highest(100)
    la := label.new(x = osx, y = osy, text = labeltext, xloc = xloc.bar_time, yloc = yloc.price, color = color.black, style = label.style_labelup, textcolor = tc)
```

> Detail

https://www.fmz.com/strategy/442840

> Last Modified

2024-02-26 14:35:02
