
> Name

麦克风散架与多时间框架均线策略MACD-Dissipation-and-Multi-Time-Frame-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/114ac74f6f1c3954b40.png)

[trans]

## 概述

本策略融合利用了麦克风散架(MACD)指标和多时间框架均线,形成一个综合利用趋势和趋势反转信号的长短双向交易策略。策略可以在趋势行情中获取额外利润,同时也能抓住反转机会。

## 策略原理

1. 使用两组不同周期的EMA均线组合作为多时间框架过滤器,进行长空方向判断:15分钟快速EMA高于1小时慢速EMA为看涨过滤器,15分钟快速EMA低于1小时慢速EMA为看跌过滤器。

2. 当观察到麦克风散架形成背离时(柱状线与价格背离),判断可能反转。

3. 在看涨过滤器开启时,若发现有牛市背离(价格新高而MACD未创新高),等待MACD零轴上穿,做多;在看跌过滤器开启时,若发现有熊市背离(价格新低而MACD未创新低),等待MACD零轴下穿,做空。

4. 止损方式为持续追踪型止损,根据最高价最低价波动范围计算。止盈为止损的一定倍数。

5. 当MACD柱状线发生零轴方向穿越时平仓。

## 优势分析

1. 多时间框架EMA组合能对大周期趋势进行判断,避免逆势交易。

2. MACD背离能捕捉到价格反转机会,适合反转策略。

3. 动态追踪止损能锁定盈利,避免亏损扩大。

4. 根据止损计算止盈距离能获得预期回报。

## 风险分析

1. EMA均线组合作为过滤器,在盘整时期可能出现方向判断错误。

2. MACD背离后反弹幅度不足,可能无法盈利。

3. 止损距离设定不当,可能过于宽松或过于紧凑。

4. 反转空间不足,获利受限。

5. 需要恰当把握反转切入时机,过早过晚都可能导致损失。

## 优化方向

1. 可以测试不同参数组合的EMA以获得更准确的趋势判断。

2. 可以尝试把MACD参数调整为更敏感的参数组合。

3. 可以测试不同的止损止盈比例设置。

4. 可以加入附加过滤条件,避免陷入假反弹。例如加入更高时间框架EMA判断全局趋势。

5. 可以优化反转切入确认条件,确保反转趋势足够成熟。

## 总结

本策略综合运用了趋势过滤、趋势反转信号、动态止损止盈管理等手段,能够顺势而为,亦能抓反转。通过参数调整和优化过滤条件,可以适应更广泛的市场环境,在控制风险前提下获取稳定收益。该策略具有一定的普适性和实用价值,是多时间框架与指标融合运用的典型代表。
||

## Overview 

This strategy integrates the MACD indicator and multi time frame moving averages to form a dual directional trading strategy that utilizes both trend and trend reversal signals. The strategy can generate additional profits in trending markets while being able to capitalize on reversal opportunities.

## Strategy Logic

1. Use two groups of EMAs with different periods as multi time frame filters to determine long/short direction: 15min fast EMA above 1hr slow EMA as bull filter, 15min fast EMA below 1hr slow EMA as bear filter.

2. Identify possible reversals when MACD forms divergences (histogram diverges from price). 

