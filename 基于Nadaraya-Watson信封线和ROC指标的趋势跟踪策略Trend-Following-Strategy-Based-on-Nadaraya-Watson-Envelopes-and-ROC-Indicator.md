
> Name

基于Nadaraya-Watson信封线和ROC指标的趋势跟踪策略Trend-Following-Strategy-Based-on-Nadaraya-Watson-Envelopes-and-ROC-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ad5868b2904b80b92d.png)
 [trans]
#### 概述

本策略名称为“双信封趋势追踪策略”。该策略利用Nadaraya-Watson(NW)信封线和ROC指标来识别趋势方向,实现趋势追踪。当NW信封线扩大并且ROC为正时做多;当NW信封线收缩并且ROC为负时做空。该策略同时设置了止损和止盈条件来控制风险。

#### 策略原理

双信封趋势追踪策略主要基于NW信封线和ROC指标来判断入场时机。NW信封线是一种非参数平滑技术,可以用来描绘价格的高低范围。ROC指标可以识别价格变化速度和强度。

具体来说,该策略首先计算NW上限线和下限线。当价格突破NW上限线,并且ROC>0时,表示行情处于上涨趋势,这时做多;当价格跌破NW下限线,并且ROC<0时,表示行情处于下跌趋势,这时做空。

做多做空后,该策略会设置止损和止盈条件。止损点为入场价下方固定点数,止盈点为入场价上方止损点数的一定倍数。这可以有效控制单笔交易的风险。

总的来说,双信封趋势追踪策略结合NW信封线和ROC指标判断趋势方向,以及止损止盈来控制风险,实现了趋势追踪交易。

#### 优势分析

双信封趋势追踪策略有以下几个优势:

1. 利用NW信封线判断趋势方向,可以有效识别价格趋势,减少假信号。

2. 结合ROC指标判定趋势强度,避免在震荡市中错交易。

3. 设置止损止盈来控制风险,可以在亏损扩大前止损出场。同时也确保了部分利润。

4. 该策略参数较少,实现简单,容易理解和优化。

5. 可以在任何品种上应用,包括外汇、数字货币和股票等市场。

#### 风险分析

双信封趋势追踪策略也存在以下风险:

1. 追逐趋势策略容易在趋势反转时损失严重。需要适当调整参数或人工干预退出。

2. 止损点过于宽松会增加亏损。可以适当缩减止损点数量。

3. 在高波动市场中,止损可能被突破,导致无法控制亏损。可以考虑实时止损或动态止损。

4. 策略并没有考虑交易成本和滑点。这在高频交易中会加重损失。

总体来说通过参数调优、优化止损策略以及适当人工干预可以减少这些风险。

#### 策略优化方向  

该策略可以从以下几个方面进行优化:

1. 优化NW参数,如窗口周期、带宽大小等,寻找最佳参数组合。

2. 优化ROC参数如窗口大小,降低假信号。

3. 尝试其他指标如KDJ、MACD等来判断趋势和入场。

4. 结合机器学习算法动态优化止损止盈策略。

5. 增加趋势反转信号,在趋势反转时主动退场。

6. 考虑实盘中的滑点、手续费、止损失败概率等细节,使策略更贴近实盘。

通过参数优化、指标和算法引入,可以进一步提高策略的稳定性和盈利能力。

#### 总结  

本策略名称为“双信封趋势追踪策略”。该策略利用NW信封线和ROC指标判断趋势方向入场,同时设置止损止盈,实现了趋势跟踪交易。策略简单有效,优点是可以顺应趋势,控制风险,适用于多种市场;缺点是容易在趋势反转中损失及难以捕捉反转时机。通过参数优化、算法引入以及手工干预,可以进一步增强策略的稳定性。总体来说,双信封趋势追踪策略是一种值得推荐的趋势跟踪交易策略。

||

#### Overview

This strategy is named "Dual Envelope Trend Following Strategy". It utilizes Nadaraya-Watson (NW) envelopes and ROC indicator to identify trend direction for trend following. It goes long when NW envelope expands and ROC is positive; goes short when NW envelope contracts and ROC is negative. Stop loss and take profit conditions are also configured to control risks.

#### Strategy Logic

The dual envelope trend following strategy mainly uses NW envelopes and ROC indicator to determine entry signals. NW envelope is a nonparametric smoothing technique that depicts price high-low range. ROC indicator identifies price change speed and strength.  

Specifically, this strategy first calculates upper and lower limit of NW envelopes. When price breaks through NW upper limit and ROC>0, it indicates an uptrend, so goes long. When price breaks through NW lower limit and ROC<0, it indicates a downtrend, so goes short.

After entering long or short, stop loss and take profit points are set. Stop loss is fixed pips below entry price. Take profit is certain multiplier of stop loss pips above entry price. This effectively controls risks for each trade.

In summary, the dual envelope trend following strategy combines NW envelopes and ROC indicator to judge trend direction, and uses stop loss and take profit to control risks, realizing trend following trading.

