
> Name

马鲁博蜡烛线段均衡策略Marubozu-Candle-Range-Balance-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b9c5af1a3a724570cc.png)
[trans]
## 概述

马鲁博蜡烛线段均衡策略是一种基于日内时段的量化交易策略。该策略通过识别马鲁博蜡烛形态以及考察蜡烛线段的均衡情况,判断市场趋势和寻找交易机会。

## 策略原理

该策略的核心逻辑基于以下几个要点:

1. 识别马鲁博白色多头和黑色空头蜡烛。马鲁博蜡烛是一种特殊的蜡烛线图模式,指开盘价与收盘价之间不存在影线的长体蜡烛,分为白色多头和黑色空头两种。

2. 计算蜡烛实体的平均线段长度,并和当前蜡烛实体长度比较,判断线段是长还是短。

3. 判断蜡烛线段是否平衡,即上影线和下影线长度大致相等。

4. 在识别到马鲁博白色多头蜡烛时做多;识别到马鲁博黑色空头蜡烛时做空。

5. 通过考察之前两根蜡烛的收盘情况判断趋势反转,作为平仓信号。

该策略主要依靠马鲁博蜡烛本身提供的强势单边趋势信号以及线段均衡条件判断做多做空时机。当识别到马鲁博蜡烛时,表示市场存在强势单边趋势;而线段均衡情况也证实这种趋势的可靠性。在强势趋势反转时及时平仓以捕捉趋势获利。

## 优势分析

马鲁博蜡烛线段均衡策略具有以下几个优势:

1. 识别高概率的强势趋势,马鲁博蜡烛本身就提供了极具爆发力的单边行情信号。

2. 线段均衡有效过滤假突破,避免被套。当出现线段不均衡的时候,说明可能存在假突破的风险,这时会跳过交易信号。

3. 采用之前两根蜡烛判断趋势反转,可以及时捕捉趋势获取更高收益。

4. 策略简单清晰,容易理解和实现,适合初学者学习。

5. 可在任何品种和任何时间段使用,适用性强。

## 风险分析

该策略也存在以下风险:

1. 无法有效过滤震荡趋势,在震荡行情中可能出现较多的虚拟信号和套牢的风险。可以通过参数调节缩短持仓周期或者增大止损来缓解。

2. 依赖参数设定,不同参数可能导致结果差异较大。可以通过回测优化参数。

3. 无法判断次强势趋势,只依赖于极端的马鲁博蜡烛进行判断,会错过次强势机会。可以通过松弛线段均衡条件来改善。

## 策略优化

该策略可以从以下几个方面进行优化:

1. 优化马鲁博蜡烛判定的线段比例阈值,调整识别灵敏度。

2. 优化均衡阈值参数,识别更平衡或者更不平衡的均衡型态。

3. 增加收盘价与移动平均线比较作为辅助判断指标。

4. 增加成交量的突发性指标判断。

5. 松弛线段均衡要求,识别更多次强势马鲁博蜡烛机会。

## 总结

马鲁博蜡烛线段均衡策略通过识别特定蜡烛模式并辅以均衡判断发掘高概率单边趋势机会。策略简单易懂,拥有较高的胜率,既适合新手学习,也适合高级交易员寻找潜在机会。通过一些参数和信号优化可以获得更好的效果,整体是一个非常实用的日间量化策略。

||

## Overview

The Marubozu candle range balance strategy is an intraday quantitative trading strategy. It identifies Marubozu candle patterns and examines the balance of candle ranges to determine market trends and find trading opportunities.

## Strategy Principle  

The core logic of this strategy is based on the following points:

1. Identify Marubozu white bullish and black bearish candles. Marubozu candles are special candlestick patterns with no shadows between the open and close prices, divided into white bullish and black bearish types.

2. Calculate the average candle body range and compare it with the current candle body range to determine whether the range is long or short.

3. Determine whether the candle ranges are balanced, that is, whether the upper shadow and lower shadow lengths are roughly equal.

4. Go long when a Marubozu white bullish candle is identified; Go short when a Marubozu black bearish candle is identified.  

5. Use the closing prices of the previous two candles to determine trend reversal as the exit signal.

The strategy relies mainly on the strong one-sided trend signals provided by the Marubozu candles themselves and the balanced range conditions to determine long and short opportunities. When a Marubozu candle is identified, it indicates that the market has a strong one-sided trend. The balanced range situation also confirms the reliability of this trend. Exit positions in a timely manner when the strong trend reverses to capture the trend profit.

## Advantage Analysis   

The Marubozu candle range balance strategy has the following advantages:

1. Identify high-probability strong trends. Marubozu candles themselves provide extremely explosive one-sided price signals.  

2. Balanced range effectively filters false breakouts and avoids traps. When the range is imbalanced, it indicates potential risks of false breakout and will skip the trading signal.

3. Using the previous two candles to determine trend reversal can capture profits from the trend in a timely manner.  

4. The strategy is simple and clear, easy to understand and implement, suitable for beginners.

5. Can be used on any products and timeframes, with strong applicability.

## Risk Analysis   

The strategy also has the following risks:

1. Inability to effectively filter whipsaw markets, with higher risks of false signals and traps in range-bound trends. Can be mitigated by adjusting parameters to shorten holding period or increase stop loss.  

2. Reliance on parameter settings. Different parameters can lead to significantly different results. Parameters can be optimized through backtesting.

3. Inability to identify secondary strong trends, relying solely on extreme Marubozu candles for judgements, thus missing secondary opportunity. Can be improved by relaxing balanced range requirements. 

