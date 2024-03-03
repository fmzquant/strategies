
> Name

基于RSI和移动平均线的多时间框架交易策略RSI-and-Moving-Average-Crossover-Multi-Timeframe-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9e33d4abd8b7a3bb43.png)

[trans]

## 概述

本策略的核心思想是同时利用相对强弱指数(RSI)和不同时间周期的移动平均线来识别趋势反转点,以捕捉中长线趋势的同时进行短线交易。该策略综合多种交易信号,旨在提高交易成功率。

## 策略原理

1. 计算RSI指标,以及快线EMA和慢线WMA移动平均线。
2. 当RSI指标线突破WMA移动平均线时,产生买入/卖出信号。
3. 当EMA快线突破WMA慢线时,产生买入/卖出信号。 
4. 当RSI和EMA同时突破WMA时,产生强烈的买入/卖出信号。
5. 同时,当价格突破辅助的移动平均线时,可以增强主信号。
6. 设置止损、止盈条件。

该策略综合了多种技术指标的突破信号,不同参数设置的移动平均线来识别不同周期的趋势,从而提高策略的可靠性。RSI指标判断超买超卖状态,EMA快线判断短期趋势,WMA慢线判断中期趋势,价格与辅助平均线的突破验证趋势。多种信号的综合提升了策略效果。

## 优势分析

- 利用RSI指标的反转特征,可以在超买超卖区抓取反转机会。
- 辅助移动平均线作为趋势过滤器,避免假突破。 
- 多时间周期结合,既可跟踪长线趋势,也可捕捉短线机会。
- 综合多种指标信号,可提高交易成功率。
- 设置止损止盈策略,可以主动控制风险。

## 风险分析

- RSI指标容易产生假信号,需要辅助移动平均线过滤。
- 大周期趋势下的反弹可能会触发反向交易信号,需要谨慎对待。
- 需优化参数设置,如RSI周期长度、移动平均线周期等。
- 停损点设置需要谨慎,避免被套。

风险可以通过参数优化、严格的止损策略、以及考虑大周期趋势等方法减轻。

## 优化方向

- 优化RSI参数,找到最佳周期长度。
- 测试不同类型的移动平均线组合。
- 加入波动率指标如ATR,动态调整止损止盈位。
- 增加交易量管理模块。
- 采用机器学习技术进行参数优化和信号质量评估。

## 总结

本策略整合了趋势跟踪和极点反转交易思路,加入多时间框架分析和多种指标综合利用,目的是提高交易胜率。关键是要控制好风险,优化参数设置,并适时考虑大周期趋势对交易的影响。总体来说,该策略具有较强的实用性和拟合性。后续可采用更多高级技术进一步提升策略质量。

||


## Overview

The core idea of this strategy is to identify trend reversal points by utilizing both Relative Strength Index (RSI) and moving averages of different timeframes, in order to capture mid-to-long term trends while conducting short-term trading. This strategy combines various trading signals in an attempt to improve trading success rate.

## Strategy Logic

1. Calculate RSI indicator, fast EMA and slow WMA moving averages.
2. When RSI line crosses over WMA line, buy/sell signals are generated.
3. When faster EMA crosses over slower WMA, buy/sell signals are generated.
4. When both RSI and EMA cross over WMA simultaneously, strong buy/sell signals are generated.  
5. Additionally, when price crosses over auxiliary moving average lines, it strengthens the main signal.
6. Set stop loss and take profit parameters.

This strategy combines breakout signals from multiple technical indicators and moving averages of different timeframes to identify trends of different periods, thereby improving reliability. RSI identifies overbought/oversold levels, EMA determines short-term trend, WMA determines medium-term trend, while price crossover with auxiliary moving averages verifies the trend. The combination of multiple signals enhances strategy performance.

## Advantage Analysis 

