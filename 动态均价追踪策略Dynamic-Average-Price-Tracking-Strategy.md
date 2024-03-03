
> Name

动态均价追踪策略Dynamic-Average-Price-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1633f4a00aec7199bfc.png)
[trans]

## 概述

本策略的主要思想是当股票价格下跌到一定比例时,可以逐步加仓,从而达到降低平均持仓成本的目的。当价格反弹时,由于平均持仓成本更低,可以获得更高的收益。

## 策略原理

当股价首次上穿20日简单移动平均线时,做多开仓。如果此后股价下跌幅度达到设置的目标亏损百分比,例如10%,则加仓指定比例的头寸,例如50%的当前头寸。这样可以降低平均持仓成本。当股价达到设置的止盈点时,例如比平均持仓成本高10%,全部平仓止盈。

具体来说,strategy函数设置好参数如允许最多4次加仓,头寸计算方式为占用资金百分比,初次开仓头寸为10%。获取20日简单移动平均线,当收盘价上穿该平均线且无仓位时开多仓。然后计算持仓的浮动盈亏比例,如果达到目标亏损百分比则按目标加仓比例继续加仓,直到股票反弹止盈。

## 优势分析

这种策略的最大优势在于,当行情不利时,可以通过加仓降低平均持仓成本,在行情转好时获得更大收益,实现亏少赚多的效果。与简单的移动止损相比,这样的策略可以更好地把握行情,而不是在股价继续下跌后被迫止损。

同时,该策略允许多次加仓,最大程度利用行情反转的时间差,逐步调整仓位。这比一次性大量加仓的成本更低,也更符合多数投资者的资金实力。

## 风险分析

当然,如果行情持续走低,这样的策略也会面临重大损失的风险。特别是在熊市中,股价下跌幅度可能远超我们的想象。因此必须合理设置加仓的比例和次数,把风险控制在可承受的范围内。

同时,我们也要注意到,如果所有投资者都采用这样的策略,那么当大量投资者亏损达到目标百分比时,可能会出现集体加仓的情况。这会推高股价,形成非理性的短期反弹。如果我们不审时度势,可能会误判行情而继续加仓。结果就是izontal line当大跌再次来临时损失更重。

## 优化方向

这种策略可以在以下几个方面进行优化:

1. 动态调整加仓幅度。可以根据大盘走势等情况实时调整下次加仓的比例。

2. 结合数量指标。例如可以监测成交量明显放大来确认反转信号,避免误判。

3. 采用跟踪止损。在加仓后采取渐进式止损,确保亏损控制在一定范围内。

## 总结

动态均价追踪策略通过加仓调整持仓,在保证足够资金支持的前提下,能够有效利用均价效应,在股价反转时获得超额收益。关键是要把握时点与比例,把各种风险控制在可承受的范围内。如果应用得当,这种策略可以成为量化交易中相当有效的一种方式。

||

## Overview

The main idea of this strategy is that when the stock price falls to a certain percentage, positions can be gradually increased to lower the average cost of the holding position. When prices rebound, higher returns can be obtained due to the lower average holding cost.

## Strategy Principle  

When the stock price first crosses above the 20-day simple moving average, go long to open a position. If the stock then falls by the target loss percentage set, such as 10%, add to the position at a specified percentage, such as 50% of the current position. This lowers the average cost of the holding position. When the stock price reaches the set take profit point, such as 10% above the average holding cost, close all positions to take profit.

Specifically, the strategy function sets parameters such as allowing up to 4 additional purchases, with position sizing set as a percentage of equity, and the initial position size at 10% of equity. It gets the 20-day simple moving average line. When the closing price crosses above that average and there is no current position, it opens a long position. It then calculates the floating profit/loss percentage of the position. If it reaches the target loss percentage, it continues pyramiding at the target additional purchase percentage until the stock rebounds to hit the profit target.  

## Advantage Analysis

