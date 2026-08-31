
> Name

Multi-Timeframe-Diagonally-Layered-RSI-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy is a multi-timeframe non-repainting RSI strategy that goes long only when two higher timeframes are oversold. I wrote it on BTC/USD 1-min, but the logic should work on other assets as well. It is designed to be profitable when the asset is in a downtrend.  

## Principle 

Diagonal layering refers to entry and exit conditions spread across different timeframes. Normally, indicators can become unprofitable because in downtrends, the overbought zones of the current timeframe are not reached. Rather, the overbought zones of the higher timeframes are reached first, followed by a pullback. Diagonally layered strategies mitigate this by selling diagonally, that is, selling once the faster timeframe reaches overbought and buying once the slower timeframe reaches oversold.

Thus this strategy is diagonally layered. I may create a separate script that toggles between diagonal-up and diagonal-down based on overall trend, as in extended uptrend periods this indicator may not flash as frequently. This can be visualized on a time series x timeframe chart as an "X" shape. Something to consider...

## Advantages

- Utilizes RSI indicators across multiple timeframes, improving signal reliability
- Diagonal layering provides more opportunities in downtrends 
- Non-repainting indicators give reliable signals
- Configurable RSI parameters and overbought/oversold levels adapt to different markets
- Considers trading costs, targets steady profits over high-frequency trading

## Risks and Solutions

- RSI prone to false signals, tweak parameters or add filters 
- Diagonal layering increases entry difficulty, reduce layered timeframes
- Long only, exposed to directional risk, consider balancing long/short
- Use fixed stop loss to control loss per trade

## Optimization Directions

- Add trend detection, use diagonal layering in downtrends, diagonal-up in uptrends
- Optimize RSI parameters to find best combo
- Add Volume, MA etc. filters to improve signal quality
- Add short strategy so strategy can profit in all markets
- Optimize stop loss to reduce drawdown

## Summary

Overall this is a very effective downtrend trading strategy. Using multi-timeframe RSIs and diagonal layering provides opportunities to catch bounces in downtrends. Non-repainting also improves signal reliability. With parameter optimization, adding filters and a short strategy, it can be made into a robust strategy for any market.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|7|RSI Length|
|v_input_timeframe_1|3|HT 1|
|v_input_timeframe_2|5|HT 2|
|v_input_int_2|80|Overbought Level|
|v_input_int_3|20|Oversold Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-06-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wbburgin

//@version=5
strategy("MTF Layered RSI - Bitcoin Bot [wbburgin]",overlay=false, pyramiding = 20, initial_capital=10000)

length = input.int(7,"RSI Length")
tf2 = input.timeframe("3",title="HT 1")
tf3 = input.timeframe("5",title="HT 2")
ob = input.int(80,"Overbought Level")
os = input.int(20,"Oversold Level")

rsi = ta.rsi(close,length)
rsi2 = request.security(syminfo.tickerid, tf2, rsi[1], barmerge.gaps_off, lookahead=barmerge.lookahead_on)
rsi3 = request.security(syminfo.tickerid, tf3, rsi[1], barmerge.gaps_off, lookahead=barmerge.lookahead_on)

plot(rsi,color=color.yellow,title="RSI Current TF")
plot(rsi2,color=color.new(color.yellow,50),title="RSI HT1")
plot(rsi3,color=color.new(color.yellow,75),title="RSI HT2")

lm=hline(os,title="Oversold")
hm=hline(ob,title="Overbought")

fill(hm,lm,color=color.new(color.blue,95))

htCross = (ta.crossover(rsi2,os) and rsi3>os and rsi>os) or (ta.crossover(rsi3,os) and rsi2>os and rsi>os)
buySig = (ta.crossover(rsi,os) and rsi2 < os and rsi3 < os) or htCross
sellSig = ta.crossunder(rsi,ob)

if buySig
    strategy.entry("Long",strategy.long)
if sellSig
    strategy.close("Long")

plotshape(buySig,title="Buysig",style=shape.triangleup,location=location.bottom,color=color.green,size=size.tiny)
plotshape(sellSig,title="Sellsig",style=shape.triangledown,location=location.top,color=color.red,size=size.tiny)
```

> Detail

https://www.fmz.com/strategy/428102

> Last Modified

2023-09-28 16:12:25
