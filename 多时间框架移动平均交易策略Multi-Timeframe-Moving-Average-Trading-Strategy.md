
> Name

多时间框架移动平均交易策略Multi-Timeframe-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略利用多时间框架移动平均线的交叉进行交易信号判断。策略可以在当前时间框架观察较长时间框架的移动平均线,以发掘更大的趋势方向。属于跨时间框架的趋势跟踪策略。

## 策略原理

该策略使用两个移动平均线,分别在当前周期和较高周期计算。

例如在15分钟图上计算20日线和50日线:

- 20日线根据当前15分钟K线计算
- 50日线根据日线K线计算

当15分钟20日线上穿日线50日线时,做多;当15分钟20日线下穿日线50日线时,做空。

这样就实现了在当前周期观察较长周期趋势的效果。策略也允许自定义移动平均线的周期长度。

交叉信号点还可以显示点状标记以提醒交易。

## 策略优势

- 跨时间框架分析,发现更大趋势
- 高周期线条更稳定,避免过多假信号
- 低周期线条更敏感,快速捕捉趋势变化
- 可自行定义多组均线周期进行组合
- 点状标记清晰可见的交易提示

## 策略风险 

- 多时间框架合成增加策略复杂度
- 低周期线条判断假信号风险仍存在
- 均线系统整体滞后,可能错过最佳入场点
- 仅使用均线系统,过滤效果有限
- 需优化周期参数组合,不同品种不一定相同

可以通过以下措施降低风险:

-保留较长高周期均线,确保主趋势判断正确

-加入其他技术指标进一步过滤信号

-优化均线周期参数至优组合

-适当放宽入场条件,如加入K线形态

## 优化方向

该策略可以从以下几个方面进行改进:

1. 测试更多均线周期组合,优化参数

   不同周期组合对不同品种会有最佳匹配组合

2. 在交叉时加入二次确认条件 

   例如交叉时检查MACD指标走势

3. 优化止损方式,避免过早止损

   可以根据 PostForm123 的辅助证据来决定是否退出

4. 对短周期和长周期分别过滤

   短周期采用更严格的过滤条件,长周期采用更宽松的条件

5. 考虑各时间段采用不同参数组合

   不同时间段市场特性不一,可以做参数优化

## 总结

该策略通过观察多时间框架均线的交叉来判断趋势方向,以发现更大级别的趋势。这可以有效滤除短期噪音, Focus123123 更大的行情节奏。但也存在周期设置困难、趋势判断滞后等问题。我们可以通过严格的回测优化参数组合,并加入其他指标进行过滤confirmation123来改进123123123。同时,也需要实盘验证,根据市场反馈不断修正完善策略系统,使其更稳定可靠。只有坚持不断学习和优化,才能顺应市场的变化。

|| 

## Overview

This strategy uses moving average crossovers between different timeframes to generate trading signals. It allows observing longer timeframe MAs on current chart to detect larger trends. This belongs to inter-timeframe trend following strategies.

## Strategy Logic

The strategy uses two moving averages calculated on separate timeframes.

For example on 15min chart it uses 20MA and 50MA:

- 20MA is calculated on current 15min bars
- 50MA is calculated on daily bars

When 15min 20MA crosses above daily 50MA, it goes long. When 15min 20MA crosses below daily 50MA, it goes short.

This achieves the effect of observing longer timeframe trends on current period. Custom MA lengths are also allowed. 

Crossover points can be marked for clear trade signals.

## Advantages

- Analyze across timeframes, discover larger trends
- Higher TF lines more stable, avoiding false signals
- Lower TF lines more sensitive, catching trend changes fast 
- Customizable MA periods combinations
- Clear marked signals on chart

## Risks

- Increased complexity with multiple timeframes
- Lower TF false signals still possible 
- Overall lagging with MA systems, may miss best entries
- Limited filtering with pure MA system
- Period tuning needed for different products

Risks can be reduced by:

- Keeping longer high TF MAs for robust trend direction
- Adding other indicators for further signal filtering
- Optimizing MA periods for best combinations
- Relaxing entry rules like adding candlestick patterns

## Enhancement Directions

The strategy can be improved by:

1. Testing more MA period combinations for optimization

2. Adding secondary confirmation when crossover happens

    e.g. check MACD momentum

3. Optimizing stops to avoid premature exit

    Consider Post123 evidence to decide exits

4. Different filters for short and long TF

    More strict for short TF, more relaxed for long TF

5. Consider different parameter sets for different sessions

    Market conditions vary by sessions

## Summary

