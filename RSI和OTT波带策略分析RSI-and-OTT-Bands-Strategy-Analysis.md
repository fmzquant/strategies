
> Name

RSI和OTT波带策略分析RSI-and-OTT-Bands-Strategy-Analysis

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略名为RSI_OTT-TP/SL。该策略结合了RSI指标和OTT波带来进行交易信号的判断,属于趋势跟踪策略。策略通过RSI指标判定市场趋势方向,并利用OTT波带来定位具体的入场点。策略还允许用户设置止盈止损比例,可以自动止盈止损来锁定利润或者规避损失。

## 策略原理

1. 此策略使用RSI和OTT两种指标来判断趋势和入场点。

2. RSI用于判断整体趋势方向。RSI指标可以显示市场是超买还是超卖,RSI上穿设置的超卖区域则为超买信号,下穿超卖区域则为超卖区域。本策略默认RSI长度为6,超买线为50,超卖区域也为50。

3. OTT波带用于发现入场点。它是在波动率指标VAR的基础上形成的波带。当价格从下向上突破OTT下轨时,为做多信号;当价格从上向下跌破OTT上轨时,为做空信号。

4. 在趋势判断和入场点确认后,本策略会在突破OTT波带时开仓做多或做空。

5. 止盈止损设置了输入框,可以让用户自行设置。当止盈或止损价格触发时,策略会自动平仓。

6. 该策略还允许仅做多、仅做空或者双向交易。

## 策略优势

1. 结合RSI和OTT波带,可以在趋势判断准确的前提下找到高概率的入场点。

2. OTT波带利用动量指标,对价格波动具有很强的敏感性,可以提前发现转折点。

3. 策略提供止盈止损功能,可以锁定利润,也可以在亏损扩大前止损出场,有利于风险控制。

4. 代码结构清晰,注释充分,易于理解和修改。

5. 策略参数可以通过界面灵活调整,适应不同市场环境。


## 策略风险

1. RSI指标存在滞后问题,可能错过趋势转折点,从而导致不必要的亏损。

2. OTT波带也可能产生误报信号,建议结合K线形态来验证。

3. 止盈止损设置不当也会影响策略表现,需要针对不同品种调整参数。

4. 策略仅基于单品种回测,实盘中不同品种参数需要单独优化。

5. 回测时间窗口较短,可能无法完整验证策略有效性,建议扩大回测周期。


## 优化方向

1. 可以考虑加入其他指标进行过滤,例如MACD、KD等,减少入场误报。

2. 可以基于波动率的方法来动态调整止盈止损幅度。

3. 可以研究不同品种的参数优化,制定参数选择标准。

4. 可以尝试机器学习方法来动态优化策略参数。

5. 可以加入量价确认,避免假突破。也可以利用均量指标来判断趋势。

6. 可以考虑以穿越MA作为止损方式,而不是简单的比例止损。

## 总结

本策略整体来说是一个典型的趋势跟踪策略。它首先通过RSI判断趋势方向,然后利用OTT波带辅助确定具体入场时点,最后设置止盈止损来锁定利润和控制风险。该策略优点是指标组合简单有效,回测表现也较好。但也存在一些问题,如RSI滞后、波带误报等风险。这需要我们在实盘应用时,对参数进行细致优化,还可以加入其他技术指标进行确认,从而提高策略稳定性。如果能持续优化和验证,本策略可以成为一个非常实用的趋势跟踪策略模板。

||

## Overview

This strategy is named RSI_OTT-TP/SL. It combines RSI indicator and OTT bands to determine trading signals, belonging to trend following strategies. The strategy judges market trend direction through RSI indicator and uses OTT bands to locate specific entry points. It also allows users to set take profit and stop loss ratios to lock in profits or avoid losses automatically.

## Strategy Logic  

1. This strategy uses RSI and OTT indicators to determine trend and entry points.

2. RSI is used to judge the overall trend direction. RSI can show whether the market is overbought or oversold. RSI crossing above the overbought level is a buy signal, while crossing below the oversold level is a sell signal. The default RSI length is 6, overbought level is 50 and oversold level is also 50 in this strategy.

