
> Name

震荡盈利波段Grid策略Profit-Grid-Strategy-With-Oscillation

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15fd7335d0cead19160.png)
[trans]
## 概述

震荡盈利波段Grid策略是一种趋势跟踪策略,它根据价格的波动自动建立网格,在价格波动的时候可以持续盈利。

## 策略原理

该策略的核心思想是建立一个价格波段网格,当价格进入不同的波段时,会产生新的交易信号。例如,如果网格间距设置为500美元,那么当价格上涨超过500美元时会产生新的做多信号。

具体来说,该策略通过追踪价格的新高价或新低价来不断移动建立新的网格。在代码中,我们定义了一个变量`re_grid`来存储当前的网格价位。价格只要突破这个网格价位超过设置的网格间距,就会重新计算下一个网格价位。

这样,当价格出现足够大的波动时,就会产生新的交易信号,我们可以通过做多或做空来获利。当价格开始向反方向移动超过网格间距时,原来的头寸会止损。

## 优势分析

该策略最大的优势在于可以自动跟踪价格趋势,持续获利。只要价格保持足够大的波动,我们的头寸规模会不断增大,利润也会越来越多。

另外,通过合理设置网格参数,可以有效控制风险。此外,结合Ichimoku 云图等技术指标过滤信号,可以提高策略稳定性。

## 风险分析

该策略主要的风险在于价格可能会突然反转,导致止损。这时之前积累的利润可能会减少或者亏损。

为了控制这种风险,我们可以设置止损线,合理调整网格参数,选择趋势性较强的交易品种,结合多个技术指标进行信号过滤等方法。

## 优化方向

我们可以从以下几个方面继续优化该策略:

1. 优化网格参数,找到最佳的网格间距、仓位规模等参数组合

2. 增加或调整止损机制,更好地控制风险

3. 测试不同的交易品种,选择波动较大、趋势更明显的品种

4. 增加更多技术指标判断,提高策略稳定性

## 总结

该震荡盈利波段Grid策略通过建立价格网格自动跟踪趋势,可以有效地持续获利。同时也存在一定的回撤风险。通过参数优化、止损设置、品种选择等手段可以有效控制风险,提高策略稳定性。

||

## Overview

The profit grid strategy with oscillation is a trend following strategy that automatically establishes grids based on price fluctuations to make profits continuously as price oscillates.  

## Strategy Logic

The core idea of this strategy is to build a grid of price ranges. New trading signals are generated when the price enters different ranges. For example, if the grid gap is set to 500 USD, a new long signal will be triggered when the price rises above 500 USD.

Specifically, the strategy keeps moving the grid by tracking new high or low prices. In the code, a variable called `re_grid` is defined to store the current grid price. As long as the price breaks through this grid price beyond the defined grid gap, the next grid price will be recalculated.  

Thus, new trading signals are generated when the price fluctuates sufficiently. Profits can be made by going long or short accordingly. When the price starts to move in the opposite direction exceeding the grid gap, the previous position will be stopped out at a profit.

## Advantage Analysis  

The biggest advantage of this strategy is that it can automatically track the price trend and make profits persistently. As long as the price keeps fluctuating strongly, our position size and profits will increase continuously.  

In addition, risks can be effectively controlled by reasonably setting the grid parameters. Combining with technical indicators like Ichimoku Cloud to filter signals can also improve the stability of the strategy.

## Risk Analysis

The main risk of this strategy is that price may suddenly reverse, leading to a stop loss. The accumulated profits could then diminish or even turn into a loss.  

To control such risk, we can set a stop loss line, reasonably adjust the grid parameters, choose products with a stronger trend, and filter signals with multiple technical indicators.

## Optimization Directions  

We can optimize the strategy from the following aspects:

1. Optimize grid parameters to find the best combination of grid gap, position sizing etc.  

2. Improve or adjust the stop loss mechanism to better control risks.

3. Test different trading products and select those with higher fluctuations and clearer trends.  

4. Add more technical indicators to judge signals and improve robustness.

## Conclusion  

