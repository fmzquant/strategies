
> Name

基于KST指标的趋势追踪策略

> Author

ChaoZhang

> Strategy Description


[trans]  

本文将详细介绍一种利用KST指标进行趋势追踪的量化交易策略。该策略通过计算KST线和信号线的交叉关系来判断价格趋势并产生交易信号。

一、策略原理

该策略主要通过以下步骤形成交易信号:

1. 分别计算多条不同周期ROC指标的数值;

2. 对ROC指标分别进行移动平均,并计算和值得到KST线;

3. 对KST线再次进行移动平均,得到信号线;

4. 当KST线上穿信号线时产生做多信号;当下穿信号线时产生做空信号。

5. 可选择适当的仓位大小。

通过计算ROC指标的集合和值,KST线能够同时反映价格的短期和长期变动趋势。其与信号线的交叉关系可用于趋势判断。

二、策略优势

该策略最大的优势是指标计算全面,同时反映了不同时间维度上的趋势信息。

另一个优势是指标使用简单直观, Signal line易于判断。

最后,可调整仓位控制策略的整体风险敞口。

三、潜在风险

但该策略也存在以下问题:  

首先,指标本身对价格变化存在一定滞后。

其次,仅依靠KST一种指标容易被反转所迷惑。

再者,参数优化工作量较大,需要谨防过拟合问题。

四、内容总结 

本文详细介绍了一种利用KST指标交叉进行趋势追踪的量化交易策略。该策略可以通过指标反映价格趋势变化,形成交易信号。但也需要注意防控滞后问题,并适当优化参数。总体来说,它提供了一种简单的趋势跟踪方法。

||


Trend Following Strategy Using KST Indicator

This article explains in detail a quantitative trend following strategy using the KST indicator. It generates trading signals by calculating the crossover between the KST line and signal line. 

I. Strategy Logic

The main steps for signal generation are:

1. Calculate values of multiple ROC indicators with different periods.

2. Apply moving averages to the ROC values separately and take the sum to derive the KST line.

3. Further smooth the KST line using moving average to get the signal line. 

4. A buy signal is generated when the KST line crosses above the signal line, and vice versa for sell signals.

5. Appropriate position sizing can be selected.

By taking the sum of multiple ROC values, the KST line reflects both short-term and long-term price trends. Its crossover with the signal line can determine trend direction.

II. Advantages of the Strategy

The biggest advantage is the comprehensive indicator calculation, which incorporates trend information across timeframes.

Another advantage is the simple and intuitive indicator usage with a clear signal line.

Lastly, adjustable position sizing helps control overall risk exposure.

III. Potential Weaknesses

However, some issues exist:

Firstly, the indicator itself has some lag in reacting to price changes.

Secondly, reliance on just the KST makes it susceptible to reversals. 

Also, extensive optimization is required to avoid overfitting.

IV. Summary

In summary, this article has explained a quantitative trend following strategy using KST crossover signals. It reflects price trends through the indicator for trade signals, but requires managing indicator lag and proper parameter tuning. Overall it provides a simple trend tracking approach.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|ROC Length #1|
|v_input_int_2|15|ROC Length #2|
|v_input_int_3|20|ROC Length #3|
|v_input_int_4|30|ROC Length #4|
|v_input_int_5|10|SMA Length #1|
|v_input_int_6|10|SMA Length #2|
|v_input_int_7|10|SMA Length #3|
|v_input_int_8|15|SMA Length #4|
|v_input_int_9|9|Signal Line Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-14 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// strategy(title="KST Alert", shorttitle="KST Alert", format=format.price, precision=4)
roclen1 = input.int(10, minval=1, title = "ROC Length #1")
roclen2 = input.int(15, minval=1, title = "ROC Length #2")
roclen3 = input.int(20, minval=1, title = "ROC Length #3")
roclen4 = input.int(30, minval=1, title = "ROC Length #4")
smalen1 = input.int(10, minval=1, title = "SMA Length #1")
smalen2 = input.int(10, minval=1, title = "SMA Length #2")
smalen3 = input.int(10, minval=1, title = "SMA Length #3")
smalen4 = input.int(15, minval=1, title = "SMA Length #4")
siglen = input.int(9, minval=1, title = "Signal Line Length")
smaroc(roclen, smalen) => ta.sma(ta.roc(close, roclen), smalen)
kst = smaroc(roclen1, smalen1) + 2 * smaroc(roclen2, smalen2) + 3 * smaroc(roclen3, smalen3) + 4 * smaroc(roclen4, smalen4)
sig = ta.sma(kst, siglen)
plot(kst, color=#009688, title="KST")
plot(sig, color=#F44336, title="Signal")
hline(0, title="Zero", color = #787B86)
eL1=ta.crossover(kst,sig)
eS1=ta.crossunder(kst,sig)
ch = 0
t = year(time('D'))
ch := ta.change(t) != 0 ? 1 : 0
T1 = time(timeframe.period, "0915-1520")
session_open = na(t) ? false : true
newDay = ta.change(time("15m")) != 0
strategy.entry("Long1", strategy.long, when = eL1)
strategy.entry("Short1", strategy.short, when = eS1)

```

> Detail

https://www.fmz.com/strategy/426891

> Last Modified

2023-09-15 12:05:21
