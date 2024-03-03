
> Name

RSI趋势追踪止损策略RSI-Trend-Following-Strategy-with-Trailing-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/deb2c8f31adb212a04.png)
 [trans]
## 概述

这是一个利用RSI指标判断趋势并设置止损止盈的量化交易策略。该策略结合 RSI 指标判断市场趋势方向,以及设置动态止损止盈来锁定利润,最大程度减少风险。

## 策略原理  

该策略主要通过 RSI 指标判断市场趋势方向来决定做多做空。当 RSI 指标上穿低位线时判断为市场处于上升趋势,做多;当 RSI 指标下穿高位线时判断为市场处于下降趋势,做空。

同时,策略通过追踪每单的开仓价格,设定浮动止损止盈。对做多单设定开仓价格的一定比例作为止损线,做空单则设定开仓价格的一定比例作为止盈线。当价格触碰止损止盈线时,策略会自动平仓止损或止盈。

## 策略优势

- 利用 RSI 指标判断市场趋势方向,避免交易盘整区间;
- 设定浮动止损止盈,能够灵活锁定利润,有效控制风险;  
- RSI 参数和止损止盈比例都可以通过外部输入进行调整优化。

## 策略风险  

- RSI 指标存在一定滞后,可能错过短期趋势转换点;  
- 止损止盈线过于靠近可能被突破清仓。

## 优化方向

- 可以测试不同周期的 RSI 指标判断效果;
- 可以测试不同的参数组合寻找最佳止损止盈比例;
- 可以加入附加指标判断过滤信号。

## 总结  

该策略整体来说是一个利用 RSI 指标追踪趋势,并配套浮动止损止盈的量化交易策略。相比单一指标交易策略,该策略在控制风险方面做得较好,可以有效锁定利润。通过参数优化和加入辅助指标判断可以进一步提高策略表现。

||

## Overview

This is a quantitative trading strategy that utilizes the RSI indicator to determine the market trend and sets stop loss and take profit to lock in profits and minimize risks.

## Strategy Logic

The strategy mainly uses the RSI indicator to determine the market trend direction for long or short trades. When the RSI line crosses above the lower line, it is determined as an upward trend and goes long. When the RSI line crosses below the upper line, it is judged as a downward trend and goes short.

At the same time, the strategy tracks the entry price of each order and sets a floating stop loss and take profit. For long orders, a certain percentage of the entry price is set as the stop loss line, and for short orders, a certain percentage of the entry price is set as the take profit line. When the price hits the stop loss or take profit line, the position will be closed automatically.

## Advantages

- Use RSI indicator to determine market trend, avoid trading in range-bound markets;
- Set floating stop loss and take profit to lock in profits flexibly and control risks effectively;
- RSI parameters and stop loss/take profit ratios are adjustable for optimization.

## Risks 

- RSI indicator has some lagging, may miss short-term trend reversal points;
- Stop loss and take profit lines that are too close may get hit easily.

## Optimization

- Test RSI indicators with different periods; 
- Test different parameter combinations to find the optimal stop loss/take profit ratios;
- Add additional indicators for signal filtering.

## Conclusion

In summary, this is a quantitative trading strategy that uses RSI indicator to track trends and incorporate floating stop loss and take profit. Compared to single indicator strategies, this strategy manages risks quite well by locking in profits flexibly. Further improvements can be made through parameters optimization and adding auxiliary indicators.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|8|(?Signals)5 day input or RSI1|
|v_input_int_2|28|RSI Lower|
|v_input_int_3|72|RSI Upper |
|v_input_int_4|200|EMA Period|
|v_input_int_5|true|Look back days for close/open|
|v_input_int_6|5|(?Order Controls)max open orders|
|v_input_int_7|40|Buy breakout range|
|v_input_float_1|1.15|(?TPSL)Buy TP: 1+TP %, .05 seems to work well.|
|v_input_float_2|0.975|Sell TP: 1-TP%. .025 seems to work well. |
|v_input_bool_1|false|(?Alerts)Turns on Buy/Sell Alerts|
|v_input_bool_2|false|Use default Buy/Sell or the messages below|
|v_input_1|Buy|Buy signal API/TXT message template|
|v_input_2|Sell|Sell signal API/TXT message template|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// ©chewyScripts.

//@version=5
strategy("96er RSI+200EMA Strategy + Alerts", overlay=true, shorttitle = "The old 96er - RSI5 + 200 EMA")
//,use_bar_magnifier=false 
// This works best on a small account $100, with 50% of equity and up to 10 max open trades. 
// 96% Profitable, turns $100 into $350 in 1 month. very few losses. super happy with it.
// So far it triples the account on a 1m chart in 1 month back testing on the SEI-USD pair.
// I did not test on FX pairs or other instruments.
// had some issues with the inputs not working so had to hard code some, also the lastClose var sometimes breaks and starts following every candle, not sure why.

in_r1 = input.int(8,"5 day input or RSI1", group = "Signals")
in_lowerRSI = input.int(28,"RSI Lower", group = "Signals")
in_upperRSI = input.int(72,"RSI Upper ", group = "Signals")
in_emaperiod = input.int(200,"EMA Period", group = "Signals")
in_daysback = input.int(1,"Look back days for close/open", group = "Signals")

