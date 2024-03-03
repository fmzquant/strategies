
> Name

10EMA双重交叉趋势追踪策略10EMA-Double-Cross-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13247113d03535be2c3.png)
[trans]

## 概述

该策略是一个基于10EMA和50EMA双重交叉的趋势追踪策略。它结合了小时线的10EMA作为辅助判断,在牛熊交替的市场中 dynamically 找到趋势方向,实现自动追踪止损。

## 策略原理

策略的核心逻辑是基于10EMA和50EMA的金叉死叉。具体来说,当10EMA从下方上穿50EMA形成金叉时,判断行情进入上涨趋势;当10EMA从上方下穿50EMA形成死叉时,判断行情进入下跌趋势。

在金叉死叉后的1-5根K线内开仓做多做空。此外,策略还引入小时线的10EMA作为辅助判断,只有当小时线的10EMA处于上升趋势时才在金叉后开多仓,只有小时线的10EMA处于下降趋势时才在死叉后开空仓,从而过滤掉部分假signals。

在开仓后,策略采用追踪止损+限价停利的出场方式。追踪止损能够锁定利润并最大限度确保交易盈利;限价停利确保在价格达到目标点时关闭头寸获得利润。

## 策略优势

该策略最大的优势在于利用EMA交叉判断主要趋势方向的同时,还引入辅助指标过滤信号,能有效地过滤假交叉从而提高信号的可靠性。此外双重EMA交叉结合追踪止损和限价止盈,既能最大化追踪趋势收益,又能有效控制交易风险,整体风险收益比良好。

相比单一指标策略,该策略能更准确判断趋势方向和 amplitudes。与传统止损止盈相比,该策略采用更为先进的追踪止损技术,能更好地锁定利润。

## 风险分析

该策略主要面临 intermittent whipsaw 和趋势反转的风险。当出现连续的假交叉信号时,可能导致策略被套利。此外,在开仓后价格反转也会产生损失。

为了降低 whipsaw 的风险,策略加入辅助指标进行信号过滤。为了控制趋势反转的风险,策略采用较为宽容的止损范围,同时限价止盈设置也能帮助减少此类风险。当止损被触发时,还可考虑重新进入趋势方向。

## 优化方向

该策略还有几个可优化的方向:第一,可以测试不同参数组合,如EMA周期、开仓延迟根数等,寻找最优参数;第二,可以引入更多辅助指标,如MACD、BOLL等进行信号过滤,提高信号质量;第三,可以优化止损止盈逻辑,如采用时间止损、振荡止损等其他止损方式;第四,可以结合更多行情条件开启策略交易,如只在某些时间段或涨跌幅度下触发信号等。

## 总结

该10EMA双重交叉趋势追踪策略,通过EMA golden cross 和 death cross 判断当前趋势方向,设置追踪止损和限价止盈来锁定利润和控制风险,同时结合辅助指标过滤信号提高信号质量,是一种较为完备的趋势交易策略。相比单一指标和传统止盈止损,该策略具有判断准确、止盈止损优化等优势,能够有效获取趋势收益的同时控制风险,是一种适合常规交易账户的策略。当然该策略也还有一定改进空间,通过参数优化、加入更多辅助指标等方式可进一步增强策略表现。

||

## Overview

This strategy is a trend tracking strategy based on the double cross of 10EMA and 50EMA. It incorporates the 10EMA on the hourly chart as an auxiliary judgement to dynamically find the trend direction in the alternating bull and bear market, and achieve automatic tracking stop loss.

## Strategy Principle  

The core logic of the strategy is based on the golden cross and death cross of 10EMA and 50EMA. Specifically, when the 10EMA crosses above the 50EMA to form a golden cross, it is judged that the market has entered an uptrend; when the 10EMA crosses below the 50EMA to form a death cross, it is judged that the market has entered a downtrend.  

