
> Name

均线黄金分割放大ATR突破策略Average-True-Range-Breakout-Strategy-with-Golden-Ratio

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a6e76dbbe7e4cef797.png)
[trans]
## 概述
本策略是一个利用ATR指标构建交易信号的突破策略。该策略运用均线系统产生交易信号,通过黄金分割放大后的ATR指标上下通道构建多空仓位。能够在趋势中大幅获利,在震荡行情中获得小额稳定收益。

## 策略原理  
代码中通过求取收盘价的ATR周期指标,并放大1.618倍作为上轨,放大2.618倍作为下轨,与均线ema结合构建布林通道突破交易系统。当价格从下轨突破向上时做多,价格从上轨突破向下时做空,实现趋势跟踪获利。

## 策略优势
1. ATR指标能有效地捕捉市场波动率,利用波动率构建自适应交易通道,避免使用固定参数导致的过拟合。
2. 黄金分割放大后的ATR上下轨能在不增加交易频率的前提下扩大收益空间。
3. 均线系统过滤了短期噪音,与ATR通道配合能锁定中长线趋势。

## 策略风险 
1. ATR指标对极端行情的应对存在滞后。  
2. 黄金分割放大倍数不当可能导致交易频率过高。
3. 长周期均线切换信号发生滞后。

## 策略优化
1. ATR指标可以考虑与市场波动率指数VIX结合使用或调整放大倍数。  
2. 均线系统可以引入多时间周期EMA,构建自适应交易系统。
3. 可以设立止损机制降低单笔交易最大损失。

## 总结
本策略综合运用均线过滤、ATR通道跟踪和黄金分割原理。能够有效跟踪中长线趋势,具有良好的稳定性。通过参数调整可以适应不同品种不同周期的应用,值得探索其良好的市场适应性。

||

## Overview  
This is a breakout strategy that utilizes the ATR indicator to generate trading signals. The strategy employs a moving average system to produce entry signals and an amplified ATR channel based on the golden ratio to construct long and short positions. It could gain significantly in trends and obtain small but steady profits in range-bound markets.

## Principles
The code calculates the ATR over a period of closing prices, amplifies it by 1.618 as the upper band and 2.618 as the lower band. Combined with the EMA, it forms a Bollinger channel breakout system. Go long when price breaks out the lower band upwards and go short when breaking the upper band downwards to follow trends.  

## Advantages 
1. The ATR indicator effectively captures market volatility and constructs adaptive trading bands, avoiding overfitting caused by static parameters.
2. The amplified ATR bands by the golden ratio expand profit potential without increasing trading frequency. 
3. The moving average system filters out short-term noises and cooperates with the ATR channel to identify mid-to-long term trends.

## Risks
1. The ATR indicator may lag during extreme market conditions.   
2. Improper magnification multiples would lead to excessively high trading frequency.
3. Switching signals from long-period moving averages have lags.  

## Optimization
1. The ATR can incorporate the VIX or adjust magnification.   
2. Employ multiple time frame EMAs to construct adaptive systems.  
3. Set stop losses to limit maximal loss per trade.   

## Summary
This strategy integrates moving average filtering, ATR channel tracking and the golden ratio methodology, which can effectively follow mid-to-long term trends with good stability. By tuning parameters, it can be adapted to different products across various frequencies, worthy of exploring for its excellent market adaptivity.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|52|Length|
|v_input_2|1.618|Length|
|v_input_3|2.618|Length|
|v_input_4|8|From Month|
|v_input_5|18|From Day|
|v_input_6|2008|From Year|
|v_input_7|true|To Month|
|v_input_8|true|To Day|
|v_input_9|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("ATR Long Only Strategy lower band buy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

len = input(52, type=input.integer, minval=1, title="Length")
mul = input(1.618, type=input.float, minval=0, title="Length")
mullow = input(2.618, type=input.float, minval=0, title="Length")

price = sma(close, 1)
average = ema(close, len)
diff = atr(len) * mul
difflow = atr(len) * mullow

bull_level = average + diff
bear_level = average - difflow
bull_cross = crossunder(price, bear_level)
bear_cross = crossunder(bull_level, price)

FromMonth = input(defval = 8, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 18, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2008, title = "From Year", minval = 2008)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2020, title = "To Year", minval = 2019)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)       
startTimeOk()  => true

if (startTimeOk())
    strategy.entry("KOP", strategy.long, when=bull_cross)
    strategy.close("KOP", when=bear_cross)  //strategy.entry("Sell", strategy.short, when=bear_cross)

plot(price, title="price", color=color.black, transp=50, linewidth=2)
a0 = plot(average, title="average", color=color.red, transp=50, linewidth=1)
a1 = plot(bull_level, title="bull", color=color.green, transp=50, linewidth=1)
a2 = plot(bear_level, title="bear", color=color.red, transp=50, linewidth=1)
fill(a0, a1, color=color.green, transp=97)
fill(a0, a2, color=color.red, transp=97)
```

> Detail

https://www.fmz.com/strategy/442844

> Last Modified

2024-02-26 15:02:26
