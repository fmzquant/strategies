
> Name

最后N只烛的逆向逻辑策略Last-N-Candle-Reverse-Logic-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/53076fd0e063d42e24.png)
[trans]

## 概述
这个策略的主要思想是根据最后N只K线的颜色来决定做多或做空。如果最后N只K线都是绿色,就做多;如果最后N只K线都是红色,就做空。其独特之处在于加入了一个“逆向逻辑”的参数,可以对原有逻辑取反。当“逆向逻辑”参数为真时,最后N只绿色K线会做空,而最后N只红色K线会做多。

## 策略原理
这个策略主要依赖下面几个重要参数:
1. numCandlesToCheck: 用来指定需要检查的K线数量
2. numCandlesToExit: 指定持仓后需要退出头寸的K线数量 
3. inverseLogic: 逆向逻辑的参数,为真时对原有多空逻辑取反

关键逻辑是通过for循环遍历最近的numCandlesToCheck只K线,实时统计连续出现的绿色K线和红色K线的数量。如果连续红色K线≥numCandlesToCheck就标记lastNCandlesRed为真。如果连续绿色K线≥numCandlesToCheck就标记lastNCandlesGreen为真。

当lastNCandlesGreen为真时,如果inverseLogic参数为假,就做多;如果为真,就做空。相反,当lastNCandlesRed为真时,如果inverseLogic参数为假,就做空;如果为真,就做多。

无论做多做空,计数器barsSinceEntry在开仓后会重置为0。当barsSinceEntry大于等于numCandlesToExit时,会平掉当前持仓。

## 优势分析
这是一个利用K线颜色决策的有趣策略,加入了“逆向逻辑”参数,可以灵活调整做多做空的逻辑。主要优势有:

1. 思路新颖,可以对市场普遍逻辑形成反方向投资
2. 代码清晰简洁,容易理解和修改
3. 可以通过调整参数寻找最优参数组合
4. 无论行情如何,该策略都可以持续运行产生信号

## 风险分析
该策略也存在一些风险需要注意:

1. K线颜色并不能完全代表行情,跟踪错误信号的概率存在
2. 无法确定numCandlesToCheck这个参数的最优值
3. 无法确定numCandlesToExit这个参数的最优值
4. 逆向逻辑参数设置不当可能导致亏损加剧
5. 无法有效控制单笔止损的问题

针对上述风险,可以采取以下措施加以控制和优化:

1. 增加其他过滤器,避免错误信号,如加大级别的趋势判断
2. 遍历不同的参数取值,寻找最优参数组合 
3. 加入止损机制控制单笔亏损
4. 校验逆向逻辑参数的有效性

## 优化方向 
该策略主要可以从以下几个方向进行优化:

1. 增加盘口参数判定,避免被套
2. 优化参数numCandlesToCheck和numCandlesToExit的值
3. 结合大周期趋势指标过滤误信号
4. 加入止损和止盈策略
5. 回测不同品种验证策略有效性
6. 比较原逻辑和逆向逻辑的收益率

## 总结
该策略整体思路清晰易懂,利用简单的K线颜色判定形成交易信号。策略参数的调整可以形成丰富的组合变化,从而针对不同市场环境和品种进行优化调整。同时也需要注意一些潜在的风险,采用必要的措施来控制风险。通过不断丰富策略内容,该策略可以成为一个值得长期实战并不断优化提高的有价值策略。

|| 

## Overview
The main idea of this strategy is to determine long or short based on the color of the last N candles. If the last N candles are green, go long; if the last N candles are red, go short. The unique part is the addition of an "inverse logic" parameter that can reverse the original logic. When the "inverse logic" parameter is true, the last N green candles will go short, and the last N red candles will go long.

## Strategy Principle  
This strategy mainly relies on the following important parameters:

1. numCandlesToCheck: Used to specify the number of candles to check
2. numCandlesToExit: Specifies the number of candles after opening position that needs to exit 
3. inverseLogic: The inverse logic parameter. When true, the original long and short logic is reversed

The key logic is to traverse the last numCandlesToCheck candles through a for loop, and count the consecutive green and red candles in real time. If consecutive red candles ≥numCandlesToCheck, mark lastNCandlesRed as true. If consecutive green candles ≥numCandlesToCheck, mark lastNCandlesGreen as true.

When lastNCandlesGreen is true, go long if inverseLogic is false, otherwise go short. On the contrary, when lastNCandlesRed is true, go short if inverseLogic is false, otherwise go long.

No matter long or short, the barsSinceEntry counter will be reset to 0 after opening position. When barsSinceEntry is greater than or equal to numCandlesToExit, the current position will be closed.

