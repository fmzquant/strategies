
> Name

基于Stoch和EMA的量化交易策略Quantitative-Trading-Strategy-Based-on-Stoch-and-EMA

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种结合Stoch指标和EMA均线进行量化交易的策略。该策略根据Stoch指标的值生成交易信号,并利用EMA滤除非主流方向的信号。

一、策略原理

该策略主要通过以下工具和逻辑进行交易:

1. 计算K值、D值组成的Stoch指标,K值反映快速价格变动,D值进行平滑处理;

2. 设置Stoch指标的超买超卖区域,根据K、D值相对大小产生交易信号;

3. 计算一定周期的EMA均线,判断价格主流方向; 

4. 只有当Stoch指标信号与EMA均线方向一致时,才进行交易;

5. 根据信号建立多头或空头头寸,并设置止盈止损点。

这样,Stoch指标捕捉超买超卖区机会,EMA滤除不合理信号,两者结合形成稳定策略。

二、策略优势

该策略最大优势是指标互补,Stoch判断超买超卖,EMA判断主流方向,结合减少错误交易。

其次,K、D值可调,能适应不同品种参数优化。

最后,止盈止损设置也使每笔交易收益风险明确,有助于资金管理。

三、潜在风险

但该策略也存在以下潜在问题:

首先,Stoch和EMA指标都可能出现滞后,导致失去最佳交易时机。

其次,止损过小可能产生过多无效止损。

最后,多参数优化需要大量工作以避免过拟合。

四、内容总结

本文详细介绍了一种结合Stoch和EMA的量化交易策略。它可以识别超买超卖区反转机会,并通过EMA过滤无效信号。该策略可以通过参数优化获得稳定收益,但也要注意防控上述问题的出现。

||


This article explains in detail a quantitative trading strategy combining the Stoch indicator and EMA moving average. It generates trading signals based on Stoch values and uses EMA to filter out non-mainstream signals.

I. Strategy Logic

The main tools and logic are:  

1. Calculate Stoch indicator with K and D values, where K reflects fast price changes and D is the smoothed signal.

2. Set overbought/oversold zones for the Stoch. Signals are based on relative values of K and D.

3. Compute EMA over a period to gauge the price mainstream trend.

4. Only take trades when Stoch signals agree with EMA direction. 

5. Establish long/short positions on signals with stop loss and take profit. 

Together, Stoch captures overbought/oversold opportunities and EMA filters out invalid signals, forming a robust strategy.

II. Advantages of the Strategy

The biggest advantage is the complementarity of indicators. Stoch judges O/S levels and EMA the mainstream trend, combining to reduce mistakes.

Also, adjustable K/D values allow optimization across different products. 

Finally, the stop loss/take profit clearly defines risk/reward for prudent money management.

III. Potential Weaknesses

However, some potential issues are:

Firstly, both Stoch and EMA can lag, causing missed optimal entries. 

Secondly, tight stops may prematurely trigger many invalidations.

Lastly, extensive parameter optimization is required to avoid overfitting. 

IV. Summary

In summary, this article has explained a quantitative strategy combining Stoch and EMA. It identifies overbought/oversold reversal chances, with EMA filtering out invalid signals. With proper tuning, this strategy can achieve steady profits but needs to manage the mentioned risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_3|14|RSI Length|
|v_input_int_4|14|Stochastic Length|
|v_input_1_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_1|0|Long Signal Type: Stoch Below Value|K&D Cross Below Value|Stoch CrossUp the Value|
|v_input_string_2|0|Short Signal Type: Stoch Above Value|K&D Cross Above Value|Stoch CrossDown the Value|
|v_input_float_1|false|(?TP / SL)Take Profit (%) [0 = Disabled]|
|v_input_float_2|false|Stop Loss (%) [0 = Disabled]|
|v_input_int_1|true|(?Stochastic)K Smoothing|
|v_input_int_2|3|D Smoothing|
|v_input_2_close|0|(?EMA)Source EMA : close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|200|Length EMA |
|v_input_4|20|(?Signal Options)Stoch below/cross this value for Long signals|
|v_input_5|80|Stoch above/cross this value for Short signals|
|v_input_6|timestamp(01 Jan 2014 00:00 +0000)|(?Backtesting)Backtesting Start Time|
|v_input_7|timestamp(01 Jan 2100 23:59 +0000)|Backtesting End Time|
|v_input_string_3|deribit-testnet|(?PV Settings)Exchange|
|v_input_string_4|btc-perpetual|Symbol|
|v_input_string_5||Account|
|v_input_string_6||PV Alert Name Longs|
|v_input_string_7||PV Alert Name Shorts|
|v_input_string_8||PV Alert Name TP/SL|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-08-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

