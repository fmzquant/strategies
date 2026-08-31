
> Name

均线突破策略Moving-Average-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The moving average breakout strategy is a short-term trading strategy that utilizes moving averages to determine entries and exits. It is characterized by its simplicity and ease of use. 

## Strategy Logic

The core logic relies on two moving averages, a fast line and a slow line, to gauge the trend of prices. The fast line has a shorter period and is more sensitive. The slow line has a longer period and is more stable. 

The code allows users to set the fast line period shortPeriod and the slow line period longPeriod via input parameters. The values of the two moving averages are calculated as shortSMA and longSMA.

When the fast moving average crosses above the slow moving average, it signals an upside breakout and long entry. When the fast MA crosses below the slow MA, it signals a downside breakout and short entry.

Long entry condition:

```
Fast MA crosses above slow MA
Fast MA > Slow MA
```

Short entry condition: 

```
Fast MA crosses below slow MA
Fast MA < Slow MA 
```

The strategy also incorporates stop loss, take profit and position sizing settings to control risks.

## Advantages

- Simple to use, easy for beginners to grasp
- Moving averages filter out some noise
- Flexibility in fine tuning MA periods for different timeframes
- Predefined stop loss and take profit

## Risks

- Susceptible to false breakouts and whipsaws
- Not ideal for range-bound choppy markets
- Lagging indication, entries could be late
- Unable to filter trend reversals effectively 

Risk Management:

- Add filters to avoid false signals
- Apply strategy when trend is obvious
- Optimize MA parameters for better entries
- Allow wider stops to avoid premature stops

## Enhancement Opportunities

- Optimize MA parameters to find best combinations
- Add additional indicators like BOLL channels or KD 
- Improve exit rules to maximize profits
- Test robustness across different instruments
- Incorporate machine learning using big data

## Conclusion

The moving average breakout strategy is easy to understand, generating signals with fast and slow MAs. But it also has some flaws like false breaks and lagging issues. With parameter tuning, additional filters and other enhancements, the strategy can be improved. Overall it serves as a beginner-friendly first step into algorithmic trading, and paves the way for more advanced strategies after grasping the core concepts.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|3|(?Candle)Validation Period|
|v_input_float_1|true|(?Order)Qty|
|v_input_float_2|true|Maximum Active Open Position|
|v_input_float_3|true|(?Long)Take Profit (%)|
|v_input_float_4|25|Stop Loss (%)|
|v_input_float_5|0.2|Trailing Stop (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © YohanNaftali

//@version=5

///////////////////////////////////////////////////////////////////////////////
// Heikin Ashi Candle Startegy
// ver 2021.12.29
// © YohanNaftali
// This script composed by Yohan Naftali for educational purpose only 
// Reader who will use this signal must do own research
///////////////////////////////////////////////////////////////////////////////
strategy(
     title = 'Heikin Ashi Candle Startegy Long',  
     shorttitle = 'HA Strategy Long',  
     format = format.price,
     precision = 0,
     overlay = true)

// Input
validationPeriod = input.int( 
     defval = 3, 
     title = 'Validation Period', 
     group = 'Candle')

qtyOrder = input.float(
     defval = 1.0,
     title = 'Qty', 
     group = 'Order')

maxActive = input.float(
     defval = 1.0,
     title = 'Maximum Active Open Position', 
     group = 'Order')

// Long Strategy
tpLong = input.float(
     defval = 1,
     title = "Take Profit (%)",
     minval = 0.0, 
     step = 0.1, 
     group = "Long") * 0.01

slLong = input.float(
     defval = 25,
     title = "Stop Loss (%)", 
     minval=0.0, 
     step=0.1,
     group="Long") * 0.01

trailingStopLong = input.float(
     defval = 0.2,
     title = "Trailing Stop (%)",
     minval = 0.0, 
     step = 0.1,
     group = 'Long') * 0.01

// Calculation
haTicker = ticker.heikinashi(syminfo.tickerid)
haClose = request.security(haTicker, timeframe.period, close)
haOpen = request.security(haTicker, timeframe.period, open)

// Long
limitLong = tpLong > 0.0 ? strategy.position_avg_price * (1 + tpLong) : na
stopLong = slLong > 0.0 ? strategy.position_avg_price * (1 - slLong) : na
float trailLong = 0.0
trailLong := if strategy.position_size > 0
    trailClose = close * (1 - trailLong)
    math.max(trailClose, trailLong[1])
else
    0

isGreen = true
for i = 0 to validationPeriod-1
    isGreen := isGreen and haClose[i] > haOpen[i]        
isLong = isGreen and haClose[validationPeriod] < haOpen[validationPeriod]



plot(
     limitLong,
     title = 'Limit', 
     color = color.rgb(0, 0, 255, 0), 
     style = plot.style_stepline,
     linewidth = 1)

plot(
     trailLong,
     title = 'Trailing', 
     color = color.rgb(255, 255, 0, 0), 
     style = plot.style_stepline,
     linewidth = 1)

plot(
     stopLong,
     title = 'Stop', 
     style = plot.style_stepline,
     color = color.rgb(255, 0, 0, 0), 
     linewidth = 1)

// plotshape(
//      isLong, 
//      title = 'Entry', 
//      style = shape.arrowup, 
//      location = location.belowbar, 
//      offset = 1, 
//      color = color.new(color.green, 0), 
//      text = 'Long Entry',
//      size = size.small)

// Strategy
strategy.risk.max_position_size(maxActive)
strategy.risk.allow_entry_in(strategy.direction.long)

strategy.entry(
     id = "Long", 
     direction = strategy.long, 
     qty = qtyOrder,  
     when = isLong,       
     alert_message = "LN")
if (strategy.position_size > 0)
    strategy.exit(
         id = "Long Exit",
         from_entry = "Long",
         limit = limitLong,
         stop = stopLong,
         trail_price = trailLong,
         alert_message = "LX")      
```

> Detail

https://www.fmz.com/strategy/427894

> Last Modified

2023-09-26 16:18:37
