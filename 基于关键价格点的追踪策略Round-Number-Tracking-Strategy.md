
> Name

基于关键价格点的追踪策略Round-Number-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy is based on the idea that stop loss and take profit levels are often placed at round number or key price levels, which act as support and resistance. The strategy identifies these key price levels and enters trades when the price approaches them.

## Strategy Logic

The main rules of this strategy are:

1. When the close price is above a key price level, and has not touched that level in the past 10 bars, go long. 

2. Use a trailing stop with 20 points step to follow the movement after price breaks the key level.

3. Sell signals are the opposite - when close is below key level and has not touched it in past 10 bars, go short.

4. Key levels are identified as:

   - Convert close price to integer
   - Calculate remainder from dividing by 50 (configurable)
   - If remainder > 25, use next 50 whole number as key level
   - Otherwise keep key level unchanged

The strategy is based on the psychology that round numbers and key levels are often battlegrounds for bulls and bears, and thus provide effective trade signals. The trailing stop follows the trend after the breakout.

## Advantages

The advantages of this strategy are:

1. Simple and intuitive trade signals and entry rules.
2. Utilizes universal pattern of key prices rather than instrument specific rules. 
3. Trailing stop locks in profits while riding the trend.

## Risks

The risks to consider are:

1. Key levels may not always act as strong support/resistance. Fake breakouts are possible.
2. Fixed 10 bar lookback may not suit different instruments. 
3. Trailing stop distance should not be too wide, otherwise it may stop out prematurely.

Possible solutions:

1. Add more filters to judge strength of key levels, e.g. volume.
2. Optimize parameters like lookback period for different instruments.
3. Optimize trailing stop mechanism to be more adaptive.

## Enhancement Opportunities

The strategy can be improved by:

1. Adding more conditions to confirm importance of key levels and avoid fakeouts. E.g. combine with volume.

2. Optimizing parameters like key level range and lookback period based on instrument characteristics.

3. Enhancing trailing stop mechanism, e.g. using dynamic instead of fixed point trail.

4. Incorporating machine learning to judge strength of key levels using historical data.

5. Expanding to multi-timeframe system with higher TF trend and lower TF tracking.

## Conclusion

This strategy offers simple and intuitive signals based on key price levels and trading conventions. It has abundant opportunities but needs further optimization to handle fakeouts. Parameter tuning and machine learning can improve robustness. It provides good day trading ideas and can also be expanded to multi-timeframe trend tracking system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|500|Round Level 1, pips|
|v_input_2|1000|Max distance, pips|
|v_input_3|100|Distance in pips to full level|
|v_input_4|20|Trail Step points|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Strategy based on the idea that stop loss and take profit are often placed at full price levels or round numbers, whcih acts as resistance and supports levels
//Buy Rules:
//Actual price (close) is above round number.
//Round number level was not touched in previous ten bars (arbitrary value).
//Place a buy and follow the order with a trail step because price can bounce at round number (support) or can go through it.
//Sell Rules are the same of buy rules but inverted.
//
//Need improvement on conditions' logic and round numbers definitions


strategy("dP magnet", overlay=true, pyramiding=0,default_qty_type=strategy.percent_of_equity,default_qty_value=100,currency=currency.USD)

//Round Levels credit to RKchartest

roundLevel50 = input(500, 'Round Level 1, pips')
//roundLevel100 = input(1000, 'Round Level 2, pips')
deviation = input(1000, 'Max distance, pips', minval=0) 

rDelimeter = 1/syminfo.mintick

intRoundLevel = close[1] * rDelimeter

intRemainder = intRoundLevel % roundLevel50 
toRound = (intRemainder >= roundLevel50/2) ? roundLevel50 : 0
roundLevel = (intRoundLevel - intRemainder + toRound) / rDelimeter
plot(roundLevel, title='Round Level 1', color=black, style=line, transp=0, linewidth=1, trackprice=false)

//intRemainder2 = intRoundLevel % roundLevel100
//toRound2 = (intRemainder2 >= roundLevel100/2) ? roundLevel100 : 0
//roundLevel2 = (intRoundLevel - intRemainder2 + toRound2) / rDelimeter
//plot((abs(roundLevel2 - close) * rDelimeter < deviation) ? roundLevel2 : na, title='Round Level 2', color=black, style=circles, transp=0, linewidth=1, trackprice=true)

// end

//Start of strategy

distToFullNumber=(close-roundLevel) //can be positive or negative number

distPips=input(100,'Distance in pips to full level',minval=10) //user defined: this distance defines when to open an order at market price


TrailS=input(20,'Trail Step points',minval=10) //trail step that follows the order

longCondition = iff(distToFullNumber>0 and abs(distToFullNumber)<=distPips and lowest(low,10)>roundLevel,true,false)

if (longCondition)
    strategy.entry("LongMagnet", strategy.long)
    strategy.exit("ExitMagnet","LongMagnet",trail_points=TrailS)

shortCondition = iff(distToFullNumber<0 and abs(distToFullNumber)<=distPips and highest(high,10)<roundLevel,true,false)

if (shortCondition)
    strategy.entry("ShortMagnet", strategy.short)
    strategy.exit("Exit_Magnet","ShortMagnet",trail_points=TrailS)
    
```

> Detail

https://www.fmz.com/strategy/427477

> Last Modified

2023-09-21 15:24:53
