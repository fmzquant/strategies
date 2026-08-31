
> Name

Value-Breakthrough-Trailing-Stop-Strategy-Automated-Trading-Robot-Based-on-Local-Extremes

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8430dd10f8ec1050280.png)
![IMG](https://www.fmz.com/upload/asset/2d84c5409b5685c85c542.png)



[trans]

## 概述

价值突破追踪止损策略是一种专为数字资产交易设计的量化交易系统，它通过在局部价格极值位置放置挂单（买入止损和卖出止损）来捕捉市场突破行情。该策略还实现了追踪止损机制，一旦持仓达到预设盈利水平，即启动保护机制锁定收益。这种方法结合了价格突破交易与风险管理的优势，为交易者提供了一种自动化的交易解决方案。

## 策略原理

该策略基于价格行为和动态风险管理原则，其核心逻辑可分为以下几个关键部分：

1. **局部极值识别**：策略使用定义的时间窗口（BarsN参数）计算局部高点和低点，作为潜在的突破点位。具体来说，它使用(BarsN * 2 + 1)个K线来确定局部最高价和最低价。

2. **挂单设置**：
   - 买入止损(BuyStop)：当当前价格低于局部高点减去订单距离缓冲区时，在局部高点位置设置买入止损单。
   - 卖出止损(SellStop)：当当前价格高于局部低点加上订单距离缓冲区时，在局部低点位置设置卖出止损单。

3. **时间过滤**：策略允许交易者设置交易时段，只在指定小时范围内进行交易，这有助于避开不希望交易的时间段。

4. **盈亏水平计算**：
   - 止盈点(TP)：以当前价格的一定百分比（TPasPctBTC）计算。
   - 止损点(SL)：以当前价格的一定百分比（SLasPctBTC）计算。
   - 订单距离缓冲区：设置为止盈点的一半，防止订单过早触发。

5. **追踪止损机制**：
   - 触发点(TslTriggerPoints)：当盈利达到这一水平时，追踪止损开始生效。
   - 追踪距离(TslPoints)：追踪止损与当前价格之间保持的距离。
   - 对于多头头寸，当利润超过触发点时，以当前价格减去追踪距离作为止损价格。
   - 对于空头头寸，当利润超过触发点时，以当前价格加上追踪距离作为止损价格。

## 策略优势

深入分析代码后，该策略展现出以下显著优势：

1. **自动捕捉突破行情**：通过在关键价格水平设置挂单，策略能够自动捕捉价格突破行情，无需手动监控市场。

2. **动态风险管理**：采用基于当前价格百分比的止盈止损设置，使风险管理更加灵活，适应不同价格水平。

3. **利润保护机制**：通过追踪止损功能，策略能够在保留上涨空间的同时，有效锁定已获得的利润，减少回撤。

4. **时间过滤功能**：允许交易者根据市场特性选择最佳交易时段，避免在波动性较低或不可预测的时间段进行交易。

5. **适应性强**：策略参数可根据市场条件进行调整，如调整局部极值的计算窗口、止盈止损百分比等，使其适应不同市场环境。

6. **执行纪律严格**：作为自动化策略，它消除了情绪因素对交易决策的影响，严格按照预设规则执行交易。

## 策略风险

尽管该策略具有多项优势，但也存在一些潜在风险和局限性：

1. **假突破风险**：市场可能产生假突破，导致策略进入不理想的交易。解决方法是增加确认指标或调整订单距离缓冲区大小，以减少假突破触发的概率。

2. **参数敏感性**：策略性能高度依赖于参数设置，如BarsN、TPasPctBTC和SLasPctBTC等。不适当的参数可能导致性能不佳。建议通过回测找到最佳参数组合。

3. **不完整的资金管理**：虽然代码中定义了RiskPercent参数，但没有实际应用于仓位大小计算。这可能导致风险管理不完善。

4. **极端行情应对能力有限**：在高波动性或极端市场条件下，简单的局部极值突破和固定百分比止损可能不足以有效管理风险。

5. **滑点和执行延迟**：实际交易中，订单执行可能遇到滑点或延迟，影响策略性能。

6. **单一市场依赖**：策略专为特定资产设计，可能不适用于其他市场特性不同的资产。

## 策略优化方向

基于代码分析，该策略可以在以下几个方向进行优化：

1. **动态仓位管理**：实现基于RiskPercent参数的动态仓位大小计算，根据账户规模和当前市场风险调整仓位大小，以实现更精细的风险控制。

2. **多重确认机制**：引入额外的技术指标作为突破确认，如成交量突破、动量指标或趋势指标，减少假突破交易。

3. **自适应参数**：引入基于市场波动性或其他市场特征自动调整的参数，使策略能够更好地适应不同市场环境。

4. **分批止盈策略**：实现分批止盈机制，允许部分仓位在不同盈利水平退出，既能锁定部分利润又能保留更大的盈利空间。

5. **市场状态过滤**：增加市场状态（趋势、震荡等）判断，在不同市场状态下调整策略参数或停止交易。

6. **止损优化**：实现基于ATR（真实波动幅度）或其他波动性指标的动态止损，使止损更加合理。

7. **回测与优化框架**：开发更全面的回测框架，评估策略在不同时期、不同参数下的表现，并寻找最优参数组合。

## 总结

价值突破追踪止损策略是一个设计精巧的自动化交易系统，通过捕捉局部极值突破并应用追踪止损来管理风险。它的核心优势在于自动化执行、动态风险管理和利润保护机制，使其成为潜在的有效交易工具。

然而，策略的有效性高度依赖于参数设置和市场条件。通过实施建议的优化措施，如动态仓位管理、多重确认机制和自适应参数等，可以显著提高策略的鲁棒性和适应性。

对于交易者而言，建议在实盘应用前进行充分的回测，找到最适合当前市场环境的参数组合，并考虑结合其他分析工具来确认交易信号。同时，持续监控和评估策略表现，根据市场变化及时调整参数，以保持策略的有效性。|| 

## Overview

The Value Breakthrough Trailing Stop Strategy is a quantitative trading system designed specifically for digital asset trading, which captures market breakouts by placing pending orders (BuyStop and SellStop) at local price extreme positions. The strategy also implements a trailing stop mechanism that activates a protection mechanism to lock in profits once a position reaches a preset profit level. This approach combines the advantages of price breakthrough trading and risk management, providing traders with an automated trading solution.

## Strategy Principles

The strategy is based on price action and dynamic risk management principles, with its core logic divided into the following key components:

1. **Local Extremes Identification**: The strategy calculates local highs and lows using a defined time window (BarsN parameter) as potential breakthrough points. Specifically, it uses (BarsN * 2 + 1) candles to determine local maximum and minimum prices.

2. **Pending Order Setup**:
   - BuyStop: When the current price is lower than the local high minus an order distance buffer, a buy stop order is placed at the local high position.
   - SellStop: When the current price is higher than the local low plus an order distance buffer, a sell stop order is placed at the local low position.

3. **Time Filtering**: The strategy allows traders to set trading sessions, only trading within specified hour ranges, which helps avoid unwanted time periods.

4. **Profit and Loss Level Calculation**:
   - Take Profit (TP): Calculated as a certain percentage (TPasPctBTC) of the current price.
   - Stop Loss (SL): Calculated as a certain percentage (SLasPctBTC) of the current price.
   - Order Distance Buffer: Set to half of the take profit point, preventing orders from triggering too early.

5. **Trailing Stop Mechanism**:
   - Trigger Point (TslTriggerPoints): When profit reaches this level, the trailing stop becomes effective.
   - Trailing Distance (TslPoints): The distance maintained between the trailing stop and the current price.
   - For long positions, when profit exceeds the trigger point, the stop price is set at the current price minus the trailing distance.
   - For short positions, when profit exceeds the trigger point, the stop price is set at the current price plus the trailing distance.

## Strategy Advantages

After in-depth code analysis, the strategy demonstrates the following significant advantages:

1. **Automatic Breakout Capture**: By setting pending orders at key price levels, the strategy can automatically capture price breakouts without the need for manual market monitoring.

2. **Dynamic Risk Management**: Using take profit and stop loss settings based on current price percentages makes risk management more flexible, adapting to different price levels.

3. **Profit Protection Mechanism**: Through the trailing stop function, the strategy can effectively lock in profits already gained while preserving upside potential, reducing drawdowns.

4. **Time Filtering Capability**: Allows traders to select optimal trading sessions based on market characteristics, avoiding trading during periods of low volatility or unpredictable behavior.

5. **High Adaptability**: Strategy parameters can be adjusted according to market conditions, such as adjusting the calculation window for local extremes, take profit and stop loss percentages, enabling adaptation to different market environments.

6. **Strict Execution Discipline**: As an automated strategy, it eliminates the impact of emotional factors on trading decisions and strictly executes trades according to preset rules.

## Strategy Risks

Despite its many advantages, the strategy also presents some potential risks and limitations:

1. **False Breakout Risk**: The market may produce false breakouts, leading the strategy into undesirable trades. The solution is to add confirmation indicators or adjust the order distance buffer size to reduce the probability of false breakout triggers.

2. **Parameter Sensitivity**: Strategy performance highly depends on parameter settings such as BarsN, TPasPctBTC, and SLasPctBTC. Inappropriate parameters may lead to poor performance. Backtesting is recommended to find the optimal parameter combination.

3. **Incomplete Money Management**: Although the RiskPercent parameter is defined in the code, it is not actually applied to position size calculation. This may lead to imperfect risk management.

4. **Limited Ability to Handle Extreme Market Conditions**: In highly volatile or extreme market conditions, simple local extreme breakouts and fixed percentage stops may not be sufficient to effectively manage risk.

5. **Slippage and Execution Delay**: In actual trading, order execution may encounter slippage or delays, affecting strategy performance.

6. **Single Market Dependency**: The strategy is designed for specific assets and may not be applicable to other assets with different market characteristics.

## Strategy Optimization Directions

Based on code analysis, the strategy can be optimized in the following directions:

1. **Dynamic Position Management**: Implement dynamic position size calculation based on the RiskPercent parameter, adjusting position size according to account scale and current market risk for more refined risk control.

2. **Multiple Confirmation Mechanisms**: Introduce additional technical indicators as breakout confirmations, such as volume breakouts, momentum indicators, or trend indicators, to reduce false breakout trades.

3. **Adaptive Parameters**: Introduce parameters that automatically adjust based on market volatility or other market characteristics, allowing the strategy to better adapt to different market environments.

4. **Partial Profit-Taking Strategy**: Implement a partial profit-taking mechanism, allowing portions of the position to exit at different profit levels, both securing partial profits and preserving space for larger gains.

5. **Market State Filtering**: Add market state (trend, oscillation, etc.) judgment to adjust strategy parameters or stop trading under different market states.

6. **Stop Loss Optimization**: Implement dynamic stop losses based on ATR (Average True Range) or other volatility indicators for more reasonable stop loss placement.

7. **Backtesting and Optimization Framework**: Develop a more comprehensive backtesting framework to evaluate strategy performance under different periods and parameters, and find optimal parameter combinations.

## Summary

The Value Breakthrough Trailing Stop Strategy is an ingeniously designed automated trading system that manages risk by capturing local extreme breakouts and applying trailing stops. Its core advantages lie in automated execution, dynamic risk management, and profit protection mechanisms, making it a potentially effective trading tool.

However, the effectiveness of the strategy highly depends on parameter settings and market conditions. By implementing the suggested optimization measures such as dynamic position management, multiple confirmation mechanisms, and adaptive parameters, the robustness and adaptability of the strategy can be significantly improved.

For traders, it is recommended to conduct thorough backtesting before real-world application to find the parameter combination most suitable for the current market environment, and to consider combining other analytical tools to confirm trading signals. At the same time, continuously monitor and evaluate strategy performance, adjusting parameters in a timely manner according to market changes to maintain strategy effectiveness.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-01 00:00:00
end: 2025-04-06 00:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("BTC Trading Robot", overlay=true, pyramiding=1, initial_capital=100000)

//============== Input Groups ==============//
// Trading Profile
group_trading = "BTC"
systemType = input.int(1, title="Trading System (1:BTC)", group=group_trading)

// Common Trading Inputs
group_common = "Trading Inputs"
RiskPercent   = input.float(4.0, title="Risk as % of trading capital", group=group_common)
TradeComment  = input.string("BTC trading robot", title="Trade Comment", group=group_common)
SHInput       = input.int(0, title="Start Hour (0 = no filter)", group=group_common)
EHInput       = input.int(0, title="End Hour (0 = no filter)", group=group_common)

// Gold Related Inputs
group_BTC = "BTC Related Input"
TPasPctBTC         = input.float(0.2, title="TP as % of Price", group=group_BTC)
SLasPctBTC         = input.float(0.1, title="SL as % of Price", group=group_BTC)
TSLasPctofTPBTC   = input.float(5.0, title="Trail SL as % of TP", group=group_BTC)
TSLTgrasPctofTPBTC = input.float(7.0, title="Trail Tgra  SL as % of TP", group=group_BTC)

// Other parameters
BarsN = 5
OrderDistPoints = 100.0

//============== Calculate Trade Parameters ==============//
var float Tppoints = 0.0
var float Slpoints = 0.0
var float TslTriggerPoints = 0.0
var float TslPoints = 0.0

price = close

// Adjust parameters based on system type (using 1 for Gold)
if systemType == 1
    Tppoints := price * TPasPctBTC
    Slpoints := price * SLasPctBTC
    OrderDistPoints := Tppoints / 2.0
    TslPoints := Tppoints * TSLTgrasPctofTPBTC / 100.0
    TslTriggerPoints := Tppoints * TSLTgrasPctofTPBTC / 100.0

//============== Time Filter ==============//
currentHour = hour(time)
inSession = true
if SHInput != 0 and currentHour < SHInput
    inSession := false
if EHInput != 0 and currentHour >= EHInput
    inSession := false

//============== Find Local High and Low ==============//
localHigh = ta.highest(high, BarsN * 2 + 1)
localLow  = ta.lowest(low,  BarsN * 2 + 1)

//============== Entry Orders ==============//
if inSession and strategy.position_size == 0
    // For a BuyStop order: only submit if current price is less than the desired entry level minus a buffer.
    if price < localHigh - OrderDistPoints * syminfo.mintick
        strategy.order("BuyStop", strategy.long, stop=localHigh, comment="BuyStop")
    // For a SellStop order: only submit if current price is greater than the desired entry level plus a buffer.
    if price > localLow + OrderDistPoints * syminfo.mintick
        strategy.order("SellStop", strategy.short, stop=localLow, comment="SellStop")
    
//============== Trailing Stop Logic ==============//
if strategy.position_size > 0  // Long positions
    longProfit = price - strategy.position_avg_price
    if longProfit > TslTriggerPoints * syminfo.mintick
        strategy.exit("Long Exit", from_entry="BuyStop", stop=price - TslPoints * syminfo.mintick, limit=strategy.position_avg_price + Tppoints * syminfo.mintick)
        
if strategy.position_size < 0  // Short positions
    shortProfit = strategy.position_avg_price - price
    if shortProfit > TslTriggerPoints * syminfo.mintick
        strategy.exit("Short Exit", from_entry="SellStop", stop=price + TslPoints * syminfo.mintick, limit=strategy.position_avg_price - Tppoints * syminfo.mintick)

```

> Detail

https://www.fmz.com/strategy/489659

> Last Modified

2025-04-07 13:52:57
