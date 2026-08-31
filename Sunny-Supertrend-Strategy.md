
> Name

Sunny-Supertrend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d0bd70ffc1a1e819eb.png)

## Overview
The Sunny Supertrend strategy is a trend-following strategy based on the ATR and SuperTrend indicators. It can accurately predict trend reversals and works perfectly as a timing indicator. The strategy can increase patience and help traders enter and exit the markets at the right time.  

## Strategy Logic
The strategy uses the SuperTrend indicator to determine the current trend direction. When the SuperTrend indicator changes direction, we think a trend reversal may occur. In addition, the strategy also uses the direction of candlestick bodies for auxiliary judgment. When a potential reversal signal appears and the candlestick body direction is consistent with the previous one, the invalid signal is filtered out.

Specifically, the strategy generates trading signals according to the following logic:

1. Use the SuperTrend indicator to determine the main trend direction  
2. When the SuperTrend indicator direction changes, a potential reversal signal is generated
3. If the candlestick body direction is consistent with the previous one at this time, the reversal signal is filtered out
4. If the candlestick body direction changes, the reversal signal is confirmed and a trading signal is generated
  

## Advantage Analysis 
1. Based on the Supertrend indicator, it can accurately determine trend reversal points
2. Filter out invalid signals by combining candlestick body directions to improve signal quality
3. Suitable as a timing indicator to guide investors to choose reasonable entry and exit time  
4. Widely applicable to any timeframe and different varieties with strong adaptability

## Risks and Solutions
1. The Supertrend indicator tends to generate redundant signals which need to be filtered
Solution: This strategy uses the candlestick body direction for auxiliary judgment to effectively filter out invalid signals  

2. Supertrend parameters are prone to over-optimization  
Solution: Use default parameters to avoid manual tweaking and over-optimization
  
3. Unable to process ultra-fast trend reversals
Solution: Adjust the ATR period parameter appropriately to cope with faster market movements 

## Optimization Directions
1. Try different combinations of ATR period parameters
2. Add Volume or volatility indicators to help filter signals
3. Combine with other systems to improve strategy performance 
4. Develop stop loss mechanisms to control single loss

## Conclusion
The Sunny Supertrend strategy is an efficient trend reversal strategy based on the SuperTrend indicator. It combines candlestick body directions for auxiliary judgment, which can effectively filter out invalid signals and improve signal quality. This strategy is simple to operate, highly adaptable, and can be widely used across multiple products and timeframes. By reasonably optimizing parameters and increasing stop loss mechanisms, the strategy's performance can be further enhanced.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Length|
|v_input_float_1|3|Factor|
|v_input_int_1|true|Start Date|
|v_input_int_2|true|Start Month|
|v_input_int_3|2021|Start Year|
|v_input_int_4|true|End Date|
|v_input_int_5|2|End Month|
|v_input_int_6|2021|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-12 00:00:00
end: 2023-12-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Sunny Supertrend Strategy", overlay=true, default_qty_type=strategy.percent_of_equity)

atrPeriod = input(10, "ATR Length")
factor = input.float(3.0, "Factor", step = 0.01)

[_, direction] = ta.supertrend(factor, atrPeriod)

shor= close > open and close[1] > open[1] and close[2] > open[2] 
lon = open > close and open[1] > close[1] and  open[2] > close[2]
tt= ta.change(direction) < 0
ss= ta.change(direction) > 0
long= tt
longexit = lon or ss
short= ss
shortexit = shor or tt

longPosMem = false
longexitPosMem = false
shortPosMem = false
shortexitPosMem = false

longPosMem := long ? true : short ? false : longPosMem[1]
longexitPosMem := longexit ? true : shortexit ? false : longexitPosMem[1]
shortPosMem := short ? true : long ? false : shortPosMem[1]
shortexitPosMem := shortexit ? true : longexit ? false : shortexitPosMem[1]

longy = long and not(longPosMem[1])
longexity = longexit and not(longexitPosMem[1])
shorty = short and not(shortPosMem[1])
shortexity = shortexit and not(shortexitPosMem[1])

//Use this to customize the look of the arrows to suit your needs.
plotshape(longy, location=location.abovebar, color=color.green, style=shape.arrowup, text="Buy")
plotshape(longexity, location=location.top, color=color.green, style=shape.xcross, text="Buy exit")
plotshape(shorty, location=location.belowbar, color=color.red, style=shape.arrowdown, text="Sell")
plotshape(shortexity, location=location.bottom, color=color.red, style=shape.xcross, text="Sell exit")


//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
// STEP 1:
// Make input options that configure backtest date range
startDate = input.int(title="Start Date", defval=1, minval=1, maxval=31)
startMonth = input.int(title="Start Month", 
     defval=1, minval=1, maxval=12)
startYear = input.int(title="Start Year",
     defval=2021, minval=1800, maxval=2100)

endDate = input.int(title="End Date",
     defval=1, minval=1, maxval=31)
endMonth = input.int(title="End Month",
     defval=2, minval=1, maxval=12)
endYear = input.int(title="End Year",
     defval=2021, minval=1800, maxval=2100)

// STEP 2:
// Look if the close time of the current bar
// falls inside the date range
inDateRange =  true



// STEP 3:
// Submit entry orders, but only when bar is inside date range
if (inDateRange and longy)
    strategy.entry("enter long",strategy.long,when= longy)
    strategy.close("long",when=longexity)


if (inDateRange and shorty)
    strategy.entry("enter short",strategy.short,when = shorty)
    strategy.close("short", when=shortexity)

```

> Detail

https://www.fmz.com/strategy/435233

> Last Modified

2023-12-13 14:40:24
