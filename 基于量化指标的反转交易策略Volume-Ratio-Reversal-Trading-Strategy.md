
> Name

基于量化指标的反转交易策略Volume-Ratio-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e8c9a422fb3b50d9f7.png)

## Overview

The Volume Ratio Reversal Trading Strategy (VR Reversal Strategy) is a short-term reversal trading strategy based on volume indicator. It judges the market participation of major players by calculating the ratio between volume and mean volume over a period of time to generate trading signals. This strategy is mainly suitable for short-term strongly mean-reverting assets.

## Strategy Logic

The core indicator of the VR reversal strategy is Volume Ratio (referred to as VR for short), which represents the ratio between the current period's trading volume and the average trading volume over a period of time. The specific calculation method is:

VR = Current Volume / SMA(Volume, N)

Where N stands for the parameter Length, the trading volume of the current cycle divided by the simple moving average of the trading volume over the Length cycle.  

When VR > threshold, it is considered as a signal of major players' participation. At this time, combined with the breakthrough of the price up or down, buy and sell signals are generated.

The strategy also introduces an auxiliary directional judgment indicator dir. It compares the closing price of the current cycle with that of N cycles ago. Greater than 1 is a bullish direction and less than 1 is a bearish direction.

When VR is greater than the specified threshold, if dir=1, a buy signal is generated. If dir=-1, a sell signal is generated.

## Advantages

The biggest advantage of VR reversal strategy is to capture the chance of sudden price reversal. When there is a signal of major players' intervention, the strategy can make judgments quickly and capture the opportunity of rebound or retracement in a timely manner. 

Other advantages include:

- Using volume indicator, the judgment on major players is relatively reliable  
- Simple algorithm, easy to understand and implement
- Flexible configurable parameters, better adaptability

## Risks

Although the VR reversal strategy has some advantages, there are still some risks to note:  

- As a short-term strategy, there is some randomness with fluctuating return curve  
- VR indicator may fail to accurately determine the major players
- Proper underlying products need to be selected. Less effective if fluctuation is mild

In addition, over trading should be avoided, stop loss should be set to control single loss, etc.

## Optimization Suggestions 

There is room for further optimization of the VR reversal strategy. The main suggestions are:

- Combine more indicators for judgment to avoid VR failure  
- Add stop loss logic, can refer to ATR indicator to set stop loss range
- Optimize parameters, especially the Length cycle parameter for different cycles and products
- Adjust the threshold of positive and negative VR based on backtest results to ensure robustness

## Conclusion

The VR reversal trading strategy is a simple, easy-to-implement short-term quantitative strategy. It captures reversal opportunities by catching major players' signals. The strategy is particularly suitable for volatile products with obvious reversal, but risk control is also needed. Further optimization can make the strategy more robust and filter out more false signals.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2|3|閾値|
|v_input_3|true|direction picker # bars|
|v_input_4|2019|Start Year|
|v_input_5|true|Start Month|
|v_input_6|true|Start Day|
|v_input_7|9999|End Year|
|v_input_8|true|End Month|
|v_input_9|true|End Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title="Volume Ratio_30min", shorttitle="VR_30min")//,initial_capital=1000)

// User Input ------------------------------------------------------------------
len = input(20, title="Length", minval=1)
threshold  = input(3,step=0.05, title="閾値")

// Volume Caliculetion ---------------------------------------------------------
vol = volume
sma=sma(volume,len)
vrs = vol / sma

// Direction -------------------------------------------------------------------
dirtime=input(1,"direction picker # bars")
dir=if close/close[dirtime] > 1
    1
else
    -1

// Plot ------------------------------------------------------------------------
plot(vrs, title="VRS",  color=color.green, transp=0)
hline(1, title="baseline")
plot(threshold, color=color.white)

// ️⚠️⚠️Logic　-----------------------------------------------------------------

long    = vrs > threshold  and dir == 1
short   = vrs > threshold  and dir ==-1

// Back Test Fnction -----------------------------------------------------------
start = timestamp(input(2019, "Start Year"), input(1, "Start Month"), input(1, "Start Day"), 0, 0)
end = timestamp(input(9999, "End Year"), input(1, "End Month"), input(1, "End Day"), 0, 0)
_testPeriod() => true

// Order -----------------------------------------------------------------------
if _testPeriod()
    if long
        strategy.entry("Long", strategy.long)
    if short
        strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/438469

> Last Modified

2024-01-12 12:08:05
