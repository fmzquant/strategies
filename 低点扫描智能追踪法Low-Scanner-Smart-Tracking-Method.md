
> Name

低点扫描智能追踪法Low-Scanner-Smart-Tracking-Method

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14f33a8d7100195e3f4.png)

[trans]

## 概述

低点扫描智能追踪法是一种非反演的Forex交易策略。它使用低点扫描器寻找最低点,并结合Hull移动平均线进行交易信号判断,可以实现高胜率。

## 原理分析 

该策略首先使用低点扫描器寻找最低点。低点扫描器通过计算价格和交易量的RSI值,再与其WMA曲线比较,判断RSI值低于WMA时为最低点。

然后,策略使用Hull移动平均线进行交易信号判断。它计算两个不同周期的Hull MA,当短周期Hull MA上穿长周期Hull MA时做多,下穿时做空。

最后,策略结合最低点扫描和Hull MA的信号,只在最低点扫描器给出最低点信号时,才发出Hull MA的交易信号,形成入场策略。

这样,通过识别市场最低点再追踪趋势,可以有效避开错误的入场时机,提高交易系统的胜率。

## 优势分析

低点扫描智能追踪法的优势主要有:

1. 使用低点扫描器,可以准确识别市场最低点,避免在高点买入造成打击。

2. Hull MA是一种优良的趋势跟踪指标,可以顺势而为,捕捉较大行情。

3. 结合低点扫描和Hull MA互为验证,可以过滤掉大量噪音,减少虚假信号。

4. 采用渐进止损出场机制,可以最大限度锁定利润,避免回吐。

5. 该策略非反演指标驱动,不会操纵历史数据,真实可靠。

## 风险分析

该策略主要存在以下风险:

1. 最低点扫描器可能会漏掉部分最低点,导致错过交易机会。可以适当调整参数,扩大扫描范围。

2. 行情可能出现剧烈反转,造成止损被击出。可以适当放宽止损范围,合理控制仓位规模。 

3. 参数设置不当可能导致产生过多或过少交易信号。应多次反复优化,找到最佳参数组合。

4. 该策略仅适用于趋势明显的Forex品种,不适合用于盘整、震荡市场的交易。

## 优化方向

该策略可以从以下方面进行优化:

1. 优化低点扫描器的参数,使其可以更准确地识别最低点。

2. 优化Hull MA的参数,使其可以更精确地跟踪趋势。

3. 增加其他指标过滤,如MACD、KDJ等,提高信号的可靠性。 

4. 增加机器学习模型预测结果,辅助交易信号判断。

5. 优化止损机制,使其可以根据市场波动程度动态调整。

6. 优化仓位管理策略,让系统可以根据资金管理规则动态调整仓位。

## 总结

低点扫描智能追踪法是一种高胜率的非反演Forex交易策略。它能够准确识别市场最低点,在趋势明确时顺势入场,并采用渐进止损锁定利润。该策略优化空间较大,可以从多方面进行改进,使其成为一个强大的自动交易系统。

||

## Overview

The Low Scanner Smart Tracking Method is a non-repainting Forex trading strategy. It uses a low scanner to locate low points and combines with Hull Moving Average for trade signal judgment, which can achieve a high winning rate.

## Principle Analysis

Firstly, the strategy uses a low scanner to locate low points. The low scanner calculates the RSI values of price and volume, and compares them with the WMA curve to determine low points when RSI is lower than WMA. 

Secondly, the strategy uses Hull Moving Average for trade signal judgment. It calculates two Hull MAs with different periods, and goes long when the shorter period Hull MA crosses over the longer period one, and goes short when it crosses under.

Finally, the strategy combines the low point scan signals and Hull MA signals, and only triggers Hull MA signals when the low scanner gives out low point signals, forming the entry strategy.

In this way, by identifying market low points first and then tracking the trend, it can effectively avoid wrong entry timing and improve the winning rate of the trading system.

## Advantage Analysis  

The main advantages of the Low Scanner Smart Tracking Method are:

1. Using the low scanner, it can accurately identify market low points and avoid buying at high points.

2. Hull MA is an excellent trend tracking indicator that can capture larger trends.

3. Combining low scanner and Hull MA verifies each other and filters out lots of noise and false signals.

4. Adopting a progressive stop loss exit mechanism can maximize profits and avoid pullbacks. 

5. The strategy uses indicator driven logic and does not manipulate historical data, which is reliable.

## Risk Analysis

The main risks of this strategy are:

1. The low scanner may miss some low points and lose trading opportunities. Parameters can be adjusted to expand the scanning range.

2. Markets may reverse sharply, causing stop loss to be hit. Stop loss range can be relaxed reasonably and control position sizing.

3. Improper parameter settings may generate too many or too few trading signals. Parameters should be repeatedly optimized to find the best combination. 

4. This strategy only applies to Forex pairs with obvious trends, not suitable for range-bound or oscillating markets.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize the parameters of the low scanner to identify low points more accurately.

2. Optimize the parameters of Hull MA to track trends more precisely. 

3. Add other indicator filters like MACD, KDJ to improve signal reliability.

4. Add machine learning model predictions to assist trade signal judgment.

5. Optimize the stop loss mechanism to adjust dynamically based on market volatility. 

6. Optimize the position sizing strategy to adjust position size dynamically based on money management rules.

## Conclusion

