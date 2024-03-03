
> Name

SSL动量指标组合交易策略SSL-Momentum-Combo-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略融合SSL通道指标与QQE动量指标,形成较为全面的趋势判断体系。当价格突破SSL通道时,结合QQE指标的多空信号进行进场。同时设置止损止盈 Exit,实现风险管理。

### 策略原理

该策略主要由以下部分组成:

1. SSL通道:判断价格趋势方向。

2. QQE指标:辅助判断趋势动能。

3. 突破Entry:价格突破SSL上下轨时结合QQE信号判断入场。

4. 止损止盈:设置ATR倍数 Exit,控制单笔损益。

5. 分批建仓:分多次逐步建立头寸,获利后移仓。

该策略充分融合了趋势和动量判断,形成既具有趋势跟踪能力又可控制风险的策略系统。

### 优势分析 

相比单一指标策略,该策略有以下优势:

1. SSL通道判断趋势,QQE识别反转时点,指标配合紧密。

2. 突破入场,可避免追high买入。

3. 止损止盈设定合理,可控制单笔损益。

4. 分批建仓降低风险,获利后移仓固定利润。

5. 参数优化空间大,可调整至最优Solution。

6. 可灵活应用在多品种多周期。

7. 可引入机器学习进行智能优化。

8. 整体稳定性和收益风险比优于单一指标策略。

### 风险分析

但该策略也存在以下主要风险:

1. 多参数优化难度较大,存在Overfitting风险。

2. SSL通道及QQE均存在一定滞后性。 

3. 多指标组合提高了策略复杂度。

4. 分批建仓会增大滑点成本。

5. 需关注收益最大回撤比指标。

6. 效果随市场环境变化而波动较大。

7. 需验证参数在不同周期及品种中的稳健性。

8. 交易频率较高,影响交易成本。

### 优化方向

基于以上分析,该策略可考虑以下几点优化:

1. 评估不同品种及周期参数健壮性。

2. 设置动态止损止盈比例。

3. 优化资金管理策略。

4. 构建动态仓位管理模型。

5. 引入机器学习生成更优入场时机。

6. 回测窗口滚动,检验参数稳定性。 

7. 评估交易成本影响,调整频率。

8. 优化分批建仓规模比例。

9. 持续优化,使策略与市场保持同步。

### 总结

本策略在SSL和QQE指标紧密配合下,形成稳定的趋势策略体系。但任何策略都需要不断优化与迭代,保持对市场的敏感度。只有通过持续学习与验证,量化策略才能长期稳定盈利。

||

### Overview 

This strategy combines the SSL channel with the QQE momentum indicator to form a comprehensive trend assessment system. It enters when price breaks the SSL channel, with extra confirmation from QQE signals. Stops and exits are implemented for risk management.

### Strategy Logic

The key components are:

1. SSL channel: Identifying price trend.

2. QQE indicator: Confirming momentum. 

3. Breakout entry: Price breaking SSL bands combined with QQE signals. 

4. Stops and exits: ATR-based stops and exits to control loss/profit per trade. 

5. Scaling in: Gradual position build-up, profit taking and re-allocation.

The combo of trend and momentum tools forms a strategy with both trend following ability and risk control. 

### Advantages

Compared to single indicator strategies, the advantages are:

1. SSL for trend, QQE for reversals - good complementarity.  

2. Breakout entries avoid buying at highs.

3. Reasonable stops and exits control risk/reward per trade.

4. Scaling in lowers risk, profit taking locks in gains.

5. Large optimization space for finding optimum parameters.

6. Flexible application across different markets and timeframes.

7. Potential to apply machine learning for smarter optimizations.

8. Overall more stable with better risk-adjusted returns than single indicators.

### Risks

However, the main risks are:

1. Challenging multi-parameter optimization with overfitting risks.

2. SSL and QQE have some lagging.

3. Increased complexity with multiple indicators. 

4. Scaling in may increase slippage costs.

5. Need to monitor maximum drawdown.

6. Performance subject to changing market regimes.

7. Robustness across periods and instruments needs verification.

8. High trade frequency increases transaction costs.

### Enhancements

Based on the analysis, enhancements may involve:

1. Evaluating parameter robustness across different markets and timeframes.

2. Implementing dynamic stops and exits.

3. Optimizing risk management strategies. 

4. Constructing dynamic position sizing models.

5. Incorporating machine learning for smarter entries.

6. Rolling window backtests to verify stability.

7. Assessing transaction cost impact and adjusting frequency.

8. Optimizing scaling size proportions. 

9. Continual improvements for market adaptiveness.

### Conclusion

