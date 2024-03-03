
> Name

基于双时间框架和动量指标的自适应止盈止损策略Adaptive-Take-Profit-and-Stop-Loss-Strategy-Based-on-Dual-Time-Frames-and-Momentum-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19fdd9be2cc59cd469a.png)
[trans]
## 概述

该策略采用双时间框架和动量指标的组合,实现自适应止盈止损。主要时间框架监控趋势方向,辅助时间框架用于确认信号。当两者方向一致时,生成交易信号。入市后,采用递进止盈方式更新止盈位和止损位。

## 策略原理

1. 主时间框架采用线性回归指标Sqqueeze Momentum(SQM)判断趋势,辅助时间框架采用SQM指标的EMA组合过滤假信号。

2. 当主图SQM向上突破、辅助图SQM也向上时,做多;当主图SQM向下突破、辅助图SQM也向下时,做空。

3. 进场后,依据输入参数设定初始止盈位和止损位。当价格达到止盈位时,更新止盈位和止损位。具体方式是:止盈位按设置比例递增,止损位按比例递减,实现渐进止盈。

## 策略优势

1. 双时间框架过滤假信号,确保信号准确性。

2. SQM指标判断趋势方向,避免被市场噪音干扰。

3. 自适应止盈止损机制,最大程度锁定获利,有效控制风险。

## 风险分析

1. SQM指标参数设置不当,可能错过趋势转折点,带来亏损。

2. 辅助图时间框架选择不当,无法有效过滤噪音,产生误交易。 

3. 止损幅度设置过大,单笔亏损可能比较惨重。

## 优化方向

1. SQM指标参数需要根据不同市场调整,确保其灵敏度。

2. 辅助图时间框架也需要测试不同周期,看哪个周期过滤效果最好。

3. 停损幅度可设置波动范围,而不是固定值,这样可以根据市场波动程度作调整。

## 总结

该策略整体来说非常实用,双时间框架配合动量指标判断趋势,并利用自适应止盈止损方式实现稳定盈利。通过优化SQM指标参数、辅助图周期和止损幅度的设置,可以使策略效果更好,值得在实盘中应用和优化。

||

## Overview

This strategy combines dual time frames and momentum indicators to achieve adaptive take profit and stop loss. The main time frame monitors the trend direction, while the secondary time frame is used to confirm signals. Trading signals are generated when the directions of both align. After entering the market, take profit and stop loss levels are updated progressively.

## Strategy Logic  

1. The main time frame uses the Squeeze Momentum (SQM) linear regression indicator to determine the trend. The secondary time frame uses an EMA combination on the SQM indicator to filter false signals.  

2. When the main chart SQM breaks out upwards and the secondary chart SQM also goes up, a long position is taken. When the main chart SQM breaks downwards and the secondary chart SQM also goes down, a short position is taken.

3. After entering the market, initial take profit and stop loss levels are set based on input parameters. When price reaches the take profit level, both take profit and stop loss levels are updated. Specifically, the take profit level is increased progressively and the stop loss level is tightened, achieving gradual profit taking.  

## Advantages

1. Dual time frames filter false signals and ensure accuracy. 

2. The SQM indicator determines trend direction, avoiding market noise.  

3. The adaptive take profit and stop loss mechanism locks in profits to the maximum extent and effectively controls risk.

## Risk Analysis  

1. Improper SQM parameter settings may miss trend turning points, leading to losses.  

2. An improper secondary time frame may fail to filter noise effectively, causing erroneous trades.

3. If the stop loss amplitude is set too wide, the per trade loss can be substantial.  

## Enhancement Opportunities

1. SQM parameters need to be tuned for different markets to ensure sensitivity.  

2. Different secondary time frame periods should be tested to find the best noise filtering effect. 

3. Instead of a fixed value, the stop loss amplitude can have a range set dynamically based on market volatility.  

## Summary

