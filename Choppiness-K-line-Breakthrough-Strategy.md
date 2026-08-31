
> Name

Choppiness-K-line-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description


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
