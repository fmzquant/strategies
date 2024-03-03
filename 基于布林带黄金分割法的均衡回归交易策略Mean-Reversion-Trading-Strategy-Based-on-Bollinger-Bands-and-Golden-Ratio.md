
> Name

基于布林带黄金分割法的均衡回归交易策略Mean-Reversion-Trading-Strategy-Based-on-Bollinger-Bands-and-Golden-Ratio

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1626699f83c0d48f3d4.png)
[trans]


## 概述

本策略利用布林带的黄金分割线,结合均线形态判断进行回归交易。当价格接触布林带黄金分割线时看作买入信号,利用价格的均衡回归特征获得获利。

## 策略原理

1. 计算布林带的中轨、上轨和黄金分割下轨

- 中轨:n周期的加权移动平均线vwma
- 上轨:中轨 + k * n周期的标准差
- 黄金分割下轨:中轨 - 0.618 * n周期的标准差 

2. 判断形态

- 50日均线上穿200日均线,符合趋势向上
- 价格接触或低于黄金分割下轨,作为买入信号

3. 退出

- 价格上穿布林带上轨,认为价格已经离开下轨回归,此时平仓

4. 止损

- 设定固定百分比止损,如5%

## 策略优势

1. 使用vwma而不是sma作为布林带的中轨,可以更好地反映价格的移动趋势

2. 黄金分割是重要的支撑/阻力区域,这为回归提供依据

3. 均线多头排列,确保大趋势向上

4. 固定止损确保单笔损失控制

## 策略风险

1. 黄金分割线不是确定的支撑,价格可能直接跌穿

2. 固定止损可能过于武断,应考虑根据市场波动调整

3. 均线多头排列也可能是假突破,应结合更多指标判断

4. 回归长度不确定,需要设定合理的止盈离场点

## 优化方向

1. 可以测试不同参数组合,如布林带周期、标准差倍数、固定止损百分比等

2. 可以加入更多指标判断市场趋势和回归概率,如MACD、KD等

3. 可以考虑动态止损,根据ATR止损或跟踪止损

4. 可以优化止盈策略,如移动止盈、分批止盈等

## 总结

本策略利用布林带黄金分割线进行均衡回归交易,具有交易逻辑清晰、参数设定简单、回撤可控等优点。但也存在一定的风险,需要进一步测试和优化,加入更多技术指标判断和止损/止盈工具,才能实际应用。总体来说,该策略提供了一种利用黄金分割法则进行量化交易的思路,值得进一步探索。

||


## Overview

This strategy uses the golden ratio line of Bollinger Bands combined with moving average formations to trade mean reversions. When the price touches the golden ratio line, it is considered a buy signal to take advantage of the mean reverting tendency.

## Strategy Logic

1. Calculate Bollinger Bands middle band, upper band and golden ratio lower band

- Middle band: vwma of n periods 
- Upper band: Middle band + k * n period standard deviation
- Golden ratio lower band: Middle band - 0.618 * n period standard deviation

2. Judge formations

- 50-day MA above 200-day MA, indicates uptrend
- Price touches or below golden ratio lower band, as buy signal  

3. Exit

- When price breaks above BB upper band, price is considered to have moved away from lower band, close position

4. Stop loss

- Set fixed percentage stop loss, e.g. 5%

## Advantages

1. Using vwma instead of sma for BB middle line better reflects price movement

2. Golden ratio is important support/resistance, provides basis for reversion

3. MA in uptrend ensures overall trend is up

4. Fixed stop loss controls loss for each trade

## Risks

1. Golden ratio line is not guaranteed support, price may break through

2. Fixed stop loss may be arbitrary, should consider adjusting based on volatility

3. MA uptrend may be false breakout, should check more indicators  

4. Unsure of reversion length, need reasonable profit taking exit

## Enhancement

1. Test different combinations of parameters like BB period, SD multiplier, fixed stop loss percentage etc.

2. Add more indicators to determine market trend and reversion probability, e.g. MACD, KD etc.  

3. Consider dynamic stops, such as ATR or trailing stops

4. Optimize profit taking like moving profit stop, partial profit taking etc.

## Summary 

This strategy trades mean reversions using BB golden ratio line, with clear logic, simple parameters, and controllable drawdown. But also has risks, requires further testing and optimization, adding more technical indicators for trend and better stops/exits before actual use. Overall provides idea of using golden ratio in quant trading, worth exploring further.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|BB Length|
|v_input_2_hlc3|0|Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_3|1.5|multplier|
|v_input_4|5|Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mohanee

//@version=4

strategy(title="Bollinger Band with Fib Golden Ratio (0.618)",  shorttitle="Bollinger Band with Fib Golden Ratio" , overlay=true, pyramiding=1,     default_qty_type=strategy.percent_of_equity,  default_qty_value=20, initial_capital=10000, currency=currency.USD)  

length = input(50,title="BB Length" , minval=1)
src1 = input(hlc3, title="Source")
//mult1 = input(1.33, minval=0.001, maxval=50)
mult = input(1.5,title="multplier", minval=0.001, maxval=50)

stopLoss=input(5,title="Stop Loss",minval=1)

basis = vwma(src1, length)
dev = mult * stdev(src1, length)

//dev3 = mult3 * stdev(src, length)

upper_618= basis + (0.618*dev)
lower_618= basis - (0.618*dev)

//lower_618_dev3= basis - (0.618*dev3)



plot_upper618= plot(upper_618, color=color.purple, linewidth=2, title="0.618")
plot(basis, color=color.purple,style=plot.style_circles,  linewidth=2)

plot_lower618= plot(lower_618, color=color.purple, linewidth=2, title="0.618 entry")
//plot_lower618_dev3= plot(lower_618_dev3, color=color.red, linewidth=1, title="0.618 stop")

//plot_lower618= plot(lower_618, color=color.purple, linewidth=1, title="0.618 entry")

ema200=ema(close,200)
ema50=ema(close,50)

plot (ema200, title="ema200", color=color.orange, linewidth=2)
plot (ema50, title="ema50", color=color.blue , linewidth=2)


longCondition= ema50 > ema200

strategy.entry(id="BB_Fib618", long=true, when = longCondition and ( close < lower_618  or  low <= lower_618)  )

strategy.close(id="BB_Fib618",  comment="points="+tostring(close - strategy.position_avg_price,  "###.##") , when = strategy.position_size >= 1  and crossover(close,upper_618 )) 

//stoploss exit
stopLossVal = strategy.position_size>=1 ?  strategy.position_avg_price * ( 1 - (stopLoss/100) ) : 0.00
strategy.close(id="BB_Fib618", comment="SL="+tostring(close - strategy.position_avg_price,  "###.##"), when=abs(strategy.position_size)>=1 and close < stopLossVal ) //and close > strategy.position_avg_price )

```

> Detail

https://www.fmz.com/strategy/432347

> Last Modified

2023-11-16 16:52:55
