
> Name

随机OTT交易策略Stochastic-OTT-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17ceb09463a27cc0669.png)

[trans]


### 概述
该策略结合了随机指标和OTT指标来产生交易信号。当快速OTT线和慢速OTT线交叉时,会触发交易入场。为了过滤假信号,策略增加了随机指标的验证机制。

### 策略原理
1. 计算快速OTT线和慢速OTT线。分别基于快速平均线和慢速平均线,结合一定百分比止损计算。
2. 计算随机指标。基于K线的最高价、最低价和收盘价计算。
3. 当快速OTT线和慢速OTT线交叉时,判断长短方向。同时检查随机指标是否验证信号。
4. 根据交叉情况和方向判断入场。

### 优势分析
1. OTT指标本身反转效果好,捕捉转折点能力强。
2. 随机指标过滤假信号,避免在震荡中被套。
3. 可自定义OTT线计算平均线类型,灵活应对市场。
4. 可设置止盈止损点,风险可控。

### 风险分析
1. 参数设置不当可能导致交易频率过高或信号偏差。
2. 趋势市场中,OTT指标可能产生错误信号。
3. 需要综合考虑大周期趋势。

### 优化方向 
1.优化参数组合,寻找最佳参数对。
2. 结合趋势指标判断策略有效周期。
3. 增加资金管理模块。

### 总结
该策略集成OTT指标判断短期反转和随机指标过滤信号的优点,可有效控制风险,适用于反转或震荡型市场。但需要注意误入趋势市或选择周期。可从参数优化和资金管理等方面进行进一步提高。

||

### Overview
This strategy combines stochastic oscillator and OTT indicators to generate trading signals. It will trigger orders when fast and slow OTT lines cross. To filter fake signals, stochastic oscillator is used for validation.

### Strategy Logic
1. Calculate fast and slow OTT lines based on moving averages and stop loss percentage. 
2. Compute stochastic oscillator based on high, low and close prices.
3. Judge long or short direction when fast and slow OTT lines cross. Check stochastic for verification.  
4. Enter orders according to crossover and directions.

### Advantage Analysis 
1. OTT itself has good reversal effect and is sensitive to turning points.
2. Stochastic filters fake signals and avoids getting trapped in consolidation. 
3. Customizable average types for flexibility facing different markets.  
4. Profit taking and stop loss for risk control.

### Risk Analysis
1. Improper parameter tuning might lead to overtrading or bias.
2. OTT may generate wrong signals in trending markets. 
3. Overall market cycle should also be considered.  

### Optimization Directions
1. Optimize parameter combination for best performance.
2. Judge effective periods combining trend indicators.  
3. Introduce money management module.  

### Summary  
This strategy integrates OTT’s reversal and stochastic’s filtering ability to control risk effectively. It works well for reversal or ranging markets. But market cycle and tunings require attention. Further improvements can be made in parameter optimization and money management.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|OTT source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2_close|0|Stoch OTT source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|3|OTT Fast Percent(%):|
|v_input_float_2|10|OTT Slow Percent(%):|
|v_input_int_1|true|OTT Fast Length:|
|v_input_int_2|true|OTT Slow Length:|
|v_input_int_3|500|%K Length|
|v_input_int_4|200|%K Smoothing|
|v_input_int_5|2|Stoch OTT Period|
|v_input_float_3|0.5|Stoch OTT Percent|
|v_input_string_1|0|Moving Average Type: SMA|EMA|WMA|TMA|VAR|WWMA|ZLEMA|TSF|
|v_input_float_4|false|Take Profit:|
|v_input_float_5|false|Stop Loss:  |
|v_input_bool_1|false|evaluate Stoch OTT|
|v_input_bool_2|true|Long Entry|
|v_input_bool_3|true|Short Entry|
|v_input_int_6|true|From Day|
|v_input_int_7|true|From Month|
|v_input_int_8|2021|From Year|
|v_input_int_9|30|To Day|
|v_input_int_10|12|To Month|
|v_input_int_11|2022|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-21 00:00:00
end: 2023-11-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © BigCoinHunter

//@version=5
strategy(title='OTT-Stoch-TP/SL', overlay=true, 
     pyramiding=0, default_qty_type=strategy.percent_of_equity, 
     default_qty_value=100, initial_capital=1000, 
     currency=currency.USD, commission_value=0.05, 
     commission_type=strategy.commission.percent, 
     process_orders_on_close=true)

//-------------- fetch user inputs ------------------
src = input(defval=close, title='OTT source')
src1 = input(defval=close, title="Stoch OTT source")