- Utilize RSI's reversal characteristic to capture reversal opportunities in overbought/oversold zones.
- Auxiliary moving averages act as trend filter to avoid false breakouts.
- Multi-timeframe combination enables tracking long-term trends while capturing short-term opportunities.
- Combining multiple indicator signals can improve trading success rate. 
- Stop loss and take profit allows actively managing risks.

## Risk Analysis

- RSI can generate false signals, needs filtering with moving averages.
- Rebounds under major trends may trigger reverse trade signals, need caution.
- Requires parameter optimization such as RSI period, moving average periods etc.
- Stop loss placement needs prudence to avoid being stopped out prematurely. 

Risks can be mitigated through parameter optimization, strict stop loss strategy, and consideration of major trends etc.

## Optimization Directions

- Optimize RSI parameters to find optimal period length.
- Test different moving average combinations.  
- Incorporate volatility index like ATR for dynamic stop loss/take profit.
- Add position sizing and risk management modules.
- Utilize machine learning for parameter optimization and signal quality evaluation.

## Summary

This strategy integrates trend following and extreme reversal trading ideas, adds multi-timeframe analysis and synthesized indicators, aiming to improve trading success rate. Key is to control risk, optimize parameters, and consider impacts of major trends. Overall this is a practical strategy with strong adaptability. More advanced techniques can be used to further improve strategy quality.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|RSI Value)|
|v_input_2|9|Length:|
|v_input_3|50|Level:|
|v_input_4|true|RSI)|
|v_input_5|70|O-BOUGHT|
|v_input_6|30|O-SOLD|
|v_input_7|true|Price-MA)|
|v_input_8|0|Type: EMA|SMA|WMA|VWMA|
|v_input_9|3|Length|
|v_input_10|true|Trending-MA)|
|v_input_11|0|ma_type2: WMA|SMA|EMA|VWMA|
|v_input_12|21|Length|
|v_input_25|true|TP-SL|
|v_input_26|3|SL %|
|v_input_27|15|TP %|
|v_input_13|timestamp(01 Jan 2021 00:00 +0000)|(?Backtest Time Period)Start Time|
|v_input_14|timestamp(01 Jan 2200 00:00 +0000)|End Time|
|v_input_15|false|(?? ? --- Backtesting Signals Type --- ? )RSI x Trending-MA|
|v_input_16|false|MA x Trendin-MA|
|v_input_17|false|RSI + EMA x Trending-MA|
|v_input_18|false|Trending-MA x 50|
|v_input_19|false|RSI x 50|
|v_input_20|false|RSI OS/OB x Trending-MA|
|v_input_21|false|RSI Over Sold/Bought|
|v_input_22|true|(?With MA)With MA Signal)|
|v_input_23|0|withMA_type: SMA|EMA|WMA|VWMA|
|v_input_24|9|with_MALen|
|v_input_28|true|MA + RSI x Trending-MA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-15 00:00:00
end: 2023-10-15 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HamidBox

//@version=4
// strategy("H-M By HamidBox-YT", default_qty_type=strategy.cash, default_qty_value= 100, initial_capital=100, currency='USD', commission_type=strategy.commission.percent, commission_value=0.1)

ma(source, length, type) =>
    type == "SMA" ? sma(source , length)    :
     type == "EMA" ? ema(source , length)   :
     type == "WMA" ? wma(source , length)   :
     type == "VWMA" ? vwma(source , length) :
     na
WMA(source, length, type) =>
    type == "SMA" ? sma(source , length)    :
     type == "EMA" ? ema(source , length)   :
     type == "WMA" ? wma(source , length)   :
     type == "VWMA" ? vwma(source , length) :
     na

WithMA(source, length, type) =>
    type == "SMA" ? sma(source , length)    :
     type == "EMA" ? ema(source , length)   :
     type == "WMA" ? wma(source , length)   :
     type == "VWMA" ? vwma(source , length) :
     na


rsi_inline      = input(true , title="RSI Value)", inline="rsi")
rsiLength       = input(title="Length:", type=input.integer, defval=9, minval=1, inline="rsi")
rsiLineM        = input(title="Level:", type=input.integer, defval=50, minval=1, inline="rsi")

