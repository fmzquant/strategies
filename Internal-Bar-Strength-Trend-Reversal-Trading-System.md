
> Name

Internal-Bar-Strength-Trend-Reversal-Trading-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8a2de383804ac46fe0e.png)
![IMG](https://www.fmz.com/upload/asset/2d8bf4bb7f108792b9abe.png)




[trans]

#### 概述
内部价格强度趋势反转交易系统是一种基于内部价格强度(IBS)指标的日线级别交易策略。该策略核心在于识别潜在的市场反转点,通过监测前一根蜡烛线收盘价在其高低点范围内的相对位置来判断市场的超买超卖状态。该策略特别适用于股票和美国指数交易,默认参数针对SPY/SPX和NDQ/QQQ等主要指数进行了优化。通过结合指数移动平均线(EMA)作为趋势过滤器,该策略能够在遵循长期趋势的同时捕捉短期价格波动带来的交易机会。

#### 策略原理
该策略的核心在于内部价格强度(IBS)指标的计算与应用。IBS指标通过以下公式计算:
```
IBS = (前一日收盘价 - 前一日最低价) / (前一日最高价 - 前一日最低价)
```

IBS值始终在0到1之间波动:
- IBS值低于0.2通常被解释为超卖状态,代表市场可能即将上涨
- IBS值高于0.9则表明超买状态,意味着市场可能即将回调

该策略的交易规则如下:
1. 做多入场条件:
   - 条件1:IBS低于用户定义的入场阈值(默认为0.09)
   - 条件2:当前价格位于N周期指数移动平均线(EMA)之上(默认周期为220)
   - 注意:用户可以通过将EMA周期设置为0来禁用EMA条件

2. 做多出场条件:
   - 当IBS上升超过用户定义的出场阈值(默认为0.985)时平仓
   - 或者当交易持续时间达到最大交易周期(默认为14天)时平仓

除此之外,策略还引入了"最小新入场距离百分比"参数,确保新仓位仅在价格回撤足够多时才开仓,有效减少了回撤风险并优化了资金管理。

#### 策略优势
1. 市场时机把握精准:利用IBS指标可以精确捕捉市场的超买超卖状态,为入场和出场提供了客观的数学依据,减少了主观判断带来的偏差。

2. 趋势过滤机制:通过EMA作为趋势过滤器,确保交易方向与主要趋势保持一致,有效避免了逆势交易的风险。策略可根据不同市场特性调整EMA周期,或完全禁用此条件。

3. 灵活的仓位管理:策略支持金字塔式加仓(最多2次),并引入了"最小新入场距离百分比"参数,实现了更为智能的分批建仓机制,在价格回撤时可以有效降低平均持仓成本。

4. 自动风险控制:策略设置了最大持仓时间限制,即使市场未触发常规出场信号,也会在预设的最大交易周期后自动平仓,有效控制了单笔交易的风险暴露时间。

5. 参数优化:默认参数已针对SPY和QQQ/NDQ等主要市场指数进行了优化,用户可直接应用推荐设置:
   - QQQ推荐设置:入场阈值0.09,出场阈值0.985,EMA周期220,最小入场距离0%,最大持仓天数14天
   - SPY推荐设置:入场阈值0.11,出场阈值0.995,EMA周期200,最小入场距离0%,最大持仓天数12天

6. 全面的交易模式:支持仅做多、仅做空或双向交易模式,适应不同市场环境和交易风格。

#### 策略风险
1. 参数敏感性:IBS入场和出场阈值对策略表现影响较大,参数设置不当可能导致过度交易或错过重要交易机会。建议在实盘应用前,针对特定交易品种进行充分的历史数据回测和参数优化。

2. 震荡市场风险:在无明显趋势的震荡市场中,IBS信号可能频繁出现,导致过度交易和不必要的交易成本增加。解决方案是增加过滤条件,如要求多个连续的IBS信号确认或结合其他指标(如ATR)来判断市场波动性。

3. 急剧趋势变化的滞后性:当市场出现快速趋势转变时,基于前一日数据计算的IBS指标可能反应滞后,导致入场或出场时机不够理想。建议在高波动时期适当调整IBS阈值或缩短最大持仓时间。

4. 资金管理风险:默认使用账户50%的资金进行交易,在多次加仓的情况下可能导致风险暴露过大。建议用户根据自身风险承受能力调整仓位大小和加仓参数。

5. 技术实现限制:策略基于收盘价执行交易,在实际操作中可能面临滑点和价格差异。为降低此类风险,可考虑在收盘前一定时间下单或使用限价单代替市价单。

#### 策略优化方向
1. 动态阈值调整:当前策略使用固定的IBS入场和出场阈值,可以考虑基于市场波动性动态调整这些阈值。例如,在高波动时期适当提高入场阈值和降低出场阈值,以减少假信号;在低波动时期则可采用更为激进的设置。具体实现可以通过将IBS阈值与ATR(平均真实波幅)或历史波动率挂钩。

2. 多时间周期确认:引入多时间周期分析框架,要求短期和中期IBS信号同时确认才执行交易。例如,除了日线IBS信号外,还可以计算周线或4小时线的IBS值,只有当多个时间周期都显示超买或超卖状态时才入场,这样可以大幅提高信号质量。

3. 智能止损机制:当前策略仅依赖IBS出场信号和最大持仓时间控制风险,可以引入更智能的止损机制。例如,基于ATR的动态止损、跟踪止损或基于支撑/阻力位的止损策略,以更好地保护利润并控制单笔交易风险。

4. 市场状态自适应:引入市场状态识别机制,在不同市场环境(趋势市、震荡市)下使用不同的参数设置。可以通过ADX(平均方向指数)或其他趋势强度指标来识别市场状态,在强趋势环境下放宽IBS条件,在震荡市场中采用更严格的IBS阈值。

5. 机器学习优化:利用机器学习技术对IBS信号进行优化和筛选。通过训练模型识别哪些IBS信号更可能产生盈利交易,并根据市场特性自动调整参数,实现策略的自适应性能。这种方法可以显著提高策略的稳定性和适应性,尤其是在面对不同市场条件和交易品种时。

#### 总结
内部价格强度趋势反转交易系统是一种结合了内部价格强度(IBS)指标和指数移动平均线(EMA)的日线级别交易策略。该策略通过识别潜在的市场反转点和遵循长期趋势来优化交易决策,特别适合股票和美国指数交易。核心优势在于其客观的数学模型、灵活的仓位管理和内置的风险控制机制。

策略已针对SPY/SPX和NDQ/QQQ等主要市场指数进行了参数优化,用户可以直接应用推荐设置进行交易。然而,任何交易策略都存在风险,包括参数敏感性、震荡市场风险和急剧趋势变化下的滞后性等。

未来优化方向包括动态阈值调整、多时间周期确认、智能止损机制、市场状态自适应和机器学习优化等。这些改进可以进一步提高策略的适应性和稳健性,使其在不同市场环境下都能保持良好表现。

作为量化交易策略,内部价格强度趋势反转交易系统为交易者提供了一种基于规则的、客观的交易方法,减少了情绪因素对交易决策的影响,有助于实现更加一致和可预测的交易结果。 || 

#### Overview
The Internal Bar Strength Trend Reversal Trading System is a daily timeframe trading strategy based on the Internal Bar Strength (IBS) indicator. The core concept of this strategy is to identify potential market reversal points by monitoring the relative position of the previous candle's closing price within its high-low range to determine overbought and oversold market conditions. This strategy is particularly suitable for stocks and US indices trading, with default parameters optimized for major indices like SPY/SPX and NDQ/QQQ. By combining the Exponential Moving Average (EMA) as a trend filter, this strategy can capture short-term price fluctuations while adhering to long-term trends.

#### Strategy Principles
The core of this strategy lies in the calculation and application of the Internal Bar Strength (IBS) indicator. The IBS is calculated using the following formula:
```
IBS = (Previous Day's Close - Previous Day's Low) / (Previous Day's High - Previous Day's Low)
```

The IBS value always fluctuates between 0 and 1:
- An IBS value below 0.2 is typically interpreted as an oversold condition, indicating a potential upward market movement
- An IBS value above 0.9 suggests an overbought condition, signaling a possible market retracement

The trading rules of this strategy are as follows:
1. Long Entry Conditions:
   - Condition 1: IBS is below the user-defined entry threshold (default is 0.09)
   - Condition 2: Current price is above the N-period Exponential Moving Average (EMA) (default period is 220)
   - Note: Users can disable the EMA condition by setting the EMA period to 0

2. Long Exit Conditions:
   - Close the position when IBS rises above the user-defined exit threshold (default is 0.985)
   - Or close the position when the trade duration reaches the maximum trading period (default is 14 days)

Additionally, the strategy introduces a "Minimum Distance for New Entry (%)" parameter, ensuring that new positions are only opened when the price has pulled back sufficiently, effectively reducing drawdown risk and optimizing capital management.

#### Strategy Advantages
1. Precise Market Timing: The use of the IBS indicator allows for accurate capture of market overbought and oversold conditions, providing an objective mathematical basis for entries and exits, reducing biases from subjective judgment.

2. Trend Filtering Mechanism: By using EMA as a trend filter, the strategy ensures that the trading direction aligns with the main trend, effectively avoiding the risks of counter-trend trading. The EMA period can be adjusted based on different market characteristics or completely disabled.

3. Flexible Position Management: The strategy supports pyramiding (up to 2 entries) and introduces the "Minimum Distance for New Entry (%)" parameter, implementing a more intelligent phased position building mechanism that can effectively lower the average position cost during price pullbacks.

4. Automatic Risk Control: The strategy sets a maximum holding time limit, automatically closing positions after a preset maximum trading period even if the market doesn't trigger regular exit signals, effectively controlling the risk exposure time for each trade.

5. Parameter Optimization: Default parameters have been optimized for major market indices like SPY and QQQ/NDQ, with recommended settings that users can directly apply:
   - QQQ recommended settings: Entry threshold 0.09, Exit threshold 0.985, EMA period 220, Minimum entry distance 0%, Maximum holding days 14
   - SPY recommended settings: Entry threshold 0.11, Exit threshold 0.995, EMA period 200, Minimum entry distance 0%, Maximum holding days 12

6. Comprehensive Trading Modes: Supports long-only, short-only, or bidirectional trading modes, adapting to different market environments and trading styles.

#### Strategy Risks
1. Parameter Sensitivity: IBS entry and exit thresholds significantly impact strategy performance; improper parameter settings may lead to overtrading or missing important trading opportunities. It is recommended to conduct thorough historical data backtesting and parameter optimization for specific trading instruments before live implementation.

2. Oscillating Market Risk: In range-bound markets without clear trends, IBS signals may appear frequently, leading to overtrading and unnecessary transaction costs. The solution is to add filtering conditions, such as requiring confirmation from multiple consecutive IBS signals or combining with other indicators (like ATR) to assess market volatility.

3. Lag in Rapid Trend Changes: When markets experience quick trend shifts, the IBS indicator calculated from previous day's data may react with a lag, resulting in less-than-ideal entry or exit timing. It is advisable to adjust IBS thresholds or shorten the maximum holding time during high volatility periods.

4. Capital Management Risk: By default, the strategy uses 50% of account funds for trading, which may lead to excessive risk exposure with multiple position additions. Users should adjust position size and pyramiding parameters according to their risk tolerance.

5. Technical Implementation Limitations: The strategy executes trades based on closing prices, which may face slippage and price discrepancies in actual operations. To reduce such risks, consider placing orders a certain time before market close or using limit orders instead of market orders.

#### Strategy Optimization Directions
1. Dynamic Threshold Adjustment: The current strategy uses fixed IBS entry and exit thresholds. Consider dynamically adjusting these thresholds based on market volatility. For example, increase entry thresholds and decrease exit thresholds during high volatility periods to reduce false signals; adopt more aggressive settings during low volatility periods. This can be implemented by linking IBS thresholds with ATR (Average True Range) or historical volatility.

2. Multi-Timeframe Confirmation: Introduce a multi-timeframe analysis framework, requiring simultaneous confirmation from short-term and medium-term IBS signals before executing trades. For example, in addition to daily IBS signals, calculate weekly or 4-hour IBS values, only entering when multiple timeframes show overbought or oversold conditions, which can significantly improve signal quality.

3. Intelligent Stop-Loss Mechanism: The current strategy relies only on IBS exit signals and maximum holding time to control risk. More intelligent stop-loss mechanisms can be introduced, such as ATR-based dynamic stop-losses, trailing stops, or support/resistance-based stop-loss strategies, to better protect profits and control single trade risk.

4. Market State Adaptation: Introduce market state recognition mechanisms to use different parameter settings in different market environments (trending markets, oscillating markets). Market states can be identified through ADX (Average Directional Index) or other trend strength indicators, relaxing IBS conditions in strong trend environments and adopting stricter IBS thresholds in oscillating markets.

5. Machine Learning Optimization: Utilize machine learning techniques to optimize and filter IBS signals. Train models to identify which IBS signals are more likely to generate profitable trades and automatically adjust parameters based on market characteristics, achieving adaptive strategy performance. This approach can significantly improve strategy stability and adaptability, especially when facing different market conditions and trading instruments.

#### Summary
The Internal Bar Strength Trend Reversal Trading System is a daily timeframe trading strategy that combines the Internal Bar Strength (IBS) indicator with the Exponential Moving Average (EMA). This strategy optimizes trading decisions by identifying potential market reversal points and following long-term trends, making it particularly suitable for stocks and US indices trading. Its core advantages lie in its objective mathematical model, flexible position management, and built-in risk control mechanisms.

The strategy has been parameter-optimized for major market indices like SPY/SPX and NDQ/QQQ, allowing users to directly apply recommended settings for trading. However, like any trading strategy, risks exist, including parameter sensitivity, oscillating market risk, and lag during rapid trend changes.

Future optimization directions include dynamic threshold adjustment, multi-timeframe confirmation, intelligent stop-loss mechanisms, market state adaptation, and machine learning optimization. These improvements can further enhance the strategy's adaptability and robustness, maintaining good performance across different market environments.

As a quantitative trading strategy, the Internal Bar Strength Trend Reversal Trading System provides traders with a rule-based, objective trading method that reduces the impact of emotional factors on trading decisions, helping to achieve more consistent and predictable trading results.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-05 00:00:00
end: 2025-03-03 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"SOL_USDT"}]
*/

