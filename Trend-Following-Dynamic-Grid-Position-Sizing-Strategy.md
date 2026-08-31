
> Name

Trend-Following-Dynamic-Grid-Position-Sizing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/aa5227227dd547d130.png)

[trans]
#### 概述
该策略是一个基于TTM指标的动态网格交易系统,通过对高低点的指数移动平均线(EMA)进行计算来判断市场趋势方向,并在动态更新的基准价格周围部署网格交易系统。网格的方向和价格水平会根据趋势动态调整,当价格穿越预定义的网格水平时执行交易,每笔交易风险敞口为账户权益的固定百分比。

#### 策略原理 
策略的核心逻辑在于TTM状态计算,它通过以下步骤实现:
1. 基于ttmPeriod参数计算两个EMA:低点EMA(lowMA)和高点EMA(highMA)
2. 在highMA和lowMA之间定义两个阈值水平:
   - lowThird:底部1/3位置
   - highThird:底部2/3位置
3. 根据收盘价相对于这些阈值的位置确定TTM状态:
   - 当收盘价高于highThird时,返回1(上升趋势)
   - 当收盘价低于lowThird时,返回0(下降趋势) 
   - 当收盘价在lowThird和highThird之间时,返回-1(中性状态)

网格交易系统会根据TTM状态动态调整:
1. 当TTM状态发生变化时,更新网格基准价格和方向
2. 根据网格方向和间距计算买卖价格水平
3. 在价格突破网格水平时执行相应的买入或卖出操作

#### 策略优势
1. 动态适应性强:策略能够根据市场趋势动态调整网格方向和价格水平,提高了策略的适应性和盈利能力
2. 风险控制完善:采用固定百分比进行头寸管理,有效控制每笔交易的风险敞口
3. 参数可调性好:关键参数如TTM周期、网格级别和间距都可以根据不同市场情况进行优化
4. 执行机制清晰:交易信号明确,执行逻辑简单直观,便于回测和实盘操作

#### 策略风险
1. 趋势判断延迟:基于EMA的TTM指标存在一定滞后性,可能导致趋势转折点的信号延迟
2. 震荡市场风险:在横盘震荡市场中,频繁的网格方向切换可能导致过度交易和手续费损失
3. 资金管理压力:多个网格同时运行时需要较大资金规模,可能影响策略的实际可行性
4. 滑点影响:高频网格交易在流动性不足时可能面临较大滑点,影响策略表现

#### 策略优化方向
1. 趋势判断优化:
   - 引入多时间周期分析,提高趋势判断准确性
   - 结合其他技术指标如RSI、MACD等进行趋势确认
2. 网格参数优化:
   - 根据波动率动态调整网格间距
   - 引入自适应网格级别调整机制
3. 资金管理改进:
   - 实现动态头寸分配
   - 增加风险平价机制
4. 执行机制完善:
   - 增加止损和止盈机制
   - 优化订单执行时机

#### 总结
该策略通过将TTM趋势判断与动态网格交易相结合,实现了一个自适应性强、风险可控的交易系统。通过动态调整网格方向和价格水平,策略能够较好地适应不同市场环境。虽然存在一些固有风险,但通过合理的参数设置和优化措施,策略具有良好的实用价值和发展潜力。 || 

#### Overview
This strategy is a dynamic grid trading system based on the TTM indicator, which determines market trend direction by calculating exponential moving averages (EMAs) of highs and lows, and deploys a grid trading system around a dynamically updated base price. The grid's direction and price levels adjust according to the trend, executing trades when price crosses predefined grid levels, with each trade risking a fixed percentage of account equity.

#### Strategy Principles
The core logic lies in TTM state calculation, implemented through the following steps:
1. Calculate two EMAs based on ttmPeriod parameter: EMA of lows (lowMA) and highs (highMA)
2. Define two threshold levels between highMA and lowMA:
   - lowThird: 1/3 position from bottom
   - highThird: 2/3 position from bottom
3. Determine TTM state based on closing price position relative to these thresholds:
   - Returns 1 (uptrend) when close is above highThird
   - Returns 0 (downtrend) when close is below lowThird
   - Returns -1 (neutral state) when close is between lowThird and highThird

The grid trading system adjusts dynamically based on TTM state:
1. Updates grid base price and direction when TTM state changes
2. Calculates buy/sell price levels based on grid direction and spacing
3. Executes corresponding buy or sell operations when price breaks through grid levels

#### Strategy Advantages
1. Strong Dynamic Adaptability: Strategy can dynamically adjust grid direction and price levels based on market trends, improving adaptability and profitability
2. Robust Risk Control: Uses fixed percentage position sizing, effectively controlling risk exposure per trade
3. Good Parameter Adjustability: Key parameters like TTM period, grid levels, and spacing can be optimized for different market conditions
4. Clear Execution Mechanism: Trading signals are clear, execution logic is simple and intuitive, facilitating backtesting and live trading

