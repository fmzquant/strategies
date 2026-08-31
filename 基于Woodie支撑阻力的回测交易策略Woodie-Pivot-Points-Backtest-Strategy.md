
> Name

基于Woodie支撑阻力的回测交易策略Woodie-Pivot-Points-Backtest-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses Woodie model to calculate pivots and trade breakouts for backtest. It is a classic pivot breakout strategy.

## Strategy Logic

1. Calculate current period pivot and bands using previous period high, low and close.

2. Go long if price breaks above pivot from below.

3. Go short if price breaks below pivot from above.

4. Option to trade reverse signals. 

5. Color code different trade signals.

## Advantages

1. Woodie model calculation is simple and intuitive.

2. Trading pivot breakouts is a common technique. 

3. Visualized pivots and signal markings.

4. Simple and practical default parameters. 

5. Code is easy to understand and modify.

## Risks

1. Risks of false breakouts after initial breakout.

2. No effective way to set stops and exits.

3. Incorrect model and parameters negatively affect performance.

4. Fails to differentiate trends and ranges. 

5. Signals may not be timely.

## Enhancement

1. Test different period parameters for optimum values.

2. Add trend filter for additional validation.

3. Incorporate stop loss and take profit for risk control.

4. Assess pullbacks after breakouts for continuing signals.

5. Research ways to gauge the strength of breakouts. 

6. Consider combining with other factors for confirmation.

## Conclusion

This strategy trades Woodie pivot breakouts. Optimizing parameters, adding stops and exits can improve stability for a reliable short-term system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|width|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-13 00:00:00
end: 2023-02-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/08/2018
// Simply input the vales of the high, low and closing price of the previous 
// period to calculate the Woodie pivot point and the associated resistance 
// and support levels for the present period.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Woodie Pivot Points Backtest", overlay = true)
width = input(2, minval=1)
xHigh  = security(syminfo.tickerid,"D", high[1])
xLow   = security(syminfo.tickerid,"D", low[1])
xClose = security(syminfo.tickerid,"D", close[1])
reverse = input(false, title="Trade reverse")
xPP = (xHigh+xLow+(xClose*2)) / 4
pos = iff(close[1] < xPP[1] and close > xPP, 1,
       iff(close < xPP, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))       
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xPP, color=blue, title="WPP", style = circles, linewidth = width)
```

> Detail

https://www.fmz.com/strategy/427397

> Last Modified

2023-09-20 17:08:11
