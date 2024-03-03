
> Name

RSI均值回归价格波动策略RSI-Mean-Reversion-Price-Fluctuation-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略利用RSI指标识别超卖机会,在价格下跌时分批入场,通过不断均值降低持仓成本实现长期获利。同时,策略加入DCA机制,进一步控制风险。

## 策略原理

本策略首先计算RSI指标判断市场是否超卖。当RSI低于30时,标志着超卖机会的出现。此时,如果价格低于100周期均线,则做多开仓。

开仓后,策略会设置6个均值回归价格,分别是当前价格的98%、97%、95%、90%、84%和70%。当价格触及这些价格时,会继续追加仓位。这样通过不断均值,可以降低持仓成本。

此外,策略还计算持仓的平均价格。当价格上涨超过平均价格5%后,开始止盈。同时,如果价格继续上涨,超过平均价格的5%止盈价格,则全部止盈。

最后,本策略还加入DCA机制。每周一如果有持仓,且价格低于平均价格,则追加固定金额的仓位。这进一步降低了持仓成本。

## 优势分析

本策略最大的优势在于利用均值和DCA机制控制了风险。具体来说,包括以下几点:

1. 采用分批入场策略,可以分散开仓风险,避免错过最低点。

2. 设置多个均值回归价格,可以不断降低持仓成本,有效控制下跌风险。

3. 计算持仓平均价格,实现盈利后及时止盈,锁定收益。

4. 应用DCA机制,进一步降低持仓成本,控制风险。

5. 采用RSI指标判断市场时点,避免高点开仓。

6. 利用均线过滤,避免反转开仓。

## 风险分析

本策略也存在一定的风险,主要包括:

1. 策略无法确定市场反转点,如果遇到长期维持低位的市场,持续做多会增大亏损。

2. 策略没有考虑止损机制,无法有效控制单笔亏损。

3. 策略没有限制开仓次数,如果行情剧烈下跌,仓位会不断增加。

4. DCA机制存在时间风险,不能保证一定在最低点开仓。

对应解决方法:

1. 可以结合其他指标判断市场结构,避免单一依赖RSI。

2. 增加移动止损或者缩量止损。

3. 限制开仓层数,避免仓位过大。 

4. 优化DCA开仓时机,采用更稳定的方式。

## 优化方向

本策略可以从以下几个方面进行优化:

1. 优化均值回归算法,采用更科学的方式计算价格回归值。

2. 优化止盈方式,可以采用移动止盈或者阶梯止盈。

3. 增加止损策略,更好控制单笔亏损。

4. 结合其他指标判断市场结构,避免单一依赖RSI。

5. 优化DCA开仓逻辑,避免固定时间开仓的风险。

6. 添加仓位管理模块,优化仓位大小。

7. 优化参数设置,使得策略更适应市场统计特性。

8. 加入切换逻辑,在不同市场环境中切换策略方式。

## 总结

本策略总体上是一个利用RSI判断时点,分批入场进行均值的长线投资策略。它非常适合目前高波动的数字货币市场,可以有效利用震荡区间进行持仓成本管理。同时,策略机制也存在可以优化的地方,如果加入更多技术指标判断和风险控制模块,可以进一步改进策略效果,使得其足以应对更加复杂的市场环境。

||

## Overview

This strategy identifies oversold opportunities using the RSI indicator and takes positions in batches when prices fall to gradually lower the cost basis and achieve long-term profits. It also incorporates a DCA mechanism to further manage risks.

## Strategy Logic

The strategy first calculates the RSI indicator to determine if the market is oversold. When the RSI is below 30, it signals an oversold opportunity. In this case, if the price is below the 100-period moving average, a long position will be opened.

After opening the position, the strategy sets up 6 mean reversion price levels at 98%, 97%, 95%, 90%, 84% and 70% of the current price. When the price hits these levels, more positions will be added. By constantly averaging down, the cost basis of the position can be lowered.