The profit grid strategy with oscillation can effectively generate persistent profits by automatically tracking trends through establishing price grids. At the same time, certain drawdown risks exist. By parameter optimization, stop loss setting, product selection etc, the risks can be effectively controlled and strategy made more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Backtest (no comment-string, disable for API-trading)|
|v_input_2|0|Long/Short Entry: Long|Short|
|v_input_3|0|--- 1st ENTRY SIGNAL ---: Grid - reentry|---|Grid - counter trend|Fractals|Reverse fractal|
|v_input_4|0|--- 2nd ENTRY SIGNAL ---: ---|Grid - reentry|Grid - counter trend|Fractals|Reverse fractal|
|v_input_5|0|Entry filter 1: ---|Bar breakout 1 filter|Bar breakout 2 filter|SMA filter|MACD filter|RSI50 filter|Fractals filter|Segments filter|Fractals 1-2-3 filter|Reverse fractal filter|EMA21/SMA20 filter|TRIX filter|SuperTrend filter|Parabolic SAR filter|ADX filter|Price X Kumo filter|Price X Kijun filter|Kumo flip filter|Price filtered Kumo flip filter|Chikou X price filter|Chikou X Kumo filter|Price X Tenkan filter|Tenkan X Kumo filter|Tenkan X Kijun filter|
|v_input_6|0|Entry filter 2: ---|Bar breakout 1 filter|Bar breakout 2 filter|SMA filter|MACD filter|RSI50 filter|Fractals filter|Segments filter|Fractals 1-2-3 filter|Reverse fractal filter|EMA21/SMA20 filter|TRIX filter|SuperTrend filter|Parabolic SAR filter|ADX filter|Price X Kumo filter|Price X Kijun filter|Kumo flip filter|Price filtered Kumo flip filter|Chikou X price filter|Chikou X Kumo filter|Price X Tenkan filter|Tenkan X Kumo filter|Tenkan X Kijun filter|
|v_input_7|0|Exit filter 1: ---|TRIX exit|Reverse fractal exit|SMA exit|MACD exit|RSI50 exit|Fractals exit|SuperTrend exit|Parabolic SAR exit|ADX exit|Cloud exit|Kijun exit|
|v_input_8|0|Exit filter 2: ---|TRIX exit|Reverse fractal exit|SMA exit|MACD exit|RSI50 exit|Fractals exit|SuperTrend exit|Parabolic SAR exit|ADX exit|Cloud exit|Kijun exit|
|v_input_9|500|Grid gap - base currency|
|v_input_10|false| Shared filter and entry parameters :|
|v_input_11|10|Segment max bars|
|v_input_12|2|Fractals period|
|v_input_13|14|RSI period|
|v_input_14|50|MA period|
|v_input_15|3|SuperTrend multiplier|
|v_input_16|6|SuperTrend length|
|v_input_17|10|DI length (signals)|
|v_input_18|10|ADX smooth (signals)|
|v_input_19|25|ADX threshold (signals)|
|v_input_20|14|TRIX Length|
|v_input_21|6|Signal Smoothing Length (TRIX)|
|v_input_22|false| Exit Parameters :|
|v_input_23|14|TRIX Length|
|v_input_24|6|Signal Smoothing Length (TRIX)|
|v_input_25|2|Exit fractals - period|
|v_input_26|false|Exit fractals - past fractal|
|v_input_27|14|Exit RSI period|
|v_input_28|50|Exit MA period|
|v_input_29|2|Exit SuperTrend multiplier|
|v_input_30|5|Exit SuperTrend length|
|v_input_31|10|Exit ADX period|
|v_input_32|10|Exit ADX smooth|
|v_input_33|25|Exit ADX threshold|
|v_input_34|false| Set backtest start or/and trend start :|
|v_input_35|2020|Start year|
|v_input_36|3|Start month|
|v_input_37|13|Start day|
|v_input_38|2120|Stop year|
|v_input_39|12|Stop month|
|v_input_40|31|Stop day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-16 00:00:00
end: 2024-01-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ramsay09
//@version=4

strategy(title="Grid Tool",shorttitle= "Grid", overlay= true )



backtest        = input(title= "Backtest (no comment-string, disable for API-trading)", type= input.bool, defval= true)
entry_type      = input("Long", title= "Long/Short Entry", options= ["Long", "Short"])


X_opt           = input("Grid - reentry", title="--- 1st ENTRY SIGNAL ---", options= ["---", "Grid - reentry", "Grid - counter trend", "Fractals", "Reverse fractal"])
                         
X_opt_2         = input("---", title="--- 2nd ENTRY SIGNAL ---", options= ["---", "Grid - reentry", "Grid - counter trend", "Fractals", "Reverse fractal"])                         


entry_f_1       = input("---", title="Entry filter 1", options= ["---", "Bar breakout 1 filter", "Bar breakout 2 filter", "SMA filter", "MACD filter", "RSI50 filter", "Fractals filter", 
                         "Segments filter", "Fractals 1-2-3 filter", "Reverse fractal filter", "EMA21/SMA20 filter", "TRIX filter",
                         "SuperTrend filter", "Parabolic SAR filter", "ADX filter", "Price X Kumo filter", "Price X Kijun filter", "Kumo flip filter", 
                         "Price filtered Kumo flip filter",  "Chikou X price filter", "Chikou X Kumo filter", "Price X Tenkan filter", "Tenkan X Kumo filter", 
                         "Tenkan X Kijun filter"])

entry_f_2       = input("---", title="Entry filter 2", options= ["---", "Bar breakout 1 filter", "Bar breakout 2 filter", "SMA filter", "MACD filter", "RSI50 filter", "Fractals filter", 
                         "Segments filter", "Fractals 1-2-3 filter", "Reverse fractal filter", "EMA21/SMA20 filter", "TRIX filter",
                         "SuperTrend filter", "Parabolic SAR filter", "ADX filter", "Price X Kumo filter", "Price X Kijun filter", "Kumo flip filter", 
                         "Price filtered Kumo flip filter",  "Chikou X price filter", "Chikou X Kumo filter", "Price X Tenkan filter", "Tenkan X Kumo filter", 
                         "Tenkan X Kijun filter"])


exit_f_1        = input("---", title="Exit filter 1", options= ["---", "TRIX exit", "Reverse fractal exit", "SMA exit", "MACD exit", 
                         "RSI50 exit", "Fractals exit", "SuperTrend exit", "Parabolic SAR exit", "ADX exit", "Cloud exit", "Kijun exit"])

