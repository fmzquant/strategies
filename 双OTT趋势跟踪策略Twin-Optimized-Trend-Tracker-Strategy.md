
> Name

双OTT趋势跟踪策略Twin-Optimized-Trend-Tracker-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

双OTT趋势跟踪策略是一种改进版的OTT策略,它结合了双OTT线和系数来更好地应对盘整市的时候的假信号。该策略由土耳其交易员Anıl Özekşi开发,他在自己的视频教程中详细解释了这一策略的设计思路。

## 原理

双OTT策略的核心是利用两条优化趋势跟踪线OTT来判断趋势方向。它首先计算出移动平均线MAvg,然后根据MAvg值的百分比来得到长止损线longStop和短止损线shortStop。当价格上穿长止损线时为看涨信号,下穿短止损线时为看跌信号。

为了处理盘整市的假信号,该策略改进了以下两点:

1. 增加了两个垂直位移的OTT线,分别是OTTup和OTTdn,它们是OTT的略微上移和下移。只有当价格突破这两个位移线时,才产生真正的交易信号。

2. 引入了一个小 coef 系数,用于微调两个位移OTT线,使其更精确地适应市场。

通过这种双OTT设计,可以过滤掉大部分盘整市的噪音,避免产生错误信号。从而可以更好地捕捉趋势转折点,及时切换仓位。这是双OTT策略的最大优势。

## 优势

- 利用双OTT线设计可以有效过滤假信号,增强策略稳定性
- 增加的微调系数coef使OTT线更贴近市场反应
- 作者Anıl Özekşi在视频中详细讲解策略思路,容易理解掌握
- 综合EMA,止损线等多种技术指标判断市场走势
- 作者Anıl Özekşi是知名的土耳其交易员,具有一定的专业知名度

## 风险

- OTT指标本身容易产生拉回测试的风险,双OTT设计可减轻这一问题
- 大幅震荡行情下,止损线可能被频繁触发,存在过度交易的风险
- coef系数需要仔细测试取得最优值,否则效果会打折扣
- 作者视频是土耳其语教程,语言障碍问题可能影响算法的正确理解
- 回测数据不足,需在更长周期和更多市场验证策略有效性

对策:
- 增加止损线和双OTT之间的缓冲带,避免过于灵敏
- 优化系数coef的设置,使之更符合回测结果
- 翻译作者教程,确保对算法逻辑理解正确
- 在更多历史行情下进行回测,验证策略参数可靠性

## 优化方向

- 可以考虑将参数如周期length等设置为可调节的输入值
- 尝试其他类型的移动平均线,寻找更符合ottp原理的平均线算法
- 根据不同交易品种分别优化coef系数的大小
- 增加过滤机制,避免非主要交易时间段的错误信号
- 将止损线改为动态追踪,根据波动率实时调整
- 增加机器学习算法,利用AI自动优化参数设置

总之,双OTT策略充分利用了Anıl Özekşi的ottp经验,并做出创新。它有望成为一个可靠、可定制的趋势跟踪策略框架。但仍需持续优化测试以适应市场的变化。

## 总结

双OTT策略通过双优化趋势跟踪线以及微调系数,有效应对了盘整市的假信号问题。它合理运用移动平均线思想,辅以止损线来动态跟踪趋势。该策略简洁实用,来自知名交易员的亲身经验,值得深入研究运用。但我们也要清醒认识到其局限性,做到戒骄戒躁,谨慎验证。只有不断优化测试,才能使其成为可靠的趋势跟踪策略。

||

## Overview

The Twin Optimized Trend Tracker Strategy is an enhanced version of the OTT strategy that combines dual OTT lines and a coefficient to better handle false signals during sideways market. This strategy was developed by Turkish trader Anıl Özekşi, who explained the design philosophy in his video tutorials.  

## Principles

The core of the Twin OTT strategy is to determine the trend direction using two optimized trend tracking lines - OTT. It first calculates the moving average MAvg, then obtains the long stop loss line longStop and short stop loss line shortStop based on a percentage of the MAvg value. When the price crosses above the longStop line, it is a long signal, and when it crosses below the shortStop line, it is a short signal.

To handle false signals during sideways market, the strategy improves the following two aspects:

1. Two vertically displaced OTT lines, OTTup and OTTdn, are added. They are slight upward and downward shifts of the original OTT. Only when the price breaks through these two displaced lines, valid trading signals are generated. 