The biggest advantage of this type of strategy is that when market conditions are unfavorable, the average cost of the holding position can be reduced through pyramiding additional purchases. This allows greater profits to be obtained when market conditions improve, achieving the "lose less, earn more" effect. Compared to simple stop losses, this strategy can better capture market movements rather than being forced to stop loss when prices continue falling.

At the same time, the strategy allows multiple additional purchases, making maximum use of timing differences in market reversals to gradually adjust positions. This has lower cost than making one large additional purchase, and also fits better with most investors' capital strengths.  

## Risk Analysis

Of course, if prices continue falling, this strategy also faces the risk of major losses. Especially in bear markets, the extent of price declines may far exceed our imagination. Therefore, the proportion and number of additional purchases must be reasonably set to control risk within an acceptable range. 

At the same time, we must realize that if all investors adopt such a strategy, when a lot of investors reach their loss percentage target there could be a collective adding to positions scenario. This would drive up prices and form an irrational short-term rebound. If we fail to assess the situation properly, we could wrongly judge the market trend and continue increasing our position. The result would be even greater losses when prices plunge again.

## Optimization Directions

There are several ways this strategy can be optimized:

1. Dynamically adjust the additional purchase percentage. This could be adjusted in real time based on market conditions.  

2. Incorporate quantitative indicators. For example, monitor surges in volume to confirm reversal signals and avoid false signals.

3. Adopt trailing stop losses. After additional purchases, use a progressive stop loss system to ensure losses are kept within a certain range.   

## Summary  

The dynamic average price tracking strategy makes use of the average price effect by adjusting positions through additional purchases. Within the premise of having sufficient capital support, it can effectively capture above average returns when prices reverse. The key is properly judging timing and proportions to keep risks within acceptable ranges. If applied appropriately, this can be a very effective method in quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2010|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|
|v_input_7|-10|Target Loss to Average Down (%)|
|v_input_8|10|Target Take Profit|
|v_input_9|50|% Of Current Holdings to Buy|
|v_input_10|20|SMA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

// ########################################################################## // 
//
// This scipt is intended to demonstrate how pyramiding can be used to average
// down a position.
//
// We will buy when a stock closes above its 20 day MA and Average down if
// the trade does not go in our favor. We will hold until a profit is made. 
// (which could mean we hold forever)
//
// ########################################################################## //

strategy("Average Down", overlay=true )

// Date Ranges
from_month = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
from_day   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
from_year  = input(defval = 2010, title = "From Year")
to_month   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
to_day     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
to_year    = input(defval = 9999, title = "To Year")
start  = timestamp(from_year, from_month, from_day, 00, 00)  // backtest start window
finish = timestamp(to_year, to_month, to_day, 23, 59)        // backtest finish window
window = true
// Strategy Inputs
target_perc = input(-10, title='Target Loss to Average Down (%)', maxval=0)/100
take_profit = input(10, title='Target Take Profit', minval=0)/100
target_qty  = input(50, title='% Of Current Holdings to Buy', minval=0)/100 
sma_period  = input(20, title='SMA Period') 

// Get our SMA, this will be used for our first entry 
ma = sma(close,sma_period)

// Calculate our key levels
pnl = (close - strategy.position_avg_price) / strategy.position_avg_price
take_profit_level = strategy.position_avg_price * (1 + take_profit)

// First Position
first_long = crossover(close, ma) and strategy.position_size == 0 and window
if (first_long)
    strategy.entry("Long", strategy.long)

// Average Down!
if (pnl <= target_perc)
    qty = floor(strategy.position_size * target_qty)
    strategy.entry("Long", strategy.long, qty=qty)

// Take Profit!
strategy.exit("Take Profit", "Long", limit=take_profit_level)

// Plotting
plot(ma, color=blue, linewidth=2, title='SMA')
plot(strategy.position_avg_price, style=linebr, color=red, title='Average Price')
```

> Detail

https://www.fmz.com/strategy/440354

> Last Modified

2024-01-29 15:28:53