ottFastPercent = input.float(title='OTT Fast Percent(%):', defval=3.0, minval=0.1, maxval=30.0, step=0.1)
ottSlowPercent = input.float(title='OTT Slow Percent(%):', defval=10.0, minval=0.1, maxval=30.0, step=0.1)

ottFastLength = input.int(title="OTT Fast Length:", defval=1, minval=1)
ottSlowLength = input.int(title="OTT Slow Length:", defval=1, minval=1)

periodK = input.int(defval=500, title="%K Length", minval=1, step=10)
smoothK = input.int(defval=200, title="%K Smoothing", minval=1, step=10)
stochLength=input.int(defval=2, title="Stoch OTT Period", minval=1)
stochPercent=input.float(defval=0.5, title="Stoch OTT Percent", step=0.1, minval=0)

mav = input.string(title="Moving Average Type", defval="SMA", options=["SMA", "EMA", "WMA", "TMA", "VAR", "WWMA", "ZLEMA", "TSF"])

tp = input.float(title="Take Profit:", defval=0.0, minval=0.0, maxval=100.0, step=0.1) * 0.01
sl = input.float(title="Stop Loss:  ", defval=0.0, minval=0.0, maxval=100.0, step=0.1) * 0.01

//showsupport = input.bool(title="Show Support Line?", defval=true)
stoch = input.bool(title="evaluate Stoch OTT", defval=false)

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
window()  => time >= start and time <= finish ? true : false // create function "within window of time"


//-------- calculate the OTT lines ----------
Var_Func(src,length)=>
    valpha=2/(length+1)
    vud1=src>src[1] ? src-src[1] : 0
    vdd1=src<src[1] ? src[1]-src : 0
    vUD=math.sum(vud1,9)
    vDD=math.sum(vdd1,9)
    vCMO=nz((vUD-vDD)/(vUD+vDD))
    VAR=0.0
    VAR:=nz(valpha*math.abs(vCMO)*src)+(1-valpha*math.abs(vCMO))*nz(VAR[1])
    
//VAR=Var_Func(src,length)

Wwma_Func(src,length)=>
    wwalpha = 1/ length
    WWMA = 0.0
    WWMA := wwalpha*src + (1-wwalpha)*nz(WWMA[1])
    
//WWMA=Wwma_Func(src,length)

Zlema_Func(src,length)=>
    zxLag = length/2==math.round(length/2) ? length/2 : (length - 1) / 2
    zxEMAData = (src + (src - src[zxLag]))
    ZLEMA = ta.ema(zxEMAData, length)
    
//ZLEMA=Zlema_Func(src,length)

Tsf_Func(src,length)=>
    lrc = ta.linreg(src, length, 0)
    lrc1 = ta.linreg(src,length,1)
    lrs = (lrc-lrc1)
    TSF = ta.linreg(src, length, 0)+lrs
    
//TSF=Tsf_Func(src,length)

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
        ma := Var_Func(src,length)
        ma

    if mav == "WWMA"
        ma := Wwma_Func(src,length)
        ma

    if mav == "ZLEMA"
        ma := Zlema_Func(src,length)
        ma

    if mav == "TSF"
        ma := Tsf_Func(src,length)
        ma
    ma

//-------- OTT line calculation --------
MAvg1=getMA(src, ottFastLength)
fark1=MAvg1*ottFastPercent*0.01
longStop1 = MAvg1 - fark1
longStopPrev1 = nz(longStop1[1], longStop1)
longStop1 := MAvg1 > longStopPrev1 ? math.max(longStop1, longStopPrev1) : longStop1
shortStop1 =  MAvg1 + fark1
shortStopPrev1 = nz(shortStop1[1], shortStop1)
shortStop1 := MAvg1 < shortStopPrev1 ? math.min(shortStop1, shortStopPrev1) : shortStop1
dir1 = 1
dir1 := nz(dir1[1], dir1)
dir1 := dir1 == -1 and MAvg1 > shortStopPrev1 ? 1 : dir1 == 1 and MAvg1 < longStopPrev1 ? -1 : dir1
MT1 = dir1==1 ? longStop1: shortStop1

OTTFast=MAvg1>MT1 ? MT1*(200+ottFastPercent)/200 : MT1*(200-ottFastPercent)/200

MAvg2=getMA(src, ottSlowLength)
fark2=MAvg2*ottSlowPercent*0.01
longStop2 = MAvg2 - fark2
longStopPrev2 = nz(longStop2[1], longStop2)
longStop2 := MAvg2 > longStopPrev2 ? math.max(longStop2, longStopPrev2) : longStop2
shortStop2 =  MAvg2 + fark2
shortStopPrev2 = nz(shortStop2[1], shortStop2)
shortStop2 := MAvg2 < shortStopPrev2 ? math.min(shortStop2, shortStopPrev2) : shortStop2
dir2 = 1
dir2 := nz(dir2[1], dir2)
dir2 := dir2 == -1 and MAvg2 > shortStopPrev2 ? 1 : dir2 == 1 and MAvg2 < longStopPrev2 ? -1 : dir2
MT2 = dir2==1 ? longStop2: shortStop2

