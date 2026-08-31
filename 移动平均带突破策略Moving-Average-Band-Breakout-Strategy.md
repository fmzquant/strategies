
> Name

移动平均带突破策略Moving-Average-Band-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses moving averages to form a price channel and generate signals when the price breaks out of the channel bands. It is a typical trend following strategy that can achieve simple long/short positions through parameter tuning.

## Strategy Logic

1. Calculate moving averages, with options like SMA/EMA/WMA/RMA. 

2. Upper band is certain percentage increment of moving average. Lower band is certain percentage decrement.

3. Go long on breaking above upper band, go short on breaking below lower band. Options for long-only, short-only or dual directional trading.

4. Set stop loss and take profit points. Take profit point is certain percentage increment of entry price. Stop loss point is certain percentage decrement of entry price.

## Advantage Analysis  

1. Simple to implement trend determination using moving averages.

2. Adjustable parameters accommodate different holding periods and risk preferences.

3. Optional long/short directions adapt to various market conditions. 

4. Fixed percentage stop loss and take profit allows controllability.

## Risk Analysis

1. Prone to being trapped when trend changes abruptly.

2. Improper parameter tuning risks over-trading or lagging. 

3. Fixed percentage stop loss/profit lacks flexibility. 

4. Increased trade frequency and commission costs with dual directional trading.

## Optimization Directions

1. Optimize moving average parameters to balance lagging and noise.

2. Optimize channel bandwidth to match market volatility frequency.

3. Test different stop loss and take profit configurations. Dynamic stops more effective.

4. Add trend and oscillation indicators to gauge overall market conditions. 

5. Implement time filters to avoid significant event impacts.

## Summary 

The strategy achieves simple trend following through moving average channels, but needs stronger parameter optimization and risk control. More technical indicators can then be introduced to further improve strategy logic.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|0|Moving Average Type: RMA|EMA|SMA|WMA|
|v_input_3|10|MA Period : 10|
|v_input_4|0.6|Band Gap : 0.6|
|v_input_5|500|# Stop Loss %|
|v_input_6|500|# Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-17 00:00:00
end: 2023-09-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © TaylorTneh
//@version=4

// strategy("Moving Average Band Taylor V1",shorttitle="MA Band+",overlay=true,default_qty_type=strategy.cash,default_qty_value=1000,initial_capital=1000,currency=currency.USD,commission_value=.1)

price = input(close, title="Source")
mabtype = input(title="Moving Average Type", defval="RMA", options=["SMA", "EMA", "RMA", "WMA"])
malen = input(10, "MA Period : 10")
magap = input(0.6, "Band Gap : 0.6", minval = -10, maxval = 10, step = 0.1)
mabup = if mabtype == "SMA"
    sma(high, malen)
else
    if mabtype == "EMA"
        ema(high, malen)
    else
        if mabtype == "WMA"
            wma(high, malen)
        else
            if mabtype == "RMA"
                rma(high, malen)
                    
mabdn = if mabtype == "SMA"
    sma(low, malen)
else
    if mabtype == "EMA"
        ema(low, malen)
    else
        if mabtype == "WMA"
            wma(low, malen)
        else
            if mabtype == "RMA"
                rma(low, malen)
                    
upex = mabup * (1 + magap/100)
dnex = mabdn * (1 - magap/100)
plot(upex, "Upper MA Band", color.orange)
plot(dnex, "Lower MA Band", color.orange)


//-------------------------------------------- (Strategy)
strategy.entry("Long", strategy.long, stop = upex)
strategy.entry("Short", strategy.short, stop = dnex)
//Long Only//strategy.entry("Long", strategy.long, stop = upex)
//Long Only//strategy.exit("Short", stop = dnex)
//Short Only//strategy.entry("Short", strategy.short, stop = dnex)
//Short Only//strategy.exit("Long", stop = upex)


//-------------------------------------------- (Take Profit & Stop Lose)
stopPer = input(500.0, title='# Stop Loss %', type=input.float) / 100
takePer = input(500.0, title='# Take Profit %', type=input.float) / 100
//Determine where you've entered and in what direction
longStop = strategy.position_avg_price * (1 - stopPer)
shortStop = strategy.position_avg_price * (1 + stopPer)
shortTake = strategy.position_avg_price * (1 - takePer)
longTake = strategy.position_avg_price * (1 + takePer)
if strategy.position_size > 0 
    strategy.exit(id="L-TP/SL", stop=longStop, limit=longTake)
if strategy.position_size < 0 
    strategy.exit(id="S-TP/SL", stop=shortStop, limit=shortTake)


//-------------------------------------------- (Sample Time Filter Strategy)
//fromyear = input(2018, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
//toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
//frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
//tomonth = input(10, defval = 10, minval = 01, maxval = 12, title = "To Month")
//fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
//today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")
//strategy.entry("Long", strategy.long, stop = upex, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
//strategy.entry("Short", strategy.short, stop = dnex, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
//--------------------------------------------

```

> Detail

https://www.fmz.com/strategy/427069

> Last Modified

2023-09-17 18:33:57
