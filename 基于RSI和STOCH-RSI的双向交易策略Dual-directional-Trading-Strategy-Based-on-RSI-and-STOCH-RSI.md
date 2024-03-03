
> Name

基于RSI和STOCH-RSI的双向交易策略Dual-directional-Trading-Strategy-Based-on-RSI-and-STOCH-RSI

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/190ff29c04906639469.png)
[trans]

## 概述

该策略结合了相对强弱指数(RSI)和Stoch RSI这两个强大的技术指标,实现了一个较为稳定和可靠的双向交易策略。当RSI指标显示超买超卖信号并且Stoch RSI发出金叉死叉交易信号时,该策略将入场做多或做空。

## 策略原理

该策略主要基于RSI和Stoch RSI两个指标。RSI用于判断市场是否处于超买超卖状态。Stoch RSI用于发出具体的交易信号。

首先,通过RSI判断市场是否超买超卖。如果RSI高于设定的超买线则判断为超买,如果RSI低于设定的超卖线则判断为超卖。

其次,Stoch RSI发出交易信号。当快线从下向上突破慢线时产生买入信号;当快线从上向下突破慢线时产生卖出信号。

最后,只有当RSI显示超买超卖的同时Stoch RSI发出信号,该策略才会进入场内交易。做多信号为RSI显示超卖并且Stoch RSI金叉;做空信号为RSI显示超买并且Stoch RSI死叉。

## 优势分析

该策略结合RSI和Stoch RSI两个指标的优势,既考虑了市场总体走势,又关注细节变化从而发出交易信号,做到了更加可靠。

RSI指标能够有效判断市场是否处于超买超卖状态,避免在市场顶部追高和市场底部追低。Stoch RSI指标考察RSI的动量变化,能够及时捕捉转折点。两者的结合,既保证了交易信号的可靠性,也确保了入场的时间点。

此外,该策略加入了时间和价格过滤条件,进一步减少了错误交易的概率,使整个策略更加稳健。

## 风险分析

该策略主要依赖RSI和Stoch RSI两个指标,这两个指标都对市场变化较为敏感,可能会频繁发送错误信号。此外,指标之间也可能会产生背离。这些都可能导致策略交易频率较高,且获利不稳定。

为降低这些风险,可适当调整RSI和Stoch RSI的参数,增加过滤条件等,使策略参数更加匹配市场特征;也可以加入其他指标进行验证,避免仅凭一个指标的信号入场。

## 优化方向

该策略可从以下几个方面进行进一步优化:

1. 加入移动止损策略,以锁定利润并减少亏损;

2. 优化RSI和Stoch RSI参数,使其更符合不同周期和不同品种的特点;

3. 增加更多过滤条件,如加大交易周期时间范围,降低交易频率等;

4. 结合其它指标进行信号验证,避免单一指标判断失误;

5. 进行回测优化,寻找最佳参数组合。

## 总结

该策略综合运用RSI和Stoch RSI两个指标的优势,实现了一个双向交易的策略框架。相比单一使用某个指标,该策略判断更加全面和可靠,避免了许多不必要的错误信号。通过进一步的优化,该策略可以成为一个稳定盈利的量化交易策略。

||

## Overview

This strategy combines the powerful Relative Strength Index (RSI) and Stoch RSI technical indicators to implement a relatively stable and reliable dual-directional trading strategy. When the RSI indicator shows overbought or oversold signals and the Stoch RSI generates golden cross and death cross trading signals, the strategy will enter long or short positions.

## Strategy Logic  

This strategy is mainly based on the RSI and Stoch RSI indicators. RSI is used to determine whether the market is overbought or oversold. Stoch RSI is used to generate specific trading signals.

Firstly, RSI judges whether the market is overbought or oversold. If RSI is above the overbought line, the market is considered overbought. If RSI is below the oversold line, the market is considered oversold.  

Secondly, Stoch RSI generates trading signals. When the fast line crosses above the slow line from below, a buy signal is generated. When the fast line crosses below the slow line from above, a sell signal is generated.

