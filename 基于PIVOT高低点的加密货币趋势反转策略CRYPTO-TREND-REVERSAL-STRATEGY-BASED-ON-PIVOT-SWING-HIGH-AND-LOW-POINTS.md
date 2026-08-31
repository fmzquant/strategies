
> Name

基于PIVOT高低点的加密货币趋势反转策略CRYPTO-TREND-REVERSAL-STRATEGY-BASED-ON-PIVOT-SWING-HIGH-AND-LOW-POINTS

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1061b4da3bf987926c3.png)

## Overview  

This strategy identifies trend reversals in crypto assets based on PIVOT swing high/low points and breakout signals. It belongs to the breakout reversal strategy category. The strategy first calculates the recent highest and lowest price points as PIVOT levels, then detects if price breaks out these key levels, signaling major trend changes.  

## How The Strategy Works

1. Calculate PIVOT High/Low Points

   Uses ta.pivothigh() and ta.pivotlow() to find highest high and lowest low prices over a custom bar lookback period to plot PIVOT points.

2. Identify Breakout Signals 

   If price breaks above PIVOT low point, or breaks below PIVOT high point, the strategy considers it as trend reversal signal.  

3. Set Filter Conditions

   Requires price to breakout PIVOT levels by meaningful distance, and closing price crosses 150 bar closing prices to avoid whipsaws.

4. Entries and Exits

   Trigger buy signal on long condition, close long position on exit condition. Similarly for short setup rules.

## Advantages

1. PIVOT points are sensitive to major trend shifts  
2. Avoids whipsaws in consolidation trends with filters  
3. Captures reversals early with swing high/low breakouts

## Risks  

1. Larger cycles can cause strategy to get whipsawed
2. PIVOT points and filters need tuning for each asset  
3. Exchange fees impact results, need near-zero fee structure

## Enhancement Opportunities

1. Test different PIVOT lookback periods
2. Add moving stop loss to control loss per trade
3. Combine with other indicators for filter  

## Conclusion

The strategy is robust overall to capture large reversals, but needs customized parameters per asset and risk controls. With further optimization and guardrails, it can perform well across crypto markets.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_timeframe_1||Timeframe|
|v_input_int_1|10|(?LENGTH LEFT / RIGHT)Pivot High|
|v_input_int_2|10|/|
|v_input_1|red|colorH|
|v_input_int_3|10|Pivot Low|
|v_input_int_4|10|/|
|v_input_2|blue|colorL|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © nkrastins95

//@version=5
strategy("Swing Hi Lo", overlay=true, margin_long=100, margin_short=100)

//-----------------------------------------------------------------------------------------------------------------------//

tf = input.timeframe(title="Timeframe", defval="")

gr="LENGTH LEFT / RIGHT"
leftLenH = input.int(title="Pivot High", defval=10, minval=1, inline="Pivot High",group=gr)
rightLenH = input.int(title="/", defval=10, minval=1, inline="Pivot High",group=gr)
colorH = input(title="", defval=color.red, inline="Pivot High",group=gr)

leftLenL = input.int(title="Pivot Low", defval=10, minval=1, inline="Pivot Low", group=gr)
rightLenL = input.int(title="/", defval=10, minval=1, inline="Pivot Low",group=gr)
colorL = input(title="", defval=color.blue, inline="Pivot Low",group=gr)

//-----------------------------------------------------------------------------------------------------------------------//

pivotHigh(ll, rl) =>
    maxLen = 1000
    float ph = ta.pivothigh(ll, rl)
    int offset = 0
    while offset < maxLen
        if not na(ph[offset])
            break 
        offset := offset + 1
    ph[offset]

pivotLow(ll, rl) =>
    maxLen = 1000
    float pl = ta.pivotlow(ll, rl)
    int offset = 0
    while offset < maxLen
        if not na(pl[offset])
            break 
        offset := offset + 1
    pl[offset]


//-----------------------------------------------------------------------------------------------------------------------//

ph = request.security(syminfo.tickerid, tf, pivotHigh(leftLenH, rightLenH), barmerge.gaps_off, barmerge.lookahead_on)
pl = request.security(syminfo.tickerid, tf, pivotLow(leftLenL, rightLenL), barmerge.gaps_off, barmerge.lookahead_on)

drawLabel(_offset, _pivot, _style, _color) =>
    if not na(_pivot)
        label.new(bar_index[_offset], _pivot, str.tostring(_pivot, format.mintick), style=_style, color=_color, textcolor=#131722)

//-----------------------------------------------------------------------------------------------------------------------//

VWAP = ta.vwap(ohlc4)

longcondition = ta.crossunder(close,pl) and close > close[150]
exitcondition = close > ph

shortcondition = ta.crossover(close,ph) and close < close[150]
covercondition = close < pl

strategy.entry("long", strategy.long, when = longcondition)
strategy.close("long", when = exitcondition)

strategy.entry("Short", strategy.short, when = shortcondition)
strategy.close("Short", when = covercondition)
```

> Detail

https://www.fmz.com/strategy/438489

> Last Modified

2024-01-12 14:13:36