In addition, the average price of the position is calculated. Profit taking starts when the price rises more than 5% above the average price. Also, if the price continues to rise above the 5% take profit price of the average price, all positions will be closed.

Finally, a DCA mechanism is incorporated into the strategy. Every Monday, if there are open positions and the price is below the average price, a fixed amount will be added to the position. This further reduces the cost basis.

## Advantage Analysis 

The biggest advantage of this strategy is the utilization of averaging down and DCA mechanisms to control risks. Specifically:

1. Taking positions in batches diversifies the opening risk and avoids missing the lowest point.

2. Setting multiple mean reversion price levels steadily lowers the cost basis and manages the downside risk.

3. Calculating the average position price allows for timely profit taking and locking in profits when in the green.

4. Applying DCA further reduces the cost basis and controls risk.

5. Using the RSI indicator prevents opening positions at tops.

6. The moving average filter avoids reversal trades.

## Risk Analysis

The strategy also has some risks:

1. The strategy cannot determine market reversal points. Persistent long positions during prolonged market bottoms will increase losses.

2. There is no stop loss mechanism to effectively control single trade loss.

3. There is no limit on the number of positions, which can lead to runaway additions if the market crashes violently.

4. DCA carries timing risk and does not guarantee opening positions at the lowest point.

Possible solutions:

1. Incorporate other indicators to judge market structure instead of purely relying on RSI.

2. Add moving or staggered stop loss. 

3. Limit the number of position additions.

4. Optimize DCA entry logic to a more stable mechanism.

## Optimization Directions

The strategy can be improved in the following ways:

1. Optimize the mean reversion algorithm to a more scientific approach.

2. Enhance profit taking mechanisms, such as trailing stop or layered take profit.

3. Add stop loss for better single trade risk control. 

4. Incorporate other indicators for market structure analysis instead of purely RSI.

5. Optimize DCA logic to avoid fixed time entry risks.

6. Add position sizing to optimize total position size.

7. Optimize parameters to suit market statistical characteristics. 

8. Add switching logic to adapt to different market regimes.

## Conclusion

In summary, this is a long-term investment strategy utilizing RSI for timing and averaging down with multiple entries to lower cost basis. It is well suited for the current volatile cryptocurrency market to manage position costs during ranging periods. There is also room for improving the mechanisms to incorporate more indicators for market analysis and risk management to enable the strategy to thrive in more complex environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|15|Portfolio %|
|v_input_2|++++|+++++ Long Positions VA Layers +++++|
|v_input_3|2|2nd Long Entry %|
|v_input_4|3|3rd Long Entry %|
|v_input_5|5|4th Long Entry %|
|v_input_6|10|5th Long Entry %|
|v_input_7|16|6th Long Entry %|
|v_input_8|++++|+++++ Moving Average Filter +++++|
|v_input_9|false|Plot Moving Average|
|v_input_10|100|v_input_10|
|v_input_11|++++|+++++ RSI Inputs +++++|
|v_input_12|14|length|
|v_input_13|30|oversold, entry trigger long position|
|v_input_14|70|overbought, has no specific function|
|v_input_15|++++|+++++ Take Profit +++++|
|v_input_16|5|ProfitTarget_Percent|
|v_input_17|++++|+++++ Open DCA order once every week +++++|
|v_input_18|false|Buy a fixed amount every Monday|
|v_input_19|40|Fixed amount currency for DCA orders|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
//@version=4
// © A3Sh

// RSI Strategy that buys the dips, works with Price Averaging and has a Dollar Cost Average option.
// When the price drops below specified percentages of the price (6 PA layers), new entries are openend to average the price of the assets.
// Open entries are closed by a specified take profit.
// Entries can be reopened, after closing and consequently crossing a PA layer again.
// The idea is to lower the average position price to a point that when the market rises, the current price crosses over the average position price.
// When the current price crosses the average position size and reaches the specified take profit, all entries are closed at once.
// In case the market drops significantly, there is an option to activate DCA to lower the average price further.

