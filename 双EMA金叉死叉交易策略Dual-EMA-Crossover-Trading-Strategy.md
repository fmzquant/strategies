
> Name

双EMA金叉死叉交易策略Dual-EMA-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/118b11e6819d1c5863f.png)

[trans]


### 概述

本策略运用双EMA均线的金叉死叉来判断入场和出场时机。具体来说,当快EMA线从下方向上突破慢EMA线时产生金叉信号,做多;当快EMA线从上方向下跌破慢EMA线时产生死叉信号,做空。该策略简单易行,是一种非常常见的交易策略。

### 策略原理

该策略的核心代码如下:

```pine
fast = input(25, title="Fast") 
slow = input(75, title="Slow")

matype1=ema(source, fast)
matype2=ema(source, slow)

longCondition = crossover(matype1, matype2) 
shortCondition = crossunder(matype1, matype2)

if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)  
    strategy.entry("Short", strategy.short)
```

该策略首先设置快慢两个EMA均线,其中快EMA线周期为25,慢EMA线周期为75。然后计算两条EMA线的值。当快EMA线从下方向上突破慢EMA线时,产生longCondition条件为真;当快EMA从上方向下跌破慢EMA时,产生shortCondition条件为真。满足相应条件时,做多或做空。

该策略利用了EMA均线的平滑特点,可以有效过滤市场Noise,同时又能快速捕捉趋势的变化。两条EMA均线间的金叉死叉交叉为一个较强的交易信号,可以有效控制交易风险。

### 优势分析

该策略有以下几点优势:

1. 操作思路简单直观,容易理解实现。

2. 利用EMA平滑市场波动,有效过滤False Signal。

3. 金叉死叉是较强的交易信号,可以有效控制风险。

4. 可灵活调整EMA周期,适用于不同市场环境。

5. 容易与其他技术指标组合使用。

6. 可通过优化EMA参数来获得更好的策略效果。

### 风险分析 

该策略也存在一些风险:

1. 在震荡行情中,EMA交叉频繁,会产生大量无效交易信号。

2. EMA具有滞后性,可能错过短线机会。

3. 仅靠EMA交叉无法确定趋势转折点,存在一定盈利上限。

4. 固定的EMA周期不能适应市场的变化。

5. 需要较强的资金支持,否则衍生风险大。

6. 需要严格的止损约束,否则单笔损失可能很大。

### 优化方向

该策略可以从以下几个方面进行优化:

1. 优化EMA周期参数,适应不同市场情况。

2. 增加其他指标过滤,如MACD、布林带等,提高信号质量。 

3. 增加趋势判断指标,如ATR止损、ADX等,减少无效交易。

4. 结合更多时间周期分析,判断趋势方向。

5. 利用机器学习方法动态优化EMA周期。

6. 优化仓位管理,以控制风险。

7. 优化止损策略,降低单笔损失。

### 总结

本策略运用双EMA均线的金叉死叉交叉作为交易信号,形成一个较为经典的趋势跟随策略。该策略简单易行,容易与其他技术指标组合,适用于对趋势判断要求不高的投资者。但也存在一定的盈利上限和风险,需要进行适当优化以适应不同市场环境。总体来说,该策略提供了一个非常好的策略开发基础,可供投资者进行深入研究。

||

## Overview

This strategy uses the golden cross and death cross of dual EMA lines to determine entry and exit timing. Specifically, when the fast EMA line crosses above the slow EMA line from the bottom, a golden cross signal is generated for long entry. When the fast EMA line crosses below the slow EMA line from the top, a death cross signal is generated for short entry. This strategy is simple and easy to implement, and is a very common trading strategy.

## Strategy Logic

The core code of this strategy is as follows:

```pine
fast = input(25, title="Fast")
slow = input(75, title="Slow") 

matype1=ema(source, fast)
matype2=ema(source, slow)

longCondition = crossover(matype1, matype2)
shortCondition = crossunder(matype1, matype2) 

if (longCondition)
    strategy.entry("Long", strategy.long)
     
if (shortCondition)
    strategy.entry("Short", strategy.short) 
```

This strategy first sets two EMA lines, with the fast EMA period as 25 and slow EMA period as 75. It then calculates the values of the two EMA lines. When the fast EMA crosses above the slow EMA, the longCondition becomes true. When the fast EMA crosses below the slow EMA, the shortCondition becomes true. Upon the corresponding conditions being true, it goes long or short.