## Advantage Analysis
This is an interesting strategy that uses candle color to make decisions, with an “inverse logic” parameter that can flexibly adjust the long and short logic. The main advantages are:

1. The idea is novel and can form reverse investment against market common logic  
2. The code is clear and concise, easy to understand and modify
3. Can find the optimal parameter combination by adjusting parameters  
4. No matter the market condition, this strategy can continue to run and generate signals

## Risk Analysis
There are also some risks to note for this strategy:

1. Candle color cannot fully represent market condition, risk of tracking incorrect signal exists
2. Unable to determine optimal value for numCandlesToCheck
3. Unable to determine optimal value for numCandlesToExit 
4. Improper inverse logic parameter may amplify losses
5. Unable to effectively control single stop loss

To address these risks, the following measures can be adopted for control and optimization:

1. Increase other filters to avoid incorrect signals, e.g. determine trend on higher timeframe
2. Traverse different parameter values to find optimal parameter combination  
3. Add stop loss mechanism to control single loss
4. Verify effectiveness of inverse logic parameter

## Optimization Directions
The main optimization directions for this strategy are:  

1. Increase orderbook condition to avoid being trapped
2. Optimize the values of numCandlesToCheck and numCandlesToExit
3. Add trend indicator on higher timeframe to filter false signal  
4. Add stop loss and take profit
5. Backtest on different products to verify effectiveness  
6. Compare return between original and inverted logic

## Conclusion
The overall idea of this strategy is clear and easy to understand, generating trading signals simply based on candle color determination. Adjusting parameters can form rich combination variations for optimization targeting different market environments and products. Also need to pay attention to some potential risks and take necessary measures to control them. By continuously enriching strategy content, this strategy can become a valuable one to keep optimizing for long term trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Number of Candles to Check|
|v_input_2|2|Number of Candles To Exit|
|v_input_3|10000|Investment Value|
|v_input_4|false|inverseLogic|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-25 00:00:00
end: 2023-12-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Last Number of  Candles", overlay=true)

// Define the condition for a green candle
isGreenCandle(candle) =>
    close[candle] > open[candle]

// Define the condition for a red candle
isRedCandle(candle) =>
    close[candle] < open[candle]

// Input to specify the number of candles to check
numCandlesToCheck = input(5, title="Number of Candles to Check")
numCandlesToExit = input(2, title="Number of Candles To Exit")  // Corrected the input title

// Initialize variables to count consecutive green and red candles
var int consecutiveGreenCandles = 0
var int consecutiveRedCandles = 0

// Initialize barsSinceEntry outside the loop
var int barsSinceEntry = 0

// Loop through the last "numCandlesToCheck" candles
for i = 0 to numCandlesToCheck - 1
    if isGreenCandle(i)
        consecutiveGreenCandles := consecutiveGreenCandles + 1
        consecutiveRedCandles := 0 // Reset the count for consecutive red candles
    else if isRedCandle(i)
        consecutiveRedCandles := consecutiveRedCandles + 1
        consecutiveGreenCandles := 0 // Reset the count for consecutive green candles

// Check if the last "numCandlesToCheck" candles are green or red
lastNCandlesGreen = consecutiveGreenCandles >= numCandlesToCheck
lastNCandlesRed = consecutiveRedCandles >= numCandlesToCheck

// Calculate the quantity based on the investment value and current asset price
investmentValue = input(10000, title="Investment Value")
var assetPrice = close
var quantity = investmentValue / assetPrice


inverseLogic = input(false, title="inverseLogic")

// Entry condition: Open a buy order if the last "numCandlesToCheck" candles are green
if lastNCandlesGreen
    if inverseLogic
        strategy.entry("Short", strategy.long, qty = quantity)
    else 
        strategy.entry("Buy", strategy.long, qty = quantity)// Reset barsSinceEntry when entering a trade
    barsSinceEntry := 0

// Entry condition: Open a short order if the last "numCandlesToCheck" candles are red
if lastNCandlesRed
    if inverseLogic
        strategy.entry("Buy", strategy.long, qty = quantity)

    else 
        strategy.entry("Short", strategy.short, qty = quantity)
    // Reset barsSinceEntry when entering a trade
    barsSinceEntry := 0

// Increment barsSinceEntry
barsSinceEntry := barsSinceEntry + 1

// Exit condition: Close the position after 2 bars
if barsSinceEntry >= numCandlesToExit
    strategy.close("Buy")
    strategy.close("Short")

```

> Detail

https://www.fmz.com/strategy/436604

> Last Modified

2023-12-26 11:00:29
