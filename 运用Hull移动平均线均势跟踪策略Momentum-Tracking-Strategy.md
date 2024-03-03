
> Name

运用Hull移动平均线均势跟踪策略Momentum-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1fbf3eabca88d8951e0.png)
[trans]

### 概述

均势跟踪策略运用Hull移动平均线作为主要入市指标,判断价格趋势方向。同时,该策略结合其他多种指标,如基准线、确认指标等,来验证价格趋势和过滤假信号。在入市后,策略利用平均真实波幅计算出动态止损,以跟踪趋势获利。

### 策略原理

均势跟踪策略的核心是Hull移动平均线。Hull移动平均线对价格变化更为敏感,可以有效判断趋势方向。当价格向上突破Hull线时,证实上涨趋势形成,做多;当价格向下跌破Hull线时,证实下跌趋势形成,做空。

此外,策略还引入了基准线指标,用于判断长短趋势;确认指标,用于过滤假突破。只有当基准线和确认指标都验证了趋势方向时,才会出发交易信号。

在入市后,策略利用ATR和 Hull EMA 计算出的平均真实波幅来设定止损位置。随着趋势的继续,止损线也会不断向上/下移位,以锁定趋势获利。

### 优势分析

均势跟踪策略结合趋势判断和风险控制的优点,可以在趋势行情中获得较好收益。相比固定止损策略,它可以通过移动止损来跟踪趋势运行,避免被市场正常波动止损。

许多指标的组合运用也使策略对市场变化更敏感,同时可以有效过滤假信号。此外,策略也提供了多个参数进行调整,用户可以根据自己对市场的判断进行优化。

### 风险分析

该策略主要依赖于趋势指标,在盘整时容易产生错误信号和止损。此外,多指标组合也可能出现指标冲突的情况。参数设置不当也会导致策略表现不佳。

可以考虑在策略中加入附加判断模块,在指标出现分歧时暂停交易;或采用投票机制,综合多个指标的判断结果。参数设置方面,可以通过回测优化方法找到最佳参数。

### 优化方向  

均势跟踪策略可从以下几个方向进行优化:

1. 增加判断模块,如波动率module,在高波动时暂停交易;
2. 增加机器学习模块,利用机器学习算法判断指标权重;  
3. 优化指标参数,找到最佳参数组合;
4. 优化移动止损算法,使止损更好地跟踪趋势;
5. 加入风险管理模块,如违背止损、动态仓位调整等。

### 总结

均势跟踪策略总体来说是一个优秀的趋势跟踪策略。它成功地结合了趋势判断与动态止损,可以有效跟踪趋势获利。通过进一步优化,有望获得更好的策略表现。该策略为量化交易策略的构建提供了一个良好参考。

||


## Overview

The Momentum Tracking strategy uses the Hull Moving Average as the main indicator to determine the price trend direction. At the same time, the strategy incorporates other indicators such as baseline, confirmation indicator, etc. to verify the price trend and filter false signals. After entering the market, the strategy uses the Average True Range to calculate the dynamic stop loss to track trends for profit.

## Strategy Principle  

The core of the Momentum Tracking strategy is the Hull Moving Average. The Hull Moving Average is more sensitive to price changes and can effectively determine the trend direction. When the price breaks through the Hull line upwards, an upward trend is confirmed, going long; when the price breaks through the Hull line downwards, a downward trend is confirmed, going short.

In addition, the strategy also introduces a baseline indicator to judge short and long term trends; a confirmation indicator is used to filter false breakouts. A trading signal will only be triggered when both the baseline and the confirmation indicator have verified the trend direction.

After entering the market, the strategy uses the average true range and Hull EMA to set the stop loss position. As the trend continues, the stop loss line will continue to move up/down to lock in trend profits.

## Advantage Analysis 

The Momentum Tracking strategy combines the advantages of trend judgment and risk control, which can obtain good returns in trending markets. Compared with fixed stop loss strategies, it can track trend runs by moving stop losses and avoid being stopped out by normal market fluctuations.

The combination of multiple indicators also makes the strategy more sensitive to market changes, while effectively filtering out false signals. In addition, the strategy also provides multiple adjustable parameters for users to optimize based on their own market judgment.

## Risk Analysis