rsi_OSOBinline  = input(true , title="RSI)", inline="rsiosob")
rsiLineU        = input(title="O-BOUGHT", type=input.integer, defval=70, minval=1, inline="rsiosob")
rsiLineD        = input(title="O-SOLD", type=input.integer, defval=30, minval=1, inline="rsiosob")

ma_inline       = input(true , title="Price-MA)", inline="ma")
ma_type         = input(title="Type", defval="EMA", options=["EMA","SMA","WMA","VWMA"], inline="ma")
emaLength       = input(title="Length", type=input.integer, defval=3, inline="ma")

wma_inline      = input(true , title="Trending-MA)", inline="wma")
ma_type2        = input(title="", defval="WMA", options=["EMA","SMA","WMA","VWMA"], inline="wma")
wmaLength       = input(title="Length", type=input.integer, defval=21, inline="wma")


////////////////////////////////////////////////////////////////////////////////
startTime       = input(title="Start Time", type = input.time, defval = timestamp("01 Jan 2021 00:00 +0000"), group="Backtest Time Period")
endTime         = input(title="End Time", type = input.time, defval = timestamp("01 Jan 2200 00:00 +0000"), group="Backtest Time Period")
inDateRange     = true

////////////////////////////////////////////////////////////////////////////////

rsi         = rsi(close , rsiLength)
r           = plot(rsi_inline ? rsi : na, color=color.yellow, linewidth=2)

EMA         = ma(rsi, emaLength, ma_type)
e           = plot(ma_inline ? EMA : na, color=color.lime)

myWMA       = ma(rsi, wmaLength, ma_type2)
w           = plot(wma_inline ? myWMA : na, color=color.white, linewidth=2)


up  = hline(rsiLineU, title='UP Level', linewidth=1, color=color.red, linestyle=hline.style_dotted)
mid = hline(rsiLineM, title='Mid Level', linewidth=2, color=color.white, linestyle=hline.style_dotted)
dn  = hline(rsiLineD, title='DN Level', linewidth=1, color=color.green, linestyle=hline.style_dotted)

col_e_w = EMA > myWMA  ? color.new(color.green , 85) : color.new(color.red , 85)
col_r_w = rsi > myWMA  ? color.new(color.green , 85) : color.new(color.red , 85)

fill(e , w, color=col_e_w)
fill(r , w, color=col_r_w)

////////////////////////////////////////////////////////////////////////////////

//Signals     = input(true,group="? ? --- Backtesting Signals Type --- ? ")

///////////////////////////////////////////////////////////////////////////////
RSI_Cross   = input(false, "RSI x Trending-MA", inline="wma_cross",group="? ? --- Backtesting Signals Type --- ? ")      // INPUT

rsiBuySignal    = crossover(rsi , myWMA)
plotshape(RSI_Cross ? rsiBuySignal : na, title="RSI Crossover", style=shape.labelup, location=location.bottom, color=color.green)

rsiSellSignal   = crossunder(rsi , myWMA) 
plotshape(RSI_Cross ? rsiSellSignal : na, title="RSI Crossunder", style=shape.labeldown, location=location.top, color=color.red)

if rsiBuySignal and RSI_Cross and inDateRange
    strategy.entry("RSIxWMA", strategy.long)
if rsiSellSignal and RSI_Cross and inDateRange
    strategy.close("RSIxWMA", comment="x")
if (not inDateRange)
    strategy.close_all()
    
////////////////////////////////////////////////////////////////////////////////

MA_Cross    = input(false, "MA x Trendin-MA",group="? ? --- Backtesting Signals Type --- ? ")       // INPUT

maBuySignal     = crossover(EMA, myWMA)
plotshape(MA_Cross ? maBuySignal : na, title="MA Cross", style=shape.circle, location=location.bottom, color=color.lime)

maSellSignal   = crossunder(EMA , myWMA) 
plotshape(MA_Cross ? maSellSignal : na, title="RSI Crossunder", style=shape.circle, location=location.top, color=color.maroon)

