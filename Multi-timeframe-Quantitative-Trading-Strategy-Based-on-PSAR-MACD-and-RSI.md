
> Name

Multi-timeframe-Quantitative-Trading-Strategy-Based-on-PSAR-MACD-and-RSI

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1290ef0d517793934f3.png)

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
