
> Name

趋势追踪移动平均线与K线形态组合策略Trend-Following-Strategy-with-Moving-Average-and-Candlestick-Patterns

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/123adb04751c056ea4e.png)
[trans]

## 概述

该策略结合了移动平均线判断趋势方向和K线形态判断反转点的方法,实现了趋势追踪交易。策略首先使用移动平均线判断整体趋势方向,然后在趋势方向上寻找潜在的反转K线形态作为入场信号,从而追踪趋势运行。

## 策略原理

策略使用长度为10天的简单移动平均线判断价格趋势方向。当价格高于移动平均线时,认为处于上升趋势;当价格低于移动平均线时,认为处于下降趋势。 

在判断到趋势方向后,策略会根据一系列阳线K线形态和阴线K线形态来判断潜在的趋势反转点。常见的阳线形态包括启明星、早晨之星、三只白兵等;常见的阴线形态包括黄昏之星、三只乌鸦等。当在上升趋势中识别到阳线信号时,策略会进行买入操作;当在下降趋势中识别到阴线信号时,策略会进行卖出操作。

此外,策略还会结合主要的支撑阻力位来确定入场的具体价格。如在上升趋势下买入时,会在突破第一支撑位时进行买入。

## 策略优势

该策略最大的优势是同时结合趋势判断和反转信号,使得它可以及时捕捉趋势转折点,实现趋势跟踪运行。相比简单的移动平均线策略,该策略可以大大提高获利概率。

另外,策略加入K线形态判断也增强了其对突发事件的处理能力。在市场出现低概率事件导致假突破时,K线形态可以发挥过滤作用,避免错误交易。

## 策略风险

该策略主要的风险在于移动平均线参数设置和K线形态判断的准确性。如果移动平均线周期设置得不当,会导致趋势判断错误;如果对K线形态判断出现失误,也会导致交易决策失误。

此外,反转K线形态并不能百分百确保趋势反转,所以策略也存在一定的风险。当市场出现更大范围的反转时,可能会给策略带来较大亏损。

## 优化方向

该策略的优化空间还是比较大的。例如可以考虑动态调整移动平均线的参数,在不同市场阶段采用不同的移动平均线周期。还可以加入机器学习的方法,利用历史数据训练K线形态判断模型,提高判断准确性。

另外,也可以考虑加入更多因子判断趋势和热点区域,如交易量变化、波动率指标等,使策略更加全面和稳健。

## 总结

该策略整体来说非常适合跟踪股市中期趋势,可以获得较高的稳定收益。如果进一步优化,有望成为一个运作良好的量化策略。投资者如果掌握该策略的运用,也可以用其构建长期持有的组合,以控制个股风险的同时获得较好的超额收益。

||

## Overview

This strategy combines the moving average to determine the trend direction and candlestick patterns to identify potential reversal points, in order to implement trend following trading. The strategy first uses the moving average to judge the overall trend direction, and then looks for potential reversal candlestick patterns as entry signals along the trend direction to track the trend.

## Strategy Principle 

The strategy adopts a 10-day simple moving average to determine the price trend. When the price is above the moving average, it is considered to be in an uptrend; when the price is below the moving average, it is considered to be in a downtrend.

After determining the trend direction, the strategy will judge potential trend reversal points based on a series of bullish and bearish candlestick patterns. Common bullish patterns include Morning Star, Bullish Engulfing, Three White Soldiers, etc; common bearish patterns include Evening Star, Three Black Crows, etc. When a bullish signal is identified in an uptrend, the strategy will place a buy order; when a bearish signal is identified in a downtrend, the strategy will place a sell order.

In addition, the strategy also incorporates major support and resistance levels to determine the specific entry price. For example, when buying in an uptrend, it will buy when breaking through the first support level.

## Advantages

The biggest advantage of this strategy is that it combines both trend judgment and reversal signals so that it can capture trend turning points in a timely manner to follow the trend. Compared with simple moving average strategies, this strategy can greatly improve the profitability.

In addition, the incorporation of candlestick pattern judgment also enhances its ability to deal with sudden events. When a low probability event causes a false breakout in the market, the candlestick pattern can play a role of filter to avoid wrong trades.

## Risks

The main risks of this strategy lie in the accuracy of moving average parameter settings and candlestick pattern judgment. If the moving average period is set improperly, it will lead to wrong trend determination; if the judgment of candlestick patterns has errors, it will also lead to wrong trading decisions.

In addition, reversal candlestick patterns cannot guarantee trend reversal with 100% certainty, so there is still some risks in the strategy. When the market sees larger reversals, it may bring greater losses to the strategy.

## Optimization Directions 

There is still considerable room for optimization in this strategy. For example, we can consider dynamically adjusting the parameters of the moving average and adopting different moving average periods in different market stages. We can also introduce machine learning methods to train candlestick pattern judgment models using historical data to improve judgment accuracy.

In addition, we can also consider incorporating more factors to judge trends and hot areas, such as trading volume changes, volatility indicators, etc., to make the strategy more comprehensive and robust.

