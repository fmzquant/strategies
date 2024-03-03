
> Name

黄金VWAP-MACD-SMO交易策略Gold-VWAP-MACD-SMO-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b08c88cfd9448585fc.png)

[trans]


## 概述

黄金VWAP MACD SMO交易策略是一个在12小时时间周期下设计的完整交易策略。它结合了VWAP月线、SMO振荡器和MACD指标来识别黄金市场的交易机会。

## 策略原理

该策略使用VWAP月线作为主要的趋势指标。VWAP代表价格的平均成交价,月线意味着计算VWAP的时间范围是过去一个月。如果当前收盘价高于VWAP月线,那么表明目前是处于趋势上涨的阶段;如果收盘价低于VWAP月线,则意味着趋势正在下跌。

SMO振荡器则用来判断目前的超买超卖情况。它由一个长周期组分和一个短周期组分构成。当振荡器高于0时表示处于超买状况,而低于0时则代表超卖。

而MACD直方图可以判断动量方向。当柱子向上突破时,代表动量正转强劲,可以做多;当柱子向下突破时,意味着动量转弱,应该考虑做空。

根据这三个指标,可以建立交易策略的具体规则:

多头进入:当收盘价高于VWAP月线,MACD直方柱上涨突破,且SMO振荡器高于0时做多
空头进入:当收盘价低于VWAP月线,MACD直方柱下跌突破,且SMO振荡器低于0时做空

止盈止损根据输入的百分比设置。

## 优势分析

该策略结合多个时间范围和指标,可以有效判断趋势方向和力度,具有如下优势:

1. VWAP月线可以判断主要趋势方向,避免逆势操作
2. MACD直方图可以及时捕捉动量变化
3. SMO振荡器判断超买超卖情况,有助于在容易形成拐点的区域入场
4. 多指标组合可以相互验证,提高信号的可靠性
5. 可自定义止盈止损比例,控制风险

## 风险分析

尽管该策略设计合理,但仍存在一定的风险需要注意:

1. VWAP指标对十字异动敏感,可能产生错误信号
2. MACD参数设置不当,导致虚假突破的概率增加
3. SMO参数不当也可能导致误判超买超卖区域
4. 止盈止损设置过于宽松,无法有效控制单笔损失

为控制上述风险,应该合理优化VWAP和MACD的参数,幅度不宜过大。同时,止盈止损比例不宜过大,应控制单笔亏损在3%左右为宜。

## 优化方向

该策略还可从以下方面进行优化:

1. 增加量价确认,例如成交量突破均线
2. 结合波动率指标如ATR,根据市场波动率调整仓位
3. 在高位添加分批 lighten 机制,防止错失利润
4. 测试不同的止盈止损策略,如移动止损、环比止损等
5. 增加模型校验模块,过滤异常信号

## 总结

黄金VWAP MACD SMO策略综合多个指标判断趋势和超买超卖情况,可以有效抓住黄金的中长线机会。虽有一定的风险,但可通过参数优化和风控手段进行控制。该策略具有非常强大的延展性,可根据实际需要进行模块化优化,是一套值得长期跟踪的交易系统。

||


## Overview

The Gold VWAP MACD SMO trading strategy is a complete strategy designed for the gold market using a 12-hour timeframe chart. It combines VWAP monthly, SMO oscillator and MACD histogram to identify trading opportunities in the gold market. 

## Strategy Logic

The strategy uses VWAP monthly as the main trend indicator. VWAP represents the average transaction price, and monthly means the time range for calculating VWAP is the past month. If the current close is above the VWAP monthly, it indicates the current uptrend; if the close is below the VWAP monthly, it means the trend is down.

The SMO oscillator is used to determine the current overbought and oversold situation. It consists of a long cycle component and a short cycle component. When the oscillator is above 0, it indicates overbought conditions, and when below 0, it represents oversold.

The MACD histogram can determine the momentum direction. When the column breaks up, it represents the momentum is strengthening for going long; when the column breaks down, it means the momentum is weakening to consider going short.

According to these three indicators, the specific rules of the trading strategy can be established:

Long entry: when close is above VWAP monthly, MACD histogram breaks up, and SMO oscillator is above 0.
Short entry: when close is below VWAP monthly, MACD histogram breaks down, and SMO oscillator is below 0.

Take profit and stop loss are set based on the input percentages.

## Advantage Analysis 

The strategy combines multiple timeframes and indicators to effectively determine the trend direction and strength, with the following advantages:

