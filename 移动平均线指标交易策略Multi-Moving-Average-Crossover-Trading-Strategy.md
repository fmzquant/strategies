
> Name

移动平均线指标交易策略Multi-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c20bbc1803d2d2cc8f.png)
[trans]

## 策略概述
该策略是基于多个移动平均线指标来产生交易信号的策略。策略会同时关注短期、中期和长期移动平均线,根据它们的交叉情况来判断趋势方向并产生交易信号。

## 策略名称
多重均线交叉策略(Multi Moving Average Crossover Strategy)

## 策略原理
该策略同时使用 3 条不同周期的移动平均线,包括 7 日线、13 日线和 21 日线。其交易逻辑基于以下几点:

1. 当短期 7 日线上穿中期 13 日线,长期 21 日线处于上升趋势时,产生做多信号;
2. 当短期 7 日线下穿中期 13 日线,长期 21 日线处于下降趋势时,产生做空信号。

通过结合不同时间段的移动平均线,可以更准确判断市场趋势,避免错误交易。

## 策略优势
1. 使用多组移动平均线,可以更准确判断市场走势,避免被市场中的假突破或短期波动误导。
2. 只在趋势明确时才产生信号,可以减少不必要的交易次数,从而降低交易成本。
3. 参数设置灵活,可以根据个人偏好调整移动平均线的周期,适应不同品种和市场环境。

## 策略风险
1. 在震荡调整的市场中,可能出现频繁的错误信号。
2. 移动平均线作为趋势跟随指标,无法准确定位转折点。
3. 移动平均线交叉延迟识别趋势,可能错过部分利润。
4. 可通过引入其他技术指标验证信号,优化移动平均线参数来降低风险。

## 策略优化方向
1. 考虑引入波动率指标,判断趋势强度,避免在震荡市场中交易。
2. 尝试运用机器学习等定量技术自动优化移动平均线参数。
3. 增加止损策略,在亏损扩大时及时止损。
4. 考虑在移动平均线交叉时,利用限价单减少滑点。

## 总结
该策略结合短中长三个时间段的移动平均线,根据它们的交叉关系判断市场趋势,是一个相对稳定和高效的趋势跟随策略。通过对指标参数、止损机制以及下单方式的优化,可以进一步提高策略的胜率和盈利能力。

||


## Strategy Overview  
This strategy generates trading signals based on multiple moving average indicators. It monitors short-term, medium-term and long-term moving averages simultaneously, and generates trading signals according to their crossover situations to determine trend direction.   

## Strategy Name  
Multi Moving Average Crossover Strategy  

## Strategy Logic  
This strategy employs 3 moving averages with different periods, including 7-day, 13-day and 21-day lines. The trading logic is based on the following points:  

1. When the short-term 7-day MA crosses over the medium-term 13-day MA upwards, while the long-term 21-day MA is in an upward trend, a long signal is generated.  
2. When the short-term 7-day MA crosses below the medium-term 13-day MA downwards, while the long-term 21-day MA is in a downward trend, a short signal is generated.  

By combining moving averages across different timeframes, the strategy can judge market trends more precisely and avoid false trades.   

## Advantages  
1. Using multiple MA lines can better determine market moves and avoid being misguided by false breakouts or short-term fluctuations in the market.
2. Signals are only generated when the trend is clear, thus reducing unnecessary trades and lowering transaction costs.  
3. Flexible parameter settings - the periods of the MAs can be adjusted based on personal preference to suit different products and market environments.   

## Risks
1. Frequent false signals may occur in a ranging, choppy market.  
2. MAs as trend-following indicators cannot accurately locate turning points.   
3. Delayed signal by MA crossovers may miss part of the profits.  
4. Risks can be reduced by introducing other technical indicators for signal validation and optimizing MA parameters.   

## Optimization Directions  
1. Consider incorporating volatility indicators to gauge trend strength and avoid trading in choppy markets.  
2. Try applying machine learning models to auto-optimize MA parameters. 
3. Add stop loss strategies to cut losses in time when drawdowns expand.
4. Use limit orders when MA crossover happens to reduce slippage.  

## Conclusion
This strategy combines short-term, medium-term and long-term MAs to determine market trend based on their crossover relations, making it a relatively stable and efficient trend-following strategy. Further improvements in indicator parameters, stop loss mechanisms and order placement can help increase win rate and profitability.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2015|From Year|
|v_input_4|true|To Day|
|v_input_5|true|To Month|
|v_input_6|2030|To Year|
|v_input_7|false|Signals from Heikin Ashi Candles|
|v_input_8|0|MA Type: SMMA|EMA|WMA|VWMA|HMA|SMA|DEMA|
|v_input_9_ohlc4|0|src: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_10|7|Short MA Length|
|v_input_11|13|Middle MA Length|
|v_input_12|21|Long MA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-29 00:00:00
end: 2023-12-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Crypto-Oli

//@version=4
strategy("CryptOli 3 MAs long/short Backtest", initial_capital=5000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, overlay=true)

// this is an educational Script - basicly its very simple - you can see how minimal changes impact results, thats why i posted it
// Credits to Quantnomad to publish tons of free educational script
// this Script is based on https://www.tradingview.com/script/0NgUadGr-Ultimate-MA-Cross-Indicator/ Quantnomads Ultimate MA Indicator 
// HA - Option for calcucaltion based on HA-Candles (very famous recently)
// Source Input - Option (Candletype for calculation, close, ohlc4 ect.) --- there are huge differences --- try it by your own

