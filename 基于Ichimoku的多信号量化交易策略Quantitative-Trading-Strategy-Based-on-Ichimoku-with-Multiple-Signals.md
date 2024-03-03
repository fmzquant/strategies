
> Name

基于Ichimoku的多信号量化交易策略Quantitative-Trading-Strategy-Based-on-Ichimoku-with-Multiple-Signals

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d5d669b93c6f8669d7.png)
[trans]

### 概述

本策略综合运用Ichimoku Kinko Hyo指标以及多种其它技术指标,实现多种交易信号的结合,以发挥Ichimoku系统的优势,同时通过多信号确认进行入场,能有效过滤假信号,在追求高胜率的同时控制风险。

### 策略原理

本策略主要分为以下几个部分:

1. Ichimoku Kinko Hyo指标的计算,包括转向线(Tenkan-sen)、基准线(Kijun-sen)、先行线(Senkou Span A)、滞后线(Senkou Span B)、云叠(Kumo)等的计算公式。

2. 多种过滤器的设定,包括Kumo云叠过滤器、Kijun基准线过滤器、MACD过滤器、RSI过滤器、Bill WilliamsARGUMENTS fractals过滤器、SuperTrend过滤器、Parabolic SAR过滤器和ADX过滤器等。这些过滤器用于确认趋势方向,避免交易受到震荡市的影响。

3. 多种交易信号的设定,包括前期收盘价突破基准线信号、Chikou幅与价格或云叠的关系信号、转向线与基准线或云叠的关系信号等共23种Ichimoku原生交易信号。此外,还加入多种其它技术指标信号,如MACD、RSI、Fractals等。这些交易信号用于寻找潜在的交易机会。

4. 两级过滤器的设定,用于过滤入场信号。分别选择一种过滤器作為第一级和第二级过滤器,可有效避免假信号。

5. 两级过滤器的设定,用于过滤出场信号。类似入场过滤器。

6. 多信号集合作为最终的入场和出场信号。根据用户选择的具体交易信号,同时结合一级和二级入场过滤器以及出场过滤器,形成最终的交易决策。

7. 止盈止损设置。可以选择是否启用以及具体止盈止损点位。

8. 回测周期设置。可以设置回测的起止时间。

### 策略优势

本策略具有以下优势:

1. 综合运用Ichimoku多种指标和多种交易信号的优势,兼顾趋势跟踪和信号过滤。

2. 通过两级过滤器设定避免入场时被套,有效控制风险。

3. 提供多种交易信号可供选择,可以针对不同市场环境进行优化。

4. 提供多种过滤器可供选择,可以针对个股特点进行优化。

5. 可设置止盈止损点位,有助于锁定盈利和控制风险。

6. 可设置不同的回测周期进行验证,方便针对策略进行优化。

### 策略风险

本策略也存在一些风险:

1. Ichimoku系统对买卖信号判定比较慢,可能会错过短线交易机会。可以适当缩短周期优化。

2. 多重过滤可能过于谨慎,导致入场不确定性。可以测试调整过滤参数。

3. 单一止损点位设置不够灵活,无法应对复杂行情。可以考虑动态止损。

4. 回测周期设置不够精确,无法完全模拟实盘环境。需要多次调整验证。

### 策略优化方向 

本策略可以从以下方面进行优化:

1. 调整Ichimoku系统参数,如调短转向线周期适应短线交易。

2. 测试不同的交易信号组合,识别最适合个股的信号选择。

3. 优化过滤器参数,平衡过滤效果与入场确定性。

4. 尝试动态止损方式,使止损更贴近市场变化。

5. 设置更长的回测周期,或使用tick回测数据使模拟更准确。

6. 增加仓位管理模块,通过加仓方式优化资金利用效率。

7. 增加自动参数优化功能,实现更智能的策略调整。

### 总结

本策略通过Ichimoku系统提供的多种指标与交易信号,并配合使用其它技术指标进行信号过滤和确认,实现了一套融合趋势跟踪和突破信号的量化交易策略。策略充分发挥Ichimoku系统的优势,同时设计了参数化的模块用于调整和优化,可以更好地适应市场的变化。通过不断测试与优化,本策略有望达到较高的稳定盈利能力。

||

### Overview

This strategy integrates Ichimoku Kinko Hyo indicators and multiple other technical indicators to combine various trading signals, in order to leverage the advantages of the Ichimoku system while confirming entries with multiple signals to effectively filter out false signals and control risks while pursuing high win rate.

### Strategy Logic

The key components of this strategy are:

1. Calculation of Ichimoku Kinko Hyo indicators including Tenkan-sen, Kijun-sen, Senkou Span A, Senkou Span B, and Kumo. 

