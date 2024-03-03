
> Name

动量TD反转交易策略Momentum-TD-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ac8b7c5b13657f2bf9.png)
 [trans]

## 概述

动量TD反转交易策略是一个利用TD Sequential指标识别价格反转信号的量化交易策略。该策略基于价格动量分析,在确认到价格反转信号后建立做多或做空仓位。

## 策略原理

该策略使用TD Sequential指标分析价格波动并识别连续9根K线的价格反转形态。具体来说,当识别到连续9根K线价格上涨后出现下跌K线时,策略判断为做空机会;反之,当识别到连续9根K线价格下跌后出现上涨K线时,策略判断为做多机会。

利用TD Sequential指标的优势,可以提前捕捉到价格反转信号。结合该策略中的一定数量的追涨杀跌机制,可以在反转信号确认后,及时建立做多或做空仓位,从而在价格反转开始阶段获得较好的入场机会。

## 优势分析

- 利用TD Sequential指标可以提前判断价格反转机会
- 建立追涨杀跌机制,可以更及时判定价格反转确认
- 通过反转形成阶段建仓,获得较优入场点位

## 风险分析

- TD Sequential指标可能出现假突破,需要结合其他因素确认
- 需要适当控制仓位规模和仓位时间,降低风险

## 优化方向

- 结合其他指标确定反转信号,避免假突破风险
- 建立止损机制控制单笔损失
- 优化仓位规模和持仓时间,平衡盈利规模和风险控制

## 总结

动量TD反转交易策略通过TD Sequential指标提前判断价格反转,并在反转确认后快速建立仓位,是一个非常适合动量交易者使用的策略。该策略具有识别反转机会的优势,但需要注意控制风险,避免因假突破造成较大损失。通过进一步优化,这是一个风险收益比较均衡的交易策略。

||

## Overview

The Momentum TD Reversal Trading Strategy is a quantitative trading strategy that utilizes the TD Sequential indicator to identify price reversal signals. This strategy is based on momentum analysis and takes long or short positions after confirming the price reversal signals.

## Strategy Logic  

This strategy uses the TD Sequential indicator to analyze price fluctuations and identify the price reversal pattern after 9 consecutive candlesticks. Specifically, when it detects a downturn candlestick after 9 consecutive rising candlesticks, the strategy determines it as a short opportunity. On the contrary, when it identifies an upturn candlestick after 9 consecutive falling candlesticks, the strategy regards it as a long opportunity.

By leveraging the advantage of the TD Sequential indicator, the strategy can capture price reversal signals ahead of the market. Together with the chase-rise-kill-drop mechanism in this strategy, it can timely establish long or short positions after confirming the reversal signals, so as to obtain relatively better entry opportunities at the beginning stage of price reversals.   

## Pros Analysis  

- Use the TD Sequential indicator to identify price reversal opportunities in advance
- Establish the chase-rise-kill-drop mechanism to determine the confirmation of price reversals more timely  
- Enter positions at the forming stage of reversals to obtain relatively better entry points

## Risks Analysis

- TD Sequential indicator may have false breakouts. Other factors are needed to confirm the signals
- Appropriately control the position sizing and holding period to mitigate risks

## Optimization Directions  

- Incorporate other indicators to validate reversal signals to avoid false breakout risks
- Establish stop loss mechanism to control single trade loss  
- Optimize position sizing and holding period to balance profit scale and risk management  

## Conclusion  

The Momentum TD Reversal Trading Strategy utilizes the TD Sequential indicator to judge price reversals beforehand and establishes positions swiftly after confirmations, making it very suitable for momentum traders. This strategy has the advantage of identifying reversal opportunities, but still calls for proper risk control to avoid huge losses caused by false breakouts. With further optimizations, it can become a balanced strategy regarding risk-reward ratio.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|9|Count of consecutive bars|
|v_input_3|false|useLinearRegression|
|v_input_4|13|Linear Regression length|
|v_input_5|true|Shows Supports and Resistance lines|
|v_input_6|true|Color bars when there is a signal|
|v_input_7|false|Transparency of triangle Up or Downs|
|v_input_8|true|Plot triangle Up or Downs at signal|
|v_input_9|false|Take Profit Points|
|v_input_10|false|Stop Loss Points|
|v_input_11|100|Trailing Stop Loss Points|
|v_input_12|false|Trailing Stop Loss Offset Points|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-10 00:00:00
end: 2023-12-17 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//This strategy is based on TD sequential study from glaz. 
//I made some improvement and modification to comply with pine script version 4.
//Basically, it is a strategy based on proce action, supports and resistance.

