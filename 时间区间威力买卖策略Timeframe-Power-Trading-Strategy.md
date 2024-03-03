
> Name

时间区间威力买卖策略Timeframe-Power-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bc19854ff339c2547b.png)

[trans]

### 概述

时间区间威力买卖策略是一个利用股票在一天中不同时间区间价格走势的策略。它会在一天中的48个半小时时间区间内判断最佳的做多做空时机。

### 策略原理

该策略的核心逻辑是,股票在一天中不同的时间区间,其价格走势往往有规律可循。策略通过设置48个半小时的时间区间,并在每个时间区间判断做多、做空或者无操作三种选择。当时间进入某个区间时,如果设置做多,则会开仓做多;如果设置做空,则会开仓做空。在区间结束时,会考察下一个时间区间的操作类型,如果与当前区间相同,则继续持有仓位;如果不同,则会在区间结束前平仓。

举例来说,如果6点30分到7点之间设置为做多,那么策略会在6点30分开仓做多;如果7点到7点30分之间设置为做空,那么在7点前,策略会平掉之前的多单,然后在7点开仓做空。

该策略的优势在于可以捕捉股票在一天中价格变化规律。风险在于,价格变化规律可能随时间改变,从而导致策略失效。

### 优势分析

该策略最大的优势在于利用了股票Prices is Right 的特性,也就是价格在不同时间区间有不同的均值和方差。这使得策略可以在波动较大的时段采用范围交易策略,在波动较小的时段采用趋势策略,灵活应对市场变化。

另一个优势是参数设置灵活。可以根据不同股票的特点,选择最佳的参数组合,对冲部分不确定性风险。

### 风险分析

主要风险来自假设的不稳定性。如果股票价格在一天内的变化规律发生改变,那么策略的盈利预期就会受到影响。这种改变可能源自股票基本面,也可能源自大环境的黑天鹅事件。

此外,过于频繁的交易也会带来交易费用方面的风险。如果没有足够的交易量支撑,交易费用的堆积也会影响最终收益。

### 优化方向 

可以考虑引入机器学习模型,实现参数的动态调节。例如,训练LSTM模型,预测下一个时间区间的股票价格,据此调整做多做空的参数。

或者,可以尝试结合股票的基本面指标,判断价格变化规律是否发生改变的可能性,从而确定策略的启动时机。

### 总结

时间区间威力买卖策略通过分析股票一天内价格变化的规律,在不同时间区间采取最优操作,以获取Alpha。这是一种参数调节灵活、风险可控的高效算法交易策略。未来的优化方向,可以考虑引入机器学习模型,或者结合基本面判断,使策略的盈利空间更大,抗风险能力更强。

||

### Overview

The Timeframe Power Trading Strategy is a strategy that utilizes the price trend patterns of stocks during different timeframes within a day. It seeks to identify the optimal long or short opportunities across 48 half-hourly timeframes in a day.  

### Strategy Logic

The core logic of this strategy is that stock prices tend to exhibit certain patterns during different periods in a day. The strategy sets up 48 half-hourly timeframes throughout the day and determines whether to go long, go short or do nothing during each timeframe. When time enters a certain timeframe, if the setting is "long", it will open a long position. If the setting is "short", it will open a short position. At the end of each timeframe, it checks the operation type of the next timeframe. If it's the same as the current one, it will continue holding the position. If different, it will close out positions before the timeframe ends.

For example, if the timeframe 6:30am - 7:00am is set to "long", the strategy will open a long position at 6:30am. If 7:00am - 7:30am is set to "short", it will close long positions before 7am and open short positions at 7am.

The advantage of this strategy lies in its ability to capitalize on intraday price swings of stocks. The risk is that such patterns may change over time and render the strategy ineffective.  

### Advantage Analysis

The biggest edge of this strategy is that it utilizes the "Prices is Right" attribute of stocks - prices tend to have different mean and variance during different periods of the day. This allows the strategy to adopt range trading tactics during volatile periods and trend trading tactics during stable periods to adapt to varying market conditions.  

Another advantage is the flexibility of parameter configuration. Optimal parameter sets could be used for different stocks to offset uncertainties.

