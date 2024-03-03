
> Name

简单低买高卖策略Simple-Buy-Low-Sell-High-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/880f681f79e2a7eb51.png)

[trans]

## 概述

低买高卖策略是一个非常简单但有效的长期交易策略。本策略自动在加密货币大幅下跌后买入,并在涨幅达到设定目标后卖出,从而在市场大幅波动时获得收益。

## 策略原理  

本策略的核心在于通过计算给定回溯期内加密货币的涨跌幅,判断市场是否出现大幅下跌。当最近一段时间内加密货币价格大幅下跌超过设定阈值时,表示市场可能处于极度恐慌,这时策略会自动买入。此外,本策略还设置了止损点和止盈点,当价格触及这两个点时,会自动止损或止盈。  

具体来说,本策略使用 trailing_change 函数计算给定回溯期内加密货币的总体涨跌幅。当最近 inp_lkb 根K线内,加密货币的涨跌幅小于设定参数 dip 的负值时,就是符合买入条件的大幅下跌。此时在回测时间窗口内,会触发策略的买入開仓操作。  

在买入开仓后,本策略会实时跟踪价格变化,设定两个出場条件:(1)当价格跌破开仓价格的 (1 - 停损比例)% 时,会触发止损平仓;(2)当价格涨破开仓价格的 (1 + 止盈比例)% 时,会触发止盈平仓。

## 优势分析

本低买高卖策略最大的优势在于非常简单易执行。它不需要复杂的技术指标,只依靠最近一段时间的涨跌幅判断市场行情,非常适合交易初学者。同时,低买高卖也是一个长期有效的策略,特别是在加密货币这种高波动市场中,这样的反转交易策略能获得可观的长期收益。

另外,本策略支持止损和止盈设置,可以有效控制个别交易的损失,并锁定部分收益。这也使得该策略适合实盘交易,即便市场出现较大的不利波动也可以将损失控制在可承受的范围内。

## 风险分析  

本策略的主要风险在于无法确定市场反转的时间点。如果行情继续下跌并不反弹,那么开仓买入的头寸可能会出现较大的浮亏。因此,停损点的设置至关重要。如果停损点设置过宽,单笔损失可能会非常惨重。

另一个需要注意的风险是,如果行情出现剧烈的震荡,价格可能在短期内触发止损或止盈条件。这可能会带来额外的交易成本。特别是在行情剧烈波动时,价格短期内连续触发多笔止盈止损的情况并不少见。  

针对上述风险,我们可以设置更宽的回溯期,确保买入信号更加稳定可靠,能过滤部分震荡中的假信号。此外,加入一定的交易冷静期,在平仓后一段时间内不开新仓,也可以有效降低价格震荡带来的交易频率过高问题。

## 优化方向  

本策略还有进一步优化的空间,主要集中在以下几个方面:

1. 动态调整止损止盈参数。可以根据市场波动率动态调整止损幅度和止盈幅度,在市场恐慌时宽松设置止损幅度,在行情向好时适当收紧止盈幅度。

2. 结合多个因子判断买入时机。除了近期涨跌幅外,还可以引入交易量变化等其他因素来确定更可靠的反转信号。

3. 加入重新入场机制。在止损或止盈后,可以设置一定的重新入场策略,在新的反转机会再次买入。

## 总结  

本低买高卖策略整体来说非常适合加密货币这种高波动市场,它Capture了市场反转的机会,并设置止损止盈控制风险。本策略非常简单,容易理解和实施,非常适合交易初学者。通过进一步优化,可以获得更稳定的策略表现。总的来说,低买高卖是一个值得推荐的长期交易策略。

||

## Overview  

The buy low sell high strategy is a very simple but effective long-term trading strategy. This strategy automatically buys cryptocurrencies after a major decline and sells when the increase reaches the set target, thereby making a profit during major market fluctuations.

## Strategy Principle

The core of this strategy is to judge whether the market has experienced a major decline by calculating the ups and downs of cryptocurrency prices over a given lookback period. When cryptocurrency prices have fallen sharply beyond the set threshold over the most recent period of time, it indicates that the market may be extremely panicky. The strategy will then automatically buy. In addition, this strategy also sets stop loss and take profit points that trigger automatic stop loss or take profit when prices reach these two points.

Specifically, this strategy uses the trailing_change function to calculate the overall ups and downs of cryptocurrency prices over a given lookback period. When the ups and downs of cryptocurrency prices within the last inp_lkb candles are lower than the negative value of the set parameter dip, it is the major decline that meets the buy condition. At this time, within the backtest time window, the strategy's buy order will be triggered.

