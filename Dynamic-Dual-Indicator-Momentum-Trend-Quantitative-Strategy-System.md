
> Name

Dynamic-Dual-Indicator-Momentum-Trend-Quantitative-Strategy-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/652f0513b16012a70e.png)

[trans]
#### 概述
本策略是一个结合了相对强弱指数(RSI)和移动平均线(MA)的量化交易系统,通过两个指标的协同作用来识别市场趋势和交易机会。该系统还整合了成交量和波动率过滤器,以提高交易信号的可靠性。策略的核心思想是通过快速移动平均线和慢速移动平均线的交叉来确定趋势方向,同时使用RSI来确认动量,最终形成一个完整的交易决策框架。

#### 策略原理
策略采用双层信号确认机制:
1. 趋势确认层:利用快速移动平均线(FastMA)和慢速移动平均线(SlowMA)的交叉来判断市场趋势。当快线从下方突破慢线时,视为上升趋势确立;当快线从上方跌破慢线时,视为下降趋势确立。
2. 动量确认层:使用RSI指标作为动量确认工具。在上升趋势中,要求RSI低于50,表明市场还有上涨空间;在下降趋势中,要求RSI高于50,表明市场还有下跌空间。
3. 交易过滤器:通过设置成交量和ATR波动率的最小阈值,过滤掉流动性不足或波动性不足的交易信号。

#### 策略优势
1. 多维度信号确认:通过结合趋势和动量指标,降低了假信号的出现概率。
2. 风险管理完善:集成了止损和止盈功能,可以根据百分比设置风险控制点位。
3. 灵活的过滤机制:可以根据市场条件灵活开启或关闭成交量和波动率过滤器。
4. 自动平仓机制:在出现反转信号时自动平仓,避免过度持仓。

#### 策略风险
1. 震荡市场风险:在横盘震荡市场中,可能会频繁出现假突破信号。
2. 滑点风险:在行情剧烈波动时,实际成交价格可能与信号触发价格存在较大偏差。
3. 参数敏感性:策略效果高度依赖于参数的设置,不同市场环境可能需要不同的参数组合。

#### 策略优化方向
1. 动态参数调整:可以引入自适应参数机制,根据市场波动情况动态调整移动平均线周期和RSI阈值。
2. 信号权重系统:建立信号强度评分体系,根据不同指标的表现赋予不同权重。
3. 市场环境分类:增加市场环境识别模块,在不同市场状态下使用不同的交易策略。
4. 风险控制增强:引入动态止损机制,根据市场波动性自动调整止损位置。

#### 总结
该策略通过综合运用趋势和动量指标,建立了一个较为完善的交易系统。系统的优势在于多层次的信号确认机制和完善的风险管理体系,但在实际应用中需要注意市场环境对策略表现的影响,并根据实际情况进行参数优化。通过持续改进和优化,该策略有望在不同市场环境下都能保持稳定的表现。 || 

#### Overview
This strategy is a quantitative trading system that combines the Relative Strength Index (RSI) and Moving Averages (MA) to identify market trends and trading opportunities. The system also incorporates volume and volatility filters to enhance the reliability of trading signals. The core concept is to determine trend direction through the crossover of fast and slow moving averages while using RSI for momentum confirmation, ultimately forming a complete trading decision framework.

#### Strategy Principle
The strategy employs a dual-signal confirmation mechanism:
1. Trend Confirmation Layer: Uses the crossover of Fast Moving Average (FastMA) and Slow Moving Average (SlowMA) to determine market trends. When the fast line crosses above the slow line, an uptrend is established; when the fast line crosses below the slow line, a downtrend is established.
2. Momentum Confirmation Layer: Uses RSI as a momentum confirmation tool. In uptrends, RSI should be below 50, indicating upward potential; in downtrends, RSI should be above 50, indicating downward potential.
3. Trading Filters: Sets minimum thresholds for volume and ATR volatility to filter out signals with insufficient liquidity or volatility.

#### Strategy Advantages
1. Multi-dimensional Signal Confirmation: Combines trend and momentum indicators to reduce the probability of false signals.
2. Comprehensive Risk Management: Integrates stop-loss and take-profit functions with percentage-based risk control points.
3. Flexible Filtering Mechanism: Volume and volatility filters can be enabled or disabled based on market conditions.
4. Automatic Position Closing: Closes positions automatically when reversal signals appear to avoid overholding.

#### Strategy Risks
1. Choppy Market Risk: False breakout signals may frequently occur in range-bound markets.
2. Slippage Risk: During volatile market conditions, actual execution prices may significantly deviate from signal trigger prices.
3. Parameter Sensitivity: Strategy performance highly depends on parameter settings, different market environments may require different parameter combinations.

