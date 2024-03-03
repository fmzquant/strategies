
> Name

双均线跟踪趋势策略Dual-Moving-Average-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b27c4a240fc5dedb0e.png)

[trans]

## 概述

双均线跟踪趋势策略是一个利用快速移动平均线和慢速移动平均线组合来判断市场趋势,并在趋势方向发生转折时发出交易信号的策略。该策略同时结合了均线指标和价格通道指标来识别趋势,可以有效过滤市场噪音,判断趋势方向。

## 策略原理

双均线跟踪趋势策略使用两个移动平均线指标——快速移动平均线(5周期)和慢速移动平均线(21周期)。快速均线用于生成交易信号,慢速均线用于判断市场趋势方向。当快速均线从下向上穿过慢速均线时,产生买入信号;当快速均线从上向下穿过慢速均线时,产生卖出信号。

该策略还同时使用价格通道指标辅助判断趋势。价格通道由最高价和最低价的移动平均线确定。当价格突破通道时,表示趋势发生反转。该策略使用两个价格通道,第一个价格通道周期为21,第二个价格通道周期为5,与均线周期相匹配。

在判断买入和卖出信号时,该策略要求红柱连续出现(用户可设置柱子数量),作为额外的过滤条件。这可以避免在盘整区域发出错误信号。

总的来说,双均线跟踪趋势策略判断趋势的逻辑是:

1. 使用价格通道判断大级别趋势方向 
2. 使用快速均线判断短期趋势并发出交易信号
3. 结合额外的柱形过滤,避免在盘整中产生错误信号

通过多级别的趋势判断,可以有效过滤噪音,确定趋势方向。

## 优势分析

双均线跟踪趋势策略有以下优势:

1. 利用双均线系统,可以有效识别趋势,判断主要趋势方向
2. 快速均线发出交易信号,可以及时捕捉趋势反转
3. 价格通道判断大级别趋势,避免被短期市场噪音误导 
4. 红/绿柱过滤条件,可以减少在盘整区域发出错误信号的概率
5. 策略参数可调整,可以针对不同市场调整参数,提高策略稳定性
6. 可添加止损策略,可以有效控制每次交易的风险

综上,该策略整体稳定性较好,在大幅趋势市中表现较为出色。

## 风险分析

双均线跟踪趋势策略也存在一些风险,主要有:

1. 当市场长期盘整时,容易产生错误信号,从而可能带来连续小额损失
2. 策略参数设置不当时,交易信号可能滞后,错过最佳入场时机
3. 缺乏有效的止损策略时,单笔交易风险难以控制

对应地,可以通过以下方法降低策略风险:

1. 调整红/绿柱过滤条件,在盘整市场中降低交易频率
2. 优化快速均线参数,确保交易信号及时
3. 添加移动止损或百分比止损策略,严格控制单笔损失

## 优化方向  

双均线跟踪趋势策略还有进一步优化的空间,主要方向有:

1. 结合波动率指标,如ATR,自动调整止损幅度
2. 利用机器学习方法自动优化策略参数
3. 增加 neuronal network判断趋势方向的模块
4. 综合多种指标和过滤条件,构建策略组合

这些优化方向可以进一步提高策略的稳定性、适应性和智能化水平。

## 总结  

双均线跟踪趋势策略整体来说是一个较为稳健的趋势跟踪策略。它同时结合均线指标和价格通道判断趋势方向和强度,并以快速均线发出交易信号。额外增加的柱形过滤条件也可以进一步避免错误信号。该策略参数可调整,可以很好适应不同市场环境。同时也留有较大的优化空间,有潜力打造成一个可靠、智能的自动交易策略。

||

## Overview

The Dual Moving Average Trend Tracking strategy is a strategy that uses a combination of fast and slow moving averages to determine market trend, and generates trading signals when the trend direction changes. It combines moving average indicators and price channel indicators to identify the trend, which can effectively filter out market noise and determine the trend direction.

## Strategy Logic  

The Dual Moving Average Trend Tracking strategy uses two moving averages - a fast moving average (5 periods) and a slow moving average (21 periods). The fast MA is used to generate trading signals while the slow MA is used to determine the market trend direction. When the fast MA crosses above the slow MA, a buy signal is generated. When the fast MA crosses below the slow MA, a sell signal is generated.  

The strategy also uses a price channel indicator to assist in determining the trend. The price channel is determined by the moving averages of highest and lowest prices. When prices break through the channel, it indicates a trend reversal. This strategy uses two price channels with periods of 21 and 5 respectively, matching the MA periods.  

When determining buy and sell signals, the strategy requires consecutive red/green candles to appear (user adjustable) as an additional filter condition. This helps avoid wrong signals during market consolidations.  

In summary, the logic for determining trend in this strategy is:  

1. Use price channel to determine the higher timeframe trend direction  
2. Use fast MA to determine short-term trend and generate trading signals 
3. Combine additional candle filter to avoid wrong signals during consolidations

By judging trend across timeframes, market noise can be effectively filtered and trend direction confirmed.  

## Advantage Analysis 

The Dual Moving Average Trend Tracking Strategy has the following advantages:  

1. The dual MA system can effectively identify trends and determine the major trend direction  
2. The fast MA generates trading signals to timely capture trend reversals
3. The price channel determines higher timeframe trend to avoid being misled by short-term market noise
4. The red/green candle filters lower the probability of wrong signals during consolidations 
5. Adjustable parameters allow optimization for different markets to improve robustness
6. Stop loss strategies can be added to effectively control risk per trade  

In conclusion, this strategy has relatively good overall stability and performs well in strong trending markets.  

## Risk Analysis   

The Dual Moving Average Trend Tracking Strategy also has some risks, mainly:  

