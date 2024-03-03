
> Name

自适应止损轨道策略Adaptive-Stop-Loss-Rail-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c60cdbed336a2ec692.png)

[trans]

## 概述

这个策略的主要思想是结合卡尔曼滤波器和追踪止损来构建一个动态调整的止损轨道。卡尔曼滤波器用于跟踪价格,并给出价格的预测值。止损轨道则基于predictions以一定百分比构建,实现动态跟踪价格。这样可以在顺势运行阶段获得更大利润,同时在逆势时及时止损。

整个策略可以在趋势市场中获得不错的效果。

## 策略原理

这个策略主要由以下几部分组成:

1. 卡尔曼滤波器

	* 利用recursive算法预测价格
	* 平滑价格并给出预测值

2. 止损轨道

	* 基于预测值以设定比例构建
	* 比例会随着bar不断减小逐渐逼近预测值
	* 当价格突破轨道会止损

3. 补仓和止盈

	* 采用马丁格尔的方法在亏损时补仓
	* 设定多级止盈

整个策略主要运作流程如下:

1. 卡尔曼滤波器预测价格
2. 根据预测价格和比例设定止损轨道
3. 当价格向有利方向运行时,止损轨道会逐步逼近,让利润最大化
4. 如果价格突破轨道,则止损
5. 在亏损时会加大仓位补仓
6. 设定多重止盈确保获利

## 优势分析

这个策略主要优势有:

1. 利用卡尔曼滤波器预测价格,相比其他指标更加平滑和准确
2. 自适应止损轨道,可以根据实际情况调整,让利润最大化
3. 补仓和多重止盈机制,可以在趋势行情中获利更多
4. 可配置参数较多,可以灵活调整

## 风险分析

这个策略主要风险在于:

1. 在震荡行情中StartStop会频繁触发,增加交易频率和手续费
2. 补仓机制虽然可以乘势放大,但也增加了风险和DD
3. 多级止盈虽然确保了利润,但也减少了获利空间

可以通过以下方式优化:

1. 在震荡行情中暂停交易
2. 调整补仓和止盈参数,降低风险

## 优化方向

这个策略还可以从以下方面进行优化:

1. 增加过滤器,识别趋势和震荡
2. 结合更多指标过滤假信号 
3. 可以考虑在亏损一定比例时全仓清场
4. 增加仓位管理模块
5. 不同市场可以考虑不同参数组合进行回测优化

## 总结

总的来说,这个自适应止损轨道策略,将卡尔曼预测和动态止损结合在一起,形成比较独特的思路。在参数调整合适的情况下,可以获得不错的效果。通过进一步的模块化设计和优化,可以将这个策略打造的更加完善,在更多市场中应用。

||

## Overview

The main idea of this strategy is to combine Kalman filter and tracking stop loss to build a dynamically adjusted stop loss rail. The Kalman filter is used to track prices and give predicted values. The stop loss rail is constructed based on predictions at a certain percentage to achieve dynamic tracking of prices. This allows maximum profit during the trend phase while timely stop loss during reversal.

The whole strategy can achieve good results in trending markets.

## Strategy Principle 

The strategy consists of the following main parts:

1. Kalman filter
	
	* Predict prices using recursive algorithm
	* Smooth prices and give predicted values

2. Stop loss rail

	* Constructed based on predicted values at set ratio
	* The ratio will decrease gradually approaching predictions as bars progress 
	* Stop loss when price breaks the rail
	
3. Pyramiding and taking profit

	* Use martingale method to add position on losses
	* Set up multiple take profit points
	
The main operating flow of the whole strategy is:	

1. Kalman filter predicts prices
2. Set stop loss rail based on predicted price and ratio
3. As price moves towards favorable direction, stop loss rail approaches progressively to maximize profit  
4. If price breaks the rail, stop loss kicks in
5. Increase position size to pyramid on losses
6. Set up multiple take profit points to secure profit	
	
## Advantage Analysis

The main advantages of this strategy:

1. Utilize Kalman filter to predict prices, smoother and more accurate than other indicators
2. Adaptive stop loss rail can adjust based on actual situation to maximize profit
3. Pyramiding and multiple take profit mechanism to yield more profit in trending moves
4. Highly configurable parameters for flexible adjustments

## Risk Analysis

The main risks of this strategy:

1. StartStop may trigger frequently in ranging moves, increasing trading frequency and fees
2. Although pyramiding mechanism can amplify gains in trends, it also increases risks and DD
3. Although multiple take profit secures profit, it also reduces profit potential
	
