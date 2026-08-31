
> Name

穿越大师-反转突破策略Crossover-Master-Reversal-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bfe5a206baebdf48b2.png)


## Overview

The Crossover Master - Reversal Breakout Strategy is a simple yet practical trading strategy based on moving averages. It uses the crossover of a fast moving average and a slow moving average as buy and sell signals. When the fast MA crosses above the slow MA, a buy signal is generated. When the fast MA crosses below the slow MA, a sell signal is generated. The strategy is suitable for medium volatility markets.

## Strategy Logic

The strategy uses two moving averages: a short-term fast MA and a long-term slow MA. The fast MA period is 12, and the slow MA period is 26. The strategy first calculates the 2-day simple moving average of the ENDPOINT as price input, then computes the fast MA and slow MA. If the fast MA crosses above the slow MA, a buy signal is triggered. If the fast MA crosses below the slow MA, a sell signal is triggered.

Specifically, the strategy compares the values of the fast MA and slow MA to determine market trend. When the fast MA is greater than the slow MA, the market is considered to be in an uptrend (Bullish). When the fast MA is less than the slow MA, the market is considered to be in a downtrend (Bearish). The strategy combines with price momentum to generate signals during market reversals.

The buy signal logic is: when the market switches from downtrend to uptrend, i.e. the fast MA crosses above the slow MA, and the price is above the fast MA, a buy signal is generated. 

The sell signal logic is: when the market switches from uptrend to downtrend, i.e. the fast MA crosses below the slow MA, and the price is below the fast MA, a sell signal is generated.

With this design, the strategy can capture reversal opportunities in a timely manner.

## Advantage Analysis 

The advantages of this strategy are:

1. The strategy logic is simple and clear, easy to understand and implement.

2. The moving average technique is mature and reliable, widely used.

3. The dual MA design can effectively filter market noise and identify trends.

4. Combining price momentum improves timing accuracy of trades.

5. Large optimization space for parameters according to market.

6. Stop loss can be added to control risks.

7. Moderate trading frequency, avoids overtrading.

8. Can be combined with other indicators like Bollinger Bands, RSI for enhancement.

9. Sufficient backtesting data to validate strategy performance.

## Risk Analysis

The risks of this strategy include:

1. Dual MA strategies can generate false signals, missing trends or unnecessary trades.

2. MAs have lagging effect, may miss fast reversals. 

3. Improper parameter settings lead to too high or low trading frequency.

4. The strategy is more suitable for medium-long term trading.

5. Unable to adapt to sudden market shocks.

6. Possibility of losses during certain periods.

7. Parameters need adjustment across different products. 

8. Less effective during range-bound markets.

Risks can be reduced by:

1. Optimizing parameters according to market conditions.

2. Adding filters with other indicators. 

3. Implementing stop loss to control losses.

4. Adjusting position sizing properly.

5. Testing and optimizing parameters by product.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize MA periods to fit current market better.

2. Test different types of MAs, like EMA, WMA etc. 

3. Add volume indicator to confirm trends.

4. Combine other indicators like MACD, RSI for confluence.

5. Add stop loss techniques like trailing stop loss. 

6. Optimize position sizing methods, e.g. fixed fractional, dynamic etc.

7. Test parameter optimization by time period and product. 

8. Introduce machine learning for auto parameter tuning and signal validation.

9. Apply deep learning to detect more complex chart patterns.

10. Explore parameter-less strategy design concepts.

Continuous optimizations can improve the strategy's adaptiveness and achieve consistent results across varying market conditions.

## Summary

In summary, the Crossover Master - Reversal Breakout Strategy has clear logic and practical value. It leverages the trend-following capacity of moving averages, and combines price momentum to improve signal quality. There is room for improving parameters and risk control. Overall, it provides a good example of a breakout strategy based on simple indicators, and can serve as a useful case study for quant strategy learning. With continuous enhancements, it has the potential to evolve into an adaptive effective strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_ohlc4|0|Data Array: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_2|12|Short MA period|
|v_input_3|26|Long MA period|
|v_input_4|2019|From Year|
|v_input_5|true|From Month|
|v_input_6|true|From Day|
|v_input_7|9999|To Year|
|v_input_8|12|To Month|
|v_input_9|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-13 00:00:00
end: 2023-10-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("CDC Action Zone V.2 strategy", overlay=true)
// Credit Script base from CDC Action Zone V.2 by piriya33
// CDC ActionZone V2 29 Sep 2016
// CDC ActionZone is based on a simple 2MA and is most suitable for use with medium volatility market
// 11 Nov 2016 : Ported to Trading View with minor UI enhancement

src = input(title="Data Array",defval=ohlc4)
prd1=input(title="Short MA period",defval=12)
prd2=input(title="Long MA period",defval=26)
AP = ema(src,2)
Fast = ema(AP,prd1)
Slow = ema(AP,prd2)

// === INPUT BACKTEST RANGE ===
FromYear  = input(defval = 2019, title = "From Year", minval = 2009)
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2009)
ToMonth   = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 31, title = "To Day", minval = 1, maxval = 31)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false // create function "within window of time"

Bullish = Fast>Slow
Bearish = Fast<Slow

Green = Bullish and AP>Fast
Red = Bearish and AP<Fast
Yellow = Bullish and AP<Fast
Blue = Bearish and AP>Fast

//Long Signal
Buy = Green and Green[1]==0
Sell = Red and Red[1]==0

//Short Signal
Short = Red and Red[1]==0
Cover = Red[1] and Red==0

//Plot

l1=plot(Fast,"Fast", linewidth=1,color=red)
l2=plot(Slow,"Slow", linewidth=2,color=blue)
bcolor = Green ? lime : Red ? red : Yellow ? yellow : Blue ? blue : white
barcolor(color=bcolor)
fill(l1,l2,bcolor)

strategy.entry("Buy",true,when=window() and Buy)
strategy.close_all(when=window() and Sell)

```

> Detail

https://www.fmz.com/strategy/429787

> Last Modified

2023-10-20 17:24:14
