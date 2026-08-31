
> Name

KPL-Swing-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


### Overview

This strategy trades based on the KPL Swing indicator, which is a simple trend following mechanical system. It goes long on close above 20-day high, and goes short on close below 20-day low to capture medium-long term price swings.

### Strategy Logic

1. Calculate 20-day highest high and lowest low
2. Go long when close breaks out above 20-day high 
3. Go short when close breaks down below 20-day low
4. Calculate stop loss levels and set stop orders

Specifically, it first calculates 20-day range using highest high and lowest low. When close breaks out upward from 20-day high, go long. When close breaks down from 20-day low, go short. Stop loss levels are calculated after entry for both directions to limit losses.

### Advantage Analysis

1. Simple and intuitive logic, easy to grasp
2. Has some trend following capacity 
3. Stop loss effectively controls risk
4. No subjective price target guessing
5. Less emotional trading, minimal external influence

### Risk Analysis

1. Lagging entry risks exist
2. Fails to identify key levels in trends
3. Whipsaws may cause being trapped
4. Profit potential limited by 20-day breakout range
5. Hard to determine optimal holding period

Risks can be managed via adjusting lookback period, adding trend filter, optimizing stop loss etc.

### Optimization Directions

1. Test different lookback periods
2. Add MACD etc. to gauge momentum  
3. Optimize stop loss for trailing stop loss
4. Evaluate holding period impact on profitability
5. Study parameter preference across products
6. Consider adding re-entry and pyramiding rules

### Summary

This strategy trades trend swings based on KPL Swing indicator. Pros are simple operation and built-in stop loss; Cons are lags and profit constraints. Cons can be improved via parameter optimization, strategy combination while retaining pros. It helps traders master mechanical indicator-based trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|no|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-20 00:00:00
end: 2023-09-20 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ceyhun

//@version=4
strategy("KPL Swing Strategy", overlay=true)

no = input(20)
res = highest(high, no)
sup = lowest(low, no)
avd = iff(close > res[1], 1, iff(close < sup[1], -1, 0))
avn = valuewhen(avd != 0, avd, 1)
tsl = iff(avn == 1, sup, res)
sl = iff(close > tsl, highest(lowest(low, no / 2), no / 2), lowest(highest(high, no / 2), no / 2))

plot(tsl, color=#0000FF,title="KPL Swing")
plot(sl,  color=color.white,title="Stoploss")

bgcolor(abs(close - tsl[1]) > close ? color.white : close < tsl ? color.red : color.green, 90, offset=0)

if crossover(close, tsl)
    strategy.entry("Long", strategy.long, comment="Long")

if crossunder(close,tsl)
    strategy.entry("Short", strategy.short, comment="Short")
    
    
    

```

> Detail

https://www.fmz.com/strategy/427453

> Last Modified

2023-09-21 11:09:04