This strategy observes crossovers between MAs of multiple timeframes to determine trend direction and uncover larger trends. This filters out short-term noises and focuses on larger price moves. However, challenges like timeframe tuning and lagging signals exist. Enhancements can be made via rigorous backtesting and optimization for robust parameters, adding filters for confirmation, live validation for continuous improvements according to market feedback. Persistent learning and optimization is key to adaptivity.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Current Chart Resolution?|
|v_input_2|D|Use Different Timeframe? Uncheck Box Above|
|v_input_3|20|Moving Average Length - LookBack Period|
|v_input_4|true|1=SMA, 2=EMA, 3=WMA, 4=HullMA, 5=VWMA, 6=RMA, 7=TEMA|
|v_input_5|true|Change Color Based On Direction?|
|v_input_6|2|Color Smoothing - 1 = No Smoothing|
|v_input_7|false|Optional 2nd Moving Average|
|v_input_8|50|Moving Average Length - Optional 2nd MA|
|v_input_9|true|1=SMA, 2=EMA, 3=WMA, 4=HullMA, 5=VWMA, 6=RMA, 7=TEMA|
|v_input_10|true|Change Color Based On Direction 2nd MA?|
|v_input_11|false|***You Can Turn On The Show Dots Parameter Below Without Plotting 2nd MA to See Crosses***|
|v_input_12|false|***If Using Cross Feature W/O Plotting 2ndMA - Make Sure 2ndMA Parameters are Set Correctly***|
|v_input_13|false|Show Dots on Cross of Both MA's|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 7d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

//Run script on a long interval gives better result for e.g. 1 Day
//Plots The Majority of Moving Averages
//Defaults to Current Chart Time Frame --- But Can Be Changed to Higher Or Lower Time Frames
//2nd MA Capability with Show Crosses Feature
//study(title="CM_Ultimate_MA_MTF", shorttitle="CM_Ultimate_MA_MTF", overlay=true)
strategy("Stratergy CM_Ultimate_MA_MTF", shorttitle = "Stratergy CM_Ultimate_MA_MTF", overlay = true) 
//,default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//inputs
src = close
useCurrentRes = input(true, title="Use Current Chart Resolution?")
resCustom = input(title="Use Different Timeframe? Uncheck Box Above",  defval="D")
len = input(20, title="Moving Average Length - LookBack Period")
atype = input(1,minval=1,maxval=7,title="1=SMA, 2=EMA, 3=WMA, 4=HullMA, 5=VWMA, 6=RMA, 7=TEMA")
cc = input(true,title="Change Color Based On Direction?")
smoothe = input(2, minval=1, maxval=10, title="Color Smoothing - 1 = No Smoothing")
doma2 = input(false, title="Optional 2nd Moving Average")
len2 = input(50, title="Moving Average Length - Optional 2nd MA")
atype2 = input(1,minval=1,maxval=7,title="1=SMA, 2=EMA, 3=WMA, 4=HullMA, 5=VWMA, 6=RMA, 7=TEMA")
cc2 = input(true,title="Change Color Based On Direction 2nd MA?")
warn = input(false, title="***You Can Turn On The Show Dots Parameter Below Without Plotting 2nd MA to See Crosses***")
warn2 = input(false, title="***If Using Cross Feature W/O Plotting 2ndMA - Make Sure 2ndMA Parameters are Set Correctly***")
sd = input(false, title="Show Dots on Cross of Both MA's")


res = useCurrentRes ? timeframe.period : resCustom
//hull ma definition
hullma = wma(2*wma(src, len/2)-wma(src, len), round(sqrt(len)))
//TEMA definition
ema1 = ema(src, len)
ema2 = ema(ema1, len)
ema3 = ema(ema2, len)
tema = 3 * (ema1 - ema2) + ema3

avg = atype == 1 ? sma(src,len) : atype == 2 ? ema(src,len) : atype == 3 ? wma(src,len) : atype == 4 ? hullma : atype == 5 ? vwma(src, len) : atype == 6 ? rma(src,len) : tema
//2nd Ma - hull ma definition
hullma2 = wma(2*wma(src, len2/2)-wma(src, len2), round(sqrt(len2)))
//2nd MA TEMA definition
sema1 = ema(src, len2)
sema2 = ema(sema1, len2)
sema3 = ema(sema2, len2)
stema = 3 * (sema1 - sema2) + sema3

avg2 = atype2 == 1 ? sma(src,len2) : atype2 == 2 ? ema(src,len2) : atype2 == 3 ? wma(src,len2) : atype2 == 4 ? hullma2 : atype2 == 5 ? vwma(src, len2) : atype2 == 6 ? rma(src,len2) : tema

out = avg 
out_two = avg2

out1 = security(syminfo.tickerid, res, out)
out2 = security(syminfo.tickerid, res, out_two)

ma_up = out1 >= out1[smoothe]
ma_down = out1 < out1[smoothe]

col = cc ? ma_up ? lime : ma_down ? red : aqua : aqua
col2 = cc2 ? ma_up ? lime : ma_down ? red : aqua : aqua

circleYPosition = out2
chk=col==red?1:0

if (not na(chk))
    if (chk[1]==1 and chk==0)
        strategy.entry("RsiLE", strategy.long, comment="RsiLE")
    else
        strategy.exit("RsiLE")

    if (chk[1]==0 and chk==1)
        strategy.entry("RsiSE", strategy.short, comment="RsiLE")
    else
        strategy.exit("RsiSE")
        
plot(out1, title="Multi-Timeframe Moving Avg", style=line, linewidth=4, color = col)
plot(doma2 and out2 ? out2 : na, title="2nd Multi-TimeFrame Moving Average", style=circles, linewidth=4, color=col2)
plot(sd and cross(out1, out2) ? circleYPosition : na,style=cross, linewidth=5, color=yellow)


```

> Detail

https://www.fmz.com/strategy/427510

> Last Modified

2023-09-21 20:45:38
