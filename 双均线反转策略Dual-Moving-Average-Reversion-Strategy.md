
> Name

双均线反转策略Dual-Moving-Average-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/4e17f85adcfca6570f.png)
[trans]

## 概述

双均线反转策略(Dual Moving Average Reversion Strategy)是一种典型的短期反转交易策略。该策略运用两个不同参数设置的均线进行交易信号发出,在趋势出现反转的时候获取利润。

## 策略原理

该策略使用两个均线进行交易信号的生成。第一个均线maopening用于判断趋势方向,第二个均线maclosing用于发出交易信号。

当maopening上涨时,表示目前处于趋势上升阶段;当maopening下跌时,表示目前处于趋势下降阶段。maclosing乘以一个大于1的系数,使其更加灵敏,可以提前发出反转信号。

具体来说,当maopening上涨且maclosing下穿maopening时,表示趋势反转,这时策略会开仓做空;当maopening下跌且maclosing上穿maopening时,表示趋势反转,这时策略会开仓做多。

该策略的参数包括均线类型、长度、数据源等,可以通过调整这些参数来获得更好的交易效果。另外,策略还内置了一些可选项,如开仓方式、止损方式等,可以根据需要进行设置。

## 优势分析

双均线反转策略的优势主要包括:

1. 回撤小,适合短线交易。使用两个快速均线,可以快速捕捉短期趋势的反转,回撤较小。

2. 实现简单,容易掌握。双均线形成交叉就是交易信号,非常简单明了。

3. 可调参数多,可以优化。包含2个均线的参数及系数,可以通过优化找到最佳参数组合。

4. 可スケジュール化,适合自动化交易。策略逻辑简单清晰,执行频率高,非常适合编程实现自动交易。

5. 可控风险,具有止损机制。可设置移动止损或数值止损,可以控制单笔损失。

## 风险分析

双均线反转策略也存在一些风险:

1. 双均线交叉存在滞后。均线本身滞后于价格,交叉发生时趋势可能已经反转了一段时间。

2. 容易被套。趋势反转不一定能持续,可能很快再次反转回来,造成套牢。

3. 回撤依然存在。及时止损可以降低单笔损失,但连续止损也会造成较大回撤。

4. 数据优化风险。过度优化参数,在历史数据表现好但实盘效果不佳。

对应风险的解决方法包括:

1. 优化参数,找到快速响应的均线设置。

2. 结合其他指标避免套牢,如量价指标、波动率指标等。 

3. 调整止损位置,降低连续止损概率。

4. 多组参数优化测试,评估参数健壮性。

## 优化方向

双均线反转策略可以从以下几个方面进行优化:

1. 测试不同类型的均线,寻找反应更灵敏的均线。如Kama、ZLEMA等。

2. 优化均线参数,找到最佳长度组合。通常较短周期的均线效果更好。

3. 测试不同的数据源,如收盘价、均价、典型价等。

4. 增加趋势过滤,避免不合适的反转信号。可用Donchian通道等。

5. 结合其他指标进行确认,如量价指标MACD、OBV等。

6. 增加风险管理机制,如移动止损、账户最大损失等。

7. 进行组合优化,寻找最佳资产配置比例。

8. 增加参数健壮性测试,评估参数过优化风险。

## 总结

双均线反转策略是一个简单实用的短线策略,适合用于捕捉市场的短期反转。该策略回撤小、容易实现,非常适合定量交易。但也存在一些问题,如滞后、套牢等风险。可以通过优化参数、增加指标过滤、改进风险控制等方法来改进策略效果,开发出一个稳定、具有实盘效果的高效策略。

||

## Overview

The Dual Moving Average Reversion Strategy is a typical short-term mean reversion trading strategy. The strategy generates trading signals by two moving averages with different parameter settings. It aims to gain profits when trend reversal happens.

## Strategy Logic

The strategy uses two moving averages to generate trading signals. The first MA maopening is used to determine the trend direction. The second MA maclosing is used to generate trading signals.

When maopening goes up, it indicates the current market is in an uptrend. When maopening goes down, it indicates the current market is in a downtrend. maclosing is multiplied by a coefficient greater than 1 to make it more sensitive for generating early reversal signals.

Specifically, when maopening goes up and maclosing crosses below maopening, it indicates a trend reversal. The strategy will open short position. When maopening goes down and maclosing crosses above maopening, it indicates a trend reversal. The strategy will open long position.

