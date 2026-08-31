
> Name

最佳滑点追踪止损策略Best-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses a trailing stop loss mechanism to move the stop loss dynamically based on price fluctuation range, achieving dynamic stops. The trailing stop is activated after price reaches a profit target, aiming to protect profits while avoiding premature stop outs. It improves on common stop loss strategies.

## Strategy Logic

The strategy enters based on double MA crossovers judging trend direction. 

The innovation lies in the stop loss design:

1. A stop trigger line is set. Trailing stop starts after price breaks this line.

2. The stop loss line trails based on the Percentage parameter. E.g. 3% trailing means 3% below latest low.

3. Position is closed when price reverses to touch the trailing stop loss line.

This ensures the stop will trail profits automatically, while reducing the chance of stopping out when profit is still good.

## Advantages

- Percentage-based automatic trailing stop  
- Trigger line avoids premature activation
- Dynamic trailing protects profits
- Avoids stopping out due to short retracements
- Trigger line and percentage adjustable to markets

## Risks

- MA crossover may lag, generating false signals
- Improper trigger line settings causes premature or late activation
- Improper percentage settings gives too wide or tight stops
- Cannot fully avoid whipsaw risks 
- Parameters need optimizing for market volatility
   
Risks can be reduced by:

- Optimizing MA periods for better entries
- Testing different trigger values for best positioning
- Backtesting ideal percentages based on historical drawdowns
- Considering re-entries to avoid missing trends
- Adding filters to avoid false breakouts

## Enhancement Directions

The strategy can be improved by:

1. Optimizing the double MA periods

2. Optimizing or removing trigger line

   Directly start trailing or use different values for different products
   
3. Testing different trailing percentage values

   Find optimal values for different products
   
4. Adding re-entry rules

   Set re-entry conditions after stops are hit

5. Adjusting stop strictness by volatility

   Wider stops in increased volatility environments
   
## Summary

