
> Name

基于波动趋势追踪策略Volatility-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c5820774c1f3cee91b.png)
[trans]
## 概述
该策略通过WaveTrend指标判断价格趋势和超买超卖情况,结合RSI指标过滤信号,采用趋势追踪方式,在超买超卖位做反向操作。

## 策略原理
该策略使用WaveTrend指标判断价格趋势方向。WaveTrend指标基于Rainbow指标改进而来,通过计算Heikin-Ashi均线和价格绝对值之间的差值,来判断价格趋势方向。结合RSI指标判断超买超卖情况发出交易信号。

具体来说,策略中的WaveTrend公式为:
```
esa = ema(hlc3, 10) 
d = ema(abs(hlc3 - esa), 10)
ci = (hlc3 - esa) / (0.015 * d)
wt = ema(ci, 21)
```
其中,esa是计算的Heikin-Ashi均线,d是Heikin-Ashi均线和价格绝对值之差的均值。ci就是所谓的适应性区间,反映价格波动力度。wt是ci的均线,判断价格趋势方向,多为空头的关键指标。

RSI指标用于判断超买超卖,代码中RSI的计算公式为:
```
rsiup = rma(max(change(close), 0), 14) 
rsidown = rma(-min(change(close), 0), 14) 
rsi = rsidown == 0 ? 100 : rsiup == 0 ? 0 : 100 - (100 / (1 + rsiup / rsidown))
```
其标准值为0-100,高于70为超买区,低于30为超卖区。

结合这两个指标,当RSI低于25,WaveTrend低于-60时为超卖区,做多信号;当RSI高于75,WaveTrend高于60时为超买区,做空信号。

## 优势分析
该策略具有以下优势:

1. 使用WaveTrend指标判断价格趋势方向准确可靠。
2. RSI指标过滤能避免不必要的交易,提高胜率。 
3. 采用趋势追踪方式,可以最大化捕捉价格趋势所带来的利润。
4. 策略思路清晰易懂,参数设置灵活,可根据不同品种和市场调整。
5. 策略实现简单,容易实盘验证,利于框架优化。

## 风险分析
该策略也存在一些风险:

1. WaveTrend和RSI指标都存在一定滞后,可能错过价格反转点。
2. 虽有过滤条件,但仍可能在震荡行情中产生错误信号。
3. 追踪止损策略有待完善,无法有效控制单笔损失。
4. 参数设置合理与品种特性和交易频率匹配非常关键。

对策:
1. 结合额外判断指标进行优化,提高信号准确率。 
2. 加入止损策略,控制单笔损失。
3. 寻找最佳参数组合,调整策略适应市场品种。

## 优化方向  
该策略可从以下几个方向进行优化:

1. 更换judgment指标或增加judgment指标,优化信号的准确率。例如加入MACD,KD等判断指标。

2. 优化参数设置,适应不同交易品种。例如调整平滑周期,寻找最佳参数组合。

3. 加入追踪止损策略,有效控制单笔损失。例如余额百分比止损,移动止损等。

4. 考虑不同加仓策略。例如使用马丁格尔加仓替代原有的固定数量加仓。

5. 优化适应性区间参数,寻找最佳参数提高判断准确性。

## 总结
该策略整体思路清晰,使用波动力度指标判断价格趋势,并有效过滤噪音交易信号。策略优化空间较大,可从多个角度进行改进,使策略更稳定可靠。通过参数调整优化,可适应不同交易品种,值得进一步测试实盘验证。

||

## Overview
This strategy uses the WaveTrend indicator to determine price trends and overbought/oversold situations. It combines the RSI indicator to filter signals and adopts a trend tracking method to make counter-trend operations at overbought/oversold levels.

## Strategy Logic  
The strategy uses the WaveTrend indicator to determine the price trend direction. The WaveTrend indicator is improved based on the Rainbow indicator. It judges the price trend direction by calculating the difference between the Heikin-Ashi moving average and the absolute value of the price. It generates trading signals by combining the RSI indicator to determine overbought/oversold situations.