Overall this is a very practical strategy. The combination of dual time frames with a momentum indicator to determine trends, together with the adaptive take profit and stop loss method can generate stable profits. By optimizing the SQM parameters, secondary time frame period, and stop loss amplitude, strategy results can be further improved for productive live application and enhancement.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|11|Fast EMA|
|v_input_2|34|Slow EMA|
|v_input_3|20|SQM KC Length|
|v_input_4|20|Kauf Period|
|v_input_5|2|Kauf Mult factor|
|v_input_6|5|Min profit to start moving SL [%]|
|v_input_7|10|Maximum possible of SL [%]|
|v_input_8|0.5|Take profit factor|
|v_input_9|11|CMF length|
|v_input_10|true|Show plots|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-15 00:00:00
end: 2023-11-22 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("SQZ Multiframe Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)
fast_ema_len = input(11, minval=5, title="Fast EMA")
slow_ema_len = input(34, minval=20, title="Slow EMA")
sqm_lengthKC = input(20, title="SQM KC Length")
kauf_period = input(20, title="Kauf Period")
kauf_mult = input(2,title="Kauf Mult factor")
min_profit_sl = input(5.0, minval=1, maxval=100, title="Min profit to start moving SL [%]")
longest_sl = input(10, minval=1, maxval=100, title="Maximum possible of SL [%]")
sl_step = input(0.5, minval=0.0, maxval=1.0, title="Take profit factor")
// ADMF
CMF_length = input(11, minval=1, title="CMF length") // EMA27 = SMMA/RMA14 ~ lunar month
show_plots = input(true, title="Show plots")

lower_resolution = timeframe.period=='1'?'5':timeframe.period=='5'?'15':timeframe.period=='15'?'30':timeframe.period=='30'?'60':timeframe.period=='60'?'240':timeframe.period=='240'?'D':timeframe.period=='D'?'W':'M'
higher_resolution = timeframe.period=='5'?'1':timeframe.period=='15'?'5':timeframe.period=='30'?'15':timeframe.period=='60'?'30':timeframe.period=='240'?'60':timeframe.period=='D'?'240':timeframe.period=='W'?'D':'W'

// Calculate Squeeze Momentum
sqm_val = linreg(close - avg(avg(highest(high, sqm_lengthKC), lowest(low, sqm_lengthKC)),sma(close,sqm_lengthKC)), sqm_lengthKC,0)
sqm_val_high = security(syminfo.tickerid, higher_resolution, linreg(close - avg(avg(highest(high, sqm_lengthKC), lowest(low, sqm_lengthKC)),sma(close,sqm_lengthKC)), sqm_lengthKC,0), lookahead=barmerge.lookahead_on)
sqm_val_low = security(syminfo.tickerid, lower_resolution, linreg(close - avg(avg(highest(high, sqm_lengthKC), lowest(low, sqm_lengthKC)),sma(close,sqm_lengthKC)), sqm_lengthKC,0), gaps=barmerge.gaps_off, lookahead=barmerge.lookahead_on)

// Emas
high_close = security(syminfo.tickerid, higher_resolution, close, lookahead=barmerge.lookahead_on)
high_fast_ema = security(syminfo.tickerid, higher_resolution, ema(close, fast_ema_len), lookahead=barmerge.lookahead_on)
high_slow_ema = security(syminfo.tickerid, higher_resolution, ema(close, slow_ema_len), lookahead=barmerge.lookahead_on)
//low_fast_ema = security(syminfo.tickerid, lower_resolution, ema(close, fast_ema_len), lookahead=barmerge.lookahead_on)
//low_slow_ema = security(syminfo.tickerid, lower_resolution, ema(close, slow_ema_len), lookahead=barmerge.lookahead_on)

// CMF 
ad = close==high and close==low or high==low ? 0 : ((2*close-low-high)/(high-low))*volume
money_flow = sum(ad, CMF_length) / sum(volume, CMF_length)


// Entry conditions
low_condition_long  = (sqm_val_low > sqm_val_low[1])
low_condition_short = (sqm_val_low < sqm_val_low[1])
money_flow_min = (money_flow[4] > money_flow[3]) and (money_flow[3] > money_flow[2]) and (money_flow[2] < money_flow[1])  and (money_flow[1] < money_flow)
money_flow_max = (money_flow[4] < money_flow[3]) and (money_flow[3] < money_flow[2]) and (money_flow[2] > money_flow[1])  and (money_flow[1] > money_flow)
condition_long = ((sqm_val > sqm_val[1]))  and (money_flow_min or money_flow_min[1] or money_flow_min[2] or money_flow_min[3]) and lowest(sqm_val, 5) < 0
condition_short = ((sqm_val < sqm_val[1])) and (money_flow_max or money_flow_max[1] or money_flow_max[2] or money_flow_max[3]) and highest(sqm_val, 5) > 0
high_condition_long =  true//high_close > high_fast_ema and high_close > high_slow_ema //(high_fast_ema > high_slow_ema) //and (sqm_val_low > sqm_val_low[1])
high_condition_short = true//high_close < high_fast_ema and high_close < high_slow_ema//(high_fast_ema < high_slow_ema) //and (sqm_val_low < sqm_val_low[1])
enter_long = low_condition_long and condition_long and high_condition_long
enter_short = low_condition_short and condition_short and high_condition_short

// Stop conditions
var current_target_price = 0.0
var current_sl_price = 0.0 // Price limit to take profit
var current_target_per = 0.0
var current_profit_per = 0.0

set_targets(isLong, min_profit, current_target_per, current_profit_per) =>
    target = 0.0
    sl = 0.0
    if isLong
        target := close * (1.0 + current_target_per)
        sl := close * (1.0 - (longest_sl/100.0)) // Longest SL
    else
        target := close * (1.0 - current_target_per)
        sl := close * (1.0 + (longest_sl/100.0)) // Longest SL
    [target, sl]

target_reached(isLong, min_profit, current_target_per, current_profit_per) =>
    target = 0.0
    sl = 0.0
    profit_per = 0.0
    target_per = 0.0
    if current_profit_per == 0
        profit_per := (min_profit*sl_step) / 100.0
    else
        profit_per := current_profit_per +  ((min_profit*sl_step) / 100.0)
    target_per := current_target_per + (min_profit / 100.0) 
    if isLong
        target := strategy.position_avg_price * (1.0 + target_per)
        sl := strategy.position_avg_price * (1.0 + profit_per)
    else
        target := strategy.position_avg_price * (1.0 - target_per)
        sl := strategy.position_avg_price * (1.0 - profit_per)
    [target, sl, profit_per, target_per]

hl_diff = sma(high - low, kauf_period)
stop_condition_long = 0.0
new_stop_condition_long = low - (hl_diff * kauf_mult)
if (strategy.position_size > 0) 
    if (close > current_target_price)
        [target, sl, profit_per, target_per] = target_reached(true, min_profit_sl, current_target_per, current_profit_per)
        current_target_price := target
        current_sl_price := sl
        current_profit_per := profit_per
        current_target_per := target_per
        
        
    stop_condition_long := max(stop_condition_long[1], current_sl_price)
else
    stop_condition_long := new_stop_condition_long
stop_condition_short = 99999999.9
new_stop_condition_short = high + (hl_diff * kauf_mult)
if (strategy.position_size < 0) 
    if (close < current_target_price)
        [target, sl, profit_per, target_per] = target_reached(false, min_profit_sl, current_target_per, current_profit_per)
        current_target_price := target
        current_sl_price := sl
        current_profit_per := profit_per
        current_target_per := target_per
    stop_condition_short := min(stop_condition_short[1], current_sl_price)
else
    stop_condition_short := new_stop_condition_short
    

// Submit entry orders
if (enter_long and (strategy.position_size <= 0))
    if (strategy.position_size < 0)
        strategy.close(id="SHORT")
    current_target_per := (min_profit_sl / 100.0)
    current_profit_per := 0.0
    [target, sl] = set_targets(true, min_profit_sl, current_target_per, current_profit_per)
    current_target_price := target
    current_sl_price := sl
    strategy.entry(id="LONG", long=true)
    // if show_plots
    //     label.new(bar_index, high, text=tostring("LONG\nSL: ") + tostring(stop_condition_long), style=label.style_labeldown, color=color.green)

if (enter_short and (strategy.position_size >= 0))
    if (strategy.position_size > 0)
        strategy.close(id="LONG")
    current_target_per := (min_profit_sl / 100.0)
    current_profit_per := 0.0
    [target, sl] = set_targets(false, min_profit_sl, current_target_per, current_profit_per)
    current_target_price := target
    current_sl_price := sl
    strategy.entry(id="SHORT", long=false)
    // if show_plots
        // label.new(bar_index, high, text=tostring("SHORT\nSL: ") + tostring(stop_condition_short), style=label.style_labeldown, color=color.red)
    
if (strategy.position_size > 0)
    strategy.exit(id="EXIT LONG", stop=stop_condition_long)
    
if (strategy.position_size < 0)
    strategy.exit(id="EXIT SHORT", stop=stop_condition_short)
    
// Plot anchor trend
plotshape(low_condition_long, style=shape.triangleup,
                 location=location.abovebar, color=color.green)
plotshape(low_condition_short, style=shape.triangledown,
                 location=location.abovebar, color=color.red)
                 
plotshape(condition_long, style=shape.triangleup,
                 location=location.belowbar, color=color.green)
plotshape(condition_short, style=shape.triangledown,
                 location=location.belowbar, color=color.red)
 
//plotshape((close < profit_target_short) ? profit_target_short : na, style=shape.triangledown,
//                 location=location.belowbar, color=color.yellow)                
plotshape(enter_long, style=shape.triangleup,
                 location=location.bottom, color=color.green)
plotshape(enter_short, style=shape.triangledown,
                 location=location.bottom, color=color.red)
                 
// Plot emas
plot(ema(close, 20), color=color.blue, title="20 EMA")
plot(ema(close, 50), color=color.orange, title="50 EMA")
plot(sma(close, 200), color=color.red, title="MA 200")

// Plot stop loss values for confirmation
plot(series=(strategy.position_size > 0) and show_plots ? stop_condition_long : na,
     color=color.green, style=plot.style_linebr,
     title="Long Stop")
plot(series=(strategy.position_size < 0) and show_plots ? stop_condition_short : na,
     color=color.green, style=plot.style_linebr,
     title="Short Stop")
plot(series=(strategy.position_size < 0) and show_plots ? current_target_price : na,
     color=color.yellow, style=plot.style_linebr,
     title="Short TP")
plot(series=(strategy.position_size > 0) and show_plots ? current_target_price : na,
     color=color.yellow, style=plot.style_linebr,
     title="Long TP")
//plot(series=(strategy.position_size < 0) ? profit_sl_short : na,
//     color=color.gray, style=plot.style_linebr,
//     title="Short Stop")


```

> Detail

https://www.fmz.com/strategy/433031

> Last Modified

2023-11-23 17:57:52
