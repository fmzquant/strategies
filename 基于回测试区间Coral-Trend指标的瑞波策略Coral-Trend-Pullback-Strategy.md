
> Name

基于回测试区间Coral-Trend指标的瑞波策略Coral-Trend-Pullback-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/dd2ae6f8ab60ac238b.png)
[trans]

## 概述

本策略运用LazyBear的Coral Trend指标判断价格趋势方向,通过识别Coral Trend指标方向的反转来判断潜在的入场点。为过滤假突破,本策略采用ADX指标或Absolute Strength Histogram和HawkEye Volume指标的组合作为确认指标,实现更可靠的入场。 

 Exit机制采用最近N根K线的最高价/最低价乘以可配置风险回报比例来设置止损位和止盈位。

## 策略原理

基于Coral Trend指标判断大趋势方向后,当指标颜色保持不变的同时,价格出现一个向相反方向的小回调(pullback)。这时如果回调结束,价格重新回到Coral Trend指示的主趋势方向上去,那么就可以认为这是一个比较好的入场时机。

入场条件包括:

1. Coral Trend指标方向与交易方向一致(多头=绿色,空头=红色)

2. 自上一个价格完全突破Coral Trend指标以来(最后一个bar的高点都超过Coral Trend线),至少已有1根K线的低点全部在Coral Trend指标之上(多头)或高点全部在Coral Trend指标之下(空头)  

3. 发生向相反方向的小回调(拉回),这个小回调过程中关闭价一直保持在Coral Trend的反向一边 

4. 小回调结束后,收盘价重新回到Coral Trend指示的主趋势方向

以上为主条件。同时,策略采用ADX指标或Absolute Strength Histogram和HawkEye Volume指标作为入场的确认条件。

ADX指标要求其值 > 20并且最近1根K线上升。以及DI的绿线和红线的顺序与交易方向一致。

Absolute Strength Histogram要求其颜色与交易方向一致(多头=蓝色,空头=红色)。HawkEye Volume要求其颜色与交易方向一致(多头=绿色,空头=红色)。

Exit机制则是采用最近N根K线的最高价或最低价乘以风险回报比例来设置止损位和止盈位。N值和风险回报比例均是可以通过参数配置的。

## 优势分析 

本策略最大的优势在于利用Coral Trend指标判断主趋势方向后,通过识别其反转来发现入场机会,避免在非趋势市场中随波逐流。同时,采用Confirm指标可过滤许多假突破,从而提高入场的成功率。

另外,本策略提供了完整的风控机制,包括止损幅度设置和风险敞口百分比控制,使得即便个别交易亏损也不会对总体资金造成较大的冲击。

## 风险分析

本策略最大的风险在于采用指标进行入场判断,容易产生错觉,认为完全依赖参数配置就可以自动获利。事实上,参数优化和规则配置都需要结合底层价格变化的规律,直观判断指标与价格联动的效果,才能设定出更加适合自己的交易风格和品种的配置。

另外,止损位和止盈位的设置也要适当,过大的止盈倍数可能导致无法止盈离场,而过小的止损位则风险过大。这需要根据不同品种的波动程度和个人风险承受能力来设置。

## 优化方向

本策略可优化的方向包括:

1. 调整Coral Trend指标的参数,使其对不同品种价格变化的反应更加灵敏

2. 尝试不同的Confirm指标或指标组合,如KDJ, MACD等,使入场信号更加准确

3. 根据不同品种的波动程度,调整止损位和止盈位的计算方式,实现更好的风险控制

4. 增加资金管理模块,可根据仓位数量调整单笔委托量,有效控制总体亏损

5. 增加交易时间控制模块,使策略只在特定时段运行,避免剧烈波动期的亏损

## 总结

本策略首先利用Coral Trend判断价格中长线趋势,然后通过判断其反转,配合Confirm信号过滤假突破,构建了一个较为可靠的趋势追踪策略。同时,完善的风控设置也使得本策略可以长期运行而资金稳定。通过进一步的参数和模块优化,有望使本策略适应更多品种,具有更好的稳定性和盈利能力。

||

## Overview

This strategy uses LazyBear's Coral Trend indicator to determine the price trend direction by identifying reversals of the Coral Trend indicator to detect potential entry points. To filter out false breakouts, this strategy uses the ADX indicator or a combination of Absolute Strength Histogram and HawkEye Volume indicators as confirmation indicators for more reliable entry.

The exit mechanism uses the highest/lowest price of the most recent N candles multiplied by a configurable risk-reward ratio to set the stop loss and take profit.

## Strategy Logic

After determining the major trend direction based on the Coral Trend indicator, when the indicator color remains unchanged, and the price shows a small pullback in the opposite direction. At this time, if the pullback ends and the price returns to the main trend direction indicated by the Coral Trend, it can be considered a good entry point.

Entry conditions include:

