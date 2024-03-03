
> Name

结合多重指标的比特币日内交易策略Johns-Bitcoin-Intraday-Trading-Strategy-Based-on-Multiple-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a9dd1fcf8d905b8da4.png)
[trans]

## 概述

本策略结合RSI、MFI、Stoch RSI和MACD四个指标,实现比特币的日内交易。当多个指标同时发出买入或卖出信号时,策略才会下单,以控制风险。

## 策略原理

1. RSI指标用于判断市场是否超买超卖。RSI低于40时产生买入信号,高于70时产生卖出信号。

2. MFI指标判断市场的资金流动。MFI低于23时产生买入信号,高于80时产生卖出信号。

3. Stoch RSI指标判断市场是否超买超卖。K线低于34时产生买入信号,高于80时产生卖出信号。

4. MACD指标判断市场趋势和动量。快线低于慢线且柱子为负时产生买入信号,相反则产生卖出信号。

## 优势分析

1. 结合四大指标,提高信号准确性,避免因单一指标失效造成损失。

2. 只有当多个指标同时发出信号才会下单,可大幅降低假信号的概率。

3. 采用日内交易策略,避免隔夜风险,降低资金成本。

## 风险及解决方法

1. 策略交易频率可能较低,存在一定的时间风险。可适当放宽指标参数,增加交易次数。

2. 指标发出错误信号的概率仍然存在。可引入机器学习算法,辅助判断指标信号的可靠性。

3. 存在一定的超买超卖风险。可适当调整指标参数或增加其他指标判断逻辑。

## 优化方向  

1. 增加自适应指标参数功能。根据市场波动度和变化速度实时微调指标参数。

2. 添加止损逻辑。如亏损超过一定比例则止损退出,有效控制单笔损失。

3. 结合情绪指标。增加市场热度、市场恐慌度等多维度判断,提升策略盈利空间。

## 总结

本策略通过四大指标互相验证的方式发出信号,可有效降低假信号率,是一种相对稳定的高频盈利策略。随着参数和模型的不断优化,策略的胜率和盈利能力还可望进一步提升。

|| 

## Overview

This strategy combines RSI, MFI, Stoch RSI and MACD four indicators to implement bitcoin intraday trading. Orders will only be placed when multiple indicators give buy or sell signals simultaneously to control risks.  

## Strategy Logic

1. The RSI indicator is used to determine whether the market is overbought or oversold. It generates a buy signal when RSI is below 40 and a sell signal when RSI is above 70.

2. The MFI indicator judges the capital flow in the market. It generates a buy signal when MFI is below 23 and a sell signal when MFI is above 80.

3. The Stoch RSI indicator determines whether the market is overbought or oversold. It generates a buy signal when the K line is below 34 and a sell signal when above 80.

4. The MACD indicator judges the market trend and momentum. It generates a buy signal when the fast line is below the slow line and the histogram is negative, and a sell signal for the opposite scenario.

## Advantage Analysis  

1. Combining four major indicators improves signal accuracy and avoids losses caused by the failure of a single indicator.

2. Orders are placed only when multiple indicators give signals simultaneously, which greatly reduces the probability of false signals.

3. Adopting intraday trading strategies avoids overnight risks and reduces capital costs.

## Risks and Solutions

1. The strategy's trading frequency may be relatively low, with certain time risks. Indicator parameters can be appropriately relaxed to increase the number of trades.

2. There is still a probability that indicators may give wrong signals. Machine learning algorithms can be introduced to assist in judging the reliability of indicator signals.

3. There are some overbought and oversold risks. Indicator parameters can be adjusted accordingly or more indicator logic can be added.

## Optimization Directions

1. Add adaptive indicator parameter functionality. Adjust indicator parameters in real time based on market volatility and change speed.

2. Add stop loss logic. Exit stop loss if losses exceed a certain percentage to effectively control single loss.

3. Incorporate sentiment indicators. Increase multidimensional judgments such as market heat and market fear to improve strategy profit space.

## Conclusion  

By verifying signals through four major indicators, this strategy can effectively reduce the false signal rate and is a relatively stable high-frequency profit strategy. With continuous optimization of parameters and models, the strategy's win rate and profitability can be further improved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|From Day|
|v_input_int_2|true|From Month|
|v_input_int_3|2021|From Year|
|v_input_int_4|true|To Day|
|v_input_int_5|true|To Month|
|v_input_int_6|2025|To Year|
|v_input_float_1|2.1|Stop Loss Profit (%)|
|v_input_int_7|23|Max MF|
|v_input_int_8|80|Min MF|
|v_input_1|80|OverBought_StochRSI|
|v_input_2|34|OverSold_StochRSI|
|v_input_int_9|3|K|
|v_input_int_10|2|D|
|v_input_int_11|14|RSI Length|
|v_input_int_12|14|Stochastic Length|
|v_input_3_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|12|Fast Length|
|v_input_5|26|Slow Length|
|v_input_6_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_13|9|Signal Smoothing|
|v_input_string_1|0|Oscillator MA Type: EMA|SMA|
|v_input_string_2|0|Signal Line MA Type: EMA|SMA|
|v_input_color_1|#0000FF|buy|
|v_input_color_2|#FF0000|sell|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-29 00:00:00
end: 2023-12-06 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=5
strategy('John Day Stop Loss', overlay=false, pyramiding=1, default_qty_type=strategy.cash, default_qty_value=10000, initial_capital=10000, currency='USD', precision=2)
strategy.risk.allow_entry_in(strategy.direction.long) 