in_openOrders = input.int(5,"max open orders",tooltip = "Be careful, to high and you will get margin called!! 5 is probably the highest you should go", group = "Order Controls")
in_buybreakout = input.int(40,"Buy breakout range", group = "Order Controls")

in_buyTP = input.float(1.1500,"Buy TP: 1+TP %, .05 seems to work well.", group = "TPSL")
in_sellTP = input.float(0.9750, "Sell TP: 1-TP%. .025 seems to work well. ", group = "TPSL")

in_useAlerts = input.bool(false,"Turns on Buy/Sell Alerts",group = "Alerts")
in_useCustomAlertMSG = input.bool(false,"Use default Buy/Sell or the messages below",group = "Alerts")
in_alertBuySignalTxt = input("Buy","Buy signal API/TXT message template", tooltip = "Review the UserGuid on JSON varibles in alerts", group = "Alerts")
in_alertSellSignalTxt = input("Sell","Sell signal API/TXT message template", tooltip = "Review the UserGuid on JSON varibles in alerts", group = "Alerts")

simple int rsi5 = in_r1

// 3 rsi strategy , when all of them are overbought we sell, and vice versa
rsi7 = ta.rsi(close,rsi5)
[lastOpen, lastClose] = request.security(syminfo.tickerid, "D", [open,close], lookahead = barmerge.lookahead_on)
rsi3 = ta.rsi(close[5],rsi5)

ma = ta.ema(close,in_emaperiod)

plot(rsi7,"5 Day RSI",color.red)
plot(lastClose,"Previous Days Close",color.green)
plot(lastOpen,"Previous Days Open",color.white)
plot(rsi3,"Previous 5th candles RSI",color.purple)
plot(ma,"200 EMA",color.blue)


//sell = ta.crossunder(rsi7,70) and ta.crossunder(rsi14,70) and ta.crossunder(rsi21,70)
//buy = ta.crossover(rsi7,in_lowerRSI) and close < ma and rsi3 <= in_upperRSI and strategy.opentrades < in_openOrders
//sell = ta.crossunder(rsi7,in_upperRSI) and close > ma and rsi3 >= in_lowerRSI3 and strategy.opentrades < in_openOrders

//buy condition
buy = ta.crossover(rsi7,in_lowerRSI) and close < ma and close < lastClose and strategy.opentrades < in_openOrders

// sell condition
sell = ta.crossunder(rsi7,in_upperRSI) and close > ma and close > lastClose and strategy.opentrades < in_openOrders


var lastBuy = close 
var lastSell = close 
//var buyLabel = label.new(na,na,yloc = yloc.belowbar, style = label.style_none, textcolor = color.green, size = size.normal)
//var sellLabel = label.new(na,na,yloc = yloc.abovebar, style = label.style_none, textcolor = color.red, size = size.normal)
if (buy)
    strategy.entry("BUY", strategy.long,alert_message = "Buy @"+str.tostring(close))
    lastBuy := close 
    //buyLabel := label.new(na,na,yloc = yloc.belowbar, style = label.style_none, textcolor = color.green, size = size.normal)
    //label.set_x(buyLabel,bar_index)
    //label.set_y(buyLabel,low)
    //label.set_text(buyLabel,"Buy!!@ " +str.tostring(lastBuy)  + "\n TP: " + str.tostring(lastBuy*in_buyTP) + "\n↑")
    if(not in_useAlerts)
        alert("Buy")

//label.delete(buyLabel)

if ((close >= lastBuy*in_buyTP ) or (rsi7 > in_buybreakout) and close >= lastClose and (close >= lastClose*in_buyTP or close >= lastBuy*in_buyTP ) )
    //label.new(bar_index,na,"TP!!@ " +str.tostring(close), yloc = yloc.abovebar, style = label.style_none, textcolor = color.green, size = size.normal)
    strategy.close("BUY", "BUY Exit",alert_message = "Buy Exit: TP @" +str.tostring(close) + " OR TP: " + str.tostring(lastBuy*in_buyTP))    
    if(not in_useAlerts)
        alert("Buy Exit")
    
if (sell)
    strategy.entry("SELL", strategy.short, alert_message = "Sell @ " + str.tostring(close))
    lastSell := close    
    //sellLabel := label.new(na,na,yloc = yloc.abovebar, style = label.style_none, textcolor = color.red, size = size.normal)
    //label.set_x(sellLabel,bar_index)
    //label.set_y(sellLabel,high)
    //label.set_text(sellLabel,"Sell!!@ " +str.tostring(lastSell)  + "\n TP: " + str.tostring(lastSell*in_sellTP) + "\n?")
    if(not in_useAlerts)
        alert("Sell")

//label.delete(sellLabel)

if ( close < ma and (close <= lastSell*in_sellTP ) or (close < lastClose*in_sellTP) )
    //label.new(bar_index,na,"TP!!@ " +str.tostring(close), yloc = yloc.belowbar, style = label.style_none, textcolor = color.red, size = size.normal)
    strategy.close("SELL", "Sell Exit", alert_message = "Sell Exit TP @" +str.tostring(close) + " OR TP: " + str.tostring(lastSell*in_sellTP))
    if(not in_useAlerts)
        alert("Sell Exit")


   
alertcondition(buy and in_useAlerts,"Buy Alert","test")
```

> Detail

https://www.fmz.com/strategy/440544

> Last Modified

2024-01-31 15:13:18
