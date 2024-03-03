
> Name

渐进式元素加权DCA量化交易策略Quantized-Gradual-Weighted-DCA-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12506f7bead8d3798f7.png)
[trans]


## 概述

渐进式元素加权DCA量化交易策略是一种结合移动平均线指标触发信号以及渐进加权dollar cost averaging机制的量化交易策略。该策略旨在通过趋势判断与成本均摊的方式,在趋势方向性较强的市场中获得较稳定的收益。

## 原理

该策略主要由三部分组成:

1. 入场信号判断

   使用快速移动平均线和慢速移动平均线的交叉作为判断入场的信号。根据用户设定,可以选择SMA、EMA或HMA作为快慢均线。当快速均线从下方突破慢速均线时,产生买入信号;当快速均线从上方跌破慢速均线时,产生卖出信号。

2. 渐进加权DCA

   在买入信号触发后,策略会立即开仓建立基础仓位。之后若价格继续下跌,策略会按照渐进加权的方式加大后续的安全仓位。每次新增安全仓位的价格会参照上一个安全仓位的价格依次下调一定幅度。同时,新增安全仓位的资金量也会依次放大。

   这样通过渐进加仓的方式,可以一定程度实现成本均摊,在保证交易风险可控的同时,获得较优的成本价格。

3. 止盈止损

   当价格上涨突破止盈线时,策略会选择止盈;当价格下跌突破止损线时,策略会选择止损。

   止盈线固定为基础仓位成交均价的1+固定比例。

   止损线随着最后一个安全仓位的价格波动。基于最后安全仓位的成交价格下方一定比例确认止损信号。

## 优势

1. 结合趋势判断和成本均摊,使策略更稳定

   趋势判断可以避免无方向的震荡市场,成本均摊可在趋势中获得更优成本。

2. 渐进加仓可控制风险

   每次均衡仓位规模有一定幅度,同时后续仓位有一定回撤要求,可以控制风险。

3. 实时监控策略占用资金情况

   代码加入实时监控标签,使得用户清楚知道策略占用资金上限,避免超额使用导致仓位被强平。

4. 各仓位止盈止损灵活

   基础仓位和安全仓位可分别止盈止损,终结利润和控制风险。

## 风险及优化

1. 价格剧烈震荡可能导致多次加仓

   在价格剧烈震荡时,可能会触发多次加仓从而增加损失。可通过适当加大后续安全仓位间的回撤要求来减少加仓次数。

2. 均线参数选择需要优化

   均线参数直接影响入场时机,不同品种需要测试确定合适参数。

3. 止损止盈比例需要测试优化

   止损止盈比例关系到收益率和回撤控制,需要通过回测数据优化设置。

4. 可根据回撤或时间设定强制平仓条件

   可以测试加入最大回撤或持仓时间超过阈值的强制平仓条件,进一步控制风险。

## 总结

渐进式元素加权DCA量化交易策略综合了趋势判断与成本均摊的优点,在强趋势行情中可以获得稳定收益。通过优化参数设置,调整仓位规模和仓位间回撤要求,可以实现风险可控的稳定交易。该策略可适用于对冲基金、CTA基金以及一些对抗性策略的设计。

|| 

# Overview

The Quantized Gradual Weighted DCA Trading Strategy is a quantitative trading strategy that combines moving average indicators for signal triggering and gradual weighted dollar cost averaging mechanisms. The strategy aims to achieve relatively stable returns in strongly trending markets through trend identification and cost averaging.

# Principles 

The strategy consists of three main components:

1. Entry signal judgement

   It uses fast and slow moving average crossovers as the entry signal. Users can choose between SMA, EMA or HMA for the fast and slow moving averages. When the fast MA crosses above the slow MA, a buy signal is generated. When the fast MA crosses below the slow MA, a sell signal is generated.

2. Gradual weighted DCA

   After a buy signal, the strategy will immediately open a base position. As price continues to fall, the strategy will gradually increase the size of additional safety positions in a weighted manner. The price of each new safety position will be lowered by a fixed percentage relative to the previous one. Also, the allocated funds for each new safety position will be amplified by a factor. 

   This gradual increase in position size allows a form of cost averaging, obtaining a better average cost while keeping risks in control.

3. Take profit and Stop loss

   When price rises above the take profit line, the strategy will close positions for profit. When price falls below the stop loss line, the strategy will exit positions to control loss.

   The take profit line is fixed at base position average price * (1 + fixed percentage). 

   The stop loss line fluctuates based on the last safety position price, fixed percentage below it.

