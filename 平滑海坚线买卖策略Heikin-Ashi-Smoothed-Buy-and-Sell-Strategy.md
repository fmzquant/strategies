
> Name

平滑海坚线买卖策略Heikin-Ashi-Smoothed-Buy-and-Sell-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略基于单一指标——平滑海坚线,实现简单的趋势跟踪买卖操作。策略利用平滑海坚线指标识别趋势方向,结合历史K线形态判断入场时机,以获利退出。

## 策略原理

该策略通过计算移动平均线,构建平滑海坚线。具体来说,是计算开盘价、最高价、最低价、收盘价的移动平均线,然后计算平滑海坚线的开盘价、最高价、最低价、收盘价。

判断买入条件:当前K线收盘价大于前一K线收盘价,前一K线收盘价大于前两K线收盘价,近三K线都是阳线。

判断卖出条件:当前K线收盘价小于前一K线收盘价,前一K线收盘价小于前两K线收盘价,近三K线都是阴线。

买入和卖出条件都要满足最近一次信号为0或相反信号,避免连续重复交易。

## 优势分析

- 使用单一指标,策略逻辑简单清晰
- 利用海坚线指标的趋势跟踪能力
- 结合K线形态,可避免错失趋势或反向操作
- 通过过滤重复信号,可减少不必要交易

## 风险分析

- 海坚线具有滞后性,可能错过趋势转折点
- 仅考虑近三K线形态,缺乏长期趋势判断
- 未设置止损,可能导致亏损扩大
- 未考虑大盘环境,容易受到系统性风险影响

可通过结合其它指标判断长期趋势,优化止损策略,注意大盘环境等进行改进。

## 优化方向  

- 增加其它指标判断,确定长期趋势方向
- 优化止损策略,设定移动止损或百分比止损
- 考虑大盘指数,避免在震荡市中交易
- 优化参数设定,调整移动平均线周期等参数
- 增加量能指标,确保有成交量支持

## 总结

本策略利用海坚线指标的趋势跟踪功能,配合K线形态判断入场时机,通过过滤重复信号控制交易频率。策略逻辑简单清晰,容易实现。但可通过多指标组合、优化止损、关注大盘等进行改进,使策略更稳健可靠。

||


## Overview

This strategy is based on a single indicator - Smoothed Heikin-Ashi, to implement simple trend following buy and sell operations. It identifies trend direction via Smoothed Heikin-Ashi indicator and determines entry timing combined with historical candlestick patterns, in order to take profit exit.

## Strategy Logic  

The strategy calculates moving average of open, high, low and close prices to construct Smoothed Heikin-Ashi. 

Buy condition: Current bar's close > previous bar's close, previous bar's close > 2 bars ago's close, latest 3 bars are bullish.

Sell condition: Current bar's close < previous bar's close, previous bar's close < 2 bars ago's close, latest 3 bars are bearish.

Both buy and sell conditions require the latest signal to be 0 or opposite signal, to avoid consecutive same direction trading.

## Advantage Analysis

- Simple logic with single indicator
- Utilize Heikin-Ashi's trend following ability 
- Avoid missing trends or trading reversely via candlestick patterns
- Reduce unnecessary trades by filtering duplicate signals

## Risk Analysis

- Heikin-Ashi has lagging effect, may miss trend turning points
- Only consider latest 3 bars, lack of long term trend judgment
- No stop loss set, risks enlarging losses
- Ignore overall market conditions, vulnerable to systematic risks

Improvements can be made by combining other indicators for long term trend, optimizing stop loss strategy, paying attention to overall market etc.

## Optimization Directions

- Add other indicators to determine long term trend
- Optimize stop loss such as trailing stop or percentage based stop loss
- Consider overall market index to avoid trading in range bound market
- Optimize parameters like moving average period
- Add volume indicators for ensuring trading volume support

## Summary 

This strategy utilizes Heikin-Ashi's trend following ability and combines candlestick patterns to determine entry timing, while controlling trade frequency via filtering duplicate signals. The logic is simple and easy to implement. But it can be enhanced to be more robust by using multiple indicators combo, optimizing stop loss, considering overall market conditions etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|65|Moving Average Period?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-30 00:00:00
end: 2023-10-06 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Masoud Abdoli
//Heikin Ashi Smoothed Buy & Sell Strategy Rev.4
//Date: 01-Oct-2021
//@version=4

strategy(title="Abdoli's Heikin Ashi Smoothed Buy & Sell Strategy Rev.4", shorttitle="Heikin-Ashi Smoothed Rev.4", overlay=true,
 initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

MaPeriod = input (title="Moving Average Period?", type=input.integer, defval=65, minval=5, maxval=100, step=5)

maOpen  = ema(open , MaPeriod)
maHigh  = ema(high , MaPeriod)
maLow   = ema(low  , MaPeriod)
maClose = ema(close, MaPeriod)

haClose = (maOpen+maHigh+maLow+maClose)/4
haOpen = 0.0
haOpen:= na(haOpen[1]) ? (maOpen[1]+maClose[1])/2 : (haOpen[1]+haClose[1])/2
haHigh = max(maHigh, max(haClose, haOpen))
haLow  = min(maLow , max(haClose, haOpen))

plotcandle(haOpen, haHigh, haLow, haClose, title="heikin-Ashi smoothed", color=haOpen>haClose ? color.orange : color.blue)

B0 = haClose    - haOpen
B1 = haClose[1] - haOpen[1]
B2 = haClose[2] - haOpen[2]
BuyCondition = B0 > 0.0 and B1 > 0.0 and B2 > 0.0 and haClose > haClose[1] and haClose[1] > haClose[2]
SellCondition= B0 < 0.0 and B1 < 0.0 and B2 < 0.0 and haClose < haClose[1] and haClose[1] < haClose[2]

last_signal = 0
Buy_final  = BuyCondition  and (nz(last_signal[1]) == 0 or nz(last_signal[1]) ==-1)
Sell_final = SellCondition and (nz(last_signal[1]) == 0 or nz(last_signal[1]) == 1)
last_signal := Buy_final ? 1 : Sell_final ? -1 : last_signal[1]

plotshape(Buy_final , style=shape.labelup  , location=location.belowbar, color=color.blue, title="Buy label" , text="BUY" , textcolor=color.white)
plotshape(Sell_final, style=shape.labeldown, location=location.abovebar, color=color.red , title="Sell label", text="SELL", textcolor=color.white)

strategy.entry("Buy", strategy.long, when=Buy_final)
strategy.close("Buy", when=Sell_final)
```

> Detail

https://www.fmz.com/strategy/428608

> Last Modified

2023-10-07 15:01:06
