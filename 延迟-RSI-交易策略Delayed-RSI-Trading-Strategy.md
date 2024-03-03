
> Name

延迟-RSI-交易策略Delayed-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

延迟 RSI 交易策略运用常规 RSI 指标识别超买超卖情况,并在进入信号出现后延迟一定周期后再入场,以避免假突破造成不必要的亏损。该策略主要思想是利用RSI指标判断市场的超买超卖现象,在这一判断的基础上,通过延迟入场实现更准确的入场时机把握。

## 策略原理

该策略使用长度为21周期的RSI指标判断超买超卖情况。当RSI指标上穿用户设定的超买线(默认60)时,认为行情超买;当RSI指标下穿用户设定的超卖线(默认40)时,认为行情超卖。 

判断超买超卖信号出现后,策略不会立即入场,而是开始计算延迟周期。当延迟周期数(默认15周期)满足后,再按照超买信号做空,超卖信号做多。

该策略允许用户调整延迟周期数,来实现不同的入场时机。延迟周期越长,可避免更多假突破,但也可能错过较好的入场点。用户需要根据具体品种来调整延迟周期参数。

此外,该策略还实现了止损、止盈、反向交易等选项。用户可以选择固定止损,追踪止损,固定止盈等方式管理仓位。还可以选择反向交易逻辑,即根据超买信号做多,超卖信号做空。

## 策略优势

1. 利用 RSI 指标判断超买超卖情况,可准确抓住反转机会。RSI 是一种较为成熟的超买超卖指标,可以有效识别反转机会。

2. 延迟入场机制可避免假突破引发亏损。许多突破不一定代表发生实质性反转,延迟入场可以验证突破的有效性。

3. 可调整延迟周期数,精确把握入场时机。用户可以根据不同品种特性来调整延迟周期,实现最佳入场点。

4. 实现止损、止盈管理,可控制风险。策略提供多种止损止盈方式,可以与延迟入场配合来控制风险。

5. 提供反向交易选项,适应不同品种特性。用户可以选择正向或反向交易逻辑,以对冲不确定性。

## 策略风险

1. RSI 发出假信号的风险。RSI 信号并不总是有效,在某些市场情况下也会出现错误信号。

2. 延迟过多错过入场时机的风险。延迟周期设置过长会错过较好入场点。

3. 反向交易增加亏损风险。反向交易虽可对冲不确定性,但也可能扩大总体亏损。

4. 追踪止损被套风险。追踪止损在价格变动剧烈时,可能会过于接近当前价格,被价格突破套牢。

5. 止盈预估不准造成盈利不足。固定止盈无法实现最大盈利,需要合理预估来设置。

针对上述风险,优化建议如下:

1. 结合其他指标过滤 RSI 信号,提升可靠性。例如 KDJ、MACD 等指标。

2. 根据不同品种历史数据测试取最佳延迟周期参数。不宜一概而论。

3. 谨慎使用反向交易功能,最好结合趋势交易等方式。

4. 追踪止损时设置较宽的间距,避免过于接近当下价格。

5. 测试不同的止盈倍数,找到最优参数。也可以考虑动态止盈。

## 优化方向

该策略可以从以下几个方面进行进一步优化:

1. 结合多种指标过滤入场信号。例如 KDJ,MACD 等指标与 RSI 结合,可以形成更可靠的交易信号。

2. 动态调整延迟周期数。可以根据市场波动程度,动态改变延迟周期数,在保证避免假突破的同时,也可提高入场准确率。

3. 优化止损止盈策略。可以研究动态止损、盈利回撤比例止损、时间止损等,使止损止盈更符合市场波动特点。 

4. 结合趋势因素。可以判断突破方向与大趋势方向的吻合性,避免逆势交易。也可以根据突破力度来调整延迟周期数。

5. 利用机器学习寻找最优参数组合。通过大量训练和回测数据,机器学习可以自动调整参数,获得最佳参数组合。

