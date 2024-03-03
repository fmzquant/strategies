
> Name

基于成交量比率的趋势策略Trend-Following-Strategy-Based-on-Volume-Ratio

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种基于成交量比率判断趋势方向的量化策略。该策略通过计算多空成交量均线,产生买入卖出信号。

一、策略原理

该策略的核心指标是多空成交量。具体计算步骤如下:

1. 计算当日成交量(Volume)。

2. 判断K线为多头时,将成交量记为多方成交量(Bull Volume)。

3. 判断K线为空头时,将成交量记为空方成交量(Bear Volume)。

4. 分别计算多方和空方成交量的移动平均线。

5. 当多方移动平均线上穿空方移动平均线时,产生买入信号;相反产生卖出信号。

6. 还通过价格变化率指标进行过滤,只在价格出现明确趋势时才交易。

7. 根据信号设置止损止盈点,以锁定盈利。

这样,通过成交量的多空比例判断趋势方向,再辅助以价格变化率指标进行过滤,可以提高信号质量。止损止盈设置也使每单交易有可控的盈亏。

二、策略优势

该策略最大的优势是利用成交量判断趋势方向,这是最基本的趋势判断方法之一。成交量能反映市场参与者行为。

此外,成交量指标也能提前反映突破信号,比较灵敏。与仅利用价格指标相比,它可以更早捕捉到趋势转折。

最后,结合价格变化率指标进行过滤也提高了信号质量。

三、潜在风险

尽管该策略有一定优势,但实盘中也应注意以下风险:

首先,需谨慎设置成交量指标参数,避免出现假信号。

其次,仅依靠一个指标容易被突破价格invalidates。应多种指标组合进行验证。

最后,止损设置过于接近可能导致止损被突破的风险。

四、内容总结

本文详细介绍了一种利用成交量比率判断趋势的量化策略。它可以通过计算多空成交量均线产生交易信号。该策略具有一定的先行性,但也需要配合其他指标进行验证。此外,适当参数设置并严格的资金管理也是其可行性的关键。总体来说,该策略提供了一种独特的利用成交量判断趋势的思路,但需要进一步完善。

||

This article explains in detail a quantitative trend following strategy based on volume ratio analysis. It generates buy and sell signals by calculating the moving averages of bullish and bearish volume. 

I. Strategy Logic

The core indicator of this strategy is bullish and bearish volume. The specific calculation steps are:

1. Calculate daily total volume. 

2. Label volume as bull volume when the daily bar closes up, and bear volume when closes down.

3. Calculate moving averages separately for bull and bear volumes. 

4. A buy signal is generated when the bull volume MA crosses above bear volume MA, and vice versa.

5. Price rate of change indicator is also used as a filter, only taking trades when a clear trend exists. 

6. Set stop loss and take profit based on signals to lock in profits.

By judging the trend direction through volume ratio, and filtering with price rate of change, the signal quality can be improved. The stop loss and take profit also ensures controllable profit and loss per trade.

II. Advantages of the Strategy

The biggest advantage of this strategy is using volume to determine trend direction, which is one of the most basic trend following methods. Volume reflects market participant behavior.

Also, volume indicators can early reflect breakout signals, being relatively sensitive. Compared to only using price indicators, it can capture trend reversals earlier.

Lastly, filtering with price rate of change also enhances signal quality.

III. Potential Risks

While the strategy has merits, the following risks should be considered for live trading:

Firstly, parameters for the volume indicators need to be set prudently to avoid false signals.

Secondly, relying solely on one indicator makes it susceptible to price invalidations. Other indicators should be combined for verification.

Lastly, stop loss set too close risks being stopped out prematurely. 

IV. Summary

In summary, this article has explained a quantitative strategy using volume ratio to determine trends. It generates trading signals by calculating moving averages of bullish and bearish volume. The strategy has a certain degree of lead and sensitivity, but needs to be combined with other indicators for verification. In addition, proper parameter tuning and prudent money management are also key to its viability. Overall, it provides a unique approach of using volume for trend analysis, but requires further enhancements.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2019|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|31|Backtest Stop Day|
|v_input_7|0|Moving Average Type: Simple|Exponential|Double Exponential|
|v_input_8|6|MA Length|
|v_input_9|3.1|Factor For Breakout Candle|
|v_input_10|12|roclength|
|v_input_11|2|pcntChange|
|v_input_12|2|Stop Loss %|
|v_input_13|900|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// Based on Volume Flow v3 indicator by oh92
strategy("Volume Flow BF", overlay=false, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.0)

