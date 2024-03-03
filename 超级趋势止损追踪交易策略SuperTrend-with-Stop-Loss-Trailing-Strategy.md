
> Name

超级趋势止损追踪交易策略SuperTrend-with-Stop-Loss-Trailing-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用超级趋势指标判断价格趋势,并配以止损机制进行趋势追踪交易。它结合两个移动平均的差值构建超级趋势指标,指标上穿做多,下穿做空。同时设置止损线,避免亏损过大。

## 策略原理

计算快线和慢线的DEMA,根据两线差值确定超级趋势方向。在上升趋势中,快线上穿慢线做多;下降趋势中,快线下穿慢线做空。入场后,设置止损线,一旦亏损达到止损幅度则止损出场。

## 优势分析

- 超级趋势判断价格趋势简单有效
- 止损机制有效控制单笔交易风险
- 可根据不同阶段使用不同参数组合
- 回撤控制能力较强

## 风险分析

- 移动平均判断趋势存在滞后
- 止损点设置过于宽松可能扩大损失
- 交易频次较高,手续费负担重
- 无法准确判断趋势反转点

可适当缩短平均线周期,优化止损幅度,减少交易次数等来控制风险。

## 优化方向

- 测试不同快慢线参数组合
- 优化止损幅度参数
- 考虑结合其他指标判断趋势反转
- 在不同品种中测试参数健壮性

## 总结

该策略使用简单指标判断趋势方向,止损控制风险,适合日内交易。可通过参数调优等进一步提高效果。

||

## Overview 

This strategy uses the SuperTrend indicator to determine price trend and incorporates a stop loss mechanism for trend following trades. SuperTrend is constructed from two moving averages. Go long on upward crossover and short on downward crossover. A stop loss is set to avoid excessive losses.

## Strategy Logic

Calculate DEMA of fast and slow lines. SuperTrend direction is determined from the difference between the two lines. In uptrends, fast line crossing above slow line signals long entry. In downtrends, fast line crossing below slow line signals short entry. After entry, a stop loss line is set. If loss reaches stop loss percentage, position is closed.

## Advantages

- SuperTrend effectively determines price trend 
- Stop loss controls single trade risk
- Different parameter sets can be used for different periods
- Good drawdown control ability

## Risks 

- Moving averages lag in trend detection
- Stop loss set too wide may expand losses
- High trade frequency increases transaction costs
- Exact reversal points cannot be accurately determined  

Risks can be mitigated by shortening moving average periods, optimizing stop loss percentage, reducing trade frequency etc.

## Enhancements

- Test different fast/slow line parameter combinations
- Optimize stop loss percentage
- Consider adding other indicators to determine trend reversal
- Test robustness across different products 

## Conclusion

This simple strategy uses indicators for trend direction and stop loss for risk control, suitable for intraday trading. Performance can be further improved through parameter tuning.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Length|
|v_input_2|4|Multiplier|
|v_input_3|4|fastPeriod|
|v_input_4|31|slowPeriod|
|v_input_5|98|resolution|
|v_input_6|2|stopLossPercentage|
|v_input_7|3|letItRidePercentage|
|v_input_8|4|Uptrend FastPeriod|
|v_input_9|16|Uptrend SlowPeriod|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-09-13 00:00:00
period: 2m
basePeriod: 1m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title = "[Prod] SuperTrend with Stoploss+TrendZones - 1H", default_qty_type=strategy.percent_of_equity, default_qty_value=100, shorttitle = "[Prod] SuperTrend with Stoploss+TrendZones - 1H", overlay = true, commission_type=strategy.commission.percent, commission_value=0.3)
//--cyberfunk 2018 
 
////////////////////////////////////////////////////////////
// This section of code was borrowed from "Trend Trader Strategy" to 
// help us det. if we are in an uptrend or downtrend.
////////////////////////////////////////////////////////////
Length = input(12, minval=1),   // 19 / 5 also works for lenth /multiplier... but 11 /4 seems slightly more optimal somehow
Multiplier = input(4, minval=1)
avgTR      = wma(atr(1), Length)
highestC   = highest(Length)
lowestC    = lowest(Length)
hiLimit = highestC[1]-(avgTR[1] * Multiplier)
loLimit = lowestC[1]+(avgTR[1] * Multiplier)
ret = na
pos =na
ret := iff(close > hiLimit and close > loLimit, hiLimit,iff(close < loLimit and close < hiLimit, loLimit, nz(ret[1], 0)))
pos :=	iff(close > ret, 1,iff(close < ret, -1, nz(pos[1], 0))) 
//barcolor(pos == -1 ? red: pos == 1 ? green : blue )
plot(ret, color= blue , title="Trend Trader Strategy")
uptrend = if close > ret  // this will be used later to determine which domain we are in (uptrend or downtrend)
    true
else
    false
/////////////////////////////////////////////////////////////////////
// This script has been optimized for the 1 hr candle window view.  
// An older Pine2 ancestor of this script suffered from repainting issues when 
// viewing in lower resolutions than the res/2 parameter.
// running this in Pine3 mode seems to fix those problems, see https://www.tradingview.com/wiki/Pine_Script:_Release_Notes#Pine_Version_3  and https://backtest-rookies.com/2017/11/29/tradingview-indicator-repainting/ for references on the problem. 
//
//  There does seem to be ocassional repainting that affects backtrading here though, somehow.. and i'm not sure how to fix it.  V3 SHOULD have made it impossible.  Any help appreciated.
//
// Also note that the length of the DEMA sampling shouldn't be longer than a 
// candle, which could happen if you made resolution > chartres^2.  For example,
// a chartres=5min and a res=30 setting would cause sampling = 6, which is longer
// than the length of a candle (5 min, b/c chartres=5 min)
/////////////////////////////////////////////////////////////////////


