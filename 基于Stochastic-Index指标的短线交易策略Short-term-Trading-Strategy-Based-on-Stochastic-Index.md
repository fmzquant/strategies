
> Name

基于Stochastic-Index指标的短线交易策略Short-term-Trading-Strategy-Based-on-Stochastic-Index

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19b88bf73be34ea91eb.png)
 [trans]
## 概述

本策略基于Stochastic Index(SMI)指标设计了一个短线交易策略,主要用于股票和数字货币的短线交易。该策略融合了Stochastic Index指标的超买超卖信号和移动平均线的确认,可以在趋势市场中捕捉中间回调提供较好的入场点位。

## 策略原理  

该策略主要利用Stochastic Index指标来判断市场的超买超卖区域。Stochastic Index指标的计算公式是:

SMI = (MA(Close - LL)/(HH - LL)) * 100

其中,LL是N日内的最低价,HH是N日内的最高价。该指标的设计理念是,当收盘价接近N日内的最高价时,市场处于超买状态;当收盘价接近N日内的最低价时,市场处于超卖状态。

本策略中,SMA指标参数N取5和3,表示采用5日和3日的Stochastic Index。通常如果只用一个参数,容易产生错误信号,所以本策略采用双SMA双重确认,可以过滤掉一些噪音。

另外,策略中叠加了移动平均线EMA指标,参数设置为与SMI指标一致,以进一步确认SMI指标的信号,避免出现误判的情况。

## 策略优势

1. 基于Stochastic Index指标判断超买超卖区域,捕捉反转 opportunities
2. 双SMA参数设定,可以有效过滤错误信号
3. 结合EMA指标进行确认,避免误判

## 策略风险  

1. SMI指标容易形成错误信号,即使设置了双SMA和EMA指标,也无法完全规避风险
2. 趋势行情中,该策略可能会产生过多反向操作,从而影响整体收益

**风险规避:**

1. 采用止损来控制单笔损失
2. 只在 sideways 或者范围交易的市场使用该策略,避免使用在趋势性行情中

## 策略优化方向

1. 测试不同参数设置下的SMI指标,寻找最优参数组合
2. 尝试结合其他指标进行确认,如布林带、KDJ等,提高信号准确率 
3. 优化止损策略,根据市场波动性设置可变止损
4. 结合趋势判断指标,避免在趋势行情中使用

## 总结

本策略总体来说是一个适合短线交易的策略。它结合Stochastic Index指标的超买超卖特性,配合移动平均线进行信号过滤和确认,可以识别出一些短线交易机会。但该策略容易在趋势行情中产生错误信号,所以使用时需要特别注意,最好配合趋势判断指标来避免此类情况。总的来说,在盘整行情中,该策略可以捕捉一些短线交易机会,但在使用过程中,要注意风险控制,止损退出很重要。

||

## Overview

This strategy designs a short-term trading strategy based on the Stochastic Index (SMI) indicator, mainly for short-term trading of stocks and digital currencies. The strategy integrates the overbought and oversold signals of the Stochastic Index indicator and the confirmation of moving averages to capture better entry points during intermediate pullbacks in a trending market.

## Strategy Principle   

The strategy mainly uses the Stochastic Index indicator to judge the overbought and oversold zones of the market. The calculation formula of the Stochastic Index indicator is:

SMI = (MA(Close - LL)/(HH - LL)) * 100

Where LL is the lowest price in N days, HH is the highest price in N days. The design concept of this indicator is that when the closing price is close to the highest price in N days, the market is in an overbought state; when the closing price is close to the lowest price in N days, the market is in an oversold state.

In this strategy, the SMA parameter N takes 5 and 3, indicating that the 5-day and 3-day Stochastic Index are used. Usually, using only one parameter can easily generate wrong signals. Therefore, this strategy adopts double SMA double confirmation, which can filter out some noise.

In addition, the EMA indicator is superimposed in the strategy, and the parameters are set to be consistent with the SMI indicator to further confirm the signals of the SMI indicator and avoid misjudgment.

