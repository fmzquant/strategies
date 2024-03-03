
> Name

多周期移动平均线通道趋势跟踪策略Multi-Period-Moving-Average-Channel-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/151c4cd44f373181065.png)
[trans]
## 概述

该策略是一种swing策略,适用于像加密货币和股票这样的趋势性市场,使用较大的时间框架,如8小时。该策略使用包括SMA、EMA、VWMA、ALMA、SMMA、LSMA和VWMA在内的多种移动平均线,分别应用于高点和低点,形成两个平均线通道。

当收盘价高于应用于高点的平均线时做多;当收盘价低于应用于低点的平均线时做空。

## 策略原理

该策略使用7种不同的移动平均线指标,包括SMA、EMA、VWMA、ALMA、SMMA、LSMA和VWMA。这些移动平均线分别应用于K线的最高价和最低价,生成两条平均线。

应用于最高价的平均线被称为avg_high,应用于最低价的平均线被称为avg_low。这两条平均线构成一个通道。

当收盘价大于avg_high时,做多;当收盘价低于avg_low时,做空。

做多时,止损线为avg_low,止盈线为开仓价*(1+tp_long);做空时,止损线为avg_high,止盈线为开仓价*(1-tp_short)。

## 优势分析

该策略最大的优势在于利用多种移动平均线指标提高获利概率。不同周期和计算方式的移动平均线指标对价格的反应速度不同,结合使用可以形成更为可靠的交易信号。

另一个优势是采用通道方式交易。上下通道限制了止损范围,降低了风险,更适合swing策略。

## 风险分析

该策略主要面临两方面的风险:

1. 多种移动平均线指标组合使用,参数设置较为复杂,需要大量测试和优化来找到最佳参数组合。

2. 在横盘和无明确趋势的市场中,该策略容易产生亏损和多次无效突破的交易信号。

为降低这些风险,需要选择趋势明显的交易品种,同时对参数组合进行大量回测和优化,找到最适合当前市场状况的参数设置。

## 优化方向 

该策略还需要从以下几个方面进行优化:

1. 测试更多种类的移动平均线,寻找更好的组合。可以考虑SMA、EMA、KAMA、TEMA等。

2. 对移动平均线长度和通道宽度进行参数优化,找到最佳参数设置。

3. 测试不同的止盈止损设置。可以考虑trailing stop或动态止损等方式。

4. 结合趋势判断指标,避免无明确趋势的市场中频繁交易。例如ADX,ATR等。

5. 优化 entry 和 exit 逻辑,设置额外 filter 条件,减少无效交易。

## 总结

该策略通过多种移动平均线指标提高获利概率,采用上下通道方式降低风险,是一种swing趋势跟踪策略。该策略适用于趋势性明显的交易品种,在参数优化后效果较好。但市场转折时容易承受较大亏损,需要进一步优化以降低风险。

||

## Overview  

This is a swing strategy designed for trending markets such as crypto and stocks, using large timeframes like 8 hours. The strategy uses multiple moving averages including SMA, EMA, VWMA, ALMA, SMMA, LSMA and VWMA applied separately to high and low to form two average lines as a channel.  

Go long when close is above the average line applied to high. Go short when close is below the average line applied to low.

## Strategy Logic  

The strategy uses 7 different types of moving averages including SMA, EMA, VWMA, ALMA, SMMA, LSMA and VWMA. These MAs are applied separately to the highest and lowest prices of candlesticks to generate two average lines.  

The average line applied to high prices is called avg_high. The one applied to low prices is called avg_low. These two lines form a channel.
  
Go long when close is above avg_high. Go short when close is below avg_low. 
  
The stop loss for long is avg_low. Take profit is entry price *(1 + tp_long). For short, stop loss is avg_high, take profit is entry price *(1 - tp_short).

## Advantage Analysis   

The biggest advantage of this strategy is utilizing multiple moving averages to improve profitability. Different MAs have different reaction speeds to price changes. Combining them forms more reliable trading signals.   