1. VWAP monthly can determine the primary trend direction to avoid counter trend trading.
2. MACD histogram can capture momentum changes in a timely manner. 
3. SMO oscillator judges overbought and oversold conditions, which is helpful to enter at potential reversal points.
4. Multiple indicators combination can verify each other and improve signal reliability.
5. Customizable take profit and stop loss percentages to control risks.

## Risk Analysis

Although the strategy is designed reasonably, there are still some risks to note:

1. VWAP is sensitive to whipsaws, which may generate wrong signals.
2. Improper MACD parameters setting increases the probability of false breakouts.
3. Improper SMO parameters may also lead to misjudgement of overbought and oversold zones. 
4. Excessive wide take profit and stop loss settings cannot effectively control single loss.

To control the above risks, VWAP and MACD parameters should be optimized reasonably without too wide ranges. Also, take profit and stop loss percentages should not be too high, and single loss should be controlled around 3%.

## Optimization Directions

The strategy can also be optimized in the following aspects:

1. Add volume confirmation, such as volume breakout of MA.
2. Incorporate volatility indicators like ATR to adjust position sizing based on market volatility.
3. Add lighten mechanism at high levels to avoid missing profits.
4. Test different take profit and stop loss strategies, like trailing stop loss, adaptive stop loss etc.
5. Add model verification module to filter abnormal signals.

## Conclusion

The Gold VWAP MACD SMO strategy combines multiple indicators to determine the trend and overbought/oversold conditions, which can effectively capture medium-to-long term opportunities in gold. Although there are some risks, they can be controlled through parameter optimization and risk management. The strategy has very strong scalability and can be optimized modularly based on actual needs. It is a trading system worthy of long-term tracking.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_low|0|source: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|12|Fast Length|
|v_input_3|26|Slow Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|9|Signal Smoothing|
|v_input_6|22|Long Length SMO|
|v_input_7|6|Short Length SMO|
|v_input_8|5|Signal Line Length SMO|
|v_input_9|0.085|Take profit % for long|
|v_input_10|0.03|Stop loss % for long|
|v_input_11|0.05|Take profit % for short|
|v_input_12|0.025|Stop loss % for short|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-19 00:00:00
end: 2023-10-19 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4
// strategy("VWAP Gold strategy", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 10000, calc_on_every_tick = true, commission_type = strategy.commission.percent, commission_value = 0.005)


source = input(low)


//vwap monthly
timeframeM = time("M")
beginningM = na(timeframeM[1]) or timeframeM > timeframeM[1]

sumsourceM = source * volume
sumVolM = volume
sumsourceM := beginningM ? sumsourceM : sumsourceM + sumsourceM[1]
sumVolM := beginningM ? sumVolM : sumVolM + sumVolM[1]
vwapMonthly= sumsourceM / sumVolM

//macd
fast_length = input(title="Fast Length", type=input.integer, defval=12)
slow_length = input(title="Slow Length", type=input.integer, defval=26)
src = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)


fast_ma = ema(src, fast_length)
slow_ma = ema(src, slow_length)
macd = fast_ma - slow_ma
signal =  ema(macd, signal_length)
hist = macd - signal


//SMO
longlen = input(22, minval=1, title="Long Length SMO")
shortlen = input(6, minval=1, title="Short Length SMO")
siglen = input(5, minval=1, title="Signal Line Length SMO")
erg = tsi(close, shortlen, longlen)
sig = ema(erg, siglen)
osc = erg - sig


shortCondition =  close < vwapMonthly and hist < hist[1] and osc < 0
longCondition =  close > vwapMonthly and hist> hist[1] and osc > 0

tplong=input(0.085, step=0.005, title="Take profit % for long")
sllong=input(0.03, step=0.005, title="Stop loss % for long")
tpshort=input(0.05, step=0.005, title="Take profit % for short")
slshort=input(0.025, step=0.005, title="Stop loss % for short")

strategy.entry("long",1,when=longCondition)
strategy.entry("short",0,when=shortCondition)

strategy.exit("short_tp/sl", "long", profit=close * tplong / syminfo.mintick, loss=close * sllong / syminfo.mintick, comment='LONG EXIT',  alert_message = 'closeshort')
strategy.exit("short_tp/sl", "short", profit=close * tpshort / syminfo.mintick, loss=close * slshort / syminfo.mintick, comment='SHORT EXIT',  alert_message = 'closeshort')



```

> Detail

https://www.fmz.com/strategy/429773

> Last Modified

2023-10-20 16:23:33
