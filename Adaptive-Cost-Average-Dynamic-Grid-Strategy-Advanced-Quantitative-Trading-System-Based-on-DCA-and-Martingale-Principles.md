
> Name

Adaptive-Cost-Average-Dynamic-Grid-Strategy-Advanced-Quantitative-Trading-System-Based-on-DCA-and-Martingale-Principles

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d83c586fb8fbf1a1122e.png)
![IMG](https://www.fmz.com/upload/asset/2d8c78dba8a4835557b84.png)




[trans]

#### 概述
自适应成本均值动态网格策略是一种结合了网格交易、美元成本平均法(DCA)和马丁格尔原理的综合性量化交易策略。该策略主要通过多层次买入网格和动态调整的安全订单系统来应对市场波动,以期在波动市场中获得更稳定的收益。核心思想是通过设定价格阶梯,在价格下跌时逐步增加仓位,从而降低平均持仓成本,当价格回升至预设获利点时,整体平仓获利。

#### 策略原理
该策略的运作基于多层次的智能买入网格和预设的获利目标。具体原理如下:

1. **初始订单与网格构建**:策略首先根据触发条件(即时、价格或RSI指标)下达初始买入订单,并以此作为网格的起点。系统随后计算下一个买入点,形成第一层网格。

2. **安全订单机制**:当价格跌至预设的网格点位时,系统会触发安全订单买入,买入数量按照马丁格尔原理递增(通过金额乘数i_multiplier控制)。每次安全订单执行后,系统重新计算平均持仓价格,并动态调整下一个安全订单的触发价格。

3. **动态网格间距**:策略采用非等距网格,网格间距会随着价格下跌而扩大(通过价格步长乘数i_stepMulti控制),这样可以避免在持续下跌市场中过早耗尽资金。

4. **获利与止损机制**:当市场价格上涨至平均成本加上预设获利百分比(i_tpPct)时,策略会关闭所有仓位,完成一个交易周期。同时,策略提供了可选的止损功能,当价格下跌至平均成本减去预设止损百分比(i_slPct)时,可以触发全部平仓以控制风险。

5. **周期管理**:一个完整交易周期从触发条件满足时开始,到达到获利目标或触发止损时结束。每个周期都是独立的,系统会根据设定的条件自动开启新的周期。

#### 策略优势
1. **成本平均化效应**:通过在价格下跌时逐步增加仓位,策略可以显著降低平均持仓成本,这使得即使在较小的价格回升幅度下也能实现盈利。

2. **适应性强**:策略提供了多种启动条件选择(即时、价格触发、RSI指标),可以根据不同市场环境灵活调整。特别是RSI指标可以帮助识别超买超卖区域,提高入场时机的准确性。

3. **资金使用效率高**:通过马丁格尔系统的资金分配方式,策略在价格下跌时才会逐步投入更多资金,避免一次性投入全部资金的风险。

4. **参数高度可定制**:策略提供了丰富的参数设置,包括网格步长、获利目标、安全订单数量、金额乘数等,用户可以根据自己的风险偏好和市场预期进行个性化调整。

5. **可视化支持**:策略会在图表上显示平均价格、获利目标线、止损线以及所有安全订单的价格水平,这为策略监控和调整提供了直观的参考。

#### 策略风险
1. **持续下跌市场的风险**:在持续下跌的市场中,即使设置了安全订单的数量上限,策略仍可能消耗大量资金而无法获利。特别是当市场经历长期熊市时,可能导致资金长期锁定。

2. **资金管理压力**:马丁格尔系统要求每个后续安全订单的金额倍增,这可能导致资金需求快速增长,超出交易者的承受能力。

3. **参数优化挑战**:策略效果高度依赖于参数设置的合理性,不同市场环境下最优参数可能差异很大,需要持续的回测和优化。

4. **止损与风险控制**:默认情况下,策略没有启用止损机制,在极端市场条件下可能面临较大损失。即使启用止损,也可能因为市场跳空而无法在预期价格执行。

5. **流动性风险**:在低流动性市场中,大量安全订单可能无法按预期价格执行,导致实际效果与回测结果产生偏差。

#### 策略优化方向
1. **动态风险管理**:当前策略采用固定的止损百分比,可以改进为基于市场波动性的动态止损机制,例如结合ATR指标调整止损距离,在高波动市场中设置更宽松的止损,低波动市场中设置更紧的止损。

2. **多指标过滤**:当前策略仅使用RSI作为可选的启动条件,可以引入更多技术指标组合,如MACD、布林带或者移动平均线系统,构建更全面的市场状态判断机制,避免在不适合的市场条件下启动新周期。

3. **自适应网格系统**:可以根据历史波动率动态调整网格间距和安全订单数量,在高波动市场中设置更宽的网格间距和更多的安全订单,在低波动市场中相应减少,以更好地适应不同市场环境。

4. **部分获利机制**:当前策略只有全部平仓的机制,可以增加部分获利功能,当价格达到某个水平时,平仓一部分仓位,既锁定部分利润,又保留上涨空间。

5. **时间因素考量**:可以增加基于时间的止损或调整机制,例如如果一个周期持续时间过长,可以调整获利目标或提前结束周期,避免资金长期锁定。

#### 总结
自适应成本均值动态网格策略通过结合网格交易、DCA和马丁格尔原理,创建了一个能够在价格波动中自动调整成本基础的交易系统。该策略特别适合在波动区间内的市场环境,可以有效降低平均持仓成本,提高小幅波动的盈利能力。

然而,使用此策略时需谨慎评估资金需求和市场趋势,尤其是在强趋势市场中应当更加谨慎。合理设置最大安全订单数量、金额乘数和价格步长乘数是控制风险的关键。通过持续优化参数和增加动态风险管理机制,该策略可以成为波动市场中的有效工具。

为获得最佳效果,建议交易者在实盘应用前进行充分的历史回测,针对不同市场环境和交易品种调整参数,并始终保持足够的资金储备以应对极端市场情况。 || 

#### Overview
The Adaptive Cost-Average Dynamic Grid Strategy is a comprehensive quantitative trading strategy that combines grid trading, Dollar-Cost Averaging (DCA), and Martingale principles. This strategy primarily utilizes a multi-layered buy grid and a dynamically adjusted safety order system to respond to market volatility, aiming to achieve more stable returns in fluctuating markets. The core concept is to establish price steps, gradually increase positions as prices decline, thereby reducing the average holding cost, and then close all positions for profit when prices rebound to predetermined profit targets.

#### Strategy Principles
The strategy operates based on multi-layered intelligent buy grids and preset profit targets. The specific principles are as follows:

1. **Initial Order and Grid Construction**: The strategy first places an initial buy order based on trigger conditions (instant, price, or RSI indicator), which serves as the starting point for the grid. The system then calculates the next buy point, forming the first layer of the grid.

2. **Safety Order Mechanism**: When the price falls to a preset grid point, the system triggers a safety order, with the purchase amount increasing according to the Martingale principle (controlled by the amount multiplier i_multiplier). After each safety order is executed, the system recalculates the average holding price and dynamically adjusts the trigger price for the next safety order.

3. **Dynamic Grid Spacing**: The strategy employs non-equidistant grids, with the grid spacing expanding as the price falls (controlled by the price step multiplier i_stepMulti). This helps avoid depleting funds too early in a continuously declining market.

4. **Profit-Taking and Stop-Loss Mechanisms**: When the market price rises to the average cost plus the preset profit percentage (i_tpPct), the strategy closes all positions, completing a trading cycle. Additionally, the strategy offers an optional stop-loss feature that can trigger a complete closeout to control risk when the price falls to the average cost minus the preset stop-loss percentage (i_slPct).

5. **Cycle Management**: A complete trading cycle begins when trigger conditions are met and ends when either the profit target is reached or the stop-loss is triggered. Each cycle is independent, and the system automatically initiates new cycles based on specified conditions.

#### Strategy Advantages
1. **Cost Averaging Effect**: By gradually increasing positions as prices fall, the strategy can significantly reduce the average holding cost, allowing for profit even with relatively small price rebounds.

2. **High Adaptability**: The strategy offers multiple startup condition options (instant, price trigger, RSI indicator), which can be flexibly adjusted based on different market environments. The RSI indicator is particularly helpful in identifying overbought/oversold areas, improving the accuracy of entry timing.

3. **Efficient Capital Utilization**: Through the Martingale system's capital allocation method, the strategy only gradually invests more funds as prices fall, avoiding the risk of committing all capital at once.

4. **Highly Customizable Parameters**: The strategy provides a rich set of parameter settings, including grid step size, profit targets, safety order quantity, amount multipliers, etc., allowing users to personalize adjustments based on their risk preferences and market expectations.

5. **Visual Support**: The strategy displays the average price, profit target line, stop-loss line, and all safety order price levels on the chart, providing intuitive references for strategy monitoring and adjustment.

#### Strategy Risks
1. **Risk in Continuously Declining Markets**: In continuously declining markets, even with a set limit on the number of safety orders, the strategy may consume significant capital without achieving profit. Especially during prolonged bear markets, this could lead to long-term capital lockup.

2. **Capital Management Pressure**: The Martingale system requires each subsequent safety order to double in amount, which can lead to rapidly growing capital requirements that might exceed a trader's capacity.

3. **Parameter Optimization Challenges**: The effectiveness of the strategy highly depends on the reasonableness of parameter settings. Optimal parameters may vary greatly across different market environments, requiring continuous backtesting and optimization.

4. **Stop-Loss and Risk Control**: By default, the strategy does not enable the stop-loss mechanism, potentially facing significant losses in extreme market conditions. Even with stop-loss enabled, market gaps might prevent execution at the expected price.

5. **Liquidity Risk**: In low-liquidity markets, numerous safety orders may not execute at expected prices, causing actual results to deviate from backtesting outcomes.

#### Strategy Optimization Directions
1. **Dynamic Risk Management**: The current strategy uses a fixed stop-loss percentage, which could be improved to a dynamic stop-loss mechanism based on market volatility. For example, integrating the ATR indicator to adjust stop-loss distances, setting looser stops in high-volatility markets and tighter stops in low-volatility markets.

2. **Multi-Indicator Filtering**: The current strategy only uses RSI as an optional startup condition. More technical indicators could be introduced, such as MACD, Bollinger Bands, or moving average systems, to build a more comprehensive market state assessment mechanism and avoid initiating new cycles in unsuitable market conditions.

3. **Adaptive Grid System**: Grid spacing and safety order quantities could be dynamically adjusted based on historical volatility, setting wider grid spacing and more safety orders in high-volatility markets, and correspondingly reducing them in low-volatility markets, to better adapt to different market environments.

4. **Partial Profit-Taking Mechanism**: The current strategy only has a complete closeout mechanism. A partial profit-taking function could be added, closing part of the position when the price reaches certain levels, both securing partial profits and retaining upside potential.

5. **Time Factor Consideration**: Time-based stop-loss or adjustment mechanisms could be added, such as adjusting profit targets or ending cycles early if a cycle lasts too long, avoiding long-term capital lockup.

#### Summary
The Adaptive Cost-Average Dynamic Grid Strategy creates a trading system that automatically adjusts cost basis during price fluctuations by combining grid trading, DCA, and Martingale principles. This strategy is particularly suitable for market environments with price oscillations, effectively reducing average holding costs and enhancing profit potential from small price movements.

However, when using this strategy, careful assessment of capital requirements and market trends is necessary, especially in strongly trending markets. Reasonably setting the maximum number of safety orders, amount multipliers, and price step multipliers is key to controlling risk. Through continuous parameter optimization and the addition of dynamic risk management mechanisms, this strategy can become an effective tool in volatile markets.

For optimal results, traders are advised to conduct thorough historical backtesting before live application, adjust parameters for different market environments and trading instruments, and always maintain sufficient capital reserves to handle extreme market situations.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-29 00:00:00
end: 2024-04-17 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// @HannSo1o TG
// @singoslab CIS Comunity in TG
//The strategy was created to select the optimal settings for a spot bot on the OKX exchange.
//Spot DCA + Martingale.
//The strategy is not designed for launching a bot with tradingview, only for selecting optimal settings, and the bot must be launched separately on the exchange itself, 
//in the section
//https://www.okx.com/ru/trade-spot-strategy/eth-usdt#ordtype=spot_dca

//@version=6
strategy("OKX _Spot DCA + Martingale - Strategy with DCA Grid", overlay=true, commission_type=strategy.commission.percent, commission_value=0.1, slippage=3, default_qty_type=strategy.cash, default_qty_value=100, initial_capital=10000, currency=currency.USD, process_orders_on_close=true)

// Input parameters
i_priceStepPct  = input.float(1.0, "Price Step (%)", minval=0.1, group="1. Grid Parameters") / 100
i_tpPct         = input.float(1.0, "Take Profit Target per Cycle (%)", minval=0.1, group="1. Grid Parameters") / 100

i_initialOrder  = input.float(100.0, "Initial Order Amount (USDT)", minval=1, group="2. Volume Management")
i_safetyOrder   = input.float(50.0, "Safety Order Amount (USDT)", minval=1, group="2. Volume Management")
i_maxSafety     = input.int(5, "Max Number of Safety Orders", minval=1, maxval=20, group="2. Volume Management") // Added maxval=20

i_startCond     = input.string("Instantly", "Start Conditions", options=["Instantly", "Price", "RSI"], group="3. Activation Conditions")
i_multiplier    = input.float(2.0, "Amount Multiplier", minval=1, group="4. Multipliers")
i_stepMulti     = input.float(1.5, "Price Step Multiplier", minval=1, group="4. Multipliers")

i_slEnabled     = input.bool(false, "Enable Stop Loss", group="5. Protection")
i_slPct         = input.float(5.0, "Stop Loss Target (%)", minval=0.1, group="5. Protection") / 100

// RSI Parameters
i_rsiPeriod     = input.int(14, "RSI Period", group="6. RSI Settings")
i_rsiSource     = input(close, "RSI Source", group="6. RSI Settings")
i_rsiTrigger    = input.string("Down", "Trigger Condition", options=["Up", "Down"], group="6. RSI Settings")
i_rsiThreshold  = input.float(30, "Trigger Threshold", minval=1, maxval=100, group="6. RSI Settings")
i_rsiTF         = input.timeframe("3", "Timeframe", group="6. RSI Settings")

// Strategy State
var int cycleCount = 0
var float avgPrice = na
var float totalQty = 0.0
var int safetyCount = 0
var bool cycleActive = false
var float nextOrderPrice = na
var float entryPrice = na // Entry price for the cycle

// Indicator Calculations
rsiValue = request.security(syminfo.tickerid, i_rsiTF, ta.rsi(i_rsiSource, i_rsiPeriod))
triggerPrice = low * (1 - i_priceStepPct)

// Activation Conditions
startCondition = switch i_startCond
    "Instantly" => true
    "Price"     => close <= triggerPrice
    "RSI"      => i_rsiTrigger == "Down" ? ta.crossunder(rsiValue, i_rsiThreshold) : ta.crossover(rsiValue, 100 - i_rsiThreshold)

// Cycle Management Logic

if not cycleActive and startCondition
    cycleCount := cycleCount + 1
    strategy.entry("InitBuy", strategy.long, i_initialOrder)
    avgPrice := close
    totalQty := i_initialOrder / close
    safetyCount := 0
    cycleActive := true
    nextOrderPrice := close * (1 - i_priceStepPct)
    entryPrice := close // Save entry price
    
if cycleActive
    // Check for adding safety orders
    if low <= nextOrderPrice and safetyCount < i_maxSafety
        safetyCount := safetyCount + 1
        orderSize = i_safetyOrder * math.pow(i_multiplier, safetyCount)
        strategy.order("SafetyBuy_" + str.tostring(safetyCount), strategy.long, orderSize / close, limit=nextOrderPrice)
        totalQty := totalQty + (orderSize / nextOrderPrice)
        avgPrice := (avgPrice * (totalQty - (orderSize / nextOrderPrice)) + nextOrderPrice * (orderSize / nextOrderPrice)) / totalQty
        nextOrderPrice := nextOrderPrice * (1 - i_priceStepPct * math.pow(i_stepMulti, safetyCount))
    
    // Calculate exit levels
    tpLevel = avgPrice * (1 + i_tpPct)
    slLevel = avgPrice * (1 - i_slPct)
    
    // Check take profit
    if high >= tpLevel
        strategy.close_all()
        cycleActive := false
    
    // Check stop loss
    if i_slEnabled and low <= slLevel
        strategy.close_all()
        cycleActive := false

// Function to calculate safety order levels
getLevel(n) =>
    level = entryPrice
    for i = 0 to n-1
        step = i_priceStepPct * math.pow(i_stepMulti, i)
        level := level * (1 - step)
    level

// Visualization
plot(cycleActive ? avgPrice : na, "Average Price", color.green, 2)
plot(cycleActive ? avgPrice * (1 + i_tpPct) : na, "Take Profit", color.teal, 2)
plot(i_slEnabled and cycleActive ? avgPrice * (1 - i_slPct) : na, "Stop Loss", color.red, 2)

// Display safety order grid
plot(cycleActive ? entryPrice : na, "Entry Price", color.purple, 2, plot.style_linebr)

// Dynamic display of up to 20 grid levels
plot(cycleActive and i_maxSafety >= 1 ? getLevel(1) : na, "Safety Order 1", color.blue, 2)
plot(cycleActive and i_maxSafety >= 2 ? getLevel(2) : na, "Safety Order 2", color.blue, 2)
plot(cycleActive and i_maxSafety >= 3 ? getLevel(3) : na, "Safety Order 3", color.blue, 2)
plot(cycleActive and i_maxSafety >= 4 ? getLevel(4) : na, "Safety Order 4", color.blue, 2)
plot(cycleActive and i_maxSafety >= 5 ? getLevel(5) : na, "Safety Order 5", color.blue, 2)
plot(cycleActive and i_maxSafety >= 6 ? getLevel(6) : na, "Safety Order 6", color.blue, 2)
plot(cycleActive and i_maxSafety >= 7 ? getLevel(7) : na, "Safety Order 7", color.blue, 2)
plot(cycleActive and i_maxSafety >= 8 ? getLevel(8) : na, "Safety Order 8", color.blue, 2)
plot(cycleActive and i_maxSafety >= 9 ? getLevel(9) : na, "Safety Order 9", color.blue, 2)
plot(cycleActive and i_maxSafety >=10 ? getLevel(10) : na, "Safety Order 10", color.blue, 2)
plot(cycleActive and i_maxSafety >=11 ? getLevel(11) : na, "Safety Order 11", color.blue, 2)
plot(cycleActive and i_maxSafety >=12 ? getLevel(12) : na, "Safety Order 12", color.blue, 2)
plot(cycleActive and i_maxSafety >=13 ? getLevel(13) : na, "Safety Order 13", color.blue, 2)
plot(cycleActive and i_maxSafety >=14 ? getLevel(14) : na, "Safety Order 14", color.blue, 2)
plot(cycleActive and i_maxSafety >=15 ? getLevel(15) : na, "Safety Order 15", color.blue, 2)
plot(cycleActive and i_maxSafety >=16 ? getLevel(16) : na, "Safety Order 16", color.blue, 2)
plot(cycleActive and i_maxSafety >=17 ? getLevel(17) : na, "Safety Order 17", color.blue, 2)
plot(cycleActive and i_maxSafety >=18 ? getLevel(18) : na, "Safety Order 18", color.blue, 2)
plot(cycleActive and i_maxSafety >=19 ? getLevel(19) : na, "Safety Order 19", color.blue, 2)
plot(cycleActive and i_maxSafety >=20 ? getLevel(20) : na, "Safety Order 20", color.blue, 2)
```

> Detail

https://www.fmz.com/strategy/484107

> Last Modified

2025-02-28 10:26:54
