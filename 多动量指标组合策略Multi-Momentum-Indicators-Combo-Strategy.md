
> Name

多动量指标组合策略Multi-Momentum-Indicators-Combo-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This experimental strategy combines Chande Momentum, RMI, Triple HMA RSI, Double EVW RSI, Triple EMA RSI and other momentum indicators, entering positions when all indicators give aligned signals. A multi-factor experimental model.

## Strategy Logic

1. Calculate Chande Momentum and set its buy and sell lines.

2. Calculate RMI, Triple HMA RSI, Double EVW RSI, Triple EMA RSI and other indicators. 

3. Set buy and sell lines for each indicator.

4. When Chande Momentum crosses above its buy line, check if other indicators are also below their respective buy lines. If all conditions are met, generate long signal.

5. Conversely, when Chande Momentum crosses below sell line, while other indicators exceed their sell lines, generate short signal.

## Advantages

1. Combining indicators provides mutual validation, avoiding false signals.

2. Chande Momentum sensitively captures trend changes.

3. RMI shows momentum levels for identifying overbought/oversold levels. 

4. Testing different RSI calculations with HMA RSI, EVW RSI etc.

5. Flexible multi-indicator combo allows indicator effectiveness testing.

## Risks

1. Requirements for multi-indicator combo are harder to meet, fewer trades, missing opportunities.

2. No risk control mechanisms like stop loss.

3. Indicator performance dependent on timeframe, may not work on all periods.

4. No parameter optimization, poor parameter tuning possible.

5. Insufficient backtest data to fully validate strategy.

Possible Solutions:

1. Loosen indicator thresholds for more trades.

2. Incorporate trailing or hard stop loss to limit losses.

3. Test across different products and timeframes to find optimal parameters.

4. Employ machine learning or grid search for parameter optimization.

5. Backtest on more markets to ensure robustness.

## Optimization Directions

1. Test different parameter sets to find optimal configuration.

2. Add adaptive multi-timescale momentum indicators.

3. Incorporate trend detection to avoid counter-trend trades. 

4. Use machine learning to improve multi-indicator weighting.

5. Combine with moving average system to improve entries.

## Summary

This strategy tries to identify more reliable trend turning points by combining multiple momentum indicators. The diversified logic has great extensibility and optimization potential in areas like parameter selection, indicator weighting, risk control etc, to acquire more quality signals while ensuring robustness, but risks like curve-fitting needs to be managed.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2021|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|999999|Backtest Stop Year|
|v_input_5|9|Backtest Stop Month|
|v_input_6|26|Backtest Stop Day|
|v_input_7_close|0|Price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|9|Alpha Chande Momentum Length|
|v_input_9|30|RMI Length|
|v_input_10|25|RMI Momentum |
|v_input_11|7|lengthMA|
|v_input_12|14|lengthRSI|
|v_input_13|7|lengthMA2|
|v_input_14|14|lengthRSI2|
|v_input_15|7|lengthMA3|
|v_input_16|14|lengthRSI3|
|v_input_17|false|Chande Sellline|
|v_input_18|false|Chande Buyline|
|v_input_19|false|Triple HMRSI Sellline|
|v_input_20|false|Triple HMRSI Buyline|
|v_input_21|false|DEVWRSI Sellline|
|v_input_22|false|DEVWRSI Buyline|
|v_input_23|false|TERSI Sellline|
|v_input_24|false|TERSI Buyline|
|v_input_25|false|RMI Sellline|
|v_input_26|false|RMI Buyline|
|v_input_27|false|RMI*RSI Sellline|
|v_input_28|false|RMI*RSI Buyline|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-24 00:00:00
end: 2023-09-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © burgercrisis

//@version=4
strategy("RMI + Triple HMRSI + Double EVWRSI + TERSI Strategy")

