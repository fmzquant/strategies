
> Name

基于多重指标的量化交易策略Multi-Indicator-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10cdf4494377cce4e05.png)
[trans]

## 概述

该策略通过集成移动平均线、相对强弱指标(RSI)和移动平均聚散指标(MACD)三种主要技术指标,实现多空仓位的自动开平。策略名称中含有“多重指标”,主要是为了突出该策略所采用的多种指标。

## 策略原理

该策略主要通过比较两条移动平均线的大小关系来判断趋势方向,并结合RSI指标避免错过反转机会。具体来说,策略使用EMA或SMA计算快线和慢线,快线上穿慢线为买入信号,快线下穿慢线为卖出信号。为过滤假突破,策略还设置RSI指标的多空逻辑,只有当RSI指标也满足条件时,才会发出交易信号。

除此之外,策略还集成了MACD指标来进行交易决策。当MACD指标的差离值上穿0轴时为买入信号,差离值下穿0轴时为卖出信号。这样可以利用MACD指标判断趋势是否发生转折,避免在趋势转折点产生错误的信号。

## 优势分析

该策略最大的优势在于集成多种指标过滤信号,可以有效降低假信号的产生,提高信号质量。具体来说,优势有以下几点:

1. 快慢线结合RSI指标,可以避免单一使用移动平均线产生的假突破。

2. MACD指标的集成,可以提早判断趋势是否反转,避免在转折点产生错误信号。

3. 允许选择EMA或SMA指标,可以根据不同市场特点选择更合适的指标参数。

4. 允许选择资金管理方案,可以控制单笔订单规模,有效控制风险。

5. 支持止损止盈,可以锁定盈利,避免亏损扩大。

## 风险分析

该策略主要面临以下风险:

1. 参数优化不当可能导致策略效果不佳。需要花时间测试不同的参数组合。

2. 指标发出错误信号的概率仍然存在。当三种指标同时发出错误信号时,将导致较大亏损。

3. 单一品种效果并不稳定,需要扩展到其他品种。

4.  Datenicht zureichen, Strategie effekt wird in der Zukunft abnehmen。

## 优化方向

该策略主要可以从以下几个方面进行优化:

1. 测试不同的指标参数组合,寻找最优参数。

2. 增加止损机制中的移动止损。当价格运行一定距离后,可以 trail stop 来锁定利润。

3. 增加对大级别趋势的判断指标,避免逆势交易。例如集成 ADX 指标。

4. Fügen Sie Moneymanagement Module hinzu für besseres Risikomanagement.  

5. Fügen Sie Filter für fundamentale Faktoren wie Nachrichten hinzu.

## 总结

该策略通过集成多种技术指标如移动平均线、RSI 和 MACD,实现多空头寻找和过滤。其优势在于可以有效过滤假信号,提高信号质量。主要缺陷是参数选择和指标发出错误信号的概率仍然存在。未来的优化方向包括参数优化、止损优化、趋势过滤等。总体来说,该策略作为多重指标策略框架是行之有效的,后续需要继续优化和验证。

|| 

## Overview 

This strategy integrates moving averages, relative strength index (RSI) and moving average convergence divergence (MACD), three major technical indicators, to automatically open and close long and short positions. The strategy name contains "Multi Indicator" to highlight the multiple indicators used in this strategy.  

## Strategy Logic

The strategy mainly judges the trend direction by comparing two moving averages, and combines the RSI indicator to avoid missing reversal opportunities. Specifically, the strategy uses EMA or SMA to calculate the fast line and slow line. The fast line crossing above the slow line is the buy signal, and the fast line crossing below is the sell signal. To filter false breakthroughs, the strategy also sets the logic of the RSI indicator, only when the RSI indicator also meets the condition, the trading signal will be triggered.

In addition, the MACD indicator is also integrated into the strategy for trading decisions. When the difference between MACD indicator crosses above the 0 axis, it is a buy signal, and when it crosses below, it is a sell signal. This can help judge whether the trend has reversed to avoid wrong signals at inflection points.


## Advantage Analysis

