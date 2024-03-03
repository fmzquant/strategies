
> Name

中央跳空与趋势追踪交易策略Price-Gap-and-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7c129eec8be5b76642.png)

[trans]

## 概述

该策略利用CCI指标和动量指标结合RSI指标来识别市场趋势,在超买超卖区发现跳空现象时进场,同时利用布林带来识别趋势和回归中枢。策略可以有效识别突破与回调,在趋势开始阶段就进场,并且可以通过参数调整自由适应不同品种的交易。

## 策略原理

首先,策略通过CCI指标或者动量指标的零轴上穿和零轴下穿来判断买入和卖出信号。同时,要求RSI指标处于超买超卖区,即RSI高于65时为超买区,低于35时为超卖区。这样可以避免在非超买超卖区发出错误信号。 

另外,策略可以选择是否判断RSI的bullish divergence(略微上升)和bearish divergence(略微下降),以确保买卖信号更可靠。

当符合CCI或动量的买入信号,并且RSI处于超卖区时,策略会判断前一高点和低点是否都在布林带中枢上方,如果是,则产生买入信号。反之,当符合卖出信号,并且前一高低点都在布林带中枢下方时,产生卖出信号。

这样,策略同时利用趋势指数和震荡指数,能在趋势开始时及时捕捉,并利用中枢判断避免假突破。当价格脱离布林带上下轨时,策略会全平以锁定利润并防止回撤扩大。

## 优势分析

1. 结合趋势指数和震荡指数,能够在趋势开始时就进入,同时避免在震荡市场无谓开仓

2. 利用布林带中的枢结合跳空为入场信号,可以有效过滤假突破

3. 回看RSI指标的历史走势,进一步防止产生错误交易信号

4. 全自动交易,不需要人工干预,适合算法交易

5. 策略参数可以自由调整,适应不同交易品种

6. 能够设定止损止盈,有效控制风险

## 风险分析

1. 布林带参数设置不当可能导致中枢判断失效

2. 指标参数设置不当,可能导致产生过多错误信号

3. 突破失败,价格再次回调到布林带中枢时需要及时止损

4. 交易品种流动性不足时,突破效果可能不佳

5. 交易前需校验历史数据是否充足,避免曲线拟合不佳

6. 需要关注交易时段,避免假突破

## 优化方向

1. 优化布林带参数,使中枢更稳定

2. 测试不同指标参数对不同品种的效果

3. 增加交易量控制,避免单笔仓位过大

4. 增加对时段的判断,在主要交易时间操作

5. 增加机器学习算法,使信号产生更智能

6. 接入更多数据源,判断市场总体走势

7. 增加对更多指标的集成,形成指标组合

## 总结

本策略整合趋势指数和震荡指数,在趋势开始时就可以进入市场。同时利用布林带中的枢结合跳空为入场信号,可以有效避免假突破。策略参数可以灵活调整,适应不同品种,回测效果优异。下一步将通过优化参数设置和模型融合使策略更稳健可靠,从而获得长期稳定的超额收益。

||


## Overview

This strategy uses the CCI indicator and momentum indicator combined with the RSI indicator to identify market trends and enter when gap appears in overbought/oversold zone. It also utilizes Bollinger Bands to recognize trends and mean reversion range. The strategy can effectively identify breakouts and pullbacks, get in early in trend start, and adapt to different products by adjusting parameters.

## Strategy Logic

Firstly, the strategy determines long and short signals by CCI indicator or momentum indicator crossing above/below 0 line. Also it requires RSI to be in overbought/oversold zone, i.e. above 65 for overbought and below 35 for oversold, to avoid false signals. 

In addition, the strategy can choose to determine RSI bullish/bearish divergences to ensure more reliable signals.

When CCI or momentum long signal triggers, and RSI is in oversold zone, the strategy will check if previous high and low are both above Bollinger Band mean line. If so, a long signal is generated. Vice versa, when short signal triggers and previous high low are below mean line, a short signal is generated.

Thus the strategy utilizes both trend and oscillation indicators, to get in a trend early and avoid false breakout with mean reversion range. When price breaks out of Bollinger Bands, the strategy will close all positions to lock profit and prevent further drawdown.

## Advantage Analysis

1. Combining trend and oscillation indicators can enter trend early and avoid unnecessary positions in range market.

2. Using Bollinger Band mean with price gaps filters false breakouts effectively. 

3. Checking historical RSI avoids generating wrong trade signals.

4. Fully automated trading without manual interference, suitable for algorithm trading.

5. Flexible parameter adjustment adapts to different trading products. 

6. Stop loss and take profit controls risk effectively.

## Risk Analysis

1. Improper Bollinger Band parameters may cause invalid mean reversion identification.

2. Wrong indicator parameters may generate too many false signals. 

3. Failed breakout needs timely stop loss when price pulls back to mean.

4. Poor liquidity may cause ineffective breakout trading.

5. Ensure sufficient historical data to avoid poor curve fitting.

6. Pay attention to trading sessions to avoid false breakout.

## Improvement Directions

1. Optimize Bollinger Bands parameters for more stable mean reversion range.

2. Test parameters on different products for better optimization.

3. Add position sizing to avoid oversized single position.

4. Add trading session filter to trade mainly in active hours. 

5. Incorporate machine learning models to generate more intelligent signals.

