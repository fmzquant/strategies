
> Name

动量指标多空策略Momentum-Indicator-Long-Short-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11c7095f3715da8ad84.png)

[trans]

## 概述

该策略运用平均向导(ADX)、顺势指标(DMI)以及商品路径指数(CCI)等动量指标,判断趋势方向,进行趋势追踪。当ADX和趋向指标确认趋势形成时,在CCI过冲的时候建立头寸。

## 策略原理

1. 计算ADX,DMI和CCI指标。

    - ADX用于判断趋势力度,当ADX高于设定阈值时,认为趋势足够强劲。
    - DMI包括DI+和DI-,分别表示上升趋势和下降趋势的力度。当DI+高于DI-,认为处于上升趋势,反之则为下降趋势。
    - CCI用于判断超买超卖情况。当CCI低于-100时为超卖,高于100时为超买。

2. 判断趋势方向。

    - 当DI+上穿DI-,判定为上升趋势。
    - 当DI-下穿DI+,判定为下降趋势。

3. 进入场内。

    - 当上升趋势形成,ADX高于阈值,且CCI低于-100时,做多入场。
    - 当下降趋势形成,ADX高于阈值,且CCI高于100时,做空入场。

4. 出场止损。

    - 做多时,当DI-下穿DI+时清仓。
    - 做空时,当DI+上穿DI-时清仓。

## 策略优势分析

1. 使用ADX判断趋势强弱,避免在无明显趋势时无谓交易。

2. 使用DMI确定趋势方向,减少错误判断的概率。 

3. 在CCI过冲时入场,可以及时捕捉趋势转折点,降低入场风险。

4. 动量指标组合使用,可以提高判断准确率。

5. 有止损机制,可以限制每单损失。

## 风险与对冲

1. ADX回落时,会有多次焦虑交易导致亏损。可以适当调高ADX入场阈值,确保趋势足够明显。

2. DMI指标存在滞后,可能错过趋势早期机会。可以配合其他指标或图形技术分析确定入场时机。

3. CCI容易产生频繁交易。可以适当放宽CCI阈值幅度,过滤掉部分噪音。

4. 做多做空同时持有头寸时,可考虑采用股票市场中性策略,制定套期保值规则,降低整体仓位风险。

## 策略优化方向

1. 优化ADX参数,找到最佳平衡点 between filtering noise and catching trend in time.

2. 优化DMI参数,平衡滞后性和灵敏度。

3. 优化CCI参数,平衡交易频率和捕捉反转的能力。

4. 测试增加或修改其他指标,寻找更好的组合效果。例如MACD,KDJ等。

5. 对交易品种进行测试,找到最佳适配的品种。

6. 优化仓位管理策略,在保持跟踪趋势能力的前提下,控制风险。

## 总结

该策略利用ADX判断趋势,DMI确定方向,CCI定位反转点的思路进行趋势跟踪交易,具有较强的逻辑性。但仍需针对参数进行优化,并配合仓位管理来控制风险。如果各参数调整到恰当水平,在趋势明显的品种上应用,该策略有望获取稳定收益。但交易者需要密切关注市场环境变化,动态调整参数。

||


## Overview

This strategy utilizes momentum indicators including Average Directional Index (ADX), Directional Movement Index (DMI) and Commodity Channel Index (CCI) to determine trend direction and follow trends. It enters positions when ADX and trend indicators confirm a trend, and CCI is overextended. 

## Strategy Logic

1. Calculate ADX, DMI and CCI indicators.

    - ADX measures trend strength. A high ADX indicates a strong trend.
    - DMI includes DI+ and DI-. DI+ shows uptrend strength while DI- shows downtrend strength. If DI+ is greater than DI-, it's an uptrend, and vice versa.
    - CCI judges overbought/oversold levels. Below -100 is oversold while above 100 is overbought.

