
> Name

滑行止损策略Loft-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略使用卡尔曼滤波器跟踪价格,并使用止损线动态调整止损点,实现滑动止损。

## 原理

该策略使用卡尔曼滤波器实时跟踪价格。卡尔曼滤波器包含两个方程:

预测方程:

smooth = kf[1] + dk * sqrt(gain / 10000 * 2)

更新方程: 

kf = smooth + velo

其中,dk是预测误差,gain是卡尔曼增益,决定跟踪灵敏度。

此外,策略使用滑动止损线来锁定利润。初始止损距离为止损百分比设定值,如2%。

在做多时,如果价格上涨,止损线也上移逐步逼近卡尔曼线,步长为downStep,如0.5%。如果价格下跌止损,则重新开仓,设置初始止损距离。

做空同理。

这样,策略可以根据趋势逐步锁定利润,具有较好的风险管理。

## 优势

1. 使用卡尔曼滤波器实时跟踪价格,响应迅速。

2. 利用滑动止损线锁定利润,风险管理效果好。止损距离可自定义。

3. 可灵活选择做多做空或只做多/做空。

4. 可根据趋势积极止损或保守止损。

5. 可根据需要灵活设置止盈止损。

## 风险

1. 卡尔曼滤波器参数设置不当可能导致跟踪不稳定。

2. 滑点可能导致止损点被先触发。可以适当宽松止损距离。

3. 强势趋势市场不宜采用滑动止损策略,应追踪趋势。

4. 震荡市场止损点可能频繁触发。可以适当宽松止损距离,或不使用滑动止损。

## 优化

1. 可以引入更多指标判断趋势方向,优化开仓时机。

2. 可以根据市场波动率调整止损线移动步长。

3. 可以结合机器学习技术训练最优止损参数。

4. 可以结合更多风险指标,动态调整仓位管理。


## 总结

滑行止损策略使用卡尔曼滤波器跟踪价格变化,并利用滑动止损线锁定利润,在保证盈利的同时控制风险,是一个可靠且易于优化的策略。将其与趋势判断及动态仓位管理技术相结合,可以获得更优秀的策略效果。

|| 

## Overview

This strategy uses a Kalman filter to track prices and dynamically adjusts the stop loss point with a stop loss line to achieve a sliding stop loss.

## Principle 

This strategy uses a Kalman filter to track prices in real time. The Kalman filter contains two equations:

Prediction equation:

smooth = kf[1] + dk * sqrt(gain / 10000 * 2)

Update equation:

kf = smooth + velo

where dk is the prediction error, gain is the Kalman gain that determines tracking sensitivity.

In addition, the strategy uses a sliding stop loss line to lock in profits. The initial stop loss distance is the stop loss percentage setting, such as 2%. 

When long, if the price rises, the stop loss line also moves up gradually approaching the Kalman line, with a step size of downStep, such as 0.5%. If the price falls to the stop loss, reopen the position and set the initial stop loss distance.

Short is similar.

Thus, the strategy can gradually lock in profits according to the trend, with good risk management.

## Advantages

1. Use Kalman filter to track prices in real time with fast response.

2. Lock in profits with sliding stop loss line, achieving good risk management. Customizable stop loss distance.

3. Flexibly choose long/short or only long/short.

4. Actively or conservatively stop loss based on trend. 

5. Flexibly set take profit and stop loss as needed.

## Risks

1. Improper parameter settings of Kalman filter may lead to unstable tracking.

2. Slippage may trigger stop loss point prematurely. Widen stop loss distance appropriately.

3. Sliding stop loss is not suitable for strong trending markets, should follow trend.

4. Stop loss may trigger frequently in ranging markets. Widen stop loss distance or don't use sliding stop loss.

## Optimization

1. Incorporate more indicators to optimize entry timing.

2. Adjust stop loss line movement step based on market volatility.

3. Use machine learning to train optimal stop loss parameters.

