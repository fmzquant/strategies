
> Name

基于移动均线的突破交易策略Moving-Average-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/181fc3206aa0567c75d.png)
[trans]

## 概述

这是一个基于移动均线的突破交易策略。它通过计算一定周期的平均价格作为均线,当价格突破均线时产生交易信号。

## 策略原理

该策略主要基于移动均线指标。它使用sma函数计算一定周期内的平均收盘价,得到移动均线。当最新收盘价从下向上突破移动均线时,产生买入信号;当最新收闭从上向下突破移动均线时,产生卖出信号。

具体来说,它在策略中定义了移动平均线的计算源(近期收盘价)和周期长度,得到移动均线数据序列。然后它设置了两个条件:价格上穿均线时创建买入订单;价格下穿均线时创建卖出订单。订单创建后,它还设置了止盈止损:当订单获利达到设定比例时平仓一部分头寸,当订单达到设定止盈或止损价格时平掉全部头寸。

## 优势分析

这是一个简单实用的趋势跟踪策略。它有以下优势:

1. 思路清晰,易于理解和调整参数。
2. 移动均线是一种常用且可靠的技术指标,可过滤市场噪音,识别趋势。
3. 同时设置止盈止损,可以锁定部分利润,控制风险。
4. 只需要简单参数即可运行,适用于量化入门。

## 风险分析

尽管该策略有很多优点,但也存在一些风险:

1. 移动均线容易产生滞后,可能错过短期行情反转。
2. 没有考虑大盘环境,容易被套牢。
3. 没有进行参数优化,参数设定不当会影响策略表现。
4. 没有结合其他指标进行过滤,存在一定的误报率。

为了控制这些风险,我们可以结合其他指标进行过滤优化,引入大盘短期趋势判断,或者使用机器学习方法寻找最佳参数组合。

## 优化方向  

该策略主要可以从以下几个方面进行优化:

1. 增加其他技术指标判断,组成交易系统,提高策略胜率。比如加入MACD,KD等辅助判断指标。

2. 加入止损机制。使用跟踪止损或时间止损来锁定利润,避免亏损扩大。

3. 进行参数优化。改变移动均线的周期参数,找到最佳参数组合。还可以测试不同类型的移动均线。

4. 增加机器学习判断。使用随机森林、LSTM等算法结合多个因子判断趋势方向。

5. 优化进入退出逻辑。设置趋势过滤条件,避免趋势结束时反向操作。考虑使用分批平仓逻辑。

## 总结

这个移动均线突破策略总体来说非常适合作为量化交易的入门策略。它思路简单,易于理解和操作,有一定的实战效果。同时也为后续测试和优化留有很大空间。我们可以在此基础上,引入更多技术指标和模型,开发出效果更好的量化策略。

|| 

## Overview

This is a breakout trading strategy based on moving averages. It calculates the average price over a certain period as the moving average. When the price breaks through the moving average, trading signals are generated. 

## Strategy Logic

The strategy is mainly based on the moving average indicator. It uses the sma function to calculate the average closing price over a period to get the moving average. When the latest closing price breaks through the moving average upwards, a buy signal is generated. When the latest closing price breaks through the moving average downwards, a sell signal is generated.

Specifically, it defines the source (recent closing price) and length of the moving average in the strategy to get the moving average data sequence. Then it sets two conditions: create a long order when the price crosses above the moving average; create a short order when the price crosses below the moving average. After creating the orders, it also sets up profit taking and stop loss: it closes out part of the position when the order reaches a set profit ratio, and closes out the whole position when the order reaches the preset take profit or stop loss price.

## Advantage Analysis 

This is a simple and practical trend following strategy. It has the following advantages:

1. The logic is clear and easy to understand and adjust parameters.
2. The moving average is a commonly used and reliable technical indicator that can filter market noise and identify trends.  
3. Setting profit taking and stop loss at the same time can lock in some profits and control risks.
4. It can run with simple parameters only, suitable for quant entry level.

## Risk Analysis

Although the strategy has many advantages, there are still some risks:  

