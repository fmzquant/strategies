
> Name

布林带与日内强度指数均值回归策略Bollinger-Band-Mean-Reversion-Strategy-with-Intraday-Intensity-Index

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1adbd6b1688a3aa7fc8.png)

## Overview 

This strategy is a mean reversion strategy based on Bollinger Bands and Intraday Intensity Index. It utilizes the price breakouts of Bollinger Bands upper and lower band, combined with the volume indicator Intraday Intensity Index to determine the entry timing. The advantages of this strategy include: gaining profits from the mean reversion of prices, and filtering signals with volume indicators. However, it also has risks like large drawdowns and long profit time.

## Strategy Principle

The strategy first calculates the middle band, upper band and lower band of Bollinger Bands. The middle band is the simple moving average or exponential moving average of the closing price. The upper and lower bands are constructed by adding/subtracting two standard deviations on the middle band. When price breaks through the lower band, it is considered an opportunity for mean reversion, taking long position. When price breaks through upper band, it is considered over-deviation from mean, taking short position.  

As an assisted indicator for judgement, the strategy introduces Intraday Intensity Index. This indicator combines both price and volume information. When the index is positive, it indicates the buying power is strengthening, giving long signal. When the index is negative, it indicates selling power is strengthening, giving short signal.

For opening positions, the strategy requires both price breakout of Bollinger Bands band and the Intraday Intensity Index indicator judgement. For stop loss, the strategy adopts time based stop loss. If no profits after certain periods, the strategy chooses to cut loss and exit.  

## Advantage Analysis

The biggest advantage of this strategy is utilizing the mean reversion of prices to profit. When prices have large deviations from mean, according to statistical laws, the probability prices revert back to mean is relatively large. This provides the theoretical basis for the strategy's operations.

Another advantage is the introduction of volume indicator - Intraday Intensity Index, to filter price signals. Trading volumes can prove the validity of price signals. This avoids the wrong signals generated in some violent price fluctuations with low volumes.

## Risk Analysis  

Although this strategy relies on the probability event of price mean reversions, the random walk of market prices can still trigger stop loss, leading to losses. This is a common risk faced by mean reversion strategies.  

Another major risk is that the process of prices reverting to mean itself is a relatively long cycle. For investors, capital may be held for some period of time. Such time risk may cause investors to miss other better investment opportunities.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize Bollinger Bands parameters, adjust cycle and deviation metrics to adapt to volatility of different markets

2. Try other types of moving averages, like weighted moving average to increase smoothness  

3. Try other types of volume indicators, searching for better volume-price confirmation signals 

4. Add stop loss/profit taking strategies, control max loss per order

## Conclusion   

In conclusion, this strategy is a typical mean reversion strategy. It profits on probability events, but the risks are obvious as well. Better results may be obtained through adjustments of parameters and optimizations of indicators. But for investors, recognizing the attributes correctly of this strategy is also the key.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Bollinger Bands length|
|v_input_2|0|Bollinger Bands MA type: SMA|EMA|
|v_input_3_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|10|Time-based stop length|
|v_input_5|2|Bollinger Bands Standard Deviation|
|v_input_6|true|with Intraday Intensity Index?|
|v_input_7|21|Intraday Intensity Index length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-20 00:00:00
end: 2024-02-19 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

// Bollinger Bands Strategy with Intraday Intensity Index
// by SparkyFlary

//For Educational Purposes
//Results can differ on different markets and can fail at any time. Profit is not guaranteed.
strategy(title="Bollinger Bands Strategy with Intraday Intensity Index", shorttitle="Bollinger Bands Strategy", overlay=true)

BBlength = input(20, title="Bollinger Bands length")
BBmaType = input("SMA", title="Bollinger Bands MA type", type=input.string, options=["SMA", "EMA"])
BBprice = input(close, title="source")
timeStop = input(10, title="Time-based stop length")
BBmult = input(2.0, title="Bollinger Bands Standard Deviation")
withIII = input(true, title="with Intraday Intensity Index?")
IIIlength = input(21, title="Intraday Intensity Index length")

//function for choosing moving averages
f_ma(type, src, len) =>
    float result = 0
    if type == "SMA"
        result := sma(src, len)
    if type == "EMA"
        result := ema(src, len)
    result

//Intraday Intensity Index
k1 = (2 * close - high - low) * volume
k2 = high != low ? high - low : 1
i = k1 / k2
iSum = sum(i, IIIlength)

//Bollinger Bands
BBbasis = f_ma(BBmaType, BBprice, BBlength)
BBdev = BBmult * stdev(BBprice, BBlength)
BBupper = BBbasis + BBdev
BBlower = BBbasis - BBdev

plot(BBupper, title="Bollinger Bands Upper Line")
plot(BBlower, title="Bollinger Bands Lower Line")
plot(BBbasis, title="Bollinger Bands Mid line", color=color.maroon)

//Strategy
buy = close[1]<BBlower[1] and close>BBlower and (withIII ? iSum>0 : 1)
sell = close>BBbasis or buy[timeStop] or (strategy.openprofit>0 and buy==0 and buy[1]==0 and buy[2]==0 and buy[3]==0)
short = close[1]>BBupper[1] and close<BBupper and (withIII ? iSum<0 : 1)
cover = close<BBbasis or short[timeStop] or (strategy.openprofit>0 and short==0 and short[1]==0 and short[2]==0 and short[3]==0)

strategy.entry(id="enter long", long=true, when=buy)
strategy.close(id="enter long", comment="exit long", when=sell)
strategy.entry(id="enter short", long=false, when=short)
strategy.close(id="enter short", comment="exit short", when=cover)
```

> Detail

https://www.fmz.com/strategy/442246

> Last Modified

2024-02-20 15:07:59
