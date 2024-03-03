
> Name

突破带固定止损策略Breakout-Band-Fixed-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13c2c9c2cb70a5b92e8.png)

[trans]

## 概述

这个策略的主要思想是利用突破带识别趋势方向,结合固定止损进行风险管理。策略首先计算一定周期内的最高价和最低价,形成突破带。当价格突破突破带时产生交易信号。此外,策略允许交易者设置固定止损金额。每次交易时,系统会根据固定止损金额反向计算交易数量,从而实现每单固定损失。

## 策略原理

该策略主要由四个部分组成:仓位管理、突破带识别、止损设定和数量计算。

首先,策略要判断当前是否持有仓位。如果已持有仓位,则不产生新信号。

其次,策略会计算一定周期内的最高价和最低价,形成突破带。当价格从突破带内部突破到外部时,产生交易信号。具体来说,如果价格突破突破带上轨,产生做多信号;如果价格突破突破带下轨,产生做空信号。

此外,做多信号产生时,策略会将突破带中点设定为止损位。做空信号产生时,也会设定止损位。为了进行追踪止损,策略还会在持仓期间实时调整止损位。

最后,策略允许设定固定止损金额。当信号产生时,策略会计算止损点到当前价格的点数距离,再结合报价单位、汇率等因素,计算出止损点间的价格变动所代表的金额。然后根据固定止损额反向计算交易数量。

以上就是策略的主要原理。通过突破带识别趋势方向,并利用固定止损进行风险控制,这是该策略的核心思想。

## 优势分析

这种突破带固定止损策略具有以下优势:

1. 止损思想先进。策略采用固定止损金额而不是固定止损距离。这避免了不同品种间由于点值不同带来的无法固定风险的问题。从风险管理角度看,固定金额止损更先进。

2. 数量计算合理。策略能够根据固定止损金额智能计算交易数量,使得每单损失可控,从而对风险敞口进行合理控制。

3. 突破识别简单有效。突破带的识别方式简单直接,能够有效识别趋势方向。与仅突破某价格级别相比,这样的突破带识别可避免更多脱离趋势方向的假信号。

4. 追踪止损增加获利。策略能够实时调整止损位置,进行追踪止损,帮助锁定更多利润。

5. 适用范围广泛。策略适用于任何品种,只要设置好参数,就可以进行固定金额止损的风险控制,从而具有非常广泛的适用性。

6. 代码结构清晰。策略代码结构合理清晰,各功能模块解耦良好,便于理解及后续优化。

## 风险分析

尽管该策略具有上述优势,但仍存在一定风险需要注意:

1. 突破形态质量无法判断。策略中无法判断突破的形态质量,可能产生一些低质量的信号。需要结合其它指标进行过滤。

2. 固定止损可能过于机械。市场价格往往具有跳空行情的特点,固定止损可能会过于依赖规则,无法灵活调整。

3. 无法限制交易频率。策略无法限制交易频率,可能会过于频繁出场。需要结合其它规则限制频率。

4. 固定止损依赖参数设定。固定止损额的设定关乎整体敞口控制,需要根据资金规模、风险偏好等多方面进行合理设置。

5. 突破方向可能产生错误信号。当价格出现震荡或回调时,可能会产生错误的突破信号。需要结合多重条件进行优化。

6. 缺乏止盈设定。策略当前没有止盈机制,无法主动确定利润。这可能导致利润不理想。

针对上述风险,我们可以从以下几个方面进行优化:

1. 添加指标进行形态判断,过滤信号质量。例如MACD、KD等。

2. 结合突破强度指标评估突破质量。例如通过成交量变化判断突破强弱。

3. 增加开仓频率限制。例如每天只交易一次或类似规则。

4. 优化固定止损设定逻辑。例如根据特定阈值改为百分比止损等。

5. 增加其它过滤条件。例如增强止损、价格波动率等。

6. 添加止盈策略。例如靠近阻力位时止盈。

## 优化方向

根据上述分析,该策略可以从以下几个方面进行优化:

1. 增加过滤条件,提高信号质量。可以加入多种技术指标,判断趋势质量,避免不理想的突破信号。还可以判断突破强度。

2. 优化止损策略,使之更灵活。可以在突破回调一定距离后改为比例止损。也可以根据波动率实时优化止损距离。

3. 控制交易频率,避免过度交易。可以针对时间段或次数设置过滤条件,降低交易频率。

4. 结合趋势判断指标,改进入场时机选择。例如优化为在趋势确认后再入场。

5. 优化止盈策略,提高盈利能力。可以设定目标利润、移动止盈、波动止盈等方式。

6. 优化风险参数设定。可以根据回测结果设定更优的参数组合,如固定止损金额、突破周期等。

