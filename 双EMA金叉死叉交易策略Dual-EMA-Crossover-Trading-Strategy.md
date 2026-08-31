
> Name

双EMA金叉死叉交易策略Dual-EMA-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/118b11e6819d1c5863f.png)


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