The Low Scanner Smart Tracking Method is a high winning rate non-repainting Forex trading strategy. It can accurately identify market low points and enter the trend when the trend is clear, locking in profits with progressive stop loss. The strategy has large room for optimization and can be improved in many ways to become a powerful automated trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Strategy Direction: long|short|all|
|v_input_2|1440|min|
|v_input_3|W|tf3|
|v_input_4|60|min1|
|v_input_5|0|Timeframe: W|5|15|30|60|120|240|360|720|D|1|
|v_input_6|24|Period|
|v_input_7|true|Shift|
|v_input_8|25|len|
|v_input_9|2016|BACKTEST START YEAR|
|v_input_10|6|BACKTEST START MONTH|
|v_input_11|true|BACKTEST START DAY|
|v_input_12|2222|BACKTEST STOP YEAR|
|v_input_13|12|BACKTEST STOP MONTH|
|v_input_14|31|BACKTEST STOP DAY|
|v_input_15|25| stop loss|
|v_input_16|25| qty_percent1|
|v_input_17|25| qty_percent2|
|v_input_18|25| qty_percent3|
|v_input_19|0.5| Take profit1|
|v_input_20|true| Take profit2|
|v_input_21|1.5| Take profit3|
|v_input_22|2| Take profit4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-10-25 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © theCrypster 2020

//@version=4
// strategy(title = "Low Scanner Forex strategy", overlay = false, pyramiding=1,initial_capital = 1000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0)
strat_dir_input = input(title="Strategy Direction", defval="long", options=["long", "short", "all"])
strat_dir_value = strat_dir_input == "long" ? strategy.direction.long : strat_dir_input == "short" ? strategy.direction.short : strategy.direction.all
strategy.risk.allow_entry_in(strat_dir_value)
leng=1
p1=close[1]
min=input(1440)
len55 = timeframe.isintraday and timeframe.multiplier >= 1 ? 
   min / timeframe.multiplier * 7 : 
   timeframe.isintraday and timeframe.multiplier < 60 ? 
   60 / timeframe.multiplier * 24 * 7 : 7
//taken from https://www.tradingview.com/script/Ql1FjjfX-security-free-MTF-example-JD/
tf3 = input("W", type=input.resolution)
ti = change( time(tf3) ) != 0
T_c = fixnan( ti ? close : na )

vrsi = rsi(cum(change(T_c) * volume), leng)
pp=wma(vrsi,len55)

d=(vrsi[1]-pp[1])
min1 =input(60)
len100 = timeframe.isintraday and timeframe.multiplier >= 1 ? 
   min1 / timeframe.multiplier * 7 : 
   timeframe.isintraday and timeframe.multiplier < 60 ? 
   60 / timeframe.multiplier * 24 * 7 : 7
x=ema(d,len100)
//
zx=x/-1
col=zx > 0? color.lime : color.orange
plot(zx,color=col,linewidth=1)
//

tf10 = input("W", title = "Timeframe", type = input.resolution, options = ["1", "5", "15", "30", "60","120", "240","360","720", "D", "W"])

length = input(24, title = "Period", type = input.integer)
shift = input(1, title = "Shift", type = input.integer)

hma(_src, _length)=>
    wma((2 * wma(_src, _length / 2)) - wma(_src, _length), round(sqrt(_length)))
    
hma3(_src, _length)=>
    p = length/2
    wma(wma(close,p/3)*3 - wma(close,p/2) - wma(close,p),p)


a = security(syminfo.tickerid, tf10, hma(close, length))
b =security(syminfo.tickerid, tf10, hma3(close[1], length)[shift])
//plot(a,color=color.gray)
//plot(b,color=color.yellow)
close_price = close[0]
len = input(25)

linear_reg = linreg(close_price, len, 0)


//plot(linear_reg, color=color.blue, title="LR", linewidth=3)

buy=crossover(linear_reg, b) 
sell=crossunder(linear_reg, b) 
//
// Time period input
testStartYear = input(2016, "BACKTEST START YEAR", minval = 1980, maxval = 2222) 
testStartMonth = input(06, "BACKTEST START MONTH", minval = 1, maxval = 12)
testStartDay = input(01, "BACKTEST START DAY", minval = 1, maxval = 31)
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)
testStopYear = input(2222, "BACKTEST STOP YEAR", minval=1980, maxval = 2222)
testStopMonth = input(12, "BACKTEST STOP MONTH", minval=1, maxval=12)
testStopDay = input(31, "BACKTEST STOP DAY", minval=1, maxval=31)
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)
testPeriod = time >= testPeriodStart and time <= testPeriodStop ? true : false
l = crossover(zx,0) or buy
        
if l and testPeriod
    strategy.entry("buy", strategy.long)

per(pcnt) =>
    strategy.position_size != 0 ? round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
stoploss=input(title=" stop loss", defval=25, minval=0.01)
los = per(stoploss)
q1=input(title=" qty_percent1", defval=25, minval=1)
q2=input(title=" qty_percent2", defval=25, minval=1)
q3=input(title=" qty_percent3", defval=25, minval=1)
tp1=input(title=" Take profit1", defval=0.5, minval=0.01)
tp2=input(title=" Take profit2", defval=1, minval=0.01)
tp3=input(title=" Take profit3", defval=1.5, minval=0.01)
tp4=input(title=" Take profit4", defval=2, minval=0.01)
strategy.exit("x1", qty_percent = q1, profit = per(tp1), loss = los)
strategy.exit("x2", qty_percent = q2, profit = per(tp2), loss = los)
strategy.exit("x3", qty_percent = q3, profit = per(tp3), loss = los)
strategy.exit("x4", profit = per(tp4), loss = los)

```

> Detail

https://www.fmz.com/strategy/430758

> Last Modified

2023-11-01 16:12:00
