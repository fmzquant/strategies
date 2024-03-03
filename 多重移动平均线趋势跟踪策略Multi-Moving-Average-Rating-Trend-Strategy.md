
> Name

多重移动平均线趋势跟踪策略Multi-Moving-Average-Rating-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11b1c922d9d4407e7d7.png)

[trans]

## 概述

该策略通过采用多种不同类型的移动平均线,对价格走势进行多角度分析判断,形成综合评级信号,以决定开仓方向。策略具有getParameter优势:1)多种移动平均线形成评级体系,提高判断准确性;2)可以灵活调整评级体系的参数,适应不同品种;3)可配置入场评级条件,控制风险。

## 策略原理  

1. 该策略总共采用了17种不同类型的移动平均线,包括SMA、EMA、ALMA、SMMA、LSMA、VWMA、DEMA、HMA、KAMA、TEMA、ZLEMA、TRIMA、T3等。

2. 对每种移动平均线,判断其与收盘价的关系,如果移动平均线低于收盘价,给予1分评级,如果高于收盘价,给予-1分评级。如果无法判断,则不给分。

3. 将所有移动平均线的评级结果进行求和,再除以可以评级的移动平均线数量,得到综合评级。

4. 比较综合评级与入场评级阈值,决定开仓方向。如果综合评级达到做多阈值,做多;如果达到做空阈值,做空。

5. 采用不同周期的移动平均线,可以判断短期和长期趋势;采用不同类型的移动平均线,可以提供更丰富的技术指标参考,实现多角度判断。

## 策略优势

1. 多种移动平均线评级,提高准确性

   相比单一或几种移动平均线,该策略采用17种不同的移动平均线进行评级,可以从更多角度判断市场趋势方向,减少某一种指标的偏差带来的不准确判断。多种指标参与评级,可以提高最终结果的可靠性。

2. 评级体系的参数可配置,适应不同品种

   评级体系中的移动平均线周期数、评级阈值都可以通过参数进行设置,使策略可以灵活适应不同交易品种的特点,有利于优化。

3. 可配置入场评级条件,控制风险

   策略允许配置做多做空的入场评级阈值。当综合评级达到阈值时才发出信号,可以避免在市场不明朗时的错误开仓。合理的入场阈值设置有助于减少不必要的交易次数,控制风险。

## 风险及解决方法

1. 单一品种效果可能不佳

   该策略的参数设置针对总体市场设计,对某一特定品种可能不太适用。解决方法是针对不同品种单独优化参数。

2. 多空混乱市场下出错率较高

   当市场处于多空混乱状态时,该策略容易产生错误信号。解决方法是在这种市场状况下,提高入场评级阈值,减少交易次数。

3. 长期运行可能需要定期优化参数

   市场环境持续变化,固定的参数设置会导致策略效果变差。建议每隔一段时间重新测试优化下参数,保证策略效果。

## 优化方向

1. 增加其他指标参与评级,如波动率指标、成交量指标等,提供更多维度的判断依据。

2. 对不同品种分别测试参数优化,提高策略适应力。

3. 设置回测周期较长,如半年、一年,观察参数效果维持时间。

4. 研究不同移动平均线在不同周期下的实际效果,选择组合更优。

5. 尝试机器学习方法以自动优化参数。

## 总结

该策略通过建立多种移动平均线的评级体系,实现了多角度判断市场趋势的效果。策略具有可配置参数的优势,可以灵活适应不同品种,也可以通过参数调整来控制策略的风险态度。此外,评级体系可以不断优化和完善,继续提高策略表现。总体来说,该策略利用了多种技术指标的效果,形成较强的趋势跟踪能力。

|| 

## Overview

This strategy analyzes price trends from multiple angles by adopting various types of moving averages, forming a comprehensive rating signal to determine the opening direction. The strategy has the following advantages: 1) Multiple moving averages form a rating system to improve judgment accuracy; 2) Flexible adjustment of rating system parameters to adapt to different varieties; 3) Configurable entry rating conditions to control risks.

## Strategy Logic

1. The strategy uses a total of 17 different types of moving averages, including SMA, EMA, ALMA, SMMA, LSMA, VWMA, DEMA, HMA, KAMA, TEMA, ZLEMA, TRIMA, T3, etc.

2. For each moving average, judge its relationship with the closing price. If the moving average is lower than the closing price, give 1 rating point. If higher, give -1 rating point. If unable to determine, give no rating.

3. Sum up all the ratings of the moving averages, and divide by the number of ratable moving averages, to get a comprehensive rating. 

4. Compare the comprehensive rating with the entry rating threshold to determine the opening direction. If the comprehensive rating reaches the long threshold, go long. If it reaches the short threshold, go short.

5. Adopting moving averages of different periods can judge short-term and long-term trends. Using different types provides more abundant technical indicators for multi-angle judgment.

## Advantages

1. Multiple moving average ratings improve accuracy

   Compared with single or few moving averages, the strategy uses 17 different moving averages for rating, which can better judge the market trend direction from more angles, reducing deviations of any single indicator. Multiple indicators involved in the rating can improve reliability of the final result.

