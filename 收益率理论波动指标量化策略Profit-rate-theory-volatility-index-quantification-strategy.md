
> Name

收益率理论波动指标量化策略Profit-rate-theory-volatility-index-quantification-strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f6b8c4d85b70f1b616.png)
[trans]
#### 概述

本策略运用技术指标评级法,通过与移动平均线比较,动态选择买入和卖出的时机。策略包含长仓和空仓两个方向,可自定义开启或关闭。策略对低风险的长期持仓交易比较友好。

#### 策略原理

本策略结合多种技术指标评级法实时评估市场时机。主要包括以下几个步骤:

1. 计算多种移动平均线,包括SMA、EMA、Hull MA和加权移动平均线VWMA等。通过与当前价格比较,评定多空级别。
2. 计算一系列震荡指标,包括RSI、CCI、MACD、威廉指标%R、随机指标等。判断震荡指标多空态势差异,评定多空级别。
3. 技术指标评级法综合上述两个方面指标评分结果,得出最终操作信号。信号绝对值超过0.5为强信号,0.1-0.5为弱信号。
4. 根据最终操作信号,策略可以做多或做空。同时设定止损和止盈退出逻辑。

策略优势在于指标评级法可以比较全面地判断市场时机,相比单一指标有更强的可靠性。另外,通过自定义参数可以自由选择评级指标种类,实现对策略的定制化。

#### 优势分析

1. 结合众多技术指标,指标评分法判断市场时机更加全面和可靠
2. 采用动态止损和止盈设定,有助于抑制亏损风险
3. 可自定义指标评级成分,实现对策略的定制化操作
4. 支持做多和做空两个方向,适应更多市场环境
5. 可选择是否开启某个交易方向,降低不必要的交易次数

#### 风险分析

1. 指标评分法作为决策依据,本身也存在一定主观性
2. 部分震荡指标对于创新高和低位判断不准确
3. 需要详细评估技术指标权重配置以优化评分法
4. 大量指标计算增加策略运算量,可能影响运行效率
5. 须关注长时间运行内的总体盈亏情况,防止过度交易

针对上述风险,主要的解决措施是优化评分指标权重配置,根据历史数据反复测试,选择较优参数;另外适当减少评分指标数量也可以提高运行效率。


#### 优化方向

本策略可以从以下几个方面进行优化:

1. 评估每种技术指标的有效性,优化评分法中的指标选择
2. 调整各技术指标的评分权重和信号强弱阈值
3. 优化移动止损止盈的参数,进一步控制交易风险
4. 根据不同品种特点,设定最佳的指标参数取值
5. 增加机器学习等手段辅助判决指标评分信号

通过参数优化,策略可以针对性地适应更多市场品种,从而获得更好的收益回报率。

#### 总结

本策略综合运用技术指标评级法判断市场时机做多做空。策略具有指标选择定制化,动态止损止盈,可选择开启交易方向等优点。风险方面主要集中在评分法本身的主观性,以及部分指标的失效。未来优化空间在于参数选择及效率提升。总体而言,该策略适合对市场时机判断要求较高的投资者。

||

#### Overview  

This strategy uses technical indicator rating methods to dynamically select entry and exit timing by comparing with moving averages. The strategy contains both long and short positions, which can be customized to enable or disable. The strategy is more friendly to low risk long term holding trading.

#### Strategy principle  

This strategy combines multiple technical indicators in real time to evaluate market timing. The main steps are:  

1. Calculate various moving averages, including SMA, EMA, Hull MA and VWMA. Compare with current price to determine long/short level.
2. Calculate a series of oscillators, including RSI, CCI, MACD, Williams %R, Stochastics, etc. Judge the difference between oscillator long/short status, rating long/short level.
3. Technical indicator rating method consolidates above two aspects to generate final trading signal. Absolute signal value above 0.5 is strong signal, 0.1-0.5 is weak signal.  
4. According to final signal, the strategy can go long or go short. Also sets stop loss and take profit exit logic.  

