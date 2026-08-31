
> Name

Best-Trailing-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The main idea of this strategy is to go long when the fast MA crosses over the slow MA, go short when the fast MA crosses below the slow MA, and set a trailing take profit after entering the position. When the price reaches the take profit line, it will trigger the trailing take profit, constantly adjusting the take profit line to maximize profits.

## Strategy Logic

The strategy consists of the following main parts:

1. Calculate the fast and slow moving averages. The fast MA period is 20 and the slow MA period is 50. 

2. Determine entry conditions. Go long when fast MA crosses over slow MA, go short when fast MA crosses below slow MA.

3. Determine trend direction. Record number of bars since long and short signals, judge if it's an uptrend or downtrend.

4. Entry price. Record the price when trading signals triggered as entry price.

5. Set take profit lines. For longs, take profit is at high * (1 + take profit percentage); for shorts, take profit is at low * (1 - take profit percentage). 

6. Trailing take profit. Take profit line keeps adjusting, moving fixed percentage favouring the profitable direction.

7. Take profit trigger. When price touches take profit line, close position for profit.

8. There is also an optional activation feature. Only when price first breaks through the activation level will trailing take profit be triggered. 

## Advantage Analysis 

The biggest advantage of this strategy is maximizing profits by trailing take profit. When price moves in favouring direction, take profit line keeps moving towards favouring direction to lock in profits.

It also adds trend filtering with MA crossovers to avoid unnecessary whipsaws in non-trending markets. Activation feature avoids triggering trailing take profit by small price fluctuations.

By combining trend, entry, take profit, it can ride the trend to gain profits continuously and maximize return.

## Risk Analysis

The main risk is that it requires adequate price movement to reach take profit. If price quickly reverses, it may cause losses.

Also, frequent take profit triggering in choppy markets may cause losses. 

And improperly set parameters like too high take profit percentage can increase risk.

Risk can be managed by setting proper take profit percentage, avoiding trading in choppy markets, or using stop loss.

## Optimization

The strategy can be optimized in the following aspects:

1. Optimize MA parameters by testing different periods to find better combinations.

2. Optimize activation feature by testing different activation levels.

3. Optimize take profit percentage through backtesting.

4. Add stop loss at proper levels to control risk.

5. Test additional filters like volume, ATR stop etc. 

6. Test on different markets like stocks, forex, crypto.

## Conclusion