if maBuySignal and MA_Cross and inDateRange
    strategy.entry("MAxWMA", strategy.long)
if maSellSignal and MA_Cross and inDateRange
    strategy.close("MAxWMA", comment="x")
if (not inDateRange)
    strategy.close_all()
    
////////////////////////////////////////////////////////////////////////////////

Mix         = input(false, "RSI + EMA x Trending-MA",group="? ? --- Backtesting Signals Type --- ? ")       // INPUT

rsi_ma_buy  = crossover(rsi , myWMA) and crossover(EMA, myWMA)
rsi_ma_sell = crossunder(rsi , myWMA) and crossunder(EMA, myWMA)

plotshape(Mix ? rsi_ma_buy : na, title="RSI Crossunder", style=shape.circle, location=location.bottom, color=color.lime, size=size.tiny)
plotshape(Mix ? rsi_ma_sell : na, title="RSI Crossunder", style=shape.circle, location=location.top, color=color.yellow, size=size.tiny)

if rsi_ma_buy and Mix and inDateRange
    strategy.entry("RSI+EMA x WMA", strategy.long)
if rsi_ma_sell and Mix and inDateRange
    strategy.close("RSI+EMA x WMA", comment="x")
if (not inDateRange)
    strategy.close_all()

////////////////////////////////////////////////////////////////////////////////
wma_cross       = input(false, "Trending-MA x 50",group="? ? --- Backtesting Signals Type --- ? ")       // INPUT

wma_buy         = crossover(myWMA , rsiLineM)
plotshape(wma_cross ? wma_buy : na, title="WMA Cross", style=shape.diamond, location=location.bottom, color=color.aqua)
wma_sell        = crossunder(myWMA , rsiLineM)
plotshape(wma_cross ? wma_sell : na, title="WMA Cross", style=shape.diamond, location=location.top, color=color.aqua)

if wma_buy and wma_cross and inDateRange
    strategy.entry("WMA x 50", strategy.long)
if wma_sell and wma_cross and inDateRange
    strategy.close("WMA x 50", comment="x")
if (not inDateRange)
    strategy.close_all()

////////////////////////////////////////////////////////////////////////////////
rsi_50      = input(false, "RSI x 50",group="? ? --- Backtesting Signals Type --- ? ")       // INPUT

rsi_50_buy      = crossover(rsi , rsiLineM)
plotshape(rsi_50 ? rsi_50_buy : na, title="WMA Cross", style=shape.cross, location=location.bottom, color=color.purple)
rsi_50_sell     = crossunder(rsi , rsiLineM)
plotshape(rsi_50 ? rsi_50_sell : na, title="WMA Cross", style=shape.cross, location=location.top, color=color.purple)

if rsi_50_buy and rsi_50 and inDateRange
    strategy.entry("RSI Cross 50", strategy.long)
if rsi_50_sell and rsi_50 and inDateRange
    strategy.close("RSI Cross 50", comment="x")
if (not inDateRange)
    strategy.close_all()
    
////////////////////////////////////////////////////////////////////////////////
RSI_OS_OB   = input(false, "RSI OS/OB x Trending-MA",group="? ? --- Backtesting Signals Type --- ? ")       // INPUT

rsi_OB_buy      = (rsi < rsiLineD or rsi[1] < rsiLineD[1] or rsi[2] < rsiLineD[2] or rsi[3] < rsiLineD[3] or rsi[4] < rsiLineD[4] or rsi[5] < rsiLineD[5]) and rsiBuySignal 
plotshape(RSI_OS_OB ? rsi_OB_buy : na, title="RSI OB + Cross", style=shape.circle, location=location.bottom, color=color.lime, size=size.tiny)
rsi_OS_sell     = (rsi > rsiLineU or rsi[1] > rsiLineU[1] or rsi[2] > rsiLineU[2] or rsi[3] > rsiLineU[3] or rsi[4] > rsiLineU[4] or rsi[5] > rsiLineU[5]) and maSellSignal 
plotshape(RSI_OS_OB ? rsi_OS_sell : na, title="RSI OS + Cross", style=shape.circle, location=location.top, color=color.red, size=size.tiny)

