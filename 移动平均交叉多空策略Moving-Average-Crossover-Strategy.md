
> Name

移动平均交叉多空策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

本策略是一个基于移动平均线交叉的多空决策系统。策略允许选择不同类型的移动平均线,并可配置长短期移动平均线参数,从而产生买入和卖出信号。另外,策略还提供了趋势过滤选项,可要求交易信号与趋势方向一致。

## 策略原理

该策略的核心逻辑基于两条移动平均线的交叉产生交易信号。具体来说:

- 当短期移动平均线上穿长期移动平均线时,产生买入信号
- 当短期移动平均线下穿长期移动平均线时,产生卖出信号

此外,策略提供了四种移动平均线类型的选择,包括简单移动平均线(SMA)、指数移动平均线(EMA)、加权移动平均线(WMA)和量化移动平均线(VWMA)。用户可以自由组合配置短期和长期均线的类型。

另外,策略还提供了三种操作模式:仅做多、仅做空和全做多空。这使得用户可以根据市场环境选择不同的交易方向。

最后,策略加入了趋势过滤功能。该功能要求交易信号必须与趋势方向一致,否则忽略该信号。具体来说,当选项设置为“Above”时,只有在价格高于趋势均线时才产生多头信号;当选项设置为“Below”时,只有在价格低于趋势均线时才产生空头信号。

## 策略优势

本策略最大的优势在于 parametric 和 flexible。移动平均线作为最基本的技术指标,被廣泛使用在量化交易中。该策略提供了高度可配置的移动平均交叉系统,使得用户可以灵活调整参数,适用于不同市场环境。

具体来说,策略的优势包括:

- 提供多种移动平均线类型的选择,可以通过调整移动平均线参数来优化系统
- 可配置长短期均线参数,适应市场的不同周期特征
- 可选择多空交易方向,可避免不利的单边市场
- 可选择是否添加趋势过滤,减少不利于趋势的交易
- 策略逻辑简单清晰,容易理解和优化

总体来说,该策略是一个非常灵活和可定制的移动平均交叉系统,用户可以根据自己对市场的判断进行调整,而不必局限于任何固定的模式。

## 策略风险

本策略的主要风险来源于:

1. 移动平均线作为延迟指标,可能产生错过价格变化的风险
2. 配置不当的参数组合可能导致过多交易而降低盈利
3. 固定使用某一行情模式,可能面临行情转变的风险

针对以上风险,本策略提供了以下解决方法:

1. 结合其他先导指标来发现价格变化,如量能指标、波动率指标等
2. 优化参数组合,使获利大于损失,控制交易频率
3. 动态调整策略参数,及时适应市场从趋势到盘整的变化

## 策略优化方向 

本策略主要可从以下几个维度进行优化:

1. 增加其他技术指标来提高系统的效率,如量能指标、布林带等
2. 添加止损策略来控制单笔损失
3. 可以基于机器学习算法动态优化参数组合
4. 增加基于市场结构的方式来判断趋势,而非简单的移动平均线
5. 结合波动率指标来动态调整仓位管理

通过以上几点优化,可以使系统拥有更好的风险管理机制、更高的稳定性,以及更强的适应市场变化的能力。

## 总结

本移动平均交叉策略是一个非常典型的趋势跟随策略。它简单、灵活、容易理解,提供了高度可配置的交易系统。用户可以根据对市场行情的判断,选择合适的移动平均线组合、调整参数、配置多空交易方向等等。当然,用户也可以在保持其趋势跟随优势的同时,通过添加其他技术指标来丰富该系统,使其成为一个更加全面和可靠的量化交易策略。

||

## Overview

This is a moving average crossover system for generating trading signals. The strategy allows selecting different types of moving averages and configuring short and long term moving average parameters to produce buy and sell signals. It also provides trend filtering options to align the trading signals with the trend direction.

## Strategy Logic

The core logic of this strategy is based on the crossover of two moving averages to generate trading signals. Specifically:

- A buy signal is generated when the short term moving average crosses above the long term moving average.

- A sell signal is generated when the short term moving average crosses below the long term moving average.

In addition, the strategy provides the option to select from four types of moving averages, including Simple Moving Average (SMA), Exponential Moving Average (EMA), Weighted Moving Average (WMA) and Volume Weighted Moving Average (VWMA). Users can freely combine and configure the short and long term moving averages.

