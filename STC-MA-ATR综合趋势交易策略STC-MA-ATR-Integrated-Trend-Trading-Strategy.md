
> Name

STC-MA-ATR综合趋势交易策略STC-MA-ATR-Integrated-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/550f6d2fc5464ca01e.png)


## Overview

This strategy combines the technical indicators STC, Moving Average MA and Average True Range ATR to judge trends and implement relatively stable trend tracking trading. 

## Strategy Principle 

1. STC indicator judges trend reversal. It utilizes the fast line minus the slow line, then processes secondary smoothing, forming consistent trend signals. The buying signal comes when the indicator crosses above 0 axis, and the selling signal below 0 axis.

2. Moving Average MA judges trend direction. When stock price crosses above MA, it signals an uptrend, giving a long position holding signal. When price crosses below MA, it signals a downtrend, giving a short position holding signal.

3. ATR indicator sets stop loss and take profit. ATR can dynamically adjust stop loss and take profit points based on market volatility. And ATR acts as a signal for trading direction itself, rising in uptrend and falling in downtrend.

4. The strategy takes STC signals as the main timing for entry, uses MA as auxiliary trend judgment, and ATR for stop loss and take profit. When STC gives a buy signal, if MA also shows uptrend and ATR rises, it opens long position; when STC gives a sell signal, if MA shows downtrend and ATR falls, it opens short position.

## Advantage Analysis

1. The strategy combines multiple indicators to judge trends and reversal points, improving the accuracy of trading signals.

2. STC can capture reversal signals and avoid being trapped in trends. MA filters uncertain reversal signals to ensure following the main trend.

3. ATR sets dynamic stop loss and take profit based on market volatility, avoiding huge losses. And ATR acts as an auxiliary signal for trend judgment.

4. The combination of multiple indicators forms strong trend tracking ability. Historical backtests show relatively stable profitability.

## Risk Analysis

1. STC has time lag, which may miss the optimal timing for price reversal.

2. MA tends to lag during violent price swings, which may generate wrong signals.

3. ATR stop loss may be hit in seconds. The ATR multiplier should be loosened, or temporarily disabled during big trends.

4. More indicators means more chances of hitting stop loss. Parameters should be adjusted to avoid unnecessary stop loss.

## Optimization Directions

1. Adjust STC parameters to find faster responsive combinations for reversal.

2. Optimize MA period parameter for better trend tracking. 

3. Test impacts of different ATR multiples.

4. Try replacing STC with other indicators for better match.

5. Introduce machine learning algorithms for multi-parameter auto optimization. 

6. Consider large cycle trends and distinguish different stages.

## Summary

The STC MA ATR strategy combines 3 indicators to capture trend reversal points for stable trend tracking trading. Indicator combos filter false signals and control risks with stop loss/take profit. It has strong robustness and stability. Further improvements can be achieved through parameter optimization and algorithm introduction. Overall it is a reliable and moderate strategy choice.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_9|true|Close position when ATR changes color|
|v_input_1|12|(?STC)Length|
|v_input_2|26|FastLength|
|v_input_3|50|SlowLength|
|v_input_4|5|(?ATR Stops)nATRPeriod|
|v_input_5|3.5|nATRMultip|
|v_input_6|200|(?Moving Average)MA Length|
|v_input_7|2|(?Strategy)Take Profit ATR Multiplier|
|v_input_8|true|Stop Loss ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-16 00:00:00
end: 2023-10-16 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Romedius

//@version=5
strategy("My Strategy", overlay=true, margin_long=100, margin_short=100)

// STC
EEEEEE=input(12,"Length",group="STC")
BBBB=input(26,"FastLength",group="STC")
BBBBB=input(50,"SlowLength",group="STC")

AAAA(BBB, BBBB, BBBBB) =>
    fastMA = ta.ema(BBB, BBBB)
    slowMA = ta.ema(BBB, BBBBB)
    AAAA = fastMA - slowMA
    AAAA
    
