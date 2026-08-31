
> Name

Heiken-Ashi-Bar-Color-Change-Strategy

> Author

ChaoZhang

> Strategy Description


### Overview

This strategy judges market trends by analyzing the color change of Heiken Ashi candles and automatically buys and sells. It generates buy signals when the candle color changes from red to green and sell signals when the color changes from green to red. This is a trend following strategy.

### Strategy Logic

First calculate the open, close, high and low prices of the Heiken Ashi candle. The candle color is determined by the close and open prices. If the close price is greater than the open price, the candle is green, otherwise it is red. When the close price of the current bar is greater than the open price, and the previous bar's close price is less than or equal to the previous bar's open price, a buy signal is generated. When the close price of the current bar is less than or equal to the open price, and the previous bar's close price is greater than the previous bar's open price, a sell signal is generated.

This way, by observing the change in Heiken Ashi candle colors, it judges the trend. When the color changes from red to green, it enters a bull market. When the color changes from green to red, it enters a bear market, to capture changes in market trends.

### Advantages of the Strategy

1. Using Heiken Ashi candles filters market noise and identifies trends.
2. Judging trend change points by candle color changes makes entry timing more accurate.
3. The strategy logic is simple and clear, easy to implement and optimize. 
4. Moving stop loss can be configured to strictly control risks.

### Risks and Solutions

1. There is some lag, unable to enter in real time at reversal points.
2. There is risk of stop loss being hit.

Solutions:

1. Combine with other indicators like Bollinger Bands to optimize entry timing.
2. Adopt moving stop loss or timely stop loss to strictly control risks.

### Optimization Directions

1. Optimize stop loss strategy to avoid being hit.
2. Add moving average and other indicators to improve entry accuracy.  
3. Add position sizing to avoid excessive losses.
4. Combine with RSI etc. to avoid overtrading.
5. Test different products to find optimal parameters.

### Conclusion

The Heiken Ashi bar color change strategy judges trends by analyzing candle color changes, going long when red changes to green, and going short when green changes to red. This is a relatively simple trend following strategy. The advantage is its strong ability to identify trend change points, but entry timing has some lag, requiring further optimization. With reasonable strategy framework, parameter optimization and strict risk control are key to success. Overall, the strategy has clear, easy logic, and is worth researching and applying further.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-08 00:00:00
end: 2023-10-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Kozlod - Heikin-Ashi Bar Color Change Strategy", overlay = true)

// 
// author: Kozlod
// date: 2018-09-03
// https://www.tradingview.com/u/Kozlod/
// 

// Calculation HA Values 
haopen   = 0.0
haclose  = ((open + high + low + close)/4)
haopen  := na(haopen[1]) ? (open + close)/2 : (haopen[1] + haclose[1]) / 2
hahigh   = max(high, max(haopen, haclose))
halow    = min(low,  min(haopen, haclose))

// HA colors
hacolor =  haclose  > haopen ? green : red

// Signals
turnGreen = haclose  >  haopen and haclose[1] <= haopen[1]
turnRed   = haclose  <= haopen and haclose[1]  > haopen[1]

// Plotting
bgcolor(hacolor)

plotshape(turnGreen, style = shape.arrowup,   location = location.belowbar, color = green)
plotshape(turnRed,   style = shape.arrowdown, location = location.abovebar, color = red) 

// Alerts
strategy.entry("long",  true,  when = turnGreen)
strategy.entry("short", false, when = turnRed)

```

> Detail

https://www.fmz.com/strategy/428797

> Last Modified

2023-10-09 15:38:46