2. Configurable parameters of rating system adapt to different varieties

   The moving average periods and rating thresholds in the rating system can be configured through parameters, making the strategy adaptable to different characteristics of trading varieties, which is beneficial for optimization.

3. Configurable entry rating conditions control risks

   The strategy allows configuring long and short entry rating thresholds. Signals are generated only when the comprehensive rating reaches the threshold, avoiding incorrect opening during unclear market conditions. Reasonable entry threshold settings help reduce unnecessary trades and control risks.

## Risks and Solutions

1. Effect may be poor for individual variety

   The parameter settings of this strategy are designed for the overall market, and may not work well for some specific variety. The solution is to optimize parameters separately for different varieties.

2. Higher error rate in mixed trending markets

   The strategy tends to generate wrong signals when the market is mixed. The solution is to raise the entry rating threshold to reduce trades in such market conditions.

3. Periodical parameter optimization may be needed for long-term running

   As market conditions keep changing, fixed parameters may lead to decreased strategy efficiency. It is recommended to re-test and optimize parameters periodically to ensure strategy performance.

## Optimization Directions 

1. Add other indicators for rating, like volatility indicators, volume indicators, etc. to provide more dimensions of judgment.

2. Test and optimize parameters separately for different varieties to improve adaptability.

3. Set longer backtest periods like half a year, one year, to observe duration of parameter effectiveness.

4. Research actual effects of different moving averages in different periods to select better combinations. 

5. Try machine learning methods to automatically optimize parameters.

## Conclusion

The strategy establishes a rating system of multiple moving averages to achieve multi-angle judgment of market trends. It has the advantage of configurable parameters to adapt flexibly to different varieties, and to control strategy risks through parameter tuning. In addition, the rating system can be continuously optimized and improved to further enhance strategy performance. In general, the strategy utilizes the effects of multiple technical indicators to form strong trend tracking capability.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_timeframe_1||Indicator Timeframe|
|v_input_float_1|0.95|(?Entry Rating %)Rating for long|
|v_input_float_2|0.75|Rating for short|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-09 00:00:00
end: 2023-10-12 02:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=5

strategy(title='Ultra Moving Average Rating Trend Strategy', overlay=true)  //,  pyramiding=1,initial_capital = 1000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.03)
// //


//==========DEMA
getDEMA(src, len) =>
    dema = 2 * ta.ema(src, len) - ta.ema(ta.ema(src, len), len)
    dema
//==========HMA
getHULLMA(src, len) =>
    hullma = ta.wma(2 * ta.wma(src, len / 2) - ta.wma(src, len), math.round(math.sqrt(len)))
    hullma
//==========KAMA
getKAMA(src, len, k1, k2) =>
    change = math.abs(ta.change(src, len))
    volatility = math.sum(math.abs(ta.change(src)), len)
    efficiency_ratio = volatility != 0 ? change / volatility : 0
    kama = 0.0
    fast = 2 / (k1 + 1)
    slow = 2 / (k2 + 1)
    smooth_const = math.pow(efficiency_ratio * (fast - slow) + slow, 2)
    kama := nz(kama[1]) + smooth_const * (src - nz(kama[1]))
    kama
//==========TEMA
getTEMA(src, len) =>
    e = ta.ema(src, len)
    tema = 3 * (e - ta.ema(e, len)) + ta.ema(ta.ema(e, len), len)
    tema
//==========ZLEMA
getZLEMA(src, len) =>
    zlemalag_1 = (len - 1) / 2
    zlemadata_1 = src + src - src[zlemalag_1]
    zlema = ta.ema(zlemadata_1, len)
    zlema
//==========FRAMA
getFRAMA(src, len) =>
    Price = src
    N = len
    if N % 2 != 0
        N += 1
        N
    N1 = 0.0
    N2 = 0.0
    N3 = 0.0
    HH = 0.0
    LL = 0.0
    Dimen = 0.0
    alpha = 0.0
    Filt = 0.0
    N3 := (ta.highest(N) - ta.lowest(N)) / N
    HH := ta.highest(N / 2 - 1)
    LL := ta.lowest(N / 2 - 1)
    N1 := (HH - LL) / (N / 2)
    HH := high[N / 2]
    LL := low[N / 2]
    for i = N / 2 to N - 1 by 1
        if high[i] > HH
            HH := high[i]
            HH
        if low[i] < LL
            LL := low[i]
            LL
    N2 := (HH - LL) / (N / 2)
    if N1 > 0 and N2 > 0 and N3 > 0
        Dimen := (math.log(N1 + N2) - math.log(N3)) / math.log(2)
        Dimen
    alpha := math.exp(-4.6 * (Dimen - 1))
    if alpha < .01
        alpha := .01
        alpha
    if alpha > 1
        alpha := 1
        alpha
    Filt := alpha * Price + (1 - alpha) * nz(Filt[1], 1)
    if bar_index < N + 1
        Filt := Price
        Filt
    Filt
