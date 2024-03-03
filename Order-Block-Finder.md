
> Name

Order-Block-Finder

> Author

ChaoZhang

> Strategy Description

After finding a huge amount of use from TV user's wugamlo script Order Block Finder (Experimental), I decided to make some much needed upgrades! Added support for plotting the last X number of Order Blocks and am currently working on a multi-timeframe version.

If you'd like to contribute to the MTF analysis portion, that would benefit tons of other scripts and open the possibility to more "MTF Panel" style indicators.

Please visit the original script page (link at top) to review how the indicator is used in trading.


**backtest**

 ![IMG](https://www.fmz.com/upload/asset/bb14ca43e91e986c7f.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Hover over ( ! ) for documentation|
|v_input_2|0|Color Scheme: LIGHT|DARK|
|v_input_3|7|Relevant Periods to identify OB|
|v_input_4|false|Min. Percent move for valid OB|
|v_input_5|2|Number of Bullish Channels to show|
|v_input_6|2|Number of Bearish Channels to show|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-22 00:00:00
end: 2022-05-21 23:59:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
study("Order Block Finder", overlay = true)       
tip1 = "Indicator to help identify instituational Order Blocks (OB). OBs often signal the beginning of a strong move. There is a high probability that OB price levels will be revisited in the future and are interesting levels to place limit orders. Bullish Order block is the last down candle before a sequence of up candles. Bearish Order Block is the last up candle before a sequence of down candles."
tip2 = "!Experimental!\nFind Order Blocks from different timeframes. Channels prices are accurate, but arrow position is not. Most useful when selecting a timeframe higher than the chart."
tip3 = "Required number of subsequent candles in the same direction to identify Order Block"
tip4 = "Measured from from potential OB close to close of first candle in sequence"
dummy = input(true,"Hover over ( ! ) for documentation", tooltip = tip1)
colors    = input("LIGHT","Color Scheme", options=["DARK", "LIGHT"])
//res = input("","Order Block Timeframe",input.resolution,tooltip=tip2)
periods   = input(7,     "Relevant Periods to identify OB",tooltip=tip3)    // Required number of subsequent candles in the same direction to identify Order Block
threshold = input(0.0,   "Min. Percent move for valid OB", step = 0.1, tooltip=tip4)      // Required minimum % move (from potential OB close to last subsequent candle to identify Order Block)
bull_channels =  input(2, "Number of Bullish Channels to show")             // Num of channels
bear_channels = input(2, "Number of Bearish Channels to show")              // Num of channels


//Data Curation
res = ""
[copen,chigh,clow,cclose] = security(syminfo.tickerid,res,[open,high,low,close],barmerge.gaps_on, barmerge.lookahead_off)


ob_period = periods + 1                                                     // Identify location of relevant Order Block candle
absmove   = ((abs(cclose[ob_period] - cclose[1]))/cclose[ob_period]) * 100     // Calculate absolute percent move from potential OB to last candle of subsequent candles
relmove   = absmove >= threshold                                            // Identify "Relevant move" by comparing the absolute move to the threshold

// Color Scheme
bullcolor = colors == "DARK"? color.white : color.green
bearcolor = colors == "DARK"? color.blue : color.red

// Bullish Order Block Identification
bullishOB = cclose[ob_period] < copen[ob_period]                              // Determine potential Bullish OB candle (red candle)

int upcandles  = 0
for i = 1 to periods
    upcandles := upcandles + (cclose[i] > copen[i]? 1 : 0)                    // Determine color of subsequent candles (must all be green to identify a valid Bearish OB)

OB_bull      = bullishOB and (upcandles == (periods)) and relmove           // Identification logic (red OB candle & subsequent green candles)
OB_bull_chigh = OB_bull? chigh[ob_period] : na                                // Determine OB upper limit (Open or High depending on input)
OB_bull_clow  = OB_bull? clow[ob_period]  : na                                // Determine OB clower limit (Low)
OB_bull_avg  = (OB_bull_chigh + OB_bull_clow)/2                               // Determine OB middle line


// Bearish Order Block Identification
bearishOB = cclose[ob_period] > copen[ob_period]                              // Determine potential Bearish OB candle (green candle)

int downcandles  = 0
for i = 1 to periods
    downcandles := downcandles + (cclose[i] < copen[i]? 1 : 0)                // Determine color of subsequent candles (must all be red to identify a valid Bearish OB)

OB_bear      = bearishOB and (downcandles == (periods)) and relmove         // Identification logic (green OB candle & subsequent green candles)
OB_bear_chigh = OB_bear? chigh[ob_period] : na                                // Determine OB upper limit (High)
OB_bear_clow  = OB_bear? clow[ob_period] : na                                 // Determine OB clower limit (Open or Low depending on input)
OB_bear_avg  = (OB_bear_clow + OB_bear_chigh)/2                               // Determine OB middle line


// Plotting
plotshape(OB_bull, title="Bullish OB", style = shape.triangleup,   color = bullcolor, textcolor = bullcolor, size = size.tiny, location = location.belowbar, offset = -ob_period, text = "Bull")     // Bullish OB Indicator
bull1 = plot(OB_bull_chigh, title="Bullish OB High", style = plot.style_linebr, color = bullcolor, offset = -ob_period, linewidth = 2)                                               // Bullish OB Upper Limit
bull2 = plot(OB_bull_clow,  title="Bullish OB Low",  style = plot.style_linebr, color = bullcolor, offset = -ob_period, linewidth = 2)                                               // Bullish OB Lower Limit
fill(bull1, bull2, color=bullcolor, transp = 50, title = "Bullish OB fill")                                                                                                          // Fill Bullish OB
plotshape(OB_bull_avg, title="Bullish OB Average", style = shape.cross,   color = bullcolor, size = size.small, location = location.absolute, offset = -ob_period)                 // Bullish OB Average


plotshape(OB_bear, title="Bearish OB", style = shape.triangledown, color = bearcolor, textcolor = bearcolor,  size = size.tiny, location = location.abovebar, offset = -ob_period, text = "Bear")     // Bearish OB Indicator
bear1 = plot(OB_bear_clow,  title="Bearish OB Low",  style = plot.style_linebr, color = bearcolor, offset = -ob_period, linewidth = 2)                                                // Bearish OB Lower Limit
bear2 = plot(OB_bear_chigh, title="Bearish OB High", style = plot.style_linebr, color = bearcolor, offset = -ob_period, linewidth = 2)                                                // Bearish OB Upper Limit
fill(bear1, bear2, color=bearcolor, transp = 50, title = "Bearish OB fill")                                                                                                           // Fill Bearish OB
plotshape(OB_bear_avg, title="Bearish OB Average", style = shape.cross,   color = bearcolor, size = size.small, location = location.absolute, offset = -ob_period)                  // Bullish OB Average



// Alerts for Order Blocks Detection
alertcondition(OB_bull, title='New Bullish OB detected', message='New Bullish OB detected - This is NOT a BUY signal!')
alertcondition(OB_bear, title='New Bearish OB detected', message='New Bearish OB detected - This is NOT a SELL signal!')
if OB_bull
    strategy.entry("Enter Long", strategy.long)
else if OB_bear
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/365075

> Last Modified

2022-05-23 13:54:57
