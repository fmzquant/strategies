
> Name

Technical-Indicator-Distance-Measurement-and-MACD-Reversal-Hybrid-Quantitative-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8bbbd81f4d86cd0cc48.png)
![IMG](https://www.fmz.com/upload/asset/2d88fc21845cfac3f7817.png)



[trans]

#### 策略概述

这个策略是一种结合了技术指标距离测量和MACD反转信号的混合量化交易方法。它通过计算当前市场状态与预定义牛市和熊市中心点之间的欧几里得距离，同时结合MACD指标的交叉信号，形成一个既能捕捉趋势动量又能识别潜在反转的复合策略。该策略特别之处在于将多个技术指标（EMA、波动率、动量、RSI和MACD）组合成特征向量，通过数学方法量化市场状态与预设条件的相似度，从而产生更加精确的交易信号。

#### 策略原理

该策略的核心原理建立在两个主要机制上：

1. **距离测量机制**：策略首先构建了由6个技术指标组成的特征向量，包括价格EMA、波动率、动量、RSI、MACD线和MACD柱状图。同时，预定义了牛市和熊市两个中心点向量，分别代表市场处于上涨和下跌趋势时的理想状态。通过计算当前市场状态向量与这两个中心点向量之间的欧几里得距离，策略能够判断当前市场更接近哪种状态。

2. **MACD交叉信号机制**：作为第二层确认，策略使用MACD指标的交叉信号来判断市场的动量变化。MACD线上穿信号线被视为买入信号，而MACD线下穿信号线则被视为卖出信号。

这两种机制的结合形成了双重确认系统：一方面通过距离测量判断市场总体倾向，一方面通过MACD交叉判断短期动量变化。策略既可以利用两个机制的共同确认（距离测量和MACD同时给出相同信号），也可以基于任一机制独立产生的信号进行交易，增加了信号的多样性和捕获机会的频率。

#### 策略优势

1. **多维度市场状态评估**：通过将多个技术指标组合成特征向量，策略能够从多个维度评估市场状态，而不仅仅依赖单一指标，从而降低了虚假信号的风险。

2. **灵活的信号生成机制**：策略同时使用距离测量和MACD交叉两种机制生成信号，既可以捕捉趋势性行情中的持续动量，又能及时发现潜在的反转点，适应性更强。

3. **数学模型的客观性**：欧几里得距离计算提供了一种客观、数学化的方法来评估市场状态，减少了主观判断因素的影响。

4. **自动平仓机制**：策略在产生新信号时会自动平掉相反方向的持仓，有助于及时止损并转换仓位方向，适应快速变化的市场。

5. **性能监控功能**：策略内置了交易盈亏的跟踪和显示功能，便于实时评估策略表现并进行必要的参数调整。

#### 策略风险

1. **参数敏感性风险**：策略中使用的EMA、RSI和MACD等指标都依赖于特定的参数设置。如果这些参数不适合当前市场条件，可能导致错误信号的产生。解决方法是通过回测找到最优参数组合，并定期重新评估参数的有效性。

2. **过度交易风险**：由于策略可以基于两种不同机制独立产生信号，在波动性较大的市场中可能会产生过多交易信号，增加交易成本。可以通过增加信号过滤机制或调整信号生成逻辑来减少不必要的交易。

3. **趋势与反转判断冲突**：在某些市场条件下，距离测量和MACD信号可能会给出相互矛盾的指示，造成策略行为不一致。建议建立明确的信号优先级规则或引入额外的确认机制。

4. **中心点设置的静态性**：当前策略中的牛熊市中心点部分参数是静态设置的（如RSI值），可能无法适应所有市场环境。可以考虑引入自适应机制，根据历史数据动态调整中心点的位置。

5. **单一时间框架局限性**：策略仅在单一时间框架内运行，可能会错过更大或更小时间框架的重要信号。考虑扩展为多时间框架策略可以提高信号的可靠性。

#### 策略优化方向

1. **自适应中心点设计**：目前的牛熊市中心点部分参数是固定的，可以改进为基于历史数据自动计算的动态中心点。例如，可以使用过去N个周期的数据来确定理想的牛市和熊市状态，使中心点能够随市场条件自动调整。

2. **信号优先级和过滤机制**：引入基于市场环境的信号优先级系统，例如在高波动率环境下优先考虑反转信号，在低波动率趋势明显的环境下优先考虑距离测量信号。同时，可以增加基于波动率或成交量的信号过滤器，减少噪音信号。

3. **止损和利润目标机制**：当前策略缺乏明确的止损和利润目标设置，可以增加基于ATR或固定百分比的止损机制，以及基于支撑/阻力位或风险回报比的利润目标设置。

4. **多时间框架分析整合**：将更大时间框架的趋势信息整合到当前策略中，例如只在日线趋势方向一致的情况下执行小时级别的交易信号，以提高信号的可靠性。

5. **特征权重动态调整**：为特征向量中的不同指标分配动态权重，根据各指标在不同市场条件下的预测能力自动调整其影响力，提高距离计算的准确性。

6. **机器学习增强**：可以考虑引入简单的机器学习算法来优化中心点位置或特征权重，甚至可以使用聚类算法自动发现市场的多个状态中心点，而不仅仅是简单的牛熊两种状态。

#### 总结

技术指标距离测量与MACD反转混合量化交易策略是一种创新性的量化交易方法，它通过欧几里得距离计算技术将多个常用技术指标整合为统一的市场状态评估系统，并结合MACD交叉信号形成双重确认机制。这种方法既能捕捉持续趋势中的动量，又能识别潜在的市场反转点，具有较强的适应性和灵活性。

该策略的核心优势在于其多维度市场评估能力和数学模型的客观性，但也面临参数敏感性、过度交易和信号冲突等风险。通过引入自适应中心点设计、优化信号优先级系统、增加止损机制、整合多时间框架分析以及应用机器学习技术，策略有很大的优化和提升空间。

对于量化交易者而言，这种将传统技术分析方法与数学模型结合的策略提供了一个值得探索的新方向，特别适合那些希望在保持策略可解释性的同时提高交易决策客观性的交易者。 || 
#### Strategy Overview

This strategy is a hybrid quantitative trading approach that combines technical indicator distance measurement with MACD reversal signals. It calculates the Euclidean distance between the current market state and predefined bullish and bearish centroids, while also incorporating MACD crossover signals to form a composite strategy capable of capturing trend momentum and identifying potential reversals. The strategy's uniqueness lies in combining multiple technical indicators (EMA, volatility, momentum, RSI, and MACD) into feature vectors, quantifying the similarity between the current market state and preset conditions through mathematical methods to generate more precise trading signals.

#### Strategy Principles

The core principles of this strategy are built on two main mechanisms:

1. **Distance Measurement Mechanism**: The strategy first constructs a feature vector comprising six technical indicators, including price EMA, volatility, momentum, RSI, MACD line, and MACD histogram. Simultaneously, it predefines two centroid vectors representing bullish and bearish market states, which represent ideal conditions during upward and downward trends. By calculating the Euclidean distance between the current market state vector and these two centroid vectors, the strategy can determine which state the current market more closely resembles.

2. **MACD Crossover Signal Mechanism**: As a second layer of confirmation, the strategy uses MACD indicator crossover signals to judge momentum changes in the market. MACD line crossing above the signal line is considered a buy signal, while MACD line crossing below the signal line is considered a sell signal.

The combination of these two mechanisms forms a dual confirmation system: one aspect judges the overall market tendency through distance measurement, while the other judges short-term momentum changes through MACD crossovers. The strategy can either utilize the joint confirmation of both mechanisms (when distance measurement and MACD simultaneously provide the same signal) or generate trades based on signals independently produced by either mechanism, increasing signal diversity and opportunity capture frequency.

#### Strategy Advantages

1. **Multi-dimensional Market State Assessment**: By combining multiple technical indicators into a feature vector, the strategy can assess market conditions from multiple dimensions rather than relying on a single indicator, thereby reducing the risk of false signals.

2. **Flexible Signal Generation Mechanism**: The strategy simultaneously uses distance measurement and MACD crossovers to generate signals, allowing it to capture sustained momentum in trending markets while also timely identifying potential reversal points, resulting in stronger adaptability.

3. **Objectivity of Mathematical Models**: Euclidean distance calculation provides an objective, mathematical method for evaluating market states, reducing the influence of subjective judgment factors.

4. **Automatic Position Closing Mechanism**: The strategy automatically closes positions in the opposite direction when new signals are generated, helping to implement timely stop-losses and switch position direction, adapting to rapidly changing markets.

5. **Performance Monitoring Functionality**: The strategy has built-in tracking and display functions for trade profits and losses, facilitating real-time assessment of strategy performance and necessary parameter adjustments.

#### Strategy Risks

1. **Parameter Sensitivity Risk**: The EMA, RSI, and MACD indicators used in the strategy all depend on specific parameter settings. If these parameters are not suitable for current market conditions, they may lead to erroneous signals. The solution is to find optimal parameter combinations through backtesting and periodically reassess parameter effectiveness.

2. **Overtrading Risk**: Since the strategy can independently generate signals based on two different mechanisms, it may produce excessive trading signals in highly volatile markets, increasing transaction costs. This can be mitigated by adding signal filtering mechanisms or adjusting signal generation logic to reduce unnecessary trades.

3. **Trend and Reversal Judgment Conflicts**: Under certain market conditions, distance measurement and MACD signals may provide contradictory indications, causing inconsistent strategy behavior. It is recommended to establish clear signal priority rules or introduce additional confirmation mechanisms.

4. **Static Nature of Centroid Settings**: Some parameters in the current strategy's bull and bear market centroids are statically set (such as RSI values), which may not adapt to all market environments. Consider introducing adaptive mechanisms to dynamically adjust centroid positions based on historical data.

5. **Single Timeframe Limitation**: The strategy operates within a single timeframe, potentially missing important signals from larger or smaller timeframes. Expanding to a multi-timeframe strategy can improve signal reliability.

#### Strategy Optimization Directions

1. **Adaptive Centroid Design**: Currently, some parameters for bull and bear market centroids are fixed. This could be improved to dynamic centroids automatically calculated based on historical data. For example, data from the past N periods could be used to determine ideal bullish and bearish states, allowing centroids to automatically adjust with market conditions.

2. **Signal Priority and Filtering Mechanisms**: Introduce a signal priority system based on market environment. For example, prioritize reversal signals in high-volatility environments and distance measurement signals in low-volatility environments with clear trends. Additionally, signal filters based on volatility or volume could be added to reduce noise signals.

3. **Stop-Loss and Profit Target Mechanisms**: The current strategy lacks clear stop-loss and profit target settings. Consider adding stop-loss mechanisms based on ATR or fixed percentages, as well as profit targets based on support/resistance levels or risk-reward ratios.

4. **Multi-Timeframe Analysis Integration**: Integrate trend information from larger timeframes into the current strategy. For example, only execute hourly-level trading signals when they align with the daily trend direction to improve signal reliability.

5. **Dynamic Adjustment of Feature Weights**: Assign dynamic weights to different indicators in the feature vector, automatically adjusting their influence based on each indicator's predictive ability under different market conditions to improve the accuracy of distance calculations.

6. **Machine Learning Enhancement**: Consider introducing simple machine learning algorithms to optimize centroid positions or feature weights. Clustering algorithms could even be used to automatically discover multiple market state centroids, rather than simply using two bull and bear states.

#### Summary

The Technical Indicator Distance Measurement and MACD Reversal Hybrid Quantitative Trading Strategy is an innovative quantitative trading method that integrates multiple common technical indicators into a unified market state assessment system through Euclidean distance calculation techniques, combined with MACD crossover signals to form a dual confirmation mechanism. This approach can capture momentum in sustained trends while also identifying potential market reversal points, demonstrating strong adaptability and flexibility.

The core advantages of this strategy lie in its multi-dimensional market assessment capability and the objectivity of its mathematical model. However, it also faces risks such as parameter sensitivity, overtrading, and signal conflicts. The strategy has significant optimization potential through introducing adaptive centroid designs, optimizing signal priority systems, adding stop-loss mechanisms, integrating multi-timeframe analysis, and applying machine learning techniques.

For quantitative traders, this strategy combining traditional technical analysis methods with mathematical models provides a worthwhile new direction to explore, particularly suitable for those who wish to improve the objectivity of trading decisions while maintaining strategy explainability.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-15 00:00:00
end: 2024-12-31 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Bysq-Distance Reversal Entry - BTCUSDT (v6)", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10, margin_long=0, margin_short=0)

// ========== FEATURE ENGINEERING ==========
price = close
priceNorm = ta.ema(price, 5)
volatility = ta.stdev(price, 20)
momentum = ta.ema(close - close[5], 5)
rsi = ta.rsi(close, 14)
macdLine = ta.ema(close, 12) - ta.ema(close, 26)
signalLine = ta.ema(macdLine, 9)
macdHist = macdLine - signalLine

// Fitur sebagai vector
featureVector = array.new_float(6)
array.set(featureVector, 0, priceNorm)
array.set(featureVector, 1, volatility)
array.set(featureVector, 2, momentum)
array.set(featureVector, 3, rsi)
array.set(featureVector, 4, macdLine)
array.set(featureVector, 5, macdHist)

// Centroid bullish
bullishCentroid = array.new_float(6)
array.set(bullishCentroid, 0, price)
array.set(bullishCentroid, 1, volatility)
array.set(bullishCentroid, 2, momentum)
array.set(bullishCentroid, 3, 60.0)
array.set(bullishCentroid, 4, macdLine)
array.set(bullishCentroid, 5, macdHist)

// Centroid bearish
bearishCentroid = array.new_float(6)
array.set(bearishCentroid, 0, price)
array.set(bearishCentroid, 1, volatility)
array.set(bearishCentroid, 2, momentum)
array.set(bearishCentroid, 3, 40.0)
array.set(bearishCentroid, 4, macdLine)
array.set(bearishCentroid, 5, macdHist)

// Fungsi Euclidean Distance
euclideanDistance(arr1, arr2) =>
    dist = 0.0
    for i = 0 to array.size(arr1) - 1
        a = array.get(arr1, i)
        b = array.get(arr2, i)
        dist += math.pow((a - b), 2)
    math.sqrt(dist)

// Hitung jarak ke centroid
distToBullish = euclideanDistance(featureVector, bullishCentroid)
distToBearish = euclideanDistance(featureVector, bearishCentroid)

// ========== SINYAL ==========
// Original distance strategy signals
isDistanceBuySignal = distToBullish < distToBearish and ta.crossover(macdLine, signalLine)
isDistanceSellSignal = distToBearish < distToBullish and ta.crossunder(macdLine, signalLine)

// Reversal strategy signals
isReversalBuySignal = ta.crossover(macdLine, signalLine)
isReversalSellSignal = ta.crossunder(macdLine, signalLine)

// Combined signals - using both strategies
isBuySignal = isDistanceBuySignal or isReversalBuySignal
isSellSignal = isDistanceSellSignal or isReversalSellSignal

// ========== EKSEKUSI ==========
if isBuySignal
    strategy.close("Sell")         // Close any sell position first (from reversal strategy)
    strategy.entry("Buy", strategy.long)
    
if isSellSignal
    strategy.close("Buy")          // Close any buy position first (from reversal strategy)
    strategy.entry("Sell", strategy.short)

// ========== METRIK KINERJA ==========
float lastOpenTradeProfit = na
if strategy.opentrades > 0
    lastOpenTradeProfit := strategy.opentrades.profit(strategy.opentrades - 1)

float lastClosedTradeProfit = na
if strategy.closedtrades > 0
    lastClosedTradeProfit := strategy.closedtrades.profit(strategy.closedtrades - 1)

// Plot info
plot(lastOpenTradeProfit, title="Last Open Trade Profit", color=color.blue)
plot(lastClosedTradeProfit, title="Last Closed Trade Profit", color=color.orange)
```

> Detail

https://www.fmz.com/strategy/490794

> Last Modified

2025-04-16 15:19:46