This strategy integrates multiple modules like trend, entry, trailing take profit to maximize profits by riding trends. But risks must be managed, avoid choppy markets, optimize parameters before using. It provides an idea of gaining bigger profits through trailing take profit.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|20|Fast Length|
|v_input_3|50|Fast Length|
|v_input_4|true|Use take profit|
|v_input_5|true|Trailing Profit (%)|
|v_input_6|true|Use Take Profit Trigger|
|v_input_7|3|Take Profit Trigger (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-10-06 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//@author=Daveatt

SystemName = "BEST Trailing Profit Strategy"
// This string is to personalize the text that appears with your orders on the chart through strategy() calls and entry/exit markers, and in the alert default message.
// Although leaving it empty will not cause problems in study mode,
TradeId = "BEST"
// These values are used both in the strategy() header and in the script's relevant inputs as default values so they match.
// Unless these values match in the script's Inputs and the TV backtesting Properties, results between them cannot be compared.
InitCapital = 1000000
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


// strategy(title=SystemName, shorttitle=SystemName, overlay=true, 
//  pyramiding=0, default_qty_value=100, precision=7, currency=currency.USD,
//  commission_value=0.2,commission_type=strategy.commission.percent, initial_capital=10000)

//
//  Author:   Daveatt
//  Revision: R0.1 Beta
//  Date:     8-Dec-2019
//

// inputs

src   = input(defval=close, type=input.source, title="Source")

slowLength   = input(20, "Fast Length",minval=2,step=1)
fastLength   = input(50, "Fast Length",minval=2,step=1)

// Calculate moving averages
fastSMA = sma(src, slowLength)
slowSMA = sma(src, fastLength)

// Calculate trading conditions
enterLong  = crossover(fastSMA, slowSMA)
enterShort = crossunder(fastSMA, slowSMA)

// trend states
since_buy  = barssince(enterLong)
since_sell = barssince(enterShort)
buy_trend  = since_sell > since_buy
sell_trend = since_sell < since_buy 

change_trend = (buy_trend and sell_trend[1]) or (sell_trend and buy_trend[1])

// get the entry price
entry_price = valuewhen(enterLong or enterShort, src, 0)

// Plot moving averages
plot(series=fastSMA, color=color.teal)
plot(series=slowSMA, color=color.orange)

// Plot the entries
plotshape(enterLong, style=shape.circle, location=location.belowbar, color=color.green, size=size.small)
plotshape(enterShort, style=shape.circle, location=location.abovebar, color=color.red, size=size.small)



///////////////////////////////
//======[ Take Profit ]======//
///////////////////////////////

// Use TP?
useTP = input(true, "Use take profit")
// TP trailing
ProfitTrailPerc     = input(1.0, "Trailing Profit (%)",minval=0,step=0.5,type=input.float) * 0.01

use_TP_Trigger = input(true, "Use Take Profit Trigger")
// Will trigger the take profit trailing once reached
takeProfitTrigger   = input(3.0, "Take Profit Trigger (%)",minval=0,step=0.5,type=input.float) * 0.01


// ttp := ttp>tp ? tp : ttp

takeprofitPriceTrigger = 0.0
takeprofitPriceTrigger := if (use_TP_Trigger)
    if (buy_trend)
        entry_price * (1 + takeProfitTrigger) 
    else
        entry_price * (1 - takeProfitTrigger)
else
    -1

//plot(entry_price, title='entry_price', transp=100)

var TP_Trigger_Long_HIT = false
TP_Trigger_Long_HIT := useTP and use_TP_Trigger and buy_trend and high >= takeprofitPriceTrigger
 ? true : TP_Trigger_Long_HIT[1]


var TP_Trigger_Short_HIT = false
TP_Trigger_Short_HIT := useTP and use_TP_Trigger and sell_trend and low <= takeprofitPriceTrigger
 ? true : TP_Trigger_Short_HIT[1]


display_long_TP_trigger     = useTP and buy_trend  and TP_Trigger_Long_HIT == false 
 and takeprofitPriceTrigger != -1
display_short_TP_trigger    = useTP and sell_trend and TP_Trigger_Short_HIT == false 
 and takeprofitPriceTrigger != -1
display_TP_trigger          = display_long_TP_trigger or display_short_TP_trigger


//???
// @hugo: Will display the TP trigger as long as not hit
// once the TP trigger is hit, the TP trailing will activate
plot(display_TP_trigger ? takeprofitPriceTrigger : na, title='takeprofitPriceTrigger', transp=0, color=color.orange, 
 style=plot.style_cross, linewidth=3)

longTrailTP= 0.0, shortTrailTP = 0.0

// Trailing Profit
// Start trailing once trigger is reached
longTrailTP := if useTP and buy_trend 
    tpValue = high * (1 + ProfitTrailPerc)
    max(tpValue, longTrailTP[1])
else
    0

shortTrailTP := if useTP and sell_trend
    tpValue = low * (1 - ProfitTrailPerc)
    min(tpValue, shortTrailTP[1])
else
    999999

//plot(longTrailTP, title='debug longTrailTP', transp=100)
//plot(shortTrailTP, title='debug shortTrailTP', transp=100)

//////////////////////////////////////////////////////////////////////////////////////////
//*** TRAILING TAKE PROFIT HIT CONDITIONS TO BE USED IN ALERTS  ***//
//////////////////////////////////////////////////////////////////////////////////////////


//???
// @hugo: I use crossover/crossunder for the alerts to trigger the events only once
cond_long_trail_tp_hit      = useTP and buy_trend   and crossover(high, longTrailTP[1]) 
 and (TP_Trigger_Long_HIT or use_TP_Trigger == false)
cond_short_trail_tp_hit     = useTP and sell_trend  and crossunder(low, shortTrailTP[1]) 
 and (TP_Trigger_Short_HIT or use_TP_Trigger == false)
// ???


// Plot take profits values for confirmation
// Display the trailing TP until not hit
plot(series= useTP and buy_trend and high <= longTrailTP and 
 (TP_Trigger_Long_HIT or use_TP_Trigger == false) ? longTrailTP : na,
 color=color.aqua, style=plot.style_circles,
 linewidth=2, title="Long Trail TP")

plot(series= useTP and sell_trend and low >= shortTrailTP and 
 (TP_Trigger_Short_HIT or use_TP_Trigger == false) ? shortTrailTP : na,
 color=color.aqua, style=plot.style_circles,
 linewidth=2, title="Short Trail TP")


close_long  = cond_long_trail_tp_hit
close_short = cond_short_trail_tp_hit

// Submit entry orders
strategy.entry("EL", long=true, when=enterLong)
strategy.close("EL", when=close_long)

//if (enterShort)
strategy.entry("ES", long=false, when=enterShort)
strategy.close("ES", when=close_short)


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// ALERTS ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////
//* Put Entry Alerts below *//
//////////////////////////////

// IN STUDY MODE ONLY

// ⚠️⚠️⚠️ For alerts on the signal itself ⚠️⚠️⚠️
//alertcondition(buy_event, "Open Long", "LONG")
//alertcondition(sell_event, "Open Short", "SHORT")

// For the closes you will want to trigger these alerts on condition with alert 
// option "Once Per Bar" for TP and SL

if change_trend
    TP_Trigger_Long_HIT := false
    TP_Trigger_Short_HIT := false
```

> Detail

https://www.fmz.com/strategy/428583

> Last Modified

2023-10-07 10:28:54