Open long or short positions within 1-5 bars after the golden cross or death cross. In addition, the strategy also introduces the 10EMA on the hourly chart as an auxiliary judgment. Long positions are opened only when the 10EMA on the hourly chart is in an upward trend after the golden cross, and short positions are opened only when the 10EMA on the hourly chart is in a downward trend after the death cross, thus filtering out some false signals.

After opening positions, the strategy adopts a profit-taking and stop loss method of tracking stop loss + limit order. Tracking stop loss can lock in profits and maximize profitability of transactions; limit orders ensure that positions are closed when prices reach the target to obtain profits.

## Advantage Analysis

The biggest advantage of this strategy is that while using EMA crosses to judge the main trend direction, it also introduces auxiliary indicators to filter signals, which can effectively filter false crosses to improve signal reliability. In addition, the double EMA cross combined with trailing stop loss and limit profit taking can both maximize tracking trend gains and effectively control trading risks with good overall risk-reward ratio.

Compared with single indicator strategies, this strategy can more accurately judge trend direction and amplitudes. Compared with traditional stop loss, this strategy adopts more advanced tracking stop loss technology to better lock in profits.  

## Risk Analysis

The main risks this strategy faces are intermittent whipsaws and trend reversals. When consecutive false crossing signals occur, the strategy may be scraped. In addition, price reversals after opening positions can also lead to losses.  

To reduce the risk of whipsaws, auxiliary indicators are added to filter the signals. To control the risk of trend reversal, a relatively tolerant stop loss range is adopted, and the limit profit setting also helps reduce this risk. When the stop loss is triggered, it is also possible to consider re-entering the trend direction.

## Optimization Directions

There are several optimization directions for this strategy: first, different parameter combinations such as EMA periods and position delay bars can be tested to find the optimal parameters; secondly, more auxiliary indicators such as MACD and BOLL can be introduced for signal filtering to improve signal quality; thirdly, stop loss and take profit logic can be optimized, such as adopting other stop loss methods like time stop loss and oscillating stop loss; fourthly, more market conditions can be combined to trigger strategy trading signals, such as only triggering signals during certain time periods or fluctuation ranges.


## Summary  

This 10EMA double cross trend tracking strategy judges the current trend direction through EMA golden crosses and death crosses, sets up tracking stop loss and limit profit taking to lock in profits and control risks, while combining auxiliary indicators to filter signals and improve signal quality. Compared with single indicator and traditional stop loss strategies, this strategy has advantages like accurate judgement, optimized stop profit mechanism, etc. It can effectively capture trend gains while controlling risks, making it suitable for conventional trading accounts. Of course there is still room for improvement for this strategy, such as further enhancing strategy performance through parameter optimization and introducing more auxiliary indicators.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|short ema|
|v_input_int_2|50|long ema|
|v_input_int_3|200|hourly 10 ema|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_4|false|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-22 00:00:00
end: 2023-12-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("10ema Strat 9", overlay=true, format=format.price)
//#region // inputs for candles
//time
t1 = time(timeframe.period,"0930-1500") //last hour of market is not ideal for trading
// candle status
bullish = close > open and barstate.isconfirmed
bearish = open > close and barstate.isconfirmed
bullcandle = ta.valuewhen(bullish, close, 0)
bearcandle = ta.valuewhen(bearish, close, 0)
ema1 = input.int(10, minval=1, title="short ema")
ema2 = input.int(50, minval=1, title="long ema")
ema3 = input.int(200, minval=1, title="hourly 10 ema")
//@variable Input for source
src = input(close, title="Source")
offsetema = input.int(title="Offset", defval=0, minval=-500, maxval=500)
sema = ta.ema(src, ema1)//@variable Input for smaller ema1
lema = ta.ema(src, ema2)//@variable Input for longer ema2
hema = ta.ema(src, ema3)// @variable Input for hourly ema3
bullcrosscount = ta.barssince(ta.crossover(sema,lema)) //@variable Input 10/50 cross higher
bearcrosscount = ta.barssince(ta.crossunder(sema,lema)) //@variable Input 10/50 cross lower
ideallong = bullcrosscount <= 5 //number of candles after the cross
idealshort = bearcrosscount <= 5 //number of candles after the cross