7. 改进代码结构,增强可扩展性。将信号生成、过滤、风控、盈利等模块进行进一步解耦。

8. 测试更多品种套利空间。评估不同品种组合的套利优势。

通过以上多方面优化,可以进一步增强该突破止损策略的稳定性和盈利能力。同时也为未来扩展到更多策略组合搭建基础。

## 总结

该策略整体思路合理,采用突破带识别趋势,并利用固定金额止损进行风险控制。这在风险管理上具有进步性。同时计算交易数量的思路也较为合理,能够对每单亏损进行控制。但策略可以通过多方面优化以提高信号质量、止损策略的灵活性、盈利水平等。如果结合趋势判断指标进行过滤,改进止盈方式,并严格控制交易频率,该策略的效果还具有很大提升空间。整体来说,该策略提供了一套可供学习的风险管理和数量计算方法,为进一步研究套利和多策略组合搭建了基础。

|| 

## Overview

The main idea of this strategy is to use the breakout band to identify trend direction and combine fixed stop loss for risk management. The strategy first calculates the highest and lowest prices over a certain period to form a breakout band. When the price breaks through the breakout band, a trading signal is generated. In addition, the strategy allows traders to set a fixed stop loss amount. Each time a trade is placed, the system will calculate the position size based on the fixed stop loss amount, so that each loss is fixed.

## Strategy Principle 

The strategy consists of four main parts: position management, breakout band identification, stop loss setting and position sizing.

Firstly, the strategy checks if there is any open position. If there is, no new signals will be generated.

Secondly, the strategy calculates the highest and lowest prices over a period to form a breakout band. When the price breaks out of the band, a trading signal is generated. Specifically, if the price breaks above the upper band, a long signal is generated. If the price breaks below the lower band, a short signal is generated.

In addition, when a long signal is generated, the strategy sets the midpoint of the breakout band as the stop loss. The same goes for short signals. To trail the stop loss, the strategy also adjusts the stop loss in real-time when in position. 

Finally, the strategy allows setting a fixed stop loss amount. When a signal is generated, the strategy calculates the number of pips from stop loss to current price, and combines factors like tick size and exchange rate, to determine the price change between stop loss and current price in monetary terms. The position size is then calculated based on the fixed stop loss amount.

Above are the main principles of the strategy. Identifying trend direction with breakout bands and controlling risk with fixed stop loss are the core concepts.

## Advantages

This breakout band fixed stop loss strategy has the following advantages:

1. Advanced stop loss concept. The strategy uses fixed stop loss amount instead of fixed stop loss distance. This avoids the problem of unable to fix risk across products with different tick values. From a risk management perspective, fixed monetary stop loss is more advanced.

2. Reasonable position sizing. The strategy can intelligently calculate position size based on the fixed stop loss amount, so that the loss per trade is controlled, thereby reasonably managing risk exposure.

3. Simple and effective breakout identification. Identifying breakout with bands is simple and direct, and can effectively identify trend direction. Compared to breakout of a single price level, this breakout band identification can avoid more false signals away from the trend. 

4. Trailing stop loss increases profit. The strategy's ability to adjust stop loss in real-time for trailing stop loss helps lock in more profits.

5. Wide applicability. The strategy is applicable to any products. As long as parameters are set properly, fixed amount stop loss risk control can be achieved, making the strategy highly versatile.

6. Clean code structure. The code structure is clear and modular, making it easy to understand and optimize.

## Risks

Despite the advantages, there are some risks to note for the strategy:

1. Breakout pattern quality untested. The strategy does not judge breakout pattern quality and may generate some low quality signals. Other indicators are needed to filter signals.

2. Fixed stop loss may be too mechanical. Market prices often gap. Fixed stop loss may rely too much on rules and lacks flexibility in adjustment. 

3. No limit on trade frequency. The strategy does not limit trade frequency and may trade too often. Other rules are needed to limit frequency.

4. Fixed stop loss depends on parameter setting. Setting fixed stop loss amount is crucial for overall risk control and needs to consider capital size, risk appetite etc.

5. Breakout direction may give wrong signals. Wrong breakout signals may occur during price oscillations or pullbacks. More conditions are needed to optimize the strategy. 

6. No profit taking mechanism. The strategy currently has no profit taking capability to actively lock in profits. This may lead to unsatisfactory profits.

To address these risks, some ways to optimize the strategy include:

1. Adding indicators to filter signal quality, e.g. MACD, KD etc. 

2. Incorporating breakout strength indicators to evaluate quality. For example, judging strength through volume changes.

3. Adding open trade frequency limits, e.g. one trade per day.

4. Optimizing fixed stop loss logic, e.g. percentage-based stop loss above a threshold. 