2. Multiple filters including Kumo, Kijun, MACD, RSI, Fractals, SuperTrend, Parabolic SAR and ADX to confirm trend direction and avoid whipsaws.

3. Multiple trading signals including price breakouts, Chikou relationships, Tenkan & Kijun relationships totaling 23 Ichimoku signals, plus signals from MACD, RSI, Fractals etc. to identify potential trading opportunities.

4. Two-stage filters for entry signals to avoid being trapped upon entry.

5. Two-stage filters for exit signals similar to entry filters. 

6. Combination of selected trading signals and filter confirmations to make final trading decisions.

7. Configurable take profit and stop loss settings.

8. Backtest period settings.

### Advantages

The advantages of this strategy include:

1. Leveraging Ichimoku’s indicators and signals while combining trend following and signal filtering.

2. Avoiding traps upon entry through two-stage filters and effective risk control.

3. Providing multiple tradable signals adaptable to different market conditions. 

4. Offering multiple selectable filters optimizable for individual stocks.

5. Take profit and stop loss helping lock in profits and control risk.

6. Backtest period facilitating strategy optimization.

### Risks

The risks of this strategy include:

1. Ichimoku signals may be slow and miss short-term opportunities. Shorter periods may help.

2. Excessive filtering may cause uncertain entries. Filter parameters may need adjustment. 

3. Static stop loss may not adapt well to complex price action. Dynamic stop loss may help.

4. Backtest limitations in precisely simulating live markets. Requires multiple iterations of optimization.

### Optimization Directions

Possible ways to optimize the strategy:

1. Adjust Ichimoku parameters like Tenkan period for shorter term trading.

2. Test signal combinations to find best match for individual stocks.

3. Optimize filter parameters to balance filtering effect and entry certainty. 

4. Try dynamic stop loss to better adapt to market changes.

5. Use longer backtest periods or tick data for more accurate simulations.

6. Add position sizing for better capital utilization. 

7. Build in automatic parameter optimization for more intelligent tuning.

### Conclusion

This strategy combines Ichimoku’s indicators and signals with additional filters and confirmations from other technical indicators, realizing a quantitative system fusing trend following and breakout signals. It fully leverages Ichimoku’s strengths while utilizing parameterized modules for adjustments and optimizations to adapt to changing markets. Further testing and optimization will likely lead to strong and steady profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Backtest (no comment-string)|
|v_input_2|0|Long/Short Entry: Both|Long|Short|
|v_input_3|false| Shared Filter and Entry Parameters :|
|v_input_4|2|Fractals Period (Filter/Entry)|
|v_input_5|14|RSI Period (Filter/Entry)|
|v_input_6|2|SuperTrend multiplier (Filter/Entry)|
|v_input_7|5|SuperTrend length (Filter/Entry)|
|v_input_8|10|ADX Period (Filter/Entry)|
|v_input_9|25|ADX threshold (Filter/Entry)|
|v_input_10|0|Signal: Price X Kumo sig|Inside Bar sig|Outside Bar sig|Sandwich Bar sig|Bar sig|SMA50 sig|RSI50 sig|Fractals sig|Parabolic SAR sig|SuperTrend sig|Price X Kijun sig|---|Kumo flip sig|Price filtered Kumo flip sig|Chikou X Price sig|Chikou X Kumo sig|Price X Tenkan sig|Tenkan X Kumo sig|Tenkan X Kijun sig|Kumo filtered Tenkan X Kijun sig|CB/CS sig|IB/IS sig|B1/S1 sig|B2/S2 sig|
|v_input_11|0|Entry filter 1: ---|SMA50 filter|MACD filter|RSI50 filter|Fractals filter|SuperTrend filter|Parabolic SAR filter|Cloud filter|Kijun filter|ADX filter|
|v_input_12|0|Entry filter 2: ---|SMA50 filter|MACD filter|RSI50 filter|Fractals filter|SuperTrend filter|Parabolic SAR filter|Cloud filter|Kijun filter|ADX filter|
|v_input_13|0|Exit filter 1: ---|SMA50 filter|MACD filter|RSI50 filter|Fractals filter|SuperTrend filter|Parabolic SAR filter|Cloud filter|Kijun filter|ADX filter|
|v_input_14|0|Exit filter 2: ---|SMA50 filter|MACD filter|RSI50 filter|Fractals filter|SuperTrend filter|Parabolic SAR filter|Cloud filter|Kijun filter|ADX filter|
|v_input_15|2|CB/CS signal sesitivity|
|v_input_16|false|IB/IS signal sesitivity|
|v_input_17|false|Enable take profit|
|v_input_18|50|Take profit - quantity of position (percent)|
|v_input_19|1000|Take profit - ticks|
|v_input_20|false|Enable stop loss|
|v_input_21|1000|Stop loss - ticks|
|v_input_22|2018|Start year|
|v_input_23|true|Start month|
|v_input_24|true|Start day|
|v_input_25|2021|Stop year|
|v_input_26|12|Stop month|
|v_input_27|31|Stop day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-13 00:00:00
end: 2023-11-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ramsay09
//@version=4
strategy(title="The Strategy - Ichimoku Kinko Hyo and more",shorttitle="Strategy ", overlay=true)