//Implementation by AlgoTradeKit
//v.0.5
//The IBS Trading Strategy is a daily bars long-only trading system, based on the concept of Internal Bar Strength (IBS). 
//The strategy aims to identify potential reversals by monitoring how the previous bar’s close positions itself within its high-low range. 
//It is suitable for stock and US indices. The default parameters are optimized for SPY/SPX and NDQ/QQQ
//Setting for QQQ: 0.09, 0.985, 220, 0, 14
//Setting for SPY: 0.11, 0.995, 200, 0, 12

//@version=6
strategy("IBS (Internal Bar Strength) Trading Strategy for SPY and NDQ", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=50, pyramiding = 2, currency = currency.USD, process_orders_on_close=false)

// ***** INPUTS *****
// IBS thresholds
ibsEntryThreshold = input.float(0.09, title="IBS Entry Threshold", step=0.01, tooltip="IBS = (Previous Close - Previous Low) / (Previous High - Previous Low), and IBS value below 0.2 is typically interpreted as an oversold condition, while a value above 0.9 suggests an overbought state.")
ibsExitThreshold  = input.float(0.985, title="IBS Exit Threshold", step=0.01, tooltip="IBS = (Previous Close - Previous Low) / (Previous High - Previous Low), and IBS value below 0.2 is typically interpreted as an oversold condition, while a value above 0.9 suggests an overbought state.")
// EMA period (set to 0 to disable the EMA condition)
emaPeriod = input.int(220, title="EMA Period (0 to disable)", minval=0, maxval=5000, step=1, tooltip="Exponential Moving Average Filter Period (0 to disable)")
// Minimum percentage drop required for a new entry (for dollar-cost averaging)
minEntryPct = input.float(0, title="Minimum Distance for New Entry (%)", step=0.05, minval=0.0, maxval=100, tooltip = "Distance in Price from Last Opened Position, in Percentage Terms (%)")
maxTradeDuration = input.int(title="Maximum Trade Duration (days)", defval=14, minval=1, step=1, maxval=1000, tooltip = "Exit at close if maximum trade duration is reached.")


