
> Name

Dual-Moving-Average-Reversal-Tracking-Strategy-442274

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/143f3aeacfa8a18a828.png)

## Overview  

The Dual Moving Average Reversal Tracking strategy is a quantitative trading strategy that utilizes moving average crossovers as trading signals. The strategy combines the MACD indicator's fast and slow moving average difference and its signal line, as well as the long/short ratio of trading volumes, to form trading signals and capture market reversal opportunities.

## Strategy Logic  

The strategy mainly judges the relationship between the fast line and slow line. It generates a buy signal when the fast line crosses above the slow line, and a sell signal when the fast line crosses below the slow line. In addition, it also comprehensively judges the market's long/short status based on the long/short state of the MACD difference value, the relationship between the difference and signal line, the long/short situation of trading volumes, etc.

Specifically, the strategy judges the size and direction of the MACD difference value, the crossover between the difference and signal line, the consistent or opposite direction between the difference and signal line, etc. These situations reflect the submarket rebound characteristics after a plunge. In addition, the long/short distribution of trading volumes is also used as an auxiliary judgment indicator.  

When the difference and signal line show market reversal signals, and trading volumes correspond to confirm the market reversal, trading signals will be generated.

## Advantages

- Utilize dual moving average crossovers to determine market reversal points, solid theoretical basis
- Incorporate trading volume judgment to avoid false breakouts  
- MACD indicator judges subsection sentiment, identifies rebound features
- High flexibility of parameters  

## Risks and Solutions

- Whipsaw problem caused by moving average crossover
  - Adjust moving average parameters, increase threshold
- Trading volumes unable to completely filter false breakouts
  - Incorporate secondary indicators like OBV to judge real trading volume trends
- Unable to judge depth and strength of subsection adjustment
  - Increase stop loss, evaluate important support areas  

## Optimization Directions 

- Utilize machine learning models instead of rules-based judgments
  - Improve strategy robustness, reduce overfitting
- Increase stop loss and take profit techniques
  - Lock in partial profits, reduce risks
- Incorporate sentiment indicators, news analytics
  - Improve model judgment accuracy  
- Port to other products, markets
  - Test strategy extendibility

## Summary  

The Dual Moving Average Reversal Tracking strategy comprehensively considers indicators like moving averages, MACD, and trading volumes. By capturing their reversal signals, appropriate reversal points are selected  to establish positions. There is still large room for optimizing this strategy, robustness and profitability can be further improved by techniques like machine learning and risk management.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.26|Signal Bias|
|v_input_2|0.8|MACD Bias|
|v_input_3|3|Short LookBack|
|v_input_4|10|Long LookBack|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-20 00:00:00
end: 2024-02-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("3 10 Oscillator Profile Flagging", shorttitle="3 10 Oscillator Profile Flagging", overlay=true)

signalBiasValue = input(title="Signal Bias", defval=0.26)
macdBiasValue = input(title="MACD Bias", defval=0.8)
shortLookBack = input( title="Short LookBack", defval=3)
longLookBack = input( title="Long LookBack", defval=10)

fast_ma = ta.sma(close, 3)
slow_ma = ta.sma(close, 10)
macd = fast_ma - slow_ma
signal = ta.sma(macd, 16)
hline(0, "Zero Line", color = color.black)

buyVolume = volume*((close-low)/(high-low))
sellVolume = volume*((high-close)/(high-low))
buyVolSlope = buyVolume - buyVolume[1]
sellVolSlope = sellVolume - sellVolume[1]
signalSlope = ( signal - signal[1] )
macdSlope = ( macd - macd[1] )
//plot(macdSlope, color=color.red, title="Total Volume")
//plot(signalSlope, color=color.green, title="Total Volume")
intrabarRange = high - low

getLookBackSlope(lookBack) => signal - signal[lookBack]
getBuyerVolBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if buyVolume[i] > sellVolume[i]
            j += 1
    j

getSellerVolBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if sellVolume[i] > buyVolume[i]
            j += 1
    j

getVolBias(lookBack) =>
    float b = 0
    float s = 0
    for i = 1 to lookBack
        b += buyVolume[i]
        s += sellVolume[i]
    b > s

getSignalBuyerBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if signal[i] > signalBiasValue
            j += 1
    j

getSignalSellerBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if signal[i] < ( 0 - signalBiasValue )
            j += 1
    j

getSignalNoBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if signal[i] < signalBiasValue and signal[i] > ( 0 - signalBiasValue )
            j += 1
    j

getPriceRising(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if close[i] > close[i + 1]
            j += 1
    j


getPriceFalling(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if close[i] < close[i + 1] 
            j += 1
    j

getRangeNarrowing(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if intrabarRange[i] < intrabarRange[i + 1] 
            j+= 1
    j

getRangeBroadening(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if intrabarRange[i] > intrabarRange[i + 1] 
            j+= 1
    j

bool isNegativeSignalReversal = signalSlope < 0 and signalSlope[1] > 0
bool isNegativeMacdReversal = macdSlope < 0 and macdSlope[1] > 0

bool isPositiveSignalReversal = signalSlope > 0 and signalSlope[1] < 0
bool isPositiveMacdReversal = macdSlope > 0 and macdSlope[1] < 0

bool hasBearInversion = signalSlope > 0 and macdSlope < 0
bool hasBullInversion = signalSlope < 0 and macdSlope > 0

bool hasSignalBias = math.abs(signal) >= signalBiasValue
bool hasNoSignalBias = signal < signalBiasValue and signal > ( 0 - signalBiasValue )

bool hasSignalBuyerBias = hasSignalBias and signal > 0
bool hasSignalSellerBias = hasSignalBias and signal < 0

bool hasPositiveMACDBias = macd > macdBiasValue
bool hasNegativeMACDBias = macd < ( 0 - macdBiasValue )

bool hasBullAntiPattern = ta.crossunder(macd, signal)
bool hasBearAntiPattern = ta.crossover(macd, signal)

bool hasSignificantBuyerVolBias = buyVolume > ( sellVolume * 1.5 )
bool hasSignificantSellerVolBias = sellVolume > ( buyVolume * 1.5 )

// 7.48 Profit 52.5% 
if ( hasSignificantBuyerVolBias and getPriceRising(shortLookBack) == shortLookBack  and getBuyerVolBias(shortLookBack) == shortLookBack and hasPositiveMACDBias and hasBullInversion)
    strategy.entry("Short1", strategy.short)
strategy.exit("TPS", "Short1", limit=strategy.position_avg_price - 0.75, stop=strategy.position_avg_price + 0.5)

// 32.53 Profit 47.91%
if ( getPriceFalling(shortLookBack) and (getVolBias(shortLookBack) == false) and signalSlope < 0 and hasSignalSellerBias)
    strategy.entry("Long1", strategy.long)
strategy.exit("TPS", "Long1", limit=strategy.position_avg_price + 0.75, stop=strategy.position_avg_price - 0.5)
```

> Detail

https://www.fmz.com/strategy/442274

> Last Modified

2024-02-20 17:08:43
