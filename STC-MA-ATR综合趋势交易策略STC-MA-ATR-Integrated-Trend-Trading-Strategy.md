
> Name

STC-MA-ATR综合趋势交易策略STC-MA-ATR-Integrated-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/550f6d2fc5464ca01e.png)

[trans]

## 概述

该策略综合运用了股票技术指标STC、移动平均线MA和平均真实波动率ATR,结合多种技术指标判断趋势,实现了较为稳定的趋势追踪交易。

## 策略原理

1. STC指标判断趋势反转。该指标利用快线减慢线,再进行二次平滑处理,形成一致的趋势信号。当指标上穿0轴时为买入信号,下穿0轴时为卖出信号。

2. 移动平均线MA判断趋势方向。股票价格上穿MA时,视为仍在上涨行情中,为持有多单信号。价格下穿MA时,视为下跌行情,为持有空单信号。

3. ATR指标设定止损止盈。ATR可根据市场波动率,动态调整止损止盈点位。并以ATR作为交易方向信号,多头阶段ATR上涨,空头阶段ATR下跌。

4. 策略以STC判断反转为主要买卖点选取时机,以MA作为辅助判断趋势,用ATR进行止损止盈。当STC发出买入信号,如果MA也为上涨趋势,ATR为上升,则开多单;如果STC发出卖出信号,如果MA 为下跌趋势,ATR为下降,则开空单。

## 优势分析

1. 该策略综合运用多种指标判断趋势和反转点,提高了交易信号的准确性。

2. STC指标可捕捉反转信号,避免交易被套。MA指标过滤不稳定的反转信号,确保��随主要趋势。

3. ATR指标可根据市场波动率设定止损止盈位,回避巨大亏损。并利用ATR作为辅助判断趋势的信号。

4. 多指标组合,可形成较强的趋势追踪能力,历史回测具有较好的稳定盈利能力。

## 风险分析

1. STC指标存在时间滞后,可能错过价格反转的最佳时点。

2. MA指标在价格剧烈变动时,其位置倾向滞后,可能产生错误信号。

3. ATR止损可能被秒出,应适当放宽ATR倍数,或在大趋势中暂时关闭。

4. 多指标组合虽提高了胜率,但也增多了触发止损的机会,应适当调整参数,降低不必要止损。

## 优化方向

1. 调整STC参数,寻找更快响应反转的参数组合

2. 优化MA周期参数,使其能更好跟踪趋势

3. 测试不同的ATR倍数的参数对策略影响

4. 尝试其他指标替换STC,寻找更好的匹配指标

5. 增加机器学习算法,自动优化多个参数

6. 增加对大周期趋势的判断,区分大周期不同阶段

## 总结

STC MA ATR策略综合运用三种指标捕捉趋势反转点,实现稳定的趋势追踪交易。指标组合过滤假信号,止损止盈控制风险,具有较强的拟合性和稳定性。通过参数优化和算法引入,可以进一步增强策略的表现。该策略整体来看是一个可靠、适中的策略选择。

||

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

[/trans]

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