backtest        = input(title= "Backtest (no comment-string)", type= input.bool, defval= false)
entry_type      = input("Both", title= "Long/Short Entry", options= ["Both", "Long", "Short"])

shared_param    = input(false, title= " Shared Filter and Entry Parameters :", type= input.bool)

fr_period       = input(2, title= "Fractals Period (Filter/Entry)", minval= 1)
rsi_period      = input(14, title= "RSI Period (Filter/Entry)", minval= 1)
mult            = input(2, type= input.float, title= "SuperTrend multiplier (Filter/Entry)", minval= 1)
len             = input(5, type= input.integer, title= "SuperTrend length (Filter/Entry)", minval= 1)
start           = 0.02//input(0.02, title= "PSAR Start (Filter/Entry)", minval= 0)
inc             = 0.02//input(0.02, title= "PSAR Increment (Filter/Entry)", minval= 0)
max             = 0.2//input(.2, title= "PSAR Maximum (Filter/Entry)", minval= 0)
adx_period      = input(10, title= "ADX Period (Filter/Entry)", minval= 1)
adx_tres        = input(25, title= "ADX threshold (Filter/Entry)", minval= 1)


X_opt           = input("Price X Kumo sig", title="Signal", options= ["---", "Inside Bar sig", "Outside Bar sig", "Sandwich Bar sig", "Bar sig", "SMA50 sig", "RSI50 sig", 
                         "Fractals sig", "Parabolic SAR sig", "SuperTrend sig", "Price X Kijun sig", "Price X Kumo sig", "Kumo flip sig", 
                         "Price filtered Kumo flip sig",  "Chikou X Price sig", "Chikou X Kumo sig", "Price X Tenkan sig", "Tenkan X Kumo sig", 
                         "Tenkan X Kijun sig", "Kumo filtered Tenkan X Kijun sig", "CB/CS sig", "IB/IS sig", "B1/S1 sig", "B2/S2 sig"])

entry_f_1       = input("---", title="Entry filter 1", options= ["---", "SMA50 filter", "MACD filter", "RSI50 filter", "Fractals filter",
                         "SuperTrend filter", "Parabolic SAR filter", "Cloud filter", "Kijun filter", "ADX filter"])

entry_f_2       = input("---", title="Entry filter 2", options= ["---", "SMA50 filter", "MACD filter", "RSI50 filter", "Fractals filter", 
                         "SuperTrend filter", "Parabolic SAR filter", "Cloud filter", "Kijun filter", "ADX filter"])


exit_f_1        = input("---", title="Exit filter 1", options= ["---", "SMA50 filter", "MACD filter", "RSI50 filter", "Fractals filter",
                         "SuperTrend filter", "Parabolic SAR filter", "Cloud filter", "Kijun filter", "ADX filter"])

exit_f_2        = input("---", title="Exit filter 2", options= ["---", "SMA50 filter", "MACD filter", "RSI50 filter", "Fractals filter", 
                         "SuperTrend filter", "Parabolic SAR filter", "Cloud filter", "Kijun filter", "ADX filter"])



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

//---------------------- Kumo filter ------------------------

kumo_buy    = close > kumo_high
kumo_sell   = close < kumo_low

//--------------------- Kijun filter ----------------------

kijun_buy   = close > KJ
kijun_sell  = close < KJ

//----------------------- macd filter -----------------------

[macdLine_f, signalLine_f, histLine_f]  = macd(close, 12, 26, 9)

macd_buy                                = macdLine_f > signalLine_f
macd_sell                               = macdLine_f < signalLine_f

//---------------------- rsi filter and entry signal------------------------

rsi_f_buy                               = rsi(close, rsi_period) > 50
rsi_f_sell                              = rsi(close, rsi_period) < 50

//---------------- Bill Williams Fractals (filter and entry signal) -----------------

up_fr           = pivothigh(fr_period, fr_period)
dn_fr           = pivotlow(fr_period, fr_period)