exit_f_2        = input("---", title="Exit filter 2", options= ["---", "TRIX exit", "Reverse fractal exit", "SMA exit", "MACD exit", 
                         "RSI50 exit", "Fractals exit", "SuperTrend exit", "Parabolic SAR exit", "ADX exit", "Cloud exit", "Kijun exit"])
                         

//--------------------- Signal inputs -----------------------

grid_gap        = input(500, type= input.float, title= "Grid gap - base currency", minval= 0, step= 10)


//--------------------- filter inputs --------------------

shared_param    = input(false, title= " Shared filter and entry parameters :", type= input.bool)

sb              = input(title="Segment max bars", defval= 10, minval= 0, step= 1)

fr_period       = input(2, title= "Fractals period", minval= 1)
rsi_period      = input(14, title= "RSI period", minval= 1)
ma_period       = input(50, title= "MA period", minval= 1)
mult            = input(3, type= input.float, title= "SuperTrend multiplier", minval= 1, step= 0.1)
len             = input(6, type= input.integer, title= "SuperTrend length", minval= 1)
start           = 0.02//input(0.02, title= "PSAR Start (Filter/Entry)", minval= 0)
inc             = 0.02//input(0.02, title= "PSAR Increment (Filter/Entry)", minval= 0)
max             = 0.2//input(.2, title= "PSAR Maximum (Filter/Entry)", minval= 0)
di_length_s     = input(10, title= "DI length (signals)", minval= 1)
adx_smooth_s    = input(10, title= "ADX smooth (signals)", minval= 1)
adx_thres_s     = input(25, title= "ADX threshold (signals)", minval= 1)
trix_len_f      = input(14, title= "TRIX Length", type=input.integer, minval=1)
smooth_length_f = input(6, title= "Signal Smoothing Length (TRIX)", type=input.integer, minval=1)


//--------------------- exit inputs --------------------

exit_param      = input(false, title= " Exit Parameters :", type= input.bool)

trix_len_x      = input(14, title= "TRIX Length", type=input.integer, minval=1)
smooth_length_x = input(6, title= "Signal Smoothing Length (TRIX)", type=input.integer, minval=1)
fr_period_x     = input(2, title= "Exit fractals - period", minval= 1)
fr_past_x       = input(0, title= "Exit fractals - past fractal", minval= 0)
rsi_period_x    = input(14, title= "Exit RSI period", minval= 1)
ma_period_x     = input(50, title= "Exit MA period", minval= 1)
mult_x          = input(2, type= input.float, title= "Exit SuperTrend multiplier", minval= 1)
len_x           = input(5, type= input.integer, title= "Exit SuperTrend length", minval= 1)
di_length_x     = input(10, title= "Exit ADX period", minval= 1)
adx_smooth_x    = input(10, title= "Exit ADX smooth", minval= 1)
adx_thres_x     = input(25, title= "Exit ADX threshold", minval= 1)


//----------------------- Backtest periode --------------------------------

b_t_per_start   = input(false, title= " Set backtest start or/and trend start :", type= input.bool)

start_year      = input(2020, "Start year")
start_month     = input(3, "Start month", minval= 1, maxval= 12)
start_day       = input(13, "Start day", minval= 1, maxval= 31)
period_start    = timestamp(start_year, start_month, start_day, 0, 0)

stop_year       = input(2120, "Stop year")
stop_month      = input(12, "Stop month", minval= 1, maxval= 12)
stop_day        = input(31, "Stop day", minval= 1, maxval= 31)
period_stop     = timestamp(stop_year, stop_month, stop_day, 0, 0)

backtest_period() => time >= period_start and time <= period_stop ? true : false


//-------------------- Ichimoku --------------------

TKlength            = 9 //input(9, "Tenkan-sen length", minval= 1)
KJlength            = 26 //input(26, "Kijun-sen length", minval= 1)
CSHSlength          = 26 //input(26, "Chikouspan length/horizontal shift", minval= 1)
SBlength            = 52 //input(52, "SenkouspanB length", minval= 1)
SAlength            = 26 //input(26, "SenkouspanA length", minval= 1)

// calculation
TK                  = avg(lowest(TKlength), highest(TKlength))
KJ                  = avg(lowest(KJlength), highest(KJlength))
CS                  = close
SB                  = avg(lowest(SBlength), highest(SBlength))
SA                  = avg(TK,KJ)

kumo_high   = max(SA[CSHSlength-1], SB[CSHSlength-1])
kumo_low    = min(SA[CSHSlength-1], SB[CSHSlength-1]) 


//------------------------------------- Filters and entry signals --------------------------------------

//---------------------- Ichimoku filter ------------------------

// cross conditions for "Strong" filtered signals
var bool sasb_x  = true
if crossover(SA, SB) and low > kumo_high 
    sasb_x := true 

if crossunder(SA, SB) and high < kumo_low 
    sasb_x := false
    
    
var bool tkkj_x  = true
if crossover(TK, KJ) and TK > kumo_high and KJ > kumo_high
    tkkj_x := true 
    
if crossunder(TK, KJ) and TK < kumo_low and KJ < kumo_low
    tkkj_x := false
  

