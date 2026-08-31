
> Name

双轨突破策略Dual-Thrust-Strategy

> Author

ChaoZhang

> Strategy Description

## Overview

The dual thrust strategy sets upper and lower bands based on the opening price and previous day's range, going long on upside breakouts and short on downside breakouts. It aims to capture trend trading opportunities formed by the breakouts.

## Strategy Principle 

1. Calculate the highest high HH and lowest low LL over the recent N bars.

2. Calculate the highest close HC and lowest close LC of the previous day.

3. The previous day's range Range is the larger of HH-LC and HC-LL. 

4. The upper band BuyLine is opening price plus k1*Range.

5. The lower band SellLine is opening price minus k2*Range.

6. Go long when close breaks above BuyLine. Go short when close breaks below SellLine.

## Advantage Analysis

Main advantages of this strategy:

1. Captures trend formed by breakouts around the opening price.

2. Bands are set automatically based on historical volatility, avoiding subjectivity.

3. Customizable k values suit products with different volatility. 

4. Breakout signals have relatively high quality. 

5. Flexible holding periods to capture trends on different timeframes.

## Risk Analysis

Main risks of this strategy: 

1. Difficulty determining reasonable range for the bands, overfit risks.

2. Breakouts may turn out to be false signals, need stop loss.

3. Fixed holding period cannot adapt dynamically to market.

4. Insufficient backtest data leads to curve fitting. 

5. Difficulty implementing long and short trading together.

Solutions:

1. Optimize k values on larger dataset to avoid overfitting.

2. Set proper stop loss to limit loss per trade. 

3. Add trend filter to avoid countertrend trading.

4. Consider reducing holding period to intraday. 

5. Live validation with gradual position sizing.

## Optimization Directions

Some ways to improve the strategy:

1. Dynamically adjust k values for the bands.

2. Add volume filter to confirm breakout signals.

3. Use moving stop loss to protect profits.

4. Assess breakout strength for position sizing. 

5. Distinguish between trend and range to decompose strategy.

## Summary

The dual thrust strategy can capture trend trading opportunities around the opening price. But parameter settings and holding period optimizations have large room for improvements considering risk control. For live trading, start with conservative parameters and size up positions gradually.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.67|k1|
|v_input_2|0.62|k2|
|v_input_3|240|TimeFrame|
|v_input_4|20|len|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-18 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Dual Thrust Strategy",overlay=true,initial_capital=1000)
k1=input(0.67,type=float,step=0.01)
k2=input(0.62,type=float,step=0.01)
TimeFrame=input('240')
len=input(20)
HH=security(syminfo.tickerid,TimeFrame,highest(high,len),barmerge.lookahead_off)
LC=security(syminfo.tickerid,TimeFrame,lowest(close,len),barmerge.lookahead_off)
HC=security(syminfo.tickerid,TimeFrame,highest(close,len),barmerge.lookahead_off)
LL=security(syminfo.tickerid,TimeFrame,lowest(low,len),barmerge.lookahead_off)
Range=max(HH-LC,HC-LL)
BuyLine=security(syminfo.tickerid,"D",open,barmerge.lookahead_off)+k1*Range
SellLine=security(syminfo.tickerid,"D",open,barmerge.lookahead_off)-k2*Range
plot(BuyLine,color=blue,linewidth=2,offset=1,transp=70)
plot(SellLine,color=red,linewidth=2,offset=1,transp=70)


LongCondition=crossover(close,BuyLine)
ShortCondition=crossunder(close,SellLine)
strategy.entry("enter long",true,1,when=LongCondition)
strategy.entry("enter short",false,1,when=ShortCondition)
plotshape(LongCondition and strategy.position_size<0?low:na,style=shape.labelup,location=location.absolute,color=blue,text="Long",textcolor=white,size=size.small)
plotshape(ShortCondition and strategy.position_size>0?high:na,style=shape.labeldown,location=location.absolute,color=red,text="Short",textcolor=white,size=size.small)
alertcondition(LongCondition and strategy.position_size<0,title='Long_DT')
alertcondition(ShortCondition and strategy.position_size>0,title='Short_DT')
```

> Detail

https://www.fmz.com/strategy/427267

> Last Modified

2023-09-19 16:27:12