5. Adding other filters, e.g. volatility, enhance stop loss etc. 

6. Incorporating profit taking strategies, e.g. taking profit near resistance.

## Optimization Directions

Based on the analysis, the strategy can be optimized in the following aspects:

1. Adding filters to improve signal quality using multiple technical indicators and assessing trend quality. Also judging breakout strength.

2. Optimizing stop loss for more flexibility. Can switch to percentage-based trailing stop after a certain retracement. Can also optimize dynamically based on volatility.

3. Controlling trade frequency to avoid over-trading by adding filters on time periods or frequency.

4. Incorporating trend indicators to improve timing, e.g. waiting for trend confirmation. 

5. Optimizing profit taking strategies to improve profitability via profit target, trailing profit stop, volatility stop etc.

6. Optimizing risk parameters based on backtests, such as fixed stop amount, breakout period etc.

7. Refactoring code for better extensibility by further decoupling signal, filter, risk, profit modules. 

8. Testing more products for arbitrage opportunities. Evaluate advantage across different product combinations.

Through these optimization dimensions, the breakout stop loss strategy can become more robust and profitable. It also lays the foundation for expanding into more strategy combinations.

## Conclusion

Overall the strategy is reasonable in using breakout bands to identify trends and fixed amount stops for risk control. The concepts are progressive for risk management. The position sizing logic is also sound for controlling loss per trade. But the strategy can be enhanced through various optimizations to improve signal quality, flexibility in stop loss, profitability etc. By incorporating trend filters, improving profit taking, and strictly controlling trade frequency, significant improvement can be achieved. In conclusion, the strategy provides a framework for learning risk management and position sizing techniques, laying the groundwork for further research into more complex arbitrage and multi-strategy systems.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|(?Money management)Risk price for each entry|
|v_input_2|0|Deposit currency: USD|
|v_input_3|100|(?Entry strategy)Entry band bar count|
|v_input_4|2018|(?Backtesting range)From Year|
|v_input_5|true|From Month|
|v_input_6|true|From Day|
|v_input_7|2020|To Year|
|v_input_8|12|To Month|
|v_input_9|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-26 00:00:00
end: 2023-10-28 03:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
//@version=4
//@author=Takazudo

strategy("Fixed price SL",
  overlay=true,
  default_qty_type=strategy.fixed,
  initial_capital=0,
  currency=currency.USD)

