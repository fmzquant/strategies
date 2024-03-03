
> Name

RSI均线回归交易策略RSI-Mean-Reversion-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略基于RSI指标的均线回归特征设计。RSI超买超卖时会发生回归,形成交易机会。该策略通过RSI指标判断超买超卖状态,采取均线回归方式建立多空仓位,达到系统化交易目的。

策略原理:

1. 计算RSI指标值,设置超买线和超卖线,典型参数为超买线60,超卖线30。

2. 当RSI从上向下跌破超买线时,进行卖出操作,建立短仓。

3. 当RSI从下向上突破超卖线时,进行买入操作,建立多仓。

4. 多仓止损线为入场价乘以(1-止损比例),短仓止损线为入场价乘以(1+止损比例)。

5. 当价格击穿止损线时,进行止损退出。

该策略的优势包括:

1. 利用RSI指标的回归特征,可以顺势捕捉趋势回调带来的交易机会。

2. 采用突破建仓方式,可以及时捕捉趋势转折。

3. 设置止损线,可以控制单笔损失。

该策略的风险包括:

1. RSI指标发出假信号的概率较大,应结合其他指标确认。

2. 止损点靠近入场点会频繁被止损,应适当放宽止损范围。 

3. 回归交易时机选择不当可能导致持仓时间过长。

总之,RSI均线回归策略通过捕捉RSI指标的回归机会进行交易。该策略可以顺势而为,有效控制单笔损失。但RSI指标的可靠性较低,投资者需审慎采用,并辅助以其他技术指标进行确认,优化止损机制,以期获得长期稳定回报。

||


This strategy is based on the mean reversion characteristics of the RSI indicator. Overbought and oversold RSI tends to revert back, creating trading opportunities. The strategy identifies overbought/oversold states using RSI to establish long/short positions in a systematic way. 

Strategy Logic:

1. Calculate RSI value and set overbought and oversold thresholds, typically 60 and 30. 

2. When RSI crosses down the overbought line, go short. 

3. When RSI crosses up the oversold line, go long.

4. Long stop loss is entry price * (1 - stop loss %). Short stop loss is entry price * (1 + stop loss %).

5. If price hits the stop loss, exit the position.

Advantages:

1. Captures mean reversion opportunities during trend pullbacks using RSI.

2. Breakout trading allows timely entry at trend reversals. 

3. Stop loss controls single trade loss amount.

Risks: 

1. RSI tends to give false signals. Confirm with other indicators.

2. Stop loss being too tight causes excessive stops. Consider widening range.

3. Poor timing of entries may lead to oversized positions.

In summary, the RSI mean reversion strategy trades RSI overextensions. It follows the trend with controlled loss on single trades. But RSI reliability is low. Investors should use it prudently with other confirming indicators, optimized stops, and expect modest long-term returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(08 Mar 2021 00:00 -0600)|Start Time|
|v_input_2|timestamp(9 Mar 2021 23:59 -0600)|Start Time|
|v_input_3|14|lengthRSI|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|0|Strategy: Long/Short|Long Only|Short Only|
|v_input_6|5|Stop Loss %|
|v_input_7|30|oversold|
|v_input_8|60|overbought|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-05 00:00:00
end: 2023-09-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © relevantLeader16058

//@version=4
strategy(shorttitle='RSI Bot Strategy',title='Quadency Mean Reversion Bot Strategy', overlay=true, initial_capital = 100, process_orders_on_close=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type=strategy.commission.percent, commission_value=0.08)

//Backtest dates
start = input(defval = timestamp("08 Mar 2021 00:00 -0600"), title = "Start Time", type = input.time)
finish = input(defval = timestamp("9 Mar 2021 23:59 -0600"), title = "Start Time", type = input.time)
window()  => true       // create function "within window of time"

// Complete Control over RSI inputs and source price calculations
lengthRSI = input(14, minval=1)
source = input(title="Source", type=input.source, defval=close)
strat = input(title="Strategy", defval="Long/Short", options=["Long Only", "Long/Short", "Short Only"])
strat_val = strat == "Long Only" ? 1 : strat == "Long/Short" ? 0 : -1
stoploss = input(5.00, "Stop Loss %")
oversold= input(30)
overbought= input(60)

// Standard RSI Calculation
RSI = rsi(close, lengthRSI)
stLossLong=(1-(stoploss*.01))
stLossShort=(1+(stoploss*.01))

//Long and Short Strategy Logic
GoLong = crossunder(RSI, oversold) and window()
GoShort = crossover(RSI, overbought) and window()

// Strategy Entry and Exit
if (GoLong)
    if strat_val > -1
        strategy.entry("LONG", strategy.long)
    if strat_val < 1
        strategy.close("SHORT")
    

if (GoShort)
    if strat_val > -1
        strategy.close("LONG")
    if strat_val < 1
        strategy.entry("SHORT", strategy.short)


LongStopLoss = barssince(GoLong)<barssince(GoShort) and crossunder(low, valuewhen(GoLong, close, 0)*stLossLong)

ShortStopLoss = barssince(GoLong)>barssince(GoShort) and crossover(high, valuewhen(GoShort, close, 0)*stLossShort)

if (ShortStopLoss)
    strategy.close("SHORT")
    
if (LongStopLoss)
    strategy.close("LONG")





```

> Detail

https://www.fmz.com/strategy/426479

> Last Modified

2023-09-12 14:37:28
