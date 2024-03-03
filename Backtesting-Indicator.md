
> Name

Backtesting-Indicator

> Author

ChaoZhang

> Strategy Description

For anyone interested, Here is an example of how to put backtesting results into an Indicator. This calculates the same values as you find in the Summary Screen of the built in Strategy backtester. This will use the same result size as the standard backtester i.e. 5 minute chart grabs roughly 1 month of data, 1 minute chart grabs 1 week of data, etc... I tried to keep this as self-contained as possible so I put most of the code for the results in the bottom of the Indicator. The results stop at the last completed trade signal i.e. a Buy has a Sell to it. This is the same indicator I posted earlier with the PCT Trailing StopLoss so you will see that code in here as well. As said in my previous posting, the indicator is just a simple EMA crossover to give it something to do and I would not recommend using this indicator on its own, but instead copy the code to your own indicator if you find it useful. I also left the code in so that you can switch back to a Strategy if you want to verify the results.

Additional Notes:
- The results are within an acceptable margin of error due to the fact that the Indicator is having to calculate based on when the Buy and Sell Signal occur as opposed to when actual trades occur like in the Strategy Backtester
- I was trying to find a way to set the number of Buy Signals to use i.e. show me the results from the past 100 trades but couldn't sort out the logic. I am open to suggestions. Also keep in mind I am not a coder by profession so if you have any ideas on that front, please explain it to me as though I am a 5 year old child and provide code examples if possible :)
- I included the Strategy results in the Screen Shots so that you can see where the results line up.
Additional Additional Note:
This is not financial advice. Use at your own risk.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/eb4b87871c37c0b178.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|3000|(?Back Test)Opening Balance:|
|v_input_float_2|0.9|Allocated % (90% = .9):|
|v_input_float_3|0.075|Commission%|
|v_input_float_4|0.035|(?Sell Settings)Stop Loss Loss: 1% = .01|
|v_input_float_5|0.0065|Trailing Stop Arm: 1%=.01|
|v_input_float_6|0.003|Trailing Stop Trigger: 1%=.01 |
|v_input_int_1|14|(?Trend Line Settings) ema 1 Length|
|v_input_1_close|0|ema 1 Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|22| ema 2 Length|
|v_input_2_close|0|ema 2 Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|200| ema 3 Length|
|v_input_3_close|0|ema 2 Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-02-16 00:00:00
end: 2022-05-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Thumpyr
//@version=5

/////////////////////////////////////////////////////////////////////////////////////////////
// Comment out Strategy Line and remove // from Indicator line to turn into Indicator  //////
// Do same for alertConidction at bottom                                               //////
/////////////////////////////////////////////////////////////////////////////////////////////
//strategy("Backtesting-Strategy", shorttitle="Backtesting- Strategy", overlay=true, margin_long=100, margin_short=100, default_qty_type=strategy.percent_of_equity,default_qty_value=90, commission_type=strategy.commission.percent, commission_value=.075)
indicator(title="Backtesting- Indicator", shorttitle="Backtesting - Indicator", overlay=true)//


openBalance  =input.float(3000, minval=0, title="Opening Balance:", group="Back Test")
pctAllocated =input.float(.9, minval=0, title="Allocated % (90% = .9):", group="Back Test")
commission   =input.float(.075, minval=0, title="Commission%", group="Back Test")


sellLow=input.float(.035, minval=0, title="Stop Loss Loss: 1% = .01", group="Sell Settings")
trailStopArm=input.float(.0065, minval=0, title="Trailing Stop Arm: 1%=.01", group="Sell Settings")
trailStopPct=input.float(.003, minval=0, title="Trailing Stop Trigger: 1%=.01 ", group="Sell Settings")

/////////////////////////////////////////////////
//               Indicators                    //
/////////////////////////////////////////////////
ema1Len = input.int(14, minval=1, title=" ema 1 Length", group="Trend Line Settings")
ema1Src = input(close, title="ema 1 Source", group="Trend Line Settings")
ema1 = ta.ema(ema1Src, ema1Len)
plot(ema1, title="EMA", color=color.blue)

ema2Len = input.int(22, minval=1, title=" ema 2 Length", group="Trend Line Settings")
ema2Src = input(close, title="ema 2 Source", group="Trend Line Settings")
ema2 = ta.ema(ema2Src, ema2Len)
plot(ema2, title="EMA", color=color.orange)

ema3Len = input.int(200, minval=1, title=" ema 3 Length", group="Trend Line Settings")
ema3Src = input(close, title="ema 2 Source", group="Trend Line Settings")
ema3 = ta.ema(ema3Src, ema3Len)
plot(ema3, title="EMA", color=color.gray)


/////////////////////////////
////   Buy Conditions    ////
/////////////////////////////

alertBuy = ta.crossover(ema1,ema2) and close>ema3

