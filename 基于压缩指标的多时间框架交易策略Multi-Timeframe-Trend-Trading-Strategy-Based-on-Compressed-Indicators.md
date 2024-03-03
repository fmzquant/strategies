
> Name

基于压缩指标的多时间框架交易策略Multi-Timeframe-Trend-Trading-Strategy-Based-on-Compressed-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a2951a838fc5be28e5.png)
[trans]

## 概述

本策略通过结合布铺猎手(Boom Hunter)、赫尔套件(Hull Suite)和波动率振荡器(Volatility Oscillator)三个指标,实现在多时间框架下进行趋势追踪和突破交易的量化策略。该策略适用于比特币等具有高波动性和突发性价格行情的数字资产。

## 原理

该策略的核心逻辑基于以下三个指标:

1. **布铺猎手(Boom Hunter)**:一种利用指标压缩技术实现的振荡器,通过两个指标 (Quotient1和Quotient2) 的交叉来判断买入和卖出信号。

2. **赫尔套件(Hull Suite)**:一组平滑移动均线指标,通过中轨和上下轨的关系来判断趋势方向。

3. **波动率振荡器(Volatility Oscillator)**:一种量化价格波动信息的振荡器指标。

本策略的入场逻辑为,在布铺猎手的两个Quotient指标发生向上或向下交叉的同时,价格要突破赫尔中轨并与上轨或下轨发生背离, meanwhile波动率指标位于超买超卖区域。这样可以过滤掉一些假突破信号,提高入场的准确性。

止损通过查找一定周期内(默认20根K线)的最低谷或最高峰来设定,利润则通过止损百分比乘以配置的止盈比例(默认3倍)来获得。仓位根据账号总资产的百分比(默认3%)和具体标的的止损幅度来计算。

## 优势

- 利用压缩指标技术提取价格中的主要交易信号,提高盈利概率
- 多指标组合验证,避免假突破,准确判断趋势方向
- 动态止损止盈设定,实现风险可控的趋势追踪
- 采用波动率指标确保高波动环境下的交易
- 多时间框架分析,提高策略稳定性

## 风险

- 布铺猎手指标可能存在压缩失真,导致产生错误信号
- 赫尔套件中轨会有滞后,无法及时跟踪价格变化
- 波动率下降时会错过交易机会或引发亏损平仓

解决方法:

1. 调整压缩指标的参数,平衡指标的灵敏度
2. 尝试使用EHMA等指数移动平均线来代替中轨指标
3. 增加其他判断指标,避免波动率的误导

## 优化

该策略可以从以下几个方面进行优化:

1. **参数优化**:通过更改指标参数如周期长度、压缩系数等来获得最佳参数组合

2. **时间框架优化**:测试不同的时间周期(1分钟、5分钟、30分钟等),找到最适合的交易周期

3. **仓位优化**:改变每次交易的仓位大小和比例,找到最优的资金利用方案

4. **止损优化**:根据不同的交易对调整止损位置,实现最佳的风险回报比

5. **条件优化**:增加或减少指标过滤条件,获得更准确的入场时机

## 总结

本策略通过布铺猎手、赫尔套件和波动率振荡器三个指标的组合运用,实现了多时间框架下的趋势追踪交易,能够有效识别价格的突发行为,适用于具有高波动性的数字资产。该策略风险可控,通过参数、滤波条件及止损等多方面优化,具有较强的实战性和可扩展性。

||

## Overview

This strategy combines the Boom Hunter, Hull Suite, and Volatility Oscillator indicators to implement a quantitative strategy for trend tracking and breakout trading across multiple timeframes. It is suitable for digital assets with high volatility and abrupt price moves like Bitcoin.  

## Principles  

The core logic of this strategy is based on the following three indicators:   

1. **Boom Hunter**: An oscillator that uses indicator compression techniques to generate trading signals from crossovers between two quotients (Quotient1 and Quotient2).  

2. **Hull Suite**: A set of smoothed moving average lines that determine trend direction based on the relationship between the midline and upper/lower bands.   