AAAAA(EEEEEE, BBBB, BBBBB) => 
    //AAA=input(0.5)
    var AAA = 0.5
    var CCCCC = 0.0
    var DDD = 0.0
    var DDDDDD = 0.0
    var EEEEE = 0.0
    BBBBBB = AAAA(close,BBBB,BBBBB)     
    CCC = ta.lowest(BBBBBB, EEEEEE)
    CCCC = ta.highest(BBBBBB, EEEEEE) - CCC    
    CCCCC := (CCCC > 0 ? ((BBBBBB - CCC) / CCCC) * 100 : nz(CCCCC[1])) 
    DDD := (na(DDD[1]) ? CCCCC : DDD[1] + (AAA * (CCCCC - DDD[1]))) 
    DDDD = ta.lowest(DDD, EEEEEE) 
    DDDDD = ta.highest(DDD, EEEEEE) - DDDD     
    DDDDDD := (DDDDD > 0 ? ((DDD - DDDD) / DDDDD) * 100 : nz(DDDDDD[1])) 
    EEEEE := (na(EEEEE[1]) ? DDDDDD : EEEEE[1] + (AAA * (DDDDDD - EEEEE[1])))
    EEEEE

mAAAAA = AAAAA(EEEEEE,BBBB,BBBBB)
stc = mAAAAA > mAAAAA[1] ? true : false
stc_sig = stc == true and stc[1] == false ? 1 : stc == false and stc[1] == true ? -1 : 0
stc_long = stc_sig == 1
stc_short = stc_sig == -1
// STC end

// ATR stops
nATRPeriod = input(5,group="ATR Stops")
nATRMultip = input(3.5,group="ATR Stops")

xATR = ta.atr(nATRPeriod)
nLoss = nATRMultip * xATR

xATRTrailingStop = 0.0
xATRTrailingStop := close > nz(xATRTrailingStop[1], 0) and close[1] > nz(xATRTrailingStop[1], 0) ? math.max(nz(xATRTrailingStop[1]), close - nLoss) : close < nz(xATRTrailingStop[1], 0) and close[1] < nz(xATRTrailingStop[1], 0) ? math.min(nz(xATRTrailingStop[1]), close + nLoss) : close > nz(xATRTrailingStop[1], 0) ? close - nLoss : close + nLoss

pos = 0
pos := close[1] < nz(xATRTrailingStop[1], 0) and close > nz(xATRTrailingStop[1], 0) ? 1 : close[1] > nz(xATRTrailingStop[1], 0) and close < nz(xATRTrailingStop[1], 0) ? -1 : nz(pos[1], 0)

atr_sig = pos == -1 ? false : true
// ATR stops end

// ma
ma_len = input(200, title="MA Length", group="Moving Average")
ma = ta.sma(close, 200)
ma_sig = close < ma ? false : true
// ma end

// strategy entries
tp_mult = input(2, title="Take Profit ATR Multiplier", group="Strategy")
sl_mult = input(1, title="Stop Loss ATR Multiplier", group="Strategy")
early_stop = input(true, title="Close position when ATR changes color")

atr_stop = if close < xATRTrailingStop
    close - (close - xATRTrailingStop) * sl_mult
else
    close + (xATRTrailingStop - close) * sl_mult

longCondition = atr_sig == true and stc_sig == 1 and ma_sig == true
shortCondition = atr_sig == false and stc_sig == -1 and ma_sig == false

if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", "Long", limit=close + xATR * tp_mult, stop=atr_stop)
else if atr_sig == false and early_stop
    strategy.close("Long")

if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Exit Short", "Short", limit=close - xATR * tp_mult, stop=atr_stop)
else if atr_sig == true and early_stop
    strategy.close("Short")
    
// plot stuff
atr_color = pos == -1 ? color.red: pos == 1 ? color.green : color.blue
plot(atr_stop, title="ATR Stop", color=atr_color)

ma_color = ma_sig ? color.green : color.red
plot(ma, title="Moving Average", color=ma_color)

stc_color = stc_long ? color.green : color.red
plotshape(stc_long, style=shape.triangleup, color=stc_color, title="STC Long Signal", size=size.tiny)
plotshape(stc_short, style=shape.triangledown, color=stc_color, title="STC Short Signal", size=size.tiny)
// plot stuff end
```

> Detail

https://www.fmz.com/strategy/429472

> Last Modified

2023-10-17 14:34:10
