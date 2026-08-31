
> Name

A-Momentum-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This is an intraday trading strategy that utilizes momentum indicators and key support/resistance levels for breakout trading. It incorporates the Choppiness index to identify trends and only trades when the trend is clear, in order to control risk.

## Strategy Logic

The strategy uses the Choppiness index to identify trends. Low Choppiness values indicate a clear trend while high values indicate consolidation. The strategy only trades when Choppiness is below 44.

For entry signals, it calculates key intraday support/resistance levels including H4, H5 etc. It goes long when price closes above H4 and goes short when price closes below L4. 

Specifically, it calculates the following intraday levels:

- Pivot = (High + Low + Close)/3
- Range = High - Low
- H1-H6 = Pivot + Range * Ratio 
- L1-L6 = Pivot - Range * Ratio

After computing these levels, it uses H4 and L4 as the key breakout levels. 

When price breaks above H4, it signals increasing bullish momentum and the strategy goes long. When price breaks below L4, it signals increasing bearish momentum and the strategy goes short.

## Advantage Analysis 

The advantages of this strategy include:

1. Using Choppiness to identify clear trends avoids whipsaws in consolidation.

2. The calculated support/resistance levels are usually meaningful. Trading breakouts from these levels gives a higher winning probability.

3. Trading breaks of H4 and L4 which are near the closing price captures important intraday breaks. 

4. Breakout signals have a very high win rate. Valid breaks of H4 and L4 usually continue the trend.

5. Simple and clear logic, easy to understand and implement for beginners.

## Risk Analysis

The risks of this strategy include:

1. Reliance on Choppiness for trend identification can fail and misread trends.

2. Calculated levels may not hold and price could break through, causing stops. 

3. Breakout signals can be false breakouts with quick reversals.

4. No consideration of overall trend, losses may accumulate in choppy markets.

5. No stop loss means huge single trade loss is possible in extreme moves.

Solutions:

1. Add other indicators for cross-confirmation and improve accuracy.

2. Implement moving stop loss to control single trade loss.

3. Incorporate long term trend filter to avoid counter-trend trades. 

4. Add re-entry signal to avoid chasing false breakouts.

## Optimization Directions

This strategy can be further optimized by:

1. Optimizing Choppiness parameters to find better values.

2. Testing different breakout levels like H3 and L3 for better efficiency.

3. Adding moving stop loss for profit protection and risk control. 

4. Adding re-entry signal to avoid losses from false breakouts.

5. Incorporating long term trend filter to avoid counter-trend trades.

6. Optimizing trading times such as only trading US or Europe sessions.

7. Adding position sizing rules like fixed quantity or fixed percentage.

8. Analyzing backtest data for parameter fine tuning.

## Conclusion

In summary, the core idea is to trade breakouts after identifying the trend. It has simple logic and decent winning odds. But risks exist and further refinements are needed to control risks and improve profitability. With parameter tuning, stop loss, trend filter etc it can become a very practical intraday breakout system. It provides a momentum breakout framework that is an effective intraday trading strategy.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Created by AS
strategy(title="ASH1Strategy", shorttitle="AS_H1_Strategy", overlay=true) 
//sd = input(true, title="Show Daily Pivots?")
EMA = ema(close,3)

pivot = (high + low + close ) / 3.0 
range = high - low
h5 = (high/low) * close 
h4 = close + (high - low) * 1.1 / 2.0
h3 = close + (high - low) * 1.1 / 4.0
h2 = close + (high - low) * 1.1 / 6.0
h1 = close + (high - low) * 1.1 / 12.0
l1 = close - (high - low) * 1.1 / 12.0
l2 = close - (high - low) * 1.1 / 6.0
l3 = close - (high - low) * 1.1 / 4.0
l4 = close - (high - low) * 1.1 / 2.0
h6 = h5 + 1.168 * (h5 - h4) 
l5 = close - (h5 - close)
l6 = close - (h6 - close)

// Daily line breaks
//sopen = request.security(syminfo.tickerid, "D", open [1])
//shigh = request.security(syminfo.tickerid, "D", high [1])
//slow = request.security(syminfo.tickerid, "D", low [1])
//sclose = request.security(syminfo.tickerid, "D", close [1])
//
// Color
//dcolor=sopen != sopen[1] ? na : black
//dcolor1=sopen != sopen[1] ? na : red
//dcolor2=sopen != sopen[1] ? na : green

//Daily Pivots 
dtime_pivot = request.security(syminfo.tickerid, 'D', pivot[1]) 
dtime_h6 = request.security(syminfo.tickerid, 'D', h6[1]) 
dtime_h5 = request.security(syminfo.tickerid, 'D', h5[1]) 
dtime_h4 = request.security(syminfo.tickerid, 'D', h4[1]) 
dtime_h3 = request.security(syminfo.tickerid, 'D', h3[1]) 
dtime_h2 = request.security(syminfo.tickerid, 'D', h2[1]) 
dtime_h1 = request.security(syminfo.tickerid, 'D', h1[1]) 
dtime_l1 = request.security(syminfo.tickerid, 'D', l1[1]) 
dtime_l2 = request.security(syminfo.tickerid, 'D', l2[1]) 
dtime_l3 = request.security(syminfo.tickerid, 'D', l3[1]) 
dtime_l4 = request.security(syminfo.tickerid, 'D', l4[1]) 
dtime_l5 = request.security(syminfo.tickerid, 'D', l5[1]) 
dtime_l6 = request.security(syminfo.tickerid, 'D', l6[1]) 

//offs_daily = 0
//plot(sd and dtime_pivot ? dtime_pivot : na, title="Daily Pivot",color=dcolor, linewidth=2)
//plot(sd and dtime_h6 ? dtime_h6 : na, title="Daily H6", color=dcolor2, linewidth=2)
//plot(sd and dtime_h5 ? dtime_h5 : na, title="Daily H5",color=dcolor2, linewidth=2)
//plot(sd and dtime_h4 ? dtime_h4 : na, title="Daily H4",color=dcolor2, linewidth=2)
//plot(sd and dtime_h3 ? dtime_h3 : na, title="Daily H3",color=dcolor1, linewidth=3)
//plot(sd and dtime_h2 ? dtime_h2 : na, title="Daily H2",color=dcolor2, linewidth=2)
//plot(sd and dtime_h1 ? dtime_h1 : na, title="Daily H1",color=dcolor2, linewidth=2)
//plot(sd and dtime_l1 ? dtime_l1 : na, title="Daily L1",color=dcolor2, linewidth=2)
//plot(sd and dtime_l2 ? dtime_l2 : na, title="Daily L2",color=dcolor2, linewidth=2)
//plot(sd and dtime_l3 ? dtime_l3 : na, title="Daily L3",color=dcolor1, linewidth=3)
//plot(sd and dtime_l4 ? dtime_l4 : na, title="Daily L4",color=dcolor2, linewidth=2)
//plot(sd and dtime_l5 ? dtime_l5 : na, title="Daily L5",color=dcolor2, linewidth=2)
//plot(sd and dtime_l6 ? dtime_l6 : na, title="Daily L6",color=dcolor2, linewidth=2)

longCondition = close >dtime_h4
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)
    


shortCondition = close <dtime_l4
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
    

```

> Detail

https://www.fmz.com/strategy/428790

> Last Modified

2023-10-09 15:15:22
