
> Name

融合多重止损的趋势追踪型Intraday策略Intraday-Trend-Following-Strategy-with-Multiple-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/170f43cae2d1f660954.png)
[trans]

## 概述

该策略融合了多重ATR动态止损和改进型Renko砖块,旨在捕捉Intraday的趋势行情。它结合了趋势指标和砖块指标,实现了多时间框架分析,可以有效识别趋势方向并及时止损。

## 策略原理

该策略的核心在于多重ATR止损机制。它设置了3组ATR动态止损,参数分别为5倍ATR、10倍ATR和15倍ATR。当价格跌破这3组止损线时,说明趋势发生转变,此时平仓。这种多重止损设定,可以有效过滤掉短期波动带来的虚假信号。 

另一核心部分是改进型Renko砖块。该砖块根据ATR值划分增量,并结合SMA指标判断趋势方向。它比普通Renko砖块更敏感,可以更早确认趋势变化。当砖块颜色发生改变时,表示趋势转变,可作为止损信号。

入场条件为当价格突破3组ATR止损向上时做多,当价格跌破3组ATR止损向下时做空。出场条件为价格触发任一组ATR止损或Renko砖块颜色发生变化时平仓。

## 策略优势

- 多重ATR止损,有效控制风险
- 改进型Renko砖块,更加敏感,可提前止损
- 结合趋势指标和砖块指标,确保捕捉趋势
- 多时间框架分析,判断趋势方向更可靠 
-  Parameters可调整,适应不同市场环境

## 策略风险及优化

该策略主要风险在于止损被突破造成损失扩大。可通过以下方法优化:

- 调整ATR止损的倍数,在趋势较强的市场可适当放宽;趋势较弱时应适当收紧
- 调整Renko砖块的ATR周期参数,以平衡灵敏度与稳定性
- 增加其他止损指标,如Donchian通道,确保止损更可靠
- 增加过滤器,避免在盘整中频繁交易

## 总结

该策略整体来说适合 Intraday 强势趋势行情,特点是止损设置科学,砖块指标可提前识别趋势转变。通过参数调整可适应不同市场环境,是一款值得实盘验证的趋势追踪策略。

||

## Overview

This strategy incorporates multiple ATR trailing stops and an improved Renko bricks to capture intraday trending moves. It combines trend indicators and brick charts to enable multi-timeframe analysis and identify trend direction for effective stops.

## Strategy Logic

The core of this strategy lies in the multiple ATR stop loss mechanism. It sets 3 groups of ATR stops - 5 ATR, 10 ATR and 15 ATR. When price breaks these 3 stops downward, it indicates a trend reversal, prompting position exit. Such triple stop setting effectively filters out false signals from short-term noises.  

Another key component is the improved Renko bricks. They are partitioned based on ATR values and incorporate SMA to determine trend bias. It is more sensitive than regular Renko bricks in capturing early trend changes. Brick color flip signals stops.

Entry signal triggers when price breaks above 3 ATR stops. Exit when price hits any ATR stop or Renko brick color changes.

## Advantages

- Triple stops effectively control risks
- Improved Renko bricks enable early stops  
- Combining trend and brick charts ensures catching trends
- Multi-timeframe analysis makes trend identification more reliable
- Adjustable parameters suit different market regimes

## Risks and Enhancement

Main risk is stop loss penetration causing extended losses. Can optimize via:

- Adjust ATR stop multiples - relax in strong trends and tighten in weak trends
- Fine-tune Renko brick ATR periods to balance sensitivity and stability 
- Add other stop indicators e.g. Donchian Channel for reliability
- Implement filters to avoid whipsaws during consolidations

## Conclusion

This strategy works well for strong intraday trends. Its scientific stop loss mechanism and early trend change detection by improved Renko bricks are noteworthy. Fine-tuned parameters can adapt it to varying market conditions. Worth live testing as a trend following system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|26|Vstop length|
|v_input_2|26|Vstop length|
|v_input_3|26|Vstop length|
|v_input_4|240|TimeFrame|
|v_input_5|60|ATR length|
|v_input_6|5|SMA length|
|v_input_7|20|SMA CurTF length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-20 00:00:00
end: 2023-12-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Lancelot vstop intraday strategy", overlay=true, currency=currency.NONE, initial_capital = 100, commission_type=strategy.commission.percent, 
     commission_value=0.075, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

///Volatility Stop///
lengtha = input(title="Vstop length", type=input.integer, defval=26, minval=1)
mult1a = 5

