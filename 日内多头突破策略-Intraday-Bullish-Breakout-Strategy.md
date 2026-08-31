
> Name

日内多头突破策略-Intraday-Bullish-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13d8ce7d4da5c38b589.png)


#### Overview
This strategy is an intraday bullish trading strategy based on technical indicators. It mainly uses three technical indicators to determine the timing of long entries: 1. Swing low 2. Bullish candlestick pattern 3. Extreme oversold. At the same time, it uses the ATR (Average True Range) indicator to calculate stop-loss and take-profit prices. This strategy is applicable to all timeframes and all underlying assets.

#### Strategy Principles
The strategy is mainly based on the following principles:
1. In an uptrend, stock prices often retrace and form local lows, which are often good buying opportunities. The strategy uses swing lows to capture these buying opportunities.
2. Some special candlestick patterns often signal trend reversals or continuations. The strategy uses the bullish three-line strike pattern to determine reversal buying points.
3. After consecutive days of decline, the bearish momentum gradually weakens, and the room for further decline is limited. The stock price may rebound at any time. The strategy uses the extreme oversold indicator to capture these reversal buying opportunities.
4. Stock price fluctuations have periodicity and similarity, which can be measured by the ATR indicator and used to calculate appropriate stop-loss and take-profit distances.

#### Strategy Advantages
1. Combining three classic technical indicators to form a rigorous quantitative trading system, avoiding the drawbacks of subjectivity.
2. The stop-loss and take-profit levels are based on the ATR volatility indicator, which can be objectively quantified, avoiding the drawbacks of subjectivity. At the same time, the stop-loss and target prices match the market volatility, effectively controlling risks and locking in profits.
3. Wide range of applications, with no restrictions on timeframes or underlying assets, allowing for full utilization of advantages to gain profits.

#### Strategy Risks
1. High accuracy in judging unilateral uptrends, but frequent entries in a volatile market may lead to increased losses.
2. The take-profit level is too far, resulting in slow profit-taking and low capital utilization.
3. The extreme oversold indicator has limited ability to judge reversals and may fail in trending markets.

#### Strategy Optimization Directions
1. Consider adding trend indicators, such as MA and MACD, to determine the overall trend direction. Use this strategy in uptrends and suspend it in downtrends.
2. Consider optimizing the algorithm to find the optimal parameters, especially the selection of ATR multipliers. The take-profit multiplier can be smaller to speed up profit-taking.
3. The extreme oversold indicator can be optimized, such as changing it to more mature oversold indicators like KDJ or RSI.

#### Summary
This intraday bullish breakout strategy is a quantitative trading strategy based on swing lows, bullish patterns, and oversold reversals. It uses three technical indicators to capture long entry points from different angles. At the same time, it uses the ATR volatility indicator to calculate dynamic stop-loss and take-profit levels. It can fully capture profits in uptrends but faces the risk of frequent trading in volatile markets. The strategy still has room for optimization, such as introducing trend judgments, optimizing parameters and indicators, to further improve the strategy's performance.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|Use Entry Condition - Strategy 1|
|v_input_float_1|2|ATR Multiplier for Stop Loss|
|v_input_float_2|4|ATR Multiplier for Target Price|
|v_input_int_1|14|ATR Length|


> Source (PineScript)

``` pinescript
// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © LuxTradeVenture

//@version=5
strategy("Intraday Bullish Script", overlay=true, margin_long=100, margin_short=100)



// Settings for Strategy 1
entryCondition1 = input.bool(true, title="Use Entry Condition - Strategy 1")

// Input for ATR multiplier for stop loss 
atrMultiplierforstoploss = input.float(2, title="ATR Multiplier for Stop Loss")

// Input for ATR multiplier for target price
atrMultiplierforlongs = input.float(4, title="ATR Multiplier for Target Price")

// Calculate ATR
atrLength = input.int(14, title="ATR Length")
atrValue = ta.atr(atrLength)

// Swing low condition - Strategy 1
swingLow1 = low == ta.lowest(low, 12) or low[1] == ta.lowest(low, 12)


/// 
maj_qual = 6  //input(6)
maj_len = 30  //input(30)
min_qual = 5  //input(5)
min_len = 5  //input(5)

lele(qual, len) =>
    bindex = 0.0
    bindex := nz(bindex[1], 0)
    sindex = 0.0
    sindex := nz(sindex[1], 0)
    ret = 0
    if close > close[4]
        bindex := bindex + 1
        bindex
    if close < close[4]
        sindex := sindex + 1
        sindex
    if bindex > qual and close < open and high >= ta.highest(high, len)
        bindex := 0
        ret := -1
        ret
    if sindex > qual and close > open and low <= ta.lowest(low, len)
        sindex := 0
        ret := 1
        
major = lele(maj_qual, maj_len)
minor = lele(min_qual, min_len)

ExaustionLow  = major ==  1 ? 1 : 0

Bullish3LineStrike = close[3] < open[3] and close[2] < open[2] and close[1] < open[1] and close > open[1]

// Entry and Exit Logic for Strategy 2
// Create variables to track trade directions and entry prices for each strategy
var int tradeDirection1 = na

var float entryLongPrice1 = na


// Calculate entry prices for long positions - Strategy 1
if (swingLow1 or Bullish3LineStrike)
    entryLongPrice1 := close
    tradeDirection1 := 1



// Calculate target prices for long positions based on ATR - Strategy 1
targetLongPrice1 = entryLongPrice1 + (atrMultiplierforlongs * atrValue)



// Calculate stop loss prices for long positions based on entry - Strategy 1
stopLossLongPrice1 = entryLongPrice1 - (atrMultiplierforstoploss * atrValue)


// Entry conditions for Strategy 1
if (tradeDirection1 == 1 and (swingLow1 or Bullish3LineStrike))
    strategy.entry("Long - Strategy 1", strategy.long)


// Exit conditions for long positions: When price reaches or exceeds the target - Strategy 1
if (close >= targetLongPrice1)
    strategy.close("Long - Strategy 1", comment="Take Profit Hit")

// Exit conditions for long positions: When price hits stop loss - Strategy 1
if (close <= stopLossLongPrice1)
    strategy.close("Long - Strategy 1", comment="Stop Loss Hit")
```

> Detail

https://www.fmz.com/strategy/446552

> Last Modified

2024-03-29 16:13:30
