
> Name

力道K线突破策略Choppiness-K-line-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

力道K线突破策略是一种利用K线形态以及力道指标实现股票买入卖出的量化交易策略。该策略结合多种技术指标识别股价趋势和力道信号,在突破点进行建仓,设置止损止盈退出,可有效控制交易风险。

## 策略原理

力道K线突破策略主要基于以下几个要点:

1. 使用商品通道指数(CCI)判断股价是否处于超买超卖区域。当CCI上穿100时视为超买信号,当CCI下穿-100时视为超卖信号。 

2. 判断K线形态,识别出突破信号。当出现收盘价高于开盘价的红色K线时判断为上涨趋势,出现收盘价低于开盘价的绿色K线则判断为下跌趋势。

3. 结合成交量指标,只有在成交量放大的情况下才考虑发出买入和卖出信号。

4. 当识别到上涨趋势且CCI指标显示超卖时,进行买入操作。当识别到下跌趋势且CCI指标显示超买时,进行卖出操作。

5. 设置止损止盈点。买入后设置一定比例的止损点以控制下行风险,同时也设置一定比例的止盈点以锁定盈利。

具体来说,该策略使用CCI指标判断超买超卖,K线形态判断趋势方向,volume指标判断力道。在符合条件时,进行 longing(买入开多头)或 shorting(卖出开空头)的操作。通过止损止盈来控制风险和锁定利润。

## 优势分析

力道K线突破策略具有以下优势:

1. 结合多种指标进行决策,使交易信号更可靠。CCI指标能确定买卖点,K线则判断趋势方向,volume则反映市场力道。

2. 利用 K线形态辅助判断趋势方向,可以更准确地抓住价格反转机会。例如红色K线结合CCI超卖就是买入时机。

3. 设置止损止盈机制可以有效控制风险,防止亏损扩大,并可以锁定盈利。

4. 只在成交量放大时考虑交易信号,可以过滤掉虚假信号。

5. 策略思路清晰易懂,参数设置灵活,可针对不同股票和市场环境进行优化。

6. 可对策略进行扩展优化,例如加入更多因子、机器学习等,提高策略的稳定性和收益率。

## 风险分析

力道K线突破策略也存在以下风险:

1. CCI指标发出的买卖信号可能出现滞后,导致错过最佳入场点位。可以适当优化CCI的参数以提高灵敏度。

2. K线形态判断的假突破信号可能造成不必要的损失。可以加入更多指标进行确认,或者调整止损比例。 

3. 成交量放大也可能反映出市场操控,需要关注价量之间的关系,防止踩进陷阱。

4. 静态的止损止盈设置可能会过早止损或者漏掉更大的行情。可以考虑动态调整止损止盈比例。

5. 针对个股设置的参数不一定适用于其他股票,需要根据不同股票特点进行测试优化。

6. 长期回测数据不一定代表实盘表现,实盘中需要关注操盘风险。

## 优化方向

该策略可以考虑从以下方面进行优化:

1. 对CCI参数进行优化,提高CCI指标对买卖点位的判断灵敏度。

2. 增加其他辅助指标,例如MACD,Bollinger Band等,提高买卖信号的准确性。

3. 加入机器学习算法,使用历史数据训练,对买卖点进行预测。

4. 采用动态止损止盈方式,根据市场波动程度调整止损止盈比例。

5. 优化成交量放大的判断逻辑,防止量价背离。

6. 根据不同股票特点和市场环境,优化参数设置,提高策略稳定性。

7. 添加趋势跟踪机制,优化策略在不同阶段的表现。

8. 改进策略结构,引入模块化管理,提高代码灵活性和可扩展性。

## 总结

力道K线突破策略整体来说是一种相对简单明确的短线交易策略。它结合了多种常用技术指标的优势,判断逻辑清晰易懂,通过止损止盈控制风险。该策略可根据自身需要进行灵活优化,用于捕捉短线价格反转点,追踪中期趋势。但也需要注意防范指标滞后和假突破的风险。如果系统性优化和严格的资金管理,该策略可以成为量化交易的基础策略之一。

|| 

## Overview

The Choppiness K-line Breakthrough Strategy is a quantitative trading strategy that utilizes K-line patterns and momentum indicators to determine entries and exits for stock trading. This strategy combines multiple technical indicators to identify price trends and momentum signals, taking positions at breakthrough points and setting stop loss and take profit to effectively control trading risks.

## Strategy Logic

The core concepts of the Choppiness K-line Breakthrough Strategy are:

1. Using the Commodity Channel Index (CCI) to determine if prices are in overbought or oversold zones. CCI crossing above 100 is considered an overbought signal, while crossing below -100 aoversold signal.

2. Identifying K-line patterns to detect breakthrough signals. A red K-line with a close higher than open indicates an uptrend, while a green K-line closing lower than open shows a downtrend.

3. Incorporating trading volume to only consider buy and sell signals when volume is surging. 

4. Taking long positions when an uptrend is identified and CCI shows oversold. Taking short positions when a downtrend is identified and CCI shows overbought.