## Conclusion

In general, this strategy is very suitable for tracking mid-term trends in the stock market and can obtain relatively high and stable returns. If further optimized, it has the potential to become a well-functioning quantitative strategy. If investors grasp the use of this strategy, they can also use it to build long-term holdings to control individual stock risks while obtaining better excess returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Moving Average Period|
|v_input_2|2|Stop Loss Percentage|
|v_input_3|true|Trailing Stop Loss Percentage|
|v_input_4|true|Trailing Stop Loss Active|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Trend Following Strategy with Candlestick Patterns", overlay=true)

// Moving Average
ma_period = input(10, title="Moving Average Period")
moving_average = ta.sma(close, ma_period)

// Candlestick Patterns
// Custom Function
abs(x) => x >= 0 ? x : -x

// Candlestick Patterns
isDoji() =>
    (close - open) <= (high - low) * 0.1

isMarubozuWhite() =>
    close == high and open == low and close > open

isHammer() =>
    (high - low) >= 3 * abs(open - close) and (close - low) / (0.001 + high - low) > 0.6 and (open - low) / (0.001 + high - low) > 0.6

isInvertedHammer() =>
    (high - low) >= 3 * abs(open - close) and (high - close) / (0.001 + high - low) > 0.6 and (high - open) / (0.001 + high - low) > 0.6

isLongLowerShadow() =>
    (low - close) > 2 * abs(open - close) and (low - open) / (0.001 + high - low) > 0.6

isUpsideTasukiGap() =>
    close[1] < open[1] and open > close and open > close[1] and close < open[1]

isRisingWindow() =>
    high[1] < low and close > open

isPiercing() =>
    close[1] < open[1] and close > open and close > ((open + low) / 2) and close < open[1] and open < close[1]

isBullishEngulfing() =>
    close[1] < open[1] and close > open and high > high[1] and low < low[1]

isTweezerBottom() =>
    low == ta.valuewhen(low == ta.lowest(low, 10), low, 0) and low == ta.valuewhen(low == ta.lowest(low, 20), low, 0)

isBullishAbandonedBaby() =>
    close[2] < open[2] and close[1] > open[1] and low[1] > ta.valuewhen(high == ta.highest(high, 2), high, 0) and open > close and close > ta.valuewhen(high == ta.highest(high, 2), high, 0)

isMorningStar() =>
    close[2] < open[2] and close[1] < open[1] and close > open[1] and open < close[2] and open > close[1]

isMorningDojiStar() =>
    close[2] < open[2] and close[1] < open[1] and isDoji() and close > open[1] and open < close[2] and open > close[1]

isDragonflyDoji() =>
    isDoji() and (high - close) / (0.001 + high - low) < 0.1 and (open - low) / (0.001 + high - low) > 0.6

isThreeWhiteSoldiers() =>
    close[2] < open[2] and close[1] < open[1] and close > open and open < close[2] and open < close[1] and close > open[1]

isRisingThreeMethods() =>
    close[4] < open[4] and close[1] < open[1] and close > open and open < close[4] and open < close[1] and close > open[1]

isMarubozuBlack() =>
    close == low and open == high and open > close

isGravestoneDoji() =>
    isDoji() and (close - low) / (0.001 + high - low) < 0.1 and (high - open) / (0.001 + high - low) > 0.6

isHangingMan() =>
    (high - low) >= 4 * abs(open - close) and (open - close) / (0.001 + high - low) > 0.6 and (high - open) / (0.001 + high - low) > 0.6

isLongUpperShadow() =>
    (high - open) > 2 * abs(open - close) and (high - close) / (0.001 + high - low) > 0.6

isDownsideTasukiGap() =>
    close[1] > open[1] and open < close and open < close[1] and close > open[1]

isFallingWindow() =>
    low[1] > high and close < open

isDarkCloudCover() =>
    close[1] > open[1] and close < open and close < ((open + high) / 2) and close > open[1] and open > close[1]

isBearishEngulfing() =>
    close[1] > open[1] and close < open and high > high[1] and low < low[1]

isTweezerTop() =>
    high == ta.valuewhen(high == ta.highest(high, 10), high, 0) and high == ta.valuewhen(high == ta.highest(high, 20), high, 0)

isAbandonedBaby() =>
    close[2] > open[2] and close[1] < open[1] and high[1] < ta.valuewhen(low == ta.lowest(low, 2), low, 0) and open < close and close < ta.valuewhen(low == ta.lowest(low, 2), low, 0)

isEveningDojiStar() =>
    close[2] > open[2] and close[1] > open[1] and isDoji() and close < open[1] and open > close[2] and open < close[1]

isEveningStar() =>
    close[2] > open[2] and close[1] > open[1] and close < open[1] and open > close[2] and open < close[1]

isThreeBlackCrows() =>
    close[2] > open[2] and close[1] > open[1] and close < open and open > close[2] and open > close[1] and close < open[1]

isFallingThreeMethods() =>
    close[4] > open[4] and close[1] > open