综上,该策略仍有许多可优化空间,通过指标组合、动态调参、趋势判断等方式可使策略更稳健可靠。机器学习的应用也是未来可期的优化方向。

## 总结

延迟 RSI 策略 overall 利用 RSI 指标判断超买超卖情况,并在信号出现后延迟一定周期再入场,可以有效避免假突破造成不必要亏损。该策略具有指标判定准确、延迟入场避免假突破、可调整延迟周期、实现止盈止损管理等优点。但也存在 RSI 信号不可靠、延迟过多错过机会等风险。可通过指标组合优化信号准确性,动态调整延迟周期把握入场时机,优化止盈止损策略等方式进一步改进。该策略有广阔的优化空间,值得探索。

|| 

## Overview

The Delayed RSI trading strategy utilizes the conventional RSI indicator to identify overbought and oversold conditions, and delays entering the market for a certain period after the signal appears to avoid unnecessary losses from fake breakouts. The main idea of this strategy is to use the RSI indicator to judge the overbought and oversold market conditions, and achieve more accurate entry timing by delaying entry based on this judgment.

## Strategy Logic 

This strategy uses a 21-period RSI indicator to determine overbought and oversold conditions. When the RSI indicator crosses above the user-defined overbought level (default 60), the market is considered overbought. When the RSI crosses below the user-defined oversold level (default 40), the market is considered oversold.

After identifying overbought or oversold signals, the strategy does not enter the market immediately. Instead, it starts counting the delay period. When the delay period (default 15 bars) is met, it enters short based on overbought signal, and long based on oversold signal.

The strategy allows users to adjust the delay period to achieve different entry timing. Longer delay period can avoid more fake breakouts, but may also miss better entry opportunities. Users need to adjust the delay period parameter based on the characteristics of specific products.

In addition, the strategy also implements options like stop loss, take profit, reverse trading, etc. Users can choose fixed stop loss, trailing stop loss, fixed take profit and so on to manage positions. The trading logic can also be reversed, i.e. go long on overbought signals and short on oversold signals.

## Advantages

1. Utilize RSI indicator to identify overbought/oversold conditions accurately and catch reversal opportunities. RSI is a mature oscillator widely used to identify reversals.

2. Delayed entry avoids losses from fake breakouts. Many breakouts do not necessarily lead to real reversals. Delayed entry verifies the validity.

3. Adjustable delay period allows accurate entry timing. Users can optimize delay period based on product characteristics for best entry. 

4. Implement stop loss and take profit to control risks. The strategy offers multiple ways like fixed SL/TP, trailing SL etc to manage risks.

5. Reverse trading option adapts to different products. Users can choose normal or reverse logic to hedge uncertainties.

## Risks

1. Risk of fake signals from RSI. RSI signals may not always be accurate and can give false signals sometimes.

2. Risk of missing opportunities if delay is too long. Excessive delay period can result in missed entry points.

3. Increased loss risk from reverse trading. Although reverse trading hedges uncertainties, it may also amplify total loss.

4. Risk of trailing SL being too close and getting stopped out prematurely.

5. Insufficient profit due to inaccurate fixed TP. Fixed TP cannot achieve max profit and needs reasonable forecast.

To address these risks, optimization suggestions are:

1. Filter RSI signals with other indicators like KDJ, MACD etc to improve reliability.

2. Backtest with historical data to find optimal delay period for each product. One size does not fit all.

3. Use reverse logic cautiously, preferably combine with trend following. 

4. Keep wide buffer for trailing SL to avoid prices getting too close.

5. Test different TP ratios to find optimum. Consider dynamic take profit also.

## Optimization Opportunities

The strategy can be further optimized in the following aspects:

1. Combine multiple indicators to filter entry signals, e.g. KDJ, MACD with RSI for more robust signals.

2. Dynamically adjust delay period based on market volatility. This maintains false breakout avoidance while improving entry accuracy.