////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE

// From Date Inputs
fromDay = input(defval=1, title="From Day", minval=1, maxval=31)
fromMonth = input(defval=1, title="From Month", minval=1, maxval=12)
fromYear = input(defval=2015, title="From Year", minval=1970)

// To Date Inputs
toDay = input(defval=1, title="To Day", minval=1, maxval=31)
toMonth = input(defval=1, title="To Month", minval=1, maxval=12)
toYear = input(defval=2030, title="To Year", minval=1970)

// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = time >= startDate and time <= finishDate

////////////////////////////////////////////////////////////////////////////////

h = input(false, title = "Signals from Heikin Ashi Candles")

ma_type      = input(title = "MA Type",         type = input.string,  defval = "SMMA", options = ['SMA', 'EMA', 'WMA', 'VWMA', 'HMA', 'SMMA', 'DEMA'])
src = input(ohlc4)

short_ma_len = input(title = "Short MA Length", type = input.integer, defval = 7,     minval = 1)
short_ma_src = h ? security(heikinashi(syminfo.tickerid), timeframe.period, src, lookahead = false) : close
middle_ma_len  = input(title = "Middle MA Length",  type = input.integer, defval = 13,    minval = 2)
middle_ma_src = h ? security(heikinashi(syminfo.tickerid), timeframe.period, src, lookahead = false) : close
long_ma_len  = input(title = "Long MA Length",  type = input.integer, defval = 21,    minval = 2)
long_ma_src = h ? security(heikinashi(syminfo.tickerid), timeframe.period, src, lookahead = false) : close


tick_round(x) => 
    round(x / syminfo.mintick) * syminfo.mintick

// Set initial values to 0
short_ma = 0.0
middle_ma = 0.0
long_ma  = 0.0

// Simple Moving Average (SMA)
if ma_type == 'SMA' 
    short_ma := sma(short_ma_src, short_ma_len)
    middle_ma := sma(middle_ma_src, middle_ma_len)
    long_ma  := sma(long_ma_src,  long_ma_len)

// Exponential Moving Average (EMA)
if ma_type == 'EMA'
    short_ma := ema(short_ma_src, short_ma_len)
    middle_ma := ema(middle_ma_src, middle_ma_len)
    long_ma  := ema(long_ma_src,  long_ma_len)

// Weighted Moving Average (WMA)
if ma_type == 'WMA'
    short_ma := wma(short_ma_src, short_ma_len)
    middle_ma := wma(middle_ma_src, middle_ma_len)
    long_ma  := wma(long_ma_src,  long_ma_len)

// Hull Moving Average (HMA)
if ma_type == 'HMA'
    short_ma := wma(2*wma(short_ma_src, short_ma_len/2)-wma(short_ma_src, short_ma_len), round(sqrt(short_ma_len)))
    middle_ma := wma(2*wma(middle_ma_src, middle_ma_len/2)-wma(middle_ma_src, middle_ma_len), round(sqrt(middle_ma_len)))
    long_ma  := wma(2*wma(long_ma_src,  long_ma_len /2)-wma(long_ma_src,  long_ma_len),  round(sqrt(long_ma_len)))

// Volume-weighted Moving Average (VWMA)
if ma_type == 'VWMA'
    short_ma := vwma(short_ma_src, short_ma_len)
    middle_ma := vwma(middle_ma_src, middle_ma_len)
    long_ma  := vwma(long_ma_src,  long_ma_len)


// Smoothed Moving Average (SMMA)    
if ma_type == 'SMMA'
    short_ma := na(short_ma[1]) ? sma(short_ma_src, short_ma_len) : (short_ma[1] * (short_ma_len - 1) + short_ma_src) / short_ma_len
    middle_ma := na(middle_ma[1]) ? sma(middle_ma_src, middle_ma_len) : (middle_ma[1] * (middle_ma_len - 1) + middle_ma_src) / middle_ma_len
    long_ma  := na(long_ma[1])  ? sma(long_ma_src,  long_ma_len)  : (long_ma[1]  * (long_ma_len  - 1) + long_ma_src)  / long_ma_len

// Double Exponential Moving Average (DEMA)
if ma_type == 'DEMA'
    e1_short = ema(short_ma_src, short_ma_len)
    e1_middle = ema(middle_ma_src, middle_ma_len)
    e1_long  = ema(long_ma_src,  long_ma_len)
    
    short_ma := 2 * e1_short - ema(e1_short, short_ma_len)
    middle_ma := 2 * e1_middle - ema(e1_middle, middle_ma_len)
    long_ma  := 2 * e1_long  - ema(e1_long,  long_ma_len)

// Plot MAs
plot(short_ma, color = color.green,   linewidth = 1)
plot(middle_ma, color = color.yellow,   linewidth = 1)
plot(long_ma,  color = color.red, linewidth = 1)

if close>long_ma and short_ma>middle_ma and time_cond
    strategy.entry("Long", strategy.long)


if close<long_ma and short_ma<middle_ma and time_cond
    strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/434478

> Last Modified

2023-12-06 17:10:00
