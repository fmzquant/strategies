
> Name

均线震荡突破HODL策略Moving-Average-Oscillation-HODL-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过观察价格与长周期均线(如200日线)的关系,在价格突破均线时建仓做多,在价格跌破均线时平仓,属于长线震荡突破操作策略。该策略追求长期持有并减少交易频率。

策略原理:

1. 计算一条长周期的移动平均线,典型参数为200日线。

2. 当收盘价从下方突破该均线时,进行买入做多操作。

3. 当收盘价从上方跌破该均线时,进行卖出平仓操作。

4. 在做多状态则持续持有,直至价格跌破均线止损。

该策略的优势:

1. 长线均线可有效识别价格中长线趋势。

2. 突破交易方式可及时捕捉股价长线反转。

3. 减少交易频率,有助于降低交易成本和风险。

该策略的风险:

1. 长周期均线滞后问题较严重,入场时点不佳。

2. 无法限制突破后的回调波动带来的亏损。

3. 频繁出现小幅震荡突破可能带来连续小额损失。

总之,该HODL策略通过长周期均线震荡来判断持有时机,可减少交易频率。但在参数优化与止损设置方面仍有改进空间,以控制回撤并获得长期稳定收益。

||

This strategy observes price oscillation around long-period moving averages (e.g. 200-day) to determine hold signals, trading breakouts for position entry and using break below as stop loss. It aims to minimize trading frequency for long-term holding. 

Strategy Logic:

1. Calculate a long-period moving average, typically 200-day. 

2. Enter long when price breaks above the moving average.

3. Exit long when price breaks back below the moving average. 

4. Hold long position until break below stop loss.

Advantages:

1. Long-period MA effectively identifies mid-to-long term trends.

2. Breakout trading captures long-term reversals in a timely manner.

3. Lower trading frequency reduces costs and risks.

Risks:

1. Longer MAs lag significantly, resulting in poor entry timing.

2. No limit on post-breakout drawdown risks.

3. Frequent minor breakouts bring sustained small losses.

In summary, this HODL strategy uses long MA oscillation to determine hold timing, minimizing trade frequency. But parameter optimization and stop loss placement could improve performance and risk control for steady long-term gains. 

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2029|Backtest Stop Year|
|v_input_5|true|Backtest Stop Month|
|v_input_6|true|Backtest Stop Day|
|v_input_7|200|MA Period|
|v_input_8|0|smoothing: EMA|SMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-05 00:00:00
end: 2023-04-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("HODLBot", default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_every_tick=true, overlay=true)
    
//// Time limits 
testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(01, "Backtest Start Month")
testStartDay = input(01, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2029, "Backtest Stop Year")
testStopMonth = input(1, "Backtest Stop Month")
testStopDay = input(1, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => true

maPeriod = input(200, "MA Period")
smoothing = input(defval="EMA", options=["EMA", "SMA"])

ma(smoothing, src, length) => 
    if smoothing == "EMA"
        ema(src, length)
    else
        if smoothing == "SMA"
            sma(src, length)
        
//// Main ////

movingAverage = ma(smoothing, close, maPeriod)

plot(movingAverage, color=orange, style = line, linewidth = 4)
 
// very simple, price over MA? Buy and HODL 
if (testPeriod() and close > movingAverage)
    strategy.entry("HODL", strategy.long)

// Price under, close long
if (testPeriod() and close < movingAverage)
    strategy.close("HODL")

```

> Detail

https://www.fmz.com/strategy/426497

> Last Modified

2023-09-12 16:02:24