Risks can be reduced through:

1. Suspend trading in ranging market
2. Adjust pyramiding and take profit parameters to lower risk

## Optimization Direction	

The strategy can be further optimized through:

1. Add filters to identify trends and ranges
2. Incorporate more indicators to filter false signals
3. Consider clearing all positions if losses exceed certain threshold 
4. Add position sizing module
5. Different parameter sets can be backtested and optimized for different markets

## Summary

In summary, this adaptive stop loss rail strategy uniquely combines Kalman prediction and dynamic stop loss. With proper parameter tuning, it can achieve good results. Further modularization and optimization can make this strategy more complete for application in more markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|100|Kalman Gain:|
|v_input_1_close|0|Source:: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_2|5|Beginning Approach(%)|
|v_input_float_3|true|Final Approach(%)|
|v_input_float_4|0.001|Approach Decrease Step|
|v_input_float_5|100|Base Order Quantity|
|v_input_int_1|4|Max Safe Order Attemp|
|v_input_float_6|3|Safe Order Deviation|
|v_input_float_7|true|Profit Deviation|
|v_input_float_8|25|Max Take Profit(%)|
|v_input_float_9|true|Max Order Quantity|
|v_input_float_10|true|TP1(%)|
|v_input_int_2|40|QT1(%):|
|v_input_float_11|3|TP2(%)|
|v_input_int_3|30|QT2(%):|
|v_input_float_12|5|TP3(%)|
|v_input_int_4|30|QT3(%):|
|v_input_float_13|false|Stop Loss(%)|
|v_input_bool_1|true|Long Entry|
|v_input_bool_2|true|Short Entry|
|v_input_bool_3|true|Safe Stop After TP2|
|v_input_bool_4|false|Safe Stop After TP1|
|v_input_int_5|true|From Date:|
|v_input_int_6|true|/|
|v_input_int_7|2021|/|
|v_input_int_8|30|To__ Date:|
|v_input_int_9|12|/|
|v_input_int_10|2022|/|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-06-01 00:00:00
end: 2024-01-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © BigCoinHunter

    //  ____  _        _____      _       _    _             _            
    // |  _ \(_)      / ____|    (_)     | |  | |           | |           
    // | |_) |_  __ _| |     ___  _ _ __ | |__| |_   _ _ __ | |_ ___ _ __ 
    // |  _ <| |/ _` | |    / _ \| | '_ \|  __  | | | | '_ \| __/ _ \ '__|
    // | |_) | | (_| | |___| (_) | | | | | |  | | |_| | | | | ||  __/ |   
    // |____/|_|\__, |\_____\___/|_|_| |_|_|  |_|\__,_|_| |_|\__\___|_|   
    //           __/ |                                                    
    //          |___/                                                     

//@version=5
strategy(title='Loft Strategy V4', overlay=true, 
     pyramiding=0, default_qty_type=strategy.cash, 
     default_qty_value=100, initial_capital=10000, 
     currency=currency.USD, commission_value=0.05, 
     commission_type=strategy.commission.percent, 
     process_orders_on_close=true)

//-------------- fetch user inputs ------------------
gain = input.float(title="Kalman Gain:", defval=100.0, minval=1, maxval=10000.0, step=1)
src = input(defval=close, title='Source:')

stopPercentBase = input.float(title='Beginning Approach(%)', defval=5.0, minval=0.1, maxval=30.0, step=0.1)
stopPercentMin = input.float(title='Final Approach(%)', defval=1.0, minval=0.1, maxval=30.0, step=0.1)
downStep = input.float(title='Approach Decrease Step', defval=0.001, minval=0.0, maxval = 5, step=0.001)
//stopPercentDeviation = input.float(title="Approach Deviation", defval=1.0, minval=0.1, maxval = 5.0, step=0.1)

baseOrderQty = input.float(title="Base Order Quantity", defval=100.0, minval=0.001)
maxOrderCount = input.int(title="Max Safe Order Attemp", defval=4, minval=1)
priceDeviation = input.float(title="Safe Order Deviation", defval=3, minval=1.0, step=0.1)
profitDeviation = input.float(title="Profit Deviation", defval=1.0, minval=1.0, maxval=10, step=0.1)
maxTakeProfit = input.float(title="Max Take Profit(%)", defval=25.0, maxval=100, step=0.1)
maxOrderQty = input.float(title="Max Order Quantity", defval=1.0, minval=0.01)