After buying, this strategy will track price changes in real time and set two exit conditions: (1) When the price falls below (1 - stop loss percentage)% of the opening price, stop loss order will be triggered; (2) When the price rises above (1 + take profit percentage)% of the opening price, take profit order will be triggered.  

## Strength Analysis  

The biggest advantage of this buy low sell high strategy is that it is very simple and easy to execute. It does not require complex technical indicators, relying solely on the ups and downs of prices over a recent period to judge market conditions, making it very suitable for novice traders. At the same time, buying low and selling high is also an effective long-term strategy, especially in the highly volatile cryptocurrency market. Such contrarian trading strategies can yield considerable long-term returns.  

In addition, this strategy supports stop loss and take profit settings, which can effectively control the loss of individual trades and lock in some profits. This also makes the strategy suitable for live trading, even if the market experiences greater adverse fluctuations, the loss can be controlled within an affordable range.

## Risk Analysis 

The main risk of this strategy is that it is impossible to determine the timing of market reversals. If the market continues to decline without rebounding, the long positions opened may experience greater floating losses. Therefore, setting stop loss points is crucial. If stop loss points are set too wide, single losses can be devastating.  

Another risk to note is that if there is violent market fluctuation, prices may trigger stop loss or take profit in a short period of time. This could lead to additional trading costs. Especially when the market fluctuates sharply, it is not uncommon for prices to trigger multiple stop loss and take profit repeatedly in a short period of time.

To address the above risks, we can set a longer lookback period to ensure more stable and reliable buy signals that filter out some false signals in market fluctuations. In addition, a certain trading cool-off period can be introduced. Not opening new positions for a period of time after closing positions can also effectively reduce the problem of excessively high trading frequency caused by price fluctuations.  

## Optimization Directions  

There is still room for further optimization of this strategy, mainly in the following aspects:  

1. Dynamically adjust stop loss and take profit parameters. Stop loss range and take profit range can be adjusted dynamically based on market volatility. Have wider stop loss range during market panic and appropriately narrow take profit range when market goes upward.  

2. Combine multiple factors to determine entry timing. In addition to recent ups and downs, other factors such as changes in trading volume can be introduced to determine more reliable reversal signals.

3. Add re-entry mechanism. After stop loss or take profit, certain re-entry strategies can be set to buy back on new reversal opportunities.   

## Conclusion  

Overall, this buy low sell high strategy is well suited for highly volatile cryptocurrency markets. It captures market reversal opportunities and sets stop loss and take profit to control risks. This strategy is very simple, easy to understand and implement, making it ideal for novice traders. With further optimization, more stable strategy performance can be obtained. In summary, buying low and selling high is a long-term trading strategy worth recommending.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|10|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|true|Lookback Period|
|v_input_9|2|v_input_9|
|v_input_10|2|v_input_10|
|v_input_11|2|v_input_11|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-25 00:00:00
end: 2023-12-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=3
strategy(shorttitle='Buy the Dips',title='Buy the Dips (by Coinrule)', overlay=true, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 30, commission_type=strategy.commission.percent, commission_value=0.1)

//Backtest dates
fromMonth = input(defval = 1,  title = "From Month")     
fromDay   = input(defval = 10,    title = "From Day")       
fromYear  = input(defval = 2020, title = "From Year")       
thruMonth = input(defval = 1,    title = "Thru Month")     
thruDay   = input(defval = 1,    title = "Thru Day")     
thruYear  = input(defval = 2112, title = "Thru Year")       

showDate  = input(defval = true, title = "Show Date Range")

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false       // create function "within window of time"

inp_lkb = input(1, title='Lookback Period')
 
perc_change(lkb) =>
    overall_change = ((close[0] - close[lkb]) / close[lkb]) * 100

// Call the function    
overall = perc_change(inp_lkb)

//Entry

dip= -(input(2))

strategy.entry(id="long", long = true, when = overall< dip and window()) 

//Exit
Stop_loss= ((input (2))/100)
Take_profit= ((input (2))/100)

longStopPrice  = strategy.position_avg_price * (1 - Stop_loss)
longTakeProfit = strategy.position_avg_price * (1 + Take_profit)

strategy.close("long", when = close < longStopPrice or close > longTakeProfit and window())

```

> Detail

https://www.fmz.com/strategy/436600

> Last Modified

2023-12-26 10:49:19