The advantage of the strategy is rating methods can more comprehensively determine market timing compared to single indicator, thus more reliability. In addition, custom parameters enable strategy customization.  

#### Advantage analysis  

1. Combining multiple technical indicators, rating methods are more comprehensive and reliable in judging market timing
2. Adopt dynamic stop loss and take profit, helps curb loss risk
3. Customizable rating components enables customized operations  
4. Supports both long and short positions, adapts to more market environments  
5. Can choose whether to enable certain trading direction, reduces unnecessary trades  

#### Risk analysis  

1. Rating methods themselves have some subjectivity  
2. Some oscillators are not accurate at new highs/lows
3. Need assess technical indicator weight configuration in rating methods  
4. Massive indicators increase computation load, may affect efficiency
5. Pay attention to long term P&L, prevent over-trading  

The main solution is optimizing indicator weights based on historical data backtest. Reducing indicator count can also increase efficiency.  

#### Optimization direction  

The strategy can optimize from below aspects:  

1. Evaluate indicator validity, optimize selection in rating methods  
2. Adjust weights and signal strength threshold  
3. Optimize stop loss and take profit parameters for better risk control  
4. Set optimal parameters for different products  
5. Increase ML to assist in rating signal judgement  

Through parameter optimization, the strategy can better adapt to more products with higher return.  

#### Summary  

The strategy combines technical indicator rating methods to determine market timing for long/short. Advantages include customizability, dynamic SL/TP, position direction enable/disable. Risks mainly come from rating subjectivity and invalid indicators. Future optimization space lies in parameter selection and efficiency improvement. Overall the strategy fits investors with high requiremens on market timing judgement.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3||Indicator Timeframe|
|v_input_4|0|Rating is based on: All|Oscillators|MAs|
|v_input_5|timestamp(01 Jan 2000 00:00 +0000)|Start Time|
|v_input_6|timestamp(31 Dec 2099 23:59 +0000)|Final Time|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Ratings", shorttitle="Ratings", default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_value = 0.1, overlay=true)

//Settings
useLong = input(true, title = "Long")
useShort = input(true, title = "Short")
res = input("", title="Indicator Timeframe", type=input.resolution)
ratingSignal = input(defval = "All", title = "Rating is based on", options = ["MAs", "Oscillators", "All"])
startTime = input(defval = timestamp("01 Jan 2000 00:00 +0000"), title = "Start Time", type = input.time, inline = "time1")
finalTime = input(defval = timestamp("31 Dec 2099 23:59 +0000"), title = "Final Time", type = input.time, inline = "time1")
trueTime = true

// Awesome Oscillator
AO() => 
    sma(hl2, 5) - sma(hl2, 34)
// Stochastic RSI
StochRSI() =>
    rsi1 = rsi(close, 14)
    K = sma(stoch(rsi1, rsi1, rsi1, 14), 3)
    D = sma(K, 3)
    [K, D]
// Ultimate Oscillator
tl() => close[1] < low ? close[1]: low
uo(ShortLen, MiddlLen, LongLen) =>
    Value1 = sum(tr, ShortLen)
    Value2 = sum(tr, MiddlLen)
    Value3 = sum(tr, LongLen)
    Value4 = sum(close - tl(), ShortLen)
    Value5 = sum(close - tl(), MiddlLen)
    Value6 = sum(close - tl(), LongLen)
    float UO = na
    if Value1 != 0 and Value2 != 0 and Value3 != 0
        var0 = LongLen / ShortLen
        var1 = LongLen / MiddlLen
        Value7 = (Value4 / Value1) * (var0)
        Value8 = (Value5 / Value2) * (var1)
        Value9 = (Value6 / Value3)
        UO := (Value7 + Value8 + Value9) / (var0 + var1 + 1)
    UO
// Ichimoku Cloud
donchian(len) => avg(lowest(len), highest(len))
ichimoku_cloud() =>
    conversionLine = donchian(9)
    baseLine = donchian(26)
    leadLine1 = avg(conversionLine, baseLine)
    leadLine2 = donchian(52)
    [conversionLine, baseLine, leadLine1, leadLine2]
    
