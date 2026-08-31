
> Name

基于EMA和MACD的多时间框架趋势跟踪策略Trend-Following-Strategy-Based-on-EMA-and-MACD-across-Timeframes

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1beb144b9d6cea676e5.png)

## Overview  

This strategy combines EMA lines and MACD indicator across timeframes to identify trend signals and capture mid-to-long term trends. It takes trend following actions when short-term trend aligns with mid-to-long term trend. Meanwhile, the strategy uses ATR indicator to set stop loss and take profit to control risks from fluctuations.  

## Principles  

The strategy uses 50-day EMA and 100-day EMA to determine mid-to-long term trend direction. When short-term trend is identified by MACD indicator, it checks if the directions align. If yes, it takes trend following actions.   

Specifically, when MACD fast line crosses above slow line, and closes > 50-day EMA and closes > 100-day EMA, it goes long. When MACD fast line crosses below slow line, and closes < 50-day EMA and closes < 100-day EMA, it goes short.

Also, the strategy uses ATR indicator to calculate range of fluctuations and set stop loss and take profit prices. It sets certain multiplier of ATR based on close price as stop loss level, and certain multiplier of ATR based on close price as take profit level.  

## Advantage Analysis

1. Combining EMA lines and MACD indicator across timeframes helps identify trend signals and prevents missing mid-to-long term trends  

2. Using ATR indicator to set stop loss and take profit based on market fluctuation effectively controls risks

3. Avoiding market neutral zones prevents unnecessary losses

## Risk Analysis  

1. EMA lines have lagging effect and may miss turning points

2. MACD indicator has multiple timeframes and parameter settings that impact results   

3. ATR ranges cannot fully represent future price fluctuations, cannot eliminate risks

**Counter measures:**  

1. Confirm signals with other indicators to avoid EMA lagging issues   

2. Adjust MACD parameters and optimize results   

3. Reasonably set ATR multiplier to control maximum loss

## Optimization Directions   

1. Test different combinations of EMA line periods  

2. Optimize MACD parameter settings  

3. Use machine learning methods to automatically find optimal ATR stop loss/take profit multipliers  

## Summary  

The strategy combines EMA, MACD and ATR indicators to implement trend following operations across timeframes. Through parameter optimization, it has the potential to achieve good strategy return rates. Also need to prevent risks including indicator lagging, improper parameter adjustment and fluctuation control, and continue to optimize and enhance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3|9|Signal Length|
|v_input_4|14|ATR Length|
|v_input_5|3|Take Profit Multiplier|
|v_input_6|true|Stop Loss Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-29 00:00:00
end: 2024-01-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA-50, EMA-100, and MACD Strategy with ATR for Stop Loss/Profit", overlay=true)

// MACD hesaplama
fastLength = input(12, title="Fast Length")
slowLength = input(26, title="Slow Length")
signalLength = input(9, title="Signal Length")
[macdLine, signalLine, _] = ta.macd(close, fastLength, slowLength, signalLength)

// EMA-50 ve EMA-100 hesaplama
ema50 = ta.ema(close, 50)
ema100 = ta.ema(close, 100)

// ATR hesaplama
atrLength = input(14, title="ATR Length")
atrValue = ta.atr(atrLength)

// Take Profit ve Stop Loss çoklayıcıları
takeProfitMultiplier = input(3.0, title="Take Profit Multiplier") // TP, 3 katı ATR
stopLossMultiplier = input(1.0, title="Stop Loss Multiplier")

// Long Pozisyon Koşulları
longCondition = ta.crossover(macdLine, signalLine) and close > ema50 and close > ema100

// Short Pozisyon Koşulları
shortCondition = ta.crossunder(macdLine, signalLine) and close < ema50 and close < ema100

// Take Profit ve Stop Loss Seviyeleri
takeProfitLevel = close + takeProfitMultiplier * atrValue
stopLossLevel = close - stopLossMultiplier * atrValue

// Long Pozisyon İşlemleri
strategy.entry("Long", strategy.long, when=longCondition)
strategy.exit("Take Profit/Stop Loss", from_entry="Long", loss=stopLossLevel, profit=takeProfitLevel)

// Short Pozisyon İşlemleri
strategy.entry("Short", strategy.short, when=shortCondition)
strategy.exit("Take Profit/Stop Loss", from_entry="Short", loss=stopLossLevel, profit=takeProfitLevel)

// Grafikte Gösterme
plot(ema50, color=color.blue, title="EMA-50")
plot(ema100, color=color.red, title="EMA-100")
hline(0, "Zero Line", color=color.gray)

```

> Detail

https://www.fmz.com/strategy/437738

> Last Modified

2024-01-05 11:16:17
