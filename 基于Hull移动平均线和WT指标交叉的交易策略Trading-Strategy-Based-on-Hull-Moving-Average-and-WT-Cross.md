
> Name

基于Hull移动平均线和WT指标交叉的交易策略Trading-Strategy-Based-on-Hull-Moving-Average-and-WT-Cross

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略主要融合了Hull移动平均线和WT指标的交叉信号,以发挥各自指标的优势,在趋势判断和入场时机选择上实现更准确的决策。

## 策略原理

该策略主要由Hull移动平均线和WT指标交叉信号组成。

Hull移动平均线部分,通过计算短期和长期Hull MA,并填充颜色来判断趋势方向。计算公式为:

短期Hull MA = WMA(2*WMA(n/2) - WMA(n), sqrt(n)) 

长期Hull MA = WMA(WMA(n/3)*3 - WMA(n/2), n/2)

其中WMA为加权移动平均线。当短期线上穿长期线时为看涨信号,否则为看跌信号。

WT指标部分,通过计算WT指标的多空均线,并观察均线的交叉情况来判断入场。计算公式为:

TCI = (Close - EMA(Close,n1)) / (k * STD(Close - EMA(Close,n1),n1)) 

WT1 = EMA(TCI,n2)

WT2 = SMA(WT1,m)

其中TCI为Trend Composite Index,反映价格与通道中线EMA的偏离程度;WT1为TCI的EMA平滑值,WT2为WT1的SMA值,m一般取4。当WT1上穿WT2时为多头信号,WT1下穿WT2时为空头信号。

综合Hull MA的趋势判断和WT指标的交叉信号,可以在趋势方向正确的前提下进入场内。

## 优势分析

该策略综合运用Hull MA和WT指标的优势,具有以下几点优势:

1. Hull MA通过修改移动平均线的计算方式,能更快捕捉价格变化趋势,并有效滤除市场噪音,判断趋势准确可靠。

2. WT指标利用通道内价格波动特性,能快速捕捉转折点,发出较准确的交易信号。

3. 两者结合使用,既考虑了趋势判断,也关注交叉信号,可在趋势面发力的同时控制风险。

4. Hull MA平滑参数和WT指标参数都可自定义设置,可以根据不同品种特性和交易偏好进行调整优化。

5. 可单独使用Hull MA或WT指标的交叉信号进行交易,也可以结合使用,兼顾趋势跟踪和交叉验证。

6. 可设置止损止盈策略,有效控制单笔交易风险。

## 风险分析

该策略主要存在以下几点风险:

1. Hull MA和WT指标都对价格进行了一定程度的模糊化处理,可能会稍有滞后,导致入场时机不够精确。

2. WT指标容易产生多头背驰和空头背驰的假信号,如果不结合趋势判断,会增加交易风险。

3. 参数设置不当也会对交易结果产生影响,需要根据品种特点不断测试优化。

4. 在趋势震荡的时候,止损可能被频繁触发,给交易带来一定损失。

对应风险,可以通过以下方法加以优化和改进:

1. 调整Hull MA和WT参数,找到最佳平衡点。也可以测试其它指标与Hull MA组合使用。

2. 增加趋势判断机制,避免WT指标在无明确趋势时的错误信号。

3. 利用回测和模拟交易找出最佳参数,并设置合理的止损幅度。

4. 在趋势不明朗时,降低仓位规模,或暂时不交易。

## 优化方向 

该策略可以从以下几个方向进行进一步优化:

1. 测试不同的移动平均线与WT指标组合,寻找更好的平衡点。如KAMA,TEMA等。

2. 增加其它指标判断,如震荡指标,Bollinger Bands等,提高决策准确性。

3.优化参数设置,通过回测和模拟寻找最佳参数组合。可建立参数优化程序,快速寻找最优参数。

4. 优化止损策略,如运用移动止损、振荡止损、由近及远止损等,降低止损被触发的概率。

5. 优化仓位管理策略,在趋势不明确时主动降低交易频率和仓位规模,减少风险。