//==========VIDYA
getVIDYA(src, len) =>
    mom = ta.change(src)
    upSum = math.sum(math.max(mom, 0), len)
    downSum = math.sum(-math.min(mom, 0), len)
    out = (upSum - downSum) / (upSum + downSum)
    cmo = math.abs(out)
    alpha = 2 / (len + 1)
    vidya = 0.0
    vidya := src * alpha * cmo + nz(vidya[1]) * (1 - alpha * cmo)
    vidya
//==========JMA
getJMA(src, len, power, phase) =>
    phase_ratio = phase < -100 ? 0.5 : phase > 100 ? 2.5 : phase / 100 + 1.5
    beta = 0.45 * (len - 1) / (0.45 * (len - 1) + 2)
    alpha = math.pow(beta, power)
    MA1 = 0.0
    Det0 = 0.0
    MA2 = 0.0
    Det1 = 0.0
    JMA = 0.0
    MA1 := (1 - alpha) * src + alpha * nz(MA1[1])
    Det0 := (src - MA1) * (1 - beta) + beta * nz(Det0[1])
    MA2 := MA1 + phase_ratio * Det0
    Det1 := (MA2 - nz(JMA[1])) * math.pow(1 - alpha, 2) + math.pow(alpha, 2) * nz(Det1[1])
    JMA := nz(JMA[1]) + Det1
    JMA
//==========T3
getT3(src, len, vFactor) =>
    ema1 = ta.ema(src, len)
    ema2 = ta.ema(ema1, len)
    ema3 = ta.ema(ema2, len)
    ema4 = ta.ema(ema3, len)
    ema5 = ta.ema(ema4, len)
    ema6 = ta.ema(ema5, len)
    c1 = -1 * math.pow(vFactor, 3)
    c2 = 3 * math.pow(vFactor, 2) + 3 * math.pow(vFactor, 3)
    c3 = -6 * math.pow(vFactor, 2) - 3 * vFactor - 3 * math.pow(vFactor, 3)
    c4 = 1 + 3 * vFactor + math.pow(vFactor, 3) + 3 * math.pow(vFactor, 2)
    T3 = c1 * ema6 + c2 * ema5 + c3 * ema4 + c4 * ema3
    T3
//==========TRIMA
getTRIMA(src, len) =>
    N = len + 1
    Nm = math.round(N / 2)
    TRIMA = ta.sma(ta.sma(src, Nm), Nm)
    TRIMA




//-------------- FUNCTIONS 
dirmov(len) =>
    up = ta.change(high)
    down = -ta.change(low)
    plusDM = na(up) ? na : up > down and up > 0 ? up : 0
    minusDM = na(down) ? na : down > up and down > 0 ? down : 0
    truerange = ta.rma(ta.tr, len)
    plus = fixnan(100 * ta.rma(plusDM, len) / truerange)
    minus = fixnan(100 * ta.rma(minusDM, len) / truerange)
    [plus, minus]

adx(dilen, adxlen) =>
    [plus, minus] = dirmov(dilen)
    sum = plus + minus
    adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
    adx

src = close

res = input.timeframe("", title="Indicator Timeframe")

// Ichimoku Cloud
donchian(len) => math.avg(ta.lowest(len), ta.highest(len))
ichimoku_cloud() =>
    conversionLine = donchian(9)
    baseLine = donchian(26)
    leadLine1 = math.avg(conversionLine, baseLine)
    leadLine2 = donchian(52)
    [conversionLine, baseLine, leadLine1, leadLine2]