### Risk Analysis  

The main risk comes from instability of assumptions - if the intraday price pattern changes substantially for a stock, the profitability expectations of the strategy will be affected. Such changes could come from fundmental shifts or black swan events affecting the overall market.  

Also, high trading frequency poses risks in terms of transaction costs. Without sufficient trading volume, accumulation of fees could erode end returns.

### Optimization Guidelines

Consider introducing machine learning models to enable dynamic adjustment of parameters - e.g. LSTM models to forecast next-period prices and fine-tune long/short settings accordingly.

Alternatively, combine stock fundamentals to gauge likelihood of pattern shift, to determine optimal timing for strategy activation.  

### Conclusion  

The Timeframe Power Trading Strategy generates alpha by identifying optimal intraday operations during different periods when analyzing recurring price patterns. With flexible parameter adjustment and risk controls, it is an efficient algo trading strategy. Future optimization paths involve ML adoption or fundmental combos to expand profitability and enhance robustness against uncertainties.

|| Timeframe Power Trading Strategy 

### Overview

The Timeframe Power Trading Strategy is a strategy that utilizes the price trend patterns of stocks during different timeframes within a day. It seeks to identify the optimal long or short opportunities across 48 half-hourly timeframes in a day.  

### Strategy Logic

The core logic of this strategy is that stock prices tend to exhibit certain patterns during different periods in a day. The strategy sets up 48 half-hourly timeframes throughout the day and determines whether to go long, go short or do nothing during each timeframe. When time enters a certain timeframe, if the setting is "long", it will open a long position. If the setting is "short", it will open a short position. At the end of each timeframe, it checks the operation type of the next timeframe. If it's the same as the current one, it will continue holding the position. If different, it will close out positions before the timeframe ends.

For example, if the timeframe 6:30am - 7:00am is set to "long", the strategy will open a long position at 6:30am. If 7:00am - 7:30am is set to "short", it will close long positions before 7am and open short positions at 7am.

The advantage of this strategy lies in its ability to capitalize on intraday price swings of stocks. The risk is that such patterns may change over time and render the strategy ineffective.  

### Advantage Analysis

The biggest edge of this strategy is that it utilizes the "Prices is Right" attribute of stocks - prices tend to have different mean and variance during different periods of the day. This allows the strategy to adopt range trading tactics during volatile periods and trend trading tactics during stable periods to adapt to varying market conditions.  

Another advantage is the flexibility of parameter configuration. Optimal parameter sets could be used for different stocks to offset uncertainties.

### Risk Analysis  

The main risk comes from instability of assumptions - if the intraday price pattern changes substantially for a stock, the profitability expectations of the strategy will be affected. Such changes could come from fundmental shifts or black swan events affecting the overall market.  

Also, high trading frequency poses risks in terms of transaction costs. Without sufficient trading volume, accumulation of fees could erode end returns.

### Optimization Guidelines

Consider introducing machine learning models to enable dynamic adjustment of parameters - e.g. LSTM models to forecast next-period prices and fine-tune long/short settings accordingly.

Alternatively, combine stock fundamentals to gauge likelihood of pattern shift, to determine optimal timing for strategy activation.  

### Conclusion  

