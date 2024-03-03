
> Name

基于快速RSI的风控复合交易策略Fast-RSI-Risk-Control-Compound-Futures-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15c441e0ddf42cccdf0.png)

[trans]


## 概述

本策略针对现货交易平台BitMEX设计,通过对快速RSI指标进行分析,结合多项技术指标筛选信号,实现高效率的趋势追踪交易。策略同时设置了资金管理、止损机制,可以有效控制交易风险。

## 策略原理

1. 计算快速RSI,参数设置为7日线,超买线25,超卖线75。当RSI上穿超买线,为超买信号;当RSI下穿超卖线,为超卖信号。

2. 对K线实体设置筛选。要求开盘为阴线,实体长度不小于昨日平均实体20%。

3. 对K线颜色设置筛选。要求最近4根K为阴线时做空,最近4根K为阳线时做多。

4. 设置止损逻辑。当价格向不利方向移动时,平仓止损。

5. 设置防反弹机制。当价格向有利方向移动达到止损线时,再次发出信号才建仓。

6. 设置资金管理。采用固定资金百分比建仓,每损失一笔加倍仓位。

## 优势分析

1. 快速RSI参数设置合理,能快速捕捉趋势。结合K线实体和颜色判断,可有效过滤假突破。

2. 多层过滤信号,可以减少交易次数,提高胜率。

3. 策略内置止损机制,可以有效控制单笔损失。

4. 采用动态仓位调整,实现适度激进的资金管理。

5. 可自定义交易时间段,避开重大事件带来的震荡。

## 风险及优化

1. 速度过快可能漏掉交易机会。可以适当放宽参数,增加灵活性。

2. 无法有效判断趋势末期。可考虑结合其他指标判断潜在反转。

3. 仓位调整方式过于激进,可引入锁仓方式。

4. 可根据不同市场调整参数,实现更优的参数组合。

## 总结

本策略整体来说较为稳健,通过快速RSI判断趋势方向,再结合多重技术指标过滤信号,可以在趋势中获得较好回报。同时策略具备一定的优化空间,通过调整参数组合,可适应不同市场环境,具有较强的实用性。

||


## Overview

This strategy is designed for the spot trading platform BitMEX. By analyzing the fast RSI indicator and combining multiple technical indicators to screen signals, it realizes efficient trend tracking trading. The strategy also sets risk management and stop loss mechanisms to effectively control trading risks.

## Strategy Logic

1. Calculate fast RSI with parameters of 7 days and overbought line 25, oversold line 75. When RSI crosses over overbought line, it is an overbought signal. When RSI crosses below oversold line, it is an oversold signal.

2. Set filter on candlestick body. Require opening as bearish candle with body length no less than 20% of yesterday's average body length. 

3. Set filter on candlestick color. Require last 4 candles as bearish when going short, and last 4 candles as bullish when going long.

4. Set stop loss logic. Close position when price moves in unfavorable direction.

5. Set anti-whipsaw mechanism. Only take signal when price recovers to stop loss level after initial move.

6. Set position sizing. Use fixed percentage of capital for each trade, and double position size after each loss.

## Advantage Analysis 

1. Fast RSI parameters set reasonably can quickly capture trends. Combining with candlestick body and color filters can avoid false breakouts effectively.

2. Multi-layer filter enhances win rate by reducing number of trades.

3. Built-in stop loss mechanism limits per trade loss. 

4. Dynamic position sizing realizes moderately aggressive capital management.

5. Customizable trading time frame avoids noise from major events.

## Risks and Optimizations

1. High speed may miss some trading opportunities. Can relax parameters for more flexibility.

2. Hard to determine trend ending. Consider combining with other indicators to detect potential reversals.

3. Position sizing method too aggressive, can introduce locking position way.

4. Can optimize parameters for different markets to find better parameter combinations.

## Conclusion

