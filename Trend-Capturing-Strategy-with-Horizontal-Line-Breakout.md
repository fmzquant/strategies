
> Name

Trend-Capturing-Strategy-with-Horizontal-Line-Breakout

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15d57b211c4cef934de.png)


#### Overview
This strategy uses horizontal lines as support and resistance levels, and generates trading signals when the price breaks through these lines. The main idea is: first, draw horizontal lines based on certain conditions, go long when the price breaks above the line, and close positions when the price breaks below the line. At the same time, there are corresponding conditions for generating horizontal lines, such as the low price of the previous candle being greater than the current closing price.

#### Strategy Principle
1. Based on the condition that the low price of the previous candle is greater than the current closing price, draw a horizontal line with a length of 20 at the low price of the previous candle, and always keep only the latest 10 lines.
2. If the current price breaks above the latest horizontal line, close all previous long positions and open new long positions.
3. When drawing a new horizontal line, if there is a position, close it first and then open a new long position.

#### Strategy Advantages
1. The strategy logic is simple and clear, easy to understand and implement.
2. By using the breakthrough of horizontal line support and resistance levels to generate signals, it can capture trends well.
3. When a new horizontal line is generated, it will first close the previous positions and then open new ones, which can reduce the risk that the previous positions may bring.
4. The strategy can be optimized by adjusting the length and number of horizontal lines.

#### Strategy Risks
1. For oscillating markets, frequent horizontal line breakthroughs may lead to overtrading, resulting in large slippage and transaction fees.
2. The strategy's definition of horizontal lines is relatively simple and lacks verification from other indicators, which may generate some false signals.
3. It only goes long and does not go short, and cannot fully utilize downward trends.

#### Strategy Optimization Directions
1. Other indicators can be combined to confirm the validity of horizontal lines, such as changes in trading volume, to reduce false signals.
2. For oscillating markets, the frequency of trading can be reduced by increasing the magnitude of horizontal line breakthroughs.
3. Add a short-selling mechanism to profit from downward trends.
4. Consider dynamically adjusting the length and number of horizontal lines to adapt to different market conditions.

#### Summary
This strategy uses horizontal lines as important support and resistance levels, and generates trading signals through line breakthroughs. The advantage is that the logic is simple and easy to implement, and it can capture trends well. However, the disadvantage is that it may overtrade, generate false signals, and can only go long but not short. In the future, it can be optimized and improved by combining other indicators, reducing trading frequency, adding short-selling mechanisms, and dynamically adjusting parameters.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|(?Yatay Çizgi Ayarları)Çizgi uzunluğu?|
|v_input_int_2|10|Son Kaç Çizgi?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-04-20 00:00:00
end: 2024-04-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Traderxprox

//@version=5
strategy("Alarm Trader_ALL", overlay=true)

// Yatay çizgi oluşum
yatayc = low[1] > close[0]

if yatayc
    if strategy.opentrades > 0
        strategy.close("AL", comment = "Fiyat:" + str.tostring(low[1], "#.##") + "\n" + timeframe.period +"\n Yatay Direnç Oluştu")
    else
        strategy.entry("AL", strategy.long, comment = "Fiyat:" + str.tostring(low[1], "#.##") + "\n" + timeframe.period +"\n Yatay Direnç Oluştu")


//YATAY ÇİZGİ
int cizgilen = input.int(20, "Çizgi uzunluğu?", group = "Yatay Çizgi Ayarları")
var array<line> lines = array.new<line>()
int numberOfLines = input.int(10, "Son Kaç Çizgi?", 0, group = "Yatay Çizgi Ayarları")
kural22 = low[1] > close[0]
// if kural22
//     newLine = line.new(bar_index-2, low[1], bar_index+cizgilen, low[1] ,color=color.red, width=1, style=line.style_solid)
//     // Push the `newLine` into the `lines` array.
//     lines.push(newLine)
//     // Delete the oldest line when the size of the array exceeds the specified `numberOfLines`.
//     if array.size(lines) > numberOfLines
//         line.delete(lines.shift())
    
// Alarm kırılım için koşul

var float lastLinePrice = na
if not na(close) and array.size(lines) > 0 
    lastLinePrice := line.get_price(array.get(lines, array.size(lines) - 1), bar_index)
if open < lastLinePrice and close > lastLinePrice
    if strategy.opentrades > 0
        strategy.close("AL", comment = "Fiyat:" + str.tostring(lastLinePrice, "#.##") + "\n" + timeframe.period +" \n Yatay çizgi yukarı kırılımı")
    else
        strategy.entry("AL", strategy.long, comment = "Fiyat:" + str.tostring(lastLinePrice, "#.##") + "\n" + timeframe.period +" \n Yatay çizgi yukarı kırılımı")


```

> Detail

https://www.fmz.com/strategy/449518

> Last Modified

2024-04-26 15:22:06