calcRatingMA(ma, src) => na(ma) or na(src) ? na : (ma == src ? 0 : ( ma < src ? 1 : -1 ))
calcRating(buy, sell) => buy ? 1 : ( sell ? -1 : 0 )
calcRatingAll() =>
    //============== MA =================
    

    
    SMA10 = ta.sma(close, 10)
    SMA20 = ta.sma(close, 20)
    SMA30 = ta.sma(close, 30)
    SMA50 = ta.sma(close, 50)
    SMA100 = ta.sma(close, 100)
    SMA200 = ta.sma(close, 200)

    EMA10 = ta.ema(close, 10)
    EMA20 = ta.ema(close, 20)
    EMA30 = ta.ema(close, 30)
    EMA50 = ta.ema(close, 50)
    EMA100 = ta.ema(close, 100)
    EMA200 = ta.ema(close, 200)
    
    ALMA10 = ta.alma(close, 10, 0.85, 6)
    ALMA20 = ta.alma(close, 20, 0.85, 6)
    ALMA50 = ta.alma(close, 50, 0.85, 6)
    ALMA100 = ta.alma(close, 100, 0.85, 6)
    ALMA200 = ta.alma(close, 200, 0.85, 6)
    
    SMMA10 = ta.rma(close, 10)
    SMMA20 = ta.rma(close, 20)
    SMMA50 = ta.rma(close, 50)
    SMMA100 = ta.rma(close, 100)
    SMMA200 = ta.rma(close, 200)

    LSMA10 = ta.linreg(close, 10, 0)
    LSMA20 = ta.linreg(close, 20, 0)
    LSMA50 = ta.linreg(close, 50, 0)
    LSMA100 = ta.linreg(close, 100, 0)
    LSMA200 = ta.linreg(close, 200, 0)

    VWMA10 = ta.vwma(close, 10)
    VWMA20 = ta.vwma(close, 20)
    VWMA50 = ta.vwma(close, 50)
    VWMA100 = ta.vwma(close, 100)
    VWMA200 = ta.vwma(close, 200)

    DEMA10 = getDEMA(close, 10)
    DEMA20 = getDEMA(close, 20)
    DEMA50 = getDEMA(close, 50)
    DEMA100 =getDEMA(close, 100)
    DEMA200 = getDEMA(close, 200)
    
    HMA10 =  ta.hma(close, 10)
    HMA20 =  ta.hma(close, 20)
    HMA50 =  ta.hma(close, 50)
    HMA100 = ta.hma(close, 100)
    HMA200 = ta.hma(close, 200)
    
    KAMA10 =   getKAMA(close, 10, 2, 30)
    KAMA20 =   getKAMA(close, 20, 2, 30)
    KAMA50 =   getKAMA(close, 50, 2, 30)
    KAMA100 =  getKAMA(close, 100, 2, 30)
    KAMA200 =  getKAMA(close, 200 , 2, 30)
    
    FRAMA10 = getFRAMA(close, 10)
    FRAMA20 = getFRAMA(close, 20)
    FRAMA50 = getFRAMA(close, 50)
    FRAMA100 =getFRAMA(close, 100)
    FRAMA200 = getFRAMA(close, 200)

    VIDMA10 = getVIDYA(close, 10)
    VIDMA20 = getVIDYA(close, 20)
    VIDMA50 = getVIDYA(close, 50)
    VIDMA100 =getVIDYA(close, 100)
    VIDMA200 = getVIDYA(close, 200)
    
    JMA10 = getJMA(close, 10, 2, 50)
    JMA20 = getJMA(close, 20, 2, 50)
    JMA50 = getJMA(close, 50, 2, 50)
    JMA100 =getJMA(close, 100, 2, 50)
    JMA200 = getJMA(close, 200, 2, 50)
    
    TEMA10 = getTEMA(close, 10)
    TEMA20 = getTEMA(close, 20)
    TEMA50 = getTEMA(close, 50)
    TEMA100 =getTEMA(close, 100)
    TEMA200 = getTEMA(close, 200)
    
    ZLEMA10 = getZLEMA(close, 10)
    ZLEMA20 = getZLEMA(close, 20)
    ZLEMA50 = getZLEMA(close, 50)
    ZLEMA100 =getZLEMA(close, 100)
    ZLEMA200 = getZLEMA(close, 200)
    
    TRIMA10 = getTRIMA(close, 10)
    TRIMA20 = getTRIMA(close, 20)
    TRIMA50 = getTRIMA(close, 50)
    TRIMA100 =getTRIMA(close, 100)
    TRIMA200 = getTRIMA(close, 200)
    
    T3MA10 = getT3(close, 10, 0.7)
    T3MA20 = getT3(close, 20, 0.7)
    T3MA50 = getT3(close, 50, 0.7)
    T3MA100 =getT3(close, 100, 0.7)
    T3MA200 = getT3(close, 200, 0.7)
    
    [IC_CLine, IC_BLine, IC_Lead1, IC_Lead2] = ichimoku_cloud()

 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    PriceAvg = ta.ema(close, 50)
    DownTrend = close < PriceAvg
    UpTrend = close > PriceAvg
    // calculate trading recommendation based on SMA/EMA
    float ratingMA = 0
    float ratingMAC = 0

    float ratingSMA10 = na
    if not na(SMA10)
        ratingSMA10 := calcRatingMA(SMA10, close)
        ratingMA := ratingMA + ratingSMA10
        ratingMAC := ratingMAC + 1
    float ratingSMA20 = na
    if not na(SMA20)
        ratingSMA20 := calcRatingMA(SMA20, close)
        ratingMA := ratingMA + ratingSMA20
        ratingMAC := ratingMAC + 1
    float ratingSMA30 = na
    if not na(SMA30)
        ratingSMA30 := calcRatingMA(SMA30, close)
        ratingMA := ratingMA + ratingSMA30
        ratingMAC := ratingMAC + 1
    float ratingSMA50 = na
    if not na(SMA50)
        ratingSMA50 := calcRatingMA(SMA50, close)
        ratingMA := ratingMA + ratingSMA50
        ratingMAC := ratingMAC + 1
    float ratingSMA100 = na
    if not na(SMA100)
        ratingSMA100 := calcRatingMA(SMA100, close)
        ratingMA := ratingMA + ratingSMA100
        ratingMAC := ratingMAC + 1
    float ratingSMA200 = na
    if not na(SMA200)
        ratingSMA200 := calcRatingMA(SMA200, close)
        ratingMA := ratingMA + ratingSMA200
        ratingMAC := ratingMAC + 1

    float ratingEMA10 = na
    if not na(EMA10)
        ratingEMA10 := calcRatingMA(EMA10, close)
        ratingMA := ratingMA + ratingEMA10
        ratingMAC := ratingMAC + 1
    float ratingEMA20 = na
    if not na(EMA20)
        ratingEMA20 := calcRatingMA(EMA20, close)
        ratingMA := ratingMA + ratingEMA20
        ratingMAC := ratingMAC + 1
    float ratingEMA30 = na
    if not na(EMA30)
        ratingEMA30 := calcRatingMA(EMA30, close)
        ratingMA := ratingMA + ratingEMA30
        ratingMAC := ratingMAC + 1
    float ratingEMA50 = na
    if not na(EMA50)
        ratingEMA50 := calcRatingMA(EMA50, close)
        ratingMA := ratingMA + ratingEMA50
        ratingMAC := ratingMAC + 1
    float ratingEMA100 = na
    if not na(EMA100)
        ratingEMA100 := calcRatingMA(EMA100, close)
        ratingMA := ratingMA + ratingEMA100
        ratingMAC := ratingMAC + 1
    float ratingEMA200 = na
    if not na(EMA200)
        ratingEMA200 := calcRatingMA(EMA200, close)
        ratingMA := ratingMA + ratingEMA200
        ratingMAC := ratingMAC + 1

