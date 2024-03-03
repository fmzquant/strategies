
> Name

基于Heikin-Ashi的超级趋势-trailing-stop损策略SuperTrend-Trailing-Stop-Strategy-Based-on-Heikin-Ashi

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e917a2a060a288d2aa.png)
[trans]
### 策略概述

该策略是一个结合Heikin Ashi蜡烛线和超级趋势指标的趋势跟踪止损策略。它利用Heikin Ashi蜡烛线过滤市场噪音,超级趋势指标判断趋势方向,并以超级趋势作为动态止损线,实现高效的趋势跟踪和风险控制。

### 策略原理

1. 计算Heikin Ashi蜡烛线:包括开盘价、收盘价、最高价、最低价。
2. 计算超级趋势指标:根据ATR和价格计算上轨和下轨。
3. 结合Heikin Ashi蜡烛线和超级趋势判断趋势方向。
4. 当Heikin Ashi收盘价较前一根K线收盘价更接近超级趋势的上轨时为看涨趋势;当Heikin Ashi收盘价较前一根K线收盘价更接近超级趋势的下轨时为看跌趋势。
5. 在看涨趋势中,以超级趋势上轨作为追踪止损线;在看跌趋势中,以超级趋势下轨作为追踪止损线。

### 策略优势

1. 利用Heikin Ashi过滤假突破,识别趋势信号更可靠。
2. 超级趋势作为动态止损,最大程度锁定趋势获利,避免回撤过大。 
3. 结合不同时间周期判断多空,确认高低位信号更可靠。
4. 定时平仓功能避免特定时间的非理性行情影响。

### 策略风险

1. 趋势反转时容易止损。可适当宽松止损线降低此风险。
2. 超级趋势参数设置不当可能导致止损过宽或过窄。可测试不同参数组合。 
3. 未考虑资金管理问题。应设置仓位控制。
4. 未考虑交易成本。应测算成本影响。

### 策略优化方向

1. 优化超级趋势参数组合,寻找最优参数。
2. 增加仓位控制功能。
3. 增加成本考量,如手续费、滑点等。
4. 可根据趋势强弱灵活调整止损幅度。
5. 考虑结合其他指标过滤入场信号。

### 总结

该策略整合Heikin Ashi和超级趋势两个指标的优点,能捕捉趋势方向,同时利用超级趋势实现自动化的动态跟踪止损,从而锁定趋势利润。策略风险主要来自趋势反转和参数优化,这两个方面都可通过进一步优化获得改进。总体来说,该策略利用指标整合提高了交易系统的稳定性和收益空间。

||

### Strategy Overview

This strategy combines the Heikin Ashi candlesticks and the SuperTrend indicator into a trend following strategy with trailing stop loss. It uses Heikin Ashi to filter out market noise and SuperTrend to determine the trend direction, while taking SuperTrend as a dynamic stop loss line to efficiently track the trend and control risks.

### Strategy Logic

1. Calculate Heikin Ashi candlesticks: open, close, high, low prices.
2. Calculate SuperTrend indicator: upper band and lower band based on ATR and price.  
3. Determine the trend direction combining Heikin Ashi close and SuperTrend bands.
4. When Heikin Ashi close gets closer to SuperTrend upper band, it signals an uptrend; when Heikin Ashi close gets closer to SuperTrend lower band, it signals a downtrend.
5. Use SuperTrend upper band as trailing stop loss in uptrends, and lower band in downtrends.

### Advantages

1. Heikin Ashi filters out false breakouts, leading to more reliable signals.  
2. SuperTrend as dynamic stop loss locks in profits along the trend to avoid huge drawdowns.
3. Combining timeframes confirms high/lows more precisely.  
4. Scheduled exit avoids irrational moves at certain times.

### Risks

1. Prone to stop out at trend reversal. Can loosen stop loss to mitigate.
2. Improper tuning of SuperTrend params can lead to stop loss too wide or too narrow. Need exhaustive parameter testing.  
3. Ignores position sizing. Should set proper bet size control. 
4. Ignores trading costs. Should account for costs.

### Enhancement Opportunities 

1. Optimize SuperTrend parameters for best performance.
2. Add position sizing control. 
3. Account for costs like commissions and slippage.
4. Flexibly adjust stop loss based on trend strength.
5. Add filters with other indicators to entry signals.  

### Conclusion

