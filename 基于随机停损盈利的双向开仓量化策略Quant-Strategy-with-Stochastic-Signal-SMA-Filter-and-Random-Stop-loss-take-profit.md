
> Name

基于随机停损盈利的双向开仓量化策略Quant-Strategy-with-Stochastic-Signal-SMA-Filter-and-Random-Stop-loss-take-profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/190c9f4e5aa698dc69f.png)
[trans]

## 概述

本策略名称为“DayLight Hunter双向开仓随机停损盈利量化策略”。该策略的主要思想是利用Stochastic指标产生买入和卖出信号,结合SMA均线进行过滤,实现双向开仓,并设置随机的止损止盈点,实现盈利。

## 策略原理

该策略使用5日线Stochastic指标的%K线和%D线交叉来产生交易信号。当%K线从下向上跨过%D线时,产生买入信号;当%K线从上向下跨过%D线时,产生卖出信号。为了过滤假信号,策略还引入了长度为50的SMA均线,只有当收盘价低于SMA低点时才产生买入信号,当收盘价高于SMA高点时才产生卖出信号。

收到买入信号时,策略会以固定数量开仓做多;收到卖出信号时,若为单边交易模式,会平仓之前的多单再开空单;若为对冲模式,则直接添加空单进行对冲。对每一个交易单位,策略都会设置一个随机的止损止盈点。具体来说,会根据当前价格的一定百分比收益作为止盈点,一定百分比损失作为止损点。这样可以锁定盈利,也可以控制风险。

## 策略优势

本策略最大的优势在于利用Stochastic指标的信号与SMA滤波实现了较低误报率的双向交易。这为获利提供了更大的机会。此外,策略的随机止盈止损机制,可以在盈利后及时止盈,避免盈利全部归零;也可以在出现较大亏损时止损,减小损失。所以,整体来说,策略的获利空间更大,风险控制也做得较好。

## 风险分析

该策略的主要风险在于Stochastic指标可能产生假信号,这会导致不必要的亏损。此外,随机设置的止盈止损点可能会过于激进,造成止盈止损过早或者过晚,从而影响收益。最后,对冲交易中无法及时止损也会导致亏损加大。

为降低风险,建议优化SMA均线的参数,过滤更多假信号。此外,可以考虑结合其他指标判断市场趋势,避免逆势交易。最后,要合理设置止损范围,并对对冲单位设置独立的止损点,控制风险。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化Stochastic指标的参数,寻找最佳参数组合,以减少假信号。

2. 优化或增加其他技术指标,辅助Stochastic指标判断趋势。例如MACD,KD等。

3. 使用机器学习等方法研究不同参数下Stochastic信号的正确率、胜率等指标,寻找其最优参数空间。

4. 优化随机止盈止损算法,使其更加智能化和动态化。例如结合移动止损、余额管理等思路。

5. 添加仓位控制模块,使其可以根据策略表现、市场环境等因素动态调整仓位。

## 总结

“DayLight Hunter双向开仓随机停损盈利量化策略”综合运用了Stochastic指标的交叉信号、SMA滤波原理、双向开仓思路和随机停损止盈方法。它具有信号相对准确、双向交易机会多、止盈止损灵活等优点,风险也在可控范围内。通过进一步优化参数设定、指标组合和风控模块,该策略可以获得更加稳定和出色的表现。它为量化交易实践提供了一个非常值得参考的范例。

||

## Overview

The strategy is named "DayLight Hunter Quant Strategy with Two-way Position, Stochastic Signal and Random Stop loss/take profit". The main idea is to generate trading signals with Stochastic indicator, filter the signals with SMA, implement two-way position opening, and set random stop loss and take profit points to lock in profits.  

## Strategy Logic

The strategy uses 5-day Stochastic Indicator %K and %D line crossovers to generate trading signals. When %K crosses over %D from below, a buy signal is generated. When %K crosses below %D from above, a sell signal is generated. To filter false signals, 50-day SMA lines are used - only when close price is below SMA low point, a buy signal is valid; only when close price is above SMA high point, a sell signal is valid.

Upon receiving a buy signal, the strategy will open long position with fixed quantity. Upon receiving a sell signal, if in one-way trading mode, it will close previous long position and open short position. If in hedging mode, it will simply open additional short position to hedge. For every trading unit, random stop loss and take profit points are set based on certain percentage of current price. This allows locking in profits and controlling risks.