2. Determine trend direction.

    - When DI+ crosses above DI-, an uptrend is identified.
    - When DI- crosses below DI+, a downtrend is identified.

3. Enter positions.

    - When uptrend forms, ADX is high, and CCI < -100, go long.
    - When downtrend forms, ADX is high, and CCI > 100, go short.

4. Exit positions with stop loss.

    - When long, exit when DI- crosses below DI+. 
    - When short, exit when DI+ crosses above DI-.

## Advantage Analysis 

1. ADX filters out trading during weak trends.

2. DMI reduces mistakes in trend identification.

3. Entering on CCI overextension improves timing and reduces risk.

4. Combining momentum indicators improves accuracy. 

5. Stop loss limits loss per trade.

## Risks and Hedging

1. Whipsaws when ADX drops. Raise ADX threshold to ensure strong enough trend.

2. DMI lags trend early stage. Add other analysis to identify opportunity.

3. High CCI trading frequency. Widen CCI range to filter noise. 

4. Consider market neutral strategy when long and short, to hedge overall position risk.

## Optimization Directions

1. Optimize ADX parameters to balance noise filtering and catching trend.

2. Optimize DMI parameters to balance lag and sensitivity.

3. Optimize CCI parameters to balance trading frequency and catching reversals. 

4. Test adding or modifying indicators for better combos. E.g. MACD, KDJ.

5. Test on different products to find best fit.

6. Optimize position sizing to control risk while maintaining trend tracking.

## Conclusion

The strategy logically uses ADX for trend, DMI for direction and CCI for reversals. But parameters need optimization and position sizing for risk control. Properly tuned and applied to trending products, it can deliver steady returns. Traders should dynamically adjust for changing markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|ADX Smoothing|
|v_input_2|14|DI Length|
|v_input_3|25|ADX Entry|
|v_input_4|20|CCI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-11-01 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("ADX Strategy", currency = "USD", initial_capital = 1000, overlay=true)
adxlen = input(9, title="ADX Smoothing")
dilen = input(14, title="DI Length")
ADX_Entry = input(25, title="ADX Entry")
dirmov(len) =>
	up = change(high)
	down = -change(low)
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, len) / truerange)
	minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, len) / truerange)
	[plus, minus]

adx(dilen, adxlen) => 
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
	[adx, plus, minus]

[sig, up, down] = adx(dilen, adxlen)
cci_length = input(20, minval=1, title="CCI Length")
cci_ma = sma(close, cci_length)
cci = (close - cci_ma) / (0.015 * dev(close, cci_length))

stop_loss = syminfo.mintick * 100


open_longs = strategy.position_size > 0
open_shorts = strategy.position_size < 0

possible_bull = false
possible_bull := not open_longs ? (possible_bull[1] and not crossunder(up,down) ? true : false) : false
possible_bear = false
possible_bear := not open_shorts ? (possible_bear[1] and not crossunder(down,up) ? true : false) : false



bool bull_entry = crossover(up,down)

if(bull_entry and up < ADX_Entry and cci < 0)
	possible_bull := true
	bull_entry := false

if(possible_bull and up > ADX_Entry and cci > -100)
	bull_entry := true

bool bear_entry = crossover(down,up)

if(bear_entry and down < ADX_Entry and cci > 0)
	possible_bear := true
	bear_entry := false

if(possible_bear and down >= ADX_Entry and cci < 100)
	bear_entry := true

strategy.entry("Short", strategy.short, qty = 1,comment="Short", stop=high[1] - stop_loss, when = bear_entry)
strategy.entry("Long", strategy.long, qty = 1, comment="Long", stop=low[1] - stop_loss, when = bull_entry )	

strategy.close_all(when = (open_shorts and (crossover(up,down) or crossover(sig,down))) or (open_longs and ( crossover(down,up) or crossover(sig, up))))

```

> Detail

https://www.fmz.com/strategy/430882

> Last Modified

2023-11-02 16:34:48
