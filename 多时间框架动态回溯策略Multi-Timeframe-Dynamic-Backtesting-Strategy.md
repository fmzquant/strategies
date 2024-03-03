
> Name

多时间框架动态回溯策略Multi-Timeframe-Dynamic-Backtesting-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/cc31db9fca4cff7673.png)

[trans]

## 概述
该策略运用多时间框架动态回溯机制,通过比较不同时间周期的最高价和最低价,判断价格趋势,实现低风险套利。

## 策略原理
该策略通过调用自定义函数f_get_htfHighLow,获取不同时间周期的最高价nhigh和最低价nlow。具体来说,根据用户设定的时间周期resolution、时间周期乘数HTFMultiplier、回溯参数lookahead与gaps,以及偏移量offset,调用security函数获取不同时间周期的最高价和最低价。

例如,offset为0时,获得当前K线的最高价和最低价;offset为1时,获得上一K线的最高价和最低价。通过比较两K线之间价格的变化,判断趋势方向。

如果最高价上涨且最低价上涨,则判断为看涨趋势;如果最高价下跌且最低价下跌,则判断为看跌趋势。根据趋势方向进行 longing或shorting,实现套利交易。

## 策略优势
1. 运用多时间框架分析,提高判断准确性
2. 应用动态回溯机制,避免repainting
3. 灵活设置不同参数组合,适应市场变化
4. 仅在趋势明确时开仓,有效控制风险

## 策略风险
1. 多时间框架判断可能存在误判风险
2. 回溯参数设置不当可能导致repainting
3. 交易频率可能过高,增加交易成本和滑点风险

解决方法:
1. 优化时间周期参数,提高判断准确性
2. 严格测试回溯参数,避免repainting
3. 适当调整开仓条件,控制交易频率

## 策略优化方向 
1. 增加机器学习模块,利用AI判断趋势
2. 结合股价波动率,动态调整仓位
3. 加入止损机制,有效控制亏损风险

## 总结
该策略整体思路清晰,利用多时间框架动态回溯判断股价趋势,最大程度减少人为判断错误,是一种典型的程序化交易策略。通过参数优化与功能扩展,可进一步增强策略稳定性与盈利空间,值得深入研究与跟踪。

||

## Overview 
This strategy employs a multi timeframe dynamic backtesting mechanism to determine price trends by comparing the highest and lowest prices across different time periods, thereby achieving low-risk arbitrage.

## Strategy Logic
The strategy retrieves the highest price (nhigh) and lowest price (nlow) across different timeframes by calling the custom function f_get_htfHighLow. Specifically, based on user-defined inputs like time period resolution, time period multiplier HTFMultiplier, backtesting parameters lookahead and gaps, and offset, it invokes the security function to obtain the highest and lowest prices over different timeframes. 

For example, an offset of 0 retrieves the highest and lowest prices of the current bar, while an offset of 1 retrieves those prices from the previous bar. By comparing price changes between bars, trend direction is determined.

If both highest and lowest prices rise, a bullish trend is identified. If both prices fall, a bearish trend is seen. Longing or shorting positions are taken based on the trend direction to implement arbitrage trades.

## Advantages
1. Enhanced accuracy through multi timeframe analysis 
2. Avoids repainting via dynamic backtesting  
3. Flexible parameters accommodate market changes
4. Reduced risk with positions only in clear trends  

## Risks
1. Multi timeframe misjudgements 
2. Repainting from improper backtesting parameters
3. High costs and slippage from excessive trades

Solutions:
1. Optimize time periods for accuracy
2. Strictly test parameters to prevent repainting 
3. Moderate entry conditions to control frequency

## Enhancement Opportunities
1. Add ML to leverage AI for trends
2. Incorporate volatility filters for dynamic position sizing  
3. Introduce stops to effectively limit losses

## Conclusion
The strategy logic is clear, using multi timeframe dynamic backtesting to determine trends and minimize human bias. With refinement through parameter optimization and feature expansion, it demonstrates significant potential for improved stability and profitability worthy of further research and tracking.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2010 00:00 +0000)|Start Time|
|v_input_2|timestamp(01 Jan 2099 00:00 +0000)|End Time|
|v_input_3|3M|resolution|
|v_input_4|22|HTFMultiplier|
|v_input_5|false|offset|
|v_input_6|true|lookahead|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-14 00:00:00
end: 2023-11-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HeWhoMustNotBeNamed

//@version=4
strategy("HTF High/Low Repaint Strategy", overlay=true, initial_capital = 20000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type = strategy.commission.percent, pyramiding = 1, commission_value = 0.01)

