
> Name

简易跟踪趋势策略Simple-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]


## 策略原理

该策略融合均线指标和霍尔曲线指标来识别市场趋势方向,并追踪趋势运行。

主要交易逻辑是:

1. 计算麦基尼动态均线,判断市场总体趋势方向

2. 霍尔曲线指标穿越发出具体做多做空信号

3. 可选择辅助指标进行信号验证 

4. 根据止损和止盈原则设定风险管理机制

5. 霍尔曲线反向时平仓止损

该策略简化了趋势跟踪过程,旨在以机械化系统匹配市场节奏,降低个人思维的影响。

## 策略优势 

- 均线判定总体方向,辅助指标可选择

- 霍尔曲线产生明确做多做空信号

- 风险管理规则化,降低失误

## 策略风险

- 参数设定和过滤条件需要测试优化

- 趋势判断准确性存有不确定性 

- 霍尔曲线可能滞后产生错误信号

## 总结

该策略旨在以机械化系统匹配趋势,简化操作流程。但参数优化和指标限制仍需注意,以提高稳定性。


||

## Strategy Logic

This strategy combines moving averages and Hull curves to identify market trend direction and follow through on trends.

The main logic is:

1. McGinley Dynamic MA judges overall trend direction

2. Hull curve crossovers generate specific long/short signals 

3. Optional confirmation indicators for signal verification

4. Risk management via stop loss and take profit principles 

5. Close positions when Hull curve reverses

The strategy aims to mechanically systematize trend following, minimizing individual subjective influences. 

## Advantages

- MA judges overall direction, flexible confirmations

- Hull clear long/short signals

- Rules-based risk management minimizes errors

## Risks

- Parameter tuning and filters require optimization

- Trend accuracy has uncertainties

- Hull curve prone to lagging signals 

## Summary

This strategy seeks to systematize trend following operations to match market rhythm. But parameter optimization and indicator limitations warrant caution for stability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|=== Risk management settings ===|
|v_input_2|true|% Risk|
|v_input_3|2|Risk Reward Ratio|
|v_input_4|5|StopLoss %|
|v_input_5|false|=== Baseline - Switch L/S ===|
|v_input_6_close|0|McGinley source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|50| McG length|
|v_input_8|false|=== Confirmation indicator ===|
|v_input_9|false| Confirmation indicator Activation|
|v_input_10_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_11|5|Length|
|v_input_12|false|=== Entry indicator configuration ===|
|v_input_13_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_14|50|Length HMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © Milleman
//@version=4
strategy("Millebot", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital=100000, commission_type=strategy.commission.percent, commission_value=0.04)

// Risk management settings
Spacer2 = input(false, title="=== Risk management settings ===")
Risk = input(1.0, title="% Risk")/100
RRR = input(2,title="Risk Reward Ratio",step=0.1,minval=0,maxval=20)
SL = input(5,title="StopLoss %",step=0.25)/100

// Baseline : McGinley Dynamic
Spacer3 = input(false, title="=== Baseline - Switch L/S ===")
McG_Source = input(close, title="McGinley source")
McG_length = input(50, title=" McG length", minval=1)
McG_LS_Switch = 0.0
McG_LS_Switch := na(McG_LS_Switch[1]) ? ema(McG_Source, McG_length) : McG_LS_Switch[1] + (McG_Source - McG_LS_Switch[1]) / (McG_length * pow(McG_Source/McG_LS_Switch[1], 4))

// Confirmation indicator
Spacer4 = input(false, title="=== Confirmation indicator ===")
C1_Act = input(false, title=" Confirmation indicator Activation")
C1_src = input(ohlc4, title="Source")
C1_len = input(5,title="Length")
C1 = sma(C1_src,C1_len)

// Entry indicator : Hull Moving Average
Spacer5 = input(false, title="=== Entry indicator configuration ===")
src = input(ohlc4, title="Source")
length = input(50,title="Length HMA")
HMA = ema(wma(2*wma(src, length/2)-wma(src, length), round(sqrt(length))),1)

//VARIABLES MANAGEMENT
TriggerPrice = 0.0, TriggerPrice := TriggerPrice[1]
TriggerxATR = 0.0, TriggerxATR := TriggerxATR[1]
SLPrice = 0.0, SLPrice := SLPrice[1], TPPrice = 0.0, TPPrice := TPPrice[1]
isLong = false, isLong := isLong[1], isShort = false, isShort := isShort[1]

//LOGIC
GoLong = crossover(HMA[0],HMA[1]) and strategy.position_size == 0.0 and (McG_LS_Switch/McG_LS_Switch[1] > 1) and (not C1_Act or C1>C1[1])
GoShort = crossunder(HMA[0],HMA[1]) and strategy.position_size == 0.0 and (McG_LS_Switch/McG_LS_Switch[1] < 1) and (not C1_Act or C1<C1[1])

//FRAMEWORK

//Long
if GoLong and not GoLong[1]
    isLong := true, TriggerPrice := close
    TPPrice := TriggerPrice * (1 + (SL * RRR))
    SLPrice := TriggerPrice * (1-SL)
    Entry_Contracts = strategy.equity * Risk / ((TriggerPrice-SLPrice)/TriggerPrice) / TriggerPrice //Het aantal contracts moet meegegeven worden. => budget * risk / %afstand tot SL / prijs = aantal contracts
    strategy.entry("Long", strategy.long, comment=tostring(round(TriggerxATR/TriggerPrice*1000)), qty=Entry_Contracts)
    strategy.exit("TPSL","Long", limit=TPPrice, stop=SLPrice, qty_percent = 100)
if isLong and crossunder(HMA[0],HMA[1])
    strategy.close_all(comment="TrendChange")
    isLong := false

//Short
if GoShort and not GoShort[1]
    isShort := true, TriggerPrice := close
    TPPrice := TriggerPrice * (1 - (SL * RRR))
    SLPrice := TriggerPrice * (1 + SL)
    Entry_Contracts = strategy.equity * Risk / ((SLPrice-TriggerPrice)/TriggerPrice) / TriggerPrice //Het aantal contracts moet meegegeven worden. => budget * risk / %afstand tot SL / prijs = aantal contracts
    strategy.entry("Short", strategy.short, comment=tostring(round(TriggerxATR/TriggerPrice*1000)), qty=Entry_Contracts)
    strategy.exit("TPSL","Short", limit=TPPrice, stop=SLPrice)//, qty_percent = 100)
if isShort and crossover(HMA[0],HMA[1])
    strategy.close_all(comment="TrendChange")
    isShort := false

//VISUALISATION
plot(McG_LS_Switch,color=color.blue,title="Baseline")
plot(C1_Act?C1:na,color=color.white,title="confirmation Indicator")
plot(HMA, color=(HMA[0]>HMA[1]? color.green : color.red), linewidth=4, transp=40, title="Entry Indicator")
plot(isLong or isShort ? TPPrice : na, title="TakeProfit", color=color.green, style=plot.style_linebr)
plot(isLong or isShort ? SLPrice : na, title="StopLoss", color=color.red, style=plot.style_linebr)
bgcolor(isLong[1] and cross(low,SLPrice) and low[1] > SLPrice ? color.yellow : na, transp=75, title="SL Long")
bgcolor(isShort[1] and cross(high,SLPrice) and high[1] < SLPrice ? color.yellow : na, transp=75, title="SL Short")
```

> Detail

https://www.fmz.com/strategy/426834

> Last Modified

2023-09-14 18:01:07