fastPeriod    = input(title="fastPeriod",defval=4, minval=1)
slowPeriod = input(title="slowPeriod",defval=31, minval=1) 
resInteger = input(title="resolution",defval=98)
// The parameters above that work well highly oscillating sideways markets,
// struggle with longer-term trends, particularly strong ones, where there's the
// potential for a lot of loss or strong gain. To make sure we don't get burned 
// by long term losses, a stoploss mechanism is implemented to compensate.
// *stoplossPercent* is the point at which it becomes useful to "panic sell".
// *letitRidePercent* is the point beyond which it's more profitable NOT to panic sell.
// Like the periods, these values will have to be tuned to a particuliar market behavior.
stoplossPercent    = input(title="stopLossPercentage",type=float,defval=2, minval=1, maxval=100)
letitRidePercent = input(title="letItRidePercentage",type=float,defval=3, minval=1, maxval=100)

//To try to recapture the value of the long term strong-uptrends, first we 
// detected when we are in strong uptrend mode, by using an indicator (uptrend?)
// Then, if we are in strong uptrend mode, we use a different
// set of variables for fast/slow periods that's better suited to that situation.

uptrendFastPeriod = input(title="Uptrend FastPeriod",defval=4, minval=1) 
uptrendSlowPeriod = input(title="Uptrend SlowPeriod",defval=16, minval=1) 
//uptrendResInteger = input(title="Uptrend resolution",defval=98)

// Now that we have everything setup, for each bar we calculate the difference of emas for the downtrend/uptrend situations
res = tostring(resInteger) 
sampling =  (resInteger / timeframe.period )
demaFastNormal = security(syminfo.tickerid, res, 2 * ema(close, fastPeriod) - ema(ema(close, fastPeriod), fastPeriod))
demaSlowNormal = security(syminfo.tickerid,res, 2 * ema(close, slowPeriod) - ema(ema(close, slowPeriod), slowPeriod)  )
demaFastUT = security(syminfo.tickerid, res, 2 * ema(close, uptrendFastPeriod) - ema(ema(close, uptrendFastPeriod), uptrendFastPeriod))
demaSlowUT = security(syminfo.tickerid,res, 2 * ema(close, uptrendSlowPeriod) - ema(ema(close, uptrendSlowPeriod), uptrendSlowPeriod)  )

// now, based on our uptrend indicator, we decide which of the two line pairs to
// use to determine the crossover signals that tell us to buy/sell.
demaFast = uptrend? demaFastUT:demaFastNormal
demaSlow =  uptrend? demaSlowUT:demaSlowNormal


//  Now, we calculate the crossover signals.
// **IMPORTANT TRADING NOTE** :  You should buy/sell on the CLOSE of the
// highlighted bar with the  signal, to adhere to back-tested results!
// (Technically, the open of the NEXT bar, but these are usually effectively the same.)  
// Note that if you check "calculate on every tick", you might be decieved until 
// you reload the page, this is NOT, however, a repaint issue, as after the bar 
// after the signal closes there is a consistent buy/sell indicator at the open 
// price of the bar after the the signal, which is basically as close to same as
// the close price of the signal (red/green highlighted) bar.

buy = crossover(demaSlow[sampling], demaFast[sampling])
stoploss = ( strategy.openprofit <-1*stoplossPercent/100*strategy.equity) and not ( strategy.openprofit < -1*letitRidePercent/100*strategy.equity )
sell = strategy.opentrades!=0 and (crossunder(demaSlow[sampling], demaFast[sampling]) or crossover(ret,close) ) and not stoploss // "and not stoploss" here helps us not over-color when both conditions are true.  The stoploss is more interesting than a regular sell condition


///////////////////////////////////////
// PLOTTING SECTION 
// This is a collected place for Plotting and coloring all the things 
// for easy toggling on/off.
///////////////////////////////////////

//plot(buyPrice, title="BuyPriceLine", color = purple )   // For a study, this replaces the strategy.openprofit way to guard against stoploss
plot(demaFast)   // These are the crossover lines that trigger the buy/sell
plot(demaSlow)




bgcolor( buy ? lime : na, transp=50)
bgcolor( stoploss ? orange : na, transp=10)
bgcolor( sell ? red : na, transp=50)
bgcolor( strategy.openprofit < -1*letitRidePercent/100*strategy.equity ? purple : na, transp= 50)

bgcolor( demaSlow[sampling]> demaFast[sampling]  ? lime : na, transp=96)
bgcolor( demaSlow [sampling]< demaFast[sampling]  ? red : na, transp=99)

// the below is for backtesting from different timeframes.  By default it is set to 1/1/2017 at 1:00 AM
startdate=timestamp(2017, 01, 01, 01, 00)   // year , month, day, hour, minute

strategy.entry("BUY", strategy.long, when = buy and (time>=startdate) )
strategy.close("BUY", when = sell or stoploss)


```

> Detail

https://www.fmz.com/strategy/427139

> Last Modified

2023-09-18 16:05:31