In summary, the tight integration of SSL and QQE forms a stable trend following system. But continual optimizations and iterations are crucial for any strategy to stay adaptive. Only through persistent learning and validation can quant strategies achieve sustainable success.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_27|6|RSI Length|
|v_input_28|5|RSI Smoothing|
|v_input_29|3|Fast QQE Factor|
|v_input_30|3|Thresh-hold|
|v_input_31_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_32|50|Bollinger Length|
|v_input_33|0.35|BB Multiplier|
|v_input_34|6|RSI Length|
|v_input_35|5|RSI Smoothing|
|v_input_36|1.61|Fast QQE2 Factor|
|v_input_37|3|Thresh-hold|
|v_input_38_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_1|true|(?SSL Hybrid Indicator Settings)Show Baseline|
|v_input_2|true|Show SSL1|
|v_input_3|false|Show ATR bands|
|v_input_4|14|ATR Period|
|v_input_5|true|ATR Multi|
|v_input_6|0|ATR Smoothing: WMA|SMA|EMA|RMA|
|v_input_7|0|SSL1 / Baseline Type: HMA|EMA|DEMA|TEMA|LSMA|WMA|MF|VAMA|TMA|SMA|JMA|Kijun v2|EDSMA|McGinley|
|v_input_8|60|SSL1 / Baseline Length|
|v_input_9|0|SSL2 / Continuation Type: JMA|EMA|DEMA|TEMA|WMA|MF|VAMA|TMA|HMA|SMA|McGinley|
|v_input_10|5|SSL 2 Length|
|v_input_11|0|EXIT Type: HMA|TEMA|LSMA|VAMA|TMA|DEMA|JMA|Kijun v2|McGinley|MF|
|v_input_12|15|EXIT Length|
|v_input_13_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|true|Kijun MOD Divider|
|v_input_15|3|* Jurik (JMA) Only - Phase|
|v_input_16|true|* Jurik (JMA) Only - Power|
|v_input_17|10|* Volatility Adjusted (VAMA) Only - Volatility lookback length|
|v_input_18|0.8|Modular Filter, General Filter Only - Beta|
|v_input_19|false|Modular Filter Only - Feedback|
|v_input_20|0.5|Modular Filter Only - Feedback Weighting|
|v_input_21|20|EDSMA - Super Smoother Filter Length|
|v_input_22|0|EDSMA - Super Smoother Filter Poles: 2|3|
|v_input_23|true|useTrueRange|
|v_input_24|0.2|Base Channel Multiplier|
|v_input_25|true|Color Bars|
|v_input_26|0.9|Continuation ATR Criteria|
|v_input_39|14|(?Strategy Back Test Settings)ATR Length|
|v_input_40|timestamp(01 Aug 2021 00:00 +0100)|(?Date Range)From|
|v_input_41|timestamp(01 Sep 2021 00:00 +0100)|To|
|v_input_42|true|(?Exit Settings)Use TP & SL|
|v_input_43|1.6|SL ATR Multiplier|
|v_input_44|true|Move SL on TP1|
|v_input_45|1.8|TP1 ATR Multiplier|
|v_input_46|20|TP1 Exit Percentage|
|v_input_47|2.2|TP2 ATR Multiplier|
|v_input_48|30|TP2 Exit Percentage|
|v_input_49|2.6|TP3 ATR Multiplier|
|v_input_50|30|TP3 Exit Percentage|
|v_input_51|4|TP4 ATR Multiplier|
|v_input_52|10|TP4 Exit Percentage|
|v_input_53|8|TP5 ATR Multiplier|
|v_input_54|10|TP5 Exit Percentage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-23 00:00:00
end: 2023-09-22 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// Strategy based on the SSL Hybrid indicator by Mihkel00
// Designed for the purpose of back testing
// Strategy:
//  - Enters both long and short trades based on SSL1 crossing the baseline
//  - Stop Loss calculated based on ATR multiplier
//  - Take Profit calculated based on 2 ATR multipliers and exits percentage of position on TP1 and TP2
//
// Credits:
// SSL Hybrid Mihkel00 https://www.tradingview.com/u/Mihkel00/

// -------------------------------- SSL HYBRID ---------------------------------
strategy("SSL Hybrid + QQE Strategy", overlay=true, initial_capital=5000, default_qty_value=10, default_qty_type=strategy.percent_of_equity, commission_type = "percent", commission_value=0.04, max_labels_count=500, calc_on_every_tick=true, pyramiding=10)
show_Baseline = input(title="Show Baseline", type=input.bool, defval=true, group="SSL Hybrid Indicator Settings")
show_SSL1 = input(title="Show SSL1", type=input.bool, defval=true, group="SSL Hybrid Indicator Settings")
show_atr = input(title="Show ATR bands", type=input.bool, defval=false, group="SSL Hybrid Indicator Settings")
//ATR
atrlen = input(14, "ATR Period", group="SSL Hybrid Indicator Settings")
mult = input(1, "ATR Multi", step=0.1, group="SSL Hybrid Indicator Settings")
smoothing = input(title="ATR Smoothing", defval="WMA", options=["RMA", "SMA", "EMA", "WMA"], group="SSL Hybrid Indicator Settings")