Moreover, the strategy offers three operation modes: long only, short only and long/short. This allows users to choose the appropriate trading direction according to different market conditions.

Lastly, a trend filtering option is included. This requires the trading signals to align with the trend direction, otherwise the signal will be ignored. Specifically, when the option is set to "Above", only long signals are generated when the price is above the trend moving average. When the option is set to "Below", only short signals are generated when the price is below the trend moving average.

## Advantage Analysis

The biggest advantage of this strategy is that it is parametric and flexible. Moving averages, as one of the most basic technical indicators, are widely used in quantitative trading. This strategy provides a highly configurable moving average crossover system, so that users can flexibly adjust the parameters to suit different market conditions. 

Specifically, the advantages include:

- Providing multiple moving average types to choose from, which allows optimizing the system by adjusting the moving average parameters

- Configurable short and long term moving average periods to adapt to different market cycles

- Optional long/short trading directions to avoid unfavorable one-sided markets

- Optional trend filtering to avoid trades against the trend

- Simple and clear strategy logic that is easy to understand and optimize

In summary, this is a highly flexible and customizable moving average crossover system. Users can tailor it to their own market views by adjusting parameters, without being constrained to any fixed patterns.

## Risk Analysis

The main risks of this strategy come from:

1. Moving averages as lagging indicators may miss early price changes

2. Improper parameter combinations may result in over-trading and lower profitability

3. Sticking to fixed patterns may fail when market regime changes

To address these risks, the following solutions can be adopted:

1. Incorporate leading indicators like volume and volatility to detect early price changes

2. Optimize parameters for higher profitability and control trade frequency 

3. Dynamically adjust strategy parameters to adapt to trending and ranging markets

## Optimization Directions

The main optimization directions for this strategy are:

1. Add other technical indicators like volume and Bollinger Bands to improve efficiency

2. Incorporate stop loss to control single trade loss

3. Use machine learning algorithms to dynamically optimize parameters

4. Identify trend based on market structures rather than simple moving averages

5. Incorporate volatility indicators for dynamic position sizing

With these optimizations, the system can have better risk management, robustness, and adaptability to evolving markets.

## Conclusion

In conclusion, this moving average crossover strategy is a very typical trend following system. It is simple, flexible, easy to understand, and provides a highly configurable framework. Users can tailor it to their views on market conditions by selecting appropriate moving averages, adjusting parameters, and configuring long/short trading. Of course, they can also enrich the system by incorporating other technical indicators while keeping its core trend following merits. With proper enhancements, it can become a more comprehensive and reliable quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Long Only or Short Only or Both?: Both|Long Only|Short Only|
|v_input_2|0|Which Moving Average? (1): SMA|EMA|WMA|VWMA|
|v_input_3|0|Which Moving Average? (2): SMA|EMA|WMA|VWMA|
|v_input_4|10|Moving Average Length 1|
|v_input_5|20|Moving Average Length 2|
|v_input_6|0|Trend SMA Filter?: Above|Below|Don't Include|
|v_input_7|200|Trend SMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © GlobalMarketSignals

//@version=4
strategy("GMS: Moving Average Crossover Strategy", overlay=true)

LongShort = input(title="Long Only or Short Only or Both?", type=input.string, defval="Both", options=["Both", "Long Only", "Short Only"])
MAs1 = input(title="Which Moving Average? (1)", type=input.string, defval="SMA", options=["SMA", "EMA", "WMA", "VWMA"])
MAs2 = input(title="Which Moving Average? (2)", type=input.string, defval="SMA", options=["SMA", "EMA", "WMA", "VWMA"])
MA1 = input(title="Moving Average Length 1", type = input.integer ,defval=10)
MAL2 = input(title="Moving Average Length 2", type = input.integer ,defval=20)
AboveBelow = input(title="Trend SMA Filter?", type=input.string, defval="Above", options=["Above", "Below", "Don't Include"])
TLen = input(title="Trend SMA Length", type = input.integer ,defval=200)


////////////////////////
///////LONG ONLY////////
////////////////////////

//ABOVE

