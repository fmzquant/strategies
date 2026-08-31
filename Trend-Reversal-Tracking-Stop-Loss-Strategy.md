
> Name

Trend-Reversal-Tracking-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ef9a37c540d7e1b22d.png)


## Overview

This strategy uses trend reversal indicators combined with trend tracking stop loss mechanisms to track trends in trending markets and reduce losses in range-bound markets.

## Strategy Logic

The strategy uses Hull Moving Average as the main trend indicator. It goes long when price crosses above Hull MA and goes short when price crosses below Hull MA. Meanwhile, McGinley MA is used to confirm the trend.

When price reverses after opening position, validated by Hull MA crossover, the trend change logic will close the current position.

The strategy also utilizes a tracking stop loss mechanism based on ATR calculation. The stop loss price level adjust dynamically following price moves to realize trailing stop of profits.

## Advantages

- Use Hull MA to detect trend reversal points sensitively 
- Add McGinley MA for trend confirmation, filtering false breakouts
- Adopt dynamic trailing stop loss based on market volatility to control losses
- Respond timely to trend reversals when Hull MA is validated 
- Easy to switch parameters for testing and optimization

## Risks and Solutions

- Stop loss may be triggered in ranging markets

  - Expand stop loss buffer wisely 

- Tracking stop loss may lag behind fast market moves

  - Use shorter smooth periods for stop loss to follow price faster

- False breakouts may cause unnecessary losses

  - Add more confirmations to avoid false signals

- Inappropriate parameters may lead to poor performance

  - Backtest on different market cycles to find optimal parameters

## Optimization Directions

- Add more confirmations like candlestick patterns, Bollinger Bands, RSI etc. to improve signal quality
- Optimize parameters for different products and timeframes to find best parameter sets
- Try machine learning for adaptive parameter optimization
- Refine stop loss algorithms to reduce unnecessary stopping out
- Optimize position sizing and risk management 
- Consider adding auto profit taking mechanisms

## Conclusion

Overall this is a robust trend following strategy. Compared to fixed stop loss, the dynamic stop loss mechanism adjusts stop level based on market volatility, reducing the probability of being stopped out. The introduction of Hull MA and trend change logic also allows faster response to trend reversals. There are still risks like whipsaw and false breakout. Further optimizations on parameters, stop loss algorithms, position sizing etc. can improve strategy stability across different markets.


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
start: 2023-10-14 00:00:00
end: 2023-11-13 00:00:00
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

https://www.fmz.com/strategy/432079

> Last Modified

2023-11-14 11:33:50