1. During prolonged consolidations, it is prone to generating wrong signals and consecutive small losses  
2. Improper parameter settings may lag trading signals and miss best entry opportunities  
3. Without effective stop loss, per trade risk is difficult to control  

Corresponding measures to reduce risks include:  

1. Adjust red/green candle filter settings to lower trade frequency in consolidating markets
2. Optimize fast MA parameters to ensure timely trading signal generation 
3. Add moving or percentage stop loss to strictly control per trade loss

## Optimization Directions   

There is room for further optimization of the strategy, mainly in directions like:  

1. Incorporate volatility indicators like ATR to auto adjust stop loss  
2. Utilize machine learning to auto optimize parameters  
3. Add neural network modules to determine trend direction
4. Build ensemble systems combining multiple indicators and filters  

These optimization directions can further improve the stability, adaptiveness and intelligence level of the strategy.  

## Conclusion   

In conclusion, the Dual Moving Average Trend Tracking strategy is a relatively robust trend following strategy. It combines moving averages and price channels to determine trend direction and strength, generating trading signals with the fast MA. The additional candle filters also help avoid wrong signals. The adjustable parameters allow adaptation to different market environments. There is also ample room for further optimizations to build a reliable, intelligent automated trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|false|stops|
|v_input_4|5|Stop, %|
|v_input_5|false|Use OHLC4|
|v_input_6|true|Use fast MA Filter|
|v_input_7|5|fast MA Period|
|v_input_8|21|slow MA Period|
|v_input_9|2|Bars Q|
|v_input_10|false|Need trend Background?|
|v_input_11|false|Need entry arrows?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-24 00:00:00
end: 2024-01-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title = "Noro's Trend MAs Strategy v1.8", shorttitle = "Trend MAs str 1.8", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, "long")
needshort = input(true, "short")
needstops = input(false, "stops")
stoppercent = input(5, defval = 5, minval = 1, maxval = 50, title = "Stop, %")
useohlc4 = input(false, defval = false, title = "Use OHLC4")
usefastsma = input(true, "Use fast MA Filter")
fastlen = input(5, defval = 5, minval = 1, maxval = 50, title = "fast MA Period")
slowlen = input(21, defval = 20, minval = 2, maxval = 200, title = "slow MA Period")
bars = input(2, defval = 2, minval = 0, maxval = 3, title = "Bars Q")
needbg = input(false, defval = false, title = "Need trend Background?")
needarr = input(false, defval = false, title = "Need entry arrows?")

src = useohlc4 == true ? ohlc4 : close
fastsma = ema(src, 5)

//PriceChannel 1
lasthigh = highest(src, slowlen)
lastlow = lowest(src, slowlen)
center = (lasthigh + lastlow) / 2

//PriceChannel 2
lasthigh2 = highest(src, fastlen)
lastlow2 = lowest(src, fastlen)
center2 = (lasthigh2 + lastlow2) / 2

//Trend
//ma = type == 1 ? sma(src, len) : type == 2 ? ema(src, len) : type == 3 ? vwma(src, len) : type == 4 ? dema : type == 5 ? tema : type == 6 ? kama : type == 7 ? center : 0
//trend = low > ma and low[1] > ma[1] and low[2] > ma[2] ? 1 : high < ma and high[1] < ma[1] ? -1 : trend[1]

trend1 = low > center and low[1] > center[1] ? 1 : high < center and high[1] < center[1] ? -1 : trend1[1]
trend2 = low > center2 and low[1] > center2[1] ? 1 : high < center2 and high[1] < center2[1] ? -1 : trend1[1]
trend = trend1 == 1 and trend2 == 1 ? 1 : trend2 == -1 and trend2 == -1 ? -1 : trend[1]

//Bars
bar = close > open ? 1 : close < open ? -1 : 0
redbars = bars == 0 ? 1 : bars == 1 and bar == -1 ? 1 : bars == 2 and bar == -1 and bar[1] == -1 ? 1 : bars == 3 and bar == -1 and bar[1] == -1 and bar[2] == -1 ? 1 : 0
greenbars = bars == 0 ? 1 : bars == 1 and bar == 1 ? 1 : bars == 2 and bar == 1 and bar[1] == 1 ? 1 : bars == 3 and bar == 1 and bar[1] == 1 and bar[2] == 1 ? 1 : 0

//Signals
up = trend == 1 and (low < center2 or usefastsma == false) and (redbars == 1) ? 1 : 0
dn = trend == -1 and (high > center2 or usefastsma == false) and (greenbars == 1) ? 1 : 0

//Lines
colorfastsma = usefastsma == true ? red : na
plot(fastsma, color = colorfastsma, title = "Fast MA")
plot(center, color = blue, linewidth = 3, transp = 0, title = "Slow MA")
plot(center2, color = red, linewidth = 3, transp = 0, title = "PriceChannel 2")

//Arrows
plotarrow(up == 1 and needarr == true ? 1 : 0, colorup = black, colordown = black, transp = 0)
plotarrow(dn == 1 and needarr == true ? -1 : 0, colorup = black, colordown = black, transp = 0)

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 90)

//Alerts
alertcondition(up == 1, title='buy', message='Uptrend')
alertcondition(dn == 1, title='sell', message='Downtrend')

//Trading
stoplong = up == 1 and needstops == true ? close - (close / 100 * stoppercent) : stoplong[1]
stopshort = dn == 1 and needstops == true ? close + (close / 100 * stoppercent) : stopshort[1]

longCondition = up == 1
if (longCondition)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)
    strategy.exit("Stop Long", "Long", stop = stoplong)

shortCondition = dn == 1
if (shortCondition)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
    strategy.exit("Stop Short", "Short", stop = stopshort)
```

> Detail

https://www.fmz.com/strategy/439837

> Last Modified

2024-01-24 11:28:57