3. Optimize SL/TP strategies, such as dynamic SL, profit retracement ratio SL, time-based SL etc., making them adapt better to market swings.

4. Incorporate trend. Gauge if breakout direction aligns with major trend. Also adjust delay period based on breakout momentum. 

5. Use machine learning to find optimal parameter combinations. ML can auto tune parameters based on large training and backtest datasets.

In conclusion, the strategy has ample room for optimization via indicator combos, dynamic tuning of parameters, trend integration etc. ML is also a promising direction going forward.

## Summary 

The Delayed RSI strategy overall utilizes RSI to identify overbought/oversold conditions, and delays entry for a period after signal occurs to avoid unnecessary losses from fakeouts. The strategy has advantages like accurate signal identification, delayed entry to avoid false breaks, adjustable delay period, SL/TP implementation etc. But risks like unreliable RSI signals, missed opportunities from excess delay exist. These can be improved further through optimizing signal accuracy via indicator combos, dynamic delay period tuning, better SL/TP strategies etc. The strategy has broad optimization opportunities and is worth exploring.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Strategy Direction|
|v_input_2|true|-----------------Strategy Inputs-------------------|
|v_input_3|21|RSI Length|
|v_input_4|60|Overbought|
|v_input_5|40|Oversold|
|v_input_6|15|Entry Delay (# of Bars)|
|v_input_7|false|Use Strategy Close|
|v_input_8|true|-----------------General Inputs-------------------|
|v_input_9|true|Use Stop Loss and Take Profit|
|v_input_10|false|Use Trailing Stop|
|v_input_11|0|Type Of Stop: ATR Stop|Swing Lo/Hi|Strategy Stop|
|v_input_12|10|Swing Point Lookback|
|v_input_13|3|Swing Point SL Perc Increment|
|v_input_14|14|ATR Length|
|v_input_15|3|ATR Multiple|
|v_input_16|2|Take Profit Risk Reward Ratio|
|v_input_17|false|Allow Direct Position Reverse|
|v_input_18|true|Reverse Trades|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-10-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tweakerID and © BacktestRookies

// This strategy uses a 21 period RSI with an overbought (RSI indicator 
// is greater than) level of 60 (user defined) to determines long entries and an oversold 
// (RSI indicator is less than) level of 40 (user defined) for shorts. It introduces a bar delay that starts
// counting when the RSI < Oversold or RSI > Overbought conditions are true, delaying the entry with 
// the amount of bars determined by the user. The trading logic can be reversed, which seems to work better.

//@version=4
strategy("Delayed RSI Strategy", 
     overlay=false, 
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=100, 
     initial_capital=10000, 
     commission_value=0.04, 
     calc_on_every_tick=false, 
     slippage=0)
     
direction = input(0, title = "Strategy Direction", type=input.integer, minval=-1, maxval=1)
strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : 
 (direction < 0 ? strategy.direction.short : strategy.direction.long))

// Bought and Sold Boolean Signal
bought = strategy.position_size > strategy.position_size[1] 
 or strategy.position_size < strategy.position_size[1]

/////////////////////// STRATEGY INPUTS ////////////////////////////////////////
title1=input(true, "-----------------Strategy Inputs-------------------")  

rsiLen=input(21, title="RSI Length")
i_OB = input(60, title="Overbought")
i_OS = input(40, title="Oversold")
i_delay = input(15, title="Entry Delay (# of Bars)")
i_Close= input(false, title="Use Strategy Close")

/////////////////////// BACKTESTER /////////////////////////////////////////////
title2=input(true, "-----------------General Inputs-------------------")  

