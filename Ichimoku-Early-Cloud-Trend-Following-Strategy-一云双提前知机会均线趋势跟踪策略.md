
> Name

Ichimoku-Early-Cloud-Trend-Following-Strategy-一云双提前知机会均线趋势跟踪策略

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13e48f7c4135f2fe6ce.png)
[trans]

## 概述

一云双提前知机会均线趋势跟踪策略是一种基于人气指标一云图的趋势跟踪策略。该策略利用一云图的转折线提前发出买卖信号,实现趋势的提前捕捉。同时,策略还融合了均线的趋势判断,进行多层确认,避免假突破。

## 策略原理

该策略主要基于以下几个要点:

1. 使用转化线(Conversion Line)和基准线(Base Line)构建一云图,并以26周期的位移绘制云图。

2. 当收盘价突破云图上轨时,发出买入信号;当收盘价跌破云图下轨时,发出卖出信号。

3. 为过滤假突破,要求当前收盘价同时突破转化线和基准线的最大值和最小值。

4. 止损线设置为入场价的5%,可关闭。

通过这样的多重过滤,可以有效识别趋势转折点,及时捕捉新的交易机会。同时严格的突破过滤也可以减少假信号的发出。

## 策略优势

这种策略有以下几个优势:

1. 一云图转折线有明显的提前特征,可以较早捕捉到趋势的转折。
2. 融合均线判断,避免了隔夜gaps造成的假突破。
3. 多重条件过滤,可以减少假信号,提高信号质量。
4. 长线操作,回撤相对较小,容易寻找止盈位置。
5. 可适用于不同品种,特别适合趋势品种。

## 策略风险

该策略也存在以下一些风险:

1. 趋势市场适用性更好,盘整市场会增加假信号。
2. 一云图参数设置会影响效果,需要针对不同品种进行优化。 
3. 止损位置设置需要谨慎,避免被套。
4. 信号频率偏低,容易错过短线机会。

可以通过以下方法减少风险:

1. 选择趋势明显的品种,避免交易盘整品种。
2. 优化一云图参数,针对不同周期确定最佳参数组合。
3. 采用移动止损或及时止损,控制单笔损失。
4. 可以结合其他指标,增加信号释放频率。

## 策略优化

该策略还可以从以下几个方面进行优化:

1. 增加仓位管理机制,通过运算符如 `strategy.position_size` 控制建仓比例。

2. 增加品种过滤,通过 `security()` 过滤品种池,自动识别趋势程度。

3. 增加止损止盈策略,设置移动止损或部分止盈,进一步控制风险。

4. 结合其他指标,如布林线、RSI等,构建多指标交易系统,提高信号质量。

5. 应用机器学习方法,通过训练判断买卖信号的可靠性,动态调整下单数量。

## 总结

一云双提前知机会均线趋势跟踪策略通过一云图实现趋势的提前判断,再融合均线多层过滤器,可以有效识别高质量交易机会。策略较为稳健,优化空间大,可广泛应用于实盘交易。

||

## Overview

The Ichimoku Early Cloud Trend Following Strategy is a trend following strategy based on the popular Ichimoku Cloud indicator. It utilizes the crossover lines of the Ichimoku Cloud to generate early entry signals and capture trends ahead of time. The strategy also incorporates moving averages for trend validation to avoid false breakouts.

## Strategy Logic

The strategy is mainly based on the following elements:

1. Construct the Ichimoku Cloud using the Conversion Line and Base Line, and plot the cloud with a 26-period displacement.

2. Trigger a long signal when close breaks above the top of the cloud; trigger a short signal when close breaks below the bottom of the cloud.  

3. Require close to also break the max/min of the Conversion and Base Lines to filter out false breakouts.

4. Optionally set a 5% stop loss based on entry price.

With such multilayer filtering, it can effectively identify trend reversal points and capture emerging trading opportunities in a timely manner. The strict breakout criteria also help reduce false signals.   

## Advantages

The strategy has the following advantages:

1. Ichimoku Cloud crossover lines have clear early indication before trend reversal.  
2. Incorporating moving averages avoids false breakout due to overnight gaps.
3. Multiple filter conditions reduce false signals and improve signal quality.  
4. Long holding periods result in smaller drawdowns and easier profit taking.
5. Applicable to different products, especially trending instruments.

## Risks

There are also some risks to consider:

1. Works better for trending markets; may generate more false signals during range-bound periods.  
2. Ichimoku parameters need to be optimized for different products.
3. Stop loss placement requires caution to avoid premature exit.  
4. Relatively low signal frequency, tends to miss short-term opportunities.  

Risks can be reduced by:

1. Select strongly trending products, avoid ranging products.
2. Optimize Ichimoku parameters for different timeframes to find best combinations. 
3. Employ trailing stop loss to control loss on single trades.
4. Add other indicators to increase signal frequency.

## Enhancements

The strategy can be further improved on the following aspects:

1. Add position sizing to control amount traded programmatically via `strategy.position_size`.

2. Add security universe filtering to auto detect trend strength via `security()`.  

3. Incorporate stop loss/profit taking techniques for risk management.

4. Build multi-indicator system combining indicators like Bollinger Bands and RSI to improve signal quality.  

5. Apply machine learning to judge signal reliability and dynamically adjust order quantities.

## Conclusion

The Ichimoku Early Cloud Trend Following Strategy utilizes Ichimoku Cloud for early trend identification, reinforced by moving average filters, to reliably detect high-quality trading opportunities. The strategy is stable with much room for enhancements and can be widely adopted for live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Conversion Line Period|
|v_input_2|26|Base Line Period|
|v_input_3|52|Lagging Span 2 Period|
|v_input_4|26|Displacement|
|v_input_5|false|Long Only|
|v_input_6|5|Stop-loss (%)|
|v_input_7|false|Use Stop-Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © QuantCT

//@version=4
strategy("Ichimoku Cloud Strategy Idea",
         shorttitle="Ichimoku", 
         overlay=true,
         pyramiding=0,     
         default_qty_type=strategy.percent_of_equity, 
         default_qty_value=99, 
         initial_capital=1000,           
         commission_type=strategy.commission.percent, 
         commission_value=0.1)

// ____ Inputs

conversion_period = input(9, minval=1, title="Conversion Line Period")
base_period = input(26, minval=1, title="Base Line Period")
lagging_span2_period = input(52, minval=1, title="Lagging Span 2 Period")
displacement = input(26, minval=1, title="Displacement")
long_only = input(title="Long Only", defval=false)
slp = input(title="Stop-loss (%)", minval=1.0, maxval=25.0, defval=5.0)
use_sl = input(title="Use Stop-Loss", defval=false)

// ____ Logic

donchian(len) => avg(lowest(len), highest(len))

conversion_line = donchian(conversion_period)
base_line = donchian(base_period)
lead_line1 = avg(conversion_line, base_line)
lead_line2 = donchian(lagging_span2_period)
chikou = close

chikou_free_long = close > high[displacement] and close > max(lead_line1[2 * displacement], lead_line2[2 * displacement])
enter_long = chikou_free_long and close > max(lead_line1[displacement], lead_line2[displacement])
exit_long = close < lead_line1[displacement] or close < lead_line2[displacement]

chikou_free_short = close < low[displacement] and  close < min(lead_line1[2 * displacement], lead_line2[2 * displacement])
enter_short = chikou_free_short and close < min(lead_line1[displacement], lead_line2[displacement])
exit_short = close > lead_line1[displacement] or close > lead_line2[displacement]

strategy.entry("Long", strategy.long, when=enter_long)
strategy.close("Long", when=exit_long) 
if (not long_only)
    strategy.entry("Short", strategy.short, when=enter_short)
    strategy.close("Short", when=exit_short) 

// ____ SL

sl_long = strategy.position_avg_price * (1- (slp/100))
sl_short = strategy.position_avg_price * (1 + (slp/100))
if (use_sl)
    strategy.exit(id="SL", from_entry="Long", stop=sl_long)
    strategy.exit(id="SL", from_entry="Short", stop=sl_short)

// ____ Plots

colors = 
 enter_long ? #27D600 :
 enter_short ? #E30202 :
 color.orange
 
p1 = plot(lead_line1, offset = displacement, color=colors,
	 title="Lead 1")
p2 = plot(lead_line2, offset = displacement, color=colors,
	 title="Lead 2")
fill(p1, p2, color = colors)
plot(chikou, offset = -displacement, color=color.blue)


```

> Detail

https://www.fmz.com/strategy/435139

> Last Modified

2023-12-12 16:11:09
