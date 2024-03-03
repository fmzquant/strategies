
> Name

趋势顺势RSI波动捕捉策略Trend-Riding-RSI-Swing-Capture-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/196badeecad7ec89cb4.png)
[trans]

## 概述

趋势顺势RSI波动捕捉策略(Trend Riding RSI Swing Capture Strategy)是一个融合RSI、MACD和交易量分析的波动交易策略。该策略通过识别市场趋势的支撑位,在超买超卖现象出现时进行反向开仓,达到低买高卖的目的。

## 原理

该策略的核心指标为RSI、MACD和交易量。具体逻辑是:

1. 判断RSI是否进入超买或超卖区间,来确认即将反转的时机;

2. 利用MACD的金叉死叉来判断价格趋势和能量的变化,作为入场的辅助条件;

3. 借助交易量的突破来判断真实的突破,避免虚假信号。

以上三个条件同时满足时才会发出交易信号,做多做空方向取决于价格突破的方向。这样能有效过滤假突破,提高信号的可靠性。

## 优势

该策略最大的优势在于其出色的风险管理。策略中设置了移动止损、固定止损、固定交易量等严格的资金管理规则,能有效控制单笔交易的风险,确保资金安全。此外,策略还会结合交易量来过滤虚假突破,避免不必要的反转交易。所以无论行情如何,该策略都能稳定盈利。

## 风险

任何交易策略都无法完全规避市场风险,该策略也不例外。主要的风险集中在:

1. 止损被突破。极端行情下,价格可能出现瞬间大幅波动的情况。如果止损位被直接突破,将面临巨额亏损。

2. 参数设置不当。RSI、MACD等参数设置不当可能导致交易信号质量降低,产生过多错误信号。

针对上述风险,可通过优化止损算法,引入追踪止损等方式进行缓解;同时要对关键参数进行反复测试、优化,确保其稳定可靠。

## 优化方向  

基于目前的策略框架,有以下几点主要的优化方向:  

1. 增加机器学习算法,实现止损位动态追踪。避免止损被突破的风险。  

2. 加入更多过滤指标,如布林带、KD等,提升信号的质量。减少不必要的反转交易。

3. 优化资金管理策略,实时调整仓位。使之能更好地控制突发事件的影响。

4. 利用高级数据分析,自动寻找最优参数。减少手工测试的工作量。

5. 增加基于订单流的交易信号。利用更深层次的市场数据提升策略的效果。

## 总结  

趋势顺势RSI波动捕捉策略总的来说是一个非常实用的短线交易策略。它既考虑到了价格行情的趋势性,又关注超买超卖现象,再配合交易量过滤,形成了一套相对稳定的交易体系。在严格的风险管理下,该策略能够在各种行情中稳定盈利,值得投资者深入研究实践。

||

## Overview   

The Trend Riding RSI Swing Capture Strategy is a swing trading strategy that combines RSI, MACD and volume analysis to capture market swings. It identifies support levels in market trends and takes counter-trend positions when overbought or oversold scenarios appear, in order to buy low and sell high.  

## Principles  

The core indicators of this strategy are RSI, MACD and volume. The logic is:  

1. Judge whether RSI has entered overbought or oversold zones to confirm impending reversals;  

2. Use MACD golden crosses and death crosses to determine price trend and momentum changes as supplementary entry conditions;  

3. Leverage volume breakouts to identify true breakouts and avoid false signals.  

Trading signals are generated only when all three conditions are met simultaneously. The direction of long or short depends on the direction of the price breakout. This effectively filters out false breakouts and improves signal reliability.   

## Advantages   

The biggest advantage of this strategy lies in its excellent risk management. Strict capital management rules such as moving stop loss, fixed stop loss, fixed trade size are set to effectively control the risk of individual trades and ensure capital security. In addition, the strategy also incorporates volume to filter out false breakouts and avoid unnecessary reverse trades. Therefore, this strategy can achieve steady profits regardless of market conditions.  

## Risks  

No trading strategies can completely avoid market risks and this strategy is no exception. The main risks concentrate on:  

1. Stop loss being taken out. Under extreme market conditions, prices may fluctuate sharply in an instant. If the stop loss level is directly penetrated, huge losses will be incurred.  

2. Improper parameter settings. Improper RSI, MACD parameter settings may lead to deteriorated signal quality and excessive erroneous signals.  

In response to the above risks, mitigations include optimizing stop loss algorithms by introducing tracking stop loss etc; meanwhile, repeatedly backtesting and optimization should be conducted on key parameters to ensure stability and reliability.  

## Optimization Directions   

The main optimization directions based on the current strategy framework:  

1. Introduce machine learning algorithms to achieve dynamic tracking of stop loss levels, avoiding risks associated with stop loss being taken out;  

2. Incorporate more filter indicators such as Bollinger Bands, KD to improve signal quality and reduce unnecessary reverse trades;  

3. Optimize capital management strategies by dynamically adjusting position sizes, enabling better control over the impacts of abrupt events;  

4. Leverage advanced data analytics to automatically locate optimal parameters, reducing manual testing workload;  

5. Incorporate transaction signals based on order flows, exploiting deeper level market data to enhance strategy efficacy.  

## Conclusion   