1. Coral Trend indicator direction is consistent with trade direction (long=green, short=red)

2. Since the last time the price fully broke through the Coral Trend indicator (the high point of the last bar exceeds the Coral Trend line), there has been at least 1 bar with low points all above (long) or high points all below (short) the Coral Trend indicator  

3. A small pullback occurs in the opposite direction, during which the closing price remains on the opposite side of the Coral Trend

4. After the pullback ends, the closing price returns to the main trend direction indicated by Coral Trend

The above are the main conditions. At the same time, the strategy adopts ADX indicator or Absolute Strength Histogram and HawkEye Volume indicator as confirmation conditions for entry.

The ADX indicator requires its value > 20 and rising over the last 1 bar. And the order of the green and red lines of DI is consistent with the trade direction.

The Absolute Strength Histogram requires that its color is consistent with the trade direction (long=blue, short=red). HawkEye Volume requires its color to be consistent with the trade direction (long=green, short=red).

The exit mechanism uses the highest/lowest price of the most recent N candles multiplied by risk-reward ratio to set the stop loss and take profit. The values of N and risk-reward ratio can be configured through parameters.

## Advantage Analysis

The biggest advantage of this strategy is that after determining the main trend direction using the Coral Trend indicator, it detects entry opportunities by identifying reversals, avoiding drifting around in non-trending markets. At the same time, the use of the Confirm indicator can filter out many false breakouts, thereby improving the success rate of entry.

In addition, this strategy provides a complete risk control mechanism, including setting the stop loss magnitude and controlling the percentage of risk exposure, so that even if individual trades lose money, it will not cause a major impact on the total capital.

## Risk Analysis  

The biggest risk of this strategy is that the use of indicators for entry judgment can easily create illusions, believing that you can make money automatically just by relying on parameter configurations. In fact, both parameter optimization and rule configuration need to be combined with the laws of underlying price changes, intuitively judging the effect of indicators and prices, in order to set configurations that are more suitable for your own trading style and products.

In addition, the setting of stop loss and take profit also needs to be appropriate. Excessively large take profit multiples may result in failure to take profit, while excessively small stop loss will result in excessive risk. This needs to be set according to the volatility of different products and personal risk tolerance.


## Optimization Directions

The optimizable directions of this strategy include:

1. Adjust the parameters of the Coral Trend indicator to make it more sensitive to price changes of different products

2. Try different Confirm indicators or indicator combinations, such as KDJ, MACD, etc., to make entry signals more accurate

3. According to the volatility of different products, adjust the calculation method of stop loss and take profit to achieve better risk control  

4. Add a funds management module to adjust the single order quantity based on the number of positions held, effectively controlling overall losses

5. Add a trading time control module to make the strategy only run during specific periods to avoid losses during periods of extreme volatility

## Conclusion

This strategy first uses Coral Trend to determine the medium and long term trend of prices, then by judging its reversal, combined with Confirm signals to filter out false breakouts, it builds a relatively reliable trend following strategy. At the same time, the improved risk control settings also enable this strategy to run for a long time with stable capital. With further optimization of parameters and modules, this strategy is expected to adapt to more products and have better stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|1.5|(?Strategy: Risk Management)Risk : Reward        1 :|
|v_input_float_2|true|Portfolio Risk %        |
|v_input_int_1|5|(?Strategy: Stop Loss Settings)Local High/Low Lookback     |
|v_input_int_2|2010|(?Strategy: Date Range)Start Date  |
|v_input_int_3|0|startMonth: 1|2|3|4|5|6|7|8|9|10|11|12|
|v_input_int_4|0|startDate: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|
|v_input_int_5|2100|End Date    |
|v_input_int_6|0|endMonth: 1|2|3|4|5|6|7|8|9|10|11|12|
|v_input_int_7|0|endDate: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|
|v_input_bool_1|true|(?Strategy: Drawings)Show TP / SL Boxes|
|v_input_bool_2|false|Show Trade Exit Labels|
|v_input_int_8|25|(?Leading Indicator: Coral Trand Settings)Smoothing Period       |
|v_input_float_3|0.4|Constant D          |
|v_input_string_1|0|(?Confirmation Indicator: Indicator Selection)Entry Confirmation Method    : ADX and DI|None|Absolute Strength Histogram + HawkEye Volume|
|v_input_int_9|14|(?Confirmation Indicator: ADX and DI Settings)ADX Length           |
|v_input_int_10|20|Mid Line            |
|v_input_int_11|9|(?Confirmation Indicator: Absolute Strength Histogram Settings)Period of Evaluation       |
|v_input_int_12|6|Period of Smoothing      |
|v_input_source_1_close|0|Source             : close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_2|0|Indicator Method       : RSI|STOCHASTIC|ADX|
|v_input_string_3|0|MA              : SMA|EMA|WMA|ALMA|SMMA|HMA|
|v_input_float_4|0.85|* Arnaud Legoux (ALMA) Offset|
|v_input_int_13|6|* Arnaud Legoux (ALMA) Sigma|
|v_input_int_14|200|(?Confirmation Indicator: HawkEye Volume Settings)Length             |
|v_input_float_5|1.6|Divisor             |


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-27 00:00:00
end: 2024-02-03 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © kevinmck100

