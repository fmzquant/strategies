
> Name

多指标组合的短线量化交易策略Multi-Indicator-Short-Term-Algorithmic-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种多指标组合的短线量化交易策略。该策略集合使用一组强大的技术指标,在低时间周期(如15分钟)产生交易信号。

一、策略原理

该策略的核心是使用多种指标的组合,主要包括:

(1)双均线系统:计算一快一慢两个Hull移动平均线,根据其交叉关系判断趋势方向。

(2)Ichimoku系统:计算转换线、基准线等,并结合云图形态判断趋势和支持阻力。

(3)Donchian通道:通过最高价和最低价构建通道,判断价格突破。

(4)MACD:计算MACD和信号线,并根据其交叉进行操作。

当这些指标对趋势判断达成一致时,才会产生更可靠的交易信号。具体逻辑是:

当快速Hull MA上穿慢速Hull MA,AND Ichimoku线上穿云图 AND Donchian通道突破 AND MACD上穿信号线时,做多;相反判断做空。

同时,结合每日K线收盘价的变化作为辅助判断,避免被反转套牢。

此外,策略含有止损和止盈逻辑,可以控制单笔交易的风险回报。

二、策略优势

该策略最大的优势是指标组合互补,能提高信号质量。不同指标从多个角度判断趋势,只有一致同意才产生信号,这避免了单一指标的局限性。

其次,多时间周期组合也是一大优势。每日Kline的辅助判断可以过滤出短期Low周期被套的风险。

最后,策略含有止损止盈机制也使每单交易的风险可控。

三、潜在风险

尽管该策略设计合理,但交易中也应注意以下风险:

首先,多指标组合提高了参数优化难度,不当设置可能导致过优化。

其次,在强势趋势中,止损可能被突破带来损失。

最后,多时间周期判断也存在 complexesignals難以判断的情况。

总体来说,该策略overall组合逻辑科学,可通过参数测试不断优化,成为有效的短线量化策略。

四、内容总结

本文详细介绍了一种多指标组合的短线量化交易策略。它使用双均线、Ichimoku、Donchian通道、MACD等指标进行组合,提高信号质量。同时使用多时间周期判断和止损止盈逻辑控制风险。总体来说,该策略经优化后可成为高效的短线量化交易系统。

||

This article introduces in detail a short-term algorithmic trading strategy combining multiple indicators. It utilizes a group of powerful technical indicators to generate trading signals on lower timeframes such as the 15-minute chart.

I. Strategy Logic

The core of this strategy is using a combination of multiple indicators, mainly including:

(1) Dual Moving Average system: Calculates one fast and one slow Hull Moving Average and judges the trend based on their crossover. 

(2) Ichimoku system: Calculates the conversion and base lines among others, and determines the trend and support/resistance levels based on the Ichimoku cloud.

(3) Donchian Channel: Constructs a channel using highest and lowest prices to identify price breakouts.

(4) MACD: Calculates the MACD and signal line, making trades based on their crossover.

Only when these indicators reach a consensus on the trend judgment will reliable trading signals be generated. The specific logic is:

Take long positions when fast Hull MA crosses above slow Hull MA, AND Ichimoku lines cross above the cloud, AND Donchian Channel breaks out, AND MACD crosses above signal line. Reverse conditions for short trades.

Daily bar closing prices are also incorporated to avoid being trapped in reversals. 

In addition, the strategy contains stop loss and take profit logic to control risk and reward for each trade.

II. Advantages of the Strategy

The biggest advantage of this strategy is the complementarity of indicator combinations, which improves signal quality. Different indicators judge the trend from multiple angles, only agreeing unanimously to generate signals, avoiding the limitations of single indicators.

Secondly, the multi-timeframe combination is also a significant advantage. The auxiliary judgment from the daily bars can filter out the risk of being trapped in short-term cycles.

Lastly, the stop loss and take profit mechanism also ensures controllable risks per trade.

III. Potential Risks

Despite the sound strategy design, trading risks should also be noted:

Firstly, the multiple indicator combination increases optimization difficulty. Improper tuning can lead to overfitting.

Secondly, stop losses may be hit in strong trending moves, leading to unnecessary losses. 

Finally, multi-timeframe judgments can also introduce confusing situations that are hard to decipher. 

