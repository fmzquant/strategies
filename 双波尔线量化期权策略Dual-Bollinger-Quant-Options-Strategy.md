
> Name

双波尔线量化期权策略Dual-Bollinger-Quant-Options-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The Dual Bollinger Quant Options Strategy is an options trading strategy that utilizes double Bollinger Bands and the RSI indicator to generate trading signals. It detects market reversals after aggressive one-sided moves. Although signals are less frequent, it is worth trying. Use 5-minute timeframe and trade for 5 candles, i.e. 25 minutes.

## Strategy Logic

The strategy uses two sets of Bollinger Bands with different parameters simultaneously. The first BBs has length of 20 and multiplier of 2. The second BBs has length of 20 and multiplier of 3. 

A buy signal is generated when price closes below the lower band of the second BBs and RSI(14) <= 20. A sell signal is generated when price closes above the upper band of the second BBs and RSI(14) >= 80.

According to Bollinger Bands theory, closing outside the bands indicates a higher chance of trend reversal. Combining with RSI overbought/oversold signals improves efficiency. Using double BBs captures more reversal opportunities with different parameters.

## Advantage Analysis

- Improved probability of catching reversals with double BBs

The dual BBs increase the chance of catching reversal signals during increased volatility. Using two sets of parameters is more likely to detect reversals than a single BB.

- RSI filters false breaks and invalid signals

RSI effectively judges overbought/oversold levels, filtering some invalid breakout signals. It complements BBs well and improves signal reliability.

- Suitable for catching sharp reversals 

The dual BBs with RSI can quickly capture reversal opportunities after aggressive one-sided moves. Such signals have large profit potential but less frequency, suitable for options trading.

- Low frequency trading controls drawdowns

The low trading frequency effectively controls drawdowns and slippage costs. It also suits the characteristics of options trading.

## Risk Analysis

- Possibility of prolonged no trading

As the strategy focuses on catching reversals, signals may be sparse during persistent trends. There is risk of no trading for some period.

- Difficult to generate signals when volatility is low

When volatility is low, price may fail to breakout of the BB bands, leading to insufficient signals. This carries risk of no trading for some duration.

- Failed reversal risk

Capturing reversals carries the risk of failed reversal. The price may reverse again after giving signal, causing losses. Proper position sizing and stop loss can help manage such risk.

## Optimization Directions 

- Optimize BB parameters

Test different combinations of length and multiplier to find optimal parameters for better performance.

- Add other indicators as filters 

Test adding MACD, KD etc. to filter trading signals and improve quality.

- Optimize options contracts selection

Choose suitable options contracts according to market volatility to maximize strategy performance.

- Optimize trading session selection

Testing can find the best trading sessions to avoid invalid signals and improve results.

## Conclusion

The Dual Bollinger Quant Options Strategy is an average-performing low-frequency mean reversion strategy overall. It improves capture rate with dual BBs and signal quality with RSI. But the low frequency trading limits high frequency trading. There are also risks of failed reversals. Further improvements can be made through optimizations and adding filters. It suits quant traders seeking steady returns over high frequency trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length1|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|StdDev|
|v_input_int_2|20|length2|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_2|3|StdDev|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-27 00:00:00
end: 2023-09-26 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Trade_by_DB


//@version=5
strategy("Double Bollinger Binary Options", overlay=true, margin_long=100, margin_short=100)

// Bollinger bands #1 (20,2)
length1 = input.int(20, minval=1)
src1 = input(close, title="Source")
mult1 = input.float(2.0, minval=0.001, maxval=50, title="StdDev")
basis1 = ta.sma(src1, length1)
dev1 = mult1 * ta.stdev(src1, length1)
upper1 = basis1 + dev1
lower1 = basis1 - dev1

//Bollinger bands #2
length2 = input.int(20, minval=1)
src2 = input(close, title="Source")
mult2 = input.float(3.0, minval=0.001, maxval=50, title="StdDev")
basis2 = ta.sma(src2, length2)
dev2 = mult2 * ta.stdev(src2, length2)
upper2 = basis2 + dev2
lower2 = basis2 - dev2


//Buy Condition
buy = close < lower2 and ta.rsi(close,14) <=20
sell = close > upper2 and ta.rsi(close,14) >=80

// plotshape(buy, style = shape.arrowup , color = color.green, location = location.belowbar)
// plotshape(sell, style = shape.arrowdown , color = color.red, location = location.abovebar)





if (buy)
    strategy.entry("CALL", strategy.long)


if (sell)
    strategy.entry("PUT", strategy.short)

```

> Detail

https://www.fmz.com/strategy/427986

> Last Modified

2023-09-27 16:19:30