strategy("Sequential Up/Down", overlay=true )
source = input(close)
BarsCount = input(9, "Count of consecutive bars")
useLinearRegression = input(false)
LR_length = input(13,"Linear Regression length")
SR = input(true,"Shows Supports and Resistance lines")
Barcolor = input(true,"Color bars when there is a signal")
transp = input(0, "Transparency of triangle Up or Downs")
Numbers = input(true,"Plot triangle Up or Downs at signal")

//Calculation
src=useLinearRegression?linreg(source,LR_length,0):source
UP = 0
DW = 0
UP := src > src[4] ? nz(UP[1]) + 1 : 0
DW := src < src[4] ? nz(DW[1]) + 1 : 0

UPUp = UP - valuewhen(UP < UP[1], UP, 1)
DWDn = DW - valuewhen(DW < DW[1], DW, 1)

plotshape(Numbers ? UPUp == BarsCount ? true : na : na, style=shape.triangledown, text="", color=color.green, location=location.abovebar, transp=transp)
plotshape(Numbers ? DWDn == BarsCount ? true : na : na, style=shape.triangleup, text="", color=color.red, location=location.belowbar, transp=transp)


// S/R Code By johan.gradin
//------------//
// Sell Setup //
//------------//
priceflip = barssince(src < src[4])
sellsetup = src > src[4] and priceflip
sell = sellsetup and barssince(priceflip != BarsCount)
sellovershoot = sellsetup and barssince(priceflip != BarsCount+4)
sellovershoot1 = sellsetup and barssince(priceflip != BarsCount+5)
sellovershoot2 = sellsetup and barssince(priceflip != BarsCount+6)
sellovershoot3 = sellsetup and barssince(priceflip != BarsCount+7)

//----------//
// Buy setup//
//----------//
priceflip1 = barssince(src > src[4])
buysetup = src < src[4] and priceflip1
buy = buysetup and barssince(priceflip1 != BarsCount)
buyovershoot = barssince(priceflip1 != BarsCount+4) and buysetup
buyovershoot1 = barssince(priceflip1 != BarsCount+5) and buysetup
buyovershoot2 = barssince(priceflip1 != BarsCount+6) and buysetup
buyovershoot3 = barssince(priceflip1 != BarsCount+7) and buysetup

//----------//
// TD lines //
//----------//
TDbuyh = valuewhen(buy, high, 0)
TDbuyl = valuewhen(buy, low, 0)
TDsellh = valuewhen(sell, high, 0)
TDselll = valuewhen(sell, low, 0)

//----------//
//   Plots  //
//----------//

plot(SR ? TDbuyh ? TDbuyl : na : na, style=plot.style_circles, linewidth=1, color=color.red)
plot(SR ? TDselll ? TDsellh : na : na, style=plot.style_circles, linewidth=1, color=color.lime)
barcolor(Barcolor ? sell ? #FF0000 : buy ? #00FF00 : sellovershoot ? #FF66A3 : sellovershoot1 ? #FF3385 : sellovershoot2 ? #FF0066 : sellovershoot3 ? #CC0052 : buyovershoot ? #D6FF5C : buyovershoot1 ? #D1FF47 : buyovershoot2 ? #B8E62E : buyovershoot3 ? #8FB224 : na : na)

//  Strategy: (Thanks to JayRogers)
// === STRATEGY RELATED INPUTS ===
//tradeInvert     = input(defval = false, title = "Invert Trade Direction?")
// the risk management inputs
inpTakeProfit   = input(defval = 0, title = "Take Profit Points", minval = 0)
inpStopLoss     = input(defval = 0, title = "Stop Loss Points", minval = 0)
inpTrailStop    = input(defval = 100, title = "Trailing Stop Loss Points", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset Points", minval = 0)

// === RISK MANAGEMENT VALUE PREP ===
// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

// === STRATEGY - LONG POSITION EXECUTION ===
enterLong() => buy or buyovershoot or buyovershoot1 or buyovershoot2 or buyovershoot3// functions can be used to wrap up and work out complex conditions
//exitLong() => oscillator <= 0
strategy.entry(id = "Buy", long = true, when = enterLong() )// use function or simple condition to decide when to get in
//strategy.close(id = "Buy", when = exitLong() )// ...and when to get out

// === STRATEGY - SHORT POSITION EXECUTION ===
enterShort() => sell or sellovershoot or sellovershoot2 or sellovershoot3
//exitShort() => oscillator >= 0
strategy.entry(id = "Sell", long = false, when = enterShort())
//strategy.close(id = "Sell", when = exitShort() )

// === STRATEGY RISK MANAGEMENT EXECUTION ===
// finally, make use of all the earlier values we got prepped
strategy.exit("Exit Buy", from_entry = "Buy", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Exit Sell", from_entry = "Sell", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)


```

> Detail

https://www.fmz.com/strategy/435772

> Last Modified

2023-12-18 17:40:10
