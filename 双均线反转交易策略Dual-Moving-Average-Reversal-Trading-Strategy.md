
> Name

双均线反转交易策略Dual-Moving-Average-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/133b22e7906f5d5ad59.png)


[trans]


## 概述

双均线反转交易策略通过计算短期和长期两个不同周期的简单移动平均线,并根据价格与移动平均线的关系来产生交易信号。当短期均线上穿长期均线时,做多;当短期均线下穿长期均线时,做空。该策略属于趋势跟踪策略。

## 策略原理

该策略通过输入参数设置两条不同周期长度的简单移动平均线,短周期线被称为快线,长周期线被称为慢线。快线响应价格变化更迅速,能捕捉短期趋势;慢线 响应价格变化更缓慢,能过滤掉短期市场噪音,捕捉主要趋势。当快线上穿慢线时,表明价格上涨势头增强,做多;当快线下穿慢线时,表明价格下跌势头增强,做空。 

具体来说,策略通过sma()函数计算两条均线,并将计算结果赋值给xSMA(慢线)和快线。策略使用close价格计算均线。当close价格上穿xSMA时,做多;当close价格下穿xSMA时,做空。策略还设置了交易时间范围限制,只有在指定的时间范围内才会发出交易信号。

对每笔交易设置止盈止损点,并在到达止盈止损点时立即止盈止损。同时,策略通过barcolor函数将价格与慢线的关系显示在K线上:当做多时,K线为绿色;当做空时,K线为红色;当平仓时,K线为蓝色。

## 优势分析

- 使用双均线系统,可以有效跟踪趋势,并避免被短期市场噪音误导
- 采用快慢均线配合,可以提高交易信号质量
- 设置止盈止损点,可以控制单笔交易的风险
- 限制交易时间范围,可以避免重大事件带来的巨大波动
- 在K线上标记交易信号,形成视觉辅助,提高直观性

## 风险分析

- 双均线系统容易产生较多虚假信号,交易频繁带来交易成本压力
- 需要合理设置均线参数,否则平滑效果不佳或产生等待时机过多问题 
- 均线系统存在时滞,可能错过趋势转折点
- 固定止盈止损点可能过于武断,无法动态调整
- 限定交易时间范围可能错过其他时间段的交易机会

可以通过调整均线参数,优化止盈止损策略,取消时间限制或设置更合理的交易时间段来降低风险。也可以考虑结合其他指标作为过滤条件,避免出现太多虚假信号。

## 优化方向

- 可以测试不同均线周期的组合,寻找最佳参数
- 可以考虑将止盈止损改为动态追踪,比如与ATR挂钩
- 可以引入其他指标,如MACD、KD等作为过滤信号
- 可以对交易时间范围进行优化,使其能捕捉更多交易机会
- 可以结合突破策略,在均线附近寻找突破信号
- 可以建立动态离场机制,当价格进入区间时主动止损

## 总结

双均线反转交易策略overall是一种简单实用的趋势跟踪策略。它充分利用均线的平滑作用识别趋势方向,并配合快慢均线产生交易信号。该策略易于实现,思路清晰,适合初学者掌握。但其可能产生较多虚假信号和时滞问题。可以通过参数优化、引入辅助指标等方法来改进,使策略更稳定可靠。如果使用得当,该策略可以产生稳定的盈利,值得进行全面测试和优化。

||


## Overview

The dual moving average reversal trading strategy generates trading signals by calculating simple moving averages of two different periods - short term and long term. It goes long when the short period moving average crosses above the long period moving average, and goes short when the short period moving average crosses below the long period moving average. This strategy belongs to the trend following strategy category.

## Strategy Logic

This strategy sets two simple moving averages with different period lengths through the input parameters, with the short period MA referred to as the fast line, and the long period MA referred to as the slow line. The fast line reacts faster to price changes and captures short term trends, while the slow line reacts slower to price changes and filters out short term market noise, capturing the major trend. When the fast line crosses above the slow line, it indicates the uptrend is strengthening and a long position is taken. When the fast line crosses below the slow line, it indicates the downtrend is strengthening and a short position is taken.

Specifically, the strategy calculates the two MAs using the sma() function, assigning the result to xSMA (slow line) and fast line. The MAs are calculated based on the close price. When the close price crosses above xSMA, a long position is taken. When the close price crosses below xSMA, a short position is taken. The strategy also sets a trading time range limit, so that trading signals are only generated within the specified time range. 

Take profit and stop loss points are set for each trade, and profit is taken or stop loss triggered immediately when price reaches the take profit or stop loss level. Meanwhile, the strategy plots the price vs MA relationship on the bars using the barcolor function - bars are colored green during long positions, red during short positions, and blue when flat.

## Advantage Analysis

- Using a dual MA system can effectively track trends and avoid being misled by short term market noise
- Combining fast and slow MAs can improve trading signal quality 
- Take profit and stop loss points control risk for each trade
- Limiting trading time range avoids huge swings around major events
- Plotting trading signals on bars creates visual aid and improves intuitiveness

## Risk Analysis