// RSI code adapted from the Optimized RSI Buy the Dips strategy, by Coinrule
// https://www.tradingview.com/script/Pm1WAtyI-Optimized-RSI-Strategy-Buy-The-Dips-by-Coinrule/
// Pyramiding entries code adapted from Pyramiding Entries on Early Trends startegy, by Coinrule
// https://www.tradingview.com/script/7NNJ0sXB-Pyramiding-Entries-On-Early-Trends-by-Coinrule/
// Plot entry layers code adapted from HOWTO Plot Entry Price by vitvlkv
// https://www.tradingview.com/script/bHTnipgY-HOWTO-Plot-Entry-Price/
// Buy every week code based on the following question in Stack Overflow
// https://stackoverflow.com/questions/59870411/in-pine-script-how-can-you-do-something-once-per-day-or-keep-track-if-somethin


strategy(title = "RSI+PA+DCA", pyramiding = 16, overlay = true, initial_capital = 400, default_qty_type = strategy.percent_of_equity, default_qty_value = 15, commission_type = strategy.commission.percent, commission_value = 0.075)

port = input(15, title = "Portfolio %", type = input.float, step = 0.1, minval = 0.1, maxval = 100)
q = (strategy.equity / 100 * port) / open

// Long position entry layers. Percentage from the entry price of the the first long
PositionInputs = input("++++", title = "+++++ Long Positions VA Layers +++++")

ps2 = input(2,  title = "2nd Long Entry %", step = 0.1)
ps3 = input(3,  title = "3rd Long Entry %", step = 0.1)
ps4 = input(5,  title = "4th Long Entry %", step = 0.1)
ps5 = input(10, title = "5th Long Entry %", step = 0.1)
ps6 = input(16, title = "6th Long Entry %", step = 0.1)


// Calculate Moving Averages
maInput = input("++++", title = "+++++ Moving Average Filter +++++")

plotMA = input(title = "Plot Moving Average", defval = false)
movingaverage_signal = sma(close, input(100))
plot (plotMA ? movingaverage_signal : na, color = color.white)

// RSI inputs and calculations
rsiInput = input( "++++", title = "+++++ RSI Inputs +++++" )

length =     input( 14 )
overSold =   input( 30, title = "oversold, entry trigger long position" )
overBought = input( 70, title = "overbought, has no specific function")
price = close
vrsi = rsi(price, length)

// Long trigger (co)
co = crossover(vrsi, overSold) and close < movingaverage_signal

// Take profit
takeprofit = input("++++", title = "+++++ Take Profit +++++")

ProfitTarget_Percent = input(5)


// Store values to create and plot the different DCA layers
long1 = valuewhen(co, close, 0)
long2 = valuewhen(co, close - (close / 100 * ps2), 0)
long3 = valuewhen(co, close - (close / 100 * ps3), 0)
long4 = valuewhen(co, close - (close / 100 * ps4), 0)
long5 = valuewhen(co, close - (close / 100 * ps5), 0)
long6 = valuewhen(co, close - (close / 100 * ps6), 0)

eps1 = 0.00
eps1 := na(eps1[1]) ? na : eps1[1]

eps2 = 0.00
eps2 := na(eps2[1]) ? na : eps2[1]

eps3 = 0.00
eps3 := na(eps3[1]) ? na : eps3[1]

eps4 = 0.00
eps4 := na(eps4[1]) ? na : eps4[1]

eps5 = 0.00
eps5 := na(eps5[1]) ? na : eps5[1]

eps6 = 0.00
eps6 := na(eps6[1]) ? na : eps6[1]

