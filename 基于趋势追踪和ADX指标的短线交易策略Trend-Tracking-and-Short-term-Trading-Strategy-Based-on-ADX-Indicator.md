
> Name

基于趋势追踪和ADX指标的短线交易策略Trend-Tracking-and-Short-term-Trading-Strategy-Based-on-ADX-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/de86249efc62199530.png)
 [trans]

## 概述

该策略结合超趋势指标(Super Trend)、枢轴点(Pivot Points)和平均真实波幅(Average True Range, ATR)形成的动态止损线,以及平均方向指数(Average Directional Movement Index, ADX)指标,实现对趋势的判断和跟踪。策略适合短线交易,可以捕捉中间盘整理后的趋势延续部分,回撤控制也做得不错。

## 策略原理

超趋势指标结合枢轴点和ATR止损,判断价格突破动态止损线的方向来决定建仓方向。同时,ADX指标判断趋势力度,仅在趋势足够强劲时才发出交易信号。

具体来说,枢轴点先得到最新的支撑阻力,然后与前两日算术平均形成动态中间价。接着计算ATR并乘以ATR因子,再与动态中间价相加减,得到上轨和下轨。当价格突破上轨时看涨,突破下轨时看跌。ADX指标则判断趋势的力度,只有在趋势足够强劲时才参与交易。

止损线会根据最新价格和ATR值进行动态调整,能够很好地跟踪趋势。

## 优势分析

该策略具有以下优势:

1. 利用超趋势指标跟踪趋势运行方向,避免被震荡市锁定利润。

2. 借助ADX指标判断趋势力度,避免在盘整时造成错误交易。

3. 止损线动态调整,最大程度锁定利润。

4. 结合RSI避免过买过卖。

5. 整体来说,策略参数设定合理,在dframe选取上考虑了连续性,止盈止损设置也不错。

## 风险分析

该策略也存在一些风险:  

1. 超趋势指标和MA指标可能发出冲突信号。

2. ADX指标设定为14周期,对突发事件敏感度不足。

3. RSI参数设置为默认值,可能无法完全避免过买过卖。

4. 未考虑突发事件的影响,如重大利空/利好新闻。

对应解决方法:

1. 调整MA周期,使其与超趋势指标匹配。  

2. 尝试缩短ADX周期,增加对突发事件的敏感度。  

3. 优化RSI参数,寻找最佳值。

4. 加入新闻过滤模块,避开重大新闻发布。

## 优化方向  

该策略还可以从以下几个方面进行优化:

1. 增加机器学习模型判断趋势,使交易决策更加智能。

2. 尝试引入情绪指标等替代ADX指标判断趋势力度。

3. 增加自适应止损模块,让止损更加动态和精确。  

4. 借助深度学习技术提取更多特征,优化整体策略。

5. 利用高级语言如Python进行策略开发,增加策略的扩展性。

## 总结  

本策略整体来说非常实用,核心就是跟踪趋势运行方向,并在趋势足够强劲时参与。止损和止盈设置也做得很到位,最大程度锁定利润而避免亏损扩大。当然,仍有很大的优化空间,如果增加机器学习和深度学习技术,会使策略效果更出色,也更具有拓展性和通用性。

||

## Overview  

This strategy combines the Super Trend, Pivot Points and Average True Range (ATR) to form a dynamic stop loss line, and the Average Directional Movement Index (ADX) indicator to judge and track trends. The strategy is suitable for short-term trading and can capture the trend continuation after range-bound. The drawdown control is also decent.  

## Principle  

The Super Trend combined with Pivot Points and ATR stop loss judges the direction of price breaking through the dynamic stop loss line to determine the opening direction. At the same time, the ADX indicator judges the strength of the trend and only issues trading signals when the trend is strong enough.   

Specifically, the Pivot Points first obtain the latest support and resistance, and then form a dynamic middle price with the arithmetic mean of the previous two days. Then ATR is calculated and multiplied by the ATR factor, and then added to or subtracted from the dynamic middle price to obtain the upper and lower rails. When the price breaks through the upper rail, it is bullish. When it breaks through the lower rail, it is bearish. The ADX indicator judges the strength of the trend, and only participates in trading when the trend is strong enough.  

The stop loss line will be dynamically adjusted according to the latest price and ATR value, which can track the trend very well.  

## Advantage Analysis  

The strategy has the following advantages:

1. Use the Super Trend indicator to track the direction of trend running to avoid locking in profits by oscillating markets.

2. With the help of the ADX indicator to judge the strength of the trend, avoid errors in trading during consolidation.

3. The stop loss line is dynamically adjusted to maximize lock-in profits.  

4. Combine RSI to avoid overbuying and overselling.

5. Overall, the strategy parameter setting is reasonable. The selection of dframe considers continuity. The setting of take profit and stop loss is also good.

## Risk Analysis   

The strategy also has some risks:   

1. Super Trend and MA indicators may issue conflicting signals.  

2. The ADX indicator is set to 14 cycles, which is not sensitive enough to sudden events.

3. The RSI parameter is set to default, which may fail to completely avoid overbought and oversold. 

4. The impact of sudden events has not been considered, such as major bad/good news.

Corresponding solutions:

1. Adjust the MA cycle to match the Super Trend indicator.   

2. Try to shorten the ADX cycle to increase sensitivity to sudden events.

3. Optimize RSI parameters to find optimal values.  

4. Add news filter module to avoid major news releases.  

## Optimization   

The strategy can also be optimized in the following aspects:  

1. Add machine learning model to judge the trend, making trading decisions more intelligent.  

2. Try to introduce alternative emotional indicators instead of ADX to judge the strength of the trend.

