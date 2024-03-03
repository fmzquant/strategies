
> Name

双波震动过滤交易策略Twin-Range-Filter-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9d60a6061247fbea15.png)
[trans]

## 概述

双波震动过滤策略是一种基于价格波动性的交易策略。它利用两个不同参数设置的平均波动范围指标,结合价格与波动范围的关系,产生交易信号。该策略适用于比特币等具有高波动性的数字资产。

## 策略原理

该策略使用两个不同周期长度的平滑波动范围指标:快速波动范围指标(默认周期27)和慢速波动范围指标(默认周期55)。波动范围指标的计算公式是:当前周期价格波动幅度的指数移动平均乘以一个倍数(如1.6)。 

双波震动过滤策略则是比较价格与两个波动范围指标的关系,判断目前是否处于一定幅度的震荡区间内。当价格突破该震荡区间时,产生交易信号。

具体来说,策略以中值线为基准,中值线为两个波动范围指标的平均值。当价格上方超过中值线一个快速波动范围时产生做多信号;当价格下方低于中值线一个快速波动范围时产生做空信号。

为了过滤误报,该策略还加入了一个条件:只有当价格与之前一个周期的价格走向一致时,才产生信号。例如,只有当价格上涨且超过中值线一个波动范围时,才产生做多信号。

总而言之,该策略利用双波动范围指标识别震荡区间,以价格突破震荡区间为信号,产生交易指令。同时加入价格方向过滤,以减少错误信号。

## 策略优势

双波震动过滤策略的优势有:

1. 利用价格波动性特征,能适应比特币等高波动率资产。双波动范围指标能更准确定位价格震荡区间。

2. 双波动范围指标包含不同时间长度。快速指标能捕捉短期突破机会,慢速指标考虑长期趋势。

3. 加入价格方向过滤条件,可以减少因短期动荡造成的错误信号。

4. 交易逻辑简单清晰,容易理解实现,适合量化交易。

## 策略风险

双波震动过滤策略也存在一些风险需要注意:

1. 依赖波动率指标,在低波动市场中效果可能不佳。

2. 波动范围参数需要针对不同品种调整优化,否则会错过交易机会或产生错误信号。

3. 未考虑价格背离于波动率的情况。当波动率上升而价格没有对应涨幅时,可能发出错误信号。

4. 在高波动环境中,止损点设定可能需要调整。过于激进的止损会频繁止损。

## 策略优化

该策略可从以下几个方面进行优化:

1. 对波动范围参数进行测试和优化,找到不同品种不同周期的最优参数组合。

2. 加入根据最近波动率动态调整止损位置的机制,优化止损策略。

3. 增加基于价格与波动率背离的过滤条件,避免错误信号。

4. 结合其他指标,如交易量变化,增加入场确定性。

5. 测试并加入适合策略的止盈退出机制。

## 总结

双波震动过滤策略整体来说是一个针对高波动资产的有效交易策略。它正确利用价格波动特征,产生了简单清晰的交易逻辑。通过参数优化、风险管理等进一步完善,该策略可以成为量化交易体系中的一个有价值的组成部分。它也为我们提供了一个基于市场波动性特征进行算法交易的思路。
|| 


## Overview

The Twin Range Filter strategy is a trading strategy based on price volatility. It utilizes two average range indicators with different parameter settings, combined with the relationship between price and range, to generate trading signals. This strategy is suitable for highly volatile digital assets like Bitcoin.

## Strategy Logic  

This strategy uses two smooth range indicators with different period lengths: a fast range indicator (default period 27) and a slow range indicator (default period 55). The range indicator formula is: exponential moving average of current period price range multiplied by a factor (such as 1.6).

The Twin Range Filter strategy compares the price with the two range indicators to determine if it is currently within a certain oscillation range. Trading signals are generated when the price breaks through this oscillation range. 

Specifically, the strategy uses a median line as the benchmark, which is the average of the two range indicators. A long signal is generated when the price is above the median line by one fast range; a short signal is generated when the price falls below the median line by one fast range.

To filter false signals, it also adds a condition: a signal is only generated when the current price move is consistent with the previous period. For example, a long signal is only triggered when the price rises and exceeds the median line by one range.

In summary, this strategy identifies the oscillation range with twin range indicators, and generates orders when the price breaks through the range. Price direction filters are added to reduce false signals.

## Advantages

The advantages of the Twin Range Filter strategy:

1. Utilizes price volatility features, adaptable to highly volatile assets like Bitcoin. The twin range indicators can locate price ranges more precisely. 

2. The twin range indicators contain different timeframes. The fast one catches short-term opportunities, while the slow one considers long-term trends.

3. Adding price direction filters reduces false signals from short-term fluctuations. 

4. Simple and clear logic, easy to understand and implement, suitable for algo trading.

## Risks

Some risks of the strategy to note:

1. Relies on volatility indicators, may underperform in low volatility environments.

2. Range parameters need to be optimized for different products, otherwise trading opportunities may be missed or false signals occur.

3. Divergence between price and volatility is not considered. False signals may occur if volatility rises without corresponding price increase.

4. Stop loss levels may need adjustment in high volatility environments. Overly tight stops cause excessive stop outs.

## Enhancement

The strategy can be enhanced in several aspects:

1. Test and optimize range parameters to find optimal combinations for different products and timeframes.

2. Add dynamic stop loss mechanisms based on recent volatility, to optimize stop loss strategy. 

3. Add filters based on price-volatility divergence to avoid false signals.

4. Incorporate other indicators like volume changes to increase entry certainty.

