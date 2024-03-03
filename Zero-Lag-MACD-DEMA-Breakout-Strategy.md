
> Name

Zero-Lag-MACD-DEMA-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
零拉格MACD DEMA突破策略

该策略基于Toff的MACD DEMA指标构建交易信号。MACD DEMA指标通过计算DEMA快线和DEMA慢线的差值,再经过去相移处理,可以有效消除MACD指标的滞后问题。

该策略的交易规则是:当零拉格MACD上穿0轴做多;当零拉格MACD下穿0轴做空。通过MACD对0轴的突破来判断市场的多空态势。

这种基于零拉格MACD的策略的优势在于可以更敏感地捕捉趋势的变化,采用DEMA而非EMA可以过滤假突破。但是MACD指标本身对复杂行情的判断力有限,存在一定的错误信号风险,需要配合趋势过滤指标来提高稳定性。

总的来说,零拉格MACD DEMA突破策略对强势趋势行情效果很好,可以快速抓住机会。但在盘整行情中表现较差,需要谨慎使用。只有不断优化参数并严格控制风险,才能长期应用该策略。

||

This strategy builds trading signals based on Toff's MACD DEMA indicator. The MACD DEMA indicator calculates the difference between DEMA fast line and DEMA slow line, with zero-lag processing, effectively eliminating the lagging issue of regular MACD. 

The trading rules are: go long when zero-lag MACD crosses above 0 line, and go short when MACD crosses below 0 line. MACD 0-line crossovers are used to determine market sentiment.

The advantage of this zero-lag MACD strategy is it can capture trend changes more sensitively. Using DEMA instead of EMA also filters false breakouts. However, MACD itself has limited judging ability on complex price action, with some risk of false signals. Trend filters are needed to improve stability.

In summary, the zero-lag MACD DEMA breakout strategy works very well on strong trending moves, catching opportunities quickly. But it underperforms in range-bound periods, requiring cautious use. Only through continuous optimization and strict risk control can this strategy be applied successfully in the long run.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2000|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2100|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|31|Backtest Stop Day|
|v_input_7|12|DEMA Courte|
|v_input_8|26|DEMA Longue|
|v_input_9|9|Signal|
|v_input_10|true|Lignes|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// strategy(title="Patron04 MACD DEMA Strategy",default_qty_type = strategy.percent_of_equity,default_qty_value = 3500, overlay=true)

testStartYear = input(2000, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2100, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false

sma = input(12,title='DEMA Courte')
lma = input(26,title='DEMA Longue')
tsp = input(9,title='Signal')
dolignes = input(true,title="Lignes")

MMEslowa = ema(close,lma)
MMEslowb = ema(MMEslowa,lma)
DEMAslow = ((2 * MMEslowa) - MMEslowb )

MMEfasta = ema(close,sma)
MMEfastb = ema(MMEfasta,sma)
DEMAfast = ((2 * MMEfasta) - MMEfastb)

LigneMACDZeroLag = (DEMAfast - DEMAslow)

MMEsignala = ema(LigneMACDZeroLag, tsp)
MMEsignalb = ema(MMEsignala, tsp)
Lignesignal = ((2 * MMEsignala) - MMEsignalb )

MACDZeroLag = (LigneMACDZeroLag - Lignesignal)

long = LigneMACDZeroLag > 0
short = LigneMACDZeroLag < 0

if testPeriod()

    strategy.entry("Long", strategy.long,when=long)
    strategy.entry("Short", strategy.short,when=short)






```

> Detail

https://www.fmz.com/strategy/426360

> Last Modified

2023-09-11 14:43:52