// Backtester General Inputs
i_SL=input(true, title="Use Stop Loss and Take Profit")
TS=input(false, title="Use Trailing Stop")
i_SLType=input(defval="ATR Stop", title="Type Of Stop", options=["Strategy Stop", "Swing Lo/Hi", "ATR Stop"])
i_SPL=input(defval=10, title="Swing Point Lookback")
i_PercIncrement=input(defval=3, step=.1, title="Swing Point SL Perc Increment")*0.01
i_ATR = input(14, title="ATR Length")
i_ATRMult = input(3, step=.1, title="ATR Multiple")
i_TPRRR = input(2, step=.1, title="Take Profit Risk Reward Ratio")
DPR=input(false, "Allow Direct Position Reverse")
reverse=input(true, "Reverse Trades")

// Swing Points Stop and Take Profit
SwingStopProfit() =>
    LL=(lowest(i_SPL))*(1-i_PercIncrement)
    HH=(highest(i_SPL))*(1+i_PercIncrement)
    LL_price = valuewhen(bought, LL, 0)
    HH_price = valuewhen(bought, HH, 0)
    entry_LL_price = strategy.position_size > 0 ? LL_price : na 
    entry_HH_price = strategy.position_size < 0 ? HH_price : na 
    tp=strategy.position_avg_price + (strategy.position_avg_price - entry_LL_price)*i_TPRRR
    stp=strategy.position_avg_price - (entry_HH_price - strategy.position_avg_price)*i_TPRRR
    [entry_LL_price, entry_HH_price, tp, stp]

// ATR Stop
ATRStop() =>
    ATR=atr(i_ATR)*i_ATRMult
    ATRLong = ohlc4 - ATR
    ATRShort = ohlc4 + ATR
    ATRLongStop = valuewhen(bought, ATRLong, 0)
    ATRShortStop = valuewhen(bought, ATRShort, 0)
    LongSL_ATR_price = strategy.position_size > 0 ? ATRLongStop : na 
    ShortSL_ATR_price = strategy.position_size < 0 ? ATRShortStop : na 
    ATRtp=strategy.position_avg_price + (strategy.position_avg_price - LongSL_ATR_price)*i_TPRRR
    ATRstp=strategy.position_avg_price - (ShortSL_ATR_price - strategy.position_avg_price)*i_TPRRR
    [LongSL_ATR_price, ShortSL_ATR_price, ATRtp, ATRstp]
    
// Strategy Stop
StrategyStop(bought) =>
    float LongStop = na
    float ShortStop = na
    float StratTP = na
    float StratSTP = na
    [LongStop, ShortStop, StratTP, StratSTP]

//TrailingStop
TrailingStop(SL,SSL) =>
    dif=(valuewhen(strategy.position_size>0 and strategy.position_size[1]<=0, high,0))
     -strategy.position_avg_price
    trailOffset     = strategy.position_avg_price - SL
    var tstop = float(na)
    if strategy.position_size > 0
        tstop := high- trailOffset - dif
        if tstop<tstop[1]
            tstop:=tstop[1]
    else
        tstop := na
    StrailOffset     = SSL - strategy.position_avg_price
    var Ststop = float(na)
    Sdif=strategy.position_avg_price-(valuewhen(strategy.position_size<0 
     and strategy.position_size[1]>=0, low,0))
    if strategy.position_size < 0
        Ststop := low+ StrailOffset + Sdif
        if Ststop>Ststop[1]
            Ststop:=Ststop[1]
    else
        Ststop := na
    [tstop, Ststop]
  
//Stop Loss & Take Profit Switches  
SLTPLogic(LongStop, ShortStop, StratTP, StratSTP, LongSL_ATR_price, ShortSL_ATR_price, ATRtp, ATRstp,
 entry_LL_price, entry_HH_price, tp, stp) =>
    SL= i_SLType == "Swing Lo/Hi" ? entry_LL_price : i_SLType == "ATR Stop" ? LongSL_ATR_price : LongStop
    SSL= i_SLType == "Swing Lo/Hi" ? entry_HH_price : i_SLType == "ATR Stop" ? ShortSL_ATR_price : ShortStop
    TP= i_SLType == "Swing Lo/Hi" ? tp : i_SLType == "ATR Stop" ? ATRtp : StratTP
    STP= i_SLType == "Swing Lo/Hi" ? stp : i_SLType == "ATR Stop" ? ATRstp : StratSTP
    [SL, SSL, TP, STP]