This strategy utilizes the smoothing feature of EMA to filter market noise, while being able to quickly capture trend changes. The golden and death crosses between the two EMA lines form relatively strong trading signals, which can effectively control trading risk.

## Advantage Analysis

The advantages of this strategy include:

1. The logic is simple and intuitive, easy to understand and implement.

2. EMA smoothes market fluctuation and filters false signals effectively. 

3. Golden cross and death cross are strong trading signals to control risk.

4. Flexible EMA periods suit different market environments. 

5. Easy to combine with other technical indicators.

6. EMA parameters can be optimized for better results.

## Risk Analysis

The risks of this strategy include:

1. Frequent ineffective signals in range-bound markets as EMA crosses frequently.

2. Lagging of EMA may miss short-term opportunities. 

3. EMA crossover alone cannot identify trend reversal, limiting profit potential.

4. Fixed EMA periods cannot adapt to market changes.

5. Requires significant capital, otherwise magnifies risk.

6. Needs strict stop loss, otherwise single loss can be huge.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize EMA periods for different market conditions.

2. Add other filters like MACD, Bollinger Bands to improve signal quality.

3. Add trend judging indicators like ATR, ADX to reduce ineffective trades.

4. Incorporate multi-timeframe analysis to determine trend direction. 

5. Use machine learning to dynamically optimize EMA periods.

6. Optimize position sizing to control risk.

7. Optimize stop loss strategies to limit single loss.

## Summary 

This strategy uses dual EMA golden cross and death cross as trading signals, forming a classical trend following strategy. It is simple and easy to implement, and can be combined with other indicators, suiting investors with relatively low requirements on trend judgment. But it also has profit limits and risks, requiring proper optimizations for different market environments. Overall, it provides an excellent basis for strategy development and in-depth research.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|ema|matype|
|v_input_2|false|hidema|
|v_input_3_close|0|Source Type: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|true|Start Date|
|v_input_5|true|Start Month|
|v_input_6|2020|Start Year|
|v_input_7|25|Fast|
|v_input_8|75|Slow|
|v_input_9|21|length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-16 00:00:00
end: 2023-10-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// Double EMA CROSS By © EmreE (Emre Ertürk) Also thx for KivancOzbilgic color based bars

//@version=4
strategy(title="Double EMA CROSS", shorttitle="DEC", overlay=true)

matype = input("ema")
hidema = input(false)
sourcetype = input(close, title="Source Type")
source=close
 
// STEP 1:
// Configure backtest start date with inputs
startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=231)
startMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12) 
startYear = input(title="Start Year", type=input.integer,
     defval=2020, minval=1800, maxval=2100)

// STEP 2:
// See if this bar's time happened on/after start date
afterStartDate = (time >= timestamp(syminfo.timezone,
     startYear, startMonth, startDate, 0, 0))

fast = input(25, title="Fast")
slow = input(75, title="Slow")

matype1=ema(source, fast)
matype2=ema(source, slow)


signalcolor = source > matype2 ? color.blue : color.red
signal = cross(fast, slow) 



hizliema=plot(hidema ? na : matype1, color=color.green, linewidth=2,transp=0, title="Fast EMA")
yavasema=plot(hidema ? na : matype2, color=color.red, linewidth=2,transp=0, title="Slow EMA")
//kesisme=plot(signal, style=cross, color=signalcolor, linewidth=5, title="Kesişme")
 

longCondition = crossover(matype1, matype2)
if (afterStartDate and longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = crossunder(matype1, matype2)
if (afterStartDate and shortCondition)
    strategy.entry("Short", strategy.short)
    

//--------------------------------------------------------

//volume based color bars
length=input(21, "length", minval=1)
avrg=sma(volume,length)

vold1 = volume > avrg*1.5 and close<open
vold2 = volume >= avrg*0.5 and volume<=avrg*1.5 and close<open
vold3 = volume < avrg *0.5 and close<open

volu1 = volume > avrg*1.5 and close>open
volu2 = volume >= avrg*0.5 and volume<=avrg*1.5 and close>open
volu3 = volume< avrg*0.5 and close>open

cold1=#800000
cold2=#FF0000
cold3=color.orange

colu1=#006400
colu2=color.lime
colu3=#7FFFD4

ac = vold1 ? cold1 : vold2 ? cold2 : vold3 ? cold3 : volu1 ? colu1 : volu2 ? colu2 : volu3 ? colu3 : na

barcolor(ac)
```

> Detail

https://www.fmz.com/strategy/429465

> Last Modified

2023-10-17 13:56:54