4. Incorporate more risk indicators to dynamically adjust position sizing.

## Conclusion

The loft stop strategy uses a Kalman filter to track price changes and lock in profits with a sliding stop loss line, ensuring profitability while controlling risks. It is a reliable and easily optimized strategy. Combining it with trend judgment and dynamic position sizing can achieve even better strategy performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|true|Kalman Gain:|
|v_input_1_close|0|Source:: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_2|2|Beginning Approach(%):|
|v_input_float_3|0.5|Final Approach(%):    |
|v_input_float_4|0.005|Approach Decrease Step:|
|v_input_float_5|1.5|Take Profit:|
|v_input_float_6|false|Stop Loss:  |
|v_input_bool_1|true|Long Entry|
|v_input_bool_2|true|Short Entry|
|v_input_int_1|true|From Day|
|v_input_int_2|true|From Month|
|v_input_int_3|2021|From Year|
|v_input_int_4|30|To Day|
|v_input_int_5|12|To Month|
|v_input_int_6|2022|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © BigCoinHunter

//@version=5
// strategy(title='Loft Strategy V1', overlay=true, 
//      pyramiding=0, default_qty_type=strategy.fixed, 
//      default_qty_value=100, initial_capital=100000, 
//      currency=currency.USD, commission_value=0.05, 
//      commission_type=strategy.commission.percent, 
//      process_orders_on_close=true)

//-------------- fetch user inputs ------------------
gain = input.float(title="Kalman Gain:", defval=1.0, minval=1.0, maxval=5000.0, step=100.0)
src = input(defval=close, title='Source:')

stopPercentMax = input.float(title='Beginning Approach(%):', defval=2.0, minval=0.1, maxval=30.0, step=0.1)
stopPercentMin = input.float(title='Final Approach(%):    ', defval=0.5, minval=0.1, maxval=30.0, step=0.1)
downStep = input.float(title='Approach Decrease Step:', defval=0.005, minval=0.0, maxval = 5, step=0.005)

tp = input.float(title="Take Profit:", defval=1.5, minval=0.0, maxval=100.0, step=0.1) * 0.01
sl = input.float(title="Stop Loss:  ", defval=0.0, minval=0.0, maxval=100.0, step=0.1) * 0.01

longEntry = input.bool(defval=true, title= 'Long Entry', inline="11")
shortEntry = input.bool(defval=true, title='Short Entry', inline="11")

