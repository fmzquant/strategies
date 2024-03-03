
> Name

基于AlphaTrend的跨期策略AlphaTrend-Cross-Period-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

这个策略基于AlphaTrend指标,它结合了RSI和MFI两个指标的优点,在多空趋势市场中都能获得较好的策略效果。该策略主要判断价格是否突破AlphaTrend曲线,以捕捉趋势的方向。

## 策略原理

1. 计算ATR指标来度量市场波动程度
2. 如果没有交易量数据,则使用RSI指标判断市场多空;如果有交易量,则使用MFI指标判断市场多空
3. 根据ATR和多空判断计算上轨下轨
4. 计算AlphaTrend曲线,它结合上轨下轨动态调整
5. 当价格上穿下跌穿AlphaTrend曲线时,发出买入和卖出信号

该策略主要依靠AlphaTrend曲线判断价格趋势方向,它综合考虑了ATR市场波动度量、RSI和MFI多空指标,可以有效跟踪价格趋势。当价格突破曲线时,表明趋势发生转变,这个时间点为入场时点。

## 策略优势

1. AlphaTrend指标结合RSI和MFI两个指标的优点,能够同时适应多空行情
2. 动态的上轨下轨设定可以根据市场波动自动调整
3. 综合考虑价格和交易量信息,不易被错误违背信号误导
4. 采用突破操作方式,可以及时捕捉新的趋势方向
5. 逻辑清晰简单,容易理解实现

综上,该策略对多空行情都适用,有效过滤市场噪音,识别趋势较为准确,是一种精准高效的趋势跟随策略。

## 策略风险

1. AlphaTrend曲线可能出现错误突破的情况,需要Combination与其他指标进行验证
2. 大盘震荡行情中可能出现多次无效信号
3. 指标参数设置不当也会影响策略效果
4. 暴涨暴跌行情中,止损可能被突破,需警惕大幅亏损

针对风险,可以设置止损来控制单笔损失;优化参数组合,与其他指标组合使用来减少无效信号;根据不同市场调整参数设置。

## 策略优化

1. 可以试验不同的参数组合,寻找最优参数
2. 可以与其他指标组合,形成帮助判断的辅助条件
3. 可以设置动态止损或者追踪止损来控制风险
4. 可以根据市场情况使用不同的交易频率(如5分钟、15分钟等)
5. 可以优化入场 timing,设置更精确的入场条件

通过测试不同市场及参数,还可以继续优化该策略,使之能够适应更多类型的行情情况。

## 总结

该AlphaTrend策略整体来说是一个简单高效的趋势跟随策略。它结合价格和交易量,能适应多空行情。以突破操作方式明确入场时机。在控制好风险的前提下,可以获得不错的策略效果。值得进一步测试优化,使其能够在更多市场中稳定盈利。

||


## Overview

This strategy is based on the AlphaTrend indicator, which combines the advantages of RSI and MFI indicators and can achieve good results in both bullish and bearish trending markets. The strategy mainly judges the direction of the trend by whether the price breaks through the AlphaTrend curve.

## Strategy Logic

1. Calculate the ATR indicator to measure market volatility
2. Use RSI to determine market direction if no volume data; use MFI if volume data exists
3. Calculate upper and lower bands based on ATR and market direction
4. Compute AlphaTrend curve, which incorporates dynamic upper and lower bands
5. Generate buy and sell signals when price crosses above or below the AlphaTrend curve

The strategy relies mainly on the AlphaTrend curve to determine the price trend direction. It takes into account ATR, RSI/MFI, and can track the trend effectively. When price penetrates the curve, it signals a change in the trend and forms the entry point.

## Advantages

1. AlphaTrend combines the strengths of RSI and MFI, adaptable to both bull and bear markets
2. Dynamic upper and lower bands automatically adjust based on market volatility
3. Incorporates both price and volume information, avoiding false signals  
4. Breakout approach clearly identifies trend direction
5. Simple and easy to understand logic

In summary, this strategy works for both bullish and bearish markets, filters out market noise effectively, identifies trends accurately, and is an efficient trend following strategy.

## Risks

1. AlphaTrend curve may have false breakouts, requiring confirmation from other indicators
2. Many false signals may occur during market consolidation
3. Ineffective results from poor parameter tuning
4. Stop loss may be taken out during spikes, incurring large losses

To address the risks, stop loss can control single trade loss; combine with other indicators to avoid false signals; adjust parameters based on different markets.

## Enhancement Opportunities 

1. Test different parameter combinations for optimized settings
2. Incorporate other indicators to form confirmation conditions
3. Employ dynamic or trailing stop loss to control risks
4. Trade on different timeframes (5m, 15m, etc) based on market conditions
5. Refine entry timing system for more precise entry

