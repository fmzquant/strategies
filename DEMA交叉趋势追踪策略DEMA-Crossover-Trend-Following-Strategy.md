
> Name

DEMA交叉趋势追踪策略DEMA-Crossover-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ad583c41ddf8c8e92d.png)
[trans]
### 概述

该策略基于双指数移动平均线(DEMA)的交叉作为交易信号,采用趋势追踪方式,自动设置止损和止盈。策略优点是交易信号清晰,止损止盈设置灵活,能够有效控制风险。

### 策略原理

1. 计算快线DEMA(8日)、慢线DEMA(24日)和辅助线DEMA(可配置)。

2. 当快线上穿慢线产生金叉信号时,做多;当快线下穿慢线产生死叉信号时,做空。

3. 添加交易信号过滤,只有当辅助线的当日值高于前一日时,才生成信号,避免假突破。

4. 采用趋势追踪止损机制,止损线会随价格走势进行调整,确保止损点锁定部分利润。

5. 同时设置固定比例止损和止盈,控制单笔交易最大损失和盈利。

### 策略优势

1. 交易信号清晰,容易判断进出场时机。

2. 双DEMA算法更平滑,避免被过度优化,信号更可靠。 

3. 辅助线过滤增加信号判断效果,减少假信号。

4. 采用趋势追踪止损,可以锁定部分利润,有效控制风险。

5. 设置固定比例止损止盈,控制单笔交易最大损失,避免超出风险范围。

### 策略风险

1. 在震荡行情中,可能产生频繁交易,容易posure增大,造成策略亏损。

2. 设置固定止损比例过大,在异常行情中可能触发大额止损。

3. DEMA交叉信号滞后,在快速行情中买入靠近行情高点,会增加亏损风险。

4. 在部署实盘时,滑点成本会对盈利性造成影响,需要调整止盈止损参数。

### 策略优化

1. 可以根据市场情况调整DEMA参数,寻找最佳平衡点。

2. 在实盘中要考虑滑点成本,适当扩大固定止损范围。

3. 可以增加其他辅助判断指标,如MACD等,增强信号效果。 

4. 可以设置追踪止损步进值,优化止损逻辑。

### 总结

该策略利用DEMA的趋势判断能力,结合趋势追踪机制控制风险,在Determine trend direction的交易策略体系中是非常典型的代表。总体来说,该策略信号清晰,止损止盈设置合理,是一种容易掌握、风险可控的交易策略。在实盘中结合滑点成本优化和辅助指标判断,可以获得较好的投资回报。

||

### Overview

This strategy is based on the crossover of double exponential moving average (DEMA) as trading signals and adopts a trend following approach with automated stop loss and take profit setting. The advantages of this strategy are clear trading signals, flexible stop loss/take profit configuration and effective risk control.

### Strategy Logic  

1. Calculate fast DEMA line (8-day), slow DEMA line (24-day) and auxiliary DEMA line (configurable).

2. When fast line crosses above slow line and a gold cross signal is generated, go long. When fast line crosses below slow line and a dead cross signal is generated, go short.

3. Add signal filter that signals are only triggered when the current value of auxiliary line is higher than previous day, avoiding false breakout.  

4. Adopt trend following stop loss mechanism where stop loss line keeps adjusting based on price movement, locking in partial profits.

5. At the same time set fixed percentage stop loss and take profit to limit maximum loss and profit per trade.

### Advantages

1. Clear trading signals, easy to determine entry and exit timing.

2. Double DEMA algorithm is smoother, avoids overfitting, more reliable signals.  

3. Auxiliary line filter improves signal accuracy, reducing false signals. 

4. Trend following stop loss locks in partial profits, effectively controlling risks.

5. Fixed percentage stop loss/take profit limits maximum loss per trade, avoids exceeding risk tolerance.

### Risks  

1. Frequent trading could occur in ranging market, increasing exposure and causing losses.  

2. Overly large fixed stop loss percentage may trigger unwanted big stop loss in extreme price swings.

3. DEMA crossover signals lag and long entries at peak may increase loss risks in fast-moving market.  

