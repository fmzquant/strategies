
> Name

黄金快速突破策略Breakout-Scalper-Catching-Trend-Changes-Quickly

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/123bebb69b39bee473d.png)

[trans]


## 概述

黄金快速突破策略是一个利用快线和慢线进行突破交易的策略。它设置快速窗口和慢速窗口来判断趋势方向,并在突破点进行入场。同时它也设置了止损平仓点来控制风险。该策略适用于高波动的品种,可以捕捉趋势的快速变化来获利。

## 策略原理

该策略同时设置了一个快速窗口和一个慢速窗口。快速窗口默认是13周期,用于捕捉短期趋势;慢速窗口默认是52周期,用于判断中长期趋势方向。策略计算快速窗口和慢速窗口的中线,并绘制在图表上。当快速中线上穿慢速中线时,表示短期趋势变化,有可能形成新的上涨趋势;当快速中线下穿慢速中线时,表示短期趋势转向,有可能形成新的下跌趋势。

在快速中线上穿慢速中线时,如果即时价格也高于快速中线,则形成买入信号,以慢速窗口最高价作为买入停损单,进行做多开仓。在快速中线下穿慢速中线时,如果即时价格也低于快速中线,则形成卖出信号,以慢速窗口最低价作为卖出停损单,进行做空开仓。

此外,策略也设置了止损平仓点。做多止损平仓点为快速窗口最低价和慢速窗口最低价的较大值,做空止损平仓点为快速窗口最高价和慢速窗口最高价的较小值。这可以确保止损点位于当前趋势方向之外,以控制风险。

当不满足做多做空条件时,策略会平仓。这可以避免当趋势盘整时带来不必要的损失。

## 优势分析

该策略具有以下优势:

1. 快速判断趋势变化,适合高波动品种。通过快速窗口和慢速窗口的结合,可以快速捕捉到短期和中长期趋势的变化,适合如黄金等高波动品种。

2. 风险控制到位。通过合理的止损机制,可以及时止损,有效控制策略风险。

3. 交易逻辑清晰简单。基于快慢均线交叉进行判断,然后设定合理的止损点,非常简单明了。

4. 容易优化和扩展。可以通过调整参数等方式进行优化,也可以加入更多判断指标进行扩展。

## 风险分析

该策略也存在一些风险:

1. 快速窗口容易被噪音影响。快速窗口作为短期判断指标,可能受到较大的市场噪音影响,导致产生错误信号。

2. 慢速窗口有滞后性。中长期趋势转向时,慢速窗口可能存在一定滞后,导致信号判断滞后。

3. 止损点可能过于接近。止损点直接取快慢窗口数据,可能距离最近价格过近,容易被止损。

4. 无法有效处理盘整市场。当市场持续盘整时,该策略容易产生错误信号导致亏损。

对应解决方法:

1. 调整快速窗口周期,加入其他过滤指标。

2. 优化慢速窗口周期,加入移动平均线等指标辅助判断。 

3. 设置止损点与最近价格有一定缓冲区。

4. 增加对盘整的判断指标,避免错信号。

## 优化方向 

该策略可以从以下几个方向进行优化:

1. 优化快速窗口和慢速窗口的周期参数,使之更好适应不同品种。

2. 增加仓位管理机制,通过调整仓位来控制风险。

3. 增加止盈策略,在盈利一定比例后主动止盈。

4. 增加更多指标过滤,形成更稳定的交易信号。比如增强买卖点,避免错误信号。

5. 增加对于特定形态的判断,如三角形收敛、头肩顶背驰等,以提升策略的胜率。

6. 增加机器学习算法,利用大数据训练判断模型,自动优化策略的参数。

## 总结

黄金快速突破策略是一个基于快慢均线交叉的趋势突破策略。它能够快速捕捉趋势变化,适合如黄金等高波动品种。同时它也设置了合理的止损机制来控制风险。该策略具有交易逻辑简单清晰、易于优化等优点。我们也通过分析找到该策略可能存在的风险,并给出了相应的优化方向。总体来说,该策略为我们提供了一个高效捕捉趋势变化的思路,具有很好的实用价值。通过不断优化和改进,可以将其打造成一个稳定可靠的趋势突破交易系统。

|| 

## Overview

The Breakout Scalper strategy is a breakout trading strategy that utilizes fast and slow moving averages to identify trend changes. It sets up entry stops and trailing exit stops for risk management. The strategy closes positions manually when the market goes sideways. It is suitable for volatile instruments to capitalize on fast trend shifts.

## Strategy Logic

The strategy employs a fast window and a slow window. The default periods are 13 and 52 respectively. The fast window captures short-term trends while the slow window determines overall market direction. The mid prices of the two windows are plotted. When the fast mid-price crosses above the slow mid-price, an uptrend may be forming. When the fast mid-price crosses below the slow one, a downtrend may be starting.

