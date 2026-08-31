
> Name

基于均线斜率和交叉的趋势交易策略EMA-Slope-and-Cross-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses the slope direction and cross relationships among multiple EMAs to determine trend direction, for non-stop trend trading. It can stay long or short at all times.

## Strategy Logic

1. Calculate 3 groups of EMAs - fast, medium and slow EMAs. 

2. When fast EMA crosses above medium EMA, and medium EMA slope turns positive, long signal is generated.

3. When fast EMA crosses below medium EMA, and medium EMA slope turns negative, short signal is generated.  

4. Go long when price crosses above slow EMA, and short when price crosses below slow EMA.

5. EMA slope relationships reflect trend changes. Price crossovers confirm entry.

## Advantage Analysis  

1. Multiple EMAs improve accuracy in trend judgment.

2. Fast, medium and slow EMAs reasonably distinguish trend and consolidation.

3. EMA slope changes give early hints on trend changes.

4. Price crossovers further confirm to avoid false breakouts. 

5. Always keeping a position fully captures trend opportunities.

## Risk Analysis

1. Relying solely on EMAs carries large position risks during range-bound periods.

2. Improper EMA parameters may miss turning points. 

3. Unable to determine trend strength, risks premature reverse entries.

4. No effective single trade loss control.

## Improvement Directions

1. Test different EMA combinations to find optimal parameters.

2. Add other indicators like MACD to determine strength.

3. Add stop loss mechanisms for risk control.

4. Evaluate trend strength to avoid premature reverse entries.

5. Optimize position sizing for capital management. 

6. Temporarily stop trading when trend becomes choppy.

## Summary

The strategy sensibly uses EMA combos to determine trend. But sole reliance on EMA has limitations, leaving large optimization space to incorporate more indicators. Risk control mechanisms are also needed to improve stability. Overall the framework is scientifically designed, and has the potential to grow into a strong trend trading strategy after continuous improvements.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|2|EMA 1 Length|
|v_input_3|4|EMA 2 Length|
|v_input_4|20|EMA 3 Length|
|v_input_5|true|Show Bar Color?|
|v_input_6|true|Show Moving Averages?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("EMA Slope + EMA Cross Strategy (by ChartArt)", shorttitle="CA_-_EMA_slope_cross", overlay=true)

// ChartArt's EMA Slope + EMA Cross Strategy
//
// Version 1.0
// Idea by ChartArt on March 10, 2018.
//
// This strategy uses divergences between
// three moving averages and their slope
// directions as well as crosses between
// the price and the moving averages
// to switch between long/short positions.
//
// The strategy is non-stop in the market
// and always either long or short.
// 
// In addition the moving averages are colored
// depending if they are trending up or down.
//
// List of my work: 
// https://www.tradingview.com/u/ChartArt/

// Input
price = input(close)
MA1_Length = input(2,step=1, title="EMA 1 Length")
MA2_Length = input(4,step=1, title="EMA 2 Length")
MA3_Length = input(20,step=1, title="EMA 3 Length")

switch1=input(true, title="Show Bar Color?")
switch2=input(true, title="Show Moving Averages?")

// Calculation
MA1 = ema(price, MA1_Length)
MA2 = ema(price, MA2_Length)
MA3 = ema(price, MA3_Length)

// Strategy
long = crossunder(price, MA3) or ( change(price)<0 and change(MA1)<0 and crossunder(price,MA1) and change(MA2)>0 )
short = crossover(price, MA3) or ( change(price)>0 and change(MA1)>0 and crossover(price,MA1)  and change(MA2)<0 ) 

if long
    strategy.entry("Long", strategy.long, comment="Long")

if short
    strategy.entry("Short", strategy.short, comment="Short")

// Strategy Alert
alertcondition(long, title='EMA Slope + EMA Cross Strategy, Long Alert', message='Go Long!')
alertcondition(short, title='EMA Slope + EMA Cross Strategy, Short Alert', message='Go Short!')

// MA trend bar color
up =  change(MA2)>0 and change(MA3)>0
dn =  change(MA2)<0 and change(MA3)<0
bar_color = up?green:dn?red:blue
barcolor(switch1?bar_color:na)

// MA trend output color
MA2_color = change(MA2)>0?lime:change(MA2)<0?red:blue
MA3_color = change(MA3)>0?lime:change(MA3)<0?red:blue

// MA output
EMA2 = plot(switch2?MA2:na, title="EMA 2", style=linebr, linewidth=2, color=MA2_color)
EMA3 = plot(switch2?MA3:na, title="EMA 3", style=linebr, linewidth=4, color=MA3_color)
fill(EMA2, EMA3, color=silver, transp=50)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/427370

> Last Modified

2023-09-20 14:32:22