i_startTime = input(defval = timestamp("01 Jan 2010 00:00 +0000"), title = "Start Time", type = input.time)
i_endTime = input(defval = timestamp("01 Jan 2099 00:00 +0000"), title = "End Time", type = input.time)
inDateRange = true

resolution = input("3M", type=input.resolution)
HTFMultiplier = input(22, minval=1, step=1)
offset = input(0, minval=0, step=1)
lookahead = input(true)
gaps = false

f_secureSecurity_on_on(_symbol, _res, _src, _offset) => security(_symbol, _res, _src[_offset], lookahead = barmerge.lookahead_on, gaps=barmerge.gaps_on)
f_secureSecurity_on_off(_symbol, _res, _src, _offset) => security(_symbol, _res, _src[_offset], lookahead = barmerge.lookahead_on, gaps=barmerge.gaps_off)
f_secureSecurity_off_on(_symbol, _res, _src, _offset) => security(_symbol, _res, _src[_offset], lookahead = barmerge.lookahead_off, gaps=barmerge.gaps_on)
f_secureSecurity_off_off(_symbol, _res, _src, _offset) => security(_symbol, _res, _src[_offset], lookahead = barmerge.lookahead_off, gaps=barmerge.gaps_off)

f_multiple_resolution(HTFMultiplier) => 
    target_Res_In_Min = timeframe.multiplier * HTFMultiplier * (
      timeframe.isseconds   ? 1. / 60. :
      timeframe.isminutes   ? 1. :
      timeframe.isdaily     ? 1440. :
      timeframe.isweekly    ? 7. * 24. * 60. :
      timeframe.ismonthly   ? 30.417 * 24. * 60. : na)

    target_Res_In_Min     <= 0.0417       ? "1S"  :
      target_Res_In_Min   <= 0.167        ? "5S"  :
      target_Res_In_Min   <= 0.376        ? "15S" :
      target_Res_In_Min   <= 0.751        ? "30S" :
      target_Res_In_Min   <= 1440         ? tostring(round(target_Res_In_Min)) :
      tostring(round(min(target_Res_In_Min / 1440, 365))) + "D"

f_get_htfHighLow(resolution, HTFMultiplier, lookahead, gaps, offset)=>
    derivedResolution = resolution == ""?f_multiple_resolution(HTFMultiplier):resolution
    nhigh_on_on = f_secureSecurity_on_on(syminfo.tickerid, derivedResolution, high, offset) 
    nlow_on_on = f_secureSecurity_on_on(syminfo.tickerid, derivedResolution, low, offset)
    
    nhigh_on_off = f_secureSecurity_on_off(syminfo.tickerid, derivedResolution, high, offset) 
    nlow_on_off = f_secureSecurity_on_off(syminfo.tickerid, derivedResolution, low, offset)
    
    nhigh_off_on = f_secureSecurity_off_on(syminfo.tickerid, derivedResolution, high, offset) 
    nlow_off_on = f_secureSecurity_off_on(syminfo.tickerid, derivedResolution, low, offset)
    
    nhigh_off_off = f_secureSecurity_off_off(syminfo.tickerid, derivedResolution, high, offset) 
    nlow_off_off = f_secureSecurity_off_off(syminfo.tickerid, derivedResolution, low, offset)
    
    nhigh = lookahead and gaps ? nhigh_on_on :
             lookahead and not gaps ? nhigh_on_off :
             not lookahead and gaps ? nhigh_off_on :
             not lookahead and not gaps ? nhigh_off_off : na
    nlow = lookahead and gaps ? nlow_on_on :
             lookahead and not gaps ? nlow_on_off :
             not lookahead and gaps ? nlow_off_on :
             not lookahead and not gaps ? nlow_off_off : na
    [nhigh, nlow]
    
[nhigh, nlow] = f_get_htfHighLow(resolution, HTFMultiplier, lookahead, gaps, offset)
[nhighlast, nlowlast] = f_get_htfHighLow(resolution, HTFMultiplier, lookahead, gaps, offset+1)
plot(nhigh , title="HTF High",style=plot.style_circles, color=color.green, linewidth=1) 
plot(nlow , title="HTF Low",style=plot.style_circles, color=color.red, linewidth=1)

buyCondition = nhigh > nhighlast and nlow > nlowlast
sellCondition = nhigh < nhighlast and nlow < nlowlast

strategy.entry("Buy", strategy.long, when= buyCondition and inDateRange, oca_name="oca_buy")
strategy.entry("Sell", strategy.short, when= sellCondition and inDateRange, oca_name="oca_sell")

```

> Detail

https://www.fmz.com/strategy/432807

> Last Modified

2023-11-21 17:07:17