#### Strategy Risks
1. Trend Detection Delay: EMA-based TTM indicator has inherent lag, potentially causing delayed signals at trend turning points
2. Sideways Market Risk: Frequent grid direction switches in ranging markets may lead to overtrading and excessive fees
3. Capital Management Pressure: Running multiple grid levels simultaneously requires substantial capital, potentially affecting strategy feasibility
4. Slippage Impact: High-frequency grid trading may face significant slippage in low liquidity conditions, affecting strategy performance

#### Strategy Optimization Directions
1. Trend Detection Optimization:
   - Incorporate multiple timeframe analysis to improve trend detection accuracy
   - Combine with other technical indicators like RSI, MACD for trend confirmation
2. Grid Parameter Optimization:
   - Dynamically adjust grid spacing based on volatility
   - Implement adaptive grid level adjustment mechanism
3. Capital Management Improvement:
   - Implement dynamic position allocation
   - Add risk parity mechanism
4. Execution Mechanism Enhancement:
   - Add stop-loss and take-profit mechanisms
   - Optimize order execution timing

#### Summary
This strategy combines TTM trend detection with dynamic grid trading to create an adaptive, risk-controlled trading system. Through dynamic adjustment of grid direction and price levels, the strategy can effectively adapt to different market environments. While inherent risks exist, through appropriate parameter settings and optimization measures, the strategy demonstrates good practical value and development potential.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-04 00:00:00
end: 2024-12-11 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("TTM Grid Strategy", overlay=true)

// Input parameters
int ttmPeriod = input.int(6, minval=1, title="TTM Period")
int gridLevels = input.int(5, minval=2, title="Grid Levels")
float gridSpacing = input.float(0.01, minval=0.0001, title="Grid Spacing (%)")

// Calculate TTM State
ttmState() =>
    lowMA = ta.ema(low, ttmPeriod)
    highMA = ta.ema(high, ttmPeriod)
    lowThird = (highMA - lowMA) / 3 + lowMA
    highThird = 2 * (highMA - lowMA) / 3 + lowMA

    if close > highThird
        1
    else if close < lowThird
        0
    else
        -1

// State tracking variables
var float gridBasePrice = 0.0
var int gridDirection = -1

// Determine grid state
updateGridState(float currentClose, int currentState) =>
    float newBasePrice = gridBasePrice
    int newDirection = gridDirection

    if currentState != -1 and currentState != gridDirection
        newBasePrice := currentClose
        newDirection := currentState
    
    [newBasePrice, newDirection]

// Calculate grid levels
calcGridLevels(float basePrice, int direction, int levels) =>
    float[] buyLevels = array.new_float(levels)
    float[] sellLevels = array.new_float(levels)

    for i = 1 to levels
        multiplier = i * gridSpacing
        if direction == 1  // Buy grid
            array.set(buyLevels, i-1, basePrice * (1 - multiplier))
            array.set(sellLevels, i-1, basePrice * (1 + multiplier))
        else  // Sell grid
            array.set(buyLevels, i-1, basePrice * (1 + multiplier))
            array.set(sellLevels, i-1, basePrice * (1 - multiplier))
    
    [buyLevels, sellLevels]

// Execute grid trades
executeGridTrades(float basePrice, int direction, int levels) =>
    [buyLevels, sellLevels] = calcGridLevels(basePrice, direction, levels)

    for i = 0 to levels - 1
        float buyLevel = array.get(buyLevels, i)
        float sellLevel = array.get(sellLevels, i)

        if direction == 1  // Buy grid
            if low <= buyLevel
                strategy.entry("GridBuy" + str.tostring(i), strategy.long, comment="Buy Level " + str.tostring(i))
            if high >= sellLevel
                strategy.entry("GridSell" + str.tostring(i), strategy.short, comment="Sell Level " + str.tostring(i))
        else  // Sell grid
            if high >= buyLevel
                strategy.entry("GridBuy" + str.tostring(i), strategy.long, comment="Buy Level " + str.tostring(i))
            if low <= sellLevel
                strategy.entry("GridSell" + str.tostring(i), strategy.short, comment="Sell Level " + str.tostring(i))

// Main strategy logic
currentState = ttmState()
[newGridBasePrice, newGridDirection] = updateGridState(close, currentState)

// Update global variables
if newGridBasePrice != gridBasePrice
    gridBasePrice := newGridBasePrice
if newGridDirection != gridDirection
    gridDirection := newGridDirection

// Execute grid trades
executeGridTrades(newGridBasePrice, newGridDirection, gridLevels)

// Visualization
plotColor = newGridDirection == 1 ? color.green : color.red
plot(newGridBasePrice, color=plotColor, style=plot.style_cross)
```

> Detail

https://www.fmz.com/strategy/474808

> Last Modified

2024-12-12 11:19:17
