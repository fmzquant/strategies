
> Name

牛市追踪系统Bull-Market-Tracking-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12418511300f749b8e4.png)

## Overview

The Bull Market Tracking System is a mechanical trading system based on trend tracking. It uses trend indicators on the 4-hour chart to filter trading signals, while entry decisions are made based on indicators from the 15-minute chart. The main indicators include RSI, Stochastics, and MACD. The advantage of this system is that the combination of multiple timeframes can effectively filter out false signals, while the shorter timeframe indicators can pinpoint more precise entry timing. However, there are also some risks with this system, such as overtrading and false breakout issues.  

## Principles  

The core logic of this system is to combine indicators from different timeframes to identify trend direction and entry timing. Specifically, the RSI, Stochastics, and EMA on the 4-hour chart need to align to determine the overall trend direction. This can effectively filter out most of the noise. At the same time, the RSI, Stochastics, MACD and EMA on the 15-minute chart also need to agree on either bullish or bearish bias to determine the precise entry timing. This allows us to find good entry and exit points. Only when the judgments on both the 4-hour and 15-minute timeframes meet the criteria will the system generate trading signals.

## Advantages

1. Multiple timeframe combinations can effectively filter out false signals and identify major trends  
2. 15-minute detailed indicators can capture relatively precise entry timing   
3. The combination of indicators including RSI, Stochastics, MACD and other mainstream technical indicators is easy to understand and optimize
4. Strict risk management methods are adopted such as take profit, stop loss, trailing stop loss etc. to effectively control the risk of individual trades

## Risks  

1. Overtrading risk. The system is quite sensitive to short-term timeframes, which may generate a lot of trading signals, leading to overtrading  
2. False breakout risk. Short-term indicator judgments may be wrong, resulting in false breakout signals
3. Indicator failure risk. Technical indicators themselves have certain limitations and may fail in extreme market conditions  

Accordingly, the system can be optimized from the following aspects:  

1. Adjust indicator parameters to make them more suitable for different market environments  
2. Increase filter conditions to reduce trading frequency and prevent overtrading
3. Optimize stop profit and stop loss strategies to better fit market fluctuation ranges  
4. Test different combinations of indicators to find the optimal solution  

## Summary   

Overall, the Bull Market Tracking System is a very practical trend following mechanical trading system. It uses a combination of multi-timeframe indicators to identify market trends and key entry timing. With reasonable parameter settings and continuous optimization testing, the system can adapt to most market environments and achieve steady profits. However, we also need to be aware of some of the potential risks, and take proactive measures to prevent and mitigate these risks.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|162|4h StochLength|
|v_input_2|48|4h StochK|
|v_input_3|48|4h StochD|
|v_input_4|10|15min StochLength|
|v_input_5|3|15min StochK|
|v_input_6|3|15min StochD|
|v_input_7|240|4H RSI Length|
|v_input_8|9|15M RSI Length|
|v_input_9|12|MACD Fast|
|v_input_10|26|MACD Slow|
|v_input_11|9|MACD Signal|
|v_input_12|1000|Take Profit|
|v_input_13|false|Stop Loss|
|v_input_14|400|Trailing Stop|
|v_input_15|false|Trailing Stop Offset|
|v_input_16|0500-1600|My Defined Hours|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Cowabunga System from babypips.com", overlay=true)
// 4 Hour Stochastics
length4 = input(162, minval=1, title="4h StochLength"), smoothK4 = input(48, minval=1, title="4h StochK"), smoothD4 = input(48, minval=1, title="4h StochD")
k4 = sma(stoch(close, high, low, length4), smoothK4)
d4 = sma(k4, smoothD4)

//15 min Stoch
length = input(10, minval=1, title="15min StochLength"), smoothK = input(3, minval=1, title="15min StochK"), smoothD = input(3, minval=1, title="15min StochD")
k = sma(stoch(close, high, low, length), smoothK)
d= sma(k, smoothD)

//4 hour RSI
src1 = close, len1 = input(240, minval=1, title="4H RSI Length")
up1 = rma(max(change(src1), 0), len1)
down1 = rma(-min(change(src1), 0), len1)
rsi4 = down1 == 0 ? 100 : up1 == 0 ? 0 : 100 - (100 / (1 + up1 / down1))

//15 min RSI
src = close, len = input(9, minval=1, title="15M RSI Length")
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi15 = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))

//MACD Settings
source = close
fastLength = input(12, minval=1, title="MACD Fast"), slowLength=input(26,minval=1, title="MACD Slow")
signalLength=input(9,minval=1, title="MACD Signal")
fastMA = ema(source, fastLength)
slowMA = ema(source, slowLength)
macd = fastMA - slowMA
signal = ema(macd, signalLength)

// Stops and Profit inputs
inpTakeProfit   = input(defval = 1000, title = "Take Profit", minval = 0)
inpStopLoss     = input(defval = 0, title = "Stop Loss", minval = 0)
inpTrailStop    = input(defval = 400, title = "Trailing Stop", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Offset", minval = 0)

// Stops and Profit Targets
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

//Specific Time to Trade
myspecifictradingtimes = input('0500-1600', title="My Defined Hours")

longCondition1 = time(timeframe.period, myspecifictradingtimes) != 0
longCondition2 = rsi4 <= 80
longCondition3 = k4 >= d4 and k4 <= 80
longCondition4 = ema(close, 80) >= ema(close, 162)
allLongerLongs = longCondition1 and longCondition2 and longCondition3 and longCondition4

longCondition5 = rsi15 <= 80
longCondition6 = k >= d and k <= 80 and fastMA >= slowMA
longCondition7 = ema(close, 5) >= ema(close, 10)
allLongLongs = longCondition5 and longCondition6 and longCondition7

if crossover(close, ema(close, 5)) and allLongerLongs and allLongLongs
    strategy.entry("Long", strategy.long, comment="LongEntry")

shortCondition1 = time(timeframe.period, myspecifictradingtimes) != 0
shortCondition2 = rsi4 >= 20
shortCondition3 = k4 <= d4 and k4 >= 20
shortCondition4 = ema(close, 80) <= ema(close, 162)
allShorterShorts = shortCondition1 and shortCondition2 and shortCondition3 and shortCondition4

shortCondition5 = rsi15 >= 20
shortCondition6 = k <= d and k >= 20 and fastMA <= slowMA
shortCondition7 = ema(close, 5) <= ema(close, 10)
allShortShorts = shortCondition5 and shortCondition6 and shortCondition7

if crossunder(close, ema(close,5)) and allShorterShorts and allShortShorts
    strategy.entry("Short", strategy.short, comment="ShortEntry")

strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
```

> Detail

https://www.fmz.com/strategy/440509

> Last Modified

2024-01-31 11:01:45