calcRatingMA(ma, src) => na(ma) or na(src) ? na : (ma == src ? 0 : ( ma < src ? 1 : -1 ))
calcRating(buy, sell) => buy ? 1 : ( sell ? -1 : 0 )
calcRatingAll() =>
    //============== MA =================
    SMA10 = sma(close, 10)
    SMA20 = sma(close, 20)
    SMA30 = sma(close, 30)
    SMA50 = sma(close, 50)
    SMA100 = sma(close, 100)
    SMA200 = sma(close, 200)
    
    EMA10 = ema(close, 10)
    EMA20 = ema(close, 20)
    EMA30 = ema(close, 30)
    EMA50 = ema(close, 50)
    EMA100 = ema(close, 100)
    EMA200 = ema(close, 200)
    
    HullMA9 = hma(close, 9)
    
    // Volume Weighted Moving Average (VWMA)
    VWMA = vwma(close, 20)
    
    [IC_CLine, IC_BLine, IC_Lead1, IC_Lead2] = ichimoku_cloud()
    
    // ======= Other =============
    // Relative Strength Index, RSI
    RSI = rsi(close,14)
    
    // Stochastic
    lengthStoch = 14
    smoothKStoch = 3
    smoothDStoch = 3
    kStoch = sma(stoch(close, high, low, lengthStoch), smoothKStoch)
    dStoch = sma(kStoch, smoothDStoch)
    
    // Commodity Channel Index, CCI
    CCI = cci(close, 20)
    
    // Average Directional Index
    float adxValue = na, float adxPlus = na, float adxMinus = na
    [P, M, V] = dmi(14, 14)
    adxValue := V
    adxPlus := P
    adxMinus := M
    // Awesome Oscillator
    ao = AO()
    
    // Momentum
    Mom = mom(close, 10)
    // Moving Average Convergence/Divergence, MACD
    [macdMACD, signalMACD, _] = macd(close, 12, 26, 9)
    // Stochastic RSI
    [Stoch_RSI_K, Stoch_RSI_D] = StochRSI()
    // Williams Percent Range
    WR = wpr(14)
    
    // Bull / Bear Power
    BullPower = high - ema(close, 13)
    BearPower = low - ema(close, 13)
    // Ultimate Oscillator
    UO = uo(7,14,28)
    if not na(UO)
        UO := UO * 100
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    PriceAvg = ema(close, 50)
    DownTrend = close < PriceAvg
    UpTrend = close > PriceAvg
    // calculate trading recommendation based on SMA/EMA
    float ratingMA = 0
    float ratingMAC = 0
    
    if not na(SMA10)
        ratingMA := ratingMA + calcRatingMA(SMA10, close)
        ratingMAC := ratingMAC + 1
    if not na(SMA20)
        ratingMA := ratingMA + calcRatingMA(SMA20, close)
        ratingMAC := ratingMAC + 1
    if not na(SMA30)
        ratingMA := ratingMA + calcRatingMA(SMA30, close)
        ratingMAC := ratingMAC + 1
    if not na(SMA50)
        ratingMA := ratingMA + calcRatingMA(SMA50, close)
        ratingMAC := ratingMAC + 1
    if not na(SMA100)
        ratingMA := ratingMA + calcRatingMA(SMA100, close)
        ratingMAC := ratingMAC + 1
    if not na(SMA200)
        ratingMA := ratingMA + calcRatingMA(SMA200, close)
        ratingMAC := ratingMAC + 1
    if not na(EMA10)
        ratingMA := ratingMA + calcRatingMA(EMA10, close)
        ratingMAC := ratingMAC + 1
    if not na(EMA20)
        ratingMA := ratingMA + calcRatingMA(EMA20, close)
        ratingMAC := ratingMAC + 1
    if not na(EMA30)
        ratingMA := ratingMA + calcRatingMA(EMA30, close)
        ratingMAC := ratingMAC + 1
    if not na(EMA50)
        ratingMA := ratingMA + calcRatingMA(EMA50, close)
        ratingMAC := ratingMAC + 1
    if not na(EMA100)
        ratingMA := ratingMA + calcRatingMA(EMA100, close)
        ratingMAC := ratingMAC + 1
    if not na(EMA200)
        ratingMA := ratingMA + calcRatingMA(EMA200, close)
        ratingMAC := ratingMAC + 1
    
    if not na(HullMA9)
        ratingHullMA9 = calcRatingMA(HullMA9, close)
        ratingMA := ratingMA + ratingHullMA9
        ratingMAC := ratingMAC + 1
    
    if not na(VWMA)
        ratingVWMA = calcRatingMA(VWMA, close)
        ratingMA := ratingMA + ratingVWMA
        ratingMAC := ratingMAC + 1
    
    float ratingIC = na
    if not (na(IC_Lead1) or na(IC_Lead2) or na(close) or na(close[1]) or na(IC_BLine) or na(IC_CLine))
        ratingIC := calcRating(
         IC_Lead1 > IC_Lead2 and close > IC_Lead1 and close < IC_BLine and close[1] < IC_CLine and close > IC_CLine,
         IC_Lead2 > IC_Lead1 and close < IC_Lead2 and close > IC_BLine and close[1] > IC_CLine and close < IC_CLine)
    if not na(ratingIC)
        ratingMA := ratingMA + ratingIC
        ratingMAC := ratingMAC + 1
    
    ratingMA := ratingMAC > 0 ? ratingMA / ratingMAC : na
    
    float ratingOther = 0
    float ratingOtherC = 0
    
    ratingRSI = RSI
    if not(na(ratingRSI) or na(ratingRSI[1]))
        ratingOtherC := ratingOtherC + 1
        ratingOther := ratingOther + calcRating(ratingRSI < 30 and ratingRSI[1] < ratingRSI, ratingRSI > 70 and ratingRSI[1] > ratingRSI)
    
    if not(na(kStoch) or na(dStoch) or na(kStoch[1]) or na(dStoch[1]))
        ratingOtherC := ratingOtherC + 1
        ratingOther := ratingOther + calcRating(kStoch < 20 and dStoch < 20 and kStoch > dStoch and kStoch[1] < dStoch[1], kStoch > 80 and dStoch > 80 and kStoch < dStoch and kStoch[1] > dStoch[1])
    
    ratingCCI = CCI
    if not(na(ratingCCI) or na(ratingCCI[1]))
        ratingOtherC := ratingOtherC + 1
        ratingOther := ratingOther + calcRating(ratingCCI < -100 and ratingCCI > ratingCCI[1], ratingCCI > 100 and ratingCCI < ratingCCI[1])
    
    if not(na(adxValue) or na(adxPlus[1]) or na(adxMinus[1]) or na(adxPlus) or na(adxMinus))
        ratingOtherC := ratingOtherC + 1
        ratingOther := ratingOther + calcRating(adxValue > 20 and adxPlus[1] < adxMinus[1] and adxPlus > adxMinus, adxValue > 20 and adxPlus[1] > adxMinus[1] and adxPlus < adxMinus)
    
    if not(na(ao) or na(ao[1]))
        ratingOtherC := ratingOtherC + 1
        ratingOther := ratingOther + calcRating(crossover(ao,0) or (ao > 0 and ao[1] > 0 and ao > ao[1] and ao[2] > ao[1]), crossunder(ao,0) or (ao < 0 and ao[1] < 0 and ao < ao[1] and ao[2] < ao[1]))
    
    if not(na(Mom) or na(Mom[1]))
        ratingOtherC := ratingOtherC + 1
        ratingOther := ratingOther + calcRating(Mom > Mom[1], Mom < Mom[1])
    
    if not(na(macdMACD) or na(signalMACD))
        ratingOtherC := ratingOtherC + 1
        ratingOther := ratingOther + calcRating(macdMACD > signalMACD, macdMACD < signalMACD)
    
    float ratingStoch_RSI = na
    if not(na(DownTrend) or na(UpTrend) or na(Stoch_RSI_K) or na(Stoch_RSI_D) or na(Stoch_RSI_K[1]) or na(Stoch_RSI_D[1]))
        ratingStoch_RSI := calcRating(
         DownTrend and Stoch_RSI_K < 20 and Stoch_RSI_D < 20 and Stoch_RSI_K > Stoch_RSI_D and Stoch_RSI_K[1] < Stoch_RSI_D[1],
         UpTrend and Stoch_RSI_K > 80 and Stoch_RSI_D > 80 and Stoch_RSI_K < Stoch_RSI_D and Stoch_RSI_K[1] > Stoch_RSI_D[1])
    if not na(ratingStoch_RSI)
        ratingOtherC := ratingOtherC + 1
        ratingOther := ratingOther + ratingStoch_RSI
    
    float ratingWR = na
    if not(na(WR) or na(WR[1]))
        ratingWR := calcRating(WR < -80 and WR > WR[1], WR > -20 and WR < WR[1])
    if not na(ratingWR)
        ratingOtherC := ratingOtherC + 1
        ratingOther := ratingOther + ratingWR
    
    float ratingBBPower = na
    if not(na(UpTrend) or na(DownTrend) or na(BearPower) or na(BearPower[1]) or na(BullPower) or na(BullPower[1]))
        ratingBBPower := calcRating(
         UpTrend and BearPower < 0 and BearPower > BearPower[1],
         DownTrend and BullPower > 0 and BullPower < BullPower[1])
    if not na(ratingBBPower)
        ratingOtherC := ratingOtherC + 1
        ratingOther := ratingOther + ratingBBPower
    
    float ratingUO = na
    if not(na(UO))
        ratingUO := calcRating(UO > 70, UO < 30)
    if not na(ratingUO)
        ratingOtherC := ratingOtherC + 1
        ratingOther := ratingOther + ratingUO
    
    ratingOther := ratingOtherC > 0 ? ratingOther / ratingOtherC : na
    
    float ratingTotal = 0
    float ratingTotalC = 0
    if not na(ratingMA)
        ratingTotal := ratingTotal + ratingMA
        ratingTotalC := ratingTotalC + 1
    if not na(ratingOther)
        ratingTotal := ratingTotal + ratingOther
        ratingTotalC := ratingTotalC + 1
    ratingTotal := ratingTotalC > 0 ? ratingTotal / ratingTotalC : na
    
    [ratingTotal, ratingOther, ratingMA, ratingOtherC, ratingMAC]
[ratingTotal, ratingOther, ratingMA, ratingOtherC, ratingMAC]  = security(syminfo.tickerid, res, calcRatingAll())
StrongBound = 0.5
WeakBound = 0.1
getSignal(ratingTotal, ratingOther, ratingMA) =>
    float _res = ratingTotal
    if ratingSignal == "MAs"
        _res := ratingMA
    if ratingSignal == "Oscillators"
        _res := ratingOther
    _res
tradeSignal = getSignal(ratingTotal, ratingOther, ratingMA)

dynSLpoints(factor) => factor * atr(14) / syminfo.mintick

//Trading
lotLong = useLong and trueTime ? na : 0
lotShort = useShort and trueTime ? na : 0
strategy.entry("long", strategy.long, lotLong, when = tradeSignal > StrongBound)
strategy.entry("short", strategy.short, lotShort, when = tradeSignal < -StrongBound)
strategy.exit("sl/tp", loss = dynSLpoints(3), trail_points = dynSLpoints(5), trail_offset = dynSLpoints(2))

//Cancel all
if time > finalTime
    strategy.close_all()
    strategy.cancel("long")
    strategy.cancel("short")
```

> Detail

https://www.fmz.com/strategy/441075

> Last Modified

2024-02-05 13:54:34
