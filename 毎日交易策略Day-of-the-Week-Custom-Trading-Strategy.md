
> Name

毎日交易策略Day-of-the-Week-Custom-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概要

这是一个用于比特币的自定义多空头交易策略。它允许您根据一周中的不同交易日来回测做多或做空。价格可能倾向于在每周的不同交易日向一个方向或另一个方向移动,这个策略允许您在一系列日期内测试不同的交易日,以利用这一点。

请确保您在查看表现和交易历史记录时采用日线图,以确保脚本按预期工作并且您从Trading View获得尽可能多的历史数据。

## 策略原理

该策略的核心逻辑是允许用户选择一周中每一天进行多头交易、空头交易还是不进行任何交易。

首先,它允许用户设置回测的日期范围,包括起始月份、日期、年份和结束月份、日期、年份。

然后,它使用一个数组timeframes来存储一周中每一天的数字表示,从星期日的0到星期六的6。

另一个数组timeframes_options被用来存储每一天要进行多头、空头还是不交易的选择。这通过一个input选项来设置。

在for循环中,该策略检查当前的交易日是否与timeframes数组中的某一天匹配。如果匹配,并且选项与前一天不同,则首先关闭所有未平仓头寸。

如果选项不是“无”,则根据所选多头或空头打开相应方向的头寸。

这样,该策略就可以在设定的日期范围内,根据一周中每天的设置来进行多空头交易。

## 优势分析

该策略的主要优势是提供了高度自定义的多空头交易。用户可以自由选择一周中每一天进行哪种交易方向。

与固定的每周交易策略不同,该策略可以灵活调整。如果某几天结果不理想,可以轻松修改只交易其他天。

回测日期范围也非常灵活,可以测试任何用户指定的时间段,看看哪些日期组合效果最好。

交易逻辑非常清晰简单,容易理解和修改。用户无需编程即可调整参数。

该策略还会在每天方向改变时自动平掉未平仓头寸,避免不必要的风险。

## 风险分析

该策略主要风险在于用户设置的每日交易选择不一定适合所有日期范围。

例如,工作日做多周末做空可能在某段时间内证实是有效的,但在其他时间段可能会失败。

因此,必须谨慎测试不同的日期范围,不要依赖某一次的回测结果。参数调整必须结合具体市场情况。

另一风险是每日方向变化时不能及时止损平仓。这可能导致亏损扩大。但该策略试图通过自动平仓来减轻这一问题。

总体来说,该策略较为依赖参数优化,需要足够的测试来找到适合不同市场条件的参数组合。

## 优化方向

该策略可以通过以下几个方面来优化:

1. 在每日方向变化时,增加止损逻辑,在头寸处于盈利时设置移动止损,减小回撤。

2. 增加一个过滤器,当价格突破某一天的高点或低点时才发出信号,避免在无趋势时反复交易。

3. 在高波动时段降低头寸规模,低波动时增加头寸,使风险可控。

4. 对交易日选择加入机器学习,根据历史数据判断每天的交易概率,生成动态的每日方向。

5. 增加对突发事件的处理逻辑,如重大财经事件出现时暂停交易,避免被套。

## 总结

本策略通过每日方向选择,提供了高度灵活的多空头交易能力。用户可以自由组合测试找到最佳参数。但该策略有较高的优化要求,需要大量测试找到适合不同市场的设置。加入止损、过滤器、动态调整等优化手段可以降低风险,提高稳定性。在谨慎参数优化的前提下,该策略可以成为高效的每日方向交易工具。

||


## Overview

This is a custom long/short trading strategy for bitcoin that allows backtesting longing or shorting on different days of the week. The price may tend to move in one direction or another on each weekday, and this strategy allows testing across a range of dates to capitalize on this.

Make sure you are on the daily timeframe when viewing performance and trade history to ensure the script works as intended and you have maximum historical data from TradingView.

## Strategy Logic  

The core logic of the strategy is to allow the user to choose long, short or no trading for each day of the week.

First, it allows the user to set the date range for backtesting, including start month, day, year and end month, day, year.

Then, it uses an array timeframes to store the numeric representation of each day of the week, from Sunday 0 to Saturday 6. 

Another array timeframes_options is used to store the choice of long, short or no trading for each day. This is set via an input option.

In a for loop, the strategy checks if the current trading day matches a day in the timeframes array. If so, and the option differs from the previous day, it first closes all open positions.

If the option is not "None", it opens a position in the appropriate direction based on the chosen long or short.

Thus, the strategy can trade long/short over the set date range based on the settings for each day of the week.

## Advantage Analysis

The main advantage of this strategy is providing highly customizable long/short trading. The user has complete freedom in choosing trading direction for each day of the week.

Unlike fixed weekly trading strategies, this one can be flexibly adjusted. Poor performing days can be easily modified to only trade other days. 