ma_function(source, atrlen) => 
    if smoothing == "RMA"
        rma(source, atrlen)
    else
        if smoothing == "SMA"
            sma(source, atrlen)
        else
            if smoothing == "EMA"
                ema(source, atrlen)
            else
                wma(source, atrlen)
atr_slen = ma_function(tr(true), atrlen)
////ATR Up/Low Bands
upper_band = atr_slen * mult + close
lower_band = close - atr_slen * mult

////BASELINE / SSL1 / SSL2 / EXIT MOVING AVERAGE VALUES
maType = input(title="SSL1 / Baseline Type", type=input.string, defval="HMA", options=["SMA","EMA","DEMA","TEMA","LSMA","WMA","MF","VAMA","TMA","HMA", "JMA", "Kijun v2", "EDSMA","McGinley"], group="SSL Hybrid Indicator Settings")
len = input(title="SSL1 / Baseline Length", defval=60, group="SSL Hybrid Indicator Settings")

SSL2Type = input(title="SSL2 / Continuation Type", type=input.string, defval="JMA", options=["SMA","EMA","DEMA","TEMA","WMA","MF","VAMA","TMA","HMA", "JMA","McGinley"], group="SSL Hybrid Indicator Settings")
len2 = input(title="SSL 2 Length", defval=5, group="SSL Hybrid Indicator Settings")
//
SSL3Type = input(title="EXIT Type", type=input.string, defval="HMA", options=["DEMA","TEMA","LSMA","VAMA","TMA","HMA","JMA", "Kijun v2", "McGinley", "MF"], group="SSL Hybrid Indicator Settings")
len3 = input(title="EXIT Length", defval=15, group="SSL Hybrid Indicator Settings")
src = input(title="Source", type=input.source, defval=close, group="SSL Hybrid Indicator Settings")

//
tema(src, len) =>
    ema1 = ema(src, len)
    ema2 = ema(ema1, len)
    ema3 = ema(ema2, len)
    (3 * ema1) - (3 * ema2) + ema3
kidiv = input(defval=1,maxval=4,  title="Kijun MOD Divider", group="SSL Hybrid Indicator Settings")

jurik_phase = input(title="* Jurik (JMA) Only - Phase", type=input.integer, defval=3, group="SSL Hybrid Indicator Settings")
jurik_power = input(title="* Jurik (JMA) Only - Power", type=input.integer, defval=1, group="SSL Hybrid Indicator Settings")
volatility_lookback = input(10, title="* Volatility Adjusted (VAMA) Only - Volatility lookback length", group="SSL Hybrid Indicator Settings")
//MF
beta = input(0.8,minval=0,maxval=1,step=0.1,  title="Modular Filter, General Filter Only - Beta", group="SSL Hybrid Indicator Settings")
feedback = input(false, title="Modular Filter Only - Feedback", group="SSL Hybrid Indicator Settings")
z = input(0.5,title="Modular Filter Only - Feedback Weighting",step=0.1, minval=0, maxval=1, group="SSL Hybrid Indicator Settings")
//EDSMA
ssfLength = input(title="EDSMA - Super Smoother Filter Length", type=input.integer, minval=1, defval=20, group="SSL Hybrid Indicator Settings")
ssfPoles = input(title="EDSMA - Super Smoother Filter Poles", type=input.integer, defval=2, options=[2, 3], group="SSL Hybrid Indicator Settings")

//----

//EDSMA
get2PoleSSF(src, length) =>
    PI = 2 * asin(1)
    arg = sqrt(2) * PI / length
    a1 = exp(-arg)
    b1 = 2 * a1 * cos(arg)
    c2 = b1
    c3 = -pow(a1, 2)
    c1 = 1 - c2 - c3
    
    ssf = 0.0
    ssf := c1 * src + c2 * nz(ssf[1]) + c3 * nz(ssf[2])

get3PoleSSF(src, length) =>
    PI = 2 * asin(1)

    arg = PI / length
    a1 = exp(-arg)
    b1 = 2 * a1 * cos(1.738 * arg)
    c1 = pow(a1, 2)

    coef2 = b1 + c1
    coef3 = -(c1 + b1 * c1)
    coef4 = pow(c1, 2)
    coef1 = 1 - coef2 - coef3 - coef4

    ssf = 0.0
    ssf := coef1 * src + coef2 * nz(ssf[1]) + coef3 * nz(ssf[2]) + coef4 * nz(ssf[3])