fractal_up_v    = valuewhen(up_fr, high[fr_period],0) 
fractal_dn_v    = valuewhen(dn_fr, low[fr_period],0)

fr_upx          = high > fractal_up_v
fr_dnx          = low < fractal_dn_v

//-------------------- SuperTrend filter and entry signal ---------------------

[SuperTrend, Dir]   = supertrend(mult, len)

sup_buy     = close > SuperTrend
sup_sell    = close < SuperTrend

//--------------------- Heikin Ashi -----------------------

//heikin_close = security(heikinashi(syminfo.tickerid), timeframe.period, close)
//heikin_open  = security(heikinashi(syminfo.tickerid), timeframe.period, open)

//h_buy       = heikin_close[1] > heikin_open[1]
//h_sell      = heikin_close[1] < heikin_open[1]

//----------------- Parabolic SAR Signal (pb/ps) and filter -------------------

psar_buy        = high > sar(start, inc, max)[0]
psar_sell       = low < sar(start, inc, max)[0]

//-------------------------- ADX filter ---------------------------

[diplus_f, diminus_f, adx_f]              = dmi(adx_period, adx_period)

//-------------------------- SMA50 filter and entry---------------------------

sma50_buy       = close[2] > sma(close, 50)
sma50_sell      = close[2] < sma(close, 50)


//-------------------------- entry filter -------------------------------

//entry buy filter 1 options
entry_filter_buy_1 = 
     entry_f_1 == "---" ? true :
     entry_f_1 == "MACD filter" ? macd_buy : 
     entry_f_1 == "RSI50 filter" ? rsi_f_buy : 
     entry_f_1 == "Fractals filter" ? fr_upx : 
     entry_f_1 == "SuperTrend filter" ? sup_buy : 
     entry_f_1 == "Parabolic SAR filter" ? psar_buy : 
     entry_f_1 == "Cloud filter" ? kumo_buy : 
     entry_f_1 == "Kijun filter" ? kijun_buy : 
     entry_f_1 == "SMA50 filter" ? sma50_buy : 
     entry_f_1 == "ADX filter" ? adx_f > 25 : true

//entry sell filter 1 options
entry_filter_sell_1 = 
     entry_f_1 == "---" ? true :
     entry_f_1 == "MACD filter" ? macd_sell : 
     entry_f_1 == "RSI50 filter" ? rsi_f_sell : 
     entry_f_1 == "Fractals filter" ? fr_dnx : 
     entry_f_1 == "SuperTrend filter" ? sup_sell : 
     entry_f_1 == "Parabolic SAR filter" ? psar_sell :
     entry_f_1 == "Cloud filter" ? kumo_sell : 
     entry_f_1 == "Kijun filter" ? kijun_sell : 
     entry_f_1 == "SMA50 filter" ? sma50_sell : 
     entry_f_1 == "ADX filter" ? adx_f > 25 : true


//entry buy filter 2 options
entry_filter_buy_2 = 
     entry_f_2 == "---" ? true :
     entry_f_2 == "MACD filter" ? macd_buy : 
     entry_f_2 == "RSI50 filter" ? rsi_f_buy : 
     entry_f_2 == "Fractals filter" ? fr_upx : 
     entry_f_2 == "SuperTrend filter" ? sup_buy : 
     entry_f_2 == "Parabolic SAR filter" ? psar_buy :
     entry_f_2 == "Cloud filter" ? kumo_buy : 
     entry_f_2 == "Kijun filter" ? kijun_buy : 
     entry_f_2 == "SMA50 filter" ? sma50_buy : 
     entry_f_2 == "ADX filter" ? adx_f > 25 : true

//entry sell filter 2 options
entry_filter_sell_2 = 
     entry_f_2 == "---" ? true :
     entry_f_2 == "MACD filter" ? macd_sell : 
     entry_f_2 == "RSI50 filter" ? rsi_f_sell : 
     entry_f_2 == "Fractals filter" ? fr_dnx : 
     entry_f_2 == "SuperTrend filter" ? sup_sell : 
     entry_f_2 == "Parabolic SAR filter" ? psar_sell :
     entry_f_2 == "Cloud filter" ? kumo_sell : 
     entry_f_2 == "Kijun filter" ? kijun_sell : 
     entry_f_2 == "SMA50 filter" ? sma50_sell : 
     entry_f_2 == "ADX filter" ? adx_f > 25 : true


//------------------------- exit filter -----------------------

