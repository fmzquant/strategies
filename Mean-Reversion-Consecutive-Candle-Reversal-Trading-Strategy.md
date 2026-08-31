
> Name

Mean-Reversion-Consecutive-Candle-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1dae1d30727352e93d1.png)

[trans]
#### 概述
这是一个基于均值回归原理的交易策略,通过识别连续下跌和上涨K线形态来捕捉短期价格反转机会。策略的核心逻辑是在出现连续3根下跌K线后入场做多,在出现连续3根上涨K线后平仓出场。策略还可以选择性地结合EMA均线过滤器来提高交易质量。

#### 策略原理 
策略主要基于以下几个核心要素:
1. 连续K线计数器:分别统计连续上涨和下跌的K线数量
2. 入场条件:当连续出现指定数量(默认3根)的收盘价下跌K线时触发做多信号
3. 出场条件:当连续出现指定数量(默认3根)的收盘价上涨K线时触发平仓信号
4. EMA过滤器:可选择性地添加200周期指数移动平均线作为趋势过滤条件
5. 交易时间窗口:可以设定具体的交易起止时间来限制交易区间

#### 策略优势
1. 逻辑简单清晰:策略使用简单的K线计数方法,容易理解和实现
2. 适应性强:可以应用于不同的时间周期和交易品种
3. 参数灵活:连续K线数量、EMA周期等参数都可以根据需要调整
4. 风险控制完善:通过时间窗口和趋势过滤等多重机制来控制风险
5. 计算效率高:核心逻辑只需要比较相邻K线收盘价,运算负担小

#### 策略风险
1. 趋势市场风险:在强趋势市场中可能频繁遭遇假突破
2. 参数敏感性:连续K线数量的设置对策略表现影响较大
3. 滑点影响:在波动剧烈的市场中可能面临较大的滑点风险
4. 假信号风险:连续K线形态可能受到市场噪音的干扰
5. 止损缺失:策略未设置明确的止损机制,可能带来较大回撤

#### 策略优化方向
1. 添加止损机制:建议增加固定止损或追踪止损来控制风险
2. 优化过滤条件:可以引入成交量、波动率等指标作为辅助过滤
3. 动态参数调整:考虑根据市场状态动态调整连续K线数量要求
4. 增加持仓管理:可以设计分批建仓和减仓机制提高收益
5. 完善时间管理:针对不同时间段设置不同的交易参数

#### 总结
这是一个设计合理的均值回归策略,通过捕捉短期价格超跌反弹机会来获取收益。策略的主要优势在于逻辑简单、适应性强,但在实际应用中需要注意控制风险,建议通过添加止损机制、优化过滤条件等方式来提升策略的稳定性。 ||

#### Overview
This is a mean reversion trading strategy that captures short-term price reversal opportunities by identifying consecutive bearish and bullish candle patterns. The core logic enters a long position after three consecutive bearish candles and exits after three consecutive bullish candles. The strategy can optionally incorporate an EMA filter to enhance trade quality.

#### Strategy Principles
The strategy is based on the following core elements:
1. Consecutive candle counter: Tracks the number of consecutive bullish and bearish candles
2. Entry condition: Triggers a long signal when specified number (default 3) of consecutive lower closing prices occurs
3. Exit condition: Triggers a closing signal when specified number (default 3) of consecutive higher closing prices occurs
4. EMA filter: Optional 200-period exponential moving average as trend filter
5. Trading time window: Can set specific trading start and end times to limit trading periods

#### Strategy Advantages
1. Simple and clear logic: Strategy uses simple candle counting method, easy to understand and implement
2. High adaptability: Can be applied to different timeframes and trading instruments
3. Flexible parameters: Consecutive candle counts, EMA period and other parameters can be adjusted as needed
4. Comprehensive risk control: Multiple mechanisms including time window and trend filter to control risk
5. High computational efficiency: Core logic only requires comparing adjacent candle closing prices, low computational load

#### Strategy Risks
1. Trend market risk: May encounter frequent false breakouts in strong trending markets
2. Parameter sensitivity: Number of consecutive candles setting significantly impacts strategy performance
3. Slippage impact: May face significant slippage risk in volatile markets
4. False signal risk: Consecutive candle patterns may be affected by market noise
5. Lack of stop loss: Strategy lacks explicit stop loss mechanism, may lead to large drawdowns

#### Strategy Optimization Directions
1. Add stop loss mechanism: Recommend adding fixed or trailing stop loss to control risk
2. Optimize filter conditions: Can introduce volume, volatility and other indicators as auxiliary filters
3. Dynamic parameter adjustment: Consider dynamically adjusting consecutive candle count requirements based on market conditions
4. Enhance position management: Can design partial position building and reduction mechanisms to improve returns
5. Improve time management: Set different trading parameters for different time periods

#### Summary
This is a well-designed mean reversion strategy that generates returns by capturing short-term oversold bounce opportunities. The strategy's main advantages are simple logic and high adaptability, but risk control needs attention in practical application. It is recommended to enhance strategy stability through adding stop loss mechanisms, optimizing filter conditions and other improvements.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-19 00:00:00
end: 2025-02-18 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("3 Down, 3 Up Strategy", overlay=true, initial_capital = 1000000, default_qty_value = 200, default_qty_type = strategy.percent_of_equity, process_orders_on_close = true, margin_long = 5, margin_short = 5, calc_on_every_tick = true)


//#region INPUTS SECTION
// ============================================
// Time Settings
// ============================================
startTimeInput = input(timestamp("1 Jan 2014"), "Start Time", group = "Time Settings")
endTimeInput = input(timestamp("1 Jan 2099"), "End Time", group = "Time Settings")
isWithinTradingWindow = true

// ============================================
// Strategy Settings
// ============================================
buyTriggerInput = input.int(3, "Consecutive Down Closes for Entry", minval = 1, group = "Strategy Settings")
sellTriggerInput = input.int(3, "Consecutive Up Closes for Exit", minval = 1, group = "Strategy Settings")

// ============================================
// EMA Filter Settings
// ============================================
useEmaFilter = input.bool(false, "Use EMA Filter", group = "Trend Filter")
emaPeriodInput = input.int(200, "EMA Period", minval = 1, group = "Trend Filter")
//#endregion

//#region INDICATOR CALCULATIONS
// ============================================
// Consecutive Close Counter
// ============================================
var int aboveCount = na
var int belowCount = na

aboveCount := close > close[1] ? (na(aboveCount) ? 1 : aboveCount + 1) : 0
belowCount := close < close[1] ? (na(belowCount) ? 1 : belowCount + 1) : 0

// ============================================
// Trend Filter Calculation
// ============================================
emaValue = ta.ema(close, emaPeriodInput)
//#endregion

//#region TRADING CONDITIONS
// ============================================
// Entry/Exit Logic
// ============================================
longCondition = belowCount >= buyTriggerInput and isWithinTradingWindow
exitCondition = aboveCount >= sellTriggerInput

// Apply EMA Filter if enabled
if useEmaFilter
    longCondition := longCondition and close > emaValue
//#endregion

//#region STRATEGY EXECUTION
// ============================================
// Order Management
// ============================================
if longCondition
    strategy.entry("Long", strategy.long)
    
if exitCondition
    strategy.close_all()
//#endregion
```

> Detail

https://www.fmz.com/strategy/482589

> Last Modified

2025-02-19 10:51:35
