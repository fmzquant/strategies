
> Name

Dual-Timeframe-Supertrend-RSI-Intelligent-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/135dac591b29a81a133.png)

[trans]
#### 概述
这是一个结合双时间周期超趋势指标和RSI指标的智能交易策略。策略通过5分钟和60分钟两个时间周期的超趋势指标协同配合,并结合RSI指标进行交易信号确认,同时具备完善的仓位管理机制。该策略支持日内交易和持仓交易两种模式,并提供了灵活的止盈止损和移动止损设置选项。

#### 策略原理
策略主要基于以下核心逻辑进行交易:
1. 使用ATR周期为10,因子为3.0的超趋势指标,分别在5分钟和60分钟时间周期上计算。
2. 在5分钟和60分钟周期上,超趋势指标都为多头方向且RSI大于60时,触发做多信号。
3. 在5分钟和60分钟周期上,超趋势指标都为空头方向且RSI小于40时,触发做空信号。
4. 当5分钟周期超趋势指标转向时,平仓对应方向的持仓。
5. 不允许在60分钟超趋势指标为多头时做空,也不允许在60分钟超趋势指标为空头时做多。
6. 提供基于点数或百分比的止盈、止损和移动止损功能。
7. 在日内交易模式下,仅在指定的交易时段内开仓。

#### 策略优势
1. 多周期协同:通过结合不同时间周期的超趋势指标,有效降低虚假信号。
2. RSI确认:使用RSI指标进行趋势确认,提高交易的可靠性。
3. 完善的风控:提供多样化的止盈止损方案,包括固定止损、百分比止损和移动止损。
4. 灵活性强:可根据交易者需求选择日内或持仓模式,并可自定义交易时段。
5. 趋势跟踪:通过超趋势指标的方向变化自动平仓,有效把握趋势转折点。

#### 策略风险
1. 震荡市场风险:在横盘震荡市场中可能频繁触发交易信号,导致过度交易。
2. 滑点风险:在市场波动剧烈时,可能因滑点造成止损或止盈价格偏离预期。
3. 信号延迟:由于使用了60分钟周期的指标,可能在趋势转折点出现信号滞后。
4. 资金管理风险:如果止损设置不当,可能导致单次损失过大。

#### 策略优化方向
1. 引入波动率自适应:可根据市场波动率动态调整超趋势因子和ATR周期。
2. 增加成交量指标:结合成交量分析,提高信号可靠性。
3. 优化RSI阈值:可通过回测数据确定最优的RSI买卖阈值。
4. 完善仓位管理:增加动态仓位管理机制,根据市场风险度自动调整开仓比例。
5. 增加趋势强度过滤:引入趋势强度指标,过滤弱趋势环境下的交易信号。

#### 总结
这是一个设计合理、逻辑严谨的趋势跟踪策略。通过多周期协同和RSI确认机制,有效提高了交易信号的可靠性。完善的风险控制机制和灵活的参数设置,使其具有良好的实战应用价值。建议交易者在实盘使用前,充分测试各项参数,并根据具体交易品种和市场环境进行针对性优化。

||

#### Overview
This is an intelligent trading strategy combining dual timeframe Supertrend indicators with RSI. The strategy coordinates Supertrend indicators from 5-minute and 60-minute timeframes, confirms trading signals with RSI, and includes comprehensive position management mechanisms. It supports both intraday and positional trading modes, offering flexible options for take-profit, stop-loss, and trailing stop-loss settings.

#### Strategy Principles
The strategy operates on the following core logic:
1. Uses Supertrend indicator with ATR period of 10 and factor 3.0, calculated on both 5-minute and 60-minute timeframes.
2. Generates buy signals when Supertrend indicators on both timeframes are bullish and RSI is above 60.
3. Generates sell signals when Supertrend indicators on both timeframes are bearish and RSI is below 40.
4. Closes positions when the 5-minute Supertrend indicator changes direction.
5. Prevents selling when 60-minute Supertrend is bullish and buying when it's bearish.
6. Provides point-based or percentage-based take-profit, stop-loss, and trailing stop-loss features.
7. In intraday mode, only opens positions during specified trading sessions.

#### Strategy Advantages
1. Multi-timeframe Synergy: Reduces false signals by combining Supertrend indicators from different timeframes.
2. RSI Confirmation: Enhances trade reliability through RSI trend confirmation.
3. Robust Risk Management: Offers diverse stop-loss solutions including fixed, percentage-based, and trailing stops.
4. High Flexibility: Allows choice between intraday and positional modes with customizable trading sessions.
5. Trend Following: Automatically closes positions based on Supertrend direction changes, effectively capturing trend reversal points.

#### Strategy Risks
1. Choppy Market Risk: May generate excessive trades in range-bound markets.
2. Slippage Risk: Price slippage during high volatility may cause deviation from expected stop/target levels.
3. Signal Delay: Using 60-minute timeframe indicators may result in delayed signals at trend reversal points.
4. Capital Management Risk: Improper stop-loss settings may lead to excessive single-trade losses.