## Advantages

The biggest advantage of this strategy is it uses Stochastic signals with SMA filter to achieve relatively low false signal rate in two-way trading. This provides more profit opportunities. In addition, the random stop loss/take profit mechanism allows taking profit in time after making profits, avoiding giving back all profits; and cutting losses in case of huge loss, to reduce loss. In summary, the strategy has larger profit margin and better risk control.  

## Risks

Main risks of this strategy include false signals of Stochastic indicator may lead to unnecessary losses; improper random stop loss/take profit points may be too aggressive, causing premature or late exit, impacting profitability; inability to cut loss in time in hedging trades can lead to amplification of losses.

To reduce risks, parameters of SMA filter can be optimized to filter out more false signals. Also consider combining other indicators to determine market trends to avoid trading against trends. Finally, reasonable stop loss range should be set, and independent stop loss points should be used for hedging units to control risk.

## Optimization Directions 

The strategies can be optimized in the following aspects:

1. Optimize parameters of Stochastic to find best parameter combination to reduce false signals.

2. Optimize or add other technical indicators to aid Stochastic in determining trends, e.g. MACD, KD etc.  

3. Use machine learning models to study metrics like accuracy, win rate etc of Stochastic signals under different parameters, to find optimal parameter space.

4. Optimize the random stop loss/take profit algorithms to make them more intelligent and dynamic, e.g. incorporate concepts like moving stop loss, position sizing etc.

5. Add position sizing module, allowing dynamic position adjustments based on performance, market regimes etc.

## Conclusion

The “DayLight Hunter Quant Strategy with Two-way Position, Stochastic Signal and Random Stop loss/take profit” combines Stochastic crossover signals, SMA filter principle, two-way trading and random stop loss/take profit method. It has advantages like relatively accurate signals, abundant two-way trading opportunities, flexible stop loss/profit taking, and risks within acceptable range. Further optimizations on parameter tuning, indicator combinations and risk control modules can help achieve more stable and better performance. It provides a very good reference case for quantitative trading practice.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_3|0|Position: bottom_center|middle_right|bottom_right|top_center|middle_center|top_right|middle_left|bottom_left|
|v_input_string_4|0|size: auto|tiny|small|normal|
|v_input_color_1|blue|color_Net|
|v_input_string_1|0|(?Mode Trade)⚖️ Mode For Trade [Oneway / Hedge]: Hedge|Oneway|
|v_input_string_2|0|⚖️ Risk Signal Mode [Low / Medium / High]: Low Risk|Medium Risk|High Risk|
|v_input_int_1|15|(?Stochastic Setting)%K Length|
|v_input_int_2|3|%K Smoothing|
|v_input_int_3|3|%D Smoothing|
|v_input_bool_1|true|(?SMA Filter Mode)SMA High and Low Filter Mode|
|v_input_int_4|50|SMA High|
|v_input_int_5|50|SMA Low|
|v_input_bool_2|true|(?=====??? TAKE PROFIT & STOP LOSS BY [%] ???=====)? Take Profit & Stop Loss By Percent (%)|
|v_input_float_1|false|? TP [LONG] % >> [Oneway Only]|
|v_input_float_2|false|? TP [SHORT] % >> [Oneway Only]|
|v_input_float_3|false|? Stop Loss %|
|v_input_float_4|true|? TP by PNL $ eg. (0.1 = 0.1$)|
|v_input_float_5|0.35|? Spread Point Size(Eg. 35 Point or 350 Point From Your Broker Digits)|
|v_input_int_6|500|(?===??? Hedge Mode ???===)? Hedge Point Range|
|v_input_float_6|2|✳️ Martingale For Hedge Multiply [default = 2]|
|v_input_1|timestamp(01 Jan 1945 00:00 +0000)|(?════════⌚⌚ INPUT BACKTEST TIME RANGE ⌚⌚════════)Start|
|v_input_2|timestamp(01 Jan 2074 23:59 +0000)|End|
|v_input_3|{{strategy.order.alert_message}}|(?═ Bot Setting ═ n >> If You Dont Use Bot Just Pass It)Alert Message for BOT|
|v_input_4|Input Your TimeFrame [1m, 15m, 1h, 4h, 1d ,1w]|TimeFrame Text Alert|
|v_input_bool_3|true|(?= PNL MONITOR SETTING =)Monitor Profit&Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-31 00:00:00
end: 2024-01-07 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
var int slippage = 0
strategy("X48 - DayLight Hunter | Strategy | V.01.01", overlay=true, calc_on_order_fills = true, initial_capital = 50,default_qty_type = strategy.fixed, default_qty_value = 1, commission_type = strategy.commission.percent, commission_value = 0, currency = currency.USD, slippage = 0)

