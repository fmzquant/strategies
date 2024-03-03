
> Name

布林带和Stoch-RSI交易策略Bollinger-Band-and-Stoch-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

本策略融合布林带指标和Stoch RSI指标,实现多指标组合交易。属于典型的组合指标策略类型。策略通过布林带判断趋势方向,Stoch RSI进行入场时机优化,实现交易信号的产生。

## 策略原理

该策略主要基于以下两个指标进行判断:

1. 布林带

   计算布林带中的上轨、中轨和下轨。当价格从下轨向上突破时产生买入信号。

2. Stoch RSI 

   计算Stoch RSI指标,当其K线上穿D线时产生买入信号。

具体交易逻辑为:同时满足布林带上轨突破和Stoch RSI指标金叉时,进行买入开仓。

平仓条件为止盈或止损:当价格重新触碰布林带上轨或中轨时,进行止盈平仓;当价格重新跌破布林带下轨时,进行止损平仓。

## 策略优势

- 组合布林带和Stoch RSI两个指标
- 布林带判断大趋势,Stoch RSI优化入场点位
- Stoch RSI可有效过滤布林带假突破
- 中轨和下轨止盈止损,风险控制到位
- 多种参数可调整,可以针对市场进行优化

## 策略风险

- 均线指标滞后,可能错过最佳入场
- 仅基于指标,对突发事件反应较慢
- 布林带范围设置不当,止损止盈失效
- Stoch RSI参数设置不当,产生过多假信号
- 需要针对不同品种分别测试参数

可以通过以下措施来降低风险:

- 优化参数,提高入场的准确度
- 考虑加入其他滤波指标进行确认
- 设置追踪止损来替代布林带止损
- 根据不同品种特点分别测试参数
- 适当调整仓位管理系统

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化布林带参数

   调整上下轨计算比例,寻找最佳参数

2. 优化Stoch RSI参数 

   寻找最匹配的K值和D值

3. 加入MACD等指标进行二次确认

   避免只依靠单一指标造成假信号
   
4. 使用止盈追踪止损代替固定止损

   根据价格波动 trailing stop 止损
   
5. 根据不同品种分别测试参数组合

   不同品种参数不一定相同,需要分别优化

## 总结

本策略通过布林带判断趋势方向,Stoch RSI进行入场时机优化,实现了多指标组合带来的交易优势。但也存在参数优化难度大,信号准确性有待提高等问题。我们可以通过严格的回测来优化参数,加入确认指标进行过滤,并不断根据回测结果修正策略规则,从而在提高信号准确性的同时,保持组合指标组合判断的优势性。只有不断学习和优化,才能使策略更稳定和可靠。

|| 

## Overview

This strategy combines the Bollinger Bands and Stoch RSI indicators for multiple indicator trading. It belongs to the typical combined indicators strategy type. The Bollinger Bands determine trend direction and the Stoch RSI optimizes entry timings for trade signals.

## Strategy Logic

The strategy is based on two main indicators:

1. Bollinger Bands

   Calculate the upper, middle and lower bands. A buy signal is generated when price breaks above the lower band.
   
2. Stoch RSI

   Calculate the Stoch RSI indicator. A buy signal is generated when the K line crosses above the D line.
   
The specific trading logic is: open long when both the Bollinger Bands lower breakout and Stoch RSI golden cross occur together.

The exit logic uses the bands for take profit and stop loss: close for profit when price touches the upper or middle band again, close for loss when price breaks back below the lower band. 

## Advantages 

- Combines Bollinger Bands and Stoch RSI
- Bands judge overall trend, Stoch RSI optimizes entry
- Stoch RSI filters false band breakouts
- Middle and lower bands provide exits
- Multiple adjustable parameters for optimizations

## Risks

- MA-based indicators lag, missing best entries 
- Purely indicator-driven, slow reaction to sudden events
- Improper band settings invalidate stops
- Bad Stoch RSI parameters generate false signals
- Separate parameter tuning needed for different products

Risks can be reduced by:

- Optimizing parameters for higher accuracy
- Adding confirming filters like MACD
- Using trailing stops instead of band stops 
- Testing parameters for different products
- Adjusting position sizing system

## Enhancement Directions

The strategy can be improved by:

1. Optimizing Bollinger Bands parameters

   Adjust upper/lower calculation ratios for best fit
   
2. Optimizing Stoch RSI parameters

   Finding optimal K and D values
   
3. Adding confirming indicators like MACD

   Avoid false signals relying on single indicator
   
4. Using trailing profit stops instead of fixed stops

   Trail stops based on price volatility
   
5. Testing parameters separately for different products

   Optimal parameters vary across different products

## Summary 

This strategy leverages the Bollinger Bands for trend direction and Stoch RSI for entry optimization, taking advantage of a multi-indicator approach. But challenges like difficult parameter optimization and signal accuracy exist. Rigorous backtesting for parameter optimization, adding filters, and continuously adjusting rules based on results can improve accuracy while retaining the strengths of a combined system. Persistent optimizations lead to robustness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|bblength|
|v_input_2|2|Multiplier for BB Upper Band|
|v_input_3|2|Multiplier for BB Lower Band|
|v_input_4|6|lengthrsi|
|v_input_5|20|overSold|
|v_input_6|70|overBought|
|v_input_7|3|smoothK|
|v_input_8|3|smoothD|
|v_input_9|14|lengthRSI|
|v_input_10|14|lengthStoch|
|v_input_11_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_12|6|monthfrom|
|v_input_13|12|monthuntil|
|v_input_14|true|dayfrom|
|v_input_15|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

strategy(title = "BB+RSI v2", overlay = true)

price=close
////////// ///////  BB /////////////////////////

bblength = input(50)
bbupmult =input(2,step=0.1,title="Multiplier for BB Upper Band")
bblowmult = input(2,step=0.1,title="Multiplier for BB Lower Band")

basis =  sma(close,bblength)

devup = bbupmult * stdev(close, bblength)
devlow = bblowmult * stdev(close, bblength)

upper = basis + devup
lower = basis - devlow
plot(basis, color=red)
p1 = plot(upper, color=blue)
p2 = plot(lower, color=blue)
fill(p1, p2)


bbbuy= crossover(price,lower)
bbsell = crossunder(price,upper) or price>upper or crossunder(price,basis)



//////////////////// BB //////////////////////




////////////////////////  S RSI  /////////////////////

lengthrsi = input(6)
overSold = input( 20 )
overBought = input( 70 )
vrsi = rsi(price, lengthrsi)

smoothK = input(3, minval=1)
smoothD = input(3, minval=1)
lengthRSI = input(14, minval=1)
lengthStoch = input(14, minval=1)
src = input(close, title="RSI Source")

rsi1 = rsi(src, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)

SRSIbuy=crossover(k,d)

////////////////////// S  RSI  ///////////////////////

// Conditions



longcond = bbbuy and SRSIbuy
closelong = bbsell


monthfrom =input(6)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)



if (  longcond ) 
    strategy.entry("BUY", strategy.long, stop=close, oca_name="TREND",  comment="BUY")
    
else
    strategy.cancel(id="BUY")


if ( closelong  ) 

    strategy.close("BUY")






```

> Detail

https://www.fmz.com/strategy/427515

> Last Modified

2023-09-21 21:02:02
