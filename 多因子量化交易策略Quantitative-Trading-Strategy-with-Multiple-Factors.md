
> Name

多因子量化交易策略Quantitative-Trading-Strategy-with-Multiple-Factors

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14721c5928084dbaafe.png)

[trans]

## 概述

该策略是一个多因子量化交易策略,结合RSI、MACD、OBV、CCI、CMF、MFI、VWMACD等多种技术指标,实现自动化的股票量化交易。策略名为“量化多空因子择时策略”。

## 策略原理  

该策略的核心逻辑是根据多个技术指标的形态进行判断,当多个指标同时发出买入信号时,则进行买入操作。

具体来说,策略中的RSI、MACD、OBV、CCI、CMF、MFI、VWMACD这些指标,会检测它们是否出现类下跌趋势但指标值本身并未下跌的形态,如果出现这样的情况,则可能预示着即将反转上涨。代码中称这样的形态为“空头故意”,如果多个指标同时出现“空头故意”,那么就发出最终的买入信号。

此外,策略中还引入了成交量异常的判断逻辑。当价格波动但是成交量没有明显放大,那么很可能是假突破,这时也会发出买入信号。

综上,该策略通过观察多个技术指标的反转信号,并结合成交量的异常判断,从而提高决策的准确性,这是量化交易策略成功的关键。

## 策略优势  

该策略具有以下几个优势:

1. 多因子模型,结合了7个常用技术指标的信号,提高了交易决策的准确性。

2. 引入成交量反转信号,可以避免被假突破欺骗,过滤无效信号。 

3. 采用类下跌形态判断,提前捕捉到股票反转上涨的时机点。

4. 自动化交易,无需人工干预,大大降低了操作成本。

5. 策略逻辑清晰简单,容易理解、修改和优化。

## 策略风险  

该策略也存在一些风险:  

1. 多因子结合不当,可能会产生冲突的交易信号。需测试调整各因子的参数,找到最优配置。

2. 反转交易本身具有一定的风险,存在被再次反转的可能。可设置止损点来控制风险。

3. VOLUME指标对一些低流动性股票效果可能不佳,这时可减少VOLUME权重或者排除这部分股票。

4. 回测时拟合数据效果好,实盘时表现可能会变差。需积累更多实盘数据进行测试。


## 策略优化方向

该策略可以从以下几个方面来进一步优化:

1. 增加或减少一些技术指标,找到配置最优的多因子模型。

2. 对于不同的股票类型,设置不同的参数或权重,使策略更具有针对性。

3. 设置动态止损、移动止盈来锁定利润、控制风险。

4. 结合行业、概念等信息,在特定板块中选择股票交易。

5. 加入机器学习算法,实现策略的参数自动优化。

## 总结

该策略overall是一个非常有潜力的量化交易策略。它结合多种技术指标信号,辅以量能反转判断,可以有效发现股票反转机会,自动化进行交易。在参数优化和风险控制到位后,有望取得较好的回报。该策略思路新颖,值得进一步研究与应用。

||

## Overview

This is a quantitative trading strategy with multiple factors, which combines RSI, MACD, OBV, CCI, CMF, MFI, VWMACD and other technical indicators to implement automated stock quantitative trading. The strategy name is “Timing Strategy with Multiple Factors for Long and Short”.

## Strategy Principles   

The core logic of this strategy is to make judgments based on the patterns of multiple technical indicators. When multiple indicators give buy signals at the same time, buy operations will be executed.  

Specifically, the indicators like RSI, MACD, OBV, CCI, CMF, MFI, VWMACD in the strategy will detect whether they show a pattern of slight downward trends while the values of the indicators themselves do not fall. If this happens, it may signify an upcoming rebound. This pattern is called “short squeeze” in the code. If multiple indicators show “short squeeze” at the same time, the final buy signal will be triggered.

In addition, the strategy also introduces the logic to judge abnormal trading volume. When price fluctuates sharply with no significant increase in trading volume, it is likely to be a false breakout. In this case, a buy signal will also be sent out.

In summary, by observing the reversal signals of multiple technical indicators and combining the abnormal judgment of trading volume, the accuracy of decision making can be improved, which is the key to the success of quantitative trading strategies.  

## Advantages of the Strategy  

The strategy has the following advantages:  

1. Multiple factor model, which combines signals of 7 commonly used technical indicators, improves the accuracy of trading decisions.  

2. Introduction of trading volume reversal signal can avoid being fooled by false breakouts and filter invalid signals.

3. Early detection of the timing of stock rebound by identifying slight downward patterns.  

4. Automated Trading without manual intervention greatly reduces operating costs. 

5. The strategy logic is simple and clear, easy to understand, modify and optimize.

## Risks of the Strategy   

There are also some risks with this strategy:   

1. Improper combination of multiple factors may generate conflicting trading signals. The parameters of each factor need to be tested and tuned to find the optimal configuration.

2. Reversal trading itself carries certain risks, with the possibility of being reversed again. Stop loss points can be set to control risks.  

3. VOLUME indicator may underperform for some stocks with low liquidity. In this case, the weight of VOLUME can be reduced or these stocks can be excluded.

4. The performance in live trading may deteriorate compared with that in historical backtesting. More live trading data should be accumulated for testing.


## Directions for Strategy Optimization  

The strategy can be further optimized in the following aspects:  

1. Add or reduce some technical indicators to find the optimal multi-factor model configuration.

2. Set different parameters or weights for different types of stocks so that the strategy can be more targeted.  

3. Set dynamic stop loss, moving stop profit to lock in profits and control risks.

4. Combine industry, concepts and other information to select stocks to trade in specific sectors.

5. Introduce machine learning algorithms to achieve automatic optimization of strategy parameters.

## Conclusion  

Overall, this is a very promising quantitative trading strategy. By combining signals from multiple technical indicators and volume reversal judgments, it can effectively identify stock reversal opportunities for automated trading. With proper parameter tuning and risk control, it has the potential to achieve good returns. The idea behind the strategy is innovative and worth further research and application.

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
start: 2023-01-18 00:00:00
end: 2024-01-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mkose81

//@version=5
strategy("MK future stopsuz 40 alım (Sadece Long)", overlay=true, max_bars_back=4000,use_bar_magnifier= true,pyramiding=40)


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
    strategy.entry("Long", strategy.long, comment=threeCommasEntryComment)
    lastBuyPrice := open

// İkinci ve sonraki alım koşulları (son alım fiyatının belirlenen yüzde altında)
if (open < lastBuyPrice * (1 - fallPerc) and strategy.position_size > 0)
    strategy.entry("Long Add", strategy.long, comment=threeCommasEntryComment)
    lastBuyPrice := open

// Kar alma fiyatını hesaplama ve strateji çıkışı
tp_price = strategy.position_avg_price * (1 + takeProfitPerc)
if strategy.position_size > 0
    strategy.exit("Exit Long", "Long", limit=tp_price, comment=threeCommasExitComment)
    strategy.exit("Exit Long Add", "Long Add", limit=tp_price, comment=threeCommasExitComment)
    tpPrice := na // Pozisyon kapandığında TP çizgisini sıfırla

// Kar alma seviyesi çizgisi çizme
plot(strategy.position_size > 0 ? tp_price : na, color=color.green, title="Take Profit Line")




```

> Detail

https://www.fmz.com/strategy/439965

> Last Modified

2024-01-25 13:04:16
