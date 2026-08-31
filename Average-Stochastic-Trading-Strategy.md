
> Name

Average-Stochastic-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/215fb8a0482df7bb8f2.png)


## Overview 

This strategy is based on the Average Stochastic Oscillator for trading signal judgment and belongs to a trend following strategy. It calculates the moving average values of %K and %D of the Average Stochastic Oscillator. When the golden cross occurs, go long. When the death cross occurs, go short. It is a typical trend following strategy.

## Strategy Logic

1. Calculate the values of %K and %D of the Average Stochastic Oscillator. %K is the moving average of random values calculated based on closing prices over a certain period, reflecting the relative position of the current price to the highest and lowest prices over a certain period. %D is the moving average of %K used to confirm the trend.

2. Exponentially smooth moving average (EMA) is applied to %K and %D respectively to obtain the average values _avg_k and _avg_d of the Average Stochastic Oscillator. 

3. Determine trading signals:

   - Buy signal: when _avg_k crosses over _avg_d and _avg_d < 20, go long.

   - Sell signal: when _avg_k crosses below _avg_d and _avg_d > 80, go short.
   
4. Position management:

   - Long stop loss: close long when _avg_d > 80

   - Short stop loss: close short when _avg_d < 20
   
5. Allow maximum 3 orders in the same direction, which is a pyramiding strategy.

## Advantages

1. Using double moving averages to determine golden cross and death cross can effectively filter false breakouts and improve signal quality.

2. Applying Average Stochastic Oscillator can effectively track price trends. 

3. Combining overbought and oversold zones helps avoid frequent trading in range-bound market.

4. Allowing pyramiding can gain more profit in trending market. 

5. Stop loss strategy controls single loss.

## Risks

1. Dual moving average trading strategies tend to generate frequent trading, which will affect profitability if transaction costs are too high.

2. Using fixed stop loss points may stop loss too early exiting the trend.

3. Too many pyramiding may enlarge the loss. 

4. It cannot effectively determine trend reversal points and may lead to large losses when trend reverses.

5. Parameter periods need to be optimized because different periods can lead to very different results.

## Optimization

1. Consider introducing trend judgment indicators to avoid counter trend trading.

2. Dynamically adjust stop loss points to fit the trend better.

3. Optimize pyramiding strategy, for example, increase position size progressively. 

4. Incorporate other indicators to judge trend reversal and exit profit early.

5. Test parameter optimization separately for different products to improve adaptability.

## Summary

In summary, this is a typical trend following strategy. It uses Average Stochastic Oscillator to determine trend direction and pyramids when trend occurs. The advantage is strong tracking ability suitable for trending market. But it is important to avoid counter trend trading. Further optimization can be done by introducing trend judgment, optimizing stop loss strategy, controlling pyramiding times, etc. With proper parameter selection, good tracking results can be achieved.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|21|%K Length|
|v_input_int_2|3|%K Smoothing|
|v_input_int_3|3|%D Smoothing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-19 00:00:00
end: 2023-10-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//1. AVG Stochastic Calculate
//1.1 AVG %K is calculated by apply EMA with smooth K period on Average of Original Stochastic %k & %d
//+ avg_k=ema((%k+%d)/2,smoothK)
//1.2 AVG %D is calculated by apply EMA with %d period on AVG %K
//+ avg_d=ema(avg_k,periodD)
//2. Parameter
//+ %K Length: 21
//+ %K Smoothing: 3
//+ %D Smoothing: 3
//+ Symbol: BTC/USDT
//+ Timeframe: M30
//+ Pyramiding: Maximum 3 orders at the same direction.
//3. Signal
//3.1 Buy Signal
//+ Entry: AVG %K crossover AVG %D and AVG %D < 20
//+ Exit: AVG %D > 80 
//3.2 Sell Signal
//+ Entry: AVG %K crossunder AVG %D and AVG %D > 80
//+ Exit: AVG %D < 20 
strategy(title="AVG Stochastic Strategy [M30 Backtesting]", overlay=true, pyramiding=3)
periodK = input.int(21, title="%K Length", minval=1)
smoothK = input.int(3, title="%K Smoothing", minval=1)
periodD = input.int(3, title="%D Smoothing", minval=1)
k = ta.sma(ta.stoch(close, high, low, periodK), smoothK)
d = ta.sma(k, periodD)
_avg_k=ta.ema(math.avg(k,d),smoothK)
_avg_d=ta.ema(_avg_k,periodD)
up=
   _avg_k[1]<_avg_d[1]
   and _avg_k>_avg_d
   and _avg_d<20
dn=
   _avg_k[1]>_avg_d[1]
   and _avg_k<_avg_d
   and _avg_d>80
var arr_val=0
if up
    arr_val:=1
    strategy.entry("Long", strategy.long)
if dn
    arr_val:=-1
    strategy.entry("Short", strategy.short)
if up[1] or dn[1]
    arr_val:=0
plotarrow(arr_val,title="Signal",colorup=color.green,colordown=color.red)
if _avg_d>80 
    strategy.close("Long")
if _avg_d<20 
    strategy.close("Short")
//EOF
```

> Detail

https://www.fmz.com/strategy/430262

> Last Modified

2023-10-26 16:20:33