var bool hedge_mode = false
var int sto_buy = 0
var int sto_sell = 0

Trade_Mode = input.string(defval = "Hedge", title = "⚖️ Mode For Trade [Oneway / Hedge]", options = ["Oneway", "Hedge"], group = "Mode Trade", tooltip = "Oneway = Switching Position Type With Signal\nHedge Mode = Not Switching Position Type Unitl TP or SL")
Risk_Mode = input.string(defval = "Low Risk", title = "⚖️ Risk Signal Mode [Low / Medium / High]", options = ["Low Risk", "Medium Risk", "High Risk"], group = "Mode Trade", tooltip = "[[Signal Form Stochastic]]\nLow Risk is >= 80 and <= 20\nMedium Risk is >= 70 and <= 30\nHigh Risk is >= 50 and <=50")

if Trade_Mode == "Oneway"
    hedge_mode := false
else
    hedge_mode := true

if Risk_Mode == "Low Risk"
    sto_buy := 20
    sto_sell := 80
else if Risk_Mode == "Medium Risk"
    sto_buy := 30
    sto_sell := 70
else if Risk_Mode == "High Risk"
    sto_buy := 50
    sto_sell := 50

periodK = input.int(15, title="%K Length", minval=1, group = "Stochastic Setting", inline = "Sto0")
smoothK = input.int(3, title="%K Smoothing", minval=1, group = "Stochastic Setting", inline = "Sto0")
periodD = input.int(3, title="%D Smoothing", minval=1, group = "Stochastic Setting", inline = "Sto0")

SMA_Mode = input.bool(defval = true, title = "SMA High and Low Filter Mode", group = "SMA Filter Mode", tooltip = "Sell Signal With Open >= SMA High\nBuy Signal With Close <= SMA Low")
SMA_High = input.int(defval = 50, title = "SMA High", group = "SMA Filter Mode", inline = "SMA1")
SMA_Low = input.int(defval = 50, title = "SMA Low", group = "SMA Filter Mode", inline = "SMA1")

k = ta.sma(ta.stoch(close, high, low, periodK), smoothK)
d = ta.sma(k, periodD)
high_line = ta.sma(high, SMA_High)
low_line = ta.sma(low, SMA_Low)
plot(SMA_Mode ? high_line : na, "H-Line", color = color.yellow, linewidth = 2)
plot(SMA_Mode ? low_line : na, "L-Line", color = color.blue, linewidth = 2)

entrybuyprice = strategy.position_avg_price

var bool longcondition = na
var bool shortcondition = na

if SMA_Mode == true
    longcondition := ta.crossover(k,d) and d <= sto_buy and close < low_line and open < low_line// or ta.crossover(k, 20)// and close <= low_line
    shortcondition := ta.crossunder(k,d) and d >= sto_sell and close > high_line and open > high_line// or ta.crossunder(k, 80)// and close >= high_line
else
    longcondition := ta.crossover(k,d) and d <= sto_buy
    shortcondition := ta.crossunder(k,d) and d >= sto_sell
//longcondition_double = ta.crossover(d,20) and close < low_line// and strategy.position_size > 0
//shortcondition_double = ta.crossunder(d,80) and close > high_line// and strategy.position_size < 0

//=============== TAKE PROFIT and STOP LOSS by % =================

tpsl(percent) =>
    strategy.position_avg_price * percent / 100 / syminfo.mintick
GR4 = "=====??? TAKE PROFIT & STOP LOSS BY [%] ???====="
mode= input.bool(title="? Take Profit & Stop Loss By Percent (%)", defval=true, group=GR4, tooltip = "Take Profit & Stop Loss by % Change\n0 = Disable")
tp_l = tpsl(input.float(0, title='? TP [LONG] % >> [Oneway Only]', group=GR4, tooltip = "0 = Disable"))
tp_s = tpsl(input.float(0, title='? TP [SHORT] % >> [Oneway Only]', group=GR4, tooltip = "0 = Disable"))
sl = tpsl(input.float(0, title='? Stop Loss %', group=GR4, tooltip = "0 = Disable"))
tp_pnl = input.float(defval = 1, title = "? TP by PNL $ eg. (0.1 = 0.1$)", group = GR4)
spread_size = input.float(defval = 0.350, title = "? Spread Point Size(Eg. 35 Point or 350 Point From Your Broker Digits)", tooltip = "Spread Point Form Your Broker \nEg. 1920.124 - 1920.135 or 1920.12 - 1920.13\nPlease Check From Your Broker", group = GR4)

