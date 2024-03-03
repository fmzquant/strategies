
> Name

基于反转RSI的错过信号追踪交易策略RSI-Signal-Tracking-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略通过追踪RSI指标错过的超买超卖信号实现反转交易。当RSI指标从超买区域回落时产生追踪做多信号,从超卖区域反弹时产生追踪做空信号,以捕捉反转机会。

## 策略原理

### 信号判定

RSI指标用于判断超买超卖。当RSI上穿设定的超买线时为超买信号,下穿超卖线时为超卖信号。

```pine
overbought = rsi > uplimit 
oversold = rsi < dnlimit
```

若前一根K线RSI指标处于超买状态,当前K线RSI指标退出超买状态,产生追踪做多信号`up1`;若前一根K线RSI指标处于超卖状态,当前K线RSI指标退出超卖状态,产生追踪做空信号`dn1`。

```pine
up1 = bar == -1 and strategy.position_size == 0 and overbought[1] and overbought == false
dn1 = bar == 1 and strategy.position_size == 0 and oversold[1] and oversold == false 
```

### 退出判定

当持仓方向与K线实体方向一致时,并且实体突破其10周期平均值的一半时,产生退出信号。

```pine
exit = (((strategy.position_size > 0 and bar == 1) or 
         (strategy.position_size < 0 and bar == -1)) and 
        body > abody / 2)
```

## 策略优势

1. 追踪RSI指标错过的反转信号,避免需要及时捕捉超买超卖点的困难。

2. 利用RSI指标的反转属性,捕捉反转机会。

3. 结合K线实体方向和大小进行退出判断,避免反弹后继续追踪。

## 风险及解决方法

1. RSI指标发出假信号的风险

   - 解决方法:结合其他指标进行确认,避免错信。

2. 追踪信号时,价格可能已经发生一定回调,亏损风险大

   - 解决方法:降低入场仓位,或优化入场时机。

3. 部分反弹无法获利就发出退出信号的风险

   - 解决方法:优化退出判定逻辑,提高持仓获利机会。

## 优化思路

1. 优化参数设定,如超买超卖线、回看周期等,针对不同市场调整。

2. 调整仓位管理方式,如追踪信号时降低仓位。

3. 优化入场时机,在追踪信号基础上,添加其他条件限制。

4. 优化退出方式,提高获利概率,如引入移动止盈等方式。

5. 优化止损方式,降低亏损风险,如引入移动止损、扇形止损等。

## 总结

本策略基于RSI指标的超买超卖信号实现追踪反转交易。策略具有追踪反转信号的优势,但也存在一定的假信号风险和亏损风险。通过持续优化,可以进一步提高策略的稳定性和收益率。

||


## Overview

This strategy implements reversal trading by tracking missed overbought and oversold signals from the RSI indicator. Buy signals are generated when RSI drops from overbought levels, and sell signals when RSI bounces from oversold levels, aiming to capture reversal opportunities.

## Strategy Logic 

### Signal Identification

RSI indicator identifies overbought/oversold levels. Overbought when RSI crosses above the overbought threshold, oversold when crossing below the oversold threshold.

```pine 
overbought = rsi > uplimit
oversold = rsi < dnlimit
```

If RSI was overbought last bar and exits overbought this bar, a buy signal `up1` is triggered. If RSI was oversold last bar and exits oversold this bar, a sell signal `dn1` is generated.

```pine
up1 = bar == -1 and strategy.position_size == 0 and overbought[1] and overbought == false
dn1 = bar == 1 and strategy.position_size == 0 and oversold[1] and oversold == false
```

### Exit Logic

If the bar direction aligns with position direction, and bar body exceeds half of its 10-period average, an exit signal is triggered.

```pine 
exit = (((strategy.position_size > 0 and bar == 1) or  
         (strategy.position_size < 0 and bar == -1)) and  
        body > abody / 2)
```

## Advantages

1. Track missed RSI reversal signals, avoiding the need to timely catch overbought/oversold points.

2. Leverage RSI's reversal property to capture turning points.

