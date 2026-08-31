
> Name

Triple-EMA-With-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10b6cf7f56f7e01b277.png)


## Overview

This strategy implements a typical triple exponential moving average (EMA) trading system. It generates trading signals by comparing fast 5-day EMA, medium 20-day EMA and slow 50-day EMA. It also uses the current bar's close price compared to previous bar's close to filter fake signals. In addition, a trailing stop loss is used to lock in profits.

## Principles 

When 5-day EMA crosses above 20-day EMA, and all three EMAs are bullishly aligned (5-day EMA > 20-day EMA > 50-day EMA), and current bar's close is above previous bar's close by certain ticks, go long. When 5-day EMA crosses below 20-day EMA, and all three EMAs are bearishly aligned (5-day EMA < 20-day EMA < 50-day EMA), and current bar's close is below previous bar's close by certain ticks, go short.

After entry, when price runs by certain ticks, a trailing stop loss will be initiated to keep adjusting the stop loss based on price fluctuation, in order to lock in larger profits.

## Advantages

1. Using triple EMAs to generate signals can effectively filter market noise and identify trends. Fast EMA reflects latest changes, medium EMA determines trend direction, and slow EMA filters oscillations. 

2. Comparing current bar's close with previous bar's close further filters fake signals and reduces unnecessary trades.

3. Trailing stop loss dynamically adjusts stop loss based on price action to maximize profit locking.

4. Flexible parameter settings of this strategy allows optimization across different products and timeframes from daily to minute bars.

## Risks

1. Frequent EMA crossovers can generate excessive trades in ranging markets, increasing costs from commissions and slippage.

2. Trailing stop loss may prematurely exit the trend during huge whipsaws.

3. EMA lag may cause missing major turning points and losses. 

4. Parameters like EMA periods, trailing stop ticks require optimization for different products and timeframes.

## Enhancement Directions 

1. Incorporate other indicators like MACD, KD to filter trading signals.

2. Test and optimize parameters for specific products and timeframes to find best combinations.

3. Dynamically adjust parameters through human oversight or machine learning.

4. Consider disabling trailing stop and holding full position for specific market conditions.

5. Replace simple trailing stop loss with more advanced automatic profit taking mechanisms.

## Conclusion

This strategy integrates three common technical analysis techniques - EMA crossover, price breakout and trailing stop loss into a rather comprehensive and robust trend following trading system. Through parameter optimization, it can be adapted to different products and timeframes and performs well in strong trending markets. But it also has some typical weaknesses of technical analysis strategies that need further optimization to handle more market situations. Overall, this strategy provides a simple and practical idea for quantitative trading by demonstrating some common strategy concepts very well.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|═════ Data Filtering ═════|
|v_input_2|2021|Year|
|v_input_3|false|Month (0=ALL)|
|v_input_4|100|Stop Loss (ticks)|
|v_input_5|130|Trailing S/L (ticks)|
|v_input_6|15|Buffer (ticks)|
|v_input_7|5|EMA 1|
|v_input_8|20|EMA 2|
|v_input_9|50|EMA 3|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-02 12:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Matt Dearden - IndoPilot
// @version=4

/////////////////////////////////////////////////////// Initial Parameters /////////////////////////////////////////////////////// 
SystemName = "Triple EMA Strategy"
ShortSystemName = "TEMA"
InitPosition = 0
InitCapital = 50000
InitCommission = 0.004 //approx value to compensate for Oanda spreads
InitPyramidMax = 0
CalcOnorderFills = true

strategy(title=SystemName, shorttitle=ShortSystemName, overlay=true, pyramiding=InitPyramidMax, 
 default_qty_type=strategy.cash, default_qty_value=InitPosition, commission_type=strategy.commission.percent, 
 commission_value=InitCommission, initial_capital=InitCapital, max_lines_count=500, 
 max_labels_count=500, process_orders_on_close=false, calc_on_every_tick=false) 

///////////////////////////////////////////////////////////// Inputs /////////////////////////////////////////////////////////////

DateFilter = input(false, "═════ Data Filtering ═════") 
InitYear = input(title="Year", type=input.integer, defval=2021, minval=2000, maxval=2021)
InitMonth = input(title="Month (0=ALL)", type=input.integer, defval=0, minval=0, maxval=12)
InitStopLoss = input(title="Stop Loss (ticks)", type=input.integer, defval=100, minval=0, maxval=1000) 
TrailingStopLoss = input(title="Trailing S/L (ticks)", type=input.integer, defval=130, minval=0, maxval=1000) 
InitBuffer = input(title="Buffer (ticks)", type=input.integer, defval=15, minval=0, maxval=1000) 
InitEMA1 = input(title="EMA 1", type=input.integer, defval=5, minval=0, maxval=1000) 
InitEMA2 = input(title="EMA 2", type=input.integer, defval=20, minval=0, maxval=1000) 
InitEMA3 = input(title="EMA 3", type=input.integer, defval=50, minval=0, maxval=1000) 

//////////////////////////////////////////////////////////// Variables ///////////////////////////////////////////////////////////

var StopLoss = float(0.0)
var StartPrice = float(0.0)
//setup multipliers and catch JPY difference
Multiplier = syminfo.currency == "JPY" ? 10 : 1000
//get the daily exchange rate from yesterday
//X_rate = security(AccountCurrency+syminfo.currency, "D", close[1]) 
OrderQty = 1  
Buffer = InitBuffer / (Multiplier * 100)

/////////////////////////////////////////////////////// Triple EMA Strategy //////////////////////////////////////////////////////

EMA1 = ema(close, InitEMA1)
EMA2= ema(close, InitEMA2)
EMA3 = ema(close, InitEMA3)

//entry conditions
longCondition = crossover(EMA1, EMA2) and close > EMA3 and EMA1 > EMA3 and EMA2 > EMA3 and close > (close[1] + Buffer) 
shortCondition = crossunder(EMA1, EMA2) and close < EMA3 and EMA1 < EMA3 and EMA2 < EMA3 and close < (close[1] - Buffer) 

/////////////////////////////////////////////////////// Trailing Stoploss ////////////////////////////////////////////////////////

if (strategy.position_size > 0 and (close > (StartPrice + (TrailingStopLoss / (100 * Multiplier)))))  
    StopLoss := max(StopLoss, close - (TrailingStopLoss / (100 * Multiplier))) 
    strategy.exit("Long Stoploss", "Long") 
    
if (strategy.position_size < 0 and (close < (StartPrice - (InitStopLoss / (100 * Multiplier))))) 
    StopLoss := min(StopLoss, close + (TrailingStopLoss / (100 * Multiplier)))
    strategy.exit("Short Stoploss", "Short") 
    
///////////////////////////////////////////////////////// Setup entries /////////////////////////////////////////////////////////

if (longCondition)
    StartPrice := close
    StopLoss := StartPrice - (InitStopLoss / (100 * Multiplier)) 
    strategy.entry("Long", strategy.long, qty=OrderQty)
    strategy.exit("Long Stoploss", "Long")

if (shortCondition)
    StartPrice := close
    StopLoss := StartPrice + (InitStopLoss / (100 * Multiplier)) 
    strategy.entry("Short", strategy.short, qty=OrderQty)
    strategy.exit("Short Stoploss", "Short")
    
///////////////////////////////////////////////////////// Draw the EMAs /////////////////////////////////////////////////////////
plot(EMA1, "EMA1", color=#00FF00)
plot(EMA2, "EMA2", color=#FF0000)
plot(EMA3, "EMA3", color=#4040FF)

```

> Detail

https://www.fmz.com/strategy/429478

> Last Modified

2023-10-17 15:05:41
