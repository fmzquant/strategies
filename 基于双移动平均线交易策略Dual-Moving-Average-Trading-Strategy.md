
> Name

基于双移动平均线交易策略Dual-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/117a7a92eff754fc648.png)
 [trans]
## 概述
双移动平均线交易策略(Dual Moving Average Trading Strategy)是一种常见的量化交易策略。该策略使用两条不同时间周期的移动平均线,根据其交叉情况来产生交易信号。具体而言,当短期移动平均线上穿长期移动平均线时,视为买入信号;当短期移动平均线下穿长期移动平均线时,视为卖出信号。

## 原理
该策略的核心原理是:短期移动平均线能反映资产价格的短期趋势,长期移动平均线能反映资产价格的长期趋势。当短期线上穿长期线时,表示短期趋势转为上涨,此时可以买入;当短期线下穿长期线时,表示短期趋势转为下跌,此时可以卖出。通过这种方式,可以顺势而为,捕捉价格趋势的转折点。

具体来说,该策略中定义了两条移动平均线:一条5日短期移动平均线,用于捕捉短期价格趋势;另一条15日长期移动平均线,用于判断长期价格趋势。当5日线从下方上穿15日线时,表示短期价格已经开始上涨,这是买入信号;当5日线从上方下穿15日线时,表示短期价格开始下跌,这是卖出信号。

## 优势分析
相比其他策略,双移动平均线策略具有如下优势:
1. 操作简单,容易理解实现,适合量化交易初学者
2. 顺势而为,避免在错综复杂的市场中追究价格趋势的根本原因
3. 参数调整灵活,可以通过调整移动平均线的周期,适应不同的市场环境
4. 有效过滤市场噪音,Capture长短期趋势的转折点
5. 可定制化交易频率,降低交易成本和滑点损失

## 风险分析
双移动平均线策略也存在一些风险,主要包括:
1. 可能产生虚假信号,移动平均线本质上是滞后信号
2. 需要同时关注长短两条移动平均线,参数调整和效果检验较复杂
3. 无法很好地处理价格剧烈波动的场景,容易止损
4. 交易频率可能过高或过低,需要调参优化
5. 效果与市场行情相关性很大,在指数整体低迷期效果不佳

对应解决方法:
1. 结合其他指标过滤信号
2. 优化移动平均线参数,检验效果
3. 设定合适的止损范围
4. 调整移动平均线参数,优化交易频率  
5. 不同市场行情下调整参数


## 优化方向  
该策略可以从以下几个方向进行优化:

1. 结合其他指标过滤信号,如MACD,KDJ等,避免产生虚假信号

2. 引入自适应移动平均线,根据市场波动程度动态调整移动平均线参数,提高稳健性

3. 最佳化移动平均线参数,找到最优参数组合,提高策略效果  

4. 加入止损机制,避免亏损扩大,提高风险控制能力

5. 多时间框架组合,同时利用日线、周线信号,提高稳定性  

6.  Markov状态切换,不同市场状态采用不同参数,提高适应性


## 总结
双移动平均线交易策略整体而言是一种效果较稳定的量化交易策略。它交易原理简单,容易理解和实现,参数调整灵活,能够有效跟踪市场趋势。同时也存在一定的局限性,如产生假信号、难以处理市场剧烈波动等情况。这需要通过引入其他辅助工具,以及参数优化的方式加以控制。总的来说,双移动平均线策略是一种适合量化交易初学者学习和实践的有效策略。

||

## Overview
The Dual Moving Average Trading Strategy is a common quantitative trading strategy. This strategy uses two moving averages with different time periods to generate trading signals based on their crossover. Specifically, when the short-term moving average crosses above the long-term moving average, it is considered a buy signal; when the short-term moving average crosses below the long-term moving average, it is considered a sell signal.  

## Principle  
The core principle of this strategy is: the short-term moving average reflects the short-term trend of the asset price, and the long-term moving average reflects the long-term trend of the asset price. When the short-term line crosses above the long-term line, it indicates that the short-term trend has turned to rise, at this time you can buy. When the short-term line crosses below the long-term line, it indicates that the short-term trend has turned to fall, at this time you can sell. Follow the trend, capture the turning point of price trend.  