atr_a = atr(lengtha)
max1a = 0.0
min1a = 0.0
is_uptrend_preva = false
stopa = 0.0
vstop_preva = 0.0
vstop1a = 0.0
is_uptrenda = false
is_trend_changeda = false
max_a = 0.0
min_a = 0.0
vstopa = 0.0
max1a := max(nz(max_a[1]), ohlc4)
min1a := min(nz(min_a[1]), ohlc4)
is_uptrend_preva := nz(is_uptrenda[1], true)
stopa := is_uptrend_preva ? max1a - mult1a * atr_a : min1a + mult1a * atr_a
vstop_preva := nz(vstopa[1])
vstop1a := is_uptrend_preva ? max(vstop_preva, stopa) : min(vstop_preva, stopa)
is_uptrenda := ohlc4 - vstop1a >= 0
is_trend_changeda := is_uptrenda != is_uptrend_preva
max_a := is_trend_changeda ? ohlc4 : max1a
min_a := is_trend_changeda ? ohlc4 : min1a
vstopa := is_trend_changeda ? is_uptrenda ? max_a - mult1a * atr_a : min_a + mult1a * atr_a : 
   vstop1a

///Volatility Stop///
lengthb = input(title="Vstop length", type=input.integer, defval=26, minval=1)
mult1b = 10

atr_b = atr(lengthb)
max1b = 0.0
min1b = 0.0
is_uptrend_prevb = false
stopb = 0.0
vstop_prevb = 0.0
vstop1b = 0.0
is_uptrendb = false
is_trend_changedb = false
max_b = 0.0
min_b = 0.0
vstopb = 0.0
max1b := max(nz(max_b[1]), ohlc4)
min1b := min(nz(min_b[1]), ohlc4)
is_uptrend_prevb := nz(is_uptrendb[1], true)
stopb := is_uptrend_prevb ? max1b - mult1b * atr_b : min1b + mult1b * atr_b
vstop_prevb := nz(vstopb[1])
vstop1b := is_uptrend_prevb ? max(vstop_prevb, stopb) : min(vstop_prevb, stopb)
is_uptrendb := ohlc4 - vstop1b >= 0
is_trend_changedb := is_uptrendb != is_uptrend_prevb
max_b := is_trend_changedb ? ohlc4 : max1b
min_b := is_trend_changedb ? ohlc4 : min1b
vstopb := is_trend_changedb ? is_uptrendb ? max_b - mult1b * atr_b : min_b + mult1b * atr_b : 
   vstop1b
   
///Volatility Stop///
lengthc = input(title="Vstop length", type=input.integer, defval=26, minval=1)
mult1c = 15

atr_c = atr(lengthc)
max1c = 0.0
min1c = 0.0
is_uptrend_prevc = false
stopc = 0.0
vstop_prevc = 0.0
vstop1c = 0.0
is_uptrendc = false
is_trend_changedc = false
max_c = 0.0
min_c = 0.0
vstopc = 0.0
max1c := max(nz(max_c[1]), ohlc4)
min1c := min(nz(min_c[1]), ohlc4)
is_uptrend_prevc := nz(is_uptrendc[1], true)
stopc := is_uptrend_prevc ? max1c - mult1c * atr_c : min1c + mult1c * atr_c
vstop_prevc := nz(vstopc[1])
vstop1c := is_uptrend_prevc ? max(vstop_prevc, stopc) : min(vstop_prevc, stopc)
is_uptrendc := ohlc4 - vstop1c >= 0
is_trend_changedc := is_uptrendc != is_uptrend_prevc
max_c := is_trend_changedc ? ohlc4 : max1c
min_c := is_trend_changedc ? ohlc4 : min1c
vstopc := is_trend_changedc ? is_uptrendc ? max_c - mult1c * atr_c : min_c + mult1c * atr_c : 
   vstop1c

plot(vstopa, color=is_uptrenda ? color.green : color.red, style=plot.style_line, linewidth=1)
plot(vstopb, color=is_uptrendb ? color.green : color.red, style=plot.style_line, linewidth=1)
plot(vstopc, color=is_uptrendc ? color.green : color.red, style=plot.style_line, linewidth=1)

vstoplongcondition = close > vstopa and close > vstopb and close > vstopc and vstopa > vstopb and vstopa > vstopc and vstopb > vstopc
vstoplongclosecondition = crossunder(close, vstopa)
vstopshortcondition = close < vstopa and close < vstopb and close < vstopc and vstopa < vstopb and vstopa < vstopc and vstopb < vstopc
vstopshortclosecondition = crossover(close, vstopa)