Further optimizations can be done by testing on different markets and parameters so that the strategy is adaptable to more market conditions.

## Conclusion

Overall this AlphaTrend strategy is a simple and efficient trend following system. It incorporates both price and volume information to adapt to bullish and bearish markets. The breakout mechanism provides clear entry signals. With proper risk control, it can achieve good results. Further testing and enhancement can help stabilize its profitability over more market conditions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|1.5|Multiplier|
|v_input_1|15|Common Period|
|v_input_2|false|Change calculation (no volume data)?|
|v_input_3|timestamp(01 Jan 2014 00:00 +0000)|(?Backtesting)Backtesting Start Time|
|v_input_4|timestamp(01 Jan 2100 23:59 +0000)|Backtesting End Time|
|v_input_string_1||(?PV Settings)Exchange|
|v_input_string_2||Symbol|
|v_input_string_3||Account|
|v_input_string_4||PV Alert Name Longs|
|v_input_string_5||PV Alert Name Shorts|
|v_input_bool_1|false|Test Alerts|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-20 00:00:00
end: 2023-09-26 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// author © KivancOzbilgic
// developer © KivancOzbilgic
// pv additions, simplification and strategy conversion @ treigen
//@version=5
strategy('AlphaTrend For ProfitView', overlay=true, calc_on_every_tick=true, process_orders_on_close=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1, initial_capital=1000)
coeff = input.float(1.5, 'Multiplier', step=0.1)
AP = input(15, 'Common Period')
ATR = ta.sma(ta.tr, AP)
novolumedata = input(title='Change calculation (no volume data)?', defval=false)

i_startTime = input(defval = timestamp("01 Jan 2014 00:00 +0000"), title = "Backtesting Start Time", inline="timestart", group='Backtesting')
i_endTime = input(defval = timestamp("01 Jan 2100 23:59 +0000"), title = "Backtesting End Time", inline="timeend", group='Backtesting')
timeCond = true

pv_ex = input.string('', title='Exchange', tooltip='Leave empty to use the chart ticker instead (Warning: May differ from actual market name in some instances)', group='PV Settings')
pv_sym = input.string('', title='Symbol', tooltip='Leave empty to use the chart ticker instead (Warning: May differ from actual market name in some instances)', group='PV Settings')
pv_acc = input.string("", title="Account", group='PV Settings')
pv_alert_long = input.string("", title="PV Alert Name Longs", group='PV Settings')
pv_alert_short = input.string("", title="PV Alert Name Shorts", group='PV Settings')
pv_alert_test = input.bool(false, title="Test Alerts", tooltip="Will immediately execute the alerts, so you may see what it sends. The first line on these test alerts will be excluded from any real alert triggers" ,group='PV Settings')

upT = low - ATR * coeff
downT = high + ATR * coeff
AlphaTrend = 0.0
AlphaTrend := (novolumedata ? ta.rsi(close, AP) >= 50 : ta.mfi(hlc3, AP) >= 50) ? upT < nz(AlphaTrend[1]) ? nz(AlphaTrend[1]) : upT : downT > nz(AlphaTrend[1]) ? nz(AlphaTrend[1]) : downT


k1 = plot(AlphaTrend, color=color.new(#0022FC, 0), linewidth=3)
k2 = plot(AlphaTrend[2], color=color.new(#FC0400, 0), linewidth=3)

buySignalk = ta.crossover(AlphaTrend, AlphaTrend[2])
sellSignalk = ta.crossunder(AlphaTrend, AlphaTrend[2])

var exsym = ""
if barstate.isfirst
    exsym := pv_ex == "" ? "" : "ex=" + pv_ex + ","
    exsym := pv_sym == "" ? exsym : exsym + "sym=" + pv_sym + ","


if barstate.isconfirmed and timeCond 
    if strategy.position_size <= 0 and buySignalk
        strategy.entry("Buy", strategy.long)
        alert(pv_alert_long + "(" + exsym + "acc=" + pv_acc + ")", alert.freq_once_per_bar_close)
    if strategy.position_size >= 0 and sellSignalk
        strategy.entry("Sell", strategy.short)
        alert(pv_alert_short + "(" + exsym + "acc=" + pv_acc + ")", alert.freq_once_per_bar_close)


//  Only used for testing/debugging alert messages
if pv_alert_test
    alert("<![Alert Test]!>\n" + pv_alert_long + "(" + exsym + "acc=" + pv_acc + ")", alert.freq_once_per_bar)
    alert("<![Alert Test]!>\n" + pv_alert_short + "(" + exsym + "acc=" + pv_acc + ")", alert.freq_once_per_bar)

```

> Detail

https://www.fmz.com/strategy/428055

> Last Modified

2023-09-28 11:05:27