GR5 = "===??? Hedge Mode ???==="
//hedge_mode = input.bool(defval = true, title = "⚖️ Hedge Mode", group = GR5)
hedge_point = input.int(defval = 500, title = "? Hedge Point Range", group = GR5, tooltip = "After Entry Last Position And Current Price More Than Point Range Are Open New Hedge Position")
hedge_gale = input.float(defval = 2.0, title = "✳️ Martingale For Hedge Multiply [default = 2]", tooltip = "Martingale For Multiply Hedge Order", group = GR5)
hedge_point_size = hedge_point/100

calcStopLossPrice(OffsetPts) =>
    if strategy.position_size > 0
        strategy.position_avg_price - OffsetPts * syminfo.mintick
    else if strategy.position_size < 0
        strategy.position_avg_price + OffsetPts * syminfo.mintick
    else
        na

calcStopLossL_AlertPrice(OffsetPts) =>
    strategy.position_avg_price - OffsetPts * syminfo.mintick
calcStopLossS_AlertPrice(OffsetPts) =>
    strategy.position_avg_price + OffsetPts * syminfo.mintick

calcTakeProfitPrice(OffsetPts) =>
    if strategy.position_size > 0
        strategy.position_avg_price + OffsetPts * syminfo.mintick
    else if strategy.position_size < 0
        strategy.position_avg_price - OffsetPts * syminfo.mintick
    else
        na

calcTakeProfitL_AlertPrice(OffsetPts) =>
    strategy.position_avg_price + OffsetPts * syminfo.mintick
calcTakeProfitS_AlertPrice(OffsetPts) =>
    strategy.position_avg_price - OffsetPts * syminfo.mintick

var stoploss = 0.
var stoploss_l = 0.
var stoploss_s = 0.
var takeprofit = 0.
var takeprofit_l = 0.
var takeprofit_s = 0.
var takeprofit_ll = 0.
var takeprofit_ss = 0.

if mode == true
    if (strategy.position_size > 0)
        if sl > 0
            stoploss := calcStopLossPrice(sl)
            stoploss_l := stoploss
        else if sl <= 0
            stoploss := na
        if tp_l > 0
            takeprofit := tp_l
            takeprofit_ll := close + ((close/100)*tp_l)
            //takeprofit_s := na
        else if tp_l <= 0
            takeprofit := na
    if (strategy.position_size < 0)
        if sl > 0
            stoploss := calcStopLossPrice(sl)
            stoploss_s := stoploss
        else if sl <= 0
            stoploss := na
        if tp_s > 0
            takeprofit := tp_s
            takeprofit_ss := close - ((close/100)*tp_s)
            //takeprofit_l := na
        else if tp_s <= 0
            takeprofit := na
    else if strategy.position_size == 0
        stoploss := na
        takeprofit := na
        //takeprofit_l := calcTakeProfitL_AlertPrice(tp_l)
        //takeprofit_s := calcTakeProfitS_AlertPrice(tp_s)
        //stoploss_l := calcStopLossL_AlertPrice(sl)
        //stoploss_s := calcStopLossS_AlertPrice(sl)