3. When bull filter is on, if bullish divergence spotted (price new high but MACD didn't), wait for MACD to cross above signal line and go long. When bear filter is on, if bearish divergence spotted, wait for MACD to cross below signal line and go short.

4. Stop loss set dynamically based on highest high/lowest low price range. Take profit is a multiplier of stop loss. 

5. Close position when MACD histogram crosses 0 line in opposite direction.

## Advantage Analysis

1. Multi time frame EMA combo filters the major trend direction, avoiding counter trend trades.

2. MACD divergences capture price reversal opportunities, suitable for reversal strategies. 

3. Dynamic trailing stop loss locks in profits and prevents runaway losses.

4. Take profit based on stop loss distance gives expected payoff.

## Risk Analysis

1. EMA filters can give wrong direction during consolidation.

2. Insufficient reverse magnitude after MACD divergence may cause losses.

3. Improper stop loss distance setting may be too loose or too tight.

4. Limited reverse room caps profits.

5. Need to properly time reversal entry, too early or late can both cause losses.

## Optimization Directions

1. Test different EMA combinations for better trend judgement.

2. Try more sensitive MACD parameter settings.

3. Test different stop loss/take profit ratios. 

4. Add additional filters to avoid false reversals, e.g. higher time frame EMAs for global trend.

5. Optimize reversal entry confirmation for more mature reversals.

## Conclusion

This strategy utilizes trend filtering, reversal signals, dynamic stop/take profit management to trade with the trend and capitalize on reversals. Proper parameter tuning and optimizing filters adapts it to diverse market conditions, delivering steady profits while controlling risks. It has versatility and practical value as a typical example of integrating multi time frame analysis with indicators.


[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Apr 2018 13:30 +0000)|Start Time|
|v_input_2|timestamp(30 Sep 2021 13:30 +0000)|Finish Time|
|v_input_3|true|Show Long Positions|
|v_input_4|true|Show Short Positions|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|false|============ EMAS Properties ============|
|v_input_7|15|Fast EMA|
|v_input_8|5|Fast EMA Period|
|v_input_9|60|Slow EMA|
|v_input_10|10|Slow EMA Period|
|v_input_11|true|Enable a Third Ema filter?|
|v_input_12|100|Fast EMA Period|
|v_input_13|D|Slowest EMA|
|v_input_14||MACD TimeFrame|
|v_input_15||============ MACD Properties ============|
|v_input_16|12|Fast Length|
|v_input_17|26|Sign Length|
|v_input_18|9|Sign Length|
|v_input_19||============ System Properties ============|
|v_input_20|14|Lookback period|
|v_input_21|6|Profit Multiplier based on Stop Loss|
|v_input_22|true|Short Stop Loss Percentage|
|v_input_23|2|Long Stop Loss Percentage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-06-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © maxits
//@version=4

// MACD Divergence + Multi Time Frame EMA
// This Strategy uses 3 indicators: the Macd and two emas in different time frames
// The configuration of the strategy is:
// Macd standar configuration (12, 26, 9) in 1H resolution
// 10 periods ema, in 1H resolution
// 5 periods ema, in 15 minutes resolution

// We use the two emas to filter for long and short positions. 
// If 15 minutes ema is above 1H ema, we look for long positions
// If 15 minutes ema is below 1H ema, we look for short positions 

// We can use an aditional filter using a 100 days ema, so when the 15' and 1H emas are above the daily ema we take long positions
// Using this filter improves the strategy 

// We wait for Macd indicator to form a divergence between histogram and price
// If we have a bullish divergence, and 15 minutes ema is above 1H ema, we wait for macd line to cross above signal line and we open a long position
// If we have a bearish divergence, and 15 minutes ema is below 1H ema, we wait for macd line to cross below signal line and we open a short position

// We close both position after a cross in the oposite direction of macd line and signal line
// Also we can configure a Take profit parameter and a trailing stop loss


// strategy("Macd + MTF EMA",
//          overlay=true,
//          initial_capital=1000,
//          default_qty_value=20,
//          default_qty_type=strategy.percent_of_equity,
//          commission_value=0.1,
//          pyramiding=0)

// User Inputs
i_time          = input(defval = timestamp("01 Apr 2018 13:30 +0000"), title = "Start Time",  type = input.time)    // Starting  time for backtest
f_time          = input(defval = timestamp("30 Sep 2021 13:30 +0000"), title = "Finish Time", type = input.time)    // Finishing time for backtest

long_pos        = input(title="Show Long Positions",  defval=true, type=input.bool)                                 // Enable Long  Positions
short_pos       = input(title="Show Short Positions", defval=true, type=input.bool)                                 // Enable Short Positions
src             = input(close, title="Source")                                                                      // Price value to calculate indicators

emas_properties = input(title="============ EMAS Properties ============", defval=false, type=input.bool)           // Properties

mtf_15          = input(title="Fast EMA", type=input.resolution, defval="15")                                         // Resolucion para MTF EMA 15 minutes
ma_15_length    = input(5, title = "Fast EMA Period")                                                              // MTF EMA 15 minutes Length
mtf_60          = input(title="Slow EMA", type=input.resolution, defval="60")                                         // Resolucion para MTF EMA 60 minutes
ma_60_length    = input(10, title = "Slow EMA Period")                                                              // MTF EMA 60 minutes Length

e_new_filter    = input(title="Enable a Third Ema filter?", defval=true, type=input.bool) 
slowest_ema_len = input(100, title = "Fast EMA Period")
slowest_ema_res = input(title="Slowest EMA", type=input.resolution, defval="D")
macd_res        = input(title="MACD TimeFrame", type=input.resolution, defval="")                                   // MACD Time Frame

macd_properties = input(title="============ MACD Properties ============", defval="")                               // Properties

fast_len        = input(title="Fast Length", type=input.integer, defval=12)                                         // Fast MA Length
slow_len        = input(title="Sign Length", type=input.integer, defval=26)                                         // Sign MA Length
sign_len        = input(title="Sign Length", type=input.integer, defval=9) 

syst_properties = input(title="============ System Properties ============", defval="")                             // Properties

lookback        = input(title="Lookback period", type=input.integer, defval=14, minval=1)                            // Candles to lookback for swing high or low
multiplier      = input(title="Profit Multiplier based on Stop Loss", type=input.float, defval=6.0, minval=0.1)     // Profit multiplier based on stop loss
shortStopPer    = input(title="Short Stop Loss Percentage", type=input.float, defval=1.0, minval=0.0)/100           
longStopPer     = input(title="Long Stop Loss Percentage",  type=input.float, defval=2.0, minval=0.0)/100


// Indicators

[macd, signal, hist] = security(syminfo.tickerid, macd_res, macd(src, fast_len, slow_len, sign_len))
ma_15  = security(syminfo.tickerid, mtf_15, ema(src, ma_15_length))
ma_60  = security(syminfo.tickerid, mtf_60, ema(src, ma_60_length))
ma_slo = security(syminfo.tickerid, slowest_ema_res, ema(src, slowest_ema_len))

// Macd Plot

col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350

plot(macd,   color=color.new(color.blue, 0))              // Solo para visualizar que se plotea correctamente
plot(signal, color=color.new(color.orange, 0))
plot(hist,   style=plot.style_columns,
     color=(hist >= 0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : 
     (hist[1] < hist ? col_grow_below : col_fall_below)))


// MTF EMA Plot
 
bullish_filter = e_new_filter ? ma_15 > ma_60 and ma_60 > ma_slo : ma_15 > ma_60 
bearish_filter = e_new_filter ? ma_15 < ma_60 and ma_60 < ma_slo : ma_15 < ma_60
    
plot(ma_15,  color=color.new(color.blue, 0))
plot(ma_60,  color=color.new(color.yellow, 0))
plot(e_new_filter ? ma_slo : na, color = ma_60 > ma_slo ? color.new(color.green, 0) : color.new(color.red, 0))

////////////////////////////////////////////// Logic For Divergence

zero_cross = false                                     
zero_cross := crossover(hist,0) or crossunder(hist,0)  //Cruce del Histograma a la linea 0
// plot(zero_cross ? 1 : na)

// MACD DIVERGENCE TOPS (Bearish Divergence) 

highest_top  = 0.0
highest_top := (zero_cross == true ? 0.0 : (hist > 0 and hist > highest_top[1] ? hist : highest_top[1]))
prior_top    = 0.0
prior_top   := (crossunder(hist,0) ? highest_top[1] : prior_top[1])  // Búsqueda del Maximo en MACD
// plot(highest_top)
// plot(prior_top)

highest_top_close  = 0.0
highest_top_close := (zero_cross == true ? 0.0 : (hist > 0 and hist > highest_top[1] ? close : highest_top_close[1]))
prior_top_close    = 0.0
prior_top_close   := (crossunder(hist,0) ? highest_top_close[1] : prior_top_close[1]) // Búsqueda del Maximo en pRECIO
// plot(highest_top_close)
// plot(prior_top_close)

top = false 
top := highest_top[1] < prior_top[1]
     and highest_top_close[1] > prior_top_close[1]
     and hist < hist[1]
     and crossunder(hist,0)                         // Bearish Divergence: top == true 


// MACD DIVERGENCE BOTTOMS (Bullish Divergence) 

lowest_bottom  = 0.0
lowest_bottom := (zero_cross == true ? 0.0 : (hist < 0 and hist < lowest_bottom[1] ? hist : lowest_bottom[1]))
prior_bottom   = 0.0
prior_bottom  := (crossover(hist,0) ? lowest_bottom[1] : prior_bottom[1])

lowest_bottom_close = 0.0
lowest_bottom_close := (zero_cross == true ? 0.0 : (hist < 0 and hist < lowest_bottom[1] ? close : lowest_bottom_close[1]))
prior_bottom_close = 0.0
prior_bottom_close := (crossover(hist,0) ? lowest_bottom_close[1] : prior_bottom_close[1])

bottom = false
bottom := lowest_bottom[1] > prior_bottom[1]
     and lowest_bottom_close[1] < prior_bottom_close[1]
     and hist > hist[1]
     and crossover(hist,0)                              // Bullish Divergence: bottom == true 


////////////////////////////////////////////// System Conditions //////////////////////////////////////////////

inTrade     = strategy.position_size != 0       // In Trade
longTrade   = strategy.position_size  > 0       // Long position
shortTrade  = strategy.position_size  < 0       // Short position
notInTrade  = strategy.position_size == 0       // No trade
entryPrice  = strategy.position_avg_price       // Position Entry Price

////////////////////////////////////////////// Long Conditions //////////////////////////////////////////////

sl = lowest(low, lookback)                  // Swing Low for Long Entry

longStopLoss    = 0.0                       // Trailing Stop Loss calculation
longStopLoss   := if (longTrade)
    astopValue  = sl * (1 - longStopPer)
    max(longStopLoss[1], astopValue)
else
    0

longTakeProf  = 0.0                         // Profit calculation based on stop loss
longTakeProf := if (longTrade)
    profitValue = entryPrice + (entryPrice - longStopLoss) * multiplier
    max(longTakeProf[1], profitValue)
else
    0
    
// Long Entry Conditions

if bottom and notInTrade and bullish_filter and long_pos
    strategy.entry(id="Go Long", long=strategy.long, comment="Long Position")

// strategy.close(id="Go Long", when=zero_cross)

if longTrade
    strategy.exit("Exit Long", "Go Long", limit = longTakeProf, stop = longStopLoss)

plot(longTrade and longStopLoss ? longStopLoss  : na, title="Long Stop Loss",  color=color.new(color.red, 0),   style=plot.style_linebr)
plot(longTrade and longTakeProf ? longTakeProf  : na, title="Long Take Prof",  color=color.new(color.green, 0), style=plot.style_linebr)

////////////////////////////////////////////// Short Conditions //////////////////////////////////////////////

sh = highest(high, lookback) // Swing High for Short Entry

shortStopLoss  = 0.0 
shortStopLoss := if (shortTrade)
    bstopValue = sh * (1 + shortStopPer)
    min(shortStopLoss[1], bstopValue)
else 
    999999
    
shortTakeProf    = 0.0    
shortTakeProf   := if (shortTrade)
    SprofitValue = entryPrice - (shortStopLoss - entryPrice) * multiplier
    min(SprofitValue, shortTakeProf[1])
else 
    999999
    
// Short Entry
if top and notInTrade and bearish_filter and short_pos
    strategy.entry(id="Go Short", long=strategy.short, comment="Short Position")

// strategy.close(id="Go Short", when=zero_cross)

if shortTrade
    strategy.exit("Exit Short", "Go Short", limit = shortTakeProf, stop = shortStopLoss)


plot(shortTrade and shortStopLoss ? shortStopLoss : na, title="Short Stop Loss", color=color.new(color.red, 0),   style=plot.style_linebr)
plot(shortTrade and shortTakeProf ? shortTakeProf : na, title="Short Take Prof", color=color.new(color.green, 0), style=plot.style_linebr)





```

> Detail

https://www.fmz.com/strategy/430765

> Last Modified

2023-11-01 16:37:17
