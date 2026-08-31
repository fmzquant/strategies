
> Name

基于交易量的趋势追踪策略Volume-Oscillator-Based-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17bf34d03353ce21c60.png)

## Overview

The volume oscillator based trend tracking strategy judges the current trend direction by calculating the ratio of positive and negative trading volume, and implements trend trading. Inspired by the On-Balance Volume (OBV) indicator, it determines the positivity and negativity of trading volume based on the relationship between close and open prices, and then constructs an indicator using the N-day moving average. It goes long when the indicator crosses above the upper rail, and goes short when crossing below the lower rail.

## Principles 

The main steps of this strategy are:

1. Calculate positive/negative volume: If the closing price is higher than the opening price, the volume of that candlestick is positive. If the closing price is lower than the opening price, the volume is negative. If they are equal, the volume is 0.

2. Sum up the N-day positive/negative volume to get the accumulated volume.

3. Calculate the N-day moving average of the accumulated volume to get the final indicator value.

4. Go long when the indicator crosses above the upper rail, and go short when crossing below the lower rail.

By judging the trend direction through volume positivity/negativity and generating trading signals with moving averages, this strategy can effectively track trends and capture medium- to long-term moves.

## Advantages

- Using volume to determine trends is more convincing, as volume reflects market participation.

- Smoothing with moving averages helps in trend tracking and reduces excessive trading.

- The moving average period can be adjusted to fit different market rhythms. 

- The upper/lower rails provide clear long/short signals.

- The logic is simple and easy to understand.

## Risks

- There is a risk of false signals. The strategy may also get stuck in range-bound markets.

- Divergence may occur during huge market swings.

- The static upper/lower rails cannot adapt to market volatility. 

- There is no stop loss, leading to excessive losses.

- Moving averages lag and may miss trend turning points.

## Enhancement

- Combine with other indicators for confirmation to avoid false signals.

- Compute upper/lower rails dynamically to adapt to volatility.

- Add stop loss mechanisms to limit losses.

- Adjust moving average type to match market rhythm. 

- Optimize moving average periods for better trend tracking.

- Consider trailing stops on upper/lower rail breaks to lock in profits.

## Conclusion

The volume oscillator strategy effectively tracks medium- to long-term trends by judging trends via volume positivity/negativity and generating signals with moving averages. Its advantage lies in accurate trend determination and alignment with most traders' long-term practices. However, some problems remain that require further enhancements to handle market complexity better. Overall, this simple and practical trend tracking approach caters well to the needs of most quant traders.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|AvgLen|
|v_input_2|40000|TopBand|
|v_input_3|-35000|LowBand|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-27 00:00:00
end: 2023-11-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 15/12/2017
// This is the second part of TFS trading strategy. The concept of this 
// indicator is similar to that of On-Balance Volume indicator (OBV). It 
// is calculated according to these rules:
// If Close > Open, Volume is positive
// If Close < Open, Volume is negative
// If Close = Open, Volume is neutral
// Then you take the 7-day MA of the results. 
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="TFS: Volume Oscillator", shorttitle="TFS: Volume Oscillator")
AvgLen = input(7, minval=1)
TopBand = input(40000, step=1)
LowBand = input(-35000, step=1)
reverse = input(false, title="Trade reverse")
hline(TopBand, color=red, linestyle=line)
hline(LowBand, color=green, linestyle=line)
hline(0, color=blue, linestyle=line)
xClose = close
xOpen = open
xVolume = volume
nVolAccum = sum(iff(xClose > xOpen, xVolume, iff(xClose < xOpen, -xVolume, 0))  ,AvgLen)
nRes = nVolAccum / AvgLen
pos = iff(nRes > TopBand, 1,
       iff(nRes < LowBand, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nRes, color=blue, title="TFS", style = histogram)

```

> Detail

https://www.fmz.com/strategy/430991

> Last Modified

2023-11-03 15:47:22