Specifically, the WaveTrend formula in the strategy is:
```
esa = ema(hlc3, 10)
d = ema(abs(hlc3 - esa), 10) 
ci = (hlc3 - esa) / (0.015 * d)
wt = ema(ci, 21)
```
Where esa is the calculated Heikin-Ashi moving average, d is the mean of the difference between the Heikin-Ashi moving average and the absolute value of the price. ci is the so-called adaptive range, reflecting the volatility of prices. wt is the moving average of ci, which determines the price trend direction and is the key indicator for long and short.

The RSI indicator is used to determine overbought/oversold situations. The RSI calculation formula in the code is:
``` 
rsiup = rma(max(change(close), 0), 14)
rsidown = rma(-min(change(close), 0), 14)
rsi = rsidown == 0 ? 100 : rsiup == 0 ? 0 : 100 - (100 / (1 + rsiup / rsidown)) 
```
Its standard value is 0-100. Above 70 is overbought and below 30 is oversold.

Combined with these two indicators, when RSI is below 25 and WaveTrend is below -60, it is oversold to go long. When RSI is above 75 and WaveTrend is above 60, it is overbought to go short.

## Advantage Analysis
The advantages of this strategy include:

1. WaveTrend indicator can accurately and reliably determine the price trend direction.
2. RSI filters can avoid unnecessary trades and improve win rate.
3. Trend tracking method can maximize profits from catching price trends.  
4. The strategy idea is simple and clear, parameters are flexible to adjust for different products and markets.
5. Easy to implement and test in live trading, good for further optimization.

## Risk Analysis
There are also some risks:  

1. Both WaveTrend and RSI have some lag, may miss price reversal points. 
2. False signals may still occur in sideways markets despite filters.
3. Lack of effective stop loss method to control single loss.
4. Reasonable parameter tuning needs to match characteristics and trading frequency.

Solutions:
1. Add indicators for combinational optimizations to improve signal accuracy.
2. Add stop loss strategies to control single loss. 
3. Find optimal parameter combinations to adapt the strategy.

## Optimization Directions
The strategy can be optimized in the following directions:

1. Change or add judgment indicators to improve signal accuracy, e.g. MACD, KD etc.

2. Optimize parameter settings to adapt different products, e.g. adjust smooth periods. 

3. Add tracking stop loss strategies to control single loss, e.g. percentage stop loss, trailing stop loss etc.

4. Consider different pyramiding strategies, e.g. Martingale instead of fixed quantity.

5. Optimize adaptive range parameters to improve judgment accuracy.  

## Conclusion  
The overall idea of the strategy is clear, using volatility indicators to determine price trends and filter noise effectively. There is room for optimization in multiple aspects to make the strategy more robust. Through parameter tuning, it can be adapted to different products and is worth further live testing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|Use Martingale|
|v_input_4|100|Capital, %|
|v_input_5|true|Show Arrows|
|v_input_6|2018|From Year|
|v_input_7|2100|To Year|
|v_input_8|true|From Month|
|v_input_9|12|To Month|
|v_input_10|true|From day|
|v_input_11|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's WaveTrender Strategy v1.0", shorttitle = "WaveTrender str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 10)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usemar = input(false, defval = false, title = "Use Martingale")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
showarr = input(true, defval = true, title = "Show Arrows")
fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//RSI
rsiup = rma(max(change(close), 0), 14)
rsidown = rma(-min(change(close), 0), 14)
rsi = rsidown == 0 ? 100 : rsiup == 0 ? 0 : 100 - (100 / (1 + rsiup / rsidown))

//WaveTrend
esa = ema(hlc3, 10)
d = ema(abs(hlc3 - esa), 10)
ci = (hlc3 - esa) / (0.015 * d)
wt = ema(ci, 21)

//Body
body = abs(close - open)
abody = sma(body, 10)

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
overs = rsi < 25 and wt < -60
overb = rsi > 75 and wt > 60
up1 = (strategy.position_size == 0 or close < strategy.position_avg_price) and overs and bar == -1
dn1 = (strategy.position_size == 0 or close > strategy.position_avg_price) and overb and bar == 1
exit = (strategy.position_size > 0 and overs == false) or (strategy.position_size < 0 and overb == false)

//Arrows
col = exit ? black : up1 or dn1 ? blue : na
needup = up1
needdn = dn1
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

if up1
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot)

if dn1
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot)
    
if exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/441960

> Last Modified

2024-02-18 10:07:29