isShootingStar() =>
    (high - low) >= 3 * abs(open - close) and (high - close) / (0.001 + high - low) > 0.6 and (high - open) / (0.001 + high - low) > 0.6

doji = isDoji()
marubozuWhite = isMarubozuWhite()
hammer = isHammer()
invertedHammer = isInvertedHammer()
longLowerShadow = isLongLowerShadow()
upsideTasukiGap = isUpsideTasukiGap()
risingWindow = isRisingWindow()
piercing = isPiercing()
bullishEngulfing = isBullishEngulfing()
tweezerBottom = isTweezerBottom()
bullishAbandonedBaby = isBullishAbandonedBaby()
morningStar = isMorningStar()
morningDojiStar = isMorningDojiStar()
dragonflyDoji = isDragonflyDoji()
threeWhiteSoldiers = isThreeWhiteSoldiers()
risingThreeMethods = isRisingThreeMethods()
marubozuBlack = isMarubozuBlack()
gravestoneDoji = isGravestoneDoji()
hangingMan = isHangingMan()
longUpperShadow = isLongUpperShadow()
downsideTasukiGap = isDownsideTasukiGap()
fallingWindow = isFallingWindow()
darkCloudCover = isDarkCloudCover()
bearishEngulfing = isBearishEngulfing()
tweezerTop = isTweezerTop()
abandonedBaby = isAbandonedBaby()
eveningDojiStar = isEveningDojiStar()
eveningStar = isEveningStar()
threeBlackCrows = isThreeBlackCrows()
fallingThreeMethods = isFallingThreeMethods()
shootingStar = isShootingStar()
isBullishPattern() =>
    (isMarubozuWhite() or isHammer() or isInvertedHammer() or isDoji() or isMorningStar() or isBullishEngulfing() or isThreeWhiteSoldiers() or isMarubozuBlack() or isHangingMan() or isDownsideTasukiGap() or isDarkCloudCover())

isBearishPattern() =>
    (isMarubozuBlack() or isInvertedHammer() or isLongUpperShadow() or isTweezerTop() or isGravestoneDoji() or isEveningStar() or isBearishEngulfing() or isThreeBlackCrows() or isShootingStar())

isBullishCandle = isBullishPattern()
isBearishCandle = isBearishPattern()

// Calculate Pivot Points
pivotPoint(high, low, close) =>
    (high + low + close) / 3

r1 = pivotPoint(high[1], low[1], close[1]) * 2 - low[1]
s1 = pivotPoint(high[1], low[1], close[1]) * 2 - high[1]

r2 = pivotPoint(high[1], low[1], close[1]) + (high[1] - low[1])
s2 = pivotPoint(high[1], low[1], close[1]) - (high[1] - low[1])

r3 = high[1] + 2 * (pivotPoint(high[1], low[1], close[1]) - low[1])
s3 = low[1] - 2 * (high[1] - pivotPoint(high[1], low[1], close[1]))
// Trend Identification
is_uptrend = close > moving_average
is_downtrend = close < moving_average
// Entry and Exit Conditions with Trend Identification
enterLong = is_uptrend and isBullishCandle and close > r1
exitLong = is_uptrend and (bearishEngulfing or doji or close < s1)

enterShort = is_downtrend and isBearishCandle and close < s1
exitShort = is_downtrend and (bullishEngulfing or doji or close > r1)



// Strategy Execution
if enterLong and strategy.position_size == 0 and strategy.position_size[1] == 0 and close > r1
    strategy.entry("Buy", strategy.long, qty=1)

if exitLong and strategy.position_size > 0
    strategy.close("Buy")

if enterShort and strategy.position_size == 0 and close < s1
    strategy.entry("Sell", strategy.short, qty=1)

if exitShort and strategy.position_size < 0
    strategy.close("Sell")


// Stop-Loss and Trailing Stop-Loss
stop_loss_pct = input(2.0, title="Stop Loss Percentage")
trailing_stop_loss_pct = input(1.0, title="Trailing Stop Loss Percentage")
trailing_stop_loss_active = input(true, title="Trailing Stop Loss Active")

// Stop-Loss
stop_loss_level = strategy.position_avg_price * (1 - stop_loss_pct / 100)
strategy.exit("Stop Loss", "Buy", loss=stop_loss_level)

// Trailing Stop-Loss


// Plotting Moving Average
plot(moving_average, color=color.blue, title="Moving Average", linewidth=2)

// Plotting Candlestick Patterns
plotshape(isBullishCandle, title="Bullish Candle", location=location.belowbar, color=color.green, style=shape.labelup)
plotshape(isBearishCandle, title="Bearish Candle", location=location.abovebar, color=color.red, style=shape.labeldown)

// Plotting Support and Resistance Levels
//hline(r1, "Resistance Level 1", color=color.red, linestyle=hline.style_dotted)
//hline(s1, "Support Level 1", color=color.green, linestyle=hline.style_dotted)

```

> Detail

https://www.fmz.com/strategy/440874

> Last Modified

2024-02-02 17:53:43
