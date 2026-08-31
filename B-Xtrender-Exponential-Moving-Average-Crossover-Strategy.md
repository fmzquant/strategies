
> Name

B-Xtrender-Exponential-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/86062198e3522c2858.png)

## Overview
This is a trading strategy based on the exponential moving average (EMA) crossover principle. It also incorporates the RSI indicator and moving average filters to form a relatively complete trend following and reversal trading system.

## Strategy Logic  
1. Generate trading signals through fast and slow EMA crossovers. The fast line uses 5 and 20-day EMA crossover while the slow line uses 20 and 15-day EMA crossover.
2. Go long when the fast line crosses above the slow line, and go short when the fast line crosses below. Use RSI for secondary confirmation, only taking signals when RSI also crosses over in the same direction.  
3. Add 200-day moving average filter to avoid signals during choppy periods. Trades are only taken when price breaks through this baseline MA first.

## Advantages
1. RSI confirmation significantly enhances signal reliability and lowers false signals.  
2. EMA parameter selection balances sensitivity and stability.  
3. MA filter removes noise to avoid unnecessary trades.
  

## Risks 
1. EMA has lagging issues on sharp price swings, increasing losses or missing signals.
2. Poor RSI settings could also introduce signal lags.  
3. MA filter may filter out early trend signals.  

## Enhancement Opportunities
1. Dynamically optimize EMA parameters across cycles.
2. Experiment with other indicators like MACD to combine with RSI. 
3. Fine tune MA filter parameter for optimal noise reduction and opportunity capture.
   
## Conclusion 
This is an overall solid strategy in building a complete EMA trading system, with additional RSI confirmation to boost signal quality. It's worth studying and optimizing. However, inherent indicator lag risks should also be managed through proper stop loss.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|[Short] L1|
|v_input_2|20|[Short] L2|
|v_input_3|15|[Short] L3|
|v_input_4|20|[Long] L1|
|v_input_5|15|[Long] L2|
|v_input_6|true|[MA Filter] Yes/No|
|v_input_7|200|[MA Filter] length|
|v_input_8|0|[MA Filter] type: EMA|SMA|
|v_input_9|20|[TSL-%] Percent|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-13 00:00:00
end: 2024-02-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © QuantTherapy
//@version=4
strategy("B-Xtrender [Backtest Edition] @QuantTherapy")

i_short_l1  = input(5 , title="[Short] L1")
i_short_l2  = input(20, title="[Short] L2")
i_short_l3  = input(15, title="[Short] L3")

i_long_l1   = input(20, title="[Long] L1")
i_long_l2   = input(15, title="[Long] L2")

i_ma_use    = input(true , title="[MA Filter] Yes/No" )
i_ma_len    = input(200  , title="[MA Filter] length" )
i_ma_type   = input("EMA", title="[MA Filter] type", options = ["SMA", "EMA"])

shortTermXtrender = rsi( ema(close, i_short_l1) - ema(close, i_short_l2), i_short_l3 ) - 50
longTermXtrender  = rsi( ema(close, i_long_l1), i_long_l2 ) - 50

shortXtrenderCol = shortTermXtrender > 0 ? shortTermXtrender > shortTermXtrender[1] ? color.lime : #228B22 : shortTermXtrender > shortTermXtrender[1] ? color.red : #8B0000
plot(shortTermXtrender, color=shortXtrenderCol, style=plot.style_columns, linewidth=1, title="B-Xtrender Osc. - Histogram", transp = 40)

longXtrenderCol   = longTermXtrender> 0 ? longTermXtrender > longTermXtrender[1] ? color.lime : #228B22 : longTermXtrender > longTermXtrender[1] ? color.red : #8B0000
macollongXtrenderCol =  longTermXtrender > longTermXtrender[1] ? color.lime : color.red
plot(longTermXtrender , color=longXtrenderCol, style=plot.style_columns, linewidth=2, title="B-Xtrender Trend - Histogram", transp = 90)

plot(longTermXtrender , color=#000000             , style=plot.style_line, linewidth=5, title="B-Xtrender Trend - Line", transp = 100)
plot(longTermXtrender , color=macollongXtrenderCol, style=plot.style_line, linewidth=3, title="B-Xtrender Trend - Line", transp = 100)

// --- Initialize MA Filter
ma = i_ma_type == "EMA" ? ema(close, i_ma_len) : sma(close, i_ma_len)
maFilterLong = true
maFilterShort = true
if i_ma_use
    maFilterLong  := close > ma ? true : false
    maFilterShort := close < ma ? true : false

long  = shortTermXtrender > 0 and longTermXtrender > 0 and maFilterLong
closeLong = shortTermXtrender < 0 or longTermXtrender < 0 
short = shortTermXtrender < 0 and longTermXtrender < 0 and maFilterShort
closeShort = shortTermXtrender > 0 or longTermXtrender > 0 

plotshape(long[1]==true  and long[2]==false  ? 0 : na , location=location.absolute, style=shape.labelup  , color=color.lime, size=size.small, transp=10)
plotshape(short[1]==true and short[2]==false ? 0 : na, location=location.absolute, style=shape.labeldown, color=color.red , size=size.small, transp=10)
plotshape(closeLong[1]==true and closeLong[2]==false
 or closeShort[1]==true and closeShort[2]==false ? 0 : na, location=location.absolute, style=shape.circle, color=color.orange , size=size.small)

i_perc     = input(defval = 20.0, title = "[TSL-%] Percent"  , minval = 0.1 )
i_src = close // constant for calculation
sl_val = i_src * i_perc / 100

strategy.entry("Long", strategy.long, when = long ) 
strategy.close("Long", when = closeLong)

strategy.entry("Short", strategy.short, when = short) 
strategy.close("Short", when = closeShort)

// Calculate SL
longStopPrice = 0.0, shortStopPrice = 0.0
longStopPrice := if (strategy.position_size > 0)
    stopValue = close - sl_val
    max(stopValue, longStopPrice[1])
else
    0

shortStopPrice := if (strategy.position_size < 0)
    stopValue = close + sl_val
    min(stopValue, shortStopPrice[1])
else
    syminfo.mintick*1000000

// For TSL Visualisation on Chart    
// plot(series=(strategy.position_size > 0) ? longStopPrice : na,
//      color=color.fuchsia, style = plot.style_circles,
//      linewidth=1, title="Long Trail Stop")
     
// plot(series=(strategy.position_size < 0) ? shortStopPrice : na,
//      color=color.fuchsia, style = plot.style_circles,
//      linewidth=1, title="Short Trail Stop")

if (strategy.position_size > 0)
    strategy.exit(id="TSL Long", stop=longStopPrice)

if (strategy.position_size < 0)
    strategy.exit(id="TSL Short", stop=shortStopPrice)    
```

> Detail

https://www.fmz.com/strategy/442236

> Last Modified

2024-02-20 14:45:17