The strategy relies mainly on trend indicators and is prone to generating wrong signals and stop losses during consolidations. In addition, the combination of multiple indicators can also lead to conflicts between indicators. Improper parameter settings can also lead to poor strategy performance.

Consider adding an additional judgment module in the strategy to pause trading when indicators show divergence; or adopt a voting mechanism to synthesize the judgement results of multiple indicators. For parameter settings, the optimal parameters can be found through backtest optimization methods.  

## Optimization Directions

The Momentum Tracking strategy can be optimized in the following directions:

1. Increase judgment modules, such as volatility module, pause trading when volatility is high;
2. Increase machine learning module, use machine learning algorithms to determine indicator weights;
3. Optimize indicator parameters to find the best parameter combination;
4. Optimize the moving stop loss algorithm to better track the trend;
5. Add risk management modules such as trailing stop loss, dynamic position adjustment, etc.

## Summary  

In summary, the Momentum Tracking strategy is an excellent trend tracking strategy. It successfully combines trend judgment and dynamic stop loss, which can effectively track and profit from trends. With further optimization, it is expected to achieve better strategy performance. The strategy provides a good reference for the construction of quantitative trading strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Mode: LongShort|OnlyLong|OnlyShort|Indicator Mode|
|v_input_2|true|% Risk|
|v_input_3|2|ATR Multiplier|
|v_input_4|true|====== Activate Baseline - Switch L/S ======|
|v_input_5|0|Baseline Type: McGinley|HMA|EHMA|THMA|SMA|EMA|DEMA|TEMA|WMA|VWMA|SMMA|RMA|LSMA|ALMA|Kijun|WWSA|
|v_input_6_close|0|BL source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|50|BL length|
|v_input_8|false|===== Activate Confirmation indicator =====|
|v_input_9|0|C1 Entry indicator: SMA|HMA|EHMA|THMA|McGinley|EMA|DEMA|TEMA|WMA|VWMA|SMMA|RMA|LSMA|ALMA|Kijun|WWSA|
|v_input_10_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_11|5|Length|
|v_input_12|true|====== ENTRY indicator =======|
|v_input_13|0|EI Entry indicator: HMA|McGinley|EHMA|THMA|SMA|EMA|DEMA|TEMA|WMA|VWMA|SMMA|RMA|LSMA|ALMA|Kijun|WWSA|
|v_input_14_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_15|46|Length|
|v_input_16|true|===== Activate Trailing Stop =====|
|v_input_17|0|TS Traling Stop Type: EMA|HMA|EHMA|THMA|SMA|McGinley|DEMA|TEMA|WMA|VWMA|SMMA|RMA|LSMA|ALMA|Kijun|WWSA|
|v_input_18|5|Smoothing Trail Long EMA|
|v_input_19|2|Smoothing Trail Short EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-28 00:00:00
end: 2023-12-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © Milleman
//@version=4
strategy("MilleMachine", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital=10000, commission_type=strategy.commission.percent, commission_value=0.06)


// Additional settings
Mode = input(title="Mode", defval="LongShort", options=["LongShort", "OnlyLong", "OnlyShort","Indicator Mode"])
UseTP = false                               //input(false, title="Use Take Profit?")
QuickSwitch = true                          //input(true, title="Quickswitch")
UseTC = true                                //input(true, title="Use Trendchange?")

// Risk management settings
//Spacer2 = input(false, title="======= Risk management settings =======")
Risk = input(1.0, title="% Risk",minval=0)/100
RRR = 2                                     //input(2,title="Risk Reward Ratio",step=0.1,minval=0,maxval=20)
SL_Mode = false                             // input(true, title="ON = Fixed SL / OFF = Dynamic SL (ATR)")
SL_Fix = 3                                  //input(3,title="StopLoss %",step=0.25, minval=0)/100
ATR = atr(14)                               //input(14,title="Periode ATR"))
Mul = input(2,title="ATR Multiplier",step=0.1)
xATR = ATR * Mul
SL = SL_Mode ? SL_Fix : (1 - close/(close+xATR))

