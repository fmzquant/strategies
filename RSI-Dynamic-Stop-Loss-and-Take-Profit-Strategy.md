
> Name

RSI-Dynamic-Stop-Loss-and-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15b58357d25fc264edb.png)

Strategy Overview:
The strategy is based on the relationship between the RSI indicator and price, optimizing trading performance by dynamically adjusting take profit and stop loss levels. The main idea of the strategy is to utilize the overbought and oversold characteristics of the RSI indicator, combined with changes in price and trading volume, to take profit in a timely manner when the RSI diverges, while controlling risk through dynamic stop loss.

Strategy Principle:
1. Calculate the value of the RSI indicator and determine the overbought and oversold thresholds based on the input parameters.
2. Judge whether a peak formation (isPeak) or bottom formation (isBottom) appears by comparing the current RSI value with the RSI values of the previous few candles.
3. When a peak formation appears, if the current price is higher than the high of the previous peak and the trading volume is smaller than the trading volume of the previous peak, a sell signal is generated.
4. When a bottom formation appears, if the current price is lower than the low of the previous bottom and the trading volume is smaller than the trading volume of the previous bottom, a buy signal is generated.
5. After a buy signal is triggered, take profit when the price retraces to the low of the previous bottom or the trading volume is smaller than the trading volume of the previous bottom.
6. After a sell signal is triggered, take profit when the price rebounds to the high of the previous peak or the trading volume is smaller than the trading volume of the previous peak.
7. After opening a position, set the stop loss price to a certain percentage (2%) of the opening price to control risk.

Strategy Advantages:
1. By dynamically taking profit, profits can be locked in a timely manner at the beginning of a trend reversal, improving strategy returns.
2. Using changes in trading volume as an auxiliary judgment condition can effectively filter out false signals and improve signal accuracy.
3. Setting stop losses can effectively control the risk exposure of a single transaction and reduce strategy drawdowns.
4. Parameters are adjustable and applicable to different market environments and trading varieties.

Strategy Risks:
1. In a sideways market, the RSI indicator may generate frequent overbought and oversold signals, causing the strategy to produce more false signals.
2. Setting stop losses may cause the strategy to experience large drawdowns in the short term.
3. The strategy's performance in trending markets may not be as good as trend-following strategies.

Optimization Direction:
1. Consider introducing other technical indicators, such as MACD, Bollinger Bands, etc., to improve the reliability of signals.
2. Optimize the thresholds for take profit and stop loss, and dynamically adjust them according to the characteristics of different varieties and market environments.
3. Add a position management module to adjust the position size according to market volatility and account risk status.
4. Perform parameter optimization on the strategy to find the optimal parameter combination.

Summary:
The RSI Dynamic Stop Loss and Take Profit Strategy takes profit in a timely manner at the beginning of a trend by utilizing the divergence relationship between the RSI indicator and price, combined with changes in trading volume, while setting dynamic stop losses to control risk. The advantages of this strategy are that it can lock in profits at the beginning of a trend reversal, reduce strategy drawdowns, and has a certain adaptability. However, in a sideways market, the strategy may generate more false signals, so it is necessary to introduce other technical indicators and optimize the take profit and stop loss thresholds to improve strategy performance. In addition, adding position management and parameter optimization are also important directions for further improving the stability and returns of the strategy.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Uzunluğu|
|v_input_2|70|Aşırı Alım Seviyesi|
|v_input_3|30|Aşırı Satım Seviyesi|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-11 00:00:00
end: 2024-03-15 09:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("RMM_byMR", overlay=true)

// RSI uzunluğu girişi
rsiLength = input(14, title="RSI Uzunluğu")

// Tepe ve dip seviyeleri için girişler
overboughtLevel = input(70, title="Aşırı Alım Seviyesi")
oversoldLevel = input(30, title="Aşırı Satım Seviyesi")

// RSI hesaplama
rsiValue = rsi(close, rsiLength)