plot (strategy.position_size > 0 ? eps1 : na, title = "Long entry 1", style = plot.style_linebr)
plot (strategy.position_size > 0 ? eps2 : na, title = "Long entry 2", style = plot.style_linebr)
plot (strategy.position_size > 0 ? eps3 : na, title = "Long entry 3", style = plot.style_linebr)
plot (strategy.position_size > 0 ? eps4 : na, title = "Long entry 4", style = plot.style_linebr)
plot (strategy.position_size > 0 ? eps5 : na, title = "Long entry 5", style = plot.style_linebr)
plot (strategy.position_size > 0 ? eps6 : na, title = "Long entry 6", style = plot.style_linebr)


// Plot position average price
plot (strategy.position_avg_price, title = "Average price", style = plot.style_linebr, color = color.red, linewidth = 2)


// Take profit and exit all on take profit above position average price
tpv = strategy.position_avg_price + (strategy.position_avg_price / 100 * ProfitTarget_Percent)

tpl1 = close < tpv ? eps1 + close * (ProfitTarget_Percent / 100) : tpv
tpl2 = close < tpv ? eps2 + close * (ProfitTarget_Percent / 100) : tpv
tpl3 = close < tpv ? eps3 + close * (ProfitTarget_Percent / 100) : tpv
tpl4 = close < tpv ? eps4 + close * (ProfitTarget_Percent / 100) : tpv
tpl5 = close < tpv ? eps5 + close * (ProfitTarget_Percent / 100) : tpv
tpl6 = close < tpv ? eps6 + close * (ProfitTarget_Percent / 100) : tpv


// Open DCA order once at the start of the week
dcaWeek = input("++++", title = "+++++ Open DCA order once every week +++++")

newWeek = change(time("W"))
dcatime = input(title = "Buy a fixed amount every Monday", defval = false)
fixedAmount = input(40, title = "Fixed amount currency for DCA orders", step = 0.1)
dcaq = fixedAmount / open
plotchar (dcatime ? newWeek : na, "buy at Week start", "▼", location.top, size = size.tiny, color = color.white)
bgcolor (dcatime and newWeek ? color.white : na, transp = 50)

// Submit entry orders
if (co and strategy.opentrades == 0)
    eps1 := long1
    eps2 := long2
    eps3 := long3
    eps4 := long4
    eps5 := long5
    eps6 := long6

    strategy.entry("Long1", strategy.long, q)

if (strategy.opentrades == 1)
    strategy.entry("Long2", strategy.long, q, limit = eps2)

    
if (strategy.opentrades == 2)
    strategy.entry("Long3", strategy.long, q, limit = eps3)


if (strategy.opentrades == 3)
    strategy.entry("Long4", strategy.long, q, limit = eps4)


if (strategy.opentrades == 4)
    strategy.entry("Long5", strategy.long, q, limit = eps5)

    
if (strategy.opentrades == 5) 
    strategy.entry("Long6", strategy.long, q, limit = eps6)
    
// Submit Weekly DCA order, only when price is below position average price and when a position is open
if (dcatime and newWeek and strategy.position_size > 0 and close < strategy.position_avg_price) 
    strategy.entry("DCA", strategy.long, dcaq)


// Exit orders
if (strategy.position_size > 0)
    strategy.exit(id = "Exit 1", from_entry = "Long1", limit = tpl1)
    strategy.exit(id = "Exit 2", from_entry = "Long2", limit = tpl2)
    strategy.exit(id = "Exit 3", from_entry = "Long3", limit = tpl3)
    strategy.exit(id = "Exit 4", from_entry = "Long4", limit = tpl4)
    strategy.exit(id = "Exit 5", from_entry = "Long5", limit = tpl5)
    strategy.exit(id = "Exit 6", from_entry = "Long6", limit = tpl6)
    strategy.exit(id = "Exit DCA", from_entry = "DCA", limit = tpv)
 

// Make sure that all open limit orders are canceled after exiting all the positions 
longClose = strategy.position_size[1] > 0 and strategy.position_size == 0 ? 1 : 0   
if longClose
    strategy.cancel_all()




```

> Detail

https://www.fmz.com/strategy/427920

> Last Modified

2023-09-26 19:55:03