This strategy combines the strengths of Heikin Ashi and SuperTrend to identify trend directions and automatically trail the trend with dynamic stop loss to lock in profits. Main risks come from trend reversal and parameter tuning. Further optimizations on these two aspects can improve strategy performance. Overall this strategy demonstrates how indicator integration can enhance stability and profitability of trading systems.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|ATR Period|
|v_input_2|2|ATR Multiplier|
|v_input_3|240|Higher Time Frame|
|v_input_4|20|CCI|
|v_input_5|5|ATR|
|v_input_6|true|ATR Multiplier|
|v_input_7|false|original coloring|
|v_input_8|15|Exit Hour Of Day|
|v_input_9|15|Exit Minute Of Day|
|v_input_10|true|Highlight Background Color?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-06 00:00:00
end: 2024-02-05 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ringashish

//@version=4
strategy("sa-strategy with HTF-TSL", overlay=true)


Pd = input(title="ATR Period", type=input.integer, defval=4)
Factor = input(title="ATR Multiplier", type=input.float, step=0.1, defval=2)
ST= supertrend(Factor, Pd)

heikinashi_close = security(heikinashi(syminfo.tickerid), timeframe.period, close)
heikinashi_low = security(heikinashi(syminfo.tickerid), timeframe.period, low)
heikinashi_open = security(heikinashi(syminfo.tickerid), timeframe.period, open)
heikinashi_high = security(heikinashi(syminfo.tickerid), timeframe.period, high)

heikinashi_close30 = security(heikinashi(syminfo.tickerid), "30", close)
//res1 = input("30", type=input.resolution, title="higher Timeframe")


//CCI TSL

res = input("240",type=input.resolution,title = "Higher Time Frame")
CCI = input(20)
ATR = input(5)
Multiplier=input(1,title='ATR Multiplier')
original=input(false,title='original coloring')
thisCCI = cci(close, CCI)
lastCCI = nz(thisCCI[1])


calcx()=> 
    bufferDn= high + Multiplier * sma(tr,ATR)
    bufferUp= low - Multiplier * sma(tr,ATR)
    if (thisCCI >= 0 and lastCCI < 0) 
        bufferUp := bufferDn[1]
    if (thisCCI <= 0 and lastCCI > 0) 
        bufferDn := bufferUp[1]

    if (thisCCI >= 0)
        if (bufferUp < bufferUp[1])
            bufferUp := bufferUp[1]
    else
        if (thisCCI <= 0)
            if (bufferDn > bufferDn[1])
                bufferDn := bufferDn[1]

   
    x = 0.0
    x := thisCCI >= 0 ?bufferUp:thisCCI <= 0 ?bufferDn:x[1]
    x

tempx = calcx()

calcswap() =>
    swap = 0.0
    swap := tempx>tempx[1]?1:tempx<tempx[1]?-1:swap[1]
    swap

tempswap = calcswap()

swap2=tempswap==1?color.blue:color.orange
swap3=thisCCI >=0 ?color.blue:color.orange
swap4=original?swap3:swap2

//display current timeframe's Trend

plot(tempx,"CTF",color=swap4,transp=0,linewidth=2, style = plot.style_stepline)


htfx = security(syminfo.tickerid,res,tempx[1],lookahead = barmerge.lookahead_on)
htfswap4 = security(syminfo.tickerid,res,swap4[1],lookahead = barmerge.lookahead_on)

plot(htfx,"HTF",color=htfswap4,transp=0,linewidth=3,style = plot.style_stepline)









//supertrend
Supertrend(Factor, Pd) =>
    Up=hl2-(Factor*atr(Pd))
    Dn=hl2+(Factor*atr(Pd))
    
    TrendUp = 0.0
    TrendUp := heikinashi_close[1]>TrendUp[1] ? max(Up,TrendUp[1]) : Up
    TrendDown = 0.0
    TrendDown := heikinashi_close[1]<TrendDown[1]? min(Dn,TrendDown[1]) : Dn
    Trend = 0.0
    Trend := heikinashi_close > TrendDown[1] ? 1: heikinashi_close< TrendUp[1]? -1: nz(Trend[1],1)
    Tsl = Trend==1? TrendUp: TrendDown
    
    S_Buy = Trend == 1 ? 1 : 0
    S_Sell = Trend != 1 ? 1 : 0
    
    [Trend, Tsl]

[Trend,Tsl] = Supertrend(Factor, Pd)
// Security
//ST1_Trend_MTF = security(syminfo.tickerid, res1, Tsl,barmerge.lookahead_on)
//plot(ST1_Trend_MTF, "higher ST") 

