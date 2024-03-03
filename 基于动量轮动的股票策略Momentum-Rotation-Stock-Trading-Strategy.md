
> Name

基于动量轮动的股票策略Momentum-Rotation-Stock-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

本策略采用动量轮动的方式,根据Stoch RSI指标判断市场趋势,实现股票轮动交易。当指标显示超买时做空,显示超卖时做多。同时采用锥形加仓的方式,在趋势方向加大仓位。

## 策略原理

1. 计算RSI指标的值,长度为14周期
2. 根据RSI计算Stoch RSI指标,Stochastic Length为14,Smooth K为3,Smooth D为1
3. 当Stoch RSI从超卖区上扬进入超买区时,做多入场
4. 当Stoch RSI从超买区下落进入超卖区时,做空入场
5. 采用锥形加仓的方式,最多加仓5次
6. 每次加仓后设定止损位和追踪止损位
7. 当止损被触发后减仓
8. 按照止损点和追踪止损点来管理仓位

## 优势分析

这种策略具有以下优势:

1. 基于动量指标操作,能捕捉市场趋势的转折点,及时调整仓位方向。
2. 采用锥形加仓,能在趋势初期占据头寸,并在趋势确认后加大仓位,充分捕捉趋势利润。
3. 设定止损点来控制风险,Initial Stop Loss设在理性范围内,追踪止损让利润运行。
4. RSI参数优化 space较广,可针对不同市场调整参数,寻找最佳组合。
5. 可灵活的调整加仓次数,深度,止损点等参数,对市场有较强的适应性。

## 风险分析

该策略也存在一些风险需要注意:

1. Stoch RSI作为唯一指标,对突发事件易造成错误信号。可辅以其他指标确认。
2. 仅针对趋势性较强的品种适用,不适合横盘震荡市。
3. 加仓次数过多可能导致亏损扩大。需控制加仓深度。
4. 止损点设置不合理可能导致过度止损。需根据市场调整止损参数。
5. 需关注交易成本控制。过于频繁交易会产生大量手续费。

## 优化方向

该策略还可以从以下几个方向进行优化:

1. 优化RSI参数,寻找最佳Length。
2. 优化Stoch参数,寻找最佳K,D周期组合。
3. 增加其他指标过滤信号,避免误交易。
4. 动态调整加仓次数,根据市场调整加仓深度。
5. 优化止损点设置逻辑,降低止损率。
6. 增加仓位管理模块,根据资金管理原则控制仓位。
7. 加入手续费控制模块,控制过高交易频率。

## 总结

本策略整体采用较为成熟的动量轮动思路,以Stoch RSI为核心交易指标,辅以锥形加仓和止损管理进行风险控制,是一种可靠的趋势跟踪策略。通过参数优化和模块扩展,可以进一步增强策略的稳定性和适应性。但整体而言,本策略已经具备较强的实盘运用能力。

|| 

## Overview

This strategy adopts momentum rotation to determine market trends based on the Stoch RSI indicator, and implement stock rotation trading. It goes short when the indicator shows overbought and goes long when it shows oversold. At the same time, the position size is increased in the trend direction using pyramid trading.

## Strategy Logic

1. Calculate the RSI with length of 14 periods
2. Calculate the Stoch RSI based on RSI, with Stochastic Length 14, Smooth K 3, and Smooth D 1
3. Go long when Stoch RSI rises from oversold into overbought 
4. Go short when Stoch RSI falls from overbought into oversold
5. Use pyramid trading to add position up to 5 times 
6. Set stop loss and trailing stop after each add
7. Reduce position when stop loss is triggered
8. Manage positions based on stop loss and trailing stop

## Advantage Analysis 

The advantages of this strategy are:

1. Based on momentum indicator, it can capture trend reversal timely and adjust position direction accordingly. 
2. Pyramid trading allows taking early position with small size and adding to it as trend confirms, fully capturing trend profits.
3. Stop loss controls risk. Initial stop filters noise and trailing stop locks profits.
4. RSI optimization space is big, parameters can be adjusted for different markets.
5. Flexible add times, size and stops adapts well to different market conditions.