///////////////////////////
    float ratingALMA10 = na
    if not na(ALMA10)
        ratingALMA10 := calcRatingMA(ALMA10, close)
        ratingMA := ratingMA + ratingALMA10
        ratingMAC := ratingMAC + 1
        
    float ratingALMA20 = na
    if not na(ALMA20)
        ratingALMA20 := calcRatingMA(ALMA20, close)
        ratingMA := ratingMA + ratingALMA20
        ratingMAC := ratingMAC + 1
        
    float ratingALMA50 = na
    if not na(ALMA50)
        ratingALMA50 := calcRatingMA(ALMA50, close)
        ratingMA := ratingMA + ratingALMA50
        ratingMAC := ratingMAC + 1
        
    float ratingALMA100 = na
    if not na(ALMA100)
        ratingALMA100 := calcRatingMA(ALMA100, close)
        ratingMA := ratingMA + ratingALMA100
        ratingMAC := ratingMAC + 1

    float ratingALMA200 = na
    if not na(ALMA200)
        ratingALMA200 := calcRatingMA(ALMA200, close)
        ratingMA := ratingMA + ratingALMA200
        ratingMAC := ratingMAC + 1


/////////////////////////

///////////////////////////
///////////////////////////
    float ratingSMMA10 = na
    if not na(SMMA10)
        ratingSMMA10 := calcRatingMA(SMMA10, close)
        ratingMA := ratingMA + ratingSMMA10
        ratingMAC := ratingMAC + 1
        
    float ratingSMMA20 = na
    if not na(SMMA20)
        ratingSMMA20 := calcRatingMA(SMMA20, close)
        ratingMA := ratingMA + ratingSMMA20
        ratingMAC := ratingMAC + 1
        
    float ratingSMMA50 = na
    if not na(SMMA50)
        ratingSMMA50 := calcRatingMA(SMMA50, close)
        ratingMA := ratingMA + ratingSMMA50
        ratingMAC := ratingMAC + 1
        
    float ratingSMMA100 = na
    if not na(SMMA100)
        ratingSMMA100 := calcRatingMA(SMMA100, close)
        ratingMA := ratingMA + ratingSMMA100
        ratingMAC := ratingMAC + 1

    float ratingSMMA200 = na
    if not na(SMMA200)
        ratingSMMA200 := calcRatingMA(SMMA200, close)
        ratingMA := ratingMA + ratingSMMA200
        ratingMAC := ratingMAC + 1


/////////////////////////

///////////////////////////
///////////////////////////
    float ratingLSMA10 = na
    if not na(LSMA10)
        ratingLSMA10 := calcRatingMA(LSMA10, close)
        ratingMA := ratingMA + ratingLSMA10
        ratingMAC := ratingMAC + 1
        
    float ratingLSMA20 = na
    if not na(LSMA20)
        ratingLSMA20 := calcRatingMA(LSMA20, close)
        ratingMA := ratingMA + ratingLSMA20
        ratingMAC := ratingMAC + 1
        
    float ratingLSMA50 = na
    if not na(LSMA50)
        ratingLSMA50 := calcRatingMA(LSMA50, close)
        ratingMA := ratingMA + ratingLSMA50
        ratingMAC := ratingMAC + 1
        
    float ratingLSMA100 = na
    if not na(LSMA100)
        ratingLSMA100 := calcRatingMA(LSMA100, close)
        ratingMA := ratingMA + ratingLSMA100
        ratingMAC := ratingMAC + 1

    float ratingLSMA200 = na
    if not na(LSMA200)
        ratingLSMA200 := calcRatingMA(LSMA200, close)
        ratingMA := ratingMA + ratingLSMA200
        ratingMAC := ratingMAC + 1


/////////////////////////