4. In live trading slippage affects profitability, parameter tuning needed.

### Enhancement

1. DEMA parameters can be optimized for different market conditions. 

2. Consider widening fixed stop loss in live trading to account for slippage costs.

3. Other indicators like MACD can be added to improve signal quality.

4. Fine tune tracking stop loss stepping value to improve logic.

### Conclusion

This strategy leverages DEMA's trend detection capability and combines it with trend following risk control methodologies. It is a very typical example in the Determine Trend Direction strategy system. In general this is a strategy with clear signals, sensible stop loss/profit taking configuration and controllable risks. When optimized for slippage costs and added with supplemental indicators in live trading, it can achieve good investment returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source Data: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|8|Length DEMA #1|
|v_input_3|24|Length DEMA #2|
|v_input_4|false|Length DEMA #3|
|v_input_5|false|Usar Trailing Stop?|
|v_input_6|9|(?Stop Loss & Take Profit Settings)Stop Loss Long %|
|v_input_7|6|Stop Loss Short %|
|v_input_8|25|Take Profit Long % 1|
|v_input_9|6|Take Profit Short % 1|
|v_input_10|true|(?BackTest Period)Start Date|
|v_input_11|true|Start Month|
|v_input_12|2018|Start Year|
|v_input_13|31|End Date|
|v_input_14|12|End Month|
|v_input_15|2031|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © zeguela
//@version=4
strategy(title="ZEGUELA DEMABOT", commission_value=0.063, commission_type=strategy.commission.percent, initial_capital=100, default_qty_value=90, default_qty_type=strategy.percent_of_equity, overlay=true, process_orders_on_close=true)

// Step 1. Script settings

// Input options
srcData = input(title="Source Data", type=input.source, defval=close)

// Length settings
len1 = input(title="Length DEMA #1", type=input.integer, defval=8, minval=1)
len2 = input(title="Length DEMA #2", type=input.integer, defval=24, minval=0)
len3 = input(title="Length DEMA #3", type=input.integer, defval=0, minval=0)

// Step 2. Calculate indicator values
// Function that calculates the DEMA
DEMA(series, length) =>
    if (length > 0)
        emaValue = ema(series, length)
        2 * emaValue - ema(emaValue, length)
    else
        na

// Calculate the DEMA values
demaVal1 = DEMA(srcData, len1)
demaVal2 = DEMA(srcData, len2)
demaVal3 = DEMA(srcData, len3)

// Step 3. Determine indicator signals
// See if there's a DEMA crossover
demaCrossover = if (len2 > 0) and (len3 > 0)
    crossover(demaVal1, demaVal2) and (demaVal3 > demaVal3[1])
else
    if (len2 > 0) and (len3 == 0)
        crossover(demaVal1, demaVal2)
    else
        if (len3 > 0) and (len2 == 0)
            crossover(demaVal1, demaVal3)
        else
            crossover(close, demaVal1)

// Check if there's a DEMA crossunder
demaCrossunder = if (len2 > 0) and (len3 > 0)
    crossunder(demaVal1, demaVal2) and (demaVal3 < demaVal3[1])
else
    if (len2 > 0) and (len3 == 0)
        crossunder(demaVal1, demaVal2)
    else
        if (len3 > 0) and (len2 == 0)
            crossunder(demaVal1, demaVal3)
        else
            crossunder(close, demaVal1)

// Step 4. Output indicator data
// Plot DEMAs on the chart
plot(series=demaVal1, color=color.green, linewidth=2, title="DEMA #1")
plot(series=demaVal2, color=color.red, linewidth=2, title="DEMA #2")
plot(series=demaVal3, color=color.fuchsia, linewidth=2, title="DEMA #3")

//TRAILING STOP CODE
a = input(title="Usar Trailing Stop?", type=input.bool, defval=false)