The Timeframe Power Trading Strategy generates alpha by identifying optimal intraday operations during different periods when analyzing recurring price patterns. With flexible parameter adjustment and risk controls, it is an efficient algo trading strategy. Future optimization paths involve ML adoption or fundmental combos to expand profitability and enhance robustness against uncertainties.
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
|v_input_7|0|0000-0030: None|Short|Long|
|v_input_8|0|0030-0100: Long|Short|None|
|v_input_9|0|0100-0130: Long|Short|None|
|v_input_10|0|0130-0200: Long|Short|None|
|v_input_11|0|0200-0230: Long|Short|None|
|v_input_12|0|0230-0300: None|Short|Long|
|v_input_13|0|0300-0330: None|Short|Long|
|v_input_14|0|0330-0400: None|Short|Long|
|v_input_15|0|0400-0430: None|Short|Long|
|v_input_16|0|0430-0500: None|Short|Long|
|v_input_17|0|0500-0530: None|Short|Long|
|v_input_18|0|0530-0600: None|Short|Long|
|v_input_19|0|0600-0630: None|Short|Long|
|v_input_20|0|0630-0700: None|Short|Long|
|v_input_21|0|0700-0730: None|Short|Long|
|v_input_22|0|0730-0800: None|Short|Long|
|v_input_23|0|0800-0830: None|Short|Long|
|v_input_24|0|0830-0900: None|Short|Long|
|v_input_25|0|0900-0930: None|Short|Long|
|v_input_26|0|0930-1000: None|Short|Long|
|v_input_27|0|1000-1030: None|Short|Long|
|v_input_28|0|1030-1100: None|Short|Long|
|v_input_29|0|1100-1130: None|Short|Long|
|v_input_30|0|1130-1200: None|Short|Long|
|v_input_31|0|1200-1230: None|Short|Long|
|v_input_32|0|1230-1300: None|Short|Long|
|v_input_33|0|1300-1330: None|Short|Long|
|v_input_34|0|1330-1400: None|Short|Long|
|v_input_35|0|1400-1430: None|Short|Long|
|v_input_36|0|1430-1500: None|Short|Long|
|v_input_37|0|1500-1530: None|Short|Long|
|v_input_38|0|1530-1600: None|Short|Long|
|v_input_39|0|1600-1630: None|Short|Long|
|v_input_40|0|1630-1700: None|Short|Long|
|v_input_41|0|1700-1730: None|Short|Long|
|v_input_42|0|1730-1800: None|Short|Long|
|v_input_43|0|1800-1830: None|Short|Long|
|v_input_44|0|1830-1900: None|Short|Long|
|v_input_45|0|1900-0930: None|Short|Long|
|v_input_46|0|1930-2000: None|Short|Long|
|v_input_47|0|2000-2030: None|Short|Long|
|v_input_48|0|2030-2100: None|Short|Long|
|v_input_49|0|2100-2130: None|Short|Long|
|v_input_50|0|2130-2200: None|Short|Long|
|v_input_51|0|2200-2230: None|Short|Long|
|v_input_52|0|2230-2300: None|Short|Long|
|v_input_53|0|2300-2330: None|Short|Long|
|v_input_54|0|2330-0000: None|Short|Long|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-23 00:00:00
end: 2023-11-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

//@version=4
strategy("Timeframe Time of Day Buying and Selling Strategy", overlay=true)

frommonth = input(defval = 6, minval = 01, maxval = 12, title = "From Month")
fromday = input(defval = 14, minval = 01, maxval = 31, title = "From day")
fromyear = input(defval = 2021, minval = 1900, maxval = 2100, title = "From Year")

tomonth = input(defval = 12, minval = 01, maxval = 12, title = "To Month")
today = input(defval = 31, minval = 01, maxval = 31, title = "To day")
toyear = input(defval = 2100, minval = 1900, maxval = 2100, title = "To Year")

timeframes = array.new_string(48, '')
timeframes_options = array.new_string(49, 'None')