///////////////////////////
///////////////////////////
    float ratingVWMA10 = na
    if not na(VWMA10)
        ratingVWMA10 := calcRatingMA(VWMA10, close)
        ratingMA := ratingMA + ratingVWMA10
        ratingMAC := ratingMAC + 1
        
    float ratingVWMA20 = na
    if not na(VWMA20)
        ratingVWMA20 := calcRatingMA(VWMA20, close)
        ratingMA := ratingMA + ratingVWMA20
        ratingMAC := ratingMAC + 1
        
    float ratingVWMA50 = na
    if not na(VWMA50)
        ratingVWMA50 := calcRatingMA(VWMA50, close)
        ratingMA := ratingMA + ratingVWMA50
        ratingMAC := ratingMAC + 1
        
    float ratingVWMA100 = na
    if not na(VWMA100)
        ratingVWMA100 := calcRatingMA(VWMA100, close)
        ratingMA := ratingMA + ratingVWMA100
        ratingMAC := ratingMAC + 1

    float ratingVWMA200 = na
    if not na(VWMA200)
        ratingVWMA200 := calcRatingMA(VWMA200, close)
        ratingMA := ratingMA + ratingVWMA200
        ratingMAC := ratingMAC + 1


/////////////////////////

///////////////////////////
///////////////////////////
    float ratingDEMA10 = na
    if not na(DEMA10)
        ratingDEMA10 := calcRatingMA(DEMA10, close)
        ratingMA := ratingMA + ratingDEMA10
        ratingMAC := ratingMAC + 1
        
    float ratingDEMA20 = na
    if not na(DEMA20)
        ratingDEMA20 := calcRatingMA(DEMA20, close)
        ratingMA := ratingMA + ratingDEMA20
        ratingMAC := ratingMAC + 1
        
    float ratingDEMA50 = na
    if not na(DEMA50)
        ratingDEMA50 := calcRatingMA(DEMA50, close)
        ratingMA := ratingMA + ratingDEMA50
        ratingMAC := ratingMAC + 1
        
    float ratingDEMA100 = na
    if not na(DEMA100)
        ratingDEMA100 := calcRatingMA(DEMA100, close)
        ratingMA := ratingMA + ratingDEMA100
        ratingMAC := ratingMAC + 1

    float ratingDEMA200 = na
    if not na(DEMA200)
        ratingDEMA200 := calcRatingMA(DEMA200, close)
        ratingMA := ratingMA + ratingDEMA200
        ratingMAC := ratingMAC + 1

/////////////////////////
///////////////////////////
    float ratingHMA10 = na
    if not na(HMA10)
        ratingHMA10 := calcRatingMA(HMA10, close)
        ratingMA := ratingMA + ratingHMA10
        ratingMAC := ratingMAC + 1
        
    float ratingHMA20 = na
    if not na(HMA20)
        ratingHMA20 := calcRatingMA(HMA20, close)
        ratingMA := ratingMA + ratingHMA20
        ratingMAC := ratingMAC + 1
        
    float ratingHMA50 = na
    if not na(HMA50)
        ratingHMA50 := calcRatingMA(HMA50, close)
        ratingMA := ratingMA + ratingHMA50
        ratingMAC := ratingMAC + 1
        
    float ratingHMA100 = na
    if not na(HMA100)
        ratingHMA100 := calcRatingMA(HMA100, close)
        ratingMA := ratingMA + ratingHMA100
        ratingMAC := ratingMAC + 1

    float ratingHMA200 = na
    if not na(HMA200)
        ratingHMA200 := calcRatingMA(HMA200, close)
        ratingMA := ratingMA + ratingHMA200
        ratingMAC := ratingMAC + 1
/////////////////////////
///////////////////////////
///////////////////////////
    float ratingKAMA10 = na
    if not na(KAMA10)
        ratingKAMA10 := calcRatingMA(KAMA10, close)
        ratingMA := ratingMA + ratingKAMA10
        ratingMAC := ratingMAC + 1
        
    float ratingKAMA20 = na
    if not na(KAMA20)
        ratingKAMA20 := calcRatingMA(KAMA20, close)
        ratingMA := ratingMA + ratingKAMA20
        ratingMAC := ratingMAC + 1
        
    float ratingKAMA50 = na
    if not na(KAMA50)
        ratingKAMA50 := calcRatingMA(KAMA50, close)
        ratingMA := ratingMA + ratingKAMA50
        ratingMAC := ratingMAC + 1
        
    float ratingKAMA100 = na
    if not na(KAMA100)
        ratingKAMA100 := calcRatingMA(KAMA100, close)
        ratingMA := ratingMA + ratingKAMA100
        ratingMAC := ratingMAC + 1

    float ratingKAMA200 = na
    if not na(KAMA200)
        ratingKAMA200 := calcRatingMA(KAMA200, close)
        ratingMA := ratingMA + ratingKAMA200
        ratingMAC := ratingMAC + 1