2. A small coefficient coef is introduced to fine tune the two displaced OTT lines for better precision.

With this twin OTT design, most noise from sideways market can be filtered to avoid wrong signals. It helps capture trend turning points and switch positions in a timely manner. This is the biggest advantage of the Twin OTT strategy.

## Advantages 

- The twin OTT lines design can effectively filter out false signals and enhance strategy stability
- The additional coef coefficient helps OTT lines respond better to the market
- The author Anıl Özekşi explains the strategy logic clearly in his video tutorials, which is easy to understand
- It combines multiple technical indicators like EMA, stop loss lines to determine market trends
- The author Anıl Özekşi is a well-known Turkish trader, adding to the credibility 

## Risks

- The OTT indicator itself tends to whipsaw and pullback tests. The twin OTT design alleviates this problem.
- With violent fluctuations, the stop loss lines may get triggered frequently, causing overtrading. 
- The coef coefficient needs careful testing for optimum value, otherwise it undermines the effectiveness.
- The tutorials are in Turkish. Language barrier may lead to misunderstandings of the logic.
- Insufficient backtests. More periods and markets are needed to verify the strategy.

Counter measures:

- Add a buffer between stop loss lines and twin OTT to prevent over-sensitivity
- Optimize coef settings according to backtest results
- Translate the tutorials to ensure correct understanding of the logic
- Conduct backtests across more historical periods to verify reliability 

## Optimization Directions

- Make parameters like period length adjustable inputs
- Try other types of moving averages that better fit the OTT principles 
- Optimize coef for different trading instruments separately  
- Add filters to avoid wrong signals during minor trading sessions
- Make the stop loss lines dynamic based on volatility
- Introduce machine learning to auto optimize parameters

In summary, the Twin OTT strategy fully utilizes Anıl Özekşi's OTT experience and makes innovations. It has the potential to become a reliable, customizable trend tracking framework. But continuous optimization and testing are still needed to adapt to changing markets.

## Conclusion 

The Twin OTT strategy effectively handles false signals during sideways markets using dual optimized trend tracking lines and a fine tuning coefficient. It makes sensible use of moving average concepts and dynamic stop loss lines to track trends. This concise and practical strategy stems from a renowned trader's first-hand experience, making it worth in-depth research and application. But we should also be aware of its limitations and avoid complacency. Only through continuous optimizations and rigorous testing can it become a robust trend tracking strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|40|OTT Period|
|v_input_3|true|Optimization Constant|
|v_input_4|0.001|Twin OTT Coefficient|
|v_input_5|true|Show Support Line?|
|v_input_6|true|Show Signals?|
|v_input_7|0|Moving Average Type: VAR|EMA|WMA|TMA|SMA|WWMA|ZLEMA|TSF|
|v_input_8|true|Highlighter On/Off ?|
|v_input_9|true|=Backtest Inputs=|
|v_input_10|true|From Day|
|v_input_11|true|From Month|
|v_input_12|2005|From Year|
|v_input_13|true|To Day|
|v_input_14|true|To Month|
|v_input_15|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-10-07 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © KivancOzbilgic

//created by: @Anil_Ozeksi
//developer: ANIL ÖZEKŞİ
//author: @kivancozbilgic

strategy("Twin Optimized Trend Tracker","TOTT", overlay=true)
src = input(close, title="Source")
length=input(40, "OTT Period", minval=1)
percent=input(1, "Optimization Constant", type=input.float, step=0.1, minval=0)
coeff=input(0.001, "Twin OTT Coefficient", type=input.float, step=0.001, minval=0)
showsupport = input(title="Show Support Line?", type=input.bool, defval=true)
showsignalsk = input(title="Show Signals?", type=input.bool, defval=true)
mav = input(title="Moving Average Type", defval="VAR", options=["SMA", "EMA", "WMA", "TMA", "VAR", "WWMA", "ZLEMA", "TSF"])
highlighting = input(title="Highlighter On/Off ?", type=input.bool, defval=true)
Var_Func(src,length)=>
    valpha=2/(length+1)
    vud1=src>src[1] ? src-src[1] : 0
    vdd1=src<src[1] ? src[1]-src : 0
    vUD=sum(vud1,9)
    vDD=sum(vdd1,9)
    vCMO=nz((vUD-vDD)/(vUD+vDD))
    VAR=0.0
    VAR:=nz(valpha*abs(vCMO)*src)+(1-valpha*abs(vCMO))*nz(VAR[1])
