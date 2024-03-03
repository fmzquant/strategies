
> Name

指数平滑随机指标异动策略Exponential-Smoothed-Stochastic-Oscillator-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c66de221f3e3936631.png)
[trans]

## 概述

指数平滑随机指标异动策略是在传统的随机指标基础上,增加了一个指数权重参数,可以调整随机指标的灵敏度,从而产生交易信号。当指标从超买区反转时做多,从超卖区反转时做空。该策略优化后,可以成为一个非常稳定的趋势跟踪策略。

## 策略原理

指数平滑随机指标异动策略的核心在于指数权重参数ex。传统随机指标的计算公式是:

```
s=100 * (close - 最低价) / (最高价 - 最低价) 
```

增加指数参数后,计算公式变为:

```
exp= ex<10? (ex)/(10-ex) : 99  

s=100 * (close - 最低价) / (最高价 - 最低价)

ks=s>50? math.pow(math.abs(s-50),exp)/math.pow(50,exp-1)+50  
     :-math.pow(math.abs(s-50),exp)/math.pow(50,exp-1)+50
```

调整exp的值,可以改变s对ks的影响力度,增大exp值使指标变得更不敏感,减小exp值使指标变得更敏感。

当ks从超买区反转时产生买入信号;当ks从超卖区反转时产生卖出信号。

## 策略优势

指数平滑随机指标异动策略相比传统随机策略,具有以下优势:

1. 通过调整指数权重,可以自由调整随机指标的灵敏度,从而控制交易频率。
2. 增加指数权重后,可以过滤掉部分噪音,产生更稳定的交易信号。  
3. 结合不同时间周期指标,可以实现多时间框架的确认,提高信号的可靠性。

## 策略风险

指数平滑随机指标异动策略也存在以下风险:  

1. 在指数权重过大时,会过滤掉较多信号,错过部分交易机会。
2. 指标容易产生扰动和错误交叉,需调参确保交叉信号的可靠性。
3. 需根据不同市场确定最佳的参数范围,不当的参数设置可能影响策略表现。

## 策略优化方向  

指数平滑随机指标异动策略可以从以下几个方面进行优化:

1. 结合其他指标过滤信号,例如MACD、移动均线等,可以减少错误信号。
2. 增加止损机制,可以有效控制风险。
3. 优化指数权重参数,找到最佳的参数组合。不同市场可以设置不同的参数。
4. 增加复合화,例如与季节性指标、市场结构指标等结合,可以进一步提高策略的稳定性。

## 总结
指数平滑随机指标异动策略通过调整随机指标的灵敏度,产生更可靠的交易信号。该策略可以有效跟踪中长线趋势,也可以优化为短线策略。通过复合化和参数优化,可望获得更好的稳定收益。

||

## Overview
The Exponential Smoothed Stochastic Oscillator strategy is a modified version of the traditional stochastic indicator by adding an exponential weight parameter to adjust the sensitivity of the stochastic and generate trading signals. It goes long when the indicator crosses over from overbought levels and goes short when the indicator crosses under from oversold levels. The optimized strategy can become a very stable trend following strategy.  

## Strategy Logic
The core of the Exponential Smoothed Stochastic strategy lies in the exponential weight parameter ex. The traditional stochastic is calculated as: 

```
s = 100 * (close - lowest low) / (highest high - lowest low)
```

With the exponential parameter, the formula becomes:  

```
exp = ex<10? (ex)/(10-ex) : 99   

s = 100 * (close - lowest low) / (highest high - lowest low)  

ks = s>50? math.pow(math.abs(s-50),exp)/math.pow(50,exp-1)+50   
       :-math.pow(math.abs(s-50),exp)/math.pow(50,exp-1)+50  
```

By adjusting exp, the influence of s on ks can be changed. Increasing exp makes the indicator less sensitive while decreasing exp makes it more sensitive.  

Buy signals are generated when ks crosses over from overbought levels. Sell signals are generated when ks crosses under from oversold levels.  

## Advantages
Compared to the traditional stochastic strategy, the Exponential Smoothed Stochastic Oscillator strategy has the following advantages:  

1. The sensitivity of the stochastic can be freely adjusted by changing the exponential weight to control trading frequency.  
2. The increased exponential weight can filter out some noise and generate more stable trading signals.
3. Combining indicators from different timeframes can achieve multi-timeframe confirmation and improve signal reliability.   

## Risks 
The Exponential Smoothed Stochastic Oscillator strategy also has the following risks:   

1. With a too large exponential weight, some trading opportunities may be missed due to excessive signal filtering.  
2. The indicator is prone to noise and wrong crossovers. Parameters need to be tuned to ensure reliable crossover signals.   
3. The optimal parameter range needs to be identified for different markets. Improper parameter settings may affect strategy performance.   

## Enhancement Areas
The Exponential Smoothed Stochastic Oscillator strategy can be optimized from the following aspects:  

1. Combine with other indicators like MACD and moving average to filter signals and reduce false signals.  
2. Add stop loss mechanisms to effectively control risks.   
3. Optimize the exponential weight parameter to find the optimal parameter combinations. Different parameters can be used for different markets.  
4. Increase composability, for example, combine with seasonal indicators, market structure indicators to further improve stability.   

## Conclusion  
The Exponential Smoothed Stochastic Oscillator strategy generates more reliable trading signals by adjusting the sensitivity of the stochastic indicator. It can effectively track medium-to-long term trends and can also be optimized into a short-term strategy. With further composability and parameter optimization, it has the potential to achieve more consistent profitable returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|length|
|v_input_int_2|2|exp|
|v_input_int_3|20|bot|
|v_input_int_4|80|top|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-11 00:00:00
end: 2024-01-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © faytterro

//@version=5
strategy("Exponential Stochastic Strategy", overlay=false, default_qty_type=strategy.percent_of_equity, default_qty_value=100)
len=input.int(14, "length") 
ex=input.int(2, title="exp", minval=1, maxval=10)
exp= ex<10? (ex)/(10-ex) : 99
s=100 * (close - ta.lowest(low, len)) / (ta.highest(high, len) - ta.lowest(low, len))
ks=s>50? math.pow(math.abs(s-50),exp)/math.pow(50,exp-1)+50 :
 -math.pow(math.abs(s-50),exp)/math.pow(50,exp-1)+50
plot(ks, color= color.white)
bot=input.int(20)
top=input.int(80)
longCondition = ta.crossover(ks, bot) and bar_index>0
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = ta.crossunder(ks, top) and bar_index>0
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
//    strategy.close("My Long Entry Id")
alertcondition(longCondition, title = "buy")
alertcondition(shortCondition, title = "sell")
h1=hline(top)
h2=hline(bot)
h3=hline(100)
h4=hline(0)
fill(h1,h3, color= color.rgb(255,0,0,200-top*2))
fill(h2,h4, color= color.rgb(0,255,0,bot*2))
```

> Detail

https://www.fmz.com/strategy/439246

> Last Modified

2024-01-18 15:53:41
