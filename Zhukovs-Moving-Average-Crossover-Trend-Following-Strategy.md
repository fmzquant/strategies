
> Name

Zhukovs-Moving-Average-Crossover-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/112a4e88f1637b3fd46.png)

### Overview  

This strategy uses moving average crossovers and the ATR indicator to implement automated trend following trading. It goes long when the fast EMA crosses above the slow EMA, and goes short when the fast EMA crosses below the slow EMA. At the same time, it uses the ATR indicator to judge the trend direction and only sends trading signals when the ATR indicates that a trend is present.

### Strategy Logic

The strategy is mainly based on two technical indicators:

1. EMA Lines: It uses two EMA lines with different parameters, fast and slow. When the fast EMA crosses above the slow EMA, it is considered a long signal. When the fast EMA crosses below the slow EMA, it is considered a short signal.  

2. ATR Indicator: The ATR indicator measures the magnitude and force of price fluctuations to judge the trendiness of the current move. Small ATR values indicate consolidation while large upward ATR values suggest an uptrend, and large downward ATR values suggest a downtrend.

By combining EMA crossovers to identify trading opportunities and the ATR filter to avoid low trendiness regimes, the strategy aims to avoid being whipsawed during market choppiness.

### Advantage Analysis  

The advantages of this strategy include:

1. Only trading when the ATR identifies a trend, which helps avoid being whipsawed during non-directional regimes.

2. Using simple fast vs slow EMA crossover logic to identify trading signals.  

3. Customizable EMA sensitivity and smoothness through parameter adjustments.

4. Complete automated trading system built with just two simple indicators, easily implemented in Pine editor.  

5. Minimal need for ongoing parameter tweaking, “set and forget” approach.

### Risk Analysis

Some risks to note include:

1. EMA crossovers may generate false signals, leading to unnecessary losses. Smoother EMA parameters may help.  

2. ATR trend judgment can also be prone to errors, missing trading opportunities. ATR threshold values could be loosened.

3. No consideration of higher timeframe fundamentals. Major news events can trigger reversals that fast EMA crossovers may miss, requiring manual intervention.


These risks can be reduced through optimizations.  

### Optimization Directions  

Main optimization directions include:

1. Adding other indicators to create a combined system and improve signal accuracy. Example - integrating RSI to avoid overbought/oversold risks.

2. Selecting EMA and ATR parameters more suited to the particular market based on symbol and time frame traded.  

3. Implementing dynamic parameter optimization through machine learning to adjust indicators based on current market conditions instead of using fixed static values.  

### Conclusion

Overall this is a very practical trend following strategy. With just a simple combination of two indicators, it builds a relatively complete trading system. Through parameter adjustments it can be adapted to traders with different preferences and styles. At the same time, further expansion and optimizations can make strategy performance even better. The simple yet effective trading logic coupled with strong optimization potential makes this a worthwhile quantitative strategy to research and apply over the long run.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|100|Fast EMA|
|v_input_int_2|200|Slow EMA|
|v_input_string_1|0|Trade Direction: Both|Short|Long|
|v_input_1|timestamp(01 Jan 2023 00:00)|Start Date|
|v_input_2|timestamp(31 Dec 2023 23:59)|End Date|
|v_input_3|false|Take Profit Percent|
|v_input_4|false|Stop Loss Percent|
|v_input_5|12|ATR Length|
|v_input_float_1|3|Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This strategy has been created for GMT trade 4h by Zhukov


//@version=5
strategy('ZhukovTrade', overlay=true, calc_on_every_tick=true, currency=currency.USD)

// INPUT:

// Options to enter fast and slow Exponential Moving Average (EMA) values
emaFast = input.int(title='Fast EMA', defval=100, minval=1, maxval=9999)
emaSlow = input.int(title='Slow EMA', defval=200, minval=1, maxval=9999)

// Option to select trade directions
tradeDirection = input.string(title='Trade Direction', options=['Long', 'Short', 'Both'], defval='Both')

// Options that configure the backtest date range
startDate = input(title='Start Date', defval=timestamp('01 Jan 2023 00:00'))
endDate = input(title='End Date', defval=timestamp('31 Dec 2023 23:59'))


// CALCULATIONS:

// Use the built-in function to calculate two EMA lines
fastEMA = ta.ema(close, emaFast)
slowEMA = ta.ema(close, emaSlow)
emapos = ta.ema(close,200)

// PLOT:

// Draw the EMA lines on the chart
plot(series=fastEMA, color=color.new(color.orange, 0), linewidth=2)
plot(series=slowEMA, color=color.new(color.blue, 0), linewidth=2)
plot(series=emapos, color=color.new(color.red, 0), linewidth=2)


// CONDITIONS:

// Check if the close time of the current bar falls inside the date range
inDateRange = true

// Translate input into trading conditions
longOK = tradeDirection == 'Long' or tradeDirection == 'Both'
shortOK = tradeDirection == 'Short' or tradeDirection == 'Both'

// Decide if we should go long or short using the built-in functions
longCondition = ta.crossover(fastEMA, slowEMA) 
shortCondition = ta.crossunder(fastEMA, slowEMA) 
// ORDERS:
// Set take profit and stop loss percentages
take_profit_percent = input(0, title="Take Profit Percent")
stop_loss_percent = input(0, title="Stop Loss Percent")
// Submit entry (or reverse) orders


atrPeriod = input(12, "ATR Length")
factor = input.float(3.0, "Factor", step = 0.01)

[supertrend, direction] = ta.supertrend(factor, atrPeriod)

bodyMiddle = plot((open + close) / 2, display=display.none)
upTrend = plot(direction < 0 ? supertrend : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend = plot(direction < 0? na : supertrend, "Down Trend", color = color.red, style=plot.style_linebr)

fill(bodyMiddle, upTrend, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle, downTrend, color.new(color.red, 90), fillgaps=false)

if longCondition and inDateRange 
    if longOK and direction<0

        strategy.entry(id='long', direction=strategy.long, alert_message = "LONG")
if shortCondition and inDateRange 
    if shortOK and direction>0
        strategy.entry(id='short', direction=strategy.short, alert_message = "SHORT")

// Submit exit orders in the cases where we trade only long or only short

if strategy.position_size > 0 and take_profit_percent
    strategy.exit(id='tp long',from_entry ="long",profit = take_profit_percent)
if strategy.position_size > 0 and stop_loss_percent
    strategy.exit(id='sl long',from_entry="long",loss=stop_loss_percent)

if strategy.position_size < 0 and stop_loss_percent
    strategy.exit(id='sl short',from_entry="short",loss=stop_loss_percent)
if strategy.position_size < 0 and take_profit_percent
    strategy.exit(id='tp short',from_entry="short",profit = take_profit_percent)

```

> Detail

https://www.fmz.com/strategy/435102

> Last Modified

2023-12-12 12:24:11