The biggest advantage of this strategy is to integrate multiple indicators to filter signals, which can effectively reduce false signals and improve signal quality. Specifically, the advantages are as follows:

1. The fast and slow lines combined with the RSI indicator can avoid false breakthroughs caused by the single use of moving averages.

2. The integration of the MACD indicator can judge whether the trend has reversed prematurely to avoid wrong signals at the turning point.

3. Choosing between EMA and SMA allows selecting indicators that are more suitable for different market characteristics.

4. Choosing money management schemes allows controlling the size of single orders to effectively control risks.

5. Supporting stop loss and take profit allows locking in profits and avoiding losses enlarging.


## Risk Analysis  

The main risks of this strategy include:

1. Improper parameter optimization may lead to poor strategy performance. Need to spend time testing different parameter combinations.

2. The probability of the indicator issuing wrong signals still exists. When the three indicators issue wrong signals at the same time, it will lead to greater losses.

3. The performance of a single symbol is unstable, it is necessary to expand to other varieties.  

4. Datenicht zureichen, Strategie effekt wird in der Zukunft abnehmen.


## Optimization Directions   

The main aspects for optimizing this strategy include:

1. Test different combinations of indicator parameters to find the optimal parameters.

2. Increase trailing stop in the stop loss mechanism. After the price runs a certain distance, it can trail stop to lock in profits.

3. Increase judgment indicators for major trend to avoid trading against the trend. For example, integrate the ADX indicator.  

4. Fügen Sie Moneymanagement Module hinzu für besseres Risikomanagement.

5. Fügen Sie Filter für fundamentale Faktoren wie Nachrichten hinzu.


## Summary  