Specifically, the strategy defines two moving averages: a 5-day short-term moving average to capture short-term price trends; and a 15-day long-term moving average to judge long-term price trends. When the 5-day line moves above the 15-day line, it indicates that the short-term price has started to rise, which is a buy signal; when the 5-day line crosses below the 15-day line, it indicates that the short-term price starting to fall, this is a sell signal.   

## Advantages Analysis  
Compared with other strategies, the dual moving average strategy has the following advantages:  
1. Simple to operate, easy to understand and implement, suitable for quantitative trading novice.  
2. Follow the trend, avoid pursue the fundamental reason of complex market trend.  
3. Flexible parameter adjustment, the moving average period can be adjusted to adapt to different market environment.   
4. Effective filter market noise, capture turning points of long and short term trend.
5. Customizable trading frequency to reduce transaction costs and slippage losses.   

## Risk Analysis
Dual moving average strategy also has some risks, mainly including:  
1. It may generate false signals because the moving average is essentially a lagging signal.  
2. Need to monitor two moving averages simultaneously, parameter adjustment and effect test are complex.
3. Cannot handle scenarios with dramatic price fluctuations well, easily stopped loss.
4. Trading frequency may be too high or too low, parameters need to be optimized.  
5. The effect is highly correlated with market conditions, poor performance during overall bear market.  

Solutions:
1. Combine with other indicators to filter signals. 
2. Optimize moving average parameters and test performances.  
3. Set appropriate stop loss range.
4. Adjust moving average parameters to optimize trading frequency.
5. Adjust parameters under different market conditions.   

## Optimization Directions
The strategy can be optimized in the following directions:  

1. Combine with other indicators like MACD, KDJ to filter false signals.   

2. Introduce adaptive moving average, dynamically adjust parameters based on market volatility to improve robustness.  

3. Optimize moving average parameters to find the best combination and improve strategy performance.   

4. Add stop loss mechanism to limit losses and enhance risk control.   

5. Combination of multiple time frames, utilizing signals from daily and weekly lines to improve stability.

6. Markov state switch, use different parameters under different market states to improve adaptability.  

## Summary  
In general, the dual moving average trading strategy is quite effective and stable. The trading principle is simple to understand and implement, parameters are flexible to adapt to market trends. Meanwhile there are some limitations like generating false signals and difficulty in handling drastic market fluctuations. These can be addressed through introducing other tools and parameter optimization. Overall speaking, this is a practical strategy suitable for quantitative trading beginners to learn and practice.  


[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|MA 1 Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|5|MA 1 Period|
|v_input_3_close|0|MA 2 Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|15|MA 2 Period|
|v_input_5|true|From Month|
|v_input_6|true|From Day|
|v_input_7|2018|From Year|
|v_input_8|true|To Month|
|v_input_9|true|To Day|
|v_input_10|9999|To Year|


> Source (PineScript)

``` pinescript
//@version=3
strategy("CS: 2 Moving Averages Script - Strategy (Testing)", overlay=true)

// === GENERAL INPUTS ===
// short ma
ma1Source   = input(defval = close, title = "MA 1 Source")
ma1Length   = input(defval = 5, title = "MA 1 Period", minval = 1)
// long ma
ma2Source   = input(defval = close, title = "MA 2 Source")
ma2Length   = input(defval = 15, title = "MA 2 Period", minval = 1)

// === SERIES SETUP ===
/// a couple of ma's..
ma1 = ema(ma1Source, ma1Length)
ma2 = ema(ma2Source, ma2Length)

// === PLOTTING ===
fast = plot(ma1, title = "MA 1", color = red, linewidth = 2, style = line, transp = 30)
slow = plot(ma2, title = "MA 2", color = green, linewidth = 2, style = line, transp = 30)

// === LOGIC ===
enterLong = crossover(ma1, ma2)
exitLong = crossover(ma2, ma1)

// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 2012)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2012)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

// Entry //
strategy.entry(id="Long Entry", long=true, when=enterLong and window())
strategy.entry(id="Short Entry", long=false, when=exitLong and window())
```

> Detail

https://www.fmz.com/strategy/439338

> Last Modified

2024-01-19 14:10:38
