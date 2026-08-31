
> Name

三重RSI极值交易策略Triple-RSI-Extremum-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c375755cd676da0b26.png)


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