Another advantage is the channel approach. The channel limits stop loss range and reduces risk suitable for swing trading.   

## Risk Analysis

The strategy has two main risks:  

1. The combination of multiple MAs makes parameter tuning complex requiring lots of tests and optimization to find the best.

2. In sideways or non-trending markets, the strategy tends to generate losses and whipsaws.
  
To mitigate the risks, choose products with clear trends, and do extensive backtests and optimization to find parameters suitable for current market conditions.

## Optimization Directions

Areas for further optimization:

1. Test more types of MAs to find better combinations, like SMA, EMA, KAMA, TEMA etc.  

2. Optimize lengths of MAs and channel width to determine optimum parameters.  

3. Test different take profit and stop loss mechanisms like trailing stops or dynamic stops.
  
4. Incorporate trend metrics like ADX, ATR to avoid whipsaws during choppy markets.

5. Optimize entry and exit logics with additional filters to reduce invalid trades.

## Summary  
This swing trend following strategy improves profitability using multiple MAs and reduces risk via channels. It works well for trending products after parameter optimization. But can suffer big losses at trend reversals. Further optimizations needed to mitigate downside risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2000|From Year|
|v_input_4|31|To Day|
|v_input_5|12|To Month|
|v_input_6|2021|To Year|
|v_input_7|12|Length Moving averages|
|v_input_8|0.06|TP Long|
|v_input_9|0.05|SL Long|
|v_input_10|0.045|TP Short|
|v_input_11|0.05|SL Short|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-20 00:00:00
end: 2024-02-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4

strategy(title="High/Low channel swing", shorttitle="Multi MA swing", overlay=true)


fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2000, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2021, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true

//////
length_ma= input(defval=12, title="Length Moving averages", minval=1)

////////////////////////////////SETUP///////////////////////////////////////////

sma_high   = sma(high, length_ma)
ema_high   = ema(high, length_ma)
wma_high   = wma(high, length_ma)
alma_high  = alma(high,length_ma, 0.85, 6)
smma_high = rma(high,length_ma)
lsma_high = linreg(high, length_ma, 0)
vwma_high = vwma(high,length_ma)



avg_high = (sma_high+ema_high+wma_high+alma_high+smma_high+lsma_high+vwma_high)/7

///////////////////////////////////////////

sma_low   = sma(low, length_ma)
ema_low   = ema(low, length_ma)
wma_low   = wma(low, length_ma)
alma_low  = alma(low,length_ma, 0.85, 6)
smma_low = rma(low,length_ma)
lsma_low = linreg(low, length_ma, 0)
vwma_low = vwma(low,length_ma)



avg_low = (sma_low+ema_low+wma_low+alma_low+smma_low+lsma_low+vwma_low)/7

////////////////////////////PLOTTING////////////////////////////////////////////


plot(avg_high , title="avg", color=color.green, linewidth = 4)
plot(avg_low , title="avg", color=color.red, linewidth = 4)

long= close > avg_high
short = close < avg_low

tplong=input(0.06, title="TP Long", step=0.01)
sllong=input(0.05, title="SL Long", step=0.01)

tpshort=input(0.045, title="TP Short", step=0.01)
slshort=input(0.05, title="SL Short", step=0.01)

if(time_cond)
    strategy.entry("long",1,when=long)
    strategy.exit("closelong", "long" , profit = close * tplong / syminfo.mintick, loss = close * sllong / syminfo.mintick, alert_message = "closelong")
    strategy.close("long", when=crossunder(low,avg_low))
    
    
    strategy.entry("short",0,when=short)
    strategy.exit("closeshort", "short" , profit = close * tpshort / syminfo.mintick, loss = close * slshort / syminfo.mintick, alert_message = "closeshort")
    strategy.close("short",when=crossover(high,avg_high))


```

> Detail

https://www.fmz.com/strategy/442220

> Last Modified

2024-02-20 13:45:42
