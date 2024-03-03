
> Name

双MACD随机指标交易策略Dual-MACD-StochRSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略结合双MACD指标和随机指标StochRSI进行交易信号判断。双MACD采用不同参数设置实现快慢效应,StochRSI用于强势背驰验证。策略还加入趋势判断及止损条件控制风险。

## 策略原理

该策略的交易信号判断基于以下指标:

- 双MACD:快速MACD采用短周期参数,慢速MACD采用长周期参数,实现不同的平滑效果。

- StochRSI:计算一定周期内RSI的最高低值,判断RSI是否处于超买超卖状态。

交易信号判断规则:

- 做多:快速MACD上穿零轴且慢速MACD上穿零轴,StochRSI处于超卖状态且K线上穿D线,且处于上升趋势。

- 做空:快速MACD下穿零轴且慢速MACD下穿零轴,StochRSI处于超买状态且K线下穿D线,且处于下降趋势。

## 策略优势

- 双MACD验证可避免假突破,提高信号质量。

- StochRSI判断超买超卖状态,避免追涨杀跌。

- 考虑大趋势方向,减少逆势交易损失。

- 实现指标多时间框架验证,提高信号有效性。

- 设置止损条件控制风险。

## 风险分析

- MACD容易产生假信号,需进一步过滤验证。

- StochRSI参数设置不当可能错过交易机会。

- 止损点设置不合理可能过于保守或激进。

- 缺乏持仓管理策略,无法动态止损。

可从以下方面进行优化:

1. 增加交易量或均线角度等过滤条件。

2. 优化StochRSI参数或引入其它随机指标。

3. 动态调整止损点,跟踪止损。

4. 增加仓位管理模块,根据策略表现动态调整仓位。

## 策略优化方向

该策略的主要优化方向:

1. 优化指标参数,提高指标效果。

2. 增加筛选条件,过滤假信号。

3. 优化止损策略,实现动态止损。

4. 引入仓位管理,根据策略效果调整仓位。

5. 增加机器学习模块,利用大数据自动优化。

## 总结

该策略综合考虑多种指标,形成较强的交易信号。但仍需优化参数设置、进一步过滤信号、动态止损等方面,以减少不必要交易,提高获利概率。整体来说策略思路合理,有良好的优化空间。

||


## Overview

This strategy combines dual MACD indicators and the StochRSI oscillator for trade signals. The dual MACD uses different parameters for fast and slow effects, while StochRSI verifies momentum divergence. Trend filters and stop loss are also added to control risk.

## Strategy Logic

The trade signals are based on:

- Dual MACD: Fast MACD uses short lookback period, slow MACD uses long lookback period for smoothing effects.

- StochRSI: Calculates RSI high/low range to identify overbought/oversold RSI levels.

Entry rules:

- Long: Fast MACD crosses above zero line and slow MACD crosses above zero line. StochRSI is oversold and K crosses above D. In uptrend.

- Short: Fast MACD crosses below zero line and slow MACD crosses below zero line. StochRSI is overbought and K crosses below D. In downtrend.

## Advantages

- Dual MACD avoids false breakouts for higher signal quality.

- StochRSI identifies overbought/oversold levels to avoid chasing.

- Considers overall trend direction to reduce countertrend losses.

- Cross-timeframe validation improves signal effectiveness. 

- Stop loss controls risk.

## Risks

- MACD prone to false signals, needs further validation.

- Poor StochRSI parameters may miss trades.

- Stop loss levels may be too conservative or aggressive.

- Lacks position management for dynamic stops.

Improvements:

1. Add filters like volume or MA slope.

2. Optimize or add other oscillators.

3. Dynamic stop loss tracking.

4. Add position sizing based on performance.

## Optimization

Main areas to optimize:

1. Optimize indicator parameters.

2. Add filters to remove false signals. 

3. Optimize stops for dynamic trailing.

4. Incorporate position sizing based on strategy performance. 

5. Add machine learning for auto optimization.

## Summary

The strategy combines multiple indicators for stronger signals, but needs optimization in parameters, filtering, dynamic stops to reduce unwanted trades and improve profitability. Overall the logic is sound with good optimization potential.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Uncheck to use custom res./intrv. for 2nd MACD indicator|
|v_input_2|45|Resolution/interval to use for 2nd MACD:|
|v_input_3|true|Uncheck to use custom res/intrv for StochRSI|
|v_input_4|45|Resolution to use for StochRSI indicator:|
|v_input_5|10|MACD fast length|
|v_input_6|21|MACD slow length|
|v_input_7|9|MACD signal length|
|v_input_8|31|2nd MACD fast length|
|v_input_9|63|2nd MACD slow length|
|v_input_10|30|2nd MACD signal length|
|v_input_11|3|smoothK|
|v_input_12|3|smoothD|
|v_input_13|11|lengthRSI|
|v_input_14|11|lengthStoch|
|v_input_15|90|RSI_buyTrig|
|v_input_16|20|RSI_sellTrig|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-14 00:00:00
end: 2023-09-21 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2