#### Advantage Analysis

The dual envelope trend following strategy has the following advantages:

1. Using NW envelopes to determine trend direction can effectively identify price trend and reduce false signals.  

2. Combining with ROC indicator to judge trend strength avoids wrong trades in ranging markets.

3. Setting stop loss and take profit controls risks, allowing to stop out before loss expands. Also locks in some profits.

4. The strategy has few parameters and is simple to understand and optimize.  

5. It can be applied to any market including forex, crypto and stocks.

#### Risk Analysis 

The dual envelope trend following strategy also has the following risks:

1. Trend following strategies are vulnerable to severe losses during trend reversal. Parameters should be adjusted or intervene manually.

2. A too wide stop loss may expand losses. Can properly tighten stop loss pips.  

3. In high volatility markets, stop loss may be penetrated, failing to control losses. Consider real-time or dynamic stop loss. 

4. Transaction costs and slippage are not considered which can add to losses in high frequency trading.

In general the risks can be reduced through parameter optimization, stop loss strategy improvement and proper manual intervention.

#### Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize NW parameters like window period and bandwidth to find best combination.

2. Optimize ROC window size to reduce false signals.  

3. Try other indicators like KDJ and MACD for trend and entry judgment.

4. Incorporate machine learning models to dynamically optimize stop loss and take profit.

5. Add trend reversal signals to actively exit when trend reverses. 

6. Consider practical details like slippage, fees, stop loss failure probabilities to make strategy closer to live trading.

Parameter optimization, indicator and algorithm introduction can further improve strategy stability and profitability.   

#### Summary

In summary, this strategy is named "Dual Envelope Trend Following Strategy". It uses NW envelopes and ROC indicator to determine trend direction and entries, and sets stop loss and take profit for trend following trading. The strategy is simple and effective, good at following trends and controlling risks, and can be applied to various markets. Shortcomings are severe losses during trend reversals and difficulty in capturing reversals. Further enhancements can be made through parameter optimization, algorithm incorporation and manual intervention to improve stability. Overall it is a recommended trend following trading strategy.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|500|NW Window Size|
|v_input_float_2|8|NW Bandwidth|
|v_input_float_3|3|NW Multiplier|
|v_input_1_close|0|NW Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_color_1|#39ff14|NW Upper Color|
|v_input_color_2|#ff1100|NW Lower Color|
|v_input_2|false|NW Hide Disclaimer|
|v_input_int_1|9|ROC Window Size|
|v_input_3_close|0|ROC Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|0.0001|PIP Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-18 00:00:00
end: 2024-01-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Combined Strategy", overlay=true)

// --- Nadaraya-Watson Envelope [LUX] ---
length_NW = input.float(500, title='NW Window Size', maxval=500, minval=0)
h_NW = input.float(8.0, title='NW Bandwidth')
mult_NW = input.float(3.0, title='NW Multiplier')
src_NW = input(close, title='NW Source')
up_col_NW = input.color(#39ff14, title='NW Upper Color', inline='col')
dn_col_NW = input.color(#ff1100, title='NW Lower Color', inline='col')
disclaimer_NW = input(false, title='NW Hide Disclaimer')

// --- Rate Of Change (ROC) ---
length_ROC = input.int(9, title='ROC Window Size', minval=1)
source_ROC = input(close, title='ROC Source')

roc = 100 * (source_ROC - source_ROC[length_ROC]) / source_ROC[length_ROC]

// --- Calcola Stop Loss e Take Profit in Pips ---
pip_multiplier = input(0.0001, title="PIP Multiplier")  // Moltiplicatore per convertire da pips a valore numerico

stop_loss_pips = 4
take_profit_multiplier = 2.1

stop_loss_value = close - stop_loss_pips * pip_multiplier
take_profit_value = close + stop_loss_pips * take_profit_multiplier * pip_multiplier

// --- Conditions for Entry ---
entry_condition_long = src_NW + mult_NW * mult_NW > 0 and roc > 0 and close > close[1]
entry_condition_short = src_NW - mult_NW * mult_NW < 0 and roc < 0 and close < close[1]

// --- Strategy Logic ---
if (entry_condition_long)
    strategy.entry("Buy", strategy.long)

if (entry_condition_short)
    strategy.entry("Sell", strategy.short)

if (strategy.position_size > 0)
    strategy.exit("Stop Loss/Profit", from_entry="Buy", loss=stop_loss_value, profit=take_profit_value)

if (strategy.position_size < 0)
    strategy.exit("Stop Loss/Profit", from_entry="Sell", loss=stop_loss_value, profit=take_profit_value)

// --- Plotting ---
plot(roc, color=#2962FF, title="ROC")
hline(0, color=#787B86, title="Zero Line")


```

> Detail

https://www.fmz.com/strategy/439361

> Last Modified

2024-01-19 15:14:23