// INDICATORS  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ind(type, src, len) =>
    float result = 0
    if type=="McGinley"
        result := na(result[1]) ? ema(src, len) : result[1] + (src - result[1]) / (len * pow(src/result[1], 4))
    if type=="HMA"
        result := wma(2*wma(src, len/2)-wma(src, len), round(sqrt(len)))
    if type=="EHMA"
        result := ema(2*ema(src, len/2)-ema(src, len), round(sqrt(len)))
    if type=="THMA"
        lend = len/2
        result := wma(wma(src, lend/3)*3-wma(src, lend/2)-wma(src,lend), lend)
    if type=="SMA" // Simple
        result := sma(src, len)
    if type=="EMA" // Exponential
        result := ema(src, len)
    if type=="DEMA" // Double Exponential
        e = ema(src, len)
        result := 2 * e - ema(e, len)
    if type=="TEMA" // Triple Exponential
        e = ema(src, len)
        result := 3 * (e - ema(e, len)) + ema(ema(e, len), len)
    if type=="WMA" // Weighted
        result := wma(src, len)
    if type=="VWMA" // Volume Weighted
        result := vwma(src, len) 
    if type=="SMMA" // Smoothed
        w = wma(src, len)
        result := (w[1] * (len - 1) + src) / len
    if type == "RMA"
        result := rma(src, len)
    if type=="LSMA" // Least Squares
        result := linreg(src, len, 0)
    if type=="ALMA" // Arnaud Legoux
        result := alma(src, len, 0.85, 6)
    if type=="Kijun" //Kijun-sen
        kijun = avg(lowest(len), highest(len))
        result :=kijun
    if type=="WWSA" // Welles Wilder Smoothed Moving Average
        result := nz(result[1]) + (close -nz(result[1]))/len
    result

// Baseline : Switch from Long to Short and vice versa
BL_Act = input(true, title="====== Activate Baseline - Switch L/S ======")
BL_type = input(title="Baseline Type", defval="McGinley", options=["McGinley","HMA","EHMA","THMA","SMA","EMA","DEMA","TEMA","WMA","VWMA","SMMA","RMA","LSMA","ALMA","Kijun","WWSA"])
BL_src = input(close, title="BL source")
BL_len = input(50, title="BL length", minval=1)
BL = Ind(BL_type,BL_src, BL_len)

// Confirmation indicator
C1_Act = input(false, title="===== Activate Confirmation indicator =====")
C1_type = input(title="C1 Entry indicator", defval="SMA", options=["McGinley","HMA","EHMA","THMA","SMA","EMA","DEMA","TEMA","WMA","VWMA","SMMA","RMA","LSMA","ALMA","Kijun","WWSA"])
C1_src = input(close, title="Source")
C1_len = input(5,title="Length", minval=1)
C1 = Ind(C1_type,C1_src,C1_len)

// Entry indicator : Hull Moving Average
Spacer5 = input(true, title="====== ENTRY indicator =======")
EI_type = input(title="EI Entry indicator", defval="HMA", options=["McGinley","HMA","EHMA","THMA","SMA","EMA","DEMA","TEMA","WMA","VWMA","SMMA","RMA","LSMA","ALMA","Kijun","WWSA"])
EI_src = input(close, title="Source")
EI_Len = input(46,title="Length", minval=1)
EI = Ind(EI_type,EI_src,EI_Len)

// Trail stop settings
TrailActivation = input(true, title="===== Activate Trailing Stop =====")
TS_type = input(title="TS Traling Stop Type", defval="EMA", options=["McGinley","HMA","EHMA","THMA","SMA","EMA","DEMA","TEMA","WMA","VWMA","SMMA","RMA","LSMA","ALMA","Kijun","WWSA"])
TrailSLScaling = 1 //input(100, title="SL Scaling", minval=0, step=5)/100
TrailingSourceLong = Ind(TS_type,low,input(5,"Smoothing Trail Long EMA", minval=1))
TrailingSourceShort = Ind(TS_type,high,input(2,"Smoothing Trail Short EMA", minval=1))

//VARIABLES MANAGEMENT
TriggerPrice = 0.0, TriggerPrice := TriggerPrice[1]
TriggerSL = 0.0, TriggerSL := TriggerSL[1]
SLPrice = 0.0, SLPrice := SLPrice[1], TPPrice = 0.0, TPPrice := TPPrice[1]
isLong = false, isLong := isLong[1], isShort = false, isShort := isShort[1]