stopPerlong = input(9.0, title='Stop Loss Long %', type=input.float, group="Stop Loss & Take Profit Settings") / 100
stopPershort = input(6.0, title='Stop Loss Short %', type=input.float, group="Stop Loss & Take Profit Settings") / 100
take1Perlong = input(25.0, title='Take Profit Long % 1', type=input.float, group="Stop Loss & Take Profit Settings") / 100
take1Pershort = input(6.0, title='Take Profit Short % 1', type=input.float, group="Stop Loss & Take Profit Settings") / 100

// Determine stop loss price
longStopPrice  = strategy.position_avg_price * (1 - stopPerlong)
shortStopPrice = strategy.position_avg_price * (1 + stopPershort)
longTake1Price = strategy.position_avg_price * (1 + take1Perlong)
shortTake1Price = strategy.position_avg_price * (1 - take1Pershort)

// Determine trail stop loss prices

longStopPriceTrail = 0.0

longStopPriceTrail := if (strategy.position_size > 0)
    stopValue = close * (1 - stopPerlong)
    max(stopValue, longStopPriceTrail[1])
else
    0

// Determine trailing short price
shortStopPriceTrail = 0.0

shortStopPriceTrail := if (strategy.position_size < 0)
    stopValue = close * (1 + stopPershort)
    min(stopValue, shortStopPriceTrail[1])
else
    999999

//calcular qual stop usar
longStop = a ? longStopPriceTrail : longStopPrice
shortStop = a ? shortStopPriceTrail : shortStopPrice


//calcula o valor do stop e TP pra lançar no alerta
longStopEntrada = close  * (1 - stopPerlong)
shortStopEntrada = close  * (1 + stopPershort) 
longTPEntrada = close * (1 + take1Perlong)
shortTPEntrada = close * (1 - take1Pershort)

//armazena o preço de entrada e valor do SL e TP

price_entryL = 0.0
price_entryL := na(price_entryL) ? na : price_entryL[1]
price_entryS = 0.0
price_entryS := na(price_entryS) ? na : price_entryS[1]
stopL = 0.0
stopL := na(stopL) ? na : stopL[1]
stopS = 0.0
stopS := na(stopS) ? na : stopS[1]
takeL = 0.0
takeL := na(takeL) ? na : takeL[1]
takeS = 0.0
takeS := na(takeS) ? na : takeS[1]

if (demaCrossover)
    price_entryL := close
    stopL := close  * (1 - stopPerlong)
    takeL := close * (1 + take1Perlong)
    
if (demaCrossunder)
    price_entryS := close
    stopS := close  * (1 + stopPershort)
    takeS := close * (1 - take1Pershort)

resultadoL = ((close - price_entryL)/price_entryL) * 100
resultadoLexit = "(SL = 1% e TP = 0,5%)"
resultadoS = ((price_entryS - close)/price_entryS) * 100
resultadoSexit = "(SL = 1% e TP = 0,5)%"
// Make input options that configure backtest date range
_startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31, group="BackTest Period")
_startMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12, group="BackTest Period")
_startYear = input(title="Start Year", type=input.integer,
     defval=2018, minval=1800, maxval=2100, group="BackTest Period")

_endDate = input(title="End Date", type=input.integer,
     defval=31, minval=1, maxval=31, group="BackTest Period")
_endMonth = input(title="End Month", type=input.integer,
     defval=12, minval=1, maxval=12, group="BackTest Period")
_endYear = input(title="End Year", type=input.integer,
     defval=2031, minval=1800, maxval=2100, group="BackTest Period")

// Look if the close time of the current bar
// falls inside the date range
_inDateRange = (time >= timestamp(syminfo.timezone, _startYear,
         _startMonth, _startDate, 0, 0)) and
     (time < timestamp(syminfo.timezone, _endYear, _endMonth, _endDate, 0, 0))
  
//Alert configuration     

_alertMessageOpenLong="OpenLong"
_alertMessageCloseLong="CloseLong"
_alertmessageExitLong="ExitLong - TP/SL"

_alertMessageOpenShort="OpenShort"
_alertMessageCloseShort="CloseShort"
_alertMessageExitShort="ExitShort - TP/SL"