ma(type, src, len) =>
    float result = 0
    if type=="TMA"
        result := sma(sma(src, ceil(len / 2)), floor(len / 2) + 1)
    if type=="MF"
        ts=0.,b=0.,c=0.,os=0.
        //----
        alpha = 2/(len+1)
        a = feedback ? z*src + (1-z)*nz(ts[1],src) : src
        //----
        b := a > alpha*a+(1-alpha)*nz(b[1],a) ? a : alpha*a+(1-alpha)*nz(b[1],a)
        c := a < alpha*a+(1-alpha)*nz(c[1],a) ? a : alpha*a+(1-alpha)*nz(c[1],a)
        os := a == b ? 1 : a == c ? 0 : os[1]
        //----
        upper = beta*b+(1-beta)*c
        lower = beta*c+(1-beta)*b 
        ts := os*upper+(1-os)*lower
        result := ts
    if type=="LSMA"
        result := linreg(src, len, 0)
    if type=="SMA" // Simple
        result := sma(src, len)
    if type=="EMA" // Exponential
        result := ema(src, len)
    if type=="DEMA" // Double Exponential
        e = ema(src, len)
        result := 2 * e - ema(e, len)
    if type=="TEMA" // Triple Exponential
        e = ema(src, len)
        result := 3 * (e - ema(e, len)) + ema(ema(e, len), len)
    if type=="WMA" // Weighted
        result := wma(src, len)
    if type=="VAMA" // Volatility Adjusted
        /// Copyright © 2019 to present, Joris Duyck (JD)
        mid=ema(src,len)
        dev=src-mid
        vol_up=highest(dev,volatility_lookback)
        vol_down=lowest(dev,volatility_lookback)
        result := mid+avg(vol_up,vol_down)
    if type=="HMA" // Hull
        result := wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))
    if type=="JMA" // Jurik
        /// Copyright © 2018 Alex Orekhov (everget)
        /// Copyright © 2017 Jurik Research and Consulting.
        phaseRatio = jurik_phase < -100 ? 0.5 : jurik_phase > 100 ? 2.5 : jurik_phase / 100 + 1.5
        beta = 0.45 * (len - 1) / (0.45 * (len - 1) + 2)
        alpha = pow(beta, jurik_power)
        jma = 0.0
        e0 = 0.0
        e0 := (1 - alpha) * src + alpha * nz(e0[1])
        e1 = 0.0
        e1 := (src - e0) * (1 - beta) + beta * nz(e1[1])
        e2 = 0.0
        e2 := (e0 + phaseRatio * e1 - nz(jma[1])) * pow(1 - alpha, 2) + pow(alpha, 2) * nz(e2[1])
        jma := e2 + nz(jma[1])
        result := jma
    if type=="Kijun v2"
        kijun = avg(lowest(len), highest(len))//, (open + close)/2)
        conversionLine = avg(lowest(len/kidiv), highest(len/kidiv))
        delta = (kijun + conversionLine)/2
        result :=delta
    if type=="McGinley"
        mg = 0.0
        ema = ema(src, len)
        mg := na(mg[1]) ? ema : mg[1] + (src - mg[1]) / (len * pow(src/mg[1], 4))
        result :=mg
    if type=="EDSMA"
    
        zeros = src - nz(src[2])
        avgZeros = (zeros + zeros[1]) / 2
        
        // Ehlers Super Smoother Filter 
        ssf = ssfPoles == 2
             ? get2PoleSSF(avgZeros, ssfLength)
             : get3PoleSSF(avgZeros, ssfLength)
        
        // Rescale filter in terms of Standard Deviations
        stdev = stdev(ssf, len)
        scaledFilter = stdev != 0
             ? ssf / stdev
             : 0
        
        alpha = 5 * abs(scaledFilter) / len
        
        edsma = 0.0
        edsma := alpha * src + (1 - alpha) * nz(edsma[1])
        result :=  edsma
    result
    
///SSL 1 and SSL2
emaHigh = ma(maType, high, len)
emaLow = ma(maType, low, len)

maHigh = ma(SSL2Type, high, len2)
maLow = ma(SSL2Type, low, len2)

///EXIT
ExitHigh = ma(SSL3Type, high, len3)
ExitLow = ma(SSL3Type, low, len3)

///Keltner Baseline Channel
BBMC = ma(maType, close, len)
useTrueRange = input(true, group="SSL Hybrid Indicator Settings")
multy = input(0.2, step=0.05, title="Base Channel Multiplier", group="SSL Hybrid Indicator Settings")
Keltma = ma(maType, src, len)
range = useTrueRange ? tr : high - low
rangema = ema(range, len)
upperk =Keltma + rangema * multy
lowerk = Keltma - rangema * multy

