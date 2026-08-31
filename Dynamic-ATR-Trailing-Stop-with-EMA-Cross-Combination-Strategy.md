
> Name

Dynamic-ATR-Trailing-Stop-with-EMA-Cross-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12039bfa4a130d423bf.png)

[trans]
#### 概述
该策略是一个基于ATR动态追踪止损和均线交叉的复合型交易系统,结合了多重技术指标进行交易过滤和风险控制。策略在15分钟时间周期运行,通过EMA均线、ATR波动率、RSI指标和成交量等多维度指标来确定交易信号,并采用动态追踪止损方式管理风险。

#### 策略原理
策略的核心逻辑包含以下几个关键组成部分：
1. 入场条件采用多重过滤机制：
   - 价格位于100周期EMA之上/下
   - 1小时周期100EMA趋势确认
   - 价格与ATR追踪止损线的交叉
   - RSI在30-70之间的中性区域
   - 当前成交量大于20周期均量
2. 风险控制系统：
   - 基于3倍ATR的动态追踪止损
   - 设置2倍ATR作为获利目标
3. 出场机制：
   - 15和17周期EMA连续两根K线的交叉信号
   - 触发追踪止损或获利目标
   
#### 策略优势
1. 多重技术指标交叉验证,有效降低虚假信号
2. 采用多周期趋势过滤,提高交易方向的准确性
3. 动态ATR止损可以根据市场波动率自适应调整
4. 获利目标与止损挂钩,确保风险收益比的动态平衡
5. 利用EMA交叉作为出场信号,避免过早离场
6. 成交量确认增加交易有效性

#### 策略风险
1. 多重过滤条件可能导致错过部分交易机会
2. 在剧烈波动市场中ATR止损可能过宽
3. 连续EMA交叉出场可能导致部分利润回吐
4. 对市场趋势依赖性较强,震荡市表现可能欠佳
5. 计算复杂度较高,可能存在执行延迟风险

#### 策略优化方向
1. 引入自适应参数优化机制：
   - ATR乘数可根据不同市场状态动态调整
   - EMA周期可基于市场波动率自动优化
2. 增加市场状态识别：
   - 添加趋势强度指标
   - 引入波动率周期判断
3. 完善风险控制：
   - 实现分批建仓和减仓
   - 增加最大持仓时间限制
4. 优化出场机制：
   - 结合趋势强度动态调整获利目标
   - 添加时间止损机制

#### 总结
该策略通过综合运用多个技术指标和风险控制手段,构建了一个相对完整的交易系统。策略的主要特点是采用动态ATR追踪止损来适应市场波动,同时利用多重指标过滤和均线交叉来确认交易信号。虽然存在一定的优化空间,但整体设计理念符合现代量化交易的要求,具有良好的实践应用价值。 || 

#### Overview
This strategy is a comprehensive trading system that combines ATR dynamic trailing stop-loss and EMA crossovers, integrating multiple technical indicators for trade filtering and risk control. Operating on a 15-minute timeframe, the strategy utilizes multiple dimensions of indicators including EMA, ATR volatility, RSI, and volume to determine trading signals while employing dynamic trailing stops for risk management.

#### Strategy Principles
The core logic includes several key components:
1. Entry conditions with multiple filters:
   - Price above/below 100-period EMA
   - 1-hour 100 EMA trend confirmation
   - Price crossover with ATR trailing stop line
   - RSI between 30-70 in neutral zone
   - Current volume above 20-period average volume
2. Risk control system:
   - Dynamic trailing stop based on 3x ATR
   - Take profit set at 2x ATR
3. Exit mechanism:
   - 15 and 17 period EMA crossover signals on consecutive bars
   - Trailing stop or take profit trigger

#### Strategy Advantages
1. Multiple technical indicators cross-validation reduces false signals
2. Multi-timeframe trend filtering improves directional accuracy
3. Dynamic ATR stop-loss adapts to market volatility
4. Profit targets linked to stop-loss ensures dynamic risk-reward balance
5. EMA crossover exits prevent premature position closure
6. Volume confirmation increases trade validity

#### Strategy Risks
1. Multiple filtering conditions may cause missed trading opportunities
2. ATR stops may be too wide in highly volatile markets
3. Consecutive EMA crossover exits may lead to profit giveback
4. Strong dependency on market trends, potentially underperforming in ranging markets
5. High computational complexity may result in execution delays

#### Strategy Optimization Directions
1. Introduce adaptive parameter optimization:
   - Dynamic adjustment of ATR multiplier based on market conditions
   - Automatic optimization of EMA periods based on volatility
2. Enhance market state recognition:
   - Add trend strength indicators
   - Incorporate volatility cycle detection
3. Improve risk control:
   - Implement staged position building and reduction
   - Add maximum holding time limits
4. Optimize exit mechanism:
   - Dynamic adjustment of profit targets based on trend strength
   - Add time-based stop-loss mechanism