The parameters of the strategy include MA type, length, data source etc. The trading performance can be optimized by adjusting these parameters. There are also some configurable options such as entry rule, stop loss etc.

## Advantage Analysis 

The main advantages of the Dual MA Reversion Strategy are:

1. Small drawdown, suitable for short-term trading. The fast moving averages can quickly capture short-term reversals with smaller drawdowns.

2. Simple to implement and easy to grasp. The crossover of two MAs generates clear trading signals.

3. Highly configurable with multiple adjustable parameters. The parameters of two MAs and coefficients can be optimized.

4. Easy to automate with clear logic flow. The simple logic and high frequency trading make it very suitable for automated trading.

5. Controllable risk with stop loss mechanism. Moving stop loss or value stop loss can limit the loss of single trade.

## Risk Analysis

There are also some risks of the strategy:

1. Lagging of MA crossover signals. The MAs themselves lag behind the price. The crossover may happen after the trend has reversed for some time.

2. Risk of whipsaw trades. The reversed trend may quickly reverse again, causing consecutive losses.

3. Drawdown still exists. Though stop loss limits the single loss, consecutive stop loss can still lead to large drawdowns.

4. Overfitting risk. Excessive parameter optimization may lead to overfitting and poor performance in live trading.

The solutions include:

1. Optimize parameters to find faster MAs. 

2. Add filters, like volume and volatility indicators, to avoid whipsaw trades.

3. Adjust stop loss position to lower the probability of consecutive stop loss. 

4. Robustness test of parameter sets to evaluate overfitting risks.

## Improvement Directions

The strategy can be further optimized in the following aspects:

1. Test different types of MAs to find more sensitive ones, like KAMA, ZLEMA etc.

2. Optimize MA lengths to find the optimal combination. Usually shorter periods have better performance.

3. Test different data sources, like close, median price, typical price etc. 

4. Add trend filter to avoid unsuitable reversal signals, like Donchian Channel.

5. Add other indicators for confirmation, like MACD, OBV etc.

6. Enhance risk management mechanisms, like moving stop loss, maximum account loss etc.

7. Portfolio optimization to find the optimal asset allocation.

8. Robustness test of parameters to evaluate overfitting risks.

## Conclusion

The Dual MA Reversion is a simple and practical short-term trading strategy. It is suitable for capturing short-term reversals with quantitative trading. However, risks like lagging and whipsaw trades exist. The strategy can be improved by optimizing parameters, adding filters, enhancing risk control etc. to develop a stable and efficient strategy with good real trading performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_2|true|long1on|
|v_input_float_2|0.96|Long|
|v_input_int_5|10|Lot 1|
|v_input_3|true|short1on|
|v_input_float_3|1.04|short|
|v_input_int_6|10|Lot 1|
|v_input_4|timestamp(01 Jan 2010 00:00 +0000)|Start date|
|v_input_5|timestamp(31 Dec 2030 23:59 +0000)|Final date|
|v_input_1|false|(?Options)Entry on close|
|v_input_int_1|false|| Offset View|
|v_input_int_2|false|Trade|
|v_input_bool_1|false|Use Kalman filter|
|v_input_string_1|0|(?MA Opening)maopeningtyp: SMA|EMA|TEMA|DEMA|ZLEMA|WMA|Hma|Thma|Ehma|H|L|DMA|
|v_input_source_1_ohlc4|0|maopeningsrc: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_int_3|3|maopeninglen|
|v_input_string_2|0|(?MA Closing)maclosingtyp: SMA|EMA|TEMA|DEMA|ZLEMA|WMA|Hma|Thma|Ehma|H|L|DMA|
|v_input_source_2_ohlc4|0|maclosingsrc: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_int_4|3|maclosinglen|
|v_input_float_1|true|mul|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-17 00:00:00
end: 2023-11-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title = "hamster-bot MRS 2", overlay = true, default_qty_type = strategy.percent_of_equity, initial_capital = 100, default_qty_value = 100, pyramiding = 9, commission_value = 0.045, backtest_fill_limits_assumption = 1)
info_options = "Options"

on_close = input(false, title = "Entry on close", inline=info_options, group=info_options)
OFFS = input.int(0, minval = 0, maxval = 1, title = "| Offset View", inline=info_options, group=info_options)
trade_offset = input.int(0, minval = 0, maxval = 1, title = "Trade", inline=info_options, group=info_options)
use_kalman_filter = input.bool(false, title="Use Kalman filter", group=info_options)