# Advantages

1. Combining trend and cost averaging makes it more stable

   Using trends avoids meaningless whipsaws, and cost averaging provides better entry costs.

2. Gradual position sizing controls risk

   Fixed amplification of safety position sizes, with re-entry threshold, keeps risk in check.

3. Real-time used funds monitoring

   Incorporated balance usage indicator prevents over-leveraging and forced liquidations.

4. Separate TP/SL for each position

   Independent exits allow securing profits and cutting losses.

# Risks and Improvements 

1. Price whipsaws can trigger multiple safety orders

   In extreme volatility, multiple unnecessary safety orders may be added, increasing loss. Can optimize safety order re-entry threshold.

2. Moving average parameters need optimization

   Different instruments need different moving average periods. Parameter tuning required.

3. TP/SL levels need backtest optimization

   TP/SL ratios determine risk/reward profile. Optimal levels vary.

4. Add maximum drawdown or holding time based forced exit

   Can test incorporating forced exits based on drawdown or holding time to further limit risks.

# Summary

The Quantized Gradual Weighted DCA Trading Strategy combines the advantages of trend trading and cost averaging to produce steady returns in strong trends. With optimized parameters, position sizing and re-entry thresholds, it can achieve stable trades with controlled risk. Applicable for hedge funds, CTAs and market neutral strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|(?Strategy)Strategy: Long|
|v_input_string_2|0|Profit currency: Quote (USDT)|Quote (BTC)|Quote (BUSD)|
|v_input_int_1|10|Base order Size|
|v_input_int_2|20|Safety order Size|
|v_input_string_3|0|(?Deal start condition > Trading View custom signal)Entry at Cross Over / Under: Over|Under|
|v_input_string_4|0|Short Moving Average: SMA|EMA|HMA|
|v_input_int_3|5|Period|
|v_input_string_5|0|Long Moving Average: HMA|EMA|SMA|
|v_input_int_4|50|Period|
|v_input_float_1|1.5|(?Take profit / Stop Loss)Target profit (%)|
|v_input_int_5|15|Stop Loss (%)|
|v_input_int_6|10|(?Safety orders)Max safety trades count|
|v_input_float_2|0.4|Price deviation to open safety orders (% from initial order)|
|v_input_float_3|1.8|Safety order volume scale|
|v_input_float_4|1.19|Safety order step scale|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-09 00:00:00
end: 2023-11-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MGTG

//@version=5
Strategy = input.string('Long', options=['Long'], group='Strategy', inline='1',
 tooltip='Long bots profit when asset prices rise, Short bots profit when asset prices fall'
 + '\n\n' + 'Please note: to run a Short bot on a spot exchange account, you need to own the asset you want to trade. The bot will sell the asset at the current chart price and buy it back at a lower price - the profit made is actually trapped equity released from an asset you own that is declining in value.')

Profit_currency = input.string('Quote (USDT)', 'Profit currency', options=['Quote (USDT)', 'Quote (BTC)', 'Quote (BUSD)'], group='Strategy', inline='1')
Base_order_size = input.int(10, 'Base order Size', group='Strategy', inline='2', 
 tooltip='The Base Order is the first order the bot will create when starting a new deal.')
Safety_order_size = input.int(20, 'Safety order Size', group='Strategy', inline='2',
 tooltip="Enter the amount of funds your Safety Orders will use to Average the cost of the asset being traded, this can help your bot to close deals faster with more profit. Safety Orders are also known as Dollar Cost Averaging and help when prices moves in the opposite direction to your bot's take profit target.")

Triger_Type = input.string('Over', 'Entry at Cross Over / Under', options=['Over', 'Under'], group='Deal start condition > Trading View custom signal', inline='1',
 tooltip='Deal start condition decision')

Short_Moving_Average  = input.string('SMA', 'Short Moving Average', group='Deal start condition > Trading View custom signal', inline='2',
 options=["SMA", "EMA", "HMA"])
Short_Period         = input.int(5, 'Period', group='Deal start condition > Trading View custom signal', inline='2')
Long_Moving_Average  = input.string('HMA', 'Long Moving Average', group='Deal start condition > Trading View custom signal', inline='3',
 options=["SMA", "EMA", "HMA"])

Long_Period          = input.int(50, 'Period', group='Deal start condition > Trading View custom signal', inline='3')