if rsi_OB_buy and RSI_OS_OB and inDateRange
    strategy.entry("RSI-OBOS x WMA", strategy.long)
if rsi_OS_sell and RSI_OS_OB and inDateRange
    strategy.close("RSI-OBOS x WMA", comment="x")
if (not inDateRange)
    strategy.close_all()

////////////////////////////////////////////////////////////////////////////////

rsi_OB_OS       = input(false, "RSI Over Sold/Bought",group="? ? --- Backtesting Signals Type --- ? ")       // INPUT

rsiBuy          = crossover(rsi , rsiLineD)
rsiSell         = crossunder(rsi, rsiLineU)
rsiExit         = crossunder(rsi, rsiLineD)

plotshape(rsi_OB_OS ? rsiBuy : na, title="RSI OB", style=shape.cross, location=location.bottom, color=color.purple)
plotshape(rsi_OB_OS ? crossunder(rsi, rsiLineU) : na, title="RSI OS", style=shape.cross, location=location.top, color=color.purple)
plotshape(rsi_OB_OS ? rsiExit : na, title="RSI OS", style=shape.cross, location=location.bottom, color=color.red)

if rsiBuy and rsi_OB_OS and inDateRange
    strategy.entry("RSI OB", strategy.long)
if (rsiSell or rsiExit) and rsi_OB_OS and inDateRange
    strategy.close("RSI OB", comment="x")
if (not inDateRange)
    strategy.close_all()
    
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

With_MA_Vis     = input(true , title="With MA Signal)", inline="WITH MA", group="With MA")
withMA_type     = input(title="", defval="SMA", options=["EMA","SMA","WMA","VWMA"], inline="WITH MA", group="With MA")
with_MALen      = input(title="", defval=9, type=input.integer, inline="WITH MA", group="With MA")

// TAKE-PROFIT / STOP-LOSS 
Stop_Take_Vis   = input(true, "TP-SL")
LongSLValue     = input(title="SL %", type=input.float, defval=3, minval=0.5) * 0.01
LongTPValue     = input(title="TP %", type=input.float, defval=15, minval=0.5) * 0.01

LongSLDetermine = strategy.position_avg_price * (1 - LongSLValue)
LongTPDetermine = strategy.position_avg_price * (1 + LongTPValue)
//////////////////////////

with_ma     = WithMA(close, with_MALen, withMA_type)

Close_buy_MA    = crossover(close , with_ma)
Close_sell_MA   = crossunder(close , with_ma)

// PLOT OPTION
WithMaSignal    = input(true, "MA + RSI x Trending-MA",group="With MA")       // INPUT

// CONDITION IN VARIABLE
withMA_RSI_BUY  = (Close_buy_MA and rsiBuySignal) and WithMaSignal and inDateRange
withMA_RSI_SELL = (Close_sell_MA and rsiSellSignal) and WithMaSignal and inDateRange

// PLOT ING
plotshape(WithMaSignal ? withMA_RSI_BUY : na, title="With MA", style=shape.diamond, location=location.bottom, color=color.aqua)
plotshape(WithMaSignal ? withMA_RSI_SELL : na, title="With MA", style=shape.diamond, location=location.top, color=color.aqua)


if withMA_RSI_BUY
    strategy.entry("MA + RSIxWMA", strategy.long)
if withMA_RSI_SELL
    strategy.close("MA + RSIxWMA", comment="x")
if (not inDateRange)
    strategy.close_all()

// FOR SL - TP
if (strategy.position_size > 0) and Stop_Take_Vis
    strategy.exit("BUY", stop=LongSLDetermine, limit=LongTPDetermine)

```

> Detail

https://www.fmz.com/strategy/429393

> Last Modified

2023-10-16 16:31:28