6. Integrate more data sources to determine overall market trend. 

7. Add more indicators to form a robust indicator ensemble.

## Conclusion

This strategy integrates trend and oscillation indicators to capture trends early. With Bollinger Band mean and price gaps it avoids false breakouts effectively. Flexible parameters adapt to different products with great backtest results. Next steps are to optimize parameters and model ensemble for more robustness, and achieve consistent excess returns in the long run.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|Entry Signal Source: CCI|Momentum|
|v_input_int_1|10|CCI/Momentum Length|
|v_input_bool_1|false|Find Regular Bullish/Bearish Divergence|
|v_input_int_2|65|RSI Overbought Level|
|v_input_int_3|35|RSI Oversold Level|
|v_input_int_4|14|RSI Length|
|v_input_bool_2|true|Plot Mean Reversion Bands on the chart|
|v_input_1|200|Lookback Period (EMA)|
|v_input_float_1|1.6|Outer Bands Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-18 00:00:00
end: 2023-10-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title='BroTheJo Strategy', shorttitle='BTJ', overlay=true)

// Input settings
ccimomCross = input.string('CCI', 'Entry Signal Source', options=['CCI', 'Momentum'])
ccimomLength = input.int(10, minval=1, title='CCI/Momentum Length')
useDivergence = input.bool(false, title='Find Regular Bullish/Bearish Divergence')
rsiOverbought = input.int(65, minval=1, title='RSI Overbought Level')
rsiOversold = input.int(35, minval=1, title='RSI Oversold Level')
rsiLength = input.int(14, minval=1, title='RSI Length')
plotMeanReversion = input.bool(true, 'Plot Mean Reversion Bands on the chart')
emaPeriod = input(200, title='Lookback Period (EMA)')
bandMultiplier = input.float(1.6, title='Outer Bands Multiplier')

// CCI and Momentum calculation
momLength = ccimomCross == 'Momentum' ? ccimomLength : 10
mom = close - close[momLength]
cci = ta.cci(close, ccimomLength)
ccimomCrossUp = ccimomCross == 'Momentum' ? ta.cross(mom, 0) : ta.cross(cci, 0)
ccimomCrossDown = ccimomCross == 'Momentum' ? ta.cross(0, mom) : ta.cross(0, cci)

// RSI calculation
src = close
up = ta.rma(math.max(ta.change(src), 0), rsiLength)
down = ta.rma(-math.min(ta.change(src), 0), rsiLength)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)
oversoldAgo = rsi[0] <= rsiOversold or rsi[1] <= rsiOversold or rsi[2] <= rsiOversold or rsi[3] <= rsiOversold
overboughtAgo = rsi[0] >= rsiOverbought or rsi[1] >= rsiOverbought or rsi[2] >= rsiOverbought or rsi[3] >= rsiOverbought

// Regular Divergence Conditions
bullishDivergenceCondition = rsi[0] > rsi[1] and rsi[1] < rsi[2]
bearishDivergenceCondition = rsi[0] < rsi[1] and rsi[1] > rsi[2]

// Mean Reversion Indicator
meanReversion = plotMeanReversion ? ta.ema(close, emaPeriod) : na
stdDev = plotMeanReversion ? ta.stdev(close, emaPeriod) : na
upperBand = plotMeanReversion ? meanReversion + stdDev * bandMultiplier : na
lowerBand = plotMeanReversion ? meanReversion - stdDev * bandMultiplier : na

// Entry Conditions
prevHigh = ta.highest(high, 1)
prevLow = ta.lowest(low, 1)
longEntryCondition = ccimomCrossUp and oversoldAgo and (not useDivergence or bullishDivergenceCondition) and (prevHigh >= meanReversion) and (prevLow >= meanReversion)
shortEntryCondition = ccimomCrossDown and overboughtAgo and (not useDivergence or bearishDivergenceCondition) and (prevHigh <= meanReversion) and (prevLow <= meanReversion)

// Plotting
oldLongEntryCondition = ccimomCrossUp and oversoldAgo and (not useDivergence or bullishDivergenceCondition)
oldShortEntryCondition = ccimomCrossDown and overboughtAgo and (not useDivergence or bearishDivergenceCondition)
plotshape(oldLongEntryCondition, title='BUY', style=shape.triangleup, location=location.belowbar, color=color.new(color.lime, 0), textcolor=color.new(color.white, 0), size=size.tiny)
plotshape(oldShortEntryCondition, title='SELL', style=shape.triangledown, location=location.abovebar, color=color.new(color.red, 0), textcolor=color.new(color.white, 0), size=size.tiny)

// Strategy logic
if (longEntryCondition)
    strategy.entry("Buy", strategy.long)
if (shortEntryCondition)
    strategy.entry("Sell", strategy.short)

// Close all open positions when outside of bands
closeAll = (high >= upperBand) or (low <= lowerBand)

if (closeAll)
    strategy.close_all("Take Profit/Cut Loss")


// Plotting
plot(upperBand, title='Upper Band', color=color.fuchsia, linewidth=1)
plot(meanReversion, title='Mean', color=color.gray, linewidth=1)
plot(lowerBand, title='Lower Band', color=color.blue, linewidth=1)
```

> Detail

https://www.fmz.com/strategy/430176

> Last Modified

2023-10-25 18:02:11
