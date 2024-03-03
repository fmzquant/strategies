
> Name

基于PSARMACD和RSI的多时间框架量化交易策略Multi-timeframe-Quantitative-Trading-Strategy-Based-on-PSAR-MACD-and-RSI

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1290ef0d517793934f3.png)
[trans]

## 概述

本策略通过组合使用Parabolic SAR(抛物线转向指标)、MACD(指数平滑移动平均线)和RSI(相对强弱指标)三个指标,在多个时间框架内实现自动化的多空头交易。策略主要适用于股票和商品品种的日内交易。

## 策略原理

1. PSAR指标用于判断价格方向和趋势反转点。当点数下落时为多头信号,点数上涨时为空头信号。

2. MACD指标判断价格动量。MACD线与SIGNAL线向上突破为多头信号,向下突破为空头信号。

3. RSI指标判断超买超卖现象。RSI高于阈值时为多头信号,低于阈值时为空头信号。 

4. 综合以上三个指标的信号,形成最终的多空头决策。

5. 自适应使用Chop Index指标过滤掉 consolidating 市场,避免 whipsaws。

6. 采用反向金字塔加仓原理,通过设定止损位和止盈位实现风险和盈利的动态管理。

## 策略优势

1. 多指标组合,综合判断趋势、动量和超买超卖特征,提高决策的准确性。

2. 自适应市场特征,通过Chop Index指标过滤 consolidating 的市场,避免被套。

3. 风险和盈利动态管理,通过反向金字塔加仓原理,实现主动止损止盈。

4. 可自定义和优化的参数较多,容易针对不同品种和市场环境进行调整。

5. 支持多个时间框架,可以灵活运用于日内短线和中长线交易。

## 风险分析

1. 多空头决策依赖参数设定,不恰当的设定可能导致失误。

2. 指标发出错误信号的概率存在,可能形成违背趋势的决策。

3. 止损止盈设置不当,可能增加亏损或减少盈利。

4. 需要频繁监控和调整参数,较大的人工干预成本。

## 优化方向

1. 增加模型校验模块,评估参数设置和信号的有效性。

2. 增加machine learning模块,实现参数和模型的自动优化。

3. 接入更多数据源,丰富特征空间,提升决策效果。 

4. 开发自动化监控和运维系统,降低人工干预成本。

5. 增加回测和仿真评估,检验策略有效性。

## 总结

本策略通过运用多种技术指标的组合,实现了基于规则的自动化量化交易。策略优化空间较大,可扩展性强,适合进行参数调整、功能扩充和机器学习等优化,将更好地服务于实盘交易。

||

## Overview

This strategy combines the Parabolic SAR, MACD and RSI indicators to implement automated long and short trading across multiple timeframes. It is mainly suitable for intraday trading of stocks and commodity products.

## Strategy Principle 

1. PSAR indicator is used to determine price direction and trend reversal points. Falling dots are bullish signals while rising dots are bearish signals.

2. MACD indicator judges price momentum. MACD line crossing above SIGNAL line upwards is bullish signal while crossing downwards is bearish.

3. RSI indicator judges overbought and oversold conditions. RSI above threshold is bullish while below is bearish.

4. Combine signals from the above three indicators to form final long/short decision.

5. Adaptively use Chop Index indicator to filter out consolidating markets to avoid whipsaws.

6. Use reverse pyramiding position sizing to dynamically manage risk and profit targets.

## Advantages

1. Combination of multiple indicators judging trend, momentum and oscillators improves accuracy. 

2. Adaptive to market conditions by filtering consolidating markets to prevent getting caught in traps.

3. Dynamic risk and profit management via reverse pyramiding position sizing with adaptive stops and limits.

4. Highly customizable with tunable parameters for different products and market environments.

5. Support multiple timeframes, flexible for short-term intraday or mid/long-term positional trades.


## Risk Analysis

1. Long/short decisions depend on parameter settings which may cause mistakes if inappropriate.

2. Possibility of false signals leading to decisions against the trend.

3. Inappropriate stop loss and take profit settings may increase losses or reduce profits.

4. Requires frequent monitoring and parameter tweaking resulting in high human intervention costs.

## Optimization Directions

1. Add model validation module to evaluate parameter settings and signal efficacy. 

2. Increase machine learning module for automatic parameter and model optimization.

3. Ingest more data sources to enrich feature space and improve decisions.

4. Develop automated monitoring and maintenance systems to reduce human intervention.

5. Add backtesting and simulation evaluations to validate strategy performance.

## Conclusion