if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "SMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),sma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(sma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "SMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),ema(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(sma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "SMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),vwma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(sma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "SMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),wma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(sma(close,MA1),wma(close,MAL2)))    
   
    
///--///    

if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "EMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),sma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(ema(close,MA1),sma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "EMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),ema(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(ema(close,MA1),ema(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "EMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),vwma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(ema(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "EMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),wma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(ema(close,MA1),wma(close,MAL2)))
  
    
///--///     
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "VWMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),vwma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(vwma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "VWMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),sma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(vwma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "VWMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),ema(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(vwma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "VWMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),wma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(vwma(close,MA1),wma(close,MAL2))) 
 
    
///--///     
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "WMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),wma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(wma(close,MA1),wma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "WMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),sma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(wma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "WMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),ema(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(wma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Above" and MAs1 == "WMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),vwma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("LONG", when = crossunder(wma(close,MA1),vwma(close,MAL2)))  

    
// BELOW

if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "SMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),sma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(sma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "SMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),ema(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(sma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "SMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),vwma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(sma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "SMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),wma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(sma(close,MA1),wma(close,MAL2)))    

    
///--///    

if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "EMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),sma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(ema(close,MA1),sma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "EMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),ema(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(ema(close,MA1),ema(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "EMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),vwma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(ema(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "EMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),wma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(ema(close,MA1),wma(close,MAL2)))
     
    
///--///     
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "VWMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),vwma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(vwma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "VWMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),sma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(vwma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "VWMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),ema(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(vwma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "VWMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),wma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(vwma(close,MA1),wma(close,MAL2))) 
    
    
///--///     
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "WMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),wma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(wma(close,MA1),wma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "WMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),sma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(wma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "WMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),ema(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(wma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Below" and MAs1 == "WMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),vwma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("LONG", when = crossunder(wma(close,MA1),vwma(close,MAL2)))  
    
    
// DONT INCLUDE

if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "SMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),sma(close,MAL2)) )
    strategy.close("LONG", when = crossunder(sma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "SMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),ema(close,MAL2)) )
    strategy.close("LONG", when = crossunder(sma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "SMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),vwma(close,MAL2)) )
    strategy.close("LONG", when = crossunder(sma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "SMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),wma(close,MAL2)) )
    strategy.close("LONG", when = crossunder(sma(close,MA1),wma(close,MAL2)))    
   
    
///--///    

if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "EMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),sma(close,MAL2)) )
    strategy.close("LONG", when = crossunder(ema(close,MA1),sma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "EMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),ema(close,MAL2)) )
    strategy.close("LONG", when = crossunder(ema(close,MA1),ema(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "EMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),vwma(close,MAL2)) )
    strategy.close("LONG", when = crossunder(ema(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "EMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),wma(close,MAL2)) )
    strategy.close("LONG", when = crossunder(ema(close,MA1),wma(close,MAL2)))
    
    
///--///     
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "VWMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),vwma(close,MAL2)) )
    strategy.close("LONG", when = crossunder(vwma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "VWMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),sma(close,MAL2)) )
    strategy.close("LONG", when = crossunder(vwma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "VWMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),ema(close,MAL2)) )
    strategy.close("LONG", when = crossunder(vwma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "VWMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),wma(close,MAL2)) )
    strategy.close("LONG", when = crossunder(vwma(close,MA1),wma(close,MAL2))) 
 
    
///--///     
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "WMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),wma(close,MAL2)) )
    strategy.close("LONG", when = crossunder(wma(close,MA1),wma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "WMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),sma(close,MAL2)) )
    strategy.close("LONG", when = crossunder(wma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "WMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),ema(close,MAL2)) )
    strategy.close("LONG", when = crossunder(wma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Long Only" and AboveBelow == "Don't Include" and MAs1 == "WMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),vwma(close,MAL2)) )
    strategy.close("LONG", when = crossunder(wma(close,MA1),vwma(close,MAL2)))  


////////////////////////
///////SHORT ONLY///////
////////////////////////

//ABOVE

if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "SMA" and MAs2 == "SMA"
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),sma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(sma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "SMA" and MAs2 == "EMA"
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),ema(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(sma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "SMA" and MAs2 == "VWMA"
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),vwma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(sma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "SMA" and MAs2 == "WMA"
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),wma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(sma(close,MA1),wma(close,MAL2)))    
  
    
///--///    

if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "EMA" and MAs2 == "SMA"
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),sma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(ema(close,MA1),sma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "EMA" and MAs2 == "EMA"
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),ema(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(ema(close,MA1),ema(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "EMA" and MAs2 == "VWMA"
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),vwma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(ema(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "EMA" and MAs2 == "WMA"
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),wma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(ema(close,MA1),wma(close,MAL2)))
  
    
///--///     
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "VWMA" and MAs2 == "VWMA"
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),vwma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(vwma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "VWMA" and MAs2 == "SMA"
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),sma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(vwma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "VWMA" and MAs2 == "EMA"
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),ema(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(vwma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "VWMA" and MAs2 == "WMA"
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),wma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(vwma(close,MA1),wma(close,MAL2))) 
   
    
///--///     
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "WMA" and MAs2 == "WMA"
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),wma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(wma(close,MA1),wma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "WMA" and MAs2 == "SMA"
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),sma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(wma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "WMA" and MAs2 == "EMA"
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),ema(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(wma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Above" and MAs1 == "WMA" and MAs2 == "VWMA"
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),vwma(close,MAL2)) and close>sma(close,TLen))
    strategy.close("SHORT", when = crossover(wma(close,MA1),vwma(close,MAL2)))  
    
// BELOW

if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "SMA" and MAs2 == "SMA"
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),sma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(sma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "SMA" and MAs2 == "EMA"
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),ema(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(sma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "SMA" and MAs2 == "VWMA"
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),vwma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(sma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "SMA" and MAs2 == "WMA"
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),wma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(sma(close,MA1),wma(close,MAL2)))    
 
    
///--///    

if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "EMA" and MAs2 == "SMA"
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),sma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(ema(close,MA1),sma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "EMA" and MAs2 == "EMA"
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),ema(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(ema(close,MA1),ema(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "EMA" and MAs2 == "VWMA"
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),vwma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(ema(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "EMA" and MAs2 == "WMA"
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),wma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(ema(close,MA1),wma(close,MAL2)))
   
    
///--///     
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "VWMA" and MAs2 == "VWMA"
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),vwma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(vwma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "VWMA" and MAs2 == "SMA"
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),sma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(vwma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "VWMA" and MAs2 == "EMA"
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),ema(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(vwma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "VWMA" and MAs2 == "WMA"
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),wma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(vwma(close,MA1),wma(close,MAL2))) 
  
    
///--///     
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "WMA" and MAs2 == "WMA"
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),wma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(wma(close,MA1),wma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "WMA" and MAs2 == "SMA"
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),sma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(wma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "WMA" and MAs2 == "EMA"
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),ema(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(wma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Below" and MAs1 == "WMA" and MAs2 == "VWMA"
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),vwma(close,MAL2)) and close<sma(close,TLen))
    strategy.close("SHORT", when = crossover(wma(close,MA1),vwma(close,MAL2)))  
    
// DONT INCLUDE

if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "SMA" and MAs2 == "SMA"
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),sma(close,MAL2)) )
    strategy.close("SHORT", when = crossover(sma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "SMA" and MAs2 == "EMA"
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),ema(close,MAL2)) )
    strategy.close("SHORT", when = crossover(sma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "SMA" and MAs2 == "VWMA"
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),vwma(close,MAL2)) )
    strategy.close("SHORT", when = crossover(sma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "SMA" and MAs2 == "WMA"
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),wma(close,MAL2)) )
    strategy.close("SHORT", when = crossover(sma(close,MA1),wma(close,MAL2)))    
  
    
///--///    

if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "EMA" and MAs2 == "SMA"
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),sma(close,MAL2)) )
    strategy.close("SHORT", when = crossover(ema(close,MA1),sma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "EMA" and MAs2 == "EMA"
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),ema(close,MAL2)) )
    strategy.close("SHORT", when = crossover(ema(close,MA1),ema(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "EMA" and MAs2 == "VWMA"
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),vwma(close,MAL2)) )
    strategy.close("SHORT", when = crossover(ema(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "EMA" and MAs2 == "WMA"
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),wma(close,MAL2)) )
    strategy.close("SHORT", when = crossover(ema(close,MA1),wma(close,MAL2)))
  
    
///--///     
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "VWMA" and MAs2 == "VWMA"
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),vwma(close,MAL2)) )
    strategy.close("SHORT", when = crossover(vwma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "VWMA" and MAs2 == "SMA"
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),sma(close,MAL2)) )
    strategy.close("SHORT", when = crossover(vwma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "VWMA" and MAs2 == "EMA"
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),ema(close,MAL2)) )
    strategy.close("SHORT", when = crossover(vwma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "VWMA" and MAs2 == "WMA"
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),wma(close,MAL2)) )
    strategy.close("SHORT", when = crossover(vwma(close,MA1),wma(close,MAL2))) 
   
    
///--///     
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "WMA" and MAs2 == "WMA"
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),wma(close,MAL2)) )
    strategy.close("SHORT", when = crossover(wma(close,MA1),wma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "WMA" and MAs2 == "SMA"
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),sma(close,MAL2)) )
    strategy.close("SHORT", when = crossover(wma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "WMA" and MAs2 == "EMA"
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),ema(close,MAL2)) )
    strategy.close("SHORT", when = crossover(wma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Short Only" and AboveBelow == "Don't Include" and MAs1 == "WMA" and MAs2 == "VWMA"
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),vwma(close,MAL2)) )
    strategy.close("SHORT", when = crossover(wma(close,MA1),vwma(close,MAL2)))  

    
