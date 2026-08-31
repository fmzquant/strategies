
> Name

Trend-Following-Strategy-with-Stop-Loss-and-Take-Profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ea70e915d48d78ac52.png)

## Overview

The main idea of this strategy is to determine the direction of long and short based on the weekly price trend. In an uptrend, it goes long when there is a bullish candlestick pattern. It takes profit when the price rises to the preset take profit level and stops loss when it falls to the preset stop loss level.

## Strategy Logic

The strategy first defines the conditions for judging the weekly trend:

```
isUptrend = close > close[1]
isDowntrend = close < close[1] 
```

If the current close is higher than the previous close, it is judged as an uptrend. Otherwise, it is a downtrend.

Then the intraday trading signal is defined: 

```
buyCondition = getPrevDayClose() > getPrevDayOpen() and getPrevDayOpen() > getPrevDayClose()[1] and isUptrend
```

That is, the previous close is higher than the previous open (bullish candle), and the previous open is higher than the close before previous day (gap up), and it is in an uptrend. These criteria meet the long entry condition.

After entering the position, the stop loss is set to the previous close minus 1.382 times the previous day's real body:

```
stopLoss = getPrevDayClose() - 1.382 * (getPrevDayClose() - getPrevDayOpen())
```

The take profit is set to the previous close plus 2 times the difference between the previous close and stop loss: 

```  
takeProfit = getPrevDayClose() + 2 * (getPrevDayClose() - stopLoss)
```

This realizes the stop loss and profit taking strategy.

## Advantage Analysis

The advantages of this strategy include:

1. Trading along trends avoids risks of counter-trend shorting  
2. Entry signal combines bullish candle and gap up to avoid premature long entry
3. Stop loss positioning is reasonable to control single loss
4. Take profit range is large with high profit potential

## Risk Analysis

There are also some risks:  

1. Unable to determine trend reversal points, may miss turning opportunities
2. Stop loss is too close with higher probability of being trapped
3. No consideration of cost control, profit may decrease at high trading frequency

To control these risks, some optimizations can be considered:

1. Set trailers near stop loss to trail the stop loss
2. Add cost control module to limit order frequency 
3. Add judgment of SUPPORT/RESISTANCE

## Optimization Directions

The strategy can also be optimized in the following ways:

1. Determine trend based on more factors like MA direction, volume change etc. 
2. Optimize entry signals with more candlestick patterns
3. Dynamically trail stop loss and take profit according to price fluctuation
4. Add quantitative module to control position sizing  
5. Combinations of multiple timeframes to filter based on higher level trends

## Summary  

Overall this is quite a practical strategy, highlighting trading along trends while controlling risks. It can serve as a basic intraday trading strategy and can be modularly optimized for different markets and products to create diversified trading portfolios. In actual usage, controlling costs and avoiding traps remain critical, so maintaining proper mentality is key.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-24 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Trend Following Strategy with Stop Loss and Take Profit", overlay=true)

// Function to get previous day's close and open
getPrevDayClose() =>
    request.security(syminfo.tickerid, "D", close[1])

getPrevDayOpen() =>
    request.security(syminfo.tickerid, "D", open[1])

// Determine weekly trend
isUptrend = close > close[1]
isDowntrend = close < close[1]

// Determine daily conditions for buy
buyCondition = getPrevDayClose() > getPrevDayOpen() and getPrevDayOpen() > getPrevDayClose()[1] and isUptrend

// Calculate stop loss and take profit
stopLoss = getPrevDayClose() - 1.382 * (getPrevDayClose() - getPrevDayOpen())
takeProfit = getPrevDayClose() + 2 * (getPrevDayClose() - stopLoss)

// Strategy logic
if (isUptrend)
    strategy.entry("Buy", strategy.long, when = buyCondition)
    strategy.exit("Take Profit/Stop Loss", from_entry="Buy", loss=stopLoss, profit=takeProfit)
    
if (isDowntrend)
    strategy.entry("Sell", strategy.short)

// Plotting the trend on the chart
plotshape(series=isUptrend, title="Uptrend", color=color.green, style=shape.triangleup, location=location.abovebar)
plotshape(series=isDowntrend, title="Downtrend", color=color.red, style=shape.triangledown, location=location.belowbar)

// Plotting stop loss and take profit levels on the chart
plot(stopLoss, color=color.red, title="Stop Loss", linewidth=2, style=plot.style_cross)
plot(takeProfit, color=color.green, title="Take Profit", linewidth=2, style=plot.style_cross)

```

> Detail

https://www.fmz.com/strategy/442382

> Last Modified

2024-02-21 14:55:41
