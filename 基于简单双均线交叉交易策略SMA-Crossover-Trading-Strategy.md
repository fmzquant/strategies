
> Name

基于简单双均线交叉交易策略SMA-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d13e4c1066f90b826b.png)
[trans]
# 

## 概述
本策略基于简单移动平均线(SMA)的金叉死叉原理设计。策略使用两个SMA,即快速SMA和慢速SMA,当快速SMA从下方向上突破慢速SMA时,产生买入信号;当快速SMA从上方向下跌破慢速SMA时,产生卖出信号。

## 策略原理
该策略主要依赖两个SMA指标线。其中,快速SMA期间设置较短,能更快捕捉价格变动;慢速SMA期间设置较长,能过滤掉部分噪音。当快速SMA从下方向上交叉慢速SMA时,表示短期价格上涨速度较快,产生买入信号。当快速SMA从上方向下交叉慢速SMA时,表示短期价格下跌速度较快,产生卖出信号。

通过设置不同的SMA周期参数,可以在一定程度上调整策略的参数,适应不同的市场环境。同时,该策略还允许设置回测的时间范围,方便在历史数据上测试策略 parameter。

## 优势分析
- 使用广为人知的SMA指标,原理简单易懂
- 可自定义SMA周期参数,适应性强
- 可设置回测时间范围,方便参数优化
- 采用交叉方式产生信号,对突破信号有一定的过滤作用,可减少错误交易

## 风险分析
- SMA本身存在滞后性,可能错过短线机会
- 无法判断趋势力度,产生信号的效果可能不稳定
- SMA周期参数设置不当,会增加错误信号

针对上述风险,可以采用以下措施:
- 适当缩短SMA周期,提高敏感性
- 结合其他指标判断趋势力度
- 借助参数优化工具寻找最佳参数组合

## 优化方向  
- 增加止损策略,控制单笔损失
- 增加仓位管理机制
- 结合其他技术指标进行组合
- 增加机器学习算法,实现动态参数优化

## 总结
本策略属于典型的趋势跟踪策略。运用简单的双均线交叉原理,在参数设置合适的前提下,可以获取较好的跟踪效果。但SMA本身存在一定的滞后性,无法判断趋势的力度。因此,实际应用中,需要引入其他辅助工具,形成指标组合,同时辅以自动化的参数优化和风险控制手段,才能使策略稳定盈利。

||

## Overview
This strategy is designed based on the golden cross and dead cross principles of Simple Moving Average (SMA). The strategy uses two SMAs, namely fast SMA and slow SMA. When the fast SMA crosses above the slow SMA from below, a buy signal is generated. When the fast SMA crosses below the slow SMA from above, a sell signal is generated.  

## Strategy Logic  
The strategy mainly relies on two SMA indicator lines. The fast SMA has a shorter period and can capture price changes faster. The slow SMA has a longer period and can filter out some noise. When the fast SMA crosses above the slow SMA from below, it indicates that the short-term rising speed is faster and generates a buy signal. When the fast SMA crosses below the slow SMA from above, it indicates that the short-term falling speed is faster and generates a sell signal.   

By setting different SMA period parameters, the strategy parameters can be adjusted to some extent to adapt to different market environments. At the same time, the strategy also allows setting the backtesting time range for testing the strategy parameters on historical data.   

## Advantage Analysis
- Uses the well-known SMA indicator with simple logic  
- Customizable SMA period parameters with strong adaptability   
- Backtesting time range can be set for parameter optimization
- Using crossover to generate signals has a certain filtering effect and can reduce wrong trades   

## Risk Analysis   
- SMA itself has lagging effect and may miss short-term opportunities  
- Unable to determine the momentum of the trend, the effectiveness of signal generation may be unstable   
- Improper SMA period parameter settings will increase false signals   

To address the above risks, the following measures can be taken:
- Appropriately shorten the SMA cycle to improve sensitivity  
- Incorporate other indicators to determine trend momentum  
- Find the optimal parameter combination using parameter optimization tools  

## Optimization Directions
- Add stop loss strategy to control single loss  
- Add position management mechanism  
- Combine with other technical indicators  
- Add machine learning algorithms to achieve dynamic parameter optimization   

## Summary  
This is a typical trend following strategy. By applying the simple principle of double moving average crossover, it can obtain good tracking results when the parameters are set appropriately. However, SMA itself has a certain lagging effect and cannot determine the momentum of the trend. Therefore, in actual application, other auxiliary tools need to be introduced to form an indicator combination, and supplemented with automated parameter optimization and risk control means, in order to make the strategy steadily profitable.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_open|0|Fast MA Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|36|Fast MA Period|
|v_input_3_open|0|Slow MA Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|46|Slow MA Period|
|v_input_5|9|From Month|
|v_input_6|true|From Day|
|v_input_7|2018|From Year|
|v_input_8|true|To Month|
|v_input_9|true|To Day|
|v_input_10|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-17 00:00:00
end: 2023-12-18 19:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//strategy(title="MA Cross Entry & Exit w/Date Range", overlay=true, initial_capital=10000, currency='USD')

strategy(title="SMA Cross Entry & Exit Strategy", overlay=true)

// Credit goes to this developer for the "Date Range Code"
// https://www.tradingview.com/script/62hUcP6O-How-To-Set-Backtest-Date-Range/


// === GENERAL INPUTS ===
// short ma
maFastSource   = input(defval = open, title = "Fast MA Source")
maFastLength   = input(defval = 36, title = "Fast MA Period", minval = 1)
// long ma
maSlowSource   = input(defval = open , title = "Slow MA Source")
maSlowLength   = input(defval = 46, title = "Slow MA Period", minval = 1)

// === SERIES SETUP ===
// a couple of ma's..
maFast = sma(maFastSource, maFastLength)
maSlow = sma(maSlowSource, maSlowLength)


// === PLOTTING ===
fast = plot(maFast, title = "Fast MA", color = red, linewidth = 2, style = line, transp = 30)
slow = plot(maSlow, title = "Slow MA", color = green, linewidth = 2, style = line, transp = 30)

// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 9, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 2017)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false // create function "within window of time"

// === LOGIC ===
//enterLong = crossover(maFast, maSlow)
//exitLong = crossover(maSlow, maFast)
enterLong = crossover(maSlow, maFast)
exitLong = crossover(maFast, maSlow)


// Entry //
strategy.entry(id="Long Entry", long=true, when=window() and enterLong)
strategy.entry(id="Short Entry", long=false, when=window() and exitLong)

// === FILL ====

fill(fast, slow, color = maFast > maSlow ? green : red)
```

> Detail

https://www.fmz.com/strategy/436533

> Last Modified

2023-12-25 16:03:48