/////////////////////////
///////////////////////////
///////////////////////////
    float ratingFRAMA10 = na
    if not na(FRAMA10)
        ratingFRAMA10 := calcRatingMA(FRAMA10, close)
        ratingMA := ratingMA + ratingFRAMA10
        ratingMAC := ratingMAC + 1
        
    float ratingFRAMA20 = na
    if not na(FRAMA20)
        ratingFRAMA20 := calcRatingMA(FRAMA20, close)
        ratingMA := ratingMA + ratingFRAMA20
        ratingMAC := ratingMAC + 1
        
    float ratingFRAMA50 = na
    if not na(FRAMA50)
        ratingFRAMA50 := calcRatingMA(FRAMA50, close)
        ratingMA := ratingMA + ratingFRAMA50
        ratingMAC := ratingMAC + 1
        
    float ratingFRAMA100 = na
    if not na(FRAMA100)
        ratingFRAMA100 := calcRatingMA(FRAMA100, close)
        ratingMA := ratingMA + ratingFRAMA100
        ratingMAC := ratingMAC + 1

    float ratingFRAMA200 = na
    if not na(FRAMA200)
        ratingFRAMA200 := calcRatingMA(FRAMA200, close)
        ratingMA := ratingMA + ratingFRAMA200
        ratingMAC := ratingMAC + 1
/////////////////////////
///////////////////////////
///////////////////////////
    float ratingVIDMA10 = na
    if not na(VIDMA10)
        ratingVIDMA10 := calcRatingMA(VIDMA10, close)
        ratingMA := ratingMA + ratingVIDMA10
        ratingMAC := ratingMAC + 1
        
    float ratingVIDMA20 = na
    if not na(VIDMA20)
        ratingVIDMA20 := calcRatingMA(VIDMA20, close)
        ratingMA := ratingMA + ratingVIDMA20
        ratingMAC := ratingMAC + 1
        
    float ratingVIDMA50 = na
    if not na(VIDMA50)
        ratingVIDMA50 := calcRatingMA(VIDMA50, close)
        ratingMA := ratingMA + ratingVIDMA50
        ratingMAC := ratingMAC + 1
        
    float ratingVIDMA100 = na
    if not na(VIDMA100)
        ratingVIDMA100 := calcRatingMA(VIDMA100, close)
        ratingMA := ratingMA + ratingVIDMA100
        ratingMAC := ratingMAC + 1

    float ratingVIDMA200 = na   
    if not na(VIDMA200)
        ratingVIDMA200 := calcRatingMA(VIDMA200, close)
        ratingMA := ratingMA + ratingVIDMA200
        ratingMAC := ratingMAC + 1
/////////////////////////
///////////////////////////
    float ratingJMA10 = na
    if not na(JMA10)
        ratingJMA10 := calcRatingMA(JMA10, close)
        ratingMA := ratingMA + ratingJMA10
        ratingMAC := ratingMAC + 1
        
    float ratingJMA20 = na
    if not na(JMA20)
        ratingJMA20 := calcRatingMA(JMA20, close)
        ratingMA := ratingMA + ratingJMA20
        ratingMAC := ratingMAC + 1
        
    float ratingJMA50 = na
    if not na(JMA50)
        ratingJMA50 := calcRatingMA(JMA50, close)
        ratingMA := ratingMA + ratingJMA50
        ratingMAC := ratingMAC + 1
        
    float ratingJMA100 = na
    if not na(JMA100)
        ratingJMA100 := calcRatingMA(JMA100, close)
        ratingMA := ratingMA + ratingJMA100
        ratingMAC := ratingMAC + 1

    float ratingJMA200 = na
    if not na(JMA200)
        ratingJMA200 := calcRatingMA(JMA200, close)
        ratingMA := ratingMA + ratingJMA200
        ratingMAC := ratingMAC + 1
/////////////////////////
///////////////////////////
///////////////////////////
    float ratingTEMA10 = na
    if not na(TEMA10)
        ratingTEMA10 := calcRatingMA(TEMA10, close)
        ratingMA := ratingMA + ratingTEMA10
        ratingMAC := ratingMAC + 1
        
    float ratingTEMA20 = na
    if not na(TEMA20)
        ratingTEMA20 := calcRatingMA(TEMA20, close)
        ratingMA := ratingMA + ratingTEMA20
        ratingMAC := ratingMAC + 1
        
    float ratingTEMA50 = na
    if not na(TEMA50)
        ratingTEMA50 := calcRatingMA(TEMA50, close)
        ratingMA := ratingMA + ratingTEMA50
        ratingMAC := ratingMAC + 1
        
    float ratingTEMA100 = na
    if not na(TEMA100)
        ratingTEMA100 := calcRatingMA(TEMA100, close)
        ratingMA := ratingMA + ratingTEMA100
        ratingMAC := ratingMAC + 1

    float ratingTEMA200 = na
    if not na(TEMA200)
        ratingTEMA200 := calcRatingMA(TEMA200, close)
        ratingMA := ratingMA + ratingTEMA200
        ratingMAC := ratingMAC + 1