## Risk Analysis

Some risks to note:

1. Relying solely on Stoch RSI leaves it vulnerable to sudden events. Confirm with other indicators.
2. Only applies to strongly trending products. Avoid choppy sideways markets.
3. Excessive adds may lead to amplified losses. Control add depth. 
4. Improper stop loss setting may cause overstop. Adjust stops based on market.
5. Monitor transaction costs. High frequency trading generates heavy commissions.

## Optimization Directions

Some ways to optimize the strategy:

1. Optimize RSI Length parameter for best fit.
2. Optimize Stoch K and D periods for smoother signals. 
3. Add other indicators to filter signals and avoid false trades.
4. Dynamically adjust add times based on market conditions.
5. Optimize stop loss logic to lower stop rate.
6. Add position sizing module based on money management. 
7. Include commission control to limit high-frequency trading.

## Conclusion

The strategy adopts a mature momentum rotation concept, with Stoch RSI as core trading indicator, complemented by pyramid trading and stop management for risk control. It is a reliable trend following strategy. Further optimizations on parameters and modules can enhance its stability and adaptability. But overall, it already has strong real-trading capabilities.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Pyramiding|
|v_input_2|80|SL Pips|
|v_input_3|60|Trail Trig|
|v_input_4|60|Trail Offset|
|v_input_5|3|smoothK|
|v_input_6|true|smoothD|
|v_input_7|14|lengthRSI|
|v_input_8|14|lengthStoch|
|v_input_9_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-13 13:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This script was created for educational purposes only.
// © mcristianrios

// FEEL FREE TO DROP A COMMENT AND A LIKE IF YOU USE IT OR IT SERVES YOU WELL

//@version=4
//strategy(title="Pyramiding Strategy To Study [mcristianrios]", commission_type=strategy.commission.cash_per_contract, commission_value=0.0002, overlay=true, default_qty_value=1000, initial_capital=100, calc_on_order_fills=false, currency="USD", overlay=true, pyramiding=5)
// study(title="Pyramiding Strategy To Study [mcristianrios]", overlay=true)

int pyramiding            = input(1,  'Pyramiding', minval=1, maxval=5)
int slPips                = input(80, 'SL Pips')
int ttPips                = input(60, 'Trail Trig')
int trailOffset           = input(60, 'Trail Offset')

// === PYRAMIDING DECLARATION === {
var int   longPyramiding  = 0
var int   shortPyramiding = 0

// To save init of operation price
var float close1          = na
var float close2          = na
var float close3          = na
var float close4          = na
var float close5          = na

// How far did the Trailing Stop Get?
var float far1            = na
var float far2            = na
var float far3            = na
var float far4            = na
var float far5            = na
// }

// === STOCHASTIC RSI === {
smoothK                   = input(3, minval=1)
smoothD                   = input(1, minval=1)
lengthRSI                 = input(14, minval=1)
lengthStoch               = input(14, minval=1)
src                       = input(close, title="RSI Source")

rsi1                      = rsi(src, lengthRSI)
k                         = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d                         = sma(k, smoothD)
// }

// === SOME CONDITION TO TAKE A POSITION === {
goLong  = k[1] < 80 and k >= 80 and longPyramiding  < pyramiding
goShort = k[1] > 20 and k <= 20 and shortPyramiding < pyramiding
// }

// === PYRAMIDING SIMULATION === {
var string lastOperation = ''
if (goLong  and lastOperation != 'LONG') or (goShort and lastOperation != 'SHORT')
    // RESET
    longPyramiding           := 0
    shortPyramiding          := 0
    far1                     := na
    far2                     := na
    far3                     := na
    far4                     := na
    far5                     := na
    close1                   := na
    close2                   := na
    close3                   := na
    close4                   := na
    close5                   := na