////////////////////////
/////// BOTH ///////////
////////////////////////

//ABOVE

if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "SMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),sma(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "SMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),ema(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "SMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),vwma(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "SMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),wma(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),wma(close,MAL2)))    
    
///--///    

if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "EMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),sma(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),sma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "EMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),ema(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),ema(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "EMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),vwma(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "EMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),wma(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),wma(close,MAL2)))
    
///--///     
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "VWMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),vwma(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "VWMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),sma(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "VWMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),ema(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "VWMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),wma(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),wma(close,MAL2))) 
    
///--///     
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "WMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),wma(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),wma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "WMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),sma(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "WMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),ema(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Above" and MAs1 == "WMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),vwma(close,MAL2)) and close>sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),vwma(close,MAL2)))  
    
// BELOW

if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "SMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),sma(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "SMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),ema(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "SMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),vwma(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "SMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),wma(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),wma(close,MAL2)))    
    
///--///    

if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "EMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),sma(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),sma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "EMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),ema(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),ema(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "EMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),vwma(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "EMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),wma(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),wma(close,MAL2)))
    
    
///--///     
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "VWMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),vwma(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "VWMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),sma(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "VWMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),ema(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "VWMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),wma(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),wma(close,MAL2))) 
   
    
///--///     
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "WMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),wma(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),wma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "WMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),sma(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "WMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),ema(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Below" and MAs1 == "WMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),vwma(close,MAL2)) and close<sma(close,TLen))
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),vwma(close,MAL2)))  
    
    
// DONT INCLUDE