///Renko///
TF = input(title='TimeFrame', type=input.resolution, defval="240")
ATRlength = input(title="ATR length", type=input.integer, defval=60, minval=2, maxval=100)
SMAlength = input(title="SMA length", type=input.integer, defval=5, minval=2, maxval=100)
SMACurTFlength = input(title="SMA CurTF length", type=input.integer, defval=20, minval=2, maxval=100)

HIGH = security(syminfo.tickerid, TF, high)
LOW = security(syminfo.tickerid, TF, low)
CLOSE = security(syminfo.tickerid, TF, close)
ATR = security(syminfo.tickerid, TF, atr(ATRlength))
SMA = security(syminfo.tickerid, TF, sma(close, SMAlength))
SMACurTF = sma(close, SMACurTFlength)

RENKOUP = float(na)
RENKODN = float(na)
H = float(na)
COLOR = color(na)
BUY = int(na)
SELL = int(na)
UP = bool(na)
DN = bool(na)
CHANGE = bool(na)

RENKOUP := na(RENKOUP[1]) ? (HIGH + LOW) / 2 + ATR / 2 : RENKOUP[1]
RENKODN := na(RENKOUP[1]) ? (HIGH + LOW) / 2 - ATR / 2 : RENKODN[1]
H := na(RENKOUP[1]) or na(RENKODN[1]) ? RENKOUP - RENKODN : RENKOUP[1] - RENKODN[1]
COLOR := na(COLOR[1]) ? color.white : COLOR[1]
BUY := na(BUY[1]) ? 0 : BUY[1]
SELL := na(SELL[1]) ? 0 : SELL[1]
UP := false
DN := false
CHANGE := false

if not CHANGE and close >= RENKOUP[1] + H * 3
    CHANGE := true
    UP := true
    RENKOUP := RENKOUP[1] + ATR * 3
    RENKODN := RENKOUP[1] + ATR * 2
    COLOR := color.lime
    SELL := 0
    BUY := BUY + 3
    BUY

if not CHANGE and close >= RENKOUP[1] + H * 2
    CHANGE := true
    UP := true
    RENKOUP := RENKOUP[1] + ATR * 2
    RENKODN := RENKOUP[1] + ATR
    COLOR := color.lime
    SELL := 0
    BUY := BUY + 2
    BUY

if not CHANGE and close >= RENKOUP[1] + H
    CHANGE := true
    UP := true
    RENKOUP := RENKOUP[1] + ATR
    RENKODN := RENKOUP[1]
    COLOR := color.lime
    SELL := 0
    BUY := BUY + 1
    BUY

if not CHANGE and close <= RENKODN[1] - H * 3
    CHANGE := true
    DN := true
    RENKODN := RENKODN[1] - ATR * 3
    RENKOUP := RENKODN[1] - ATR * 2
    COLOR := color.red
    BUY := 0
    SELL := SELL + 3
    SELL

if not CHANGE and close <= RENKODN[1] - H * 2
    CHANGE := true
    DN := true
    RENKODN := RENKODN[1] - ATR * 2
    RENKOUP := RENKODN[1] - ATR
    COLOR := color.red
    BUY := 0
    SELL := SELL + 2
    SELL

if not CHANGE and close <= RENKODN[1] - H
    CHANGE := true
    DN := true
    RENKODN := RENKODN[1] - ATR
    RENKOUP := RENKODN[1]
    COLOR := color.red
    BUY := 0
    SELL := SELL + 1
    SELL

plotshape(UP, style=shape.arrowup, location=location.abovebar, size=size.normal)
plotshape(DN, style=shape.arrowdown, location=location.belowbar, size=size.normal)

p1 = plot(RENKOUP, style=plot.style_line, linewidth=1, color=COLOR)
p2 = plot(RENKODN, style=plot.style_line, linewidth=1, color=COLOR)
fill(p1, p2, color=COLOR, transp=80)

///Long Entry///
longcondition = vstoplongcondition and UP
if (longcondition)
    strategy.entry("Long", strategy.long)
    
///Long exit///
closeconditionlong = vstoplongclosecondition or DN
if (closeconditionlong)
    strategy.close("Long")
    
// ///Short Entry///
// shortcondition = vstopshortcondition and DN
// if (shortcondition)
//     strategy.entry("Short", strategy.short)
    
// ///Short exit///
// closeconditionshort = vstopshortclosecondition or UP
// if (closeconditionshort)
//     strategy.close("Short")
```

> Detail

https://www.fmz.com/strategy/436765

> Last Modified

2023-12-27 15:30:07