#### Summary
This strategy constructs a relatively complete trading system through the comprehensive use of multiple technical indicators and risk control measures. The main feature is the use of dynamic ATR trailing stops to adapt to market volatility, while utilizing multiple indicator filters and EMA crossovers to confirm trading signals. While there is room for optimization, the overall design philosophy aligns with modern quantitative trading requirements and demonstrates good practical application value.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2025-02-16 08:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title='UT Bot Strategy with 100 EMA Filter, Trailing Stop and EMA Cross Exit', overlay=true)

// Inputs
a = input(1, title='Key Value. \'This changes the sensitivity\'')
c = input(10, title='ATR Period')
h = input(false, title='Signals from Heikin Ashi Candles')

// Higher timeframe trend filter (1-hour)
higherTimeframeEMA = request.security(syminfo.tickerid, "60", ta.ema(close, 100)) // 1-hour EMA

xATR = ta.atr(c)

// Adjusting ATR multiplier for Gold on 15-minute timeframe
atrMultiplier = 3
nLoss = atrMultiplier * xATR  // ATR-based loss calculation

src = h ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close, lookahead=barmerge.lookahead_off) : close

// Trailing Stop Calculation
xATRTrailingStop = 0.0
iff_1 = src > nz(xATRTrailingStop[1], 0) ? src - nLoss : src + nLoss
iff_2 = src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0) ? math.min(nz(xATRTrailingStop[1]), src + nLoss) : iff_1
xATRTrailingStop := src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0) ? math.max(nz(xATRTrailingStop[1]), src - nLoss) : iff_2

pos = 0
iff_3 = src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0) ? -1 : nz(pos[1], 0)
pos := src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0) ? 1 : iff_3

xcolor = pos == -1 ? color.red : pos == 1 ? color.green : color.blue

// Define 100 EMA
ema100 = ta.ema(src, 100)
plot(ema100, title="100 EMA", color=color.black, linewidth=2)

// Define 15 EMA and 17 EMA for exit conditions
ema15 = ta.ema(src, 15)
ema17 = ta.ema(src, 17)
plot(ema15, title="15 EMA", color=color.blue, linewidth=1)
plot(ema17, title="17 EMA", color=color.purple, linewidth=1)

// Define Entry Conditions
longCondition = src > ema100 and src > xATRTrailingStop and close > higherTimeframeEMA and ta.crossover(ta.ema(src, 1), xATRTrailingStop)
shortCondition = src < ema100 and src < xATRTrailingStop and close < higherTimeframeEMA and ta.crossover(xATRTrailingStop, ta.ema(src, 1))

// RSI Filter
rsi = ta.rsi(close, 14)
longCondition := longCondition and rsi > 30 and rsi < 70  // Ensure RSI is not in extreme conditions
shortCondition := shortCondition and rsi > 30 and rsi < 70

// Volume Filter
volumeMA = ta.sma(volume, 20)
longCondition := longCondition and volume > volumeMA
shortCondition := shortCondition and volume > volumeMA

// ** Trailing Stop Setup **
trailOffset = nLoss  // The trailing stop distance is based on ATR, which is already calculated
trailPriceLong = close - trailOffset  // The trailing stop for long trades is below the entry price
trailPriceShort = close + trailOffset  // The trailing stop for short trades is above the entry price

// Define Take Profit (TP) condition
takeProfitMultiplier = 2  // This sets the take profit at 2x the ATR from the entry
takeProfitLong = close + takeProfitMultiplier * nLoss
takeProfitShort = close - takeProfitMultiplier * nLoss

// Strategy Entries
if (longCondition)
    strategy.entry('long', strategy.long)

if (shortCondition)
    strategy.entry('short', strategy.short)

// Exit conditions for 15 and 17 EMA cross (must be consecutive on two bars)
exitLong = ta.crossover(ema15, ema17) and ta.crossover(ema15[1], ema17[1])  // Exit long if both the current and previous bars have 15 EMA crossing above 17 EMA
exitShort = ta.crossunder(ema15, ema17) and ta.crossunder(ema15[1], ema17[1])  // Exit short if both the current and previous bars have 15 EMA crossing below 17 EMA

// Apply trailing stop and take profit along with EMA cross exit
strategy.exit("Exit Long", "long", trail_price=trailPriceLong, trail_offset=trailOffset, limit=takeProfitLong)  // Long exit with trailing stop and TP
strategy.exit("Exit Short", "short", trail_price=trailPriceShort, trail_offset=trailOffset, limit=takeProfitShort)  // Short exit with trailing stop and TP

// Close positions when 15 and 17 EMAs cross consecutively
strategy.close("long", when=exitLong)
strategy.close("short", when=exitShort)

// Alert condition for trade closure
longExitAlert = exitLong  // Only trigger alert for long if both consecutive bars show crossover
shortExitAlert = exitShort  // Only trigger alert for short if both consecutive bars show crossunder

alertcondition(longExitAlert, title="Close Long Trade", message="Long trade closed. 15 EMA crossed above 17 EMA on two consecutive bars.")
alertcondition(shortExitAlert, title="Close Short Trade", message="Short trade closed. 15 EMA crossed below 17 EMA on two consecutive bars.")

```

> Detail

https://www.fmz.com/strategy/482475

> Last Modified

2025-02-18 15:48:18