array.set(timeframes,0,'2330-0000')
array.set(timeframes_options,0, input(defval='None', options=['Long','Short','None'], title='0000-0030'))
array.set(timeframes,1,'0000-0030')
array.set(timeframes_options,1, input(defval='Long', options=['Long','Short','None'], title='0030-0100'))
array.set(timeframes,2,'0030-0100')
array.set(timeframes_options,2, input(defval='Long', options=['Long','Short','None'], title='0100-0130'))
array.set(timeframes,3,'0100-0130')
array.set(timeframes_options,3, input(defval='Long', options=['Long','Short','None'], title='0130-0200'))
array.set(timeframes,4,'0130-0200')
array.set(timeframes_options,4, input(defval='Long', options=['Long','Short','None'], title='0200-0230'))
array.set(timeframes,5,'0200-0230')
array.set(timeframes_options,5, input(defval='None', options=['Long','Short','None'], title='0230-0300'))
array.set(timeframes,6,'0230-0300')
array.set(timeframes_options,6, input(defval='None', options=['Long','Short','None'], title='0300-0330'))
array.set(timeframes,7,'0300-0330')
array.set(timeframes_options,7, input(defval='None', options=['Long','Short','None'], title='0330-0400'))
array.set(timeframes,8,'0330-0400')
array.set(timeframes_options,8, input(defval='None', options=['Long','Short','None'], title='0400-0430'))
array.set(timeframes,9,'0400-0430')
array.set(timeframes_options,9, input(defval='None', options=['Long','Short','None'], title='0430-0500'))
array.set(timeframes,10,'0430-0500')
array.set(timeframes_options,10, input(defval='None', options=['Long','Short','None'], title='0500-0530'))
array.set(timeframes,11,'0500-0530')
array.set(timeframes_options,11, input(defval='None', options=['Long','Short','None'], title='0530-0600'))
array.set(timeframes,12,'0530-0600')
array.set(timeframes_options,12, input(defval='None', options=['Long','Short','None'], title='0600-0630'))
array.set(timeframes,13,'0600-0630')
array.set(timeframes_options,13, input(defval='None', options=['Long','Short','None'], title='0630-0700'))
array.set(timeframes,14,'0630-0700')
array.set(timeframes_options,14, input(defval='None', options=['Long','Short','None'], title='0700-0730'))
array.set(timeframes,15,'0700-0730')
array.set(timeframes_options,15, input(defval='None', options=['Long','Short','None'], title='0730-0800'))
array.set(timeframes,16,'0730-0800')
array.set(timeframes_options,16, input(defval='None', options=['Long','Short','None'], title='0800-0830'))
array.set(timeframes,17,'0800-0830')
array.set(timeframes_options,17, input(defval='None', options=['Long','Short','None'], title='0830-0900'))
array.set(timeframes,18,'0830-0900')
array.set(timeframes_options,18, input(defval='None', options=['Long','Short','None'], title='0900-0930'))
array.set(timeframes,19,'0900-0930')
array.set(timeframes_options,19, input(defval='None', options=['Long','Short','None'], title='0930-1000'))
array.set(timeframes,20,'0930-1000')
array.set(timeframes_options,20, input(defval='None', options=['Long','Short','None'], title='1000-1030'))
array.set(timeframes,21,'1000-1030')
array.set(timeframes_options,21, input(defval='None', options=['Long','Short','None'], title='1030-1100'))
array.set(timeframes,22,'1030-1100')
array.set(timeframes_options,22, input(defval='None', options=['Long','Short','None'], title='1100-1130'))
array.set(timeframes,23,'1100-1130')
array.set(timeframes_options,23, input(defval='None', options=['Long','Short','None'], title='1130-1200'))
array.set(timeframes,24,'1130-1200')
array.set(timeframes_options,24, input(defval='None', options=['Long','Short','None'], title='1200-1230'))
array.set(timeframes,25,'1200-1230')
array.set(timeframes_options,25, input(defval='None', options=['Long','Short','None'], title='1230-1300'))
array.set(timeframes,26,'1230-1300')
array.set(timeframes_options,26, input(defval='None', options=['Long','Short','None'], title='1300-1330'))
array.set(timeframes,27,'1300-1330')
array.set(timeframes_options,27, input(defval='None', options=['Long','Short','None'], title='1330-1400'))
array.set(timeframes,28,'1330-1400')
array.set(timeframes_options,28, input(defval='None', options=['Long','Short','None'], title='1400-1430'))
array.set(timeframes,29,'1400-1430')
array.set(timeframes_options,29, input(defval='None', options=['Long','Short','None'], title='1430-1500'))
array.set(timeframes,30,'1430-1500')
array.set(timeframes_options,30, input(defval='None', options=['Long','Short','None'], title='1500-1530'))
array.set(timeframes,31,'1500-1530')
array.set(timeframes_options,31, input(defval='None', options=['Long','Short','None'], title='1530-1600'))
array.set(timeframes,32,'1530-1600')
array.set(timeframes_options,32, input(defval='None', options=['Long','Short','None'], title='1600-1630'))
array.set(timeframes,33,'1600-1630')
array.set(timeframes_options,33, input(defval='None', options=['Long','Short','None'], title='1630-1700'))
array.set(timeframes,34,'1630-1700')
array.set(timeframes_options,34, input(defval='None', options=['Long','Short','None'], title='1700-1730'))
array.set(timeframes,35,'1700-1730')
array.set(timeframes_options,35, input(defval='None', options=['Long','Short','None'], title='1730-1800'))
array.set(timeframes,36,'1730-1800')
array.set(timeframes_options,36, input(defval='None', options=['Long','Short','None'], title='1800-1830'))
array.set(timeframes,37,'1800-1830')
array.set(timeframes_options,37, input(defval='None', options=['Long','Short','None'], title='1830-1900'))
array.set(timeframes,38,'1830-1900')
array.set(timeframes_options,38, input(defval='None', options=['Long','Short','None'], title='1900-0930'))
array.set(timeframes,39,'1900-0930')
array.set(timeframes_options,39, input(defval='None', options=['Long','Short','None'], title='1930-2000'))
array.set(timeframes,40,'1930-2000')
array.set(timeframes_options,40, input(defval='None', options=['Long','Short','None'], title='2000-2030'))
array.set(timeframes,41,'2000-2030')
array.set(timeframes_options,41, input(defval='None', options=['Long','Short','None'], title='2030-2100'))
array.set(timeframes,42,'2030-2100')
array.set(timeframes_options,42, input(defval='None', options=['Long','Short','None'], title='2100-2130'))
array.set(timeframes,43,'2100-2130')
array.set(timeframes_options,43, input(defval='None', options=['Long','Short','None'], title='2130-2200'))
array.set(timeframes,44,'2130-2200')
array.set(timeframes_options,44, input(defval='None', options=['Long','Short','None'], title='2200-2230'))
array.set(timeframes,45,'2200-2230')
array.set(timeframes_options,45, input(defval='None', options=['Long','Short','None'], title='2230-2300'))
array.set(timeframes,46,'2230-2300')
array.set(timeframes_options,46, input(defval='None', options=['Long','Short','None'], title='2300-2330'))
array.set(timeframes,47,'2300-2330')
array.set(timeframes_options,47, input(defval='None', options=['Long','Short','None'], title='2330-0000'))