3. Incorporate bar direction and size into exit logic to avoid further tracking after pullbacks.

## Risks and Solutions

1. Risk of false signals from RSI

   - Solution: Confirm signals with other indicators to avoid false signals

2. Prices may already have pulled back significantly when tracking signal, increasing loss risk

   - Solution: Reduce position size on entry, or optimize entry timing

3. Risk of premature exits before full profitable reversal

   - Solution: Improve exit logic to increase chance of capturing profits

## Enhancement Opportunities

1. Optimize parameters like overbought/oversold levels, lookback period etc based on different markets

2. Adjust position sizing, like lowering size when tracking signals

3. Improve entry timing, adding filters beyond tracking signals 

4. Enhance exits to increase profitability, like trailing profit stops

5. Optimize stops to reduce losses, like trailing stops or cone stops
   
## Summary

This strategy implements reversal trading by tracking RSI overbought/oversold signals. It has the advantage of catching reversal signals but also has risks of false signals and losses. Further optimizations can improve the strategy's stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|Use Martingale|
|v_input_4|100|Capital, %|
|v_input_5|14|RSI Period|
|v_input_6|25|RSI limit|
|v_input_7|false|Show Arrows|
|v_input_8|1900|From Year|
|v_input_9|2100|To Year|
|v_input_10|true|From Month|
|v_input_11|12|To Month|
|v_input_12|true|From day|
|v_input_13|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-20 00:00:00
end: 2023-09-27 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Anti RSI Strategy v1.0", shorttitle = "Anti RSI str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usemar = input(false, defval = false, title = "Use Martingale")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
rsiperiod1 = input(14, defval = 14, minval = 2, maxval = 50, title = "RSI Period")
rsilimit1 = input(25, defval = 25, minval = 1, maxval = 100, title = "RSI limit")
showarr = input(false, defval = false, title = "Show Arrows")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//RSI
uprsi1 = rma(max(change(close), 0), rsiperiod1)
dnrsi1 = rma(-min(change(close), 0), rsiperiod1)
rsi = dnrsi1 == 0 ? 100 : uprsi1 == 0 ? 0 : 100 - (100 / (1 + uprsi1 / dnrsi1))
uplimit = 100 - rsilimit1
dnlimit = rsilimit1

//Body
body = abs(close - open)
abody = sma(body, 10)

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
overbought = rsi > uplimit
oversold = rsi < dnlimit

up1 = bar == -1 and strategy.position_size == 0 and overbought[1] and overbought == false
dn1 = bar == 1 and strategy.position_size == 0 and oversold[1] and oversold == false
up2 = bar == -1 and strategy.position_size > 0 and overbought == false
dn2 = bar == 1 and strategy.position_size < 0 and oversold == false

norma = overbought == false and oversold == false
exit = (((strategy.position_size > 0 and bar == 1) or (strategy.position_size < 0 and bar == -1)) and body > abody / 2)

//Arrows
col = exit ? black : up1 or dn1 or up2 or dn2 ? blue : na
needup = up1 or up2
needdn = dn1 or dn2
needexitup = exit and strategy.position_size < 0
needexitdn = exit and strategy.position_size > 0
plotarrow(showarr and needup ? 1 : na, colorup = blue, colordown = blue, transp = 0)
plotarrow(showarr and needdn ? -1 : na, colorup = blue, colordown = blue, transp = 0)
plotarrow(showarr and needexitup ? 1 : na, colorup = black, colordown = black, transp = 0)
plotarrow(showarr and needexitdn ? -1 : na, colorup = black, colordown = black, transp = 0)

//Trading
profit = exit ? ((strategy.position_size > 0 and close > strategy.position_avg_price) or (strategy.position_size < 0 and close < strategy.position_avg_price)) ? 1 : -1 : profit[1]
mult = usemar ? exit ? profit == -1 ? mult[1] * 2 : 1 : mult[1] : 1
lot = strategy.position_size == 0 ? strategy.equity / close * capital / 100 * mult : lot[1]

if up1 or up2
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn1 or dn2
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/428051

> Last Modified

2023-09-28 10:54:24