//@version=5
strategy(title="EMA Stoch Strategy For ProfitView", overlay=true, calc_on_every_tick=true, process_orders_on_close=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1, initial_capital=1000)

// take profit e stop loss
TakeProfitPercent = input.float(defval = 0.0, title="Take Profit (%) [0 = Disabled]",minval = 0, step=.25,group='TP / SL')
StopLossPercent = input.float(defval = 0.0, title="Stop Loss (%) [0 = Disabled]",minval = 0, step=.25,group='TP / SL')

// Stoch
smoothK = input.int(1, title="K Smoothing", minval=1,group='Stochastic')
periodD = input.int(3, title="D Smoothing", minval=1,group='Stochastic')
lenghtRSI= input.int(14, "RSI Length", minval=1) 
lenghtStoch = input.int(14, "Stochastic Length", minval=1)
src = input(close, title="RSI Source")

rsi1 = ta.rsi(src, lenghtRSI)
k = ta.sma(ta.stoch(rsi1, rsi1, rsi1, lenghtStoch), smoothK)
d = ta.sma(k, periodD)

plot(k, title="K", color=#2962FF)
plot(d, title="D", color=#FF6D00)
// bgcolor(color=color.from_gradient(k, 0, 100, color.new(#2962FF, 100), color.new(#2962FF, 95)), title="K BG")
// bgcolor(color=color.from_gradient(d, 0, 100, color.new(#FF6D00, 100), color.new(#FF6D00, 95)), title="D BG")


// ema
src1= input(close,title='Source EMA ',group='EMA')
len1= input(200,title='Length EMA ',group='EMA')
ema1= ta.ema(src1,len1)
plot(ema1,title='EMA',color= color.blue ,linewidth=2)

// signals
LongVal= input(20,title='Stoch below/cross this value for Long signals',group='Signal Options')
scegliLong= input.string('Stoch Below Value', options= ['Stoch Below Value' , 'K&D Cross Below Value' , 'Stoch CrossUp the Value'] , title='Long Signal Type')

long1=  scegliLong == 'Stoch Below Value' ?  k < LongVal and d < LongVal and close > ema1 : na
long2=  scegliLong == 'K&D Cross Below Value' ? ta.cross(k,d) and k < LongVal and d < LongVal and close > ema1 : na
long3=  scegliLong == 'Stoch CrossUp the Value' ? ta.crossover(k,LongVal) and close > ema1 : na

shortVal= input(80,title='Stoch above/cross this value for Short signals',group='Signal Options')
scegliShort= input.string('Stoch Above Value', options= ['Stoch Above Value' , 'K&D Cross Above Value' , 'Stoch CrossDown the Value'] , title='Short Signal Type' )

short1= scegliShort == 'Stoch Above Value' ? k > shortVal and d > shortVal and close < ema1 : na
short2= scegliShort == 'K&D Cross Above Value' ?  ta.cross(k,d) and k > shortVal and d > shortVal and close < ema1 : na
short3= scegliShort == 'Stoch CrossDown the Value' ?  ta.crossunder(k,shortVal) and close < ema1 : na


//  Strategy Backtest Limiting Algorithm/
i_startTime = input(defval = timestamp("01 Jan 2014 00:00 +0000"), title = "Backtesting Start Time", inline="timestart", group='Backtesting')
i_endTime = input(defval = timestamp("01 Jan 2100 23:59 +0000"), title = "Backtesting End Time", inline="timeend", group='Backtesting')
timeCond = true

pv_ex = input.string("deribit-testnet", title="Exchange", group='PV Settings')
pv_sym = input.string("btc-perpetual", title="Symbol", group='PV Settings')
pv_acc = input.string("", title="Account", group='PV Settings')
pv_alert_long = input.string("", title="PV Alert Name Longs", group='PV Settings')
pv_alert_short = input.string("", title="PV Alert Name Shorts", group='PV Settings')
pv_alert_cancel = input.string("", title="PV Alert Name TP/SL", group='PV Settings')

profit_abs = (close * (TakeProfitPercent / 100))
stop_abs = (close * (StopLossPercent / 100))

ProfitTarget = TakeProfitPercent > 0 ? profit_abs / syminfo.mintick : na
LossTarget = StopLossPercent > 0 ? stop_abs / syminfo.mintick : na

// Make sure we are within the bar range, Set up entries and exit conditions
var entryprice = 0.0
var profitprice = 0.0
var stopprice = 0.0
exsym = pv_ex == "" ? "" : "ex=" + pv_ex + ","
exsym := pv_sym == "" ? exsym : exsym + "sym=" + pv_sym

if ((long1 or long2 or long3) and timeCond and strategy.position_size <= 0)
    strategy.entry("Long", strategy.long, when=barstate.isconfirmed)
    entryprice := close
    profitprice := entryprice+profit_abs
    stopprice := entryprice-stop_abs
    
    tpsl_str = TakeProfitPercent > 0 ? ",mytp=" + str.tostring(profitprice) : ""
    tpsl_str := StopLossPercent > 0 ? tpsl_str + ",mysl=" + str.tostring(stopprice) : tpsl_str
    alert(pv_alert_long + "(" + exsym + ",acc=" + pv_acc + tpsl_str +  ")", alert.freq_once_per_bar_close)

if ((short1 or short2 or short3) and timeCond and strategy.position_size >= 0)
    strategy.entry("Short", strategy.short, when=barstate.isconfirmed)
    entryprice := close
    profitprice := entryprice-profit_abs
    stopprice := entryprice+stop_abs
    
    tpsl_str = TakeProfitPercent > 0 ? ",mytp=" + str.tostring(profitprice) : ""
    tpsl_str := StopLossPercent > 0 ? tpsl_str + ",mysl=" + str.tostring(stopprice) : tpsl_str
    alert(pv_alert_short + "(" + exsym + ",acc=" + pv_acc + tpsl_str +  ")", alert.freq_once_per_bar_close)
    
tpsl_hit_long = (strategy.position_size[1] > 0 and ((TakeProfitPercent > 0 and high > profitprice[1]) or (StopLossPercent > 0 and low < stopprice[1])))
tpsl_hit_short = (strategy.position_size[1] < 0 and ((TakeProfitPercent > 0 and low < profitprice[1]) or (StopLossPercent > 0 and high > stopprice[1])))

if (tpsl_hit_long or tpsl_hit_short)
    alert(pv_alert_cancel + "(" + exsym + ",acc=" + pv_acc + ")", alert.freq_once_per_bar)


strategy.exit("Exit Long (TP/SL)", from_entry = "Long" , profit = ProfitTarget, loss = LossTarget)
strategy.exit("Exit Short (TP/SL)", from_entry = "Short", profit = ProfitTarget, loss = LossTarget)

plot(entryprice, title="Entry Price", color=strategy.opentrades > 0 ? color.gray : color.new(color.gray, 100))
plot(profitprice, title="Profit Price", color=strategy.opentrades > 0 and TakeProfitPercent > 0 ? color.green : color.new(color.green, 100))
plot(stopprice, title="Stop Price", color=strategy.opentrades > 0 and StopLossPercent > 0? color.red : color.new(color.red, 100))
```

> Detail

https://www.fmz.com/strategy/426880

> Last Modified

2023-09-15 11:31:16