5. Test and add appropriate profit taking exit mechanisms suitable for the strategy.

## Summary

Overall, the Twin Range Filter is an effective trading strategy for highly volatile assets. It utilizes price volatility characteristics well and generates simple and clear trading logic. With further improvements like parameter optimization and risk management, it can become a valuable component in a quant trading system. It also provides insight into algorithmic trading based on market volatility features.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|27|Fast period|
|v_input_3|1.6|Fast range|
|v_input_4|55|Slow period|
|v_input_5|2|Slow range|
|v_input_6|false|Following conditions and backtest algorithm are added by @greenmask9 ?, original script is written by @colinmck ?. Read both of their's release notes for more info on how this script works.|
|v_input_7|false|Disable greenmask9's ATR conditions|
|v_input_8|32|ATR1|
|v_input_9|0|Smoothing: SMA|RMA|EMA|WMA|
|v_input_10|64|ATR2|
|v_input_11|0|Smoothing: RMA|SMA|EMA|WMA|
|v_input_12|900|Ticks profit|
|v_input_13|300|Ticks stoploss|
|v_input_14|17|Time stoploss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-05 00:00:00
end: 2023-11-12 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © colinmck, greenmask9

//@version=4

strategy(title="Twin Range Filter Algo", overlay=true)

source = input(defval=close, title="Source")

// Smooth Average Range

per1 = input(defval=27, minval=1, title="Fast period")
mult1 = input(defval=1.6, minval=0.1, title="Fast range")

per2 = input(defval=55, minval=1, title="Slow period")
mult2 = input(defval=2, minval=0.1, title="Slow range")

smoothrng(x, t, m) =>
    wper = t * 2 - 1
    avrng = ema(abs(x - x[1]), t)
    smoothrng = ema(avrng, wper) * m
    smoothrng
smrng1 = smoothrng(source, per1, mult1)
smrng2 = smoothrng(source, per2, mult2)
smrng = (smrng1 + smrng2) / 2

// Range Filter

rngfilt(x, r) =>
    rngfilt = x
    rngfilt := x > nz(rngfilt[1]) ? x - r < nz(rngfilt[1]) ? nz(rngfilt[1]) : x - r : 
       x + r > nz(rngfilt[1]) ? nz(rngfilt[1]) : x + r
    rngfilt
filt = rngfilt(source, smrng)

upward = 0.0
upward := filt > filt[1] ? nz(upward[1]) + 1 : filt < filt[1] ? 0 : nz(upward[1])
downward = 0.0
downward := filt < filt[1] ? nz(downward[1]) + 1 : filt > filt[1] ? 0 : nz(downward[1])

hband = filt + smrng
lband = filt - smrng

longCond = bool(na)
shortCond = bool(na)
longCond := source > filt and source > source[1] and upward > 0 or source > filt and source < source[1] and upward > 0
shortCond := source < filt and source < source[1] and downward > 0 or source < filt and source > source[1] and downward > 0

CondIni = 0
CondIni := longCond ? 1 : shortCond ? -1 : CondIni[1]

long = longCond and CondIni[1] == -1
short = shortCond and CondIni[1] == 1

// Plotting

// Strategy
// From this part on, programmer is greenmaks9
//
Separator = input(title="Following conditions and backtest algorithm are added by @greenmask9 ?, original script is written by @colinmck ?. Read both of their's release notes for more info on how this script works.", type=input.bool, defval=false)
disabler = input(title="Disable greenmask9's ATR conditions", type=input.bool, defval=false)

//second
l2 = input(title="ATR1", defval=32, minval=1)
s2 = input(title="Smoothing", defval="SMA", options=["RMA", "SMA", "EMA", "WMA"])
atr2(source, l2) => 
    if s2 == "SMA"
        sma(source, l2)
    else
        if s2 == "RMA"
            rma(source, l2)
        else
            if s2 == "EMA"
                ema(source, l2)
            else
                wma(source, l2)

//third
l3 = input(title="ATR2", defval=64, minval=1)
s3 = input(title="Smoothing", defval="RMA", options=["RMA", "SMA", "EMA", "WMA"])
atr3(source, l3) => 
    if s3 == "RMA"
        rma(source, l3)
    else
        if s3 == "SMA"
            sma(source, l3)
        else
            if s3 == "EMA"
                ema(source, l3)
            else
                wma(source, l3)

atr20=atr2(tr(true), l2)
atr30=atr3(tr(true), l3)
strategy.initial_capital = 50000
ordersize=floor(strategy.initial_capital/close)
profit = input(title="Ticks profit", type=input.integer, defval=900)
stop = input(title="Ticks stoploss", type=input.integer, defval=300)
maxcandles_till_close = input(title="Time stoploss", type=input.integer, defval=17)


bull = long and (atr20<atr30 or disabler)
bear = short and (atr20<atr30 or disabler)

bullclock = barssince(bull)
bearclock = barssince(bear)

if (bull)
    strategy.entry("Twin Long", strategy.long, ordersize)
    strategy.exit("Exit", from_entry =  "Twin Long", profit = profit, loss = stop)

if (bear)
    strategy.entry("Twin Short", strategy.short, ordersize)
    strategy.exit("Exit", from_entry = "Twin Short", profit = profit, loss = stop)

//time stoploss
strategy.close("Twin Long", when = bullclock == maxcandles_till_close, comment = "Timed out")
strategy.close("Twin Short", when = bearclock == maxcandles_till_close, comment = "Timed out")


```

> Detail

https://www.fmz.com/strategy/431896

> Last Modified

2023-11-13 10:38:20