if (_inDateRange)
    //ENTER SOME SETUP TRADES FOR TSL EXAMPLE
    if (demaCrossover)
        strategy.entry("LONG", strategy.long, comment = _alertMessageOpenLong)
    if (demaCrossunder)
        strategy.entry("SHORT", strategy.short, comment = _alertMessageOpenShort)
    //EXIT TRADE @ TSL
    if strategy.position_size > 0
        strategy.exit("TP/SL", "LONG", stop=longStop, limit=longTake1Price, comment=_alertmessageExitLong, alert_message=_alertmessageExitLong)
    if strategy.position_size < 0
        strategy.exit("TP/SL", "SHORT", stop=shortStop, limit=shortTake1Price, comment =_alertMessageExitShort, alert_message=_alertMessageExitShort)


//Look & Feel - Plot stop loss and take profit areas
p1=plot(strategy.position_avg_price, color=color.blue, style=plot.style_linebr, linewidth=1, title="Preço de entrada")
p2=plot(series=strategy.position_size > 0 ? longStop : na, color=color.red, style=plot.style_linebr, linewidth=1, title="Long Stop")
p3=plot(series=strategy.position_size > 0 ? longTake1Price : na, color=color.green, style=plot.style_linebr, linewidth=1, title="Long TP")
p4=plot(series=strategy.position_size < 0 ? shortStop : na, color=color.red, style=plot.style_linebr, linewidth=1, title="Short Stop")
p5=plot(series=strategy.position_size < 0 ? shortTake1Price : na, color=color.green, style=plot.style_linebr, linewidth=1, title="Short TP")
fill(p1, p2, color=color.red)
fill(p1, p3, color=color.green)
fill(p1, p4, color=color.red)
fill(p1, p5, color=color.green)

// Insert label with value
stopLossOnLong = "Stop Loss = " + tostring(longStop)
stopLossOnShort = "Stop Loss = " + tostring(shortStop)
takeprofitOnLong = "Take Profit = " + tostring(longTake1Price)
takeprofitOnShort = "Take Profit = " + tostring(shortTake1Price)
precoentrada = "Entrada = " + tostring(strategy.position_avg_price)

var label FinalLabelpriceL = na
var label FinalLabelpriceS = na
var label slFinalLabelL = na
var label slFinalLabelS = na
var label slFinalLabelTPL = na
var label slFinalLabelTPS = na


//Draw entry and stop loss lines and labels

if strategy.position_size > 0   
    
    //write the price above the end of the stoploss line
    slFinalLabelL := label.new(bar_index, longStop, stopLossOnLong, style=label.style_none, size=size.normal, textcolor=color.red)
    slFinalLabelTPL := label.new(bar_index, longTake1Price, takeprofitOnLong, style=label.style_none, size=size.normal, textcolor=color.green)
    FinalLabelpriceL := label.new(bar_index, strategy.position_avg_price, precoentrada, style=label.style_none, size=size.normal, textcolor=color.blue)
    
    // Delete previous label when there is a consecutive new high, as there's no line plot in that case.
    if strategy.position_size > 0[1]
        label.delete(slFinalLabelL[1])
        label.delete(slFinalLabelTPL[1])
        label.delete(FinalLabelpriceL[1])

if strategy.position_size < 0   
    
    //write the price above the end of the stoploss line
    slFinalLabelS := label.new(bar_index, shortStop, stopLossOnShort, style=label.style_none, size=size.normal, textcolor=color.red)
    slFinalLabelTPS := label.new(bar_index, shortTake1Price, takeprofitOnShort, style=label.style_none, size=size.normal, textcolor=color.green)
    FinalLabelpriceS := label.new(bar_index, strategy.position_avg_price, precoentrada, style=label.style_none, size=size.normal, textcolor=color.blue)
    
    // Delete previous label when there is a consecutive new high, as there's no line plot in that case.
    if strategy.position_size < 0[1]
        label.delete(slFinalLabelS[1])
        label.delete(slFinalLabelTPS[1]) 
        label.delete(FinalLabelpriceS[1])

    
// Exit open market position when date range ends
if (not _inDateRange)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/442366

> Last Modified

2024-02-21 14:10:51
