
> Name

Dual-Moving-Average-and-MACD-Combination-Short-term-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines dual moving averages, stochastic indicator and MACD to identify short-term trading opportunities, which is a relatively classic short-term trading strategy.

## Principle  

The strategy is mainly based on the following principles:

1. Use 50-period and 100-period EMA to determine trend direction. The EMA with shorter period can respond quickly to price changes. The crossing up of 50-period EMA above 100-period EMA represents establishing long position; the crossing down represents establishing short position.

2. Use the difference between MACD to determine entry and exit points. When the difference crosses above 0, it shows strengthening of bull power and leads to long entry; when it crosses below 0, it shows strengthening of bear power and leads to short entry.

3. Combine Stochastic RSI indicator to judge overbought and oversold situation. This indicator combines the advantages of KDJ and RSI, and can show overbought and oversold conditions well. When it is lower than 20, the market is oversold, and long entry can be considered combining other indicators; when it is higher than 80, the market is overbought, and short entry can be considered.

4. After determining the entry direction, if 4 out of the most recent 5 candlesticks have closing prices touching the moving averages, it shows that there are support/resistance around the moving averages, and positions can be opened.

5. Use stop loss and take profit to manage risks.

## Advantages

The advantages of this strategy include:

1. The combination of multiple indicators improves winning rate, utilizing moving averages, overbought/oversold indicator and momentum indicator together.

2. The short period moving averages can capture trend and reversals quickly. MACD parameters are optimized to generate precise entry signals.

3. Stochastic RSI parameters are optimized to identify overbought/oversold conditions well. 

4. Using support/resistance around moving averages for timing control avoids being trapped by fake breakouts.

5. Reasonable stop loss and take profit effectively controls risks for each trade.

## Risks

There are also some risks of this strategy:

1. Failing to completely avoid losses caused by fake breakouts. 

2. Divergence may happen between indicators, causing inconsistent trading signals.

3. Fixed stop loss and take profit may fail to adapt to market changes.

4. The complex code with many parameters is difficult to optimize.

The solutions are:

1. Optimize parameters to improve signal quality and lower fake breakout probabilities.

2. Establish priorities between indicators to avoid conflicts.

3. Adopt dynamic stop loss and take profit based on ATR ranges.

4. Simplify logic and extract core parameters for testing and optimization.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Test and find the optimal combinations of moving average periods and MACD parameters.

2. Test different overbought/oversold indicators to replace Stochastic RSI. 

3. Try dynamic stop loss and take profit, trailing stop to make risk management more intelligent.

4. Add filtering conditions like increasing volume to improve signal quality.

5. Optimize entry logic to avoid ineffective breakouts, using more indicators to determine the trend.

6. Set stop loss limits according to account size, number of trades per day to control overall risks.

## Summary

This strategy integrates the advantages of multiple indicators, and is very practical for short-term trading. By continuing parameter optimization, strict entry logic, and improved risk management, the stability and profitability can be further enhanced. It suits short-term traders with some experience, but risks must be controlled to avoid huge losses.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|50|Length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|100|len100|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|true|Length|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|4|length|
|v_input_9|80|OverBought|
|v_input_10|20|OverSold|
|v_input_11|12|Fast Length|
|v_input_12|26|Slow Length|
|v_input_13_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|10|Signal Smoothing|
|v_input_15|false|Simple MA(Oscillator)|
|v_input_16|false|Simple MA(Signal Line)|
|v_input_17|200|tp|
|v_input_18|200|sl|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-10-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title="Forex scalper 2xEMA + SRSI + MACD", shorttitle="Forex scalper 5-15min", overlay=true)
src = input(title="Source", type=input.source, defval=close)

src_0 = src[0]
src_1 = src[1]
src_2 = src[2]
src_3 = src[3]
src_4 = src[4]

len50 = input(50, minval=1, title="Length")
src50 = input(close, title="Source")
out50 = ema(src50, len50)
len100 = input(100)
src100 = input(close, title="Source")
out100 = ema(src100, len100)