//Baseline Violation Candle
open_pos =  open*1
close_pos = close*1
difference = abs(close_pos-open_pos)
atr_violation = difference > atr_slen
InRange = upper_band > BBMC and lower_band < BBMC
candlesize_violation = atr_violation and InRange
plotshape(candlesize_violation, color=color.new(color.white, transp=0), size=size.tiny,style=shape.diamond, location=location.top, title="Candle Size > 1xATR")


//SSL1 VALUES
Hlv = int(na)
Hlv := close > emaHigh ? 1 : close < emaLow ? -1 : Hlv[1]
sslDown = Hlv < 0 ? emaHigh : emaLow

//SSL2 VALUES
Hlv2 = int(na)
Hlv2 := close > maHigh ? 1 : close < maLow ? -1 : Hlv2[1]
sslDown2 = Hlv2 < 0 ? maHigh : maLow

//EXIT VALUES
Hlv3 = int(na)
Hlv3 := close > ExitHigh ? 1 : close < ExitLow ? -1 : Hlv3[1]
sslExit = Hlv3 < 0 ? ExitHigh : ExitLow
base_cross_Long = crossover(close, sslExit)
base_cross_Short = crossover(sslExit, close)
codiff = base_cross_Long ? 1 : base_cross_Short ? -1 : na 

//COLORS
show_color_bar = input(title="Color Bars", type=input.bool, defval=true, group="SSL Hybrid Indicator Settings")
color_bar = close > upperk ? #00c3ff : close < lowerk ? #ff0062 : color.gray
color_ssl1 = close > sslDown ? #00c3ff : close < sslDown ? #ff0062 : na

//PLOTS
plotarrow(codiff, colorup=color.rgb(0, 195, 255, transp=0), colordown=color.rgb(255, 0, 98, transp=0),title="Exit Arrows", maxheight=20, offset=0, display=display.none)
p1 = plot(show_Baseline ? BBMC : na, color=color.new(color_bar, transp=0), linewidth=4, title='MA Baseline')
DownPlot = plot( show_SSL1 ? sslDown : na, title="SSL1", linewidth=3, color=color.new(color_ssl1, transp=10))
barcolor(show_color_bar ? color_bar : na)
up_channel = plot(show_Baseline ? upperk : na, color=color_bar, title="Baseline Upper Channel")
low_channel = plot(show_Baseline ? lowerk : na, color=color_bar, title="Basiline Lower Channel")
fill(up_channel, low_channel, color=color.new(color_bar, transp=90))

////SSL2 Continiuation from ATR
atr_crit = input(0.9, step=0.1, title="Continuation ATR Criteria", group="SSL Hybrid Indicator Settings")
upper_half = atr_slen * atr_crit + close
lower_half = close - atr_slen * atr_crit
buy_inatr =  lower_half < sslDown2
sell_inatr = upper_half > sslDown2
sell_cont = close < BBMC and close < sslDown2
buy_cont = close > BBMC and close > sslDown2
sell_atr = sell_inatr and sell_cont
buy_atr = buy_inatr and buy_cont
atr_fill = buy_atr ? color.green : sell_atr ? color.purple : color.white
LongPlot = plot(sslDown2, title="SSL2", linewidth=2, color=color.new(atr_fill, transp=0), style=plot.style_circles, display=display.none)
u = plot(show_atr ? upper_band : na, "+ATR", color=color.new(color.white, transp=80), display=display.none)
l = plot(show_atr ? lower_band : na, "-ATR", color=color.new(color.white, transp=80), display=display.none)

// ---------------------------- QQE MOD INDICATOR ------------------------------
RSI_Period = input(6, title='RSI Length')
SF = input(5, title='RSI Smoothing')
QQE = input(3, title='Fast QQE Factor')
ThreshHold = input(3, title="Thresh-hold")

rsi_src = input(close, title="RSI Source")

Wilders_Period = RSI_Period * 2 - 1


Rsi = rsi(rsi_src, RSI_Period)
RsiMa = ema(Rsi, SF)
AtrRsi = abs(RsiMa[1] - RsiMa)
MaAtrRsi = ema(AtrRsi, Wilders_Period)
dar = ema(MaAtrRsi, Wilders_Period) * QQE

longband = 0.0
shortband = 0.0
trend = 0

DeltaFastAtrRsi = dar
RSIndex = RsiMa
newshortband = RSIndex + DeltaFastAtrRsi
newlongband = RSIndex - DeltaFastAtrRsi
longband := RSIndex[1] > longband[1] and RSIndex > longband[1] ? 
   max(longband[1], newlongband) : newlongband
shortband := RSIndex[1] < shortband[1] and RSIndex < shortband[1] ? 
   min(shortband[1], newshortband) : newshortband
cross_1 = cross(longband[1], RSIndex)
trend := cross(RSIndex, shortband[1]) ? 1 : cross_1 ? -1 : nz(trend[1], 1)
FastAtrRsiTL = trend == 1 ? longband : shortband
////////////////////


