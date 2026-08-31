
> Name

Multi-Period-Moving-Average-Channel-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/151c4cd44f373181065.png)

## Overview  

This is a swing strategy designed for trending markets such as crypto and stocks, using large timeframes like 8 hours. The strategy uses multiple moving averages including SMA, EMA, VWMA, ALMA, SMMA, LSMA and VWMA applied separately to high and low to form two average lines as a channel.  

Go long when close is above the average line applied to high. Go short when close is below the average line applied to low.

## Strategy Logic  

The strategy uses 7 different types of moving averages including SMA, EMA, VWMA, ALMA, SMMA, LSMA and VWMA. These MAs are applied separately to the highest and lowest prices of candlesticks to generate two average lines.  

The average line applied to high prices is called avg_high. The one applied to low prices is called avg_low. These two lines form a channel.
  
Go long when close is above avg_high. Go short when close is below avg_low. 
  
The stop loss for long is avg_low. Take profit is entry price *(1 + tp_long). For short, stop loss is avg_high, take profit is entry price *(1 - tp_short).

## Advantage Analysis   

The biggest advantage of this strategy is utilizing multiple moving averages to improve profitability. Different MAs have different reaction speeds to price changes. Combining them forms more reliable trading signals.   

Another advantage is the channel approach. The channel limits stop loss range and reduces risk suitable for swing trading.   

## Risk Analysis

The strategy has two main risks:  

1. The combination of multiple MAs makes parameter tuning complex requiring lots of tests and optimization to find the best.

2. In sideways or non-trending markets, the strategy tends to generate losses and whipsaws.
  
To mitigate the risks, choose products with clear trends, and do extensive backtests and optimization to find parameters suitable for current market conditions.

## Optimization Directions

Areas for further optimization:

1. Test more types of MAs to find better combinations, like SMA, EMA, KAMA, TEMA etc.  

2. Optimize lengths of MAs and channel width to determine optimum parameters.  

3. Test different take profit and stop loss mechanisms like trailing stops or dynamic stops.
  
4. Incorporate trend metrics like ADX, ATR to avoid whipsaws during choppy markets.

5. Optimize entry and exit logics with additional filters to reduce invalid trades.

## Summary  
This swing trend following strategy improves profitability using multiple MAs and reduces risk via channels. It works well for trending products after parameter optimization. But can suffer big losses at trend reversals. Further optimizations needed to mitigate downside risks.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2000|From Year|
|v_input_4|31|To Day|
|v_input_5|12|To Month|
|v_input_6|2021|To Year|
|v_input_7|12|Length Moving averages|
|v_input_8|0.06|TP Long|
|v_input_9|0.05|SL Long|
|v_input_10|0.045|TP Short|
|v_input_11|0.05|SL Short|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-20 00:00:00
end: 2024-02-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4

strategy(title="High/Low channel swing", shorttitle="Multi MA swing", overlay=true)


fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2000, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2021, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true

//////
length_ma= input(defval=12, title="Length Moving averages", minval=1)

////////////////////////////////SETUP///////////////////////////////////////////

sma_high   = sma(high, length_ma)
ema_high   = ema(high, length_ma)
wma_high   = wma(high, length_ma)
alma_high  = alma(high,length_ma, 0.85, 6)
smma_high = rma(high,length_ma)
lsma_high = linreg(high, length_ma, 0)
vwma_high = vwma(high,length_ma)



avg_high = (sma_high+ema_high+wma_high+alma_high+smma_high+lsma_high+vwma_high)/7

///////////////////////////////////////////

sma_low   = sma(low, length_ma)
ema_low   = ema(low, length_ma)
wma_low   = wma(low, length_ma)
alma_low  = alma(low,length_ma, 0.85, 6)
smma_low = rma(low,length_ma)
lsma_low = linreg(low, length_ma, 0)
vwma_low = vwma(low,length_ma)



avg_low = (sma_low+ema_low+wma_low+alma_low+smma_low+lsma_low+vwma_low)/7

////////////////////////////PLOTTING////////////////////////////////////////////


plot(avg_high , title="avg", color=color.green, linewidth = 4)
plot(avg_low , title="avg", color=color.red, linewidth = 4)

long= close > avg_high
short = close < avg_low

tplong=input(0.06, title="TP Long", step=0.01)
sllong=input(0.05, title="SL Long", step=0.01)

tpshort=input(0.045, title="TP Short", step=0.01)
slshort=input(0.05, title="SL Short", step=0.01)

if(time_cond)
    strategy.entry("long",1,when=long)
    strategy.exit("closelong", "long" , profit = close * tplong / syminfo.mintick, loss = close * sllong / syminfo.mintick, alert_message = "closelong")
    strategy.close("long", when=crossunder(low,avg_low))
    
    
    strategy.entry("short",0,when=short)
    strategy.exit("closeshort", "short" , profit = close * tpshort / syminfo.mintick, loss = close * slshort / syminfo.mintick, alert_message = "closeshort")
    strategy.close("short",when=crossover(high,avg_high))


```

> Detail

https://www.fmz.com/strategy/442220

> Last Modified

2024-02-20 13:45:42