This strategy realizes finding and filtering long and short positions by integrating multiple technical indicators such as moving averages, RSI and MACD. Its advantage is that it can effectively filter out false signals and improve signal quality. The main drawbacks are the parameter selection and the probability of indicators issuing wrong signals still exist. Future optimization directions include parameter optimization, stop loss optimization, trend filtering, etc. Overall, this strategy is effective as a multi-indicator strategy framework, and needs further optimization and verification going forward.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Source: close,op|op|hi|lo|_$10,c3|c3|hl|
|v_input_2|false|>=< >=< [STRATEGIES] >=< >=<|
|v_input_3|0|Type Strategy: _L_|_$17,_L_|_S_|
|v_input_4|false|>=< >=< [BUY/LONG] >=< >=<|
|v_input_5|0|Pick your poison:: (E)MA 1 > (E)MA 2|Close above (E)MA 1|RSI strategy|_$26,mcl|_$28,mcl0|_$30,sgl0|
|v_input_6|false| if RSI >|
|v_input_7|100| if RSI <|
|v_input_8|false| if RSI (HTF) >|
|v_input_9|100| if RSI (HTF) <|
|v_input_10|0| Extra argument: NONE|_$26,mcl|_$28,mcl0|_$30,sgl0|
|v_input_11|0| Second argument: NONE|_$32,mcl_HTF|_$34,mcl0HTF|_$36,sgl0HTF|(E)MA 1 (HTF) > (E)MA 2 (HTF)|Close above (E)MA 1 (HTF)|
|v_input_12|false|>=< [(E)MA settings (Buy/Long)] >=<|
|v_input_13|0|  (E)MA 1: SMA|_$38,SMA|
|v_input_14|50|     Length|
|v_input_15|0|  (E)MA 2: SMA|_$38,SMA|
|v_input_16|100|     Length|
|v_input_17|0|  (E)MA 1 - HTF: SMA|_$38,SMA|
|v_input_18|50|     Length|
|v_input_19|0|  (E)MA 2 - HTF: SMA|_$38,SMA|
|v_input_20|100|     Length|
|v_input_21|false|>=< >=< [SELL/SHORT] >=< >=<|
|v_input_22|0|Pick your poison:: (E)MA 3 < (E)MA 4|Close under (E)MA 3|RSI strategy|mcl|mcl0|sgl0|
|v_input_23|false| if RSI >|
|v_input_24|100| if RSI <|
|v_input_25|false| if RSI (HTF) >|
|v_input_26|100| if RSI (HTF) <|
|v_input_27|0| Extra argument: NONE|mcl|mcl0|sgl0|
|v_input_28|0| Second argument: NONE|mcl_HTF|mcl0HTF|sgl0HTF|(E)MA 3 (HTF) < (E)MA 4 (HTF)|Close under (E)MA 3 (HTF)|
|v_input_29|false|>=< [(E)MA settings (Sell/Short)] >=<|
|v_input_30|0|  (E)MA 3: SMA|_$38,SMA|
|v_input_31|50|     Length|
|v_input_32|0|  (E)MA 4: SMA|_$38,SMA|
|v_input_33|100|     Length|
|v_input_34|0|  (E)MA 3 - HTF: SMA|_$38,SMA|
|v_input_35|50|     Length|
|v_input_36|0|  (E)MA 4 - HTF: SMA|_$38,SMA|
|v_input_37|100|     Length|
|v_input_38|false|>=< >=< [RSI]  >=< >=< >=<|
|v_input_39|20|  RSI Length|
|v_input_40|false|>=< >=< [MACD] >=< >=< >=<|
|v_input_41|12|  Fast Length|
|v_input_42|26|  Slow Length|
|v_input_43|9|  Signal Smoothing|
|v_input_44|false|Simple MA(Oscillator)|
|v_input_45|false|Simple MA(Signal Line)|
|v_input_46|false|>=< >=< [HTF settings] >=< >=<|
|v_input_47|D|  (E)MA HTF|
|v_input_48|D|  RSI HTF|
|v_input_49|D|  MACD HTF|
|v_input_50|false|>=< >=< [SL/TP] >=< >=< >=<|
|v_input_51|false|Stop Loss?|
|v_input_52|10|  Stop Loss %|
|v_input_53|false|Take Profit?|
|v_input_54|20|  Take Profit %|
|v_input_55|false|>=< >=< [TIME] >=< >=< >=<|
|v_input_56|2010|  Since Year|
|v_input_57|2099|  Till Year|
|v_input_58|true|  Since Month|
|v_input_59|12|  Till Month|
|v_input_60|true|  Since Day|
|v_input_61|31|  Till Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-04 00:00:00
end: 2023-12-04 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © fikira
//@version=4
strategy("Strategy Tester EMA-SMA-RSI-MACD", shorttitle="Strat-test", overlay=true, max_bars_back=5000, 
 default_qty_type= strategy.percent_of_equity, calc_on_order_fills=false, calc_on_every_tick=false, 
 pyramiding=0, default_qty_value=100, initial_capital=100)

Tiny     = "Tiny"
Small    = "Small"
Normal   = "Normal"
Large    = "Large"

cl      = "close" , op  = "open" , hi  = "high" , lo  = "low"
c4      = "ohlc4" , c3  = "hlc3" , hl  = "hl2"

co      = "(E)MA 1 > (E)MA 2" 
cu      = "(E)MA 3 < (E)MA 4"

co_HTF  = "(E)MA 1 (HTF) > (E)MA 2 (HTF)" 
cu_HTF  = "(E)MA 3 (HTF) < (E)MA 4 (HTF)"

L_S     = "Long & Short"                , _L_  = "Long Only"                , _S_ = "Short Only"

cla     = "Close above (E)MA 1"         
clu     = "Close under (E)MA 3"

cla_HTF = "Close above (E)MA 1 (HTF)"
clu_HTF = "Close under (E)MA 3 (HTF)"

rsi     = "RSI strategy"

none    = "NONE"
mch     = "macd > signal"               , mcl     = "macd < signal"
mch0    = "macd > 0"                    , mcl0    = "macd < 0"
sgh0    = "signal > 0"                  , sgl0    = "signal < 0"

mch_HTF = "macd (HTF) > signal (HTF)"   , mcl_HTF = "macd (HTF) < signal (HTF)"
mch0HTF = "macd (HTF) > 0"              , mcl0HTF = "macd (HTF) < 0"
sgh0HTF = "signal (HTF) > 0"            , sgl0HTF = "signal (HTF) < 0"