length = input(50, minval=1, title="Bollinger Length")
bb_mult = input(0.35, minval=0.001, maxval=5, step=0.1, title="BB Multiplier")
basis = sma(FastAtrRsiTL - 50, length)
dev = bb_mult * stdev(FastAtrRsiTL - 50, length)
upper = basis + dev
lower = basis - dev
rsi_ma_color_bar = RsiMa - 50 > upper ? #00c3ff : RsiMa - 50 < lower ? #ff0062 : color.gray


// Zero cross
QQEzlong = 0
QQEzlong := nz(QQEzlong[1])
QQEzshort = 0
QQEzshort := nz(QQEzshort[1])
QQEzlong := RSIndex >= 50 ? QQEzlong + 1 : 0
QQEzshort := RSIndex < 50 ? QQEzshort + 1 : 0

////////////////////////////////////////////////////////////////

RSI_Period2 = input(6, title='RSI Length')
SF2 = input(5, title='RSI Smoothing')
QQE2 = input(1.61, title='Fast QQE2 Factor')
ThreshHold2 = input(3, title="Thresh-hold")

src2 = input(close, title="RSI Source")

Wilders_Period2 = RSI_Period2 * 2 - 1


Rsi2 = rsi(src2, RSI_Period2)
RsiMa2 = ema(Rsi2, SF2)
AtrRsi2 = abs(RsiMa2[1] - RsiMa2)
MaAtrRsi2 = ema(AtrRsi2, Wilders_Period2)
dar2 = ema(MaAtrRsi2, Wilders_Period2) * QQE2
longband2 = 0.0
shortband2 = 0.0
trend2 = 0

DeltaFastAtrRsi2 = dar2
RSIndex2 = RsiMa2
newshortband2 = RSIndex2 + DeltaFastAtrRsi2
newlongband2 = RSIndex2 - DeltaFastAtrRsi2
longband2 := RSIndex2[1] > longband2[1] and RSIndex2 > longband2[1] ? 
   max(longband2[1], newlongband2) : newlongband2
shortband2 := RSIndex2[1] < shortband2[1] and RSIndex2 < shortband2[1] ? 
   min(shortband2[1], newshortband2) : newshortband2
cross_2 = cross(longband2[1], RSIndex2)
trend2 := cross(RSIndex2, shortband2[1]) ? 1 : cross_2 ? -1 : nz(trend2[1], 1)
FastAtrRsi2TL = trend2 == 1 ? longband2 : shortband2

// Zero cross
QQE2zlong = 0
QQE2zlong := nz(QQE2zlong[1])
QQE2zshort = 0
QQE2zshort := nz(QQE2zshort[1])
QQE2zlong := RSIndex2 >= 50 ? QQE2zlong + 1 : 0
QQE2zshort := RSIndex2 < 50 ? QQE2zshort + 1 : 0

hcolor2 = RsiMa2 - 50 > ThreshHold2 ? color.silver :
   RsiMa2 - 50 < 0 - ThreshHold2 ? color.silver : na
// plot(FastAtrRsi2TL - 50, title='QQE Line', color=color.white, transp=0, linewidth=2)
// plot(RsiMa2 - 50, color=hcolor2, transp=50, title='Histo2', style=plot.style_columns)

Greenbar1 = RsiMa2 - 50 > ThreshHold2
Greenbar2 = RsiMa - 50 > upper

Redbar1 = RsiMa2 - 50 < 0 - ThreshHold2
Redbar2 = RsiMa - 50 < lower

qqe_line = FastAtrRsi2TL - 50
qqe_blue_bar = Greenbar1 and Greenbar2 == 1
qqe_red_bar = Redbar1 and Redbar2 == 1
// plot(Greenbar1 and Greenbar2 == 1 ? RsiMa2 - 50 : na, title="QQE Up", style=plot.style_columns, color=#00c3ff, transp=0)
// plot(Redbar1 and Redbar2 == 1 ? RsiMa2 - 50 : na, title="QQE Down", style=plot.style_columns, color=#ff0062, transp=0)

// ----------------------------------STRATEGY ----------------------------------

atr_length = input(title="ATR Length", type=input.integer, defval=14, inline="1", group="Strategy Back Test Settings")
atr = atr(atr_length)

// Back test time range
from_date = input(title="From", type=input.time, defval=timestamp("01 Aug 2021 00:00 +0100"), inline="1", group="Date Range")
to_date = input(title="To", type=input.time, defval=timestamp("01 Sep 2021 00:00 +0100"), inline="1", group="Date Range")
in_date = true

// Strategy exit settings