This strategy uses a trailing percentage stop with a trigger line before activating. This dynamic mechanism balances protecting profits and avoiding unnecessary stops based on market movements. But parameters need optimization for different products, plus additional filters on entries to improve accuracy. Re-entries also help avoid missing trends after stopping out prematurely. Continuous improvements are needed for adaptivity.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use stop Loss|
|v_input_2|3|Trail Loss (%)|
|v_input_3|true|Use stop Loss Trigger|
|v_input_4|2|SL Trigger (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//@author=Daveatt

SystemName = "BEST Trailing Stop Strategy"
TradeId = "BEST"

InitCapital = 100000
InitPosition = 100
InitCommission = 0.075
InitPyramidMax = 1
CalcOnorderFills = true
CalcOnTick = true
DefaultQtyType = strategy.fixed
DefaultQtyValue = strategy.fixed
Precision = 2
Overlay=true


// strategy(title=SystemName, shorttitle=SystemName, overlay=Overlay, 
//  pyramiding=InitPyramidMax, initial_capital=InitCapital, default_qty_type=DefaultQtyType, default_qty_value=InitPosition, commission_type=strategy.commission.percent, 
//  commission_value=InitCommission, calc_on_order_fills=CalcOnorderFills, calc_on_every_tick=CalcOnTick, precision=2)


src = close
// Calculate moving averages
fastSMA = sma(close, 15)
slowSMA = sma(close, 45)

// Calculate trading conditions
enterLong  = crossover(fastSMA, slowSMA)
enterShort = crossunder(fastSMA, slowSMA)

// trend states
since_buy  = barssince(enterLong)
since_sell = barssince(enterShort)
buy_trend  = since_sell > since_buy
sell_trend = since_sell < since_buy 

change_trend = (buy_trend and sell_trend[1]) or (sell_trend and buy_trend[1])

//plot(buy_trend ? 1 : 0, title='buy_trend', transp=100)
//plot(sell_trend ? 1 : 0, title='sell_trend', transp=100)

// get the entry price
entry_price = valuewhen(enterLong or enterShort, close, 0)

// Plot moving averages
plot(series=fastSMA, color=color.teal)
plot(series=slowSMA, color=color.orange)

// Plot the entries
plotshape(enterLong, style=shape.circle, location=location.belowbar, color=color.green, size=size.small)
plotshape(enterShort, style=shape.circle, location=location.abovebar, color=color.red, size=size.small)



///////////////////////////////
//======[ Trailing STOP ]======//
///////////////////////////////

// use SL?
useSL = input(true, "Use stop Loss")
// Configure trail stop level with input
StopTrailPerc = input(title="Trail Loss (%)", type=input.float, minval=0.0, step=0.1, defval=3) * 0.01
// Will trigger the take profit trailing once reached
use_SL_Trigger = input(true, "Use stop Loss Trigger")
StopTrailTrigger   = input(2.0, "SL Trigger (%)",minval=0,step=0.5,type=input.float) * 0.01


StopLossPriceTrigger = 0.0
StopLossPriceTrigger := if (use_SL_Trigger)
    if buy_trend
        entry_price * (1 + StopTrailTrigger) 
    else
        entry_price * (1 - StopTrailTrigger)
else
    -1


var SL_Trigger_Long_HIT = false
SL_Trigger_Long_HIT := useSL and use_SL_Trigger and buy_trend and high >= StopLossPriceTrigger
 ? true : SL_Trigger_Long_HIT[1]


var SL_Trigger_Short_HIT = false
SL_Trigger_Short_HIT := useSL and use_SL_Trigger and sell_trend and low <= StopLossPriceTrigger
 ? true : SL_Trigger_Short_HIT[1]


display_long_SL_trigger     = useSL and buy_trend  and use_SL_Trigger 
 and SL_Trigger_Long_HIT == false and StopLossPriceTrigger != -1
display_short_SL_trigger    = useSL and sell_trend and use_SL_Trigger 
 and SL_Trigger_Short_HIT == false and StopLossPriceTrigger != -1
display_SL_trigger          = display_long_SL_trigger or display_short_SL_trigger

plot(display_SL_trigger ? StopLossPriceTrigger : na, title='SLPriceTrigger', transp=0, 
 color=color.maroon, style=plot.style_circles, linewidth=3)


// Determine trail stop loss prices
longStopPrice = 0.0, shortStopPrice = 0.0

longStopPrice := if useSL and buy_trend
    stopValue = low * (1 - StopTrailPerc)
    max(stopValue, longStopPrice[1])
else
    0

shortStopPrice := if useSL and sell_trend
    stopValue = high * (1 + StopTrailPerc)
    min(stopValue, shortStopPrice[1])
else
    999999

//////////////////////////////////////////////////////////////////////////////////////////
//*** STOP LOSS HIT CONDITIONS TO BE USED IN ALERTS  ***//
//////////////////////////////////////////////////////////////////////////////////////////

cond_long_stop_loss_hit  = useSL and buy_trend and crossunder(low, longStopPrice[1]) 
 and (SL_Trigger_Long_HIT or use_SL_Trigger == false)
cond_short_stop_loss_hit = useSL and sell_trend and crossover(high, shortStopPrice[1]) 
 and (SL_Trigger_Short_HIT or use_SL_Trigger == false)


// Plot stop loss values for confirmation
plot(series=useSL and buy_trend and low >= longStopPrice 
 and (SL_Trigger_Long_HIT or use_SL_Trigger == false)
 ? longStopPrice : na,
 color=color.fuchsia, style=plot.style_cross,
 linewidth=2, title="Long Trail Stop")

plot(series=useSL and sell_trend and high <= shortStopPrice 
 and (SL_Trigger_Short_HIT or use_SL_Trigger == false)
 ? shortStopPrice : na,
 color=color.fuchsia, style=plot.style_cross,
 linewidth=2, title="Short Trail Stop")

close_long  = cond_long_stop_loss_hit
close_short = cond_short_stop_loss_hit

// Submit entry orders
strategy.entry(TradeId + " L", long=true, when=enterLong)
strategy.close(TradeId + " L", when=close_long)

//if (enterShort)
strategy.entry(TradeId + " S", long=false, when=enterShort)
strategy.close(TradeId + " S", when=close_short)


if change_trend
    SL_Trigger_Long_HIT := false
    SL_Trigger_Short_HIT := false

```

> Detail

https://www.fmz.com/strategy/427513

> Last Modified

2023-09-21 20:58:22