Target_profit = input.float(1.5, 'Target profit (%)', step=0.05, group='Take profit / Stop Loss', inline='1') * 0.01
Stop_Loss = input.int(15, 'Stop Loss (%)', group='Take profit / Stop Loss', inline='1',
 tooltip='This is the percentage that price needs to move in the opposite direction to your take profit target, at which point the bot will execute a Market Order on the exchange account to close the deal for a smaller loss than keeping the deal open.'
 + '\n' + 'Please note, the Stop Loss is calculated from the price the Safety Order at on the exchange account and not the Dollar Cost Average price.') * 0.01

Max_safety_trades_count = input.int(10, 'Max safety trades count', maxval=10, group='Safety orders', inline='1')
Price_deviation = input.float(0.4, 'Price deviation to open safety orders (% from initial order)', step=0.01, group='Safety orders', inline='2') * 0.01
Safety_order_volume_scale = input.float(1.8, 'Safety order volume scale', step=0.01, group='Safety orders', inline='3')
Safety_order_step_scale = input.float(1.19, 'Safety order step scale', step=0.01, group='Safety orders', inline='3')

// daily_volume  = input.int(500, "Don't start deal(s) if the daily volume is less than", group='Advanced settings', inline='1')
// Minimum_price  = input.int(500, "Minimum price to open deal", group='Advanced settings', inline='1')
// Maximum_price  = input.int(500, "Maximum price to open deal", group='Advanced settings', inline='1')

// Close_deal_after_timeout  = input.int(5, "Close deal after timeout (Hrs)", group='Advanced settings', inline='1')

initial_capital = 8913

strategy(
 title='3Commas Visible DCA Strategy', 
 overlay=true, 
 initial_capital=initial_capital, 
 pyramiding=11, 
 process_orders_on_close=true, 
 commission_type=strategy.commission.percent, 
 commission_value=0.01, 
 max_bars_back=5000, 
 max_labels_count=50)


// Position
status_none  = strategy.position_size == 0
status_long  = strategy.position_size[1] == 0 and strategy.position_size > 0
status_long_offset  = strategy.position_size[2] == 0 and strategy.position_size[1] > 0
status_short = strategy.position_size[1] == 0 and strategy.position_size < 0
status_increase = strategy.opentrades[1] < strategy.opentrades

Short_Moving_Average_Line = 
 Short_Moving_Average == 'SMA' ? ta.sma(close, Short_Period) :
 Short_Moving_Average == 'EMA' ? ta.ema(close, Short_Period) :
 Short_Moving_Average == 'HMA' ? ta.sma(close, Short_Period) : na

Long_Moving_Average_Line = 
 Long_Moving_Average == 'SMA' ? ta.sma(close, Long_Period) :
 Long_Moving_Average == 'EMA' ? ta.ema(close, Long_Period) :
 Long_Moving_Average == 'HMA' ? ta.sma(close, Long_Period) : na
 
Base_order_Condition      = Triger_Type == "Over" ? ta.crossover(Short_Moving_Average_Line, Long_Moving_Average_Line) : ta.crossunder(Short_Moving_Average_Line, Long_Moving_Average_Line) // Buy when close crossing lower band

safety_order_deviation(index) => Price_deviation * math.pow(Safety_order_step_scale,  index - 1)

pd = Price_deviation
ss = Safety_order_step_scale

step(i) =>
 i == 1 ? pd :
 i == 2 ? pd + pd * ss :
 i == 3 ? pd + (pd + pd * ss) * ss :
 i == 4 ? pd + (pd + (pd + pd * ss) * ss) * ss : 
 i == 5 ? pd + (pd + (pd + (pd + pd * ss) * ss) * ss) * ss : 
 i == 6 ? pd + (pd + (pd + (pd + (pd + pd * ss) * ss) * ss) * ss) * ss : 
 i == 7 ? pd + (pd + (pd + (pd + (pd + (pd + pd * ss) * ss) * ss) * ss) * ss) * ss : 
 i == 8 ? pd + (pd + (pd + (pd + (pd + (pd + (pd + pd * ss) * ss) * ss) * ss) * ss) * ss) * ss : 
 i == 9 ? pd + (pd + (pd + (pd + (pd + (pd + (pd + (pd + pd * ss) * ss) * ss) * ss) * ss) * ss) * ss) * ss : 
 i == 10 ? pd + (pd + (pd + (pd + (pd + (pd + (pd + (pd + (pd + pd * ss) * ss) * ss) * ss) * ss) * ss) * ss) * ss) * ss : na

