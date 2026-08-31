
> Name

基于历史新高突破的买入策略Buying-Strategy-Based-on-Historical-High-Breakout

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy buys when the price breaks out above the historical n-day high in a bull market, with EMA stop loss. It belongs to trend following strategies.

## Strategy Logic

1. Calculate the highest price over the past n days as the historical high price.

2. Buy when the current close exceeds the historical high price. 

3. Use x-day EMA as the stop loss. Exit when price drops below EMA.

4. Values of n and x adjustable via parameters, default to 200-day high and 90-day EMA.

5. Simple and clear logic easy to implement.

## Advantages

1. Automatically follows trends formed by new highs.

2. EMA trailing stop locks in most profits.

3. No need to predict prices, just follow buy signals.

4. Default parameters work well in bull markets. 

5. Concise code easy to understand and modify.

## Risks

1. Massive losses when bull market ends.

2. Improper stop loss setups lead to premature or delayed stops.

3. Unable to predict strength and pullback of new highs.

4. Strong bias makes it unsuitable for other markets.

5. Parameter optimization risks overfitting to historical data.

## Enhancement

1. Test different parameter combinations for optimum values.

2. Evaluate other stop methods like fixed percentage stops.

3. Optimize stops to balance frequency and risk control.

4. Add filters to avoid buying on noise.

5. Research ways to gauge buy signal strength. 

6. Can add profit taking exits to lock in gains.

## Conclusion

This strategy automates trend following on new highs with EMA trailing stops. Though effective in some cases, it needs expansion and optimization to become robust across all markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|200|ATH period|
|v_input_int_2|90|ema line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gmhfund

//@version=5
strategy("ATH 200d",overlay=1)
plot(close)

bars = input.int(200, "ATH period", minval=5, maxval=2000, step=1)
range_ema = input.int(90,"ema line",minval=100,maxval=400,step=1)

ath_price = ta.highest(bars)[1]
plot(ath_price,color=color.blue)

line_ema = ta.ema(close,range_ema)
exit_condition = ta.crossunder(close,line_ema)
plot(line_ema,color=color.orange)


strategy.entry("Buy", strategy.long, 1, when = close > ath_price) // enter long by market if current open great then previous high
//strategy.close("Buy",when = close < strategy.position_avg_price*0.9 )
strategy.close("Buy",when = exit_condition )
```

> Detail

https://www.fmz.com/strategy/427388

> Last Modified

2023-09-20 15:53:26
