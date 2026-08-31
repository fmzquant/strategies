
> Name

Camarilla支撑阻力层突破策略Camarilla-Pivot-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11a805f97ef831a5d72.png)

## Overview  

The Camarilla Pivot Breakout Strategy is a quantitative trading strategy that utilizes Camarilla pivot levels for entries and exits. This strategy draws on traditional technical analysis support and resistance theories, combines Camarilla mathematical formulas to calculate pivot points at different timeframes, and sets breakouts of these key levels as conditions for trade openings and closings, in order to achieve excess returns.  

## Strategy Logic

The core logic of this strategy is: calculating the H4 and L4, two key support and resistance levels, from the Camarilla formula at the daily timeframe; generating trading signals when price breaks these two levels.

Specifically, the strategy first calculates the midpoint of highest, lowest and closing prices of the current bar as the pivot point. Then it calculates the price range. Based on the range, various Camarilla levels can be plotted, including H4, H3, H2, H1 and L1, L2, L3, L4. Among them, H4 is the first resistance and L4 is the first support.  

For trade signals, if the closing price breaks above H4 level, it triggers a long signal; if closing price breaks below L4, it triggers a short signal. By capturing breakouts of key S/R levels, the strategy judges the direction and momentum of the trend, generating trade signals.  

So the main logic is: using Camarilla level breakouts to determine market structure and obtain trade signals.

## Advantage Analysis 

This Camarilla breakout strategy has several key strengths:

1. Based on proven traditional technical theories, stable backtests

Camarilla analysis uses classic support/resistance concepts. Such theories stood the test of time and ensure strategy robustness across products and timeframes.

2. Simple parameters, easy execution 

Comparing to machine learning models, Camarilla rules are simple with few tunable metrics, easy to understand and execute in live trading, especially for beginners.

3. Clear breakout signals, simple coding 

Monitoring H4/L4 breakouts directly translates to trade entries. The strategy signal is crisp and code is simple. This allows quick prototyping from ideas to live trading.

4. Applicable for high and low frequency trading  

Camarilla strategy works for high frequency (second, minute bars) and low frequency (daily, weekly) trading. This versatility is a major plus.

## Risk Analysis

However, such simple breakout strategy has some inherent weaknesses:  

1. Risk of false breakout  

Price may fail to trend post breakout and reverse instead. Not cutting loss timely could lead to large drawdowns. We need safeguards against false signals.

2. Missing some breakout opportunities 

Monitoring only closing prices may cause missing potential breakouts during earlier bar periods. Optimization is needed to improve signal accuracy.

3. Profit potential could be limited

Comparing to more sophisticated models, sole reliance on Camarilla may limit profit margin and amplitude. We can mitigate through position sizing and leverage management.

Therefore, risk management via stop loss, optimizing entry logic, and adjusting position sizes are necessary to ensure robustness of such simple breakout method. 

## Optimization Directions

To further optimize this Camarilla breakout strategy, we can focus on the following:  

1. Incorporate additional metrics to detect true breakout  

Combining volume, moving averages etc. to gauge breakout authenticity and avoid false signals.  

2. Optimize breakout logic  

Like relaxing breakout magnitude through backtests to find sweet spots. Or adding more rules based on seasonalities.

3. Optimize stop loss strategies   

Tighten stop loss ranges while avoiding premature stops. Or alternative strats like trailing stop loss.  

4. Dynamically adjust position sizes and leverage

Adaptive tuning of positions and leverage parameters to suit evolving market regimes.  

5. Incorporate more advanced machine learning  

Leverage LSTM, RNN models to predict breakout probabilities and enhance intelligence.


## Summary   

The Camarilla Pivot Breakout Strategy is a simple and direct quantitative trading strategy that is easy to implement. It utilizes mature technical analysis tools and generates trade signals by capturing breaks of key support and resistance levels. This type of strategy has the advantage of stability and reliability. It is also relatively simple for real-world execution. Of course, further enhancements around stop loss, parameter tuning, risk control etc. are necessary to achieve higher efficiency.  




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-27 00:00:00
end: 2024-01-03 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//Created by CristianD
strategy(title="CamarillaStrategy", shorttitle="CD_Camarilla_Strategy", overlay=true) 
//sd = input(true, title="Show Daily Pivots?")
EMA = ema(close,3)

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

longCondition = close >dtime_h4
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)
    


shortCondition = close <dtime_l4
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
    

```

> Detail

https://www.fmz.com/strategy/437664

> Last Modified

2024-01-04 16:17:06
