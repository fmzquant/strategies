
> Name

自适应ATR追踪止损策略Adaptive-ATR-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
本策略名称为“自适应ATR追踪止损策略”。该策略使用ATR指标设定止损点,并在入场后将止损从紧固转为宽松,目的是追踪趋势运行而又控制风险。

策略的具体逻辑如下:

1. 计算一定周期内的最高价和最低价范围作为入场信号,当价格突破该范围时产生入场信号。

2. 入场后,最初采用较紧的ATR止损,止损点固定为ATR值的1.5倍。这可以限制入场后的损失。

3. 在持仓阶段,将止损转为更宽松的ATR值4倍。止损继续追踪价格运行,但有更大空间allows需势继续延伸。

4. 最后止损点始终跟踪最低价(多单)或最高价(空单),随价格波动调整,实现追踪止损效果。

5. 价格跌破止损点(多单)或上破止损点(空单)时止损出场。

该策略的优势在于,采用自适应的止损机制,既保证了风险控制,也avoids过早止损。但ATR参数和倍数需优化,并配合趋势判断使用止损策略。

总体来说,动态追踪止损是提高策略获利概率的重要手段。灵活运用止损,能更好地维持趋势获利和控制风险。

||

This strategy is named "Adaptive ATR Trailing Stop Loss Strategy". It uses the ATR indicator to set stop loss levels, and switches from a tight stop to a loose stop after entry to follow trends while controlling risk.

The specific logic is:

1. Calculate the range of highest and lowest prices over a certain period as entry signal. Entries are triggered when prices break out of the range.

2. After entry, a tighter ATR stop is initially used, fixed at 1.5 times the ATR value, to limit post-entry loss. 

3. During trade holding, the stop is switched to a looser 4 times ATR. The stop keeps trailing prices but allows more space for trends to extend.

4. The stop level always tracks the lowest price (long trade) or highest price (short trade) and adjusts with price fluctuations, achieving a trailing stop effect.

5. When price drops below stop level (long) or rises above it (short), the stop loss is triggered.

The advantage of this strategy is using an adaptive stop loss mechanism to ensure risk control while avoiding premature stop outs. But ATR parameters and multiples need optimization, and stops should be used with trend analysis.

In conclusion, dynamic trailing stops are important means to improve profitability. Flexible stop loss application can better maintain trend profits and control risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|(?Entry strategy)Entry band bar count|
|v_input_2|24|(?ATR SL)Trailing stop ATR Length|
|v_input_3|1.5|Trailing stop ATR Multiple on tight|
|v_input_4|4|Trailing stop ATR Multiple on slack|
|v_input_5|2016|(?Backtesting range)From Year|
|v_input_6|true|From Month|
|v_input_7|true|From Day|
|v_input_8|2021|To Year|
|v_input_9|4|To Month|
|v_input_10|5|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
//@version=4
//@author=Takazudo

strategy("ATR trailing SL tight to slack [Takazudo]",
  overlay=true,
  default_qty_type=strategy.fixed,
  initial_capital=0,
  currency=currency.USD)


posSize = strategy.position_size
hasNoPos = posSize == 0
hasLongPos = posSize > 0
hasShortPos = posSize < 0

//============================================================================
// consts, inputs
//============================================================================

// colors