- Dual MA systems tend to generate more false signals, increasing trading frequency and costs
- MA parameters need to be set reasonably, otherwise smoothing effect suffers or too many missed opportunities
- MA systems have lag and may miss trend turning points
- Fixed take profit/stop loss may be too blunt and cannot adjust dynamically 
- Limiting trading time range may miss opportunities in other periods

Risk can be reduced by adjusting MA parameters, optimizing take profit/stop loss strategy, removing time limitations or setting more reasonable trading time periods. Other indicators could also be incorporated as filter conditions to avoid too many false signals.

## Optimization Directions

- Test different MA period combinations to find optimal parameters
- Consider dynamic trailing stop loss/profit, e.g. based on ATR 
- Incorporate other indicators like MACD, KD etc as filter signals
- Optimize trading time range to capture more opportunities
- Combine with breakout strategy, looking for breakout signals around MAs
- Build dynamic exit mechanisms, actively stopping out when price enters range

## Summary

The dual moving average reversal trading strategy overall is a simple and practical trend following strategy. It takes full advantage of the smoothing effect of MAs to identify trend direction, and uses fast/slow MAs to generate trading signals. The strategy is easy to implement with clear logic, suitable for beginners to grasp. However, it may generate excessive false signals and lag issues. Improvements can be made via parameter optimization, adding auxiliary indicators etc to make the strategy more robust. If used properly, this strategy can deliver steady profits and is worth comprehensive testing and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|D|Resolution|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|14|Length|
|v_input_4_close|0|Trigger Price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|50|Take Profit|
|v_input_6|20|Stop Loss|
|v_input_7|false|Use TakeStop|
|v_input_8|true|Painting bars|
|v_input_9|true|Show Line|
|v_input_10|false|Use Alerts|
|v_input_11|15|Time Frame|
|v_input_12|2300-0800|Time Range|
|v_input_13|false|Trade Reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-15 00:00:00
end: 2023-10-15 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HPotter
//  Simple SMA strategy
//
// WARNING:
//      - For purpose educate only
//      - This script to change bars colors
//@version=4
timeinrange(res, sess) => not na(time(res, sess)) ? 1 : 0

strategy(title="Simple SMA Strategy Backtest", shorttitle="SMA Backtest", precision=6, overlay=true)
Resolution = input(title="Resolution", type=input.resolution, defval="D")
Source = input(title="Source", type=input.source, defval=close)
xSeries = security(syminfo.tickerid, Resolution, Source)
Length = input(title="Length", type=input.integer, defval=14, minval=2)
TriggerPrice = input(title="Trigger Price", type=input.source, defval=close)
TakeProfit = input(50, title="Take Profit", step=0.01)
StopLoss = input(20, title="Stop Loss", step=0.01)
UseTPSL = input(title="Use Take\Stop", type=input.bool, defval=false)
BarColors = input(title="Painting bars", type=input.bool, defval=true)
ShowLine = input(title="Show Line", type=input.bool, defval=true)
UseAlerts = input(title="Use Alerts", type=input.bool, defval=false)
timeframe = input(title="Time Frame", defval="15")
timerange = input(title="Time Range", defval="2300-0800")
reverse = input(title="Trade Reverse", type=input.bool, defval=false)
pos = 0
xSMA = sma(xSeries, Length)
pos := iff(TriggerPrice > xSMA, 1,
         iff(TriggerPrice < xSMA, -1, nz(pos[1], 0)))
nRes = ShowLine ? xSMA : na
alertcondition(UseAlerts == true and pos != pos[1] and pos == 1, title='Signal Buy', message='Strategy to change to BUY')
alertcondition(UseAlerts == true and pos != pos[1] and pos == -1, title='Signal Sell', message='Strategy to change to SELL')
alertcondition(UseAlerts == true and pos != pos[1] and pos == 0, title='FLAT', message='Strategy get out from position')
possig =iff(pos[1] != pos,
         iff(reverse and pos == 1, -1,
           iff(reverse and pos == -1, 1, pos)), 0)
if (possig == 1 and timeinrange(timeframe, timerange))
    strategy.entry("Long", strategy.long)
if (possig == -1 and timeinrange(timeframe, timerange))
    strategy.entry("Short", strategy.short)
if (timeinrange(timeframe, timerange) == 0) 
    strategy.close_all()

if (UseTPSL)    
    strategy.close("Long", when = high > strategy.position_avg_price + TakeProfit, comment = "close buy take profit")
    strategy.close("Long", when = low < strategy.position_avg_price - StopLoss, comment = "close buy stop loss")
    strategy.close("Short", when = low < strategy.position_avg_price - TakeProfit, comment = "close buy take profit")
    strategy.close("Short", when = high > strategy.position_avg_price + StopLoss, comment = "close buy stop loss")
nColor = BarColors ? strategy.position_avg_price != 0  and pos == 1 ? color.green :strategy.position_avg_price != 0 and pos == -1 ? color.red : color.blue : na
barcolor(nColor)
plot(nRes, title='SMA', color=#00ffaa, linewidth=2, style=plot.style_line)
```

> Detail

https://www.fmz.com/strategy/429383

> Last Modified

2023-10-16 15:50:35
