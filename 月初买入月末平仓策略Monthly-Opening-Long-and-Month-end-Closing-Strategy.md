
> Name

月初买入月末平仓策略Monthly-Opening-Long-and-Month-end-Closing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12bc6cbcc85f67b693d.png)



This strategy's core idea is to open long position on the first trading day of each month and close position on the last trading day of the month. It is a very simple strategy, mainly for teaching demonstration.

### Strategy Logic

This strategy first defines the first trading day (Monday) of each month as the entry signal, and the last trading day (Friday) as the exit signal.

When opening position, it will long directly if only long is enabled, and it will open both long and short positions if short is allowed.

When closing positions, it will close all positions if short is allowed, and only close long positions if only long is enabled.

To control risks, a simple stop loss is also added. When price touches the stop loss price, it will close position by stop loss.

Overall, this strategy has a very simple and straightforward logic, which is the most basic monthly trading strategy suitable for teaching demonstration. In actual use, entry and exit signals, stop loss methods, etc. can be optimized according to needs.

### Advantages

1. The logic is simple and easy to understand, very suitable for beginners to learn.

2. Adopting monthly holding cycle, low operation frequency, suitable for investors pursuing stability.

3. Optional long or short, can meet the needs of different trading styles.

4. Adding stop loss can control single stock risks to some extent.

### Risks

1. Fixed entry and exit time, unable to adjust based on market conditions, risks being arbitraged.

2. No quantitative indicators added, risks of blindly following. 

3. Single stock stop loss is easy to break through, unable to effectively control tail risk.

4. Fixed position size, unable to adjust based on market conditions.

5. Uncertainty of execution, may fail to fully execute as per strategy.

6. Simple stop loss method may result in small stop loss, should adopt dynamic stop loss like volatility stop.

### Enhancement Directions

1. Introduce quantitative indicators to judge market conditions and dynamically adjust entry pace.

2. Consider benchmarking indices to determine relative strength of stocks for entry.

3. Dynamically adjust position size based on market volatility and other risk indicators.

4. Adopt dynamic stop loss, or multiple levels of stop loss.

5. Add algorithm trading module to ensure successful execution.

6. Optimize capital management strategy, adjust stock index futures position for different market environments. 

7. Incorporate machine learning to judge stock quality for entry.

### Summary

This is a very basic monthly opening long and month-end closing strategy. The logic is simple and easy to understand, suitable for beginners to learn. But in actual use, the entry/exit timing, stop loss methods, position sizing etc need to be enhanced, in order to profit persistently in the complex and ever-changing markets. We should thoroughly understand the pros and cons of the strategy, and keep improving the strategy system to develop suitable quantitative trading solutions for ourselves.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2020|From Year|
|v_input_2|true|From Month|
|v_input_3|true|Only go Long?|
|v_input_4|false|Use stoploss ?|
|v_input_5|150|Stoploss in $|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-11-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © Je_Buurman September 1st 2020

//@version=4
strategy("Buurmans Tutorial", overlay=true, initial_capital=1000, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_value=0.2)

// Some initial inputs, these are needed in case the strategy returns an error of "too many trades, > 3000" 

Year    = input(defval = 2020, title = "From Year", minval = 2010)              // 
Month   = input(defval = 1, title = "From Month", minval = 1, maxval=12)
LongOnly=input(true, title="Only go Long?")


// Phase I - the initial "Strategy" - buy Monday, sell Friday

longCondition = dayofweek==dayofweek.monday and (time > timestamp(Year, Month, 01, 00, 00, 00))
shortCondition = dayofweek==dayofweek.friday and (time > timestamp(Year, Month, 01, 23, 59, 59))


// Phase II - some rudimentary "risk-management" e.g. stoploss

Use_stoploss=input(false, title="Use stoploss ?")
stoploss_input=input(150, title="Stoploss in $")
Stoploss = Use_stoploss ? strategy.position_size>0 ? iff(strategy.position_size>0,strategy.position_avg_price - stoploss_input, na) : strategy.position_size<0 ? iff(strategy.position_size<0,strategy.position_avg_price + stoploss_input, na) : na : na
plot(Use_stoploss and strategy.position_size!=0 ? Stoploss : na, color=iff(Stoploss!=na,color.silver, color.red),style=plot.style_linebr)


// Phase III - make it more profitable by trying to filter conditions
// only buy on odd Mondays ? only buy on full moon Mondays ? something else entirely ?


// The actual trades, going Long, close Long, going Short and Stoploss

if (longCondition)
    strategy.entry("Buy on Monday", strategy.long)
    
if (shortCondition and LongOnly==false)
    strategy.entry("Short on Friday", strategy.short)

if (shortCondition and LongOnly)
    strategy.close("Buy on Monday", comment="Sell on Friday")

if (low < Stoploss)
    strategy.close("Buy on Monday", comment="Long Stopped on Someday")
if (high > Stoploss)
    strategy.close("Short on Friday", comment="Short Stopped on Someday")
```

> Detail

https://www.fmz.com/strategy/430842

> Last Modified

2023-11-02 14:23:40