The backtest date range is also highly flexible, allowing testing of any user specified period to see which date combinations perform best.

The trading logic is very clear and simple, easy to understand and modify. Users can adjust parameters without coding.

The strategy also auto closes positions on direction change each day, avoiding unnecessary risk.

## Risk Analysis

The main risk is that the user's chosen daily trading selections may not fit every date range. 

For example, long on weekdays and short weekends may prove effective for some periods but fail in others.

So date ranges must be carefully tested, and not rely on one backtest outcome. Parameter tweaking needs to consider market conditions.

Another risk is inability to cut losses in time when direction changes daily. But the strategy attempts to mitigate this by auto closing.

Overall, the strategy is heavily optimization reliant, and requires sufficient testing to find parameter sets fitting different market conditions.

## Optimization Directions

The strategy can be improved in several aspects:

1. Add stop loss logic on daily direction change, setting trailing stops when positions are profitable to limit drawdowns.

2. Add a filter, only taking signals on breaking certain day high/low, avoiding trading without trend. 

3. Reduce position sizing in high volatility periods, and increase when volatility is low to control risk.

4. Add machine learning to trading day selections, judging probability of each day based on historical data, generating dynamic daily directions.

5. Add logic to handle sudden events like major news by pausing trading to avoid being caught offsides.

## Conclusion

This strategy provides highly flexible long/short trading ability through daily direction selections. Users can freely combine test for optimum parameters. But it has high optimization requirements, needing extensive testing to find settings fitting different markets. Adding enhancements like stops, filters, dynamic adjustments can reduce risk and improve robustness. With prudent parameter optimization, the strategy can become an effective daily directional trading tool.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|From Month|
|v_input_2|14|From day|
|v_input_3|2021|From Year|
|v_input_4|12|To Month|
|v_input_5|31|To day|
|v_input_6|2100|To Year|
|v_input_7|0|sunday: None|Short|Long|
|v_input_8|0|monday: Long|Short|None|
|v_input_9|0|tuesday: Long|Short|None|
|v_input_10|0|wednesday: Long|Short|None|
|v_input_11|0|thursday: None|Short|Long|
|v_input_12|0|friday: None|Short|Long|
|v_input_13|0|saturday: None|Short|Long|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-19 00:00:00
end: 2023-09-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

//@version=4
// strategy("Day of Week Custom Buy/Sell Strategy", overlay=true, currency=currency.USD, default_qty_value=1.0,initial_capital=30000.00,default_qty_type=strategy.percent_of_equity)

frommonth = input(defval = 6, minval = 01, maxval = 12, title = "From Month")
fromday = input(defval = 14, minval = 01, maxval = 31, title = "From day")
fromyear = input(defval = 2021, minval = 1900, maxval = 2100, title = "From Year")

tomonth = input(defval = 12, minval = 01, maxval = 12, title = "To Month")
today = input(defval = 31, minval = 01, maxval = 31, title = "To day")
toyear = input(defval = 2100, minval = 1900, maxval = 2100, title = "To Year")

timeframes = array.new_int(7, 1)
timeframes_options = array.new_string(7, 'None')

array.set(timeframes,0,7)
array.set(timeframes_options,0, input(defval='None', options=['Long','Short','None'], title='sunday'))
array.set(timeframes,1,1)
array.set(timeframes_options,1, input(defval='Long', options=['Long','Short','None'], title='monday'))
array.set(timeframes,2,2)
array.set(timeframes_options,2, input(defval='Long', options=['Long','Short','None'], title='tuesday'))
array.set(timeframes,3,3)
array.set(timeframes_options,3, input(defval='Long', options=['Long','Short','None'], title='wednesday'))
array.set(timeframes,4,4)
array.set(timeframes_options,4, input(defval='None', options=['Long','Short','None'], title='thursday'))
array.set(timeframes,5,5)
array.set(timeframes_options,5, input(defval='None', options=['Long','Short','None'], title='friday'))
array.set(timeframes,6,6)
array.set(timeframes_options,6, input(defval='None', options=['Long','Short','None'], title='saturday'))



for i = 0 to array.size(timeframes) - 1
    
    if dayofweek == array.get(timeframes, i) and array.get(timeframes_options, i) != array.get(timeframes_options, i==0?6:i-1)
        strategy.close_all()

    if dayofweek == array.get(timeframes, i) and array.get(timeframes_options, i)!='None' and array.get(timeframes_options, i) != array.get(timeframes_options, i==0?6:i-1)
        if array.get(timeframes_options, i) == 'Long'
            strategy.entry("Long", strategy.long, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))
        else if array.get(timeframes_options, i) == 'Short'
            strategy.entry("Short", strategy.short, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))

```

> Detail

https://www.fmz.com/strategy/427930

> Last Modified

2023-09-26 20:49:44