emabull = (sema > lema) and bearish and close > sema and close > hema and ideallong and t1 and barstate.isconfirmed
xemabull = ta.barssince(emabull)
dbullema = emabull and emabull[1] and xemabull <=1
bullentry = if dbullema
    ta.valuewhen(emabull[1], high + 0.05, 0)
else 
    ta.valuewhen(emabull, high + 0.05, 0)
bullentryh = dbullema ? bullentry[1] : bullentry
bullentrylow = ta.valuewhen(emabull, low - 0.05, 0)
bullstop = (bullentryh - bullentrylow) <= 1.00 ? bullentryh - 1.00 : (bullentryh - bullentrylow) <= 10.40 ? bullentrylow : na
bulltarget = (bullentryh - bullstop) * 1.62 + bullentryh

// bear setup
emabear = (sema < lema) and bullish and close < sema and close < hema and idealshort and t1 and barstate.isconfirmed
xemabear = ta.barssince(emabear)
dbearema = emabear and emabear [1] and xemabear <=1
bearentry = if dbearema
    ta.valuewhen(emabear[1], low - 0.05, 0)
else
    ta.valuewhen(emabear, low - 0.05, 0)
bearentryh = dbearema ? bearentry[1] : bearentry
bearentryhigh = ta.valuewhen(emabear, high + 0.05, 0)
bearstop = (bearentryhigh - bearentryh) <= 1.00 ? bearentryh + 1.00 : (bearentryh - bearentryhigh) <= 10.40 ? bearentryhigh : na
beartarget = bearentryh - (bearstop-bearentryh) * 1.62

bullclose = (xemabull <=7) and bullish and bullcrosscount >=1 and barstate.isconfirmed //number of candles for a close above
bearclose = (xemabear <=7) and bearish and bearcrosscount >=1 and barstate.isconfirmed //number of candles for a close below
buyzone = ta.barssince(bullclose)
shortzone =  ta.barssince(bearclose)
idealbuy = close >= bullentryh and bullclose and (buyzone<=7)
idealsell = close <= bearentryh and bearclose and (shortzone<=7)

// // bull setup on chart
// if sema > lema and xemabull < 50
//     var line line_bullentry = line.new(bar_index, na, bar_index + 1, na, color=color.rgb(0, 200, 0), style=line.style_solid, width=1)
//     if emabull
//         line.set_xy1(line_bullentry, x=bar_index, y=bullentryh)
//         line.set_xy2(line_bullentry, x=bar_index, y=bullentryh)
//         alert("EMA-bullish", alert.freq_once_per_bar_close)
//     line.set_x2(line_bullentry, x=bar_index)
//     var line line_bullstop = line.new(bar_index, na, bar_index + 1, na, color=color.rgb(250, 0, 0), style=line.style_solid, width=1)
//     if emabull
//         line.set_xy1(line_bullstop, x=bar_index, y=bullstop)
//         line.set_xy2(line_bullstop, x=bar_index, y=bullstop)
//     line.set_x2(line_bullstop, x=bar_index)    
//     var line line_bulltarget = line.new(bar_index, na, bar_index + 1, na, color=color.rgb(200, 100, 200), style=line.style_solid, width=1)
//     if emabull
//         line.set_xy1(line_bulltarget, x=bar_index, y=bulltarget)
//         line.set_xy2(line_bulltarget, x=bar_index, y=bulltarget)
//     line.set_x2(line_bulltarget, x=bar_index)