Overall this strategy is quite robust. By judging trend direction with fast RSI and filtering signals with multiple indicators, it can get good returns during trends. Also the strategy has room for optimization. By adjusting parameter combinations it can adapt to different market environments, thus having good practicality.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|true|Use Martingale|
|v_input_4|100|Capital, %|
|v_input_5|7|RSI Period|
|v_input_6|25|RSI limit|
|v_input_7|true|RSI Bars|
|v_input_8|true|Use Open Color Filter|
|v_input_9|true|Use Close Color Filter|
|v_input_10|4|Open Color Bars|
|v_input_11|true|Close Color Bars|
|v_input_12|true|Use Open Body Filter|
|v_input_13|true|Use Close Body Filter|
|v_input_14|20|Open Body Minimum, %|
|v_input_15|50|Close Body Minimum, %|
|v_input_16|true|Use Close Norma Filter|
|v_input_17|1900|From Year|
|v_input_18|2100|To Year|
|v_input_19|true|From Month|
|v_input_20|12|To Month|
|v_input_21|true|From Day|
|v_input_22|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-05 00:00:00
end: 2023-11-12 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Robot BitMEX Fast RSI v1.0", shorttitle = "Robot BitMEX Fast RSI v1.0", overlay = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 10)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usemar = input(true, defval = true, title = "Use Martingale")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
rsiperiod = input(7, defval = 7, minval = 2, maxval = 100, title = "RSI Period")
rsilimit = input(25, defval = 25, minval = 1, maxval = 30, title = "RSI limit")
rsibars = input(1, defval = 1, minval = 1, maxval = 20, title = "RSI Bars")
useocf = input(true, defval = true, title = "Use Open Color Filter")
useccf = input(true, defval = true, title = "Use Close Color Filter")
openbars = input(4, defval = 4, minval = 1, maxval = 20, title = "Open Color Bars")
closebars = input(1, defval = 1, minval = 1, maxval = 20, title = "Close Color Bars")
useobf = input(true, defval = true, title = "Use Open Body Filter")
usecbf = input(true, defval = true, title = "Use Close Body Filter")
openbody = input(20, defval = 20, minval = 0, maxval = 1000, title = "Open Body Minimum, %")
closebody = input(50, defval = 50, minval = 0, maxval = 1000, title = "Close Body Minimum, %")
usecnf = input(true, defval = true, title = "Use Close Norma Filter")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From Day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To Day")

//RSI
uprsi = rma(max(change(close), 0), rsiperiod)
dnrsi = rma(-min(change(close), 0), rsiperiod)
rsi = dnrsi == 0 ? 100 : uprsi == 0 ? 0 : 100 - (100 / (1 + uprsi / dnrsi))
uplimit = 100 - rsilimit
dnlimit = rsilimit
rsidn = rsi < dnlimit ? 1 : 0
rsiup = rsi > uplimit ? 1 : 0
rsidnok = sma(rsidn, rsibars) == 1
rsiupok = sma(rsiup, rsibars) == 1

//Body Filter
body = abs(close - open)
abody = sma(body, 10)
openbodyok = body >= abody / 100 * openbody or useobf == false
closebodyok = body >= abody / 100 * closebody or usecbf == false

//Color Filter
bar = close > open ? 1 : close < open ? -1 : 0
gbar = bar == 1 ? 1 : 0
rbar = bar == -1 ? 1 : 0
opengbarok = sma(gbar, openbars) == 1 or useocf == false
openrbarok = sma(rbar, openbars) == 1 or useocf == false
closebarok = (strategy.position_size > 0 and bar == 1) or (strategy.position_size < 0 and bar == -1) or useccf == false

//Norma Filter
norma = (rsi > dnlimit and rsi < uplimit) or usecnf == false

//Signals
up = openrbarok and rsidnok and openbodyok and (strategy.position_size == 0 or close < strategy.position_avg_price)
dn = opengbarok and rsiupok and openbodyok and (strategy.position_size == 0 or close > strategy.position_avg_price)
exit = ((strategy.position_size > 0 and closebarok and norma) or (strategy.position_size < 0 and closebarok and norma)) and closebodyok

//Indicator
plot(rsi, color = blue, linewidth = 3, title = "Double RSI")
plot(uplimit, color = black, title = "Upper Line")
plot(dnlimit, color = black, title = "Lower Line")
colbg = rsi > uplimit ? red : rsi < dnlimit ? lime : na
bgcolor(colbg, transp = 20)

//Trading
profit = exit ? ((strategy.position_size > 0 and close > strategy.position_avg_price) or (strategy.position_size < 0 and close < strategy.position_avg_price)) ? 1 : -1 : profit[1]
mult = usemar ? exit ? profit == -1 ? mult[1] * 2 : 1 : mult[1] : 1
lot = strategy.position_size == 0 ? strategy.equity / close * capital / 100 * mult : lot[1]

if up
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/431924

> Last Modified

2023-11-13 11:36:34