//* Backtesting Period Selector | Component *//
//* https://www.tradingview.com/script/eCC1cvxQ-Backtesting-Period-Selector-Component *//
//* https://www.tradingview.com/u/pbergden/ *//
//* Modifications made *//
testStartYear = input(2021, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(999999, "Backtest Stop Year")
testStopMonth = input(9, "Backtest Stop Month")
testStopDay = input(26, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => true
/////////////// END - Backtesting Period Selector | Component ///////////////


src = input(close, "Price", type = input.source)
CMOlength = input(9, minval=1, title="Alpha Chande Momentum Length")

//CMO
momm = change(src)
f1(m) => m >= 0.0 ? m : 0.0
f2(m) => m >= 0.0 ? 0.0 : -m
m1 = f1(momm)
m2 = f2(momm)
sm1 = sum(m1, CMOlength)
sm2 = sum(m2, CMOlength)
percent(nom, div) => 100 * nom / div
chandeMO = percent(sm1-sm2, sm1+sm2)
plot(chandeMO, "Chande MO", color=color.blue)




//RMI
// Copyright (c) 2018-present, Alex Orekhov (everget)
// Relative Momentum Index script may be freely distributed under the MIT license.
length3 = input(title="RMI Length", type=input.integer, minval=1, defval=30)
momentumLength3 = input(title="RMI Momentum ", type=input.integer, minval=1, defval=25)
up3 = rma(max(change(src, momentumLength3), 0), length3)
down3 = rma(-min(change(src, momentumLength3), 0), length3)

rmi3 = (down3 == 0 ? 100 : up3 == 0 ? 0 : 100 - (100 / (1 + up3 / down3)))-50
//
//
// end RMI, end Alex Orekhov copywrite
//
//

lengthMA = input(7)
lengthRSI = input(14)
thrsi = hma(hma(hma(rsi(src, lengthRSI), lengthMA), lengthMA), lengthMA)
thrsi1 = (thrsi-50)*10

lengthMA2 = input(7)
lengthRSI2 = input(14)
devwrsi = ((ema(ema(vwma(rsi(src, lengthRSI2), lengthMA2), lengthMA2), lengthMA2))-50)*5

lengthMA3 = input(7)
lengthRSI3 = input(14)
tersi = ((ema(ema(ema(rsi(src, lengthRSI3), lengthMA3), lengthMA3), lengthMA3))-50)*10

rmirsi = ((thrsi*rmi3/25))

//Boundary Lines

obLevel1 = input(0, title="Chande Sellline")
osLevel1 = input(0, title="Chande Buyline")
hline(obLevel1, color=#0bc4d9)
hline(osLevel1, color=#0bc4d9)

obLevel2 = input(0, title="Triple HMRSI Sellline")
osLevel2 = input(0, title="Triple HMRSI Buyline")
hline(obLevel2, color=#5a0bd9)
hline(osLevel2, color=#5a0bd9)

obLevel3 = input(0, title="DEVWRSI Sellline")
osLevel3 = input(0, title="DEVWRSI Buyline")
hline(obLevel3, color=#5a0bd9)
hline(osLevel3, color=#5a0bd9)

obLevel4 = input(0, title="TERSI Sellline")
osLevel4 = input(0, title="TERSI Buyline")
hline(obLevel4, color=#5a0bd9)
hline(osLevel4, color=#5a0bd9)

obLevel5 = input(0, title="RMI Sellline")
osLevel5 = input(0, title="RMI Buyline")
hline(obLevel5, color=#5a0bd9)
hline(osLevel5, color=#5a0bd9)

obLevel6 = input(0, title="RMI*RSI Sellline")
osLevel6 = input(0, title="RMI*RSI Buyline")
hline(obLevel6, color=#5a0bd9)
hline(osLevel6, color=#5a0bd9)

plot((thrsi1), title="THRSI")
plot(devwrsi, color=color.red, title="DEVWRSI")
plot(tersi, color=color.yellow, title="TERSI")
plot(rmirsi, color=color.purple, title="RMI*HMRSI")
plot(rmi3, color=color.orange, title="RMI")




longcondition1 = crossover(chandeMO, osLevel1)
shortcondition1 = crossunder(chandeMO, obLevel1)
longcondition2 = rmirsi<osLevel6 and rmi3<osLevel5 and tersi<osLevel4 and devwrsi<osLevel3 and thrsi1<osLevel2  and longcondition1
shortcondition2 = rmirsi>obLevel6 and rmi3>obLevel5 and tersi>obLevel4 and devwrsi>obLevel3 and thrsi1>obLevel2  and shortcondition1

if testPeriod()
    if longcondition2
        strategy.entry("Buy", strategy.long)
    if shortcondition2
        strategy.entry("Sell", strategy.short)






hline(0, color=#C0C0C0, linestyle=hline.style_dashed, title="Zero Line")
```

> Detail

https://www.fmz.com/strategy/427734

> Last Modified

2023-09-24 13:24:47