// === SUM ONE INTO 'LONG' OR 'SHORT' PYRAMIDING AND REMEMBER LAST OPERATION TYPE === {
isCallOrShort = if goLong and longPyramiding < pyramiding
    lastOperation := 'LONG'
    longPyramiding := longPyramiding + 1

    true
else
    isShort = if goShort and shortPyramiding < pyramiding
        lastOperation := 'SHORT'
        shortPyramiding := shortPyramiding + 1

        true
    else
        false

    isShort
// }

// === SAVE CURRENT PRICE === {
if isCallOrShort
    if na(close1)
        close1 := close
    else
        if na(close2)
            close2 := close
        else
            if na(close3)
                close3 := close
            else
                if na(close4)
                    close4 := close
                else
                    if na(close5)
                        close5 := close
// }

if longPyramiding > 0
    // If Trail Stop was not triggered and distance is achieved saved it
    if na(far1) and high > close1 + syminfo.mintick * 10 * ttPips
        far1 := high
    if na(far2) and high > close2 + syminfo.mintick * 10 * ttPips
        far2 := high
    if na(far3) and high > close3 + syminfo.mintick * 10 * ttPips
        far3 := high
    if na(far4) and high > close4 + syminfo.mintick * 10 * ttPips
        far4 := high
    if na(far5) and high > close5 + syminfo.mintick * 10 * ttPips
        far5 := high
    
    // Update how far our position went
    if not na(far1) and high > far1
        far1 := high
    if not na(far2) and high > far2
        far2 := high
    if not na(far3) and high > far3
        far3 := high
    if not na(far4) and high > far4
        far4 := high
    if not na(far5) and high > far5
        far5 := high
        
    /// === SL not na(trailing stop) ? Use Trailing Stop : Use Default Stop Loss === {
    if not na(close1) and (not na(far1) ? low <= far1 - syminfo.mintick * 10 * trailOffset : low <= close1 - syminfo.mintick * 10 * slPips)
        longPyramiding := longPyramiding - 1
        close1         := na
        far1           := na
    if not na(close2) and (not na(far2) ? low <= far2 - syminfo.mintick * 10 * trailOffset : low <= close2 - syminfo.mintick * 10 * slPips)
        longPyramiding := longPyramiding - 1
        close2         := na
        far2           := na
    if not na(close3) and (not na(far3) ? low <= far3 - syminfo.mintick * 10 * trailOffset : low <= close3 - syminfo.mintick * 10 * slPips)
        longPyramiding := longPyramiding - 1
        close3         := na
        far3           := na
    if not na(close4) and (not na(far4) ? low <= far4 - syminfo.mintick * 10 * trailOffset : low <= close4 - syminfo.mintick * 10 * slPips)
        longPyramiding := longPyramiding - 1
        close4         := na
        far4           := na
    if not na(close5) and (not na(far5) ? low <= far5 - syminfo.mintick * 10 * trailOffset : low <= close5 - syminfo.mintick * 10 * slPips)
        longPyramiding := longPyramiding - 1
        close5         := na
        far5           := na
    // }

// Log when long pyramiding changed
if longPyramiding[1] != longPyramiding[2]
    label.new(bar_index, high, tostring(longPyramiding[1]), xloc.bar_index, yloc.price, size = size.normal, color=color.blue, textcolor=color.white)

