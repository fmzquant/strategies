
> Name

基于多个因子量化交易策略Multi-factor-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/190d14b1ac506100b97.png)
[trans]
### 概述

该策略综合运用RSI、MACD、OBV、CCI、CMF、MFI和VWMACD等多个技术指标,检测价格与成交量之间的背离,以识别潜在的入场机会。策略同时结合user dip检测指标,在满足高波动率和深度或VFI条件时发出交易信号。策略仅做多,利用追踪止损逐步加仓建立仓位。

### 策略原理  

1. 计算RSI、MACD、OBV、CCI、CMF、MFI和VWMACD等指标,并通过自适应线性回归方法检测各指标与历史价格之间的背离。当指标创新低而价格没有跟随创新低时,发出买入信号。

2. 基于用户输入的波动率阈值和深度百分比阈值,结合VFI指标过滤,在符合高波动和深度测试的K线上发出信号。

3. 初始做多后,如果价格跌破最后一个做多价格的一定比例(可配置),则再次加仓做多。

4. 使用追踪止损,达到配置的止盈比例时平仓。

### 优势分析

1. 多因子组合,综合运用价格与成交量指标,提高信号的可靠性。

2. 自适应线性回归方法检测背离,避免人为判断的主观性。

3. 结合波动率与深度/VFI检测指标,有助于发现反转机会。 

4. 多次加仓建仓可充分利用价格回调,且追踪止盈有利锁定利润。

### 风险分析  

1. 多因子组合判断较为复杂,参数优化和背离识别效果可能会影响实际表现。

2. 单边持仓风险高,若判断错误可能造成较大损失。

3. 反复加仓模式下,亏损也会放大,需要谨慎控制仓位。

4. 需关注交易手续费对实际盈利的影响。

### 优化方向

1. 测试不同参数组合和指标的效果,优选配置。

2. 添加止损策略,控制单笔和最大亏损。

3. 考虑双向交易机会,以分散风险。

4. 结合机器学习方法自动优化参数。

### 总结

该策略综合多种技术指标识别入场时点,同时利用用户定义条件和VFI指标过滤false signal。策略利用价格回调不断加仓追涨,有利于抓取趋势中的机会。但也面临判断错误和单边持仓的风险,需要适当优化指标参数、止损策略等来降低风险,提高盈利空间。

||

### Overview  

This strategy combines multiple technical indicators such as RSI, MACD, OBV, CCI, CMF, MFI and VWMACD to detect divergences between price and volume to identify potential entry opportunities. The strategy also incorporates user dip detection indicators to generate trading signals when high volatility and depth or VFI conditions are met. The strategy only goes long and uses tracking stop loss to gradually accumulate positions.

### Strategy Logic   

1. Calculate indicators like RSI, MACD, OBV, CCI, CMF, MFI and VWMACD, and detect divergences between the indicators and historical prices using an adaptive linear regression method. Generate buy signals when an indicator makes a new low while the price does not.  

2. Based on user input volatility threshold and depth percentage threshold, combined with VFI indicator filtering, generate signals on candlesticks that meet high volatility and depth tests.

3. After initial long entry, if the price breaks the last long entry price by a configured percentage, add another long position.  

4. Use tracking stop loss to close positions when reaching configured take profit ratio.

### Advantage Analysis 

1. Multi-factor combination makes comprehensive use of price and volume indicators to improve signal reliability.  

2. Adaptive linear regression method detects divergences and avoids subjectivity of manual judgment.

3. Incorporating volatility, depth/VFI indicators helps discover reversal opportunities.

4. Multi-entry accumulation allows full use of pullbacks, and tracking stop profit helps lock in profits.

### Risk Analysis   

1. Complex multi-factor judgment may affect actual performance depending on parameter optimization and divergence detection effectiveness.

2. Unidirectional holding has higher risk, large losses may occur if judgment is wrong.

3. Loss may be amplified in repeated adding model, position size needs to be carefully controlled. 