1. Moving averages tend to lag and may miss short-term reversals.
2. It does not consider the overall market environment and is prone to being trapped.
3. No parameter optimization may affect strategy performance.  
4. It may have some false signals as no other indicators are used for filtration.

To control these risks, we can optimize by combining other indicators for filtration, introduce short-term market trend judgment, or use machine learning methods to find the optimal parameter combinations.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Add other technical indicators for judgement to build a trading system and improve win rate. Indicators like MACD, KD can be introduced.

2. Add stop loss mechanisms. Use trailing stop loss or time-based stop loss to lock in profits and avoid wider losses.

3. Conduct parameter optimization. Change the moving average period parameter to find the best combination. Different types of moving averages can also be tested.  

4. Increase machine learning judgement. Use algorithms like random forest and LSTM combined with multiple factors to determine trend direction.

5. Optimize entry and exit logic. Set trend filtering conditions to avoid trades against the trend near its end. Consider using staged exiting logic.

## Summary 

Overall, this moving average breakout strategy is very suitable as a beginner quant trading strategy. It has simple logic, easy to understand and operate, with some practical effects. At the same time, it leaves much room for further testing and optimization. We can introduce more technical indicators and models on this basis to develop better quant strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5000|Take Profit|
|v_input_2|5000|Stop Loss|
|v_input_3|2|Ratio at wich to take out a percentage off the table (take profit / ratio).|
|v_input_4|50|Percentage of position to take profit.|
|v_input_5_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|100|length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-11-22 08:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//  |-- Initialize Strategy Parameters:
strategy( 
     // |-- Strategy Title.
     title='[Tutorial][RS]Working with orders', 
     // |-- if shorttitle is specified, it will overwrite the name on the chart window.
     shorttitle='WwO', 
     // |-- if true it overlays current chart window, otherwise it creates a drawer to display plotting outputs.
     overlay=true, 
     // |-- Strategy unit type for default quantity, possible arguments: (strategy.cash, strategy.fixed, strategy.percent_of_equity)
     default_qty_type=strategy.cash, 
     // |-- Value to use for default trade size
     default_qty_value=1000, 
     // |-- Default Account size 
     initial_capital=100000, 
     // |-- Account Currency parameter
     currency=currency.USD
     )

//  |-- Strategy Profit/loss parameters:
profit = input(defval=5000, title='Take Profit')
loss = input(defval=5000, title='Stop Loss')
ratio = input(defval=2.0, title='Ratio at wich to take out a percentage off the table (take profit / ratio).')
percent = input(defval=50.0, title='Percentage of position to take profit.')
//  |-- Signal Parameters:
//  |
//  |-- Moving Average input source and length parameters.
src = input(defval=close)
length = input(defval=100)
//  |-- Moving Average Data series.
ma = sma(src, length)

//  |-- Condition for triggering a buy(long) order(trade).
if crossover(src, ma)
    //  |-- Create the order.
    strategy.order(id='Buy', long=true)
    //  |-- Issue a exit order to close a percentage of the trade when a specified ratio(take profit / ratio) is reached.
    strategy.exit(id='Buy Half Exit', from_entry='Buy', qty_percent=percent, profit=profit/ratio)
    //  |-- Issue a exit order to close the full position, when take profit or stop loss's are reached.
    strategy.exit(id='Buy Full Exit', from_entry='Buy', qty_percent=100, profit=profit, loss=loss)
if crossunder(src, ma)
    //  |-- Create the order.
    strategy.order(id='Sell', long=false)
    //  |-- Issue a exit order to close a percentage of the trade when a specified ratio(take profit / ratio) is reached.
    strategy.exit(id='Sell Half Exit', from_entry='Sell', qty_percent=percent, profit=profit/ratio)
    //  |-- Issue a exit order to close the full position, when take profit or stop loss's are reached.
    strategy.exit(id='Sell Full Exit', from_entry='Sell Half Exit', qty_percent=100, profit=profit, loss=loss)

//  |-- Output Functions.
plot(series=ma, title='MA', color=black)

```

> Detail

https://www.fmz.com/strategy/433541

> Last Modified

2023-11-28 13:50:49