VAR=Var_Func(src,length)
Wwma_Func(src,length)=>
    wwalpha = 1/ length
    WWMA = 0.0
    WWMA := wwalpha*src + (1-wwalpha)*nz(WWMA[1])
WWMA=Wwma_Func(src,length)
Zlema_Func(src,length)=>
    zxLag = length/2==round(length/2) ? length/2 : (length - 1) / 2
    zxEMAData = (src + (src - src[zxLag]))
    ZLEMA = ema(zxEMAData, length)
ZLEMA=Zlema_Func(src,length)
Tsf_Func(src,length)=>
    lrc = linreg(src, length, 0)
    lrc1 = linreg(src,length,1)
    lrs = (lrc-lrc1)
    TSF = linreg(src, length, 0)+lrs
TSF=Tsf_Func(src,length)
getMA(src, length) =>
    ma = 0.0
    if mav == "SMA"
        ma := sma(src, length)
        ma

    if mav == "EMA"
        ma := ema(src, length)
        ma

    if mav == "WMA"
        ma := wma(src, length)
        ma

    if mav == "TMA"
        ma := sma(sma(src, ceil(length / 2)), floor(length / 2) + 1)
        ma

    if mav == "VAR"
        ma := VAR
        ma

    if mav == "WWMA"
        ma := WWMA
        ma

    if mav == "ZLEMA"
        ma := ZLEMA
        ma

    if mav == "TSF"
        ma := TSF
        ma
    ma
    
MAvg=getMA(src, length)
fark=MAvg*percent*0.01
longStop = MAvg - fark
longStopPrev = nz(longStop[1], longStop)
longStop := MAvg > longStopPrev ? max(longStop, longStopPrev) : longStop
shortStop =  MAvg + fark
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := MAvg < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop
dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and MAvg > shortStopPrev ? 1 : dir == 1 and MAvg < longStopPrev ? -1 : dir
MT = dir==1 ? longStop: shortStop
OTT=MAvg>MT ? MT*(200+percent)/200 : MT*(200-percent)/200 
OTTup=OTT*(1+coeff)
OTTdn=OTT*(1-coeff)

PPLOT=plot(showsupport ? MAvg : na, color=#0585E1, linewidth=2, title="Support Line")

pALLup=plot(nz(OTTup[2]), color=color.green, linewidth=2, title="OTTup", transp=0)
pALLdn=plot(nz(OTTdn[2]), color=color.red, linewidth=2, title="OTTdown", transp=0)

buySignalk = crossover(MAvg, OTTup[2])
sellSignalk = crossunder(MAvg, OTTdn[2])
K1=barssince(buySignalk)
K2=barssince(sellSignalk)
O1=barssince(buySignalk[1])
O2=barssince(sellSignalk[1])

plotshape(buySignalk and showsignalsk and O1>K2 ? min(low-abs(roc(low,1)),OTTdn-abs(roc(low,1))) : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
plotshape(sellSignalk and showsignalsk and O2>K1 ? max(high+abs(roc(high,1)),OTTup+abs(roc(high,1))) : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white, transp=0)
mPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0,display=display.none)
longFillColor = highlighting ? (O2>K1 ? color.green : na) : na
shortFillColor = highlighting ? (O1>K2 ? color.red : na) : na
fill(mPlot, PPLOT, title="UpTrend Highligter", color=longFillColor,transp=90)
fill(mPlot, PPLOT, title="DownTrend Highligter", color=shortFillColor,transp=90)
fill(pALLup, pALLdn, title="Flat Zone Highligter", color=color.blue,transp=90)



dummy0 = input(true, title = "=Backtest Inputs=")
FromDay    = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromMonth  = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromYear   = input(defval = 2005, title = "From Year", minval = 2005)
ToDay      = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToMonth    = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToYear     = input(defval = 9999, title = "To Year", minval = 2006)
Start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)
Finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)
Timerange() =>
    time >= Start and time <= Finish ? true : false
if buySignalk
    strategy.entry("Long", strategy.long)
if sellSignalk
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/428705

> Last Modified

2023-10-08 15:10:31