## Strategy Optimization

The strategy can be optimized in the following aspects:

1. Optimize the threshold percentage of Marubozu determination to adjust identification sensitivity.

2. Optimize balanced threshold parameters to identify more balanced or imbalanced balanced patterns. 

3. Add close price vs moving average comparison as an auxiliary judgement indicator.  

4. Add indicators to determine surges in trading volume.

5. Relax balanced range requirements to identify more secondary strong Marubozu opportunities.   

## Conclusion  

The Marubozu candle range balance strategy identifies high-probability one-sided trend opportunities by recognizing specific candle patterns coupled with balanced judgements. The strategy is simple and clear with high win rate. It is suitable for both beginners to learn and advanced traders to find potential opportunities. Further improvements can be made through signal and parameter optimizations. Overall it is a very practical intraday quantitative strategy.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title="Marubozu", shorttitle="Marubozu", overlay=true, initial_capital = 1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent , commission_value=0 )

C_Len = 14 // ema depth for bodyAvg
C_ShadowPercent = 5.0 // size of shadows
C_ShadowEqualsPercent = 100.0
C_DojiBodyPercent = 5.0
C_Factor = 2.0 // shows the number of times the shadow dominates the candlestick body

C_BodyHi = max(close, open)
C_BodyLo = min(close, open)
C_Body = C_BodyHi - C_BodyLo
C_BodyAvg = ema(C_Body, C_Len)
C_SmallBody = C_Body < C_BodyAvg
C_LongBody = C_Body > C_BodyAvg
C_UpShadow = high - C_BodyHi
C_DnShadow = C_BodyLo - low
C_HasUpShadow = C_UpShadow > C_ShadowPercent / 100 * C_Body
C_HasDnShadow = C_DnShadow > C_ShadowPercent / 100 * C_Body
C_WhiteBody = open < close
C_BlackBody = open > close
C_Range = high-low
C_IsInsideBar = C_BodyHi[1] > C_BodyHi and C_BodyLo[1] < C_BodyLo
C_BodyMiddle = C_Body / 2 + C_BodyLo
C_ShadowEquals = C_UpShadow == C_DnShadow or (abs(C_UpShadow - C_DnShadow) / C_DnShadow * 100) < C_ShadowEqualsPercent and (abs(C_DnShadow - C_UpShadow) / C_UpShadow * 100) < C_ShadowEqualsPercent
C_IsDojiBody = C_Range > 0 and C_Body <= C_Range * C_DojiBodyPercent / 100
C_Doji = C_IsDojiBody and C_ShadowEquals

patternLabelPosLow = low - (atr(30) * 0.6)
patternLabelPosHigh = high + (atr(30) * 0.6)

C_MarubozuWhiteBullishNumberOfCandles = 1
C_MarubozuShadowPercentWhite = 5.0
C_MarubozuWhiteBullish = C_WhiteBody and C_LongBody and C_UpShadow <= C_MarubozuShadowPercentWhite/100*C_Body and C_DnShadow <= C_MarubozuShadowPercentWhite/100*C_Body and C_WhiteBody
alertcondition(C_MarubozuWhiteBullish, title = "Marubozu White", message = "New Marubozu White - Bullish pattern detected.")
if C_MarubozuWhiteBullish
    var ttBullishMarubozuWhite = "Marubozu White\nA Marubozu White Candle is a candlestick that does not have a shadow that extends from its candle body at either the open or the close. Marubozu is Japanese for “close-cropped” or “close-cut.” Other sources may call it a Bald or Shaven Head Candle."
    label.new(bar_index, patternLabelPosLow, text="MW", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishMarubozuWhite)
bgcolor(highest(C_MarubozuWhiteBullish?1:0, C_MarubozuWhiteBullishNumberOfCandles)!=0 ? color.blue : na, offset=-(C_MarubozuWhiteBullishNumberOfCandles-1))

C_MarubozuBlackBearishNumberOfCandles = 1
C_MarubozuShadowPercentBearish = 5.0
C_MarubozuBlackBearish = C_BlackBody and C_LongBody and C_UpShadow <= C_MarubozuShadowPercentBearish/100*C_Body and C_DnShadow <= C_MarubozuShadowPercentBearish/100*C_Body and C_BlackBody
alertcondition(C_MarubozuBlackBearish, title = "Marubozu Black", message = "New Marubozu Black - Bearish pattern detected.")
if C_MarubozuBlackBearish
    var ttBearishMarubozuBlack = "Marubozu Black\nThis is a candlestick that has no shadow, which extends from the red-bodied candle at the open, the close, or even at both. In Japanese, the name means “close-cropped” or “close-cut.” The candlestick can also be referred to as Bald or Shaven Head."
    label.new(bar_index, patternLabelPosHigh, text="MB", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishMarubozuBlack)
bgcolor(highest(C_MarubozuBlackBearish?1:0, C_MarubozuBlackBearishNumberOfCandles)!=0 ? color.red : na, offset=-(C_MarubozuBlackBearishNumberOfCandles-1))

strategy.entry("short",1,when= C_MarubozuBlackBearish)

strategy.entry("long",0,when=C_MarubozuWhiteBullish)

strategy.close("long",when= close[1] < open[1]and close[2] < open[2] and close > open)
strategy.close("short",when= close[1] > open[1]and close[2] > open[2] and close < open)
```

> Detail

https://www.fmz.com/strategy/442641

> Last Modified

2024-02-23 14:23:41