if shortPyramiding > 0
    // If Trail Stop was not triggered and distance is achieved saved it
    if na(far1) and low < close1 - syminfo.mintick * 10 * ttPips
        far1 := low
    if na(far2) and low < close2 - syminfo.mintick * 10 * ttPips
        far2 := low
    if na(far3) and low < close3 - syminfo.mintick * 10 * ttPips
        far3 := low
    if na(far4) and low < close4 - syminfo.mintick * 10 * ttPips
        far4 := low
    if na(far5) and low < close5 - syminfo.mintick * 10 * ttPips
        far5 := low
    
    // Update how far our position went
    if not na(far1) and low < far1
        far1 := low
    if not na(far2) and low < far2
        far2 := low
    if not na(far3) and low < far3
        far3 := low
    if not na(far4) and low < far4
        far4 := low
    if not na(far5) and low < far5
        far5 := low
        
    /// === SL not na(trailing stop) ? Use Trailing Stop : Use Default Stop Loss === {
    if not na(close1) and (not na(far1) ? high >= far1 + syminfo.mintick * 10 * trailOffset : high >= close1 + syminfo.mintick * 10 * slPips)
        shortPyramiding := shortPyramiding - 1
        close1          := na
        far1            := na
    if not na(close2) and (not na(far2) ? high >= far2 + syminfo.mintick * 10 * trailOffset : high >= close2 + syminfo.mintick * 10 * slPips)
        shortPyramiding := shortPyramiding - 1
        close2          := na
        far2            := na
    if not na(close3) and (not na(far3) ? high >= far3 + syminfo.mintick * 10 * trailOffset : high >= close3 + syminfo.mintick * 10 * slPips)
        shortPyramiding := shortPyramiding - 1
        close3          := na
        far3            := na
    if not na(close4) and (not na(far4) ? high >= far4 + syminfo.mintick * 10 * trailOffset : high >= close4 + syminfo.mintick * 10 * slPips)
        shortPyramiding := shortPyramiding - 1
        close4          := na
        far4            := na
    if not na(close5) and (not na(far5) ? high >= far5 + syminfo.mintick * 10 * trailOffset : high >= close5 + syminfo.mintick * 10 * slPips)
        shortPyramiding := shortPyramiding - 1
        close5          := na
        far5            := na
    // }

// Log when long pyramiding changed
if shortPyramiding[1] != shortPyramiding[2]
    label.new(bar_index, high + syminfo.mintick * 10 * 22, tostring(shortPyramiding[1]), xloc.bar_index, yloc.price, size = size.normal, color=color.red, textcolor=color.white)
// }

// === COMMENT IF STUDY === {
strategy.entry("Long",  strategy.long,  when = goLong  and longPyramiding  <= pyramiding)
strategy.entry("Short", strategy.short, when = goShort and shortPyramiding <= pyramiding)

strategy.exit("Exit Long",  "Long",  loss=slPips * 10, trail_points=ttPips * 10, trail_offset=trailOffset * 10)
strategy.exit("Exit Short", "Short", loss=slPips * 10, trail_points=ttPips * 10, trail_offset=trailOffset * 10)
// }

// === UNCOMMENT IF STUDY === {
// plot(ttPips,      title='TrailTrig',   color=na, display=display.none)
// plot(trailOffset, title='TrailOffset', color=na, display=display.none)
// plot(slPips,      title='LossPips',    color=na, display=display.none)

// string longTradeId     = 'tradeid=long{{ticker}}_PYRAMIDING_[MCRISTIANRIOS]'
// string shortTradeId    = 'tradeid=short{{ticker}}_PYRAMIDING_[MCRISTIANRIOS]'
// string basicTrade      = 'tradesymbol={{ticker}} sl={{plot("LossPips")}} trailtrig={{plot("TrailTrig")}} traildist={{plot("TrailOffset")}}'

// alertcondition(goLong  and longPyramiding  <= pyramiding, title='Long',   message='long '  + basicTrade + ' ' + longTradeId)
// alertcondition(goShort and shortPyramiding <= pyramiding, title='Short',  message='short ' + basicTrade + ' ' + shortTradeId)

// alertcondition(goLong  and longPyramiding  <= pyramiding, title='XShort', message='closepart part=1 ' + shortTradeId)
// alertcondition(goShort and shortPyramiding <= pyramiding, title='XLong',  message='closepart part=1 ' + longTradeId)
// }

// Background color for backtest
bgcolor(goLong[1] ? color.lime : goShort[1] ? color.red : na, transp=70)

```

> Detail

https://www.fmz.com/strategy/427314

> Last Modified

2023-09-19 22:14:24
