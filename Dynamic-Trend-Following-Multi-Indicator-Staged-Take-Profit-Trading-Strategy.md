
> Name

Dynamic-Trend-Following-Multi-Indicator-Staged-Take-Profit-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fed10a05a71b3d8d05.png)

[trans]
#### 概述
这是一个结合了趋势跟随和技术分析的量化交易策略。该策略通过多重技术指标确认交易信号,采用分批止盈和动态仓位管理机制,旨在捕捉市场的主要趋势同时控制风险。策略整合了EMA、MACD和RSI等多个技术指标,通过指标之间的交叉和背离来识别潜在的交易机会。

#### 策略原理
策略的核心交易逻辑基于以下几个关键要素:
1. 入场信号采用多重技术指标过滤:快速EMA与慢速EMA的交叉、MACD金叉/死叉信号以及RSI超买超卖指标。多头入场要求快速EMA上穿慢速EMA、MACD金叉且RSI低于70;空头入场则需要快速EMA下穿慢速EMA、MACD死叉且RSI高于30。
2. 风险控制采用固定比例止损,设置在开仓价格的5%处。
3. 分批止盈机制:第一止盈位于8%处,第二止盈位于12%处,通过动态调整第二止盈位置来适应市场波动。
4. 仓位管理基于ATR动态计算,单笔最大风险控制在5%,最大仓位不超过账户权益的40%。

#### 策略优势
1. 多重技术指标交叉验证,能有效过滤虚假信号,提高交易质量。
2. 采用分批止盈机制,既能锁定部分盈利,又不会完全错过行情延续带来的收益。
3. 动态仓位管理系统能根据市场波动性自动调整交易规模,有效控制风险。
4. 完善的风控体系,包括固定止损、动态仓位和最大持仓限制,确保策略的长期稳定性。
5. 策略逻辑清晰,参数可调整性强,便于根据不同市场环境进行优化。

#### 策略风险
1. 快速波动市场中可能面临止损频繁的问题,需要注意市场波动率过高时调整参数或暂停交易。
2. 横盘市场中来回震荡可能导致连续止损,建议增加横盘判断机制。
3. 多重指标过滤可能导致错过部分行情,在强趋势市场中的表现可能不及单一指标策略。
4. 分批止盈机制在急速反转市场中可能无法及时平仓,需要考虑增加反转信号判断。

#### 策略优化方向
1. 考虑引入市场波动率过滤机制,在波动率过高时降低仓位或暂停交易。
2. 可以增加趋势强度判断,在强趋势期间调整止盈位置,以获取更多趋势利润。
3. 优化仓位管理系统,考虑加入基于盈亏比的动态仓位调整。
4. 增加市场状态判断机制,在不同市场状态下使用不同的参数组合。
5. 考虑加入成交量指标,提高交易信号的可靠性。

#### 总结
该策略通过多重技术指标的配合使用,结合分批止盈和动态仓位管理,构建了一个相对完善的交易系统。策略的优势在于风险控制全面,交易信号可靠性高,但也存在可能错过部分行情的劣势。通过持续优化和参数调整,该策略有望在不同市场环境下保持稳定表现。 ||

#### Overview
This is a quantitative trading strategy that combines trend following and technical analysis. The strategy uses multiple technical indicators to confirm trading signals, employs a staged take-profit mechanism and dynamic position management system, aiming to capture major market trends while controlling risks. The strategy integrates multiple technical indicators including EMA, MACD, and RSI, identifying potential trading opportunities through indicator crossovers and divergences.

#### Strategy Principles
The core trading logic is based on the following key elements:
1. Entry signals use multiple technical indicator filters: EMA crossovers, MACD golden/death crosses, and RSI overbought/oversold indicators. Long entry requires fast EMA crossing above slow EMA, MACD golden cross, and RSI below 70; short entry requires fast EMA crossing below slow EMA, MACD death cross, and RSI above 30.
2. Risk control employs fixed percentage stop-loss at 5% from entry price.
3. Staged take-profit mechanism: first target at 8%, second target at 12%, with dynamic adjustment of the second target to adapt to market volatility.
4. Position management is dynamically calculated based on ATR, with maximum risk per trade at 5% and maximum position size not exceeding 40% of account equity.