//This strategy is an ongoing work in progress. Last updated 8/6/16.
//Feel free to modify it as you see fit, if you do borrow code then send me a link so I 
//can see and maybe borrow some of your code to improve this.
//Thanks to ChrisMoody who I stole the code for setting custom resolution from.
//
//more info in comments at end of script





strategy("MACDouble & StochRSI w/ safeties v0.3", overlay=true)

source = close
useCurrentRes = input(true, title="Uncheck to use custom res./intrv. for 2nd MACD indicator")
resCustom = input(title="Resolution/interval to use for 2nd MACD:",  defval="45")
res = useCurrentRes ? timeframe.period : resCustom

useCurrentRes2 = input(true, title="Uncheck to use custom res/intrv for StochRSI")
resCustom2 = input(title="Resolution to use for StochRSI indicator:",  defval="45")
res2 = useCurrentRes2 ? timeframe.period : resCustom2


//MACD1
fastLength = input(10, title="MACD fast length")
slowlength = input(21, title="MACD slow length")
sigLength = input(9, title="MACD signal length")

MACD = ema(source, fastLength) - ema(source, slowlength)
signal = sma(MACD, sigLength)
delta = MACD - signal



//MACD2
fastLength2 = input(31, title= "2nd MACD fast length")
slowlength2 = input(63, title= "2nd MACD slow length")
sigLength2 = input(30, title= "2nd MACD signal length")

MACD2 = ema(source, fastLength2) - ema(source, slowlength2)
signal2 = sma(MACD2, sigLength2)
delta2 = MACD2 - signal2

MACDRes = security(syminfo.tickerid, res, MACD2)
signalRes = security(syminfo.tickerid,res, signal2)
deltaRes = security(syminfo.tickerid, res, delta2)


uptrend = (close + high)/(close[1] + high[2])
downtrend = (close + low)/(close[1] + low[2])

smoothK = input(3, minval=1)
smoothD = input(3, minval=1)
lengthRSI = input(11, minval=1)
lengthStoch = input(11, minval=1)
src = close

rsi1 = rsi(src, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)
RSI_buyTrig = input(90)
RSI_sellTrig = input(20)

kRes = security(syminfo.tickerid, res2, k)
dRes = security(syminfo.tickerid, res2, d)


if (delta > 0) and (year>2012) and (deltaRes > 0) and (uptrend > 1) and (  kRes and dRes < RSI_buyTrig) and (kRes > dRes)
    strategy.entry("buy", strategy.long, comment="buy")
    

if (delta < 0) and (year>2012) and (deltaRes < 0) and (downtrend < 1) and ( kRes and dRes > RSI_sellTrig) and (kRes < dRes)
    strategy.entry("sell", strategy.short, comment="sell")
	strategy.exit("sell", loss = 9000)



//  RELEASE NOTES, ETC
//
// The core starting idea for this backtesting script came from the desire to have two traditional
//MACD indicators: one 'fast' and one 'slow'. The slow one is to pretty much smooth out noisy signals
//so that short term changes in price are ignored (ideally). 
//	A brief version history
//		v0.1 - Basic two MACD indicators script
//      v0.2 - Added StochRSI indicator
//      v0.21- Added primitive uptrend/downtrend safety condition 
//      v0.22- Added changable time resolution for MACDslow
//      v0.23- Added exit safeties conditional on loss threshold   
//      v0.3 - Added changeable resolution for StochRSI
//	Future changes planned for next release:
//		-Fine tuning exit safeties
//      -Major overhaul of trade logic/triggers (may be forked as a different script)
//
//I am more than happy to discuss any difficulties you are having, questions about the script, or improvement suggestions.
//I am not a coder and my background is actually in economics, so feel free to debug ;)
//Feel free to tip me on the indcluded bitcoin address on TV as well
// tradingview.com/u/RyanMartin 
// rjmarti2@millersville.edu

```

> Detail

https://www.fmz.com/strategy/427613

> Last Modified

2023-09-22 16:55:55
