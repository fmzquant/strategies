
> Name

Bullish-Engulfing买卖策略Bullish-Engulfing-Buy-and-Sell-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fe0eb407587a51dbc8.png)

## Overview

The Bullish Engulfing buy and sell strategy is a quantitative trading strategy based on candlestick patterns. It captures opportunities to profit from price reversals by identifying the "Bullish Engulfing" candlestick pattern. The main advantages of this strategy are:

1. It is based on mature technical analysis theories to identify high probability price reversal opportunities.  
2. It has simple and intuitive trading signals.
3. The risks are controllable.


### Strategy Logic

This strategy identifies price reversals based on the "Bullish Engulfing" candlestick pattern. 

When a stock is in a downtrend, if a candlestick with a small real body is followed by a candlestick whose real body completely engulfs the previous real body, and the closing price is higher than the previous high price, this forms a Bullish Engulfing pattern, signaling an imminent trend reversal, where the price will start rising.

This strategy will open a long position when a Bullish Engulfing pattern is identified, with a profit target of 1% and a stop loss of 1%, to lock in profits.

### Advantage Analysis  

The advantages of this strategy are:

1. It is based on mature technical analysis theories. The Bullish Engulfing pattern signals a high probability price reversal.  
2. The trading signals are simple and intuitive, easy to understand and automate for quantitative trading.
3. Trading high liquidity products like index futures allows efficient entries and exits.  
4. The profit target and stop loss exits effectively control the risk/reward ratio of each trade, ensuring profitability and avoiding huge losses.
5. Flexible parameter adjustments suit different products and market environments.

### Risk Analysis

There are some risks to this strategy:

1. False signals risks exist as it is based on technical analysis theories.  
2. Market regime changes may invalidate parameters which need adjustment.
3. Stop loss values that are too tight may result in premature exiting, while values too wide may produce large losses.

To address these risks, we can:

1. Optimize parameters and verify performance across market conditions.  
2. Widen stop loss levels to control single trade loss at acceptable levels. 
3. Trade high liquidity products with suitable volatility like index and futures ETFs.

### Optimization Directions

This strategy can also be enhanced by:

1. Adding filters like moving averages to avoid trading against trends.  
2. Increasing profit target to expand profit potential.  
3. Optimizing stop loss mechanisms, like trailing stops to reduce probability of stopping out.
4. Using combinations of other candlestick patterns similar to "Bullish Engulfing" to create a trading system.  

## Conclusion

The Bullish Engulfing buy and sell strategy is a mature quantitative trading strategy based on technical analysis, with the advantages of simple and clear trading signals that are easy to implement. With optimized parameters and good risk control measures, it can produce steady profits and is highly recommendable.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|(?START DATE BACKTESTING)D: |
|v_input_int_2|true|M: |
|v_input_int_3|2022|Y: |
|v_input_int_4|31|(?END DATE BACKTESTING)D: |
|v_input_int_5|12|M: |
|v_input_int_6|2023|Y: |
|v_input_float_1|true|(?TAKE PROFIT-STOP LOSS)Target profit (%): |
|v_input_float_2|true|Stop Loss (%): |
|v_input_float_3|2|(?RISK MANAGEMENT)Orders size (%): |
|v_input_string_1|0|(?BULLISH ENGULFING)Detect Trend Based On: SMA50|SMA50, SMA200|No detection|
|v_input_color_1|#2bff00|Label Color Bullish|


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
// © thequantscience