/////////////// Time Frame ///////////////
testStartYear = input(2017, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

testPeriod() => true
    
maType =    input(title="Moving Average Type", options=["Simple", "Exponential", "Double Exponential"], defval="Simple")
length =    input(6, title="MA Length")
x      =    input(3.1, title="Factor For Breakout Candle")

// Basic Volume Calcs //
vol  =  volume
bull =  close>open?vol:0 
bear =  open>close?vol:0

// Double EMA Function //
dema(src, len) => (2 * ema(src, len) - ema(ema(src, len), len))

// BULL Moving Average Calculation
bullma = maType == "Exponential" ?        ema(bull, length) :
         maType == "Double Exponential" ? dema(bull, length) :
         sma(bull, length)

// BEAR Moving Average Calculation //
bearma = maType == "Exponential" ?        ema(bear, length) :
         maType == "Double Exponential" ? dema(bear, length) :
         sma(bear, length)

///////////// Rate Of Change ///////////// 
source = close
roclength = input(12, minval=1)
pcntChange = input(2, minval=1)
roc = 100 * (source - source[roclength]) / source[roclength]
emaroc = ema(roc, roclength / 2)
isMoving() => emaroc > (pcntChange / 2) or emaroc < (0 - (pcntChange / 2))

/////////////// Strategy ///////////////
long = bullma > bearma and isMoving()
short = bullma < bearma and isMoving()

last_long = 0.0
last_short = 0.0
last_long := long ? time : nz(last_long[1])
last_short := short ? time : nz(last_short[1])

long_signal = crossover(last_long, last_short)
short_signal = crossover(last_short, last_long)

last_open_long_signal = 0.0
last_open_short_signal = 0.0
last_open_long_signal := long_signal ? open : nz(last_open_long_signal[1])
last_open_short_signal := short_signal ? open : nz(last_open_short_signal[1])

last_long_signal = 0.0
last_short_signal = 0.0
last_long_signal := long_signal ? time : nz(last_long_signal[1])
last_short_signal := short_signal ? time : nz(last_short_signal[1])

in_long_signal = last_long_signal > last_short_signal
in_short_signal = last_short_signal > last_long_signal

last_high = 0.0
last_low = 0.0
last_high := not in_long_signal ? na : in_long_signal and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_low := not in_short_signal ? na : in_short_signal and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])
sl_inp = input(2.0, title='Stop Loss %') / 100
tp_inp = input(900.0, title='Take Profit %') / 100 
 
take_level_l = strategy.position_avg_price * (1 + tp_inp)
take_level_s = strategy.position_avg_price * (1 - tp_inp) 

since_longEntry = barssince(last_open_long_signal != last_open_long_signal[1]) 
since_shortEntry = barssince(last_open_short_signal != last_open_short_signal[1]) 

slLong = in_long_signal ? strategy.position_avg_price * (1 - sl_inp) : na
slShort = strategy.position_avg_price * (1 + sl_inp)
long_sl = in_long_signal ? slLong : na
short_sl = in_short_signal ? slShort : na

/////////////// Execution /////////////// 
if testPeriod()
    strategy.entry("Long",  strategy.long, when=long)
    strategy.entry("Short", strategy.short, when=short)
    strategy.exit("Long Ex", "Long", stop=long_sl, limit=take_level_l, when=since_longEntry > 0)
    strategy.exit("Short Ex", "Short", stop=short_sl, limit=take_level_s, when=since_shortEntry > 0)
    
///////////// Plotting /////////////
bgcolor(isMoving() ? long ? color.green : short ? color.red : na : color.white, transp=80)
bgcolor(long_signal ? color.lime : short_signal ? color.red : na, transp=30) 
plot(bullma, color=color.lime, linewidth=1, transp=0, title="Bull MA", transp=10)
plot(bearma, color=color.red, linewidth=1, transp=0, title="Bear MA", transp=10)
```

> Detail

https://www.fmz.com/strategy/426845

> Last Modified

2023-09-14 19:53:55