6. 增加机器学习等高级技术,实现更智能的交易决策和参数自适应。

## 总结

该策略综合Hull MA平滑移动平均线和WT指标交叉特性,兼具趋势判断和交叉验证优势。在确保正确方向的前提下进行交易,可以有效控制风险。 通过优化参数设置、止损策略、仓位管理等方式,可以进一步提升策略的稳定性和交易效果。舍入其它指标判断和智能交易技术也是未来的优化方向。总体来说,该策略具有简单可靠、易优化等特点,是一种实用的趋势跟踪策略。

||


## Overview

This strategy mainly combines the Hull Moving Average and WT cross signals to leverage the advantages of each indicator for more accurate trend judgment and entry timing.

## Strategy Logic  

The strategy consists of the Hull Moving Average and WT cross signals.

The Hull Moving Average part calculates short-term and long-term Hull MAs and fills color to determine the trend direction. The formulas are:

Short Hull MA = WMA(2*WMA(n/2) - WMA(n), sqrt(n))

Long Hull MA = WMA(WMA(n/3)*3 - WMA(n/2), n/2)

Where WMA is the Weighted Moving Average. When the short MA crosses over the long MA, it is a bullish signal, otherwise a bearish signal.

The WT part calculates the WT lines and observes their crossings to determine entries. The formulas are: 

TCI = (Close - EMA(Close,n1)) / (k * STD(Close - EMA(Close,n1),n1))

WT1 = EMA(TCI,n2) 

WT2 = SMA(WT1,m)

Where TCI is the Trend Composite Index, reflecting the deviation of price from the EMA; WT1 is the EMA of TCI, WT2 is the SMA of WT1, m is usually 4. The crossing of WT1 over WT2 indicates a bullish signal, while the crossing of WT1 under WT2 indicates a bearish signal.

By combining the Hull MA trend judgment and the WT crossing signals, we can enter the market in the right direction.

## Advantage Analysis

The advantages of this strategy are:

1. Hull MA captures price changes faster by modifying the calculation, and filters out market noise effectively for reliable trend judgment.

2. WT uses the price fluctuation within the channel to capture turning points quickly and generate relatively accurate trading signals.

3. The combination considers both trend and crossing for better risk control when trend aligns. 

4. The Hull MA and WT parameters are customizable for adjustment and optimization based on symbol characteristics and trading preferences.

5. Hull MA and WT signals can be used alone or together for both trend following and crossing validation.

6. Stop loss and take profit can be set to effectively control single trade risks.

## Risk Analysis

The main risks of this strategy are:

1. Both Hull MA and WT smooth out prices to some extent, which may cause lagging entry signals.

2. WT may generate false bullish/bearish divergence signals without a clear trend.

3. Inappropriate parameter settings may impact trading performance and require ongoing optimization.

4. Stop loss may be triggered frequently during trend consolidations, causing some loss.

The risks can be addressed and optimized as follows:

1. Adjust Hull MA and WT parameters to find the optimal balance. Other indicators may also be tested with Hull MA.

2. Add trend validation mechanisms to avoid false WT signals without a confirmed trend.

3. Optimize parameters through backtesting and demo trading, and set reasonable stop loss ranges.

4. Reduce position sizes or stop trading when trend is unclear.

## Optimization Directions

The strategy can be further optimized from the following aspects:

1. Test different moving averages combined with WT, to find better balance, e.g. KAMA, TEMA etc.

2. Add other indicators such as oscillators, Bollinger Bands to improve decision accuracy. 

3. Optimize parameters through backtesting and demo trading. Build parameter optimization programs for fast tuning.

4. Optimize stop loss strategies e.g. trailing stop, volatility-based stop, moving from near to far etc., to reduce unwanted triggering.

5. Optimize position sizing strategies, reduce sizes and frequencies in unclear trends to lower risks.

6. Introduce machine learning and other advanced techniques for smarter trading decisions and adaptive parameters.

## Summary

