
> Name

基于价格通道的突破策略Price-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9744409e3e86e3332b.png)
 [trans]

## 概述

该策略命名为“基于价格通道的突破策略”,其主要思想是利用价格通道来判断市场趋势和方向,在价格突破通道时建立头寸。它会首先画出价格的通道范围,然后判断K线是否出现连续两根红色或绿色K线,如果最后一根K线突破通道半幅以上并收盘于通道之外,则产生买入或卖出信号。

## 策略原理  

该策略通过 highest() 和 lowest() 函数计算过去一定周期内的最高价和最低价,以此确定价格通道的上下轨。通道的中线被定义为上下轨的平均值。然后计算K线实体的大小,并通过SMA平滑,判断最后一个K线的实体是否大于平均实体的一半。另外还判断最后两根K线是否同向(连续两根红或两根绿)。在这些条件满足时,即产生买入/卖出信号,并在价格回落到通道方向时平仓。

## 优势分析

这是一个利用价格通道判断趋势的突破策略。它有以下几点优势:

1. 利用价格通道判断整体趋势方向,可以有效过滤市场噪音。

2. 连续两根K线同向突破通道,说明动量较强,突破成功率较高。  

3. 判断K线实体超过平均实体一半,可以避免被假突破欺骗。

4. 策略逻辑简单易懂,容易实施。

5. 可自定义参数如通道周期、交易品种、交易时间等,适应性强。

## 风险分析  

该策略也存在一些潜在风险:  

1. 突破失败的概率仍存在,可能造成损失。

2. 行情剧烈波动时,通道判断可能失效。

3. 缺乏止损机制,无法有效控制损失。

4. 简单的交易规则,存在过拟合风险。

5. 无法适应更加复杂的市场环境。

对应解决方法如下:

1. 优化参数,提高突破成功率。  

2. 加入波动率指标,避开震荡行情。

3. 增加移动止损设置。 

4. 进行复杂度测试,检查过拟合。

5. 增加机器学习算法,提高策略的适应性。

## 优化方向  

该策略的优化方向主要有:

1. 增加止损机制,更好地控制风险。可以设置价格回落止损,也可以利用ATR等指标设置移动止损。

2. 优化参数,如通道周期、突破幅度参数等。可以通过遗传算法、网格搜索等方法寻找最优参数。

3. 增加过滤条件,提高突破的确定性。例如可以结合交易量来确认突破。

4. 添加机器学习模型,利用更多数据提高策略的预测能力和适应性。例如LSTM等深度学习可以捕捉更复杂的行情模式。

5. 进行组合优化,将不同类型的突破策略组合起来,实现正交化,减少相似度。

## 总结  

该策略整体来说是一个基于价格通道判断趋势,发现突破信号的量化策略。它有判断趋势、确认突破的优点,但也存在一定的假突破风险。我们可以通过参数优化、止损设置、增加条件过滤等方法来改进策略,降低风险。同时加入机器学习模型也可以进一步增强策略的预测能力。总的来说,这是一个有潜力的量化策略思路,值得我们深入研究与改进。

||

This strategy is named "Price Channel Breakout Strategy". Its main idea is to use price channel to determine market trend and direction and establish positions when price breaks out of the channel. It will first draw the price channel range, then judge if there are two consecutive red or green K-lines. If the last K-line breaks through half of the channel width and closes outside the channel, it will generate buy or sell signals.

## Strategy Logic

The strategy calculates the highest high and lowest low over a certain period in the past using highest() and lowest() functions to determine the upper and lower rails of the price channel. The midpoint of the channel is defined as the average of the upper and lower rails. It then calculates the K-line body size and smoothes it using SMA to determine if the last K-line body is larger than half of the average body. It also judges if the last two K-lines are in the same direction (two consecutive red or green). When these conditions are met, it generates buy/sell signals and closes positions when price falls back into the channel direction.

## Advantage Analysis 

This is a breakout strategy that uses price channel to judge the overall trend. It has the following advantages:

1. Using price channel to determine the overall trend direction can effectively filter market noise.

2. Consecutive two K-lines breaking through the channel in the same direction indicates stronger momentum and higher success rate of breakout.   

3. Judging K-line body larger than half of average body can avoid being misled by false breakout.

4. The strategy logic is simple and easy to implement.

5. Customizable parameters such as channel period, trading products, trading hours etc. make it highly adaptable.

## Risk Analysis

The strategy also has some potential risks:

1. There is still probability of failed breakout, which may lead to losses. 

2. Price channel may fail when market fluctuates violently.

3. Lack of stop loss mechanism fails to effectively control losses.

4. Simple trading rules have overfitting risks.  

5. Unable to adapt to more complex market environments.

The corresponding solutions are:

1. Optimize parameters to improve success rate of breakout.

2. Add volatility index to avoid choppy market.  

3. Add mobile stop loss.

4. Conduct complexity test to check overfitting.  

5. Increase machine learning models to improve adaptability.

## Optimization Directions   

The main optimization directions are:  

1. Add stop loss mechanism to better control risks. Set price retracement stop loss or mobile stop loss based on ATR.

2. Optimize parameters like channel period, breakout threshold etc. Find optimal parameters through genetic algorithm, grid search etc.

3. Add filtering conditions to improve certainty of breakout. For example, combine trading volume to confirm breakout.  

4. Add machine learning models like LSTM to improve prediction capability and adaptability by utilizing more data.

5. Conduct portfolio optimization, combine different types of breakout strategies to achieve orthogonality and reduce similarities.

## Conclusion   

In conclusion, this is a quantitative strategy based on price channel to determine trend and discover breakout signals. It has the advantage of judging trend and confirming breakout, but also has certain risks of false breakout. We can improve the strategy by parameter optimization, stop loss, adding filters etc. to reduce risks. Meanwhile, introducing machine learning models can further enhance the predictive capability. Overall, this is a promising quantitative strategy approach worth researching and improving.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|30|Price Channel|
|v_input_4|true|Show center-line|
|v_input_5|1900|From Year|
|v_input_6|2100|To Year|
|v_input_7|true|From Month|
|v_input_8|12|To Month|
|v_input_9|true|From day|
|v_input_10|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-16 00:00:00
end: 2024-01-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Price Channel Strategy v1.0", shorttitle = "Price Channel str 1.0", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
pch = input(30, defval = 30, minval = 2, maxval = 200, title = "Price Channel")
showcl = input(true, defval = true, title = "Show center-line")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")
src = close

//Price channel
lasthigh = highest(src, pch)
lastlow = lowest(src, pch)
center = (lasthigh + lastlow) / 2
col = showcl ? blue : na
plot(center, color = col, linewidth = 2)

//Bars
bar = close > open ? 1 : close < open ? -1 : 0
rbars = sma(bar, 2) == -1
gbars = sma(bar, 2) == 1

//Signals
body = abs(close - open)
abody = sma(body, 10)
up = rbars and close > center and body > abody / 2
dn = gbars and close < center and body > abody / 2
exit = ((strategy.position_size > 0 and close > open) or (strategy.position_size < 0 and close < open)) and body > abody / 2

//Trading
if up
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)

if dn
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
    
if exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/438933

> Last Modified

2024-01-16 14:22:57