// Ichimoku filters
kijun_buy_f                           = close > KJ
kumo_buy_f                            = close > kumo_high
kumo_flip_buy_f                       = SA > SB  
price_filtered_kumo_flip_buy_f        = sasb_x and low > kumo_high  
chikou_X_price_buy_f                  = CS > high[(26-1)]  
chikou_X_kumo_buy_f                   = CS > kumo_high[26-1]   
price_X_tenkan_buy_f                  = close > TK  
tenkan_X_kumo_buy_f                   = TK > kumo_high   
tenkan_X_kijun_buy_f                  = TK > KJ 
kumo_filtered_tenkan_X_kijun_buy_f    = tkkj_x and TK > kumo_high and KJ > kumo_high and TK > KJ


kijun_sell_f                          = close < KJ
kumo_sell_f                           = close < kumo_low
kumo_flip_sell_f                      = SA < SB  
price_filtered_kumo_flip_sell_f       = not sasb_x and high < kumo_low 
chikou_X_price_sell_f                 = CS < low[(26-1)]  
chikou_X_kumo_sell_f                  = CS < kumo_low[26-1]  
price_X_tenkan_sell_f                 = close < TK 
tenkan_X_kumo_sell_f                  = TK < kumo_low
tenkan_X_kijun_sell_f                 = TK < KJ 
kumo_filtered_tenkan_X_kijun_sell_f   = not tkkj_x and TK < kumo_low and KJ < kumo_low and TK < KJ

// Ichimoku exits
kijun_buy_x                           = close > KJ
kumo_buy_x                            = close > kumo_high

kijun_sell_x                          = close < KJ
kumo_sell_x                           = close < kumo_low


//------------------------ grid --------------------------

//up_grid             = 0.
//up_grid             := nz(high > up_grid[1] + grid_gap and backtest_period() ? close : up_grid[1])        // forward grid long

//dn_grid             = 0.
//dn_grid             := nz(low < dn_grid[1] - grid_gap and backtest_period() ? close : dn_grid[1])         // forward grid short

re_grid             = 0.
re_grid             := nz(high > re_grid[1] + grid_gap or low < re_grid[1] - grid_gap ? close : re_grid[1])


//grid_up_buy         = up_grid > up_grid[1]
//grid_dn_sell        = dn_grid < dn_grid[1]

grid_ct_buy         = re_grid < re_grid[1]
grid_ct_sell        = re_grid > re_grid[1]

grid_re_buy         = re_grid > re_grid[1]
grid_re_sell        = re_grid < re_grid[1]

//plot(re_grid,"Plot", color= color.yellow, linewidth= 2)


//---------------------- reverse fractal signal and filter --------------------------

up_bar              = close[0] > open[0]
dn_bar              = close[0] < open[0]
hl                  = low[0] > low[1]
lh                  = high[0] < high[1]

rev_up_fr_sell      = pivothigh(high, 3, 0) and dn_bar and up_bar[1] or 
                       pivothigh(high, 4, 1) and dn_bar and up_bar[1] or 
                       pivothigh(high, 4, 1) and lh and up_bar and up_bar[1] 


rev_dn_fr_buy       = pivotlow(low, 3, 0) and up_bar  and dn_bar[1] or 
                       pivotlow(low, 4, 1) and up_bar and dn_bar[1] or 
                       pivotlow(low, 4, 1) and hl and dn_bar and dn_bar[1] 


ema_f(src, ema_len)  => ema(src, ema_len)  // ma function definition
sma_f(src, sma_len)  => sma(src, sma_len)

ema_21          = ema_f(close, 21)  // ema21/sma20 signal
sma_20          = sma_f(close, 20)

ma_cross_buy    = close > ema_21 and close > sma_20 and ema_21 > sma_20
ma_cross_sell   = close < ema_21 and close < sma_20 and ema_21 < sma_20


//--------------------- TRIX ------------------------

triple_ema_f      = ema(ema(ema(close, trix_len_f), trix_len_f), trix_len_f)
trix_f            = roc(triple_ema_f, 1)
signal_f          = sma(trix_f, smooth_length_f)

triple_ema_x      = ema(ema(ema(close, trix_len_x), trix_len_x), trix_len_x)
trix_x            = roc(triple_ema_x, 1)
signal_x          = sma(trix_x, smooth_length_x)

//filters
trix_buy_f      = trix_f > signal_f
trix_sell_f     = trix_f < signal_f
//exits
trix_buy_x      = trix_x > signal_x
trix_sell_x     = trix_x < signal_x

//----------------------- macd filter -----------------------

[macdLine_f, signalLine_f, histLine_f]  = macd(close, 12, 26, 9)
//filters
macd_buy                                = macdLine_f > signalLine_f
macd_sell                               = macdLine_f < signalLine_f

//exit
macd_buy_x                              = macdLine_f > signalLine_f
macd_sell_x                             = macdLine_f < signalLine_f


//---------------------- rsi filter and entry signal------------------------
//entry
rsi_f           = rsi(close, rsi_period)
rsi_f_buy       = rsi_f > 50
rsi_f_sell      = rsi_f < 50

//filters
rsi_f_buy_f     = rsi_f > 50
rsi_f_sell_f    = rsi_f < 50

//exit
rsi_f_x         = rsi(close, rsi_period_x)
rsi_f_buy_x     = rsi_f_x > 50
rsi_f_sell_x    = rsi_f_x < 50


