
> Name

Multi-Timeframe-Dynamic-Backtesting-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/cc31db9fca4cff7673.png)


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