crossdn = crossunder(heikinashi_close,Tsl) or crossunder(heikinashi_close[1],Tsl) or crossunder(heikinashi_close[2],Tsl) or heikinashi_close < Tsl
crossup = crossover(heikinashi_close,Tsl) or crossover(heikinashi_close[1],Tsl) or crossover(heikinashi_close[2],Tsl) or heikinashi_close > Tsl
plot(Tsl,"ST",color = color.black,linewidth =2)
plot(ema(heikinashi_close,20),"EMA 20",color=color.red)
plot(hma(heikinashi_close,15),"HMA 15",color=color.green)
plot(ema(heikinashi_close,15),"EMA 15",color=color.black)

closedown = (heikinashi_close < hma(heikinashi_close,15) and heikinashi_high > hma(heikinashi_close,15)) or(heikinashi_close < ema(heikinashi_close,20) and heikinashi_high > ema(heikinashi_close,20))
closeup = (heikinashi_close > hma(heikinashi_close,15) and heikinashi_low < hma(heikinashi_close,15)) or (heikinashi_close > ema(heikinashi_close,20) and heikinashi_low < ema(heikinashi_close,20))

buy = heikinashi_open == heikinashi_low and closeup and crossup  and close > htfx
//buy = heikinashi_open == heikinashi_low and heikinashi_close > ema(close,20) and heikinashi_low < ema(close,20) and crossup
buyexit = cross(close,tempx) //heikinashi_open == heikinashi_high //and heikinashi_close < ema(close,15) and heikinashi_high > ema(close,15)

//if heikinashi_close30[1] < ST1_Trend_MTF
//sell = heikinashi_open == heikinashi_high and heikinashi_close < ema(close,20) and heikinashi_high > ema(close,20) and rsi(close,14)<60 and crossdn
sell = heikinashi_open == heikinashi_high and closedown and rsi(close,14)<55 and crossdn  and close < htfx
sellexit = cross(close,tempx) //heikinashi_open == heikinashi_low //and heikinashi_close > ema(close,15) and heikinashi_low < ema(close,15)

rg = 0
rg := buy ? 1 : buyexit ? 2 : nz(rg[1])

longLogic = rg != rg[1] and rg == 1 
longExit = rg != rg[1] and rg == 2 

//plotshape(longExit,"exit buy",style = shape.arrowup,location = location.belowbar,color = color.red, text ="buy exit", textcolor = color.red)
//plotshape(longLogic,"BUY",style = shape.arrowup,location = location.belowbar,color = color.green, text ="buy", textcolor= color.green)

nm = 0
nm := sell ? 1 : sellexit ? 2 : nz(nm[1])

shortLogic = nm != nm[1] and nm == 1 
shortExit = nm != nm[1] and nm == 2 

//plotshape(shortExit,"exit sell",style = shape.arrowup,location = location.belowbar,color = color.red, text ="sell exit", textcolor = color.red)
//plotshape(shortLogic,"SELL",style = shape.arrowup,location = location.belowbar,color = color.green, text ="sell", textcolor= color.green)


//Exit at particular time

ExitHour = input(title="Exit Hour Of Day", type=input.integer, defval=15, step = 5, maxval = 24, minval = 0)
ExitMint = input(title="Exit Minute Of Day", type=input.integer, defval=15, step = 5, maxval = 24, minval = 0)
bgc = input(title="Highlight Background Color?", type=input.bool, defval=true)
mRound(num,rem) => (floor(num/rem)*rem)
exitTime = (hour(time) >= ExitHour and (minute == mRound(ExitMint, timeframe.multiplier))) ? 1 : 0
exitTime := exitTime == 0 ? (hour(time) >= ExitHour and (minute + timeframe.multiplier >= ExitMint)) ? 1 : 0 : exitTime

MarketClose =  exitTime and not exitTime[1]

alertcondition(exitTime and not exitTime[1], title="Intraday Session Close Time", message="Close All Positions")
bgcolor(exitTime and not exitTime[1] and bgc ? #445566 : na, transp =40)



longCondition = longLogic
if (longCondition)
    strategy.entry("long", strategy.long)
 
    


shortCondition = shortLogic
if (shortCondition)
    strategy.entry("short", strategy.short)
    

strategy.close("short", when =cross(close,tempx)  or MarketClose)
strategy.close( "long", when =cross(close,tempx) or MarketClose ) 
```

> Detail

https://www.fmz.com/strategy/441178

> Last Modified

2024-02-06 14:43:14