#### Strategy Advantages
1. Multiple technical indicators cross-validation effectively filters false signals and improves trade quality.
2. Staged take-profit mechanism both locks in partial profits and maintains exposure to continued trends.
3. Dynamic position management system automatically adjusts trade size based on market volatility for effective risk control.
4. Comprehensive risk management system including fixed stop-loss, dynamic positioning, and maximum position limits ensures long-term strategy stability.
5. Clear strategy logic with adjustable parameters facilitates optimization for different market conditions.

#### Strategy Risks
1. May face frequent stop-losses in highly volatile markets, requiring parameter adjustment or trading suspension during high volatility periods.
2. Consecutive stop-losses possible in ranging markets, suggesting the need for range-bound market detection.
3. Multiple indicator filtering may miss some opportunities, potentially underperforming single-indicator strategies in strong trends.
4. Staged take-profit mechanism may not exit positions quickly enough in rapid reversals, requiring additional reversal signal detection.

#### Strategy Optimization Directions
1. Consider introducing volatility filtering mechanism to reduce position size or suspend trading during high volatility periods.
2. Add trend strength evaluation to adjust take-profit levels during strong trends for capturing more trend profits.
3. Optimize position management system by incorporating dynamic position adjustment based on risk-reward ratios.
4. Implement market state detection mechanism to use different parameter sets in different market conditions.
5. Consider adding volume indicators to improve trading signal reliability.

#### Summary
This strategy constructs a relatively complete trading system through the combination of multiple technical indicators, staged take-profit mechanisms, and dynamic position management. Its strengths lie in comprehensive risk control and high signal reliability, though it may miss some opportunities. Through continuous optimization and parameter adjustment, the strategy has the potential to maintain stable performance across different market conditions.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-10 00:00:00
end: 2025-02-08 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Hang Strategy Aggressive", overlay=true, initial_capital=1000, currency=currency.USDT, default_qty_type=strategy.cash, default_qty_value=100)

// === 参数设置 ===
fastLength = input.int(5, "快速EMA长度")
slowLength = input.int(15, "慢速EMA长度")
rsiLength = input.int(7, "RSI长度")
atrPeriod = input.int(10, "ATR周期")
leverageMultiple = input.float(3.0, "杠杆倍数", minval=1.0, step=0.5)

// === 止盈止损参数 ===
stopLossPercent = input.float(5.0, "止损百分比", minval=1.0, step=0.5)
firstTakeProfitPercent = input.float(8.0, "第一止盈点百分比", minval=1.0, step=0.5)
secondTakeProfitPercent = input.float(12.0, "第二止盈点百分比", minval=1.0, step=0.5)
firstTakeProfitQtyPercent = input.float(50.0, "第一止盈仓位百分比", minval=1.0, maxval=100.0, step=5.0)

// === 技术指标 ===
fastEMA = ta.ema(close, fastLength)
slowEMA = ta.ema(close, slowLength)
superFastEMA = ta.ema(close, 3)
rsi = ta.rsi(close, rsiLength)
atr = ta.atr(atrPeriod)

// === 趋势判断 ===
[macdLine, signalLine, histLine] = ta.macd(close, 12, 26, 9)
macdCross = (macdLine > signalLine) and (macdLine[1] < signalLine[1])
macdCrossDown = (macdLine < signalLine) and (macdLine[1] > signalLine[1])

// === 交易信号 ===
longCondition = (fastEMA > slowEMA) and macdCross and (rsi < 70)
shortCondition = (fastEMA < slowEMA) and macdCrossDown and (rsi > 30)

// === 平仓信号 ===
exitLong = shortCondition or (fastEMA < slowEMA)
exitShort = longCondition or (fastEMA > slowEMA)

