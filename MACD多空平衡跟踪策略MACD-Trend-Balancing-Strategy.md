
> Name

MACD多空平衡跟踪策略MACD-Trend-Balancing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/149a996a1338eb01c78.png)



## Overview

This is a trend following strategy that identifies bullish and bearish directions using the MACD indicator. It generates the MACD main line by calculating the difference between fast and slow moving averages. The strategy uses the golden cross of the MACD main line and signal line to generate buy signals, and the death cross to generate sell signals, achieving balanced tracking of trends.

## Strategy Logic

The code first sets the backtesting timeframe to test the historical performance of the strategy. 

The MACD indicator is then calculated, including the length settings for the fast moving average, slow moving average, and MACD moving average. The fast line reacts more sensitively and the slow line reacts more steadily. Their difference forms the MACD main line, which is then smoothed by a moving average to form the MACD signal line. When the difference crosses above the zero line, a bullish signal is generated. When it crosses below, a bearish signal is generated.

Based on the bullish and bearish signals, record the last time when a signal was generated. When the fast and slow lines cross, confirm and record the buy/sell signals, then a position can be opened.

After entering a position, continuously track the highest and lowest price of the position. Set a stop loss percentage, when the loss reaches this percentage, exit with a stop loss. 

## Advantages

1. The MACD indicator can effectively identify trends and is one of the classic technical indicators.

2. The difference between fast and slow moving averages can early capture price momentum and direction changes.

3. The filtering effect of moving averages helps filter out some false signals. 

4. The strategy incorporates a stop loss mechanism to control risks.

## Risks

1. MACD is prone to generating false signals with limited optimization space.

2. Improper stop loss placement can be too active or conservative, requiring individual optimization across products.

3. Fixed position sizing can easily lead to overleveraging, consider position sizing based on account size. 

4. The rationale for backtest timeframes needs to be validated to prevent overfitting.

## Optimization

1. Optimize fast and slow moving average combinations to find best parameters fitting different products.

2. Add other indicators like candlesticks, Bollinger Bands, RSI to filter signals.

3. Evaluate different stop loss levels based on drawdown, Sharpe ratio. 

4. Explore stop loss techniques like trailing stop loss, limit orders.

5. Test dynamic position sizing based on equity, volatility.

## Conclusion

The MACD trend balancing strategy is based on the classic MACD indicator. It has the ability to sensitively capture price momentum and can be well-adapted to different products through parameter optimization. Further enhancements on filtering signals, stop loss techniques and dynamic position sizing can continue improving the stability and profitability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2019|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|31|Backtest Stop Day|
|v_input_7|true|Color Background?|
|v_input_8|12|fastLength|
|v_input_9|26|slowlength|
|v_input_10|12|MACDLength|
|v_input_11|5|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-16 00:00:00
end: 2023-10-16 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("MACD BF", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.0)

/////////////// Component Code Start ///////////////
testStartYear = input(2017, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() => true

///////////////  MACD Component - Default settings for one day. /////////////// 
fastLength = input(12) // 72 for 4hr
slowlength = input(26) // 156 for 4 hr
MACDLength = input(12)  // 12 for 4hr

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD

long = crossover(delta, 0) 
short = crossunder(delta, 0) 

last_long = long ? time : nz(last_long[1])
last_short = short ? time : nz(last_short[1])

long_signal = crossover(last_long, last_short)
short_signal = crossover(last_short, last_long)

last_open_long_signal = long_signal ? open : nz(last_open_long_signal[1])
last_open_short_signal = short_signal ? open : nz(last_open_short_signal[1])

last_long_signal = long_signal ? time : nz(last_long_signal[1])
last_short_signal = short_signal ? time : nz(last_short_signal[1])

in_long_signal = last_long_signal > last_short_signal
in_short_signal = last_short_signal > last_long_signal

last_high = not in_long_signal ? na : in_long_signal and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_low = not in_short_signal ? na : in_short_signal and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])

sl_inp = input(5.0, title='Stop Loss %', type=float)/100

/////////////// Strategy Component /////////////// 
// Strategy Entry
if testPeriod()
    strategy.entry("Long Entry",  strategy.long, when=long_signal)
    strategy.entry("Short Entry", strategy.short, when=short_signal)

since_longEntry = barssince(last_open_long_signal != last_open_long_signal[1]) // LONG SL
since_shortEntry = barssince(last_open_short_signal != last_open_short_signal[1]) // SHORT SL

slLong = in_long_signal ? strategy.position_avg_price * (1 - sl_inp) : na
slShort = strategy.position_avg_price * (1 + sl_inp)
long_sl = in_long_signal ? slLong : na
short_sl = in_short_signal ? slShort : na

// Strategy SL Exit
if testPeriod()
    strategy.exit("Long SL", "Long Entry", stop=long_sl, when=since_longEntry > 1)
    strategy.exit("Short SL", "Short Entry", stop=short_sl, when=since_shortEntry > 1)

//plot(strategy.equity, title="equity", color=blue, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/429494

> Last Modified

2023-10-17 16:15:53