//////////// INPUT BACKTEST RANGE ////////////////////////////////////////////////////
var string BTR1         = '════════⌚⌚ INPUT BACKTEST TIME RANGE ⌚⌚════════'
i_startTime             = input(defval = timestamp("01 Jan 1945 00:00 +0000"), title = "Start", inline="timestart", group=BTR1, tooltip = 'Start Backtest YYYY/MM/DD')
i_endTime               = input(defval = timestamp("01 Jan 2074 23:59 +0000"), title = "End", inline="timeend", group=BTR1, tooltip = 'End Backtest YYYY/MM/DD')
//////////////// Strategy Alert For X4815162342 BOT //////////////////////
Text_Alert_Future = '{{strategy.order.alert_message}}'
copy_Fu = input( defval= Text_Alert_Future ,    title="Alert Message for BOT", inline = '00'  ,group = '═ Bot Setting ═ \n >> If You Dont Use Bot Just Pass It' ,tooltip = 'Alert For X48-BOT > Copy and Paste To Alert Function')
TimeFrame_input = input(defval= 'Input Your TimeFrame [1m, 15m, 1h, 4h, 1d ,1w]' ,    title="TimeFrame Text Alert", inline = '00'  ,group = '═ Bot Setting ═ \n >> If You Dont Use Bot Just Pass It')
string Alert_EntryL = '? Asset : {{ticker}} \n? Status : {{strategy.market_position}}\n? TimeFrame : '+str.tostring(TimeFrame_input)+'\n? Price : {{strategy.order.price}} $\n✅ TP : '+str.tostring(takeprofit_ll)+' $\n❌ SL : '+str.tostring(stoploss_l)+' $\n⏰ Time : {{timenow}}'
string Alert_EntryS = '? Asset : {{ticker}} \n? Status : {{strategy.market_position}}\n? TimeFrame : '+str.tostring(TimeFrame_input)+'\n? Price : {{strategy.order.price}} $\n✅ TP : '+str.tostring(takeprofit_ss)+' $\n❌ SL : '+str.tostring(stoploss_s)+' $\n⏰ Time : {{timenow}}'
string Alert_TPSL = '? Asset : {{ticker}}\n? TimeFrame : '+str.tostring(TimeFrame_input)+'\n? {{strategy.order.comment}}\n? Price : {{strategy.order.price}} $\n⏰ Time : {{timenow}}'

if true
    if longcondition
        strategy.entry("Long", strategy.long, comment = "?", alert_message = Alert_EntryL)
    //if longcondition_double
    //    //strategy.cancel_all()
    //    strategy.entry("Long2", strategy.long, comment = "??")
    //    //strategy.exit("Exit",'Long', qty_percent = 100 , profit = takeprofit, stop = stoploss, comment_profit = "TP?L", comment_loss = "SL?L")
    if shortcondition
        strategy.entry("Short", strategy.short, comment = "?", alert_message = Alert_EntryS)
        //strategy.exit("Exit",'Short', qty_percent = 100, profit = takeprofit, stop = stoploss, comment_profit = "TP❤️️S", comment_loss = "SL❤️️S")
    //if shortcondition_double
    //    //strategy.cancel_all()
    //    strategy.entry("Short2", strategy.short, comment = "??")

if strategy.position_size > 0 and strategy.opentrades >= 1 and hedge_mode == true
    entrypricel = strategy.opentrades.entry_price(strategy.opentrades - 1)
    callpointsize =  entrypricel - close
    lastsize = strategy.position_size
    if callpointsize >= hedge_point_size and longcondition
        strategy.order("Long2", strategy.long, qty = lastsize * hedge_gale, comment = "?⌛", alert_message = Alert_EntryL)

else if strategy.position_size < 0 and strategy.opentrades >= 1 and hedge_mode == true
    entryprices = strategy.opentrades.entry_price(strategy.opentrades - 1)
    callpointsize = (entryprices - close)* -1
    lastsize = (strategy.position_size) * -1
    if callpointsize >= hedge_point_size and shortcondition
        strategy.order("Short2", strategy.short, qty = lastsize * hedge_gale, comment = "?⌛", alert_message = Alert_EntryS)

last_price_l = (strategy.opentrades.entry_price(strategy.opentrades - 1) + (strategy.opentrades.entry_price(strategy.opentrades - 1)/100) * takeprofit) + spread_size
last_price_s = (strategy.opentrades.entry_price(strategy.opentrades - 1) - (strategy.opentrades.entry_price(strategy.opentrades - 1)/100) * takeprofit) - spread_size 
current_price = request.security(syminfo.tickerid, "1", close)
current_pricel = request.security(syminfo.tickerid, "1", close) + spread_size
current_prices = request.security(syminfo.tickerid, "1", close) - spread_size
//if mode == true
if strategy.position_size > 0 and strategy.openprofit >= tp_pnl and mode == true and hedge_mode == true
    lastsize = strategy.position_size
    lastprofitorder = strategy.openprofit
    //if lastprofitorder >= 0.07
    //strategy.close('Long', qty = lastsize, comment = "TP?L", alert_message = Alert_TPSL, immediately = true)
    strategy.cancel_all()
    strategy.close_all(comment = "TP?PNL", alert_message = Alert_TPSL, immediately = true)
    //strategy.close_all(comment = "TP?LH", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Long2', qty_percent = 100, profit = last_price_l, stop = stoploss, comment_profit = "TP?LH", comment_loss = "SL?LH", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Long', qty_percent = 100, profit = last_price_l, stop = stoploss, comment_profit = "TP?L", comment_loss = "SL?L", alert_message = Alert_TPSL)