3. Increase adaptive stop loss module to make stop loss more dynamic and accurate.   

4. Extract more features with deep learning technology to optimize the overall strategy.  

5. Use advanced languages ​​like Python for strategy development to increase strategy scalability.  

## Summary   

Overall, this strategy is very practical. The core is to track the direction of the trend run and participate when the trend is strong enough. The setting of stop loss and take profit is also very in place to maximize locking in profits while avoiding losses. Of course, there is still a lot of room for optimization. Adding machine learning and deep learning technology will make the strategy more effective and expandable.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|EMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|2|Pivot Point Period|
|v_input_3|2|ATR Factor|
|v_input_4|21|ATR Period|
|v_input_5|timestamp(1 Dec 2023)|Start Date|
|v_input_6|timestamp(12 Jan 2024)|End Date|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|false|Offset|
|v_input_9|14|length|
|v_input_10|30|overSold|
|v_input_11|65|overBought|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-15 00:00:00
end: 2024-01-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bendre ADX STrend", overlay = true)

///////////////////////////
// SuperTrend + Pivot Point
//////////////////////////

src =  input(close, title="EMA Source")
PPprd = input(defval = 2, title="Pivot Point Period")
AtrFactor=input(defval = 2, title = "ATR Factor")
AtrPd=input(defval = 21, title = "ATR Period")

StartDate = input(timestamp("1 Dec 2023"), title="Start Date")
EndDate = input(timestamp("12 Jan 2024"), title="End Date")
window()  => true

var float ph = na
var float pl = na
ph := ta.pivothigh(PPprd, PPprd)
pl :=ta.pivotlow(PPprd, PPprd)

float center = na
center := center[1]
// float lastpp = ph ? ph : pl ? pl : 0.0
float lastpp = na(ph) ? na(pl) ? na : pl : ph

if lastpp > 0
    if na(center)
        center := lastpp
    else
        center := (center * 2 + lastpp) / 3

Up = center - (AtrFactor * ta.atr(AtrPd))
Dn = center + (AtrFactor * ta.atr(AtrPd))

var float TUp = na
var float TDown = na
Trend = 0
TUp := close[1] > TUp[1] ? math.max(Up, TUp[1]) : Up
TDown := close[1] < TDown[1] ? math.min(Dn, TDown[1]) : Dn
Trend := close > TDown[1] ? 1: close < TUp[1]? -1: nz(Trend[1], 1)
Trailingsl = Trend == 1 ? TUp : TDown

// Lines
linecolor = Trend == 1 and nz(Trend[1]) == 1 ? color.lime : Trend == -1 and nz(Trend[1]) == -1 ? color.red : na
plot(Trailingsl, color = linecolor ,  linewidth = 2, title = "PP SuperTrend")

bsignalSSPP = close > Trailingsl
ssignalSSPP = close < Trailingsl


///////
// ADX
//////

lenADX = 14
th = 14
TrueRange = math.max(math.max(high-low, math.abs(high-nz(close[1]))), math.abs(low-nz(close[1])))
DirectionalMovementPlus = high-nz(high[1]) > nz(low[1])-low ? math.max(high-nz(high[1]), 0): 0
DirectionalMovementMinus = nz(low[1])-low > high-nz(high[1]) ? math.max(nz(low[1])-low, 0): 0
SmoothedTrueRange = 0.0
SmoothedTrueRange := nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1])/lenADX) + TrueRange
SmoothedDirectionalMovementPlus = 0.0
SmoothedDirectionalMovementPlus := nz(SmoothedDirectionalMovementPlus[1]) - (nz(SmoothedDirectionalMovementPlus[1])/lenADX) + DirectionalMovementPlus
SmoothedDirectionalMovementMinus = 0.0
SmoothedDirectionalMovementMinus := nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1])/lenADX) + DirectionalMovementMinus
DIPlus = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
DIMinus = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
DX = math.abs(DIPlus-DIMinus) / (DIPlus+DIMinus)*100
ADX = ta.sma(DX, lenADX)


//////
// MA
/////

lenMA = 21
srcMA = input(close, title="Source")
// offsetMA = input(title="Offset", type=input.integer, defval=0, minval=-500, maxval=500)
offsetMA = input(0, title="Offset")
outMA = ta.sma(srcMA, lenMA)

//
// RSI
//
length = input( 14 )
overSold = input( 30 )
overBought = input( 65 )
price = close
vrsi = ta.rsi(price, length)

//
// DMI - Direction Movement Index
// 
[diplus1, diminus1, adx] = ta.dmi(14, 14)

// Buy - Sell Entries
buy = bsignalSSPP and outMA < close and ADX > th
sell = ssignalSSPP 


if (buy and vrsi > overBought and adx > 19)
    // .order // Tuned version
    strategy.entry("Buy", strategy.long, when = window())
    // strategy.close("Sell", "close Sell")

if (sell) and (strategy.position_size > 0)
    // strategy.entry("Sell", strategy.short)
    strategy.close("Buy", "Close Buy")

if(sell and vrsi < overSold and adx > 25)
    strategy.entry("Sell", strategy.short, when = window())

if ( ta.crossover( diminus1, diplus1) or ((buy) and (strategy.position_size > 0)) )
    strategy.close("Sell", "close Sell")

// if(sell) and (diminus1 > diplus1) and adx > 23 and adx > adx[1] and (vrsi < overSold)
//     strategy.entry("Sell", strategy.short, when = window())

// if (strategy.position_size > 0 and ta.crossunder(diminus1, adx)) or (strategy.position_size > 0  and (buy))
//     strategy.close("Sell", "close Sell")




```

> Detail

https://www.fmz.com/strategy/439642

> Last Modified

2024-01-22 17:10:55