//exit buy filter 1 options
exit_filter_buy_1 = 
     exit_f_1 == "---" ? false :
     exit_f_1 == "MACD filter" ? macd_buy : 
     exit_f_1 == "RSI50 filter" ? rsi_f_buy : 
     exit_f_1 == "Fractals filter" ? fr_upx : 
     exit_f_1 == "SuperTrend filter" ? sup_buy : 
     exit_f_1 == "Parabolic SAR filter" ? psar_buy :
     exit_f_1 == "Cloud filter" ? kumo_buy : 
     exit_f_1 == "Kijun filter" ? kijun_buy : 
     exit_f_1 == "SMA50 filter" ? sma50_buy : 
     exit_f_1 == "ADX filter" ? adx_f > 25 : false

//exit sell filter 1 options
exit_filter_sell_1 = 
     exit_f_1 == "---" ? false :
     exit_f_1 == "MACD filter" ? macd_sell : 
     exit_f_1 == "RSI50 filter" ? rsi_f_sell : 
     exit_f_1 == "Fractals filter" ? fr_dnx : 
     exit_f_1 == "SuperTrend filter" ? sup_sell : 
     exit_f_1 == "Parabolic SAR filter" ? psar_sell :
     exit_f_1 == "Cloud filter" ? kumo_sell : 
     exit_f_1 == "Kijun filter" ? kijun_sell : 
     exit_f_1 == "SMA50 filter" ? sma50_sell : 
     exit_f_1 == "ADX filter" ? adx_f > 25 : false


//exit buy filter 2 options
exit_filter_buy_2 = 
     exit_f_2 == "---" ? false :
     exit_f_2 == "MACD filter" ? macd_buy : 
     exit_f_2 == "RSI50 filter" ? rsi_f_buy : 
     exit_f_2 == "Fractals filter" ? fr_upx : 
     exit_f_2 == "SuperTrend filter" ? sup_buy : 
     exit_f_2 == "Parabolic SAR filter" ? psar_buy :
     exit_f_2 == "Cloud filter" ? kumo_buy : 
     exit_f_2 == "Kijun filter" ? kijun_buy : 
     exit_f_2 == "SMA50 filter" ? sma50_buy : 
     exit_f_2 == "ADX filter" ? adx_f > 25 : false

//exit sell filter 2 options
exit_filter_sell_2 = 
     exit_f_2 == "---" ? false :
     exit_f_2 == "MACD filter" ? macd_sell : 
     exit_f_2 == "RSI50 filter" ? rsi_f_sell : 
     exit_f_2 == "Fractals filter" ? fr_dnx : 
     exit_f_2 == "SuperTrend filter" ? sup_sell : 
     exit_f_2 == "Parabolic SAR filter" ? psar_sell :
     exit_f_2 == "Cloud filter" ? kumo_sell : 
     exit_f_2 == "Kijun filter" ? kijun_sell : 
     exit_f_2 == "SMA50 filter" ? sma50_sell : 
     exit_f_2 == "ADX filter" ? adx_f > 25 : false



//----------------------- i-o-s signals ------------------------

i_bar_buy       = high[1] < high[2] and low[1] > low[2] and close > high[1]
i_bar_sell      = high[1] < high[2] and low[1] > low[2] and close < low[1]

o_bar_buy       = high[1] > high[2] and low[1] < low[2] and high > high[1]
o_bar_sell      = high[1] > high[2] and low[1] < low[2] and low < low[1]

s_bar_buy       = high[2] < high[3] and low[2] > low[3] and high[1] > high[2] and low[1] < low[2] and high > high[1]
s_bar_sell      = high[2] < high[3] and low[2] > low[3] and high[1] > high[2] and low[1] < low[2] and low < low[1]


//----------------- Ichimoku Signal B1/S1 -----------------

buy_strong_B1   = (TK >= KJ) and close > kumo_high and CS > high[(26-1)] and CS > kumo_high[26-1] and SA > SB
sell_strong_S1  = (TK <= KJ) and close < kumo_low and CS < low[(26-1)] and CS < kumo_low[26-1] and SA < SB

var buy_sig     = true
var sell_sig    = true

B1_a  = buy_strong_B1 and buy_sig
S1_a  = sell_strong_S1 and sell_sig

if  sell_strong_S1 
    buy_sig    := true, sell_sig := false
if buy_strong_B1 
    sell_sig   := true, buy_sig := false
    
    
    
//----------------- Ichimoku Signal B2/S2 -----------------

buy_strong_B2    = (TK >= KJ) and close > kumo_high and CS > high[26-1]
sell_strong_S2   = (TK <= KJ) and close < kumo_low  and CS < low[26-1]

var buy_sig_B2   = true
var sell_sig_S2  = true

B2_a  = buy_strong_B2 and buy_sig_B2
S2_a  = sell_strong_S2 and sell_sig_S2

