
> Name

基于直方图破裂的交易策略Fundamental-Pinbar-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12616597a8788459ee8.png)

## Overview

This strategy utilizes the pinbar pattern with trend determination by moving averages to trade breakouts in the direction of the trend. It generates trading signals when price breaks out of the high/low formed by the pinbar candlestick. Additionally, it uses fast and slow moving averages to determine the overall trend direction, avoiding wrong signals during range-bound price action. 

## Strategy Logic

1. Compute fast (20-period) and slow (50-period) moving averages.

2. Identify bullish (close>open) and bearish (close<open) pinbars based on the candlestick.

3. Check if the pinbar high/low breaks the high/low of the previous candle. A bullish pinbar breaking previous high gives a long signal. A bearish pinbar breaking previous low gives a short signal.

4. Also check if the fast MA is above the slow MA to determine an uptrend, and vice versa for a downtrend. 

5. Long signals are only valid when fast/slow MA indicates an uptrend. Short signals are only valid when fast/slow MA indicates a downtrend. This avoids wrong signals during range-bound price action.

6. On valid long signals, go long with predefined stoploss and takeprofit. On valid short signals, go short with predefined stoploss and takeprofit. 

7. If the fast MA crosses below the slow MA, close out any existing position.

## Advantages

- Uses pinbar high/low as breakout levels representing strong momentum.

- Considers trend direction to avoid wrong signals during range-bound price action, improving accuracy. 

- Captures trend and breakouts, performing well in trending markets.

- Parameters can be optimized for different products and timeframes.

## Risks and Mitigation

- Failed breakout risk. Can be mitigated by using wider breakout levels and stronger momentum.

- Inaccurate trend identification risk. Can be mitigated by tweaking MA parameters or adding other trend indicators. 

- Stoploss too tight leading to premature exit. Can dynamically adjust stoploss based on product and timeframe. 

- Takeprofit too tight restricting profits. Can dynamically set profit targets and risk-reward ratios.

## Enhancement Opportunities 

- Overall, the MA, breakout, stoploss and takeprofit parameters can be optimized across products and timeframes for a tailored strategy.

- Different MAs like EMA, SMA etc. can be tested to find the optimal indicator. 

- Additional indicators like Momentum can improve trend accuracy.

- Parameters can be dynamically optimized using machine learning techniques. 

- Breakout success rate can be improved through statistical learning.

## Summary

This strategy combines trend and momentum for theoretically filtered signals. The key is robust parameter optimization across products and timeframes for good performance. Additionally, auxiliary indicators and machine learning techniques can further improve the strategy. With continuous enhancements, this can become a robust trend-breakout trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Equity Risk (%)|
|v_input_2|1.9|Stop Loss (x*ATR, Float)|
|v_input_3|3.1|Risk : Reward (1 : x*SL, Float)|
|v_input_4|20|Fast MA (Period)|
|v_input_5|50|Slow MA (Period)|
|v_input_6|14|ATR (Period)|
|v_input_7|true|Use MA Slope (Boolean)|
|v_input_8|true|Bull Slope Angle (Deg)|
|v_input_9|-1|Bear Slope Angle (Deg)|
|v_input_10|true|Exit When MA Re-Cross (Boolean)|
|v_input_11|3|Cancel Entry After X Bars (Period)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-15 00:00:00
end: 2023-11-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Backtested Time Frame: H1
//Default Settings: Are meant to run successfully on all currency pairs to reduce over-fitting.
//Risk Warning: This is a forex trading robot, backtest performance will not equal future performance, USE AT YOUR OWN RISK.
//Code Warning: Although every effort has been made for robustness, this code has not been vetted by independent 3rd parties.
strategy("Pin Bar Strategy v1", overlay=true)

// User Input
usr_risk = input(title="Equity Risk (%)",type=input.integer,minval=1,maxval=100,step=1,defval=3,confirm=false)
atr_mult = input(title="Stop Loss (x*ATR, Float)",type=input.float,minval=0.1,maxval=100,step=0.1,defval=1.9,confirm=false)
trd_rewd = input(title="Risk : Reward (1 : x*SL, Float)",type=input.float,minval=0.1,maxval=100,step=0.1,defval=3.1,confirm=false)
sma_fast = input(title="Fast MA (Period)",type=input.integer,minval=1,maxval=500,step=1,defval=20,confirm=false)
sma_slow = input(title="Slow MA (Period)",type=input.integer,minval=1,maxval=500,step=1,defval=50,confirm=false)
atr_valu = input(title="ATR (Period)",type=input.integer,minval=1,maxval=500,step=1,defval=14,confirm=false)
use_slpe = input(title="Use MA Slope (Boolean)",type=input.bool,defval=true,confirm=false)
slp_long = input(title="Bull Slope Angle (Deg)",type=input.integer,minval=-90,maxval=90,step=1,defval=1,confirm=false)
slp_shrt = input(title="Bear Slope Angle (Deg)",type=input.integer,minval=-90,maxval=90,step=1,defval=-1,confirm=false)
emg_exit = input(title="Exit When MA Re-Cross (Boolean)",type=input.bool,defval=true,confirm=false)
ent_canc = input(title="Cancel Entry After X Bars (Period)",type=input.integer,minval=1,maxval=500,step=1,defval=3,confirm=false)

// Create Indicators
fastSMA = sma(close, sma_fast)
slowSMA = sma(close, sma_slow)
bullishPinBar = ((close > open) and ((open - low) > 0.66 * (high - low))) or ((close < open) and ((close - low) > 0.66 * (high - low)))
bearishPinBar = ((close > open) and ((high - close) > 0.66 * (high - low))) or ((close < open) and ((high - open) > 0.66 * (high - low)))
atr = atr(atr_valu)

