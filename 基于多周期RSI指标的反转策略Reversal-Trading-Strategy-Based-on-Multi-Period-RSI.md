
> Name

基于多周期RSI指标的反转策略Reversal-Trading-Strategy-Based-on-Multi-Period-RSI

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种利用多周期RSI指标判断反转点的量化交易策略。该策略同时分析多条RSI指标,识别市场拐点的形成。

一、策略原理

该策略使用3组不同参数设置的RSI指标,具体逻辑如下:

1. 分别计算2周期、7周期、14周期的RSI值;

2. 当RSI-2小于10、RSI-7小于20、RSI-14小于30时,判断为底部形成;

3. 当RSI-2大于90、RSI-7大于80、RSI-14大于70时,判断为顶部形成。

4. 根据RSI指标一致性,产生买入卖出信号。

5. 可预设指标一致性要求的参数,从而控制信号频繁程度。

这样,多周期RSI指标的集合分析,可以提升对反转点位的判断准确性。

二、策略优势

该策略最大优势是利用多周期RSI指标进行集合分析,这可以提高对关键点位的判断准确性,滤除假信号。

另一优势是可通过调整一致性参数,控制交易频率,适应不同市场环境。

最后,不同周期RSI的组合也提供了更多参数空间进行优化。

三、潜在风险

但该策略也存在以下风险:

首先,RSI指标对价格反转的判断,本身存在滞后问题。

其次,多指标组合带来的信号判断困难,需要设置清晰的过滤规则。

最后,反转交易本身带有一定的失败率,这需要有心理准备。

四、内容总结

本文详细介绍了一种基于多周期RSI指标识别反转点的量化交易策略。它通过判断RSI指标的一致性,提高了对市场转折点的识别能力。但也需要防控滞后问题和信号判断错误。总体来说,它提供了一种参数灵活的RSI策略优化思路。

||

This article explains in detail a quantitative trading strategy that utilizes multi-period RSI indicators to identify reversal points. It analyzes multiple RSI indicators simultaneously to spot market turning points.

I. Strategy Logic

The strategy employs 3 groups of RSI indicators with different parameters:

1. Calculate RSI values for period 2, 7, and 14 respectively.

2. When RSI-2 is below 10, RSI-7 below 20, and RSI-14 below 30, a bottom is identified.

3. When RSI-2 is above 90, RSI-7 above 80, and RSI-14 above 70, a top is identified. 

4. Generate buy/sell signals based on RSI unanimity. 

5. Preset adjustable parameters for indicator consensus, controlling signal frequency.

By analyzing RSI indicators across periods collectively, reversal point accuracy can be improved.

II. Advantages of the Strategy

The biggest advantage is using multiple timeframe RSI analysis improves identification of key points and filters out false signals.

Another advantage is the flexibility to adjust consensus parameters and adapt to different market environments.

Lastly, the RSI combinations also provide more tuning options.

III. Potential Risks

However, the following risks exist:

Firstly, RSI itself has inherent lag in identifying reversals.

Secondly, multiple indicators introduce signal ambiguity requiring clear rules.

Finally, reversal trades have a failure rate requiring psychological preparation. 

IV. Summary

In summary, this article has explained a quantitative strategy of identifying reversals based on multi-period RSI analysis. It improves recognition of market turning points by judging RSI unanimity. But risks like lagging and wrong signals need to be managed. Overall it provides a flexible RSI strategy optimization approach.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|true|leverage|
|v_input_4|3|Indicators|
|v_input_5|3|accuracy|
|v_input_6|1900|From Year|
|v_input_7|2100|To Year|
|v_input_8|true|From Month|
|v_input_9|12|To Month|
|v_input_10|true|From day|
|v_input_11|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-09-13 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Triple RSI Top/Bottom v1.1", shorttitle = "3RSI Top/Bottom 1.1", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
leverage = input(1, defval = 1, minval = 1, maxval = 100, title = "leverage")
indi = input(3, defval = 3, minval = 1, maxval = 3, title = "Indicators")
accuracy = input(3, defval = 3, minval = 1, maxval = 10, title = "accuracy")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//RSI-2
fastup = rma(max(change(close), 0), 2)
fastdown = rma(-min(change(close), 0), 2)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//RSI-7
middleup = rma(max(change(close), 0), 7)
middledown = rma(-min(change(close), 0), 7)
middlersi = middledown == 0 ? 100 : middleup == 0 ? 0 : 100 - (100 / (1 + middleup / middledown))

//RSI-14
slowup = rma(max(change(close), 0), 14)
slowdown = rma(-min(change(close), 0), 14)
slowrsi = slowdown == 0 ? 100 : slowup == 0 ? 0 : 100 - (100 / (1 + slowup / slowdown))

//Body
body = abs(close - open)
abody = sma(body, 10)

//Signals
acc = 10 - accuracy
signalup1 = fastrsi < (5 + acc) ? 1 : 0
signalup2 = middlersi < (10 + acc * 2) ? 1 : 0
signalup3 = slowrsi < (15 + acc * 3) ? 1 : 0

signaldn1 = fastrsi > (95 - acc) ? 1 : 0
signaldn2 = middlersi > (90 - acc * 2) ? 1 : 0
signaldn3 = slowrsi > (85 - acc * 3) ? 1 : 0

up = signalup1 + signalup2 + signalup3 >= indi
dn = signaldn1 + signaldn2 + signaldn3 >= indi
exit = ((strategy.position_size > 0 and close > open) or (strategy.position_size < 0 and close < open)) and body > abody / 3

//Trading
lot = strategy.position_size == 0 ? strategy.equity / close * leverage : lot[1]

if up
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Bottom", strategy.long, needlong == false ? 0 : lot)

if dn
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Top", strategy.short, needshort == false ? 0 : lot)
    
if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/426855

> Last Modified

2023-09-14 20:42:55