// ██████╗ ██╗   ██╗██╗     ██╗     ██╗███████╗██╗  ██╗    ███████╗███╗   ██╗ ██████╗ ██╗   ██╗██╗     ███████╗██╗███╗   ██╗ ██████╗ 
// ██╔══██╗██║   ██║██║     ██║     ██║██╔════╝██║  ██║    ██╔════╝████╗  ██║██╔════╝ ██║   ██║██║     ██╔════╝██║████╗  ██║██╔════╝ 
// ██████╔╝██║   ██║██║     ██║     ██║███████╗███████║    █████╗  ██╔██╗ ██║██║  ███╗██║   ██║██║     █████╗  ██║██╔██╗ ██║██║  ███╗
// ██╔══██╗██║   ██║██║     ██║     ██║╚════██║██╔══██║    ██╔══╝  ██║╚██╗██║██║   ██║██║   ██║██║     ██╔══╝  ██║██║╚██╗██║██║   ██║
// ██████╔╝╚██████╔╝███████╗███████╗██║███████║██║  ██║    ███████╗██║ ╚████║╚██████╔╝╚██████╔╝███████╗██║     ██║██║ ╚████║╚██████╔╝
// ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚═╝╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝     ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                                                                                                  
//@version=5
strategy(
     "Buy&Sell Bullish Engulfing - The Quant Science",
     overlay = true,
     default_qty_type = strategy.percent_of_equity, 
     default_qty_value = 100,
     pyramiding = 1,
     currency = currency.EUR,
     initial_capital = 10000,
     commission_type = strategy.commission.percent,
     commission_value = 0.07,
     process_orders_on_close = true, 
     close_entries_rule = "ANY"
     )

startDate  = input.int(title="D: ", defval=1,    minval=1,    maxval=31,   inline = 'Start', group = "START DATE BACKTESTING", tooltip = "D is Day, M is Month, Y is Year.")
startMonth = input.int(title="M: ", defval=1,    minval=1,    maxval=12,   inline = 'Start', group = "START DATE BACKTESTING", tooltip = "D is Day, M is Month, Y is Year.")
startYear  = input.int(title="Y: ", defval=2022, minval=1800, maxval=2100, inline = 'Start', group = "START DATE BACKTESTING", tooltip = "D is Day, M is Month, Y is Year.")

endDate    = input.int(title="D: ", defval=31,   minval=1,    maxval=31,   inline = 'End',   group = "END DATE BACKTESTING", tooltip = "D is Day, M is Month, Y is Year.")
endMonth   = input.int(title="M: ", defval=12,   minval=1,    maxval=12,   inline = 'End',   group = "END DATE BACKTESTING", tooltip = "D is Day, M is Month, Y is Year.")
endYear    = input.int(title="Y: ", defval=2023, minval=1800, maxval=2100, inline = 'End',   group = "END DATE BACKTESTING", tooltip = "D is Day, M is Month, Y is Year.")

inDateRange = (time >= timestamp(syminfo.timezone, startYear, startMonth, startDate, 0, 0)) and (time < timestamp(syminfo.timezone, endYear, endMonth, endDate, 0, 0))

PROFIT   = input.float(defval = 1, minval = 0, title = "Target profit (%): ", step = 0.10, group = "TAKE PROFIT-STOP LOSS")
STOPLOSS = input.float(defval = 1, minval = 0, title = "Stop Loss (%): ",     step = 0.10, group = "TAKE PROFIT-STOP LOSS")

var float equity_trades = 0
strategy.initial_capital = 50000
equity_trades := strategy.initial_capital
var float equity   = 0
var float qty_order   = 0
t_ordersize = "Percentage size of each new order. With 'Reinvestment Profit' activate, the size will be calculate on the equity, with 'Reinvestment Profit' deactivate the size will be calculate on the initial capital."
orders_size = input.float(defval = 2, title = "Orders size (%): ", minval = 0.10, step = 0.10,  maxval = 100, group = "RISK MANAGEMENT", tooltip = t_ordersize)
qty_order := ((equity_trades * orders_size) / 100 ) / close 

C_DownTrend = true
C_UpTrend   = true
var trendRule1 = "SMA50"
var trendRule2 = "SMA50, SMA200"
var trendRule = input.string(trendRule1, "Detect Trend Based On", options=[trendRule1, trendRule2, "No detection"], group = "BULLISH ENGULFING")

if trendRule == trendRule1
	priceAvg = ta.sma(close, 50)
	C_DownTrend := close < priceAvg
	C_UpTrend := close > priceAvg