baseTP1 = input.float(title="TP1(%)", defval=1.0, minval=0.0, maxval=100.0, step=0.1, inline="0")
qt1     = input.int(title="QT1(%):", defval=40, minval=1, maxval=100, step=5, inline="0")

baseTP2 = input.float(title="TP2(%)", defval=3.0, minval=0.0, maxval=100.0, step=0.1, inline="1")
qt2     = input.int(title="QT2(%):", defval=30, minval=1, maxval=100, step=5, inline="1")

baseTP3 = input.float(title="TP3(%)", defval=5.0, minval=0.0, maxval=100.0, step=0.1, inline="2")
qt3     = input.int(title="QT3(%):", defval=30, minval=1, maxval=100, step=5, inline="2")

initialStopLoss = input.float(title="Stop Loss(%)", defval=0.0, minval=0.0, maxval=100.0, step=0.1)

longEntry = input.bool(defval=true, title= 'Long Entry', inline="3")
shortEntry = input.bool(defval=true, title='Short Entry', inline="3")

useSafeStop2 = input.bool(defval = true, title="Safe Stop After TP2", inline="6")
useSafeStop1 = input.bool(defval = false, title="Safe Stop After TP1", inline="6")

//---------- backtest range setup ------------
fromDay   = input.int(defval = 1, title = "From Date:", minval = 1, maxval = 31, inline="4")
fromMonth = input.int(defval = 1, title = "/", minval = 1, maxval = 12, inline="4")
fromYear  = input.int(defval = 2021, title = "/", minval = 2010, inline="4")
toDay     = input.int(defval = 30, title = "To__ Date:", minval = 1, maxval = 31, inline="5")
toMonth   = input.int(defval = 12, title = "/", minval = 1, maxval = 12, inline="5")
toYear    = input.int(defval = 2022, title = "/", minval = 2010, inline="5")

