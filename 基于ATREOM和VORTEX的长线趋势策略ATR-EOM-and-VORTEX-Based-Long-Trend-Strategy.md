
> Name

基于ATREOM和VORTEX的长线趋势策略ATR-EOM-and-VORTEX-Based-Long-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e9cd628e4939244df4.png)
[trans]
## 概述

该策略是一个长线趋势策略,用于股票和加密货币市场。它结合了ATR(平均真实波动幅度)、EOM(易动平均)和VORTEX(涡流指标)三个指标来识别趋势方向。

## 策略原理

- ATR用于衡量市场波动性。这里我们计算10周期的ATR,再通过5周期EMA平滑ATR。如果当前ATR高于EMAATR,表示目前处于高波动的行情,属于牛市;相反,则属于熊市。

- EOM属于量价指标。这里我们计算10周期的EOM。如果EOM为正,表示目前处于量能激增的行情,属于牛市;如果EOM为负,则属于熊市。  

- VORTEX代表涡流指标,用于判断长线趋势方向。我们分别计算近10周期价格波动的绝对值之和得到VMP和VMM。再用ATR求和作为归一化的分母,计算出VIP和VIM。取两者平均值,若大于1表示属于牛市,小于1为熊市。

综上,该策略通过ATR和EMAATR判断短期波动性,EOM判断量价特征,VORTEX判断长线趋势三者结合,来确定最终只做多的方向。


## 优势分析

- 该策略结合了三大类别指标来识别趋势方向,包括波动率类、量价类和趋势类,判断全面,信号较强。

- ATR和VORTEX都具有一定的平滑特征,可以有效过滤震荡行情的噪音,避免错误的多头信号。

- 只做多而不做空,可以最大限度减少短线调整带来的亏损风险。

- 作为趋势跟踪策略,它专注于捕捉中长线方向性机会,利于获取行情主要趋势的收益。

## 风险分析

- 回测数据不足,实盘表现还需验证,参数设置也需要进一步优化测试。

- 无法搜索反转或震荡行情带来的获利机会,收益上限存在一定局限。

- 纯粹的趋势策略,无法有效控制持仓风险,存在一定程度的资金锁定风险。

- 无法做空,无法对冲头寸风险,亏损空间相对较大。

## 优化方向  

- 测试不同ATR和VORTEX周期参数的稳定性。

- 尝试引入止损机制,如移动止损、时间止损等,控制单笔亏损。

- 基于ATR值设置仓位比例,高波动时减仓降低风险。

- 结合反转因子确认入场时机,避免不必要的锁定资金。


## 总结

该策略属于长线趋势跟踪策略,通过ATR、EOM和VORTEX三大指标确认趋势方向后进场,只做多而不做空,以期捕捉主趋势带来的超额收益。它具有判断综合性强、信号较清晰的优点,但也存在数据不足、风险控制能力较弱的劣势。未来可从引入止损、优化参数设置、仓位管理等方面进行改进与优化。

||

## Overview

This strategy is a long-term trend strategy for stock and cryptocurrency markets. It combines three indicators - ATR (Average True Range), EOM (Ease of Movement) and VORTEX to identify trend directions.

## Strategy Logic  

- ATR measures market volatility. Here we calculate the 10-period ATR and smooth it with a 5-period EMA. If the current ATR is above EMA of ATR, it indicates high volatility and a bull market. Otherwise, it is a bear market.

- EOM belongs to volume-price indicators. Here we calculate the 10-period EOM. If EOM is positive, it suggests increasing trading volumes and a bull market. Otherwise it is a bear market.

- VORTEX represents vortex indicator to judge long-term trend directions. We calculate the sum of absolute price fluctuations over last 10 periods to get VMP and VMM. Then use sum of ATR as denominator to normalize and obtain VIP and VIM. Average them, if greater than 1 suggests bull and less than 1 suggests bear markets.   

In summary, this strategy combines ATR/EMAATR for short-term volatility, EOM for volume-price features and VORTEX for long-term trend to determine the final long-only direction.

## Advantage Analysis

- This strategy synthesizes three major types of indicators, including volatility, volume-price and trend to identify trend directions with comprehensive judgments and strong signals.  

- Both ATR and VORTEX have smoothing features to filter out noises from ranged markets and avoid false long signals.   

- Only long without short can maximize risk avoidance from short-term pullbacks. 

- As a trend following strategy, it focuses on capturing medium-to-long term directional opportunities and benefits from the main trend.

## Risk Analysis  

- Insufficient backtest data with real-trading performance to be verified and parameters to be further optimized and tested.

- Unable to search for profit opportunities from reversals or range-bound markets, limiting profit potential.  

- Pure trend strategy cannot effectively control position risks with certain capital locking risks. 

- Unable to short for hedging with larger loss space.

## Optimization Directions

- Test stability of different periods for ATR and VORTEX. 

- Attempt to introduce stop loss methods e.g. moving stop loss, time stop loss to control single loss.

- Set position sizing based on ATR values to reduce risk in high volatility environments.   

- Incorporate mean-reversion factors to confirm entry timing and avoid unnecessary capital locking.

## Conclusion

This long-term trend following strategy enters based on confirmations from ATR, EOM and VORTEX across three categories, and only goes long without short to benefit from main trend. It has the advantage of comprehensive judgments and clear signals, but the disadvantages of insufficient data validation, weak risk control capabilities. Future improvements can be made in areas like introducing stop loss, optimizing parameter settings and position sizing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|atr_lenght|
|v_input_2|5|ema_atr_length|
|v_input_3|10|lengthEOM|
|v_input_4|10|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-11 00:00:00
end: 2024-02-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SoftKill21

//@version=4
strategy("atr+eom+vortex strat", overlay=true )

//atr and ema
atr_lenght=input(10)
atrvalue = atr(atr_lenght)


//plot(atrvalue)
ema_atr_length=input(5)
ema_atr = ema(atrvalue,ema_atr_length)

//plot(ema_atr,color=color.white)

//EOM and ema
lengthEOM = input(10, minval=1)
div = 10//input(10000, title="Divisor", minval=1)
eom = sma(div * change(hl2) * (high - low) / volume, lengthEOM)
// + - 0 long/short

//VORTEX
period_ = input(10, title="Length", minval=2)
VMP = sum( abs( high - low[1]), period_ )
VMM = sum( abs( low - high[1]), period_ )
STR = sum( atr(1), period_ )
VIP = VMP / STR
VIM = VMM / STR
avg_vortex=(VIP+VIM)/2
//plot(avg_vortex)

long= atrvalue > ema_atr and eom > 0 and avg_vortex>1 
short=atrvalue < ema_atr and eom < 0 and avg_vortex<1 

strategy.entry("long",1,when=long)
//strategy.entry("short",0,when=short)

strategy.close("long",when=short)
```

> Detail

https://www.fmz.com/strategy/442011

> Last Modified

2024-02-18 16:01:07