if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "SMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),sma(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "SMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),ema(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "SMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),vwma(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "SMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(sma(close,MA1),wma(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(sma(close,MA1),wma(close,MAL2)))    
 
    
///--///    

if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "EMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),sma(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),sma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "EMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),ema(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),ema(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "EMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),vwma(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "EMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(ema(close,MA1),wma(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(ema(close,MA1),wma(close,MAL2)))
    
///--///     
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "VWMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),vwma(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),vwma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "VWMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),sma(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "VWMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),ema(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "VWMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(vwma(close,MA1),wma(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(vwma(close,MA1),wma(close,MAL2))) 
    
///--///     
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "WMA" and MAs2 == "WMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),wma(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),wma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "WMA" and MAs2 == "SMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),sma(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),sma(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "WMA" and MAs2 == "EMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),ema(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),ema(close,MAL2)))
    
if LongShort =="Both" and AboveBelow == "Don't Include" and MAs1 == "WMA" and MAs2 == "VWMA"
    strategy.entry("LONG", true, when = crossover(wma(close,MA1),vwma(close,MAL2)) )
    strategy.entry("SHORT", false, when = crossunder(wma(close,MA1),vwma(close,MAL2))) 
```

> Detail

https://www.fmz.com/strategy/428814

> Last Modified

2023-10-09 17:03:23