4. Pay attention to impact of trading fees on actual profit.

### Optimization Directions  

1. Test combinations of different parameters and indicators to select optimal configuration.  

2. Add stop loss strategies to control per trade and maximum losses. 

3. Consider opportunities in both directions to diversify risks.

4. Incorporate machine learning methods to automatically optimize parameters.

### Summary  

This strategy identifies entry timing through a combination of technical indicators, and uses user defined conditions and VFI filtering to eliminate false signals. It takes advantage of pullbacks to accumulate positions chasing the trend, which helps capture opportunities in trends. But it also faces risks of wrong judgment and unidirectional holding. Appropriate optimization on indicator parameters, stop loss strategies etc. is needed to reduce risks and expand profit space.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|1.005|Volume Percentage Threshold|
|v_input_float_2|1.005|Deep Percentage Threshold|
|v_input_string_1||3Commas Entry Comment|
|v_input_string_2||3Commas Exit Comment|
|v_input_float_3|true|Take Profit Percentage (%)|
|v_input_float_4|5|Percentage for Additional Buy (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-13 00:00:00
end: 2024-02-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mkose81

//@version=5
strategy("RSI ve MACD Uyumsuzluğu Stratejisi (Sadece Long)", overlay=true, max_bars_back=4000,use_bar_magnifier= true,pyramiding=40)


// RSI Hesaplama
rsi = ta.rsi(close, 14)
float botRSI = na
botRSI := ta.pivotlow(5, 5)
botcRSI = 0
botcRSI := botRSI ? 5 : nz(botcRSI[1]) + 1

newbotRSI = ta.pivotlow(5, 0)
emptylRSI = true
if not na(newbotRSI) and newbotRSI < low[botcRSI]
    diffRSI = (newbotRSI - low[botcRSI]) / botcRSI
    llineRSI = newbotRSI - diffRSI
    for x = 1 to botcRSI - 1 by 1
        if close[x] < llineRSI
            emptylRSI := false
            break
        llineRSI -= diffRSI
    emptylRSI

// Pozitif Uyumsuzluk Alım Sinyali - RSI
alRSI = 0
if emptylRSI and not na(newbotRSI)
    if rsi[botcRSI] < rsi
        alRSI := 1

// MACD Hesaplama
[macd, signal, _] = ta.macd(close, 21, 55, 8)
float botMACD = na
botMACD := ta.pivotlow(5, 5)
botcMACD = 0
botcMACD := botMACD ? 5 : nz(botcMACD[1]) + 1

newbotMACD = ta.pivotlow(5, 0)
emptylMACD = true
if not na(newbotMACD) and newbotMACD < low[botcMACD]
    diffMACD = (newbotMACD - low[botcMACD]) / botcMACD
    llineMACD = newbotMACD - diffMACD
    for x = 1 to botcMACD - 1 by 1
        if close[x] < llineMACD
            emptylMACD := false
            break
        llineMACD -= diffMACD
    emptylMACD

// Pozitif Uyumsuzluk Alım Sinyali - MACD
alMACD = 0
if emptylMACD and not na(newbotMACD)
    if macd[botcMACD] < macd
        alMACD := 1
// OBV Hesaplama ve Uyumsuzluk Tespiti
obv = ta.cum(ta.change(close) > 0 ? volume : ta.change(close) < 0 ? -volume : 0)
float botOBV = na
botOBV := ta.pivotlow(5, 5)
botcOBV = 0
botcOBV := botOBV ? 5 : nz(botcOBV[1]) + 1

newbotOBV = ta.pivotlow(5, 0)
emptylOBV = true
if not na(newbotOBV) and newbotOBV < obv[botcOBV]
    diffOBV = (newbotOBV - obv[botcOBV]) / botcOBV
    llineOBV = newbotOBV - diffOBV
    for x = 1 to botcOBV - 1 by 1
        if obv[x] < llineOBV
            emptylOBV := false
            break
        llineOBV -= diffOBV
    emptylOBV

// Pozitif Uyumsuzluk Alım Sinyali - OBV
alOBV = 0
if emptylOBV and not na(newbotOBV)
    if obv[botcOBV] < obv
        alOBV := 1

// CCI Hesaplama ve Uyumsuzluk Tespiti
cci = ta.cci(close, 20)
float botCCI = na
botCCI := ta.pivotlow(5, 5)
botcCCI = 0
botcCCI := botCCI ? 5 : nz(botcCCI[1]) + 1

newbotCCI = ta.pivotlow(5, 0)
emptylCCI = true
if not na(newbotCCI) and newbotCCI < cci[botcCCI]
    diffCCI = (newbotCCI - cci[botcCCI]) / botcCCI
    llineCCI = newbotCCI - diffCCI
    for x = 1 to botcCCI - 1 by 1
        if cci[x] < llineCCI
            emptylCCI := false
            break
        llineCCI -= diffCCI
    emptylCCI

// Pozitif Uyumsuzluk Alım Sinyali - CCI
alCCI = 0
if emptylCCI and not na(newbotCCI)
    if cci[botcCCI] < cci
        alCCI := 1

// CMF Hesaplama
length = 20
mfm = ((close - low) - (high - close)) / (high - low)
mfv = mfm * volume
cmf = ta.sma(mfv, length) / ta.sma(volume, length)

float botCMF = na
botCMF := ta.pivotlow(5, 5)
botcCMF = 0
botcCMF := botCMF ? 5 : nz(botcCMF[1]) + 1

newbotCMF = ta.pivotlow(5, 0)
emptylCMF = true
if not na(newbotCMF) and newbotCMF < cmf[botcCMF]
    diffCMF = (newbotCMF - cmf[botcCMF]) / botcCMF
    llineCMF = newbotCMF - diffCMF
    for x = 1 to botcCMF - 1 by 1
        if cmf[x] < llineCMF
            emptylCMF := false
            break
        llineCMF -= diffCMF
    emptylCMF

// Pozitif Uyumsuzluk Alım Sinyali - CMF
alCMF = 0
if emptylCMF and not na(newbotCMF)
    if cmf[botcCMF] < cmf
        alCMF := 1

// MFI Hesaplama
lengthMFI = 14
mfi = ta.mfi(close, lengthMFI)

float botMFI = na
botMFI := ta.pivotlow(mfi, 5, 5)
botcMFI = 0
botcMFI := botMFI ? 5 : nz(botcMFI[1]) + 1

newbotMFI = ta.pivotlow(mfi, 5, 0)
emptylMFI = true
if not na(newbotMFI) and newbotMFI < mfi[botcMFI]
    diffMFI = (newbotMFI - mfi[botcMFI]) / botcMFI
    llineMFI = newbotMFI - diffMFI
    for x = 1 to botcMFI - 1 by 1
        if mfi[x] < llineMFI
            emptylMFI := false
            break
        llineMFI -= diffMFI
    emptylMFI

// Pozitif Uyumsuzluk Alım Sinyali - MFI
alMFI = 0
if emptylMFI and not na(newbotMFI)
    if mfi[botcMFI] < mfi
        alMFI := 1

// VWMACD Hesaplama
fastLength = 12
slowLength = 26
signalSmoothing = 9
vwmacd = ta.ema(close, fastLength) - ta.ema(close, slowLength)
signalLine = ta.ema(vwmacd, signalSmoothing)
histogram = vwmacd - signalLine
// VWMACD Uyumsuzluk Tespiti
float botVWMACD = na
botVWMACD := ta.pivotlow(histogram, 5, 5)
botcVWMACD = 0
botcVWMACD := botVWMACD ? 5 : nz(botcVWMACD[1]) + 1

newbotVWMACD = ta.pivotlow(histogram, 5, 0)
emptylVWMACD = true
if not na(newbotVWMACD) and newbotVWMACD < histogram[botcVWMACD]
    diffVWMACD = (newbotVWMACD - histogram[botcVWMACD]) / botcVWMACD
    llineVWMACD = newbotVWMACD - diffVWMACD
    for x = 1 to botcVWMACD - 1 by 1
        if histogram[x] < llineVWMACD
            emptylVWMACD := false
            break
        llineVWMACD -= diffVWMACD
    emptylVWMACD

// Pozitif Uyumsuzluk Alım Sinyali - VWMACD
alVWMACD = 0
if emptylVWMACD and not na(newbotVWMACD)
    if histogram[botcVWMACD] < histogram
        alVWMACD := 1
//Dipci indikator
lengthd= 130
coef = 0.2
vcoef = 2.5
signalLength = 5
smoothVFI = false

ma(x, y) =>
    smoothVFI ? ta.sma(x, y) : x

typical = hlc3
inter = math.log(typical) - math.log(typical[1])
vinter = ta.stdev(inter, 30)
cutoff = coef * vinter * close
vave = ta.sma(volume, lengthd)[1]
vmax = vave * vcoef
vc = volume < vmax ? volume : vmax  //min( volume, vmax )
mf = typical - typical[1]
iff_4 = mf < -cutoff ? -vc : 0
vcp = mf > cutoff ? vc : iff_4

vfi = ma(math.sum(vcp, lengthd) / vave, 3)
vfima = ta.ema(vfi, signalLength)
d = vfi - vfima

// Kullanıcı girdileri
volatilityThreshold = input.float(1.005, title="Volume Percentage Threshold")
pinThreshold = input.float(1.005, title="Deep Percentage Threshold")
// Hesaplamalar
volatilityPercentage = (high - low) / open
pinPercentage = close > open ? (high - close) / open : (close - low) / open
// Volatilite koşulu ve VFI ile filtreleme
voldip = volatilityPercentage >= volatilityThreshold or pinPercentage >= pinThreshold
volCondition = voldip and vfi< 0  // VFI değeri 0'dan küçükse volCondition aktif olacak





threeCommasEntryComment = input.string(title="3Commas Entry Comment", defval="")
threeCommasExitComment = input.string(title="3Commas Exit Comment", defval="")


takeProfitPerc = input.float(1, title="Take Profit Percentage (%)") / 100
fallPerc = input.float(5, title="Percentage for Additional Buy (%)") / 100
// Değişkenlerin tanımlanması
var float lastBuyPrice = na
var float tpPrice = na
var int lastTpBar = na

// Alım koşulları
longCondition = alRSI or alMACD or alOBV or alCCI or alCMF or alMFI or alVWMACD or volCondition
// Son alım fiyatını saklamak için değişken

// İlk alım stratejisi
if (longCondition and strategy.position_size == 0)
    strategy.entry("Long", strategy.long,comment=threeCommasEntryComment)
    lastBuyPrice := open
    



// İkinci ve sonraki alım koşulları (son alım fiyatının belirlenen yüzde altında)
if (open < lastBuyPrice * (1 - fallPerc) and strategy.position_size > 0)
    strategy.entry("Long Add", strategy.long,comment=threeCommasEntryComment)
    lastBuyPrice := open
   

// Kar alma fiyatını hesaplama ve strateji çıkışı
tp_price = strategy.position_avg_price * (1 + takeProfitPerc)
if strategy.position_size > 0
    strategy.exit("Exit Long", "Long", limit=tp_price,comment=threeCommasExitComment)
    strategy.exit("Exit Long Add", "Long Add", limit=tp_price,comment=threeCommasExitComment)
    tpPrice := na // Pozisyon kapandığında TP çizgisini sıfırla

// Kar alma seviyesi çizgisi çizme
plot(strategy.position_size > 0 ? tp_price : na, color=color.green, title="Take Profit Line")





```

> Detail

https://www.fmz.com/strategy/442210

> Last Modified

2024-02-20 11:20:40