3. OTT bands are used to discover entry points. They are bands formed based on the Volatility Rate of Change (VAR) indicator. When price breaks through the lower band upwards, it is a buy signal. When price breaks the upper band downwards, it is a sell signal.

4. After determining the trend and confirming the entry point, this strategy will open long or short positions when price breaks the OTT bands. 

5. Take profit and stop loss can be set via input boxes for users to customize. The strategy will close positions automatically when take profit or stop loss price is touched.

6. The strategy also allows long only, short only or both directions trading.

## Advantages

1. Combining RSI and OTT bands can find high probability entry points under accurate trend judgement.

2. OTT bands utilize momentum indicator and are very sensitive to price fluctuations, which can discover turning points early.

3. The take profit and stop loss functions help lock in profits and limit losses before they expand, which benefits risk control.

4. The code structure is clear with sufficient comments, easy to understand and modify.

5. Strategy parameters can be flexibly adjusted via the interface to adapt to different market environments.


## Risks

1. RSI has lagging issue and may miss trend reversal points, leading to unnecessary losses.

2. OTT bands can also generate false signals. It's better to confirm with candlestick patterns.

3. Improper take profit and stop loss settings will impact strategy performance. Parameters need to be adjusted for different products.

4. The strategy is only backtested on a single product. Parameters should be separately optimized for different products in live trading.

5. The backtest time window is short and may not fully validate the strategy effectiveness. It's recommended to expand the backtest period.


## Optimization Directions

1. Consider adding other indicators for filtration, such as MACD, KD etc to reduce false entries.

2. Take profit and stop loss ranges can be dynamically adjusted based on volatility.

3. Research parameter optimization for different products to establish parameter selection criteria. 

4. Try machine learning methods to dynamically optimize strategy parameters.

5. Add volume confirmation to avoid false breakouts. Volume indicators can also be used to determine trends. 

6. Consider using MA penetration as stop loss instead of simple percentage stop loss.

## Summary

In summary, this is a typical trend following strategy. It first judges the trend direction through RSI, then uses OTT bands to assist in determining specific entry points, and finally sets take profit and stop loss to lock in profits and control risks. The advantages of this strategy are simple and effective indicator combinations and good backtest results. But there are also some risks like RSI lag and OTT band false signals. This requires us to optimize parameters carefully in live trading, and add other technical indicators for confirmation to improve strategy stability. With continuous optimization and verification, this strategy can become a very practical trend following strategy template.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|6|RSI Length|
|v_input_int_2|50|RSI OverSold|
|v_input_int_3|50|RSI OverBought|
|v_input_int_4|true|OTT Period|
|v_input_float_1|5|OTT Percent|
|v_input_string_1|0|OTT MA Type: VAR|EMA|WMA|TMA|SMA|WWMA|ZLEMA|TSF|
|v_input_float_2|0.01|OTT Upper Line Coeff|
|v_input_float_3|0.01|OTT Lower Line Coeff|
|v_input_float_4|false|Take Profit:|
|v_input_float_5|false|Stop Loss:  |
|v_input_bool_1|true|Long Entry|
|v_input_bool_2|true|Short Entry|
|v_input_int_5|true|From Day|
|v_input_int_6|true|From Month|
|v_input_int_7|2021|From Year|
|v_input_int_8|30|To Day|
|v_input_int_9|12|To Month|
|v_input_int_10|2022|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © BigCoinHunter

//@version=5
strategy(title="RSI_OTT-TP/SL", overlay=true, 
     pyramiding=0, default_qty_type=strategy.percent_of_equity, 
     default_qty_value=100, initial_capital=1000, 
     currency=currency.USD, commission_value=0.05, 
     commission_type=strategy.commission.percent, 
     process_orders_on_close=true)

//----------- get the user inputs --------------

//---------- RSI -------------
price = input(close, title="Source")

RSIlength = input.int(defval=6,title="RSI Length") 
RSIoverSold = input.int(defval=50, title="RSI OverSold", minval=1)
RSIoverBought = input.int(defval=50, title="RSI OverBought", minval=1)