//MA Opening
info_opening = "MA Opening"
maopeningtyp = input.string("SMA", title="Type", options=["SMA", "EMA", "TEMA", "DEMA", "ZLEMA", "WMA", "Hma", "Thma", "Ehma", "H", "L", "DMA"], title = "", inline=info_opening, group=info_opening)
maopeningsrc = input.source(ohlc4, title = "", inline=info_opening, group=info_opening)
maopeninglen = input.int(3, minval = 1, maxval = 200, title = "", inline=info_opening, group=info_opening)

//MA Closing
info_closing = "MA Closing"
maclosingtyp = input.string("SMA", title="Type", options=["SMA", "EMA", "TEMA", "DEMA", "ZLEMA", "WMA", "Hma", "Thma", "Ehma", "H", "L", "DMA"], title = "", inline=info_closing, group=info_closing)
maclosingsrc = input.source(ohlc4, title = "", inline=info_closing, group=info_closing)
maclosinglen = input.int(3, minval = 1, maxval = 200, title = "", inline=info_closing, group=info_closing)
maclosingmul = input.float(1, step = 0.005, title = "mul", inline=info_closing, group=info_closing)

long1on    = input(true, title = "", inline = "long1")
long1shift = input.float(0.96, step = 0.005, title = "Long", inline = "long1")
long1lot   = input.int(10, minval = 0, maxval = 10000, step = 10, title = "Lot 1", inline = "long1")
short1on    = input(true, title = "", inline = "short1")
short1shift = input.float(1.04, step = 0.005, title = "short", inline = "short1")
short1lot   = input.int(10, minval = 0, maxval = 10000, step = 10, title = "Lot 1", inline = "short1")
startTime = input(timestamp("01 Jan 2010 00:00 +0000"), "Start date", inline = "period")
finalTime = input(timestamp("31 Dec 2030 23:59 +0000"), "Final date", inline = "period")

HMA(_src, _length) =>  ta.wma(2 * ta.wma(_src, _length / 2) - ta.wma(_src, _length), math.round(math.sqrt(_length)))
EHMA(_src, _length) =>  ta.ema(2 * ta.ema(_src, _length / 2) - ta.ema(_src, _length), math.round(math.sqrt(_length)))
THMA(_src, _length) =>  ta.wma(ta.wma(_src,_length / 3) * 3 - ta.wma(_src, _length / 2) - ta.wma(_src, _length), _length)
tema(sec, length)=>
    tema1= ta.ema(sec, length)
    tema2= ta.ema(tema1, length)
    tema3= ta.ema(tema2, length)
    tema_r = 3*tema1-3*tema2+tema3
donchian(len) => math.avg(ta.lowest(len), ta.highest(len))
ATR_func(_src, _len)=>
    atrLow = low - ta.atr(_len)
    trailAtrLow = atrLow
    trailAtrLow := na(trailAtrLow[1]) ? trailAtrLow : atrLow >= trailAtrLow[1] ? atrLow : trailAtrLow[1]
    supportHit = _src <= trailAtrLow
    trailAtrLow := supportHit ? atrLow : trailAtrLow
    trailAtrLow
f_dema(src, len)=>
    EMA1 = ta.ema(src, len)
    EMA2 = ta.ema(EMA1, len)
    DEMA = (2*EMA1)-EMA2
f_zlema(src, period) =>
    lag = math.round((period - 1) / 2)
    ema_data = src + (src - src[lag])
    zl= ta.ema(ema_data, period)
f_kalman_filter(src) =>
    float value1= na
    float value2 = na
    value1 := 0.2 * (src - src[1]) + 0.8 * nz(value1[1])
    value2 := 0.1 * (ta.tr) + 0.8 * nz(value2[1])
    lambda = math.abs(value1 / value2)
    alpha = (-math.pow(lambda, 2) + math.sqrt(math.pow(lambda, 4) + 16 * math.pow(lambda, 2)))/8
    value3 = float(na)
    value3 := alpha * src + (1 - alpha) * nz(value3[1])