5. Setting stop loss and take profit points to control risks and lock in profits.

Specifically, the strategy uses CCI for overbought/oversold analysis, K-line patterns for trend direction, and volume for momentum. It enters long or short positions when criteria are met. Stop loss and take profit are used to manage risks and gains.

## Advantage Analysis 

The Choppiness K-line Breakthrough Strategy has the following advantages:

1. Combining multiple indicators improves reliability of trading signals. CCI identifies trading zones, K-line determines trend direction, and volume reflects market momentum.

2. Utilizing K-line patterns helps accurately identify trend reversals. For example, red K-line with CCI oversold presents buying opportunity.

3. Stop loss and take profit effectively controls risks and locks in profits.

4. Only considering signals on surging volume avoids false signals.

5. The strategy logic is clear and parameters are flexible for optimization across stocks and market environments.

6. The strategy can be further improved via more factors, machine learning etc, enhancing stability and profitability.

## Risk Analysis

The potential risks of the strategy include:

1. CCI signals may lag, causing missed optimal entry points. CCI parameters can be tuned for higher sensitivity.

2. Fake breakouts in K-line patterns may cause unnecessary losses. More indicators could be added for confirmation, or stop loss percentage adjusted.

3. Surges in volume could also be manipulated, so it's important to watch for volume-price divergence. 

4. Static stop loss/take profit may exit early or miss further trends. Consider dynamic adjustments.

5. Parameters fitted for a stock may not suit others. Specific tuning is needed.

6. Backtest results may not represent live performance. Watch for execution risks.

## Optimization Directions

The strategy can be enhanced via:

1. Optimizing CCI parameters for faster signal generation.

2. Adding more indicators like MACD, Bollinger Bands to improve signal accuracy.

3. Using machine learning models trained on historical data to predict entry/exit points.

4. Employing dynamic stop loss and take profit based on market volatility. 

5. Improving volume surge logic to detect volume-price divergence.

6. Tuning parameters for different stocks and market regimes to improve stability. 

7. Incorporating trend following mechanisms for better performance across market stages.

8. Modularizing the strategy for more flexibility and extensibility.

## Conclusion

The Choppiness K-line Breakthrough Strategy is a relatively straight-forward short-term trading strategy. It combines common technical indicators for clear logic and risk control via stop loss and take profit. The strategy can be flexibly optimized based on needs to capture short-term reversals and medium-term trends. But risks including indicator lag and false breakouts should be managed. With robust optimization and risk management, it can form a fundamental quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0915-1455|Market session|
|v_input_2|5|Long Take Profit (%)|
|v_input_3|5|Short Take Profit (%)|
|v_input_4|5|Long Stop Loss (%)|
|v_input_5|5|Short Stop Loss (%)|
|v_input_6|50|Trend Factor(Lower means trending)|
|v_input_7|25|Oversold|
|v_input_8|75|Overbought|
|v_input_9|14|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © vikris

//@version=4
strategy("[VJ]War Machine PAT Intra", overlay=true, calc_on_every_tick = false)

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
     type=input.float, minval=0.0, step=0.1, defval=5.0) * 0.01

shortProfitPerc = input(title="Short Take Profit (%)",
     type=input.float, minval=0.0, step=0.1, defval=5.0) * 0.01
     
// Set stop loss level with input options (optional)
longLossPerc = input(title="Long Stop Loss (%)",
     type=input.float, minval=0.0, step=0.1, defval=5.0) * 0.01

shortLossPerc = input(title="Short Stop Loss (%)",
     type=input.float, minval=0.0, step=0.1, defval=5.0) * 0.01    

trendFactor = input(title="Trend Factor(Lower means trending)", type=input.integer, minval=1, step=1, defval=50)

oversold = input(title="Oversold", type=input.integer, minval=1, step=1, defval=25)

overbought = input(title="Overbought", type=input.integer, minval=1, step=1, defval=75)

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
//Vol Confirmation
vol = volume > volume[1]

//Engulfing candle confirm
bullishEC = close > open[1] and close[1] < open[1]
bearishEC = close < open[1] and close[1] > open[1]

//Candles colors
greenCandle = (close > open)
redCandle = (close < open)

length = input(title="Length", type=input.integer, defval=14, minval=1, maxval=2000)
src = hlc3
upper = sum(volume * (change(src) <= 0 ? 0 : src), length)
lower = sum(volume * (change(src) >= 0 ? 0 : src), length)
_rsi(upper, lower) =>
    100.0 - (100.0 / (1.0 + upper / lower))
mf = _rsi(upper, lower)
ci = 100 * log10(sum(atr(1), length) / (highest(length) - lowest(length))) / log10(length)

//tradeSignal = ((rsiOS or rsiOS[1]) and bullishEC) or ((rsiOB or rsiOB[1]) and bearishEC)




//Final Long/Short Condition
longCondition =  redCandle and mf < oversold and ci <trendFactor and vol
shortCondition = greenCandle and mf >overbought and ci <trendFactor and vol
 
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

https://www.fmz.com/strategy/428621

> Last Modified

2023-10-07 15:59:26