//------- OTT Bands ----------------
src = close
length=input.int(defval=1, title="OTT Period", minval=1)
percent=input.float(defval=5, title="OTT Percent", step=0.1, minval=0.001)

mav = input.string(title="OTT MA Type", defval="VAR", options=["SMA", "EMA", "WMA", "TMA", "VAR", "WWMA", "ZLEMA", "TSF"])

ottUpperPercent = input.float(title="OTT Upper Line Coeff", defval=0.01, minval = 0.001, step=0.001)
ottLowerPercent = input.float(title="OTT Lower Line Coeff", defval=0.01, minval = 0.001, step=0.001)

Var_Func(src,length)=>
    valpha=2/(length+1)
    vud1=src>src[1] ? src-src[1] : 0
    vdd1=src<src[1] ? src[1]-src : 0
    vUD=math.sum(vud1,9)
    vDD=math.sum(vdd1,9)
    vCMO=nz((vUD-vDD)/(vUD+vDD))
    VAR=0.0
    VAR:=nz(valpha*math.abs(vCMO)*src)+(1-valpha*math.abs(vCMO))*nz(VAR[1])
    
VAR=Var_Func(src,length)

Wwma_Func(src,length)=>
    wwalpha = 1/ length
    WWMA = 0.0
    WWMA := wwalpha*src + (1-wwalpha)*nz(WWMA[1])
    
WWMA=Wwma_Func(src,length)

Zlema_Func(src,length)=>
    zxLag = length/2==math.round(length/2) ? length/2 : (length - 1) / 2
    zxEMAData = (src + (src - src[zxLag]))
    ZLEMA = ta.ema(zxEMAData, length)
    
ZLEMA=Zlema_Func(src,length)

Tsf_Func(src,length)=>
    lrc = ta.linreg(src, length, 0)
    lrc1 = ta.linreg(src,length,1)
    lrs = (lrc-lrc1)
    TSF = ta.linreg(src, length, 0)+lrs
    
TSF=Tsf_Func(src,length)

getMA(src, length) =>
    ma = 0.0
    if mav == "SMA"
        ma := ta.sma(src, length)
        ma

    if mav == "EMA"
        ma := ta.ema(src, length)
        ma

    if mav == "WMA"
        ma := ta.wma(src, length)
        ma

    if mav == "TMA"
        ma := ta.sma(ta.sma(src, math.ceil(length / 2)), math.floor(length / 2) + 1)
        ma

    if mav == "VAR"
        ma := VAR
        ma

    if mav == "WWMA"
        ma := WWMA
        ma

    if mav == "ZLEMA"
        ma := ZLEMA
        ma

    if mav == "TSF"
        ma := TSF
        ma
    ma
    
MAvg=getMA(src, length)
fark=MAvg*percent*0.01
longStop = MAvg - fark
longStopPrev = nz(longStop[1], longStop)
longStop := MAvg > longStopPrev ? math.max(longStop, longStopPrev) : longStop
shortStop =  MAvg + fark
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := MAvg < shortStopPrev ? math.min(shortStop, shortStopPrev) : shortStop
dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and MAvg > shortStopPrev ? 1 : dir == 1 and MAvg < longStopPrev ? -1 : dir
MT = dir==1 ? longStop: shortStop

OTT=MAvg>MT ? MT*(200+percent)/200 : MT*(200-percent)/200

light_green=#08ff12
light_red=#fe0808

OTTupper = nz(OTT[2])*(1+ottUpperPercent)
OTTlower = nz(OTT[2])*(1-ottLowerPercent)

p1 = plot(OTTupper, color=light_green, linewidth=1, title="OTT UPPER")
p2 = plot(nz(OTT[2]), color=color.new(color.yellow,0), linewidth=1, title="OTT MIDDLE")
p3 = plot(OTTlower, color=light_red, linewidth=1, title="OTT LOWER")

fill(plot1=p1, plot2=p3, title="OTT Background", color=color.new(color.aqua,90), fillgaps=false, editable=true)

buyEntry = ta.crossover(src, OTTlower)
sellEntry = ta.crossunder(src, OTTupper)

