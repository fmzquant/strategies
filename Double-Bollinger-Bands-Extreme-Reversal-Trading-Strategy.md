
> Name

Double-Bollinger-Bands-Extreme-Reversal-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8ecd435c200d5cfce62.png)
![IMG](https://www.fmz.com/upload/asset/2d912ab43ee11636949b1.png)


[trans]## 概述

双布林带极值反转交易策略是一种基于统计学原理的量化交易方法，通过设置两组不同标准差倍数的布林带（2倍标准差和3倍标准差）来识别市场的极端波动区域并捕捉高概率的反转交易机会。该策略利用价格触及或穿越3倍标准差布林带时的极端条件作为交易信号触发点，并使用2倍标准差布林带作为获利了结区域，从而构建了一个结构化的风险-收益框架。

该策略的核心假设是，当价格达到统计学上的极端区域（3倍标准差布林带以外）时，市场往往会出现均值回归的趋势，因此可以通过做多下方3倍标准差布林带的突破和做空上方3倍标准差布林带的跌破来捕捉反转机会。同时，策略通过视觉化的买卖信号标记、动态布林带绘制以及价格触及极端波动水平时的蜡烛图着色功能，使交易者能够直观地识别交易机会。

## 策略原理

双布林带极值反转交易策略的工作原理基于以下几个核心组件：

1. **双层布林带设置**：
   - 第一层：基于20周期移动平均线（SMA）加减2倍标准差
   - 第二层：基于20周期移动平均线（SMA）加减3倍标准差

2. **入场条件**：
   - 多头入场：价格向上穿越下方3倍标准差布林带（lower2）
   - 空头入场：价格向下穿越上方3倍标准差布林带（upper2）

3. **出场条件**：
   - 多头出场：价格向上穿越上方2倍标准差布林带（upper1）
   - 空头出场：价格向下穿越下方2倍标准差布林带（lower1）

4. **视觉辅助工具**：
   - 布林带绘制：不同颜色区分不同标准差倍数的布林带
   - 买卖信号标记：在满足入场条件时，显示买入或卖出标记
   - 蜡烛图着色：当价格触及3倍标准差布林带时，将蜡烛图着色为白色，强调极端价格区域

从代码实现上看，该策略首先计算了基于20周期的简单移动平均线作为布林带的中轨，然后分别计算了2倍和3倍标准差作为波动范围的度量，从而构建出双层布林带系统。交易信号通过ta.crossover和ta.crossunder函数来识别价格与布林带的交叉情况，实现精确的入场和出场时机判断。

## 策略优势

1. **统计学基础**：该策略基于统计学中的正态分布原理，利用标准差来量化市场波动性，理论基础扎实。在正态分布假设下，价格在3倍标准差外的概率仅约0.3%，提供了极高概率的反转机会。

2. **明确的入场和出场规则**：策略定义了清晰的入场和出场条件，减少了主观判断的干扰，有助于保持交易纪律。

3. **风险控制结构化**：通过使用3倍标准差布林带作为入场点和2倍标准差布林带作为出场点，策略内置了风险管理框架，使每笔交易都有良好的风险-收益比。

4. **适应不同市场环境**：该策略既可在震荡市场中捕捉均值回归机会，也能在趋势市场中通过极端反转点位入场，展现出较强的适应性。

5. **视觉反馈丰富**：通过布林带可视化、交易信号标记和特殊价格水平的蜡烛图着色，策略提供了丰富的视觉反馈，帮助交易者快速识别和评估交易机会。

6. **参数简洁**：策略仅需要设置布林带长度一个主要参数，操作简单，降低了过度优化的风险。

## 策略风险

1. **假突破风险**：价格可能短暂穿越3倍标准差布林带后立即回归，造成虚假信号。解决方法是可以增加确认指标或设置时间过滤器，要求价格在特定区域停留最小时间。

2. **趋势强劲时的逆势交易风险**：在强趋势市场中，价格可能持续在极端区域运行，导致连续亏损。解决方法是结合趋势指标（如移动平均线方向或ADX指标），只在与主趋势一致的方向交易。

3. **黑天鹅事件风险**：市场突发事件可能导致价格剧烈波动，超出正常统计分布假设。解决方法是设置固定止损，或使用波动率过滤器，在极端波动期间暂停交易。

4. **参数稳定性风险**：固定的20周期和2/3倍标准差设置可能不适用于所有市场和时间框架。解决方法是通过回测不同参数组合，找到特定市场的最优参数，或考虑使用自适应布林带宽度。

5. **高波动率环境下的过度交易**：在高波动率环境中，价格可能频繁触及极端布林带，产生过多交易信号。解决方法是加入交易频率限制或波动率过滤条件。

## 策略优化方向

1. **加入趋势过滤器**：
   结合趋势指标（如较长周期的移动平均线方向或ADX指标）来过滤交易信号，只在趋势方向上交易或加强与趋势一致的信号。这样优化可以显著减少逆势交易带来的亏损。

2. **自适应布林带参数**：
   将固定的布林带长度和标准差倍数改为基于市场波动性的自适应参数，例如在低波动环境下减小标准差倍数，在高波动环境下增加标准差倍数。这样可以使策略更好地适应不同市场状态。

3. **增加交易量过滤**：
   加入成交量确认机制，只有当价格突破伴随足够大的交易量时才入场，可以减少假突破的风险。

4. **加入时间过滤器**：
   实现时间过滤功能，避开重大经济数据发布或特定高波动时段，可以减少因市场噪音导致的错误信号。

5. **止损和部分获利策略**：
   增加动态止损设置和部分获利功能，如当价格回到中轨（SMA）时部分平仓，可以提高策略的整体风险调整收益。

6. **优化退出逻辑**：
   当前策略使用固定的2倍标准差布林带作为出场点，可以考虑根据市场状态动态调整出场点位，或结合其他技术指标来优化出场时机。

## 总结

双布林带极值反转交易策略是一种结合统计学原理与技术分析的量化交易方法，通过识别价格到达极端统计区域（3倍标准差）时的反转机会来获取收益。该策略具有明确的规则、良好的风险控制结构和丰富的视觉反馈，适合对均值回归有信心的交易者使用。

然而，该策略也面临假突破、逆势交易和参数稳定性等风险。通过加入趋势过滤、自适应参数、交易量确认和改进的止损与获利策略，可以进一步提高策略的稳健性和盈利能力。

总体而言，这是一个设计良好的基础策略框架，既可以独立使用，也可以作为更复杂交易系统的组成部分。对于寻求基于统计方法识别市场极值反转机会的交易者来说，这是一个值得考虑的策略选择。|| ## Overview

The Double Bollinger Bands Extreme Reversal Trading Strategy is a quantitative trading approach based on statistical principles that identifies high-probability reversal opportunities by utilizing two sets of Bollinger Bands with different standard deviation multipliers (2SD and 3SD). This strategy triggers entry signals when price touches or crosses the extreme 3SD Bollinger Bands and uses the 2SD Bollinger Bands as profit-taking zones, thus creating a structured risk-reward framework.

The core assumption of this strategy is that when prices reach statistically extreme areas (beyond the 3SD Bollinger Bands), markets tend to exhibit mean reversion tendencies. Therefore, opportunities can be captured by going long when price breaks above the lower 3SD band and going short when price breaks below the upper 3SD band. Additionally, the strategy incorporates visual buy/sell signal markers, dynamic Bollinger Band plotting, and candle coloring when price touches extreme volatility levels, allowing traders to visually identify trading opportunities.

## Strategy Principles

The Double Bollinger Bands Extreme Reversal Trading Strategy operates based on the following core components:

1. **Dual Bollinger Bands Setup**:
   - First Layer: Based on a 20-period Simple Moving Average (SMA) plus/minus 2 standard deviations
   - Second Layer: Based on a 20-period Simple Moving Average (SMA) plus/minus 3 standard deviations

2. **Entry Conditions**:
   - Long Entry: Price crosses above the lower 3SD Bollinger Band (lower2)
   - Short Entry: Price crosses below the upper 3SD Bollinger Band (upper2)

3. **Exit Conditions**:
   - Long Exit: Price crosses above the upper 2SD Bollinger Band (upper1)
   - Short Exit: Price crosses below the lower 2SD Bollinger Band (lower1)

4. **Visual Aids**:
   - Bollinger Bands Plotting: Different colors to distinguish different standard deviation multipliers
   - Buy/Sell Signal Markers: Displays buy or sell markers when entry conditions are met
   - Candle Coloring: When price touches the 3SD Bollinger Bands, candles are colored white to emphasize extreme price zones

From the code implementation, the strategy first calculates a 20-period simple moving average as the middle band of the Bollinger Bands, then calculates 2SD and 3SD to measure volatility range, thus constructing the dual Bollinger Bands system. Trading signals are identified through the ta.crossover and ta.crossunder functions to detect price crossovers with the Bollinger Bands, enabling precise entry and exit timing.

## Strategy Advantages

1. **Statistical Foundation**: The strategy is based on the principles of normal distribution in statistics, using standard deviation to quantify market volatility, providing a solid theoretical foundation. Under normal distribution assumptions, the probability of price being outside the 3SD bands is only about 0.3%, offering high-probability reversal opportunities.

2. **Clear Entry and Exit Rules**: The strategy defines precise entry and exit conditions, reducing the interference of subjective judgment and helping maintain trading discipline.

3. **Structured Risk Control**: By using the 3SD Bollinger Bands as entry points and the 2SD Bollinger Bands as exit points, the strategy incorporates a risk management framework, ensuring a favorable risk-reward ratio for each trade.

4. **Adaptability to Different Market Environments**: The strategy can capture mean reversion opportunities in ranging markets and enter at extreme reversal points in trending markets, demonstrating strong adaptability.

5. **Rich Visual Feedback**: Through Bollinger Bands visualization, trade signal markers, and candle coloring at special price levels, the strategy provides rich visual feedback, helping traders quickly identify and evaluate trading opportunities.

6. **Simple Parameters**: The strategy primarily requires setting only one main parameter - the Bollinger Bands length, making it simple to operate and reducing the risk of over-optimization.

## Strategy Risks

1. **False Breakout Risk**: Price may briefly cross the 3SD Bollinger Bands and then immediately revert, generating false signals. A solution is to add confirmation indicators or set time filters, requiring the price to stay in the specific zone for a minimum time.

2. **Counter-Trend Trading Risk in Strong Trends**: In strong trending markets, prices may continue to run in extreme zones, causing consecutive losses. A solution is to combine trend indicators (such as moving average direction or ADX indicator) and only trade in the direction consistent with the main trend.

3. **Black Swan Event Risk**: Sudden market events may cause violent price fluctuations beyond normal statistical distribution assumptions. Solutions include setting fixed stop losses or using volatility filters to pause trading during periods of extreme volatility.

4. **Parameter Stability Risk**: The fixed 20-period and 2/3SD settings may not be applicable to all markets and timeframes. Solutions include backtesting different parameter combinations to find optimal parameters for specific markets or considering adaptive Bollinger Bands width.

5. **Excessive Trading in High Volatility Environments**: In high volatility environments, prices may frequently touch extreme Bollinger Bands, generating too many trading signals. Solutions include adding trade frequency limits or volatility filter conditions.

## Strategy Optimization Directions

1. **Add Trend Filters**:
   Incorporate trend indicators (such as longer-period moving average direction or ADX indicator) to filter trading signals, only trading in the trend direction or strengthening signals consistent with the trend. This optimization can significantly reduce losses from counter-trend trading.

2. **Adaptive Bollinger Bands Parameters**:
   Change the fixed Bollinger Bands length and standard deviation multipliers to adaptive parameters based on market volatility, such as reducing standard deviation multipliers in low volatility environments and increasing them in high volatility environments. This allows the strategy to better adapt to different market states.

3. **Add Volume Filters**:
   Incorporate volume confirmation mechanisms, only entering when price breakouts are accompanied by sufficient trading volume, which can reduce the risk of false breakouts.

4. **Add Time Filters**:
   Implement time filtering functionality to avoid major economic data releases or specific high volatility periods, which can reduce erroneous signals caused by market noise.

5. **Stop Loss and Partial Profit Strategy**:
   Add dynamic stop loss settings and partial profit features, such as partially closing positions when price returns to the middle band (SMA), which can improve the strategy's overall risk-adjusted returns.

6. **Optimize Exit Logic**:
   The current strategy uses fixed 2SD Bollinger Bands as exit points. Consider dynamically adjusting exit points based on market conditions or combining other technical indicators to optimize exit timing.

## Summary

The Double Bollinger Bands Extreme Reversal Trading Strategy is a quantitative trading method that combines statistical principles with technical analysis, capturing reversal opportunities when prices reach extreme statistical areas (3SD). The strategy features clear rules, good risk control structure, and rich visual feedback, suitable for traders who have confidence in mean reversion.

However, the strategy also faces risks such as false breakouts, counter-trend trading, and parameter stability issues. By adding trend filters, adaptive parameters, volume confirmation, and improved stop-loss and profit-taking strategies, the robustness and profitability of the strategy can be further enhanced.

Overall, this is a well-designed basic strategy framework that can be used independently or as part of a more complex trading system. For traders seeking to identify market extreme reversal opportunities based on statistical methods, this is a strategy worth considering.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-04 00:00:00
end: 2024-07-02 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("Double Bollinger Bands Strategy with Signals (By Rolwin)", overlay=true)

// Input settings
length = input(20, title="Bollinger Bands Length")
src = close

// Bollinger Bands (Standard Deviation Levels)
bb1_mult = 2.0
bb2_mult = 3.0
basis = ta.sma(src, length)
dev1 = bb1_mult * ta.stdev(src, length)
dev2 = bb2_mult * ta.stdev(src, length)

// Band Levels
upper1 = basis + dev1
lower1 = basis - dev1
upper2 = basis + dev2
lower2 = basis - dev2

// **Trading Conditions**
longCondition = ta.crossover(src, lower2)  // Price crosses above lower 3SD band
shortCondition = ta.crossunder(src, upper2)  // Price crosses below upper 3SD band

// **Exit Conditions**
exitLong = ta.crossover(src, upper1)  // Exit long at upper 2SD band
exitShort = ta.crossunder(src, lower1)  // Exit short at lower 2SD band

// **Execute trades**
strategy.entry("Long", strategy.long, when=longCondition)
strategy.entry("Short", strategy.short, when=shortCondition)

strategy.close("Long", when=exitLong)
strategy.close("Short", when=exitShort)

// **Plot Bollinger Bands**
plot(upper1, color=color.blue, title="Upper Band (2 SD)")
plot(lower1, color=color.blue, title="Lower Band (2 SD)")
plot(upper2, color=color.red, title="Upper Band (3 SD)")
plot(lower2, color=color.red, title="Lower Band (3 SD)")
plot(basis, color=color.gray, title="Middle Band (SMA)")

// **Plot Buy & Sell Signals**
plotshape(longCondition, location=location.belowbar, color=color.green, style=shape.labelup, size=size.small, title="BUY Signal")
plotshape(shortCondition, location=location.abovebar, color=color.red, style=shape.labeldown, size=size.small, title="SELL Signal")

// **Candle Coloring for 3SD Touch**
touches3SD = (src >= upper2) or (src <= lower2)
barcolor(touches3SD ? color.white : na)  // Change to white if touching 3SD band

```

> Detail

https://www.fmz.com/strategy/484919

> Last Modified

2025-03-05 10:10:08