long_line(i) =>
 close[1] - close[1] * (step(i))


Safe_order_line(i) =>
 i == 0 ? ta.valuewhen(status_long, long_line(0), 0) :
 i == 1 ? ta.valuewhen(status_long, long_line(1), 0) :
 i == 2 ? ta.valuewhen(status_long, long_line(2), 0) :
 i == 3 ? ta.valuewhen(status_long, long_line(3), 0) :
 i == 4 ? ta.valuewhen(status_long, long_line(4), 0) :
 i == 5 ? ta.valuewhen(status_long, long_line(5), 0) :
 i == 6 ? ta.valuewhen(status_long, long_line(6), 0) :
 i == 7 ? ta.valuewhen(status_long, long_line(7), 0) :
 i == 8 ? ta.valuewhen(status_long, long_line(8), 0) : 
 i == 9 ? ta.valuewhen(status_long, long_line(9), 0) :
 i == 10 ? ta.valuewhen(status_long, long_line(10), 0) : na

TP_line = strategy.position_avg_price * (1 + Target_profit) 

SL_line = Safe_order_line(Max_safety_trades_count) * (1 - Stop_Loss)

safety_order_size(i) => Safety_order_size * math.pow(Safety_order_volume_scale, i - 1)


plot(Short_Moving_Average_Line, 'Short MA', color=color.new(color.white, 0), style=plot.style_line)
plot(Long_Moving_Average_Line, 'Long MA', color=color.new(color.green, 0), style=plot.style_line)
plot(strategy.position_size > 0 and Max_safety_trades_count >= 1 ? Safe_order_line(1) : na, 'Safety order1', color=color.new(#009688, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 and Max_safety_trades_count >= 2 ? Safe_order_line(2) : na, 'Safety order2', color=color.new(#009688, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 and Max_safety_trades_count >= 3 ? Safe_order_line(3) : na, 'Safety order3', color=color.new(#009688, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 and Max_safety_trades_count >= 4 ? Safe_order_line(4) : na, 'Safety order4', color=color.new(#009688, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 and Max_safety_trades_count >= 5 ? Safe_order_line(5) : na, 'Safety order5', color=color.new(#009688, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 and Max_safety_trades_count >= 6 ? Safe_order_line(6) : na, 'Safety order6', color=color.new(#009688, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 and Max_safety_trades_count >= 7 ? Safe_order_line(7) : na, 'Safety order7', color=color.new(#009688, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 and Max_safety_trades_count >= 8 ? Safe_order_line(8) : na, 'Safety order8', color=color.new(#009688, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 and Max_safety_trades_count >= 9 ? Safe_order_line(9) : na, 'Safety order9', color=color.new(#009688, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 and Max_safety_trades_count >= 10 ? Safe_order_line(10) : na, 'Safety order10', color=color.new(#009688, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 ? TP_line : na, 'Take Profit', color=color.new(color.orange, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 ? SL_line : na, 'Safety', color=color.new(color.aqua, 0), style=plot.style_linebr)


currency = 
 Profit_currency == 'Quote (USDT)' ? ' USDT' :
 Profit_currency == 'Quote (BTC)'  ? ' BTC' :
 Profit_currency == 'Quote (BUSD)' ? ' BUSD' : na
 

if Base_order_Condition
    strategy.entry('Base order', strategy.long, qty=Base_order_size/close, when=Base_order_Condition and strategy.opentrades == 0,
     comment='BO' + ' - ' + str.tostring(Base_order_size) + str.tostring(currency))

for i = 1 to Max_safety_trades_count by 1
    i_s = str.tostring(i)
    strategy.entry('Safety order' + i_s, strategy.long, qty=safety_order_size(i)/close,
     limit=Safe_order_line(i), when=(strategy.opentrades <= i) and strategy.position_size > 0, 
     comment='SO' + i_s + ' - ' + str.tostring(safety_order_size(i))  + str.tostring(currency))


for i = 1 to Max_safety_trades_count by 1
    i_s = str.tostring(i)
    // strategy.close('Base order', when=shortCondition)
    // strategy.close('Safety order' + i_s, when=shortCondition)
    // strategy.cancel('Safety order' + i_s, when=shortCondition)
    strategy.cancel('SO' + i_s, when=ta.crossunder(low, SL_line) or ta.crossover(high, TP_line) or status_none)
    strategy.exit('TP/SL','Base order', limit=TP_line, stop=SL_line, comment = Safe_order_line(100) > close ? 'SL' + i_s + ' - ' +  str.tostring(Base_order_size) + str.tostring(currency) : 'TP' + i_s + ' - ' +  str.tostring(Base_order_size) + str.tostring(currency)) 
    strategy.exit('TP/SL','Safety order' + i_s, limit=TP_line, stop=SL_line, comment = Safe_order_line(100) > close ? 'SL' + i_s + ' - ' +  str.tostring(safety_order_size(i)) + str.tostring(currency) : 'TP' + i_s + ' - ' +  str.tostring(safety_order_size(i)) + str.tostring(currency)) 
    // strategy.cancel('TP/SP' + i_s, when=Base_order_Condition)
    // strategy.exit('Stop Loss','Base order', stop=SL_line)
    // strategy.exit('Stop Loss','Safety order' + i_s, stop=SL_line)
    
//----------------label A----------------//

bot_usage(i) =>
 i == 1 ? Base_order_size + safety_order_size(1) :
 i == 2 ? Base_order_size + safety_order_size(1) + safety_order_size(2) :
 i == 3 ? Base_order_size + safety_order_size(1) + safety_order_size(2) + safety_order_size(3) :
 i == 4 ? Base_order_size + safety_order_size(1) + safety_order_size(2) + safety_order_size(3) + safety_order_size(4) : 
 i == 5 ? Base_order_size + safety_order_size(1) + safety_order_size(2) + safety_order_size(3) + safety_order_size(4) + safety_order_size(5) :
 i == 6 ? Base_order_size + safety_order_size(1) + safety_order_size(2) + safety_order_size(3) + safety_order_size(4) + safety_order_size(5) + safety_order_size(6) : 
 i == 7 ? Base_order_size + safety_order_size(1) + safety_order_size(2) + safety_order_size(3) + safety_order_size(4) + safety_order_size(5) + safety_order_size(6) + safety_order_size(7) : 
 i == 8 ? Base_order_size + safety_order_size(1) + safety_order_size(2) + safety_order_size(3) + safety_order_size(4) + safety_order_size(5) + safety_order_size(6) + safety_order_size(7) + safety_order_size(8) : 
 i == 9 ? Base_order_size + safety_order_size(1) + safety_order_size(2) + safety_order_size(3) + safety_order_size(4) + safety_order_size(5) + safety_order_size(6) + safety_order_size(7) + safety_order_size(8) + safety_order_size(9) :
 i == 10 ? Base_order_size + safety_order_size(1) + safety_order_size(2) + safety_order_size(3) + safety_order_size(4) + safety_order_size(5) + safety_order_size(6) + safety_order_size(7) + safety_order_size(8) + safety_order_size(9) + safety_order_size(10) : na

equity = strategy.equity
bot_use = bot_usage(Max_safety_trades_count)
bot_dev = float(step(Max_safety_trades_count)) * 100
bot_ava = (bot_use / equity) * 100

string label_A = 
 'Balance                                      : ' + str.tostring(math.round(equity, 0), '###,###,###,###') + ' USDT' + '\n' + 
 'Max amount for bot usage           : ' + str.tostring(math.round(bot_use, 0), '###,###,###,###') + ' USDT' + '\n' + 
 'Max safety order price deviation : ' + str.tostring(math.round(bot_dev, 0), '##.##') + ' %' + '\n' + 
 '% of available balance                : ' + str.tostring(math.round(bot_ava, 0), '###,###,###,###') + ' %' 
 + (bot_ava > 100 ? '\n \n' +  '⚠ Warning! Bot will use amount greater than you have on exchange' : na) 


if status_long
    day_label = 
     label.new(
     x=time[1], 
     y=high * 1.03, 
     text=label_A, 
     xloc=xloc.bar_time, 
     yloc=yloc.price, 
     color=bot_ava > 100 ? color.new(color.yellow, 0) : color.new(color.black, 50), 
     style=label.style_label_lower_right, 
     textcolor=bot_ava > 100 ? color.new(color.red, 0) : color.new(color.silver, 0), 
     size=size.normal, 
     textalign=text.align_left)
```

> Detail

https://www.fmz.com/strategy/432314

> Last Modified

2023-11-16 11:32:12