//---------------- Bill Williams Fractals (filter and entry signal) -----------------

up_fr           = pivothigh(fr_period, fr_period)
dn_fr           = pivotlow(fr_period, fr_period)

fractal_up_v    = valuewhen(up_fr, high[fr_period],0) 
fractal_dn_v    = valuewhen(dn_fr, low[fr_period],0)
//entry signal
fr_upx          = crossover(high, fractal_up_v)
fr_dnx          = crossunder(low, fractal_dn_v)

//filters
fr_upx_f        = high > fractal_up_v
fr_dnx_f        = low < fractal_dn_v

//exit
up_fr_x         = pivothigh(fr_period_x, fr_period_x)
dn_fr_x         = pivotlow(fr_period_x, fr_period_x)

fractal_up_v_x  = valuewhen(up_fr_x, high[fr_period_x], fr_past_x) 
fractal_dn_v_x  = valuewhen(dn_fr_x, low[fr_period_x], fr_past_x)

fr_upx_x        = high > fractal_up_v_x
fr_dnx_x        = low < fractal_dn_v_x


//higher low and higher high - lower high and lower low - entry 

fractal_dn_v_1  = valuewhen(dn_fr, low[fr_period],1)
fractal_up_v_1  = valuewhen(up_fr, high[fr_period],1)

hl_hh_buy       = fractal_dn_v > fractal_dn_v_1 and high > fractal_up_v                                  // 123 signal and filter
                 
lh_ll_sell      = fractal_up_v < fractal_up_v_1 and low < fractal_dn_v 


//-------------------- SuperTrend filter and entry signal ---------------------
//entry
[SuperTrend, Dir]       = supertrend(mult, len)
sup_buy                 = close > SuperTrend
sup_sell                = close < SuperTrend

//filters
sup_buy_f               = close > SuperTrend
sup_sell_f              = close < SuperTrend

//exit
[SuperTrend_x, Dir_x]   = supertrend(mult_x, len_x)
sup_buy_x               = close > SuperTrend_x
sup_sell_x              = close < SuperTrend_x


//----------------- Parabolic SAR Signal (pb/ps) and filter -------------------

psar_buy        = high > sar(start, inc, max)[0]
psar_sell       = low < sar(start, inc, max)[0]

//filters
psar_buy_f      = high > sar(start, inc, max)[0]
psar_sell_f     = low < sar(start, inc, max)[0]


//-------------------------- ADX entry and filter ---------------------------

//exit
[diplus_f_x, diminus_f_X, adx_f_x]      = dmi(di_length_x, adx_smooth_x)
adx_thres_f_x                           = adx_f_x < adx_thres_x


//adx signal 1/2 and filters
[diplus_s, diminus_s, adx_s]            = dmi(di_length_s, adx_smooth_s)
adx_above_thres                         = adx_s > adx_thres_s

long_1          = diplus_s > diminus_s and adx_s < diplus_s and adx_s > diminus_s 
                 
short_1         = diplus_s < diminus_s and adx_s > diplus_s and adx_s < diminus_s

long_2          = diplus_s > diminus_s and adx_above_thres
short_2         = diplus_s < diminus_s and adx_above_thres


//-------------------------- SMA50 filter and entry---------------------------
//entry
sma_buy         = close[2] > ema_f(close, ma_period)
sma_sell        = close[2] < ema_f(close, ma_period) 

//filters
sma_buy_f       = close[2] > sma_f(close, ma_period)
sma_sell_f      = close[2] < sma_f(close, ma_period) 

//exit
sma_buy_x       = close[1] > sma_f(close, ma_period_x)
sma_sell_x      = close[1] < sma_f(close, ma_period_x)


//--------------------------- Segments signal ----------------------------

count1_l            = 0
count2_l            = 0
segment_1_stat_l    = false    
segment_2_stat_l    = false  
segment_3_stat_l    = false 

higher_low          = low > low[1] 

var line segment_low_1_l   = na
var line segment_low_2_l   = na
var line segment_low_3_l   = na

// long segments
for i=0 to sb
    count1_l := count1_l + 1
    if low[1] > low[i+2] and higher_low
        segment_1_stat_l  := true  
        break
            
for i=count1_l to sb+count1_l
    count2_l := count2_l + 1
    if low[1+count1_l] > low[i+2] and segment_1_stat_l
        segment_2_stat_l  := true 
        break
                
for i=count2_l to sb+count2_l    
    if low[1+count1_l+count2_l] > low[i+2+count1_l] and segment_2_stat_l
        segment_3_stat_l  := true 
        break


// short segments
count1_s            = 0
count2_s            = 0
segment_1_stat_s    = false    
segment_2_stat_s    = false  
segment_3_stat_s    = false 

lower_high          = high < high[1] 

var line segment_high_1   = na
var line segment_high_2   = na
var line segment_high_3   = na

for i=0 to sb
    count1_s := count1_s + 1
    if high[1] < high[i+2] and lower_high
        segment_1_stat_s := true  
        break
            
for i=count1_s to sb+count1_s
    count2_s := count2_s + 1
    if high[1+count1_s] < high[i+2] and segment_1_stat_s
        segment_2_stat_s := true 
        break
                