/////////////////////////
///////////////////////////
    float ratingZLEMA10 = na
    if not na(ZLEMA10)
        ratingZLEMA10 := calcRatingMA(ZLEMA10, close)
        ratingMA := ratingMA + ratingZLEMA10
        ratingMAC := ratingMAC + 1
        
    float ratingZLEMA20 = na
    if not na(ZLEMA20)
        ratingZLEMA20 := calcRatingMA(ZLEMA20, close)
        ratingMA := ratingMA + ratingZLEMA20
        ratingMAC := ratingMAC + 1
        
    float ratingZLEMA50 = na
    if not na(ZLEMA50)
        ratingZLEMA50 := calcRatingMA(ZLEMA50, close)
        ratingMA := ratingMA + ratingZLEMA50
        ratingMAC := ratingMAC + 1
        
    float ratingZLEMA100 = na
    if not na(ZLEMA100)
        ratingZLEMA100 := calcRatingMA(ZLEMA100, close)
        ratingMA := ratingMA + ratingZLEMA100
        ratingMAC := ratingMAC + 1

    float ratingZLEMA200 = na
    if not na(ZLEMA200)
        ratingZLEMA200 := calcRatingMA(ZLEMA200, close)
        ratingMA := ratingMA + ratingZLEMA200
        ratingMAC := ratingMAC + 1
/////////////////////////

///////////////////////////
///////////////////////////
    float ratingTRIMA10 = na
    if not na(TRIMA10)
        ratingTRIMA10 := calcRatingMA(TRIMA10, close)
        ratingMA := ratingMA + ratingTRIMA10
        ratingMAC := ratingMAC + 1
        
    float ratingTRIMA20 = na
    if not na(TRIMA20)
        ratingTRIMA20 := calcRatingMA(TRIMA20, close)
        ratingMA := ratingMA + ratingTRIMA20
        ratingMAC := ratingMAC + 1
        
    float ratingTRIMA50 = na
    if not na(TRIMA50)
        ratingTRIMA50 := calcRatingMA(TRIMA50, close)
        ratingMA := ratingMA + ratingTRIMA50
        ratingMAC := ratingMAC + 1
        
    float ratingTRIMA100 = na
    if not na(TRIMA100)
        ratingTRIMA100 := calcRatingMA(TRIMA100, close)
        ratingMA := ratingMA + ratingTRIMA100
        ratingMAC := ratingMAC + 1

    float ratingTRIMA200 = na
    if not na(TRIMA200)
        ratingTRIMA200 := calcRatingMA(TRIMA200, close)
        ratingMA := ratingMA + ratingTRIMA200
        ratingMAC := ratingMAC + 1
/////////////////////////
///////////////////////////
    float ratingT3MA10 = na
    if not na(T3MA10)
        ratingT3MA10 := calcRatingMA(T3MA10, close)
        ratingMA := ratingMA + ratingT3MA10
        ratingMAC := ratingMAC + 1
        
    float ratingT3MA20 = na
    if not na(T3MA20)
        ratingT3MA20 := calcRatingMA(T3MA20, close)
        ratingMA := ratingMA + ratingT3MA20
        ratingMAC := ratingMAC + 1
        
    float ratingT3MA50 = na
    if not na(T3MA50)
        ratingT3MA50 := calcRatingMA(T3MA50, close)
        ratingMA := ratingMA + ratingT3MA50
        ratingMAC := ratingMAC + 1
        
    float ratingT3MA100 = na
    if not na(T3MA100)
        ratingT3MA100 := calcRatingMA(T3MA100, close)
        ratingMA := ratingMA + ratingT3MA100
        ratingMAC := ratingMAC + 1

    float ratingT3MA200 = na
    if not na(T3MA200)
        ratingT3MA200 := calcRatingMA(T3MA200, close)
        ratingMA := ratingMA + ratingT3MA200
        ratingMAC := ratingMAC + 1
        
//////////////////////////////////////////


    float ratingIC = na
    if not (na(IC_Lead1) or na(IC_Lead2) or na(close) or na(close[1]) or na(IC_BLine) or na(IC_CLine))
        ratingIC := calcRating(
         IC_Lead1 > IC_Lead2 and close > IC_Lead1 and close < IC_BLine and close[1] < IC_CLine and close > IC_CLine,
         IC_Lead2 > IC_Lead1 and close < IC_Lead2 and close > IC_BLine and close[1] > IC_CLine and close < IC_CLine)
    if not na(ratingIC)
        ratingMA := ratingMA + ratingIC
        ratingMAC := ratingMAC + 1

    ratingMA := ratingMAC > 0 ? ratingMA / ratingMAC : na


    float ratingTotal = 0
    float ratingTotalC = 0
    if not na(ratingMA)
        ratingTotal := ratingTotal + ratingMA
        ratingTotalC := ratingTotalC + 1
    ratingTotal := ratingTotalC > 0 ? ratingTotal / ratingTotalC : na

    [ratingTotal,  ratingMA]



getSignal2(ratingTotal,  ratingMA) =>
    float _res = ratingTotal
    _res := ratingMA

    
[ratingTotal, ratingMA]  = request.security(syminfo.tickerid, res, calcRatingAll())
tradeSignal = getSignal2(ratingTotal,  ratingMA)


rating_entry = input.float(0.95, title='Rating for long', group="Entry Rating %", step=0.05)
rating_exit = input.float(0.75, title='Rating for short', group="Entry Rating %", step=0.05) * -1

long = tradeSignal >= rating_entry  
short = tradeSignal <= rating_exit


strategy.entry("long",strategy.long,when=long)
strategy.entry('short',strategy.short,when=short)
```

> Detail

https://www.fmz.com/strategy/429461

> Last Modified

2023-10-17 13:11:25
