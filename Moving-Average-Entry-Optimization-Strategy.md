
> Name

Moving-Average-Entry-Optimization-Strategy

> Author

ChaoZhang

> Strategy Description



## Strategy Logic 

This strategy optimizes the entry points after signals from a basic moving average system. 

The main logic is:

1. Calculate moving average over a period (e.g. 20-day)

2. Crossovers generate long/short signals 

3. After signals, don't enter immediately but wait for better levels

4. If better levels occur within specified days (e.g. 3 days), enter trades

5. If not, enter at closing price on 5th day to avoid missing out

This seeks to capitalize on resumption of trends after consolidations rather than entering signals immediately. Allows establishing positions at improved levels.

## Advantages

- Entry optimization for better entry levels

- Maximum wait days avoids completely missing trades

- Simple and clear rules easy to implement

## Risks

- Waiting time and thresholds require optimization

- Could miss some short-term trend opportunities  

- Needs to monitor both time and price conditions

## Summary

This strategy aims to get better entry levels through simple entry optimization while ensuring trends are not missed. But optimizing wait time and entry criteria is crucial.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|period|
|v_input_2|3|maxwait|
|v_input_3|0.01|threshold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dongyun

//@version=4
strategy("等待一个更好的入场机会", overlay=true)

period = input(20,'')
maxwait = input(3,'')
threshold = input(0.01,'')

signal = 0
trend = 0.0
newtrend = 0.0
wait = 0.0
initialentry = 0.0

trend := sma(close,period)
signal := nz(signal[1])
if trend > nz(trend[1])
	signal := 1
else
	if trend < nz(trend[1])
		signal := -1

wait := nz(wait[1])
initialentry := nz(initialentry[1])

if signal != signal[1]
	if strategy.position_size > 0
		strategy.close('long',comment='trend sell')
		signal := -1
	else
		if strategy.position_size < 0
    		strategy.close('short',comment='trend buy')
    		signal := 1
	wait := 0
	initialentry := close
else
	if signal != 0 and strategy.position_size == 0
		wait := wait + 1

// test for better entry
if strategy.position_size == 0
	if wait >= maxwait
		if signal > 0
			strategy.entry('long',strategy.long, comment='maxtime Long')
		else
			if signal < 0
				strategy.entry('short',strategy.short, comment='maxtime Short')
	else
		if signal > 0 and close < initialentry - threshold
			strategy.entry('long',strategy.long, comment='delayed Long')
		else
			if signal < 0 and close > initialentry + threshold
				strategy.entry('short',strategy.short, comment='delayed short')

```

> Detail

https://www.fmz.com/strategy/426810

> Last Modified

2023-09-14 16:52:30