// Stop-Loss Settings
use_tp_sl = input(title="Use TP & SL", type=input.bool, defval=true, inline="1", group="Exit Settings")
sl_atr_multiplier = input(title="SL ATR Multiplier", type=input.float, defval=1.6, step=0.1, inline="2", group="Exit Settings")
move_sl_on_tp = input(title="Move SL on TP1", type=input.bool, defval=true, inline="2", group="Exit Settings")

// Take Profit Settings
tp1_atr_multiplier = input(title="TP1 ATR Multiplier", type=input.float, defval=1.8, step=0.1, inline="3", group="Exit Settings")
tp1_exit_percentage = input(title="TP1 Exit Percentage", type=input.integer, defval=20, step=1, maxval=100, inline="3", group="Exit Settings")

tp2_atr_multiplier = input(title="TP2 ATR Multiplier", type=input.float, defval=2.2, step=0.1, inline="4", group="Exit Settings")
tp2_exit_percentage = input(title="TP2 Exit Percentage", type=input.integer, defval=30, step=1, maxval=100, inline="4", group="Exit Settings")

tp3_atr_multiplier = input(title="TP3 ATR Multiplier", type=input.float, defval=2.6, step=0.1, inline="5", group="Exit Settings")
tp3_exit_percentage = input(title="TP3 Exit Percentage", type=input.integer, defval=30, step=1, maxval=100, inline="5", group="Exit Settings")

tp4_atr_multiplier = input(title="TP4 ATR Multiplier", type=input.float, defval=4, step=0.1, inline="6", group="Exit Settings")
tp4_exit_percentage = input(title="TP4 Exit Percentage", type=input.integer, defval=10, step=1, maxval=100, inline="6", group="Exit Settings")

tp5_atr_multiplier = input(title="TP5 ATR Multiplier", type=input.float, defval=8, step=0.1, inline="7", group="Exit Settings")
tp5_exit_percentage = input(title="TP5 Exit Percentage", type=input.integer, defval=10, step=1, maxval=100, inline="7", group="Exit Settings")

var long_sl = close - (atr * sl_atr_multiplier)
var long_tp1 = close + (atr * tp1_atr_multiplier)
var long_tp2 = close + (atr * tp2_atr_multiplier)
var long_tp3 = close + (atr * tp3_atr_multiplier)
var long_tp4 = close + (atr * tp4_atr_multiplier)
var long_tp5 = close + (atr * tp5_atr_multiplier)

var short_sl = close + (atr * sl_atr_multiplier)
var short_tp1 = close - (atr * tp1_atr_multiplier)
var short_tp2 = close - (atr * tp2_atr_multiplier)
var short_tp3 = close - (atr * tp3_atr_multiplier)
var short_tp4 = close - (atr * tp4_atr_multiplier)
var short_tp5 = close - (atr * tp5_atr_multiplier)

var is_long_sl_moved = false
var is_short_sl_moved = false

is_open_long = strategy.position_size > 0
is_open_short = strategy.position_size < 0

var in_ssl_long = false
var in_ssl_short = false

var start_trading = false
var ssl_long_entry = false
var ssl_short_entry = false

var did_prev_bar_ssl_flip = false

// Ensure crossover occurrs before entering first position. This ensures first entry after chosen start date is an actual entry and not just entering on start date
if not ssl_long_entry and not ssl_short_entry and in_date and not start_trading
    start_trading := crossover(close, sslDown) or crossunder(close, sslDown)

if in_date and start_trading
    ssl_long_entry := close > sslDown and qqe_blue_bar and qqe_line > 0
    ssl_short_entry := close < sslDown and qqe_red_bar and qqe_line < 0

remaining_percent = 100
var total_tokens = float(na)
total_tokens := strategy.equity * 0.10 / close

tp1_percent = tp1_exit_percentage <= remaining_percent ? tp1_exit_percentage : remaining_percent
remaining_percent -= tp1_percent
entry_1 = total_tokens * (tp1_percent / 100)

tp2_percent = tp2_exit_percentage <= remaining_percent ? tp2_exit_percentage : remaining_percent
remaining_percent -= tp2_percent
entry_2 = total_tokens * (tp2_percent / 100)

tp3_percent = tp3_exit_percentage <= remaining_percent ? tp3_exit_percentage : remaining_percent
remaining_percent -= tp3_percent
entry_3 = total_tokens * (tp3_percent / 100)

tp4_percent = tp4_exit_percentage <= remaining_percent ? tp4_exit_percentage : remaining_percent
remaining_percent -= tp4_percent
entry_4 = total_tokens * (tp4_percent / 100)

tp5_percent = tp5_exit_percentage <= remaining_percent ? tp5_exit_percentage : remaining_percent
remaining_percent -= tp5_percent
entry_5 = total_tokens * (tp5_percent / 100)