string_hour = hour<10?'0'+tostring(hour):tostring(hour)
string_minute = minute<10?'0'+tostring(minute):tostring(minute)
current_time = string_hour+string_minute


f_strLeft(_str, _n) =>
    string[] _chars = str.split(_str, "")
    int _len = array.size(_chars)
    int _end = min(_len, max(0, _n))
    string[] _substr = array.new_string(0)
    if _end <= _len
        _substr := array.slice(_chars, 0, _end)
    string _return = array.join(_substr, "")

f_strRight(_str, _n) =>
    string[] _chars = str.split(_str, "")
    int _len = array.size(_chars)
    int _beg = max(0, _len - _n)
    string[] _substr = array.new_string(0)
    if _beg < _len
        _substr := array.slice(_chars, _beg, _len)
    string _return = array.join(_substr, "")


for i = 0 to array.size(timeframes) - 1
    start_time = f_strLeft(array.get(timeframes, i), 4)
    end_time = f_strRight(array.get(timeframes, i), 4)
    
    if current_time == end_time and array.get(timeframes_options, i)!='None' and array.get(timeframes_options, i) != array.get(timeframes_options, i==47?0:i+1) and timestamp(toyear, tomonth, today, 00, 00)
        strategy.close_all()

    if current_time == start_time and array.get(timeframes_options, i)!='None' and array.get(timeframes_options, i) != array.get(timeframes_options, i==0?47:i-1)
        if array.get(timeframes_options, i) == 'Long'
            strategy.entry("Long", strategy.long, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))
        else if array.get(timeframes_options, i) == 'Short'
            strategy.entry("Short", strategy.short, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))

```

> Detail

https://www.fmz.com/strategy/433009

> Last Modified

2023-11-23 15:32:00