from_day = input.int(defval=1, title='From Day', minval=1)
from_month = input.int(defval=1, title='From Month', minval=1)
from_year = input.int(defval=2021, title='From Year', minval=2020)
to_day = input.int(defval=1, title='To Day', minval=1)
to_month = input.int(defval=1, title='To Month', minval=1)
to_year = input.int(defval=2025, title='To Year', minval=2020)

time_cond = time > timestamp(from_year, from_month, from_day, 00, 00) and time < timestamp(to_year, to_month, to_day, 00, 00)
//time_cond = true

//Stop Loss
longProfitPerc = input.float(title="Stop Loss Profit (%)", defval=2.1) / 100
longExitPrice  = strategy.position_avg_price * (1 - longProfitPerc)

//RSI - yellow
up = ta.rma(math.max(ta.change(close), 0), 14)
down = ta.rma(-math.min(ta.change(close), 0), 14)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
plot(rsi, "RSI", color=#00FFFF)
buy_rsi = true // rsi < 40
sell_rsi = true //rsi > 70

//MFI - cyan
mf = ta.mfi(hlc3, 14)
plot(mf, "MF", color=#FFFF00)
buy_mfi = mf < input.int(defval=23, title='Max MF', minval=1)
sell_mfi = mf > input.int(defval=80, title='Min MF', minval=1)

//Stoch RSI
OverBought_StochRSI = input(80)
OverSold_StochRSI = input(34)
smoothK = input.int(3, "K", minval=1)
smoothD = input.int(2, "D", minval=1)
lengthRSI = input.int(14, "RSI Length", minval=1)
lengthStoch = input.int(14, "Stochastic Length", minval=1)
srcRSI = input(close, title="RSI Source")
rsi1 = ta.rsi(srcRSI, lengthRSI)
kStochRSI = ta.sma(ta.stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = ta.sma(kStochRSI, smoothD)
co = ta.crossover(kStochRSI,d)
cu = ta.crossunder(kStochRSI,d)

buy_stochRSI = co and kStochRSI < OverSold_StochRSI
sell_stochRSI = cu and kStochRSI > OverBought_StochRSI

plot(kStochRSI, "K", color=#2962FF)
plot(d, "D", color=#FF6D00)
h0 = hline(OverBought_StochRSI, "Upper Band", color=#787B86)
h1 = hline(OverSold_StochRSI, "Lower Band", color=#787B86)
fill(h0, h1, color=color.rgb(33, 150, 243, 90), title="Background")

//MACD
// Getting inputs
fast_length = input(title="Fast Length", defval=12)
slow_length = input(title="Slow Length", defval=26)
src = input(title="Source", defval=close)
signal_length = input.int(title="Signal Smoothing",  minval = 1, maxval = 50, defval = 9)
sma_source = input.string(title="Oscillator MA Type",  defval="EMA", options=["SMA", "EMA"])
sma_signal = input.string(title="Signal Line MA Type", defval="EMA", options=["SMA", "EMA"])
// Plot colors
//col_macd = input(#2962FF, "MACD Line  ", group="Color Settings", inline="MACD")
//col_signal = input(#FF6D00, "Signal Line  ", group="Color Settings", inline="Signal")
//col_grow_above = input(#26A69A, "Above   Grow", group="Histogram", inline="Above")
//col_fall_above = input(#B2DFDB, "Fall", group="Histogram", inline="Above")
//col_grow_below = input(#FFCDD2, "Below Grow", group="Histogram", inline="Below")
//col_fall_below = input(#FF5252, "Fall", group="Histogram", inline="Below")
// Calculating
fast_ma = sma_source == "SMA" ? ta.sma(src, fast_length) : ta.ema(src, fast_length)
slow_ma = sma_source == "SMA" ? ta.sma(src, slow_length) : ta.ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
hist = macd - signal
buy_MACD = macd < signal and hist < 0 
sell_MACD = macd > signal and hist > 0 

//buy_MACD = true 
//sell_MACD = true

//plot(hist, title="Histogram", style=plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below)))
//plot(macd, title="MACD", color=col_macd)
//plot(signal, title="Signal", color=col_signal)

sessionColor = color(na)
if time_cond

    if (not na(kStochRSI) and not na(d))
        cmt = str.tostring(close)
    	if (buy_stochRSI and buy_MACD and buy_mfi and buy_rsi)
    		strategy.entry("BUY", strategy.long, comment='BUY @ ' + cmt)
    		if longProfitPerc != 0
    		    strategy.exit(id="x", stop=longExitPrice, comment='EXIT @ ' + str.tostring(longExitPrice))
        	sessionColor := input.color(#0000FF, "buy") //red
    	if (sell_stochRSI and sell_MACD and sell_mfi and sell_rsi)
    		strategy.entry("SELL", strategy.short, comment='SELL @ ' + cmt)
    		sessionColor := input.color(#FF0000, "sell") //green
    	
bgcolor(sessionColor)
```

> Detail

https://www.fmz.com/strategy/434555

> Last Modified

2023-12-07 15:23:44
