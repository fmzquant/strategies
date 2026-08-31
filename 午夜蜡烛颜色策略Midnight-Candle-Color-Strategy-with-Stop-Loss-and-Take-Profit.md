
> Name

午夜蜡烛颜色策略Midnight-Candle-Color-Strategy-with-Stop-Loss-and-Take-Profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1432ecb6c8ae1da45ed.png)


## Overview 

This strategy trades based on the midnight candle color with a 1-hour delay, by analyzing the color of previous day's midnight 0 o'clock candle to determine the trading direction at 1 o'clock next day. It goes long when 0 o'clock candle is green and goes short when 0 o'clock candle is red. Stop loss and take profit levels are also set.

## Strategy Logic

The core logic of this strategy is based on the "midnight effect" in markets, where the color of 0 o'clock candle from previous day represents overall market sentiment and can be used to determine market direction after next day's open.  

Specifically, the strategy first judges if the current candle is 0 o'clock candle. If yes, record it as green if close is higher than open, otherwise red. On the next bar at 1 o'clock, go long/short according to the 0 o'clock candle color from previous day, with stop loss and take profit set.

By delaying entry for 1 hour, it prevents the volatile price at midnight affecting market entrance.

## Advantages

1. Simple logic using 0 o'clock candle color to determine market direction 
2. 1-hour delayed entry avoids volatile midnight price risk
3. Set stop loss and take profit to limit loss and ensure profit

## Risks

1. 0 o'clock candle color may not fully represent next day market trend with some uncertainty  
2. Does not consider risk of sudden big price swings due to major economic events etc
3. Stop loss and take profit need continuous optimization and testing, otherwise risks being caught or profit limited

## Improvement Areas

1. Combine more factors to judge indication effectiveness of 0 o'clock candle, e.g. volume, range etc
2. Test different entry delays such as 2 hours, 3 hours etc  
3. Dynamically adjust stop loss and take profit to better adapt to market volatility
 
## Summary  

The strategy has clear and simple logic, judging next day direction by 0 o'clock candle color and controlling risks with stop loss/take profit. It is a beginner-friendly short-term trading strategy. But there are still some uncertainties, requiring continuous optimization and validation in live trading.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-28 00:00:00
end: 2024-01-04 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Midnight Candle Color Strategy with 1-Hour Delay and SL/TP", shorttitle="12AM +1H SL/TP Strat", overlay=true)

// Adjust for New York time (UTC-5 or UTC-4 for Daylight Saving Time)
// Assuming UTC-5 for now; adjust as necessary for Daylight Saving Time
nyHour(hour) => (hour - 5) % 24

// Function to check if the current bar is the 12:00 AM New York time bar
isMidnightBar() =>
    nyHour(hour) == 0 and minute == 0

// Function to check if the current bar is the 1:00 AM New York time bar (1 hour after midnight)
is1AMBar() =>
    nyHour(hour) == 1 and minute == 0

// Variable to store the color of the previous day's midnight candle
var color midnightCandleColorPrevDay = na

// Determine the color of the previous day's midnight candle
if isMidnightBar()
    midnightCandleColorPrevDay := close[1] > open[1] ? color.green : color.red

// Strategy execution at 1:00 AM based on the color of the previous day's midnight candle
if is1AMBar()
    if midnightCandleColorPrevDay == color.green
        strategy.entry("Long", strategy.long)
        strategy.exit("Take Profit", "Long", limit=close + 57 * syminfo.mintick, stop=close - 200 * syminfo.mintick)
    if midnightCandleColorPrevDay == color.red
        strategy.entry("Short", strategy.short)
        strategy.exit("Take Profit", "Short", limit=close - 50 * syminfo.mintick, stop=close + 200 * syminfo.mintick)

// Optional: Plot a marker for visualization
plotshape(series=isMidnightBar(), style=shape.triangleup, location=location.belowbar, color=color.new(midnightCandleColorPrevDay, 90), size=size.small)
plotshape(series=is1AMBar(), style=shape.triangledown, location=location.abovebar, color=color.blue, size=size.small)

```

> Detail

https://www.fmz.com/strategy/437811

> Last Modified

2024-01-05 16:37:35
