
> Name

基于枢轴点和最小二乘移动平均线的多空平衡策略Pivot-Reversal-Upgraded-Long-Only-A-Dual-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9a2903b2d1bb5b5a49.png)
[trans]

### 概述

这是一个只做多头的量化交易策略,它结合了枢轴点反转策略和最小二乘移动平均线策略的优点。该策略在牛市中跟随主要趋势进入场内,在观察到枢轴点上轨形成之后判断反转信号做多;同时,它要求收盘价高于最小二乘移动平均线才会开仓做多,使策略更加稳定。

### 策略原理

该策略融合了枢轴点反转策略和最小二乘移动平均线策略。枢轴点反转策略会计算过去一定交易日的最高价和最低价,得到上轨和下轨。当价格突破上轨时,判断为反转信号。最小二乘移动平均线是一种趋势判断指标,它能更好地逼近价格。该策略在枢轴点上轨形成时,如果收盘价高于最小二径线,就做多。

具体来说,该策略首先计算过去3根K线的最高价和过去16根K线的最低价,得到枢轴点上轨和下轨。在上轨形成时,开仓做多;当下一次下轨形成时,平仓。同时,它要求收盘价高于20日的最小二乘移动平均才会开仓。

### 策略优势

1. 结合两种策略的优势,使交易决策更稳定可靠

2. 枢轴点策略能判断反转点,最小二乘移动平均线过滤假突破,减少交易风险

3. 只做多头,符合大部分人的心理预期

4. 策略简单清晰,容易理解与优化

5. 交易频次适中,适合中长线操作

### 风险分析

1. 无法抓住快速下跌行情的机会

2. 存在一定的延迟,可能错过部分上涨机会

3. 牛熊转换时,会产生较大亏损

解决方法:

1. 适当缩短计算周期,减少延迟

2. 调整移动平均线参数,优化参与度

3. 增加止损策略,降低单笔损失

### 优化方向

1. 加入多种趋势指标组合,提高判断准确性

2. 增加机器学习模型预测结果,指导决策

3. 结合波动率指标,控制仓位规模

4. 优化参数,提高策略胜率

5. 测试更长时间周期数据,验证稳定性

### 总结

本策略整合枢轴点反转策略和最小二乘移动平均线策略的优势,在判断趋势反转的同时控制风险,属于稳健型策略。它结构简单,易于理解和测试,非常适合量化交易初学者学习和实践。但该策略只做多,无法利用下跌行情获利,这是其主要局限。通过引入更多指标和机器学习等方法进行优化,可以进一步增强该策略的稳定性和跟踪能力,从而获得更好的绩效。

||

### Overview  

This is a long-only quantitative trading strategy that combines the advantages of the pivot point reversal and least square moving average strategies. It follows the major trend during a bull market and determines reversal signals after observing the pivot point upper rail to go long. At the same time, it requires the closing price to be above the Least Squares Moving Average before opening long positions to make the strategy more stable.

### Strategy Logic  

The strategy integrates pivot point reversal and least square moving average strategies. The pivot point reversal strategy calculates the highest and lowest prices over a certain number of trading days to obtain the upper and lower rails. When prices break through the upper rail, it is judged as a reversal signal. The Least Squares Moving Average is a trend-judging indicator that can better approximate prices. This strategy goes long when the pivot point upper rail is formed and the closing price is higher than the least square line.  

Specifically, the strategy first calculates the highest price of the last 3 bars and the lowest price of the last 16 bars to obtain the upper and lower pivot point rails. It goes long when the upper rail is formed. When the next lower rail is formed, it closes positions. At the same time, it requires the closing price to be higher than the 20-day Least Squares Moving Average before opening long positions.

### Advantages  

1. Combines the strengths of two strategies for more stable and reliable trading decisions  

2. Pivot point strategy judges reversal points, while LSMA filters false breakouts, reducing trading risks   

3. Only goes long, in line with most people's psychological expectations  
   
4. Simple and clear strategy logic, easy to understand and optimize
   
5. Moderate trading frequency, suitable for medium-to-long-term operations

### Risk Analysis 

1. Unable to capture opportunities in rapid decline  

2. Certain lag exists, may miss some upward opportunities  

3. Larger losses when the market trend reverses  

Solutions:  

1. Appropriately shorten the calculation cycle to reduce lag  

2. Adjust MA parameters to optimize participation  

3. Add stop loss to reduce single loss

### Optimization Directions  

1. Add multiple trend indicators to improve accuracy  

2. Incorporate machine learning prediction to guide decisions
  
3. Combine volatility indicators to control position sizing   

4. Optimize parameters to improve win rate  

5. Test longer time frame data to verify stability  

### Summary  

This strategy integrates the strengths of pivot point reversal and LSMA strategies to control risks while judging trend reversals. With simple structure for easy understanding and testing, it is perfect for beginner quants to learn and practice. But its long side only approach prevents profiting from market declines, a major limitation. Further improvements in stability and tracking ability could be achieved by introducing more indicators and machine learning optimization for better performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2010|From Year|
|v_input_4|31|To Day|
|v_input_5|12|To Month|
|v_input_6|2031|To Year|
|v_input_7|20|Length MA|
|v_input_8_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|3|leftBars|
|v_input_10|16|rightBars|
|v_input_11|true|multiplier|
|v_input_12|100|risk|
|v_input_13|true|leverage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-18 00:00:00
end: 2023-12-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//@author exlux99

strategy(title = "Pivot Reversal Upgraded long only", overlay = true,  pyramiding=1,initial_capital = 100, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.1)
/////////////
//time

fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2010, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2031, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true
//

length = input(title="Length MA", type=input.integer, defval=20)
offset = 0//input(title="Offset", type=input.integer, defval=0)
src = input(close, title="Source")
lsma = linreg(src, length, offset)

//LSMA
leftBars = input(3)
rightBars = input(16)
swh = pivothigh(leftBars, rightBars)
swl = pivotlow(leftBars, rightBars)
swh_cond = not na(swh)
hprice = 0.0
hprice := swh_cond ? swh : hprice[1]
le = false
le := swh_cond and time_cond? true : (le[1] and high > hprice ? false : le[1])
//leverage
multiplier=input(1.0, step=0.5)
g(v, p) => round(v * (pow(10, p))) / pow(10, p)
risk     = input(100)
leverage = input(1.0, step = 0.5)
c = g((strategy.equity * leverage / open) * (risk / 100), 4)

//entry
strategy.entry("long", strategy.long,c, when=le and close > lsma, comment="long", stop=(hprice + syminfo.mintick) * multiplier)

    
swl_cond = not na(swl)
lprice = 0.0
lprice := swl_cond ? swl : lprice[1]
se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])
strategy.close("long", when=se)



```

> Detail

https://www.fmz.com/strategy/436545

> Last Modified

2023-12-25 17:47:11