OTTSlow=MAvg2>MT2 ? MT2*(200+ottSlowPercent)/200 : MT2*(200-ottSlowPercent)/200

//-------- Stoch OTT calculation ----------

Var_Func1(src1,length)=>
    valpha1=2/(length+1)
    vud11=src1>src1[1] ? src1-src1[1] : 0
    vdd11=src1<src1[1] ? src1[1]-src1 : 0
    vUD1=math.sum(vud11,9)
    vDD1=math.sum(vdd11,9)
    vCMO1=nz((vUD1-vDD1)/(vUD1+vDD1))
    VAR1=0.0
    VAR1:=nz(valpha1*math.abs(vCMO1)*src1)+(1-valpha1*math.abs(vCMO1))*nz(VAR1[1])
VAR1=Var_Func1(src1,stochLength)

k = Var_Func1(ta.stoch(close, high, low, periodK), smoothK)
k1=k+1000

VAR2=Var_Func(k1,stochLength)

MAvg3=Var_Func(k1, stochLength)
fark3=MAvg3*stochPercent*0.01
longStop3 = MAvg3 - fark3
longStopPrev3 = nz(longStop3[1], longStop3)
longStop3 := MAvg3 > longStopPrev3 ? math.max(longStop3, longStopPrev3) : longStop3
shortStop3 =  MAvg3 + fark3
shortStopPrev3 = nz(shortStop3[1], shortStop3)
shortStop3 := MAvg3 < shortStopPrev3 ? math.min(shortStop3, shortStopPrev3) : shortStop3
dir3 = 1
dir3 := nz(dir3[1], dir3)
dir3 := dir3 == -1 and MAvg3 > shortStopPrev3 ? 1 : dir3 == 1 and MAvg3 < longStopPrev3 ? -1 : dir3
MT3 = dir3==1 ? longStop3: shortStop3
OTTStoch=MAvg3>MT3 ? MT3*(200+stochPercent)/200 : MT3*(200-stochPercent)/200 


//------- define the global variables ------
var bool long = true
var bool stoppedOutLong = false
var bool stoppedOutShort = false

//-------- determine the market direction --------
if OTTFast > OTTSlow
    long := true
else if OTTFast < OTTSlow
    long := false

        
//--------- calculate the input/output points -----------
longProfitPrice  = strategy.position_avg_price * (1 + tp)     // tp -> take profit percentage
longStopPrice = strategy.position_avg_price * (1 - sl)        // sl -> stop loss percentage

shortProfitPrice  = strategy.position_avg_price * (1 - tp)
shortStopPrice = strategy.position_avg_price * (1 + sl)

//------------------- determine buy and sell points ---------------------
buySignall = false
sellSignall = false

if stoch == false
    buySignall := window() and long  and (not stoppedOutLong)
    sellSignall := window() and (not long)  and (not stoppedOutShort)
else
    buySignall := window() and long  and (not stoppedOutLong) and ( k1 > OTTStoch )
    sellSignall := window() and (not long)  and (not stoppedOutShort) and ( k1 < OTTStoch )

//---------- execute the strategy -----------------
if(longEntry and shortEntry)
    if long 
        strategy.entry("LONG", strategy.long, when = buySignall, comment = "ENTER LONG")
        stoppedOutLong := true
        stoppedOutShort := false
    else 
        strategy.entry("SHORT", strategy.short, when = sellSignall, comment = "ENTER SHORT")
        stoppedOutLong  := false
        stoppedOutShort := true

else if(longEntry)
    strategy.entry("LONG", strategy.long,  when = buySignall)
    strategy.close("LONG", when = sellSignall)
    if long 
        stoppedOutLong := true
    else
        stoppedOutLong  := false

else if(shortEntry)
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
        
        
//------------- plot charts ---------------------
lineColor1 = long ? color.green : color.red
lineColor2 = long ? color.aqua : color.fuchsia

light_green=#08ff12
light_red=#fe0808

plot(nz(OTTFast), color=light_green, linewidth=3, title="OTT Fast")
plot(nz(OTTSlow), color=light_red, linewidth=3, title="OTT Slow")














```

> Detail

https://www.fmz.com/strategy/432849

> Last Modified

2023-11-22 10:11:33
