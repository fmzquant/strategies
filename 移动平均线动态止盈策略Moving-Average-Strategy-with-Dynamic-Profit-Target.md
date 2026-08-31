
> Name

移动平均线动态止盈策略Moving-Average-Strategy-with-Dynamic-Profit-Target

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy identifies trend using moving averages, takes profit at fixed ATR multiples, and dynamically sizes positions based on ATR. It aims to ride trends for profit while controlling risk.

## Principles

The strategy uses Simple Moving Average of length N to determine trend direction. It goes long when short SMA crosses above long SMA, and goes short when crossing below.

After entry, profit target is set at fixed ATR multiples from entry price, e.g. Profit Target = Entry Price + ATR * Factor for longs. Profit is taken when price hit profit target.

Strategy also sizes positions inversely to ATR, which represents market volatility. Larger ATR means smaller position size.

## Advantages

1. MA identifies trend, allowing trend following.

2. ATR profit taking profits from trends while avoiding reversals.

3. Dynamic position sizing manages risk according to market volatility.

4. Customizable profit factor and sizing parameters.

5. Stop loss can further limit risks.

## Risks and Mitigations

1. MA lag may cause late entry. More sensitive parameters can be tested.

2. ATR fluctuations may result in profit targets too small or large. Can use ATR moving average for trend.

3. Excessive volatility leads to too small positions limiting profits. Can set position size floor.  

4. Lack of stop loss risks uncontrolled loss. Can add moving stop loss.

5. Poor symbol selection, e.g. low volatility assets, may lead to underperformance. Should pick high volatility symbols.

## Enhancement Opportunities

1. Test different parameter combinations for optimal settings.

2. Improve entry logic by adding other indicators as filter. 

3. Research dynamic profit taking and stop loss for flexibility.

4. Manage positions based on volatility indicators. 

5. Add re-entry mechanism to prolong holding period.

## Summary

The strategy identifies trend with moving averages, takes profit at ATR multiples and sizes position by ATR. It has some trend following capacity and risk can be adjusted through parameters. But parameter selection and profit target problems exist. Further improvements can be made via optimization, stop loss to make strategy more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|80|period|
|v_input_2|252|ptper|
|v_input_3|12|ptfactor|
|v_input_4|20|sizeper|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-09-17 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dongyun

//@version=4
strategy("利润目标止损的移动平均线", overlay=true)

period = input(80,'')
ptper = input(252,'')
ptfactor = input(12,'')
sizeper = input(20, '')

trend = 0.0
signal = 0
size = 1.0
investment = 100000
atrange = 0.0
ptrange = 0.0
stoph = 0.0
stopl = 0.0


if sizeper != 0
	atrange := atr(sizeper)

if atrange == 0 or sizeper == 0 
	size := 1
else
	size := investment/atrange * 0.1

trend := sma(close,period)


if signal != 1 and nz(trend[1]) < nz(trend[2]) and trend > nz(trend[1])
	strategy.entry('long',strategy.long, comment='open_long')
	signal := 1
else
    signal := nz(signal[1])
    
if signal != -1 and nz(trend[1]) > nz(trend[2]) and trend < nz(trend[1])
	strategy.entry('short',strategy.short, comment='open_short')
	signal := -1
else
    if signal == 0
        signal := nz(signal[1])

ptrange := atr(ptper)

if strategy.position_size > 0
	strategy.exit("exit_long", "long", qty = strategy.position_size, limit = close + ptfactor*ptrange , comment='trail_long') 
else
	if strategy.position_size < 0
		strategy.exit("exit_short", "short", qty = abs(strategy.position_size), limit = close - ptfactor*ptrange, comment='trail_short')

```

> Detail

https://www.fmz.com/strategy/427187

> Last Modified

2023-09-18 21:46:47