for i=count2_s to sb+count2_s    
    if high[1+count1_s+count2_s] < high[i+2+count1_s] and segment_2_stat_s
        segment_3_stat_s := true 
        break

// segments signals
seg_stat_l          = segment_1_stat_l and segment_2_stat_l and segment_3_stat_l 
seg_stat_s          = segment_1_stat_s and segment_2_stat_s and segment_3_stat_s 
//entry
segments_buy        = high > high[1] and seg_stat_l[1]
segments_sell       = low < low[1] and seg_stat_s[1]

//filters
segments_buy_f      = high > high[1] and seg_stat_l[1]
segments_sell_f     = low < low[1] and seg_stat_s[1]


//--------------------------- Entry Signal Options ---------------------------

// buy signal options 1
opt_sig_buy = 
     X_opt == "---" ? na :
//     X_opt == "Grid - forward sig" ? grid_up_buy :  
     X_opt == "Grid - counter trend" ? grid_ct_buy : 
     X_opt == "Grid - reentry" ? grid_re_buy : 
     X_opt == "Fractals" ? fr_upx : 
     X_opt == "Reverse fractal" ? rev_dn_fr_buy : na

// sell signal options 1
opt_sig_sell = 
     X_opt == "---" ? na : 
//     X_opt == "Grid - forward sig" ? grid_dn_sell :   
     X_opt == "Grid - counter trend" ? grid_ct_sell : 
     X_opt == "Grid - reentry" ? grid_re_sell : 
     X_opt == "Fractals" ? fr_dnx : 
     X_opt == "Reverse fractal" ? rev_up_fr_sell : na


// buy signal options 2
opt_sig_buy_2 = 
     X_opt_2 == "---" ? na :
//     X_opt_2 == "Grid - forward sig" ? grid_up_buy :
     X_opt_2 == "Grid - counter trend" ? grid_ct_buy :
     X_opt_2 == "Grid - reentry" ? grid_re_buy :
     X_opt_2 == "Fractals" ? fr_upx : 
     X_opt_2 == "Reverse fractal" ? rev_dn_fr_buy : na

// sell signal options 2
opt_sig_sell_2 = 
     X_opt_2 == "---" ? na : 
//     X_opt_2 == "Grid - forward sig" ? grid_dn_sell :
     X_opt_2 == "Grid - counter trend" ? grid_ct_sell :
     X_opt_2 == "Grid - reentry" ? grid_re_sell :
     X_opt_2 == "Fractals" ? fr_dnx : 
     X_opt_2 == "Reverse fractal" ? rev_up_fr_sell : na


//-------------------------- entry filter -------------------------------

//entry buy filter 1 options
entry_filter_buy_1 = 
     entry_f_1 == "---" ? true :
     entry_f_1 == "MACD filter" ? macd_buy : 
     entry_f_1 == "RSI50 filter" ? rsi_f_buy_f : 
     entry_f_1 == "Fractals filter" ? fr_upx_f : 
     entry_f_1 == "SuperTrend filter" ? sup_buy_f : 
     entry_f_1 == "Parabolic SAR filter" ? psar_buy_f : 
     entry_f_1 == "SMA filter" ? sma_buy_f : 
     entry_f_1 == "ADX filter" ? adx_above_thres :     
     entry_f_1 == "Segments filter" ? segments_buy : 
     entry_f_1 == "Fractals 1-2-3 filter" ? hl_hh_buy : 
     entry_f_1 == "Reverse fractal filter" ? rev_dn_fr_buy : 
     entry_f_1 == "EMA21/SMA20 filter" ? ma_cross_buy : 
     entry_f_1 == "TRIX filter" ? trix_buy_f : 
     entry_f_1 == "Price X Kumo filter" ? kumo_buy_f : 
     entry_f_1 == "Price X Kijun filter" ? kijun_buy_f : 
     entry_f_1 == "Kumo flip filter" ? kumo_flip_buy_f :  
     entry_f_1 == "Price filtered Kumo flip filter" ? price_filtered_kumo_flip_buy_f : 
     entry_f_1 == "Chikou X price filter" ? chikou_X_price_buy_f : 
     entry_f_1 == "Chikou X Kumo filter" ? chikou_X_kumo_buy_f :  
     entry_f_1 == "Price X Tenkan filter" ? price_X_tenkan_buy_f : 
     entry_f_1 == "Tenkan X Kumo filter" ? tenkan_X_kumo_buy_f :  
     entry_f_1 == "Tenkan X Kijun filter" ? tenkan_X_kijun_buy_f : true    