This strategy combines the Hull MA smoothing and WT crossing strengths for both trend judgment and validation. Trading with confirmed direction helps control risks. Further improvements can be made on parameter optimization, stop loss strategies, position sizing etc. Integrating other indicators and intelligent techniques are also future optimization directions. Overall, this is a practical trend following strategy with simplicity, reliability and ease of optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|───────── SP/TP SETTINGS ─────────|
|v_input_2|true|Stop Loss On/Off?|
|v_input_float_1|5|Stop Loss|
|v_input_3|true|Take Profit On/Off?|
|v_input_float_2|10|Take Profit|
|v_input_4|false|──────── WT CROSS SETTINGS ────────|
|v_input_5|true|WT Cross On/Off?|
|v_input_6|false|Change WT Cross Method ( If WT Cross ON )|
|v_input_7|10|Channel Length|
|v_input_8|21|Average Length|
|v_input_9|false|──────── HULLMA SETTINGS ────────|
|v_input_10_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_11|24|Lookback|
|v_input_12|10000|Gain|
|v_input_13|true|Use Kahlman|
|v_input_14|false|───────── DATE SETTINGS ─────────|
|v_input_int_1|true|From Month|
|v_input_int_2|true|From Day|
|v_input_int_3|999|From Year|
|v_input_int_4|true|To Month|
|v_input_int_5|true|To Day|
|v_input_int_6|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// WT CROSS @author [© LazyBear]
// © pigsq
// @version=5