// //bear setup on chart
// if sema < lema and xemabear < 50
//     var line line_bearentry = line.new(bar_index, na, bar_index, na, color=color.rgb(0, 200, 0), style=line.style_solid, width=1)
//     if emabear
//         line.set_xy1(line_bearentry, x=bar_index, y=bearentryh)
//         line.set_xy2(line_bearentry, x=bar_index, y=bearentryh)
//         alert("EMA-bearish", alert.freq_once_per_bar_close)
//     line.set_x2(line_bearentry, x=bar_index)
//     var line line_bearstop = line.new(bar_index, na, bar_index, na, color=color.rgb(250, 0, 0), style=line.style_solid, width=1)
//     if emabear
//         line.set_xy1(line_bearstop, x=bar_index, y=bearstop)
//         line.set_xy2(line_bearstop, x=bar_index, y=bearstop)
//     line.set_x2(line_bearstop, x=bar_index)
//     var line line_beartarget = line.new(bar_index, na, bar_index, na, color=color.rgb(200, 100, 200), style=line.style_solid, width=1)
//     if emabear
//         line.set_xy1(line_beartarget, x=bar_index, y=beartarget)
//         line.set_xy2(line_beartarget, x=bar_index, y=beartarget)
//     line.set_x2(line_beartarget, x=bar_index)

//#endregion
//execution 
if idealbuy
    strategy.close("sell", comment=na)	
    strategy.entry("buy", strategy.long, limit=bullentryh, stop=bullstop, comment="buy")
strategy.exit("exit","buy", trail_points = low, trail_offset = 5, qty_percent=100, limit=bulltarget, stop=bullstop)

if idealsell
	strategy.close("buy",comment=na)
    strategy.entry("sell", strategy.short, limit=bearentryh, stop=bearstop, comment="sell")
strategy.exit("exit","sell", trail_points = low, trail_offset = 5, qty_percent=100, limit=beartarget, stop=bearstop)
// strategy.close_all(time == close_day) 
//#region // graphical analysis
//Plots
plotshape(emabull, location=location.belowbar, title='emabull')
plotshape(idealbuy, style=shape.circle, color=color.green, title="bull close")
plotshape(emabear, title='emabear')
plotshape(idealsell, location=location.belowbar, style=shape.circle, color=color.red, title="bear close")

// //Dashboard
// var label id = na
// label.delete(id)   // Delete last label
// i_offsetLabel = input(15, "Data Dashboard Offset") 
// offset = i_offsetLabel * (time - time[1])
// dynamicText = "= Bull Setup ="
// id := label.new(x=time + offset, y=open, xloc=xloc.bar_time, text=dynamicText, color=color.rgb(255, 255, 255), size=size.normal)
// label.set_textcolor(id, color.rgb(0, 0, 0))
// label.set_text(id=id, text=dynamicText)
// label.set_textalign(id, text.align_left)
// label.set_text(id=id, text=dynamicText)
// f_round( _val, _decimals) => 
//     _p = math.pow(10, _decimals)
//     math.round(math.abs(_val) * _p) / _p * math.sign(_val)
// dynamicText := dynamicText + "\n" + str.tostring(f_round(bulltarget,2)) + "  :Target"
// label.set_text(id=id, text=dynamicText)
// dynamicText := dynamicText + "\n" + str.tostring(f_round(bullentryh,2)) + "  :Entry"
// label.set_text(id=id, text=dynamicText)
// dynamicText := dynamicText + "\n" + str.tostring(f_round(bullstop,2)) + "  :Stop"
// label.set_text(id=id, text=dynamicText)
// dynamicText := dynamicText + "\n"
// label.set_text(id=id, text=dynamicText)
// dynamicText := dynamicText + "\n" + "= Bear Setup ="
// label.set_text(id=id, text=dynamicText)
// dynamicText := dynamicText + "\n" + str.tostring(f_round(bearstop,2)) + "  :Stop"
// label.set_text(id=id, text=dynamicText)
// dynamicText := dynamicText + "\n" + str.tostring(f_round(bearentryh,2)) + "  :Entry"
// label.set_text(id=id, text=dynamicText)
// dynamicText := dynamicText + "\n" + str.tostring(f_round(beartarget,2)) + "  :Target"
// label.set_text(id=id, text=dynamicText)
// //#endregion
```

> Detail

https://www.fmz.com/strategy/437021

> Last Modified

2023-12-29 16:03:55
