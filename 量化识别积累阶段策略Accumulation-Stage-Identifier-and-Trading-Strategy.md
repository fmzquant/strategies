
> Name

量化识别积累阶段策略Accumulation-Stage-Identifier-and-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14fb3c5f93cca937174.png)
[trans]
### 概述

本策略通过组合使用移动平均线、成交量指标以及价格动量指标,设计出一套量化规则,用以识别股票进入积累阶段的时机。在该阶段,股票通常处于价格的盘整和蓄势状态,提供了较低价格进场的良好机会。

### 策略原理  

策略使用50日、90日和200日简单移动平均线来判断价格趋势。只有当价格高于200日线时,才产生买入信号。这可以过滤掉大趋势下跌的不确定性。

除了判断大趋势,策略还会判断短期均线顺序来确认趋势。具体来说,是判断50日线高于90日线。

在移动平均线确认大趋势和短期趋势符合条件的基础上,策略会结合成交量指标PVT和MACD指标来判断积累特征。只有当PVT向上突破、MACD线高于Signal线和成交量放大,才会产生买入信号。

### 策略优势  

相比单一使用移动平均线,本策略在确认趋势的同时,还检查了成交量的特点。这可以更加准确判断股票进入积累阶段的时机,从而确保进场的价格优势。

通过多时间框架分析,本策略结合了中长期趋势判断和短期特征判断,时间框架匹配,可以减少因单一时间框架判断错误所带来的不确定性。

### 风险与解决  

本策略主要依赖均线判断,当价格出现剧烈波动时,均线判断会失效。这时应降低仓位规模,或直接止损退出。 

另外,积累阶段判断也可能出错,从而错过反转机会。这需要通过观察更多特征指标来确认判断。

### 优化思路  

本策略可以引入机器学习算法,通过特征提取和模型训练,实现对积累阶段的自动判断。这可以减少因人工设置阈值而带来的局限性。

另外,本策略也可以尝试 breakpoint 功能,在不同市场环境下,自动切换不同参数,使策略更具鲁棒性。

### 总结  

本策略总体采用价格与成交量匹配的思路判断股票积累特征。在确认大方向的同时,挖掘短期积累机会。 通过参数优化与机器学习等手段的引入,策略效果还有进一步提升的空间。

|| 

### Overview

This strategy combines moving averages, volume indicators and price momentum indicators to design a set of quantitative rules to identify the timing of stocks entering the accumulation stage. At this stage, stocks are usually in a price consolidation and storage state, providing a good low-price opportunity.

### Strategy Principle 

The strategy uses 50-day, 90-day and 200-day simple moving averages to determine price trends. Buy signals are only generated when prices are above the 200-day line. This filters out the uncertainty of major downtrends.

In addition to judging the major trend, the strategy also judges the order of short-term moving averages to confirm the trend. Specifically, it judges if the 50-day line is above the 90-day line.

On the basis that the moving average confirms the major and short-term trends, the strategy combines the PVT volume indicator and the MACD indicator to judge the accumulation characteristics. Buy signals are generated only when the PVT breaks upward, the MACD line is higher than the Signal line, and the volume expands.

### Advantages

Compared with using moving averages alone, this strategy also checks the characteristics of volume while confirming the trend. This can more accurately determine the timing of stocks entering the accumulation stage, thus ensuring better entry prices.

By analyzing multiple time frames, this strategy combines medium- and long-term trend judgments and short-term feature judgments to match time frames, which can reduce uncertainty from judging a single time frame incorrectly.

### Risks and Solutions

This strategy relies mainly on moving average judgments. When prices fluctuate violently, moving average judgments will fail. At this point, the position size should be reduced or a stop loss exit should be triggered.

In addition, misjudgement on the accumulation stage is possible, thus missing reversal opportunities. This requires observing more feature indicators to confirm judgements.

### Optimization Ideas

Machine learning algorithms can be introduced into this strategy by extracting features and model training to achieve automatic judgment of the accumulation stage. This can reduce limitations from manually setting thresholds.

In addition, this strategy can also try the breakpoint functionality to automatically switch parameters under different market environments, making the strategy more robust.

### Summary  

In summary, this strategy generally adopts the idea of matching prices and volumes to judge the characteristics of stock accumulation stages. While confirming the major direction, it digs short-term accumulation opportunities. There is still room for further improvement in strategy performance by introducing parameter optimization and machine learning.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Lookback|
|v_input_int_1|false|Offset|
|v_input_2|21|Entry Line|
|v_input_3|21|Exit Line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-13 00:00:00
end: 2024-02-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © stocktechbot