if  sell_strong_S2 
    buy_sig_B2    := true, sell_sig_S2 := false
if buy_strong_B2 
    sell_sig_S2   := true, buy_sig_B2 := false    



//---------------------------- Confluence Signal ----------------------------

long_short_trig     = 7 //input(7, type= input.float, title= "Confluence signal trigger Level", step= 0.1)
trig_gap_cbcs   = input(2, type= input.float, title= "CB/CS signal sesitivity", minval= 0, maxval= 6, step= 1)

//Indicators
// ma
sma1            = sma(close, 50)
sma2            = sma(close, 200)
ema1            = ema(close, 50)
ema2            = ema(close, 200)
[macdLine, signalLine, histLine]    = macd(close, 12, 26, 9)
rsi                                 = rsi(close, 14)
[diplus, diminus, adx]              = dmi(7, 7)
[superTrend, dir]                   = supertrend(2, 5)
//Klinger Oszillator
sv  = change(hlc3) >= 0 ? volume : -volume
kvo = ema(sv, 34) - ema(sv, 55)
sig = ema(kvo, 13)
//Vortex Indicator
VMP = sum( abs( high - low[1]), 14 )
VMM = sum( abs( low - high[1]), 14 )
STR = sum( atr(1), 14 )
VIP = VMP / STR
VIM = VMM / STR


//Signals
var float sma_sig_w     = na
var float ema_sig_w     = na
var float p_kj_sig_w    = na
var float tk_kj_sig_w   = na
var float B1_S1_sig_w   = na
var float B2_S2_sig_w   = na
var float psar_sig_w    = na
var float frac_sig_w    = na
var float macd_sig_w    = na
var float rsi_sig_w     = na
var float p_tk_sig_w    = na
var float dmi_sig_w     = na
var float klin_sig_w    = na
var float vort_sig_w    = na
var float sup_sig_w     = na


if sma1 > sma2 
    sma_sig_w := 1
else if sma1 < sma2
    sma_sig_w := 0

if ema1 > ema2 
    ema_sig_w := 1
else if ema1 < ema2
    ema_sig_w := 0

if close > KJ 
    p_kj_sig_w := 1
else if close < KJ
    p_kj_sig_w := 0

if TK > KJ 
    tk_kj_sig_w := 1
else if TK < KJ
    tk_kj_sig_w := 0

if buy_strong_B1 
    B1_S1_sig_w := 1
else if sell_strong_S1
    B1_S1_sig_w := 0

if buy_strong_B2 
    B2_S2_sig_w := 1
else if sell_strong_S2
    B2_S2_sig_w := 0

if high >= sar(start, inc, max)[0] 
    psar_sig_w := 1
else if low <= sar(start, inc, max)[0]
    psar_sig_w := 0

if high > fractal_up_v 
    frac_sig_w := 1
else if low < fractal_dn_v
    frac_sig_w := 0

if macdLine > signalLine
    macd_sig_w := 1
else if macdLine < signalLine
    macd_sig_w := 0

if rsi > 50 
    rsi_sig_w := 1
else if rsi < 50 
    rsi_sig_w := 0
    
if close[2] > TK 
    p_tk_sig_w := 1
else if close[2] < TK
    p_tk_sig_w := 0

if diplus > diminus 
    dmi_sig_w := 1
else if diplus < diminus
    dmi_sig_w := 0

if sig > 0 
    klin_sig_w := 1
else if sig < 0
    klin_sig_w := 0

if VIP > VIM 
    vort_sig_w := 1
else if VIP < VIM
    vort_sig_w := 0
    
if close > superTrend 
    sup_sig_w := 1
else if close < superTrend
    sup_sig_w := 0
    

bs_conf_sig     = sma_sig_w + ema_sig_w + p_kj_sig_w + tk_kj_sig_w + B1_S1_sig_w + B2_S2_sig_w + psar_sig_w + frac_sig_w + macd_sig_w + 
     rsi_sig_w + dmi_sig_w + klin_sig_w + vort_sig_w + sup_sig_w + p_tk_sig_w

long_c          = bs_conf_sig > long_short_trig + trig_gap_cbcs //with +- signal is less fluctuating
short_c         = bs_conf_sig < long_short_trig - trig_gap_cbcs



//---------------------------- Pure Ichimoku Confluence Signal ----------------------------

pic_l_s_trig        = 4 //input(4, type= input.float, title= "Ichimoku confluence signal trigger Level", step= 0.1)
trig_gap_ibis       = input(0, type= input.float, title= "IB/IS signal sesitivity", minval= 0, maxval= 3, step= 1)