#### Strategy Optimization Directions
1. Dynamic Parameter Adjustment: Introduce adaptive parameter mechanisms to dynamically adjust moving average periods and RSI thresholds based on market volatility.
2. Signal Weighting System: Establish a signal strength scoring system, assigning different weights based on indicator performance.
3. Market Environment Classification: Add market state identification modules to employ different trading strategies under different market conditions.
4. Enhanced Risk Control: Introduce dynamic stop-loss mechanisms to automatically adjust stop-loss positions based on market volatility.

#### Summary
This strategy establishes a comprehensive trading system through the integrated use of trend and momentum indicators. The system's strengths lie in its multi-layered signal confirmation mechanism and comprehensive risk management framework. However, practical application requires attention to the impact of market conditions on strategy performance and parameter optimization based on actual circumstances. Through continuous improvement and optimization, this strategy has the potential to maintain stable performance across different market environments.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-17 00:00:00
end: 2025-01-16 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

// © Boba2601
//@version=5
strategy("RSI-MA Synergy", overlay=true, margin_long=100, margin_short=100)

// === Налаштування індикаторів ===
length_rsi = input.int(14, title="RSI Period", group="Індикатори")
fastMALength = input.int(9, title="Fast MA Length", group="Індикатори")
slowMALength = input.int(21, title="Slow MA Length", group="Індикатори")

// === Налаштування стоп-лосу і тейк-профіту ===
useStopLossTakeProfit = input.bool(true, title="Використовувати стоп-лос і тейк-профіт", group="Стоп-лос і Тейк-профіт")
stopLossPercent = input.float(2.0, title="Стоп-лос (%)", minval=0.1, step=0.1, group="Стоп-лос і Тейк-профіт")
takeProfitPercent = input.float(4.0, title="Тейк-профіт (%)", minval=0.1, step=0.1, group="Стоп-лос і Тейк-профіт")

// === Налаштування об'єму та волатильності ===
useVolumeFilter = input.bool(false, title="Використовувати фільтр об'єму", group="Об'єм та Волатильність")
volumeThreshold = input.int(50000, title="Мінімальний об'єм", group="Об'єм та Волатильність")
useVolatilityFilter = input.bool(false, title="Використовувати фільтр волатильності", group="Об'єм та Волатильність")
atrLength = input.int(14, title="Період ATR для волатильності", group="Об'єм та Волатильність")
volatilityThreshold = input.float(1.5, title="Мінімальна волатильність (ATR)", step=0.1, group="Об'єм та Волатильність")


// === Розрахунок індикаторів ===
rsiValue = ta.rsi(close, length_rsi)
fastMA = ta.sma(close, fastMALength)
slowMA = ta.sma(close, slowMALength)

// === Розрахунок об'єму та волатильності ===
averageVolume = ta.sma(volume, 20)
atrValue = ta.atr(atrLength)

// === Умови входу в позицію ===
longCondition = ta.crossover(fastMA, slowMA) and rsiValue < 50
if useVolumeFilter
    longCondition := longCondition and volume > volumeThreshold
if useVolatilityFilter
    longCondition := longCondition and atrValue > volatilityThreshold

shortCondition = ta.crossunder(fastMA, slowMA) and rsiValue > 50
if useVolumeFilter
    shortCondition := shortCondition and volume > volumeThreshold
if useVolatilityFilter
    shortCondition := shortCondition and atrValue > volatilityThreshold

// === Логіка входу та виходу з позиції ===
if (longCondition)
    strategy.entry("Long", strategy.long)
    if (useStopLossTakeProfit)
        stopLossPrice = close * (1 - stopLossPercent / 100)
        takeProfitPrice = close * (1 + takeProfitPercent / 100)
        strategy.exit("Exit Long", "Long", stop = stopLossPrice, limit = takeProfitPrice)

if (shortCondition)
    strategy.entry("Short", strategy.short)
    if (useStopLossTakeProfit)
        stopLossPrice = close * (1 + stopLossPercent / 100)
        takeProfitPrice = close * (1 - takeProfitPercent / 100)
        strategy.exit("Exit Short", "Short", stop = stopLossPrice, limit = takeProfitPrice)

// === Закриття позицій за зворотнім сигналом ===
if (strategy.position_size > 0 and (ta.crossunder(fastMA, slowMA) or rsiValue > 50))
    strategy.close("Long", comment="Закрито по сигналу")

if (strategy.position_size < 0 and (ta.crossover(fastMA, slowMA) or rsiValue < 50))
    strategy.close("Short", comment="Закрито по сигналу")
```

> Detail

https://www.fmz.com/strategy/478749

> Last Modified

2025-01-17 16:41:17
