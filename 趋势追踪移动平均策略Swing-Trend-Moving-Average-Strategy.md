
> Name

趋势追踪移动平均策略Swing-Trend-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1575297822ec1edccdd.png)

## Overview  

The Swing Trend Moving Average Strategy is a trend following system that uses a long-term moving average to identify the trend direction combined with the Average True Range to filter out fakeouts and limit overall drawdowns. It adopts an Exponential Moving Average to determine the trend direction and utilizes the Average True Range to detect if it is a false breakout. This can effectively filter out ranging markets and reduce overall strategy drawdowns.   

## Strategy Logic

The strategy is designed based on the following principles:  

1. Use an exponential moving average to determine the overall trend direction. The default period is 200 bars.  
2. Calculate the Average True Range over the last 10 bars.
3. When the closing price is above "Moving Average + Average True Range", it is determined as an uptrend.
4. When the closing price is below "Moving Average - Average True Range", it is determined as a downtrend.
5. Go long in an uptrend and go short in a downtrend.  
6. By default, the moving average is used as the stop loss line. It can also choose to use "Moving Average ± Average True Range" as the stop loss line.

## Advantage Analysis   

The strategy has the following advantages:

1. Using a moving average to determine the major trend can effectively filter out short-term market noise.  
2. Adding Average True Range as a filter condition avoids generating trading signals in ranging markets, thus reducing unnecessary losses.
3. The stop loss line is close to the moving average or its reverse range, allowing quick stop losses to reduce maximum drawdown.   
4. Simple parameter settings make it easy to understand and optimize.

## Risk Analysis   

The strategy also has some potential risks:   

1. Trend reversal usually leads to some degree of drawdown in a moving average system.  
2. The parameter settings of the moving average and Average True Range can have a big impact on strategy performance. Improper parameter settings may miss trading opportunities or increase unnecessary losses.
3. The strategy itself does not consider the relationship between price and volume. It may generate some false signals.


## Optimization Directions   

The strategy can be optimized in the following aspects:  

1. Test different types of moving averages to find the most suitable one for specific stocks or products.   
2. Optimize the moving average period parameter to make it more suitable for the characteristics of the traded stocks or products.  
3. Optimize the Average True Range parameter to find the best combination to filter ranging markets without missing trends.  
4. Add volume rules to avoid invalid breakouts.   
5. Test and compare different stop loss methods to determine the optimal solution.  

## Conclusion  

Overall, the Swing Trend Moving Average Strategy is a very simple and practical trend following strategy. It also has good risk control. Although the strategy does not take many factors into consideration, detailed testing and optimization of parameters and stop loss methods are still required. However, its simple trading logic and parameter settings make it widely applicable to different products, especially suitable for trading cryptocurrencies like Bitcoin.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|false|Open Short Positions?|
|v_input_bool_2|true|Exit trade on Moving Average Cross?|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|200|Trend Length|
|v_input_string_1|0|Moving Average Type: ema|sma|rma|wma|vwma|
|v_input_float_1|true|ATR Threshold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-28 00:00:00
end: 2024-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Inkedlau

//@version=5
strategy('Swing Trend Strategy', overlay=true, pyramiding=1, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=1000, commission_value=0.1)

use_short = input.bool(false, 'Open Short Positions?')
exit_type = input.bool(true, 'Exit trade on Moving Average Cross?')
src = input.source(close, 'Source')
len = input.int(200, 'Trend Length')
ma_type = input.string('ema', 'Moving Average Type', options=['sma', 'ema', 'rma', 'wma', 'vwma'], tooltip='Select the type of Moving Average to use to calculate the Trend')
atr_multiplier = input.float(1., 'ATR Threshold', step=0.5, tooltip='Filter the ranging market using the Average True Range')

// ----------------------- DESCRIPTION -----------------------
// THIS SCRIPT IS A TREND FOLLOWING SYSTEM THAT USES A COMBINATION OF MOVING AVERAGE AND AVERAGE TRUE RANGE
// TO SPOT THE TRENDS AND ENTER THE MARKET ACCODINGLY.
// THE MARKET IS CONSIDERED IN AN UPTREND WHEN THE PRICE CLOSES ABOVE THE MOVING AVERAGE + THE AVERAGE TRUE RANGE OF THE LAST 10 PERIODS
// THE MARKET IS CONSIDERED IN AN DOWNTREND WHEN THE PRICE CLOSES BLOW THE MOVING AVERAGE - THE AVERAGE TRUE RANGE OF THE LAST 10 PERIODS
// BY DEFAULT, THE STRATEGY WILL ENTER LONG WHEN AN UPTREND IS SPOTTED, THEN CLOSES WHEN THE PRICE CLOSES BELOW THE MOVING AVERAGE
// THE STRATEGY WILL ENTER SHORT WHEN A DOWNTREND IS SPOTTED, THEN CLOSES WHEN THE PRICE CLOSES ABOVE THE MOVING AVERAGE

// ------------------ INDICATORS CALCULATION------------------
my_ma()=>
    ma = close
    if ma_type == 'sma'
        ma := ta.sma(src, len)
    if ma_type == 'ema'
        ma := ta.ema(src, len)
    if ma_type == 'rma'
        ma := ta.rma(src, len)
    if ma_type == 'wma'
        ma := ta.wma(src, len)
    if ma_type == 'vwma'
        ma := ta.vwma(src, len)
    ma

trend = my_ma()
atr = ta.atr(10)
uptrend = trend + atr * atr_multiplier
downtrend = trend - atr * atr_multiplier

// ---------------- ENTRY AND EXIT CONDITIONS ----------------

open_long = strategy.position_size == 0 and src > uptrend
close_long = exit_type ? strategy.position_size > 0 and src < trend : strategy.position_size > 0 and src < downtrend

open_short = use_short and strategy.position_size == 0 and src < downtrend
close_short = exit_type ? strategy.position_size < 0 and src > trend : strategy.position_size < 0 and src > uptrend

strategy.entry('long', strategy.long, when=open_long)
strategy.close('long', when=close_long)

strategy.entry('short', strategy.short, when=open_short)
strategy.close('short', when=close_short)


// ------------------ PLOTTING AND COLORING ------------------
tcolor = src > uptrend ? color.green : src < downtrend ? color.red : na

ptrend = plot(trend, color=color.blue, linewidth=1)
puptrend = plot(uptrend, color=color.green, linewidth=1)
pdowntrend = plot(downtrend, color=color.red, linewidth=1)
pclose = plot(close, color=na)

fill(puptrend, pclose, color=close > uptrend ? color.green : na, transp = 90)
fill(pdowntrend, pclose, color=close < downtrend ? color.red : na, transp = 90)


```

> Detail

https://www.fmz.com/strategy/440996

> Last Modified

2024-02-04 15:44:54