//Signals
var float tkkh_sig_w    = na
var float csh_sig_w     = na
var float cskh_sig_w    = na
var float pkj_sig_w     = na
var float ptk_sig_w     = na
var float tkkj_sig_w    = na
var float sasb_sig_w    = na
var float ckh_sig_w     = na


if TK > kumo_high 
    tkkh_sig_w := 1
else if TK < kumo_low
    tkkh_sig_w := 0

if CS > high[(26-1)] 
    csh_sig_w := 1
else if CS < low[(26-1)]
    csh_sig_w := 0
    
if CS > kumo_high[26-1] 
    cskh_sig_w := 1
else if CS < kumo_low[26-1]
    cskh_sig_w := 0    

if close > TK 
    ptk_sig_w := 1
else if close < TK
    ptk_sig_w := 0

if close > KJ 
    pkj_sig_w := 1
else if close < KJ
    pkj_sig_w := 0

if TK > KJ 
    tkkj_sig_w := 1
else if TK < KJ
    tkkj_sig_w := 0

if SA > SB 
    sasb_sig_w := 1
else if SA < SB
    sasb_sig_w := 0

if close > kumo_high 
    ckh_sig_w := 1
else if close < kumo_low
    ckh_sig_w := 0
    

bs_pic_sig          = tkkh_sig_w + csh_sig_w + cskh_sig_w + ptk_sig_w + pkj_sig_w + tkkj_sig_w + sasb_sig_w + ckh_sig_w

long_pic            = bs_pic_sig > pic_l_s_trig + trig_gap_ibis
short_pic           = bs_pic_sig < pic_l_s_trig - trig_gap_ibis



//--------------------------- Entry Signal Options ---------------------------

var buy_sig_opt   = true
var sell_sig_opt  = true

// cross conditions for "Strong" bg's
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

// buy signal options
opt_sig_buy = 
     X_opt == "---" ? na :
     X_opt == "Inside Bar sig" ? i_bar_buy : 
     X_opt == "Outside Bar sig" ? o_bar_buy : 
     X_opt == "Sandwich Bar sig" ? s_bar_buy : 
     X_opt == "Bar sig" ? close > high[1] : 
     X_opt == "SMA50 sig" ? close[2] > sma(close, 50) : 
     X_opt == "Fractals sig" ? fr_upx : 
     X_opt == "RSI50 sig" ? rsi_f_buy : 
     X_opt == "Parabolic SAR sig" ? psar_buy : 
     X_opt == "SuperTrend sig" ? sup_buy : 
     X_opt == "Price X Kijun sig" ? close > KJ : 
     X_opt == "Price X Kumo sig" ? close > kumo_high : 
     X_opt == "Kumo flip sig" ? SA > SB :  
     X_opt == "Price filtered Kumo flip sig" ? sasb_x and low > kumo_high : 
     X_opt == "Chikou X price sig" ? CS > high[(26-1)] : 
     X_opt == "Chikou X Kumo sig" ? CS > kumo_high[26-1] :  
     X_opt == "Price X Tenkan sig" ? close > TK : 
     X_opt == "Tenkan X Kumo sig" ? TK > kumo_high :  
     X_opt == "Tenkan X Kijun sig" ? TK > KJ : 
     X_opt == "Kumo filtered Tenkan X Kijun sig" ? tkkj_x and TK > kumo_high and KJ > kumo_high and TK > KJ : 
     X_opt == "CB/CS sig" ? long_c : 
     X_opt == "IB/IS sig" ? long_pic : 
     X_opt == "B1/S1 sig" ? buy_strong_B1 :  
     X_opt == "B2/S2 sig" ? buy_strong_B2 : na

// sell signal options
opt_sig_sell = 
     X_opt == "---" ? na : 
     X_opt == "Inside Bar sig" ? i_bar_sell : 
     X_opt == "Outside Bar sig" ? o_bar_sell : 
     X_opt == "Sandwich Bar sig" ? s_bar_sell : 
     X_opt == "Bar sig" ? close < low[1] : 
     X_opt == "SMA50 sig" ? close[2] < sma(close, 50) : 
     X_opt == "Fractals sig" ? fr_dnx : 
     X_opt == "RSI50 sig" ? rsi_f_sell : 
     X_opt == "Parabolic SAR sig" ? psar_sell : 
     X_opt == "SuperTrend sig" ? sup_sell : 
     X_opt == "Price X Kijun sig" ? close < KJ : 
     X_opt == "Price X Kumo sig" ? close < kumo_low : 
     X_opt == "Kumo flip sig" ? SA < SB : 
     X_opt == "Price filtered Kumo flip sig" ? not sasb_x and high < kumo_low :
     X_opt == "Chikou X price sig" ? CS < low[(26-1)] : 
     X_opt == "Chikou X Kumo sig" ? CS < kumo_high[26-1] : 
     X_opt == "Price X Tenkan sig" ? close < TK :
     X_opt == "Tenkan X Kumo sig" ? TK < kumo_low :
     X_opt == "Tenkan X Kijun sig" ? TK < KJ :
     X_opt == "Kumo filtered Tenkan X Kijun sig" ? not tkkj_x and TK < kumo_low and KJ < kumo_low and TK < KJ : 
     X_opt == "CB/CS sig" ? short_c : 
     X_opt == "IB/IS sig" ? short_pic : 
     X_opt == "B1/S1 sig" ? sell_strong_S1 : 
     X_opt == "B2/S2 sig" ? sell_strong_S2 : na

