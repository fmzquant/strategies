
> Name

双均线反转跟踪策略Dual-Moving-Average-Reversal-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/20ef77721bf15d244ef.png)
[trans]

该策略的主要思想是利用移动平均线的金叉死叉作为买卖信号,结合价格突破双均线的方式进行建仓和止损。当短期均线上穿长期均线时生成买入信号;当短期均线下穿长期均线时生成卖出信号。该策略同时具有趋势跟踪和反转交易的特点。

策略详细运作原理如下:

1. 计算短期简单移动平均线和长期简单移动平均线。

2. 比较价格是否高于或低于移动平均线,以价格在移动平均线之上为持多头,价格在移动平均线之下为空头的判断依据。

3. 在短均线上穿长均线时做多;在短均线下穿长均线时做空。

4. 这样来回切换多空仓位。

该策略的主要优势有:

1. 双均线策略同时结合趋势跟踪和反转交易,兼顾了追踪市场趋势和捕捉反转机会。

2. 均线的金叉死叉具有一定的持久性,可以有效滤除假突破。

3. 利用均线理论,有利于在趋势震荡中锁定盈利。

该策略的主要风险有:

1. 双均线策略对参数敏感,移动平均线参数设置不当可能导致交易频繁或漏掉机会。

2. 突破失败可能造成亏损,需要有效止损来控制风险。

3. 趋势反转不一定成功,可能继续原趋势而亏损。

该策略的主要优化方向:

1. 对移动平均线参数进行测试和优化,找到最佳参数组合。

2. 添加趋势判断指标,区分趋势和震荡市场。

3. 增加有效止损来控制风险,如追踪止损、挂单止损等。

4. 结合其他指标进行组合,提高策略的稳定性。

总之,本策略作为一种双均线反转跟踪策略,同时考虑了趋势跟踪和反转交易,在参数优化和风险控制到位的情况下,能够获得较好的效果。但任何策略都可能面临方向判断错误、止损失败等风险,需要不断测试和优化来适应市场的变化。

||


The main idea of this strategy is to use the golden cross and dead cross of moving averages as trading signals, combined with the price breakout of dual moving averages to make entries and stops. It generates a buy signal when the short period moving average crosses above the long period moving average; a sell signal is generated when the short period moving average crosses below the long period moving average. Thus the strategy has both trend following and mean reversion characteristics.  

The detailed operating principles are as follows:

1. Calculate short period simple moving average (SMA) and long period simple moving average.  

2. Compare if the price is above or below the moving averages. The price above the moving averages indicates long position, while the price below shows short position.

3. Go long when short SMA crosses above long SMA; go short when short SMA crosses below long SMA.  

4. Switch between long and short positions.

The main advantages of this strategy are:

1. The dual moving average strategy combines both trend following and mean reversion, which takes advantage of tracking market trends and capturing reversal opportunities.

2. The golden cross and dead cross of moving averages have some persistence, which helps filter out false breakouts. 

3. Based on the moving average theory, it is beneficial to lock in profits during trending and range-bound markets.

The main risks of this strategy are: 

1. The dual moving average strategy is sensitive to parameters. Improper parameter settings may result in overtrading or missing opportunities.

2. Failed breakouts can lead to losses. Effective stops should be implemented to control risks.

3. Trend reversal is not guaranteed to succeed. The original trend may continue resulting in losses.

The main optimization directions:

1. Test and optimize the moving average parameters to find the best parameter combination.

2. Add a trend determination indicator to distinguish between trending and ranging markets.  

3. Implement effective stop loss to control risks, such as trailing stop loss, stop order loss etc.

4. Combine with other indicators to improve strategy robustness.

In conclusion, as a dual moving average reversal tracking strategy, it takes both trend tracking and reversal trading into consideration. With proper parameter optimization and risk control, it can achieve good results. However, any strategy faces risks like directional mistakes, stop loss failure etc. Continuous testing and optimization are needed to adapt to changing markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|D|Resolution|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|14|Length|
|v_input_4_close|0|Trigger Price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|true|Painting bars|
|v_input_6|true|Show Line|
|v_input_7|false|Use Alerts|
|v_input_8|false|Trade Reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-29 00:00:00
end: 2023-12-06 00:00:00
period: 10m
basePeriod: 1m
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
strategy(title="Simple SMA Strategy Backtest", shorttitle="SMA Backtest", precision=6, overlay=true)
Resolution = input(title="Resolution", type=input.resolution, defval="D")
Source = input(title="Source", type=input.source, defval=close)
xSeries = security(syminfo.tickerid, Resolution, Source)
Length = input(title="Length", type=input.integer, defval=14, minval=2)
TriggerPrice = input(title="Trigger Price", type=input.source, defval=close)
BarColors = input(title="Painting bars", type=input.bool, defval=true)
ShowLine = input(title="Show Line", type=input.bool, defval=true)
UseAlerts = input(title="Use Alerts", type=input.bool, defval=false)
reverse = input(title="Trade Reverse", type=input.bool, defval=false)
pos = 0
xSMA = sma(xSeries, Length)
pos := iff(TriggerPrice > xSMA, 1,
         iff(TriggerPrice < xSMA, -1, nz(pos[1], 0)))
nRes = ShowLine ? xSMA : na
alertcondition(UseAlerts == true and pos != pos[1] and pos == 1, title='Signal Buy', message='Strategy to change to BUY')
alertcondition(UseAlerts == true and pos != pos[1] and pos == -1, title='Signal Sell', message='Strategy to change to SELL')
alertcondition(UseAlerts == true and pos != pos[1] and pos == 0, title='FLAT', message='Strategy get out from position')
possig = iff(reverse and pos == 1, -1,
           iff(reverse and pos == -1, 1, pos))
if (possig == 1)
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)
if (possig == 0)
    strategy.close_all()
nColor = BarColors ? possig == -1 ? color.red : possig == 1 ? color.green : color.blue : na 
barcolor(nColor)
plot(nRes, title='SMA', color=#00ffaa, linewidth=2, style=plot.style_line)
```

> Detail

https://www.fmz.com/strategy/434608

> Last Modified

2023-12-07 17:40:12
