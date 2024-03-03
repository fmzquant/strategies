
> Name

极值反转追踪策略Extremum-Reversion-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ef74cb8c02fc0b6d53.png)
[trans]
## 概述
极值反转追踪策略通过追踪价格波动区间的极值点,在极值点处反转做多做空,实现趋势追踪。

## 策略原理
该策略主要基于以下原理运作:

1. 使用security函数获取不同周期K线的最高价high和最低价low,检测是否等于前一根K线的最高最低价,从而判断是否达到新的极值点。

2. 当检测到新的极值点时,若当前为多头行情,则在该极值点反转做空;若当前为空头行情,则在该极值点反转做多。

3. 设置止损点为做多做空后形成的新的极值点,实现趋势追踪止损。

4. 通过从年月日设置策略生效的时间范围,实现不同时间段的策略调整。

## 策略优势
该策略主要具有以下优势:

1. 能够有效捕捉价格变化的极值点,做出反转操作,实现趋势追踪。

2. 设置了时间和资金管理,可以对策略的使用时间和使用资金进行控制,降低风险。

3. 采用新极值点作为止损点,能够根据新价格波动范围调整止损位置,实现动态止损。

4. 策略逻辑简单清晰,容易理解,便于调试和优化。

## 策略风险
该策略也存在一定的风险:

1. 极值点判断有可能出现误判的情况,导致做多做空失误。可以通过调整极值点判断逻辑来优化。

2. 止损位置靠近入场点,可能会增加止损被触发的概率。可以设置离场regexes浮动止损来解决。

3. 未考虑跟随趋势的加仓和反向开仓逻辑,可能难以在趋势行情中获利。可加入加仓和反向开仓规则进行优化。

4. 货币和时间范围设置较为死板,无法动态调整。可以建立参数优化体系来解决。

## 策略优化方向  
该策略可以从以下几个方向进行优化:

1. 优化极值点判断逻辑,加入更多过滤条件,避免误判。

2. 增加浮动止损机制,根据价格和波动幅度变化调整止损距离。

3. 加入基于趋势和波动的加仓和反向开仓模块,提高盈利能力。 

4. 建立参数优化机制,实现对参数的自动化测试和优化。

5. 加入机器学习模型判断行情,辅助策略决策。

## 总结
该极值反转追踪策略通过捕捉价格变化极值点并追踪趋势运行,具有较强的适应性和盈利能力。在继续优化极值点判断、止损机制、开仓规则等方面后,该策略有望成为稳定可靠的量化交易策略。

||

## Overview
The extremum reversion tracking strategy tracks the extremum points of price fluctuation range and makes reversal long/short positions at extremum points to track trends.

## Strategy Principle  
The strategy is mainly based on the following principles:  

1. Use security function to obtain high and low prices of different cycle K-lines to detect whether they are equal to previous ones, so as to judge if new extremum points are reached.

2. When new extremum points are detected, make short position if it is currently a bull market, and make long position if it is currently a bear market.  

3. Set stop loss point as the new extremum point formed after long/short position is made to track trends with stop loss.

4. Set the effective time range of the strategy by configuring start year, month and date to make adjustments for different time periods.

## Advantages
The main advantages of this strategy are:

1. Effectively capture extremum points of price changes and make reversal positions to track trends. 

2. Configure time and risk management to control usage time and capital of the strategy to reduce risks.

3. Use new extremum points as stop loss points to dynamically adjust stop loss positions based on new price fluctuation range.

4. Simple and clear strategy logic for easy understanding, debugging and optimization.

## Risks
There are also some risks for this strategy:

1. There could be misjudgement in determining extremum points, causing errors in long/short positions. The logic can be optimized.

2. Stop loss position is close to entry point, increasing the probability of stop loss being triggered. Floating stop loss can be used.

3. No consideration on pyramiding positions along trends and reverse positions, less profitable in trending markets. Related logics can be added.  

4. Currency and time range configuration is quite rigid, cannot make dynamic adjustments. Parameter optimization system can be introduced.

## Optimization Directions
The strategy can be optimized in the following aspects:

1. Optimize extremum point logic with more filters to avoid misjudgement.  

2. Add floating stop loss mechanism based on price and volatility changes to adjust stop loss distance.

3. Introduce pyramiding and reverse position modules based on trends and volatility to improve profitability.

4. Establish parameter optimization mechanism for automatic testing and parameter tuning.

5. Incorporate machine learning models to assist strategy decision making.  

## Summary 
The extremum reversion tracking strategy works by capturing price extremums and tracking trends, adaptable and profitable. Further optimizations on extremum judgement, stop loss mechanism, position opening rules etc. could shape it into a solid quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|false|Short|
|v_input_3|100|Capital, %|
|v_input_4|W|Timeframe for extremums|
|v_input_5|1900|From Year|
|v_input_6|2100|To Year|
|v_input_7|true|From Month|
|v_input_8|12|To Month|
|v_input_9|true|From day|
|v_input_10|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Extremum Strategy v1.0", shorttitle = "Extremum str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(false, defval = false, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
tf = input('W', title = 'Timeframe for extremums')
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Levels
highm = request.security(syminfo.tickerid, tf, high[1])
lowm = request.security(syminfo.tickerid, tf, low[1])
upcolorm = highm == highm[1] ? lime : na
dncolorm = lowm == lowm[1] ? red : na
plot(highm, color = upcolorm, linewidth = 3)
plot(lowm, color = dncolorm, linewidth = 3)

//Signals
size = strategy.position_size
up = size > 0 ? highm * 1000000 : highm != highm[1] ? highm : up[1]
dn = size < 0 ? 0 : lowm != lowm[1] ? lowm : dn[1]
exit = true

//Trading
lot = strategy.position_size != strategy.position_size[1] ? strategy.equity / close * capital / 100 : lot[1]

if highm > 0 and high[1] < highm and highm == highm[1]
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, stop = up)
    
if lowm > 0 and low[1] > lowm and lowm == lowm[1]
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, stop = dn)

if exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/442248

> Last Modified

2024-02-20 15:17:41
