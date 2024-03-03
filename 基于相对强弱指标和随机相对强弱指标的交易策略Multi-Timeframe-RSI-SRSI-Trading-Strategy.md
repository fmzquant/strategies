
> Name

基于相对强弱指标和随机相对强弱指标的交易策略Multi-Timeframe-RSI-SRSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13c6d14e89a7fa34ca7.png)
[trans]
## 概述

这个交易策略结合使用了相对强弱指标(RSI)和随机相对强弱指标(Stochastic RSI)两个技术指标来产生交易信号。策略额外利用更高时间框架的加密货币价格走势来确认趋势,以提高信号的可靠性。

## 策略名称

多时间框架RSI-SRSI交易策略(Multi Timeframe RSI-SRSI Trading Strategy)

## 策略原理

该策略根据RSI指标值高低来判断超买超卖现象。当RSI低于30时为超卖信号,高于70时为超买信号。Stochastic RSI指标则观察RSI指标本身的波动情况。Stochastic RSI低于5为超卖信号,高于50为超买信号。

策略同时结合更高时间框架(例如周线)的加密货币价格走势。只有当更高时间框架的RSI高于阈值时(例如45),才产生买入交易信号。这个设定能过滤掉整体处于下跌趋势时出现的非persistent的超卖信号。

买入和卖出信号在触发后,需要经过一定周期(如8根K线)的确认,避免产生误导性的信号。

## 策略优势

- 利用RSI指标判断超买超卖的经典技术分析方法
- 结合Stochastic RSI指标识别RSI本身的反转信号
- 应用多时间框架技术过滤误导信号,提升信号质量

## 策略风险及解决方法

- RSI指标容易产生虚假信号
  - 结合其他指标过滤误导信号
  - 应用趋势确认技术
- 阈值参数设置不当易产生过多交易信号
  - 优化参数组合找到最佳参数
- 买卖信号需要一定确认时间
  - 找到平衡确认周期,既过滤误导信号,又不错过机会

## 策略优化方向

- 测试更多指标的组合,寻找更强信号
  - 例如将MACD指标加入策略
- 尝试机器学习方法寻找最优参数
  - 使用遗传算法/进化算法自动寻优
- 增加止损策略控制单笔交易风险
  - 当价格跌破支持位时止损

## 总结

该策略主要依靠RSI和Stochastic RSI两个经典交易指标产生交易信号。同时,引入更高时间框架进行趋势确认,能有效过滤误导信号,提高信号质量。通过参数优化,止损策略等手段能进一步增强策略表现。该策略思路简单直接,容易理解实现,是量化交易的一个很好的起点。

||

## Overview

This trading strategy combines the Relative Strength Index (RSI) and Stochastic Relative Strength Index (Stochastic RSI) technical indicators to generate trading signals. Additionally, it utilizes the price trend of cryptocurrencies in higher timeframes to confirm the trend and increase signal reliability.  

## Strategy Name

Multi Timeframe RSI-SRSI Trading Strategy

## Strategy Logic

The strategy judges overbought and oversold conditions based on RSI values. RSI below 30 is considered oversold signal and RSI above 70 is considered overbought signal. The Stochastic RSI indicator observes the fluctuation of RSI values. Stochastic RSI below 5 is oversold and Stochastic RSI above 50 is overbought.

The strategy also incorporates the price trend of cryptocurrency in higher timeframes (e.g. weekly). Only when higher timeframe RSI is above a threshold (e.g. 45), long signals are triggered. This filters out non-persistent oversold signals when the overall trend is down.

The buy and sell signals need to be confirmed for a number of periods (e.g. 8 bars) before an actual trading signal is generated to avoid fake signals.

## Advantages

- Classic technical analysis method using RSI to identify overbought/oversold levels
- Incorporates Stochastic RSI to catch reversals of RSI 
- Applies multi-timeframe techniques to filter fake signals and improve quality

## Risks & Solutions

- RSI prone to generating false signals
  - Combine other indicators to filter fake signals
  - Apply trend confirmation techniques  
- Improper threshold settings can produce too many signals
  - Optimize parameters to find best combination
- Signals need confirmation time
  - Balance confirmation periods - filter fake signals without missing opportunities

## Enhancement Areas

- Test more indicator combinations for stronger signals 
  - e.g. incorporate MACD indicator
- Utilize machine learning methods to find optimal parameters
  - e.g. genetic algorithms/evolutionary algorithms for automated optimization
- Add stop loss strategies to control single trade risks
  - Set stop loss when price breaks support level

## Conclusion