// @description
//
// Strategy is taken from the TradeIQ YouTube video called "I Finally Found 80% Win Rate Trading Strategy For Crypto"
// Check out the full video for further details/clarification on strategy entry/exit conditions.
//
// It incorporates the following features:
//
//      - Risk management:  Configurable X% loss per stop loss
//                          Configurable R:R ratio
//
//      - Trade entry:      Conditions outlines below
//
//      - Trade exit:       Conditions outlined below
//
//      - Backtesting:      Configurable backtesting range by date
//
//      - Trade drawings:   TP/SL boxes drawn for all trades (can be turned on and off)
//                          Trade exit information labels (can be turned on and off)
//                          NOTE: Trade drawings will only be applicable when using overlay strategies
//
//      - Debugging:        Includes section with useful debugging techniques
//
// Strategy conditions:
//
//      - Trade entry:      LONG:   C1: Coral Trend is bullish
//                                  C2: At least 1 candle where low is above Coral Trend since last cross above Coral Trend
//                                  C3: Pullback happens and price closes below Coral Trend
//                                  C4: Coral Trend colour remains bullish for duration of pullback
//                                  C5: After valid pullback, price then closes above Coral Trend
//                                  C6: Optional confirmation indicators (choose either C6.1 or C6.2 or NONE):
//                                      C6.1: ADX and DI (Single indicator)
//                                          C6.1.1: Green line is above red line
//                                          C6.1.2: Blue line > 20
//                                          C6.1.3: Blue trending up over last 1 candle
//                                      C6.2: Absolute Strengeh Histogram + HawkEye Volume Indicator (Two indicators combined)
//                                          C6.2.1: Absolute Strengeh Histogram colour is blue
//                                          C6.2.2: HawkEye Volume Indicator colour is green
//                          SHORT:  C1: Coral Trend is bearish
//                                  C2: At least 1 candle where high is below Coral Trend since last cross below Coral Trend
//                                  C3: Pullback happens and price closes above Coral Trend
//                                  C4: Coral Trend colour remains bearish for duration of pullback
//                                  C5: After valid pullback, price then closes below Coral Trend
//                                  C6: Optional confirmation indicators (choose either C6.1 or C6.2 or NONE):
//                                      C6.1: ADX and DI (Single indicator)
//                                          C6.1.1: Red line is above green line
//                                          C6.1.2: Blue line > 20
//                                          C6.1.3: Blue trending up over last 1 candle
//                                      C6.2: Absolute Strengeh Histogram + HawkEye Volume Indicator (Two indicators combined)
//                                          C6.2.1: Absolute Strengeh Histogram colour is red
//                                          C6.2.2: HawkEye Volume Indicator colour is red
//                          NOTE: All the optional confirmation indicators cannot be overlayed with Coral Trend so feel free to add each separately to the chart for visual purposes
//
//
//      - Trade exit:       Stop Loss:      Calculated by recent swing low over previous X candles (configurable with "Local High/Low Lookback")
//                          Take Profit:    Calculated from R:R multiplier * Stop Loss size
//
// @credits
//
// Coral Trend Indicator [LazyBear]     by @LazyBear
// Absolute Strength Histogram | jh     by @jiehonglim
// Indicator: HawkEye Volume Indicator  by @LazyBear
// ADX and DI                           by @BeikabuOyaji

//@version=5
INITIAL_CAPITAL = 1000
DEFAULT_COMMISSION = 0.02
MAX_DRAWINGS = 500
IS_OVERLAY = true

strategy("Coral Trend Pullback Strategy (TradeIQ)", "Coral Trend Pullback", overlay = IS_OVERLAY, initial_capital = INITIAL_CAPITAL, currency = currency.NONE, max_labels_count = MAX_DRAWINGS, max_boxes_count = MAX_DRAWINGS, max_lines_count = MAX_DRAWINGS, default_qty_type = strategy.cash, commission_type = strategy.commission.percent, commission_value = DEFAULT_COMMISSION)

// =============================================================================
// INPUTS
// =============================================================================

// ---------------
// Risk Management
// ---------------
riskReward          = input.float(1.5,  "Risk : Reward        1 :",     group = "Strategy: Risk Management",    inline = "RM1", minval = 0, step = 0.1, tooltip = "Previous high or low (long/short dependant) is used to determine TP level. 'Risk : Reward' ratio is then used to calculate SL based of previous high/low level.\n\nIn short, the higher the R:R ratio, the smaller the SL since TP target is fixed by previous high/low price data.")
accountRiskPercent  = input.float(1,    "Portfolio Risk %        ",     group = "Strategy: Risk Management",    inline = "RM2", minval = 0, step = 0.1, tooltip = "Percentage of portfolio you lose if trade hits SL.\n\nYou then stand to gain\n  Portfolio Risk % * Risk : Reward\nif trade hits TP.")