This strategy realizes automated quantitative trading by combining multiple technical indicators rule-based system. With large optimization space and flexibility, it is suitable for parameter tuning, feature expansion and machine learning enhancements to better serve live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0915-1455|Market session|
|v_input_2|3|Long Take Profit (%)|
|v_input_3|3|Short Take Profit (%)|
|v_input_4|3|Long Stop Loss (%)|
|v_input_5|3|Short Stop Loss (%)|
|v_input_6|50|MA Length|
|v_input_7|12|MACD Fast EMA Length|
|v_input_8|26|MACD Slow EMA Length|
|v_input_9|7|RSI Length|
|v_input_10|50|RSI Threshold|
|v_input_11|7|Chop Index lenght|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-20 00:00:00
end: 2023-12-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © vikris

//@version=4
strategy("[VJ]Phoenix Force of PSAR +MACD +RSI", overlay=true, calc_on_every_tick = false,pyramiding=0)

// ********** Strategy inputs - Start **********

// Used for intraday handling
// Session value should be from market start to the time you want to square-off 
// your intraday strategy
// Important: The end time should be at least 2 minutes before the intraday
// square-off time set by your broker
var i_marketSession = input(title="Market session", type=input.session, 
     defval="0915-1455", confirm=true)

// Make inputs that set the take profit % (optional)
longProfitPerc = input(title="Long Take Profit (%)",
     type=input.float, minval=0.0, step=0.1, defval=3) * 0.01

shortProfitPerc = input(title="Short Take Profit (%)",
     type=input.float, minval=0.0, step=0.1, defval=3) * 0.01
     
// Set stop loss level with input options (optional)
longLossPerc = input(title="Long Stop Loss (%)",
     type=input.float, minval=0.0, step=0.1, defval=3) * 0.01

shortLossPerc = input(title="Short Stop Loss (%)",
     type=input.float, minval=0.0, step=0.1, defval=3) * 0.01    


// ********** Strategy inputs - End **********


// ********** Supporting functions - Start **********

// A function to check whether the bar or period is in intraday session
barInSession(sess) => time(timeframe.period, sess) != 0



// Figure out take profit price
longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortExitPrice = strategy.position_avg_price * (1 - shortProfitPerc)

// Determine stop loss price
longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)


// ********** Supporting functions - End **********


// ********** Strategy - Start **********
// See if intraday session is active
bool intradaySession = barInSession(i_marketSession)

// Trade only if intraday session is active

//=================Strategy logic goes in here===========================
 
psar = sar(0.02,0.02,0.2)
c1a = close > psar
c1v = close < psar

malen = input(50, title="MA Length")
mm200 = sma(close, malen)
c2a = close > mm200
c2v = close < mm200

fast = input(12, title="MACD Fast EMA Length")
slow = input(26, title="MACD Slow EMA Length")
[macd,signal,hist] = macd(close, fast,slow, 9)
c3a = macd >= 0
c3v = macd <= 0

rsilen = input(7, title="RSI Length")
th = input(50, title="RSI Threshold")
rsi14 = rsi(close, rsilen)
c4a = rsi14 >= th
c4v = rsi14 <= th

chopi = input(7, title="Chop Index lenght")
ci = 100 * log10(sum(atr(1), chopi) / (highest(chopi) - lowest(chopi))) / log10(chopi)

buy = c1a and c2a and c3a and c4a ? 1 : 0
sell = c1v and c2v and c3v and c4v ? -1 : 0


//Final Long/Short Condition
longCondition = buy==1 and ci <50
shortCondition = sell==-1 and ci <50 
 
//Long Strategy - buy condition and exits with Take profit and SL
if (longCondition and intradaySession)
    stop_level = longStopPrice
    profit_level = longExitPrice
    strategy.entry("My Long Entry Id", strategy.long)
    strategy.exit("TP/SL", "My Long Entry Id", stop=stop_level, limit=profit_level)


//Short Strategy - sell condition and exits with Take profit and SL
if (shortCondition and intradaySession)
    stop_level = shortStopPrice
    profit_level = shortExitPrice
    strategy.entry("My Short Entry Id", strategy.short)
    strategy.exit("TP/SL", "My Short Entry Id", stop=stop_level, limit=profit_level)
 
 
// Square-off position (when session is over and position is open)
squareOff = (not intradaySession) and (strategy.position_size != 0)
strategy.close_all(when = squareOff, comment = "Square-off")

// ********** Strategy - End **********
```

> Detail

https://www.fmz.com/strategy/436776

> Last Modified

2023-12-27 16:12:57