// Specify Trend Conditions
smaUpTrend = (fastSMA > slowSMA) and (fastSMA[1] > slowSMA[1]) and (fastSMA[2] > slowSMA[2]) and (fastSMA[3] > slowSMA[3]) and (fastSMA[4] > slowSMA[4])
smaDnTrend = (fastSMA < slowSMA) and (fastSMA[1] < slowSMA[1]) and (fastSMA[2] < slowSMA[2]) and (fastSMA[3] < slowSMA[3]) and (fastSMA[4] < slowSMA[4])
candleUpTrend = (close[5] > fastSMA[5]) and (open[5] > fastSMA[5]) and (close[6] > fastSMA[6]) and (open[6] > fastSMA[6]) and (close[7] > fastSMA[7]) and (open[7] > fastSMA[7]) and (close[8] > fastSMA[8]) and (open[8] > fastSMA[8]) and (close[9] > fastSMA[9]) and (open[9] > fastSMA[9]) and (close[10] > fastSMA[10]) and (open[10] > fastSMA[10])
candleDnTrend = (close[5] < fastSMA[5]) and (open[5] < fastSMA[5]) and (close[6] < fastSMA[6]) and (open[6] < fastSMA[6]) and (close[7] < fastSMA[7]) and (open[7] < fastSMA[7]) and (close[8] < fastSMA[8]) and (open[8] < fastSMA[8]) and (close[9] < fastSMA[9]) and (open[9] < fastSMA[9]) and (close[10] < fastSMA[10]) and (open[10] < fastSMA[10])

// Specify Piercing Conditions
bullPierce = ((low < fastSMA) and (open > fastSMA) and (close > fastSMA)) or ((low < slowSMA) and (open > slowSMA) and (close > slowSMA))
bearPierce = ((high > fastSMA) and (open < fastSMA) and (close < fastSMA)) or ((high > slowSMA) and (open < slowSMA) and (close < slowSMA))

// MA Slope Function
angle(_source) =>
    rad2degree=180/3.14159265359
    ang=rad2degree*atan((_source[0] - _source[1])/atr(atr_valu)) 

// Calculate MA Slope
fastSlope=angle(fastSMA)
slowSlope=angle(slowSMA)
slopingUp = fastSlope > slp_long
slopingDn = fastSlope < slp_shrt
    
// Specify Entry Conditions
longEntry = smaUpTrend and bullishPinBar and bullPierce
shortEntry = smaDnTrend and bearishPinBar and bearPierce
longEntryWithSlope = smaUpTrend and bullishPinBar and bullPierce and slopingUp
shortEntryWithSlope = smaDnTrend and bearishPinBar and bearPierce and slopingDn

// Specify Secondary Exit Conditions
longExit = crossunder(fastSMA, slowSMA)
shortExit = crossover(fastSMA, slowSMA)

// Long Entry Function
enterlong() =>
    risk = usr_risk * 0.01 * strategy.equity
    stopLoss = low[1] - atr[1] * atr_mult
    entryPrice = high[1]
    units = risk / (entryPrice - stopLoss)
    takeProfit = entryPrice + trd_rewd * (entryPrice - stopLoss)
    strategy.entry("long", strategy.long, units, stop=entryPrice)
    strategy.exit("exit long", "long", stop=stopLoss, limit=takeProfit)
    
// Short Entry Function
entershort() =>
    risk = usr_risk * 0.01 * strategy.equity
    stopLoss = high[1] + atr[1] * atr_mult
    entryPrice = low[1]
    units = risk / (stopLoss - entryPrice)
    takeProfit = entryPrice - trd_rewd * (stopLoss - entryPrice)
    strategy.entry("short", strategy.short, units, stop=entryPrice)
    strategy.exit("exit short", "short", stop=stopLoss, limit=takeProfit)
    
// Execute Long Entry w/o Slope
if (longEntry and use_slpe == false)
    enterlong()
    
// Execute Long Entry w/ Slope
if (longEntryWithSlope and use_slpe == true)
    enterlong()

// Exit Long Due to Re-Cross
if(longExit and strategy.position_size > 0 and emg_exit)    
    strategy.order("exit long, re-cross", strategy.short, abs(strategy.position_size))

// Cancel the Long Entry
strategy.cancel("long", barssince(longEntry) > ent_canc)

// Execute Short Entry w/o Slope
if (shortEntry and use_slpe == false)
    entershort() 
    
// Execute Short Entry w/ Slope
if (shortEntryWithSlope and use_slpe == true)
    entershort() 

// Exit Short Due to Re-Cross
if(shortExit and strategy.position_size < 0 and emg_exit)    
    strategy.order("exit short, re-cross", strategy.long, abs(strategy.position_size))

// Cancel the Short Entry
strategy.cancel("short", barssince(shortEntry) > ent_canc)

// Plot Moving Averages to Chart
plot(fastSMA, color=color.red)
plot(slowSMA, color=color.blue)

// Plot Pin Bars to Chart
plotshape(bullishPinBar, style=shape.arrowup, location=location.abovebar, color=#FF0000, text='')
plotshape(bearishPinBar, style=shape.arrowdown, location=location.belowbar, color=#0000FF, text='')
```

> Detail

https://www.fmz.com/strategy/432206

> Last Modified

2023-11-15 15:25:57