EMA     = "EMA"                         , SMA = "SMA"       

s       = input(cl,   "Source" , options=[cl, op, hi, lo, c4, c3, hl])

src     =
 s  == cl ? close :
 s  == op ? open  :
 s  == hi ? high  :
 s  == lo ? low   :
 s  == c4 ? ohlc4 :
 s  == c3 ? hlc3  : 
 s  == hl ? hl2   :
 close

__1_    = input(false, ">=< >=< [STRATEGIES] >=< >=<")

Type    = input(_L_,  "Type Strategy", options=[L_S, _L_, _S_])

_1a_    = input(false, ">=< >=< [BUY/LONG] >=< >=<")

ENT     = input(co,   "Pick your poison:", options=[co, cla, rsi, mch, mch0, sgh0])
EH      = input(0,    " if RSI >")
EL      = input(100,  " if RSI <")
EH_HTF  = input(0,    " if RSI (HTF) >")
EL_HTF  = input(100,  " if RSI (HTF) <")

EX      = input(none, " Extra argument", options=[none, mch, mch0, sgh0])
EX2     = input(none, " Second argument", options=[none, mch_HTF, mch0HTF, sgh0HTF, co_HTF, cla_HTF])

_1b_    = input(false, ">=< [(E)MA settings (Buy/Long)] >=<")

ma1     = input(SMA,  "  (E)MA 1", options=[EMA, SMA])
len1    = input(50,   "     Length"  )
ma2     = input(SMA,  "  (E)MA 2", options=[EMA, SMA])
len2    = input(100,  "     Length"  )
ma1HTF  = input(SMA,  "  (E)MA 1 - HTF", options=[EMA, SMA])
len1HTF = input(50,   "     Length"  )
ma2HTF  = input(SMA,  "  (E)MA 2 - HTF", options=[EMA, SMA])
len2HTF = input(100,  "     Length"  )

_2a_    = input(false, ">=< >=< [SELL/SHORT] >=< >=<")

CLO     = input(cu,   "Pick your poison:", options=[cu, clu, rsi, mcl, mcl0, sgl0])
CH      = input(0,    " if RSI >")
CL      = input(100,  " if RSI <")
CH_HTF  = input(0,    " if RSI (HTF) >")
CL_HTF  = input(100,  " if RSI (HTF) <")

CX      = input(none, " Extra argument", options=[none, mcl, mcl0, sgl0])
CX2     = input(none, " Second argument", options=[none, mcl_HTF, mcl0HTF, sgl0HTF, cu_HTF, clu_HTF])

_2b_    = input(false, ">=< [(E)MA settings (Sell/Short)] >=<")

ma3     = input(SMA,  "  (E)MA 3", options=[EMA, SMA])
len3    = input(50,   "     Length"  )
ma4     = input(SMA,  "  (E)MA 4", options=[EMA, SMA])
len4    = input(100,  "     Length"  )
ma3HTF  = input(SMA,  "  (E)MA 3 - HTF", options=[EMA, SMA])
len3HTF = input(50,   "     Length"  )
ma4HTF  = input(SMA,  "  (E)MA 4 - HTF", options=[EMA, SMA])
len4HTF = input(100,  "     Length"  )

__3_    = input(false, ">=< >=< [RSI]  >=< >=< >=<")

ler     = input(20 , "  RSI Length")

__4_    = input(false, ">=< >=< [MACD] >=< >=< >=<")

fst     = input(12, "  Fast Length")
slw     = input(26, "  Slow Length")
sgn     = input(9 , "  Signal Smoothing")
sma_source = input(false, "Simple MA(Oscillator)")
sma_signal = input(false, "Simple MA(Signal Line)")

__5_    = input(false, ">=< >=< [HTF settings] >=< >=<")

MA_HTF  = input("D", "  (E)MA HTF", type = input.resolution)
RSI_HTF = input("D", "  RSI HTF"  , type = input.resolution)
MACD_HTF= input("D", "  MACD HTF" , type = input.resolution)