if trendRule == trendRule2
	sma200 = ta.sma(close, 200)
	sma50  = ta.sma(close, 50)
	C_DownTrend := close < sma50 and sma50 < sma200
	C_UpTrend := close > sma50 and sma50 > sma200
C_Len = 14
C_ShadowPercent = 5.0 
C_ShadowEqualsPercent = 100.0
C_DojiBodyPercent = 5.0
C_Factor = 2.0 

C_BodyHi = math.max(close, open)
C_BodyLo = math.min(close, open)
C_Body = C_BodyHi - C_BodyLo
C_BodyAvg = ta.ema(C_Body, C_Len)
C_SmallBody = C_Body < C_BodyAvg
C_LongBody = C_Body > C_BodyAvg
C_UpShadow = high - C_BodyHi
C_DnShadow = C_BodyLo - low
C_HasUpShadow = C_UpShadow > C_ShadowPercent / 100 * C_Body
C_HasDnShadow = C_DnShadow > C_ShadowPercent / 100 * C_Body
C_WhiteBody = open < close
C_BlackBody = open > close
C_Range = high-low
C_IsInsideBar = C_BodyHi[1] > C_BodyHi and C_BodyLo[1] < C_BodyLo
C_BodyMiddle = C_Body / 2 + C_BodyLo
C_ShadowEquals = C_UpShadow == C_DnShadow or (math.abs(C_UpShadow - C_DnShadow) / C_DnShadow * 100) < C_ShadowEqualsPercent and (math.abs(C_DnShadow - C_UpShadow) / C_UpShadow * 100) < C_ShadowEqualsPercent
C_IsDojiBody = C_Range > 0 and C_Body <= C_Range * C_DojiBodyPercent / 100
C_Doji = C_IsDojiBody and C_ShadowEquals

patternLabelPosLow  = low  - (ta.atr(30) * 0.6)
patternLabelPosHigh = high + (ta.atr(30) * 0.6)

label_color_bullish = input.color(color.rgb(43, 255, 0), title = "Label Color Bullish", group = "BULLISH ENGULFING")
C_EngulfingBullishNumberOfCandles = 2
C_EngulfingBullish = C_DownTrend and C_WhiteBody and C_LongBody and C_BlackBody[1] and C_SmallBody[1] and close >= open[1] and open <= close[1] and ( close > open[1] or open < close[1] )
if C_EngulfingBullish
    var ttBullishEngulfing = "Engulfing\nAt the end of a given downward trend, there will most likely be a reversal pattern. To distinguish the first day, this candlestick pattern uses a small body, followed by a day where the candle body fully overtakes the body from the day before, and closes in the trend’s opposite direction. Although similar to the outside reversal chart pattern, it is not essential for this pattern to completely overtake the range (high to low), rather only the open and the close."
    label.new(bar_index, patternLabelPosLow, text="BE", style=label.style_label_up, color = label_color_bullish, textcolor=color.white, tooltip = ttBullishEngulfing)
bgcolor(ta.highest(C_EngulfingBullish?1:0, C_EngulfingBullishNumberOfCandles)!=0 ? color.new(#21f321, 90) : na, offset=-(C_EngulfingBullishNumberOfCandles-1))

var float c       = 0
var float o       = 0
var float c_exit  = 0
var float c_stopl = 0

if C_EngulfingBullish and strategy.opentrades==0 and inDateRange 
    c := strategy.equity
    o := close
    c_exit  := c + (c * PROFIT / 100)
    c_stopl := c - (c * STOPLOSS / 100)
    strategy.entry(id = "LONG", direction = strategy.long, qty = qty_order, limit = o)

if ta.crossover(strategy.equity, c_exit)
    strategy.exit(id = "CLOSE-LONG", from_entry = "LONG", limit = close)
if ta.crossunder(strategy.equity, c_stopl)
    strategy.exit(id = "CLOSE-LONG", from_entry = "LONG", limit = close)

```

> Detail

https://www.fmz.com/strategy/436752

> Last Modified

2023-12-27 14:25:11