#### Optimization Directions
1. Introduce Volatility Adaptation: Dynamically adjust Supertrend factor and ATR period based on market volatility.
2. Add Volume Analysis: Incorporate volume indicators to enhance signal reliability.
3. Optimize RSI Thresholds: Determine optimal RSI buy/sell thresholds through backtesting.
4. Enhanced Position Management: Add dynamic position sizing based on market risk levels.
5. Add Trend Strength Filtering: Incorporate trend strength indicators to filter signals in weak trend environments.

#### Summary
This is a well-designed, logically rigorous trend-following strategy. It achieves reliable trading signals through multi-timeframe coordination and RSI confirmation. The comprehensive risk control mechanisms and flexible parameter settings make it valuable for practical application. Traders are advised to thoroughly test parameters and optimize them according to specific trading instruments and market conditions before live implementation.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-01 00:00:00
end: 2024-10-31 23:59:59
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// Author: Debabrata Saha
strategy("Supertrend Dual Timeframe with RSI", overlay=true)

// Input for System Mode (Positional/Intraday)
systemMode = input.string("Intraday", title="System Mode", options=["Intraday", "Positional"])

// Input for Intraday Session Times
startSession = input(timestamp("2023-10-01 09:15"), title="Intraday Start Session (Time From)")
endSession = input(timestamp("2023-10-01 15:30"), title="Intraday End Session (Time To)")

// Input for Target Settings (Off/Points/%)
targetMode = input.string("Off", title="Target Mode", options=["Off", "Points", "%"])
target1Value = input.float(10, title="Target 1 Value", step=0.1)
target2Value = input.float(20, title="Target 2 Value", step=0.1)

// Input for Stoploss Settings (Off/Points/%)
stoplossMode = input.string("Off", title="Stoploss Mode", options=["Off", "Points", "%"])
stoplossValue = input.float(10, title="Stoploss Value", step=0.1)

// Input for Trailing Stop Loss (Off/Points/%)
trailStoplossMode = input.string("Off", title="Trailing Stoploss Mode", options=["Off", "Points", "%"])
trailStoplossValue = input.float(5, title="Trailing Stoploss Value", step=0.1)

// Supertrend settings
atrPeriod = input(10, title="ATR Period")
factor = input(3.0, title="Supertrend Factor")

// Timeframe definitions
timeframe5min = "5"
timeframe60min = "60"

// Supertrend 5-min and 60-min (ta.supertrend returns two values: [Supertrend line, Buy/Sell direction])
[st5minLine, st5minDirection] = ta.supertrend(factor, atrPeriod)
[st60minLine, st60minDirection] = request.security(syminfo.tickerid, timeframe60min, ta.supertrend(factor, atrPeriod))

// RSI 5-min
rsi5min = ta.rsi(close, 14)

// Conditions for Buy and Sell signals
isSupertrendBuy = (st5minDirection == 1) and (st60minDirection == 1)
isSupertrendSell = (st5minDirection == -1) and (st60minDirection == -1)

buyCondition = isSupertrendBuy and (rsi5min > 60)
sellCondition = isSupertrendSell and (rsi5min < 40)

// Exit conditions
exitBuyCondition = st5minDirection == -1
exitSellCondition = st5minDirection == 1

// Intraday session check
inSession = true

// Strategy Logic (Trades only during the intraday session if systemMode is Intraday)
if (buyCondition and inSession)
    strategy.entry("Buy", strategy.long)

if (sellCondition and inSession)
    strategy.entry("Sell", strategy.short)

// Exit logic using strategy.close() to close the position at market price
if (exitBuyCondition)
    strategy.close("Buy")

if (exitSellCondition)
    strategy.close("Sell")

// No Sell when 60-min Supertrend is green and no Buy when 60-min Supertrend is red
if isSupertrendSell and (st60minDirection == 1)
    strategy.close("Sell")

if isSupertrendBuy and (st60minDirection == -1)
    strategy.close("Buy")

// Target Management
if (targetMode == "Points")
    strategy.exit("Target 1", "Buy", limit=close + target1Value)
    strategy.exit("Target 2", "Sell", limit=close - target2Value)
if (targetMode == "%")
    strategy.exit("Target 1", "Buy", limit=close * (1 + target1Value / 100))
    strategy.exit("Target 2", "Sell", limit=close * (1 - target2Value / 100))

// Stoploss Management
if (stoplossMode == "Points")
    strategy.exit("Stoploss", "Buy", stop=close - stoplossValue)
    strategy.exit("Stoploss", "Sell", stop=close + stoplossValue)
if (stoplossMode == "%")
    strategy.exit("Stoploss", "Buy", stop=close * (1 - stoplossValue / 100))
    strategy.exit("Stoploss", "Sell", stop=close * (1 + stoplossValue / 100))

// Trailing Stop Loss
if (trailStoplossMode == "Points")
    strategy.exit("Trail SL", "Buy", trail_price=na, trail_offset=trailStoplossValue)
    strategy.exit("Trail SL", "Sell", trail_price=na, trail_offset=trailStoplossValue)
if (trailStoplossMode == "%")
    strategy.exit("Trail SL", "Buy", trail_price=na, trail_offset=trailStoplossValue / 100 * close)
    strategy.exit("Trail SL", "Sell", trail_price=na, trail_offset=trailStoplossValue / 100 * close)

```

> Detail

https://www.fmz.com/strategy/472939

> Last Modified

2024-11-25 11:18:30
