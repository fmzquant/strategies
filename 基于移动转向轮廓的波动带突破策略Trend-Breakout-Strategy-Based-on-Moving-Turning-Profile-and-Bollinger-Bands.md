
> Name

基于移动转向轮廓的波动带突破策略Trend-Breakout-Strategy-Based-on-Moving-Turning-Profile-and-Bollinger-Bands

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy incorporates a forward shifted Bollinger Bands as a moving turning profile to identify potential trend breakout points. It generates trading signals when price breaks through the forward shifted bands. Combining the trend identification strength of BB and early warning of turning points from the shifted bands aims to discover more effective entries.

## Strategy Logic

1. Calculate standard BB with middle line, upper and lower bands.

2. Shift BB lines forward by a set period.

3. Signal long entry when price breaks above forward shifted upper band.

4. Signal short entry when price breaks below forward shifted lower band. 

5. Set stop loss at opposite BB line after entry.

## Advantage Analysis

1. Moving turning profile provides early warning for trend reversals.

2. Combines with BB's inherent trend identification ability for higher signal accuracy.

3. Preset stop loss positions allows effective risk control.

4. Can build positions at advantageous prices when combined with trend and swing analysis.

## Risk Analysis

1. Improper parameter tuning may generate excessive false signals.

2. Moving turning profile may have premature breakout and mid-way stop loss.

3. Needs further trend analysis to avoid whipsaws in ranging markets.

4. Has some lag, may not fully capture turning points.

## Optimization Directions

1. Test different price inputs and parameter combinations.

2. Add filters to avoid false breakouts.

3. Incorporate trend analysis to avoid being trapped.

4. Optimize stops based on market conditions.

5. Test effectiveness across different instruments and timeframes. 

6. Combine with other indicators for more accurate entries.

## Summary

This strategy fully utilizes the inherent advantages of Bollinger Bands and improves entry timing via the moving turning profile. With optimized parameters, additional filters, and further trend analysis, it can become a robust breakout system. Overall, a simple and practical strategy worth further testing and optimization for improved performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_hl2|0|source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_2|20|length|
|v_input_3|true|mult|
|v_input_4|26|x_offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-18 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("LAGging span leaves Bollinger Bands strategy" , shorttitle="LagBB" , overlay=true)
source = input( hl2 )
length = input(20, minval=1)
mult = input( 1.0, minval=0.0, maxval=50)
x_offset = input( 26 ,minval=0 , maxval=244 )

basis = sma(source, length)
dev = mult * stdev(source, length)
upper = basis + dev
lower = basis - dev
buyEntry = crossover(source, upper[x_offset] )
sellEntry = crossunder(source, lower[x_offset] )
if (crossover(source, upper[x_offset] ))
    strategy.entry("LE", strategy.long, stop=lower, oca_name="BollingerBands",  comment="LE")
else
    strategy.cancel(id="LE")
if (crossunder(source, lower[x_offset] ))
    strategy.entry("SE", strategy.short, stop=upper, oca_name="BollingerBands",  comment="SE")
else
    strategy.cancel(id="SE")
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
plot( upper , color=#cccc00 , transp=50 , offset=x_offset )
plot( basis , color=#cccc00 , offset=x_offset )
plot( lower , color=#cccc00 , transp=50 , offset=x_offset )
```

> Detail

https://www.fmz.com/strategy/427245

> Last Modified

2023-09-19 13:29:51