//entry sell filter 1 options
entry_filter_sell_1 = 
     entry_f_1 == "---" ? true :
     entry_f_1 == "MACD filter" ? macd_sell : 
     entry_f_1 == "RSI50 filter" ? rsi_f_sell_f : 
     entry_f_1 == "Fractals filter" ? fr_dnx_f : 
     entry_f_1 == "SuperTrend filter" ? sup_sell_f : 
     entry_f_1 == "Parabolic SAR filter" ? psar_sell_f :
     entry_f_1 == "SMA filter" ? sma_sell_f : 
     entry_f_1 == "ADX filter" ? adx_above_thres :    
     entry_f_1 == "Segments filter" ? segments_sell : 
     entry_f_1 == "Fractals 1-2-3 filter" ? lh_ll_sell : 
     entry_f_1 == "Reverse fractal filter" ? rev_up_fr_sell : 
     entry_f_1 == "EMA21/SMA20 filter" ? ma_cross_sell : 
     entry_f_1 == "TRIX filter" ? trix_sell_f : 
     entry_f_1 == "Price X Kumo filter" ? kumo_sell_f : 
     entry_f_1 == "Price X Kijun filter" ? kijun_sell_f : 
     entry_f_1 == "Kumo flip filter" ? kumo_flip_sell_f : 
     entry_f_1 == "Price filtered Kumo flip filter" ?price_filtered_kumo_flip_sell_f :
     entry_f_1 == "Chikou X price filter" ? chikou_X_price_sell_f : 
     entry_f_1 == "Chikou X Kumo filter" ? chikou_X_kumo_sell_f : 
     entry_f_1 == "Price X Tenkan filter" ? price_X_tenkan_sell_f :
     entry_f_1 == "Tenkan X Kumo filter" ? tenkan_X_kumo_sell_f :
     entry_f_1 == "Tenkan X Kijun filter" ? tenkan_X_kijun_sell_f : true     

//entry buy filter 2 options
entry_filter_buy_2 = 
     entry_f_2 == "---" ? true :
     entry_f_2 == "MACD filter" ? macd_buy : 
     entry_f_2 == "RSI50 filter" ? rsi_f_buy_f : 
     entry_f_2 == "Fractals filter" ? fr_upx_f : 
     entry_f_2 == "SuperTrend filter" ? sup_buy_f : 
     entry_f_2 == "Parabolic SAR filter" ? psar_buy_f :
     entry_f_2 == "SMA filter" ? sma_buy_f : 
     entry_f_2 == "ADX filter" ? adx_above_thres :     
     entry_f_2 == "Segments filter" ? segments_buy :  
     entry_f_2 == "Fractals 1-2-3 filter" ? hl_hh_buy :  
     entry_f_2 == "Reverse fractal filter" ? rev_dn_fr_buy :  
     entry_f_2 == "EMA21/SMA20 filter" ? ma_cross_buy :  
     entry_f_2 == "TRIX filter" ? trix_buy_f : 
     entry_f_2 == "Price X Kumo filter" ? kumo_buy_f : 
     entry_f_2 == "Price X Kijun filter" ? kijun_buy_f : 
     entry_f_2 == "Kumo flip filter" ? kumo_flip_buy_f :  
     entry_f_2 == "Price filtered Kumo flip filter" ? price_filtered_kumo_flip_buy_f : 
     entry_f_2 == "Chikou X price filter" ? chikou_X_price_buy_f : 
     entry_f_2 == "Chikou X Kumo filter" ? chikou_X_kumo_buy_f :  
     entry_f_2 == "Price X Tenkan filter" ? price_X_tenkan_buy_f : 
     entry_f_2 == "Tenkan X Kumo filter" ? tenkan_X_kumo_buy_f : 
     entry_f_2 == "Tenkan X Kijun filter" ? tenkan_X_kijun_buy_f : true    

//entry sell filter 2 options
entry_filter_sell_2 = 
     entry_f_2 == "---" ? true :
     entry_f_2 == "MACD filter" ? macd_sell : 
     entry_f_2 == "RSI50 filter" ? rsi_f_sell_f : 
     entry_f_2 == "Fractals filter" ? fr_dnx_f : 
     entry_f_2 == "SuperTrend filter" ? sup_sell_f : 
     entry_f_2 == "Parabolic SAR filter" ? psar_sell_f :
     entry_f_2 == "SMA filter" ? sma_sell_f : 
     entry_f_2 == "ADX filter" ? adx_above_thres :   
     entry_f_2 == "Segments filter" ? segments_sell : 
     entry_f_2 == "Fractals 1-2-3 filter" ? lh_ll_sell : 
     entry_f_2 == "Reverse fractal filter" ? rev_up_fr_sell : 
     entry_f_2 == "EMA21/SMA20 filter" ? ma_cross_sell : 
     entry_f_2 == "TRIX filter" ? trix_sell_f : 
     entry_f_2 == "Price X Kumo filter" ? kumo_sell_f : 
     entry_f_2 == "Price X Kijun filter" ? kijun_sell_f : 
     entry_f_2 == "Kumo flip filter" ? kumo_flip_sell_f : 
     entry_f_2 == "Price filtered Kumo flip filter" ? price_filtered_kumo_flip_sell_f :
     entry_f_2 == "Chikou X price filter" ? chikou_X_price_sell_f : 
     entry_f_2 == "Chikou X Kumo filter" ? chikou_X_kumo_sell_f : 
     entry_f_2 == "Price X Tenkan filter" ? price_X_tenkan_sell_f :
     entry_f_2 == "Tenkan X Kumo filter" ? tenkan_X_kumo_sell_f :
     entry_f_2 == "Tenkan X Kijun filter" ? tenkan_X_kijun_sell_f : true    


//------------------------- exit filter -----------------------

