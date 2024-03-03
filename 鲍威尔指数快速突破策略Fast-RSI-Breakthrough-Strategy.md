
> Name

鲍威尔指数快速突破策略Fast-RSI-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b50f1ccc86b7d3ba7e.png)

[trans]

## 概述

该策略基于RSI指标和蜡烛实体的EMA实现快速突破操作。它利用RSI的快速形态和大型蜡烛实体来识别反转信号。

## 策略原理

1. 计算RSI指标,周期7,用RMA实现加速形态。

2. 计算蜡烛实体大小的EMA,周期30,作为实体大小基准。 

3. 如果RSI上穿限值线(默认30),并且当前K线实体大于平均实体大小的1/4,做多。

4. 如果RSI下穿限值线(默认70),并且当前K线实体大于平均实体大小的1/4,做空。

5. 如果已经持仓,RSI重新回穿限值线时平仓。

6. 可以设置RSI长度、限值、参考价格等参数。

7. 可以设置实体大小EMA周期、开仓 chroot倍数等参数。

8. 可以设置RSI金叉/死叉的根数。

## 优势分析

1. 利用RSI指标的反转属性,能及时捕捉反转信号。

2. RMA实现RSI的加速形态,使反转更加敏感。

3. 结合大型K线实体过滤,避免被小范围震荡套利。

4. 回测数据充足,可靠性较高。

5. 可自定义参数,适应不同市场环境。

6. 交易逻辑清晰简单。

## 风险分析

1. RSI指标存在回测偏差,实盘效果待验证。

2. 大型K线实体无法完全过滤充分震荡市场。

3. 默认参数可能不适合所有品种,需要优化。 

4. 胜率可能不高,需要承受连续止损的心理压力。

5. 突破失败的风险,需要及时止损。

## 优化方向  

1. 优化RSI参数,适应不同周期及品种。

2. 优化K线实体EMA周期,平滑实体大小。

3. 优化开仓的实体倍数,控制入场频率。

4. 增加移动止损,保证胜率。

5. 增加趋势过滤,避免逆势交易。

6. 优化资金管理策略,控制单笔风险。

## 总结

该策略整体来说是一个非常简单直接的反转策略。它同时利用RSI指标的反转属性和大型K线实体的破坏力,在市场突破时快速入场。虽然回测效果不错,但实盘效果还有待验证,使用时需要注意优化参数并控制风险。整体来说,该策略具有非常高的价值,是可以在实盘中应用并持续优化的非常好的策略之一。

|| 

## Overview

This strategy implements fast breakthrough operations based on RSI indicator and EMA of candlestick bodies. It identifies reversal signals using the fast formation of RSI and large candlestick bodies.  

## Strategy Logic

1. Calculate RSI indicator with period 7 and use RMA for acceleration.

2. Calculate EMA of candlestick body size with period 30 as benchmark for body size.

3. If RSI crosses above the limit line (default 30) and current candle body is larger than 1/4 of average body size, go long.

4. If RSI crosses below the limit line (default 70) and current candle body is larger than 1/4 of average body size, go short.

5. If already in position, close when RSI crosses back the limit line.

6. Parameters like RSI length, limit, reference price can be configured. 

7. Parameters like body EMA period, open position chroot multiplier can be configured.

8. The number of RSI crossings can be configured.

## Advantage Analysis  

1. Utilize the reversal attribute of RSI to capture reversals timely.

2. RMA accelerates RSI formation for more sensitive reversals. 

3. Filter small range consolidations with large candlestick bodies.

4. Sufficient backtest data ensures reliability.  

5. Customizable parameters adapt to different market environments.

6. Simple and clear logic.

## Risk Analysis

1. RSI has backtest bias, actual performance to be validated.

2. Large bodies cannot fully filter choppy markets.

3. Default parameters may not suit all products, optimization needed.

4. Win rate may not be high, need to endure consecutive losses mentally.

5. Risk of failed breakthrough, need timely stop loss.

## Optimization Directions

1. Optimize RSI parameters for different periods and products.

2. Optimize body EMA period to smooth body size.

3. Optimize body multiplier for open positions to control entry frequency. 

4. Add moving stop loss to ensure win rate.

5. Add trend filter to avoid counter trend trading.

6. Optimize money management for risk control.

## Conclusion

In summary, this is a very simple and direct reversal strategy. It utilizes both the reversal attribute of RSI and the momentum of large candlestick bodies to get in fast during market reversals. Although backtest results look good, actual performance is yet to be validated. Parameter optimization and risk control are needed when applying it. Overall it is a strategy with great value and is worth applying and constantly improving in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|7|RSI Period|
|v_input_4|30|RSI limit|
|v_input_5_close|0|RSI Price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|true|RSI Bars|
|v_input_7|2018|From Year|
|v_input_8|2100|To Year|
|v_input_9|true|From Month|
|v_input_10|12|To Month|
|v_input_11|true|From day|
|v_input_12|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-23 00:00:00
end: 2023-10-23 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title = "Noro's Fast RSI Strategy v1.2", shorttitle = "Fast RSI str 1.2", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 5)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
rsiperiod = input(7, defval = 7, minval = 2, maxval = 50, title = "RSI Period")
limit = input(30, defval = 30, minval = 1, maxval = 100, title = "RSI limit")
rsisrc = input(close, defval = close, title = "RSI Price")
rb = input(1, defval = 1, minval = 1, maxval = 5, title = "RSI Bars")
fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Fast RSI
fastup = rma(max(change(rsisrc), 0), rsiperiod)
fastdown = rma(-min(change(rsisrc), 0), rsiperiod)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))
uplimit = 100 - limit
dnlimit = limit

//RSI Bars
ur = fastrsi > uplimit
dr = fastrsi < dnlimit
uprsi = rb == 1 and ur ? 1 : rb == 2 and ur and ur[1] ? 1 : rb == 3 and ur and ur[1] and ur[2] ? 1 : rb == 4 and ur and ur[1] and ur[2] and ur[3] ? 1 : rb == 5 and ur and ur[1] and ur[2] and ur[3] and ur[4] ? 1 : 0
dnrsi = rb == 1 and dr ? 1 : rb == 2 and dr and dr[1] ? 1 : rb == 3 and dr and dr[1] and dr[2] ? 1 : rb == 4 and dr and dr[1] and dr[2] and dr[3] ? 1 : rb == 5 and dr and dr[1] and dr[2] and dr[3] and dr[4] ? 1 : 0

//Body
body = abs(close - open)
emabody = ema(body, 30)

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
up = bar == -1 and (strategy.position_size == 0 or close < strategy.position_avg_price) and dnrsi and body > emabody / 4
dn = bar == 1 and (strategy.position_size == 0 or close > strategy.position_avg_price) and uprsi and body > emabody / 4
exit = ((strategy.position_size > 0 and fastrsi > dnlimit and bar == 1) or (strategy.position_size < 0 and fastrsi < uplimit and bar == -1)) and body > emabody / 2

//Trading
if up
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))

if dn
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))
    
if time > timestamp(toyear, tomonth, today, 00, 00) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430017

> Last Modified

2023-10-24 11:51:56