////////////////////////////////////////////////////////////////////
////   Filter redundant Buy Signals if Sell has not happened    ////
////////////////////////////////////////////////////////////////////
var lastsignal = 0
showAlertBuy   = 0
if(alertBuy and lastsignal != 1)
    showAlertBuy           := 1
    lastsignal             := 1
buyAlert= showAlertBuy     > 0

var buyActive = 0
if  buyAlert
    buyActive :=1

//////////////////////////////////////////////////////////////////
////          Track Conditions at buy Signal                  ////
//////////////////////////////////////////////////////////////////

alertBuyValue = ta.valuewhen(buyAlert, close,0)
alertSellValueLow = alertBuyValue - (alertBuyValue*sellLow)

////////////////////////////////////////////////////////////
/////            Trailing Stop                         /////
////////////////////////////////////////////////////////////
var TSLActive       = 0         //Check to see if TSL has been activated
var TSLTriggerValue = 0.0 //Initial and climbing value of TSL
var TSLStop         = 0.0       //Sell Trigger
var TSLRunning      = 0       //Continuously check each bar to raise TSL or not

//  Check if a Buy has been triggered and set initial value for TSL //
if buyAlert
    TSLTriggerValue := alertBuyValue+(alertBuyValue*trailStopArm)
    TSLActive  := 0
    TSLRunning := 1
    TSLStop := TSLTriggerValue - (TSLTriggerValue*trailStopPct)
    

//  Check that Buy has triggered and if Close has reached initial TSL//  
//  Keeps from setting Sell Signal before TSL has been armed w/TSLActive//
beginTrail=TSLRunning==1 and TSLActive==0 and close>alertBuyValue+(alertBuyValue*trailStopArm) and ta.crossover(close,TSLTriggerValue)
if beginTrail
    TSLTriggerValue :=close
    TSLActive :=1
    TSLStop :=TSLTriggerValue - (TSLTriggerValue*trailStopPct)
    
//  Continuously check if TSL needs to increase and set new value //    
runTrail= TSLActive==1 and (ta.crossover(close,TSLTriggerValue) or close>=TSLTriggerValue)
if runTrail
    TSLTriggerValue :=close
    TSLStop :=TSLTriggerValue - (TSLTriggerValue*trailStopPct)
    
//  Verify that TSL is active and trigger when close cross below TSL Stop//
TSL=TSLActive==1 and (ta.crossunder(close,TSLStop) or (close[1]>TSLStop and close<TSLStop)) 

// Plot point of inital arming of TSL//
TSLTrigger=TSLActive==1 and TSLActive[1]==0
plotshape(TSLTrigger, title='TSL Armed', location=location.abovebar, color=color.new(color.blue, 0), size=size.small, style=shape.cross, text='TSL Armed')


////////////////////////////////////////////////////////////
/////             Sell Conditions                    ///////
////////////////////////////////////////////////////////////
Sell1 = TSL
Sell2 = ta.crossunder(close,alertSellValueLow)

alertSell = Sell1 or Sell2
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
////        Remove Redundant Signals                    ////
////////////////////////////////////////////////////////////
showAlertSell = 0
if(alertSell and lastsignal != -1)
    showAlertSell           := 1
    lastsignal              := -1
sellAlert= showAlertSell    > 0

if sellAlert
    TSLActive  :=0
    TSLRunning :=0
    buyActive  :=0
/////////////////////////////////////////
//  Plot Buy and Sell Shapes on Chart  //
/////////////////////////////////////////
plotshape(buyAlert,  title='Buy' , location=location.belowbar , color=color.new(color.green, 0), size=size.small , style=shape.triangleup   , text='Buy')
plotshape(sellAlert, title='Sell', location=location.abovebar , color=color.new(color.red, 0)  , size=size.small , style=shape.triangledown , text='Sell')

/////////////////////////////////////////////////////////////////////////////////////////////
//                        Remove // on alertCondition to enable Alerts                     //
/////////////////////////////////////////////////////////////////////////////////////////////
//Alerts
alertcondition(title='Buy Alert', condition=buyAlert, message='Buy Conditions are Met')
alertcondition(title='Sell Alert', condition=sellAlert, message='Sell Conditions are Met')
/////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////
////  Comment out this section if setup as Indicator    ////
////////////////////////////////////////////////////////////
//longCondition = buyAlert
//if (longCondition)
//    strategy.entry("Buy", strategy.long)
//    alert(message='Buy', freq=alert.freq_once_per_bar_close)
    
//shortCondition = sellAlert
//if (shortCondition)
//    strategy.close_all(sellAlert,"Sell")
//    alert(message='Sell', freq=alert.freq_once_per_bar_close)
/////////////////////////////////////////////////////////////


if buyAlert
    strategy.entry("Enter Long", strategy.long)
else if sellAlert
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/363797

> Last Modified

2022-05-17 14:05:42
