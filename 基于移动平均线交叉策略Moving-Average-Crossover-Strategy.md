
> Name

基于移动平均线交叉策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/862f019cbeee62282f.png)
[trans]

## 概述

本策略基于移动平均线交叉原理,当短期均线从下方上穿长期均线时做多,当短期均线从上方向下穿长期均线时做空,属于典型的趋势跟踪策略。

## 策略原理

该策略主要通过计算短期与长期两条简单移动平均线,并根据它们的交叉情况判断趋势方向。

具体来说,策略首先计算短期均线xMA和长期均线,短期均线长度为Len,长期均线长度为2*Len。

然后策略判断短期均线是否上穿长期均线,如果发生上穿则产生做多信号;判断短期均线是否下穿长期均线,如果发生下穿则产生做空信号。

收到做多信号后,若当前没有持仓,则按市价开仓做多;收到做空信号后,若当前没有持仓,则按市价开仓做空。

此外,策略还设置了止损止盈点。做多后设置止损价为入场价-止损百分比*入场价,止盈价为入场价+止盈百分比*入场价;做空后设置止损价为入场价+止损百分比*入场价,止盈价为入场价-止盈百分比*入场价。

最后,策略还输出均线的可视化曲线,以辅助判断趋势。

## 策略优势

- 思路简单清晰,容易理解实现,适合新手学习;

- 基于移动平均线判断趋势方向,可以有效跟踪市场趋势;

- 设置止损止盈点,可以控制风险;

- 可视化展示均线曲线,直观反映趋势变化。

## 策略风险

- 均线具有滞后性,可能引发错过最佳入场时点的风险;

- 止损点设置不合理可能导致止损过于宽松或过于严格;

- 股价剧烈波动时,均线产生假信号的可能;

- 仅基于均线周期参数进行参数优化,可能导致过拟合。

可以通过适当宽松止损,优化均线周期参数组合,增加其他指标过滤来减少这些风险。

## 策略优化方向 

- 增加其他指标进行过滤,例如MACD,KDJ等,避免均线错位产生错误信号;

- 对短期均线和长期均线长度进行多组合优化,找到最佳参数组合;

- 测试不同的止损止盈策略,如之字止损,移动止损等方式;

- 添加仓位管理模块,优化资金利用效率。

## 总结

本策略整体思路清晰简洁,基于均线交叉判断趋势方向,可有效跟踪趋势,且风险可控,适合新手学习参考。但仅依赖均线可能出现错误信号,优化空间还很大,可以从多方面进行优化改进,使策略更稳健可靠。

||


## Overview

This strategy is based on the moving average crossover principle. It goes long when the short-term moving average crosses above the long-term moving average from below, and goes short when the short-term moving average crosses below the long-term moving average from above. It's a typical trend following strategy.

## Strategy Logic

The strategy mainly calculates the short-term and long-term simple moving averages, and determines the trend direction based on their crossover. 

Specifically, it first calculates the short-term moving average xMA and the long-term moving average, where the short-term period is Len, and the long-term period is 2*Len.

Then it checks if the short-term MA crosses above the long-term MA, and generates a long signal if the crossover happens. It also checks if the short-term MA crosses below the long-term MA, and generates a short signal if the crossover happens.

Upon receiving a long signal, it opens a long position at market price if there is no position. Upon receiving a short signal, it opens a short position at market price if there is no position.

In addition, stop loss and take profit points are configured. For long trades, the stop loss is set at entry price - stop loss percentage * entry price, and take profit at entry price + take profit percentage * entry price. For short trades, the stop loss is set at entry price + stop loss percentage * entry price, and take profit at entry price - take profit percentage * entry price. 

Finally, the moving averages are plotted for visualization to assist with trend determination.

## Advantages

- Simple and easy to understand, suitable for beginners.

- Can effectively track market trends based on moving average crossovers. 

- Risks are controlled by configuring stop loss and take profit.

- Visualization of moving averages intuitively reflects trend changes.

## Risks

- Moving averages have lagging effects, which may cause missing the best entry points.

- Improper stop loss configuration may result in stops being too wide or too tight.

- Prices whipsawing may generate false signals.

- Optimizing solely based on the moving average periods may lead to overfitting.

These risks can be reduced by using looser stops, optimizing moving average period combinations, adding filter indicators etc.

## Optimization Directions

- Add other indicators like MACD, KDJ for filtering to avoid false signals.

- Optimize combinations of short and long moving average periods to find optimum parameters.  

- Test different stop loss/take profit strategies like trailing stops.

- Add position sizing to optimize capital utilization.

## Summary

