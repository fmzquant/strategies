
> Name

哈森破坏转向策略Heikin-Ashi-Reverse-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12e58f09124d01f95ae.png)

### Overview

This strategy mainly uses improved Heikin-Ashi candles to identify reversal points in price and catch significant trend changes. It belongs to short-term trading strategies. The strategy calculates open, high, low and close prices of candles using HA, and determines the final color based on price relationship. Green candles represent rising prices and red candles represent falling prices. The strategy uses HA candle color change as trading signals to go short on green to red change and go long on red to green change. It is a typical reversal strategy.

### Strategy Logic

The core logic of the strategy is to detect color change in HA candles to determine price reversal.

First, get open, high, low and close prices from HA data or original data based on input parameter.

```
haClose = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close

haOpen = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open  

haHigh = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high

haLow = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, low) : low
```

Then calculate current HA open and close according to formulas.

```
haclose = (haOpen + haHigh + haLow + haClose) / 4  

haopen := na(haopen[1]) ? (haOpen + haClose) / 2 : (haopen[1] + haclose[1]) / 2
```

Further get HA highest and lowest prices. 

```
hahigh = max(haHigh, max(haopen, haclose))

halow = min(haLow, min(haopen, haclose))  
```

Determine HA candle color based on open/close relationship.

```
hacolor = haclose > haopen ? color.green : color.red
```

Identify reversal signals based on HA color change between bars.

```
turnGreen = haclose > haopen and haclose[1] <= haopen[1]  

turnRed = haclose <= haopen and haclose[1] > haopen[1] 
```

Open long/short positions when signals trigger.

```
strategy.entry("long", 1, when=turnGreen)
  
strategy.entry("short", 0, when=turnRed) 
```

Close positions on opposite signals.

```
strategy.close("long", when=turnRed)
```

By detecting HA candle color changes, the strategy captures price reversal points for reversal trading.

### Advantages

The main advantages of this strategy are:

1. Using improved HA candles filters noise and identifies reversals more clearly.

2. Simple logic based on HA color change, easy to understand and implement.

3. Reversal trading captures trend changes quickly for profit. 

4. Customizable to use HA candles or not for different markets.

5. Candlestick arrows visually indicate reversals.

6. Parameters like timeframe can be optimized for different products.

### Risks

There are also some risks to note:

1. Reversal trading can be vulnerable to traps. Signals need solid reliability.

2. Frequent whipsaws may occur in ranging markets.

3. Unable to determine trend duration, may reverse then continue trend.

4. Single indicator prone to false signals, should combine with others. 

5. Overfitting needs to be avoided through optimization.

Solutions:

1. Optimize parameters for reliable signals.

2. Add trend filter to avoid ranging markets.

3. Use stop loss to control loss per trade.

4. Confirm signals with other indicators to avoid false signals.

5. Thoroughly backtest to optimize parameters and prevent overfitting.

### Improvement

The strategy can be improved in the following ways:

1. Optimize timeframe for different products.

2. Test HA candle usage per product characteristics.

3. Add trend filter to avoid whipsaws in ranging markets. 

4. Implement dynamic stops based on market volatility.

5. Confirm signals with additional indicators.

6. Incorporate position sizing based on risk management.

7. Expand for multi-product arbitrage trading. 

8. Adjust parameters based on backtest results to prevent overfitting.

### Conclusion

This strategy leverages the strengths of improved HA candles to discover potential reversal points through HA color changes. Compared to regular candles, HA filters noise for cleaner signals. The strategy implements reversal trading logic in a simple and intuitive way that is easy to use for live trading. But reversal trades face trapping risks and should be optimized for greater signal accuracy. Combining with trend analysis and other factors can form a more complete system. Overall, this strategy provides an approach to identifying reversals using HA data and can be expanded on for robust reversal trading strategies.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Heikin Ashi Candles in Algo Calculations|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-09 00:00:00
end: 2023-11-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Heikin-Ashi Change Strategy", overlay=true)

UseHAcandles    = input(true, title="Use Heikin Ashi Candles in Algo Calculations")
//
// === /INPUTS ===

// === BASE FUNCTIONS ===

haClose = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close
haOpen  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open
haHigh  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high
haLow   = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, low) : low

// Calculation HA Values 
haopen = 0.0
haclose = (haOpen + haHigh + haLow + haClose) / 4
haopen := na(haopen[1]) ? (haOpen + haClose) / 2 : (haopen[1] + haclose[1]) / 2
hahigh = max(haHigh, max(haopen, haclose))
halow = min(haLow, min(haopen, haclose))

// HA colors
hacolor = haclose > haopen ? color.green : color.red

// Signals
turnGreen = haclose > haopen and haclose[1] <= haopen[1]
turnRed = haclose <= haopen and haclose[1] > haopen[1]

// Plotting
bgcolor(hacolor)

plotshape(turnGreen, style=shape.arrowup, location=location.belowbar, color=color.green)
plotshape(turnRed, style=shape.arrowdown, location=location.abovebar, color=color.red)

// Alerts
alertcondition(turnGreen, "ha_green", "ha_green")
alertcondition(turnRed, "ha_red", "ha_red")

strategy.entry("long", 1, when=turnGreen)
//strategy.entry("short", 0, when=turnRed)
strategy.close("long", when=turnRed)

```

> Detail

https://www.fmz.com/strategy/432333

> Last Modified

2023-11-16 15:44:14
