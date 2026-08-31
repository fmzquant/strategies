
> Name

Bollinger-Bands-RSI-OBV策略Bollinger-Bands-RSI-OBV-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/137636ba3c3b3e555ac.png)

## Overview
The Bollinger Bands RSI OBV strategy combines Bollinger Bands, Relative Strength Index (RSI) and On Balance Volume (OBV) to identify breakout and reversal points of stock prices. When the stock price breaks through the upper and lower rails of the Bollinger Bands, and the RSI indicator shows overbought or oversold, while the OBV indicator shows a turn, this strategy will issue trading signals.

## Strategy Principle  
The trading logic of this strategy is mainly based on Bollinger Bands, RSI indicators and OBV indicators. Specifically:

1. When the stock price breaks through the middle rail of the Bollinger Bands and goes up, while the RSI is greater than 50 indicating the formation of a bullish trend, if the OBV indicator falls back at this time indicating a short-term decline, this is the time to open long positions.

2. When the stock price breaks through the lower rail of the Bollinger Bands, close the previous long positions.  

3. When the stock price breaks through the middle rail of the Bollinger Bands and goes down, while the RSI is less than 50 indicating the formation of a bearish trend, if the OBV indicator rises at this time indicating a short-term rebound, this is the time to open short positions.

4. When the stock price breaches the upper rail of the Bollinger Bands again, close the previous short positions.

So this strategy uses the breakout of Bollinger rails to determine direction; combines RSI to judge strength and weakness and OBV to judge short-term reversals to generate trading signals.

## Advantage Analysis
The biggest advantage of this strategy is that it combines three different types of indicators: Bollinger Bands, RSI and OBV, which can capture changes in signals in advance when stock prices start to change directionally. For example, after the stock price breaks through the middle rail of the Bollinger Bands upwards, if you just look at the K-line chart, you may directly open long positions. However, combining RSI and OBV can determine if there is a possibility of short-term adjustment at this time thereby avoiding opening positions. Therefore, such a combination of indicators can improve the stability of the strategy.

Secondly, this strategy sets the entry condition of breaking through the Bollinger Bands as well as the stop loss condition of breaking through the Bollinger Bands in the opposite direction. This can keep the risk-reward ratio of each position within a reasonable range and reduce the possibility of a single loss.

Finally, the code logic of this strategy is clear and concise, and the parameter settings are reasonable and easy to understand, making it suitable as a simulation strategy framework for optimization and improvement. This reduces the risks that may occur when the strategy goes live.

## Risk Analysis
The biggest risk of this strategy is that improper setting of the width of the Bollinger Bands may result in missing a lot of trading opportunities. If the interval between Bollinger Bands is set too large, stock prices need to fluctuate greatly in magnitude to trigger opening or stop loss logic. This may miss some relatively small trend opportunities.

In addition, the current strategy only considers the logic of selecting buying and selling points without integrating capital management, position management and other optimizations. This can lead to unlimited one-sided accumulation, which can easily lead to greater losses due to inability to stop losses in time.

Finally, the combination of RSI and OBV indicators may also have wrong signals. The RSI only considers the speed of rises and falls in stock prices over a certain period of time, and cannot determine long-term trends; The OBV can also become less reliable due to the characteristics of individual stocks. These can all affect the accuracy of strategy signals.  

## Optimization Direction  

In view of the above analysis, the strategy can be optimized in the following aspects:

1. Optimize the width of Bollinger Bands to set adaptive widths to automatically adapt to market volatility.

2. Integrate position management logic to reduce position size when continuous losses occur. And appropriately increase positions when continuous profits occur.  

3. Test and optimize parameters of RSI indicators such as lookback period for rises etc.  

4. Try different short-term indicators such as KDJ, MACD etc. to replace OBV indicators to determine if signal accuracy can be improved.

5. Test different medium and long term indicators such as MVSL, DMI combined with RSI to assist in determining the medium and long term trend of stock prices.

## Conclusion  
The Bollinger Bands RSI OBV strategy comprehensively uses three different types of technical indicators to provide a framework basis for subsequent optimization and improvement while ensuring certain stability and screening criteria. This strategy is suitable for mid-to-long term stock selection and holdings, and can also be used as the basis for short-term strategies to make significant adjustments and optimizations.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|length|
|v_input_2|2|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © atakhadivi

//@version=4
strategy("BB+RSI+OBV", overlay=true)

src = close
obv = cum(sign(change(src)) * volume)
// plot(obv, color=#3A6CA8, title="OnBalanceVolume")

source = close
length = input(20, minval=1)
mult = input(2.0, minval=0.001, maxval=50)
basis = sma(source, length)
dev = mult * stdev(source, length)
upper = basis + dev
lower = basis - dev
buyEntry = source > basis and rsi(close, 14) > 50 and obv[1] < obv 
buyExit = source < lower
sellEntry = source < basis and rsi(close, 14) < 50 and obv[1] > obv
sellExit = source > upper
strategy.entry("BBandLE", strategy.long, stop=lower, oca_name="BollingerBands",comment="BBandLE", when=buyEntry)
strategy.exit(id='BBandLE', when=buyExit)
strategy.entry("BBandSE", strategy.short, stop=upper, oca_name="BollingerBands", comment="BBandSE", when=sellEntry)
strategy.exit(id='BBandSE', when=sellExit)
```

> Detail

https://www.fmz.com/strategy/440339

> Last Modified

2024-01-29 14:49:29