// Persistent variable to record the bar index when the trade is entered.
var int entryBarIndex = na

// ***** EMA CALCULATION *****
// Calculate the EMA globally if the period is greater than 0, otherwise leave as na.
emaValue = emaPeriod > 0 ? ta.ema(close, emaPeriod) : na

// ***** IBS CALCULATION *****
// Calculate IBS using the previous bar’s values.
// Guard against division by zero: if previous high equals previous low, default IBS to 0.5.
prevHigh  = high[1]
prevLow   = low[1]
prevClose = close[1]
ibs = (prevHigh != prevLow) ? (prevClose - prevLow) / (prevHigh - prevLow) : 0.5

// ***** ENTRY AND EXIT CONDITIONS *****
// Define the EMA condition: if emaPeriod is 0, bypass the EMA check.
emaConditionLong = emaPeriod == 0 or (close > emaValue)
emaConditionShort = emaPeriod == 0 or (close < emaValue)

// Entry: IBS is below the entry threshold and the EMA condition holds.
enterLong = (ibs < ibsEntryThreshold) and emaConditionLong 
enterShort = (ibs > ibsExitThreshold) and emaConditionShort 

// Exit: IBS is above the exit threshold.
exitLong = ibs > ibsExitThreshold
exitShort = ibs < ibsEntryThreshold