// Son tepe noktalarını tespit etme // Son dip noktalarını tespit etme
isPeak = rsiValue[2] > overboughtLevel and rsiValue[2] > rsiValue[1] and rsiValue[2] > rsiValue[3] and (rsiValue[1] > rsiValue or rsiValue[3] > rsiValue[4])
isBottom = rsiValue[2] < oversoldLevel and rsiValue[2] < rsiValue[1] and rsiValue[2] < rsiValue[3] and (rsiValue[1] < rsiValue or rsiValue[3] < rsiValue[4])

// Önceki tepe noktalarını tespit etme
prevPeak = valuewhen(isPeak, rsiValue[2], 1)
prevPeakHighPrice = valuewhen(isPeak, high[2], 1)
volumePeak = valuewhen(isPeak, volume[1]+volume[2]+volume[3], 1)
prevPeakBarIndex = valuewhen(isPeak, bar_index, 1)

// Önceki dip noktalarını tespit etme
prevBottom = valuewhen(isBottom, rsiValue[2], 1)
prevBottomLowPrice = valuewhen(isBottom, low[2], 1)
volumeBottom = valuewhen(isBottom, volume[1]+volume[2]+volume[3], 1)
prevBottomBarIndex = valuewhen(isBottom, bar_index, 1)

// Tepe noktasında satış sinyali
isSellSignal = prevPeakBarIndex > prevBottomBarIndex and isPeak and rsiValue[2] < prevPeak and high[2] > prevPeakHighPrice and (volume[1]+volume[2]+volume[3]) < volumePeak
isBuyTakeProfit = isPeak and ((rsiValue[2] < prevPeak and high[2] > prevPeakHighPrice) or (rsiValue[2] < prevPeak and (volume[1]+volume[2]+volume[3]) < volumePeak))

// Dip noktasında alış sinyali
isBuySignal = prevBottomBarIndex > prevPeakBarIndex and isBottom and rsiValue[2] > prevBottom and low[2] < prevBottomLowPrice and (volume[1]+volume[2]+volume[3]) < volumeBottom
isSellTakeProfit = isBottom and ((rsiValue[2] > prevBottom and low[2] < prevBottomLowPrice) or (rsiValue[2] > prevBottom and (volume[1]+volume[2]+volume[3]) < volumeBottom))

sellTakeProfit = valuewhen(isSellTakeProfit, low, 1)
buyTakeProfit = valuewhen(isBuyTakeProfit, high, 1)

// isSellTakeProfit koşulu için işaretlemeyi yap
plotshape(isSellTakeProfit, style=shape.triangleup, location=location.abovebar, color=color.green, size=size.small, title="Sell Take Profit", offset=-2) 

// isBuyTakeProfit koşulu için işaretlemeyi yap
plotshape(isBuyTakeProfit, style=shape.triangledown, location=location.belowbar, color=color.red, size=size.small, title="Buy Take Profit", offset=-2)

buyComment = "Buy \n Rsi:" + tostring(round(rsiValue[2], 2)) + " \n Low:" + tostring(round(low[2],2)) + " \n Hacim:" + tostring(round(volume[1]+volume[2]+volume[3],2))
sellComment = "Sell \n Rsi:" + tostring(round(rsiValue[2], 2)) + " \n High:" + tostring(round(high[2],2)) + " \n Hacim:" + tostring(round(volume[1]+volume[2]+volume[3],2)) 

// Alış sinyali durumunda uzun pozisyon aç
if (isBuySignal)
    strategy.entry("Buy", strategy.long, comment = buyComment )
    strategy.exit("SL", "Buy", stop=close * 0.98)

// Satış sinyali durumunda kısa pozisyon aç
if (isSellSignal)
    strategy.entry("Sell", strategy.short, comment = sellComment )
    strategy.exit("SL","Sell", stop=close * 1.02)
// Limit değerini sonradan belirleme


// Alış sinyali durumunda uzun pozisyon kapat
if (isBuyTakeProfit)
    strategy.close("Buy", comment="TP")

// Satış sinyali durumunda kısa pozisyon kapat
if (isSellTakeProfit)
    strategy.close("Sell", comment="TP")
```

> Detail

https://www.fmz.com/strategy/445456

> Last Modified

2024-03-19 15:54:01