//short exit buy filter 1 options
exit_filter_buy_1 = 
     exit_f_1 == "---" ? false :
     exit_f_1 == "TRIX exit" ? trix_buy_x :  
     exit_f_1 == "Reverse fractal exit" ? rev_dn_fr_buy :       
     exit_f_1 == "MACD exit" ? macd_buy_x : 
     exit_f_1 == "RSI50 exit" ? rsi_f_buy_x : 
     exit_f_1 == "Fractals exit" ? fr_upx_x : 
     exit_f_1 == "SuperTrend exit" ? sup_buy_x : 
     exit_f_1 == "Parabolic SAR exit" ? psar_buy :
     exit_f_1 == "SMA exit" ? sma_buy_x : 
     exit_f_1 == "ADX exit" ? adx_thres_f_x : 
     exit_f_1 == "Cloud exit" ? kumo_buy_x : 
     exit_f_1 == "Kijun exit" ? kijun_buy_x : false


//long exit sell filter 1 options
exit_filter_sell_1 = 
     exit_f_1 == "---" ? false :
     exit_f_1 == "TRIX exit" ? trix_sell_x : 
     exit_f_1 == "Reverse fractal exit" ? rev_up_fr_sell :      
     exit_f_1 == "MACD exit" ? macd_sell_x : 
     exit_f_1 == "RSI50 exit" ? rsi_f_sell_x : 
     exit_f_1 == "Fractals exit" ? fr_dnx_x : 
     exit_f_1 == "SuperTrend exit" ? sup_sell_x : 
     exit_f_1 == "Parabolic SAR exit" ? psar_sell :
     exit_f_1 == "SMA exit" ? sma_sell_x : 
     exit_f_1 == "ADX exit" ? adx_thres_f_x : 
     exit_f_1 == "Cloud exit" ? kumo_sell_x : 
     exit_f_1 == "Kijun exit" ? kijun_sell_x : false


//short exit buy filter 2 options
exit_filter_buy_2 = 
     exit_f_2 == "---" ? false :
     exit_f_2 == "TRIX exit" ? trix_buy_x : 
     exit_f_2 == "Reverse fractal exit" ? rev_dn_fr_buy :       
     exit_f_2 == "MACD exit" ? macd_buy_x : 
     exit_f_2 == "RSI50 exit" ? rsi_f_buy_x : 
     exit_f_2 == "Fractals exit" ? fr_upx_x : 
     exit_f_2 == "SuperTrend exit" ? sup_buy_x : 
     exit_f_2 == "Parabolic SAR exit" ? psar_buy :
     exit_f_2 == "SMA exit" ? sma_buy_x : 
     exit_f_2 == "ADX exit" ? adx_thres_f_x :  
     exit_f_2 == "Cloud exit" ? kumo_buy_x : 
     exit_f_2 == "Kijun exit" ? kijun_buy_x : false
   

//long exit sell filter 2 options
exit_filter_sell_2 = 
     exit_f_2 == "---" ? false :
     exit_f_2 == "TRIX exit" ? trix_sell_x : 
     exit_f_2 == "Reverse fractal exit" ? rev_up_fr_sell :      
     exit_f_2 == "MACD exit" ? macd_sell_x : 
     exit_f_2 == "RSI50 exit" ? rsi_f_sell_x : 
     exit_f_2 == "Fractals exit" ? fr_dnx_x : 
     exit_f_2 == "SuperTrend exit" ? sup_sell_x : 
     exit_f_2 == "Parabolic SAR exit" ? psar_sell :
     exit_f_2 == "SMA exit" ? sma_sell_x : 
     exit_f_2 == "ADX exit" ? adx_thres_f_x :    
     exit_f_2 == "Cloud exit" ? kumo_sell_x : 
     exit_f_2 == "Kijun exit" ? kijun_sell_x : false


//--------------------- strategy entry ---------------------

long        = entry_type != "Short"
short       = entry_type != "Long"

exit_long   = exit_filter_sell_1 or exit_filter_sell_2
exit_short  = exit_filter_buy_1 or exit_filter_buy_2

if backtest_period() 
    if long
        strategy.entry("os_b", strategy.long, when = opt_sig_buy and entry_filter_buy_1 and entry_filter_buy_2 and not exit_long,
             comment= not backtest ? "BybitAPI(BTCUSD) { market(side=buy, amount=100); }" : na)                                                             
        strategy.entry("os_b", strategy.long, when = opt_sig_buy_2 and entry_filter_buy_1 and entry_filter_buy_2 and not exit_long,
             comment= not backtest ? "BybitAPI(BTCUSD) { market(side=buy, amount=100); }" : na)   

        strategy.close("os_b", when = exit_long)


    if short
        strategy.entry("os_s",strategy.short, when = opt_sig_sell and entry_filter_sell_1 and entry_filter_sell_2 and not exit_short, 
             comment= not backtest ? "BybitAPI(BTCUSD) { market(side=sell, amount=100); }" : na)                                                    
        strategy.entry("os_s",strategy.short, when = opt_sig_sell_2 and entry_filter_sell_1 and entry_filter_sell_2 and not exit_short, 
             comment= not backtest ? "BybitAPI(BTCUSD) { market(side=sell, amount=100); }" : na)

        strategy.close("os_s", when = exit_short)

// {{strategy.order.comment}} #bot - altert message




    
```

> Detail

https://www.fmz.com/strategy/439753

> Last Modified

2024-01-23 15:16:47