// ***** DOLLAR-COST AVERAGING CONDITION IN PERCENTAGE *****
// Track the last entry price. Reset when there is no open position.
var float lastEntryPrice = na
if strategy.position_size == 0
    lastEntryPrice := na

// If there is no previous entry, the condition is met.
// Otherwise, allow a new entry only if the current price is lower than the last entry price
// by at least the predefined percentage (converted to a fraction).
dcaCondition = na(lastEntryPrice) or ((close < lastEntryPrice) and (((lastEntryPrice - close) / lastEntryPrice) >= (minEntryPct / 100)))
dcaConditionShort = na(lastEntryPrice) or ((close > lastEntryPrice) and (((close - lastEntryPrice) / lastEntryPrice) >= (minEntryPct / 100)))


// ***** STRATEGY ORDERS *****
// Enter a long position only if both the entry condition and the DCA condition are met.
if enterLong and dcaCondition 
    strategy.entry("Long", strategy.long)
    lastEntryPrice := close  // update the last entry price
    entryBarIndex := bar_index

if enterShort and dcaConditionShort 
    strategy.entry("Short", strategy.short)
    lastEntryPrice := close  // update the last entry price
    entryBarIndex := bar_index

// Compute trade duration in days using the absolute difference
tradeDuration = not na(entryBarIndex) ? math.abs(bar_index - entryBarIndex) : 0

// Exit the long position when the exit condition is met or if the trade duration reaches maxTradeDuration days.
if exitLong or (tradeDuration >= maxTradeDuration)
    strategy.close("Long")

// Exit the long position when the exit condition is met or if the trade duration reaches maxTradeDuration days.
if exitShort or (tradeDuration >= maxTradeDuration)
    strategy.close("Short")

// ***** PLOTTING *****
// Plot IBS for reference, along with horizontal lines for the entry and exit thresholds.
//plot(ibs, title="IBS", color=color.blue, linewidth=2)
//hline(ibsEntryThreshold, title="IBS Entry Threshold", color=color.green)
//hline(ibsExitThreshold, title="IBS Exit Threshold", color=color.red)

```

> Detail

https://www.fmz.com/strategy/484915

> Last Modified

2025-03-05 09:55:24