Overall, the strategy combines indicators in a scientific manner, and can become an effective short-term algorithmic trading system through parameter testing and optimization.

IV. Summary

In summary, this article has introduced in detail a short-term algorithmic trading strategy combining multiple indicators. It uses a combination of dual moving averages, Ichimoku, Donchian Channel, MACD and more to improve signal quality. It also utilizes multi-timeframe analysis and stop loss/take profit logic to control risks. With optimization, this strategy can become an efficient system for short-term systematic trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Double HullMA|
|v_input_2|0.001|Decision Threshold (0.001)|
|v_input_3|-500|Stop Loss in $|
|v_input_4|25000|Target Point in $|
|v_input_5|9|Conversion Line Periods|
|v_input_6|26|Base Line Periods|
|v_input_7|52|Lagging Span 2 Periods|
|v_input_8|26|Displacement|
|v_input_9|9|MACD_Length|
|v_input_10|12|MACD_fastLength|
|v_input_11|26|MACD_slowLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// Any timeFrame ok but good on 15 minute & 60 minute , Ichimoku + Daily-Candle_cross(DT) + HULL-MA_cross + MacD combination 420 special blend
strategy("Custom 15m strat",overlay=true)
keh=input(title="Double HullMA",defval=14, minval=1)
dt = input(defval=0.0010, title="Decision Threshold (0.001)", step=0.0001)`
SL = input(defval=-500.00, title="Stop Loss in $", step=1)
TP = input(defval=25000.00, title="Target Point in $", step=1)
ot=1
n2ma=2*wma(close,round(keh/2))
nma=wma(close,keh)
diff=n2ma-nma
sqn=round(sqrt(keh))
n2ma1=2*wma(close[1],round(keh/2))
nma1=wma(close[1],keh)
diff1=n2ma1-nma1
sqn1=round(sqrt(keh))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
b=n1>n2?lime:red
c=n1>n2?green:red
d=n1>n2?red:green
confidence=(security(syminfo.tickerid, 'D', close)-security(syminfo.tickerid, 'D', close[1]))/security(syminfo.tickerid, 'D', close[1])
conversionPeriods = input(9, minval=1, title="Conversion Line Periods")
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods")
displacement = input(26, minval=1, title="Displacement")
donchian(len) => avg(lowest(len), highest(len))
conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)
LS=close, offset = -displacement
MACD_Length = input(9)
MACD_fastLength = input(12)
MACD_slowLength = input(26)
MACD = ema(close, MACD_fastLength) - ema(close, MACD_slowLength) //macd
aMACD = ema(MACD, MACD_Length) //signal
closelong = n1<n2 and close<n2 and confidence<dt or strategy.openprofit<SL or strategy.openprofit>TP
if (closelong)
    strategy.close("Long")
closeshort = n1>n2 and close>n2 and confidence>dt or strategy.openprofit<SL or strategy.openprofit>TP
if (closeshort)
    strategy.close("Short")
longCondition = n1>n2 and strategy.opentrades<ot and confidence>dt and close>n2 and leadLine1>leadLine2 and open<LS and MACD>aMACD
if (longCondition)
    strategy.entry("Long",strategy.long)
shortCondition = n1<n2 and strategy.opentrades<ot and confidence<dt and close<n2 and leadLine1<leadLine2 and open>LS and MACD<aMACD
if (shortCondition)
    strategy.entry("Short",strategy.short)

a1=plot(n1,color=c)
a2=plot(n2,color=c)
plot(cross(n1, n2) ? n1 : na, style = circles, color=b, linewidth = 4)
plot(cross(n1, n2) ? n1 : na, style = line, color=d, linewidth = 4)
plot(conversionLine, color=#0496ff, title="Conversion Line")
plot(baseLine, color=#991515, title="Base Line")
//plot(longCondition == true ? 4000:4100,title="long")
plot(close, offset = -displacement, color=#459915, title="Lagging Span")
p1=plot (leadLine1, offset = displacement, color=green,  title="Lead 1")
p2=plot (leadLine2, offset = displacement, color=red,  title="Lead 2")
fill(p1, p2, color = leadLine1 > leadLine2 ? green : red)
// remove the "//" from before the plot script if want to see the indicators on chart
```

> Detail

https://www.fmz.com/strategy/426842

> Last Modified

2023-09-14 19:46:55