The strategy has a clear and simple logic, can track trends effectively based on moving average crossovers, and has controllable risks. It is suitable for beginners to learn from. But relying solely on moving averages may generate false signals. There is still much room for optimizating it in various aspects to make it more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_2|13|Len|
|v_input_float_3|7|Take Profit %|
|v_input_float_4|7|Stop Loss %|
|v_input_1||(?entry)Signal Token|
|v_input_string_1|0|Order Type: market|limit|
|v_input_float_1|false|Order Price Offset|
|v_input_string_2|0|Investment Type: percentage_balance|contract|margin|percentage_investment|
|v_input_float_2|100|Amount|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-23 00:00:00
end: 2023-10-23 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//@strategy_alert_message {{strategy.order.alert_message}} 
////////////////////////////////////////////////////////////
//  Copyright by HPotter v2.0 19/09/2023
// MA Crossover Bot for OKX Exchange
////////////////////////////////////////////////////////////
var ALERTGRP_CRED = "entry"
signalToken = input("", "Signal Token", inline = "11", group = ALERTGRP_CRED)
OrderType = input.string("market", "Order Type", options = ["market", "limit"], inline = "21", group = ALERTGRP_CRED)
OrderPriceOffset = input.float(0, "Order Price Offset", minval = 0, maxval = 100, step = 0.01, inline = "21", group = ALERTGRP_CRED)
InvestmentType = input.string("percentage_balance", "Investment Type", options = ["margin", "contract", "percentage_balance", "percentage_investment"], inline = "31", group = ALERTGRP_CRED)
Amount = input.float(100, "Amount", minval = 0.01, inline = "31", group = ALERTGRP_CRED)

getAlertMsg(action, instrument, signalToken, orderType, orderPriceOffset, investmentType, amount) =>
    str = '{'
    str := str + '"action": "' + action + '", '
    str := str + '"instrument": "' + instrument + '", '
    str := str + '"signalToken": "' + signalToken + '", '
    //str := str + '"timestamp": "' + str.format_time(timenow, "yyyy-MM-dd'T'HH:mm:ssZ", "UTC+0") + '", '
    str := str + '"timestamp": "' + '{{timenow}}' + '", '
    str := str + '"orderType": "' + orderType + '", '
    str := str + '"orderPriceOffset": "' + str.tostring(orderPriceOffset) + '", '
    str := str + '"investmentType": "' + investmentType + '", '
    str := str + '"amount": "' + str.tostring(amount) + '"'
    str := str + '}'
    str

getOrderAlertMsgExit(action, instrument, signalToken) =>
    str = '{'
    str := str + '"action": "' + action + '", '
    str := str + '"instrument": "' + instrument + '", '
    str := str + '"signalToken": "' + signalToken + '", '
    str := str + '"timestamp": "' + '{{timenow}}' + '", '
    str := str + '}'
    str

strategy(title='OKX: MA Crossover', overlay=true)
Len = input(13)
Profit = input.float(7, title='Take Profit %', minval=0.01) / 100
Stop =  input.float(7, title='Stop Loss %', minval=0.01) / 100
xMA = ta.sma(close, Len)
//Robot State
isLong = strategy.position_size > 0 
isShort = strategy.position_size < 0 
isFlat = strategy.position_size == 0 
//Current Signal
doLong = low < xMA[1] ? true : false
doShort =   high > xMA[1] ? true:  false
//Backtest Start Date
tm =  timestamp(2022, 01, 01, 09, 30)
//Entry and exit orders
if  doLong[2] == false and isLong == false and doLong and time > tm
    strategy.cancel_all()
    buyAlertMsgExit = getOrderAlertMsgExit(action = 'EXIT_LONG', instrument = syminfo.ticker, signalToken = signalToken)
    buyAlertMsg = getAlertMsg(action = 'ENTER_LONG', instrument = syminfo.ticker, signalToken = signalToken, orderType =  OrderType, orderPriceOffset =  OrderPriceOffset, investmentType =  InvestmentType, amount = Amount)
    strategy.entry('Long', strategy.long, limit = close, comment='Long', alert_message =buyAlertMsg)
    strategy.exit("ExitLong", 'Long', stop=close - close * Stop  , limit = close + close * Profit , qty_percent = 100, alert_message = buyAlertMsgExit)  
if doShort[2] == false and isShort == false and doShort and time > tm
    strategy.cancel_all()
    sellAlertMsgExit = getOrderAlertMsgExit(action = 'EXIT_SHORT', instrument = syminfo.ticker, signalToken = signalToken)
    sellAlertMsg = getAlertMsg(action = 'ENTER_SHORT', instrument = syminfo.ticker, signalToken = signalToken, orderType =  OrderType, orderPriceOffset =  OrderPriceOffset, investmentType =  InvestmentType, amount = Amount)
    strategy.entry('Short', strategy.short, limit=close, comment='Short', alert_message = sellAlertMsg)
    strategy.exit("ExitShort", 'Short', stop=close + close * Stop  , limit = close - close * Profit  , qty_percent = 100, alert_message = sellAlertMsgExit)  
//Visual
barcolor(isShort  ? color.red : isLong ? color.green : color.blue)
plot(xMA, color=color.new(color.red, 0), title='MA')
```

> Detail

https://www.fmz.com/strategy/430064

> Last Modified

2023-10-24 16:39:40
