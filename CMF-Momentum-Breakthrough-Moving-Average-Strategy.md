
> Name

CMF-Momentum-Breakthrough-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]
CMF动量突破均线策略

该策略融合使用CMF动量指标和200日EMA均线来构建交易信号。

具体来说,CMF动量指标反映资金流的变化速度。当其上穿0时为买入信号,下穿0时为卖出信号。同时,价格高于200日EMA时只做多,低于200日EMA时只做空。

止损设定为ATR指标的2倍。止盈为止损的2倍,实现2:1的止盈止损比。

这种策略的优势是利用CMF动量判断资金流向同时辅以EMA判断大趋势。止盈止损设定LETTRE了盈亏比,有利于获得稳定收益。但由于指标滞后,入场时机无法把握最优。

总体来说,CMF动量突破均线策略在趋势明显时效果较好。但实盘中仍需关注指标发出信号的时点,避免不必要的损失。

||

This strategy combines the CMF Momentum indicator and 200-day EMA to construct trading signals.

Specifically, CMF Momentum reflects the rate of change in money flow. Upcrossing 0 is the buy signal, and downcrossing 0 is the sell signal. Meanwhile, only long above 200-day EMA, and only short below it.

The stop loss is set at 2 times ATR. Take profit is 2 times stop loss, achieving a 2:1 profit/loss ratio.

The advantage of this strategy is using CMF Momentum to judge fund flow direction combined with EMA for the major trend. The profit/loss ratio helps obtain steady gains. But due to lagging indicators, entry timing cannot be optimal.

Overall, the CMF Momentum breakout moving average strategy works better when trends are clear. But attention is still needed on timing of signal entries in live trading to avoid unnecessary losses.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2021|Backtest Start Year|
|v_input_2|5|Backtest Start Month|
|v_input_3|2|Backtest Start Day|
|v_input_4|false|Backtest Start Hour|
|v_input_5|2021|Backtest End Year|
|v_input_6|5|Backtest End Month|
|v_input_7|16|Backtest End Day|
|v_input_8|false|Backtest End Hour|
|v_input_9|false|Strategy Direction|
|v_input_10|2|Profit/Loss Multiplier|
|v_input_11|200|EMA Period|
|v_input_12|2|ATR Multiplier|
|v_input_13|10|ATR Period|
|v_input_14|11|CMF Period|
|v_input_15|7|CMF Velocity Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-11 00:00:00
end: 2023-09-10 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// ***************************************************
// CMF Velocity with 200 EMA Strategy
// CMF Velocity Indicator by TheSadRhinoInvesting
// Author: TheSadRhinoInvesting, v1.0, 2021.05.16
//                   INITIAL RELEASE
// ***************************************************

//@version=4
strategy("CMF Velocity with 200EMA Strategy")

// ***************************************************
//              Strategy & Rules
// ***************************************************
// This strategy is a demonstration of my new Indicator: CMF Velocity
// CMF Velocity: https://www.tradingview.com/script/zsTl96Gd-CMF-Velocity/
// The strategy works best in a strongly trending market

// === Indicators ===
// EMA 
// @ 200
// CMF Velocity
// @ 11, 7
// ATR
// @ 10

// === Rules ===
// long only 
// - price above EMA200
// short only 
// - price below EMA200
// Stop Loss = 2x ATR
// Profit = 2x SL/risk (Profit Ratio x Max Loss)

// === Entries ===
// LONG
// - long entry (Typical): 
// - CMF Velocity crosses above 0

// SHORT
// - short entry (Typical): 
// - CMF Velocity crosses below 0

// ***************************************************
// Backtest Parameters
// ***************************************************
testStartYear = input(2021, "Backtest Start Year")
testStartMonth = input(5, "Backtest Start Month")
testStartDay = input(2, "Backtest Start Day")
testStartHour = input(0, "Backtest Start Hour")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, testStartHour, 0)

testEndYear = input(2021, "Backtest End Year")
testEndMonth = input(5, "Backtest End Month")
testEndDay = input(16, "Backtest End Day")
testEndHour = input(0, "Backtest End Hour")
testPeriodEnd = timestamp(testEndYear, testEndMonth, testEndDay, testEndHour, 0)

timeBacktesting = true
direction = input(0, title = "Strategy Direction", type=input.integer, minval=-1, maxval=1)
strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))

// ***************************************************
// Inputs
// ***************************************************
// Profit/Loss Ratio
pLRatioMultiplier = input(2, title="Profit/Loss Multiplier", step=0.1, minval=0.1)

// EMA Period
emaPeriod = input(200, title="EMA Period", step=1, minval=1)
// ATR Multiplier
atrMultiplier = input(2, title="ATR Multiplier", step=0.1, minval=0.1)
// ATR Period
atrPeriod = input(10, title="ATR Period", step=1, minval=1)
// CMF Period
cmfPeriod = input(11, title="CMF Period", step=1, minval=1)
// CMF Velocity Period
cmfVelocityPeriod = input(7, title="CMF Velocity Period", step=1, minval=1)

// ***************************************************
// Indicator Functions
// ***************************************************
// CMF Function
cmf(period) =>
    moneyFlowMultiplier = (((close - low) - (high - close)) / (high - low)) * volume
    notNaMoneyFlowMultiplier = na(moneyFlowMultiplier) ? 0 : moneyFlowMultiplier
    moneyFlowAverage = sma(notNaMoneyFlowMultiplier, period)
    volumeAverage = sma(volume, period)
    moneyFlowAverage / volumeAverage

// CMF Velocity Function    
cmfVelocity(cmf, period) =>
    difference = change(cmf)
    sma(difference, period)
    
// ***************************************************
// Indicator Calculation and Plotting
// ***************************************************
cmfSeries = cmf(cmfPeriod)
cmfVelocitySeries = cmfVelocity(cmfSeries, cmfVelocityPeriod)
atrSeries = atr(atrPeriod)
triggerEMA = ema(close, emaPeriod)
plot(triggerEMA)    

// ***************************************************
// Strategy Execution
// ***************************************************
if (crossover(cmfVelocitySeries, 0.0) and triggerEMA < close and timeBacktesting)
    stopOffset = atrSeries * atrMultiplier
    profitOffset = stopOffset * pLRatioMultiplier
    stopLoss = close - stopOffset
    takeProfit = close + profitOffset
    strategy.entry("Long Entry", true)
    strategy.exit("Exit", "Long Entry", stop=stopLoss, limit=takeProfit)
    
if (crossunder(cmfVelocitySeries, 0.0) and triggerEMA > close and timeBacktesting)
    stopOffset = atrSeries * atrMultiplier
    profitOffset = stopOffset * pLRatioMultiplier
    stopLoss = close + stopOffset
    takeProfit = close - profitOffset
    strategy.entry("Short Entry", false)
    strategy.exit("Exit", "Short Entry", stop=stopLoss, limit=takeProfit)

```

> Detail

https://www.fmz.com/strategy/426394

> Last Modified

2023-09-11 17:40:54
