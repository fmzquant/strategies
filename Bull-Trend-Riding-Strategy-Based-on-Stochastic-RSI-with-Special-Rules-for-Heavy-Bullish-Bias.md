
> Name

Bull-Trend-Riding-Strategy-Based-on-Stochastic-RSI-with-Special-Rules-for-Heavy-Bullish-Bias

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/179c9eaae40dbefe688.png)


## Overview

This is a long-only trend following strategy. It utilizes Donchian Channel and StochRSI indicator to identify strong bull trends and participate with low risk.  

## Strategy Logic

This strategy uses the following two indicators for trend identification:

1. Donchian Channel: Calculates 6-day EMA of recent 30 bar's highest high, as the channel's upper band. If close is above upper band, it indicates a bull trend currently.

2. StochRSI indicator: Including %K line and %D line. This strategy adds a lower band on %K line, default is 35. When %K line crosses below lower band, it signals an end of the bull trend.

Specifically, the trading logic is: 

1. When close is above Donchian upper band, it shows a green background, indicating a bull trend.

2. When StochRSI %K is above the default lower band 35, go long. 

3. When %K crosses below lower band, close long position.

As we can see, this strategy utilizes both trend filter and oscillator indicator, to participate in bull trends with low risk. Donchian Channel filters non-trending markets, ensuring only taking long in a bull trend. StochRSI identifies overbought/oversold status, to close position in a timely manner.

## Advantages

The advantages of this strategy include:

1. Only long, avoiding losses in bear markets.

2. Using Donchian Channel to identify trends, filtering non-trending markets.

3. Adjustable parameters of StochRSI, can set entry and exit levels based on risk appetite.

4. Suitable for stocks with sustained uptrend. Can generate continuing profits.

5. Simple and clear logic, easy to understand and implement.

## Risks

There are also some risks:

1. Missing the entry point, unable to capture full profits in trend.

2. Sudden trend reversal, indicator fails to exit in time, leading to large losses.

3. Inappropriate parameters setting increases trading frequency and false signals.

4. Only suitable for long-term bull markets, not for ranging or bearish markets. 

5. Need to watch the fundamentals to avoid picking stocks with weakening fundamentals.

## Improvements

Some ways to improve the strategy:

1. Optimize parameters for markets with different volatility.

2. Add stop loss to limit losses in single trade.

3. Combine fundamentals and news, avoid stocks with weakening fundamentals. 

4. Optimize entry timing, ensure timely entry through repeated testing.

5. Optimize exit timing, avoid premature exit in bull trend.

6. Test on different stock samples to evaluate performance. Find the optimal stock types.

## Conclusion

This strategy identifies trend with Donchian Channel, and trades with StochRSI signals. It can effectively follow bull trends with low risk. The pros are simple logic and continuously capturing upside momentum. Need to pay attention to parameter tuning, stock selection, and further enhancements. If executed properly, this strategy can be an effective tool to participate in long-term bull markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|filter_ema_len|
|v_input_2|30|ema_donchian_len|
|v_input_int_1|7|K|
|v_input_int_2|4|D|
|v_input_int_3|14|RSI Length|
|v_input_int_4|14|Stochastic Length|
|v_input_3_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|35|lowerband|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-16 00:00:00
end: 2023-10-16 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SnarkyPuppy

//@version=5
strategy("Filtered Stoch", overlay=false, default_qty_value = 100, default_qty_type=strategy.percent_of_equity)

/////high filter...upper donchian channel of ema... or highest ema for a given amount of candles

filter_ema_len= input(6)
ema_donchian_len = input(30)

ema=ta.highest(ta.ema(high,filter_ema_len),ema_donchian_len)

////////////////////////basic stoch rsi with max val 100 and min val 0.. entry above lowerband preset 35

smoothK = input.int(7, "K", minval=1)
smoothD = input.int(4, "D", minval=1)
lengthRSI = input.int(14, "RSI Length", minval=1)
lengthStoch = input.int(14, "Stochastic Length", minval=1)
src = input(close, title="RSI Source")
rsi1 = ta.rsi(src, lengthRSI)
k = math.min(100, math.max(0,ta.sma(ta.stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)))
d = math.max(math.min(ta.sma(k, smoothD),80),35)
plot(k, "K", color=#2962FF)
plot(d, "D", color=#FF6D00)
h0 = hline(80, "Upper Band", color=#787B86)
hline(50, "Middle Band", color=color.new(#787B86, 50))
lowerband=input(35)
h11 = hline(lowerband, "Lower Band", color=#787B86)
fill(h0, h11, color=color.rgb(33, 150, 243, 90), title="Background")

ematrend= close>ema ? 1 : 0

bgcolor(ematrend==1?color.rgb(76, 175, 79, 80):na)

longCondition = k>lowerband and ematrend==1
if (longCondition)
    strategy.entry("Up", strategy.long)

shortCondition =  ta.crossunder(k,lowerband)
if (shortCondition)
    strategy.close("Up", shortCondition)
    

```

> Detail

https://www.fmz.com/strategy/429471

> Last Modified

2023-10-17 14:31:22