var COLOR_SL_LINE = color.new(#e0f64d, 20)
var COLOR_SL_LINE_THIN = color.new(#e0f64d, 90)
var COLOR_ENTRY_BAND = color.new(#43A6F5, 30)
var COLOR_TRANSPARENT = color.new(#000000, 100)

// Entry strategy

_g1 = 'Entry strategy'
var config_entryBandBars = input(defval = 100, title = "Entry band bar count",  minval=1, group=_g1)

_g2 = 'ATR SL'
var config_slAtr_length = input(24, title = "Trailing stop ATR Length", group=_g2)
var config_slAtr_multi1 = input(1.5, title = "Trailing stop ATR Multiple on tight", type=input.float, step=0.1, group=_g2)
var config_slAtr_multi2 = input(4, title = "Trailing stop ATR Multiple on slack", type=input.float, step=0.1, group=_g2)

_g3 = 'Backtesting range'
var config_fromYear  = input(defval = 2016, title = "From Year",  minval = 1970, group=_g3)
var config_fromMonth = input(defval = 1,    title = "From Month", minval = 1, maxval = 12, group=_g3)
var config_fromDay   = input(defval = 1,    title = "From Day",   minval = 1, maxval = 31, group=_g3)
var config_toYear  = input(defval = 2021, title = "To Year",  minval = 1970, group=_g3)
var config_toMonth = input(defval = 4,    title = "To Month", minval = 1, maxval = 12, group=_g3)
var config_toDay   = input(defval = 5,    title = "To Day",   minval = 1, maxval = 31, group=_g3)

//============================================================================
// Range Edge calculation
//============================================================================

f_calcEntryBand_high() =>
    _highest = max(open[3], close[3])
    for i = 4 to (config_entryBandBars - 1)
        _highest := max(_highest, open[i], close[i])
    _highest

f_calcEntryBand_low() =>
    _lowest = min(open[3], close[3])
    for i = 4 to (config_entryBandBars - 1)
        _lowest := min(_lowest, open[i], close[i])
    _lowest

entryBand_high = f_calcEntryBand_high()
entryBand_low = f_calcEntryBand_low()
entryBand_height = entryBand_high - entryBand_low

plot(entryBand_high, color=COLOR_ENTRY_BAND, linewidth=1)
plot(entryBand_low, color=COLOR_ENTRY_BAND, linewidth=1)

rangeBreakDetected_long = entryBand_high < close
rangeBreakDetected_short = entryBand_low > close

shouldMakeEntryLong = (strategy.position_size == 0) and rangeBreakDetected_long
shouldMakeEntryShort = (strategy.position_size == 0) and rangeBreakDetected_short

//============================================================================
// ATR based stuff
//============================================================================

sl_atrHeight_tight = atr(config_slAtr_length) * config_slAtr_multi1
sl_atrHeight_slack = atr(config_slAtr_length) * config_slAtr_multi2

sl_tight_bull = min(open, close) - sl_atrHeight_tight
sl_tight_bear = max(open, close) + sl_atrHeight_tight
sl_slack_bull = min(open, close) - sl_atrHeight_slack
sl_slack_bear = max(open, close) + sl_atrHeight_slack

plot(sl_tight_bull, color=COLOR_SL_LINE_THIN, transp=0, linewidth=1)
plot(sl_tight_bear, color=COLOR_SL_LINE_THIN, transp=0, linewidth=1)
plot(sl_slack_bull, color=COLOR_SL_LINE_THIN, transp=0, linewidth=1)
plot(sl_slack_bear, color=COLOR_SL_LINE_THIN, transp=0, linewidth=1)

//============================================================================
// Sl
//============================================================================

var trailingSl_long = hl2
var trailingSl_short = hl2

trailingSl_long := if hasLongPos
    max(trailingSl_long, sl_slack_bull)
else
    sl_tight_bull

trailingSl_short := if hasShortPos
    min(trailingSl_short, sl_slack_bear)
else
    sl_tight_bear

color_sl_long = hasLongPos ? COLOR_SL_LINE : COLOR_TRANSPARENT
color_sl_short = hasShortPos ? COLOR_SL_LINE : COLOR_TRANSPARENT

plot(trailingSl_long, color=color_sl_long, transp=0, linewidth=2)
plot(trailingSl_short, color=color_sl_short, transp=0, linewidth=2)


//============================================================================
// make entries
//============================================================================

// Calculate start/end date and time condition
startDate  = timestamp(config_fromYear, config_fromMonth, config_fromDay, 00, 00)
finishDate = timestamp(config_toYear,   config_toMonth,   config_toDay,   00, 00)

if (true)
    if shouldMakeEntryLong
        strategy.entry(id="Long", long=true, stop=close)
    if shouldMakeEntryShort
        strategy.entry(id="Short", long=false, stop=close)

strategy.exit('Long-SL/TP', 'Long', stop=trailingSl_long)
strategy.exit('Short-SL/TP', 'Short', stop=trailingSl_short)

```

> Detail

https://www.fmz.com/strategy/426596

> Last Modified

2023-09-13 15:48:32
