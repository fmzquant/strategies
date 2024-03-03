
> Name

基于K线方向简易的量化交易策略Simple-Quantitative-Trading-Strategy-Based-on-Candle-Direction

> Author

ChaoZhang

> Strategy Description


[trans]  

本文将详细介绍一种根据K线方向进行简单量化交易的策略。该策略直接根据价格的收盘关系产生多空信号。

一、策略原理

该策略仅根据K线的收盘价格关系判断方向,具体交易逻辑为:

1. 当收盘价大于开盘价时,做多;

2. 当收盘价小于开盘价时,做空; 

3. 可以设置仓位大小;

4. 可设置回测时间范围。

通过直接判断K线的收阴或收阳,形成最简单的追踪信号。虽然非常原始,但也形成了一套完整的交易系统。

二、策略优势

该策略最大的优势在于非常简单和直观,仅利用K线方向判断,无需计算指标。

另一优势是可以通过调整仓位大小控制风险。

最后,可以设置回测时间范围,针对不同时期进行测试。

三、潜在风险

但该策略也存在以下问题:

首先,仅凭K线方向无法对市场做出准确判断,信号质量较差。

其次,没有设置止损止盈条件,无法控制交易风险。

最后,没有进行参数优化,不够稳定。

四、内容总结

本文详细介绍了一种仅根据K线方向进行简易量化交易的策略。它通过最基本的价格关系判断,形成完整的交易系统。但也存在一些问题有待改进,如优化参数、增加止损止盈等。总体来说,它提供了一种非常简单原始的策略思路。

||

This article explains in detail a simple quantitative trading strategy based solely on candle direction. It generates long/short signals directly according to the closing price relationship.

I. Strategy Logic

The strategy purely judges direction based on candle close, with the logic being:

1. Go long when close is greater than open. 

2. Go short when close is less than open.

3. Position sizing can be configured. 

4. Backtest date range can be set.

By simply determining candle closes up or down, the most basic trend following signals are formed. Despite being very primitive, it constitutes a complete trading system.

II. Advantages of the Strategy

The biggest advantage is the extreme simplicity and intuition, solely judging based on candle direction without indicators. 

Another advantage is the ability to control risk through position sizing.

Lastly, backtest time ranges can be set to test different periods.

III. Potential Risks

However, some issues exist:

Firstly, just candle direction is insufficient for accurate market judgment, resulting in poor signal quality.

Secondly, the lack of stop loss and take profit fails to control trade risks.

Lastly, the absence of parameter tuning leads to instability. 

IV. Summary

In summary, this article has explained a simple quantitative trading strategy based purely on candle direction. It forms a complete system through the most basic price relationship analysis. But improvements are needed such as parameter optimization and adding stops. Overall it provides a very simple and primitive strategy concept.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2016|year|
|v_input_2|9|month|
|v_input_3|true|day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-02 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("BarUpDn time limited", overlay=true, pyramiding=1, default_qty_type = strategy.fixed, default_qty_value = 1 )

//input boxes for the limit date
yearLimit = input(2016,title="year") 
monthLimit = input(9, title="month")
dayLimit = input(1, title="day")

//function that checks if the current date is more recent than the limit
dateOk(yl,ml,dl) =>
    ok = timestamp(yl,ml,dl,0,1) < time
    
checkDate = dateOk(yearLimit,monthLimit,dayLimit)
conditionUp = close > open ? true : false
conditionDown = close < open ? true : false
if ( checkDate  )
    strategy.entry("BarUp", strategy.long, when = conditionUp)
    strategy.entry("BarDn", strategy.short, when = conditionDown)




```

> Detail

https://www.fmz.com/strategy/426884

> Last Modified

2023-09-15 11:45:01