Finally, the strategy will only enter the market when RSI shows overbought/oversold conditions and Stoch RSI generates signals at the same time. The long signal is RSI oversold and Stoch RSI golden cross, while the short signal is RSI overbought and Stoch RSI death cross.

## Advantage Analysis  

The strategy combines the advantages of both RSI and Stoch RSI indicators, taking into account both overall market trends and detailed changes to generate more reliable trading signals, avoiding unnecessary false signals.

RSI can effectively determine whether the market is overbought or oversold, avoiding chasing tops and bottoms. Stoch RSI examines the momentum change of RSI to capture turning points in a timely manner. The combination ensures both the reliability of trading signals and proper entry timing.

In addition, time and price filters are added to further reduce the probability of erroneous trades and enhance the robustness of the whole strategy.

## Risk Analysis

The strategy relies mainly on RSI and Stoch RSI, which are sensitive to market changes. This may result in frequent false signals and divergence between indicators, leading to high trading frequency and unstable profits.

To mitigate such risks, parameters of RSI and Stoch RSI can be adjusted to better fit market characteristics, and more filters can be added. Verification with other indicators should also be considered before taking signals from one single indicator.

## Optimization Directions  

The strategy can be further optimized in the following aspects:

1. Add moving stop loss to lock in profits and reduce losses.

2. Optimize RSI and Stoch RSI parameters to suit different periods and products. 

3. Add more filters like larger time frames and lower trading frequency.

4. Incorporate other indicators for signal verification to avoid errors.

5. Backtest optimization for the best parameter combination.

## Conclusion  

The strategy leverages the strengths of both RSI and Stoch RSI to establish a dual-directional trading framework, providing more comprehensive and reliable signal generation compared to using a single indicator, avoiding many unnecessary false signals. With further optimization, it can become a steady profitable quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|lengthrsi|
|v_input_2|20|overSold|
|v_input_3|70|overBought|
|v_input_4|3|smoothK|
|v_input_5|3|smoothD|
|v_input_6|14|lengthRSI|
|v_input_7|14|lengthStoch|
|v_input_8_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|20|srsilow|
|v_input_10|80|srsiup|
|v_input_11|2018|yearfrom|
|v_input_12|2039|yearuntil|
|v_input_13|6|monthfrom|
|v_input_14|12|monthuntil|
|v_input_15|true|dayfrom|
|v_input_16|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-31 00:00:00
end: 2023-11-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version= 2
strategy("RSI+STOCHRSI v2", overlay=true)
lengthrsi = input(10)
overSold = input( 20 )
overBought = input( 70 )
price = ohlc4
vrsi = rsi(price, lengthrsi)

smoothK = input(3, minval=1)
smoothD = input(3, minval=1)
lengthRSI = input(14, minval=1)
lengthStoch = input(14, minval=1)
src = input(close, title="RSI Source")

rsi1 = rsi(src, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)
srsilow=input(20)
srsiup=input(80)






yearfrom = input(2018)
yearuntil =input(2039)
monthfrom =input(6)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)



if (  ( crossover(d,k)) and ( (vrsi<overSold) or crossover(vrsi,overSold) )  and   year >= yearfrom and year <= yearuntil and month>=monthfrom and month <=monthuntil and dayofmonth>=dayfrom and dayofmonth < dayuntil) 
    strategy.entry("BUY", strategy.long, stop=close, oca_name="TREND",  comment="BUY")
    
else
    strategy.cancel(id="BUY")


if ( ( crossunder(d,k) ) and ( (vrsi >overBought) or crossunder(vrsi,overBought) ) and   year >= yearfrom and year <= yearuntil and month>=monthfrom and month <=monthuntil and dayofmonth>=dayfrom and dayofmonth < dayuntil ) 

    strategy.entry("SELL", strategy.short,stop=close, oca_name="TREND",  comment="SELL")
else
    strategy.cancel(id="SELL")
    
    
    
```

> Detail

https://www.fmz.com/strategy/433965

> Last Modified

2023-12-01 18:06:23