//------------ time interval setup -----------
start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)  // backtest start window
finish    = timestamp(toYear, toMonth, toDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"


//------- define the order comments ------
enterLongComment = ""
exitLongComment = ""

enterShortComment = ""
exitShortComment = ""

longTPSL = ""
longTP = ""
longSL = ""

shortTPSL = ""
shortTP = ""
shortSL = ""

//--------- Define global variables -----------
var bool long = true
var bool stoppedOutLong = false
var bool stoppedOutShort = false
var float kf = 0.0
var float velo = 0.0

var float orderQty = baseOrderQty
var float stopLoss = initialStopLoss
var bool isProfit = false
var int barindex = 1
var int winCounter = 0
var int winCounterBuffer = 0
var int failCounter = 0

var float tp1 = baseTP1
var float tp2 = baseTP2
var float tp3 = baseTP3

var bool isTakeTP1 = false
var bool isTakeTP2 = false  
var bool isTakeTP3 = false  
var bool isLastProfit = true

var float stopPercentMax = stopPercentBase
var float stopPercent = stopPercentBase
var float stopLine = 0.0

var labelColor = color.blue


//------ kalman filter calculation --------
dk = src - nz(kf[1], src)
smooth = nz(kf[1], src) + dk * math.sqrt(gain / 10000 * 2)
velo := nz(velo[1], 0) + gain / 10000 * dk
kf := smooth + velo


//--------- calculate the loft stopLoss line ---------
//stopPercentMax := isLastProfit ? stopPercentBase : (stopPercentBase * stopPercentDeviation)

if long == true
    stopLine := kf - (kf * (stopPercent / 100))
    
    if long[1] == true and stopLine <= stopLine[1]
        stopLine := stopLine[1]
    else if (long[1] == true)
        stopPercent := stopPercent - downStep
        if(stopPercent < stopPercentMin)
            stopPercent := stopPercentMin
    
    if(kf < stopLine)
        long := false
        stopPercent := stopPercentMax
        stopLine := kf + (kf * (stopPercent / 100))
        
else
    stopLine := kf + (kf * (stopPercent / 100))
    
    if long[1] == false and stopLine >= stopLine[1]
        stopLine := stopLine[1]
    else if(long[1] == false)
        stopPercent := stopPercent - downStep
        if(stopPercent < stopPercentMin)
            stopPercent := stopPercentMin
            
    if(kf > stopLine)
        long := true
        stopPercent := stopPercentMax
        stopLine := kf - (kf * (stopPercent / 100))


//------------------- determine buy and sell points ---------------------
buySignall = window() and long  and (not stoppedOutLong)
sellSignall = window() and (not long)  and (not stoppedOutShort)
                    
                    
if longEntry and shortEntry 

    if buySignall and baseTP1 <= 0.0
            
        if strategy.position_size < 0
            if close < strategy.position_avg_price
                isLastProfit := true
        else if strategy.position_size == 0
            if strategy.wintrades > winCounter //strategy.wintrades[ barindex ]
                isLastProfit := true
        else
            isLastProfit := false
        
    else if sellSignall and baseTP1 <= 0.0
        
        if strategy.position_size > 0
            if close > strategy.position_avg_price
                isLastProfit := true
        else if strategy.position_size == 0
            if strategy.wintrades > winCounter //strategy.wintrades[ barindex ]
                isLastProfit := true
        else
            isLastProfit := false
    
    else if isTakeTP2 == true
        isLastProfit := true
    else
        isLastProfit := false

else if longEntry
    if sellSignall
        winCounterBuffer := winCounter
    if buySignall
        if winCounter > winCounterBuffer
            isLastProfit := true
        else
            isLastProfit := false

else if shortEntry
    if buySignall
        winCounterBuffer := winCounter
    if sellSignall
        if winCounter > winCounterBuffer
            isLastProfit := true
        else
            isLastProfit := false
    

//------------- set the deviations ------------
var float maxOrderSize = (baseOrderQty * math.pow(priceDeviation, maxOrderCount - 1))

if buySignall or sellSignall
    
    if isLastProfit == false
    
        orderQty := orderQty * priceDeviation
        
        tp1 := tp1 * profitDeviation
        tp2 := tp2 * profitDeviation
        tp3 := tp3 * profitDeviation
        
        tp1 := math.min(tp1, maxTakeProfit)
        tp2 := math.min(tp2, maxTakeProfit)
        tp3 := math.min(tp3, maxTakeProfit)
        
        if orderQty > maxOrderSize
            failCounter := failCounter + 1
            orderQty := baseOrderQty
            tp1 := baseTP1
            tp2 := baseTP2
            tp3 := baseTP3
                
    else
        orderQty := baseOrderQty
        tp1 := baseTP1
        tp2 := baseTP2
        tp3 := baseTP3


// ----------------- put debug labels -------------------
if orderQty == maxOrderSize
    labelColor := color.red
else
    labelColor := isLastProfit ? color.lime : color.yellow

if longEntry and shortEntry
    if buySignall or sellSignall
        label.new( x=bar_index, y=high, text="Qty:"+str.tostring(math.min(orderQty, maxOrderQty))+" | Worst Case:"+str.tostring(failCounter) ,color = labelColor  )
else if longEntry
    if buySignall
        label.new( x=bar_index, y=high, text="Qty:"+str.tostring(math.min(orderQty, maxOrderQty))+" | Worst Case:"+str.tostring(failCounter) ,color = labelColor  )
else if shortEntry
    if sellSignall
        label.new( x=bar_index, y=high, text="Qty:"+str.tostring(math.min(orderQty, maxOrderQty))+" | Worst Case:"+str.tostring(failCounter) ,color = labelColor  )



//---------- execute the strategy -----------------
nz(orderQty, baseOrderQty)

if longEntry and shortEntry

    if long
        strategy.close_all( when = buySignall, comment = exitShortComment)
        strategy.entry("LONG", strategy.long, when = buySignall, qty=math.min(orderQty, maxOrderQty), comment = enterLongComment)
        stoppedOutLong := true
        stoppedOutShort := false
            
    else
        strategy.close_all(when=sellSignall, comment = exitLongComment)
        strategy.entry("SHORT", strategy.short, when = sellSignall, qty=math.min(orderQty, maxOrderQty), comment = enterShortComment)
        stoppedOutLong  := false
        stoppedOutShort := true

else if(longEntry)
    strategy.entry("LONG", strategy.long,  when = buySignall, qty=math.min(orderQty, maxOrderQty), comment = enterLongComment)
    strategy.close("LONG", when = sellSignall, comment = exitLongComment)
    if long 
        stoppedOutLong := true
        stoppedOutShort := false
    else
        stoppedOutLong  := false
        stoppedOutShort := true

else if(shortEntry)
    strategy.entry("SHORT", strategy.short, when = sellSignall, qty=math.min(orderQty, maxOrderQty), comment = enterShortComment)
    strategy.close("SHORT", when = buySignall, comment = exitShortComment)
    if not long
        stoppedOutShort := true
        stoppedOutLong  := false
    else
        stoppedOutShort := false
        stoppedOutLong := true



//--------- calculate the TP/SL entries -----------
longProfitPrice1  = strategy.position_avg_price * (1 + tp1 * 0.01)
longProfitPrice2  = strategy.position_avg_price * (1 + tp2 * 0.01)
longProfitPrice3  = strategy.position_avg_price * (1 + tp3 * 0.01)
        
shortProfitPrice1  = strategy.position_avg_price * (1 - tp1 * 0.01)
shortProfitPrice2  = strategy.position_avg_price * (1 - tp2 * 0.01)
shortProfitPrice3  = strategy.position_avg_price * (1 - tp3 * 0.01)

longStopPrice = strategy.position_avg_price * (1 - stopLoss * 0.01)
shortStopPrice = strategy.position_avg_price * (1 + stopLoss * 0.01)

shortSafeStopPrice2 = strategy.position_avg_price * (1 - 0.2 * 0.01)
longSafeStopPrice2 = strategy.position_avg_price * (1 + 0.2 * 0.01)

longSafeStopPrice1 = stopLine
shortSafeStopPrice1 = stopLine

//----------- calculate TP quantity values -----------
takeQty1 = math.min(orderQty, maxOrderQty) * qt1 / 100
takeQty2 = math.min(orderQty, maxOrderQty) * qt2 / 100
takeQty3 = math.min(orderQty, maxOrderQty) * qt3 / 100


//----------------- take profit and stop loss processes -----------------
if strategy.position_size > 0

    if close > longProfitPrice1 and tp1 > 0 and isTakeTP1 == false
        strategy.close(id="LONG", qty=takeQty1, comment = "longTP 1")
        isTakeTP1 := true
    
    if close > longProfitPrice2 and tp2 > 0 and isTakeTP2 == false
        strategy.close(id="LONG", qty=takeQty2, comment = "longTP 2")
        isTakeTP2 := true
    
    if close > longProfitPrice3 and tp3 > 0 and isTakeTP3 == false
        strategy.close(id="LONG", qty=takeQty3, comment = "longTP 3")
        isTakeTP3 := true
    
    if isTakeTP2 == true and useSafeStop2
        strategy.exit(id="LONG", stop=longSafeStopPrice2, comment = "Long Safe Stop2")
    if isTakeTP1 == true and useSafeStop1
        strategy.exit(id="LONG", stop=longSafeStopPrice1, comment = "Long Safe Stop1")
    
            
if strategy.position_size < 0

    if close < shortProfitPrice1 and tp1 > 0 and isTakeTP1 == false
        strategy.close(id="SHORT", qty=takeQty1, comment = "Short TP 1")
        isTakeTP1 := true
    
    if close < shortProfitPrice2 and tp2 > 0 and isTakeTP2 == false
        strategy.close(id="SHORT", qty=takeQty2, comment = "Short TP 2")
        isTakeTP2 := true
    
    if close < shortProfitPrice3 and tp3 > 0 and isTakeTP3 == false
        strategy.close(id="SHORT", qty=takeQty3, comment = "Short TP 3")
        isTakeTP3 := true
    
    if isTakeTP2 == true and useSafeStop2
        strategy.exit(id="SHORT", stop=shortSafeStopPrice2, comment = "Short Safe Stop2")    
    if isTakeTP1 == true and useSafeStop1
        strategy.exit(id="SHORT", stop=shortSafeStopPrice1, comment = "Short Safe Stop1")

if(initialStopLoss>0.0)
    if ( strategy.position_size > 0 )
        strategy.exit(id="LONG",  stop=longStopPrice, comment = "Long Stop Loss")

    else if ( strategy.position_size < 0 )
        strategy.exit(id="SHORT",  stop=shortStopPrice,  comment = "Short Stop Loss")
        
    
    
if buySignall or sellSignall
    
    isTakeTP1 := false
    isTakeTP2 := false  
    isTakeTP3 := false
    
    // winCounter := strategy.wintrades
    

//------------- plot charts ---------------------
lineColor1 = long ? color.green : color.red
lineColor2 = long ? color.aqua : color.fuchsia

kalmanPlot = plot(kf, color=lineColor1, linewidth=3, title = "Kalman Filter")
stopPlot = plot(stopLine, color=lineColor2, linewidth=2, title = "Stop Loss Line")











```

> Detail

https://www.fmz.com/strategy/437389

> Last Modified

2024-01-02 11:10:54
