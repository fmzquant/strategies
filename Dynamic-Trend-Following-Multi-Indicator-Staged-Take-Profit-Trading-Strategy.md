
> Name

Dynamic-Trend-Following-Multi-Indicator-Staged-Take-Profit-Trading-Strategy

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/fed10a05a71b3d8d05.png)

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
This strategy constructs a relatively complete trading system through the combination of multiple technical indicators, staged take-profit mechanisms, and dynamic position management. Its strengths lie in comprehensive risk control and high signal reliability, though it may miss some opportunities. Through continuous optimization and parameter adjustment, the strategy has the potential to maintain stable performance across different market conditions.
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