//SWITCH
ma_func(modeSwitch, src, len, use_k_f=true) =>
      modeSwitch == "SMA"   ? use_kalman_filter and use_k_f ? f_kalman_filter(ta.sma(src, len))  : ta.sma(src, len) :
      modeSwitch == "RMA"   ? use_kalman_filter and use_k_f ? f_kalman_filter(ta.rma(src, len))  : ta.rma(src, len) :
      modeSwitch == "EMA"   ? use_kalman_filter and use_k_f ? f_kalman_filter(ta.ema(src, len))  : ta.ema(src, len) :
      modeSwitch == "TEMA"  ? use_kalman_filter and use_k_f ? f_kalman_filter(tema(src, len))    : tema(src, len):
      modeSwitch == "DEMA"  ? use_kalman_filter and use_k_f ? f_kalman_filter(f_dema(src, len))  : f_dema(src, len):
      modeSwitch == "ZLEMA" ? use_kalman_filter and use_k_f ? f_kalman_filter(f_zlema(src, len)) : f_zlema(src, len):
      modeSwitch == "WMA"   ? use_kalman_filter and use_k_f ? f_kalman_filter(ta.wma(src, len))  : ta.wma(src, len):
      modeSwitch == "VWMA"  ? use_kalman_filter and use_k_f ? f_kalman_filter(ta.vwma(src, len)) : ta.vwma(src, len):
      modeSwitch == "Hma"   ? use_kalman_filter and use_k_f ? f_kalman_filter(HMA(src, len))     : HMA(src, len):
      modeSwitch == "Ehma"  ? use_kalman_filter and use_k_f ? f_kalman_filter(EHMA(src, len))    : EHMA(src, len):
      modeSwitch == "Thma"  ? use_kalman_filter and use_k_f ? f_kalman_filter(THMA(src, len/2))  : THMA(src, len/2):
      modeSwitch == "ATR"   ? use_kalman_filter and use_k_f ? f_kalman_filter(ATR_func(src, len)): ATR_func(src, len) :
      modeSwitch == "L"   ? use_kalman_filter and use_k_f ? f_kalman_filter(ta.lowest(len)): ta.lowest(len) :
      modeSwitch == "H"   ? use_kalman_filter and use_k_f ? f_kalman_filter(ta.highest(len)): ta.highest(len) :
      modeSwitch == "DMA"   ? donchian(len) : na

//Var
sum = 0.0
maopening = 0.0
maclosing = 0.0
os = maopeningsrc
cs = maclosingsrc
pos = strategy.position_size
p = 0.0
p := pos == 0 ? (strategy.equity / 100) / close : p[1]
truetime = true
loss = 0.0
maxloss = 0.0
equity = 0.0

//MA Opening
maopening := ma_func(maopeningtyp, maopeningsrc, maopeninglen)

//MA Closing
maclosing := ma_func(maclosingtyp, maclosingsrc, maclosinglen) * maclosingmul

long1 = long1on == false ? 0 : long1shift == 0 ? 0 : long1lot == 0 ? 0 : maopening == 0 ? 0 : maopening * long1shift
short1 = short1on == false ? 0 : short1shift == 0 ? 0 : short1lot == 0 ? 0 : maopening == 0 ? 0 : maopening * short1shift
//Colors
maopeningcol = maopening == 0 ? na : color.blue
maclosingcol = maclosing == 0 ? na : color.fuchsia
long1col = long1 == 0 ? na : color.green
short1col = short1 == 0 ? na : color.red
//Lines
plot(maopening, offset = OFFS, color = maopeningcol)
plot(maclosing, offset = OFFS, color = maclosingcol)
long1line = long1 == 0 ? close : long1
short1line = short1 == 0 ? close : short1
plot(long1line, offset = OFFS, color = long1col)
plot(short1line, offset = OFFS, color = short1col)

//Lots
lotlong1 = p * long1lot
lotshort1 = p * short1lot

//Entry
if maopening > 0 and maclosing > 0 and truetime
    //Long
    sum := 0
    strategy.entry("L", strategy.long, lotlong1, limit = on_close ? na : long1, when = long1 > 0 and pos <= sum and (on_close ? close <= long1[trade_offset] : true))
    sum := lotlong1

    //Short
    sum := 0
    pos := -1 * pos
    strategy.entry("S", strategy.short, lotshort1, limit = on_close ? na : short1, when = short1 > 0 and pos <= sum and (on_close ? close >= short1[trade_offset] : true))
    sum := lotshort1

strategy.exit("Exit", na, limit = maclosing)
if time > finalTime
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/432418

> Last Modified

2023-11-17 16:56:24