// === 仓位管理 ===
maxRiskPerTrade = 0.05
basePosition = strategy.equity * maxRiskPerTrade
atrAmount = atr * close
riskPosition = basePosition / atrAmount * leverageMultiple
positionSize = math.min(riskPosition, strategy.equity * 0.4 / close)

// === 交易状态变量 ===
var isLong = false
var isShort = false
var partialTpTriggered = false
var float stopPrice = na
var float firstTpPrice = na
var float secondTpPrice = na
var float firstTpQty = na

// === 交易执行 ===
// 多头入场
if (longCondition and not isLong and not isShort)
    strategy.entry("多", strategy.long, qty=positionSize)
    isLong := true
    partialTpTriggered := false

// 空头入场
if (shortCondition and not isShort and not isLong)
    strategy.entry("空", strategy.short, qty=positionSize)
    isShort := true
    partialTpTriggered := false

// === 止盈止损逻辑 ===
if (strategy.position_size > 0)  // 多仓
    stopPrice := strategy.position_avg_price * (1 - stopLossPercent/100)
    firstTpPrice := strategy.position_avg_price * (1 + firstTakeProfitPercent/100)
    // 只在未触发第一止盈时计算第二止盈价格
    if not partialTpTriggered
        secondTpPrice := strategy.position_avg_price * (1 + secondTakeProfitPercent/100)
    
    if (close[1] <= stopPrice or low <= stopPrice)
        strategy.close_all("多止损")
        isLong := false
        partialTpTriggered := false
    
    if (not partialTpTriggered and (close[1] >= firstTpPrice or high >= firstTpPrice))
        strategy.order("多第一止盈", strategy.short, qty=firstTpQty)
        partialTpTriggered := true
        // 在这里重新计算第二止盈价格
        secondTpPrice := high * (1 + 0.04)  // 基于当前最高价再上涨4%
    
    if (close[1] >= secondTpPrice or high >= secondTpPrice)
        strategy.close_all("多第二止盈")
        isLong := false
        partialTpTriggered := false

if (strategy.position_size < 0)  // 空仓
    stopPrice := strategy.position_avg_price * (1 + stopLossPercent/100)
    firstTpPrice := strategy.position_avg_price * (1 - firstTakeProfitPercent/100)
    // 只在未触发第一止盈时计算第二止盈价格
    if not partialTpTriggered
        secondTpPrice := strategy.position_avg_price * (1 - secondTakeProfitPercent/100)
    
    if (close[1] >= stopPrice or high >= stopPrice)
        strategy.close_all("空止损")
        isShort := false
        partialTpTriggered := false
    
    if (not partialTpTriggered and (close[1] <= firstTpPrice or low <= firstTpPrice))
        strategy.order("空第一止盈", strategy.long, qty=firstTpQty)
        partialTpTriggered := true
        // 在这里重新计算第二止盈价格
        secondTpPrice := low * (1 - 0.04)  // 基于当前最低价再下跌4%
    
    if (close[1] <= secondTpPrice or low <= secondTpPrice)
        strategy.close_all("空第二止盈")
        isShort := false
        partialTpTriggered := false

// === 其他平仓条件 ===
if (exitLong and isLong)
    strategy.close_all("多平仓")
    isLong := false
    partialTpTriggered := false

if (exitShort and isShort)
    strategy.close_all("空平仓")
    isShort := false
    partialTpTriggered := false

// === 绘图 ===
plot(fastEMA, "快速EMA", color=color.blue)
plot(slowEMA, "慢速EMA", color=color.red)
plot(superFastEMA, "超快EMA", color=color.green)

// 绘制止盈止损线
plot(strategy.position_size != 0 ? strategy.position_avg_price : na, "开仓价", color=color.yellow)
plot(strategy.position_size != 0 ? stopPrice : na, "止损线", color=color.red)
plot(strategy.position_size != 0 ? firstTpPrice : na, "第一止盈线", color=color.green)
plot(strategy.position_size != 0 ? secondTpPrice : na, "第二止盈线", color=color.blue)
```

> Detail

https://www.fmz.com/strategy/481356

> Last Modified

2025-02-10 14:49:11
