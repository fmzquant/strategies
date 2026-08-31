
> Name

Trend-Following-Strategy-Based-on-Candlestick-Direction

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16eddf006b89bd8d869.png)

## Overview

This strategy generates long or short signals based on the relationship between the closing price and opening price of candlesticks to determine the current trend direction. Specifically, if the closing price is higher than the opening price, a long signal is generated. If the closing price is lower than the opening price, a short signal is generated.

## Strategy Logic

The strategy mainly relies on the following two conditions to generate trading signals:

1. Entry signal logic: If the closing price is higher than the opening price (close > open) and it has reached the opening hour, a long signal is generated. If the closing price is lower than the opening price (close < open) and it has reached the opening hour, a short signal is generated.  

2. Exit conditions: Contrary to entry signals, if already long, the loss condition is closing price below opening price plus ATR value, profit condition is closing price higher than opening price plus ATR multiplied by profit ratio. Vice versa if already short.

With this design, this strategy leverages the directional information from candlesticks to determine trend direction and timely follows the trend. Also, the stop loss and take profit standards dynamically adapt based on ATR, avoiding issues with fixed values.   

## Advantages

The biggest advantage of this strategy is the strong trend following capability utilizing candlestick direction. Entry signals are simple and clear, combined with opening hour condition to avoid overnight risks. Stop loss and take profit standards change dynamically to auto adjust position sizing.

Overall, this strategy has quick reaction and strong tracking ability, suitable for catching trends on middle timeframes like 1H, 4H.

## Risks

Main risks of this strategy include:

1. High trading frequency, easily affected by transaction costs and slippage. Can optimize by adjusting profit ratio.

2. Wrong signals may happen if candlestick divergence occurs. Can filter with other indicators.

3. ATR parameter settings affect stop loss/take profit performance. ATR length and profit ratio need market adjustment.

4. Opening hour setting also impacts signal quality. Different markets need different opening hour.

## Optimization

Aspects that this strategy can further optimize on:

1. Add filters like moving averages to handle wrong signals from price fluctuations.  

2. Incorporate position sizing to control single bet size based on volatility.

3. Utilize machine learning to dynamically optimize stop loss/take profit parameters to adapt to the market.

4. Judge market sentiment using indicators to manage overall position.

## Conclusion

In summary, this strategy has quick reaction and effectively catches trends. It determines direction and generates signals simply based on relationship between candlestick closing and opening prices. Also, dynamic ATR is used for stop loss/take profit standards to adjust position sizing based on volatility. Huge potential to further optimize by adding filters and fine tuning parameters.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Start Hour for Entries|
|v_input_2|true|Activate Long|
|v_input_3|true|Activate Short|
|v_input_4|1.5|Take Profit Ratio|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Go with Trend Strategy", overlay=true)

// Input settings
startHour = input(9, title="Start Hour for Entries")
activateLong = input(true, title="Activate Long")
activateShort = input(true, title="Activate Short")
takeProfitRatio = input(1.5, title="Take Profit Ratio")

// Calculate ATR
atrLength = 14  // You can change this value as needed
atrValue = ta.atr(atrLength)

// Calculate entry conditions
enterLong = close > open and hour >= startHour
enterShort = close < open and hour >= startHour

// Strategy logic
if (activateLong and enterLong)
    strategy.entry("Long", strategy.long)

if (activateShort and enterShort)
    strategy.entry("Short", strategy.short)

// Stop loss and take profit conditions
strategy.exit("Exit Long", from_entry="Long", loss=close - atrValue, profit=close + takeProfitRatio * atrValue)
strategy.exit("Exit Short", from_entry="Short", loss=close + atrValue, profit=close - takeProfitRatio * atrValue)

```

> Detail

https://www.fmz.com/strategy/442076

> Last Modified

2024-02-19 10:36:00