## Advantages of the Strategy  

1. Judge overbought and oversold areas based on Stochastic Index indicator to capture reversal opportunities  
2. Double SMA parameter settings can effectively filter out wrong signals  
3. Combining with EMA indicator for confirmation to avoid misjudgment

## Risks of the Strategy

1. The SMI indicator is prone to generating wrong signals. Even with double SMA and EMA indicators, the risks cannot be completely avoided.
2. In a trending market, this strategy may generate too many reverse operations, thus affecting the overall profit.

**Risk Prevention:**  

1. Use stop loss to control single loss
2. Only use this strategy in sideways or range trading markets to avoid using it in trending markets

## Optimization Directions  

1. Test SMI indicators under different parameter settings to find the optimal parameter combination  
2. Try to combine with other indicators for confirmation, such as Bollinger Bands, KDJ, etc., to improve signal accuracy  
3. Optimize stop loss strategies and set variable stop loss based on market volatility  
4. Combine with trend judgment indicators to avoid using during trending markets  

## Summary  

In general, this is a strategy suitable for short-term trading. It combines the overbought and oversold characteristics of the Stochastic Index indicator with moving average confirmation and filtering to identify some short-term trading opportunities. However, this strategy is prone to generating wrong signals in trending markets, so special attention needs to be paid when using it. It is best to use it with trend judgment indicators to avoid such situations. In general, this strategy can capture some short-term trading opportunities during range-bound markets, but attention needs to be paid to risk control and stop-loss exits during use.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|sm1|
|v_input_2|3|sm2|
|v_input_3|55|Over Bought Level 1|
|v_input_4|35|Over Bought Level 2|
|v_input_5|-55|Over Sold Level 1|
|v_input_6|-35|Over Sold Level 2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-10 00:00:00
end: 2024-01-17 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title="SMIndex Strategy", shorttitle="SMIndex Strategy", overlay=false, pyramiding=0, initial_capital=1000, currency=currency.USD)
//
sm1 = input(5, 'sm1')
sm2 = input(3, 'sm2')
//
Lower = lowest (low, sm1)
Hight = highest (high, sm1)
Downsideup = Hight - Lower
Upsidedown = close - (Hight+Lower)/2
//
ema1 = ema(ema(Upsidedown,sm2),sm2)
ema2 = ema(ema(Downsideup,sm2),sm2)
smi = ema2 != 0 ? (ema1/(ema2/2)*100) : 0
//
obLevel1 = input(55, "Over Bought Level 1")
obLevel2 = input(35, "Over Bought Level 2")
osLevel1 = input(-55, "Over Sold Level 1")
osLevel2 = input(-35, "Over Sold Level 2")
//
// h1=plot(obLevel1, color=red, title='Sell 1s 55 do', style=dashed, linewidth=2)
// h2=plot(obLevel2, color=maroon, title='Sell 2s 35 do', style=circles, linewidth=2)
// h3=plot(osLevel1, color=red, title='Buy 1s -55 up', style=dashed, linewidth=2)
// h4=plot(osLevel2, color=maroon, title='Buy 2s -35 up', style=circles, linewidth=2)
plot(smi, color=gray, style=line, linewidth=0, transp=5)
plot(ema1, color=orange, style=line, linewidth=0, transp=5)
plot(0, color=gray, style=circles, linewidth=1, title='Base Line')
//
// fill(h1, h2, color=red, transp=55)
// fill(h3, h4, color=green, transp=55)
//Strategy Long Short Entry
longEntry = (smi) < -75 or (smi) < -65 or (smi) < -55 or (smi) < -45 
shortEntry = (smi) > 75 or (smi) > 65 or (smi) > 55 or (smi) > 45 

longCondition = longEntry
if(longCondition)
    strategy.entry("long", strategy.long)
    
shortCondition = shortEntry
if(shortCondition)
    strategy.entry("short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/439266

> Last Modified

2024-01-18 16:14:34
