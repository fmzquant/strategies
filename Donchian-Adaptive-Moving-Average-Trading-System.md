
> Name

Donchian-Adaptive-Moving-Average-Trading-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10352684c9b53ab9689.png)

## Overview  

The Donchian adaptive moving average trading system is a quantitative trading strategy that tracks price trends. This strategy utilizes the Donchian channel indicator combined with long-term and short-term moving averages to judge and track price trends and capture medium-to-long term price trends for trend trading.
  
## Strategy Principle

The strategy first calculates the true volatility range. The true volatility range refers to the price movement range from the closing price of the previous candlestick to the highest and lowest prices of the current candlestick. Then it calculates the simple moving average of the true volatility range as the bandwidth of the Donchian channel. Combined with moving averages of two time periods, it judges the price trend. The specific judgment rules are as follows:  

When the price breaks through the long-term moving average plus the bandwidth and the short-term moving average plus the bandwidth, go long; when the price falls below the long-term moving average minus the bandwidth and the short-term moving average minus the bandwidth, go short. The closing conditions are closing long positions when prices fall below the long and short moving averages increased by the bandwidth; closing short positions when prices rise above the long and short moving averages increased by the bandwidth.
  
Thus, by dynamically adjusting the bandwidth of the Donchain Channel based on true volatility and filtering with dual moving averages, the strategy can effectively track medium-to-long term price trends, reduce false signals, and obtain stable long-term trading opportunities.

## Strengths Analysis   

This strategy has the following advantages:  

1. Using true volatility to dynamically adjust channel bandwidth avoids static parameters and adapts better to market changes.  

2. The combination of dual moving averages can effectively filter noise and reduce false signals.

3. Tracking medium-to-long term trends can reduce repetitive trading and lower trading frequency to obtain long-term profit opportunities.  

4. The strategy logic is simple and clear, easy to implement, fault tolerant, and suitable for automated algorithmic trading.

## Risk and Optimization  

The strategy also has some risks:  

1. It’s hard to capture the best entry timing for long-term trades during short-term adjustments. Volatility indicators can help judge short-term situations and optimize entries.

2. Parameters need optimization for different sectors and individual stocks. Dynamical optimized parameter portfolio can be considered.   

3. Stop loss points need proper loosen up against significant trend changes from emergencies.

## Summary   

In summary, the Donchian adaptive moving average trading system is an overall stable, simple and easy-to-implement quantitative strategy. By utilizing dynamic channels and dual moving average filtering, it can effectively track medium-to-long term market trends, reduce trading frequency, and obtain long-term sustained profits. Meanwhile, optimizing parameter settings, preventing risks, and proper stop loss should also be noted to adapt to emergencies. Overall speaking this strategy has outstanding performance and is suitable for medium-to-long term algorithmic trend tracking.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|长线|
|v_input_2|5|短线|
|v_input_3|true|bandfactor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-14 00:00:00
end: 2024-02-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dongyun

//@version=4
strategy("唐齐安移动平均交易系统", overlay=true)

longperiod = input(20,'长线')
shortperiod = input(5,'短线')
bandfactor = input(1.0,'')

TrueHigh = 0.0
TrueLow = 0.0
TrueRange = 0.0

TrueHigh := close[1] > high ? close[1] : high
TrueLow := close[1] < low ? close[1] : low
TrueRange := TrueHigh - TrueLow
AvgTrueRange = sma(TrueRange,longperiod)

MAlong = sma(close,longperiod)
MAshort = sma(close,shortperiod)
band =  AvgTrueRange * bandfactor

if close > MAlong[1] + band[1] and close >  MAshort[1] + band[1]
	strategy.entry("Long", strategy.long, when=strategy.position_size < 1)
else
	if close < MAlong[1] - band[1] and close < MAshort[1] - band[1]
		strategy.entry("Short", strategy.short, when=strategy.position_size > -1)

if close < MAlong[1] - band[1] or close < MAshort[1] - band[1]
	strategy.close("Long", when=strategy.position_size > 0)
else
	if close > MAlong[1] + band[1] or close > MAshort[1] + band[1]
		strategy.close("Short", when=strategy.position_size < 0)
```

> Detail

https://www.fmz.com/strategy/442387

> Last Modified

2024-02-21 15:08:27