if  opt_sig_sell 
    buy_sig    := true, sell_sig_opt := false
if opt_sig_buy 
    sell_sig   := true, buy_sig_opt := false



//---------------------------- Take profit and stop loss ------------------------------

tp_en       = input(title= "Enable take profit", type= input.bool, defval= false)

qty_tp      = input(50, title= "Take profit - quantity of position (percent)", type= input.float, minval= 1, maxval= 100, step= 5)

tp_ticks    = input(1000, title= "Take profit - ticks", type= input.integer, minval= 0, step= 10)


sl_en       = input(title= "Enable stop loss", type= input.bool, defval= false)

sl_ticks    = input(1000, title= "Stop loss - ticks", type= input.integer, minval= 0, step= 10)


//----------------------- Backtest periode --------------------------------

start_year       = input(2018, "Start year")
start_month      = input(1, "Start month", minval= 1, maxval= 12)
start_day        = input(1, "Start day", minval= 1, maxval= 31)
period_start     = timestamp(start_year, start_month, start_day, 0, 0)

stop_year        = input(2021, "Stop year")
stop_month       = input(12, "Stop month", minval= 1, maxval= 12)
stop_day         = input(31, "Stop day", minval= 1, maxval= 31)
period_stop      = timestamp(stop_year, stop_month, stop_day, 0, 0)

backtest_period() => time >= period_start and time <= period_stop ? true : false



//--------------------- strategy entry ---------------------

long        = entry_type != "Short"
short       = entry_type != "Long"
not_both    = entry_type != "Both"

if not backtest 
    if long
        strategy.entry("os_buy", strategy.long, when = opt_sig_buy and entry_filter_buy_1 and entry_filter_buy_2, 
             comment= "")    


             
        strategy.close("os_buy", when = exit_filter_sell_1 or exit_filter_sell_2 or not_both ? opt_sig_sell : na
             , comment= "")
             
        strategy.exit("tpl", "os_buy", qty_percent= tp_en ? qty_tp : na, profit= tp_en ? tp_ticks : na, loss= sl_en ? sl_ticks : na)
    
    if short
        strategy.entry("os_sell",strategy.short, when = opt_sig_sell and entry_filter_sell_1 and entry_filter_sell_2, 
             comment= "")      


             
        strategy.close("os_sell", when = exit_filter_buy_1 or exit_filter_buy_2 or not_both ? opt_sig_buy : na
             , comment= "")
             
        strategy.exit("tps", "os_sell", qty_percent= tp_en ? qty_tp : na, profit= tp_en ? tp_ticks : na, loss= sl_en ? sl_ticks : na)


if backtest_period() and backtest 
    if long
        strategy.entry("os_buy", strategy.long, when = opt_sig_buy and entry_filter_buy_1 and entry_filter_buy_2)
        strategy.close("os_buy", when = exit_filter_sell_1 or exit_filter_sell_2 or not_both ? opt_sig_sell : na)
        strategy.exit("tpl", "os_buy", qty_percent= tp_en ? qty_tp : na, profit= tp_en ? tp_ticks : na, loss= sl_en ? sl_ticks : na)
    
    if short
        strategy.entry("os_sell",strategy.short, when = opt_sig_sell and entry_filter_sell_1 and entry_filter_sell_2)
        strategy.close("os_sell", when = exit_filter_buy_1 or exit_filter_buy_2 or not_both ? opt_sig_buy : na)
        strategy.exit("tps", "os_sell", qty_percent= tp_en ? qty_tp : na, profit= tp_en ? tp_ticks : na, loss= sl_en ? sl_ticks : na)



    
```

> Detail

https://www.fmz.com/strategy/431892

> Last Modified

2023-11-13 10:24:35
