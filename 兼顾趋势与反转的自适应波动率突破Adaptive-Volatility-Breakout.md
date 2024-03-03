
> Name

兼顾趋势与反转的自适应波动率突破Adaptive-Volatility-Breakout

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10f7522d5fe527e9c72.png)
 [trans]

## 概述

该策略首先结合量价指标VFI和移动平均线构建趋势判断,再结合布林带指标判断反转事件,实现了趋势交易与震荡交易的有机结合。

## 策略原理

该策略主要由以下几部分组成:

1. VFI指标判断趋势。结合典型价格的对数变化率和交易量变化判断价格趋势,实现量价合理匹配。

2. EMA差值指标判断趋势。计算20日线与50日线的差值比例,判断中长线趋势方向。

3. 布林带指标判断反转。布林带中轨为20日简单移动平均线,带宽为中轨1.5倍标准差。价格突破上下轨时发出交易信号。

4. VFI指标幅度判断反转。VFI值接近上下限(0、20)时认为趋势反转的可能性较大。

在满足交易时间段的条件下,当价格突破布林带上轨,且VFI、EMA差值指标同向看涨时,做多;当价格跌破布林带下轨,或VFI达到某一阈值时,平仓。

## 策略优势

1. VFI指标的引入,使量价关系匹配更加合理,避免盲目跟随价格。

2. EMA差值的判断和VFI结合,使趋势判断更为稳定可靠。

3. 布林带与VFI指标的反转判断相结合,使策略更适合市场的双向波动。

## 策略风险

1. 量价指标并不能完全避免假突破的风险。

2. EMA差值存在一定滞后,无法对短期转折作出及时反应。

3. 布林带参数设置不当可能导致交易频繁或captured market的风险。

对应风险的解决方法:

1. 结合更多指标判断趋势,避免单一指标依赖。

2. EMA参数不宜过大或过小,适当调整参数。

3. 测试不同市场情况下布林带参数变化对策略的影响。

## 策略优化方向

1. 继续优化VFI参数,使其更灵敏。

2. 增加基于价格通道或Envelopes指标的突破判断。

3. 测试更多量价指标的引入,如OBV、PVT等。

4. 引入机器学习和AI技术,实现参数的动态优化。

## 总结

该策略综合考虑了趋势判断与反转判断,运用VFI、EMA差值与布林带指标,实现了对市场双向波动的捕捉。下一步将继续优化参数设置,丰富判断依据,扩大适用范围,提高策略稳定盈利能力。

||

## Overview

This strategy combines the trend-following metrics VFI and Moving Averages with the reversal indicator Bollinger Bands to adaptively catch trends and reversals in the market.

## Strategy Logic

The main components of this strategy are:

1. VFI indicator to determine the trend. It uses the logarithmic rate of change of typical price and trading volume to reasonably match price and volume.

2. EMA difference indicator to determine trend. It calculates the percentage difference between 20-day EMA and 50-day EMA to judge the mid-long term trend direction.  

3. Bollinger Bands to detect reversals. The middle band is 20-day SMA, and the width of the bands is 1.5 standard deviation of the middle band. Trading signals are generated when price breaks the upper or lower band.

4. VFI amplitude to detect exhaustion. When VFI is approaching its limits (0, 20), the probability of trend reversal is considered to be higher.

When price breaks above the upper Bollinger Band and VFI and EMA difference indicates upward trend, go long. When price breaks below the lower band or VFI reaches a threshold, close position.

## Advantages

1. The introduction of VFI makes the price-volume relationship more reasonable and avoids blindly following prices.

2. The combination of EMA difference and VFI makes trend determination more reliable. 

3. The combination of Bollinger Bands and VFI makes the strategy more adaptable to the two-way fluctuations in the market.

## Risks

1. Volume-price indicators cannot completely avoid the risk of false breakouts.

2. EMA difference has some lag and cannot react timely to short-term turns.

3. Improper parameters of Bollinger Bands may lead to overtrading or capturing the market.

Solutions:

1. Combine more indicators to determine the trend to avoid relying on a single one.  

2. Adjust EMA parameters to proper values.

3. Test the impacts of Bollinger parameters on the strategy in different market conditions.


## Optimization Directions  

1. Continue optimizing VFI parameters to make it more sensitive.

2. Add breakout judgment based on price channels or Envelopes indicator. 

3. Test the introduction of more volume-price indicators like OBV, PVT etc.

4. Introduce machine learning and AI techniques to realize dynamic parameter optimization.

## Conclusion

This strategy comprehensively considers trend following and reversal detection with VFI, EMA difference and Bollinger Bands to catch two-way market fluctuations. The next step is to continue optimizing parameters, enrich judgment metrics, expand applicability, and improve profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|130|VFI length|
|v_input_2|0.2|coef|
|v_input_3|2.5|Max. vol. cutoff|
|v_input_4|5|signalLength|
|v_input_5|0400-0935|pre|
|v_input_6|0945-1700|trade_session|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © beststockalert

//@version=4

strategy(title="Super Bollinger Band Breakout", shorttitle = "Super BB-BO", overlay=true)
source = close

length = input(130, title="VFI length")
coef = input(0.2)
vcoef = input(2.5, title="Max. vol. cutoff")
signalLength=input(5)


// session 


pre = input( type=input.session, defval="0400-0935")
trade_session = input( type=input.session, defval="0945-1700")
use_trade_session = true
isinsession = use_trade_session ? not na(time('1', trade_session)) : true


is_newbar(sess) =>
    t = time("D", sess)
    not na(t) and (na(t[1]) or t > t[1])


is_session(sess) =>
    not na(time(timeframe.period, sess))

preNew = is_newbar(pre)
preSession = is_session(pre)

float preLow = na
preLow := preSession ? preNew ? low : min(preLow[1], low) : preLow[1]

float preHigh = na
preHigh := preSession ? preNew ? high : max(preHigh[1], high) : preHigh[1]



//   vfi 9lazybear 
ma(x,y) => 0 ? sma(x,y) : x

typical=hlc3
inter = log( typical ) - log( typical[1] )
vinter = stdev(inter, 30 )
cutoff = coef * vinter * close
vave = sma( volume, length )[1]
vmax = vave * vcoef
vc = iff(volume < vmax, volume, vmax) //min( volume, vmax )
mf = typical - typical[1]
vcp = iff( mf > cutoff, vc, iff ( mf < -cutoff, -vc, 0 ) )

vfi = ma(sum( vcp , length )/vave, 3)
vfima=ema( vfi, signalLength )


//ema diff


ema20 = ema(close,20)
ema50 = ema(close,50)


diff = (ema20-ema50)*100/ema20
ediff = ema(diff,20)

//
basis = sma(source, 20)
dev = 1.5 * stdev(source, 20)

upper = basis + dev
lower = basis - dev


ema9 = ema(source, 9)

if ( ((crossover(source, upper) and diff>ediff and diff>0) or (close>upper and (vfi >0 or vfima>0 or ediff>0.05) and (vfi<14 or vfima<14)) ))
    strategy.entry("Long", strategy.long)


if (crossunder(source, lower) or vfi>19 or vfima>19 or diff<(ediff+0.01) )
    strategy.close("Long")


```

> Detail

https://www.fmz.com/strategy/439961

> Last Modified

2024-01-25 12:43:43