strategy("Kahlman HullMA / WT Cross Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=100)

_1 = input(false, '───────── SP/TP SETTINGS ─────────')

stoploss1 = input(title='Stop Loss On/Off?', defval=true)
stoploss = input.float(5, "Stop Loss", minval = 1, step = 1)/100
takeprofit1 = input(title='Take Profit On/Off?', defval=true)
takeprofit = input.float(10, "Take Profit", minval = 1, step = 1)/100

_2 = input(false, '──────── WT CROSS SETTINGS ────────')

wtcross = input(title='WT Cross On/Off?', defval=true)
wtcross2 = input(title='Change WT Cross Method ( If WT Cross ON )', defval=false)

/// WT CROSS ///

n1 = input(10, 'Channel Length')
n2 = input(21, 'Average Length')

ap = hlc3
esa = ta.ema(ap, n1)
r = ta.ema(math.abs(ap - esa), n1)
ci = (ap - esa) / (0.015 * r)
tci = ta.ema(ci, n2)

wt1 = tci
wt2 = ta.sma(wt1, 4)

/// WT CROSS ///

/// HULL TREND WITH KAHLMAN ///

_3 = input(false, '──────── HULLMA SETTINGS ────────')

srchull = input(hl2, 'Source')
lengthhull = input(24, 'Lookback')
gain = input(10000, 'Gain')
kh = input(true, 'Use Kahlman')

hma(_srchull, _lengthhull) =>
    ta.wma((2 * ta.wma(_srchull, _lengthhull / 2)) - ta.wma(_srchull, _lengthhull), math.round(math.sqrt(_lengthhull)))

hma3(_srchull, _lengthhull) =>
    p = lengthhull / 2
    ta.wma(ta.wma(close, p / 3) * 3 - ta.wma(close, p / 2) - ta.wma(close, p), p)

kahlman(x, g) =>
    kf = 0.0
    dk = x - nz(kf[1], x)
    smooth = nz(kf[1], x) + dk * math.sqrt(g / 10000 * 2)
    velo = 0.0
    velo := nz(velo[1], 0) + g / 10000 * dk
    kf := smooth + velo
    kf

a = kh ? kahlman(hma(srchull, lengthhull), gain) : hma(srchull, lengthhull)
b = kh ? kahlman(hma3(srchull, lengthhull), gain) : hma3(srchull, lengthhull)
c = b > a ? color.lime : color.red
crossdn = a > b and a[1] < b[1]
crossup = b > a and b[1] < a[1]

p1hma = plot(a, color=c, linewidth=1, title='Long Plot', transp=75)
p2hma = plot(b, color=c, linewidth=1, title='Short Plot', transp=75)
fill(p1hma, p2hma, color=c, title='Fill', transp=55)

/// HULL TREND WITH KAHLMAN ///

/// DATE ///

_4 = input(false, '───────── DATE SETTINGS ─────────')

FromMonth = input.int(defval=1, title='From Month', minval=1, maxval=12)
FromDay = input.int(defval=1, title='From Day', minval=1, maxval=31)
FromYear = input.int(defval=999, title='From Year', minval=999)
ToMonth = input.int(defval=1, title='To Month', minval=1, maxval=12)
ToDay = input.int(defval=1, title='To Day', minval=1, maxval=31)
ToYear = input.int(defval=9999, title='To Year', minval=999)
start = timestamp(FromYear, FromMonth, FromDay, 00, 00)
finish = timestamp(ToYear, ToMonth, ToDay, 23, 59)
window() =>
    time >= start and time <= finish ? true : false

/// DATE ///

/// LONG/SHORT CONDITION ///

longCondition = crossup and ta.crossover(wt1,wt2)
longCondition1 = crossup
longCondition2 = crossup and wt1 > wt2

if (wtcross == true ? longCondition : wtcross == false ? longCondition1:na)
    strategy.entry("LONG", strategy.long, when=window(), comment="Enter Long")
else if (wtcross2 == true ? longCondition2 : wtcross2 == false ? longCondition:na)
    strategy.entry("LONG", strategy.long, when=window(), comment="Enter Long")
    
shortCondition = crossdn and ta.crossunder(wt1,wt2)
shortCondition1 = crossdn
shortCondition2 = crossdn and wt1 < wt2

if (wtcross == true ? shortCondition : wtcross == false ? shortCondition1:na)
    strategy.entry("SHORT", strategy.short, when=window(), comment="Enter Short")
else if (wtcross2 == true ? shortCondition2 : wtcross2 == false ? shortCondition:na)
    strategy.entry("LONG", strategy.long, when=window(), comment="Enter Short")

/// LONG/SHORT CONDITION ///

/// CLOSE STRATEGY ///

strategy.close("LONG", when=wtcross == true ? shortCondition : wtcross == false ? shortCondition1:na, comment = "Close Long")
strategy.close("SHORT", when=wtcross == true ? longCondition : wtcross == false ? longCondition1:na, comment = "Close Short")

/// EXIT STRATEGY ///

strategy.exit("LONG", when=strategy.position_size > 0, stop=stoploss1 == true ? strategy.position_avg_price * (1 - stoploss):na, limit=takeprofit1 == true ? strategy.position_avg_price * (1 + takeprofit):na, comment="Exit Long")
strategy.exit("SHORT", when=strategy.position_size < 0, stop=stoploss1 == true ? strategy.position_avg_price * (1 + stoploss):na, limit=takeprofit1 == true ? strategy.position_avg_price * (1 - takeprofit):na, comment ="Exit Short")

/// LONG SL/TP LINE ///

plot(strategy.position_size > 0 ? strategy.position_avg_price * (1 - stoploss) : na, title='Long Stop Loss', color=stoploss1 == true ? color.new(color.red, 0):na, style=plot.style_linebr)
plot(strategy.position_size > 0 ? strategy.position_avg_price * (1 + takeprofit) : na, title='Long Take Profit', color=takeprofit1 == true ? color.new(color.green, 0):na, style=plot.style_linebr)

/// LONG SL/TP LINE ///

/// SHORT SL/TP LINE ///

plot(strategy.position_size < 0 ? strategy.position_avg_price * (1 + stoploss) : na, title='Short Stop Loss', color=stoploss1 == true ? color.new(color.red, 0):na, style=plot.style_linebr)
plot(strategy.position_size < 0 ? strategy.position_avg_price * (1 - takeprofit) : na, title='Short Take Profit', color=takeprofit1 == true ? color.new(color.green, 0):na, style=plot.style_linebr)

/// SHORT SL/TP LINE ///

```

> Detail

https://www.fmz.com/strategy/427921

> Last Modified

2023-09-26 20:00:32