len1 = input(1, minval=1, title="Length")
src1 = input(close, title="Source")
out1 = sma(src1, len1)

length = input(4, minval=1)
OverBought = input(80)
OverSold = input(20)
smoothK = 3
smoothD = 3

k = sma(stoch(close, high, low, length), smoothK)
d = sma(k, smoothD)
cu = crossover(k,OverSold)
co = crossunder(k,OverBought)

sma_down = crossunder(out1, out50)
sma_up = crossover(out1,out50)

//if (not na(k) and not na(d))
  //  if (co and k < OverSold)
    //    strategy.entry("StochLE", strategy.long, comment="StochLE")
    //if (cu and k > OverBought)
     //   strategy.entry("StochSE", strategy.short, comment="StochSE")

crossCandle_4 = crossover(src[4],out50)
crossCandleUnder_4= cross(src[4],out50)
crossCandle_3 = crossover(src[3],out50)
crossCandleUnder_3= crossunder(src[3],out50)
crossCandle_2 = crossover(src[2],out50)
crossCandleUnder_2= crossunder(src[2],out50)
crossCandle_1 = crossover(src[1],out50)
crossCandleUnder_1= crossunder(src[1],out50)
crossCandle_0 = crossover(src[0],out50)
crossCandleUnder_0= crossunder(src[0],out50)

conditionOver = (crossCandle_4 or crossCandle_3 or crossCandle_2 or crossCandle_1 or crossCandle_0)
conditionUnder =(crossCandleUnder_4 or crossCandleUnder_3 or crossCandleUnder_2 or crossCandleUnder_1 or crossCandleUnder_0)

touch4 = (cross(low[4],out50) or cross(high[4],out50))
touch3 = (cross(low[3],out50) or cross(high[3],out50))
touch2 = (cross(low[2],out50) or cross(high[2],out50))
touch1 = (cross(low[1],out50) or cross(high[1],out50))

touch = touch1 or touch2 or touch3 or touch4

//and sma_up
//and sma_down

// Getting inputs
fast_length = input(title="Fast Length", type=input.integer, defval=12)
slow_length = input(title="Slow Length", type=input.integer, defval=26)
src_macd = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 10)
sma_source = input(title="Simple MA(Oscillator)", type=input.bool, defval=false)
sma_signal = input(title="Simple MA(Signal Line)", type=input.bool, defval=false)

// Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00

// Calculating
fast_ma = sma_source ? sma(src_macd, fast_length) : ema(src_macd, fast_length)
slow_ma = sma_source ? sma(src_macd, slow_length) : ema(src_macd, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal

//plot(hist, title="Histogram", style=plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below) ), transp=0 )
//plot(macd, title="MACD", color=col_macd, transp=0)
//plot(signal, title="Signal", color=col_signal, transp=0)


// plot((conditionOver or conditionUnder or touch)  and src[0] >= out50 and close >= out50 and  (cu) and out50 > out100 and hist>=0 , title="Buy", style=columns, color=lime)
// plot((conditionOver or conditionUnder or touch)  and src[0] <= out50 and close <= out50 and  (co) and out50< out100 and hist<=0 , title="sell", style=columns, color=red)


long_cond = ((conditionOver or conditionUnder or touch)  and src[0] >= out50 and close > out50 and  (cu) and out50 > out100 and hist>=0)
short_cond = ((conditionOver or conditionUnder or touch)  and src[0] <= out50 and close < out50 and  (co) and out50< out100 and hist<=0)

tp=input(200)
sl=input(200)

strategy.entry("long",strategy.long, when=long_cond)
strategy.entry("short",strategy.short, when=short_cond)

strategy.exit("X_long", "long", profit=tp,  loss=sl, when=touch  )
strategy.exit("x_short", "short",profit=tp, loss=sl,when = touch )
```

> Detail

https://www.fmz.com/strategy/428811

> Last Modified

2023-10-09 16:47:42
