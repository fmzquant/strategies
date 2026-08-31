
> Name

Breakout-Strategy-Based-on-Camarilla-Channels

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1aea91f8b9066f454dd.png)



## Overview

This strategy mainly uses Camarilla channels and moving averages to identify breakout points in the market, and thus implement trend following. The strategy is relatively simple but quite practical.

## Strategy Logic

1. Calculate support and resistance levels using Camarilla channels, including H4, L4 etc. 

2. Identify if price breaks through these channel lines. For example, close above H4 and open below H4 indicates a breakout signal.

3. Add moving average filter for further confirmation. For example, if EMA is below close, it's a bullish breakout.

4. Enter long position with stop loss and take profit. Such as fixed stop loss points, and trailing stop loss.

5. Same logic applies for short positions.

The logic is straightforward and easy to understand. With trailing stop loss, the strategy can ride trends effectively. 

## Advantages

The advantages of this strategy:

1. Camarilla channels accurately locate potential supports and resistances.

2. Moving averages filter helps validate true breakout signals. 

3. Trailing stop loss takes profits while avoiding reversal stops.

4. Signals are clear and easy to act upon.

5. No frequent adjustments needed for automated trading.

## Risks and Solutions

There are some risks to be aware of:

1. Camarilla channels cannot identify turning points effectively.

   - Solution: Add oscillators to detect trend reversal.

2. Improper stop loss points setting may lead to premature exit or enlarged losses.

   - Solution: Optimize and test different stop loss levels.
   
3. Breakout signals may turn out to be false signals.

   - Solution: Add more filters for confirmation, or relax breakout criteria.
   
4. Many false breakouts may happen in ranging markets.

   - Solution: Avoid trading in ranging periods, or relax criteria.
   
## Improvement Suggestions

The strategy can be further improved from the following aspects:

1. Add more indicators as filters to increase breakout accuracy, such as KDJ, MACD etc.

2. Optimize exits, such as dynamic trailing stop loss, integrating ATR etc. 

3. Optimize parameters for different products to increase robustness. 

4. Add higher time frame trend filter to avoid counter-trend trading.

5. Focus on high volume breakouts for confirmation.

6. Develop auto parameter optimization for dynamic tuning.

7. Expand to multi-product arbitrage strategies.

## Conclusion

The strategy has a clear and simple logic with strong practicality. It identifies potential supports and resistances using Camarilla and confirms breakout direction with moving averages. The exit method is also reasonable. There is also huge potential for enhancement, such as adding more indicators, multi-product expansion etc. Overall this is a promising strategy with good potential.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-23 00:00:00
end: 2023-10-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//Created by CristianD
strategy(title="CamarillaStrategyV1", shorttitle="CD_Camarilla_StrategyV1", overlay=true) 
//sd = input(true, title="Show Daily Pivots?")
EMA = ema(close,8)

//Camarilla
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

longCondition = close >dtime_h4 and open < dtime_h4 and EMA < close
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit ("Exit Long","Long",  trail_points = 140,trail_offset = 1, loss =170) 
    //trail_points = 40, trail_offset = 3, loss =70 and


shortCondition = close <dtime_l4 and open >dtime_l4 and EMA > close
if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit ("Exit Short","Short", trail_points = 110,trail_offset = 1, loss =120)
    

```

> Detail

https://www.fmz.com/strategy/430054

> Last Modified

2023-10-24 16:18:30
