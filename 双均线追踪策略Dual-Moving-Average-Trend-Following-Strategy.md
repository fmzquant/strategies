
> Name

双均线追踪策略Dual-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The Dual Moving Average Trend Following strategy is a trend following strategy that uses two moving averages to determine the price trend. It generates long and short signals when the short and long period moving averages align in the same direction. Entering when the short and long term trends agree provides increased confidence.

## Principle 

The strategy uses two moving averages to determine the trend direction. The logic is as follows:

1. Calculate the midline for short period p1 and long period p2. 

2. Determine if the price is above or below the midlines, generating up and down bool values.

3. Use SMA to smooth the up and down values, determining the trend direction trend and trend_2.

4. When trend and trend_2 agree, generate long or short signals.

5. Color-filled bars visually indicate the trend.

6. Enter trades when short and long term trends agree.

The dual moving average comparison creates the core logic. Trading with trend agreement on two timeframes reduces false breakouts. Agreeing trends indicate a high conviction move, lowering risk on entries.

## Advantages

The main advantages of this strategy are:

1. Dual moving average reduces false breakouts and provides reliable entry signals.

2. Using two timeframes provides better accuracy in trend determination. 

3. Captures longer trends while taking advantage of short-term pullbacks.

4. Simple and easy to understand logic suitable for all traders. 

5. Customizable moving average periods allows optimization for any market.

6. Visual bar coloring provides intuitive trend direction.

## Risks

Some risks to consider:

1. Incorrect period settings may cause excessive position changes increasing costs. Optimize parameters or add filters.

2. Whipsaws occur when markets oscillate across moving averages. Add filters or position sizing rules.

3. Short pullbacks can be missed. Consider shorter periods or additional strategies.

4. Incorrect stop loss placement can lead to large losses when trends suddenly reverse. Actively manage stops.

5. No fundamental analysis is considered. Use discretion when applying signals.

## Enhancements

Some ways to improve the strategy:

1. Add additional filters like volume or momentum to avoid whipsaws.

2. Employ adaptive periods that adjust based on market conditions.

3. Add position sizing rules based on trend strength for guidance. 

4. Implement stop loss modules like trailing stops or time exits to limit losses.

5. Consider machine learning to score trend accuracy and improve entry/exit logic.

6. Incorporate fundamental factors like earnings, events to avoid trading against larger trends.

## Conclusion

In summary, the Dual Moving Average Trend Following strategy provides a simple and practical approach to trend identification. By combining short and long-term perspectives, it generates high-confidence entry signals suitable for most trend traders. Risks exist and can be mitigated through optimization, risk management and discretion. Overall, the dual moving average strategy remains a robust, classic trend following approach.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|p1|
|v_input_2|21|p2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-01 00:00:00
end: 2023-10-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// My Tradingview Scripts : https://bit.ly/2HKtr7k 
strategy("UniDir Strategy", overlay=true, initial_capital=50000, default_qty_value=50000, default_qty_type=strategy.cash, slippage=3, commission_type=strategy.commission.percent, commission_value=0.075, pyramiding=0)

p1=input(14)
p2=input(21)


Price = close
mid = (highest(high, p1)+lowest(low, p1)) / 2
mid_2 = (highest(high, p2)+lowest(low, p2)) / 2

//Trend
up = Price > mid ? 1 : 0
up_2 = Price > mid_2 ? 1 : 0
down = Price < mid ? 1 : 0
down_2 = Price < mid_2 ? 1 : 0
trend = sma(up, 2) == 1 ? 1 : sma(down, 2) == 1 ? -1 : nz(trend[1])
trend_2 = sma(up_2, 2) == 1 ? 1 : sma(down_2, 2) == 1 ? -1 : nz(trend_2[1])

dir1=trend==1 ? lime : red
dir2=trend_2==1 ? lime : red
dir_all=trend==1 and trend_2==1 ? lime : red

top_p=plot(1)
hi_p=plot(0.4)
mid_p=plot(0.2)
lo_p=plot(0)

fill(hi_p,mid_p,color=dir1,transp=80)
fill(lo_p,mid_p,color=dir2,transp=80)
fill(top_p,hi_p,color=dir_all,transp=0)

// Entry
long_cond = trend==1 and trend_2==1
short_cond = trend==-1 and trend_2==-1

if long_cond
    strategy.entry("Long",strategy.long)
if short_cond
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/428700

> Last Modified

2023-10-08 14:25:40
