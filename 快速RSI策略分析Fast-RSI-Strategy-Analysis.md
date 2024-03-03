
> Name

快速RSI策略分析Fast-RSI-Strategy-Analysis

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f1ba19e9a5000be40f.png)

[trans]

## 策略名称
极速双向RSI趋势策略

## 概述
该策略是一个利用RSI指标判断价格趋势的快速策略。它同时具有做多和做空能力,可以捕捉较快的短线价位。

## 策略原理
该策略使用改进的RSI指标判断价格的超买超卖状态,配合K线实体过滤噪音。当RSI处于超买或超卖区域,并且K线实体体积大于平均体积的1/3时,做多或做空。交易信号触发后等待K线反转以及RSI回调到安全区域时平仓。

## 优势分析
该策略响应迅速,可以捕捉较快的短线趋势;同时实体过滤有助于去噪,避免被假突破误导。该策略适用于高波动率品种,能够获得较高收益。

## 风险分析
该策略对价格变化响应比较敏感,容易被市场中的假信号误导;此外,高波动率市场中止损可能会较频繁触发。可以适当放宽止损幅度,优化RSI参数以降低误信号概率。

## 优化方向  
可以测试不同周期指标参数来优化策略,寻找最佳参数组合。此外还可以考虑加入海龟交易法则等其它指标来辅助过滤信号。结合机器学习方法训练出更好的RSI阈值可能也是一个不错的尝试。

## 总结
该策略整体来说是一个高效灵敏的短线策略。通过一些参数和模型优化,有望进一步增强稳定性和盈利能力。该策略值得量化交易者继续研究和跟踪。

||


## Strategy Name
Extreme Dual-Directional RSI Trend Strategy

## Overview
This strategy utilizes the RSI indicator to determine price trends quickly. It has both long and short capabilities to capture faster short-term price levels.  

## Strategy Principle  
The strategy uses an improved RSI indicator to judge the overbought and oversold status of prices, combined with candle body filtering to reduce noise. It goes long or short when the RSI is in the overbought or oversold zone and the candle body size is greater than 1/3 of the average body size. It closes positions when the candle reverses direction and the RSI pulls back to safer levels after the trading signals trigger.

## Advantage Analysis
The strategy responds swiftly and can capture faster short-term trends. Meanwhile, the body filtering helps reduce noise and avoid being misled by false breakouts. It suits high volatility products well and can achieve higher returns.

## Risk Analysis
The strategy is quite sensitive to price changes, easily misguided by false signals in the market. Also, stop losses may trigger frequently in the high volatility market. We can loosen the stop loss range and optimize RSI parameters to lower the false signal probability.

## Optimization Directions
We can test different periodic parameters of the indicators to optimize the strategy and find the best parameter combination. Also, incorporating other indicators like the Turtle Trading rules may aid further in filtering signals. Training better RSI thresholds via machine learning methods could also be a worthwhile attempt.

## Summary  
Overall, this is an efficient and responsive short-term strategy. With some parameter and model optimization, it has the potential to further enhance stability and profitability. It merits continued research and tracking by quant traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|7|RSI Period|
|v_input_4|30|RSI limit|
|v_input_5_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|2018|From Year|
|v_input_7|2100|To Year|
|v_input_8|true|From Month|
|v_input_9|12|To Month|
|v_input_10|true|From day|
|v_input_11|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-03 00:00:00
end: 2023-12-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title = "Noro's Fast RSI Strategy v1.1", shorttitle = "Fast RSI str 1.1", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 5)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
rsiperiod = input(7, defval = 7, minval = 2, maxval = 50, title = "RSI Period")
limit = input(30, defval = 30, minval = 1, maxval = 100, title = "RSI limit")
rsisrc = input(close, defval = close, title = "RSI Source")
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

//Body
body = abs(close - open)
emabody = ema(body, 30) / 3

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
up = bar == -1 and fastrsi < dnlimit and body > emabody
dn = bar == 1 and fastrsi > uplimit and body > emabody
exit = ((strategy.position_size > 0 and fastrsi > dnlimit) or (strategy.position_size < 0 and fastrsi < uplimit)) and body > emabody

//Trading
if up
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))

if dn
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))
    
if time > timestamp(toyear, tomonth, today, 00, 00) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/434178

> Last Modified

2023-12-04 14:40:02