3. **Volatility Oscillator**: An oscillator indicator that quantifies price volatility.   

The entry logic of this strategy is when the two Quotient indicators of the Boom Hunter cross up or down, the price breaks through the Hull midline and diverges from the upper or lower band, meanwhile the Volatility Oscillator is in overbought/oversold area. This filters out some false breakout signals and improves entry accuracy.  

The stop loss is set by finding the lowest valley or highest peak over a certain period (default 20 bars), and take profit is obtained by multiplying the stop loss percentage by a configured profit factor (default 3x). Position sizing is calculated based on a percentage of total account equity (default 3%) and the specific stop loss range of the instrument.  

## Pros  

- Extracts key trading signals from price using indicator compression techniques, improving profitability  
- Combination of multiple indicators prevents false breakouts and accurately determines trend direction   
- Dynamic stop loss and take profit setting allows risk-controlled trend following
- Ensures trading in high volatility environments using the Volatility Oscillator  
- Enhanced strategy stability through multi-timeframe analysis  

## Risks  

- Boom Hunter indicators can have compression distortions, generating incorrect signals
- Hull midline may lag and unable to track price changes in real time  
- Missing trading opportunities or forced liquidations during volatility contraction  

Solutions:  

1. Adjust compression indicator parameters to balance sensitivity  
2. Try exponential moving averages instead of the midline  
3. Add other judgment indicators to avoid volatility misdirection  

## Optimization  

This strategy can be optimized in the following aspects:  

1. **Parameter Optimization**: Obtain best parameter combinations by tweaking indicator settings like period and compression coefficient  

2. **Timeframe Optimization**: Test different periods (1min, 5min, 30min etc.) to find the optimal trading timeframe  

3. **Position Sizing Optimization**: Change per trade position size and ratio to find the ideal capital utilization plan  

4. **Stop Loss Optimization**: Adjust stop loss placement based on different trading instruments to achieve optimal risk-reward ratio  

5. **Condition Optimization**: Add/reduce indicator filters to obtain more accurate entry signals  

## Conclusion  

This strategy combines Boom Hunter, Hull Suite and Volatility Oscillator to implement multi-timeframe trend tracking trading, effectively identifying abrupt price behaviors suitable for highly volatile digital assets. With controllable risks, strong practicality and extensibility through parameter tuning, filter conditions and stop loss optimization, it is an exemplary quantitative model.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_1|0|Hull Variation: Hma|Thma|Ehma|
|v_input_2|200|Length(180-200 for floating S/R , 55 for swing entry)|
|v_input_3|2.4|Length multiplier (Used to view higher timeframes with straight band)|
|v_input_4|false|Show Hull MA from X timeframe? (good for scalping)|
|v_input_timeframe_1|240|Higher timeframe|
|v_input_5|80|volLength|
|v_input_int_1|20|(?Strategy: Risk Management)Swing High/Low Lookback Length|
|v_input_float_1|3|Account percent loss per trade|
|v_input_float_2|3|Profit Factor (R:R Ratio)|
|v_input_int_2|2022|(?Strategy: Date Range)Start Date|
|v_input_int_3|0|start_month: 1|2|3|4|5|6|7|8|9|10|11|12|
|v_input_int_4|0|start_date: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|
|v_input_int_5|2023|End Date|
|v_input_int_6|0|end_month: 1|2|3|4|5|6|7|8|9|10|11|12|
|v_input_int_7|0|end_date: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|
|v_input_bool_1|true|(?Main Settings)Square Line?|
|v_input_int_8|6|(?EOT 1 Main Oscillator)Quotient | LPPeriod|
|v_input_int_9|false|K1|
|v_input_int_10|true|Trigger Length|
|v_input_color_1|white|Trigger Color:|
|v_input_int_11|28|(?EOT 2 Red Wave)LPPeriod2|
|v_input_float_3|0.3|K2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-27 00:00:00
end: 2024-02-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// Strategy based on the 3 indicators:
//  - Boom Hunter Pro
//  - Hull Suite
//  - Volatility Oscillator
//
// Strategy was designed for the purpose of back testing. 
// See strategy documentation for info on trade entry logic.
// 
// Credits:
//  - Boom Hunter Pro: veryfid (https://www.tradingview.com/u/veryfid/)
//  - Hull Suite: InSilico (https://www.tradingview.com/u/InSilico/)
//  - Volatility Oscillator: veryfid (https://www.tradingview.com/u/veryfid/)