When the fast mid-price is above the slow mid-price, and the instant price is also above the fast mid-price, a buy signal is generated. The entry stop is placed at the slow window's highest price. When the fast mid-price is below the slow one, and the instant price is below the fast mid-price, a sell signal is triggered, with the entry stop at the slow window's lowest price.

In addition, exit stops are defined for risk control. The long exit stop is the max of the fast and slow windows' lowest prices. The short exit stop is the min of the fast and slow windows' highest prices. This ensures the stops are placed outside the current trend direction for risk mitigation.

Positions are closed when the entry conditions are no longer valid, avoiding unnecessary losses during sideways markets.

## Advantage Analysis

The key advantages of this strategy include:

1. Quickly catches trend changes suitable for volatile assets. The combination of the fast and slow windows enables responsive trend change detection.

2. Effective risk management via reasonable stops. The stops allow timely exits to control losses.

3. Simple and clear logic based on moving average crosses and stops. Easy to understand and implement.

4. Easily optimizable and extensible. Parameters can be tuned and more indicators can be added.

## Risk Analysis

The main risks are:

1. Fast window prone to noise. Market noise can generate incorrect signals.

2. Slow window lag. Turning points may be detected late. 

3. Stops too close to market. Stops based directly on window prices may be too tight.

4. Sideways markets lead to whipsaws. Choppy markets generate false signals.

Mitigations:

1. Optimize fast window and add filters.

2. Improve slow window and add confirming indicators.

3. Buffer stops from market price. 

4. Detect sideways and avoid signals.

## Optimization Opportunities

The strategy can be enhanced in several aspects:

1. Optimize window periods for different assets.

2. Add position sizing for better risk control. 

3. Implement profit taking mechanisms.

4. Add more filters to create robust signals.

5. Incorporate pattern detection like triangles and divergences.

6. Utilize machine learning to optimize parameters.

## Conclusion

The Breakout Scalper aims to catch trend changes quickly based on fast and slow moving average crosses. It is suitable for volatile markets like gold. The stops provide risk management. The simple logic makes it easy to understand and optimize. The identified risks and enhancements offer ways to improve the strategy further. Overall, this is an efficient trend trading system that can be refined into a robust approach.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|Fast Window|
|v_input_2|52|Slow Window|
|v_input_3|3|Instant Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-17 00:00:00
end: 2023-10-24 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Breakout Scalper", overlay=true)

fast_window = input(title="Fast Window",  defval=13, minval=1)
slow_window = input(title="Slow Window",  defval=52, minval=1)
instant_period = input(title="Instant Period",  defval=3, minval=1)

fast_low = lowest(fast_window)
fast_high = highest(fast_window)
fast_mid = (fast_low + fast_high) / 2

slow_low = lowest(slow_window)
slow_high = highest(slow_window)
slow_mid = (slow_low + slow_high) / 2

instant_price = ema(close, instant_period)

plot(instant_price, title="Instant Price", color=black, transp=50)
fp = plot(fast_mid, title="Fast Mid", color=green)
sp = plot(slow_mid, title="Slow Mid", color=red)
fill(fp, sp, color=(fast_mid > slow_mid ? green : red))

is_buy_mode = (instant_price > fast_mid) and (fast_mid > slow_mid)
is_sell_mode = (instant_price < fast_mid) and (fast_mid < slow_mid)
entry_color = is_buy_mode ? green : (is_sell_mode ? red : na)
exit_color = is_buy_mode ? red : (is_sell_mode ? green : na)

entry_buy_stop = slow_high
entry_sell_stop = slow_low
exit_buy_stop = max(fast_low, slow_low)
exit_sell_stop = min(fast_high, slow_high)
strategy.entry("long", strategy.long, stop=entry_buy_stop, when=is_buy_mode)
strategy.exit("stop", "long", stop=exit_buy_stop)
strategy.entry("short", strategy.short, stop=entry_sell_stop, when=is_sell_mode)
strategy.exit("stop", "short", stop=exit_sell_stop)
strategy.close("long", when=(not is_buy_mode))
strategy.close("short", when=(not is_sell_mode))

entry_buy_stop_color = (strategy.position_size == 0) ? (is_buy_mode ? green : na) : na
plotshape(entry_buy_stop, location=location.absolute, color=entry_buy_stop_color, style=shape.circle)
entry_sell_stop_color = (strategy.position_size == 0) ? (is_sell_mode ? red : na) : na
plotshape(entry_sell_stop, location=location.absolute, color=entry_sell_stop_color, style=shape.circle)
exit_buy_stop_color = (strategy.position_size > 0) ? red : na
plotshape(exit_buy_stop, location=location.absolute, color=exit_buy_stop_color, style=shape.xcross)
exit_sell_stop_color = (strategy.position_size < 0) ? green : na
plotshape(exit_sell_stop, location=location.absolute, color=exit_sell_stop_color, style=shape.xcross)

```

> Detail

https://www.fmz.com/strategy/430175

> Last Modified

2023-10-25 17:58:11
