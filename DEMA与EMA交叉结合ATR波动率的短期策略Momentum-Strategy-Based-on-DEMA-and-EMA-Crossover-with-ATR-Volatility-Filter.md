
> Name

DEMA与EMA交叉结合ATR波动率的短期策略Momentum-Strategy-Based-on-DEMA-and-EMA-Crossover-with-ATR-Volatility-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b488db58e83fef8104.png)

## I. Strategy Overview  

This strategy is named "Momentum Strategy Based on DEMA and EMA Crossover with ATR Volatility Filter". It generates short-term trading signals by detecting DEMA and EMA crossovers combined with the ATR volatility index. When DEMA crosses below EMA while ATR rises, it shorts the security. When DEMA re-crosses above EMA, it closes the position.

## II. Strategy Logic   

1. Calculate the DEMA indicator. DEMA is the Double Exponential Moving Average using dual EMAs, which can filter out short-term market noise and improve signal accuracy.

2. Calculate the EMA indicator. EMA is the Exponential Moving Average which reacts faster to price changes.

3. Calculate the ATR volatility index. ATR measures market volatility and risk levels. Rising ATR represents increasing volatility and higher likelihood of short-term pullbacks.  

4. When DEMA crosses below EMA and ATR rises above the threshold, it signals the start of a short-term downtrend and increased market risk. The strategy shorts the security.

5. When DEMA re-crosses above EMA, it signals a price support and upside bounce. The strategy closes the short position.

## III. Advantages

1. The combination of dual EMA and EMA can effectively improve signal accuracy.  

2. The ATR volatility filter eliminates low risk whipsaw trades.

3. Short holding period fits short-term momentum tracking and avoids prolonged hedging. 

4. Simple and clear logic, easy to understand and implement.

## IV. Risks  

1. Improper ATR parameters may miss trading opportunities.  

2. Need to monitor both long and short signals simultaneously, increasing operation difficulty.

3. Affected by short-term market volatility.

Solutions: Parameter optimization through backtesting. Simplify logic to focus on one side. Relax stop loss levels appropriately.  

## V. Optimization Directions   

1. Optimize parameters for DEMA and EMA to find best combinations.  

2. Optimize ATR lookback period to determine optimal volatility benchmark.

3. Add other indicators like BOLL Bands to improve signal accuracy.  

4. Introduce stop loss and take profit rules to lock in more consistent profits.

## VI. Conclusion

This strategy constructs a simple yet effective short-term trading system using DEMA, EMA crossovers and the ATR volatility index. The clean logic and ease of operation make it suitable for high-frequency momentum trading. Further parameter and logic optimization can potentially yield more steady outperformance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|DEMA LENGTH|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|25|EMA Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|false|Offset|
|v_input_6|D|ATR Timeframe|
|v_input_7|14|ATR Lookback Period|
|v_input_8|true|Show Moving Average?|
|v_input_9|0|Moving Average Type: EMA|SMA|
|v_input_10|20|Moving Average Period|
|v_input_11|5|Stop Loss ATR / %|
|v_input_12|true|SL Multiplier|
|v_input_13|20|Minimum profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-08 00:00:00
end: 2024-01-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Qorbanjf

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Qorbanjf

//@version=4
strategy("Qorban: DEMA/EMA & VOL Short ONLY", shorttitle="DEMA/EMA & VOL SHORT", overlay=true)

// DEMA
length = input(10, minval=1, title="DEMA LENGTH")
src = input(close, title="Source")
e1 = ema(src, length)
e2 = ema(e1, length)
dema1 = 2 * e1 - e2
plot(dema1, "DEMA", color=color.yellow)

//EMA
len = input(25, minval=1, title="EMA Length")
srb = input(close, title="Source")
offset = input(title="Offset", type=input.integer, defval=0, minval=-500, maxval=500)
ema1 = ema(srb, len)
plot(ema1, title="EMA", color=color.blue, offset=offset)

// get ATR VALUE
atr = atr(14)

//ATRP (Average True Price in precentage)

// Inputs
atrTimeFrame = input("D", title="ATR Timeframe", type=input.resolution)
atrLookback = input(defval=14,title="ATR Lookback Period",type=input.integer)
useMA = input(title = "Show Moving Average?", type = input.bool, defval = true)
maType = input(defval="EMA", options=["EMA", "SMA"], title = "Moving Average Type")
maLength = input(defval = 20, title = "Moving Average Period", minval = 1)
slType = input(title="Stop Loss ATR / %", type=input.float, defval=5.0, step=0.1)
slMulti = input(title="SL Multiplier", type=input.float, defval=1.0, step=0.1)
minimumProfitPercent = input(title="Minimum profit %", type=input.float, defval=20.00)

// ATR Logic
// atrValue = atr(atrLookback)
// atrp = (atrValue/close)*100
// plot(atrp, color=color.white, linewidth=2, transp = 30)

atrValue = security(syminfo.tickerid, atrTimeFrame, atr(atrLookback))
atrp = (atrValue/close)*100

// Moving Average Logic
ma(maType, src, length) =>
    maType == "EMA" ? ema(src, length) : sma(src, length) //Ternary Operator (if maType equals EMA, then do ema calc, else do sma calc)
maFilter = security(syminfo.tickerid, atrTimeFrame, ma(maType, atrp, maLength))


// Determine percentage of open profit
var entry = 0.0
distanceProfit = low - entry
distanceProfitPercent = distanceProfit / entry

//Determin if we have a long entry signal OR a sell position signal
profitSignal = minimumProfitPercent == 0.0 or distanceProfitPercent >= minimumProfitPercent
shortSignal = crossunder(dema1, ema1) and atrp > maFilter and strategy.position_size == 0 and not na(atr)
exitSignal = profitSignal and strategy.position_size !=0 and  crossover(dema1, ema1)


// === INPUT BACKTEST RANGE ===
//FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
//FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
//FromYear  = input(defval = 2017, title = "From Year", minval = 2000)
//ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
//ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
//ToYear    = input(defval = 9999, title = "To Year", minval = 2017)

//Invert trade direction & flipping 
//tradInvert = input(defval = false, title = "invert trade direction")
//MOM_MR = input(defval=1, title = "MOM = 1 / MR = -1", minval=-1, maxval=1)
//plots=input(false, title="Show plots?")

// Get stop loss (in pips AND percentage distance)
shortStop = highest(high, 4) - (atr * slMulti)
shortStopPercent = close - (close * slMulti)

// Save long stop & target prices (used for drawing data to the chart & deetermining profit)
var shortStopSaved = 0.0
var shortTargetSaved = 0.0
enterShort = false
if shortSignal
    shortStopSaved := slType ? shortStop : shortStopPercent
    enterShort:= true
    entry := close


// long conditions 
//enterLong = crossover(dema1, ema1) and atrp < maFilter
//exitSignal => crossunder(dema1, ema1)

//Enter trades when conditions are met
strategy.entry("short", strategy.short, when=enterShort, comment="SHORT")

//place exit orders (only executed after trades are active)
strategy.exit(id="Short exit",
 from_entry="short",
 limit=exitSignal ? close : na,
 stop=shortStopSaved,
 when=strategy.position_size > 0,
 comment="end short")
 

//short strategy
//goShort() => crossunder(dema1, ema1) and atrp > maFilter
//KillShort() => crossover(dema1, ema1) 
//strategy.entry("SHORT", strategy.short, when = goShort())
//strategy.close("COVER", when = KillShort())

```

> Detail

https://www.fmz.com/strategy/438032

> Last Modified

2024-01-08 14:14:57
