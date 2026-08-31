
> Name

Turtle-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12ba2f8475191296a61.png)

### Overview

This is a short-term trading strategy based on the breakout theory. It uses moving average indicators and highest/lowest price indicators to identify breakout signals and capture profits from short-term trends.

### Strategy Logic

The strategy uses 20-day highest price to identify uptrends. When the closing price breaks above the 20-day high, it goes long. It uses 10-day lowest price to identify downtrends. When the closing price breaks below the 10-day low, it goes short. It also uses a 10-day highest price as a stop loss exit signal for short trades.  

Specifically, the strategy includes the following rules:

1. Enter long when closing price is above 20-day high;  
2. Enter short when closing price is below 10-day low;
3. Close short position when closing price is above 10-day high; 
4. Close long position when closing price is below 10-day low.

By comparing closing price with highest/lowest prices of different periods, it catches trend breakouts within short-term cycles and makes short-term trades.

### Advantage Analysis 

The strategy has the following advantages:

1. Simple and clear logic, easy to understand and implement;
2. Catch short-term trends timely based on breakout theory;
3. Identify both long and short opportunities for two-way trading; 
4. Flexible adjustment of holding period by setting different parameter ranges.

### Risk Analysis

There are also some risks:

1. Breakout trading tends to be trapped, stop loss is needed to control risk;
2. Frequent switching between long and short increases trading cost and slippage; 
3. Improper parameter settings may lead to over-trading or lagging.

We can set stop loss to limit per trade loss, or adjust parameter ranges to control trading frequency.

### Optimization

The strategy can be optimized from the following aspects:

1. Adding other filters to avoid false breakouts;
2. Setting dynamic exit methods to trail stop loss with profit;
3. Adding trend determination rules to avoid counter-trend trading;   
4. Optimizing parameter ranges to adapt to different cycles and market conditions.

### Conclusion

In conclusion, this is a simple and practical short-term breakout strategy. It helps to capture short-cycle trend opportunities. But there are risks of being trapped and high trading frequency. By adding filters, stop loss, parameter optimization, we can control risks and improve efficiency. The strategy suits traders focusing on short-term chances and pursuing high turnover rate.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2016|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|
|v_input_7|20|enter_fast|
|v_input_8|10|exit_fast|
|v_input_9|10|exit_fast_short|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-27 00:00:00
end: 2023-12-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("TurtleBC Strategy v2 V.Troussel", shorttitle="TurtleBC-V.Troussel", overlay=true, pyramiding=0)

// === BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1)
FromDay   = input(defval = 1, title = "From Day", minval = 1)
FromYear  = input(defval = 2016, title = "From Year", minval = 2016)
ToMonth   = input(defval = 1, title = "To Month", minval = 1)
ToDay     = input(defval = 1, title = "To Day", minval = 1)
ToYear    = input(defval = 9999, title = "To Year", minval = 9999)

enter_fast = input(20, minval=1)
exit_fast = input(10, minval=1)
exit_fast_short=input(10,minval=1)


fastL = highest(close, enter_fast)
fastS = highest(close ,exit_fast_short)
fastLC = lowest(close, exit_fast)
//Sortie pour le short
exitS=close>fastS[1]


enterL1 = close > fastL[1]
exitL1 = close <= fastLC[1]




strategy.entry("Long", strategy.long, when = enterL1 and (time > timestamp(FromYear, FromMonth, FromDay, 00, 00)) and (time < timestamp(ToYear, ToMonth, ToDay, 23, 59)))
strategy.close("Long", when = exitL1 and (time < timestamp(ToYear, ToMonth, ToDay, 23, 59)))

//le trigger de sortie est 
strategy.entry("Short", strategy.short, when = exitL1 and (time > timestamp(FromYear, FromMonth, FromDay, 00, 00)) and (time < timestamp(ToYear, ToMonth, ToDay, 23, 59)))
strategy.close("Short", when = exitS and (time < timestamp(ToYear, ToMonth, ToDay, 23, 59)))



```

> Detail

https://www.fmz.com/strategy/434192

> Last Modified

2023-12-04 16:25:53