localHlLookback     = input.int (5,     "Local High/Low Lookback     ", group = "Strategy: Stop Loss Settings", inline = "SL1", minval = 1,             tooltip = "This strategy calculates the Stop Loss value from the recent local high/low. This lookback period determines the number of candles to include for the local high/low.")

// ----------
// Date Range
// ----------
startYear           = input.int (2010,  "Start Date  ",                 group = "Strategy: Date Range",         inline = "DR1", minval    = 1900, maxval = 2100)
startMonth          = input.int (1,     "",                             group = "Strategy: Date Range",         inline = "DR1", options   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
startDate           = input.int (1,     "",                             group = "Strategy: Date Range",         inline = "DR1", options   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
endYear             = input.int (2100,  "End Date    ",                 group = "Strategy: Date Range",         inline = "DR2", minval    = 1900, maxval = 2100)
endMonth            = input.int (1,     "",                             group = "Strategy: Date Range",         inline = "DR2", options   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
endDate             = input.int (1,     "",                             group = "Strategy: Date Range",         inline = "DR2", options   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])

// ----------------
// Drawing Settings
// ----------------
showTpSlBoxes       = input.bool(true,  "Show TP / SL Boxes",           group = "Strategy: Drawings",           inline = "D1",  tooltip = "Show or hide TP and SL position boxes.\n\nNote: TradingView limits the maximum number of boxes that can be displayed to 500 so they may not appear for all price data under test.")
showLabels          = input.bool(false, "Show Trade Exit Labels",       group = "Strategy: Drawings",           inline = "D2",  tooltip = "Useful labels to identify Profit/Loss and cumulative portfolio capital after each trade closes.\n\nAlso note that TradingView limits the max number of 'boxes' that can be displayed on a chart (max 500). This means when you lookback far enough on the chart you will not see the TP/SL boxes. However you can check this option to identify where trades exited.")

// ------------------
// Indicator Settings
// ------------------

// Coral Trend
ctSm                = input.int  (25,       "Smoothing Period       ",              group = "Leading Indicator: Coral Trand Settings",                      inline = "CT1")
ctCd                = input.float(0.4,      "Constant D          ",                 group = "Leading Indicator: Coral Trand Settings",                      inline = "CT2", step = 0.1)

// Confirmation indicator inputs
confirmationInd     = input.string("ADX and DI", "Entry Confirmation Method    ",   group = "Confirmation Indicator: Indicator Selection",                  inline = "IS1", options=["None", "ADX and DI", "Absolute Strength Histogram + HawkEye Volume"], tooltip = "Select one of the possible confirmation indicator(s) which can be used to confirm entry signals from the main Coral Trend indicator conditions. See strategy conditions to understand the logic behind each confirmation indicator")
// ADX and DI
adxLen              = input.int(14, "ADX Length           ",                        group = "Confirmation Indicator: ADX and DI Settings",                  inline = "AD1")
midLine             = input.int(20, "Mid Line            ",                         group = "Confirmation Indicator: ADX and DI Settings",                  inline = "AD2", tooltip = "Mid line on standard ADX and DI indicator. In this strategy the DI must be above this line for entry confirmation.")
// Absolute Strength Histogram
ashLength           = input.int(9, "Period of Evaluation       ",                   group = "Confirmation Indicator: Absolute Strength Histogram Settings", inline = "ASH1")
ashSmooth           = input.int(6, "Period of Smoothing      ",                     group = "Confirmation Indicator: Absolute Strength Histogram Settings", inline = "ASH2")
ashSrc              = input.source(close, "Source             ",                    group = "Confirmation Indicator: Absolute Strength Histogram Settings", inline = "ASH3")
ashMode             = input.string("RSI", "Indicator Method       ",                group = "Confirmation Indicator: Absolute Strength Histogram Settings", inline = "ASH4", options=["RSI", "STOCHASTIC", "ADX"])
sahMaType           = input.string("SMA", "MA              ",                       group = "Confirmation Indicator: Absolute Strength Histogram Settings", inline = "ASH5", options=["ALMA", "EMA", "WMA", "SMA", "SMMA", "HMA"])
ashAlmaOffset       = input.float(0.85, "* Arnaud Legoux (ALMA) Offset",            group = "Confirmation Indicator: Absolute Strength Histogram Settings", inline = "ASH6", minval=0, step=0.01)
ashAlmaSigma        = input.int(6, "* Arnaud Legoux (ALMA) Sigma",                  group = "Confirmation Indicator: Absolute Strength Histogram Settings", inline = "ASH7", minval=0)
// HawkEye Volume Indicator
hevLength           = input.int(200, "Length             ",                         group = "Confirmation Indicator: HawkEye Volume Settings",              inline = "HV1")
hevDivisor          = input.float(1.6, "Divisor             ",                      group = "Confirmation Indicator: HawkEye Volume Settings",              inline = "HV2", step=0.1)

// =============================================================================
// INDICATORS
// =============================================================================

// -----------
// Coral Trend
// -----------
src             = close
di              = (ctSm - 1.0) / 2.0 + 1.0 
c1              = 2 / (di + 1.0)
c2              = 1 - c1
c3              = 3.0 * (ctCd * ctCd + ctCd * ctCd * ctCd)
c4              = -3.0 * (2.0 * ctCd * ctCd + ctCd + ctCd * ctCd * ctCd)
c5              = 3.0 * ctCd + 1.0 + ctCd * ctCd * ctCd + 3.0 * ctCd * ctCd
var float i1    = na
var float i2    = na
var float i3    = na
var float i4    = na
var float i5    = na
var float i6    = na
i1             := c1 * src + c2 * nz(i1[1])
i2             := c1 * i1  + c2 * nz(i2[1])
i3             := c1 * i2  + c2 * nz(i3[1])
i4             := c1 * i3  + c2 * nz(i4[1])
i5             := c1 * i4  + c2 * nz(i5[1])
i6             := c1 * i5  + c2 * nz(i6[1])

bfr             = -ctCd * ctCd * ctCd * i6 + c3 * i5 + c4 * i4 + c5 * i3
bfrC            = bfr > nz(bfr[1]) ? color.new(color.green, 50) : bfr < nz(bfr[1]) ? color.new(color.red, 50) : color.new(color.blue, 50)
plot(bfr, "Trend", linewidth = 3, style = plot.style_stepline, color = bfrC)

// ----------
// ADX and DI
// ----------
TrueRange                           = math.max(math.max(high - low, math.abs(high - nz(close[1]))), math.abs(low - nz(close[1])))
DirectionalMovementPlus             = high - nz(high[1]) > nz(low[1]) - low ? math.max(high - nz(high[1]), 0) : 0
DirectionalMovementMinus            = nz(low[1]) - low > high - nz(high[1]) ? math.max(nz(low[1]) - low, 0) : 0

SmoothedTrueRange                   = 0.0
SmoothedTrueRange                  := nz(SmoothedTrueRange[1]) - nz(SmoothedTrueRange[1]) / adxLen + TrueRange

SmoothedDirectionalMovementPlus     = 0.0
SmoothedDirectionalMovementPlus    := nz(SmoothedDirectionalMovementPlus[1]) - nz(SmoothedDirectionalMovementPlus[1]) / adxLen + DirectionalMovementPlus

SmoothedDirectionalMovementMinus    = 0.0
SmoothedDirectionalMovementMinus   := nz(SmoothedDirectionalMovementMinus[1]) - nz(SmoothedDirectionalMovementMinus[1]) / adxLen + DirectionalMovementMinus

DIPlus                              = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
DIMinus                             = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
DX                                  = math.abs(DIPlus - DIMinus) / (DIPlus + DIMinus) * 100
ADX                                 = ta.sma(DX, adxLen)

// ---------------------------
// Absolute Strength Histogram
// ---------------------------
ashMa(ashType, ashSrc, ashLen) =>
    float result = 0
    if ashType == 'SMA'  // Simple
        result := ta.sma(ashSrc, ashLen)
        result
    if ashType == 'EMA'  // Exponential
        result := ta.ema(ashSrc, ashLen)
        result
    if ashType == 'WMA'  // Weighted
        result := ta.wma(ashSrc, ashLen)
        result
    if ashType == 'SMMA'  // Smoothed
        ashWma = ta.wma(ashSrc, ashLen)
        ashSma = ta.sma(ashSrc, ashLen)
        result := na(ashWma[1]) ? ashSma : (ashWma[1] * (ashLen - 1) + ashSrc) / ashLen
        result
    if ashType == 'HMA'  // Hull
        result := ta.wma(2 * ta.wma(ashSrc, ashLen / 2) - ta.wma(ashSrc, ashLen), math.round(math.sqrt(ashLen)))
        result
    if ashType == 'ALMA'  // Arnaud Legoux
        result := ta.alma(ashSrc, ashLen, ashAlmaOffset, ashAlmaSigma)
        result
    result

Price           = ashSrc
Price1          = ashMa('SMA', Price, 1)
Price2          = ashMa('SMA', Price[1], 1)

//RSI
Bulls0          = 0.5 * (math.abs(Price1 - Price2) + Price1 - Price2)
Bears0          = 0.5 * (math.abs(Price1 - Price2) - (Price1 - Price2))

//STOCHASTIC
Bulls1          = Price1 - ta.lowest(Price1, ashLength)
Bears1          = ta.highest(Price1, ashLength) - Price1

//ADX
Bulls2          = 0.5 * (math.abs(high - high[1]) + high - high[1])
Bears2          = 0.5 * (math.abs(low[1] - low) + low[1] - low)

Bulls           = ashMode == 'RSI' ? Bulls0 : ashMode == 'STOCHASTIC' ? Bulls1 : Bulls2
Bears           = ashMode == 'RSI' ? Bears0 : ashMode == 'STOCHASTIC' ? Bears1 : Bears2
AvgBulls        = ashMa(sahMaType, Bulls, ashLength)
AvgBears        = ashMa(sahMaType, Bears, ashLength)

SmthBulls       = ashMa(sahMaType, AvgBulls, ashSmooth)
SmthBears       = ashMa(sahMaType, AvgBears, ashSmooth)

isTrendBullish  = SmthBulls > SmthBears ? true : false

// ------------------------
// HawkEye Volume Indicator
// ------------------------
hevRange1   = high - low
hevRangeAvg = ta.sma(hevRange1, hevLength)
hevVolumeA  = ta.sma(volume, hevLength)

hevHigh1    = high[1]
hevLow1     = low[1]
hevMid1     = hl2[1]

hevU1       = hevMid1 + (hevHigh1 - hevLow1) / hevDivisor
hevD1       = hevMid1 - (hevHigh1 - hevLow1) / hevDivisor

rEnabled1   = hevRange1 > hevRangeAvg and close < hevD1 and volume > hevVolumeA
rEnabled2   = close < hevMid1
rEnabled    = rEnabled1 or rEnabled2

gEnabled1   = close > hevMid1
gEnabled2   = hevRange1 > hevRangeAvg and close > hevU1 and volume > hevVolumeA
gEnabled3   = high > hevHigh1 and hevRange1 < hevRangeAvg / 1.5 and volume < hevVolumeA
gEnabled4   = low < hevLow1 and hevRange1 < hevRangeAvg / 1.5 and volume > hevVolumeA
gEnabled    = gEnabled1 or gEnabled2 or gEnabled3 or gEnabled4

grEnabled1  = hevRange1 > hevRangeAvg and close > hevD1 and close < hevU1 and volume > hevVolumeA and volume < hevVolumeA * 1.5 and volume > volume[1]
grEnabled2  = hevRange1 < hevRangeAvg / 1.5 and volume < hevVolumeA / 1.5
grEnabled3  = close > hevD1 and close < hevU1
grEnabled   = grEnabled1 or grEnabled2 or grEnabled3

// =============================================================================
// STRATEGY LOGIC
// =============================================================================

// ---------
// FUNCTIONS
// ---------

percentAsPoints(pcnt) =>
    math.round(pcnt / 100 * close / syminfo.mintick)
    
calcStopLossPrice(pointsOffset, isLong) =>
    priceOffset = pointsOffset * syminfo.mintick
    if isLong
        close - priceOffset
    else 
        close + priceOffset

calcProfitTrgtPrice(pointsOffset, isLong) =>
    calcStopLossPrice(-pointsOffset, isLong)
    
        
printLabel(barIndex, msg) => label.new(barIndex, close, msg)

printTpSlHitBox(left, right, slHit, tpHit, entryPrice, slPrice, tpPrice) => 
    if showTpSlBoxes
        box.new (left = left,   top = entryPrice,   right = right,  bottom = slPrice,   bgcolor = slHit ? color.new(color.red, 60)   : color.new(color.gray, 90), border_width = 0)
        box.new (left = left,   top = entryPrice,   right = right,  bottom = tpPrice,   bgcolor = tpHit ? color.new(color.green, 60) : color.new(color.gray, 90), border_width = 0)
        line.new(x1 = left,     y1 = entryPrice,    x2 = right,     y2 = entryPrice,    color = color.new(color.yellow, 20))
        line.new(x1 = left,     y1 = slPrice,       x2 = right,     y2 = slPrice,       color = color.new(color.red, 20))
        line.new(x1 = left,     y1 = tpPrice,       x2 = right,     y2 = tpPrice,       color = color.new(color.green, 20))
        
printTpSlNotHitBox(left, right, entryPrice, slPrice, tpPrice) => 
    if showTpSlBoxes
        box.new (left = left,   top = entryPrice,   right = right,  bottom = slPrice,   bgcolor = color.new(color.gray, 90), border_width = 0)
        box.new (left = left,   top = entryPrice,   right = right,  bottom = tpPrice,   bgcolor = color.new(color.gray, 90), border_width = 0)
        line.new(x1 = left,     y1 = entryPrice,    x2 = right,     y2 = entryPrice,    color = color.new(color.yellow, 20))
        line.new(x1 = left,     y1 = slPrice,       x2 = right,     y2 = slPrice,       color = color.new(color.red, 20))
        line.new(x1 = left,     y1 = tpPrice,       x2 = right,     y2 = tpPrice,       color = color.new(color.green, 20))
        
printTradeExitLabel(x, y, posSize, entryPrice, pnl) => 
    if showLabels
        labelStr = "Position Size: " + str.tostring(math.abs(posSize), "#.##") + "\nPNL: " + str.tostring(pnl, "#.##") + "\nCapital: " + str.tostring(strategy.equity, "#.##") + "\nEntry Price: " + str.tostring(entryPrice, "#.##")
        label.new(x = x, y = y, text = labelStr, color = pnl > 0 ? color.new(color.green, 60) : color.new(color.red, 60), textcolor = color.white, style = label.style_label_down)

printVerticalLine(col) => line.new(bar_index, close, bar_index, close * 1.01, extend = extend.both, color = col)

// ----------
// CONDITIONS
// ----------

inDateRange                 = true

// Condition 1: Coral Trend color matches trend direction (long=green, short=red)
isCoralBullish              = bfr > nz(bfr[1])
isCoralBearish              = bfr < nz(bfr[1])

// Condition 2: At least 1 candle completely above/below (long/short) Coral Trend since last cross above/below (long/short) Coral Trend (could potentially try also with only close above)
sincePrePullbackBullBreakout= ta.barssince(ta.crossover(close, bfr))
sincePrePullbackBearBreakout= ta.barssince(ta.crossunder(close, bfr))
prePullbackBullBreakout     = ta.barssince(low > bfr and high > bfr) < sincePrePullbackBullBreakout[1]
prePullbackBearBreakout     = ta.barssince(low < bfr and high < bfr) < sincePrePullbackBearBreakout[1]

// Condition 3: Pullback closes below/above (long/short) Coral Trend
barssinceBullPullbackStart  = ta.barssince(ta.crossunder(close, bfr))
barssinceBearPullbackStart  = ta.barssince(ta.crossover(close, bfr))
barssincePullbackStart      = isCoralBullish ? barssinceBullPullbackStart : isCoralBearish ? barssinceBearPullbackStart : na

// Condition 4: Coral Trend colour matched trend direction for duration of pullback
sinceBullish                = ta.barssince(ta.crossover(bfr, nz(bfr[1])))
sinceBearish                = ta.barssince(ta.crossunder(bfr, nz(bfr[1])))
barssinceCoralflip          = isCoralBullish ? sinceBullish : isCoralBearish ? sinceBearish : na
isPullbackValid             = barssincePullbackStart < barssinceCoralflip

// Condition 5: After valid pullback, price then closes above/below (long/short) Coral Trend
entryBreakout               = (isCoralBullish and ta.crossover(close, bfr)) or (isCoralBearish and ta.crossunder(close, bfr))

// Condition 6: Confirmation indicators (6.1 or 6.2, optional depending on settings) confirms trade entry
// 6.1:         ADX and DI
//      6.1.1:  Green and red match trend (long=(green > red), short=(red > green))     
//      6.1.2:  Blue > 20
//      6.1.3:  Blue trending up over last 1 candle
// 6.2:         Absolute Strengeh Histogram + HawkEye Volume Indicator
//      6.2.1:  Absolute Strengeh Histogram colour matches trend (long=blue, short=red)
//      6.2.2:  HawkEye Volume Indicator colour matches trend (long=green, short=red)
var longTradeConfirmed  = false
var shortTradeConfirmed = false
if confirmationInd      == "ADX and DI"
    isAdxUp             = ADX       > ADX [1]
    isAdxValid          = ADX       > midLine   and isAdxUp
    longTradeConfirmed := DIPlus    > DIMinus   and isAdxValid
    shortTradeConfirmed:= DIMinus   > DIPlus    and isAdxValid
else if confirmationInd == "Absolute Strength Histogram + HawkEye Volume"
    isAshBullish        = SmthBulls > SmthBears ? true : false
    isHevBullish        = not grEnabled     and gEnabled ? true : false
    isHevBearish        = not grEnabled     and rEnabled ? true : false
    longTradeConfirmed := isAshBullish      and isHevBullish
    shortTradeConfirmed:= not isAshBullish  and isHevBearish
else if confirmationInd == "None"
    longTradeConfirmed := true
    shortTradeConfirmed:= true

// Combine all entry conditions
goLong              = inDateRange and isCoralBullish and prePullbackBullBreakout and isPullbackValid and entryBreakout and longTradeConfirmed
goShort             = inDateRange and isCoralBearish and prePullbackBearBreakout and isPullbackValid and entryBreakout and shortTradeConfirmed

// Trade entry and exit variables
var tradeEntryBar   = bar_index
var profitPoints    = 0.
var lossPoints      = 0.
var slPrice         = 0.
var tpPrice         = 0.
var inLong          = false
var inShort         = false
var entryPrice      = 0.

// Entry decisions
openLong            = (goLong and not inLong)
openShort           = (goShort and not inShort)
flippingSides       = (goLong and inShort) or (goShort and inLong)
enteringTrade       = openLong or openShort
inTrade             = inLong or inShort

// Exit calculations
entryPrice         := close
longSlPrice         = ta.lowest(localHlLookback)
shortSlPrice        = ta.highest(localHlLookback)
slAmount            = isCoralBullish ? entryPrice - longSlPrice : shortSlPrice - entryPrice
slPercent           = math.abs((1 - (entryPrice - slAmount) / entryPrice) * 100)
tpPercent           = slPercent * riskReward

// Risk calculations
riskAmt             = strategy.equity * accountRiskPercent / 100
entryQty            = math.abs(riskAmt / slPercent * 100)  / close

if openLong
    if strategy.position_size < 0
        printTpSlNotHitBox(tradeEntryBar + 1, bar_index + 1, strategy.position_avg_price, slPrice, tpPrice)
        printTradeExitLabel(bar_index + 1, math.max(tpPrice, slPrice), strategy.position_size, strategy.position_avg_price, strategy.openprofit)
    strategy.entry("Long", strategy.long, qty = entryQty, alert_message = "Long Entry")
    enteringTrade   := true
    inLong          := true
    inShort         := false

if openShort
    if strategy.position_size > 0
        printTpSlNotHitBox(tradeEntryBar + 1, bar_index + 1, strategy.position_avg_price, slPrice, tpPrice)
        printTradeExitLabel(bar_index + 1, math.max(tpPrice, slPrice), strategy.position_size, strategy.position_avg_price, strategy.openprofit)
    strategy.entry("Short", strategy.short, qty = entryQty, alert_message = "Short Entry")
    enteringTrade   := true
    inShort         := true
    inLong          := false

if enteringTrade
    profitPoints    := percentAsPoints(tpPercent)
    lossPoints      := percentAsPoints(slPercent)
    slPrice         := calcStopLossPrice(lossPoints, openLong)
    tpPrice         := calcProfitTrgtPrice(profitPoints, openLong)
    tradeEntryBar   := bar_index

strategy.exit("TP/SL", profit = profitPoints, loss = lossPoints, comment_profit = "TP Hit", comment_loss = "SL Hit", alert_profit = "TP Hit Alert", alert_loss = "SL Hit Alert")

// =============================================================================
// DRAWINGS
// =============================================================================

// -----------
// TP/SL Boxes
// -----------

slHit           = (inShort and high >= slPrice) or (inLong  and low <= slPrice)
tpHit           = (inLong  and high >= tpPrice) or (inShort and low <= tpPrice)

exitTriggered   = slHit or tpHit
ctEntryPrice    = strategy.closedtrades.entry_price (strategy.closedtrades - 1)
pnl             = strategy.closedtrades.profit      (strategy.closedtrades - 1)
posSize         = strategy.closedtrades.size        (strategy.closedtrades - 1)

// Print boxes for trades closed at profit or loss
if (inTrade and exitTriggered) 
    inShort    := false
    inLong     := false 
    // printTpSlHitBox(tradeEntryBar, bar_index, slHit, tpHit, ctEntryPrice, slPrice, tpPrice)
    // printTradeExitLabel(bar_index, math.max(tpPrice, slPrice), posSize, ctEntryPrice, pnl)

// Print TP/SL box for current open trade
// if barstate.islastconfirmedhistory and strategy.position_size != 0
//     printTpSlNotHitBox(tradeEntryBar + 1, bar_index + 1, strategy.position_avg_price, slPrice, tpPrice)
    
// // =============================================================================
// // DEBUGGING
// // =============================================================================

// Data window plots
plotchar(prePullbackBullBreakout,   "prePullbackBullBreakout",  "")
plotchar(prePullbackBearBreakout,   "prePullbackBearBreakout",  "")
plotchar(barssincePullbackStart,    "barssincePullbackStart",   "")
plotchar(isCoralBullish,            "isCoralBullish",           "")
plotchar(isCoralBearish,            "isCoralBearish",           "")
plotchar(barssinceCoralflip,        "barssinceCoralflip",       "")
plotchar(isPullbackValid,           "isPullbackValid",          "")
plotchar(entryBreakout,             "entryBreakout",            "")
plotchar(slHit,                     "slHit",                    "")
plotchar(tpHit,                     "tpHit",                    "")
plotchar(slPrice,                   "slPrice",                  "")

// Label plots
// plotDebugLabels = false
// if plotDebugLabels
//     if bar_index == tradeEntryBar 
//         printLabel(bar_index, "Position size: " + str.tostring(entryQty * close, "#.##"))

```

> Detail

https://www.fmz.com/strategy/440971

> Last Modified

2024-02-04 12:18:03
