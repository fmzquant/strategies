
> Name

三重RSI极值交易策略Triple-RSI-Extremum-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c375755cd676da0b26.png)
[trans]


### 概述

该策略通过同时观察三个不同周期的RSI指标,来判断市场是否达到了超买超卖的极值区域,从而发出买入和卖出信号。主要判断市场趋势通过观察不同周期指标的组合来实现。

### 策略原理

该策略同时利用2周期、7周期和14周期的RSI指标。当三个RSI指标同时显示超买或超卖信号时,即发出交易信号。 

具体来说,当2周期RSI小于10,7周期RSI小于20,14周期RSI小于30时,认为市场处于超卖状态,发出买入信号。当2周期RSI大于90,7周期RSI大于80,14周期RSI大于70时,认为市场处于超买状态,发出卖出信号。

代码中通过accuracy参数来微调RSI的超买超卖判断阈值,默认为3,数值越小,超买超卖判断越严格。strategy.long和strategy.short用于控制是否进行相应方向交易。

当发出买入或卖出信号后,如果价格反向突破当日开盘价,则平掉当前头寸,实施趋势跟踪止损。

### 优势分析

- 通过组合多周期RSI指标,可以更准确判断市场的超买超卖状况,过滤假信号。

- 采用不同参数微调超买超卖判定条件,可以根据市场调整策略灵敏度。

- 实施开盘价追踪止损,可以及时止损,锁定盈利。

### 风险分析

- RSI指标容易产生背离,判断市场趋势转折的效果不佳。

- 针对高波动行情,RSI指标的设置需要调整,否则会频繁止损。

- 三重RSI同时触发的情况较少,可能错过较好的交易机会。

- 应适当调整超买超卖判断的参数,建议测试不同市场的数据效果。

### 优化方向

- 可以考虑加入别的指标进行确认,如布林线,KDJ等,避免RSI背离。 

- 可以根据不同行情类型,自动优化RSI的参数。

- 可以测试其他止损exit条件,如ATR止损等。

- 可以添加筛选交易时段的条件,避免不适宜的时间段。

### 总结

该策略通过组合多周期RSI指标判断超买超卖区域,实施趋势跟踪止损。优点是可以提高判断准确性,及时止损;缺点是容易漏单,RSI指标易错判。建议进行参数优化测试,并加入其他指标进行确认,可获得更好的效果。
||


### Overview

This strategy uses three RSI indicators with different periods to determine whether the market has reached extremely overbought or oversold levels, and generates buy and sell signals accordingly. It mainly judges market trends by observing combinations of indicators across different timeframes.

### Strategy Logic

The strategy utilizes 2-period, 7-period, and 14-period RSI indicators simultaneously. When all three RSI indicators show overbought or oversold signals at the same time, trading signals are generated.

Specifically, when 2-period RSI is below 10, 7-period RSI is below 20, and 14-period RSI is below 30, the market is considered oversold, and a buy signal is generated. When 2-period RSI is above 90, 7-period RSI is above 80, and 14-period RSI is above 70, the market is considered overbought, and a sell signal is generated.

The code uses an accuracy parameter to fine tune the overbought/oversold threshold values of the RSI. The default is 3, and lower values mean stricter overbought/oversold criteria. strategy.long and strategy.short control whether corresponding directional trading is enabled. 

When a buy or sell signal is generated, if the price reverses and breaks through the opening price of the day, the current position will be closed to realize profit or cut losses.

### Advantage Analysis 

- Using a combination of multi-period RSI indicators can more accurately identify overbought/oversold conditions and filter false signals.

- Fine tuning overbought/oversold criteria with different parameters allows adjusting strategy sensitivity based on market conditions.

- Implementing open price tracking stops helps lock in profits in a timely manner.

### Risk Analysis

- RSI indicators are prone to divergence which is not effective in identifying trend reversals.

- For high volatility periods, RSI parameters need to be adjusted, otherwise it may trigger stops too frequently. 

- Triple RSI signals triggering together is rare, which may miss good trading opportunities.

- Parameters for overbought/oversold criteria should be tuned and tested on different markets.

### Optimization Directions

- Consider adding other indicators for confirmation, such as Bollinger Bands, KDJ etc, to avoid RSI divergence.

- Auto-optimize RSI parameters based on different market regimes.

- Test other stop exit conditions, such as ATR stops. 

- Add filters to avoid trading during unsuitable periods.

### Conclusion

This strategy identifies overbought/oversold zones using a combination of multi-period RSI indicators, and implements trend tracking stops. Advantages include improving accuracy, timely stopping out; Disadvantages include missing trades, RSI misjudgements. Parameter optimization testing is recommended, along with adding confirming indicators, to achieve better performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|3|accuracy|
|v_input_4|1900|From Year|
|v_input_5|2100|To Year|
|v_input_6|true|From Month|
|v_input_7|12|To Month|
|v_input_8|true|From day|
|v_input_9|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-25 00:00:00
end: 2023-10-28 10:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title = "Noro's Triple RSI Top/Bottom", shorttitle = "3RSI Top/Bottom", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
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

//Signals
acc = 10 - accuracy
up = fastrsi < (5 + acc) and middlersi < (10 + acc * 2) and slowrsi < (15 + acc * 3)
dn = fastrsi > (95 - acc) and middlersi > (90 - acc * 2) and slowrsi > (85 - acc * 3)
exit = (strategy.position_size > 0 and close > open) or (strategy.position_size > 0 and close > open)

//Trading
if up
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Bottom", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Top", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430844

> Last Modified

2023-11-02 14:34:21