//---------- backtest range setup ------------
fromDay   = input.int(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input.int(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear  = input.int(defval = 2021, title = "From Year", minval = 2010)
toDay     = input.int(defval = 30, title = "To Day", minval = 1, maxval = 31)
toMonth   = input.int(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear    = input.int(defval = 2022, title = "To Year", minval = 2010)


//------------ time interval setup -----------
start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)  // backtest start window
finish    = timestamp(toYear, toMonth, toDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

//------- define the global variables ------
enterLongComment = "ENTER LONG"
exitLongComment = "EXIT LONG"

enterShortComment = "ENTER SHORT"
exitShortComment = "EXIT SHORT"

longTPSL = "Long TP/SL"
longTP = "Long TP"
longSL = "Long SL"
shortTPSL = "Short TP/SL"
shortTP = "Short TP"
shortSL = "Short SL"

var bool long = true
var bool stoppedOutLong = false
var bool stoppedOutShort = false
var float kf = 0.0
var float velo = 0.0

//------ kalman filter calculation --------
dk = src - nz(kf[1], src)
smooth = nz(kf[1], src) + dk * math.sqrt(gain / 10000 * 2)
velo := nz(velo[1], 0) + gain / 10000 * dk
kf := smooth + velo

//--------- calculate the loft stopLoss line ---------
var stopPercent = stopPercentMax
var stopLoss = kf - kf * (stopPercent /100)

if long == true
    stopLoss := kf - (kf * (stopPercent / 100))
    
    if long[1] == true and stopLoss <= stopLoss[1]
        stopLoss := stopLoss[1]
    else if (long[1] == true)
        stopPercent := stopPercent - downStep
        if(stopPercent < stopPercentMin)
            stopPercent := stopPercentMin
    
    if(kf < stopLoss)
        long := false
        stopPercent := stopPercentMax
        stopLoss := kf + (kf * (stopPercent / 100))
        
else
    stopLoss := kf + (kf * (stopPercent / 100))
    
    if long[1] == false and stopLoss >= stopLoss[1]
        stopLoss := stopLoss[1]
    else if(long[1] == false)
        stopPercent := stopPercent - downStep
        if(stopPercent < stopPercentMin)
            stopPercent := stopPercentMin
            
    if(kf > stopLoss)
        long := true
        stopPercent := stopPercentMax
        stopLoss := kf - (kf * (stopPercent / 100))
        
//--------- calculate the input/output points -----------
longProfitPrice  = strategy.position_avg_price * (1 + tp)     // tp -> take profit percentage
longStopPrice = strategy.position_avg_price * (1 - sl)        // sl -> stop loss percentage

shortProfitPrice  = strategy.position_avg_price * (1 - tp)
shortStopPrice = strategy.position_avg_price * (1 + sl)

//------------------- determine buy and sell points ---------------------
buySignall = window() and long  and (not stoppedOutLong)
sellSignall = window() and (not long)  and (not stoppedOutShort)

//---------- execute the strategy -----------------
if(longEntry and shortEntry)
    if long 
        strategy.entry("LONG", strategy.long, when = buySignall, comment = enterLongComment)
        stoppedOutLong := true
        stoppedOutShort := false
    else 
        strategy.entry("SHORT", strategy.short, when = sellSignall, comment = enterShortComment)
        stoppedOutLong  := false
        stoppedOutShort := true

else if(longEntry)
    strategy.entry("LONG", strategy.long,  when = buySignall, comment = enterLongComment)
    strategy.close("LONG", when = sellSignall, comment = exitLongComment)
    if long 
        stoppedOutLong := true
    else
        stoppedOutLong  := false

else if(shortEntry)
    strategy.entry("SHORT", strategy.short, when = sellSignall, comment = enterShortComment)
    strategy.close("SHORT", when = buySignall, comment = exitShortComment)
    if not long
        stoppedOutShort := true
    else
        stoppedOutShort := false
    

//----------------- take profit and stop loss -----------------
if(tp>0.0 and sl>0.0)
    if ( strategy.position_size > 0 )
        strategy.exit(id="LONG", limit=longProfitPrice, stop=longStopPrice, comment = longTPSL)

    else if ( strategy.position_size < 0 )
        strategy.exit(id="SHORT", limit=shortProfitPrice, stop=shortStopPrice, comment = shortTPSL)

else if(tp>0.0)
    if ( strategy.position_size > 0 )
        strategy.exit(id="LONG", limit=longProfitPrice, comment = longTP)

    else if ( strategy.position_size < 0 )
        strategy.exit(id="SHORT", limit=shortProfitPrice, comment = shortTP)
        
else if(sl>0.0)
    if ( strategy.position_size > 0 )
        strategy.exit(id="LONG",  stop=longStopPrice, comment = longSL)

    else if ( strategy.position_size < 0 )
        strategy.exit(id="SHORT",  stop=shortStopPrice, comment = shortSL)
        
//------------- plot charts ---------------------
lineColor1 = long ? color.green : color.red
lineColor2 = long ? color.aqua : color.fuchsia

kalmanLine = plot(kf, color=lineColor1, linewidth=3, title = "Kalman Filter")
stopLine = plot(stopLoss, color=lineColor2, linewidth=2, title = "Stop Loss Line")





```

> Detail

https://www.fmz.com/strategy/428625

> Last Modified

2023-10-07 16:11:45