The strategy mainly relies on the two classic technical indicators, RSI and Stochastic RSI, to generate trading signals. Additionally, the introduction of trend confirmation from higher timeframes helps filter fake signals effectively and improves signal quality. Further performance improvement can be achieved by optimizing parameters, adding stop loss and other means. The logic is simple and easy to understand. It serves a good starting point for quant trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Length|
|v_input_2|14|Stochastic Length|
|v_input_3|3|K Smooth|
|v_input_4|3|D Smooth|
|v_input_5|5|Low SRSI|
|v_input_6|50|High SRSI|
|v_input_7|5|difference|
|v_input_8|30|Low RSI|
|v_input_9|60|High RSI|
|v_input_10|45|High higher time frame RSI|
|v_input_11|8|Trigger duration|
|v_input_12|20|Monitoring last low|
|v_input_timeframe_1|W|Higher time-frame|
|v_input_13|BTC_USDT:swap|Input Ticker (leave empty for current)|
|v_input_14|2019|Start Year|
|v_input_15|true|Start Month|
|v_input_16|true|Start Day|
|v_input_17|2030|End Year|
|v_input_18|true|End Month|
|v_input_19|true|End Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-11 00:00:00
end: 2024-02-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI and Stochatic Strategy", overlay=true, use_bar_magnifier = false)


/////// Inputs ///////////////

// RSI and SRSI
rsiLength = input(14, title="RSI Length") 
stochLength = input(14, title="Stochastic Length")
kSmooth = input(3, title="K Smooth")
dSmooth = input(3, title="D Smooth")


//////// thresholds ///////////////
st_low = input(5, title="Low SRSI") // stochastic RSI low -- prepare to sell
st_hi = input(50, title="High SRSI") // stochastic RSI high -- prepare to buy
diff = input(5, title="difference") // minimum change in RSI
// inval_diff = input(12, title="difference") // invalidation difference: change in the oposite direction that invalidates rsi falling/rising
rsi_low = input(30, title="Low RSI") // RSI considered low
rsi_hi = input(60, title="High RSI") // RSI considered high
rsi_ht_hi = input(45, title="High higher time frame RSI") // RSI in higher time frame considered high


/// buy trigger duration 
tr_dur = input(8, title="Trigger duration")
low_dur = input(20, title="Monitoring last low")


///////////////// Higher time frame trend ///////////////////
// higher time frame resolution
res2 = input.timeframe("W", title="Higher time-frame")
// Input for the ticker symbol, default is an empty string
// For instance we could monitor BTC higher time frame trend
symbol = input("BTC_USDT:swap", "Input Ticker (leave empty for current)")

// Determine the symbol to use
inputSymbol = symbol == "" ? syminfo.tickerid : symbol
//////////////////////////////////////////////////////////

// Calculate RSI //
rsi = ta.rsi(close, rsiLength)

// Calculate Stochastic RSI //
rsiLowest = ta.lowest(rsi, stochLength)
rsiHighest = ta.highest(rsi, stochLength)
stochRsi = 100 * (rsi - rsiLowest) / (rsiHighest - rsiLowest)

// Apply smoothing
K = ta.sma(stochRsi, kSmooth)
D = ta.sma(K, dSmooth)

// Higher time Frame RSI
cl2 = request.security(inputSymbol, res2, close)
rsi2 = ta.rsi(cl2, 14)

// SRSI BUY/SELL signals 
sell_stoch = (ta.lowest(K, tr_dur) < st_low) or (ta.highest(rsi, tr_dur) < rsi_low)
buy_stoch = ((ta.lowest(K, tr_dur) > st_hi) or (ta.lowest(rsi, tr_dur) > rsi_hi)) and (rsi2 > rsi_ht_hi)

 // valitation / invalidation sell signal
ll = ta.barssince(not sell_stoch)+1
sell_validation = (ta.highest(rsi, ll)>rsi[ll]+diff and rsi < rsi[ll]) or (rsi < rsi[ll]-diff)

// valitation / invalidation buy signal
llb = ta.barssince(not buy_stoch)+1
buy_validation = (ta.lowest(rsi, llb)<rsi[llb]-diff and rsi > rsi[llb]) or (rsi > rsi_hi and rsi - rsi[tr_dur] > 0)

sell_signal = sell_stoch and sell_validation
buy_signal = buy_stoch and buy_validation 

// Define the start date for the strategy
startYear = input(2019, "Start Year")
startMonth = input(1, "Start Month")
startDay = input(1, "Start Day")

// Convert the start date to Unix time
startTime = timestamp(startYear, startMonth, startDay, 00, 00)

// Define the end date for the strategy
endYear = input(2030, "End Year")
endMonth = input(1, "End Month")
endDay = input(1, "End Day")

// Convert the end date to Unix time
endTime = timestamp(endYear, endMonth, endDay, 00, 00)


if true
    if buy_signal
        strategy.entry("buy", strategy.long, comment = "Buy")
    if sell_signal
        strategy.close("buy", "Sell")
```

> Detail

https://www.fmz.com/strategy/442014

> Last Modified

2024-02-18 16:13:50
