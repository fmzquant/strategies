
> Name

经典双重趋势追踪策略Classic-Dual-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bab8cb690ace1facda.png)



## Overview

This strategy tracks dual trends of stocks by calculating classic Pivot Points and using RSI indicator to determine current trend direction. It is suitable for medium-term trend trading.

## Strategy Principles

The strategy mainly follows these steps to achieve dual trend tracking:

1. Calculate classic Pivot Points including Pivot, S1, R1, S2, R2 etc. 

2. Use RSI indicator to determine price trend direction. RSI above 80 is overbought zone and below 20 is oversold zone.

3. Judge daily trend direction. If close price is greater than previous day's R2, it's a strong trend. If close price is less than previous day's S2, it's a weak trend.

4. Make today's trading decisions based on daily trend direction, combining Pivot Points and RSI indicator.

   - If daily trend is strong (close > R2), look for pullback buy points under Pivot or buy below S1.

   - If daily trend is weak (close < S2), look for pullback sell points above Pivot or sell above R1.
   
5. Set stop loss points. For strong trend, stop loss is previous day's S1. For weak trend, stop loss is previous day's R1.

The strategy judges mid-long term trend with Pivot Points, and uses RSI etc to determine short-term trend and entry points. This allows dual-trend tracking of prices, suitable for medium-term trading.

## Advantage Analysis

The main advantages of this strategy are:

1. Able to track both mid-long term trend and short-term trend, adapting flexibly to market changes.

2. Pivot Points have some trend-judging capability and can effectively determine mid-long term trend.

3. RSI etc can judge short-term overbought/oversold levels, assisting in determining specific entry points.

4. Strategy rules are clear and simple, easy to grasp. 

5. Risk control is in place with clear stop loss points.

## Risk Analysis

The main risks of this strategy are:

1. Pivot Points may fail in predicting mid-long term trend. This can be improved by adjusting parameters or combining with other indicators.

2. RSI etc may give false signals. Parameters can be adjusted or used together with other indicators.

3. Stop loss points may be too arbitrary, unable to completely avoid stop loss being hit. Buffer zones can be added.

4. Strategy drawdown may be larger, need psychological preparation and sufficient capital support.

5. Risk of over-trading exists. Opening conditions can be adjusted to avoid over-trading.

## Optimization Directions

The strategy can be optimized in these areas:

1. Try different parameter combinations like adjusting RSI parameters, optimizing Pivot Point calculations etc to find optimal parameters.

2. Add or combine other indicators like KDJ, MACD etc to make signals more accurate and reliable. 

3. Optimize stop loss strategies eg trailing stop loss, exit stop loss etc to reduce risk of stop loss being hit.

4. Optimize position sizing to limit impact of single position losses.

5. Optimize entry conditions to avoid over-trading. Filters can be added.

6. Test effectiveness across different products and adjust parameters.

7. Add auto take profit strategies to lock in profits.

## Summary 

This strategy judges mid-long term trend with Pivot Points and uses RSI etc to assist in determining short-term trend and entry points, achieving dual-trend tracking of prices. The overall logic is clear and reasonable, working well for medium-term trading. But some risk of false signals exists, necessitating further optimization of parameters, strict stop loss control to reduce risks, and appropriate position sizing control to manage possible larger drawdowns. With continuous optimization and improvements, stable investment returns can be achieved.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Show Filtered Pivots|
|v_input_2|true|Show Daily Pivots?|
|v_input_3|50|Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|7|length|
|v_input_6|20|overSold|
|v_input_7|80|overBought|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title="swing trade", shorttitle="vinay_swing", overlay=true)
pf = input(false,title="Show Filtered Pivots")
sd = input(true, title="Show Daily Pivots?")

//moving average
len = input(50, minval=1, title="Length")
src = input(close, title="Source")
out = ema(src, len)

//RSI INPUT
length = input( 7 )
overSold = input( 20 )
overBought = input( 80 )
price = close
vrsi = rsi(price, length)


// Classic Pivot
pivot = (high + low + close ) / 3.0
// Filter Cr
bull= pivot > (pivot + pivot[1]) / 2 + .0025
bear= pivot < (pivot + pivot[1]) / 2 - .0025
// Classic Pivots
r1 = pf and bear ? pivot + (pivot - low) : pf and bull ? pivot + (high - low) : pivot + (pivot - low)
s1 = pf and bull ? pivot - (high - pivot) : pf and bear ? pivot - (high - low) : pivot - (high - pivot)
r2 = pf ? na : pivot + (high - low)
s2 = pf ? na : pivot - (high - low)
BC = (high + low) / 2.0
TC = (pivot - BC) + pivot

//Pivot Average Calculation
smaP = sma(pivot, 3)

//Daily Pivots 
dtime_pivot = request.security(syminfo.tickerid, 'D', pivot[1])
dtime_pivotAvg = request.security(syminfo.tickerid, 'D', smaP[1])
dtime_r1 = request.security(syminfo.tickerid, 'D', r1[1]) 
dtime_s1 = request.security(syminfo.tickerid, 'D', s1[1]) 
dtime_r2 = request.security(syminfo.tickerid, 'D', r2[1]) 
dtime_s2 = request.security(syminfo.tickerid, 'D', s2[1])
dtime_BC = request.security(syminfo.tickerid, 'D', BC[1])
dtime_TC = request.security(syminfo.tickerid, 'D', TC[1])

offs_daily = 0
plot(sd and dtime_pivot ? dtime_pivot : na, title="Daily Pivot",style=circles, color=fuchsia,linewidth=1) 
plot(sd and dtime_r1 ? dtime_r1 : na, title="Daily R1",style=circles, color=#DC143C,linewidth=1) 
plot(sd and dtime_s1 ? dtime_s1 : na, title="Daily S1",style=circles, color=lime,linewidth=1) 
plot(sd and dtime_r2 ? dtime_r2 : na, title="Daily R2",style=circles, color=maroon,linewidth=1) 
plot(sd and dtime_s2 ? dtime_s2 : na, title="Daily S2",style=circles, color=#228B22,linewidth=1)
plot(sd and dtime_BC ? dtime_BC : na, title="Daily BC",style=circles, color=black,linewidth=1)
plot(sd and dtime_TC ? dtime_TC : na, title="Daily TC",style=circles, color=black,linewidth=1)

bull1=  (close > dtime_r2)
bull2= (low < dtime_pivot) or (low < dtime_s1) 
bull3= dtime_pivot > dtime_pivot[1]
bullishenglufing=bull2 and bull3
bullishenglufing1=bull1 and (close > out) and (crossover(vrsi, overBought))
longCondition = bull1[1] and ((low < dtime_TC) or (low < dtime_BC) or (low < dtime_s1))

bear1=  (close < dtime_s2)
bear2= (high > dtime_pivot) or (high < dtime_r1) 
bear3= dtime_pivot < dtime_pivot[1]
bearishenglufing=bear2 and bear3
bearishenglufing1=bear1 and (close < out) and (crossunder(vrsi, overSold))
shortCondition = bear1[1] and ((high > dtime_BC) or (high > dtime_TC) or (high > dtime_r1))

plotshape(bullishenglufing, style = shape.triangleup, location = location.belowbar, color = green, size = size.tiny)
plotshape(bearishenglufing, style = shape.triangledown, location = location.abovebar, color = red, size = size.tiny)

if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)

```

> Detail

https://www.fmz.com/strategy/430771

> Last Modified

2023-11-01 16:54:29