//@version=5
strategy("Accumulate", overlay = true)
lookback = input(defval = 21, title = 'Lookback')
offset = input.int(title="Offset", defval=0, minval=-500, maxval=500)
//SMA Tredline
out = ta.sma(close, 200)
outf = ta.sma(close, 50)
outn = ta.sma(close, 90)
outt = ta.sma(close, 21)
//sma plot
plot(out, color=color.blue, title="MA200", offset=offset)
plot(outf, color=color.maroon, title="MA50", offset=offset)
plot(outn, color=color.orange, title="MA90", offset=offset)
plot(outt, color=color.olive, title="MA21", offset=offset)

//MarketCap Calculation
//MarketCap = 0.0
//TSO = request.financial(syminfo.tickerid, "TOTAL_SHARES_OUTSTANDING", "FQ", ignore_invalid_symbol = true)


//if str.tostring(TSO) != 'na'
//    if ta.barssince(TSO != TSO[1] and TSO > TSO[1])==0
//        MarketCap := TSO * close
//       
//    if barstate.islast and MarketCap == 0
//        runtime.error("No MarketCap is provided by the data vendor.")
//    
//momlen = 100
//msrc = MarketCap
//mom = msrc - msrc[momlen]
//plotmom = if (mom > mom[1])
//    true
//else
//   false

//OBV with sma on macd
obv = ta.cum(math.sign(ta.change(close)) * volume)
smoothingLength = 5
smoothingLine = ta.sma(obv,5)
[macdLine, signalLine, histLine] = ta.macd(ta.pvt, 12, 26, 9)
sellvolhigh = macdLine < signalLine
buyvolhigh = macdLine > signalLine
//Buy Signal
mafentry =ta.sma(close, 50) > ta.sma(close, 90)
//matentry = ta.sma(close, 21) > ta.sma(close, 50)
matwohun = close > ta.sma(close, 200)
higheshigh = ta.rising(high, 2)
higheslow = ta.rising(low, 2 )
twohunraise = ta.rising(out, 2)
//highvol =  ta.crossover(volume, ta.sma(volume, lookback))
highvol = ta.rising(volume,2)
fourlow = ta.lowest(close, lookback)
fourhig = ta.highest(close, lookback)
change =  (((fourhig - fourlow) / fourlow) * 100) <= 30
green = close > open
allup = false
lineabove = ta.cross(close, ta.sma(close, input(defval = 21, title = 'Entry Line')))
if matwohun and mafentry and higheshigh and twohunraise and buyvolhigh
//if higheshigh and higheslow and highvol
    allup := true

plotshape(allup, style=shape.arrowup,location=location.belowbar, color=color.green, title = "Buy Signal")

barsSinceLastEntry() =>
    strategy.opentrades > 0 ? bar_index - strategy.opentrades.entry_bar_index(strategy.opentrades - 1) : na
    
//Sell Signal
mafexit =ta.sma(close, 50) < ta.sma(close, 90)
matexit = ta.sma(close, 21) < ta.sma(close, 50)
matwohund = close < ta.sma(close, 200)
linebreak = ta.sma(close, input(defval = 21, title = 'Exit Line')) > close
lowesthigh = ta.falling(high, 3)
lowestlow = ta.falling(low, 2 )
twohunfall = ta.falling(out, 3)
twentyfall = ta.falling(outt, 2)
highvole =  ta.crossover(volume, ta.sma(volume, 5))
//fourlow = ta.lowest(close, lookback)
//fourhig = ta.highest(close, lookback)
changed =  (((fourhig - close) / close) * 100) >= 10
red = close < open
atr = ta.atr(14)
//atrsmalen = int(bar_index - strategy.opentrades.entry_bar_index(strategy.opentrades - 1) )
atrsmalen = barsSinceLastEntry()
atrsma = false
atrlen = 5
if str.tostring(atrsmalen) != 'NaN' and atrsmalen > 0
    atrlen := atrsmalen

    
atrsma := atr > ta.sma(atr,50)


alldwn = false
if sellvolhigh and lowestlow and (close < close[1] and close < open)
//if higheshigh and higheslow and highvol
    alldwn := true

plotshape(alldwn, style=shape.arrowdown,location=location.abovebar, color=color.red, title = "Sell Signal")


longCondition = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))
if (allup)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))
if (alldwn)
    strategy.entry("My Short Entry Id", strategy.short)

```

> Detail

https://www.fmz.com/strategy/442213

> Last Modified

2024-02-20 11:29:57