__6_    = input(false, ">=< >=< [SL/TP] >=< >=< >=<")

sl      = input(false, "Stop Loss?")
SL      = input(10.0, title="  Stop Loss %"  ) / 100
tp      = input(false, "Take Profit?")
TP      = input(20.0, title="  Take Profit %") / 100
 
SL_     = strategy.position_avg_price * (1 - SL)
TP_     = strategy.position_avg_price * (1 + TP)

// Limitation in time
// (= inspired from a script of "Che_Trader")

xox     = input(false, ">=< >=< [TIME] >=< >=< >=<")

ystr1   = input(2010, "  Since Year" )
ystp1   = input(2099, "  Till Year"  )
mstr1   = input(1   , "  Since Month")
mstp1   = input(12  , "  Till Month" )
dstr1   = input(1   , "  Since Day"  )
dstp1   = input(31  , "  Till Day"   )
 
_Str1   = timestamp(ystr1, mstr1, dstr1,  1,  1)
Stp1_   = timestamp(ystp1, mstp1, dstp1, 23, 59)

TIME    = time >= _Str1 and time <= Stp1_ ? true : false

////////////////////////////////////////////////////////////////////////////////////////////

_1      = 
 ma1 == SMA ? sma(src, len1) : 
 ma1 == EMA ? ema(src, len1) : 
 na
_2      = 
 ma2 == SMA ? sma(src, len2) :
 ma2 == EMA ? ema(src, len2) :
 na
_3      = 
 ma3 == SMA ? sma(src, len3) :
 ma3 == EMA ? ema(src, len3) :
 na
_4      = 
 ma4 == SMA ? sma(src, len4) :
 ma4 == EMA ? ema(src, len4) :
 na

_1b  = 
 ma1HTF == SMA ? sma(src, len1HTF) :
 ma1HTF == EMA ? ema(src, len1HTF) :
 na
_2b  = 
 ma2HTF == SMA ? sma(src, len2HTF) :
 ma2HTF == EMA ? ema(src, len2HTF) :
 na
_3b  = 
 ma3HTF == SMA ? sma(src, len3HTF) :
 ma3HTF == EMA ? ema(src, len3HTF) :
 na
_4b  = 
 ma4HTF == SMA ? sma(src, len4HTF) :
 ma4HTF == EMA ? ema(src, len4HTF) :
 na

_1_HTF = security(syminfo.tickerid, MA_HTF,  _1b)
_2_HTF = security(syminfo.tickerid, MA_HTF,  _2b)
_3_HTF = security(syminfo.tickerid, MA_HTF,  _3b)
_4_HTF = security(syminfo.tickerid, MA_HTF,  _4b)
cl_HTF = security(syminfo.tickerid, MA_HTF,  close)

////////////////////////////////////////////////////////////////////////////////////////////

plot(ENT == co or ENT == cla ? _1 : na            , title="(E)MA 1", color=color.lime                           )
plot(ENT == co               ? _2 : na            , title="(E)MA 2", color=color.red                            )
plot(CLO == cu or CLO == clu ? _3 : na            , title="(E)MA 3", color= _3 == _1 ? color.lime : color.yellow)
plot(CLO == cu               ? _4 : na            , title="(E)MA 4", color= _4 == _2 ? color.red  : color.blue  )
plot(EX2 == co_HTF or EX2 == cla_HTF ? _1_HTF : na, title="(E)MA 1 HTF", color=color.lime, linewidth=2, transp=50)
plot(EX2 == co_HTF                   ? _2_HTF : na, title="(E)MA 2 HTF", color=color.red , linewidth=2, transp=50)
plot(CX2 == cu_HTF or CX2 == clu_HTF ? _3_HTF : na, title="(E)MA 3 HTF", color= _3_HTF == _1_HTF ? color.lime : color.yellow, linewidth=2, transp=50)
plot(CX2 == cu_HTF                   ? _4_HTF : na, title="(E)MA 4 HTF", color= _4_HTF == _2_HTF ? color.red  : color.blue  , linewidth=2, transp=50)