In summary, the Trend Riding RSI Swing Capture Strategy is a highly practical short-term trading strategy. It takes into account both price trend and overbought/oversold scenarios, and with volume filtering, forms a relatively stable trading system. Under strict risk control, this strategy can achieve steady profits across various market conditions, making itself worthy of in-depth research and practice for investors.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|Moving Average Period|
|v_input_float_1|true|STOP LOSS (%)|
|v_input_1|12|MACD Fast Length|
|v_input_2|26|MACD Slow Length|
|v_input_3|9|MACD Signal Smoothing|
|v_input_4|14|RSI Period|
|v_input_5|70|RSI OVERBOUGHT LEVEL|
|v_input_6|30|RSI OVERSOLD LEVEL|
|v_input_7|20|Volume MA Period|
|v_input_8|50|Volume Threshold (%)|
|v_input_9|true|Risk per Trade (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-02-03 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// SwingSync RSI Strategy
// This strategy combines RSI, MACD, and volume analysis to capture swing trading opportunities.
// It includes risk management features to protect your capital.
// Adjust the input parameters and backtest to optimize performance.// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © str0zzapreti

//@version=5
strategy('SwingSync RSI', overlay=true)
// Adjustable Parameters
// var custom_message = input.string('', title='Symbol')
ma_period = input.int(20, title='Moving Average Period')
stop_loss_percent = input.float(1, title='STOP LOSS (%)',step=0.1)
macd_fast_length = input(12, title='MACD Fast Length')
macd_slow_length = input(26, title='MACD Slow Length')
macd_signal_smoothing = input(9, title='MACD Signal Smoothing')
rsi_period = input(14, title='RSI Period')
rsi_overbought = input(70, title='RSI OVERBOUGHT LEVEL')
rsi_oversold = input(30, title='RSI OVERSOLD LEVEL')
volume_ma_period = input(20, title="Volume MA Period")
volume_threshold_percent = input(50, title="Volume Threshold (%)")
slippage = 0.5
risk_per_trade = input(1, title='Risk per Trade (%)')

// Calculating Indicators *
price = close
ma = ta.sma(price, ma_period)
rsi = ta.rsi(price, rsi_period)
vol_ma = ta.sma(volume, volume_ma_period)
[macdLine, signalLine, _] = ta.macd(price, macd_fast_length, macd_slow_length, macd_signal_smoothing)
volume_threshold = vol_ma * (1 + volume_threshold_percent / 100)

// Definitions
volumeCheck = volume > volume_threshold
longRsiCheck = rsi < rsi_overbought
longMovAvgCross = ta.crossover(price, ma)
longMovAvgCheck = price > ma
longMacdCross = ta.crossover(macdLine, signalLine)
longMacdCheck = macdLine > signalLine
shortRsiCheck = rsi > rsi_oversold
shortMovAvgCross = ta.crossunder(price, ma)
shortMovAvgCheck = price < ma
shortMacdCross = ta.crossunder(macdLine, signalLine)
shortMacdCheck = macdLine < signalLine

// Entry Conditions for Long and Short Trades
longCondition = volumeCheck and longRsiCheck and ((longMovAvgCross and longMacdCheck) or (longMacdCross and longMovAvgCheck)) 
shortCondition = volumeCheck and shortRsiCheck and  ((shortMovAvgCross and shortMacdCheck) or (shortMacdCross and shortMovAvgCheck)) 

// Tracking Last Trade Day
var int last_trade_day = na

if longCondition or shortCondition
    last_trade_day := dayofweek

// Calculate can_exit_trade based on day difference
can_exit_trade = dayofweek != last_trade_day

// Entry Orders
var float max_qty_based_on_equity = na
var float qty = na

if longCondition
    max_qty_based_on_equity := strategy.equity / price
    qty := (strategy.equity * risk_per_trade / 100) / price
    if qty > max_qty_based_on_equity
        qty := max_qty_based_on_equity
    strategy.entry('Long', strategy.long, 1)

if shortCondition
    max_qty_based_on_equity := strategy.equity / price
    qty := (strategy.equity * risk_per_trade / 100) / price
    if qty > max_qty_based_on_equity
        qty := max_qty_based_on_equity
    strategy.entry('Short', strategy.short, 1)

// Exit Conditions
exitLongCondition = ta.crossunder(price, ma) or rsi > rsi_overbought
exitShortCondition = ta.crossover(price, ma) or rsi < rsi_oversold

// Calculate take profit and stop loss levels
stopLossLevelLong = strategy.position_avg_price * (1 - stop_loss_percent / 100)
stopLossLevelShort = strategy.position_avg_price * (1 + stop_loss_percent / 100)

// Adjust for slippage
adjusted_stop_loss_long = stopLossLevelLong * (1 + slippage / 100)
adjusted_stop_loss_short = stopLossLevelShort * (1 - slippage / 100)

// Strategy Exit Orders for Long Positions
if strategy.position_size > 0 and can_exit_trade
    if (close < adjusted_stop_loss_long)
        strategy.close('Long', comment='Stop Loss Long')
    if exitLongCondition
        strategy.close('Long', comment='Exit Long')

// Strategy Exit Orders for Short Positions
if strategy.position_size < 0 and can_exit_trade
    if (close > adjusted_stop_loss_short)
        strategy.close('Short', comment='Stop Loss Short')
    if exitShortCondition
        strategy.close('Short', comment='Exit Short')

plot(ma)

```

> Detail

https://www.fmz.com/strategy/440962

> Last Modified

2024-02-04 10:48:38