if not is_long_sl_moved and high >= long_tp1 and move_sl_on_tp and use_tp_sl
    is_long_sl_moved := true
    strategy.exit("LongExit2", "LongEntry2", stop=strategy.position_avg_price, limit=long_tp2)
    strategy.exit("LongExit3", "LongEntry3", stop=strategy.position_avg_price, limit=long_tp3)
    strategy.exit("LongExit4", "LongEntry4", stop=strategy.position_avg_price, limit=long_tp4)
    strategy.exit("LongExit5", "LongEntry5", stop=strategy.position_avg_price, limit=long_tp5)
if not is_short_sl_moved and low <= short_tp1 and move_sl_on_tp and use_tp_sl
    is_short_sl_moved := true
    strategy.exit("ShortExit2", "ShortEntry2", stop=strategy.position_avg_price, limit=short_tp2)
    strategy.exit("ShortExit3", "ShortEntry3", stop=strategy.position_avg_price, limit=short_tp3)
    strategy.exit("ShortExit4", "ShortEntry4", stop=strategy.position_avg_price, limit=short_tp4)
    strategy.exit("ShortExit5", "ShortEntry5", stop=strategy.position_avg_price, limit=short_tp5)
    
if did_prev_bar_ssl_flip
    did_prev_bar_ssl_flip := false
    position_value = abs(strategy.position_size * close)
    if in_ssl_long
        label.new(x=bar_index, y=close, xloc=xloc.bar_index, yloc=yloc.abovebar, text=tostring(position_value), style=label.style_label_down, size=size.tiny)
    else
        label.new(x=bar_index, y=close, xloc=xloc.bar_index, yloc=yloc.belowbar, text=tostring(position_value), style=label.style_label_up, size=size.tiny)

if ssl_long_entry and in_date and not in_ssl_long
    in_ssl_long := true
    in_ssl_short := false
    did_prev_bar_ssl_flip := true
    long_sl := close - (atr * sl_atr_multiplier)
    long_tp1 := close + (atr * tp1_atr_multiplier)
    long_tp2 := close + (atr * tp2_atr_multiplier)
    long_tp3 := close + (atr * tp3_atr_multiplier)
    long_tp4 := close + (atr * tp4_atr_multiplier)
    long_tp5 := close + (atr * tp5_atr_multiplier)

    strategy.entry("LongEntry1", strategy.long, qty=entry_1)
    strategy.entry("LongEntry2", strategy.long, qty=entry_2)
    strategy.entry("LongEntry3", strategy.long, qty=entry_3)
    strategy.entry("LongEntry4", strategy.long, qty=entry_4)
    strategy.entry("LongEntry5", strategy.long, qty=entry_5)

    if use_tp_sl
        strategy.exit("LongExit1", "LongEntry1", stop=long_sl, limit=long_tp1)
        strategy.exit("LongExit2", "LongEntry2", stop=long_sl, limit=long_tp2)
        strategy.exit("LongExit3", "LongEntry3", stop=long_sl, limit=long_tp3)
        strategy.exit("LongExit4", "LongEntry4", stop=long_sl, limit=long_tp4)
        strategy.exit("LongExit5", "LongEntry5", stop=long_sl, limit=long_tp5)
        is_long_sl_moved := false

if ssl_short_entry and in_date and not in_ssl_short
    in_ssl_short := true
    in_ssl_long := false
    did_prev_bar_ssl_flip := true
    short_sl := close + (atr * sl_atr_multiplier)
    short_tp1 := close - (atr * tp1_atr_multiplier)
    short_tp2 := close - (atr * tp2_atr_multiplier)
    short_tp3 := close - (atr * tp3_atr_multiplier)
    short_tp4 := close - (atr * tp4_atr_multiplier)
    short_tp5 := close - (atr * tp5_atr_multiplier)
    
    strategy.entry("ShortEntry1", strategy.short, qty=entry_1)
    strategy.entry("ShortEntry2", strategy.short, qty=entry_2)
    strategy.entry("ShortEntry3", strategy.short, qty=entry_3)
    strategy.entry("ShortEntry4", strategy.short, qty=entry_4)
    strategy.entry("ShortEntry5", strategy.short, qty=entry_5)
    
    if use_tp_sl
        strategy.exit("ShortExit1", "ShortEntry1", stop=short_sl, limit=short_tp1)
        strategy.exit("ShortExit2", "ShortEntry2", stop=short_sl, limit=short_tp2)
        strategy.exit("ShortExit3", "ShortEntry3", stop=short_sl, limit=short_tp3)
        strategy.exit("ShortExit4", "ShortEntry4", stop=short_sl, limit=short_tp4)
        strategy.exit("ShortExit5", "ShortEntry5", stop=short_sl, limit=short_tp5)
        is_short_sl_moved := false

```

> Detail

https://www.fmz.com/strategy/427678

> Last Modified

2023-09-23 15:44:29
