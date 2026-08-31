
> Name

Weekend-Range-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy specifically trades the weekend price swings by determining long/short direction based on pre-set percentage bands. It is a typical range trading system.

Strategy Logic:

1. Set percentage bands based on previous Friday close, e.g. 4.5% up/down.

2. Enter short if price exceeds upside band, enter long if below downside band.

3. Add positions when reaching new bands in existing direction. 

4. Take profit when accumulated gains reach threshold, such as 10%. 

5. Allow maximum two simultaneous positions, one in each direction. Close all before Monday open.

Advantages:  

1. Fixed percentage bands allow mechanical trading.

2. Multi-tier entries achieve better cost basis. 

3. Periodicity is stable, unaffected by fundamentals.

Risks:

1. Unable to limit single trade loss size, risks large losing trades.

2. Fixed parameters fail to adapt changing volatility across periods.

3. Periodicity may change over time, invalidating the model.

In summary, this strategy frequently trades the weekend cycle but faces challenges locking in profits consistently. Exercise caution on parameter failure and outsized losses when applying.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Leverage|
|v_input_2|0.1|Profit Taking Percent Threshold|
|v_input_3|2017|Backtest Start Year|
|v_input_4|12|Backtest Start Month|
|v_input_5|10|Backtest Start Day|
|v_input_6|2025|Backtest Stop Year|
|v_input_7|12|Backtest Stop Month|
|v_input_8|30|Backtest Stop Day|
|v_input_9|true|Color Background?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-12 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Copyright Boris Kozak 
// strategy("XBT Weekend Trade Strategy", overlay=true, default_qty_type=strategy.percent_of_equity,)
strategy.initial_capital=50000
leverage = input(10,"Leverage")
profitTakingPercentThreshold = input(0.10,"Profit Taking Percent Threshold")

//****Code used for setting up backtesting.****///
testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(12, "Backtest Start Month")
testStartDay = input(10, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2025, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FFFF : na
bgcolor(testPeriodBackgroundColor, transp=50)

testPeriod() => true
    
//****END Code used for setting up backtesting.****///


//*** Main entry point is here***//
// Figure out how many days since the Friday close 
days_since_friday = if dayofweek == 6
    0
else 
    if dayofweek == 7
        1
    else
        if dayofweek == 1
            2
        else
            if dayofweek == 2
                3
            else
                if dayofweek == 3
                    4
                else
                    if dayofweek == 4
                        5
                    else
                        6
    
// Grab the Friday close price
fridaycloseprice = security(syminfo.ticker,'D',close[days_since_friday])
plot(fridaycloseprice)

// Only perform backtesting during the window specified 
if testPeriod()
    // If we've reached out profit threshold, exit all positions 
    if ((strategy.openprofit/strategy.initial_capital) > profitTakingPercentThreshold)
        strategy.close_all()
    // Only execute this trade on saturday and sunday (UTC)
    if (dayofweek == 7.0 or dayofweek == 1.0)
        // Begin - Empty position (no active trades)
        if (strategy.position_size == 0)
            // If current close price > threshold, go short 
            if ((close>fridaycloseprice*1.045))
                strategy.entry("Short Entry", strategy.short, leverage)
            else
                // If current close price < threshold, go long
                if (close<(fridaycloseprice*0.955))
                    strategy.entry("Long Entry",strategy.long, leverage)
        // Begin - we already have a position
        if (abs(strategy.position_size) > 0)
            // We are short 
            if (strategy.position_size < 0)
                if ((close>strategy.position_avg_price*1.045))
                    // Add to the position
                    strategy.entry("Adding to Short Entry", strategy.short, leverage)
            else
                if ((close<strategy.position_avg_price*0.955))
                    strategy.entry("Adding to Long Entry",strategy.long,leverage)
    // On Monday, if we have any open positions, close them 
    if (dayofweek==2.0)
        strategy.close_all()
 





```

> Detail

https://www.fmz.com/strategy/426556

> Last Modified

2023-09-13 11:53:09