var COLOR_TRANSPARENT = color.new(#000000, 100)
var COLOR_ENTRY_BAND = color.new(#43A6F5, 30)

//============================================================================
// config
//============================================================================

// Money management
_g1 = 'Money management'
var config_riskPrice = input(100, minval=1, title="Risk price for each entry", group=_g1)
var config_depositCurrency = input(title="Deposit currency", type=input.string, defval="USD", options=["USD"], group=_g1)

// Entry strategy
_g2 = 'Entry strategy'
var config_entryBandBars = input(defval = 100, title = "Entry band bar count",  minval=1, group=_g2)

// Backtesting range
_g3 = 'Backtesting range'
fromYear  = input(defval = 2018, title = "From Year",  minval = 1970, group=_g3)
fromMonth = input(defval = 1,    title = "From Month", minval = 1, maxval = 12, group=_g3)
fromDay   = input(defval = 1,    title = "From Day",   minval = 1, maxval = 31, group=_g3)
toYear  = input(defval = 2020, title = "To Year",  minval = 1970, group=_g3)
toMonth = input(defval = 12,    title = "To Month", minval = 1, maxval = 12, group=_g3)
toDay   = input(defval = 31,    title = "To Day",   minval = 1, maxval = 31, group=_g3)

//============================================================================
// exchange caliculations
//============================================================================

// mico pip size caliculation
// ex1: AUDCAD -> 0.0001
// ex2: USDJPY -> 0.01
f_calcMicroPipSize() =>
    _base = syminfo.basecurrency
    _quote = syminfo.currency
    _result = 0.0001
    if _quote == 'JPY'
        _result := _result * 100
    if _base == 'BTC'
        _result := _result * 100
    _result

// convert price to pips
f_convertPriceToPips(_price) =>
    _microPipSize = f_calcMicroPipSize()
    _price / _microPipSize

// caliculate exchange rate between deposit and quote currency
f_calcDepositExchangeSymbolId() =>
    _result = ''
    _deposit = config_depositCurrency
    _quote = syminfo.currency
    if (_deposit == 'USD') and (_quote == 'USD')
        _result := na
    if (_deposit == 'USD') and (_quote == 'AUD')
        _result := 'OANDA:AUDUSD'
    if (_deposit == 'EUR') and (_quote == 'USD')
        _result := 'OANDA:EURUSD'
    if (_deposit == 'USD') and (_quote == 'GBP')
        _result := 'OANDA:GBPUSD'
    if (_deposit == 'USD') and (_quote == 'NZD')
        _result := 'OANDA:NZDUSD'
    if (_deposit == 'USD') and (_quote == 'CAD')
        _result := 'OANDA:USDCAD'
    if (_deposit == 'USD') and (_quote == 'CHF')
        _result := 'OANDA:USDCHF'
    if (_deposit == 'USD') and (_quote == 'JPY')
        _result := 'OANDA:USDJPY'
    _result

// Let's say we need CAD to USD exchange
// However there's only "OANDA:USDCAD" symbol.
// Then we need to invert the exhchange rate.
// this function tells us whether we should invert the rate or not
f_calcShouldInvert() =>
    _result = false
    _deposit = config_depositCurrency
    _quote = syminfo.currency
    if (_deposit == 'USD') and (_quote == 'CAD')
        _result := true
    if (_deposit == 'USD') and (_quote == 'CHF')
        _result := true
    if (_deposit == 'USD') and (_quote == 'JPY')
        _result := true
    _result

// caliculate how much quantity should I buy or sell
f_calcQuantitiesForEntry(_depositExchangeRate, _slPips) =>
    _microPipSize = f_calcMicroPipSize()
    _priceForEachPipAsDeposit = _microPipSize * _depositExchangeRate
    _losePriceOnSl = _priceForEachPipAsDeposit * _slPips
    floor(config_riskPrice / _losePriceOnSl)

//============================================================================
// Quantity caliculation
//============================================================================

depositExchangeSymbolId = f_calcDepositExchangeSymbolId()

// caliculate deposit exchange rate
rate = security(depositExchangeSymbolId, timeframe.period, hl2)
shouldInvert = f_calcShouldInvert()
depositExchangeRate = if config_depositCurrency == syminfo.currency
    // if USDUSD, no exchange of course
    1
else
    // else, USDCAD to CADUSD invert if we need
    shouldInvert ? (1 / rate) : rate

//============================================================================
// Range Edge caliculation
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
// SL & Quantity
//============================================================================

var sl_long = hl2
var sl_short = hl2

entryQty = 0
slPips = 0.0

// just show info bubble
f_showEntryInfo(_isLong) =>
    _str =
      'SL pips: ' + tostring(slPips) + '\n' +
      'Qty: ' + tostring(entryQty)
    _bandHeight = entryBand_high - entryBand_low
    _y = _isLong ? (entryBand_low + _bandHeight * 1/4) : (entryBand_high - _bandHeight * 1/4)
    _style = _isLong ? label.style_label_up : label.style_label_down
    label.new(bar_index, _y, _str, size=size.large, style=_style)

if shouldMakeEntryLong
    sl_long := (entryBand_high + entryBand_low) / 2
    slPips := f_convertPriceToPips(close - sl_long)
    entryQty := f_calcQuantitiesForEntry(depositExchangeRate, slPips)
if shouldMakeEntryShort
    sl_short := (entryBand_high + entryBand_low) / 2
    slPips := f_convertPriceToPips(sl_short - close)
    entryQty := f_calcQuantitiesForEntry(depositExchangeRate, slPips)

// trailing SL
if strategy.position_size > 0
    sl_long := max(sl_long, entryBand_low)
if strategy.position_size < 0
    sl_short := min(sl_short, entryBand_high)

//============================================================================
// backtest duration
//============================================================================

// Calculate start/end date and time condition
startDate  = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear,   toMonth,   toDay,   00, 00)

//============================================================================
// make entries
//============================================================================

if (true)
    if shouldMakeEntryLong
        strategy.entry(id="Long", long=true, stop=close, qty=entryQty)
        f_showEntryInfo(true)
    if shouldMakeEntryShort
        strategy.entry(id="Short", long=false, stop=close, qty=entryQty)
        f_showEntryInfo(false)

strategy.exit('Long-SL/TP', 'Long', stop=sl_long)
strategy.exit('Short-SL/TP', 'Short', stop=sl_short)

//============================================================================
// plot misc
//============================================================================

sl = strategy.position_size > 0 ? sl_long :
  strategy.position_size < 0 ? sl_short : na

plot(sl, color=color.red, style=plot.style_cross, linewidth=2, title="SL")

value_bgcolor = rangeBreakDetected_long ? color.green :
  rangeBreakDetected_short ? color.red : COLOR_TRANSPARENT

bgcolor(value_bgcolor, transp=95)

```

> Detail

https://www.fmz.com/strategy/430975

> Last Modified

2023-11-03 14:31:21