/////////////////////// STRATEGY LOGIC /////////////////////////////////////////

rsi = rsi(close, rsiLen)
isOB= rsi > i_OB
isOS= rsi < i_OS
BarsSinceOB = barssince(not isOB)
BarsSinceOS = barssince(not isOS)

BUY = BarsSinceOS == i_delay
SELL = BarsSinceOB == i_delay

/////////////////////// FUNCTION CALLS /////////////////////////////////////////

// Stops and Profits
[entry_LL_price, entry_HH_price, tp, stp] = SwingStopProfit()
[LongSL_ATR_price, ShortSL_ATR_price, ATRtp, ATRstp] = ATRStop()
[LongStop, ShortStop, StratTP, StratSTP] = StrategyStop(bought)
[SL, SSL, TP, STP] = SLTPLogic(LongStop, ShortStop, StratTP, StratSTP, 
 LongSL_ATR_price, ShortSL_ATR_price, ATRtp, ATRstp, entry_LL_price, entry_HH_price, tp, stp)
[tstop, Ststop] = TrailingStop(SL,SSL)

// Entries
if reverse
    if not DPR
        strategy.entry("long", strategy.long, when=SELL and strategy.position_size == 0)
        strategy.entry("short", strategy.short, when=BUY and strategy.position_size == 0)
    else     
        strategy.entry("long", strategy.long, when=SELL)
        strategy.entry("short", strategy.short, when=BUY)
else
    if not DPR 
        strategy.entry("long", strategy.long, when=BUY and strategy.position_size == 0)
        strategy.entry("short", strategy.short, when=SELL and strategy.position_size == 0)
    else
        strategy.entry("long", strategy.long, when=BUY)
        strategy.entry("short", strategy.short, when=SELL)
// Exits
if i_SL
    strategy.exit("TP & SL", "long", limit=TP, stop=TS? tstop : SL)
    strategy.exit("TP & SL", "short", limit=STP, stop=TS? Ststop : SSL)
    
if i_Close
    strategy.close_all(when=cross(rsi, 50))

/////////////////////// PLOTS //////////////////////////////////////////////////

//Plots
rsiplot = plot(rsi, "RSI", color=#7E57C2)
band1 = hline(i_OB, "Upper Band", color=#787B86)
bandm = hline(50, "Middle Band", color=color.new(#787B86, 50))
band0 = hline(i_OS, "Lower Band", color=#787B86)
fill(band1, band0, color=color.rgb(126, 87, 194, 90), title="Background")
plot(rsi, "RSI", color=#7E57C2)
// OSOBCount = plot(isOB ? BarsSinceOB : isOS ? BarsSinceOS : na, transp=100)
// OSOBColor = color.from_gradient(isOB ? BarsSinceOB : BarsSinceOS, 0, 20, color.black, isOB ? color.red : isOS ? color.green : na)
// OBP = plot(rsi > i_OB ? rsi : na, color=color.white, display=display.none)
// fill(plot(i_OB, display=display.none), OBP, color=OSOBColor, transp=0, fillgaps=false)
// OSP = plot(rsi < i_OS ? rsi : na, color=color.white, display=display.none)
// fill(plot(i_OS, display=display.none), OSP, color=OSOBColor, transp=0, fillgaps=false)

// plotshape(BUY ? 1 : na, style=shape.arrowdown, location=location.bottom, 
//  color=color.green, title="Bullish Setup", size=size.normal)
// plotshape(SELL ? 1 : na, style=shape.arrowup, location=location.top, 
//  color=color.red, title="Bearish Setup", size=size.normal)


```

> Detail

https://www.fmz.com/strategy/428618

> Last Modified

2023-10-07 15:38:56
