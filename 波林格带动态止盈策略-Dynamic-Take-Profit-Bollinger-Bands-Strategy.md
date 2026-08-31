
> Name

波林格带动态止盈策略-Dynamic-Take-Profit-Bollinger-Bands-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13e205166f875bf6bf6.png)


#### Overview
This strategy utilizes the Bollinger Bands indicator to go short when the price touches the upper band and go long when it touches the lower band. It sets a dynamic take profit level and closes the position when it reaches 1% profit. The core idea is that the price always fluctuates within the Bollinger Bands and has a mean-reverting characteristic, so we can take reverse positions when the price deviates too far from the moving average to capture the price difference.

#### Strategy Principles
1. Calculate the moving average and standard deviation: Use the Simple Moving Average (SMA) to calculate the moving average of the closing price (basis), and then calculate the standard deviation (dev) of the closing price relative to the moving average.
2. Calculate the upper and lower bands: The upper band is basis + dev \* multiplier, and the lower band is basis - dev \* multiplier, where multiplier is a multiple of the volatility amplitude.
3. Generate trading signals: When the closing price crosses above the lower band and the current close is less than the open, a long signal is generated; when the closing price crosses below the upper band and the current close is greater than the open, a short signal is generated.
4. Dynamic take profit: After opening a position, calculate the take profit price based on the entry price and the take profit percentage. Close the position when the price reaches the take profit level.
5. Visualization: Plot the Bollinger Bands, moving average, and trading signals on the chart.

#### Strategy Advantages
1. Simple and effective: The strategy logic is clear and uses only one technical indicator, making it easy to understand and implement.
2. Wide applicability: Bollinger Bands have universal applicability and can be used for various trading instruments and markets.
3. Dynamic take profit: Compared to fixed take profit, dynamic take profit can maximize the profit of winning trades while controlling risk.
4. Effectively capture trends: In trending markets, after the price touches the upper or lower band, it usually continues to move in the original direction for some time. This strategy can effectively seize such trend opportunities.

#### Strategy Risks
1. Poor performance in ranging markets: When the market is in wide fluctuations and prices repeatedly break through the Bollinger Bands, the strategy may generate frequent trading signals, resulting in excessive trading and increased transaction costs.
2. Deep retracements in trending markets: If a trend lasts for a long time and prices deviate from the moving average for an extended period, the strategy goes against the trend, potentially leading to deep retracements.
3. Difficulty in parameter selection: The parameters of the Bollinger Bands (such as length and multiplier) have a significant impact on the strategy performance, but there are no universally optimal parameters.

#### Strategy Optimization Directions
1. Incorporate trend analysis: Add trend identification indicators (such as moving averages) to the strategy. In trending markets, trading can be suspended or follow the trend.
2. Optimize take profit and stop loss: Dynamically adjust the take profit and stop loss based on volatility indicators such as ATR to achieve a better risk-reward ratio.
3. Multi-factor combination: Consider combining Bollinger Bands with other technical indicators (such as RSI, MACD, etc.) to improve signal accuracy and reduce false signals.
4. Fundamental filtering: After generating trading signals, use fundamental data (such as financial reports, industry data, etc.) for secondary confirmation to enhance the robustness of the strategy.

#### Summary
This strategy constructs a simple and effective trading system using Bollinger Bands, taking the price touching the upper and lower bands as signals, and adopting dynamic take profit to control risk. The strategy performs well in trending markets but may face frequent trading issues in ranging markets. Further improvements can be made in terms of trend analysis, take profit and stop loss optimization, factor combination, and fundamental filtering to achieve more robust returns.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-01 00:00:00
end: 2024-04-30 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Future Price Prediction", overlay=true)

// Ayarlar
length = input.int(14, "Length")
mult = input.float(2.0, "Multiplier")
showBands = input.bool(true, "Show Bands")
takeProfitPercentage = 1.0

// Ortalama ve Standart Sapma Hesaplamaları
basis = ta.sma(close, length)
dev = mult * ta.stdev(close, length)

// Üst ve Alt Bantlar
upper = basis + dev
lower = basis - dev

// Grafikte Gösterim
plot(basis, color=color.blue, linewidth=2, title="Basis")
plot(showBands ? upper : na, color=color.red, linewidth=1, title="Upper Band")
plot(showBands ? lower : na, color=color.green, linewidth=1, title="Lower Band")

// Al-Sat Sinyalleri
longCondition = ta.crossover(close[1], lower[1]) and close[1] < open[1]
shortCondition = ta.crossunder(close[1], upper[1]) and close[1] > open[1]

// Kar al seviyeleri
float longTakeProfit = na
float shortTakeProfit = na

if longCondition
    longTakeProfit := close * (1 + takeProfitPercentage / 100)
if shortCondition
    shortTakeProfit := close * (1 - takeProfitPercentage / 100)

// Strateji Giriş ve Çıkış
if longCondition
    strategy.entry("Buy", strategy.long)
    strategy.exit("Take Profit", from_entry="Buy", limit=longTakeProfit)

if shortCondition
    strategy.entry("Sell", strategy.short)
    strategy.exit("Take Profit", from_entry="Sell", limit=shortTakeProfit)

// Al-Sat Sinyalleri Grafikte Gösterim
plotshape(series=longCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=shortCondition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Bilgi Tablosu
var table data = table.new(position.bottom_right, 2, 2, frame_color=color.black, frame_width=1)
if barstate.islast
    table.cell(data, 0, 0, "Current Price", text_color=color.white)
    table.cell(data, 1, 0, str.tostring(close))
    table.cell(data, 0, 1, "Predicted Basis", text_color=color.white)
    table.cell(data, 1, 1, str.tostring(basis))

```

> Detail

https://www.fmz.com/strategy/452360

> Last Modified

2024-05-24 17:54:47