//LOGIC
GoLong = crossover(EI,EI[1]) and (strategy.position_size == 0.0 and QuickSwitch) and (not BL_Act or BL/BL[1] > 1) and (not C1_Act or C1>C1[1]) and (Mode == "LongShort" or Mode == "OnlyLong")
GoShort = crossunder(EI,EI[1]) and (strategy.position_size == 0.0 and QuickSwitch) and (not BL_Act or BL/BL[1] < 1) and (not C1_Act or C1<C1[1]) and (Mode == "LongShort" or Mode == "OnlyShort")
ExitLong = isLong and crossunder(EI,EI[1]) and UseTC
ExitShort = isShort and crossover(EI,EI[1]) and UseTC

//FRAMEWORK
//Reset Long-Short memory
if isLong and strategy.position_size == 0.0
    isLong := false
if isShort and strategy.position_size == 0.0
    isShort := false
//Long
if GoLong
    isLong := true, TriggerPrice := close, TriggerSL := SL
    TPPrice := UseTP? TriggerPrice * (1 + (TriggerSL * RRR)) : na
    SLPrice := TriggerPrice * (1-TriggerSL)
    Entry_Contracts = strategy.equity * Risk / ((TriggerPrice-SLPrice)/TriggerPrice) / TriggerPrice
    strategy.entry("Long", strategy.long, comment=tostring(round((TriggerSL/TriggerPrice)*1000)), qty=Entry_Contracts)
    strategy.exit("TPSL","Long", limit=TPPrice, stop=SLPrice)
if isLong
    NewValSL = TrailingSourceLong * (1 - (SL*TrailSLScaling))
    if TrailActivation and NewValSL > SLPrice
        SLPrice := NewValSL
    strategy.exit("TPSL","Long", limit=TPPrice, stop=SLPrice)
if ExitLong
    strategy.close_all(comment="TrendChange")
    isLong := false

//Short
if GoShort
    isShort := true, TriggerPrice := close, TriggerSL := SL
    TPPrice := UseTP? TriggerPrice * (1 - (TriggerSL * RRR)) : na
    SLPrice := TriggerPrice * (1 + TriggerSL)
    Entry_Contracts = strategy.equity * Risk / ((SLPrice-TriggerPrice)/TriggerPrice) / TriggerPrice
    strategy.entry("Short", strategy.short, comment=tostring(round((TriggerSL/TriggerPrice)*1000)), qty=Entry_Contracts)
    strategy.exit("TPSL","Short", limit=TPPrice, stop=SLPrice)
if isShort
    NewValSL = TrailingSourceShort * (1 + (SL*TrailSLScaling))
    if TrailActivation and NewValSL < SLPrice
        SLPrice := NewValSL
    strategy.exit("TPSL","Short", limit=TPPrice, stop=SLPrice)
if ExitShort
    strategy.close_all(comment="TrendChange")
    isShort := false

//VISUALISATION
plot(BL_Act?BL:na, color=color.blue,title="Baseline")
plot(C1_Act?C1:na, color=color.yellow,title="confirmation Indicator")
EIColor = EI>EI[1] ? color.green : color.red
Fill_EI = plot(EI, color=EIColor, linewidth=1, transp=40, title="Entry Indicator EI")
Fill_EID = plot(EI[1], color=EIColor, linewidth=1, transp=40, title="Entry Indicator EID")
fill(Fill_EI,Fill_EID, title="EI_Fill", color=EIColor,transp=50)

plot(strategy.position_size != 0.0 and (isLong or isShort) ? TriggerPrice : na, title="TriggerPrice", color=color.yellow, style=plot.style_linebr)
plot(strategy.position_size != 0.0 and (isLong or isShort) ? TPPrice : na, title="TakeProfit", color=color.green, style=plot.style_linebr)
plot(strategy.position_size != 0.0 and (isLong or isShort) ? SLPrice : na, title="StopLoss", color=color.red, style=plot.style_linebr)
bgcolor(isLong[1] and cross(low,SLPrice) and low[1] > SLPrice and TriggerPrice>SLPrice ? color.yellow : na, transp=75, title="SL Long")
bgcolor(isShort[1] and cross(high,SLPrice) and high[1] < SLPrice and TriggerPrice<SLPrice ? color.yellow : na, transp=75, title="SL Short")
```

> Detail

https://www.fmz.com/strategy/437030

> Last Modified

2023-12-29 16:26:49