//@version=5
strategy("Boom Hunter + Hull Suite + Volatility Oscillator Strategy", overlay=false, initial_capital=1000, currency=currency.NONE, max_labels_count=500, default_qty_type=strategy.cash, commission_type=strategy.commission.percent, commission_value=0.01)

// =============================================================================
// STRATEGY INPUT SETTINGS
// =============================================================================

// ---------------
// Risk Management
// ---------------
swingLength = input.int(20, "Swing High/Low Lookback Length", group='Strategy: Risk Management', tooltip='Stop Loss is calculated by the swing high or low over the previous X candles')
accountRiskPercent = input.float(3, "Account percent loss per trade", step=0.1, group='Strategy: Risk Management', tooltip='Each trade will risk X% of the account balance')
profitFactor = input.float(3, "Profit Factor (R:R Ratio)", step = 0.1, group='Strategy: Risk Management')

// ----------
// Date Range
// ----------
start_year = input.int(title='Start Date', defval=2022, minval=2010, maxval=3000, group='Strategy: Date Range', inline='1')
start_month = input.int(title='', defval=1, group='Strategy: Date Range', inline='1', options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
start_date = input.int(title='', defval=1, group='Strategy: Date Range', inline='1', options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
end_year = input.int(title='End Date', defval=2023, minval=1800, maxval=3000, group='Strategy: Date Range', inline='2')
end_month = input.int(title='', defval=1, group='Strategy: Date Range', inline='2', options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
end_date = input.int(title='', defval=1, group='Strategy: Date Range', inline='2', options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
in_date_range = true

// =============================================================================
// INDICATORS
// =============================================================================

// ---------------
// Boom Hunter Pro
// ---------------
square = input.bool(true, title='Square Line?', group='Main Settings')
//Quotient
LPPeriod = input.int(6, title='Quotient | LPPeriod', inline='quotient', group='EOT 1 (Main Oscillator)')
K1 = input.int(0, title='K1', inline='quotient', group='EOT 1 (Main Oscillator)')
esize = 60  //, title = "Size", inline = "quotient2", group = "EOT 1 (Main Oscillator)")
ey = 50  //, title = "Y axis", inline = "quotient2", group = "EOT 1 (Main Oscillator)")
trigno = input.int(1, 'Trigger Length', group='EOT 1 (Main Oscillator)', inline='quotient2')
trigcol = input.color(color.white, title='Trigger Color:', group='EOT 1 (Main Oscillator)', inline='q2')

// EOT 2
//Inputs
LPPeriod2 = input.int(28, title='LPPeriod2', group='EOT 2 (Red Wave)', inline='q2')
K22 = input.float(0.3, title='K2', group='EOT 2 (Red Wave)', inline='q2')

//EOT 1
//Vars
alpha1 = 0.00
HP = 0.00
a1 = 0.00
b1 = 0.00
c1 = 0.00
c2 = 0.00
c3 = 0.00
Filt = 0.00
Peak = 0.00
X = 0.00
Quotient1 = 0.00
pi = 2 * math.asin(1)

//Highpass filter cyclic components
//whose periods are shorter than 100 bars
alpha1 := (math.cos(.707 * 2 * pi / 100) + math.sin(.707 * 2 * pi / 100) - 1) / math.cos(.707 * 2 * pi / 100)
HP := (1 - alpha1 / 2) * (1 - alpha1 / 2) * (close - 2 * nz(close[1]) + nz(close[2])) + 2 * (1 - alpha1) * nz(HP[1]) - (1 - alpha1) * (1 - alpha1) * nz(HP[2])

//SuperSmoother Filter
a1 := math.exp(-1.414 * pi / LPPeriod)
b1 := 2 * a1 * math.cos(1.414 * pi / LPPeriod)
c2 := b1
c3 := -a1 * a1
c1 := 1 - c2 - c3
Filt := c1 * (HP + nz(HP[1])) / 2 + c2 * nz(Filt[1]) + c3 * nz(Filt[2])

//Fast Attack - Slow Decay Algorithm
Peak := .991 * nz(Peak[1])
if math.abs(Filt) > Peak
    Peak := math.abs(Filt)
    Peak

//Normalized Roofing Filter
if Peak != 0
    X := Filt / Peak
    X

Quotient1 := (X + K1) / (K1 * X + 1)

// EOT 2
//Vars
alpha1222 = 0.00
HP2 = 0.00
a12 = 0.00
b12 = 0.00
c12 = 0.00
c22 = 0.00
c32 = 0.00
Filt2 = 0.00
Peak2 = 0.00
X2 = 0.00
Quotient4 = 0.00

alpha1222 := (math.cos(.707 * 2 * pi / 100) + math.sin(.707 * 2 * pi / 100) - 1) / math.cos(.707 * 2 * pi / 100)
HP2 := (1 - alpha1222 / 2) * (1 - alpha1222 / 2) * (close - 2 * nz(close[1]) + nz(close[2])) + 2 * (1 - alpha1222) * nz(HP2[1]) - (1 - alpha1222) * (1 - alpha1222) * nz(HP2[2])

//SuperSmoother Filter
a12 := math.exp(-1.414 * pi / LPPeriod2)
b12 := 2 * a12 * math.cos(1.414 * pi / LPPeriod2)
c22 := b12
c32 := -a12 * a12
c12 := 1 - c22 - c32
Filt2 := c12 * (HP2 + nz(HP2[1])) / 2 + c22 * nz(Filt2[1]) + c32 * nz(Filt2[2])

//Fast Attack - Slow Decay Algorithm
Peak2 := .991 * nz(Peak2[1])
if math.abs(Filt2) > Peak2
    Peak2 := math.abs(Filt2)
    Peak2

//Normalized Roofing Filter
if Peak2 != 0
    X2 := Filt2 / Peak2
    X2

Quotient4 := (X2 + K22) / (K22 * X2 + 1)
q4 = Quotient4 * esize + ey

//Plot EOT
q1 = Quotient1 * esize + ey
trigger = ta.sma(q1, trigno)
Plot3 = plot(trigger, color=trigcol, linewidth=2, title='Quotient 1')
Plot44 = plot(q4, color=color.new(color.red, 0), linewidth=2, title='Quotient 2')


// ----------
// HULL SUITE
// ----------

//INPUT
src = input(close, title='Source')
modeSwitch = input.string('Hma', title='Hull Variation', options=['Hma', 'Thma', 'Ehma'])
length = input(200, title='Length(180-200 for floating S/R , 55 for swing entry)')
lengthMult = input(2.4, title='Length multiplier (Used to view higher timeframes with straight band)')

useHtf = input(false, title='Show Hull MA from X timeframe? (good for scalping)')
htf = input.timeframe('240', title='Higher timeframe')

//FUNCTIONS
//HMA
HMA(_src, _length) =>
    ta.wma(2 * ta.wma(_src, _length / 2) - ta.wma(_src, _length), math.round(math.sqrt(_length)))
//EHMA    
EHMA(_src, _length) =>
    ta.ema(2 * ta.ema(_src, _length / 2) - ta.ema(_src, _length), math.round(math.sqrt(_length)))
//THMA    
THMA(_src, _length) =>
    ta.wma(ta.wma(_src, _length / 3) * 3 - ta.wma(_src, _length / 2) - ta.wma(_src, _length), _length)

//SWITCH
Mode(modeSwitch, src, len) =>
    modeSwitch == 'Hma' ? HMA(src, len) : modeSwitch == 'Ehma' ? EHMA(src, len) : modeSwitch == 'Thma' ? THMA(src, len / 2) : na

//OUT
_hull = Mode(modeSwitch, src, int(length * lengthMult))
HULL = useHtf ? request.security(syminfo.ticker, htf, _hull) : _hull
MHULL = HULL[0]
SHULL = HULL[2]

//COLOR
hullColor = MHULL > SHULL ? color.green : color.red

//PLOT
///< Frame
Fi1 = plot(-10, title='MHULL', color=hullColor, linewidth=2)

// -----------------
// VOLUME OSCILLATOR
// -----------------

volLength = input(80)
spike = close - open
x = ta.stdev(spike, volLength)
y = ta.stdev(spike, volLength) * -1
volOscCol = spike > x ? color.green : spike < y ? color.red : color.gray
plot(-30, color=color.new(volOscCol, transp=0), linewidth=2)


// =============================================================================
// STRATEGY LOGIC
// =============================================================================

// Boom Hunter Pro entry conditions
boomLong = ta.crossover(trigger, q4)
boomShort = ta.crossunder(trigger, q4)

// Hull Suite entry conditions
hullLong = MHULL > SHULL and close > MHULL
hullShort = MHULL < SHULL and close < SHULL

// Volatility Oscillator entry conditions
volLong = spike > x
volShort = spike < y

inLong = strategy.position_size > 0
inShort = strategy.position_size < 0

longCondition = boomLong and hullLong and volLong and in_date_range
shortCondition = boomShort and hullShort and volShort and in_date_range

swingLow = ta.lowest(source=low, length=swingLength)
swingHigh = ta.highest(source=high, length=swingLength)

atr = ta.atr(14)
longSl = math.min(close - atr, swingLow)
shortSl = math.max(close + atr, swingHigh)

longStopPercent = math.abs((1 - (longSl / close)) * 100)
shortStopPercent = math.abs((1 - (shortSl / close)) * 100)

longTpPercent = longStopPercent * profitFactor
shortTpPercent = shortStopPercent * profitFactor
longTp = close + (close * (longTpPercent / 100))
shortTp = close - (close * (shortTpPercent / 100))

// Position sizing (default risk 3% per trade)
riskAmt = strategy.equity * accountRiskPercent / 100
longQty = math.abs(riskAmt / longStopPercent * 100) / close
shortQty = math.abs(riskAmt / shortStopPercent * 100) / close

if (longCondition and not inLong)
    strategy.entry("Long", strategy.long, qty=longQty)
    strategy.exit("Long  SL/TP", from_entry="Long", stop=longSl, limit=longTp, alert_message='Long SL Hit')
    buyLabel = label.new(x=bar_index, y=high[1], color=color.green, style=label.style_label_up)
    label.set_y(id=buyLabel, y=-40)
    label.set_tooltip(id=buyLabel, tooltip="Risk Amt: " + str.tostring(riskAmt) + " Qty: " + str.tostring(longQty) + " Swing low: " + str.tostring(swingLow) + " Stop Percent: " + str.tostring(longStopPercent) + " TP Percent: " + str.tostring(longTpPercent))

if (shortCondition and not inShort)
    strategy.entry("Short", strategy.short, qty=shortQty)
    strategy.exit("Short  SL/TP", from_entry="Short", stop=shortSl, limit=shortTp, alert_message='Short SL Hit')
    sellLabel = label.new(x=bar_index, y=high[1], color=color.red, style=label.style_label_up)
    label.set_y(id=sellLabel, y=-40)
    label.set_tooltip(id=sellLabel, tooltip="Risk Amt: " + str.tostring(riskAmt) + " Qty: " + str.tostring(shortQty) + " Swing high: " + str.tostring(swingHigh) + " Stop Percent: " + str.tostring(shortStopPercent) + " TP Percent: " + str.tostring(shortTpPercent))

```

> Detail

https://www.fmz.com/strategy/442971

> Last Modified

2024-02-27 17:40:03