////////////////////////////////////////////////////////////////////////////////////////////

// RSI

rsi_       = rsi(src, ler)
rsi_HTF    = security(syminfo.tickerid, RSI_HTF,  rsi_)

////////////////////////////////////////////////////////////////////////////////////////////

// MACD

fast_ma    = sma_source ? sma(src, fst) : ema(src, fst)
slow_ma    = sma_source ? sma(src, slw) : ema(src, slw)
macd       = fast_ma - slow_ma
signal     = sma_signal ? sma(macd, sgn) : ema(macd, sgn)
hist       = macd - signal

macd_HTF   = security(syminfo.tickerid, MACD_HTF, macd  )
signal_HTF = security(syminfo.tickerid, MACD_HTF, signal)

////////////////////////////////////////////////////////////////////////////////////////////

extra = 
 EX  == none    ? true                   :
 EX  == mch     ? macd >  signal         :
 EX  == mch0    ? macd >  0              :
 EX  == sgh0    ? signal >  0            :
 false

cxtra = 
 CX  == none    ? true                   :
 CX  == mcl     ? macd <= signal         :
 CX  == mcl0    ? macd <= 0              :
 CX  == sgl0    ? signal <= 0            :
 false

EXTRA = 
 EX2 == none    ? true                   :
 EX2 == mch_HTF ? macd_HTF >  signal_HTF :
 EX2 == mch0HTF ? macd_HTF >  0          :
 EX2 == sgh0HTF ? signal_HTF >  0        :
 EX2 == co_HTF  ? _1_HTF >  _2_HTF       :
 EX2 == cla_HTF ? cl_HTF >  _1_HTF       : 
 false
 
CXTRA =
 CX2 == none    ? true                   :
 CX2 == mcl_HTF ? macd_HTF <= signal_HTF :
 CX2 == mcl0HTF ? macd_HTF <= 0          :
 CX2 == sgl0HTF ? signal_HTF <= 0        :
 CX2 == cu_HTF  ? _3_HTF <= _4_HTF       :
 CX2 == clu_HTF ? cl_HTF <= _3_HTF       : 
 false

RSI = rsi_ > EH and rsi_ <= EL and rsi_HTF > EH_HTF and rsi_HTF <= EL_HTF

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

BUY = 
 ENT == co    and TIME and extra and EXTRA and RSI ? _1 > _2        : 
 ENT == cla   and TIME and extra and EXTRA and RSI ? src > _1       : 
 ENT == rsi   and TIME and extra and EXTRA         ? RSI            : 
 ENT == mch   and TIME and extra and EXTRA and RSI ? macd > signal  : 
 ENT == mch0  and TIME and extra and EXTRA and RSI ? macd > 0       : 
 ENT == sgh0  and TIME and extra and EXTRA and RSI ? signal > 0     : 
 na

SELL = 
 CLO == cu    and TIME and cxtra and CXTRA and RSI ? _3 <= _4       : 
 CLO == clu   and TIME and cxtra and CXTRA and RSI ? src <= _3      : 
 CLO == rsi   and TIME and cxtra and CXTRA         ? RSI            :
 CLO == mcl   and TIME and cxtra and CXTRA and RSI ? macd <= signal : 
 CLO == mcl0  and TIME and cxtra and CXTRA and RSI ? macd <= 0      : 
 CLO == sgl0  and TIME and cxtra and CXTRA and RSI ? signal <= 0    : 
 na

if BUY
    if (Type == _S_)
        strategy.close("[S]")
    else
        strategy.entry("[B]", strategy.long)

if SELL
    if (Type == _L_)
        strategy.close("[B]")
    else
        strategy.entry("[S]", strategy.short)

strategy.exit("[SL/TP]", "[B]", stop= sl ? SL_ : na, limit= tp ? TP_ : na)


```

> Detail

https://www.fmz.com/strategy/434288

> Last Modified

2023-12-05 10:29:20