//---------- input TP/SL ---------------
tp = input.float(title="Take Profit:", defval=0.0, minval=0.0, maxval=100.0, step=0.1) * 0.01
sl = input.float(title="Stop Loss:  ", defval=0.0, minval=0.0, maxval=100.0, step=0.1) * 0.01

isEntryLong = input.bool(defval=true, title= 'Long Entry', inline="11")
isEntryShort = input.bool(defval=true, title='Short Entry', inline="11")

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
var bool long = true
var bool stoppedOutLong = false
var bool stoppedOutShort = false

//--------- Colors ---------------
//TrendColor = RSIoverBought and (price[1] > BBupper and price < BBupper) and BBbasis < BBbasis[1] ? color.red : RSIoverSold and (price[1] < BBlower and price > BBlower) and BBbasis > BBbasis[1] ? color.green : na
//bgcolor(switch2?(color.new(TrendColor,50)):na)


//--------- calculate the input/output points -----------
longProfitPrice  = strategy.position_avg_price * (1 + tp)     // tp -> take profit percentage
longStopPrice = strategy.position_avg_price * (1 - sl)        // sl -> stop loss percentage

shortProfitPrice  = strategy.position_avg_price * (1 - tp)
shortStopPrice = strategy.position_avg_price * (1 + sl)


//---------- RSI + Bollinger Bands Strategy -------------
vrsi = ta.rsi(price, RSIlength)

rsiCrossOver = ta.crossover(vrsi, RSIoverSold)
rsiCrossUnder = ta.crossunder(vrsi, RSIoverBought)

OTTCrossOver = ta.crossover(src, OTTlower)
OTTCrossUnder = ta.crossunder(src, OTTupper)

if (not na(vrsi))

    if rsiCrossOver and OTTCrossOver
        long := true
        
    if rsiCrossUnder and OTTCrossUnder
        long := false

//------- define the global variables ------
buySignall = false
sellSignall = false

//------------------- determine buy and sell points ---------------------
buySignall := window() and long  and (not stoppedOutLong)
sellSignall := window() and (not long)  and (not stoppedOutShort)


//---------- execute the strategy -----------------
if(isEntryLong and isEntryShort)
    if long 
        strategy.entry("LONG", strategy.long, when = buySignall, comment = "ENTER LONG")
        stoppedOutLong := true
        stoppedOutShort := false
    else 
        strategy.entry("SHORT", strategy.short, when = sellSignall, comment = "ENTER SHORT")
        stoppedOutLong  := false
        stoppedOutShort := true

else if(isEntryLong)
    strategy.entry("LONG", strategy.long,  when = buySignall)
    strategy.close("LONG", when = sellSignall)
    if long 
        stoppedOutLong := true
    else
        stoppedOutLong  := false

else if(isEntryShort)
    strategy.entry("SHORT", strategy.short, when = sellSignall)
    strategy.close("SHORT", when = buySignall)
    if not long
        stoppedOutShort := true
    else
        stoppedOutShort := false
    

//----------------- take profit and stop loss -----------------
if(tp>0.0 and sl>0.0)
    if ( strategy.position_size > 0 )
        strategy.exit(id="LONG", limit=longProfitPrice, stop=longStopPrice, comment="Long TP/SL Trigger")

    else if ( strategy.position_size < 0 )
        strategy.exit(id="SHORT", limit=shortProfitPrice, stop=shortStopPrice, comment="Short TP/SL Trigger")

else if(tp>0.0)
    if ( strategy.position_size > 0 )
        strategy.exit(id="LONG", limit=longProfitPrice, comment="Long TP Trigger")

    else if ( strategy.position_size < 0 )
        strategy.exit(id="SHORT", limit=shortProfitPrice, comment="Short TP Trigger")
        
else if(sl>0.0)
    if ( strategy.position_size > 0 )
        strategy.exit(id="LONG",  stop=longStopPrice, comment="Long SL Trigger")

    else if ( strategy.position_size < 0 )
        strategy.exit(id="SHORT",  stop=shortStopPrice, comment="Short SL Trigger")



```

> Detail

https://www.fmz.com/strategy/428806

> Last Modified

2023-10-09 16:21:20