else if strategy.position_size > 0 and strategy.openprofit < tp_pnl and mode == true and hedge_mode == true
    strategy.exit("Exit",'Long', qty_percent = 100, stop = stoploss, comment_loss = "SL?%L", alert_message = Alert_TPSL)

if strategy.position_size > 0 and mode == true and hedge_mode == false
    //strategy.close_all(comment = "TP?LH", alert_message = Alert_TPSL, immediately = true)
    strategy.exit("Exit",'Long', qty_percent = 100, profit = takeprofit, stop = stoploss, comment_profit = "TP?%L", comment_loss = "SL?%L", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Long', qty_percent = 100, profit = takeprofit, stop = stoploss, comment_profit = "TP?LL", comment_loss = "SL?L", alert_message = Alert_TPSL)

//else if strategy.position_size > 0 and strategy.opentrades > 1
//    lastsize = strategy.position_size
//    lastprofitorder = strategy.openprofit
//    if lastprofitorder >= 0.07
//        strategy.close_all(comment = "TP?LL", alert_message = Alert_TPSL)
if strategy.position_size < 0 and strategy.openprofit >= tp_pnl and mode == true and hedge_mode == true
    lastsize = (strategy.position_size) * -1
    lastprofitorder = strategy.openprofit
    //if lastprofitorder >= 0.07
    //strategy.close('Short', qty = lastsize, comment = "TP❤️️S", alert_message = Alert_TPSL, immediately = true)
    strategy.cancel_all()
    strategy.close_all(comment = "TP❤️️PNL", alert_message = Alert_TPSL, immediately = true)
    //strategy.close_all(comment = "TP❤️️SH", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Short2', qty_percent = 100, profit = last_price_s, stop = stoploss, comment_profit = "TP❤️️SH", comment_loss = "SL❤️️SH", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Short', qty_percent = 100, profit = last_price_s, stop = stoploss, comment_profit = "TP❤️️S", comment_loss = "SL❤️️S", alert_message = Alert_TPSL)
else if strategy.position_size < 0 and strategy.openprofit < tp_pnl and mode == true and hedge_mode == true
    strategy.exit("Exit",'Short', qty_percent = 100, stop = stoploss, comment_loss = "SL❤️️%S", alert_message = Alert_TPSL)
if strategy.position_size < 0 and mode == true and hedge_mode == false
    //strategy.close_all(comment = "TP❤️️SH", alert_message = Alert_TPSL, immediately = true)
    strategy.exit("Exit",'Short', qty_percent = 100, profit = takeprofit, stop = stoploss, comment_profit = "TP❤️️%S", comment_loss = "SL❤️️%S", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Short', qty_percent = 100, profit = takeprofit, stop = stoploss, comment_profit = "TP❤️️S", comment_loss = "SL❤️️S", alert_message = Alert_TPSL)

//else if strategy.position_size < 0 and strategy.opentrades > 1
//    lastsize = (strategy.position_size) * -1
//    lastprofitorder = strategy.openprofit
//    if lastprofitorder >= 0.07
//        strategy.close_all(comment = "TP❤️️SS", alert_message = Alert_TPSL)

//===================== เรียกใช้  library =========================
import X4815162342/X48_LibaryStrategyStatus/2 as fuLi 
//แสดงผล Backtest

show_Net = input.bool(true,'Monitor Profit&Loss', inline = 'Lnet', group = '= PNL MONITOR SETTING =')
position_ = input.string('bottom_center','Position', options = ['top_right','middle_right','bottom_right','top_center','middle_center','bottom_center','middle_left','bottom_left'] , inline = 'Lnet')
size_i = input.string('auto','size', options = ['auto','tiny','small','normal'] , inline = 'Lnet') 
color_Net = input.color(color.blue,"" , inline = 'Lnet')
// fuLi.NetProfit_Show(show_Net , position_ , size_i,  color_Net )

```

> Detail

https://www.fmz.com/strategy/438050

> Last Modified

2024-01-08 16:07:02
